/**
 * DOTA2 主题 — Host half.
 *
 * 两部分职责：
 *  1) 把插件自带的少量素材（logo、Steam 官方图）与**本机游戏里的开场影片**通过路由发给浏览器；
 *  2) 载入画面**不复制、不落盘**：直接读本机 Dota 2 的 VPK，运行时做 BC3/YCoCg 解码，
 *     用 Node 内置 zlib 编码成 PNG 再返回（带内存缓存）。这样 747 张载入画面全部可选，
 *     而插件本身只占几百 KB。
 */

import {
  createReadStream, readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, appendFileSync,
  openSync, readSync, closeSync
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ASSET_DIR = path.join(HERE, 'assets');
const ROUTE_ROOT = '/dota2-ui/assets/';
const LS_ROOT = '/dota2-ui/ls/';

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.webm': 'video/webm', '.mp4': 'video/mp4'
};

/** 客户端request的开场影片路由 → 游戏内文件名 */
const BOOT_ROUTES = {
  'boot-intro.webm': 'intro_movie.webm',
  'boot-logo.webm': 'dota_logo_portrait.webm'
};

/* ------------------------------------------------------------------ 公共工具 */

function steamLibraries() {
  // 全盘符 × 常见安装位置扫描（社区通用做法：不依赖注册表也能覆盖）
  const subs = ['Steam', 'SteamLibrary', 'Games\\Steam', 'Program Files (x86)\\Steam', 'Program Files\\Steam'];
  const roots = [];
  for (const letter of 'CDEFGHIJKLMNOPQRSTUVWXYZAB') {
    for (const sub of subs) roots.push(letter + ':\\' + sub);
  }
  const found = new Set();
  for (const root of roots) {
    if (!root) continue;
    found.add(root);
    try {
      const vdf = readFileSync(path.join(root, 'steamapps', 'libraryfolders.vdf'), 'utf8');
      const re = /"path"\s+"([^"]+)"/g;
      let m;
      while ((m = re.exec(vdf))) found.add(m[1].replace(/\\\\/g, '\\'));
    } catch { /* 不是 Steam 根目录 */ }
  }
  return [...found];
}

/** 本机 Dota 2 的 game/dota 目录（含 pak01_dir.vpk），找不到返回 null */
function findGameDir() {
  for (const lib of steamLibraries()) {
    const dir = path.join(lib, 'steamapps', 'common', 'dota 2 beta', 'game', 'dota');
    try { if (statSync(path.join(dir, 'pak01_dir.vpk')).isFile()) return dir; } catch { /* 继续找 */ }
  }
  return null;
}

function notFound(res) {
  try {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('not found');
  } catch { /* 响应已结束 */ }
}

/** 单个文件，支持 Range（影片拖动需要） */
function serveFile(req, res, file, type) {
  let stat;
  try { stat = statSync(file); } catch { notFound(res); return; }
  const total = stat.size;
  const headers = {
    'Content-Type': type,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=86400'
  };
  const rawRange = req.headers && req.headers.range;
  const match = typeof rawRange === 'string' ? /^bytes=(\d*)-(\d*)$/.exec(rawRange.trim()) : null;
  if (match) {
    let start = match[1] ? parseInt(match[1], 10) : 0;
    let end = match[2] ? parseInt(match[2], 10) : total - 1;
    if (!Number.isFinite(start) || start < 0) start = 0;
    if (!Number.isFinite(end) || end >= total) end = total - 1;
    if (start > end) {
      res.writeHead(416, { 'Content-Range': 'bytes */' + total });
      res.end();
      return;
    }
    res.writeHead(206, Object.assign({}, headers, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Content-Length': String(end - start + 1)
    }));
    createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, Object.assign({}, headers, { 'Content-Length': String(total) }));
  createReadStream(file).pipe(res);
}

/* ------------------------------------------------------- 载入画面：VPK 直读 */

const LS_PREFIXES = ['panorama/images/loadingscreens/', 'panorama/images/econ/loading_screens/'];

let catalog = null;

/** 扫描 VPK 索引，建立 slug → 条目 的表；tree 常驻内存只读一次 */
function buildCatalog() {
  if (catalog !== null) return catalog;
  const dir = findGameDir();
  if (!dir) { catalog = false; return catalog; }

  let tree;
  try { tree = readFileSync(path.join(dir, 'pak01_dir.vpk')); } catch { catalog = false; return catalog; }
  if (tree.readUInt32LE(0) !== 0x55AA1234) { catalog = false; return catalog; }
  const treeSize = tree.readUInt32LE(8);

  const entries = new Map();
  for (const prefix of LS_PREFIXES) {
    const needle = Buffer.from(prefix, 'latin1');
    let pos = 0;
    for (;;) {
      const i = tree.indexOf(needle, pos);
      if (i < 0) break;
      pos = i + 1;
      if (i > 0 && tree[i - 1] !== 0) continue;      // 必须是完整 token 的开头
      const end = tree.indexOf(0, i);
      if (end < 0) break;
      const extStart = end + 1;
      const extEnd = tree.indexOf(0, extStart);
      if (extEnd < 0 || extEnd - extStart > 40) { pos = end + 1; continue; }
      const ext = tree.toString('latin1', extStart, extEnd);
      if (ext === 'loadingscreen' || ext === 'loadingscreen_tga') {
        const at = extEnd + 1;
        const preload = tree.readUInt16LE(at + 4);
        const arch = tree.readUInt16LE(at + 6);
        const off = tree.readUInt32LE(at + 8);
        const length = tree.readUInt32LE(at + 12);
        const term = tree.readUInt16LE(at + 16);
        if (term === 0xFFFF && length > 65536) {
          const slug = tree.toString('latin1', i + needle.length, end);
          if (slug && !entries.has(slug)) {
            entries.set(slug, { arch, off, length, preload, preloadAt: at + 18 });
          }
        }
      }
      pos = end + 1;
    }
  }
  catalog = { dir, tree, treeSize, entries };
  return catalog;
}

/** 从对应 pak 里读出条目字节（含 preload 前缀） */
function readPayload(cat, meta) {
  const pre = cat.tree.subarray(meta.preloadAt, meta.preloadAt + meta.preload);
  const bodyLen = meta.length - meta.preload;
  if (bodyLen <= 0) return Buffer.from(pre);
  const external = meta.arch !== 0x7FFF;
  const file = external
    ? path.join(cat.dir, 'pak01_' + String(meta.arch).padStart(3, '0') + '.vpk')
    : path.join(cat.dir, 'pak01_dir.vpk');
  const start = external ? meta.off : (28 + cat.treeSize + meta.off);
  const body = Buffer.alloc(bodyLen);
  let fd = -1;
  try {
    fd = openSync(file, 'r');
    readSync(fd, body, 0, bodyLen, start);
  } catch {
    return null;
  } finally {
    if (fd >= 0) { try { closeSync(fd); } catch { /* 忽略 */ } }
  }
  return Buffer.concat([pre, body]);
}

/* --------------------------------------------------------- BC3 / YCoCg 解码 */

const RGB565 = new Uint8Array(65536 * 3);
for (let v = 0; v < 65536; v++) {
  const r = (v >> 11) & 0x1f, g = (v >> 5) & 0x3f, b = v & 0x1f;
  RGB565[v * 3] = (r << 3) | (r >> 2);
  RGB565[v * 3 + 1] = (g << 2) | (g >> 4);
  RGB565[v * 3 + 2] = (b << 3) | (b >> 2);
}

/** 载荷长度 → 尺寸（1 字节/像素的 BC3） */
function dimsFor(bytes) {
  const known = { 2097152: [2048, 1024], 1048576: [1024, 1024], 524288: [1024, 512], 262144: [512, 512], 65536: [256, 256] };
  if (known[bytes]) return known[bytes];
  for (let w = 4096; w >= 256; w >>= 1) {
    const h = bytes / w;
    if (Number.isInteger(h) && h >= 64 && h <= 4096) return [w, h];
  }
  return null;
}

/**
 * BC3 → YCoCg 反变换（Valve 的 YCoCg-DXT5：alpha 存亮度 Y，R/G 存色度 Co/Cg，B 未用）。
 * bstep > 1 时按块抽样并取块内 16 像素平均，用于快速生成缩略图。
 */
function decodeYCoCg(data, w, h, bstep) {
  const bw = w >> 2, bh = h >> 2;
  const full = bstep === 1;
  // 全尺寸时每块写 16 个像素（= 原分辨率）；抽样时每块压成 1 个像素
  const outW = full ? (bw << 2) : Math.ceil(bw / bstep);
  const outH = full ? (bh << 2) : Math.ceil(bh / bstep);
  const rgb = Buffer.alloc(outW * outH * 3);
  let o = 0;

  for (let by = 0; by < bh; by += bstep) {
    for (let bx = 0; bx < bw; bx += bstep) {
      const base = (by * bw + bx) * 16;
      const a0 = data[base], a1 = data[base + 1];
      const abits = data.readUIntLE(base + 2, 6);
      const c0 = data[base + 8] | (data[base + 9] << 8);
      const c1 = data[base + 10] | (data[base + 11] << 8);
      const cbits = data.readUInt32LE(base + 12);

      const al = new Uint8Array(8);
      al[0] = a0; al[1] = a1;
      if (a0 > a1) {
        for (let i = 1; i <= 6; i++) al[i + 1] = ((7 - i) * a0 + i * a1) / 7 | 0;
      } else {
        for (let i = 1; i <= 4; i++) al[i + 1] = ((5 - i) * a0 + i * a1) / 5 | 0;
        al[6] = 0; al[7] = 255;
      }

      const cr = [RGB565[c0 * 3], RGB565[c1 * 3], 0, 0];
      const cg = [RGB565[c0 * 3 + 1], RGB565[c1 * 3 + 1], 0, 0];
      const cb = [RGB565[c0 * 3 + 2], RGB565[c1 * 3 + 2], 0, 0];
      if (c0 > c1) {
        for (let k = 0; k < 3; k++) {
          cr[2] = (2 * cr[0] + cr[1]) / 3 | 0; cg[2] = (2 * cg[0] + cg[1]) / 3 | 0; cb[2] = (2 * cb[0] + cb[1]) / 3 | 0;
          cr[3] = (cr[0] + 2 * cr[1]) / 3 | 0; cg[3] = (cg[0] + 2 * cg[1]) / 3 | 0; cb[3] = (cb[0] + 2 * cb[1]) / 3 | 0;
          break;
        }
      } else {
        cr[2] = (cr[0] + cr[1]) >> 1; cg[2] = (cg[0] + cg[1]) >> 1; cb[2] = (cb[0] + cb[1]) >> 1;
        cr[3] = cg[3] = cb[3] = 0;
      }

      let sr = 0, sg = 0, sb = 0;
      for (let py = 0; py < 4; py++) {
        for (let px = 0; px < 4; px++) {
          const idx = (py << 2) | px;
          const ci = (cbits >> (idx << 1)) & 3;
          const Y = al[(abits >> (idx * 3)) & 7];
          const Co = cr[ci] - 128, Cg = cg[ci] - 128;
          const t = Y - Cg;
          let r = t + Co, g = Y + Cg, b = t - Co;
          r = r < 0 ? 0 : (r > 255 ? 255 : r);
          g = g < 0 ? 0 : (g > 255 ? 255 : g);
          b = b < 0 ? 0 : (b > 255 ? 255 : b);
          if (full) { rgb[o] = r; rgb[o + 1] = g; rgb[o + 2] = b; }
          else { sr += r; sg += g; sb += b; }
          if (full) o += 3;
        }
      }
      if (!full) {
        rgb[o] = sr >> 4; rgb[o + 1] = sg >> 4; rgb[o + 2] = sb >> 4; o += 3;
      }
    }
  }
  return { rgb, w: outW, h: outH };
}

/* ------------------------------------------------------------- PNG 编码 */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const td = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td), 0);
  return Buffer.concat([len, td, crc]);
}

function pngEncode(rgb, w, h) {
  const stride = w * 3;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;                       // filter: none
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;   // 8bit RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 6 })),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
}

/* --------------------------------------------------------- 解码结果内存缓存 */

const cache = new Map();
let cacheBytes = 0;
const CACHE_LIMIT = 96 * 1024 * 1024;                 // 96 MB 上限

function cacheGet(key) {
  const hit = cache.get(key);
  if (hit) { cache.delete(key); cache.set(key, hit); }   // LRU 提升
  return hit;
}

function cacheSet(key, buf) {
  cache.set(key, buf);
  cacheBytes += buf.length;
  while (cacheBytes > CACHE_LIMIT && cache.size > 1) {
    const oldest = cache.keys().next().value;
    cacheBytes -= cache.get(oldest).length;
    cache.delete(oldest);
  }
}

/** 生成一张载入画面的 PNG；targetW=0 表示原始尺寸 */
function renderLoadingScreen(cat, meta, targetW) {
  const payload = readPayload(cat, meta);
  if (!payload || payload.length < 64) return null;
  let headerLen;
  try { headerLen = payload.readUInt32LE(0); } catch { return null; }
  if (!headerLen || headerLen > payload.length) headerLen = 0;
  const data = payload.subarray(headerLen);
  const dim = dimsFor(data.length);
  if (!dim) return null;
  const bstep = targetW ? Math.max(1, Math.round((dim[0] >> 2) / targetW)) : 1;
  const img = decodeYCoCg(data, dim[0], dim[1], bstep);
  return pngEncode(img.rgb, img.w, img.h);
}

/** 本机自检专用：绕过 HTTP 直接生成一张 PNG，用于在重启前验证解码链路是否可用。 */
export function debugRender(slug, targetW) {
  const cat = buildCatalog();
  if (!cat) return null;
  const meta = cat.entries.get(slug);
  if (!meta) return null;
  return renderLoadingScreen(cat, meta, targetW || 0);
}

/* ------------------------------------------------- 战绩本地缓存（Host 定时抓取） */

const DOTA_PLAYER = 135700444;
const CACHE_DIR = path.join(HERE, '_cache');
const CACHE_FILE = path.join(CACHE_DIR, 'dota.json');
const OD = 'https://api.opendota.com/api/players/' + DOTA_PLAYER;

const store = { profile: null, heroes: null, matches: null, details: {}, at: {} };

function loadStore() {
  try {
    const raw = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
    if (raw && typeof raw === 'object') {
      store.profile = raw.profile || null;
      store.heroes = raw.heroes || null;
      store.matches = raw.matches || null;
      store.details = raw.details || {};
      store.at = raw.at || {};
    }
  } catch { /* 首次运行无缓存 */ }
}

function saveStore() {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_FILE, JSON.stringify({
      profile: store.profile, heroes: store.heroes, matches: store.matches,
      details: store.details, at: store.at
    }));
  } catch { /* 忽略 */ }
}

function getJson(url, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs || 15000);
  return fetch(url, { signal: ctrl.signal })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .finally(() => clearTimeout(t));
}

/* 额度预算：OpenDota 免费 2000 次/天。列表 2 分钟一次(720)、资料 30 分钟一次(96)、
   详情只为新对局抓(约 20–60)——合计约 900 次/天，安全。 */
async function refreshCache() {
  const now = Date.now();
  try {
    if (!store.profile || now - (store.at.profile || 0) > 30 * 60 * 1000) {
      const d = await getJson(OD);
      if (d) { store.profile = d; store.at.profile = now; }
    }
    if (!store.heroes || now - (store.at.heroes || 0) > 30 * 60 * 1000) {
      const d = await getJson(OD + '/heroes?date=90');
      if (d) { store.heroes = d; store.at.heroes = now; }
    }
    if (!store.matches || now - (store.at.matches || 0) > 2 * 60 * 1000) {
      const d = await getJson(OD + '/matches?limit=40');
      if (Array.isArray(d) && d.length) { store.matches = d; store.at.matches = now; }
    }
    const ids = (store.matches || [])
      .filter((m) => m && m.lobby_type === 7)
      .slice(0, 20)
      .map((m) => m.match_id);
    let fetched = 0;
    for (const id of ids) {
      if (fetched >= 4) break;                       // 每轮最多补 4 局，避免突发流量
      const have = store.details[id];
      if (have && now - (have.__at || 0) < 60 * 60 * 1000) continue;   // 一小时内已抓过
      const d = await getJson('https://api.opendota.com/api/matches/' + id, 20000);
      if (d && d.players) { d.__at = Date.now(); store.details[id] = d; fetched++; }
      await new Promise((r) => setTimeout(r, 1200));
    }
    saveStore();
  } catch { /* 忽略网络错误 */ }
}

function serveDota(req, res) {
  try {
    const raw = req.url || '';
    const qi = raw.indexOf('?');
    const q = {};
    if (qi !== -1) {
      for (const kv of raw.slice(qi + 1).split('&')) {
        const eq = kv.indexOf('=');
        if (eq > 0) q[decodeURIComponent(kv.slice(0, eq))] = decodeURIComponent(kv.slice(eq + 1));
      }
    }
    const send = (obj) => {
      const body = Buffer.from(JSON.stringify(obj), 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': String(body.length),
        'Cache-Control': 'no-cache'
      });
      res.end(body);
    };
    if (q.what === 'match') {
      const id = String(q.id || '');
      const hit = store.details[id];
      if (hit) { send({ ok: true, match: hit }); return; }
      getJson('https://api.opendota.com/api/matches/' + id, 20000).then((d) => {
        if (d && d.players) { d.__at = Date.now(); store.details[id] = d; saveStore(); send({ ok: true, match: d }); }
        else send({ ok: false, match: null });
      }).catch(() => send({ ok: false, match: null }));
      return;
    }
    send({
      ok: !!(store.matches && store.matches.length),
      profile: store.profile, heroes: store.heroes, matches: store.matches,
      updatedAt: store.at.matches || 0
    });
  } catch { notFound(res); }
}

function handleLs(req, res, cat) {
  try {
    const raw = req.url || '';
    const qi = raw.indexOf('?');
    let p = qi === -1 ? raw : raw.slice(0, qi);
    const q = {};
    if (qi !== -1) {
      for (const kv of raw.slice(qi + 1).split('&')) {
        const eq = kv.indexOf('=');
        if (eq > 0) q[decodeURIComponent(kv.slice(0, eq))] = decodeURIComponent(kv.slice(eq + 1));
      }
    }
    if (p.indexOf(LS_ROOT) === 0) p = p.slice(LS_ROOT.length);
    else if (p === '/dota2-ui/ls') p = '';
    p = p.replace(/^\/+/, '');

    let mode = q.kind || null;
    let slug = q.slug || null;
    if (!mode) {
      if (p === 'index.json' || p === 'index') mode = 'index';
      else {
        const m = /^(thumb|img)\/(.+)\.png$/.exec(p);
        if (m) { mode = m[1]; slug = m[2]; }
      }
    }
    if (!cat) { notFound(res); return; }

    if (mode === 'index') {
      const items = [...cat.entries.keys()].sort();
      const body = Buffer.from(JSON.stringify({ ok: true, game: cat.dir, count: items.length, items }), 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': String(body.length),
        'Cache-Control': 'no-cache'
      });
      res.end(body);
      return;
    }
    if ((mode === 'thumb' || mode === 'img') && slug) {
      const meta = cat.entries.get(slug);
      if (!meta) { notFound(res); return; }
      const key = mode + ':' + slug;
      let png = cacheGet(key);
      if (!png) {
        png = renderLoadingScreen(cat, meta, mode === 'thumb' ? 320 : 0);
        if (!png) { notFound(res); return; }
        cacheSet(key, png);   // 缩略图与原图都缓存，切换壁纸才够快
      }
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': String(png.length),
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(png);
      return;
    }
    notFound(res);
  } catch { notFound(res); }
}

export const inject = ['webServer'];

export function apply(ctx) {
  const webServer = ctx.webServer;
  if (!webServer || typeof webServer.register !== 'function') return;

  ctx.effect(() => {
    const disposers = [];

    function claim(routePath, resolveType, resolveFile) {
      for (const kind of ['exact', 'prefix']) {
        try {
          const dispose = webServer.register({
            kind,
            path: routePath,
            handler: (req, res) => {
              let file = null;
              try { file = resolveFile(); } catch { file = null; }
              if (!file) { notFound(res); return; }
              try { serveFile(req, res, file, resolveType()); } catch { notFound(res); }
            }
          });
          disposers.push(dispose);
        } catch { /* 路由冲突，交给另一种 kind */ }
      }
    }

    // 插件自带素材
    let names = [];
    try { names = readdirSync(ASSET_DIR); } catch { names = []; }
    for (const name of names) {
      const type = CONTENT_TYPES[path.extname(name).toLowerCase()];
      if (!type) continue;
      const file = path.join(ASSET_DIR, name);
      claim(ROUTE_ROOT + name, () => type, () => file);
    }

    // 本机游戏里的开场影片
    for (const route of Object.keys(BOOT_ROUTES)) {
      claim(ROUTE_ROOT + route, () => 'video/webm', () => {
        const dir = findGameDir();
        if (!dir) return null;
        const file = path.join(dir, 'panorama', 'videos', BOOT_ROUTES[route]);
        try { return statSync(file).isFile() ? file : null; } catch { return null; }
      });
    }

    // 载入画面：本环境 prefix 路由只对完全相同路径生效，所以按每个 slug 逐条注册 exact
    try {
      const cat = buildCatalog();
      const handler = (req, res) => handleLs(req, res, cat);
      const paths = new Set([LS_ROOT, '/dota2-ui/ls', LS_ROOT + 'index.json', LS_ROOT + 'index']);
      if (cat) {
        for (const slug of cat.entries.keys()) {
          const enc = encodeURIComponent(slug);
          paths.add(LS_ROOT + 'thumb/' + enc + '.png');
          paths.add(LS_ROOT + 'img/' + enc + '.png');
        }
      }
      let ok = 0;
      for (const p of paths) {
        for (const kind of (p === '/dota2-ui/ls' || p === LS_ROOT ? ['exact', 'prefix'] : ['exact'])) {
          try { disposers.push(webServer.register({ kind, path: p, handler })); ok++; } catch { /* 已占用 */ }
        }
      }
      try {
        appendFileSync(path.join(HERE, '_diag.log'), JSON.stringify({
          tag: 'host', gameDir: cat ? cat.dir : null,
          lsCount: cat ? cat.entries.size : 0, routesOk: ok, routesTried: paths.size
        }) + '\n');
      } catch { /* 忽略 */ }
    } catch { /* 路由冲突 */ }

    // 战绩本地缓存：HTTP 路由 + 后台定时抓取
    try {
      loadStore();
      const handler = (req, res) => serveDota(req, res);
      for (const pt of ['/dota2-ui/dota', '/dota2-ui/dota/']) {
        for (const kind of ['exact', 'prefix']) {
          try { disposers.push(webServer.register({ kind, path: pt, handler })); } catch { /* 已占用 */ }
        }
      }
      const kick = setTimeout(() => { refreshCache(); }, 4000);
      const timer = setInterval(() => { refreshCache(); }, 60000);
      disposers.push(() => { clearTimeout(kick); clearInterval(timer); });
      try {
        appendFileSync(path.join(HERE, '_diag.log'), JSON.stringify({
          tag: 'host-cache', have: !!(store.matches && store.matches.length),
          matches: store.matches ? store.matches.length : 0, details: Object.keys(store.details).length
        }) + '\n');
      } catch { /* 忽略 */ }
    } catch { /* 路由冲突 */ }

    // 诊断通道
    try {
      const logFile = path.join(HERE, '_diag.log');
      const dispose = webServer.register({
        kind: 'prefix',
        path: '/dota2-ui/diag',
        handler: (req, res) => {
          try {
            const raw = req.url || '';
            const q = raw.indexOf('?');
            if (q !== -1) appendFileSync(logFile, decodeURIComponent(raw.slice(q + 1)) + '\n');
          } catch { /* 忽略 */ }
          try { res.writeHead(204); res.end(); } catch { /* 忽略 */ }
        }
      });
      disposers.push(dispose);
    } catch { /* 路由冲突 */ }

    return () => {
      for (const dispose of disposers) {
        try { dispose(); } catch { /* 已移除 */ }
      }
    };
  });
}
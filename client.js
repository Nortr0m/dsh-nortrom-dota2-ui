/* ==========================================================================
   DOTA2 主题  —  Client half
   玩家 135700444 · 远古 IV · 天梯分约 4014
   美术素材经 Host 半的 /dota2-ui/assets/ 路由提供；
   开场影片直接从本机 Dota 2 安装目录流式读取。
   ========================================================================== */

window.__ModuleLoader__.load({
  id: '@local/dsh-nortrom-dota2-ui',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PLAYER_ID = 135700444;
    const ASSET_BASE = '/dota2-ui/assets/';
    const LOGO_FILE = 'dota2-logo.png';

    /* ------------------------------------------------------------------
       官方中文英雄名（dota2.com 简体中文 datafeed）
       ------------------------------------------------------------------ */
    const HERO_CN = {
      1: '敌法师', 2: '斧王', 3: '祸乱之源', 4: '血魔', 5: '水晶室女', 6: '卓尔游侠',
      7: '撼地者', 8: '主宰', 9: '米拉娜', 10: '变体精灵', 11: '影魔', 12: '幻影长矛手',
      13: '帕克', 14: '帕吉', 15: '雷泽', 16: '沙王', 17: '风暴之灵', 18: '斯温', 19: '小小',
      20: '复仇之魂', 21: '风行者', 22: '宙斯', 23: '昆卡', 25: '莉娜', 26: '莱恩',
      27: '暗影萨满', 28: '斯拉达', 29: '潮汐猎人', 30: '巫医', 31: '巫妖', 32: '力丸',
      33: '谜团', 34: '修补匠', 35: '狙击手', 36: '瘟疫法师', 37: '术士', 38: '兽王',
      39: '痛苦女王', 40: '剧毒术士', 41: '虚空假面', 42: '冥魂大帝', 43: '死亡先知',
      44: '幻影刺客', 45: '帕格纳', 46: '圣堂刺客', 47: '冥界亚龙', 48: '露娜', 49: '龙骑士',
      50: '戴泽', 51: '发条技师', 52: '拉席克', 53: '自然先知', 54: '噬魂鬼', 55: '黑暗贤者',
      56: '克林克兹', 57: '全能骑士', 58: '魅惑魔女', 59: '哈斯卡', 60: '暗夜魔王',
      61: '育母蜘蛛', 62: '赏金猎人', 63: '编织者', 64: '杰奇洛', 65: '蝙蝠骑士', 66: '陈',
      67: '幽鬼', 68: '远古冰魄', 69: '末日使者', 70: '熊战士', 71: '裂魂人', 72: '矮人直升机',
      73: '炼金术士', 74: '祈求者', 75: '沉默术士', 76: '殁境神蚀者', 77: '狼人', 78: '酒仙',
      79: '暗影恶魔', 80: '独行德鲁伊', 81: '混沌骑士', 82: '米波', 83: '树精卫士',
      84: '食人魔魔法师', 85: '不朽尸王', 86: '拉比克', 87: '干扰者', 88: '司夜刺客',
      89: '娜迦海妖', 90: '光之守卫', 91: '艾欧', 92: '维萨吉', 93: '斯拉克', 94: '美杜莎',
      95: '巨魔战将', 96: '半人马战行者', 97: '马格纳斯', 98: '伐木机', 99: '钢背兽',
      100: '巨牙海民', 101: '天怒法师', 102: '亚巴顿', 103: '上古巨神', 104: '军团指挥官',
      105: '工程师', 106: '灰烬之灵', 107: '大地之灵', 108: '孽主', 109: '恐怖利刃',
      110: '凤凰', 111: '神谕者', 112: '寒冬飞龙', 113: '天穹守望者', 114: '齐天大圣',
      119: '邪影芳灵', 120: '石鳞剑士', 121: '天涯墨客', 123: '森海飞霞', 126: '虚无之灵',
      128: '电炎绝手', 129: '玛尔斯', 131: '百戏大王', 135: '破晓辰星', 136: '玛西',
      137: '獸', 138: '琼英碧灵', 145: '凯', 155: '朗戈'
    };
    function heroName(id) { return HERO_CN[id] || ('英雄 #' + id); }
    /* 玩家英雄 id → slug（用于取游戏内头像） */
    const HERO_ICON_SLUG = {
      1: 'antimage', 2: 'axe', 3: 'bane', 4: 'bloodseeker', 5: 'crystal_maiden',
      6: 'drow_ranger', 7: 'earthshaker', 8: 'juggernaut', 9: 'mirana', 10: 'morphling',
      11: 'nevermore', 12: 'phantom_lancer', 13: 'puck', 14: 'pudge', 15: 'razor',
      16: 'sand_king', 17: 'storm_spirit', 18: 'sven', 19: 'tiny', 20: 'vengefulspirit',
      21: 'windrunner', 22: 'zuus', 23: 'kunkka', 25: 'lina', 26: 'lion',
      27: 'shadow_shaman', 28: 'slardar', 29: 'tidehunter', 30: 'witch_doctor', 31: 'lich',
      32: 'riki', 33: 'enigma', 34: 'tinker', 35: 'sniper', 36: 'necrolyte',
      37: 'warlock', 38: 'beastmaster', 39: 'queenofpain', 40: 'venomancer', 41: 'faceless_void',
      42: 'skeleton_king', 43: 'death_prophet', 44: 'phantom_assassin', 45: 'pugna', 46: 'templar_assassin',
      47: 'viper', 48: 'luna', 49: 'dragon_knight', 50: 'dazzle', 51: 'rattletrap',
      52: 'leshrac', 53: 'furion', 54: 'life_stealer', 55: 'dark_seer', 56: 'clinkz',
      57: 'omniknight', 58: 'enchantress', 59: 'huskar', 60: 'night_stalker', 61: 'broodmother',
      62: 'bounty_hunter', 63: 'weaver', 64: 'jakiro', 65: 'batrider', 66: 'chen',
      67: 'spectre', 68: 'ancient_apparition', 69: 'doom_bringer', 70: 'ursa', 71: 'spirit_breaker',
      72: 'gyrocopter', 73: 'alchemist', 74: 'invoker', 75: 'silencer', 76: 'obsidian_destroyer',
      77: 'lycan', 78: 'brewmaster', 79: 'shadow_demon', 80: 'lone_druid', 81: 'chaos_knight',
      82: 'meepo', 83: 'treant', 84: 'ogre_magi', 85: 'undying', 86: 'rubick',
      87: 'disruptor', 88: 'nyx_assassin', 89: 'naga_siren', 90: 'keeper_of_the_light', 91: 'wisp',
      92: 'visage', 93: 'slark', 94: 'medusa', 95: 'troll_warlord', 96: 'centaur',
      97: 'magnataur', 98: 'shredder', 99: 'bristleback', 100: 'tusk', 101: 'skywrath_mage',
      102: 'abaddon', 103: 'elder_titan', 104: 'legion_commander', 105: 'techies', 106: 'ember_spirit',
      107: 'earth_spirit', 108: 'abyssal_underlord', 109: 'terrorblade', 110: 'phoenix', 111: 'oracle',
      112: 'winter_wyvern', 113: 'arc_warden', 114: 'monkey_king', 119: 'dark_willow', 120: 'pangolier',
      121: 'grimstroke', 123: 'hoodwink', 126: 'void_spirit', 128: 'snapfire', 129: 'mars',
      131: 'ringmaster', 135: 'dawnbreaker', 136: 'marci', 137: 'primal_beast', 138: 'muerta',
      145: 'kez', 155: 'largo'
    };
    function heroIconUrl(slug) {
      return 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/' + slug + '.png';
    }

    /* 天梯段位：rank_tier = 奖章 × 10 + 星。
       译名取自游戏自带简中本地化（DOTARankTierName / DOTARankPipsName）；
       官方格式 DOTARankTierFormat = 名称紧接星级、无分隔符，如「万古流芳IV」。 */
    const MEDALS = {
      1: ['先锋', '#a0845c'], 2: ['卫士', '#8fbc8f'], 3: ['中军', '#6da06a'],
      4: ['统帅', '#5a8ec2'], 5: ['传奇', '#4b6fdb'], 6: ['万古流芳', '#b060d0'],
      7: ['超凡入圣', '#ffd700'], 8: ['冠绝一世', '#ff4500']
    };
    const PIPS = ['', 'I', 'II', 'III', 'IV', 'V', ' VI', ' VII'];
    function rankOf(tier) {
      const medal = Math.floor(tier / 10);
      const star = tier % 10;
      const row = MEDALS[medal];
      if (!row) return { label: '未校准', color: '#8a7a63', star: 0 };
      if (medal >= 8) return { label: row[0], color: row[1], star: 0 };
      return { label: row[0] + (PIPS[star] || ''), color: row[1], star: 0 };
    }

    /* ------------------------------------------------------------------
       内置档案（离线也能立刻渲染），联网后自动更新
       ------------------------------------------------------------------ */
    const BAKED = {
      personaname: '\u3077\u585f\u61d3\u3077\u226e\u609f\u6a24\u226f',
      avatar: 'https://avatars.steamstatic.com/be6461b1287d76e0a1121b832116442b59b8863d_full.jpg',
      rankTier: 64,
      mmr: 4014,
      topHeroes: [
        { id: 88, games: 131, winrate: 61 },
        { id: 93, games: 27, winrate: 48 },
        { id: 42, games: 25, winrate: 48 }
      ],
      recent: [
        { hero: 93, win: false, k: 12, d: 11, a: 13 },
        { hero: 88, win: false, k: 10, d: 10, a: 10 },
        { hero: 88, win: false, k: 7, d: 7, a: 11 },
        { hero: 93, win: false, k: 12, d: 13, a: 12 },
        { hero: 88, win: true, k: 6, d: 12, a: 23 },
        { hero: 88, win: true, k: 5, d: 8, a: 19 },
        { hero: 36, win: false, k: 2, d: 14, a: 1 },
        { hero: 62, win: false, k: 4, d: 16, a: 29 },
        { hero: 88, win: false, k: 6, d: 10, a: 10 },
        { hero: 88, win: false, k: 7, d: 9, a: 22 },
        { hero: 88, win: true, k: 10, d: 9, a: 19 },
        { hero: 1, win: false, k: 9, d: 14, a: 9 },
        { hero: 1, win: false, k: 22, d: 7, a: 9 },
        { hero: 93, win: true, k: 18, d: 4, a: 17 },
        { hero: 1, win: true, k: 8, d: 6, a: 17 },
        { hero: 88, win: true, k: 9, d: 6, a: 19 },
        { hero: 32, win: true, k: 15, d: 4, a: 12 },
        { hero: 14, win: false, k: 11, d: 8, a: 13 },
        { hero: 104, win: true, k: 12, d: 11, a: 25 },
        { hero: 71, win: true, k: 7, d: 3, a: 32 }
      ]
    };

    /* ------------------------------------------------------------------
       背景素材（已下载到插件本地）
       ------------------------------------------------------------------ */
    const BACKGROUNDS = [
      { id: 'ancient', name: '古战场 · 默认', file: null },
      { id: 'keyart', name: '官方主视觉', file: 'official-keyart.jpg' },
      { id: 'storebg', name: '商店页原画', file: 'official-storebg.jpg' }
    ];
    function bgUrl(file) { return ASSET_BASE + file; }
    function thumbUrl(file) { return ASSET_BASE + 'thumb-' + file.replace(/\.[^.]+$/, '') + '.jpg'; }

    /* 游戏内载入画面：Host 从 VPK 实时解码，不复制、不占空间 */
    const LS_INDEX_URL = '/dota2-ui/ls/index.json';
    let lsCatalog = null;
    function loadCatalog() {
      if (!lsCatalog) {
        lsCatalog = (typeof fetch === 'function')
          ? fetch(LS_INDEX_URL).then(function (r) { return r.json(); })
              .then(function (d) { return d && d.items && d.items.length ? d.items : []; })
              .catch(function () { return []; })
          : Promise.resolve([]);
      }
      return lsCatalog;
    }

    function lsThumb(slug) { return '/dota2-ui/ls/thumb/' + encodeURIComponent(slug) + '.png'; }
    function lsImage(slug) { return '/dota2-ui/ls/img/' + encodeURIComponent(slug) + '.png'; }
    const LS_CAT_LABEL = {
      ti: 'TI 主视觉', cache: 'TI 珍藏', artgerm: 'Artgerm',
      crownfall: '王冠之陨', carnival: '暗黑嘉年华',
      frostivus: '冬幕节', diretide: '迎霜节',
      econ: '饰品载入画面', ls: '英雄套装', other: '其他'
    };
    const HERO_SLUG_CN = {
      anti_mage: '敌法师', axe: '斧王', bane: '祸乱之源', bloodseeker: '血魔',
      crystal_maiden: '水晶室女', drow_ranger: '卓尔游侠', earthshaker: '撼地者',
      juggernaut: '主宰', mirana: '米拉娜', nevermore: '影魔', morphling: '变体精灵',
      phantom_lancer: '幻影长矛手', puck: '帕克', pudge: '帕吉', razor: '雷泽',
      sand_king: '沙王', storm_spirit: '风暴之灵', sven: '斯温', tiny: '小小',
      vengefulspirit: '复仇之魂', windrunner: '风行者', zuus: '宙斯', kunkka: '昆卡',
      lina: '莉娜', lion: '莱恩', shadow_shaman: '暗影萨满', slardar: '斯拉达',
      tidehunter: '潮汐猎人', witch_doctor: '巫医', lich: '巫妖', riki: '力丸',
      enigma: '谜团', tinker: '修补匠', sniper: '狙击手', necrolyte: '疫疫法师',
      warlock: '术士', beastmaster: '兽王', queenofpain: '痛苦女王', venomancer: '剧毒术士',
      faceless_void: '虚空假面', skeleton_king: '冥魂大帝', death_prophet: '死亡先知',
      phantom_assassin: '幻影刺客', pugna: '帕格纳', templar_assassin: '圣堂刺客',
      viper: '冥界亚龙', luna: '露娜', dragon_knight: '龙骑士', dazzle: '戴泽',
      rattletrap: '发条技师', leshrac: '拉席克', furion: '自然先知',
      life_stealer: '噬魂鬼', dark_seer: '黑暗贤者', clinkz: '克林克兹',
      omniknight: '全能骑士', enchantress: '魅惑魔女', huskar: '哈斯卡',
      night_stalker: '暗夜魔王', broodmother: '育母蜘蛛', bounty_hunter: '赏金猎人',
      weaver: '编织者', jakiro: '杰奇洛', batrider: '蝙蝠骑士', chen: '陈',
      spectre: '幽鬼', doom_bringer: '末日使者', ursa: '熊战士', spirit_breaker: '裂魂人',
      gyrocopter: '矮人直升机', alchemist: '炼金术士', invoker: '祈求者',
      silencer: '沉默术士', obsidian_destroyer: '殁境神蚀者', lycan: '狼人',
      brewmaster: '酒仙', shadow_demon: '暗影恶魔', lone_druid: '独行德鲁伊',
      chaos_knight: '混沌骑士', meepo: '米波', treant: '树精卫士',
      ogre_magi: '食人魔魔法师', undying: '不朽尸王', rubick: '拉比克',
      disruptor: '干扰者', nyx_assassin: '司夜刺客', naga_siren: '娜迦海妖',
      keeper_of_the_light: '光之守卫', wisp: '艾欧', visage: '维萨吉',
      slark: '斯拉克', medusa: '美杜莎', troll_warlord: '巨魔战将',
      centaur: '半人马战行者', magnataur: '马格纳斯', shredder: '伐木机',
      bristleback: '钢背兽', tusk: '巨牙海民', skywrath_mage: '天怒法师',
      abaddon: '亚巴顿', elder_titan: '上古巨神', legion_commander: '军团指挥官',
      techies: '工程师', ember_spirit: '炰烬之灵', earth_spirit: '大地之灵',
      abyssal_underlord: '孽主', terrorblade: '恐怖利刃', phoenix: '凤凰',
      oracle: '神谕者', winter_wyvern: '寒冬飞龙', arc_warden: '天穹守望者',
      monkey_king: '齐天大圣', dark_willow: '邪影芳灵', pangolier: '石鲞剑士',
      grimstroke: '天涯墨客', hoodwink: '森海飞霞', mars: '玛尔斯',
      snapfire: '电炎绝手', void_spirit: '虚无之灵', dawnbreaker: '破晓辰星',
      marci: '玛西', primal_beast: '獸', muerta: '琬英碧灵', kez: '凯',
      ringmaster: '百戏大王'
    };
    const HERO_SLUGS = Object.keys(HERO_SLUG_CN).sort(function (a, b) { return b.length - a.length; });

    function lsMeta(slug) {
      const low = slug.toLowerCase();
      let hero = null;
      for (let i = 0; i < HERO_SLUGS.length; i++) {
        if (low.indexOf(HERO_SLUGS[i]) >= 0) { hero = HERO_SLUGS[i]; break; }
      }
      let cat = 'other';
      if (/^ti\d_keyart/.test(low)) cat = 'ti';
      else if (low.indexOf('cache') >= 0) cat = 'cache';
      else if (low.indexOf('artgerm') >= 0) cat = 'artgerm';
      else if (low.indexOf('crownfall') >= 0) cat = 'crownfall';
      else if (low.indexOf('carnival') >= 0) cat = 'carnival';
      else if (low.indexOf('frostivus') >= 0) cat = 'frostivus';
      else if (low.indexOf('diretide') >= 0) cat = 'diretide';
      else if (low.indexOf('econ') >= 0) cat = 'econ';
      else if (low.slice(-3) === '_ls') cat = 'ls';
      return { cat: cat, hero: hero, title: hero ? HERO_SLUG_CN[hero] : slug.replace(/_/g, ' ') };
    }

    /** 当前背景 id → 底图 URL（null = 程序化古战场渐变） */
    function wallFor(id) {
      if (typeof id === 'string' && id.slice(0, 3) === 'ls:') return lsImage(id.slice(3));
      for (let i = 0; i < BACKGROUNDS.length; i++) {
        if (BACKGROUNDS[i].id === id && BACKGROUNDS[i].file) return bgUrl(BACKGROUNDS[i].file);
      }
      return null;
    }
    /** 当前背景的可读名称 */
    function bgLabel(id) {
      if (typeof id === 'string' && id.slice(0, 3) === 'ls:') return '游戏载入画面 · ' + lsMeta(id.slice(3)).title;
      for (let i = 0; i < BACKGROUNDS.length; i++) if (BACKGROUNDS[i].id === id) return BACKGROUNDS[i].name;
      return '无（已自动回退）';
    }

    /* ------------------------------------------------------------------
       开场动画来源：两个真实影片（本机游戏文件）+ 自制动画 + 关闭
       ------------------------------------------------------------------ */
    const BOOTS = [
      { id: 'platinum', name: '白金徽记（自制）', note: '自制白金标 + 近 3 个月常用英雄', kind: 'platinum' },
      { id: 'intro', name: '官方开场影片', note: '1920×1080 · 31 秒 · 含音轨（已跳过前 10.5 秒的 Valve 标志与黑场）', kind: 'video', route: 'boot-intro.webm', fit: 'cover', startAt: 10.5 },
      { id: 'logo', name: '动态标徽', note: '竖版 384×472 · 10 秒 · 无音轨', kind: 'video', route: 'boot-logo.webm', fit: 'contain', startAt: 0 },
      { id: 'css', name: '自制金光动画', note: '约 2.7 秒', kind: 'css', fit: 'cover', startAt: 0 },
      { id: 'off', name: '关闭', note: '', kind: 'none', fit: 'cover', startAt: 0 }
    ];
    function bootById(id) {
      for (let i = 0; i < BOOTS.length; i++) {
        if (BOOTS[i].id === id) return BOOTS[i];
      }
      return BOOTS[0];
    }

    /* ------------------------------------------------------------------
       偏好设置
       ------------------------------------------------------------------ */
    const PREFS_KEY = 'dota2-ancient-ui';
    const SPLASH_KEY = 'dota2-splash-shown';
    const DEFAULT_PREFS = { v: 3, enabled: true, background: 'ancient', boot: 'intro', bootSound: true, mmrManual: '', panelAlpha: 55, autoTint: true, pureWall: false };

    function migratePrefs(saved) {
      const out = Object.assign({}, DEFAULT_PREFS, saved);
      if ((saved.v || 1) < 2) {
        out.panelAlpha = DEFAULT_PREFS.panelAlpha;
        out.bootSound = DEFAULT_PREFS.bootSound;
      }
      if ((saved.v || 1) < 3) {
        const bgId = String(out.background || '');
        const known = bgId.slice(0, 3) === 'ls:' || BACKGROUNDS.some(function (b) { return b.id === bgId; });
        if (!known) out.background = 'keyart';
      }
      out.v = DEFAULT_PREFS.v;
      return out;
    }
    let prefs = Object.assign({}, DEFAULT_PREFS);
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          prefs = migratePrefs(saved);
          if ((saved.v || 1) < 2) {
            // 旧版本存下的面板透明度与声音开关会盖住新默认值，迁移时重置一次
            prefs.panelAlpha = DEFAULT_PREFS.panelAlpha;
            prefs.bootSound = DEFAULT_PREFS.bootSound;
          }
          if ((saved.v || 1) < 3) {
            // 旧版本保存的背景 id 可能指向已删除的离线图，解析不到就回退到内置主视觉
            const bgId = String(prefs.background || '');
            const known = bgId.slice(0, 3) === 'ls:' || BACKGROUNDS.some(function (b) { return b.id === bgId; });
            if (!known) prefs.background = 'keyart';
          }
          prefs.v = 3;
          try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e2) {}
        }
      }
    } catch (e) { /* 存储不可用则用默认值 */ }

    const listeners = new Set();
    function emit() { listeners.forEach(function (fn) { try { fn(prefs); } catch (e) {} }); }
    function savePrefsToDisk() {
      try {
        if (typeof fetch !== 'function') return;
        fetch('/dota2-ui/prefs', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prefs)
        }).catch(function () {});
      } catch (e) { /* 忽略 */ }
    }
    function loadDiskPrefs() {
      try {
        if (typeof fetch !== 'function') return;
        fetch('/dota2-ui/prefs', { cache: 'no-store' }).then(function (r) { return r.json(); })
          .then(function (d) {
            // 只接受真正含我们键的磁盘偏好；'{}'（文件不存在）绝不能覆盖 localStorage 已恢复的偏好
            const real = d && typeof d === 'object' &&
              ('background' in d || 'enabled' in d || 'boot' in d || 'panelAlpha' in d);
            if (real) {
              prefs = migratePrefs(d);
              try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) {}
              emit();
            } else {
              // 磁盘还没有内容：用当前（localStorage 恢复的）偏好播种，避免下次重启又丢
              savePrefsToDisk();
            }
          }).catch(function () { /* Host 不可用就用本地 */ });
      } catch (e) { /* 忽略 */ }
    }
    function setPref(key, value) {
      const next = Object.assign({}, prefs);
      next[key] = value;
      prefs = next;
      try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) {}
      savePrefsToDisk();
      emit();
    }
    function subscribePrefs(fn) { listeners.add(fn); return function () { listeners.delete(fn); }; }

    function usePrefs() {
      const [snap, setSnap] = React.useState(prefs);
      React.useEffect(function () {
        setSnap(prefs);
        return subscribePrefs(setSnap);
      }, []);
      return snap;
    }

    /* 手动重播开场动画（设置页的“预览”按钮） */
    const replayListeners = new Set();
    let replaySeq = 0;
    function bumpReplay() {
      replaySeq += 1;
      replayListeners.forEach(function (fn) { try { fn(replaySeq); } catch (e) {} });
    }
    function useReplay() {
      const [n, setN] = React.useState(replaySeq);
      React.useEffect(function () {
        const fn = function (v) { setN(v); };
        replayListeners.add(fn);
        return function () { replayListeners.delete(fn); };
      }, []);
      return n;
    }

    /* ------------------------------------------------------------------
       主题令牌：古战场为不透明深棕；选用图片背景时改半透明以露出底图。
       ------------------------------------------------------------------ */
    /* ---- 配色跟随背景：从壁纸抽主色，整站色系随之切换 ---- */
    let wallTint = null;
    let lastSampledUrl = null;
    let wallUrlNow = null;
    let wallImgEl = 'init';
    // 临时测试：强制固定一张已验证的载入画面，排除选择器与偏好干扰
    const TEST_WALL = null;

    function rgb2hsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const l = (mx + mn) / 2;
      let h = 0, sat = 0;
      if (mx !== mn) {
        const d = mx - mn;
        sat = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
        if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (mx === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
      }
      return { h: h, s: sat, l: l };
    }

    function hsl2rgb(h, sat, l) {
      const f = function (q, pp, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return pp + (q - pp) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return pp + (q - pp) * (2 / 3 - t) * 6;
        return pp;
      };
      if (sat === 0) { const v = Math.round(l * 255); return [v, v, v]; }
      const q = l < 0.5 ? l * (1 + sat) : l + sat - l * sat;
      const pp = 2 * l - q;
      return [Math.round(f(q, pp, h + 1 / 3) * 255),
              Math.round(f(q, pp, h) * 255),
              Math.round(f(q, pp, h - 1 / 3) * 255)];
    }

    function tintFromImage(img) {
      try {
        const n = 40;
        const c = document.createElement('canvas');
        c.width = n; c.height = n;
        const g = c.getContext('2d');
        g.drawImage(img, 0, 0, n, n);
        const d = g.getImageData(0, 0, n, n).data;
        let sr = 0, sg = 0, sb = 0, cnt = 0, best = null, bestScore = -1;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], gg = d[i + 1], b = d[i + 2];
          sr += r; sg += gg; sb += b; cnt++;
          const hsl = rgb2hsl(r, gg, b);
          const score = hsl.s * (1 - Math.abs(hsl.l - 0.5) * 1.1);
          if (score > bestScore) { bestScore = score; best = [r, gg, b]; }
        }
        const avg = [sr / cnt, sg / cnt, sb / cnt];
        const ah = rgb2hsl(avg[0], avg[1], avg[2]);
        const ac = rgb2hsl(best[0], best[1], best[2]);
        const ts = Math.min(ah.s * 0.7, 0.42);
        return {
          dark: hsl2rgb(ah.h, ts, 0.055),
          side: hsl2rgb(ah.h, ts, 0.065),
          mid: hsl2rgb(ah.h, ts, 0.085),
          layer: hsl2rgb(ah.h, ts, 0.10),
          accent: hsl2rgb(ac.h, Math.max(0.34, Math.min(ac.s, 0.70)), 0.62),
          accentHi: hsl2rgb(ac.h, Math.max(0.34, Math.min(ac.s, 0.82)), 0.76),
          accentDim: hsl2rgb(ac.h, Math.max(0.24, Math.min(ac.s, 0.55)), 0.34),
          ink: hsl2rgb(ah.h, 0.22, 0.92),
          ink2: hsl2rgb(ah.h, 0.16, 0.68),
          avg: avg
        };
      } catch (e) { return null; }
    }

    function sampleWall(url) {
      if (typeof document === 'undefined' || !url) return;
      try {
        const img = new Image();
        img.onload = function () {
          const t = tintFromImage(img);
          if (t) { wallTint = t; try { syncTokens(); } catch (e) { /* 忽略 */ } }
        };
        img.onerror = function () { wallTint = null; };
        img.src = url;
      } catch (e) { /* 忽略 */ }
    }

    function tokensFor(background, panelAlpha, tint, wallTint) {
      const photo = background !== 'ancient';
      const a = Math.max(40, Math.min(98, typeof panelAlpha === 'number' ? panelAlpha : 78)) / 100;
      const cl = function (v) { return Math.max(0.30, Math.min(0.98, v)); };
      const rgba = function (r, g, b, alpha) { return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(2) + ')'; };
      const Mb = function (v, d) { return Math.max(0.10, Math.min(0.98, v - d)); };
      const light = photo
        ? { base: rgba(239,227,204,Mb(a,.40)), l1: rgba(247,239,221,cl(a+.10)), l2: rgba(231,217,189,cl(a+.28)), side: rgba(230,215,184,cl(a-.15)) }
        : { base: '#efe3cc', l1: '#f7efdd', l2: '#e7d9bd', side: '#e6d7b8' };
      const useT = !!(tint && prefs.autoTint);
      const c3 = function (rgb, alpha) { return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha.toFixed(2) + ')'; };
      const dark = !photo
        ? { base: '#0d0805', l1: '#241609', l2: '#180e06', side: '#170e06' }
        : useT
          ? { base: c3(tint.dark, Mb(a,.40)), l1: c3(tint.layer, cl(a+.10)), l2: c3(tint.mid, cl(a+.28)), side: c3(tint.side, cl(a-.15)) }
          : { base: rgba(13,8,5,Mb(a,.40)), l1: rgba(36,22,9,cl(a+.10)), l2: rgba(24,14,6,cl(a+.28)), side: rgba(23,14,6,cl(a-.15)) };
      const acc = useT ? 'rgb(' + tint.accent.join(',') + ')' : 'var(--d2-gold, #c9a55c)';
      const accHi = useT ? 'rgb(' + tint.accentHi.join(',') + ')' : 'var(--d2-gold-hi, #f0c070)';
      const bd1 = useT ? 'rgba(' + tint.accentDim.join(',') + ',.75)' : '#3d2a17';
      const bd2 = useT ? 'rgba(' + tint.accent.join(',') + ',.85)' : '#5c4222';
      const ink1 = useT ? 'rgb(' + tint.ink.join(',') + ')' : '#eadfc8';
      const ink2 = useT ? 'rgb(' + tint.ink2.join(',') + ')' : '#a8977c';
      return {
        '--dsw-alias-bg-base': { light: light.base, dark: dark.base },
        '--dsw-alias-bg-layer-1': { light: light.l1, dark: dark.l1 },
        '--dsw-alias-bg-layer-2': { light: light.l2, dark: dark.l2 },
        '--dsw-alias-bg-overlay': { light: 'rgba(247,239,221,.98)', dark: 'rgba(24,14,6,.97)' },
        '--dsw-alias-border-l1': { light: '#d6c39c', dark: bd1 },
        '--dsw-alias-border-l2': { light: '#b89b66', dark: bd2 },
        '--dsw-alias-brand-primary': { light: '#8a6a1f', dark: acc },
        '--dsw-alias-label-primary': { light: '#2e2113', dark: ink1 },
        '--dsw-alias-label-secondary': { light: '#6b5a41', dark: ink2 },
        '--dsw-alias-state-error-primary': { light: '#a83232', dark: '#c0392b' },
        '--dsw-alias-state-idle-primary': { light: '#a2917a', dark: '#6b5b47' },
        '--dsw-alias-state-success-primary': { light: '#4f7a34', dark: '#6f9e4a' },
        '--dsw-alias-state-warn-primary': { light: '#a8761c', dark: '#d9a441' },
        '--dsw-specific-sidebar-fill': { light: light.side, dark: dark.side }
      };
    }

    /* ------------------------------------------------------------------
       静态样式表
       ------------------------------------------------------------------ */
    const CSS = [
      /* 通用动效（均不含位移与缩放，避免“晃动”感） */
      '@keyframes d2-rise { from { opacity: 0; } to { opacity: 1; } }',
      '@keyframes d2-breathe { 0%,100% { box-shadow: 0 0 18px rgb(var(--d2-gold-rgb, 201 165 92) / .18), 0 0 40px rgba(139,26,26,.10); } 50% { box-shadow: 0 0 32px rgb(var(--d2-gold-rgb, 201 165 92) / .34), 0 0 64px rgba(139,26,26,.18); } }',
      '@keyframes d2-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      '@keyframes d2-glow { 0%,100% { opacity: .5; } 50% { opacity: 1; } }',
      '@keyframes d2-shimmer { 0% { background-position: -220% 0; } 100% { background-position: 220% 0; } }',
      '@keyframes d2-sweep-band { 0% { transform: translateY(-60%); opacity: 0; } 45% { opacity: .22; } 100% { transform: translateY(60%); opacity: 0; } }',

      /* 开场动画 — 影片模式 */
      '@keyframes d2-sp-in { from { opacity: 0; } to { opacity: 1; } }',
      '@keyframes d2-sp-out { from { opacity: 1; } to { opacity: 0; } }',
      '.d2-splash { position: fixed; inset: 0; z-index: 2147483000; background: #040302; overflow: hidden; animation: d2-sp-in .35s ease-out; pointer-events: auto; }',
      '.d2-splash.out { animation: d2-sp-out .8s ease-in forwards; }',
      '.d2-sp-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: #000; display: block; }',
      '.d2-sp-bar { position: absolute; right: 20px; bottom: 18px; display: flex; gap: 8px; align-items: center; }',
      '.d2-sp-btn { font: inherit; font-size: 12px; letter-spacing: 1px; cursor: pointer; color: var(--d2-gold-hi, #f0c070); background: rgba(13,8,5,.72); border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .45); border-radius: 4px; padding: 5px 12px; transition: background .15s, border-color .15s; }',
      '.d2-sp-btn:hover { background: rgba(42,26,15,.9); border-color: var(--d2-gold-hi, #f0c070); }',
      '.d2-sp-btn:focus-visible { outline: 2px solid var(--d2-gold-hi, #f0c070); outline-offset: 2px; }',

      /* 开场动画 — 自制模式 */
      '@keyframes d2-cs-logo { 0% { opacity: 0; filter: blur(6px); } 60% { opacity: 1; filter: blur(0); } 100% { opacity: 1; } }',
      '@keyframes d2-cs-glow { 0%,100% { opacity: .35; } 50% { opacity: .8; } }',
      '@keyframes d2-cs-sweep { 0% { transform: translateX(-130%) skewX(-18deg); opacity: 0; } 35% { opacity: .9; } 100% { transform: translateX(130%) skewX(-18deg); opacity: 0; } }',
      '@keyframes d2-cs-ring { 0% { opacity: .85; } 100% { opacity: 0; } }',
      '@keyframes d2-cs-spark { 0% { opacity: 0; transform: translateY(60px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-70px); } }',
      '@keyframes d2-cs-line { 0% { transform: scaleX(0); opacity: 0; } 40% { opacity: 1; } 100% { transform: scaleX(1); opacity: .9; } }',
      '@keyframes d2-cs-rise { 0% { opacity: 0; } 100% { opacity: 1; } }',
      '.d2-cs { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #040302; cursor: pointer; }',
      '.d2-cs-glow { position: absolute; width: 70vmin; height: 70vmin; border-radius: 50%; background: radial-gradient(circle, rgb(var(--d2-gold-rgb, 201 165 92) / .30) 0%, rgba(139,26,26,.12) 45%, rgba(0,0,0,0) 70%); animation: d2-cs-glow 2.6s ease-in-out infinite; }',
      '.d2-cs-ring { position: absolute; width: 42vmin; height: 42vmin; border-radius: 50%; border: 2px solid rgb(var(--d2-gold-rgb, 201 165 92) / .55); animation: d2-cs-ring 1.5s ease-out infinite; }',
      '.d2-cs-spark { position: absolute; bottom: 20%; width: 3px; height: 3px; border-radius: 50%; background: var(--d2-gold-hi, #f0c070); box-shadow: 0 0 8px rgb(var(--d2-gold-hi-rgb, 240 192 112) / .9); animation: d2-cs-spark 2.1s ease-in-out infinite; }',
      '.d2-cs-stage { position: relative; display: flex; flex-direction: column; align-items: center; gap: 18px; }',
      '.d2-cs-logo-wrap { position: relative; overflow: hidden; animation: d2-cs-logo 1.15s cubic-bezier(.2,.8,.25,1) both; }',
      '.d2-cs-logo { display: block; width: clamp(200px, 34vmin, 340px); height: auto; filter: drop-shadow(0 4px 22px rgba(0,0,0,.9)); }',
      '.d2-cs-sweep { position: absolute; top: 0; bottom: 0; width: 42%; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,240,200,.55), rgba(255,255,255,0)); animation: d2-cs-sweep 1.5s ease-in-out .65s both; }',
      '.d2-cs-line { width: clamp(180px, 32vmin, 320px); height: 1px; background: linear-gradient(90deg, rgb(var(--d2-gold-rgb, 201 165 92) / 0), rgb(var(--d2-gold-hi-rgb, 240 192 112) / .9), rgb(var(--d2-gold-rgb, 201 165 92) / 0)); transform-origin: center; animation: d2-cs-line 1s ease-out .8s both; }',
      '.d2-cs-title { font-family: "Palatino Linotype","Songti SC","SimSun",Georgia,serif; font-size: clamp(15px, 2.4vmin, 20px); letter-spacing: 6px; color: var(--d2-gold-hi, #f0c070); text-shadow: 0 0 18px rgb(var(--d2-gold-rgb, 201 165 92) / .55); animation: d2-cs-rise .9s ease-out 1.15s both; }',
      '.d2-cs-sub { font-size: 11px; letter-spacing: 3px; color: #9c8b72; animation: d2-cs-rise .9s ease-out 1.45s both; }',
      '.d2-cs-hint { position: absolute; bottom: 7%; font-size: 11px; letter-spacing: 2px; color: rgba(156,139,114,.72); animation: d2-cs-rise .8s ease-out 1.9s both; }',

      /* 战场氛围（纯装饰，不拦事件） */
      '.d2-atmos { position: fixed; inset: 0; pointer-events: none; z-index: 3; overflow: hidden; }',
      '.d2-atmos-band { display: none !important; }',
      '.d2-atmos-band { display: none !important; }',
      '.d2-atmos-vig { position: absolute; inset: 0; background: radial-gradient(ellipse 82% 74% at 50% 45%, rgba(0,0,0,0) 48%, rgba(0,0,0,.24) 100%); }',

      /* 侧边栏品牌 */
      '.d2-mark { position: relative; display: inline-flex; align-items: center; justify-content: center; }',
      '.d2-mark::before { content: ""; position: absolute; inset: -2px; border-radius: 50%; background: conic-gradient(from 0deg,var(--d2-gold, #c9a55c),var(--d2-gold-hi, #f0c070),#8b1a1a,var(--d2-gold, #c9a55c)); animation: d2-spin 14s linear infinite; opacity: .85; }',
      '.d2-mark::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: #150d06; }',
      '.d2-mark-core { position: relative; z-index: 1; color: var(--d2-gold-hi, #f0c070); line-height: 1; text-shadow: 0 0 6px rgb(var(--d2-gold-hi-rgb, 240 192 112) / .7), 0 0 14px rgb(var(--d2-gold-rgb, 201 165 92) / .45); animation: d2-glow 3.4s ease-in-out infinite; }',
      '.d2-wordmark { font-family: "Palatino Linotype","Songti SC","SimSun",Georgia,serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; background: linear-gradient(90deg,#8b6914 0%,var(--d2-gold-hi, #f0c070) 35%,#fff3d0 50%,var(--d2-gold-hi, #f0c070) 65%,#8b6914 100%); background-size: 220% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; animation: d2-shimmer 7s linear infinite; }',
      '.d2-brand-logo { display: block; height: 22px; width: auto; max-width: 100%; filter: drop-shadow(0 0 2px rgba(0,0,0,.95)) drop-shadow(0 0 6px rgba(0,0,0,.7)); }',

      /* 空会话主视觉：官方 DOTA2 标志 */
      '.d2-herologo { display: inline-flex; align-items: center; justify-content: center; animation: d2-rise .9s ease-out; }',
      '.d2-herologo-img { display: block; width: auto; max-width: 62vw; filter: drop-shadow(0 6px 26px rgba(0,0,0,.85)) drop-shadow(0 0 22px rgb(var(--d2-gold-rgb, 201 165 92) / .30)); }',

      /* 玩家档案卡 */
      '.d2-band { display: flex; justify-content: center; padding: 8px 16px 2px; animation: d2-rise .7s ease-out; }',
      '.d2-card { position: relative; display: flex; align-items: center; gap: 16px; width: 100%; max-width: 1190px; padding: 13px 20px; border-radius: 10px; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .55); background: linear-gradient(135deg, rgba(58,36,20,.96) 0%, rgba(24,14,6,.97) 45%, rgba(52,32,17,.96) 100%); box-shadow: 0 10px 30px rgba(0,0,0,.6), inset 0 1px 0 rgb(var(--d2-gold-hi-rgb, 240 192 112) / .18), inset 0 0 40px rgba(0,0,0,.5); }',
      '.d2-card::after { content: ""; position: absolute; inset: 5px; border-radius: 6px; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .22); pointer-events: none; }',
      '.d2-corner { position: absolute; width: 13px; height: 13px; border: 2px solid var(--d2-gold, #c9a55c); opacity: .85; pointer-events: none; }',
      '.d2-corner.tl { top: 3px; left: 3px; border-right: none; border-bottom: none; border-top-left-radius: 6px; }',
      '.d2-corner.tr { top: 3px; right: 3px; border-left: none; border-bottom: none; border-top-right-radius: 6px; }',
      '.d2-corner.bl { bottom: 3px; left: 3px; border-right: none; border-top: none; border-bottom-left-radius: 6px; }',
      '.d2-corner.br { bottom: 3px; right: 3px; border-left: none; border-top: none; border-bottom-right-radius: 6px; }',
      '.d2-portrait { position: relative; width: 62px; height: 62px; flex: 0 0 62px; }',
      '.d2-portrait-ring { position: absolute; inset: -4px; border-radius: 50%; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .45); box-shadow: inset 0 0 10px rgba(0,0,0,.7); }',
      '.d2-portrait-img { position: relative; z-index: 1; width: 62px; height: 62px; border-radius: 50%; object-fit: cover; display: block; border: 1px solid rgb(var(--d2-gold-hi-rgb, 240 192 112) / .5); }',
      '.d2-portrait-fallback { position: relative; z-index: 1; width: 62px; height: 62px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle,#3a2414,#150d06); color: var(--d2-gold-hi, #f0c070); font-size: 24px; border: 1px solid rgb(var(--d2-gold-hi-rgb, 240 192 112) / .5); }',
      '.d2-card-body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 6px; }',
      '.d2-name-row { display: flex; align-items: baseline; gap: 9px; min-width: 0; }',
      '.d2-name { font-family: "Palatino Linotype","Songti SC","SimSun",Georgia,"Microsoft YaHei",serif; font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: linear-gradient(180deg,#fff3d0 0%,var(--d2-gold-hi, #f0c070) 45%,#b8860b 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; filter: drop-shadow(0 1px 1px rgba(0,0,0,.9)); }',
      '.d2-sub { font-size: 10px; letter-spacing: 1px; color: #9c8b72; white-space: nowrap; }',
      '.d2-badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }',
      '.d2-rank { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 3px; border: 1px solid currentColor; font-size: 11px; font-weight: 700; letter-spacing: .5px; background: rgba(0,0,0,.35); }',
      '.d2-mmr { padding: 3px 10px; border-radius: 3px; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .4); background: rgba(0,0,0,.4); font-size: 11px; font-weight: 700; color: var(--d2-gold-hi, #f0c070); }',
      '.d2-recent-row { display: flex; align-items: center; gap: 8px; }',
      '.d2-recent { display: flex; gap: 2px; flex: 1 1 auto; min-width: 0; flex-wrap: wrap; overflow: visible; }',
      '.d2-recent-tile { position: relative; flex: 0 0 44px; width: 44px; border-radius: 2px; background-size: cover; background-position: center; background-color: #1a1108; border: 1px solid rgb(0 0 0 / .55); overflow: hidden; }',
      '.d2-recent-tile::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 5px; box-shadow: 0 -1px 3px rgb(0 0 0 / .5); }',
      '.d2-recent-tile.w::after { background: linear-gradient(90deg,#9ccf6b,#4f7a34); }',
      '.d2-recent-tile.l::after { background: linear-gradient(90deg,#c04a4a,#5e1f1f); }',
      '.d2-recent-tile:hover { border-color: var(--d2-gold, #c9a55c); }',
      '.d2-tip { position: fixed; z-index: 80; width: 480px; padding: 8px 10px 9px; border-radius: 6px; border: 1px solid var(--d2-gold, #c9a55c); background: rgba(16,10,5,.97); box-shadow: 0 16px 44px rgba(0,0,0,.78); pointer-events: none; }',
      '.d2-tip-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }',
      '.d2-tip-res { font-size: 12px; font-weight: 700; }',
      '.d2-tip-res.w { color: #9ccf6b; }',
      '.d2-tip-res.l { color: #d07070; }',
      '.d2-tip-sub { color: #9c8b72; font-size: 10px; }',
      '.d2-tip-team { border-top: 1px solid rgba(255,255,255,.08); padding-top: 4px; margin-top: 5px; }',
      '.d2-tip-team.rad { border-top-color: rgba(120,190,110,.35); }',
      '.d2-tip-team.dire { border-top-color: rgba(200,90,90,.35); }',
      '.d2-tip-p { display: flex; align-items: center; gap: 6px; height: 22px; border-radius: 3px; }',
      '.d2-tip-items { flex: 0 0 auto; display: flex; gap: 2px; }',
      '.d2-tip-item { width: 21px; height: 16px; border-radius: 2px; overflow: hidden; background: #241609; }',
      '.d2-tip-item img { display: block; width: 100%; height: 100%; object-fit: cover; }',
      '.d2-tip-item.neutral { border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .75); }',
      '.d2-tip-p.me { background: rgb(var(--d2-gold-rgb, 201 165 92) / .16); }',
      '.d2-tip-hero { flex: 0 0 30px; width: 30px; height: 17px; border-radius: 2px; overflow: hidden; background: #241609; }',
      '.d2-tip-hero img { display: block; width: 100%; height: 100%; object-fit: cover; }',
      '.d2-tip-name { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: #ddd3bf; }',
      '.d2-tip-kda { flex: 0 0 auto; font-size: 11px; color: #b9ac92; font-variant-numeric: tabular-nums; }',
      '.d2-recent-img { display: block; width: 100%; height: 100%; object-fit: cover; }',
      '.d2-strip { display: flex; height: 12px; border-radius: 3px; overflow: hidden; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .3); flex: 1 1 180px; max-width: 260px; }',
      '.d2-strip-seg { flex: 1 1 0; }',
      '.d2-strip-seg.w { background: linear-gradient(180deg,#8fbf62,#4f7a34); }',
      '.d2-strip-seg.l { background: linear-gradient(180deg,#a83a3a,#5e1f1f); }',
      '.d2-strip-label { font-size: 10px; color: #9c8b72; white-space: nowrap; }',
      '.d2-heropanels { display: flex; gap: 8px; }',
      '.d2-heropanel { position: relative; display: flex; align-items: center; gap: 7px; width: 132px; height: 54px; padding: 0 9px; overflow: hidden; border-radius: 5px; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .42); background: linear-gradient(160deg, rgba(70,44,22,.95) 0%, rgba(28,17,8,.98) 60%, rgba(48,30,15,.95) 100%); box-shadow: inset 0 1px 0 rgb(var(--d2-gold-hi-rgb, 240 192 112) / .18), inset 0 0 18px rgba(0,0,0,.55); }',
      '.d2-heropanel::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: linear-gradient(90deg, rgb(var(--d2-gold-hi-rgb, 240 192 112) / 0), rgb(var(--d2-gold-hi-rgb, 240 192 112) / .7), rgb(var(--d2-gold-hi-rgb, 240 192 112) / 0)); }',
      '.d2-heropanel-icon { position: relative; flex: 0 0 40px; width: 40px; height: 23px; border-radius: 3px; overflow: hidden; border: 1px solid rgb(var(--d2-gold-hi-rgb, 240 192 112) / .45); background: #150d06; box-shadow: 0 1px 3px rgba(0,0,0,.6); }',
      '.d2-heropanel-icon-img { display: block; width: 100%; height: 100%; object-fit: cover; }',
      '.d2-heropanel-body { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 0; min-width: 0; }',
      '.d2-heropanel-name { font-size: 11px; font-weight: 700; color: var(--d2-gold-hi, #f0c070); text-shadow: 0 1px 2px rgba(0,0,0,.95); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 74px; }',
      '.d2-heropanel-stat { font-size: 10px; color: #e8dcc8; }',
      '.d2-heropanel-sub { font-size: 9px; color: #a8977c; }',      '.d2-rune { width: 8px; height: 8px; border-radius: 50%; animation: d2-glow 3.2s ease-in-out infinite; }',
      '.d2-rune.r { background: #4ade80; box-shadow: 0 0 8px rgba(74,222,128,.55); }',
      '.d2-rune.d { background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,.55); }',
      '.d2-rune.b { background: #3b82f6; box-shadow: 0 0 8px rgba(59,130,246,.55); }',
      '.d2-rune.y { background: var(--d2-gold-hi, #f0c070); box-shadow: 0 0 8px rgb(var(--d2-gold-hi-rgb, 240 192 112) / .55); }',

      /* 设置页 */
      'html.d2-pure .d2-atmos-band, html.d2-pure .d2-atmos-vig { display: none !important; }',
      'html.d2-pure .d2-page { background: transparent !important; border-color: rgb(var(--d2-gold-rgb, 201 165 92) / .25) !important; }',
      '.d2-page { display: flex; flex-direction: column; gap: 22px; padding: 18px 20px 26px; max-width: 820px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1, #3d2a17); background: var(--d2-solid, rgba(16,11,6,.94)); }',
      '.d2-sec { display: flex; flex-direction: column; gap: 10px; }',
      '.d2-sec-title { font-size: 13px; font-weight: 700; letter-spacing: .5px; }',
      '.d2-sec-desc { font-size: 11px; opacity: .62; line-height: 1.65; }',
      '.d2-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--dsw-alias-border-l1, #3d2a17); }',
      '.d2-row:last-child { border-bottom: none; }',
      '.d2-row-text { display: flex; flex-direction: column; gap: 3px; }',
      '.d2-row-title { font-size: 13px; }',
      '.d2-row-desc { font-size: 11px; opacity: .62; }',
      '.d2-switch { position: relative; flex: 0 0 36px; width: 36px; height: 20px; border-radius: 10px; cursor: pointer; border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .35); background: #2a1a0f; transition: background .18s, box-shadow .18s; }',
      '.d2-switch[aria-checked="true"] { background: var(--d2-gold, #c9a55c); box-shadow: 0 0 10px rgb(var(--d2-gold-rgb, 201 165 92) / .45); }',
      '.d2-switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: var(--d2-gold-hi, #f0c070); box-shadow: 0 1px 3px rgba(0,0,0,.7); transition: transform .18s; }',
      '.d2-switch[aria-checked="true"]::after { transform: translateX(16px); }',
      '.d2-switch:focus-visible { outline: 2px solid var(--d2-gold-hi, #f0c070); outline-offset: 2px; }',
      '.d2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(158px, 1fr)); gap: 10px; }',
      '.d2-bg { position: relative; padding: 0; border: 1px solid var(--dsw-alias-border-l1, #3d2a17); border-radius: 6px; overflow: hidden; cursor: pointer; background: var(--dsw-alias-bg-layer-2, #180e06); text-align: left; font: inherit; color: inherit; }',
      '.d2-bg:hover { border-color: var(--dsw-alias-border-l2, #5c4222); }',
      '.d2-bg.sel { border-color: var(--dsw-alias-brand-primary, var(--d2-gold, #c9a55c)); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary, var(--d2-gold, #c9a55c)); }',
      '.d2-bg-img { display: block; width: 100%; height: 88px; object-fit: cover; background: #0d0805; }',
      '.d2-bg-ancient { display: block; width: 100%; height: 88px; background: radial-gradient(ellipse at 22% 18%, rgb(var(--d2-gold-rgb, 201 165 92) / .35) 0%, rgb(var(--d2-gold-rgb, 201 165 92) / 0) 55%), radial-gradient(ellipse at 80% 88%, rgba(139,26,26,.42) 0%, rgba(139,26,26,0) 58%), linear-gradient(180deg,#0d0805,#241609); }',
      '.d2-bg-cap { display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 6px 8px; font-size: 11px; }',
      '.d2-bg-tick { color: var(--dsw-alias-brand-primary, var(--d2-gold, #c9a55c)); font-weight: 700; }',
      '.d2-bootlist { display: flex; flex-direction: column; gap: 8px; }',
      '.d2-boot { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; cursor: pointer; font: inherit; color: inherit; padding: 9px 12px; border: 1px solid var(--dsw-alias-border-l1, #3d2a17); border-radius: 6px; background: var(--dsw-alias-bg-layer-2, #180e06); }',
      '.d2-boot:hover { border-color: var(--dsw-alias-border-l2, #5c4222); }',
      '.d2-boot.sel { border-color: var(--dsw-alias-brand-primary, var(--d2-gold, #c9a55c)); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary, var(--d2-gold, #c9a55c)); }',
      '.d2-boot-name { font-size: 13px; }',
      '.d2-boot-note { font-size: 11px; opacity: .6; margin-left: auto; }',
      '.d2-boot-tick { color: var(--dsw-alias-brand-primary, var(--d2-gold, #c9a55c)); font-weight: 700; }',
      '.d2-preview { align-self: flex-start; cursor: pointer; font: inherit; font-size: 12px; letter-spacing: 1px; color: var(--d2-gold-hi, #f0c070); background: rgba(42,26,15,.85); border: 1px solid rgb(var(--d2-gold-rgb, 201 165 92) / .45); border-radius: 4px; padding: 6px 14px; }',
      '.d2-preview:hover { border-color: var(--d2-gold-hi, #f0c070); }',
      '.d2-preview:focus-visible { outline: 2px solid var(--d2-gold-hi, #f0c070); outline-offset: 2px; }',
      '.d2-input { width: 104px; padding: 5px 9px; border-radius: 4px; border: 1px solid var(--dsw-alias-border-l1, #3d2a17); background: var(--dsw-alias-bg-layer-2, #180e06); color: inherit; font: inherit; font-size: 12px; text-align: right; }',
      '.d2-input:focus-visible { outline: 2px solid var(--d2-gold-hi, #f0c070); outline-offset: 1px; }',
      '.d2-range { width: 150px; accent-color: var(--d2-gold, #c9a55c); cursor: pointer; }',
      '.d2-picker { display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }',
      '.d2-pt { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; animation: d2-pt-in .5s ease-out; }',
      '.d2-pt-mark { width: 172px; height: 172px; filter: drop-shadow(0 0 20px rgb(226 232 240 / .30)); }',
      '.pl-stroke { fill: none; stroke: url(#plGrad); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: d2-pt-draw 1.15s ease-out forwards; }',
      '.pl-fill { fill: url(#plGrad); opacity: 0; animation: d2-pt-fill .7s ease-out .95s forwards; }',
      '.pl-sweep { fill: #ffffff; opacity: 0; clip-path: none; animation: d2-pt-sweep 1.2s ease-in-out 1.0s forwards; }',
      '.d2-pt-title { font-family: "Palatino Linotype",Georgia,"Microsoft YaHei",serif; font-size: 27px; font-weight: 700; letter-spacing: 11px; background: linear-gradient(180deg,#ffffff 0%,#e8ebf2 42%,#a7adbc 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; animation: d2-pt-fade .9s ease-out .5s both; }',
      '.d2-pt-sub { font-size: 11px; letter-spacing: 4px; color: #9aa2b4; animation: d2-pt-hero .7s ease-out 1.15s both; }',
      '.d2-pt-heroes { display: flex; gap: 18px; margin-top: 4px; }',
      '.d2-pt-hero { display: flex; flex-direction: column; align-items: center; gap: 5px; opacity: 0; animation: d2-pt-hero .7s ease-out both; }',
      '.d2-pt-hero-img { width: 104px; height: 58px; object-fit: cover; border-radius: 4px; border: 1px solid rgb(226 232 240 / .55); box-shadow: 0 5px 18px rgb(0 0 0 / .65), inset 0 0 0 1px rgb(255 255 255 / .12); }',
      '.d2-pt-hero-name { font-size: 12px; color: #eaeef6; text-shadow: 0 1px 3px rgb(0 0 0 / .95); }',
      '.d2-pt-hero-stat { font-size: 10px; color: #a8b0c0; }',
      '@keyframes d2-pt-draw { to { stroke-dashoffset: 0; } }',
      '@keyframes d2-pt-fill { to { opacity: .20; } }',
      '@keyframes d2-pt-sweep { 0% { opacity: 0; } 25% { opacity: .80; } 100% { opacity: 0; } }',
      '@keyframes d2-pt-fade { from { opacity: 0; letter-spacing: 22px; } to { opacity: 1; letter-spacing: 11px; } }',
      '@keyframes d2-pt-hero { from { opacity: 0; transform: translateY(14px) scale(.95); } to { opacity: 1; transform: none; } }',
      '@keyframes d2-pt-in { from { opacity: 0; } to { opacity: 1; } }',
      '.d2-search { width: 100%; max-width: 420px; padding: 7px 10px; border-radius: 5px; border: 1px solid var(--dsw-alias-border-l1, #3d2a17); background: var(--dsw-alias-bg-base, #0d0805); color: inherit; font: inherit; font-size: 12px; }',
      '.d2-search:focus-visible { outline: 2px solid var(--d2-gold-hi, #f0c070); outline-offset: 1px; }',
      '.d2-fchips { display: flex; flex-wrap: wrap; gap: 6px; }',
      '.d2-fchip { cursor: pointer; font: inherit; font-size: 11px; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--dsw-alias-border-l1, #3d2a17); background: var(--dsw-alias-bg-layer-2, #180e06); color: inherit; white-space: nowrap; }',
      '.d2-fchip:hover { border-color: var(--dsw-alias-border-l2, #5c4222); }',
      '.d2-fchip.on { border-color: var(--d2-gold, #c9a55c); color: var(--d2-gold-hi, #f0c070); box-shadow: 0 0 0 1px rgb(var(--d2-gold-rgb, 201 165 92) / .5); }',
      '.d2-bg-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 104px; }'
    ].join('\n');

    function insertCss(css, id) {
      let mod = null;
      try { mod = require('styles'); } catch (e) { mod = null; }
      if (mod && typeof mod.insert === 'function') {
        const dispose = mod.insert(css);
        return function () { try { if (typeof dispose === 'function') dispose(); } catch (e) {} };
      }
      const el = document.createElement('style');
      if (id) el.id = id;
      el.textContent = css;
      document.head.appendChild(el);
      return function () { try { if (el.parentNode) el.parentNode.removeChild(el); } catch (e) {} };
    }
    let styleDisposer = null;
    let forcedDark = false;
    function insertStyles() { return insertCss(CSS, 'dota2-ancient-ui'); }

    /* ------------------------------------------------------------------
       实时数据（OpenDota 公开接口；失败则用内置档案）
       ------------------------------------------------------------------ */
    let liveData = null;
    let livePending = null;
    function loadLive(force) {
      if (force) { liveData = null; livePending = null; }
      if (liveData) return Promise.resolve(liveData);
      if (livePending) return livePending;
      if (typeof fetch !== 'function') return Promise.resolve(null);
      const base = 'https://api.opendota.com/api/players/' + PLAYER_ID;
      const pull = function () {
        return Promise.all([
          fetch(base).then(function (r) { return r.json(); }),
          fetch(base + '/heroes?date=90').then(function (r) { return r.json(); }),
          fetch(base + '/matches?limit=40').then(function (r) { return r.json(); })
        ]);
      };
      // 优先读本机 Host 定时缓存（不消耗 OpenDota 额度），没有才直连回退
      livePending = fetch('/dota2-ui/dota?what=all').then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && j.ok && j.matches && j.matches.length) return [j.profile || {}, j.heroes || [], j.matches];
          return pull();
        })
        .catch(function () { return pull(); })
        .then(function (res) {
        const prof = res[0] || {};
        const heroes = res[1] || [];
        const matches = res[2] || [];
        const top = heroes
          .filter(function (x) { return x.games > 0; })
          .sort(function (a, b) { return b.games - a.games; })
          .slice(0, 3)
          .map(function (x) {
            return {
              id: x.hero_id, games: x.games,
              winrate: x.games ? Math.round(x.win / x.games * 100) : 0
            };
          });
        // 仅天梯局（lobby_type = 7），多取一些再截 20 局
        const recent = matches.filter(function (m) { return m.lobby_type === 7; })
          .slice(0, 20).map(function (m) {
          const radiant = m.player_slot < 128;
          return {
            id: m.match_id,
            hero: m.hero_id,
            win: radiant ? !!m.radiant_win : !m.radiant_win,
            k: m.kills, d: m.deaths, a: m.assists,
            start: m.start_time, dur: m.duration, mode: m.game_mode, slot: m.player_slot
          };
        });
        liveData = {
          personaname: (prof.profile && prof.profile.personaname) || BAKED.personaname,
          avatar: (prof.profile && prof.profile.avatarfull) || BAKED.avatar,
          rankTier: prof.rank_tier || BAKED.rankTier,
          mmr: Math.round(prof.computed_mmr || BAKED.mmr),
          topHeroes: top.length ? top : BAKED.topHeroes,
          recent: recent.length ? recent : BAKED.recent
        };
        return liveData;
      }).catch(function () { return null; });
      return livePending;
    }

    /* ---- 对局详情（悬浮时懒加载 + 缓存）---- */
    const MATCH_CACHE = {};
    function loadMatch(id) {
      if (!id) return Promise.resolve(null);
      if (MATCH_CACHE[id]) return Promise.resolve(MATCH_CACHE[id]);
      if (typeof fetch !== 'function') return Promise.resolve(null);
      return fetch('/dota2-ui/dota?what=match&id=' + encodeURIComponent(id))
        .then(function (r) { return r.json(); })
        .catch(function () { return null; })
        .then(function (j) {
          if (j && j.ok && j.match && j.match.players && j.match.players.length) {
            MATCH_CACHE[id] = j.match;
            return j.match;
          }
          return fetch('https://api.opendota.com/api/matches/' + id)
            .then(function (r) { return r.json(); })
            .then(function (d) {
              if (d && d.players && d.players.length) { MATCH_CACHE[id] = d; return d; }
              return null;
            })
            .catch(function () { return null; });
        });
    }

    let itemMap = null;
    function loadItemMap() {
      if (itemMap) return Promise.resolve(itemMap);
      if (typeof fetch !== 'function') return Promise.resolve(null);
      return fetch('https://api.opendota.com/api/constants/items')
        .then(function (r) { return r.json(); })
        .then(function (d) {
          const m = {};
          for (const k in d) {
            const it = d[k];
            if (it && typeof it.id === 'number' && typeof it.img === 'string') {
              m[it.id] = 'https://cdn.cloudflare.steamstatic.com' + it.img;
            }
          }
          if (Object.keys(m).length) itemMap = m;
          return itemMap;
        })
        .catch(function () { return null; });
    }

    function useItemMap() {
      const [map, setMap] = React.useState(itemMap);
      React.useEffect(function () {
        let alive = true;
        if (!map) loadItemMap().then(function (x) { if (alive && x) setMap(x); });
        return function () { alive = false; };
      }, []);
      return map;
    }

    function agoText(ts) {
      if (!ts) return '';
      const mins = Math.max(0, Math.round((Date.now() / 1000 - ts) / 60));
      if (mins < 60) return mins + ' 分钟前';
      if (mins < 60 * 24) return Math.round(mins / 60) + ' 小时前';
      return Math.round(mins / 1440) + ' 天前';
    }

    function MatchTip(props) {
      const meta = props.meta || {};
      const d = props.detail;
      const imap = props.items || null;
      const rect = props.rect || { left: 0, top: 0, bottom: 0 };
      const vw = (typeof window !== 'undefined' && window.innerWidth) || 1400;
      const vh = (typeof window !== 'undefined' && window.innerHeight) || 900;
      const style = { left: Math.max(10, Math.min(rect.left - 12, vw - 496)) + 'px' };
      if (rect.bottom + 300 > vh) style.bottom = (vh - rect.top + 6) + 'px';
      else style.top = (rect.bottom + 6) + 'px';

      const head = h('div', { className: 'd2-tip-head' },
        h('span', { className: 'd2-tip-res ' + (meta.win ? 'w' : 'l') }, meta.win ? '胜利' : '失败'),
        h('span', { className: 'd2-tip-sub' },
          (meta.dur ? Math.floor(meta.dur / 60) + ':' + String(meta.dur % 60).padStart(2, '0') + ' · ' : '')
          + agoText(meta.start)));

      let body = h('div', { className: 'd2-tip-sub' }, d === null ? '正在读取对局…' : (d === false ? '未取到对局详情（缓存中）' : ''));
      if (d) {
        const radiant = (d.players || []).filter(function (x) { return x.player_slot < 128; })
          .sort(function (a, b) { return a.player_slot - b.player_slot; });
        const dire = (d.players || []).filter(function (x) { return x.player_slot >= 128; })
          .sort(function (a, b) { return a.player_slot - b.player_slot; });
        const row = function (p2, k) {
          const sl = HERO_ICON_SLUG[p2.hero_id];
          const slots = [];
          for (let si = 0; si < 6; si++) slots.push(p2['item_' + si]);
          if (p2.item_neutral) slots.push(p2.item_neutral);
          return h('div', { key: k, className: 'd2-tip-p' + (p2.account_id === PLAYER_ID ? ' me' : '') },
            h('span', { className: 'd2-tip-hero' }, sl ? h('img', { src: heroIconUrl(sl), alt: '', loading: 'lazy' }) : null),
            h('span', { className: 'd2-tip-name', title: p2.personaname || '' }, p2.personaname || '匿名'),
            h('span', { className: 'd2-tip-kda' }, p2.kills + '/' + p2.deaths + '/' + p2.assists),
            h('span', { className: 'd2-tip-items' },
              slots.map(function (iid, ii) {
                const url = (imap && iid) ? imap[iid] : null;
                return h('span', { key: ii, className: 'd2-tip-item' + (ii === 6 ? ' neutral' : '') },
                  url ? h('img', { src: url, alt: '', loading: 'lazy' }) : null);
              })));
        };
        body = h('div', null,
          h('div', { className: 'd2-tip-team rad' }, radiant.map(row)),
          h('div', { className: 'd2-tip-team dire' }, dire.map(row)));
      }
      return h('div', { className: 'd2-tip', style: style }, head, body);
    }

    function usePlayer() {
      const [data, setData] = React.useState(BAKED);
      React.useEffect(function () {
        let alive = true;
        loadLive().then(function (d) { if (alive && d) setData(d); });
        // 战绩每分钟刷新一次
        const timer = setInterval(function () {
          loadLive(true).then(function (d) {
            if (!alive || !d) return;
            setData(d);
            // 对局详情由 Host 后台缓存（另有额度预算），前端不再主动重拉
            const ids = (d.recent || []).map(function (x) { return x.id; }).filter(Boolean);
            ids.forEach(function (id) { delete MATCH_CACHE[id]; });
          });
        }, 60000);
        return function () { alive = false; clearInterval(timer); };
      }, []);
      return data;
    }

    /* ------------------------------------------------------------------
       组件
       ------------------------------------------------------------------ */

    function Emblem() {
      return null;
    }

    function Wordmark() {
      return h('img', {
        className: 'd2-brand-logo', src: bgUrl(LOGO_FILE), alt: 'DOTA2',
        style: { display: 'block', height: '22px', width: 'auto' }
      });
    }

    /* 空会话主视觉 = 官方 DOTA2 标志（按拥有者给定的高度等比显示） */
    function HeroLogo(props) {
      const size = typeof props.size === 'number' && props.size > 0 ? props.size : 64;
      return h('span', {
        className: 'd2-herologo ' + (props.className || ''),
        style: { height: size + 'px' }
      }, h('img', {
        className: 'd2-herologo-img',
        src: bgUrl(LOGO_FILE),
        alt: 'DOTA2',
        style: { height: size + 'px' }
      }));
    }

function PlayerCard() {
      const p = usePrefs();
      const data = usePlayer();
      const rank = rankOf(data.rankTier);
      const [imgOk, setImgOk] = React.useState(true);
      const [tip, setTip] = React.useState(null);
      const itemMapCur = useItemMap();
      const tipTimer = React.useRef(null);
      function showTip(m, r) {
        if (tipTimer.current) clearTimeout(tipTimer.current);
        setTip({ meta: m, rect: { left: r.left, top: r.top, bottom: r.bottom }, detail: MATCH_CACHE[m.id] || null });
        loadMatch(m.id).then(function (d) {
          if (!d) return;
          setTip(function (t) { return (t && t.meta.id === m.id) ? { meta: t.meta, rect: t.rect, detail: d || false } : t; });
        });
      }
      function hideTip() {
        if (tipTimer.current) clearTimeout(tipTimer.current);
        tipTimer.current = setTimeout(function () { setTip(null); }, 150);
      }
      const wins = data.recent.filter(function (m) { return m.win; }).length;
      const total = data.recent.length;

      return h('div', { className: 'd2-band' },
        h('div', { className: 'd2-card' },
          h('span', { className: 'd2-corner tl' }), h('span', { className: 'd2-corner tr' }),
          h('span', { className: 'd2-corner bl' }), h('span', { className: 'd2-corner br' }),
          h('div', { className: 'd2-portrait' },
            h('span', { className: 'd2-portrait-ring' }),
            imgOk && data.avatar
              ? h('img', {
                  className: 'd2-portrait-img', src: data.avatar, alt: '',
                  referrerPolicy: 'no-referrer', loading: 'lazy',
                  onError: function () { setImgOk(false); }
                })
              : h('span', { className: 'd2-portrait-fallback' }, '\u2694')),
          h('div', { className: 'd2-card-body' },
            h('div', { className: 'd2-name-row' },
              h('span', { className: 'd2-name', title: data.personaname }, data.personaname),
              h('span', { className: 'd2-sub' }, '账号 ' + PLAYER_ID)),
            h('div', { className: 'd2-badges' },
              h('span', { className: 'd2-rank', style: { color: rank.color }, title: '天梯段位：' + rank.label }, rank.label),
              p.mmrManual ? h('span', { className: 'd2-mmr' }, '单排积分 ' + p.mmrManual) : null,
              h('span', { className: 'd2-strip-label' }, '近 ' + total + ' 局')),
            h('div', { className: 'd2-recent-row' },
              h('div', { className: 'd2-recent' },
                data.recent.map(function (m, i) {
                  const slug = HERO_ICON_SLUG[m.hero];
                  return h('span', {
                    key: i,
                    className: 'd2-recent-tile ' + (m.win ? 'w' : 'l'),
                    title: heroName(m.hero) + ' · ' + (m.win ? '胜' : '负') + '  ' + m.k + '/' + m.d + '/' + m.a,
                    onMouseEnter: function (e) { showTip(m, e.currentTarget.getBoundingClientRect()); },
                    onMouseLeave: hideTip
                  }, slug ? h('img', {
                    className: 'd2-recent-img', alt: '', loading: 'lazy', src: heroIconUrl(slug),
                    onError: function (e) { try { e.target.style.visibility = 'hidden'; } catch (err) {} }
                  }) : null);
                })),
              h('span', { className: 'd2-strip-label' }, wins + ' 胜 ' + (total - wins) + ' 负' + (total ? ' · ' + Math.round(wins * 100 / total) + '%' : ''))),
            tip ? h(MatchTip, { meta: tip.meta, detail: tip.detail, rect: tip.rect, items: itemMapCur }) : null,
            h('div', { className: 'd2-heropanels' },
              data.topHeroes.map(function (hero) {
                const slug = HERO_ICON_SLUG[hero.id];
                return h('div', { key: hero.id, className: 'd2-heropanel', title: heroName(hero.id) },
                  h('span', { className: 'd2-heropanel-icon' },
                    slug ? h('img', {
                      className: 'd2-heropanel-icon-img', alt: '', loading: 'lazy',
                      src: heroIconUrl(slug),
                      onError: function (e) { try { e.target.style.visibility = 'hidden'; } catch (err) {} }
                    }) : null),
                  h('span', { className: 'd2-heropanel-body' },
                    h('span', { className: 'd2-heropanel-name' }, heroName(hero.id)),
                    h('span', { className: 'd2-heropanel-stat' }, '胜率 ' + hero.winrate + '%'),
                    h('span', { className: 'd2-heropanel-sub' }, hero.games + ' 场')));
              })))));
    }

    function DockRunes() {
      return h('div', { className: 'd2-runes', 'aria-hidden': 'true' },
        h('span', { className: 'd2-rune r' }),
        h('span', { className: 'd2-rune d', style: { animationDelay: '.4s' } }),
        h('span', { className: 'd2-rune b', style: { animationDelay: '.8s' } }),
        h('span', { className: 'd2-rune y', style: { animationDelay: '1.2s' } }),
        h('span', { className: 'd2-rune d', style: { animationDelay: '1.6s' } }));
    }

    /* 背景层：只渲染一个 <style>，随选择切换 body 底图 */
    function backdropCss() {
      return 'html,body{background-color:#0d0805;background-image:none;color-scheme:dark;' +
        'background-size:cover;background-position:center;background-repeat:no-repeat;}' +
        '#root,#app,#__dsh_app{background-color:transparent !important;}';
    }

    function Atmosphere() {
      // 曾经的两条横向色带在壁纸上看起来就是“条纹”，已移除；仅保留边角暗化
      return h('div', { className: 'd2-atmos', 'aria-hidden': 'true' },
        h('div', { className: 'd2-atmos-vig' }));
    }

    /* ------------------------------------------------------------------
       开场动画：真实影片优先，影片不可用时回退到自制动画
       ------------------------------------------------------------------ */
    function Splash() {
    /* 3D 烘焙完成后把帧序列填进来，即可自动替换头像为模型 */
    const HERO_MODEL_FRAMES = {};

    function PlatinumMark() {
      return h('svg', { className: 'd2-pt-mark', viewBox: '0 0 240 240' },
        h('defs', null,
          h('linearGradient', { id: 'plGrad', x1: '0', y1: '0', x2: '1', y2: '1' },
            h('stop', { offset: '0', stopColor: '#ffffff' }),
            h('stop', { offset: '0.32', stopColor: '#eaedf4' }),
            h('stop', { offset: '0.52', stopColor: '#a9afbe' }),
            h('stop', { offset: '0.72', stopColor: '#f4f6fa' }),
            h('stop', { offset: '1', stopColor: '#8d94a4' }))),
        h('path', { className: 'pl-stroke', d: 'M120 30 L196 74 L196 166 L120 210 L44 166 L44 74 Z' }),
        h('path', { className: 'pl-stroke', style: { animationDelay: '.26s' }, d: 'M120 62 L172 120 L120 178 L68 120 Z' }),
        h('path', { className: 'pl-stroke', style: { animationDelay: '.46s' }, d: 'M120 78 L128 96 L128 148 L120 160 L112 148 L112 96 Z' }),
        h('path', { className: 'pl-stroke', style: { animationDelay: '.62s' }, d: 'M96 96 L144 96' }),
        h('path', { className: 'pl-stroke', style: { animationDelay: '.72s' }, d: 'M120 160 L120 176' }),
        h('circle', { className: 'pl-stroke', style: { animationDelay: '.82s' }, cx: '120', cy: '184', r: '7' }),
        h('path', { className: 'pl-stroke', style: { animationDelay: '.94s' }, d: 'M60 120 L74 120' }),
        h('path', { className: 'pl-stroke', style: { animationDelay: '.94s' }, d: 'M166 120 L180 120' }),
        h('path', { className: 'pl-fill', d: 'M120 30 L196 74 L196 166 L120 210 L44 166 L44 74 Z' }),
        h('path', { className: 'pl-sweep', d: 'M126 24 L136 24 L92 216 L82 216 Z' }));
    }

    function PlatinumIntro() {
      const data = usePlayer();
      const heroes = (data.topHeroes || []).slice(0, 3);
      return h('div', { className: 'd2-pt' },
        h(PlatinumMark),
        h('div', { className: 'd2-pt-title' }, 'DOTA 2'),
        h('div', { className: 'd2-pt-sub' }, '近 3 个月常用英雄'),
        h('div', { className: 'd2-pt-heroes' },
          heroes.map(function (hero, i) {
            const slug = HERO_ICON_SLUG[hero.id];
            const frames = HERO_MODEL_FRAMES[slug || ''];
            const art = frames && frames.length ? frames[0] : (slug ? heroIconUrl(slug) : null);
            return h('div', { key: hero.id, className: 'd2-pt-hero', style: { animationDelay: (1.45 + i * 0.18).toFixed(2) + 's' } },
              art ? h('img', { className: 'd2-pt-hero-img', src: art, alt: '', loading: 'eager' }) : null,
              h('span', { className: 'd2-pt-hero-name' }, heroName(hero.id)),
              h('span', { className: 'd2-pt-hero-stat' }, hero.games + ' 场 · ' + hero.winrate + '%'));
          })));
    }

      const p = usePrefs();
      const replay = useReplay();
      const [phase, setPhase] = React.useState('idle');
      const [videoFailed, setVideoFailed] = React.useState(false);
      const [soundBlocked, setSoundBlocked] = React.useState(false);
      const videoRef = React.useRef(null);

      const boot = bootById(p.boot);
      const videoMode = boot.kind === 'video' && !videoFailed;

      function gesture() {
        const el = videoRef.current;
        if (soundBlocked && el) {
          try { el.muted = false; const pr = el.play(); if (pr && typeof pr.catch === 'function') pr.catch(function () {}); } catch (e) {}
          setSoundBlocked(false);
          return;
        }
        setPhase('out');
      }

      /* 启动：每个标签页自动播一次；点“预览”则无条件重播 */
      React.useEffect(function () {
        if (!p.enabled || boot.kind === 'none') { setPhase('idle'); return undefined; }
        if (replay === 0) {
          let seen = false;
          try { seen = sessionStorage.getItem(SPLASH_KEY) === '1'; } catch (e) {}
          if (seen) return undefined;
          try { sessionStorage.setItem(SPLASH_KEY, '1'); } catch (e) {}
        }
        setVideoFailed(false);
        setPhase('play');
        return undefined;
      }, [p.enabled, p.boot, replay]);

      /* 结束调度：影片等 ended，另设兜底上限；自制动画固定 2.7 秒 */
      React.useEffect(function () {
        if (phase !== 'play') return undefined;
        const cap = videoMode ? (p.boot === 'logo' ? 15000 : 45000) : 2700;
        const t = setTimeout(function () { setPhase('out'); }, cap);
        return function () { clearTimeout(t); };
      }, [phase, videoMode, p.boot]);

      React.useEffect(function () {
        if (phase !== 'out') return undefined;
        const t = setTimeout(function () { setPhase('idle'); }, 800);
        return function () { clearTimeout(t); };
      }, [phase]);

      /* React 对 muted 的处理不可靠，用 ref 直接强制静音并起播 */
      React.useEffect(function () {
        if (phase !== 'play' || !videoMode) return undefined;
        const el = videoRef.current;
        if (!el) return undefined;
        const seekTo = typeof boot.startAt === 'number' ? boot.startAt : 0;
        if (seekTo > 0 && el.currentTime < seekTo) { try { el.currentTime = seekTo; } catch (e) {} }
        const start = function (silent) {
          el.muted = silent;
          if (typeof el.play !== 'function') return;
          const pr = el.play();
          if (pr && typeof pr.catch === 'function') {
            pr.catch(function () {
              if (silent) return;
              setSoundBlocked(true);
              // 未静音被自动播放策略拦下：退回静音重试，保证动画照常播放
              try { el.muted = true; const again = el.play(); if (again && again.catch) again.catch(function () {}); } catch (e) {}
            });
          }
        };
        start(!p.bootSound);
        return undefined;
      }, [phase, videoMode, p.bootSound, p.boot, replay]);

      React.useEffect(function () {
        if (phase === 'idle') return undefined;
        function onKey() { gesture(); }
        window.addEventListener('keydown', onKey);
        return function () { window.removeEventListener('keydown', onKey); };
      }, [phase, soundBlocked]);

      if (phase === 'idle') return null;

      const cls = 'd2-splash' + (phase === 'out' ? ' out' : '');

      if (boot.kind === 'platinum') {
        return h('div', { className: cls, onClick: function () { gesture(); } },
          h(PlatinumIntro),
          h('div', { className: 'd2-sp-hint' }, '点击跳过'));
      }
      if (videoMode) {
        return h('div', { className: cls, role: 'presentation' },
          h('video', {
            ref: videoRef,
            className: 'd2-sp-video',
            src: bgUrl(boot.route),
            style: { objectFit: boot.fit || 'cover' },
            autoPlay: true, muted: true, playsInline: true, preload: 'auto',
            onLoadedMetadata: function (e) {
              const el = e.target;
              const seekTo = typeof boot.startAt === 'number' ? boot.startAt : 0;
              if (seekTo > 0 && el && el.currentTime < seekTo) { try { el.currentTime = seekTo; } catch (err) {} }
            },
            onEnded: function () { setPhase('out'); },
            onError: function () { setVideoFailed(true); },
            onClick: function () { gesture(); }
          }),
          h('div', { className: 'd2-sp-hint' }, soundBlocked
            ? '点击开启声音 · 再次点击跳过'
            : '点击任意处跳过'));
      }

      /* 自制金光动画（也是影片缺失时的回退） */
      const sparks = [];
      for (let i = 0; i < 14; i++) {
        sparks.push(h('span', {
          key: 'sp' + i, className: 'd2-cs-spark',
          style: { left: (6 + i * 6.6) + '%', animationDelay: (i * 0.13) + 's' }
        }));
      }
      return h('div', { className: cls, role: 'presentation' },
        h('div', {
          className: 'd2-cs',
          onClick: function () { setPhase('out'); }
        },
          h('div', { className: 'd2-cs-glow' }),
          h('div', { className: 'd2-cs-ring' }),
          sparks,
          h('div', { className: 'd2-cs-stage' },
            h('div', { className: 'd2-cs-logo-wrap' },
              h('img', {
                className: 'd2-cs-logo', alt: 'DOTA2', src: bgUrl(LOGO_FILE),
                onError: function (e) { try { e.target.style.display = 'none'; } catch (err) {} }
              }),
              h('div', { className: 'd2-cs-sweep' })),
            h('div', { className: 'd2-cs-line' }),
            h('div', { className: 'd2-cs-title' }, 'DOTA2'),
            h('div', { className: 'd2-cs-sub' }, 'DEEPSEEK HARNESS · 司夜刺客')),
          h('div', { className: 'd2-cs-hint' }, '点击任意处跳过')));
    }

    /* ------------------------------------------------------------------
       设置页
       ------------------------------------------------------------------ */
    function Switch(props) {
      return h('span', {
        className: 'd2-switch', role: 'switch', tabIndex: 0,
        'aria-checked': props.on ? 'true' : 'false',
        'aria-label': props.label || '',
        onClick: props.onToggle,
        onKeyDown: function (e) {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); props.onToggle(); }
        }
      });
    }

    function BgThumb(props) {
      const [ok, setOk] = React.useState(true);
      if (!ok) return h('span', { className: 'd2-bg-ancient' });
      return h('img', {
        className: 'd2-bg-img', alt: '', loading: 'lazy', src: props.src,
        onError: function () { setOk(false); }
      });
    }

function BackgroundPicker() {
      const p = usePrefs();
      const [items, setItems] = React.useState(null);
      const [q, setQ] = React.useState('');
      const [cat, setCat] = React.useState('all');
      const [hero, setHero] = React.useState(null);
      const [limit, setLimit] = React.useState(24);

      React.useEffect(function () {
        let alive = true;
        loadCatalog().then(function (list) { if (alive) setItems(list); });
        return function () { alive = false; };
      }, []);

      const meta = React.useMemo(function () {
        if (!items) return null;
        const list = []; const cats = {}; const heroes = {};
        for (let i = 0; i < items.length; i++) {
          const m = lsMeta(items[i]); m.slug = items[i]; list.push(m);
          cats[m.cat] = (cats[m.cat] || 0) + 1;
          if (m.hero) heroes[m.hero] = (heroes[m.hero] || 0) + 1;
        }
        return { list: list, cats: cats, heroes: heroes };
      }, [items]);

      const match = React.useMemo(function () {
        if (!meta) return [];
        const n = q.trim().toLowerCase();
        const out = [];
        for (let i = 0; i < meta.list.length; i++) {
          const x = meta.list[i];
          if (cat !== 'all' && x.cat !== cat) continue;
          if (hero && x.hero !== hero) continue;
          if (n && x.slug.toLowerCase().indexOf(n) < 0 && String(x.title).toLowerCase().indexOf(n) < 0) continue;
          out.push(x);
        }
        return out;
      }, [meta, q, cat, hero]);

      if (!items) return h('div', { className: 'd2-sec-desc' }, '正在读取本机 Dota 2 载入画面索引…');
      if (!items.length) return h('div', { className: 'd2-sec-desc' }, '未在本机找到 Dota 2，仅使用上方 3 张插件自带背景。');

      const catKeys = ['all'].concat(Object.keys(meta.cats).sort(function (a, b) { return meta.cats[b] - meta.cats[a]; }));
      const heroKeys = Object.keys(meta.heroes).sort(function (a, b) { return meta.heroes[b] - meta.heroes[a]; }).slice(0, 14);
      const shown = match.slice(0, limit);
      const cur = p.background;

      return h('div', { className: 'd2-picker' },
        h('input', {
          className: 'd2-search', type: 'text',
          placeholder: '搜索：axe / pudge / nyx / ti6 …',
          value: q,
          onChange: function (e) { setQ(e.target.value); setLimit(24); }
        }),
        h('div', { className: 'd2-fchips' },
          catKeys.map(function (k) {
            return h('button', {
              key: k, type: 'button',
              className: 'd2-fchip' + (cat === k ? ' on' : ''),
              onClick: function () { setCat(k); setLimit(24); }
            }, (k === 'all' ? '全部' : (LS_CAT_LABEL[k] || k)) + ' ' + (k === 'all' ? meta.list.length : meta.cats[k]));
          })),
        h('div', { className: 'd2-fchips' },
          heroKeys.map(function (k) {
            return h('button', {
              key: k, type: 'button',
              className: 'd2-fchip' + (hero === k ? ' on' : ''),
              onClick: function () { setHero(hero === k ? null : k); setLimit(24); }
            }, (HERO_SLUG_CN[k] || k) + ' ' + meta.heroes[k]);
          })),
        h('div', { className: 'd2-sec-desc' }, '匹配 ' + match.length + ' 张 · 已显示 ' + shown.length + ' 张'),
        h('div', { className: 'd2-grid' },
          shown.map(function (x) {
            const sel = cur === 'ls:' + x.slug;
            return h('button', {
              key: x.slug, type: 'button',
              className: 'd2-bg' + (sel ? ' sel' : ''),
              onClick: function () { setPref('background', 'ls:' + x.slug); },
              'aria-pressed': sel ? 'true' : 'false'
            },
              h('img', { className: 'd2-bg-img', alt: '', loading: 'lazy', src: lsThumb(x.slug) }),
              h('span', { className: 'd2-bg-cap' },
                h('span', { className: 'd2-bg-name', title: x.slug }, x.title),
                sel ? h('span', { className: 'd2-bg-tick' }, '\u2713') : null));
          })),
        match.length > shown.length
          ? h('button', { type: 'button', className: 'd2-preview', onClick: function () { setLimit(limit + 24); } }, '加载更多')
          : null);
    }

    function SettingsPage() {
      const p = usePrefs();
      return h('div', { className: 'd2-page' },
        h('div', { className: 'd2-sec' },
          h('div', { className: 'd2-sec-title' }, 'DOTA2'),
          h('div', { className: 'd2-sec-desc' }, '外观、开场影片、背景与玩家档案卡。载入画面直接读本机 Dota 2，不复制、不占空间。'),
          h('div', { className: 'd2-row' },
            h('div', { className: 'd2-row-text' },
              h('span', { className: 'd2-row-title' }, '启用主题'),
              h('span', { className: 'd2-row-desc' }, '关闭后恢复 Harness 默认外观')),
            h(Switch, {
              on: p.enabled, label: '启用 DOTA2 主题',
              onToggle: function () { setPref('enabled', !prefs.enabled); }
            })),
          h('div', { className: 'd2-row' },
            h('div', { className: 'd2-row-text' },
              h('span', { className: 'd2-row-title' }, '单排积分'),
              h('span', { className: 'd2-row-desc' }, '只能从游戏客户端个人资料里抄；留空则完全不显示。')),
            h('input', {
              className: 'd2-input', type: 'text', inputMode: 'numeric',
              value: p.mmrManual || '', placeholder: '例如 4400',
              onChange: function (e) { setPref('mmrManual', e.target.value.replace(/[^0-9]/g, '').slice(0, 5)); }
            }))),
        h('div', { className: 'd2-sec' },
          h('div', { className: 'd2-sec-title' }, '开场动画'),
          h('div', { className: 'd2-sec-desc' }, '影片直接从本机 Dota 2 安装目录读取；已跳过开头的 Valve 标志与黑场。播放时整屏无按钮，点击任意处跳过。'),
          h('div', { className: 'd2-bootlist' },
            BOOTS.map(function (b) {
              const sel = p.boot === b.id;
              return h('button', {
                key: b.id, type: 'button',
                className: 'd2-boot' + (sel ? ' sel' : ''),
                onClick: function () { setPref('boot', b.id); },
                'aria-pressed': sel ? 'true' : 'false'
              },
                h('span', { className: 'd2-boot-name' }, b.name),
                b.note ? h('span', { className: 'd2-boot-note' }, b.note) : null,
                sel ? h('span', { className: 'd2-boot-tick' }, '\u2713') : null);
            })),
          h('button', { type: 'button', className: 'd2-preview', onClick: function () { bumpReplay(); } }, '\u25b6 预览开场动画'),
          h('div', { className: 'd2-row' },
            h('div', { className: 'd2-row-text' },
              h('span', { className: 'd2-row-title' }, '开场播放声音'),
              h('span', { className: 'd2-row-desc' }, '浏览器要求先有交互才允许带声音自动播放；被拦截时点一下屏幕即可开声。')),
            h(Switch, {
              on: p.bootSound, label: '开场播放声音',
              onToggle: function () { setPref('bootSound', !prefs.bootSound); }
            }))),
        h('div', { className: 'd2-sec' },
          h('div', { className: 'd2-sec-title' }, '界面背景'),
          h('div', { className: 'd2-sec-desc' }, '上方 3 张为插件自带（零依赖）；下方为游戏内载入画面，运行时从 VPK 解码，可按分类、英雄与关键词筛选。'),
          h('div', { className: 'd2-row' },
            h('div', { className: 'd2-row-text' },
              h('span', { className: 'd2-row-title' }, '面板不透明度'),
              h('span', { className: 'd2-row-desc' }, '越高面板越实、文字越清楚；越低则底图透出越多。')),
            h('input', {
              className: 'd2-range', type: 'range', min: '40', max: '98', step: '2',
              value: p.panelAlpha, 'aria-label': '面板不透明度',
              onChange: function (e) { setPref('panelAlpha', parseInt(e.target.value, 10) || 78); }
            })),
          h('div', { className: 'd2-row' },
            h('div', { className: 'd2-row-text' },
              h('span', { className: 'd2-row-title' }, '纯净壁纸'),
              h('span', { className: 'd2-row-desc' }, '去掉背景上的暗角与横向色带，避免壁纸发“花”')),
            h(Switch, {
              on: !!p.pureWall, label: '纯净壁纸',
              onToggle: function () { setPref('pureWall', !prefs.pureWall); }
            })),
          h('div', { className: 'd2-row' },
            h('div', { className: 'd2-row-text' },
              h('span', { className: 'd2-row-title' }, '配色跟随背景'),
              h('span', { className: 'd2-row-desc' }, '从当前壁纸抽取主色，面板、边框、强调色与文字色随之切换')),
            h(Switch, {
              on: p.autoTint !== false, label: '配色跟随背景',
              onToggle: function () { setPref('autoTint', !(prefs.autoTint !== false)); }
            })),
          h('div', { className: 'd2-sec-desc' }, '当前背景：' + bgLabel(p.background)),
          h('div', { className: 'd2-grid' },
            BACKGROUNDS.map(function (bg) {
              const sel = p.background === bg.id;
              return h('button', {
                key: bg.id, type: 'button',
                className: 'd2-bg' + (sel ? ' sel' : ''),
                onClick: function () { setPref('background', bg.id); },
                'aria-pressed': sel ? 'true' : 'false'
              },
                bg.file ? h(BgThumb, { src: thumbUrl(bg.file) }) : h('span', { className: 'd2-bg-ancient' }),
                h('span', { className: 'd2-bg-cap' },
                  h('span', { className: 'd2-bg-name' }, bg.name),
                  sel ? h('span', { className: 'd2-bg-tick' }, '\u2713') : null));
            })),
          h(BackgroundPicker)));
    }

    /* 开关关闭即不渲染 */
    function gate(Inner) {
      function Gated(props) {
        const p = usePrefs();
        return p.enabled ? h(Inner, props) : null;
      }
      return Gated;
    }
    const EmblemG = gate(Emblem);
    const WordmarkG = gate(Wordmark);
    const HeroLogoG = gate(HeroLogo);
    const PlayerCardG = gate(PlayerCard);
    const DockRunesG = gate(DockRunes);
    const AtmosphereG = gate(Atmosphere);

    /* ------------------------------------------------------------------
       Apply
       ------------------------------------------------------------------ */
    return {
      inject: ['slots', 'theme'],
      apply(ctx) {
        const disposers = [];
        const errors = [];
        const log = function (level, msg) {
          try { require('console')[level]('DOTA2 主题: ' + msg); } catch (e) {}
        };

        function syncStyles() {
          if (prefs.enabled) {
            if (!styleDisposer) styleDisposer = insertStyles();
            if (!backdropSheet) backdropSheet = insertCss(backdropCss(), 'dota2-backdrop');
          } else {
            if (styleDisposer) { try { styleDisposer(); } catch (e) {} styleDisposer = null; }
            if (backdropSheet) { try { backdropSheet(); } catch (e) {} backdropSheet = null; }
          }
        }

        let tokenDisposers = [];
        function syncTokens() {
          tokenDisposers.forEach(function (d) { try { d(); } catch (e) {} });
          tokenDisposers = [];
          if (!prefs.enabled) return;
          const theme = ctx.theme;
          if (!theme || typeof theme.overrideTokens !== 'function') return;
          if (!forcedDark) {
            forcedDark = true;
            try {
              const snap0 = theme.getTheme();
              if (snap0 && snap0.active && snap0.active.colorScheme !== 'dark' && typeof theme.setTheme === 'function') theme.setTheme('dark');
            } catch (e) {}
          }
          try {
            tokenDisposers.push(theme.overrideTokens('@local/dsh-nortrom-dota2-ui', tokensFor(prefs.background, prefs.panelAlpha, wallTint)));
          try {
            const el = document.documentElement.style;
            const t = (prefs.autoTint && wallTint) ? wallTint : null;
            el.setProperty('--d2-solid', t ? ('rgba(' + t.dark.join(',') + ',.94)') : 'rgba(16,11,6,.94)');
            el.setProperty('--d2-gold', t ? ('rgb(' + t.accent.join(',') + ')') : 'var(--d2-gold, #c9a55c)');
            el.setProperty('--d2-gold-hi', t ? ('rgb(' + t.accentHi.join(',') + ')') : 'var(--d2-gold-hi, #f0c070)');
            el.setProperty('--d2-gold-rgb', t ? t.accent.join(' ') : '201 165 92');
            el.setProperty('--d2-gold-hi-rgb', t ? t.accentHi.join(' ') : '240 192 112');
            el.setProperty('--d2-gold-dim', t ? ('rgb(' + t.accentDim.join(',') + ')') : '#3d2a17');
          } catch (e) { /* 忽略 */ }
          } catch (e) { errors.push('theme: ' + e.message); }
        }

        let backdropSheet = null;
        let diagTimer = null;
        function syncBackdrop() {
          let wall = null;
          if (prefs.enabled) {
            const url = wallFor(prefs.background);
            try { document.documentElement.classList.toggle('d2-pure', !!prefs.pureWall); } catch (e) {}
            if (url && url !== lastSampledUrl) { lastSampledUrl = url; wallUrlNow = url || null; sampleWall(url); probeWall(url); }
            wall = url
              ? (prefs.pureWall
                  ? 'url("' + url + '")'
                  : 'linear-gradient(180deg, rgba(13,8,5,.30) 0%, rgba(13,8,5,.16) 45%, rgba(13,8,5,.44) 100%), url("' + url + '")')
              : 'radial-gradient(ellipse 60% 45% at 18% 8%, rgb(var(--d2-gold-rgb, 201 165 92) / .10) 0%, rgb(var(--d2-gold-rgb, 201 165 92) / 0) 60%), radial-gradient(ellipse 55% 50% at 84% 92%, rgba(139,26,26,.13) 0%, rgba(139,26,26,0) 62%), radial-gradient(ellipse 70% 60% at 50% 50%, rgba(58,36,20,.55) 0%, rgba(13,8,5,0) 75%)';
          }
          try {
            if (wall) document.documentElement.style.setProperty('--d2-wall', wall);
            else document.documentElement.style.removeProperty('--d2-wall');
            // 把壁纸直接贴到应用自己的根容器（它一定会被绘制）：手段不靠 CSS 堆叠层级
            try {
              const old = document.getElementById('d2-wallpaper');
              if (old && old.parentNode) old.parentNode.removeChild(old);
              const dim = prefs.pureWall ? 0 : 0.18;   // 轻抹素：可读性由面板层保证，不再 45% 压死图案
              const scrim = 'rgba(13,8,5,' + dim.toFixed(2) + ')';
              const vw = window.innerWidth, vh = window.innerHeight;
              const frames = document.querySelectorAll('div[class*="_frame"], div[class*="frame"]');
              let applied = 0;
              for (let i = 0; i < frames.length; i++) {
                const f = frames[i];
                const r = f.getBoundingClientRect();
                // 只认“窗口尺寸”的那一层：排除 2273x10009 这类会话滚动容器
                const isViewport = Math.abs(r.width - vw) <= 6 && Math.abs(r.height - vh) <= 12;
                if (!wallUrlNow || !isViewport) {
                  f.style.removeProperty('background-image');
                  f.style.removeProperty('background-size');
                  f.style.removeProperty('background-position');
                  f.style.removeProperty('background-repeat');
                  f.style.removeProperty('background-attachment');
                  continue;
                }
                const src = TEST_WALL ? lsImage(TEST_WALL) : wallUrlNow;
                f.style.setProperty('background-image',
                  'linear-gradient(' + scrim + ',' + scrim + '), url("' + src + '")', 'important');
                f.style.setProperty('background-size', 'cover', 'important');
                f.style.setProperty('background-position', 'center', 'important');
                f.style.setProperty('background-repeat', 'no-repeat', 'important');
                applied++;
              }
wallImgEl = 'frames:' + applied + ' dim:' + dim.toFixed(2)
                + ' src:' + (TEST_WALL ? lsImage(TEST_WALL) : (wallUrlNow || 'none'));
            } catch (e) { wallImgEl = 'err:' + (e && e.message ? e.message.slice(0, 48) : ''); }
          } catch (e) {}
        }

        function syncAll() {
          syncStyles(); syncTokens(); syncBackdrop();
          try { if (diagTimer) clearTimeout(diagTimer); diagTimer = setTimeout(function () { sendDiag('change'); }, 900); } catch (e) {}
        }
        const unsub = subscribePrefs(syncAll);
        syncAll();

        function reg(slot, options, Comp, label) {
          disposers.push(ctx.slots.inject(slot, function () {
            const tries = [
              Object.assign({ name: slot }, options),
              { name: slot },
              Object.assign({ name: slot, id: 'dota2-' + label.replace(/[^a-z0-9]+/gi, '-') }, options)
            ];
            for (let i = 0; i < tries.length; i++) {
              try { return ctx.slots.register(tries[i], Comp); }
              catch (e) { errors.push(label + ' try' + (i + 1) + ': ' + (e && e.message ? e.message : String(e))); }
            }
            return function () {};
          }));
        }

        reg('shell.overlay', { id: 'dota2-atmosphere', order: 1 }, AtmosphereG, 'atmosphere');
        reg('shell.overlay', { id: 'dota2-splash', order: 100 }, Splash, 'splash');
        reg('sidebar.brand.mark', { priority: -1 }, EmblemG, 'brand.mark');
        reg('sidebar.brand.name', { priority: -1 }, WordmarkG, 'brand.name');
        reg('conversation.hero.brand.mark', {}, HeroLogoG, 'hero.brand.mark');
        reg('conversation.input.dock', { id: 'dota2-player-card', order: 5 }, PlayerCardG, 'input.dock');
        reg('conversation.composer.dock', { id: 'dota2-runes', order: 2 }, DockRunesG, 'composer.dock');
        reg('settings.section', { id: 'dota2-theme', order: 60, label: 'DOTA2 主题' }, SettingsPage, 'settings.section');

        const wallProbe = { ok: null, w: 0, h: 0 };
        function probeWall(url) {
          if (!url || typeof Image !== 'function') return;
          const im = new Image();
          im.onload = function () { wallProbe.ok = true; wallProbe.w = im.naturalWidth; wallProbe.h = im.naturalHeight; };
          im.onerror = function () { wallProbe.ok = false; };
          im.src = url;
        }
        function probePaint() {
          try {
            const cs1 = getComputedStyle(document.documentElement);
            const cs2 = getComputedStyle(document.body);
            wallProbe.htmlBg = String(cs1.backgroundImage).slice(0, 220);
            wallProbe.bodyBg = String(cs2.backgroundImage).slice(0, 220);
            const w = window.innerWidth, h = window.innerHeight;
            const el = document.elementFromPoint(Math.floor(w / 2), Math.floor(h / 2));
            wallProbe.topEl = el ? (el.tagName + '|' + String(el.className || '').slice(0, 48)
              + '|bg=' + String(getComputedStyle(el).backgroundColor).slice(0, 34)) : null;
          } catch (e) { /* 忽略 */ }
        }
        function domScan() {
          // 全深度扫描：列出所有“大面积 + 不透明(α≥0.8)或带背景图”的层，用于找出遮住壁纸的那一层
          const out = [];
          try {
            const all = document.querySelectorAll('*');
            for (let i = 0; i < all.length && out.length < 26; i++) {
              const el = all[i];
              const cs = getComputedStyle(el);
              const bg = cs.backgroundColor || '';
              let a = 0;
              const m = /rgba?\(([^)]+)\)/.exec(bg);
              if (m) {
                const parts = m[1].split(',').map(function (x) { return parseFloat(x); });
                a = parts.length > 3 ? parts[3] : 1;
              }
              const img = cs.backgroundImage && cs.backgroundImage !== 'none';
              if (a < 0.8 && !img) continue;
              const r = el.getBoundingClientRect();
              if (r.width * r.height < 60000) continue;
              out.push((el.tagName + '.' + String(el.className || '').split(' ')[0]).slice(0, 46)
                + ' a=' + a.toFixed(2) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)
                + (img ? ' IMG(' + String(cs.backgroundImage).slice(0, 26) + ')' : ''));
            }
          } catch (e) { out.push('err:' + (e && e.message ? e.message.slice(0, 44) : '')); }
          return out;
        }

        function sendDiag(tag) {
          try {
            const theme = ctx.theme;
            let tok = '(none)'; let rev = -1;
            try {
              const snap = theme.getTheme();
              rev = snap.revision;
              tok = (snap.active && snap.active.tokens && snap.active.tokens['--dsw-alias-bg-base']) || '(missing)';
            } catch (e) { tok = 'err:' + e.message; }
            let bodyBg = '';
            try { bodyBg = getComputedStyle(document.body).backgroundImage || ''; } catch (e) {}
        try { probePaint(); } catch (e) { /* 忽略 */ }
            const payload = {
              tag: tag, themeOk: typeof theme.overrideTokens === 'function',
              bgBase: String(tok), revision: rev, prefs: prefs,
              bodyBg: String(bodyBg).slice(0, 160), dom: domScan(), errors: errors.slice(0, 8),
              wallUrl: wallUrlNow, wallLoaded: wallProbe.ok, wallW: wallProbe.w, wallH: wallProbe.h, wallImgEl: wallImgEl,
              htmlBg: wallProbe.htmlBg, bodyBg2: wallProbe.bodyBg, topEl: wallProbe.topEl
            };
            if (typeof fetch === 'function') fetch('/dota2-ui/diag?' + encodeURIComponent(JSON.stringify(payload))).catch(function () {});
          } catch (e) {}
        }
        sendDiag('apply');
        loadDiskPrefs();
        try {
          window.addEventListener('error', function (ev) {
            try { sendDiag('winerror:' + String(ev && ev.message ? ev.message : '?').slice(0, 110)); } catch (e) {}
          });
        } catch (e) {}
        setTimeout(function () { sendDiag('settled'); }, 1800);

        log('info', '已激活');
        if (errors.length) log('error', errors.join(' | '));

        return function () {
          unsub();
          if (styleDisposer) { try { styleDisposer(); } catch (e) {} styleDisposer = null; }
          if (backdropSheet) { try { backdropSheet(); } catch (e) {} backdropSheet = null; }
          tokenDisposers.forEach(function (d) { try { d(); } catch (e) {} });
          disposers.forEach(function (d) { try { d(); } catch (e) {} });
        };
      }
    };
  }
});
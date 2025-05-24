export type weapon = {
    id: number,
    name: string,
    iconUrl: string,
    type: 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst',
    rarity: 3 | 4 | 5
};

export const weaponlist: weapon[] = [
    // 5星武器 - 剣
    { id: 1, name: '霧切の廻光', iconUrl: '/images/weapons/mistsplitter-icon.png', type: 'Sword', rarity: 5 },
    { id: 2, name: '磐岩結緑', iconUrl: '/images/weapons/jade-cutter-icon.png', type: 'Sword', rarity: 5 },
    { id: 3, name: '風鷹剣', iconUrl: '/images/weapons/aquila-favonia-icon.png', type: 'Sword', rarity: 5 },
    { id: 4, name: '斬山の刃', iconUrl: '/images/weapons/summit-shaper-icon.png', type: 'Sword', rarity: 5 },
    { id: 5, name: '天空の刃', iconUrl: '/images/weapons/skyward-blade-icon.png', type: 'Sword', rarity: 5 },
    { id: 6, name: '蒼古なる自由への誓い', iconUrl: '/images/weapons/freedom-sworn-icon.png', type: 'Sword', rarity: 5 },
    { id: 7, name: '波乱月白経津', iconUrl: '/images/weapons/haran-geppaku-icon.png', type: 'Sword', rarity: 5 },

    // 5星武器 - 大剣
    { id: 8, name: '狼の末路', iconUrl: '/images/weapons/wolfs-gravestone-icon.png', type: 'Claymore', rarity: 5 },
    { id: 9, name: '天空の傲', iconUrl: '/images/weapons/skyward-pride-icon.png', type: 'Claymore', rarity: 5 },
    { id: 10, name: '無工の剣', iconUrl: '/images/weapons/unforged-icon.png', type: 'Claymore', rarity: 5 },
    { id: 11, name: '松韻の響く頃', iconUrl: '/images/weapons/broken-pines-icon.png', type: 'Claymore', rarity: 5 },
    { id: 12, name: '赤角石塵滅砕', iconUrl: '/images/weapons/redhorn-icon.png', type: 'Claymore', rarity: 5 },

    // 5星武器 - 長柄武器
    { id: 13, name: '護摩の杖', iconUrl: '/images/weapons/staff-homa-icon.png', type: 'Polearm', rarity: 5 },
    { id: 14, name: '和璞鳶', iconUrl: '/images/weapons/jade-spear-icon.png', type: 'Polearm', rarity: 5 },
    { id: 15, name: '天空の脊', iconUrl: '/images/weapons/skyward-spine-icon.png', type: 'Polearm', rarity: 5 },
    { id: 16, name: '貫虹の槍', iconUrl: '/images/weapons/vortex-vanquisher-icon.png', type: 'Polearm', rarity: 5 },
    { id: 17, name: '息災', iconUrl: '/images/weapons/calamity-queller-icon.png', type: 'Polearm', rarity: 5 },
    { id: 18, name: '草薙の稲光', iconUrl: '/images/weapons/engulfing-lightning-icon.png', type: 'Polearm', rarity: 5 },

    // 5星武器 - 弓
    { id: 19, name: 'アモスの弓', iconUrl: '/images/weapons/amos-bow-icon.png', type: 'Bow', rarity: 5 },
    { id: 20, name: '天空の翼', iconUrl: '/images/weapons/skyward-harp-icon.png', type: 'Bow', rarity: 5 },
    { id: 21, name: '終焉を嘆く詩', iconUrl: '/images/weapons/elegy-end-icon.png', type: 'Bow', rarity: 5 },
    { id: 22, name: '飛雷の鳴弦', iconUrl: '/images/weapons/thundering-pulse-icon.png', type: 'Bow', rarity: 5 },
    { id: 23, name: '冬極の白星', iconUrl: '/images/weapons/polar-star-icon.png', type: 'Bow', rarity: 5 },
    { id: 24, name: '若水', iconUrl: '/images/weapons/aqua-simulacra-icon.png', type: 'Bow', rarity: 5 },

    // 5星武器 - 法器
    { id: 25, name: '天空の巻', iconUrl: '/images/weapons/skyward-atlas-icon.png', type: 'Catalyst', rarity: 5 },
    { id: 26, name: '四風原典', iconUrl: '/images/weapons/lost-prayer-icon.png', type: 'Catalyst', rarity: 5 },
    { id: 27, name: '塵歌壺', iconUrl: '/images/weapons/memory-dust-icon.png', type: 'Catalyst', rarity: 5 },
    { id: 28, name: '不滅の月華', iconUrl: '/images/weapons/everlasting-moonglow-icon.png', type: 'Catalyst', rarity: 5 },
    { id: 29, name: '神楽の真意', iconUrl: '/images/weapons/kagura-verity-icon.png', type: 'Catalyst', rarity: 5 },

    // 4星武器 - 剣
    { id: 30, name: '笛の剣', iconUrl: '/images/weapons/flute-icon.png', type: 'Sword', rarity: 4 },
    { id: 31, name: '祭礼の剣', iconUrl: '/images/weapons/sacrificial-sword-icon.png', type: 'Sword', rarity: 4 },
    { id: 32, name: '黒剣', iconUrl: '/images/weapons/black-sword-icon.png', type: 'Sword', rarity: 4 },
    { id: 33, name: '鉄蜂の刺し', iconUrl: '/images/weapons/prototype-rancour-icon.png', type: 'Sword', rarity: 4 },
    { id: 34, name: '鉄蜂の刺し', iconUrl: '/images/weapons/iron-sting-icon.png', type: 'Sword', rarity: 4 },
    { id: 35, name: '西風剣', iconUrl: '/images/weapons/favonius-sword-icon.png', type: 'Sword', rarity: 4 },
    { id: 36, name: '匣中龍吟', iconUrl: '/images/weapons/lions-roar-icon.png', type: 'Sword', rarity: 4 },
    { id: 37, name: '腐植の剣', iconUrl: '/images/weapons/festering-desire-icon.png', type: 'Sword', rarity: 4 },
    { id: 38, name: '天目影打刀', iconUrl: '/images/weapons/amenoma-kageuchi-icon.png', type: 'Sword', rarity: 4 },
    { id: 39, name: 'シナバースピンドル', iconUrl: '/images/weapons/cinnabar-spindle-icon.png', type: 'Sword', rarity: 4 },

    // 4星武器 - 大剣
    { id: 40, name: '祭礼の大剣', iconUrl: '/images/weapons/sacrificial-greatsword-icon.png', type: 'Claymore', rarity: 4 },
    { id: 41, name: '鐘の剣', iconUrl: '/images/weapons/bell-icon.png', type: 'Claymore', rarity: 4 },
    { id: 42, name: '西風大剣', iconUrl: '/images/weapons/favonius-greatsword-icon.png', type: 'Claymore', rarity: 4 },
    { id: 43, name: '古華試作', iconUrl: '/images/weapons/prototype-archaic-icon.png', type: 'Claymore', rarity: 4 },
    { id: 44, name: '白影の剣', iconUrl: '/images/weapons/whiteblind-icon.png', type: 'Claymore', rarity: 4 },
    { id: 45, name: '雨裁', iconUrl: '/images/weapons/rainslasher-icon.png', type: 'Claymore', rarity: 4 },
    { id: 46, name: '螭骨剣', iconUrl: '/images/weapons/serpent-spine-icon.png', type: 'Claymore', rarity: 4 },
    { id: 47, name: '雪葬の星銀', iconUrl: '/images/weapons/snow-tombed-icon.png', type: 'Claymore', rarity: 4 },
    { id: 48, name: '衒いの魚', iconUrl: '/images/weapons/sea-lord-icon.png', type: 'Claymore', rarity: 4 },
    { id: 49, name: '桂木斬長正', iconUrl: '/images/weapons/katsuragikiri-icon.png', type: 'Claymore', rarity: 4 },

    // 4星武器 - 長柄武器
    { id: 50, name: '匣中滅龍', iconUrl: '/images/weapons/dragons-bane-icon.png', type: 'Polearm', rarity: 4 },
    { id: 51, name: '西風長槍', iconUrl: '/images/weapons/favonius-lance-icon.png', type: 'Polearm', rarity: 4 },
    { id: 52, name: '星鎌・試作', iconUrl: '/images/weapons/prototype-starglitter-icon.png', type: 'Polearm', rarity: 4 },
    { id: 53, name: '流月の針', iconUrl: '/images/weapons/crescent-pike-icon.png', type: 'Polearm', rarity: 4 },
    { id: 54, name: '死闘の槍', iconUrl: '/images/weapons/deathmatch-icon.png', type: 'Polearm', rarity: 4 },
    { id: 55, name: '黒岩の突槍', iconUrl: '/images/weapons/blackcliff-pole-icon.png', type: 'Polearm', rarity: 4 },
    { id: 56, name: '漁獲', iconUrl: '/images/weapons/catch-icon.png', type: 'Polearm', rarity: 4 },
    { id: 57, name: 'ドラゴンスピア', iconUrl: '/images/weapons/dragonspine-spear-icon.png', type: 'Polearm', rarity: 4 },
    { id: 58, name: '喜多院十文字', iconUrl: '/images/weapons/kitain-cross-icon.png', type: 'Polearm', rarity: 4 },

    // 4星武器 - 弓
    { id: 59, name: '弓蔵', iconUrl: '/images/weapons/rust-icon.png', type: 'Bow', rarity: 4 },
    { id: 60, name: '祭礼の弓', iconUrl: '/images/weapons/sacrificial-bow-icon.png', type: 'Bow', rarity: 4 },
    { id: 61, name: '絶弦', iconUrl: '/images/weapons/stringless-icon.png', type: 'Bow', rarity: 4 },
    { id: 62, name: '西風猟弓', iconUrl: '/images/weapons/favonius-warbow-icon.png', type: 'Bow', rarity: 4 },
    { id: 63, name: '澹月・試作', iconUrl: '/images/weapons/prototype-crescent-icon.png', type: 'Bow', rarity: 4 },
    { id: 64, name: '鋼輪弓', iconUrl: '/images/weapons/compound-bow-icon.png', type: 'Bow', rarity: 4 },
    { id: 65, name: '蒼翠の狩猟弓', iconUrl: '/images/weapons/viridescent-hunt-icon.png', type: 'Bow', rarity: 4 },
    { id: 66, name: 'アレー・ハンター', iconUrl: '/images/weapons/alley-hunter-icon.png', type: 'Bow', rarity: 4 },
    { id: 67, name: '風花の頌歌', iconUrl: '/images/weapons/windblume-ode-icon.png', type: 'Bow', rarity: 4 },
    { id: 68, name: '破魔の弓', iconUrl: '/images/weapons/hamayumi-icon.png', type: 'Bow', rarity: 4 },
    { id: 69, name: 'ミッドナイトワルツ', iconUrl: '/images/weapons/mitternachts-waltz-icon.png', type: 'Bow', rarity: 4 },

    // 4星武器 - 法器
    { id: 70, name: '祭礼の断片', iconUrl: '/images/weapons/sacrificial-fragments-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 71, name: '流浪楽章', iconUrl: '/images/weapons/widsith-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 72, name: '西風秘典', iconUrl: '/images/weapons/favonius-codex-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 73, name: '昭心', iconUrl: '/images/weapons/eye-perception-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 74, name: '試作の琥珀', iconUrl: '/images/weapons/prototype-amber-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 75, name: '万国諸海の図', iconUrl: '/images/weapons/mappa-mare-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 76, name: '匣中日月', iconUrl: '/images/weapons/solar-pearl-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 77, name: '忘却の峡谷', iconUrl: '/images/weapons/frostbearer-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 78, name: 'ドドコの物語', iconUrl: '/images/weapons/dodoco-tales-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 79, name: '白辰の輪', iconUrl: '/images/weapons/hakushin-ring-icon.png', type: 'Catalyst', rarity: 4 },
    { id: 80, name: '誓いの明瞳', iconUrl: '/images/weapons/oathsworn-eye-icon.png', type: 'Catalyst', rarity: 4 },

    // 3星武器 - 剣
    { id: 81, name: '冷刃', iconUrl: '/images/weapons/cool-steel-icon.png', type: 'Sword', rarity: 3 },
    { id: 82, name: '黎明の神剣', iconUrl: '/images/weapons/harbinger-dawn-icon.png', type: 'Sword', rarity: 3 },
    { id: 83, name: '飛天御剣', iconUrl: '/images/weapons/skyrider-sword-icon.png', type: 'Sword', rarity: 3 },
    { id: 84, name: '腐植の剣', iconUrl: '/images/weapons/fillet-blade-icon.png', type: 'Sword', rarity: 3 },
    { id: 85, name: '旅道の剣', iconUrl: '/images/weapons/travelers-sword-icon.png', type: 'Sword', rarity: 3 },
    { id: 86, name: '暗鉄剣', iconUrl: '/images/weapons/dark-iron-sword-icon.png', type: 'Sword', rarity: 3 },

    // 3星武器 - 大剣
    { id: 87, name: '理論殺し', iconUrl: '/images/weapons/debate-club-icon.png', type: 'Claymore', rarity: 3 },
    { id: 88, name: '血染めの大剣', iconUrl: '/images/weapons/bloodtainted-greatsword-icon.png', type: 'Claymore', rarity: 3 },
    { id: 89, name: '鉄影段平', iconUrl: '/images/weapons/ferrous-shadow-icon.png', type: 'Claymore', rarity: 3 },
    { id: 90, name: '飛天大御剣', iconUrl: '/images/weapons/skyrider-greatsword-icon.png', type: 'Claymore', rarity: 3 },
    { id: 91, name: '白鉄の大剣', iconUrl: '/images/weapons/white-iron-greatsword-icon.png', type: 'Claymore', rarity: 3 },

    // 3星武器 - 長柄武器
    { id: 92, name: '白纓槍', iconUrl: '/images/weapons/white-tassel-icon.png', type: 'Polearm', rarity: 3 },
    { id: 93, name: '鉾槍', iconUrl: '/images/weapons/halberd-icon.png', type: 'Polearm', rarity: 3 },
    { id: 94, name: '黒纓槍', iconUrl: '/images/weapons/black-tassel-icon.png', type: 'Polearm', rarity: 3 },

    // 3星武器 - 弓
    { id: 95, name: '弾弓', iconUrl: '/images/weapons/slingshot-icon.png', type: 'Bow', rarity: 3 },
    { id: 96, name: '神射手の誓い', iconUrl: '/images/weapons/sharpshooters-oath-icon.png', type: 'Bow', rarity: 3 },
    { id: 97, name: '鴉羽の弓', iconUrl: '/images/weapons/raven-bow-icon.png', type: 'Bow', rarity: 3 },
    { id: 98, name: '反曲弓', iconUrl: '/images/weapons/recurve-bow-icon.png', type: 'Bow', rarity: 3 },
    { id: 99, name: '信使', iconUrl: '/images/weapons/messenger-icon.png', type: 'Bow', rarity: 3 },

    // 3星武器 - 法器
    { id: 100, name: '双子の翡翠', iconUrl: '/images/weapons/twin-nephrite-icon.png', type: 'Catalyst', rarity: 3 },
    { id: 101, name: '魔導緒論', iconUrl: '/images/weapons/magic-guide-icon.png', type: 'Catalyst', rarity: 3 },
    { id: 102, name: '龍殺しの英傑譚', iconUrl: '/images/weapons/thrilling-tales-icon.png', type: 'Catalyst', rarity: 3 },
    { id: 103, name: '異世界行記', iconUrl: '/images/weapons/otherworldly-story-icon.png', type: 'Catalyst', rarity: 3 },
    { id: 104, name: '翡玉法珠', iconUrl: '/images/weapons/emerald-orb-icon.png', type: 'Catalyst', rarity: 3 },
];

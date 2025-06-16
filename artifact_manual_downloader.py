import requests
from pathlib import Path
import time

# ダウンロード先フォルダの設定
output_dir = Path("genshin-tools/public/images/artifacts")

# ダウンロード用のヘッダー
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# 全聖遺物のアイコンURL（51個すべて）
artifact_icons = [
    # 5星聖遺物セット
    {
        "name": "剣闘士のフィナーレ", 
        "filename": "gladiator-finale-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Item_Gladiator%27s_Finale.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Gladiator%27s_Finale.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15501.png",
            "https://api.genshin.dev/artifacts/gladiators-finale/flower",
        ]
    },
    {
        "name": "大地を流浪する楽団", 
        "filename": "wanderer-troupe-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/d/df/Item_Wanderer%27s_Troupe.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Wanderer%27s_Troupe.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15503.png",
            "https://api.genshin.dev/artifacts/wanderers-troupe/flower",
        ]
    },
    {
        "name": "翠緑の影", 
        "filename": "viridescent-venerer-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/a/a5/Item_Viridescent_Venerer.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Viridescent_Venerer.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15502.png",
            "https://api.genshin.dev/artifacts/viridescent-venerer/flower",
        ]
    },
    {
        "name": "悠久の磐岩", 
        "filename": "archaic-petra-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/0/07/Item_Archaic_Petra.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Archaic_Petra.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15504.png",
            "https://api.genshin.dev/artifacts/archaic-petra/flower",
        ]
    },
    {
        "name": "逆飛びの流星", 
        "filename": "retracing-bolide-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/4/4c/Item_Retracing_Bolide.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Retracing_Bolide.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15505.png",
            "https://api.genshin.dev/artifacts/retracing-bolide/flower",
        ]
    },
    {
        "name": "烈火を渡る賢者", 
        "filename": "lavawalker-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/a/ab/Item_Lavawalker.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Lavawalker.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15506.png",
            "https://api.genshin.dev/artifacts/lavawalker/flower",
        ]
    },
    {
        "name": "炎の魔女", 
        "filename": "crimson-witch-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/6/64/Item_Crimson_Witch_of_Flames.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Crimson_Witch_of_Flames.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15507.png",
            "https://api.genshin.dev/artifacts/crimson-witch-of-flames/flower",
        ]
    },
    {
        "name": "雷のような怒り", 
        "filename": "thundering-fury-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/cf/Item_Thundering_Fury.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Thundering_Fury.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15508.png",
            "https://api.genshin.dev/artifacts/thundering-fury/flower",
        ]
    },
    {
        "name": "雷を鎮める尊者", 
        "filename": "thundersoother-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/d/d1/Item_Thundersoother.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Thundersoother.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15509.png",
            "https://api.genshin.dev/artifacts/thundersoother/flower",
        ]
    },
    {
        "name": "氷風を彷徨う勇士", 
        "filename": "blizzard-strayer-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/4/46/Item_Blizzard_Strayer.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Blizzard_Strayer.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15510.png",
            "https://api.genshin.dev/artifacts/blizzard-strayer/flower",
        ]
    },
    {
        "name": "沈淪の心", 
        "filename": "heart-depth-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Item_Heart_of_Depth.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Heart_of_Depth.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15511.png",
            "https://api.genshin.dev/artifacts/heart-of-depth/flower",
        ]
    },
    {
        "name": "血染めの騎士道", 
        "filename": "bloodstained-chivalry-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/b/ba/Item_Bloodstained_Chivalry.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Bloodstained_Chivalry.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15512.png",
            "https://api.genshin.dev/artifacts/bloodstained-chivalry/flower",
        ]
    },
    {
        "name": "旧貴族のしつけ", 
        "filename": "noblesse-oblige-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/cc/Item_Noblesse_Oblige.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Noblesse_Oblige.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15513.png",
            "https://api.genshin.dev/artifacts/noblesse-oblige/flower",
        ]
    },
    {
        "name": "愛される少女", 
        "filename": "maiden-beloved-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Maiden_Beloved.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Maiden_Beloved.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15514.png",
            "https://api.genshin.dev/artifacts/maiden-beloved/flower",
        ]
    },
    {
        "name": "千岩牢固", 
        "filename": "tenacity-millelith-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/f/fc/Item_Tenacity_of_the_Millelith.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Tenacity_of_the_Millelith.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15515.png",
            "https://api.genshin.dev/artifacts/tenacity-of-the-millelith/flower",
        ]
    },
    {
        "name": "蒼白の炎", 
        "filename": "pale-flame-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/f/f3/Item_Pale_Flame.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Pale_Flame.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15516.png",
            "https://api.genshin.dev/artifacts/pale-flame/flower",
        ]
    },
    {
        "name": "追憶のしめ縄", 
        "filename": "shimenawa-reminiscence-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/2/2b/Item_Shimenawa%27s_Reminiscence.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Shimenawa%27s_Reminiscence.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15517.png",
            "https://api.genshin.dev/artifacts/shimenawas-reminiscence/flower",
        ]
    },
    {
        "name": "絶縁の旗印", 
        "filename": "emblem-severed-fate-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/d/d7/Item_Emblem_of_Severed_Fate.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Emblem_of_Severed_Fate.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15518.png",
            "https://api.genshin.dev/artifacts/emblem-of-severed-fate/flower",
        ]
    },
    {
        "name": "華館夢醒形骸記", 
        "filename": "husk-opulent-dreams-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/0/0c/Item_Husk_of_Opulent_Dreams.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Husk_of_Opulent_Dreams.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15519.png",
            "https://api.genshin.dev/artifacts/husk-of-opulent-dreams/flower",
        ]
    },
    {
        "name": "海染硨磲", 
        "filename": "ocean-hued-clam-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/6/64/Item_Ocean-Hued_Clam.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Ocean-Hued_Clam.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15520.png",
            "https://api.genshin.dev/artifacts/ocean-hued-clam/flower",
        ]
    },
    {
        "name": "辰砂往生録", 
        "filename": "vermillion-hereafter-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/c8/Item_Vermillion_Hereafter.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Vermillion_Hereafter.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15521.png",
            "https://api.genshin.dev/artifacts/vermillion-hereafter/flower",
        ]
    },
    {
        "name": "来歆の余響", 
        "filename": "echoes-offering-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/7/7f/Item_Echoes_of_an_Offering.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Echoes_of_an_Offering.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15522.png",
            "https://api.genshin.dev/artifacts/echoes-of-an-offering/flower",
        ]
    },
    {
        "name": "深林の記憶", 
        "filename": "deepwood-memories-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/c4/Item_Deepwood_Memories.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Deepwood_Memories.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15523.png",
            "https://api.genshin.dev/artifacts/deepwood-memories/flower",
        ]
    },
    {
        "name": "金メッキの夢", 
        "filename": "gilded-dreams-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/0/0f/Item_Gilded_Dreams.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Gilded_Dreams.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15524.png",
            "https://api.genshin.dev/artifacts/gilded-dreams/flower",
        ]
    },
    {
        "name": "砂上の楼閣の史話", 
        "filename": "desert-pavilion-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/cd/Item_Desert_Pavilion_Chronicle.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Desert_Pavilion_Chronicle.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15525.png",
            "https://api.genshin.dev/artifacts/desert-pavilion-chronicle/flower",
        ]
    },
    {
        "name": "楽園の絶花", 
        "filename": "flower-paradise-lost-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/a/a8/Item_Flower_of_Paradise_Lost.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Flower_of_Paradise_Lost.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15526.png",
            "https://api.genshin.dev/artifacts/flower-of-paradise-lost/flower",
        ]
    },
    {
        "name": "水仙の夢", 
        "filename": "nymph-dream-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/c8/Item_Nymph%27s_Dream.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Nymph%27s_Dream.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15527.png",
            "https://api.genshin.dev/artifacts/nymphs-dream/flower",
        ]
    },
    {
        "name": "花海甘露の光", 
        "filename": "vourukasha-glow-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/e/e1/Item_Vourukasha%27s_Glow.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Vourukasha%27s_Glow.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15528.png",
            "https://api.genshin.dev/artifacts/vourukahas-glow/flower",
        ]
    },
    {
        "name": "黄金の劇団", 
        "filename": "golden-troupe-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/e/e9/Item_Golden_Troupe.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Golden_Troupe.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15529.png",
            "https://api.genshin.dev/artifacts/golden-troupe/flower",
        ]
    },
    {
        "name": "マレショーセーハンター", 
        "filename": "marechaussee-hunter-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/5/5c/Item_Marechaussee_Hunter.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Marechaussee_Hunter.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15530.png",
            "https://api.genshin.dev/artifacts/marechaussee-hunter/flower",
        ]
    },
    {
        "name": "昔日の宗室の儀", 
        "filename": "nighttime-whispers-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Item_Nighttime_Whispers_in_the_Echoing_Woods.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Nighttime_Whispers_in_the_Echoing_Woods.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15531.png",
            "https://api.genshin.dev/artifacts/nighttime-whispers-in-the-echoing-woods/flower",
        ]
    },
    {
        "name": "過ぎ去りし日の歌", 
        "filename": "song-days-past-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Item_Song_of_Days_Past.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Song_of_Days_Past.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15532.png",
            "https://api.genshin.dev/artifacts/song-of-days-past/flower",
        ]
    },
    {
        "name": "調和の奇想", 
        "filename": "fragment-harmonic-whimsy-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/2/2e/Item_Fragment_of_Harmonic_Whimsy.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Fragment_of_Harmonic_Whimsy.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15533.png",
            "https://api.genshin.dev/artifacts/fragment-of-harmonic-whimsy/flower",
        ]
    },
    {
        "name": "未完の幻想", 
        "filename": "unfinished-reverie-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/8/81/Item_Unfinished_Reverie.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Unfinished_Reverie.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15534.png",
            "https://api.genshin.dev/artifacts/unfinished-reverie/flower",
        ]
    },
    {
        "name": "黒曜の記録", 
        "filename": "obsidian-codex-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/9/95/Item_Obsidian_Codex.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Obsidian_Codex.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15535.png",
            "https://api.genshin.dev/artifacts/obsidian-codex/flower",
        ]
    },
    {
        "name": "燼城の勇者の書", 
        "filename": "scroll-hero-cinder-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/c4/Item_Scroll_of_the_Hero_of_Cinder_City.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Scroll_of_the_Hero_of_Cinder_City.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15536.png",
            "https://api.genshin.dev/artifacts/scroll-of-the-hero-of-cinder-city/flower",
        ]
    },
    {
        "name": "深層秘境の長夜", 
        "filename": "finale-deep-galleries-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/f/f5/Item_The_Exile%27s_Finale.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_The_Exile%27s_Finale.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15537.png",
            "https://api.genshin.dev/artifacts/finale-of-the-deep/flower",
        ]
    },
    {
        "name": "永夜の誓約", 
        "filename": "long-night-oath-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/a/a0/Item_Nighttime_Whispers_in_the_Echoing_Woods.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Nighttime_Whispers_in_the_Echoing_Woods.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n15538.png",
            "https://api.genshin.dev/artifacts/nighttime-whispers/flower",
        ]
    },
    
    # 4星聖遺物セット
    {
        "name": "狂戦士", 
        "filename": "berserker-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/c3/Item_Berserker.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Berserker.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14401.png",
            "https://api.genshin.dev/artifacts/berserker/flower",
        ]
    },
    {
        "name": "勇者の心", 
        "filename": "brave-heart-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/2/2c/Item_Brave_Heart.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Brave_Heart.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14402.png",
            "https://api.genshin.dev/artifacts/brave-heart/flower",
        ]
    },
    {
        "name": "守護の心", 
        "filename": "defender-will-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/e/e9/Item_Defender%27s_Will.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Defender%27s_Will.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14403.png",
            "https://api.genshin.dev/artifacts/defenders-will/flower",
        ]
    },
    {
        "name": "博徒", 
        "filename": "gambler-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/8/84/Item_Gambler.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Gambler.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14404.png",
            "https://api.genshin.dev/artifacts/gambler/flower",
        ]
    },
    {
        "name": "教官", 
        "filename": "instructor-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/3/3c/Item_Instructor.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Instructor.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14405.png",
            "https://api.genshin.dev/artifacts/instructor/flower",
        ]
    },
    {
        "name": "武人", 
        "filename": "martial-artist-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/b/bb/Item_Martial_Artist.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Martial_Artist.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14406.png",
            "https://api.genshin.dev/artifacts/martial-artist/flower",
        ]
    },
    {
        "name": "流浪する大地", 
        "filename": "resolution-sojourner-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Resolution_of_Sojourner.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Resolution_of_Sojourner.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14407.png",
            "https://api.genshin.dev/artifacts/resolution-of-sojourner/flower",
        ]
    },
    {
        "name": "学者", 
        "filename": "scholar-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/7/7f/Item_Scholar.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Scholar.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14408.png",
            "https://api.genshin.dev/artifacts/scholar/flower",
        ]
    },
    {
        "name": "亡命者", 
        "filename": "exile-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/c/cc/Item_The_Exile.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_The_Exile.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14409.png",
            "https://api.genshin.dev/artifacts/the-exile/flower",
        ]
    },
    {
        "name": "小さな奇跡", 
        "filename": "tiny-miracle-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Item_Tiny_Miracle.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Tiny_Miracle.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n14410.png",
            "https://api.genshin.dev/artifacts/tiny-miracle/flower",
        ]
    },
    
    # 3星聖遺物セット
    {
        "name": "冒険者", 
        "filename": "adventurer-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/7/7c/Item_Adventurer.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Adventurer.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n13301.png",
            "https://api.genshin.dev/artifacts/adventurer/flower",
        ]
    },
    {
        "name": "幸運", 
        "filename": "lucky-dog-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/6/6e/Item_Lucky_Dog.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Lucky_Dog.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n13302.png",
            "https://api.genshin.dev/artifacts/lucky-dog/flower",
        ]
    },
    {
        "name": "旅医", 
        "filename": "traveling-doctor-icon.png",
        "urls": [
            "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Item_Traveling_Doctor.png",
            "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_Traveling_Doctor.png",
            "https://genshin.honeyhunterworld.com/img/artifacts/i_n13303.png",
            "https://api.genshin.dev/artifacts/traveling-doctor/flower",
        ]
    },
]

def download_artifact_icon(artifact, save_path):
    """聖遺物アイコンをダウンロードする関数"""
    
    for url in artifact["urls"]:
        try:
            print(f"  試行中: {url}")
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                # Content-Typeをチェック
                content_type = response.headers.get('content-type', '')
                if 'image' in content_type:
                    with open(save_path, 'wb') as f:
                        f.write(response.content)
                    print(f"  ✓ 成功: {artifact['name']} -> {save_path.name}")
                    return True
                else:
                    print(f"  ✗ 画像ではない: {content_type}")
            else:
                print(f"  ✗ HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ✗ エラー: {e}")
        
        # リクエスト間隔
        time.sleep(0.5)
    
    print(f"  ✗ 失敗: {artifact['name']} - すべてのURLで取得失敗")
    return False

def main():
    print("Genshin Impact 聖遺物アイコン ダウンローダー（全51セット）")
    print("=" * 60)
    
    # 出力ディレクトリの作成
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"保存先: {output_dir.absolute()}")
    print()
    
    success_count = 0
    total_count = len(artifact_icons)
    
    for i, artifact in enumerate(artifact_icons, 1):
        print(f"[{i}/{total_count}] {artifact['name']}")
        
        # ファイル名の生成
        save_path = output_dir / artifact["filename"]
        
        # 既存ファイルのスキップ
        if save_path.exists():
            print(f"  スキップ: 既に存在 -> {artifact['filename']}")
            success_count += 1
            continue
        
        # ダウンロード実行
        if download_artifact_icon(artifact, save_path):
            success_count += 1
        
        print()
        
        # 進捗表示
        if i % 10 == 0:
            print(f"進捗: {i}/{total_count} ({i/total_count*100:.1f}%) - 成功: {success_count}")
            print("-" * 40)
    
    # 結果の表示
    print("=" * 60)
    print(f"完了: {success_count}/{total_count} ({success_count/total_count*100:.1f}%)")
    
    if success_count < total_count:
        print(f"失敗: {total_count - success_count} 個のアイコンが取得できませんでした")
        print("\n失敗したアイコンは手動で追加することをお勧めします。")
    else:
        print("すべての聖遺物アイコンが正常にダウンロードされました！")

if __name__ == "__main__":
    main() 
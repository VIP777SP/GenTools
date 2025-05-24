import requests
import os
from pathlib import Path
import time

# 武器名と英語略称のマッピング
weapons_data = {
    # 5星武器 - 剣
    "Mistsplitter Reforged": "mistsplitter-icon",
    "Primordial Jade Cutter": "jade-cutter-icon",
    "Aquila Favonia": "aquila-favonia-icon",
    "Summit Shaper": "summit-shaper-icon",
    "Skyward Blade": "skyward-blade-icon",
    "Freedom-Sworn": "freedom-sworn-icon",
    "Haran Geppaku Futsu": "haran-geppaku-icon",
    
    # 5星武器 - 大剣
    "Wolf's Gravestone": "wolfs-gravestone-icon",
    "Skyward Pride": "skyward-pride-icon",
    "The Unforged": "unforged-icon",
    "Song of Broken Pines": "broken-pines-icon",
    "Redhorn Stonethresher": "redhorn-icon",
    
    # 5星武器 - 長柄武器
    "Staff of Homa": "staff-homa-icon",
    "Primordial Jade Winged-Spear": "jade-spear-icon",
    "Skyward Spine": "skyward-spine-icon",
    "Vortex Vanquisher": "vortex-vanquisher-icon",
    "Calamity Queller": "calamity-queller-icon",
    "Engulfing Lightning": "engulfing-lightning-icon",
    
    # 5星武器 - 弓
    "Amos' Bow": "amos-bow-icon",
    "Skyward Harp": "skyward-harp-icon",
    "Elegy for the End": "elegy-end-icon",
    "Thundering Pulse": "thundering-pulse-icon",
    "Polar Star": "polar-star-icon",
    "Aqua Simulacra": "aqua-simulacra-icon",
    
    # 5星武器 - 法器
    "Skyward Atlas": "skyward-atlas-icon",
    "Lost Prayer to the Sacred Winds": "lost-prayer-icon",
    "Memory of Dust": "memory-dust-icon",
    "Everlasting Moonglow": "everlasting-moonglow-icon",
    "Kagura's Verity": "kagura-verity-icon",
    
    # 4星武器 - 剣
    "The Flute": "flute-icon",
    "Sacrificial Sword": "sacrificial-sword-icon",
    "The Black Sword": "black-sword-icon",
    "Prototype Rancour": "prototype-rancour-icon",
    "Iron Sting": "iron-sting-icon",
    "Favonius Sword": "favonius-sword-icon",
    "Lion's Roar": "lions-roar-icon",
    "Festering Desire": "festering-desire-icon",
    "Amenoma Kageuchi": "amenoma-kageuchi-icon",
    "Cinnabar Spindle": "cinnabar-spindle-icon",
    
    # 4星武器 - 大剣
    "Sacrificial Greatsword": "sacrificial-greatsword-icon",
    "The Bell": "bell-icon",
    "Favonius Greatsword": "favonius-greatsword-icon",
    "Prototype Archaic": "prototype-archaic-icon",
    "Whiteblind": "whiteblind-icon",
    "Rainslasher": "rainslasher-icon",
    "Serpent Spine": "serpent-spine-icon",
    "Snow-Tombed Starsilver": "snow-tombed-icon",
    "Luxurious Sea-Lord": "sea-lord-icon",
    "Katsuragikiri Nagamasa": "katsuragikiri-icon",
    
    # 4星武器 - 長柄武器
    "Dragon's Bane": "dragons-bane-icon",
    "Favonius Lance": "favonius-lance-icon",
    "Prototype Starglitter": "prototype-starglitter-icon",
    "Crescent Pike": "crescent-pike-icon",
    "Deathmatch": "deathmatch-icon",
    "Blackcliff Pole": "blackcliff-pole-icon",
    "The Catch": "catch-icon",
    "Dragonspine Spear": "dragonspine-spear-icon",
    "Kitain Cross Spear": "kitain-cross-icon",
    
    # 4星武器 - 弓
    "Rust": "rust-icon",
    "Sacrificial Bow": "sacrificial-bow-icon",
    "The Stringless": "stringless-icon",
    "Favonius Warbow": "favonius-warbow-icon",
    "Prototype Crescent": "prototype-crescent-icon",
    "Compound Bow": "compound-bow-icon",
    "The Viridescent Hunt": "viridescent-hunt-icon",
    "Alley Hunter": "alley-hunter-icon",
    "Windblume Ode": "windblume-ode-icon",
    "Hamayumi": "hamayumi-icon",
    "Mitternachts Waltz": "mitternachts-waltz-icon",
    
    # 4星武器 - 法器
    "Sacrificial Fragments": "sacrificial-fragments-icon",
    "The Widsith": "widsith-icon",
    "Favonius Codex": "favonius-codex-icon",
    "Eye of Perception": "eye-perception-icon",
    "Prototype Amber": "prototype-amber-icon",
    "Mappa Mare": "mappa-mare-icon",
    "Solar Pearl": "solar-pearl-icon",
    "Frostbearer": "frostbearer-icon",
    "Dodoco Tales": "dodoco-tales-icon",
    "Hakushin Ring": "hakushin-ring-icon",
    "Oathsworn Eye": "oathsworn-eye-icon",
    
    # 3星武器
    "Cool Steel": "cool-steel-icon",
    "Harbinger of Dawn": "harbinger-dawn-icon",
    "Skyrider Sword": "skyrider-sword-icon",
    "Fillet Blade": "fillet-blade-icon",
    "Traveler's Handy Sword": "travelers-sword-icon",
    "Dark Iron Sword": "dark-iron-sword-icon",
    
    "Debate Club": "debate-club-icon",
    "Bloodtainted Greatsword": "bloodtainted-greatsword-icon",
    "Ferrous Shadow": "ferrous-shadow-icon",
    "Skyrider Greatsword": "skyrider-greatsword-icon",
    "White Iron Greatsword": "white-iron-greatsword-icon",
    
    "White Tassel": "white-tassel-icon",
    "Halberd": "halberd-icon",
    "Black Tassel": "black-tassel-icon",
    
    "Slingshot": "slingshot-icon",
    "Sharpshooter's Oath": "sharpshooters-oath-icon",
    "Raven Bow": "raven-bow-icon",
    "Recurve Bow": "recurve-bow-icon",
    "Messenger": "messenger-icon",
    
    "Twin Nephrite": "twin-nephrite-icon",
    "Magic Guide": "magic-guide-icon",
    "Thrilling Tales of Dragon Slayers": "thrilling-tales-icon",
    "Otherworldly Story": "otherworldly-story-icon",
    "Emerald Orb": "emerald-orb-icon",
}

def download_weapon_icon_from_wiki(weapon_name, filename):
    """原神WikiまたはAsset配布サイトから武器アイコンをダウンロード"""
    
    # 複数のソースURLを試行
    base_urls = [
        f"https://static.wikia.nocookie.net/gensin-impact/images/",
        f"https://genshin-impact.fandom.com/wiki/Special:FilePath/Weapon_{weapon_name.replace(' ', '_')}.png",
        f"https://gi.yatta.moe/assets/UI/weapon/{filename.replace('-icon', '')}.png",
    ]
    
    for base_url in base_urls:
        try:
            print(f"Trying to download from: {base_url}")
            response = requests.get(base_url, timeout=10)
            if response.status_code == 200 and len(response.content) > 1000:  # 最小サイズチェック
                return response.content
        except Exception as e:
            print(f"Failed to download from {base_url}: {e}")
            continue
    
    return None

def download_weapon_icon_generic(weapon_name):
    """汎用的な方法で武器アイコンを検索・ダウンロード"""
    # Google検索風のクエリで画像を探す
    search_terms = [
        f"genshin impact {weapon_name} icon png",
        f"原神 {weapon_name} アイコン",
        f"{weapon_name} weapon icon genshin"
    ]
    
    # よく使われる画像ホスティングサイト
    image_sites = [
        "https://static.wikia.nocookie.net/gensin-impact/images/",
        "https://gi.yatta.moe/assets/UI/",
        "https://genshin.honeyhunterworld.com/img/",
        "https://upload-os-bbs.mihoyo.com/",
    ]
    
    for site in image_sites:
        try:
            # サイト特有のファイル名パターンを試行
            filename_patterns = [
                f"{weapon_name.lower().replace(' ', '_').replace("'", '')}.png",
                f"weapon_{weapon_name.lower().replace(' ', '_')}.png",
                f"{weapon_name.replace(' ', '').replace("'", '')}.png",
            ]
            
            for pattern in filename_patterns:
                url = site + pattern
                response = requests.get(url, timeout=5)
                if response.status_code == 200 and len(response.content) > 1000:
                    return response.content
        except:
            continue
    
    return None

def create_placeholder_icon(weapon_name, filename):
    """プレースホルダーアイコンを作成（SVGまたはテキスト）"""
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="#e0e0e0" stroke="#ccc" stroke-width="1"/>
  <text x="32" y="32" font-family="Arial" font-size="8" text-anchor="middle" 
        dominant-baseline="middle" fill="#666">{weapon_name[:10]}</text>
</svg>'''
    return svg_content.encode('utf-8')

def main():
    # 保存先ディレクトリを作成
    output_dir = Path("C:/genshin-tools/genshin-tools/public/images/weapons")
    output_dir.mkdir(exist_ok=True)
    
    print(f"武器アイコンを {output_dir} にダウンロードします...")
    print(f"総武器数: {len(weapons_data)}")
    
    success_count = 0
    failed_weapons = []
    
    for weapon_name, filename in weapons_data.items():
        print(f"\n処理中: {weapon_name} -> {filename}.png")
        
        # ファイルが既に存在する場合はスキップ
        output_path = output_dir / f"{filename}.png"
        if output_path.exists():
            print(f"  既に存在: {filename}.png")
            success_count += 1
            continue
        
        # 武器アイコンをダウンロード
        image_data = download_weapon_icon_from_wiki(weapon_name, filename)
        
        if not image_data:
            image_data = download_weapon_icon_generic(weapon_name)
        
        if image_data:
            # ファイルに保存
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"  ✓ 成功: {filename}.png")
            success_count += 1
        else:
            # プレースホルダーを作成
            placeholder_data = create_placeholder_icon(weapon_name, filename)
            placeholder_path = output_dir / f"{filename}.svg"
            with open(placeholder_path, 'wb') as f:
                f.write(placeholder_data)
            print(f"  ⚠ プレースホルダー作成: {filename}.svg")
            failed_weapons.append(weapon_name)
        
        # レート制限を避けるため少し待機
        time.sleep(0.5)
    
    print(f"\n=== 完了 ===")
    print(f"成功: {success_count}/{len(weapons_data)}")
    print(f"失敗: {len(failed_weapons)}")
    
    if failed_weapons:
        print(f"\n失敗した武器:")
        for weapon in failed_weapons[:10]:  # 最初の10個のみ表示
            print(f"  - {weapon}")
        if len(failed_weapons) > 10:
            print(f"  ... and {len(failed_weapons) - 10} more")

if __name__ == "__main__":
    main() 
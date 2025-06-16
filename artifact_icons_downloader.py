import requests
from pathlib import Path
import time

# ダウンロード先フォルダの設定
output_dir = Path("genshin-tools/public/images/artifacts")

# ダウンロード用のヘッダー
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# 聖遺物セットのデータ（名前と英語略称のマッピング）
artifact_sets = [
    # 5星聖遺物セット
    {"name": "剣闘士のフィナーレ", "icon": "gladiator-finale"},
    {"name": "大地を流浪する楽団", "icon": "wanderer-troupe"},
    {"name": "翠緑の影", "icon": "viridescent-venerer"},
    {"name": "悠久の磐岩", "icon": "archaic-petra"},
    {"name": "逆飛びの流星", "icon": "retracing-bolide"},
    {"name": "烈火を渡る賢者", "icon": "lavawalker"},
    {"name": "炎の魔女", "icon": "crimson-witch"},
    {"name": "雷のような怒り", "icon": "thundering-fury"},
    {"name": "雷を鎮める尊者", "icon": "thundersoother"},
    {"name": "氷風を彷徨う勇士", "icon": "blizzard-strayer"},
    {"name": "沈淪の心", "icon": "heart-depth"},
    {"name": "血染めの騎士道", "icon": "bloodstained-chivalry"},
    {"name": "旧貴族のしつけ", "icon": "noblesse-oblige"},
    {"name": "愛される少女", "icon": "maiden-beloved"},
    {"name": "千岩牢固", "icon": "tenacity-millelith"},
    {"name": "蒼白の炎", "icon": "pale-flame"},
    {"name": "追憶のしめ縄", "icon": "shimenawa-reminiscence"},
    {"name": "絶縁の旗印", "icon": "emblem-severed-fate"},
    {"name": "華館夢醒形骸記", "icon": "husk-opulent-dreams"},
    {"name": "海染硨磲", "icon": "ocean-hued-clam"},
    {"name": "辰砂往生録", "icon": "vermillion-hereafter"},
    {"name": "来歆の余響", "icon": "echoes-offering"},
    {"name": "深林の記憶", "icon": "deepwood-memories"},
    {"name": "金メッキの夢", "icon": "gilded-dreams"},
    {"name": "砂上の楼閣の史話", "icon": "desert-pavilion"},
    {"name": "楽園の絶花", "icon": "flower-paradise-lost"},
    {"name": "水仙の夢", "icon": "nymph-dream"},
    {"name": "花海甘露の光", "icon": "vourukasha-glow"},
    {"name": "黄金の劇団", "icon": "golden-troupe"},
    {"name": "マレショーセーハンター", "icon": "marechaussee-hunter"},
    {"name": "昔日の宗室の儀", "icon": "nighttime-whispers"},
    {"name": "過ぎ去りし日の歌", "icon": "song-days-past"},
    {"name": "調和の奇想", "icon": "fragment-harmonic-whimsy"},
    {"name": "未完の幻想", "icon": "unfinished-reverie"},
    {"name": "黒曜の記録", "icon": "obsidian-codex"},
    {"name": "燼城の勇者の書", "icon": "scroll-hero-cinder"},
    {"name": "深層秘境の長夜", "icon": "finale-deep-galleries"},
    {"name": "永夜の誓約", "icon": "long-night-oath"},
    
    # 4星聖遺物セット
    {"name": "狂戦士", "icon": "berserker"},
    {"name": "勇者の心", "icon": "brave-heart"},
    {"name": "守護の心", "icon": "defender-will"},
    {"name": "博徒", "icon": "gambler"},
    {"name": "教官", "icon": "instructor"},
    {"name": "武人", "icon": "martial-artist"},
    {"name": "流浪する大地", "icon": "resolution-sojourner"},
    {"name": "学者", "icon": "scholar"},
    {"name": "亡命者", "icon": "exile"},
    {"name": "小さな奇跡", "icon": "tiny-miracle"},
    
    # 3星以下聖遺物セット
    {"name": "冒険者", "icon": "adventurer"},
    {"name": "幸運", "icon": "lucky-dog"},
    {"name": "旅医", "icon": "traveling-doctor"},
]

def download_artifact_icon(artifact_set, save_path):
    """聖遺物アイコンをダウンロードする関数"""
    
    # 複数のソースURLを試行
    urls = [
        f"https://static.wikia.nocookie.net/gensin-impact/images/{artifact_set['icon']}.png",
        f"https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Item_{artifact_set['icon']}.png",
        f"https://genshin.gg/static/artifacts/{artifact_set['icon']}.png",
        f"https://genshindb.org/images/artifacts/{artifact_set['icon']}.png",
        f"https://api.genshin.dev/artifacts/{artifact_set['icon']}/icon",
        f"https://enka.network/ui/UI_RelicIcon_{artifact_set['icon']}.png",
        f"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/{artifact_set['icon']}.png",
    ]
    
    for url in urls:
        try:
            print(f"  試行中: {url}")
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                # Content-Typeをチェック
                content_type = response.headers.get('content-type', '')
                if 'image' in content_type:
                    with open(save_path, 'wb') as f:
                        f.write(response.content)
                    print(f"  ✓ 成功: {artifact_set['name']} -> {save_path.name}")
                    return True
                else:
                    print(f"  ✗ 画像ではない: {content_type}")
            else:
                print(f"  ✗ HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ✗ エラー: {e}")
        
        # リクエスト間隔
        time.sleep(0.5)
    
    print(f"  ✗ 失敗: {artifact_set['name']} - すべてのURLで取得失敗")
    return False

def main():
    print("Genshin Impact 聖遺物アイコン ダウンローダー")
    print("=" * 50)
    
    # 出力ディレクトリの作成
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"保存先: {output_dir.absolute()}")
    print()
    
    success_count = 0
    total_count = len(artifact_sets)
    
    for i, artifact_set in enumerate(artifact_sets, 1):
        print(f"[{i}/{total_count}] {artifact_set['name']}")
        
        # ファイル名の生成
        filename = f"{artifact_set['icon']}-icon.png"
        save_path = output_dir / filename
        
        # 既存ファイルのスキップ
        if save_path.exists():
            print(f"  スキップ: 既に存在 -> {filename}")
            success_count += 1
            continue
        
        # ダウンロード実行
        if download_artifact_icon(artifact_set, save_path):
            success_count += 1
        
        print()
    
    # 結果の表示
    print("=" * 50)
    print(f"完了: {success_count}/{total_count} ({success_count/total_count*100:.1f}%)")
    
    if success_count < total_count:
        print(f"失敗: {total_count - success_count} 個のアイコンが取得できませんでした")
    else:
        print("すべての聖遺物アイコンが正常にダウンロードされました！")

if __name__ == "__main__":
    main() 
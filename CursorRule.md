# Genshin Tools 開発メモ

## 概要
Genshin Impact ティアメーカーアプリケーション
- Next.js, TypeScript, Tailwind CSS, @dnd-kit使用
- キャラクター、武器、聖遺物のティアランキング機能

## 進捗ログ

### 2024/12/19 - ビルド設定機能実装
- **キャラクタービルド表示機能を完全実装**
  - 型定義追加: CharacterBuild (凸数、武器、聖遺物)
  - BuildConfigModal作成: モーダルでビルド設定
    - 凸数選択 (C0-C6)
    - 武器選択 (キャラクター武器タイプでフィルター、検索機能)
    - 聖遺物選択 (検索機能)
  - DraggableCharacter拡張:
    - 左上にビルド情報アイコン表示 (凸数、武器、聖遺物)
    - 右上にビルド設定ボタン (⚙)
  - TierMakerClient拡張:
    - characterBuilds状態管理
    - "ビルドを定義"ボタン追加
    - ビルド設定モーダル管理
  - 全コンポーネントでビルド情報伝達:
    - TierRow → DroppableArea → DraggableCharacter
    - CharacterSelection → DraggableCharacter

### 2024/12/19 - UI調整
- ティア表示を5列から4列に変更 (DroppableArea.tsx)

### 2024/12/19 - 武器アセット管理
- 武器アイコン自動ダウンロードスクリプト作成 (weapon_icons_downloader.py)
- 104個の武器アイコンを100%成功率でダウンロード
- weaponlist.ts作成 (TypeScript型定義、英語武器タイプ)
- charlist.tsに武器タイプ追加 (97キャラクター対応)

### 2024/12/19 - 聖遺物アセット管理
- artifacts.ts作成 - 聖遺物データ型定義
  - 51個の聖遺物セット (5星:38, 4星:10, 3星:3)
  - TypeScript型安全性: rarity: 3|4|5
- 自動ダウンロードスクリプトは失敗 (URLパターン相違)
- 手動ダウンロードスクリプト作成・拡張 (artifact_manual_downloader.py)
- **50/51個の聖遺物アイコン成功ダウンロード (98.0%)**
  - 成功: Genshin Impact Wiki redirect URLパターンが有効
  - 失敗: 深層秘境の長夜 (1個のみ)
  - 全カテゴリ網羅: 5星37個、4星10個、3星3個

## フォルダ構造
```
genshin-tools/
├── src/libs/
│   ├── charlist.ts (97キャラクター + weaponType)
│   ├── weaponlist.ts (104武器)
│   └── artifacts.ts (51聖遺物)
├── public/images/
│   ├── characters/ (既存)
│   ├── weapons/ (104ファイル)
│   └── artifacts/ (50ファイル - ほぼ完成)
└── src/app/gs-tools/tiermaker/
    ├── types.ts (CharacterBuild追加)
    └── components/
        ├── BuildConfigModal.tsx (新規)
        ├── DraggableCharacter.tsx (ビルド表示拡張)
        ├── TierMakerClient.tsx (ビルド管理追加)
        ├── TierRow.tsx (ビルド情報伝達)
        ├── DroppableArea.tsx (ビルド情報伝達)
        └── CharacterSelection.tsx (ビルド情報伝達)
```

## 機能一覧（完成）
- [x] ドラッグ&ドロップでキャラクター配置
- [x] ティア行の追加・削除・カスタマイズ (色、ラベル)
- [x] **ビルド設定機能**
  - [x] 凸数設定 (C0-C6)
  - [x] 武器選択 (武器タイプフィルター)
  - [x] 聖遺物選択
  - [x] キャラクター左上にビルド情報表示
  - [x] ビルド設定ボタン
- [x] キャラクター選択エリア（スワイプ対応）
- [x] リセット機能

## 今後のタスク
1. [ ] 残り1個の聖遺物アイコン手動追加
2. [ ] エクスポート/インポート機能
3. [ ] 複数カテゴリ対応 (キャラ/武器/聖遺物切り替え)
4. [ ] PWA対応
5. [ ] ダークモード

## 技術メモ
- weapon/charのURLパターンは安定
- 聖遺物はGenshin Wiki Special:Redirect URLが最適
- 複数フォールバックURL戦略が有効 (98%成功率達成)
- TypeScript Union型で型安全性確保
- **ビルド情報の状態管理**: characterBuilds Record<number, CharacterBuild>
- **コンポーネント間データ流**: Props drilling パターンで全コンポーネントに伝達
- **UI/UX設計**: 左上ビルド情報、右上設定ボタンで直感的配置
- 聖遺物アイコンサイズ: 26KB～85KB (平均約55KB)

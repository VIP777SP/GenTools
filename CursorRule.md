# Genshin Tools 開発メモ

## 概要
Genshin Impact ティアメーカーアプリケーション
- Next.js, TypeScript, Tailwind CSS, @dnd-kit使用
- キャラクター、武器、聖遺物のティアランキング機能

## 進捗ログ

### 2024/12/19 - OKLCH色問題完全解決
- **根本的解決策: カスタムCSS + 代替保存方法**
  - globals.css に RGB色強制クラス追加:
    - .tier-capture-area クラスで全Tailwind色をRGB化
    - !important で OKLCH色を上書き
    - 画像キャプチャ時のみ一時的に適用/削除
  - TierMakerClient.tsx 画像保存改善:
    - シンプルなhtml2canvas設定（scale: 1, 基本オプションのみ）
    - RGB色強制クラスの一時適用
    - 画面キャプチャAPI併用（getDisplayMedia）
    - 詳細エラーメッセージと代替手段提示
  - **多層フォールバック戦略**:
    1. 画面キャプチャAPI（最も確実）
    2. RGB強制html2canvas
    3. 手動スクリーンショット指示
    4. DevToolsスクリーンショット指示
  - **UX向上**: ユーザーが保存方法を選択可能

### 2024/12/19 - キャラクター選択リストをドロップエリア化
- **UX最適化: 固定エリアから選択リスト直接ドロップに変更**
  - CharacterSelection.tsx をdroppableエリア化:
    - useDroppable (id: 'character-selection') 追加
    - ドラッグオーバー時の視覚フィードバック (青系ハイライト)
    - ドロップ時のヒントメッセージ表示
  - TierMakerClient.tsx 処理変更:
    - 固定ReturnArea削除
    - character-selection へのドロップ検出
    - より自然なドラッグ&ドロップフロー
  - TrashArea.tsx 削除:
    - 固定エリア不要になったため完全削除
    - 画面右下のスペース解放
  - **操作性向上**: キャラクターを元の場所（選択リスト）に直接戻す直感的操作

### 2024/12/19 - 選択リストに戻すエリア実装
- **UX改善: 削除からリストに戻すに変更**
  - TrashArea.tsx → ReturnArea.tsx に変更:
    - アイコン: IoTrashOutline → IoArrowBackOutline
    - 色: 赤系 → 青系 (削除の危険性から安全な操作に)
    - ID: 'trash-area' → 'return-area'
    - ツールチップ: 「削除する」→「リストに戻す」
  - TierMakerClient.tsx ロジック変更:
    - handleDeleteFromTrash → handleReturnToSelection
    - オリジナルキャラクター: ティアから削除のみ（自動的に選択リストに戻る）
    - コピーキャラクター: ビルド設定も削除して完全削除
    - より直感的なUX: 不要なキャラクターは選択リストに戻せる

### 2024/12/19 - ゴミ箱エリア実装
- **スマホ対応の削除機能実装** (ホバー削除からドラッグ削除に変更)
  - TrashArea.tsx 新規作成:
    - 画面右下固定のゴミ箱アイコン
    - @dnd-kit droppable エリア (id: 'trash-area')
    - ドラッグオーバー時のアニメーション・ツールチップ
    - IoTrashOutline アイコン使用
  - TierMakerClient.tsx 拡張:
    - ゴミ箱ドロップ検出ロジック追加
    - handleDeleteFromTrash 実装
    - オリジナル/コピーキャラクターの判別削除
  - DraggableCharacter.tsx 削除ボタン除去:
    - ホバー削除ボタン完全削除
    - シンプルなキャラクター表示に戻す
    - スマホのタッチ操作に最適化
  - DroppableArea.tsx, TierRow.tsx:
    - remove 関連 props とロジック削除
    - コピー機能のみ維持

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

### 2024/12/19 - 画像保存機能実装
- **「ビルドを定義」ボタンを「画像として保存」ボタンに変更**
  - handleOpenBuildDefine 関数削除
  - handleSaveAsImage 関数新規実装
  - html2canvas ライブラリ導入:
    - npm install html2canvas @types/html2canvas
    - tier表を高解像度画像として保存
    - ファイル名: genshin-tier-list-YYYY-MM-DD.png
  - TierMakerClient.tsx 実装:
    - id="tier-list-area" でキャプチャ対象指定
    - scale: 1.5 で高解像度出力
    - useCORS: true で画像読み込み対応
    - foreignObjectRendering: false でOKLCH色問題回避
    - onclone でスタイル強制適用
    - フォールバック機能付き（基本設定で再試行）
  - **OKLCH色問題対応**: Tailwind CSS v3.1+のOKLCH色空間をhtml2canvasが処理できない問題を修正
  - **UX改善**: ビルド設定よりも実用性の高い画像保存機能を優先

### 2024/12/19 - 凸数表示機能改善
- **凸数表示の明確化: 「非表示」と「0凸」の分離**
  - types.ts 型定義拡張:
    - constellation?: number (-1: 非表示, 0: C0, 1-6: C1-C6, undefined: 未設定)
  - BuildConfigModal.tsx 選択肢追加:
    - 「×」ボタン追加（-1値、赤色ボーダー）
    - デフォルト値を-1（非表示）に変更
    - C0-C6の明確な選択肢
  - DraggableCharacter.tsx 表示ロジック改善:
    - getConstellationText(): undefined→null, -1→'×', 0→'C0', 1-6→'C1'-'C6'
    - shouldShowConstellation(): undefined時のみ非表示
    - 「×」表示時は赤色背景（bg-red-500）で視覚的区別
  - **UX向上**: 「凸数を表示したくない」と「0凸キャラクター」が明確に区別可能

### 2024/12/19 - 超かっこいいボタンデザイン実装 🔥
- **UI革命: モダンで洗練されたボタンデザイン**
  - TierMakerClient.tsx ボタンスタイル大改革:
    - **グラデーション背景**: 3色グラデーション（emerald-green-teal, red-pink-rose, blue-indigo-purple）
    - **3Dエフェクト**: shadow-2xl、hover:scale-105、active:scale-95
    - **グローエフェクト**: hover:shadow-{color}-500/50
    - **アニメーション**: アイコン回転・拡大（rotate-90, rotate-180, scale-110）
    - **オーバーレイ**: 白いグラデーションオーバーレイ（hover時に表示）
    - **ボーダー**: 半透明ボーダー（border-{color}-400/30）
  - アイコン追加（react-icons/io5）:
    - IoAdd: Tier追加ボタン（hover時90度回転）
    - IoRefresh: リセットボタン（hover時180度回転）  
    - IoCamera: 画像保存ボタン（hover時拡大）
  - タイトルデザイン向上:
    - グラデーション文字: blue-purple-indigo
    - text-4xl font-extrabold、drop-shadow-lg
  - 背景グラデーション: gray-blue-indigo（微細なグラデーション）
  - **UX向上**: 視覚的フィードバック強化、プレミアム感演出

### 2024/12/19 - レイアウト改善（ボディ領域拡張＋ヘッダー整理）
- **UX改善: ボディ領域拡張とヘッダーデザイン向上**
  - TierMakerClient.tsx レイアウト修正:
    - 下部マージン: pb-12 → pb-44（キャラ選択エリア+フッター分の十分な余白）
    - ヘッダーエリア構造化: タイトルとボタンを明確にグループ化
    - ボタンレスポンシブ対応: モバイルで縦並び、デスクトップで横並び
    - ボタンスタイル向上: px-6 py-3、font-semibold、shadow-md
    - タイトル下マージン: mb-6 → mb-4（バランス調整）
  - **UX向上**: 
    - キャラクター選択エリアに隠れない十分なスクロール領域確保
    - モバイルファーストなレスポンシブデザイン
    - 視覚的階層の明確化（ヘッダー → コンテンツ）

### 2024/12/19 - フッター小型化とレイアウト修正
- **UI改善: フッターサイズ縮小と重なり解消**
  - globals.css フッター高さ調整:
    - --spacing-footer: 4rem → 2.5rem（37.5%縮小）
  - footer.tsx コンポーネント小型化:
    - アイコンサイズ: text-4xl → text-lg（大幅縮小）
    - テキストサイズ: text-xs → text-[10px]（更に小型化）
    - パディング: px-6 → px-4（横幅削減）
    - 高さ固定: h-[2.5rem]、z-index: 40
  - CharacterSelection.tsx レイアウト調整:
    - 位置: bottom-0 → bottom-[2.5rem]（フッター分上に配置）
    - z-index: 40 → 50（フッターより前面）
  - TierMakerClient.tsx パディング調整:
    - 下部パディング: pb-48 → pb-12（フッター小型化に合わせて削減）
  - **UX向上**: フッターとキャラクター選択エリアの重なり完全解消、視覚的すっきり

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

## 最新の開発状況 (2024-11-XX)

### 完了済み機能

#### ボタンレイアウト最適化 (2024-12-XX)
- **問題**: 3つのボタンが横並びで幅を取りすぎている
- **解決策**: 2+1レイアウトに変更
  - 左側: 編集機能（Tier追加 + リセット）をグループ化
  - 右側: 保存機能を独立配置
  - 全体をコンパクト化（px-5→px-4, py-3→py-2.5, rounded-xl→rounded-lg）
  - アイコンサイズ縮小（18px→16px）
  - マージン調整（mr-2→mr-1.5）
- **メリット**: 
  - 機能的な関連性による整理
  - よりコンパクトなレイアウト
  - 視覚的なバランスの向上

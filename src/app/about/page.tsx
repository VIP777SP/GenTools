export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">このサイトについて</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Genshin Tools</h2>
          <p className="text-gray-700 mb-4">
            原神プレイヤーのための便利ツール集です。
          </p>
          <p className="text-gray-700">
            キャラクター評価、ビルド計算、攻略情報など、原神をより楽しむためのツールを提供しています。
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-foreground mb-3">主な機能</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• キャラクター Tier メーカー</li>
            <li>• 攻略記事・ガイド</li>
            <li>• 便利なリンク集</li>
            <li>• その他のゲーム支援ツール</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

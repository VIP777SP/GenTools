export default function RecommendedCharacterCompositionsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">おすすめキャラクター構成</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">パーティ編成ガイド</h2>
          <p className="text-gray-700 mb-4">
            効率的なパーティ編成のための情報を提供します。
          </p>
          <p className="text-gray-700">
            各キャラクターの役割と相性を考慮した最適な構成を紹介しています。
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-3">コンテンツ準備中</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              このページは現在準備中です。近日中にキャラクター構成に関する詳細な情報を公開予定です。
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-foreground mb-3">予定コンテンツ</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 元素反応を活用したパーティ編成</li>
            <li>• 役割別キャラクター分析</li>
            <li>• シナジー効果の高い組み合わせ</li>
            <li>• コンテンツ別おすすめ構成</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

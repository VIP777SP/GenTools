export default function RecommendedWeaponsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">おすすめ武器</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">武器ガイド</h2>
          <p className="text-gray-700 mb-4">
            各キャラクターに最適な武器選択をサポートします。
          </p>
          <p className="text-gray-700">
            レアリティ別、役割別、性能別におすすめの武器を紹介しています。
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-3">コンテンツ準備中</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              このページは現在準備中です。近日中に武器に関する詳細な情報を公開予定です。
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-foreground mb-3">予定コンテンツ</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• キャラクター別おすすめ武器</li>
            <li>• 武器の基礎攻撃力とサブステータス比較</li>
            <li>• 無課金・微課金向けの武器選択</li>
            <li>• 武器精錬の優先度ガイド</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

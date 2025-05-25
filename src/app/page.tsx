import Link from 'next/link';
import { IoStarOutline, IoGameControllerOutline, IoNewspaperOutline, IoLinkOutline, IoArrowForwardOutline } from 'react-icons/io5';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* ヒーローセクション */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <IoStarOutline className="w-16 h-16 mx-auto text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Genshin Tools
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            原神プレイヤーのための<br className="md:hidden" />
            <span className="text-yellow-400 font-semibold">究極のツール集</span>
          </p>
          <Link 
            href="/gs-tools"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:scale-105 hover:shadow-emerald-500/50 active:scale-95 transition-all duration-300 border border-emerald-400/30"
          >
            <IoGameControllerOutline className="w-6 h-6" />
            ツールを使ってみる
            <IoArrowForwardOutline className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            あなたの原神ライフを<span className="text-yellow-400">サポート</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* ツール集 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <IoGameControllerOutline className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">便利ツール</h3>
                <p className="text-slate-300 mb-4">
                  Tierメーカー、ビルド最適化、ガチャ履歴分析など、プレイに役立つツールが満載
                </p>
                <Link 
                  href="/gs-tools"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                >
                  詳しく見る <IoArrowForwardOutline className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 攻略記事 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <IoNewspaperOutline className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">攻略記事</h3>
                <p className="text-slate-300 mb-4">
                  キャラクター考察、武器レビュー、聖遺物ガイドなど、役立つ情報をお届け
                </p>
                <Link 
                  href="/gs-articles"
                  className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                >
                  記事を読む <IoArrowForwardOutline className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* リンク集 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <IoLinkOutline className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">リンク集</h3>
                <p className="text-slate-300 mb-4">
                  公式サイト、攻略Wiki、便利なサイトへのリンクをまとめて管理
                </p>
                <Link 
                  href="/gs-links"
                  className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
                >
                  リンクを見る <IoArrowForwardOutline className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 統計セクション */}
      <section className="px-6 py-16 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">充実のコンテンツ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">97+</div>
              <div className="text-slate-300">キャラクター</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">104+</div>
              <div className="text-slate-300">武器</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">51+</div>
              <div className="text-slate-300">聖遺物</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">4+</div>
              <div className="text-slate-300">便利ツール</div>
            </div>
          </div>
        </div>
      </section>

      {/* フッターCTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            今すぐ始めよう
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            あなたの原神ライフをもっと楽しく、もっと効率的に
          </p>
          <Link 
            href="/gs-tools"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold text-xl rounded-xl shadow-2xl hover:scale-105 hover:shadow-yellow-500/50 active:scale-95 transition-all duration-300 border border-yellow-400/30"
          >
            <IoStarOutline className="w-6 h-6 animate-spin" />
            ツールを探索する
            <IoArrowForwardOutline className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}

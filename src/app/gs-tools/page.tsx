"use client";
import React from 'react';
import Link from 'next/link';
import { IoStarOutline, IoGameControllerOutline, IoTrendingUpOutline, IoSparklesOutline } from 'react-icons/io5';

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  iconColor: string;
  status: 'available' | 'coming-soon';
}

const tools: ToolCard[] = [
  {
    id: 'tiermaker',
    title: 'Tierメーカー',
    description: 'キャラクター・武器・聖遺物をランク付けしてティア表を作成できます',
    icon: <IoStarOutline />,
    href: '/gs-tools/tiermaker',
    gradient: 'from-blue-500 via-purple-500 to-indigo-600',
    iconColor: 'text-blue-500',
    status: 'available'
  },
  {
    id: 'build-optimizer',
    title: 'ビルド最適化',
    description: 'キャラクターの最適なビルドを計算・提案します',
    icon: <IoGameControllerOutline />,
    href: '/gs-tools/build-optimizer',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    iconColor: 'text-emerald-500',
    status: 'coming-soon'
  },
  {
    id: 'gacha-tracker',
    title: 'ガチャ履歴',
    description: '祈願の履歴を管理・分析して天井カウントを追跡できます',
    icon: <IoSparklesOutline />,
    href: '/gs-tools/gacha-tracker',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    iconColor: 'text-amber-500',
    status: 'coming-soon'
  },
  {
    id: 'damage-calculator',
    title: 'ダメージ計算機',
    description: 'キャラクターのダメージを詳細に計算・シミュレートします',
    icon: <IoTrendingUpOutline />,
    href: '/gs-tools/damage-calculator',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    iconColor: 'text-pink-500',
    status: 'coming-soon'
  }
];

export default function GSToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg mb-4">
            ツール集
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            原神プレイヤーのための便利ツールコレクション
          </p>
        </div>

        {/* ツールカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div key={tool.id} className="group">
              {tool.status === 'available' ? (
                <Link href={tool.href}>
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden h-full cursor-pointer">
                    <div className={`h-2 bg-gradient-to-r ${tool.gradient}`}></div>
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className={`text-4xl ${tool.iconColor} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          {tool.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">
                            {tool.title}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                            利用可能
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="mt-6">
                        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${tool.gradient} text-white rounded-lg font-semibold shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          ツールを開く
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full opacity-75">
                  <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="text-4xl text-gray-400 mr-4">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-1">
                          {tool.title}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">
                          開発予定
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-6">
                      <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed">
                        近日公開予定
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* フッターメッセージ */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              ツールの追加予定
            </h3>
            <p className="text-gray-600">
              より多くの便利ツールを順次追加していく予定です。<br />
              ご要望やフィードバックをお待ちしています！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
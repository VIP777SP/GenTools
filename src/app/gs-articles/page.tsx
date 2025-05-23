"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Article {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  publishedAt: string;
  categories: ("おすすめ" | "攻略" | "ネタ" | "ブログ")[];
  tags: string[];
}

const CATEGORIES = ['すべて', 'おすすめ', '攻略', 'ネタ', 'ブログ'] as const;
type Category = typeof CATEGORIES[number];

const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'osusume-buki-ranking',
    title: 'おすすめ武器ランキング',
    imageUrl: '/images/articles/weapon_ranking.jpg',
    publishedAt: '2023-10-26T10:00:00Z',
    categories: ['攻略', 'おすすめ'],
    tags: ['ランキング', '武器', '解説'],
  },
  {
    id: '2',
    slug: 'osusu-seibutsu-ranking',
    title: 'おすすめ聖遺物ランキング',
    imageUrl: '/images/articles/artifact_ranking.jpg',
    publishedAt: '2023-10-25T10:00:00Z',
    categories: ['攻略', 'おすすめ'],
    tags: ['ランキング', '聖遺物', '解説'],
  },
  {
    id: '3',
    slug: 'supporter-tsuyoi-dake',
    title: '『それ、サポーターが強いだけじゃん！』←これに反論したい',
    imageUrl: '/images/articles/supporter.jpg',
    publishedAt: '2023-10-24T10:00:00Z',
    categories: ['ブログ', 'ネタ'],
    tags: ['考察', 'あるある'],
  },
  {
    id: '4',
    slug: 'genshin-kidou-meme',
    title: '原神、起動とは？(ミーム解説）',
    imageUrl: '/images/articles/kidou_meme.jpg',
    publishedAt: '2023-10-23T10:00:00Z',
    categories: ['ネタ'],
    tags: ['ミーム解説'],
  },
  {
    id: '5',
    slug: 'watashi-no-kantotsu-character',
    title: '個人的に使ってみたい完凸キャラ',
    imageUrl: '/images/articles/kantotsu.jpg',
    publishedAt: '2023-10-22T10:00:00Z',
    categories: ['ブログ'],
    tags: ['感想'],
  },
];

// 投稿時間をフォーマットする関数
function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '/');
}

// タグの背景色を決定する関数
function getTagColor(tag: string): string {
  const tagColors: { [key: string]: string } = {
    'ランキング': 'bg-blue-100 text-blue-800',
    '武器': 'bg-red-100 text-red-800',
    '聖遺物': 'bg-purple-100 text-purple-800',
    '解説': 'bg-green-100 text-green-800',
    '考察': 'bg-yellow-100 text-yellow-800',
    'あるある': 'bg-pink-100 text-pink-800',
    'ミーム解説': 'bg-orange-100 text-orange-800',
    'ネットスラング': 'bg-indigo-100 text-indigo-800',
    'キャラクター': 'bg-cyan-100 text-cyan-800',
    '感想': 'bg-gray-100 text-gray-800',
  };
  return tagColors[tag] || 'bg-gray-100 text-gray-800';
}

// カテゴリナビゲーションコンポーネント
function CategoryNavigation({ 
  activeCategory, 
  onCategoryChange 
}: { 
  activeCategory: Category; 
  onCategoryChange: (category: Category) => void; 
}) {
  const navRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key in Category]?: HTMLButtonElement }>({});

  // 下線の位置とサイズを更新する関数
  const updateUnderline = () => {
    const activeButton = buttonRefs.current[activeCategory];
    const underline = underlineRef.current;
    
    if (activeButton && underline) {
      const { offsetLeft, offsetWidth } = activeButton;
      underline.style.left = `${offsetLeft}px`;
      underline.style.width = `${offsetWidth}px`;
    }
  };

  // アクティブカテゴリが変更されたときに下線を更新
  useEffect(() => {
    updateUnderline();
  }, [activeCategory]);

  // 初回レンダリング後に下線を初期化
  useEffect(() => {
    setTimeout(updateUnderline, 0);
  }, []);

  return (
    <div className="relative mb-6">
      <div ref={navRef} className="flex space-x-0 border-b border-gray-200 relative">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            ref={(el) => {
              if (el) buttonRefs.current[category] = el;
            }}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeCategory === category
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
        
        {/* スライドする下線 */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ left: 0, width: 0 }}
        />
      </div>
    </div>
  );
}

// 記事一覧項目コンポーネント
function ArticleListItem({ article }: { article: Article }) {
  return (
    <div className="flex items-start p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors h-[100px] overflow-hidden">
      {/* 左側の画像 */}
      <div className="w-16 h-16 flex-shrink-0 mr-3">
        <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden">
          {/* 実際の画像がない場合のプレースホルダー */}
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
            画像
          </div>
        </div>
      </div>
      
      {/* 右側のコンテンツ */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        {/* タイトル */}
        <h2 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-5">
          {article.title}
        </h2>
        
        {/* 投稿時間とタグを横並び */}
        <div className="flex items-center justify-between">
          {/* 投稿時間 */}
          <p className="text-sm text-gray-500">
            {formatPublishedDate(article.publishedAt)}
          </p>
          
          {/* タグ */}
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-0.5 text-xs rounded-full ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて');

  // カテゴリによる記事フィルタリング
  const filteredArticles = mockArticles.filter(article => {
    if (activeCategory === 'すべて') return true;
    return article.categories.includes(activeCategory as Exclude<Category, 'すべて'>);
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-foreground mb-6">記事一覧</h1>
      
      {/* カテゴリタブナビゲーション */}
      <CategoryNavigation 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* 記事一覧 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <ArticleListItem key={article.id} article={article} />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            このカテゴリには記事がありません
          </div>
        )}
      </div>
    </div>
  );
}

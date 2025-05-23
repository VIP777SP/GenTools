import React, { useRef, useState, useEffect } from 'react';
import { character } from '@/libs/charlist';
import { DraggableCharacter } from './DraggableCharacter';

// キャラクター選択エリアコンポーネント
export function CharacterSelection({ 
  availableCharacters
}: { 
  availableCharacters: character[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSwipping, setIsSwipping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // スワイプ開始
  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsSwipping(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  // スワイプ中
  const handleSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwipping || !scrollRef.current) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const walk = (startX - clientX) * 2; // スクロール速度調整
    scrollRef.current.scrollLeft = scrollLeft + walk;
  };

  // スワイプ終了
  const handleSwipeEnd = () => {
    setIsSwipping(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg z-40">
      {/* 上段：横スワイプ検知エリア */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div 
          className="p-2 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleSwipeStart}
          onMouseMove={handleSwipeMove}
          onMouseUp={handleSwipeEnd}
          onMouseLeave={handleSwipeEnd}
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
          onTouchEnd={handleSwipeEnd}
          style={{ touchAction: 'none' }}
        >
          <div className="h-8 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-xs text-gray-600">
              ← スワイプしてキャラクターを探す →
            </div>
          </div>
        </div>
      </div>

      {/* 下段：キャラクター横スクロールリスト */}
      <div className="p-3">
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-hidden pb-2"
          style={{
            scrollbarWidth: 'none',
            scrollBehavior: 'smooth',
            touchAction: 'none', // 下段でのスクロール操作を無効化
          }}
        >
          {availableCharacters.map((character) => (
            <div
              key={character.id}
              className="flex-shrink-0 relative group"
            >
              <DraggableCharacter character={character} fixedSize={true} />
            </div>
          ))}
          {availableCharacters.length === 0 && (
            <div className="text-gray-400 italic text-sm py-4 px-8 flex-shrink-0">
              すべてのキャラクターが配置されました
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
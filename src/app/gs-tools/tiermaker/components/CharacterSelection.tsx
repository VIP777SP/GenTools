import React, { useRef, useState, useEffect } from 'react';
import { character } from '@/libs/charlist';
import { DraggableCharacter } from './DraggableCharacter';

// キャラクター選択エリアコンポーネント
export function CharacterSelection({ 
  availableCharacters,
  isDragging
}: { 
  availableCharacters: character[];
  isDragging: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSwipping, setIsSwipping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef<number | null>(null);

  // 慣性スクロールアニメーション
  const animateInertia = (initialVelocity: number) => {
    let currentVelocity = initialVelocity;
    const friction = 0.95; // 減速係数（0.9-0.99の範囲で調整）
    const minVelocity = 0.5; // 最小速度（これ以下で停止）

    const animate = () => {
      if (!scrollRef.current || Math.abs(currentVelocity) < minVelocity) {
        return;
      }

      // スクロール位置を更新
      const currentScrollLeft = scrollRef.current.scrollLeft;
      const newScrollLeft = currentScrollLeft + currentVelocity;
      
      // スクロール範囲を制限
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const clampedScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
      
      scrollRef.current.scrollLeft = clampedScrollLeft;

      // 速度を減速
      currentVelocity *= friction;

      // 境界に達した場合は停止
      if (newScrollLeft <= 0 || newScrollLeft >= maxScroll) {
        return;
      }

      // 次のフレームで継続
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // スワイプ開始
  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    // ドラッグ中はスクロールを無効化
    if (isDragging) return;

    // 進行中のアニメーションを停止
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsSwipping(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const now = Date.now();
    
    setStartX(clientX);
    setLastX(clientX);
    setLastTime(now);
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setVelocity(0);
  };

  // スワイプ中
  const handleSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwipping || !scrollRef.current || isDragging) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const now = Date.now();
    
    // スクロール位置を更新
    const walk = (startX - clientX) * 1.2; // スクロール速度調整
    scrollRef.current.scrollLeft = scrollLeft + walk;

    // 速度を計算（過去数フレームの平均を取る）
    const timeDelta = now - lastTime;
    if (timeDelta > 0) {
      const newVelocity = (lastX - clientX) * 1.2; // スクロール方向に合わせて調整
      setVelocity(newVelocity);
    }

    setLastX(clientX);
    setLastTime(now);
  };

  // スワイプ終了
  const handleSwipeEnd = () => {
    setIsSwipping(false);
    
    // ドラッグ中でなければ慣性スクロールを開始
    if (!isDragging && Math.abs(velocity) > 1) { // 最小速度以上の場合のみ慣性スクロール
      animateInertia(velocity);
    }
  };

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // ドラッグ中は強制的にアニメーション停止
  useEffect(() => {
    if (isDragging && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      setIsSwipping(false);
    }
  }, [isDragging]);

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
          <div className="h-6 bg-gray-200 rounded-lg flex items-center justify-center">
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
            scrollBehavior: 'auto', // 慣性スクロール用にautoに変更
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
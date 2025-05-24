import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { character } from '@/libs/charlist';
import { CharacterBuild } from '../types';
import { IoSettingsSharp } from 'react-icons/io5';

// ドラッグ可能なキャラクターアイテムコンポーネント
export function DraggableCharacter({ 
  character, 
  fixedSize = false,
  build,
  onBuildConfig
}: { 
  character: character;
  fixedSize?: boolean;
  build?: CharacterBuild;
  onBuildConfig?: (character: character) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<number>(80); // デフォルト80px

  // @dnd-kit用のドラッグ処理
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: character.id.toString(),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // コンテナサイズを監視
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerSize(width);
      }
    };

    updateSize();
    
    // ResizeObserverでサイズ変更を監視
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // ビルド設定ボタンのクリック処理
  const handleBuildConfigClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuildConfig?.(character);
  };

  // 凸数の表示テキスト
  const getConstellationText = (constellation?: number) => {
    if (constellation === undefined || constellation === 0) return 'C0';
    return `C${constellation}`;
  };

  // コンテナサイズに基づく動的設定
  const getSizeConfig = (size: number) => {
    if (size <= 60) {
      // 極小サイズ
      return {
        iconSize: 'w-3 h-3',
        fontSize: 'text-xs',
        padding: 'px-0.5 py-0',
        buttonSize: 'w-3 h-3',
        buttonIconSize: 8,
        gap: 'gap-0.5',
        position: 'top-0.5 left-0.5',
        buttonPosition: 'top-0 right-0',
        imageSize: 12
      };
    } else if (size <= 80) {
      // 小サイズ
      return {
        iconSize: 'w-4 h-4',
        fontSize: 'text-xs',
        padding: 'px-1 py-0.5',
        buttonSize: 'w-4 h-4',
        buttonIconSize: 10,
        gap: 'gap-0.5',
        position: 'top-0.5 left-0.5',
        buttonPosition: 'top-0 right-0',
        imageSize: 16
      };
    } else if (size <= 120) {
      // 中サイズ
      return {
        iconSize: 'w-5 h-5',
        fontSize: 'text-sm',
        padding: 'px-1 py-0.5',
        buttonSize: 'w-5 h-5',
        buttonIconSize: 12,
        gap: 'gap-1',
        position: 'top-1 left-1',
        buttonPosition: 'top-0 right-0',
        imageSize: 20
      };
    } else {
      // 大サイズ
      return {
        iconSize: 'w-6 h-6',
        fontSize: 'text-sm',
        padding: 'px-1.5 py-1',
        buttonSize: 'w-6 h-6',
        buttonIconSize: 14,
        gap: 'gap-1',
        position: 'top-1 left-1',
        buttonPosition: 'top-0 right-0',
        imageSize: 24
      };
    }
  };

  const sizeConfig = getSizeConfig(containerSize);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (containerRef.current !== node) {
          containerRef.current = node;
        }
      }}
      {...listeners}
      {...attributes}
      className={`${fixedSize 
        ? "w-20 h-20" 
        : "aspect-square"
      } border-2 border-gray-300 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing hover:border-blue-400 transition-all duration-75 select-none relative ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        ...style,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      title={character.name}
    >
      {/* キャラクター画像 */}
      {fixedSize ? (
        <Image
          src={character.iconUrl}
          alt={character.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          draggable={false}
          style={{
            pointerEvents: 'none',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        />
      ) : (
        <Image
          src={character.iconUrl}
          alt={character.name}
          fill
          className="object-cover"
          draggable={false}
          style={{
            pointerEvents: 'none',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        />
      )}

      {/* ビルド情報アイコン（左上隅） */}
      {build && (
        <div className={`absolute ${sizeConfig.position} flex flex-col ${sizeConfig.gap}`}>
          {/* 凸数表示 */}
          {build.constellation !== undefined && build.constellation > 0 && (
            <div className={`bg-yellow-500 text-white ${sizeConfig.fontSize} ${sizeConfig.padding} rounded text-center font-bold min-w-[14px] shadow-sm`}>
              {getConstellationText(build.constellation)}
            </div>
          )}

          {/* 武器アイコン */}
          {build.weapon && (
            <div className={`${sizeConfig.iconSize} bg-gray-800 border border-white rounded-sm overflow-hidden shadow-sm`}>
              <Image
                src={build.weapon.iconUrl}
                alt={build.weapon.name}
                width={sizeConfig.imageSize}
                height={sizeConfig.imageSize}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          )}

          {/* 聖遺物アイコン */}
          {build.artifact && (
            <div className={`${sizeConfig.iconSize} bg-gray-700 border border-white rounded-sm overflow-hidden shadow-sm`}>
              <Image
                src={build.artifact.iconUrl}
                alt={build.artifact.name}
                width={sizeConfig.imageSize}
                height={sizeConfig.imageSize}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          )}
        </div>
      )}

      {/* ビルド設定ボタン（右上隅） */}
      {onBuildConfig && (
        <button
          onClick={handleBuildConfigClick}
          className={`absolute ${sizeConfig.buttonPosition} ${sizeConfig.buttonSize} bg-blue-500 text-white rounded text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm flex items-center justify-center`}
          title="ビルド設定"
          style={{ pointerEvents: 'auto' }}
        >
          <IoSettingsSharp size={sizeConfig.buttonIconSize} />
        </button>
      )}
    </div>
  );
} 
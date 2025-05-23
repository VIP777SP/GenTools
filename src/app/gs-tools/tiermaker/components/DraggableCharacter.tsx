import React from 'react';
import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { character } from '@/libs/charlist';

// ドラッグ可能なキャラクターアイテムコンポーネント
export function DraggableCharacter({ 
  character, 
  fixedSize = false
}: { 
  character: character;
  fixedSize?: boolean;
}) {
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

  return (
    <div
      ref={setNodeRef}
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
    </div>
  );
} 
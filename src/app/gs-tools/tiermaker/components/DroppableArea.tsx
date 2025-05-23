import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { character } from '@/libs/charlist';
import { DraggableCharacter } from './DraggableCharacter';

// ドロップ可能なエリアコンポーネント
export function DroppableArea({
  tierId,
  characters,
  onDrop
}: {
  tierId: string;
  characters: character[];
  onDrop: (tierId: string, characterId: number) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: tierId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-2 rounded-r-lg flex flex-wrap gap-2 items-start transition-colors ${
        isOver ? 'bg-blue-100' : 'bg-gray-50'
      }`}
    >
      {characters.map((char) => (
        <DraggableCharacter 
          key={char.id} 
          character={char} 
          fixedSize={true} 
        />
      ))}
      {characters.length === 0 && (
        <div className="text-gray-400 italic text-sm self-center">
          キャラクターをここにドラッグしてください
        </div>
      )}
    </div>
  );
} 
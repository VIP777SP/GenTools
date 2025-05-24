import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { character } from '@/libs/charlist';
import { CharacterBuild } from '../types';
import { DraggableCharacter } from './DraggableCharacter';

// ドロップ可能なエリアコンポーネント
export function DroppableArea({
  tierId,
  characters,
  characterBuilds,
  onDrop,
  onBuildConfig
}: {
  tierId: string;
  characters: character[];
  characterBuilds: Record<number, CharacterBuild>;
  onDrop: (tierId: string, characterId: number) => void;
  onBuildConfig: (character: character) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: tierId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-2 rounded-r-lg transition-colors ${
        isOver ? 'bg-blue-100' : 'bg-gray-50'
      }`}
    >
      <div className="grid grid-cols-4 gap-2">
        {characters.map((char) => (
          <DraggableCharacter 
            key={char.id} 
            character={char} 
            fixedSize={false}
            build={characterBuilds[char.id]}
            onBuildConfig={onBuildConfig}
          />
        ))}
      </div>
      {characters.length === 0 && (
        <div className="text-gray-400 italic text-sm self-center p-4">
          キャラクターをここにドラッグしてください
        </div>
      )}
    </div>
  );
} 
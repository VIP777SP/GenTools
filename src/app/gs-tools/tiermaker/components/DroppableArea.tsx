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
  onBuildConfig,
  onCopy
}: {
  tierId: string;
  characters: character[];
  characterBuilds: Record<number, CharacterBuild>;
  onBuildConfig: (character: character) => void;
  onCopy: (tierId: string, character: character) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: tierId,
  });

  const handleCopy = (character: character) => {
    onCopy(tierId, character);
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-2 rounded-r-lg transition-colors ${
        isOver ? 'bg-blue-100' : 'bg-gray-50'
      } overflow-visible`}
    >
      <div className="grid grid-cols-4 gap-2 overflow-visible">
        {characters.map((char, index) => (
          <DraggableCharacter 
            key={`${char.id}-${index}`}
            character={char} 
            fixedSize={false}
            build={characterBuilds[char.id]}
            onBuildConfig={onBuildConfig}
            onCopy={handleCopy}
            showCopyButton={true}
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
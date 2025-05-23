"use client";
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { TierRow } from './TierRow';
import { CharacterSelection } from './CharacterSelection';
import { DraggableCharacter } from './DraggableCharacter';
import { charlist, character } from '@/libs/charlist';

// ティア定義
const tierDefinitions = [
  { id: 'S', label: 'S級', color: 'bg-red-500', textColor: 'text-white' },
  { id: 'A', label: 'A級', color: 'bg-orange-500', textColor: 'text-white' },
  { id: 'B', label: 'B級', color: 'bg-yellow-500', textColor: 'text-white' },
  { id: 'C', label: 'C級', color: 'bg-green-500', textColor: 'text-white' },
  { id: 'D', label: 'D級', color: 'bg-blue-500', textColor: 'text-white' },
];

export interface TierDefinition {
  id: string;
  label: string;
  color: string;
  textColor: string;
}

export interface TierData extends TierDefinition {
  characters: character[];
}

export default function TierMakerClient() {
  // ティア情報
  const [tiers, setTiers] = useState<TierData[]>(
    tierDefinitions.map(def => ({ ...def, characters: [] }))
  );

  // ドラッグ状態
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
  // センサー設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  // キャラクターが配置されているかチェック
  const isCharacterPlaced = (characterId: number): boolean => {
    return tiers.some(tier => tier.characters.some(char => char.id === characterId));
  };

  // 未配置のキャラクター
  const availableCharacters = charlist.filter(
    char => !isCharacterPlaced(char.id)
  );

  // ドラッグ開始ハンドラー
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  // ドラッグ終了ハンドラー
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    
    const { active, over } = event;
    
    if (!over) {
      return;
    }
    
    const characterId = parseInt(active.id as string);
    const tierId = over.id as string;
    
    handleCharacterDrop(tierId, characterId);
  };

  // キャラクターをTierに配置
  const handleCharacterDrop = (tierId: string, characterId: number) => {
    const character = charlist.find(char => char.id === characterId);
    if (!character) return;

    // 既に配置済みの場合は処理しない
    if (isCharacterPlaced(characterId)) return;

    // ティアに追加
    setTiers(prev => prev.map(tier => {
      if (tier.id === tierId) {
        return {
          ...tier,
          characters: [...tier.characters, character]
        };
      }
      return tier;
    }));
  };

  // IDからキャラクターを取得
  const findCharacterById = (id: UniqueIdentifier): character | undefined => {
    const characterId = parseInt(id as string);
    return charlist.find(char => char.id === characterId);
  };

  // 新しいTier行を追加
  const handleAddTier = () => {
    const newId = `tier_${Date.now()}`;
    const newTier: TierData = {
      id: newId,
      label: `T${tiers.length + 1}`,
      color: tierDefinitions[tiers.length % tierDefinitions.length].color,
      textColor: tierDefinitions[tiers.length % tierDefinitions.length].textColor,
      characters: []
    };
    
    setTiers(prev => [...prev, newTier]);
  };

  // Tier行を削除
  const handleDeleteTier = (tierId: string) => {
    if (tiers.length <= 1) return;
    
    setTiers(prev => prev.filter(tier => tier.id !== tierId));
  };

  // Tierラベルを変更
  const handleLabelChange = (tierId: string, newLabel: string) => {
    setTiers(prev => prev.map(tier => 
      tier.id === tierId ? { ...tier, label: newLabel } : tier
    ));
  };

  // Tier色を変更
  const handleColorChange = (tierId: string, newColor: string) => {
    setTiers(prev => prev.map(tier => 
      tier.id === tierId ? { ...tier, color: newColor } : tier
    ));
  };

  // リセット
  const handleReset = () => {
    setTiers(prev => prev.map(tier => ({ ...tier, characters: [] })));
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-100">
        {/* メインコンテンツエリア */}
        <div className="pb-48">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">
              原神キャラクター評価ツール
            </h1>

            {/* コントロールボタン */}
            <div className="mb-6 flex gap-4 flex-wrap justify-center">
              <button
                onClick={handleAddTier}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                + Tier行を追加
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                リセット
              </button>
            </div>
            
            {/* Tierエリア */}
            <div className="space-y-4">
              {tiers.map((tier) => (
                <TierRow 
                  key={tier.id} 
                  tier={tier}
                  characters={tier.characters}
                  onDrop={handleCharacterDrop}
                  onLabelChange={handleLabelChange}
                  onColorChange={handleColorChange}
                  onDelete={handleDeleteTier}
                  canDelete={tiers.length > 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ドラッグオーバーレイ */}
        <DragOverlay>
          {activeId && findCharacterById(activeId) ? (
            <DraggableCharacter
              character={findCharacterById(activeId)!}
              fixedSize={true}
            />
          ) : null}
        </DragOverlay>

        {/* キャラクター選択エリア */}
        <CharacterSelection 
          availableCharacters={availableCharacters}
        />
      </div>
    </DndContext>
  );
} 
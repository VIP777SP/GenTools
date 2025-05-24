"use client";
import React, { useState, useEffect } from 'react';
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
  closestCenter,
} from '@dnd-kit/core';
import { TierRow } from './TierRow';
import { CharacterSelection } from './CharacterSelection';
import { DraggableCharacter } from './DraggableCharacter';
import { BuildConfigModal } from './BuildConfigModal';
import { charlist, character } from '@/libs/charlist';
import { CharacterBuild } from '../types';

// ティア定義
const tierDefinitions = [
  { id: 'S', label: 'S', color: 'bg-red-500', textColor: 'text-white' },
  { id: 'A', label: 'A', color: 'bg-orange-500', textColor: 'text-white' },
  { id: 'B', label: 'B', color: 'bg-yellow-500', textColor: 'text-white' },
  { id: 'C', label: 'C', color: 'bg-green-500', textColor: 'text-white' },
  { id: 'D', label: 'D', color: 'bg-blue-500', textColor: 'text-white' },
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

  // ビルド情報
  const [characterBuilds, setCharacterBuilds] = useState<Record<number, CharacterBuild>>({});

  // ビルド設定モーダル
  const [buildModalOpen, setBuildModalOpen] = useState(false);
  const [selectedCharacterForBuild, setSelectedCharacterForBuild] = useState<character | null>(null);

  // ドラッグ状態
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
  // センサー設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 3,
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
    // ドラッグ中はページスクロールを無効化
    document.body.style.overflow = 'hidden';
  };

  // ドラッグ終了ハンドラー
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    // ページスクロールを再有効化
    document.body.style.overflow = '';
    
    const { active, over } = event;
    
    if (!over) {
      return;
    }
    
    const characterId = parseInt(active.id as string);
    const overId = over.id as string;
    
    // キャラクター選択エリアにドロップされた場合
    if (overId === 'character-selection') {
      handleReturnToSelection(characterId);
      return;
    }
    
    // 通常のティアエリアにドロップされた場合
    handleCharacterDrop(overId, characterId);
  };

  // キャラクターをTierに配置
  const handleCharacterDrop = (tierId: string, characterId: number) => {
    // findCharacterById を使って、オリジナルまたはコピーされたキャラクターを取得
    const character = findCharacterById(characterId);
    if (!character) return;

    // ティアを更新（既存の配置があれば削除し、新しいティアに追加）
    setTiers(prev => prev.map(tier => {
      if (tier.id === tierId) {
        // 新しいティアに追加（重複チェック）
        const alreadyExists = tier.characters.some(char => char.id === characterId);
        if (alreadyExists) return tier;
        return {
          ...tier,
          characters: [...tier.characters, character]
        };
      } else {
        // 他のティアから削除
        return {
          ...tier,
          characters: tier.characters.filter(char => char.id !== characterId)
        };
      }
    }));
  };

  // キャラクターを選択リストに戻す
  const handleReturnToSelection = (characterId: number) => {
    // 全てのティアからキャラクターを削除
    setTiers(prev => prev.map(tier => ({
      ...tier,
      characters: tier.characters.filter(char => char.id !== characterId)
    })));

    // コピーされたキャラクターの場合はビルド設定も削除
    // オリジナルキャラクターの場合は自動的に選択リストに戻る
    const originalCharacter = charlist.find(char => char.id === characterId);
    if (!originalCharacter) {
      // コピーされたキャラクターの場合、ビルド設定も削除
      setCharacterBuilds(prev => {
        const newBuilds = { ...prev };
        delete newBuilds[characterId];
        return newBuilds;
      });
    }
  };

  // IDからキャラクターを取得
  const findCharacterById = (id: UniqueIdentifier): character | undefined => {
    const characterId = parseInt(id as string);
    
    // まずオリジナルのcharlistから探す
    const originalCharacter = charlist.find(char => char.id === characterId);
    if (originalCharacter) {
      return originalCharacter;
    }
    
    // 見つからない場合は、ティアに配置されているコピーされたキャラクターから探す
    for (const tier of tiers) {
      const foundCharacter = tier.characters.find(char => char.id === characterId);
      if (foundCharacter) {
        return foundCharacter;
      }
    }
    
    return undefined;
  };

  // ビルド設定を開く
  const handleOpenBuildConfig = (character: character) => {
    setSelectedCharacterForBuild(character);
    setBuildModalOpen(true);
  };

  // ビルド設定を保存
  const handleSaveBuild = (build: CharacterBuild) => {
    setCharacterBuilds(prev => ({
      ...prev,
      [build.characterId]: build
    }));
  };

  // 全キャラクターのビルド設定を開く
  const handleOpenBuildDefine = () => {
    // 配置されているキャラクターの一覧を取得
    const placedCharacters = tiers.flatMap(tier => tier.characters);
    if (placedCharacters.length === 0) {
      alert('キャラクターをティアに配置してからビルドを定義してください。');
      return;
    }
    
    // 最初のキャラクターを選択してモーダルを開く
    setSelectedCharacterForBuild(placedCharacters[0]);
    setBuildModalOpen(true);
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

  // キャラクターをコピー
  const handleCopyCharacter = (tierId: string, character: character) => {
    // 一意のIDを生成（タイムスタンプとランダム値を組み合わせ）
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const newId = parseInt(`${character.id}${timestamp}${random}`.slice(-8)); // 8桁に調整
    
    // 新しいキャラクターオブジェクトを作成（元のキャラクターのコピー）
    const copiedCharacter = {
      ...character,
      id: newId
    };

    // 指定されたティアにコピーを追加
    setTiers(prev => prev.map(tier => {
      if (tier.id === tierId) {
        return {
          ...tier,
          characters: [...tier.characters, copiedCharacter]
        };
      }
      return tier;
    }));

    // 元のキャラクターのビルド設定をコピーにも適用
    if (characterBuilds[character.id]) {
      setCharacterBuilds(prev => ({
        ...prev,
        [newId]: {
          ...characterBuilds[character.id],
          characterId: newId
        }
      }));
    }
  };

  // リセット
  const handleReset = () => {
    setTiers(prev => prev.map(tier => ({ ...tier, characters: [] })));
    setCharacterBuilds({});
  };

  // コンポーネントのクリーンアップ時にページスクロールを復元
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
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
              <button
                onClick={handleOpenBuildDefine}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                🔧 ビルドを定義
              </button>
            </div>
            
            {/* Tierエリア */}
            <div className="space-y-4 overflow-visible">
              {tiers.map((tier) => (
                <TierRow 
                  key={tier.id} 
                  tier={tier}
                  characters={tier.characters}
                  characterBuilds={characterBuilds}
                  onDrop={handleCharacterDrop}
                  onLabelChange={handleLabelChange}
                  onColorChange={handleColorChange}
                  onDelete={handleDeleteTier}
                  onBuildConfig={handleOpenBuildConfig}
                  onCopy={handleCopyCharacter}
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
              build={characterBuilds[parseInt(activeId as string)]}
            />
          ) : null}
        </DragOverlay>

        {/* キャラクター選択エリア */}
        <CharacterSelection 
          availableCharacters={availableCharacters}
          characterBuilds={characterBuilds}
          onBuildConfig={handleOpenBuildConfig}
          isDragging={activeId !== null}
        />

        {/* ビルド設定モーダル */}
        <BuildConfigModal
          isOpen={buildModalOpen}
          onClose={() => setBuildModalOpen(false)}
          character={selectedCharacterForBuild}
          currentBuild={selectedCharacterForBuild ? characterBuilds[selectedCharacterForBuild.id] : undefined}
          onSaveBuild={handleSaveBuild}
        />
      </div>
    </DndContext>
  );
} 
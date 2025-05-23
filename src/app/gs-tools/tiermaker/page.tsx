"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { charlist, character } from '@/libs/charlist';

// デフォルトのTier色一覧
const TIER_COLORS = [
  'bg-red-500',
  'bg-orange-500', 
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-gray-500',
  'bg-cyan-500',
] as const;

// 色ごとの薄い背景色マッピング
const LIGHTER_COLOR_MAP: Record<string, { normal: string; hover: string }> = {
  'bg-red-500': { normal: 'bg-red-300/30', hover: 'bg-red-300/50' },
  'bg-orange-500': { normal: 'bg-orange-300/30', hover: 'bg-orange-300/50' },
  'bg-yellow-500': { normal: 'bg-yellow-300/30', hover: 'bg-yellow-300/50' },
  'bg-green-500': { normal: 'bg-green-300/30', hover: 'bg-green-300/50' },
  'bg-blue-500': { normal: 'bg-blue-300/30', hover: 'bg-blue-300/50' },
  'bg-purple-500': { normal: 'bg-purple-300/30', hover: 'bg-purple-300/50' },
  'bg-pink-500': { normal: 'bg-pink-300/30', hover: 'bg-pink-300/50' },
  'bg-indigo-500': { normal: 'bg-indigo-300/30', hover: 'bg-indigo-300/50' },
  'bg-gray-500': { normal: 'bg-gray-300/30', hover: 'bg-gray-300/50' },
  'bg-cyan-500': { normal: 'bg-cyan-300/30', hover: 'bg-cyan-300/50' },
};

// 色クラス名から薄い背景色を取得する関数
const getLighterBgColor = (colorClass: string): { normal: string; hover: string } => {
  return LIGHTER_COLOR_MAP[colorClass] || { normal: 'bg-white/20', hover: 'bg-white/40' };
};

// Tier定義の型
interface TierDefinition {
  id: string;
  label: string;
  color: string;
}

interface TierData {
  [key: string]: character[];
}

// ドラッグ可能なキャラクターアイテムコンポーネント
function DraggableCharacter({ character }: { character: character }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('character-id', character.id.toString());
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-16 h-16 border-2 border-gray-300 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing hover:border-blue-400 transition-colors"
      title={character.name}
    >
      <Image
        src={character.iconUrl}
        alt={character.name}
        width={64}
        height={64}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}

// Tier行コンポーネント
function TierRow({ 
  tier, 
  characters, 
  onDrop,
  onLabelChange,
  onColorChange,
  onDelete,
  canDelete
}: { 
  tier: TierDefinition; 
  characters: character[];
  onDrop: (tierId: string, characterId: number) => void;
  onLabelChange: (tierId: string, newLabel: string) => void;
  onColorChange: (tierId: string, newColor: string) => void;
  onDelete: (tierId: string) => void;
  canDelete: boolean;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [editLabel, setEditLabel] = useState(tier.label);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const characterId = parseInt(e.dataTransfer.getData('character-id'));
    if (!isNaN(characterId)) {
      onDrop(tier.id, characterId);
    }
  };

  const handleLabelSubmit = () => {
    if (editLabel.trim()) {
      onLabelChange(tier.id, editLabel.trim());
    } else {
      setEditLabel(tier.label); // 元に戻す
    }
  };

  const handleColorSelect = (color: string) => {
    onColorChange(tier.id, color);
    setShowSettings(false);
  };

  const handleDelete = () => {
    onDelete(tier.id);
    setShowSettings(false);
  };

  // 設定パネル外クリックで閉じる
  const handleOutsideClick = () => {
    setShowSettings(false);
    handleLabelSubmit();
  };

  return (
    <div className="flex items-stretch border-2 border-gray-300 rounded-lg mb-2 min-h-[80px] relative">
      {/* Tier ラベル */}
      <div className={`w-20 flex items-center justify-center text-white font-bold text-xl ${tier.color} rounded-l-lg relative`}>
        <span className="flex-1 text-center">
          {tier.label}
        </span>
        
        {/* 設定ボタン */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`absolute top-1 left-1 w-5 h-5 ${getLighterBgColor(tier.color).normal} rounded text-xs hover:${getLighterBgColor(tier.color).hover} transition-all flex items-center justify-center`}
          title="設定"
        >
          ⋯
        </button>

        {/* 設定パネル */}
        {showSettings && (
          <>
            {/* オーバーレイ */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={handleOutsideClick}
            />
            
            {/* 設定パネル */}
            <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-[280px]">
              <h4 className="text-gray-800 font-bold mb-3 text-sm">Tier設定</h4>
              
              {/* ラベル編集 */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  ラベル名
                </label>
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  onBlur={handleLabelSubmit}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:border-blue-500"
                  maxLength={3}
                  placeholder="例: S, SS+"
                />
              </div>

              {/* 色選択 */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  背景色
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {TIER_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`w-8 h-8 rounded ${color} hover:scale-110 transition-transform ${
                        tier.color === color ? 'ring-2 ring-gray-800' : 'border border-gray-300'
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* 削除ボタン */}
              {canDelete && (
                <div className="border-t border-gray-200 pt-3">
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    このTier行を削除
                  </button>
                </div>
              )}

              {/* 閉じるボタン */}
              <div className="mt-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* キャラクター配置エリア */}
      <div
        className="flex-1 p-2 bg-gray-50 rounded-r-lg flex flex-wrap gap-2 items-start"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-tier-id={tier.id}
      >
        {characters.map((char) => (
          <DraggableCharacter key={char.id} character={char} />
        ))}
        {characters.length === 0 && (
          <div className="text-gray-400 italic text-sm self-center">
            キャラクターをここにドラッグしてください
          </div>
        )}
      </div>
    </div>
  );
}

// キャラクター選択エリアコンポーネント
function CharacterSelection({ 
  availableCharacters 
}: { 
  availableCharacters: character[];
}) {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-gray-700">キャラクター選択</h3>
      <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2 max-h-96 overflow-y-auto">
        {availableCharacters.map((character) => (
          <div
            key={character.id}
            className="relative group"
          >
            <DraggableCharacter character={character} />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {character.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TierMakerPage() {
  // デフォルトのTier定義
  const [tiers, setTiers] = useState<TierDefinition[]>([
    { id: 'S', label: 'S', color: 'bg-red-500' },
    { id: 'A', label: 'A', color: 'bg-orange-500' },
    { id: 'B', label: 'B', color: 'bg-yellow-500' },
    { id: 'C', label: 'C', color: 'bg-green-500' },
    { id: 'D', label: 'D', color: 'bg-blue-500' },
  ]);

  const [tierData, setTierData] = useState<TierData>(() => {
    const initialData: TierData = {};
    tiers.forEach(tier => {
      initialData[tier.id] = [];
    });
    return initialData;
  });

  // 配置済みキャラクターのIDを取得
  const placedCharacterIds = new Set(
    Object.values(tierData).flat().map(char => char.id)
  );

  // 未配置のキャラクター
  const availableCharacters = charlist.filter(
    char => !placedCharacterIds.has(char.id)
  );

  // 新しいTier行を追加
  const handleAddTier = () => {
    const newId = `tier_${Date.now()}`;
    const newTier: TierDefinition = {
      id: newId,
      label: `T${tiers.length + 1}`,
      color: TIER_COLORS[tiers.length % TIER_COLORS.length],
    };
    
    setTiers(prev => [...prev, newTier]);
    setTierData(prev => ({
      ...prev,
      [newId]: []
    }));
  };

  // Tier行を削除
  const handleDeleteTier = (tierId: string) => {
    if (tiers.length <= 1) return; // 最低1行は残す
    
    setTiers(prev => prev.filter(tier => tier.id !== tierId));
    setTierData(prev => {
      const newData = { ...prev };
      delete newData[tierId];
      return newData;
    });
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

  // キャラクターをTier表に配置
  const handleCharacterDrop = (tierId: string, characterId: number) => {
    const character = charlist.find(char => char.id === characterId);
    if (!character) return;

    setTierData(prev => {
      const newData = { ...prev };
      
      // 既存の配置から削除
      Object.keys(newData).forEach(key => {
        newData[key] = newData[key].filter(char => char.id !== characterId);
      });
      
      // 新しいTierに追加
      newData[tierId] = [...(newData[tierId] || []), character];
      
      return newData;
    });
  };

  // Tier表をリセット
  const handleReset = () => {
    const resetData: TierData = {};
    tiers.forEach(tier => {
      resetData[tier.id] = [];
    });
    setTierData(resetData);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tier表作成</h1>
        <p className="text-gray-600">キャラクターをドラッグ&ドロップでTier表を作成できます</p>
      </div>

      {/* コントロールボタン */}
      <div className="mb-6 flex gap-4 flex-wrap">
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled
        >
          画像として保存 (今後実装)
        </button>
      </div>

      {/* Tier表 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Tier表</h2>
        {tiers.map((tier) => (
          <TierRow
            key={tier.id}
            tier={tier}
            characters={tierData[tier.id] || []}
            onDrop={handleCharacterDrop}
            onLabelChange={handleLabelChange}
            onColorChange={handleColorChange}
            onDelete={handleDeleteTier}
            canDelete={tiers.length > 1}
          />
        ))}
      </div>

      {/* キャラクター選択エリア */}
      <CharacterSelection
        availableCharacters={availableCharacters}
      />
    </div>
  );
}

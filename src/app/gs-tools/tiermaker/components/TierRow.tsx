import React, { useState } from 'react';
import { character } from '@/libs/charlist';
import { TierDefinition, TIER_COLORS, getLighterBgColor, CharacterBuild } from '../types';
import { DroppableArea } from './DroppableArea';
import { HiDotsVertical } from 'react-icons/hi';

// Tier行コンポーネント
export function TierRow({ 
  tier, 
  characters, 
  characterBuilds,
  onLabelChange,
  onColorChange,
  onDelete,
  onBuildConfig,
  onCopy,
  canDelete
}: { 
  tier: TierDefinition; 
  characters: character[];
  characterBuilds: Record<number, CharacterBuild>;
  onLabelChange: (tierId: string, newLabel: string) => void;
  onColorChange: (tierId: string, newColor: string) => void;
  onDelete: (tierId: string) => void;
  onBuildConfig: (character: character) => void;
  onCopy: (tierId: string, character: character) => void;
  canDelete: boolean;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [editLabel, setEditLabel] = useState(tier.label);

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
    <div className="flex items-stretch border-2 border-gray-300 rounded-lg mb-2 min-h-[80px] relative overflow-visible">
      {/* Tier ラベル - 最小幅に縮小 */}
      <div className={`w-12 min-w-[48px] flex flex-col items-center justify-center text-white font-bold ${tier.color} rounded-l-lg relative`}>
        <span 
          className="text-center break-all overflow-hidden leading-tight px-1"
          style={{ 
            fontSize: tier.label.length <= 2 ? '1rem' : 
                     tier.label.length <= 4 ? '0.75rem' : 
                     tier.label.length <= 6 ? '0.625rem' : '0.5rem',
            wordBreak: 'break-all',
            lineHeight: '1.1'
          }}
        >
          {tier.label}
        </span>
        
        {/* 設定ボタン - 右上隅に配置 */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`absolute top-0.5 right-0.5 w-4 h-4 ${getLighterBgColor(tier.color).normal} rounded text-xs hover:${getLighterBgColor(tier.color).hover} transition-all flex items-center justify-center text-white`}
          title="設定"
        >
          <HiDotsVertical size={10} />
        </button>

        {/* 設定パネル */}
        {showSettings && (
          <>
            {/* オーバーレイ */}
            <div 
              className="fixed inset-0 z-[80]" 
              onClick={handleOutsideClick}
            />
            
            {/* 設定パネル - 左側に表示 */}
            <div className="absolute top-1 left-full ml-2 z-[85] bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-[280px]">
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
                  maxLength={8}
                  placeholder="例: S, SS+, 神"
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
      
      {/* キャラクター配置エリア - より広いスペース */}
      <DroppableArea
        tierId={tier.id}
        characters={characters}
        characterBuilds={characterBuilds}
        onBuildConfig={onBuildConfig}
        onCopy={onCopy}
      />
    </div>
  );
} 
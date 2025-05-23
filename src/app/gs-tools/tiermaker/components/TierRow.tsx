import React, { useState } from 'react';
import { character } from '@/libs/charlist';
import { TierDefinition, TIER_COLORS, getLighterBgColor, getLabelTextSize } from '../types';
import { DroppableArea } from './DroppableArea';

// Tier行コンポーネント
export function TierRow({ 
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
      <div className={`w-20 flex items-center justify-center text-white font-bold ${tier.color} rounded-l-lg relative`}>
        <span 
          className={`flex-1 text-center ${getLabelTextSize(tier.label)} break-all overflow-hidden`}
          style={{ 
            fontSize: tier.label.length <= 3 ? '1.25rem' : 
                     tier.label.length <= 5 ? '1.125rem' : 
                     tier.label.length <= 8 ? '0.75rem' : '0.625rem',
            lineHeight: tier.label.length > 3 ? '1.1' : '1.75',
            padding: tier.label.length > 5 ? '0 2px' : '0'
          }}
        >
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
                  maxLength={10}
                  placeholder="例: S, SS+, 神Tier"
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
      <DroppableArea
        tierId={tier.id}
        characters={characters}
        onDrop={onDrop}
      />
    </div>
  );
} 
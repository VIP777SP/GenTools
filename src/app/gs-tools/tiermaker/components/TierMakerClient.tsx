"use client";
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
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
import { IoAdd, IoRefresh, IoCamera } from 'react-icons/io5';
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

  // 画像として保存（代替方法付き）
  const handleSaveAsImage = async () => {
    const tierElement = document.getElementById('tier-list-area');
    if (!tierElement) {
      alert('Tier表が見つかりません。');
      return;
    }

    // 現代ブラウザでのスクリーンショットAPI使用を試行
    if ('getDisplayMedia' in navigator.mediaDevices) {
      const useScreenCapture = confirm('画像保存方法を選択してください：\n\n「OK」: 画面キャプチャ（推奨・確実）\n「キャンセル」: 自動保存（html2canvas）');
      
      if (useScreenCapture) {
        alert('これから画面共有が開始されます。\n\n1. 「画面全体」または「ブラウザタブ」を選択\n2. Tier表が見えるようにして数秒待つ\n3. 手動でスクリーンショットを撮影してください\n\nWindows: Win+Shift+S\nMac: Cmd+Shift+4');
        
        try {
          await navigator.mediaDevices.getDisplayMedia({ video: true });
        } catch (_captureError) {
          console.log('ユーザーがキャンセルしました');
        }
        return;
      }
    }

    // 従来のhtml2canvas方式
    try {
      // RGB色強制クラスを一時的に追加
      tierElement.classList.add('tier-capture-area');
      
      // スタイル適用を待つ
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // よりシンプルな設定でhtml2canvasを実行
      const canvas = await html2canvas(tierElement, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: tierElement.offsetWidth,
        height: tierElement.offsetHeight,
      });

      // RGB色強制クラスを削除
      tierElement.classList.remove('tier-capture-area');

      // 画像としてダウンロード
      const link = document.createElement('a');
      link.download = `genshin-tier-list-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Tier表を画像として保存しました！');
    } catch (saveError) {
      // クラスが残っている場合は削除
      tierElement.classList.remove('tier-capture-area');
      console.error('画像保存エラー:', saveError);
      
      // ユーザーに詳細情報を提供
      const errorMessage = saveError instanceof Error ? saveError.message : String(saveError);
      alert(`自動保存に失敗しました。\n\nエラー詳細: ${errorMessage}\n\n手動での代替手段：\n1. Win+Shift+S (Windows) または Cmd+Shift+4 (Mac)\n2. Tier表の部分を選択して保存\n3. または F12 → Elements → #tier-list-area を右クリック → "Screenshot node"`);
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* メインコンテンツエリア */}
        <div className="pb-44">
          <div className="container mx-auto p-4">
            {/* ヘッダーエリア */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
                原神キャラクター評価ツール
              </h1>

              {/* コントロールボタン - 2+1レイアウト */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-4xl mx-auto">
                {/* 左側: 編集機能 */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddTier}
                    className="group relative px-4 py-2.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-lg hover:from-emerald-400 hover:via-green-400 hover:to-teal-400 transition-all duration-300 font-semibold shadow-xl hover:shadow-emerald-500/50 hover:scale-105 transform active:scale-95 border border-emerald-400/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <IoAdd className="mr-1.5 group-hover:rotate-90 transition-transform duration-300" size={16} />
                      Tier追加
                    </div>
                  </button>
                  <button
                    onClick={handleReset}
                    className="group relative px-4 py-2.5 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white rounded-lg hover:from-red-400 hover:via-pink-400 hover:to-rose-400 transition-all duration-300 font-semibold shadow-xl hover:shadow-red-500/50 hover:scale-105 transform active:scale-95 border border-red-400/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <IoRefresh className="mr-1.5 group-hover:rotate-180 transition-transform duration-300" size={16} />
                      リセット
                    </div>
                  </button>
                </div>

                {/* 右側: 保存機能 */}
                <button
                  onClick={handleSaveAsImage}
                  className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg hover:from-blue-400 hover:via-indigo-400 hover:to-purple-400 transition-all duration-300 font-semibold shadow-xl hover:shadow-blue-500/50 hover:scale-105 transform active:scale-95 border border-blue-400/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <IoCamera className="mr-1.5 group-hover:scale-110 transition-transform duration-300" size={16} />
                    画像保存
                  </div>
                </button>
              </div>
            </div>
            
            {/* Tierエリア */}
            <div id="tier-list-area" className="space-y-4 overflow-visible bg-gray-100">
              {tiers.map((tier) => (
                <TierRow 
                  key={tier.id} 
                  tier={tier}
                  characters={tier.characters}
                  characterBuilds={characterBuilds}
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
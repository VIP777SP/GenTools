import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { character } from '@/libs/charlist';
import { weapon, weaponlist } from '@/libs/weaponlist';
import { artifact, artifactlist } from '@/libs/artifacts';
import { CharacterBuild } from '../types';

interface BuildConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: character | null;
  currentBuild?: CharacterBuild;
  onSaveBuild: (build: CharacterBuild) => void;
}

export function BuildConfigModal({
  isOpen,
  onClose,
  character,
  currentBuild,
  onSaveBuild
}: BuildConfigModalProps) {
  const [constellation, setConstellation] = useState<number>(0);
  const [selectedWeapon, setSelectedWeapon] = useState<weapon | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<artifact | null>(null);
  const [weaponSearchTerm, setWeaponSearchTerm] = useState('');
  const [artifactSearchTerm, setArtifactSearchTerm] = useState('');

  // モーダルが開かれたときに現在のビルド情報を設定
  useEffect(() => {
    if (isOpen && character) {
      setConstellation(currentBuild?.constellation || 0);
      setSelectedWeapon(currentBuild?.weapon || null);
      setSelectedArtifact(currentBuild?.artifact || null);
      setWeaponSearchTerm('');
      setArtifactSearchTerm('');
    }
  }, [isOpen, character, currentBuild]);

  // キャラクターの武器タイプに合致する武器をフィルタリング
  const compatibleWeapons = weaponlist.filter(weapon => 
    character && weapon.type === character.weaponType &&
    weapon.name.toLowerCase().includes(weaponSearchTerm.toLowerCase())
  );

  // 聖遺物をフィルタリング
  const filteredArtifacts = artifactlist.filter(artifact =>
    artifact.name.toLowerCase().includes(artifactSearchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!character) return;

    const build: CharacterBuild = {
      characterId: character.id,
      constellation: constellation,
      weapon: selectedWeapon || undefined,
      artifact: selectedArtifact || undefined,
    };

    onSaveBuild(build);
    onClose();
  };

  const handleReset = () => {
    setConstellation(0);
    setSelectedWeapon(null);
    setSelectedArtifact(null);
  };

  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={character.iconUrl}
                alt={character.name}
                width={64}
                height={64}
                className="rounded-lg border-2 border-gray-300"
              />
              <div>
                <h2 className="text-2xl font-bold">{character.name}のビルド設定</h2>
                <p className="text-gray-600">武器タイプ: {character.weaponType}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* 凸数設定 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">凸数</h3>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((c) => (
                <button
                  key={c}
                  onClick={() => setConstellation(c)}
                  className={`w-12 h-12 rounded-lg border-2 font-bold transition-colors ${
                    constellation === c
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {c === 0 ? 'C0' : `C${c}`}
                </button>
              ))}
            </div>
          </div>

          {/* 武器設定 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">武器</h3>
            <input
              type="text"
              placeholder="武器名で検索..."
              value={weaponSearchTerm}
              onChange={(e) => setWeaponSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              <div
                onClick={() => setSelectedWeapon(null)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors text-center ${
                  selectedWeapon === null
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="text-sm text-gray-600">なし</div>
              </div>
              {compatibleWeapons.map((weapon) => (
                <div
                  key={weapon.id}
                  onClick={() => setSelectedWeapon(weapon)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedWeapon?.id === weapon.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-800 rounded border mx-auto mb-1 flex items-center justify-center">
                    <Image
                      src={weapon.iconUrl}
                      alt={weapon.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="text-xs text-center">{weapon.name}</div>
                  <div className="text-xs text-center text-gray-500">
                    ★{weapon.rarity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 聖遺物設定 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">聖遺物</h3>
            <input
              type="text"
              placeholder="聖遺物名で検索..."
              value={artifactSearchTerm}
              onChange={(e) => setArtifactSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              <div
                onClick={() => setSelectedArtifact(null)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors text-center ${
                  selectedArtifact === null
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="text-sm text-gray-600">なし</div>
              </div>
              {filteredArtifacts.map((artifact) => (
                <div
                  key={artifact.id}
                  onClick={() => setSelectedArtifact(artifact)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedArtifact?.id === artifact.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-700 rounded border mx-auto mb-1 flex items-center justify-center">
                    <Image
                      src={artifact.iconUrl}
                      alt={artifact.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="text-xs text-center">{artifact.name}</div>
                  <div className="text-xs text-center text-gray-500">
                    ★{artifact.rarity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              リセット
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
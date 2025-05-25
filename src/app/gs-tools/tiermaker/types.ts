import { character } from '@/libs/charlist';
import { weapon } from '@/libs/weaponlist';
import { artifact } from '@/libs/artifacts';

// ビルド情報の型定義
export interface CharacterBuild {
  characterId: number;
  constellation?: number; // 凸数 (-1: 非表示, 0: C0, 1-6: C1-C6, undefined: 未設定)
  weapon?: weapon;
  artifact?: artifact;
}

// デフォルトのTier色一覧
export const TIER_COLORS = [
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

// Tier定義の型
export interface TierDefinition {
  id: string;
  label: string;
  color: string;
}

export interface TierData {
  [key: string]: character[];
}

// 色クラス名から薄い背景色を取得する関数
export const getLighterBgColor = (colorClass: string): { normal: string; hover: string } => {
  return LIGHTER_COLOR_MAP[colorClass] || { normal: 'bg-white/20', hover: 'bg-white/40' };
};

// 文字数に応じてフォントサイズを決定する関数
export const getLabelTextSize = (label: string): string => {
  const length = label.length;
  if (length <= 3) return 'text-xl';      // 3文字以下：大きめ
  if (length <= 5) return 'text-lg';      // 4-5文字：やや大きめ
  if (length <= 8) return 'text-base';    // 6-8文字：標準
  return 'text-sm';                       // 9文字以上：小さめ
}; 
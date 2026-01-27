// Natures system - 25 natures affecting stats
// Each nature boosts one stat by 10% and lowers another by 10%
// 5 neutral natures have no effect

import type { Stats } from '../types/index.ts';

export type NatureId =
  // Neutral natures (no stat changes)
  | 'hardy' | 'docile' | 'serious' | 'bashful' | 'quirky'
  // +Attack natures
  | 'lonely' | 'brave' | 'adamant' | 'naughty'
  // +Defense natures
  | 'bold' | 'relaxed' | 'impish' | 'lax'
  // +SpAttack natures
  | 'modest' | 'mild' | 'quiet' | 'rash'
  // +SpDefense natures
  | 'calm' | 'gentle' | 'sassy' | 'careful'
  // +Speed natures
  | 'timid' | 'hasty' | 'jolly' | 'naive';

export interface NatureData {
  id: NatureId;
  name: string;
  boosts?: keyof Omit<Stats, 'hp'>;  // HP is never affected by nature
  lowers?: keyof Omit<Stats, 'hp'>;
}

// All 25 natures with their stat modifiers
export const NATURES: Record<NatureId, NatureData> = {
  // Neutral natures (no stat changes)
  hardy:   { id: 'hardy',   name: 'Hardy' },
  docile:  { id: 'docile',  name: 'Docile' },
  serious: { id: 'serious', name: 'Serious' },
  bashful: { id: 'bashful', name: 'Bashful' },
  quirky:  { id: 'quirky',  name: 'Quirky' },

  // +Attack natures
  lonely:  { id: 'lonely',  name: 'Lonely',  boosts: 'attack', lowers: 'defense' },
  brave:   { id: 'brave',   name: 'Brave',   boosts: 'attack', lowers: 'speed' },
  adamant: { id: 'adamant', name: 'Adamant', boosts: 'attack', lowers: 'spAttack' },
  naughty: { id: 'naughty', name: 'Naughty', boosts: 'attack', lowers: 'spDefense' },

  // +Defense natures
  bold:    { id: 'bold',    name: 'Bold',    boosts: 'defense', lowers: 'attack' },
  relaxed: { id: 'relaxed', name: 'Relaxed', boosts: 'defense', lowers: 'speed' },
  impish:  { id: 'impish',  name: 'Impish',  boosts: 'defense', lowers: 'spAttack' },
  lax:     { id: 'lax',     name: 'Lax',     boosts: 'defense', lowers: 'spDefense' },

  // +SpAttack natures
  modest:  { id: 'modest',  name: 'Modest',  boosts: 'spAttack', lowers: 'attack' },
  mild:    { id: 'mild',    name: 'Mild',    boosts: 'spAttack', lowers: 'defense' },
  quiet:   { id: 'quiet',   name: 'Quiet',   boosts: 'spAttack', lowers: 'speed' },
  rash:    { id: 'rash',    name: 'Rash',    boosts: 'spAttack', lowers: 'spDefense' },

  // +SpDefense natures
  calm:    { id: 'calm',    name: 'Calm',    boosts: 'spDefense', lowers: 'attack' },
  gentle:  { id: 'gentle',  name: 'Gentle',  boosts: 'spDefense', lowers: 'defense' },
  sassy:   { id: 'sassy',   name: 'Sassy',   boosts: 'spDefense', lowers: 'speed' },
  careful: { id: 'careful', name: 'Careful', boosts: 'spDefense', lowers: 'spAttack' },

  // +Speed natures
  timid:   { id: 'timid',   name: 'Timid',   boosts: 'speed', lowers: 'attack' },
  hasty:   { id: 'hasty',   name: 'Hasty',   boosts: 'speed', lowers: 'defense' },
  jolly:   { id: 'jolly',   name: 'Jolly',   boosts: 'speed', lowers: 'spAttack' },
  naive:   { id: 'naive',   name: 'Naive',   boosts: 'speed', lowers: 'spDefense' }
};

// All nature IDs for random selection
const ALL_NATURE_IDS: NatureId[] = Object.keys(NATURES) as NatureId[];

/**
 * Get a random nature ID
 */
export function getRandomNature(): NatureId {
  const index = Math.floor(Math.random() * ALL_NATURE_IDS.length);
  return ALL_NATURE_IDS[index];
}

/**
 * Get nature data by ID
 */
export function getNature(id: NatureId): NatureData {
  return NATURES[id];
}

/**
 * Get stat modifiers for a nature (1.0, 1.1, or 0.9)
 * Returns multipliers for each stat except HP
 */
export function getNatureModifiers(id: NatureId): Record<keyof Omit<Stats, 'hp'>, number> {
  const nature = NATURES[id];
  const modifiers: Record<keyof Omit<Stats, 'hp'>, number> = {
    attack: 1,
    defense: 1,
    spAttack: 1,
    spDefense: 1,
    speed: 1
  };

  if (nature.boosts) {
    modifiers[nature.boosts] = 1.1;
  }
  if (nature.lowers) {
    modifiers[nature.lowers] = 0.9;
  }

  return modifiers;
}

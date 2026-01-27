import type { CreatureInstance, Move, Effectiveness, IVs } from '../types/index.ts';
import { getTypeEffectiveness } from '../data/type-chart.ts';
import { getNatureModifiers, type NatureId } from '../data/natures.ts';

export interface DamageResult {
  damage: number;
  effectiveness: Effectiveness;
  isCritical: boolean;
  isStab: boolean;
}

export function calculateDamage(
  attacker: CreatureInstance,
  defender: CreatureInstance,
  move: Move
): DamageResult {
  // Status moves don't do damage
  if (move.category === 'status' || move.power === 0) {
    return { damage: 0, effectiveness: 1, isCritical: false, isStab: false };
  }

  // Check accuracy
  const accuracyRoll = Math.random() * 100;
  if (accuracyRoll > move.accuracy) {
    return { damage: 0, effectiveness: 1, isCritical: false, isStab: false };
  }

  // Get attack and defense stats based on move category
  let attack: number;
  let defense: number;

  if (move.category === 'physical') {
    attack = attacker.stats.attack;
    defense = defender.stats.defense;
  } else {
    attack = attacker.stats.spAttack;
    defense = defender.stats.spDefense;
  }

  // Base damage formula (Pokemon Gen 1 style)
  const level = attacker.level;
  const power = move.power;
  const baseDamage = Math.floor(
    ((2 * level / 5 + 2) * power * attack / defense) / 50 + 2
  );

  // Critical hit (1/16 chance, 2x damage)
  const isCritical = Math.random() < 1 / 16;
  const criticalMultiplier = isCritical ? 2 : 1;

  // STAB (Same Type Attack Bonus)
  const isStab = attacker.species.types.includes(move.type);
  const stabMultiplier = isStab ? 1.5 : 1;

  // Type effectiveness
  const effectiveness = getTypeEffectiveness(move.type, defender.species.types);

  // Random factor (85-100%)
  const randomFactor = (Math.random() * 0.15 + 0.85);

  // Calculate final damage
  let damage = Math.floor(
    baseDamage * criticalMultiplier * stabMultiplier * effectiveness * randomFactor
  );

  // Minimum 1 damage if move hits (unless immune)
  if (effectiveness > 0 && damage < 1) {
    damage = 1;
  }

  return {
    damage,
    effectiveness,
    isCritical,
    isStab
  };
}

/**
 * Generate random IVs (Individual Values) for a creature
 * Each stat gets a value from 0-31
 */
export function generateRandomIVs(): IVs {
  return {
    hp: Math.floor(Math.random() * 32),
    attack: Math.floor(Math.random() * 32),
    defense: Math.floor(Math.random() * 32),
    spAttack: Math.floor(Math.random() * 32),
    spDefense: Math.floor(Math.random() * 32),
    speed: Math.floor(Math.random() * 32)
  };
}

/**
 * Calculate stats from base stats, level, IVs, and nature
 * Formula based on Pokemon mechanics:
 * - HP: floor((2 * base + iv) * level / 100 + level + 10)
 * - Other: floor(((2 * base + iv) * level / 100 + 5) * natureModifier)
 */
export function calculateStats(
  species: { baseStats: CreatureInstance['stats'] },
  level: number,
  ivs?: IVs,
  nature?: NatureId
): CreatureInstance['stats'] {
  const base = species.baseStats;

  // Use provided IVs or default to 0 (for backwards compatibility)
  const iv: IVs = ivs || { hp: 0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0 };

  // Get nature modifiers (1.0, 1.1, or 0.9 for each stat)
  const natureMod = nature ? getNatureModifiers(nature) : {
    attack: 1, defense: 1, spAttack: 1, spDefense: 1, speed: 1
  };

  // HP calculation (not affected by nature)
  const hp = Math.floor((2 * base.hp + iv.hp) * level / 100 + level + 10);

  // Other stat calculation (affected by nature)
  const calcStat = (baseStat: number, ivStat: number, modifier: number) =>
    Math.floor(((2 * baseStat + ivStat) * level / 100 + 5) * modifier);

  return {
    hp,
    attack: calcStat(base.attack, iv.attack, natureMod.attack),
    defense: calcStat(base.defense, iv.defense, natureMod.defense),
    spAttack: calcStat(base.spAttack, iv.spAttack, natureMod.spAttack),
    spDefense: calcStat(base.spDefense, iv.spDefense, natureMod.spDefense),
    speed: calcStat(base.speed, iv.speed, natureMod.speed)
  };
}

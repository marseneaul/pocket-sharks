import type { CreatureInstance, Move, Effectiveness } from '../types/index.ts';
import { getTypeEffectiveness } from '../data/type-chart.ts';

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

// Calculate stats from base stats and level (simplified IV/EV formula)
export function calculateStats(species: { baseStats: CreatureInstance['stats'] }, level: number): CreatureInstance['stats'] {
  const base = species.baseStats;

  // Simplified stat calculation (no IVs/EVs for now)
  const hp = Math.floor((2 * base.hp * level) / 100 + level + 10);
  const otherStat = (baseStat: number) =>
    Math.floor((2 * baseStat * level) / 100 + 5);

  return {
    hp,
    attack: otherStat(base.attack),
    defense: otherStat(base.defense),
    spAttack: otherStat(base.spAttack),
    spDefense: otherStat(base.spDefense),
    speed: otherStat(base.speed)
  };
}

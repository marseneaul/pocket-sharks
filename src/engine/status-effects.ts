// Status Effects System
// Handles all status condition logic: application, damage, prevention, and curing

import type { CreatureInstance, StatusCondition, Move } from '../types/index.ts';

// Status effect configuration
interface StatusConfig {
  // Chance to prevent acting (0-1)
  preventActChance: number;
  // Message when prevented from acting
  preventMessage: (name: string) => string;
  // Chance to cure at end of turn (0-1)
  cureChance: number;
  // Message when cured
  cureMessage: (name: string) => string;
  // End of turn damage as fraction of max HP (0 = none)
  endTurnDamage: number;
  // Message for end of turn damage
  damageMessage: (name: string) => string;
  // Speed modifier (multiplier, 1.0 = no change)
  speedModifier: number;
  // Attack modifier for physical moves (multiplier)
  attackModifier: number;
}

const STATUS_CONFIG: Record<Exclude<StatusCondition, null>, StatusConfig> = {
  paralyzed: {
    preventActChance: 0.25,  // 25% chance to be fully paralyzed
    preventMessage: (name) => `${name} is paralyzed! It can't move!`,
    cureChance: 0,  // Doesn't cure naturally
    cureMessage: (name) => `${name} is no longer paralyzed!`,
    endTurnDamage: 0,
    damageMessage: () => '',
    speedModifier: 0.5,  // Speed halved
    attackModifier: 1.0
  },
  poisoned: {
    preventActChance: 0,
    preventMessage: () => '',
    cureChance: 0,  // Doesn't cure naturally
    cureMessage: (name) => `${name} is no longer poisoned!`,
    endTurnDamage: 1/8,  // Loses 1/8 max HP per turn
    damageMessage: (name) => `${name} is hurt by poison!`,
    speedModifier: 1.0,
    attackModifier: 1.0
  },
  burned: {
    preventActChance: 0,
    preventMessage: () => '',
    cureChance: 0,  // Doesn't cure naturally
    cureMessage: (name) => `${name} is no longer burned!`,
    endTurnDamage: 1/16,  // Loses 1/16 max HP per turn
    damageMessage: (name) => `${name} is hurt by its burn!`,
    speedModifier: 1.0,
    attackModifier: 0.5  // Physical attack halved
  },
  frozen: {
    preventActChance: 1.0,  // Always prevents acting
    preventMessage: (name) => `${name} is frozen solid!`,
    cureChance: 0.2,  // 20% chance to thaw each turn
    cureMessage: (name) => `${name} thawed out!`,
    endTurnDamage: 0,
    damageMessage: () => '',
    speedModifier: 1.0,
    attackModifier: 1.0
  },
  asleep: {
    preventActChance: 1.0,  // Always prevents acting
    preventMessage: (name) => `${name} is fast asleep!`,
    cureChance: 0.33,  // ~33% chance to wake each turn (avg 2-3 turns)
    cureMessage: (name) => `${name} woke up!`,
    endTurnDamage: 0,
    damageMessage: () => '',
    speedModifier: 1.0,
    attackModifier: 1.0
  }
};

// Track sleep/freeze turn counters for guaranteed wake/thaw
const sleepTurns = new WeakMap<CreatureInstance, number>();
const freezeTurns = new WeakMap<CreatureInstance, number>();

/**
 * Check if a creature can act this turn based on status
 * Returns { canAct: boolean, message?: string, cured?: boolean }
 */
export function checkCanAct(creature: CreatureInstance): {
  canAct: boolean;
  message?: string;
  cured?: boolean;
} {
  const status = creature.status;
  if (!status) return { canAct: true };

  const config = STATUS_CONFIG[status];
  const name = creature.nickname || creature.species.name;

  // Check for cure first (frozen/asleep)
  if (config.cureChance > 0) {
    // Track turns for guaranteed cure
    if (status === 'asleep') {
      const turns = (sleepTurns.get(creature) || 0) + 1;
      sleepTurns.set(creature, turns);
      // Guaranteed wake after 3 turns, or random chance
      if (turns >= 3 || Math.random() < config.cureChance) {
        creature.status = null;
        sleepTurns.delete(creature);
        return { canAct: true, message: config.cureMessage(name), cured: true };
      }
    } else if (status === 'frozen') {
      const turns = (freezeTurns.get(creature) || 0) + 1;
      freezeTurns.set(creature, turns);
      // Guaranteed thaw after 5 turns, or random chance
      if (turns >= 5 || Math.random() < config.cureChance) {
        creature.status = null;
        freezeTurns.delete(creature);
        return { canAct: true, message: config.cureMessage(name), cured: true };
      }
    }
  }

  // Check if prevented from acting
  if (config.preventActChance > 0 && Math.random() < config.preventActChance) {
    return { canAct: false, message: config.preventMessage(name) };
  }

  return { canAct: true };
}

/**
 * Apply end-of-turn status damage
 * Returns damage dealt and message, or null if no damage
 */
export function applyEndOfTurnDamage(creature: CreatureInstance): {
  damage: number;
  message: string;
  fainted: boolean;
} | null {
  const status = creature.status;
  if (!status) return null;

  const config = STATUS_CONFIG[status];
  if (config.endTurnDamage <= 0) return null;

  const name = creature.nickname || creature.species.name;
  const damage = Math.max(1, Math.floor(creature.maxHp * config.endTurnDamage));

  creature.currentHp = Math.max(0, creature.currentHp - damage);

  return {
    damage,
    message: config.damageMessage(name),
    fainted: creature.currentHp <= 0
  };
}

/**
 * Get speed modifier for a creature's status
 */
export function getSpeedModifier(creature: CreatureInstance): number {
  const status = creature.status;
  if (!status) return 1.0;
  return STATUS_CONFIG[status].speedModifier;
}

/**
 * Get attack modifier for a creature's status (for physical moves)
 */
export function getAttackModifier(creature: CreatureInstance): number {
  const status = creature.status;
  if (!status) return 1.0;
  return STATUS_CONFIG[status].attackModifier;
}

/**
 * Try to apply a status effect to a creature
 * Returns true if status was applied, false if failed (already has status, immune, etc.)
 */
export function tryApplyStatus(
  target: CreatureInstance,
  status: StatusCondition,
  chance: number = 1.0
): { applied: boolean; message?: string } {
  if (!status) return { applied: false };

  const name = target.nickname || target.species.name;

  // Can't apply status if already has one
  if (target.status !== null) {
    return { applied: false };
  }

  // Type immunities
  const types = target.species.types;

  // Fire types can't be burned
  if (status === 'burned' && types.includes('fire')) {
    return { applied: false, message: `${name} can't be burned!` };
  }

  // Ice types can't be frozen
  if (status === 'frozen' && types.includes('ice')) {
    return { applied: false, message: `${name} can't be frozen!` };
  }

  // Electric types can't be paralyzed
  if (status === 'paralyzed' && types.includes('electric')) {
    return { applied: false, message: `${name} can't be paralyzed!` };
  }

  // Poison types can't be poisoned
  if (status === 'poisoned' && types.includes('poison')) {
    return { applied: false, message: `${name} can't be poisoned!` };
  }

  // Check chance
  if (Math.random() > chance) {
    return { applied: false };
  }

  // Apply the status
  target.status = status;

  // Reset turn counters
  if (status === 'asleep') {
    sleepTurns.set(target, 0);
  } else if (status === 'frozen') {
    freezeTurns.set(target, 0);
  }

  const statusMessages: Record<Exclude<StatusCondition, null>, string> = {
    paralyzed: `${name} is paralyzed! It may be unable to move!`,
    poisoned: `${name} was poisoned!`,
    burned: `${name} was burned!`,
    frozen: `${name} was frozen solid!`,
    asleep: `${name} fell asleep!`
  };

  return { applied: true, message: statusMessages[status] };
}

/**
 * Cure a creature's status condition
 */
export function cureStatus(creature: CreatureInstance): string | null {
  if (!creature.status) return null;

  const name = creature.nickname || creature.species.name;
  const config = STATUS_CONFIG[creature.status];
  const message = config.cureMessage(name);

  creature.status = null;
  sleepTurns.delete(creature);
  freezeTurns.delete(creature);

  return message;
}

/**
 * Check if a move can inflict status and get the chance
 */
export function getMoveStatusEffect(move: Move): {
  status: StatusCondition;
  chance: number;
} | null {
  if (!move.effect || move.effect.type !== 'status' || !move.effect.status) {
    // Check for secondary status chance on damaging moves
    if (move.secondaryEffect?.status) {
      return {
        status: move.secondaryEffect.status,
        chance: move.secondaryEffect.chance || 0.1
      };
    }
    return null;
  }

  return {
    status: move.effect.status,
    chance: 1.0  // Primary status moves always apply (if accuracy check passes)
  };
}

/**
 * Get status condition display name
 */
export function getStatusDisplayName(status: StatusCondition): string {
  if (!status) return '';
  const names: Record<Exclude<StatusCondition, null>, string> = {
    paralyzed: 'PAR',
    poisoned: 'PSN',
    burned: 'BRN',
    frozen: 'FRZ',
    asleep: 'SLP'
  };
  return names[status];
}

/**
 * Get status condition color for UI
 */
export function getStatusColor(status: StatusCondition): string {
  if (!status) return '#fff';
  const colors: Record<Exclude<StatusCondition, null>, string> = {
    paralyzed: '#f8d030',  // Yellow
    poisoned: '#a040a0',   // Purple
    burned: '#f08030',     // Orange
    frozen: '#98d8d8',     // Cyan
    asleep: '#a8a878'      // Gray
  };
  return colors[status];
}

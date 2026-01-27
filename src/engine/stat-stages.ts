// Stat Stages System
// Handles in-battle stat modifications (+1 to +6, -1 to -6)

// Stat stages range from -6 to +6
export type StatStage = -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Stat stages for a creature (excluding HP which can't be modified)
export interface StatStages {
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  // Accuracy and evasion could be added later
}

// Create fresh stat stages (all at 0)
export function createStatStages(): StatStages {
  return {
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0
  };
}

// Stat stage multipliers (Pokemon standard)
// Stage -6: 2/8, -5: 2/7, -4: 2/6, -3: 2/5, -2: 2/4, -1: 2/3
// Stage 0: 2/2, +1: 3/2, +2: 4/2, +3: 5/2, +4: 6/2, +5: 7/2, +6: 8/2
const STAGE_MULTIPLIERS: Record<number, number> = {
  [-6]: 2/8,
  [-5]: 2/7,
  [-4]: 2/6,
  [-3]: 2/5,
  [-2]: 2/4,
  [-1]: 2/3,
  [0]: 1,
  [1]: 3/2,
  [2]: 4/2,
  [3]: 5/2,
  [4]: 6/2,
  [5]: 7/2,
  [6]: 8/2
};

/**
 * Get the multiplier for a given stat stage
 */
export function getStageMultiplier(stage: number): number {
  const clampedStage = Math.max(-6, Math.min(6, stage));
  return STAGE_MULTIPLIERS[clampedStage] || 1;
}

/**
 * Apply a stat stage change, clamping to valid range
 * Returns the actual change applied and whether it was capped
 */
export function applyStatChange(
  stages: StatStages,
  stat: keyof StatStages,
  change: number
): { newStage: number; actualChange: number; capped: boolean } {
  const oldStage = stages[stat];
  const newStage = Math.max(-6, Math.min(6, oldStage + change));
  const actualChange = newStage - oldStage;

  stages[stat] = newStage;

  return {
    newStage,
    actualChange,
    capped: actualChange !== change
  };
}

/**
 * Get the effective stat value after applying stage modifier
 */
export function getEffectiveStat(baseStat: number, stage: number): number {
  return Math.floor(baseStat * getStageMultiplier(stage));
}

/**
 * Get message for stat change
 */
export function getStatChangeMessage(
  creatureName: string,
  stat: keyof StatStages,
  change: number,
  capped: boolean
): string {
  const statNames: Record<keyof StatStages, string> = {
    attack: 'Attack',
    defense: 'Defense',
    spAttack: 'Sp. Atk',
    spDefense: 'Sp. Def',
    speed: 'Speed'
  };

  const statName = statNames[stat];

  if (capped) {
    if (change > 0) {
      return `${creatureName}'s ${statName} won't go any higher!`;
    } else {
      return `${creatureName}'s ${statName} won't go any lower!`;
    }
  }

  const absChange = Math.abs(change);
  if (change > 0) {
    if (absChange === 1) {
      return `${creatureName}'s ${statName} rose!`;
    } else if (absChange === 2) {
      return `${creatureName}'s ${statName} rose sharply!`;
    } else {
      return `${creatureName}'s ${statName} rose drastically!`;
    }
  } else {
    if (absChange === 1) {
      return `${creatureName}'s ${statName} fell!`;
    } else if (absChange === 2) {
      return `${creatureName}'s ${statName} harshly fell!`;
    } else {
      return `${creatureName}'s ${statName} severely fell!`;
    }
  }
}

/**
 * Reset all stat stages to 0 (when switching out or battle ends)
 */
export function resetStatStages(stages: StatStages): void {
  stages.attack = 0;
  stages.defense = 0;
  stages.spAttack = 0;
  stages.spDefense = 0;
  stages.speed = 0;
}

// Battle AI - Smart move selection for enemy creatures
import type { CreatureInstance, Move } from '../types/index.ts';
import { getTypeEffectiveness } from '../data/type-chart.ts';

// AI difficulty levels
export type AIDifficulty = 'random' | 'easy' | 'medium' | 'hard';

interface MoveScore {
  moveIndex: number;
  score: number;
  move: Move;
}

/**
 * Select a move for the AI to use
 * @param attacker The creature making the move
 * @param defender The target creature
 * @param difficulty AI difficulty level
 * @returns The index of the selected move
 */
export function selectAIMove(
  attacker: CreatureInstance,
  defender: CreatureInstance,
  difficulty: AIDifficulty = 'medium'
): number {
  // Filter to moves with PP remaining
  const usableMoves = attacker.moves
    .map((m, i) => ({ move: m, index: i }))
    .filter(({ move }) => move.currentPp > 0);

  // If no moves have PP, use struggle (index 0 as fallback)
  if (usableMoves.length === 0) {
    return 0;
  }

  // Random AI just picks randomly
  if (difficulty === 'random') {
    return usableMoves[Math.floor(Math.random() * usableMoves.length)].index;
  }

  // Score each move
  const scoredMoves: MoveScore[] = usableMoves.map(({ move, index }) => ({
    moveIndex: index,
    score: scoreMoveForAI(attacker, defender, move.move, difficulty),
    move: move.move
  }));

  // Sort by score descending
  scoredMoves.sort((a, b) => b.score - a.score);

  // Add randomness based on difficulty
  const selectedMove = selectWithRandomness(scoredMoves, difficulty);

  return selectedMove.moveIndex;
}

/**
 * Score a move based on how good it would be to use
 */
function scoreMoveForAI(
  attacker: CreatureInstance,
  defender: CreatureInstance,
  move: Move,
  difficulty: AIDifficulty
): number {
  let score = 0;

  // Base power contribution
  if (move.power > 0) {
    score += move.power;

    // Type effectiveness multiplier (very important)
    const effectiveness = getTypeEffectiveness(move.type, defender.species.types);
    if (effectiveness === 0) {
      // Immune - heavily penalize
      score = -1000;
      return score;
    } else if (effectiveness === 2) {
      // Super effective - big bonus
      score *= 2.0;
      if (difficulty === 'hard') score *= 1.2; // Hard AI values super effective more
    } else if (effectiveness === 0.5) {
      // Not very effective - reduce score
      score *= 0.5;
    }

    // STAB bonus (Same Type Attack Bonus)
    const hasStab = attacker.species.types.includes(move.type);
    if (hasStab) {
      score *= 1.5;
    }

    // Accuracy factor
    const accuracy = move.accuracy ?? 100;
    score *= (accuracy / 100);

    // Category matching - physical attackers should use physical moves
    if (difficulty === 'hard' || difficulty === 'medium') {
      if (move.category === 'physical' && attacker.stats.attack > attacker.stats.spAttack) {
        score *= 1.1;
      } else if (move.category === 'special' && attacker.stats.spAttack > attacker.stats.attack) {
        score *= 1.1;
      }
    }
  }

  // Status moves
  if (move.category === 'status') {
    score = scoreStatusMove(attacker, defender, move, difficulty);
  }

  // Secondary effects bonus
  if (move.secondaryEffect) {
    const effectChance = move.secondaryEffect.chance ?? 0;

    // Status infliction
    if (move.secondaryEffect.status && !defender.status) {
      score += 15 * (effectChance / 100);
    }

    // Stat changes
    if (move.secondaryEffect.statChanges) {
      score += 10 * (effectChance / 100);
    }

    // Flinch (only useful if going first, but we don't know that here)
    if (move.secondaryEffect.flinch) {
      score += 8 * (effectChance / 100);
    }
  }

  // Priority moves get a small bonus when defender is low HP
  if (move.priority && move.priority > 0) {
    const defenderHpPercent = defender.currentHp / defender.maxHp;
    if (defenderHpPercent < 0.3) {
      score *= 1.3; // Priority is valuable for finishing off
    }
  }

  return score;
}

/**
 * Score status moves
 */
function scoreStatusMove(
  attacker: CreatureInstance,
  defender: CreatureInstance,
  move: Move,
  difficulty: AIDifficulty
): number {
  let score = 30; // Base score for status moves

  // Check move effects
  if (move.effect) {
    // Stat boosting moves
    if (move.effect.type === 'stat-change' && move.effect.target === 'self') {
      const attackerHpPercent = attacker.currentHp / attacker.maxHp;

      // Only use stat boosts if HP is reasonably high
      if (attackerHpPercent > 0.5) {
        score += 40;
        if (difficulty === 'hard') score += 20;
      } else {
        score -= 20; // Don't waste time boosting if low HP
      }
    }

    // Stat lowering moves (target enemy)
    if (move.effect.type === 'stat-change' && move.effect.target === 'enemy') {
      score += 35;
    }

    // Status infliction
    if (move.effect.type === 'status' && move.effect.target === 'enemy') {
      if (defender.status) {
        // Already has a status - don't try to inflict another
        score = -100;
      } else {
        score += 50;

        // Paralysis is especially good against fast opponents
        if (move.effect.status === 'paralyzed' && defender.stats.speed > attacker.stats.speed) {
          score += 20;
        }
      }
    }

    // Healing moves
    if (move.effect.type === 'heal' && move.effect.target === 'self') {
      const attackerHpPercent = attacker.currentHp / attacker.maxHp;
      if (attackerHpPercent < 0.4) {
        score += 80; // Heal when low
      } else if (attackerHpPercent < 0.7) {
        score += 30;
      } else {
        score = -50; // Don't heal when near full HP
      }
    }
  }

  // Easy AI doesn't value status moves as much
  if (difficulty === 'easy') {
    score *= 0.5;
  }

  return score;
}

/**
 * Select a move with some randomness based on difficulty
 */
function selectWithRandomness(
  scoredMoves: MoveScore[],
  difficulty: AIDifficulty
): MoveScore {
  if (scoredMoves.length === 0) {
    throw new Error('No moves to select from');
  }

  if (scoredMoves.length === 1) {
    return scoredMoves[0];
  }

  // Determine how often to pick non-optimal moves
  let optimalChance: number;
  switch (difficulty) {
    case 'easy':
      optimalChance = 0.4; // 40% chance of best move
      break;
    case 'medium':
      optimalChance = 0.7; // 70% chance of best move
      break;
    case 'hard':
      optimalChance = 0.9; // 90% chance of best move
      break;
    default:
      optimalChance = 0.5;
  }

  // Check if we pick the optimal move
  if (Math.random() < optimalChance) {
    return scoredMoves[0];
  }

  // Otherwise, pick from top moves with weighted randomness
  // Only consider moves that aren't terrible (score > 0)
  const viableMoves = scoredMoves.filter(m => m.score > 0);
  if (viableMoves.length <= 1) {
    return scoredMoves[0];
  }

  // Weight by score
  const totalScore = viableMoves.reduce((sum, m) => sum + Math.max(m.score, 1), 0);
  let roll = Math.random() * totalScore;

  for (const move of viableMoves) {
    roll -= Math.max(move.score, 1);
    if (roll <= 0) {
      return move;
    }
  }

  return viableMoves[0];
}

/**
 * Get AI difficulty for a trainer battle
 * Can be customized per trainer in the future
 */
export function getTrainerAIDifficulty(trainerName?: string): AIDifficulty {
  // Gym leaders and important trainers are harder
  if (trainerName) {
    const name = trainerName.toLowerCase();
    if (name.includes('leader') || name.includes('elite') || name.includes('champion')) {
      return 'hard';
    }
    if (name.includes('ace') || name.includes('expert') || name.includes('veteran')) {
      return 'hard';
    }
  }

  // Default trainer difficulty
  return 'medium';
}

/**
 * Wild creatures use easier AI
 */
export function getWildAIDifficulty(): AIDifficulty {
  // Wild creatures are a bit unpredictable
  return 'easy';
}

import type { ElementType, CreatureInstance } from '../types/index.ts';
import { getItem } from './items.ts';
import { getMove } from './moves.ts';

// TM compatibility: which types can learn each TM
// Key is the TM item ID, value is array of compatible types
export const TM_COMPATIBILITY: Record<number, ElementType[]> = {
  // TM01 - Confusion (Psychic)
  50: ['psychic', 'fairy', 'ghost', 'deepsea', 'leviathan'],

  // TM02 - Thunderbolt (Electric)
  51: ['electric', 'steel', 'freshwater', 'leviathan'],

  // TM03 - Shadow Ball (Ghost)
  52: ['ghost', 'deepsea', 'psychic', 'poison'],

  // TM04 - Iron Tail (Steel)
  53: ['steel', 'shark', 'fighting', 'ground', 'fossil', 'leviathan'],

  // TM05 - Flame Burst (Fire)
  54: ['fire', 'leviathan', 'fighting'],

  // TM06 - Ice Fang (Ice)
  55: ['ice', 'shark', 'deepsea', 'freshwater', 'fighting', 'leviathan']
};

// Check if a creature can learn a TM
export function canLearnTM(creature: CreatureInstance, tmItemId: number): boolean {
  const compatibleTypes = TM_COMPATIBILITY[tmItemId];
  if (!compatibleTypes) return false;

  // Check if any of the creature's types are compatible
  return creature.species.types.some(type => compatibleTypes.includes(type));
}

// Get the move that a TM teaches
export function getTMMoveId(tmItemId: number): number | null {
  const item = getItem(tmItemId);
  if (!item || item.type !== 'tm' || !item.tmMoveId) return null;
  return item.tmMoveId;
}

// Check if creature already knows the move
export function alreadyKnowsMove(creature: CreatureInstance, moveId: number): boolean {
  return creature.moves.some(m => m.move.id === moveId);
}

// Teach a TM move to a creature
// Returns true if successful, false if failed
// If creature has 4 moves, replaceIndex must be provided (0-3)
export function teachTMMove(
  creature: CreatureInstance,
  tmItemId: number,
  replaceIndex?: number
): { success: boolean; message: string } {
  // Check compatibility
  if (!canLearnTM(creature, tmItemId)) {
    return { success: false, message: `${creature.species.name} can't learn this move!` };
  }

  // Get the move
  const moveId = getTMMoveId(tmItemId);
  if (!moveId) {
    return { success: false, message: 'Invalid TM!' };
  }

  const move = getMove(moveId);
  if (!move) {
    return { success: false, message: 'Move not found!' };
  }

  // Check if already knows
  if (alreadyKnowsMove(creature, moveId)) {
    return { success: false, message: `${creature.species.name} already knows ${move.name}!` };
  }

  // If creature has less than 4 moves, just add it
  if (creature.moves.length < 4) {
    creature.moves.push({
      move: move,
      currentPp: move.pp
    });
    return { success: true, message: `${creature.species.name} learned ${move.name}!` };
  }

  // Need to replace a move
  if (replaceIndex === undefined || replaceIndex < 0 || replaceIndex >= 4) {
    return { success: false, message: 'Must choose a move to replace!' };
  }

  const oldMoveName = creature.moves[replaceIndex].move.name;
  creature.moves[replaceIndex] = {
    move: move,
    currentPp: move.pp
  };

  return {
    success: true,
    message: `${creature.species.name} forgot ${oldMoveName} and learned ${move.name}!`
  };
}

// Get list of compatible party members for a TM
export function getCompatiblePartyMembers(
  party: CreatureInstance[],
  tmItemId: number
): { index: number; creature: CreatureInstance; canLearn: boolean; alreadyKnows: boolean }[] {
  const moveId = getTMMoveId(tmItemId);

  return party.map((creature, index) => ({
    index,
    creature,
    canLearn: canLearnTM(creature, tmItemId),
    alreadyKnows: moveId ? alreadyKnowsMove(creature, moveId) : false
  }));
}

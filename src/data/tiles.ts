import type { TileDef } from '../types/overworld.ts';

// Tile index constants
export const TILE = {
  FLOOR: 0,
  WALL: 1,
  WATER: 2,
  KELP: 3,
  DEEP: 4,
  SAND: 5,
  DOCK: 6,
  HEAL: 7
} as const;

// Tile definitions
export const TILES: Record<number, TileDef> = {
  [TILE.FLOOR]: {
    type: 'floor',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.WALL]: {
    type: 'wall',
    solid: true,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.WATER]: {
    type: 'water',
    solid: false,
    swimOnly: true,
    encounter: false,
    encounterRate: 0
  },
  [TILE.KELP]: {
    type: 'kelp',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 15  // 15% chance per step
  },
  [TILE.DEEP]: {
    type: 'deep',
    solid: true,       // Can't access without dive (later)
    swimOnly: true,
    encounter: false,
    encounterRate: 0
  },
  [TILE.SAND]: {
    type: 'sand',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.DOCK]: {
    type: 'dock',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.HEAL]: {
    type: 'heal',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0,
    heal: true
  }
};

export function getTileDef(tileIndex: number): TileDef {
  return TILES[tileIndex] || TILES[TILE.FLOOR];
}

export function canWalkOn(tileIndex: number, isSwimming: boolean): boolean {
  const tile = getTileDef(tileIndex);
  if (tile.solid) return false;
  if (tile.swimOnly && !isSwimming) return false;
  if (!tile.swimOnly && isSwimming) return false; // Can't swim on land
  return true;
}

export function shouldSwim(tileIndex: number): boolean {
  const tile = getTileDef(tileIndex);
  return tile.swimOnly;
}

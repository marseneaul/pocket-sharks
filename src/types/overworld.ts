import type { CreatureInstance } from './index.ts';

// Tile types
export type TileType = 'floor' | 'wall' | 'water' | 'kelp' | 'deep' | 'sand' | 'dock' | 'heal';

// Direction for player facing and movement
export type Direction = 'up' | 'down' | 'left' | 'right';

// Tile definition
export interface TileDef {
  type: TileType;
  solid: boolean;           // Blocks walking
  swimOnly: boolean;        // Only accessible while swimming
  encounter: boolean;       // Can trigger wild encounters
  encounterRate: number;    // 0-100 chance per step
  heal?: boolean;           // Heals party when stepped on
}

// Warp point to another map
export interface Warp {
  x: number;
  y: number;
  targetMap: string;
  targetX: number;
  targetY: number;
}

// Trainer definition for NPC battles
export interface TrainerData {
  name: string;
  team: { speciesId: number; level: number }[];
  defeatedDialogue: string[];
  prizeMoney: number;
}

// NPC definition
export interface NPC {
  id: string;
  x: number;
  y: number;
  sprite: number;
  facing: Direction;
  dialogue?: string[];
  trainer?: TrainerData;  // If present, NPC is a trainer
  defeated?: boolean;     // Tracks if trainer has been beaten
  isPcTerminal?: boolean; // If true, interacting opens PC storage
  shopId?: string;        // If present, interacting opens this shop
}

// Encounter table entry
export interface EncounterEntry {
  speciesId: number;
  minLevel: number;
  maxLevel: number;
  weight: number;
}

// Map data structure
export interface MapData {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: number[][];           // 2D array of tile indices
  warps: Warp[];
  npcs: NPC[];
  encounterTable: EncounterEntry[];
  isOutdoor: boolean;          // Affects rendering style
}

// Player state
export interface PlayerState {
  x: number;                   // Tile X position
  y: number;                   // Tile Y position
  pixelX: number;              // Pixel X for smooth movement
  pixelY: number;              // Pixel Y for smooth movement
  facing: Direction;
  isMoving: boolean;
  isSwimming: boolean;
  moveProgress: number;        // 0-1 for animation
  party: CreatureInstance[];
}

// Overworld state
export interface OverworldState {
  player: PlayerState;
  currentMap: MapData;
  maps: Map<string, MapData>;
}

// Game mode
export type GameMode = 'title' | 'settings' | 'overworld' | 'battle' | 'menu' | 'dialogue' | 'party-menu' | 'battle-party' | 'starter-select' | 'pc' | 'shop' | 'tm';

// Global game state
export interface GameState {
  mode: GameMode;
  overworld: OverworldState;
  // Battle state is managed separately in battle.ts
}

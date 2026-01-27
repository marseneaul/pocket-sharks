import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

// Test map designed specifically for the pixel art tileset
// This is a simple beach/dock scene to verify tile mappings look correct

// Tile shortcuts
const _ = TILE.WATER;      // Ocean water (blue)
const S = TILE.SAND;       // Sandy beach
const D = TILE.DOCK;       // Wooden dock
const R = TILE.ROCK;       // Rocks/boulders
const W = TILE.WALL;       // Rocky cliff wall
const T = TILE.PALM;       // Palm tree / vegetation
const F = TILE.FLOOR;      // Indoor floor
const H = TILE.HEAL;       // Healing spot
const G = TILE.SEAGRASS;   // Grass/vegetation

// 20x18 tiles - Simple beach scene
// Top = ocean, middle = beach, bottom = land with building
const tiles: number[][] = [
  // Ocean at top
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],

  // Beach/water edge with dock
  [_,_,_,_,_,_,D,D,D,D,D,D,_,_,_,_,_,_,_,_],
  [S,S,S,S,S,S,D,S,S,S,S,D,S,S,S,S,S,S,S,S],
  [S,S,S,S,S,S,D,S,S,S,S,D,S,S,S,S,S,S,S,S],

  // Beach with some rocks
  [S,S,R,S,S,S,D,S,S,S,S,D,S,S,S,R,R,S,S,S],
  [S,S,S,S,S,S,D,D,D,D,D,D,S,S,S,S,S,S,S,S],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],

  // Transition to grass/land
  [G,G,G,S,S,S,S,S,S,S,S,S,S,S,S,S,G,G,G,G],
  [G,T,G,G,S,S,S,S,S,S,S,S,S,S,S,G,G,T,G,G],

  // Land area with building
  [G,G,G,G,G,G,S,S,S,S,S,S,G,G,G,G,G,G,G,G],
  [W,W,W,W,W,G,G,G,G,G,G,G,G,W,W,W,W,W,G,G],
  [W,F,F,F,W,G,G,G,G,G,G,G,G,W,F,F,F,W,G,G],
  [W,F,H,F,W,G,G,G,G,G,G,G,G,W,F,F,F,W,G,G],
  [W,F,F,F,W,G,G,G,G,G,G,G,G,W,F,F,F,W,G,G],
  [W,W,F,W,W,G,G,G,G,G,G,G,G,W,W,F,W,W,G,G],
  [G,G,F,G,G,G,G,G,G,G,G,G,G,G,G,F,G,G,G,G],
];

export const TEST_BEACH: MapData = {
  id: 'test-beach',
  name: 'Test Beach',
  width: 20,
  height: 18,
  tiles,
  warps: [],
  npcs: [
    {
      id: 'test-npc',
      x: 10,
      y: 8,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'This is a test map!',
        'It demonstrates the tileset graphics.',
        'Water is blue, sand is tan, rocks are brown.'
      ]
    }
  ],
  encounterTable: [],
  isOutdoor: true
  // Note: Player starting position is set in main.ts
};

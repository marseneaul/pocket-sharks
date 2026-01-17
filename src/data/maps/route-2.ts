import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Rock walls
const A = TILE.WATER;  // Shallow water
const K = TILE.KELP;   // Kelp (encounters)
const S = TILE.SAND;   // Sandy beach
const F = TILE.FLOOR;  // Path/floor
const D = TILE.DOCK;   // Wooden dock

// 20x18 tiles - Route 2: Coral Passage
// Connects Route 1 to Coral Bay, mix of land and water paths
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,S,S,W,W,W,W,W,W,W,W,W],  // Top - connects to Route 1
  [W,S,S,S,S,S,F,F,F,F,F,F,F,F,S,S,S,S,S,W],
  [W,S,S,S,S,F,F,F,F,F,F,F,F,F,F,S,S,S,S,W],
  [W,S,A,A,S,F,F,W,W,F,F,W,W,F,F,S,A,A,S,W],
  [W,S,A,K,A,S,F,W,W,F,F,W,W,F,S,A,K,A,S,W],
  [W,S,A,A,A,S,S,S,S,F,F,S,S,S,S,A,A,A,S,W],
  [W,S,S,A,K,A,S,S,S,F,F,S,S,S,A,K,A,S,S,W],
  [W,S,S,S,A,A,A,S,S,F,F,S,S,A,A,A,S,S,S,W],
  [W,S,S,S,S,A,K,A,S,D,D,S,A,K,A,S,S,S,S,W],
  [W,S,S,S,S,S,A,A,A,D,D,A,A,A,S,S,S,S,S,W],
  [W,S,S,S,A,A,K,A,A,D,D,A,A,K,A,A,S,S,S,W],
  [W,S,A,A,A,K,A,A,A,D,D,A,A,A,K,A,A,A,S,W],
  [W,S,A,K,A,A,A,A,S,D,D,S,A,A,A,A,K,A,S,W],
  [W,S,A,A,A,A,S,S,S,D,D,S,S,S,A,A,A,A,S,W],
  [W,S,S,A,K,S,S,S,S,F,F,S,S,S,S,K,A,S,S,W],
  [W,S,S,S,S,S,S,S,F,F,F,F,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,W,W,W,W,W,S,S,W,W,W,W,W,W,W,W,W],  // Bottom - connects to Route 1
];

export const ROUTE_2: MapData = {
  id: 'route-2',
  name: 'Route 2 - Coral Passage',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North exit to Route 1 (exit top → appear at bottom)
    {
      x: 9,
      y: 0,
      targetMap: 'route-1',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'route-1',
      targetX: 10,
      targetY: 16
    },
    // South exit to Coral Bay (exit bottom → appear at top)
    {
      x: 9,
      y: 17,
      targetMap: 'coral-bay',
      targetX: 9,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'coral-bay',
      targetX: 10,
      targetY: 1
    }
  ],
  npcs: [
    // Team Finner grunts
    {
      id: 'finner-grunt-1',
      x: 9,
      y: 5,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'Hey! You there!',
        'We\'re Team Finner!',
        'Fins mean money, kid.',
        'Outta our way!'
      ],
      trainer: {
        name: 'Finner Grunt',
        team: [
          { speciesId: 13, level: 8 }   // Puptooth
        ],
        defeatedDialogue: [
          'Tch! You got lucky!',
          'The boss won\'t be',
          'happy about this...'
        ],
        prizeMoney: 160
      }
    },
    {
      id: 'finner-grunt-2',
      x: 10,
      y: 5,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'Heh heh...',
        'The boss has big plans.',
        'These sharks are worth',
        'a fortune on the market!'
      ],
      trainer: {
        name: 'Finner Grunt',
        team: [
          { speciesId: 12, level: 7 },  // Sandswim
          { speciesId: 14, level: 7 }   // Rayling
        ],
        defeatedDialogue: [
          'Argh! Fine!',
          'But Team Finner',
          'will remember this!'
        ],
        prizeMoney: 140
      }
    }
  ],
  encounterTable: [
    { speciesId: 13, minLevel: 4, maxLevel: 6, weight: 30 },  // Nurse Shark (common)
    { speciesId: 14, minLevel: 4, maxLevel: 6, weight: 25 },  // Atlantic Stingray (common)
    { speciesId: 12, minLevel: 5, maxLevel: 7, weight: 20 },  // Lemon Shark (uncommon)
    { speciesId: 15, minLevel: 5, maxLevel: 7, weight: 15 },  // Lanternshark (uncommon)
    { speciesId: 19, minLevel: 6, maxLevel: 8, weight: 10 }   // Spinner Shark (rare)
  ],
  isOutdoor: true
};

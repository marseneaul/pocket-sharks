import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Rock walls
const A = TILE.WATER;  // Shallow water
const K = TILE.KELP;   // Kelp (encounters)
const S = TILE.SAND;   // Sandy areas
const F = TILE.FLOOR;  // Path/floor
const D = TILE.DOCK;   // Wooden dock/pier

// 20x18 tiles - Route 4: Harbor Shallows
// Connects Kelp Harbor (west) to Finner HQ (east)
// Shallow water route with fishing docks
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Top boundary
  [W,S,S,S,S,S,S,S,D,D,D,D,S,S,S,S,S,S,S,W],
  [W,S,S,A,A,A,S,S,D,D,D,D,S,S,A,A,A,S,S,W],
  [W,S,A,A,K,A,A,S,D,D,D,D,S,A,A,K,A,A,S,W],
  [W,S,A,K,A,A,A,A,D,D,D,D,A,A,A,A,K,A,S,W],
  [W,A,A,A,A,K,A,A,A,A,A,A,A,A,K,A,A,A,A,W],
  [W,A,K,A,A,A,A,A,A,A,A,A,A,A,A,A,A,K,A,W],
  [W,A,A,A,A,A,K,A,A,A,A,A,A,K,A,A,A,A,A,W],
  [W,A,A,K,A,A,A,A,A,A,A,A,A,A,A,A,K,A,A,W],
  [F,F,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,F,F],  // West/East exits (y=9)
  [F,F,A,A,K,A,A,A,A,A,A,A,A,A,A,K,A,A,F,F],  // West/East exits (y=10)
  [W,A,A,A,A,A,A,K,A,A,A,A,K,A,A,A,A,A,A,W],
  [W,A,K,A,A,A,A,A,A,A,A,A,A,A,A,A,A,K,A,W],
  [W,S,A,A,A,K,A,A,A,A,A,A,A,A,K,A,A,A,S,W],
  [W,S,S,A,A,A,A,K,A,A,A,A,K,A,A,A,A,S,S,W],
  [W,S,S,S,A,A,A,A,A,A,A,A,A,A,A,A,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Bottom boundary
];

export const ROUTE_4: MapData = {
  id: 'route-4',
  name: 'Route 4 - Harbor Shallows',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West exit to Kelp Harbor (exit left → appear at right)
    {
      x: 0,
      y: 9,
      targetMap: 'kelp-harbor',
      targetX: 18,
      targetY: 9
    },
    {
      x: 0,
      y: 10,
      targetMap: 'kelp-harbor',
      targetX: 18,
      targetY: 10
    },
    // East exit to Finner HQ (exit right → appear at left)
    {
      x: 19,
      y: 9,
      targetMap: 'finner-hq',
      targetX: 1,
      targetY: 15
    },
    {
      x: 19,
      y: 10,
      targetMap: 'finner-hq',
      targetX: 1,
      targetY: 16
    }
  ],
  npcs: [
    // Fisher on dock
    {
      id: 'route4-fisher1',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The fishing used to be',
        'great here...',
        'But Team Finner scared',
        'all the sharks away!'
      ],
      trainer: {
        name: 'Fisher Wade',
        team: [
          { speciesId: 15, level: 14 },  // Lanternshark
          { speciesId: 14, level: 14 }   // Rayling
        ],
        defeatedDialogue: [
          'Good battle!',
          'Be careful heading',
          'east... Finners there.'
        ],
        prizeMoney: 448
      }
    },
    // Swimmer in water
    {
      id: 'route4-swimmer',
      x: 6,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I saw some shady guys',
        'in matching outfits',
        'heading to that old',
        'warehouse to the east.'
      ],
      trainer: {
        name: 'Swimmer Reef',
        team: [
          { speciesId: 19, level: 15 },  // Spinner Shark
          { speciesId: 28, level: 15 }   // Southern Stingray
        ],
        defeatedDialogue: [
          'Nice sharks!',
          'You might be able to',
          'stop those crooks!'
        ],
        prizeMoney: 300
      }
    },
    // Diver near east exit
    {
      id: 'route4-diver',
      x: 14,
      y: 12,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'That building ahead',
        'is Team Finner\'s base!',
        'They\'re capturing sharks',
        'for their fins!',
        'Someone needs to stop them!'
      ],
      trainer: {
        name: 'Diver Marina',
        team: [
          { speciesId: 20, level: 16 },  // Bull Shark
          { speciesId: 15, level: 15 },  // Lanternshark
          { speciesId: 18, level: 15 }   // Coral Catshark
        ],
        defeatedDialogue: [
          'You\'re strong!',
          'Please, go stop those',
          'Finners!'
        ],
        prizeMoney: 512
      }
    },
    // Warning sign NPC
    {
      id: 'route4-warning',
      x: 16,
      y: 9,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Warning: Team Finner',
        'activity reported ahead.',
        'Proceed with caution!'
      ]
    }
  ],
  encounterTable: [
    { speciesId: 15, minLevel: 12, maxLevel: 15, weight: 30 },  // Lanternshark (common)
    { speciesId: 26, minLevel: 13, maxLevel: 16, weight: 20 },  // Torpedo Ray (uncommon)
    { speciesId: 19, minLevel: 12, maxLevel: 15, weight: 20 },  // Spinner Shark (uncommon)
    { speciesId: 17, minLevel: 14, maxLevel: 16, weight: 15 },  // Greenland Shark (uncommon)
    { speciesId: 32, minLevel: 15, maxLevel: 17, weight: 10 },  // Velvet Lanternshark (rare)
    { speciesId: 21, minLevel: 16, maxLevel: 18, weight: 5 }    // Bull Shark (rare)
  ],
  isOutdoor: true
};

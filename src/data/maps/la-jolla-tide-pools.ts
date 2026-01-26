import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Rocky cliffs
const S = TILE.SAND;
const T = TILE.TIDE_POOL;
const A = TILE.WATER;
const F = TILE.FLOOR;  // Walkable path back to La Jolla Shores

// 20x18 tiles = 160x144 pixels
// La Jolla Tide Pools - Wading area with high encounter rates
// Famous real-world location for marine life viewing
// Layout: Rocky coastline with scattered tide pools
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // North cliffs
  [W,W,W,T,T,T,W,W,T,T,T,W,W,T,T,W,W,W,W,W],
  [W,W,T,T,T,T,T,W,T,T,T,T,W,T,T,T,W,W,W,W],
  [W,S,T,T,T,T,T,S,T,T,T,T,S,T,T,T,S,W,W,W],
  [W,S,S,T,T,T,S,S,S,T,T,S,S,S,T,T,S,S,W,W],
  [W,W,S,S,T,S,S,S,S,S,S,S,S,S,S,T,S,S,W,W],
  [W,W,W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,S,S,S,T,T,T,S,S,S,T,T,S,S,S,S,W],
  [W,W,W,W,S,S,T,T,T,T,T,S,T,T,T,T,S,S,S,F],  // East exit to La Jolla Shores
  [W,W,W,S,S,S,T,T,T,T,T,S,T,T,T,T,S,S,S,F],
  [W,W,W,S,S,S,S,T,T,T,S,S,S,T,T,S,S,S,S,W],
  [W,W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W,W],
  [W,S,S,S,T,T,S,S,S,S,S,S,S,S,T,T,S,S,W,W],
  [W,S,T,T,T,T,T,S,S,S,S,S,S,T,T,T,T,S,W,W],
  [W,W,T,T,T,T,W,S,S,S,S,S,W,T,T,T,W,W,W,W],
  [W,W,W,T,T,W,W,W,S,S,S,W,W,W,T,W,W,W,W,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],  // Ocean to south (can't go further)
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
];

export const LA_JOLLA_TIDE_POOLS: MapData = {
  id: 'la-jolla-tide-pools',
  name: 'La Jolla Tide Pools',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // East exit back to La Jolla Shores
    {
      x: 19,
      y: 8,
      targetMap: 'la-jolla-shores',
      targetX: 1,
      targetY: 6
    },
    {
      x: 19,
      y: 9,
      targetMap: 'la-jolla-shores',
      targetX: 1,
      targetY: 7
    }
  ],
  npcs: [
    // Marine biologist studying tide pools
    {
      id: 'tide-pool-researcher',
      x: 5,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The tide pools here are a marine sanctuary.',
        'You can find Round Stingrays, Horn Shark eggs...',
        'Even baby Leopard Sharks sometimes!',
        'Be careful where you step!'
      ]
    },
    // Kid looking at tide pools
    {
      id: 'tide-pool-kid',
      x: 14,
      y: 8,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I found a shark egg!',
        'Mom says it\'s called a mermaid\'s purse.',
        'If I leave it here, a baby shark will hatch!'
      ]
    },
    // Trainer battle - Tide Pool Enthusiast
    {
      id: 'trainer-tide-pool',
      x: 9,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I\'ve been studying tide pool creatures!',
        'Let me show you what I\'ve caught!'
      ],
      trainer: {
        name: 'Tide Pool Emma',
        team: [
          { speciesId: 47, level: 4 },  // Round Stingray
          { speciesId: 51, level: 5 }   // Horn Shark
        ],
        defeatedDialogue: [
          'Wow, your shark is strong!',
          'I need to train more in these pools.'
        ],
        prizeMoney: 80
      }
    },
    // Warning sign NPC (static sign)
    {
      id: 'warning-sign',
      x: 9,
      y: 15,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'MARINE PROTECTED AREA',
        'Do not disturb wildlife.',
        'No collecting shells or animals.',
        '- City of San Diego'
      ]
    }
  ],
  // High encounter rate in tide pools - San Diego baby sharks and rays
  encounterTable: [
    { speciesId: 47, minLevel: 2, maxLevel: 5, weight: 40 },  // Round Stingray (common)
    { speciesId: 48, minLevel: 3, maxLevel: 6, weight: 25 },  // Smoothhound
    { speciesId: 54, minLevel: 4, maxLevel: 6, weight: 20 },  // Guitarfish
    { speciesId: 51, minLevel: 4, maxLevel: 6, weight: 10 },  // Horn Shark (uncommon)
    { speciesId: 68, minLevel: 5, maxLevel: 7, weight: 5 }    // Scalloped Bonnethead (very rare)
  ],
  // Collectible eggs found on the ground
  groundEggs: [
    { id: 'tide-pool-horn-egg-1', x: 4, y: 3, eggId: 1, collected: false },   // Horn Shark Egg
    { id: 'tide-pool-swell-egg-1', x: 14, y: 8, eggId: 2, collected: false }  // Swell Shark Egg
  ],
  isOutdoor: true
};

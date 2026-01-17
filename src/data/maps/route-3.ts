import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Rock walls / Coral formations
const A = TILE.WATER;  // Shallow water
const K = TILE.KELP;   // Kelp (encounters)
const S = TILE.SAND;   // Sandy areas
const F = TILE.FLOOR;  // Path/floor
const D = TILE.DOCK;   // Wooden dock/bridges

// 20x18 tiles - Route 3: Coral Reef Pass
// Connects Coral Bay (west) to Kelp Harbor (east)
// Features a blocked Coral Cave entrance
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Top boundary
  [W,S,S,F,F,D,D,D,D,D,D,D,D,D,D,F,F,S,S,W],
  [W,S,F,F,F,D,A,A,K,A,A,K,A,A,D,F,F,F,S,W],
  [F,F,F,S,A,A,A,K,A,A,A,A,K,A,A,A,S,F,F,F],  // West/East exits (y=3)
  [F,F,S,A,A,K,A,A,A,A,A,A,A,A,K,A,A,S,F,F],  // West/East exits (y=4)
  [W,S,A,A,K,A,A,W,W,W,W,W,W,A,A,K,A,A,S,W],  // Coral Cave walls
  [W,S,A,K,A,A,A,W,F,F,F,F,W,A,A,A,K,A,S,W],  // Cave entrance row
  [W,A,A,A,A,A,A,W,W,W,W,W,W,A,A,A,A,A,A,W],  // Cave blocked
  [W,A,K,A,A,A,A,A,A,A,A,A,A,A,A,A,A,K,A,W],
  [W,A,A,A,K,A,A,A,A,A,A,A,A,A,A,K,A,A,A,W],
  [W,S,A,K,A,A,A,A,A,A,A,A,A,A,A,A,K,A,S,W],
  [W,S,A,A,A,K,A,A,A,A,A,A,A,A,K,A,A,A,S,W],
  [W,S,S,A,A,A,A,K,A,A,A,A,K,A,A,A,A,S,S,W],
  [W,S,S,S,A,A,K,A,A,D,D,A,A,K,A,A,S,S,S,W],
  [W,S,S,F,F,A,A,A,A,D,D,A,A,A,A,F,F,S,S,W],
  [W,S,F,F,F,F,D,D,D,D,D,D,D,D,F,F,F,F,S,W],
  [W,S,S,F,F,F,F,F,F,F,F,F,F,F,F,F,F,S,S,W],
  [W,W,W,S,S,W,W,W,W,W,W,W,W,W,W,S,S,W,W,W],  // Bottom boundary
];

export const ROUTE_3: MapData = {
  id: 'route-3',
  name: 'Route 3 - Coral Reef Pass',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West exit to Coral Bay
    {
      x: 0,
      y: 3,
      targetMap: 'coral-bay',
      targetX: 18,
      targetY: 5
    },
    {
      x: 0,
      y: 4,
      targetMap: 'coral-bay',
      targetX: 18,
      targetY: 6
    },
    // East exit to Kelp Harbor
    {
      x: 19,
      y: 3,
      targetMap: 'kelp-harbor',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 4,
      targetMap: 'kelp-harbor',
      targetX: 1,
      targetY: 10
    }
  ],
  npcs: [
    // Fisher trainer near west entrance
    {
      id: 'route3-fisher',
      x: 5,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The waters here are',
        'full of life!',
        'Let me show you what',
        'I\'ve caught!'
      ],
      trainer: {
        name: 'Fisher Finn',
        team: [
          { speciesId: 28, level: 10 },  // Southern Stingray
          { speciesId: 13, level: 10 }   // Nurse Shark
        ],
        defeatedDialogue: [
          'Nice battling!',
          'The reef has many',
          'strong sharks.'
        ],
        prizeMoney: 320
      }
    },
    // Swimmer in the middle
    {
      id: 'route3-swimmer',
      x: 10,
      y: 9,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I love swimming with',
        'the spinner sharks!',
        'They\'re so graceful!'
      ],
      trainer: {
        name: 'Swimmer Coral',
        team: [
          { speciesId: 19, level: 12 }   // Spinner Shark
        ],
        defeatedDialogue: [
          'Wow, you\'re strong!',
          'Keep heading east to',
          'reach Kelp Harbor.'
        ],
        prizeMoney: 240
      }
    },
    // Diver near east side
    {
      id: 'route3-diver',
      x: 14,
      y: 12,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I dive deep to find',
        'rare sharks!',
        'Want to see what I',
        'discovered?'
      ],
      trainer: {
        name: 'Diver Deep',
        team: [
          { speciesId: 12, level: 11 },  // Lemon Shark
          { speciesId: 18, level: 11 }   // Coral Catshark
        ],
        defeatedDialogue: [
          'Your sharks are',
          'impressive!',
          'Good luck at the gym!'
        ],
        prizeMoney: 352
      }
    },
    // Team Finner blocking cave entrance
    {
      id: 'finner-cave-guard1',
      x: 8,
      y: 6,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'Hey! This cave is',
        'off limits!',
        'Team Finner business.',
        'Scram, kid!'
      ]
    },
    {
      id: 'finner-cave-guard2',
      x: 11,
      y: 6,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'Nothing to see here!',
        'Just some... uh...',
        'cave exploration!',
        'Yeah, that\'s it!'
      ]
    },
    // Info NPC
    {
      id: 'route3-info',
      x: 3,
      y: 15,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Kelp Harbor is east!',
        'They have an Electric',
        'type gym there.',
        'Captain Volt is tough!'
      ]
    }
  ],
  encounterTable: [
    { speciesId: 13, minLevel: 8, maxLevel: 11, weight: 30 },   // Nurse Shark (common)
    { speciesId: 28, minLevel: 8, maxLevel: 11, weight: 25 },   // Southern Stingray (common)
    { speciesId: 19, minLevel: 10, maxLevel: 12, weight: 20 },  // Spinner Shark (uncommon)
    { speciesId: 18, minLevel: 9, maxLevel: 11, weight: 15 },   // Coral Catshark (uncommon)
    { speciesId: 15, minLevel: 10, maxLevel: 12, weight: 10 }   // Lanternshark (rare)
  ],
  isOutdoor: true
};

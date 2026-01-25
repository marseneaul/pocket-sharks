import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;     // Shallow water (wading/snorkel)
const K = TILE.KELP;      // Kelp beds (encounters, wading level)
const R = TILE.REEF;      // Reef areas (requires openwater cert)
const D = TILE.DEEP;      // Deep water (visual blocker)
const C = TILE.CORAL;     // Coral formations
const G = TILE.SEAGRASS;  // Seagrass beds

// 20x18 tiles = 160x144 pixels
// Kelp Forest Route - Main underwater route from La Jolla to San Diego Bay
// Famous kelp forests of San Diego/La Jolla
// Deep water areas are blocked until player gets SCUBA certification
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from La Jolla
  [W,A,A,G,K,K,A,A,A,A,A,A,A,A,K,K,G,A,A,W],
  [W,A,A,K,K,K,K,A,A,G,G,A,A,K,K,K,A,A,A,W],
  [W,A,A,K,K,K,K,A,A,A,A,A,A,K,K,K,K,A,A,W],
  [W,A,G,A,K,K,A,A,A,A,A,A,A,A,K,K,A,G,A,W],
  [W,A,A,A,A,A,A,A,D,D,D,D,A,A,A,A,A,A,A,W],  // Deep water pocket (blocked)
  [W,K,K,A,A,A,A,D,D,C,C,D,D,A,A,A,A,K,K,W],  // Coral in deep area (needs cert)
  [W,K,K,K,A,A,A,D,C,R,R,C,D,A,A,A,K,K,K,W],
  [W,K,K,A,A,A,A,D,C,R,R,C,D,A,A,A,A,K,K,W],
  [W,A,A,A,A,A,A,D,D,C,C,D,D,A,A,A,A,A,A,W],
  [W,A,A,A,A,G,A,A,D,D,D,D,A,A,G,A,A,A,A,W],
  [W,A,A,K,K,K,A,A,A,A,A,A,A,A,K,K,K,A,A,W],
  [W,A,K,K,K,K,K,A,A,G,G,A,A,K,K,K,K,K,A,W],
  [W,A,A,K,K,K,A,A,A,A,A,A,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,A,A,A,A,A,A,A,A,A,A,K,A,A,A,W],
  [W,A,A,A,A,A,G,A,A,A,A,A,A,G,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South exit to San Diego Bay
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const KELP_FOREST_ROUTE: MapData = {
  id: 'kelp-forest-route',
  name: 'Kelp Forest',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from La Jolla Shores
    {
      x: 8,
      y: 0,
      targetMap: 'la-jolla-shores',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'la-jolla-shores',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'la-jolla-shores',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'la-jolla-shores',
      targetX: 11,
      targetY: 16
    },
    // South exit to San Diego Bay
    {
      x: 8,
      y: 17,
      targetMap: 'san-diego-bay',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'san-diego-bay',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'san-diego-bay',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'san-diego-bay',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Swimmer trainer near entrance
    {
      id: 'trainer-swimmer-1',
      x: 5,
      y: 3,
      sprite: 0,
      facing: 'right',
      spriteType: 'swimmer',
      dialogue: [
        'The kelp forest is amazing!',
        'Let\'s battle among the kelp!'
      ],
      trainer: {
        name: 'Swimmer Jake',
        team: [
          { speciesId: 48, level: 6 },  // Smoothhound
          { speciesId: 57, level: 6 }   // Butterfly Ray
        ],
        defeatedDialogue: [
          'Nice swimming!',
          'The kelp beds hide so many sharks.'
        ],
        prizeMoney: 120
      }
    },
    // Snorkeler trainer in middle area
    {
      id: 'trainer-snorkeler',
      x: 14,
      y: 8,
      sprite: 0,
      facing: 'left',
      spriteType: 'swimmer',
      dialogue: [
        'I\'ve been snorkeling here all day!',
        'My sharks are ready for battle!'
      ],
      trainer: {
        name: 'Snorkeler Mia',
        team: [
          { speciesId: 51, level: 7 },  // Horn Shark
          { speciesId: 53, level: 7 },  // Swell Shark
          { speciesId: 49, level: 8 }   // Leopard Shark
        ],
        defeatedDialogue: [
          'You\'re a strong trainer!',
          'I bet you\'ll do great at the gym.'
        ],
        prizeMoney: 160
      }
    },
    // NPC near deep water - hints about certification
    {
      id: 'diver-blocked',
      x: 5,
      y: 6,
      sprite: 0,
      facing: 'right',
      spriteType: 'diver',
      dialogue: [
        'That deep water area has an amazing reef!',
        'But you need Open Water SCUBA certification to dive there.',
        'I heard you can get certified in Hawaii...'
      ]
    },
    // Swimmer near south exit
    {
      id: 'trainer-swimmer-2',
      x: 3,
      y: 13,
      sprite: 0,
      facing: 'right',
      spriteType: 'swimmer',
      dialogue: [
        'San Diego Bay is just south of here.',
        'That\'s where Ray\'s Gym is!',
        'But first, let\'s see how strong you are!'
      ],
      trainer: {
        name: 'Swimmer Carlos',
        team: [
          { speciesId: 60, level: 8 },  // Bat Ray
          { speciesId: 54, level: 8 },  // Guitarfish
          { speciesId: 49, level: 9 }   // Leopard Shark
        ],
        defeatedDialogue: [
          'You\'ll definitely beat Ray!',
          'Just watch out for his rays - they\'re tricky.'
        ],
        prizeMoney: 180
      }
    },
    // Item finder NPC
    {
      id: 'kelp-diver',
      x: 16,
      y: 12,
      sprite: 0,
      facing: 'down',
      spriteType: 'diver',
      dialogue: [
        'I found this in the kelp. You can have it!',
        'Received a Potion!'
      ]
    }
  ],
  // Kelp forest encounters - San Diego Leopard Sharks, Swell Sharks, etc.
  encounterTable: [
    { speciesId: 49, minLevel: 5, maxLevel: 8, weight: 30 },   // Leopard Shark (kelp specialist)
    { speciesId: 53, minLevel: 5, maxLevel: 8, weight: 20 },   // Swell Shark
    { speciesId: 51, minLevel: 6, maxLevel: 8, weight: 15 },   // Horn Shark
    { speciesId: 60, minLevel: 5, maxLevel: 7, weight: 15 },   // Bat Ray
    { speciesId: 55, minLevel: 6, maxLevel: 8, weight: 10 },   // Giant Guitarfish
    { speciesId: 67, minLevel: 8, maxLevel: 10, weight: 5 },  // Broadnose Sevengill (rare - spring only once seasonal system implemented)
    { speciesId: 10, minLevel: 7, maxLevel: 9, weight: 5 },    // Bonnethead (uncommon)
    // SCUBA-only encounters in reef area (requires openwater cert)
    { speciesId: 61, minLevel: 10, maxLevel: 13, weight: 0, requiredCert: 'openwater' },  // Angelshark
    { speciesId: 62, minLevel: 10, maxLevel: 13, weight: 0, requiredCert: 'openwater' }   // Soupfin Shark
  ],
  isOutdoor: true,
  palette: 'tropical'  // Green/teal kelp forest colors
};

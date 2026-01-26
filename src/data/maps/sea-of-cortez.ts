import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const R = TILE.REEF;
const K = TILE.KELP;
const D = TILE.DEEP;

// 20x18 tiles = 160x144 pixels
// Sea of Cortez - Main route with hammerhead schools
// Famous for massive hammerhead aggregations
// Layout: Open water with reef patches and deep areas
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Beach
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,A,A,D,D,A,A,A,A,K,K,A,A,W],
  [W,A,A,K,K,K,A,A,D,D,D,D,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,A,A,D,D,R,R,D,D,A,A,K,A,A,A,W],  // Deep water with reef center
  [W,A,A,A,A,A,D,D,R,R,R,R,D,D,A,A,A,A,A,W],
  [W,A,A,A,A,D,D,R,R,R,R,R,R,D,D,A,A,A,A,W],
  [W,A,K,A,A,D,R,R,R,R,R,R,R,R,D,A,A,K,A,W],
  [W,A,K,K,A,D,R,R,R,R,R,R,R,R,D,A,K,K,A,W],
  [W,A,A,K,A,D,D,R,R,R,R,R,R,D,D,A,K,A,A,W],
  [W,A,A,A,A,A,D,D,R,R,R,R,D,D,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,D,D,D,D,D,D,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,A,A,D,D,A,A,A,A,K,K,A,A,W],
  [W,A,K,K,K,K,A,A,A,A,A,A,A,A,K,K,K,K,A,W],
  [W,A,A,K,K,A,A,A,A,A,A,A,A,A,A,K,K,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const SEA_OF_CORTEZ: MapData = {
  id: 'sea-of-cortez',
  name: 'Sea of Cortez',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Cabo Beach
    {
      x: 8,
      y: 0,
      targetMap: 'cabo-beach',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'cabo-beach',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'cabo-beach',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'cabo-beach',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Hammerhead enthusiast
    {
      id: 'trainer-hammer-1',
      x: 4,
      y: 4,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The Sea of Cortez is the hammerhead capital!',
        'Scalloped, smooth, bonnethead... all here!',
        'Let me show you my collection!'
      ],
      trainer: {
        name: 'Hammer Hunter Rico',
        team: [
          { speciesId: 10, level: 17 },  // Bonnethead
          { speciesId: 11, level: 18 },  // Scalloped Hammerhead
          { speciesId: 68, level: 18 }   // Smooth Hammerhead
        ],
        defeatedDialogue: [
          'Your psychic resistance is strong!',
          'Dr. Martillo is the ultimate hammerhead master though.'
        ],
        prizeMoney: 400
      }
    },
    // Thresher specialist
    {
      id: 'trainer-thresher',
      x: 15,
      y: 5,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I specialize in thresher sharks!',
        'Their tails are amazing weapons!'
      ],
      trainer: {
        name: 'Fisher Ana',
        team: [
          { speciesId: 70, level: 18 },  // Pelagic Thresher
          { speciesId: 69, level: 17 },  // Silky Shark
          { speciesId: 70, level: 19 }   // Pelagic Thresher
        ],
        defeatedDialogue: [
          'Whipped by your skills!',
          'You should challenge Dr. Martillo.'
        ],
        prizeMoney: 420
      }
    },
    // Deep diver
    {
      id: 'trainer-deep-diver',
      x: 5,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I dive deep where the big ones swim.',
        'The hammerheads school here by the hundreds!'
      ],
      trainer: {
        name: 'Deep Diver Jorge',
        team: [
          { speciesId: 11, level: 19 },  // Scalloped Hammerhead
          { speciesId: 21, level: 18 },  // Bull Shark
          { speciesId: 68, level: 19 },  // Smooth Hammerhead
          { speciesId: 11, level: 20 }   // Scalloped Hammerhead
        ],
        defeatedDialogue: [
          'Incredible battle!',
          'You\'re ready for the Cephalo Badge!'
        ],
        prizeMoney: 480
      }
    },
    // Team Finn encounter
    {
      id: 'finn-scientist',
      x: 10,
      y: 8,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Ah, another curious trainer.',
        'I\'m with Finnova Biotech. We\'re researching hammerheads.',
        'Our work will end wild shark finning forever!',
        'We grow shark fins sustainably in our labs.',
        '...',
        'Why are you looking at me like that?',
        'It\'s all perfectly legal, I assure you.'
      ]
    },
    // Conservationist NPC
    {
      id: 'conservationist',
      x: 14,
      y: 12,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The hammerhead schools used to be ten times larger.',
        'Every year, fewer and fewer return.',
        'Finnova claims they\'re helping, but...',
        'I\'ve seen their boats. Tagged sharks disappear.',
        'Something sinister is going on.'
      ]
    },
    // Direction to gym
    {
      id: 'gym-pointer',
      x: 3,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Dr. Martillo\'s gym is in Cabo Town.',
        'Head back north to the beach, then east.',
        'He\'s the hammerhead expert - very powerful!',
        'His Great Hammerhead is legendary.'
      ]
    }
  ],
  // Sea of Cortez encounters - hammerhead territory
  encounterTable: [
    { speciesId: 11, minLevel: 16, maxLevel: 20, weight: 25 },  // Scalloped Hammerhead
    { speciesId: 68, minLevel: 16, maxLevel: 20, weight: 20 },  // Smooth Hammerhead
    { speciesId: 10, minLevel: 15, maxLevel: 18, weight: 15 },  // Bonnethead
    { speciesId: 69, minLevel: 16, maxLevel: 19, weight: 15 },  // Silky Shark
    { speciesId: 70, minLevel: 17, maxLevel: 20, weight: 10 },  // Pelagic Thresher
    { speciesId: 21, minLevel: 18, maxLevel: 21, weight: 10, requiredCert: 'openwater' },  // Bull Shark
    { speciesId: 72, minLevel: 20, maxLevel: 23, weight: 5, requiredCert: 'openwater' }   // Great Hammerhead (rare)
  ],
  isOutdoor: true
};

import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const T = TILE.TIDE_POOL;

// 20x18 tiles = 160x144 pixels
// Cabo Beach - Shallow encounters area between harbor and town
// Layout: Beach with tide pools and shallow water
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,T,T,S,S,S,S,S,S,S,S,T,T,S,S,S,W],
  [W,S,S,T,T,T,T,S,S,S,S,S,S,T,T,T,T,S,S,W],
  [W,S,S,T,T,T,S,S,S,S,S,S,S,S,T,T,T,S,S,W],
  [W,S,S,S,T,S,S,S,S,S,S,S,S,S,S,T,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,F],  // West from Harbor, East to Town
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,F],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,T,T,S,S,S,S,S,S,S,S,T,T,S,S,S,W],
  [W,S,S,T,T,T,T,S,S,S,S,S,S,T,T,T,T,S,S,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to Sea of Cortez
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const CABO_BEACH: MapData = {
  id: 'cabo-beach',
  name: 'Cabo Beach',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West exit to Cabo Harbor
    {
      x: 0,
      y: 8,
      targetMap: 'cabo-harbor',
      targetX: 18,
      targetY: 9
    },
    {
      x: 0,
      y: 9,
      targetMap: 'cabo-harbor',
      targetX: 18,
      targetY: 10
    },
    // East exit to Cabo Town
    {
      x: 19,
      y: 8,
      targetMap: 'cabo-town',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 9,
      targetMap: 'cabo-town',
      targetX: 1,
      targetY: 10
    },
    // South exit to Sea of Cortez (swimming)
    {
      x: 8,
      y: 17,
      targetMap: 'sea-of-cortez',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'sea-of-cortez',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'sea-of-cortez',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'sea-of-cortez',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Beach trainer
    {
      id: 'trainer-beach-1',
      x: 6,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The tide pools here have different sharks than San Diego!',
        'Let me show you what I\'ve caught!'
      ],
      trainer: {
        name: 'Beachcomber Rosa',
        team: [
          { speciesId: 70, level: 14 },  // Mexican Horn Shark
          { speciesId: 71, level: 15 }   // Cownose Ray
        ],
        defeatedDialogue: [
          'Your sharks are well trained!',
          'The Sea of Cortez has even stronger ones!'
        ],
        prizeMoney: 280
      }
    },
    // Second trainer
    {
      id: 'trainer-beach-2',
      x: 13,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I love the electric rays here!',
        'They give quite a shock!'
      ],
      trainer: {
        name: 'Swimmer Miguel',
        team: [
          { speciesId: 72, level: 14 },  // Pacific Electric Ray
          { speciesId: 78, level: 15 },  // Tawny Nurse Shark
          { speciesId: 71, level: 15 }   // Cownose Ray
        ],
        defeatedDialogue: [
          'Shocking defeat!',
          'Dr. Martillo will be a real challenge.'
        ],
        prizeMoney: 300
      }
    },
    // NPC warning about Finnova
    {
      id: 'beach-local',
      x: 10,
      y: 6,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Have you seen the Finnova boats?',
        'They come out at night with huge nets.',
        'They say they\'re doing "research"...',
        'But why would research need so many shark fins?'
      ]
    },
    // Kid playing
    {
      id: 'beach-kid',
      x: 4,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I found a Mexican Horn Shark egg!',
        'They\'re different from the ones up north.',
        'The spines are bigger!'
      ]
    }
  ],
  // Cabo beach encounters
  encounterTable: [
    { speciesId: 78, minLevel: 12, maxLevel: 15, weight: 30 },  // Tawny Nurse Shark
    { speciesId: 70, minLevel: 12, maxLevel: 15, weight: 25 },  // Mexican Horn Shark
    { speciesId: 71, minLevel: 13, maxLevel: 16, weight: 20 },  // Cownose Ray
    { speciesId: 72, minLevel: 13, maxLevel: 16, weight: 15 },  // Pacific Electric Ray
    { speciesId: 1, minLevel: 14, maxLevel: 17, weight: 10 }    // Blacktip Reef Shark
  ],
  isOutdoor: true
};

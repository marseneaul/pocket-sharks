import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const D = TILE.DOCK;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Roatan Harbor - Caribbean return, submarine certification unlock
// Gateway to the deep sea and final confrontation
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,F,H,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,S],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,S],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,S],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,S],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const ROATAN_HARBOR: MapData = {
  id: 'roatan-harbor',
  name: 'Roatan Harbor',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to Abyssal Trench
    {
      x: 8,
      y: 17,
      targetMap: 'abyssal-trench',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'abyssal-trench',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'abyssal-trench',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'abyssal-trench',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Submarine captain
    {
      id: 'sub-captain',
      x: 2,
      y: 1,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Roatan, deep-sea explorer!',
        'I run the submarine expeditions here.',
        'The abyssal trench south of here...',
        'It goes down MILES into darkness.',
        'Creatures down there are like nothing else.',
        'Goblin Sharks, Frilled Sharks, Sixgills...',
        'Ready to see the deep?'
      ]
    },
    // Healing center nurse
    {
      id: 'nurse-roatan',
      x: 2,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Roatan!',
        'Rest your sharks before the deep dive.',
        'The abyss takes a toll on everyone.'
      ]
    },
    // Shop keeper
    {
      id: 'shop-roatan',
      x: 16,
      y: 5,
      sprite: 0,
      facing: 'down',
      shopId: 'roatan-shop',
      dialogue: [
        'Stock up! The deep sea has no shops!',
        'You\'ll need everything you can carry.'
      ]
    },
    // Deep sea researcher
    {
      id: 'deep-researcher',
      x: 10,
      y: 8,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I\'ve spent my life studying the abyss.',
        'The Goblin Shark has a jaw that shoots out!',
        'Frilled Sharks look like living fossils.',
        'And the Greenland Shark... 500 years old!',
        'The deep holds ancient secrets.'
      ]
    },
    // Final gym hint
    {
      id: 'gym-hint',
      x: 6,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Dr. Vance runs the Deepsea Gym.',
        'It\'s at the research base in the trench.',
        'He studies the most extreme sharks.',
        'Only the strongest trainers can reach him.',
        'Are you ready for the final challenge?'
      ]
    },
    // Team Finn finale hint
    {
      id: 'finn-finale',
      x: 14,
      y: 10,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Finnova\'s secret lab is in the deep...',
        'They\'re trying to resurrect Megalodon!',
        'Using DNA from fossils and genetics...',
        'If they succeed, they\'ll have unlimited fins.',
        'Someone has to stop them!'
      ]
    }
  ],
  encounterTable: [
    // Reef sharks in shallows
    { speciesId: 1, minLevel: 40, maxLevel: 48, weight: 30 },
    { speciesId: 4, minLevel: 40, maxLevel: 48, weight: 30 },
    { speciesId: 77, minLevel: 45, maxLevel: 52, weight: 20 },
    { speciesId: 5, minLevel: 45, maxLevel: 52, weight: 20 }
  ],
  isOutdoor: true
};

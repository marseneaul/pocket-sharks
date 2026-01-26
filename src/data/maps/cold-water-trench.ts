import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;       // Transition water
const D = TILE.DEEP_REEF;   // Deep trench water with encounters (requires advanced cert)
const R = TILE.REEF;        // Rocky reef areas

// 20x18 tiles = 160x144 pixels
// Cold Water Trench - Deep cold-water habitat
// Requires Advanced SCUBA certification
// Rare encounters: Pacific Sleeper Shark, Little Sleeper Shark
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Kelp Forest
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],  // Trench begins
  [W,A,D,R,R,D,D,D,D,D,D,D,D,D,D,R,R,D,A,W],
  [W,A,D,R,R,R,D,D,D,D,D,D,D,D,R,R,R,D,A,W],  // Rocky walls of trench
  [W,A,D,D,R,R,D,D,D,D,D,D,D,D,R,R,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],  // Deep trench floor
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,R,R,D,D,D,D,D,D,D,D,D,D,R,R,D,A,W],
  [W,A,D,R,R,R,D,D,D,D,D,D,D,D,R,R,R,D,A,W],  // More rocky outcrops
  [W,A,D,D,R,R,D,D,D,D,D,D,D,D,R,R,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Dead end - deepest point
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const COLD_WATER_TRENCH: MapData = {
  id: 'cold-water-trench',
  name: 'Cold Water Trench',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Pacific Kelp Forest
    {
      x: 8,
      y: 0,
      targetMap: 'pacific-kelp-forest',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'pacific-kelp-forest',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'pacific-kelp-forest',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'pacific-kelp-forest',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Deep-sea research submarine pilot
    {
      id: 'sub-pilot',
      x: 5,
      y: 5,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Cold Water Trench!',
        'This is one of the deepest accessible spots.',
        'Pacific Sleeper Sharks patrol these depths.',
        'They can grow over 20 feet long!'
      ]
    },
    // Extreme diver
    {
      id: 'extreme-diver',
      x: 14,
      y: 8,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The water here is near freezing!',
        'Only the hardiest sharks survive.',
        'Greenland Sharks are incredibly rare here.',
        'They can live for over 400 years!'
      ]
    },
    // Marine biologist
    {
      id: 'trench-biologist',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I\'m studying the sleeper sharks.',
        'They move slowly to conserve energy.',
        'But don\'t let that fool you - they\'re apex predators.',
        'They eat everything from fish to seals.'
      ]
    },
    // ROV operator
    {
      id: 'rov-operator',
      x: 6,
      y: 13,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'My ROV has spotted some amazing things.',
        'Sixgill sharks, sleeper sharks, ratfish...',
        'The deep ocean is full of mysteries.',
        'Most of it is still unexplored!'
      ]
    },
    // Conservation researcher
    {
      id: 'deep-conserve',
      x: 13,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Deep-sea sharks are vulnerable to overfishing.',
        'They grow slowly and reproduce late in life.',
        'Some species take decades to mature.',
        'We must protect these ancient creatures.'
      ]
    }
  ],
  encounterTable: [
    // Little Sleeper Shark - uncommon
    { speciesId: 84, minLevel: 28, maxLevel: 35, weight: 25 },  // Little Sleeper Shark
    // Pacific Sleeper Shark - rare apex predator
    { speciesId: 85, minLevel: 35, maxLevel: 45, weight: 10 },  // Pacific Sleeper Shark
    // Spiny Dogfish - still present
    { speciesId: 83, minLevel: 25, maxLevel: 32, weight: 35 },  // Spiny Dogfish
    // Iceland Catshark - cold water specialist
    { speciesId: 88, minLevel: 28, maxLevel: 35, weight: 20 },  // Iceland Catshark
    // Big Skate - bottom dweller
    { speciesId: 86, minLevel: 26, maxLevel: 33, weight: 10 }   // Big Skate
  ],
  isOutdoor: true
};

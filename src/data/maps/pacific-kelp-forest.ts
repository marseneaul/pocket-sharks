import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;     // Deep water
const K = TILE.KELP;      // Kelp forests with encounters
const R = TILE.REEF;      // Rocky reef areas

// 20x18 tiles = 160x144 pixels
// Pacific Kelp Forest - Cold water kelp ecosystem
// Encounters: Porbeagle, Salmon Shark, Winter Skate, Spiny Dogfish
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Puget Sound
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,K,K,K,A,A,A,A,A,A,A,A,A,K,K,K,A,A,W],
  [W,A,K,K,K,K,A,A,A,A,A,A,A,K,K,K,K,A,A,W],
  [W,A,K,K,K,K,K,A,A,A,A,A,K,K,K,K,K,A,A,W],  // Dense kelp forest
  [W,A,A,K,K,K,A,A,R,R,R,R,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,A,A,R,R,R,R,R,R,A,A,K,A,A,A,W],
  [W,A,A,A,A,A,R,R,R,R,R,R,R,R,A,A,A,A,A,W],  // Central rocky area
  [W,A,K,A,A,A,R,R,R,R,R,R,R,R,A,A,A,K,A,W],
  [W,A,K,K,A,A,R,R,R,R,R,R,R,R,A,A,K,K,A,W],
  [W,A,A,K,A,A,A,R,R,R,R,R,R,A,A,A,K,A,A,W],
  [W,A,A,A,A,A,A,A,R,R,R,R,A,A,A,A,A,A,A,W],
  [W,A,K,K,K,A,A,A,A,A,A,A,A,A,A,K,K,K,A,W],
  [W,A,K,K,K,K,A,A,A,A,A,A,A,A,K,K,K,K,A,W],
  [W,A,A,K,K,K,A,A,A,A,A,A,A,A,K,K,K,A,A,W],  // More kelp
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,A,A,A,A,A,A,A,A,A,A,W,W,W,W,W],  // South exit to Cold Water Trench
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const PACIFIC_KELP_FOREST: MapData = {
  id: 'pacific-kelp-forest',
  name: 'Pacific Kelp Forest',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Puget Sound
    {
      x: 8,
      y: 0,
      targetMap: 'puget-sound',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'puget-sound',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'puget-sound',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'puget-sound',
      targetX: 11,
      targetY: 16
    },
    // South exit to Cold Water Trench
    {
      x: 8,
      y: 17,
      targetMap: 'cold-water-trench',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'cold-water-trench',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'cold-water-trench',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'cold-water-trench',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Kelp diving expert
    {
      id: 'kelp-expert',
      x: 4,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The kelp here grows over 100 feet tall!',
        'It creates an underwater forest ecosystem.',
        'Salmon Sharks hunt fish among the fronds.',
        'Be careful - they\'re fast and powerful!'
      ]
    },
    // Shark researcher
    {
      id: 'shark-researcher',
      x: 15,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Porbeagles are amazing cold-water sharks.',
        'They can maintain body heat in freezing waters!',
        'Like Salmon Sharks, they\'re endothermic.',
        'That\'s rare for fish - makes them fast predators.'
      ]
    },
    // Underwater photographer
    {
      id: 'underwater-photo',
      x: 6,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I\'m documenting the kelp forest ecosystem.',
        'The biodiversity here is incredible!',
        'Giant Pacific octopus, wolf eels, sixgill sharks...',
        'The cold water preserves ancient species.'
      ]
    },
    // Tech diver
    {
      id: 'tech-diver',
      x: 14,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I just came up from the Cold Water Trench.',
        'You need tech diving certification to go there.',
        'The sleeper sharks down below are massive!',
        'Pacific Sleeper Sharks can reach 23 feet long.'
      ]
    },
    // Conservation biologist
    {
      id: 'conservation-bio',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Pacific kelp forests are threatened by warming waters.',
        'The sharks here depend on this ecosystem.',
        'Sustainable diving practices help protect it.',
        'Take only what you need, leave the rest.'
      ]
    }
  ],
  encounterTable: [
    // Porbeagle - Lamnid shark, evolves to Salmon Shark
    { speciesId: 86, minLevel: 22, maxLevel: 28, weight: 25 },  // Porbeagle
    // Salmon Shark - apex predator
    { speciesId: 87, minLevel: 28, maxLevel: 35, weight: 15 },  // Salmon Shark
    // Winter Skate - cold water specialist
    { speciesId: 92, minLevel: 22, maxLevel: 28, weight: 20 },  // Winter Skate
    // Spiny Dogfish - still common
    { speciesId: 88, minLevel: 20, maxLevel: 26, weight: 30 },  // Spiny Dogfish
    // Iceland Catshark - rare
    { speciesId: 93, minLevel: 24, maxLevel: 30, weight: 10 }   // Iceland Catshark
  ],
  isOutdoor: true
};

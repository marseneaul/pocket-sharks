import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const K = TILE.KELP;
const R = TILE.REEF;
const D = TILE.DEEP_REEF;

// 20x18 tiles = 160x144 pixels
// Great Barrier Reef - Famous Australian reef system
// Carpet sharks, reef sharks, and rays
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,R,R,R,A,A,R,R,A,A,R,R,A,A,R,R,R,A,W],
  [W,A,R,R,R,R,A,R,R,R,R,R,R,A,R,R,R,R,A,W],
  [W,A,A,R,R,A,A,A,R,R,R,R,A,A,A,R,R,A,A,W],
  [W,A,A,A,A,A,K,K,A,A,A,A,K,K,A,A,A,A,A,W],
  [W,A,K,K,A,K,K,K,K,A,A,K,K,K,K,A,K,K,A,W],
  [W,A,K,K,K,K,D,D,K,A,A,K,D,D,K,K,K,K,A,W],
  [W,A,A,K,K,D,D,D,D,A,A,D,D,D,D,K,K,A,A,W],
  [W,A,A,A,K,D,D,D,D,A,A,D,D,D,D,K,A,A,A,W],
  [W,A,K,K,K,K,D,D,K,A,A,K,D,D,K,K,K,K,A,W],
  [W,A,K,K,A,K,K,K,K,A,A,K,K,K,K,A,K,K,A,W],
  [W,A,A,A,A,A,K,K,A,A,A,A,K,K,A,A,A,A,A,W],
  [W,A,R,R,R,A,A,A,A,A,A,A,A,A,A,R,R,R,A,W],
  [W,A,R,R,R,R,A,A,A,A,A,A,A,A,R,R,R,R,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const GREAT_BARRIER_REEF: MapData = {
  id: 'great-barrier-reef',
  name: 'Great Barrier Reef',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Australia Airport
    {
      x: 8,
      y: 0,
      targetMap: 'australia-airport',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'australia-airport',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'australia-airport',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'australia-airport',
      targetX: 11,
      targetY: 16
    },
    // South exit to Outback Gym area
    {
      x: 8,
      y: 17,
      targetMap: 'outback-gym',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'outback-gym',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'outback-gym',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'outback-gym',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Reef researcher
    {
      id: 'reef-researcher',
      x: 5,
      y: 4,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The Great Barrier Reef is incredible!',
        'Thousands of species live here.',
        'But coral bleaching is devastating it.',
        'Climate change and pollution are killing the reef.',
        'We need to protect what remains.'
      ]
    },
    // Carpet shark expert
    {
      id: 'carpet-expert',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I study carpet sharks here.',
        'Wobbegongs camouflage perfectly with the reef!',
        'Epaulette Sharks actually walk on their fins.',
        'They can survive without oxygen for hours!',
        'Amazing adaptations!'
      ]
    },
    // Whale shark watcher
    {
      id: 'whale-watcher',
      x: 5,
      y: 11,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Whale Sharks visit this reef seasonally.',
        'The biggest fish in the world!',
        'Completely harmless - they filter plankton.',
        'Seeing one is magical.'
      ]
    },
    // Zebra shark fan
    {
      id: 'zebra-fan',
      x: 14,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Have you seen a Zebra Shark?',
        'Young ones have stripes like zebras.',
        'Adults have spots instead!',
        'They\'re beautiful and gentle.'
      ]
    }
  ],
  encounterTable: [
    // Reef sharks
    { speciesId: 1, minLevel: 38, maxLevel: 45, weight: 15 },   // Blacktip Reef Shark
    { speciesId: 4, minLevel: 38, maxLevel: 45, weight: 15 },   // Whitetip Reef Shark
    { speciesId: 7, minLevel: 40, maxLevel: 48, weight: 10 },   // Grey Reef Shark
    // Carpet sharks (Ground types)
    { speciesId: 78, minLevel: 38, maxLevel: 45, weight: 20 },  // Tawny Nurse Shark
    // Rare
    { speciesId: 45, minLevel: 45, maxLevel: 55, weight: 5 },   // Whale Shark
    { speciesId: 82, minLevel: 42, maxLevel: 50, weight: 10 },  // Tiger Shark
    { speciesId: 9, minLevel: 42, maxLevel: 50, weight: 10 },   // Silvertip Shark
    { speciesId: 27, minLevel: 40, maxLevel: 48, weight: 15 }   // Manta Ray
  ],
  isOutdoor: true
};

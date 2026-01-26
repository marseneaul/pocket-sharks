import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;       // Shallow transition water
const D = TILE.DEEP_REEF;   // Deep water with encounters (requires advanced cert)
const R = TILE.REEF;        // Rocky areas

// 20x18 tiles = 160x144 pixels
// North Sea - Deep European waters
// Requires Advanced SCUBA certification
// Encounters: Nursehound, Thornback Skate, Roughshark, Longnose Spurdog
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Coast
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],  // Deep water begins
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,R,R,D,D,D,D,D,D,D,D,R,R,D,D,A,W],  // Rocky outcrops
  [W,A,D,D,R,R,R,D,D,D,D,D,D,R,R,R,D,D,A,W],
  [W,A,D,D,D,R,R,D,D,D,D,D,D,R,R,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],  // Open deep water
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,R,R,D,D,D,D,D,D,D,D,R,R,D,D,A,W],
  [W,A,D,D,R,R,R,D,D,D,D,D,D,R,R,R,D,D,A,W],  // More rocky areas
  [W,A,D,D,D,R,R,D,D,D,D,D,D,R,R,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Dead end - deepest point
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const NORTH_SEA: MapData = {
  id: 'north-sea',
  name: 'North Sea',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from European Coast
    {
      x: 8,
      y: 0,
      targetMap: 'european-coast',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'european-coast',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'european-coast',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'european-coast',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Deep-sea researcher
    {
      id: 'deep-researcher',
      x: 5,
      y: 5,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The North Sea was once teeming with sharks.',
        'Now most species are critically depleted.',
        'Nursehounds still hide in the rocky crevices.',
        'But finding one is becoming rare.'
      ]
    },
    // Veteran diver
    {
      id: 'veteran-diver',
      x: 14,
      y: 8,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'ve been diving these waters for 40 years.',
        'The change is heartbreaking.',
        'We used to see Tope Sharks regularly.',
        'Now they\'re almost gone from these waters.'
      ]
    },
    // Marine surveyor
    {
      id: 'marine-survey',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I\'m conducting a shark population survey.',
        'The Roughshark is one of our rarest finds.',
        'They live in the deepest parts of the sea.',
        'Very few people ever see one.'
      ]
    },
    // Conservation activist
    {
      id: 'conserve-activist',
      x: 6,
      y: 13,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The Velvet Belly Lanternshark is bycatch.',
        'Fishermen throw them back dead.',
        'They glow in the dark - beautiful creatures.',
        'We need to protect them before it\'s too late.'
      ]
    },
    // Basking shark spotter
    {
      id: 'basking-spotter',
      x: 13,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Basking Sharks migrate through here in summer.',
        'They\'re the second largest fish in the world!',
        'Completely harmless - they eat plankton.',
        'Seeing one is the experience of a lifetime.'
      ]
    }
  ],
  encounterTable: [
    // Nursehound - evolved catshark
    { speciesId: 97, minLevel: 28, maxLevel: 35, weight: 20 },  // Nursehound
    // Thornback Skate - spiny skate
    { speciesId: 99, minLevel: 30, maxLevel: 38, weight: 15 },  // Thornback Skate
    // Longnose Spurdog - final dogfish evolution
    { speciesId: 95, minLevel: 35, maxLevel: 42, weight: 15 },  // Longnose Spurdog
    // Roughshark - rare deep-sea
    { speciesId: 100, minLevel: 32, maxLevel: 40, weight: 10 }, // Roughshark
    // Velvet Belly Lanternshark - bioluminescent
    { speciesId: 101, minLevel: 28, maxLevel: 36, weight: 15 }, // Velvet Belly Lanternshark
    // Spiny Dogfish - still common
    { speciesId: 88, minLevel: 28, maxLevel: 35, weight: 20 },  // Spiny Dogfish
    // Basking Shark - very rare event
    { speciesId: 102, minLevel: 40, maxLevel: 50, weight: 5 }   // Basking Shark
  ],
  isOutdoor: true
};

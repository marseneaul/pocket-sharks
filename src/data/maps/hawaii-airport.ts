import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;

// 20x18 tiles = 160x144 pixels
// Hawaii Airport - Indoor arrival point from San Diego
// Layout: Airport terminal with exit to Waikiki Beach
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],  // Counters
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,F,F,F,F,F,F,F,F,F,F,W,W,F,F,W],  // Benches/seating
  [W,F,F,W,W,F,F,F,F,F,F,F,F,F,F,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // South exit to Waikiki
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const HAWAII_AIRPORT: MapData = {
  id: 'hawaii-airport',
  name: 'Honolulu Airport',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to Waikiki Beach
    {
      x: 8,
      y: 17,
      targetMap: 'waikiki-beach',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'waikiki-beach',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'waikiki-beach',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'waikiki-beach',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Airport greeter
    {
      id: 'airport-greeter',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Aloha! Welcome to Hawaii!',
        'This is where many shark trainers come to learn SCUBA diving.',
        'Head south to reach Waikiki Beach.',
        'The Dive School is on the east side of town.'
      ]
    },
    // Tourist NPC
    {
      id: 'tourist-1',
      x: 5,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I came here to see reef sharks!',
        'But they say you need a diving certification first.',
        'Something about "no captures during certification dives"...'
      ]
    },
    // Return traveler
    {
      id: 'return-traveler',
      x: 14,
      y: 11,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I just got my Open Water SCUBA certification!',
        'Now I can dive at reefs back home in San Diego.',
        'The deeper waters have amazing sharks!'
      ]
    },
    // Information desk
    {
      id: 'info-desk',
      x: 4,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Honolulu Airport Information.',
        'Waikiki Beach is south of here.',
        'The Dive School is east of Waikiki.',
        'Once certified, you can visit Hawaii Reef to practice!'
      ]
    },
    // Local diver
    {
      id: 'local-diver',
      x: 15,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Hawaiian waters are protected.',
        'Even after you get certified, you\'ll need a local conservation permit to catch sharks here.',
        'But you can still observe them during your certification dives!'
      ]
    }
  ],
  encounterTable: [], // No encounters indoors
  isOutdoor: false
};

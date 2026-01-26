import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Australia Airport - Arrival point for Asia/Australia region
// Team Finn HQ is in this region - massive overfishing visible
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,H,F,F,F,F,F,F,H,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,F,F,F,W,W,W,W,F,F,F,W,W,W,W,W],
  [S,S,S,S,S,F,F,F,S,S,S,S,F,F,F,S,S,S,S,S],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const AUSTRALIA_AIRPORT: MapData = {
  id: 'australia-airport',
  name: 'Cairns Airport',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to Great Barrier Reef
    {
      x: 8,
      y: 17,
      targetMap: 'great-barrier-reef',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'great-barrier-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'great-barrier-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'great-barrier-reef',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Airport greeter
    {
      id: 'airport-greeter-aus',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'G\'day mate! Welcome to Australia!',
        'The Great Barrier Reef is south of here.',
        'It\'s one of the world\'s greatest ecosystems!',
        'Though... Finnova has operations here too.',
        'Be careful what you see out there.'
      ]
    },
    // Shop keeper
    {
      id: 'shop-aus',
      x: 6,
      y: 3,
      sprite: 0,
      facing: 'down',
      shopId: 'aus-shop',
      dialogue: [
        'G\'day! Need some supplies?',
        'Stock up before hitting the reef!'
      ]
    },
    // Team Finn warning
    {
      id: 'finn-warning',
      x: 14,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Listen here, mate...',
        'Finnova has their main operations nearby.',
        'Massive factory ships, fins everywhere.',
        'The scale of it is horrifying.',
        'Someone needs to stop them.'
      ]
    },
    // Local diver
    {
      id: 'local-diver-aus',
      x: 5,
      y: 6,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The reef has amazing carpet sharks!',
        'Epaulettes, Wobbegongs, Bamboo Sharks...',
        'They walk on their fins along the bottom!',
        'Totally unique to this part of the world.'
      ]
    },
    // Gym direction
    {
      id: 'gym-direction-aus',
      x: 14,
      y: 6,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Looking for Gym Leader Jack?',
        'His Outback Gym is past the reef.',
        'He uses Ground-type carpet sharks.',
        'Wobbegongs and Epaulettes - tricky fighters!'
      ]
    }
  ],
  encounterTable: [
    // Shallow reef encounters near shore
    { speciesId: 1, minLevel: 35, maxLevel: 42, weight: 30 },   // Blacktip Reef Shark
    { speciesId: 4, minLevel: 35, maxLevel: 42, weight: 30 },   // Whitetip Reef Shark
    { speciesId: 78, minLevel: 38, maxLevel: 45, weight: 25 },  // Tawny Nurse Shark
    { speciesId: 45, minLevel: 40, maxLevel: 50, weight: 15 }   // Whale Shark
  ],
  isOutdoor: true
};

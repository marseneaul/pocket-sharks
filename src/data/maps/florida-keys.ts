import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const T = TILE.TIDE_POOL;

// 20x18 tiles = 160x144 pixels
// Florida Keys - Beach area with tide pools and shallow waters
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // North to Airport
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,T,T,S,S,S,S,S,S,S,S,T,T,S,S,S,W],
  [W,S,S,T,T,T,T,S,S,S,S,S,S,T,T,T,T,S,S,W],
  [W,S,S,T,T,T,S,S,S,S,S,S,S,S,T,T,T,S,S,W],
  [W,S,S,S,T,S,S,S,S,S,S,S,S,S,S,T,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,F],  // West to Key West, East to Reef
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,F],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,T,T,S,S,S,S,S,S,S,S,T,T,S,S,S,W],
  [W,S,S,T,T,T,T,S,S,S,S,S,S,T,T,T,T,S,S,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to Caribbean Reef
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const FLORIDA_KEYS: MapData = {
  id: 'florida-keys',
  name: 'Florida Keys',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North exit to Airport
    {
      x: 8,
      y: 0,
      targetMap: 'florida-airport',
      targetX: 9,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'florida-airport',
      targetX: 10,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'florida-airport',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'florida-airport',
      targetX: 11,
      targetY: 16
    },
    // West exit to Key West town
    {
      x: 0,
      y: 8,
      targetMap: 'key-west',
      targetX: 18,
      targetY: 9
    },
    {
      x: 0,
      y: 9,
      targetMap: 'key-west',
      targetX: 18,
      targetY: 10
    },
    // East exit to Caribbean Reef
    {
      x: 19,
      y: 8,
      targetMap: 'caribbean-reef',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 9,
      targetMap: 'caribbean-reef',
      targetX: 1,
      targetY: 10
    },
    // South exit to deeper waters (swimming)
    {
      x: 8,
      y: 17,
      targetMap: 'caribbean-reef',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'caribbean-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'caribbean-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'caribbean-reef',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Beach trainer 1
    {
      id: 'trainer-keys-1',
      x: 6,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The bonnetheads here are super friendly!',
        'Want to see what I\'ve caught?'
      ],
      trainer: {
        name: 'Swimmer Kelly',
        team: [
          { speciesId: 10, level: 18 },  // Bonnethead
          { speciesId: 27, level: 18 },  // Southern Stingray
          { speciesId: 65, level: 19 }   // Sharpnose Shark
        ],
        defeatedDialogue: [
          'Nice battle!',
          'The reef has even stronger sharks!'
        ],
        prizeMoney: 380
      }
    },
    // Beach trainer 2
    {
      id: 'trainer-keys-2',
      x: 14,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I love collecting stingrays!',
        'The yellow ones are my favorite!'
      ],
      trainer: {
        name: 'Collector Marco',
        team: [
          { speciesId: 14, level: 18 },  // Atlantic Stingray (Yellow variant)
          { speciesId: 27, level: 19 },  // Southern Stingray
          { speciesId: 13, level: 20 }   // Nurse Shark
        ],
        defeatedDialogue: [
          'Your sharks are impressive!',
          'Gym Leader Coral has amazing reef sharks.'
        ],
        prizeMoney: 400
      }
    },
    // Local fisherman
    {
      id: 'fisherman-keys',
      x: 4,
      y: 6,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Best fishing spot in Florida right here!',
        'I\'ve seen nurse sharks, bonnetheads...',
        'Even a lemon shark once!'
      ]
    },
    // Kid looking for fossils
    {
      id: 'fossil-kid',
      x: 10,
      y: 6,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I\'m looking for fossils!',
        'My dad says ancient sharks lived here.',
        'Maybe I\'ll find a Megalodon tooth!'
      ]
    },
    // Warning about Team Finn
    {
      id: 'concerned-diver',
      x: 16,
      y: 8,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I was diving yesterday...',
        'Saw a Finnova boat dumping something.',
        'The reef looked sick nearby.',
        'Someone should investigate!'
      ]
    }
  ],
  // Florida Keys shallow encounters
  encounterTable: [
    { speciesId: 10, minLevel: 16, maxLevel: 19, weight: 20 },  // Bonnethead
    { speciesId: 13, minLevel: 17, maxLevel: 20, weight: 18 },  // Nurse Shark
    { speciesId: 79, minLevel: 16, maxLevel: 19, weight: 18 },  // Blacknose Shark (new!)
    { speciesId: 66, minLevel: 16, maxLevel: 19, weight: 15 },  // Sharpnose Shark
    { speciesId: 28, minLevel: 17, maxLevel: 20, weight: 12 },  // Southern Stingray
    { speciesId: 80, minLevel: 16, maxLevel: 19, weight: 12 },  // Yellow Stingray (new!)
    { speciesId: 14, minLevel: 16, maxLevel: 19, weight: 5 }    // Atlantic Stingray
  ],
  isOutdoor: true
};

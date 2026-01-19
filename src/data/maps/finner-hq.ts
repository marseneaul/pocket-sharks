import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Warehouse walls
const F = TILE.FLOOR;  // Floor
const A = TILE.WATER;  // Water tanks (decorative)
const D = TILE.DOCK;   // Crates/storage

// 20x18 tiles - Team Finner HQ: Warehouse
// Evil team's base with captured sharks in cages
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Top boundary
  [W,F,F,F,F,F,F,W,W,F,F,W,W,F,F,F,F,F,F,W],
  [W,F,D,D,F,F,F,W,A,A,A,A,W,F,F,F,D,D,F,W],  // Boss office area
  [W,F,D,D,F,F,F,W,A,A,A,A,W,F,F,F,D,D,F,W],
  [W,F,F,F,F,F,F,W,W,F,F,W,W,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,F,F,F,F,F,F,F,F,F,F,F,F,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,D,D,D,F,F,W,W,W,W,W,W,F,F,D,D,D,F,W],  // Cage area
  [W,F,D,A,D,F,F,W,A,A,A,A,W,F,F,D,A,D,F,W],  // Captured sharks
  [W,F,D,D,D,F,F,W,A,A,A,A,W,F,F,D,D,D,F,W],
  [W,F,F,F,F,F,F,W,W,W,W,W,W,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,F,F,F,F,F,F,F,F,F,F,F,F,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],  // Entrance
];

export const FINNER_HQ: MapData = {
  id: 'finner-hq',
  name: 'Team Finner HQ',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to Route 4 (exit bottom → appear at right side of Route 4)
    {
      x: 9,
      y: 17,
      targetMap: 'route-4',
      targetX: 18,
      targetY: 9
    },
    {
      x: 10,
      y: 17,
      targetMap: 'route-4',
      targetX: 18,
      targetY: 10
    }
  ],
  npcs: [
    // Finner Grunt 1 - entrance guard
    {
      id: 'finner-grunt-hq1',
      x: 9,
      y: 14,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'Hey! How did you',
        'get in here?!',
        'This is Team Finner',
        'territory!'
      ],
      trainer: {
        name: 'Finner Grunt',
        team: [
          { speciesId: 13, level: 14 }   // Nurse Shark
        ],
        defeatedDialogue: [
          'Ugh! Fine!',
          'But the others will',
          'stop you!'
        ],
        prizeMoney: 280
      }
    },
    // Finner Grunt 2 - left side
    {
      id: 'finner-grunt-hq2',
      x: 4,
      y: 12,
      sprite: 1,
      facing: 'right',
      dialogue: [
        'We\'re going to be',
        'rich selling these fins!',
        'You can\'t stop us!'
      ],
      trainer: {
        name: 'Finner Grunt',
        team: [
          { speciesId: 12, level: 13 },  // Lemon Shark
          { speciesId: 28, level: 13 }   // Southern Stingray
        ],
        defeatedDialogue: [
          'This isn\'t over!',
          'The Admin will',
          'deal with you!'
        ],
        prizeMoney: 260
      }
    },
    // Finner Grunt 3 - right side
    {
      id: 'finner-grunt-hq3',
      x: 15,
      y: 12,
      sprite: 1,
      facing: 'left',
      dialogue: [
        'Heh heh...',
        'Those sharks in the',
        'tanks are worth a',
        'fortune!'
      ],
      trainer: {
        name: 'Finner Grunt',
        team: [
          { speciesId: 13, level: 15 },  // Nurse Shark
          { speciesId: 13, level: 15 }   // Nurse Shark
        ],
        defeatedDialogue: [
          'Argh! You\'re',
          'tougher than you look!'
        ],
        prizeMoney: 300
      }
    },
    // Finner Grunt 4 - near cages
    {
      id: 'finner-grunt-hq4',
      x: 10,
      y: 7,
      sprite: 1,
      facing: 'down',
      dialogue: [
        'These sharks are',
        'our meal ticket!',
        'I won\'t let you',
        'free them!'
      ],
      trainer: {
        name: 'Finner Grunt',
        team: [
          { speciesId: 21, level: 16 }   // Bull Shark
        ],
        defeatedDialogue: [
          'No way!',
          'You beat my Bull Shark?!',
          'The Admin won\'t like this...'
        ],
        prizeMoney: 320
      }
    },
    // Admin Sawyer - mini-boss
    {
      id: 'finner-admin',
      x: 10,
      y: 5,
      sprite: 2,
      facing: 'down',
      dialogue: [
        'So you\'re the brat',
        'causing trouble?',
        'I\'m Admin Sawyer.',
        'I handle acquisitions',
        'for Team Finner.',
        'These sharks belong',
        'to us now!'
      ],
      trainer: {
        name: 'Admin Sawyer',
        team: [
          { speciesId: 25, level: 18 },  // Sawshark
          { speciesId: 21, level: 18 },  // Bull Shark
          { speciesId: 22, level: 19 }   // Spotted Ratfish
        ],
        defeatedDialogue: [
          'Impossible!',
          'Fine... but the Boss',
          'will crush you!',
          'Boss Finley is in',
          'the back office!'
        ],
        prizeMoney: 1200
      }
    },
    // Boss Finley - main boss
    {
      id: 'finner-boss',
      x: 10,
      y: 2,
      sprite: 2,
      facing: 'down',
      dialogue: [
        'Hah! A child?',
        'I am Boss Finley,',
        'leader of Team Finner!',
        'These fins will make',
        'me rich beyond measure!',
        'No one can stop my',
        'fin harvesting operation!',
        'Prepare to lose!'
      ],
      trainer: {
        name: 'Boss Finley',
        team: [
          { speciesId: 21, level: 20 },  // Bull Shark
          { speciesId: 20, level: 20 },  // Thresher Shark
          { speciesId: 24, level: 22 }   // Goblin Shark
        ],
        defeatedDialogue: [
          'NO! This can\'t be!',
          'My beautiful operation!',
          'Team Finner... retreat!',
          'We\'ll be back!',
          'Those sharks are yours',
          'for now, brat!',
          'But this isn\'t over!'
        ],
        prizeMoney: 2500
      }
    },
    // Captured shark info (decorative NPCs near cages)
    {
      id: 'captured-shark-1',
      x: 3,
      y: 9,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'A rare Manta Ray is',
        'trapped in this cage!',
        'It looks scared...'
      ]
    },
    {
      id: 'captured-shark-2',
      x: 16,
      y: 9,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'A Sawshark is being',
        'held captive here!',
        'Its saw looks valuable...'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in HQ
  isOutdoor: false
};

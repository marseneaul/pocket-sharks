import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Gym walls
const F = TILE.FLOOR;  // Floor
const A = TILE.WATER;  // Electric floor effect (decorative)

// 20x18 tiles - Kelp Harbor Gym Interior
// Captain Volt's Electric-type gym with lightning bolt floor pattern
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,A,F,F,F,F,F,F,F,F,F,F,F,F,A,F,F,W],
  [W,F,F,A,A,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],  // Captain Volt position
  [W,F,F,F,A,A,F,F,F,F,F,F,F,F,A,A,F,F,F,W],
  [W,F,F,F,F,A,A,F,F,F,F,F,F,A,A,F,F,F,F,W],
  [W,F,F,F,F,F,A,A,A,F,F,A,A,A,F,F,F,F,F,W],  // Lightning bolt pattern
  [W,F,F,F,F,F,F,F,A,A,A,A,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,A,A,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,A,A,A,A,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,A,A,A,F,F,A,A,A,F,F,F,F,F,W],
  [W,F,F,F,F,A,A,F,F,F,F,F,F,A,A,F,F,F,F,W],
  [W,F,F,F,A,A,F,F,F,F,F,F,F,F,A,A,F,F,F,W],
  [W,F,F,A,A,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,F,A,F,F,F,F,F,F,F,F,F,F,F,F,A,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],  // Entrance from Kelp Harbor
];

export const KELP_GYM: MapData = {
  id: 'kelp-gym',
  name: 'Kelp Harbor Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to Kelp Harbor
    {
      x: 9,
      y: 17,
      targetMap: 'kelp-harbor',
      targetX: 9,
      targetY: 5
    },
    {
      x: 10,
      y: 17,
      targetMap: 'kelp-harbor',
      targetX: 10,
      targetY: 5
    }
  ],
  npcs: [
    // Gym Leader Captain Volt
    {
      id: 'gym-leader-volt',
      x: 9,
      y: 3,
      sprite: 2,
      facing: 'down',
      dialogue: [
        'Ahoy, challenger!',
        'I\'m Captain Volt,',
        'master of Electric sharks!',
        'In my sailing days, I',
        'studied the shocking',
        'power of Lanternsharks.',
        'Now let\'s see if you',
        'can weather my storm!'
      ],
      trainer: {
        name: 'Captain Volt',
        team: [
          { speciesId: 15, level: 18 },  // Lanternshark
          { speciesId: 26, level: 19 },  // Torpedo Ray
          { speciesId: 31, level: 21 }   // Velvet Lanternshark (ace)
        ],
        defeatedDialogue: [
          'Blimey! You\'ve got',
          'the spark of a true',
          'champion!',
          'Take this Harbor Badge.',
          'It\'s proof you survived',
          'my electric onslaught!',
          'Here, take this TM too.',
          'It\'s Thunderbolt!'
        ],
        prizeMoney: 2100
      }
    },
    // Gym Trainer 1 - left side
    {
      id: 'kelp-gym-trainer-1',
      x: 4,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The captain taught us',
        'to harness electricity!',
        'Feel the shock!'
      ],
      trainer: {
        name: 'Sailor Sparks',
        team: [
          { speciesId: 15, level: 16 },  // Lanternshark
          { speciesId: 15, level: 16 }   // Lanternshark
        ],
        defeatedDialogue: [
          'Zapped out...',
          'You\'re tougher than',
          'you look!'
        ],
        prizeMoney: 512
      }
    },
    // Gym Trainer 2 - right side
    {
      id: 'kelp-gym-trainer-2',
      x: 15,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Torpedo Rays are the',
        'most shocking creatures',
        'in the sea!',
        'Want to find out why?'
      ],
      trainer: {
        name: 'Sailor Bolt',
        team: [
          { speciesId: 26, level: 17 }   // Torpedo Ray
        ],
        defeatedDialogue: [
          'My ray ran out of',
          'charge...',
          'Good luck with the',
          'captain!'
        ],
        prizeMoney: 544
      }
    },
    // Gym Trainer 3 - middle path
    {
      id: 'kelp-gym-trainer-3',
      x: 9,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I\'m the last line',
        'of defense before',
        'Captain Volt!',
        'Prepare for a shock!'
      ],
      trainer: {
        name: 'Sailor Storm',
        team: [
          { speciesId: 15, level: 15 },  // Lanternshark
          { speciesId: 26, level: 16 },  // Torpedo Ray
          { speciesId: 15, level: 15 }   // Lanternshark
        ],
        defeatedDialogue: [
          'The storm has passed...',
          'But the captain is',
          'even stronger!'
        ],
        prizeMoney: 480
      }
    },
    // Gym guide at entrance
    {
      id: 'kelp-gym-guide',
      x: 5,
      y: 15,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to Kelp Gym!',
        'Captain Volt uses',
        'Electric-type sharks.',
        'Ground types are immune',
        'to Electric attacks!',
        'Good luck, challenger!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

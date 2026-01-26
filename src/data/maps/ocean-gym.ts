import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Ocean Gym - Kai's Flying-type shark gym
// Built on a floating platform in the open ocean
// Leader: Kai - Flying Type specialist (breaching/jumping sharks)
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],  // Main platform
  [W,A,A,F,A,A,A,F,F,F,F,F,A,A,A,F,F,A,A,W],  // Water pools
  [W,A,A,F,A,A,A,F,F,F,F,F,A,A,A,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],  // Battle area
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],
  [W,A,A,F,A,A,A,F,F,F,F,F,A,A,A,F,F,A,A,W],  // More water pools
  [W,A,A,F,A,A,A,F,F,F,F,F,A,A,A,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,F,F,F,F,F,F,F,F,A,A,W],
  [W,A,A,F,F,F,F,F,F,H,H,F,F,F,F,F,F,A,A,W],  // Heal near entrance
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // Entrance
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const OCEAN_GYM: MapData = {
  id: 'ocean-gym',
  name: 'Ocean Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to Open Ocean
    {
      x: 9,
      y: 17,
      targetMap: 'open-ocean',
      targetX: 9,
      targetY: 9
    },
    {
      x: 10,
      y: 17,
      targetMap: 'open-ocean',
      targetX: 10,
      targetY: 9
    }
  ],
  npcs: [
    // Gym Leader Kai
    {
      id: 'gym-leader-kai',
      x: 10,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Aloha, challenger!',
        'I am Kai, master of the Ocean Gym.',
        'My sharks don\'t just swim - they FLY!',
        'Breaching, leaping, soaring through the air!',
        'The manta rays glide like underwater birds.',
        'Eagle rays leap and spin above the waves.',
        'Can you match the freedom of the flying types?',
        'Let\'s see if you can keep up!'
      ],
      trainer: {
        name: 'Gym Leader Kai',
        team: [
          { speciesId: 27, level: 28 },  // Manta Ray
          { speciesId: 8, level: 29 },   // Galapagos Shark
          { speciesId: 9, level: 30 },   // Silvertip Shark
          { speciesId: 5, level: 32 }    // Oceanic Whitetip (ace)
        ],
        defeatedDialogue: [
          'Ho! You ride the waves like a natural!',
          'Your sharks have true oceanic spirit!',
          'Take this - the Ocean Badge!',
          'It proves you can handle the open water.',
          'Flying and breaching types will respect you now.',
          'Also, take this TM - it contains Aerial Ace.',
          'Even underwater, sharks can learn to fly!',
          'Aloha, friend. May the currents guide you.'
        ],
        prizeMoney: 3200
      }
    },
    // Trainer 1
    {
      id: 'ocean-trainer-1',
      x: 5,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Manta rays are my favorite!',
        'They fly through the water so gracefully!',
        'Watch them soar!'
      ],
      trainer: {
        name: 'Swimmer Leilani',
        team: [
          { speciesId: 27, level: 26 },  // Manta Ray
          { speciesId: 27, level: 27 }   // Manta Ray
        ],
        defeatedDialogue: [
          'My mantas need to practice their landings...'
        ],
        prizeMoney: 540
      }
    },
    // Trainer 2
    {
      id: 'ocean-trainer-2',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Galapagos Sharks are powerful!',
        'They breach out of the water when hunting!',
        'Prepare to be amazed!'
      ],
      trainer: {
        name: 'Surfer Keanu',
        team: [
          { speciesId: 7, level: 27 },   // Grey Reef Shark
          { speciesId: 8, level: 28 }    // Galapagos Shark
        ],
        defeatedDialogue: [
          'Whoa! You wiped out my team!',
          'Totally gnarly battle, dude!'
        ],
        prizeMoney: 560
      }
    },
    // Trainer 3
    {
      id: 'ocean-trainer-3',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'The Oceanic Whitetip is fearless!',
        'It roams the open ocean hunting anything.',
        'My shark knows no boundaries!'
      ],
      trainer: {
        name: 'Diver Makoa',
        team: [
          { speciesId: 4, level: 27 },   // Whitetip Reef Shark
          { speciesId: 5, level: 29 }    // Oceanic Whitetip
        ],
        defeatedDialogue: [
          'The ocean has humbled me today.',
          'Your bond with your sharks is strong.'
        ],
        prizeMoney: 580
      }
    },
    // Gym guide
    {
      id: 'ocean-gym-guide',
      x: 6,
      y: 13,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Ocean Gym!',
        'This floating platform is Kai\'s domain.',
        'He uses flying-type sharks and rays.',
        'Electric and Ice moves are super effective!',
        'Good luck out there!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

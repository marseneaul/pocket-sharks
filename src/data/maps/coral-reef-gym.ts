import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;

// 20x18 tiles = 160x144 pixels
// Coral Reef Gym - Badge #3, Leader Coral specializes in Normal/Ground reef sharks
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // North entrance from Key West
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,A,A,W,W,W,A,A,F,F,F,F,A,A,W,W,W,A,A,W],  // Coral formations
  [W,A,A,W,W,W,A,A,A,A,A,A,A,A,W,W,W,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],  // Path through water
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,A,A,W,W,W,A,A,F,F,F,F,A,A,W,W,W,A,A,W],  // More coral
  [W,A,A,W,W,W,A,A,F,F,F,F,A,A,W,W,W,A,A,W],
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,F,F,F,F,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,A,A,A,F,F,F,F,A,A,A,W,W,W,W,W],
  [W,W,W,W,W,W,A,A,F,F,F,F,A,A,W,W,W,W,W,W],  // Gym leader platform
  [W,W,W,W,W,W,W,F,F,F,F,F,F,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,F,F,F,F,F,F,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const CORAL_REEF_GYM: MapData = {
  id: 'coral-reef-gym',
  name: 'Reef Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North exit to Key West
    {
      x: 8,
      y: 0,
      targetMap: 'key-west',
      targetX: 9,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'key-west',
      targetX: 10,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'key-west',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'key-west',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Gym trainer 1
    {
      id: 'gym-trainer-coral-1',
      x: 5,
      y: 5,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Reef Gym!',
        'Coral\'s sharks are incredible!',
        'But first, you have to beat me!'
      ],
      trainer: {
        name: 'Gym Trainer Sandy',
        team: [
          { speciesId: 13, level: 22 },  // Nurse Shark
          { speciesId: 27, level: 22 },  // Southern Stingray
          { speciesId: 10, level: 23 }   // Bonnethead
        ],
        defeatedDialogue: [
          'You\'re strong!',
          'Coral will test you even more!'
        ],
        prizeMoney: 460
      }
    },
    // Gym trainer 2
    {
      id: 'gym-trainer-coral-2',
      x: 14,
      y: 5,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The reef is full of surprises!',
        'Can you handle my sharks?'
      ],
      trainer: {
        name: 'Gym Trainer Reef',
        team: [
          { speciesId: 12, level: 23 },  // Lemon Shark
          { speciesId: 6, level: 23 },   // Bull Shark
          { speciesId: 13, level: 24 }   // Nurse Shark
        ],
        defeatedDialogue: [
          'Amazing battle!',
          'You\'re ready for Coral!'
        ],
        prizeMoney: 480
      }
    },
    // Gym trainer 3
    {
      id: 'gym-trainer-coral-3',
      x: 9,
      y: 10,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'One more challenge before the leader!',
        'Let\'s see your skills!'
      ],
      trainer: {
        name: 'Gym Trainer Marina',
        team: [
          { speciesId: 1, level: 23 },   // Blacktip Reef Shark
          { speciesId: 4, level: 23 },   // Whitetip Reef Shark
          { speciesId: 12, level: 24 },  // Lemon Shark
          { speciesId: 13, level: 24 }   // Nurse Shark
        ],
        defeatedDialogue: [
          'Well done!',
          'Coral is just ahead - good luck!'
        ],
        prizeMoney: 500
      }
    },
    // GYM LEADER CORAL
    {
      id: 'gym-leader-coral',
      x: 9,
      y: 15,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Welcome, challenger!',
        'I am Coral, master of reef sharks!',
        'The ocean\'s beauty is matched only by its strength.',
        'Show me you understand the reef\'s power!'
      ],
      trainer: {
        name: 'Leader Coral',
        team: [
          { speciesId: 13, level: 24 },  // Nurse Shark
          { speciesId: 1, level: 25 },   // Blacktip Reef Shark (Caribbean)
          { speciesId: 12, level: 25 },  // Lemon Shark
          { speciesId: 6, level: 26 }    // Bull Shark (ace)
        ],
        defeatedDialogue: [
          'Incredible!',
          'Your bond with your sharks is genuine.',
          'You\'ve earned the Reef Badge!',
          'With this, you can control stronger sharks.',
          'Also, take this - TM for Aqua Jet!',
          'Now you can explore deeper with Advanced SCUBA!'
        ],
        prizeMoney: 2600
      }
    },
    // Gym guide at entrance
    {
      id: 'gym-guide-coral',
      x: 10,
      y: 1,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'This is the Reef Gym!',
        'Leader Coral uses Normal and Ground type sharks.',
        'Nurse Sharks, Lemon Sharks, Bull Sharks...',
        'Bring Fighting or Electric types for an advantage!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

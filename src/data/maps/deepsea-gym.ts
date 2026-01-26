import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Deepsea Gym - Dr. Vance's final gym, deep sea research base
// Leader: Dr. Vance - Deepsea Type specialist
// The final gym before Elite Four
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,H,H,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const DEEPSEA_GYM: MapData = {
  id: 'deepsea-gym',
  name: 'Deepsea Research Base',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Abyssal Trench
    {
      x: 8,
      y: 0,
      targetMap: 'abyssal-trench',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'abyssal-trench',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'abyssal-trench',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'abyssal-trench',
      targetX: 11,
      targetY: 16
    },
    // Exit back
    {
      x: 9,
      y: 17,
      targetMap: 'abyssal-trench',
      targetX: 9,
      targetY: 2
    },
    {
      x: 10,
      y: 17,
      targetMap: 'abyssal-trench',
      targetX: 10,
      targetY: 2
    }
  ],
  npcs: [
    // Gym Leader Dr. Vance
    {
      id: 'gym-leader-vance',
      x: 10,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to the deepest gym on Earth.',
        'I am Dr. Vance, researcher of the abyss.',
        'Down here, sunlight never reaches.',
        'Ancient sharks swim in eternal darkness.',
        'Goblin Sharks with extending jaws...',
        'Frilled Sharks unchanged for eons...',
        'The Greenland Shark, older than nations.',
        'You have traveled far to reach me.',
        'Now face the power of the deep!'
      ],
      trainer: {
        name: 'Dr. Vance',
        team: [
          { speciesId: 111, level: 48 },  // Cookiecutter Shark
          { speciesId: 85, level: 50 },   // Pacific Sleeper Shark
          { speciesId: 110, level: 52 },  // Goblin Shark
          { speciesId: 115, level: 54 },  // Frilled Shark
          { speciesId: 109, level: 56 }   // Greenland Shark (ace)
        ],
        defeatedDialogue: [
          'Extraordinary... You have conquered the deep.',
          'Take this - the Deepsea Badge.',
          'The final badge. You are now a true master.',
          'With this, all sharks will respect you.',
          'But our work is not done.',
          'Finnova\'s secret lab is nearby.',
          'They\'re close to resurrecting Megalodon.',
          'You must stop them before it\'s too late.',
          'The fate of all sharks rests with you.',
          'Go. Save them. Save the ocean.'
        ],
        prizeMoney: 5600
      }
    },
    // Trainer 1
    {
      id: 'deepsea-trainer-1',
      x: 5,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The Goblin Shark is my specialty!',
        'Its jaw shoots out like a spring!',
        'You\'ll never see it coming!'
      ],
      trainer: {
        name: 'Researcher Nina',
        team: [
          { speciesId: 110, level: 46 },  // Goblin Shark
          { speciesId: 110, level: 47 }   // Goblin Shark
        ],
        defeatedDialogue: [
          'Even the goblin\'s surprise attack failed...',
          'Dr. Vance will be impressed.'
        ],
        prizeMoney: 940
      }
    },
    // Trainer 2
    {
      id: 'deepsea-trainer-2',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Sleeper Sharks are patient hunters.',
        'They wait for centuries if they must.',
        'Can you outlast mine?'
      ],
      trainer: {
        name: 'Scientist Yuri',
        team: [
          { speciesId: 84, level: 46 },   // Little Sleeper Shark
          { speciesId: 85, level: 48 }    // Pacific Sleeper Shark
        ],
        defeatedDialogue: [
          'My sleepers have awakened... to defeat.',
          'You have incredible endurance.'
        ],
        prizeMoney: 960
      }
    },
    // Trainer 3
    {
      id: 'deepsea-trainer-3',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'The Frilled Shark is a living fossil!',
        'Unchanged for 80 million years!',
        'Ancient power flows through it!'
      ],
      trainer: {
        name: 'Diver Helga',
        team: [
          { speciesId: 115, level: 49 }   // Frilled Shark
        ],
        defeatedDialogue: [
          '80 million years... defeated in minutes.',
          'Your sharks are truly exceptional.'
        ],
        prizeMoney: 980
      }
    },
    // Gym guide
    {
      id: 'deepsea-gym-guide',
      x: 6,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Deepsea Research Base.',
        'Dr. Vance is the final Gym Leader.',
        'He commands the most ancient sharks.',
        'Electric and Fighting moves help here.',
        'This is your ultimate challenge.',
        'Good luck, challenger!'
      ]
    },
    // Fossil resurrection hint
    {
      id: 'fossil-hint',
      x: 14,
      y: 14,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'We can resurrect extinct sharks here!',
        'Bring us fossils from your adventures.',
        'Helicoprion, Aquilolamna...',
        'Even Megalodon, if you find its tooth.',
        'The past can live again!'
      ]
    }
  ],
  encounterTable: [],
  isOutdoor: false
};

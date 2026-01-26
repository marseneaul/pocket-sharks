import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;
const R = TILE.REEF;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Survivor Gym - Henrik's Poison-type dogfish gym
// Theme: European waters have been heavily fished out
// Leader: Henrik - Poison Type specialist (dogfish, spurdogs)
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,R,R,R,F,F,F,F,F,F,F,F,F,R,R,R,F,F,W],  // Rocky areas
  [W,F,R,A,R,F,F,F,F,F,F,F,F,F,R,A,R,F,F,W],  // Small pools
  [W,F,R,R,R,F,F,F,F,F,F,F,F,F,R,R,R,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // Battle area
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,R,R,R,F,F,F,F,F,F,F,F,F,R,R,R,F,F,W],
  [W,F,R,A,R,F,F,F,F,F,F,F,F,F,R,A,R,F,F,W],
  [W,F,R,R,R,F,F,F,F,F,F,F,F,F,R,R,R,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,H,H,F,F,F,F,F,F,F,F,W],  // Heal near entrance
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // Entrance
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const SURVIVOR_GYM: MapData = {
  id: 'survivor-gym',
  name: 'Survivor Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to European Coast
    {
      x: 9,
      y: 17,
      targetMap: 'european-coast',
      targetX: 10,
      targetY: 5
    },
    {
      x: 10,
      y: 17,
      targetMap: 'european-coast',
      targetX: 10,
      targetY: 5
    }
  ],
  npcs: [
    // Gym Leader Henrik
    {
      id: 'gym-leader-henrik',
      x: 10,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Velkommen... Welcome, young trainer.',
        'I am Henrik, keeper of the Survivor Gym.',
        'European sharks are survivors.',
        'Our waters have been fished nearly empty.',
        'The dogfish persevere where others failed.',
        'Their venomous spines deter predators.',
        'Poison flows through their ancient veins.',
        'Let me show you the strength of survivors!'
      ],
      trainer: {
        name: 'Gym Leader Henrik',
        team: [
          { speciesId: 89, level: 35 },  // Shortnose Spurdog
          { speciesId: 83, level: 37 },  // Spiny Dogfish
          { speciesId: 92, level: 38 },  // Nursehound
          { speciesId: 90, level: 40 }   // Longnose Spurdog (ace)
        ],
        defeatedDialogue: [
          'You have survived the poison...',
          'Your sharks show true resilience.',
          'Take this - the Survivor Badge.',
          'It proves you can endure any hardship.',
          'Also take this TM - it contains Poison Fang.',
          'The venom of the dogfish is yours to command.',
          'Please... help protect what sharks remain.',
          'Europe needs trainers who care about conservation.'
        ],
        prizeMoney: 4000
      }
    },
    // Trainer 1
    {
      id: 'survivor-trainer-1',
      x: 5,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Dogfish are underrated!',
        'They\'ve been swimming these waters for millennia.',
        'Their spines pack a venomous punch!'
      ],
      trainer: {
        name: 'Fisherman Erik',
        team: [
          { speciesId: 83, level: 33 },  // Spiny Dogfish
          { speciesId: 83, level: 34 }   // Spiny Dogfish
        ],
        defeatedDialogue: [
          'The dogfish fell...',
          'They\'re tougher than they look usually.'
        ],
        prizeMoney: 680
      }
    },
    // Trainer 2
    {
      id: 'survivor-trainer-2',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The Nursehound is my partner!',
        'Larger than catsharks, fiercer too!',
        'Named for hiding among nurse sharks!'
      ],
      trainer: {
        name: 'Researcher Ingrid',
        team: [
          { speciesId: 91, level: 34 },  // Small-spotted Catshark
          { speciesId: 92, level: 35 }   // Nursehound
        ],
        defeatedDialogue: [
          'My catshark family lost...',
          'But they\'ll survive. They always do.'
        ],
        prizeMoney: 700
      }
    },
    // Trainer 3
    {
      id: 'survivor-trainer-3',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Spurdogs are the true survivors!',
        'They can live for over 70 years!',
        'Patience and poison - that\'s their secret.'
      ],
      trainer: {
        name: 'Diver Magnus',
        team: [
          { speciesId: 89, level: 34 },  // Shortnose Spurdog
          { speciesId: 90, level: 36 }   // Longnose Spurdog
        ],
        defeatedDialogue: [
          'Age and experience weren\'t enough...',
          'You\'ve earned Henrik\'s attention.'
        ],
        prizeMoney: 720
      }
    },
    // Gym guide
    {
      id: 'survivor-gym-guide',
      x: 6,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Survivor Gym.',
        'Henrik uses Poison-type dogfish.',
        'They may look harmless, but their spines are venomous!',
        'Ground and Psychic moves are super effective.',
        'Good luck, challenger.'
      ]
    },
    // Conservation message
    {
      id: 'conserve-npc',
      x: 14,
      y: 14,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Europe\'s sharks are critically endangered.',
        'Henrik fights to protect what remains.',
        'Spain alone catches more sharks than anywhere.',
        'Please... spread the word about conservation.'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

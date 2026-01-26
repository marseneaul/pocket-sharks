import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;
const K = TILE.KELP;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Safari Gym - Themba's Fairy-type shark gym
// Leader: Themba - Fairy Type specialist
// Uses Pyjama Catshark, Puffader Shyshark, Dark Shyshark, Leopard Catshark
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],  // Water features
  [W,F,A,K,K,A,F,F,F,F,F,F,F,F,A,K,K,A,F,W],  // Kelp accents
  [W,F,A,K,K,A,F,F,F,F,F,F,F,F,A,K,K,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // Open battle area
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,K,K,A,F,F,F,F,F,F,F,F,A,K,K,A,F,W],
  [W,F,A,K,K,A,F,F,F,F,F,F,F,F,A,K,K,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,H,H,F,F,F,F,F,F,F,F,W],  // Heal pad near entrance
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // Entrance
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const SAFARI_GYM: MapData = {
  id: 'safari-gym',
  name: 'Safari Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to Cape Town Coast
    {
      x: 9,
      y: 17,
      targetMap: 'cape-town-coast',
      targetX: 4,
      targetY: 11
    },
    {
      x: 10,
      y: 17,
      targetMap: 'cape-town-coast',
      targetX: 4,
      targetY: 11
    }
  ],
  npcs: [
    // Gym Leader Themba
    {
      id: 'gym-leader-themba',
      x: 10,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Sawubona, young trainer!',
        'I am Themba, guardian of the Safari Gym.',
        'South African waters have the most beautiful sharks.',
        'Small, colorful, gentle... but fierce when needed!',
        'My fairy-type catsharks may look cute...',
        'But they have survived for millions of years!',
        'Let me show you their hidden strength!'
      ],
      trainer: {
        name: 'Gym Leader Themba',
        team: [
          { speciesId: 99, level: 32 },  // Puffader Shyshark
          { speciesId: 100, level: 34 },  // Dark Shyshark
          { speciesId: 101, level: 34 },  // Leopard Catshark
          { speciesId: 98, level: 36 }   // Pyjama Catshark (ace)
        ],
        defeatedDialogue: [
          'Remarkable! Your bond with your sharks is strong.',
          'You have earned the Safari Badge!',
          'This badge proves your respect for all sharks...',
          'Even the small and overlooked ones.',
          'Remember: every species matters to the ocean!'
        ],
        prizeMoney: 3600
      }
    },
    // Trainer 1
    {
      id: 'safari-trainer-1',
      x: 4,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Shysharks are the cutest sharks!',
        'When scared, they curl into a ball!',
        'But that won\'t help you against mine!'
      ],
      trainer: {
        name: 'Diver Zandi',
        team: [
          { speciesId: 99, level: 30 },  // Puffader Shyshark
          { speciesId: 100, level: 30 }   // Dark Shyshark
        ],
        defeatedDialogue: [
          'Aww, my shy babies lost...',
          'At least they\'re still adorable!'
        ],
        prizeMoney: 600
      }
    },
    // Trainer 2
    {
      id: 'safari-trainer-2',
      x: 15,
      y: 8,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The Leopard Catshark is my partner!',
        'It hides in the kelp, waiting to strike!',
        'Can you find it before it finds you?'
      ],
      trainer: {
        name: 'Researcher Naledi',
        team: [
          { speciesId: 101, level: 31 },  // Leopard Catshark
          { speciesId: 102, level: 31 }   // Tiger Catshark
        ],
        defeatedDialogue: [
          'You spotted my catshark! Impressive!',
          'Their camouflage is usually perfect.'
        ],
        prizeMoney: 620
      }
    },
    // Trainer 3
    {
      id: 'safari-trainer-3',
      x: 10,
      y: 12,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Pyjama Catsharks are named for their stripes!',
        'Like cozy pajamas on a shark!',
        'Don\'t let the cute name fool you!'
      ],
      trainer: {
        name: 'Swimmer Thabo',
        team: [
          { speciesId: 98, level: 32 }   // Pyjama Catshark
        ],
        defeatedDialogue: [
          'My pyjama shark needs a nap after that battle!'
        ],
        prizeMoney: 640
      }
    },
    // Gym guide
    {
      id: 'safari-gym-guide',
      x: 6,
      y: 15,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Safari Gym!',
        'Leader Themba uses Fairy-type sharks.',
        'They may look harmless, but they\'re tricky!',
        'Fighting and Dark moves work well against Fairy.',
        'Good luck, challenger!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

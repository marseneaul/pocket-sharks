import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Gym walls
const F = TILE.FLOOR;  // Floor
const A = TILE.WATER;  // Decorative pools

// 20x18 tiles - Coral Gym Interior
// Marina's Psychic-type gym with decorative pools
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,A,A,A,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,F,A,A,A,F,F,F,F,F,F,F,F,A,A,A,F,F,W],  // Leader Marina position: (9,3) or (10,3)
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,F,A,A,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,F,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,W,W,F,F,F,F,W,W,F,F,F,F,F,W],  // Gym trainer positions
  [W,F,F,F,F,F,W,W,F,F,F,F,W,W,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,F,A,A,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,F,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],  // Entrance from Coral Bay
];

export const CORAL_GYM: MapData = {
  id: 'coral-gym',
  name: 'Coral Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to Coral Bay
    {
      x: 9,
      y: 17,
      targetMap: 'coral-bay',
      targetX: 9,
      targetY: 10
    },
    {
      x: 10,
      y: 17,
      targetMap: 'coral-bay',
      targetX: 10,
      targetY: 10
    }
  ],
  npcs: [
    // Gym Leader Marina
    {
      id: 'gym-leader-marina',
      x: 9,
      y: 3,
      sprite: 2,
      facing: 'down',
      dialogue: [
        'I am Marina, leader of',
        'the Coral Bay Gym!',
        'My Psychic sharks can',
        'sense your every move.',
        'Let\'s see if you can',
        'outsmart my Hammerhead!'
      ],
      trainer: {
        name: 'Leader Marina',
        team: [
          { speciesId: 10, level: 12 },  // Bonnethead
          { speciesId: 11, level: 14 }   // Scalloped Hammerhead
        ],
        defeatedDialogue: [
          'Incredible!',
          'Your bond with your',
          'shark is strong.',
          'Take this Reef Badge',
          'as proof of victory!'
        ],
        prizeMoney: 1400
      }
    },
    // Gym Trainer 1
    {
      id: 'gym-trainer-1',
      x: 6,
      y: 9,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Training Psychic types',
        'requires a calm mind.',
        'Can you stay focused?'
      ],
      trainer: {
        name: 'Swimmer Kai',
        team: [
          { speciesId: 10, level: 10 }   // Bonnethead
        ],
        defeatedDialogue: [
          'You broke my focus!',
          'Marina will avenge me.'
        ],
        prizeMoney: 200
      }
    },
    // Gym Trainer 2
    {
      id: 'gym-trainer-2',
      x: 13,
      y: 9,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Marina taught me',
        'everything I know!',
        'You won\'t get past me!'
      ],
      trainer: {
        name: 'Swimmer Nami',
        team: [
          { speciesId: 10, level: 9 },   // Bonnethead
          { speciesId: 18, level: 9 }    // Coral Catshark
        ],
        defeatedDialogue: [
          'I still have much',
          'to learn...'
        ],
        prizeMoney: 180
      }
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

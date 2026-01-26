import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;
const R = TILE.REEF;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Cold Water Gym - Pacific Northwest Ice-type shark gym
// Leader: Marina - Ice Type specialist (cold water sharks)
// Uses: Pacific Sleeper, Little Sleeper, Salmon Shark, Porbeagle
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],  // Icy water pools
  [W,F,A,R,R,A,F,F,F,F,F,F,F,F,A,R,R,A,F,W],  // Rocky ice formations
  [W,F,A,R,R,A,F,F,F,F,F,F,F,F,A,R,R,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // Battle area
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,A,R,R,A,F,F,F,F,F,F,F,F,A,R,R,A,F,W],
  [W,F,A,R,R,A,F,F,F,F,F,F,F,F,A,R,R,A,F,W],
  [W,F,A,A,A,A,F,F,F,F,F,F,F,F,A,A,A,A,F,W],
  [W,F,F,F,F,F,F,F,F,H,H,F,F,F,F,F,F,F,F,W],  // Heal near entrance
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // Entrance
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const COLD_WATER_GYM: MapData = {
  id: 'cold-water-gym',
  name: 'Cold Water Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit to Puget Sound
    {
      x: 9,
      y: 17,
      targetMap: 'puget-sound',
      targetX: 10,
      targetY: 5
    },
    {
      x: 10,
      y: 17,
      targetMap: 'puget-sound',
      targetX: 10,
      targetY: 5
    }
  ],
  npcs: [
    // Gym Leader Marina
    {
      id: 'gym-leader-marina',
      x: 10,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to the coldest gym in the region.',
        'I am Marina, specialist of the cold waters.',
        'The Pacific Northwest is home to incredible sharks.',
        'Sleeper Sharks that hunt in frigid darkness...',
        'Salmon Sharks that rival Great Whites in speed...',
        'The cold makes them strong. Resilient. Deadly.',
        'Let me show you the power of ice!'
      ],
      trainer: {
        name: 'Gym Leader Marina',
        team: [
          { speciesId: 89, level: 32 },  // Little Sleeper Shark
          { speciesId: 91, level: 34 },  // Porbeagle
          { speciesId: 92, level: 35 },  // Salmon Shark
          { speciesId: 90, level: 38 }   // Pacific Sleeper Shark (ace)
        ],
        defeatedDialogue: [
          'The cold... has not frozen you.',
          'Your sharks burn bright with fighting spirit.',
          'Take this - the Glacier Badge.',
          'It proves you can survive the coldest waters.',
          'Also take this TM - it contains Ice Fang.',
          'The bite of the frozen deep is now yours.',
          'The Greenland Shark waits in the coldest abyss...',
          'Perhaps one day you will find it.'
        ],
        prizeMoney: 3400
      }
    },
    // Trainer 1
    {
      id: 'cold-trainer-1',
      x: 5,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Sleeper Sharks are slow but patient.',
        'They ambush prey from the deep darkness.',
        'You won\'t see them coming!'
      ],
      trainer: {
        name: 'Diver Ingrid',
        team: [
          { speciesId: 89, level: 30 },  // Little Sleeper Shark
          { speciesId: 89, level: 31 }   // Little Sleeper Shark
        ],
        defeatedDialogue: [
          'My sleepers have been awakened...',
          'But the cold water awaits you still.'
        ],
        prizeMoney: 620
      }
    },
    // Trainer 2
    {
      id: 'cold-trainer-2',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Salmon Sharks are warm-blooded!',
        'They can swim in freezing water at top speed!',
        'Try keeping up with mine!'
      ],
      trainer: {
        name: 'Fisherman Olaf',
        team: [
          { speciesId: 91, level: 31 },  // Porbeagle
          { speciesId: 92, level: 32 }   // Salmon Shark
        ],
        defeatedDialogue: [
          'Too fast for me to handle...',
          'Your sharks have fire in their blood!'
        ],
        prizeMoney: 640
      }
    },
    // Trainer 3
    {
      id: 'cold-trainer-3',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'The Pacific Sleeper is a true deep-sea giant.',
        'It lives where sunlight never reaches.',
        'Cold, dark, and deadly!'
      ],
      trainer: {
        name: 'Researcher Eva',
        team: [
          { speciesId: 90, level: 33 }   // Pacific Sleeper Shark
        ],
        defeatedDialogue: [
          'Even the deep sea giant fell...',
          'Marina will be a true challenge.'
        ],
        prizeMoney: 660
      }
    },
    // Gym guide
    {
      id: 'cold-gym-guide',
      x: 6,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Cold Water Gym!',
        'Marina uses Ice-type cold water sharks.',
        'Fire and Fighting moves are super effective!',
        'Don\'t let the chill get to you!',
        'Good luck, challenger!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

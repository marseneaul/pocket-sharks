import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;
const S = TILE.SAND;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Outback Gym - Jack's Ground-type carpet shark gym
// Leader: Jack - Ground Type specialist
// Uses: Epaulette Shark, Wobbegong, Tawny Nurse Shark, Blind Shark
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,S,S,S,S,F,F,F,F,F,F,F,F,S,S,S,S,F,W],
  [W,F,S,A,A,S,F,F,F,F,F,F,F,F,S,A,A,S,F,W],
  [W,F,S,A,A,S,F,F,F,F,F,F,F,F,S,A,A,S,F,W],
  [W,F,S,S,S,S,F,F,F,F,F,F,F,F,S,S,S,S,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,S,S,S,S,F,F,F,F,F,F,F,F,S,S,S,S,F,W],
  [W,F,S,A,A,S,F,F,F,F,F,F,F,F,S,A,A,S,F,W],
  [W,F,S,A,A,S,F,F,F,F,F,F,F,F,S,A,A,S,F,W],
  [W,F,S,S,S,S,F,F,F,F,F,F,F,F,S,S,S,S,F,W],
  [W,F,F,F,F,F,F,F,F,H,H,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const OUTBACK_GYM: MapData = {
  id: 'outback-gym',
  name: 'Outback Gym',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Great Barrier Reef
    {
      x: 8,
      y: 0,
      targetMap: 'great-barrier-reef',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'great-barrier-reef',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'great-barrier-reef',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'great-barrier-reef',
      targetX: 11,
      targetY: 16
    },
    // Exit south
    {
      x: 9,
      y: 17,
      targetMap: 'great-barrier-reef',
      targetX: 9,
      targetY: 2
    },
    {
      x: 10,
      y: 17,
      targetMap: 'great-barrier-reef',
      targetX: 10,
      targetY: 2
    }
  ],
  npcs: [
    // Gym Leader Jack
    {
      id: 'gym-leader-jack',
      x: 10,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'G\'day mate! Welcome to the Outback Gym!',
        'I\'m Jack, keeper of the ground-dwelling sharks.',
        'My carpet sharks don\'t swim - they WALK!',
        'Epaulettes use their fins like legs.',
        'Wobbegongs lie in wait, perfectly camouflaged.',
        'They\'re patient hunters. Deadly ambushers.',
        'Let\'s see if you can spot my sharks before they strike!'
      ],
      trainer: {
        name: 'Gym Leader Jack',
        team: [
          { speciesId: 78, level: 40 },  // Tawny Nurse Shark
          { speciesId: 78, level: 42 },  // Tawny Nurse Shark
          { speciesId: 7, level: 43 },   // Grey Reef Shark
          { speciesId: 82, level: 45 }   // Tiger Shark (ace)
        ],
        defeatedDialogue: [
          'Crikey! You saw right through my ambush!',
          'Your sharks have incredible instincts!',
          'Take this - the Outback Badge!',
          'It proves you can handle any terrain.',
          'Also take this TM - it contains Earthquake.',
          'Even the seafloor will shake at your command!',
          'One more thing, mate...',
          'Finnova\'s headquarters is near here.',
          'I\'ve seen their operations. It\'s terrible.',
          'Someone needs to stop them. Maybe you?'
        ],
        prizeMoney: 4500
      }
    },
    // Trainer 1
    {
      id: 'outback-trainer-1',
      x: 5,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Carpet sharks are masters of camouflage!',
        'Can you see mine before it\'s too late?'
      ],
      trainer: {
        name: 'Diver Sheila',
        team: [
          { speciesId: 78, level: 38 },  // Tawny Nurse Shark
          { speciesId: 78, level: 39 }   // Tawny Nurse Shark
        ],
        defeatedDialogue: [
          'You spotted them! Good eyes, mate!'
        ],
        prizeMoney: 780
      }
    },
    // Trainer 2
    {
      id: 'outback-trainer-2',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'My Nurse Shark is a gentle giant!',
        'Don\'t let that fool you though!'
      ],
      trainer: {
        name: 'Swimmer Bruce',
        team: [
          { speciesId: 78, level: 39 },  // Tawny Nurse Shark
          { speciesId: 7, level: 40 }    // Grey Reef Shark
        ],
        defeatedDialogue: [
          'Too strong! Fair dinkum battle though!'
        ],
        prizeMoney: 800
      }
    },
    // Trainer 3
    {
      id: 'outback-trainer-3',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'The Tiger Shark is the ultimate predator!',
        'It eats anything - even license plates!',
        'Are you ready for this?'
      ],
      trainer: {
        name: 'Fisherman Mick',
        team: [
          { speciesId: 82, level: 41 }   // Tiger Shark
        ],
        defeatedDialogue: [
          'Strewth! The tiger got tamed!'
        ],
        prizeMoney: 820
      }
    },
    // Gym guide
    {
      id: 'outback-gym-guide',
      x: 6,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to the Outback Gym!',
        'Jack uses Ground-type carpet sharks.',
        'Water and Grass moves work well here!',
        'Watch for ambushes - they hide in the sand!',
        'Good luck, challenger!'
      ]
    }
  ],
  encounterTable: [],
  isOutdoor: false
};

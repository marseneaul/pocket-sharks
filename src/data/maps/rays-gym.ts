import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;  // Shallow pools in the gym

// 20x18 tiles = 160x144 pixels
// Ray's Gym - First Gym (Ray Badge)
// Leader: Ray - Specializes in Ray-type (stingrays, rays)
// Layout: Gym with shallow pools, trainers, and the leader at the back
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],  // Decorative pools
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // West entrance
  [F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const RAYS_GYM: MapData = {
  id: 'rays-gym',
  name: "Ray's Gym",
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West entrance from San Diego Bay
    {
      x: 0,
      y: 9,
      targetMap: 'san-diego-bay',
      targetX: 18,
      targetY: 10
    },
    {
      x: 0,
      y: 10,
      targetMap: 'san-diego-bay',
      targetX: 18,
      targetY: 11
    }
  ],
  npcs: [
    // Gym Guide at entrance
    {
      id: 'gym-guide-ray',
      x: 3,
      y: 10,
      sprite: 0,
      facing: 'right',
      spriteType: 'swimmer',
      dialogue: [
        'Welcome to Ray\'s Gym!',
        'This gym specializes in Ray-type sharks.',
        'Defeat the trainers to reach the Gym Leader!',
        'Good luck!'
      ]
    },
    // Gym Trainer 1
    {
      id: 'gym-trainer-1',
      x: 6,
      y: 4,
      sprite: 0,
      facing: 'down',
      spriteType: 'diver',
      dialogue: [
        'Rays are graceful but dangerous!',
        'Feel the sting of my team!'
      ],
      trainer: {
        name: 'Aquarist Tom',
        team: [
          { speciesId: 47, level: 9 },   // Round Stingray
          { speciesId: 57, level: 10 }   // Butterfly Ray
        ],
        defeatedDialogue: [
          'Your sharks outswam my rays!',
          'Ray won\'t be as easy...'
        ],
        prizeMoney: 200
      }
    },
    // Gym Trainer 2
    {
      id: 'gym-trainer-2',
      x: 13,
      y: 7,
      sprite: 0,
      facing: 'left',
      spriteType: 'scientist',
      dialogue: [
        'I\'ve studied ray behavior for years!',
        'Let me show you what I\'ve learned!'
      ],
      trainer: {
        name: 'Researcher Lisa',
        team: [
          { speciesId: 47, level: 10 },  // Round Stingray
          { speciesId: 54, level: 10 },  // Guitarfish
          { speciesId: 58, level: 11 }   // Smooth Butterfly Ray
        ],
        defeatedDialogue: [
          'Remarkable battle tactics!',
          'Ray will want to see this.'
        ],
        prizeMoney: 220
      }
    },
    // Gym Trainer 3 (optional side trainer)
    {
      id: 'gym-trainer-3',
      x: 6,
      y: 13,
      sprite: 0,
      facing: 'right',
      spriteType: 'swimmer',
      dialogue: [
        'You think you can beat our leader?',
        'Prove yourself against me first!'
      ],
      trainer: {
        name: 'Swimmer Derek',
        team: [
          { speciesId: 55, level: 11 },  // Giant Guitarfish
          { speciesId: 47, level: 11 }   // Round Stingray
        ],
        defeatedDialogue: [
          'Okay, you might have a chance.',
          'Ray is just ahead.'
        ],
        prizeMoney: 220
      }
    },
    // GYM LEADER RAY
    {
      id: 'gym-leader-ray',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      spriteType: 'gymleader',
      dialogue: [
        'So you\'ve made it through my gym!',
        'I\'m Ray, the Gym Leader of San Diego Bay.',
        'I\'ve dedicated my life to studying rays.',
        'Their grace... their power... their elegance!',
        'Show me you understand the way of the ray!'
      ],
      trainer: {
        name: 'Leader Ray',
        team: [
          { speciesId: 47, level: 12 },  // Round Stingray
          { speciesId: 58, level: 12 },  // Smooth Butterfly Ray
          { speciesId: 55, level: 13 },  // Giant Guitarfish
          { speciesId: 60, level: 14 }   // Bat Ray (ace)
        ],
        defeatedDialogue: [
          '...',
          'Magnificent! Truly magnificent!',
          'You\'ve shown respect for all ocean creatures, not just rays.',
          'Take this - the Ray Badge!',
          'It proves you defeated me, Ray of San Diego!',
          'Also, take this TM. It contains Wing Attack.',
          'Use it to teach your sharks the elegance of rays!',
          'Your next destination should be Hawaii.',
          'The harbor master can arrange boat passage.',
          'There you can earn your Open Water SCUBA certification!',
          'New depths await you, trainer!'
        ],
        prizeMoney: 1400
      }
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

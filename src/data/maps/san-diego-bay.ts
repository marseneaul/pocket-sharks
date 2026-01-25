import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const D = TILE.DOCK;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// San Diego Bay - Harbor town with Ray's Gym
// Layout: Harbor/dock area with buildings, gym entrance on the right
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Kelp Forest
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],  // Docks
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],
  [W,D,D,D,D,D,S,S,S,S,S,S,S,S,D,D,D,D,D,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],  // Buildings start
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,F,H,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],  // Healing center (left building)
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,F,W,W,W],
  [W,D,D,D,D,D,S,S,S,S,S,S,S,S,S,S,F,F,F,F],  // East exit to Ray's Gym
  [W,D,D,D,D,D,S,S,S,S,S,S,S,S,S,S,F,F,F,F],
  [W,D,D,D,D,D,S,S,S,S,S,S,S,S,D,D,D,D,D,W],
  [W,D,D,D,D,D,S,S,S,S,S,S,S,S,D,D,D,D,D,W],
  [W,A,A,A,A,A,S,S,S,S,S,S,S,S,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // South blocked (story progression later)
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const SAN_DIEGO_BAY: MapData = {
  id: 'san-diego-bay',
  name: 'San Diego Bay',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Kelp Forest
    {
      x: 8,
      y: 0,
      targetMap: 'kelp-forest-route',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'kelp-forest-route',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'kelp-forest-route',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'kelp-forest-route',
      targetX: 11,
      targetY: 16
    },
    // East exit to Ray's Gym
    {
      x: 19,
      y: 10,
      targetMap: 'rays-gym',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 11,
      targetMap: 'rays-gym',
      targetX: 1,
      targetY: 10
    },
    // West dock to Hawaii (boat travel, requires Ray Badge)
    // TODO: Implement badge check for warps
    {
      x: 1,
      y: 2,
      targetMap: 'hawaii-airport',
      targetX: 10,
      targetY: 14,
      blockedMessage: 'The boat to Hawaii requires the Ray Badge.'
    },
    {
      x: 2,
      y: 2,
      targetMap: 'hawaii-airport',
      targetX: 10,
      targetY: 14,
      blockedMessage: 'The boat to Hawaii requires the Ray Badge.'
    }
  ],
  npcs: [
    // Healing Center Nurse
    {
      id: 'nurse-bay',
      x: 2,
      y: 6,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to San Diego Bay Pokemon Center!',
        'Let me heal your sharks.',
        'Step on the healing pool to restore your team!'
      ]
    },
    // Shop NPC
    {
      id: 'shop-bay',
      x: 16,
      y: 6,
      sprite: 0,
      facing: 'down',
      shopId: 'san-diego-shop',
      dialogue: [
        'Welcome to the Bay Mart!',
        'Stock up before challenging the gym!'
      ]
    },
    // Gym guide NPC
    {
      id: 'gym-guide',
      x: 14,
      y: 10,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Ray\'s Gym is just to the east!',
        'He specializes in Ray-type sharks.',
        'Stingrays, Butterfly Rays, Guitarfish...',
        'Watch out for their defensive abilities!'
      ]
    },
    // Fisherman on dock
    {
      id: 'dock-fisherman',
      x: 4,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The waters here are getting strange.',
        'Fewer sharks than before...',
        'I heard there\'s a big company called Finnova doing something offshore.'
      ]
    },
    // Harbor master
    {
      id: 'harbor-master',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to San Diego Bay Harbor!',
        'After you beat Ray, you can take a boat to Hawaii.',
        'That\'s where you can get your SCUBA certification!'
      ]
    },
    // Kid near gym
    {
      id: 'gym-fan',
      x: 17,
      y: 8,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Ray is so cool!',
        'His Bat Ray is super strong!',
        'I want to be a ray trainer too someday!'
      ]
    },
    // Story NPC - mentions Hawaii trip
    {
      id: 'traveler',
      x: 7,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I just got back from Hawaii!',
        'The diving there is incredible.',
        'You should get your Open Water cert there.',
        'It unlocks so many new dive sites!'
      ]
    }
  ],
  encounterTable: [], // No encounters in town (it's a harbor)
  isOutdoor: true
};

import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Buildings/walls
const F = TILE.FLOOR;  // Floor/path
const S = TILE.SAND;   // Sandy area
const A = TILE.WATER;  // Decorative water
const H = TILE.HEAL;   // Healing pool (Shark Center)
const D = TILE.DOCK;   // Dock areas

// 20x18 tiles - Coral Bay Town
// First gym town with Shark Center, Shop, and Marina's Gym
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],  // North exit to Route 2
  [W,F,F,F,F,F,W,W,W,F,F,W,W,W,F,F,F,F,F,W],
  [W,F,W,W,W,F,W,H,H,H,H,H,H,W,F,W,W,W,F,W],  // Shark Center (left), Shop placeholder (right)
  [W,F,W,W,W,F,W,H,H,H,H,H,H,W,F,W,W,W,F,W],
  [W,F,F,F,F,F,W,W,W,F,F,W,W,W,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F],  // East exit row 1
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F],  // East exit row 2
  [W,F,F,F,W,W,W,W,W,W,W,W,W,W,W,W,F,F,F,W],
  [W,F,F,F,W,W,W,W,W,W,W,W,W,W,W,W,F,F,F,W],  // Marina's Gym
  [W,F,F,F,W,W,W,W,W,F,F,W,W,W,W,W,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,S,S,S,S,D,D,D,D,D,D,D,D,D,D,S,S,S,S,W],
  [W,S,S,A,A,D,D,D,D,D,D,D,D,D,D,A,A,S,S,W],
  [W,S,A,A,A,D,D,D,D,D,D,D,D,D,D,A,A,A,S,W],
  [W,S,A,A,A,A,S,S,S,S,S,S,S,S,A,A,A,A,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // South boundary (beach area)
];

export const CORAL_BAY: MapData = {
  id: 'coral-bay',
  name: 'Coral Bay Town',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North exit to Route 2 (exit top → appear at bottom)
    {
      x: 9,
      y: 0,
      targetMap: 'route-2',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'route-2',
      targetX: 10,
      targetY: 16
    },
    // Gym entrance
    {
      x: 9,
      y: 9,
      targetMap: 'coral-gym',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 9,
      targetMap: 'coral-gym',
      targetX: 10,
      targetY: 16
    },
    // East exit to Route 3
    {
      x: 19,
      y: 5,
      targetMap: 'route-3',
      targetX: 1,
      targetY: 3
    },
    {
      x: 19,
      y: 6,
      targetMap: 'route-3',
      targetX: 1,
      targetY: 4
    }
  ],
  npcs: [
    // Welcoming NPC
    {
      id: 'coral-welcome',
      x: 6,
      y: 6,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to Coral Bay!',
        'Our town is famous for',
        'beautiful coral reefs.',
        'The Gym Leader Marina',
        'uses Psychic types!'
      ]
    },
    // Shark Center NPC (nurse)
    {
      id: 'coral-nurse',
      x: 10,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to the Shark Center!',
        'Step on the healing pool',
        'to restore your team.',
        'We\'ll take care of them!'
      ]
    },
    // PC Terminal
    {
      id: 'coral-pc',
      x: 8,
      y: 2,
      sprite: 1,
      facing: 'down',
      isPcTerminal: true,
      dialogue: [
        'Shark Storage System',
        'Press A to access.'
      ]
    },
    // Info NPC near gym
    {
      id: 'coral-info',
      x: 13,
      y: 10,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Marina is tough!',
        'Her Hammerhead can',
        'predict your moves.',
        'Watch out for Psychic!'
      ]
    },
    // Shop clerk
    {
      id: 'coral-shop',
      x: 16,
      y: 3,
      sprite: 0,
      facing: 'down',
      shopId: 'coral-bay',
      dialogue: [
        'Welcome to Coral Market!',
        'We have everything a',
        'shark trainer needs!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in town
  isOutdoor: true
};

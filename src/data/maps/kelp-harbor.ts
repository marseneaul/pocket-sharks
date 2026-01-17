import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;   // Buildings/walls
const F = TILE.FLOOR;  // Floor/path
const S = TILE.SAND;   // Sandy area
const A = TILE.WATER;  // Harbor water
const K = TILE.KELP;   // Decorative kelp
const H = TILE.HEAL;   // Healing pool (Shark Center)
const D = TILE.DOCK;   // Dock/pier areas

// 20x18 tiles - Kelp Harbor Town
// Second gym town with Electric-type gym, expanded shop
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Top boundary
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,W,W,W,F,F,W,W,W,W,W,W,F,F,W,W,W,F,W],  // Shop (left)
  [W,F,W,W,W,F,F,W,W,W,W,W,W,F,F,W,W,W,F,W],  // Gym (center)
  [W,F,F,F,F,F,F,W,W,F,F,W,W,F,F,F,F,F,F,W],  // Shark Center (right)
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [F,F,F,D,D,D,D,D,D,D,D,D,D,D,D,D,D,F,F,F],  // West/East exits + Pier
  [F,F,F,D,D,D,D,D,D,D,D,D,D,D,D,D,D,F,F,F],
  [W,S,S,D,D,D,D,D,D,D,D,D,D,D,D,D,D,S,S,W],
  [W,S,A,A,A,D,D,D,D,D,D,D,D,D,D,A,A,A,S,W],
  [W,A,A,K,A,A,D,D,D,D,D,D,D,D,A,A,K,A,A,W],
  [W,A,K,A,A,A,A,A,A,A,A,A,A,A,A,A,A,K,A,W],
  [W,A,A,A,K,A,A,A,K,A,A,K,A,A,A,K,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // Bottom boundary
];

// Add Shark Center healing tiles
tiles[2][15] = H; tiles[2][16] = H; tiles[2][17] = H;
tiles[3][15] = H; tiles[3][16] = H; tiles[3][17] = H;

export const KELP_HARBOR: MapData = {
  id: 'kelp-harbor',
  name: 'Kelp Harbor Town',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West exit to Route 3
    {
      x: 0,
      y: 9,
      targetMap: 'route-3',
      targetX: 18,
      targetY: 3
    },
    {
      x: 0,
      y: 10,
      targetMap: 'route-3',
      targetX: 18,
      targetY: 4
    },
    // East exit to Route 4
    {
      x: 19,
      y: 9,
      targetMap: 'route-4',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 10,
      targetMap: 'route-4',
      targetX: 1,
      targetY: 10
    },
    // Gym entrance
    {
      x: 9,
      y: 4,
      targetMap: 'kelp-gym',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 4,
      targetMap: 'kelp-gym',
      targetX: 10,
      targetY: 16
    }
  ],
  npcs: [
    // Shop clerk
    {
      id: 'harbor-shop',
      x: 3,
      y: 3,
      sprite: 0,
      facing: 'down',
      shopId: 'kelp-harbor',
      dialogue: [
        'Welcome to Harbor Mart!',
        'We have a great selection',
        'for serious trainers!'
      ]
    },
    // PC Terminal
    {
      id: 'harbor-pc',
      x: 15,
      y: 2,
      sprite: 1,
      facing: 'down',
      isPcTerminal: true,
      dialogue: [
        'Shark Storage System',
        'Press A to access.'
      ]
    },
    // Shark Center nurse
    {
      id: 'harbor-nurse',
      x: 17,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Kelp Harbor',
        'Shark Center!',
        'Your sharks look tired.',
        'Use the healing pool!'
      ]
    },
    // Gym guide
    {
      id: 'harbor-gymguide',
      x: 7,
      y: 5,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Captain Volt runs the',
        'Electric-type gym here.',
        'His Lanternsharks are',
        'shockingly powerful!',
        'Watch out for paralysis!'
      ]
    },
    // Fisherman on pier
    {
      id: 'harbor-fisher',
      x: 10,
      y: 11,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I\'ve been seeing some',
        'suspicious folks east',
        'of here on Route 4.',
        'They wear matching',
        'uniforms... Team Finner?'
      ]
    },
    // Sailor NPC
    {
      id: 'harbor-sailor',
      x: 5,
      y: 9,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Ahoy! This harbor used',
        'to be busier before',
        'Team Finner showed up.',
        'They\'re bad for business!'
      ]
    },
    // Welcoming NPC
    {
      id: 'harbor-welcome',
      x: 12,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Welcome to Kelp Harbor!',
        'We\'re a fishing town',
        'with a proud tradition.',
        'The kelp forests nearby',
        'are beautiful!'
      ]
    },
    // Kid NPC
    {
      id: 'harbor-kid',
      x: 3,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Did you know Torpedo',
        'Rays can shock you?',
        'Captain Volt has one!',
        'It\'s super cool!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in town
  isOutdoor: true
};

import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Cabo Town - Town with Dr. Martillo's gym
// Layout: Town with buildings, gym entrance on east side
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,F,H,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],  // Healing center left
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,W,W,W,W,W,W,S,S,S,S,S,S,W,W,W,W,W,F,F],  // East to Martillo Gym
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,F,F],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W,W],
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],  // West from Beach
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,W,W,W,S,S,S,S,S,S,W,W,W,W,W,W,W],
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const CABO_TOWN: MapData = {
  id: 'cabo-town',
  name: 'Cabo Town',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West exit to Cabo Beach
    {
      x: 0,
      y: 8,
      targetMap: 'cabo-beach',
      targetX: 18,
      targetY: 8
    },
    {
      x: 0,
      y: 9,
      targetMap: 'cabo-beach',
      targetX: 18,
      targetY: 9
    },
    // East exit to Martillo Gym
    {
      x: 19,
      y: 5,
      targetMap: 'martillo-gym',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 6,
      targetMap: 'martillo-gym',
      targetX: 1,
      targetY: 10
    }
  ],
  npcs: [
    // Healing center nurse
    {
      id: 'nurse-cabo-town',
      x: 2,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Cabo Town Pokemon Center!',
        'Step on the healing pool to restore your team.',
        'Dr. Martillo\'s gym is just to the east.'
      ]
    },
    // Shop keeper
    {
      id: 'shop-cabo-town',
      x: 16,
      y: 2,
      sprite: 0,
      facing: 'down',
      shopId: 'cabo-town-shop',
      dialogue: [
        'Hola! Ready to challenge Dr. Martillo?',
        'Stock up on supplies first!'
      ]
    },
    // Gym fan
    {
      id: 'gym-fan-1',
      x: 14,
      y: 6,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Dr. Martillo is incredible!',
        'He\'s studied hammerheads for 30 years!',
        'His Great Hammerhead is unbeatable!'
      ]
    },
    // Local with Finnova concerns
    {
      id: 'concerned-local',
      x: 6,
      y: 9,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Dr. Martillo has been speaking out against Finnova.',
        'He says their "sustainable farming" is a lie.',
        'They\'re actually catching wild sharks for their fins.',
        'The hammerhead populations are dropping because of them.'
      ]
    },
    // Trainer giving tips
    {
      id: 'gym-tipper',
      x: 10,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Dr. Martillo uses Psychic-type hammerheads.',
        'They have powerful electroreception.',
        'Bring Dark or Ghost types if you have them!',
        'Steel types also resist Psychic moves.'
      ]
    },
    // PC terminal
    {
      id: 'pc-cabo',
      x: 4,
      y: 14,
      sprite: 1,
      facing: 'down',
      isPcTerminal: true,
      dialogue: [
        'PC accessed.',
        'Deposit or withdraw your sharks.'
      ]
    },
    // Another NPC with story
    {
      id: 'old-fisherman',
      x: 3,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I\'ve fished these waters for 50 years.',
        'Never seen the sharks disappear so fast.',
        'Finnova arrived 5 years ago.',
        'Coincidence? I think not.'
      ]
    }
  ],
  encounterTable: [], // No encounters in town
  isOutdoor: true
};

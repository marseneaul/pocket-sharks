import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Waikiki Beach - Tourist town with shops, healing center
// Layout: Beach town with buildings, connects to airport, dive school, and reef
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // North - airport connection
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,F,H,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],  // Healing center (left)
  [W,F,F,F,F,W,W,S,S,S,S,S,S,W,W,F,F,F,F,W],
  [W,W,W,W,W,W,W,S,S,S,S,S,S,W,W,W,W,W,F,F],  // East exit to Dive School
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,F,F],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],  // Shallow water
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South exit to Hawaii Reef
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const WAIKIKI_BEACH: MapData = {
  id: 'waikiki-beach',
  name: 'Waikiki Beach',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Airport
    {
      x: 8,
      y: 0,
      targetMap: 'hawaii-airport',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'hawaii-airport',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'hawaii-airport',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'hawaii-airport',
      targetX: 11,
      targetY: 16
    },
    // East exit to Dive School
    {
      x: 19,
      y: 5,
      targetMap: 'dive-school',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 6,
      targetMap: 'dive-school',
      targetX: 1,
      targetY: 10
    },
    // South exit to Hawaii Reef (swimming)
    {
      x: 8,
      y: 17,
      targetMap: 'hawaii-reef',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'hawaii-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'hawaii-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'hawaii-reef',
      targetX: 11,
      targetY: 1
    },
    // West boat dock to Cabo (after SCUBA certification)
    // TODO: Implement certification check
    {
      x: 0,
      y: 6,
      targetMap: 'cabo-harbor',
      targetX: 10,
      targetY: 10,
      blockedMessage: 'The boat to Cabo requires SCUBA certification.'
    }
  ],
  npcs: [
    // Healing center nurse
    {
      id: 'nurse-waikiki',
      x: 2,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Aloha! Welcome to the Waikiki Pokemon Center!',
        'Step on the healing pool to restore your team!',
        'Have you visited the Dive School yet?'
      ]
    },
    // Shop NPC
    {
      id: 'shop-waikiki',
      x: 16,
      y: 2,
      sprite: 0,
      facing: 'down',
      shopId: 'waikiki-shop',
      dialogue: [
        'Aloha! Welcome to the Waikiki Surf Shop!',
        'Stock up before your certification dives!'
      ]
    },
    // Beach tourist
    {
      id: 'beach-tourist',
      x: 5,
      y: 8,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The water here is so clear!',
        'I can see reef sharks from the shore!',
        'Too bad we can\'t catch them without a permit...'
      ]
    },
    // Local surfer
    {
      id: 'local-surfer',
      x: 12,
      y: 10,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Brah, the reef south of here is amazing!',
        'Whitetip and Blacktip reef sharks everywhere!',
        'But the locals protect them - no catching allowed.',
        'You can look, but you\'ll need to come back with a permit.'
      ]
    },
    // Dive instructor recruiter
    {
      id: 'dive-recruiter',
      x: 16,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Looking to get SCUBA certified?',
        'Head east to the Dive School!',
        'Once certified, you can dive deeper waters anywhere.',
        'It\'ll open up whole new areas to explore!'
      ]
    },
    // Kid playing on beach
    {
      id: 'beach-kid',
      x: 8,
      y: 6,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I want to be a shark trainer when I grow up!',
        'But Mom says I need to learn to swim better first.',
        'Then I can get my diving certification!'
      ]
    },
    // Boat captain to Cabo
    {
      id: 'cabo-boat-captain',
      x: 2,
      y: 7,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Aloha! I run boats to Cabo San Lucas.',
        'Beautiful diving there - Sea of Cortez, hammerheads!',
        'Once you have your SCUBA certification, I can take you.',
        'Just head west to board my boat.'
      ]
    }
  ],
  // No wild encounters on Waikiki Beach - it's a tourist area
  encounterTable: [],
  isOutdoor: true,
  palette: 'tropical'  // Hawaiian tropical beach
};

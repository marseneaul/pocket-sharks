import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Maui Airport - Return to Hawaii, gateway to open ocean diving
// Player now has proper certifications to catch Hawaiian sharks
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // Terminal building
  [W,F,F,F,F,F,H,F,F,F,F,F,F,H,F,F,F,F,F,W],  // Heal stations
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,F,F,F,W,W,W,W,F,F,F,W,W,W,W,W],
  [S,S,S,S,S,F,F,F,S,S,S,S,F,F,F,S,S,S,S,S],  // Beach area
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],  // Shallow water
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to Open Ocean
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const MAUI_AIRPORT: MapData = {
  id: 'maui-airport',
  name: 'Maui-Kahului Airport',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to Open Ocean
    {
      x: 8,
      y: 17,
      targetMap: 'open-ocean',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'open-ocean',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'open-ocean',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'open-ocean',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Airport greeter
    {
      id: 'airport-greeter-maui',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Aloha! Welcome back to Hawaii!',
        'Now that you have your SCUBA certification...',
        'You can finally dive with our sharks!',
        'The open ocean south of here is incredible.'
      ]
    },
    // Shop keeper
    {
      id: 'shop-maui',
      x: 6,
      y: 3,
      sprite: 0,
      facing: 'down',
      shopId: 'maui-shop',
      dialogue: [
        'Aloha! Need supplies for deep diving?',
        'The open ocean has big sharks!'
      ]
    },
    // Dive master
    {
      id: 'dive-master-maui',
      x: 14,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'You passed your certification!',
        'Now you can catch Hawaiian sharks!',
        'Grey Reef Sharks patrol the reefs.',
        'Galapagos Sharks roam deeper waters.',
        'And Silvertip Sharks are the apex here.',
        'Respect the ocean, and it will reward you.'
      ]
    },
    // Local giving gym direction
    {
      id: 'local-maui',
      x: 4,
      y: 6,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Looking for Gym Leader Kai?',
        'His Ocean Gym is out in the open water.',
        'He specializes in flying-type sharks.',
        'Breaching, jumping, soaring above the waves!',
        'It\'s really something to see.'
      ]
    },
    // Manta ray enthusiast
    {
      id: 'manta-fan',
      x: 15,
      y: 6,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Have you seen the manta rays?',
        'They\'re like underwater birds!',
        'Their wings span over 20 feet!',
        'Whale sharks visit here too sometimes.',
        'The biggest fish in the entire ocean!'
      ]
    },
    // Warning about deep water
    {
      id: 'deep-warning',
      x: 10,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Be careful in the open ocean...',
        'Tiger Sharks hunt out there.',
        'They\'re curious and will investigate anything.',
        'Stay calm and they usually leave you alone.',
        'Usually...'
      ]
    }
  ],
  encounterTable: [
    // Shallow reef encounters
    { speciesId: 1, minLevel: 22, maxLevel: 28, weight: 25 },   // Blacktip Reef Shark
    { speciesId: 4, minLevel: 22, maxLevel: 28, weight: 25 },   // Whitetip Reef Shark
    { speciesId: 7, minLevel: 24, maxLevel: 30, weight: 20 },   // Grey Reef Shark
    { speciesId: 73, minLevel: 24, maxLevel: 30, weight: 20 },  // Tawny Nurse Shark
    { speciesId: 27, minLevel: 28, maxLevel: 34, weight: 10 }   // Manta Ray
  ],
  isOutdoor: true
};

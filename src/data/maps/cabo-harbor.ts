import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const D = TILE.DOCK;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Cabo Harbor - Arrival town from Hawaii, introduction to Team Finn
// Layout: Harbor with docks, buildings, beach area
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],  // North docks
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,F,H,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],  // Healing center left
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,S],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,F],  // East exit to Cabo Beach
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,F],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to Cabo Reef
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const CABO_HARBOR: MapData = {
  id: 'cabo-harbor',
  name: 'Cabo San Lucas Harbor',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // East exit to Cabo Beach
    {
      x: 19,
      y: 9,
      targetMap: 'cabo-beach',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 10,
      targetMap: 'cabo-beach',
      targetX: 1,
      targetY: 10
    },
    // South exit to Cabo Reef (swimming)
    {
      x: 8,
      y: 17,
      targetMap: 'cabo-reef',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'cabo-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'cabo-reef',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'cabo-reef',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Healing center nurse
    {
      id: 'nurse-cabo',
      x: 2,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Bienvenidos! Welcome to Cabo San Lucas!',
        'Step on the healing pool to restore your sharks.',
        'Be careful out there - I\'ve heard strange rumors...'
      ]
    },
    // Shop keeper
    {
      id: 'shop-cabo',
      x: 16,
      y: 5,
      sprite: 0,
      facing: 'down',
      shopId: 'cabo-shop',
      dialogue: [
        'Hola! Welcome to my shop!',
        'Stock up before heading to the Sea of Cortez!'
      ]
    },
    // TEAM FINN INTRO - Suspicious boat
    {
      id: 'finn-worker-1',
      x: 2,
      y: 1,
      sprite: 0,
      facing: 'down',
      dialogue: [
        '...',
        'Hey! What are you looking at?',
        'This is Finnova Biotech property!',
        'We\'re just... loading research equipment.',
        'Nothing to see here. Move along!'
      ]
    },
    // Witness to finning operation
    {
      id: 'worried-fisherman',
      x: 15,
      y: 2,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'ve seen things, amigo...',
        'Late at night, those Finnova boats come in...',
        'Loaded with shark fins. Hundreds of them.',
        'They say it\'s "sustainable farming" but...',
        'I know what I saw. Those fins came from wild sharks.'
      ]
    },
    // Local giving info
    {
      id: 'local-guide',
      x: 10,
      y: 8,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Welcome to Cabo! Famous for hammerhead sharks!',
        'The Sea of Cortez to the east is incredible.',
        'Schools of hundreds of hammerheads gather there!',
        'But lately... the schools are getting smaller.',
        'Some say it\'s because of that Finnova company.'
      ]
    },
    // Scam artist (expensive dive offer)
    {
      id: 'dive-scammer',
      x: 6,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Hey! You look like a serious shark trainer!',
        'I can take you to a SECRET hammerhead spot!',
        'Only $50,000 for this exclusive opportunity!',
        '...',
        'No? Well, your loss amigo!',
        'The public spots are fine too, I guess.'
      ]
    },
    // Harbor master with Cabo Town direction
    {
      id: 'harbor-master-cabo',
      x: 8,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Cabo Town is east, past the beach.',
        'Dr. Martillo\'s gym is there.',
        'He\'s a hammerhead expert - very wise!',
        'But first, explore the reef south of here.'
      ]
    }
  ],
  // No swimming encounters in harbor, but fishing is available
  encounterTable: [
    { speciesId: 64, minLevel: 15, maxLevel: 18, weight: 35, method: 'fishing', minRodPower: 1 },   // Sharpnose Shark (Old Rod)
    { speciesId: 63, minLevel: 16, maxLevel: 19, weight: 30, method: 'fishing', minRodPower: 1 },   // Nurse Shark (Old Rod)
    { speciesId: 38, minLevel: 18, maxLevel: 22, weight: 20, method: 'fishing', minRodPower: 2 },   // Blue Shark (Good Rod)
    { speciesId: 35, minLevel: 20, maxLevel: 25, weight: 10, method: 'fishing', minRodPower: 2 },   // Mako Shark (Good Rod)
    { speciesId: 68, minLevel: 22, maxLevel: 28, weight: 10, method: 'fishing', minRodPower: 3 },   // Thresher (Super Rod)
    { speciesId: 10, minLevel: 25, maxLevel: 30, weight: 5, method: 'fishing', minRodPower: 3 }     // Hammerhead (Super Rod)
  ],
  isOutdoor: true
};

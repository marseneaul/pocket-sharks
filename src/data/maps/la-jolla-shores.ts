import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const D = TILE.DOCK;
const T = TILE.TIDE_POOL;

// 20x18 tiles = 160x144 pixels
// La Jolla Shores - Beach town area
// Layout: Buildings at top, beach in middle, water at bottom, pier on right
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],  // North - entrance from Scripps
  [W,F,F,F,W,W,F,F,F,F,F,F,F,F,W,W,F,F,F,W],  // Buildings
  [W,F,F,F,W,W,F,F,F,F,F,F,F,F,W,W,F,F,F,W],
  [W,W,W,W,W,W,F,F,F,F,F,F,F,F,W,W,W,W,W,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,D,D,D],  // Beach starts, pier begins
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,D,D,D],
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,D,D,D],  // West exit (to Tide Pools)
  [F,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,D,D,D],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,D,D,D],
  [W,S,S,S,T,T,S,S,S,S,S,S,S,T,T,S,S,D,D,D],  // Tide pool spots on beach
  [W,S,S,S,T,T,S,S,S,S,S,S,S,T,T,S,S,D,D,D],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,D,D,D],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,D,D,D],  // Shallow water
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,D,D,D],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,D,D,D],  // South water leads to Kelp Forest
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South exit
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const LA_JOLLA_SHORES: MapData = {
  id: 'la-jolla-shores',
  name: 'La Jolla Shores',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Scripps Lab
    {
      x: 9,
      y: 0,
      targetMap: 'scripps-lab',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'scripps-lab',
      targetX: 10,
      targetY: 16
    },
    // West exit to Tide Pools
    {
      x: 0,
      y: 6,
      targetMap: 'la-jolla-tide-pools',
      targetX: 18,
      targetY: 9
    },
    {
      x: 0,
      y: 7,
      targetMap: 'la-jolla-tide-pools',
      targetX: 18,
      targetY: 10
    },
    // South exit to Kelp Forest Route (swimming)
    {
      x: 8,
      y: 17,
      targetMap: 'kelp-forest-route',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'kelp-forest-route',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'kelp-forest-route',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'kelp-forest-route',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Shop keeper
    {
      id: 'la-jolla-shop',
      x: 2,
      y: 2,
      sprite: 0,
      facing: 'down',
      spriteType: 'shopkeeper',
      shopId: 'la-jolla-shop',
      dialogue: [
        'Welcome to La Jolla Surf Shop!',
        'We\'ve got everything you need for shark catching.'
      ]
    },
    // Beach NPC - hints about tide pools
    {
      id: 'beachgoer-1',
      x: 8,
      y: 5,
      sprite: 0,
      facing: 'down',
      spriteType: 'swimmer',
      dialogue: [
        'The tide pools to the west are great for finding baby sharks!',
        'Horn shark eggs wash up there sometimes.'
      ]
    },
    // Pier fisherman - hints about fishing
    {
      id: 'pier-fisherman',
      x: 18,
      y: 7,
      sprite: 0,
      facing: 'left',
      spriteType: 'fisher',
      dialogue: [
        'I\'ve been fishing off this pier for 30 years.',
        'Sometimes you can hook a Blue Shark or Mako!',
        'But you\'d need a fishing rod for that...'
      ]
    },
    // Beach NPC - mentions shark disappearances (Team Finn foreshadowing)
    {
      id: 'worried-local',
      x: 12,
      y: 8,
      sprite: 0,
      facing: 'left',
      spriteType: 'swimmer',
      dialogue: [
        'Have you noticed fewer sharks lately?',
        'The Leopard Sharks used to be everywhere...',
        'I heard some company is doing research nearby.'
      ]
    },
    // Surfer NPC
    {
      id: 'surfer',
      x: 5,
      y: 11,
      sprite: 0,
      facing: 'down',
      spriteType: 'swimmer',
      dialogue: [
        'Dude, the kelp forest south of here is gnarly!',
        'Tons of sharks hang out in the kelp beds.',
        'Just watch out for the deep water - you\'ll need SCUBA for that.'
      ]
    },
    // Wandering kid on beach
    {
      id: 'beach-kid',
      x: 10,
      y: 6,
      sprite: 0,
      facing: 'down',
      spriteType: 'kid',
      wander: {
        radius: 3,
        speed: 1.0,
        pauseMin: 800,
        pauseMax: 2000
      },
      dialogue: [
        'I found a cool shell over there!',
        'Have you seen any baby sharks in the tide pools?'
      ]
    }
  ],
  // Tide pool encounters on the beach - San Diego species
  encounterTable: [
    { speciesId: 47, minLevel: 2, maxLevel: 4, weight: 45 },  // Round Stingray (common)
    { speciesId: 57, minLevel: 2, maxLevel: 4, weight: 30 },  // Butterfly Ray
    { speciesId: 48, minLevel: 3, maxLevel: 5, weight: 25 }   // Smoothhound
  ],
  // Collectible eggs found on the ground
  groundEggs: [
    { id: 'shores-horn-egg-1', x: 8, y: 12, eggId: 1, collected: false }  // Horn Shark Egg near water
  ],
  isOutdoor: true
};

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
      dialogue: [
        'Dude, the kelp forest south of here is gnarly!',
        'Tons of sharks hang out in the kelp beds.',
        'Just watch out for the deep water - you\'ll need SCUBA for that.'
      ]
    }
  ],
  // Tide pool encounters on the beach
  encounterTable: [
    { speciesId: 14, minLevel: 2, maxLevel: 4, weight: 50 },  // Atlantic Stingray (placeholder for Round Stingray)
    { speciesId: 13, minLevel: 3, maxLevel: 5, weight: 30 },  // Nurse Shark (placeholder)
    { speciesId: 10, minLevel: 4, maxLevel: 6, weight: 20 }   // Bonnethead (uncommon)
  ],
  isOutdoor: true
};

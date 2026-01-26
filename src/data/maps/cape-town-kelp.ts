import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const K = TILE.KELP;
const R = TILE.REEF;
const D = TILE.DEEP_REEF;

// 20x18 tiles = 160x144 pixels
// Cape Town Kelp Forest - Deep kelp diving with larger sharks
// Requires SCUBA certification
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North from Harbor
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,K,K,K,A,A,K,K,K,K,K,K,A,A,K,K,K,A,W],
  [W,A,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,A,W],
  [W,A,K,K,R,K,K,K,D,D,D,D,K,K,K,R,K,K,A,W],  // Deep areas
  [W,A,K,K,R,R,K,K,D,D,D,D,K,K,R,R,K,K,A,W],
  [W,A,K,K,K,R,K,K,D,D,D,D,K,K,R,K,K,K,A,W],
  [W,A,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,A,W],
  [W,A,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,A,W],
  [W,A,K,K,K,K,K,D,D,D,D,D,D,K,K,K,K,K,A,W],  // Central deep area
  [W,A,K,K,R,K,K,D,D,D,D,D,D,K,K,R,K,K,A,W],
  [W,A,K,K,R,R,K,D,D,D,D,D,D,K,R,R,K,K,A,W],
  [W,A,K,K,K,R,K,K,K,K,K,K,K,K,R,K,K,K,A,W],
  [W,A,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,A,W],
  [W,A,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const CAPE_TOWN_KELP: MapData = {
  id: 'cape-town-kelp',
  name: 'Cape Town Kelp Forest',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Harbor
    {
      x: 8,
      y: 0,
      targetMap: 'cape-town-harbor',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'cape-town-harbor',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'cape-town-harbor',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'cape-town-harbor',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Kelp forest researcher
    {
      id: 'kelp-researcher',
      x: 5,
      y: 3,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The Great African Sea Forest is magical!',
        'Kelp towers over 10 meters tall...',
        'Shysharks hide in every crevice.',
        'And Sevengill Sharks patrol the depths.',
        'This is one of Earth\'s most unique ecosystems.'
      ]
    },
    // Underwater photographer
    {
      id: 'underwater-photo',
      x: 14,
      y: 6,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'ve been photographing sharks for decades.',
        'The Broadnose Sevengill is my favorite.',
        'Seven gills instead of five - a living fossil!',
        'They\'re curious and often approach divers.',
        'Just don\'t make sudden movements.'
      ]
    },
    // Deep diver
    {
      id: 'deep-diver',
      x: 10,
      y: 10,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'The deeper areas have bigger sharks.',
        'Copper Sharks and Dusky Sharks hunt here.',
        'They follow the sardine runs.',
        'Millions of sardines, sharks feeding everywhere!',
        'It\'s the greatest natural spectacle.'
      ]
    },
    // Sand Tiger fan
    {
      id: 'sand-tiger-fan',
      x: 4,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Sand Tiger Sharks look terrifying...',
        'All those rows of jagged teeth!',
        'But they\'re actually quite docile.',
        'They live in caves in the reef.',
        'Approach slowly and they\'ll let you watch.'
      ]
    }
  ],
  encounterTable: [
    // Kelp forest specialists
    { speciesId: 106, minLevel: 28, maxLevel: 35, weight: 20 },  // Leopard Catshark
    { speciesId: 108, minLevel: 30, maxLevel: 38, weight: 20 },  // Spotted Gully Shark
    // Catsharks
    { speciesId: 103, minLevel: 28, maxLevel: 35, weight: 15 },  // Pyjama Catshark
    { speciesId: 105, minLevel: 30, maxLevel: 36, weight: 10 },  // Dark Shyshark
    // Larger sharks in deep areas
    { speciesId: 109, minLevel: 32, maxLevel: 40, weight: 15 },  // Broadnose Sevengill
    { speciesId: 110, minLevel: 35, maxLevel: 42, weight: 10 },  // Copper Shark
    { speciesId: 111, minLevel: 35, maxLevel: 42, weight: 5 },   // Dusky Shark
    { speciesId: 112, minLevel: 30, maxLevel: 38, weight: 5 }    // Sand Tiger Shark
  ],
  isOutdoor: true
};

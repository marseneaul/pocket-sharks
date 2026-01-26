import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const S = TILE.SAND;
const A = TILE.WATER;
const R = TILE.REEF;
const D = TILE.DEEP_REEF;

// 20x18 tiles = 160x144 pixels
// Seal Island - Famous Great White site, but they've been fished out
// Special encounter: Rare chance to find the last Great White
// Story element: Ecosystem collapse without apex predators
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North from Cape Town Coast
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,D,D,D,A,A,A,A,A,A,A,A,D,D,D,A,A,W],  // Deep water around island
  [W,A,A,D,D,D,D,A,A,A,A,A,A,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,D,A,A,S,S,A,A,D,D,D,D,A,A,W],
  [W,A,A,A,D,D,A,A,S,S,S,S,A,A,D,D,A,A,A,W],
  [W,A,A,A,A,A,A,S,S,R,R,S,S,A,A,A,A,A,A,W],  // Seal Island - rocky center
  [W,A,A,A,A,A,S,S,R,R,R,R,S,S,A,A,A,A,A,W],
  [W,A,A,A,A,A,S,S,R,R,R,R,S,S,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,S,S,R,R,S,S,A,A,A,A,A,A,W],
  [W,A,A,A,D,D,A,A,S,S,S,S,A,A,D,D,A,A,A,W],
  [W,A,A,D,D,D,D,A,A,S,S,A,A,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,D,A,A,A,A,A,A,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,A,A,A,A,A,A,A,A,D,D,D,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const SEAL_ISLAND: MapData = {
  id: 'seal-island',
  name: 'Seal Island',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Cape Town Coast
    {
      x: 8,
      y: 0,
      targetMap: 'cape-town-coast',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'cape-town-coast',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'cape-town-coast',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'cape-town-coast',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Seal researcher on island
    {
      id: 'seal-researcher',
      x: 9,
      y: 8,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'This island has 60,000 seals now.',
        'Without Great Whites to control them...',
        'The population has exploded.',
        'Disease is spreading through the colony.',
        'Nature needs its apex predators.'
      ]
    },
    // Great White seeker
    {
      id: 'white-seeker',
      x: 5,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I\'ve been diving here for months...',
        'Searching for the last Great White.',
        'Legend says one still circles this island.',
        'A massive female, avoiding boats and people.',
        'If you dive deep enough, you might find her.',
        'But she\'s incredibly rare...'
      ]
    },
    // Documentary filmmaker
    {
      id: 'filmmaker',
      x: 14,
      y: 5,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I used to film Great White breaching here.',
        'Sharks launching from below, catching seals...',
        'The most spectacular hunting behavior on Earth.',
        'Now? Just seals. Thousands and thousands of seals.',
        'We have to bring the sharks back somehow.'
      ]
    },
    // Old fisherman with guilt
    {
      id: 'guilty-fisherman',
      x: 10,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I used to fish these waters...',
        'We caught Great Whites as bycatch.',
        'Sold their fins for good money.',
        'I didn\'t think they could run out.',
        'Now look at this place...',
        'What have we done?'
      ]
    },
    // Conservation hopeful
    {
      id: 'conservation-hope',
      x: 3,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'There\'s still hope!',
        'If we protect sharks, they can recover.',
        'One Great White could start a comeback.',
        'We just need to stop the finning...',
        'And give them time to return.'
      ]
    }
  ],
  encounterTable: [
    // Regular deep water sharks
    { speciesId: 110, minLevel: 35, maxLevel: 42, weight: 25 },  // Copper Shark
    { speciesId: 111, minLevel: 35, maxLevel: 42, weight: 25 },  // Dusky Shark
    { speciesId: 109, minLevel: 35, maxLevel: 42, weight: 20 },  // Broadnose Sevengill
    { speciesId: 112, minLevel: 35, maxLevel: 42, weight: 15 },  // Sand Tiger Shark
    // Very rare - the legendary last Great White
    { speciesId: 113, minLevel: 50, maxLevel: 55, weight: 5 }    // Great White Shark (RARE!)
  ],
  isOutdoor: true
};

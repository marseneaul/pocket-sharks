import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;  // Rock walls
const A = TILE.WATER;  // Shallow water
const K = TILE.KELP;   // Kelp (encounters)
const S = TILE.SAND;   // Sandy beach
const D = TILE.DEEP;   // Deep water (blocked for now)

// 20x18 tiles - Route 1: The Shallows
// Mix of beach and shallow water with kelp patches
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,S,S,W,W,W,W,W,W,W,W,W],  // Top - exit to Research Station
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,A,A,A,K,A,A,A,A,A,A,K,A,A,S,S,S,W],
  [W,S,A,A,A,K,K,A,A,A,A,A,K,K,A,A,A,S,S,W],
  [W,S,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,S,W],
  [W,S,A,K,A,A,A,A,A,A,A,A,A,A,A,A,K,A,S,W],
  [W,S,A,K,A,A,A,A,A,A,A,A,A,A,A,A,K,A,S,W],
  [W,S,A,A,A,A,A,D,D,D,D,D,D,A,A,A,A,A,S,W],
  [W,S,A,A,A,A,D,D,D,D,D,D,D,D,A,A,A,A,S,W],
  [W,S,A,A,A,A,D,D,D,D,D,D,D,D,A,A,A,A,S,W],
  [W,S,A,A,A,A,A,D,D,D,D,D,D,A,A,A,A,A,S,W],
  [W,S,A,K,A,A,A,A,A,A,A,A,A,A,A,A,K,A,S,W],
  [W,S,A,K,K,A,A,A,A,A,A,A,A,A,A,K,K,A,S,W],
  [W,S,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,S,W],
  [W,S,A,A,K,A,A,A,A,A,A,A,A,A,K,A,A,A,S,W],
  [W,S,S,A,A,A,K,A,A,A,A,A,K,A,A,A,A,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,W,W,W,W,W,S,S,W,W,W,W,W,W,W,W,W],  // Bottom - exit to Route 2
];

export const ROUTE_1: MapData = {
  id: 'route-1',
  name: 'Route 1 - The Shallows',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North exit to Research Station
    {
      x: 9,
      y: 0,
      targetMap: 'research-station',
      targetX: 9,
      targetY: 15
    },
    {
      x: 10,
      y: 0,
      targetMap: 'research-station',
      targetX: 10,
      targetY: 15
    },
    // South exit to Route 2 (exit bottom → appear at top)
    {
      x: 9,
      y: 17,
      targetMap: 'route-2',
      targetX: 9,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'route-2',
      targetX: 10,
      targetY: 1
    }
  ],
  npcs: [],
  encounterTable: [
    { speciesId: 4, minLevel: 2, maxLevel: 4, weight: 40 },  // Whitetip Reef Shark (common)
    { speciesId: 7, minLevel: 2, maxLevel: 4, weight: 40 },  // Grey Reef Shark (common)
    { speciesId: 10, minLevel: 3, maxLevel: 5, weight: 20 }  // Bonnethead (uncommon)
  ],
  isOutdoor: true
};

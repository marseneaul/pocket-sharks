import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const H = TILE.HEAL;
const D = TILE.DOCK;
const A = TILE.WATER;  // Water at edge for transition

// 20x18 tiles = 160x144 pixels (fills screen)
// Research Station - indoor starting area
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,W,F,F,F,F,F,F,W,F,F,F,F,F,W],
  [W,F,F,F,F,F,W,F,F,F,F,F,F,W,F,H,H,F,F,W],
  [W,F,F,F,F,F,W,F,F,F,F,F,F,W,F,H,H,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,F,W,W,W,W,W,F,W,W,W,W,W,F,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,F,F,F,F,F,F,F,F,W,W,W,W,W,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
];

export const RESEARCH_STATION: MapData = {
  id: 'research-station',
  name: 'Reef Research Station',
  width: 20,
  height: 18,
  tiles,
  warps: [
    {
      x: 9,
      y: 17,
      targetMap: 'route-1',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'route-1',
      targetX: 10,
      targetY: 1
    }
  ],
  npcs: [
    {
      id: 'professor',
      x: 9,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: ['Welcome to the Reef Research Station!', 'Take good care of your shark partner.']
    },
    // PC Terminal
    {
      id: 'station-pc',
      x: 14,
      y: 2,
      sprite: 1,
      facing: 'down',
      isPcTerminal: true,
      dialogue: [
        'Shark Storage System',
        'Press A to access.'
      ]
    }
  ],
  encounterTable: [], // No wild encounters indoors
  isOutdoor: false
};

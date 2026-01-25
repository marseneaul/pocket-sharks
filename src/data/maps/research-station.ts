import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const H = TILE.HEAL;
const D = TILE.DOCK;

// 20x18 tiles = 160x144 pixels (fills screen)
// Scripps Marine Lab - indoor starting area in La Jolla, San Diego
// Layout: Lab rooms up top, main hall in middle, dock area at bottom
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,W,F,F,F,F,F,F,W,F,F,F,F,F,W],  // Lab rooms
  [W,F,F,F,F,F,W,F,F,F,F,F,F,W,F,H,H,F,F,W],  // Healing pool (right)
  [W,F,F,F,F,F,W,F,F,F,F,F,F,W,F,H,H,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,F,W,W,W,W,W,F,W,W,W,W,W,F,W,W,W,W],  // Walls with doorways
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // Main hall
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,F,F,F,F,F,F,F,F,W,W,W,W,W,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],  // Indoor dock
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],  // Exit south
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,F,F,W,W,W,W,W,W,W,W,W],
];

export const SCRIPPS_LAB: MapData = {
  id: 'scripps-lab',
  name: 'Scripps Marine Lab',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // Exit south to La Jolla Shores
    {
      x: 9,
      y: 17,
      targetMap: 'la-jolla-shores',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'la-jolla-shores',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Professor Marina - gives starter and explains diving certs
    {
      id: 'professor-marina',
      x: 9,
      y: 3,
      sprite: 0,
      facing: 'down',
      spriteType: 'scientist',
      dialogue: [
        'Welcome to Scripps Marine Lab!',
        'I\'m Professor Marina.',
        'We study sharks and rays here in La Jolla.',
        'As a marine biologist in training, you\'ll need diving certifications to explore deeper waters.',
        'For now, you can wade and snorkel in the shallows.',
        'Take good care of your shark partner!'
      ]
    },
    // PC Terminal - Shark Storage System
    {
      id: 'scripps-pc',
      x: 15,
      y: 2,
      sprite: 1,
      facing: 'down',
      isPcTerminal: true,
      dialogue: [
        'Shark Storage System',
        'Linked to Scripps research database.'
      ]
    },
    // Research Assistant - hints about Team Finn
    {
      id: 'research-assistant',
      x: 3,
      y: 3,
      sprite: 0,
      facing: 'down',
      spriteType: 'scientist',
      dialogue: [
        'Have you heard about Finnova Biotech?',
        'They claim to be developing sustainable shark products...',
        'But something seems off about their operations.'
      ]
    },
    // Lab tech - certification info
    {
      id: 'lab-tech',
      x: 3,
      y: 8,
      sprite: 0,
      facing: 'right',
      spriteType: 'diver',
      dialogue: [
        'Diving certifications unlock new areas!',
        'Wading: Tide pools and beaches',
        'Open Water: Reefs to 60ft',
        'Advanced: Deep reefs and wrecks',
        'You\'ll earn them as you progress!'
      ]
    }
  ],
  encounterTable: [], // No wild encounters indoors
  isOutdoor: false
};

// Export with old name for backwards compatibility during transition
export const RESEARCH_STATION = SCRIPPS_LAB;

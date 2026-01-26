import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const R = TILE.REEF;
const K = TILE.KELP;

// 20x18 tiles = 160x144 pixels
// Cabo Reef - SCUBA diving area with openwater encounters
// Layout: Reef system south of harbor
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Harbor
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,A,A,A,A,A,A,A,A,K,K,A,A,W],
  [W,A,K,K,K,K,A,A,R,R,R,R,A,A,K,K,K,K,A,W],
  [W,A,K,K,K,A,A,R,R,R,R,R,R,A,A,K,K,K,A,W],
  [W,A,A,K,A,A,R,R,R,R,R,R,R,R,A,A,K,A,A,W],
  [W,A,A,A,A,A,R,R,R,R,R,R,R,R,A,A,A,A,A,W],
  [W,A,A,A,A,R,R,R,R,R,R,R,R,R,R,A,A,A,A,W],
  [W,A,K,A,A,R,R,R,R,R,R,R,R,R,R,A,A,K,A,W],
  [W,A,K,K,A,R,R,R,R,R,R,R,R,R,R,A,K,K,A,W],
  [W,A,A,K,A,A,R,R,R,R,R,R,R,R,A,A,K,A,A,W],
  [W,A,A,A,A,A,A,R,R,R,R,R,R,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,A,R,R,R,R,A,A,A,K,K,A,A,W],
  [W,A,K,K,K,K,A,A,A,A,A,A,A,A,K,K,K,K,A,W],
  [W,A,K,K,K,A,A,A,A,A,A,A,A,A,A,K,K,K,A,W],
  [W,A,A,K,A,A,A,A,A,A,A,A,A,A,A,A,K,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const CABO_REEF: MapData = {
  id: 'cabo-reef',
  name: 'Cabo Reef',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Cabo Harbor
    {
      x: 8,
      y: 0,
      targetMap: 'cabo-harbor',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'cabo-harbor',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'cabo-harbor',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'cabo-harbor',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Diver trainer
    {
      id: 'trainer-diver-1',
      x: 5,
      y: 4,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The reef here is pristine!',
        'But I\'ve seen Finnova divers tagging sharks...',
        'Let me battle while we wait for them to leave!'
      ],
      trainer: {
        name: 'Diver Carlos',
        team: [
          { speciesId: 74, level: 16 },  // Silky Shark
          { speciesId: 71, level: 16 },  // Cownose Ray
          { speciesId: 4, level: 17 }    // Whitetip Reef Shark
        ],
        defeatedDialogue: [
          'Great diving skills!',
          'The hammerheads in the Sea of Cortez are even better.'
        ],
        prizeMoney: 340
      }
    },
    // Second diver
    {
      id: 'trainer-diver-2',
      x: 14,
      y: 9,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I love exploring the reef caves!',
        'The bull sharks hide in there.'
      ],
      trainer: {
        name: 'Diver Maria',
        team: [
          { speciesId: 21, level: 17 },  // Bull Shark
          { speciesId: 72, level: 16 },  // Pacific Electric Ray
          { speciesId: 74, level: 17 }   // Silky Shark
        ],
        defeatedDialogue: [
          'Your skills are impressive!',
          'Dr. Martillo trains in these waters too.'
        ],
        prizeMoney: 360
      }
    },
    // Researcher NPC with Team Finn info
    {
      id: 'reef-researcher',
      x: 10,
      y: 6,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I\'m documenting shark populations here.',
        'The numbers are declining rapidly.',
        'Finnova claims they\'re "sustainably farming" shark fins...',
        'But my data shows wild shark numbers dropping.',
        'Something doesn\'t add up.'
      ]
    },
    // Witness to finning
    {
      id: 'reef-witness',
      x: 4,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I saw it with my own eyes...',
        'A Finnova boat with dozens of finned sharks.',
        'Just thrown back into the water without fins.',
        'It was horrible. Those poor sharks...',
        'Someone needs to stop them!'
      ]
    }
  ],
  // Cabo reef encounters - deeper water species
  encounterTable: [
    { speciesId: 74, minLevel: 14, maxLevel: 17, weight: 25 },  // Silky Shark
    { speciesId: 4, minLevel: 14, maxLevel: 17, weight: 20 },   // Whitetip Reef Shark
    { speciesId: 1, minLevel: 14, maxLevel: 17, weight: 20 },   // Blacktip Reef Shark
    { speciesId: 71, minLevel: 15, maxLevel: 18, weight: 15 },  // Cownose Ray
    { speciesId: 21, minLevel: 16, maxLevel: 19, weight: 10, requiredCert: 'openwater' },  // Bull Shark
    { speciesId: 10, minLevel: 15, maxLevel: 18, weight: 10 }   // Bonnethead (pre-hammerhead)
  ],
  isOutdoor: true,
  palette: 'tropical'  // Warm Sea of Cortez waters
};

import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;

// 20x18 tiles = 160x144 pixels
// Europe Ferry Terminal - Indoor arrival point for Europe region
// Layout: Ferry terminal with exit to European coast
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],  // Ticket counters
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,F,F,F,F,F,F,F,F,F,F,W,W,F,F,W],  // Benches/seating
  [W,F,F,W,W,F,F,F,F,F,F,F,F,F,F,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // South exit to coast
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const EUROPE_FERRY_TERMINAL: MapData = {
  id: 'europe-ferry-terminal',
  name: 'European Ferry Terminal',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to European Coast
    {
      x: 8,
      y: 17,
      targetMap: 'european-coast',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'european-coast',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'european-coast',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'european-coast',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Ferry terminal greeter
    {
      id: 'ferry-greeter',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Europe!',
        'The waters here have been heavily fished.',
        'Many shark species are now rare or endangered.',
        'Please dive responsibly and respect local regulations.'
      ]
    },
    // European conservationist
    {
      id: 'euro-conserve',
      x: 5,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Europe has some of the worst overfishing.',
        'Spain alone catches thousands of tons of shark.',
        'Dogfish and catsharks are still somewhat common.',
        'But larger species are becoming very rare.'
      ]
    },
    // Local diver
    {
      id: 'local-diver',
      x: 14,
      y: 11,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The Small-spotted Catshark is our most common species.',
        'You can find them hiding in rocky reefs.',
        'For bigger sharks, try the deeper waters.',
        'But don\'t expect to see many - they\'ve been fished out.'
      ]
    },
    // Information desk
    {
      id: 'info-desk',
      x: 4,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'European Ferry Terminal Information.',
        'The coast is directly south.',
        'North Sea waters are cold but rich in life.',
        'Basking Sharks appear seasonally - if you\'re lucky!'
      ]
    },
    // Shark researcher
    {
      id: 'shark-researcher',
      x: 15,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I\'m documenting the decline of European sharks.',
        'Angel Sharks were once common here - now critically endangered.',
        'The Spurdog population has collapsed.',
        'We need stronger fishing regulations to save them.'
      ]
    }
  ],
  encounterTable: [], // No encounters indoors
  isOutdoor: false
};

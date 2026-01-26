import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;     // Land areas
const A = TILE.WATER;     // Shallow water
const K = TILE.KELP;      // Kelp with encounters
const S = TILE.SAND;      // Beach sand
const R = TILE.REEF;      // Rocky reef areas

// 20x18 tiles = 160x144 pixels
// European Coast - Cold Atlantic coastal waters
// Common encounters: Small-spotted Catshark, Shortnose Spurdog, Blonde Skate
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // North entrance from ferry
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,S,S,S,S,S,S,S,S,F,F,F,F,F,W],
  [W,F,F,W,W,W,S,S,S,S,S,S,S,S,S,S,F,F,F,W],  // Beach area + Gym building
  [W,F,F,W,F,F,F,A,A,A,A,A,A,A,S,S,S,F,F,W],  // Gym entrance at x:4-5, y:4
  [W,F,S,W,W,W,A,A,A,A,A,A,A,A,A,A,S,S,F,W],
  [W,F,S,A,A,A,A,K,K,A,A,K,K,A,A,A,A,S,F,W],  // Shallow water with kelp
  [W,F,A,A,A,K,K,K,K,A,A,K,K,K,K,A,A,A,F,W],
  [W,A,A,A,K,K,K,A,A,A,A,A,A,K,K,K,A,A,A,W],
  [W,A,A,A,K,K,A,A,R,R,R,R,A,A,K,K,A,A,A,W],  // Central water with rocky reef
  [W,A,A,A,A,A,A,R,R,R,R,R,R,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,R,R,R,R,R,R,A,A,K,K,A,A,W],
  [W,A,A,K,K,K,A,A,R,R,R,R,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,K,A,A,A,A,A,A,A,A,K,K,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,A,A,A,A,A,A,A,A,A,A,W,W,W,W,W],
  [W,W,W,W,W,W,A,A,A,A,A,A,A,A,W,W,W,W,W,W],  // South exit to North Sea
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const EUROPEAN_COAST: MapData = {
  id: 'european-coast',
  name: 'European Coast',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Ferry Terminal
    {
      x: 8,
      y: 0,
      targetMap: 'europe-ferry-terminal',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'europe-ferry-terminal',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'europe-ferry-terminal',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'europe-ferry-terminal',
      targetX: 11,
      targetY: 16
    },
    // Survivor Gym entrance
    {
      x: 4,
      y: 4,
      targetMap: 'survivor-gym',
      targetX: 9,
      targetY: 16
    },
    {
      x: 5,
      y: 4,
      targetMap: 'survivor-gym',
      targetX: 10,
      targetY: 16
    },
    // South exit to North Sea
    {
      x: 8,
      y: 17,
      targetMap: 'north-sea',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'north-sea',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'north-sea',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'north-sea',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Gym greeter
    {
      id: 'gym-greeter-survivor',
      x: 4,
      y: 5,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'That building is the Survivor Gym.',
        'Gym Leader Henrik specializes in poison-type dogfish.',
        'European sharks are survivors.',
        'They endure even as their waters are emptied.'
      ]
    },
    // Beach fisherman
    {
      id: 'beach-fisherman',
      x: 8,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The dogfish have been scarce lately.',
        'Overfishing has really hit them hard.',
        'Twenty years ago, you couldn\'t avoid them!',
        'Now I\'m lucky to see one a week.'
      ]
    },
    // Marine biologist
    {
      id: 'marine-bio',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'m studying the catshark population here.',
        'Small-spotted Catsharks are still fairly common.',
        'They\'re resilient - lay eggs in rocky crevices.',
        'But even they are declining in some areas.'
      ]
    },
    // Local swimmer
    {
      id: 'local-swimmer',
      x: 5,
      y: 11,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The water is cold, but I love it!',
        'Sometimes I see little sharks near the rocks.',
        'They\'re harmless - more scared of us than we are of them.',
        'The real danger is the fishing nets everywhere.'
      ]
    },
    // Conservationist
    {
      id: 'coast-conserve',
      x: 15,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Europe has some of the worst shark regulations.',
        'Many species aren\'t protected at all.',
        'The Spurdog was fished to near-extinction.',
        'We\'re fighting for better protections.'
      ]
    },
    // Diver heading south
    {
      id: 'diver-south',
      x: 10,
      y: 15,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The North Sea has deeper waters and more species.',
        'You might find Nursehounds and Thornback Skates there.',
        'If you\'re really lucky, maybe a Basking Shark!',
        'They migrate through these waters in summer.'
      ]
    }
  ],
  encounterTable: [
    // Small-spotted Catshark - most common
    { speciesId: 91, minLevel: 20, maxLevel: 26, weight: 40 },  // Small-spotted Catshark
    // Shortnose Spurdog - uncommon starter
    { speciesId: 89, minLevel: 18, maxLevel: 24, weight: 25 },  // Shortnose Spurdog
    // Blonde Skate - sandy areas
    { speciesId: 93, minLevel: 22, maxLevel: 28, weight: 20 },  // Blonde Skate
    // Spiny Dogfish - less common here
    { speciesId: 83, minLevel: 22, maxLevel: 28, weight: 15 }   // Spiny Dogfish
  ],
  isOutdoor: true,
  palette: 'arctic'  // Cold European waters
};

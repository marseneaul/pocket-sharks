import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const R = TILE.REEF;
const K = TILE.KELP;

// 20x18 tiles = 160x144 pixels
// Cape Town Coast - Coastal shallows with catshark encounters
// Home to the Safari Gym
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,A,A,A,A,A,A,A,A,S,S,S,S,S,W],
  [W,S,S,S,A,A,A,K,K,A,A,K,K,A,A,A,S,S,S,W],
  [F,S,S,A,A,A,K,K,K,A,A,K,K,K,A,A,A,S,S,W],  // West to Harbor
  [F,S,S,A,A,K,K,R,K,A,A,K,R,K,K,A,A,S,S,W],
  [W,S,S,A,A,K,K,K,K,A,A,K,K,K,K,A,A,S,S,W],
  [W,S,S,A,A,A,K,K,A,A,A,A,K,K,A,A,A,S,S,W],
  [W,S,S,S,A,A,A,A,A,A,A,A,A,A,A,A,S,S,S,W],
  [W,S,S,S,S,A,A,A,A,A,A,A,A,A,A,S,S,S,S,W],
  [W,W,W,F,F,F,W,W,W,W,W,W,W,W,S,S,S,S,S,W],  // Gym entrance
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to Seal Island
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const CAPE_TOWN_COAST: MapData = {
  id: 'cape-town-coast',
  name: 'Cape Town Coast',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West exit to Harbor
    {
      x: 0,
      y: 4,
      targetMap: 'cape-town-harbor',
      targetX: 18,
      targetY: 9
    },
    {
      x: 0,
      y: 5,
      targetMap: 'cape-town-harbor',
      targetX: 18,
      targetY: 10
    },
    // Gym entrance
    {
      x: 3,
      y: 10,
      targetMap: 'safari-gym',
      targetX: 10,
      targetY: 16
    },
    {
      x: 4,
      y: 10,
      targetMap: 'safari-gym',
      targetX: 10,
      targetY: 16
    },
    {
      x: 5,
      y: 10,
      targetMap: 'safari-gym',
      targetX: 10,
      targetY: 16
    },
    // South exit to Seal Island
    {
      x: 8,
      y: 17,
      targetMap: 'seal-island',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'seal-island',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'seal-island',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'seal-island',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Gym greeter
    {
      id: 'gym-greeter-safari',
      x: 4,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'This is Themba\'s Safari Gym!',
        'He\'s a master of fairy-type sharks.',
        'Those cute catsharks pack a punch!',
        'Beat him to earn the Safari Badge!'
      ]
    },
    // Catshark researcher
    {
      id: 'catshark-researcher',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Cape Town has more catshark species...',
        'Than anywhere else on Earth!',
        'Pyjama, Puffader, Leopard, Tiger...',
        'All unique to South African waters.',
        'They\'re small but incredibly diverse!'
      ]
    },
    // Kelp forest diver
    {
      id: 'kelp-diver',
      x: 5,
      y: 6,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The kelp forests here are world-famous!',
        'Shysharks hide in the kelp fronds.',
        'When scared, they curl into a ball!',
        'It\'s adorable - but they\'re still sharks!'
      ]
    },
    // Seal Island warning
    {
      id: 'seal-warning',
      x: 10,
      y: 15,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Seal Island is south of here.',
        'It used to be THE spot to see Great Whites.',
        'Now it\'s just... seals. So many seals.',
        'Some trainers swear they\'ve seen a shadow...',
        'A massive shark, circling the island.',
        'But nobody has confirmed it.'
      ]
    }
  ],
  encounterTable: [
    // Common catsharks in shallows
    { speciesId: 103, minLevel: 25, maxLevel: 32, weight: 25 },  // Pyjama Catshark
    { speciesId: 104, minLevel: 25, maxLevel: 32, weight: 25 },  // Puffader Shyshark
    { speciesId: 107, minLevel: 25, maxLevel: 32, weight: 20 },  // Tiger Catshark
    // Less common
    { speciesId: 105, minLevel: 28, maxLevel: 35, weight: 15 },  // Dark Shyshark
    { speciesId: 106, minLevel: 28, maxLevel: 35, weight: 15 }   // Leopard Catshark
  ],
  isOutdoor: true,
  palette: 'deep'  // Cold Atlantic current
};

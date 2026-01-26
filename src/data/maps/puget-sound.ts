import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const G = TILE.FLOOR;     // Ground/land areas
const A = TILE.WATER;     // Shallow water
const K = TILE.KELP;      // Kelp with encounters
const S = TILE.SAND;      // Beach sand

// 20x18 tiles = 160x144 pixels
// Puget Sound - Cold coastal waters, first area of Pacific Northwest
// Common encounters: Spiny Dogfish, Big Skate
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,G,G,G,G,W,W,W,W,W,W,W,W],  // North entrance from airport
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,G,G,G,S,S,S,S,S,S,S,S,G,G,G,G,G,W],
  [W,G,G,G,S,S,S,S,S,S,S,S,S,S,S,S,G,G,G,W],  // Beach area
  [W,G,G,S,S,S,A,A,A,A,A,A,A,A,S,S,S,G,G,W],
  [W,G,S,S,A,A,A,A,A,A,A,A,A,A,A,A,S,S,G,W],
  [W,G,S,A,A,A,A,K,K,A,A,K,K,A,A,A,A,S,G,W],  // Shallow water with kelp
  [W,G,A,A,A,K,K,K,K,A,A,K,K,K,K,A,A,A,G,W],
  [W,A,A,A,K,K,K,A,A,A,A,A,A,K,K,K,A,A,A,W],
  [W,A,A,A,K,K,A,A,A,A,A,A,A,A,K,K,A,A,A,W],  // Central water area
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,A,A,A,A,A,A,A,A,K,K,A,A,W],
  [W,A,A,K,K,K,A,A,A,A,A,A,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,K,A,A,A,A,A,A,A,A,K,K,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,A,A,A,A,A,A,A,A,A,A,W,W,W,W,W],
  [W,W,W,W,W,W,A,A,A,A,A,A,A,A,W,W,W,W,W,W],  // South exit to kelp forest
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const PUGET_SOUND: MapData = {
  id: 'puget-sound',
  name: 'Puget Sound',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Seattle Airport
    {
      x: 8,
      y: 0,
      targetMap: 'seattle-airport',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'seattle-airport',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'seattle-airport',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'seattle-airport',
      targetX: 11,
      targetY: 16
    },
    // South exit to Pacific Kelp Forest
    {
      x: 8,
      y: 17,
      targetMap: 'pacific-kelp-forest',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'pacific-kelp-forest',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'pacific-kelp-forest',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'pacific-kelp-forest',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Local fisherman on beach
    {
      id: 'beach-fisherman',
      x: 6,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The Spiny Dogfish are running thick today!',
        'Schools of hundreds pass through here.',
        'Watch out for their venomous spines though.',
        'They\'re not aggressive, just defensive.'
      ]
    },
    // Marine researcher
    {
      id: 'marine-researcher',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'m studying the Big Skates here.',
        'They\'re the largest skates in North America!',
        'Can grow up to 8 feet across.',
        'You can find them buried in the sandy bottom.'
      ]
    },
    // Cold water swimmer
    {
      id: 'cold-swimmer',
      x: 5,
      y: 11,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Brrr! This water is COLD!',
        'Around 50 degrees Fahrenheit year-round.',
        'The sharks here don\'t mind though.',
        'Salmon Sharks can even raise their body temperature!'
      ]
    },
    // Kayaker
    {
      id: 'kayaker',
      x: 15,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I paddle out here looking for wildlife.',
        'Saw a massive Pacific Sleeper Shark once!',
        'Well, I saw its shadow anyway...',
        'They mostly stay in the deep trenches.'
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
        'The Pacific Kelp Forest is amazing!',
        'It\'s south of here, past the sound.',
        'That\'s where you\'ll find the big predators.',
        'Porbeagles, Salmon Sharks... incredible stuff!'
      ]
    }
  ],
  encounterTable: [
    // Common: Spiny Dogfish (the "Zubat" of the region)
    { speciesId: 88, minLevel: 15, maxLevel: 22, weight: 50 },  // Spiny Dogfish
    { speciesId: 88, minLevel: 18, maxLevel: 25, weight: 20 },  // Higher level Dogfish
    // Big Skate - uncommon
    { speciesId: 91, minLevel: 18, maxLevel: 24, weight: 20 },  // Big Skate
    // Rare: Winter Skate
    { speciesId: 92, minLevel: 20, maxLevel: 26, weight: 10 }   // Winter Skate
  ],
  isOutdoor: true
};

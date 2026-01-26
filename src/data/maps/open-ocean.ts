import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const D = TILE.DEEP_REEF;  // Deep water with encounters

// 20x18 tiles = 160x144 pixels
// Open Ocean - Vast pelagic waters around Hawaii
// Home to large pelagic sharks and the Ocean Gym
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North to Maui Airport
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,D,D,D,D,A,A,A,A,A,A,D,D,D,D,A,A,W],  // Deep water zones
  [W,A,A,D,D,D,D,D,A,A,A,A,D,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,D,D,A,A,A,A,D,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,D,A,A,A,A,A,A,D,D,D,D,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],  // Gym platform
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,D,D,D,D,A,A,A,A,A,A,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,D,D,A,A,A,A,D,D,D,D,D,A,A,W],  // More deep water
  [W,A,A,D,D,D,D,D,A,A,A,A,D,D,D,D,D,A,A,W],
  [W,A,A,D,D,D,D,A,A,A,A,A,A,D,D,D,D,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const OPEN_OCEAN: MapData = {
  id: 'open-ocean',
  name: 'Open Ocean',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Maui Airport
    {
      x: 8,
      y: 0,
      targetMap: 'maui-airport',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'maui-airport',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'maui-airport',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'maui-airport',
      targetX: 11,
      targetY: 16
    },
    // Gym entrance (center of map)
    {
      x: 9,
      y: 8,
      targetMap: 'ocean-gym',
      targetX: 10,
      targetY: 16
    },
    {
      x: 10,
      y: 8,
      targetMap: 'ocean-gym',
      targetX: 10,
      targetY: 16
    }
  ],
  npcs: [
    // Gym marker
    {
      id: 'gym-buoy',
      x: 10,
      y: 7,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'OCEAN GYM',
        'Gym Leader: Kai',
        'Flying-Type Specialist',
        'Enter from below.'
      ]
    },
    // Pelagic researcher
    {
      id: 'pelagic-researcher',
      x: 5,
      y: 4,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The open ocean is like an underwater desert.',
        'Vast and seemingly empty...',
        'But the predators here are incredible.',
        'Silvertip Sharks, Galapagos Sharks...',
        'And if you\'re lucky, a Tiger Shark.'
      ]
    },
    // Whale shark spotter
    {
      id: 'whale-spotter',
      x: 14,
      y: 5,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'m tracking Whale Shark migrations!',
        'They pass through here seasonally.',
        'The largest fish in the world!',
        'Completely harmless - they eat plankton.',
        'Seeing one is a once-in-a-lifetime experience.'
      ]
    },
    // Deep diver
    {
      id: 'deep-diver-ocean',
      x: 5,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The deep water zones have bigger sharks.',
        'Galapagos and Silvertip Sharks patrol there.',
        'They\'re curious but usually peaceful.',
        'Just don\'t act like prey!'
      ]
    },
    // Cookiecutter shark researcher
    {
      id: 'cookie-researcher',
      x: 14,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'At night, Cookiecutter Sharks rise from the deep.',
        'They take circular bites out of large prey.',
        'Even whales have cookiecutter scars!',
        'Tiny sharks, but fascinating predators.',
        'You might find one if you dive at night.'
      ]
    }
  ],
  encounterTable: [
    // Common pelagic sharks
    { speciesId: 7, minLevel: 26, maxLevel: 32, weight: 20 },   // Grey Reef Shark
    { speciesId: 8, minLevel: 28, maxLevel: 35, weight: 15 },   // Galapagos Shark
    { speciesId: 9, minLevel: 30, maxLevel: 38, weight: 10 },   // Silvertip Shark
    // Reef shark stragglers
    { speciesId: 4, minLevel: 25, maxLevel: 30, weight: 15 },   // Whitetip Reef Shark
    { speciesId: 5, minLevel: 28, maxLevel: 35, weight: 10 },   // Oceanic Whitetip
    // Rays
    { speciesId: 27, minLevel: 30, maxLevel: 38, weight: 10 },  // Manta Ray
    // Rare encounters
    { speciesId: 42, minLevel: 35, maxLevel: 45, weight: 5 },   // Whale Shark
    { speciesId: 77, minLevel: 35, maxLevel: 42, weight: 10 },  // Tiger Shark
    { speciesId: 111, minLevel: 30, maxLevel: 38, weight: 5 }   // Cookiecutter Shark
  ],
  isOutdoor: true
};

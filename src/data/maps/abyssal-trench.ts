import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const D = TILE.DEEP_REEF;

// 20x18 tiles = 160x144 pixels
// Abyssal Trench - The deepest depths, home to ancient sharks
// Final area before endgame
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const ABYSSAL_TRENCH: MapData = {
  id: 'abyssal-trench',
  name: 'Abyssal Trench',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Roatan
    {
      x: 8,
      y: 0,
      targetMap: 'roatan-harbor',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'roatan-harbor',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'roatan-harbor',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'roatan-harbor',
      targetX: 11,
      targetY: 16
    },
    // South exit to Research Base / Deepsea Gym
    {
      x: 8,
      y: 17,
      targetMap: 'deepsea-gym',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'deepsea-gym',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'deepsea-gym',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'deepsea-gym',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Deep sea diver 1
    {
      id: 'deep-diver-1',
      x: 5,
      y: 5,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The pressure down here is immense...',
        'Only special submarines can survive.',
        'The sharks here have never seen light.',
        'Bioluminescence is their only guide.'
      ]
    },
    // Deep sea diver 2
    {
      id: 'deep-diver-2',
      x: 14,
      y: 6,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I saw a Goblin Shark here!',
        'Its jaw extended like a snake striking!',
        'Terrifying... and beautiful.',
        'The deep holds ancient wonders.'
      ]
    },
    // Submarine pilot
    {
      id: 'sub-pilot',
      x: 10,
      y: 9,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'The research base is further down.',
        'Dr. Vance studies the deepest sharks.',
        'Frilled Sharks, Sixgills, Sleepers...',
        'And rumors of something bigger...',
        'Megalodon DNA was found here.'
      ]
    },
    // Lanternshark researcher
    {
      id: 'lantern-researcher',
      x: 5,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Lanternsharks glow in the dark!',
        'Bioluminescent photophores line their bellies.',
        'The Dwarf Lanternshark fits in your hand.',
        'The Giant Lanternshark... not so much.'
      ]
    },
    // Finnova warning
    {
      id: 'finn-warning-deep',
      x: 14,
      y: 12,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Finnova has a secret lab nearby...',
        'They\'re extracting DNA from fossils.',
        'Trying to bring back Megalodon.',
        'The ultimate fin source, they say.',
        'It\'s madness. Someone must stop them!'
      ]
    }
  ],
  encounterTable: [
    // Deep sea sharks
    { speciesId: 110, minLevel: 45, maxLevel: 55, weight: 20 },  // Goblin Shark
    { speciesId: 115, minLevel: 48, maxLevel: 58, weight: 10 },  // Frilled Shark
    { speciesId: 111, minLevel: 42, maxLevel: 52, weight: 20 },  // Cookiecutter Shark
    { speciesId: 112, minLevel: 45, maxLevel: 55, weight: 15 },  // Elephant Fish
    { speciesId: 113, minLevel: 45, maxLevel: 55, weight: 15 },  // Crocodile Shark
    { speciesId: 85, minLevel: 50, maxLevel: 58, weight: 10 },   // Pacific Sleeper Shark
    { speciesId: 109, minLevel: 55, maxLevel: 60, weight: 5 },   // Greenland Shark (very rare)
    { speciesId: 114, minLevel: 50, maxLevel: 58, weight: 5 }    // Megamouth Shark (rare)
  ],
  isOutdoor: true,
  palette: 'deep'  // Dark abyssal depths
};

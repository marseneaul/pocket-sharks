import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;

// 20x18 tiles = 160x144 pixels
// Seattle Airport - Indoor arrival point for Pacific Northwest region
// Layout: Airport terminal with exit to Puget Sound coast
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],  // Counters
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
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // South exit to Puget Sound
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const SEATTLE_AIRPORT: MapData = {
  id: 'seattle-airport',
  name: 'Seattle-Tacoma Airport',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to Puget Sound
    {
      x: 8,
      y: 17,
      targetMap: 'puget-sound',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'puget-sound',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'puget-sound',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'puget-sound',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Airport greeter
    {
      id: 'airport-greeter',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Seattle!',
        'The Pacific Northwest is home to cold-water sharks.',
        'Head south to reach Puget Sound.',
        'Be prepared - these waters are much colder than California!'
      ]
    },
    // Cold water diver
    {
      id: 'cold-diver',
      x: 5,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I came here for the Salmon Sharks!',
        'They\'re incredible - warm-blooded sharks in frigid waters.',
        'The locals call them "mini great whites".',
        'You\'ll need cold water diving gear for these waters.'
      ]
    },
    // Local fisherman
    {
      id: 'local-fisherman',
      x: 14,
      y: 11,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Spiny Dogfish are everywhere up here!',
        'They travel in massive schools.',
        'Be careful of their venomous dorsal spines.',
        'Great for beginners though - easy to find.'
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
        'Seattle-Tacoma Airport Information.',
        'Puget Sound is directly south.',
        'The Pacific Kelp Forest is further along the coast.',
        'For deep-water species, visit the Cold Water Trench.'
      ]
    },
    // Research scientist
    {
      id: 'research-scientist',
      x: 15,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I study Pacific Sleeper Sharks here.',
        'They can grow to over 20 feet long!',
        'But they live in very deep, cold water.',
        'You\'ll need advanced certifications to reach them.'
      ]
    }
  ],
  encounterTable: [], // No encounters indoors
  isOutdoor: false
};

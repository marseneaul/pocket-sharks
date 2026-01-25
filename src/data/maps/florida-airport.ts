import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;

// 20x18 tiles = 160x144 pixels
// Florida Airport - Arrival point from Cabo, gateway to Caribbean
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],  // Counters
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,F,F,F,F,F,F,F,F,F,F,W,W,F,F,W],  // Seating
  [W,F,F,W,W,F,F,F,F,F,F,F,F,F,F,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // South exit to Florida Keys
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const FLORIDA_AIRPORT: MapData = {
  id: 'florida-airport',
  name: 'Miami Airport',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // South exit to Florida Keys Beach
    {
      x: 8,
      y: 17,
      targetMap: 'florida-keys',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'florida-keys',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'florida-keys',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'florida-keys',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Airport greeter
    {
      id: 'miami-greeter',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Miami!',
        'The Florida Keys are south of here.',
        'It\'s a great place to find nurse sharks and stingrays!',
        'Gym Leader Coral runs the Reef Gym in Key West.'
      ]
    },
    // Tourist with dive info
    {
      id: 'diver-tourist',
      x: 5,
      y: 8,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I\'m here for the diving!',
        'You can get your Advanced SCUBA certification here.',
        'It lets you dive deeper and explore wrecks!'
      ]
    },
    // Scientist NPC (fossil hint)
    {
      id: 'scientist-fossils',
      x: 14,
      y: 11,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'m researching ancient sharks!',
        'There are fossils in these waters...',
        'If you find a Swirl Fossil or Wing Fossil,',
        'bring them to the Research Center in Key West!'
      ]
    },
    // Information desk
    {
      id: 'info-desk-miami',
      x: 4,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Miami Airport Information.',
        'Head south to reach the Florida Keys.',
        'The Reef Gym is in Key West.',
        'Watch out for Team Finn - they\'ve been spotted!'
      ]
    },
    // Team Finn warning
    {
      id: 'worried-local',
      x: 15,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Have you heard about Finnova Biotech?',
        'They opened a facility near the reefs.',
        'They say it\'s for "conservation research"...',
        'But I\'ve seen their boats out at night with nets.'
      ]
    }
  ],
  encounterTable: [], // No encounters indoors
  isOutdoor: false
};

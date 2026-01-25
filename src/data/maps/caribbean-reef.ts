import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;
const R = TILE.REEF;

// 20x18 tiles = 160x144 pixels
// Caribbean Reef - SCUBA diving area with reef sharks
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North from Florida Keys
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,R,R,R,A,A,A,A,A,A,A,A,R,R,R,A,A,A],
  [A,A,R,R,R,R,R,A,A,A,A,A,A,R,R,R,R,R,A,A],
  [A,A,R,R,R,R,A,A,A,A,A,A,A,A,R,R,R,R,A,A],
  [A,A,A,R,R,A,A,A,A,A,A,A,A,A,A,R,R,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],  // Central diving area
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,R,R,R,A,A,A,A,A,A,A,A,R,R,R,A,A,A],
  [A,A,R,R,R,R,R,A,A,A,A,A,A,R,R,R,R,R,A,A],
  [A,A,R,R,R,R,A,A,A,A,A,A,A,A,R,R,R,R,A,A],
  [A,A,A,R,R,A,A,A,A,A,A,A,A,A,A,R,R,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to deeper waters
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const CARIBBEAN_REEF: MapData = {
  id: 'caribbean-reef',
  name: 'Caribbean Reef',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North exit to Florida Keys
    {
      x: 8,
      y: 0,
      targetMap: 'florida-keys',
      targetX: 9,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'florida-keys',
      targetX: 10,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'florida-keys',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'florida-keys',
      targetX: 11,
      targetY: 16
    },
    // West exit to Florida Keys beach
    {
      x: 0,
      y: 8,
      targetMap: 'florida-keys',
      targetX: 18,
      targetY: 8
    },
    {
      x: 0,
      y: 9,
      targetMap: 'florida-keys',
      targetX: 18,
      targetY: 9
    }
  ],
  npcs: [
    // Diving trainer 1
    {
      id: 'diver-trainer-1',
      x: 5,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The Caribbean Reef Sharks here are amazing!',
        'Let me show you my team!'
      ],
      trainer: {
        name: 'Diver Carlos',
        team: [
          { speciesId: 1, level: 20 },   // Blacktip Reef Shark
          { speciesId: 12, level: 21 },  // Lemon Shark
          { speciesId: 6, level: 22 }    // Bull Shark
        ],
        defeatedDialogue: [
          'Great battle!',
          'The reefs still hide many secrets.'
        ],
        prizeMoney: 440
      }
    },
    // Diving trainer 2
    {
      id: 'diver-trainer-2',
      x: 14,
      y: 12,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I specialize in rare reef species!',
        'Prepare yourself!'
      ],
      trainer: {
        name: 'Researcher Lina',
        team: [
          { speciesId: 13, level: 21 },  // Nurse Shark
          { speciesId: 19, level: 21 },  // Spinner Shark
          { speciesId: 4, level: 22 }    // Whitetip Reef Shark
        ],
        defeatedDialogue: [
          'Impressive technique!',
          'Have you seen the rare chain catsharks at night?'
        ],
        prizeMoney: 460
      }
    },
    // Team Finn diver (antagonist)
    {
      id: 'finn-diver',
      x: 10,
      y: 8,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Get out of here!',
        'This is Finnova research territory!',
        '...Fine, you want to battle? Let\'s go!'
      ],
      trainer: {
        name: 'Finn Diver',
        team: [
          { speciesId: 6, level: 22 },   // Bull Shark
          { speciesId: 64, level: 22 },  // Shortfin Mako
          { speciesId: 2, level: 23 }    // Blacktip Shark
        ],
        defeatedDialogue: [
          'Ugh! The boss won\'t be happy...',
          'You haven\'t seen the last of Team Finn!'
        ],
        prizeMoney: 500
      }
    },
    // Friendly diver with tips
    {
      id: 'helpful-diver',
      x: 4,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I\'ve seen tiger sharks in these waters!',
        'They\'re rare, but they appear sometimes.',
        'Oceanic whitetips too, but be careful - they\'re aggressive!'
      ]
    },
    // Fossil hunter
    {
      id: 'fossil-diver',
      x: 15,
      y: 5,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I found a strange fossil here yesterday!',
        'It was shaped like a spiral - could be ancient!',
        'Keep your eyes open while diving.'
      ]
    }
  ],
  // Caribbean Reef encounters (SCUBA required)
  encounterTable: [
    { speciesId: 81, minLevel: 19, maxLevel: 23, weight: 18 },  // Caribbean Reef Shark (new!)
    { speciesId: 1, minLevel: 19, maxLevel: 23, weight: 14 },   // Blacktip Reef Shark
    { speciesId: 4, minLevel: 19, maxLevel: 23, weight: 12 },   // Whitetip Reef Shark
    { speciesId: 13, minLevel: 20, maxLevel: 24, weight: 12 },  // Nurse Shark
    { speciesId: 12, minLevel: 20, maxLevel: 24, weight: 10 },  // Lemon Shark
    { speciesId: 6, minLevel: 21, maxLevel: 25, weight: 8 },    // Bull Shark
    { speciesId: 19, minLevel: 20, maxLevel: 24, weight: 8 },   // Spinner Shark
    { speciesId: 82, minLevel: 23, maxLevel: 27, weight: 4 },   // Tiger Shark (new! rare)
    { speciesId: 77, minLevel: 24, maxLevel: 28, weight: 3 },   // Great Hammerhead (very rare)
    { speciesId: 84, minLevel: 22, maxLevel: 26, weight: 3 },   // Chain Catshark (new! rare)
    { speciesId: 83, minLevel: 22, maxLevel: 26, weight: 3 },   // Scoophead (new! rare)
    { speciesId: 5, minLevel: 22, maxLevel: 26, weight: 3 },    // Oceanic Whitetip (rare)
    { speciesId: 85, minLevel: 25, maxLevel: 29, weight: 1 },   // Golden Hammerhead (new! very rare)
    { speciesId: 18, minLevel: 22, maxLevel: 26, weight: 1 }    // Coral Catshark (rare)
  ],
  isOutdoor: true
};

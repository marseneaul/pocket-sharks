import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;

// 20x18 tiles = 160x144 pixels
// Dr. Martillo's Gym - Second Gym (Cephalo Badge)
// Leader: Dr. Martillo - Specializes in Psychic-type hammerheads
// Layout: Research lab aesthetic with water tanks
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],  // Research tanks
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // West entrance
  [F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,A,A,F,F,F,F,F,F,F,F,F,F,F,A,A,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,F,A,A,A,F,F,F,F,F,F,F,F,F,A,A,A,F,F,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const MARTILLO_GYM: MapData = {
  id: 'martillo-gym',
  name: "Dr. Martillo's Lab",
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West entrance from Cabo Town
    {
      x: 0,
      y: 9,
      targetMap: 'cabo-town',
      targetX: 18,
      targetY: 5
    },
    {
      x: 0,
      y: 10,
      targetMap: 'cabo-town',
      targetX: 18,
      targetY: 6
    }
  ],
  npcs: [
    // Gym Guide
    {
      id: 'gym-guide-martillo',
      x: 3,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Welcome to Dr. Martillo\'s Hammerhead Research Lab!',
        'This doubles as the second gym.',
        'Dr. Martillo studies hammerhead electroreception.',
        'His Psychic-type sharks sense your every move!',
        'Defeat the researchers to reach the Doctor.'
      ]
    },
    // Gym Trainer 1
    {
      id: 'gym-trainer-m1',
      x: 6,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I study bonnethead behavior!',
        'Their hammer-shaped heads are fascinating!'
      ],
      trainer: {
        name: 'Researcher Elena',
        team: [
          { speciesId: 10, level: 18 },  // Bonnethead
          { speciesId: 10, level: 18 },  // Bonnethead
          { speciesId: 68, level: 19 }   // Scalloped Bonnethead
        ],
        defeatedDialogue: [
          'Your mental fortitude is impressive!',
          'The Doctor will test you further.'
        ],
        prizeMoney: 380
      }
    },
    // Gym Trainer 2
    {
      id: 'gym-trainer-m2',
      x: 13,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Scalloped hammerheads are my specialty!',
        'Their electroreception is unmatched!'
      ],
      trainer: {
        name: 'Scientist Pablo',
        team: [
          { speciesId: 11, level: 19 },  // Scalloped Hammerhead
          { speciesId: 71, level: 19 },  // Cownose Ray
          { speciesId: 11, level: 20 }   // Scalloped Hammerhead
        ],
        defeatedDialogue: [
          'I sensed your victory coming...',
          'Dr. Martillo sensed it too, surely.'
        ],
        prizeMoney: 400
      }
    },
    // Gym Trainer 3
    {
      id: 'gym-trainer-m3',
      x: 6,
      y: 13,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Smooth hammerheads prefer cooler waters.',
        'But their psychic power runs hot!'
      ],
      trainer: {
        name: 'Researcher Marco',
        team: [
          { speciesId: 73, level: 19 },  // Smooth Hammerhead
          { speciesId: 10, level: 18 },  // Bonnethead
          { speciesId: 73, level: 20 }   // Smooth Hammerhead
        ],
        defeatedDialogue: [
          'A smooth defeat for me!',
          'Dr. Martillo awaits.'
        ],
        prizeMoney: 400
      }
    },
    // GYM LEADER DR. MARTILLO
    {
      id: 'gym-leader-martillo',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Ah, a new challenger approaches.',
        'I am Dr. Martillo, hammerhead researcher.',
        '"Martillo" means "hammer" in Spanish.',
        'Fitting, no? I have dedicated my life to these sharks.',
        'Their cephalofoils are evolution\'s masterpiece.',
        'Electroreception, enhanced vision, improved manueverability...',
        'Let me show you the true power of the hammerhead!',
        '...',
        'But first... have you seen Finnova\'s operations?',
        'They claim to farm shark fins sustainably.',
        'Lies. They are decimating wild populations.',
        'The hammerhead schools grow smaller each year.',
        'Someone must stop them. Perhaps... you.',
        'But first, prove your worth in battle!'
      ],
      trainer: {
        name: 'Dr. Martillo',
        team: [
          { speciesId: 68, level: 20 },  // Scalloped Bonnethead
          { speciesId: 10, level: 20 },  // Bonnethead
          { speciesId: 11, level: 21 },  // Scalloped Hammerhead
          { speciesId: 73, level: 21 },  // Smooth Hammerhead
          { speciesId: 77, level: 23 }   // Great Hammerhead (ace)
        ],
        defeatedDialogue: [
          '...',
          'Magnificent. Truly magnificent.',
          'Your bond with your sharks transcends species.',
          'Take this - the Cephalo Badge!',
          'It proves mastery over psychic hammerhead techniques.',
          'Also, take this TM. It contains Confusion.',
          'Use it to unlock the psychic potential in your sharks.',
          '...',
          'One more thing. I must ask a favor.',
          'Continue your journey. Grow stronger.',
          'And when you are ready... expose Finnova for what they are.',
          'Their headquarters is somewhere in the Pacific.',
          'Save the sharks. Save the ocean.',
          'I believe in you, young trainer.'
        ],
        prizeMoney: 2300
      }
    },
    // Research assistant with lore
    {
      id: 'research-assistant',
      x: 14,
      y: 14,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Dr. Martillo has been fighting Finnova for years.',
        'He published papers proving their "farms" are fake.',
        'But they have money. Influence.',
        'Nobody listens to a marine biologist.',
        'Maybe a powerful trainer could make a difference...'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in gym
  isOutdoor: false
};

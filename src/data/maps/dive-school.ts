import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const A = TILE.WATER;

// 20x18 tiles = 160x144 pixels
// Dive School - Where player earns Open Water SCUBA certification
// Layout: Indoor school with training pools
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,A,A,A,A,A,F,F,F,F,A,A,A,A,A,F,F,W],  // Training pools
  [W,F,F,A,A,A,A,A,F,F,F,F,A,A,A,A,A,F,F,W],
  [W,F,F,A,A,A,A,A,F,F,F,F,A,A,A,A,A,F,F,W],
  [W,F,F,A,A,A,A,A,F,F,F,F,A,A,A,A,A,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],  // West entrance from Waikiki
  [F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],  // Equipment storage
  [W,F,F,W,W,W,F,F,F,F,F,F,F,F,W,W,W,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const DIVE_SCHOOL: MapData = {
  id: 'dive-school',
  name: 'Hawaii Dive School',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // West entrance from Waikiki Beach
    {
      x: 0,
      y: 9,
      targetMap: 'waikiki-beach',
      targetX: 18,
      targetY: 5
    },
    {
      x: 0,
      y: 10,
      targetMap: 'waikiki-beach',
      targetX: 18,
      targetY: 6
    }
  ],
  npcs: [
    // DIVE MASTER - Grants SCUBA certification
    {
      id: 'dive-master',
      x: 10,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Aloha! I\'m Kai, the Dive Master here.',
        'I see you\'ve come to earn your Open Water SCUBA certification!',
        'With the Ray Badge, you\'ve proven your skills with sharks.',
        'Now let me teach you the ways of the deep.',
        '...',
        'First, you must learn to equalize pressure...',
        'Control your buoyancy...',
        'And respect the underwater world.',
        '...',
        'Congratulations! You\'ve earned your Open Water SCUBA certification!',
        'You can now dive to deeper reefs anywhere in the world!',
        'Go explore the Hawaii Reef south of Waikiki Beach.',
        'You\'ll see Whitetip and Blacktip reef sharks there!',
        'Remember: no catching during certification observation dives.',
        'You\'ll need to return with a local conservation permit for that.',
        'Safe diving!'
      ]
    },
    // Assistant instructor
    {
      id: 'assistant-instructor',
      x: 5,
      y: 5,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The training pools here simulate different depths.',
        'Once you\'re certified, real reefs will feel natural!',
        'Talk to Dive Master Kai when you\'re ready.'
      ]
    },
    // Student diver
    {
      id: 'student-diver-1',
      x: 14,
      y: 5,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I just finished my pool training!',
        'The certification process is easier than I thought.',
        'Just talk to the Dive Master!'
      ]
    },
    // Equipment manager
    {
      id: 'equipment-manager',
      x: 4,
      y: 12,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'We provide all the diving equipment you need.',
        'Masks, fins, regulators, BCDs...',
        'Once certified, you can dive anywhere!'
      ]
    },
    // Veteran diver sharing stories
    {
      id: 'veteran-diver',
      x: 15,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'I\'ve been diving for 20 years.',
        'The deeper you go, the more amazing sharks you\'ll find.',
        'Angelsharks, Soupfin sharks, Sixgills...',
        'They\'re all waiting in the deeper waters.',
        'Get your certification and discover a new world!'
      ]
    },
    // NPC explaining permit system
    {
      id: 'permit-explainer',
      x: 10,
      y: 15,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Hawaii has strict shark conservation laws.',
        'You can observe sharks here during certification dives...',
        'But catching them requires a special permit.',
        'Come back after you\'ve explored more of the world.',
        'The permit office should be open by then.'
      ]
    }
  ],
  encounterTable: [], // No encounters indoors
  isOutdoor: false
};

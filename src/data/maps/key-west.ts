import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;

// 20x18 tiles = 160x144 pixels
// Key West - Town with Reef Gym, shops, and dive certification center
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,W,F,F,F,F,F,W,W,W,W,F,F,F,W],  // Buildings
  [W,F,F,W,W,W,W,F,F,F,F,F,W,W,W,W,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,W,W,W,W,F,F,F,F,F,W,W,W,W,F,F,F,W],  // More buildings
  [W,F,F,W,W,W,W,F,F,F,F,F,W,W,W,W,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F],  // East exit to Florida Keys
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F],
  [W,F,F,W,W,W,W,F,F,F,F,F,W,W,W,W,F,F,F,W],  // Gym and Research
  [W,F,F,W,W,W,W,F,F,F,F,F,W,W,W,W,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,W],
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],  // Beach boardwalk
  [W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],  // South to Coral Gym
  [W,W,W,W,W,W,W,W,F,F,F,F,W,W,W,W,W,W,W,W],
];

export const KEY_WEST: MapData = {
  id: 'key-west',
  name: 'Key West',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // East exit to Florida Keys beach
    {
      x: 19,
      y: 8,
      targetMap: 'florida-keys',
      targetX: 1,
      targetY: 8
    },
    {
      x: 19,
      y: 9,
      targetMap: 'florida-keys',
      targetX: 1,
      targetY: 9
    },
    // South exit to Coral Gym
    {
      x: 8,
      y: 17,
      targetMap: 'coral-reef-gym',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'coral-reef-gym',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'coral-reef-gym',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'coral-reef-gym',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Dive shop owner
    {
      id: 'dive-shop',
      x: 5,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Key West Dive Shop!',
        'We offer Advanced SCUBA certification here.',
        'With it, you can dive deeper reefs and wrecks!',
        'Complete our course to earn your certification.'
      ]
    },
    // Shop keeper
    {
      id: 'item-shop',
      x: 14,
      y: 2,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to the Reef Supply Shop!',
        'We have everything a shark trainer needs.'
      ],
      shopId: 'key-west-shop'
    },
    // Research center scientist
    {
      id: 'fossil-scientist',
      x: 5,
      y: 10,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'This is the Fossil Research Center!',
        'If you find ancient fossils while diving,',
        'bring them to us! We can resurrect them!',
        'Helicoprion and Aquilolamna await discovery!'
      ]
    },
    // Gym guide
    {
      id: 'gym-guide',
      x: 14,
      y: 10,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'The Reef Gym is south of here!',
        'Gym Leader Coral specializes in reef sharks.',
        'Her Caribbean Reef Shark is legendary!',
        'Defeat her to earn the Reef Badge!'
      ]
    },
    // Trainer hanging out
    {
      id: 'casual-trainer',
      x: 10,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Key West is beautiful!',
        'But watch out for Team Finn...',
        'They\'ve been harassing divers lately.'
      ]
    },
    // Team Finn grunt (story element)
    {
      id: 'finn-grunt-1',
      x: 17,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        '...',
        'What are you looking at?',
        'Finnova Biotech is doing important research!',
        'Mind your own business, kid.'
      ]
    },
    // Local diver
    {
      id: 'local-diver-kw',
      x: 3,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'The reefs used to be full of sharks...',
        'Now they\'re disappearing.',
        'Ever since that Finnova lab showed up.'
      ]
    },
    // Excited tourist
    {
      id: 'tourist-excited',
      x: 12,
      y: 14,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I saw a lemon shark today!',
        'It was huge!',
        'The Caribbean has amazing wildlife!'
      ]
    }
  ],
  encounterTable: [], // No encounters in town
  isOutdoor: true
};

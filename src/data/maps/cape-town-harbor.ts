import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const F = TILE.FLOOR;
const S = TILE.SAND;
const A = TILE.WATER;
const D = TILE.DOCK;
const H = TILE.HEAL;

// 20x18 tiles = 160x144 pixels
// Cape Town Harbor - Safari Zone equivalent, arrival from Europe
// Theme: Great Whites have been fished out, ecosystem collapse
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],  // Ferry docks
  [W,D,D,D,D,D,A,A,A,A,A,A,A,A,D,D,D,D,D,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,F,H,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],  // Healing center
  [W,F,F,D,F,W,S,S,S,S,S,S,S,S,W,F,D,F,F,W],
  [W,W,W,D,W,W,S,S,S,S,S,S,S,S,W,W,D,W,W,W],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,S],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,F],  // East to Cape Town Coast
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,F],
  [S,S,S,D,S,S,S,S,S,S,S,S,S,S,S,S,D,S,S,W],
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // South to Kelp Forest
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],
];

export const CAPE_TOWN_HARBOR: MapData = {
  id: 'cape-town-harbor',
  name: 'Cape Town Harbor',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // East exit to Cape Town Coast
    {
      x: 19,
      y: 9,
      targetMap: 'cape-town-coast',
      targetX: 1,
      targetY: 9
    },
    {
      x: 19,
      y: 10,
      targetMap: 'cape-town-coast',
      targetX: 1,
      targetY: 10
    },
    // South exit to Kelp Forest
    {
      x: 8,
      y: 17,
      targetMap: 'cape-town-kelp',
      targetX: 9,
      targetY: 1
    },
    {
      x: 9,
      y: 17,
      targetMap: 'cape-town-kelp',
      targetX: 10,
      targetY: 1
    },
    {
      x: 10,
      y: 17,
      targetMap: 'cape-town-kelp',
      targetX: 10,
      targetY: 1
    },
    {
      x: 11,
      y: 17,
      targetMap: 'cape-town-kelp',
      targetX: 11,
      targetY: 1
    }
  ],
  npcs: [
    // Healing center nurse
    {
      id: 'nurse-capetown',
      x: 2,
      y: 4,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Cape Town!',
        'The waters here are famous for unique sharks.',
        'Step on the pool to restore your sharks.'
      ]
    },
    // Shop keeper
    {
      id: 'shop-capetown',
      x: 16,
      y: 5,
      sprite: 0,
      facing: 'down',
      shopId: 'capetown-shop',
      dialogue: [
        'Sawubona! Welcome to my shop!',
        'Stock up before diving the kelp forests!'
      ]
    },
    // Environmental message - Great Whites gone
    {
      id: 'marine-biologist',
      x: 8,
      y: 5,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'It\'s a tragedy what happened here...',
        'Great White Sharks used to patrol these waters.',
        'But overfishing wiped them out completely.',
        'Now the seal population has exploded.',
        'Some seals are sick with disease...',
        'The ecosystem is collapsing without apex predators.'
      ]
    },
    // Safari zone info
    {
      id: 'safari-guide',
      x: 10,
      y: 8,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'Cape Town is the Safari Zone of shark diving!',
        'We have species found nowhere else on Earth.',
        'Pyjama Catsharks, Shysharks, Leopard Catsharks...',
        'The kelp forests south of here are incredible.',
        'Just watch out for aggressive seals.'
      ]
    },
    // Themba\'s gym direction
    {
      id: 'local-diver',
      x: 15,
      y: 2,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'Looking for Gym Leader Themba?',
        'His gym is past the coast to the east.',
        'He specializes in our fairy-type sharks.',
        'Those cute catsharks can be fierce!'
      ]
    },
    // Seal Island teaser
    {
      id: 'boat-captain',
      x: 2,
      y: 1,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'I used to take tourists to Seal Island...',
        'To see Great Whites breach hunt seals.',
        'But there are no more Great Whites.',
        'The island is overrun with seals now.',
        'Some say a Great White still lurks nearby...',
        'But nobody has seen one in years.'
      ]
    },
    // Conservation message
    {
      id: 'conservationist',
      x: 6,
      y: 10,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'We\'re trying to bring back the Great Whites.',
        'Without them, the whole ecosystem suffers.',
        'Overfishing for fins destroyed the population.',
        'Please help protect what sharks remain here.'
      ]
    }
  ],
  encounterTable: [], // No wild encounters in harbor
  isOutdoor: true
};

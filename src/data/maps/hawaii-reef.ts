import type { MapData } from '../../types/overworld.ts';
import { TILE } from '../tiles.ts';

const W = TILE.WALL;
const A = TILE.WATER;     // Shallow water
const R = TILE.REEF;      // Reef areas (openwater cert)
const K = TILE.KELP;      // Kelp with encounters

// 20x18 tiles = 160x144 pixels
// Hawaii Reef - Teaser area where player can SEE sharks but can't catch them
// Story: "No captures during certification dives" / "Local conservation permit required"
// Layout: Beautiful reef with coral and kelp, sharks visible in water
const tiles: number[][] = [
  [W,W,W,W,W,W,W,W,A,A,A,A,W,W,W,W,W,W,W,W],  // North entrance from Waikiki
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,A,A,A,K,K,A,A,A,A,A,A,A,A,K,K,A,A,A,W],
  [W,A,A,K,K,K,K,A,A,A,A,A,A,K,K,K,K,A,A,W],
  [W,A,A,K,K,K,A,A,A,A,A,A,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,A,A,A,R,R,R,R,A,A,A,K,A,A,A,W],
  [W,A,A,A,A,A,A,R,R,R,R,R,R,A,A,A,A,A,A,W],  // Central reef
  [W,A,A,A,A,A,R,R,R,R,R,R,R,R,A,A,A,A,A,W],
  [W,A,K,A,A,A,R,R,R,R,R,R,R,R,A,A,A,K,A,W],
  [W,A,K,K,A,A,R,R,R,R,R,R,R,R,A,A,K,K,A,W],
  [W,A,A,K,A,A,A,R,R,R,R,R,R,A,A,A,K,A,A,W],
  [W,A,A,A,A,A,A,A,R,R,R,R,A,A,A,A,A,A,A,W],
  [W,A,A,K,K,A,A,A,A,A,A,A,A,A,A,K,K,A,A,W],
  [W,A,A,K,K,K,A,A,A,A,A,A,A,A,K,K,K,A,A,W],
  [W,A,A,A,K,K,A,A,A,A,A,A,A,A,K,K,A,A,A,W],
  [W,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],  // South blocked
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

export const HAWAII_REEF: MapData = {
  id: 'hawaii-reef',
  name: 'Hawaii Reef',
  width: 20,
  height: 18,
  tiles,
  warps: [
    // North entrance from Waikiki Beach
    {
      x: 8,
      y: 0,
      targetMap: 'waikiki-beach',
      targetX: 8,
      targetY: 16
    },
    {
      x: 9,
      y: 0,
      targetMap: 'waikiki-beach',
      targetX: 9,
      targetY: 16
    },
    {
      x: 10,
      y: 0,
      targetMap: 'waikiki-beach',
      targetX: 10,
      targetY: 16
    },
    {
      x: 11,
      y: 0,
      targetMap: 'waikiki-beach',
      targetX: 11,
      targetY: 16
    }
  ],
  npcs: [
    // Dive guide - explains no catching rule
    {
      id: 'dive-guide',
      x: 6,
      y: 3,
      sprite: 0,
      facing: 'down',
      dialogue: [
        'Welcome to Hawaii Reef!',
        'This is a protected marine sanctuary.',
        'You can observe the sharks here...',
        'But no captures are allowed during certification dives!',
        'The local conservation laws protect these waters.',
        'Come back with a permit if you want to catch sharks here.'
      ]
    },
    // Snorkeler spotting sharks
    {
      id: 'snorkeler-spotter',
      x: 4,
      y: 9,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'Look! A Whitetip Reef Shark!',
        'They\'re so beautiful swimming through the coral.',
        'I wish I could catch one...',
        'But the marine sanctuary rules are important for conservation.'
      ]
    },
    // Diver near reef
    {
      id: 'reef-diver',
      x: 14,
      y: 7,
      sprite: 0,
      facing: 'left',
      dialogue: [
        'The Blacktip Reef Sharks here are amazing!',
        'They patrol the reef edges looking for fish.',
        'This is the best place to observe them.',
        'Maybe someday the permit office will open for trainers.'
      ]
    },
    // Marine biologist
    {
      id: 'marine-biologist',
      x: 10,
      y: 11,
      sprite: 0,
      facing: 'up',
      dialogue: [
        'I\'m studying shark populations here.',
        'Hawaii has some of the healthiest reef ecosystems.',
        'The Whitetip and Blacktip sharks you see here...',
        'They\'re part of a carefully managed conservation program.',
        'Observe and appreciate - but leave them in peace.'
      ]
    },
    // Tourist taking photos
    {
      id: 'tourist-photographer',
      x: 15,
      y: 13,
      sprite: 0,
      facing: 'left',
      dialogue: [
        '*click* Got it!',
        'The sharks here are so photogenic!',
        'I came all the way from San Diego just to see them.',
        'Your SCUBA cert lets you get close for photos.',
        'Just remember - look but don\'t catch!'
      ]
    },
    // Conservation officer
    {
      id: 'conservation-officer',
      x: 3,
      y: 14,
      sprite: 0,
      facing: 'right',
      dialogue: [
        'I\'m with Hawaii Fish & Wildlife.',
        'These reefs are protected under state law.',
        'Certification dives are for observation only.',
        'Trainers will need to return later for catching permits.',
        'For now, enjoy the view!'
      ]
    }
  ],
  // SPECIAL: Encounters here show sharks but with "can't catch" message
  // The game should display "No captures during certification dives!"
  // when trying to catch in this area
  // For now, using empty encounters - to be implemented with story flags
  encounterTable: [
    // These sharks are VISIBLE but should not be catchable
    // TODO: Implement story flag check for "hasConservationPermit"
    // For now, encounters exist but catching should be blocked by game logic
    { speciesId: 4, minLevel: 10, maxLevel: 15, weight: 40 },   // Whitetip Reef Shark
    { speciesId: 1, minLevel: 10, maxLevel: 15, weight: 40 },   // Blacktip Reef Shark
    { speciesId: 57, minLevel: 8, maxLevel: 12, weight: 20 }    // Butterfly Ray
  ],
  isOutdoor: true
};

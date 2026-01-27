// Story Flags - Track story progression and unlock conditions

// All possible story flags in the game
export type StoryFlagId =
  // Main story progression stages
  | 'intro_complete'              // Finished intro, chose starter
  | 'first_badge'                 // Defeated Ray (Badge #1)
  | 'witnessed_finning'           // Saw Team Finn operations in Cabo
  | 'met_dr_martillo'             // Met Dr. Martillo at his gym
  | 'second_badge'                // Defeated Dr. Martillo (Badge #2)
  | 'third_badge'                 // Defeated Coral (Badge #3)
  | 'fourth_badge'                // Defeated Kai (Badge #4)
  | 'fifth_badge'                 // Defeated Henrik (Badge #5)
  | 'sixth_badge'                 // Defeated Themba (Badge #6)
  | 'seventh_badge'               // Defeated Jack (Badge #7)
  | 'found_finner_hq'             // Discovered Team Finner HQ location
  | 'defeated_boss_finley'        // Defeated the Team Finner boss
  | 'rescued_dr_vance'            // Rescued Dr. Vance from Finner
  | 'eighth_badge'                // Defeated Dr. Vance (Badge #8)
  | 'discovered_megalodon_lab'    // Found the Megalodon resurrection lab
  | 'obtained_megalodon_tooth'    // Got the Megalodon fossil
  | 'elite_four_unlocked'         // Can challenge Elite Four
  | 'champion_defeated'           // Beat the Champion

  // Region unlock flags
  | 'can_travel_hawaii'           // Unlocked after Ray Badge
  | 'can_travel_cabo'             // Unlocked after Open Water cert
  | 'can_travel_caribbean'        // Unlocked after Cabo story
  | 'can_travel_europe'           // Unlocked after Caribbean story
  | 'can_travel_capetown'         // Unlocked after Europe story
  | 'can_travel_australia'        // Unlocked after Cape Town story
  | 'can_travel_deepsea'          // Unlocked after Australia story
  | 'can_access_finner_hq'        // Story progression unlocks HQ
  | 'can_access_abyssal_trench'   // Late game area

  // Special permits/access
  | 'has_conservation_permit'     // Allows catching in Hawaii
  | 'has_research_access'         // Access to research facilities
  | 'has_submarine_license'       // Can operate submarines

  // Side quest flags
  | 'helped_injured_shark'        // Side quest in San Diego
  | 'reported_illegal_fishing'    // Reported poachers
  | 'completed_fossil_quest'      // Found all fossils

  // Knowledge flags (change NPC dialogue)
  | 'knows_about_finnova'         // Learned about Finnova Biotech
  | 'knows_about_megalodon_plot'  // Learned about resurrection plan
  | 'knows_finner_location';      // Knows where HQ is

// Story flag metadata
export interface StoryFlagData {
  id: StoryFlagId;
  name: string;
  description: string;
  category: 'main' | 'region' | 'permit' | 'side' | 'knowledge';
}

// All story flags with metadata
export const STORY_FLAGS: Record<StoryFlagId, StoryFlagData> = {
  // Main story progression
  intro_complete: {
    id: 'intro_complete',
    name: 'Journey Begun',
    description: 'Started your journey as a shark trainer.',
    category: 'main'
  },
  first_badge: {
    id: 'first_badge',
    name: 'Ray Badge Obtained',
    description: 'Defeated Gym Leader Ray in San Diego.',
    category: 'main'
  },
  witnessed_finning: {
    id: 'witnessed_finning',
    name: 'Dark Discovery',
    description: 'Witnessed Team Finn\'s illegal operations.',
    category: 'main'
  },
  met_dr_martillo: {
    id: 'met_dr_martillo',
    name: 'Met the Professor',
    description: 'Met Dr. Martillo, the hammerhead expert.',
    category: 'main'
  },
  second_badge: {
    id: 'second_badge',
    name: 'Cephalo Badge Obtained',
    description: 'Defeated Gym Leader Dr. Martillo in Cabo.',
    category: 'main'
  },
  third_badge: {
    id: 'third_badge',
    name: 'Reef Badge Obtained',
    description: 'Defeated Gym Leader Coral in the Caribbean.',
    category: 'main'
  },
  fourth_badge: {
    id: 'fourth_badge',
    name: 'Ocean Badge Obtained',
    description: 'Defeated Gym Leader Kai in Hawaii.',
    category: 'main'
  },
  fifth_badge: {
    id: 'fifth_badge',
    name: 'Survivor Badge Obtained',
    description: 'Defeated Gym Leader Henrik in Europe.',
    category: 'main'
  },
  sixth_badge: {
    id: 'sixth_badge',
    name: 'Safari Badge Obtained',
    description: 'Defeated Gym Leader Themba in Cape Town.',
    category: 'main'
  },
  seventh_badge: {
    id: 'seventh_badge',
    name: 'Outback Badge Obtained',
    description: 'Defeated Gym Leader Jack in Australia.',
    category: 'main'
  },
  found_finner_hq: {
    id: 'found_finner_hq',
    name: 'HQ Located',
    description: 'Discovered the location of Team Finner\'s headquarters.',
    category: 'main'
  },
  defeated_boss_finley: {
    id: 'defeated_boss_finley',
    name: 'Boss Defeated',
    description: 'Defeated Boss Finley of Team Finner.',
    category: 'main'
  },
  rescued_dr_vance: {
    id: 'rescued_dr_vance',
    name: 'Rescue Complete',
    description: 'Rescued Dr. Vance from Team Finner.',
    category: 'main'
  },
  eighth_badge: {
    id: 'eighth_badge',
    name: 'Deepsea Badge Obtained',
    description: 'Defeated Gym Leader Dr. Vance.',
    category: 'main'
  },
  discovered_megalodon_lab: {
    id: 'discovered_megalodon_lab',
    name: 'Secret Lab Found',
    description: 'Discovered the Megalodon resurrection laboratory.',
    category: 'main'
  },
  obtained_megalodon_tooth: {
    id: 'obtained_megalodon_tooth',
    name: 'Ancient Relic',
    description: 'Obtained a Megalodon tooth fossil.',
    category: 'main'
  },
  elite_four_unlocked: {
    id: 'elite_four_unlocked',
    name: 'Elite Challenge',
    description: 'Unlocked access to the Elite Four.',
    category: 'main'
  },
  champion_defeated: {
    id: 'champion_defeated',
    name: 'Champion',
    description: 'Defeated the Champion and became the best!',
    category: 'main'
  },

  // Region unlock flags
  can_travel_hawaii: {
    id: 'can_travel_hawaii',
    name: 'Hawaii Access',
    description: 'Can travel to Hawaii.',
    category: 'region'
  },
  can_travel_cabo: {
    id: 'can_travel_cabo',
    name: 'Cabo Access',
    description: 'Can travel to Cabo San Lucas.',
    category: 'region'
  },
  can_travel_caribbean: {
    id: 'can_travel_caribbean',
    name: 'Caribbean Access',
    description: 'Can travel to the Caribbean.',
    category: 'region'
  },
  can_travel_europe: {
    id: 'can_travel_europe',
    name: 'Europe Access',
    description: 'Can travel to Europe.',
    category: 'region'
  },
  can_travel_capetown: {
    id: 'can_travel_capetown',
    name: 'Cape Town Access',
    description: 'Can travel to Cape Town.',
    category: 'region'
  },
  can_travel_australia: {
    id: 'can_travel_australia',
    name: 'Australia Access',
    description: 'Can travel to Australia.',
    category: 'region'
  },
  can_travel_deepsea: {
    id: 'can_travel_deepsea',
    name: 'Deepsea Access',
    description: 'Can travel to the deep sea research station.',
    category: 'region'
  },
  can_access_finner_hq: {
    id: 'can_access_finner_hq',
    name: 'HQ Access',
    description: 'Can enter Team Finner\'s headquarters.',
    category: 'region'
  },
  can_access_abyssal_trench: {
    id: 'can_access_abyssal_trench',
    name: 'Abyssal Access',
    description: 'Can explore the abyssal trench.',
    category: 'region'
  },

  // Special permits
  has_conservation_permit: {
    id: 'has_conservation_permit',
    name: 'Conservation Permit',
    description: 'Licensed to catch sharks for research in Hawaii.',
    category: 'permit'
  },
  has_research_access: {
    id: 'has_research_access',
    name: 'Research Access',
    description: 'Has access to research facilities.',
    category: 'permit'
  },
  has_submarine_license: {
    id: 'has_submarine_license',
    name: 'Submarine License',
    description: 'Licensed to operate research submarines.',
    category: 'permit'
  },

  // Side quests
  helped_injured_shark: {
    id: 'helped_injured_shark',
    name: 'Shark Savior',
    description: 'Helped an injured shark in San Diego.',
    category: 'side'
  },
  reported_illegal_fishing: {
    id: 'reported_illegal_fishing',
    name: 'Whistleblower',
    description: 'Reported illegal fishing operations.',
    category: 'side'
  },
  completed_fossil_quest: {
    id: 'completed_fossil_quest',
    name: 'Fossil Hunter',
    description: 'Found all prehistoric shark fossils.',
    category: 'side'
  },

  // Knowledge flags
  knows_about_finnova: {
    id: 'knows_about_finnova',
    name: 'Finnova Intel',
    description: 'Learned about Finnova Biotech\'s true nature.',
    category: 'knowledge'
  },
  knows_about_megalodon_plot: {
    id: 'knows_about_megalodon_plot',
    name: 'Megalodon Intel',
    description: 'Learned about the Megalodon resurrection plot.',
    category: 'knowledge'
  },
  knows_finner_location: {
    id: 'knows_finner_location',
    name: 'HQ Intel',
    description: 'Knows the location of Team Finner HQ.',
    category: 'knowledge'
  }
};

// Get all flags in a category
export function getFlagsByCategory(category: StoryFlagData['category']): StoryFlagData[] {
  return Object.values(STORY_FLAGS).filter(f => f.category === category);
}

// Get main story flags in order
export function getMainStoryFlags(): StoryFlagId[] {
  return [
    'intro_complete',
    'first_badge',
    'witnessed_finning',
    'met_dr_martillo',
    'second_badge',
    'third_badge',
    'fourth_badge',
    'fifth_badge',
    'sixth_badge',
    'seventh_badge',
    'found_finner_hq',
    'defeated_boss_finley',
    'rescued_dr_vance',
    'eighth_badge',
    'discovered_megalodon_lab',
    'obtained_megalodon_tooth',
    'elite_four_unlocked',
    'champion_defeated'
  ];
}

// Map gym leader IDs to their story flags
export const GYM_LEADER_FLAGS: Record<string, StoryFlagId> = {
  'gym-leader-ray': 'first_badge',
  'gym-leader-martillo': 'second_badge',
  'gym-leader-coral': 'third_badge',
  'gym-leader-kai': 'fourth_badge',
  'gym-leader-henrik': 'fifth_badge',
  'gym-leader-themba': 'sixth_badge',
  'gym-leader-jack': 'seventh_badge',
  'gym-leader-vance': 'eighth_badge'
};

// Map badges to region unlocks (only includes flags that trigger unlocks)
export const BADGE_UNLOCKS: Partial<Record<StoryFlagId, StoryFlagId[]>> = {
  'first_badge': ['can_travel_hawaii'],
  'second_badge': ['can_travel_caribbean'],
  'third_badge': ['can_travel_europe'],
  'fifth_badge': ['can_travel_capetown'],
  'sixth_badge': ['can_travel_australia'],
  'seventh_badge': ['can_travel_deepsea', 'can_access_finner_hq'],
  'eighth_badge': ['elite_four_unlocked']
};

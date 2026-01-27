// Badge System - Gym badges earned by defeating gym leaders

export type BadgeId =
  | 'ray'       // Badge #1: Ray's Gym (San Diego)
  | 'cephalo'   // Badge #2: Martillo's Gym (Cabo)
  | 'reef'      // Badge #3: Coral's Gym (Caribbean)
  | 'ocean'     // Badge #4: Kai's Gym (Hawaii)
  | 'survivor'  // Badge #5: Henrik's Gym (Europe)
  | 'safari'    // Badge #6: Themba's Gym (Cape Town)
  | 'outback'   // Badge #7: Jack's Gym (Australia)
  | 'deepsea';  // Badge #8: Vance's Gym (Deepsea)

export interface BadgeData {
  id: BadgeId;
  name: string;
  gymLeaderId: string;      // NPC id of the gym leader who awards this badge
  gymLeaderName: string;
  location: string;
  description: string;
  order: number;            // Badge order (1-8)
}

// Badge definitions
export const BADGES: Record<BadgeId, BadgeData> = {
  ray: {
    id: 'ray',
    name: 'Ray Badge',
    gymLeaderId: 'gym-leader-ray',
    gymLeaderName: 'Ray',
    location: 'San Diego',
    description: 'Proves mastery over rays and stingrays.',
    order: 1
  },
  cephalo: {
    id: 'cephalo',
    name: 'Cephalo Badge',
    gymLeaderId: 'gym-leader-martillo',
    gymLeaderName: 'Dr. Martillo',
    location: 'Cabo San Lucas',
    description: 'Proves understanding of hammerhead electroreception.',
    order: 2
  },
  reef: {
    id: 'reef',
    name: 'Reef Badge',
    gymLeaderId: 'gym-leader-coral',
    gymLeaderName: 'Coral',
    location: 'Caribbean',
    description: 'Proves harmony with reef shark ecosystems.',
    order: 3
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Badge',
    gymLeaderId: 'gym-leader-kai',
    gymLeaderName: 'Kai',
    location: 'Hawaii',
    description: 'Proves courage in the open ocean.',
    order: 4
  },
  survivor: {
    id: 'survivor',
    name: 'Survivor Badge',
    gymLeaderId: 'gym-leader-henrik',
    gymLeaderName: 'Henrik',
    location: 'Europe',
    description: 'Proves resilience in cold, harsh waters.',
    order: 5
  },
  safari: {
    id: 'safari',
    name: 'Safari Badge',
    gymLeaderId: 'gym-leader-themba',
    gymLeaderName: 'Themba',
    location: 'Cape Town',
    description: 'Proves skill in diverse shark encounters.',
    order: 6
  },
  outback: {
    id: 'outback',
    name: 'Outback Badge',
    gymLeaderId: 'gym-leader-jack',
    gymLeaderName: 'Jack',
    location: 'Australia',
    description: 'Proves mastery of carpet sharks and reef dwellers.',
    order: 7
  },
  deepsea: {
    id: 'deepsea',
    name: 'Deepsea Badge',
    gymLeaderId: 'gym-leader-vance',
    gymLeaderName: 'Dr. Vance',
    location: 'Abyssal Research Base',
    description: 'Proves dominion over the deepest waters.',
    order: 8
  }
};

// Get all badges in order
export function getAllBadges(): BadgeData[] {
  return Object.values(BADGES).sort((a, b) => a.order - b.order);
}

// Get badge data by gym leader ID
export function getBadgeByGymLeader(gymLeaderId: string): BadgeData | null {
  for (const badge of Object.values(BADGES)) {
    if (badge.gymLeaderId === gymLeaderId) {
      return badge;
    }
  }
  return null;
}

// Get badge data by badge ID
export function getBadge(badgeId: BadgeId): BadgeData {
  return BADGES[badgeId];
}

// Total number of badges in the game
export const TOTAL_BADGES = 8;

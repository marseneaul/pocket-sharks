// Item types
export type ItemType = 'cage' | 'potion' | 'status' | 'battle' | 'key' | 'tm';

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  description: string;
  price: number;
  // For cages: catch rate modifier (1.0 = standard)
  catchRate?: number;
  // For potions: HP restored
  healAmount?: number;
  // For TMs: the move ID this TM teaches
  tmMoveId?: number;
}

export const ITEMS: Record<number, Item> = {
  // Shark Cages (catching items)
  1: {
    id: 1,
    name: 'SHARK CAGE',
    type: 'cage',
    description: 'A standard cage for catching wild sharks.',
    price: 200,
    catchRate: 1.0
  },
  2: {
    id: 2,
    name: 'GREAT CAGE',
    type: 'cage',
    description: 'A better cage with higher catch rate.',
    price: 600,
    catchRate: 1.5
  },
  3: {
    id: 3,
    name: 'ULTRA CAGE',
    type: 'cage',
    description: 'A high-performance catching cage.',
    price: 1200,
    catchRate: 2.0
  },
  4: {
    id: 4,
    name: 'MASTER CAGE',
    type: 'cage',
    description: 'The ultimate cage. Never fails.',
    price: 0, // Can't buy
    catchRate: 255 // Guaranteed catch
  },

  // Potions (healing items)
  10: {
    id: 10,
    name: 'POTION',
    type: 'potion',
    description: 'Restores 20 HP.',
    price: 300,
    healAmount: 20
  },
  11: {
    id: 11,
    name: 'SUPER POTION',
    type: 'potion',
    description: 'Restores 50 HP.',
    price: 700,
    healAmount: 50
  },
  12: {
    id: 12,
    name: 'HYPER POTION',
    type: 'potion',
    description: 'Restores 200 HP.',
    price: 1200,
    healAmount: 200
  },
  13: {
    id: 13,
    name: 'MAX POTION',
    type: 'potion',
    description: 'Fully restores HP.',
    price: 2500,
    healAmount: 9999
  },

  // Status healing items
  20: {
    id: 20,
    name: 'ANTIDOTE',
    type: 'status',
    description: 'Cures poison.',
    price: 100
  },
  21: {
    id: 21,
    name: 'PARALYZE HEAL',
    type: 'status',
    description: 'Cures paralysis.',
    price: 200
  },
  22: {
    id: 22,
    name: 'AWAKENING',
    type: 'status',
    description: 'Wakes up a sleeping shark.',
    price: 250
  },
  23: {
    id: 23,
    name: 'BURN HEAL',
    type: 'status',
    description: 'Heals burns.',
    price: 250
  },
  24: {
    id: 24,
    name: 'ICE HEAL',
    type: 'status',
    description: 'Thaws a frozen shark.',
    price: 250
  },
  25: {
    id: 25,
    name: 'FULL HEAL',
    type: 'status',
    description: 'Cures all status conditions.',
    price: 600
  },

  // Battle items
  30: {
    id: 30,
    name: 'REPEL',
    type: 'battle',
    description: 'Repels weak wild sharks for 100 steps.',
    price: 350
  },
  31: {
    id: 31,
    name: 'SUPER REPEL',
    type: 'battle',
    description: 'Repels weak wild sharks for 200 steps.',
    price: 500
  },
  32: {
    id: 32,
    name: 'MAX REPEL',
    type: 'battle',
    description: 'Repels weak wild sharks for 250 steps.',
    price: 700
  },
  33: {
    id: 33,
    name: 'ESCAPE ROPE',
    type: 'battle',
    description: 'Escape from caves and dungeons.',
    price: 550
  },

  // TMs (Technical Machines) - teach moves to sharks
  50: {
    id: 50,
    name: 'TM01',
    type: 'tm',
    description: 'Teaches CONFUSION. A weak psychic attack.',
    price: 0, // Gym reward, can't buy
    tmMoveId: 40  // Confusion
  },
  51: {
    id: 51,
    name: 'TM02',
    type: 'tm',
    description: 'Teaches THUNDERBOLT. A strong electrical attack.',
    price: 0, // Gym reward, can't buy
    tmMoveId: 52  // Thunderbolt
  },
  52: {
    id: 52,
    name: 'TM03',
    type: 'tm',
    description: 'Teaches SHADOW BALL. Hurls a shadowy blob.',
    price: 0, // Finner HQ reward
    tmMoveId: 132  // Shadow Ball
  },
  53: {
    id: 53,
    name: 'TM04',
    type: 'tm',
    description: 'Teaches IRON TAIL. Slams with a steel-hard tail.',
    price: 3000, // Can find or buy
    tmMoveId: 73  // Iron Tail
  },
  54: {
    id: 54,
    name: 'TM05',
    type: 'tm',
    description: 'Teaches FLAME BURST. A burst of spreading flames.',
    price: 3000, // Coral Cave reward (future)
    tmMoveId: 62  // Flame Burst
  },
  55: {
    id: 55,
    name: 'TM06',
    type: 'tm',
    description: 'Teaches ICE FANG. Bites with freezing fangs.',
    price: 5000, // Kelp Harbor shop
    tmMoveId: 111  // Ice Fang
  }
};

export function getItem(id: number): Item | undefined {
  return ITEMS[id];
}

// Player inventory
export interface InventorySlot {
  itemId: number;
  quantity: number;
}

// Calculate catch rate (Pokemon-style formula)
export function calculateCatchRate(
  maxHp: number,
  currentHp: number,
  catchRate: number, // Species catch rate (0-255)
  cageModifier: number // Cage's catch rate modifier
): number {
  // Simplified Pokemon catch formula
  // catch = ((3 * maxHp - 2 * currentHp) * catchRate * cageModifier) / (3 * maxHp)
  const hpFactor = (3 * maxHp - 2 * currentHp) / (3 * maxHp);
  const rate = hpFactor * catchRate * cageModifier;

  // Return probability 0-1
  return Math.min(rate / 255, 1);
}

// Attempt to catch - returns true if successful
export function attemptCatch(
  maxHp: number,
  currentHp: number,
  speciesCatchRate: number,
  cageModifier: number
): { success: boolean; shakes: number } {
  // Master Cage always catches
  if (cageModifier >= 255) {
    return { success: true, shakes: 3 };
  }

  const catchProbability = calculateCatchRate(maxHp, currentHp, speciesCatchRate, cageModifier);

  // Simulate cage rattling (0-3 shakes before breaking out or catching)
  let shakes = 0;
  for (let i = 0; i < 4; i++) {
    if (Math.random() < catchProbability) {
      shakes++;
    } else {
      break;
    }
  }

  return {
    success: shakes >= 4,
    shakes: Math.min(shakes, 3)
  };
}

// Default catch rates by species (0-255, higher = easier to catch)
export function getSpeciesCatchRate(speciesId: number): number {
  const catchRates: Record<number, number> = {
    // Starters - hard to catch
    1: 45, 2: 45, 3: 45,
    4: 45, 5: 45, 6: 45,
    7: 45, 8: 45, 9: 45,
    // Hammerhead line
    10: 120, 11: 60,
    // Route commons - easy to catch
    12: 190, 13: 255, 14: 190, 15: 190, 16: 190, 17: 190,
    // Gym area
    18: 150, 19: 150, 20: 60, 21: 75,
    // Special/rare
    22: 90, 23: 45, 24: 60, 25: 75, 26: 75, 27: 60, 28: 90,
    // Fossils - rare
    29: 45, 30: 60, 31: 3  // Megalodon is legendary-tier
  };
  return catchRates[speciesId] || 100;
}

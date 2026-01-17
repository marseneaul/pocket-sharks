// Shop inventory definitions

export interface ShopItem {
  itemId: number;
  stock?: number;  // undefined = infinite stock
}

export interface ShopInventory {
  id: string;
  name: string;
  items: ShopItem[];
}

// Coral Bay Market - Basic shop
export const CORAL_BAY_SHOP: ShopInventory = {
  id: 'coral-bay',
  name: 'CORAL MARKET',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 2 },   // Great Ball
    { itemId: 10 },  // Potion
    { itemId: 11 },  // Super Potion
    { itemId: 20 },  // Antidote
    { itemId: 30 },  // Repel
  ]
};

// Kelp Harbor Market - Expanded shop (Phase 4)
export const KELP_HARBOR_SHOP: ShopInventory = {
  id: 'kelp-harbor',
  name: 'HARBOR MART',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 2 },   // Great Ball
    { itemId: 3 },   // Ultra Ball
    { itemId: 10 },  // Potion
    { itemId: 11 },  // Super Potion
    { itemId: 12 },  // Hyper Potion
    { itemId: 20 },  // Antidote
    { itemId: 25 },  // Full Heal
    { itemId: 30 },  // Repel
    { itemId: 31 },  // Super Repel
    { itemId: 33 },  // Escape Rope
    { itemId: 55, stock: 1 },  // TM06 Ice Fang (limited stock)
  ]
};

// Registry of all shops by ID
export const SHOPS: Record<string, ShopInventory> = {
  'coral-bay': CORAL_BAY_SHOP,
  'kelp-harbor': KELP_HARBOR_SHOP,
};

export function getShop(id: string): ShopInventory | undefined {
  return SHOPS[id];
}

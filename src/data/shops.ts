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

// La Jolla Surf Shop - Starter shop (San Diego Region 1)
export const LA_JOLLA_SHOP: ShopInventory = {
  id: 'la-jolla-shop',
  name: 'LA JOLLA SURF',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 10 },  // Potion
    { itemId: 20 },  // Antidote
  ]
};

// San Diego Bay Mart - Town shop (San Diego Region 1)
export const SAN_DIEGO_SHOP: ShopInventory = {
  id: 'san-diego-shop',
  name: 'BAY MART',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 2 },   // Great Ball
    { itemId: 10 },  // Potion
    { itemId: 11 },  // Super Potion
    { itemId: 20 },  // Antidote
    { itemId: 30 },  // Repel
  ]
};

// Waikiki Surf Shop - Hawaii shop (Region 2)
export const WAIKIKI_SHOP: ShopInventory = {
  id: 'waikiki-shop',
  name: 'WAIKIKI SURF',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 2 },   // Great Ball
    { itemId: 10 },  // Potion
    { itemId: 11 },  // Super Potion
    { itemId: 20 },  // Antidote
    { itemId: 21 },  // Paralyze Heal
    { itemId: 30 },  // Repel
  ]
};

// Cabo Harbor Shop - Baja shop (Region 3)
export const CABO_SHOP: ShopInventory = {
  id: 'cabo-shop',
  name: 'CABO SUPPLIES',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 2 },   // Great Ball
    { itemId: 10 },  // Potion
    { itemId: 11 },  // Super Potion
    { itemId: 20 },  // Antidote
    { itemId: 21 },  // Paralyze Heal
    { itemId: 30 },  // Repel
  ]
};

// Cabo Town Shop - Town shop (Region 3)
export const CABO_TOWN_SHOP: ShopInventory = {
  id: 'cabo-town-shop',
  name: 'CABO MART',
  items: [
    { itemId: 1 },   // Shark Ball
    { itemId: 2 },   // Great Ball
    { itemId: 3 },   // Ultra Ball
    { itemId: 10 },  // Potion
    { itemId: 11 },  // Super Potion
    { itemId: 12 },  // Hyper Potion
    { itemId: 20 },  // Antidote
    { itemId: 21 },  // Paralyze Heal
    { itemId: 30 },  // Repel
    { itemId: 31 },  // Super Repel
  ]
};

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
  'la-jolla-shop': LA_JOLLA_SHOP,
  'san-diego-shop': SAN_DIEGO_SHOP,
  'waikiki-shop': WAIKIKI_SHOP,
  'cabo-shop': CABO_SHOP,
  'cabo-town-shop': CABO_TOWN_SHOP,
  'coral-bay': CORAL_BAY_SHOP,
  'kelp-harbor': KELP_HARBOR_SHOP,
};

export function getShop(id: string): ShopInventory | undefined {
  return SHOPS[id];
}

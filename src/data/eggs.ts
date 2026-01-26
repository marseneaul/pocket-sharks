// Egg item definitions
// Eggs are collectible items that hatch into creatures after walking

export interface EggItem {
  id: number;
  name: string;
  hatchSpeciesId: number;  // Species that hatches from this egg
  hatchSteps: number;      // Steps required to hatch
  hatchLevel: number;      // Level of hatched creature
  description: string;
}

export const EGGS: Record<number, EggItem> = {
  // ID 1: Horn Shark Egg (hatches into Horn Shark - ID 51)
  1: {
    id: 1,
    name: 'Horn Shark Egg',
    hatchSpeciesId: 51,
    hatchSteps: 2560,
    hatchLevel: 5,
    description: 'A spiral-shaped egg case called a "mermaid\'s purse". It wedges into rocky crevices to protect the developing shark inside.'
  },

  // ID 2: Swell Shark Egg (hatches into Swell Shark - ID 53)
  2: {
    id: 2,
    name: 'Swell Shark Egg',
    hatchSpeciesId: 53,
    hatchSteps: 2560,
    hatchLevel: 5,
    description: 'A translucent amber egg case. When held up to light, the developing baby shark is visible inside.'
  },

  // ID 3: Skate Egg (hatches into Little Skate - ID 91)
  3: {
    id: 3,
    name: 'Skate Egg',
    hatchSpeciesId: 91,
    hatchSteps: 3072,
    hatchLevel: 5,
    description: 'A rectangular black egg case with horn-like tendrils. Often called a "devil\'s purse" by fishermen.'
  },

  // ID 4: Chimaera Egg (hatches into Ratfish - ID 116)
  4: {
    id: 4,
    name: 'Chimaera Egg',
    hatchSpeciesId: 116,
    hatchSteps: 4096,
    hatchLevel: 8,
    description: 'An elongated, paddle-shaped egg case. The ghostly creature developing inside is barely visible through the leathery shell.'
  }
};

export function getEgg(id: number): EggItem | undefined {
  return EGGS[id];
}

export function getEggByName(name: string): EggItem | undefined {
  return Object.values(EGGS).find(egg => egg.name === name);
}

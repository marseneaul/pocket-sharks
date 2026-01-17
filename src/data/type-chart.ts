import type { ElementType, Effectiveness } from '../types/index.ts';

// Ocean-themed type effectiveness chart
// Key: attacking type, Value: map of defending type to effectiveness
// 2 = super effective, 0.5 = not very effective, 0 = no effect
const typeChart: Record<ElementType, Partial<Record<ElementType, Effectiveness>>> = {
  shark: {
    // No super effective matchups
    fighting: 0.5  // Shark attacks resisted by fighters
  },
  leviathan: {
    leviathan: 2,  // Super effective vs self
    ice: 0.5       // Resisted by ice
  },
  breaching: {
    fighting: 2,   // Aerial attacks beat fighters
    algae: 2,      // Flying beats grass-type
    electric: 0.5, // Resisted by electric
    ice: 0.5       // Resisted by ice
  },
  fighting: {
    shark: 2,      // Fighters dominate regular sharks
    steel: 2,      // Breaks through armor
    ice: 2,        // Shatters ice
    breaching: 0.5,// Can't hit aerial targets well
    psychic: 0.5   // Outsmarted by psychics
  },
  psychic: {
    fighting: 2,   // Outsmarts fighters
    poison: 2,     // Mind over venom
    ghost: 0.5,    // Ghosts resist mental attacks
    deepsea: 0     // Darkness blocks psychic
  },
  freshwater: {
    fire: 2,       // Water extinguishes fire
    fossil: 2,     // Erodes ancient stone
    electric: 0.5, // Conducts electricity (bad)
    algae: 0.5     // Algae absorbs water
  },
  fire: {
    algae: 2,      // Burns vegetation
    steel: 2,      // Melts metal
    ice: 2,        // Melts ice
    freshwater: 0.5,// Extinguished by water
    fossil: 0.5    // Ancient stone resists
  },
  fairy: {
    fighting: 2,   // Grace beats brute force
    leviathan: 2,  // Fairy tale dragons slain
    deepsea: 2,    // Light banishes darkness
    poison: 0.5,   // Toxins affect fairies
    steel: 0.5     // Cold iron resists fairy
  },
  algae: {
    freshwater: 2, // Absorbs water
    fossil: 2,     // Overgrows stone
    ground: 2,     // Roots penetrate earth
    fire: 0.5,     // Burned by fire
    ice: 0.5,      // Frozen
    poison: 0.5    // Poisoned
  },
  steel: {
    fairy: 2,      // Cold iron vs fairy
    ice: 2,        // Shatters ice
    fossil: 2,     // Stronger than stone
    fire: 0.5,     // Melted
    fighting: 0.5, // Dented by force
    ground: 0.5    // Corroded by earth
  },
  ghost: {
    ghost: 2,      // Ghosts hurt ghosts
    psychic: 2,    // Haunts the mind
    shark: 0,      // Can't touch normal
    deepsea: 0.5   // Darkness resists
  },
  deepsea: {
    ghost: 2,      // Darkness consumes spirits
    psychic: 2,    // Darkness blocks minds
    fighting: 0.5, // Fighters brave darkness
    fairy: 0.5     // Light resists dark
  },
  poison: {
    fairy: 2,      // Toxins affect fairies
    algae: 2,      // Poisons plants
    ground: 0.5,   // Earth absorbs poison
    psychic: 0.5,  // Mind resists venom
    steel: 0,      // Can't poison metal
    poison: 0.5    // Poison resists poison
  },
  ray: {
    algae: 2,      // Rays feed on kelp creatures
    psychic: 2,    // Rays confound minds
    deepsea: 2,    // Rays illuminate darkness
    breaching: 0.5,// Aerial predators
    fire: 0.5,     // Heat hurts rays
    fossil: 0.5    // Ancient stone resists
  },
  ice: {
    breaching: 2,  // Freezes aerial targets
    algae: 2,      // Freezes vegetation
    leviathan: 2,  // Cold slows giants
    fire: 0.5,     // Melted
    fighting: 0.5, // Shattered by force
    fossil: 0.5,   // Ancient cold-resistant
    freshwater: 0.5,// Water resists ice
    steel: 0.5     // Metal conducts cold away
  },
  electric: {
    freshwater: 2, // Conducts through water
    breaching: 2,  // Zaps aerial targets
    ground: 0,     // Grounded
    electric: 0.5  // Resists self
  },
  fossil: {
    fire: 2,       // Smothers fire
    ice: 2,        // Crushes ice
    breaching: 2,  // Grounds flyers
    freshwater: 0.5,// Eroded by water
    fighting: 0.5, // Broken by force
    algae: 0.5,    // Overgrown
    steel: 0.5     // Steel is stronger
  },
  ground: {
    electric: 2,   // Grounds electricity
    poison: 2,     // Absorbs toxins
    fire: 2,       // Smothers fire
    steel: 2,      // Corrodes metal
    freshwater: 0.5,// Washed away
    ice: 0.5,      // Frozen
    algae: 0.5,    // Roots resist
    breaching: 0   // Can't hit aerial
  }
};

export function getTypeEffectiveness(
  attackType: ElementType,
  defenseTypes: ElementType[]
): Effectiveness {
  let multiplier: number = 1;

  for (const defenseType of defenseTypes) {
    const chart = typeChart[attackType];
    const effectiveness = chart[defenseType];
    if (effectiveness !== undefined) {
      multiplier *= effectiveness;
    }
  }

  // Clamp to valid effectiveness values
  if (multiplier === 0) return 0;
  if (multiplier <= 0.25) return 0.5; // Double resistance treated as 0.5
  if (multiplier === 0.5) return 0.5;
  if (multiplier === 1) return 1;
  if (multiplier >= 2) return 2;
  return 1;
}

export function getEffectivenessText(effectiveness: Effectiveness): string | null {
  switch (effectiveness) {
    case 0:
      return "It doesn't affect";
    case 0.5:
      return "It's not very effective...";
    case 2:
      return "It's super effective!";
    default:
      return null;
  }
}

import type { CreatureSpecies } from '../types/index.ts';

export const CREATURES: Record<number, CreatureSpecies> = {
  // === STARTER LINE 1: Fire (Blacktip Reef Shark evolution line) ===
  1: {
    id: 1,
    name: 'Blacktip Reef Shark',
    types: ['shark'],
    baseStats: {
      hp: 44,
      attack: 52,
      defense: 40,
      spAttack: 50,
      spDefense: 44,
      speed: 56
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 7, moveId: 60 },  // Ember
      { level: 13, moveId: 2 },  // Bite
      { level: 19, moveId: 61 }  // Fire Fang
    ],
    evolvesTo: { speciesId: 2, level: 16 },
    description: 'A curious reef shark with distinctive black-tipped fins. Its metabolism runs hot, warming the water around it.'
  },
  2: {
    id: 2,
    name: 'Blacktip Shark',
    types: ['shark', 'fire'],
    baseStats: {
      hp: 59,
      attack: 70,
      defense: 55,
      spAttack: 65,
      spDefense: 55,
      speed: 71
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 3 },
      { level: 1, moveId: 60 },
      { level: 1, moveId: 2 },
      { level: 22, moveId: 61 }, // Fire Fang
      { level: 28, moveId: 62 }, // Flame Burst
      { level: 34, moveId: 11 }  // Aqua Jet
    ],
    evolvesTo: { speciesId: 3, level: 36 },
    description: 'Its black-tipped fins radiate heat. Known for its speed and agility when chasing prey through warm shallows.'
  },
  3: {
    id: 3,
    name: 'Dusky Shark',
    types: ['shark', 'fire'],
    baseStats: {
      hp: 78,
      attack: 88,
      defense: 73,
      spAttack: 85,
      spDefense: 73,
      speed: 92
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 60 },
      { level: 1, moveId: 2 },
      { level: 1, moveId: 61 },
      { level: 40, moveId: 63 }, // Flamethrower
      { level: 48, moveId: 31 }  // Crunch
    ],
    description: 'The dusky shark at its peak. Water sizzles in its wake as it pursues prey at blazing speed.'
  },

  // === STARTER LINE 2: Fighting (Whitetip Reef Shark evolution line) ===
  4: {
    id: 4,
    name: 'Whitetip Reef Shark',
    types: ['shark'],
    baseStats: {
      hp: 46,
      attack: 55,
      defense: 45,
      spAttack: 40,
      spDefense: 42,
      speed: 52
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 7, moveId: 20 },  // Ram
      { level: 13, moveId: 2 },  // Bite
      { level: 19, moveId: 21 }  // Thrash
    ],
    evolvesTo: { speciesId: 5, level: 16 },
    description: 'A bold reef shark with white-tipped fins. Fearlessly approaches anything new, even creatures much larger than itself.'
  },
  5: {
    id: 5,
    name: 'Oceanic Whitetip',
    types: ['shark', 'fighting'],
    baseStats: {
      hp: 61,
      attack: 75,
      defense: 60,
      spAttack: 50,
      spDefense: 55,
      speed: 68
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 3 },
      { level: 1, moveId: 20 },
      { level: 1, moveId: 2 },
      { level: 22, moveId: 21 }, // Thrash
      { level: 28, moveId: 22 }, // Brick Break
      { level: 34, moveId: 11 }  // Aqua Jet
    ],
    evolvesTo: { speciesId: 6, level: 36 },
    description: 'An aggressive reef hunter with white-tipped fins. Never backs down from a fight.'
  },
  6: {
    id: 6,
    name: 'Bull Shark',
    types: ['shark', 'fighting'],
    baseStats: {
      hp: 80,
      attack: 98,
      defense: 78,
      spAttack: 60,
      spDefense: 70,
      speed: 82
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 20 },
      { level: 1, moveId: 21 },
      { level: 1, moveId: 22 },
      { level: 40, moveId: 23 }, // Close Combat
      { level: 48, moveId: 31 }  // Crunch
    ],
    description: 'The most dangerous shark in open ocean. Its persistence and aggression are legendary.'
  },

  // === STARTER LINE 3: Steel (Grey Reef Shark evolution line) ===
  7: {
    id: 7,
    name: 'Grey Reef Shark',
    types: ['shark'],
    baseStats: {
      hp: 48,
      attack: 48,
      defense: 55,
      spAttack: 45,
      spDefense: 50,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 7, moveId: 70 },  // Metal Claw
      { level: 13, moveId: 2 },  // Bite
      { level: 19, moveId: 71 }  // Iron Head
    ],
    evolvesTo: { speciesId: 8, level: 16 },
    description: 'A tough young shark with unusually hard skin. Its snout can crack open shellfish with ease.'
  },
  8: {
    id: 8,
    name: 'Galapagos Shark',
    types: ['shark', 'steel'],
    baseStats: {
      hp: 65,
      attack: 65,
      defense: 78,
      spAttack: 55,
      spDefense: 70,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 3 },
      { level: 1, moveId: 70 },
      { level: 1, moveId: 2 },
      { level: 22, moveId: 71 }, // Iron Head
      { level: 28, moveId: 72 }, // Steel Wing
      { level: 34, moveId: 11 }  // Aqua Jet
    ],
    evolvesTo: { speciesId: 9, level: 36 },
    description: 'Its scales have hardened into armor plates. Patrols its reef territory with methodical precision.'
  },
  9: {
    id: 9,
    name: 'Silvertip Shark',
    types: ['shark', 'steel'],
    baseStats: {
      hp: 85,
      attack: 80,
      defense: 100,
      spAttack: 65,
      spDefense: 90,
      speed: 68
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 70 },
      { level: 1, moveId: 71 },
      { level: 1, moveId: 72 },
      { level: 40, moveId: 73 }, // Iron Tail
      { level: 48, moveId: 31 }  // Crunch
    ],
    description: 'Chrome-scaled apex predator with distinctive white fin tips. Its armor deflects most attacks.'
  },

  // === WILD CREATURES ===
  10: {
    id: 10,
    name: 'Bonnethead',
    types: ['psychic'],
    baseStats: {
      hp: 50,
      attack: 55,
      defense: 50,
      spAttack: 55,
      spDefense: 50,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 40 },
      { level: 10, moveId: 3 },
      { level: 15, moveId: 41 }
    ],
    evolvesTo: { speciesId: 11, level: 22 },
    description: 'A small hammerhead species with a shovel-shaped head. Uses electroreception to find buried prey.'
  },
  11: {
    id: 11,
    name: 'Scalloped Hammerhead',
    types: ['psychic'],
    baseStats: {
      hp: 75,
      attack: 80,
      defense: 70,
      spAttack: 80,
      spDefense: 70,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 40 },
      { level: 1, moveId: 41 },
      { level: 25, moveId: 42 },  // Psychic
      { level: 30, moveId: 2 },
      { level: 35, moveId: 31 }
    ],
    description: 'Its wide cephalofoil grants powerful electromagnetic senses. Can detect heartbeats buried in sand.'
  },

  // === ROUTE COMMONS ===
  12: {
    id: 12,
    name: 'Lemon Shark',
    types: ['ground'],
    baseStats: {
      hp: 45,
      attack: 50,
      defense: 55,
      spAttack: 35,
      spDefense: 45,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 80 },  // Sand Attack
      { level: 8, moveId: 81 },  // Mud Shot
      { level: 15, moveId: 2 }
    ],
    description: 'A yellowish shark that prefers sandy shallows. Often seen resting motionless on the seafloor.'
  },
  13: {
    id: 13,
    name: 'Nurse Shark',
    types: ['shark'],
    baseStats: {
      hp: 40,
      attack: 45,
      defense: 35,
      spAttack: 40,
      spDefense: 35,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 3 },
      { level: 6, moveId: 2 },
      { level: 12, moveId: 11 }
    ],
    description: 'A docile bottom-dweller found in warm coastal waters. Commonly seen resting in groups.'
  },
  14: {
    id: 14,
    name: 'Atlantic Stingray',
    types: ['ray'],
    baseStats: {
      hp: 50,
      attack: 40,
      defense: 60,
      spAttack: 45,
      spDefense: 50,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 3 },
      { level: 7, moveId: 90 },  // Wing Attack
      { level: 14, moveId: 10 }
    ],
    evolvesTo: { speciesId: 28, level: 25 },
    description: 'A small ray that glides along sandy bottoms. Its tail barb is still developing.'
  },
  15: {
    id: 15,
    name: 'Lanternshark',
    types: ['electric'],
    baseStats: {
      hp: 35,
      attack: 40,
      defense: 40,
      spAttack: 60,
      spDefense: 45,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 51 },  // Thunder Shock
      { level: 9, moveId: 50 },  // Spark
      { level: 16, moveId: 2 }
    ],
    evolvesTo: { speciesId: 32, level: 20 },
    description: 'A tiny deep-sea shark with bioluminescent photophores. Glows to camouflage against dim light above.'
  },
  16: {
    id: 16,
    name: 'Wobbegong',
    types: ['algae'],
    baseStats: {
      hp: 55,
      attack: 45,
      defense: 55,
      spAttack: 50,
      spDefense: 55,
      speed: 30
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 100 }, // Vine Whip
      { level: 8, moveId: 101 }, // Absorb
      { level: 15, moveId: 2 }
    ],
    description: 'A flat carpet shark covered in algae-like tassels. Nearly invisible among kelp and coral.'
  },
  17: {
    id: 17,
    name: 'Greenland Shark',
    types: ['ice'],
    baseStats: {
      hp: 50,
      attack: 55,
      defense: 50,
      spAttack: 45,
      spDefense: 50,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 110 }, // Powder Snow
      { level: 10, moveId: 111 }, // Ice Fang
      { level: 17, moveId: 2 }
    ],
    description: 'An ancient Arctic shark that lives for centuries. Moves slowly but can ambush sleeping seals.'
  },

  // === GYM 1 AREA (Coral Bay) ===
  18: {
    id: 18,
    name: 'Coral Catshark',
    types: ['fairy'],
    baseStats: {
      hp: 45,
      attack: 40,
      defense: 55,
      spAttack: 60,
      spDefense: 65,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 120 }, // Fairy Wind
      { level: 8, moveId: 3 },
      { level: 15, moveId: 121 } // Dazzle
    ],
    description: 'A small, colorful shark with intricate patterns. Hides in reef crevices during the day.'
  },
  19: {
    id: 19,
    name: 'Spinner Shark',
    types: ['breaching'],
    baseStats: {
      hp: 50,
      attack: 65,
      defense: 45,
      spAttack: 45,
      spDefense: 45,
      speed: 75
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },  // Wing Attack
      { level: 10, moveId: 20 }, // Ram
      { level: 18, moveId: 91 }  // Aerial Ace
    ],
    evolvesTo: { speciesId: 20, level: 28 },
    description: 'Famous for spinning through the air while hunting. Leaps and twists to catch schooling fish.'
  },
  20: {
    id: 20,
    name: 'Thresher Shark',
    types: ['breaching', 'fighting'],
    baseStats: {
      hp: 70,
      attack: 95,
      defense: 60,
      spAttack: 55,
      spDefense: 55,
      speed: 90
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 20 },
      { level: 1, moveId: 91 },
      { level: 32, moveId: 21 }, // Thrash
      { level: 40, moveId: 22 }  // Brick Break
    ],
    description: 'Uses its scythe-like tail to stun prey. The tail can be as long as its entire body.'
  },
  21: {
    id: 21,
    name: 'Bull Shark',
    types: ['fighting', 'freshwater'],
    baseStats: {
      hp: 80,
      attack: 90,
      defense: 70,
      spAttack: 50,
      spDefense: 60,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 20 },
      { level: 10, moveId: 10 },
      { level: 18, moveId: 21 },
      { level: 26, moveId: 22 },
      { level: 35, moveId: 31 }
    ],
    description: 'Extremely aggressive and territorial. One of few sharks that can survive in freshwater rivers.'
  },

  // === SPECIAL/RARE ===
  22: {
    id: 22,
    name: 'Spotted Ratfish',
    types: ['ghost'],
    baseStats: {
      hp: 45,
      attack: 40,
      defense: 50,
      spAttack: 65,
      spDefense: 60,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 130 }, // Lick
      { level: 10, moveId: 131 }, // Shadow Sneak
      { level: 18, moveId: 40 }
    ],
    evolvesTo: { speciesId: 23, level: 35 },
    description: 'A chimaera with ghostly eyes that reflect light eerily. Drifts silently through deep waters.'
  },
  23: {
    id: 23,
    name: 'Ghost Shark',
    types: ['ghost', 'deepsea'],
    baseStats: {
      hp: 70,
      attack: 65,
      defense: 70,
      spAttack: 95,
      spDefense: 90,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 130 },
      { level: 1, moveId: 131 },
      { level: 1, moveId: 40 },
      { level: 38, moveId: 132 }, // Shadow Ball
      { level: 45, moveId: 31 }
    ],
    description: 'An ancient chimaera from the abyss. Its pale form seems to phase through the darkness.'
  },
  24: {
    id: 24,
    name: 'Goblin Shark',
    types: ['deepsea'],
    baseStats: {
      hp: 65,
      attack: 85,
      defense: 55,
      spAttack: 70,
      spDefense: 65,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 2 },
      { level: 12, moveId: 30 },
      { level: 20, moveId: 31 },
      { level: 28, moveId: 140 } // Jaw Lock
    ],
    description: 'A living fossil with an extendable jaw that shoots forward to snatch prey from the darkness.'
  },
  25: {
    id: 25,
    name: 'Sawshark',
    types: ['steel'],
    baseStats: {
      hp: 70,
      attack: 90,
      defense: 85,
      spAttack: 45,
      spDefense: 60,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 70 },
      { level: 14, moveId: 71 },
      { level: 22, moveId: 72 },
      { level: 30, moveId: 73 }
    ],
    evolvesTo: { speciesId: 41, level: 35 },
    description: 'Its blade-like snout is lined with teeth. Slashes sideways through schools of fish.'
  },
  26: {
    id: 26,
    name: 'Torpedo Ray',
    types: ['electric', 'ray'],
    baseStats: {
      hp: 55,
      attack: 50,
      defense: 60,
      spAttack: 85,
      spDefense: 70,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 51 },
      { level: 10, moveId: 50 },
      { level: 18, moveId: 90 },
      { level: 26, moveId: 52 }  // Thunderbolt
    ],
    evolvesTo: { speciesId: 34, level: 30 },
    description: 'Can generate powerful electric shocks to stun prey. Buries itself in sand to ambush victims.'
  },
  27: {
    id: 27,
    name: 'Manta Ray',
    types: ['breaching', 'ray'],
    baseStats: {
      hp: 85,
      attack: 60,
      defense: 70,
      spAttack: 80,
      spDefense: 80,
      speed: 75
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },
      { level: 12, moveId: 10 },
      { level: 20, moveId: 91 },
      { level: 28, moveId: 42 }
    ],
    description: 'A graceful giant that soars through the water. Despite its size, it feeds only on plankton.'
  },
  28: {
    id: 28,
    name: 'Southern Stingray',
    types: ['ray', 'poison'],
    baseStats: {
      hp: 70,
      attack: 65,
      defense: 80,
      spAttack: 60,
      spDefense: 70,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 10 },
      { level: 28, moveId: 150 }, // Poison Sting
      { level: 35, moveId: 151 }  // Toxic
    ],
    description: 'A large ray with a venomous tail barb. Glides elegantly over sandy seafloors.'
  },

  // === FOSSIL CREATURES ===
  29: {
    id: 29,
    name: 'Helicoprion',
    types: ['fossil'],
    baseStats: {
      hp: 75,
      attack: 95,
      defense: 80,
      spAttack: 55,
      spDefense: 65,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 2 },
      { level: 15, moveId: 160 }, // Rock Throw
      { level: 25, moveId: 161 }, // Ancient Power
      { level: 35, moveId: 31 }
    ],
    description: 'An ancient shark-like fish with a bizarre spiral tooth whorl. Revived from 270-million-year-old fossils.'
  },
  30: {
    id: 30,
    name: 'Cladoselache',
    types: ['fossil'],
    baseStats: {
      hp: 60,
      attack: 70,
      defense: 70,
      spAttack: 50,
      spDefense: 60,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 160 },
      { level: 12, moveId: 2 },
      { level: 20, moveId: 161 }
    ],
    description: 'One of the first true sharks from 370 million years ago. Adapting to the modern ocean.'
  },
  31: {
    id: 31,
    name: 'Megalodon',
    types: ['fossil', 'leviathan'],
    baseStats: {
      hp: 110,
      attack: 120,
      defense: 95,
      spAttack: 80,
      spDefense: 85,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 2 },
      { level: 1, moveId: 160 },
      { level: 1, moveId: 161 },
      { level: 50, moveId: 170 }, // Dragon Rage equivalent
      { level: 60, moveId: 31 }
    ],
    description: 'The legendary giant shark revived. At 60 feet long, it dwarfs all modern sharks.'
  },

  // === PHASE 4 NEW CREATURES ===

  // Electric Evolutions
  32: {
    id: 32,
    name: 'Velvet Lanternshark',
    types: ['electric'],
    baseStats: {
      hp: 55,
      attack: 55,
      defense: 55,
      spAttack: 85,
      spDefense: 65,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 51 },
      { level: 1, moveId: 50 },
      { level: 1, moveId: 2 },
      { level: 24, moveId: 52 },  // Thunderbolt
      { level: 32, moveId: 31 }
    ],
    evolvesTo: { speciesId: 33, level: 36 },
    description: 'Its velvet-black skin is dotted with brilliant photophores. Hunts in the twilight zone.'
  },
  33: {
    id: 33,
    name: 'Giant Lanternshark',
    types: ['electric', 'leviathan'],
    baseStats: {
      hp: 80,
      attack: 70,
      defense: 70,
      spAttack: 110,
      spDefense: 85,
      speed: 80
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 51 },
      { level: 1, moveId: 50 },
      { level: 1, moveId: 52 },
      { level: 40, moveId: 170 }, // Leviathan Rage
      { level: 48, moveId: 31 }
    ],
    description: 'A massive deep-sea predator that lights up the abyss. Its glow can be seen from miles away.'
  },
  34: {
    id: 34,
    name: 'Marbled Electric Ray',
    types: ['electric', 'ray'],
    baseStats: {
      hp: 75,
      attack: 65,
      defense: 80,
      spAttack: 105,
      spDefense: 85,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 51 },
      { level: 1, moveId: 50 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 52 },
      { level: 35, moveId: 42 },  // Psychic
      { level: 42, moveId: 91 }
    ],
    description: 'Its marbled pattern conceals deadly electric organs. The largest of the electric rays.'
  },

  // Route 3-4 Commons
  35: {
    id: 35,
    name: 'Tasselled Wobbegong',
    types: ['algae', 'freshwater'],
    baseStats: {
      hp: 75,
      attack: 70,
      defense: 75,
      spAttack: 60,
      spDefense: 70,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 100 },
      { level: 10, moveId: 101 },
      { level: 18, moveId: 2 },
      { level: 26, moveId: 10 },
      { level: 34, moveId: 31 }
    ],
    description: 'Elaborate tassels make it invisible among seaweed. Ambushes prey that swim too close.'
  },
  36: {
    id: 36,
    name: 'Bluntnose Sixgill',
    types: ['deepsea'],
    baseStats: {
      hp: 85,
      attack: 80,
      defense: 70,
      spAttack: 55,
      spDefense: 65,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 2 },
      { level: 12, moveId: 30 },
      { level: 20, moveId: 31 },
      { level: 28, moveId: 140 },
      { level: 36, moveId: 161 }
    ],
    description: 'An ancient shark with six gill slits instead of five. Drifts up from the deep at night.'
  },
  37: {
    id: 37,
    name: 'Sandbar Shark',
    types: ['fighting', 'freshwater'],
    baseStats: {
      hp: 70,
      attack: 75,
      defense: 65,
      spAttack: 50,
      spDefense: 60,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 20 },
      { level: 10, moveId: 10 },
      { level: 18, moveId: 21 },
      { level: 26, moveId: 22 },
      { level: 34, moveId: 12 }
    ],
    description: 'A powerful coastal shark with a tall dorsal fin. Patrols sandbars hunting for prey.'
  },
  38: {
    id: 38,
    name: 'Pyjama Shark',
    types: ['fairy', 'algae'],
    baseStats: {
      hp: 65,
      attack: 55,
      defense: 70,
      spAttack: 80,
      spDefense: 85,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 120 },
      { level: 1, moveId: 3 },
      { level: 1, moveId: 121 },
      { level: 28, moveId: 100 },
      { level: 35, moveId: 101 }
    ],
    description: 'Named for its striped pajama-like pattern. Curls up in kelp beds during the day.'
  },

  // Finner HQ Specials
  39: {
    id: 39,
    name: 'Kitefin Shark',
    types: ['steel', 'ghost'],
    baseStats: {
      hp: 70,
      attack: 75,
      defense: 80,
      spAttack: 85,
      spDefense: 80,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 70 },
      { level: 1, moveId: 130 },
      { level: 15, moveId: 131 },
      { level: 25, moveId: 71 },
      { level: 35, moveId: 132 }
    ],
    description: 'A bioluminescent deep-sea predator. Its entire body glows an eerie blue-green.'
  },
  40: {
    id: 40,
    name: 'Gulper Shark',
    types: ['deepsea', 'ghost'],
    baseStats: {
      hp: 85,
      attack: 80,
      defense: 75,
      spAttack: 100,
      spDefense: 95,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 130 },
      { level: 1, moveId: 131 },
      { level: 1, moveId: 40 },
      { level: 1, moveId: 132 },
      { level: 42, moveId: 140 },
      { level: 50, moveId: 31 }
    ],
    description: 'Its massive jaws can swallow prey larger than itself. Haunts the deepest trenches.'
  },
  41: {
    id: 41,
    name: 'Largetooth Sawfish',
    types: ['steel', 'fighting'],
    baseStats: {
      hp: 90,
      attack: 115,
      defense: 100,
      spAttack: 50,
      spDefense: 70,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 70 },
      { level: 1, moveId: 71 },
      { level: 1, moveId: 72 },
      { level: 1, moveId: 73 },
      { level: 40, moveId: 22 },
      { level: 48, moveId: 23 }
    ],
    description: 'A massive sawfish with a blade-like rostrum. Its saw can cut through steel chains.'
  },

  // Additional Fossils
  42: {
    id: 42,
    name: 'Ptychodus',
    types: ['fossil', 'ray'],
    baseStats: {
      hp: 80,
      attack: 65,
      defense: 95,
      spAttack: 70,
      spDefense: 90,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 160 },
      { level: 12, moveId: 90 },
      { level: 20, moveId: 161 },
      { level: 28, moveId: 71 },
      { level: 36, moveId: 31 }
    ],
    description: 'A prehistoric shell-crusher with flat teeth. Revived from Cretaceous ocean fossils.'
  },
  43: {
    id: 43,
    name: 'Edestus',
    types: ['fossil', 'steel'],
    baseStats: {
      hp: 75,
      attack: 100,
      defense: 85,
      spAttack: 60,
      spDefense: 70,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 160 },
      { level: 1, moveId: 70 },
      { level: 15, moveId: 2 },
      { level: 25, moveId: 161 },
      { level: 35, moveId: 73 },
      { level: 45, moveId: 31 }
    ],
    description: 'The scissor-toothed shark from 300 million years ago. Its teeth form a deadly vertical blade.'
  },

  // Legendary Teasers
  44: {
    id: 44,
    name: 'Frilled Shark',
    types: ['deepsea', 'leviathan'],
    baseStats: {
      hp: 90,
      attack: 95,
      defense: 80,
      spAttack: 90,
      spDefense: 85,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 2 },
      { level: 1, moveId: 30 },
      { level: 20, moveId: 31 },
      { level: 30, moveId: 140 },
      { level: 40, moveId: 170 },
      { level: 50, moveId: 161 }
    ],
    description: 'A living fossil from the deep trenches. Its eel-like body and primitive features are unchanged for millennia.'
  },
  45: {
    id: 45,
    name: 'Whale Shark',
    types: ['fairy', 'algae'],
    baseStats: {
      hp: 120,
      attack: 60,
      defense: 90,
      spAttack: 85,
      spDefense: 95,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 120 },
      { level: 1, moveId: 100 },
      { level: 20, moveId: 121 },
      { level: 30, moveId: 101 },
      { level: 40, moveId: 13 },
      { level: 50, moveId: 42 }
    ],
    description: 'The gentle giant of the ocean. Despite its massive size, it feeds only on tiny plankton.'
  },
  46: {
    id: 46,
    name: 'Great White Shark',
    types: ['leviathan'],
    baseStats: {
      hp: 95,
      attack: 120,
      defense: 85,
      spAttack: 80,
      spDefense: 80,
      speed: 90
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 2 },
      { level: 15, moveId: 20 },
      { level: 25, moveId: 31 },
      { level: 35, moveId: 140 },
      { level: 45, moveId: 170 },
      { level: 55, moveId: 23 }
    ],
    description: 'The apex predator of the ocean. Its power and ferocity are legendary among all sharks.'
  },

  // === SAN DIEGO REGION CREATURES (Region 1) ===

  // Round Stingray - Common tide pool encounter
  47: {
    id: 47,
    name: 'Round Stingray',
    types: ['ray', 'poison'],
    baseStats: {
      hp: 45,
      attack: 35,
      defense: 50,
      spAttack: 40,
      spDefense: 45,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 150 }, // Poison Sting
      { level: 6, moveId: 90 },  // Wing Attack
      { level: 12, moveId: 80 }, // Sand Attack
      { level: 18, moveId: 151 } // Toxic
    ],
    description: 'A small, disc-shaped stingray common in San Diego tide pools. Step carefully - its venomous barb causes painful stings!'
  },

  // Smoothhound → Leopard Shark evolution line
  48: {
    id: 48,
    name: 'Smoothhound',
    types: ['shark'],
    baseStats: {
      hp: 50,
      attack: 45,
      defense: 45,
      spAttack: 40,
      spDefense: 45,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 8, moveId: 2 },   // Bite
      { level: 14, moveId: 11 }, // Aqua Jet
      { level: 20, moveId: 80 }  // Sand Attack
    ],
    evolvesTo: { speciesId: 49, level: 22 },
    description: 'A slender shark that hunts crabs and small fish in sandy shallows. Named for its flat teeth used to crush shells.'
  },
  49: {
    id: 49,
    name: 'Leopard Shark',
    types: ['shark', 'algae'],
    baseStats: {
      hp: 70,
      attack: 65,
      defense: 60,
      spAttack: 55,
      spDefense: 60,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 3 },
      { level: 1, moveId: 2 },
      { level: 1, moveId: 11 },
      { level: 25, moveId: 100 }, // Vine Whip (kelp camouflage)
      { level: 30, moveId: 31 },  // Crunch
      { level: 36, moveId: 101 }  // Absorb
    ],
    description: 'The iconic San Diego shark, named for its spotted pattern. Aggregates in large groups in kelp forests and shallow bays.'
  },

  // Horn Shark (hatches from Horn Shark Egg item)
  51: {
    id: 51,
    name: 'Horn Shark',
    types: ['algae'],
    baseStats: {
      hp: 65,
      attack: 70,
      defense: 80,
      spAttack: 45,
      spDefense: 65,
      speed: 30
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 100 }, // Vine Whip
      { level: 12, moveId: 2 },  // Bite
      { level: 18, moveId: 71 }, // Iron Head (horn attack)
      { level: 24, moveId: 31 }, // Crunch
      { level: 30, moveId: 101 } // Absorb
    ],
    description: 'A sluggish nocturnal shark with venomous dorsal spines. Uses its horn-like ridges to wedge into crevices and rest.'
  },

  // Swell Shark (hatches from Swell Shark Egg item)
  53: {
    id: 53,
    name: 'Swell Shark',
    types: ['algae', 'fairy'],
    baseStats: {
      hp: 70,
      attack: 55,
      defense: 70,
      spAttack: 65,
      spDefense: 70,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 120 }, // Fairy Wind
      { level: 14, moveId: 100 }, // Vine Whip
      { level: 20, moveId: 2 },   // Bite
      { level: 26, moveId: 121 }, // Dazzle
      { level: 32, moveId: 101 }  // Absorb
    ],
    description: 'Can inflate itself with water to wedge into crevices. Its skin glows fluorescent green under UV light!'
  },

  // Guitarfish → Giant Guitarfish → Bowmouth Guitarfish
  54: {
    id: 54,
    name: 'Guitarfish',
    types: ['ray', 'ground'],
    baseStats: {
      hp: 55,
      attack: 50,
      defense: 55,
      spAttack: 35,
      spDefense: 50,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 80 },  // Sand Attack
      { level: 8, moveId: 90 },  // Wing Attack
      { level: 15, moveId: 81 }, // Mud Shot
      { level: 22, moveId: 2 }   // Bite
    ],
    evolvesTo: { speciesId: 55, level: 25 },
    description: 'A ray-shark hybrid shaped like a guitar. Buries itself in sand with only its eyes exposed, waiting for prey.'
  },
  55: {
    id: 55,
    name: 'Giant Guitarfish',
    types: ['ray', 'ground'],
    baseStats: {
      hp: 75,
      attack: 70,
      defense: 75,
      spAttack: 45,
      spDefense: 65,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 80 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 81 },
      { level: 28, moveId: 71 },  // Iron Head
      { level: 35, moveId: 31 }   // Crunch
    ],
    evolvesTo: { speciesId: 56, level: 40 },
    description: 'A larger guitarfish that patrols sandy bottoms. Its powerful tail helps it excavate buried mollusks.'
  },
  56: {
    id: 56,
    name: 'Bowmouth Guitarfish',
    types: ['ray', 'steel'],
    baseStats: {
      hp: 90,
      attack: 95,
      defense: 100,
      spAttack: 55,
      spDefense: 80,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 80 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 71 },
      { level: 1, moveId: 31 },
      { level: 44, moveId: 73 },  // Iron Tail
      { level: 50, moveId: 72 }   // Steel Wing
    ],
    description: 'The "shark ray" with thorn-like ridges and a bow-shaped head. Its armored body deflects most predator attacks.'
  },

  // Butterfly Ray → Smooth Butterfly Ray → Spiny Butterfly Ray
  57: {
    id: 57,
    name: 'Butterfly Ray',
    types: ['ray'],
    baseStats: {
      hp: 40,
      attack: 30,
      defense: 40,
      spAttack: 45,
      spDefense: 40,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Wing Attack
      { level: 7, moveId: 3 },   // Tail Whip
      { level: 12, moveId: 120 } // Fairy Wind
    ],
    evolvesTo: { speciesId: 58, level: 18 },
    description: 'A small ray that flutters gracefully through the water. Its wing-like pectoral fins give it its name.'
  },
  58: {
    id: 58,
    name: 'Smooth Butterfly Ray',
    types: ['ray'],
    baseStats: {
      hp: 55,
      attack: 45,
      defense: 55,
      spAttack: 60,
      spDefense: 55,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 3 },
      { level: 1, moveId: 120 },
      { level: 22, moveId: 91 },  // Aerial Ace
      { level: 28, moveId: 10 }   // Water Gun
    ],
    evolvesTo: { speciesId: 59, level: 32 },
    description: 'Its smooth skin helps it glide effortlessly. Can briefly leap from the water when startled.'
  },
  59: {
    id: 59,
    name: 'Spiny Butterfly Ray',
    types: ['ray', 'poison'],
    baseStats: {
      hp: 70,
      attack: 60,
      defense: 70,
      spAttack: 80,
      spDefense: 75,
      speed: 85
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 91 },
      { level: 1, moveId: 120 },
      { level: 35, moveId: 150 }, // Poison Sting
      { level: 40, moveId: 151 }, // Toxic
      { level: 46, moveId: 42 }   // Psychic
    ],
    description: 'The largest butterfly ray with venomous tail spines. Its graceful movements belie its dangerous nature.'
  },

  // Bat Ray - Single stage
  60: {
    id: 60,
    name: 'Bat Ray',
    types: ['ray', 'ground'],
    baseStats: {
      hp: 75,
      attack: 70,
      defense: 65,
      spAttack: 50,
      spDefense: 60,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Wing Attack
      { level: 8, moveId: 80 },  // Sand Attack
      { level: 15, moveId: 81 }, // Mud Shot
      { level: 22, moveId: 91 }, // Aerial Ace
      { level: 29, moveId: 150 }, // Poison Sting
      { level: 36, moveId: 31 }  // Crunch
    ],
    description: 'A large ray that "flies" over sandy bottoms, flapping its wing-like fins. Crushes clams and oysters with its flat teeth.'
  },

  // SCUBA Encounters
  // Angelshark - ambush predator
  61: {
    id: 61,
    name: 'Angelshark',
    types: ['ground'],
    baseStats: {
      hp: 70,
      attack: 85,
      defense: 75,
      spAttack: 45,
      spDefense: 60,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 80 },  // Sand Attack
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 81 }, // Mud Shot
      { level: 26, moveId: 31 }, // Crunch
      { level: 34, moveId: 140 } // Jaw Lock
    ],
    description: 'A flat, ray-like shark that buries itself in sand. Explodes upward to ambush passing fish with incredible speed.'
  },

  // Soupfin Shark
  62: {
    id: 62,
    name: 'Soupfin Shark',
    types: ['shark'],
    baseStats: {
      hp: 65,
      attack: 75,
      defense: 60,
      spAttack: 50,
      spDefense: 55,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 11 }, // Aqua Jet
      { level: 26, moveId: 20 }, // Ram
      { level: 34, moveId: 31 }  // Crunch
    ],
    description: 'Once nearly fished to extinction for its fins. Now recovering in California waters. A resilient coastal predator.'
  },

  // Fishing Encounters
  // Blue Shark
  63: {
    id: 63,
    name: 'Blue Shark',
    types: ['shark', 'fairy'],
    baseStats: {
      hp: 70,
      attack: 65,
      defense: 55,
      spAttack: 75,
      spDefense: 60,
      speed: 85
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 120 }, // Fairy Wind
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 11 }, // Aqua Jet
      { level: 26, moveId: 121 }, // Dazzle
      { level: 34, moveId: 31 }, // Crunch
      { level: 42, moveId: 42 }  // Psychic
    ],
    description: 'The most beautiful of sharks with brilliant blue coloring. A tireless ocean wanderer that travels vast distances.'
  },

  // Shortfin Mako → Longfin Mako
  64: {
    id: 64,
    name: 'Shortfin Mako',
    types: ['fire', 'breaching'],
    baseStats: {
      hp: 65,
      attack: 85,
      defense: 55,
      spAttack: 70,
      spDefense: 50,
      speed: 105
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ember
      { level: 12, moveId: 2 },  // Bite
      { level: 18, moveId: 90 }, // Wing Attack
      { level: 24, moveId: 61 }, // Fire Fang
      { level: 30, moveId: 91 }, // Aerial Ace
      { level: 36, moveId: 62 }  // Flame Burst
    ],
    evolvesTo: { speciesId: 65, level: 40 },
    description: 'The fastest shark alive, reaching 45 mph. Its warm blood lets it hunt in cold waters where prey least expects it.'
  },
  65: {
    id: 65,
    name: 'Longfin Mako',
    types: ['fire', 'breaching'],
    baseStats: {
      hp: 75,
      attack: 95,
      defense: 65,
      spAttack: 85,
      spDefense: 60,
      speed: 110
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 60 },
      { level: 1, moveId: 2 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 61 },
      { level: 44, moveId: 63 },  // Flamethrower
      { level: 50, moveId: 31 }   // Crunch
    ],
    description: 'A deep-water mako with long, elegant pectoral fins. Rarer and more powerful than its shortfin cousin.'
  },

  // Sharpnose Shark
  66: {
    id: 66,
    name: 'Sharpnose Shark',
    types: ['shark'],
    baseStats: {
      hp: 55,
      attack: 60,
      defense: 50,
      spAttack: 45,
      spDefense: 50,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 11 }, // Aqua Jet
      { level: 22, moveId: 20 }, // Ram
      { level: 29, moveId: 30 }  // Pursuit
    ],
    description: 'A small, common coastal shark with a distinctive pointed snout. Often caught by accident when fishing for other species.'
  },

  // Rare Encounters
  // Broadnose Sevengill - Spring seasonal
  67: {
    id: 67,
    name: 'Broadnose Sevengill',
    types: ['algae', 'fossil'],
    baseStats: {
      hp: 85,
      attack: 90,
      defense: 70,
      spAttack: 55,
      spDefense: 65,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 2 },   // Bite
      { level: 15, moveId: 160 }, // Rock Throw
      { level: 22, moveId: 100 }, // Vine Whip
      { level: 29, moveId: 161 }, // Ancient Power
      { level: 36, moveId: 31 },  // Crunch
      { level: 43, moveId: 140 }  // Jaw Lock
    ],
    description: 'A primitive shark with seven gill slits instead of five. Aggregates in San Diego kelp forests each spring to mate.'
  },

  // Scalloped Bonnethead - very rare (already exists as Bonnethead ID 10, but this is specific variant)
  68: {
    id: 68,
    name: 'Scalloped Bonnethead',
    types: ['psychic', 'algae'],
    baseStats: {
      hp: 55,
      attack: 60,
      defense: 55,
      spAttack: 70,
      spDefense: 60,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 40 },  // Confusion
      { level: 10, moveId: 100 }, // Vine Whip
      { level: 18, moveId: 41 }, // Psybeam
      { level: 26, moveId: 2 },  // Bite
      { level: 34, moveId: 42 }  // Psychic
    ],
    description: 'The smallest hammerhead with a scalloped head shape. Extremely rare in San Diego - a lucky find for any trainer!'
  },

  // Prickly Shark - very rare deep water
  69: {
    id: 69,
    name: 'Prickly Shark',
    types: ['deepsea', 'steel'],
    baseStats: {
      hp: 80,
      attack: 75,
      defense: 95,
      spAttack: 65,
      spDefense: 85,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 70 },  // Metal Claw
      { level: 12, moveId: 2 },  // Bite
      { level: 20, moveId: 30 }, // Pursuit
      { level: 28, moveId: 71 }, // Iron Head
      { level: 36, moveId: 31 }, // Crunch
      { level: 44, moveId: 73 }  // Iron Tail
    ],
    description: 'A deep-water shark covered in thorn-like denticles. Rarely seen in shallow waters - encountering one is extremely unusual.'
  },

  // === CABO / BAJA REGION CREATURES (Region 3) ===

  // Mexican Horn Shark - Regional variant
  70: {
    id: 70,
    name: 'Mexican Horn Shark',
    types: ['algae', 'ground'],
    baseStats: {
      hp: 68,
      attack: 72,
      defense: 82,
      spAttack: 48,
      spDefense: 68,
      speed: 28
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 100 }, // Vine Whip
      { level: 12, moveId: 2 },  // Bite
      { level: 18, moveId: 80 }, // Sand Attack
      { level: 24, moveId: 71 }, // Iron Head
      { level: 30, moveId: 81 }, // Mud Shot
      { level: 36, moveId: 31 }  // Crunch
    ],
    description: 'A regional variant adapted to Baja California\'s warmer waters. Its horn ridges are more pronounced than its San Diego cousin.'
  },

  // Cownose Ray
  71: {
    id: 71,
    name: 'Cownose Ray',
    types: ['ray', 'psychic'],
    baseStats: {
      hp: 70,
      attack: 55,
      defense: 65,
      spAttack: 80,
      spDefense: 70,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Wing Attack
      { level: 8, moveId: 40 },  // Confusion
      { level: 15, moveId: 91 }, // Aerial Ace
      { level: 22, moveId: 41 }, // Psybeam
      { level: 29, moveId: 10 }, // Water Gun
      { level: 36, moveId: 42 }  // Psychic
    ],
    description: 'Named for its cow-like snout. Migrates in massive schools that darken the water, communicating through subtle body movements.'
  },

  // Electric Ray (different from Torpedo Ray ID 26)
  72: {
    id: 72,
    name: 'Pacific Electric Ray',
    types: ['ray', 'electric'],
    baseStats: {
      hp: 60,
      attack: 45,
      defense: 65,
      spAttack: 90,
      spDefense: 70,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 51 },  // Thunder Shock
      { level: 10, moveId: 90 }, // Wing Attack
      { level: 18, moveId: 50 }, // Spark
      { level: 26, moveId: 80 }, // Sand Attack
      { level: 34, moveId: 52 }  // Thunderbolt
    ],
    description: 'Can generate up to 50 volts to stun prey. Buries itself in sandy bottoms near the Sea of Cortez.'
  },

  // Smooth Hammerhead
  73: {
    id: 73,
    name: 'Smooth Hammerhead',
    types: ['psychic'],
    baseStats: {
      hp: 80,
      attack: 85,
      defense: 70,
      spAttack: 85,
      spDefense: 70,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 40 },  // Confusion
      { level: 12, moveId: 2 },  // Bite
      { level: 20, moveId: 41 }, // Psybeam
      { level: 28, moveId: 20 }, // Ram
      { level: 36, moveId: 42 }, // Psychic
      { level: 44, moveId: 31 }  // Crunch
    ],
    description: 'The largest hammerhead in cooler waters. Its smooth, curved cephalofoil gives it unparalleled electromagnetic sensing.'
  },

  // Silky Shark
  74: {
    id: 74,
    name: 'Silky Shark',
    types: ['shark', 'fairy'],
    baseStats: {
      hp: 72,
      attack: 78,
      defense: 60,
      spAttack: 65,
      spDefense: 55,
      speed: 80
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 120 }, // Fairy Wind
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 11 }, // Aqua Jet
      { level: 26, moveId: 121 }, // Dazzle
      { level: 34, moveId: 20 }, // Ram
      { level: 42, moveId: 31 }  // Crunch
    ],
    description: 'Named for its silky-smooth skin. Abundant in the Sea of Cortez, often following tuna schools.'
  },

  // Pelagic Thresher
  75: {
    id: 75,
    name: 'Pelagic Thresher',
    types: ['breaching', 'fighting'],
    baseStats: {
      hp: 65,
      attack: 90,
      defense: 55,
      spAttack: 50,
      spDefense: 55,
      speed: 85
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Wing Attack
      { level: 12, moveId: 20 }, // Ram
      { level: 20, moveId: 91 }, // Aerial Ace
      { level: 28, moveId: 21 }, // Thrash
      { level: 36, moveId: 2 },  // Bite
      { level: 44, moveId: 22 }  // Brick Break
    ],
    evolvesTo: { speciesId: 76, level: 38 },
    description: 'Uses its scythe-like tail to stun fish. Can leap completely out of the water when hunting.'
  },

  // Bigeye Thresher (evolution)
  76: {
    id: 76,
    name: 'Bigeye Thresher',
    types: ['breaching', 'fighting'],
    baseStats: {
      hp: 75,
      attack: 100,
      defense: 65,
      spAttack: 60,
      spDefense: 65,
      speed: 95
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 90 },
      { level: 1, moveId: 20 },
      { level: 1, moveId: 91 },
      { level: 40, moveId: 21 },
      { level: 48, moveId: 23 }, // Close Combat
      { level: 56, moveId: 31 }
    ],
    description: 'Its enormous eyes let it hunt in deep, dark waters. The tail can be as long as its entire body.'
  },

  // Great Hammerhead (for Dr. Martillo's ace)
  77: {
    id: 77,
    name: 'Great Hammerhead',
    types: ['psychic', 'electric'],
    baseStats: {
      hp: 90,
      attack: 95,
      defense: 75,
      spAttack: 95,
      spDefense: 75,
      speed: 75
    },
    learnableMoves: [
      { level: 1, moveId: 1 },
      { level: 1, moveId: 40 },
      { level: 1, moveId: 2 },
      { level: 15, moveId: 41 },
      { level: 25, moveId: 51 }, // Thunder Shock
      { level: 35, moveId: 42 }, // Psychic
      { level: 45, moveId: 52 }, // Thunderbolt
      { level: 55, moveId: 31 }
    ],
    description: 'The largest hammerhead species. Its massive cephalofoil can detect the faintest electrical signals from buried prey.'
  },

  // Nurse Shark (Cabo variant - common)
  78: {
    id: 78,
    name: 'Tawny Nurse Shark',
    types: ['ground'],
    baseStats: {
      hp: 75,
      attack: 60,
      defense: 70,
      spAttack: 45,
      spDefense: 65,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 80 },  // Sand Attack
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 81 }, // Mud Shot
      { level: 26, moveId: 3 },  // Tail Whip
      { level: 34, moveId: 31 }  // Crunch
    ],
    description: 'A docile bottom-dweller common in Cabo\'s shallow reefs. Rests in groups during the day, hunting at night.'
  },

  // === CARIBBEAN / FLORIDA REGION CREATURES (Region 4) ===

  // Blacknose Shark - Common shallow water shark
  79: {
    id: 79,
    name: 'Blacknose Shark',
    types: ['shark'],
    baseStats: {
      hp: 55,
      attack: 58,
      defense: 50,
      spAttack: 45,
      spDefense: 50,
      speed: 62
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 8, moveId: 2 },   // Bite
      { level: 14, moveId: 11 }, // Aqua Jet
      { level: 20, moveId: 30 }, // Pursuit
      { level: 26, moveId: 20 }, // Ram
      { level: 32, moveId: 31 }  // Crunch
    ],
    description: 'A small coastal shark with a distinctive black smudge on its snout. Commonly found in Florida\'s shallow waters.'
  },

  // Yellow Stingray - Common tide pool encounter
  80: {
    id: 80,
    name: 'Yellow Stingray',
    types: ['ray', 'poison'],
    baseStats: {
      hp: 50,
      attack: 40,
      defense: 55,
      spAttack: 50,
      spDefense: 55,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Wing Attack
      { level: 7, moveId: 150 }, // Poison Sting
      { level: 13, moveId: 80 }, // Sand Attack
      { level: 19, moveId: 120 }, // Fairy Wind
      { level: 25, moveId: 151 }, // Toxic
      { level: 31, moveId: 42 }  // Psychic
    ],
    description: 'A small, brightly-colored stingray with yellow and brown patterns. Popular in Caribbean tide pools.'
  },

  // Caribbean Reef Shark - Classic reef shark
  81: {
    id: 81,
    name: 'Caribbean Reef Shark',
    types: ['shark'],
    baseStats: {
      hp: 75,
      attack: 80,
      defense: 70,
      spAttack: 55,
      spDefense: 65,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 10, moveId: 2 },  // Bite
      { level: 16, moveId: 11 }, // Aqua Jet
      { level: 22, moveId: 20 }, // Ram
      { level: 28, moveId: 21 }, // Thrash
      { level: 34, moveId: 31 }, // Crunch
      { level: 40, moveId: 140 } // Jaw Lock
    ],
    description: 'The iconic Caribbean reef predator. A powerful, territorial shark that patrols coral reefs throughout the region.'
  },

  // Tiger Shark - Rare apex predator
  82: {
    id: 82,
    name: 'Tiger Shark',
    types: ['leviathan'],
    baseStats: {
      hp: 95,
      attack: 105,
      defense: 80,
      spAttack: 70,
      spDefense: 75,
      speed: 75
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 2 },   // Bite
      { level: 15, moveId: 20 }, // Ram
      { level: 23, moveId: 30 }, // Pursuit
      { level: 31, moveId: 31 }, // Crunch
      { level: 39, moveId: 140 }, // Jaw Lock
      { level: 47, moveId: 170 }, // Leviathan Rage
      { level: 55, moveId: 23 }  // Close Combat
    ],
    description: 'The "garbage can of the sea" - a fearsome apex predator with striped markings. Will eat almost anything.'
  },

  // Scoophead - Rare hammerhead variant
  83: {
    id: 83,
    name: 'Scoophead',
    types: ['psychic', 'algae'],
    baseStats: {
      hp: 65,
      attack: 70,
      defense: 60,
      spAttack: 80,
      spDefense: 65,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 40 },  // Confusion
      { level: 10, moveId: 100 }, // Vine Whip
      { level: 17, moveId: 41 }, // Psybeam
      { level: 24, moveId: 2 },  // Bite
      { level: 31, moveId: 101 }, // Absorb
      { level: 38, moveId: 42 }, // Psychic
      { level: 45, moveId: 31 }  // Crunch
    ],
    description: 'A rare hammerhead with a distinctive scoop-shaped head. Uses its wide cephalofoil to detect prey hiding in seagrass.'
  },

  // Chain Catshark - Rare deep water species
  84: {
    id: 84,
    name: 'Chain Catshark',
    types: ['steel'],
    baseStats: {
      hp: 60,
      attack: 55,
      defense: 80,
      spAttack: 70,
      spDefense: 75,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 70 },  // Metal Claw
      { level: 9, moveId: 2 },   // Bite
      { level: 16, moveId: 71 }, // Iron Head
      { level: 23, moveId: 30 }, // Pursuit
      { level: 30, moveId: 72 }, // Steel Wing
      { level: 37, moveId: 73 }, // Iron Tail
      { level: 44, moveId: 31 }  // Crunch
    ],
    description: 'A beautiful catshark with chain-link markings. Found in deep Caribbean waters, often near wrecks and rocky outcrops.'
  },

  // Golden Hammerhead - Very rare, shiny-like variant
  85: {
    id: 85,
    name: 'Golden Hammerhead',
    types: ['psychic'],
    baseStats: {
      hp: 85,
      attack: 90,
      defense: 75,
      spAttack: 95,
      spDefense: 80,
      speed: 75
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 40 },  // Confusion
      { level: 12, moveId: 2 },  // Bite
      { level: 18, moveId: 120 }, // Fairy Wind
      { level: 24, moveId: 41 }, // Psybeam
      { level: 30, moveId: 121 }, // Dazzle
      { level: 36, moveId: 42 }, // Psychic
      { level: 42, moveId: 31 }, // Crunch
      { level: 48, moveId: 52 }  // Thunderbolt
    ],
    description: 'An extremely rare hammerhead with golden coloring. Sightings are considered incredibly lucky - most divers never see one.'
  },

  // ============================================
  // PACIFIC NORTHWEST REGION (Region 6)
  // ============================================

  // Porbeagle - Cold water lamnid shark, base of salmon shark line
  86: {
    id: 86,
    name: 'Porbeagle',
    types: ['fire', 'ice'],
    baseStats: {
      hp: 70,
      attack: 75,
      defense: 60,
      spAttack: 55,
      spDefense: 55,
      speed: 80
    },
    evolvesTo: { speciesId: 87, level: 32 },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 10 }, // Ember
      { level: 22, moveId: 61 }, // Icy Wind
      { level: 29, moveId: 20 }, // Ram
      { level: 36, moveId: 11 }  // Fire Fang
    ],
    description: 'A powerful cold-water mackerel shark. Its warm-blooded metabolism lets it thrive in frigid northern seas.'
  },

  // Salmon Shark - Apex predator of Pacific Northwest, warm-blooded
  87: {
    id: 87,
    name: 'Salmon Shark',
    types: ['fire', 'ice'],
    baseStats: {
      hp: 85,
      attack: 95,
      defense: 70,
      spAttack: 65,
      spDefense: 65,
      speed: 100
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 1, moveId: 2 },   // Bite
      { level: 15, moveId: 10 }, // Ember
      { level: 22, moveId: 61 }, // Icy Wind
      { level: 29, moveId: 20 }, // Ram
      { level: 36, moveId: 11 }, // Fire Fang
      { level: 43, moveId: 62 }, // Blizzard
      { level: 50, moveId: 12 }  // Flamethrower
    ],
    description: 'The "warm shark of the cold sea" - can raise its body temperature 20°F above the surrounding water. Hunts salmon with devastating speed.'
  },

  // Spiny Dogfish - Common Pacific Northwest shark (Zubat equivalent)
  88: {
    id: 88,
    name: 'Spiny Dogfish',
    types: ['poison'],
    baseStats: {
      hp: 50,
      attack: 45,
      defense: 55,
      spAttack: 40,
      spDefense: 50,
      speed: 55
    },
    evolvesTo: { speciesId: 95, level: 36 },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 80 },  // Poison Sting
      { level: 7, moveId: 2 },   // Bite
      { level: 13, moveId: 81 }, // Acid
      { level: 19, moveId: 30 }, // Pursuit
      { level: 25, moveId: 82 }, // Toxic
      { level: 31, moveId: 83 }, // Venoshock
      { level: 37, moveId: 31 }  // Crunch
    ],
    description: 'An extremely common small shark with venomous spines. Massive schools patrol the Pacific Northwest coast.'
  },

  // Little Sleeper Shark - Deep cold water shark
  89: {
    id: 89,
    name: 'Little Sleeper Shark',
    types: ['ice', 'deepsea'],
    baseStats: {
      hp: 65,
      attack: 55,
      defense: 70,
      spAttack: 45,
      spDefense: 65,
      speed: 30
    },
    evolvesTo: { speciesId: 90, level: 40 },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 90 }, // Shadow Sneak
      { level: 26, moveId: 61 }, // Icy Wind
      { level: 34, moveId: 91 }, // Dark Pulse
      { level: 42, moveId: 62 }  // Blizzard
    ],
    description: 'A slow-moving deep-sea shark that conserves energy in the frigid depths. Can survive in near-freezing water.'
  },

  // Pacific Sleeper Shark - Massive deep cold water apex predator
  90: {
    id: 90,
    name: 'Pacific Sleeper Shark',
    types: ['ice', 'deepsea'],
    baseStats: {
      hp: 110,
      attack: 85,
      defense: 95,
      spAttack: 60,
      spDefense: 90,
      speed: 25
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 1, moveId: 2 },   // Bite
      { level: 18, moveId: 90 }, // Shadow Sneak
      { level: 26, moveId: 61 }, // Icy Wind
      { level: 34, moveId: 91 }, // Dark Pulse
      { level: 42, moveId: 62 }, // Blizzard
      { level: 50, moveId: 31 }, // Crunch
      { level: 58, moveId: 170 } // Leviathan Rage
    ],
    description: 'A massive deep-sea predator reaching 20+ feet. Hunts giant Pacific octopus and even attacks sleeping seals on the bottom.'
  },

  // Big Skate - Large Pacific skate
  91: {
    id: 91,
    name: 'Big Skate',
    types: ['ray'],
    baseStats: {
      hp: 75,
      attack: 60,
      defense: 80,
      spAttack: 50,
      spDefense: 70,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 8, moveId: 20 },  // Ram
      { level: 15, moveId: 110 }, // Wing Attack
      { level: 22, moveId: 30 }, // Pursuit
      { level: 29, moveId: 111 }, // Sand Attack
      { level: 36, moveId: 112 }, // Mud Shot
      { level: 43, moveId: 113 }  // Earthquake
    ],
    description: 'The largest skate in North American waters, reaching 8 feet across. Buries itself in sand to ambush prey.'
  },

  // Winter Skate - Cold water skate with beautiful markings
  92: {
    id: 92,
    name: 'Winter Skate',
    types: ['ray', 'ice'],
    baseStats: {
      hp: 65,
      attack: 55,
      defense: 75,
      spAttack: 60,
      spDefense: 80,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 9, moveId: 20 },  // Ram
      { level: 17, moveId: 61 }, // Icy Wind
      { level: 25, moveId: 110 }, // Wing Attack
      { level: 33, moveId: 114 }, // Aurora Beam
      { level: 41, moveId: 62 }, // Blizzard
      { level: 49, moveId: 115 }  // Sheer Cold
    ],
    description: 'A beautiful skate adapted to freezing northern waters. Its eyespots resemble frost patterns on a winter window.'
  },

  // Iceland Catshark - Cold water catshark variant
  93: {
    id: 93,
    name: 'Iceland Catshark',
    types: ['ice'],
    baseStats: {
      hp: 55,
      attack: 50,
      defense: 60,
      spAttack: 65,
      spDefense: 70,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 61 }, // Icy Wind
      { level: 22, moveId: 30 }, // Pursuit
      { level: 29, moveId: 114 }, // Aurora Beam
      { level: 36, moveId: 31 }, // Crunch
      { level: 43, moveId: 62 }  // Blizzard
    ],
    description: 'A small catshark found in frigid North Atlantic and Arctic waters. Its pale coloring provides camouflage against icy seafloors.'
  },

  // ============================================
  // EUROPE REGION CREATURES (IDs 94-102)
  // ============================================

  // Shortnose Spurdog - Base form of dogfish line
  94: {
    id: 94,
    name: 'Shortnose Spurdog',
    types: ['poison'],
    baseStats: {
      hp: 40,
      attack: 35,
      defense: 45,
      spAttack: 30,
      spDefense: 40,
      speed: 45
    },
    evolvesTo: { speciesId: 88, level: 20 },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 80 },  // Poison Sting
      { level: 5, moveId: 3 },   // Tail Whip
      { level: 10, moveId: 2 },  // Bite
      { level: 15, moveId: 81 }, // Acid
      { level: 18, moveId: 30 }  // Pursuit
    ],
    description: 'A small venomous shark found in European waters. The defensive spines in front of its dorsal fins can inject painful venom.'
  },

  // Longnose Spurdog - Final evolution of dogfish line
  95: {
    id: 95,
    name: 'Longnose Spurdog',
    types: ['poison'],
    baseStats: {
      hp: 70,
      attack: 65,
      defense: 75,
      spAttack: 60,
      spDefense: 70,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 80 },  // Poison Sting
      { level: 1, moveId: 2 },   // Bite
      { level: 1, moveId: 81 },  // Acid
      { level: 25, moveId: 82 }, // Toxic
      { level: 31, moveId: 83 }, // Venoshock
      { level: 37, moveId: 31 }, // Crunch
      { level: 43, moveId: 84 }, // Poison Jab
      { level: 50, moveId: 85 }  // Sludge Bomb
    ],
    description: 'A large deep-water dogfish with an elongated snout. Its potent venom makes it feared by fishermen throughout the Atlantic.'
  },

  // Small-spotted Catshark - Common European catshark, base form
  96: {
    id: 96,
    name: 'Small-spotted Catshark',
    types: ['shark'],
    baseStats: {
      hp: 45,
      attack: 40,
      defense: 50,
      spAttack: 35,
      spDefense: 45,
      speed: 40
    },
    evolvesTo: { speciesId: 97, level: 28 },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 6, moveId: 2 },   // Bite
      { level: 12, moveId: 20 }, // Ram
      { level: 18, moveId: 30 }, // Pursuit
      { level: 24, moveId: 31 }  // Crunch
    ],
    description: 'The most common shark in European waters. Its spotted pattern helps it blend into rocky reefs and kelp forests.'
  },

  // Nursehound - Evolved catshark, fighting type
  97: {
    id: 97,
    name: 'Nursehound',
    types: ['shark', 'fighting'],
    baseStats: {
      hp: 70,
      attack: 75,
      defense: 70,
      spAttack: 50,
      spDefense: 65,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 2 },   // Bite
      { level: 1, moveId: 20 },  // Ram
      { level: 18, moveId: 30 }, // Pursuit
      { level: 24, moveId: 31 }, // Crunch
      { level: 30, moveId: 40 }, // Fury Swipes
      { level: 36, moveId: 41 }, // Body Slam
      { level: 42, moveId: 42 }, // Counter
      { level: 48, moveId: 43 }  // Close Combat
    ],
    description: 'A large, aggressive catshark that guards its territory fiercely. Named for its habit of "nursing" in caves and crevices during the day.'
  },

  // Blonde Skate - European skate, evolves to Thornback
  98: {
    id: 98,
    name: 'Blonde Skate',
    types: ['ray', 'ground'],
    baseStats: {
      hp: 55,
      attack: 50,
      defense: 65,
      spAttack: 45,
      spDefense: 60,
      speed: 40
    },
    evolvesTo: { speciesId: 99, level: 32 },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 8, moveId: 111 }, // Sand Attack
      { level: 14, moveId: 20 }, // Ram
      { level: 20, moveId: 112 }, // Mud Shot
      { level: 26, moveId: 30 }, // Pursuit
      { level: 30, moveId: 110 }  // Wing Attack
    ],
    description: 'A sandy-colored skate found on European seafloors. Its coloring provides perfect camouflage against sandy bottoms.'
  },

  // Thornback Skate - Evolved European skate with defensive spines
  99: {
    id: 99,
    name: 'Thornback Skate',
    types: ['ray', 'ground'],
    baseStats: {
      hp: 80,
      attack: 70,
      defense: 95,
      spAttack: 55,
      spDefense: 85,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 111 }, // Sand Attack
      { level: 1, moveId: 20 },  // Ram
      { level: 26, moveId: 112 }, // Mud Shot
      { level: 32, moveId: 80 },  // Poison Sting (thorns)
      { level: 38, moveId: 110 }, // Wing Attack
      { level: 44, moveId: 113 }, // Earthquake
      { level: 50, moveId: 120 }, // Stone Edge
      { level: 56, moveId: 121 }  // Spiky Shield
    ],
    description: 'A large skate covered in thorny spines for protection. The rows of spines down its back give it its name and make it dangerous to handle.'
  },

  // Roughshark - Deep-sea European shark
  100: {
    id: 100,
    name: 'Roughshark',
    types: ['deepsea'],
    baseStats: {
      hp: 65,
      attack: 70,
      defense: 85,
      spAttack: 55,
      spDefense: 75,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Shadow Sneak
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 91 }, // Dark Pulse
      { level: 26, moveId: 30 }, // Pursuit
      { level: 34, moveId: 31 }, // Crunch
      { level: 42, moveId: 92 }, // Phantom Force
      { level: 50, moveId: 93 }  // Night Slash
    ],
    description: 'A bizarre deep-sea shark with rough, sandpaper-like skin. Its compressed body helps it navigate rocky crevices in the deep.'
  },

  // Velvet Belly Lanternshark - Bioluminescent European shark
  101: {
    id: 101,
    name: 'Velvet Belly Lanternshark',
    types: ['electric', 'deepsea'],
    baseStats: {
      hp: 50,
      attack: 45,
      defense: 55,
      spAttack: 80,
      spDefense: 70,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 70 },  // Thunder Shock
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 71 }, // Spark
      { level: 22, moveId: 90 }, // Shadow Sneak
      { level: 29, moveId: 72 }, // Thunder Wave
      { level: 36, moveId: 91 }, // Dark Pulse
      { level: 43, moveId: 73 }, // Thunderbolt
      { level: 50, moveId: 74 }  // Flash Cannon
    ],
    description: 'A small shark with bioluminescent photophores on its belly that glow like velvet. Uses its light to communicate and confuse predators.'
  },

  // Basking Shark - Massive filter-feeding leviathan
  102: {
    id: 102,
    name: 'Basking Shark',
    types: ['leviathan'],
    baseStats: {
      hp: 130,
      attack: 65,
      defense: 90,
      spAttack: 80,
      spDefense: 85,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 10, moveId: 20 }, // Ram
      { level: 20, moveId: 150 }, // Aqua Jet
      { level: 30, moveId: 151 }, // Water Pulse
      { level: 40, moveId: 152 }, // Surf
      { level: 50, moveId: 41 },  // Body Slam
      { level: 60, moveId: 170 }, // Leviathan Rage
      { level: 70, moveId: 171 }  // Filter Feast
    ],
    description: 'The second-largest fish in the world, reaching 40 feet. Despite its massive size, it feeds only on plankton filtered through its gill rakers.'
  },

  // ============================================
  // CAPE TOWN REGION CREATURES (IDs 103-112)
  // ============================================

  // Pyjama Catshark - Distinctive striped catshark endemic to South Africa
  103: {
    id: 103,
    name: 'Pyjama Catshark',
    types: ['fairy'],
    baseStats: {
      hp: 55,
      attack: 45,
      defense: 60,
      spAttack: 70,
      spDefense: 65,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 160 }, // Charm
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 161 }, // Fairy Wind
      { level: 22, moveId: 30 }, // Pursuit
      { level: 29, moveId: 162 }, // Moonlight
      { level: 36, moveId: 31 }, // Crunch
      { level: 43, moveId: 163 }  // Dazzling Gleam
    ],
    description: 'A strikingly beautiful catshark with distinctive striped markings like pajamas. Endemic to South African waters and beloved by divers.'
  },

  // Puffader Shyshark - Shy catshark that curls up when threatened
  104: {
    id: 104,
    name: 'Puffader Shyshark',
    types: ['fairy'],
    baseStats: {
      hp: 50,
      attack: 40,
      defense: 70,
      spAttack: 65,
      spDefense: 75,
      speed: 40
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 160 }, // Charm
      { level: 6, moveId: 3 },   // Tail Whip
      { level: 12, moveId: 164 }, // Protect
      { level: 18, moveId: 161 }, // Fairy Wind
      { level: 24, moveId: 165 }, // Withdraw
      { level: 30, moveId: 162 }, // Moonlight
      { level: 36, moveId: 163 }  // Dazzling Gleam
    ],
    description: 'When threatened, this shy catshark curls into a ball and covers its eyes with its tail. Named for its puffadder-like markings.'
  },

  // Dark Shyshark - Another shy endemic catshark
  105: {
    id: 105,
    name: 'Dark Shyshark',
    types: ['fairy', 'deepsea'],
    baseStats: {
      hp: 55,
      attack: 45,
      defense: 65,
      spAttack: 70,
      spDefense: 70,
      speed: 45
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Shadow Sneak
      { level: 8, moveId: 160 }, // Charm
      { level: 15, moveId: 91 }, // Dark Pulse
      { level: 22, moveId: 161 }, // Fairy Wind
      { level: 29, moveId: 164 }, // Protect
      { level: 36, moveId: 162 }, // Moonlight
      { level: 43, moveId: 163 }  // Dazzling Gleam
    ],
    description: 'A darker variant of the shyshark found in deeper waters. Just as shy as its relatives, hiding in caves during the day.'
  },

  // Leopard Catshark - Spotted catshark
  106: {
    id: 106,
    name: 'Leopard Catshark',
    types: ['fairy', 'algae'],
    baseStats: {
      hp: 60,
      attack: 50,
      defense: 55,
      spAttack: 75,
      spDefense: 60,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 50 },  // Vine Whip
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 160 }, // Charm
      { level: 22, moveId: 51 }, // Razor Leaf
      { level: 29, moveId: 161 }, // Fairy Wind
      { level: 36, moveId: 52 }, // Solar Beam
      { level: 43, moveId: 163 }  // Dazzling Gleam
    ],
    description: 'A beautifully spotted catshark that lives among the kelp forests of South Africa. Its pattern provides excellent camouflage.'
  },

  // Tiger Catshark - Striped catshark variant
  107: {
    id: 107,
    name: 'Tiger Catshark',
    types: ['fairy'],
    baseStats: {
      hp: 55,
      attack: 55,
      defense: 55,
      spAttack: 65,
      spDefense: 60,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 160 }, // Charm
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 40 }, // Fury Swipes
      { level: 22, moveId: 161 }, // Fairy Wind
      { level: 29, moveId: 30 }, // Pursuit
      { level: 36, moveId: 31 }, // Crunch
      { level: 43, moveId: 163 }  // Dazzling Gleam
    ],
    description: 'A small catshark with tiger-like stripes. More active than other catsharks and often seen hunting small fish at dusk.'
  },

  // Spotted Gully Shark - Kelp forest hunter
  108: {
    id: 108,
    name: 'Spotted Gully Shark',
    types: ['algae'],
    baseStats: {
      hp: 70,
      attack: 75,
      defense: 65,
      spAttack: 50,
      spDefense: 60,
      speed: 60
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 50 },  // Vine Whip
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 20 }, // Ram
      { level: 22, moveId: 51 }, // Razor Leaf
      { level: 29, moveId: 30 }, // Pursuit
      { level: 36, moveId: 31 }, // Crunch
      { level: 43, moveId: 52 }  // Solar Beam
    ],
    description: 'A powerful shark that hunts in the gullies between kelp forests. Named for its spotted pattern and preferred habitat.'
  },

  // Broadnose Sevengill - Ancient shark with seven gills
  109: {
    id: 109,
    name: 'Broadnose Sevengill',
    types: ['algae', 'fossil'],
    baseStats: {
      hp: 85,
      attack: 80,
      defense: 70,
      spAttack: 55,
      spDefense: 65,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 130 }, // Ancient Power
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 50 }, // Vine Whip
      { level: 26, moveId: 131 }, // Rock Slide
      { level: 34, moveId: 31 }, // Crunch
      { level: 42, moveId: 132 }, // Stone Edge
      { level: 50, moveId: 170 }  // Leviathan Rage
    ],
    description: 'A living fossil with seven gill slits instead of five. This ancient design has remained unchanged for millions of years.'
  },

  // Copper Shark - Bronze whaler, powerful coastal predator
  110: {
    id: 110,
    name: 'Copper Shark',
    types: ['steel'],
    baseStats: {
      hp: 75,
      attack: 85,
      defense: 75,
      spAttack: 55,
      spDefense: 65,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 140 }, // Metal Claw
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 20 }, // Ram
      { level: 26, moveId: 141 }, // Iron Head
      { level: 34, moveId: 31 }, // Crunch
      { level: 42, moveId: 142 }, // Flash Cannon
      { level: 50, moveId: 143 }  // Heavy Slam
    ],
    description: 'Named for its bronze-colored skin, this shark hunts in large schools during sardine runs. Fast and powerful.'
  },

  // Dusky Shark - Large coastal requiem shark
  111: {
    id: 111,
    name: 'Dusky Shark',
    types: ['shark'],
    baseStats: {
      hp: 80,
      attack: 80,
      defense: 70,
      spAttack: 55,
      spDefense: 65,
      speed: 65
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 10, moveId: 2 },  // Bite
      { level: 18, moveId: 20 }, // Ram
      { level: 26, moveId: 30 }, // Pursuit
      { level: 34, moveId: 31 }, // Crunch
      { level: 42, moveId: 41 }, // Body Slam
      { level: 50, moveId: 170 }  // Leviathan Rage
    ],
    description: 'A large, slow-growing shark that can live over 40 years. Critically endangered due to its vulnerability to overfishing.'
  },

  // Sand Tiger Shark - Fearsome-looking but docile shark
  112: {
    id: 112,
    name: 'Sand Tiger Shark',
    types: ['shark'],
    baseStats: {
      hp: 85,
      attack: 75,
      defense: 70,
      spAttack: 50,
      spDefense: 65,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 8, moveId: 2 },   // Bite
      { level: 15, moveId: 111 }, // Sand Attack
      { level: 22, moveId: 20 }, // Ram
      { level: 29, moveId: 30 }, // Pursuit
      { level: 36, moveId: 31 }, // Crunch
      { level: 43, moveId: 41 }, // Body Slam
      { level: 50, moveId: 170 }  // Leviathan Rage
    ],
    description: 'Despite its fearsome rows of teeth, the Sand Tiger is docile and rarely attacks humans. Often seen in aquariums worldwide.'
  },

  // ============================================
  // LEGENDARY/APEX CREATURES (IDs 113-120)
  // ============================================

  // Great White Shark - The ultimate apex predator
  113: {
    id: 113,
    name: 'Great White Shark',
    types: ['fire', 'breaching'],
    baseStats: {
      hp: 100,
      attack: 120,
      defense: 85,
      spAttack: 70,
      spDefense: 75,
      speed: 95
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 10 },  // Ember
      { level: 10, moveId: 2 },  // Bite
      { level: 20, moveId: 20 }, // Ram
      { level: 30, moveId: 31 }, // Crunch
      { level: 40, moveId: 11 }, // Flamethrower
      { level: 50, moveId: 110 }, // Wing Attack
      { level: 60, moveId: 170 }, // Leviathan Rage
      { level: 70, moveId: 180 }  // Apex Strike
    ],
    description: 'The most feared predator in the ocean. Warm-blooded and capable of spectacular breaching attacks on prey from below.'
  },

  // Greenland Shark - Ancient arctic giant, Mew equivalent
  114: {
    id: 114,
    name: 'Greenland Shark',
    types: ['ice'],
    baseStats: {
      hp: 130,
      attack: 75,
      defense: 100,
      spAttack: 85,
      spDefense: 100,
      speed: 20
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 60 },  // Ice Shard
      { level: 15, moveId: 2 },  // Bite
      { level: 25, moveId: 61 }, // Icy Wind
      { level: 35, moveId: 31 }, // Crunch
      { level: 45, moveId: 62 }, // Blizzard
      { level: 55, moveId: 130 }, // Ancient Power
      { level: 65, moveId: 181 }  // Eternal Cold
    ],
    description: 'Can live for over 400 years, making it the longest-lived vertebrate. Moves slowly in frigid arctic waters, patient and ancient.'
  },

  // Goblin Shark - Bizarre deep-sea species
  115: {
    id: 115,
    name: 'Goblin Shark',
    types: ['deepsea'],
    baseStats: {
      hp: 75,
      attack: 95,
      defense: 60,
      spAttack: 80,
      spDefense: 70,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Shadow Sneak
      { level: 10, moveId: 2 },  // Bite
      { level: 20, moveId: 91 }, // Dark Pulse
      { level: 30, moveId: 182 }, // Jaw Thrust
      { level: 40, moveId: 31 }, // Crunch
      { level: 50, moveId: 92 }, // Phantom Force
      { level: 60, moveId: 183 }  // Abyssal Strike
    ],
    description: 'A living fossil with an extendable jaw that shoots forward to catch prey. One of the most bizarre sharks in existence.'
  },

  // Cookiecutter Shark - Small but dangerous
  116: {
    id: 116,
    name: 'Cookiecutter Shark',
    types: ['deepsea', 'fairy'],
    baseStats: {
      hp: 50,
      attack: 80,
      defense: 50,
      spAttack: 60,
      spDefense: 55,
      speed: 70
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 160 }, // Charm
      { level: 8, moveId: 2 },   // Bite
      { level: 16, moveId: 90 }, // Shadow Sneak
      { level: 24, moveId: 184 }, // Cookie Cut
      { level: 32, moveId: 31 }, // Crunch
      { level: 40, moveId: 91 }, // Dark Pulse
      { level: 48, moveId: 163 }  // Dazzling Gleam
    ],
    description: 'Takes circular bites from larger animals, leaving distinctive cookie-cutter shaped wounds. Even submarines have been attacked.'
  },

  // Elephant Fish - Chimaera with elephant-like snout
  117: {
    id: 117,
    name: 'Elephant Fish',
    types: ['ghost', 'psychic'],
    baseStats: {
      hp: 70,
      attack: 55,
      defense: 65,
      spAttack: 90,
      spDefense: 85,
      speed: 50
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 100 }, // Confusion
      { level: 10, moveId: 90 }, // Shadow Sneak
      { level: 20, moveId: 101 }, // Psybeam
      { level: 30, moveId: 92 }, // Phantom Force
      { level: 40, moveId: 102 }, // Psychic
      { level: 50, moveId: 185 }, // Spirit Sense
      { level: 60, moveId: 186 }  // Mind Read
    ],
    description: 'Uses its elongated snout to sense electrical fields of buried prey. A distant relative of sharks with cartilaginous skeleton.'
  },

  // Crocodile Shark - Small but fierce open ocean shark
  118: {
    id: 118,
    name: 'Crocodile Shark',
    types: ['deepsea'],
    baseStats: {
      hp: 55,
      attack: 75,
      defense: 55,
      spAttack: 55,
      spDefense: 50,
      speed: 75
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 90 },  // Shadow Sneak
      { level: 8, moveId: 2 },   // Bite
      { level: 16, moveId: 40 }, // Fury Swipes
      { level: 24, moveId: 30 }, // Pursuit
      { level: 32, moveId: 31 }, // Crunch
      { level: 40, moveId: 91 }, // Dark Pulse
      { level: 48, moveId: 93 }  // Night Slash
    ],
    description: 'A small but aggressive shark with huge eyes and large teeth. Named for its crocodile-like appearance and ferocity.'
  },

  // Megamouth Shark - Rare filter-feeding giant
  119: {
    id: 119,
    name: 'Megamouth Shark',
    types: ['leviathan'],
    baseStats: {
      hp: 120,
      attack: 55,
      defense: 85,
      spAttack: 75,
      spDefense: 80,
      speed: 35
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 3 },   // Tail Whip
      { level: 12, moveId: 20 }, // Ram
      { level: 24, moveId: 150 }, // Aqua Jet
      { level: 36, moveId: 151 }, // Water Pulse
      { level: 48, moveId: 41 }, // Body Slam
      { level: 60, moveId: 170 }, // Leviathan Rage
      { level: 72, moveId: 171 }  // Filter Feast
    ],
    description: 'One of the rarest sharks, with fewer than 100 sightings ever. Filter feeds on plankton with its massive luminescent mouth.'
  },

  // Frilled Shark - Living fossil from the deep
  120: {
    id: 120,
    name: 'Frilled Shark',
    types: ['fossil'],
    baseStats: {
      hp: 70,
      attack: 85,
      defense: 65,
      spAttack: 70,
      spDefense: 65,
      speed: 55
    },
    learnableMoves: [
      { level: 1, moveId: 1 },   // Tackle
      { level: 1, moveId: 130 }, // Ancient Power
      { level: 10, moveId: 2 },  // Bite
      { level: 20, moveId: 90 }, // Shadow Sneak
      { level: 30, moveId: 131 }, // Rock Slide
      { level: 40, moveId: 31 }, // Crunch
      { level: 50, moveId: 187 }, // Primordial Strike
      { level: 60, moveId: 132 }  // Stone Edge
    ],
    description: 'An eel-like shark unchanged for 80 million years. Its frilled gills and 300 trident-shaped teeth give it an ancient appearance.'
  }
};

export function getCreature(id: number): CreatureSpecies | undefined {
  return CREATURES[id];
}

export function getStarterIds(): [number, number, number] {
  return [1, 4, 7]; // Reefnip, Blackfin, Greyshade
}

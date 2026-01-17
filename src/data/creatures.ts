import type { CreatureSpecies } from '../types/index.ts';

export const CREATURES: Record<number, CreatureSpecies> = {
  // === STARTER LINE 1: Fire (Blacknose → Blacktip Reef → Oceanic Blacktip) ===
  1: {
    id: 1,
    name: 'Blacknose Shark',
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
    description: 'A curious reef shark with a distinctive dark snout. Its metabolism runs hot, warming the water around it.'
  },
  2: {
    id: 2,
    name: 'Blacktip Reef Shark',
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
    name: 'Oceanic Blacktip',
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
    description: 'The oceanic blacktip at its peak. Water sizzles in its wake as it pursues prey at blazing speed.'
  },

  // === STARTER LINE 2: Fighting (Whitenose → Whitetip Reef → Oceanic Whitetip) ===
  4: {
    id: 4,
    name: 'Whitenose Shark',
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
    description: 'A bold young shark with a pale snout. Fearlessly approaches anything new, even creatures much larger than itself.'
  },
  5: {
    id: 5,
    name: 'Whitetip Reef Shark',
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
    name: 'Oceanic Whitetip',
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

  // === STARTER LINE 3: Steel (Hardnose → Grey Reef → Silvertip) ===
  7: {
    id: 7,
    name: 'Hardnose Shark',
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
    name: 'Grey Reef Shark',
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
  }
};

export function getCreature(id: number): CreatureSpecies | undefined {
  return CREATURES[id];
}

export function getStarterIds(): [number, number, number] {
  return [1, 4, 7]; // Reefnip, Blackfin, Greyshade
}

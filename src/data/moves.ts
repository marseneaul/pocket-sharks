import type { Move } from '../types/index.ts';

export const MOVES: Record<number, Move> = {
  // Basic moves
  1: {
    id: 1,
    name: 'TACKLE',
    type: 'shark',
    category: 'physical',
    power: 40,
    accuracy: 100,
    pp: 35,
    description: 'A full-body charge attack.'
  },
  2: {
    id: 2,
    name: 'BITE',
    type: 'deepsea',
    category: 'physical',
    power: 60,
    accuracy: 100,
    pp: 25,
    description: 'Bites with sharp fangs. May cause flinching.',
    secondaryEffect: {
      chance: 0.3,
      flinch: true
    }
  },
  3: {
    id: 3,
    name: 'TAIL WHIP',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 30,
    description: 'Lowers the foe\'s Defense.',
    effect: {
      type: 'stat-change',
      target: 'enemy',
      statChanges: { defense: -1 }
    }
  },

  // Freshwater moves
  10: {
    id: 10,
    name: 'WATER GUN',
    type: 'freshwater',
    category: 'special',
    power: 40,
    accuracy: 100,
    pp: 25,
    description: 'Squirts water to attack.'
  },
  11: {
    id: 11,
    name: 'AQUA JET',
    type: 'freshwater',
    category: 'physical',
    power: 40,
    accuracy: 100,
    pp: 20,
    priority: 1,  // Always goes first
    description: 'Strikes first with a jet of water.'
  },
  12: {
    id: 12,
    name: 'WATER PULSE',
    type: 'freshwater',
    category: 'special',
    power: 60,
    accuracy: 100,
    pp: 20,
    description: 'Attacks with ultrasonic waves.'
  },
  13: {
    id: 13,
    name: 'SURF',
    type: 'freshwater',
    category: 'special',
    power: 90,
    accuracy: 100,
    pp: 15,
    description: 'A huge wave crashes down.'
  },
  14: {
    id: 14,
    name: 'HYDRO PUMP',
    type: 'freshwater',
    category: 'special',
    power: 110,
    accuracy: 80,
    pp: 5,
    description: 'Blasts water at high pressure.'
  },

  // Fighting moves
  20: {
    id: 20,
    name: 'RAM',
    type: 'fighting',
    category: 'physical',
    power: 50,
    accuracy: 100,
    pp: 25,
    description: 'Rams the foe with force.'
  },
  21: {
    id: 21,
    name: 'THRASH',
    type: 'fighting',
    category: 'physical',
    power: 75,
    accuracy: 100,
    pp: 15,
    description: 'A reckless thrashing attack.'
  },
  22: {
    id: 22,
    name: 'BRICK BREAK',
    type: 'fighting',
    category: 'physical',
    power: 75,
    accuracy: 100,
    pp: 15,
    description: 'A powerful strike that breaks barriers.'
  },
  23: {
    id: 23,
    name: 'CLOSE COMBAT',
    type: 'fighting',
    category: 'physical',
    power: 120,
    accuracy: 100,
    pp: 5,
    description: 'All-out attack that lowers own defenses.'
  },

  // Deepsea moves
  30: {
    id: 30,
    name: 'PURSUIT',
    type: 'deepsea',
    category: 'physical',
    power: 40,
    accuracy: 100,
    pp: 20,
    description: 'Chases down fleeing foes.'
  },
  31: {
    id: 31,
    name: 'CRUNCH',
    type: 'deepsea',
    category: 'physical',
    power: 80,
    accuracy: 100,
    pp: 15,
    description: 'Crunches with powerful jaws. May lower Defense.',
    secondaryEffect: {
      chance: 0.2,
      statChanges: { defense: -1 }
    }
  },

  // Psychic moves
  40: {
    id: 40,
    name: 'CONFUSION',
    type: 'psychic',
    category: 'special',
    power: 50,
    accuracy: 100,
    pp: 25,
    description: 'A weak psychic attack.'
  },
  41: {
    id: 41,
    name: 'PSYBEAM',
    type: 'psychic',
    category: 'special',
    power: 65,
    accuracy: 100,
    pp: 20,
    description: 'Fires a peculiar ray.'
  },
  42: {
    id: 42,
    name: 'PSYCHIC',
    type: 'psychic',
    category: 'special',
    power: 90,
    accuracy: 100,
    pp: 10,
    description: 'A strong psychic attack.'
  },

  // Electric moves
  50: {
    id: 50,
    name: 'SPARK',
    type: 'electric',
    category: 'physical',
    power: 65,
    accuracy: 100,
    pp: 20,
    description: 'An electrically charged tackle. May paralyze.',
    secondaryEffect: {
      chance: 0.3,
      status: 'paralyzed'
    }
  },
  51: {
    id: 51,
    name: 'THUNDER SHOCK',
    type: 'electric',
    category: 'special',
    power: 40,
    accuracy: 100,
    pp: 30,
    description: 'An electric shock attack. May paralyze.',
    secondaryEffect: {
      chance: 0.1,
      status: 'paralyzed'
    }
  },

  // Fire moves
  60: {
    id: 60,
    name: 'EMBER',
    type: 'fire',
    category: 'special',
    power: 40,
    accuracy: 100,
    pp: 25,
    description: 'A small flame attack. May burn.',
    secondaryEffect: {
      chance: 0.1,
      status: 'burned'
    }
  },
  61: {
    id: 61,
    name: 'FIRE FANG',
    type: 'fire',
    category: 'physical',
    power: 65,
    accuracy: 95,
    pp: 15,
    description: 'Bites with heated fangs. May burn.',
    secondaryEffect: {
      chance: 0.1,
      status: 'burned'
    }
  },
  62: {
    id: 62,
    name: 'FLAME BURST',
    type: 'fire',
    category: 'special',
    power: 70,
    accuracy: 100,
    pp: 15,
    description: 'A burst of spreading flames.'
  },
  63: {
    id: 63,
    name: 'FLAMETHROWER',
    type: 'fire',
    category: 'special',
    power: 90,
    accuracy: 100,
    pp: 15,
    description: 'A powerful stream of fire. May burn.',
    secondaryEffect: {
      chance: 0.1,
      status: 'burned'
    }
  },

  // Steel moves
  70: {
    id: 70,
    name: 'METAL CLAW',
    type: 'steel',
    category: 'physical',
    power: 50,
    accuracy: 95,
    pp: 35,
    description: 'Rakes with steel-hard fins.'
  },
  71: {
    id: 71,
    name: 'IRON HEAD',
    type: 'steel',
    category: 'physical',
    power: 80,
    accuracy: 100,
    pp: 15,
    description: 'Rams with a hardened head.'
  },
  72: {
    id: 72,
    name: 'STEEL WING',
    type: 'steel',
    category: 'physical',
    power: 70,
    accuracy: 90,
    pp: 25,
    description: 'Strikes with metallic fins.'
  },
  73: {
    id: 73,
    name: 'IRON TAIL',
    type: 'steel',
    category: 'physical',
    power: 100,
    accuracy: 75,
    pp: 15,
    description: 'Slams with a steel-hard tail.'
  },

  // Ground moves
  80: {
    id: 80,
    name: 'SAND ATTACK',
    type: 'ground',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 15,
    description: 'Kicks sand to lower accuracy.',
    effect: {
      type: 'stat-change',
      target: 'enemy',
      statChanges: { speed: -1 }
    }
  },
  81: {
    id: 81,
    name: 'MUD SHOT',
    type: 'ground',
    category: 'special',
    power: 55,
    accuracy: 95,
    pp: 15,
    description: 'Hurls mud at the target.'
  },

  // Breaching moves
  90: {
    id: 90,
    name: 'WING ATTACK',
    type: 'breaching',
    category: 'physical',
    power: 60,
    accuracy: 100,
    pp: 35,
    description: 'Strikes with fins like wings.'
  },
  91: {
    id: 91,
    name: 'AERIAL ACE',
    type: 'breaching',
    category: 'physical',
    power: 60,
    accuracy: 100,
    pp: 20,
    description: 'An unavoidable aerial strike.'
  },

  // Algae moves
  100: {
    id: 100,
    name: 'VINE WHIP',
    type: 'algae',
    category: 'physical',
    power: 45,
    accuracy: 100,
    pp: 25,
    description: 'Whips with kelp-like tendrils.'
  },
  101: {
    id: 101,
    name: 'ABSORB',
    type: 'algae',
    category: 'special',
    power: 40,
    accuracy: 100,
    pp: 25,
    description: 'Drains nutrients from the foe.'
  },

  // Ice moves
  110: {
    id: 110,
    name: 'POWDER SNOW',
    type: 'ice',
    category: 'special',
    power: 40,
    accuracy: 100,
    pp: 25,
    description: 'A chilling flurry of snow. May freeze.',
    secondaryEffect: {
      chance: 0.1,
      status: 'frozen'
    }
  },
  111: {
    id: 111,
    name: 'ICE FANG',
    type: 'ice',
    category: 'physical',
    power: 65,
    accuracy: 95,
    pp: 15,
    description: 'Bites with freezing fangs. May freeze.',
    secondaryEffect: {
      chance: 0.1,
      status: 'frozen'
    }
  },

  // Fairy moves
  120: {
    id: 120,
    name: 'FAIRY WIND',
    type: 'fairy',
    category: 'special',
    power: 40,
    accuracy: 100,
    pp: 30,
    description: 'A mystical breeze attack.'
  },
  121: {
    id: 121,
    name: 'DAZZLE',
    type: 'fairy',
    category: 'special',
    power: 65,
    accuracy: 100,
    pp: 20,
    description: 'A dazzling flash of light.'
  },

  // Ghost moves
  130: {
    id: 130,
    name: 'LICK',
    type: 'ghost',
    category: 'physical',
    power: 30,
    accuracy: 100,
    pp: 30,
    description: 'An eerie lick that may paralyze.',
    secondaryEffect: {
      chance: 0.3,
      status: 'paralyzed'
    }
  },
  131: {
    id: 131,
    name: 'SHADOW SNEAK',
    type: 'ghost',
    category: 'physical',
    power: 40,
    accuracy: 100,
    pp: 30,
    priority: 1,  // Always goes first
    description: 'Attacks from the shadows first.'
  },
  132: {
    id: 132,
    name: 'SHADOW BALL',
    type: 'ghost',
    category: 'special',
    power: 80,
    accuracy: 100,
    pp: 15,
    description: 'Hurls a shadowy blob.'
  },

  // Deepsea moves
  140: {
    id: 140,
    name: 'JAW LOCK',
    type: 'deepsea',
    category: 'physical',
    power: 80,
    accuracy: 100,
    pp: 10,
    description: 'Locks jaws onto the foe.'
  },

  // Poison moves
  150: {
    id: 150,
    name: 'POISON STING',
    type: 'poison',
    category: 'physical',
    power: 15,
    accuracy: 100,
    pp: 35,
    description: 'A toxic barb strike.'
  },
  151: {
    id: 151,
    name: 'TOXIC',
    type: 'poison',
    category: 'status',
    power: 0,
    accuracy: 90,
    pp: 10,
    description: 'Badly poisons the target.',
    effect: {
      type: 'status',
      target: 'enemy',
      status: 'poisoned'
    }
  },

  // Fossil moves
  160: {
    id: 160,
    name: 'ROCK THROW',
    type: 'fossil',
    category: 'physical',
    power: 50,
    accuracy: 90,
    pp: 15,
    description: 'Hurls ancient stones.'
  },
  161: {
    id: 161,
    name: 'ANCIENT POWER',
    type: 'fossil',
    category: 'special',
    power: 60,
    accuracy: 100,
    pp: 5,
    description: 'Channels primordial energy.'
  },

  // Leviathan moves
  170: {
    id: 170,
    name: 'LEVIATHAN RAGE',
    type: 'leviathan',
    category: 'special',
    power: 80,
    accuracy: 100,
    pp: 10,
    description: 'Unleashes titanic fury.'
  },

  // Additional Electric move
  52: {
    id: 52,
    name: 'THUNDERBOLT',
    type: 'electric',
    category: 'special',
    power: 90,
    accuracy: 100,
    pp: 15,
    description: 'A strong electrical attack. May paralyze.',
    secondaryEffect: {
      chance: 0.1,
      status: 'paralyzed'
    }
  },

  // Status moves
  53: {
    id: 53,
    name: 'THUNDER WAVE',
    type: 'electric',
    category: 'status',
    power: 0,
    accuracy: 90,
    pp: 20,
    description: 'A weak electric shock that paralyzes.',
    effect: {
      type: 'status',
      target: 'enemy',
      status: 'paralyzed'
    }
  },
  54: {
    id: 54,
    name: 'STUN SPORE',
    type: 'algae',
    category: 'status',
    power: 0,
    accuracy: 75,
    pp: 30,
    description: 'Scatters paralyzing spores.',
    effect: {
      type: 'status',
      target: 'enemy',
      status: 'paralyzed'
    }
  },

  // Fire status move
  64: {
    id: 64,
    name: 'WILL-O-WISP',
    type: 'fire',
    category: 'status',
    power: 0,
    accuracy: 85,
    pp: 15,
    description: 'Eerie flames that inflict a burn.',
    effect: {
      type: 'status',
      target: 'enemy',
      status: 'burned'
    }
  },

  // Psychic status moves
  43: {
    id: 43,
    name: 'HYPNOSIS',
    type: 'psychic',
    category: 'status',
    power: 0,
    accuracy: 60,
    pp: 20,
    description: 'A hypnotic suggestion that puts the foe to sleep.',
    effect: {
      type: 'status',
      target: 'enemy',
      status: 'asleep'
    }
  },
  44: {
    id: 44,
    name: 'SLEEP POWDER',
    type: 'algae',
    category: 'status',
    power: 0,
    accuracy: 75,
    pp: 15,
    description: 'Scatters sleep-inducing dust.',
    effect: {
      type: 'status',
      target: 'enemy',
      status: 'asleep'
    }
  },

  // Ice moves with freeze chance
  112: {
    id: 112,
    name: 'ICE BEAM',
    type: 'ice',
    category: 'special',
    power: 90,
    accuracy: 100,
    pp: 10,
    description: 'Fires an icy beam. May freeze.',
    secondaryEffect: {
      chance: 0.1,
      status: 'frozen'
    }
  },
  113: {
    id: 113,
    name: 'BLIZZARD',
    type: 'ice',
    category: 'special',
    power: 110,
    accuracy: 70,
    pp: 5,
    description: 'A howling blizzard. May freeze.',
    secondaryEffect: {
      chance: 0.1,
      status: 'frozen'
    }
  },

  // Powder Snow should have freeze chance
  // (overwriting existing entry 110)

  // Crunch with defense drop
  // Already exists at 31, let's add secondary effect

  // Additional moves with secondary effects
  65: {
    id: 65,
    name: 'SCALD',
    type: 'freshwater',
    category: 'special',
    power: 80,
    accuracy: 100,
    pp: 15,
    description: 'Shoots boiling water. May burn.',
    secondaryEffect: {
      chance: 0.3,
      status: 'burned'
    }
  },

  // Body Slam with paralysis
  4: {
    id: 4,
    name: 'BODY SLAM',
    type: 'shark',
    category: 'physical',
    power: 85,
    accuracy: 100,
    pp: 15,
    description: 'A full-body slam attack. May paralyze.',
    secondaryEffect: {
      chance: 0.3,
      status: 'paralyzed'
    }
  },

  // Sludge Bomb with poison
  152: {
    id: 152,
    name: 'SLUDGE BOMB',
    type: 'poison',
    category: 'special',
    power: 90,
    accuracy: 100,
    pp: 10,
    description: 'Hurls toxic sludge. May poison.',
    secondaryEffect: {
      chance: 0.3,
      status: 'poisoned'
    }
  },

  // Poison Jab
  153: {
    id: 153,
    name: 'POISON JAB',
    type: 'poison',
    category: 'physical',
    power: 80,
    accuracy: 100,
    pp: 20,
    description: 'Stabs with a toxic barb. May poison.',
    secondaryEffect: {
      chance: 0.3,
      status: 'poisoned'
    }
  },

  // Priority moves
  5: {
    id: 5,
    name: 'QUICK STRIKE',
    type: 'shark',
    category: 'physical',
    power: 40,
    accuracy: 100,
    pp: 30,
    priority: 1,  // Always goes first
    description: 'A lightning-fast strike that always goes first.'
  },
  6: {
    id: 6,
    name: 'EXTREME SPEED',
    type: 'shark',
    category: 'physical',
    power: 80,
    accuracy: 100,
    pp: 5,
    priority: 2,  // Even higher priority
    description: 'An extremely fast attack with high priority.'
  },
  32: {
    id: 32,
    name: 'SUCKER PUNCH',
    type: 'deepsea',
    category: 'physical',
    power: 70,
    accuracy: 100,
    pp: 5,
    priority: 1,  // Goes first
    description: 'A sneaky attack that goes first if the foe is attacking.'
  },

  // Stat-boosting moves
  7: {
    id: 7,
    name: 'SHARPEN',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 30,
    description: 'Sharpens claws to raise Attack.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { attack: 1 }
    }
  },
  8: {
    id: 8,
    name: 'SWORDS DANCE',
    type: 'fighting',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 20,
    description: 'A frenetic dance to sharply raise Attack.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { attack: 2 }
    }
  },
  9: {
    id: 9,
    name: 'HARDEN',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 30,
    description: 'Stiffens the body to raise Defense.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { defense: 1 }
    }
  },
  15: {
    id: 15,
    name: 'IRON DEFENSE',
    type: 'steel',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 15,
    description: 'Hardens the body to sharply raise Defense.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { defense: 2 }
    }
  },
  16: {
    id: 16,
    name: 'AGILITY',
    type: 'psychic',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 30,
    description: 'Relaxes and lightens the body to sharply raise Speed.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { speed: 2 }
    }
  },
  17: {
    id: 17,
    name: 'CALM MIND',
    type: 'psychic',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 20,
    description: 'Focuses the mind to raise Sp. Atk and Sp. Def.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { spAttack: 1, spDefense: 1 }
    }
  },
  18: {
    id: 18,
    name: 'DRAGON DANCE',
    type: 'leviathan',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 20,
    description: 'A mystical dance that raises Attack and Speed.',
    effect: {
      type: 'stat-change',
      target: 'self',
      statChanges: { attack: 1, speed: 1 }
    }
  },

  // Stat-lowering moves
  19: {
    id: 19,
    name: 'GROWL',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 40,
    description: 'Growls to lower the foe\'s Attack.',
    effect: {
      type: 'stat-change',
      target: 'enemy',
      statChanges: { attack: -1 }
    }
  },
  24: {
    id: 24,
    name: 'LEER',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 30,
    description: 'Leers at the foe to lower its Defense.',
    effect: {
      type: 'stat-change',
      target: 'enemy',
      statChanges: { defense: -1 }
    }
  },
  25: {
    id: 25,
    name: 'SCREECH',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 85,
    pp: 40,
    description: 'An earsplitting screech that harshly lowers Defense.',
    effect: {
      type: 'stat-change',
      target: 'enemy',
      statChanges: { defense: -2 }
    }
  },
  26: {
    id: 26,
    name: 'SCARY FACE',
    type: 'shark',
    category: 'status',
    power: 0,
    accuracy: 100,
    pp: 10,
    description: 'Frightens the foe to harshly lower its Speed.',
    effect: {
      type: 'stat-change',
      target: 'enemy',
      statChanges: { speed: -2 }
    }
  }
};

export function getMove(id: number): Move | undefined {
  return MOVES[id];
}

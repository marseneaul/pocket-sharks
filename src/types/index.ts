// Ocean-themed elemental types (18 types)
export type ElementType =
  | 'shark'       // Normal equivalent - base shark type
  | 'leviathan'   // Dragon equivalent - great whites, megalodon
  | 'breaching'   // Flying equivalent - spinners, rays, threshers
  | 'fighting'    // Bull sharks, aggressive hunters
  | 'psychic'     // Hammerheads, mystical species
  | 'freshwater'  // Water equivalent - river sharks
  | 'fire'        // Blacktip species, warm-blooded
  | 'fairy'       // Basking, megamouth, catsharks
  | 'algae'       // Grass equivalent - wobbegong, kelp sharks
  | 'steel'       // Silvertip, sawfish, whale shark
  | 'ghost'       // Chimaeras, ghost sharks
  | 'deepsea'     // Dark equivalent - goblin, cookiecutter
  | 'poison'      // Dogfish, stingrays
  | 'ray'         // Bug equivalent - all rays
  | 'ice'         // Greenland, sleeper sharks
  | 'electric'    // Mako, lanternshark, torpedo ray
  | 'fossil'      // Rock equivalent - helicoprion, ancient sharks
  | 'ground';     // Skates, angelshark, epaulette

// Status conditions
export type StatusCondition =
  | 'paralyzed'
  | 'poisoned'
  | 'burned'
  | 'frozen'
  | 'asleep'
  | null;

// Move category
export type MoveCategory = 'physical' | 'special' | 'status';

// Stats structure
export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

// Move effect types
export interface MoveEffect {
  type: 'damage' | 'status' | 'stat-change' | 'heal';
  target: 'self' | 'enemy';
  status?: StatusCondition;
  statChanges?: Partial<Record<keyof Stats, number>>;
  healPercent?: number;
}

// Move definition (template)
export interface Move {
  id: number;
  name: string;
  type: ElementType;
  category: MoveCategory;
  power: number;
  accuracy: number;
  pp: number;
  description: string;
  effect?: MoveEffect;
}

// Move instance (in battle, tracks PP usage)
export interface MoveInstance {
  move: Move;
  currentPp: number;
}

// Creature species definition (template)
export interface CreatureSpecies {
  id: number;
  name: string;
  types: [ElementType] | [ElementType, ElementType];
  baseStats: Stats;
  learnableMoves: { level: number; moveId: number }[];
  evolvesTo?: { speciesId: number; level: number };
  description: string;
}

// Creature instance (actual creature in party/battle)
export interface CreatureInstance {
  species: CreatureSpecies;
  nickname?: string;
  level: number;
  currentHp: number;
  maxHp: number;
  stats: Stats;
  moves: MoveInstance[];
  status: StatusCondition;
  exp: number;
}

// Battle phases
export type BattlePhase =
  | 'intro'
  | 'select-action'
  | 'select-move'
  | 'executing'
  | 'animating'
  | 'message'
  | 'victory'
  | 'defeat';

// Battle action types
export type BattleAction =
  | { type: 'fight'; moveIndex: number }
  | { type: 'item'; itemId: number }
  | { type: 'switch'; creatureIndex: number }
  | { type: 'run' };

// Battle state
export interface BattleState {
  playerCreature: CreatureInstance;
  enemyCreature: CreatureInstance;
  phase: BattlePhase;
  message: string;
  messageQueue: string[];
  menuIndex: number;
  moveMenuIndex: number;
  playerAction: BattleAction | null;
  enemyAction: BattleAction | null;
  isWildBattle: boolean;
  canRun: boolean;
  animatingHp: {
    player: number;
    enemy: number;
  };
}

// Type effectiveness result
export type Effectiveness = 0 | 0.5 | 1 | 2;

// Input state
export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  a: boolean;
  b: boolean;
  start: boolean;
  select: boolean;
  l: boolean;
  r: boolean;
}

// Input event (pressed this frame)
export interface InputEvent {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  a: boolean;
  b: boolean;
  start: boolean;
  select: boolean;
  l: boolean;
  r: boolean;
}

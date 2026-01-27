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

// Individual Values (IVs) - genetic potential for each stat (0-31)
export interface IVs {
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

// Secondary effect (chance-based effect on damaging moves)
export interface SecondaryEffect {
  chance: number;  // 0-1 probability
  status?: StatusCondition;
  statChanges?: Partial<Record<keyof Stats, number>>;
  flinch?: boolean;
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
  secondaryEffect?: SecondaryEffect;  // Chance-based effect on hit
  priority?: number;  // Move priority (-7 to +7, default 0)
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

// Import NatureId type for creature instances
import type { NatureId } from '../data/natures.ts';

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
  ivs?: IVs;          // Individual Values (optional for backwards compat)
  nature?: NatureId;  // Nature affecting stats (optional for backwards compat)
}

// Egg instance (egg in party, not a creature)
export interface EggInstance {
  isEgg: true;            // Type discriminator
  eggItemId: number;      // References egg data in eggs.ts
  stepsRemaining: number; // Steps until hatch
  nickname?: string;      // Optional nickname for the egg
}

// Party member can be either a creature or an egg
export type PartyMember = CreatureInstance | EggInstance;

// Type guard to check if a party member is an egg
export function isEgg(member: PartyMember): member is EggInstance {
  return 'isEgg' in member && member.isEgg === true;
}

// Type guard to check if a party member is a creature
export function isCreature(member: PartyMember): member is CreatureInstance {
  return !isEgg(member);
}

// Battle phases
export type BattlePhase =
  | 'intro'
  | 'select-action'
  | 'select-move'
  | 'executing'
  | 'animating'
  | 'message'
  | 'turn-end'       // After first attacker's messages, before second
  | 'victory'
  | 'defeat';

// Battle action types
export type BattleAction =
  | { type: 'fight'; moveIndex: number }
  | { type: 'item'; itemId: number }
  | { type: 'switch'; creatureIndex: number }
  | { type: 'run' };

// Entry animation phases
export type EntryAnimationPhase = 'enemy-enter' | 'player-enter' | 'complete';

// Attack animation types
export type AttackAnimationType = 'physical' | 'special' | 'status';

// Attack animation state
export interface AttackAnimation {
  active: boolean;
  type: AttackAnimationType;
  attacker: 'player' | 'enemy';
  progress: number;  // 0-1
  hitSoundPlayed: boolean;  // Track if hit sound was played this animation
}

// Turn execution tracking
export interface TurnState {
  turnOrder: ('player' | 'enemy')[];  // Order of attackers this turn
  currentTurnIndex: number;           // 0 = first attacker, 1 = second attacker
  firstAttackDone: boolean;           // Has first attack finished (messages shown)
}

// Cage animation phases
export type CageAnimationPhase = 'idle' | 'throwing' | 'shaking' | 'caught' | 'escaped';

// Cage animation state
export interface CageAnimation {
  active: boolean;
  phase: CageAnimationPhase;
  progress: number;      // 0-1 normalized
  shakeCount: number;    // 0-3 shakes completed
  maxShakes: number;     // Target shakes before catch/escape
  success: boolean;      // Whether catch succeeds
}

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
  // Entry animation state
  entryAnimation: {
    phase: EntryAnimationPhase;
    progress: number;  // 0-1
  };
  // Attack animation state
  attackAnimation: AttackAnimation;
  // Turn execution tracking
  turnState: TurnState;
  // Cage catching animation
  cageAnimation: CageAnimation;
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

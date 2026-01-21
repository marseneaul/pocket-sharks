import type { GameState, GameMode, OverworldState, PlayerState, MapData, NPC } from '../types/overworld.ts';
import type { BattleState, CreatureInstance } from '../types/index.ts';
import type { InventorySlot } from '../data/items.ts';
import { createCreatureInstance, createBattleState, initBattle } from './battle.ts';
import { getCreature } from '../data/creatures.ts';

// Screen transition state
export interface TransitionState {
  active: boolean;
  type: 'fade-out' | 'fade-in';
  progress: number;  // 0-1
  duration: number;  // ms
  onMidpoint?: () => void;  // Called when fade-out completes
}

const TRANSITION_DURATION = 250;  // ms for each fade direction

let transitionState: TransitionState = {
  active: false,
  type: 'fade-out',
  progress: 0,
  duration: TRANSITION_DURATION
};

let gameState: GameState;
let battleState: BattleState | null = null;
let currentTrainerNpc: NPC | null = null;  // Track current trainer for post-battle
let trainerCreatureIndex: number = 0;      // Track which creature in trainer's team
let playerMoney: number = 500;             // Player's starting money
let playerInventory: InventorySlot[] = [   // Player's items
  { itemId: 1, quantity: 5 },  // Start with 5 Shark Balls
  { itemId: 10, quantity: 3 }  // Start with 3 Potions
];
const MAX_PARTY_SIZE = 6;

export function initGameState(): void {
  // Initialize player without a starter (will be chosen later)
  const player: PlayerState = {
    x: 10,
    y: 14,
    pixelX: 10 * 8,
    pixelY: 14 * 8,
    facing: 'up',
    isMoving: false,
    isSwimming: false,
    moveProgress: 0,
    party: []  // Empty until starter is chosen
  };

  // Maps will be loaded separately
  gameState = {
    mode: 'overworld',
    overworld: {
      player,
      currentMap: null as unknown as MapData, // Will be set when map loads
      maps: new Map()
    }
  };
}

export function getGameState(): GameState {
  return gameState;
}

export function getOverworldState(): OverworldState {
  return gameState.overworld;
}

export function getPlayer(): PlayerState {
  return gameState.overworld.player;
}

export function getGameMode(): GameMode {
  return gameState.mode;
}

export function setGameMode(mode: GameMode): void {
  gameState.mode = mode;
}

// Transition system
export function getTransitionState(): TransitionState {
  return transitionState;
}

export function isTransitioning(): boolean {
  return transitionState.active;
}

export function startTransition(onMidpoint: () => void): void {
  transitionState = {
    active: true,
    type: 'fade-out',
    progress: 0,
    duration: TRANSITION_DURATION,
    onMidpoint
  };
}

export function updateTransition(deltaTime: number): void {
  if (!transitionState.active) return;

  const progressDelta = deltaTime / transitionState.duration;
  transitionState.progress += progressDelta;

  if (transitionState.progress >= 1) {
    if (transitionState.type === 'fade-out') {
      // Midpoint reached - execute callback and start fade-in
      if (transitionState.onMidpoint) {
        transitionState.onMidpoint();
      }
      transitionState.type = 'fade-in';
      transitionState.progress = 0;
    } else {
      // Fade-in complete
      transitionState.active = false;
      transitionState.progress = 0;
    }
  }
}

export function getTransitionAlpha(): number {
  if (!transitionState.active) return 0;

  if (transitionState.type === 'fade-out') {
    return transitionState.progress;  // 0 → 1
  } else {
    return 1 - transitionState.progress;  // 1 → 0
  }
}

export function getCurrentMap(): MapData {
  return gameState.overworld.currentMap;
}

export function setCurrentMap(map: MapData): void {
  gameState.overworld.currentMap = map;
  gameState.overworld.maps.set(map.id, map);
}

export function getMap(id: string): MapData | undefined {
  return gameState.overworld.maps.get(id);
}

export function registerMap(map: MapData): void {
  gameState.overworld.maps.set(map.id, map);
}

// Battle management
export function getBattleState(): BattleState | null {
  return battleState;
}

// Internal battle start (called after transition)
function _startWildBattleInternal(enemyCreature: CreatureInstance): void {
  const playerCreature = gameState.overworld.player.party[0];
  if (!playerCreature) throw new Error('No creature in party');

  currentTrainerNpc = null;
  trainerCreatureIndex = 0;

  battleState = createBattleState(playerCreature, enemyCreature, true);
  initBattle(battleState);
  gameState.mode = 'battle';
}

function _startTrainerBattleInternal(npc: NPC): void {
  if (!npc.trainer || npc.defeated) return;

  const playerCreature = gameState.overworld.player.party[0];
  if (!playerCreature) throw new Error('No creature in party');

  currentTrainerNpc = npc;
  trainerCreatureIndex = 0;

  // Create first enemy creature from trainer's team
  const firstEnemy = npc.trainer.team[0];
  const enemySpecies = getCreature(firstEnemy.speciesId);
  if (!enemySpecies) throw new Error('Trainer species not found');

  const enemyCreature = createCreatureInstance(enemySpecies, firstEnemy.level);

  battleState = createBattleState(playerCreature, enemyCreature, false);
  battleState.canRun = false;  // Can't run from trainer battles
  initBattle(battleState);
  gameState.mode = 'battle';
}

// Public battle start functions with transitions
export function startWildBattle(enemyCreature: CreatureInstance): void {
  startTransition(() => _startWildBattleInternal(enemyCreature));
}

export function startTrainerBattle(npc: NPC): void {
  if (!npc.trainer || npc.defeated) return;
  startTransition(() => _startTrainerBattleInternal(npc));
}

export function isTrainerBattle(): boolean {
  return currentTrainerNpc !== null;
}

export function getCurrentTrainer(): NPC | null {
  return currentTrainerNpc;
}

export function getPlayerMoney(): number {
  return playerMoney;
}

export function addMoney(amount: number): void {
  playerMoney += amount;
}

export function spendMoney(amount: number): boolean {
  if (playerMoney < amount) return false;
  playerMoney -= amount;
  return true;
}

// Check if trainer has more creatures to send out
export function trainerHasMoreCreatures(): boolean {
  if (!currentTrainerNpc?.trainer) return false;
  return trainerCreatureIndex < currentTrainerNpc.trainer.team.length - 1;
}

// Send out trainer's next creature
export function sendOutNextTrainerCreature(): CreatureInstance | null {
  if (!currentTrainerNpc?.trainer) return null;

  trainerCreatureIndex++;
  const nextEnemy = currentTrainerNpc.trainer.team[trainerCreatureIndex];
  if (!nextEnemy) return null;

  const enemySpecies = getCreature(nextEnemy.speciesId);
  if (!enemySpecies) return null;

  return createCreatureInstance(enemySpecies, nextEnemy.level);
}

function _endBattleInternal(): void {
  // Sync all creature data from battle back to party
  if (battleState) {
    const partyCreature = gameState.overworld.player.party[0];
    const battleCreature = battleState.playerCreature;

    // Sync HP, PP, moves
    partyCreature.currentHp = battleCreature.currentHp;
    partyCreature.moves = battleCreature.moves;

    // Sync exp, level, stats (from leveling up)
    partyCreature.exp = battleCreature.exp;
    partyCreature.level = battleCreature.level;
    partyCreature.stats = battleCreature.stats;
    partyCreature.maxHp = battleCreature.maxHp;

    // Sync species (in case of evolution)
    partyCreature.species = battleCreature.species;

    // Handle trainer battle victory
    if (currentTrainerNpc?.trainer && battleState.phase === 'victory') {
      currentTrainerNpc.defeated = true;
      playerMoney += currentTrainerNpc.trainer.prizeMoney;

      // Gym leader TM rewards
      if (currentTrainerNpc.id === 'gym-leader-marina') {
        // TM01 - Confusion from Coral Gym
        addItem(50, 1);
      } else if (currentTrainerNpc.id === 'gym-leader-volt') {
        // TM02 - Thunderbolt from Kelp Gym
        addItem(51, 1);
      } else if (currentTrainerNpc.id === 'finner-boss') {
        // TM03 - Shadow Ball from defeating Boss Finley
        addItem(52, 1);
      }
    }
  }

  battleState = null;
  currentTrainerNpc = null;
  trainerCreatureIndex = 0;
  gameState.mode = 'overworld';
}

export function endBattle(): void {
  startTransition(_endBattleInternal);
}

// Heal party at healing pool
export function healParty(): void {
  for (const creature of gameState.overworld.player.party) {
    creature.currentHp = creature.maxHp;
    for (const move of creature.moves) {
      move.currentPp = move.move.pp;
    }
  }
}

// Inventory management
export function getInventory(): InventorySlot[] {
  return playerInventory;
}

export function getItemCount(itemId: number): number {
  const slot = playerInventory.find(s => s.itemId === itemId);
  return slot?.quantity || 0;
}

export function addItem(itemId: number, quantity: number = 1): void {
  const slot = playerInventory.find(s => s.itemId === itemId);
  if (slot) {
    slot.quantity += quantity;
  } else {
    playerInventory.push({ itemId, quantity });
  }
}

export function removeItem(itemId: number, quantity: number = 1): boolean {
  const slot = playerInventory.find(s => s.itemId === itemId);
  if (!slot || slot.quantity < quantity) return false;

  slot.quantity -= quantity;
  if (slot.quantity <= 0) {
    const index = playerInventory.indexOf(slot);
    playerInventory.splice(index, 1);
  }
  return true;
}

// Party management
export function canAddToParty(): boolean {
  return gameState.overworld.player.party.length < MAX_PARTY_SIZE;
}

export function addToParty(creature: CreatureInstance): boolean {
  if (!canAddToParty()) return false;
  gameState.overworld.player.party.push(creature);
  return true;
}

export function getPartySize(): number {
  return gameState.overworld.player.party.length;
}

export function getParty(): CreatureInstance[] {
  return gameState.overworld.player.party;
}

export function setStarterCreature(speciesId: number): void {
  const starterSpecies = getCreature(speciesId);
  if (!starterSpecies) throw new Error('Starter species not found');

  const starter = createCreatureInstance(starterSpecies, 5);
  gameState.overworld.player.party = [starter];
}

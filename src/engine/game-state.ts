import type { GameState, GameMode, OverworldState, PlayerState, MapData, NPC, CertificationLevel, GroundEgg, Direction } from '../types/overworld.ts';
import { CERT_HIERARCHY } from '../types/overworld.ts';
import type { BattleState, CreatureInstance, PartyMember, EggInstance, StatusCondition } from '../types/index.ts';
import { getBadgeByGymLeader, type BadgeId } from '../data/badges.ts';
import { type StoryFlagId, GYM_LEADER_FLAGS, BADGE_UNLOCKS } from '../data/story-flags.ts';
import { isEgg, isCreature } from '../types/index.ts';
import type { InventorySlot } from '../data/items.ts';
import { getItem } from '../data/items.ts';
import { createCreatureInstance, createBattleState, initBattle } from './battle.ts';
import { cureStatus } from './status-effects.ts';
import { getCreature } from '../data/creatures.ts';
import { getEgg } from '../data/eggs.ts';
import { playBattleMusic, playOverworldMusic } from './audio.ts';
import { initStorage } from './storage.ts';

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
  { itemId: 1, quantity: 5 },  // Start with 5 Shark Cages
  { itemId: 10, quantity: 3 }  // Start with 3 Potions
];
const MAX_PARTY_SIZE = 6;

// Progress tracking
let defeatedTrainers: Set<string> = new Set();
let collectedEggs: Set<string> = new Set();
let storyFlags: Set<StoryFlagId> = new Set();

// Repel tracking
let repelStepsRemaining: number = 0;

export function initGameState(): void {
  // Reset module-level state
  playerMoney = 500;
  playerInventory = [
    { itemId: 1, quantity: 5 },  // Start with 5 Shark Cages
    { itemId: 10, quantity: 3 }, // Start with 3 Potions
    { itemId: 60, quantity: 1 }  // Start with Old Rod (for testing fishing)
  ];
  defeatedTrainers.clear();
  collectedEggs.clear();
  storyFlags.clear();
  repelStepsRemaining = 0;

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
    party: [],  // Empty until starter is chosen
    stepCount: 0,  // For egg hatching
    certifications: ['wading'],  // Start with basic wading/snorkeling
    badges: []  // No badges at start
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

// Reset game state for new game (preserves map registry)
export function resetForNewGame(startingMapId: string = 'scripps-lab'): void {
  // Reset module-level state
  playerMoney = 500;
  playerInventory = [
    { itemId: 1, quantity: 5 },  // Start with 5 Shark Cages
    { itemId: 10, quantity: 3 }, // Start with 3 Potions
    { itemId: 60, quantity: 1 }  // Start with Old Rod (for testing fishing)
  ];
  defeatedTrainers.clear();
  collectedEggs.clear();
  storyFlags.clear();
  repelStepsRemaining = 0;
  battleState = null;
  currentTrainerNpc = null;
  trainerCreatureIndex = 0;

  // Reset player state
  const player = gameState.overworld.player;
  player.x = 10;
  player.y = 10;
  player.pixelX = player.x * 8;
  player.pixelY = player.y * 8;
  player.facing = 'up';
  player.isMoving = false;
  player.isSwimming = false;
  player.moveProgress = 0;
  player.party = [];
  player.stepCount = 0;
  player.certifications = ['wading'];
  player.badges = [];

  // Reset NPC states on all maps
  for (const map of gameState.overworld.maps.values()) {
    for (const npc of map.npcs) {
      if (npc.trainer) {
        npc.defeated = false;
      }
    }
    if (map.groundEggs) {
      for (const egg of map.groundEggs) {
        egg.collected = false;
      }
    }
  }

  // Reset PC storage
  initStorage();

  // Set starting map
  const startMap = gameState.overworld.maps.get(startingMapId);
  if (startMap) {
    gameState.overworld.currentMap = startMap;
  }
}

export function getOverworldState(): OverworldState {
  return gameState.overworld;
}

export function getPlayer(): PlayerState {
  return gameState.overworld.player;
}

export function setPlayerPosition(x: number, y: number, facing: Direction): void {
  const player = gameState.overworld.player;
  player.x = x;
  player.y = y;
  player.pixelX = x * 8;
  player.pixelY = y * 8;
  player.facing = facing;
  player.isMoving = false;
  player.moveProgress = 0;
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
// Track catch blocked message for current battle
let pendingCatchBlockedMessage: string | undefined;

function _startWildBattleInternal(enemyCreature: CreatureInstance): void {
  const playerCreature = getFirstBattleableCreature();
  if (!playerCreature) throw new Error('No battleable creature in party');

  currentTrainerNpc = null;
  trainerCreatureIndex = 0;

  battleState = createBattleState(playerCreature, enemyCreature, true);

  // Apply catch restriction if set
  if (pendingCatchBlockedMessage) {
    battleState.catchBlockedMessage = pendingCatchBlockedMessage;
    pendingCatchBlockedMessage = undefined;
  }

  initBattle(battleState);
  gameState.mode = 'battle';

  // Switch to battle music
  playBattleMusic();
}

function _startTrainerBattleInternal(npc: NPC): void {
  if (!npc.trainer || npc.defeated) return;

  const playerCreature = getFirstBattleableCreature();
  if (!playerCreature) throw new Error('No battleable creature in party');

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

  // Switch to battle music
  playBattleMusic();
}

// Public battle start functions with transitions
export function startWildBattle(enemyCreature: CreatureInstance, catchBlockedMessage?: string): void {
  pendingCatchBlockedMessage = catchBlockedMessage;
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

export function setPlayerMoney(amount: number): void {
  playerMoney = amount;
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
    // Find the first creature (not egg) in party - this is what was in battle
    const partyCreatureIndex = gameState.overworld.player.party.findIndex(m => isCreature(m));
    if (partyCreatureIndex === -1) return;

    const partyCreature = gameState.overworld.player.party[partyCreatureIndex] as CreatureInstance;
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
      markTrainerDefeated(currentTrainerNpc.id);
      playerMoney += currentTrainerNpc.trainer.prizeMoney;

      // Check if this is a gym leader and award badge + story flag
      const badge = getBadgeByGymLeader(currentTrainerNpc.id);
      if (badge) {
        awardBadge(badge.id);
      }

      // Set story flag for gym leader defeat
      const storyFlag = GYM_LEADER_FLAGS[currentTrainerNpc.id];
      if (storyFlag) {
        setStoryFlag(storyFlag);
      }

      // Special story flags for specific trainers
      if (currentTrainerNpc.id === 'finner-boss') {
        setStoryFlag('defeated_boss_finley');
      }

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

  // Switch back to overworld music
  playOverworldMusic();
}

export function endBattle(): void {
  startTransition(_endBattleInternal);
}

// Heal party at healing pool
export function healParty(): void {
  for (const member of gameState.overworld.player.party) {
    // Only heal creatures, not eggs
    if (isCreature(member)) {
      member.currentHp = member.maxHp;
      for (const move of member.moves) {
        move.currentPp = move.move.pp;
      }
    }
  }
}

// Inventory management
export function getInventory(): InventorySlot[] {
  return playerInventory;
}

export function setPlayerInventory(inv: InventorySlot[]): void {
  playerInventory = inv;
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

// Fishing Rod Management
const ROD_IDS = [60, 61, 62];  // Old Rod, Good Rod, Super Rod

export function getBestRod(): { itemId: number; rodPower: number } | null {
  // Check from best to worst
  for (let i = ROD_IDS.length - 1; i >= 0; i--) {
    const rodId = ROD_IDS[i];
    if (getItemCount(rodId) > 0) {
      const item = getItem(rodId);
      return { itemId: rodId, rodPower: item?.rodPower || 1 };
    }
  }
  return null;
}

export function hasAnyRod(): boolean {
  return ROD_IDS.some(id => getItemCount(id) > 0);
}

export function getRodPower(itemId: number): number {
  const item = getItem(itemId);
  return item?.rodPower || 0;
}

// Party management
export function canAddToParty(): boolean {
  return gameState.overworld.player.party.length < MAX_PARTY_SIZE;
}

export function addToParty(member: PartyMember): boolean {
  if (!canAddToParty()) return false;
  gameState.overworld.player.party.push(member);
  return true;
}

export function getPartySize(): number {
  return gameState.overworld.player.party.length;
}

export function getParty(): PartyMember[] {
  return gameState.overworld.player.party;
}

export function setParty(party: PartyMember[]): void {
  gameState.overworld.player.party = party;
}

// Get only creatures (not eggs) from party
export function getPartyCreatures(): CreatureInstance[] {
  return gameState.overworld.player.party.filter(isCreature) as CreatureInstance[];
}

// Get first creature that can battle (not an egg, HP > 0)
export function getFirstBattleableCreature(): CreatureInstance | null {
  for (const member of gameState.overworld.player.party) {
    if (isCreature(member) && member.currentHp > 0) {
      return member;
    }
  }
  return null;
}

// Check if player has any creature that can battle
export function hasBattleableCreature(): boolean {
  return getFirstBattleableCreature() !== null;
}

export function setStarterCreature(speciesId: number): void {
  const starterSpecies = getCreature(speciesId);
  if (!starterSpecies) throw new Error('Starter species not found');

  const starter = createCreatureInstance(starterSpecies, 5);
  gameState.overworld.player.party = [starter];
}

// Certification management
export function getPlayerCertifications(): CertificationLevel[] {
  return gameState.overworld.player.certifications;
}

export function setPlayerCertifications(certs: CertificationLevel[]): void {
  gameState.overworld.player.certifications = certs;
}

export function hasCertification(cert: CertificationLevel): boolean {
  const playerCerts = gameState.overworld.player.certifications;
  if (playerCerts.length === 0) return cert === 'wading';

  const playerHighestIndex = Math.max(
    ...playerCerts.map(c => CERT_HIERARCHY.indexOf(c))
  );
  const requiredIndex = CERT_HIERARCHY.indexOf(cert);

  return playerHighestIndex >= requiredIndex;
}

export function grantCertification(cert: CertificationLevel): void {
  if (!gameState.overworld.player.certifications.includes(cert)) {
    gameState.overworld.player.certifications.push(cert);
  }
}

export function getHighestCertification(): CertificationLevel {
  const certs = gameState.overworld.player.certifications;
  if (certs.length === 0) return 'wading';

  const highestIndex = Math.max(
    ...certs.map(c => CERT_HIERARCHY.indexOf(c))
  );
  return CERT_HIERARCHY[highestIndex];
}

// Human-readable certification names
export const CERT_NAMES: Record<CertificationLevel, string> = {
  'wading': 'Wading/Snorkeling',
  'openwater': 'Open Water SCUBA',
  'advanced': 'Advanced SCUBA',
  'tech': 'Technical Diving',
  'openocean': 'Open Ocean Swimming',
  'submarine': 'Submarine Operation'
};

// Badge management
export function getPlayerBadges(): BadgeId[] {
  return gameState.overworld.player.badges;
}

export function setPlayerBadges(badges: BadgeId[]): void {
  gameState.overworld.player.badges = badges;
}

export function hasBadge(badgeId: BadgeId): boolean {
  return gameState.overworld.player.badges.includes(badgeId);
}

export function awardBadge(badgeId: BadgeId): boolean {
  if (hasBadge(badgeId)) return false;
  gameState.overworld.player.badges.push(badgeId);
  return true;
}

export function getBadgeCount(): number {
  return gameState.overworld.player.badges.length;
}

// ============================================
// Story Flag Management
// ============================================

export function hasStoryFlag(flagId: StoryFlagId): boolean {
  return storyFlags.has(flagId);
}

export function setStoryFlag(flagId: StoryFlagId): boolean {
  if (storyFlags.has(flagId)) return false;
  storyFlags.add(flagId);

  // Check for automatic unlocks when setting certain flags
  const unlocks = BADGE_UNLOCKS[flagId];
  if (unlocks) {
    for (const unlockFlag of unlocks) {
      storyFlags.add(unlockFlag);
    }
  }

  return true;
}

export function clearStoryFlag(flagId: StoryFlagId): void {
  storyFlags.delete(flagId);
}

export function getStoryFlags(): StoryFlagId[] {
  return Array.from(storyFlags);
}

export function setStoryFlags(flags: StoryFlagId[]): void {
  storyFlags = new Set(flags);
}

export function getStoryFlagCount(): number {
  return storyFlags.size;
}

// Check if player can access a region based on story flags
export function canAccessRegion(regionFlag: StoryFlagId): boolean {
  return storyFlags.has(regionFlag);
}

// Get story progress percentage (main story flags only)
export function getStoryProgress(): number {
  const mainFlags: StoryFlagId[] = [
    'intro_complete', 'first_badge', 'witnessed_finning', 'met_dr_martillo',
    'second_badge', 'third_badge', 'fourth_badge', 'fifth_badge',
    'sixth_badge', 'seventh_badge', 'found_finner_hq', 'defeated_boss_finley',
    'rescued_dr_vance', 'eighth_badge', 'discovered_megalodon_lab',
    'obtained_megalodon_tooth', 'elite_four_unlocked', 'champion_defeated'
  ];

  const completed = mainFlags.filter(f => storyFlags.has(f)).length;
  return Math.floor((completed / mainFlags.length) * 100);
}

// ============================================
// Egg Collection & Hatching System
// ============================================

// Pending hatch notification (set when egg hatches, cleared when shown)
let pendingHatch: { eggName: string; creatureName: string } | null = null;

export function getPendingHatch(): { eggName: string; creatureName: string } | null {
  return pendingHatch;
}

export function clearPendingHatch(): void {
  pendingHatch = null;
}

// Create an egg instance from egg item data
export function createEggInstance(eggItemId: number): EggInstance | null {
  const eggData = getEgg(eggItemId);
  if (!eggData) return null;

  return {
    isEgg: true,
    eggItemId: eggItemId,
    stepsRemaining: eggData.hatchSteps
  };
}

// Increment step counter and check for egg hatching
export function incrementStepCount(): void {
  const player = gameState.overworld.player;
  player.stepCount++;

  // Decrement steps for all eggs in party
  for (let i = 0; i < player.party.length; i++) {
    const member = player.party[i];
    if (isEgg(member)) {
      member.stepsRemaining--;
      if (member.stepsRemaining <= 0) {
        // Egg is ready to hatch!
        hatchEgg(i);
        break; // Only hatch one egg per step
      }
    }
  }
}

// Get player's total step count
export function getStepCount(): number {
  return gameState.overworld.player.stepCount;
}

export function setPlayerStepCount(count: number): void {
  gameState.overworld.player.stepCount = count;
}

// Hatch an egg at the given party index
export function hatchEgg(partyIndex: number): boolean {
  const player = gameState.overworld.player;
  const member = player.party[partyIndex];

  if (!member || !isEgg(member)) return false;

  const eggData = getEgg(member.eggItemId);
  if (!eggData) return false;

  const species = getCreature(eggData.hatchSpeciesId);
  if (!species) return false;

  // Create the hatched creature
  const creature = createCreatureInstance(species, eggData.hatchLevel);

  // Preserve nickname if egg had one
  if (member.nickname) {
    creature.nickname = member.nickname;
  }

  // Replace egg with creature in party
  player.party[partyIndex] = creature;

  // Set pending hatch notification
  pendingHatch = {
    eggName: eggData.name,
    creatureName: creature.nickname || species.name
  };

  return true;
}

// Collect a ground egg from the current map
export function collectGroundEgg(groundEgg: GroundEgg): boolean {
  if (groundEgg.collected) return false;
  if (!canAddToParty()) return false;

  const eggInstance = createEggInstance(groundEgg.eggId);
  if (!eggInstance) return false;

  // Add egg to party
  addToParty(eggInstance);

  // Mark as collected (both local and global tracking)
  groundEgg.collected = true;
  markEggCollected(groundEgg.id);

  return true;
}

// Check if there's an uncollected ground egg at a position
export function getGroundEggAt(x: number, y: number): GroundEgg | null {
  const map = getCurrentMap();
  if (!map.groundEggs) return null;

  return map.groundEggs.find(
    egg => egg.x === x && egg.y === y && !egg.collected
  ) || null;
}

// ============================================
// Progress Tracking (for save/load)
// ============================================

// Reset all progress (for new game)
export function resetProgressTracking(): void {
  defeatedTrainers.clear();
  collectedEggs.clear();
}

// Defeated trainers
export function markTrainerDefeated(npcId: string): void {
  defeatedTrainers.add(npcId);
}

export function isTrainerDefeated(npcId: string): boolean {
  return defeatedTrainers.has(npcId);
}

export function getDefeatedTrainers(): string[] {
  return Array.from(defeatedTrainers);
}

export function setDefeatedTrainers(ids: string[]): void {
  defeatedTrainers = new Set(ids);
}

// Collected eggs
export function markEggCollected(eggId: string): void {
  collectedEggs.add(eggId);
}

export function isEggCollected(eggId: string): boolean {
  return collectedEggs.has(eggId);
}

export function getCollectedEggs(): string[] {
  return Array.from(collectedEggs);
}

export function setCollectedEggs(ids: string[]): void {
  collectedEggs = new Set(ids);
}

// ============================================
// Repel System
// ============================================

export function getRepelSteps(): number {
  return repelStepsRemaining;
}

export function setRepelSteps(steps: number): void {
  repelStepsRemaining = steps;
}

export function activateRepel(steps: number): void {
  repelStepsRemaining = steps;
}

export function decrementRepel(): void {
  if (repelStepsRemaining > 0) {
    repelStepsRemaining--;
  }
}

export function isRepelActive(): boolean {
  return repelStepsRemaining > 0;
}

// Check if repel blocks an encounter based on wild creature level vs party lead level
export function repelBlocksEncounter(wildLevel: number): boolean {
  if (!isRepelActive()) return false;

  const party = getParty();
  const lead = party.find(member => isCreature(member) && member.currentHp > 0);
  if (!lead || !isCreature(lead)) return false;

  // Repel blocks encounters with creatures lower level than party lead
  return wildLevel < lead.level;
}

// ============================================
// Overworld Item Usage
// ============================================

// Use an item on a party member outside of battle
// Returns a message describing what happened, or null if item couldn't be used
export function useItemOnCreature(itemId: number, partyIndex: number): string | null {
  const item = getItem(itemId);
  if (!item) return null;

  const party = getParty();
  const member = party[partyIndex];
  if (!member || !isCreature(member)) return null;

  const creature = member;

  // Handle different item types
  if (item.type === 'potion') {
    // Can't use on fainted creature
    if (creature.currentHp <= 0) {
      return `${creature.nickname || creature.species.name} is fainted!`;
    }
    // Can't use if already at full HP
    if (creature.currentHp >= creature.maxHp) {
      return `${creature.nickname || creature.species.name} is already at full HP!`;
    }

    const healAmount = item.healAmount || 0;
    const oldHp = creature.currentHp;
    creature.currentHp = Math.min(creature.maxHp, creature.currentHp + healAmount);
    const healed = creature.currentHp - oldHp;

    // Remove item from inventory
    removeItem(itemId, 1);

    return `${creature.nickname || creature.species.name} recovered ${healed} HP!`;
  }

  if (item.type === 'status') {
    // Can't use on fainted creature
    if (creature.currentHp <= 0) {
      return `${creature.nickname || creature.species.name} is fainted!`;
    }

    // Check if creature has a status that this item cures
    const status = creature.status;
    if (!status) {
      return `${creature.nickname || creature.species.name} has no status problem!`;
    }

    // Map items to the statuses they cure
    const cureMap: Record<number, StatusCondition[]> = {
      20: ['poisoned'],           // Antidote
      21: ['paralyzed'],          // Paralyze Heal
      22: ['asleep'],             // Awakening
      23: ['burned'],             // Burn Heal
      24: ['frozen'],             // Ice Heal
      25: ['poisoned', 'paralyzed', 'asleep', 'burned', 'frozen']  // Full Heal
    };

    const curesStatuses = cureMap[itemId];
    if (!curesStatuses || !curesStatuses.includes(status)) {
      return `It won't have any effect.`;
    }

    cureStatus(creature);
    removeItem(itemId, 1);

    return `${creature.nickname || creature.species.name} was cured!`;
  }

  return null;
}

// Use a repel item
export function useRepelItem(itemId: number): string | null {
  const item = getItem(itemId);
  if (!item || item.type !== 'battle') return null;

  // Map repel items to their step counts
  const repelSteps: Record<number, number> = {
    30: 100,   // Repel
    31: 200,   // Super Repel
    32: 250    // Max Repel
  };

  const steps = repelSteps[itemId];
  if (!steps) return null;

  // Can't use if repel is already active
  if (isRepelActive()) {
    return `Repel is already active!`;
  }

  activateRepel(steps);
  removeItem(itemId, 1);

  return `${item.name}'s effect will last for ${steps} steps!`;
}

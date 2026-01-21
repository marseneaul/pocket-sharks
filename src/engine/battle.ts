import type { BattleState, CreatureInstance, CreatureSpecies, MoveInstance } from '../types/index.ts';
import { calculateDamage, calculateStats } from './damage.ts';
import { getEffectivenessText } from '../data/type-chart.ts';
import { getMove } from '../data/moves.ts';
import { getCreature } from '../data/creatures.ts';
import { getItem, attemptCatch, getSpeciesCatchRate } from '../data/items.ts';
import { setMessage } from '../renderer/battle-ui.ts';
import {
  trainerHasMoreCreatures,
  sendOutNextTrainerCreature,
  getCurrentTrainer,
  getInventory,
  removeItem,
  addToParty,
  canAddToParty,
  getParty,
  setGameMode
} from './game-state.ts';
import { initPartyMenu } from '../renderer/party-ui.ts';

export function createCreatureInstance(species: CreatureSpecies, level: number): CreatureInstance {
  const stats = calculateStats(species, level);

  // Get moves for this level
  const learnedMoves = species.learnableMoves
    .filter(m => m.level <= level)
    .slice(-4) // Take last 4 moves learned
    .map(m => {
      const move = getMove(m.moveId);
      if (!move) throw new Error(`Move ${m.moveId} not found`);
      return {
        move,
        currentPp: move.pp
      } as MoveInstance;
    });

  return {
    species,
    level,
    currentHp: stats.hp,
    maxHp: stats.hp,
    stats,
    moves: learnedMoves,
    status: null,
    exp: getExpForLevel(level) // Start with exp matching current level
  };
}

export function createBattleState(
  playerCreature: CreatureInstance,
  enemyCreature: CreatureInstance,
  isWild: boolean = true
): BattleState {
  return {
    playerCreature,
    enemyCreature,
    phase: 'intro',
    message: '',
    messageQueue: [],
    menuIndex: 0,
    moveMenuIndex: 0,
    playerAction: null,
    enemyAction: null,
    isWildBattle: isWild,
    canRun: true,
    animatingHp: {
      player: playerCreature.currentHp,
      enemy: enemyCreature.currentHp
    },
    entryAnimation: {
      phase: 'enemy-enter',
      progress: 0
    },
    attackAnimation: {
      active: false,
      type: 'physical',
      attacker: 'player',
      progress: 0
    }
  };
}

export function initBattle(state: BattleState): void {
  const enemyName = state.enemyCreature.species.name;
  if (state.isWildBattle) {
    queueMessage(state, `Wild ${enemyName} appeared!`);
  } else {
    queueMessage(state, `${enemyName} wants to fight!`);
  }
  const playerName = state.playerCreature.nickname || state.playerCreature.species.name;
  queueMessage(state, `Go! ${playerName}!`);
  advanceMessage(state);
}

function queueMessage(state: BattleState, message: string): void {
  state.messageQueue.push(message);
}

function advanceMessage(state: BattleState): void {
  if (state.messageQueue.length > 0) {
    state.message = state.messageQueue.shift()!;
    setMessage(state.message);
  }
}

export function handleInput(state: BattleState, input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'): void {
  switch (state.phase) {
    case 'intro':
    case 'message':
      if (input === 'a' || input === 'b') {
        if (state.messageQueue.length > 0) {
          advanceMessage(state);
        } else {
          // Check if battle is over
          if (state.playerCreature.currentHp <= 0) {
            state.phase = 'defeat';
          } else if (state.enemyCreature.currentHp <= 0) {
            state.phase = 'victory';
          } else {
            state.phase = 'select-action';
            const name = state.playerCreature.nickname || state.playerCreature.species.name;
            setMessage(`What will ${name} do?`, true);
          }
        }
      }
      break;

    case 'select-action':
      handleActionMenu(state, input);
      break;

    case 'select-move':
      handleMoveMenu(state, input);
      break;

    case 'victory':
    case 'defeat':
      // Battle is over - could transition to next screen
      break;
  }
}

function handleActionMenu(state: BattleState, input: string): void {
  // 2x2 grid layout:
  // 0: FIGHT   1: BAG
  // 2: SHARK   3: RUN
  switch (input) {
    case 'up':
      if (state.menuIndex >= 2) state.menuIndex -= 2;
      break;
    case 'down':
      if (state.menuIndex <= 1) state.menuIndex += 2;
      break;
    case 'left':
      if (state.menuIndex % 2 === 1) state.menuIndex--;
      break;
    case 'right':
      if (state.menuIndex % 2 === 0) state.menuIndex++;
      break;
    case 'a':
      selectAction(state);
      break;
  }
}

function selectAction(state: BattleState): void {
  switch (state.menuIndex) {
    case 0: // FIGHT
      state.phase = 'select-move';
      state.moveMenuIndex = 0;
      break;
    case 1: // BAG
      if (!state.isWildBattle) {
        queueMessage(state, "Can't use items in trainer battles!");
        state.phase = 'message';
        advanceMessage(state);
      } else {
        // Try to use a Shark Ball
        tryUseBall(state);
      }
      break;
    case 2: // SHARK (switch)
      const party = getParty();
      // Check if we have other living creatures
      const hasOtherAlive = party.slice(1).some(c => c.currentHp > 0);
      if (party.length <= 1 || !hasOtherAlive) {
        queueMessage(state, 'No other sharks!');
        state.phase = 'message';
        advanceMessage(state);
      } else {
        // Open party menu for switching
        initPartyMenu();
        setGameMode('battle-party');
      }
      break;
    case 3: // RUN
      if (state.canRun && state.isWildBattle) {
        queueMessage(state, 'Got away safely!');
        state.phase = 'victory'; // For now, treat as end of battle
        advanceMessage(state);
      } else {
        queueMessage(state, "Can't escape!");
        state.phase = 'message';
        advanceMessage(state);
      }
      break;
  }
}

function tryUseBall(state: BattleState): void {
  // Find first available ball in inventory
  const inventory = getInventory();
  const ballSlot = inventory.find(slot => {
    const item = getItem(slot.itemId);
    return item?.type === 'ball' && slot.quantity > 0;
  });

  if (!ballSlot) {
    queueMessage(state, 'No Shark Balls!');
    state.phase = 'message';
    advanceMessage(state);
    return;
  }

  const ball = getItem(ballSlot.itemId)!;

  // Use the ball
  removeItem(ballSlot.itemId, 1);
  queueMessage(state, `Used ${ball.name}!`);

  // Calculate catch attempt
  const enemy = state.enemyCreature;
  const speciesCatchRate = getSpeciesCatchRate(enemy.species.id);
  const result = attemptCatch(
    enemy.maxHp,
    enemy.currentHp,
    speciesCatchRate,
    ball.catchRate || 1
  );

  // Show shake messages
  if (result.shakes >= 1) queueMessage(state, 'The ball shook...');
  if (result.shakes >= 2) queueMessage(state, 'The ball shook again...');
  if (result.shakes >= 3) queueMessage(state, 'The ball shook once more...');

  if (result.success) {
    queueMessage(state, `Gotcha! ${enemy.species.name} was caught!`);

    // Try to add to party
    if (canAddToParty()) {
      // Create a fresh instance of the caught creature
      const caughtCreature: CreatureInstance = {
        species: enemy.species,
        level: enemy.level,
        currentHp: enemy.currentHp,
        maxHp: enemy.maxHp,
        stats: { ...enemy.stats },
        moves: enemy.moves.map(m => ({ ...m })),
        status: enemy.status,
        exp: enemy.exp
      };
      addToParty(caughtCreature);
      queueMessage(state, `${enemy.species.name} joined your team!`);
    } else {
      queueMessage(state, 'Party is full!');
      queueMessage(state, `${enemy.species.name} was sent to storage.`);
      // TODO: Implement PC storage
    }

    state.phase = 'victory';
  } else {
    queueMessage(state, 'Oh no! It broke free!');

    // Enemy gets a turn after failed catch
    const enemyMoveIndex = Math.floor(Math.random() * state.enemyCreature.moves.length);
    state.enemyAction = { type: 'fight', moveIndex: enemyMoveIndex };
    executeMove(state, 'enemy');

    if (state.playerCreature.currentHp <= 0) {
      const name = state.playerCreature.nickname || state.playerCreature.species.name;
      queueMessage(state, `${name} fainted!`);
    }
  }

  state.phase = 'message';
  advanceMessage(state);
}

function handleMoveMenu(state: BattleState, input: string): void {
  const moveCount = state.playerCreature.moves.length;

  switch (input) {
    case 'up':
      if (state.moveMenuIndex > 0) state.moveMenuIndex--;
      break;
    case 'down':
      if (state.moveMenuIndex < moveCount - 1) state.moveMenuIndex++;
      break;
    case 'a':
      selectMove(state);
      break;
    case 'b':
      state.phase = 'select-action';
      const name = state.playerCreature.nickname || state.playerCreature.species.name;
      setMessage(`What will ${name} do?`, true);
      break;
  }
}

function selectMove(state: BattleState): void {
  const selectedMove = state.playerCreature.moves[state.moveMenuIndex];

  if (selectedMove.currentPp <= 0) {
    queueMessage(state, 'No PP left!');
    state.phase = 'message';
    advanceMessage(state);
    return;
  }

  // Set player action
  state.playerAction = { type: 'fight', moveIndex: state.moveMenuIndex };

  // Generate enemy action (random move for now)
  const enemyMoveIndex = Math.floor(Math.random() * state.enemyCreature.moves.length);
  state.enemyAction = { type: 'fight', moveIndex: enemyMoveIndex };

  // Execute turn
  executeTurn(state);
}

function executeTurn(state: BattleState): void {
  state.phase = 'executing';

  // Determine turn order based on speed
  const playerSpeed = state.playerCreature.stats.speed;
  const enemySpeed = state.enemyCreature.stats.speed;

  const playerFirst = playerSpeed >= enemySpeed ||
    (playerSpeed === enemySpeed && Math.random() < 0.5);

  if (playerFirst) {
    executeMove(state, 'player');
    if (state.enemyCreature.currentHp > 0) {
      executeMove(state, 'enemy');
    }
  } else {
    executeMove(state, 'enemy');
    if (state.playerCreature.currentHp > 0) {
      executeMove(state, 'player');
    }
  }

  // Check for battle end
  if (state.playerCreature.currentHp <= 0) {
    const name = state.playerCreature.nickname || state.playerCreature.species.name;
    queueMessage(state, `${name} fainted!`);
  } else if (state.enemyCreature.currentHp <= 0) {
    queueMessage(state, `Enemy ${state.enemyCreature.species.name} fainted!`);

    // Calculate and apply experience
    const expGain = calculateExpGain(state.enemyCreature);
    queueMessage(state, `Gained ${expGain} EXP!`);

    // Process exp gain and level ups
    const levelUpMessages = processExpGain(state.playerCreature, expGain);
    for (const msg of levelUpMessages) {
      queueMessage(state, msg);
    }

    // Check for evolution after battle (only queue message, actual evolution at end)
    const evolvedForm = checkEvolution(state.playerCreature);
    if (evolvedForm) {
      const oldName = state.playerCreature.species.name;
      evolveCreature(state.playerCreature, evolvedForm);
      queueMessage(state, `What? ${oldName} is evolving!`);
      queueMessage(state, `${oldName} evolved into ${evolvedForm.name}!`);
    }

    // Check if trainer has more creatures
    if (!state.isWildBattle && trainerHasMoreCreatures()) {
      const nextCreature = sendOutNextTrainerCreature();
      if (nextCreature) {
        const trainer = getCurrentTrainer();
        const trainerName = trainer?.trainer?.name || 'Trainer';
        queueMessage(state, `${trainerName} sent out ${nextCreature.species.name}!`);
        state.enemyCreature = nextCreature;
        state.animatingHp.enemy = nextCreature.currentHp;
      }
    } else {
      // Battle is truly over - show prize money for trainer battles
      if (!state.isWildBattle) {
        const trainer = getCurrentTrainer();
        if (trainer?.trainer) {
          queueMessage(state, `Defeated ${trainer.trainer.name}!`);
          queueMessage(state, `Got $${trainer.trainer.prizeMoney} for winning!`);
        }
      }
    }
  }

  state.phase = 'message';
  advanceMessage(state);
}

function executeMove(state: BattleState, attacker: 'player' | 'enemy'): void {
  const isPlayer = attacker === 'player';
  const attackerCreature = isPlayer ? state.playerCreature : state.enemyCreature;
  const defenderCreature = isPlayer ? state.enemyCreature : state.playerCreature;
  const action = isPlayer ? state.playerAction : state.enemyAction;

  if (!action || action.type !== 'fight') return;

  const moveInstance = attackerCreature.moves[action.moveIndex];
  if (!moveInstance) return;

  const move = moveInstance.move;
  const attackerName = attackerCreature.nickname || attackerCreature.species.name;

  // Use PP
  moveInstance.currentPp--;

  // Queue attack message
  queueMessage(state, `${attackerName} used ${move.name}!`);

  // Start attack animation based on move category
  startAttackAnimation(state, attacker, move.category);

  // Calculate damage
  const result = calculateDamage(attackerCreature, defenderCreature, move);

  if (result.damage === 0 && move.power > 0) {
    if (result.effectiveness === 0) {
      const defenderName = defenderCreature.nickname || defenderCreature.species.name;
      queueMessage(state, `It doesn't affect ${defenderName}...`);
    } else {
      queueMessage(state, `${attackerName}'s attack missed!`);
    }
  } else if (result.damage > 0) {
    // Apply damage
    defenderCreature.currentHp = Math.max(0, defenderCreature.currentHp - result.damage);

    // Effectiveness message
    const effectText = getEffectivenessText(result.effectiveness);
    if (effectText) {
      queueMessage(state, effectText);
    }

    // Critical hit message
    if (result.isCritical) {
      queueMessage(state, 'A critical hit!');
    }
  }
}

function calculateExpGain(defeated: CreatureInstance): number {
  // Pokemon-style exp formula: (baseExp * level) / 7
  // Base exp varies by species evolution stage
  const baseExp = getBaseExp(defeated.species.id);
  return Math.floor((baseExp * defeated.level) / 7);
}

function getBaseExp(speciesId: number): number {
  // Base experience yield by species
  // Higher for evolved forms and rare creatures
  const baseExpTable: Record<number, number> = {
    // Starters stage 1
    1: 62, 4: 62, 7: 62,
    // Starters stage 2
    2: 142, 5: 142, 8: 142,
    // Starters stage 3
    3: 239, 6: 239, 9: 239,
    // Hammerhead line
    10: 60, 11: 170,
    // Route commons
    12: 56, 13: 50, 14: 54, 15: 55, 16: 58, 17: 57,
    // Gym 1 area
    18: 65, 19: 75, 20: 178, 21: 175,
    // Special/rare
    22: 70, 23: 180, 24: 165, 25: 170, 26: 172, 27: 175, 28: 161,
    // Fossils
    29: 180, 30: 150, 31: 270
  };
  return baseExpTable[speciesId] || 64;
}

// Calculate exp needed for a level
export function getExpForLevel(level: number): number {
  // Medium-fast growth rate: n^3
  return Math.floor(Math.pow(level, 3));
}

// Calculate total exp for current level progress
export function getExpProgress(creature: CreatureInstance): { current: number; needed: number } {
  const currentLevelExp = getExpForLevel(creature.level);
  const nextLevelExp = getExpForLevel(creature.level + 1);
  const needed = nextLevelExp - currentLevelExp;
  const current = creature.exp - currentLevelExp;
  return { current, needed };
}

// Check and process level ups, returns array of messages
export function processExpGain(creature: CreatureInstance, expGain: number): string[] {
  const messages: string[] = [];
  creature.exp += expGain;

  // Check for level up(s)
  while (creature.exp >= getExpForLevel(creature.level + 1) && creature.level < 100) {
    creature.level++;
    messages.push(`${creature.species.name} grew to LV ${creature.level}!`);

    // Recalculate stats
    const oldMaxHp = creature.maxHp;
    creature.stats = calculateStats(creature.species, creature.level);
    creature.maxHp = creature.stats.hp;

    // Heal the HP difference (like in Pokemon)
    const hpGain = creature.maxHp - oldMaxHp;
    creature.currentHp = Math.min(creature.currentHp + hpGain, creature.maxHp);

    // Check for new moves
    const newMoves = checkNewMoves(creature);
    for (const moveName of newMoves) {
      messages.push(`${creature.species.name} learned ${moveName}!`);
    }
  }

  return messages;
}

// Check and learn new moves at current level
function checkNewMoves(creature: CreatureInstance): string[] {
  const learnedMoveNames: string[] = [];

  for (const learnableMove of creature.species.learnableMoves) {
    if (learnableMove.level === creature.level) {
      const move = getMove(learnableMove.moveId);
      if (!move) continue;

      // Check if already knows this move
      if (creature.moves.some(m => m.move.id === move.id)) continue;

      // Add move (replace 4th if full, for simplicity)
      const newMoveInstance: MoveInstance = { move, currentPp: move.pp };

      if (creature.moves.length < 4) {
        creature.moves.push(newMoveInstance);
      } else {
        // Replace oldest move (first slot) - in real game would prompt player
        creature.moves.shift();
        creature.moves.push(newMoveInstance);
      }

      learnedMoveNames.push(move.name);
    }
  }

  return learnedMoveNames;
}

// Check if creature should evolve
export function checkEvolution(creature: CreatureInstance): CreatureSpecies | null {
  const evolution = creature.species.evolvesTo;
  if (!evolution) return null;

  if (creature.level >= evolution.level) {
    const evolvedSpecies = getCreature(evolution.speciesId);
    return evolvedSpecies || null;
  }

  return null;
}

// Perform evolution
export function evolveCreature(creature: CreatureInstance, newSpecies: CreatureSpecies): void {
  creature.species = newSpecies;

  // Recalculate stats for new species
  const oldMaxHp = creature.maxHp;
  creature.stats = calculateStats(newSpecies, creature.level);
  creature.maxHp = creature.stats.hp;

  // Scale current HP proportionally
  const hpRatio = creature.currentHp / oldMaxHp;
  creature.currentHp = Math.floor(creature.maxHp * hpRatio);

  // Learn new moves at evolution level
  checkNewMoves(creature);
}

// Update HP animation
export function updateHpAnimation(state: BattleState, deltaTime: number): void {
  const speed = 50; // HP per second

  // Player HP
  if (state.animatingHp.player !== state.playerCreature.currentHp) {
    const diff = state.playerCreature.currentHp - state.animatingHp.player;
    const change = Math.sign(diff) * Math.min(Math.abs(diff), speed * deltaTime / 1000);
    state.animatingHp.player += change;

    if (Math.abs(state.animatingHp.player - state.playerCreature.currentHp) < 0.5) {
      state.animatingHp.player = state.playerCreature.currentHp;
    }
  }

  // Enemy HP
  if (state.animatingHp.enemy !== state.enemyCreature.currentHp) {
    const diff = state.enemyCreature.currentHp - state.animatingHp.enemy;
    const change = Math.sign(diff) * Math.min(Math.abs(diff), speed * deltaTime / 1000);
    state.animatingHp.enemy += change;

    if (Math.abs(state.animatingHp.enemy - state.enemyCreature.currentHp) < 0.5) {
      state.animatingHp.enemy = state.enemyCreature.currentHp;
    }
  }
}

// Entry animation duration in ms
const ENTRY_ANIMATION_DURATION = 400;

// Update entry animation (creatures sliding into position)
export function updateEntryAnimation(state: BattleState, deltaTime: number): void {
  if (state.entryAnimation.phase === 'complete') return;

  const progressDelta = deltaTime / ENTRY_ANIMATION_DURATION;
  state.entryAnimation.progress += progressDelta;

  if (state.entryAnimation.progress >= 1) {
    state.entryAnimation.progress = 1;

    if (state.entryAnimation.phase === 'enemy-enter') {
      // Enemy finished entering, now player enters
      state.entryAnimation.phase = 'player-enter';
      state.entryAnimation.progress = 0;
    } else if (state.entryAnimation.phase === 'player-enter') {
      // Both have entered, animation complete
      state.entryAnimation.phase = 'complete';
    }
  }
}

// Easing function for smooth deceleration
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

// Get current sprite positions based on entry animation
export function getEntryAnimationOffsets(state: BattleState): { enemyX: number; playerX: number } {
  const enemyStartX = 100;  // Start off-screen right
  const playerStartX = -70; // Start off-screen left

  let enemyOffset = 0;
  let playerOffset = 0;

  if (state.entryAnimation.phase === 'enemy-enter') {
    // Enemy sliding in from right
    const easedProgress = easeOutQuad(state.entryAnimation.progress);
    enemyOffset = enemyStartX * (1 - easedProgress);
    playerOffset = playerStartX; // Player still off-screen
  } else if (state.entryAnimation.phase === 'player-enter') {
    // Enemy in position, player sliding in from left
    enemyOffset = 0;
    const easedProgress = easeOutQuad(state.entryAnimation.progress);
    playerOffset = playerStartX * (1 - easedProgress);
  }
  // If 'complete', both offsets are 0

  return { enemyX: enemyOffset, playerX: playerOffset };
}

// Attack animation duration in ms
const ATTACK_ANIMATION_DURATION = 300;

// Start an attack animation
export function startAttackAnimation(
  state: BattleState,
  attacker: 'player' | 'enemy',
  type: 'physical' | 'special' | 'status'
): void {
  state.attackAnimation = {
    active: true,
    type,
    attacker,
    progress: 0
  };
}

// Update attack animation
export function updateAttackAnimation(state: BattleState, deltaTime: number): void {
  if (!state.attackAnimation.active) return;

  const progressDelta = deltaTime / ATTACK_ANIMATION_DURATION;
  state.attackAnimation.progress += progressDelta;

  if (state.attackAnimation.progress >= 1) {
    state.attackAnimation.active = false;
    state.attackAnimation.progress = 0;
  }
}

// Get attack animation visual effects
export function getAttackAnimationEffects(state: BattleState): {
  playerOffsetX: number;
  enemyOffsetX: number;
  playerShake: number;
  enemyShake: number;
  screenFlash: number;
} {
  const result = {
    playerOffsetX: 0,
    enemyOffsetX: 0,
    playerShake: 0,
    enemyShake: 0,
    screenFlash: 0
  };

  if (!state.attackAnimation.active) return result;

  const { type, attacker, progress } = state.attackAnimation;

  if (type === 'physical') {
    // Attacker lunges forward, target shakes
    const lungeAmount = 12;
    const lungeProgress = progress < 0.5
      ? easeOutQuad(progress * 2)  // Lunge out
      : easeOutQuad((1 - progress) * 2);  // Return

    if (attacker === 'player') {
      result.playerOffsetX = lungeAmount * lungeProgress;
      // Target shakes in second half of animation
      if (progress > 0.4 && progress < 0.8) {
        result.enemyShake = Math.sin(progress * 50) * 3;
      }
    } else {
      result.enemyOffsetX = -lungeAmount * lungeProgress;
      if (progress > 0.4 && progress < 0.8) {
        result.playerShake = Math.sin(progress * 50) * 3;
      }
    }
  } else if (type === 'special') {
    // Screen flash, target shakes
    if (progress < 0.3) {
      result.screenFlash = easeOutQuad(progress / 0.3) * 0.6;
    } else if (progress < 0.5) {
      result.screenFlash = (1 - (progress - 0.3) / 0.2) * 0.6;
    }

    // Target shakes
    if (progress > 0.3 && progress < 0.8) {
      const shakeAmount = Math.sin(progress * 50) * 3;
      if (attacker === 'player') {
        result.enemyShake = shakeAmount;
      } else {
        result.playerShake = shakeAmount;
      }
    }
  } else if (type === 'status') {
    // Subtle pulse on target
    if (progress > 0.2 && progress < 0.8) {
      const pulseAmount = Math.sin((progress - 0.2) * Math.PI / 0.6) * 2;
      if (attacker === 'player') {
        result.enemyShake = pulseAmount;
      } else {
        result.playerShake = pulseAmount;
      }
    }
  }

  return result;
}

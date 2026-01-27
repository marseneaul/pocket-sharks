import type { Direction, MapData, PlayerState, Warp } from '../types/overworld.ts';
import { getPlayer, getCurrentMap, setCurrentMap, getMap, healParty, startWildBattle, startTrainerBattle, startTransition, getPlayerCertifications, hasCertification, incrementStepCount, getGroundEggAt, collectGroundEgg, hasBattleableCreature, canAddToParty, isTrainerDefeated, isEggCollected, decrementRepel, repelBlocksEncounter } from './game-state.ts';
import { getTileDef, canWalkOn, shouldSwim, getBlockedMessage } from '../data/tiles.ts';
import { tryEncounter } from '../data/encounters.ts';
import { initNPCStates, updateNPCs } from './npc-movement.ts';
import { getEgg } from '../data/eggs.ts';

// Message to display when movement is blocked (certification required)
let blockedMessage: string | null = null;
let blockedMessageTimer: number = 0;
const BLOCKED_MESSAGE_DURATION = 2000; // 2 seconds

export function getBlockedMessageState(): { message: string | null; timer: number } {
  return { message: blockedMessage, timer: blockedMessageTimer };
}

export function clearBlockedMessage(): void {
  blockedMessage = null;
  blockedMessageTimer = 0;
}

function showBlockedMessage(message: string): void {
  blockedMessage = message;
  blockedMessageTimer = BLOCKED_MESSAGE_DURATION;
}

const TILE_SIZE = 8;
const MOVE_SPEED = 2; // Pixels per frame

export function updateOverworld(deltaTime: number): void {
  const player = getPlayer();
  const map = getCurrentMap();

  // Initialize NPC states if needed
  initNPCStates(map);

  // Update NPC movement
  updateNPCs(map, deltaTime);

  // Update blocked message timer
  if (blockedMessageTimer > 0) {
    blockedMessageTimer -= deltaTime;
    if (blockedMessageTimer <= 0) {
      clearBlockedMessage();
    }
  }

  if (player.isMoving) {
    // Continue movement animation
    const moveAmount = MOVE_SPEED;
    player.moveProgress += moveAmount / TILE_SIZE;

    // Update pixel position based on facing direction
    switch (player.facing) {
      case 'up':
        player.pixelY -= moveAmount;
        break;
      case 'down':
        player.pixelY += moveAmount;
        break;
      case 'left':
        player.pixelX -= moveAmount;
        break;
      case 'right':
        player.pixelX += moveAmount;
        break;
    }

    // Check if movement complete
    if (player.moveProgress >= 1) {
      player.isMoving = false;
      player.moveProgress = 0;

      // Snap to grid
      player.pixelX = player.x * TILE_SIZE;
      player.pixelY = player.y * TILE_SIZE;

      // Check for tile effects after landing
      onTileLand(player);
    }
  }
}

// Track pending egg collection message
let pendingEggMessage: string | null = null;

export function getPendingEggMessage(): string | null {
  return pendingEggMessage;
}

export function clearPendingEggMessage(): void {
  pendingEggMessage = null;
}

function onTileLand(player: PlayerState): void {
  const map = getCurrentMap();
  const tile = map.tiles[player.y]?.[player.x];
  const tileDef = getTileDef(tile);

  // Increment step counter (for egg hatching) and decrement repel
  incrementStepCount();
  decrementRepel();

  // Check for ground egg at this location
  const groundEgg = getGroundEggAt(player.x, player.y);
  if (groundEgg) {
    const eggData = getEgg(groundEgg.eggId);
    if (eggData) {
      if (canAddToParty()) {
        if (collectGroundEgg(groundEgg)) {
          pendingEggMessage = `Found a ${eggData.name}!`;
        }
      } else {
        pendingEggMessage = `Found a ${eggData.name}, but party is full!`;
      }
    }
  }

  // Check for healing tile
  if (tileDef.heal) {
    healParty();
    // Could show a message here
  }

  // Check for warp
  const warp = findWarp(map, player.x, player.y);
  if (warp) {
    // Check certification requirement for warp
    if (warp.requiredCert && !hasCertification(warp.requiredCert)) {
      const message = warp.blockedMessage || `You need a higher diving certification to go here.`;
      showBlockedMessage(message);
      return;
    }
    doWarp(warp);
    return;
  }

  // Check for wild encounter (only if player has a creature that can battle)
  if (tileDef.encounter && tileDef.encounterRate > 0 && hasBattleableCreature()) {
    const wildCreature = tryEncounter(map, tileDef.encounterRate, getPlayerCertifications());
    if (wildCreature) {
      // Check if repel blocks this encounter
      if (!repelBlocksEncounter(wildCreature.level)) {
        startWildBattle(wildCreature);
        return;
      }
    }
  }
}

function findWarp(map: MapData, x: number, y: number): Warp | null {
  return map.warps.find(w => w.x === x && w.y === y) || null;
}

function doWarp(warp: Warp): void {
  const targetMap = getMap(warp.targetMap);
  if (!targetMap) {
    console.error(`Map not found: ${warp.targetMap}`);
    return;
  }

  startTransition(() => {
    const player = getPlayer();
    setCurrentMap(targetMap);

    player.x = warp.targetX;
    player.y = warp.targetY;
    player.pixelX = warp.targetX * TILE_SIZE;
    player.pixelY = warp.targetY * TILE_SIZE;

    // Update swimming state based on new tile
    const newTile = targetMap.tiles[player.y]?.[player.x];
    player.isSwimming = shouldSwim(newTile);

    // Reset NPC states for new map (will be re-initialized on next update)
    // Also restore defeated status from save data
    for (const npc of targetMap.npcs) {
      npc.state = undefined;
      if (npc.trainer && isTrainerDefeated(npc.id)) {
        npc.defeated = true;
      }
    }

    // Restore collected egg status from save data
    if (targetMap.groundEggs) {
      for (const egg of targetMap.groundEggs) {
        if (isEggCollected(egg.id)) {
          egg.collected = true;
        }
      }
    }
  });
}

export function tryMove(direction: Direction): boolean {
  const player = getPlayer();
  const map = getCurrentMap();
  const playerCerts = getPlayerCertifications();

  // Can't move if already moving
  if (player.isMoving) return false;

  // Update facing direction regardless
  player.facing = direction;

  // Calculate target position
  let targetX = player.x;
  let targetY = player.y;

  switch (direction) {
    case 'up':
      targetY--;
      break;
    case 'down':
      targetY++;
      break;
    case 'left':
      targetX--;
      break;
    case 'right':
      targetX++;
      break;
  }

  // Check bounds
  if (targetX < 0 || targetX >= map.width || targetY < 0 || targetY >= map.height) {
    return false;
  }

  // Get target tile
  const targetTile = map.tiles[targetY]?.[targetX];
  if (targetTile === undefined) return false;

  // Check if we can move there
  const targetIsWater = shouldSwim(targetTile);

  // Check for certification-blocked tiles first
  const certBlockMessage = getBlockedMessage(targetTile, playerCerts);
  if (certBlockMessage) {
    showBlockedMessage(certBlockMessage);
    return false;
  }

  // Handle land/water transitions
  if (player.isSwimming && !targetIsWater) {
    // Exiting water onto land
    if (!canWalkOn(targetTile, false, playerCerts)) return false;
    // Will transition to walking
  } else if (!player.isSwimming && targetIsWater) {
    // Entering water from land
    if (!canWalkOn(targetTile, true, playerCerts)) return false;
    // Will transition to swimming
  } else {
    // Same terrain type
    if (!canWalkOn(targetTile, player.isSwimming, playerCerts)) return false;
  }

  // Check for NPC collision (including moving NPCs)
  const TILE_SIZE = 8;
  const npcAtTarget = map.npcs.find(npc => {
    // Check current tile position (this is already the target if moving)
    if (npc.x === targetX && npc.y === targetY) return true;

    // If NPC is moving, also check their visual/pixel position
    // (they might visually still be on a tile even though npc.x/y is the target)
    if (npc.state?.isMoving) {
      const visualTileX = Math.round(npc.state.pixelX / TILE_SIZE);
      const visualTileY = Math.round(npc.state.pixelY / TILE_SIZE);
      if (visualTileX === targetX && visualTileY === targetY) return true;
    }

    return false;
  });
  if (npcAtTarget) return false;

  // Start movement
  player.x = targetX;
  player.y = targetY;
  player.isMoving = true;
  player.moveProgress = 0;

  // Update swimming state
  player.isSwimming = targetIsWater;

  return true;
}

// NPC dialogue result type
export type NPCInteractionResult =
  | 'pc'
  | { type: 'shop'; shopId: string }
  | { type: 'dialogue'; lines: string[]; speakerName?: string }
  | { type: 'trainer'; npcId: string; dialogue: string[] }
  | null;

export function handleOverworldInput(direction: Direction | null, confirm: boolean, _cancel: boolean): NPCInteractionResult {
  if (direction) {
    tryMove(direction);
  }

  // A button - interact with NPC in front
  if (confirm) {
    return interactWithFacing();
  }

  return null;
}

function interactWithFacing(): NPCInteractionResult {
  const player = getPlayer();
  const map = getCurrentMap();

  // Get tile in front of player
  let targetX = player.x;
  let targetY = player.y;

  switch (player.facing) {
    case 'up': targetY--; break;
    case 'down': targetY++; break;
    case 'left': targetX--; break;
    case 'right': targetX++; break;
  }

  // Check for NPC
  const npc = map.npcs.find(n => n.x === targetX && n.y === targetY);
  if (npc) {
    // Make NPC face toward player
    const oppositeDir: Record<Direction, Direction> = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };
    npc.facing = oppositeDir[player.facing];

    // Check if this is a PC terminal
    if (npc.isPcTerminal) {
      return 'pc';
    }

    // Check if this is a shop
    if (npc.shopId) {
      return { type: 'shop', shopId: npc.shopId };
    }

    // Check if this is a trainer
    if (npc.trainer && !npc.defeated) {
      // Return trainer dialogue to show before battle
      if (npc.dialogue) {
        return { type: 'trainer', npcId: npc.id, dialogue: npc.dialogue };
      }
      // No dialogue, start battle immediately
      startTrainerBattle(npc);
    } else if (npc.defeated && npc.trainer?.defeatedDialogue) {
      // Show post-defeat dialogue
      return { type: 'dialogue', lines: npc.trainer.defeatedDialogue };
    } else if (npc.dialogue) {
      // Regular NPC dialogue
      return { type: 'dialogue', lines: npc.dialogue };
    }
  }

  return null;
}

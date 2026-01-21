import type { Direction, MapData, PlayerState, Warp } from '../types/overworld.ts';
import { getPlayer, getCurrentMap, setCurrentMap, getMap, healParty, startWildBattle, startTrainerBattle, startTransition } from './game-state.ts';
import { getTileDef, canWalkOn, shouldSwim } from '../data/tiles.ts';
import { tryEncounter } from '../data/encounters.ts';

const TILE_SIZE = 8;
const MOVE_SPEED = 2; // Pixels per frame

export function updateOverworld(_deltaTime: number): void {
  const player = getPlayer();

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

function onTileLand(player: PlayerState): void {
  const map = getCurrentMap();
  const tile = map.tiles[player.y]?.[player.x];
  const tileDef = getTileDef(tile);

  // Check for healing tile
  if (tileDef.heal) {
    healParty();
    // Could show a message here
  }

  // Check for warp
  const warp = findWarp(map, player.x, player.y);
  if (warp) {
    doWarp(warp);
    return;
  }

  // Check for wild encounter
  if (tileDef.encounter && tileDef.encounterRate > 0) {
    const wildCreature = tryEncounter(map, tileDef.encounterRate);
    if (wildCreature) {
      startWildBattle(wildCreature);
      return;
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
  });
}

export function tryMove(direction: Direction): boolean {
  const player = getPlayer();
  const map = getCurrentMap();

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

  // Handle land/water transitions
  if (player.isSwimming && !targetIsWater) {
    // Exiting water onto land
    if (!canWalkOn(targetTile, false)) return false;
    // Will transition to walking
  } else if (!player.isSwimming && targetIsWater) {
    // Entering water from land
    if (!canWalkOn(targetTile, true)) return false;
    // Will transition to swimming
  } else {
    // Same terrain type
    if (!canWalkOn(targetTile, player.isSwimming)) return false;
  }

  // Check for NPC collision
  const npcAtTarget = map.npcs.find(npc => npc.x === targetX && npc.y === targetY);
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

export function handleOverworldInput(direction: Direction | null, confirm: boolean, _cancel: boolean): 'pc' | { type: 'shop'; shopId: string } | null {
  if (direction) {
    tryMove(direction);
  }

  // A button - interact with NPC in front
  if (confirm) {
    return interactWithFacing();
  }

  return null;
}

function interactWithFacing(): 'pc' | { type: 'shop'; shopId: string } | null {
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
      // Log pre-battle dialogue, then start battle
      if (npc.dialogue) {
        console.log(npc.dialogue.join('\n'));
      }
      startTrainerBattle(npc);
    } else if (npc.defeated && npc.trainer?.defeatedDialogue) {
      // Show post-defeat dialogue
      console.log(npc.trainer.defeatedDialogue.join('\n'));
    } else if (npc.dialogue) {
      // Regular NPC dialogue
      console.log(npc.dialogue.join('\n'));
    }
  }

  return null;
}

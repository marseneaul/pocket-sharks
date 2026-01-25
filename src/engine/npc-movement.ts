import type { Direction, MapData, NPC } from '../types/overworld.ts';
import { getTileDef } from '../data/tiles.ts';
import { getPlayer } from './game-state.ts';

const TILE_SIZE = 8;
const NPC_BASE_SPEED = 60; // Pixels per second (player is ~120)

// Initialize NPC state for a map
export function initNPCStates(map: MapData): void {
  for (const npc of map.npcs) {
    if (!npc.state) {
      npc.state = {
        originX: npc.x,
        originY: npc.y,
        pixelX: npc.x * TILE_SIZE,
        pixelY: npc.y * TILE_SIZE,
        isMoving: false,
        moveProgress: 0,
        targetX: npc.x,
        targetY: npc.y,
        pauseTimer: randomPause(npc),
        walkFrame: 0
      };
    }
  }
}

function randomPause(npc: NPC): number {
  if (!npc.wander) return 0;
  const { pauseMin, pauseMax } = npc.wander;
  return pauseMin + Math.random() * (pauseMax - pauseMin);
}

// Get random direction
function randomDirection(): Direction {
  const directions: Direction[] = ['up', 'down', 'left', 'right'];
  return directions[Math.floor(Math.random() * directions.length)];
}

// Check if a tile is walkable for an NPC
function canNPCWalkTo(map: MapData, npc: NPC, x: number, y: number): boolean {
  // Check bounds
  if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
    return false;
  }

  // Check tile
  const tileIndex = map.tiles[y]?.[x];
  if (tileIndex === undefined) return false;

  const tileDef = getTileDef(tileIndex);

  // NPCs can only walk on floor-like tiles, not water
  if (tileDef.solid || tileDef.swimOnly) {
    return false;
  }

  // Check for player collision
  const player = getPlayer();
  if (player.x === x && player.y === y) {
    return false;
  }

  // Check for other NPC collision
  for (const other of map.npcs) {
    if (other.id === npc.id) continue;

    // Check current position
    if (other.x === x && other.y === y) {
      return false;
    }

    // Check if other NPC is moving to this position
    if (other.state?.isMoving && other.state.targetX === x && other.state.targetY === y) {
      return false;
    }
  }

  return true;
}

// Check if position is within wander radius
function isWithinRadius(npc: NPC, x: number, y: number): boolean {
  if (!npc.wander || !npc.state) return true;

  const dx = Math.abs(x - npc.state.originX);
  const dy = Math.abs(y - npc.state.originY);

  return dx <= npc.wander.radius && dy <= npc.wander.radius;
}

// Try to start NPC movement in a direction
function tryNPCMove(map: MapData, npc: NPC, direction: Direction): boolean {
  if (!npc.state) return false;
  if (npc.state.isMoving) return false;

  // Calculate target position
  let targetX = npc.x;
  let targetY = npc.y;

  switch (direction) {
    case 'up': targetY--; break;
    case 'down': targetY++; break;
    case 'left': targetX--; break;
    case 'right': targetX++; break;
  }

  // Check if we can move there
  if (!canNPCWalkTo(map, npc, targetX, targetY)) {
    return false;
  }

  // Check wander radius
  if (!isWithinRadius(npc, targetX, targetY)) {
    return false;
  }

  // Start movement
  npc.facing = direction;
  npc.state.isMoving = true;
  npc.state.moveProgress = 0;
  npc.state.targetX = targetX;
  npc.state.targetY = targetY;
  npc.x = targetX;
  npc.y = targetY;

  return true;
}

// Update all NPCs on a map
export function updateNPCs(map: MapData, deltaTime: number): void {
  for (const npc of map.npcs) {
    if (!npc.state) continue;
    if (!npc.wander) continue; // Only update wandering NPCs

    updateNPC(map, npc, deltaTime);
  }
}

function updateNPC(map: MapData, npc: NPC, deltaTime: number): void {
  if (!npc.state || !npc.wander) return;

  if (npc.state.isMoving) {
    // Continue movement animation (deltaTime is in ms, convert to seconds)
    const pixelsPerMs = (NPC_BASE_SPEED * npc.wander.speed) / 1000;
    const pixelsMoved = pixelsPerMs * deltaTime;
    npc.state.moveProgress += pixelsMoved / TILE_SIZE;

    // Update pixel position based on facing direction
    switch (npc.facing) {
      case 'up':
        npc.state.pixelY -= pixelsMoved;
        break;
      case 'down':
        npc.state.pixelY += pixelsMoved;
        break;
      case 'left':
        npc.state.pixelX -= pixelsMoved;
        break;
      case 'right':
        npc.state.pixelX += pixelsMoved;
        break;
    }

    // Update walk animation frame (3-frame cycle)
    const cyclePosition = npc.state.moveProgress * 4;
    const phase = Math.floor(cyclePosition) % 4;
    npc.state.walkFrame = phase === 1 ? 1 : (phase === 3 ? 2 : 0);

    // Check if movement complete
    if (npc.state.moveProgress >= 1) {
      npc.state.isMoving = false;
      npc.state.moveProgress = 0;
      npc.state.walkFrame = 0;

      // Snap to grid
      npc.state.pixelX = npc.x * TILE_SIZE;
      npc.state.pixelY = npc.y * TILE_SIZE;

      // Start pause timer
      npc.state.pauseTimer = randomPause(npc);
    }
  } else {
    // Pausing - decrement timer
    npc.state.pauseTimer -= deltaTime;

    if (npc.state.pauseTimer <= 0) {
      // Try to move in a random direction
      const direction = randomDirection();
      if (!tryNPCMove(map, npc, direction)) {
        // If move failed, short pause before trying again
        npc.state.pauseTimer = 500;
      }
    }
  }
}

// Get NPC pixel position for rendering (with smooth interpolation)
export function getNPCRenderPosition(npc: NPC): { x: number; y: number } {
  if (npc.state) {
    return { x: npc.state.pixelX, y: npc.state.pixelY };
  }
  return { x: npc.x * TILE_SIZE, y: npc.y * TILE_SIZE };
}

// Get NPC walk frame for animation
export function getNPCWalkFrame(npc: NPC): number {
  return npc.state?.walkFrame ?? 0;
}

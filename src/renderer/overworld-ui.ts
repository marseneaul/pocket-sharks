import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.ts';
import { clear } from './canvas.ts';
import { drawText } from './text.ts';
import { drawTile, drawPlayer } from './tileset.ts';
import { getPlayer, getCurrentMap } from '../engine/game-state.ts';
import type { MapData, PlayerState } from '../types/overworld.ts';

const TILE_SIZE = 8;
const PLAYER_SIZE = 16;

export function renderOverworld(): void {
  clear();

  const player = getPlayer();
  const map = getCurrentMap();

  if (!map) return;

  // Calculate camera position (centered on player)
  const cameraX = Math.floor(player.pixelX - SCREEN_WIDTH / 2 + PLAYER_SIZE / 2);
  const cameraY = Math.floor(player.pixelY - SCREEN_HEIGHT / 2 + PLAYER_SIZE / 2);

  // Clamp camera to map bounds
  const maxCameraX = map.width * TILE_SIZE - SCREEN_WIDTH;
  const maxCameraY = map.height * TILE_SIZE - SCREEN_HEIGHT;

  const clampedCameraX = Math.max(0, Math.min(cameraX, maxCameraX));
  const clampedCameraY = Math.max(0, Math.min(cameraY, maxCameraY));

  // Draw tiles
  renderTiles(map, clampedCameraX, clampedCameraY);

  // Draw NPCs
  renderNPCs(map, clampedCameraX, clampedCameraY);

  // Draw player
  renderPlayer(player, clampedCameraX, clampedCameraY);

  // Draw map name (briefly when entering)
  // For now, always show it at top
  renderMapName(map.name);
}

function renderTiles(map: MapData, cameraX: number, cameraY: number): void {
  // Calculate visible tile range
  const startTileX = Math.floor(cameraX / TILE_SIZE);
  const startTileY = Math.floor(cameraY / TILE_SIZE);
  const endTileX = Math.min(startTileX + Math.ceil(SCREEN_WIDTH / TILE_SIZE) + 1, map.width);
  const endTileY = Math.min(startTileY + Math.ceil(SCREEN_HEIGHT / TILE_SIZE) + 1, map.height);

  for (let y = startTileY; y < endTileY; y++) {
    for (let x = startTileX; x < endTileX; x++) {
      const tileIndex = map.tiles[y]?.[x];
      if (tileIndex !== undefined) {
        const screenX = x * TILE_SIZE - cameraX;
        const screenY = y * TILE_SIZE - cameraY;
        drawTile(tileIndex, screenX, screenY);
      }
    }
  }
}

function renderNPCs(map: MapData, cameraX: number, cameraY: number): void {
  for (const npc of map.npcs) {
    const screenX = npc.x * TILE_SIZE - cameraX;
    const screenY = npc.y * TILE_SIZE - cameraY;

    // Only draw if on screen
    if (screenX >= -PLAYER_SIZE && screenX < SCREEN_WIDTH &&
        screenY >= -PLAYER_SIZE && screenY < SCREEN_HEIGHT) {
      // Draw NPC as simple figure (reuse player sprite for now)
      drawPlayer(screenX - 4, screenY - 8, npc.facing, 0, false);
    }
  }
}

function renderPlayer(player: PlayerState, cameraX: number, cameraY: number): void {
  const screenX = player.pixelX - cameraX;
  const screenY = player.pixelY - cameraY;

  // 3-frame walk animation: 0 (stand) -> 1 (left foot) -> 0 (stand) -> 2 (right foot)
  // For smooth animation, cycle through frames based on movement progress
  let frame = 0;
  if (player.isMoving) {
    const cyclePosition = player.moveProgress * 4; // 4 phases per walk cycle
    const phase = Math.floor(cyclePosition) % 4;
    // Frame sequence: 0, 1, 0, 2
    frame = phase === 1 ? 1 : (phase === 3 ? 2 : 0);
  }

  // Offset to center 16x16 sprite on 8x8 tile
  drawPlayer(screenX - 4, screenY - 8, player.facing, frame, player.isSwimming);
}

function renderMapName(name: string): void {
  // Draw map name at top of screen
  const textWidth = name.length * 8;
  const x = Math.floor((SCREEN_WIDTH - textWidth) / 2);
  drawText(name.toUpperCase(), x, 2);
}

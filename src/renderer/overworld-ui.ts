import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE, MAP_PALETTES } from '../constants.ts';
import { clear, getContext } from './canvas.ts';
import { drawText } from './text.ts';
import { drawTile, drawPlayer } from './tileset.ts';
import { drawNPC } from './npc-sprites.ts';
import { getPlayer, getCurrentMap } from '../engine/game-state.ts';
import { getNPCRenderPosition, getNPCWalkFrame } from '../engine/npc-movement.ts';
import type { MapData, PlayerState, NPC, MapPaletteId } from '../types/overworld.ts';

const TILE_SIZE = 8;
const PLAYER_SIZE = 16;

// Sprite entity for sorting
interface SpriteEntity {
  type: 'player' | 'npc';
  pixelY: number;
  player?: PlayerState;
  npc?: NPC;
}

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

  // Get map palette colors for region-specific theming
  const paletteId: MapPaletteId = map.palette || 'default';
  const paletteColors = MAP_PALETTES[paletteId].colors;

  // Draw tiles with region palette
  renderTiles(map, clampedCameraX, clampedCameraY, paletteColors);

  // Collect all sprites for Y-sorting (proper depth rendering)
  const sprites: SpriteEntity[] = [];

  // Add player
  sprites.push({
    type: 'player',
    pixelY: player.pixelY,
    player
  });

  // Add NPCs
  for (const npc of map.npcs) {
    const pos = getNPCRenderPosition(npc);
    sprites.push({
      type: 'npc',
      pixelY: pos.y,
      npc
    });
  }

  // Sort by Y position (lower Y = further back, drawn first)
  sprites.sort((a, b) => a.pixelY - b.pixelY);

  // Draw all sprites in sorted order
  for (const sprite of sprites) {
    if (sprite.type === 'player' && sprite.player) {
      renderPlayer(sprite.player, clampedCameraX, clampedCameraY);
    } else if (sprite.type === 'npc' && sprite.npc) {
      renderSingleNPC(sprite.npc, clampedCameraX, clampedCameraY);
    }
  }

  // Draw map name (briefly when entering)
  renderMapName(map.name);
}

function renderTiles(map: MapData, cameraX: number, cameraY: number, paletteColors: readonly [string, string, string, string]): void {
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
        drawTile(tileIndex, screenX, screenY, paletteColors);
      }
    }
  }
}

function renderSingleNPC(npc: NPC, cameraX: number, cameraY: number): void {
  // Get smooth pixel position for wandering NPCs
  const pos = getNPCRenderPosition(npc);
  const screenX = pos.x - cameraX;
  const screenY = pos.y - cameraY;

  // Only draw if on screen
  if (screenX >= -PLAYER_SIZE && screenX < SCREEN_WIDTH &&
      screenY >= -PLAYER_SIZE && screenY < SCREEN_HEIGHT) {
    // Offset to center 16x16 sprite on 8x8 tile
    const drawX = screenX - 4;
    const drawY = screenY - 8;

    // Get walk animation frame
    const walkFrame = getNPCWalkFrame(npc);

    // Try to draw NPC-specific sprite, fall back to player sprite
    const spriteType = npc.spriteType || 'player';
    const drawn = drawNPC(drawX, drawY, spriteType, npc.facing, walkFrame);

    if (!drawn) {
      // Fall back to player sprite for 'player' type or unknown types
      drawPlayer(drawX, drawY, npc.facing, walkFrame, false);
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
  const ctx = getContext();
  const displayName = name.toUpperCase();

  // Truncate if too long (max 18 chars to fit with padding)
  const truncated = displayName.length > 18
    ? displayName.substring(0, 17) + '.'
    : displayName;

  const textWidth = truncated.length * 8;
  const boxWidth = textWidth + 8;  // 4px padding each side
  const boxX = Math.floor((SCREEN_WIDTH - boxWidth) / 2);
  const textX = boxX + 4;

  // Draw background box
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(boxX, 0, boxWidth, 12);

  // Draw border
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(boxX + 0.5, 0.5, boxWidth - 1, 11);

  // Draw text
  drawText(truncated, textX, 2);
}

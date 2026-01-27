// Tile Atlas System
// Loads spritesheet images and draws tiles from them

import { getContext } from './canvas.ts';
import { TILE } from '../data/tiles.ts';

// Import spritesheets as modules (Vite handles the paths)
import terrainCliffsUrl from '../../assets/base-tilesets/spritesheets/terrain-cliffs.png';
import terrainGroundUrl from '../../assets/base-tilesets/spritesheets/terrain-ground.png';
import terrainWaterUrl from '../../assets/base-tilesets/spritesheets/terrain-water.png';
import natureTreesUrl from '../../assets/base-tilesets/spritesheets/nature-trees.png';
import natureSmallUrl from '../../assets/base-tilesets/spritesheets/nature-small.png';
import objectsOutdoorUrl from '../../assets/base-tilesets/spritesheets/objects-outdoor.png';
import objectsSignsUrl from '../../assets/base-tilesets/spritesheets/objects-signs.png';
import furnitureUrl from '../../assets/base-tilesets/spritesheets/furniture.png';
import interiorWallsUrl from '../../assets/base-tilesets/spritesheets/interior-walls.png';
import interiorFloorsUrl from '../../assets/base-tilesets/spritesheets/interior-floors.png';
import roofsUrl from '../../assets/base-tilesets/spritesheets/roofs.png';
import buildingsSmallUrl from '../../assets/base-tilesets/spritesheets/buildings-small.png';
import buildingsLargeUrl from '../../assets/base-tilesets/spritesheets/buildings-large.png';
import buildingsDarkUrl from '../../assets/base-tilesets/spritesheets/buildings-dark.png';
import miscUrl from '../../assets/base-tilesets/spritesheets/misc.png';

// New tile size for spritesheet tiles
export const ATLAS_TILE_SIZE = 16;
const TILES_PER_ROW = 16; // Tiles per row in spritesheet

interface TileMapping {
  sheet: string;       // Which spritesheet
  index: number;       // Tile index in that sheet
}

// Sheet URL mapping
const SHEET_URLS: Record<string, string> = {
  'terrain-cliffs': terrainCliffsUrl,
  'terrain-ground': terrainGroundUrl,
  'terrain-water': terrainWaterUrl,
  'nature-trees': natureTreesUrl,
  'nature-small': natureSmallUrl,
  'objects-outdoor': objectsOutdoorUrl,
  'objects-signs': objectsSignsUrl,
  'furniture': furnitureUrl,
  'interior-walls': interiorWallsUrl,
  'interior-floors': interiorFloorsUrl,
  'roofs': roofsUrl,
  'buildings-small': buildingsSmallUrl,
  'buildings-large': buildingsLargeUrl,
  'buildings-dark': buildingsDarkUrl,
  'misc': miscUrl
};

// Loaded spritesheet images
const loadedSheets: Map<string, HTMLImageElement> = new Map();
let atlasReady = false;
let loadPromise: Promise<void> | null = null;

// Mapping from game tile IDs to spritesheet tiles
// Tiles are arranged 16 per row in each spritesheet.
// Index = row * 16 + column (within the spritesheet)
//
// These mappings match assets/tiled/game-tileset.png
// See assets/tiled/tile-mapping.json for the master reference
//
const TILE_MAPPINGS: Partial<Record<number, TileMapping>> = {
  // === TERRAIN ===
  [TILE.FLOOR]: { sheet: 'terrain-ground', index: 0 },      // Tan/beige floor
  [TILE.WALL]: { sheet: 'terrain-cliffs', index: 8 },       // Brown rock wall
  [TILE.SAND]: { sheet: 'terrain-ground', index: 1 },       // Sandy ground
  [TILE.ROCK]: { sheet: 'nature-trees', index: 0 },         // Boulder/rock
  [TILE.STAIRS]: { sheet: 'terrain-ground', index: 4 },     // Stairs

  // === WATER ===
  [TILE.WATER]: { sheet: 'terrain-ground', index: 21 },     // Blue water
  [TILE.DEEP]: { sheet: 'terrain-ground', index: 21 },      // Blue water (same)
  [TILE.REEF]: { sheet: 'terrain-ground', index: 22 },      // Water with waves
  [TILE.TIDE_POOL]: { sheet: 'terrain-ground', index: 22 }, // Water with waves
  [TILE.DEEP_REEF]: { sheet: 'terrain-ground', index: 21 }, // Blue water
  [TILE.PELAGIC]: { sheet: 'terrain-ground', index: 21 },   // Blue water
  [TILE.ABYSS]: { sheet: 'buildings-dark', index: 32 },     // Very dark

  // === NATURE ===
  [TILE.KELP]: { sheet: 'nature-trees', index: 5 },         // Green bush (as kelp)
  [TILE.SEAGRASS]: { sheet: 'nature-trees', index: 6 },     // Bush variant
  [TILE.REEF_KELP]: { sheet: 'nature-trees', index: 7 },    // Another bush
  [TILE.CORAL]: { sheet: 'nature-trees', index: 4 },        // Rock/bush as coral
  [TILE.PALM]: { sheet: 'nature-trees', index: 16 },        // Tree foliage
  [TILE.FLOWER]: { sheet: 'nature-small', index: 0 },       // Small flower

  // === STRUCTURES ===
  [TILE.DOCK]: { sheet: 'interior-floors', index: 0 },      // Wooden/floor pattern
  [TILE.CAVE]: { sheet: 'buildings-dark', index: 0 },       // Dark tile
  [TILE.SHIPWRECK]: { sheet: 'buildings-dark', index: 16 }, // Dark structure
  [TILE.HEAL]: { sheet: 'objects-signs', index: 10 },       // HEAL sign
};

// Load a single spritesheet
async function loadSheet(name: string, url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      loadedSheets.set(name, img);
      resolve();
    };
    img.onerror = () => {
      console.warn(`Failed to load spritesheet: ${name}`);
      resolve(); // Don't fail completely, just warn
    };
    img.src = url;
  });
}

// Initialize and load all spritesheets
export async function initTileAtlas(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const loadPromises = Object.entries(SHEET_URLS).map(
      ([name, url]) => loadSheet(name, url)
    );

    await Promise.all(loadPromises);
    atlasReady = true;
    console.log(`Tile atlas loaded: ${loadedSheets.size} spritesheets`);
  })();

  return loadPromise;
}

// Check if atlas is ready
export function isAtlasReady(): boolean {
  return atlasReady;
}

// Draw a tile from the atlas
export function drawAtlasTile(
  tileIndex: number,
  x: number,
  y: number,
  scale: number = 1
): boolean {
  const mapping = TILE_MAPPINGS[tileIndex];
  if (!mapping) return false;

  const sheet = loadedSheets.get(mapping.sheet);
  if (!sheet) return false;

  const ctx = getContext();

  // Calculate source position in spritesheet
  const srcX = (mapping.index % TILES_PER_ROW) * ATLAS_TILE_SIZE;
  const srcY = Math.floor(mapping.index / TILES_PER_ROW) * ATLAS_TILE_SIZE;

  // Draw the tile (optionally scaled)
  const destSize = ATLAS_TILE_SIZE * scale;

  ctx.imageSmoothingEnabled = false; // Keep pixel art crisp
  ctx.drawImage(
    sheet,
    srcX, srcY, ATLAS_TILE_SIZE, ATLAS_TILE_SIZE,  // Source rect
    Math.floor(x), Math.floor(y), destSize, destSize  // Dest rect
  );

  return true;
}

// Get a specific tile image data for custom rendering
export function getTileImageData(
  tileIndex: number
): ImageData | null {
  const mapping = TILE_MAPPINGS[tileIndex];
  if (!mapping) return null;

  const sheet = loadedSheets.get(mapping.sheet);
  if (!sheet) return null;

  // Create temp canvas to extract tile
  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_TILE_SIZE;
  canvas.height = ATLAS_TILE_SIZE;
  const ctx = canvas.getContext('2d')!;

  const srcX = (mapping.index % TILES_PER_ROW) * ATLAS_TILE_SIZE;
  const srcY = Math.floor(mapping.index / TILES_PER_ROW) * ATLAS_TILE_SIZE;

  ctx.drawImage(
    sheet,
    srcX, srcY, ATLAS_TILE_SIZE, ATLAS_TILE_SIZE,
    0, 0, ATLAS_TILE_SIZE, ATLAS_TILE_SIZE
  );

  return ctx.getImageData(0, 0, ATLAS_TILE_SIZE, ATLAS_TILE_SIZE);
}

// Draw directly from a named spritesheet (for custom tiles)
export function drawFromSheet(
  sheetName: string,
  tileIndex: number,
  x: number,
  y: number,
  scale: number = 1
): boolean {
  const sheet = loadedSheets.get(sheetName);
  if (!sheet) return false;

  const ctx = getContext();

  const srcX = (tileIndex % TILES_PER_ROW) * ATLAS_TILE_SIZE;
  const srcY = Math.floor(tileIndex / TILES_PER_ROW) * ATLAS_TILE_SIZE;
  const destSize = ATLAS_TILE_SIZE * scale;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    sheet,
    srcX, srcY, ATLAS_TILE_SIZE, ATLAS_TILE_SIZE,
    Math.floor(x), Math.floor(y), destSize, destSize
  );

  return true;
}

// Update tile mapping at runtime (for future customization)
export function setTileMapping(tileId: number, sheet: string, index: number): void {
  TILE_MAPPINGS[tileId] = { sheet, index };
}

// Get list of available spritesheets
export function getAvailableSheets(): string[] {
  return Array.from(loadedSheets.keys());
}

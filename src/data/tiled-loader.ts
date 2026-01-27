// Tiled Map Loader
// Converts Tiled JSON exports to game MapData format

import type { MapData, NPC, Warp, GroundEgg } from '../types/overworld.ts';
import { TILE } from './tiles.ts';

// Tiled JSON format types
interface TiledMap {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: TiledLayer[];
  properties?: TiledProperty[];
  tilesets: TiledTileset[];
}

interface TiledLayer {
  name: string;
  type: 'tilelayer' | 'objectgroup';
  data?: number[];  // For tile layers
  objects?: TiledObject[];  // For object layers
  visible: boolean;
  width?: number;
  height?: number;
}

interface TiledObject {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  properties?: TiledProperty[];
}

interface TiledProperty {
  name: string;
  type: string;
  value: string | number | boolean;
}

interface TiledTileset {
  firstgid: number;
  name: string;
}

// Map Tiled tile IDs to game TILE constants
// Tiled uses 1-based indexing (0 = empty), so we subtract 1
const TILED_TO_GAME_TILE: Record<number, number> = {
  1: TILE.FLOOR,
  2: TILE.WALL,
  3: TILE.SAND,
  4: TILE.ROCK,
  5: TILE.WATER,
  6: TILE.KELP,
  7: TILE.DEEP,
  8: TILE.REEF,
  9: TILE.DOCK,
  10: TILE.HEAL,
  11: TILE.DEEP_REEF,
  12: TILE.PELAGIC,
  13: TILE.ABYSS,
  14: TILE.REEF_KELP,
  15: TILE.TIDE_POOL,
  16: TILE.CORAL,
  17: TILE.SEAGRASS,
  18: TILE.CAVE,
  19: TILE.SHIPWRECK,
  20: TILE.FLOWER,
  21: TILE.PALM,
  22: TILE.STAIRS,
};

function getProperty<T>(properties: TiledProperty[] | undefined, name: string, defaultValue: T): T {
  if (!properties) return defaultValue;
  const prop = properties.find(p => p.name === name);
  return prop ? (prop.value as T) : defaultValue;
}

function convertTileId(tiledId: number): number {
  if (tiledId === 0) return TILE.FLOOR; // Empty tile defaults to floor
  return TILED_TO_GAME_TILE[tiledId] ?? TILE.FLOOR;
}

function parseNPC(obj: TiledObject, tileWidth: number, tileHeight: number): NPC {
  const props = obj.properties || [];
  return {
    id: obj.name || `npc-${obj.id}`,
    x: Math.floor(obj.x / tileWidth),
    y: Math.floor(obj.y / tileHeight),
    sprite: getProperty(props, 'sprite', 0),
    facing: getProperty(props, 'facing', 'down') as 'up' | 'down' | 'left' | 'right',
    dialogue: getProperty(props, 'dialogue', '').split('|').filter(Boolean),
    shopId: getProperty(props, 'shopId', undefined),
    isPcTerminal: getProperty(props, 'isPcTerminal', false),
  };
}

function parseWarp(obj: TiledObject, tileWidth: number, tileHeight: number): Warp {
  const props = obj.properties || [];
  return {
    x: Math.floor(obj.x / tileWidth),
    y: Math.floor(obj.y / tileHeight),
    targetMap: getProperty(props, 'targetMap', ''),
    targetX: getProperty(props, 'targetX', 0),
    targetY: getProperty(props, 'targetY', 0),
    requiredCert: getProperty(props, 'requiredCert', undefined),
    blockedMessage: getProperty(props, 'blockedMessage', undefined),
  };
}

function parseGroundEgg(obj: TiledObject, tileWidth: number, tileHeight: number): GroundEgg {
  const props = obj.properties || [];
  return {
    id: obj.name || `egg-${obj.id}`,
    x: Math.floor(obj.x / tileWidth),
    y: Math.floor(obj.y / tileHeight),
    eggId: getProperty(props, 'eggId', 1),
    collected: false,
  };
}

/**
 * Load a Tiled JSON map and convert to game format
 */
export function loadTiledMap(json: TiledMap, mapId: string): MapData {
  const { width, height, tilewidth, tileheight, layers, properties } = json;

  // Find the main tile layer
  const tileLayer = layers.find(l => l.type === 'tilelayer' && l.name === 'tiles');
  if (!tileLayer || !tileLayer.data) {
    throw new Error('Map must have a tile layer named "tiles"');
  }

  // Convert 1D tile data to 2D array
  const tiles: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const tiledId = tileLayer.data[y * width + x];
      row.push(convertTileId(tiledId));
    }
    tiles.push(row);
  }

  // Find object layer for NPCs, warps, etc.
  const objectLayer = layers.find(l => l.type === 'objectgroup' && l.name === 'objects');
  const objects = objectLayer?.objects || [];

  // Parse objects by type
  const npcs: NPC[] = [];
  const warps: Warp[] = [];
  const groundEggs: GroundEgg[] = [];

  for (const obj of objects) {
    switch (obj.type.toLowerCase()) {
      case 'npc':
        npcs.push(parseNPC(obj, tilewidth, tileheight));
        break;
      case 'warp':
        warps.push(parseWarp(obj, tilewidth, tileheight));
        break;
      case 'egg':
        groundEggs.push(parseGroundEgg(obj, tilewidth, tileheight));
        break;
    }
  }

  // Get map properties
  const mapName = getProperty(properties, 'name', mapId);
  const isOutdoor = getProperty(properties, 'isOutdoor', true);

  return {
    id: mapId,
    name: mapName,
    width,
    height,
    tiles,
    warps,
    npcs,
    groundEggs: groundEggs.length > 0 ? groundEggs : undefined,
    encounterTable: [], // Must be set separately
    isOutdoor,
  };
}

/**
 * Helper to load a Tiled map from a URL
 */
export async function fetchTiledMap(url: string, mapId: string): Promise<MapData> {
  const response = await fetch(url);
  const json = await response.json();
  return loadTiledMap(json, mapId);
}

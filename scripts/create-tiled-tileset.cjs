// Creates a combined tileset image and Tiled TSX file for map editing
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TILE_SIZE = 16;
const TILES_PER_ROW = 16;

// Define our game tiles with their source spritesheets
// These match the TILE constants in src/data/tiles.ts
const GAME_TILES = [
  // Index 0-9: Basic terrain
  { name: 'FLOOR', sheet: 'terrain-ground', index: 0 },       // 0
  { name: 'WALL', sheet: 'terrain-cliffs', index: 8 },        // 1
  { name: 'SAND', sheet: 'terrain-ground', index: 1 },        // 2
  { name: 'ROCK', sheet: 'nature-trees', index: 0 },          // 3
  { name: 'WATER', sheet: 'terrain-ground', index: 21 },      // 4
  { name: 'KELP', sheet: 'nature-trees', index: 5 },          // 5
  { name: 'DEEP', sheet: 'terrain-ground', index: 21 },       // 6
  { name: 'REEF', sheet: 'terrain-ground', index: 22 },       // 7
  { name: 'DOCK', sheet: 'interior-floors', index: 0 },       // 8
  { name: 'HEAL', sheet: 'objects-signs', index: 10 },        // 9

  // Index 10-19: More terrain
  { name: 'DEEP_REEF', sheet: 'terrain-ground', index: 21 },  // 10
  { name: 'PELAGIC', sheet: 'terrain-ground', index: 21 },    // 11
  { name: 'ABYSS', sheet: 'buildings-dark', index: 32 },      // 12
  { name: 'REEF_KELP', sheet: 'nature-trees', index: 7 },     // 13
  { name: 'TIDE_POOL', sheet: 'terrain-ground', index: 22 },  // 14
  { name: 'CORAL', sheet: 'nature-trees', index: 4 },         // 15
  { name: 'SEAGRASS', sheet: 'nature-trees', index: 6 },      // 16
  { name: 'CAVE', sheet: 'buildings-dark', index: 0 },        // 17
  { name: 'SHIPWRECK', sheet: 'buildings-dark', index: 16 },  // 18
  { name: 'FLOWER', sheet: 'nature-small', index: 0 },        // 19

  // Index 20-21: Trees/vegetation
  { name: 'PALM', sheet: 'nature-trees', index: 16 },         // 20
  { name: 'STAIRS', sheet: 'terrain-ground', index: 4 },      // 21
];

async function loadSheet(name) {
  const filePath = path.join(__dirname, '..', 'assets', 'base-tilesets', 'spritesheets', `${name}.png`);
  return sharp(filePath);
}

async function extractTile(sheetName, tileIndex) {
  const sheet = await loadSheet(sheetName);
  const srcX = (tileIndex % TILES_PER_ROW) * TILE_SIZE;
  const srcY = Math.floor(tileIndex / TILES_PER_ROW) * TILE_SIZE;

  return sheet
    .extract({ left: srcX, top: srcY, width: TILE_SIZE, height: TILE_SIZE })
    .png()
    .toBuffer();
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'assets', 'tiled');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Creating combined game tileset for Tiled...');

  // Create composites for all game tiles
  const composites = [];
  for (let i = 0; i < GAME_TILES.length; i++) {
    const tile = GAME_TILES[i];
    try {
      const tileBuffer = await extractTile(tile.sheet, tile.index);
      const x = (i % TILES_PER_ROW) * TILE_SIZE;
      const y = Math.floor(i / TILES_PER_ROW) * TILE_SIZE;
      composites.push({
        input: tileBuffer,
        left: x,
        top: y
      });
      console.log(`  [${i}] ${tile.name} <- ${tile.sheet}:${tile.index}`);
    } catch (err) {
      console.warn(`  [${i}] ${tile.name} - FAILED: ${err.message}`);
    }
  }

  // Calculate image size
  const rows = Math.ceil(GAME_TILES.length / TILES_PER_ROW);
  const width = TILES_PER_ROW * TILE_SIZE;
  const height = rows * TILE_SIZE;

  // Create the combined tileset image
  const tilesetPath = path.join(outputDir, 'game-tileset.png');
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(composites)
    .png()
    .toFile(tilesetPath);

  console.log(`\nCreated: ${tilesetPath}`);

  // Create Tiled TSX file
  const tsxContent = `<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.2" name="game-tileset" tilewidth="${TILE_SIZE}" tileheight="${TILE_SIZE}" tilecount="${GAME_TILES.length}" columns="${TILES_PER_ROW}">
 <image source="game-tileset.png" width="${width}" height="${height}"/>
${GAME_TILES.map((tile, i) => ` <tile id="${i}">
  <properties>
   <property name="name" value="${tile.name}"/>
  </properties>
 </tile>`).join('\n')}
</tileset>
`;

  const tsxPath = path.join(outputDir, 'game-tileset.tsx');
  fs.writeFileSync(tsxPath, tsxContent);
  console.log(`Created: ${tsxPath}`);

  // Create a tile mapping JSON for the game to reference
  const mappingPath = path.join(outputDir, 'tile-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify({
    tileSize: TILE_SIZE,
    tilesPerRow: TILES_PER_ROW,
    tiles: GAME_TILES.map((tile, i) => ({
      id: i,
      name: tile.name,
      sourceSheet: tile.sheet,
      sourceIndex: tile.index
    }))
  }, null, 2));
  console.log(`Created: ${mappingPath}`);

  // Create README
  const readmePath = path.join(outputDir, 'README.md');
  fs.writeFileSync(readmePath, `# Tiled Map Editor Integration

## Setup

1. Install Tiled from https://www.mapeditor.org/
2. Open Tiled and create a new map:
   - Map size: 20x18 tiles (or custom)
   - Tile size: 16x16 pixels
   - Orientation: Orthogonal
3. Add the tileset: Tileset → New Tileset → Browse to \`game-tileset.tsx\`

## Tile Reference

| ID | Name | Description |
|----|------|-------------|
${GAME_TILES.map((tile, i) => `| ${i} | ${tile.name} | From ${tile.sheet} |`).join('\n')}

## Exporting Maps

1. Save your map as JSON format: File → Export As → JSON (.json)
2. Place the exported JSON in \`src/data/maps/tiled/\`
3. Use the map loader to import it into the game

## Map Properties

Set these properties on your map in Tiled:
- \`name\`: Display name of the map
- \`isOutdoor\`: true/false for outdoor lighting

## Layer Names

- \`tiles\`: Main tile layer (required)
- \`collision\`: Optional collision layer
- \`objects\`: Object layer for NPCs, warps, etc.
`);
  console.log(`Created: ${readmePath}`);

  console.log('\nDone! Open Tiled and use assets/tiled/game-tileset.tsx');
}

main().catch(console.error);

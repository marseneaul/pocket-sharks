const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TILE_SIZE = 16;
const TILES_PER_ROW = 16; // 16 tiles per row = 256px wide

async function createSpritesheet(categoryDir, outputPath) {
  // Get all PNG files sorted
  const files = fs.readdirSync(categoryDir)
    .filter(f => f.endsWith('.png'))
    .sort();

  if (files.length === 0) {
    console.log(`  Skipping empty category`);
    return 0;
  }

  const rows = Math.ceil(files.length / TILES_PER_ROW);
  const width = TILES_PER_ROW * TILE_SIZE;
  const height = rows * TILE_SIZE;

  // Create composite operations
  const composites = [];
  for (let i = 0; i < files.length; i++) {
    const x = (i % TILES_PER_ROW) * TILE_SIZE;
    const y = Math.floor(i / TILES_PER_ROW) * TILE_SIZE;
    composites.push({
      input: path.join(categoryDir, files[i]),
      left: x,
      top: y
    });
  }

  // Create spritesheet
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
    .toFile(outputPath);

  return files.length;
}

async function main() {
  const baseDir = path.join(__dirname, '..', 'assets', 'base-tilesets');
  const categorizedDir = path.join(baseDir, 'categorized-color');
  const outputDir = path.join(baseDir, 'spritesheets');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all categories
  const categories = fs.readdirSync(categorizedDir)
    .filter(f => fs.statSync(path.join(categorizedDir, f)).isDirectory());

  console.log('Creating spritesheets...\n');

  const manifest = {};

  for (const category of categories) {
    const categoryPath = path.join(categorizedDir, category);
    const outputPath = path.join(outputDir, `${category}.png`);

    process.stdout.write(`  ${category}... `);
    const count = await createSpritesheet(categoryPath, outputPath);
    console.log(`${count} tiles`);

    manifest[category] = {
      file: `${category}.png`,
      tileCount: count,
      tilesPerRow: TILES_PER_ROW,
      tileSize: TILE_SIZE
    };
  }

  // Write manifest
  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\nCreated ${categories.length} spritesheets in:`);
  console.log(`  assets/base-tilesets/spritesheets/`);
  console.log(`  + manifest.json`);
}

main().catch(console.error);

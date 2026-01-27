const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TILE_SIZE = 16; // 16x16 pixel tiles

async function extractTiles(inputPath, outputDir) {
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load image and get metadata
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  console.log(`Processing ${inputPath}: ${width}x${height}`);

  const tilesX = Math.floor(width / TILE_SIZE);
  const tilesY = Math.floor(height / TILE_SIZE);

  console.log(`Extracting ${tilesX}x${tilesY} = ${tilesX * tilesY} tiles...`);

  let extracted = 0;
  let skipped = 0;

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      const left = x * TILE_SIZE;
      const top = y * TILE_SIZE;

      // Extract tile
      const tileBuffer = await sharp(inputPath)
        .extract({ left, top, width: TILE_SIZE, height: TILE_SIZE })
        .png()
        .toBuffer();

      // Check if tile is empty (all transparent or all same color)
      const { data, info } = await sharp(tileBuffer)
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Check if tile has any non-transparent content
      let hasContent = false;
      let firstPixel = null;
      let isUniform = true;

      for (let i = 0; i < data.length; i += info.channels) {
        const alpha = info.channels === 4 ? data[i + 3] : 255;

        if (alpha > 0) {
          hasContent = true;
          const pixel = `${data[i]}-${data[i+1]}-${data[i+2]}`;
          if (firstPixel === null) {
            firstPixel = pixel;
          } else if (pixel !== firstPixel) {
            isUniform = false;
          }
        }
      }

      // Skip empty or uniform tiles
      if (!hasContent || isUniform) {
        skipped++;
        continue;
      }

      // Save tile with row-column naming
      const tileName = `tile_${String(y).padStart(2, '0')}_${String(x).padStart(2, '0')}.png`;
      const outputPath = path.join(outputDir, tileName);

      await sharp(tileBuffer).toFile(outputPath);
      extracted++;
    }
  }

  console.log(`Extracted: ${extracted}, Skipped (empty/uniform): ${skipped}`);
}

async function main() {
  const baseDir = path.join(__dirname, '..', 'assets', 'base-tilesets');

  // Extract from monochrome tileset
  await extractTiles(
    path.join(baseDir, 'tilesets.png'),
    path.join(baseDir, 'tiles-mono')
  );

  // Extract from color tileset
  await extractTiles(
    path.join(baseDir, 'tilesets-color.png'),
    path.join(baseDir, 'tiles-color')
  );

  console.log('\nDone! Tiles extracted to:');
  console.log('  assets/base-tilesets/tiles-mono/');
  console.log('  assets/base-tilesets/tiles-color/');
}

main().catch(console.error);

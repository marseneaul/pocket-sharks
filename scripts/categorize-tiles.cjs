const fs = require('fs');
const path = require('path');

// Define tile categories based on their position in the original spritesheet
// Format: { category: [[rowStart, rowEnd, colStart, colEnd], ...] }
const CATEGORIES = {
  'terrain-cliffs': [
    [0, 7, 0, 7],      // Main cliff/rock area
  ],
  'terrain-ground': [
    [0, 7, 8, 11],     // Ground/path variations
    [0, 4, 12, 18],    // Grass patterns
  ],
  'terrain-water': [
    [0, 4, 19, 25],    // Water edges
  ],
  'nature-trees': [
    [5, 7, 8, 11],     // Trees section
    [5, 7, 12, 24],    // Trees and bushes row
    [8, 12, 8, 11],    // More trees
    [8, 12, 12, 20],   // More trees, hedges
  ],
  'nature-small': [
    [0, 5, 26, 31],    // Small flowers, rocks, grass tufts
  ],
  'objects-outdoor': [
    [8, 12, 0, 7],     // Fences, paths, stones
    [6, 7, 26, 31],    // More outdoor objects
  ],
  'objects-signs': [
    [3, 5, 12, 18],    // Signs
    [45, 50, 0, 10],   // SHOP/HEAL signs
  ],
  'furniture': [
    [8, 14, 26, 39],   // All furniture area
    [15, 20, 26, 39],  // More furniture
    [13, 20, 8, 14],   // Interior objects
  ],
  'interior-walls': [
    [13, 20, 0, 7],    // Interior wall tiles
  ],
  'interior-floors': [
    [21, 30, 14, 31],  // Floor patterns
    [31, 40, 14, 31],  // More floors
  ],
  'roofs': [
    [13, 20, 15, 25],  // Roof tiles (various colors)
  ],
  'buildings-small': [
    [21, 35, 0, 13],   // Small building facades
  ],
  'buildings-large': [
    [0, 20, 32, 45],   // Large building right side
    [36, 50, 0, 13],   // More buildings
  ],
  'buildings-dark': [
    [52, 63, 0, 31],   // Dark/night building tiles
  ],
};

function getTileCategory(row, col) {
  for (const [category, regions] of Object.entries(CATEGORIES)) {
    for (const [rowStart, rowEnd, colStart, colEnd] of regions) {
      if (row >= rowStart && row <= rowEnd && col >= colStart && col <= colEnd) {
        return category;
      }
    }
  }
  return 'misc';
}

function categorizeTiles(sourceDir, outputBaseDir) {
  // Remove old categorized directory if it exists
  if (fs.existsSync(outputBaseDir)) {
    fs.rmSync(outputBaseDir, { recursive: true });
  }

  // Create output directories
  const categories = [...Object.keys(CATEGORIES), 'misc'];
  for (const cat of categories) {
    const catDir = path.join(outputBaseDir, cat);
    fs.mkdirSync(catDir, { recursive: true });
  }

  // Read all tiles
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));
  const categoryCounts = {};

  for (const file of files) {
    // Parse row and col from filename: tile_ROW_COL.png
    const match = file.match(/tile_(\d+)_(\d+)\.png/);
    if (!match) continue;

    const row = parseInt(match[1], 10);
    const col = parseInt(match[2], 10);
    const category = getTileCategory(row, col);

    // Copy file to category folder
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(outputBaseDir, category, file);
    fs.copyFileSync(srcPath, destPath);

    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }

  return categoryCounts;
}

async function main() {
  const baseDir = path.join(__dirname, '..', 'assets', 'base-tilesets');

  console.log('Categorizing color tiles...');
  const colorCounts = categorizeTiles(
    path.join(baseDir, 'tiles-color'),
    path.join(baseDir, 'categorized-color')
  );

  console.log('Categorizing mono tiles...');
  const monoCounts = categorizeTiles(
    path.join(baseDir, 'tiles-mono'),
    path.join(baseDir, 'categorized-mono')
  );

  console.log('\n=== Tiles by Category ===');
  const total = Object.values(colorCounts).reduce((a, b) => a + b, 0);
  for (const [cat, count] of Object.entries(colorCounts).sort((a, b) => b[1] - a[1])) {
    const pct = ((count / total) * 100).toFixed(1);
    console.log(`  ${cat.padEnd(20)} ${String(count).padStart(4)} tiles (${pct}%)`);
  }
  console.log(`  ${'TOTAL'.padEnd(20)} ${String(total).padStart(4)} tiles`);

  console.log('\nCategorized tiles saved to:');
  console.log('  assets/base-tilesets/categorized-color/');
  console.log('  assets/base-tilesets/categorized-mono/');
}

main().catch(console.error);

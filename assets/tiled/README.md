# Tiled Map Editor Integration

## Setup

1. Install Tiled from https://www.mapeditor.org/
2. Open Tiled and create a new map:
   - Map size: 20x18 tiles (or custom)
   - Tile size: 16x16 pixels
   - Orientation: Orthogonal
3. Add the tileset: Tileset → New Tileset → Browse to `game-tileset.tsx`

## Tile Reference

| ID | Name | Description |
|----|------|-------------|
| 0 | FLOOR | From terrain-ground |
| 1 | WALL | From terrain-cliffs |
| 2 | SAND | From terrain-ground |
| 3 | ROCK | From nature-trees |
| 4 | WATER | From terrain-ground |
| 5 | KELP | From nature-trees |
| 6 | DEEP | From terrain-ground |
| 7 | REEF | From terrain-ground |
| 8 | DOCK | From interior-floors |
| 9 | HEAL | From objects-signs |
| 10 | DEEP_REEF | From terrain-ground |
| 11 | PELAGIC | From terrain-ground |
| 12 | ABYSS | From buildings-dark |
| 13 | REEF_KELP | From nature-trees |
| 14 | TIDE_POOL | From terrain-ground |
| 15 | CORAL | From nature-trees |
| 16 | SEAGRASS | From nature-trees |
| 17 | CAVE | From buildings-dark |
| 18 | SHIPWRECK | From buildings-dark |
| 19 | FLOWER | From nature-small |
| 20 | PALM | From nature-trees |
| 21 | STAIRS | From terrain-ground |

## Exporting Maps

1. Save your map as JSON format: File → Export As → JSON (.json)
2. Place the exported JSON in `src/data/maps/tiled/`
3. Use the map loader to import it into the game

## Map Properties

Set these properties on your map in Tiled:
- `name`: Display name of the map
- `isOutdoor`: true/false for outdoor lighting

## Layer Names

- `tiles`: Main tile layer (required)
- `collision`: Optional collision layer
- `objects`: Object layer for NPCs, warps, etc.

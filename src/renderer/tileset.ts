import { getContext } from './canvas.ts';
import { DMG_PALETTE } from '../constants.ts';
import { TILE } from '../data/tiles.ts';

const TILE_SIZE = 8;

interface TileSprite {
  pixels: number[][]; // 8x8, values 0-3 for palette index
}

const tileCache: Map<number, TileSprite> = new Map();

function generateTileSprite(tileIndex: number): TileSprite {
  const pixels: number[][] = Array(TILE_SIZE).fill(null).map(() => Array(TILE_SIZE).fill(3));

  switch (tileIndex) {
    case TILE.FLOOR:
      // Clean floor with subtle texture
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = 3;
          if ((x + y) % 7 === 0) pixels[y][x] = 2;
        }
      }
      break;

    case TILE.WALL:
      // Solid rock wall with texture
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = 1;
          if (y === 0 || y === 4) pixels[y][x] = 0;
          if ((y === 2 || y === 6) && x === 4) pixels[y][x] = 0;
          if ((y === 2 || y === 6) && x === 0) pixels[y][x] = 0;
        }
      }
      break;

    case TILE.WATER:
      // Animated-looking water with waves
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const pattern = (x + y) % 4;
          if (pattern === 0) pixels[y][x] = 1;
          else if (pattern === 1) pixels[y][x] = 2;
          else pixels[y][x] = 2;
        }
      }
      // Wave highlights
      pixels[1][2] = 3; pixels[1][3] = 3;
      pixels[5][6] = 3; pixels[5][7] = 3;
      break;

    case TILE.KELP:
      // Water base with kelp strands
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const pattern = (x + y) % 4;
          if (pattern === 0) pixels[y][x] = 1;
          else pixels[y][x] = 2;
        }
      }
      // Kelp strands
      pixels[1][2] = 0; pixels[2][2] = 1; pixels[3][3] = 0;
      pixels[4][2] = 1; pixels[5][2] = 0; pixels[6][3] = 1;
      pixels[2][5] = 0; pixels[3][5] = 1; pixels[4][6] = 0;
      pixels[5][5] = 1; pixels[6][5] = 0; pixels[7][6] = 1;
      break;

    case TILE.DEEP:
      // Dark deep water
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = ((x + y) % 2 === 0) ? 0 : 1;
        }
      }
      break;

    case TILE.SAND:
      // Sandy beach with dots
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = 3;
        }
      }
      // Sand grain texture
      pixels[1][1] = 2; pixels[1][5] = 2;
      pixels[3][3] = 2; pixels[3][7] = 2;
      pixels[5][0] = 2; pixels[5][4] = 2;
      pixels[7][2] = 2; pixels[7][6] = 2;
      break;

    case TILE.DOCK:
      // Wooden dock planks
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = 2;
        }
      }
      // Plank lines
      for (let x = 0; x < TILE_SIZE; x++) {
        pixels[0][x] = 1;
        pixels[3][x] = 1;
        pixels[7][x] = 1;
      }
      // Wood grain
      pixels[1][2] = 1; pixels[2][5] = 1;
      pixels[5][1] = 1; pixels[6][4] = 1;
      break;

    case TILE.HEAL:
      // Healing pool with glow
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const dist = Math.abs(x - 3.5) + Math.abs(y - 3.5);
          if (dist < 2) pixels[y][x] = 3;
          else if (dist < 4) pixels[y][x] = 2;
          else pixels[y][x] = 1;
        }
      }
      // Cross symbol
      pixels[2][3] = 3; pixels[2][4] = 3;
      pixels[3][2] = 3; pixels[3][3] = 3; pixels[3][4] = 3; pixels[3][5] = 3;
      pixels[4][2] = 3; pixels[4][3] = 3; pixels[4][4] = 3; pixels[4][5] = 3;
      pixels[5][3] = 3; pixels[5][4] = 3;
      break;

    case TILE.REEF:
      // Reef water - slightly different pattern from regular water
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const pattern = (x + y) % 3;
          if (pattern === 0) pixels[y][x] = 1;
          else pixels[y][x] = 2;
        }
      }
      // Coral-like dots
      pixels[1][1] = 3; pixels[2][5] = 3;
      pixels[4][2] = 3; pixels[5][6] = 3;
      pixels[6][1] = 3; pixels[7][4] = 3;
      break;

    case TILE.DEEP_REEF:
      // Deeper reef - darker with some coral
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const pattern = (x + y) % 3;
          if (pattern === 0) pixels[y][x] = 0;
          else pixels[y][x] = 1;
        }
      }
      // Dim coral highlights
      pixels[1][3] = 2; pixels[3][6] = 2;
      pixels[5][1] = 2; pixels[6][5] = 2;
      break;

    case TILE.CAVE:
      // Cave - very dark with occasional lighter spots
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = 0;
        }
      }
      // Rock texture hints
      pixels[0][4] = 1; pixels[2][1] = 1;
      pixels[4][6] = 1; pixels[6][3] = 1;
      pixels[3][3] = 1; pixels[7][7] = 1;
      break;

    case TILE.PELAGIC:
      // Open ocean - blue gradient effect
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          if ((x + y) % 5 === 0) pixels[y][x] = 1;
          else if ((x + y) % 3 === 0) pixels[y][x] = 2;
          else pixels[y][x] = 2;
        }
      }
      // Wave pattern
      pixels[2][1] = 3; pixels[2][2] = 3;
      pixels[6][5] = 3; pixels[6][6] = 3;
      break;

    case TILE.ABYSS:
      // Abyssal depths - near black
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          pixels[y][x] = 0;
        }
      }
      // Occasional bioluminescence
      pixels[2][5] = 1;
      pixels[5][2] = 1;
      break;

    case TILE.REEF_KELP:
      // Reef with kelp overlay
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const pattern = (x + y) % 3;
          if (pattern === 0) pixels[y][x] = 1;
          else pixels[y][x] = 2;
        }
      }
      // Kelp strands (like regular kelp)
      pixels[1][2] = 0; pixels[2][2] = 1; pixels[3][3] = 0;
      pixels[4][2] = 1; pixels[5][2] = 0; pixels[6][3] = 1;
      // Coral dots
      pixels[2][6] = 3; pixels[5][5] = 3;
      break;

    case TILE.TIDE_POOL:
      // Tide pool - shallow rocky pool
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          const dist = Math.abs(x - 3.5) + Math.abs(y - 3.5);
          if (dist < 3) {
            // Water in center
            pixels[y][x] = 2;
          } else {
            // Rocky edge
            pixels[y][x] = 1;
          }
        }
      }
      // Water highlights
      pixels[3][3] = 3; pixels[4][4] = 3;
      // Rock texture
      pixels[0][0] = 0; pixels[0][7] = 0;
      pixels[7][0] = 0; pixels[7][7] = 0;
      break;
  }

  return { pixels };
}

export function getTileSprite(tileIndex: number): TileSprite {
  if (!tileCache.has(tileIndex)) {
    tileCache.set(tileIndex, generateTileSprite(tileIndex));
  }
  return tileCache.get(tileIndex)!;
}

export function drawTile(tileIndex: number, x: number, y: number): void {
  const ctx = getContext();
  const sprite = getTileSprite(tileIndex);
  const colors = [DMG_PALETTE.BLACK, DMG_PALETTE.DARK, DMG_PALETTE.LIGHT, DMG_PALETTE.WHITE];

  for (let row = 0; row < TILE_SIZE; row++) {
    for (let col = 0; col < TILE_SIZE; col++) {
      const colorIndex = sprite.pixels[row][col];
      ctx.fillStyle = colors[colorIndex];
      ctx.fillRect(Math.floor(x + col), Math.floor(y + row), 1, 1);
    }
  }
}

// Player sprite data - Pokemon Red/Blue chibi trainer style (16x16)
// . = transparent, # = black outline, @ = dark (clothes/hair), o = light (skin), O = white highlight
// Stubby proportions: big head, tiny body, short legs

const PLAYER_SPRITES: Record<string, string[]> = {
  // Facing down - standing (frame 0) - SYMMETRIC
  'down_0': [
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#oO##Oo#.....',
    '...#oooooo#.....',
    '....#oooo#......',
    '....##@@##......',
    '...#@@@@@@#.....',
    '..#@@@@@@@@#....',
    '..#@#@@@@#@#....',
    '...#@@@@@@#.....',
    '...#@@##@@#.....',
    '...#oo##oo#.....',
    '....##..##......',
    '................',
  ],
  // Facing down - walking (frame 1 - left foot forward)
  'down_1': [
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#oO##Oo#.....',
    '...#oooooo#.....',
    '....#oooo#......',
    '....##@@##......',
    '...#@@@@@@#.....',
    '..#@@@@@@@@#....',
    '..#@#@@@@#@#....',
    '...#@@@@@@#.....',
    '...#@@##@@#.....',
    '..#oo#..#oo#....',
    '..##......##....',
    '................',
  ],
  // Facing down - walking (frame 2 - right foot forward)
  'down_2': [
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#oO##Oo#.....',
    '...#oooooo#.....',
    '....#oooo#......',
    '....##@@##......',
    '...#@@@@@@#.....',
    '..#@@@@@@@@#....',
    '..#@#@@@@#@#....',
    '...#@@@@@@#.....',
    '...#@@##@@#.....',
    '....#oo##oo#....',
    '....##....##....',
    '................',
  ],
  // Facing up - standing (frame 0) - SYMMETRIC
  'up_0': [
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '....#@@@@#......',
    '....######......',
    '...#@@@@@@#.....',
    '..#@@@@@@@@#....',
    '..#@#@@@@#@#....',
    '...#@@@@@@#.....',
    '...#@@##@@#.....',
    '...#oo##oo#.....',
    '....##..##......',
    '................',
  ],
  // Facing up - walking (frame 1)
  'up_1': [
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '....#@@@@#......',
    '....######......',
    '...#@@@@@@#.....',
    '..#@@@@@@@@#....',
    '..#@#@@@@#@#....',
    '...#@@@@@@#.....',
    '...#@@##@@#.....',
    '..#oo#..#oo#....',
    '..##......##....',
    '................',
  ],
  // Facing up - walking (frame 2)
  'up_2': [
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '....#@@@@#......',
    '....######......',
    '...#@@@@@@#.....',
    '..#@@@@@@@@#....',
    '..#@#@@@@#@#....',
    '...#@@@@@@#.....',
    '...#@@##@@#.....',
    '....#oo##oo#....',
    '....##....##....',
    '................',
  ],
  // Facing left - standing (frame 0)
  'left_0': [
    '....####........',
    '...#@@@@#.......',
    '..#@@@@@#.......',
    '..#@@@@@#.......',
    '..#Oo@@@#.......',
    '..#oooo#........',
    '...#ooo#........',
    '...##@@##.......',
    '..#@@@@@@#......',
    '.#@@@@@@@@#.....',
    '.#@#@@@@@@#.....',
    '..#@@@@@@#......',
    '..#@@##@@#......',
    '..#oo##oo#......',
    '...##..##.......',
    '................',
  ],
  // Facing left - walking (frame 1)
  'left_1': [
    '....####........',
    '...#@@@@#.......',
    '..#@@@@@#.......',
    '..#@@@@@#.......',
    '..#Oo@@@#.......',
    '..#oooo#........',
    '...#ooo#........',
    '...##@@##.......',
    '..#@@@@@@#......',
    '.#@@@@@@@@#.....',
    '.#@#@@@@@@#.....',
    '..#@@@@@@#......',
    '..#@@##@@#......',
    '.#oo#..#oo#.....',
    '.##......##.....',
    '................',
  ],
  // Facing left - walking (frame 2)
  'left_2': [
    '....####........',
    '...#@@@@#.......',
    '..#@@@@@#.......',
    '..#@@@@@#.......',
    '..#Oo@@@#.......',
    '..#oooo#........',
    '...#ooo#........',
    '...##@@##.......',
    '..#@@@@@@#......',
    '.#@@@@@@@@#.....',
    '.#@#@@@@@@#.....',
    '..#@@@@@@#......',
    '..#@@##@@#......',
    '...#oo##oo#.....',
    '...##....##.....',
    '................',
  ],
  // Facing right - standing (frame 0) - MIRROR of left
  'right_0': [
    '........####....',
    '.......#@@@@#...',
    '.......#@@@@@#..',
    '.......#@@@@@#..',
    '.......#@@@oO#..',
    '........#oooo#..',
    '........#ooo#...',
    '.......##@@##...',
    '......#@@@@@@#..',
    '.....#@@@@@@@@#.',
    '.....#@@@@@@#@#.',
    '......#@@@@@@#..',
    '......#@@##@@#..',
    '......#oo##oo#..',
    '.......##..##...',
    '................',
  ],
  // Facing right - walking (frame 1)
  'right_1': [
    '........####....',
    '.......#@@@@#...',
    '.......#@@@@@#..',
    '.......#@@@@@#..',
    '.......#@@@oO#..',
    '........#oooo#..',
    '........#ooo#...',
    '.......##@@##...',
    '......#@@@@@@#..',
    '.....#@@@@@@@@#.',
    '.....#@@@@@@#@#.',
    '......#@@@@@@#..',
    '......#@@##@@#..',
    '.....#oo#..#oo#.',
    '.....##......##.',
    '................',
  ],
  // Facing right - walking (frame 2)
  'right_2': [
    '........####....',
    '.......#@@@@#...',
    '.......#@@@@@#..',
    '.......#@@@@@#..',
    '.......#@@@oO#..',
    '........#oooo#..',
    '........#ooo#...',
    '.......##@@##...',
    '......#@@@@@@#..',
    '.....#@@@@@@@@#.',
    '.....#@@@@@@#@#.',
    '......#@@@@@@#..',
    '......#@@##@@#..',
    '......#oo##oo#..',
    '.......##..##...',
    '................',
  ],
  // Swimming sprites - SYMMETRIC
  'swim_down_0': [
    '................',
    '................',
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#oO##Oo#.....',
    '...#oooooo#.....',
    '....#oooo#......',
    '..##@@@@@@##....',
    '.#@@@@@@@@@@#...',
    '.#@#@@@@@@#@#...',
    '..#@@@@@@@@#....',
    '...########.....',
    '................',
    '................',
    '................',
  ],
  'swim_down_1': [
    '................',
    '................',
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#oO##Oo#.....',
    '...#oooooo#.....',
    '....#oooo#......',
    '..##@@@@@@##....',
    '.#@@@@@@@@@@#...',
    '..#@@@@@@@@#....',
    '...########.....',
    '................',
    '................',
    '................',
    '................',
  ],
  'swim_down_2': [
    '................',
    '................',
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#oO##Oo#.....',
    '...#oooooo#.....',
    '....#oooo#......',
    '..##@@@@@@##....',
    '.#@@@@@@@@@@#...',
    '.#@#@@@@@@#@#...',
    '..#@@@@@@@@#....',
    '...########.....',
    '................',
    '................',
    '................',
  ],
  'swim_up_0': [
    '................',
    '................',
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '....#@@@@#......',
    '..##@@@@@@##....',
    '.#@@@@@@@@@@#...',
    '.#@#@@@@@@#@#...',
    '..#@@@@@@@@#....',
    '...########.....',
    '................',
    '................',
    '................',
  ],
  'swim_up_1': [
    '................',
    '................',
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '....#@@@@#......',
    '..##@@@@@@##....',
    '.#@@@@@@@@@@#...',
    '..#@@@@@@@@#....',
    '...########.....',
    '................',
    '................',
    '................',
    '................',
  ],
  'swim_up_2': [
    '................',
    '................',
    '.....####.......',
    '....#@@@@#......',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '...#@@@@@@#.....',
    '....#@@@@#......',
    '..##@@@@@@##....',
    '.#@@@@@@@@@@#...',
    '.#@#@@@@@@#@#...',
    '..#@@@@@@@@#....',
    '...########.....',
    '................',
    '................',
    '................',
  ],
  'swim_left_0': [
    '................',
    '................',
    '....####........',
    '...#@@@@#.......',
    '..#@@@@@#.......',
    '..#Oo@@@#.......',
    '..#oooo#........',
    '...#ooo#........',
    '.##@@@@@@##.....',
    '#@@@@@@@@@@#....',
    '#@#@@@@@@@@#....',
    '.#@@@@@@@@#.....',
    '..########......',
    '................',
    '................',
    '................',
  ],
  'swim_left_1': [
    '................',
    '................',
    '....####........',
    '...#@@@@#.......',
    '..#@@@@@#.......',
    '..#Oo@@@#.......',
    '..#oooo#........',
    '...#ooo#........',
    '.##@@@@@@##.....',
    '#@@@@@@@@@@#....',
    '.#@@@@@@@@#.....',
    '..########......',
    '................',
    '................',
    '................',
    '................',
  ],
  'swim_left_2': [
    '................',
    '................',
    '....####........',
    '...#@@@@#.......',
    '..#@@@@@#.......',
    '..#Oo@@@#.......',
    '..#oooo#........',
    '...#ooo#........',
    '.##@@@@@@##.....',
    '#@@@@@@@@@@#....',
    '#@#@@@@@@@@#....',
    '.#@@@@@@@@#.....',
    '..########......',
    '................',
    '................',
    '................',
  ],
  'swim_right_0': [
    '................',
    '................',
    '........####....',
    '.......#@@@@#...',
    '.......#@@@@@#..',
    '.......#@@@oO#..',
    '........#oooo#..',
    '........#ooo#...',
    '.....##@@@@@@##.',
    '....#@@@@@@@@@@#',
    '....#@@@@@@@@#@#',
    '.....#@@@@@@@@#.',
    '......########..',
    '................',
    '................',
    '................',
  ],
  'swim_right_1': [
    '................',
    '................',
    '........####....',
    '.......#@@@@#...',
    '.......#@@@@@#..',
    '.......#@@@oO#..',
    '........#oooo#..',
    '........#ooo#...',
    '.....##@@@@@@##.',
    '....#@@@@@@@@@@#',
    '.....#@@@@@@@@#.',
    '......########..',
    '................',
    '................',
    '................',
    '................',
  ],
  'swim_right_2': [
    '................',
    '................',
    '........####....',
    '.......#@@@@#...',
    '.......#@@@@@#..',
    '.......#@@@oO#..',
    '........#oooo#..',
    '........#ooo#...',
    '.....##@@@@@@##.',
    '....#@@@@@@@@@@#',
    '....#@@@@@@@@#@#',
    '.....#@@@@@@@@#.',
    '......########..',
    '................',
    '................',
    '................',
  ],
};

function parsePlayerSprite(lines: string[]): number[][] {
  const pixels: number[][] = [];
  for (let y = 0; y < 16; y++) {
    const row: number[] = [];
    const line = lines[y] || '';
    for (let x = 0; x < 16; x++) {
      const char = line[x] || '.';
      switch (char) {
        case '#': row.push(1); break; // Black outline
        case '@': row.push(2); break; // Dark (clothes/hair)
        case 'o': row.push(3); break; // Light (skin)
        case 'O': row.push(4); break; // White highlight (eyes)
        default: row.push(0); break;  // Transparent
      }
    }
    pixels.push(row);
  }
  return pixels;
}

const playerSpriteCache: Map<string, number[][]> = new Map();

export function getPlayerSprite(direction: string, frame: number, swimming: boolean): number[][] {
  const key = swimming ? `swim_${direction}_${frame}` : `${direction}_${frame}`;

  if (!playerSpriteCache.has(key)) {
    const spriteData = PLAYER_SPRITES[key] || PLAYER_SPRITES['down_0'];
    playerSpriteCache.set(key, parsePlayerSprite(spriteData));
  }

  return playerSpriteCache.get(key)!;
}

export function drawPlayer(x: number, y: number, direction: string, frame: number, swimming: boolean): void {
  const ctx = getContext();
  const sprite = getPlayerSprite(direction, frame, swimming);
  const colors = [null, DMG_PALETTE.BLACK, DMG_PALETTE.DARK, DMG_PALETTE.LIGHT, DMG_PALETTE.WHITE];

  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const colorIndex = sprite[row][col];
      if (colorIndex > 0) {
        ctx.fillStyle = colors[colorIndex]!;
        ctx.fillRect(Math.floor(x + col), Math.floor(y + row), 1, 1);
      }
    }
  }
}

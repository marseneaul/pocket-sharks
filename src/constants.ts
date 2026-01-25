// Game Boy DMG screen dimensions
export const SCREEN_WIDTH = 160;
export const SCREEN_HEIGHT = 144;
export const SCALE = 4; // Higher scale = more screen pixels per game pixel
export const CANVAS_WIDTH = SCREEN_WIDTH * SCALE;
export const CANVAS_HEIGHT = SCREEN_HEIGHT * SCALE;

// GBC palette colors
// Background/UI uses all 4 colors
// Sprites use 3 visible colors (index 0 is transparent)
export const DMG_PALETTE = {
  BLACK: '#0f0f0f',  // Darkest (UI text, borders)
  DARK: '#555555',   // Dark gray
  LIGHT: '#aaaaaa',  // Light gray
  WHITE: '#f0f0f0',  // Lightest (backgrounds)
  // Sprite-specific aliases (3 visible colors) - legacy, use SPRITE_PALETTES instead
  SPRITE_DARK: '#0f0f0f',
  SPRITE_MID: '#555555',
  SPRITE_LIGHT: '#aaaaaa'
} as const;

// Palette as array for indexed access (UI/background)
export const DMG_COLORS = [
  DMG_PALETTE.BLACK,
  DMG_PALETTE.DARK,
  DMG_PALETTE.LIGHT,
  DMG_PALETTE.WHITE
] as const;

// GBC-style sprite palettes (8 palettes, 3 visible colors each)
// Index 0 is transparent, indices 1-3 are dark/mid/light
export const SPRITE_PALETTES: readonly (readonly [null, string, string, string])[] = [
  // Palette 0: Gray (default - great whites, reef sharks)
  [null, '#1a1a2e', '#4a4a6a', '#8a8aaa'],

  // Palette 1: Blue (oceanic sharks, blue sharks)
  [null, '#1a2a4e', '#3a5a8e', '#6a9ace'],

  // Palette 2: Yellow/Tan (lemon shark, nurse shark)
  [null, '#4a3a1a', '#8a7a3a', '#caba6a'],

  // Palette 3: Brown (wobbegong, carpet sharks)
  [null, '#3a2a1a', '#6a4a2a', '#9a7a4a'],

  // Palette 4: Red/Orange (fire types, blacktip)
  [null, '#4a1a1a', '#8a3a2a', '#ca6a4a'],

  // Palette 5: Purple/Deep (deep sea, goblin shark)
  [null, '#2a1a3a', '#5a3a6a', '#8a6a9a'],

  // Palette 6: Green (algae types, kelp sharks)
  [null, '#1a3a2a', '#3a6a4a', '#6a9a7a'],

  // Palette 7: White/Pale (ghost sharks, albino)
  [null, '#5a5a6a', '#9a9aaa', '#dadaea'],
] as const;

// Palette indices for easy reference
export const PALETTE = {
  GRAY: 0,
  BLUE: 1,
  YELLOW: 2,
  BROWN: 3,
  RED: 4,
  PURPLE: 5,
  GREEN: 6,
  WHITE: 7,
} as const;

// Tile and sprite sizes
export const TILE_SIZE = 8;
export const SPRITE_SIZE = 64; // Creature sprites are 64x64 (8 tiles)

// Text rendering
export const FONT_CHAR_WIDTH = 8;
export const FONT_CHAR_HEIGHT = 8;
export const TEXT_SPEED = 30; // ms per character for typewriter effect

// Battle UI layout (Pokemon Red style)
// Top area: enemy info (left) + enemy sprite (right)
// Middle area: player sprite (left) + player info (right)
// Bottom area: text box
export const BATTLE_UI = {
  // Enemy: sprite on right, info on left
  ENEMY_SPRITE_X: 108,  // Right side (160 - 48 - 4 = 108)
  ENEMY_SPRITE_Y: 4,
  ENEMY_INFO_X: 4,      // Left side
  ENEMY_INFO_Y: 8,

  // Player: sprite on left, info on right
  PLAYER_SPRITE_X: 4,   // Left side
  PLAYER_SPRITE_Y: 40,
  PLAYER_INFO_X: 88,    // Right side
  PLAYER_INFO_Y: 48,

  // Text box takes bottom portion
  TEXT_BOX_Y: 96,
  TEXT_BOX_HEIGHT: 48,
  TEXT_PADDING: 8,

  // HP bar sizing
  HP_BAR_WIDTH: 48,
  HP_BAR_HEIGHT: 3,

  // Action menu (right side of text box)
  MENU_X: 88,
  MENU_Y: 104,
  MENU_ITEM_WIDTH: 32,
  MENU_ITEM_HEIGHT: 14
} as const;

// Timing
export const FRAME_DURATION = 1000 / 60; // 60 FPS
export const BATTLE_ANIMATION_SPEED = 200; // ms per animation frame
export const HP_DRAIN_SPEED = 50; // ms per HP point when draining

// Map color palettes (for GBC-style colored maps)
export type MapPaletteId = 'default' | 'tropical' | 'deep' | 'night' | 'coral' | 'arctic';

export interface MapPalette {
  id: MapPaletteId;
  name: string;
  colors: [string, string, string, string]; // Black, Dark, Light, White
}

export const MAP_PALETTES: Record<MapPaletteId, MapPalette> = {
  default: {
    id: 'default',
    name: 'Default',
    colors: ['#0f0f0f', '#555555', '#aaaaaa', '#f0f0f0']  // Original DMG
  },
  tropical: {
    id: 'tropical',
    name: 'Tropical',
    colors: ['#0a3a2a', '#2a7a5a', '#6ababa', '#c0f0e0']  // Warm teals/greens
  },
  deep: {
    id: 'deep',
    name: 'Deep Ocean',
    colors: ['#0a1a2a', '#1a3a5a', '#3a6a8a', '#6aaacc']  // Dark blues
  },
  night: {
    id: 'night',
    name: 'Night',
    colors: ['#000010', '#1a1a3a', '#3a3a6a', '#6a6a9a']  // Very dark
  },
  coral: {
    id: 'coral',
    name: 'Coral Reef',
    colors: ['#2a1a3a', '#6a3a6a', '#aa6a9a', '#eabacc']  // Pink/purple
  },
  arctic: {
    id: 'arctic',
    name: 'Arctic',
    colors: ['#1a2a3a', '#4a6a8a', '#8aaacc', '#d0e8f8']  // Icy blues
  }
};

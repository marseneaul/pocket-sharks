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
  // Sprite-specific aliases (3 visible colors)
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

import { SCREEN_WIDTH, DMG_PALETTE } from '../constants.ts';
import { getContext, drawBox } from './canvas.ts';
import { drawText } from './text.ts';

// Menu options
const MENU_OPTIONS = ['PARTY', 'BAG', 'BADGES', 'SHARKEDEX', 'SAVE', 'OPTIONS'] as const;
type MenuOption = typeof MENU_OPTIONS[number];

// State
let selectedIndex = 0;

export function initStartMenu(): void {
  selectedIndex = 0;
}

export function handleStartMenuInput(
  input: 'up' | 'down' | 'a' | 'b'
): 'close' | { action: 'select'; option: MenuOption } | null {
  if (input === 'up') {
    selectedIndex = (selectedIndex - 1 + MENU_OPTIONS.length) % MENU_OPTIONS.length;
    return null;
  } else if (input === 'down') {
    selectedIndex = (selectedIndex + 1) % MENU_OPTIONS.length;
    return null;
  } else if (input === 'a') {
    return { action: 'select', option: MENU_OPTIONS[selectedIndex] };
  } else if (input === 'b') {
    return 'close';
  }
  return null;
}

export function renderStartMenu(): void {
  const ctx = getContext();

  // Menu dimensions - Pokemon-style right-aligned menu
  const menuWidth = 56;
  const itemHeight = 14;
  const padding = 4;
  const menuHeight = MENU_OPTIONS.length * itemHeight + padding * 2;
  const menuX = SCREEN_WIDTH - menuWidth - 4;
  const menuY = 8;

  // Draw menu box
  drawBox(menuX, menuY, menuWidth, menuHeight);

  // Draw menu items
  for (let i = 0; i < MENU_OPTIONS.length; i++) {
    const y = menuY + padding + i * itemHeight;
    const isSelected = i === selectedIndex;

    // Selection highlight
    if (isSelected) {
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(menuX + 2, y - 1, menuWidth - 4, itemHeight - 2);
    }

    // Cursor
    if (isSelected) {
      drawText('>', menuX + 4, y);
    }

    // Option text
    drawText(MENU_OPTIONS[i], menuX + 12, y);
  }
}

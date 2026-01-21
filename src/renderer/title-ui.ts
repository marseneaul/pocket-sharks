import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.ts';
import { clear, fillRect, drawBox } from './canvas.ts';
import { drawText, drawTextCentered } from './text.ts';

const MENU_ITEMS = ['NEW GAME', 'CONTINUE', 'OPTIONS'];

let menuIndex = 0;
let hasSaveData = false;

export function initTitleScreen(): void {
  menuIndex = 0;
  // Check for saved game data
  hasSaveData = checkSaveData();
}

function checkSaveData(): boolean {
  try {
    const saved = localStorage.getItem('shark-pokemon-save');
    return saved !== null;
  } catch {
    return false;
  }
}

export function handleTitleInput(input: 'up' | 'down' | 'a' | 'b' | null): 'new-game' | 'continue' | 'options' | null {
  if (!input) return null;

  if (input === 'up') {
    menuIndex = (menuIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
    // Skip CONTINUE if no save data
    if (menuIndex === 1 && !hasSaveData) {
      menuIndex = 0;
    }
  } else if (input === 'down') {
    menuIndex = (menuIndex + 1) % MENU_ITEMS.length;
    // Skip CONTINUE if no save data
    if (menuIndex === 1 && !hasSaveData) {
      menuIndex = 2;
    }
  } else if (input === 'a') {
    switch (menuIndex) {
      case 0:
        return 'new-game';
      case 1:
        if (hasSaveData) {
          return 'continue';
        }
        break;
      case 2:
        return 'options';
    }
  }

  return null;
}

export function renderTitleScreen(): void {
  clear();

  // Background
  fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 3);

  // Title area
  drawTitleLogo();

  // Menu box
  const menuY = 90;
  const menuHeight = 50;
  drawBox(30, menuY, SCREEN_WIDTH - 60, menuHeight);

  // Menu items
  for (let i = 0; i < MENU_ITEMS.length; i++) {
    const y = menuY + 10 + i * 14;
    const item = MENU_ITEMS[i];

    // Dim CONTINUE if no save data
    if (i === 1 && !hasSaveData) {
      // Draw dimmed text (using the dark color)
      drawTextCentered(item, 0, SCREEN_WIDTH, y, 1);
    } else {
      // Draw selector arrow
      if (i === menuIndex) {
        drawText('>', 40, y);
      }
      drawTextCentered(item, 0, SCREEN_WIDTH, y);
    }
  }

  // Version/credits at bottom
  drawText('v0.1', 4, SCREEN_HEIGHT - 10);
}

function drawTitleLogo(): void {
  // Simple text-based logo for now
  // Could be replaced with pixel art later

  const titleY = 20;

  // Draw a decorative box for the title
  drawBox(10, titleY - 4, SCREEN_WIDTH - 20, 50);

  // Game title
  drawTextCentered('SHARK', 0, SCREEN_WIDTH, titleY + 8);
  drawTextCentered('POKEMON', 0, SCREEN_WIDTH, titleY + 22);

  // Subtitle
  drawTextCentered('Ocean Edition', 0, SCREEN_WIDTH, titleY + 38);
}

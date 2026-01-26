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
    const saved = localStorage.getItem('pocket-sharks-save');
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

  // Menu box - centered, sized to fit content
  // 3 items * 10px line height + 8px padding top/bottom = 46px
  const menuBoxWidth = 88;  // Fits "CONTINUE" (8 chars = 64px) + arrow + padding
  const menuBoxX = (SCREEN_WIDTH - menuBoxWidth) / 2;  // Center: (160-88)/2 = 36
  const menuY = 88;
  const menuHeight = 46;
  drawBox(menuBoxX, menuY, menuBoxWidth, menuHeight);

  // Menu items - left aligned within the box with arrow
  const itemX = menuBoxX + 16;  // 16px from box left edge for arrow + spacing
  const lineHeight = 12;  // 8px char height + 4px spacing

  for (let i = 0; i < MENU_ITEMS.length; i++) {
    const y = menuY + 8 + i * lineHeight;
    const item = MENU_ITEMS[i];

    // Dim CONTINUE if no save data
    if (i === 1 && !hasSaveData) {
      drawText(item, itemX, y, 1);
    } else {
      // Draw selector arrow
      if (i === menuIndex) {
        drawText('>', itemX - 10, y);
      }
      drawText(item, itemX, y);
    }
  }

  // Version at bottom left
  drawText('V0.1', 4, SCREEN_HEIGHT - 12);
}

function drawTitleLogo(): void {
  // Title box positioned at top with proper margins
  const boxY = 12;
  const boxHeight = 56;
  const boxWidth = SCREEN_WIDTH - 24;  // 12px margin each side
  const boxX = 12;

  drawBox(boxX, boxY, boxWidth, boxHeight);

  // Game title - centered in screen
  // "POCKET" = 6 chars = 48px, "SHARKS" = 6 chars = 48px
  const lineHeight = 14;  // 8px char + 6px spacing for title
  drawTextCentered('POCKET', 0, SCREEN_WIDTH, boxY + 10);
  drawTextCentered('SHARKS', 0, SCREEN_WIDTH, boxY + 10 + lineHeight);

  // Subtitle - smaller spacing
  // "OCEAN EDITION" = 13 chars = 104px (fits in 136px box width)
  drawTextCentered('OCEAN EDITION', 0, SCREEN_WIDTH, boxY + 10 + lineHeight * 2 + 4);
}

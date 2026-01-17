import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawText, drawTextCentered, drawTextRightAligned } from './text.ts';
import { getParty } from '../engine/game-state.ts';
import type { CreatureInstance } from '../types/index.ts';

// Party menu state
let menuIndex = 0;
let swapMode = false;
let swapIndex = 0;

export function initPartyMenu(): void {
  menuIndex = 0;
  swapMode = false;
  swapIndex = 0;
}

export function getPartyMenuIndex(): number {
  return menuIndex;
}

export function isInSwapMode(): boolean {
  return swapMode;
}

export function handlePartyInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'): 'close' | 'switch' | null {
  const party = getParty();

  if (input === 'up') {
    if (menuIndex > 0) menuIndex--;
  } else if (input === 'down') {
    if (menuIndex < party.length - 1) menuIndex++;
  } else if (input === 'a') {
    if (swapMode) {
      if (swapIndex !== menuIndex) {
        const temp = party[swapIndex];
        party[swapIndex] = party[menuIndex];
        party[menuIndex] = temp;
      }
      swapMode = false;
      return 'switch';
    } else {
      swapMode = true;
      swapIndex = menuIndex;
    }
  } else if (input === 'b') {
    if (swapMode) {
      swapMode = false;
    } else {
      return 'close';
    }
  }

  return null;
}

export function handleBattlePartyInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'): { action: 'close' | 'switch'; index?: number } | null {
  const party = getParty();

  if (input === 'up') {
    if (menuIndex > 0) menuIndex--;
  } else if (input === 'down') {
    if (menuIndex < party.length - 1) menuIndex++;
  } else if (input === 'a') {
    if (party[menuIndex].currentHp <= 0) return null;
    if (menuIndex === 0) return null;
    return { action: 'switch', index: menuIndex };
  } else if (input === 'b') {
    return { action: 'close' };
  }

  return null;
}

export function renderPartyMenu(inBattle: boolean = false): void {
  const ctx = getContext();

  // Dark background
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Title bar
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 12);
  const title = inBattle ? 'SWITCH SHARK' : 'PARTY';
  drawTextCentered(title, 0, SCREEN_WIDTH, 2, 3);

  // Number indicator (right-aligned)
  const party = getParty();
  drawTextRightAligned(`${party.length}/6`, 0, SCREEN_WIDTH - 4, 2, 2);

  // Party list area
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(2, 14, SCREEN_WIDTH - 4, 112);

  // Border
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(1.5, 13.5, SCREEN_WIDTH - 3, 113);

  const slotHeight = 18;
  const startY = 16;

  for (let i = 0; i < party.length; i++) {
    const creature = party[i];
    const y = startY + i * slotHeight;

    // Slot background
    if (i === menuIndex) {
      // Selected
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(4, y, SCREEN_WIDTH - 8, slotHeight - 2);
      ctx.strokeStyle = DMG_PALETTE.BLACK;
      ctx.strokeRect(3.5, y - 0.5, SCREEN_WIDTH - 7, slotHeight - 1);
    } else if (i % 2 === 0) {
      ctx.fillStyle = DMG_PALETTE.WHITE;
      ctx.fillRect(4, y, SCREEN_WIDTH - 8, slotHeight - 2);
    }

    // Swap mode indicator
    if (swapMode && i === swapIndex) {
      ctx.fillStyle = DMG_PALETTE.DARK;
      ctx.fillRect(6, y + 2, 4, slotHeight - 6);
    }

    // Cursor
    if (i === menuIndex) {
      drawText('>', 6, y + 2, 0);
    }

    // Creature name (truncated to fit)
    const name = (creature.nickname || creature.species.name).substring(0, 8);
    drawText(name, 16, y + 2, 0);

    // Level (compact)
    drawText(`L${creature.level}`, 82, y + 2, 0);

    // HP Bar
    drawHpBar(16, y + 11, 48, creature);

    // HP text (compact)
    const hpText = `${creature.currentHp}`;
    drawText(hpText, 68, y + 10, 1);

    // Status indicator on right
    if (creature.currentHp <= 0) {
      ctx.fillStyle = DMG_PALETTE.DARK;
      ctx.fillRect(120, y + 2, 28, 8);
      drawText('FNT', 124, y + 3, 3);
    } else if (i === 0) {
      // Active indicator for first slot
      ctx.fillStyle = DMG_PALETTE.BLACK;
      ctx.fillRect(112, y + 2, 36, 8);
      drawText('LEAD', 116, y + 3, 3);
    }
  }

  // Empty slots shown as dashed
  for (let i = party.length; i < 6; i++) {
    const y = startY + i * slotHeight;
    ctx.fillStyle = DMG_PALETTE.LIGHT;
    ctx.fillRect(4, y, SCREEN_WIDTH - 8, slotHeight - 2);
    drawTextCentered('- EMPTY -', 4, SCREEN_WIDTH - 8, y + 5, 1);
  }

  // Bottom instruction bar
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 128, SCREEN_WIDTH, 16);

  if (swapMode) {
    drawText('MOVE TO:', 4, 132, 2);
    drawText('X:CANCEL', 88, 132, 2);
  } else if (inBattle) {
    drawText('Z:SEND', 4, 132, 3);
    drawText('X:BACK', 104, 132, 2);
  } else {
    drawText('Z:SWAP', 4, 132, 3);
    drawText('X:CLOSE', 100, 132, 2);
  }
}

function drawHpBar(x: number, y: number, width: number, creature: CreatureInstance): void {
  const ctx = getContext();
  const hpPercent = creature.maxHp > 0 ? creature.currentHp / creature.maxHp : 0;
  const filledWidth = Math.max(0, Math.floor(width * hpPercent));

  // Background
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(x, y, width, 3);

  // HP fill
  if (hpPercent > 0.5) {
    ctx.fillStyle = DMG_PALETTE.WHITE;
  } else if (hpPercent > 0.2) {
    ctx.fillStyle = DMG_PALETTE.LIGHT;
  } else {
    ctx.fillStyle = DMG_PALETTE.DARK;
  }

  if (filledWidth > 0) {
    ctx.fillRect(x, y, filledWidth, 3);
  }

  // Border
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(x - 0.5, y - 0.5, width + 1, 4);
}

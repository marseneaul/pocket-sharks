import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawText, measureText } from './text.ts';
import { getInventory } from '../engine/game-state.ts';
import { getItem } from '../data/items.ts';

// Bag menu state
let menuIndex = 0;

export function initBagMenu(): void {
  menuIndex = 0;
}

export function getBagMenuIndex(): number {
  return menuIndex;
}

export function handleBagInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'): { action: 'close' | 'use'; itemId?: number } | null {
  const inventory = getInventory();
  const usableItems = inventory.filter(slot => {
    const item = getItem(slot.itemId);
    return item && slot.quantity > 0;
  });

  if (input === 'up') {
    if (menuIndex > 0) menuIndex--;
  } else if (input === 'down') {
    if (menuIndex < usableItems.length - 1) menuIndex++;
  } else if (input === 'a') {
    if (usableItems[menuIndex]) {
      return { action: 'use', itemId: usableItems[menuIndex].itemId };
    }
  } else if (input === 'b') {
    return { action: 'close' };
  }

  return null;
}

export function renderBagMenu(): void {
  const ctx = getContext();

  // Dark background
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Title
  drawTextCentered('BAG', 4);

  // Divider line
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(4, 14, SCREEN_WIDTH - 8, 1);

  // Get inventory items
  const inventory = getInventory();
  const usableItems = inventory.filter(slot => {
    const item = getItem(slot.itemId);
    return item && slot.quantity > 0;
  });

  if (usableItems.length === 0) {
    drawTextCentered('No items!', SCREEN_HEIGHT / 2 - 4);
    drawTextCentered('Press B to go back', SCREEN_HEIGHT / 2 + 8, 1);
    return;
  }

  // Render items
  const startY = 20;
  const itemHeight = 14;
  const maxVisible = 8;
  const scrollOffset = Math.max(0, menuIndex - maxVisible + 1);

  for (let i = 0; i < Math.min(usableItems.length, maxVisible); i++) {
    const index = i + scrollOffset;
    if (index >= usableItems.length) break;

    const slot = usableItems[index];
    const item = getItem(slot.itemId);
    if (!item) continue;

    const y = startY + i * itemHeight;
    const isSelected = index === menuIndex;

    // Selection highlight
    if (isSelected) {
      ctx.fillStyle = DMG_PALETTE.DARK;
      ctx.fillRect(4, y - 1, SCREEN_WIDTH - 8, itemHeight - 2);
    }

    // Cursor
    if (isSelected) {
      drawText('>', 6, y, 3); // White color
    }

    // Item name
    const colorIndex = isSelected ? 3 : 2; // White if selected, light gray otherwise
    drawText(item.name.toUpperCase(), 16, y, colorIndex);

    // Quantity
    const qtyText = `x${slot.quantity}`;
    const qtyWidth = measureText(qtyText);
    drawText(qtyText, SCREEN_WIDTH - 8 - qtyWidth, y, colorIndex);
  }

  // Scroll indicators
  if (scrollOffset > 0) {
    drawTextCentered('^', 16, 1);
  }
  if (scrollOffset + maxVisible < usableItems.length) {
    drawTextCentered('v', startY + maxVisible * itemHeight, 1);
  }

  // Description at bottom
  const selectedSlot = usableItems[menuIndex];
  if (selectedSlot) {
    const selectedItem = getItem(selectedSlot.itemId);
    if (selectedItem) {
      // Description background
      ctx.fillStyle = DMG_PALETTE.DARK;
      ctx.fillRect(0, SCREEN_HEIGHT - 24, SCREEN_WIDTH, 24);

      // Description text (wrap if needed)
      const desc = selectedItem.description || '';
      const maxChars = Math.floor((SCREEN_WIDTH - 8) / 8);
      const lines = wrapText(desc, maxChars);

      lines.slice(0, 2).forEach((line, i) => {
        drawText(line, 4, SCREEN_HEIGHT - 20 + i * 10, 3); // White color
      });
    }
  }

  // Controls hint
  drawText('A:USE  B:BACK', 4, SCREEN_HEIGHT - 10, 2);
}

// Draw text centered on screen
function drawTextCentered(text: string, y: number, colorIndex: number = 3): void {
  const textWidth = measureText(text);
  const x = Math.floor((SCREEN_WIDTH - textWidth) / 2);
  drawText(text, x, y, colorIndex);
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxChars) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

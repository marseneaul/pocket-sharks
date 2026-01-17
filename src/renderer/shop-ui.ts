import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawText, drawTextRightAligned } from './text.ts';
import { getItem } from '../data/items.ts';
import type { ShopInventory } from '../data/shops.ts';
import {
  getPlayerMoney,
  spendMoney,
  addMoney,
  getInventory,
  addItem,
  removeItem,
  getItemCount
} from '../engine/game-state.ts';

// Shop UI state
interface ShopUIState {
  shop: ShopInventory | null;
  mode: 'buy' | 'sell';
  cursor: number;
  quantity: number;
  phase: 'browse' | 'quantity' | 'confirm';
  message: string | null;
}

let uiState: ShopUIState = {
  shop: null,
  mode: 'buy',
  cursor: 0,
  quantity: 1,
  phase: 'browse',
  message: null
};

export function initShopUI(shop: ShopInventory): void {
  uiState = {
    shop,
    mode: 'buy',
    cursor: 0,
    quantity: 1,
    phase: 'browse',
    message: null
  };
}

export function getShopUIState(): ShopUIState {
  return uiState;
}

// Get items available for selling (player's inventory)
function getSellableItems(): { itemId: number; quantity: number }[] {
  return getInventory().filter(slot => {
    const item = getItem(slot.itemId);
    // Can only sell items with a price > 0
    return item && item.price > 0;
  });
}

// Handle input and return result
export function handleShopInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'): 'close' | null {
  if (!uiState.shop) return 'close';

  // Clear any message on input
  if (uiState.message) {
    uiState.message = null;
    return null;
  }

  if (uiState.phase === 'browse') {
    return handleBrowseInput(input);
  } else if (uiState.phase === 'quantity') {
    return handleQuantityInput(input);
  }

  return null;
}

function handleBrowseInput(input: string): 'close' | null {
  const items = uiState.mode === 'buy'
    ? uiState.shop!.items
    : getSellableItems();

  if (input === 'up') {
    if (uiState.cursor > 0) {
      uiState.cursor--;
    }
  } else if (input === 'down') {
    if (uiState.cursor < items.length - 1) {
      uiState.cursor++;
    }
  } else if (input === 'left' || input === 'right') {
    // Switch between buy/sell modes
    uiState.mode = uiState.mode === 'buy' ? 'sell' : 'buy';
    uiState.cursor = 0;
  } else if (input === 'a') {
    if (items.length > 0) {
      uiState.quantity = 1;
      uiState.phase = 'quantity';
    }
  } else if (input === 'b') {
    return 'close';
  }

  return null;
}

function handleQuantityInput(input: string): null {
  const items = uiState.mode === 'buy'
    ? uiState.shop!.items
    : getSellableItems();

  const currentItem = items[uiState.cursor];
  if (!currentItem) {
    uiState.phase = 'browse';
    return null;
  }

  const item = getItem(currentItem.itemId);
  if (!item) {
    uiState.phase = 'browse';
    return null;
  }

  const maxQuantity = uiState.mode === 'buy'
    ? Math.min(99, Math.floor(getPlayerMoney() / item.price))
    : (currentItem as { quantity: number }).quantity || 1;

  if (input === 'up' || input === 'right') {
    if (uiState.quantity < maxQuantity) {
      uiState.quantity++;
    }
  } else if (input === 'down' || input === 'left') {
    if (uiState.quantity > 1) {
      uiState.quantity--;
    }
  } else if (input === 'a') {
    // Confirm transaction
    if (uiState.mode === 'buy') {
      executeBuy(item.id, uiState.quantity);
    } else {
      executeSell(item.id, uiState.quantity);
    }
    uiState.phase = 'browse';
  } else if (input === 'b') {
    uiState.phase = 'browse';
  }

  return null;
}

function executeBuy(itemId: number, quantity: number): void {
  const item = getItem(itemId);
  if (!item) return;

  const totalCost = item.price * quantity;

  if (spendMoney(totalCost)) {
    addItem(itemId, quantity);
    uiState.message = `Bought ${quantity} ${item.name}!`;
  } else {
    uiState.message = "Not enough money!";
  }
}

function executeSell(itemId: number, quantity: number): void {
  const item = getItem(itemId);
  if (!item) return;

  const ownedQuantity = getItemCount(itemId);
  if (ownedQuantity < quantity) {
    uiState.message = "Not enough items!";
    return;
  }

  // Sell at half price
  const sellPrice = Math.floor(item.price / 2) * quantity;

  if (removeItem(itemId, quantity)) {
    addMoney(sellPrice);
    uiState.message = `Sold for $${sellPrice}!`;
  }
}

export function renderShop(): void {
  const ctx = getContext();

  if (!uiState.shop) return;

  // Background
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Header with shop name and money
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 14);

  drawText(uiState.shop.name, 4, 3, 3);
  const moneyStr = `$${getPlayerMoney()}`;
  drawTextRightAligned(moneyStr, 0, SCREEN_WIDTH - 4, 3, 3);

  // Mode tabs
  const buyColor = uiState.mode === 'buy' ? 0 : 2;
  const sellColor = uiState.mode === 'sell' ? 0 : 2;

  ctx.fillStyle = uiState.mode === 'buy' ? DMG_PALETTE.LIGHT : DMG_PALETTE.WHITE;
  ctx.fillRect(4, 16, 36, 12);
  ctx.fillStyle = uiState.mode === 'sell' ? DMG_PALETTE.LIGHT : DMG_PALETTE.WHITE;
  ctx.fillRect(44, 16, 36, 12);

  drawText('BUY', 10, 19, buyColor);
  drawText('SELL', 48, 19, sellColor);

  // Item list
  const items = uiState.mode === 'buy'
    ? uiState.shop.items
    : getSellableItems();

  const listStartY = 32;
  const itemHeight = 12;
  const maxVisible = 8;

  // Calculate scroll offset
  const scrollOffset = Math.max(0, uiState.cursor - maxVisible + 1);

  for (let i = 0; i < Math.min(items.length, maxVisible); i++) {
    const itemIndex = i + scrollOffset;
    if (itemIndex >= items.length) break;

    const shopItem = items[itemIndex];
    const item = getItem(shopItem.itemId);
    if (!item) continue;

    const y = listStartY + i * itemHeight;
    const isSelected = itemIndex === uiState.cursor;

    // Highlight selected item
    if (isSelected) {
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(4, y, SCREEN_WIDTH - 8, itemHeight - 1);
    }

    // Cursor
    if (isSelected) {
      drawText('>', 6, y + 2, 0);
    }

    // Item name (truncate if too long)
    const displayName = item.name.length > 10
      ? item.name.substring(0, 9) + '.'
      : item.name;
    drawText(displayName, 16, y + 2, 0);

    // Price (buy) or quantity owned (sell)
    if (uiState.mode === 'buy') {
      const priceStr = `$${item.price}`;
      drawTextRightAligned(priceStr, 0, SCREEN_WIDTH - 8, y + 2, 0);
    } else {
      const qtyStr = `x${(shopItem as { quantity: number }).quantity}`;
      drawTextRightAligned(qtyStr, 0, SCREEN_WIDTH - 8, y + 2, 0);
    }
  }

  // Empty list message
  if (items.length === 0) {
    const msg = uiState.mode === 'buy' ? 'No items available' : 'Nothing to sell';
    drawText(msg, 20, listStartY + 20, 2);
  }

  // Bottom panel
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, SCREEN_HEIGHT - 28, SCREEN_WIDTH, 28);

  if (uiState.message) {
    // Show transaction message
    drawText(uiState.message, 8, SCREEN_HEIGHT - 24, 3);
    drawText('Press any key...', 8, SCREEN_HEIGHT - 12, 3);
  } else if (uiState.phase === 'quantity') {
    // Quantity selection
    const item = getItem(items[uiState.cursor]?.itemId || 0);
    if (item) {
      const unitPrice = uiState.mode === 'buy'
        ? item.price
        : Math.floor(item.price / 2);
      const total = unitPrice * uiState.quantity;

      drawText(`HOW MANY? <${String(uiState.quantity).padStart(2, '0')}>`, 8, SCREEN_HEIGHT - 24, 3);
      // Right-align price to avoid overflow
      const priceText = `$${total}`;
      drawTextRightAligned(priceText, 0, SCREEN_WIDTH - 8, SCREEN_HEIGHT - 24, 3);

      const action = uiState.mode === 'buy' ? 'BUY' : 'SELL';
      drawText(`Z:${action}  X:CANCEL`, 8, SCREEN_HEIGHT - 12, 3);
    }
  } else {
    // Browse instructions
    if (items.length > 0) {
      const item = getItem(items[uiState.cursor]?.itemId || 0);
      if (item) {
        // Show item description
        const desc = item.description.length > 30
          ? item.description.substring(0, 29) + '.'
          : item.description;
        drawText(desc, 8, SCREEN_HEIGHT - 24, 3);
      }
    }
    drawText('Z:SELECT  X:EXIT', 8, SCREEN_HEIGHT - 12, 3);
  }
}

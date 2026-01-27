// Badge UI - Displays collected gym badges
import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext, drawBox } from './canvas.ts';
import { drawText, drawTextCentered } from './text.ts';
import { getPlayerBadges, getBadgeCount } from '../engine/game-state.ts';
import { getAllBadges, TOTAL_BADGES, type BadgeData } from '../data/badges.ts';

// State
let selectedIndex = 0;

export function initBadgeMenu(): void {
  selectedIndex = 0;
}

export function handleBadgeInput(
  input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'
): 'close' | null {
  const badges = getAllBadges();

  if (input === 'up') {
    if (selectedIndex >= 4) {
      selectedIndex -= 4;
    }
  } else if (input === 'down') {
    if (selectedIndex + 4 < badges.length) {
      selectedIndex += 4;
    }
  } else if (input === 'left') {
    if (selectedIndex > 0) {
      selectedIndex--;
    }
  } else if (input === 'right') {
    if (selectedIndex < badges.length - 1) {
      selectedIndex++;
    }
  } else if (input === 'b') {
    return 'close';
  }

  return null;
}

export function renderBadgeMenu(): void {
  const ctx = getContext();
  const playerBadges = getPlayerBadges();
  const allBadges = getAllBadges();

  // Background
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Title
  drawBox(0, 0, SCREEN_WIDTH, 20);
  drawTextCentered('BADGES', 0, SCREEN_WIDTH, 6, 0);
  drawText(`${getBadgeCount()}/${TOTAL_BADGES}`, SCREEN_WIDTH - 32, 6);

  // Badge grid area
  drawBox(0, 20, SCREEN_WIDTH, 80);

  // Draw 8 badges in a 4x2 grid
  const badgeSize = 32;
  const startX = 16;
  const startY = 28;
  const spacingX = 36;
  const spacingY = 36;

  for (let i = 0; i < allBadges.length; i++) {
    const badge = allBadges[i];
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = startX + col * spacingX;
    const y = startY + row * spacingY;

    const isOwned = playerBadges.includes(badge.id);
    const isSelected = i === selectedIndex;

    // Selection highlight
    if (isSelected) {
      ctx.strokeStyle = DMG_PALETTE.BLACK;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 2, y - 2, badgeSize + 4, badgeSize + 4);
      ctx.lineWidth = 1;
    }

    // Badge slot background
    ctx.fillStyle = isOwned ? DMG_PALETTE.LIGHT : DMG_PALETTE.DARK;
    ctx.fillRect(x, y, badgeSize, badgeSize);

    // Badge border
    ctx.strokeStyle = DMG_PALETTE.BLACK;
    ctx.strokeRect(x, y, badgeSize, badgeSize);

    if (isOwned) {
      // Draw badge symbol (simplified geometric shapes)
      drawBadgeSymbol(ctx, badge, x, y, badgeSize);
    } else {
      // Draw "?" for unowned badges
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('?', x + badgeSize / 2, y + badgeSize / 2 + 6);
      ctx.textAlign = 'left';
    }

    // Badge number
    drawText(`${i + 1}`, x + 2, y + badgeSize - 8, 1);
  }

  // Info panel at bottom
  drawBox(0, 100, SCREEN_WIDTH, 44);

  const selectedBadge = allBadges[selectedIndex];
  const isOwned = playerBadges.includes(selectedBadge.id);

  if (isOwned) {
    drawText(selectedBadge.name, 6, 106);
    drawText(`Leader: ${selectedBadge.gymLeaderName}`, 6, 118);
    drawText(selectedBadge.location, 6, 130);
  } else {
    drawText(selectedBadge.name, 6, 106);
    drawText('Not yet earned', 6, 118);
    drawText(`Location: ${selectedBadge.location}`, 6, 130);
  }
}

// Draw a unique symbol for each badge
function drawBadgeSymbol(
  ctx: CanvasRenderingContext2D,
  badge: BadgeData,
  x: number,
  y: number,
  size: number
): void {
  const cx = x + size / 2;
  const cy = y + size / 2;

  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.lineWidth = 2;

  switch (badge.id) {
    case 'ray':
      // Ray shape - diamond with wings
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx + 12, cy);
      ctx.lineTo(cx, cy + 10);
      ctx.lineTo(cx - 12, cy);
      ctx.closePath();
      ctx.fill();
      break;

    case 'cephalo':
      // Hammerhead shape - T shape
      ctx.fillRect(cx - 12, cy - 4, 24, 8);
      ctx.fillRect(cx - 3, cy - 4, 6, 14);
      break;

    case 'reef':
      // Coral/wave shape
      ctx.beginPath();
      ctx.arc(cx - 6, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 6, cy - 4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 4, cy + 6, 4, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'ocean':
      // Wave/water drop
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10);
      ctx.quadraticCurveTo(cx + 10, cy, cx, cy + 10);
      ctx.quadraticCurveTo(cx - 10, cy, cx, cy - 10);
      ctx.fill();
      break;

    case 'survivor':
      // Shield shape
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx + 10, cy - 6);
      ctx.lineTo(cx + 10, cy + 4);
      ctx.lineTo(cx, cy + 12);
      ctx.lineTo(cx - 10, cy + 4);
      ctx.lineTo(cx - 10, cy - 6);
      ctx.closePath();
      ctx.fill();
      break;

    case 'safari':
      // Star shape
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const r = i === 0 ? 0 : 10;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      break;

    case 'outback':
      // Ground/earth circle with cross
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = DMG_PALETTE.WHITE;
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy);
      ctx.lineTo(cx + 6, cy);
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx, cy + 6);
      ctx.stroke();
      break;

    case 'deepsea':
      // Depth marker / arrow pointing down
      ctx.beginPath();
      ctx.moveTo(cx, cy + 10);
      ctx.lineTo(cx + 10, cy - 4);
      ctx.lineTo(cx + 4, cy - 4);
      ctx.lineTo(cx + 4, cy - 10);
      ctx.lineTo(cx - 4, cy - 10);
      ctx.lineTo(cx - 4, cy - 4);
      ctx.lineTo(cx - 10, cy - 4);
      ctx.closePath();
      ctx.fill();
      break;
  }

  ctx.lineWidth = 1;
}

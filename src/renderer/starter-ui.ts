import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawText, drawTextCentered } from './text.ts';
import { drawCreatureSprite } from './sprites.ts';

// Starter selection state
let selectedIndex = 0;
let animFrame = 0;

// The three starters
const STARTERS = [
  { id: 1, name: 'BLACKNOSE', type: 'FIRE', desc1: 'SPEEDY HUNTER', desc2: 'FIERY METABOLISM' },
  { id: 4, name: 'WHITENOSE', type: 'FIGHT', desc1: 'BOLD BRAWLER', desc2: 'FEARS NOTHING' },
  { id: 7, name: 'HARDNOSE', type: 'STEEL', desc1: 'ARMORED TANK', desc2: 'TOUGH AS NAILS' }
];

export function initStarterSelect(): void {
  selectedIndex = 0;
  animFrame = 0;
}

export function getSelectedStarterId(): number {
  return STARTERS[selectedIndex].id;
}

export function handleStarterInput(input: 'left' | 'right' | 'a' | 'b'): 'select' | null {
  if (input === 'left') {
    selectedIndex = (selectedIndex - 1 + STARTERS.length) % STARTERS.length;
    animFrame = 0;
  } else if (input === 'right') {
    selectedIndex = (selectedIndex + 1) % STARTERS.length;
    animFrame = 0;
  } else if (input === 'a') {
    return 'select';
  }
  return null;
}

export function renderStarterSelect(): void {
  const ctx = getContext();
  animFrame++;

  // Dark background
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Decorative top border
  ctx.fillStyle = DMG_PALETTE.LIGHT;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 2);
  ctx.fillRect(0, 10, SCREEN_WIDTH, 1);

  // Title area with background
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 2, SCREEN_WIDTH, 8);
  drawTextCentered('CHOOSE YOUR PARTNER', 0, SCREEN_WIDTH, 3, 3);

  // Main display area - light background
  ctx.fillStyle = DMG_PALETTE.LIGHT;
  ctx.fillRect(4, 14, SCREEN_WIDTH - 8, 80);

  // Inner frame
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(6, 16, SCREEN_WIDTH - 12, 76);

  // Border
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(5.5, 15.5, SCREEN_WIDTH - 11, 77);

  const starter = STARTERS[selectedIndex];

  // Draw the shark sprite (centered, with slight bob animation)
  const bobOffset = Math.sin(animFrame * 0.1) * 2;
  const spriteX = Math.floor((SCREEN_WIDTH - 48) / 2);
  const spriteY = 20 + bobOffset;
  drawCreatureSprite(starter.id, spriteX, spriteY, true);

  // Type badge below sprite
  const badgeWidth = (starter.type.length + 2) * 8;
  const badgeX = Math.floor((SCREEN_WIDTH - badgeWidth) / 2);
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(badgeX, 70, badgeWidth, 10);
  drawText(starter.type, badgeX + 8, 72, 3);

  // Name in stylized box
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(20, 82, SCREEN_WIDTH - 40, 12);
  drawTextCentered(starter.name, 0, SCREEN_WIDTH, 84, 3);

  // Navigation arrows (pulsing)
  const arrowPulse = Math.sin(animFrame * 0.15) > 0;
  if (arrowPulse) {
    drawText('<', 10, 44, 0);
    drawText('>', SCREEN_WIDTH - 18, 44, 0);
  }

  // Dots showing position
  const dotY = 96;
  for (let i = 0; i < STARTERS.length; i++) {
    const dotX = 68 + i * 12;
    if (i === selectedIndex) {
      ctx.fillStyle = DMG_PALETTE.BLACK;
      ctx.fillRect(dotX, dotY, 5, 5);
    } else {
      ctx.fillStyle = DMG_PALETTE.DARK;
      ctx.fillRect(dotX + 1, dotY + 1, 3, 3);
    }
  }

  // Bottom info panel
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 104, SCREEN_WIDTH, 28);

  // Description text
  drawTextCentered(starter.desc1, 0, SCREEN_WIDTH, 108, 3);
  drawTextCentered(starter.desc2, 0, SCREEN_WIDTH, 118, 2);

  // Instructions at bottom
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 132, SCREEN_WIDTH, 12);
  drawText('</>:PICK', 8, 134, 2);
  drawText('Z:SELECT', SCREEN_WIDTH - 72, 134, 3);
}

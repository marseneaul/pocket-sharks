import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext, clear } from './canvas.ts';
import { drawText, drawTextCentered } from './text.ts';
import { drawCreatureSprite, getCreaturePalette } from './sprites.ts';
import { getCreature } from '../data/creatures.ts';

// Debug mode tabs
type DebugTab = 'sprites' | 'maps' | 'battles' | 'screens';

interface DebugState {
  tab: DebugTab;
  spriteId: number;
  mapIndex: number;
  battleCreatureId: number;
  screenIndex: number;
}

const TABS: DebugTab[] = ['sprites', 'maps', 'battles', 'screens'];
const MAX_CREATURE_ID = 120;

const MAPS = [
  // San Diego Region (Region 1)
  'research-station',
  'la-jolla-shores',
  'la-jolla-tide-pools',
  'kelp-forest-route',
  'san-diego-bay',
  'rays-gym',
  // Hawaii Region (Region 2)
  'hawaii-airport',
  'waikiki-beach',
  'dive-school',
  'hawaii-reef',
  // Cabo / Baja Region (Region 3)
  'cabo-harbor',
  'cabo-beach',
  'cabo-reef',
  'sea-of-cortez',
  'cabo-town',
  'martillo-gym',
  // Caribbean / Florida Region (Region 4)
  'florida-airport',
  'florida-keys',
  'key-west',
  'caribbean-reef',
  'coral-reef-gym',
  // Pacific Northwest Region (Region 6)
  'seattle-airport',
  'puget-sound',
  'pacific-kelp-forest',
  'cold-water-trench',
  // Europe Region (Region 7)
  'europe-ferry-terminal',
  'european-coast',
  'north-sea',
  // Legacy maps
  'route-1',
  'route-2',
  'route-3',
  'coral-bay',
  'coral-gym',
  'kelp-harbor',
  'kelp-gym',
  'route-4',
  'finner-hq'
];

const SCREENS = [
  'title',
  'starter-select',
  'overworld',
  'battle',
  'party-menu',
  'pc',
  'shop',
  'settings'
];

let state: DebugState = {
  tab: 'sprites',
  spriteId: 1,
  mapIndex: 0,
  battleCreatureId: 1,
  screenIndex: 0
};

export function initDebugUI(): void {
  state = {
    tab: 'sprites',
    spriteId: 1,
    mapIndex: 0,
    battleCreatureId: 1,
    screenIndex: 0
  };
}

export function getDebugState(): DebugState {
  return state;
}

export type DebugAction =
  | { type: 'none' }
  | { type: 'warp'; mapId: string }
  | { type: 'battle'; creatureId: number; level: number }
  | { type: 'screen'; screen: string }
  | { type: 'close' };

export function handleDebugInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r'): DebugAction {
  // L/R to switch tabs
  if (input === 'l') {
    const idx = TABS.indexOf(state.tab);
    state.tab = TABS[(idx - 1 + TABS.length) % TABS.length];
    return { type: 'none' };
  }
  if (input === 'r') {
    const idx = TABS.indexOf(state.tab);
    state.tab = TABS[(idx + 1) % TABS.length];
    return { type: 'none' };
  }

  // B to close debug mode
  if (input === 'b') {
    return { type: 'close' };
  }

  // Tab-specific handling
  switch (state.tab) {
    case 'sprites':
      return handleSpritesTab(input);
    case 'maps':
      return handleMapsTab(input);
    case 'battles':
      return handleBattlesTab(input);
    case 'screens':
      return handleScreensTab(input);
  }

  return { type: 'none' };
}

function handleSpritesTab(input: string): DebugAction {
  if (input === 'left') {
    state.spriteId = Math.max(1, state.spriteId - 1);
  } else if (input === 'right') {
    state.spriteId = Math.min(MAX_CREATURE_ID, state.spriteId + 1);
  } else if (input === 'up') {
    state.spriteId = Math.max(1, state.spriteId - 5);
  } else if (input === 'down') {
    state.spriteId = Math.min(MAX_CREATURE_ID, state.spriteId + 5);
  }
  return { type: 'none' };
}

function handleMapsTab(input: string): DebugAction {
  if (input === 'up') {
    state.mapIndex = Math.max(0, state.mapIndex - 1);
  } else if (input === 'down') {
    state.mapIndex = Math.min(MAPS.length - 1, state.mapIndex + 1);
  } else if (input === 'a') {
    return { type: 'warp', mapId: MAPS[state.mapIndex] };
  }
  return { type: 'none' };
}

function handleBattlesTab(input: string): DebugAction {
  if (input === 'left') {
    state.battleCreatureId = Math.max(1, state.battleCreatureId - 1);
  } else if (input === 'right') {
    state.battleCreatureId = Math.min(MAX_CREATURE_ID, state.battleCreatureId + 1);
  } else if (input === 'up') {
    state.battleCreatureId = Math.max(1, state.battleCreatureId - 5);
  } else if (input === 'down') {
    state.battleCreatureId = Math.min(MAX_CREATURE_ID, state.battleCreatureId + 5);
  } else if (input === 'a') {
    return { type: 'battle', creatureId: state.battleCreatureId, level: 10 };
  }
  return { type: 'none' };
}

function handleScreensTab(input: string): DebugAction {
  if (input === 'up') {
    state.screenIndex = Math.max(0, state.screenIndex - 1);
  } else if (input === 'down') {
    state.screenIndex = Math.min(SCREENS.length - 1, state.screenIndex + 1);
  } else if (input === 'a') {
    return { type: 'screen', screen: SCREENS[state.screenIndex] };
  }
  return { type: 'none' };
}

export function renderDebug(): void {
  const ctx = getContext();
  clear();

  // Background
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Header
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 14);
  drawTextCentered('DEBUG MODE', 0, SCREEN_WIDTH, 3, 3);

  // Tab bar
  const tabY = 16;
  const tabWidth = 40;
  for (let i = 0; i < TABS.length; i++) {
    const x = i * tabWidth;
    const isActive = TABS[i] === state.tab;
    ctx.fillStyle = isActive ? DMG_PALETTE.LIGHT : DMG_PALETTE.DARK;
    ctx.fillRect(x, tabY, tabWidth - 1, 12);
    const label = TABS[i].substring(0, 4).toUpperCase();
    drawText(label, x + 4, tabY + 2, isActive ? 0 : 2);
  }

  // Content area
  const contentY = 30;
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(4, contentY, SCREEN_WIDTH - 8, SCREEN_HEIGHT - contentY - 18);

  // Render active tab content
  switch (state.tab) {
    case 'sprites':
      renderSpritesTab(contentY);
      break;
    case 'maps':
      renderMapsTab(contentY);
      break;
    case 'battles':
      renderBattlesTab(contentY);
      break;
    case 'screens':
      renderScreensTab(contentY);
      break;
  }

  // Footer instructions
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, SCREEN_HEIGHT - 14, SCREEN_WIDTH, 14);
  drawText('L/R:TAB  B:CLOSE', 4, SCREEN_HEIGHT - 10, 3);
}

function renderSpritesTab(y: number): void {
  const creature = getCreature(state.spriteId);
  const name = creature?.name || `ID ${state.spriteId}`;
  const palette = getCreaturePalette(state.spriteId);

  // Creature name and ID
  drawText(`#${state.spriteId} ${name.substring(0, 12)}`, 8, y + 4, 0);
  drawText(`PALETTE: ${palette}`, 8, y + 14, 1);

  // Draw front sprite
  drawText('FRONT', 20, y + 26, 1);
  drawCreatureSprite(state.spriteId, 12, y + 36, true);

  // Draw back sprite
  drawText('BACK', 100, y + 26, 1);
  drawCreatureSprite(state.spriteId, 92, y + 36, false);

  // Navigation hint
  drawText('ARROWS: BROWSE', 40, SCREEN_HEIGHT - 24, 1);
}

function renderMapsTab(y: number): void {
  drawText('SELECT MAP:', 8, y + 4, 0);

  const startIdx = Math.max(0, state.mapIndex - 3);
  const endIdx = Math.min(MAPS.length, startIdx + 7);

  for (let i = startIdx; i < endIdx; i++) {
    const itemY = y + 16 + (i - startIdx) * 12;
    if (i === state.mapIndex) {
      drawText('>', 8, itemY, 0);
    }
    const mapName = MAPS[i].replace(/-/g, ' ').toUpperCase();
    drawText(mapName.substring(0, 16), 18, itemY, i === state.mapIndex ? 0 : 1);
  }

  drawText('A: WARP TO MAP', 40, SCREEN_HEIGHT - 24, 1);
}

function renderBattlesTab(y: number): void {
  const creature = getCreature(state.battleCreatureId);
  const name = creature?.name || `ID ${state.battleCreatureId}`;

  drawText('START BATTLE VS:', 8, y + 4, 0);
  drawText(`#${state.battleCreatureId} ${name.substring(0, 12)}`, 8, y + 16, 0);

  // Draw small preview
  drawCreatureSprite(state.battleCreatureId, 56, y + 30, true);

  drawText('ARROWS: PICK', 8, SCREEN_HEIGHT - 34, 1);
  drawText('A: START BATTLE', 8, SCREEN_HEIGHT - 24, 1);
}

function renderScreensTab(y: number): void {
  drawText('JUMP TO SCREEN:', 8, y + 4, 0);

  for (let i = 0; i < SCREENS.length; i++) {
    const itemY = y + 16 + i * 12;
    if (i === state.screenIndex) {
      drawText('>', 8, itemY, 0);
    }
    const screenName = SCREENS[i].replace(/-/g, ' ').toUpperCase();
    drawText(screenName, 18, itemY, i === state.screenIndex ? 0 : 1);
  }

  drawText('A: GO TO SCREEN', 40, SCREEN_HEIGHT - 24, 1);
}

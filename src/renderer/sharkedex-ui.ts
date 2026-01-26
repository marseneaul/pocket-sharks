import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext, clear } from './canvas.ts';
import { drawText } from './text.ts';
import { drawCreatureSprite } from './sprites.ts';
import { CREATURES } from '../data/creatures.ts';
import { getParty } from '../engine/game-state.ts';
import { getStorage } from '../engine/storage.ts';
import { isCreature } from '../types/index.ts';

// Sharkedex UI state
interface SharkedexUIState {
  selectedIndex: number;
  scrollOffset: number;
  mode: 'list' | 'detail';
  caughtSpeciesIds: Set<number>;
}

let uiState: SharkedexUIState = {
  selectedIndex: 0,
  scrollOffset: 0,
  mode: 'list',
  caughtSpeciesIds: new Set()
};

// Get all species IDs sorted by ID
function getAllSpeciesIds(): number[] {
  return Object.keys(CREATURES).map(Number).sort((a, b) => a - b);
}

// Build set of caught species IDs from party and PC storage
function buildCaughtSet(): Set<number> {
  const caught = new Set<number>();

  // Check party
  const party = getParty();
  for (const member of party) {
    if (isCreature(member)) {
      caught.add(member.species.id);
    }
  }

  // Check PC storage - iterate through all boxes
  const storage = getStorage();
  for (const box of storage.boxes) {
    for (const creature of box.creatures) {
      if (creature) {
        caught.add(creature.species.id);
      }
    }
  }

  return caught;
}

export function initSharkedexUI(): void {
  uiState = {
    selectedIndex: 0,
    scrollOffset: 0,
    mode: 'list',
    caughtSpeciesIds: buildCaughtSet()
  };
}

const MAX_VISIBLE_ENTRIES = 6;

export function handleSharkedexInput(
  input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r'
): 'close' | 'action' | null {
  const allSpecies = getAllSpeciesIds();
  const totalEntries = allSpecies.length;

  if (uiState.mode === 'list') {
    switch (input) {
      case 'up':
        if (uiState.selectedIndex > 0) {
          uiState.selectedIndex--;
          // Adjust scroll if needed
          if (uiState.selectedIndex < uiState.scrollOffset) {
            uiState.scrollOffset = uiState.selectedIndex;
          }
        }
        return 'action';

      case 'down':
        if (uiState.selectedIndex < totalEntries - 1) {
          uiState.selectedIndex++;
          // Adjust scroll if needed
          if (uiState.selectedIndex >= uiState.scrollOffset + MAX_VISIBLE_ENTRIES) {
            uiState.scrollOffset = uiState.selectedIndex - MAX_VISIBLE_ENTRIES + 1;
          }
        }
        return 'action';

      case 'left':
        // Jump up by page
        uiState.selectedIndex = Math.max(0, uiState.selectedIndex - MAX_VISIBLE_ENTRIES);
        uiState.scrollOffset = Math.max(0, uiState.scrollOffset - MAX_VISIBLE_ENTRIES);
        return 'action';

      case 'right':
        // Jump down by page
        uiState.selectedIndex = Math.min(totalEntries - 1, uiState.selectedIndex + MAX_VISIBLE_ENTRIES);
        if (uiState.selectedIndex >= uiState.scrollOffset + MAX_VISIBLE_ENTRIES) {
          uiState.scrollOffset = uiState.selectedIndex - MAX_VISIBLE_ENTRIES + 1;
        }
        return 'action';

      case 'a':
        // Enter detail view
        uiState.mode = 'detail';
        return 'action';

      case 'b':
        // Close Sharkedex
        return 'close';

      default:
        return null;
    }
  } else if (uiState.mode === 'detail') {
    switch (input) {
      case 'b':
        // Return to list
        uiState.mode = 'list';
        return 'action';

      case 'left':
        // Previous creature
        if (uiState.selectedIndex > 0) {
          uiState.selectedIndex--;
          if (uiState.selectedIndex < uiState.scrollOffset) {
            uiState.scrollOffset = uiState.selectedIndex;
          }
        }
        return 'action';

      case 'right':
        // Next creature
        if (uiState.selectedIndex < totalEntries - 1) {
          uiState.selectedIndex++;
          if (uiState.selectedIndex >= uiState.scrollOffset + MAX_VISIBLE_ENTRIES) {
            uiState.scrollOffset = uiState.selectedIndex - MAX_VISIBLE_ENTRIES + 1;
          }
        }
        return 'action';

      default:
        return null;
    }
  }

  return null;
}

export function renderSharkedex(): void {
  if (uiState.mode === 'list') {
    renderListView();
  } else {
    renderDetailView();
  }
}

function renderListView(): void {
  const ctx = getContext();

  // Clear screen
  clear();

  const allSpecies = getAllSpeciesIds();
  const totalEntries = allSpecies.length;
  const caughtCount = uiState.caughtSpeciesIds.size;

  // Draw title bar
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 14);

  drawText('SHARKEDEX', 4, 3, 3);

  // Draw caught count
  const countText = `${caughtCount}/${totalEntries}`;
  drawText(countText, SCREEN_WIDTH - countText.length * 8 - 4, 3, 3);

  // Draw list area background
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(0, 14, SCREEN_WIDTH, SCREEN_HEIGHT - 26);

  // Draw creature entries
  const startY = 16;
  const entryHeight = 18;

  for (let i = 0; i < MAX_VISIBLE_ENTRIES; i++) {
    const entryIndex = uiState.scrollOffset + i;
    if (entryIndex >= totalEntries) break;

    const speciesId = allSpecies[entryIndex];
    const species = CREATURES[speciesId];
    const isCaught = uiState.caughtSpeciesIds.has(speciesId);
    const isSelected = entryIndex === uiState.selectedIndex;

    const y = startY + i * entryHeight;

    // Draw selection highlight
    if (isSelected) {
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(2, y, SCREEN_WIDTH - 4, entryHeight - 2);

      // Draw selection border
      ctx.strokeStyle = DMG_PALETTE.BLACK;
      ctx.strokeRect(2.5, y + 0.5, SCREEN_WIDTH - 5, entryHeight - 3);
    }

    // Draw dex number
    const dexNum = String(speciesId).padStart(3, '0');
    drawText(`#${dexNum}`, 6, y + 4, 0);

    // Draw name (or ??? if not caught)
    const displayName = isCaught ? species.name.toUpperCase() : '???';
    const truncatedName = displayName.length > 12 ? displayName.substring(0, 11) + '.' : displayName;
    drawText(truncatedName, 40, y + 4, 0);

    // Draw caught indicator
    if (isCaught) {
      // Draw a small filled circle/checkmark
      ctx.fillStyle = DMG_PALETTE.BLACK;
      ctx.fillRect(SCREEN_WIDTH - 14, y + 6, 6, 6);
    }
  }

  // Draw scroll indicators
  if (uiState.scrollOffset > 0) {
    drawText('^', SCREEN_WIDTH / 2 - 4, startY - 2, 1);
  }
  if (uiState.scrollOffset + MAX_VISIBLE_ENTRIES < totalEntries) {
    drawText('v', SCREEN_WIDTH / 2 - 4, startY + MAX_VISIBLE_ENTRIES * entryHeight - 6, 1);
  }

  // Draw footer
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, SCREEN_HEIGHT - 12, SCREEN_WIDTH, 12);

  drawText('A:VIEW  B:BACK', 4, SCREEN_HEIGHT - 10, 3);
}

function renderDetailView(): void {
  const ctx = getContext();

  // Clear screen
  clear();

  const allSpecies = getAllSpeciesIds();
  const speciesId = allSpecies[uiState.selectedIndex];
  const species = CREATURES[speciesId];
  const isCaught = uiState.caughtSpeciesIds.has(speciesId);

  // Draw title bar
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 14);

  const dexNum = String(speciesId).padStart(3, '0');
  drawText(`#${dexNum}`, 4, 3, 3);

  const displayName = isCaught ? species.name.toUpperCase() : '???';
  const truncatedName = displayName.length > 14 ? displayName.substring(0, 13) + '.' : displayName;
  drawText(truncatedName, 40, 3, 3);

  // Draw sprite area (left side)
  ctx.fillStyle = DMG_PALETTE.LIGHT;
  ctx.fillRect(4, 18, 64, 64);

  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(3.5, 17.5, 65, 65);

  if (isCaught) {
    // Draw sprite (scaled down or centered)
    drawCreatureSprite(speciesId, 4, 18, true);
  } else {
    // Draw silhouette/question mark
    drawText('?', 32, 44, 1);
  }

  // Draw info area (right side)
  const infoX = 74;
  let infoY = 20;

  // Types
  if (isCaught) {
    drawText('TYPE', infoX, infoY, 1);
    infoY += 10;

    const typeStr = species.types.map(t => t.toUpperCase()).join('/');
    const truncatedType = typeStr.length > 10 ? typeStr.substring(0, 9) + '.' : typeStr;
    drawText(truncatedType, infoX, infoY, 0);
    infoY += 14;

    // Base stats
    drawText('STATS', infoX, infoY, 1);
    infoY += 10;

    const stats = species.baseStats;
    drawText(`HP:${stats.hp}`, infoX, infoY, 0);
    infoY += 9;
    drawText(`ATK:${stats.attack}`, infoX, infoY, 0);
    infoY += 9;
    drawText(`DEF:${stats.defense}`, infoX, infoY, 0);
    infoY += 9;
    drawText(`SPD:${stats.speed}`, infoX, infoY, 0);
  } else {
    drawText('NOT YET', infoX, infoY + 20, 1);
    drawText('CAUGHT', infoX, infoY + 32, 1);
  }

  // Draw description area
  ctx.fillStyle = DMG_PALETTE.LIGHT;
  ctx.fillRect(4, 86, SCREEN_WIDTH - 8, 44);

  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(3.5, 85.5, SCREEN_WIDTH - 7, 45);

  if (isCaught && species.description) {
    // Word wrap description
    const words = species.description.split(' ');
    let line = '';
    let lineY = 90;
    const maxWidth = 17; // ~17 chars per line at 8px font

    for (const word of words) {
      const testLine = line ? line + ' ' + word : word;
      if (testLine.length <= maxWidth) {
        line = testLine;
      } else {
        if (line) {
          drawText(line.toUpperCase(), 8, lineY, 0);
          lineY += 10;
        }
        line = word;
        if (lineY > 118) break; // Max 4 lines
      }
    }
    if (line && lineY <= 118) {
      drawText(line.toUpperCase(), 8, lineY, 0);
    }
  } else if (!isCaught) {
    drawText('NO DATA', 8, 102, 1);
  }

  // Draw footer
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, SCREEN_HEIGHT - 12, SCREEN_WIDTH, 12);

  drawText('</>:PREV/NEXT  B:BACK', 4, SCREEN_HEIGHT - 10, 3);
}

export function getSharkedexState(): SharkedexUIState {
  return { ...uiState };
}

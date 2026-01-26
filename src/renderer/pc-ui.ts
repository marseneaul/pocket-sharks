import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawText, drawTextCentered, drawTextRightAligned } from './text.ts';
import type { PCUIState } from '../types/storage.ts';
import { BOX_COLUMNS, BOX_ROWS, MAX_PARTY_SIZE } from '../types/storage.ts';
import {
  getCurrentBox,
  getCurrentBoxIndex,
  getBoxName,
  nextBox,
  prevBox,
  withdrawCreature,
  swapPartyWithBox,
  moveCreature
} from '../engine/storage.ts';
import { getParty } from '../engine/game-state.ts';
import { isEgg } from '../types/index.ts';
import { getEgg } from '../data/eggs.ts';

// UI state
let uiState: PCUIState;

export function initPCUI(): void {
  uiState = {
    mode: 'box',
    boxCursor: 0,
    partyCursor: 0,
    selectedCreature: null,
    action: 'none'
  };
}

export function getPCUIState(): PCUIState {
  return uiState;
}

// Handle input and return result
export function handlePCInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r'): 'close' | 'action' | null {
  const party = getParty();
  const box = getCurrentBox();

  // L/R to switch boxes
  if (input === 'l') {
    prevBox();
    return null;
  }
  if (input === 'r') {
    nextBox();
    return null;
  }

  // B to cancel/go back
  if (input === 'b') {
    if (uiState.selectedCreature) {
      // Cancel selection
      uiState.selectedCreature = null;
      uiState.action = 'none';
      return null;
    }
    // Close PC
    return 'close';
  }

  if (uiState.mode === 'box') {
    return handleBoxMode(input, box, party);
  } else {
    return handlePartyMode(input, box, party);
  }
}

function handleBoxMode(
  input: string,
  box: ReturnType<typeof getCurrentBox>,
  party: ReturnType<typeof getParty>
): 'action' | null {
  const col = uiState.boxCursor % BOX_COLUMNS;
  const row = Math.floor(uiState.boxCursor / BOX_COLUMNS);

  if (input === 'up') {
    if (row > 0) {
      uiState.boxCursor -= BOX_COLUMNS;
    }
  } else if (input === 'down') {
    if (row < BOX_ROWS - 1) {
      uiState.boxCursor += BOX_COLUMNS;
    }
  } else if (input === 'left') {
    if (col > 0) {
      uiState.boxCursor--;
    } else {
      // Switch to party panel
      uiState.mode = 'party';
      uiState.partyCursor = Math.min(row, party.length - 1);
      if (uiState.partyCursor < 0) uiState.partyCursor = 0;
    }
  } else if (input === 'right') {
    if (col < BOX_COLUMNS - 1) {
      uiState.boxCursor++;
    }
  } else if (input === 'a') {
    return handleBoxSelect(box, party);
  }

  return null;
}

function handlePartyMode(
  input: string,
  box: ReturnType<typeof getCurrentBox>,
  party: ReturnType<typeof getParty>
): 'action' | null {
  if (input === 'up') {
    if (uiState.partyCursor > 0) {
      uiState.partyCursor--;
    }
  } else if (input === 'down') {
    if (uiState.partyCursor < party.length - 1) {
      uiState.partyCursor++;
    }
  } else if (input === 'right') {
    // Switch to box panel
    uiState.mode = 'box';
  } else if (input === 'left') {
    // Already at left edge, do nothing
  } else if (input === 'a') {
    return handlePartySelect(box, party);
  }

  return null;
}

function handleBoxSelect(
  box: ReturnType<typeof getCurrentBox>,
  party: ReturnType<typeof getParty>
): 'action' | null {
  const boxIndex = getCurrentBoxIndex();
  const slotIndex = uiState.boxCursor;
  const creature = box.creatures[slotIndex];

  if (uiState.selectedCreature === null) {
    // Nothing selected yet
    if (creature) {
      // Select this creature
      uiState.selectedCreature = {
        source: 'box',
        boxIndex,
        slotIndex
      };
      uiState.action = 'selecting';
    }
    // If slot is empty, do nothing
  } else {
    // We have something selected
    if (uiState.selectedCreature.source === 'box') {
      // Moving box creature to another box slot
      // Swap positions (or move if empty)
      const fromBox = uiState.selectedCreature.boxIndex!;
      const fromSlot = uiState.selectedCreature.slotIndex;

      moveCreature(fromBox, fromSlot, boxIndex, slotIndex);

      uiState.selectedCreature = null;
      uiState.action = 'none';
      return 'action';
    } else {
      // Moving party creature to box slot
      if (party.length > 1 || creature !== null) {
        swapPartyWithBox(uiState.selectedCreature.slotIndex, boxIndex, slotIndex);
        uiState.selectedCreature = null;
        uiState.action = 'none';
        return 'action';
      }
    }
  }

  return null;
}

function handlePartySelect(
  _box: ReturnType<typeof getCurrentBox>,
  party: ReturnType<typeof getParty>
): 'action' | null {
  const partyIndex = uiState.partyCursor;

  if (partyIndex >= party.length) return null;

  if (uiState.selectedCreature === null) {
    // Select party creature
    uiState.selectedCreature = {
      source: 'party',
      slotIndex: partyIndex
    };
    uiState.action = 'selecting';
  } else {
    // We have something selected
    if (uiState.selectedCreature.source === 'party') {
      // Trying to swap party members - just deselect
      uiState.selectedCreature = null;
      uiState.action = 'none';
    } else {
      // Moving box creature to party
      if (party.length < MAX_PARTY_SIZE) {
        withdrawCreature(uiState.selectedCreature.boxIndex!, uiState.selectedCreature.slotIndex);
        uiState.selectedCreature = null;
        uiState.action = 'none';
        return 'action';
      }
    }
  }

  return null;
}

export function renderPC(): void {
  const ctx = getContext();
  const party = getParty();
  const box = getCurrentBox();
  const boxIndex = getCurrentBoxIndex();
  const boxName = getBoxName(boxIndex);

  // Background
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Header with box name
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 14);

  // Box navigation arrows and name (truncated to fit)
  drawText('<', 4, 3, 3);
  const displayName = boxName.length > 8 ? boxName.substring(0, 7) + '.' : boxName;
  drawText(displayName, 12, 3, 3);

  // Box number indicator (right side)
  const boxNum = `${boxIndex + 1}/8`;
  drawTextRightAligned(boxNum, 0, SCREEN_WIDTH - 12, 3, 3);
  drawText('>', SCREEN_WIDTH - 8, 3, 3);

  // Box grid area (left side)
  const boxStartX = 4;
  const boxStartY = 18;
  const slotWidth = 18;
  const slotHeight = 18;

  // Draw box grid
  for (let row = 0; row < BOX_ROWS; row++) {
    for (let col = 0; col < BOX_COLUMNS; col++) {
      const slotIndex = row * BOX_COLUMNS + col;
      const x = boxStartX + col * slotWidth;
      const y = boxStartY + row * slotHeight;

      const creature = box.creatures[slotIndex];

      // Slot background
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(x, y, slotWidth - 4, slotHeight - 4);

      // Slot border
      ctx.strokeStyle = DMG_PALETTE.DARK;
      ctx.strokeRect(x + 0.5, y + 0.5, slotWidth - 5, slotHeight - 5);

      // Draw creature icon if present
      if (creature) {
        // Simple icon: first 2 letters of species name
        const initials = creature.species.name.substring(0, 2).toUpperCase();
        drawText(initials, x + 2, y + 5, 0);
      }

      // Highlight if cursor is here (in box mode)
      if (uiState.mode === 'box' && uiState.boxCursor === slotIndex) {
        ctx.strokeStyle = DMG_PALETTE.BLACK;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 0.5, y + 0.5, slotWidth - 5, slotHeight - 5);
        ctx.lineWidth = 1;
      }

      // Show selected indicator
      if (uiState.selectedCreature &&
          uiState.selectedCreature.source === 'box' &&
          uiState.selectedCreature.boxIndex === boxIndex &&
          uiState.selectedCreature.slotIndex === slotIndex) {
        ctx.fillStyle = DMG_PALETTE.BLACK;
        ctx.fillRect(x + slotWidth - 8, y + 1, 4, 4);
      }
    }
  }

  // Party panel (right side)
  const partyStartX = 94;
  const partyStartY = 18;
  const partySlotHeight = 18;

  // Party header
  ctx.fillStyle = DMG_PALETTE.DARK;
  const partyHeaderWidth = SCREEN_WIDTH - partyStartX - 4;
  ctx.fillRect(partyStartX, partyStartY - 2, partyHeaderWidth, 10);
  drawTextCentered('PARTY', partyStartX, partyHeaderWidth, partyStartY, 3);

  // Party slots
  for (let i = 0; i < MAX_PARTY_SIZE; i++) {
    const y = partyStartY + 10 + i * partySlotHeight;
    const creature = party[i];

    // Slot background
    if (i < party.length) {
      ctx.fillStyle = DMG_PALETTE.LIGHT;
    } else {
      ctx.fillStyle = DMG_PALETTE.WHITE;
    }
    ctx.fillRect(partyStartX, y, SCREEN_WIDTH - partyStartX - 4, partySlotHeight - 2);

    // Draw creature/egg info
    if (creature) {
      let name: string;
      if (isEgg(creature)) {
        // It's an egg
        const eggData = getEgg(creature.eggItemId);
        const eggName = eggData?.name || 'EGG';
        name = eggName.length > 6 ? eggName.substring(0, 5) + '.' : eggName;
      } else {
        // It's a creature
        name = creature.species.name.length > 6
          ? creature.species.name.substring(0, 5) + '.'
          : creature.species.name;
      }
      drawText(name, partyStartX + 2, y + 5, 0);
    } else if (i < party.length) {
      drawText('---', partyStartX + 2, y + 5, 2);
    }

    // Highlight if cursor is here (in party mode)
    if (uiState.mode === 'party' && uiState.partyCursor === i && i < party.length) {
      ctx.strokeStyle = DMG_PALETTE.BLACK;
      ctx.lineWidth = 2;
      ctx.strokeRect(partyStartX + 0.5, y + 0.5, SCREEN_WIDTH - partyStartX - 5, partySlotHeight - 3);
      ctx.lineWidth = 1;
    }

    // Show selected indicator
    if (uiState.selectedCreature &&
        uiState.selectedCreature.source === 'party' &&
        uiState.selectedCreature.slotIndex === i) {
      ctx.fillStyle = DMG_PALETTE.BLACK;
      ctx.fillRect(SCREEN_WIDTH - 10, y + 2, 4, 4);
    }
  }

  // Bottom instructions
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, SCREEN_HEIGHT - 14, SCREEN_WIDTH, 14);

  if (uiState.selectedCreature) {
    drawText('Z:PLACE X:CANCEL', 4, SCREEN_HEIGHT - 10, 3);
  } else {
    drawText('Z:SEL X:EXIT', 4, SCREEN_HEIGHT - 10, 3);
  }
  drawText('L/R:BOX', SCREEN_WIDTH - 56, SCREEN_HEIGHT - 10, 3);
}

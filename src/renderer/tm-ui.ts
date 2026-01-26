import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawText, drawTextCentered } from './text.ts';
import { removeItem, getPartyCreatures } from '../engine/game-state.ts';
import { getItem } from '../data/items.ts';
import { getMove } from '../data/moves.ts';
import { canLearnTM, getTMMoveId, alreadyKnowsMove, teachTMMove } from '../data/tms.ts';
import type { CreatureInstance } from '../types/index.ts';

// TM UI state
let currentTmItemId: number = 0;
let menuIndex: number = 0;
let phase: 'select-creature' | 'select-move' | 'confirm' | 'result' = 'select-creature';
let moveIndex: number = 0;
let resultMessage: string = '';

export function initTMUI(tmItemId: number): void {
  currentTmItemId = tmItemId;
  menuIndex = 0;
  phase = 'select-creature';
  moveIndex = 0;
  resultMessage = '';
}

export function getTMPhase(): string {
  return phase;
}

export function handleTMInput(
  input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b'
): 'close' | 'used' | null {
  // Only creatures can learn TMs, not eggs
  const creatures = getPartyCreatures();

  if (phase === 'select-creature') {
    if (input === 'up') {
      if (menuIndex > 0) menuIndex--;
    } else if (input === 'down') {
      if (menuIndex < creatures.length - 1) menuIndex++;
    } else if (input === 'a') {
      const creature = creatures[menuIndex];
      if (!creature) return null;

      const moveId = getTMMoveId(currentTmItemId);

      // Check if can learn
      if (!canLearnTM(creature, currentTmItemId)) {
        resultMessage = `${creature.species.name} can't learn this move!`;
        phase = 'result';
        return null;
      }

      // Check if already knows
      if (moveId && alreadyKnowsMove(creature, moveId)) {
        const move = getMove(moveId);
        resultMessage = `Already knows ${move?.name || 'this move'}!`;
        phase = 'result';
        return null;
      }

      // If has less than 4 moves, teach directly
      if (creature.moves.length < 4) {
        const result = teachTMMove(creature, currentTmItemId);
        resultMessage = result.message;
        phase = 'result';
        if (result.success) {
          removeItem(currentTmItemId, 1);
        }
        return null;
      }

      // Need to select a move to replace
      moveIndex = 0;
      phase = 'select-move';
    } else if (input === 'b') {
      return 'close';
    }
  } else if (phase === 'select-move') {
    const creature = creatures[menuIndex];

    if (input === 'up') {
      if (moveIndex > 0) moveIndex--;
    } else if (input === 'down') {
      if (moveIndex < creature.moves.length - 1) moveIndex++;
    } else if (input === 'a') {
      // Confirm move replacement
      phase = 'confirm';
    } else if (input === 'b') {
      // Go back to creature selection
      phase = 'select-creature';
    }
  } else if (phase === 'confirm') {
    if (input === 'a') {
      // Teach the move, replacing selected move
      const creature = creatures[menuIndex];
      if (creature) {
        const result = teachTMMove(creature, currentTmItemId, moveIndex);
        resultMessage = result.message;
        phase = 'result';
        if (result.success) {
          removeItem(currentTmItemId, 1);
        }
      }
    } else if (input === 'b') {
      // Go back to move selection
      phase = 'select-move';
    }
  } else if (phase === 'result') {
    if (input === 'a' || input === 'b') {
      // Check if TM was used successfully
      if (resultMessage.includes('learned')) {
        return 'used';
      }
      return 'close';
    }
  }

  return null;
}

export function renderTMUI(): void {
  const ctx = getContext();
  // Only creatures can learn TMs, not eggs
  const creatures = getPartyCreatures();
  const item = getItem(currentTmItemId);
  const moveId = getTMMoveId(currentTmItemId);
  const move = moveId ? getMove(moveId) : null;

  // Dark background
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Title bar
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(0, 0, SCREEN_WIDTH, 20);
  drawText(item?.name || 'TM', 4, 2, 3);
  if (move) {
    drawText(move.name, 48, 2, 3);
  }
  drawText(move?.type?.toUpperCase().substring(0, 8) || '', 4, 11, 2);

  if (phase === 'select-creature') {
    renderCreatureSelect(creatures, moveId);
  } else if (phase === 'select-move') {
    const creature = creatures[menuIndex];
    if (creature) renderMoveSelect(creature);
  } else if (phase === 'confirm') {
    const creature = creatures[menuIndex];
    if (creature) renderConfirm(creature);
  } else if (phase === 'result') {
    renderResult();
  }
}

function renderCreatureSelect(
  party: CreatureInstance[],
  moveId: number | null
): void {
  const ctx = getContext();
  // Instruction
  drawText('Choose a shark:', 4, 22, 3);

  // Party list
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(2, 30, SCREEN_WIDTH - 4, 96);
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(1.5, 29.5, SCREEN_WIDTH - 3, 97);

  const slotHeight = 16;
  const startY = 32;

  for (let i = 0; i < party.length; i++) {
    const creature = party[i];
    const y = startY + i * slotHeight;
    const compatible = canLearnTM(creature, currentTmItemId);
    const alreadyKnows = moveId ? alreadyKnowsMove(creature, moveId) : false;

    // Selection highlight
    if (i === menuIndex) {
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(4, y, SCREEN_WIDTH - 8, slotHeight - 2);
    }

    // Cursor
    if (i === menuIndex) {
      drawText('>', 6, y + 4, 0);
    }

    // Name
    const name = creature.species.name.substring(0, 8);
    drawText(name, 14, y + 4, compatible ? 0 : 1);

    // Level
    drawText(`L${creature.level}`, 82, y + 4, 1);

    // Compatibility indicator
    if (alreadyKnows) {
      drawText('KNW', 112, y + 4, 1);
    } else if (!compatible) {
      drawText('NO', 136, y + 4, 1);
    } else {
      drawText('OK', 136, y + 4, 0);
    }
  }

  // Instructions at bottom
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 128, SCREEN_WIDTH, 16);
  drawText('Z:SELECT', 8, 132, 3);
  drawText('X:CANCEL', 100, 132, 2);
}

function renderMoveSelect(creature: CreatureInstance): void {
  const ctx = getContext();
  const moveId = getTMMoveId(currentTmItemId);
  const newMove = moveId ? getMove(moveId) : null;

  // Instruction
  drawText('Replace which move?', 4, 22, 3);
  drawText(creature.species.name, 4, 32, 3);

  // Move list
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(2, 40, SCREEN_WIDTH - 4, 72);
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(1.5, 39.5, SCREEN_WIDTH - 3, 73);

  const slotHeight = 16;
  const startY = 44;

  for (let i = 0; i < creature.moves.length; i++) {
    const moveInstance = creature.moves[i];
    const y = startY + i * slotHeight;

    // Selection highlight
    if (i === moveIndex) {
      ctx.fillStyle = DMG_PALETTE.LIGHT;
      ctx.fillRect(4, y, SCREEN_WIDTH - 8, slotHeight - 2);
    }

    // Cursor
    if (i === moveIndex) {
      drawText('>', 6, y + 4, 0);
    }

    // Move name
    drawText(moveInstance.move.name.substring(0, 10), 14, y + 4, 0);

    // PP
    drawText(`${moveInstance.currentPp}/${moveInstance.move.pp}`, 110, y + 4, 1);
  }

  // New move preview
  ctx.fillStyle = DMG_PALETTE.DARK;
  ctx.fillRect(2, 114, SCREEN_WIDTH - 4, 12);
  drawText('NEW:', 6, 117, 3);
  if (newMove) {
    drawText(newMove.name.substring(0, 10), 40, 117, 3);
  }

  // Instructions
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 128, SCREEN_WIDTH, 16);
  drawText('Z:REPLACE', 8, 132, 3);
  drawText('X:BACK', 112, 132, 2);
}

function renderConfirm(creature: CreatureInstance): void {
  const ctx = getContext();
  const oldMove = creature.moves[moveIndex].move;
  const moveId = getTMMoveId(currentTmItemId);
  const newMove = moveId ? getMove(moveId) : null;

  // Confirmation message
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(10, 40, SCREEN_WIDTH - 20, 64);
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(9.5, 39.5, SCREEN_WIDTH - 19, 65);

  drawText('Forget', 20, 48, 0);
  drawText(oldMove.name + '?', 20, 58, 0);
  drawText('Learn', 20, 74, 0);
  drawText(newMove?.name || '???', 20, 84, 0);

  // Instructions
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 128, SCREEN_WIDTH, 16);
  drawText('Z:YES', 30, 132, 3);
  drawText('X:NO', 100, 132, 2);
}

function renderResult(): void {
  const ctx = getContext();
  // Result message
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(10, 50, SCREEN_WIDTH - 20, 44);
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(9.5, 49.5, SCREEN_WIDTH - 19, 45);

  // Word wrap the message
  const words = resultMessage.split(' ');
  let line1 = '';
  let line2 = '';

  for (const word of words) {
    if (line1.length + word.length < 16) {
      line1 += (line1 ? ' ' : '') + word;
    } else {
      line2 += (line2 ? ' ' : '') + word;
    }
  }

  drawText(line1, 16, 60, 0);
  if (line2) {
    drawText(line2, 16, 72, 0);
  }

  // Instructions
  ctx.fillStyle = DMG_PALETTE.BLACK;
  ctx.fillRect(0, 128, SCREEN_WIDTH, 16);
  drawTextCentered('Z:OK', 0, SCREEN_WIDTH, 132, 3);
}

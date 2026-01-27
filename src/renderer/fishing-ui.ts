// Fishing UI - Simple fishing mini-game
import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';
import { getContext } from './canvas.ts';
import { drawTextCentered } from './text.ts';

// Fishing state
export type FishingPhase = 'casting' | 'waiting' | 'nibble' | 'hooked' | 'caught' | 'escaped' | 'nothing';

interface FishingState {
  phase: FishingPhase;
  timer: number;        // Current phase timer
  waitTime: number;     // How long to wait for a bite
  nibbleTime: number;   // How long the nibble lasts before fish escapes
  reelWindow: number;   // Time window to press A when hooked
  dotCount: number;     // Animation dots for waiting
}

let state: FishingState = {
  phase: 'casting',
  timer: 0,
  waitTime: 0,
  nibbleTime: 0,
  reelWindow: 0,
  dotCount: 0
};

export function initFishing(): void {
  state = {
    phase: 'casting',
    timer: 0,
    waitTime: 2000 + Math.random() * 4000,  // 2-6 seconds to wait
    nibbleTime: 800 + Math.random() * 400,  // 0.8-1.2 seconds to react
    reelWindow: 500,
    dotCount: 0
  };
}

export function getFishingPhase(): FishingPhase {
  return state.phase;
}

export function updateFishing(deltaTime: number): FishingPhase {
  state.timer += deltaTime;

  switch (state.phase) {
    case 'casting':
      // Brief casting animation
      if (state.timer >= 500) {
        state.phase = 'waiting';
        state.timer = 0;
      }
      break;

    case 'waiting':
      // Update dot animation
      state.dotCount = Math.floor(state.timer / 500) % 4;

      // Check if fish bites
      if (state.timer >= state.waitTime) {
        // 80% chance of getting a bite
        if (Math.random() < 0.8) {
          state.phase = 'nibble';
          state.timer = 0;
        } else {
          state.phase = 'nothing';
          state.timer = 0;
        }
      }
      break;

    case 'nibble':
      // Fish is nibbling - player must press A quickly!
      if (state.timer >= state.nibbleTime) {
        state.phase = 'escaped';
        state.timer = 0;
      }
      break;

    case 'hooked':
      // Successfully hooked! Brief celebration before battle
      if (state.timer >= 800) {
        state.phase = 'caught';
      }
      break;

    case 'caught':
    case 'escaped':
    case 'nothing':
      // Terminal states - wait for input to close
      break;
  }

  return state.phase;
}

export function handleFishingInput(pressedA: boolean, pressedB: boolean): 'continue' | 'battle' | 'close' {
  switch (state.phase) {
    case 'casting':
    case 'waiting':
      // B cancels fishing
      if (pressedB) {
        return 'close';
      }
      break;

    case 'nibble':
      // A to reel in!
      if (pressedA) {
        state.phase = 'hooked';
        state.timer = 0;
        return 'continue';
      }
      // B cancels
      if (pressedB) {
        return 'close';
      }
      break;

    case 'hooked':
      // Wait for animation
      break;

    case 'caught':
      // Start battle
      if (pressedA || pressedB) {
        return 'battle';
      }
      break;

    case 'escaped':
    case 'nothing':
      // Close on any input
      if (pressedA || pressedB) {
        return 'close';
      }
      break;
  }

  return 'continue';
}

export function renderFishing(): void {
  const ctx = getContext();

  // Semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Fishing box
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(10, 40, SCREEN_WIDTH - 20, 64);
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(9.5, 39.5, SCREEN_WIDTH - 19, 65);

  switch (state.phase) {
    case 'casting':
      drawTextCentered('Casting line...', 0, SCREEN_WIDTH, 60, 0);
      break;

    case 'waiting': {
      const dots = '.'.repeat(state.dotCount);
      drawTextCentered('Waiting' + dots, 0, SCREEN_WIDTH, 55, 0);
      drawTextCentered('X to cancel', 0, SCREEN_WIDTH, 75, 1);
      break;
    }

    case 'nibble':
      // Flashing exclamation to show urgency
      const flash = Math.floor(state.timer / 100) % 2 === 0;
      if (flash) {
        drawTextCentered('! ! !', 0, SCREEN_WIDTH, 50, 0);
      }
      drawTextCentered('A BITE!', 0, SCREEN_WIDTH, 65, 0);
      drawTextCentered('Press Z now!', 0, SCREEN_WIDTH, 80, 0);
      break;

    case 'hooked':
      drawTextCentered('HOOKED!', 0, SCREEN_WIDTH, 60, 0);
      break;

    case 'caught':
      drawTextCentered('Something\'s on', 0, SCREEN_WIDTH, 55, 0);
      drawTextCentered('the line!', 0, SCREEN_WIDTH, 68, 0);
      drawTextCentered('Z to continue', 0, SCREEN_WIDTH, 85, 1);
      break;

    case 'escaped':
      drawTextCentered('The fish', 0, SCREEN_WIDTH, 55, 0);
      drawTextCentered('got away...', 0, SCREEN_WIDTH, 68, 0);
      drawTextCentered('Z to continue', 0, SCREEN_WIDTH, 85, 1);
      break;

    case 'nothing':
      drawTextCentered('Not even', 0, SCREEN_WIDTH, 55, 0);
      drawTextCentered('a nibble...', 0, SCREEN_WIDTH, 68, 0);
      drawTextCentered('Z to continue', 0, SCREEN_WIDTH, 85, 1);
      break;
  }
}

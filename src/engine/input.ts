import type { InputState, InputEvent } from '../types/index.ts';

const currentState: InputState = {
  up: false,
  down: false,
  left: false,
  right: false,
  a: false,
  b: false,
  start: false,
  select: false,
  l: false,
  r: false
};

const previousState: InputState = { ...currentState };

// Key mappings
const keyMap: Record<string, keyof InputState> = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  'KeyZ': 'a',
  'KeyX': 'b',
  'Enter': 'start',
  'ShiftRight': 'select',
  'KeyQ': 'l',
  'KeyE': 'r',
  // Alternative WASD mapping
  'KeyW': 'up',
  'KeyS': 'down',
  'KeyA': 'left',
  'KeyD': 'right'
};

export function initInput(): void {
  window.addEventListener('keydown', (e) => {
    const key = keyMap[e.code];
    if (key) {
      e.preventDefault();
      currentState[key] = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    const key = keyMap[e.code];
    if (key) {
      e.preventDefault();
      currentState[key] = false;
    }
  });
}

export function updateInput(): void {
  // Copy current to previous for next frame
  Object.assign(previousState, currentState);
}

export function getInputState(): InputState {
  return { ...currentState };
}

// Get keys that were just pressed this frame
export function getJustPressed(): InputEvent {
  return {
    up: currentState.up && !previousState.up,
    down: currentState.down && !previousState.down,
    left: currentState.left && !previousState.left,
    right: currentState.right && !previousState.right,
    a: currentState.a && !previousState.a,
    b: currentState.b && !previousState.b,
    start: currentState.start && !previousState.start,
    select: currentState.select && !previousState.select,
    l: currentState.l && !previousState.l,
    r: currentState.r && !previousState.r
  };
}

// Check if any direction was just pressed
export function getDirectionPressed(): 'up' | 'down' | 'left' | 'right' | null {
  const pressed = getJustPressed();
  if (pressed.up) return 'up';
  if (pressed.down) return 'down';
  if (pressed.left) return 'left';
  if (pressed.right) return 'right';
  return null;
}

// Check if confirm was just pressed
export function wasConfirmPressed(): boolean {
  return getJustPressed().a;
}

// Check if cancel was just pressed
export function wasCancelPressed(): boolean {
  return getJustPressed().b;
}

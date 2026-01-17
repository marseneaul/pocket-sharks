import { SCREEN_WIDTH, SCREEN_HEIGHT, SCALE, DMG_COLORS, DMG_PALETTE } from '../constants.ts';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let offscreenCanvas: HTMLCanvasElement;
let offscreenCtx: CanvasRenderingContext2D;

export function initCanvas(): void {
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  canvas.width = SCREEN_WIDTH * SCALE;
  canvas.height = SCREEN_HEIGHT * SCALE;

  ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  // Create offscreen canvas at native resolution
  offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = SCREEN_WIDTH;
  offscreenCanvas.height = SCREEN_HEIGHT;
  offscreenCtx = offscreenCanvas.getContext('2d')!;
  offscreenCtx.imageSmoothingEnabled = false;
}

export function getContext(): CanvasRenderingContext2D {
  return offscreenCtx;
}

export function clear(): void {
  offscreenCtx.fillStyle = DMG_PALETTE.WHITE;
  offscreenCtx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

export function present(): void {
  // Scale up the offscreen canvas to the display canvas
  ctx.drawImage(
    offscreenCanvas,
    0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
    0, 0, SCREEN_WIDTH * SCALE, SCREEN_HEIGHT * SCALE
  );
}

export function fillRect(x: number, y: number, w: number, h: number, colorIndex: number): void {
  offscreenCtx.fillStyle = DMG_COLORS[colorIndex];
  offscreenCtx.fillRect(Math.floor(x), Math.floor(y), w, h);
}

export function drawRect(x: number, y: number, w: number, h: number, colorIndex: number): void {
  offscreenCtx.strokeStyle = DMG_COLORS[colorIndex];
  offscreenCtx.lineWidth = 1;
  offscreenCtx.strokeRect(Math.floor(x) + 0.5, Math.floor(y) + 0.5, w - 1, h - 1);
}

export function setPixel(x: number, y: number, colorIndex: number): void {
  offscreenCtx.fillStyle = DMG_COLORS[colorIndex];
  offscreenCtx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// Draw a box with a border (like Pokemon text boxes)
export function drawBox(x: number, y: number, w: number, h: number): void {
  // Fill with white
  fillRect(x, y, w, h, 3);
  // Border with black
  drawRect(x, y, w, h, 0);
  // Inner border with dark
  drawRect(x + 1, y + 1, w - 2, h - 2, 1);
}

import { getContext } from './canvas.ts';
import { drawText, measureText, LINE_HEIGHT } from './text.ts';
import { SCREEN_WIDTH, SCREEN_HEIGHT, DMG_PALETTE } from '../constants.ts';

// Dialogue box dimensions (Pokemon-style bottom box)
const DIALOGUE_BOX_HEIGHT = 40;
const DIALOGUE_BOX_Y = SCREEN_HEIGHT - DIALOGUE_BOX_HEIGHT;
const DIALOGUE_PADDING = 8;
const DIALOGUE_TEXT_WIDTH = SCREEN_WIDTH - (DIALOGUE_PADDING * 2);
const MAX_LINES = 2;

// Dialogue state
interface DialogueState {
  lines: string[];           // All dialogue lines from NPC
  currentLineIndex: number;  // Which line we're on
  currentCharIndex: number;  // Typewriter position in current line
  complete: boolean;         // Current line fully displayed
  speakerName?: string;      // Optional speaker name
}

let dialogueState: DialogueState | null = null;

// Word wrap text to fit in dialogue box
function wrapText(text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = measureText(testLine);

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// Split long dialogue into pages of 2 lines each
function paginateDialogue(dialogueArray: string[]): string[] {
  const allLines: string[] = [];

  for (const text of dialogueArray) {
    const wrapped = wrapText(text, DIALOGUE_TEXT_WIDTH);
    allLines.push(...wrapped);
  }

  // Group into pages of 2 lines
  const pages: string[] = [];
  for (let i = 0; i < allLines.length; i += MAX_LINES) {
    const pageLines = allLines.slice(i, i + MAX_LINES);
    pages.push(pageLines.join('\n'));
  }

  return pages;
}

export function startDialogue(dialogue: string[], speakerName?: string): void {
  const pages = paginateDialogue(dialogue);

  dialogueState = {
    lines: pages,
    currentLineIndex: 0,
    currentCharIndex: 0,
    complete: false,
    speakerName
  };
}

export function advanceDialogue(): void {
  if (!dialogueState) return;

  const currentText = dialogueState.lines[dialogueState.currentLineIndex] || '';

  if (!dialogueState.complete) {
    // Complete current line instantly
    dialogueState.currentCharIndex = currentText.length;
    dialogueState.complete = true;
  } else {
    // Move to next line
    dialogueState.currentLineIndex++;
    dialogueState.currentCharIndex = 0;
    dialogueState.complete = false;
  }
}

export function advanceDialogueChar(): void {
  if (!dialogueState || dialogueState.complete) return;

  const currentText = dialogueState.lines[dialogueState.currentLineIndex] || '';
  dialogueState.currentCharIndex++;

  if (dialogueState.currentCharIndex >= currentText.length) {
    dialogueState.complete = true;
  }
}

export function isDialogueComplete(): boolean {
  if (!dialogueState) return true;
  return dialogueState.currentLineIndex >= dialogueState.lines.length;
}

export function isCurrentLineComplete(): boolean {
  return dialogueState?.complete ?? true;
}

export function clearDialogue(): void {
  dialogueState = null;
}

export function renderDialogue(): void {
  if (!dialogueState) return;

  const ctx = getContext();

  // Draw dialogue box background
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(0, DIALOGUE_BOX_Y, SCREEN_WIDTH, DIALOGUE_BOX_HEIGHT);

  // Draw border
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, DIALOGUE_BOX_Y + 0.5, SCREEN_WIDTH - 1, DIALOGUE_BOX_HEIGHT - 1);

  // Inner border for Pokemon style
  ctx.strokeRect(2.5, DIALOGUE_BOX_Y + 2.5, SCREEN_WIDTH - 5, DIALOGUE_BOX_HEIGHT - 5);

  // Get current text with typewriter effect
  const currentText = dialogueState.lines[dialogueState.currentLineIndex] || '';
  const visibleText = currentText.substring(0, dialogueState.currentCharIndex);
  const lines = visibleText.split('\n');

  // Draw text lines
  for (let i = 0; i < lines.length; i++) {
    const textY = DIALOGUE_BOX_Y + DIALOGUE_PADDING + (i * LINE_HEIGHT);
    drawText(lines[i], DIALOGUE_PADDING, textY);
  }

  // Draw continue indicator when line is complete
  if (dialogueState.complete && !isDialogueComplete()) {
    // Draw small triangle indicator in bottom right
    const indicatorX = SCREEN_WIDTH - DIALOGUE_PADDING - 4;
    const indicatorY = SCREEN_HEIGHT - DIALOGUE_PADDING - 2;

    // Blinking effect using time
    const blink = Math.floor(Date.now() / 500) % 2 === 0;
    if (blink) {
      ctx.fillStyle = DMG_PALETTE.BLACK;
      ctx.beginPath();
      ctx.moveTo(indicatorX, indicatorY - 4);
      ctx.lineTo(indicatorX + 4, indicatorY - 4);
      ctx.lineTo(indicatorX + 2, indicatorY);
      ctx.closePath();
      ctx.fill();
    }
  }
}

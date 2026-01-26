import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.ts';
import { clear, fillRect, drawBox } from './canvas.ts';
import { drawText, drawTextCentered } from './text.ts';
import { getMusicVolume, setMusicVolume, isMusicMuted, toggleMute } from '../engine/audio.ts';

type SettingsOption = 'music-vol' | 'text-speed' | 'back';

const OPTIONS: SettingsOption[] = ['music-vol', 'text-speed', 'back'];
const TEXT_SPEEDS = ['SLOW', 'NORMAL', 'FAST'];

let menuIndex = 0;
let textSpeedIndex = 1; // Default to NORMAL
let previousMode: 'title' | 'party-menu' = 'title';

export function initSettingsUI(fromMode: 'title' | 'party-menu'): void {
  menuIndex = 0;
  previousMode = fromMode;
  // Load settings from localStorage
  loadSettings();
}

function loadSettings(): void {
  try {
    const saved = localStorage.getItem('pocket-sharks-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.textSpeedIndex !== undefined) {
        textSpeedIndex = settings.textSpeedIndex;
      }
    }
  } catch {
    // Use defaults
  }
}

function saveSettings(): void {
  try {
    const settings = {
      musicVolume: getMusicVolume(),
      textSpeedIndex: textSpeedIndex
    };
    localStorage.setItem('pocket-sharks-settings', JSON.stringify(settings));
  } catch {
    // Silently fail
  }
}

export function getTextSpeedMs(): number {
  // Returns milliseconds per character for typewriter
  switch (textSpeedIndex) {
    case 0: return 80;  // SLOW
    case 1: return 40;  // NORMAL
    case 2: return 20;  // FAST
    default: return 40;
  }
}

export function handleSettingsInput(input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null): 'close' | null {
  if (!input) return null;

  const currentOption = OPTIONS[menuIndex];

  if (input === 'up') {
    menuIndex = (menuIndex - 1 + OPTIONS.length) % OPTIONS.length;
  } else if (input === 'down') {
    menuIndex = (menuIndex + 1) % OPTIONS.length;
  } else if (input === 'left') {
    if (currentOption === 'music-vol') {
      // Decrease music volume
      const vol = getMusicVolume();
      setMusicVolume(Math.max(0, vol - 0.1));
      saveSettings();
    } else if (currentOption === 'text-speed') {
      textSpeedIndex = (textSpeedIndex - 1 + TEXT_SPEEDS.length) % TEXT_SPEEDS.length;
      saveSettings();
    }
  } else if (input === 'right') {
    if (currentOption === 'music-vol') {
      // Increase music volume
      const vol = getMusicVolume();
      setMusicVolume(Math.min(1, vol + 0.1));
      saveSettings();
    } else if (currentOption === 'text-speed') {
      textSpeedIndex = (textSpeedIndex + 1) % TEXT_SPEEDS.length;
      saveSettings();
    }
  } else if (input === 'a') {
    if (currentOption === 'back') {
      return 'close';
    } else if (currentOption === 'music-vol') {
      // Toggle mute
      toggleMute();
      saveSettings();
    }
  } else if (input === 'b') {
    return 'close';
  }

  return null;
}

export function getPreviousMode(): 'title' | 'party-menu' {
  return previousMode;
}

export function renderSettings(): void {
  clear();

  // Background
  fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 3);

  // Title bar
  drawBox(8, 4, SCREEN_WIDTH - 16, 18);
  drawTextCentered('OPTIONS', 0, SCREEN_WIDTH, 9);

  // Settings box - leave room for instructions at bottom
  const boxX = 8;
  const boxY = 26;
  const boxWidth = SCREEN_WIDTH - 16;  // 144px
  const boxHeight = 86;  // Ends at y=112
  drawBox(boxX, boxY, boxWidth, boxHeight);

  // Option spacing
  const optionX = boxX + 8;  // 16px from left
  const arrowX = optionX - 2;
  const valueX = 72;  // Right-aligned values start here
  const lineHeight = 24;  // Generous spacing between options

  // Music volume option
  const musicY = boxY + 12;
  if (menuIndex === 0) drawText('>', arrowX, musicY);
  drawText('MUSIC', optionX + 6, musicY);
  renderVolumeBar(valueX, musicY, getMusicVolume(), isMusicMuted());

  // Text speed option
  const textY = boxY + 12 + lineHeight;
  if (menuIndex === 1) drawText('>', arrowX, textY);
  drawText('TEXT', optionX + 6, textY);
  drawText(TEXT_SPEEDS[textSpeedIndex], valueX + 16, textY);

  // Back option
  const backY = boxY + 12 + lineHeight * 2;
  if (menuIndex === 2) drawText('>', arrowX, backY);
  drawText('BACK', optionX + 6, backY);

  // Instructions at bottom (below box)
  drawText('L/R: ADJUST', 8, SCREEN_HEIGHT - 22);
  drawText('A: SELECT  B: BACK', 8, SCREEN_HEIGHT - 10);
}

function renderVolumeBar(x: number, y: number, volume: number, muted: boolean): void {
  const barWidth = 72;  // Fits from x=72 to x=144 (within 144px box)
  const barHeight = 8;

  // Border
  fillRect(x, y, barWidth, barHeight, 0);

  // Background
  fillRect(x + 1, y + 1, barWidth - 2, barHeight - 2, 1);

  if (muted) {
    // Show "MUTE" text centered in bar area
    drawText('MUTE', x + 20, y, 3);
  } else {
    // Fill based on volume
    const fillWidth = Math.floor((barWidth - 4) * volume);
    if (fillWidth > 0) {
      fillRect(x + 2, y + 2, fillWidth, barHeight - 4, 2);
    }
  }
}

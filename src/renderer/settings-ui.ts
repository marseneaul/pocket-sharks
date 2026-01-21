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
    const saved = localStorage.getItem('shark-pokemon-settings');
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
    localStorage.setItem('shark-pokemon-settings', JSON.stringify(settings));
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

  // Title
  drawBox(10, 4, SCREEN_WIDTH - 20, 20);
  drawTextCentered('OPTIONS', 0, SCREEN_WIDTH, 10);

  // Settings box
  const boxY = 30;
  const boxHeight = 100;
  drawBox(8, boxY, SCREEN_WIDTH - 16, boxHeight);

  // Music volume option
  const musicY = boxY + 12;
  if (menuIndex === 0) drawText('>', 14, musicY);
  drawText('MUSIC', 24, musicY);
  renderVolumeBar(80, musicY, getMusicVolume(), isMusicMuted());

  // Text speed option
  const textY = boxY + 32;
  if (menuIndex === 1) drawText('>', 14, textY);
  drawText('TEXT', 24, textY);
  drawText('[' + TEXT_SPEEDS[textSpeedIndex] + ']', 80, textY);

  // Back option
  const backY = boxY + 70;
  if (menuIndex === 2) drawText('>', 14, backY);
  drawText('BACK', 24, backY);

  // Instructions at bottom
  drawText('LEFT/RIGHT: Adjust', 8, SCREEN_HEIGHT - 20);
  drawText('A: Toggle/Select', 8, SCREEN_HEIGHT - 10);
}

function renderVolumeBar(x: number, y: number, volume: number, muted: boolean): void {
  const barWidth = 60;
  const barHeight = 8;

  // Border
  fillRect(x, y, barWidth, barHeight, 0);

  // Background
  fillRect(x + 1, y + 1, barWidth - 2, barHeight - 2, 1);

  if (muted) {
    // Show "MUTE" text instead of bar
    drawText('MUTE', x + 10, y);
  } else {
    // Fill based on volume
    const fillWidth = Math.floor((barWidth - 4) * volume);
    if (fillWidth > 0) {
      fillRect(x + 2, y + 2, fillWidth, barHeight - 4, 2);
    }
  }
}

// Audio system for background music and sound effects

import coastalTownMusic from '../../assets/Coastal Cartridge Town.mp3';
import battleMusic from '../../assets/battle.mp3';
import hitSfx from '../../assets/hit.wav';

type MusicTrack = 'overworld' | 'battle';

// Sound effects
let sfxVolume = 0.7;

let overworldMusic: HTMLAudioElement | null = null;
let battleMusicTrack: HTMLAudioElement | null = null;
let currentTrack: MusicTrack = 'overworld';
let musicVolume = 0.5;
let isMuted = false;

export function initAudio(): void {
  overworldMusic = new Audio(coastalTownMusic);
  overworldMusic.loop = true;
  overworldMusic.volume = musicVolume;

  battleMusicTrack = new Audio(battleMusic);
  battleMusicTrack.loop = true;
  battleMusicTrack.volume = musicVolume;
}

function getCurrentMusic(): HTMLAudioElement | null {
  return currentTrack === 'battle' ? battleMusicTrack : overworldMusic;
}

export function playMusic(): void {
  const music = getCurrentMusic();
  if (music && !isMuted) {
    // Browsers require user interaction before playing audio
    // This will be called after first user input
    music.play().catch(() => {
      // Silently fail - will retry on next user interaction
    });
  }
}

export function pauseMusic(): void {
  if (overworldMusic) {
    overworldMusic.pause();
  }
  if (battleMusicTrack) {
    battleMusicTrack.pause();
  }
}

export function switchMusic(track: MusicTrack): void {
  if (currentTrack === track) return;

  // Pause current music
  const oldMusic = getCurrentMusic();
  if (oldMusic) {
    oldMusic.pause();
    oldMusic.currentTime = 0;
  }

  // Switch to new track
  currentTrack = track;

  // Play new music if not muted
  if (!isMuted) {
    playMusic();
  }
}

export function playBattleMusic(): void {
  switchMusic('battle');
}

export function playOverworldMusic(): void {
  switchMusic('overworld');
}

export function setMusicVolume(volume: number): void {
  musicVolume = Math.max(0, Math.min(1, volume));
  const effectiveVolume = isMuted ? 0 : musicVolume;
  if (overworldMusic) {
    overworldMusic.volume = effectiveVolume;
  }
  if (battleMusicTrack) {
    battleMusicTrack.volume = effectiveVolume;
  }
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  const effectiveVolume = isMuted ? 0 : musicVolume;
  if (overworldMusic) {
    overworldMusic.volume = effectiveVolume;
  }
  if (battleMusicTrack) {
    battleMusicTrack.volume = effectiveVolume;
  }
  return isMuted;
}

export function isMusicPlaying(): boolean {
  const music = getCurrentMusic();
  return music ? !music.paused : false;
}

export function getMusicVolume(): number {
  return musicVolume;
}

export function isMusicMuted(): boolean {
  return isMuted;
}

// Try to start music (call after user interaction)
export function tryStartMusic(): void {
  const music = getCurrentMusic();
  if (music && music.paused && !isMuted) {
    playMusic();
  }
}

// Sound effects
export function playHitSound(): void {
  if (isMuted) return;
  const sfx = new Audio(hitSfx);
  sfx.volume = sfxVolume;
  sfx.play().catch(() => {
    // Silently fail if audio can't play
  });
}

export function setSfxVolume(volume: number): void {
  sfxVolume = Math.max(0, Math.min(1, volume));
}

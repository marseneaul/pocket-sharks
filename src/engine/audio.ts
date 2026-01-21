// Audio system for background music and sound effects

import coastalTownMusic from '../../assets/Coastal Cartridge Town.mp3';

let bgMusic: HTMLAudioElement | null = null;
let musicVolume = 0.5;
let isMuted = false;

export function initAudio(): void {
  bgMusic = new Audio(coastalTownMusic);
  bgMusic.loop = true;
  bgMusic.volume = musicVolume;
}

export function playMusic(): void {
  if (bgMusic && !isMuted) {
    // Browsers require user interaction before playing audio
    // This will be called after first user input
    bgMusic.play().catch(() => {
      // Silently fail - will retry on next user interaction
    });
  }
}

export function pauseMusic(): void {
  if (bgMusic) {
    bgMusic.pause();
  }
}

export function setMusicVolume(volume: number): void {
  musicVolume = Math.max(0, Math.min(1, volume));
  if (bgMusic) {
    bgMusic.volume = isMuted ? 0 : musicVolume;
  }
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  if (bgMusic) {
    bgMusic.volume = isMuted ? 0 : musicVolume;
  }
  return isMuted;
}

export function isMusicPlaying(): boolean {
  return bgMusic ? !bgMusic.paused : false;
}

export function getMusicVolume(): number {
  return musicVolume;
}

export function isMusicMuted(): boolean {
  return isMuted;
}

// Try to start music (call after user interaction)
export function tryStartMusic(): void {
  if (bgMusic && bgMusic.paused && !isMuted) {
    playMusic();
  }
}

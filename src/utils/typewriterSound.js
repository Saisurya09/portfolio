/**
 * Sound Manager for the typewriter typing effect.
 * Uses Web Audio API to play the middle clip of the audio file in exact synchronization
 * with the typing display, while properly handling browser autoplay and audio unlocking.
 */

class TypewriterSoundManager {
  constructor() {
    this.audioCtx = null;
    this.audioBuffer = null;
    this.currentSource = null;
    this.gainNode = null;
    this.isLoaded = false;
    this.fallbackAudio = null;
    this.unlocked = false;

    // Middle clip settings for typing.mp3 (total 8.1s):
    // Start at 2.2s (the middle section with active mechanical keystrokes)
    this.middleClipOffset = 2.2;
    this.defaultDuration = 1.6; // 1.6 seconds matches 16 chars @ 100ms
    this.volume = 0.95; // Crisp and audible
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    return this.audioCtx;
  }

  async init() {
    if (typeof window === 'undefined') return;

    // Prepare fallback HTML5 Audio
    try {
      this.fallbackAudio = new Audio('/typing.mp3');
      this.fallbackAudio.preload = 'auto';
      this.fallbackAudio.volume = this.volume;
    } catch (e) {}

    // Preload & decode MP3 into Web Audio buffer
    await this.loadAudioBuffer();

    // Auto-unlock AudioContext on first user interaction anywhere on the page
    const unlockHandler = async () => {
      await this.unlock();
      window.removeEventListener('click', unlockHandler, true);
      window.removeEventListener('keydown', unlockHandler, true);
      window.removeEventListener('touchstart', unlockHandler, true);
      window.removeEventListener('pointerdown', unlockHandler, true);
    };

    window.addEventListener('click', unlockHandler, true);
    window.addEventListener('keydown', unlockHandler, true);
    window.addEventListener('touchstart', unlockHandler, true);
    window.addEventListener('pointerdown', unlockHandler, true);
  }

  async unlock() {
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume();
        this.unlocked = true;
      } catch (err) {
        console.debug('AudioContext resume pending gesture:', err);
      }
    } else if (ctx && ctx.state === 'running') {
      this.unlocked = true;
    }
  }

  async loadAudioBuffer() {
    try {
      const res = await fetch('/typing.mp3');
      if (!res.ok) return;
      const arrayBuffer = await res.arrayBuffer();
      const ctx = this.getAudioContext();
      if (ctx) {
        this.audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        this.isLoaded = true;
      }
    } catch (err) {
      console.warn('Could not decode audio into buffer:', err);
    }
  }

  /**
   * Play the middle clip strictly for the specified duration.
   * @param {number} [duration=1.6] - Duration in seconds to sync with display
   * @param {number} [offset=2.2] - Start offset in the 8s file (defaults to 2.2s middle clip)
   */
  async playMiddleClip(duration = this.defaultDuration, offset = this.middleClipOffset) {
    await this.unlock();
    this.stop();

    const ctx = this.getAudioContext();

    // 1. Primary: Web Audio API BufferSource
    if (ctx && this.audioBuffer) {
      try {
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const source = ctx.createBufferSource();
        source.buffer = this.audioBuffer;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.volume, ctx.currentTime);

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Clamp offset so offset + duration doesn't exceed audio length
        const safeOffset = Math.max(0, Math.min(offset, this.audioBuffer.duration - duration));
        source.start(0, safeOffset, duration);

        this.currentSource = source;
        this.gainNode = gainNode;

        source.onended = () => {
          if (this.currentSource === source) {
            this.currentSource = null;
          }
        };
        return;
      } catch (e) {
        console.warn('Web Audio playback error, using HTML5 fallback:', e);
      }
    }

    // 2. Fallback: HTML5 Audio with currentTime seek to middle clip
    if (this.fallbackAudio) {
      try {
        this.fallbackAudio.currentTime = offset;
        this.fallbackAudio.volume = this.volume;
        const playPromise = this.fallbackAudio.play();
        if (playPromise) {
          playPromise.catch(() => {});
        }

        this.fallbackTimer = setTimeout(() => {
          this.stop();
        }, duration * 1000);
      } catch (e) {}
    }
  }

  stop() {
    if (this.currentSource) {
      try {
        if (this.gainNode && this.audioCtx) {
          // Micro fade out over 30ms to prevent popping
          this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.015);
        }
        setTimeout(() => {
          try {
            if (this.currentSource) this.currentSource.stop();
          } catch (e) {}
          this.currentSource = null;
        }, 35);
      } catch (e) {
        this.currentSource = null;
      }
    }

    if (this.fallbackAudio) {
      try {
        this.fallbackAudio.pause();
        this.fallbackAudio.currentTime = this.middleClipOffset;
      } catch (e) {}
    }

    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }
}

export const typewriterSound = new TypewriterSoundManager();
if (typeof window !== 'undefined') {
  typewriterSound.init();
  window.__typewriterSound = typewriterSound;
}

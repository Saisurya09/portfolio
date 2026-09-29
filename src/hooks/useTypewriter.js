import { useState, useEffect, useCallback, useRef } from 'react';
import { typewriterSound } from '../utils/typewriterSound';

/**
 * Custom hook for dynamic typewriter effect that automatically re-types every 5 minutes
 * and plays the middle clip of typing.mp3 synchronized with the name display.
 *
 * @param {string} text - The full text to type out.
 * @param {object} [options]
 * @param {number} [options.typingSpeed=100] - Milliseconds per character during typing.
 * @param {number} [options.deletingSpeed=35] - Milliseconds per character during backspacing.
 * @param {number} [options.interval=300000] - Interval between cycles in ms (5 minutes = 300,000ms).
 * @param {number} [options.initialDelay=300] - Delay before first typing sequence on load.
 * @param {number} [options.pauseBeforeType=350] - Pause after deleting before typing begins.
 * @param {number} [options.middleClipOffset=2.2] - Start offset in the audio file for the middle clip.
 */
export function useTypewriter(text = '', options = {}) {
  const {
    typingSpeed = 100,
    deletingSpeed = 35,
    interval = 5 * 60 * 1000, // 5 minutes
    initialDelay = 300,
    pauseBeforeType = 350,
    middleClipOffset = 2.2, // Middle of the 8.1s audio clip
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('waiting'); // 'waiting' | 'typing' | 'idle' | 'deleting'
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_sound_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const timerRef = useRef(null);

  // Duration in seconds to type the full text
  const durationSeconds = (text.length * typingSpeed) / 1000;

  // Persist sound preference
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_sound_enabled', String(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Play the middle clip strictly for the duration of the typing display
  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    typewriterSound.playMiddleClip(durationSeconds, middleClipOffset);
  }, [soundEnabled, durationSeconds, middleClipOffset]);

  const stopSound = useCallback(() => {
    typewriterSound.stop();
  }, []);

  // Replay function: backspaces out and types again with sound
  const replay = useCallback(() => {
    clearTimer();
    stopSound();
    setPhase('deleting');
  }, [clearTimer, stopSound]);

  // Sound toggle button action:
  // Ensures audio is unlocked and replays with sound so the user immediately hears the middle clip
  const toggleSound = useCallback(() => {
    typewriterSound.unlock();
    setSoundEnabled(true);
    // Always trigger replay with sound so user gets immediate audio feedback
    replay();
  }, [replay]);

  const muteSound = useCallback(() => {
    setSoundEnabled(false);
    stopSound();
  }, [stopSound]);

  // Initial mount trigger
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPhase('typing');
      playSound();
    }, initialDelay);

    return () => {
      clearTimer();
      stopSound();
    };
  }, [initialDelay, clearTimer, playSound, stopSound]);

  // Main state machine
  useEffect(() => {
    if (!text) return;

    if (phase === 'typing') {
      if (displayedText.length < text.length) {
        timerRef.current = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Full text reached: stop sound immediately and enter 5-minute idle phase
        stopSound();
        setPhase('idle');
      }
    } else if (phase === 'idle') {
      // Wait for 5 minutes (300,000ms) before repeating
      timerRef.current = setTimeout(() => {
        setPhase('deleting');
      }, interval);
    } else if (phase === 'deleting') {
      if (displayedText.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Deleting done: brief pause, then start typing and start middle clip in sync
        timerRef.current = setTimeout(() => {
          setPhase('typing');
          playSound();
        }, pauseBeforeType);
      }
    }

    return () => clearTimer();
  }, [
    phase,
    displayedText,
    text,
    typingSpeed,
    deletingSpeed,
    interval,
    pauseBeforeType,
    clearTimer,
    playSound,
    stopSound,
  ]);

  // Expose global test helpers
  useEffect(() => {
    window.__replayHeroTyping = replay;
    window.__toggleHeroSound = toggleSound;
    window.__playTypingMiddleClip = () => typewriterSound.playMiddleClip(durationSeconds, middleClipOffset);
    return () => {
      delete window.__replayHeroTyping;
      delete window.__toggleHeroSound;
      delete window.__playTypingMiddleClip;
    };
  }, [replay, toggleSound, durationSeconds, middleClipOffset]);

  return {
    displayedText,
    isTyping: phase === 'typing' || phase === 'deleting',
    phase,
    replay,
    soundEnabled,
    toggleSound,
    muteSound,
  };
}

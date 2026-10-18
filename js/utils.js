/**
 * JDFit Utility & Helper Functions
 * Pure sanitization, audio synthesis, time formatting, and validation.
 */

import { MUSCLES } from './exerciseData.js';

/**
 * Escapes HTML characters to prevent XSS attacks when rendering dynamic content.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formats seconds into MM:SS string.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatSeconds(totalSeconds) {
  const safeSec = Math.max(0, Math.floor(totalSeconds || 0));
  const mins = Math.floor(safeSec / 60);
  const secs = safeSec % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Comprehensive input validation for workout configuration.
 * @param {object} config
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validateWorkoutConfig(config) {
  if (!config || typeof config !== 'object') {
    return { isValid: false, error: 'Workout configuration object is missing.' };
  }

  const { durationMinutes, trainingMode, difficulty, selectedEquipment, selectedMuscles } = config;

  // 1. Duration check
  if (![30, 45, 60].includes(durationMinutes)) {
    return {
      isValid: false,
      error: 'Invalid session duration. Must be 30, 45, or 60 minutes.'
    };
  }

  // 2. Mode check
  if (!['strength', 'endurance', 'both', 'cardio'].includes(trainingMode)) {
    return {
      isValid: false,
      error: 'Invalid training mode. Select Strength, Endurance, Hybrid (Both), or Cardio.'
    };
  }

  // 3. Difficulty check
  if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
    return {
      isValid: false,
      error: 'Invalid experience level. Select Beginner, Intermediate, or Advanced.'
    };
  }

  // 4. Equipment check
  if (!Array.isArray(selectedEquipment) || selectedEquipment.length === 0) {
    return {
      isValid: false,
      error: 'At least one equipment option must be selected (e.g. Bodyweight).'
    };
  }

  // 5. Muscles check
  if (selectedMuscles && !Array.isArray(selectedMuscles)) {
    return {
      isValid: false,
      error: 'Selected muscles must be an array of valid anatomical keys.'
    };
  }

  if (Array.isArray(selectedMuscles) && selectedMuscles.length > 0) {
    const invalidMuscles = selectedMuscles.filter(m => !MUSCLES[m]);
    if (invalidMuscles.length > 0) {
      return {
        isValid: false,
        error: `Unrecognized target muscle key(s): ${invalidMuscles.join(', ')}`
      };
    }
  }

  return { isValid: true };
}

/**
 * Audio Synthesizer utilizing Web Audio API with zero external asset dependencies.
 */
class SoundSynthesizer {
  constructor() {
    this.audioCtx = null;
  }

  _initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  /**
   * Plays a subtle countdown tick (used on 3, 2, 1).
   */
  playTick() {
    try {
      this._initContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.1);
    } catch {}
  }

  /**
   * Plays a pleasant harmonic completion chime for finished sets and transitions.
   */
  playChime() {
    try {
      this._initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      [880, 1108.73].forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch {}
  }

  /**
   * Plays a celebratory fanfare when completing the entire workout.
   */
  playVictoryFanfare() {
    try {
      this._initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.25, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.6);
      });
    } catch {}
  }
}

export const soundFx = new SoundSynthesizer();

/**
 * Global resilience error handling wrapper.
 * @param {(message: string) => void} onErrorNotice
 */
export function setupGlobalErrorHandling(onErrorNotice) {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', event => {
    console.error('[JDFit Global Exception Caught]:', event.error || event.message);
    if (typeof onErrorNotice === 'function') {
      onErrorNotice('An unexpected error occurred. JDFit has recovered gracefully.');
    }
  });

  window.addEventListener('unhandledrejection', event => {
    console.error('[JDFit Unhandled Promise Rejection Caught]:', event.reason);
    if (typeof onErrorNotice === 'function') {
      onErrorNotice('A network or background task could not complete.');
    }
  });
}

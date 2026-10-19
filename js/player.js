/**
 * JDFit Guided Workout Player Module
 * Manages live session execution, timed interval countdowns, rest clocks, audio cues, and ARIA updates.
 */

import { formatSeconds, soundFx } from './utils.js';
import { mountExerciseVisualizer } from './exerciseVisualizer.js';

export class WorkoutPlayer {
  /**
   * @param {object} options
   * @param {HTMLElement} options.modalElement
   * @param {HTMLElement} options.bodyElement
   * @param {HTMLElement} options.footerElement
   * @param {HTMLElement} options.timerBadgeElement
   * @param {HTMLElement} options.titleElement
   * @param {HTMLElement} options.liveRegionElement
   * @param {Function} options.onSessionUpdate
   */
  constructor(options) {
    this.modalEl = options.modalElement;
    this.bodyEl = options.bodyElement;
    this.footerEl = options.footerElement;
    this.timerBadgeEl = options.timerBadgeElement;
    this.titleEl = options.titleElement;
    this.liveRegionEl = options.liveRegionElement;
    this.onSessionUpdate = options.onSessionUpdate || (() => {});

    this.routine = null;
    this.currentExerciseIndex = 0;
    this.currentSetIndex = 0;
    this.phase = 'exercise'; // 'exercise' | 'rest' | 'finished'
    this.secondsRemaining = 0;
    this.totalSeconds = 0;
    this.isPaused = false;
    this.activeVisualizer = null;

    this.stopwatchInterval = null;
    this.countdownInterval = null;
  }

  /**
   * Opens and starts the live player with a given routine.
   * @param {object} routine
   */
  start(routine) {
    if (!routine || !routine.exercises || routine.exercises.length === 0) {
      return;
    }

    this.routine = routine;
    this.currentExerciseIndex = 0;
    this.currentSetIndex = 0;
    this.phase = 'exercise';
    this.totalSeconds = 0;
    this.isPaused = false;

    if (this.titleEl) {
      this.titleEl.textContent = routine.title;
      this.titleEl.setAttribute('title', routine.title);
    }

    this.modalEl.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    this._startStopwatch();
    this._setupPhase('exercise', 0, 0);
  }

  /**
   * Closes the player and clears intervals.
   */
  close() {
    this._cleanupVisualizer();
    this.modalEl.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    this._clearIntervals();
    this.onSessionUpdate(this.routine);
  }

  _cleanupVisualizer() {
    if (this.activeVisualizer) {
      if (typeof this.activeVisualizer.cleanup === 'function') {
        this.activeVisualizer.cleanup();
      }
      this.activeVisualizer = null;
    }
  }

  _clearIntervals() {
    if (this.stopwatchInterval) clearInterval(this.stopwatchInterval);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  _announce(message) {
    if (this.liveRegionEl) {
      this.liveRegionEl.textContent = message;
    }
  }

  _startStopwatch() {
    if (this.stopwatchInterval) clearInterval(this.stopwatchInterval);
    this.stopwatchInterval = setInterval(() => {
      if (!this.isPaused && this.phase !== 'finished') {
        this.totalSeconds++;
        if (this.timerBadgeEl) {
          this.timerBadgeEl.textContent = formatSeconds(this.totalSeconds);
        }
      }
    }, 1000);
  }

  _setupPhase(phase, exIdx, setIdx) {
    this.phase = phase;
    this.currentExerciseIndex = exIdx;
    this.currentSetIndex = setIdx;

    const item = this.routine.exercises[exIdx];

    if (!item) {
      this._finishWorkout();
      return;
    }

    if (phase === 'exercise') {
      this.secondsRemaining = item.isTimed && item.durationSeconds ? item.durationSeconds : 0;
      this._announce(`Exercise ${exIdx + 1} of ${this.routine.exercises.length}: ${item.exercise.name}, Set ${setIdx + 1} of ${item.customSets}`);
    } else if (phase === 'rest') {
      this.secondsRemaining = item.customRestSeconds || 60;
      this._announce(`Rest period active. ${this.secondsRemaining} seconds rest.`);
    }

    this.render();
    this._startCountdown();
  }

  _startCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    const isTimedPhase =
      this.phase === 'rest' ||
      (this.phase === 'exercise' && this.routine.exercises[this.currentExerciseIndex]?.isTimed);

    if (isTimedPhase && this.secondsRemaining > 0) {
      this.countdownInterval = setInterval(() => {
        if (!this.isPaused) {
          this.secondsRemaining--;

          // Sound tick for the last 3 seconds
          if (this.secondsRemaining <= 3 && this.secondsRemaining > 0) {
            soundFx.playTick();
          }

          if (this.secondsRemaining <= 0) {
            clearInterval(this.countdownInterval);
            soundFx.playChime();

            if (this.phase === 'exercise') {
              this.completeSet();
            } else if (this.phase === 'rest') {
              this.skipRest();
            }
          } else {
            this._updateCountdownDisplay();
          }
        }
      }, 1000);
    }
  }

  completeSet() {
    const item = this.routine.exercises[this.currentExerciseIndex];
    if (!item) return;

    soundFx.playChime();
    item.completedSets[this.currentSetIndex] = true;
    this.onSessionUpdate(this.routine);

    const isLastSet = this.currentSetIndex >= item.customSets - 1;
    const isLastEx = this.currentExerciseIndex >= this.routine.exercises.length - 1;

    if (isLastSet && isLastEx) {
      this._finishWorkout();
      return;
    }

    this._setupPhase('rest', this.currentExerciseIndex, this.currentSetIndex);
  }

  skipRest() {
    const item = this.routine.exercises[this.currentExerciseIndex];
    const isLastSet = this.currentSetIndex >= item.customSets - 1;

    if (isLastSet) {
      const nextExIdx = this.currentExerciseIndex + 1;
      this._setupPhase('exercise', nextExIdx, 0);
    } else {
      const nextSetIdx = this.currentSetIndex + 1;
      this._setupPhase('exercise', this.currentExerciseIndex, nextSetIdx);
    }
  }

  adjustRest(secondsDelta) {
    this.secondsRemaining = Math.max(5, this.secondsRemaining + secondsDelta);
    this._updateCountdownDisplay();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.render();
  }

  previousExercise() {
    if (this.currentExerciseIndex > 0) {
      this._setupPhase('exercise', this.currentExerciseIndex - 1, 0);
    }
  }

  skipExercise() {
    if (this.currentExerciseIndex < this.routine.exercises.length - 1) {
      this._setupPhase('exercise', this.currentExerciseIndex + 1, 0);
    }
  }

  _finishWorkout() {
    this.phase = 'finished';
    this._clearIntervals();
    soundFx.playVictoryFanfare();
    this._announce('Congratulations! You have completed the entire workout session.');
    this.render();
  }

  _updateCountdownDisplay() {
    const displayEl = document.getElementById('playerCountdownDisplay');
    if (displayEl) {
      displayEl.textContent = formatSeconds(this.secondsRemaining);
    }
  }

  render() {
    if (!this.bodyEl || !this.footerEl || !this.routine) return;

    // Finished Phase
    if (this.phase === 'finished') {
      this._cleanupVisualizer();
      this.bodyEl.innerHTML = `
        <div class="p-8 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl mx-auto animate-bounce">
            🏆
          </div>
          <h3 class="text-2xl font-black text-white font-display">Workout Session Complete!</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">
            Outstanding dedication! You finished all scheduled exercises and sets in 
            <strong class="text-cyan-300 font-mono">${formatSeconds(this.totalSeconds)}</strong>.
          </p>
        </div>
      `;

      this.footerEl.innerHTML = `
        <button type="button" id="btnFinishPlayer" class="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all">
          Return to Workout Summary
        </button>
      `;

      const btn = document.getElementById('btnFinishPlayer');
      if (btn) btn.onclick = () => this.close();
      return;
    }

    // Rest Phase
    if (this.phase === 'rest') {
      this._cleanupVisualizer();
      this.bodyEl.innerHTML = `
        <div class="p-8 rounded-3xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Rest Interval Active
          </span>
          <div class="text-6xl font-black font-mono text-white tabular-nums tracking-tight" id="playerCountdownDisplay">
            ${formatSeconds(this.secondsRemaining)}
          </div>
          <p class="text-xs text-slate-400">Catch your breath and prepare for the next set</p>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button type="button" id="btnRestMinus15" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors">
              -15s
            </button>
            <button type="button" id="btnRestPlus15" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors">
              +15s
            </button>
            <button type="button" id="btnSkipRest" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all">
              Skip Rest ➔
            </button>
          </div>
        </div>
      `;

      this.footerEl.innerHTML = '';
      document.getElementById('btnRestMinus15')?.addEventListener('click', () => this.adjustRest(-15));
      document.getElementById('btnRestPlus15')?.addEventListener('click', () => this.adjustRest(15));
      document.getElementById('btnSkipRest')?.addEventListener('click', () => this.skipRest());
      return;
    }

    // Exercise Phase
    this._cleanupVisualizer();
    const item = this.routine.exercises[this.currentExerciseIndex];
    const ex = item.exercise;

    this.bodyEl.innerHTML = `
      <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2.5">
        <div class="flex items-center gap-2">
          <span>Exercise <strong class="text-white">${this.currentExerciseIndex + 1}</strong> of <strong class="text-white">${this.routine.exercises.length}</strong></span>
          <span class="text-slate-600">·</span>
          <span class="text-cyan-300 font-bold font-mono">Set ${this.currentSetIndex + 1} of ${item.customSets}</span>
        </div>
        <div class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-400" title="Total active workout session time">
          <span class="text-slate-500">Session:</span>
          <span class="font-bold tabular-nums">${formatSeconds(this.totalSeconds)}</span>
        </div>
      </div>

      <!-- Biomechanical Kinetic Form Animation Visualizer -->
      <div id="playerVisualizerMount" class="w-full"></div>

      <div class="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="text-[11px] text-cyan-400 font-mono tracking-wide">${ex.equipment} · ${ex.mechanics}</div>
            <h3 class="text-base sm:text-lg font-bold text-white truncate">${ex.name}</h3>
          </div>
          <div class="p-2 sm:p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-center shrink-0">
            <span class="text-[10px] uppercase font-mono text-cyan-400 block font-semibold">${item.isTimed ? 'Timed' : 'Target'}</span>
            <span class="text-sm sm:text-base font-black font-mono text-white">${item.customReps}</span>
          </div>
        </div>

        <div class="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 leading-relaxed">
          <strong class="text-cyan-300 block mb-1">Coaching Form Cue:</strong>
          ${ex.coachingCues[0] || 'Maintain smooth tempo and full range of motion.'}
        </div>

        ${
          item.isTimed
            ? `
          <div class="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
            <div>
              <span class="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Time Remaining</span>
              <span class="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums" id="playerCountdownDisplay">
                ${formatSeconds(this.secondsRemaining)}
              </span>
            </div>
            <button type="button" id="btnResetTimer" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors">
              Reset Interval
            </button>
          </div>
        `
            : ''
        }
      </div>
    `;

    // Mount visualizer for current exercise
    const visMount = document.getElementById('playerVisualizerMount');
    if (visMount) {
      this.activeVisualizer = mountExerciseVisualizer(ex, visMount);
    }

    if (item.isTimed) {
      document.getElementById('btnResetTimer')?.addEventListener('click', () => {
        this.secondsRemaining = item.durationSeconds || 60;
        this._updateCountdownDisplay();
      });
    }

    const isFirstEx = this.currentExerciseIndex === 0;
    const isLastEx = this.currentExerciseIndex === this.routine.exercises.length - 1;

    this.footerEl.innerHTML = `
      <button type="button" id="btnPrevEx" class="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors ${
        isFirstEx ? 'opacity-30 pointer-events-none' : ''
      }">
        Previous
      </button>

      <button type="button" id="btnCompleteSet" class="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]">
        Complete Set ✓
      </button>

      <button type="button" id="btnSkipEx" class="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors ${
        isLastEx ? 'opacity-30 pointer-events-none' : ''
      }">
        Skip Ex
      </button>
    `;

    document.getElementById('btnPrevEx')?.addEventListener('click', () => this.previousExercise());
    document.getElementById('btnCompleteSet')?.addEventListener('click', () => this.completeSet());
    document.getElementById('btnSkipEx')?.addEventListener('click', () => this.skipExercise());
  }
}

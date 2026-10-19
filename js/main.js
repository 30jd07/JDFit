/**
 * JDFit Main Application Controller
 * Orchestrates UI views, interactive SVG body map, user events, validation, and storage.
 */

import { MUSCLES, EQUIPMENT_OPTIONS, EXERCISES } from './exerciseData.js';
import { generateWorkout } from './workoutEngine.js';
import { calculateOneRepMax, validate1RMInput } from './oneRmCalculator.js';
import { storageManager } from './storage.js';
import { WorkoutPlayer } from './player.js';
import { setupGlobalErrorHandling, escapeHtml } from './utils.js';
import { mountExerciseVisualizer, getExerciseMovementPattern } from './exerciseVisualizer.js';

// Application State
let appState = {
  durationMinutes: 45,
  trainingMode: 'strength',
  difficulty: 'Intermediate',
  selectedMuscles: [],
  selectedEquipment: ['Bodyweight', 'Dumbbell', 'Barbell', 'Cable', 'Machine'],
  viewSide: 'front', // 'front' | 'back'
  currentRoutine: null,
  activePage: 'config' // 'config' | 'results'
};

let workoutPlayer = null;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup global resilience error boundary
  setupGlobalErrorHandling(message => {
    showError(message);
  });

  // 2. Load stored preferences
  const savedPrefs = storageManager.getPreferences();
  appState = {
    ...appState,
    durationMinutes: savedPrefs.durationMinutes || 45,
    trainingMode: savedPrefs.trainingMode || 'strength',
    difficulty: savedPrefs.difficulty || 'Intermediate',
    selectedMuscles: Array.isArray(savedPrefs.selectedMuscles) ? savedPrefs.selectedMuscles : [],
    selectedEquipment: Array.isArray(savedPrefs.selectedEquipment) ? savedPrefs.selectedEquipment : ['Bodyweight']
  };

  // 3. Initialize workout player
  workoutPlayer = new WorkoutPlayer({
    modalElement: document.getElementById('playerModal'),
    bodyElement: document.getElementById('playerBody'),
    footerElement: document.getElementById('playerFooter'),
    timerBadgeElement: document.getElementById('playerTotalTime'),
    titleElement: document.getElementById('playerRoutineTitle'),
    liveRegionElement: document.getElementById('appLiveRegion'),
    onSessionUpdate: routine => {
      appState.currentRoutine = routine;
      storageManager.saveActiveRoutine(routine);
      renderResults();
    }
  });

  // 4. Attach Event Listeners
  bindEvents();

  // 5. Initial Render
  renderConfigUI();

  // 6. Register Service Worker for offline PWA capabilities
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('[JDFit] Service worker registration skipped:', err);
    });
  }
});

// ==========================================
// EVENT BINDINGS
// ==========================================
function bindEvents() {
  // Navigation
  document.getElementById('btnHeaderBack')?.addEventListener('click', () => switchPage('config'));
  document.getElementById('btnResultsBack')?.addEventListener('click', () => switchPage('config'));

  // Duration Buttons
  [30, 45, 60].forEach(mins => {
    document.getElementById(`btnDur${mins}`)?.addEventListener('click', () => {
      setDuration(mins);
    });
  });

  // Training Mode Buttons
  ['strength', 'endurance', 'both', 'cardio'].forEach(mode => {
    document.getElementById(`btnMode${capitalize(mode)}`)?.addEventListener('click', () => {
      setMode(mode);
    });
  });

  // Experience Level Buttons
  ['Beginner', 'Intermediate', 'Advanced'].forEach(lvl => {
    document.getElementById(`btnDiff${lvl}`)?.addEventListener('click', () => {
      setDifficulty(lvl);
    });
  });

  // Muscle View Side Toggles
  document.getElementById('btnViewFront')?.addEventListener('click', () => setViewSide('front'));
  document.getElementById('btnViewBack')?.addEventListener('click', () => setViewSide('back'));

  // Muscle Select/Clear All
  document.getElementById('btnSelectAllMuscles')?.addEventListener('click', selectAllMuscles);
  document.getElementById('btnClearMuscles')?.addEventListener('click', clearMuscles);

  // Equipment Presets
  document.getElementById('btnHomePreset')?.addEventListener('click', setHomeOnlyPreset);
  document.getElementById('btnGymPreset')?.addEventListener('click', setFullGymPreset);

  // Main Generator Action
  document.getElementById('btnGenerateWorkout')?.addEventListener('click', handleGenerateWorkout);

  // Live Workout Player Triggers
  document.getElementById('btnOpenPlayer')?.addEventListener('click', () => {
    if (appState.currentRoutine) workoutPlayer.start(appState.currentRoutine);
  });
  document.getElementById('btnStickyPlay')?.addEventListener('click', () => {
    if (appState.currentRoutine) workoutPlayer.start(appState.currentRoutine);
  });
  document.getElementById('btnClosePlayer')?.addEventListener('click', () => workoutPlayer.close());

  // 1RM Calculator Modal
  document.getElementById('btnOpenCalculator')?.addEventListener('click', openCalculatorModal);
  document.getElementById('btnCloseCalculator')?.addEventListener('click', closeCalculatorModal);
  document.getElementById('calcWeight')?.addEventListener('input', run1RMCalculation);
  document.getElementById('calcReps')?.addEventListener('input', run1RMCalculation);

  // Reset App Data
  document.getElementById('btnResetAppData')?.addEventListener('click', handleResetAppData);
}

// ==========================================
// CONFIGURATION LOGIC & RENDERING
// ==========================================
function setDuration(mins) {
  appState.durationMinutes = mins;
  persistPreferences();
  renderDurationUI();
}

function renderDurationUI() {
  const badge = document.getElementById('durationBadge');
  if (badge) badge.textContent = `${appState.durationMinutes} Mins Total`;

  [30, 45, 60].forEach(mins => {
    const btn = document.getElementById(`btnDur${mins}`);
    if (!btn) return;
    const isSelected = appState.durationMinutes === mins;
    btn.className = isSelected
      ? 'dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
      : 'dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';
    btn.setAttribute('aria-pressed', isSelected.toString());
  });
}

function setMode(mode) {
  appState.trainingMode = mode;
  persistPreferences();
  renderModeUI();
}

function renderModeUI() {
  const descEl = document.getElementById('modeDesc');
  const descriptions = {
    strength: '🎯 <strong>Strength Mode:</strong> Prescribes target <strong>reps</strong> (3–6 reps for resistance, strict high-tension reps for bodyweight) with full neuromuscular recovery.',
    endurance: '⚡ <strong>Endurance Mode:</strong> High metabolic pacing. Bodyweight exercises use <strong>timed minutes</strong> (e.g. 1 min continuous) with short rest.',
    both: '🔥 <strong>Hybrid Mode:</strong> The first half focuses on heavy strength reps, transitioning into timed continuous endurance intervals.',
    cardio: '🫀 <strong>Cardio Mode:</strong> Zero-equipment rapid interval circuit (jumping jacks, squats, burpees, mountain climbers) designed for maximum calorie burn anywhere.'
  };

  if (descEl) descEl.innerHTML = descriptions[appState.trainingMode] || '';

  const equipSection = document.getElementById('equipmentSection');
  if (equipSection) {
    equipSection.style.display = appState.trainingMode === 'cardio' ? 'none' : 'block';
  }

  ['strength', 'endurance', 'both', 'cardio'].forEach(m => {
    const btn = document.getElementById(`btnMode${capitalize(m)}`);
    if (!btn) return;
    const isSelected = appState.trainingMode === m;
    btn.className = isSelected
      ? 'mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
      : 'mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center text-slate-400 hover:text-white';
    btn.setAttribute('aria-pressed', isSelected.toString());
  });
}

function setDifficulty(lvl) {
  appState.difficulty = lvl;
  persistPreferences();
  renderDifficultyUI();
}

function renderDifficultyUI() {
  ['Beginner', 'Intermediate', 'Advanced'].forEach(lvl => {
    const btn = document.getElementById(`btnDiff${lvl}`);
    if (!btn) return;
    const isSelected = appState.difficulty === lvl;
    btn.className = isSelected
      ? 'diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-sm'
      : 'diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white';
    btn.setAttribute('aria-pressed', isSelected.toString());
  });
}

function setViewSide(side) {
  appState.viewSide = side;
  const btnFront = document.getElementById('btnViewFront');
  const btnBack = document.getElementById('btnViewBack');

  if (btnFront) {
    btnFront.className = side === 'front'
      ? 'px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950'
      : 'px-3 py-1 font-semibold text-slate-400 hover:text-white';
  }
  if (btnBack) {
    btnBack.className = side === 'back'
      ? 'px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950'
      : 'px-3 py-1 font-semibold text-slate-400 hover:text-white';
  }

  renderBodySvg();
}

function toggleMuscle(muscleId) {
  if (appState.selectedMuscles.includes(muscleId)) {
    appState.selectedMuscles = appState.selectedMuscles.filter(m => m !== muscleId);
  } else {
    appState.selectedMuscles.push(muscleId);
  }
  persistPreferences();
  updateMuscleUI();
}

function selectAllMuscles() {
  appState.selectedMuscles = Object.keys(MUSCLES);
  persistPreferences();
  updateMuscleUI();
}

function clearMuscles() {
  appState.selectedMuscles = [];
  persistPreferences();
  updateMuscleUI();
}

function updateMuscleUI() {
  const label = document.getElementById('muscleCountLabel');
  if (label) {
    if (appState.selectedMuscles.length === 0) {
      label.textContent = 'No muscles selected — will generate a balanced Full Body session.';
    } else {
      const names = appState.selectedMuscles.map(m => MUSCLES[m]?.name || m).join(', ');
      label.textContent = `${appState.selectedMuscles.length} muscle group${appState.selectedMuscles.length > 1 ? 's' : ''} selected: ${names}`;
    }
  }

  renderBodySvg();
  renderMuscleButtons();
}

function renderMuscleButtons() {
  const grid = document.getElementById('muscleButtonsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.values(MUSCLES).forEach(m => {
    const isSel = appState.selectedMuscles.includes(m.id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-pressed', isSel.toString());
    btn.onclick = () => toggleMuscle(m.id);
    btn.className = `flex items-center gap-2.5 p-2.5 rounded-xl text-left border text-xs transition-all ${
      isSel
        ? 'bg-cyan-950/90 border-cyan-500 text-cyan-200 font-bold ring-1 ring-cyan-500/50'
        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
    }`;

    btn.innerHTML = `
      <div class="w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
        isSel ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
      }">
        ${isSel ? '✓' : ''}
      </div>
      <span class="truncate">${escapeHtml(m.name)}</span>
    `;
    grid.appendChild(btn);
  });
}

function showMuscleHoverBadge(muscleId) {
  const badge = document.getElementById('muscleHoverBadge');
  const nameEl = document.getElementById('muscleHoverName');
  const statusEl = document.getElementById('muscleHoverStatus');
  if (!badge || !nameEl || !statusEl) return;

  const muscle = MUSCLES[muscleId];
  if (!muscle) return;

  nameEl.textContent = muscle.name || muscle.commonName || muscleId;
  const isSelected = appState.selectedMuscles.includes(muscleId);
  const exerciseCount = EXERCISES.filter(
    e => e.primaryMuscles.includes(muscleId) || (e.secondaryMuscles && e.secondaryMuscles.includes(muscleId))
  ).length;

  statusEl.textContent = isSelected ? 'Selected (Tap to remove)' : `${exerciseCount} exercises`;
  badge.classList.remove('hidden');
}

function hideMuscleHoverBadge() {
  const badge = document.getElementById('muscleHoverBadge');
  if (badge) badge.classList.add('hidden');
}

function getMuscleAttrs(muscleId, isSelected) {
  if (isSelected) {
    return 'class="muscle-path muscle-selected" fill="#22d3ee" stroke="#ffffff" stroke-width="2.5" filter="url(#neonGlow)" style="fill: #22d3ee !important; stroke: #ffffff !important; stroke-width: 2.5px !important; filter: drop-shadow(0 0 10px #22d3ee) drop-shadow(0 0 20px rgba(34,211,238,0.9)) !important;"';
  }
  return 'class="muscle-path" fill="#1e293b" stroke="#334155" stroke-width="1.2" style="fill: #1e293b; stroke: #334155; stroke-width: 1.2px;"';
}

function renderBodySvg() {
  const svg = document.getElementById('bodySvg');
  if (!svg) return;
  svg.innerHTML = '';

  const isSel = id => appState.selectedMuscles.includes(id);

  let content = `
    <defs>
      <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feFlood flood-color="#22d3ee" flood-opacity="0.9" result="glowColor"/>
        <feComposite in="glowColor" in2="blur" operator="in" result="glow"/>
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="hoverGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#22d3ee" flood-opacity="0.65"/>
      </filter>
    </defs>
  `;

  if (appState.viewSide === 'front') {
    content += `
      <circle cx="150" cy="44" r="22" class="fill-slate-800/80 stroke-slate-700 pointer-events-none" />

      <!-- Trapezius -->
      <g data-muscle="traps" tabindex="0" role="button" aria-label="Toggle Traps" class="muscle-group ${isSel('traps') ? 'muscle-selected' : ''}">
        <path d="M136 68 L122 84 L140 85 L143 72 Z" ${getMuscleAttrs('traps', isSel('traps'))} />
        <path d="M164 68 L178 84 L160 85 L157 72 Z" ${getMuscleAttrs('traps', isSel('traps'))} />
      </g>

      <!-- Shoulders -->
      <g data-muscle="shoulders" tabindex="0" role="button" aria-label="Toggle Shoulders" class="muscle-group ${isSel('shoulders') ? 'muscle-selected' : ''}">
        <path d="M120 84 C104 88, 92 100, 91 116 C90 126, 96 135, 106 137 C112 126, 118 108, 122 88 Z" ${getMuscleAttrs('shoulders', isSel('shoulders'))} />
        <path d="M180 84 C196 88, 208 100, 209 116 C210 126, 204 135, 194 137 C188 126, 182 108, 178 88 Z" ${getMuscleAttrs('shoulders', isSel('shoulders'))} />
      </g>

      <!-- Chest -->
      <g data-muscle="chest" tabindex="0" role="button" aria-label="Toggle Chest" class="muscle-group ${isSel('chest') ? 'muscle-selected' : ''}">
        <path d="M148 88 L123 88 C115 102, 116 122, 122 136 C134 138, 146 132, 148 122 Z" ${getMuscleAttrs('chest', isSel('chest'))} />
        <path d="M152 88 L177 88 C185 102, 184 122, 178 136 C166 138, 154 132, 152 122 Z" ${getMuscleAttrs('chest', isSel('chest'))} />
      </g>

      <!-- Biceps -->
      <g data-muscle="biceps" tabindex="0" role="button" aria-label="Toggle Biceps" class="muscle-group ${isSel('biceps') ? 'muscle-selected' : ''}">
        <path d="M93 124 C86 138, 88 158, 98 172 C105 168, 108 148, 106 136 Z" ${getMuscleAttrs('biceps', isSel('biceps'))} />
        <path d="M207 124 C214 138, 212 158, 202 172 C195 168, 192 148, 194 136 Z" ${getMuscleAttrs('biceps', isSel('biceps'))} />
      </g>

      <!-- Forearms -->
      <g data-muscle="forearms" tabindex="0" role="button" aria-label="Toggle Forearms" class="muscle-group ${isSel('forearms') ? 'muscle-selected' : ''}">
        <path d="M96 178 C88 195, 78 220, 72 244 C77 246, 84 238, 90 220 C96 205, 101 190, 103 178 Z" ${getMuscleAttrs('forearms', isSel('forearms'))} />
        <path d="M204 178 C212 195, 222 220, 228 244 C223 246, 216 238, 210 220 C204 205, 199 190, 197 178 Z" ${getMuscleAttrs('forearms', isSel('forearms'))} />
      </g>

      <!-- Abs -->
      <g data-muscle="abs" tabindex="0" role="button" aria-label="Toggle Abdominals" class="muscle-group ${isSel('abs') ? 'muscle-selected' : ''}">
        <rect x="135" y="140" width="13" height="15" rx="3" ${getMuscleAttrs('abs', isSel('abs'))} />
        <rect x="152" y="140" width="13" height="15" rx="3" ${getMuscleAttrs('abs', isSel('abs'))} />
        <rect x="135" y="158" width="13" height="16" rx="3" ${getMuscleAttrs('abs', isSel('abs'))} />
        <rect x="152" y="158" width="13" height="16" rx="3" ${getMuscleAttrs('abs', isSel('abs'))} />
        <path d="M135 177 L148 177 L148 206 C143 204, 137 196, 135 186 Z" ${getMuscleAttrs('abs', isSel('abs'))} />
        <path d="M165 177 L152 177 L152 206 C157 204, 163 196, 165 186 Z" ${getMuscleAttrs('abs', isSel('abs'))} />
      </g>

      <!-- Obliques -->
      <g data-muscle="obliques" tabindex="0" role="button" aria-label="Toggle Obliques" class="muscle-group ${isSel('obliques') ? 'muscle-selected' : ''}">
        <path d="M120 144 C116 160, 118 180, 130 196 L131 180 C125 168, 126 154, 130 144 Z" ${getMuscleAttrs('obliques', isSel('obliques'))} />
        <path d="M180 144 C184 160, 182 180, 170 196 L169 180 C175 168, 174 154, 170 144 Z" ${getMuscleAttrs('obliques', isSel('obliques'))} />
      </g>

      <!-- Quadriceps -->
      <g data-muscle="quadriceps" tabindex="0" role="button" aria-label="Toggle Quadriceps" class="muscle-group ${isSel('quadriceps') ? 'muscle-selected' : ''}">
        <path d="M124 216 C112 236, 110 280, 118 335 C125 344, 136 344, 142 334 C148 290, 146 242, 144 216 Z" ${getMuscleAttrs('quadriceps', isSel('quadriceps'))} />
        <path d="M176 216 C188 236, 190 280, 182 335 C175 344, 164 344, 158 334 C152 290, 154 242, 156 216 Z" ${getMuscleAttrs('quadriceps', isSel('quadriceps'))} />
      </g>

      <!-- Calves -->
      <g data-muscle="calves" tabindex="0" role="button" aria-label="Toggle Calves" class="muscle-group ${isSel('calves') ? 'muscle-selected' : ''}">
        <path d="M120 365 C114 390, 114 430, 125 470 L137 470 C143 430, 141 390, 136 365 Z" ${getMuscleAttrs('calves', isSel('calves'))} />
        <path d="M180 365 C186 390, 186 430, 175 470 L163 470 C157 430, 159 390, 164 365 Z" ${getMuscleAttrs('calves', isSel('calves'))} />
      </g>

      <!-- Feet Base -->
      <g class="fill-slate-800/80 stroke-slate-700 stroke-1 pointer-events-none">
        <path d="M120 472 L116 498 L136 498 L136 472 Z" />
        <path d="M180 472 L184 498 L164 498 L164 472 Z" />
      </g>
    `;
  } else {
    content += `
      <circle cx="150" cy="44" r="22" class="fill-slate-800/80 stroke-slate-700 pointer-events-none" />

      <!-- Traps -->
      <g data-muscle="traps" tabindex="0" role="button" aria-label="Toggle Trapezius" class="muscle-group ${isSel('traps') ? 'muscle-selected' : ''}">
        <path d="M150 68 L124 86 L134 122 L150 148 L166 122 L176 86 Z" ${getMuscleAttrs('traps', isSel('traps'))} />
      </g>

      <!-- Rear Deltoids / Shoulders -->
      <g data-muscle="shoulders" tabindex="0" role="button" aria-label="Toggle Shoulders" class="muscle-group ${isSel('shoulders') ? 'muscle-selected' : ''}">
        <path d="M122 86 C105 92, 94 104, 92 118 C92 126, 98 135, 108 137 C113 124, 118 106, 122 86 Z" ${getMuscleAttrs('shoulders', isSel('shoulders'))} />
        <path d="M178 86 C195 92, 206 104, 208 118 C208 126, 202 135, 192 137 C187 124, 182 106, 178 86 Z" ${getMuscleAttrs('shoulders', isSel('shoulders'))} />
      </g>

      <!-- Upper Back / Rhomboids -->
      <g data-muscle="upper_back" tabindex="0" role="button" aria-label="Toggle Upper Back" class="muscle-group ${isSel('upper_back') ? 'muscle-selected' : ''}">
        <path d="M132 104 L120 120 L132 144 L138 128 Z" ${getMuscleAttrs('upper_back', isSel('upper_back'))} />
        <path d="M168 104 L180 120 L168 144 L162 128 Z" ${getMuscleAttrs('upper_back', isSel('upper_back'))} />
      </g>

      <!-- Triceps -->
      <g data-muscle="triceps" tabindex="0" role="button" aria-label="Toggle Triceps" class="muscle-group ${isSel('triceps') ? 'muscle-selected' : ''}">
        <path d="M93 124 C86 138, 88 158, 98 174 C104 168, 108 148, 107 136 Z" ${getMuscleAttrs('triceps', isSel('triceps'))} />
        <path d="M207 124 C214 138, 212 158, 202 174 C196 168, 192 148, 193 136 Z" ${getMuscleAttrs('triceps', isSel('triceps'))} />
      </g>

      <!-- Forearms -->
      <g data-muscle="forearms" tabindex="0" role="button" aria-label="Toggle Forearms" class="muscle-group ${isSel('forearms') ? 'muscle-selected' : ''}">
        <path d="M96 178 C88 195, 78 220, 72 244 C77 246, 84 238, 90 220 C96 205, 101 190, 103 178 Z" ${getMuscleAttrs('forearms', isSel('forearms'))} />
        <path d="M204 178 C212 195, 222 220, 228 244 C223 246, 216 238, 210 220 C204 205, 199 190, 197 178 Z" ${getMuscleAttrs('forearms', isSel('forearms'))} />
      </g>

      <!-- Lats -->
      <g data-muscle="lats" tabindex="0" role="button" aria-label="Toggle Lats" class="muscle-group ${isSel('lats') ? 'muscle-selected' : ''}">
        <path d="M136 132 C120 134, 114 150, 116 174 C120 184, 132 186, 142 184 L146 148 Z" ${getMuscleAttrs('lats', isSel('lats'))} />
        <path d="M164 132 C180 134, 186 150, 184 174 C180 184, 168 186, 158 184 L154 148 Z" ${getMuscleAttrs('lats', isSel('lats'))} />
      </g>

      <!-- Lower Back -->
      <g data-muscle="lower_back" tabindex="0" role="button" aria-label="Toggle Lower Back" class="muscle-group ${isSel('lower_back') ? 'muscle-selected' : ''}">
        <path d="M142 186 L142 214 L148 214 L148 186 Z" ${getMuscleAttrs('lower_back', isSel('lower_back'))} />
        <path d="M152 186 L152 214 L158 214 L158 186 Z" ${getMuscleAttrs('lower_back', isSel('lower_back'))} />
      </g>

      <!-- Glutes -->
      <g data-muscle="glutes" tabindex="0" role="button" aria-label="Toggle Glutes" class="muscle-group ${isSel('glutes') ? 'muscle-selected' : ''}">
        <path d="M149 216 C132 216, 118 226, 116 250 C114 268, 126 280, 148 280 L149 216 Z" ${getMuscleAttrs('glutes', isSel('glutes'))} />
        <path d="M151 216 C168 216, 182 226, 184 250 C186 268, 174 280, 152 280 L151 216 Z" ${getMuscleAttrs('glutes', isSel('glutes'))} />
      </g>

      <!-- Hamstrings -->
      <g data-muscle="hamstrings" tabindex="0" role="button" aria-label="Toggle Hamstrings" class="muscle-group ${isSel('hamstrings') ? 'muscle-selected' : ''}">
        <path d="M120 286 C116 304, 118 334, 124 354 C132 356, 142 354, 144 340 C146 320, 146 300, 146 286 Z" ${getMuscleAttrs('hamstrings', isSel('hamstrings'))} />
        <path d="M180 286 C184 304, 182 334, 176 354 C168 356, 158 354, 156 340 C154 320, 154 300, 154 286 Z" ${getMuscleAttrs('hamstrings', isSel('hamstrings'))} />
      </g>

      <!-- Calves -->
      <g data-muscle="calves" tabindex="0" role="button" aria-label="Toggle Calves" class="muscle-group ${isSel('calves') ? 'muscle-selected' : ''}">
        <path d="M118 368 C112 390, 112 418, 122 444 C128 466, 134 466, 136 444 C144 420, 144 390, 138 368 Z" ${getMuscleAttrs('calves', isSel('calves'))} />
        <path d="M182 368 C188 390, 188 418, 178 444 C172 466, 166 466, 164 444 C156 420, 156 390, 162 368 Z" ${getMuscleAttrs('calves', isSel('calves'))} />
      </g>

      <!-- Feet Base -->
      <g class="fill-slate-800/80 stroke-slate-700 stroke-1 pointer-events-none">
        <path d="M120 472 L116 498 L136 498 L136 472 Z" />
        <path d="M180 472 L184 498 L164 498 L164 472 Z" />
      </g>
    `;
  }

  svg.innerHTML = content;

  // Keyboard, Click, and Hover triggers on SVG elements
  svg.querySelectorAll('[data-muscle]').forEach(el => {
    const muscle = el.getAttribute('data-muscle');
    el.addEventListener('click', () => {
      toggleMuscle(muscle);
      showMuscleHoverBadge(muscle);
    });
    el.addEventListener('mouseenter', () => showMuscleHoverBadge(muscle));
    el.addEventListener('mouseleave', hideMuscleHoverBadge);
    el.addEventListener('focus', () => showMuscleHoverBadge(muscle));
    el.addEventListener('blur', hideMuscleHoverBadge);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMuscle(muscle);
        showMuscleHoverBadge(muscle);
      }
    });
  });
}

function renderEquipmentUI() {
  const grid = document.getElementById('equipmentGrid');
  if (!grid) return;
  grid.innerHTML = '';

  EQUIPMENT_OPTIONS.forEach(opt => {
    const isChecked = appState.selectedEquipment.includes(opt.key);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-pressed', isChecked.toString());
    btn.onclick = () => toggleEquipment(opt.key);
    btn.className = `flex items-start gap-3 p-3 rounded-xl border text-xs text-left transition-all ${
      isChecked
        ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
    }`;

    btn.innerHTML = `
      <div class="w-4 h-4 rounded flex items-center justify-center border shrink-0 mt-0.5 ${
        isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
      }">
        ${isChecked ? '✓' : ''}
      </div>
      <div>
        <span class="block font-bold ${isChecked ? 'text-white' : 'text-slate-300'}">${escapeHtml(opt.label)}</span>
        <span class="text-[11px] text-slate-400 block mt-0.5 leading-tight">${escapeHtml(opt.sub)}</span>
      </div>
    `;
    grid.appendChild(btn);
  });

  const isHomeOnly = appState.selectedEquipment.length === 1 && appState.selectedEquipment[0] === 'Bodyweight';
  const subtitleEl = document.getElementById('equipSubtitle');
  if (subtitleEl) {
    subtitleEl.textContent = isHomeOnly
      ? '🏠 Home Zero-Equipment mode active — no bars, machines, or accessories.'
      : `${appState.selectedEquipment.length} equipment types active.`;
  }

  const btnHome = document.getElementById('btnHomePreset');
  if (btnHome) {
    btnHome.className = isHomeOnly
      ? 'text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-400 bg-emerald-500 text-slate-950 font-bold'
      : 'text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/80 text-emerald-400 hover:bg-slate-800';
  }
}

function toggleEquipment(key) {
  if (appState.selectedEquipment.includes(key)) {
    if (appState.selectedEquipment.length > 1) {
      appState.selectedEquipment = appState.selectedEquipment.filter(k => k !== key);
    } else {
      showError('You must keep at least one equipment option selected.');
      return;
    }
  } else {
    appState.selectedEquipment.push(key);
  }
  persistPreferences();
  renderEquipmentUI();
}

function setHomeOnlyPreset() {
  appState.selectedEquipment = ['Bodyweight'];
  persistPreferences();
  renderEquipmentUI();
}

function setFullGymPreset() {
  appState.selectedEquipment = ['Bodyweight', 'Pull-Up Bar', 'Dumbbell', 'Barbell', 'Cable', 'Machine'];
  persistPreferences();
  renderEquipmentUI();
}

function renderConfigUI() {
  renderDurationUI();
  renderModeUI();
  renderDifficultyUI();
  updateMuscleUI();
  renderEquipmentUI();
}

function persistPreferences() {
  storageManager.savePreferences({
    durationMinutes: appState.durationMinutes,
    trainingMode: appState.trainingMode,
    difficulty: appState.difficulty,
    selectedMuscles: appState.selectedMuscles,
    selectedEquipment: appState.selectedEquipment
  });
}

// ==========================================
// WORKOUT GENERATION & RESULTS VIEW
// ==========================================
function handleGenerateWorkout() {
  clearError();

  try {
    const routine = generateWorkout({
      durationMinutes: appState.durationMinutes,
      selectedMuscles: appState.selectedMuscles,
      selectedEquipment: appState.selectedEquipment,
      difficulty: appState.difficulty,
      trainingMode: appState.trainingMode
    });

    appState.currentRoutine = routine;
    storageManager.saveActiveRoutine(routine);

    renderResults();
    switchPage('results');
  } catch (err) {
    showError(err.message || 'Unable to generate workout with current criteria.');
  }
}

function renderResults() {
  const routine = appState.currentRoutine;
  if (!routine) return;

  const titleEl = document.getElementById('resultsTitle');
  const badgeEl = document.getElementById('resultsMetaBadge');
  const subEl = document.getElementById('resultsSub');
  const countEl = document.getElementById('resultsCountHeader');

  if (titleEl) titleEl.textContent = routine.title;
  if (badgeEl) {
    badgeEl.textContent = `${routine.durationMinutes} MINS · ${routine.difficulty.toUpperCase()} · ${routine.trainingMode.toUpperCase()}`;
  }
  if (subEl) {
    subEl.textContent = `${routine.exercises.length} Exercises · ${routine.durationMinutes} Mins · ${
      appState.selectedEquipment.length === 1 && appState.selectedEquipment[0] === 'Bodyweight'
        ? '100% Home Zero-Equipment'
        : appState.selectedEquipment.join(', ')
    }`;
  }
  if (countEl) {
    countEl.textContent = `Planned Exercise Order (${routine.exercises.length} Exercises)`;
  }

  const container = document.getElementById('exerciseListContainer');
  if (!container) return;
  container.innerHTML = '';

  routine.exercises.forEach((item, idx) => {
    const ex = item.exercise;
    const patternInfo = getExerciseMovementPattern(ex);
    const card = document.createElement('article');
    card.className = 'p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg';

    card.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-start gap-3">
          <span class="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs shrink-0 mt-0.5">
            ${idx + 1}
          </span>
          <div>
            <div class="flex items-center gap-2 text-[11px] font-mono text-cyan-400 flex-wrap">
              <span class="font-bold text-cyan-300">✦ ${escapeHtml(patternInfo.label)}</span>·
              <span>${escapeHtml(ex.equipment)}</span>·
              <span>${escapeHtml(ex.difficulty)}</span>·
              <span class="${item.isTimed ? 'text-emerald-400 font-bold' : 'text-cyan-300 font-bold'}">
                ${item.isTimed ? 'Timed Minutes' : 'Rep Protocol'}
              </span>
            </div>
            <h3 class="text-base font-bold text-white">${escapeHtml(ex.name)}</h3>
            <span class="text-xs text-slate-400">
              Target: ${escapeHtml(ex.primaryMuscles.map(m => MUSCLES[m]?.name || m).join(', '))}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
              ${item.isTimed ? 'Duration' : 'Prescription'}
            </span>
            <div class="text-sm font-black font-mono text-cyan-300">
              ${item.customSets} sets × ${escapeHtml(item.customReps)}
            </div>
          </div>
          <div class="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
              Rest
            </span>
            <div class="text-sm font-bold font-mono text-slate-300">
              ${item.customRestSeconds}s
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-2 flex-wrap">
        <button type="button" id="btnToggleAnim-${idx}" class="text-[11px] font-mono font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 hover:border-cyan-400/60 hover:bg-slate-900 transition-all" aria-expanded="false">
          <span>🎬</span> <span id="toggleAnimText-${idx}">Form Animation Demonstration</span>
        </button>
        <span class="text-[10px] font-mono text-slate-500">${escapeHtml(patternInfo.tempoGuide.split('·')[0])}</span>
      </div>

      <!-- Expandable Animated Visualizer Mount -->
      <div id="visWrapper-${idx}" class="hidden pt-1"></div>

      <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <strong class="text-cyan-300 block mb-0.5">Form Cue:</strong>
        ${escapeHtml(ex.coachingCues[0] || 'Focus on controlled eccentric lowering.')}
      </div>

      <div class="space-y-1.5">
        <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
          Log Completed Sets:
        </span>
        <div class="flex flex-wrap gap-2" id="setsWrapper-${idx}"></div>
      </div>
    `;

    container.appendChild(card);

    // Toggle interactive animation visualizer
    const toggleBtn = document.getElementById(`btnToggleAnim-${idx}`);
    const toggleText = document.getElementById(`toggleAnimText-${idx}`);
    const visWrapper = document.getElementById(`visWrapper-${idx}`);
    let visualizerController = null;

    toggleBtn?.addEventListener('click', () => {
      if (!visWrapper) return;
      const isHidden = visWrapper.classList.contains('hidden');
      if (isHidden) {
        visWrapper.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (toggleText) toggleText.textContent = 'Hide Demonstration';
        if (!visualizerController) {
          visualizerController = mountExerciseVisualizer(ex, visWrapper);
        }
      } else {
        visWrapper.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (toggleText) toggleText.textContent = 'Form Animation Demonstration';
      }
    });

    // Render interactive checkboxes
    const setsWrapper = document.getElementById(`setsWrapper-${idx}`);
    if (setsWrapper) {
      item.completedSets.forEach((done, sIdx) => {
        const setBtn = document.createElement('button');
        setBtn.type = 'button';
        setBtn.setAttribute('aria-pressed', done.toString());
        setBtn.className = `flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
          done
            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
        }`;
        setBtn.innerHTML = `
          <div class="w-3.5 h-3.5 rounded flex items-center justify-center border ${
            done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'
          }">
            ${done ? '✓' : ''}
          </div>
          <span>Set ${sIdx + 1}</span>
        `;
        setBtn.onclick = () => {
          item.completedSets[sIdx] = !item.completedSets[sIdx];
          storageManager.saveActiveRoutine(routine);
          renderResults();
        };
        setsWrapper.appendChild(setBtn);
      });
    }
  });
}

function switchPage(page) {
  appState.activePage = page;
  const configEl = document.getElementById('configPage');
  const resultsEl = document.getElementById('resultsPage');
  const btnBack = document.getElementById('btnHeaderBack');

  if (page === 'config') {
    if (configEl) configEl.classList.remove('hidden');
    if (resultsEl) resultsEl.classList.add('hidden');
    if (btnBack) {
      btnBack.classList.add('hidden');
      btnBack.classList.remove('flex');
    }
  } else {
    if (configEl) configEl.classList.add('hidden');
    if (resultsEl) resultsEl.classList.remove('hidden');
    if (btnBack) {
      btnBack.classList.remove('hidden');
      btnBack.classList.add('flex');
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 1RM CALCULATOR
// ==========================================
function openCalculatorModal() {
  const modal = document.getElementById('calculatorModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    run1RMCalculation();
  }
}

function closeCalculatorModal() {
  const modal = document.getElementById('calculatorModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function run1RMCalculation() {
  const weightInput = document.getElementById('calcWeight');
  const repsInput = document.getElementById('calcReps');
  const resultDisplay = document.getElementById('calc1RMResult');
  const explanationDisplay = document.getElementById('calc1RMExplanation');
  const calcErrorEl = document.getElementById('calcErrorNotice');
  const tableContainer = document.getElementById('calcPercentagesContainer');

  const weight = parseFloat(weightInput?.value);
  const reps = parseInt(repsInput?.value, 10);

  const validation = validate1RMInput(weight, reps);
  if (!validation.isValid) {
    if (calcErrorEl) {
      calcErrorEl.textContent = validation.error;
      calcErrorEl.classList.remove('hidden');
    }
    if (resultDisplay) resultDisplay.textContent = '---';
    if (explanationDisplay) explanationDisplay.textContent = '';
    if (tableContainer) tableContainer.innerHTML = '';
    return;
  }

  if (calcErrorEl) calcErrorEl.classList.add('hidden');

  try {
    const calc = calculateOneRepMax(weight, reps);
    if (resultDisplay) resultDisplay.textContent = `${calc.average} lbs`;
    if (explanationDisplay) explanationDisplay.textContent = calc.formulaExplanation;

    if (tableContainer) {
      tableContainer.innerHTML = `
        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
          ${calc.percentages
            .map(
              p => `
            <div class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span class="text-[10px] font-mono text-cyan-400 block font-bold">${p.percent}% (${p.targetReps})</span>
              <span class="text-sm font-black font-mono text-white">${p.load} lbs</span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }
  } catch (err) {
    if (calcErrorEl) {
      calcErrorEl.textContent = err.message;
      calcErrorEl.classList.remove('hidden');
    }
  }
}

// ==========================================
// APP DATA RESET & ERROR HANDLING
// ==========================================
function handleResetAppData() {
  const confirmed = window.confirm('Reset all saved JDFit preferences and active workouts to factory defaults?');
  if (confirmed) {
    storageManager.clearAllData();
    window.location.reload();
  }
}

function showError(message) {
  const alertEl = document.getElementById('globalAlertBox');
  const alertMsg = document.getElementById('globalAlertMessage');
  if (alertEl && alertMsg) {
    alertMsg.textContent = message;
    alertEl.classList.remove('hidden');
    alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function clearError() {
  const alertEl = document.getElementById('globalAlertBox');
  if (alertEl) alertEl.classList.add('hidden');
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

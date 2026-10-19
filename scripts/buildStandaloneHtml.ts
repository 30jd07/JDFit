import fs from 'fs';
import path from 'path';
import { EXERCISES } from '../src/data/exercises';
import { MUSCLES } from '../src/data/muscles';

const exercisesJson = JSON.stringify(EXERCISES);
const musclesJson = JSON.stringify(MUSCLES);

const html = `<!doctype html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JDFit by Jaydeep — Interactive Muscle Map & Workout Generator</title>
  <meta name="description" content="Personalized interactive front and back anatomical muscle selector and custom workout routine generator by Jaydeep." />
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['Outfit', 'sans-serif'],
            body: ['"Plus Jakarta Sans"', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #020617; color: #f8fafc; }
    h1, h2, h3, h4, .font-display { font-family: 'Outfit', sans-serif; }
    .muscle-path { cursor: pointer; transition: fill 0.2s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s cubic-bezier(0.16, 1, 0.3, 1); fill: #1e293b; stroke: #334155; stroke-width: 1.2px; }
    .muscle-group { cursor: pointer; outline: none; }
    .muscle-group:hover .muscle-path, .muscle-path:hover, .muscle-group:focus-visible .muscle-path, .muscle-path:focus-visible { fill: #0891b2 !important; stroke: #67e8f9 !important; stroke-width: 1.8px !important; filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) !important; }
    .muscle-selected .muscle-path, .muscle-path.muscle-selected, g.muscle-selected path, g.muscle-selected rect { fill: #22d3ee !important; stroke: #ffffff !important; stroke-width: 2.5px !important; filter: drop-shadow(0 0 10px #22d3ee) drop-shadow(0 0 20px rgba(34, 211, 238, 0.9)) !important; }
  </style>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">

  <!-- Header -->
  <header class="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xs tracking-tighter shadow-md shadow-cyan-500/20">
          JD
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-lg font-extrabold tracking-tight text-white font-display">
            JDFit
          </span>
          <span class="text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.5 rounded-md">
            by Jaydeep
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          onclick="openCalculator()"
          class="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <span>🧮 1RM Calculator</span>
        </button>

        <button
          id="btnHeaderBack"
          type="button"
          onclick="goToConfig()"
          class="hidden items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
        >
          <span>← Change Options</span>
        </button>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- PAGE 1: WORKOUT CONFIGURATOR (TIME, BODY PARTS, MODE, LEVEL, MACHINES)     -->
  <!-- ========================================================================= -->
  <main id="configPage" class="max-w-3xl mx-auto px-4 py-8 flex-1 w-full space-y-7">
    
    <div class="text-center space-y-1.5">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white font-display">
        Generate Your Workout
      </h1>
      <p class="text-xs sm:text-sm text-slate-400">
        Engineered by Jaydeep. Select your session duration, body parts, mode, and equipment.
      </p>
    </div>

    <div class="space-y-6">
      
      <!-- 1. DURATION -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
            <span>Session Time Duration</span>
          </h2>
          <span id="durationBadge" class="text-xs font-mono font-bold text-cyan-300">45 Mins Total</span>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <button type="button" onclick="setDuration(30)" id="btnDur30" class="dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700">
            <span class="text-base sm:text-lg font-black font-display block">30 mins</span>
            <span class="text-[10px] font-mono text-slate-400 block">4 Focused Exercises</span>
          </button>
          <button type="button" onclick="setDuration(45)" id="btnDur45" class="dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20">
            <span class="text-base sm:text-lg font-black font-display block">45 mins</span>
            <span class="text-[10px] font-mono font-bold text-slate-950 block">6 Standard Exercises</span>
          </button>
          <button type="button" onclick="setDuration(60)" id="btnDur60" class="dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700">
            <span class="text-base sm:text-lg font-black font-display block">60 mins</span>
            <span class="text-[10px] font-mono text-slate-400 block">8 Complete Exercises</span>
          </button>
        </div>
      </div>

      <!-- 2. TRAINING MODE -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
        <h2 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
          <span>Training Mode</span>
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button type="button" onclick="setMode('strength')" id="btnModeStrength" class="mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20">
            Strength
          </button>
          <button type="button" onclick="setMode('endurance')" id="btnModeEndurance" class="mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center text-slate-400 hover:text-white">
            Endurance
          </button>
          <button type="button" onclick="setMode('both')" id="btnModeBoth" class="mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center text-slate-400 hover:text-white">
            Both (Hybrid)
          </button>
          <button type="button" onclick="setMode('cardio')" id="btnModeCardio" class="mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center text-slate-400 hover:text-white">
            Cardio (Bodyweight)
          </button>
        </div>

        <div id="modeDesc" class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300 leading-relaxed">
          🎯 <strong>Strength Mode:</strong> Prescribes specific <strong>reps</strong> (3–6 reps for weights, strict reps for bodyweight) with full rest.
        </div>
      </div>

      <!-- 3. TARGET BODY PARTS -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">3</span>
              <span>Target Body Parts</span>
            </h2>
            <p id="muscleCountLabel" class="text-xs text-slate-400 mt-0.5">
              No muscles selected — will generate a balanced Full Body session.
            </p>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button type="button" onclick="selectAllMuscles()" class="text-xs text-cyan-400 hover:text-cyan-300 font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60">
              Select All
            </button>
            <button type="button" onclick="clearMuscles()" class="text-xs text-slate-400 hover:text-slate-200 font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60">
              Clear All
            </button>
          </div>
        </div>

        <!-- Body Diagram -->
        <div class="flex flex-col items-center">
          <div class="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg mb-3 text-xs">
            <button id="btnViewFront" onclick="setViewSide('front')" class="px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950">Anterior (Front)</button>
            <button id="btnViewBack" onclick="setViewSide('back')" class="px-3 py-1 font-semibold text-slate-400 hover:text-white">Posterior (Back)</button>
          </div>

          <div class="relative w-full max-w-[280px] aspect-[300/520] flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 shadow-xl">
            <svg id="bodySvg" viewBox="0 0 300 520" class="w-full h-full select-none"></svg>
          </div>
        </div>

        <!-- Muscle Buttons Grid -->
        <div class="pt-2 border-t border-slate-800/80">
          <span class="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
            Quick Select Muscles (Tap to toggle):
          </span>
          <div id="muscleButtonsGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-2"></div>
        </div>
      </div>

      <!-- 4. EXPERIENCE LEVEL -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
        <h2 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">4</span>
          <span>Experience Level</span>
        </h2>
        <div class="grid grid-cols-3 gap-2.5">
          <button type="button" onclick="setDifficulty('Beginner')" id="btnDiffBeginner" class="diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white">Beginner</button>
          <button type="button" onclick="setDifficulty('Intermediate')" id="btnDiffIntermediate" class="diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-sm">Intermediate</button>
          <button type="button" onclick="setDifficulty('Advanced')" id="btnDiffAdvanced" class="diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white">Advanced</button>
        </div>
      </div>

      <!-- 5. EQUIPMENT -->
      <div id="equipmentSection" class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">5</span>
              <span>Available Equipment & Machines</span>
            </h2>
            <p id="equipSubtitle" class="text-xs text-slate-400 mt-0.5">5 equipment types active.</p>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button type="button" onclick="setHomeOnly()" id="btnHomePreset" class="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/80 text-emerald-400 hover:bg-slate-800">
              🏠 Home (Zero Equip)
            </button>
            <button type="button" onclick="setGymAll()" class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300">
              🏋️ Full Gym (All)
            </button>
          </div>
        </div>

        <div id="equipmentGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"></div>
      </div>

      <!-- GENERATE CTA -->
      <div class="pt-2">
        <button
          type="button"
          onclick="generateWorkout()"
          class="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>✨ Generate Workout Routine</span>
        </button>
      </div>

    </div>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE 2: GENERATED WORKOUT RESULTS & STEP-BY-STEP PLAYER                   -->
  <!-- ========================================================================= -->
  <main id="resultsPage" class="hidden max-w-4xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
    <div class="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span id="resultsMetaBadge" class="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold"></span>
        </div>
        <h1 id="resultsTitle" class="text-xl sm:text-2xl font-black text-white font-display"></h1>
        <p id="resultsSub" class="text-xs text-slate-400 mt-1"></p>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <button type="button" onclick="goToConfig()" class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors">
          Edit Options
        </button>
        <button type="button" onclick="openPlayer()" class="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <span>▶ Play Workout</span>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <h2 id="resultsCountHeader" class="text-sm font-bold text-slate-300 uppercase tracking-wider px-1">Planned Exercise Order</h2>
      <div id="exerciseListContainer" class="space-y-4"></div>
    </div>

    <div class="sticky bottom-4 z-30">
      <button
        type="button"
        onclick="openPlayer()"
        class="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <span>▶ Start Guided Workout Player</span>
      </button>
    </div>
  </main>

  <!-- LIVE GUIDED WORKOUT PLAYER MODAL -->
  <div id="playerModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
    <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[95vh]" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <div>
            <span class="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-bold">Live Workout Player</span>
            <h2 id="playerRoutineTitle" class="text-sm font-bold text-white truncate max-w-xs">JDFit Routine</h2>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-300">
            <span>⏱️ </span><span id="playerTotalTime">0:00</span>
          </div>
          <button type="button" onclick="closePlayer()" class="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">✕</button>
        </div>
      </div>

      <div id="playerBody" class="overflow-y-auto p-5 sm:p-6 space-y-5"></div>
      <div id="playerFooter" class="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3"></div>
    </div>
  </div>

  <!-- 1RM CALCULATOR MODAL -->
  <div id="calculatorModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
    <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span>🧮 One-Rep Max Calculator</span>
        </h3>
        <button type="button" onclick="closeCalculator()" class="text-slate-400 hover:text-white">✕</button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-xs text-slate-400 block mb-1">Weight Lifted (lbs / kg):</label>
          <input type="number" id="calcWeight" value="185" min="1" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white focus:outline-none focus:border-cyan-400" oninput="calculate1RM()">
        </div>
        <div>
          <label class="text-xs text-slate-400 block mb-1">Reps Completed (1-12):</label>
          <input type="number" id="calcReps" value="6" min="1" max="15" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white focus:outline-none focus:border-cyan-400" oninput="calculate1RM()">
        </div>

        <div class="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-center space-y-1">
          <span class="text-[10px] uppercase font-mono text-cyan-300 block font-semibold">Estimated 1RM</span>
          <span id="calc1RMResult" class="text-3xl font-black font-mono text-white">222 lbs</span>
          <span class="text-[11px] text-slate-400 block">Based on Brzycki & Epley strength formulas</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
    <p>© 2026 JDFit · Engineered by Jaydeep · Interactive Anatomical Workout Engine</p>
  </footer>

  <!-- Core JavaScript -->
  <script>
    const EXERCISES = ${exercisesJson};
    const MUSCLES = ${musclesJson};

    // State
    let durationMinutes = 45;
    let trainingMode = 'strength';
    let difficulty = 'Intermediate';
    let viewSide = 'front';
    let selectedMuscles = [];
    let selectedEquipment = ['Bodyweight', 'Dumbbell', 'Barbell', 'Cable', 'Machine'];
    let routine = null;

    // Player state
    let playerExIdx = 0;
    let playerSetIdx = 0;
    let playerPhase = 'exercise'; // 'exercise' | 'rest' | 'finished'
    let playerSecondsRemaining = 60;
    let playerIsPaused = false;
    let totalWorkoutSeconds = 0;
    let stopwatchTimer = null;
    let countdownTimer = null;

    // Audio chime synthesis
    let audioCtx = null;
    function playChime() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.85);
      } catch (e) {}
    }

    const allEquipmentList = [
      { key: 'Bodyweight', label: 'Bodyweight (Zero Equipment / At-Home)', sub: 'Floor & zero accessories — 100% home friendly' },
      { key: 'Pull-Up Bar', label: 'Pull-Up Bar & Dip Station', sub: 'Calisthenics fixtures (uncheck for pure zero-equipment home)' },
      { key: 'Dumbbell', label: 'Dumbbells', sub: 'Adjustable or fixed hex dumbbells' },
      { key: 'Barbell', label: 'Barbell & Rack', sub: 'Olympic barbell, bench, and squat rack' },
      { key: 'Cable', label: 'Cable Machine', sub: 'Dual adjustable pulleys & cables' },
      { key: 'Machine', label: 'Gym Machines', sub: 'Plate-loaded & selectorized machines' }
    ];

    function setDuration(d) {
      durationMinutes = d;
      document.getElementById('durationBadge').textContent = d + ' Mins Total';
      [30, 45, 60].forEach(mins => {
        const btn = document.getElementById('btnDur' + mins);
        if (mins === d) {
          btn.className = 'dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20';
          btn.children[1].className = 'text-[10px] font-mono font-bold text-slate-950 block';
        } else {
          btn.className = 'dur-btn py-3.5 px-3 rounded-2xl text-center border transition-all bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';
          btn.children[1].className = 'text-[10px] font-mono text-slate-400 block';
        }
      });
    }

    function setMode(m) {
      trainingMode = m;
      ['strength', 'endurance', 'both', 'cardio'].forEach(mode => {
        const btn = document.getElementById('btnMode' + mode.charAt(0).toUpperCase() + mode.slice(1));
        if (btn) {
          btn.className = mode === m
            ? 'mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
            : 'mode-btn py-3 px-2 rounded-xl text-xs font-bold transition-all text-center text-slate-400 hover:text-white';
        }
      });

      const descMap = {
        strength: '🎯 <strong>Strength Mode:</strong> Prescribes specific <strong>reps</strong> (3–6 reps for weights, strict reps for bodyweight) with full rest.',
        endurance: '⏱️ <strong>Endurance Mode:</strong> Prescribes <strong>exact minutes for bodyweight</strong> (1 minute continuous timed sets) and high reps for weights.',
        both: '⚡ <strong>Both Modes (Hybrid):</strong> Combines heavy strength reps on primary compound exercises with timed minutes on bodyweight/finishers.',
        cardio: '🔥 <strong>Free Bodyweight Cardio:</strong> High-intensity interval movements (Jumping Jacks, Mountain Climbers, Burpees, High Knees, Skater Hops) timed in minutes with zero equipment.'
      };
      document.getElementById('modeDesc').innerHTML = descMap[m] || '';
      document.getElementById('equipmentSection').style.display = m === 'cardio' ? 'none' : 'block';
    }

    function setDifficulty(lvl) {
      difficulty = lvl;
      ['Beginner', 'Intermediate', 'Advanced'].forEach(l => {
        const btn = document.getElementById('btnDiff' + l);
        if (l === lvl) {
          btn.className = 'diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-sm';
        } else {
          btn.className = 'diff-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white';
        }
      });
    }

    function toggleMuscle(m) {
      if (selectedMuscles.includes(m)) {
        selectedMuscles = selectedMuscles.filter(x => x !== m);
      } else {
        selectedMuscles.push(m);
      }
      updateMuscleUI();
    }

    function selectAllMuscles() {
      selectedMuscles = Object.keys(MUSCLES);
      updateMuscleUI();
    }

    function clearMuscles() {
      selectedMuscles = [];
      updateMuscleUI();
    }

    function setViewSide(side) {
      viewSide = side;
      document.getElementById('btnViewFront').className = side === 'front'
        ? 'px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950'
        : 'px-3 py-1 font-semibold text-slate-400 hover:text-white';
      document.getElementById('btnViewBack').className = side === 'back'
        ? 'px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950'
        : 'px-3 py-1 font-semibold text-slate-400 hover:text-white';
      renderBodySvg();
    }

    function updateMuscleUI() {
      const label = document.getElementById('muscleCountLabel');
      if (selectedMuscles.length === 0) {
        label.textContent = 'No muscles selected — will generate a balanced Full Body session.';
      } else {
        label.textContent = selectedMuscles.length + ' muscle group' + (selectedMuscles.length > 1 ? 's' : '') + ' selected: ' + selectedMuscles.map(m => MUSCLES[m]?.name || m).join(', ');
      }
      renderBodySvg();
      renderMuscleButtons();
    }

    function renderMuscleButtons() {
      const grid = document.getElementById('muscleButtonsGrid');
      grid.innerHTML = '';
      Object.values(MUSCLES).forEach(m => {
        const isSel = selectedMuscles.includes(m.id);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.onclick = () => toggleMuscle(m.id);
        btn.className = 'flex items-center gap-2.5 p-2.5 rounded-xl text-left border text-xs transition-all ' +
          (isSel ? 'bg-cyan-950/90 border-cyan-500 text-cyan-200 font-bold ring-1 ring-cyan-500/50' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300');
        btn.innerHTML = '<div class="w-4 h-4 rounded flex items-center justify-center border shrink-0 ' +
          (isSel ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700') + '">' +
          (isSel ? '✓' : '') + '</div><span class="truncate">' + m.name + '</span>';
        grid.appendChild(btn);
      });
    }

    function renderBodySvg() {
      const svg = document.getElementById('bodySvg');
      svg.innerHTML = '';

      if (viewSide === 'front') {
        svg.innerHTML = \`
          <circle cx="150" cy="44" r="22" class="fill-slate-800 stroke-slate-700" />
          <path d="M120 84 C104 88, 92 100, 91 116 C90 126, 96 135, 106 137 C112 126, 118 108, 122 88 Z" data-muscle="shoulders" class="muscle-path \${selectedMuscles.includes('shoulders') ? 'muscle-selected' : ''}" />
          <path d="M180 84 C196 88, 208 100, 209 116 C210 126, 204 135, 194 137 C188 126, 182 108, 178 88 Z" data-muscle="shoulders" class="muscle-path \${selectedMuscles.includes('shoulders') ? 'muscle-selected' : ''}" />
          <path d="M148 88 L123 88 C115 102, 116 122, 122 136 C134 138, 146 132, 148 122 Z" data-muscle="chest" class="muscle-path \${selectedMuscles.includes('chest') ? 'muscle-selected' : ''}" />
          <path d="M152 88 L177 88 C185 102, 184 122, 178 136 C166 138, 154 132, 152 122 Z" data-muscle="chest" class="muscle-path \${selectedMuscles.includes('chest') ? 'muscle-selected' : ''}" />
          <path d="M93 124 C86 138, 88 158, 98 172 C105 168, 108 148, 106 136 Z" data-muscle="biceps" class="muscle-path \${selectedMuscles.includes('biceps') ? 'muscle-selected' : ''}" />
          <path d="M207 124 C214 138, 212 158, 202 172 C195 168, 192 148, 194 136 Z" data-muscle="biceps" class="muscle-path \${selectedMuscles.includes('biceps') ? 'muscle-selected' : ''}" />
          <rect x="135" y="140" width="30" height="40" rx="4" data-muscle="abs" class="muscle-path \${selectedMuscles.includes('abs') ? 'muscle-selected' : ''}" />
          <path d="M124 216 C112 236, 110 280, 118 335 C125 344, 136 344, 142 334 C148 290, 146 242, 144 216 Z" data-muscle="quadriceps" class="muscle-path \${selectedMuscles.includes('quadriceps') ? 'muscle-selected' : ''}" />
          <path d="M176 216 C188 236, 190 280, 182 335 C175 344, 164 344, 158 334 C152 290, 154 242, 156 216 Z" data-muscle="quadriceps" class="muscle-path \${selectedMuscles.includes('quadriceps') ? 'muscle-selected' : ''}" />
          <path d="M120 365 C114 390, 114 430, 125 470 L137 470 C143 430, 141 390, 136 365 Z" data-muscle="calves" class="muscle-path \${selectedMuscles.includes('calves') ? 'muscle-selected' : ''}" />
          <path d="M180 365 C186 390, 186 430, 175 470 L163 470 C157 430, 159 390, 164 365 Z" data-muscle="calves" class="muscle-path \${selectedMuscles.includes('calves') ? 'muscle-selected' : ''}" />
        \`;
      } else {
        svg.innerHTML = \`
          <circle cx="150" cy="44" r="22" class="fill-slate-800 stroke-slate-700" />
          <path d="M150 68 L124 86 L134 122 L150 148 L166 122 L176 86 Z" data-muscle="traps" class="muscle-path \${selectedMuscles.includes('traps') ? 'muscle-selected' : ''}" />
          <path d="M136 132 C120 134, 114 150, 116 174 C120 184, 132 186, 142 184 L146 148 Z" data-muscle="lats" class="muscle-path \${selectedMuscles.includes('lats') ? 'muscle-selected' : ''}" />
          <path d="M164 132 C180 134, 186 150, 184 174 C180 184, 168 186, 158 184 L154 148 Z" data-muscle="lats" class="muscle-path \${selectedMuscles.includes('lats') ? 'muscle-selected' : ''}" />
          <path d="M93 124 C86 138, 88 158, 98 174 C104 168, 108 148, 107 136 Z" data-muscle="triceps" class="muscle-path \${selectedMuscles.includes('triceps') ? 'muscle-selected' : ''}" />
          <path d="M207 124 C214 138, 212 158, 202 174 C196 168, 192 148, 193 136 Z" data-muscle="triceps" class="muscle-path \${selectedMuscles.includes('triceps') ? 'muscle-selected' : ''}" />
          <path d="M149 216 C132 216, 118 226, 116 250 C114 268, 126 280, 148 280 L149 216 Z" data-muscle="glutes" class="muscle-path \${selectedMuscles.includes('glutes') ? 'muscle-selected' : ''}" />
          <path d="M151 216 C168 216, 182 226, 184 250 C186 268, 174 280, 152 280 L151 216 Z" data-muscle="glutes" class="muscle-path \${selectedMuscles.includes('glutes') ? 'muscle-selected' : ''}" />
          <path d="M120 286 C116 304, 118 334, 124 354 C132 356, 142 354, 144 340 C146 320, 146 300, 146 286 Z" data-muscle="hamstrings" class="muscle-path \${selectedMuscles.includes('hamstrings') ? 'muscle-selected' : ''}" />
          <path d="M180 286 C184 304, 182 334, 176 354 C168 356, 158 354, 156 340 C154 320, 154 300, 154 286 Z" data-muscle="hamstrings" class="muscle-path \${selectedMuscles.includes('hamstrings') ? 'muscle-selected' : ''}" />
          <path d="M118 368 C112 390, 112 418, 122 444 C128 466, 134 466, 136 444 C144 420, 144 390, 138 368 Z" data-muscle="calves" class="muscle-path \${selectedMuscles.includes('calves') ? 'muscle-selected' : ''}" />
          <path d="M182 368 C188 390, 188 418, 178 444 C172 466, 166 466, 164 444 C156 420, 156 390, 162 368 Z" data-muscle="calves" class="muscle-path \${selectedMuscles.includes('calves') ? 'muscle-selected' : ''}" />
        \`;
      }

      svg.querySelectorAll('[data-muscle]').forEach(el => {
        el.onclick = () => toggleMuscle(el.getAttribute('data-muscle'));
      });
    }

    function renderEquipmentGrid() {
      const grid = document.getElementById('equipmentGrid');
      grid.innerHTML = '';
      allEquipmentList.forEach(opt => {
        const isChecked = selectedEquipment.includes(opt.key);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.onclick = () => toggleEquipment(opt.key);
        btn.className = 'flex items-start gap-3 p-3 rounded-xl border text-xs text-left transition-all ' +
          (isChecked ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200' : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200');
        btn.innerHTML = '<div class="w-4 h-4 rounded flex items-center justify-center border shrink-0 mt-0.5 ' +
          (isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700') + '">' +
          (isChecked ? '✓' : '') + '</div><div><span class="block font-bold ' +
          (isChecked ? 'text-white' : 'text-slate-300') + '">' + opt.label + '</span><span class="text-[11px] text-slate-400 block mt-0.5 leading-tight">' + opt.sub + '</span></div>';
        grid.appendChild(btn);
      });

      const isHomeOnly = selectedEquipment.length === 1 && selectedEquipment[0] === 'Bodyweight';
      document.getElementById('equipSubtitle').textContent = isHomeOnly
        ? '🏠 Home Zero-Equipment mode active — no bars, machines, or accessories.'
        : selectedEquipment.length + ' equipment types active.';
      document.getElementById('btnHomePreset').className = isHomeOnly
        ? 'text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-400 bg-emerald-500 text-slate-950 font-bold'
        : 'text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/80 text-emerald-400 hover:bg-slate-800';
    }

    function toggleEquipment(eq) {
      if (selectedEquipment.includes(eq)) {
        if (selectedEquipment.length > 1) selectedEquipment = selectedEquipment.filter(e => e !== eq);
      } else {
        selectedEquipment.push(eq);
      }
      renderEquipmentGrid();
    }

    function setHomeOnly() {
      selectedEquipment = ['Bodyweight'];
      renderEquipmentGrid();
    }

    function setGymAll() {
      selectedEquipment = ['Bodyweight', 'Pull-Up Bar', 'Dumbbell', 'Barbell', 'Cable', 'Machine'];
      renderEquipmentGrid();
    }

    function generateWorkout() {
      const targetCount = durationMinutes === 30 ? 4 : durationMinutes === 45 ? 6 : 8;

      const matchesEquipment = (ex) => {
        if (!selectedEquipment.includes(ex.equipment)) return false;
        if (ex.requiresBarOrFixture && !selectedEquipment.includes('Pull-Up Bar')) return false;
        return true;
      };

      let chosen = [];
      if (trainingMode === 'cardio') {
        const pool = EXERCISES.filter(ex => (ex.isCardio || ex.equipment === 'Bodyweight') && matchesEquipment(ex));
        chosen = [...pool].sort(() => 0.5 - Math.random()).slice(0, targetCount);
      } else {
        const primary = EXERCISES.filter(ex => {
          if (!matchesEquipment(ex)) return false;
          if (selectedMuscles.length > 0) {
            return ex.primaryMuscles.some(m => selectedMuscles.includes(m)) || ex.secondaryMuscles.some(m => selectedMuscles.includes(m));
          }
          return true;
        });

        const byDiff = primary.filter(ex => ex.difficulty === difficulty);
        let pool = byDiff.length >= targetCount ? byDiff : primary;

        if (pool.length < targetCount) {
          const fallback = EXERCISES.filter(ex => matchesEquipment(ex) && !pool.some(p => p.id === ex.id));
          pool = [...pool, ...fallback];
        }

        chosen = pool.sort((a,b) => (a.mechanics === 'Compound' ? -1 : 1)).slice(0, targetCount);
      }

      if (chosen.length === 0) {
        chosen = EXERCISES.filter(matchesEquipment).slice(0, targetCount);
      }

      const setsPerEx = durationMinutes === 30 ? 3 : durationMinutes === 45 ? 3 : 4;
      const isHomeOnly = selectedEquipment.length === 1 && selectedEquipment[0] === 'Bodyweight';
      const muscleTitle = selectedMuscles.length > 0 ? selectedMuscles.map(m => MUSCLES[m]?.name || m).join(' & ') : 'Full Body';

      routine = {
        title: trainingMode === 'cardio' ? durationMinutes + '-Min At-Home HIIT Cardio Circuit' : durationMinutes + '-Min ' + muscleTitle + (isHomeOnly ? ' (Home)' : '') + ' Routine',
        meta: durationMinutes + ' MINS · ' + difficulty.toUpperCase() + ' · ' + trainingMode.toUpperCase(),
        sub: chosen.length + ' Exercises · ' + durationMinutes + ' Mins · ' + (isHomeOnly ? '100% Home Zero-Equipment' : selectedEquipment.join(', ')),
        durationMinutes: durationMinutes,
        exercises: chosen.map((ex, idx) => {
          let isTimed = false;
          let repText = '';
          let durationSec = undefined;
          let restSec = 60;

          if (trainingMode === 'cardio') {
            isTimed = true;
            repText = '1 min timed set';
            durationSec = 60;
            restSec = 25;
          } else if (trainingMode === 'endurance') {
            if (ex.equipment === 'Bodyweight') {
              isTimed = true;
              repText = '1 min continuous';
              durationSec = 60;
              restSec = 30;
            } else {
              repText = ex.goalProtocols.endurance?.reps || '15-20 reps';
              restSec = 45;
            }
          } else if (trainingMode === 'both') {
            if (idx < Math.ceil(chosen.length / 2)) {
              repText = ex.goalProtocols.strength?.reps || '5-6 reps';
              restSec = 90;
            } else {
              if (ex.equipment === 'Bodyweight') {
                isTimed = true;
                repText = '1 min timed';
                durationSec = 60;
                restSec = 40;
              } else {
                repText = ex.goalProtocols.endurance?.reps || '15-20 reps';
                restSec = 45;
              }
            }
          } else {
            repText = ex.equipment === 'Bodyweight' ? (ex.goalProtocols.strength?.reps || '12-15 strict reps') : (ex.goalProtocols.strength?.reps || '4-6 reps');
            restSec = 90;
          }

          return {
            exercise: ex,
            sets: setsPerEx,
            reps: repText,
            isTimed: isTimed,
            durationSeconds: durationSec,
            restSeconds: restSec,
            completedSets: new Array(setsPerEx).fill(false)
          };
        })
      };

      renderResults();
      document.getElementById('configPage').classList.add('hidden');
      document.getElementById('resultsPage').classList.remove('hidden');
      document.getElementById('btnHeaderBack').classList.remove('hidden');
      document.getElementById('btnHeaderBack').classList.add('flex');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function goToConfig() {
      document.getElementById('resultsPage').classList.add('hidden');
      document.getElementById('configPage').classList.remove('hidden');
      document.getElementById('btnHeaderBack').classList.add('hidden');
      document.getElementById('btnHeaderBack').classList.remove('flex');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderResults() {
      if (!routine) return;
      document.getElementById('resultsTitle').textContent = routine.title;
      document.getElementById('resultsMetaBadge').textContent = routine.meta;
      document.getElementById('resultsSub').textContent = routine.sub;
      document.getElementById('resultsCountHeader').textContent = 'Planned Exercise Order (' + routine.exercises.length + ' Exercises)';

      const container = document.getElementById('exerciseListContainer');
      container.innerHTML = '';

      routine.exercises.forEach((item, idx) => {
        const ex = item.exercise;
        const card = document.createElement('div');
        card.className = 'p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4';
        card.innerHTML = \`
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-start gap-3">
              <span class="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs shrink-0 mt-0.5">\${idx + 1}</span>
              <div>
                <div class="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                  <span>\${ex.equipment}</span>·<span>\${ex.difficulty}</span>·<span class="\${item.isTimed ? 'text-emerald-400 font-bold' : 'text-cyan-300 font-bold'}">\${item.isTimed ? 'Timed Minutes' : 'Rep Protocol'}</span>
                </div>
                <h3 class="text-base font-bold text-white">\${ex.name}</h3>
                <span class="text-xs text-slate-400">Target: \${ex.primaryMuscles.map(m => MUSCLES[m]?.name || m).join(', ')}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">\${item.isTimed ? 'Duration' : 'Prescription'}</span>
                <div class="text-sm font-black font-mono text-cyan-300">\${item.sets} sets × \${item.reps}</div>
              </div>
              <div class="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Rest</span>
                <div class="text-sm font-bold font-mono text-slate-300">\${item.restSeconds}s</div>
              </div>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong class="text-cyan-300 block mb-0.5">Form Cue:</strong> \${ex.coachingCues[0] || ''}
          </div>
          <div class="space-y-1.5">
            <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Log Completed Sets:</span>
            <div class="flex flex-wrap gap-2" id="setsWrapper-\${idx}">
              \${item.completedSets.map((done, sIdx) => \`
                <button type="button" onclick="toggleSet(\${idx}, \${sIdx})" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all \${done ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}">
                  <div class="w-3.5 h-3.5 rounded flex items-center justify-center border \${done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'}">\${done ? '✓' : ''}</div>
                  <span>Set \${sIdx + 1}</span>
                </button>
              \`).join('')}
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function toggleSet(exIdx, setIdx) {
      if (!routine) return;
      routine.exercises[exIdx].completedSets[setIdx] = !routine.exercises[exIdx].completedSets[setIdx];
      renderResults();
    }

    // Workout Player Logic
    function openPlayer() {
      if (!routine || routine.exercises.length === 0) return;
      document.getElementById('playerModal').classList.remove('hidden');
      playerExIdx = 0;
      playerSetIdx = 0;
      playerPhase = 'exercise';
      playerIsPaused = false;
      totalWorkoutSeconds = 0;
      setupPlayerPhase('exercise', 0, 0);
      startStopwatch();
    }

    function closePlayer() {
      document.getElementById('playerModal').classList.add('hidden');
      clearInterval(stopwatchTimer);
      clearInterval(countdownTimer);
    }

    function setupPlayerPhase(phase, exIdx, setIdx) {
      playerPhase = phase;
      const item = routine.exercises[exIdx];
      if (!item) {
        playerPhase = 'finished';
        playChime();
        renderPlayerUI();
        return;
      }

      if (phase === 'exercise') {
        playerSecondsRemaining = item.isTimed && item.durationSeconds ? item.durationSeconds : 0;
      } else if (phase === 'rest') {
        playerSecondsRemaining = item.restSeconds || 60;
      }
      renderPlayerUI();
      startCountdown();
    }

    function startStopwatch() {
      clearInterval(stopwatchTimer);
      stopwatchTimer = setInterval(() => {
        if (!playerIsPaused && playerPhase !== 'finished') {
          totalWorkoutSeconds++;
          const mins = Math.floor(totalWorkoutSeconds / 60);
          const secs = (totalWorkoutSeconds % 60).toString().padStart(2, '0');
          document.getElementById('playerTotalTime').textContent = mins + ':' + secs;
        }
      }, 1000);
    }

    function startCountdown() {
      clearInterval(countdownTimer);
      const shouldTick = (playerPhase === 'rest' || (playerPhase === 'exercise' && routine.exercises[playerExIdx]?.isTimed));
      if (shouldTick && playerSecondsRemaining > 0) {
        countdownTimer = setInterval(() => {
          if (!playerIsPaused) {
            playerSecondsRemaining--;
            if (playerSecondsRemaining <= 0) {
              clearInterval(countdownTimer);
              playChime();
              if (playerPhase === 'exercise') {
                completePlayerSet();
              } else if (playerPhase === 'rest') {
                skipRest();
              }
            } else {
              renderPlayerCountdown();
            }
          }
        }, 1000);
      }
    }

    function completePlayerSet() {
      const item = routine.exercises[playerExIdx];
      if (!item) return;
      playChime();
      item.completedSets[playerSetIdx] = true;

      const isLastSet = playerSetIdx >= item.sets - 1;
      const isLastEx = playerExIdx >= routine.exercises.length - 1;

      if (isLastSet && isLastEx) {
        playerPhase = 'finished';
        renderPlayerUI();
        return;
      }

      setupPlayerPhase('rest', playerExIdx, playerSetIdx);
    }

    function skipRest() {
      const item = routine.exercises[playerExIdx];
      const isLastSet = playerSetIdx >= item.sets - 1;
      if (isLastSet) {
        playerExIdx++;
        playerSetIdx = 0;
        setupPlayerPhase('exercise', playerExIdx, 0);
      } else {
        playerSetIdx++;
        setupPlayerPhase('exercise', playerExIdx, playerSetIdx);
      }
    }

    function renderPlayerUI() {
      const body = document.getElementById('playerBody');
      const footer = document.getElementById('playerFooter');
      const item = routine.exercises[playerExIdx];

      if (playerPhase === 'finished') {
        body.innerHTML = \`
          <div class="p-8 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl mx-auto">🎉</div>
            <h3 class="text-2xl font-black text-white">Workout Session Complete!</h3>
            <p class="text-xs text-slate-400">Great job! You crushed every set in \${document.getElementById('playerTotalTime').textContent}.</p>
          </div>
        \`;
        footer.innerHTML = '<button type="button" onclick="closePlayer()" class="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">Return to Workout Plan</button>';
        return;
      }

      if (playerPhase === 'rest') {
        const mins = Math.floor(playerSecondsRemaining / 60);
        const secs = (playerSecondsRemaining % 60).toString().padStart(2, '0');
        body.innerHTML = \`
          <div class="p-8 rounded-3xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-4">
            <span class="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold">Rest Period Active</span>
            <div class="text-6xl font-black font-mono text-white tabular-nums" id="playerCountdownDisplay">\${mins}:\${secs}</div>
            <p class="text-xs text-slate-400">Catch your breath before next set</p>
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" onclick="playerSecondsRemaining = Math.max(5, playerSecondsRemaining - 15); renderPlayerCountdown();" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono">-15s</button>
              <button type="button" onclick="playerSecondsRemaining += 15; renderPlayerCountdown();" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono">+15s</button>
              <button type="button" onclick="skipRest()" class="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">Skip Rest ➔</button>
            </div>
          </div>
        \`;
        footer.innerHTML = '';
        return;
      }

      // Exercise phase
      const ex = item.exercise;
      const mins = Math.floor(playerSecondsRemaining / 60);
      const secs = (playerSecondsRemaining % 60).toString().padStart(2, '0');

      body.innerHTML = \`
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
          <span>Exercise <strong class="text-white">\${playerExIdx + 1}</strong> of <strong class="text-white">\${routine.exercises.length}</strong></span>
          <span class="text-cyan-300 font-bold font-mono">Set \${playerSetIdx + 1} of \${item.sets}</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <div class="text-[11px] text-cyan-400 font-mono">\${ex.equipment} · \${ex.mechanics}</div>
              <h3 class="text-lg font-bold text-white">\${ex.name}</h3>
            </div>
            <div class="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-center">
              <span class="text-[10px] uppercase font-mono text-cyan-400 block font-semibold">\${item.isTimed ? 'Timed' : 'Target'}</span>
              <span class="text-lg font-black font-mono text-white">\${item.reps}</span>
            </div>
          </div>
          <div class="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
            <strong>Key Cue:</strong> \${ex.coachingCues[0] || ''}
          </div>
          \${item.isTimed ? \`
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-[10px] uppercase font-mono text-slate-400 block">Time Remaining</span>
                <span class="text-2xl font-black font-mono text-white tabular-nums" id="playerCountdownDisplay">\${mins}:\${secs}</span>
              </div>
              <button type="button" onclick="playerSecondsRemaining = item.durationSeconds || 60; renderPlayerCountdown();" class="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300">Reset Timer</button>
            </div>
          \` : ''}
        </div>
      \`;

      footer.innerHTML = \`
        <button type="button" onclick="if (playerExIdx > 0) { playerExIdx--; playerSetIdx = 0; setupPlayerPhase('exercise', playerExIdx, 0); }" class="p-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold \${playerExIdx === 0 ? 'opacity-30 pointer-events-none' : ''}">Previous</button>
        <button type="button" onclick="completePlayerSet()" class="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20">Complete Set ✓</button>
        <button type="button" onclick="if (playerExIdx < routine.exercises.length - 1) { playerExIdx++; playerSetIdx = 0; setupPlayerPhase('exercise', playerExIdx, 0); }" class="p-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">Skip Ex</button>
      \`;
    }

    function renderPlayerCountdown() {
      const el = document.getElementById('playerCountdownDisplay');
      if (el) {
        const mins = Math.floor(playerSecondsRemaining / 60);
        const secs = (playerSecondsRemaining % 60).toString().padStart(2, '0');
        el.textContent = mins + ':' + secs;
      }
    }

    // Calculator logic
    function openCalculator() { document.getElementById('calculatorModal').classList.remove('hidden'); calculate1RM(); }
    function closeCalculator() { document.getElementById('calculatorModal').classList.add('hidden'); }
    function calculate1RM() {
      const w = parseFloat(document.getElementById('calcWeight').value) || 0;
      const r = parseInt(document.getElementById('calcReps').value) || 1;
      const brzycki = r === 1 ? w : w * (36 / (37 - r));
      const epley = r === 1 ? w : w * (1 + 0.0333 * r);
      const avg = Math.round((brzycki + epley) / 2);
      document.getElementById('calc1RMResult').textContent = avg + ' lbs';
    }

    // Init
    renderEquipmentGrid();
    updateMuscleUI();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve(process.cwd(), 'jdfit.html'), html, 'utf8');
console.log('Successfully generated jdfit.html');

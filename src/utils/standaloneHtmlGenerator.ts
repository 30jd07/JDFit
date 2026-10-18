import { WorkoutRoutine } from '../types/fitness';
import { EXERCISES } from '../data/exercises';
import { MUSCLES } from '../data/muscles';

/**
 * Generates a self-contained, standalone single-file HTML application.
 * Users can double-click and run this immediately in any browser without npm or a build step!
 */
export function generateStandaloneHtml(currentRoutine?: WorkoutRoutine): string {
  const exercisesJson = JSON.stringify(EXERCISES);
  const musclesJson = JSON.stringify(MUSCLES);
  const routineJson = currentRoutine ? JSON.stringify(currentRoutine) : 'null';

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JDFit by Jaydeep — Interactive Muscle Map & Workout Generator</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              cyan: '#06b6d4',
              slate: '#0f172a'
            }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #030712; color: #f3f4f6; }
    h1, h2, h3, .font-display { font-family: 'Outfit', sans-serif; }
    .muscle-hover:hover { fill: #06b6d4; cursor: pointer; transition: all 0.2s; }
    .muscle-active { fill: #22d3ee !important; filter: drop-shadow(0 0 8px rgba(34,211,238,0.8)); }
  </style>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 flex flex-col">

  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xs tracking-tighter">JD</div>
        <div class="flex items-center gap-1.5">
          <span className="text-lg font-bold font-display text-white">JDFit</span>
          <span class="text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.5 rounded-md">by Jaydeep</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button id="btnBuildRoutine" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20">
          Build My Workout
        </button>
      </div>
    </div>
  </header>

  <!-- Main App Layout -->
  <main class="max-w-7xl mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
    
    <!-- Left Column: Anatomical Body Map -->
    <div class="lg:col-span-5 flex flex-col items-center">
      <div class="w-full max-w-sm bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
        
        <div class="flex items-center justify-between w-full mb-4">
          <h2 class="text-sm font-bold text-white uppercase tracking-wider">Interactive Body Map</h2>
          <div class="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button id="btnViewFront" class="px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950">Front</button>
            <button id="btnViewBack" class="px-3 py-1 font-semibold text-slate-400 hover:text-white">Back</button>
          </div>
        </div>

        <!-- SVG Map Container -->
        <div class="relative w-full aspect-[300/520] flex items-center justify-center">
          <svg id="bodySvg" viewBox="0 0 300 520" class="w-full h-full">
            <!-- Rendered by JS -->
          </svg>
        </div>

        <div id="selectedMuscleBanner" class="w-full mt-4 p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-cyan-300 block" id="selectedMuscleName">All Target Muscles</span>
            <span class="text-[11px] text-slate-400" id="selectedMuscleCount">60+ exercises available</span>
          </div>
          <button id="btnClearFilter" class="text-xs text-slate-400 hover:text-white font-medium">Reset</button>
        </div>
      </div>
    </div>

    <!-- Right Column: Exercises & Filters -->
    <div class="lg:col-span-7 flex flex-col space-y-4">
      <!-- Search & Filters -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <input id="searchInput" type="text" placeholder="Search exercises (e.g., bench, squat, bicep)..." class="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500">
        <select id="equipmentFilter" class="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none">
          <option value="all">All Equipment</option>
          <option value="Barbell">Barbell</option>
          <option value="Dumbbell">Dumbbell</option>
          <option value="Cable">Cable</option>
          <option value="Machine">Machine</option>
          <option value="Bodyweight">Bodyweight</option>
        </select>
      </div>

      <!-- Exercise Cards Grid -->
      <div id="exerciseGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Rendered by JS -->
      </div>
    </div>

  </main>

  <footer class="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
    © 2026 JDFit · Engineered by Jaydeep · Standalone Edition
  </footer>

  <script>
    const EXERCISES = ${exercisesJson};
    const MUSCLES = ${musclesJson};
    let activeSide = 'front';
    let selectedMuscle = null;
    let searchQuery = '';
    let selectedEquipment = 'all';

    function renderExercises() {
      const grid = document.getElementById('exerciseGrid');
      grid.innerHTML = '';

      const filtered = EXERCISES.filter(ex => {
        const matchesMuscle = !selectedMuscle || ex.primaryMuscles.includes(selectedMuscle) || ex.secondaryMuscles.includes(selectedMuscle);
        const matchesEquip = selectedEquipment === 'all' || ex.equipment === selectedEquipment;
        const matchesSearch = !searchQuery || ex.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesMuscle && matchesEquip && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-span-2 p-8 text-center text-slate-400 text-xs">No matching exercises found. Try selecting another muscle or clearing filters.</div>';
        return;
      }

      filtered.forEach(ex => {
        const card = document.createElement('div');
        card.className = 'p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3';
        card.innerHTML = \`
          <div>
            <div class="flex items-center justify-between text-[11px] mb-1">
              <span class="text-cyan-400 font-mono">\${ex.equipment}</span>
              <span class="text-slate-400">\${ex.difficulty}</span>
            </div>
            <h4 class="text-sm font-bold text-white">\${ex.name}</h4>
            <div class="flex flex-wrap gap-1 mt-2">
              \${ex.primaryMuscles.map(m => '<span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-semibold">' + (MUSCLES[m]?.name || m) + '</span>').join('')}
            </div>
            <p class="text-xs text-slate-400 mt-2 line-clamp-2">\${ex.coachingCues[0] || ''}</p>
          </div>
          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <span>\${ex.goalProtocols.hypertrophy.sets} sets × \${ex.goalProtocols.hypertrophy.reps} reps</span>
            <span class="text-cyan-400 font-mono">\${ex.goalProtocols.hypertrophy.restSeconds}s rest</span>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    function renderBodyMap() {
      const svg = document.getElementById('bodySvg');
      svg.innerHTML = '';

      if (activeSide === 'front') {
        svg.innerHTML = \`
          <circle cx="150" cy="44" r="22" class="fill-slate-800 stroke-slate-700" />
          <path d="M120 84 C104 88, 92 100, 91 116 C90 126, 96 135, 106 137 C112 126, 118 108, 122 88 Z" data-muscle="shoulders" class="muscle-hover \${selectedMuscle === 'shoulders' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M180 84 C196 88, 208 100, 209 116 C210 126, 204 135, 194 137 C188 126, 182 108, 178 88 Z" data-muscle="shoulders" class="muscle-hover \${selectedMuscle === 'shoulders' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M148 88 L123 88 C115 102, 116 122, 122 136 C134 138, 146 132, 148 122 Z" data-muscle="chest" class="muscle-hover \${selectedMuscle === 'chest' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M152 88 L177 88 C185 102, 184 122, 178 136 C166 138, 154 132, 152 122 Z" data-muscle="chest" class="muscle-hover \${selectedMuscle === 'chest' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M93 124 C86 138, 88 158, 98 172 C105 168, 108 148, 106 136 Z" data-muscle="biceps" class="muscle-hover \${selectedMuscle === 'biceps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M207 124 C214 138, 212 158, 202 172 C195 168, 192 148, 194 136 Z" data-muscle="biceps" class="muscle-hover \${selectedMuscle === 'biceps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <rect x="135" y="140" width="30" height="40" rx="4" data-muscle="abs" class="muscle-hover \${selectedMuscle === 'abs' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M124 216 C112 236, 110 280, 118 335 C125 344, 136 344, 142 334 C148 290, 146 242, 144 216 Z" data-muscle="quadriceps" class="muscle-hover \${selectedMuscle === 'quadriceps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M176 216 C188 236, 190 280, 182 335 C175 344, 164 344, 158 334 C152 290, 154 242, 156 216 Z" data-muscle="quadriceps" class="muscle-hover \${selectedMuscle === 'quadriceps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M120 365 C114 390, 114 430, 125 470 L137 470 C143 430, 141 390, 136 365 Z" data-muscle="calves" class="muscle-hover \${selectedMuscle === 'calves' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M180 365 C186 390, 186 430, 175 470 L163 470 C157 430, 159 390, 164 365 Z" data-muscle="calves" class="muscle-hover \${selectedMuscle === 'calves' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
        \`;
      } else {
        svg.innerHTML = \`
          <circle cx="150" cy="44" r="22" class="fill-slate-800 stroke-slate-700" />
          <path d="M150 68 L124 86 L134 122 L150 148 L166 122 L176 86 Z" data-muscle="traps" class="muscle-hover \${selectedMuscle === 'traps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M136 132 C120 134, 114 150, 116 174 C120 184, 132 186, 142 184 L146 148 Z" data-muscle="lats" class="muscle-hover \${selectedMuscle === 'lats' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M164 132 C180 134, 186 150, 184 174 C180 184, 168 186, 158 184 L154 148 Z" data-muscle="lats" class="muscle-hover \${selectedMuscle === 'lats' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M93 124 C86 138, 88 158, 98 174 C104 168, 108 148, 107 136 Z" data-muscle="triceps" class="muscle-hover \${selectedMuscle === 'triceps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M207 124 C214 138, 212 158, 202 174 C196 168, 192 148, 193 136 Z" data-muscle="triceps" class="muscle-hover \${selectedMuscle === 'triceps' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M149 216 C132 216, 118 226, 116 250 C114 268, 126 280, 148 280 L149 216 Z" data-muscle="glutes" class="muscle-hover \${selectedMuscle === 'glutes' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M151 216 C168 216, 182 226, 184 250 C186 268, 174 280, 152 280 L151 216 Z" data-muscle="glutes" class="muscle-hover \${selectedMuscle === 'glutes' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M120 286 C116 304, 118 334, 124 354 C132 356, 142 354, 144 340 C146 320, 146 300, 146 286 Z" data-muscle="hamstrings" class="muscle-hover \${selectedMuscle === 'hamstrings' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M180 286 C184 304, 182 334, 176 354 C168 356, 158 354, 156 340 C154 320, 154 300, 154 286 Z" data-muscle="hamstrings" class="muscle-hover \${selectedMuscle === 'hamstrings' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M118 368 C112 390, 112 418, 122 444 C128 466, 134 466, 136 444 C144 420, 144 390, 138 368 Z" data-muscle="calves" class="muscle-hover \${selectedMuscle === 'calves' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
          <path d="M182 368 C188 390, 188 418, 178 444 C172 466, 166 466, 164 444 C156 420, 156 390, 162 368 Z" data-muscle="calves" class="muscle-hover \${selectedMuscle === 'calves' ? 'muscle-active' : 'fill-slate-800 stroke-slate-700'}" />
        \`;
      }

      // Add click listeners to muscle paths
      svg.querySelectorAll('[data-muscle]').forEach(el => {
        el.addEventListener('click', () => {
          const m = el.getAttribute('data-muscle');
          selectedMuscle = selectedMuscle === m ? null : m;
          updateBanner();
          renderBodyMap();
          renderExercises();
        });
      });
    }

    function updateBanner() {
      const banner = document.getElementById('selectedMuscleName');
      const count = document.getElementById('selectedMuscleCount');
      if (selectedMuscle && MUSCLES[selectedMuscle]) {
        banner.textContent = MUSCLES[selectedMuscle].name;
        const c = EXERCISES.filter(e => e.primaryMuscles.includes(selectedMuscle)).length;
        count.textContent = c + ' targeted exercises';
      } else {
        banner.textContent = 'All Target Muscles';
        count.textContent = EXERCISES.length + ' exercises available';
      }
    }

    // Event Bindings
    document.getElementById('btnViewFront').onclick = () => {
      activeSide = 'front';
      document.getElementById('btnViewFront').className = 'px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950';
      document.getElementById('btnViewBack').className = 'px-3 py-1 font-semibold text-slate-400 hover:text-white';
      renderBodyMap();
    };

    document.getElementById('btnViewBack').onclick = () => {
      activeSide = 'back';
      document.getElementById('btnViewBack').className = 'px-3 py-1 font-semibold rounded bg-cyan-500 text-slate-950';
      document.getElementById('btnViewFront').className = 'px-3 py-1 font-semibold text-slate-400 hover:text-white';
      renderBodyMap();
    };

    document.getElementById('btnClearFilter').onclick = () => {
      selectedMuscle = null;
      updateBanner();
      renderBodyMap();
      renderExercises();
    };

    document.getElementById('searchInput').oninput = (e) => {
      searchQuery = e.target.value;
      renderExercises();
    };

    document.getElementById('equipmentFilter').onchange = (e) => {
      selectedEquipment = e.target.value;
      renderExercises();
    };

    // Initialize
    renderBodyMap();
    renderExercises();
  </script>
</body>
</html>`;
}

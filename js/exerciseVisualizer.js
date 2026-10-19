/**
 * JDFit Exercise Biomechanical Visualizer & Movement Pattern Engine
 * Categorizes exercises into movement patterns (Push, Pull, Squat, Hinge, Core, Cardio)
 * and renders lightweight, vector-sharp animated SVG demonstrations with phase breakdowns.
 */

// =========================================================================
// 1. MOVEMENT PATTERNS CATALOG & METADATA
// =========================================================================
export const MOVEMENT_PATTERNS = {
  push: {
    id: 'push',
    label: 'Upper Body Push',
    subPatterns: ['Horizontal Press', 'Vertical Press', 'Chest Isolation', 'Tricep Extension'],
    description: 'Pressing mechanics engaging pectorals, anterior deltoids, and triceps brachii.',
    primaryMuscles: ['chest', 'shoulders', 'triceps'],
    jointActions: 'Shoulder flexion/horizontal adduction & elbow extension',
    tempoGuide: '3-1-1 Tempo · 3s controlled lowering, 1s pause, explosive drive',
    breathingGuide: 'Inhale on descent · Exhale forcefully through sticking point',
    accentColor: '#22d3ee', // Cyan
    glowFilter: 'neonGlow'
  },
  pull: {
    id: 'pull',
    label: 'Upper Body Pull',
    subPatterns: ['Vertical Traction', 'Horizontal Row', 'Scapular Retraction', 'Bicep Flexion'],
    description: 'Traction mechanics engaging latissimus dorsi, rhomboids, rear deltoids, and biceps.',
    primaryMuscles: ['lats', 'upper_back', 'traps', 'biceps', 'forearms'],
    jointActions: 'Scapular retraction, shoulder extension/adduction & elbow flexion',
    tempoGuide: '2-1-2 Tempo · 2s pull, 1s peak squeeze, 2s eccentric control',
    breathingGuide: 'Inhale to brace ribcage · Exhale as you drive elbows back/down',
    accentColor: '#38bdf8', // Sky Blue
    glowFilter: 'neonGlow'
  },
  squat: {
    id: 'squat',
    label: 'Knee-Dominant Lower Body',
    subPatterns: ['Bilateral Squat', 'Unilateral Lunge', 'Machine Press', 'Plantarflexion'],
    description: 'Knee-dominant flexion mechanics engaging quadriceps, glutes, and gastrocnemius.',
    primaryMuscles: ['quadriceps', 'glutes', 'calves'],
    jointActions: 'Simultaneous knee flexion/extension & hip flexion/extension',
    tempoGuide: '3-1-1 Tempo · 3s descent below parallel, 1s pause, drive through mid-foot',
    breathingGuide: 'Deep diaphragmatic inhale at top · Hold descent · Exhale ascending',
    accentColor: '#10b981', // Emerald
    glowFilter: 'neonGlow'
  },
  hinge: {
    id: 'hinge',
    label: 'Hip-Dominant Posterior Chain',
    subPatterns: ['Conventional Hinge', 'Romanian Deadlift', 'Supine Hip Thrust'],
    description: 'Pelvic hip-hinge mechanics engaging hamstrings, gluteus maximus, and spinal erectors.',
    primaryMuscles: ['hamstrings', 'glutes', 'lower_back'],
    jointActions: 'Hip flexion with minimal knee flexion & powerful hip extension',
    tempoGuide: '3-1-1 Tempo · 3s hinge push back, 1s hamstring stretch, snap hips forward',
    breathingGuide: 'Brace abdominal wall prior to hinge · Exhale as hips lock out',
    accentColor: '#f59e0b', // Amber
    glowFilter: 'neonGlow'
  },
  core: {
    id: 'core',
    label: 'Trunk & Core Stabilization',
    subPatterns: ['Anti-Extension Hold', 'Dynamic Rotation', 'Spinal Flexion'],
    description: 'Anti-extension, anti-rotation, and intra-abdominal stabilization mechanics.',
    primaryMuscles: ['abs', 'obliques', 'lower_back'],
    jointActions: 'Isometric lumbar stabilization & controlled thoracic articulation',
    tempoGuide: 'Continuous Tension · Isometric holds with active hollow-body bracing',
    breathingGuide: 'Maintain intra-abdominal pressure · Breathe rhythmically through pursed lips',
    accentColor: '#ec4899', // Pink
    glowFilter: 'neonGlow'
  },
  cardio: {
    id: 'cardio',
    label: 'High-Cadence Conditioning',
    subPatterns: ['Plyometric Circuit', 'Full-Body Interval'],
    description: 'Multi-joint explosive intervals maximizing cardiovascular output and VO2 kinetics.',
    primaryMuscles: ['quadriceps', 'calves', 'abs', 'chest'],
    jointActions: 'Multi-joint triple extension & rapid rhythmic cadence',
    tempoGuide: 'Explosive Continuous Pacing · Max cadence with disciplined form',
    breathingGuide: 'Synchronized 2-count rhythmic breathing',
    accentColor: '#eab308', // Yellow
    glowFilter: 'neonGlow'
  }
};

// =========================================================================
// 2. EXERCISE TO MOVEMENT PATTERN MAPPING TABLE
// =========================================================================
const EXERCISE_PATTERN_MAP = {
  // Push exercises
  'barbell-bench-press': { pattern: 'push', subType: 'Horizontal Press', animKey: 'bench_press' },
  'incline-dumbbell-press': { pattern: 'push', subType: 'Incline Press', animKey: 'incline_bench' },
  'pushup-classic': { pattern: 'push', subType: 'Horizontal Floor Push', animKey: 'pushup' },
  'wide-pushups': { pattern: 'push', subType: 'Horizontal Floor Push (Chest Bias)', animKey: 'pushup' },
  'diamond-pushups': { pattern: 'push', subType: 'Close-Grip Tricep Push', animKey: 'pushup_diamond' },
  'cable-chest-fly': { pattern: 'push', subType: 'Chest Isolation Arc', animKey: 'chest_fly' },
  'dips-chest-focus': { pattern: 'push', subType: 'Vertical Parallel Dip', animKey: 'dip' },
  'overhead-barbell-press': { pattern: 'push', subType: 'Vertical Overhead Press', animKey: 'overhead_press' },
  'dumbbell-lateral-raise': { pattern: 'push', subType: 'Shoulder Abduction', animKey: 'lateral_raise' },
  'pike-pushups': { pattern: 'push', subType: 'Inverted Shoulder Push', animKey: 'pike_pushup' },
  'cable-tricep-pushdown': { pattern: 'push', subType: 'Elbow Extension', animKey: 'tricep_pushdown' },
  'overhead-dumbbell-tricep-extension': { pattern: 'push', subType: 'Overhead Tricep Extension', animKey: 'overhead_tricep' },

  // Pull exercises
  'lat-pulldown': { pattern: 'pull', subType: 'Vertical Traction', animKey: 'lat_pulldown' },
  'pullups': { pattern: 'pull', subType: 'Vertical Bodyweight Pull', animKey: 'pullup' },
  'superman-pull': { pattern: 'pull', subType: 'Prone Scapular Retraction', animKey: 'superman' },
  'doorframe-rows': { pattern: 'pull', subType: 'Horizontal Bodyweight Row', animKey: 'bent_over_row' },
  'bent-over-barbell-row': { pattern: 'pull', subType: 'Horizontal Barbell Row', animKey: 'bent_over_row' },
  'seated-cable-row': { pattern: 'pull', subType: 'Horizontal Cable Row', animKey: 'seated_cable_row' },
  'face-pull': { pattern: 'pull', subType: 'Rear Delt & Rotator Cuff Row', animKey: 'face_pull' },
  'barbell-bicep-curl': { pattern: 'pull', subType: 'Elbow Flexion', animKey: 'bicep_curl' },
  'hammer-curl': { pattern: 'pull', subType: 'Neutral-Grip Bicep Curl', animKey: 'hammer_curl' },

  // Squat exercises
  'barbell-back-squat': { pattern: 'squat', subType: 'Bilateral Squat', animKey: 'squat' },
  'air-squats': { pattern: 'squat', subType: 'Bodyweight Bilateral Squat', animKey: 'squat' },
  'dumbbell-walking-lunges': { pattern: 'squat', subType: 'Unilateral Dynamic Lunge', animKey: 'lunges' },
  'leg-press': { pattern: 'squat', subType: '45-Degree Machine Sled Press', animKey: 'leg_press' },
  'standing-calf-raise': { pattern: 'squat', subType: 'Ankle Plantarflexion', animKey: 'calf_raise' },

  // Hinge exercises
  'barbell-deadlift': { pattern: 'hinge', subType: 'Conventional Floor Deadlift', animKey: 'deadlift' },
  'romanian-deadlift': { pattern: 'hinge', subType: 'Hip Hinge (RDL)', animKey: 'rdl' },
  'glute-bridges': { pattern: 'hinge', subType: 'Supine Hip Extension', animKey: 'glute_bridge' },
  'hip-thrust': { pattern: 'hinge', subType: 'Barbell Glute Hip Thrust', animKey: 'hip_thrust' },

  // Core exercises
  'plank-classic': { pattern: 'core', subType: 'Anti-Extension Isometric Hold', animKey: 'plank' },
  'hanging-leg-raise': { pattern: 'core', subType: 'Vertical Pelvic Tuck', animKey: 'hanging_leg_raise' },
  'bicycle-crunches': { pattern: 'core', subType: 'Thoracic Rotational Flexion', animKey: 'bicycle_crunch' },
  'cable-woodchopper': { pattern: 'core', subType: 'Rotational Diagonal Power', animKey: 'woodchopper' },
  'mountain-climbers': { pattern: 'core', subType: 'Dynamic Core Knee Drive', animKey: 'mountain_climber' },

  // Cardio intervals
  'jumping-jacks': { pattern: 'cardio', subType: 'Full-Body Plyometric', animKey: 'jumping_jacks' },
  'burpees': { pattern: 'cardio', subType: 'High-Intensity Calisthenic Chain', animKey: 'burpee' }
};

/**
 * Returns movement pattern categorization and metadata for an exercise.
 * @param {object|string} exercise - Exercise object or exercise ID
 * @returns {object} Pattern metadata, sub-pattern, and animKey
 */
export function getExerciseMovementPattern(exercise) {
  const exId = typeof exercise === 'string' ? exercise : exercise?.id;
  const exObj = typeof exercise === 'object' ? exercise : null;

  if (exId && EXERCISE_PATTERN_MAP[exId]) {
    const entry = EXERCISE_PATTERN_MAP[exId];
    const patternMeta = MOVEMENT_PATTERNS[entry.pattern];
    return {
      pattern: entry.pattern,
      subType: entry.subType,
      animKey: entry.animKey,
      label: patternMeta.label,
      description: patternMeta.description,
      primaryMuscles: patternMeta.primaryMuscles,
      jointActions: patternMeta.jointActions,
      tempoGuide: patternMeta.tempoGuide,
      breathingGuide: patternMeta.breathingGuide,
      accentColor: patternMeta.accentColor
    };
  }

  // Fallback heuristics based on mechanics / primaryMuscles / animationType
  let patternKey = 'push';
  let subType = 'Compound Movement';
  let animKey = exObj?.animationType || 'squat';

  if (exObj?.animationType) {
    const at = exObj.animationType;
    if (['bench_press', 'incline_bench', 'pushup', 'dip', 'chest_fly', 'overhead_press', 'lateral_raise', 'tricep_pushdown', 'overhead_tricep'].includes(at)) {
      patternKey = 'push';
      animKey = at;
    } else if (['lat_pulldown', 'pullup', 'superman', 'bent_over_row', 'seated_cable_row', 'face_pull', 'bicep_curl', 'hammer_curl'].includes(at)) {
      patternKey = 'pull';
      animKey = at;
    } else if (['squat', 'lunges', 'leg_press', 'calf_raise'].includes(at)) {
      patternKey = 'squat';
      animKey = at;
    } else if (['deadlift', 'rdl', 'glute_bridge', 'hip_thrust'].includes(at)) {
      patternKey = 'hinge';
      animKey = at;
    } else if (['plank', 'hanging_leg_raise', 'bicycle_crunch', 'woodchopper', 'mountain_climber'].includes(at)) {
      patternKey = 'core';
      animKey = at;
    } else if (['jumping_jacks', 'burpee'].includes(at)) {
      patternKey = 'cardio';
      animKey = at;
    }
  } else if (exObj?.primaryMuscles) {
    const muscles = exObj.primaryMuscles;
    if (muscles.includes('chest') || muscles.includes('shoulders') || muscles.includes('triceps')) {
      patternKey = 'push';
      animKey = 'bench_press';
    } else if (muscles.includes('lats') || muscles.includes('upper_back') || muscles.includes('biceps')) {
      patternKey = 'pull';
      animKey = 'pullup';
    } else if (muscles.includes('quadriceps') || muscles.includes('calves')) {
      patternKey = 'squat';
      animKey = 'squat';
    } else if (muscles.includes('hamstrings') || muscles.includes('glutes') || muscles.includes('lower_back')) {
      patternKey = 'hinge';
      animKey = 'deadlift';
    } else if (muscles.includes('abs') || muscles.includes('obliques')) {
      patternKey = 'core';
      animKey = 'plank';
    }
  }

  const patternMeta = MOVEMENT_PATTERNS[patternKey] || MOVEMENT_PATTERNS.push;

  return {
    pattern: patternKey,
    subType: subType || patternMeta.subPatterns[0],
    animKey: animKey,
    label: patternMeta.label,
    description: patternMeta.description,
    primaryMuscles: patternMeta.primaryMuscles,
    jointActions: patternMeta.jointActions,
    tempoGuide: patternMeta.tempoGuide,
    breathingGuide: patternMeta.breathingGuide,
    accentColor: patternMeta.accentColor
  };
}

// =========================================================================
// 3. SVG ANIMATION TEMPLATES (UNIVERSALLY SUPPORTED GEOMETRIC TRANSFORMS)
// =========================================================================

/**
 * Generates universally supported SVG stick-figure demonstration markup.
 * Uses GPU-accelerated standard CSS @keyframes transforms (translateY, rotate, scale)
 * that render cleanly in all browsers without fragile path interpolation.
 * @param {string} animKey
 * @param {string} accentColor
 * @returns {string} SVG inner markup
 */
export function getSvgAnimationMarkup(animKey, accentColor = '#22d3ee') {
  const defs = `
    <defs>
      <filter id="animGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#020617" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
  `;

  const backdrop = `
    <rect width="320" height="190" fill="url(#gridGrad)" rx="16" />
    <line x1="20" y1="160" x2="300" y2="160" stroke="#334155" stroke-width="2" stroke-dasharray="6,4" opacity="0.6" />
    <line x1="160" y1="20" x2="160" y2="160" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4" opacity="0.4" />
  `;

  switch (animKey) {
    // -------------------------------------------------------------
    // BENCH PRESS (Horizontal Push)
    // -------------------------------------------------------------
    case 'bench_press':
    case 'incline_bench':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes bpBarAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(32px); }
          }
          @keyframes bpArmLeftAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(26deg); }
          }
          @keyframes bpArmRightAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(-26deg); }
          }
          @keyframes bpPecPulse {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            45%, 55% { opacity: 0.95; transform: scale(1.15); }
          }
          .anim-bp-bar { animation: bpBarAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-bp-arm-l { transform-origin: 135px 115px; animation: bpArmLeftAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-bp-arm-r { transform-origin: 185px 115px; animation: bpArmRightAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-bp-pec { transform-origin: 160px 115px; animation: bpPecPulse 2.8s ease-in-out infinite; }
        </style>
        <!-- Flat / Incline Gym Bench -->
        <rect x="100" y="125" width="120" height="8" rx="3" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <rect x="156" y="133" width="8" height="27" fill="#1e293b" />
        <rect x="75" y="55" width="6" height="105" fill="#334155" />
        <rect x="239" y="55" width="6" height="105" fill="#334155" />

        <!-- Torso & Head Resting on Bench -->
        <circle cx="160" cy="112" r="10" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="160" y1="120" x2="160" y2="128" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
        <!-- Legs Planted on Floor -->
        <polyline points="160,128 135,145 135,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="160,128 185,145 185,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Active Pectoral Tension Glow -->
        <ellipse cx="160" cy="115" rx="15" ry="7" fill="${accentColor}" class="anim-bp-pec" filter="url(#animGlow)" />

        <!-- Articulated Arms -->
        <g class="anim-bp-arm-l">
          <polyline points="135,115 118,92 120,68" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <g class="anim-bp-arm-r">
          <polyline points="185,115 202,92 200,68" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        <!-- Dynamic Olympic Barbell & Plates -->
        <g class="anim-bp-bar">
          <line x1="68" y1="68" x2="252" y2="68" stroke="#f8fafc" stroke-width="3.5" stroke-linecap="round" filter="url(#animGlow)" />
          <rect x="78" y="50" width="7" height="36" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" />
          <rect x="88" y="54" width="5" height="28" rx="2" fill="#64748b" />
          <rect x="235" y="50" width="7" height="36" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" />
          <rect x="227" y="54" width="5" height="28" rx="2" fill="#64748b" />
          <circle cx="120" cy="68" r="4" fill="#f8fafc" />
          <circle cx="200" cy="68" r="4" fill="#f8fafc" />
        </g>
      `;

    // -------------------------------------------------------------
    // PUSHUP / DIAMOND PUSHUP (Floor Horizontal Push)
    // -------------------------------------------------------------
    case 'pushup':
    case 'pushup_diamond':
    case 'pushup_close':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes puBodyAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(30px); }
          }
          @keyframes puArmAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(32deg); }
          }
          @keyframes puPecGlow {
            0%, 100% { opacity: 0.4; }
            45%, 55% { opacity: 1; filter: drop-shadow(0 0 6px ${accentColor}); }
          }
          .anim-pu-body { animation: puBodyAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-pu-arm { transform-origin: 110px 105px; animation: puArmAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-pu-pec { animation: puPecGlow 2.8s ease-in-out infinite; }
        </style>
        <!-- Floor Mat -->
        <rect x="40" y="160" width="240" height="4" rx="2" fill="#334155" />

        <!-- Rigid Straight Plank Body Moving as One Unit -->
        <g class="anim-pu-body">
          <circle cx="85" cy="98" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
          <!-- Torso and straight legs -->
          <line x1="93" y1="103" x2="225" y2="152" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
          <!-- Target Chest Tension Highlight -->
          <line x1="96" y1="105" x2="135" y2="120" stroke="${accentColor}" stroke-width="6.5" stroke-linecap="round" class="anim-pu-pec" />
          <!-- Planted Toes -->
          <circle cx="225" cy="152" r="3.5" fill="#64748b" />
        </g>

        <!-- Planted Hand on Floor -->
        <circle cx="115" cy="160" r="4.5" fill="#f8fafc" />
        <!-- Articulated Bending Arm -->
        <g class="anim-pu-arm">
          <polyline points="110,105 92,132 115,160" stroke="${accentColor}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      `;

    // -------------------------------------------------------------
    // OVERHEAD PRESS & PIKE PUSHUP (Vertical Push)
    // -------------------------------------------------------------
    case 'overhead_press':
    case 'pike_pushup':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes ohpBarAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(-44px); }
          }
          @keyframes ohpArmLAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(-55deg); }
          }
          @keyframes ohpArmRAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(55deg); }
          }
          @keyframes ohpDeltGlow {
            0%, 100% { opacity: 0.4; }
            45%, 55% { opacity: 1; filter: drop-shadow(0 0 7px ${accentColor}); }
          }
          .anim-ohp-bar { animation: ohpBarAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-ohp-arm-l { transform-origin: 148px 86px; animation: ohpArmLAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-ohp-arm-r { transform-origin: 172px 86px; animation: ohpArmRAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-ohp-delt { animation: ohpDeltGlow 2.8s ease-in-out infinite; }
        </style>
        <!-- Standing Athlete Silhouette -->
        <circle cx="160" cy="70" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="160" y1="79" x2="160" y2="120" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
        <!-- Legs & Stance -->
        <polyline points="160,120 148,140 144,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="160,120 172,140 176,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Shoulder Deltoids Highlight -->
        <circle cx="148" cy="86" r="6" fill="${accentColor}" class="anim-ohp-delt" />
        <circle cx="172" cy="86" r="6" fill="${accentColor}" class="anim-ohp-delt" />

        <!-- Articulated Pressing Arms -->
        <g class="anim-ohp-arm-l">
          <polyline points="148,86 136,102 135,88" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <g class="anim-ohp-arm-r">
          <polyline points="172,86 184,102 185,88" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        <!-- Vertical Overhead Barbell Movement -->
        <g class="anim-ohp-bar">
          <line x1="100" y1="88" x2="220" y2="88" stroke="#f8fafc" stroke-width="3.5" stroke-linecap="round" filter="url(#animGlow)" />
          <rect x="106" y="74" width="6" height="28" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" />
          <rect x="208" y="74" width="6" height="28" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" />
          <circle cx="135" cy="88" r="3.5" fill="#f8fafc" />
          <circle cx="185" cy="88" r="3.5" fill="#f8fafc" />
        </g>
      `;

    // -------------------------------------------------------------
    // LATERAL RAISE (Shoulder Abduction)
    // -------------------------------------------------------------
    case 'lateral_raise':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes latArmLAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(-75deg); }
          }
          @keyframes latArmRAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(75deg); }
          }
          @keyframes deltPulse {
            0%, 100% { opacity: 0.3; }
            45%, 55% { opacity: 1; filter: drop-shadow(0 0 8px ${accentColor}); }
          }
          .anim-lat-l { transform-origin: 148px 86px; animation: latArmLAnim 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-lat-r { transform-origin: 172px 86px; animation: latArmRAnim 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-delt-glow { animation: deltPulse 2.6s ease-in-out infinite; }
        </style>
        <circle cx="160" cy="70" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="160" y1="79" x2="160" y2="120" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
        <polyline points="160,120 150,140 148,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="160,120 170,140 172,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Medial Delt Glow -->
        <circle cx="148" cy="86" r="6" fill="${accentColor}" class="anim-delt-glow" />
        <circle cx="172" cy="86" r="6" fill="${accentColor}" class="anim-delt-glow" />

        <!-- Left Arm with Dumbbell -->
        <g class="anim-lat-l">
          <line x1="148" y1="86" x2="140" y2="125" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
          <rect x="135" y="122" width="10" height="7" rx="1.5" fill="#f8fafc" />
        </g>
        <!-- Right Arm with Dumbbell -->
        <g class="anim-lat-r">
          <line x1="172" y1="86" x2="180" y2="125" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
          <rect x="175" y="122" width="10" height="7" rx="1.5" fill="#f8fafc" />
        </g>
      `;

    // -------------------------------------------------------------
    // PULL-UP & LAT PULLDOWN (Vertical Pull)
    // -------------------------------------------------------------
    case 'pullup':
    case 'lat_pulldown':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes pullupBodyAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(-38px); }
          }
          @keyframes pullupArmLAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(45deg); }
          }
          @keyframes pullupArmRAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(-45deg); }
          }
          @keyframes latWingsGlow {
            0%, 100% { opacity: 0.3; transform: scaleX(1); }
            45%, 55% { opacity: 1; transform: scaleX(1.3); filter: drop-shadow(0 0 8px ${accentColor}); }
          }
          .anim-pu-torso { animation: pullupBodyAnim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-pu-arm-l { transform-origin: 132px 40px; animation: pullupArmLAnim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-pu-arm-r { transform-origin: 188px 40px; animation: pullupArmRAnim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-lats { transform-origin: 160px 85px; animation: latWingsGlow 3s ease-in-out infinite; }
        </style>
        <!-- Overhead Pull-up Bar & Rig -->
        <line x1="60" y1="40" x2="260" y2="40" stroke="#cbd5e1" stroke-width="4.5" stroke-linecap="round" filter="url(#animGlow)" />
        <rect x="75" y="40" width="6" height="50" fill="#334155" />
        <rect x="239" y="40" width="6" height="50" fill="#334155" />
        <!-- Hand Grips -->
        <circle cx="132" cy="40" r="4" fill="#f8fafc" />
        <circle cx="188" cy="40" r="4" fill="#f8fafc" />

        <!-- Moving Athlete Silhouette -->
        <g class="anim-pu-torso">
          <circle cx="160" cy="72" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
          <line x1="160" y1="81" x2="160" y2="118" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
          <!-- Squeezing Latissimus Dorsi Highlight -->
          <path d="M 148 85 Q 160 92 172 85 Q 160 106 148 85" fill="${accentColor}" class="anim-lats" />
          <!-- Crossed Legs Hanging Cleanly -->
          <polyline points="160,118 155,136 158,155" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <polyline points="160,118 165,136 162,155" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" />
        </g>

        <!-- Articulated Pulling Arms -->
        <g class="anim-pu-arm-l">
          <line x1="132" y1="40" x2="148" y2="85" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
        </g>
        <g class="anim-pu-arm-r">
          <line x1="188" y1="40" x2="172" y2="85" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
        </g>
      `;

    // -------------------------------------------------------------
    // ROWING (Bent-over Row, Seated Row, Superman)
    // -------------------------------------------------------------
    case 'bent_over_row':
    case 'seated_cable_row':
    case 'superman':
    case 'face_pull':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes rowBarAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(-30px); }
          }
          @keyframes rowArmAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(-35deg); }
          }
          @keyframes rhomboidGlow {
            0%, 100% { opacity: 0.35; }
            45%, 55% { opacity: 1; filter: drop-shadow(0 0 8px ${accentColor}); }
          }
          .anim-row-bar { animation: rowBarAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-row-arm { transform-origin: 135px 95px; animation: rowArmAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-back-glow { animation: rhomboidGlow 2.8s ease-in-out infinite; }
        </style>
        <!-- Floor line -->
        <line x1="40" y1="160" x2="280" y2="160" stroke="#334155" stroke-width="2" />

        <!-- Hip-Hinged 45-degree Torso Posture -->
        <circle cx="112" cy="78" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="120" y1="84" x2="175" y2="115" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
        <!-- Soft-bent Knees & Solid Base -->
        <polyline points="175,115 185,138 180,160" stroke="#64748b" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Scapular Retraction & Upper Back Highlight -->
        <line x1="130" y1="90" x2="160" y2="108" stroke="${accentColor}" stroke-width="7" stroke-linecap="round" class="anim-back-glow" />

        <!-- Rowing Arm Driving Elbow Back -->
        <g class="anim-row-arm">
          <polyline points="135,95 142,122 135,142" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        <!-- Barbell / Cable Handle Path -->
        <g class="anim-row-bar">
          <line x1="90" y1="142" x2="180" y2="142" stroke="#f8fafc" stroke-width="3.5" stroke-linecap="round" filter="url(#animGlow)" />
          <rect x="96" y="130" width="6" height="24" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1" />
          <rect x="168" y="130" width="6" height="24" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1" />
          <circle cx="135" cy="142" r="3.5" fill="#f8fafc" />
        </g>
      `;

    // -------------------------------------------------------------
    // SQUAT & LEG PRESS (Knee-Dominant Lower Body)
    // -------------------------------------------------------------
    case 'squat':
    case 'leg_press':
    case 'lunges':
    case 'calf_raise':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes squatBodyAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(34px); }
          }
          @keyframes squatKneeAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(40deg); }
          }
          @keyframes quadGlow {
            0%, 100% { opacity: 0.35; }
            45%, 55% { opacity: 1; filter: drop-shadow(0 0 9px ${accentColor}); }
          }
          .anim-squat-torso { animation: squatBodyAnim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-squat-thigh { transform-origin: 160px 115px; animation: squatKneeAnim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-quads { animation: quadGlow 3s ease-in-out infinite; }
        </style>
        <!-- Floor Surface -->
        <line x1="60" y1="160" x2="260" y2="160" stroke="#334155" stroke-width="3" stroke-linecap="round" />

        <!-- Descending Torso, Head & Barbell -->
        <g class="anim-squat-torso">
          <circle cx="160" cy="62" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
          <line x1="160" y1="71" x2="160" y2="115" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
          <!-- Barbell on Traps -->
          <line x1="105" y1="74" x2="215" y2="74" stroke="#f8fafc" stroke-width="3.5" stroke-linecap="round" filter="url(#animGlow)" />
          <rect x="112" y="60" width="6" height="28" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" />
          <rect x="202" y="60" width="6" height="28" rx="2" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" />
          <!-- Hands Stabilizing Bar -->
          <circle cx="138" cy="74" r="3.5" fill="#f8fafc" />
          <circle cx="182" cy="74" r="3.5" fill="#f8fafc" />
          <!-- Target Quadriceps & Glute Glow -->
          <circle cx="160" cy="115" r="7" fill="${accentColor}" class="anim-quads" />
        </g>

        <!-- Knee Joint Flexion to Parallel -->
        <g class="anim-squat-thigh">
          <polyline points="160,115 138,138 145,160" stroke="${accentColor}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <polyline points="160,115 182,138 175,160" stroke="${accentColor}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      `;

    // -------------------------------------------------------------
    // DEADLIFT & RDL (Hip-Dominant Posterior Chain)
    // -------------------------------------------------------------
    case 'deadlift':
    case 'rdl':
    case 'glute_bridge':
    case 'hip_thrust':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes dlHingeAnim {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            45%, 55% { transform: translateY(22px) rotate(32deg); }
          }
          @keyframes dlBarAnim {
            0%, 100% { transform: translateY(0px); }
            45%, 55% { transform: translateY(38px); }
          }
          @keyframes postGlow {
            0%, 100% { opacity: 0.35; }
            45%, 55% { opacity: 1; filter: drop-shadow(0 0 9px ${accentColor}); }
          }
          .anim-dl-torso { transform-origin: 170px 115px; animation: dlHingeAnim 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-dl-bar { animation: dlBarAnim 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-posterior { animation: postGlow 3.2s ease-in-out infinite; }
        </style>
        <!-- Dead-Stop Floor Surface -->
        <line x1="50" y1="160" x2="270" y2="160" stroke="#334155" stroke-width="3" stroke-linecap="round" />

        <!-- Hip Hinge Torso -->
        <g class="anim-dl-torso">
          <circle cx="170" cy="65" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
          <line x1="170" y1="74" x2="170" y2="115" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
        </g>

        <!-- Posterior Chain (Hamstrings & Glutes) Glow Highlight -->
        <line x1="170" y1="115" x2="176" y2="138" stroke="${accentColor}" stroke-width="6" stroke-linecap="round" class="anim-posterior" />
        <!-- Soft Knees Shins Vertical -->
        <polyline points="170,115 176,138 174,160" stroke="#64748b" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Barbell Skimming Shins -->
        <g class="anim-dl-bar">
          <line x1="110" y1="118" x2="230" y2="118" stroke="#f8fafc" stroke-width="3.5" stroke-linecap="round" filter="url(#animGlow)" />
          <circle cx="118" cy="118" r="14" fill="#0f172a" stroke="${accentColor}" stroke-width="2" />
          <circle cx="222" cy="118" r="14" fill="#0f172a" stroke="${accentColor}" stroke-width="2" />
          <!-- Straight Hanging Arms with Grip -->
          <line x1="170" y1="84" x2="160" y2="118" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="160" cy="118" r="3.5" fill="#f8fafc" />
        </g>
      `;

    // -------------------------------------------------------------
    // CORE PLANK & HANGING LEG RAISE (Trunk Stabilization)
    // -------------------------------------------------------------
    case 'plank':
    case 'hanging_leg_raise':
    case 'bicycle_crunch':
    case 'woodchopper':
    case 'mountain_climber':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes corePulseAnim {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.3); filter: drop-shadow(0 0 10px ${accentColor}); }
          }
          @keyframes plankWave {
            0%, 100% { stroke-dashoffset: 0; }
            50% { stroke-dashoffset: 16; }
          }
          .anim-core-glow { transform-origin: 155px 125px; animation: corePulseAnim 2s ease-in-out infinite; }
          .anim-plank-flow { animation: plankWave 2s linear infinite; }
        </style>
        <!-- Floor Mat -->
        <rect x="50" y="160" width="220" height="4" rx="2" fill="#334155" />

        <!-- Rigid Forearm Plank -->
        <circle cx="88" cy="112" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <!-- Head to heel rigid line -->
        <line x1="97" y1="116" x2="235" y2="148" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />

        <!-- Forearms Planted at 90 Degrees -->
        <polyline points="105,119 105,145 120,160" stroke="#cbd5e1" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="120" cy="160" r="3.5" fill="#f8fafc" />
        <!-- Toes Braced -->
        <circle cx="235" cy="148" r="4" fill="#64748b" />

        <!-- Active Rectus Abdominis / Core Tension Pulse -->
        <line x1="120" y1="122" x2="175" y2="135" stroke="${accentColor}" stroke-width="8" stroke-linecap="round" class="anim-core-glow" />
        <line x1="122" y1="122" x2="173" y2="135" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dasharray="4,4" class="anim-plank-flow" />
      `;

    // -------------------------------------------------------------
    // BICEP & TRICEP ISOLATION (Arm Hypertrophy)
    // -------------------------------------------------------------
    case 'bicep_curl':
    case 'hammer_curl':
    case 'tricep_pushdown':
    case 'overhead_tricep':
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes curlForearmAnim {
            0%, 100% { transform: rotate(0deg); }
            45%, 55% { transform: rotate(-95deg); }
          }
          @keyframes bicepPeakGlow {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            45%, 55% { opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 8px ${accentColor}); }
          }
          .anim-curl-arm { transform-origin: 155px 112px; animation: curlForearmAnim 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          .anim-bicep-peak { transform-origin: 155px 98px; animation: bicepPeakGlow 2.8s ease-in-out infinite; }
        </style>
        <!-- Standing Athlete Silhouette -->
        <circle cx="160" cy="68" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="160" y1="77" x2="160" y2="120" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
        <polyline points="160,120 150,140 148,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="160,120 170,140 172,160" stroke="#64748b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Upper Arm Pinned to Ribs -->
        <line x1="160" y1="84" x2="155" y2="112" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />

        <!-- Bicep Muscle Belly Peak Highlight -->
        <circle cx="155" cy="98" r="6" fill="${accentColor}" class="anim-bicep-peak" />

        <!-- Articulated Curling Forearm & Barbell -->
        <g class="anim-curl-arm">
          <line x1="155" y1="112" x2="155" y2="140" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="155" cy="140" r="4" fill="#f8fafc" />
          <!-- Barbell Load -->
          <line x1="125" y1="140" x2="185" y2="140" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
          <rect x="130" y="130" width="5" height="20" rx="1.5" fill="${accentColor}" />
          <rect x="175" y="130" width="5" height="20" rx="1.5" fill="${accentColor}" />
        </g>
      `;

    // -------------------------------------------------------------
    // CARDIO INTERVAL (Jumping Jacks, Burpees)
    // -------------------------------------------------------------
    case 'jumping_jacks':
    case 'burpee':
    default:
      return `
        ${defs}
        ${backdrop}
        <style>
          @keyframes jackArmsL {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-120deg); }
          }
          @keyframes jackArmsR {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(120deg); }
          }
          @keyframes jackLegsL {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-25deg); }
          }
          @keyframes jackLegsR {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(25deg); }
          }
          @keyframes cardioHeartPulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 10px ${accentColor}); }
          }
          .anim-jack-arm-l { transform-origin: 152px 85px; animation: jackArmsL 1.2s ease-in-out infinite; }
          .anim-jack-arm-r { transform-origin: 168px 85px; animation: jackArmsR 1.2s ease-in-out infinite; }
          .anim-jack-leg-l { transform-origin: 155px 120px; animation: jackLegsL 1.2s ease-in-out infinite; }
          .anim-jack-leg-r { transform-origin: 165px 120px; animation: jackLegsR 1.2s ease-in-out infinite; }
          .anim-cardio-pulse { transform-origin: 160px 92px; animation: cardioHeartPulse 1.2s ease-in-out infinite; }
        </style>
        <circle cx="160" cy="68" r="9" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="160" y1="77" x2="160" y2="120" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />

        <!-- Cardio Core & Aerobic Kinetic Pulse -->
        <circle cx="160" cy="92" r="7" fill="${accentColor}" class="anim-cardio-pulse" />

        <!-- Dynamic Jumping Arms -->
        <g class="anim-jack-arm-l">
          <line x1="152" y1="85" x2="135" y2="120" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
        </g>
        <g class="anim-jack-arm-r">
          <line x1="168" y1="85" x2="185" y2="120" stroke="${accentColor}" stroke-width="3.5" stroke-linecap="round" />
        </g>

        <!-- Dynamic Jumping Legs -->
        <g class="anim-jack-leg-l">
          <line x1="155" y1="120" x2="150" y2="160" stroke="#64748b" stroke-width="3.5" stroke-linecap="round" />
        </g>
        <g class="anim-jack-leg-r">
          <line x1="165" y1="120" x2="170" y2="160" stroke="#64748b" stroke-width="3.5" stroke-linecap="round" />
        </g>
      `;
  }
}

// =========================================================================
// 4. INTERACTIVE VISUALIZER COMPONENT MOUNTER & LIFECYCLE CONTROLLER
// =========================================================================

/**
 * Creates and mounts an interactive Exercise Animation Visualizer inside a target element.
 * Includes play/pause, step controls, tempo indicator, and biomechanical feedback.
 * @param {object} exercise
 * @param {HTMLElement} containerEl
 * @param {object} [options]
 * @returns {object} Controller instance with cleanup
 */
export function mountExerciseVisualizer(exercise, containerEl, options = {}) {
  if (!containerEl || !exercise) return null;

  const patternInfo = getExerciseMovementPattern(exercise);
  const animKey = patternInfo.animKey;
  let isPlaying = true;
  let currentSpeed = 1.0;
  let activeStep = 'loop'; // 'loop' | 'setup' | 'inflection' | 'lockout'

  const wrapperId = `vis-card-${Math.random().toString(36).slice(2, 8)}`;

  // Structural markup adhering strictly to anti-slop rules (unboxed metadata, clear typography)
  containerEl.innerHTML = `
    <div id="${wrapperId}" class="rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-xl transition-all">
      <!-- Visualizer Header: Pattern Metadata -->
      <div class="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <div class="flex items-center gap-2 text-[10px] font-mono tracking-wider font-bold uppercase text-cyan-400">
            <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${patternInfo.accentColor}"></span>
            <span>${patternInfo.label}</span>
            <span class="text-slate-600">/</span>
            <span class="text-slate-300 truncate">${patternInfo.subType}</span>
          </div>
          <span class="text-[11px] text-slate-400 block truncate mt-0.5">${patternInfo.jointActions}</span>
        </div>
        
        <!-- Controls: Play/Pause & Speed -->
        <div class="flex items-center gap-1.5 shrink-0">
          <button type="button" class="btn-vis-speed px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-mono font-bold text-slate-300 transition-colors" title="Toggle animation playback speed">
            ${currentSpeed}x
          </button>
          <button type="button" class="btn-vis-play p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 transition-colors" title="Play or pause demonstration">
            ⏸️
          </button>
        </div>
      </div>

      <!-- Animated Stage -->
      <div class="relative w-full aspect-[320/190] max-h-56 bg-slate-950 flex items-center justify-center p-2">
        <svg id="${wrapperId}-svg" class="w-full h-full max-h-52 object-contain" viewBox="0 0 320 190" aria-label="Biomechanical exercise form animation for ${exercise.name}">
          ${getSvgAnimationMarkup(animKey, patternInfo.accentColor)}
        </svg>

        <!-- Live Cadence Wave Overlay -->
        <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80">
          <span class="vis-phase-badge text-cyan-300 font-bold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            Live Form Loop Active
          </span>
          <span class="vis-tempo-text text-slate-300 hidden sm:inline">${patternInfo.tempoGuide.split('·')[0]}</span>
        </div>
      </div>

      <!-- Step-by-Step Frame Breakdown & Form Cues -->
      <div class="p-3 bg-slate-900/60 border-t border-slate-800 space-y-2">
        <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Form Breakdown:</span>
          <div class="flex items-center gap-1">
            <button type="button" data-step="setup" class="btn-step-pos px-2 py-0.5 rounded text-[10px] font-mono border border-slate-800 bg-slate-950 text-slate-300 hover:border-cyan-500/50">
              1. Setup
            </button>
            <button type="button" data-step="inflection" class="btn-step-pos px-2 py-0.5 rounded text-[10px] font-mono border border-slate-800 bg-slate-950 text-slate-300 hover:border-cyan-500/50">
              2. Stretch
            </button>
            <button type="button" data-step="lockout" class="btn-step-pos px-2 py-0.5 rounded text-[10px] font-mono border border-slate-800 bg-slate-950 text-slate-300 hover:border-cyan-500/50">
              3. Lockout
            </button>
            <button type="button" data-step="loop" class="btn-step-pos px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/60 bg-cyan-950/80 text-cyan-300 font-bold">
              Loop ↺
            </button>
          </div>
        </div>

        <div class="text-[11px] text-slate-300 leading-snug flex items-start gap-2">
          <span class="text-cyan-400 font-bold shrink-0">Breathing Cue:</span>
          <span>${patternInfo.breathingGuide}</span>
        </div>
      </div>
    </div>
  `;

  const cardEl = document.getElementById(wrapperId);
  const svgEl = document.getElementById(`${wrapperId}-svg`);
  const playBtn = cardEl?.querySelector('.btn-vis-play');
  const speedBtn = cardEl?.querySelector('.btn-vis-speed');
  const phaseBadge = cardEl?.querySelector('.vis-phase-badge');
  const stepBtns = cardEl?.querySelectorAll('.btn-step-pos');

  function updatePlayState(play) {
    isPlaying = play;
    if (playBtn) playBtn.textContent = isPlaying ? '⏸️' : '▶️';
    if (svgEl) {
      const animatedEls = svgEl.querySelectorAll('[class^="anim-"], g, style');
      if (isPlaying) {
        svgEl.style.animationPlayState = 'running';
        animatedEls.forEach(el => (el.style.animationPlayState = 'running'));
        if (phaseBadge) {
          phaseBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> Live Form Loop Active';
        }
      } else {
        svgEl.style.animationPlayState = 'paused';
        animatedEls.forEach(el => (el.style.animationPlayState = 'paused'));
        if (phaseBadge) {
          phaseBadge.innerHTML = '⏸ Form Frame Paused';
        }
      }
    }
  }

  playBtn?.addEventListener('click', () => {
    updatePlayState(!isPlaying);
  });

  speedBtn?.addEventListener('click', () => {
    currentSpeed = currentSpeed === 1.0 ? 0.5 : currentSpeed === 0.5 ? 1.5 : 1.0;
    if (speedBtn) speedBtn.textContent = `${currentSpeed}x`;
    if (svgEl) {
      const animatedEls = svgEl.querySelectorAll('[class^="anim-"]');
      const baseSec = 2.8;
      const targetSec = (baseSec / currentSpeed).toFixed(1) + 's';
      animatedEls.forEach(el => {
        el.style.animationDuration = targetSec;
      });
    }
  });

  stepBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      activeStep = step;
      stepBtns.forEach(b => {
        b.className =
          b === btn
            ? 'btn-step-pos px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/60 bg-cyan-950/80 text-cyan-300 font-bold'
            : 'btn-step-pos px-2 py-0.5 rounded text-[10px] font-mono border border-slate-800 bg-slate-950 text-slate-300 hover:border-cyan-500/50';
      });

      if (step === 'loop') {
        updatePlayState(true);
      } else {
        updatePlayState(false);
        if (phaseBadge) {
          const stepNames = {
            setup: 'Frame 1: Starting Alignment & Grip',
            inflection: 'Frame 2: Peak Stretch / Eccentric Point',
            lockout: 'Frame 3: Concentric Contraction Lockout'
          };
          phaseBadge.textContent = stepNames[step] || 'Form Step';
        }
      }
    });
  });

  return {
    cleanup: () => {
      if (containerEl) containerEl.innerHTML = '';
    },
    setSpeed: s => {
      currentSpeed = s;
      if (speedBtn) speedBtn.textContent = `${s}x`;
    }
  };
}

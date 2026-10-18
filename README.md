# JDFit — Production-Grade Interactive Muscle Map & Workout Generator

An enterprise-ready, accessible, modular fitness web application built with modern vanilla ES modules, semantic HTML5, and CSS. JDFit empowers users to target specific muscle groups via an interactive front-and-back anatomical body map, generate balanced custom workout routines across multiple training modes and equipment setups, follow live workouts with a guided timer, and estimate maximal strength using validated 1RM formulas (Brzycki & Epley).

---

## 1. Architecture & Folder Structure

JDFit has been refactored from a monolithic single-file HTML script into a decoupled, modular ES module architecture that isolates data, business logic, storage, and UI presentation.

```
├── index.html                   # Semantic HTML5 entry point with CSP and ARIA live regions
├── css/
│   └── styles.css               # Production stylesheet with focus states, CSS variables & typography
├── js/
│   ├── main.js                  # Application orchestrator & DOM event coordinator
│   ├── workoutEngine.js         # Pure, deterministic workout generation & equipment filtering engine
│   ├── exerciseData.js          # Immutable catalog of muscles, exercises, and equipment options
│   ├── oneRmCalculator.js       # Mathematical 1RM engine (Brzycki & Epley) with safety disclaimers
│   ├── player.js                # Guided workout player with Web Audio API sound synthesis & timers
│   ├── storage.js               # Resilient, namespaced StorageManager with memory fallback
│   └── utils.js                 # HTML sanitization, input validators, audio generator & error boundary
├── tests/
│   ├── workoutEngine.test.js    # Unit tests for generation, equipment filtering & duration scaling
│   ├── oneRmCalculator.test.js  # Unit tests for Brzycki & Epley math, edge cases & input bounds
│   ├── storage.test.js          # Unit tests for storage serialization, corruption recovery & fallback
│   └── validation.test.js       # Unit tests for configuration schema validation and time formatting
├── sw.js                        # Service worker for offline PWA caching & network resilience
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated GitHub Actions CI workflow (lint, test, build)
├── vitest.config.js             # Vitest test runner configuration
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier formatting rules
└── package.json                 # Project manifest, dependencies, and test/build scripts
```

---

## 2. Core Modules & Responsibilities

| Module | Responsibility | Pure / State |
| :--- | :--- | :--- |
| `workoutEngine.js` | Generates balanced routines, handles full-body fallback, sorts compound first, filters equipment (including strict zero-equipment home isolation), and configures prescriptions (timed minutes vs. reps). | **Pure Function** |
| `oneRmCalculator.js`| Validates input (weight > 0, reps 1–12), calculates Brzycki & Epley equations, computes training percentages, and supplies medical safety disclaimers. | **Pure Function** |
| `exerciseData.js` | Immutable catalog of exercises, biomechanical movement types, setup & execution steps, form cues, and anatomical muscle definitions. | **Data Repository** |
| `storage.js` | Robust `StorageManager` with namespaced keys (`jdfit.preferences.v1`), quota protection, corrupted-data auto-healing, and memory cache fallback. | **Stateful Wrapper** |
| `player.js` | Live guided workout session state machine (`exercise` ➔ `rest` ➔ `finished`), stopwatch, interval timers, Web Audio synthesizer, and screen-reader announcements. | **State Machine** |
| `utils.js` | XSS sanitization (`escapeHtml`), configuration validators, time formatters, and Web Audio API tone synthesis (zero MP3 dependencies). | **Utility** |
| `main.js` | UI rendering, SVG body map interaction, event delegation, and view switching. | **Orchestrator** |

---

## 3. Data Models

### 3.1 Exercise Entity
```typescript
interface Exercise {
  id: string;                               // Unique slug (e.g., 'pushup-classic')
  name: string;                             // Display title
  primaryMuscles: string[];                 // Primary targeted muscle keys
  secondaryMuscles: string[];               // Synergist muscle keys
  equipment: EquipmentType;                 // 'Bodyweight' | 'Dumbbell' | 'Barbell' | 'Cable' | 'Machine' | 'Pull-Up Bar'
  requiresBarOrFixture?: boolean;          // Strict home zero-equipment flag (e.g. pullups require bar)
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  mechanics: 'Compound' | 'Isolation';
  isCardio?: boolean;                       // Identifies aerobic/HIIT movements
  goalProtocols: {
    strength?: ProtocolSpec;                // Low reps (3-6), full rest (120-180s)
    endurance?: ProtocolSpec;               // Timed 1-min intervals or high reps (15-20), short rest
    cardio?: ProtocolSpec;                  // 45s-60s intervals, rapid recovery (20-30s)
  };
  setupSteps: string[];                     // Step-by-step setup guide
  executionSteps: string[];                 // Biomechanical execution details
  coachingCues: string[];                   // Quick form reminder cues
  commonMistakes: string[];                 // Common injury-risk errors to avoid
}
```

### 3.2 Generated Workout Routine
```typescript
interface WorkoutRoutine {
  id: string;                               // Unique timestamped routine ID
  title: string;                            // E.g., "45-Min Chest & Triceps Routine"
  description: string;                      // Personalized session summary
  splitType: 'FullBody' | 'Targeted' | 'Cardio';
  targetMuscles: string[];                  // Muscles selected by user (empty = full body)
  durationMinutes: 30 | 45 | 60;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  trainingMode: 'strength' | 'endurance' | 'both' | 'cardio';
  selectedEquipment: string[];
  createdAt: string;                        // ISO 8601 timestamp
  exercises: {
    order: number;
    exercise: Exercise;
    customSets: number;                     // 3 sets for 30/45m, 4 sets for 60m
    customReps: string;                     // E.g. "4-6 reps" or "1 min continuous"
    isTimed: boolean;                       // True for bodyweight cardio/endurance
    durationSeconds?: number;               // E.g. 60
    customRestSeconds: number;              // E.g. 30, 45, 90, 120
    notes: string;                          // Primary form cue
    completedSets: boolean[];               // Real-time tracking checkboxes
  }[];
}
```

---

## 4. Input Validation & Error Handling

1. **Session Configuration**:
   - `durationMinutes`: strictly validated against allowed values (`[30, 45, 60]`).
   - `trainingMode`: validated against `['strength', 'endurance', 'both', 'cardio']`.
   - `difficulty`: validated against `['Beginner', 'Intermediate', 'Advanced']`.
   - `selectedEquipment`: must be non-empty; prevents conflicting empty selections.
   - `selectedMuscles`: validated against valid anatomical keys in `MUSCLES`.
2. **1RM Calculator**:
   - `weight`: must be a positive numeric value ($> 0$).
   - `reps`: strictly restricted to an integer between 1 and 12 (calculations beyond 12 repetitions suffer from severe cardiovascular decay and are clinically inaccurate).
3. **Storage Resilience**:
   - Reads/writes to `localStorage` are safely wrapped in `try/catch` blocks.
   - QuotaExceeded errors (and Safari Private Browsing restrictions) automatically fall back to an in-memory `Map` cache.
   - Corrupted JSON keys are trapped, logged, and auto-healed with safe factory defaults.
4. **Global Resilience**:
   - `window.addEventListener('error')` and `window.addEventListener('unhandledrejection')` catch unexpected runtime issues and surface non-disruptive, accessible alert notifications.

---

## 5. Accessibility (WCAG 2.1 AA)

- **Semantic Landmark Elements**: Employs `<header>`, `<nav>`, `<main>`, `<section>`, `<fieldset>`, `<legend>`, `<article>`, and `<footer>`.
- **Keyboard Navigation**:
  - The anatomical body map SVG paths are fully keyboard-navigable (`tabindex="0"`, `role="button"`, and responsive to `Enter` and `Space` key presses).
  - Quick-select muscle buttons with `aria-pressed` states provide an accessible alternative for screen readers and keyboard users.
- **ARIA Live Regions**:
  - `#appLiveRegion` (`aria-live="polite"`, `aria-atomic="true"`) announces exercise transitions, set completions, and rest timer updates to screen readers.
- **Visible Focus States**: Explicit, high-contrast cyan focus rings (`:focus-visible`) ensure clear keyboard focus throughout the application.
- **Color Contrast**: All text elements exceed WCAG AA 4.5:1 contrast requirements against the slate-950 dark background.

---

## 6. Security Considerations

- **Content Security Policy (CSP)**:
  `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';`
- **Zero API Key Exposure**: The client application contains zero hardcoded API keys or external server credentials.
- **XSS Prevention**: Dynamic user-driven text is escaped via `escapeHtml()` prior to DOM insertion.
- **Privacy & Storage**: Stores only non-sensitive exercise preferences in `localStorage` under versioned, namespaced keys (`jdfit.preferences.v1`). Users can purge all local data anytime via the **Reset Saved App Data** button.

---

## 7. Local Development & Testing

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run unit tests with Vitest (31 unit tests)
npm test

# 3. Start local development server on port 3000
npm run dev

# 4. Build optimized production bundle
npm run build
```

---

## 8. Production Deployment Guide

JDFit compiles into an optimized static site (`dist/`) that can be deployed to any static edge network:

### 1. Cloudflare Pages
```bash
Build command: npm run build
Build output directory: dist
```

### 2. Vercel
```bash
Framework Preset: Vite
Build command: npm run build
Output directory: dist
```

### 3. Netlify
```bash
Build command: npm run build
Publish directory: dist
```

### 4. GitHub Pages
1. In repository **Settings** → **Pages**, select **GitHub Actions** as source.
2. The provided `.github/workflows/ci.yml` pipeline will validate tests, lint, and build the distribution artifacts.

---

## 9. Minimal Backend Recommendation (When Needed)

The current version of JDFit is 100% client-side and requires no backend to function with full capabilities.

A minimal backend (Node.js/Express or serverless edge functions) is recommended **only if**:
1. **User Authentication & Cloud Synchronization**: If users request syncing custom workout routines and 1RM history across multiple devices (e.g. phone and desktop).
2. **AI-Powered Exercise Curation**: If dynamic LLM coaching or computer vision form checking is added, a backend proxy route (`/api/coach`) is necessary to securely store and protect API keys.

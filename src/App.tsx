import React, { useState } from 'react';
import {
  MuscleId,
  Equipment,
  Difficulty,
  TrainingMode,
  WorkoutDuration,
  Exercise,
  WorkoutRoutine,
  ViewSide
} from './types/fitness';
import { MUSCLES } from './data/muscles';
import { EXERCISES } from './data/exercises';
import { BodyDiagram } from './components/BodyMap/BodyDiagram';
import { ExerciseAnimation } from './components/ExerciseAnimation';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { WorkoutPlayerModal } from './components/WorkoutPlayer/WorkoutPlayerModal';
import { OneRepMaxCalculator } from './components/Tools/OneRepMaxCalculator';
import {
  Sparkles,
  Play,
  ArrowLeft,
  Check,
  RotateCcw,
  Clock,
  Dumbbell,
  HeartPulse,
  Flame,
  Info,
  Calculator,
  Home,
  Building2
} from 'lucide-react';

export default function App() {
  // Page Navigation: 'config' (Page 1) | 'results' (Page 2)
  const [currentPage, setCurrentPage] = useState<'config' | 'results'>('config');

  // Page 1 Inputs:
  // 1. Target Body Parts: None locked or forced! Default is empty (Full Body) or user picks any muscles
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleId[]>([]);
  const [viewSide, setViewSide] = useState<ViewSide>('front');

  // 2. Training Mode: Strength | Endurance | Both | Cardio
  const [trainingMode, setTrainingMode] = useState<TrainingMode>('strength');

  // 3. Time Duration: 30 mins | 45 mins | 60 mins
  const [durationMinutes, setDurationMinutes] = useState<WorkoutDuration>(45);

  // 4. Experience Level: Beginner | Intermediate | Advanced
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');

  // 5. Equipment & Machines Available
  const allEquipmentOptions: { key: Equipment; label: string; sub: string }[] = [
    { key: 'Bodyweight', label: 'Bodyweight (At-Home / Zero Equipment)', sub: 'Floor & zero accessories — 100% home friendly' },
    { key: 'Pull-Up Bar', label: 'Pull-Up Bar & Dip Station', sub: 'Calisthenics fixtures (uncheck for pure zero-equipment home)' },
    { key: 'Dumbbell', label: 'Dumbbells', sub: 'Adjustable or fixed hex dumbbells' },
    { key: 'Barbell', label: 'Barbell & Rack', sub: 'Olympic barbell, bench, and squat rack' },
    { key: 'Cable', label: 'Cable Machine', sub: 'Dual adjustable pulleys & cables' },
    { key: 'Machine', label: 'Gym Machines', sub: 'Plate-loaded & selectorized machines' }
  ];

  // Default to pure home bodyweight or gym:
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([
    'Bodyweight',
    'Dumbbell',
    'Barbell',
    'Cable',
    'Machine'
  ]);

  // Page 2 State: Generated Workout Routine
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);
  
  // Modals
  const [detailedExercise, setDetailedExercise] = useState<Exercise | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  // Toggle muscle selection: ANY muscle can be selected or unselected without restriction!
  const handleToggleMuscle = (muscle: MuscleId) => {
    setSelectedMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  const handleClearMuscles = () => {
    setSelectedMuscles([]);
  };

  const handleSelectAllMuscles = () => {
    setSelectedMuscles(Object.keys(MUSCLES) as MuscleId[]);
  };

  const toggleEquipment = (eq: Equipment) => {
    setSelectedEquipment(prev =>
      prev.includes(eq)
        ? prev.length > 1 ? prev.filter(e => e !== eq) : prev
        : [...prev, eq]
    );
  };

  // Quick preset: At-Home Zero Equipment Only
  const setHomeOnlyEquipment = () => {
    setSelectedEquipment(['Bodyweight']);
  };

  // Quick preset: Full Gym (All Equipment)
  const setAllGymEquipment = () => {
    setSelectedEquipment(['Bodyweight', 'Pull-Up Bar', 'Dumbbell', 'Barbell', 'Cable', 'Machine']);
  };

  // Generate Workout Routine based on Duration, Mode, Level, and Equipment
  const handleGenerateWorkout = () => {
    let chosenExercises: Exercise[] = [];

    // Target exercise count based strictly on chosen duration:
    // 30 mins: 4 exercises
    // 45 mins: 6 exercises
    // 60 mins: 8 exercises
    const targetCount = durationMinutes === 30 ? 4 : durationMinutes === 45 ? 6 : 8;

    // Helper: Check if an exercise strictly satisfies the user's selected equipment
    const matchesEquipment = (ex: Exercise) => {
      // Must match chosen equipment
      if (!selectedEquipment.includes(ex.equipment)) return false;
      // If exercise requires a bar or fixture (e.g., bar pull-ups, parallel bar dips, hanging leg raises),
      // it MUST NOT be included unless 'Pull-Up Bar' is explicitly checked!
      if (ex.requiresBarOrFixture && !selectedEquipment.includes('Pull-Up Bar')) {
        return false;
      }
      return true;
    };

    // IF CARDIO MODE:
    if (trainingMode === 'cardio') {
      const cardioPool = EXERCISES.filter(ex => 
        (ex.isCardio || ex.equipment === 'Bodyweight') && matchesEquipment(ex)
      );
      
      const shuffled = [...cardioPool].sort(() => 0.5 - Math.random());
      chosenExercises = shuffled.slice(0, targetCount);
      if (chosenExercises.length < targetCount) {
        chosenExercises = cardioPool;
      }
    } else {
      // STRENGTH, ENDURANCE, OR BOTH MODES:
      // Filter exercises matching selected equipment AND selected muscles (if any specified)
      const primaryMatching = EXERCISES.filter(ex => {
        if (!matchesEquipment(ex)) return false;
        if (selectedMuscles.length > 0) {
          const hitsMuscle = ex.primaryMuscles.some(m => selectedMuscles.includes(m)) ||
                             ex.secondaryMuscles.some(m => selectedMuscles.includes(m));
          if (!hitsMuscle) return false;
        }
        return true;
      });

      // Filter by experience level if sufficient exercises exist
      const byDifficulty = primaryMatching.filter(ex => ex.difficulty === difficulty);
      let pool = byDifficulty.length >= targetCount ? byDifficulty : primaryMatching;

      // If pool has fewer than targetCount, expand to OTHER exercises that STILL STRICTLY RESPECT matchesEquipment!
      // This ensures that when someone selects Bodyweight with no machines, NO pull-up bars or machines ever sneak in!
      if (pool.length < targetCount) {
        const fallbackEquipmentPool = EXERCISES.filter(ex => {
          if (!matchesEquipment(ex)) return false;
          return !pool.some(p => p.id === ex.id);
        });
        pool = [...pool, ...fallbackEquipmentPool];
      }

      // Sort: Compound lifts first, then isolation
      const sorted = [...pool].sort((a, b) => {
        if (a.mechanics === 'Compound' && b.mechanics !== 'Compound') return -1;
        if (b.mechanics === 'Compound' && a.mechanics !== 'Compound') return 1;
        return 0;
      });

      chosenExercises = sorted.slice(0, targetCount);

      // In the rare event that chosenExercises is still empty, strictly pull from matchesEquipment
      if (chosenExercises.length === 0) {
        const strictPool = EXERCISES.filter(matchesEquipment);
        chosenExercises = strictPool.slice(0, targetCount);
      }
    }

    // Set sets per exercise tailored to fit the exact duration
    const setsPerEx = durationMinutes === 30 ? 3 : durationMinutes === 45 ? 3 : 4;

    const muscleTitle = selectedMuscles.length > 0
      ? selectedMuscles.map(m => MUSCLES[m]?.name).join(' & ')
      : 'Full Body';

    const isHomeSession = selectedEquipment.length === 1 && selectedEquipment[0] === 'Bodyweight';

    const generatedRoutine: WorkoutRoutine = {
      id: `workout-${Date.now()}`,
      title: trainingMode === 'cardio'
        ? `${durationMinutes}-Min At-Home HIIT Cardio Circuit`
        : `${durationMinutes}-Min ${muscleTitle} ${isHomeSession ? '(Home)' : ''} Routine`,
      description: trainingMode === 'cardio'
        ? `${difficulty} zero-equipment bodyweight cardio circuit designed for maximum calorie burn anywhere at home.`
        : `${difficulty} ${trainingMode.toUpperCase()} routine designed to fit ~${durationMinutes} minutes (${selectedEquipment.join(', ')}).`,
      splitType: selectedMuscles.length === 0 ? 'FullBody' : 'Custom',
      targetMuscles: selectedMuscles,
      durationMinutes,
      estimatedMinutes: durationMinutes,
      createdAt: new Date().toISOString(),
      exercises: chosenExercises.map((ex, idx) => {
        // Mode logic:
        // Strength: number of reps
        // Endurance: number of minutes for bodyweight (e.g., "1 min"), or high reps
        // Both (Hybrid): first half strength reps, second half timed endurance
        let isTimed = false;
        let repText = '';
        let durationSec: number | undefined = undefined;
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
            isTimed = false;
            repText = ex.goalProtocols.endurance?.reps || '15-20 reps';
            restSec = 45;
          }
        } else if (trainingMode === 'both') {
          // Hybrid:
          if (idx < Math.ceil(chosenExercises.length / 2)) {
            // Strength portion:
            isTimed = false;
            repText = ex.goalProtocols.strength?.reps || '5-6 reps';
            restSec = 90;
          } else {
            // Endurance portion:
            if (ex.equipment === 'Bodyweight') {
              isTimed = true;
              repText = '1 min timed';
              durationSec = 60;
              restSec = 40;
            } else {
              isTimed = false;
              repText = ex.goalProtocols.endurance?.reps || '15-20 reps';
              restSec = 45;
            }
          }
        } else {
          // Strength mode:
          if (ex.equipment === 'Bodyweight') {
            // If bodyweight in strength mode, show strict high-tension reps
            isTimed = false;
            repText = ex.goalProtocols.strength?.reps || '12-15 strict reps';
            restSec = 75;
          } else {
            isTimed = false;
            repText = ex.goalProtocols.strength?.reps || '4-6 heavy reps';
            restSec = 120;
          }
        }

        return {
          id: `${ex.id}-${Math.random()}`,
          exercise: ex,
          customSets: setsPerEx,
          customReps: repText,
          isTimed,
          durationSeconds: durationSec,
          customRestSeconds: restSec,
          completedSets: new Array(setsPerEx).fill(false)
        };
      })
    };

    setRoutine(generatedRoutine);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle set completion in Page 2
  const handleToggleSet = (exerciseIndex: number, setIndex: number) => {
    if (!routine) return;
    const updated = [...routine.exercises];
    const target = { ...updated[exerciseIndex] };
    const sets = [...target.completedSets];
    sets[setIndex] = !sets[setIndex];
    target.completedSets = sets;
    updated[exerciseIndex] = target;
    setRoutine({ ...routine, exercises: updated });
  };

  const isHomeOnlySelected = selectedEquipment.length === 1 && selectedEquipment[0] === 'Bodyweight';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xs tracking-tighter shadow-md shadow-cyan-500/20">
              JD
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white font-display">
                JDFit
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCalculatorOpen(true)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">1RM Calculator</span>
            </button>

            {currentPage === 'results' && (
              <button
                type="button"
                onClick={() => setCurrentPage('config')}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Options</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* PAGE 1: WORKOUT CONFIGURATOR (TIME, BODY PARTS, MODE, LEVEL, MACHINES)     */}
      {/* ========================================================================= */}
      {currentPage === 'config' && (
        <main className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full space-y-7 animate-[fadeIn_0.2s_ease-out]">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Generate Your Workout
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Customize your session duration, body parts, mode, and equipment.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* STEP 1: TIME DURATION (30 MINS / 45 MINS / 60 MINS) */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                  <span>Session Time Duration</span>
                </h2>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {durationMinutes} Mins Total
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {([30, 45, 60] as WorkoutDuration[]).map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationMinutes(mins)}
                    className={`py-3.5 px-3 rounded-2xl text-center border transition-all ${
                      durationMinutes === mins
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-black font-display block">
                      {mins} mins
                    </span>
                    <span className={`text-[10px] font-mono block ${
                      durationMinutes === mins ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}>
                      {mins === 30 && '4 Focused Exercises'}
                      {mins === 45 && '6 Standard Exercises'}
                      {mins === 60 && '8 Complete Exercises'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: TRAINING MODE (STRENGTH / ENDURANCE / BOTH / CARDIO) */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                <span>Training Mode</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
                {(['strength', 'endurance', 'both', 'cardio'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTrainingMode(mode)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all capitalize text-center ${
                      trainingMode === mode
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'both' ? 'Both (Hybrid)' : mode === 'cardio' ? 'Cardio (Bodyweight)' : mode}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300 leading-relaxed">
                {trainingMode === 'strength' && (
                  <span>🎯 <strong>Strength Mode:</strong> Prescribes specific <strong>reps</strong> (3–6 reps for weights, strict reps for bodyweight) with full rest.</span>
                )}
                {trainingMode === 'endurance' && (
                  <span>⏱️ <strong>Endurance Mode:</strong> Prescribes <strong>exact minutes for bodyweight</strong> (1 minute continuous timed sets) and high reps for weights.</span>
                )}
                {trainingMode === 'both' && (
                  <span>⚡ <strong>Both Modes (Hybrid):</strong> Combines heavy strength reps on primary compound exercises with timed minutes on bodyweight/finishers.</span>
                )}
                {trainingMode === 'cardio' && (
                  <span>🔥 <strong>Free Bodyweight Cardio:</strong> High-intensity interval movements (Jumping Jacks, Mountain Climbers, Burpees, High Knees, Skater Hops) timed in minutes with zero equipment.</span>
                )}
              </div>
            </div>

            {/* STEP 3: TARGET BODY PARTS (FREE SELECTION - NO LOCKS) */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">3</span>
                    <span>Target Body Parts</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedMuscles.length === 0
                      ? 'No muscles selected — will generate a balanced Full Body session.'
                      : `${selectedMuscles.length} muscle group${selectedMuscles.length > 1 ? 's' : ''} selected: ${selectedMuscles.map(m => MUSCLES[m]?.name).join(', ')}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleSelectAllMuscles}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={handleClearMuscles}
                    className="text-xs text-slate-400 hover:text-slate-200 font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Generic Anatomical Body Diagram */}
              <div className="flex flex-col items-center">
                <BodyDiagram
                  selectedMuscles={selectedMuscles}
                  onToggleMuscle={handleToggleMuscle}
                  onClearMuscles={handleClearMuscles}
                  viewSide={viewSide}
                  onChangeViewSide={setViewSide}
                />
              </div>

              {/* Muscle Buttons Grid - Free to toggle any muscle */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
                  Quick Select Muscles (Tap to toggle):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(MUSCLES).map(m => {
                    const isSelected = selectedMuscles.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleToggleMuscle(m.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left border text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-950/90 border-cyan-500 text-cyan-200 font-bold shadow-sm ring-1 ring-cyan-500/50'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          isSelected ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="truncate">{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 4: EXPERIENCE LEVEL */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">4</span>
                <span>Experience Level</span>
              </h2>

              <div className="grid grid-cols-3 gap-2.5">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                      difficulty === lvl
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 5: EQUIPMENT & MACHINES */}
            {trainingMode !== 'cardio' && (
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">5</span>
                      <span>Available Equipment & Machines</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isHomeOnlySelected
                        ? '🏠 Home Zero-Equipment mode active — no bars, machines, or accessories.'
                        : `${selectedEquipment.length} equipment types active.`}
                    </p>
                  </div>
                  
                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={setHomeOnlyEquipment}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                        isHomeOnlySelected
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-emerald-400 border-slate-700'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Home (Zero Equip)</span>
                    </button>
                    <button
                      type="button"
                      onClick={setAllGymEquipment}
                      className="text-xs text-slate-300 hover:text-white font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Full Gym (All)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {allEquipmentOptions.map(opt => {
                    const isChecked = selectedEquipment.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleEquipment(opt.key)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-xs text-left transition-all ${
                          isChecked
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                            : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 mt-0.5 ${
                          isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className={`block font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {opt.label}
                          </span>
                          <span className="text-[11px] text-slate-400 block mt-0.5 leading-tight">
                            {opt.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GENERATE BUTTON */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateWorkout}
                className="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>
                  Generate {durationMinutes}-Min {selectedMuscles.length > 0 ? selectedMuscles.map(m => MUSCLES[m]?.name).join(' & ') : 'Full Body'} Routine
                </span>
              </button>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2: GENERATED WORKOUT ROUTINE LIST & STEP-BY-STEP WORKOUT PLAYER     */}
      {/* ========================================================================= */}
      {currentPage === 'results' && routine && (
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full space-y-6 animate-[fadeIn_0.2s_ease-out]">
          
          {/* Header Action Strip */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">
                  {routine.durationMinutes} MINS · {difficulty} · {trainingMode.toUpperCase()}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                {routine.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {routine.exercises.length} Exercises · {routine.durationMinutes} Mins · {isHomeOnlySelected ? '100% Home Zero-Equipment' : selectedEquipment.join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setCurrentPage('config')}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Edit Options
              </button>

              <button
                type="button"
                onClick={() => setIsPlayerOpen(true)}
                className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Play Workout</span>
              </button>
            </div>
          </div>

          {/* List of Generated Exercises */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider px-1">
              Planned Exercise Order ({routine.exercises.length} Exercises)
            </h2>

            {routine.exercises.map((item, idx) => {
              const ex = item.exercise;
              const isTimed = item.isTimed;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-4"
                >
                  {/* Top Bar of Exercise */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                          <span>{ex.equipment}</span>
                          <span>·</span>
                          <span>{ex.difficulty}</span>
                          {isTimed && <span className="text-emerald-400 font-bold">· Timed Minutes</span>}
                          {!isTimed && <span className="text-cyan-300 font-bold">· Rep Protocol</span>}
                        </div>
                        <h3 className="text-base font-bold text-white">
                          {ex.name}
                        </h3>
                        <span className="text-xs text-slate-400">
                          Target: {ex.primaryMuscles.map(m => MUSCLES[m]?.name).join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Prescription Badge */}
                    <div className="flex items-center gap-2 sm:self-center">
                      <div className="py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                          {isTimed ? 'Duration (Minutes)' : 'Target Reps'}
                        </span>
                        <div className="text-sm font-black font-mono text-cyan-300">
                          {item.customSets} sets × {item.customReps}
                        </div>
                      </div>

                      <div className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                          Rest
                        </span>
                        <div className="text-sm font-bold font-mono text-slate-300">
                          {item.customRestSeconds}s
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accurate Biomechanical Animation Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-slate-800/80">
                    <div className="md:col-span-5 bg-slate-950 rounded-2xl overflow-hidden p-2 border border-slate-800/80">
                      <ExerciseAnimation exercise={ex} heightClass="h-44" />
                    </div>

                    {/* Form Cues & Checkable Sets */}
                    <div className="md:col-span-7 space-y-3">
                      <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800/60 leading-relaxed">
                        <strong className="text-cyan-300 block mb-1">Coaching Form Cue:</strong>
                        {ex.coachingCues[0]}
                      </div>

                      {/* Interactive Set Checkboxes */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                          Log Completed Sets:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: item.customSets }).map((_, setIdx) => {
                            const isDone = item.completedSets[setIdx] || false;
                            return (
                              <button
                                key={setIdx}
                                type="button"
                                onClick={() => handleToggleSet(idx, setIdx)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                                  isDone
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                }`}
                              >
                                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                                  isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'
                                }`}>
                                  {isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span>Set {setIdx + 1}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => setDetailedExercise(ex)}
                          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>View Step-by-Step Instructions</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Floating Play CTA */}
          <div className="sticky bottom-4 z-30">
            <button
              type="button"
              onClick={() => setIsPlayerOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Start {routine.durationMinutes}-Min Guided Workout</span>
            </button>
          </div>

        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© 2026 JDFit · Engineered by Jaydeep · Interactive Anatomical Workout Engine</p>
      </footer>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={detailedExercise}
        onClose={() => setDetailedExercise(null)}
        activeMode={trainingMode}
        isInRoutine={false}
        onToggleRoutine={() => {}}
      />

      {/* Live Guided Workout Player Modal */}
      {routine && (
        <WorkoutPlayerModal
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          routine={routine}
        />
      )}

      {/* 1RM Calculator */}
      <OneRepMaxCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

    </div>
  );
}

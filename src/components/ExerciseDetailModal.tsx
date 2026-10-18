import React, { useState, useEffect } from 'react';
import { Exercise, TrainingMode } from '../types/fitness';
import { MUSCLES } from '../data/muscles';
import { ExerciseAnimation } from './ExerciseAnimation';
import { playTimerChime, playTickSound } from '../utils/audio';
import {
  X,
  Plus,
  Check,
  AlertTriangle,
  Lightbulb,
  Clock,
  Dumbbell,
  Play,
  RotateCcw,
  Target
} from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  activeMode: TrainingMode;
  isInRoutine: boolean;
  onToggleRoutine: (exercise: Exercise) => void;
  onPlaySingleExercise?: (exercise: Exercise) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  activeMode,
  isInRoutine,
  onToggleRoutine,
  onPlaySingleExercise
}) => {
  const [selectedMode, setSelectedMode] = useState<TrainingMode>(activeMode);
  
  // Embedded rest timer state
  const [timerDuration, setTimerDuration] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (exercise) {
      setSelectedMode(activeMode);
      const protocol = activeMode === 'endurance' 
        ? exercise.goalProtocols.endurance 
        : exercise.goalProtocols.strength;
      const defaultRest = protocol?.restSeconds || 60;
      setTimerDuration(defaultRest);
      setTimeLeft(defaultRest);
      setIsTimerRunning(false);
    }
  }, [exercise, activeMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playTimerChime();
            setIsTimerRunning(false);
            return 0;
          }
          if (prev <= 4) {
            playTickSound();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  if (!exercise) return null;

  const strengthProto = exercise.goalProtocols.strength;
  const enduranceProto = exercise.goalProtocols.endurance;
  const timerProgress = timerDuration > 0 ? ((timerDuration - timeLeft) / timerDuration) * 100 : 0;

  const startTimerPreset = (seconds: number) => {
    setTimerDuration(seconds);
    setTimeLeft(seconds);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerDuration);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2 truncate pr-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 shrink-0">
              {exercise.equipment}
            </span>
            <h2 className="text-lg font-bold text-white truncate">
              {exercise.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Movement Illustration & Anatomy Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ExerciseAnimation exercise={exercise} heightClass="h-52" />

            {/* Targeted Anatomy Overview */}
            <div className="flex flex-col justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                  Targeted Anatomy
                </span>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-cyan-300 block mb-1">
                      Primary Drivers:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exercise.primaryMuscles.map(mId => (
                        <div
                          key={mId}
                          className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-xs font-semibold text-cyan-200"
                        >
                          {MUSCLES[mId]?.name}
                          <span className="text-[10px] text-cyan-400/80 block font-normal">
                            {MUSCLES[mId]?.latinName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {exercise.secondaryMuscles.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-slate-400 block mb-1">
                        Synergists & Stabilizers:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {exercise.secondaryMuscles.map(mId => (
                          <span
                            key={mId}
                            className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                          >
                            {MUSCLES[mId]?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <span>Mechanics: <strong className="text-slate-200">{exercise.mechanics}</strong></span>
                <span>Difficulty: <strong className="text-slate-200">{exercise.difficulty}</strong></span>
              </div>
            </div>
          </div>

          {/* Mode Selector (Strength / Endurance / Both) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Prescription Protocols
              </span>
              <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg">
                {(['strength', 'endurance', 'both'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setSelectedMode(mode);
                      const rest = mode === 'endurance' ? enduranceProto.restSeconds : strengthProto.restSeconds;
                      setTimerDuration(rest);
                      setTimeLeft(rest);
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize ${
                      selectedMode === mode
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode === 'both' ? 'Both Modes' : mode}
                  </button>
                ))}
              </div>
            </div>

            {/* PROTOCOL CARDS */}
            {selectedMode === 'strength' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/40">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-2">
                  Strength Focus Protocol
                </span>
                <div className="grid grid-cols-3 gap-3 text-center mb-2">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Sets</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">{strengthProto.sets}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Reps</span>
                    <span className="text-lg font-bold text-cyan-300 font-mono tabular-nums">{strengthProto.reps}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Rest Period</span>
                    <span className="text-lg font-bold text-slate-200 font-mono tabular-nums">{strengthProto.restSeconds}s</span>
                  </div>
                </div>
                <p className="text-xs text-cyan-200/90 text-center font-medium mt-1">
                  {strengthProto.description}
                </p>
              </div>
            )}

            {selectedMode === 'endurance' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-800/40">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-2">
                  Endurance Focus Protocol
                </span>
                <div className="grid grid-cols-3 gap-3 text-center mb-2">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Sets</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">{enduranceProto.sets}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      {enduranceProto.isTimed ? 'Duration (Minutes)' : 'Reps'}
                    </span>
                    <span className="text-lg font-bold text-emerald-300 font-mono tabular-nums">
                      {enduranceProto.durationDisplay || enduranceProto.reps}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Rest Period</span>
                    <span className="text-lg font-bold text-slate-200 font-mono tabular-nums">{enduranceProto.restSeconds}s</span>
                  </div>
                </div>
                <p className="text-xs text-emerald-200/90 text-center font-medium mt-1">
                  {enduranceProto.description}
                </p>
              </div>
            )}

            {selectedMode === 'both' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-cyan-300 font-bold block">1. Strength Block</span>
                  <div className="text-sm font-bold text-white font-mono">
                    {strengthProto.sets} sets × {strengthProto.reps}
                  </div>
                  <div className="text-[11px] text-slate-400">Rest: {strengthProto.restSeconds}s · {strengthProto.description}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-emerald-300 font-bold block">2. Endurance Burnout</span>
                  <div className="text-sm font-bold text-white font-mono">
                    {enduranceProto.sets} sets × {enduranceProto.durationDisplay || enduranceProto.reps}
                  </div>
                  <div className="text-[11px] text-slate-400">Rest: {enduranceProto.restSeconds}s · {enduranceProto.description}</div>
                </div>
              </div>
            )}
          </div>

          {/* Form Instructions: Setup & Execution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>1. Setup & Stance</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {exercise.setupSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-mono font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-cyan-400" />
                <span>2. Execution</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {exercise.executionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-mono font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coaching Cues & Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Key Coaching Cues</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {exercise.coachingCues.map((cue, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Mistakes to Avoid</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {exercise.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rest Timer */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Rest Timer
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[45, 60, 90, 120].map(sec => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => startTimerPreset(sec)}
                    className="px-2 py-1 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-extrabold font-mono text-cyan-300 tabular-nums">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-300 ease-linear"
                    style={{ width: `${timerProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md">
          <div className="text-xs text-slate-400">
            {isInRoutine ? 'Present in your current workout routine' : 'Not yet added to routine'}
          </div>

          <div className="flex items-center gap-2">
            {onPlaySingleExercise && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPlaySingleExercise(exercise);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-cyan-300" />
                <span>Play Live Set</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleRoutine(exercise)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isInRoutine
                  ? 'bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-300'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {isInRoutine ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Remove from Routine</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My Routine</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { WorkoutRoutine, RoutineExercise } from '../../types/fitness';
import { MUSCLES } from '../../data/muscles';
import { ExerciseAnimation } from '../ExerciseAnimation';
import { playTimerChime, playTickSound } from '../../utils/audio';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Check,
  X,
  RotateCcw,
  Clock,
  Dumbbell,
  Sparkles,
  Volume2
} from 'lucide-react';

interface WorkoutPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: WorkoutRoutine;
  onWorkoutComplete?: () => void;
}

type PlayerPhase = 'exercise' | 'rest' | 'finished';

export const WorkoutPlayerModal: React.FC<WorkoutPlayerModalProps> = ({
  isOpen,
  onClose,
  routine,
  onWorkoutComplete
}) => {
  const [currentExIndex, setCurrentExIndex] = useState<number>(0);
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
  const [phase, setPhase] = useState<PlayerPhase>('exercise');
  
  // Timer states
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [targetDuration, setTargetDuration] = useState<number>(60);
  const [totalElapsedWorkoutSeconds, setTotalElapsedWorkoutSeconds] = useState<number>(0);

  const currentItem: RoutineExercise | undefined = routine.exercises[currentExIndex];
  const nextItem: RoutineExercise | undefined = routine.exercises[currentExIndex + 1];

  // Initialize or reset when modal opens
  useEffect(() => {
    if (isOpen && routine.exercises.length > 0) {
      setCurrentExIndex(0);
      setCurrentSetIndex(0);
      setPhase('exercise');
      setIsPaused(false);
      setTotalElapsedWorkoutSeconds(0);
      setupCurrentPhase('exercise', 0, 0);
    }
  }, [isOpen, routine]);

  // Overall workout stopwatch
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isOpen && phase !== 'finished' && !isPaused) {
      timer = setInterval(() => {
        setTotalElapsedWorkoutSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, phase, isPaused]);

  // Countdown timer for timed exercises or rest intervals
  useEffect(() => {
    let countdown: ReturnType<typeof setInterval> | null = null;
    const shouldTick = isOpen && !isPaused && (phase === 'rest' || (phase === 'exercise' && currentItem?.isTimed));

    if (shouldTick && secondsRemaining > 0) {
      countdown = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            playTimerChime();
            handleTimerComplete();
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
      if (countdown) clearInterval(countdown);
    };
  }, [isOpen, isPaused, phase, secondsRemaining, currentItem]);

  if (!isOpen || routine.exercises.length === 0) return null;

  function setupCurrentPhase(nextPhase: PlayerPhase, exIdx: number, setIdx: number) {
    setPhase(nextPhase);
    const item = routine.exercises[exIdx];
    if (!item) {
      setPhase('finished');
      playTimerChime();
      return;
    }

    if (nextPhase === 'exercise') {
      if (item.isTimed && item.durationSeconds) {
        setTargetDuration(item.durationSeconds);
        setSecondsRemaining(item.durationSeconds);
      } else {
        setTargetDuration(0);
        setSecondsRemaining(0);
      }
    } else if (nextPhase === 'rest') {
      const restTime = item.customRestSeconds || 60;
      setTargetDuration(restTime);
      setSecondsRemaining(restTime);
    }
  }

  function handleCompleteSet() {
    if (!currentItem) return;
    playTickSound();

    const isLastSetOfExercise = currentSetIndex >= currentItem.customSets - 1;
    const isLastExercise = currentExIndex >= routine.exercises.length - 1;

    if (isLastSetOfExercise && isLastExercise) {
      // Workout Finished!
      setPhase('finished');
      playTimerChime();
      onWorkoutComplete?.();
      return;
    }

    // Start rest period
    setupCurrentPhase('rest', currentExIndex, currentSetIndex);
  }

  function handleTimerComplete() {
    if (phase === 'exercise') {
      // Timed exercise finished its set
      handleCompleteSet();
    } else if (phase === 'rest') {
      // Rest period finished -> Advance to next set or next exercise
      handleSkipRest();
    }
  }

  function handleSkipRest() {
    if (!currentItem) return;
    const isLastSetOfExercise = currentSetIndex >= currentItem.customSets - 1;

    if (isLastSetOfExercise) {
      // Advance to next exercise
      const nextExIdx = currentExIndex + 1;
      setCurrentExIndex(nextExIdx);
      setCurrentSetIndex(0);
      setupCurrentPhase('exercise', nextExIdx, 0);
    } else {
      // Advance to next set of current exercise
      const nextSetIdx = currentSetIndex + 1;
      setCurrentSetIndex(nextSetIdx);
      setupCurrentPhase('exercise', currentExIndex, nextSetIdx);
    }
  }

  function handlePrevExercise() {
    if (currentExIndex > 0) {
      const prevIdx = currentExIndex - 1;
      setCurrentExIndex(prevIdx);
      setCurrentSetIndex(0);
      setupCurrentPhase('exercise', prevIdx, 0);
    }
  }

  function handleNextExercise() {
    if (currentExIndex < routine.exercises.length - 1) {
      const nextIdx = currentExIndex + 1;
      setCurrentExIndex(nextIdx);
      setCurrentSetIndex(0);
      setupCurrentPhase('exercise', nextIdx, 0);
    } else {
      setPhase('finished');
      playTimerChime();
    }
  }

  function adjustRest(seconds: number) {
    setSecondsRemaining(prev => Math.max(5, prev + seconds));
  }

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = targetDuration > 0
    ? ((targetDuration - secondsRemaining) / targetDuration) * 100
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-bold">
                Live Workout Player
              </span>
              <h2 className="text-sm font-bold text-white truncate max-w-xs">
                {routine.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Total Elapsed Workout Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formatTime(totalElapsedWorkoutSeconds)}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Exit Workout Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FINISHED STATE */}
        {phase === 'finished' ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl shadow-emerald-500/20">
              <Sparkles className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white font-display">
                Workout Session Complete!
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Incredible effort! You finished all planned exercises and sets in {formatTime(totalElapsedWorkoutSeconds)}.
              </p>
            </div>

            {/* Session Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Total Exercises</span>
                <span className="text-xl font-bold text-white">{routine.exercises.length}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Total Duration</span>
                <span className="text-xl font-bold text-cyan-300">{formatTime(totalElapsedWorkoutSeconds)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full max-w-sm py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-transform active:scale-95"
            >
              Return to Exercise Directory
            </button>
          </div>
        ) : (
          /* ACTIVE EXERCISE & REST PHASES */
          <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
            
            {/* Exercise Header & Progress Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
              <span className="font-mono">
                Exercise <strong className="text-white">{currentExIndex + 1}</strong> of <strong className="text-white">{routine.exercises.length}</strong>
              </span>
              <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold">
                <span>Set {currentSetIndex + 1} of {currentItem?.customSets}</span>
              </div>
            </div>

            {/* REST PHASE OVERLAY */}
            {phase === 'rest' ? (
              <div className="p-8 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/40 text-center space-y-5 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Rest Period Active</span>
                </div>

                {/* Big Rest Countdown Timer */}
                <div className="space-y-1">
                  <div className="text-6xl sm:text-7xl font-black font-mono text-white tracking-tight tabular-nums">
                    {formatTime(secondsRemaining)}
                  </div>
                  <span className="text-xs text-slate-400 block">
                    Catch your breath before next set
                  </span>
                </div>

                {/* Rest Controls: -15s, Pause, +15s, Skip */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => adjustRest(-15)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold"
                  >
                    -15s
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    {isPaused ? <Play className="w-5 h-5 fill-white" /> : <Pause className="w-5 h-5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustRest(15)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold"
                  >
                    +15s
                  </button>

                  <button
                    type="button"
                    onClick={handleSkipRest}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                  >
                    <span>Skip Rest</span>
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE EXERCISE VIEW */
              <div className="space-y-5">
                
                {/* Animation Canvas */}
                {currentItem && (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/70 p-2">
                    <ExerciseAnimation exercise={currentItem.exercise} heightClass="h-48 sm:h-56" />
                  </div>
                )}

                {/* Exercise Details Card */}
                {currentItem && (
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono mb-0.5">
                          <span>{currentItem.exercise.equipment}</span>
                          <span>·</span>
                          <span>{currentItem.exercise.mechanics}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {currentItem.exercise.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Targeting: {currentItem.exercise.primaryMuscles.map(m => MUSCLES[m]?.name).join(', ')}
                        </p>
                      </div>

                      {/* Reps / Time Prescription Display */}
                      <div className="text-right shrink-0">
                        {currentItem.isTimed ? (
                          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-center">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-semibold">
                              Timed Duration
                            </span>
                            <span className="text-xl font-black font-mono text-white tabular-nums">
                              {currentItem.exercise.goalProtocols.endurance?.durationDisplay || '1 min'}
                            </span>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                              Target Reps
                            </span>
                            <span className="text-xl font-black font-mono text-cyan-300 tabular-nums">
                              {currentItem.customReps}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Key Cue Reminder */}
                    <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span><strong>Key Cue:</strong> {currentItem.exercise.coachingCues[0]}</span>
                    </div>

                    {/* IF BODYWEIGHT TIMED EXERCISE: COUNTDOWN TIMER */}
                    {currentItem.isTimed && (
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-cyan-400" />
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 block">Set Time Remaining</span>
                            <span className="text-2xl font-black font-mono text-white tabular-nums">
                              {formatTime(secondsRemaining)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPaused(!isPaused)}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                          >
                            {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSecondsRemaining(currentItem.durationSeconds || 60)}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                            title="Reset Timer"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* Up Next Preview */}
            {nextItem && phase === 'exercise' && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <span className="truncate pr-2">
                  Up Next: <strong className="text-slate-200">{nextItem.exercise.name}</strong>
                </span>
                <span className="font-mono text-slate-400 shrink-0">
                  {nextItem.customSets} sets · {nextItem.isTimed ? (nextItem.exercise.goalProtocols.endurance?.durationDisplay || '1 min') : nextItem.customReps}
                </span>
              </div>
            )}

          </div>
        )}

        {/* Bottom Control Bar */}
        {phase !== 'finished' && (
          <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevExercise}
              disabled={currentExIndex === 0}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Exercise"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            {phase === 'exercise' ? (
              <button
                type="button"
                onClick={handleCompleteSet}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>
                  {currentItem?.isTimed
                    ? `Finish Set (${currentSetIndex + 1}/${currentItem.customSets})`
                    : `Complete Set (${currentSetIndex + 1}/${currentItem?.customSets})`}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSkipRest}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20"
              >
                <span>Ready for Next Set</span>
                <SkipForward className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleNextExercise}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Skip to Next Exercise"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

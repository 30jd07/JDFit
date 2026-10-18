import React from 'react';
import { WorkoutRoutine } from '../../types/fitness';
import { MUSCLES } from '../../data/muscles';
import { playTickSound } from '../../utils/audio';
import {
  X,
  Trash2,
  Share2,
  Check,
  Plus,
  Minus,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Dumbbell,
  Play
} from 'lucide-react';

interface ActiveRoutineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  routine: WorkoutRoutine;
  onUpdateRoutine: (updated: WorkoutRoutine) => void;
  onOpenPlayer: () => void;
  onOpenGenerator: () => void;
  onStartRestTimer: (seconds: number) => void;
}

export const ActiveRoutineDrawer: React.FC<ActiveRoutineDrawerProps> = ({
  isOpen,
  onClose,
  routine,
  onUpdateRoutine,
  onOpenPlayer,
  onOpenGenerator,
  onStartRestTimer
}) => {
  if (!isOpen) return null;

  const totalSets = routine.exercises.reduce((acc, ex) => acc + ex.customSets, 0);
  const completedSetsCount = routine.exercises.reduce(
    (acc, ex) => acc + ex.completedSets.filter(Boolean).length,
    0
  );
  const completionPercentage = totalSets > 0 ? Math.round((completedSetsCount / totalSets) * 100) : 0;

  const handleToggleSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...routine.exercises];
    const targetEx = { ...updatedExercises[exerciseIndex] };
    const sets = [...targetEx.completedSets];

    const isMarkingComplete = !sets[setIndex];
    sets[setIndex] = isMarkingComplete;
    targetEx.completedSets = sets;
    updatedExercises[exerciseIndex] = targetEx;

    if (isMarkingComplete) {
      playTickSound();
      onStartRestTimer(targetEx.customRestSeconds || 60);
    }

    onUpdateRoutine({
      ...routine,
      exercises: updatedExercises
    });
  };

  const handleUpdateSetsCount = (exerciseIndex: number, delta: number) => {
    const updatedExercises = [...routine.exercises];
    const target = { ...updatedExercises[exerciseIndex] };
    const newSets = Math.max(1, Math.min(10, target.customSets + delta));

    let completed = [...target.completedSets];
    if (newSets > completed.length) {
      completed = [...completed, ...new Array(newSets - completed.length).fill(false)];
    } else {
      completed = completed.slice(0, newSets);
    }

    target.customSets = newSets;
    target.completedSets = completed;
    updatedExercises[exerciseIndex] = target;

    onUpdateRoutine({
      ...routine,
      exercises: updatedExercises
    });
  };

  const handleUpdateReps = (exerciseIndex: number, newReps: string) => {
    const updatedExercises = [...routine.exercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      customReps: newReps
    };
    onUpdateRoutine({ ...routine, exercises: updatedExercises });
  };

  const handleUpdateWeight = (exerciseIndex: number, weight: number | undefined) => {
    const updatedExercises = [...routine.exercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      weightLbs: weight
    };
    onUpdateRoutine({ ...routine, exercises: updatedExercises });
  };

  const handleRemoveExercise = (exerciseIndex: number) => {
    const updatedExercises = routine.exercises.filter((_, idx) => idx !== exerciseIndex);
    onUpdateRoutine({
      ...routine,
      exercises: updatedExercises
    });
  };

  const handleMoveExercise = (fromIdx: number, direction: 'up' | 'down') => {
    const toIdx = direction === 'up' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= routine.exercises.length) return;

    const list = [...routine.exercises];
    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);

    onUpdateRoutine({
      ...routine,
      exercises: list
    });
  };

  const handleClearRoutine = () => {
    onUpdateRoutine({
      ...routine,
      exercises: []
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div
        className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full animate-[slideIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-base font-bold text-white truncate">
                {routine.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {routine.exercises.length} exercises · ~{routine.estimatedMinutes} mins
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {routine.exercises.length > 0 && (
              <button
                type="button"
                onClick={onOpenPlayer}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                title="Play exercises sequentially"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Play</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workout Progress Bar */}
        {routine.exercises.length > 0 && (
          <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Workout Completion</span>
                <span className="font-mono text-cyan-300 tabular-nums">
                  {completedSetsCount} / {totalSets} sets ({completionPercentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Exercises Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {routine.exercises.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Your Workout is Empty
                </h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Browse exercises from the interactive body map or click below to automatically generate a complete balanced gym routine.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenGenerator}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Build My Workout</span>
              </button>
            </div>
          ) : (
            routine.exercises.map((item, exIdx) => {
              const ex = item.exercise;
              const isTimed = item.isTimed || ex.equipment === 'Bodyweight';
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-3"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
                        <span>#{exIdx + 1}</span>
                        <span>·</span>
                        <span>{ex.equipment}</span>
                        {isTimed && <span className="text-emerald-400 font-bold">· Timed</span>}
                      </div>
                      <h4 className="text-sm font-bold text-white truncate">
                        {ex.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {ex.primaryMuscles.map(m => MUSCLES[m]?.name).join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveExercise(exIdx, 'up')}
                        disabled={exIdx === 0}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveExercise(exIdx, 'down')}
                        disabled={exIdx === routine.exercises.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(exIdx)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors ml-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sets / Reps / Weight Controls Strip */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {/* Sets Adjustment */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400">Sets</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateSetsCount(exIdx, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold font-mono tabular-nums text-white">
                          {item.customSets}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateSetsCount(exIdx, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Reps or Timed Minutes Input */}
                    <div className="flex flex-col justify-center p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 mb-0.5">
                        {isTimed ? 'Duration (Mins)' : 'Target Reps'}
                      </span>
                      <input
                        type="text"
                        value={item.customReps}
                        onChange={e => handleUpdateReps(exIdx, e.target.value)}
                        className="bg-transparent text-cyan-300 font-mono font-bold text-xs focus:outline-none"
                        placeholder={isTimed ? '1 min' : '8-12 reps'}
                      />
                    </div>

                    {/* Weight Log input */}
                    <div className="flex flex-col justify-center p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 mb-0.5">Weight (lbs)</span>
                      <input
                        type="number"
                        value={item.weightLbs || ''}
                        onChange={e => handleUpdateWeight(exIdx, e.target.value ? Number(e.target.value) : undefined)}
                        className="bg-transparent text-slate-200 font-mono font-bold text-xs focus:outline-none"
                        placeholder={ex.equipment === 'Bodyweight' ? 'BW' : '135'}
                      />
                    </div>
                  </div>

                  {/* Interactive Set Checklist Row */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                      Active Set Log (Tap to check off)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: item.customSets }).map((_, setIdx) => {
                        const isDone = item.completedSets[setIdx] || false;
                        return (
                          <button
                            key={setIdx}
                            type="button"
                            onClick={() => handleToggleSet(exIdx, setIdx)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all ${
                              isDone
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
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

                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Actions: PLAY WORKOUT! */}
        {routine.exercises.length > 0 && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearRoutine}
              className="px-3 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={onOpenPlayer}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Play Workout (Step-by-Step)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

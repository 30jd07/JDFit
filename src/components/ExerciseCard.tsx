import React from 'react';
import { Exercise, TrainingMode, MuscleId } from '../types/fitness';
import { MUSCLES } from '../data/muscles';
import { ExerciseAnimation } from './ExerciseAnimation';
import { Plus, Check, Info, Dumbbell, Clock } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  trainingMode: TrainingMode;
  isInRoutine: boolean;
  onAddToRoutine: (exercise: Exercise) => void;
  onOpenDetails: (exercise: Exercise) => void;
  onToggleMuscle?: (muscle: MuscleId) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  trainingMode,
  isInRoutine,
  onAddToRoutine,
  onOpenDetails,
  onToggleMuscle
}) => {
  const strengthProtocol = exercise.goalProtocols.strength;
  const enduranceProtocol = exercise.goalProtocols.endurance;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40';
      case 'Intermediate':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/40';
      case 'Advanced':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/40';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="group relative flex flex-col bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-cyan-950/20">
      
      {/* Exercise Animation Preview Header */}
      <div className="p-3 bg-slate-950/50 border-b border-slate-800/80">
        <ExerciseAnimation exercise={exercise} heightClass="h-40" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 justify-between gap-4">
        <div>
          {/* Header row: Equipment & Difficulty */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Dumbbell className="w-3.5 h-3.5 text-cyan-400" />
              <span>{exercise.equipment}</span>
              {exercise.equipment === 'Bodyweight' && (
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.2 rounded font-mono">
                  Calisthenics
                </span>
              )}
            </span>

            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
          </div>

          {/* Exercise Title */}
          <h3
            onClick={() => onOpenDetails(exercise)}
            className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
          >
            {exercise.name}
          </h3>

          {/* Targeted Muscles Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {exercise.primaryMuscles.map(mId => (
              <button
                key={mId}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMuscle?.(mId);
                }}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 hover:bg-cyan-900 transition-colors"
                title={`Filter by: ${MUSCLES[mId]?.name}`}
              >
                {MUSCLES[mId]?.name}
              </button>
            ))}

            {exercise.secondaryMuscles.slice(0, 2).map(mId => (
              <span
                key={mId}
                className="text-[11px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/60"
              >
                {MUSCLES[mId]?.name}
              </span>
            ))}
          </div>

          {/* Coaching Cues snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-2.5 leading-relaxed">
            {exercise.coachingCues[0]}
          </p>
        </div>

        {/* Goal Protocol Strip (Strength / Endurance / Both) */}
        <div className="pt-3 border-t border-slate-800/80">
          
          {/* SINGLE MODE: STRENGTH */}
          {trainingMode === 'strength' && (
            <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 text-center mb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Sets</span>
                <span className="text-sm font-bold text-white font-mono tabular-nums">{strengthProtocol.sets}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Reps</span>
                <span className="text-sm font-bold text-cyan-300 font-mono tabular-nums truncate px-1">
                  {strengthProtocol.reps}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Rest</span>
                <span className="text-sm font-bold text-slate-300 font-mono tabular-nums">{strengthProtocol.restSeconds}s</span>
              </div>
            </div>
          )}

          {/* SINGLE MODE: ENDURANCE (Minutes if bodyweight timed, or reps) */}
          {trainingMode === 'endurance' && (
            <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 text-center mb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Sets</span>
                <span className="text-sm font-bold text-white font-mono tabular-nums">{enduranceProtocol.sets}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                  {enduranceProtocol.isTimed ? 'Duration' : 'Reps'}
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums truncate px-1">
                  {enduranceProtocol.durationDisplay || enduranceProtocol.reps}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Rest</span>
                <span className="text-sm font-bold text-slate-300 font-mono tabular-nums">{enduranceProtocol.restSeconds}s</span>
              </div>
            </div>
          )}

          {/* DUAL MODE: BOTH (Strength & Endurance) */}
          {trainingMode === 'both' && (
            <div className="flex flex-col gap-1.5 p-2 rounded-xl bg-slate-950/70 border border-slate-800/60 text-xs mb-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 font-mono text-[11px]">Strength:</span>
                <span className="text-slate-300 font-mono text-[11px] tabular-nums">
                  {strengthProtocol.sets} sets × {strengthProtocol.reps} ({strengthProtocol.restSeconds}s rest)
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                <span className="font-bold text-emerald-400 font-mono text-[11px]">Endurance:</span>
                <span className="text-slate-300 font-mono text-[11px] tabular-nums">
                  {enduranceProtocol.sets} sets × {enduranceProtocol.durationDisplay || enduranceProtocol.reps} ({enduranceProtocol.restSeconds}s rest)
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDetails(exercise)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-slate-200 text-xs font-semibold transition-colors border border-slate-700/60"
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Details & Form</span>
            </button>

            <button
              type="button"
              onClick={() => onAddToRoutine(exercise)}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                isInRoutine
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/10'
              }`}
              title={isInRoutine ? 'Added to Workout' : 'Add to Workout'}
            >
              {isInRoutine ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

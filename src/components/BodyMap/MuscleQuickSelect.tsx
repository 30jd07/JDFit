import React from 'react';
import { MuscleId, BodyRegion } from '../../types/fitness';
import { MUSCLES } from '../../data/muscles';
import { EXERCISES } from '../../data/exercises';
import { Check } from 'lucide-react';

interface MuscleQuickSelectProps {
  selectedMuscles: MuscleId[];
  onToggleMuscle: (muscle: MuscleId) => void;
  activeRegion: BodyRegion | 'all';
  onChangeRegion: (region: BodyRegion | 'all') => void;
}

export const MuscleQuickSelect: React.FC<MuscleQuickSelectProps> = ({
  selectedMuscles,
  onToggleMuscle,
  activeRegion,
  onChangeRegion
}) => {
  const allMuscles = Object.values(MUSCLES);

  const filteredMuscles = activeRegion === 'all'
    ? allMuscles
    : allMuscles.filter(m => m.region === activeRegion);

  const getExerciseCount = (muscleId: MuscleId) => {
    return EXERCISES.filter(
      e => e.primaryMuscles.includes(muscleId) || e.secondaryMuscles.includes(muscleId)
    ).length;
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Region Filter Segmented Control */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
        {(['all', 'upper', 'lower', 'core'] as const).map(reg => (
          <button
            key={reg}
            type="button"
            onClick={() => onChangeRegion(reg)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap capitalize ${
              activeRegion === reg
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {reg === 'all' ? 'All Anatomy' : `${reg} Body`}
          </button>
        ))}
      </div>

      {/* Muscle Buttons Grid (with checkboxes) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {filteredMuscles.map(m => {
          const isSelected = selectedMuscles.includes(m.id);
          const count = getExerciseCount(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onToggleMuscle(m.id)}
              className={`flex items-center justify-between p-2 rounded-xl text-left border transition-all text-xs ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-1">
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                  isSelected ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className="truncate">{m.name}</span>
              </div>
              <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MuscleId, Equipment, Difficulty, TrainingMode, WorkoutRoutine } from '../../types/fitness';
import { MUSCLES } from '../../data/muscles';
import { EXERCISES, SPLIT_PRESETS } from '../../data/exercises';
import { Sparkles, X, Check, Dumbbell, Clock } from 'lucide-react';

interface WorkoutGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRoutine: (routine: WorkoutRoutine) => void;
}

export const WorkoutGeneratorModal: React.FC<WorkoutGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyRoutine
}) => {
  const [selectedSplitPresetId, setSelectedSplitPresetId] = useState<string>('ppl-push');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customMuscles, setCustomMuscles] = useState<MuscleId[]>(['chest', 'shoulders', 'triceps']);
  const [duration, setDuration] = useState<number>(60);
  const [mode, setMode] = useState<TrainingMode>('strength');
  const [experience, setExperience] = useState<Difficulty>('Intermediate');
  
  const allEquipment: Equipment[] = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>(allEquipment);

  if (!isOpen) return null;

  const toggleEquipment = (eq: Equipment) => {
    setSelectedEquipment(prev =>
      prev.includes(eq)
        ? prev.length > 1 ? prev.filter(e => e !== eq) : prev
        : [...prev, eq]
    );
  };

  const toggleCustomMuscle = (m: MuscleId) => {
    setCustomMuscles(prev =>
      prev.includes(m)
        ? prev.length > 1 ? prev.filter(id => id !== m) : prev
        : [...prev, m]
    );
  };

  const handleGenerate = () => {
    let targetMuscles: MuscleId[] = [];
    let title = 'Custom Workout Routine';
    let splitType: WorkoutRoutine['splitType'] = 'Custom';

    if (!isCustomMode) {
      const preset = SPLIT_PRESETS.find(p => p.id === selectedSplitPresetId);
      if (preset) {
        targetMuscles = [...preset.targetMuscles];
        title = preset.name;
        splitType = preset.category as WorkoutRoutine['splitType'];
      }
    } else {
      targetMuscles = customMuscles;
      title = `${customMuscles.map(m => MUSCLES[m]?.name).join(' & ')} Workout`;
      splitType = 'Custom';
    }

    const eligibleExercises = EXERCISES.filter(ex => {
      const hitsMuscle = ex.primaryMuscles.some(m => targetMuscles.includes(m));
      const hasEquipment = selectedEquipment.includes(ex.equipment);
      return hitsMuscle && hasEquipment;
    });

    const sorted = [...eligibleExercises].sort((a, b) => {
      if (a.mechanics === 'Compound' && b.mechanics !== 'Compound') return -1;
      if (b.mechanics === 'Compound' && a.mechanics !== 'Compound') return 1;
      return 0;
    });

    const exerciseCount = Math.max(3, Math.min(7, Math.round(duration / 10)));
    const chosen = sorted.slice(0, exerciseCount);
    const finalExercises = chosen.length > 0 ? chosen : EXERCISES.slice(0, exerciseCount);

    const routine: WorkoutRoutine = {
      id: `routine-${Date.now()}`,
      title,
      description: `${experience} ${mode.toUpperCase()} session targeting ${targetMuscles.map(m => MUSCLES[m]?.name).join(', ')}.`,
      splitType,
      targetMuscles,
      estimatedMinutes: duration,
      createdAt: new Date().toISOString(),
      exercises: finalExercises.map(ex => {
        const protocol = mode === 'endurance' 
          ? ex.goalProtocols.endurance 
          : ex.goalProtocols.strength;
        const isTimed = protocol.isTimed || ex.equipment === 'Bodyweight';
        return {
          id: `${ex.id}-${Date.now()}-${Math.random()}`,
          exercise: ex,
          customSets: protocol.sets,
          customReps: isTimed ? (protocol.durationDisplay || '1 min') : protocol.reps,
          isTimed,
          durationSeconds: protocol.durationSeconds || (isTimed ? 60 : undefined),
          customRestSeconds: protocol.restSeconds,
          completedSets: new Array(protocol.sets).fill(false)
        };
      })
    };

    onApplyRoutine(routine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Build My Workout Routine
              </h2>
              <p className="text-xs text-slate-400">
                Generate an evidence-based gym split tailored to your equipment, muscles, and mode
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Split Mode Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Split Strategy
              </label>
              <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    !isCustomMode ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Curated Splits
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomMode(true)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    isCustomMode ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pick Multiple Muscles
                </button>
              </div>
            </div>

            {!isCustomMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SPLIT_PRESETS.map(preset => {
                  const isSelected = selectedSplitPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedSplitPresetId(preset.id)}
                      className={`flex flex-col text-left p-3 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-950/20'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{preset.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {preset.defaultMinutes}m
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {preset.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-2 font-medium">
                  Select multiple target body parts for this workout:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {Object.values(MUSCLES).map(m => {
                    const isChecked = customMuscles.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleCustomMuscle(m.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left border text-xs transition-colors ${
                          isChecked
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                          isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Training Mode: Strength / Endurance / Both */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Training Mode Protocol
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl">
              {(['strength', 'endurance', 'both'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all capitalize ${
                    mode === m
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m === 'both' ? 'Both (Hybrid)' : m}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pl-1">
              {mode === 'strength' && '• Heavy loads (3-5 reps, 2-3m rest) prioritizing maximum force production.'}
              {mode === 'endurance' && '• High reps (15-20 reps) & timed minutes for bodyweight exercises (30-45s rest).'}
              {mode === 'both' && '• Combined hybrid training: strength compound lifts followed by endurance metabolic volume.'}
            </p>
          </div>

          {/* Duration & Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Session Duration
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                {[30, 45, 60, 75].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDuration(m)}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all font-mono tabular-nums ${
                      duration === m
                        ? 'bg-slate-800 text-cyan-300 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Available Equipment
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allEquipment.map(eq => {
                  const active = selectedEquipment.includes(eq);
                  return (
                    <button
                      key={eq}
                      type="button"
                      onClick={() => toggleEquipment(eq)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        active
                          ? 'bg-cyan-950/60 border-cyan-600 text-cyan-200 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {eq}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Generate Routine</span>
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calculator, X, Dumbbell, Info } from 'lucide-react';

interface OneRepMaxCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OneRepMaxCalculator: React.FC<OneRepMaxCalculatorProps> = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState<number>(185);
  const [reps, setReps] = useState<number>(6);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  if (!isOpen) return null;

  // Brzycki formula: 1RM = Weight × (36 / (37 - Reps))
  // Epley formula: 1RM = Weight × (1 + 0.0333 × Reps)
  const validReps = Math.max(1, Math.min(30, reps));
  const validWeight = Math.max(0, weight);

  const brzycki = Math.round(validWeight * (36 / (37 - validReps)));
  const epley = Math.round(validWeight * (1 + 0.0333 * validReps));
  const oneRepMax = validReps === 1 ? validWeight : Math.round((brzycki + epley) / 2);

  const percentages = [
    { pct: 95, label: 'Heavy Double (1-2 reps)' },
    { pct: 90, label: 'Strength Peak (3-4 reps)' },
    { pct: 85, label: 'Hypertrophy Power (5-6 reps)' },
    { pct: 80, label: 'Classic Hypertrophy (7-8 reps)' },
    { pct: 75, label: 'Mass Building (9-10 reps)' },
    { pct: 70, label: 'High Volume (11-12 reps)' },
    { pct: 60, label: 'Warmup / Endurance (15+ reps)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                One-Rep Max (1RM) Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Scientific estimation using averaged Brzycki & Epley formulas
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

        {/* Inputs */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Lifted Weight ({unit})
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="1500"
                  value={weight || ''}
                  onChange={e => setWeight(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setUnit(unit === 'lbs' ? 'kg' : 'lbs')}
                  className="absolute right-2 top-2 px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-cyan-300"
                >
                  {unit}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Reps Completed
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={reps || ''}
                onChange={e => setReps(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-800/60 text-center">
            <span className="text-[11px] uppercase font-mono tracking-wider text-cyan-400 block mb-1">
              Estimated 1RM
            </span>
            <div className="text-4xl font-black font-mono text-white tracking-tight">
              {oneRepMax} <span className="text-lg font-normal text-slate-400">{unit}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Calculated from {validWeight} {unit} × {validReps} reps
            </p>
          </div>

          {/* Percentage Target Matrix */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Training Load Percentages
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {percentages.map(item => {
                const targetWeight = Math.round(oneRepMax * (item.pct / 100));
                return (
                  <div
                    key={item.pct}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-400 w-10 text-right">
                        {item.pct}%
                      </span>
                      <span className="text-slate-400 truncate">{item.label}</span>
                    </div>
                    <span className="font-mono font-bold text-white tabular-nums">
                      {targetWeight} {unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MuscleId, ViewSide } from '../../types/fitness';
import { MUSCLES } from '../../data/muscles';
import { EXERCISES } from '../../data/exercises';
import { X } from 'lucide-react';

interface BodyDiagramProps {
  selectedMuscles: MuscleId[];
  onToggleMuscle: (muscle: MuscleId) => void;
  onClearMuscles: () => void;
  viewSide: ViewSide;
  onChangeViewSide: (side: ViewSide) => void;
  highlightedMuscles?: MuscleId[];
}

export const BodyDiagram: React.FC<BodyDiagramProps> = ({
  selectedMuscles,
  onToggleMuscle,
  onClearMuscles,
  viewSide,
  onChangeViewSide,
  highlightedMuscles = []
}) => {
  const [hoveredMuscle, setHoveredMuscle] = useState<MuscleId | null>(null);

  const getExerciseCount = (muscleId: MuscleId) => {
    return EXERCISES.filter(
      e => e.primaryMuscles.includes(muscleId) || e.secondaryMuscles.includes(muscleId)
    ).length;
  };

  const isMuscleSelected = (id: MuscleId) => selectedMuscles.includes(id);
  const isMuscleHovered = (id: MuscleId) => hoveredMuscle === id;
  const isMuscleHighlighted = (id: MuscleId) => highlightedMuscles.includes(id);

  const getMuscleClass = (id: MuscleId) => {
    const selected = isMuscleSelected(id);
    const hovered = isMuscleHovered(id);
    const highlighted = isMuscleHighlighted(id);

    if (selected) {
      return 'fill-cyan-400 stroke-cyan-200 stroke-[1.8] filter drop-shadow-[0_0_12px_rgba(34,211,238,0.85)] transition-all duration-200 cursor-pointer';
    }
    if (highlighted) {
      return 'fill-emerald-500/70 stroke-emerald-400 stroke-[1.5] filter drop-shadow-[0_0_6px_rgba(16,185,129,0.6)] transition-all duration-200 cursor-pointer';
    }
    if (hovered) {
      return 'fill-cyan-500/50 stroke-cyan-300 stroke-[1.5] transition-all duration-150 cursor-pointer';
    }
    return 'fill-slate-800/90 hover:fill-slate-700/90 stroke-slate-700/60 stroke-[1] transition-colors duration-150 cursor-pointer';
  };

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* View Toggle Bar (Front / Back only - Generic silhouette) */}
      <div className="flex items-center justify-between w-full max-w-sm mb-3 px-1">
        <span className="text-xs font-bold font-mono uppercase text-slate-400">
          Generic Body Model
        </span>
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            type="button"
            onClick={() => onChangeViewSide('front')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewSide === 'front'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Anterior (Front)
          </button>
          <button
            type="button"
            onClick={() => onChangeViewSide('back')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewSide === 'back'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Posterior (Back)
          </button>
        </div>
      </div>

      {/* Interactive Generic Anatomical SVG */}
      <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[300/540] flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 shadow-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 rounded-2xl pointer-events-none" />

        {/* Dynamic Tooltip Badge */}
        {hoveredMuscle && (
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between px-3 py-1.5 bg-slate-900/95 border border-cyan-500/30 rounded-lg backdrop-blur-md shadow-lg pointer-events-none transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {MUSCLES[hoveredMuscle]?.name}
              </span>
            </div>
            <span className="text-[11px] text-cyan-300 font-mono tabular-nums">
              {isMuscleSelected(hoveredMuscle) ? 'Selected (Tap to remove)' : `${getExerciseCount(hoveredMuscle)} exercises`}
            </span>
          </div>
        )}

        <svg
          viewBox="0 0 300 540"
          className="w-full h-full"
          aria-label={`Interactive human anatomical ${viewSide} body map`}
        >
          {/* Silhouette Base */}
          <g className="opacity-25 pointer-events-none">
            <circle cx="150" cy="46" r="23" className="fill-slate-700" />
            <path d="M141 68 L141 85 L159 85 L159 68 Z" className="fill-slate-700" />
          </g>

          {/* ========================================================= */}
          {/* ANTERIOR (FRONT) VIEW                                      */}
          {/* ========================================================= */}
          {viewSide === 'front' && (
            <g id="anterior-muscles">
              <circle cx="150" cy="44" r="22" className="fill-slate-800/80 stroke-slate-700 stroke-1 pointer-events-none" />

              {/* Traps */}
              <g
                onMouseEnter={() => setHoveredMuscle('traps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('traps')}
              >
                <path d="M136 68 L122 84 L140 85 L143 72 Z" className={getMuscleClass('traps')} />
                <path d="M164 68 L178 84 L160 85 L157 72 Z" className={getMuscleClass('traps')} />
              </g>

              {/* Shoulders */}
              <g
                onMouseEnter={() => setHoveredMuscle('shoulders')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('shoulders')}
              >
                <path d="M120 84 C104 88, 92 100, 91 116 C90 126, 96 135, 106 137 C112 126, 118 108, 122 88 Z" className={getMuscleClass('shoulders')} />
                <path d="M180 84 C196 88, 208 100, 209 116 C210 126, 204 135, 194 137 C188 126, 182 108, 178 88 Z" className={getMuscleClass('shoulders')} />
              </g>

              {/* Chest / Pectorals */}
              <g
                onMouseEnter={() => setHoveredMuscle('chest')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('chest')}
              >
                <path d="M148 88 L123 88 C115 102, 116 122, 122 136 C134 138, 146 132, 148 122 Z" className={getMuscleClass('chest')} />
                <path d="M152 88 L177 88 C185 102, 184 122, 178 136 C166 138, 154 132, 152 122 Z" className={getMuscleClass('chest')} />
              </g>

              {/* Biceps */}
              <g
                onMouseEnter={() => setHoveredMuscle('biceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('biceps')}
              >
                <path d="M93 124 C86 138, 88 158, 98 172 C105 168, 108 148, 106 136 Z" className={getMuscleClass('biceps')} />
                <path d="M207 124 C214 138, 212 158, 202 172 C195 168, 192 148, 194 136 Z" className={getMuscleClass('biceps')} />
              </g>

              {/* Forearms */}
              <g
                onMouseEnter={() => setHoveredMuscle('forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('forearms')}
              >
                <path d="M96 178 C88 195, 78 220, 72 244 C77 246, 84 238, 90 220 C96 205, 101 190, 103 178 Z" className={getMuscleClass('forearms')} />
                <path d="M204 178 C212 195, 222 220, 228 244 C223 246, 216 238, 210 220 C204 205, 199 190, 197 178 Z" className={getMuscleClass('forearms')} />
              </g>

              {/* Abs / Rectus Abdominis */}
              <g
                onMouseEnter={() => setHoveredMuscle('abs')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('abs')}
              >
                <rect x="135" y="140" width="13" height="15" rx="3" className={getMuscleClass('abs')} />
                <rect x="152" y="140" width="13" height="15" rx="3" className={getMuscleClass('abs')} />
                <rect x="135" y="158" width="13" height="16" rx="3" className={getMuscleClass('abs')} />
                <rect x="152" y="158" width="13" height="16" rx="3" className={getMuscleClass('abs')} />
                <path d="M135 177 L148 177 L148 206 C143 204, 137 196, 135 186 Z" className={getMuscleClass('abs')} />
                <path d="M165 177 L152 177 L152 206 C157 204, 163 196, 165 186 Z" className={getMuscleClass('abs')} />
              </g>

              {/* Obliques */}
              <g
                onMouseEnter={() => setHoveredMuscle('obliques')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('obliques')}
              >
                <path d="M120 144 C116 160, 118 180, 130 196 L131 180 C125 168, 126 154, 130 144 Z" className={getMuscleClass('obliques')} />
                <path d="M180 144 C184 160, 182 180, 170 196 L169 180 C175 168, 174 154, 170 144 Z" className={getMuscleClass('obliques')} />
              </g>

              {/* Quadriceps */}
              <g
                onMouseEnter={() => setHoveredMuscle('quadriceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('quadriceps')}
              >
                <path d="M124 216 C112 236, 110 280, 118 335 C125 344, 136 344, 142 334 C148 290, 146 242, 144 216 Z" className={getMuscleClass('quadriceps')} />
                <path d="M176 216 C188 236, 190 280, 182 335 C175 344, 164 344, 158 334 C152 290, 154 242, 156 216 Z" className={getMuscleClass('quadriceps')} />
              </g>

              {/* Calves */}
              <g
                onMouseEnter={() => setHoveredMuscle('calves')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('calves')}
              >
                <path d="M120 365 C114 390, 114 430, 125 470 L137 470 C143 430, 141 390, 136 365 Z" className={getMuscleClass('calves')} />
                <path d="M180 365 C186 390, 186 430, 175 470 L163 470 C157 430, 159 390, 164 365 Z" className={getMuscleClass('calves')} />
              </g>

              <g className="fill-slate-800/80 stroke-slate-700 stroke-1 pointer-events-none">
                <path d="M120 472 L116 498 L136 498 L136 472 Z" />
                <path d="M180 472 L184 498 L164 498 L164 472 Z" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* POSTERIOR (BACK) VIEW                                     */}
          {/* ========================================================= */}
          {viewSide === 'back' && (
            <g id="posterior-muscles">
              <circle cx="150" cy="44" r="22" className="fill-slate-800/80 stroke-slate-700 stroke-1 pointer-events-none" />

              {/* Trapezius */}
              <g
                onMouseEnter={() => setHoveredMuscle('traps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('traps')}
              >
                <path d="M150 68 L124 86 L134 122 L150 148 L166 122 L176 86 Z" className={getMuscleClass('traps')} />
              </g>

              {/* Rear Deltoids */}
              <g
                onMouseEnter={() => setHoveredMuscle('shoulders')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('shoulders')}
              >
                <path d="M122 86 C105 92, 94 104, 92 118 C92 126, 98 135, 108 137 C113 124, 118 106, 122 86 Z" className={getMuscleClass('shoulders')} />
                <path d="M178 86 C195 92, 206 104, 208 118 C208 126, 202 135, 192 137 C187 124, 182 106, 178 86 Z" className={getMuscleClass('shoulders')} />
              </g>

              {/* Upper Back / Rhomboids */}
              <g
                onMouseEnter={() => setHoveredMuscle('upper_back')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('upper_back')}
              >
                <path d="M132 104 L120 120 L132 144 L138 128 Z" className={getMuscleClass('upper_back')} />
                <path d="M168 104 L180 120 L168 144 L162 128 Z" className={getMuscleClass('upper_back')} />
              </g>

              {/* Triceps */}
              <g
                onMouseEnter={() => setHoveredMuscle('triceps')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('triceps')}
              >
                <path d="M93 124 C86 138, 88 158, 98 174 C104 168, 108 148, 107 136 Z" className={getMuscleClass('triceps')} />
                <path d="M207 124 C214 138, 212 158, 202 174 C196 168, 192 148, 193 136 Z" className={getMuscleClass('triceps')} />
              </g>

              {/* Forearms */}
              <g
                onMouseEnter={() => setHoveredMuscle('forearms')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('forearms')}
              >
                <path d="M96 178 C88 195, 78 220, 72 244 C77 246, 84 238, 90 220 C96 205, 101 190, 103 178 Z" className={getMuscleClass('forearms')} />
                <path d="M204 178 C212 195, 222 220, 228 244 C223 246, 216 238, 210 220 C204 205, 199 190, 197 178 Z" className={getMuscleClass('forearms')} />
              </g>

              {/* Lats */}
              <g
                onMouseEnter={() => setHoveredMuscle('lats')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('lats')}
              >
                <path d="M136 132 C120 134, 114 150, 116 174 C120 184, 132 186, 142 184 L146 148 Z" className={getMuscleClass('lats')} />
                <path d="M164 132 C180 134, 186 150, 184 174 C180 184, 168 186, 158 184 L154 148 Z" className={getMuscleClass('lats')} />
              </g>

              {/* Lower Back */}
              <g
                onMouseEnter={() => setHoveredMuscle('lower_back')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('lower_back')}
              >
                <path d="M142 186 L142 214 L148 214 L148 186 Z" className={getMuscleClass('lower_back')} />
                <path d="M152 186 L152 214 L158 214 L158 186 Z" className={getMuscleClass('lower_back')} />
              </g>

              {/* Glutes */}
              <g
                onMouseEnter={() => setHoveredMuscle('glutes')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('glutes')}
              >
                <path d="M149 216 C132 216, 118 226, 116 250 C114 268, 126 280, 148 280 L149 216 Z" className={getMuscleClass('glutes')} />
                <path d="M151 216 C168 216, 182 226, 184 250 C186 268, 174 280, 152 280 L151 216 Z" className={getMuscleClass('glutes')} />
              </g>

              {/* Hamstrings */}
              <g
                onMouseEnter={() => setHoveredMuscle('hamstrings')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('hamstrings')}
              >
                <path d="M120 286 C116 304, 118 334, 124 354 C132 356, 142 354, 144 340 C146 320, 146 300, 146 286 Z" className={getMuscleClass('hamstrings')} />
                <path d="M180 286 C184 304, 182 334, 176 354 C168 356, 158 354, 156 340 C154 320, 154 300, 154 286 Z" className={getMuscleClass('hamstrings')} />
              </g>

              {/* Calves */}
              <g
                onMouseEnter={() => setHoveredMuscle('calves')}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onToggleMuscle('calves')}
              >
                <path d="M118 368 C112 390, 112 418, 122 444 C128 466, 134 466, 136 444 C144 420, 144 390, 138 368 Z" className={getMuscleClass('calves')} />
                <path d="M182 368 C188 390, 188 418, 178 444 C172 466, 166 466, 164 444 C156 420, 156 390, 162 368 Z" className={getMuscleClass('calves')} />
              </g>

              <g className="fill-slate-800/80 stroke-slate-700 stroke-1 pointer-events-none">
                <path d="M122 472 L120 496 L134 496 L134 472 Z" />
                <path d="M178 472 L180 496 L166 496 L166 472 Z" />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Selected Muscles Chips List */}
      {selectedMuscles.length > 0 && (
        <div className="w-full max-w-sm mt-3 p-3 bg-slate-900/95 border border-cyan-500/30 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">
              Targeted Muscles ({selectedMuscles.length})
            </span>
            <button
              type="button"
              onClick={onClearMuscles}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Reset to Chest
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedMuscles.map(mId => (
              <button
                key={mId}
                type="button"
                onClick={() => onToggleMuscle(mId)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors group ${
                  mId === 'chest'
                    ? 'bg-cyan-900/80 border border-cyan-400 text-cyan-200'
                    : 'bg-cyan-950/90 border border-cyan-500/70 text-cyan-200 hover:bg-rose-950/60 hover:border-rose-700 hover:text-rose-300'
                }`}
                title={mId === 'chest' ? 'Chest is default anchor' : `Click to remove ${MUSCLES[mId]?.name}`}
              >
                <span>{MUSCLES[mId]?.name}</span>
                {mId !== 'chest' && <X className="w-3 h-3 text-cyan-400 group-hover:text-rose-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

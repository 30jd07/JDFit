import React, { useState } from 'react';
import { Exercise } from '../types/fitness';
import { Play, Pause } from 'lucide-react';

interface ExerciseAnimationProps {
  exercise: Exercise;
  heightClass?: string;
}

export const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({
  exercise,
  heightClass = 'h-48'
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const animStyle = isPlaying
    ? { animationPlayState: 'running' as const }
    : { animationPlayState: 'paused' as const };

  const renderAnimationContent = () => {
    switch (exercise.animationType) {
      // 1. PUSH-UP (Real floor push-up, NOT bench press!)
      case 'pushup':
        return (
          <svg viewBox="0 0 220 150" className="w-full h-full max-h-48">
            {/* Floor surface */}
            <line x1="20" y1="125" x2="200" y2="125" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            <line x1="30" y1="130" x2="190" y2="130" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" />
            
            {/* Athlete performing Push-Up */}
            <g className="animate-[pushupAnim_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes pushupAnim {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(22px); }
                }
              `}</style>
              {/* Head */}
              <circle cx="58" cy="72" r="8" fill="#94a3b8" />
              {/* Torso & rigid spine plank */}
              <line x1="66" y1="76" x2="140" y2="92" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
              {/* Pectoral & Tricep Activation Glow */}
              <circle cx="82" cy="80" r="7" className="fill-cyan-400 opacity-80 animate-pulse" />
              {/* Legs straight back */}
              <line x1="140" y1="92" x2="185" y2="122" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              {/* Feet / Toes on floor */}
              <ellipse cx="187" cy="123" rx="4" ry="3" fill="#64748b" />
              {/* Dynamic Arms bending during pushup */}
              <polyline points="82,80 72,102 70,125" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 2. PARALLEL BAR DIPS
      case 'dip':
        return (
          <svg viewBox="0 0 220 150" className="w-full h-full max-h-48">
            {/* Dip Bars */}
            <line x1="50" y1="75" x2="170" y2="75" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <line x1="65" y1="75" x2="65" y2="140" stroke="#334155" strokeWidth="5" />
            <line x1="155" y1="75" x2="155" y2="140" stroke="#334155" strokeWidth="5" />
            
            {/* Athlete dipping */}
            <g className="animate-[dipAnim_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes dipAnim {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(24px); }
                }
              `}</style>
              {/* Head */}
              <circle cx="110" cy="35" r="8" fill="#94a3b8" />
              {/* Tilted Torso */}
              <line x1="110" y1="42" x2="114" y2="88" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
              {/* Chest / Tricep glow */}
              <circle cx="112" cy="62" r="6" className="fill-cyan-400 opacity-80 animate-pulse" />
              {/* Bent Knees */}
              <polyline points="114,88 122,112 112,128" stroke="#334155" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms holding dip bar */}
              <polyline points="108,52 95,75 95,75" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="112,52 125,75 125,75" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 3. BARBELL FLAT BENCH PRESS
      case 'bench_press':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="40" y1="110" x2="160" y2="110" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="50" y1="110" x2="50" y2="140" stroke="#1e293b" strokeWidth="5" />
            <line x1="150" y1="110" x2="150" y2="140" stroke="#1e293b" strokeWidth="5" />
            {/* Athlete lying on bench */}
            <ellipse cx="60" cy="104" rx="10" ry="8" fill="#64748b" />
            <path d="M70 106 L130 106" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            <path d="M125 106 L140 125 L145 140" stroke="#334155" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="95" cy="104" r="7" className="fill-cyan-400 opacity-80 animate-pulse" />
            {/* Barbell and Arms */}
            <g className="animate-[bench_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes bench {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(28px); }
                }
              `}</style>
              <line x1="60" y1="65" x2="130" y2="65" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
              <rect x="62" y="55" width="4" height="20" rx="1" fill="#06b6d4" />
              <rect x="124" y="55" width="4" height="20" rx="1" fill="#06b6d4" />
              <polyline points="95,104 90,82 95,65" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 4. INCLINE DUMBBELL BENCH PRESS
      case 'incline_bench':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Incline bench support at 40 degrees */}
            <line x1="45" y1="135" x2="150" y2="135" stroke="#1e293b" strokeWidth="4" />
            <line x1="60" y1="135" x2="130" y2="75" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="60" y1="135" x2="75" y2="120" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            {/* Athlete on incline */}
            <circle cx="126" cy="65" r="9" fill="#64748b" />
            <line x1="120" y1="75" x2="75" y2="125" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            {/* Clavicular head chest glow */}
            <circle cx="106" cy="85" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            {/* Animated Dumbbells & Arms */}
            <g className="animate-[inclineDumbbell_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes inclineDumbbell {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(22px) rotate(-6deg); }
                }
              `}</style>
              <line x1="90" y1="50" x2="115" y2="50" stroke="#e2e8f0" strokeWidth="2.5" />
              <circle cx="90" cy="50" r="5" fill="#06b6d4" />
              <circle cx="115" cy="50" r="5" fill="#06b6d4" />
              <polyline points="105,85 100,68 102,52" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 5. CABLE / DUMBBELL CHEST FLY
      case 'chest_fly':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Standing athlete torso view from top / front angle */}
            <circle cx="100" cy="42" r="9" fill="#94a3b8" />
            <line x1="100" y1="50" x2="100" y2="102" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
            <circle cx="100" cy="68" r="8" className="fill-cyan-400 opacity-90 animate-pulse" />
            <line x1="94" y1="102" x2="88" y2="140" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <line x1="106" y1="102" x2="112" y2="140" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            {/* Hugging motion arms */}
            <g className="animate-[flyAnim_2.5s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes flyAnim {
                  0%, 100% { transform: scaleX(0.7); }
                  50% { transform: scaleX(1.3); }
                }
              `}</style>
              <path d="M70 65 C60 70, 60 85, 78 85" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M130 65 C140 70, 140 85, 122 85" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="78" cy="85" r="4" fill="#06b6d4" />
              <circle cx="122" cy="85" r="4" fill="#06b6d4" />
            </g>
          </svg>
        );

      // 6. STRICT PULL-UP
      case 'pullup':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="40" y1="28" x2="160" y2="28" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <line x1="45" y1="28" x2="45" y2="10" stroke="#475569" strokeWidth="4" />
            <line x1="155" y1="28" x2="155" y2="10" stroke="#475569" strokeWidth="4" />
            <g className="animate-[pullup_2.6s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes pullup {
                  0%, 100% { transform: translateY(30px); }
                  50% { transform: translateY(-5px); }
                }
              `}</style>
              <circle cx="100" cy="40" r="9" fill="#94a3b8" />
              <line x1="100" y1="48" x2="100" y2="92" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
              <path d="M92 56 C84 65, 84 75, 92 82 Z" fill="#06b6d4" className="animate-pulse" />
              <path d="M108 56 C116 65, 116 75, 108 82 Z" fill="#06b6d4" className="animate-pulse" />
              <polyline points="96,52 82,36 82,28" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="104,52 118,36 118,28" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="97" y1="92" x2="96" y2="130" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
              <line x1="103" y1="92" x2="104" y2="130" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 7. LAT PULLDOWN
      case 'lat_pulldown':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Machine frame */}
            <line x1="100" y1="12" x2="100" y2="35" stroke="#475569" strokeWidth="4" />
            <line x1="70" y1="110" x2="130" y2="110" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="110" x2="100" y2="140" stroke="#1e293b" strokeWidth="5" />
            {/* Seated lifter */}
            <circle cx="100" cy="72" r="8" fill="#94a3b8" />
            <line x1="100" y1="80" x2="100" y2="112" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            <circle cx="92" cy="85" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            <circle cx="108" cy="85" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            {/* Pulley Cable & Pulldown Bar */}
            <g className="animate-[pulldownAnim_2.5s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes pulldownAnim {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(30px); }
                }
              `}</style>
              <line x1="60" y1="36" x2="140" y2="36" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
              <polyline points="96,80 75,52 68,38" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="104,80 125,52 132,38" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 8. BENT OVER ROW
      case 'bent_over_row':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="30" y1="140" x2="170" y2="140" stroke="#334155" strokeWidth="4" />
            {/* Lifter hinged forward at 45 deg */}
            <circle cx="85" cy="58" r="8" fill="#94a3b8" />
            <line x1="88" y1="64" x2="120" y2="92" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            <polyline points="120,92 122,118 126,140" stroke="#334155" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="105" cy="78" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            {/* Animated Barbell Row pull */}
            <g className="animate-[rowAnim_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes rowAnim {
                  0%, 100% { transform: translateY(20px); }
                  50% { transform: translateY(0px); }
                }
              `}</style>
              <line x1="90" y1="88" x2="120" y2="88" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
              <circle cx="92" cy="88" r="6" fill="#06b6d4" />
              <circle cx="118" cy="88" r="6" fill="#06b6d4" />
              <polyline points="96,72 105,82 105,88" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 9. SEATED CABLE ROW
      case 'seated_cable_row':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="30" y1="125" x2="160" y2="125" stroke="#334155" strokeWidth="4" />
            <line x1="50" y1="100" x2="50" y2="125" stroke="#64748b" strokeWidth="4" /> {/* Footrest */}
            {/* Seated athlete */}
            <circle cx="120" cy="65" r="8" fill="#94a3b8" />
            <line x1="120" y1="72" x2="120" y2="115" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
            <polyline points="120,115 85,115 54,105" stroke="#334155" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="124" cy="85" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            {/* Cable handle & Arms pulling */}
            <g className="animate-[seatedRowAnim_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes seatedRowAnim {
                  0%, 100% { transform: translateX(-18px); }
                  50% { transform: translateX(8px); }
                }
              `}</style>
              <line x1="40" y1="90" x2="105" y2="90" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="105" y1="84" x2="105" y2="96" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
              <polyline points="120,80 110,88 105,90" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 10. CONVENTIONAL DEADLIFT
      case 'deadlift':
      case 'rdl':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="30" y1="140" x2="170" y2="140" stroke="#334155" strokeWidth="4" />
            <g className="animate-[deadlift_2.8s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes deadlift {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-26px); }
                }
              `}</style>
              <line x1="60" y1="126" x2="140" y2="126" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
              <circle cx="65" cy="126" r="12" fill="#06b6d4" />
              <circle cx="135" cy="126" r="12" fill="#06b6d4" />
              <circle cx="100" cy="58" r="8" fill="#94a3b8" />
              <line x1="100" y1="66" x2="100" y2="100" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
              <line x1="96" y1="72" x2="86" y2="126" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
              <line x1="104" y1="72" x2="114" y2="126" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="100" r="7" className="fill-cyan-400 opacity-80 animate-pulse" />
              <polyline points="96,100 92,122 92,140" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="104,100 108,122 108,140" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 11. BARBELL SQUAT
      case 'squat':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="30" y1="140" x2="170" y2="140" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            <g className="animate-[squat_2.8s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes squat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(32px); }
                }
              `}</style>
              <circle cx="100" cy="40" r="9" fill="#94a3b8" />
              <line x1="100" y1="48" x2="100" y2="86" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
              <line x1="60" y1="46" x2="140" y2="46" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="64" y="36" width="5" height="20" rx="1" fill="#06b6d4" />
              <rect x="131" y="36" width="5" height="20" rx="1" fill="#06b6d4" />
              <circle cx="92" cy="100" r="6" className="fill-cyan-400 opacity-80 animate-pulse" />
              <circle cx="108" cy="100" r="6" className="fill-cyan-400 opacity-80 animate-pulse" />
              <polyline points="94,86 86,110 90,140" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="106,86 114,110 110,140" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 12. 45-DEGREE LEG PRESS
      case 'leg_press':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Incline Frame */}
            <line x1="40" y1="130" x2="160" y2="40" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            <line x1="45" y1="110" x2="70" y2="135" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <circle cx="50" cy="98" r="8" fill="#94a3b8" />
            {/* Animated Sled and Legs */}
            <g className="animate-[legPressAnim_2.6s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes legPressAnim {
                  0%, 100% { transform: translate(0px, 0px); }
                  50% { transform: translate(-20px, 15px); }
                }
              `}</style>
              <line x1="130" y1="55" x2="160" y2="85" stroke="#06b6d4" strokeWidth="8" strokeLinecap="round" />
              <polyline points="70,120 100,85 138,68" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // 13. WALKING LUNGES
      case 'lunges':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="135" x2="180" y2="135" stroke="#334155" strokeWidth="4" />
            <g className="animate-[lungeAnim_2.6s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes lungeAnim {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(20px); }
                }
              `}</style>
              <circle cx="100" cy="45" r="8" fill="#94a3b8" />
              <line x1="100" y1="52" x2="100" y2="90" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              {/* Dumbbell */}
              <line x1="90" y1="70" x2="90" y2="95" stroke="#cbd5e1" strokeWidth="3" />
              <rect x="86" y="90" width="8" height="5" rx="1" fill="#06b6d4" />
              {/* Legs in lunge */}
              <polyline points="96,90 75,108 80,135" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="104,90 130,110 145,135" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="85" cy="105" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 14. LYING LEG CURL
      case 'leg_curl':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Prone Bench */}
            <line x1="40" y1="110" x2="150" y2="110" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            {/* Lifter face down */}
            <circle cx="50" cy="100" r="7" fill="#94a3b8" />
            <line x1="58" y1="105" x2="115" y2="105" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
            <circle cx="125" cy="100" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            {/* Animated curling leg */}
            <g className="animate-[curlLegAnim_2.2s_ease-in-out_infinite] origin-[115px_105px]" style={animStyle}>
              <style>{`
                @keyframes curlLegAnim {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(-75deg); }
                }
              `}</style>
              <line x1="115" y1="105" x2="160" y2="105" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="155" cy="100" r="5" fill="#06b6d4" />
            </g>
          </svg>
        );

      // 15. BARBELL HIP THRUST
      case 'hip_thrust':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Bench */}
            <rect x="40" y="90" width="25" height="45" rx="3" fill="#334155" />
            <line x1="30" y1="135" x2="170" y2="135" stroke="#1e293b" strokeWidth="4" />
            {/* Head and shoulders on bench */}
            <circle cx="50" cy="80" r="8" fill="#94a3b8" />
            {/* Animated hip elevation */}
            <g className="animate-[hipThrustAnim_2.4s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes hipThrustAnim {
                  0%, 100% { transform: translateY(18px); }
                  50% { transform: translateY(0px); }
                }
              `}</style>
              <line x1="58" y1="92" x2="105" y2="92" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
              <polyline points="105,92 120,115 125,135" stroke="#334155" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="95" cy="92" r="7" className="fill-cyan-400 opacity-90 animate-pulse" />
              {/* Barbell on hips */}
              <line x1="90" y1="84" x2="110" y2="84" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
              <rect x="98" y="78" width="4" height="12" rx="1" fill="#06b6d4" />
            </g>
          </svg>
        );

      // 16. BICEP CURL
      case 'bicep_curl':
      case 'hammer_curl':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <circle cx="95" cy="38" r="9" fill="#94a3b8" />
            <line x1="95" y1="46" x2="95" y2="100" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
            <line x1="92" y1="100" x2="90" y2="145" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="98" y1="100" x2="100" y2="145" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="102" y1="52" x2="104" y2="82" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            <circle cx="106" cy="72" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            <g className="animate-[bicep_2s_ease-in-out_infinite] origin-[104px_82px]" style={animStyle}>
              <style>{`
                @keyframes bicep {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(-95deg); }
                }
              `}</style>
              <line x1="104" y1="82" x2="104" y2="114" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="104" cy="116" r="3" fill="#cbd5e1" />
              <line x1="94" y1="116" x2="114" y2="116" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
              <rect x="91" y="110" width="4" height="12" rx="1" fill="#06b6d4" />
              <rect x="109" y="110" width="4" height="12" rx="1" fill="#06b6d4" />
            </g>
          </svg>
        );

      // 17. TRICEP PUSHDOWN
      case 'tricep_pushdown':
      case 'overhead_tricep':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="120" y1="10" x2="120" y2="40" stroke="#475569" strokeWidth="3" />
            <circle cx="95" cy="40" r="8" fill="#94a3b8" />
            <line x1="95" y1="48" x2="95" y2="100" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            <line x1="95" y1="100" x2="95" y2="145" stroke="#334155" strokeWidth="5" />
            <line x1="98" y1="56" x2="105" y2="82" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <circle cx="102" cy="68" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            <g className="animate-[tricepPushAnim_2s_ease-in-out_infinite] origin-[105px_82px]" style={animStyle}>
              <style>{`
                @keyframes tricepPushAnim {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(70deg); }
                }
              `}</style>
              <line x1="105" y1="82" x2="115" y2="108" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <circle cx="115" cy="110" r="4" fill="#06b6d4" />
            </g>
          </svg>
        );

      // 18. FOREARM PLANK HOLD
      case 'plank':
        return (
          <svg viewBox="0 0 220 150" className="w-full h-full max-h-48">
            <line x1="20" y1="125" x2="200" y2="125" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            {/* Static rigid plank with pulsing core brace */}
            <circle cx="58" cy="85" r="8" fill="#94a3b8" />
            <line x1="66" y1="88" x2="140" y2="96" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            {/* Core activation ring */}
            <circle cx="100" cy="94" r="8" className="fill-cyan-400 opacity-90 animate-ping" />
            <circle cx="100" cy="94" r="7" fill="#06b6d4" />
            {/* Forearm planted on floor */}
            <polyline points="72,88 72,110 90,123" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="140" y1="96" x2="185" y2="122" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="187" cy="123" rx="4" ry="3" fill="#64748b" />
          </svg>
        );

      // 19. HANGING LEG RAISE
      case 'hanging_leg_raise':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="40" y1="20" x2="160" y2="20" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="100" cy="38" r="8" fill="#94a3b8" />
            <line x1="100" y1="46" x2="100" y2="85" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
            <line x1="95" y1="46" x2="95" y2="22" stroke="#38bdf8" strokeWidth="3.5" />
            <line x1="105" y1="46" x2="105" y2="22" stroke="#38bdf8" strokeWidth="3.5" />
            <circle cx="100" cy="75" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            {/* Animated legs curling to 90 degrees */}
            <g className="animate-[legRaiseAnim_2.4s_ease-in-out_infinite] origin-[100px_85px]" style={animStyle}>
              <style>{`
                @keyframes legRaiseAnim {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(85deg); }
                }
              `}</style>
              <line x1="100" y1="85" x2="100" y2="135" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 20. STANDING CALF RAISE
      case 'calf_raise':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <rect x="40" y="130" width="120" height="20" fill="#334155" />
            <g className="animate-[calfAnim_2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes calfAnim {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-16px); }
                }
              `}</style>
              <circle cx="100" cy="40" r="8" fill="#94a3b8" />
              <line x1="100" y1="48" x2="100" y2="92" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              <line x1="95" y1="92" x2="95" y2="130" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
              <line x1="105" y1="92" x2="105" y2="130" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
              <circle cx="95" cy="112" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
              <circle cx="105" cy="112" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 21. JUMPING JACKS (Cardio)
      case 'jumping_jacks':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="3" />
            <g className="animate-[jacksAnim_1.2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes jacksAnim {
                  0%, 100% { transform: scaleX(0.7) translateY(0); }
                  50% { transform: scaleX(1.3) translateY(-12px); }
                }
              `}</style>
              <circle cx="100" cy="40" r="8" fill="#94a3b8" />
              <line x1="100" y1="48" x2="100" y2="90" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              {/* Arms spreading overhead */}
              <polyline points="100,55 75,35 60,20" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="100,55 125,35 140,20" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Legs jumping out */}
              <line x1="100" y1="90" x2="70" y2="138" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <line x1="100" y1="90" x2="130" y2="138" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="100" cy="65" r="7" className="fill-cyan-400 opacity-90 animate-ping" />
            </g>
          </svg>
        );

      // 22. MOUNTAIN CLIMBERS (Cardio)
      case 'mountain_climbers':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="130" x2="180" y2="130" stroke="#334155" strokeWidth="3" />
            {/* Plank frame */}
            <circle cx="55" cy="75" r="8" fill="#94a3b8" />
            <line x1="62" y1="78" x2="135" y2="92" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
            <line x1="68" y1="82" x2="68" y2="130" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            {/* Rapid alternating knees */}
            <g className="animate-[climberAnim_0.8s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes climberAnim {
                  0%, 100% { transform: translateX(0); }
                  50% { transform: translateX(25px); }
                }
              `}</style>
              <polyline points="135,92 100,105 105,128" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="135" y1="92" x2="175" y2="128" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
              <circle cx="100" cy="90" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 23. FULL BODY BURPEES (Cardio)
      case 'burpees':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="135" x2="180" y2="135" stroke="#334155" strokeWidth="3" />
            <g className="animate-[burpeeAnim_2.2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes burpeeAnim {
                  0%, 100% { transform: translateY(0); }
                  30% { transform: translateY(30px); }
                  60% { transform: translateY(40px) scaleX(1.3); }
                  80% { transform: translateY(-25px); }
                }
              `}</style>
              <circle cx="100" cy="45" r="8" fill="#94a3b8" />
              <line x1="100" y1="52" x2="100" y2="95" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              <polyline points="100,58 75,35 75,18" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="100,58 125,35 125,18" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="100,95 90,118 90,135" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="100,95 110,118 110,135" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="100" cy="70" r="7" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 24. HIGH KNEES / JUMP SQUATS (Cardio)
      case 'high_knees':
      case 'jump_squats':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="3" />
            <g className="animate-[highKneeAnim_0.9s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes highKneeAnim {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-16px); }
                }
              `}</style>
              <circle cx="100" cy="40" r="8" fill="#94a3b8" />
              <line x1="100" y1="48" x2="100" y2="90" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              {/* Running arms */}
              <polyline points="100,56 82,70 95,84" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="100,56 118,70 105,84" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* High Knee drive */}
              <polyline points="100,90 85,85 85,108" stroke="#06b6d4" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="100" y1="90" x2="112" y2="138" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="85" cy="85" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 25. SUPERMAN FLOOR LAT PULL / BACK EXTENSION (Home Bodyweight)
      case 'superman':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="130" x2="180" y2="130" stroke="#334155" strokeWidth="3" />
            <g className="animate-[supermanAnim_2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes supermanAnim {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-12px); }
                }
              `}</style>
              {/* Torso arched on floor */}
              <path d="M50 120 Q100 105 150 120" stroke="#475569" strokeWidth="12" fill="none" strokeLinecap="round" />
              <circle cx="42" cy="112" r="8" fill="#94a3b8" />
              {/* Arms reaching and pulling back */}
              <polyline points="48,114 30,100 20,88" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Legs lifting off floor */}
              <line x1="150" y1="120" x2="175" y2="114" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              {/* Glowing Lats & Lower Back highlight */}
              <circle cx="85" cy="108" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
              <circle cx="115" cy="110" r="5" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 26. GLUTE BRIDGE (Home Bodyweight)
      case 'glute_bridge':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="135" x2="180" y2="135" stroke="#334155" strokeWidth="3" />
            {/* Shoulders and head on floor */}
            <circle cx="45" cy="128" r="8" fill="#94a3b8" />
            {/* Feet flat on floor */}
            <circle cx="145" cy="132" r="5" fill="#334155" />
            <g className="animate-[bridgeAnim_2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes bridgeAnim {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-22px); }
                }
              `}</style>
              {/* Hips lifting into straight diagonal bridge */}
              <line x1="52" y1="126" x2="105" y2="115" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
              <polyline points="105,115 130,105 145,132" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Glute peak squeeze */}
              <circle cx="105" cy="115" r="7" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 27. FLOOR TRICEP DIPS (Home Bodyweight)
      case 'floor_dips':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="135" x2="180" y2="135" stroke="#334155" strokeWidth="3" />
            {/* Feet flat on floor */}
            <line x1="135" y1="135" x2="135" y2="110" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            {/* Hands planted behind on floor */}
            <line x1="65" y1="135" x2="65" y2="115" stroke="#334155" strokeWidth="4" />
            <g className="animate-[floorDipAnim_1.8s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes floorDipAnim {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(14px); }
                }
              `}</style>
              <circle cx="75" cy="80" r="8" fill="#94a3b8" />
              <line x1="75" y1="88" x2="95" y2="115" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              {/* Tricep arm bending and extending */}
              <polyline points="75,90 65,105 65,132" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="95" y1="115" x2="135" y2="110" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              <circle cx="65" cy="105" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // 28. LYING FLOOR LEG RAISES (Home Bodyweight)
      case 'lying_leg_raise':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="135" x2="180" y2="135" stroke="#334155" strokeWidth="3" />
            {/* Torso flat on floor */}
            <circle cx="50" cy="128" r="8" fill="#94a3b8" />
            <line x1="58" y1="128" x2="105" y2="128" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
            <g className="animate-[legRaiseAnim_2.2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes legRaiseAnim {
                  0%, 100% { transform: rotate(0deg); transform-origin: 105px 128px; }
                  50% { transform: rotate(-75deg); transform-origin: 105px 128px; }
                }
              `}</style>
              {/* Legs raising to vertical 90 degrees */}
              <line x1="105" y1="128" x2="165" y2="128" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            </g>
            <circle cx="95" cy="122" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
          </svg>
        );

      // 29. WALL SIT (Home Bodyweight)
      case 'wall_sit':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            {/* Wall on left and floor */}
            <line x1="60" y1="20" x2="60" y2="140" stroke="#475569" strokeWidth="6" />
            <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="3" />
            {/* Head and back resting against wall in 90-degree chair hold */}
            <circle cx="68" cy="65" r="8" fill="#94a3b8" />
            <line x1="68" y1="73" x2="68" y2="105" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
            {/* Thighs parallel to floor at 90 degrees */}
            <line x1="68" y1="105" x2="105" y2="105" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            {/* Shins vertical */}
            <line x1="105" y1="105" x2="105" y2="140" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            {/* Isometric quad activation */}
            <circle cx="88" cy="102" r="7" className="fill-cyan-400 opacity-90 animate-pulse" />
          </svg>
        );

      // 30. RUSSIAN TWIST / DOORFRAME ROW / BEAR CRAWL
      case 'russian_twist':
      case 'doorframe_row':
      case 'bear_crawl':
      case 'diamond_pushup':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <line x1="20" y1="135" x2="180" y2="135" stroke="#334155" strokeWidth="3" />
            <g className="animate-[bwSpecialAnim_2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes bwSpecialAnim {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
              `}</style>
              <circle cx="80" cy="85" r="8" fill="#94a3b8" />
              <line x1="80" y1="92" x2="120" y2="115" stroke="#475569" strokeWidth="11" strokeLinecap="round" />
              <polyline points="75,98 60,115 60,135" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="120" y1="115" x2="155" y2="135" stroke="#38bdf8" strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="100" cy="105" r="6" className="fill-cyan-400 opacity-90 animate-pulse" />
            </g>
          </svg>
        );

      // DEFAULT FALLBACK ANIMATION
      default:
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-48">
            <circle cx="100" cy="50" r="10" fill="#64748b" />
            <line x1="100" y1="60" x2="100" y2="105" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
            <circle cx="100" cy="75" r="7" className="fill-cyan-400 opacity-80 animate-ping" />
            <line x1="94" y1="105" x2="88" y2="140" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <line x1="106" y1="105" x2="112" y2="140" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <g className="animate-[generic_2s_ease-in-out_infinite]" style={animStyle}>
              <style>{`
                @keyframes generic {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-15px); }
                }
              `}</style>
              <line x1="70" y1="80" x2="130" y2="80" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full ${heightClass} flex flex-col items-center justify-center bg-slate-900/80 rounded-xl border border-slate-800/80 overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-25 pointer-events-none" />

      {/* Movement Vector Canvas */}
      <div className="w-full h-full flex items-center justify-center p-2">
        {renderAnimationContent()}
      </div>

      {/* Control pill bar */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60 shadow-sm"
          title={isPlaying ? 'Pause Animation' : 'Play Animation'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Movement pattern label */}
      <div className="absolute top-2 left-2.5 text-[10px] uppercase font-mono tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
        {exercise.mechanics} Motion Path
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { WorkoutRoutine } from '../types/fitness';
import { MUSCLES } from '../data/muscles';
import { generateStandaloneHtml } from '../utils/standaloneHtmlGenerator';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  FileCode,
  Terminal,
  Globe,
  BookOpen
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: WorkoutRoutine;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, routine }) => {
  const [activeTab, setActiveTab] = useState<'export' | 'setup'>('export');
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  // Format workout as clean markdown / text
  const generateMarkdownSummary = () => {
    let md = `# ${routine.title}\n`;
    md += `Description: ${routine.description}\n`;
    md += `Estimated Duration: ~${routine.estimatedMinutes} minutes\n`;
    md += `Target Muscles: ${routine.targetMuscles.map(m => MUSCLES[m]?.name).join(', ')}\n\n`;
    md += `## Exercise List\n\n`;

    routine.exercises.forEach((item, idx) => {
      const ex = item.exercise;
      md += `${idx + 1}. **${ex.name}**\n`;
      md += `   - Target: ${ex.primaryMuscles.map(m => MUSCLES[m]?.name).join(', ')}\n`;
      md += `   - Equipment: ${ex.equipment}\n`;
      md += `   - Protocol: ${item.customSets} sets × ${item.customReps} reps (Rest: ${item.customRestSeconds}s)\n`;
      if (item.weightLbs) {
        md += `   - Weight: ${item.weightLbs} lbs\n`;
      }
      md += `   - Key Cue: "${ex.coachingCues[0]}"\n\n`;
    });

    md += `---\nGenerated with JDFit by Jaydeep`;
    return md;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdownSummary());
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadStandaloneHtml = async () => {
    try {
      const res = await fetch('/jdfit.html');
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jdfit.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      }
    } catch {
      // Fallback to generator
    }
    const html = generateStandaloneHtml(routine);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jdfit.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-white">
              Export & Deployment Center
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('export')}
                className={`px-3 py-1 font-semibold rounded-md transition-all ${
                  activeTab === 'export' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Export Routine
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('setup')}
                className={`px-3 py-1 font-semibold rounded-md transition-all ${
                  activeTab === 'setup' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Setup Guide
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Export Actions */}
        {activeTab === 'export' && (
          <div className="overflow-y-auto p-6 space-y-6">
            
            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Standalone HTML File */}
              <button
                type="button"
                onClick={handleDownloadStandaloneHtml}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/80 transition-all group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                  <FileCode className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Standalone HTML</span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Single-file app with full exercise database
                </span>
              </button>

              {/* Print / PDF */}
              <button
                type="button"
                onClick={handlePrint}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/80 transition-all group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-2 group-hover:scale-110 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Print / PDF</span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Clean printer-friendly gym workout card
                </span>
              </button>

              {/* Copy Markdown / Text */}
              <button
                type="button"
                onClick={handleCopyText}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/80 transition-all group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-2 group-hover:scale-110 transition-transform">
                  {copiedText ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </div>
                <span className="text-xs font-bold text-white mb-0.5">
                  {copiedText ? 'Copied!' : 'Copy Summary'}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Formatted text for notes, chat, or Notion
                </span>
              </button>
            </div>

            {/* Workout Summary Preview Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Workout Sheet Preview
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {routine.exercises.length} Exercises Listed
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-slate-300 max-h-56 overflow-y-auto space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <div className="font-bold text-white text-sm">{routine.title}</div>
                  <div className="text-slate-400 text-[11px]">{routine.description}</div>
                </div>

                <div className="space-y-2">
                  {routine.exercises.map((item, idx) => (
                    <div key={item.id} className="flex items-start justify-between gap-2 border-b border-slate-900 pb-1.5">
                      <div>
                        <span className="text-cyan-400 font-semibold">{idx + 1}. {item.exercise.name}</span>
                        <div className="text-[11px] text-slate-400">
                          {item.customSets} sets × {item.customReps} reps · {item.customRestSeconds}s rest
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                        {item.exercise.equipment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Standalone jdfit.html Guide */}
        {activeTab === 'setup' && (
          <div className="overflow-y-auto p-6 space-y-5 text-xs text-slate-300 leading-relaxed">
            
            {/* Direct Browser Execution */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>1. Immediate Double-Click Run (Zero Setup)</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Click <strong>Standalone HTML</strong> above or the <strong>Download jdfit.html</strong> button in the top navigation bar to download <code>jdfit.html</code>. Once downloaded, double-click the file to open it in Chrome, Safari, Edge, or Firefox. It runs 100% offline with zero dependencies or node modules required!
              </p>
            </div>

            {/* Free Web Hosting */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>2. Host Anywhere (Static Drop-in)</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Because <code>jdfit.html</code> has all scripts, styles, SVG animations, and exercise data bundled inside one single file, you can rename it to <code>index.html</code> and drop it into any web host (Vercel, Netlify, Cloudflare Pages, Firebase Hosting, or your personal website server) for instant publication.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

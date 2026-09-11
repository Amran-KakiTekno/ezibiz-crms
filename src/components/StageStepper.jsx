import React from 'react';
import { Check, ChevronRight, Zap } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/crmsData';

export default function StageStepper({ 
  currentStage, 
  onStageChange, 
  stages = PIPELINE_STAGES,
  compact = false 
}) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);
  const activeIdx = currentIndex >= 0 ? currentIndex : 0;
  const nextStage = activeIdx < stages.length - 1 ? stages[activeIdx + 1] : null;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 shadow-inner">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400 motion-safe:animate-pulse"></div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Pipeline Progression
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
            Stage {activeIdx + 1} of {stages.length}: {stages[activeIdx]?.label}
          </span>
        </div>

        {/* 1-Click Advance Button */}
        {nextStage && (
          <button
            onClick={() => onStageChange(nextStage.id)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]"
            title={`Advance directly to ${nextStage.label}`}
          >
            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Advance to {nextStage.shortLabel || nextStage.label}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Stepper Bar */}
      <div className="pt-3 px-1">
        <ol className="flex items-center w-full" aria-label="Deal progression stages">
          {stages.map((stage, idx) => {
            const isCompleted = idx < activeIdx;
            const isCurrent = idx === activeIdx;
            const isUpcoming = idx > activeIdx;
            const isLast = idx === stages.length - 1;

            return (
              <li 
                key={stage.id} 
                className={`relative flex-1 flex items-center ${isLast ? 'flex-initial' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => onStageChange(stage.id)}
                  aria-current={isCurrent ? 'step' : undefined}
                  className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1 transition-all"
                  title={`Click to set stage to ${stage.label}`}
                >
                  <div className="flex items-center">
                    {/* Step Indicator Circle */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 group-hover:bg-emerald-500/30' 
                        : isCurrent
                        ? 'bg-indigo-600 border-2 border-indigo-400 text-white shadow-lg shadow-indigo-500/40 ring-4 ring-indigo-500/20 scale-110'
                        : 'bg-slate-950 border border-slate-700 text-slate-500 group-hover:border-slate-500 group-hover:text-slate-300'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Step Label */}
                  <span className={`text-[10px] mt-1.5 whitespace-nowrap font-medium transition-colors ${
                    isCurrent 
                      ? 'text-indigo-300 font-bold drop-shadow' 
                      : isCompleted 
                      ? 'text-emerald-400' 
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}>
                    {stage.label}
                  </span>
                </button>

                {/* Connecting Line to next stage */}
                {!isLast && (
                  <div className="flex-1 mx-2 -mt-4">
                    <div className={`h-0.5 rounded-full transition-all ${
                      idx < activeIdx 
                        ? 'bg-emerald-500/60' 
                        : idx === activeIdx 
                        ? 'bg-indigo-500/40' 
                        : 'bg-slate-800'
                    }`} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

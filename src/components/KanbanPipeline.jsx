import React from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { PIPELINE_STAGES, formatCurrency } from '../data/crmsData';

export default function KanbanPipeline({
  conversations,
  pipelineStages = PIPELINE_STAGES,
  onMoveLeadStage,
  onOpenDM,
  showToast
}) {
  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Client Intake Deal Pipeline</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track client relationships from raw social inquiry to deposit authorization and production fulfillment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => showToast('Syncing webhook events from WhatsApp & Meta Graph API...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Ingest Stream</span>
          </button>
        </div>
      </div>

      {/* Mobile Stage Selector Tabs */}
      <div className="flex md:hidden gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {pipelineStages.map((stage) => {
          const stageCount = conversations.filter(c => c.stage === stage.id).length;
          return (
            <button
              key={stage.id}
              onClick={() => {
                const el = document.getElementById(`kanban-col-${stage.id}`);
                el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 flex-shrink-0 min-h-[36px] shadow-sm cursor-pointer"
            >
              <span>{stage.label}</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-black text-slate-600 dark:text-slate-300 text-[10px] flex items-center justify-center font-bold font-mono">
                {stageCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanban Columns */}
      <div className="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 min-h-[540px]">
        {pipelineStages.map((stage, stageIdx) => {
          const stageLeads = conversations.filter(c => c.stage === stage.id);
          const stageTotal = stageLeads.reduce((acc, c) => acc + c.totalScope, 0);
          const canRevert = stageIdx > 0;
          const canAdvance = stageIdx < pipelineStages.length - 1;

          return (
            <div 
              key={stage.id} 
              id={`kanban-col-${stage.id}`}
              className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col overflow-hidden flex-shrink-0 md:flex-shrink"
            >
              {/* Stage Column Header */}
              <div className="p-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-black/50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{stage.label}</h4>
                  <p className="text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-0.5">
                    {formatCurrency(stageTotal)} total
                  </p>
                </div>
                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold font-mono">
                  {stageLeads.length}
                </span>
              </div>

              {/* Stage Lead Cards */}
              <div className="p-2.5 space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
                {stageLeads.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-center p-4 border border-dashed border-slate-200 dark:border-white/[0.06] rounded-xl">
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 font-mono">No deals in this stage</p>
                  </div>
                ) : (
                  stageLeads.map(lead => (
                    <div 
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-black/80 border border-slate-200 dark:border-white/[0.08] shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {lead.name}
                          </span>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{lead.handle}</p>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]">
                          {lead.channel}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">{lead.scope}</p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/[0.06] text-xs">
                        <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-bold">
                          {formatCurrency(lead.totalScope)}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{lead.date}</span>
                      </div>

                      {/* Card Navigation & Movement Controls */}
                      <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between gap-1 text-[11px]">
                        <button
                          onClick={() => onOpenDM(lead.id)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-0.5 transition-colors min-h-[32px] px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <span>DM</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-1.5">
                          {/* Backward Revert Movement Control */}
                          {canRevert && (
                            <button
                              onClick={() => {
                                const prevStage = pipelineStages[stageIdx - 1];
                                if (prevStage) {
                                  onMoveLeadStage(lead.id, prevStage.id);
                                }
                              }}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors flex items-center gap-1 min-h-[32px] cursor-pointer shadow-sm"
                              title={`Revert back to ${pipelineStages[stageIdx - 1]?.label}`}
                            >
                              <span>&larr; Revert</span>
                            </button>
                          )}

                          {/* Forward Advance Movement Control */}
                          {canAdvance && (
                            <button
                              onClick={() => {
                                const nextStage = pipelineStages[stageIdx + 1];
                                if (nextStage) {
                                  onMoveLeadStage(lead.id, nextStage.id);
                                }
                              }}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-slate-900 hover:bg-indigo-600 text-indigo-700 dark:text-slate-300 hover:text-white border border-indigo-200 dark:border-white/[0.08] hover:border-indigo-500 transition-colors flex items-center gap-1 min-h-[32px] cursor-pointer shadow-sm"
                              title={`Advance to ${pipelineStages[stageIdx + 1]?.label}`}
                            >
                              <span>Advance &rarr;</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

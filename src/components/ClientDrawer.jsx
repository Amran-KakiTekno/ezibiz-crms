import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Eye, 
  Copy, 
  Phone, 
  Mail, 
  FileText, 
  History, 
  DollarSign,
  UserCheck
} from 'lucide-react';
import { formatCurrency } from '../data/crmsData';

export default function ClientDrawer({
  currentChat,
  onOpenProposal,
  onAddNote,
  showToast
}) {
  const [sidebarTab, setSidebarTab] = useState('ai_scope'); // 'ai_scope' | 'crm_profile'
  const [newNoteText, setNewNoteText] = useState('');

  if (!currentChat) return null;

  const handleNoteSubmit = () => {
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText.trim());
    setNewNoteText('');
  };

  const depositRequired = Math.round(currentChat.totalScope * 0.3);

  return (
    <div className="p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col justify-between space-y-4 h-full">
      {/* Drawer Tabs */}
      <div>
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs mb-3">
          <button
            onClick={() => setSidebarTab('ai_scope')}
            className={`flex-1 pb-2 font-medium border-b-2 text-center transition-colors cursor-pointer ${
              sidebarTab === 'ai_scope'
                ? 'border-indigo-600 dark:border-indigo-500 text-slate-900 dark:text-white font-semibold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            AI Scope & CPQ
          </button>
          <button
            onClick={() => setSidebarTab('crm_profile')}
            className={`flex-1 pb-2 font-medium border-b-2 text-center transition-colors cursor-pointer ${
              sidebarTab === 'crm_profile'
                ? 'border-indigo-600 dark:border-indigo-500 text-slate-900 dark:text-white font-semibold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Client 360° & Notes
          </button>
        </div>

        {/* Subtab A: AI Extracted Scope & CPQ */}
        {sidebarTab === 'ai_scope' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Triaged Scope</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                100% Match
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Target Date:</span>
                <p className="text-slate-900 dark:text-white font-medium flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{currentChat.date}</span>
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Detected Scope Deliverables:</span>
                <p className="text-slate-900 dark:text-white font-medium mt-0.5">{currentChat.scope}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Estimated Budget:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{currentChat.budget}</span>
              </div>
            </div>

            {/* Enterprise Capacity & Reservation Gating Safeguard */}
            <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Reservation Escrow Policy Active</span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                Calendar reservation is conditionally held for 48 hours. A 30% card deposit ({formatCurrency(depositRequired)}) is required to secure production capacity and prevent unfulfilled booking reservations.
              </p>
            </div>

            {/* Quick Proposal Action */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onOpenProposal(currentChat)}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Interactive Proposal Preview</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`https://quote.ezibiz.link/PR-${currentChat.id}`);
                  showToast('1-Click Quote & Deposit URL copied to clipboard!');
                }}
                className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Shareable Quote Link</span>
              </button>
            </div>
          </div>
        )}

        {/* Subtab B: Client 360° Profile & Internal Team Notes */}
        {sidebarTab === 'crm_profile' && (
          <div className="space-y-3.5 animate-in fade-in max-h-[460px] overflow-y-auto pr-1">
            {/* CRM Contact Details */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Account Type</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {currentChat.vip ? '🌟 VIP High-Touch Client' : 'Standard Client'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Lifetime Value</span>
                  <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{currentChat.ltv}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Past Bookings</span>
                  <p className="font-mono text-slate-900 dark:text-white font-medium">{currentChat.pastProjects} orders</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] space-y-1">
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">{currentChat.phone}</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300 truncate">{currentChat.email}</span>
                </p>
              </div>
            </div>

            {/* Team Internal Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Internal Notes ({currentChat.notes?.length || 0})</span>
                </span>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {currentChat.notes?.map(note => (
                  <div key={note.id} className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-[11px] space-y-0.5">
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-400">
                      <span className="font-medium text-indigo-600 dark:text-indigo-300">{note.author}</span>
                      <span>{note.time}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-snug">{note.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="flex gap-1.5">
                <input 
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNoteSubmit()}
                  placeholder="Add team note (e.g. dietary specs)..."
                  className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 text-[11px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={handleNoteSubmit}
                  className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-[11px] font-medium hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Relationship Activity Audit Trail */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <History className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                <span>Activity Audit Log</span>
              </span>
              <div className="space-y-1 max-h-28 overflow-y-auto">
                {currentChat.timeline?.map((act, i) => (
                  <div key={i} className="text-[10px] flex items-start gap-1.5 text-slate-500 dark:text-slate-400">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">•</span>
                    <span className="flex-1 leading-tight">{act.action}</span>
                    <span className="text-slate-400 dark:text-slate-400 font-mono text-[9px]">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Module Integration Shortcuts */}
      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-[11px] space-y-1.5">
        <span className="text-slate-500 dark:text-slate-400 font-medium">Handoff to EziBiz Suite:</span>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://ezibiz-hrms.pages.dev"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-center flex items-center justify-center gap-1 transition-colors"
          >
            <Calendar className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
            <span>Scheduling</span>
          </a>
          <a
            href="https://ezibiz-akaun.pages.dev"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-center flex items-center justify-center gap-1 transition-colors"
          >
            <DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Invoicing</span>
          </a>
        </div>
      </div>
    </div>
  );
}

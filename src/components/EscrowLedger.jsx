import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, AlertCircle, Search, CreditCard } from 'lucide-react';
import { formatCurrency } from '../data/crmsData';

export default function EscrowLedger({
  conversations,
  onOpenProposal,
  showToast
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredLeads = conversations.filter(lead => 
    lead.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    lead.handle.toLowerCase().includes(filterQuery.toLowerCase()) ||
    lead.channel.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const totalSecured = conversations.reduce((acc, lead) => {
    const isSecured = lead.stage === 'deposit_secured' || lead.stage === 'production';
    return acc + (isSecured ? (lead.depositSecured || Math.round(lead.totalScope * 0.3)) : 0);
  }, 0);

  const totalPending = conversations.reduce((acc, lead) => {
    const isSecured = lead.stage === 'deposit_secured' || lead.stage === 'production';
    return acc + (!isSecured ? Math.round(lead.totalScope * 0.3) : 0);
  }, 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-0">
      {/* Ledger Header Bar */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Financial Escrow & Calendar Governance
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Calendar Reservations & Escrow Ledger</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Production dates and team capacity are secured upon non-refundable card reservation authorization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"></span>
            <span>Capacity Protection Active</span>
          </span>
        </div>
      </div>

      {/* Financial Summary Tally */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-200 dark:border-slate-800 text-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-3.5 px-5">
          <span className="text-slate-500 dark:text-slate-400">Total Escrow Secured:</span>
          <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-base mt-0.5">
            {formatCurrency(totalSecured)}
          </p>
        </div>
        <div className="p-3.5 px-5">
          <span className="text-slate-500 dark:text-slate-400">Pending Pre-Authorizations:</span>
          <p className="font-mono text-amber-600 dark:text-amber-400 font-bold text-base mt-0.5">
            {formatCurrency(totalPending)}
          </p>
        </div>
        <div className="p-3.5 px-5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 dark:text-slate-400">Total Pipeline Deals:</span>
            <p className="font-mono text-slate-900 dark:text-white font-bold text-base mt-0.5">
              {conversations.length} Active Records
            </p>
          </div>
          <div className="relative">
            <input 
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter client..."
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-base sm:text-xs min-h-[44px] sm:min-h-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Ledger Table Rows */}
      {filteredLeads.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl m-4 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            No escrow records found matching "{filterQuery}".
          </p>
          <button
            type="button"
            onClick={() => setFilterQuery('')}
            className="px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors min-h-[44px] cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
          {filteredLeads.map((lead) => {
            const isSecured = lead.stage === 'deposit_secured' || lead.stage === 'production';
            const depositAmt = isSecured 
              ? (lead.depositSecured || Math.round(lead.totalScope * 0.3)) 
              : Math.round(lead.totalScope * 0.3);
            const remainingAmt = lead.totalScope - depositAmt;

            return (
              <div 
                key={lead.id} 
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                {/* Client Info */}
                <div className="space-y-1 min-w-[240px]">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${lead.avatarBg} text-white flex items-center justify-center text-xs font-bold shadow-sm`}>
                      {lead.name[0]}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white text-xs">{lead.name}</span>
                      <span className="text-slate-500 ml-1.5 font-normal">({lead.handle})</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {lead.channel}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs pl-9">
                    Target Date: <span className="text-slate-800 dark:text-white font-medium">{lead.date}</span> • Deliverables: {lead.scope}
                  </p>
                </div>

                {/* Escrow Financials */}
                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-right space-y-0.5">
                    <p className={`font-mono font-bold text-xs ${isSecured ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {isSecured 
                        ? `${formatCurrency(depositAmt)} Secured` 
                        : `Pending Deposit (${formatCurrency(depositAmt)})`
                      }
                    </p>
                    <p className="text-slate-500 font-mono text-[11px]">
                      {isSecured 
                        ? `Balance ${formatCurrency(remainingAmt)} on fulfillment` 
                        : `Total Scope ${formatCurrency(lead.totalScope)}`
                      }
                    </p>
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center gap-2 min-w-[140px] justify-end">
                    {isSecured ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Date Escrow Locked</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onOpenProposal(lead)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] cursor-pointer min-h-[44px]"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Collect Deposit</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

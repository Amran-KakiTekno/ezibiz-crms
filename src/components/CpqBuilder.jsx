import React from 'react';
import { 
  Clock, 
  Eye, 
  Copy, 
  Sliders, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';
import { 
  CPQ_TIERS, 
  CPQ_ADDONS, 
  calculateScopeTotal, 
  calculateDepositAmount, 
  formatCurrency 
} from '../data/crmsData';

export default function CpqBuilder({
  baseTier,
  setBaseTier,
  addOns,
  setAddOns,
  depositPct,
  setDepositPct,
  onOpenProposalModal,
  showToast
}) {
  const totalAmount = calculateScopeTotal(baseTier, addOns);
  const depositAmount = calculateDepositAmount(totalAmount, depositPct);

  const toggleAddon = (key) => {
    setAddOns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Configurator Controls (7 cols) */}
      <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] shadow-sm p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs mb-1">
            <Sliders className="w-4 h-4" />
            <span className="font-mono uppercase tracking-wider">Interactive CPQ Engine</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Dynamic Scope & Pricing Configurator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Self-serve calculator where clients configure deliverables with real-time pricing and instant date reservation gating.
          </p>
        </div>

        {/* 1. Production Tier Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
            1. Select Production Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {CPQ_TIERS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setBaseTier(t.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  baseTier === t.id 
                    ? 'bg-indigo-50 dark:bg-indigo-600/10 border-indigo-500 text-slate-900 dark:text-white shadow-sm ring-1 ring-indigo-500/30' 
                    : 'bg-slate-50 dark:bg-black/60 border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/[0.16]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{t.title}</p>
                  {baseTier === t.id && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-sm"></span>
                  )}
                </div>
                <p className="font-mono tabular-nums text-indigo-600 dark:text-indigo-400 font-bold text-sm mt-1">
                  {formatCurrency(t.price)}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Custom Scope Add-Ons Checklist */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
            2. Custom Scope Add-Ons
          </label>
          <div className="space-y-2 text-xs">
            {CPQ_ADDONS.map(item => (
              <label 
                key={item.key}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addOns[item.key] 
                    ? 'bg-indigo-50 dark:bg-slate-900 border-indigo-300 dark:border-indigo-500/40 text-slate-900 dark:text-white shadow-sm' 
                    : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/[0.14]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(addOns[item.key])}
                    onChange={() => toggleAddon(item.key)}
                    className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="font-mono tabular-nums text-indigo-600 dark:text-indigo-400 font-semibold">
                  +{formatCurrency(item.cost)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. Non-Refundable Date Reservation Deposit Slider */}
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-white/[0.08]">
          <div className="flex justify-between items-center text-xs">
            <div>
              <label htmlFor="deposit-ratio" className="font-semibold text-slate-800 dark:text-slate-200 block cursor-pointer">
                3. Reservation Deposit Ratio
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Non-refundable card pre-auth to lock production calendar
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono tabular-nums text-indigo-600 dark:text-indigo-400 font-bold text-sm bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20 shadow-sm">
                {depositPct}% ({formatCurrency(depositAmount)})
              </span>
            </div>
          </div>

          {/* Range Slider */}
          <div className="space-y-2">
            <input 
              type="range"
              id="deposit-ratio"
              min="10"
              max="60"
              step="5"
              value={depositPct}
              onChange={(e) => setDepositPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-black rounded-lg appearance-none cursor-pointer accent-indigo-600 border border-slate-300 dark:border-white/[0.08]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-400 px-1">
              <span>10% (Flexible hold)</span>
              <span>30% (Standard reserve)</span>
              <span>60% (Priority lock)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex gap-2.5 pt-1">
            {[20, 30, 50].map(pct => (
              <button
                key={pct}
                type="button"
                onClick={() => setDepositPct(pct)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  depositPct === pct 
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm' 
                    : 'bg-slate-100 dark:bg-black border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {pct}% Preset
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Client-Facing Proposal View (5 cols) */}
      <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] shadow-sm p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Proposal Preview</span>
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">Interactive Order #PR-402</h4>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>47:59:12 Left</span>
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Base Tier ({baseTier.toUpperCase()}):</span>
              <span className="text-slate-900 dark:text-slate-100 font-mono tabular-nums font-medium">
                {formatCurrency(CPQ_TIERS.find(t => t.id === baseTier)?.price || 750)}
              </span>
            </div>

            {addOns.florals && (
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Botanical Florals:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono tabular-nums">+{formatCurrency(150)}</span>
              </div>
            )}
            {addOns.glutenFree && (
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Gluten-Free Blend:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono tabular-nums">+{formatCurrency(85)}</span>
              </div>
            )}
            {addOns.rushSetup && (
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Priority Rush 48h:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono tabular-nums">+{formatCurrency(180)}</span>
              </div>
            )}
            {addOns.monogram && (
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Custom Monogram:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono tabular-nums">+{formatCurrency(60)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex justify-between text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Total Project Scope:</span>
              <span className="text-slate-900 dark:text-slate-100 font-mono tabular-nums text-base">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Deposit Highlight Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/80 border border-indigo-200 dark:border-indigo-500/30 shadow-sm space-y-1.5 text-center">
            <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium font-mono">
              Due Now to Lock Calendar Date ({depositPct}%):
            </p>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              {formatCurrency(depositAmount)}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              Secures booking slot on production calendar. Remaining balance of {formatCurrency(totalAmount - depositAmount)} automatically scheduled for project fulfillment.
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={onOpenProposalModal}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Launch Interactive Client Checkout Flow</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText('https://quote.ezibiz.link/PR-402');
              showToast('1-Click Dynamic Proposal URL copied to clipboard!');
            }}
            className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy 1-Click Quote Link</span>
          </button>
        </div>
      </div>
    </div>
  );
}

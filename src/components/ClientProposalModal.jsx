import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2, Check, CreditCard, X, ShieldCheck } from 'lucide-react';
import { 
  CPQ_TIERS, 
  CPQ_ADDONS, 
  calculateScopeTotal, 
  calculateDepositAmount, 
  formatCurrency 
} from '../data/crmsData';

export default function ClientProposalModal({
  isOpen,
  onClose,
  lead,
  defaultTier = 'premium',
  defaultAddOns = { florals: true, glutenFree: false, rushSetup: true, monogram: false },
  depositPct = 30,
  onSimulatePayment
}) {
  const [modalTier, setModalTier] = useState(defaultTier);
  const [modalAddOns, setModalAddOns] = useState(defaultAddOns);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Synchronize state when modal opens or lead changes
  useEffect(() => {
    if (isOpen && lead) {
      setModalTier(defaultTier);
      setModalAddOns({ ...defaultAddOns });
      setIsPaid(lead.stage === 'deposit_secured' || lead.stage === 'production');
      setAgreedToTerms(false);
    }
  }, [isOpen, lead, defaultTier, defaultAddOns]);

  // Full Keyboard Accessibility: Escape key listener & Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore on close
    const previousActiveElement = document.activeElement;

    // Focus the close button for instant keyboard context
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lead) return null;

  const modalTotal = calculateScopeTotal(modalTier, modalAddOns);
  const modalDeposit = calculateDepositAmount(modalTotal, depositPct);
  const remainingBalance = modalTotal - modalDeposit;

  const toggleModalAddon = (key) => {
    setModalAddOns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePayment = () => {
    setIsPaid(true);
    if (onSimulatePayment) {
      onSimulatePayment({ leadId: lead.id, totalAmount: modalTotal, depositAmount: modalDeposit });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-modal-title"
        className="w-full max-w-2xl bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] focus:outline-none"
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 id="proposal-modal-title" className="text-sm font-bold text-white">
                Client Interactive Smart Proposal
              </h3>
              <p className="text-[11px] text-slate-400">
                Live preview of what {lead.name} sees at quote.ezibiz.link/PR-{lead.id}
              </p>
            </div>
          </div>

          <button 
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close proposal modal"
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Proposal Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider">
                Prepared for {lead.name} ({lead.handle})
              </span>
              <h4 className="text-base font-bold text-white">Project Proposal #PR-{lead.id}</h4>
              <p className="text-xs text-slate-300">
                Production Window: <strong className="text-white">{lead.date}</strong>
              </p>
            </div>
            <div className="text-right self-start sm:self-auto">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                48h Reservation Hold
              </span>
            </div>
          </div>

          {isPaid ? (
            /* Confirmed & Escrow Secured State */
            <div className="p-8 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Reservation Confirmed & Calendar Locked!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Deposit of <span className="text-emerald-400 font-mono font-bold">{formatCurrency(modalDeposit)}</span> authorized via secure card escrow.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Booking Reference: <span className="font-mono text-indigo-400 font-bold">BIZ-RES-{lead.id}-2026</span>
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800 leading-relaxed">
                A formal copy of the reservation agreement has been dispatched to <strong className="text-white">{lead.email}</strong>. Remaining balance of {formatCurrency(remainingBalance)} is scheduled for final delivery fulfillment.
              </div>
            </div>
          ) : (
            /* Interactive Configurator & Checkout Flow */
            <div className="space-y-6">
              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white">
                  1. Select Your Service Package:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {CPQ_TIERS.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setModalTier(t.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        modalTier === t.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-semibold text-white">{t.title}</p>
                      <p className="font-mono text-indigo-400 font-bold mt-1">
                        {formatCurrency(t.price)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons Picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white">
                  2. Customize Add-On Deliverables:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {CPQ_ADDONS.map(addon => (
                    <button
                      key={addon.key}
                      type="button"
                      onClick={() => toggleModalAddon(addon.key)}
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        modalAddOns[addon.key]
                          ? 'bg-slate-800 border-indigo-500/50 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          modalAddOns[addon.key] 
                            ? 'bg-indigo-600 border-indigo-500 text-white' 
                            : 'border-slate-700 bg-slate-900'
                        }`}>
                          {modalAddOns[addon.key] && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="text-[11px] font-medium">{addon.label}</span>
                      </div>
                      <span className="font-mono text-indigo-400 text-[11px] font-semibold">
                        +{formatCurrency(addon.cost)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Estimated Project Scope:</span>
                  <span className="text-white font-mono font-bold text-sm">
                    {formatCurrency(modalTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Non-refundable Reservation Deposit ({depositPct}%):</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">
                    {formatCurrency(modalDeposit)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px] pt-1.5 border-t border-slate-900">
                  <span>Remaining Balance Due at Fulfillment:</span>
                  <span className="font-mono">{formatCurrency(remainingBalance)}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <input 
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 min-w-[20px] min-h-[20px] mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                />
                <label htmlFor="terms" className="cursor-pointer text-[11px] leading-relaxed">
                  I understand that placing this <strong className="text-white">{formatCurrency(modalDeposit)}</strong> deposit legally guarantees our production team capacity and reserves the date on the calendar.
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors border border-slate-800 sm:border-transparent min-h-[44px] flex items-center justify-center"
          >
            Close Preview
          </button>

          {!isPaid && (
            <button
              disabled={!agreedToTerms}
              onClick={handlePayment}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px] ${
                agreedToTerms 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-emerald-600/20 hover:scale-[1.01] active:scale-[0.99]' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Authorize Card & Lock Date ({formatCurrency(modalDeposit)})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

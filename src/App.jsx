import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Eye, 
  MessageSquareText, 
  Kanban, 
  Sliders, 
  CheckCircle2,
  Settings
} from 'lucide-react';
import InboxView from './components/InboxView';
import KanbanPipeline from './components/KanbanPipeline';
import CpqBuilder from './components/CpqBuilder';
import EscrowLedger from './components/EscrowLedger';
import ClientProposalModal from './components/ClientProposalModal';
import SettingsModal from './components/SettingsModal';
import { useSettings } from './utils/useSettings';
import { 
  INITIAL_CONVERSATIONS, 
  PIPELINE_STAGES, 
  formatCurrency 
} from './data/crmsData';

export default function App() {
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Synchronize Tab State with URL query param (?tab=...)
  const getInitialTab = () => {
    if (typeof window === 'undefined') return 'inbox';
    const param = new URLSearchParams(window.location.search).get('tab');
    return ['inbox', 'pipeline', 'cpq', 'escrow'].includes(param) ? param : 'inbox';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [selectedChat, setSelectedChat] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);

  // Sync activeTab to URL query parameters
  const handleTabChange = (newTab) => {
    setActiveTabState(newTab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.set('tab', newTab);
      window.history.replaceState({}, '', url);
    }
  };
  const setActiveTab = handleTabChange;

  useEffect(() => {
    const onPopState = () => {
      const param = new URLSearchParams(window.location.search).get('tab');
      if (['inbox', 'pipeline', 'cpq', 'escrow'].includes(param)) {
        setActiveTabState(param);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Client-Facing Interactive Proposal Modal State
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalLead, setProposalLead] = useState(null);

  // CPQ Configurator State
  const [baseTier, setBaseTier] = useState('premium');
  const [addOns, setAddOns] = useState({
    florals: true,
    glutenFree: false,
    rushSetup: true,
    monogram: false
  });
  const [depositPct, setDepositPct] = useState(30);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Move Lead Stage
  const moveLeadStage = (leadId, newStage) => {
    setConversations(prev => prev.map(c => {
      if (c.id === leadId) {
        const stageObj = PIPELINE_STAGES.find(s => s.id === newStage);
        return {
          ...c,
          stage: newStage,
          status: stageObj ? stageObj.label : newStage,
          timeline: [
            { id: Date.now(), action: `Stage changed to "${stageObj?.label || newStage}"`, time: 'Just now' },
            ...c.timeline
          ]
        };
      }
      return c;
    }));
    const stageObj = PIPELINE_STAGES.find(s => s.id === newStage);
    showToast(`Lead moved to "${stageObj?.label || newStage}"`);
  };

  // Send Message with Simulated Customer Response Loop
  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;
    
    const newMsg = {
      sender: 'bot',
      text: textToSend,
      time: 'Just now'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedChat) {
        return {
          ...c,
          lastMessage: textToSend,
          time: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    showToast('Dispatched message to lead!');

    // Simulated client reaction after 2.5s for demo value
    if (textToSend.includes('https://quote.ezibiz.link') || textToSend.includes('deposit') || textToSend.includes('proposal')) {
      setTimeout(() => {
        const clientReplies = [
          "Awesome, opened the interactive proposal on my phone! Reviewing options now.",
          "Got the quote link! Reviewing the package details with my team.",
          "Thanks for the quick turnaround! Looking over the deposit terms."
        ];
        const reply = clientReplies[Math.floor(Math.random() * clientReplies.length)];
        const clientMsg = {
          sender: 'client',
          text: reply,
          time: 'Just now'
        };
        setConversations(prev => prev.map(c => {
          if (c.id === selectedChat) {
            return {
              ...c,
              lastMessage: reply,
              time: 'Just now',
              messages: [...c.messages, clientMsg]
            };
          }
          return c;
        }));
        showToast('Client opened & replied to proposal inquiry!');
      }, 2500);
    }
  };

  // Add Internal Team Note
  const handleAddNote = (noteText) => {
    if (!noteText.trim()) return;
    const noteObj = {
      id: Date.now(),
      author: 'Operations Team',
      text: noteText.trim(),
      time: 'Just now'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedChat) {
        return {
          ...c,
          notes: [noteObj, ...c.notes]
        };
      }
      return c;
    }));

    showToast('Added internal note to client record!');
  };

  // Trigger Client Proposal Modal
  const openClientProposalModal = (lead) => {
    const targetLead = lead || conversations.find(c => c.id === selectedChat) || conversations[0];
    setProposalLead(targetLead);
    setShowProposalModal(true);
  };

  const handleSimulatePayment = (paymentDetails) => {
    if (!proposalLead) return;
    moveLeadStage(proposalLead.id, 'deposit_secured');
    setConversations(prev => prev.map(c => {
      if (c.id === proposalLead.id) {
        return {
          ...c,
          totalScope: paymentDetails?.totalAmount || c.totalScope,
          depositSecured: paymentDetails?.depositAmount || Math.round(c.totalScope * 0.3)
        };
      }
      return c;
    }));
    showToast(`Authorized deposit: ${formatCurrency(paymentDetails?.depositAmount || Math.round(proposalLead.totalScope * 0.3))}! Calendar secured.`);
  };

  // Aggregated Pipeline Metrics
  const totalPipelineValue = conversations.reduce((acc, c) => acc + c.totalScope, 0);
  const totalSecuredValue = conversations.reduce((acc, c) => {
    const isSecured = c.stage === 'deposit_secured' || c.stage === 'production';
    return acc + (isSecured ? (c.depositSecured || Math.round(c.totalScope * 0.3)) : 0);
  }, 0);

  const currentChat = conversations.find(c => c.id === selectedChat) || conversations[0];

  const tabsList = [
    { id: 'inbox', label: t('tabInbox'), icon: MessageSquareText },
    { id: 'pipeline', label: t('tabPipeline'), icon: Kanban },
    { id: 'cpq', label: t('tabCpq'), icon: Sliders },
    { id: 'escrow', label: t('tabEscrow'), icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-200 selection:bg-indigo-500/20 selection:text-indigo-300">
      
      {/* DESKTOP SIDEBAR (Visible >= 768px) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-4 justify-between select-none">
        <div className="space-y-6">
          {/* Top: Branding & Workspace Indicator */}
          <div>
            <div className="flex items-center gap-3 px-1 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0 shadow-sm">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-slate-900 dark:text-slate-100 tracking-tight">EziBiz CRMS</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                    Conversational CRM
                  </span>
                </div>
              </div>
            </div>

            {/* Workspace Indicator */}
            <div className="mt-3 mx-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span className="truncate font-mono">Retail & Services HQ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            </div>
          </div>

          {/* Middle: 4 Vertical Tab Navigation Buttons */}
          <nav className="space-y-1">
            {tabsList.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800/60 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-sm shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Footer: Preview Proposal, Settings Trigger + Suite Waffle Menu */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button 
            type="button"
            onClick={() => openClientProposalModal(currentChat)}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>{t('previewProposal')}</span>
          </button>

          <div className="flex items-center justify-between px-1 pt-1">
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer min-h-[44px]"
              title={t('settings')}
            >
              <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>{t('settings')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR (Visible < 768px) */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight truncate">
            EziBiz CRMS
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            onClick={() => openClientProposalModal(currentChat)}
            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 text-xs font-semibold min-h-[36px]"
          >
            {t('proposalShort')}
          </button>
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors cursor-pointer"
            aria-label={t('settings')}
            title={t('settings')}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="md:pl-64 flex-1 flex flex-col min-w-0 pb-24 md:pb-8 py-6">
        <main className="flex-1 max-w-7xl w-full mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
          
          {/* KPI Intelligence Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('kpiPipelineValue')}</span>
                <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">{formatCurrency(totalPipelineValue)}</div>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono">{t('kpiPipelineValueSub', { count: conversations.length })}</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('kpiSecuredEscrow')}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">{formatCurrency(totalSecuredValue)}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{t('kpiSecuredEscrowSub')}</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('kpiDropoffRate')}</span>
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">2.1%</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{t('kpiDropoffRateSub')}</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('kpiLeadToQuote')}</span>
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-300">42 Seconds</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{t('kpiLeadToQuoteSub')}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"></span>
            <span>{t('aiAutoTriage')}</span>
          </div>

          {/* ========================================================================= */}
          {/* TAB VIEWS                                                                 */}
          {/* ========================================================================= */}
          {activeTab === 'inbox' && (
            <InboxView
              conversations={conversations}
              selectedChatId={selectedChat}
              onSelectChat={setSelectedChat}
              onSendMessage={handleSendMessage}
              onStageChange={(leadId, newStage) => moveLeadStage(leadId, newStage)}
              onOpenProposal={openClientProposalModal}
              onAddNote={handleAddNote}
              showToast={showToast}
            />
          )}

          {activeTab === 'pipeline' && (
            <KanbanPipeline
              conversations={conversations}
              pipelineStages={PIPELINE_STAGES}
              onMoveLeadStage={moveLeadStage}
              onOpenDM={(leadId) => {
                setSelectedChat(leadId);
                handleTabChange('inbox');
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'cpq' && (
            <CpqBuilder
              baseTier={baseTier}
              setBaseTier={setBaseTier}
              addOns={addOns}
              setAddOns={setAddOns}
              depositPct={depositPct}
              setDepositPct={setDepositPct}
              onOpenProposalModal={() => openClientProposalModal(currentChat)}
              showToast={showToast}
            />
          )}

          {activeTab === 'escrow' && (
            <EscrowLedger
              conversations={conversations}
              onOpenProposal={openClientProposalModal}
              showToast={showToast}
            />
          )}

        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible < 768px) */}
      <nav 
        aria-label="Mobile Bottom Navigation" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 h-16 pb-[env(safe-area-inset-bottom)] flex items-center justify-around px-2 shadow-lg transition-colors"
      >
        {tabsList.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-0 transition-colors cursor-pointer ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[10px] mt-1 truncate max-w-[64px]">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}

        {/* 5th Tab: Settings Trigger */}
        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          className="flex flex-col items-center justify-center flex-1 h-full min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="text-[10px] mt-1 truncate max-w-[64px]">{t('settings')}</span>
        </button>
      </nav>

      {/* Client Interactive Smart Proposal Modal */}
      <ClientProposalModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        lead={proposalLead}
        defaultTier={baseTier}
        defaultAddOns={addOns}
        depositPct={depositPct}
        onSimulatePayment={handleSimulatePayment}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-indigo-500/40 text-indigo-300 shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* UNIFIED SETTINGS MODAL */}
      <SettingsModal 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

    </div>
  );
}

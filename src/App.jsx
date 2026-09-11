import React, { useState } from 'react';
import { 
  MessageSquareText, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  DollarSign, 
  ShieldCheck, 
  Copy, 
  Zap, 
  Sliders, 
  Calendar, 
  UserCheck, 
  Layers, 
  Smartphone,
  CreditCard,
  Kanban,
  User,
  Users,
  Phone,
  Mail,
  FileText,
  Tag,
  History,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Eye,
  ArrowUpRight,
  Check,
  Search,
  Filter
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'pipeline' | 'cpq' | 'escrow'
  const [selectedChat, setSelectedChat] = useState(1);
  const [channelFilter, setChannelFilter] = useState('all');
  const [sidebarTab, setSidebarTab] = useState('ai_scope'); // 'ai_scope' | 'crm_profile'
  const [toastMessage, setToastMessage] = useState('');
  const [chatInputText, setChatInputText] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  // Client-Facing Interactive Proposal Modal State
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [modalClientPaid, setModalClientPaid] = useState(false);
  const [modalTier, setModalTier] = useState('premium');
  const [modalAddOns, setModalAddOns] = useState({
    florals: true,
    glutenFree: false,
    rushSetup: true,
    monogram: false
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // CPQ Configurator State
  const [baseTier, setBaseTier] = useState('premium');
  const [addOns, setAddOns] = useState({
    florals: true,
    glutenFree: false,
    rushSetup: true,
    monogram: false
  });
  const [depositPct, setDepositPct] = useState(30);

  const calculateTotal = (tier = baseTier, activeAddOns = addOns) => {
    let base = tier === 'standard' ? 450 : tier === 'premium' ? 750 : 1200;
    if (activeAddOns.florals) base += 150;
    if (activeAddOns.glutenFree) base += 85;
    if (activeAddOns.rushSetup) base += 180;
    if (activeAddOns.monogram) base += 60;
    return base;
  };

  const calculateDeposit = (total, pct = depositPct) => {
    return Math.round(total * (pct / 100));
  };

  // Enriched CRM Leads & Conversations State
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sophie Laurent',
      handle: '@sophie.luxe',
      channel: 'Threads',
      phone: '+1 (555) 849-2041',
      email: 'sophie.laurent@luxedesign.com',
      avatarBg: 'bg-indigo-600',
      lastMessage: 'Awesome, just authorized the 30% card deposit!',
      time: '5m ago',
      stage: 'deposit_secured', // 'inquiry' | 'qualified' | 'proposal_sent' | 'deposit_secured' | 'production'
      status: 'Deposit Secured',
      budget: '$850 - $1,100',
      totalScope: 930,
      depositSecured: 279,
      date: 'Oct 14, 2026',
      scope: '3-Tier Floral Design, 85 Guests',
      vip: true,
      ltv: '$3,400',
      pastProjects: 2,
      notes: [
        { id: 1, author: 'EziBiz AI', text: 'Auto-qualified lead: budget verified, Oct 14 availability validated with zero schedule overlap.', time: '15m ago' },
        { id: 2, author: 'Operations Team', text: 'Client requested organic lavender cream for middle tier. Approved with chef.', time: '8m ago' }
      ],
      timeline: [
        { id: 1, action: 'Threads DM ingested into Intake CRM', time: '10:24 AM' },
        { id: 2, action: 'AI triage qualified scope: $850-$1100 estimate', time: '10:25 AM' },
        { id: 3, action: 'Dispatched Interactive Proposal #PR-402', time: '10:26 AM' },
        { id: 4, action: 'Client opened interactive proposal on mobile', time: '10:28 AM' },
        { id: 5, action: 'Card deposit authorized: $279.00 locked in escrow', time: '10:29 AM' }
      ],
      messages: [
        { sender: 'client', text: 'Hey! Love your work on Threads! How much would it be for a custom 3-tier floral cake for Oct 14? Around 85 guests in Brooklyn.', time: '10:24 AM' },
        { sender: 'bot', text: 'Hi Sophie! We would love to help! For 85 guests with botanical florals, our pricing ranges from $750 to $950 depending on tier finishes. Here is your custom interactive proposal to customize flavors and lock your date with a reservation deposit: https://quote.ezibiz.link/PR-402', time: '10:25 AM' },
        { sender: 'client', text: 'Awesome, just authorized the 30% card deposit! Excited to work together!', time: '10:29 AM' }
      ]
    },
    {
      id: 2,
      name: 'Marcus Sterling',
      handle: '@marcus_brand',
      channel: 'Instagram',
      phone: '+1 (555) 304-9912',
      email: 'marcus@sterlingfashion.co',
      avatarBg: 'bg-pink-600',
      lastMessage: 'Reviewing the interactive proposal now.',
      time: '24m ago',
      stage: 'proposal_sent',
      status: 'Proposal Dispatched',
      budget: '$1,800',
      totalScope: 1800,
      depositSecured: 0,
      date: 'Nov 02, 2026',
      scope: 'Branding Suite & Social Assets',
      vip: false,
      ltv: '$0 (New)',
      pastProjects: 0,
      notes: [
        { id: 1, author: 'EziBiz AI', text: 'Identified urgent rush turnaround requirement (Nov 02 deadline).', time: '28m ago' }
      ],
      timeline: [
        { id: 1, action: 'Instagram DM ingested via Meta Graph API', time: '09:40 AM' },
        { id: 2, action: 'AI generated package quote PR-403', time: '09:41 AM' },
        { id: 3, action: 'Client clicked quote link from DM', time: '09:44 AM' }
      ],
      messages: [
        { sender: 'client', text: 'Need a brand redesign package for my clothing line. Can you DM me your rates?', time: '09:40 AM' },
        { sender: 'bot', text: 'Hi Marcus! Thanks for reaching out. Based on your scope, our brand suites range from $1,200 - $2,500. Configure your package and lock your project start date here: https://quote.ezibiz.link/PR-403', time: '09:41 AM' },
        { sender: 'client', text: 'Reviewing the interactive proposal now.', time: '09:45 AM' }
      ]
    },
    {
      id: 3,
      name: 'Elena Rostova',
      handle: '+1 (555) 392-8819',
      channel: 'WhatsApp',
      phone: '+1 (555) 392-8819',
      email: 'elena.rostova@gourmetdinners.com',
      avatarBg: 'bg-emerald-600',
      lastMessage: 'Does the deposit apply towards final bill?',
      time: '1h ago',
      stage: 'qualified',
      status: 'AI Scope Qualified',
      budget: '$600',
      totalScope: 600,
      depositSecured: 0,
      date: 'Dec 18, 2026',
      scope: 'Holiday Private Dinner Catering (12 pax)',
      vip: false,
      ltv: '$1,200',
      pastProjects: 1,
      notes: [
        { id: 1, author: 'EziBiz AI', text: 'Returning customer from 2025 holiday roster. High conversion probability.', time: '1h ago' }
      ],
      timeline: [
        { id: 1, action: 'WhatsApp business message received', time: '08:30 AM' },
        { id: 2, action: 'Matched existing CRM contact record #C-109', time: '08:30 AM' },
        { id: 3, action: 'AI validated chef availability for Dec 18', time: '08:31 AM' }
      ],
      messages: [
        { sender: 'client', text: 'Hello! Looking for private dinner catering for 12 people on Dec 18. Are you available?', time: '08:30 AM' },
        { sender: 'bot', text: 'Hello Elena! Yes, Dec 18 is currently open. Private dinners start at $50/head. Generated instant estimate: https://quote.ezibiz.link/PR-404', time: '08:31 AM' },
        { sender: 'client', text: 'Does the deposit apply towards final bill?', time: '08:35 AM' }
      ]
    },
    {
      id: 4,
      name: 'Apex Creative Studio',
      handle: '@apexcreativelab',
      channel: 'Web',
      phone: '+1 (555) 441-9210',
      email: 'ops@apexcreativelab.io',
      avatarBg: 'bg-purple-600',
      lastMessage: 'Deposit authorized. Awaiting shift calendar confirmation.',
      time: '2h ago',
      stage: 'production',
      status: 'Production Active',
      budget: '$2,500',
      totalScope: 2500,
      depositSecured: 750,
      date: 'Oct 28, 2026',
      scope: 'Commercial Video & Set Catering',
      vip: true,
      ltv: '$8,900',
      pastProjects: 4,
      notes: [
        { id: 1, author: 'EziBiz AI', text: 'Deposit verified. Shift automatically created in ezibiz-hrms.', time: '2h ago' }
      ],
      timeline: [
        { id: 1, action: 'Interactive intake form submitted', time: '07:15 AM' },
        { id: 2, action: 'Stripe payment of $750 deposit settled', time: '07:22 AM' },
        { id: 3, action: 'Production shift auto-scheduled for Oct 28', time: '07:23 AM' }
      ],
      messages: [
        { sender: 'client', text: 'Hi team, submitted our commercial catering specs for Oct 28.', time: '07:15 AM' },
        { sender: 'bot', text: 'Thanks Apex! Proposal generated: https://quote.ezibiz.link/PR-401', time: '07:16 AM' },
        { sender: 'client', text: 'Deposit authorized. Awaiting shift calendar confirmation.', time: '07:24 AM' }
      ]
    }
  ]);

  const currentChat = conversations.find(c => c.id === selectedChat) || conversations[0];

  const filteredConversations = channelFilter === 'all'
    ? conversations
    : conversations.filter(c => c.channel.toLowerCase() === channelFilter.toLowerCase());

  // Pipeline Stages Definition
  const pipelineStages = [
    { id: 'inquiry', label: 'New Inquiry', color: 'border-slate-700 bg-slate-900/50' },
    { id: 'qualified', label: 'AI Qualified', color: 'border-cyan-500/30 bg-cyan-950/20' },
    { id: 'proposal_sent', label: 'Proposal Sent', color: 'border-amber-500/30 bg-amber-950/20' },
    { id: 'deposit_secured', label: 'Deposit Secured', color: 'border-emerald-500/30 bg-emerald-950/20' },
    { id: 'production', label: 'In Production', color: 'border-indigo-500/30 bg-indigo-950/20' }
  ];

  // Move Lead Stage
  const moveLeadStage = (leadId, newStage) => {
    setConversations(prev => prev.map(c => {
      if (c.id === leadId) {
        const stageObj = pipelineStages.find(s => s.id === newStage);
        return {
          ...c,
          stage: newStage,
          status: stageObj ? stageObj.label : newStage,
          timeline: [
            { id: Date.now(), action: `Stage changed to "${stageObj?.label}"`, time: 'Just now' },
            ...c.timeline
          ]
        };
      }
      return c;
    }));
    showToast(`Lead moved to "${pipelineStages.find(s => s.id === newStage)?.label}"`);
  };

  // Send Message
  const handleSendMessage = (textToSend = chatInputText) => {
    if (!textToSend.trim()) return;
    
    const newMsg = {
      sender: 'bot',
      text: textToSend,
      time: 'Just now'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === currentChat.id) {
        return {
          ...c,
          lastMessage: textToSend,
          time: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setChatInputText('');
    showToast('Dispatched message to lead!');
  };

  // Add Internal Team Note
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const noteObj = {
      id: Date.now(),
      author: 'Operations Team',
      text: newNoteText.trim(),
      time: 'Just now'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === currentChat.id) {
        return {
          ...c,
          notes: [noteObj, ...c.notes]
        };
      }
      return c;
    }));

    setNewNoteText('');
    showToast('Added internal note to client record!');
  };

  // Trigger Client Proposal Modal
  const openClientProposalModal = (lead = currentChat) => {
    setModalTier(baseTier);
    setModalAddOns({ ...addOns });
    setModalClientPaid(lead.stage === 'deposit_secured' || lead.stage === 'production');
    setAgreedToTerms(false);
    setShowProposalModal(true);
  };

  const handleSimulatePayment = () => {
    setModalClientPaid(true);
    moveLeadStage(currentChat.id, 'deposit_secured');
    showToast('Simulated Stripe Pre-Auth: $279 Deposit Charged! Calendar slot locked.');
  };

  // Calculate modal total
  const modalTotal = calculateTotal(modalTier, modalAddOns);
  const modalDeposit = calculateDeposit(modalTotal, depositPct);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="https://ezibiz-hub.pages.dev" 
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </a>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <MessageSquareText className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white tracking-tight">EziBiz CRMS</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Conversational CRM
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => openClientProposalModal(currentChat)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-slate-900 border border-indigo-500/30 text-indigo-300 hover:bg-slate-800 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Client Smart Proposal</span>
            </button>
            <button 
              onClick={() => setActiveTab('cpq')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CPQ Builder</span>
            </button>
            <a 
              href="https://github.com/Amran-KakiTekno/ezibiz-crms" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* KPI Intelligence Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Total Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">$5,830.00</div>
            <p className="text-[11px] text-indigo-400 font-medium">4 active client accounts</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Secured via Escrow</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">$1,029.00</div>
            <p className="text-[11px] text-slate-500">Non-refundable card pre-auth</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Ghosting Rate</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">2.1%</div>
            <p className="text-[11px] text-slate-500">Down from 35% without deposit gating</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Avg. Lead-to-Quote</span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold font-mono text-indigo-300">42 Seconds</div>
            <p className="text-[11px] text-slate-500">Instant CPQ automation</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex">
            {[
              { id: 'inbox', label: 'Omnichannel Inbox', icon: MessageSquareText },
              { id: 'pipeline', label: 'Deal Pipeline Kanban', icon: Kanban },
              { id: 'cpq', label: 'Dynamic CPQ Estimator', icon: Sliders },
              { id: 'escrow', label: 'Deposit & Escrow Ledger', icon: ShieldCheck }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-all ${
                    activeTab === tab.id 
                      ? 'border-indigo-500 text-white font-semibold' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 pb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI Auto-Triage Active (WhatsApp • Instagram • Threads)</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OMNICHANNEL CONVERSATIONAL INBOX                                   */}
        {/* ========================================================================= */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden min-h-[620px]">
            
            {/* Left Column: Inquiry Threads List */}
            <div className="lg:col-span-3 border-r border-slate-800 flex flex-col">
              <div className="p-3.5 border-b border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Inquiries</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {filteredConversations.length} leads
                  </span>
                </div>
                {/* Channel Filter Chips */}
                <div className="flex gap-1 overflow-x-auto text-[10px] no-scrollbar">
                  {['all', 'Threads', 'Instagram', 'WhatsApp', 'Web'].map(chan => (
                    <button
                      key={chan}
                      onClick={() => setChannelFilter(chan)}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        channelFilter === chan 
                          ? 'bg-indigo-600 text-white font-medium' 
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {chan}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Thread List */}
              <div className="divide-y divide-slate-800/60 overflow-y-auto flex-1 max-h-[580px]">
                {filteredConversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-3.5 cursor-pointer transition-all ${
                      selectedChat === conv.id 
                        ? 'bg-slate-800/80 border-l-2 border-indigo-500' 
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${conv.avatarBg} text-white flex items-center justify-center text-xs font-bold shadow-sm`}>
                          {conv.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-white truncate max-w-[110px]">{conv.name}</p>
                            {conv.vip && (
                              <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                                VIP
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{conv.handle} • {conv.channel}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{conv.time}</span>
                    </div>
                    
                    <p className="text-xs text-slate-300 mt-2 line-clamp-1">{conv.lastMessage}</p>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                        conv.stage === 'deposit_secured' 
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                          : conv.stage === 'proposal_sent'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : conv.stage === 'production'
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {conv.status}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        ${conv.totalScope}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Column: Active Chat & AI Macro Responses */}
            <div className="lg:col-span-5 flex flex-col justify-between border-r border-slate-800 bg-slate-950/40">
              
              {/* Chat Header */}
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${currentChat.avatarBg} text-white flex items-center justify-center text-xs font-bold`}>
                    {currentChat.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{currentChat.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        via {currentChat.channel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">{currentChat.handle} • {currentChat.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={currentChat.stage}
                    onChange={(e) => moveLeadStage(currentChat.id, e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                  >
                    {pipelineStages.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Feed */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1 max-h-[440px]">
                <div className="text-center my-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                    Inquiry ingested via {currentChat.channel} webhook • AI Triaged
                  </span>
                </div>

                {currentChat.messages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'client' ? 'items-start' : 'items-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      m.sender === 'client' 
                        ? 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700/50' 
                        : 'bg-indigo-600 text-white rounded-br-sm shadow-md'
                    }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* AI Quick Reply Macro Chips */}
              <div className="px-3 pt-2 pb-1 border-t border-slate-800/80 bg-slate-900/40">
                <p className="text-[10px] text-slate-400 font-medium mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>AI Quick Reply Macros:</span>
                </p>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  <button 
                    onClick={() => handleSendMessage(`Hi ${currentChat.name}! We have locked your specs. Here is your custom interactive quote to lock your date with a 30% deposit: https://quote.ezibiz.link/PR-${currentChat.id}`)}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/50 whitespace-nowrap transition-colors"
                  >
                    ⚡ Dispatch Dynamic Quote Link
                  </button>
                  <button 
                    onClick={() => handleSendMessage(`Great news! Our calendar for ${currentChat.date} is currently open. We require a 30% deposit hold to guarantee this reservation.`)}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-800 whitespace-nowrap transition-colors"
                  >
                    📅 Confirm Availability
                  </button>
                  <button 
                    onClick={() => handleSendMessage(`Friendly reminder: Your interactive proposal #PR-${currentChat.id} expires in 24 hours. Reserve your date now: https://quote.ezibiz.link/PR-${currentChat.id}`)}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-800 whitespace-nowrap transition-colors"
                  >
                    ⏳ Expiration Nudge
                  </button>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center gap-2">
                <input 
                  type="text"
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type reply or pick an AI macro chip above..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Client 360° Profile & AI Drawer (Inspired by Twenty & Attio) */}
            <div className="lg:col-span-4 p-4 bg-slate-900 flex flex-col justify-between space-y-4">
              
              {/* Drawer Tabs */}
              <div>
                <div className="flex border-b border-slate-800 text-xs mb-3">
                  <button
                    onClick={() => setSidebarTab('ai_scope')}
                    className={`flex-1 pb-2 font-medium border-b-2 text-center transition-colors ${
                      sidebarTab === 'ai_scope'
                        ? 'border-indigo-500 text-white font-semibold'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    AI Scope & CPQ
                  </button>
                  <button
                    onClick={() => setSidebarTab('crm_profile')}
                    className={`flex-1 pb-2 font-medium border-b-2 text-center transition-colors ${
                      sidebarTab === 'crm_profile'
                        ? 'border-indigo-500 text-white font-semibold'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    Client 360° & Notes
                  </button>
                </div>

                {/* Subtab A: AI Extracted Scope & CPQ */}
                {sidebarTab === 'ai_scope' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Triaged Scope</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        100% Match
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400">Target Date:</span>
                        <p className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{currentChat.date}</span>
                        </p>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400">Detected Scope Deliverables:</span>
                        <p className="text-white font-medium mt-0.5">{currentChat.scope}</p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400">Estimated Budget:</span>
                        <span className="text-emerald-400 font-mono font-bold">{currentChat.budget}</span>
                      </div>
                    </div>

                    {/* Deposit Gating Safeguard */}
                    <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/30 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Deposit Gating Policy Active</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Calendar reservation is conditionally held for 48h. A 30% card deposit ({`$${Math.round(currentChat.totalScope * 0.3)}`}) is required to prevent uncompensated ghosting.
                      </p>
                    </div>

                    {/* Quick Proposal Action */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => openClientProposalModal(currentChat)}
                        className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Interactive Proposal Preview</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(`https://quote.ezibiz.link/PR-${currentChat.id}`);
                          showToast('1-Click Quote & Deposit URL copied!');
                        }}
                        className="w-full py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
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
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                        <span className="text-slate-400">Account Type</span>
                        <span className="text-xs font-semibold text-white">
                          {currentChat.vip ? '🌟 VIP High-Touch Client' : 'Standard Client'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400">Lifetime Value</span>
                          <p className="font-mono text-emerald-400 font-bold">{currentChat.ltv}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Past Bookings</span>
                          <p className="font-mono text-white font-medium">{currentChat.pastProjects} orders</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] space-y-1">
                        <p className="text-slate-400 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-300">{currentChat.phone}</span>
                        </p>
                        <p className="text-slate-400 flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-300 truncate">{currentChat.email}</span>
                        </p>
                      </div>
                    </div>

                    {/* Team Internal Notes */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Internal Notes ({currentChat.notes.length})</span>
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-32 overflow-y-auto">
                        {currentChat.notes.map(note => (
                          <div key={note.id} className="p-2 rounded bg-slate-950 border border-slate-800/80 text-[11px] space-y-0.5">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span className="font-medium text-indigo-300">{note.author}</span>
                              <span>{note.time}</span>
                            </div>
                            <p className="text-slate-300 leading-snug">{note.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Add Note Input */}
                      <div className="flex gap-1.5">
                        <input 
                          type="text"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                          placeholder="Add team note (e.g. dietary specs)..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                        />
                        <button 
                          onClick={handleAddNote}
                          className="px-2.5 py-1 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Relationship Activity Audit Trail */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                        <History className="w-3 h-3 text-slate-500" />
                        <span>Activity Audit Log</span>
                      </span>
                      <div className="space-y-1 max-h-28 overflow-y-auto">
                        {currentChat.timeline.map((act, i) => (
                          <div key={i} className="text-[10px] flex items-start gap-1.5 text-slate-400">
                            <span className="text-indigo-400 font-bold mt-0.5">•</span>
                            <span className="flex-1 leading-tight">{act.action}</span>
                            <span className="text-slate-500 font-mono text-[9px]">{act.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Module Integration Shortcuts */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] space-y-1.5">
                <span className="text-slate-400 font-medium">Handoff to EziBiz Suite:</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://ezibiz-hrms.pages.dev"
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>Scheduling</span>
                  </a>
                  <a
                    href="https://ezibiz-akaun.pages.dev"
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>Invoicing</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DEAL PIPELINE KANBAN BOARD (Inspired by Atomic CRM & HoneyBook)    */}
        {/* ========================================================================= */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">Client Intake Deal Pipeline</h3>
                <p className="text-xs text-slate-400">Track client relationships from raw social inquiry to deposit authorization and production fulfillment.</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => showToast('Syncing webhook events from WhatsApp & Meta Graph API...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
                >
                  Refresh Ingest Stream
                </button>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 min-h-[520px]">
              {pipelineStages.map(stage => {
                const stageLeads = conversations.filter(c => c.stage === stage.id);
                const stageTotal = stageLeads.reduce((acc, c) => acc + c.totalScope, 0);

                return (
                  <div key={stage.id} className="rounded-xl bg-slate-900 border border-slate-800 flex flex-col overflow-hidden">
                    
                    {/* Stage Header */}
                    <div className={`p-3 border-b ${stage.color} flex items-center justify-between`}>
                      <div>
                        <h4 className="text-xs font-bold text-white">{stage.label}</h4>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">${stageTotal.toLocaleString()} total</p>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                        {stageLeads.length}
                      </span>
                    </div>

                    {/* Stage Lead Cards */}
                    <div className="p-2.5 space-y-2.5 flex-1 overflow-y-auto max-h-[480px]">
                      {stageLeads.length === 0 ? (
                        <div className="h-32 flex items-center justify-center text-center p-4 border border-dashed border-slate-800 rounded-lg">
                          <p className="text-[11px] text-slate-500">No deals in this stage</p>
                        </div>
                      ) : (
                        stageLeads.map(lead => (
                          <div 
                            key={lead.id}
                            className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-2.5 shadow-sm group"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div>
                                <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                                  {lead.name}
                                </span>
                                <p className="text-[10px] text-slate-400">{lead.handle}</p>
                              </div>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                                {lead.channel}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-300 line-clamp-2">{lead.scope}</p>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                              <span className="font-mono text-emerald-400 font-bold">${lead.totalScope}</span>
                              <span className="text-[10px] text-slate-400">{lead.date}</span>
                            </div>

                            {/* Card Actions */}
                            <div className="pt-2 border-t border-slate-900/80 flex items-center justify-between text-[11px]">
                              <button
                                onClick={() => {
                                  setSelectedChat(lead.id);
                                  setActiveTab('inbox');
                                }}
                                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                              >
                                <span>Open DM</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>

                              {/* Move Next Stage Shortcut */}
                              {stage.id !== 'production' && (
                                <button
                                  onClick={() => {
                                    const nextIdx = pipelineStages.findIndex(s => s.id === stage.id) + 1;
                                    if (nextIdx < pipelineStages.length) {
                                      moveLeadStage(lead.id, pipelineStages[nextIdx].id);
                                    }
                                  }}
                                  className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-400 border border-slate-800 transition-colors"
                                >
                                  Advance &rarr;
                                </button>
                              )}
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
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DYNAMIC CPQ ESTIMATOR & PROPOSAL BUILDER                          */}
        {/* ========================================================================= */}
        {activeTab === 'cpq' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Configurator Controls */}
            <div className="lg:col-span-7 rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">Dynamic CPQ Scope Builder</h3>
                <p className="text-xs text-slate-400">Self-serve calculator where leads customize scope and see instant pricing without wasting hours drafting manual proposals.</p>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Select Production Tier</label>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  {[
                    { id: 'standard', title: 'Standard Tier', price: '$450' },
                    { id: 'premium', title: 'Artisanal Studio', price: '$750' },
                    { id: 'luxury', title: 'Masterpiece Bespoke', price: '$1,200' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setBaseTier(t.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        baseTier === t.id 
                          ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-600/10' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-semibold text-white">{t.title}</p>
                      <p className="font-mono text-indigo-400 font-bold mt-1">{t.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons Checklist */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Custom Scope Add-Ons</label>
                <div className="space-y-2 text-xs">
                  {[
                    { key: 'florals', label: 'Fresh Botanical Floral Accents', cost: '+$150' },
                    { key: 'glutenFree', label: 'Organic Gluten-Free / Vegan Blend', cost: '+$85' },
                    { key: 'rushSetup', label: 'Priority 48-Hour Rush Production', cost: '+$180' },
                    { key: 'monogram', label: 'Handcrafted Monogram Fondant', cost: '+$60' }
                  ].map(item => (
                    <div 
                      key={item.key}
                      onClick={() => setAddOns(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        addOns[item.key] 
                          ? 'bg-slate-800/80 border-indigo-500/40 text-white' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          addOns[item.key] ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                        }`}>
                          {addOns[item.key] && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <span className="font-mono text-indigo-400 font-medium">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deposit Gating Ratio */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-300">Non-Refundable Date Reservation Deposit</span>
                  <span className="font-mono text-indigo-400 font-bold">{depositPct}% Required</span>
                </div>
                <div className="flex gap-3">
                  {[20, 30, 50].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setDepositPct(pct)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        depositPct === pct 
                          ? 'bg-indigo-600 text-white border-indigo-500' 
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {pct}% Deposit
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Client-Facing Proposal View */}
            <div className="lg:col-span-5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/30 p-6 flex flex-col justify-between space-y-6 shadow-2xl relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-indigo-400 font-semibold tracking-wider">
                      Client Interactive Proposal Preview
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">Artisanal Project Order #PR-402</h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>47:59:12 Left</span>
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Tier ({baseTier.toUpperCase()}):</span>
                    <span className="text-white font-mono">${baseTier === 'standard' ? 450 : baseTier === 'premium' ? 750 : 1200}</span>
                  </div>
                  {addOns.florals && (
                    <div className="flex justify-between text-slate-400">
                      <span>Botanical Florals:</span>
                      <span className="text-white font-mono">+$150</span>
                    </div>
                  )}
                  {addOns.glutenFree && (
                    <div className="flex justify-between text-slate-400">
                      <span>Gluten-Free Blend:</span>
                      <span className="text-white font-mono">+$85</span>
                    </div>
                  )}
                  {addOns.rushSetup && (
                    <div className="flex justify-between text-slate-400">
                      <span>Priority Rush 48h:</span>
                      <span className="text-white font-mono">+$180</span>
                    </div>
                  )}
                  {addOns.monogram && (
                    <div className="flex justify-between text-slate-400">
                      <span>Custom Monogram:</span>
                      <span className="text-white font-mono">+$60</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-semibold">
                    <span className="text-slate-300">Total Project Scope:</span>
                    <span className="text-white font-mono">${calculateTotal()}</span>
                  </div>
                </div>

                {/* Deposit Highlight Box */}
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 text-center">
                  <p className="text-xs text-indigo-300 font-medium">Due Now to Lock Calendar Date ({depositPct}%):</p>
                  <div className="text-2xl font-bold font-mono text-white">${calculateDeposit(calculateTotal())}</div>
                  <p className="text-[11px] text-slate-400">Remaining balance automatically scheduled for project completion.</p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openClientProposalModal(currentChat)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch Interactive Client Checkout Flow</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('https://quote.ezibiz.link/PR-402');
                    showToast('Proposal link copied to clipboard!');
                  }}
                  className="w-full py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy 1-Click Quote Link</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DEPOSIT & CALENDAR ESCROW LEDGER                                   */}
        {/* ========================================================================= */}
        {activeTab === 'escrow' && (
          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Calendar Reservations & Escrow Ledger</h3>
                <p className="text-xs text-slate-400">Production dates are legally guaranteed only after non-refundable card pre-authorization.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Zero Ghosting Active
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-800/60 text-xs">
              {conversations.map((lead) => {
                const isSecured = lead.stage === 'deposit_secured' || lead.stage === 'production';
                const depositAmt = isSecured ? Math.round(lead.totalScope * 0.3) : 0;
                const remainingAmt = lead.totalScope - depositAmt;

                return (
                  <div key={lead.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-850/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white text-sm">{lead.name}</p>
                        <span className="text-slate-500">({lead.handle})</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {lead.channel}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">Target Date: <span className="text-white font-medium">{lead.date}</span> • Scope: {lead.scope}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right space-y-0.5">
                        <p className={`font-mono font-bold text-sm ${isSecured ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isSecured ? `$${depositAmt}.00 Secured` : 'Pending Deposit'}
                        </p>
                        <p className="text-slate-500 font-mono text-xs">
                          {isSecured ? `Balance $${remainingAmt}.00 on completion` : `Total $${lead.totalScope}.00`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSecured ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Date Escrow Locked</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => openClientProposalModal(lead)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                          >
                            Collect Deposit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE CLIENT SMART PROPOSAL MODAL (HoneyBook / Smart File Pattern)  */}
      {/* ========================================================================= */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Client Interactive Smart Proposal</h3>
                  <p className="text-[11px] text-slate-400">Live preview of what {currentChat.name} sees at quote.ezibiz.link/PR-{currentChat.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProposalModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1.5 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Proposal Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider">
                    Prepared for {currentChat.name} ({currentChat.handle})
                  </span>
                  <h4 className="text-base font-bold text-white">Artisanal Project Proposal #PR-{currentChat.id}</h4>
                  <p className="text-xs text-slate-400">Production Window: <strong className="text-white">{currentChat.date}</strong></p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    48h Reservation Hold
                  </span>
                </div>
              </div>

              {modalClientPaid ? (
                /* Confirmed State */
                <div className="p-8 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Reservation Confirmed & Calendar Locked!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Deposit of <span className="text-emerald-400 font-mono font-bold">${modalDeposit}.00</span> authorized.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Booking Reference: <span className="font-mono text-indigo-400 font-bold">BIZ-RES-{currentChat.id}-2026</span>
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-400 border border-slate-800">
                    A copy of the reservation agreement has been dispatched to {currentChat.email}. Remaining balance of ${modalTotal - modalDeposit}.00 is scheduled upon project delivery.
                  </div>
                </div>
              ) : (
                /* Interactive Configurator & Checkout */
                <div className="space-y-6">
                  {/* Tier Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white">1. Select Your Service Package:</label>
                    <div className="grid grid-cols-3 gap-2.5 text-xs">
                      {[
                        { id: 'standard', title: 'Standard', price: '$450' },
                        { id: 'premium', title: 'Artisanal Studio', price: '$750' },
                        { id: 'luxury', title: 'Masterpiece', price: '$1,200' }
                      ].map(t => (
                        <div
                          key={t.id}
                          onClick={() => setModalTier(t.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            modalTier === t.id
                              ? 'bg-indigo-600/20 border-indigo-500 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <p className="font-semibold text-white">{t.title}</p>
                          <p className="font-mono text-indigo-400 font-bold mt-1">{t.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white">2. Customize Add-On Services:</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { key: 'florals', label: 'Fresh Botanical Florals', cost: '+$150' },
                        { key: 'glutenFree', label: 'Organic Gluten-Free Blend', cost: '+$85' },
                        { key: 'rushSetup', label: 'Priority Rush 48h Production', cost: '+$180' },
                        { key: 'monogram', label: 'Handcrafted Monogram', cost: '+$60' }
                      ].map(addon => (
                        <div
                          key={addon.key}
                          onClick={() => setModalAddOns(prev => ({ ...prev, [addon.key]: !prev[addon.key] }))}
                          className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                            modalAddOns[addon.key]
                              ? 'bg-slate-800 border-indigo-500/50 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                              modalAddOns[addon.key] ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                            }`}>
                              {modalAddOns[addon.key] && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="text-[11px]">{addon.label}</span>
                          </div>
                          <span className="font-mono text-indigo-400 text-[11px] font-semibold">{addon.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown Summary */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Total Estimated Project Scope:</span>
                      <span className="text-white font-mono font-bold text-sm">${modalTotal}.00</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Non-refundable Reservation Deposit ({depositPct}%):</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">${modalDeposit}.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-900">
                      <span>Remaining Balance Due at Fulfillment:</span>
                      <span className="font-mono">${modalTotal - modalDeposit}.00</span>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <input 
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="terms" className="cursor-pointer text-[11px]">
                      I understand that placing this <strong className="text-white">${modalDeposit}.00</strong> deposit legally guarantees my date on the production calendar and is non-refundable.
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <button
                onClick={() => setShowProposalModal(false)}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-xs font-medium"
              >
                Close Preview
              </button>

              {!modalClientPaid && (
                <button
                  disabled={!agreedToTerms}
                  onClick={handleSimulatePayment}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-lg flex items-center gap-2 ${
                    agreedToTerms 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-emerald-600/20' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Authorize Card & Lock Date (${modalDeposit}.00)</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-indigo-500/40 text-indigo-300 shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

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
  CreditCard
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedChat, setSelectedChat] = useState(1);
  const [channelFilter, setChannelFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // CPQ Dynamic Configurator State
  const [baseTier, setBaseTier] = useState('premium');
  const [guestCount, setGuestCount] = useState(85);
  const [addOns, setAddOns] = useState({
    florals: true,
    glutenFree: false,
    rushSetup: true,
    monogram: false
  });
  const [depositPct, setDepositPct] = useState(30);

  const calculateTotal = () => {
    let base = baseTier === 'standard' ? 450 : baseTier === 'premium' ? 750 : 1200;
    if (addOns.florals) base += 150;
    if (addOns.glutenFree) base += 85;
    if (addOns.rushSetup) base += 180;
    if (addOns.monogram) base += 60;
    return base;
  };

  const calculateDeposit = () => {
    return Math.round(calculateTotal() * (depositPct / 100));
  };

  // Conversations Mockup
  const conversations = [
    {
      id: 1,
      name: 'Sophie Laurent',
      handle: '@sophie.luxe',
      channel: 'Threads',
      avatarBg: 'bg-indigo-500',
      lastMessage: 'Awesome, just authorized the 30% card deposit!',
      time: '5m ago',
      status: 'Deposit Secured',
      budget: '$850 - $1,100',
      date: 'Oct 14, 2026',
      scope: '3-Tier Floral Design, 85 Guests',
      messages: [
        { sender: 'client', text: 'Hey! Love your work on Threads! How much would it be for a custom 3-tier floral cake for Oct 14? Around 85 guests in Brooklyn.', time: '10:24 AM' },
        { sender: 'bot', text: 'Hi Sophie! We would love to help! For 85 guests with botanical florals, our pricing ranges from $750 to $950 depending on tier finishes. Here is your custom interactive proposal to customize flavors and lock your date with a reservation deposit: https://quote.bizops.link/PR-402', time: '10:25 AM' },
        { sender: 'client', text: 'Awesome, just authorized the 30% card deposit! Excited to work together!', time: '10:29 AM' }
      ]
    },
    {
      id: 2,
      name: 'Marcus Sterling',
      handle: '@marcus_brand',
      channel: 'Instagram',
      avatarBg: 'bg-pink-500',
      lastMessage: 'Reviewing the interactive proposal now.',
      time: '24m ago',
      status: 'Proposal Dispatched',
      budget: '$1,800',
      date: 'Nov 02, 2026',
      scope: 'Branding Suite & Social Assets',
      messages: [
        { sender: 'client', text: 'Need a brand redesign package for my clothing line. Can you DM me your rates?', time: '09:40 AM' },
        { sender: 'bot', text: 'Hi Marcus! Thanks for reaching out. Based on your scope, our brand suites range from $1,200 - $2,500. Configure your package and lock your project start date here: https://quote.bizops.link/PR-403', time: '09:41 AM' }
      ]
    },
    {
      id: 3,
      name: 'Elena Rostova',
      handle: '+1 (555) 392-8819',
      channel: 'WhatsApp',
      avatarBg: 'bg-emerald-500',
      lastMessage: 'Does the deposit apply towards final bill?',
      time: '1h ago',
      status: 'Inquiry Ingested',
      budget: '$600',
      date: 'Dec 18, 2026',
      scope: 'Holiday Private Dinner Catering',
      messages: [
        { sender: 'client', text: 'Hello! Looking for private dinner catering for 12 people on Dec 18. Are you available?', time: '08:30 AM' },
        { sender: 'bot', text: 'Hello Elena! Yes, Dec 18 is currently open. Private dinners start at $50/head. Generated instant estimate: https://quote.bizops.link/PR-404', time: '08:31 AM' }
      ]
    }
  ];

  const currentChat = conversations.find(c => c.id === selectedChat) || conversations[0];

  const filteredConversations = channelFilter === 'all'
    ? conversations
    : conversations.filter(c => c.channel.toLowerCase() === channelFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="https://bizops-portal.pages.dev" 
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
              <span className="font-bold text-base text-white tracking-tight">BizOps Intake</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Module 2
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('cpq')}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CPQ Quote Builder</span>
            </button>
            <a 
              href="https://github.com/Amran-KakiTekno/bizops-intake" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Ingested DM Inquiries</span>
            <div className="text-xl font-bold font-mono text-white">42 Inquiries</div>
            <p className="text-[11px] text-indigo-400 font-medium">100% AI triaged in under 60s</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Locked via Deposits</span>
            <div className="text-xl font-bold font-mono text-emerald-400">$8,650.00</div>
            <p className="text-[11px] text-slate-500">Non-refundable card holds</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Ghosting Rate</span>
            <div className="text-xl font-bold font-mono text-emerald-400">3.8%</div>
            <p className="text-[11px] text-slate-500">Down from 35% before gating</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Avg. Proposal Turnaround</span>
            <div className="text-xl font-bold font-mono text-indigo-300">45 Seconds</div>
            <p className="text-[11px] text-slate-500">Instant CPQ estimation</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 text-xs">
          {[
            { id: 'inbox', label: 'Omnichannel Social DM Inbox' },
            { id: 'cpq', label: 'Dynamic CPQ & Price Estimator' },
            { id: 'escrow', label: 'Deposit & Calendar Escrow' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-indigo-500 text-white' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Omnichannel DM Inbox */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden min-h-[560px]">
            
            {/* Conversation List Sidebar */}
            <div className="lg:col-span-4 border-r border-slate-800 flex flex-col">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Direct Message Threads</span>
                <div className="flex gap-1 text-[11px]">
                  {['all', 'Threads', 'Instagram', 'WhatsApp'].map(chan => (
                    <button
                      key={chan}
                      onClick={() => setChannelFilter(chan)}
                      className={`px-2 py-0.5 rounded ${
                        channelFilter === chan ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {chan}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-800/60 overflow-y-auto flex-1">
                {filteredConversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      selectedChat === conv.id ? 'bg-slate-800/80 border-l-2 border-indigo-500' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${conv.avatarBg} text-white flex items-center justify-center text-xs font-bold`}>
                          {conv.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{conv.name}</p>
                          <p className="text-[11px] text-slate-400">{conv.handle} • {conv.channel}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">{conv.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 truncate">{conv.lastMessage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Detail & AI Triage Center */}
            <div className="lg:col-span-5 flex flex-col justify-between border-r border-slate-800 bg-slate-950/40">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${currentChat.avatarBg} text-white flex items-center justify-center text-[10px] font-bold`}>
                    {currentChat.name[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white">{currentChat.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2">via {currentChat.channel}</span>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                  {currentChat.status}
                </span>
              </div>

              {/* Message Feed */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                {currentChat.messages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'client' ? 'items-start' : 'items-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      m.sender === 'client' 
                        ? 'bg-slate-800 text-slate-100 rounded-bl-sm' 
                        : 'bg-indigo-600 text-white rounded-br-sm shadow-md'
                    }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex items-center gap-2">
                <input 
                  type="text"
                  placeholder="Reply to inquiry or dispatch quote link..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={() => showToast('Dispatched follow-up message!')}
                  className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* AI Extracted Scope & Quote Summary */}
            <div className="lg:col-span-3 p-4 bg-slate-900 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Extracted Requirements</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Target Date:</span>
                    <p className="text-white font-medium">{currentChat.date}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Detected Scope:</span>
                    <p className="text-white font-medium">{currentChat.scope}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Estimated Budget Range:</span>
                    <p className="text-emerald-400 font-mono font-bold">{currentChat.budget}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Card-on-file deposit required</span>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Clients cannot reserve dates without placing a 30% deposit, ending unpaid proposal ghosting.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`https://quote.bizops.link/PR-${currentChat.id}`);
                  showToast('Custom quote & deposit link copied to clipboard!');
                }}
                className="w-full py-2.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy 1-Click Quote Link</span>
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Dynamic CPQ Estimator */}
        {activeTab === 'cpq' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Configurator Controls */}
            <div className="lg:col-span-7 rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">Dynamic CPQ Estimator</h3>
                <p className="text-xs text-slate-400">Self-serve calculator where leads customize scope and see instant pricing without wasting hours drafting manual proposals.</p>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Select Production Tier</label>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  {[
                    { id: 'standard', title: 'Standard', price: '$450' },
                    { id: 'premium', title: 'Artisanal', price: '$750' },
                    { id: 'luxury', title: 'Masterpiece', price: '$1,200' }
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
                  {[25, 30, 50].map(pct => (
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
                      Client Proposal View
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
                  <p className="text-xs text-indigo-300 font-medium">Due Now to Lock Calendar Date:</p>
                  <div className="text-2xl font-bold font-mono text-white">${calculateDeposit()}</div>
                  <p className="text-[11px] text-slate-400">Remaining balance auto-scheduled for project completion.</p>
                </div>
              </div>

              <button
                onClick={() => showToast('Simulated: $279.00 deposit charged via Stripe! Calendar date locked.')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Authorize Card & Lock Reservation</span>
              </button>
            </div>

          </div>
        )}

        {/* Tab 3: Deposit & Calendar Escrow */}
        {activeTab === 'escrow' && (
          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Calendar Reservations & Escrow Ledger</h3>
                <p className="text-xs text-slate-400">Dates are guaranteed only after non-refundable card authorization.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400">0% Ghosting This Month</span>
            </div>

            <div className="divide-y divide-slate-800/60 text-xs">
              {[
                { client: 'Sophie Laurent (@sophie.luxe)', date: 'Oct 14, 2026', deposit: '$279.00', total: '$930.00', status: 'Date Reserved' },
                { client: 'Apex Creative Studio', date: 'Oct 28, 2026', deposit: '$750.00', total: '$2,500.00', status: 'Date Reserved' },
                { client: 'Elena Rostova', date: 'Dec 18, 2026', deposit: '$180.00', total: '$600.00', status: 'Date Reserved' }
              ].map((row, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{row.client}</p>
                    <p className="text-slate-400">Reserved Date: {row.date}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="font-mono text-emerald-400 font-bold">{row.deposit} Secured</p>
                    <p className="text-slate-500 font-mono">Total {row.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-indigo-500/40 text-indigo-300 shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

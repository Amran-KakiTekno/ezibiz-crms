import React, { useState } from 'react';
import { Send, Sparkles, ArrowLeft, User } from 'lucide-react';
import StageStepper from './StageStepper';
import ClientDrawer from './ClientDrawer';
import { formatCurrency } from '../data/crmsData';

export default function InboxView({
  conversations,
  selectedChatId,
  onSelectChat,
  onSendMessage,
  onStageChange,
  onOpenProposal,
  onAddNote,
  showToast
}) {
  const [channelFilter, setChannelFilter] = useState('all');
  const [chatInputText, setChatInputText] = useState('');
  const [mobileSection, setMobileSection] = useState('list'); // 'list' | 'chat' | 'drawer'

  const currentChat = conversations.find(c => c.id === selectedChatId) || conversations[0] || null;

  const filteredConversations = channelFilter === 'all'
    ? conversations
    : conversations.filter(c => c.channel.toLowerCase() === channelFilter.toLowerCase());

  const handleSend = (text = chatInputText) => {
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setChatInputText('');
  };

  if (!currentChat) {
    return (
      <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        No leads or conversations found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[660px]">
      
      {/* Left Column: Inquiry Threads List (3 cols) */}
      <div className={`lg:col-span-3 border-r border-slate-200 dark:border-slate-800 flex flex-col ${
        mobileSection === 'list' ? 'flex' : 'hidden lg:flex'
      }`}>
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50 dark:bg-slate-950/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Inquiries</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {filteredConversations.length} leads
            </span>
          </div>

          {/* Channel Filter Chips */}
          <div className="flex gap-1 overflow-x-auto text-[10px] no-scrollbar">
            {['all', 'Threads', 'Instagram', 'WhatsApp', 'Web'].map(chan => (
              <button
                key={chan}
                onClick={() => setChannelFilter(chan)}
                className={`px-2.5 py-1 rounded-full text-[11px] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  channelFilter === chan 
                    ? 'bg-indigo-600 text-white font-medium shadow-sm' 
                    : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {chan}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Thread List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 overflow-y-auto flex-1 max-h-[600px]">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center space-y-3 my-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 mx-auto flex items-center justify-center text-sm font-bold">
                💬
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">No inquiries via {channelFilter}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  There are currently no active incoming leads on this channel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChannelFilter('all')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center mx-auto"
              >
                Show All Channels
              </button>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <div
                key={conv.id}
                role="button"
                tabIndex={0}
                aria-pressed={selectedChatId === conv.id}
                onClick={() => {
                  onSelectChat(conv.id);
                  setMobileSection('chat');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectChat(conv.id);
                    setMobileSection('chat');
                  }
                }}
                className={`p-3.5 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  selectedChatId === conv.id 
                    ? 'bg-indigo-50/70 dark:bg-slate-800/90 border-l-2 border-indigo-500 shadow-sm' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full ${conv.avatarBg} text-white flex items-center justify-center text-xs font-bold shadow-sm`}>
                      {conv.name[0]}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-black" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[110px]">{conv.name}</p>
                      {conv.vip && (
                        <span className="text-[9px] px-1 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-semibold flex-shrink-0">
                          VIP
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{conv.handle} • {conv.channel}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono whitespace-nowrap">{conv.time}</span>
              </div>
              
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-1">{conv.lastMessage}</p>

              <div className="mt-2.5 flex items-center justify-between">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium border ${
                  conv.stage === 'deposit_secured' 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20' 
                    : conv.stage === 'proposal_sent'
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20'
                    : conv.stage === 'production'
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}>
                  {conv.status}
                </span>
                <span className="text-[11px] font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">
                  {formatCurrency(conv.totalScope)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

      {/* Middle Column: Active Chat Feed & Stage Progression (5 cols) */}
      <div className={`lg:col-span-5 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 ${
        mobileSection === 'chat' ? 'flex' : 'hidden lg:flex'
      }`}>
        
        {/* Chat Contact Bar */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileSection('list')}
              className="lg:hidden p-2 -ml-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Back to inquiries"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="relative flex-shrink-0">
              <div className={`w-8 h-8 rounded-full ${currentChat.avatarBg} text-white flex items-center justify-center text-xs font-bold`}>
                {currentChat.name[0]}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-black" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentChat.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                  via {currentChat.channel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">{currentChat.handle} • {currentChat.phone}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileSection('drawer')}
            className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0 min-h-[44px]"
          >
            <User className="w-3.5 h-3.5" />
            <span>Lead 360</span>
          </button>
        </div>

        {/* Visual Horizontal Stage Progression Stepper */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <StageStepper 
            currentStage={currentChat.stage}
            onStageChange={(newStage) => onStageChange(currentChat.id, newStage)}
          />
        </div>

        {/* Message Feed */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 max-h-[380px]">
          <div className="text-center my-1">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              Inquiry ingested via {currentChat.channel} webhook • AI Triaged
            </span>
          </div>

          {currentChat.messages?.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'client' ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                m.sender === 'client' 
                  ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-bl-sm border border-slate-200 dark:border-slate-700 shadow-sm' 
                  : 'bg-indigo-600 text-white rounded-2xl rounded-br-sm shadow-md shadow-indigo-600/20'
              }`}>
                {m.text}
              </div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* AI Quick Reply Macro Chips */}
        <div className="px-3 pt-2 pb-1.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mb-1.5 flex items-center gap-1 font-mono uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <span>AI Quick Reply Macros:</span>
          </p>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => handleSend(`Hi ${currentChat.name}! We have locked your specifications. Here is your custom interactive quote to secure your reservation date with a 30% deposit: https://quote.ezibiz.link/PR-${currentChat.id}`)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all shadow-sm min-h-[44px] flex items-center cursor-pointer"
            >
              ⚡ Dispatch Dynamic Quote Link
            </button>
            <button 
              onClick={() => handleSend(`Great news! Our production calendar for ${currentChat.date} is currently open. We require a 30% reservation deposit to guarantee team capacity.`)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all shadow-sm min-h-[44px] flex items-center cursor-pointer"
            >
              📅 Confirm Availability
            </button>
            <button 
              onClick={() => handleSend(`Friendly reminder: Your interactive proposal #PR-${currentChat.id} hold expires in 24 hours. Reserve your date now: https://quote.ezibiz.link/PR-${currentChat.id}`)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all shadow-sm min-h-[44px] flex items-center cursor-pointer"
            >
              ⏳ Expiration Nudge
            </button>
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input 
            type="text"
            value={chatInputText}
            onChange={(e) => setChatInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type reply or pick an AI macro chip above..."
            className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 sm:py-2 text-base sm:text-xs min-h-[44px] sm:min-h-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
          />
          <button 
            onClick={() => handleSend()}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors flex-shrink-0 shadow-md shadow-indigo-600/20 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Column: Client 360 Profile & AI Drawer (4 cols) */}
      <div className={`lg:col-span-4 bg-slate-50/50 dark:bg-slate-950/60 ${
        mobileSection === 'drawer' ? 'block' : 'hidden lg:block'
      }`}>
        <div className="lg:hidden p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileSection('chat')}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Chat</span>
          </button>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">Lead 360 View</span>
        </div>
        <ClientDrawer
          currentChat={currentChat}
          onOpenProposal={onOpenProposal}
          onAddNote={onAddNote}
          showToast={showToast}
        />
      </div>

    </div>
  );
}

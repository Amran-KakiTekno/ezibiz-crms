// EziBiz CRMS Data & Configuration

export const formatCurrency = (amount) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `RM ${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatCurrencyCompact = (amount) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `RM ${num.toLocaleString('en-US')}`;
};

export const PIPELINE_STAGES = [
  { id: 'inquiry', label: 'New Inquiry', shortLabel: 'Inquiry', color: 'border-slate-700 bg-slate-900/50' },
  { id: 'qualified', label: 'AI Qualified', shortLabel: 'Qualified', color: 'border-cyan-500/30 bg-cyan-950/20' },
  { id: 'proposal_sent', label: 'Proposal Sent', shortLabel: 'Proposal', color: 'border-amber-500/30 bg-amber-950/20' },
  { id: 'deposit_secured', label: 'Deposit Secured', shortLabel: 'Secured', color: 'border-emerald-500/30 bg-emerald-950/20' },
  { id: 'production', label: 'In Production', shortLabel: 'Production', color: 'border-indigo-500/30 bg-indigo-950/20' }
];

export const CPQ_TIERS = [
  { id: 'standard', title: 'Standard Tier', price: 450, desc: 'Essential package with baseline specifications' },
  { id: 'premium', title: 'Artisanal Studio', price: 750, desc: 'Most popular studio-grade production' },
  { id: 'luxury', title: 'Masterpiece Bespoke', price: 1200, desc: 'High-touch customized executive execution' }
];

export const CPQ_ADDONS = [
  { key: 'florals', label: 'Fresh Botanical Floral Accents', cost: 150 },
  { key: 'glutenFree', label: 'Organic Gluten-Free / Vegan Blend', cost: 85 },
  { key: 'rushSetup', label: 'Priority 48-Hour Rush Production', cost: 180 },
  { key: 'monogram', label: 'Handcrafted Monogram Fondant', cost: 60 }
];

export const calculateScopeTotal = (tier = 'premium', activeAddOns = {}) => {
  let base = tier === 'standard' ? 450 : tier === 'premium' ? 750 : 1200;
  if (activeAddOns.florals) base += 150;
  if (activeAddOns.glutenFree) base += 85;
  if (activeAddOns.rushSetup) base += 180;
  if (activeAddOns.monogram) base += 60;
  return base;
};

export const calculateDepositAmount = (total, pct = 30) => {
  return Math.round(total * (pct / 100));
};

export const INITIAL_CONVERSATIONS = [
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
    stage: 'deposit_secured',
    status: 'Deposit Secured',
    budget: 'RM 850 - RM 1,100',
    totalScope: 930,
    depositSecured: 279,
    date: 'Oct 14, 2026',
    scope: '3-Tier Floral Design, 85 Guests',
    vip: true,
    ltv: 'RM 3,400',
    pastProjects: 2,
    notes: [
      { id: 1, author: 'EziBiz AI', text: 'Auto-qualified lead: budget verified, Oct 14 availability validated with zero schedule overlap.', time: '15m ago' },
      { id: 2, author: 'Operations Team', text: 'Client requested organic lavender cream for middle tier. Approved with chef.', time: '8m ago' }
    ],
    timeline: [
      { id: 1, action: 'Threads DM ingested into Intake CRM', time: '10:24 AM' },
      { id: 2, action: 'AI triage qualified scope: RM 850 - RM 1,100 estimate', time: '10:25 AM' },
      { id: 3, action: 'Dispatched Interactive Proposal #PR-402', time: '10:26 AM' },
      { id: 4, action: 'Client opened interactive proposal on mobile', time: '10:28 AM' },
      { id: 5, action: 'Card deposit authorized: RM 279.00 locked in escrow', time: '10:29 AM' }
    ],
    messages: [
      { sender: 'client', text: 'Hey! Love your work on Threads! How much would it be for a custom 3-tier floral cake for Oct 14? Around 85 guests in Brooklyn.', time: '10:24 AM' },
      { sender: 'bot', text: 'Hi Sophie! We would love to help! For 85 guests with botanical florals, our pricing ranges from RM 750 to RM 950 depending on tier finishes. Here is your custom interactive proposal to customize flavors and lock your date with a reservation deposit: https://quote.ezibiz.link/PR-402', time: '10:25 AM' },
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
    status: 'Proposal Sent',
    budget: 'RM 1,800',
    totalScope: 1800,
    depositSecured: 0,
    date: 'Nov 02, 2026',
    scope: 'Branding Suite & Social Assets',
    vip: false,
    ltv: 'RM 0 (New)',
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
      { sender: 'bot', text: 'Hi Marcus! Thanks for reaching out. Based on your scope, our brand suites range from RM 1,200 - RM 2,500. Configure your package and lock your project start date here: https://quote.ezibiz.link/PR-403', time: '09:41 AM' },
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
    status: 'AI Qualified',
    budget: 'RM 600',
    totalScope: 600,
    depositSecured: 0,
    date: 'Dec 18, 2026',
    scope: 'Holiday Private Dinner Catering (12 pax)',
    vip: false,
    ltv: 'RM 1,200',
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
      { sender: 'bot', text: 'Hello Elena! Yes, Dec 18 is currently open. Private dinners start at RM 50/head. Generated instant estimate: https://quote.ezibiz.link/PR-404', time: '08:31 AM' },
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
    status: 'In Production',
    budget: 'RM 2,500',
    totalScope: 2500,
    depositSecured: 750,
    date: 'Oct 28, 2026',
    scope: 'Commercial Video & Set Catering',
    vip: true,
    ltv: 'RM 8,900',
    pastProjects: 4,
    notes: [
      { id: 1, author: 'EziBiz AI', text: 'Deposit verified. Shift automatically created in ezibiz-hrms.', time: '2h ago' }
    ],
    timeline: [
      { id: 1, action: 'Interactive intake form submitted', time: '07:15 AM' },
      { id: 2, action: 'Payment of RM 750 deposit settled', time: '07:22 AM' },
      { id: 3, action: 'Production shift auto-scheduled for Oct 28', time: '07:23 AM' }
    ],
    messages: [
      { sender: 'client', text: 'Hi team, submitted our commercial catering specs for Oct 28.', time: '07:15 AM' },
      { sender: 'bot', text: 'Thanks Apex! Proposal generated: https://quote.ezibiz.link/PR-401', time: '07:16 AM' },
      { sender: 'client', text: 'Deposit authorized. Awaiting shift calendar confirmation.', time: '07:24 AM' }
    ]
  }
];

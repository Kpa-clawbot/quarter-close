/* ============================================
   Quarter Close — Game Engine (Phase 1)
   ============================================ */

// ===== BUSINESS ARC DEFINITIONS =====
const ARCS = {
  tech: {
    name: 'Tech Startup',
    icon: '💻',
    desc: 'From blog to software empire',
    sources: [
      { name: 'Blog with Ads',       flavor: 'Monetize your hot takes' },
      { name: 'Freelance Web Dev',    flavor: 'Fiverr but classier' },
      { name: 'WordPress Agency',     flavor: 'Starter sites for everyone' },
      { name: 'SaaS MVP',            flavor: 'Monthly recurring revenue!' },
      { name: 'Mobile App',          flavor: 'There\'s an app for that' },
      { name: 'Series A Startup',    flavor: 'Burn rate is just a number' },
      { name: 'Dev Shop',            flavor: '50 engineers and a dream' },
      { name: 'Software Company',    flavor: 'Enterprise contracts 💰' },
      { name: 'Tech Giant',          flavor: 'Congressional hearings are just PR' },
      { name: 'Big Tech',            flavor: 'FAANG who?' },
      { name: 'Monopoly',            flavor: 'Antitrust is a suggestion' },
      { name: 'Trillion Dollar Club', flavor: 'The GDP of a small country' },
    ]
  },
  food: {
    name: 'Food Empire',
    icon: '🍋',
    desc: 'From lemonade stand to food & beverage corp',
    sources: [
      { name: 'Lemonade Stand',       flavor: 'When life gives you lemons...' },
      { name: 'Food Cart',            flavor: 'Street food hustle' },
      { name: 'Food Truck',           flavor: 'Mobile and trendy' },
      { name: 'Small Restaurant',     flavor: 'Finally, a real kitchen' },
      { name: 'Catering Company',     flavor: 'Weddings pay well' },
      { name: 'Restaurant Chain',     flavor: 'Location, location, location' },
      { name: 'Franchise Operation',  flavor: 'Other people run your stores' },
      { name: 'Food & Beverage Corp', flavor: 'Fortune 500 here we come' },
      { name: 'CPG Conglomerate',     flavor: 'You own the grocery shelf' },
      { name: 'Global Supply Chain',  flavor: 'Farm to table to world' },
      { name: 'Food Monopoly',        flavor: 'Nestlé sends a fruit basket' },
      { name: 'You Feed The World',   flavor: 'Governments depend on you' },
    ]
  },
  ecommerce: {
    name: 'E-Commerce Hustler',
    icon: '📦',
    desc: 'From garage sales to retail empire',
    sources: [
      { name: 'Garage Sale',          flavor: 'One man\'s trash...' },
      { name: 'eBay Reselling',       flavor: 'Buy low, sell high' },
      { name: 'Dropshipping Store',   flavor: 'Never touch inventory' },
      { name: 'Drop Shipping',          flavor: 'Let the warehouse handle logistics' },
      { name: 'Warehouse & Distro',   flavor: 'Cutting out the middleman' },
      { name: 'Private Label Brand',  flavor: 'Your name on the box' },
      { name: 'Retail Chain',         flavor: 'Brick and mortar comeback' },
      { name: 'Consumer Empire',      flavor: 'Everything ships next day' },
      { name: 'Marketplace Platform', flavor: 'You ARE the marketplace' },
      { name: 'Logistics Network',    flavor: 'Your own planes and warehouses' },
      { name: 'Retail Monopoly',      flavor: 'Antitrust hearings scheduled' },
      { name: 'Everything Store',     flavor: 'You sell literally everything' },
    ]
  },
  generic: {
    name: 'Entrepreneur',
    icon: '📈',
    desc: 'From side hustle to conglomerate',
    sources: [
      { name: 'Tutoring Service',     flavor: 'Teach what you know' },
      { name: 'Online Course',        flavor: 'Passive income guru' },
      { name: 'Consulting Gig',       flavor: 'Charge by the hour' },
      { name: 'Small Agency',         flavor: 'Hire your first team' },
      { name: 'SaaS Product',         flavor: 'Productize the service' },
      { name: 'Venture-Backed Startup', flavor: 'Other people\'s money' },
      { name: 'Growth-Stage Company', flavor: 'Hockey stick chart' },
      { name: 'Tech Company',         flavor: 'IPO is calling' },
      { name: 'Holding Company',      flavor: 'Diversified portfolio' },
      { name: 'Private Equity',       flavor: 'Buy, optimize, flip' },
      { name: 'Conglomerate',         flavor: 'Berkshire vibes' },
      { name: 'Too Big To Fail',      flavor: 'The Fed has your back' },
    ]
  },
};

// ===== ECONOMY (real-world annual revenue per employee) =====
// baseRate = annual revenue in dollars for 1 employee
// Game ticks at 1/s, time scale converts annual → per-tick
const SOURCE_STATS = [
  { baseRate: 3000,        unlockCost: 0,       clickValue: 1,   autoCostMult: 10 },  // ~$3K/yr lemonade stand
  { baseRate: 30000,       unlockCost: 500,     clickValue: 5,   autoCostMult: 10 },  // ~$30K/yr food cart
  { baseRate: 200000,      unlockCost: 5000,    clickValue: 20,  autoCostMult: 10 },  // ~$200K/yr food truck
  { baseRate: 500000,      unlockCost: 25000,   clickValue: 50,  autoCostMult: 10 },  // ~$500K/yr restaurant
  { baseRate: 1000000,     unlockCost: 100000,  clickValue: 100, autoCostMult: 10 },  // ~$1M/yr catering
  { baseRate: 5000000,     unlockCost: 500000,  clickValue: 250, autoCostMult: 10 },  // ~$5M/yr chain
  { baseRate: 20000000,    unlockCost: 2000000, clickValue: 500, autoCostMult: 10 },  // ~$20M/yr franchise
  { baseRate: 100000000,   unlockCost: 10000000,clickValue: 1000,autoCostMult: 10 },  // ~$100M/yr corp
  { baseRate: 400000000,   unlockCost: 50000000, clickValue: 2500, autoCostMult: 10 }, // ~$400M/yr tech giant
  { baseRate: 1500000000,  unlockCost: 250000000, clickValue: 5000, autoCostMult: 10 }, // ~$1.5B/yr big tech
  { baseRate: 5000000000,  unlockCost: 1000000000, clickValue: 10000, autoCostMult: 10 }, // ~$5B/yr monopoly
  { baseRate: 15000000000, unlockCost: 5000000000, clickValue: 25000, autoCostMult: 10 }, // ~$15B/yr trillion club
];

// ===== TIME SCALE =====
// Fixed: 1 tick = 1 game-day, always
const SECS_PER_DAY = 86400;
const SECS_PER_YEAR = 365.25 * SECS_PER_DAY;
const TIME_LABEL = '▶ 1 day/tick';

// ===== MINI-TASK DEFINITIONS =====
// tier: 'low' (clerical), 'mid' (management), 'high' (executive)
// rewardMult: multiplier × daily revenue
// minTier: minimum unlocked source tier to see this task
const MINI_TASKS = [
  // Low tier — clerical busywork
  { text: 'Approve Invoice #{{num}}?', rewardMult: [0.5, 1], tier: 'low', minTier: 0, type: 'approve' },
  { text: 'Confirm delivery #{{num}}', rewardMult: [0.3, 0.8], tier: 'low', minTier: 0, type: 'approve' },
  { text: 'Reply to vendor inquiry', rewardMult: [0.3, 0.6], tier: 'low', minTier: 0, type: 'approve' },
  { text: 'Approve time sheet for Week {{num}}', rewardMult: [0.2, 0.5], tier: 'low', minTier: 0, type: 'approve' },
  { text: 'Process refund #{{num}}', rewardMult: [0.4, 0.8], tier: 'low', minTier: 0, type: 'approve' },
  { text: 'Review expense report (${{num}})', rewardMult: [0.3, 0.7], tier: 'low', minTier: 0, type: 'approve' },

  // Mid tier — management decisions
  { text: 'Sign contract for Client #{{num}}', rewardMult: [2, 5], tier: 'mid', minTier: 2, type: 'approve' },
  { text: 'Authorize PO #{{num}}', rewardMult: [1.5, 3], tier: 'mid', minTier: 2, type: 'approve' },
  { text: 'Approve Q{{num}} marketing budget', rewardMult: [2, 4], tier: 'mid', minTier: 3, type: 'approve' },
  { text: 'Sign off on new hire #{{num}}', rewardMult: [1.5, 3], tier: 'mid', minTier: 3, type: 'approve' },
  { text: 'Negotiate vendor discount', rewardMult: [2, 5], tier: 'mid', minTier: 2, type: 'approve' },
  { text: 'Approve product launch timeline', rewardMult: [3, 6], tier: 'mid', minTier: 3, type: 'approve' },

  // High tier — executive/deal-level
  { text: 'Close Series {{num}} funding round', rewardMult: [8, 15], tier: 'high', minTier: 5, type: 'approve' },
  { text: 'Sign M&A term sheet — Acq #{{num}}', rewardMult: [10, 20], tier: 'high', minTier: 6, type: 'approve' },
  { text: 'Approve Board Resolution #{{num}}', rewardMult: [5, 10], tier: 'high', minTier: 5, type: 'approve' },
  { text: 'Finalize enterprise deal (${{num}}M)', rewardMult: [8, 15], tier: 'high', minTier: 5, type: 'approve' },
  { text: 'Sign IP licensing agreement #{{num}}', rewardMult: [6, 12], tier: 'high', minTier: 4, type: 'approve' },
  { text: 'Authorize stock buyback program', rewardMult: [10, 20], tier: 'high', minTier: 6, type: 'approve' },
];

function miniTaskReward(task) {
  const streakMult = gameState.miniTaskStreak >= 10 ? 3 :
                     gameState.miniTaskStreak >= 5 ? 2 :
                     gameState.miniTaskStreak >= 3 ? 1.5 : 1;
  // Use annual rev / 365.25 to get base daily rate, unaffected by penalties/outages
  const dailyRev = totalAnnualRev() / 365.25;
  const low = task.rewardMult[0];
  const high = task.rewardMult[1];
  const mult = low + Math.random() * (high - low);
  return Math.max(1, Math.floor(dailyRev * mult * streakMult));
}

// ===== EVENTS DEFINITIONS =====
// Global event frequency multiplier — scales all event weights together
// 1.0 = default, 2.0 = twice as frequent, 0.5 = half as frequent, 0 = off
let EVENT_FREQ_MULT = 1.0;

const EVENTS = [
  {
    weight: 3,
    sender: 'Mom',
    subject: 'Quick investment opportunity',
    body: 'Honey, I believe in your little business! Here\'s a little something to help out.',
    actions: [
      { label: 'Accept (+5% cash)', effect: (gs) => {
        const gift = Math.max(10, Math.floor(gs.cash * 0.05));
        gs.cash += gift;
        return `Mom invested ${formatMoney(gift)}! Thanks, Mom.`;
      }},
      { label: 'Decline (no effect)', effect: () => 'You declined. Mom is mildly hurt.' },
    ]
  },
  {
    weight: 4,
    sender: 'Angry Customer',
    subject: 'RE: TERRIBLE SERVICE!!!',
    body: 'I want a FULL REFUND or I\'m leaving a 1-star review everywhere!',
    actions: [
      { label: 'Refund (-2% cash)', effect: (gs) => {
        const refund = Math.max(5, Math.floor(gs.cash * 0.02));
        gs.cash -= refund;
        return `Refunded ${formatMoney(refund)}. Complaint resolved.`;
      }},
      { label: 'Ignore (rev -10% for 60s)', effect: (gs) => {
        gs.revPenalty = { mult: 0.9, until: Date.now() + 60000 };
        return 'Bad reviews incoming! Revenue -10% for 60s.';
      }},
    ]
  },
  {
    weight: 1,
    sender: 'College Buddy',
    subject: 'Business proposal over beers? 🍺',
    body: 'Dude, I\'ve got this idea that could be huge. Let me pitch you — worst case we grab drinks and catch up.',
    actions: [
      { label: '🍺 Take the meeting (5% cash)', effect: (gs) => {
        const cost = Math.max(50, Math.floor(gs.cash * 0.05));
        gs.cash -= cost;
        // 40% chance it's actually good
        if (Math.random() < 0.4) {
          const rev = totalRevPerTick();
          const bonus = rev * (60 + Math.floor(Math.random() * 120)); // 1-3 min of revenue
          gs.cash += bonus;
          gs.totalEarned += bonus;
          gs.quarterRevenue += bonus;
          if (gs.isPublic) gs.earningsQuarterRevenue += bonus;
          return `Spent ${formatMoney(cost)} on dinner... but the idea was legit! Closed a ${formatMoney(bonus)} side deal.`;
        } else {
          return `Spent ${formatMoney(cost)} on drinks. The pitch was an MLM. Classic.`;
        }
      }},
      { label: '📱 "Super busy rn"', effect: () => 'Left on read. He\'ll try again in 6 months.' },
    ]
  },
  {
    weight: 2,
    sender: 'IT Department',
    subject: '⚠️ POWER OUTAGE - Building 3',
    body: 'Emergency maintenance required. All systems will be offline for approximately 15 seconds. This cannot be prevented.',
    timed: true,
    timedDelay: 5000,  // 5 second countdown
    timedEffect: (gs) => {
      gs.powerOutage = { until: Date.now() + 15000 };
      return '⚡ Power outage! Revenue paused for 15 seconds.';
    },
    actions: []
  },
  {
    weight: 1,
    sender: 'IT Security',
    subject: '🔒 RANSOMWARE DETECTED - All Systems',
    body: 'Ransomware detected on the network. All file shares encrypted. Pay the ransom or wait for IT to rebuild from backups.',
    actions: [
      { label: '💰 Pay ransom (15% cash)', effect: (gs) => {
        const cost = Math.max(100, Math.floor(gs.cash * 0.15));
        gs.cash -= cost;
        return `Paid ${formatMoney(cost)} ransom. Systems restored. IT is "looking into it."`;
      }},
      { label: '🛡️ Refuse — rebuild from backups', effect: (gs) => {
        const duration = 30000 + Math.floor(Math.random() * 30000); // 30-60s
        gs.powerOutage = { until: Date.now() + duration };
        return `Revenue frozen for ${Math.round(duration/1000)}s while IT rebuilds. Should\'ve had better backups.`;
      }},
    ]
  },
  {
    weight: 1,
    sender: 'Network Operations',
    subject: '🌐 DDoS ATTACK IN PROGRESS',
    body: 'Massive distributed denial-of-service attack hitting all public-facing services. Mitigation in progress but performance is degraded.',
    actions: [
      { label: 'Nothing we can do', effect: (gs) => {
        const duration = 20000 + Math.floor(Math.random() * 10000); // 20-30s
        gs.revPenalty = { mult: 0.5, until: Date.now() + duration };
        return `⚠️ DDoS — revenue at 50% for ${Math.round(duration/1000)}s while CloudFlare mitigates.`;
      }},
    ]
  },
  {
    weight: 1,
    sender: 'DBA Team',
    subject: '💾 CRITICAL: Database corruption detected',
    body: 'Primary database showing consistency errors. We can do an emergency restore ($$$) or let auto-recovery run (slower).',
    actions: [
      { label: '💰 Emergency restore (3% cash)', effect: (gs) => {
        const cost = Math.max(50, Math.floor(gs.cash * 0.03));
        gs.cash -= cost;
        return `Paid ${formatMoney(cost)} for emergency DB restore. Crisis averted.`;
      }},
      { label: '⏳ Wait for auto-recovery', effect: (gs) => {
        const duration = 15000 + Math.floor(Math.random() * 5000); // 15-20s
        const unlocked = gs.sources.map((s, i) => ({ s, i })).filter(x => x.s.unlocked && x.s.employees > 0);
        if (unlocked.length > 0) {
          const pick = unlocked[Math.floor(Math.random() * unlocked.length)];
          gs.dbOutage = { sourceIndex: pick.i, until: Date.now() + duration };
          const arc = ARCS[gs.arc];
          const name = arc.sources[pick.i].name || getSourceDef(pick.i).name;
          return `${name} offline for ${Math.round(duration/1000)}s while database recovers.`;
        }
        console.log('DB outage: no unlocked sources');
        return 'Auto-recovery running... minimal impact.';
      }},
    ]
  },
  {
    weight: 3,
    sender: 'IT Department',
    subject: '📧 Email server is DOWN',
    body: 'Mail server is unreachable. No one can send or receive email until it\'s fixed. Approval workflows are frozen.',
    actions: [
      { label: 'Wait it out', effect: (gs) => {
        const duration = 45000 + Math.floor(Math.random() * 15000); // 45-60s
        gs.miniTaskBlocked = { until: Date.now() + duration };
        return `📧 Email down — no approvals for ${Math.round(duration/1000)}s. Your streak is in danger.`;
      }},
    ]
  },
  {
    weight: 4,
    sender: 'IT Security',
    subject: '🔑 MANDATORY PASSWORD RESET',
    body: 'Security audit requires all employees to reset passwords immediately. Productivity will be impacted.',
    timed: true,
    timedDelay: 3000,
    timedEffect: (gs) => {
      gs.powerOutage = { until: Date.now() + 10000 };
      return '🔑 Company-wide password reset. Revenue paused for 10 seconds.';
    },
    actions: []
  },
  {
    weight: 2,
    sender: 'Status Page',
    subject: '☁️ CLOUD PROVIDER OUTAGE',
    body: 'Major incident at your cloud provider. Multiple availability zones affected. ETA for resolution: "We\'re working on it." Helpful.',
    actions: [
      { label: 'Welcome to the cloud', effect: (gs) => {
        const duration = 15000 + Math.floor(Math.random() * 10000); // 15-25s
        gs.revPenalty = { mult: 0.25, until: Date.now() + duration };
        return `☁️ Cloud outage — revenue at 25% for ${Math.round(duration/1000)}s. Nothing you can do.`;
      }},
    ]
  },
  {
    weight: 3,
    sender: 'Engineering Lead',
    subject: '🐛 P0 BUG: Production is on fire',
    body: 'Critical bug in prod. Customers are seeing errors. We can hotfix now (costs money for the war room) or punt to next sprint and eat the churn.',
    actions: [
      { label: '🚨 Hotfix now (5% cash)', effect: (gs) => {
        const cost = Math.max(100, Math.floor(gs.cash * 0.05));
        gs.cash -= cost;
        return `Spent ${formatMoney(cost)} on an emergency war room. Bug squashed. Engineers need therapy.`;
      }},
      { label: '📋 Next sprint', effect: (gs) => {
        // Random department loses 50% revenue for 60s
        const unlocked = gs.sources.map((s, i) => ({ s, i })).filter(x => x.s.unlocked && x.s.employees > 0);
        if (unlocked.length > 0) {
          const pick = unlocked[Math.floor(Math.random() * unlocked.length)];
          const duration = 60000;
          gs.revPenalty = { mult: 0.5, until: Date.now() + duration };
          const arc = ARCS[gs.arc];
          const name = arc.sources[pick.i].name || getSourceDef(pick.i).name;
          return `Customers churning — revenue at 50% for 60s. "${name}" taking the biggest hit.`;
        }
        return 'Customers aren\'t happy but they\'ll survive... probably.';
      }},
    ]
  },
  {
    weight: 2,
    sender: 'IT Asset Management',
    subject: '💻 LAPTOP RECALL - Security Vulnerability',
    body: 'Critical firmware vulnerability discovered. All company laptops must be collected for patching. Employees will work from their phones (poorly).',
    actions: [
      { label: 'Comply with recall', effect: (gs) => {
        const duration = 20000;
        gs.revPenalty = { mult: 0.7, until: Date.now() + duration };
        return '💻 Laptop recall — revenue at 70% for 20s while everyone works from phones.';
      }},
    ]
  },
  {
    weight: 2,
    sender: 'Google Alerts',
    subject: '📈 Your company is trending on TikTok!',
    body: 'A customer posted a viral video about your product. 2.3M views and counting! Revenue is spiking.',
    actions: [
      { label: 'Ride the wave! (3× rev, 30s)', effect: (gs) => {
        gs.revBonus = { mult: 3, until: Date.now() + 30000 };
        return '🔥 TikTok viral! Revenue ×3 for 30 seconds!';
      }},
    ]
  },
  {
    weight: 2,
    sender: 'PR Team',
    subject: 'Forbes wants to feature us! 🎉',
    body: 'Forbes is running a "30 Under 30" style piece and wants to include us. This will be huge for brand awareness.',
    actions: [
      { label: 'Do the interview (2× rev, 60s)', effect: (gs) => {
        gs.revBonus = { mult: 2, until: Date.now() + 60000 };
        return '📰 Forbes feature live! Revenue ×2 for 60 seconds!';
      }},
      { label: 'Too busy', effect: () => 'You passed on free press. Bold move.' },
    ]
  },
  {
    weight: 2,
    sender: 'Social Media',
    subject: '🚀 We hit the front page of Reddit!',
    body: 'Someone posted about us on r/technology and it exploded. Server traffic is through the roof!',
    actions: [
      { label: 'Scale the servers! (5× rev, 15s)', effect: (gs) => {
        gs.revBonus = { mult: 5, until: Date.now() + 15000 };
        return '🚀 Reddit front page! Revenue ×5 for 15 seconds!';
      }},
    ]
  },
  {
    weight: 2,
    sender: 'Marketing',
    subject: '📺 Local news wants to do a segment on us',
    body: 'Channel 7 heard about us and wants to do a feel-good local business story. Free advertising!',
    actions: [
      { label: 'Schedule the shoot (2× rev, 45s)', effect: (gs) => {
        gs.revBonus = { mult: 2, until: Date.now() + 45000 };
        return '📺 Local news feature! Revenue ×2 for 45 seconds!';
      }},
      { label: 'Camera shy', effect: () => 'Missed opportunity for free press.' },
    ]
  },
  {
    weight: 3,
    sender: 'Sales Team',
    subject: '🎉 Big client just signed!',
    body: null, // dynamic — set at trigger time
    dynamic: true,
    setup: (gs) => {
      const unlocked = gs.sources.map((s, i) => ({ s, i })).filter(x => x.s.unlocked && x.s.employees > 0);
      if (unlocked.length === 0) return null;
      const pick = unlocked[Math.floor(Math.random() * unlocked.length)];
      const src = getSourceDef(pick.i);
      const arc = ARCS[gs.arc];
      const name = arc.sources[pick.i].name || src.name;
      const mult = 5 + Math.floor(Math.random() * 6); // 5-10×
      const bonus = Math.floor(sourceRevPerTick(pick.s) * mult);
      if (bonus <= 0) return null;
      return {
        body: `The ${name} department just landed a whale client! One-time bonus of ${formatMoney(bonus)} (${mult}× daily revenue).`,
        actions: [
          { label: `Cash the check (+${formatMoney(bonus)})`, effect: (gs2) => {
            gs2.cash += bonus;
            gs2.totalEarned += bonus;
            gs2.quarterRevenue += bonus;
            trackEarningsRevenue(bonus);
            return `💰 ${name} scored! +${formatMoney(bonus)} from the big client.`;
          }},
        ]
      };
    },
  },
  // R&D Breakthrough — permanent 2× revenue for a random source
  {
    weight: 2,
    debugLabel: 'R&D Breakthrough',
    generate: () => {
      const arc = ARCS[gameState.arc];
      const unlocked = gameState.sources.map((s, i) => ({ s, i })).filter(x => x.s.unlocked && x.s.employees > 0);
      if (unlocked.length === 0) return null;
      const pick = unlocked[Math.floor(Math.random() * unlocked.length)];
      const name = arc.sources[pick.i].name;
      const currentMult = pick.s.breakthroughMult || 1;
      return {
        sender: 'R&D Department',
        subject: '🔬 Breakthrough Innovation!',
        body: `Your ${name} team has made a major breakthrough! They've developed a revolutionary new process that will permanently double their revenue output.\n\nCurrent multiplier: ×${currentMult}\nNew multiplier: ×${currentMult * 2}`,
        actions: [
          { label: `Implement (+×2 ${name})`, effect: (gs) => {
            gs.sources[pick.i].breakthroughMult = (gs.sources[pick.i].breakthroughMult || 1) * 2;
            return `🔬 Breakthrough! ${name} revenue permanently doubled (now ×${gs.sources[pick.i].breakthroughMult})`;
          }},
          { label: 'File patent (5% cash)', effect: (gs) => {
            const patent = Math.max(10, Math.floor(gs.cash * 0.05));
            gs.cash += patent;
            return `Filed patent for ${formatMoney(patent)} instead. Your lawyers are happy.`;
          }},
        ]
      };
    },
  },
];

// ===== BOARD ROOM UPGRADES (Phase 2.2) =====
const BOARD_ROOM_UPGRADES = [
  {
    id: 'finance_dept_1',
    name: 'CFO Lv1',
    desc: 'The Intern — auto-earnings, randomizes guidance (often wrong).',
    cost: 500,
    requires: null,
    maxCount: 1,
    category: 'Finance',
  },
  {
    id: 'finance_dept_2',
    name: 'CFO Lv2',
    desc: 'Competent CFO — analyzes trends, picks right ~70% of the time.',
    cost: 2500,
    requires: 'finance_dept_1',
    maxCount: 1,
    category: 'Finance',
  },
  {
    id: 'finance_dept_3',
    name: 'CFO Lv3',
    desc: 'Elite CFO — factors in streaks, bonuses, analyst pressure. ~90% optimal.',
    cost: 10000,
    requires: 'finance_dept_2',
    maxCount: 1,
    category: 'Finance',
  },
  {
    id: 'tech_dept_1',
    name: 'CTO Lv1',
    desc: 'The Intern — auto-upgrades departments, cheapest first.',
    cost: 2500,
    requires: null,
    maxCount: 1,
    category: 'Technology',
  },
  {
    id: 'tech_dept_2',
    name: 'CTO Lv2',
    desc: 'Competent CTO — prioritizes upgrades by ROI.',
    cost: 10000,
    requires: 'tech_dept_1',
    maxCount: 1,
    category: 'Technology',
  },
  {
    id: 'tech_dept_3',
    name: 'CTO Lv3',
    desc: 'Elite CTO — ROI-optimized with earnings timing awareness.',
    cost: 50000,
    requires: 'tech_dept_2',
    maxCount: 1,
    category: 'Technology',
  },
  {
    id: 'ops_dept_1',
    name: 'COO Lv1',
    desc: 'The Recruiter — auto-hires cheapest employee first.',
    cost: 2500,
    requires: null,
    maxCount: 1,
    category: 'Operations',
  },
  {
    id: 'ops_dept_2',
    name: 'COO Lv2',
    desc: 'VP of Operations — hires where marginal revenue per employee is highest.',
    cost: 10000,
    requires: 'ops_dept_1',
    maxCount: 1,
    category: 'Operations',
  },
  {
    id: 'ops_dept_3',
    name: 'COO Lv3',
    desc: 'Elite COO — revenue-optimized hiring with earnings timing awareness.',
    cost: 50000,
    requires: 'ops_dept_2',
    maxCount: 1,
    category: 'Operations',
  },
  {
    id: 'rev_mult_1',
    name: 'Revenue Multiplier I',
    desc: 'Permanent 1.1× revenue multiplier.',
    cost: 1000,
    requires: null,
    maxCount: 1,
    category: 'Revenue',
  },
  {
    id: 'rev_mult_2',
    name: 'Revenue Multiplier II',
    desc: 'Permanent 1.25× revenue multiplier.',
    cost: 5000,
    requires: 'rev_mult_1',
    maxCount: 1,
    category: 'Revenue',
  },
  {
    id: 'rev_mult_3',
    name: 'Revenue Multiplier III',
    desc: 'Permanent 1.5× revenue multiplier.',
    cost: 25000,
    requires: 'rev_mult_2',
    maxCount: 1,
    category: 'Revenue',
  },
  {
    id: 'lobbyist',
    name: 'Lobbyist',
    desc: 'Tax rate reduced from 25% to 20%.',
    cost: 1500,
    requires: null,
    maxCount: 1,
    category: 'Tax',
  },
  {
    id: 'tax_haven',
    name: 'Tax Haven',
    desc: 'Tax rate reduced to 15%.',
    cost: 8000,
    requires: 'lobbyist',
    maxCount: 1,
    category: 'Tax',
  },
  {
    id: 'analyst_relations',
    name: 'Analyst Relations',
    desc: 'Analyst expectation ratchet slowed by 50%.',
    cost: 2000,
    requires: null,
    maxCount: 1,
    category: 'Investor',
  },
  {
    id: 'cpa',
    name: 'CPA on Retainer',
    desc: 'Auto-pays taxes when affordable, auto-settles debts. No more IRS toasts.',
    cost: 750,
    requires: null,
    maxCount: 1,
    category: 'Tax',
  },
  {
    id: 'golden_parachute',
    name: 'Golden Parachute',
    desc: 'Survive one asset seizure event (consumed on use).',
    cost: 3000,
    requires: null,
    maxCount: Infinity,
    category: 'Protection',
  },
  {
    id: 'growth_initiative',
    name: 'Growth Initiative',
    desc: '+2% revenue multiplier (stacks). Cost scales 10% each.',
    cost: 50,
    requires: null,
    maxCount: Infinity,
    category: 'Revenue',
    scalingCost: 1.10, // each purchase costs 10% more
  },
  {
    id: 'capex_planning',
    name: 'CapEx Planning',
    desc: 'CFO automatically manages CTO upgrade budget each quarter.',
    cost: 15000,
    requires: null,
    maxCount: 1,
    category: 'Finance',
    customRequires: () => getTechDeptLevel() >= 1 && getFinanceDeptLevel() >= 1,
  },
  // Market Expansion — company-wide revenue multiplier
  {
    id: 'market_domestic',
    name: 'Domestic Market',
    desc: '2× all revenue. Expand into the full domestic market.',
    cost: 3000,
    requires: null,
    maxCount: 1,
    category: 'Expansion',
  },
  {
    id: 'market_international',
    name: 'International',
    desc: '3× all revenue. Go global across developed markets.',
    cost: 8000,
    requires: 'market_domestic',
    maxCount: 1,
    category: 'Expansion',
  },
  {
    id: 'market_emerging',
    name: 'Emerging Markets',
    desc: '5× all revenue. Tap into rapidly growing economies.',
    cost: 15000,
    requires: 'market_international',
    maxCount: 1,
    category: 'Expansion',
  },
  {
    id: 'market_global',
    name: 'Global Domination',
    desc: '10× all revenue. You ARE the global economy.',
    cost: 25000,
    requires: 'market_emerging',
    maxCount: 1,
    category: 'Expansion',
  },
  // Talent Acquisition — reduce hire cost scaling exponent
  {
    id: 'talent_pipeline',
    name: 'Talent Pipeline',
    desc: 'Hiring cost scaling reduced (1.15× → 1.12× per employee).',
    cost: 5000,
    requires: null,
    maxCount: 1,
    category: 'Talent',
  },
  {
    id: 'employer_branding',
    name: 'Employer Branding',
    desc: 'Hiring cost scaling reduced (1.12× → 1.09× per employee).',
    cost: 12000,
    requires: 'talent_pipeline',
    maxCount: 1,
    category: 'Talent',
  },
  {
    id: 'talent_magnet',
    name: 'Talent Magnet',
    desc: 'Hiring cost scaling reduced (1.09× → 1.06× per employee).',
    cost: 25000,
    requires: 'employer_branding',
    maxCount: 1,
    category: 'Talent',
  },
];

function hasBoardRoomUpgrade(id) {
  return (gameState.boardRoomPurchases[id] || 0) > 0;
}

function getBoardRoomUpgradeCount(id) {
  return gameState.boardRoomPurchases[id] || 0;
}

function getUpgradeCost(upgrade) {
  if (upgrade.scalingCost) {
    const owned = getBoardRoomUpgradeCount(upgrade.id);
    return Math.floor(upgrade.cost * Math.pow(upgrade.scalingCost, owned));
  }
  return upgrade.cost;
}

function getBoardRoomRevMultiplier() {
  let mult = 1.0;
  if (hasBoardRoomUpgrade('rev_mult_1')) mult *= 1.1;
  if (hasBoardRoomUpgrade('rev_mult_2')) mult *= 1.25;
  if (hasBoardRoomUpgrade('rev_mult_3')) mult *= 1.5;
  // Growth Initiative: +2% per purchase, stacks multiplicatively
  const gi = getBoardRoomUpgradeCount('growth_initiative');
  if (gi > 0) mult *= Math.pow(1.02, gi);
  // Market Expansion
  if (hasBoardRoomUpgrade('market_domestic')) mult *= 2;
  if (hasBoardRoomUpgrade('market_international')) mult *= 3;
  if (hasBoardRoomUpgrade('market_emerging')) mult *= 5;
  if (hasBoardRoomUpgrade('market_global')) mult *= 10;
  return mult;
}

function getBoardRoomTaxRate() {
  if (hasBoardRoomUpgrade('tax_haven')) return 0.15;
  if (hasBoardRoomUpgrade('lobbyist')) return 0.20;
  return 0.25;
}

function getBoardRoomAMTRate() {
  // AMT is always 15%, unchanged by upgrades
  return 0.15;
}

function getFinanceDeptLevel() {
  if (hasBoardRoomUpgrade('finance_dept_3')) return 3;
  if (hasBoardRoomUpgrade('finance_dept_2')) return 2;
  if (hasBoardRoomUpgrade('finance_dept_1')) return 1;
  return 0;
}

function getTechDeptLevel() {
  if (hasBoardRoomUpgrade('tech_dept_3')) return 3;
  if (hasBoardRoomUpgrade('tech_dept_2')) return 2;
  if (hasBoardRoomUpgrade('tech_dept_1')) return 1;
  return 0;
}

function getOpsDeptLevel() {
  if (hasBoardRoomUpgrade('ops_dept_3')) return 3;
  if (hasBoardRoomUpgrade('ops_dept_2')) return 2;
  if (hasBoardRoomUpgrade('ops_dept_1')) return 1;
  return 0;
}

// CFO guidance algorithm — picks guidance based on Finance Dept level
function pickCFOGuidance(level) {
  const keys = Object.keys(GUIDANCE_LEVELS); // conservative, in-line, ambitious, aggressive

  if (level === 1) {
    // The Intern: weighted random — 25% conservative, 50% in-line, 25% ambitious
    const roll = Math.random();
    if (roll < 0.25) return 'conservative';
    if (roll < 0.75) return 'in-line';
    return 'ambitious';
  }

  // Lv2/Lv3: context-aware weighted pick
  // Base weights for each guidance level
  const weights = { conservative: 0, 'in-line': 0, ambitious: 0, aggressive: 0 };
  const streak = gameState.earningsStreak;
  const baseline = gameState.analystBaseline;

  if (level === 2) {
    // Competent CFO — reads trends but not perfectly
    if (streak <= -2) {
      // After multiple misses: play it safe
      weights.conservative = 70;
      weights['in-line'] = 25;
      weights.ambitious = 5;
    } else if (streak < 0) {
      // After one miss: cautious
      weights.conservative = 40;
      weights['in-line'] = 45;
      weights.ambitious = 15;
    } else if (streak === 0) {
      // Fresh start or reset: balanced
      weights.conservative = 20;
      weights['in-line'] = 50;
      weights.ambitious = 25;
      weights.aggressive = 5;
    } else if (streak <= 3) {
      // Short beat streak: getting confident
      weights.conservative = 10;
      weights['in-line'] = 35;
      weights.ambitious = 40;
      weights.aggressive = 15;
    } else {
      // Long beat streak: bold but not reckless
      weights.conservative = 5;
      weights['in-line'] = 20;
      weights.ambitious = 45;
      weights.aggressive = 30;
    }

    // Analyst pressure adjustment — high baseline means analysts expect more
    if (baseline > 1.15) {
      weights.conservative += 20;
      weights['in-line'] += 10;
      weights.ambitious -= 15;
      weights.aggressive -= 15;
    }
  } else {
    // Lv3: Elite CFO — smarter weights, factors in more context
    if (streak <= -2) {
      weights.conservative = 50;
      weights['in-line'] = 40;
      weights.ambitious = 10;
    } else if (streak < 0) {
      weights.conservative = 25;
      weights['in-line'] = 50;
      weights.ambitious = 20;
      weights.aggressive = 5;
    } else if (streak === 0) {
      weights.conservative = 10;
      weights['in-line'] = 40;
      weights.ambitious = 35;
      weights.aggressive = 15;
    } else if (streak <= 3) {
      weights.conservative = 5;
      weights['in-line'] = 20;
      weights.ambitious = 45;
      weights.aggressive = 30;
    } else if (streak <= 6) {
      // Strong streak but analysts ratcheting — pull back slightly
      weights.conservative = 5;
      weights['in-line'] = 25;
      weights.ambitious = 40;
      weights.aggressive = 30;
    } else {
      // Very long streak — analysts are aggressive, play safer
      weights.conservative = 10;
      weights['in-line'] = 35;
      weights.ambitious = 35;
      weights.aggressive = 20;
    }

    // High analyst baseline: elite CFO recognizes danger
    if (baseline > 1.15) {
      weights.conservative += 15;
      weights['in-line'] += 10;
      weights.ambitious -= 10;
      weights.aggressive -= 15;
    } else if (baseline < 0.85) {
      // Low expectations: be bolder
      weights.ambitious += 10;
      weights.aggressive += 10;
      weights.conservative -= 10;
      weights['in-line'] -= 10;
    }

    // Active revenue penalty: notch safer
    if (gameState.revPenalty && Date.now() < gameState.revPenalty.until) {
      weights.conservative += 20;
      weights.ambitious -= 10;
      weights.aggressive -= 10;
    }
    // Active revenue bonus: notch bolder
    if (gameState.revBonus && Date.now() < gameState.revBonus.until) {
      weights.ambitious += 10;
      weights.aggressive += 10;
      weights.conservative -= 10;
    }
  }

  // Ensure no negative weights
  for (const k of keys) weights[k] = Math.max(0, weights[k]);

  // Weighted random pick
  const total = keys.reduce((sum, k) => sum + weights[k], 0);
  let roll = Math.random() * total;
  for (const key of keys) {
    roll -= weights[key];
    if (roll <= 0) return key;
  }
  return 'in-line'; // fallback
}

function setActiveCFOLevel(level) {
  const maxLevel = getFinanceDeptLevel();
  if (level < 0 || level > maxLevel) return;
  gameState.activeCFOLevel = level;
  // Don't re-pick guidance mid-quarter — CFO picks at next earnings
  _lastTaxPanelHash = '';
  updateTaxPanel();
}

function setActiveCTOLevel(level) {
  const maxLevel = getTechDeptLevel();
  if (level < 0 || level > maxLevel) return;
  gameState.activeCTOLevel = level;
  _lastTaxPanelHash = '';
  updateTaxPanel();
}

function setCtoBudgetPct(val) {
  gameState.ctoBudgetPct = Math.max(0, Math.min(100, parseInt(val) || 0));
  _lastTaxPanelHash = '';
  updateTaxPanel();
}

function setActiveCOOLevel(level) {
  const maxLevel = getOpsDeptLevel();
  if (level < 0 || level > maxLevel) return;
  gameState.activeCOOLevel = level;
  _lastTaxPanelHash = '';
  updateTaxPanel();
}

function setCooBudgetPct(val) {
  gameState.cooBudgetPct = Math.max(0, Math.min(100, parseInt(val) || 0));
  _lastTaxPanelHash = '';
  updateTaxPanel();
}

function toggleCtoBudgetAuto(enabled) {
  gameState.ctoBudgetAuto = enabled;
  _lastTaxPanelHash = '';
  updateTaxPanel();
}

// CTO auto-upgrade logic — buys ONE dept upgrade per tick
function ctoAutoUpgrade() {
  try {
    const level = gameState.activeCTOLevel;
    if (!level || getTechDeptLevel() < level) return;

    const pool = gameState.ctoBudgetPool || 0;

    // Build candidate list: all unlocked depts (regardless of affordability)
    const allCandidates = [];
    for (let i = 0; i < gameState.sources.length; i++) {
      const state = gameState.sources[i];
      if (!state.unlocked || state.employees === 0) continue;
      const stats = SOURCE_STATS[state.id];
      if (!stats) continue;
      const cost = upgradeCost(state);
      const annualRevGain = sourceRevPerTick(state) * 365.25 * 0.5;
      const roi = cost > 0 ? annualRevGain / cost : 0;
      allCandidates.push({ index: i, cost, revGain: annualRevGain, roi, name: stats.name });
    }
    if (allCandidates.length === 0) return;

    // Determine target based on CTO level strategy
    let target = null;
    if (level === 1) {
      allCandidates.sort((a, b) => a.cost - b.cost);
      target = allCandidates[0];
    } else if (level === 2) {
      allCandidates.sort((a, b) => b.roi - a.roi);
      target = allCandidates.find(c => c.roi >= 0.001) || allCandidates[0];
    } else if (level === 3) {
      allCandidates.sort((a, b) => b.roi - a.roi);
      const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
      const earningsDaysSince = currentDay - gameState.lastEarningsDay;
      const daysLeft = Math.max(0, EARNINGS_QUARTER_DAYS - earningsDaysSince);
      let threshold = 0.001;
      if (daysLeft < 5) threshold = 0.05;
      else if (daysLeft < 20) threshold = 0.01;
      target = allCandidates.find(c => c.roi >= threshold) || allCandidates[0];
    }

    if (!target) return;

    // Store target info for display
    gameState.ctoTarget = target.name;
    gameState.ctoTargetCost = target.cost;

    // Buy if pool can afford it
    if (pool >= target.cost) {
      gameState.ctoBudgetPool -= target.cost;
      gameState.ctoSpentThisQuarter += target.cost;
      gameState.ctoUpgradeCount = (gameState.ctoUpgradeCount || 0) + 1;
      gameState.ctoJustBought = true; // flash flag for UI
      // upgradeSource deducts from cash — add cost back since CTO pays from pool
      gameState.cash += target.cost;
      upgradeSource(target.index);
    }
  } catch (e) {
    console.error('[CTO] Error:', e);
  }
}

function cooAutoHire() {
  try {
    const level = gameState.activeCOOLevel;
    if (!level || getOpsDeptLevel() < level) return;

    const pool = gameState.cooBudgetPool || 0;

    // Build candidate list: all unlocked depts
    const allCandidates = [];
    for (let i = 0; i < gameState.sources.length; i++) {
      const state = gameState.sources[i];
      if (!state.unlocked) continue;
      const stats = SOURCE_STATS[state.id];
      if (!stats) continue;
      const cost = hireCost(state);
      // Marginal revenue gain from one more employee
      const revGain = sourceRevPerTick(state) / Math.max(1, state.employees);
      allCandidates.push({ index: i, cost, revGain, employees: state.employees, name: stats.name });
    }
    if (allCandidates.length === 0) return;

    let target = null;
    if (level === 1) {
      // The Recruiter: cheapest hire first
      allCandidates.sort((a, b) => a.cost - b.cost);
      target = allCandidates[0];
    } else if (level === 2) {
      // VP of Ops: best marginal revenue per hire cost
      allCandidates.sort((a, b) => (b.revGain / b.cost) - (a.revGain / a.cost));
      target = allCandidates[0];
    } else if (level === 3) {
      // Elite COO: revenue-optimized with earnings timing awareness
      allCandidates.sort((a, b) => (b.revGain / b.cost) - (a.revGain / a.cost));
      const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
      const earningsDaysSince = currentDay - gameState.lastEarningsDay;
      const daysLeft = Math.max(0, EARNINGS_QUARTER_DAYS - earningsDaysSince);
      if (daysLeft < 5) {
        // Near earnings: hire cheapest to conserve pool
        allCandidates.sort((a, b) => a.cost - b.cost);
      }
      target = allCandidates[0];
    }

    if (!target) return;

    // Store target info for display
    gameState.cooTarget = target.name;
    gameState.cooTargetCost = target.cost;

    // Hire if pool can afford it (also check hire freeze)
    const hireFrozen = gameState.hireFrozen && Date.now() < gameState.hireFrozen;
    if (pool >= target.cost && !hireFrozen) {
      gameState.cooBudgetPool -= target.cost;
      gameState.cooSpentThisQuarter += target.cost;
      gameState.cooHireCount = (gameState.cooHireCount || 0) + 1;
      gameState.cooJustBought = true;
      // hireEmployee deducts from cash — add cost back since COO pays from pool
      gameState.cash += target.cost;
      hireEmployee(target.index);
    }
  } catch (e) {
    console.error('[COO] Error:', e);
  }
}

// ===== GAME STATE =====
let gameState = {
  arc: null,  // selected arc key
  cash: 0,
  totalEarned: 0,
  sources: [],
  revPenalty: null,
  revBonus: null,
  powerOutage: null,
  dbOutage: null,
  hireFrozen: null,
  taxDebts: [],
  seriesAShown: false,
  lastSave: Date.now(),
  lastTick: Date.now(),
  bossMode: false,
  eventCooldown: 0,
  totalPlayTime: 0,
  miniTaskCooldown: 0,
  miniTaskActive: false,
  miniTaskBlocked: null,
  miniTaskStreak: 0,
  goldenCellActive: false,
  goldenCellCooldown: 60,  // don't spawn for first 60s
  totalClicks: 0,
  gameStartDate: Date.now(),  // real-world date at game start
  gameElapsedSecs: 0,
  // Financials
  quarterRevenue: 0,      // revenue earned this quarter
  quarterExpenses: 0,     // expenses this quarter
  quarterTaxPaid: 0,      // taxes paid this quarter
  totalTaxPaid: 0,        // lifetime taxes paid
  totalSpentHires: 0,
  totalSpentUpgrades: 0,
  totalSpentAuto: 0,
  lastQuarterDay: 0,      // game-day of last quarter close
  capitalExpenses: [],     // {amount, dayCreated, quartersLeft} — depreciate over 4 quarters
  valuationHistory: [],    // array of {day, val} for chart — sampled every ~5 ticks
  // Phase 2.1: IPO + Earnings
  isPublic: false,
  ipoDay: 0,
  sharesOutstanding: 1000000000, // 1B shares
  retainedEarnings: 0,
  analystBaseline: 1.0,
  earningsStreak: 0,       // positive = consecutive beats, negative = consecutive misses
  currentGuidance: null,   // 'conservative'|'in-line'|'ambitious'|'aggressive'
  guidanceTarget: 0,       // revenue target for current quarter
  lastEarningsDay: 0,      // game-day of last earnings report
  earningsQuarterRevenue: 0, // revenue tracked for earnings (separate from tax quarter)
  ipoStockPriceStart: 0,  // stock price at start of current earnings quarter
  // Phase 2.2: Board Room
  boardRoomPurchases: {},  // map of upgrade IDs to purchase count/level
  activeTab: 'operations', // 'operations' | 'boardroom'
  activeCFOLevel: 0,       // 0 = manual, 1/2/3 = Finance Dept level in use
  activeCTOLevel: 0,       // 0 = manual, 1/2/3 = Tech Dept level in use
  ctoBudgetPct: 15,        // 0-100, slider value for CTO quarterly budget
  ctoSpentThisQuarter: 0,  // $ spent by CTO this quarter
  ctoBudgetPool: 0,        // accumulated CTO budget from revenue skimming
  ctoBudgetAuto: false,    // CapEx Planning upgrade — CFO manages budget automatically
  activeCOOLevel: 0,       // 0 = manual, 1/2/3 = Ops Dept level in use
  cooBudgetPct: 15,        // 0-100, slider value for COO hiring budget
  cooSpentThisQuarter: 0,  // $ spent by COO this quarter
  cooBudgetPool: 0,        // accumulated COO budget from revenue skimming
  cooHireCount: 0,         // total hires by COO
  cfoRecords: {},          // { 1: {beats:0,total:0}, 2: {...}, 3: {...} }
  revenueHistory: [],      // last 3 quarterly revenues for trend analysis
  lastQuarterRE: 0,        // RE earned last quarter (for ETA display)
};

let gridBuilt = false;

// ===== GET ACTIVE SOURCES (arc-aware) =====
function getSourceDef(index) {
  const arc = ARCS[gameState.arc];
  const stats = SOURCE_STATS[index];
  return {
    id: index,
    name: arc.sources[index].name,
    flavor: arc.sources[index].flavor,
    baseRate: stats.baseRate,
    unlockCost: stats.unlockCost,
    clickValue: stats.clickValue,
  };
}

// ===== COST FORMULAS =====
function getHireCostExponent() {
  if (hasBoardRoomUpgrade('talent_magnet')) return 1.06;
  if (hasBoardRoomUpgrade('employer_branding')) return 1.09;
  if (hasBoardRoomUpgrade('talent_pipeline')) return 1.12;
  return 1.15;
}

function hireCost(source) {
  const stats = SOURCE_STATS[source.id];
  const base = stats.unlockCost || 10;
  const exp = getHireCostExponent();
  return Math.max(5, Math.floor(base * 0.5 * Math.pow(exp, source.employees)));
}

function upgradeCost(source) {
  const stats = SOURCE_STATS[source.id];
  return Math.floor(Math.max(50, 10 * stats.baseRate) * Math.pow(2, source.upgradeLevel));
}

function automateCost(source) {
  const stats = SOURCE_STATS[source.id];
  return Math.floor(Math.max(50, stats.unlockCost) * stats.autoCostMult);
}

// Prestige: restructure a department for 10× revenue, costs RE
function prestigeCost(source) {
  const tier = source.id;
  const level = source.prestigeLevel || 0;
  // Mild tier scaling: lemonade stand is cheap, megacorp is expensive
  // 50 × (1 + tier) × 3^level
  // Tier 0: 50 → 150 → 450 | Tier 11: 600 → 1800 → 5400
  return Math.floor(50 * (1 + tier) * Math.pow(3, level));
}

function restructureSource(index) {
  if (!gameState.isPublic) return; // requires IPO
  const state = gameState.sources[index];
  if (!state.unlocked || state.employees === 0) return;
  const cost = prestigeCost(state);
  if (gameState.retainedEarnings < cost) return;
  gameState.retainedEarnings -= cost;
  state.prestigeLevel = (state.prestigeLevel || 0) + 1;
  const src = getSourceDef(index);
  document.getElementById('status-text').textContent = `★ ${src.name} restructured! Revenue ×10 (Prestige ${state.prestigeLevel})`;
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 4000);
  _lastTaxPanelHash = ''; // force IR rebuild (RE changed)
  updateDisplay();
  updateGridValues();
  saveGame();
}

function maxAffordable(source) {
  let cash = gameState.cash;
  let emps = source.employees;
  let count = 0;
  const stats = SOURCE_STATS[source.id];
  const base = stats.unlockCost || 10;
  while (count < 1000) {
    const cost = Math.max(5, Math.floor(base * 0.5 * Math.pow(getHireCostExponent(), emps)));
    if (cash < cost) break;
    cash -= cost;
    emps++;
    count++;
  }
  return count;
}

function maxAffordableUpgrades(source) {
  let cash = gameState.cash;
  let level = source.upgradeLevel;
  let count = 0;
  const stats = SOURCE_STATS[source.id];
  while (count < 100) {
    const cost = Math.floor(Math.max(50, 10 * stats.baseRate) * Math.pow(2, level));
    if (cash < cost) break;
    cash -= cost;
    level++;
    count++;
  }
  return count;
}

// Revenue per tick (= per day) for a source
function sourceRevPerTick(source) {
  if (!source.unlocked || source.employees === 0) return 0;
  const stats = SOURCE_STATS[source.id];
  const upgradeMult = 1 + source.upgradeLevel * 0.5;
  const prestigeMult = Math.pow(10, source.prestigeLevel || 0);
  const breakthroughMult = source.breakthroughMult || 1;
  const focusMult = isFeatureEnabled('managementFocus') ? 1 + (source.focus || 0) * 0.05 : 1;
  return source.employees * stats.baseRate * upgradeMult * prestigeMult * breakthroughMult * focusMult / 365.25;
}

function totalRevPerTick() {
  let total = 0;
  const dbOut = gameState.dbOutage && Date.now() < gameState.dbOutage.until ? gameState.dbOutage.sourceIndex : -1;
  for (let i = 0; i < gameState.sources.length; i++) {
    if (i === dbOut) continue; // department offline from DB corruption
    total += sourceRevPerTick(gameState.sources[i]);
  }
  // Board Room revenue multiplier
  total *= getBoardRoomRevMultiplier();
  if (gameState.revPenalty && Date.now() < gameState.revPenalty.until) {
    total *= gameState.revPenalty.mult;
  } else {
    gameState.revPenalty = null;
  }
  if (gameState.revBonus && Date.now() < gameState.revBonus.until) {
    total *= gameState.revBonus.mult;
  } else {
    gameState.revBonus = null;
  }
  if (gameState.powerOutage && Date.now() < gameState.powerOutage.until) {
    total = 0;
  }
  return total;
}

// Annual revenue for display
function sourceAnnualRev(source) {
  if (!source.unlocked || source.employees === 0) return 0;
  const stats = SOURCE_STATS[source.id];
  const upgradeMult = 1 + source.upgradeLevel * 0.5;
  const prestigeMult = Math.pow(10, source.prestigeLevel || 0);
  const breakthroughMult = source.breakthroughMult || 1;
  const focusMult = isFeatureEnabled('managementFocus') ? 1 + (source.focus || 0) * 0.05 : 1;
  return source.employees * stats.baseRate * upgradeMult * prestigeMult * breakthroughMult * focusMult;
}

function totalAnnualRev() {
  let total = 0;
  for (const s of gameState.sources) {
    total += sourceAnnualRev(s);
  }
  // Board Room revenue multiplier
  total *= getBoardRoomRevMultiplier();
  return total;
}

// ===== FORMATTING =====
function formatMoney(n) {
  if (n >= 1e33) return '$' + (n / 1e33).toFixed(2) + 'Dc';
  if (n >= 1e30) return '$' + (n / 1e30).toFixed(2) + 'No';
  if (n >= 1e27) return '$' + (n / 1e27).toFixed(2) + 'Oc';
  if (n >= 1e24) return '$' + (n / 1e24).toFixed(2) + 'Sp';
  if (n >= 1e21) return '$' + (n / 1e21).toFixed(2) + 'Sx';
  if (n >= 1e18) return '$' + (n / 1e18).toFixed(2) + 'Qi';
  if (n >= 1e15) return '$' + (n / 1e15).toFixed(2) + 'Q';
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e4) return '$' + (n / 1e3).toFixed(1) + 'K';
  return '$' + n.toFixed(2);
}

function formatNum(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatRate(annualRev) {
  // Show rate in the most readable unit
  if (annualRev >= 1e33) return '$' + (annualRev / 1e33).toFixed(1) + 'Dc/yr';
  if (annualRev >= 1e30) return '$' + (annualRev / 1e30).toFixed(1) + 'No/yr';
  if (annualRev >= 1e27) return '$' + (annualRev / 1e27).toFixed(1) + 'Oc/yr';
  if (annualRev >= 1e24) return '$' + (annualRev / 1e24).toFixed(1) + 'Sp/yr';
  if (annualRev >= 1e21) return '$' + (annualRev / 1e21).toFixed(1) + 'Sx/yr';
  if (annualRev >= 1e18) return '$' + (annualRev / 1e18).toFixed(1) + 'Qi/yr';
  if (annualRev >= 1e15) return '$' + (annualRev / 1e15).toFixed(1) + 'Q/yr';
  if (annualRev >= 1e12) return '$' + (annualRev / 1e12).toFixed(1) + 'T/yr';
  if (annualRev >= 1e9) return '$' + (annualRev / 1e9).toFixed(1) + 'B/yr';
  if (annualRev >= 1e6) return '$' + (annualRev / 1e6).toFixed(1) + 'M/yr';
  if (annualRev >= 1e3) return '$' + (annualRev / 1e3).toFixed(0) + 'K/yr';
  return '$' + annualRev.toFixed(0) + '/yr';
}

function formatPerTick(perTick) {
  if (perTick >= 1e33) return '$' + (perTick / 1e33).toFixed(1) + 'Dc';
  if (perTick >= 1e30) return '$' + (perTick / 1e30).toFixed(1) + 'No';
  if (perTick >= 1e27) return '$' + (perTick / 1e27).toFixed(1) + 'Oc';
  if (perTick >= 1e24) return '$' + (perTick / 1e24).toFixed(1) + 'Sp';
  if (perTick >= 1e21) return '$' + (perTick / 1e21).toFixed(1) + 'Sx';
  if (perTick >= 1e18) return '$' + (perTick / 1e18).toFixed(1) + 'Qi';
  if (perTick >= 1e15) return '$' + (perTick / 1e15).toFixed(1) + 'Q';
  if (perTick >= 1e12) return '$' + (perTick / 1e12).toFixed(1) + 'T';
  if (perTick >= 1e9) return '$' + (perTick / 1e9).toFixed(1) + 'B';
  if (perTick >= 1e6) return '$' + (perTick / 1e6).toFixed(1) + 'M';
  if (perTick >= 1e3) return '$' + (perTick / 1e3).toFixed(1) + 'K';
  if (perTick >= 1) return '$' + perTick.toFixed(2);
  if (perTick >= 0.01) return '$' + perTick.toFixed(2);
  return '$' + perTick.toFixed(4);
}

function formatStatMoney(n) {
  if (n >= 1e15) return '$' + (n / 1e15).toFixed(2) + 'Q';
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(2) + 'K';
  if (n >= 1) return '$' + n.toFixed(2);
  if (n >= 0.01) return '$' + n.toFixed(4);
  if (n >= 0.0001) return '$' + n.toFixed(6);
  return '$' + n.toExponential(1);
}

function formatDuration(seconds) {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  }
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  }
  return `${Math.floor(seconds)}s`;
}

// ===== ARC SELECTION =====
function selectArc(arcKey) {
  gameState.arc = arcKey;
  gameState.cash = 0;
  gameState.totalEarned = 0;
  gameState.sources = SOURCE_STATS.map((s, i) => ({
    id: i,
    unlocked: i === 0,
    employees: i === 0 ? 1 : 0,
    upgradeLevel: 0,
    automated: false,
    pendingCollect: 0,
    prestigeLevel: 0,
    breakthroughMult: 1,
    focus: 0,
    lastFocusClick: 0,
  }));
  gameState.seriesAShown = false;
  gameState.totalPlayTime = 0;
  gameState.totalClicks = 0;
  gameState.eventCooldown = 30;
  gameState.miniTaskCooldown = 10;
  gameState.miniTaskActive = false;
  gameState.miniTaskBlocked = null;
  gameState.miniTaskStreak = 0;
  gameState.goldenCellActive = false;
  gameState.goldenCellCooldown = 60;
  gameState.gameStartDate = Date.now();
  gameState.gameElapsedSecs = 0;
  gameState.revPenalty = null;
  gameState.revBonus = null;
  gameState.powerOutage = null;
  gameState.dbOutage = null;
  gameState.miniTaskBlocked = null;
  gameState.hireFrozen = null;
  gameState.taxDebts = [];
  gameState.quarterRevenue = 0;
  gameState.quarterExpenses = 0;
  gameState.quarterTaxPaid = 0;
  gameState.totalTaxPaid = 0;
  gameState.totalSpentHires = 0;
  gameState.totalSpentUpgrades = 0;
  gameState.totalSpentAuto = 0;
  gameState.lastQuarterDay = 0;
  gameState.capitalExpenses = [];
  gameState.valuationHistory = [];
  // Phase 2.1
  gameState.isPublic = false;
  gameState.ipoDay = 0;
  gameState.sharesOutstanding = 1000000000;
  gameState.retainedEarnings = 0;
  gameState.analystBaseline = 1.0;
  gameState.earningsStreak = 0;
  gameState.currentGuidance = null;
  gameState.guidanceTarget = 0;
  gameState.lastEarningsDay = 0;
  gameState.earningsQuarterRevenue = 0;
  gameState.ipoStockPriceStart = 0;
  gameState._earningsMultiplier = 1.0;
  // Phase 2.2: Board Room
  gameState.boardRoomPurchases = {};
  gameState.activeTab = 'operations';
  gameState.activeCFOLevel = 0;
  gameState.activeCTOLevel = 0;
  gameState.ctoBudgetPct = 15;
  gameState.ctoSpentThisQuarter = 0;
  gameState.ctoBudgetPool = 0;
  gameState.ctoBudgetAuto = false;
  gameState.activeCOOLevel = 0;
  gameState.cooBudgetPct = 15;
  gameState.cooSpentThisQuarter = 0;
  gameState.cooBudgetPool = 0;
  gameState.cooHireCount = 0;
  gameState.cfoRecords = {};
  gameState.revenueHistory = [];
  gameState.lastQuarterRE = 0;

  // Clear stale panels
  const taxPanel = document.getElementById('tax-panel');
  taxPanel.innerHTML = '';
  taxPanel.classList.add('hidden');
  document.getElementById('valuation-chart-container').classList.add('hidden');
  chartPositioned = false;

  // Reset Board Room state
  document.getElementById('board-room-rows').innerHTML = '';
  document.getElementById('board-room-rows').classList.add('hidden');
  _lastBoardRoomHash = '';
  switchTab('operations');
  updateBoardRoomTab();

  document.getElementById('arc-select').classList.add('hidden');
  document.getElementById('game-view').classList.remove('hidden');

  buildGrid();
  updateDisplay();
  saveGame();
}

function showArcSelect() {
  const container = document.getElementById('arc-options');
  container.innerHTML = '';
  for (const [key, arc] of Object.entries(ARCS)) {
    const div = document.createElement('div');
    div.className = 'arc-option';
    div.onclick = () => selectArc(key);
    div.innerHTML = `
      <div class="arc-icon">${arc.icon}</div>
      <div class="arc-name">${arc.name}</div>
      <div class="arc-desc">${arc.desc}</div>
      <div class="arc-first">${arc.sources[0].name} → ${arc.sources[arc.sources.length - 1].name}</div>
    `;
    container.appendChild(div);
  }
  document.getElementById('arc-select').classList.remove('hidden');
  document.getElementById('game-view').classList.add('hidden');
}

// ===== MINI-TASKS =====
function trySpawnMiniTask() {
  if (gameState.miniTaskActive) return;
  if (gameState.miniTaskBlocked && Date.now() < gameState.miniTaskBlocked.until) return; // email server down
  if (gameState.miniTaskCooldown > 0) { gameState.miniTaskCooldown--; return; }

  // Frequency decreases as passive income grows
  const passiveIncome = totalRevPerTick();
  const spawnChance = passiveIncome > 500 ? 0.02 : passiveIncome > 50 ? 0.04 : 0.06;
  if (Math.random() > spawnChance) return;

  // Filter tasks by highest unlocked tier
  const maxTier = gameState.sources.reduce((max, s) => s.unlocked ? Math.max(max, s.id) : max, 0);
  const eligible = MINI_TASKS.filter(t => t.minTier <= maxTier);
  const task = eligible[Math.floor(Math.random() * eligible.length)];
  const num = task.tier === 'high' ? (Math.floor(Math.random() * 9) + 1) : Math.floor(Math.random() * 9000) + 1000;
  const reward = miniTaskReward(task);
  const text = task.text.replace('{{num}}', num);

  showMiniTask(text, reward, task.tier);
}

let miniTaskTimer = null;

function showMiniTask(text, reward, tier) {
  gameState.miniTaskActive = true;
  const bar = document.getElementById('mini-task-bar');
  const tierLabels = { low: '📋', mid: '📊', high: '💼' };
  const streakLabel = gameState.miniTaskStreak >= 3 ? ` 🔥${gameState.miniTaskStreak}` : '';
  document.getElementById('mini-task-text').textContent = (tierLabels[tier] || '') + ' ' + text;
  document.getElementById('mini-task-reward').textContent = `+${formatMoney(reward)}${streakLabel}`;
  bar.dataset.reward = reward;
  bar.classList.remove('hidden');

  // Auto-expire: skip button fills red over 10s, then auto-skips
  if (miniTaskTimer) { clearTimeout(miniTaskTimer); miniTaskTimer = null; }
  const skipBtn = bar.querySelector('.mini-task-skip');
  skipBtn.style.position = 'relative';
  skipBtn.style.overflow = 'hidden';
  // Remove old countdown if any
  const oldFill = skipBtn.querySelector('.toast-btn-countdown');
  if (oldFill) oldFill.remove();
  const fill = document.createElement('div');
  fill.className = 'toast-btn-countdown';
  fill.style.animationDuration = '10s';
  skipBtn.appendChild(fill);

  miniTaskTimer = setTimeout(() => {
    miniTaskTimer = null;
    skipMiniTask();
  }, 10000);
}

function completeMiniTask() {
  if (miniTaskTimer) { clearTimeout(miniTaskTimer); miniTaskTimer = null; }
  const bar = document.getElementById('mini-task-bar');
  const reward = parseFloat(bar.dataset.reward) || 0;
  gameState.cash += reward;
  gameState.totalEarned += reward;
  gameState.quarterRevenue += reward;
  trackEarningsRevenue(reward);
  gameState.totalClicks++;
  gameState.miniTaskStreak++;
  bar.classList.add('hidden');
  gameState.miniTaskActive = false;
  gameState.miniTaskCooldown = 15 + Math.floor(Math.random() * 15); // 15-30s cooldown

  // Streak feedback
  const streakMsg = gameState.miniTaskStreak >= 10 ? ` 🔥🔥🔥 ${gameState.miniTaskStreak} streak! (3×)` :
                    gameState.miniTaskStreak >= 5 ? ` 🔥🔥 ${gameState.miniTaskStreak} streak! (2×)` :
                    gameState.miniTaskStreak >= 3 ? ` 🔥 ${gameState.miniTaskStreak} streak! (1.5×)` :
                    gameState.miniTaskStreak > 1 ? ` (${gameState.miniTaskStreak} in a row)` : '';
  document.getElementById('status-text').textContent = `✅ Task done! +${formatMoney(reward)}${streakMsg}`;
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 2000);

  flashCash();
  updateDisplay();
}

function skipMiniTask() {
  if (miniTaskTimer) { clearTimeout(miniTaskTimer); miniTaskTimer = null; }
  const bar = document.getElementById('mini-task-bar');
  bar.classList.add('hidden');
  gameState.miniTaskActive = false;
  gameState.miniTaskCooldown = 10;
  if (gameState.miniTaskStreak > 0) {
    document.getElementById('status-text').textContent = `💔 Streak lost! (was ${gameState.miniTaskStreak})`;
    setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 2000);
  }
  gameState.miniTaskStreak = 0;
}

// ===== TIME SCALE CHANGE NOTIFICATION =====

// ===== GOLDEN CELL =====
let goldenCellTimer = null;

function trySpawnGoldenCell() {
  if (gameState.goldenCellActive) return;
  if (gameState.goldenCellCooldown > 0) { gameState.goldenCellCooldown--; return; }

  // ~2% chance per tick (avg every 50s)
  if (Math.random() > 0.02) return;

  const unlocked = gameState.sources.map((s, i) => ({ s, i })).filter(x => x.s.unlocked && x.s.employees > 0);
  if (unlocked.length === 0) return;

  const pick = unlocked[Math.floor(Math.random() * unlocked.length)];
  const rowIndex = pick.i;

  // Pick a random visible cell in that row (columns b through h)
  const cols = ['cell-b', 'cell-c', 'cell-d', 'cell-e', 'cell-f', 'cell-g', 'cell-h'];
  const colClass = cols[Math.floor(Math.random() * cols.length)];

  // Find the grid row for this source
  const gridRows = document.querySelectorAll('#grid-container .source-row');
  if (rowIndex >= gridRows.length) return;

  const row = gridRows[rowIndex];
  const cell = row.querySelector('.' + colClass);
  if (!cell) return;

  const reward = Math.floor(totalRevPerTick() * 20);
  if (reward <= 0) return;

  gameState.goldenCellActive = true;
  cell.classList.add('golden-cell');
  cell.dataset.goldenReward = reward;

  // 5 second window
  goldenCellTimer = setTimeout(() => {
    cell.classList.remove('golden-cell');
    delete cell.dataset.goldenReward;
    gameState.goldenCellActive = false;
    gameState.goldenCellCooldown = 30 + Math.floor(Math.random() * 30); // 30-60s before next
  }, 5000);
}

function clickGoldenCell(cell) {
  if (!cell.classList.contains('golden-cell')) return false;

  const reward = parseFloat(cell.dataset.goldenReward) || 0;
  cell.classList.remove('golden-cell');
  delete cell.dataset.goldenReward;
  gameState.goldenCellActive = false;
  if (goldenCellTimer) { clearTimeout(goldenCellTimer); goldenCellTimer = null; }
  gameState.goldenCellCooldown = 30 + Math.floor(Math.random() * 30);

  gameState.cash += reward;
  gameState.totalEarned += reward;
  gameState.quarterRevenue += reward;
  trackEarningsRevenue(reward);
  gameState.totalClicks++;

  document.getElementById('status-text').textContent = `✨ Golden cell! +${formatMoney(reward)}`;
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 2000);

  flashCash();
  updateDisplay();
  return true;
}

// ===== RENDERING =====
function buildGrid() {
  if (!gameState.arc) return;
  const container = document.getElementById('revenue-rows');
  container.innerHTML = '';

  for (let i = 0; i < SOURCE_STATS.length; i++) {
    const src = getSourceDef(i);
    const state = gameState.sources[i];
    const rowNum = i + 3;

    const row = document.createElement('div');
    row.className = 'grid-row source-row';
    row.id = `source-row-${i}`;

    if (!state.unlocked) {
      row.classList.add('source-locked');
      const nextUnlockable = isNextUnlock(i);
      row.innerHTML = `
        <div class="row-num">${rowNum}</div>
        <div class="cell cell-a" data-field="name">🔒 ${src.name}</div>
        <div class="cell cell-b" data-field="emp">—</div>
        <div class="cell cell-c" data-field="rate">—</div>
        <div class="cell cell-d" data-field="action1">
          ${nextUnlockable ? `<button class="cell-btn btn-unlock" onclick="unlockSource(${i})" data-btn="unlock">Unlock ${formatMoney(src.unlockCost)}</button>` : `<span style="color:${dm('#ccc')}">${formatMoney(src.unlockCost)}</span>`}
        </div>
        <div class="cell cell-e" data-field="action2"></div>
        <div class="cell cell-f" data-field="action3"></div>
        <div class="cell cell-g" data-field="annual">—</div>
        <div class="cell cell-h empty-cell"></div>
      `;
    } else {
      row.innerHTML = `
        <div class="row-num">${rowNum}</div>
        <div class="cell cell-a source-name" data-field="name"></div>
        <div class="cell cell-b" data-field="emp"></div>
        <div class="cell cell-c" data-field="rate"></div>
        <div class="cell cell-d" data-field="action1"></div>
        <div class="cell cell-e" data-field="action2"></div>
        <div class="cell cell-f" data-field="action3"></div>
        <div class="cell cell-g" data-field="annual"></div>
        <div class="cell cell-h empty-cell"></div>
      `;
    }

    container.appendChild(row);
  }

  // Overtime row (below sources, hidden until feature enabled + has revenue)
  const overtimeRow = document.createElement('div');
  overtimeRow.className = 'grid-row source-row';
  overtimeRow.id = 'overtime-row';
  overtimeRow.style.display = 'none';
  const otRowNum = SOURCE_STATS.length + 4;
  overtimeRow.innerHTML = `
    <div class="row-num">${otRowNum}</div>
    <div class="cell cell-a" style="font-weight:600;color:${dm('#555')}">⏰ Overtime</div>
    <div class="cell cell-b" id="overtime-clicks" style="font-size:11px;color:${dm('#888')}"></div>
    <div class="cell cell-c" id="overtime-next" style="font-family:Consolas,monospace;font-size:11px;color:${dm('#217346')};justify-content:flex-end"></div>
    <div class="cell cell-d">
      <button class="cell-btn btn-collect" id="overtime-btn" onclick="clickOvertime()" title="Instant cash (5s of revenue). Diminishing returns per quarter.">Push It</button>
    </div>
    <div class="cell cell-e" id="overtime-diminish" style="font-size:10px;color:${dm('#999')}"></div>
    <div class="cell cell-f"></div>
    <div class="cell cell-g"></div>
    <div class="cell cell-h empty-cell"></div>
  `;
  container.appendChild(overtimeRow);

  // Filler rows
  buildFillerRows();

  gridBuilt = true;
  updateGridValues();
}

function buildFillerRows() {
  const filler = document.getElementById('filler-rows');
  filler.innerHTML = '';
  const taxRowCount = gameState.taxDebts && gameState.taxDebts.length > 0 ? gameState.taxDebts.length + 3 : 0;

  // Calculate how many rows needed to fill viewport
  const ROW_HEIGHT = 28;
  const gridBottom = filler.getBoundingClientRect().top;
  const viewportHeight = window.innerHeight;
  // Measure actual bottom chrome height
  const revBar = document.getElementById('revenue-breakdown');
  const sheetTabs = document.getElementById('sheet-tabs');
  const statusBar = document.getElementById('status-bar');
  const bottomChrome = (revBar ? revBar.offsetHeight : 0) +
                        (sheetTabs ? sheetTabs.offsetHeight : 0) +
                        (statusBar ? statusBar.offsetHeight : 0);
  const available = viewportHeight - gridBottom - bottomChrome;
  const fillerCount = Math.max(3, Math.ceil(available / ROW_HEIGHT) + 1);

  const startRow = SOURCE_STATS.length + 3 + taxRowCount;
  for (let i = 0; i < fillerCount; i++) {
    const row = document.createElement('div');
    row.className = 'filler-row';
    row.innerHTML = `
      <div class="row-num">${startRow + i}</div>
      <div class="cell"></div><div class="cell"></div><div class="cell"></div>
      <div class="cell"></div><div class="cell"></div><div class="cell"></div>
      <div class="cell"></div><div class="cell"></div>
    `;
    filler.appendChild(row);
  }
}

function updateGridValues() {
  if (!gameState.arc) return;
  for (let i = 0; i < SOURCE_STATS.length; i++) {
    const src = getSourceDef(i);
    const state = gameState.sources[i];
    const row = document.getElementById(`source-row-${i}`);
    if (!row) continue;

    if (!state.unlocked) {
      const unlockBtn = row.querySelector('[data-btn="unlock"]');
      if (unlockBtn) {
        unlockBtn.disabled = gameState.cash < src.unlockCost;
      }
      continue;
    }

    if (row.classList.contains('source-locked')) {
      buildGrid();
      return;
    }

    const rev = sourceAnnualRev(state);
    const revPerDay = rev / 365.25;
    const hCost = hireCost(state);
    const uCost = upgradeCost(state);
    const aCost = automateCost(state);

    // Name (clickable for focus)
    const nameCell = row.querySelector('[data-field="name"]');
    const prestigeTag = (state.prestigeLevel || 0) > 0 ? ` <span style="color:${dm('#d4a017')};font-size:10px">★${state.prestigeLevel}</span>` : '';
    const breakthroughTag = (state.breakthroughMult || 1) > 1 ? ` <span style="color:${dm('#2e7d32')};font-size:10px">🔬×${state.breakthroughMult}</span>` : '';
    const focusLevel = state.focus || 0;
    const focusable = isFeatureEnabled('managementFocus') && state.automated;
    const focusIcon = focusable ? `<span class="focus-icon${focusLevel > 0 ? ' focus-active' : ''}" title="Click to boost revenue (+5% per click, max +50%)">🎯</span>` : '';
    const tags = (state.upgradeLevel > 0 ? `<span style="color:${dm('#999')};font-size:10px">Lv${state.upgradeLevel}</span>` : '') + prestigeTag + breakthroughTag;
    nameCell.innerHTML = `<span style="display:flex;align-items:center;justify-content:space-between;width:100%"><span>${focusIcon}${src.name}</span><span style="white-space:nowrap">${tags}</span></span>`;
    if (focusable) {
      nameCell.style.cursor = 'pointer';
      nameCell.classList.add('focusable');
      nameCell.onclick = () => clickFocus(i);
    } else {
      nameCell.style.cursor = '';
      nameCell.classList.remove('focusable');
      nameCell.onclick = null;
    }

    // Employees
    row.querySelector('[data-field="emp"]').textContent = state.employees;

    // Rev/day (column C) — show focus bonus when active
    const rateCell = row.querySelector('[data-field="rate"]');
    // DB outage visual
    const isDbDown = gameState.dbOutage && Date.now() < gameState.dbOutage.until && gameState.dbOutage.sourceIndex === i;
    if (isDbDown) {
      row.classList.add('db-outage');
      const secsLeft = Math.ceil((gameState.dbOutage.until - Date.now()) / 1000);
      rateCell.innerHTML = `<span style="color:${dm('#c00')};font-weight:600">💾 OFFLINE ${secsLeft}s</span>`;
    } else {
      row.classList.remove('db-outage');
      if (isFeatureEnabled('managementFocus') && focusLevel > 0) {
        rateCell.innerHTML = `${formatPerTick(revPerDay)} <span class="focus-bonus">+${focusLevel * 5}%</span>`;
      } else {
        rateCell.textContent = formatPerTick(revPerDay);
      }
    }

    // Rev/yr (column G)
    row.querySelector('[data-field="annual"]').textContent = formatRate(rev);

    // Action 1: Hire + Max
    const a1 = row.querySelector('[data-field="action1"]');
    const frozen = gameState.hireFrozen && Date.now() < gameState.hireFrozen;
    if (frozen) {
      const sLeft = Math.ceil((gameState.hireFrozen - Date.now()) / 1000);
      a1.innerHTML = `<button class="cell-btn btn-hire" disabled>🚫 Frozen (${sLeft}s)</button>`;
    } else {
      const maxHires = maxAffordable(state);
      const upgradeMult = 1 + state.upgradeLevel * 0.5;
      const hireGainPerDay = src.baseRate * upgradeMult / 365.25;
      a1.innerHTML = (maxHires > 1 ? `<button class="cell-btn btn-max" onclick="hireMax(${i})" title="Hire all ${maxHires} you can afford">Max(${maxHires})</button>` : '') +
        `<button class="cell-btn btn-hire" onclick="hireEmployee(${i})" ${gameState.cash >= hCost ? '' : 'disabled'} title="Hire 1 employee — adds ${formatPerTick(hireGainPerDay)}/day">Hire ${formatMoney(hCost)} (+${formatPerTick(hireGainPerDay)}/d)</button>`;
    }

    // Action 2: Upgrade or Automate
    const a2 = row.querySelector('[data-field="action2"]');
    if (!state.automated) {
      a2.innerHTML = `<button class="cell-btn btn-automate" onclick="automateSource(${i})" ${gameState.cash >= aCost ? '' : 'disabled'} title="Revenue flows automatically">Auto ${formatMoney(aCost)}</button>`;
    } else {
      const maxUpgrades = maxAffordableUpgrades(state);
      const revGainPerDay = state.employees * src.baseRate * 0.5 / 365.25;
      a2.innerHTML = (maxUpgrades > 1 ? `<button class="cell-btn btn-max" onclick="upgradeMax(${i})" title="Buy all ${maxUpgrades} upgrades you can afford">Max(${maxUpgrades})</button>` : '') +
        `<button class="cell-btn btn-upgrade" onclick="upgradeSource(${i})" ${gameState.cash >= uCost ? '' : 'disabled'} title="+50% efficiency per employee — adds ${formatPerTick(revGainPerDay)}/day">⬆ ${formatMoney(uCost)} (+${formatPerTick(revGainPerDay)}/d)</button>`;
    }

    // Action 3: Collect (click) or AUTO badge + Restructure
    const a3 = row.querySelector('[data-field="action3"]');
    if (!state.automated) {
      const pending = state.pendingCollect;
      const clickVal = src.clickValue;
      const hasPending = pending > 0.005;
      a3.innerHTML = `<button class="cell-btn btn-collect" onclick="collectSource(${i})" title="Click to collect pending revenue">Collect${hasPending ? ' ' + formatMoney(pending) : ''} (+${formatMoney(clickVal)})</button>`;
    } else if (gameState.isPublic) {
      const pCost = prestigeCost(state);
      const canPrestige = gameState.retainedEarnings >= pCost;
      a3.innerHTML = `<span class="auto-badge">⚡</span> <button class="cell-btn btn-prestige" onclick="restructureSource(${i})" ${canPrestige ? '' : 'disabled'} title="10× revenue for this dept (${pCost.toLocaleString()} RE)">★ ${pCost.toLocaleString()} RE</button>`;
    } else {
      a3.innerHTML = '<span class="auto-badge">⚡ AUTO</span>';
    }
  }
}

function isNextUnlock(index) {
  for (let i = 0; i < SOURCE_STATS.length; i++) {
    if (!gameState.sources[i].unlocked) return i === index;
  }
  return false;
}

function updateDisplay() {
  if (!gameState.arc) return;
  const cashEl = document.getElementById('cash-display');
  cashEl.textContent = formatMoney(gameState.cash);

  const totalRev = totalAnnualRev();
  const perTick = totalRevPerTick();
  document.getElementById('total-rev').textContent = formatRate(totalRev);

  // Per-tick display (= per day, prominent) — color-coded for active effects
  const ptEl = document.getElementById('per-tick-display');
  const hasOutage = gameState.powerOutage && Date.now() < gameState.powerOutage.until;
  const hasPenalty = gameState.revPenalty && Date.now() < gameState.revPenalty.until;
  const hasBonus = gameState.revBonus && Date.now() < gameState.revBonus.until;
  const hasDbOut = gameState.dbOutage && Date.now() < gameState.dbOutage.until;

  if (hasOutage) {
    ptEl.innerHTML = `<span style="color:${dm('#c00')};font-weight:700">⚡ $0.00/day</span>`;
  } else if (hasPenalty) {
    const pct = Math.round((1 - gameState.revPenalty.mult) * 100);
    ptEl.innerHTML = `<span style="color:${dm('#c00')}">${formatPerTick(perTick)}/day</span> <span style="color:${dm('#c00')};font-size:9px">▼${pct}%</span>`;
  } else if (hasDbOut) {
    ptEl.innerHTML = `<span style="color:${dm('#e65100')}">${formatPerTick(perTick)}/day</span> <span style="color:${dm('#e65100')};font-size:9px">💾</span>`;
  } else if (hasBonus) {
    ptEl.innerHTML = `<span style="color:${dm('#217346')};font-weight:600">${formatPerTick(perTick)}/day</span> <span style="color:${dm('#217346')};font-size:9px">▲×${gameState.revBonus.mult}</span>`;
  } else {
    ptEl.textContent = formatPerTick(perTick) + '/day';
  }

  // Stock price in header (Phase 2.1)
  const stockCell = document.getElementById('stock-price-cell');
  if (stockCell) {
    if (gameState.isPublic) {
      const sp = getStockPrice();
      stockCell.innerHTML = `<span style="font-size:9px;color:${dm('#888')}">Stock: </span><span style="font-weight:700;color:${dm('#0078d4')};font-family:Consolas,monospace;font-size:12px">${formatMoney(sp)}</span>`;
    } else {
      stockCell.innerHTML = '';
    }
  }

  // Revenue breakdown stats
  document.getElementById('stat-sec').textContent = formatStatMoney(totalRev / SECS_PER_YEAR) + '/sec';
  document.getElementById('stat-min').textContent = formatStatMoney(totalRev / SECS_PER_YEAR * 60) + '/min';
  document.getElementById('stat-hr').textContent = formatStatMoney(totalRev / SECS_PER_YEAR * 3600) + '/hr';
  document.getElementById('stat-day').textContent = formatStatMoney(perTick) + '/day';

  document.getElementById('status-timescale').textContent = TIME_LABEL;

  // In-game date
  const gameDate = new Date(gameState.gameStartDate + gameState.gameElapsedSecs * 1000);
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const totalDays = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  const years = Math.floor(totalDays / 365);
  const days = totalDays % 365;
  const ageStr = years > 0 ? `Yr ${years + 1}, Day ${days + 1}` : `Day ${totalDays + 1}`;
  document.getElementById('game-date').textContent = monthNames[gameDate.getUTCMonth()] + ' ' + gameDate.getUTCDate() + ', ' + gameDate.getUTCFullYear() + `  (${ageStr})`;

  // Play time
  const t = gameState.totalPlayTime;
  const hrs = Math.floor(t / 3600);
  const mins = Math.floor((t % 3600) / 60);
  const secs = t % 60;
  const timeStr = hrs > 0
    ? `⏱ ${hrs}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    : `⏱ ${mins}:${String(secs).padStart(2,'0')}`;
  document.getElementById('status-time').textContent = timeStr;
  document.getElementById('status-clicks').textContent = '🖱 ' + gameState.totalClicks;

  // Phase 2.1: Stock ticker in status bar
  const stockTicker = document.getElementById('stock-ticker');
  if (stockTicker) {
    if (gameState.isPublic) {
      const price = getStockPrice();
      stockTicker.textContent = `📈 ${formatMoney(price)}`;
      stockTicker.classList.remove('hidden');
    } else {
      stockTicker.classList.add('hidden');
    }
  }

  const activeCount = gameState.sources.filter(s => s.unlocked).length;
  const lastRow = activeCount + 3;
  // Only show default formula if no cell is manually selected
  if (!document.querySelector('.cell.selected-cell')) {
    document.getElementById('formula-input').textContent = `=SUM(C4:C${lastRow})`;
    document.getElementById('cell-ref').textContent = 'C2';
  } else {
    // Refresh selected cell content (values change each tick)
    const sel = document.querySelector('.cell.selected-cell');
    document.getElementById('formula-input').textContent = sel.textContent.trim() || '';
  }

  if (gameState.powerOutage && Date.now() < gameState.powerOutage.until) {
    const secsLeft = Math.ceil((gameState.powerOutage.until - Date.now()) / 1000);
    document.getElementById('status-text').textContent = `⚡ SYSTEMS OFFLINE — back in ${secsLeft}s`;
  } else if (gameState.powerOutage) {
    gameState.powerOutage = null;
  gameState.dbOutage = null;
  gameState.miniTaskBlocked = null;
    document.getElementById('status-text').textContent = '✅ Systems restored';
    setTimeout(() => {
      if (document.getElementById('status-text').textContent === '✅ Systems restored') {
        document.getElementById('status-text').textContent = 'Ready';
      }
    }, 3000);
  } else if (gameState.dbOutage && Date.now() < gameState.dbOutage.until) {
    const secsLeft = Math.ceil((gameState.dbOutage.until - Date.now()) / 1000);
    const arc = ARCS[gameState.arc];
    const name = arc ? arc.sources[gameState.dbOutage.sourceIndex].name || 'Department' : 'Department';
    document.getElementById('status-text').textContent = `💾 ${name} offline — DB recovering ${secsLeft}s`;
  } else if (gameState.dbOutage) {
    gameState.dbOutage = null;
    document.getElementById('status-text').textContent = '✅ Database restored';
    setTimeout(() => {
      if (document.getElementById('status-text').textContent === '✅ Database restored') {
        document.getElementById('status-text').textContent = 'Ready';
      }
    }, 3000);
  } else if (gameState.revPenalty && Date.now() < gameState.revPenalty.until) {
    const secsLeft = Math.ceil((gameState.revPenalty.until - Date.now()) / 1000);
    const hireFroze = gameState.hireFrozen && Date.now() < gameState.hireFrozen;
    const hireMsg = hireFroze ? ' | Hiring frozen' : '';
    document.getElementById('status-text').textContent = `⚠ Revenue penalty — ${secsLeft}s remaining${hireMsg}`;
  } else if (gameState.revPenalty) {
    gameState.revPenalty = null;
    document.getElementById('status-text').textContent = 'Ready';
  } else if (gameState.revBonus && Date.now() < gameState.revBonus.until) {
    const secsLeft = Math.ceil((gameState.revBonus.until - Date.now()) / 1000);
    document.getElementById('status-text').textContent = `🔥 Revenue ×${gameState.revBonus.mult} — ${secsLeft}s remaining`;
  } else if (gameState.revBonus) {
    gameState.revBonus = null;
    document.getElementById('status-text').textContent = 'Ready';
  } else if (gameState.hireFrozen && Date.now() < gameState.hireFrozen) {
    const secsLeft = Math.ceil((gameState.hireFrozen - Date.now()) / 1000);
    document.getElementById('status-text').textContent = `🚫 Hiring frozen — ${secsLeft}s remaining`;
  } else if (gameState.miniTaskBlocked && Date.now() < gameState.miniTaskBlocked.until) {
    const secsLeft = Math.ceil((gameState.miniTaskBlocked.until - Date.now()) / 1000);
    document.getElementById('status-text').textContent = `📧 Email down — no approvals for ${secsLeft}s`;
  } else {
    if (gameState.hireFrozen) gameState.hireFrozen = null;
    if (gameState.miniTaskBlocked) gameState.miniTaskBlocked = null;
  }
  // Don't overwrite mini-task feedback messages

  // Update P&L section
  updateTaxPanel();

  // Update overtime row
  updateOvertimeRow();

  // Update Board Room tab visibility and content
  updateBoardRoomTab();
  if (gameState.activeTab === 'boardroom') {
    buildBoardRoom();
  }
}

// ===== GAME ACTIONS =====
function unlockSource(index) {
  const src = getSourceDef(index);
  const state = gameState.sources[index];
  if (state.unlocked || gameState.cash < src.unlockCost) return;
  if (!isNextUnlock(index)) return;

  gameState.cash -= src.unlockCost;
  addCapitalExpense(src.unlockCost);
  state.unlocked = true;
  state.employees = 1;
  buildGrid();
  updateDisplay();
  flashCash();
}

function hireEmployee(index) {
  const state = gameState.sources[index];
  if (!state.unlocked) return;
  if (gameState.hireFrozen && Date.now() < gameState.hireFrozen) return;
  const cost = hireCost(state);
  if (gameState.cash < cost) return;

  gameState.cash -= cost;
  state.employees++;
  addCapitalExpense(cost);
  gameState.totalSpentHires += cost;
  updateGridValues();
  updateDisplay();
  flashCash();
}

function hireMax(index) {
  const state = gameState.sources[index];
  if (!state.unlocked) return;
  if (gameState.hireFrozen && Date.now() < gameState.hireFrozen) return;
  let hired = 0;
  let totalCost = 0;
  while (true) {
    const cost = hireCost(state);
    if (gameState.cash < cost) break;
    gameState.cash -= cost;
    state.employees++;
    totalCost += cost;
    hired++;
    if (hired > 1000) break; // safety
  }
  if (hired > 0) {
    addCapitalExpense(totalCost);
    gameState.totalSpentHires += totalCost;
    updateGridValues();
    updateDisplay();
    flashCash();
  }
}

function upgradeMax(index) {
  const state = gameState.sources[index];
  if (!state.unlocked) return;
  let upgraded = 0;
  let totalCost = 0;
  while (upgraded < 100) {
    const cost = upgradeCost(state);
    if (gameState.cash < cost) break;
    gameState.cash -= cost;
    state.upgradeLevel++;
    totalCost += cost;
    upgraded++;
  }
  if (upgraded > 0) {
    addCapitalExpense(totalCost);
    gameState.totalSpentUpgrades += totalCost;
    updateGridValues();
    updateDisplay();
    flashCash();
  }
}

function upgradeSource(index) {
  const state = gameState.sources[index];
  if (!state.unlocked) return;
  const cost = upgradeCost(state);
  if (gameState.cash < cost) return;

  gameState.cash -= cost;
  state.upgradeLevel++;
  addCapitalExpense(cost);
  gameState.totalSpentUpgrades += cost;
  updateGridValues();
  updateDisplay();
  flashCash();
}

function automateSource(index) {
  const state = gameState.sources[index];
  if (!state.unlocked || state.automated) return;
  const cost = automateCost(state);
  if (gameState.cash < cost) return;

  gameState.cash -= cost;
  state.automated = true;
  addCapitalExpense(cost);
  gameState.totalSpentAuto += cost;
  gameState.cash += state.pendingCollect;
  gameState.totalEarned += state.pendingCollect;
  gameState.quarterRevenue += state.pendingCollect;
  trackEarningsRevenue(state.pendingCollect);
  state.pendingCollect = 0;
  updateGridValues();
  updateDisplay();
  flashCash();

  // Focus tip — show once per game after first automate
  if (isFeatureEnabled('managementFocus') && !gameState.focusTipShown) {
    gameState.focusTipShown = true;
    setTimeout(() => {
      document.getElementById('status-text').textContent = '💡 Tip: Click department names to boost their revenue';
      setTimeout(() => {
        const st = document.getElementById('status-text');
        if (st && st.textContent.startsWith('💡')) st.textContent = 'Ready';
      }, 5000);
    }, 2000);
  }
}

function collectSource(index) {
  const state = gameState.sources[index];
  if (!state.unlocked || state.automated) return;

  // Click value = flat bonus per click + any pending passive
  const src = getSourceDef(index);
  const clickEarnings = src.clickValue + state.pendingCollect;
  gameState.cash += clickEarnings;
  gameState.totalEarned += clickEarnings;
  gameState.quarterRevenue += clickEarnings;
  trackEarningsRevenue(clickEarnings);
  gameState.totalClicks++;
  state.pendingCollect = 0;

  const row = document.getElementById(`source-row-${index}`);
  if (row) {
    row.classList.add('collect-flash');
    setTimeout(() => row.classList.remove('collect-flash'), 300);
  }

  updateGridValues();
  updateDisplay();
  flashCash();
}

// ===== DEPRECIATION =====
const DEPRECIATION_QUARTERS = 4;

function addCapitalExpense(amount) {
  if (!gameState.capitalExpenses) gameState.capitalExpenses = [];
  gameState.capitalExpenses.push({
    amount: amount,
    perQuarter: Math.max(1, Math.floor(amount / DEPRECIATION_QUARTERS)),
    quartersLeft: DEPRECIATION_QUARTERS,
  });
  gameState.quarterExpenses += amount; // track for P&L display
}

function getQuarterlyDepreciation() {
  if (!gameState.capitalExpenses) return 0;
  let total = 0;
  for (const cap of gameState.capitalExpenses) {
    if (cap.quartersLeft > 0) {
      total += cap.perQuarter;
    }
  }
  return total;
}

function tickDepreciation() {
  if (!gameState.capitalExpenses) return;
  gameState.capitalExpenses = gameState.capitalExpenses.filter(cap => {
    cap.quartersLeft--;
    return cap.quartersLeft > 0;
  });
}

function flashCash() {
  const el = document.getElementById('cash-display');
  el.classList.remove('cash-bump');
  void el.offsetWidth;
  el.classList.add('cash-bump');
}

// ===== GAME LOOP (1 second ticks) =====
// ===== TAX DEBT SYSTEM =====

function processQuarterlyTax() {
  const hasCPA = hasBoardRoomUpgrade('cpa');
  const depreciation = getQuarterlyDepreciation();
  const taxableIncome = gameState.quarterRevenue - depreciation;
  const taxRate = getBoardRoomTaxRate();
  const regularTax = Math.max(0, Math.floor(taxableIncome * taxRate));

  // AMT: minimum 15% of gross revenue (can't deduct your way to zero)
  const amtRate = getBoardRoomAMTRate();
  const amtTax = Math.floor(gameState.quarterRevenue * amtRate);
  const isAMT = amtTax > regularTax;
  const taxOwed = Math.max(regularTax, amtTax);

  // Snapshot for display
  const qRev = gameState.quarterRevenue;
  const qDep = depreciation;

  // Tick depreciation (reduce remaining quarters on all assets)
  tickDepreciation();

  // CTO Budget: calculate next quarter's budget from ending quarter's revenue
  if (getTechDeptLevel() > 0) {
    // CapEx Planning: CFO auto-sets budget percentage
    if (gameState.ctoBudgetAuto) {
      const cfoLevel = getFinanceDeptLevel();
      if (cfoLevel === 1) {
        gameState.ctoBudgetPct = 15;
      } else if (cfoLevel >= 2) {
        // Base on current guidance
        const guidance = gameState.currentGuidance;
        if (guidance === 'conservative') gameState.ctoBudgetPct = 20;
        else if (guidance === 'ambitious' || guidance === 'aggressive') gameState.ctoBudgetPct = 10;
        else gameState.ctoBudgetPct = 15; // in-line or null
        if (cfoLevel >= 3) {
          // Tax debt → halve budget
          if (gameState.taxDebts && gameState.taxDebts.length > 0) {
            gameState.ctoBudgetPct = Math.max(5, Math.floor(gameState.ctoBudgetPct / 2));
          }
          // High streak → reduce by 5% (analyst ratchet protection)
          if (gameState.earningsStreak >= 5) {
            gameState.ctoBudgetPct = Math.max(5, gameState.ctoBudgetPct - 5);
          }
        }
      }
    }
    gameState.ctoSpentThisQuarter = 0;
    // Pool carries over — unspent CTO budget rolls to next quarter
    gameState.cooSpentThisQuarter = 0;
    // COO pool also carries over
  }

  // Reset quarterly tracking
  gameState.quarterRevenue = 0;
  gameState.quarterExpenses = 0;
  gameState.quarterTaxPaid = 0;

  const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  const quarter = Math.floor(currentDay / 90);
  const qLabel = `Q${(quarter % 4) + 1}`;

  // CPA auto-pay: handle taxes silently
  if (hasCPA) {
    if (taxOwed <= 0) {
      // No tax — CPA files a zero return silently
      return;
    }
    if (gameState.cash >= taxOwed) {
      // Can afford — auto-pay
      gameState.cash -= taxOwed;
      gameState.quarterTaxPaid += taxOwed;
      gameState.totalTaxPaid += taxOwed;
      document.getElementById('status-text').textContent = `📋 CPA paid ${qLabel} taxes (${formatMoney(taxOwed)})`;
      setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 4000);
      updateDisplay();
      flashCash();
      return;
    } else {
      // Can't afford — CPA defers (creates debt like Ignore, but silently)
      if (!gameState.taxDebts) gameState.taxDebts = [];
      gameState.taxDebts.push({
        original: taxOwed,
        current: taxOwed,
        dayCreated: currentDay,
        daysOverdue: 0,
        stage: 'notice1',
        quarter: qLabel,
      });
      document.getElementById('status-text').textContent = `📋 CPA deferred ${qLabel} taxes — insufficient funds`;
      setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 4000);
      updateTaxPanel();
      return;
    }
  }

  if (taxOwed <= 0) {
    showEventToast('IRS', `${qLabel} Quarterly Tax Assessment`,
      `<div class="irs-report">
        <div class="er-row"><span class="er-label">Revenue</span><span class="er-value">${formatMoney(qRev)}</span></div>
        <div class="er-row"><span class="er-label">Depreciation</span><span class="er-value">(${formatMoney(qDep)})</span></div>
        <div class="er-row"><span class="er-label">Taxable Income</span><span class="er-value">${formatMoney(Math.max(0, taxableIncome))}</span></div>
        <div class="er-divider"></div>
        <div class="er-row"><span class="er-label">Tax Owed</span><span class="er-value" style="color:${dm('#217346')}">$0 ✓</span></div>
      </div>`,
      [{ label: 'OK', effect: () => `No tax liability for ${qLabel}. Keep investing!` }],
      { html: true });
    return;
  }

  const amtNote = isAMT ? `<div class="er-row" style="color:${dm('#c7254e')}"><span class="er-label">⚠️ AMT</span><span class="er-value">${Math.round(amtRate*100)}% of revenue &gt; regular tax</span></div>` : '';
  showEventToast('IRS', `${qLabel} Quarterly Tax Assessment`,
    `<div class="irs-report">
      <div class="er-row"><span class="er-label">Revenue</span><span class="er-value">${formatMoney(qRev)}</span></div>
      <div class="er-row"><span class="er-label">Depreciation</span><span class="er-value">(${formatMoney(qDep)})</span></div>
      <div class="er-row"><span class="er-label">Taxable Income</span><span class="er-value">${formatMoney(taxableIncome)}</span></div>
      <div class="er-divider"></div>
      <div class="er-row"><span class="er-label">Tax Rate</span><span class="er-value">${isAMT ? 'AMT ' + Math.round(amtRate*100) + '%' : Math.round(taxRate*100) + '%'}</span></div>
      <div class="er-row er-result"><span class="er-label">Tax Owed</span><span class="er-value" style="color:${dm('#c7254e')};font-weight:700">${formatMoney(taxOwed)}</span></div>
      ${amtNote}
    </div>`,
    [
      { label: `Pay ${formatMoney(taxOwed)}`,
        disabledLabel: 'Not enough cash',
        cashRequired: taxOwed,
        effect: (gs) => {
          gs.cash -= taxOwed;
          gs.quarterTaxPaid += taxOwed;
          gs.totalTaxPaid += taxOwed;
          return `Paid ${formatMoney(taxOwed)} in ${qLabel} taxes. Good standing with the IRS.`;
      }},
      { label: 'Ignore', effect: (gs) => {
        if (!gs.taxDebts) gs.taxDebts = [];
        gs.taxDebts.push({
          original: taxOwed,
          current: taxOwed,
          dayCreated: currentDay,
          daysOverdue: 0,
          stage: 'notice1',
          quarter: qLabel,
        });
        updateTaxPanel();
        return `You ignored the ${qLabel} tax bill. ${formatMoney(taxOwed)} added to tax liability. Interest is accruing...`;
      }},
    ], { closable: false, html: true });
}

function processTaxDebts() {
  if (!gameState.taxDebts || gameState.taxDebts.length === 0) return;

  // CPA auto-settle: try to pay off debts before they escalate
  if (hasBoardRoomUpgrade('cpa')) {
    for (let i = gameState.taxDebts.length - 1; i >= 0; i--) {
      const debt = gameState.taxDebts[i];
      if (debt.settled) continue;
      if (gameState.cash >= debt.current) {
        gameState.cash -= debt.current;
        gameState.quarterTaxPaid += debt.current;
        gameState.totalTaxPaid += debt.current;
        document.getElementById('status-text').textContent = `📋 CPA settled ${debt.quarter} tax debt (${formatMoney(debt.current)})`;
        setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 4000);
        gameState.taxDebts.splice(i, 1);
        _lastTaxPanelHash = '';
        updateTaxPanel();
        updateDisplay();
        flashCash();
      }
    }
    if (gameState.taxDebts.length === 0) return;
  }

  let needsUpdate = false;
  for (const debt of gameState.taxDebts) {
    // Accrue 1% daily interest
    debt.current = Math.floor(debt.current * 1.01);
    debt.daysOverdue++;

    // Escalation stages
    const oldStage = debt.stage;
    if (debt.daysOverdue >= 180 && debt.stage !== 'seizure') {
      debt.stage = 'seizure';
    } else if (debt.daysOverdue >= 90 && debt.stage === 'notice2') {
      debt.stage = 'garnish';
    } else if (debt.daysOverdue >= 30 && debt.stage === 'notice1') {
      debt.stage = 'notice2';
    }

    if (debt.stage !== oldStage) needsUpdate = true;

    // Seizure: IRS just takes it (unless Golden Parachute)
    if (debt.stage === 'seizure') {
      if (hasBoardRoomUpgrade('golden_parachute')) {
        // Consume one Golden Parachute
        gameState.boardRoomPurchases['golden_parachute']--;
        if (gameState.boardRoomPurchases['golden_parachute'] <= 0) {
          delete gameState.boardRoomPurchases['golden_parachute'];
        }
        showEventToast('Legal Department', '🪂 Golden Parachute Activated',
          `Your Golden Parachute protected you from an IRS Asset Seizure! The tax debt of ${formatMoney(debt.current)} has been settled by your legal team. One Golden Parachute consumed.`,
          [{ label: 'Thank the lawyers', effect: () => '🪂 Golden Parachute saved you from asset seizure!' }]);
        debt.settled = true;
        needsUpdate = true;
      } else {
        const penalty = Math.floor(debt.current * 1.25); // 25% penalty on top
        const seized = Math.min(penalty, gameState.cash);
        gameState.cash -= seized;
        gameState.quarterTaxPaid += seized;
        gameState.totalTaxPaid += seized;
        showEventToast('IRS', 'Asset Seizure Notice',
          `The IRS has seized ${formatMoney(penalty)} from your accounts. Tax debt of ${formatMoney(debt.current)} plus 25% penalty. This was avoidable.`,
          [{ label: 'OK', effect: () => 'Assets seized. Consider paying next time.' }]);
        debt.settled = true;
        needsUpdate = true;
      }
    }

    // Stage change notifications
    if (debt.stage === 'notice2' && oldStage === 'notice1') {
      const debtRef = debt; // capture reference for closure
      showEventToast('IRS', '2nd Notice — Unpaid Tax Assessment',
        `This is your second notice. Original: ${formatMoney(debt.original)}, now owed: ${formatMoney(debt.current)}. Continued non-payment will result in revenue garnishment.`,
        [{ label: 'Pay now',
           disabledLabel: 'Not enough cash',
           cashRequired: debt.current,
           effect: (gs) => { const idx = gs.taxDebts.indexOf(debtRef); if (idx >= 0) settleTaxDebt(idx); return 'Debt settled.'; }},
         { label: 'Ignore', effect: () => 'The IRS does not forget.' }],
        { closable: false });
    } else if (debt.stage === 'garnish' && oldStage === 'notice2') {
      const debtRef = debt; // capture reference for closure
      showEventToast('IRS', '⚠ Revenue Garnishment Order',
        `The IRS is now garnishing 15% of your revenue until tax debt of ${formatMoney(debt.current)} is paid. Settle immediately to restore full income.`,
        [{ label: 'Pay now',
           disabledLabel: 'Not enough cash',
           cashRequired: debt.current,
           effect: (gs) => { const idx = gs.taxDebts.indexOf(debtRef); if (idx >= 0) settleTaxDebt(idx); return 'Debt settled. Garnishment lifted.'; }},
         { label: 'Ignore', effect: () => 'Asset seizure in 90 days.' }],
        { closable: false });
    }
  }

  // Remove settled debts
  gameState.taxDebts = gameState.taxDebts.filter(d => !d.settled);

  if (needsUpdate || gameState.taxDebts.length > 0) updateTaxPanel();
}

function settleTaxDebt(index) {
  if (!gameState.taxDebts || index < 0 || index >= gameState.taxDebts.length) return;
  const debt = gameState.taxDebts[index];
  if (gameState.cash < debt.current) {
    // Flash the settle button red with inline feedback
    const btn = document.querySelector(`[data-settle="${index}"]`);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = `Need ${formatMoney(debt.current)}`;
      btn.classList.add('settle-flash');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('settle-flash'); }, 2000);
    }
    document.getElementById('status-text').textContent = `❌ Need ${formatMoney(debt.current)} to settle — you have ${formatMoney(gameState.cash)}`;
    return;
  }
  gameState.cash -= debt.current;
  gameState.quarterTaxPaid += debt.current;
  gameState.totalTaxPaid += debt.current;
  gameState.taxDebts.splice(index, 1);
  _lastTaxPanelHash = ''; // force rebuild
  updateTaxPanel();
  updateDisplay();
  flashCash();
}

function settleAllTax() {
  if (!gameState.taxDebts || gameState.taxDebts.length === 0) return;
  const total = gameState.taxDebts.reduce((sum, d) => sum + d.current, 0);
  if (gameState.cash < total) {
    const btn = document.querySelector('[data-settle-all]');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = `Need ${formatMoney(total)}`;
      btn.classList.add('settle-flash');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('settle-flash'); }, 2000);
    }
    document.getElementById('status-text').textContent = `❌ Need ${formatMoney(total)} to settle all — you have ${formatMoney(gameState.cash)}`;
    return;
  }
  gameState.cash -= total;
  gameState.quarterTaxPaid += total;
  gameState.totalTaxPaid += total;
  gameState.taxDebts = [];
  _lastTaxPanelHash = ''; // force rebuild
  updateTaxPanel();
  updateDisplay();
  flashCash();
}

function totalTaxOwed() {
  if (!gameState.taxDebts) return 0;
  return gameState.taxDebts.reduce((sum, d) => sum + d.current, 0);
}

let _lastTaxPanelHash = '';

function updateTaxPanel() {
  const panel = document.getElementById('tax-panel');
  const hasTaxDebts = gameState.taxDebts && gameState.taxDebts.length > 0;
  const hasActivity = gameState.totalEarned > 0;

  if (!hasActivity && !hasTaxDebts) {
    if (_lastTaxPanelHash !== 'empty') {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      buildFillerRows();
      _lastTaxPanelHash = 'empty';
    }
    return;
  }
  panel.classList.remove('hidden');

  const sourceCount = SOURCE_STATS.length;
  let rowNum = sourceCount + 3;
  let html = '';

  // ===== P&L SECTION (collapsible) =====
  const pnlCollapsed = gameState.pnlCollapsed || false;
  const pnlArrow = pnlCollapsed ? '▶' : '▼';

  const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  const daysIntoQuarter = currentDay - gameState.lastQuarterDay;
  const daysToTax = Math.max(0, 90 - daysIntoQuarter);
  const garnishActive = gameState.taxDebts && gameState.taxDebts.some(d => d.stage === 'garnish');

  // Separator
  html += `<div class="grid-row sep-row">
    <div class="row-num">${rowNum++}</div>
    <div class="cell cell-a sep-cell"></div><div class="cell cell-b sep-cell"></div>
    <div class="cell cell-c sep-cell"></div><div class="cell cell-d sep-cell"></div>
    <div class="cell cell-e sep-cell"></div><div class="cell cell-f sep-cell"></div>
    <div class="cell cell-g sep-cell"></div><div class="cell cell-h sep-cell"></div>
  </div>`;

  // P&L Header (clickable to collapse)
  html += `<div class="grid-row pnl-header">
    <div class="row-num">${rowNum++}</div>
    <div class="cell cell-a" style="font-weight:700;color:${dm('#333')};cursor:pointer" data-toggle-pnl>${pnlArrow} PROFIT &amp; LOSS</div>
    <div class="cell cell-b"></div>
    <div class="cell cell-c" style="font-size:10px;color:${dm('#888')};justify-content:flex-end">${pnlCollapsed ? '' : 'This Qtr'}</div>
    <div class="cell cell-d" style="font-size:10px;color:${dm('#888')};justify-content:flex-end">${pnlCollapsed ? '' : 'Lifetime'}</div>
    <div class="cell cell-e"></div>
    <div class="cell cell-f" style="font-size:10px;color:${dm('#888')}">${pnlCollapsed ? '' : `Tax due in ${daysToTax}d`}</div>
    <div class="cell cell-g"></div>
    <div class="cell cell-h"></div>
  </div>`;

  if (!pnlCollapsed) {
    const totalExpenses = gameState.totalSpentHires + gameState.totalSpentUpgrades + gameState.totalSpentAuto;
    const qDepreciation = getQuarterlyDepreciation();

    // Revenue
    html += `<div class="grid-row pnl-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Revenue</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c" style="color:${dm('#217346')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">${formatMoney(gameState.quarterRevenue)}</div>
      <div class="cell cell-d" style="color:${dm('#217346')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">${formatMoney(gameState.totalEarned)}</div>
      <div class="cell cell-e"></div><div class="cell cell-f"></div>
      <div class="cell cell-g"></div><div class="cell cell-h"></div>
    </div>`;

    // Garnishment (if active)
    if (garnishActive) {
      html += `<div class="grid-row pnl-row">
        <div class="row-num">${rowNum++}</div>
        <div class="cell cell-a" style="padding-left:16px;color:${dm('#c00')}">🔴 IRS Garnishment</div>
        <div class="cell cell-b"></div>
        <div class="cell cell-c" style="color:${dm('#c00')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">−15%</div>
        <div class="cell cell-d"></div>
        <div class="cell cell-e"></div><div class="cell cell-f" style="font-size:9px;color:${dm('#c00')}">settle debt to remove</div>
        <div class="cell cell-g"></div><div class="cell cell-h"></div>
      </div>`;
    }

    // Capital Spending
    html += `<div class="grid-row pnl-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Capital Spending</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c" style="color:${dm('#c00')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">(${formatMoney(gameState.quarterExpenses)})</div>
      <div class="cell cell-d" style="color:${dm('#c00')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">(${formatMoney(totalExpenses)})</div>
      <div class="cell cell-e"></div><div class="cell cell-f" style="font-size:9px;color:${dm('#999')}">not tax-deductible</div>
      <div class="cell cell-g"></div><div class="cell cell-h"></div>
    </div>`;

    // Depreciation
    const capCount = gameState.capitalExpenses ? gameState.capitalExpenses.length : 0;
    html += `<div class="grid-row pnl-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Depreciation</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c" style="color:${dm('#c00')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">(${formatMoney(qDepreciation)})</div>
      <div class="cell cell-d"></div>
      <div class="cell cell-e"></div><div class="cell cell-f" style="font-size:9px;color:${dm('#999')}">${capCount} assets depreciating</div>
      <div class="cell cell-g"></div><div class="cell cell-h"></div>
    </div>`;

    // Taxes paid
    html += `<div class="grid-row pnl-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Taxes Paid</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c" style="color:${dm('#c00')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">(${formatMoney(gameState.quarterTaxPaid)})</div>
      <div class="cell cell-d" style="color:${dm('#c00')};font-family:Consolas,monospace;font-size:11px;justify-content:flex-end">(${formatMoney(gameState.totalTaxPaid)})</div>
      <div class="cell cell-e"></div><div class="cell cell-f"></div>
      <div class="cell cell-g"></div><div class="cell cell-h"></div>
    </div>`;

    // Taxable Income
    const qTaxable = Math.max(0, gameState.quarterRevenue - qDepreciation);
    const currentTaxRate = getBoardRoomTaxRate();
    const currentAMTRate = getBoardRoomAMTRate();
    const qRegularTax = Math.floor(qTaxable * currentTaxRate);
    const qAMT = Math.floor(gameState.quarterRevenue * currentAMTRate);
    const amtApplies = qAMT > qRegularTax && gameState.quarterRevenue > 0;
    const effectiveTaxable = amtApplies ? gameState.quarterRevenue : qTaxable;
    const taxRatePct = Math.round(currentTaxRate * 100);
    const amtRatePct = Math.round(currentAMTRate * 100);
    const taxableLabel = amtApplies ? 'AMT Taxable Income' : 'Taxable Income';
    const taxableNote = amtApplies ? `⚠️ AMT floor (${amtRatePct}% of revenue)` : 'rev − depreciation';
    html += `<div class="grid-row pnl-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm(amtApplies ? '#c60' : '#888')};font-size:10px">${taxableLabel}</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c" style="color:${dm(amtApplies ? '#c60' : '#888')};font-family:Consolas,monospace;font-size:10px;justify-content:flex-end">${formatMoney(effectiveTaxable)}</div>
      <div class="cell cell-d"></div>
      <div class="cell cell-e"></div><div class="cell cell-f" style="font-size:9px;color:${dm(amtApplies ? '#c60' : '#999')}">${taxableNote}</div>
      <div class="cell cell-g"></div><div class="cell cell-h"></div>
    </div>`;

    // Net Income
    const qNet = gameState.quarterRevenue - gameState.quarterExpenses - gameState.quarterTaxPaid;
    const ltNet = gameState.totalEarned - totalExpenses - gameState.totalTaxPaid;
    const qColor = dm(qNet >= 0 ? '#217346' : '#c00');
    const ltColor = dm(ltNet >= 0 ? '#217346' : '#c00');

    html += `<div class="grid-row pnl-net">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:700;color:${dm('#333')};padding-left:16px">Net Income</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c" style="color:${qColor};font-family:Consolas,monospace;font-size:11px;font-weight:700;justify-content:flex-end;border-top:1px solid ${dm('#333')};border-bottom:3px double ${dm('#333')}">${qNet < 0 ? '(' + formatMoney(-qNet) + ')' : formatMoney(qNet)}</div>
      <div class="cell cell-d" style="color:${ltColor};font-family:Consolas,monospace;font-size:11px;font-weight:700;justify-content:flex-end;border-top:1px solid ${dm('#333')};border-bottom:3px double ${dm('#333')}">${ltNet < 0 ? '(' + formatMoney(-ltNet) + ')' : formatMoney(ltNet)}</div>
      <div class="cell cell-e"></div><div class="cell cell-f"></div>
      <div class="cell cell-g"></div><div class="cell cell-h"></div>
    </div>`;
  }

  // ===== INVESTOR RELATIONS SECTION (Phase 2.1) =====
  if (gameState.isPublic) {
    const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
    const earningsDaysSince = currentDay - gameState.lastEarningsDay;
    const earningsDaysLeft = Math.max(0, EARNINGS_QUARTER_DAYS - earningsDaysSince);
    const earningsQLabel = getEarningsQuarterLabel();
    const stockPrice = getStockPrice();
    const stockPriceStart = gameState.ipoStockPriceStart || stockPrice;
    const qtdChange = stockPriceStart > 0 ? ((stockPrice - stockPriceStart) / stockPriceStart * 100) : 0;
    const qtdColor = dm(qtdChange >= 0 ? '#217346' : '#c00');
    const qtdStr = (qtdChange >= 0 ? '+' : '') + qtdChange.toFixed(1) + '%';
    const guidanceKey = gameState.currentGuidance || 'in-line';
    const guidanceLevel = GUIDANCE_LEVELS[guidanceKey];
    const target = gameState.guidanceTarget;
    const qRev = gameState.earningsQuarterRevenue;
    const daysElapsed = earningsDaysSince || 1;
    const expectedAtThisPoint = target > 0 ? (target * daysElapsed / EARNINGS_QUARTER_DAYS) : 0;
    const trackDiff = qRev - expectedAtThisPoint;
    const trackPct = expectedAtThisPoint > 0 ? ((trackDiff / expectedAtThisPoint) * 100) : 0;
    const onTrack = qRev >= expectedAtThisPoint;
    const trackLabel = onTrack ? '✅ On Track' : '⚠️ Off Track';
    const trackColor = dm(onTrack ? '#217346' : '#c00');
    const trackDetail = `${onTrack ? '+' : ''}${formatCompact(trackDiff)} (${trackPct >= 0 ? '+' : ''}${trackPct.toFixed(1)}%)`;
    const streakVal = gameState.earningsStreak;
    const irStreakMult = streakVal >= 1 ? Math.min(2.0, 1 + streakVal * 0.1) : 1;
    const streakStr = streakVal > 0 ? `🔥 ${streakVal} beat${streakVal > 1 ? 's' : ''} (${irStreakMult.toFixed(1)}× RE)` :
                      streakVal < 0 ? `❄️ ${Math.abs(streakVal)} miss${Math.abs(streakVal) > 1 ? 'es' : ''}` : '—';

    // Separator
    html += `<div class="grid-row sep-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a sep-cell"></div><div class="cell cell-b sep-cell"></div>
      <div class="cell cell-c sep-cell"></div><div class="cell cell-d sep-cell"></div>
      <div class="cell cell-e sep-cell"></div><div class="cell cell-f sep-cell"></div>
      <div class="cell cell-g sep-cell"></div><div class="cell cell-h sep-cell"></div>
    </div>`;

    // IR Header
    html += `<div class="grid-row ir-header">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:700;color:${dm('#0078d4')}">INVESTOR RELATIONS</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c"></div>
      <div class="cell cell-d"></div>
      <div class="cell cell-e"></div>
      <div class="cell cell-f" style="font-size:10px;color:${dm('#888')}">Earnings in ${earningsDaysLeft}d</div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

    // Quarter + Days remaining
    html += `<div class="grid-row ir-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Quarter</div>
      <div class="cell cell-b" style="font-weight:600;color:${dm('#0078d4')}">${earningsQLabel}</div>
      <div class="cell cell-c"></div>
      <div class="cell cell-d" style="font-size:10px;color:${dm('#888')}">Days Left</div>
      <div class="cell cell-e" style="font-weight:600;color:${dm('#333')}">${earningsDaysLeft}</div>
      <div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

    // Revenue vs Target
    html += `<div class="grid-row ir-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Revenue vs Target</div>
      <div class="cell cell-b" style="font-weight:700;color:${trackColor}">${trackLabel}</div>
      <div class="cell cell-c" style="font-family:Consolas,monospace;font-size:10px;color:${trackColor}">${trackPct >= 0 ? '+' : ''}${trackPct.toFixed(1)}%</div>
      <div class="cell cell-d" style="font-size:10px;color:${dm('#888')}">${formatCompact(qRev)} / ${formatCompact(target)}</div>
      <div class="cell cell-e"></div>
      <div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

        html += `<div class="grid-row ir-row" id="ir-guidance-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Guidance</div>
      <div class="cell cell-b" style="font-weight:600;color:${dm('#333')}">${guidanceLevel.emoji} ${guidanceLevel.label}</div>
      <div class="cell cell-c" style="font-size:10px;color:${dm('#888')};justify-content:flex-end">${guidanceLevel.reMult}× RE</div>
      <div class="cell cell-d" style="font-size:10px;color:${dm('#888')}">Target: ${formatCompact(gameState.guidanceTarget)}</div>
      <div class="cell cell-e"></div>
      <div class="cell cell-f" style="font-size:10px;color:${dm('#999')}">${gameState.activeCFOLevel > 0 ? 'Set by CFO' : 'Set at earnings'}</div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

    // Streak
    html += `<div class="grid-row ir-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Streak</div>
      <div class="cell cell-b" style="color:${dm('#333')}">${streakStr}</div>
      <div class="cell cell-c"></div>
      <div class="cell cell-d" style="font-size:10px;color:${dm('#888')}">Analyst Exp</div>
      <div class="cell cell-e" style="font-family:Consolas,monospace;font-size:11px;color:${dm('#333')}">${(gameState.analystBaseline).toFixed(2)}×</div>
      <div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

    // Stock Price + QTD change
    html += `<div class="grid-row ir-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Stock Price</div>
      <div class="cell cell-b" style="font-weight:700;color:${dm('#0078d4')};font-family:Consolas,monospace;font-size:12px">${formatMoney(stockPrice)}</div>
      <div class="cell cell-c"></div>
      <div class="cell cell-d" style="font-size:10px;color:${dm('#888')}">QTD</div>
      <div class="cell cell-e" style="font-weight:600;color:${qtdColor};font-family:Consolas,monospace;font-size:11px">${qtdStr}</div>
      <div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

    // Retained Earnings
    const lastQRE = gameState.lastQuarterRE || 0;
    const lastQStr = lastQRE > 0 ? `Last Q: +${lastQRE}` : '';
    // ETA: find cheapest purchasable upgrade, estimate quarters to afford
    let etaStr = '';
    if (lastQRE > 0) {
      const available = BOARD_ROOM_UPGRADES.filter(u => {
        const owned = getBoardRoomUpgradeCount(u.id);
        if (owned >= u.maxCount) return false;
        if (u.requires && !hasBoardRoomUpgrade(u.requires)) return false;
        return true;
      });
      const nextUpgrade = available.sort((a, b) => getUpgradeCost(a) - getUpgradeCost(b))[0];
      if (nextUpgrade) {
        const cost = getUpgradeCost(nextUpgrade);
        const remaining = cost - gameState.retainedEarnings;
        if (remaining > 0) {
          const quartersNeeded = Math.ceil(remaining / lastQRE);
          const etaSecs = quartersNeeded * 90;
          const etaTime = etaSecs >= 3600 ? `${Math.floor(etaSecs/3600)}h${Math.floor((etaSecs%3600)/60)}m`
                        : etaSecs >= 60 ? `${Math.floor(etaSecs/60)}m${etaSecs%60 ? etaSecs%60 + 's' : ''}`
                        : `${etaSecs}s`;
          etaStr = `${nextUpgrade.name} in ~${quartersNeeded}Q (${etaTime})`;
        } else {
          etaStr = `${nextUpgrade.name} — affordable!`;
        }
      }
    }
    html += `<div class="grid-row ir-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">Retained Earnings</div>
      <div class="cell cell-b" style="font-weight:700;color:${dm('#7b1fa2')};font-family:Consolas,monospace;font-size:12px">${gameState.retainedEarnings.toLocaleString()} RE</div>
      <div class="cell cell-c" style="font-size:10px;color:${dm('#7b1fa2')}">${lastQStr}</div>
      <div class="cell cell-d"></div>
      <div class="cell cell-e"></div>
      <div class="cell cell-f" style="font-size:9px;color:${dm('#888')};white-space:nowrap">${etaStr}</div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;
  }

  // ===== C-SUITE SECTION (CFO + CTO selectors) =====
  if (gameState.isPublic && (getFinanceDeptLevel() > 0 || getTechDeptLevel() > 0)) {
    // Separator
    html += `<div class="grid-row sep-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a sep-cell"></div><div class="cell cell-b sep-cell"></div>
      <div class="cell cell-c sep-cell"></div><div class="cell cell-d sep-cell"></div>
      <div class="cell cell-e sep-cell"></div><div class="cell cell-f sep-cell"></div>
      <div class="cell cell-g sep-cell"></div><div class="cell cell-h sep-cell"></div>
    </div>`;

    // C-Suite Header
    html += `<div class="grid-row ir-header">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:700;color:${dm('#555')}">👔 C-SUITE</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c"></div>
      <div class="cell cell-d"></div>
      <div class="cell cell-e"></div>
      <div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;

    // Shared button style
    const csBtnStyle = (active) => active
      ? `cursor:pointer;font-weight:700;color:${dm('#fff')};background:${dm('#0078d4')};padding:1px 6px;border-radius:2px;font-size:11px;margin-right:3px;touch-action:manipulation`
      : `cursor:pointer;color:${dm('#0078d4')};border:1px solid ${dm('#0078d4')};padding:1px 5px;border-radius:2px;font-size:10px;margin-right:3px;background:transparent;touch-action:manipulation`;
    const csLockedStyle = `color:${dm('#aaa')};border:1px solid ${dm('#ddd')};padding:1px 5px;border-radius:2px;font-size:10px;margin-right:3px;background:${dm('#f5f5f5')};cursor:default`;

    // CFO row (if Finance Dept owned)
    const maxCFOLevel = getFinanceDeptLevel();
    if (maxCFOLevel > 0) {
      const activeCFO = gameState.activeCFOLevel;
      let cfoManual = `<span style="${csBtnStyle(activeCFO === 0)}" onclick="setActiveCFOLevel(0)" title="Set earnings guidance yourself each quarter">Manual</span>`;
      const cfoLabels = { 1: '👶 1', 2: '📊 2', 3: '🎩 3' };
      const cfoTooltips = {
        1: 'The Intern — auto-sets guidance randomly (often wrong)',
        2: 'Competent CFO — analyzes trends, ~70% optimal',
        3: 'Elite CFO — factors in everything, ~90% optimal'
      };
      let cfoLevels = '';
      for (let lvl = 1; lvl <= 3; lvl++) {
        if (lvl <= maxCFOLevel) {
          cfoLevels += `<span style="${csBtnStyle(activeCFO === lvl)}" onclick="setActiveCFOLevel(${lvl})" title="${cfoTooltips[lvl]}">${cfoLabels[lvl]}</span>`;
        } else {
          cfoLevels += `<span style="${csLockedStyle}" title="Purchase CFO Lv${lvl} in Board Room">🔒${lvl}</span>`;
        }
      }
      // Record for active CFO
      const record = gameState.cfoRecords[activeCFO];
      const recordStr = activeCFO > 0 && record && record.total > 0
        ? `${record.beats}/${record.total} (${Math.round(record.beats / record.total * 100)}%)`
        : activeCFO > 0 ? 'No data' : '';
      const recordColor = dm(activeCFO > 0 && record && record.total > 0
        ? (record.beats / record.total >= 0.7 ? '#217346' : record.beats / record.total >= 0.4 ? '#b8860b' : '#c00')
        : '#333');

      html += `<div class="grid-row ir-row">
        <div class="row-num">${rowNum++}</div>
        <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">CFO</div>
        <div class="cell cell-b" style="display:flex;align-items:center">${cfoManual}</div>
        <div class="cell cell-c" style="display:flex;align-items:center">${cfoLevels}</div>
        <div class="cell cell-d" style="font-size:10px;color:${dm('#888')}">${activeCFO > 0 ? 'Record' : ''}</div>
        <div class="cell cell-e" style="font-family:Consolas,monospace;font-size:11px;color:${recordColor}">${recordStr}</div>
        <div class="cell cell-f"></div>
        <div class="cell cell-g"></div>
        <div class="cell cell-h"></div>
      </div>`;
    }

    // CTO row (if Tech Dept owned)
    const maxCTOLevel = getTechDeptLevel();
    if (maxCTOLevel > 0) {
      const activeCTO = gameState.activeCTOLevel;
      let ctoManual = `<span style="${csBtnStyle(activeCTO === 0)}" onclick="setActiveCTOLevel(0)" title="Upgrade departments yourself">Manual</span>`;
      const ctoLabels = { 1: '🔧 1', 2: '💻 2', 3: '🧠 3' };
      const ctoTooltips = {
        1: 'The Intern — auto-upgrades cheapest department first',
        2: 'Competent CTO — prioritizes upgrades by ROI',
        3: 'Elite CTO — ROI-optimized with earnings timing awareness'
      };
      let ctoLevels = '';
      for (let lvl = 1; lvl <= 3; lvl++) {
        if (lvl <= maxCTOLevel) {
          ctoLevels += `<span style="${csBtnStyle(activeCTO === lvl)}" onclick="setActiveCTOLevel(${lvl})" title="${ctoTooltips[lvl]}">${ctoLabels[lvl]}</span>`;
        } else {
          ctoLevels += `<span style="${csLockedStyle}" title="Purchase CTO Lv${lvl} in Board Room">🔒${lvl}</span>`;
        }
      }

      html += `<div class="grid-row ir-row">
        <div class="row-num">${rowNum++}</div>
        <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">CTO</div>
        <div class="cell cell-b" style="display:flex;align-items:center">${ctoManual}</div>
        <div class="cell cell-c" style="display:flex;align-items:center">${ctoLevels}</div>
        <div class="cell cell-d"></div>
        <div class="cell cell-e"></div>
        <div class="cell cell-f" style="font-size:9px;color:${dm('#888')}">${activeCTO > 0 ? `Upgrades: ${gameState.ctoUpgradeCount || 0}` : ''}</div>
        <div class="cell cell-g"></div>
        <div class="cell cell-h" style="font-size:8px;color:${dm('#999')};white-space:nowrap">${activeCTO > 0 && gameState.ctoTarget ? `Next: ${gameState.ctoTarget}` : ''}</div>
      </div>`;

      // CTO Budget sub-row (only when CTO is active)
      if (activeCTO > 0) {
        const budgetPct = gameState.ctoBudgetPct;
        const pool = gameState.ctoBudgetPool || 0;
        const targetCost = gameState.ctoTargetCost || 0;
        const targetName = gameState.ctoTarget || '—';
        const poolStr = formatCompact(pool);
        const costStr = targetCost > 0 ? formatCompact(targetCost) : '—';
        // Progress toward next purchase
        const progress = targetCost > 0 ? Math.min(100, Math.round(pool / targetCost * 100)) : 0;
        const barFilled = Math.round(progress / 10);
        const bar = '█'.repeat(barFilled) + '░'.repeat(10 - barFilled);
        // Flash green on purchase, otherwise color by progress
        const justBought = gameState.ctoJustBought;
        if (justBought) gameState.ctoJustBought = false;
        const barColor = dm(justBought ? '#217346' : progress >= 90 ? '#b8860b' : '#666');
        const hasCapEx = hasBoardRoomUpgrade('capex_planning');
        const autoChecked = gameState.ctoBudgetAuto ? 'checked' : '';
        const sliderDisabled = gameState.ctoBudgetAuto ? 'disabled style="opacity:0.5"' : '';
        const autoLabel = hasCapEx ? `<label class="cto-auto-label" title="CFO manages budget automatically"><input type="checkbox" ${autoChecked} onchange="toggleCtoBudgetAuto(this.checked)"> Auto</label>` : '';

        html += `<div class="grid-row ir-row cto-budget-row">
          <div class="row-num">${rowNum++}</div>
          <div class="cell cell-a" style="padding-left:28px;color:${dm('#666')};font-size:10px">Budget</div>
          <div class="cell cell-b" style="display:flex;align-items:center;gap:4px">
            <input type="range" min="0" max="100" step="5" value="${budgetPct}" class="cto-budget-slider" ${sliderDisabled} oninput="setCtoBudgetPct(this.value)" title="% of revenue skimmed into CTO budget pool">
            <span class="cto-budget-pct">${budgetPct}%</span>
          </div>
          <div class="cell cell-c" style="font-family:Consolas,monospace;font-size:10px;color:${barColor}" title="${progress}% toward next upgrade">${bar}</div>
          <div class="cell cell-d" style="font-size:10px;color:${dm('#666')};white-space:nowrap">${poolStr} / ${costStr}</div>
          <div class="cell cell-e" style="font-size:10px">${autoLabel}</div>
          <div class="cell cell-f"></div>
          <div class="cell cell-g"></div>
          <div class="cell cell-h"></div>
        </div>`;
      }
    }

    // COO row
    const maxCOOLevel = getOpsDeptLevel();
    if (maxCOOLevel > 0) {
      const activeCOO = gameState.activeCOOLevel;
      let cooManual = `<span style="${csBtnStyle(activeCOO === 0)}" onclick="setActiveCOOLevel(0)" title="Hire employees yourself">Manual</span>`;
      const cooLabels = { 1: '📋 1', 2: '📊 2', 3: '🧠 3' };
      const cooTooltips = {
        1: 'The Recruiter — auto-hires cheapest employee first',
        2: 'VP of Ops — hires where marginal revenue per employee is highest',
        3: 'Elite COO — revenue-optimized with earnings timing awareness'
      };
      let cooLevels = '';
      for (let lvl = 1; lvl <= 3; lvl++) {
        if (lvl <= maxCOOLevel) {
          cooLevels += `<span style="${csBtnStyle(activeCOO === lvl)}" onclick="setActiveCOOLevel(${lvl})" title="${cooTooltips[lvl]}">${cooLabels[lvl]}</span>`;
        } else {
          cooLevels += `<span style="${csLockedStyle}" title="Purchase COO Lv${lvl} in Board Room">🔒${lvl}</span>`;
        }
      }

      html += `<div class="grid-row ir-row">
        <div class="row-num">${rowNum++}</div>
        <div class="cell cell-a" style="padding-left:16px;color:${dm('#444')}">COO</div>
        <div class="cell cell-b" style="display:flex;align-items:center">${cooManual}</div>
        <div class="cell cell-c" style="display:flex;align-items:center">${cooLevels}</div>
        <div class="cell cell-d"></div>
        <div class="cell cell-e"></div>
        <div class="cell cell-f" style="font-size:9px;color:${dm('#888')}">${activeCOO > 0 ? `Hires: ${gameState.cooHireCount || 0}` : ''}</div>
        <div class="cell cell-g"></div>
        <div class="cell cell-h" style="font-size:8px;color:${dm('#999')};white-space:nowrap">${activeCOO > 0 && gameState.cooTarget ? `Next: ${gameState.cooTarget}` : ''}</div>
      </div>`;

      // COO Budget sub-row
      if (activeCOO > 0) {
        const cooPct = gameState.cooBudgetPct;
        const cooPool = gameState.cooBudgetPool || 0;
        const cooTargetCost = gameState.cooTargetCost || 0;
        const cooPoolStr = formatCompact(cooPool);
        const cooCostStr = cooTargetCost > 0 ? formatCompact(cooTargetCost) : '—';
        const cooProgress = cooTargetCost > 0 ? Math.min(100, Math.round(cooPool / cooTargetCost * 100)) : 0;
        const cooBarFilled = Math.round(cooProgress / 10);
        const cooBar = '█'.repeat(cooBarFilled) + '░'.repeat(10 - cooBarFilled);
        const cooJustBought = gameState.cooJustBought;
        if (cooJustBought) gameState.cooJustBought = false;
        const cooBarColor = dm(cooJustBought ? '#217346' : cooProgress >= 90 ? '#b8860b' : '#666');

        html += `<div class="grid-row ir-row cto-budget-row">
          <div class="row-num">${rowNum++}</div>
          <div class="cell cell-a" style="padding-left:28px;color:${dm('#666')};font-size:10px">Budget</div>
          <div class="cell cell-b" style="display:flex;align-items:center;gap:4px">
            <input type="range" min="0" max="100" step="5" value="${cooPct}" class="cto-budget-slider" oninput="setCooBudgetPct(this.value)" title="% of revenue skimmed into COO hiring pool">
            <span class="cto-budget-pct">${cooPct}%</span>
          </div>
          <div class="cell cell-c" style="font-family:Consolas,monospace;font-size:10px;color:${cooBarColor}" title="${cooProgress}% toward next hire">${cooBar}</div>
          <div class="cell cell-d" style="font-size:10px;color:${dm('#666')};white-space:nowrap">${cooPoolStr} / ${cooCostStr}</div>
          <div class="cell cell-e"></div>
          <div class="cell cell-f"></div>
          <div class="cell cell-g"></div>
          <div class="cell cell-h"></div>
        </div>`;
      }
    }
  }

  // ===== TAX LIABILITY (if any debts) =====
  if (hasTaxDebts) {
    const stageLabels = {
      notice1: '1st Notice',
      notice2: '⚠ 2nd Notice',
      garnish: '🔴 Garnishment',
      seizure: '🚨 Seizure',
    };

    html += `<div class="grid-row sep-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a sep-cell"></div><div class="cell cell-b sep-cell"></div>
      <div class="cell cell-c sep-cell"></div><div class="cell cell-d sep-cell"></div>
      <div class="cell cell-e sep-cell"></div><div class="cell cell-f sep-cell"></div>
      <div class="cell cell-g sep-cell"></div><div class="cell cell-h sep-cell"></div>
    </div>`;

    html += `<div class="grid-row tax-grid-header">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:600;color:${dm('#900')}">TAX LIABILITY</div>
      <div class="cell cell-b" style="font-weight:600;color:${dm('#666')};font-size:10px">Original</div>
      <div class="cell cell-c" style="font-weight:600;color:${dm('#666')};font-size:10px;justify-content:flex-end">Interest</div>
      <div class="cell cell-d" style="font-weight:600;color:${dm('#666')};font-size:10px;justify-content:flex-end">Total Due</div>
      <div class="cell cell-e" style="font-weight:600;color:${dm('#666')};font-size:10px">Age</div>
      <div class="cell cell-f" style="font-weight:600;color:${dm('#666')};font-size:10px">Status</div>
      <div class="cell cell-g" style="font-weight:600;color:${dm('#666')};font-size:10px">Next</div>
      <div class="cell cell-h"></div>
    </div>`;

    for (let i = 0; i < gameState.taxDebts.length; i++) {
      const d = gameState.taxDebts[i];
      const interest = d.current - d.original;
      const daysToNext = d.stage === 'notice1' ? (30 - d.daysOverdue) :
                         d.stage === 'notice2' ? (90 - d.daysOverdue) :
                         d.stage === 'garnish' ? (180 - d.daysOverdue) : 0;
      const nextLabel = d.stage === 'notice1' ? '2nd Notice' :
                        d.stage === 'notice2' ? 'Garnish' :
                        d.stage === 'garnish' ? 'Seizure' : '—';
      const nextText = daysToNext > 0 ? `${nextLabel} ${daysToNext}d` : '—';
      const qLabel = d.quarter || '';

      html += `<div class="grid-row tax-debt-row">
        <div class="row-num">${rowNum++}</div>
        <div class="cell cell-a" style="color:${dm('#900')}">${qLabel} Assessment</div>
        <div class="cell cell-b" style="font-family:Consolas,monospace;font-size:11px;color:${dm('#c00')}">${formatMoney(d.original)}</div>
        <div class="cell cell-c" style="font-family:Consolas,monospace;font-size:11px;color:${dm('#c00')};justify-content:flex-end">${formatMoney(interest)}</div>
        <div class="cell cell-d" style="font-family:Consolas,monospace;font-size:11px;color:${dm('#c00')};font-weight:700;justify-content:flex-end">${formatMoney(d.current)}</div>
        <div class="cell cell-e" style="color:${dm('#888')};font-size:11px">${d.daysOverdue}d</div>
        <div class="cell cell-f" style="font-size:10px">${stageLabels[d.stage]}</div>
        <div class="cell cell-g" style="font-size:10px;color:${dm('#888')}">${nextText}</div>
        <div class="cell cell-h"><button class="cell-btn btn-max" data-settle="${i}">Settle</button></div>
      </div>`;
    }

    const total = totalTaxOwed();
    const settleAllVis = gameState.taxDebts.length > 1 ? '' : 'display:none';
    html += `<div class="grid-row tax-total-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:700;color:${dm('#900')}">TOTAL OWED</div>
      <div class="cell cell-b"></div>
      <div class="cell cell-c"></div>
      <div class="cell cell-d" style="font-family:Consolas,monospace;font-size:12px;color:${dm('#c00')};font-weight:700;justify-content:flex-end">${formatMoney(total)}</div>
      <div class="cell cell-e"></div><div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"><button class="cell-btn btn-max" data-settle-all style="${settleAllVis}">Settle All</button></div>
    </div>`;
  }

  // Only rebuild DOM if content actually changed (prevents click-swallowing race)
  const hashParts = [
    gameState.quarterRevenue|0, gameState.totalEarned|0,
    gameState.quarterExpenses|0, gameState.quarterTaxPaid|0, gameState.totalTaxPaid|0,
    daysToTax,
    gameState.taxDebts ? gameState.taxDebts.map(d => `${d.current|0}:${d.stage}:${d.daysOverdue}`).join(',') : '',
    gameState.capitalExpenses ? gameState.capitalExpenses.length : 0,
    garnishActive ? 1 : 0,
    // Phase 2.1: IR section changes
    gameState.isPublic ? 1 : 0,
    gameState.earningsQuarterRevenue|0,
    gameState.currentGuidance || '',
    gameState.retainedEarnings|0,
    gameState.earningsStreak|0,
    gameState.isPublic ? (Math.floor(getStockPrice() * 100)|0) : 0,
    // Phase 2.2: Board Room effects on display
    getBoardRoomTaxRate(),
    getBoardRoomRevMultiplier(),
    gameState.pnlCollapsed ? 1 : 0,
    gameState.activeCFOLevel || 0,
    gameState.activeCTOLevel || 0,
    gameState.ctoBudgetPct || 0,
    Math.floor(gameState.ctoSpentThisQuarter || 0),
    Math.floor(gameState.ctoBudgetPool || 0),
    gameState.ctoTarget || '',
    gameState.ctoJustBought ? 1 : 0,
    gameState.ctoBudgetAuto ? 1 : 0,
    gameState.ctoUpgradeCount || 0,
    gameState.activeCOOLevel || 0,
    gameState.cooBudgetPct || 0,
    Math.floor(gameState.cooSpentThisQuarter || 0),
    Math.floor(gameState.cooBudgetPool || 0),
    gameState.cooTarget || '',
    gameState.cooJustBought ? 1 : 0,
    gameState.cooHireCount || 0,
    getFinanceDeptLevel(),
    getTechDeptLevel(),
    getOpsDeptLevel(),
  ].join('|');

  if (hashParts !== _lastTaxPanelHash) {
    _lastTaxPanelHash = hashParts;
    panel.innerHTML = html;
    buildFillerRows();
  }
}

// Debug: trigger quarterly tax
function triggerIRS() {
  processQuarterlyTax();
}

function triggerBonus() {
  gameState.revBonus = { mult: 5, until: Date.now() + 30000 };
  document.getElementById('status-text').textContent = '🔥 Revenue ×5 — 30s remaining (debug)';
}

function showEventToast(sender, subject, body, actions, opts) {
  showEvent({ sender, subject, body, actions, ...opts });
}

function gameTick() {
  if (!gameState.arc) return;
  if (gameState.earningsPaused) return;
  const now = Date.now();

  const isPowerOut = gameState.powerOutage && now < gameState.powerOutage.until;

  if (!isPowerOut) {
    let penaltyMult = 1;
    if (gameState.revPenalty && now < gameState.revPenalty.until) {
      penaltyMult = gameState.revPenalty.mult;
    } else {
      gameState.revPenalty = null;
    }

    let bonusMult = 1;
    if (gameState.revBonus && now < gameState.revBonus.until) {
      bonusMult = gameState.revBonus.mult;
    } else {
      gameState.revBonus = null;
    }

    // Tax garnishment
    const garnishActive = gameState.taxDebts && gameState.taxDebts.some(d => d.stage === 'garnish');
    if (garnishActive) penaltyMult *= 0.85;

    // Board Room revenue multiplier
    const brRevMult = getBoardRoomRevMultiplier();

    for (const state of gameState.sources) {
      if (!state.unlocked || state.employees === 0) continue;
      const fullRev = sourceRevPerTick(state) * brRevMult;
      const rev = fullRev * penaltyMult * bonusMult;
      const garnished = garnishActive ? Math.floor(fullRev * 0.15) : 0;

      if (state.automated) {
        // Skim CTO + COO budgets from revenue before adding to cash
        const ctoSkim = (gameState.activeCTOLevel > 0 && gameState.ctoBudgetPct > 0)
          ? rev * (gameState.ctoBudgetPct / 100) : 0;
        const cooSkim = (gameState.activeCOOLevel > 0 && gameState.cooBudgetPct > 0)
          ? rev * (gameState.cooBudgetPct / 100) : 0;
        gameState.cash += rev - ctoSkim - cooSkim;
        gameState.ctoBudgetPool = (gameState.ctoBudgetPool || 0) + ctoSkim;
        gameState.cooBudgetPool = (gameState.cooBudgetPool || 0) + cooSkim;
        gameState.totalEarned += rev;
        gameState.quarterRevenue += rev;
        trackEarningsRevenue(rev);
        if (garnished > 0) {
          gameState.quarterTaxPaid += garnished;
          gameState.totalTaxPaid += garnished;
        }
      } else {
        state.pendingCollect += rev;
      }
    }
  }

  // Advance in-game time (1 tick = 1 day)
  gameState.gameElapsedSecs += SECS_PER_DAY;

  // Quarterly tax assessment (every 90 game-days)
  const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  if (currentDay - gameState.lastQuarterDay >= 90) {
    processQuarterlyTax();
    gameState.lastQuarterDay = currentDay;
    gameState.overtimeClicks = 0; // reset overtime each quarter
  }

  // Tax debt processing (each tick = 1 day)
  processTaxDebts();

  // Phase 2.1: IPO check
  checkIPOTrigger();

  // Phase 2.1: Earnings quarter check (every 90 game-days post-IPO)
  if (gameState.isPublic) {
    const earningsDaysSince = currentDay - gameState.lastEarningsDay;
    if (earningsDaysSince >= EARNINGS_QUARTER_DAYS) {
      processEarnings();
      gameState.lastEarningsDay = currentDay;
    }
  }

  gameState.totalPlayTime++;
  gameState.lastTick = now;

  // Mini-task system
  trySpawnMiniTask();
  trySpawnGoldenCell();

  // CTO auto-upgrade
  ctoAutoUpgrade();

  // COO auto-hire
  cooAutoHire();

  // Event system
  if (gameState.eventCooldown > 0) {
    gameState.eventCooldown--;
  } else if (!document.getElementById('event-toast').classList.contains('hidden')) {
    // Toast already visible
  } else {
    if (Math.random() < 0.02 * EVENT_FREQ_MULT && gameState.totalPlayTime > 30) {
      triggerRandomEvent();
      gameState.eventCooldown = Math.floor((30 + Math.floor(Math.random() * 30)) / (EVENT_FREQ_MULT || 1));
    }
  }

  // $1M milestone
  if (gameState.totalEarned >= 1000000 && !gameState.seriesAShown) {
    gameState.seriesAShown = true;
    showSeriesA();
  }

  // Close the Deal spawning
  if (isFeatureEnabled('closeTheDeals') && !gameState.dealActive) {
    if (gameState.dealCooldown === undefined || gameState.dealCooldown === null) {
      gameState.dealCooldown = 60 + Math.floor(Math.random() * 120);
    }
    if (gameState.dealCooldown > 0) {
      gameState.dealCooldown--;
    } else if (totalRevPerTick() > 0 && !isPowerOut &&
               gameState.totalPlayTime > 60) {
      spawnDeal();
      gameState.dealCooldown = 90 + Math.floor(Math.random() * 150); // 1.5-4 min
    }
  }

  // Valuation chart
  sampleValuation();
  drawValuationChart();

  // Management focus decay
  decayFocus();

  updateToastButtons();
  updateGridValues();
  updateDisplay();
}

// ===== EVENTS =====
function triggerRandomEvent() {
  const totalWeight = EVENTS.reduce((sum, e) => sum + (e.weight || 1), 0);
  let roll = Math.random() * totalWeight;
  for (const event of EVENTS) {
    roll -= (event.weight || 1);
    if (roll <= 0) { showEvent(event); return; }
  }
  showEvent(EVENTS[EVENTS.length - 1]); // fallback
}

let eventToastTimer = null;
let _eventToastActions = null; // track actions with cashRequired for live updates
let _eventToastQueue = []; // queue for toasts that arrive while one is visible

function showEvent(event) {
  // Handle dynamic events that generate content at trigger time
  if (event.generate) {
    const result = event.generate();
    if (!result) return;
    event = result;
  } else if (event.dynamic && event.setup) {
    const result = event.setup(gameState);
    if (!result) return; // couldn't generate (e.g., no unlocked sources)
    event = { ...event, body: result.body, actions: result.actions };
  }

  // If a toast is already visible, queue this one and return
  const existingToast = document.getElementById('event-toast');
  if (existingToast && !existingToast.classList.contains('hidden')) {
    _eventToastQueue.push(event);
    return;
  }

  // Clear any existing timer
  if (eventToastTimer) { clearTimeout(eventToastTimer); eventToastTimer = null; }

  const toast = document.getElementById('event-toast');

  // Restore saved position if available
  const savedPos = localStorage.getItem('quarterClose_toastPos');
  if (savedPos) {
    const pos = JSON.parse(savedPos);
    toast.style.left = pos.left + 'px';
    toast.style.top = pos.top + 'px';
    toast.style.transform = 'none';
  } else {
    toast.style.left = '50%';
    toast.style.top = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
  }

  document.getElementById('toast-sender').textContent = event.sender;
  if (event.html) {
    document.getElementById('toast-body').innerHTML = event.body;
  } else {
    document.getElementById('toast-body').textContent = event.body;
  }

  const actionsDiv = document.getElementById('toast-actions');
  actionsDiv.innerHTML = '';

  if (event.timed) {
    // Countdown bar — effect fires when it fills
    const wrapper = document.createElement('div');
    wrapper.className = 'toast-countdown-wrapper';
    const bar = document.createElement('div');
    bar.className = 'toast-countdown-bar';
    bar.style.animationDuration = (event.timedDelay / 1000) + 's';
    wrapper.appendChild(bar);

    const label = document.createElement('span');
    label.className = 'toast-countdown-label';
    label.textContent = 'Systems shutting down...';
    wrapper.appendChild(label);

    actionsDiv.appendChild(wrapper);

    // Hide close button for timed events
    document.getElementById('toast-close').style.display = 'none';

    setTimeout(() => {
      const result = event.timedEffect(gameState);
      document.getElementById('status-text').textContent = result;
      setTimeout(() => {
        document.getElementById('status-text').textContent = 'Ready';
      }, 3000);
      document.getElementById('toast-close').style.display = '';
      dismissEvent();
      updateDisplay();
    }, event.timedDelay);
  } else {
    // Hide close button for non-closable toasts (earnings, IRS decisions)
    document.getElementById('toast-close').style.display = event.closable === false ? 'none' : '';
    // Default auto-expire: 10s for all events unless explicitly set
    const expiry = event.expiresMs !== undefined ? event.expiresMs : 10000;
    _eventToastActions = []; // reset tracked actions
    event.actions.forEach((action, i) => {
      const btn = document.createElement('button');
      btn.className = 'toast-btn' + (i === 0 ? ' toast-primary' : '');
      btn.textContent = action.label;

      // Track actions with cashRequired for live enable/disable updates
      if (action.cashRequired !== undefined) {
        _eventToastActions.push({ btn, action });
        if (gameState.cash < action.cashRequired) {
          btn.disabled = true;
          btn.textContent = action.disabledLabel || 'Not enough cash';
          btn.classList.add('toast-btn-disabled');
        }
      }

      btn.onclick = () => {
        if (btn.disabled) return;
        if (eventToastTimer) { clearTimeout(eventToastTimer); eventToastTimer = null; }
        _eventToastActions = null;
        const result = action.effect(gameState);
        document.getElementById('status-text').textContent = result;
        setTimeout(() => {
          document.getElementById('status-text').textContent = 'Ready';
        }, 3000);
        dismissEvent();
        updateDisplay();
      };

      // Add countdown overlay on the last action if event expires
      if (expiry > 0 && i === event.actions.length - 1) {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        const fill = document.createElement('div');
        fill.className = 'toast-btn-countdown';
        fill.style.animationDuration = (expiry / 1000) + 's';
        btn.appendChild(fill);

        eventToastTimer = setTimeout(() => {
          eventToastTimer = null;
          btn.click();
        }, expiry);
      }

      actionsDiv.appendChild(btn);
    });
  }

  toast.classList.remove('hidden');
}

function dismissEvent() {
  if (eventToastTimer) { clearTimeout(eventToastTimer); eventToastTimer = null; }
  _eventToastActions = null;
  document.getElementById('event-toast').classList.add('hidden');

  // Show next queued toast if any
  if (_eventToastQueue.length > 0) {
    const next = _eventToastQueue.shift();
    setTimeout(() => showEvent(next), 300); // brief delay so player sees the transition
  }
}

// Update toast buttons with cashRequired (called each tick)
function updateToastButtons() {
  if (!_eventToastActions) return;
  for (const { btn, action } of _eventToastActions) {
    const canAfford = gameState.cash >= action.cashRequired;
    if (canAfford && btn.disabled) {
      btn.disabled = false;
      btn.textContent = action.label;
      btn.classList.remove('toast-btn-disabled');
    } else if (!canAfford && !btn.disabled) {
      btn.disabled = true;
      btn.textContent = action.disabledLabel || 'Not enough cash';
      btn.classList.add('toast-btn-disabled');
    }
  }
}

// ===== DEBUG MODE — tap cash label 7× quickly =====
let debugTapCount = 0;
let debugTapTimer = null;
let debugMode = false;

function initDebugTap() {
  const cashLabel = document.querySelector('.cash-label');
  if (!cashLabel) return;
  cashLabel.style.cursor = 'default';
  cashLabel.addEventListener('click', () => {
    debugTapCount++;
    clearTimeout(debugTapTimer);
    debugTapTimer = setTimeout(() => { debugTapCount = 0; }, 2000);
    if (debugTapCount >= 7) {
      debugTapCount = 0;
      debugMode = !debugMode;
      document.getElementById('debug-tools').classList.toggle('hidden', !debugMode);
      document.getElementById('status-text').textContent = debugMode ? '🧪 Debug mode enabled' : '🧪 Debug mode disabled';
    }
  });
}

// ===== DEBUG: TRIGGER EVENTS =====
function toggleDebugEventDropdown() {
  const dd = document.getElementById('debug-event-dropdown');
  if (!dd.classList.contains('hidden')) {
    dd.classList.add('hidden');
    return;
  }
  dd.innerHTML = '';
  EVENTS.forEach((event) => {
    const btn = document.createElement('div');
    btn.style.cssText = `padding:5px 10px;cursor:pointer;font-size:11px;border-bottom:1px solid ${dm('#eee')};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${dm('#333')}`;
    btn.textContent = event.debugLabel || `${event.sender || 'Dynamic'} — ${(event.subject || '(dynamic event)').replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim()}`;
    btn.onmouseenter = () => btn.style.background = dm('#e8f0fe');
    btn.onmouseleave = () => btn.style.background = '';
    btn.ontouchstart = () => btn.style.background = dm('#e8f0fe');
    btn.ontouchend = () => btn.style.background = '';
    btn.onclick = () => { dd.classList.add('hidden'); showEvent(event); };
    dd.appendChild(btn);
  });
  dd.classList.remove('hidden');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const dd = document.getElementById('debug-event-dropdown');
  if (dd && !dd.classList.contains('hidden') && !e.target.closest('#debug-event-dropdown') && !e.target.textContent.includes('Event ▾')) {
    dd.classList.add('hidden');
  }
});

// ===== BOSS KEY =====
function toggleBossMode() {
  gameState.bossMode = !gameState.bossMode;
  const gameVisible = !gameState.bossMode && gameState.arc;
  document.getElementById('game-view').classList.toggle('hidden', !gameVisible);
  document.getElementById('boss-view').classList.toggle('hidden', !gameState.bossMode);

  if (gameState.bossMode) {
    document.getElementById('event-toast').classList.add('hidden');
    document.getElementById('deal-popup').classList.add('hidden');
    document.getElementById('mini-task-bar').classList.add('hidden');
    document.title = 'Book1 - Excel';
  } else {
    document.title = 'Q4 Financials - Operations.xlsx - Quarter Close';
  }
}

// ===== SAVE / LOAD =====
function saveGame() {
  if (!gameState.arc) return;
  const saveData = {
    arc: gameState.arc,
    cash: gameState.cash,
    totalEarned: gameState.totalEarned,
    sources: gameState.sources.map(s => ({
      id: s.id,
      unlocked: s.unlocked,
      employees: s.employees,
      upgradeLevel: s.upgradeLevel,
      automated: s.automated,
      pendingCollect: s.pendingCollect,
      prestigeLevel: s.prestigeLevel || 0,
      breakthroughMult: s.breakthroughMult || 1,
    })),
    seriesAShown: gameState.seriesAShown,
    totalPlayTime: gameState.totalPlayTime,
    totalClicks: gameState.totalClicks,
    miniTaskStreak: gameState.miniTaskStreak,
    gameStartDate: gameState.gameStartDate,
    gameElapsedSecs: gameState.gameElapsedSecs,
    taxDebts: gameState.taxDebts || [],
    quarterRevenue: gameState.quarterRevenue,
    quarterExpenses: gameState.quarterExpenses,
    quarterTaxPaid: gameState.quarterTaxPaid,
    totalTaxPaid: gameState.totalTaxPaid,
    totalSpentHires: gameState.totalSpentHires,
    totalSpentUpgrades: gameState.totalSpentUpgrades,
    totalSpentAuto: gameState.totalSpentAuto,
    lastQuarterDay: gameState.lastQuarterDay,
    capitalExpenses: gameState.capitalExpenses || [],
    valuationHistory: gameState.valuationHistory || [],
    // Phase 2.1
    isPublic: gameState.isPublic || false,
    ipoDay: gameState.ipoDay || 0,
    sharesOutstanding: gameState.sharesOutstanding || 1000000000,
    retainedEarnings: gameState.retainedEarnings || 0,
    analystBaseline: gameState.analystBaseline || 1.0,
    earningsStreak: gameState.earningsStreak || 0,
    currentGuidance: gameState.currentGuidance || null,
    guidanceTarget: gameState.guidanceTarget || 0,
    lastEarningsDay: gameState.lastEarningsDay || 0,
    earningsQuarterRevenue: gameState.earningsQuarterRevenue || 0,
    ipoStockPriceStart: gameState.ipoStockPriceStart || 0,
    _earningsMultiplier: gameState._earningsMultiplier || 1.0,
    // Phase 2.2: Board Room
    boardRoomPurchases: gameState.boardRoomPurchases || {},
    activeCFOLevel: gameState.activeCFOLevel || 0,
    activeCTOLevel: gameState.activeCTOLevel || 0,
    ctoBudgetPct: gameState.ctoBudgetPct != null ? gameState.ctoBudgetPct : 15,
    ctoSpentThisQuarter: gameState.ctoSpentThisQuarter || 0,
    ctoBudgetPool: gameState.ctoBudgetPool || 0,
    ctoBudgetAuto: gameState.ctoBudgetAuto || false,
    activeCOOLevel: gameState.activeCOOLevel || 0,
    cooBudgetPct: gameState.cooBudgetPct != null ? gameState.cooBudgetPct : 15,
    cooSpentThisQuarter: gameState.cooSpentThisQuarter || 0,
    cooBudgetPool: gameState.cooBudgetPool || 0,
    cooHireCount: gameState.cooHireCount || 0,
    cfoRecords: gameState.cfoRecords || {},
    revenueHistory: gameState.revenueHistory || [],
    lastQuarterRE: gameState.lastQuarterRE || 0,
    featureToggles: gameState.featureToggles || DEFAULT_FEATURES,
    eventFreqMult: EVENT_FREQ_MULT,
    overtimeClicks: gameState.overtimeClicks || 0,
    focusTipShown: gameState.focusTipShown || false,
    savedAt: Date.now(),
  };

  try {
    localStorage.setItem('quarterClose_save', JSON.stringify(saveData));
    gameState.lastSave = Date.now();

    const saveEl = document.getElementById('status-save');
    saveEl.textContent = '💾 Saved!';
    setTimeout(() => { saveEl.textContent = '💾 Saved'; }, 1500);
  } catch (e) {
    console.error('Save failed:', e);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem('quarterClose_save');
    if (!raw) return false;

    const data = JSON.parse(raw);
    if (!data.arc) return false;

    const now = Date.now();
    const elapsed = Math.min((now - data.savedAt) / 1000, 8 * 3600);

    gameState.arc = data.arc;
    gameState.cash = data.cash || 0;
    gameState.totalEarned = data.totalEarned || 0;
    gameState.seriesAShown = data.seriesAShown || false;
    gameState.totalPlayTime = data.totalPlayTime || 0;
    gameState.totalClicks = data.totalClicks || 0;
    gameState.miniTaskStreak = data.miniTaskStreak || 0;
    gameState.gameStartDate = data.gameStartDate || Date.UTC(2024, 0, 1);
    gameState.gameElapsedSecs = data.gameElapsedSecs || 0;
    gameState.eventCooldown = 30;
    gameState.miniTaskCooldown = 10;
    gameState.taxDebts = data.taxDebts || [];
    gameState.quarterRevenue = data.quarterRevenue || 0;
    gameState.quarterExpenses = data.quarterExpenses || 0;
    gameState.quarterTaxPaid = data.quarterTaxPaid || 0;
    gameState.totalTaxPaid = data.totalTaxPaid || 0;
    gameState.totalSpentHires = data.totalSpentHires || 0;
    gameState.totalSpentUpgrades = data.totalSpentUpgrades || 0;
    gameState.totalSpentAuto = data.totalSpentAuto || 0;
    gameState.lastQuarterDay = data.lastQuarterDay || 0;
    gameState.capitalExpenses = (data.capitalExpenses || []).filter(c => c && c.quartersLeft > 0 && c.perQuarter > 0);
    gameState.valuationHistory = data.valuationHistory || [];
    // Phase 2.1
    gameState.isPublic = data.isPublic || false;
    gameState.earningsPaused = false; // transient, never persist
    gameState.ipoDay = data.ipoDay || 0;
    gameState.sharesOutstanding = data.sharesOutstanding || 1000000000;
    gameState.retainedEarnings = data.retainedEarnings || 0;
    // Cap RE from pre-fix saves with inflated balances
    if (gameState.retainedEarnings > 100000) gameState.retainedEarnings = 0;
    gameState.analystBaseline = data.analystBaseline || 1.0;
    if (gameState.analystBaseline > 2.5) gameState.analystBaseline = 1.5; // cap inflated saves
    if (gameState.analystBaseline < 0.5) gameState.analystBaseline = 0.8; // rescue crushed saves
    gameState.earningsStreak = data.earningsStreak || 0;
    gameState.currentGuidance = data.currentGuidance || null;
    gameState.guidanceTarget = data.guidanceTarget || 0;
    gameState.lastEarningsDay = data.lastEarningsDay || 0;
    gameState.earningsQuarterRevenue = data.earningsQuarterRevenue || 0;
    gameState.ipoStockPriceStart = data.ipoStockPriceStart || 0;
    gameState._earningsMultiplier = Math.max(0.1, data._earningsMultiplier || 1.0);
    // Rescue saves where multiplier was destroyed by repeated misses
    if (gameState._earningsMultiplier < 0.3) gameState._earningsMultiplier = 0.5;
    // Phase 2.2: Board Room
    gameState.boardRoomPurchases = data.boardRoomPurchases || {};
    gameState.activeCFOLevel = data.activeCFOLevel || 0;
    gameState.activeCTOLevel = data.activeCTOLevel || 0;
    gameState.ctoBudgetPct = data.ctoBudgetPct != null ? data.ctoBudgetPct : 15;
    gameState.ctoSpentThisQuarter = data.ctoSpentThisQuarter || 0;
    gameState.ctoBudgetPool = data.ctoBudgetPool || 0;
    gameState.ctoBudgetAuto = data.ctoBudgetAuto || false;
    gameState.activeCOOLevel = data.activeCOOLevel || 0;
    gameState.cooBudgetPct = data.cooBudgetPct != null ? data.cooBudgetPct : 15;
    gameState.cooSpentThisQuarter = data.cooSpentThisQuarter || 0;
    gameState.cooBudgetPool = data.cooBudgetPool || 0;
    gameState.cooHireCount = data.cooHireCount || 0;
    gameState.cfoRecords = data.cfoRecords || {};
    gameState.revenueHistory = data.revenueHistory || [];
    gameState.lastQuarterRE = data.lastQuarterRE || 0;
    gameState.featureToggles = data.featureToggles || { ...DEFAULT_FEATURES };
    EVENT_FREQ_MULT = data.eventFreqMult != null ? data.eventFreqMult : 1.0;
    gameState.overtimeClicks = data.overtimeClicks || 0;
    gameState.focusTipShown = data.focusTipShown || false;
    gameState.activeTab = 'operations';

    // Rebuild sources for selected arc
    gameState.sources = SOURCE_STATS.map((s, i) => ({
      id: i,
      unlocked: false,
      employees: 0,
      upgradeLevel: 0,
      automated: false,
      pendingCollect: 0,
      prestigeLevel: 0,
      breakthroughMult: 1,
      focus: 0,
      lastFocusClick: 0,
    }));

    if (data.sources) {
      data.sources.forEach((saved, i) => {
        if (i < gameState.sources.length) {
          gameState.sources[i].unlocked = saved.unlocked;
          gameState.sources[i].employees = saved.employees;
          gameState.sources[i].upgradeLevel = saved.upgradeLevel;
          gameState.sources[i].automated = saved.automated;
          gameState.sources[i].pendingCollect = saved.pendingCollect || 0;
          gameState.sources[i].prestigeLevel = saved.prestigeLevel || 0;
          gameState.sources[i].breakthroughMult = saved.breakthroughMult || 1;
          // Focus is transient — don't load from save (resets on load)
        }
      });
    }

    // Offline earnings — use annual rate, apply time based on real elapsed seconds
    // Each real second = 1 game-day, so offline ticks = elapsed seconds
    if (elapsed > 5) {
      let offlineEarnings = 0;
      for (const state of gameState.sources) {
        if (state.unlocked && state.automated && state.employees > 0) {
          const daily = sourceAnnualRev(state) / 365.25;
          offlineEarnings += daily * elapsed;
        }
      }
      // Also advance game time (1 day per elapsed second)
      gameState.gameElapsedSecs += SECS_PER_DAY * elapsed;
      if (offlineEarnings > 0) {
        gameState.cash += offlineEarnings;
        gameState.totalEarned += offlineEarnings;
        showOfflineModal(elapsed, offlineEarnings);
      }
    }

    // Show game view (skip arc select)
    document.getElementById('arc-select').classList.add('hidden');
    document.getElementById('game-view').classList.remove('hidden');
    try {
      buildGrid();
      updateDisplay();
      updateTaxPanel();
      updateBoardRoomTab();
    } catch (renderErr) {
      console.error('Render error after load (non-fatal):', renderErr);
    }

    return true;
  } catch (e) {
    console.error('Load failed:', e);
    return false;
  }
}

function resetGame() {
  localStorage.removeItem('quarterClose_save');
  gameState.arc = null;
  gameState.cash = 0;
  gameState.totalEarned = 0;
  gameState.sources = [];
  gameState.seriesAShown = false;
  gameState.totalPlayTime = 0;
  gameState.totalClicks = 0;
  gameState.gameStartDate = Date.now();
  gameState.gameElapsedSecs = 0;
  gameState.revPenalty = null;
  gameState.revBonus = null;
  gameState.powerOutage = null;
  gameState.dbOutage = null;
  gameState.miniTaskBlocked = null;
  gameState.hireFrozen = null;
  gameState.taxDebts = [];
  gameState.quarterRevenue = 0;
  gameState.quarterExpenses = 0;
  gameState.quarterTaxPaid = 0;
  gameState.totalTaxPaid = 0;
  gameState.totalSpentHires = 0;
  gameState.totalSpentUpgrades = 0;
  gameState.totalSpentAuto = 0;
  gameState.lastQuarterDay = 0;
  gameState.capitalExpenses = [];
  gameState.valuationHistory = [];
  // Phase 2.1
  gameState.isPublic = false;
  gameState.ipoDay = 0;
  gameState.sharesOutstanding = 1000000000;
  gameState.retainedEarnings = 0;
  gameState.analystBaseline = 1.0;
  gameState.earningsStreak = 0;
  gameState.currentGuidance = null;
  gameState.guidanceTarget = 0;
  gameState.lastEarningsDay = 0;
  gameState.earningsQuarterRevenue = 0;
  gameState.ipoStockPriceStart = 0;
  gameState._earningsMultiplier = 1.0;
  // Phase 2.2: Board Room
  gameState.boardRoomPurchases = {};
  gameState.activeTab = 'operations';
  gameState.activeCFOLevel = 0;
  gameState.activeCTOLevel = 0;
  gameState.ctoBudgetPct = 15;
  gameState.ctoSpentThisQuarter = 0;
  gameState.ctoBudgetPool = 0;
  gameState.ctoBudgetAuto = false;
  gameState.activeCOOLevel = 0;
  gameState.cooBudgetPct = 15;
  gameState.cooSpentThisQuarter = 0;
  gameState.cooBudgetPool = 0;
  gameState.cooHireCount = 0;
  gameState.cfoRecords = {};
  gameState.revenueHistory = [];
  gameState.lastQuarterRE = 0;
  gameState.featureToggles = { ...DEFAULT_FEATURES };
  EVENT_FREQ_MULT = 1.0;
  gameState.overtimeClicks = 0;
  gameState.focusTipShown = false;
  gameState.eventCooldown = 0;
  gameState.miniTaskCooldown = 0;
  gameState.miniTaskActive = false;
  gameState.miniTaskStreak = 0;
  gameState.goldenCellActive = false;
  gameState.goldenCellCooldown = 60;
  _lastTaxPanelHash = ''; // force rebuild
  _eventToastQueue = []; // clear queued toasts
  showArcSelect();
}

// ===== OFFLINE MODAL =====
function showOfflineModal(elapsedSeconds, earnings) {
  const body = document.getElementById('offline-body');
  body.innerHTML = `
    <p>Your team worked while you were away!</p>
    <p>⏱ Time elapsed: <strong>${formatDuration(elapsedSeconds)}</strong></p>
    <p>💰 Earnings: <strong>${formatMoney(earnings)}</strong></p>
    ${elapsedSeconds >= 8 * 3600 ? `<p style="color:${dm('#999')};font-size:11px">(Capped at 8 hours overtime)</p>` : ''}
  `;
  document.getElementById('offline-modal').classList.remove('hidden');
}

function dismissOffline() {
  document.getElementById('offline-modal').classList.add('hidden');
}

// ===== SERIES A =====
function showSeriesA() {
  gameState.cash += 5000000;
  document.getElementById('series-a-modal').classList.remove('hidden');
}

function dismissSeriesA() {
  document.getElementById('series-a-modal').classList.add('hidden');
}

// ===== TOAST DRAG =====
let toastDragState = null;

function initToastDrag() {
  const header = document.getElementById('toast-header');
  header.style.cursor = 'move';

  header.addEventListener('mousedown', (e) => {
    if (e.target.id === 'toast-close') return;
    e.preventDefault();
    const toast = document.getElementById('event-toast');
    const rect = toast.getBoundingClientRect();
    // Switch from centered to absolute positioning on first drag
    toast.style.transform = 'none';
    toast.style.left = rect.left + 'px';
    toast.style.top = rect.top + 'px';
    toastDragState = { startX: e.clientX, startY: e.clientY, origLeft: rect.left, origTop: rect.top };
  });

  header.addEventListener('touchstart', (e) => {
    if (e.target.id === 'toast-close') return;
    const t = e.touches[0];
    const toast = document.getElementById('event-toast');
    const rect = toast.getBoundingClientRect();
    toast.style.transform = 'none';
    toast.style.left = rect.left + 'px';
    toast.style.top = rect.top + 'px';
    toastDragState = { startX: t.clientX, startY: t.clientY, origLeft: rect.left, origTop: rect.top };
  }, { passive: true });

  document.addEventListener('mousemove', (e) => {
    if (!toastDragState) return;
    const dx = e.clientX - toastDragState.startX;
    const dy = e.clientY - toastDragState.startY;
    const toast = document.getElementById('event-toast');
    toast.style.left = (toastDragState.origLeft + dx) + 'px';
    toast.style.top = (toastDragState.origTop + dy) + 'px';
  });

  document.addEventListener('touchmove', (e) => {
    if (!toastDragState) return;
    const t = e.touches[0];
    const dx = t.clientX - toastDragState.startX;
    const dy = t.clientY - toastDragState.startY;
    const toast = document.getElementById('event-toast');
    toast.style.left = (toastDragState.origLeft + dx) + 'px';
    toast.style.top = (toastDragState.origTop + dy) + 'px';
  }, { passive: true });

  document.addEventListener('mouseup', () => {
    if (toastDragState) {
      const toast = document.getElementById('event-toast');
      const rect = toast.getBoundingClientRect();
      localStorage.setItem('quarterClose_toastPos', JSON.stringify({ left: rect.left, top: rect.top }));
      toastDragState = null;
    }
  });

  document.addEventListener('touchend', () => {
    if (toastDragState) {
      const toast = document.getElementById('event-toast');
      const rect = toast.getBoundingClientRect();
      localStorage.setItem('quarterClose_toastPos', JSON.stringify({ left: rect.left, top: rect.top }));
      toastDragState = null;
    }
  });

  // Deal popup drag
  const dealHeader = document.getElementById('deal-header');
  let dealDragState = null;

  dealHeader.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const popup = document.getElementById('deal-popup');
    const rect = popup.getBoundingClientRect();
    popup.style.transform = 'none';
    popup.style.left = rect.left + 'px';
    popup.style.top = rect.top + 'px';
    dealDragState = { startX: e.clientX, startY: e.clientY, origLeft: rect.left, origTop: rect.top };
  });

  dealHeader.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    const popup = document.getElementById('deal-popup');
    const rect = popup.getBoundingClientRect();
    popup.style.transform = 'none';
    popup.style.left = rect.left + 'px';
    popup.style.top = rect.top + 'px';
    dealDragState = { startX: t.clientX, startY: t.clientY, origLeft: rect.left, origTop: rect.top };
  }, { passive: true });

  document.addEventListener('mousemove', (e) => {
    if (!dealDragState) return;
    const dx = e.clientX - dealDragState.startX;
    const dy = e.clientY - dealDragState.startY;
    const popup = document.getElementById('deal-popup');
    popup.style.left = (dealDragState.origLeft + dx) + 'px';
    popup.style.top = (dealDragState.origTop + dy) + 'px';
  });

  document.addEventListener('touchmove', (e) => {
    if (!dealDragState) return;
    const t = e.touches[0];
    const dx = t.clientX - dealDragState.startX;
    const dy = t.clientY - dealDragState.startY;
    const popup = document.getElementById('deal-popup');
    popup.style.left = (dealDragState.origLeft + dx) + 'px';
    popup.style.top = (dealDragState.origTop + dy) + 'px';
  }, { passive: true });

  document.addEventListener('mouseup', () => {
    if (dealDragState) {
      const popup = document.getElementById('deal-popup');
      const rect = popup.getBoundingClientRect();
      localStorage.setItem('quarterClose_dealPos', JSON.stringify({ left: rect.left, top: rect.top }));
      dealDragState = null;
    }
  });

  document.addEventListener('touchend', () => {
    if (dealDragState) {
      const popup = document.getElementById('deal-popup');
      const rect = popup.getBoundingClientRect();
      localStorage.setItem('quarterClose_dealPos', JSON.stringify({ left: rect.left, top: rect.top }));
      dealDragState = null;
    }
  });
}

// ===== BOSS VIEW GENERATION =====
function generateBossGrid() {
  const grid = document.getElementById('boss-grid');
  grid.innerHTML = '';

  const corner = document.createElement('div');
  corner.style.cssText = `background:${dm('#f0f0f0')};border-right:1px solid ${dm('#c0c0c0')};border-bottom:1px solid ${dm('#c0c0c0')};`;
  grid.appendChild(corner);

  const cols = 'ABCDEFGHIJ';
  for (let c = 0; c < 10; c++) {
    const header = document.createElement('div');
    header.className = 'boss-col-header';
    header.textContent = cols[c];
    grid.appendChild(header);
  }

  for (let r = 1; r <= 30; r++) {
    const rn = document.createElement('div');
    rn.className = 'boss-row-num';
    rn.textContent = r;
    grid.appendChild(rn);
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement('div');
      cell.className = 'boss-cell';
      grid.appendChild(cell);
    }
  }
}

// ===== KEYBOARD HANDLERS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    toggleBossMode();
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveGame();
    return;
  }
});

// ===== AUTO-SAVE (every 30s) =====
let autosaveEnabled = true;
let autosaveInterval = setInterval(() => { saveGame(); }, 30000);

// ===== FILE MENU =====
let fileMenuOpen = false;

function toggleFileMenu(e) {
  e.stopPropagation();
  fileMenuOpen = !fileMenuOpen;
  const dropdown = document.getElementById('file-dropdown');
  dropdown.classList.toggle('open', fileMenuOpen);
  updateAutosaveToggle();
}

function closeFileMenu() {
  fileMenuOpen = false;
  const dropdown = document.getElementById('file-dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

function toggleAutosave(e) {
  e.stopPropagation();
  autosaveEnabled = !autosaveEnabled;
  if (autosaveEnabled) {
    autosaveInterval = setInterval(() => { saveGame(); }, 30000);
    document.getElementById('status-text').textContent = 'Auto-save enabled';
  } else {
    clearInterval(autosaveInterval);
    document.getElementById('status-text').textContent = 'Auto-save disabled';
  }
  updateAutosaveToggle();
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 2000);
}

function updateAutosaveToggle() {
  const el = document.getElementById('autosave-toggle');
  if (el) el.classList.toggle('off', !autosaveEnabled);
}

// ===== DATA MENU =====
let dataMenuOpen = false;

function toggleDataMenu(e) {
  e.stopPropagation();
  dataMenuOpen = !dataMenuOpen;
  const dropdown = document.getElementById('data-dropdown');
  dropdown.classList.toggle('open', dataMenuOpen);
  closeFileMenu();
}

function closeDataMenu() {
  dataMenuOpen = false;
  const dropdown = document.getElementById('data-dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

// ===== FEATURE TOGGLES =====
const DEFAULT_FEATURES = {
  closeTheDeals: true,
  overtime: true,
  managementFocus: true,
};

function getFeatureToggles() {
  if (!gameState.featureToggles) {
    gameState.featureToggles = { ...DEFAULT_FEATURES };
  }
  return gameState.featureToggles;
}

function isFeatureEnabled(key) {
  return getFeatureToggles()[key] !== false;
}

function toggleFeature(key, enabled) {
  getFeatureToggles()[key] = enabled;
}

// ===== GAME OPTIONS MODAL =====
function showGameOptions() {
  closeDataMenu();
  const toggles = getFeatureToggles();
  document.getElementById('toggle-deals').checked = toggles.closeTheDeals !== false;
  document.getElementById('toggle-overtime').checked = toggles.overtime !== false;
  document.getElementById('toggle-focus').checked = toggles.managementFocus !== false;
  document.getElementById('event-freq-slider').value = Math.round(EVENT_FREQ_MULT * 100);
  const initTag = EVENT_FREQ_MULT === 0 ? 'off' : EVENT_FREQ_MULT <= 1 ? '' : EVENT_FREQ_MULT <= 3 ? '🔥' : EVENT_FREQ_MULT <= 6 ? '💀' : '☠️';
  document.getElementById('event-freq-label').textContent = `📬 Events: ${EVENT_FREQ_MULT.toFixed(1)}× ${initTag}`;
  document.getElementById('options-modal').classList.remove('hidden');
}

function dismissOptions() {
  document.getElementById('options-modal').classList.add('hidden');
}

// ===== MANAGEMENT FOCUS =====
function clickFocus(sourceIndex) {
  if (!isFeatureEnabled('managementFocus')) return;
  const state = gameState.sources[sourceIndex];
  if (!state || !state.unlocked || state.employees === 0) return;

  if (!state.focus) state.focus = 0;
  state.focus = Math.min(10, state.focus + 1);
  state.lastFocusClick = Date.now();

  // Brief cell flash
  const row = document.getElementById(`source-row-${sourceIndex}`);
  if (row) {
    const nameCell = row.querySelector('[data-field="name"]');
    if (nameCell) {
      nameCell.style.transition = 'background 0.15s';
      nameCell.style.background = dm('#e8f5e9');
      setTimeout(() => { nameCell.style.background = ''; }, 300);
    }
  }
}

function decayFocus() {
  if (!isFeatureEnabled('managementFocus')) return;
  const now = Date.now();
  for (const state of gameState.sources) {
    if (!state.focus || state.focus <= 0) continue;
    const elapsed = now - (state.lastFocusClick || 0);
    // Lose 1 focus point every 10 seconds since last click
    const shouldHave = Math.max(0, (state.focus || 0) - Math.floor(elapsed / 10000));
    if (shouldHave < state.focus) {
      state.focus = shouldHave;
    }
  }
}

// ===== CLOSE THE DEAL =====
const DEAL_CLIENTS = [
  'Acme Corp', 'Globex Industries', 'Initech', 'Umbrella Corp', 'Wayne Enterprises',
  'Stark Industries', 'Cyberdyne Systems', 'Weyland-Yutani', 'Soylent Corp', 'Oscorp',
  'Tyrell Corporation', 'Massive Dynamic', 'Pied Piper', 'Hooli', 'Vandelay Industries',
];

let dealTimer = null;

function spawnDeal() {
  const rev = totalRevPerTick();
  if (rev <= 0) return;

  const seconds = 30 + Math.floor(Math.random() * 31); // 30-60s of revenue
  const amount = rev * seconds;
  const client = DEAL_CLIENTS[Math.floor(Math.random() * DEAL_CLIENTS.length)];
  const clicksNeeded = Math.max(10, Math.min(30, 15 + Math.floor(Math.log10(Math.max(1, totalAnnualRev())) * 2)));
  const timeLimit = 12000; // 12 seconds

  gameState.dealActive = {
    client,
    amount,
    clicksNeeded,
    clicksDone: 0,
    timeLimit,
    startedAt: Date.now(),
  };

  // Use dedicated deal popup (not the event toast)
  const popup = document.getElementById('deal-popup');
  const savedPos = localStorage.getItem('quarterClose_dealPos');
  if (savedPos) {
    const pos = JSON.parse(savedPos);
    popup.style.left = pos.left + 'px';
    popup.style.top = pos.top + 'px';
    popup.style.transform = 'none';
  } else {
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
  }

  document.getElementById('deal-client').textContent = client;
  document.getElementById('deal-body').textContent = `Enterprise contract worth ${formatMoney(amount)}. Click to get signatures before they walk!`;
  document.getElementById('deal-progress-text').textContent = `Signatures: 0 / ${clicksNeeded}`;
  document.getElementById('deal-bar').style.width = '0%';

  const timerFill = document.getElementById('deal-timer-fill');
  timerFill.style.animation = 'none';
  timerFill.offsetHeight; // force reflow
  timerFill.style.animation = `toast-btn-fill ${timeLimit / 1000}s linear forwards`;

  popup.classList.remove('hidden');

  // Timer — auto-fail
  dealTimer = setTimeout(() => {
    failDeal();
  }, timeLimit);
}

function clickDeal() {
  if (!gameState.dealActive) return;
  const deal = gameState.dealActive;
  deal.clicksDone++;

  // Update progress
  const progress = document.getElementById('deal-progress-text');
  if (progress) progress.textContent = `Signatures: ${deal.clicksDone} / ${deal.clicksNeeded}`;
  const bar = document.getElementById('deal-bar');
  if (bar) bar.style.width = (deal.clicksDone / deal.clicksNeeded * 100) + '%';

  if (deal.clicksDone >= deal.clicksNeeded) {
    // Success!
    if (dealTimer) { clearTimeout(dealTimer); dealTimer = null; }
    gameState.cash += deal.amount;
    gameState.totalEarned += deal.amount;
    gameState.quarterRevenue += deal.amount;
    if (gameState.isPublic) gameState.earningsQuarterRevenue += deal.amount;

    document.getElementById('status-text').textContent = `🤝 Closed ${formatMoney(deal.amount)} deal with ${deal.client}!`;
    setTimeout(() => {
      const st = document.getElementById('status-text');
      if (st && st.textContent.startsWith('🤝')) st.textContent = 'Ready';
    }, 3000);

    gameState.dealActive = null;
    document.getElementById('deal-popup').classList.add('hidden');
    updateDisplay();
  }
}

function failDeal() {
  if (!gameState.dealActive) return;
  const deal = gameState.dealActive;
  dealTimer = null;

  document.getElementById('status-text').textContent = `😔 ${deal.client} walked — deal lost`;
  setTimeout(() => {
    const st = document.getElementById('status-text');
    if (st && st.textContent.startsWith('😔')) st.textContent = 'Ready';
  }, 3000);

  gameState.dealActive = null;
  document.getElementById('deal-popup').classList.add('hidden');
}

// ===== OVERTIME =====
function clickOvertime() {
  if (!isFeatureEnabled('overtime')) return;
  const rev = totalRevPerTick();
  if (rev <= 0) return;

  if (!gameState.overtimeClicks) gameState.overtimeClicks = 0;

  // Base = 5 seconds of revenue, diminishing returns
  const diminish = 1 / (1 + gameState.overtimeClicks * 0.15);
  const amount = rev * 5 * diminish;

  gameState.cash += amount;
  gameState.totalEarned += amount;
  gameState.quarterRevenue += amount;
  if (gameState.isPublic) gameState.earningsQuarterRevenue += amount;
  gameState.overtimeClicks++;

  // Status bar feedback
  document.getElementById('status-text').textContent = `⏰ Overtime! +${formatMoney(amount)}`;
  setTimeout(() => {
    const st = document.getElementById('status-text');
    if (st && st.textContent.startsWith('⏰')) st.textContent = 'Ready';
  }, 2000);

  updateOvertimeRow();
  updateDisplay();
}

function updateOvertimeRow() {
  const row = document.getElementById('overtime-row');
  if (!row) return;

  const enabled = isFeatureEnabled('overtime');
  const hasRev = totalRevPerTick() > 0;

  if (!enabled || !hasRev) {
    row.style.display = 'none';
    return;
  }
  row.style.display = '';

  const clicks = gameState.overtimeClicks || 0;
  const rev = totalRevPerTick();
  const nextDiminish = 1 / (1 + clicks * 0.15);
  const nextAmount = rev * 5 * nextDiminish;
  const pct = Math.round(nextDiminish * 100);

  document.getElementById('overtime-clicks').textContent = clicks > 0 ? `${clicks} this Q` : '';
  document.getElementById('overtime-next').textContent = `+${formatMoney(nextAmount)}`;
  document.getElementById('overtime-diminish').textContent = clicks > 0 ? `${pct}% efficiency` : '';
}

function showAbout() {
  closeFileMenu();
  document.getElementById('about-modal').classList.remove('hidden');
}

function dismissAbout() {
  document.getElementById('about-modal').classList.add('hidden');
}

function showHelp() {
  closeFileMenu();
  document.getElementById('help-modal').classList.remove('hidden');
}

function dismissHelp() {
  document.getElementById('help-modal').classList.add('hidden');
}

function showHelpTab(tabId) {
  document.querySelectorAll('.help-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.help-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('help-' + tabId).classList.add('active');
  // Find the tab button that matches
  document.querySelectorAll('.help-tab').forEach(t => {
    if (t.getAttribute('onclick').includes(tabId)) t.classList.add('active');
  });
}

let pendingConfirmAction = null;

function confirmNewGame() {
  closeFileMenu();
  document.getElementById('confirm-text').textContent = 'Start a new game? All progress will be lost.';
  document.getElementById('confirm-modal').classList.remove('hidden');
  pendingConfirmAction = () => {
    resetGame();
    dismissConfirm();
  };
}

function confirmAction() {
  if (pendingConfirmAction) pendingConfirmAction();
  pendingConfirmAction = null;
}

function dismissConfirm() {
  document.getElementById('confirm-modal').classList.add('hidden');
  pendingConfirmAction = null;
}

// Close file menu when clicking anywhere else
document.addEventListener('click', (e) => {
  // Golden cell click
  const goldenEl = e.target.closest('.golden-cell');
  if (goldenEl && clickGoldenCell(goldenEl)) return;

  if (fileMenuOpen && !e.target.closest('#file-menu')) {
    closeFileMenu();
  }
  if (dataMenuOpen && !e.target.closest('#data-menu')) {
    closeDataMenu();
  }

  // Formula bar: update cell reference on click
  const cell = e.target.closest('.cell');
  if (cell) {
    const row = cell.closest('.grid-row');
    if (row) {
      const colMap = { 'cell-a': 'A', 'cell-b': 'B', 'cell-c': 'C', 'cell-d': 'D',
                       'cell-e': 'E', 'cell-f': 'F', 'cell-g': 'G', 'cell-h': 'H' };
      let col = '';
      for (const [cls, letter] of Object.entries(colMap)) {
        if (cell.classList.contains(cls)) { col = letter; break; }
      }
      const rowNumEl = row.querySelector('.row-num');
      const rowNum = rowNumEl ? rowNumEl.textContent : '';
      if (col && rowNum) {
        const ref = col + rowNum;
        document.getElementById('cell-ref').textContent = ref;
        const text = cell.textContent.trim();
        document.getElementById('formula-input').textContent = text || '';
        // Highlight only non-interactive cells (skip action columns on source rows)
        document.querySelectorAll('.cell.selected-cell').forEach(c => c.classList.remove('selected-cell'));
        const isActionCol = cell.matches('[data-field="action1"], [data-field="action2"], [data-field="action3"]');
        if (!isActionCol) {
          cell.classList.add('selected-cell');
        }
      }
    }
  }
});

// ===== PHASE 2.1: IPO + EARNINGS =====
const IPO_VALUATION_THRESHOLD = 5e12; // $5T
const EARNINGS_QUARTER_DAYS = 90;
const GUIDANCE_LEVELS = {
  conservative: { label: 'Conservative', pct: 0.70, reMult: 0.5, emoji: '🛡️' },
  'in-line':    { label: 'In-Line',      pct: 0.90, reMult: 1.0, emoji: '📊' },
  ambitious:    { label: 'Ambitious',    pct: 1.10, reMult: 2.0, emoji: '🎯' },
  aggressive:   { label: 'Aggressive',   pct: 1.30, reMult: 3.0, emoji: '🔥' },
};

let ipoOffered = false; // track if we've already shown the IPO prompt this session

function getStockPrice() {
  if (!gameState.isPublic) return 0;
  return getCompanyValuation() / gameState.sharesOutstanding;
}

function checkIPOTrigger() {
  if (gameState.isPublic || ipoOffered) return;
  const val = getCompanyValuation();
  if (val >= IPO_VALUATION_THRESHOLD) {
    ipoOffered = true;
    showIPOModal();
  }
}

function showIPOModal() {
  showEventToast('Goldman Sachs', '📈 Investment Banks Are Calling',
    `Your company valuation has reached ${formatCompact(getCompanyValuation())}. Major investment banks want to take you public.\n\nAn IPO would make your company publicly traded with 1B shares outstanding. You\'ll need to report quarterly earnings and manage investor expectations.\n\nAre you ready for Wall Street?`,
    [
      { label: '🔔 Ring the Bell — Go Public!', effect: (gs) => {
        executeIPO();
        return '🎉 IPO complete! Welcome to the public markets. Your stock is now trading.';
      }},
      { label: 'Not yet', effect: () => {
        ipoOffered = false; // allow re-trigger
        return 'You declined the IPO. The bankers will call back when you\'re ready.';
      }},
    ], { expiresMs: 0 });
}

function executeIPO() {
  const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  gameState.isPublic = true;
  gameState.ipoDay = currentDay;
  gameState.sharesOutstanding = 1000000000;
  gameState.lastEarningsDay = currentDay;
  gameState.earningsQuarterRevenue = 0;
  gameState.currentGuidance = 'in-line';
  gameState.analystBaseline = 1.0;
  gameState.earningsStreak = 0;
  gameState.retainedEarnings = 0;

  // Set initial guidance target
  const projectedRevenue = totalRevPerTick() * EARNINGS_QUARTER_DAYS * gameState.analystBaseline;
  const level = GUIDANCE_LEVELS[gameState.currentGuidance];
  gameState.guidanceTarget = Math.floor(projectedRevenue * level.pct);
  gameState.ipoStockPriceStart = getStockPrice();

  // Rebuild the grid to show IR section
  _lastTaxPanelHash = '';
  updateTaxPanel();
  buildFillerRows();
  updateBoardRoomTab();
}

function forceIPO() {
  if (gameState.isPublic) return;
  executeIPO();
  document.getElementById('status-text').textContent = '🧪 Debug IPO triggered! You\'re public.';
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 3000);
}

function resetBoardRoom() {
  gameState.boardRoomPurchases = {};
  gameState.retainedEarnings = 0;
  gameState.activeCFOLevel = 0;
  gameState.activeCTOLevel = 0;
  gameState.ctoBudgetPct = 15;
  gameState.ctoSpentThisQuarter = 0;
  gameState.ctoBudgetPool = 0;
  gameState.ctoBudgetAuto = false;
  gameState.activeCOOLevel = 0;
  gameState.cooBudgetPct = 15;
  gameState.cooSpentThisQuarter = 0;
  gameState.cooBudgetPool = 0;
  gameState.cooHireCount = 0;
  gameState.cfoRecords = {};
  gameState.revenueHistory = [];
  gameState.lastQuarterRE = 0;
  if (gameState.activeTab === 'boardroom') renderBoardRoom();
  _lastTaxPanelHash = '';
  updateTaxPanel();
  document.getElementById('status-text').textContent = '🧪 Board Room reset — all upgrades cleared, RE set to 0.';
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 3000);
}

function setGuidance(level) {
  if (!gameState.isPublic) return;
  gameState.currentGuidance = level;
  const projectedRevenue = totalRevPerTick() * EARNINGS_QUARTER_DAYS * gameState.analystBaseline;
  const guidanceLevel = GUIDANCE_LEVELS[level];
  gameState.guidanceTarget = Math.floor(projectedRevenue * guidanceLevel.pct);
  _lastTaxPanelHash = ''; // force IR section rebuild
  updateTaxPanel();
}

function getEarningsQuarterLabel() {
  if (!gameState.isPublic) return '';
  const currentDay = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  const daysSinceIPO = currentDay - gameState.ipoDay;
  const quarterNum = Math.floor(daysSinceIPO / EARNINGS_QUARTER_DAYS);
  return `Q${(quarterNum % 4) + 1}`;
}

function processEarnings() {
  if (!gameState.isPublic) return;

  const qRevenue = gameState.earningsQuarterRevenue;
  const target = gameState.guidanceTarget;
  const guidanceKey = gameState.currentGuidance || 'in-line';
  const guidanceLevel = GUIDANCE_LEVELS[guidanceKey];
  const qLabel = getEarningsQuarterLabel();

  // Calculate beat/miss
  let margin = 0;
  if (target > 0) {
    margin = (qRevenue - target) / target;
  }

  let result, stockChange, reEarned;
  const isInLine = Math.abs(margin) <= 0.05;

  if (qRevenue >= target) {
    // Beat or in-line
    if (isInLine) {
      result = 'IN-LINE';
      stockChange = 0.01 + Math.random() * 0.04; // +1% to +5%
    } else {
      result = 'BEAT';
      // Stock jump: +5% to +30%, scaled by margin and guidance risk
      const marginBonus = Math.min(margin, 0.5); // cap at 50% over
      stockChange = 0.05 + marginBonus * 0.4 + (guidanceLevel.reMult - 0.5) * 0.02;
      stockChange = Math.min(stockChange, 0.30);
    }

    // RE calculation — logarithmic scale so it doesn't explode at high revenue
    const marginBonusMult = 1 + Math.min(margin, 0.5); // up to 1.5× for blowout
    const streakMult = gameState.earningsStreak >= 0 ?
      Math.min(2.0, 1 + gameState.earningsStreak * 0.1) : 1;
    // Base RE = 5 × log10(qRev)² — quadratic log so revenue growth meaningfully boosts RE
    const baseRE = qRevenue > 0 ? Math.floor(5 * Math.pow(Math.log10(qRevenue), 2)) : 0;
    reEarned = Math.floor(baseRE * guidanceLevel.reMult * marginBonusMult * streakMult);

    gameState.retainedEarnings += reEarned;
    gameState.earningsStreak = Math.max(0, gameState.earningsStreak) + 1;

    // Analyst ratchet (slowed by Analyst Relations upgrade)
    const hasAnalystRelations = hasBoardRoomUpgrade('analyst_relations');
    if (gameState.earningsStreak >= 3) {
      gameState.analystBaseline *= hasAnalystRelations ? 1.03 : 1.05; // was 1.075/1.15 — too aggressive
    } else {
      gameState.analystBaseline *= hasAnalystRelations ? 1.01 : 1.02;
    }
    // Cap analyst baseline so expectations can't become literally impossible
    gameState.analystBaseline = Math.min(gameState.analystBaseline, 2.5);
  } else {
    // Miss
    if (isInLine) {
      result = 'IN-LINE';
      stockChange = -(0.01 + Math.random() * 0.04); // -1% to -5%
      reEarned = 0;
      gameState.earningsStreak = 0;
      gameState.analystBaseline *= 0.97;
    } else {
      result = 'MISS';
      const missMargin = Math.abs(margin);
      stockChange = -(0.05 + missMargin * 0.4 + (guidanceLevel.reMult - 0.5) * 0.02);
      stockChange = Math.max(stockChange, -0.25);
      reEarned = 0;

      gameState.earningsStreak = Math.min(0, gameState.earningsStreak) - 1;

      // Analyst ratchet (downgrade not affected by Analyst Relations)
      if (gameState.earningsStreak <= -2) {
        gameState.analystBaseline *= 0.90; // analyst downgrade
      } else {
        gameState.analystBaseline *= 0.97;
      }
    }
  }
  // Floor analyst baseline — can't go below 0.5
  gameState.analystBaseline = Math.max(0.5, gameState.analystBaseline);

  // Apply stock price change via valuation manipulation
  // We affect the market sentiment to create the price jump
  const currentPrice = getStockPrice();
  // Shift market sentiment to create the target price change
  // noise = 1 + marketSentiment * 0.015, so to move price by X%, we need to shift sentiment
  // But we want a discrete jump, so we'll adjust a persistent earnings multiplier instead
  if (!gameState._earningsMultiplier) gameState._earningsMultiplier = 1.0;
  gameState._earningsMultiplier *= (1 + stockChange);
  // Floor at 0.1 so valuation can't be completely destroyed
  gameState._earningsMultiplier = Math.max(0.1, gameState._earningsMultiplier);
  // Gentle mean-reversion toward 1.0 (5% per quarter)
  gameState._earningsMultiplier += (1.0 - gameState._earningsMultiplier) * 0.05;

  const newPrice = getStockPrice();

  // Reset for next quarter
  const oldQuarterRev = gameState.earningsQuarterRevenue;
  gameState.earningsQuarterRevenue = 0;
  gameState.lastQuarterRE = reEarned;

  // Show earnings modal with next quarter guidance selection
  const marginPct = (margin * 100).toFixed(1);
  const resultEmoji = result === 'BEAT' ? '📈' : result === 'MISS' ? '📉' : '➡️';
  const streakBonus = gameState.earningsStreak >= 1 ?
    Math.min(2.0, 1 + gameState.earningsStreak * 0.1) : 1;
  const streakText = gameState.earningsStreak > 1 ? `🔥 ${gameState.earningsStreak} consecutive beats (${streakBonus.toFixed(1)}× RE)` :
                     gameState.earningsStreak < -1 ? `❄️ ${Math.abs(gameState.earningsStreak)} consecutive misses` : '';
  const analystText = gameState.earningsStreak >= 3 ? 'Analyst Upgrade ⬆️' :
                      gameState.earningsStreak <= -2 ? 'Analyst Downgrade ⬇️' : '';

  const stockPctStr = (stockChange >= 0 ? '+' : '') + (stockChange * 100).toFixed(1) + '%';

  // Track revenue history for CFO trend analysis (keep last 3)
  gameState.revenueHistory.push(oldQuarterRev);
  if (gameState.revenueHistory.length > 3) gameState.revenueHistory.shift();

  // Finance Dept: auto-process earnings without modal
  const activeCFO = gameState.activeCFOLevel;
  if (activeCFO > 0 && getFinanceDeptLevel() >= activeCFO) {
    // Record CFO performance
    if (!gameState.cfoRecords[activeCFO]) gameState.cfoRecords[activeCFO] = { beats: 0, total: 0 };
    gameState.cfoRecords[activeCFO].total++;
    if (result === 'BEAT' || result === 'IN-LINE') {
      gameState.cfoRecords[activeCFO].beats++;
    }

    // Pick guidance for NEXT quarter using CFO algorithm
    const nextGuidance = pickCFOGuidance(activeCFO);
    setGuidance(nextGuidance);

    // Status bar notification instead of modal
    const reStr = reEarned > 0 ? ` +${reEarned} RE` : '';
    const cfoLabel = activeCFO === 1 ? 'Intern' : activeCFO === 2 ? 'CFO' : 'Elite CFO';
    document.getElementById('status-text').textContent = `${resultEmoji} ${qLabel} ${result} (${marginPct > 0 ? '+' : ''}${marginPct}%) | Stock ${stockPctStr}${reStr} [${cfoLabel}]`;
    setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 5000);

    // Record stock price at start of new quarter
    gameState.ipoStockPriceStart = getStockPrice();
    return;
  }

  showEarningsModal({
    qLabel,
    revenue: oldQuarterRev,
    target,
    guidanceKey,
    result,
    resultEmoji,
    marginPct,
    stockChange: stockPctStr,
    reEarned,
    streakText,
    analystText,
  });

  // Pause game while earnings modal is open
  gameState.earningsPaused = true;

  // Record stock price at start of new quarter
  gameState.ipoStockPriceStart = getStockPrice();
}

function showEarningsModal(data) {
  const guidanceLabel = GUIDANCE_LEVELS[data.guidanceKey].label;
  const body = `<div class="earnings-report">
    <div class="er-row"><span class="er-label">Revenue</span><span class="er-value">${formatMoney(data.revenue)}</span></div>
    <div class="er-row"><span class="er-label">Guidance</span><span class="er-value">${formatMoney(data.target)} (${guidanceLabel})</span></div>
    <div class="er-row er-result"><span class="er-label">Result</span><span class="er-value">${data.result} ${data.resultEmoji} (${data.marginPct > 0 ? '+' : ''}${data.marginPct}%)</span></div>
    <div class="er-divider"></div>
    <div class="er-row"><span class="er-label">Stock</span><span class="er-value">${data.stockChange}</span></div>
    <div class="er-row"><span class="er-label">RE Earned</span><span class="er-value er-re">+${data.reEarned} RE</span></div>
    ${data.streakText ? `<div class="er-row"><span class="er-label">Streak</span><span class="er-value">${data.streakText}</span></div>` : ''}
    ${data.analystText ? `<div class="er-row"><span class="er-label">Analysts</span><span class="er-value">${data.analystText}</span></div>` : ''}
    <div class="er-divider"></div>
    <div class="er-prompt">Set next quarter guidance:</div>
  </div>`;

  // Build actions — 4 guidance buttons + close
  const actions = Object.entries(GUIDANCE_LEVELS).map(([key, level]) => ({
    label: `${level.emoji} ${level.label} (${Math.round(level.pct * 100)}%)`,
    effect: (gs) => {
      gs.earningsPaused = false;
      setGuidance(key);
      return `${data.qLabel} earnings reported. Next quarter: ${level.label} guidance set.`;
    },
  }));

  showEventToast('Investor Relations', `${data.qLabel} EARNINGS REPORT`,
    body, actions, { expiresMs: 0, closable: false, html: true });
}

function trackEarningsRevenue(amount) {
  if (gameState.isPublic) {
    gameState.earningsQuarterRevenue += amount;
  }
}

// Expose
window.forceIPO = forceIPO;
window.resetBoardRoom = resetBoardRoom;
window.setActiveCFOLevel = setActiveCFOLevel;
window.setActiveCTOLevel = setActiveCTOLevel;
window.setCtoBudgetPct = setCtoBudgetPct;
window.setActiveCOOLevel = setActiveCOOLevel;
window.setCooBudgetPct = setCooBudgetPct;
window.toggleCtoBudgetAuto = toggleCtoBudgetAuto;
window.setGuidance = setGuidance;

// ===== BOARD ROOM (Phase 2.2) =====
function switchTab(tab) {
  gameState.activeTab = tab;

  const revenueRows = document.getElementById('revenue-rows');
  const taxPanel = document.getElementById('tax-panel');
  const fillerRows = document.getElementById('filler-rows');
  const boardRoom = document.getElementById('board-room-rows');
  const tabOps = document.getElementById('tab-operations');
  const tabBR = document.getElementById('tab-board-room');

  const gridArea = document.getElementById('grid-container');

  if (tab === 'boardroom') {
    revenueRows.classList.add('hidden');
    taxPanel.classList.add('hidden');
    fillerRows.classList.add('hidden');
    boardRoom.classList.remove('hidden');
    tabOps.classList.remove('active');
    tabBR.classList.add('active');
    gridArea.classList.add('boardroom-layout');
    buildBoardRoom();
  } else {
    revenueRows.classList.remove('hidden');
    taxPanel.classList.remove('hidden');
    fillerRows.classList.remove('hidden');
    boardRoom.classList.add('hidden');
    tabOps.classList.add('active');
    tabBR.classList.remove('active');
    gridArea.classList.remove('boardroom-layout');
    _lastTaxPanelHash = ''; // force rebuild
    updateTaxPanel();
    buildFillerRows();
  }
}

function updateBoardRoomTab() {
  const tabBR = document.getElementById('tab-board-room');
  if (gameState.isPublic) {
    tabBR.classList.remove('hidden');
  } else {
    tabBR.classList.add('hidden');
  }
}

let _lastBoardRoomHash = '';

function buildBoardRoom() {
  const container = document.getElementById('board-room-rows');
  if (!container) return;

  // Hash for change detection
  const hashParts = [
    gameState.retainedEarnings,
    JSON.stringify(gameState.boardRoomPurchases),
  ].join('|');
  if (hashParts === _lastBoardRoomHash && container.innerHTML !== '') return;
  _lastBoardRoomHash = hashParts;

  let html = '';
  let rowNum = 3; // starts after the header rows (1-2)

  // Board Room header
  html += `<div class="grid-row br-header-row">
    <div class="row-num">${rowNum++}</div>
    <div class="cell cell-a" style="font-weight:700;color:${dm('#7b1fa2')}">BOARD ROOM</div>
    <div class="cell cell-b" style="font-weight:600;color:${dm('#666')};font-size:10px">Category</div>
    <div class="cell cell-c" style="font-weight:600;color:${dm('#666')};font-size:10px;justify-content:flex-end">Cost</div>
    <div class="cell cell-d" style="font-weight:600;color:${dm('#666')};font-size:10px;justify-content:flex-end">Status</div>
    <div class="cell cell-e"></div>
    <div class="cell cell-f" style="font-weight:700;color:${dm('#7b1fa2')};font-family:Consolas,monospace;font-size:12px">${gameState.retainedEarnings.toLocaleString()} RE</div>
    <div class="cell cell-g"></div>
    <div class="cell cell-h"></div>
  </div>`;

  // Separator
  html += `<div class="grid-row">
    <div class="row-num">${rowNum++}</div>
    <div class="cell cell-a sep-cell"></div><div class="cell cell-b sep-cell"></div>
    <div class="cell cell-c sep-cell"></div><div class="cell cell-d sep-cell"></div>
    <div class="cell cell-e sep-cell"></div><div class="cell cell-f sep-cell"></div>
    <div class="cell cell-g sep-cell"></div><div class="cell cell-h sep-cell"></div>
  </div>`;

  // Group upgrades by category, sort each group by cost ascending
  const categoryOrder = ['Expansion', 'Revenue', 'Talent', 'Finance', 'Technology', 'Operations', 'Tax', 'Investor', 'Protection'];
  const categoryLabels = {
    Expansion: '🌍 Market Expansion',
    Revenue: '💰 Revenue',
    Talent: '🎓 Talent Acquisition',
    Finance: '📊 Finance',
    Technology: '🔧 Technology',
    Operations: '📋 Operations',
    Tax: '🏛️ Tax',
    Investor: '📈 Investor Relations',
    Protection: '🛡️ Protection',
  };
  const grouped = {};
  for (const upgrade of BOARD_ROOM_UPGRADES) {
    if (!grouped[upgrade.category]) grouped[upgrade.category] = [];
    grouped[upgrade.category].push(upgrade);
  }
  // Sort each group by effective cost
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => getUpgradeCost(a) - getUpgradeCost(b));
  }

  let totalUpgradeRows = 0;
  for (const cat of categoryOrder) {
    const upgrades = grouped[cat];
    if (!upgrades || upgrades.length === 0) continue;

    // Category header row
    html += `<div class="grid-row br-category-row">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:700;color:${dm('#555')};font-size:11px;border-bottom:1px solid ${dm('#ccc')}">${categoryLabels[cat] || cat}</div>
      <div class="cell cell-b" style="border-bottom:1px solid ${dm('#ccc')}"></div>
      <div class="cell cell-c" style="border-bottom:1px solid ${dm('#ccc')}"></div>
      <div class="cell cell-d" style="border-bottom:1px solid ${dm('#ccc')}"></div>
      <div class="cell cell-e" style="border-bottom:1px solid ${dm('#ccc')}"></div>
      <div class="cell cell-f" style="border-bottom:1px solid ${dm('#ccc')}"></div>
      <div class="cell cell-g" style="border-bottom:1px solid ${dm('#ccc')}"></div>
      <div class="cell cell-h" style="border-bottom:1px solid ${dm('#ccc')}"></div>
    </div>`;
    totalUpgradeRows++;

    for (const upgrade of upgrades) {
    const owned = getBoardRoomUpgradeCount(upgrade.id);
    const isOwned = owned > 0 && upgrade.maxCount !== Infinity;
    const requiresMet = (!upgrade.requires || hasBoardRoomUpgrade(upgrade.requires)) && (!upgrade.customRequires || upgrade.customRequires());
    const cost = getUpgradeCost(upgrade);
    const canAfford = gameState.retainedEarnings >= cost;
    const isLocked = !requiresMet;

    let statusCell = '';
    let rowClass = 'grid-row br-upgrade-row';

    if (isOwned) {
      rowClass += ' br-owned';
      const label = upgrade.maxCount === 1 ? '✅ Owned' : `✅ Owned (×${owned})`;
      statusCell = `<span class="br-owned-badge">${label}</span>`;
    } else if (isLocked) {
      rowClass += ' br-locked';
      if (upgrade.customRequires && !upgrade.customRequires()) {
        statusCell = `<span class="br-locked-badge">🔒 Requires CFO + CTO</span>`;
      } else {
        const reqUpgrade = BOARD_ROOM_UPGRADES.find(u => u.id === upgrade.requires);
        const reqName = reqUpgrade ? reqUpgrade.name : upgrade.requires;
        statusCell = `<span class="br-locked-badge">🔒 Requires ${reqName}</span>`;
      }
    } else {
      // Buyable
      const countLabel = upgrade.maxCount === Infinity && owned > 0 ? ` (have ${owned})` : '';
      statusCell = `<button class="cell-btn btn-buy-re" data-buy-upgrade="${upgrade.id}" ${canAfford ? '' : 'disabled'}>Buy${countLabel}</button>`;
    }

    const costColor = dm(isOwned ? '#999' : isLocked ? '#ccc' : canAfford ? '#7b1fa2' : '#c00');

    const costLabel = upgrade.maxCount === Infinity && owned > 0
      ? `${cost.toLocaleString()} RE (×${owned})`
      : `${cost.toLocaleString()} RE`;

    // Dynamic description for Growth Initiative — show total bonus
    let desc = upgrade.desc;
    if (upgrade.id === 'growth_initiative' && owned > 0) {
      const totalBonus = ((Math.pow(1.02, owned) - 1) * 100).toFixed(1);
      desc = `+2% revenue per purchase (stacks). Current: +${totalBonus}% total (×${owned})`;
    }

    html += `<div class="${rowClass}">
      <div class="row-num">${rowNum++}</div>
      <div class="cell cell-a" style="font-weight:500;${isLocked ? `color:${dm('#bbb')}` : ''}">${upgrade.name}</div>
      <div class="cell cell-b" style="font-size:10px;color:${dm('#888')}">${upgrade.category}</div>
      <div class="cell cell-c" style="font-family:Consolas,monospace;font-size:11px;color:${costColor};justify-content:flex-end">${costLabel}</div>
      <div class="cell cell-d" style="justify-content:flex-end">${statusCell}</div>
      <div class="cell cell-e" style="font-size:10px;color:${dm('#888')};white-space:normal;line-height:1.3">${desc}</div>
      <div class="cell cell-f"></div>
      <div class="cell cell-g"></div>
      <div class="cell cell-h"></div>
    </div>`;
    totalUpgradeRows++;
    } // end upgrade loop
  } // end category loop

  // Filler rows for the board room view
  const ROW_HEIGHT = 28;
  const gridBottom = container.getBoundingClientRect().top || 300;
  const viewportHeight = window.innerHeight;
  const revBar = document.getElementById('revenue-breakdown');
  const sheetTabs = document.getElementById('sheet-tabs');
  const statusBar = document.getElementById('status-bar');
  const bottomChrome = (revBar ? revBar.offsetHeight : 0) +
                        (sheetTabs ? sheetTabs.offsetHeight : 0) +
                        (statusBar ? statusBar.offsetHeight : 0);
  const usedRows = totalUpgradeRows + 3; // header + sep + upgrades + category headers
  const available = viewportHeight - gridBottom - bottomChrome - (usedRows * ROW_HEIGHT);
  const fillerCount = Math.max(3, Math.ceil(available / ROW_HEIGHT) + 1);

  for (let i = 0; i < fillerCount; i++) {
    html += `<div class="filler-row">
      <div class="row-num">${rowNum + i}</div>
      <div class="cell"></div><div class="cell"></div><div class="cell"></div>
      <div class="cell"></div><div class="cell"></div><div class="cell"></div>
      <div class="cell"></div><div class="cell"></div>
    </div>`;
  }

  container.innerHTML = html;
}

function purchaseBoardRoomUpgrade(id) {
  const upgrade = BOARD_ROOM_UPGRADES.find(u => u.id === id);
  if (!upgrade) return;

  const owned = getBoardRoomUpgradeCount(id);
  if (owned >= upgrade.maxCount) return;
  if (upgrade.requires && !hasBoardRoomUpgrade(upgrade.requires)) return;
  if (upgrade.customRequires && !upgrade.customRequires()) return;
  const cost = getUpgradeCost(upgrade);
  if (gameState.retainedEarnings < cost) return;

  gameState.retainedEarnings -= cost;
  gameState.boardRoomPurchases[id] = (gameState.boardRoomPurchases[id] || 0) + 1;

  // Auto-activate Finance Dept when first purchased
  if (id === 'finance_dept_1' && gameState.activeCFOLevel === 0) {
    gameState.activeCFOLevel = 1;
  } else if (id === 'finance_dept_2' && gameState.activeCFOLevel <= 1) {
    gameState.activeCFOLevel = 2;
  } else if (id === 'finance_dept_3' && gameState.activeCFOLevel <= 2) {
    gameState.activeCFOLevel = 3;
  }

  // Auto-activate Tech Dept when first purchased
  if (id === 'tech_dept_1' && gameState.activeCTOLevel === 0) {
    gameState.activeCTOLevel = 1;
  } else if (id === 'tech_dept_2' && gameState.activeCTOLevel <= 1) {
    gameState.activeCTOLevel = 2;
  } else if (id === 'tech_dept_3' && gameState.activeCTOLevel <= 2) {
    gameState.activeCTOLevel = 3;
  }

  // CapEx Planning: enable CFO auto-budget for CTO
  if (id === 'capex_planning') {
    gameState.ctoBudgetAuto = true;
  }

  // Status bar feedback
  document.getElementById('status-text').textContent = `🏢 Purchased: ${upgrade.name}`;
  setTimeout(() => { document.getElementById('status-text').textContent = 'Ready'; }, 3000);

  _lastBoardRoomHash = ''; // force rebuild
  buildBoardRoom();
  _lastTaxPanelHash = ''; // force IR section rebuild (RE changed)
  updateDisplay();
  saveGame();
}

// ===== INITIALIZATION =====
// ===== DARK MODE =====
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.getElementById('dark-mode-toggle').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('qc-dark-mode', isDark ? '1' : '0');
  // Force re-render of panels that use inline colors
  _lastTaxPanelHash = '';
  updateTaxPanel();
  renderBoardRoom();
}

function initDarkMode() {
  if (localStorage.getItem('qc-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').textContent = '☀️';
  }
}

// Dark-mode aware color mapper for inline styles
function dm(lightColor) {
  if (!document.body.classList.contains('dark-mode')) return lightColor;
  const map = {
    '#333': '#d0d0d0', '#444': '#c0c0c0', '#555': '#b0b0b0',
    '#666': '#a0a0a0', '#888': '#909090', '#999': '#808080',
    '#aaa': '#707070', '#bbb': '#606060', '#ccc': '#505050',
    '#212121': '#e0e0e0',
    '#c00': '#ef5350', '#c7254e': '#ef5350', '#900': '#ef5350', '#c60': '#ff9800',
    '#0078d4': '#4da6ff', '#1565c0': '#64b5f6',
    '#217346': '#217346', '#2e7d32': '#66bb6a', '#0b6623': '#4caf50',
    '#7b1fa2': '#ba68c8', '#6a1b9a': '#9c27b0',
    '#e65100': '#ff9800',
    '#f0f0f0': '#1e1e1e', '#f5f5f5': '#2d2d2d', '#f8f8f8': '#2a2a2a',
    '#fff': '#2d2d2d', '#ffffff': '#2d2d2d', 'white': '#2d2d2d',
    '#e0e0e0': '#333333', '#d0d0d0': '#3a3a3a', '#c0c0c0': '#444444',
    '#d4a017': '#ffd54f', '#8d6e0f': '#ffd54f',
    '#eee': '#333333',
    '#e8f0fe': '#2a3540', '#e8f5e9': '#1a3a25',
    '#b8860b': '#daa520', '#ddd': '#3a3a3a', '#dea': '#3a3520',
    '#4472C4': '#5b9bd5', '#4472c4': '#5b9bd5',
  };
  return map[lightColor.toLowerCase()] || lightColor;
}

window.toggleDarkMode = toggleDarkMode;

function init() {
  initDarkMode();
  generateBossGrid();
  initChartDrag();
  initToastDrag();
  initDebugTap();

  // Delegated click handler for tax panel buttons (survives innerHTML rebuilds)
  document.getElementById('tax-panel').addEventListener('click', (e) => {
    // P&L collapse toggle
    const togglePnl = e.target.closest('[data-toggle-pnl]');
    if (togglePnl) {
      gameState.pnlCollapsed = !gameState.pnlCollapsed;
      _lastTaxPanelHash = ''; // force rebuild
      updateTaxPanel();
      return;
    }
    const settleBtn = e.target.closest('[data-settle]');
    if (settleBtn) {
      e.stopPropagation();
      settleTaxDebt(parseInt(settleBtn.dataset.settle));
      return;
    }
    const settleAllBtn = e.target.closest('[data-settle-all]');
    if (settleAllBtn) {
      e.stopPropagation();
      settleAllTax();
      return;
    }
  });

  // Delegated click handler for Board Room buy buttons
  document.getElementById('board-room-rows').addEventListener('click', (e) => {
    const buyBtn = e.target.closest('[data-buy-upgrade]');
    if (buyBtn) {
      e.stopPropagation();
      purchaseBoardRoomUpgrade(buyBtn.dataset.buyUpgrade);
      return;
    }
  });

  const loaded = loadGame();
  if (!loaded) {
    showArcSelect();
  }
  setInterval(gameTick, 1000);

  // Splash screen animation
  const splash = document.getElementById('splash-screen');
  if (splash) {
    requestAnimationFrame(() => {
      const bar = document.getElementById('splash-progress-bar');
      if (bar) bar.style.width = '100%';
    });
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 500);
    }, 2500);
  }
}

// Expose for inline onclick
// ===== VALUATION CHART =====
const MAX_VALUATION_POINTS = 200;
let valuationTickCounter = 0;
let chartPositioned = false;
let chartDragState = null;
let marketSentiment = 0; // random walk: drifts between -1 and 1

function initChartDrag() {
  const container = document.getElementById('valuation-chart-container');
  const handle = container.querySelector('.chart-resize-handle');

  // Drag (move) — on the container itself
  container.addEventListener('mousedown', (e) => {
    if (e.target === handle) return; // let resize handle its own
    e.preventDefault();
    const rect = container.getBoundingClientRect();
    chartDragState = { type: 'move', startX: e.clientX, startY: e.clientY, origLeft: rect.left, origTop: rect.top };
  });

  container.addEventListener('touchstart', (e) => {
    if (e.target === handle) return;
    const t = e.touches[0];
    const rect = container.getBoundingClientRect();
    chartDragState = { type: 'move', startX: t.clientX, startY: t.clientY, origLeft: rect.left, origTop: rect.top };
  }, { passive: true });

  // Resize — on the handle
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    chartDragState = { type: 'resize', startX: e.clientX, startY: e.clientY, origW: container.offsetWidth, origH: container.offsetHeight };
  });

  handle.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    const t = e.touches[0];
    chartDragState = { type: 'resize', startX: t.clientX, startY: t.clientY, origW: container.offsetWidth, origH: container.offsetHeight };
  }, { passive: true });

  document.addEventListener('mousemove', (e) => {
    if (!chartDragState) return;
    if (chartDragState.type === 'move') {
      const dx = e.clientX - chartDragState.startX;
      const dy = e.clientY - chartDragState.startY;
      container.style.left = (chartDragState.origLeft + dx) + 'px';
      container.style.top = (chartDragState.origTop + dy) + 'px';
      container.style.right = 'auto';
    } else if (chartDragState.type === 'resize') {
      const dx = e.clientX - chartDragState.startX;
      const dy = e.clientY - chartDragState.startY;
      const newW = Math.max(200, chartDragState.origW + dx);
      const newH = Math.max(140, chartDragState.origH + dy);
      container.style.width = newW + 'px';
      container.style.height = newH + 'px';
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (!chartDragState) return;
    const t = e.touches[0];
    if (chartDragState.type === 'move') {
      const dx = t.clientX - chartDragState.startX;
      const dy = t.clientY - chartDragState.startY;
      container.style.left = (chartDragState.origLeft + dx) + 'px';
      container.style.top = (chartDragState.origTop + dy) + 'px';
      container.style.right = 'auto';
    } else if (chartDragState.type === 'resize') {
      const dx = t.clientX - chartDragState.startX;
      const dy = t.clientY - chartDragState.startY;
      const newW = Math.max(200, chartDragState.origW + dx);
      const newH = Math.max(140, chartDragState.origH + dy);
      container.style.width = newW + 'px';
      container.style.height = newH + 'px';
    }
  }, { passive: true });

  document.addEventListener('mouseup', () => {
    chartDragState = null;
  });

  document.addEventListener('touchend', () => {
    chartDragState = null;
  });
}

function positionChartDefault() {
  const container = document.getElementById('valuation-chart-container');
  // Position to the right of column G (Rev/yr)
  const cell = document.querySelector('#row-1 .cell-g');
  if (!cell) {
    // Fallback: top-right area
    container.style.right = '20px';
    container.style.top = '80px';
    container.style.width = '300px';
    container.style.height = '200px';
    chartPositioned = true;
    return;
  }
  const gRect = cell.getBoundingClientRect();
  container.style.left = (gRect.right + 12) + 'px';
  container.style.top = gRect.top + 'px';
  container.style.width = '560px';
  container.style.height = '340px';
  chartPositioned = true;
}

function getCompanyValuation() {
  // Valuation = cash + annual revenue × revenue multiple
  // Multiple = base (size) × growth modifier × small random noise
  const annualRev = totalRevPerTick() * 365.25;

  // Base multiple scales with company size
  const baseMult = annualRev > 1e9 ? 15 : annualRev > 1e8 ? 12 : annualRev > 1e7 ? 10 : annualRev > 1e6 ? 8 : 5;

  // Growth rate modifier — very mild, just enough to notice
  let growthMod = 1.0;
  const hist = gameState.valuationHistory;
  if (hist && hist.length >= 10) {
    const oldVal = hist[hist.length - 10].val;
    const currentVal = gameState.cash + annualRev * baseMult;
    if (oldVal > 0) {
      const growthRate = (currentVal - oldVal) / oldVal;
      if (growthRate > 0.5) growthMod = 1.08;
      else if (growthRate > 0.2) growthMod = 1.05;
      else if (growthRate > 0.05) growthMod = 1.02;
      else if (growthRate > -0.05) growthMod = 1.0;
      else if (growthRate > -0.2) growthMod = 0.97;
      else growthMod = 0.95;
    }
  }

  // Market sentiment — fractal noise with volatility clustering
  // Volatility itself is a random walk (calm periods → chaotic bursts)
  if (!gameState._volState) gameState._volState = 0.3;
  gameState._volState += (Math.random() - 0.5) * 0.1;
  gameState._volState = Math.max(0.05, Math.min(1.0, gameState._volState));
  const vol = gameState._volState;

  // Multiple random sources blended at different frequencies
  const fast = (Math.random() - 0.5) * vol * 0.2;
  const slow = (Math.random() < 0.1) ? (Math.random() - 0.5) * vol * 0.5 : 0; // 10% chance of drift shift
  const shock = (Math.random() < 0.02) ? (Math.random() - 0.5) * vol * 1.2 : 0; // 2% chance of big move

  marketSentiment += fast + slow + shock;
  marketSentiment *= 0.985; // gentle mean reversion
  marketSentiment = Math.max(-1, Math.min(1, marketSentiment));
  const noise = 1 + marketSentiment * 0.015; // ±1.5% range

  // Subtract tax debt from valuation (liabilities)
  let taxLiabilities = 0;
  if (gameState.taxDebts) {
    for (const debt of gameState.taxDebts) {
      if (!debt.settled) taxLiabilities += debt.current;
    }
  }

  const revMultiple = baseMult * growthMod * noise;
  let valuation = Math.max(0, gameState.cash + annualRev * revMultiple - taxLiabilities);

  // Phase 2.1: Earnings multiplier (stock reacts to beats/misses)
  if (gameState.isPublic && gameState._earningsMultiplier) {
    valuation *= gameState._earningsMultiplier;
  }

  return valuation;
}

function sampleValuation() {
  const day = Math.floor(gameState.gameElapsedSecs / SECS_PER_DAY);
  const val = getCompanyValuation();
  if (!gameState.valuationHistory) gameState.valuationHistory = [];
  gameState.valuationHistory.push({ day, val });

  // Cap history length
  if (gameState.valuationHistory.length > MAX_VALUATION_POINTS) {
    gameState.valuationHistory = gameState.valuationHistory.slice(-MAX_VALUATION_POINTS);
  }
}

function drawValuationChart() {
  const container = document.getElementById('valuation-chart-container');
  const hist = gameState.valuationHistory;
  if (!hist || hist.length < 1) {
    container.classList.add('hidden');
    return;
  }

  if (!chartPositioned) {
    // Need to show it first so we can position, then set size
    container.style.width = '300px';
    container.style.height = '200px';
    container.classList.remove('hidden');
    positionChartDefault();
  }
  container.classList.remove('hidden');

  const canvas = document.getElementById('valuation-chart');
  const ctx = canvas.getContext('2d');

  // Use explicit container size
  const W = Math.max(100, parseInt(container.style.width) || 300) - 20;
  const H = Math.max(60, parseInt(container.style.height) || 200) - 36;
  canvas.width = W;
  canvas.height = H;

  ctx.clearRect(0, 0, W, H);

  // Chart area (leave room for axes)
  const padL = 65, padR = 10, padT = 5, padB = 20;
  const cW = W - padL - padR;
  const cH = H - padT - padB;

  const vals = hist.map(h => h.val);
  const minVal = Math.min(...vals) * 0.95;
  const maxVal = Math.max(...vals) * 1.05;
  const range = maxVal - minVal || 1;

  // Gridlines (5 horizontal)
  ctx.strokeStyle = dm('#e0e0e0');
  ctx.lineWidth = 1;
  ctx.font = '9px Calibri, Segoe UI, sans-serif';
  ctx.fillStyle = dm('#888');
  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const y = padT + (cH * i / 4);
    const val = maxVal - (range * i / 4);
    ctx.beginPath();
    ctx.moveTo(padL, Math.round(y) + 0.5);
    ctx.lineTo(W - padR, Math.round(y) + 0.5);
    ctx.stroke();
    ctx.fillText(formatCompact(val), padL - 4, y + 3);
  }

  // X axis labels (first and last day)
  ctx.textAlign = 'center';
  ctx.fillStyle = dm('#888');
  ctx.fillText('Day ' + hist[0].day, padL, H - 2);
  ctx.fillText('Day ' + hist[hist.length - 1].day, W - padR, H - 2);

  // Data line
  ctx.beginPath();
  ctx.strokeStyle = dm('#4472C4'); // Excel blue
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';

  if (hist.length === 1) {
    // Single point — draw a dot in the center
    const x = padL + cW / 2;
    const y = padT + cH / 2;
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = dm('#4472C4');
    ctx.fill();
  } else {
    for (let i = 0; i < hist.length; i++) {
      const x = padL + (i / (hist.length - 1)) * cW;
      const y = padT + cH - ((hist[i].val - minVal) / range) * cH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill under line (subtle gradient)
    const lastX = padL + cW;
    const lastY = padT + cH - ((hist[hist.length - 1].val - minVal) / range) * cH;
    ctx.lineTo(lastX, padT + cH);
    ctx.lineTo(padL, padT + cH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, padT + cH);
    grad.addColorStop(0, 'rgba(68, 114, 196, 0.15)');
    grad.addColorStop(1, 'rgba(68, 114, 196, 0.02)');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Current valuation label (top right)
  const current = vals[vals.length - 1];
  ctx.fillStyle = dm('#217346');
  ctx.font = 'bold 11px Calibri, Segoe UI, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(formatMoney(current), W - padR, padT + 12);
}

function formatCompact(n) {
  const sign = n < 0 ? '-' : '';
  const a = Math.abs(n);
  if (a >= 1e33) return sign + '$' + (a / 1e33).toFixed(1) + 'Dc';
  if (a >= 1e30) return sign + '$' + (a / 1e30).toFixed(1) + 'No';
  if (a >= 1e27) return sign + '$' + (a / 1e27).toFixed(1) + 'Oc';
  if (a >= 1e24) return sign + '$' + (a / 1e24).toFixed(1) + 'Sp';
  if (a >= 1e21) return sign + '$' + (a / 1e21).toFixed(1) + 'Sx';
  if (a >= 1e18) return sign + '$' + (a / 1e18).toFixed(1) + 'Qi';
  if (a >= 1e15) return sign + '$' + (a / 1e15).toFixed(1) + 'Q';
  if (a >= 1e12) return sign + '$' + (a / 1e12).toFixed(1) + 'T';
  if (a >= 1e9) return sign + '$' + (a / 1e9).toFixed(1) + 'B';
  if (a >= 1e6) return sign + '$' + (a / 1e6).toFixed(1) + 'M';
  if (a >= 1e3) return sign + '$' + (a / 1e3).toFixed(1) + 'K';
  return sign + '$' + Math.floor(a);
}

function setEventFreqMult(val) {
  EVENT_FREQ_MULT = parseInt(val) / 100;
  const tag = EVENT_FREQ_MULT === 0 ? 'off' : EVENT_FREQ_MULT <= 1 ? '' : EVENT_FREQ_MULT <= 3 ? '🔥' : EVENT_FREQ_MULT <= 6 ? '💀' : '☠️';
  document.getElementById('event-freq-label').textContent = `📬 Events: ${EVENT_FREQ_MULT.toFixed(1)}× ${tag}`;
  saveGame();
}

window.setEventFreqMult = setEventFreqMult;
window.unlockSource = unlockSource;
window.hireEmployee = hireEmployee;
window.upgradeSource = upgradeSource;
window.automateSource = automateSource;
window.collectSource = collectSource;
window.restructureSource = restructureSource;
window.dismissEvent = dismissEvent;
window.dismissOffline = dismissOffline;
window.dismissSeriesA = dismissSeriesA;
window.selectArc = selectArc;
window.resetGame = resetGame;
window.completeMiniTask = completeMiniTask;
window.skipMiniTask = skipMiniTask;
window.toggleFileMenu = toggleFileMenu;
window.toggleAutosave = toggleAutosave;
window.showAbout = showAbout;
window.dismissAbout = dismissAbout;
window.confirmNewGame = confirmNewGame;
window.confirmAction = confirmAction;
window.dismissConfirm = dismissConfirm;
window.showHelp = showHelp;
window.dismissHelp = dismissHelp;
window.switchTab = switchTab;

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', () => { if (gridBuilt) buildFillerRows(); });

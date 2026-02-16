# Quarter Close — Design Document

*A browser idle/tycoon game disguised as a corporate spreadsheet.*
*Working title: Quarter Close*

## Concept

It looks exactly like Excel/Google Sheets. But you're secretly building a business empire from startup to public megacorp. Your boss walks by? It's just a spreadsheet.

## Visual Design

- Styled like Excel/Google Sheets — grid lines, cell references (A1, B2), formula bar, sheet tabs at bottom
- Menus look like File/Edit/View/Insert
- "Save" = Ctrl+S (saves to localStorage)
- Status bar shows "Ready" like real Excel
- Favicon = green spreadsheet icon
- Stock ticker in corner (post-IPO)
- Resizable columns — drag A-G letter headers, widths persist
- Pause/resume button in status bar (⏸/▶)

## Save System

Multi-slot save system with file export/import.

### Save Slots
- Unlimited named slots in localStorage
- Slot IDs start at 1
- Each slot stores full gameState + metadata (name, game date, cash, storage size)
- Active slot shown in Manage Saves modal
- Auto-save targets active slot

### File Menu
| Item | Description |
|------|-------------|
| Save (Ctrl+S) | Save to active slot |
| Save As... | Create new named slot or overwrite current |
| Manage Saves... | Modal: list all slots with Load/Rename/Export/Delete |
| Export to File... | Download save as .json with SHA-256 checksum |
| Import from File... | File picker → preview modal → import as new slot |
| Auto-save | Toggle auto-save on/off |
| New Game | Create new slot (old slots preserved) |
| About | Version info |

### Export/Import Format
```json
{
  "version": "0.5.0",
  "name": "My Game",
  "exportedAt": 1739712000000,
  "checksum": "sha256...",
  "data": { ...gameState... }
}
```

### Anti-Tampering
- SHA-256 hash of save data + salt (`qc_2026_s4lt`)
- Tampered files show warning but can still be loaded
- Not security — just prevents casual JSON editing

### Chart Persistence
- Chart visibility (open/closed) persists across reloads
- Floating chart position and size persist across reloads

## Core Loop

Revenue accrues per tick → spend on upgrades → grow departments → hit quarterly targets → earn prestige currency → reinvest

## Game Phases

### Phase 1: Startup (Bootstrapping)
- One sheet, minimal revenue
- Grind to initial milestones
- Angel investor "emails" — cash injections with strings attached
- Hire first employees (add rows)

### Phase 2: Growth (Venture Rounds)
- Series A, B, C funding rounds
- Each round = cash injection + board members who set KPIs
- Miss targets → board threatens to replace you
- New departments unlock as "sheet tabs" (Sales, R&D, Marketing, HR, Legal)

### Phase 3: IPO 🔔
- Big milestone event
- Stock price becomes live ticker in UI
- Public perception now matters
- Transition from private metrics to public company pressure

### Phase 4: Public Company (The Real Game)
- **Quarterly Earnings** — the core rhythm/prestige mechanic
- Every quarter: numbers reported vs analyst expectations
- Beat → stock moons, multipliers, analyst upgrades
- Miss → stock tanks, forced layoffs, lose some upgrades
- Expectations ratchet up each quarter (treadmill)

## Quarterly Earnings (Prestige Mechanic)

- Quarter closes → earnings reported → stock reacts
- Earn "retained earnings" (prestige currency)
- Reinvest into permanent upgrades
- Next quarter starts with higher baseline + higher expectations

### Guidance System
- Player sets own targets each quarter
- **Sandbagging:** Low guidance, easy to beat, small reward
- **Ambitious:** High guidance, hard to beat, big reward if you do
- Classic risk/reward tradeoff

## Advanced Mechanics

### Active Play Mechanics (Toggleable via Data → Game Options)

All three are optional — toggle off in Game Options for pure idle experience.

**Overtime** — Click "Push It" for instant revenue bursts (5s of revenue per click). Diminishing returns per quarter (resets each Q). Creates strategic tension: spam overtime to hit guidance but analysts ratchet up.

**Close the Deal** — Random enterprise contract toasts (every 1-4 min). Rapid-click "Sign" button to close before 12s timer expires. Clicks scale with company size. Reward = 30-60s of revenue. No penalty for missing — just missed money.

**Management Focus** — Click department names to add focus (max 10 = +50% rev). Decays 1 point every 10s idle. Rewards constant attention rotation across departments. Transient (resets on page load).

### Activist Investors
- Random events — someone tries hostile takeover
- Must hit certain metrics to fight them off
- Lose = game over or forced restructuring

### Stock Buybacks
- Spend cash to inflate stock price
- Short-term boost, long-term cash drain
- Trade-off: growth investment vs stock manipulation

### Cooking the Books 📕
- Risky button that inflates reported numbers
- Get caught = SEC investigation = massive penalty or game over
- Probability of getting caught increases with frequency
- Hilarious thematic tension

### Earnings Call
- Dialog event where "analysts" ask questions
- Player responses affect market sentiment
- Multiple choice — bullish/cautious/deflect

### Market Conditions
- Bull market = everything easy, rising tide
- Recession = survival mode, layoffs, cost cutting
- Cycle between them over long gameplay

### Late-Game Economy (Phase 2)
- At $Q+ revenue, CapEx ROI goes negative — hires/upgrades cost more than the revenue they generate
- RE upgrades run dry — need more meaningful late-game sinks
- Potential solutions: acquisitions (buy competitor companies), mega-projects, new prestige layers, expanded Board Room tier

## Random Events ("Emails")

Events appear as email-style toast notifications. Mix of positive (Lucky Client, R&D Breakthrough), neutral (Mom, College Buddy), and negative (IT disasters). Each has 1-2 action buttons; non-closable events auto-fire the last button after 10s.

### Event Weights & Frequency
Events use weighted random selection. Higher weight = more frequent. Global frequency adjustable via Settings slider (0×–3×).

| Weight | Category | Events |
|--------|----------|--------|
| 4 | Very Common | Angry Customer, Password Reset |
| 3 | Common | Mom, Email Server Down, P0 Bug, Big Client |
| 2 | Regular | Power Outage, Cloud Outage, Laptop Recall, TikTok, Reddit, Local News, Forbes, R&D Breakthrough, WFH Revolt, AI Disruption, CEO Tweet, Supply Chain Crisis |
| 1 | Rare | College Buddy, Ransomware, DDoS, DB Corruption, Healthcare CEO Incident, Congressional Hearing, Short Seller Attack, Bank Collapse, Activist Investor, Pandemic, CEO Health Scare |

At 1× frequency: ~1 event per quarter (~95s between events). At 10×: ~10 events per quarter. Cooldown AND roll chance both scale.

### Positive Events
- **Lucky Client** (Sales Team) — one-time cash bonus (5-10× daily revenue of random dept)
- **R&D Breakthrough** (R&D Department) — permanent 2× revenue for a random dept, or file patent for 5% cash

### Neutral Events
- **Mom** — decline or lose 2% cash
- **College Buddy** — risk 5% cash (40% pays 1-3 min revenue, 60% MLM pitch), or ghost

### Negative (IT Disasters)
| Event | Effect | Choice |
|-------|--------|--------|
| Power Outage | Full freeze 15s (timed countdown) | No choice |
| Ransomware | Full freeze 30-60s or 15% cash | Pay vs rebuild |
| DDoS Attack | 50% revenue 20-30s | No choice |
| DB Corruption | Random dept offline 15-20s or 3% cash | Fix vs wait |
| Email Server Down | Mini-tasks blocked 45-60s | No choice |
| Password Reset | 10s full freeze (timed) | No choice |
| Cloud Provider Outage | 25% revenue 15-25s | No choice |
| P0 Bug | 5% cash hotfix or 50% revenue 60s | Hotfix vs next sprint |
| Laptop Recall | 70% revenue 20s | No choice |

### Negative (Business)
- **Angry Customer** — refund (lose cash) or ignore (20% revenue penalty 30s, hiring frozen 15s)
- **Google Alerts / PR Team / Social Media / Marketing** — various revenue penalties

### "Ripped from the Headlines" (v0.4.2)
Real-world inspired corporate drama events with meaningful multi-choice tradeoffs:

| Event | Weight | Key Mechanic |
|-------|--------|-------------|
| 🔫 Healthcare CEO Incident | 1 | Thoughts & prayers / security / review benefits (expensive but correct) |
| 🏛️ Congressional Hearing | 1 | Send CEO (PR+) / lawyer (cheaper) / plead Fifth (risky) |
| 🏠 WFH Revolt | 2 | Allow WFH / enforce RTO (employees quit) / compromise |
| 📉 Short Seller Attack | 1 | Rebuttal / silence / sue (50% backfire) |
| 🤖 AI Disruption | 2 | Replace workers / keep humans / retrain (best outcome) |
| 🐦 CEO Tweet | 2 | Delete / double down (30% works) / revoke access |
| 🏦 Bank Collapse | 1 | Lose 30% of uninsured deposits above $250K |
| 💰 Activist Investor | 1 | Cut 15% staff / poison pill / board seat |
| 🚢 Supply Chain Crisis | 2 | Expedited shipping / wait it out |
| 🦠 Pandemic | 1 | Go remote / "just the flu" / masks+hazard pay |
| 💊 CEO Health Scare | 1 | Having COO = minor disruption; no COO = major |

## Departments (Sheet Tabs)

| Tab | Function | Unlocked |
|-----|----------|----------|
| Operations | Main grid, revenue sources, hiring, upgrades | Start |
| Board Room | RE prestige shop — permanent upgrades | IPO |

### Future Tabs (Phase 3+)
| Tab | Function | Unlocked |
|-----|----------|----------|
| R&D | Product upgrades, new revenue streams | Board Room |
| Marketing | Brand value, customer growth rate | Board Room |
| HR | Hiring, morale, productivity multiplier | Board Room |
| Legal | Risk management, SEC defense, cooking the books | Board Room |

## Board Room (RE Prestige Shop)

Post-IPO tab where players spend Retained Earnings on permanent upgrades. RE is earned by beating quarterly earnings targets.

### RE Economy
- Base RE per beat: `10 × log10(quarterRevenue)` — ~109 at $80B quarterly revenue
- Multiplied by: guidance multiplier × margin bonus (up to 1.5×) × streak bonus (up to 2.0×)
- Typical quarter: ~200 RE. Max possible: ~980 RE
- RE resets to 0 at IPO (fresh start for prestige economy)

### Finance Department (Smart CFO System)

The Finance Dept is the flagship Board Room upgrade. It auto-handles quarterly earnings reports (eliminating the popup modal) but each level has a different "intelligence" for picking guidance.

**Player can switch between owned levels at any time** via the IR section in the Operations tab. Downgrading to the intern for chaos is a valid choice.

| Level | Cost | Guidance Algorithm | Personality |
|-------|------|--------------------|-------------|
| **Lv1 — The Intern** | 500 RE | Random: 25% conservative, 50% in-line, 25% ambitious | Clueless. Gets rid of the popup but often picks wrong. |
| **Lv2 — Competent CFO** | 2,500 RE | Context-aware weighted random. After misses → conservative-heavy. On beat streaks → shifts ambitious. High analyst pressure → plays safer. ~70% optimal. | Smart enough to read the room. Sometimes cautious, sometimes bold. |
| **Lv3 — Elite CFO** | 10,000 RE | Smarter weighted distribution. Also factors in active revenue bonuses/penalties, recognizes long-streak analyst danger. ~90% optimal. | Wall Street veteran. Knows when to push and when to pull back. |

**The Algorithm (Lv2/Lv3) — Weighted Random:**
Each pick is probabilistic, not deterministic. Weights shift based on context:

| Context | Conservative | In-Line | Ambitious | Aggressive |
|---------|-------------|---------|-----------|------------|
| Lv2 after 2+ misses | 70% | 25% | 5% | 0% |
| Lv2 fresh start | 20% | 50% | 25% | 5% |
| Lv2 short streak (1-3 beats) | 10% | 35% | 40% | 15% |
| Lv2 long streak (4+) | 5% | 20% | 45% | 30% |
| Lv3 after 2+ misses | 50% | 40% | 10% | 0% |
| Lv3 fresh start | 10% | 40% | 35% | 15% |
| Lv3 short streak (1-3) | 5% | 20% | 45% | 30% |
| Lv3 long streak (>6) | 10% | 35% | 35% | 20% |

Additional modifiers: high analyst baseline (>1.15) shifts weights conservative; low baseline (<0.85, Lv3 only) shifts aggressive; active revenue penalty shifts conservative; active revenue bonus shifts aggressive.

**Design principle:** CFOs should feel like people, not calculators. Sometimes they play it safe after a bad quarter, sometimes they swing for the fences on a hot streak. The randomness creates emergent narratives.

### Other Board Room Upgrades

| Item | Cost | Effect |
|------|------|--------|
| Revenue Multiplier I | 1,000 RE | Permanent 1.1× revenue |
| Revenue Multiplier II | 5,000 RE | Permanent 1.25× revenue (requires I) |
| Revenue Multiplier III | 25,000 RE | Permanent 1.5× revenue (requires II) |
| Lobbyist | 1,500 RE | Tax rate 25% → 20% |
| Tax Haven | 8,000 RE | Tax rate → 15% (requires Lobbyist) |
| Analyst Relations | 2,000 RE | Analyst ratchet slowed 50% |
| Golden Parachute | 3,000 RE | Survive one asset seizure (consumed, rebuyable) |
| Growth Initiative | 50 RE (scales +10%) | +2% revenue, repeatable, stacks as 1.02^N |
| CPA on Retainer | 750 RE | Auto-pays taxes, auto-settles debts, no IRS toasts |

### ★ Restructure (Department Prestige)

Post-IPO, each automated department can be restructured for **10× revenue**.

| Prestige Level | Revenue Multiplier | Cost Formula |
|---|---|---|
| ★1 | 10× | 50 × (1 + tier) RE |
| ★2 | 100× | 50 × (1 + tier) × 3 RE |
| ★3 | 1000× | 50 × (1 + tier) × 9 RE |

- Cost scales mildly with source tier (lemonade stand = 50 RE, trillion club = 600 RE)
- Each subsequent prestige on same dept costs 3× more
- Strategic choice: boost top dept for max impact, or boost cheap depts first

### 🔬 R&D Breakthroughs

Random event that permanently doubles a department's revenue.

- Picks a random unlocked department
- Player choice: Implement (×2 revenue) or File Patent (+5% cash)
- Stacks multiplicatively (×2, ×4, ×8...)
- Adds exciting late-game revenue spikes without player control

## Idle Mechanics

- Revenue accumulates while tab is open
- Offline progress on return ("You were away for 3 hours, earned $X")
- Active play = clicking/decisions matter for optimization
- But casual play (check 2x/day) is viable

## Boss Key

- Hotkey (Esc or backtick) instantly shows a real empty spreadsheet
- No trace of game visible
- Press again to return

## Tech Stack

- Pure HTML/CSS/JS (vanilla, no framework)
- localStorage for saves
- No server needed
- Host on GitHub Pages
- Target: ~2000-3000 lines of code

## Open Questions

- [ ] Humor tone: corporate satire? absurdist? straight-faced?
- [ ] How many quarters before "winning"? Or endless?
- [ ] Mobile support? (spreadsheet UI might be rough on phone)
- [ ] Sound? (risky for "stealth at work" concept — probably off by default)
- [ ] ~~Name~~: **Quarter Close** ✅

---

*Created: 2026-02-13*

## All Arcs & Tiers (12 tiers each)

All arcs share the same SOURCE_STATS economy (same rev/unlock per tier). Each has unique department names and flavor.

### Shared Economy
| Tier | Rev/emp/yr | Unlock Cost |
|------|-----------|-------------|
| 0 | $3K | Free |
| 1 | $30K | $500 |
| 2 | $200K | $5K |
| 3 | $500K | $25K |
| 4 | $1M | $100K |
| 5 | $5M | $500K |
| 6 | $20M | $2M |
| 7 | $100M | $10M |
| 8 | $400M | $50M |
| 9 | $1.5B | $250M |
| 10 | $5B | $1B |
| 11 | $15B | $5B |

### 💻 Tech Startup
*From blog to software empire*

Blog with Ads → Freelance Web Dev → WordPress Agency → SaaS MVP → Mobile App → Series A Startup → Dev Shop → Software Company → Tech Giant → Big Tech → Monopoly → Trillion Dollar Club

### 🍋 Food Empire
*From lemonade stand to food & beverage corp*

Lemonade Stand → Food Cart → Food Truck → Small Restaurant → Catering Company → Restaurant Chain → Franchise Operation → Food & Beverage Corp → CPG Conglomerate → Global Supply Chain → Food Monopoly → You Feed The World

### 📦 E-Commerce Hustler
*From garage sales to retail empire*

Garage Sale → eBay Reselling → Dropshipping Store → Drop Shipping → Warehouse & Distro → Private Label Brand → Retail Chain → Consumer Empire → Marketplace Platform → Logistics Network → Retail Monopoly → Everything Store

### 📈 Entrepreneur
*From side hustle to conglomerate*

Tutoring Service → Online Course → Consulting Gig → Small Agency → SaaS Product → Venture-Backed Startup → Growth-Stage Company → Tech Company → Holding Company → Private Equity → Conglomerate → Too Big To Fail

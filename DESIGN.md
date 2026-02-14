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

**Close the Deal** — Random enterprise contract toasts (every 3-8 min). Rapid-click "Sign" button to close before 12s timer expires. Clicks scale with company size. Reward = 30-60s of revenue. No penalty for missing — just missed money.

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

## Random Events ("Emails")

- "Jim from accounting wants a raise" (yes/no → morale)
- "Marketing wants to sponsor a podcast" (spend cash → brand boost)
- "Server outage! Revenue paused for 30 seconds"
- "Competitor launched rival product" (temporary revenue hit)
- "Meeting invite: All-Hands" (decline or lose productivity)
- "HR complaint filed" (handle it or morale drops)

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
| **Lv2 — Competent CFO** | 2,500 RE | Trend-based: looks at recent revenue trajectory. Growing → ambitious, flat → in-line, declining → conservative. Needs 20% safety margin to go aggressive. | Decent instincts, plays it safe when unsure. ~70% optimal. |
| **Lv3 — Elite CFO** | 10,000 RE | Smart analysis: revenue trend + streak length + active bonuses/penalties + recent purchases. Needs only 5% safety margin. Plays tight but accurate. | Wall Street veteran. ~90% optimal picks. |

**The Algorithm (Lv2/Lv3):**
1. Project quarterly revenue: `currentRevPerTick × 90 days`
2. For each guidance level, calculate target: `projectedRev × guidancePct × analystBaseline`
3. Pick the most aggressive guidance where `projectedRev > target × safetyMargin`
   - Lv2 safety margin: 1.20 (needs 20% buffer)
   - Lv3 safety margin: 1.05 (cuts it close)
4. Lv3 also adjusts for:
   - Long streaks (>5): one notch safer (analysts are ratcheting hard)
   - Active revenue bonus: one notch more aggressive (temporary windfall)
   - Active revenue penalty: one notch safer

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

Garage Sale → eBay Reselling → Dropshipping Store → Amazon FBA → Warehouse & Distro → Private Label Brand → Retail Chain → Consumer Empire → Marketplace Platform → Logistics Network → Retail Monopoly → Everything Store

### 📈 Entrepreneur
*From side hustle to conglomerate*

Tutoring Service → Online Course → Consulting Gig → Small Agency → SaaS Product → Venture-Backed Startup → Growth-Stage Company → Tech Company → Holding Company → Private Equity → Conglomerate → Too Big To Fail

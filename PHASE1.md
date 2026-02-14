# Quarter Close — Phase 1: Startup

*MVP scope. Get the core loop working and the spreadsheet disguise nailed.*

## What You're Building

A startup-to-corporation idle game that looks like Excel. Choose from 4 career arcs, each with 12 tiers of progression.

## Win Condition (Phase 1)

Reach $1M revenue → unlocks "Series A" teaser (end of phase 1 content, cliffhanger for phase 2).

## Core Mechanics

### The Grid
- Looks like a real spreadsheet with fixed-width columns
- Row 1 = stats: Cash, $amount, $/day, Total Rev/yr, Stock price
- Row 2 = headers: DEPARTMENT | Staff | Rev/day | Hire | Upgrade | Actions | Rev/yr
- Rows 3+ = revenue sources (departments)
- Cells update in real time (numbers tick up)
- Formula bar shows cell reference + content when clicked (green outline on selected cell)
- Clicking cells updates formula bar live each tick
- Grid column widths resize dynamically between Operations and Board Room tabs

### Career Arcs (choose at start)
- **Tech Startup** — Blog → Freelance → SaaS → Big Tech
- **Food Empire** — Lemonade → Food Truck → Restaurant Chain → Global
- **E-Commerce Hustler** — eBay → Dropshipping → D2C → Marketplace
- **Entrepreneur** — Tutoring → Consulting → Agency → Corporation

### Starting State
- Arc selection screen on first play
- Row 1: Tier 0 source — 1 employee, ~$8/day
- Cash balance in row 2 (column E)
- One sheet tab: "Operations"
- Game date starts from real-world date, shows company age

### Revenue Sources (12 tiers per arc)
| Tier | Rev/emp/yr | Unlock Cost | Flavor |
|------|-----------|-------------|--------|
| 0 | $3K | Free | Starting out |
| 1 | $30K | $500 | First real revenue |
| 2 | $200K | $5K | Scaling up |
| 3 | $500K | $25K | Getting serious |
| 4 | $1M | $100K | Real business |
| 5 | $5M | $500K | Growth stage |
| 6 | $20M | $2M | Major player |
| 7 | $100M | $10M | Industry leader |
| 8 | $400M | $50M | Market dominant |
| 9 | $1.5B | $250M | Global player |
| 10 | $5B | $1B | Near monopoly |
| 11 | $15B | $5B | Trillion dollar club |

### Upgrades
Each revenue source has:
- **Hire** (add employee) — multiplies output, increasing cost each hire
- **Upgrade** — increases $/day per employee (progressive cost)
- **Automate** — expensive one-time buy, row produces without clicking
- **Max(N)** — buy max affordable hires/upgrades in one click (shown when 2+ affordable)

### Clicking
- Before automation: must click row to trigger revenue tick
- After automation: revenue flows passively
- Click value scales with progression ($1-$20 early)

### Time
- Fixed: 1 tick = 1 game-day, always
- Revenue per tick = sum of all active rows
- Offline: on return, calculate elapsed × revenue rate, cap at 8 hours

## Tax System

### Quarterly Tax (every 90 game-days)
- 25% corporate tax on (revenue − depreciation)
- **AMT floor**: minimum 15% of gross revenue (can't deduct to zero)
- Pay immediately or ignore (creates tax debt)
- Tax toast shows full breakdown: revenue, depreciation, taxable income

### Tax Debt Escalation
- Ignored taxes accrue 1% daily compound interest
- **Notice 1** (0-29 days) → **2nd Notice** (30-89d) → **Garnishment** (90-179d, -15% revenue) → **Seizure** (180d, takes debt + 25% penalty)
- Settle individually or all at once from P&L panel
- Tax liabilities subtract from company valuation

### Depreciation
- Capital spending (hires, upgrades, automation) depreciates over 4 quarters
- 25% deducted each quarter from taxable income
- Prevents gaming tax day by dumping money right before

## P&L Section
- Revenue, Capital Spending, Depreciation, Taxes Paid, Taxable Income, Net Income
- Double-underline on Net Income (accounting convention)
- Red parentheses for losses
- AMT row turns orange when AMT applies
- "Tax due in Nd" countdown
- Garnishment shown as red line when active

## Events (Desktop notification toasts)

### Weighted Event System
Events use weighted random selection. Global frequency adjustable via Settings slider (0×–3×).
Both cooldown timer and roll chance scale with the multiplier (10× = actually 10× more events).

| Weight | Events |
|--------|--------|
| 4 (very common) | Angry Customer, Password Reset |
| 3 (common) | Mom, Email Server Down, P0 Bug, Big Client |
| 2 (regular) | Power Outage, Cloud Outage, Laptop Recall, TikTok, Reddit, News, Forbes, R&D Breakthrough |
| 1 (rare) | College Buddy, Ransomware, DDoS, DB Corruption |

At 1×: ~1 event per quarter. Base chance 2%/tick, cooldown 30-60s. Breakthrough avg ~3.5 game years.

### Standard Behavior
- All rewards/costs scale with game state (% of cash or × per-tick revenue)
- **Auto-expire in 10s** — last button gets red countdown fill, auto-fires
- IRS/earnings toasts are NOT auto-expiring (closable: false)

### Positive Events
- **Lucky Client** (Sales Team) — one-time bonus (5-10× dept daily revenue)
- **R&D Breakthrough** — permanent 2× revenue for random dept
- **Viral/media bonuses**: TikTok (3× 30s), Forbes (2× 60s), Reddit (5× 15s), Local news (2× 45s)

### Neutral Events
- **Mom** — decline or lose 2% cash
- **College Buddy** — risk 5% cash (40% side deal, 60% MLM), or ghost

### IT Disaster Events
- **Power Outage** — 15s full freeze (timed countdown, no choice)
- **Ransomware** — 15% cash or 30-60s full freeze
- **DDoS Attack** — 50% revenue 20-30s (no choice)
- **DB Corruption** — 3% cash fix or random dept offline 15-20s (`dbOutage` state, red row indicator)
- **Email Server Down** — mini-tasks blocked 45-60s (`miniTaskBlocked` state)
- **Password Reset** — 10s full freeze (timed, no choice)
- **Cloud Provider Outage** — 25% revenue 15-25s (no choice)
- **P0 Bug** — 5% cash hotfix or 50% revenue 60s
- **Laptop Recall** — 70% revenue 20s (no choice)

### Business Events
- **Angry Customer** — refund (cash) or ignore (20% penalty 30s + hiring frozen 15s)
- **Google Alerts / PR Team / Social Media / Marketing** — various revenue penalties

### Revenue Effect Indicators (Row 1)
- $/day cell color-codes active effects: red ⚡ for outage, red ▼% for penalty, orange 💾 for DB, green ▲× for bonus
- Affected department row gets red tint + `💾 OFFLINE Xs` countdown during DB outage

### Close the Deal (Own Popup)
- Separate `#deal-popup` element (not shared with event toast)
- Draggable, position persisted, independent spawn timing

### Mini-Tasks (every 20-60s)
- Approve/decline popups (expense reports, PTO, invoices)
- Reward: 2-10× current per-tick revenue
- **Streak system**: 3=1.5×, 5=2×, 10=3× multiplier
- Skip resets streak, auto-skip after 10s

### Golden Cell
- Random cell pulses gold for 5s
- Click for 20× daily revenue bonus
- 30-60s cooldown between occurrences

## Company Valuation Chart
- Canvas-rendered line chart (Excel blue #4472C4)
- Formula: Cash + (Annual Revenue × Multiple × Growth Modifier × Market Noise) − Tax Liabilities
- Fractal market noise: volatility random walk (0.05-1.0), three frequency layers
- Draggable + resizable floating overlay
- Up to 200 data points, sampled every tick

## Boss Key
- Press `Esc` → instant switch to empty spreadsheet
- Press `Esc` again → back to game
- Game keeps running underneath

## Saves
- Auto-save to localStorage every 30 seconds
- Manual save = Ctrl+S (intercepts browser save)
- Backward-compatible format with fallback defaults

## Help Screen
- Help menu bar item → tabbed modal (720px wide)
- 5 tabs: Basics, Active Play, Events & Taxes, Board Room, Tips
- Two-column grid layout within each tab
- All interactive buttons have hover tooltips

## OG Preview / Social Embed
- Office 2003 splash screen style overlay on spreadsheet background
- Blue valuation chart peeking out behind splash
- 1200×630, properly tagged with og:image, twitter:card meta

## Analytics
- GoatCounter (privacy-friendly, no cookies)
- Only loads on github.io domain (skips local/LAN dev)

## Definition of Done

- [x] Looks convincingly like a spreadsheet at a glance
- [x] 12 revenue sources unlockable in sequence (4 arcs)
- [x] Hire + upgrade + Max mechanics working
- [x] Automation mechanic working
- [x] Offline progress on return
- [x] Random events with auto-expire
- [x] Mini-tasks with streak system
- [x] Golden cell mechanic
- [x] Quarterly tax + AMT + depreciation
- [x] P&L section with live updates
- [x] IRS debt escalation (notice → garnishment → seizure)
- [x] Company valuation chart (draggable, fractal noise)
- [x] Boss key works
- [x] Save/load works (backward compatible)
- [x] Help screen
- [x] Formula bar updates with clicked cell
- [x] OG preview image for social embeds
- [x] Reaching $1M shows "Series A" teaser
- [x] Revenue breakdown bar polish

---

---

*Created: 2026-02-13*

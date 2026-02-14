# Quarter Close — Phase 1: Startup

*MVP scope. Get the core loop working and the spreadsheet disguise nailed.*

## What You're Building

A startup-to-corporation idle game that looks like Excel. Choose from 4 career arcs, each with 12 tiers of progression.

## Win Condition (Phase 1)

Reach $1M revenue → unlocks "Series A" teaser (end of phase 1 content, cliffhanger for phase 2).

## Core Mechanics

### The Grid
- Looks like a real spreadsheet with columns: A (Department), B (Staff), C (Rev/day), D (Hire), E (Upgrade), F (Automate), G (Rev/yr), H (Max buttons)
- Rows = revenue sources you've unlocked
- Cells update in real time (numbers tick up)
- Formula bar shows cell reference + content when clicked (green outline on selected cell)
- Clicking cells updates formula bar live each tick

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

### Standard Events (~2% chance per tick)
- Mom wants to invest, customer complaint, power outage, college buddy discount
- All rewards/costs scale with game state (% of cash or × per-tick revenue)
- **Auto-expire in 10s** — last button gets red countdown fill, auto-fires

### Dynamic Events
- **Viral/media bonuses**: TikTok (3× 30s), Forbes (2× 60s), Reddit (5× 15s), Local news (2× 45s)
- **Lucky client**: random unlocked source gets 5-10× burst
- Revenue bonuses shown in status bar with countdown

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
- Help menu bar item → scrollable modal with full game guide
- Covers: goal, money, mini-tasks, events, taxes/AMT/depreciation, chart, shortcuts

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

## Phase 2.2: Board Room (RE Prestige Shop)

Post-IPO prestige shop where players spend Retained Earnings on permanent upgrades.

### Completed
- [x] Board Room sheet tab (visible after IPO)
- [x] Tab switching between Operations and Board Room
- [x] Revenue Multipliers I-III (stacking permanent boosts)
- [x] Lobbyist + Tax Haven (reduced tax rates)
- [x] Analyst Relations (slower ratchet)
- [x] Golden Parachute (seizure protection, consumable)
- [x] All effects integrated (tax, revenue, earnings, seizure)
- [x] Save/load/reset support
- [x] Help screen updated

### In Progress — Finance Dept Rework
- [ ] **Lv1 — The Intern** (500 RE): Auto-earnings, random guidance (25% conservative, 50% in-line, 25% ambitious)
- [ ] **Lv2 — Competent CFO** (2,500 RE): Trend-based guidance algorithm, 20% safety margin, ~70% optimal
- [ ] **Lv3 — Elite CFO** (10,000 RE): Smart analysis (trend + streak + bonuses), 5% safety margin, ~90% optimal
- [ ] Player can switch active CFO level anytime in IR section (only shows owned levels)
- [ ] CFO level selector row in IR section below guidance row

---

*Created: 2026-02-13*

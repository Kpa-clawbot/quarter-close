# Changelog

All notable changes to Quarter Close.

## [v0.4.1] — 2026-02-15

Balance and UX fixes.

### ⚖️ Upgrade Scaling Rebalance
- **Cost formula**: `2^level` → `1.07^level` — gentle exponential curve instead of brutal doubling
- **Revenue**: stays linear (`1 + level × 0.5`) — predictable, satisfying growth
- CTO buys every 37s at Lv0, slowing to ~18min at Lv50 — machine gun early, natural soft cap late
- Lv70+ takes 1h+ per upgrade, naturally nudging toward prestige/restructuring

### 🛠️ Debug Tools
- Speed controls (1×/2×/3×/5×/10×) moved to hidden debug toolbar (tap 💰 Cash 7× to reveal)
- Removed Debug menu from menu bar — all debug tools live in one place
- Active speed button highlighted in blue

### 🏢 Board Room Fixes
- Board Room now shows only Cash row + purchasable upgrades (no P&L, IR, or department headers)
- Fixed `updateTaxPanel()` re-showing hidden panels every tick in Board Room mode
- C-Suite section (CFO/CTO/COO + budget sliders) extracted into shared `buildCSuiteHTML()` function

## [v0.4.0] — 2026-02-15

Major UI/UX overhaul: reactive information design, dark mode, C-suite automation, and late-game progression.

### 🌙 Dark Mode
- Full dark mode with WCAG AA accessible palette
- 361 CSS variable references + `dm()` helper for inline styles
- Toggle button (🌙/☀️) in the formatting toolbar
- Persists via localStorage

### 🤖 C-Suite Automation
- **CTO (Auto-Upgrade)** — revenue skimming budget model. Slider sets % of revenue the CTO takes per tick to fund upgrades. Progress bar fills toward next purchase. 3 levels: cheapest-first → ROI-optimized → timing-aware.
- **COO (Auto-Hire)** — same revenue skimming mechanic for hiring employees. 3 levels: cheapest → best marginal revenue → earnings-aware.
- **CapEx Planning** — CFO auto-adjusts both CTO and COO budgets each quarter based on guidance strategy. Independent Auto toggles.

### 📊 Reactive Information Design
- **Earnings countdown** — color-coded cell based on days remaining × tracking status (green→yellow→orange→red)
- **Tax countdown** — color-coded based on cash vs projected tax bill (can you afford it?)
- **Earnings streak emoji** — escalates with streak length: ✅ (1) → 🔥 (2-3) → 🔥🔥 (4-6) → 🚀 (7-9) → 👑 (10)
- **Miss streak emoji** — 😬 (1) → ❄️ (2-3) → 💀 (4+)
- **Analyst expectation** — color-coded by difficulty: green (easy) → gray → yellow → orange → red (near cap)
- **Tax/earnings fiscal offset** — tax quarter fires 45 days after earnings (like real fiscal vs calendar year). Always something on the horizon.

### 📈 Late-Game Progression
- **Market Expansion** — 4 tiers of company-wide revenue multipliers (2×/3×/5×/10×, cumulative 300×)
- **Talent Acquisition** — 3 tiers reducing hire cost scaling exponent (1.15→1.12→1.09→1.06)
- **RE curve fix** — `5 × log10(qRev)²` creates actual feedback loop where more revenue → more RE → bigger upgrades

### 🖥️ UI/UX Improvements
- **RE in header bar** — ⭐ RE shown next to 💰 Cash, always visible
- **Collapsible sections** — P&L, IR, and Tax all collapse with abbreviated headers (▶ P&L / ▼ PROFIT & LOSS)
- **Collapsed summaries** — key stats shown inline: Qtr Revenue, Est. tax, Guidance, Track status, Streak, Earnings/Tax countdowns, Analyst expectation
- **Responsive rem-based sizing** — all font sizes converted from px to rem with viewport-aware root size
- **Font size controls** — A↑/A↓ buttons in toolbar (70%-150% range)
- **Sparkline chart** — tap to toggle floating valuation chart
- **Tax alert in formula bar** — red/yellow warning bar with SETTLE button for outstanding tax debt
- **Separator rows removed** — replaced with clean border-top on section headers

### 🔧 Bug Fixes
- Fixed CTO not buying (ROI was per-tick instead of annual)
- Fixed COO Lv1 picking fewest-employees instead of cheapest
- Fixed Board Room missing Expansion and Operations categories
- Fixed row numbering with overtime visibility
- Fixed dock button hiding entire overlay

## [v0.3.0] — 2026-02-14

Major progression update: late-game mechanics, tax automation, and Board Room UX overhaul.

### Prestige Tiers (★ Restructure)
- **Post-IPO, each automated department gets a "★ Restructure" button**
- Each prestige level = **10× revenue** for that department
- Cost formula: `50 × (1 + tier) × 3^level` — lemonade stand is cheap (50 RE), megacorp is expensive (600 RE)
- Stacking: prestige level 2 = 100× revenue, level 3 = 1000×
- Gold ★N tag shown on department name
- Saved/loaded with source state

### R&D Breakthroughs
- **New random event**: R&D Department discovers a breakthrough innovation
- Permanently **doubles** a random department's revenue (`breakthroughMult`)
- Player choice: Implement (+×2 revenue) or File patent (+5% cash)
- Can stack — multiple breakthroughs = ×4, ×8, etc.
- Green 🔬×N tag shown on department name

### CPA on Retainer (Tax Automation)
- **New Board Room upgrade** (750 RE, Tax category): auto-handles all tax interactions
- Auto-pays quarterly taxes when cash is available
- Defers taxes silently when broke (creates debt without toast)
- Auto-settles outstanding tax debts as soon as cash is available
- Status bar shows what the CPA did — no more IRS toast interruptions

### Board Room UX Overhaul
- **Upgrades grouped by category** with emoji header rows:
  - 📊 Finance | 💰 Revenue | 🏛️ Tax | 📈 Investor Relations | 🛡️ Protection
- **Upgrades sorted by cost** (ascending) within each category
- Category headers have underline separators for visual clarity

### Growth Initiative Improvements
- Description dynamically shows total accumulated bonus when owned
  - e.g., "+2% revenue per purchase (stacks). Current: +21.9% total (×10)"

### UI Cleanup
- **Removed P&L section** from operations tab — redundant with tax panel and revenue breakdown bar

### Smart CFO System (Finance Dept Rework)
- **Finance Dept now has 3 AI tiers** instead of static guidance override:
  - Lv1 "The Intern" (500 RE): Random guidance — 25% conservative, 50% in-line, 25% ambitious
  - Lv2 "Competent CFO" (2,500 RE): Trend-based algorithm, 20% safety margin, ~70% optimal
  - Lv3 "Elite CFO" (10,000 RE): Smart analysis (trend + streak + bonuses), 5% safety margin, ~90% optimal
- Per-level CFO record tracking — shows beats/total and win percentage in IR section
- Clickable pill-style CFO level selector in IR section
- CFO switch takes effect at next earnings (no mid-quarter guidance cheesing)

### Balance Changes
- **Analyst ratchet toned down** — was ×1.15 per beat, now ×1.05 at 3+ streak, ×1.02 normal
- Analyst baseline hard-capped at 2.5×
- Existing saves with inflated baseline (>2.5) reset to 1.5 on load

### Growth Initiative (RE Progression)
- **New repeatable Board Room upgrade**: +2% revenue multiplier per purchase, stacks multiplicatively (1.02^N)
- Base cost 50 RE, scales 10% per purchase (50 → 55 → 60 → 66 → 73...)
- RE stats in IR section: "Last Q: +198" and ETA to next affordable upgrade

### Number Formatting
- Added **Quadrillion (Q)** tier to all format functions
- Added **Trillion (T)** tier where missing

---

## [v0.1.0] — 2026-02-13

First playable release. Tagged on commit `b653a39`.

### Core Game
- 4 startup arcs (Tech, Food, Media, Finance) with 12 tiers each (0-11)
- Click-to-collect revenue mechanic
- Hire employees, upgrade departments, automate collection
- Max(N) buttons for bulk hiring and upgrading
- Company age display (Day N → Yr N, Day N)
- Game date starts on real-world date

### Economy
- Real annual revenue per employee: Tier 0 $3K/yr (lemonade stand) → Tier 11 endgame
- 1 tick = 1 second = 1 game-day
- Revenue breakdown bar: $/sec, $/min, $/hr, $/day

### Events & Mini-Tasks
- Random events (Outlook-style toasts) — power outage, lucky client, viral/media bonus
- All event toasts auto-expire in 10 seconds with countdown
- Mini-tasks: tiered (clerical/management/executive), streak bonuses, 10s auto-expire
- Golden cell: random glowing cell appears, click for 20× bonus

### Tax System
- Quarterly tax every 90 game-days
- AMT: 15% floor on gross revenue
- Depreciation over 4 quarters
- Escalating IRS consequences: Notice → Garnishment → Asset Seizure
- IRS toasts non-closable

### IPO & Earnings (Phase 2.1)
- IPO at $5T valuation
- Stock price ticker
- Quarterly earnings with modal
- Guidance system (4 levels)
- Beat/miss mechanics with stock reactions
- Retained Earnings prestige currency
- Fractal market noise with volatility clustering

### Board Room (Phase 2.2)
- Revenue Multipliers I-III
- Lobbyist / Tax Haven
- Analyst Relations
- Golden Parachute
- Finance Dept (3 levels)

### UI / Excel Authenticity
- Full Excel chrome: title bar, menu bar, toolbar, formula bar
- Column headers, row numbers, dynamic filler rows
- Boss key (Esc), File menu, Help screen
- Draggable event toasts
- Valuation chart (floating, draggable, resizable)

---

*Live at: https://kpa-clawbot.github.io/quarter-close/*
*Repo: https://github.com/Kpa-clawbot/quarter-close*

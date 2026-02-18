# Changelog

All notable changes to Quarter Close.

## [v0.7.2] — 2026-02-18 — Juice, Odometer & Polish

### 🧃 Visual Effects Overhaul
- **Earnings Danger System** — When tracking toward a MISS in the last 15 days: cash and $/day jitter, revenue cells get a red tint, red glow builds around the IR section (intensifies in last 5 days). A warning banner now shows at the top of the screen with tracking %, gap amount, and days left. Critical mode (≤5 days) pulses red with "MISS IMMINENT" warning. If the player catches up, everything snaps off with a relief flash.
- **Beat Celebration — Ambitious** — 2-second shimmer on displays, golden flash across stats row, formula bar shows `=EARNINGS("Ambitious Target", "BEAT!")`.
- **Beat Celebration — Aggressive** — Brief freeze, then the screen explodes: golden screen flash, 40-piece confetti rain, giant "📈 BEAT! 📈" text slams center screen, triple sparkle burst from multiple points, green slam flash. Real numbers stay visible the whole time — no more confusing digit scramble.
- **Miss Thud** — Freeze, then red screen flash, screen shake, "📉 MISS 📉" big text, formula bar shows `=ERROR("Missed Guidance", "OUCH")`.
- **Click Depress** — Buttons shrink and dim on press for tactile feedback. Default scale 0.79 (tunable 0.70-1.0).
- **Earnings Ticker Tape** — Bloomberg-style scrolling ticker after quarterly earnings. Shows quarter, beat/miss percentage, stock price, analyst reactions. Color-coded.
- **Stock Price Heartbeat** — Perpetual pulse glow on stock price. Speeds up on beat, slows on miss, jitters during crises.
- **Cell Stamps** — "HIRED" / "UPGRADED" / "APPROVED" stamps slam down from 180% scale then float away. Bold colors with background tint.
- **All effects cranked up** — stamps bigger/bolder, heartbeat glow doubled, danger tint 6-18% (was 3-8%), sparkles 12 particles with larger spread, slam/thud shake doubled.
- **Tunable via juice knobs** — 🎛️ panel with sliders for every effect. Defaults tuned by playtesting.

### 🎰 Cash Odometer
- **Smooth counter animation** — cash display counts up/down instead of snapping. 950ms linear animation for continuous motion. 3 decimal places so the last digit is always ticking.

### 📊 Live Status Bar
- Status bar now shows live info instead of sitting at "Ready": pre-IPO shows revenue/day, post-IPO shows quarter label, days left, and % of target. Temporary messages (events, crises) still display normally.

### 💰 CTO/COO Budget Rework
- **Budget = % of free cash** — eliminated pool/skimming system entirely. Slider sets what % of free cash (after tax reserves) goes toward auto-buying each tick. Up to 50 operations per tick.
- **Both budgets from same snapshot** — CTO running first no longer eats into COO's budget.
- **Tax reserve** — budget computed against free cash minus outstanding tax debts minus estimated quarterly tax. Prevents CTO/COO from spending all the tax money.
- **Real tax estimate** — uses depreciation deductions and AMT, not crude `revenue × rate × 50%`.
- **Simplified display** — just "X spent this Q" instead of confusing "avail" numbers.

### 🔧 Fixes
- **Guidance target $0 on load** — stale saves now recalculate the target from current revenue rate.
- **Rev/Day fixed** — per-department Rev/Day was missing Board Room revenue multiplier.
- **formatMoney negatives** — handles negative numbers correctly.
- **Removed unused scramble system** — `scrambleText()` and drumroll speed knob removed.

## [v0.7.1] — 2026-02-18 — Polish & Fixes

### 🖱️ Overtime Rebalanced
- **All-Hands Sprint reverted to Overtime** — 3 charges × 30 days was effectively doubling quarterly revenue for free. Back to the original system: unlimited clicks with diminishing returns (5s of revenue per click, efficiency drops with each click, resets each quarter). Rewards active play without being game-breaking.

### 🕴️ Boss Mode Improvements
- **Proper spreadsheet disguise** — fake Q1 Budget Tracker data, ribbon toolbar, formula bar shows cell references (`E9`, `=SUM(B9:D9)`)
- **Column/row headers** — `.boss-corner` div for authentic Excel look
- **Floats suppressed** — no floating numbers, milestone popups, or cell flashes leak through boss mode or crisis overlays
- **Title bar** — shows "Book1.xlsx" instead of "Book1 - Excel" (avoids trademark)

### 📌 Pinned Row 1
- **Cash/RE row stays visible** when scrolling Operations and Board Room tabs
- Column headers (A–H) and Row 1 moved out of the scrollable grid into a fixed `#grid-header` div — eliminates sticky CSS conflicts entirely

### 🔧 Fixes
- **Scroll position preserved** — Operations tab no longer resets to top every tick. Root cause: tax panel's change-detection hash used raw numeric values that changed every tick, triggering full DOM rebuild. Fixed by hashing on formatted display values + explicit scrollTop save/restore around all DOM rebuilds.
- **Dark mode crisis overlays** — 19 CSS overrides used dead `html[data-theme="dark"]` selector. All fixed to `.dark-mode`.
- **Hire/upgrade delta display** — "+$/day" preview on buttons now includes all multipliers (prestige, breakthroughs, Board Room revenue). Previously showed tiny numbers ignoring 10× prestige bonuses.
- **Active clicking scales with progression** — Collect gives 50% of dept daily revenue (was flat $1-$5K). Management Focus: +25%/click, max +200%, decays every 20s.
- **"Visual Effects" label** — removed "Juice" from player-facing settings toggle.
- **formatMoney negatives** — negative numbers display correctly instead of raw scientific notation.

## [v0.7.0] — 2026-02-17 — Crisis Mode

### ⚡ Crisis Overlays
When disaster strikes, your spreadsheet fights back with dramatic full-screen overlays:
- **Power Outage → Blue Screen of Death** — Windows-style BSOD with random stop codes and recovery progress bar
- **Ransomware → Lock Screen** — dark terminal with red text, fake BTC ransom address, countdown timer
- **DDoS Attack → Chrome Error Page** — "ERR_CONNECTION_TIMED_OUT" with CloudShield recovery progress
- **Database Corruption → Terminal Console** — green-on-black fsck recovery with lines appearing one by one
- **Password Reset → (Not Responding)** — screen frosts over with blur + grayscale, title bar shows "(Not Responding)"
- **Cloud Outage → Status Page** — corporate incident page with service-by-service status indicators
- Grid interactions blocked during crises (menus and Board Room still accessible)
- DDoS now drops revenue to 0% (was 50%) — full outage justifies the dramatic overlay

### 🗂️ Executive Assistant & 📣 PR Director (NEW)
- **Executive Assistant** (500 RE, Admin) — auto-handles busywork emails: accepts mom's investment, refunds angry customers, takes college buddy meetings. Result shown as green formula bar echo.
- **PR Director** (2,000 RE, Sales) — never says no to free press. Auto-accepts TikTok viral, Forbes features, Reddit front page, local news. Revenue boosts activate without interrupting gameplay.
- Disaster events stay manual — those deserve your attention.

### 📊 Reports Tab (NEW)
- **Third tab** after Operations and Board Room — a performance dashboard for every role you've hired.
- CFO: earnings beats/misses and win rate. CTO: upgrades bought, spent this quarter. COO: hires made, spent. VP Ops: tasks completed, avg reward, capture rate, best streak (with ON/OFF toggle). Sales Director: deals closed, revenue earned. EA: emails handled, cash earned/spent, net P&L. PR Director: events handled, boosts activated. CPA: total taxes paid.
- Tab appears after your first Board Room purchase. Board Room = shop, Reports = dashboard.

### 🤝 Sales Director (NEW)
- **New Board Room upgrade** — auto-closes "Close the Deal" popups so you never miss a contract
- Three levels: Lv1 (1,000 RE, 50% deal value), Lv2 (4,000 RE, 75%), Lv3 (15,000 RE, 100%)
- Stats tracking in Board Room: deals closed, revenue earned, left on table, capture rate
- Automation hint after 5 manual deals — email from Sales Department nudges toward Board Room

### 🏢 Board Room Improvements
- **Board Room reorganized** — old "Operations" category split into three clean groups: 👥 Hiring (COO), 📋 Admin (VP of Ops), 🤝 Sales (Sales Director). Each collapses independently when fully purchased.
- **Completed categories collapse** — fully-purchased upgrade categories shrink to a single "✅ Complete (3/3)" row
- **Mixed categories handled** — categories with both finite and repeatable upgrades (like Revenue) collapse the finished tiers while keeping repeatable ones visible (e.g., Growth Initiative)
- **VP of Ops stats expanded** — three detailed rows: tasks completed, avg per task, capture rate, revenue earned, left on table, best streak
- **Sales Director stats** — deals closed, revenue earned, left on table, capture rate
- **Separate column widths** — Operations and Board Room tabs have independent column widths, saved separately

### 💰 CFO Budget Rebalance
- **CFO Lv3 no longer traps you at 5%** — old logic halved budget on tax debt AND subtracted 5% on streaks, bottoming out permanently
- **CFO now splurges on winning streaks** — streak ≥3 adds +2% per streak level (up to 40%) instead of reducing budget
- **Base rates bumped** — conservative 25% (was 20%), in-line 18% (was 15%), ambitious 12% (was 10%)
- **Budget sliders always usable** — dragging the slider when Auto is on automatically switches to manual control
- **CTO/COO auto-buy floats from budget pool** — floating numbers now appear on the pool display, not the main cash number

### ✨ More Visual Feedback
- **RE earn floats** — shows `+42 RE` when retained earnings increase (earnings beats, events)
- **RE spend floats** — Board Room purchases show floating `-500 RE` from the RE display
- **$/day floating numbers** — shows delta (`+$2.5M`) when revenue rate changes
- **Rev/Q floating numbers** — shows quarterly delta (`+$225M/Q`) with cell flash
- **Float stacking capped at 3** — no more climbing off-screen; uses modular positioning
- **RE display moved to cell E** — cleaner layout with rev/Q in cell D, ⭐ RE in cell E

### 🖱️ Active Play Revamp
All three clicking mechanics were worthless past early game — now they scale with progression:
- **Collect** — was a flat $1-$5,000 per click (useless at $1T/day). Now gives **50% of department's daily revenue** per click — scales with prestige, upgrades, breakthroughs, Board Room multipliers.
- **Management Focus** — was +5% per click, max +50%, decayed every 10s. Now **+25% per click, max +200%** (8 stacks), decays every 20s. Works on automated departments — main late-game active mechanic.
- **Overtime → All-Hands Sprint** — was 5s of revenue with diminishing returns (spam clicks, each worth less). Now **3 charges per quarter**, each giving **30 days of total revenue** at full power. Tactical: pick your moments.

### 🔧 Fixes
- **Dark mode crisis overlays fixed** — DDoS and Statuspage overlays flashed bright white in dark mode. 19 CSS dark mode overrides used wrong selector (`html[data-theme="dark"]` instead of `.dark-mode`) and never applied. Now correctly themed.
- **Hire/upgrade $/day preview fixed** — buttons showed tiny deltas ("+$1.18/d") ignoring prestige (★ = 10×), breakthroughs (🔬), and Board Room revenue multipliers. Now shows actual expected gain.
- **Chart no longer reappears after close on reload** — init order bug fixed
- **Milestone spam on reload fixed** — milestone trackers now persist in save data
- **Revenue stat suffixes fixed** — status bar above Quadrillion shows correct suffixes
- **Crisis overlay covers full viewport** — position:fixed, works in both tabs
- **Column resize works in Board Room** — removed blocking guard
- **formatMoney handles negatives** — negative numbers no longer show raw scientific notation

## [v0.6.0] — 2026-02-17 — Quality of Life

### ✨ Visual Effects ("Game Juice")
- **Cell background flash** — green pulse on cash earned, red pulse on cash spent; also on $/day and RE cells when values change
- **Floating numbers** — RPG-style `+$50K` / `-$12K` float up from the cash display on purchases, events, rewards, and tax payments
- **Cash milestones** — golden `🎉 $1M!` floats when crossing $1K/$10K/$1M/$1B/$1T thresholds
- **RE milestones** — golden `⭐ 1,000 RE!` floats at 100/250/500/1K/2.5K/5K/10K/25K/50K/100K
- **$/day milestones** — same thresholds as cash, fires when revenue rate hits new highs
- **Insufficient funds shake** — cash cell shakes when you try to buy something you can't afford
- **Scale bump** — subtle 1.08× pop on cash value on every change
- All effects toggleable via Data → Game Options → ✨ Visual Effects

### 🤖 VP of Operations
- **New Board Room purchase** — auto-handles mini-tasks so you don't have to
- Three upgrade levels: Lv1 (500 RE, 50% reward), Lv2 (2000 RE, 75% reward, streak cap 5), Lv3 (8000 RE, 100% reward, full streaks)
- Stats tracking: tasks completed, revenue earned, revenue missed, best streak
- ON/OFF toggle to take back manual control

### 💡 Automation Hints
- **Email nudges toward Board Room automation** — the game notices when you're doing things manually and suggests upgrades
- Triggers: 10 mini-tasks → VP of Ops, 5 tax settlements → CPA, 3 missed earnings → CFO, 15 manual hires → COO
- Phase-gated (post-IPO only), fires once per hint type

### 🎮 Playback Controls
- **Pause & Speed controls moved to toolbar** — bigger, more prominent, right-aligned next to formatting buttons
- **Auto-pause on menus/modals** — game pauses when browsing File/Data menus, Help, About, Save As, Manage Saves, or Game Options; resumes on close; respects manual pause
- **Speed toggle labels** — clear text (1×/½×/¼×/⅛×) instead of confusing arrow symbols
- **Timescale indicator** — shows current effective speed next to controls (🐢 ½ day/tick, ⏩ 3× etc.)

### 📊 Revenue Display
- **Quarterly revenue in header** — cell D shows projected rev/Q (daily rate × 90)
- **Quarterly revenue in status bar** — revenue breakdown adds /Q at the end (/sec │ /min │ /hr │ /day │ /Q)
- **Revenue rates account for slowdown** — /sec, /min, /hr reflect actual real-time rates when slowed

### 🎨 UI Clarity
- **Decorative elements dimmed** — non-functional toolbar buttons (Undo, Redo, Bold, font selects, etc.) faded to 35% opacity; unused menu items (Home, Insert, Formulas, etc.) at 45%
- **Tooltips everywhere** — all buttons and menu items have descriptive tooltips
- **Default font size increased** — base font bumped from 12-16px to 14-18px range
- **RE display hidden pre-IPO** — ⭐ RE label and value hidden before IPO since it's not relevant yet

### 🔧 Fixes
- **RE display layout fix** — RE hidden pre-IPO without breaking grid cell layout
- **Rev/yr label shortened** — "Total Rev/yr:" → "Rev/yr:" for cleaner header
- **Budget normalization** — CTO + COO budgets exceeding 100% now scale proportionally

## [v0.5.0] — 2026-02-16 — "Ripped from the Headlines"

### 📰 "Ripped From the Headlines" Events
11 new corporate drama events inspired by real-world news:
- **🔫 Healthcare CEO Incident** — executive shot outside conference, shell casings engraved with "DENY, DEFEND, DEPOSE"
- **🏛️ Congressional Hearing** — CEO subpoenaed, topics rotate (monopoly, AI safety, data privacy)
- **🏠 WFH Revolt** — employees threaten to quit over RTO mandate
- **📉 Short Seller Attack** — Hindenburg publishes a hit piece on your company
- **🤖 AI Disruption** — AI can replace 20% of a department's workers
- **🐦 CEO Tweets Something Stupid** — 6 possible tweets, each terrible
- **🏦 Bank Collapse** — your corporate bank fails, FDIC covers $250K
- **💰 Activist Investor** — Carl Icahn or friends demand "shareholder value"
- **🚢 Supply Chain Crisis** — stuck ships, port strikes, fab fires
- **🦠 Pandemic** — new virus, markets crash, toilet paper shortage
- **💊 CEO Health Scare** — CEO hospitalized, COO succession matters

### 📐 Resizable Columns
- **Drag column headers (A–G) to resize** — just like Excel/Google Sheets
- Column widths saved automatically and persist across sessions
- Touch-friendly handles for iPad/mobile
- Column H stays flexible

### 🔧 Budget Normalization Fix
- **Fixed negative cash** when CTO + COO budgets exceeded 100% combined
- Proportional normalization: if combined budget > 100%, both scale down proportionally (e.g. 100% + 100% → 50%/50%)
- Budget percentage turns gold when normalization is active, showing effective rate
- Hover/long-press shows full context ("Set 100% → effective 50%")

### 💾 Multi-Slot Save System
- **Unlimited named save slots** — create as many saves as you want
- **File → Save As...** — name your saves, create new slots
- **File → Manage Saves...** — modal showing all slots with Load, Rename, Export, Delete buttons and storage size per slot
- **File → Export to File...** — download save as .json file with SHA-256 checksum
- **File → Import from File...** — preview modal with save details, checksum validation, import as new slot
- Old single-save format auto-migrates to slot 1
- New Game creates a new slot (no longer wipes existing saves)

### 📐 Resizable Columns
- **Drag column headers (A–G) to resize** — just like Excel/Google Sheets
- Column widths saved automatically and persist across sessions
- Touch-friendly handles for iPad/mobile
- Column H stays flexible

### ⏸ Pause Button
- Pause/Resume button in status bar
- Shows ⏸ while running, ▶ on red background when paused
- Status text changes to "Paused"

### 📊 Chart Persistence
- Floating chart **visibility** now persists — close it, and it stays closed on reload
- Floating chart **position and size** now persist across reloads

## [v0.4.1] — 2026-02-15

Balance and UX fixes.

### ⚖️ Upgrade Scaling Rebalance
- **Cost formula**: `2^level` → `1.07^level` — gentle exponential curve instead of brutal doubling
- **Revenue**: stays linear (`1 + level × 0.5`) — predictable, satisfying growth
- CTO buys every 37s at Lv0, slowing to ~18min at Lv50 — machine gun early, natural soft cap late
- Lv70+ takes 1h+ per upgrade, naturally nudging toward prestige/restructuring

### 🏢 Board Room Fixes
- Board Room now shows only Cash row + purchasable upgrades (no P&L, IR, or department headers)
- Fixed `updateTaxPanel()` re-showing hidden panels every tick in Board Room mode
- C-Suite section (CFO/CTO/COO + budget sliders) extracted into shared function

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

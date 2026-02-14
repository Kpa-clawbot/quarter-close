# Changelog

All notable changes to Quarter Close.

## [Unreleased] — Post v0.1.0

### Smart CFO System (Finance Dept Rework)
- **Finance Dept now has 3 AI tiers** instead of static guidance override:
  - Lv1 "The Intern" (500 RE): Random guidance — 25% conservative, 50% in-line, 25% ambitious
  - Lv2 "Competent CFO" (2,500 RE): Trend-based algorithm, 20% safety margin, ~70% optimal
  - Lv3 "Elite CFO" (10,000 RE): Smart analysis (trend + streak + bonuses), 5% safety margin, ~90% optimal
- Per-level CFO record tracking — shows beats/total and win percentage in IR section
- Clickable pill-style CFO level selector in IR section: `[Manual] [👶 1] [📊 2] [🎩 3]`
- CFO switch takes effect at next earnings (no mid-quarter guidance cheesing)
- Auto-activates highest owned level on purchase
- Revenue history tracked (last 3 quarters) for trend analysis

### Balance Changes
- **Analyst ratchet toned down** — was ×1.15 per beat (doubled in 5 quarters), now ×1.05 at 3+ streak, ×1.02 normal
- Analyst baseline hard-capped at 2.5× (can never become impossible)
- Existing saves with inflated baseline (>2.5) reset to 1.5 on load
- Analyst Relations upgrade: ×1.03/×1.01 (was ×1.075/×1.025)

### Number Formatting
- Added **Quadrillion (Q)** tier to all format functions — formatMoney, formatRate, formatPerTick, formatStatMoney, formatCompact
- Added **Trillion (T)** tier where missing — no more "13335M" displays

### UI
- Guidance row shows "Set by CFO" when Finance Dept is active (was always "Set at earnings")

### Docs
- Created `PHASE2.md` — full Phase 2 spec (IPO, Board Room, Finance Dept design, future ideas)
- Cleaned up `PHASE1.md` — Phase 1 is done, removed Phase 2 content that didn't belong
- Updated `DESIGN.md` with Board Room docs and Finance Dept algorithm spec
- Updated `DEVNOTES.md` with key decisions
- Updated in-game Help screen with Finance Dept level descriptions
- Mobile planning: `MOBILE.md` on branch `mobile-planning`, 18 issues filed (#34-#51)

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
- $/day shown prominently in blue next to cash

### Events & Mini-Tasks
- Random events (Outlook-style toasts) — power outage, lucky client, viral/media bonus
- All event toasts auto-expire in 10 seconds with countdown on worst-option button
- Mini-tasks: tiered (clerical/management/executive), streak bonuses, 10s auto-expire
- Golden cell: random glowing cell appears, click for 20× bonus

### Tax System
- Quarterly tax every 90 game-days: (revenue - depreciation) × 25% corporate rate
- Alternative Minimum Tax (AMT): 15% floor on gross revenue
- Depreciation: capital spending deducted over 4 quarters
- Escalating IRS consequences: 1st Notice → 2nd Notice (interest) → Garnishment (25% revenue) → Asset Seizure
- IRS/tax toasts are non-closable — must pick Pay or Ignore
- P&L section: Revenue, Expenses, Depreciation, Taxable Income, Taxes Paid, Net Income
- Double-underline on Net Income (accounting style), red parentheses for losses
- AMT taxable income shown in orange when AMT applies

### IPO & Earnings (Phase 2.1)
- IPO triggers at $5T valuation
- Stock price ticker in status bar and IR section
- Quarterly earnings every 90 game-days with modal
- Guidance system: Conservative (0.7×, 0.5× RE), In-Line (0.9×, 1× RE), Ambitious (1.1×, 2× RE), Aggressive (1.3×, 3× RE)
- Beat/miss mechanics with stock price reactions
- Retained Earnings (RE) prestige currency — logarithmic scaling (~100 base RE at endgame)
- Analyst ratchet: expectations increase on consecutive beats
- Earnings streak tracking
- Fractal market noise with volatility clustering for natural stock movement
- Game pauses during earnings modal

### Board Room (Phase 2.2)
- Board Room tab visible after IPO
- Revenue Multipliers I-III (1.1×, 1.25×, 1.5× stacking)
- Lobbyist (tax 25% → 20%)
- Tax Haven (tax → 15%)
- Analyst Relations (ratchet slowed 50%)
- Golden Parachute (seizure protection, consumable, rebuyable)
- Finance Dept Lv1-3 (see Smart CFO System above)

### Valuation Chart
- Company valuation line chart (floating, draggable, resizable)
- Positioned next to grid, samples every ~5 ticks
- Fractal market noise with volatility clustering

### UI / Excel Authenticity
- Full Excel-like chrome: title bar, menu bar, toolbar, formula bar
- Column headers (A-H) with row numbers
- Dynamic filler rows fill viewport like real Excel
- Formula bar updates with clicked cell reference and content
- Selected cell gets green outline
- Auto-sizing grid columns
- Sheet tabs at bottom (Operations / Board Room)
- Boss key (Esc) — shows fake budget spreadsheet
- File menu: Save, Auto-save toggle, New Game, About
- Help screen with full game guide (Excel-style dialog)
- Draggable event toasts
- Series A: real $5M cash injection at $1M earned

### Technical
- Save/load via localStorage
- Offline progress (8hr cap)
- Cache-busting with version query strings
- GoatCounter analytics (GitHub Pages only)
- GitHub Pages deployed from master branch
- Open Graph preview image for Discord/social embeds

---

*Live at: https://kpa-clawbot.github.io/quarter-close/*
*Repo: https://github.com/Kpa-clawbot/quarter-close*

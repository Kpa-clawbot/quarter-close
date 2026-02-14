# Quarter Close — Mobile Support

## Status: ✅ Fully Playable

The mobile version is available at `/mobile/` and includes all features from master.

## Architecture

Mobile support is built as a **CSS + JS layer on top of master's codebase**:

- **Same `game.js`** — mobile detection via `isMobile()` (`max-width: 600px` media query)
- **Same `index.html`** — extra mobile-only elements added (cash header, views, bottom nav)
- **Same `style.css`** — mobile overrides in `@media (max-width: 600px)` blocks

This ensures mobile stays in sync with master's features automatically.

## Mobile Layout

### Operations Tab (Main View)
- **Green cash header** — sticky at top, shows cash balance, rev/day, stock price
- **Card-based departments** — each department is a rounded card with:
  - Row 1: Name, level badge, employee count, rev/day
  - Row 2: Max(N) + Hire button (full width)
  - Row 3: Max(N) + Upgrade button + Restructure RE button
- **Overtime row** — dashed border card at bottom
- **Locked departments** — greyed out with Unlock button; non-unlockable ones hidden

### P&L Tab
- Profit & Loss card (quarterly + lifetime financials)
- Investor Relations card (stock price, guidance, earnings tracking)
- Tax Liability card (outstanding debts with Settle buttons)
- Mini cash header at top (shows cash on non-Ops tabs)

### Board Room Tab
- RE balance header
- Upgrade cards with name, description, cost, Buy/Locked status
- Only visible after IPO

### Settings Tab (More)
- Save Game, Auto-save toggle, Boss Mode, Game Options, Help, New Game
- Game stats display

### Bottom Navigation
- Ops | P&L | Board | More
- Board tab hidden pre-IPO
- Active tab highlighted

## Mobile-Specific Behavior

- **Shorter button labels**: "Hire $5K" instead of "Hire $5K (+$28.75/d)"
- **Collect button**: "💰 $32.85" instead of "Collect $32.85 (+$8.21)"
- **Auto-badge hidden** — automated status obvious from button layout
- **Toast positioning** — fixed above bottom nav, no drag
- **Deal popup** — fixed above bottom nav
- **Golden cell** — applies to whole card row
- **Splash screen** — skipped on mobile
- **Touch targets** — minimum 44px for all interactive elements
- **Safe area insets** — supports notched phones

## Files Modified

All changes are in the standard three files:
- `index.html` — mobile viewport meta, mobile-only elements, bottom nav
- `style.css` — `@media (max-width: 600px)` blocks (~600 lines)
- `game.js` — `isMobile()`, `mobileSwitchTab()`, mobile P&L/Board Room/Settings builders, `mobileTickUpdate()`, window exposures

## Deployment

GitHub Pages workflow deploys both branches:
- `/` — master (desktop)
- `/mobile/` — mobile branch

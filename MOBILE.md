# Quarter Close — Mobile Support

## Status: ✅ Fully Playable & Polished

The mobile version is available at `/mobile/` and includes all features from master.

## Architecture

Mobile support is built as a **CSS + JS layer on top of master's codebase**:

- **Same `game.js`** — mobile detection via `isMobile()` (`max-width: 600px` media query)
- **Same `index.html`** — extra mobile-only elements added (cash header, views, bottom nav)
- **Same `style.css`** — mobile overrides in `@media (max-width: 600px)` blocks

This ensures mobile stays in sync with master's features automatically.

## Mobile Layout

### Operations Tab (Main View)
- **Green cash header** — sticky at top, shows cash balance, rev/day, stock price (post-IPO)
- **Card-based departments** — each department is a rounded card with:
  - Row 1: Name, level badge, employee count, rev/day
  - Row 2: Max(N) + Hire button (full width)
  - Row 3: Max(N) + Upgrade button + Collect button (side by side)
  - Row 4: Automate button OR compact "⚡ AUTO" badge (when automated)
- **Restructure buttons** — gold-styled RE buttons appear next to Upgrade after IPO
- **Automated department indicator** — teal left border on automated cards
- **Overtime row** — dashed border card at bottom
- **Locked departments** — greyed out with Unlock button; non-unlockable ones hidden
- **Mini-task bar** — yellow bar at top for active mini-tasks (Close the Deal, etc.)

### P&L Tab
- Profit & Loss card (quarterly + lifetime financials)
- Investor Relations card (stock price, guidance, earnings tracking)
- Mini cash header at top (shows cash on non-Ops tabs)

### Board Room Tab
- RE balance header
- Upgrade cards with name, description, cost, Buy/Locked status
- Only visible after IPO

### Settings Tab (More)
- Save Game, Auto-save toggle, Boss Mode, Game Options, Help, New Game
- Game stats display (date, rev/sec, rev/day, rev/year, total earned, clicks, play time, stock, RE)

### Bottom Navigation
- Ops | P&L | Board | More
- Board tab hidden pre-IPO
- Active tab highlighted in green
- Subtle press/active state for touch feedback

## Mobile-Specific Behavior

- **Clear button labels**: "Hire $5K", "Upgrade $30K", "💰 Collect $41K", "Automate $500"
- **Upgrade always visible** — no longer hidden when not automated
- **Collect shows pending amount** — "💰 Collect $X" or just "💰 Collect" when nothing pending
- **Auto-badge compact** — small "⚡ AUTO" text, doesn't waste vertical space
- **Toast/notification positioning** — fixed above bottom nav + status bar, no overlap with nav
- **Deal popup** — fixed above bottom nav
- **Golden cell** — applies to whole card row
- **Splash screen** — skipped on mobile
- **Touch targets** — minimum 44px for all interactive elements
- **Safe area insets** — supports notched phones
- **Status bar** — compact flex layout with ellipsis for long messages, date, stock price, timer
- **Boss Mode** — fake Excel spreadsheet, works on mobile viewport

## All 15 Game Mechanics Tested on Mobile

1. ✅ Start new game — arc selection flows smoothly
2. ✅ Collect revenue — 💰 Collect buttons with clear amounts
3. ✅ Hire employees — Hire + Max(N) buttons
4. ✅ Upgrade departments — always visible (not hidden behind Auto)
5. ✅ Automate departments — Automate button → ⚡ AUTO badge + teal border
6. ✅ Unlock new departments — Unlock buttons, locked ones properly greyed
7. ✅ Mini-tasks — yellow bar with Approve/Sign buttons
8. ✅ Events/notifications — toasts with action buttons, positioned above nav
9. ✅ IPO / Earnings — earnings modal with guidance selection (4 options)
10. ✅ IRS taxes — Pay/Ignore buttons, penalty notifications
11. ✅ Board Room — browse RE upgrades, Buy buttons, requirement locks
12. ✅ Settings — save/load, new game confirm, boss mode, help, game options
13. ✅ Overtime (Push It) — overtime card with reward display
14. ✅ Close the Deal — deal popup with Sign button
15. ✅ Management Focus — department name tap for focus boost

## Files Modified

All changes are in the standard three files:
- `index.html` — mobile viewport meta, mobile-only elements, bottom nav
- `style.css` — `@media (max-width: 600px)` blocks (~600 lines)
- `game.js` — `isMobile()`, `mobileSwitchTab()`, mobile P&L/Board Room/Settings builders, `mobileTickUpdate()`, window exposures

## Deployment

GitHub Pages workflow deploys both branches:
- `/` — master (desktop)
- `/mobile/` — mobile branch

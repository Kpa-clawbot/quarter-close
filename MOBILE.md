# Quarter Close — Mobile Support

## Status: ✅ Phase 1 Complete

The mobile version is available at `/mobile/` and includes all features from master.

### Phase 1 Summary (Completed 2026-02-14)

Phase 1 delivered a fully playable mobile port of Quarter Close with:

- **Card-based mobile layout** replacing the desktop spreadsheet grid — each department rendered as a rounded card with action buttons
- **Bottom navigation bar** with four tabs: Ops, P&L, Board, More — with Board tab auto-hidden pre-IPO
- **All 15 core mechanics working on mobile** — verified and tested (see checklist below)
- **Touch-friendly UI** with minimum 44px tap targets across all interactive elements
- **Haptic feedback** on all major actions (hire, upgrade, automate, collect, unlock, tab switch, etc.)
- **Animations and active states** — button press feedback, cash pulse, card unlock animations, toast slide-ups, mini-task pop-in
- **Nav badges and collect highlights** — P&L tab alert badge for tax debts, green highlight on collect buttons with pending revenue
- **Multiple polish passes** — disabled button styling, hidden scrollbars, modal backdrop blur, overtime card styling, toast vertical stacking, safe area insets for notched phones

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
- **Restructure buttons** — gold-styled RE buttons appear next to Upgrade after IPO (full-width on automated depts)
- **Automated department indicator** — teal left border on automated cards (with transition)
- **Overtime row** — dashed border card at bottom, orange styling
- **Locked departments** — greyed out with Unlock button; non-unlockable ones hidden
- **Mini-task bar** — yellow gradient bar with pop-in animation, styled approve/skip buttons

### P&L Tab
- Profit & Loss card (quarterly + lifetime financials)
- Investor Relations card (stock price, guidance, earnings tracking)
- Tax debt cards with settle buttons
- Mini cash header at top (shows cash on non-ops tabs)
- **Alert badge on tab** when tax debts exist

### Board Room Tab
- RE balance header
- Upgrade cards with name, description, cost, Buy/Locked status
- Only visible after IPO

### Settings Tab (More)
- Save Game, Auto-save toggle, Boss Mode, Game Options, Help, New Game
- Game stats display (date, rev/sec, rev/day, rev/year, total earned, clicks, play time, stock, RE)
- **Active effects display** (power outage, revenue penalty/bonus, DB outage, hire freeze, IRS garnishment with countdown timers)

### Bottom Navigation
- Ops | P&L | Board | More
- Board tab hidden pre-IPO
- Active tab highlighted in green with top indicator line
- Subtle press/active state for touch feedback
- **Alert badge** on P&L tab when tax debts exist (animated pop)

## Mobile-Specific Behavior

### Touch & Interaction
- **Haptic feedback** — vibration on all major actions (hire, upgrade, automate, collect, unlock, restructure, deal clicks, mini-tasks, overtime, golden cell, arc selection, tab switch, event choices)
- **Button active states** — scale + color change feedback on all button types (hire=blue, upgrade=green, collect=green, automate=teal, unlock=orange, prestige=gold)
- **Cash header pulse** — green pulse animation on revenue collection
- **Card unlock animation** — scale + opacity + color transition when unlocking departments
- **Toast slide-up animation** — toasts slide up from bottom instead of appearing
- **Mini-task pop-in** — animated appearance for mini-task bar
- **Double-tap prevention** — 400ms debounce on automate buttons
- **Scroll-to-top** — smooth scroll on tab switch
- **Scroll to unlocked card** — auto-scrolls to newly unlocked department

### Visual Polish
- **Collect button highlight** — green background when pending revenue available
- **Disabled button styling** — reduced opacity for unaffordable actions
- **Hidden scrollbars** — cleaner look on all scrollable views
- **Modal backdrop blur** — subtle blur behind modals
- **Overtime card** — warm orange styling with active state
- **Toast buttons stacked vertically** — full-width for easy tapping on earnings guidance (4 options)
- **Status bar** — wider text area, subtle background, shows game date and timer

### Button Labels
- **Clear button labels**: "Hire $5K", "Upgrade $30K", "💰 Collect $41K", "Automate $500"
- **Upgrade always visible** — no longer hidden when not automated
- **Collect shows pending amount** — "💰 Collect $X" or just "💰 Collect" when nothing pending
- **Auto-badge compact** — small "⚡ AUTO" text, doesn't waste vertical space

### Layout & Positioning
- **CSS flex ordering** — status bar (order 90) and nav (order 100) always at bottom, cash header (order -2) at top on non-ops tabs
- **Toast/notification positioning** — fixed above bottom nav + status bar, no overlap with nav
- **Deal popup** — fixed above bottom nav
- **Golden cell** — applies to whole card row
- **Splash screen** — skipped on mobile
- **Touch targets** — minimum 44px for all interactive elements
- **Safe area insets** — supports notched phones

### Arc Selection
- **Flex layout** — icon on left, text content on right
- **Active press state** — scale + color feedback on tap
- **Full-height** — uses 100dvh for proper mobile viewport
- **Gradient background** — subtle green gradient

### Data Updates
- **P&L hash** includes tax debt details (current amount + stage) for live updates
- **P&L hash** includes cash for real-time settle button enable/disable
- **Board Room hash** includes cash for buy button enable/disable

## All 15 Game Mechanics Tested on Mobile

1. ✅ Start new game — arc selection flows smoothly
2. ✅ Collect revenue — 💰 Collect buttons with clear amounts + haptic + cash pulse
3. ✅ Hire employees — Hire + Max(N) buttons + haptic
4. ✅ Upgrade departments — always visible (not hidden behind Auto) + haptic
5. ✅ Automate departments — Automate button → ⚡ AUTO badge + teal border + haptic
6. ✅ Unlock new departments — Unlock buttons, locked ones properly greyed + unlock animation
7. ✅ Mini-tasks — yellow bar with Approve/Sign buttons + haptic
8. ✅ Events/notifications — toasts with action buttons, slide-up animation, vertical stacking
9. ✅ IPO / Earnings — earnings modal with guidance selection (4 vertical buttons)
10. ✅ IRS taxes — Pay/Ignore buttons + P&L tab badge
11. ✅ Board Room — browse RE upgrades, Buy buttons, requirement locks
12. ✅ Settings — save/load, new game confirm, boss mode, help, game options, active effects
13. ✅ Overtime (Push It) — overtime card with orange styling + haptic + cash pulse
14. ✅ Close the Deal — deal popup with Sign button + haptic per click + success celebration
15. ✅ Management Focus — department name tap for focus boost

## Polish Pass 3 (Latest)

### Fixes Applied
1. **Stock price visible in Ops cash header** — `#stock-price-cell` was hidden by `.cell-h { display: none }` rule. Added `display: flex !important` override with higher specificity (`#row-cash #stock-price-cell`). Shows "📈 $X.XX" via CSS `::before` pseudo-element, hiding the "Stock:" label for space efficiency.
2. **Penalty/bonus indicators improved** — Colors lightened for dark green header background (#ff8a80 red, #ffab40 orange, #a5d6a7 green). Font size bumped from 9px to 11px for readability.
3. **Non-ops tabs cash header shows effects** — `updateMobileCashHeader()` now renders penalty/bonus/outage indicators with mobile-appropriate colors, matching the Ops tab behavior.
4. **Prestige button disabled state** — Changed from flat grey (#f5f5f0) to muted gold gradient, maintaining visual identity even when unaffordable.

### Verified Working
- All 15 core mechanics tested end-to-end
- Penalty/bonus/outage indicators on both Ops and non-ops headers
- Boss mode (Excel disguise) renders correctly on mobile viewport
- Event toasts with action buttons properly positioned above nav
- Deal popup positioned and functional
- Mini-task bar with pop-in animation
- Board Room scrolling through all categories
- Earnings guidance selection (4 vertical buttons)
- Swipe gesture between tabs
- No console errors or warnings

## Files Modified

All changes are in the standard three files:
- `index.html` — mobile viewport meta, mobile-only elements, bottom nav
- `style.css` — `@media (max-width: 600px)` blocks (~800 lines)
- `game.js` — `isMobile()`, `mobileSwitchTab()`, mobile P&L/Board Room/Settings builders, `mobileTickUpdate()`, haptic feedback, animations, window exposures

## Deployment

GitHub Pages workflow deploys both branches:
- `/` — master (desktop)
- `/mobile/` — mobile branch

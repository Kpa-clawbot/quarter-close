# Mobile Overhaul — Design Decisions & Changelog

## The Problem
The game uses an 8-column CSS grid to simulate a spreadsheet. On mobile (320-420px wide), this is fundamentally broken:
- Columns get crushed to unreadable widths
- Buttons overflow or stack awkwardly
- Information scattered across columns can't be parsed at a glance
- Touch targets compete for space on tiny rows

Previous mobile fixes (issues #34-51) hid some columns and enlarged touch targets, but the underlying grid layout is the wrong metaphor for phone screens.

## The Solution: Card-Based Mobile Layout

On screens ≤600px, we switch from a spreadsheet grid to a **vertical card layout**.

### Architecture
- CSS media query at `max-width: 600px` transforms the entire layout
- JavaScript `isMobile()` helper (uses `matchMedia`) for rendering differences
- Desktop layout is **completely untouched** — all mobile changes are additive
- Same game state, same game logic, different presentation

### Mobile Layout Structure
```
┌─────────────────────────┐
│ [Cash Header - sticky]  │  ← Green gradient, $amount, $/day
├─────────────────────────┤
│ [Mini-task bar]         │  ← When active
├─────────────────────────┤
│ [Department Card 1]    │  ← Scrollable content area
│ [Department Card 2]    │     (varies by active tab)
│ [Department Card 3]    │
│ [Next Unlock Card]     │
│ ...                    │
├─────────────────────────┤
│ [Status Bar]           │  ← Game date, time
├─────────────────────────┤
│ 📊 Ops │📋 P&L│🏢 Board│⚙️ More │  ← Bottom nav
└─────────────────────────┘
```

### Department Cards (Operations Tab)
Each revenue source becomes a self-contained card:
```
┌─────────────────────────────┐
│ Blog with Ads  Lv2   👥 5  │  ← Name, level, staff count
│                    $8.22/d  │  ← Revenue per day
├─────────────────────────────┤
│ [Max(3)] [Hire $50]        │  ← Hire row (full width)
├─────────────────────────────┤
│ [⬆ $200]    [💰 $12.34]   │  ← Upgrade + Collect (side by side)
└─────────────────────────────┘
```

### P&L Tab
Card-based financial summary:
- **Profit & Loss card**: Revenue, expenses, depreciation, taxes, net income
- **Investor Relations card** (post-IPO): Quarter, stock price, earnings tracking, CFO selector
- **Tax Liability cards**: Individual debt cards with settle buttons

### Board Room Tab (post-IPO)
- RE balance header card
- Upgrade cards with name, description, cost, and buy/owned status

### Settings Tab
- Save Game, Auto-save toggle, Boss Mode, Help, New Game buttons
- Game statistics

## What's Preserved (ALL mechanics ✅)
- ✅ Hiring, upgrading, automating departments
- ✅ Revenue bonuses/penalties (events)
- ✅ Quarterly earnings, guidance selection, CFO automation
- ✅ Events (toast notifications with action buttons)
- ✅ IRS tax system with all escalation stages (notice → garnishment → seizure)
- ✅ Board Room (RE upgrades, prestige/restructure)
- ✅ Settings/options (File menu → settings tab)
- ✅ Mini-tasks with streak bonuses
- ✅ Golden cells (glow applied to entire card on mobile)
- ✅ Status bar (game date, play time)
- ✅ Deal popup / earnings modal (uses toast system)
- ✅ Boss mode (accessible from settings)
- ✅ Offline earnings
- ✅ Series A milestone

## What Changed
| Feature | Desktop | Mobile |
|---------|---------|--------|
| Layout | 8-column CSS grid | Card-based vertical flex |
| Navigation | Sheet tabs | Bottom nav bar |
| Menu/Toolbar | Full ribbon | Hidden (settings in tab) |
| Formula bar | Visible | Hidden (decorative only) |
| Column headers | Visible | Hidden (info in cards) |
| Filler rows | Visible | Hidden |
| Revenue breakdown | Visible bar | Hidden (stats in settings) |
| Valuation chart | Floating overlay | Hidden |
| Button labels | Verbose with +rev/d | Short (cost only) |
| Collect button | "Collect $X (+$1)" | "💰 $X" |
| Locked departments | All visible | Only next unlockable |
| Toast position | Draggable, centered | Fixed above bottom nav |
| Toast drag | Enabled | Disabled |
| P&L section | Grid rows | Dedicated tab with cards |
| Board Room | Grid rows | Dedicated tab with cards |
| Settings | File menu dropdown | Dedicated tab |

## Technical Details

### CSS
- All mobile styles in `@media (max-width: 600px)` block
- Landscape mode (>600px wide) uses compact desktop grid layout
- `.mobile-only` utility class for mobile-only HTML elements
- Safe area insets for notched phones (`env(safe-area-inset-*)`)
- `touch-action: manipulation` eliminates 300ms tap delay
- `overscroll-behavior: none` prevents pull-to-refresh
- All touch targets ≥ 44px

### JavaScript
- `isMobile()` uses `matchMedia('(max-width: 600px)')`
- `mobileSwitchTab()` controls tab switching on mobile
- `buildMobilePnL()` renders P&L as card layout
- `buildMobileBoardRoom()` renders Board Room as card layout
- Change detection via hash comparison (same pattern as desktop)
- Mobile-aware: golden cells, toast positioning, drag disabled
- Button labels shortened on mobile for readability
- Autosave toggle properly wired to `autosaveEnabled` flag

### HTML
- Mobile bottom nav bar (`#mobile-nav`)
- Mobile view containers (`#mobile-pnl-view`, `#mobile-boardroom-view`, `#mobile-settings-view`)
- Positioned in flex layout between grid container and status bar

## Version History
- **v18**: Complete mobile card layout overhaul (this work)
- **v17**: Previous mobile fixes (touch targets, hidden columns, text sizing)

# Mobile Overhaul v2 — Rebuilt from Master

## The Problem
The original mobile branch was 92 commits behind master, missing major features:
- Overtime (Push It) button
- Close the Deal popup
- Management Focus
- Feature toggles / Game Options
- Prestige / Restructure
- R&D Breakthroughs, DB outages, IT events
- Splash screen, weighted events, frequency slider
- Tabbed help modal

The previous mobile layout also had broken button handlers and CSS issues.

## The Solution: Full Rebuild

Instead of patching the old mobile branch, we rebuilt from master's code and added mobile CSS/JS on top. Every feature from master now works on mobile.

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
│ [Overtime Row]          │  ← Push It button
│ [Next Unlock Card]     │
│ ...                    │
├─────────────────────────┤
│ [Status Bar]           │  ← Game date, time
├─────────────────────────┤
│ 📊 Ops │📋 P&L│🏢 Board│⚙️ More │  ← Bottom nav
└─────────────────────────┘
```

Non-operations tabs show a mini cash header above the content.

### Department Cards (Operations Tab)
Each revenue source becomes a self-contained card:
```
┌─────────────────────────────┐
│ 🎯 Blog with Ads  Lv2  👥 5│  ← Name, level, staff count
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
- Save Game, Auto-save toggle, Boss Mode, Game Options, Help, New Game buttons
- Game statistics

## All Features Working on Mobile ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Arc selection | ✅ | Single-column layout |
| Collect revenue | ✅ | 💰 emoji, 44px touch target |
| Hire employees | ✅ | Short labels, Max button |
| Upgrade departments | ✅ | Short labels, Max button |
| Automate departments | ✅ | Auto badge visible |
| Unlock new departments | ✅ | Hidden non-unlockable rows |
| Mini-tasks | ✅ | Full-width, wrapped text |
| Events (toasts) | ✅ | Positioned above bottom nav |
| IPO / Earnings | ✅ | Toast with guidance buttons |
| IRS taxes | ✅ | Toast + P&L tab settle |
| Board Room | ✅ | Dedicated tab with cards |
| Settings | ✅ | Dedicated tab |
| Push It (Overtime) | ✅ | Card in ops view |
| Close the Deal | ✅ | Popup above bottom nav |
| Management Focus | ✅ | Tap department names |
| Golden cells | ✅ | Whole card glows |
| Boss mode | ✅ | Via title bar button |
| Prestige/Restructure | ✅ | Button in action column |
| Game Options | ✅ | Accessible from Settings tab |
| Offline earnings | ✅ | Modal on return |

## What Changed
| Feature | Desktop | Mobile |
|---------|---------|--------|
| Layout | 8-column CSS grid | Card-based vertical flex |
| Navigation | Sheet tabs | Bottom nav bar |
| Menu/Toolbar | Full ribbon | Hidden (settings in tab) |
| Formula bar | Visible | Hidden |
| Column headers | Visible | Hidden (info in cards) |
| Filler rows | Visible | Hidden |
| Revenue breakdown | Visible bar | Hidden |
| Valuation chart | Floating overlay | Hidden |
| Splash screen | Animated | Skipped |
| Button labels | Verbose with +rev/d | Short (cost only) |
| Collect button | "Collect $X (+$1)" | "💰 $X" |
| Locked departments | All visible | Only next unlockable |
| Toast position | Draggable, centered | Fixed above bottom nav |
| Toast drag | Enabled | Disabled |
| Deal popup | Draggable, centered | Fixed above bottom nav |
| P&L section | Grid rows | Dedicated tab with cards |
| Board Room | Grid rows | Dedicated tab with cards |
| Settings | File menu dropdown | Dedicated tab |

## Technical Details

### CSS
- All mobile styles in `@media (max-width: 600px)` block
- Landscape mode compact layout at `max-width: 900px, max-height: 500px`
- `.mobile-only` utility class for mobile-only HTML elements
- Safe area insets for notched phones (`env(safe-area-inset-*)`)
- `touch-action: manipulation` eliminates 300ms tap delay
- `overscroll-behavior: none` prevents pull-to-refresh
- All touch targets ≥ 44px

### JavaScript
- `isMobile()` uses `matchMedia('(max-width: 600px)')`
- `mobileSwitchTab()` controls tab switching with cash header
- `buildMobilePnL()` renders P&L as card layout
- `buildMobileBoardRoom()` renders Board Room as card layout
- `mobileTickUpdate()` refreshes active tab every tick
- Change detection via hash comparison
- Mobile-aware: golden cells, toast positioning, drag disabled
- Button labels shortened on mobile for readability

### HTML
- Mobile bottom nav bar (`#mobile-nav`)
- Mobile cash header (`#mobile-cash-header`)
- Mobile view containers (`#mobile-pnl-view`, `#mobile-boardroom-view`, `#mobile-settings-view`)
- Boss mode button on title bar for mobile access

### Bugs Fixed
- `_mob` variable scoping (was `const` inside else block, used outside)
- Toast/deal positioning reset for mobile (was using saved desktop position)
- Toast drag disabled on mobile (was interfering with scroll)
- All onclick handlers properly exposed on `window`

## Version History
- **v82**: Full rebuild from master — all features, card layout, bottom nav
- **v18**: Previous card layout (outdated, 92 commits behind master)
- **v17**: Previous mobile fixes (touch targets, hidden columns)

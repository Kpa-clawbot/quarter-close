# Mobile Overhaul — Design Decisions

## The Problem
The game uses an 8-column CSS grid to look like a spreadsheet. On mobile (320-420px wide), this is fundamentally broken:
- Columns get crushed to unreadable widths
- Buttons overflow or stack awkwardly
- Information scattered across columns can't be parsed at a glance
- Touch targets compete for space on tiny rows

Previous mobile fixes (issues #34-51) hid some columns and enlarged touch targets, but the underlying grid layout is the wrong metaphor for phone screens.

## The Solution: Card-Based Mobile Layout

On screens ≤600px, we switch from a spreadsheet grid to a **vertical card layout**:

### Department Cards
Each revenue source becomes a stacked card showing:
- Name + level badge
- Staff count + rev/day
- Action buttons (full-width, easily tappable)

### Sticky Cash Header
Cash + per-day revenue stays visible at top while scrolling through departments.

### Bottom Navigation
Tab bar for Operations / Board Room / P&L / Settings — replacing sheet tabs and menu bar.

### Collapsible Sections
P&L, Tax, and IR sections become expandable accordion sections instead of additional grid rows.

### What's Preserved (ALL mechanics)
- ✅ Hiring, upgrading, automating departments
- ✅ Overtime (Push It), Close the Deal, Management Focus
- ✅ Quarterly earnings, guidance selection, CFO automation
- ✅ Events (toast notifications with action buttons)
- ✅ IRS tax system with all escalation stages
- ✅ Board Room (RE upgrades, prestige/restructure)
- ✅ Settings/options (File menu → settings view)
- ✅ Formula bar info (moved to status area)
- ✅ Status bar (compact at bottom)
- ✅ Deal popup (earnings modal)
- ✅ Mini-tasks
- ✅ Golden cells
- ✅ Boss mode

### What Changed
- Grid layout → card layout on mobile
- Menu bar → bottom nav tabs
- Toolbar/formula bar → hidden (decorative only)
- Column headers → not shown (info integrated into cards)
- Filler rows → not shown
- Valuation chart → hidden (already was)
- Revenue breakdown → integrated into cash header
- Settings moved into a proper settings panel

## Technical Approach
- All changes are in CSS media queries + JS mobile detection
- Desktop layout is completely untouched
- `isMobile()` helper in JS for rendering differences
- Mobile-specific render functions for cards, sections
- Same game state, same game logic, different presentation

## Changelog
- v18: Complete mobile card layout overhaul

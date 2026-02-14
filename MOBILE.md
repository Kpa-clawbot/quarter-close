# Mobile Support — Assessment & Plan

*Quarter Close mobile audit, Feb 2026*

## Current State

### Test Device
- iPhone 14 viewport: **390 × 844** (CSS pixels)
- Also representative of most Android phones (360–430px wide)

### What Works ✅
- **Arc selection screen** — 2-column grid adapts well, cards are tappable, text is readable
- **Viewport meta tag** — `width=device-width, initial-scale=1.0` is already set
- **Game loads and runs** — no JS errors, ticks continue, save/load works
- **Sheet tabs** — fit on screen and are tappable (25px tall, borderline but workable)
- **Status bar** — fits in 390px, readable
- **Modal dialogs** — About, Help, Confirm all have max-width constraints and should work

### What's Broken 🔴

#### 1. Grid columns overflow — content invisible and inaccessible
The grid uses CSS Grid with `max-content` column sizing and `overflow-x: hidden`. At 390px viewport:

| Column | Left Edge | Width | Visible? |
|--------|-----------|-------|----------|
| Row # | 0 | 40px | ✅ Full |
| A (Dept) | 40 | 123px | ✅ Full |
| B (Staff) | 163 | 47px | ✅ Full |
| C (Rev/day) | 210 | 63px | ✅ Full |
| D (Buttons) | 273 | 128px | ⚠️ Partial (cut at 390) |
| E (Auto) | 401 | 93px | ❌ Hidden |
| F (Collect) | 494 | 142px | ❌ Hidden |
| G (Rev/yr) | 635 | 54px | ❌ Hidden |
| H | 689 | 13px | ❌ Hidden |

**Total grid width: 702px** — 312px wider than the viewport.

**Impact:** The Hire button is barely clipped. **Auto, Collect, and Rev/yr are completely inaccessible.** The game is essentially unplayable — you can't collect revenue, automate departments, or see annual revenue figures.

#### 2. All interactive buttons too small for touch
Apple's HIG recommends 44×44pt minimum touch targets. Current sizes:

| Element | Size (px) | Min Required | Gap |
|---------|-----------|--------------|-----|
| Hire button | 115 × 20 | 44 × 44 | ❌ Height 20px (need 44) |
| Auto button | 80 × 20 | 44 × 44 | ❌ Height 20px |
| Collect button | 129 × 20 | 44 × 44 | ❌ Height 20px |
| Unlock button | 90 × 20 | 44 × 44 | ❌ Height 20px |
| Menu items | ~50 × 25 | 44 × 44 | ❌ Height 25px |
| Toolbar buttons | 28 × 28 | 44 × 44 | ❌ Both dimensions |
| Toast close (✕) | 20 × 21 | 44 × 44 | ❌ Way too small |
| Debug buttons | 27 × 13 | 44 × 44 | ❌ Tiny |
| Max(N) link | ~20 × 13 | 44 × 44 | ❌ Tiny |
| Mini-task Approve | 69 × 36 | 44 × 44 | ⚠️ Close but short |
| Sheet tabs | ~60 × 25 | 44 × 44 | ❌ Height 25px |

#### 3. Chrome eats 28% of vertical space
The "spreadsheet chrome" (title bar, menu, toolbar, formula bar, revenue bar, tabs, status bar) consumes **239px** of the 844px viewport, leaving only **605px** for the actual game grid. On shorter phones (iPhone SE: 667px), that's even worse — ~428px for the grid.

| Element | Height |
|---------|--------|
| Title bar | 30px |
| Menu bar | 28px |
| Toolbar | 36px |
| Formula bar | 26px |
| *Grid* | *605px* |
| Revenue breakdown | 67px |
| Sheet tabs | 28px |
| Status bar | 24px |
| **Total chrome** | **239px** |

#### 4. Valuation chart completely off-screen
The floating chart is 560×340px fixed-position at x=662 — entirely off the right edge. Even if repositioned, 560px won't fit in 390px. The chart is invisible and the drag-to-move behavior doesn't work with touch.

#### 5. Menu bar overflows
Menu bar scrollWidth is 513px but container is 390px. "View" and "Help" are pushed off-screen. The File dropdown works but "Help" (the one menu item that actually does something) is unreachable.

#### 6. Toolbar overflows
Toolbar scrollWidth is 554px. Currency ($), Percent (%), and Comma (,) buttons are off-screen. The font/size selects, alignment buttons are partially visible.

#### 7. Revenue breakdown wraps awkwardly
The revenue breakdown bar (bottom of grid) is 67px tall on mobile due to content wrapping. The debug buttons (🧪 IRS, etc.) stack vertically and are tiny (13px height).

#### 8. Toast notifications nearly fill viewport
Event toasts are 380px wide (fixed) — only 5px margin on each side on a 390px screen. The toast close button (✕) is 20×21px — very hard to tap. Toast action buttons are also small (font-size: 11px, padding: 4px 12px).

#### 9. Text too small throughout
Most text is 10-12px, which is readable but straining on mobile. Key sizes:
- Cell content: 11px
- Cell buttons: 10px (too small)
- Row numbers: 11px
- Status bar: 10-11px
- Column headers: 11px
- Cash display: 13px (only adequately-sized element)

#### 10. No touch event handling
No touch events, no gesture support. The game relies on:
- `click` events (work on mobile but with 300ms delay on some browsers)
- `mousedown`/`mousemove`/`mouseup` for chart dragging (won't work on touch)
- `onmouseover` for hover states (no hover on touch)
- Keyboard shortcuts (Esc for boss key, Ctrl+S) — useless on mobile

#### 11. No media queries
Zero `@media` rules in the CSS. The layout is entirely fixed-width desktop design.

#### 12. Boss key unusable on mobile
Esc key toggle is the only way to access the boss view. No touch-accessible alternative.

---

## Design Decisions

### Approach: Responsive with Progressive Collapse
Don't create a separate mobile layout. Instead, progressively collapse the spreadsheet chrome and reorganize the grid for narrow viewports. The game should still *look* like a spreadsheet on mobile — that's the whole point.

**Breakpoints:**
- `≤ 480px` — Phone portrait (primary mobile target)
- `481–768px` — Phone landscape / small tablet
- `> 768px` — Desktop (current layout, untouched)

### Grid Strategy
The 8-column grid won't fit on a phone. Options:

**Recommended: Collapse to 4-5 functional columns**
- Column A: Department name (truncated)
- Column B: Staff count
- Column C: Rev/day
- Column D: Action button (contextual — shows most relevant: Hire, Collect, or Unlock)
- Column E: Secondary action (Auto/Upgrade) — only if space

Buttons should stack vertically or use a tap-to-expand row pattern where tapping a department row reveals its action buttons in an expanded area below.

### Chrome Strategy
On mobile, collapse non-essential chrome:
- **Hide:** Toolbar (fake Excel buttons serve no game function), title bar window controls
- **Collapse:** Menu bar → hamburger or minimal (File + Help only), formula bar → single line
- **Keep:** Sheet tabs, status bar (condensed), revenue summary

### Touch Target Minimum
All interactive elements must be ≥ 44px tall on mobile. Buttons should have generous padding.

---

## Prioritized Changes

### P0 — Game-Breaking (Can't Play Without These)

1. **Make grid columns responsive** — restructure grid for ≤390px so all interactive elements are accessible
2. **Enlarge touch targets** — all buttons ≥ 44px height on mobile
3. **Make Collect/Hire/Auto buttons reachable** — they're currently completely off-screen

### P1 — Severely Degraded Experience

4. **Hide or collapse toolbar on mobile** — saves 36px vertical, removes overflow
5. **Collapse menu bar** — condense to essential items or hamburger menu
6. **Fix valuation chart** — resize/reposition for mobile, or show inline instead of floating
7. **Fix revenue breakdown bar** — condense or stack for narrow width
8. **Scale up text sizes** — minimum 14px for body text, 12px for labels on mobile

### P2 — Important Improvements

9. **Add touch support for chart** — touch drag/resize (currently mouse-only)
10. **Make toast notifications responsive** — width: 90vw with larger buttons/close target
11. **Add mobile boss key** — double-tap title bar, shake gesture, or visible button
12. **Increase row heights** — 28px min-height is too short for touch; use 44px on mobile
13. **Condense status bar** — remove less useful info on narrow screens

### P3 — Polish

14. **Add pull-to-refresh or swipe gestures** — for collecting revenue
15. **Optimize formula bar** — show relevant info in compact format
16. **Add haptic feedback hints** — for collect actions (where available)
17. **Test landscape mode** — may work better for spreadsheet layout
18. **Hide filler rows on mobile** — they waste precious vertical space
19. **Prevent overscroll/bounce** — lock the viewport to avoid rubber-banding

---

## Feature-by-Feature Mobile Rethinking

### The Grid
**Current:** 9-column CSS Grid (row#, A-H) with `max-content` sizing, `overflow-x: hidden`
**Problem:** 702px content in 390px viewport, all action buttons hidden
**Solution:** Use `@media (max-width: 480px)` to restructure:
- 4-column grid: row#, Name, Rev, Actions
- Action column shows primary button; tap row to expand and show all buttons
- Or: horizontal scroll with snap points (less ideal but preserves spreadsheet feel)

### Formula Bar
**Current:** Fixed height, shows cell reference + formula. Decorative.
**Problem:** Takes 26px of vertical space for zero gameplay value
**Solution:** Hide on mobile, or collapse into a thin 16px decorative strip

### Menu Bar
**Current:** 9 items, 513px total width, overflows
**Problem:** Help and View menu items off-screen
**Solution:** Keep File + Help visible. Collapse rest into "⋯" overflow or hide entirely. Most menu items are decorative.

### Toolbar
**Current:** Font picker, size picker, B/I/U, alignment, number formatting — all decorative
**Problem:** 554px width, serves zero gameplay function
**Solution:** Hide entirely on mobile. Saves 36px vertical space.

### Toast Notifications
**Current:** 380px fixed width, centered, small close button
**Problem:** Nearly fills viewport, close button (20×21px) is hard to tap
**Solution:** `width: calc(100vw - 24px)`, enlarge close button to 44×44px tap area, enlarge action buttons

### Mini-Task Bar
**Current:** Horizontal layout with text + reward + approve + skip
**Problem:** `max-width: 600px` helps, but content may still wrap oddly
**Solution:** Stack vertically on mobile: task description on top, buttons on bottom. Approve button should be full-width and 44px+ tall (it's time-sensitive!).

### Valuation Chart
**Current:** 560×340px fixed-position floating overlay, drag-to-move with mouse events
**Problem:** Entirely off-screen, mouse-only drag
**Solution:** On mobile, render inline (between grid and revenue bar) at full width, ~160px height. Remove drag behavior. Or: make it a swipeable sheet/overlay.

### Sheet Tabs
**Current:** 4 tabs + add button, 25px tall
**Problem:** Height below touch target minimum
**Solution:** Increase to 40-44px tall on mobile. They already fit horizontally.

### Status Bar
**Current:** 24px tall, shows date/time/save/clicks/zoom
**Problem:** Small text, cramped
**Solution:** Show only essential info: date + save indicator. Move other stats elsewhere or hide.

### Revenue Breakdown
**Current:** Horizontal bar with sec/min/hr/day stats + debug buttons
**Problem:** Wraps to 67px height, debug buttons are tiny
**Solution:** Condense to show only day rate. Hide debug buttons on mobile (or move to File menu). Reduce to single line.

### Golden Cells
**Current:** Animated gold pulse, click to collect
**Problem:** If golden cell is in a hidden column, player can't see or click it
**Solution:** Ensure golden cells only appear in visible columns on mobile, or show an alert/badge

### Modal Dialogs
**Current:** Help (max-width: 520px), About (340px), Confirm (360px), Series A (500px)
**Problem:** Help modal may overflow horizontally. Others should be OK with width constraints.
**Solution:** All modals: `max-width: calc(100vw - 32px)` on mobile. Help modal: ensure scrollable.

### Earnings Report Toast (Post-IPO)
**Current:** Complex multi-button toast with countdown timer
**Problem:** Tight layout with many small buttons
**Solution:** Stack buttons vertically on mobile, enlarge each to 44px+ height. Countdown bar should be full-width.

### Board Room Tab
**Current:** Grid-based layout like Operations, with buy buttons
**Problem:** Same column overflow issues as Operations grid
**Solution:** Same responsive grid treatment — collapse to 4 columns.

---

## Implementation Notes

### CSS-Only vs JS Changes
Most changes can be done with CSS `@media` queries:
- Column hiding/resizing
- Chrome collapsing
- Touch target enlarging
- Toast resizing
- Text scaling

JS changes needed for:
- Touch event support (chart dragging → replace with inline)
- Mobile boss key (add tap target)
- Golden cell visibility logic
- Grid row expand/collapse behavior (if using that pattern)
- Touch-friendly mini-task interaction

### Testing Approach
- Chrome DevTools mobile emulation (iPhone 14, Pixel 7, iPhone SE)
- Real device testing on iOS Safari and Android Chrome
- Test both portrait and landscape
- Test with on-screen keyboard visible (reduces viewport further)

### Performance Considerations
- No heavy changes needed — game is already lightweight vanilla JS
- Avoid adding frameworks for mobile support
- CSS media queries have zero runtime cost
- Touch events are native and lightweight

---

*This document covers assessment only. Implementation tracked in GitHub issues.*

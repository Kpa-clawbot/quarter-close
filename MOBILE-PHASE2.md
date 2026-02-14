# Quarter Close — Mobile Phase 2: Improvements & Polish

*Post-launch refinements to the mobile port. Phase 1 delivered full playability; Phase 2 focuses on polish, information density, and UX improvements.*

## Baseline Rules (Same as Phase 1)

- **ONLY work on the `mobile` branch. NEVER touch master.**
- **NEVER checkout, merge from, or modify the master branch.**
- Commit and push frequently — live preview auto-deploys at https://kpa-clawbot.github.io/quarter-close/mobile/
- Increment `?v=` cache busters on game.js and style.css in index.html with each change
- **Playability > aesthetics** — never break core mechanics for visual improvements
- **All 15 core mechanics must keep working** after every change (test on mobile viewport)
- Single page app: `index.html`, `style.css`, `game.js` — no frameworks
- Mobile detection: `isMobile()` using `matchMedia('(max-width: 600px)')`
- Mobile CSS in `@media (max-width: 600px)` blocks
- Read `MOBILE.md` for full architecture documentation

## Technical Reference

- **Ops tab cash header**: `#row-cash` (the desktop stats row, restyled for mobile with CSS)
- **Non-ops tab mini header**: `#mobile-cash-header` (JS-managed, shown on P&L/Board/Settings tabs)
- **Cash header update (ops)**: `updateGridValues()` in game.js updates `#cash-display`, `#per-tick-display`, `#stock-price-cell`
- **Cash header update (non-ops)**: `updateMobileCashHeader()` updates `#mob-cash-amount` and `#mob-cash-perday`
- **Desktop Row 1 info**: Cash, $/day, Total Rev/yr, Stock Price (post-IPO)

## Known Issues

### ✅ Fixed — Cash Header Missing Stock Price & Total Rev/yr
- The non-ops `#mobile-cash-header` only showed cash and $/day
- Stock price (post-IPO) and Total Rev/yr were missing
- **Fix**: Added stock price and total rev/yr to both the ops header and non-ops mini header

### ✅ Fixed — Cash Header White Flash on Tap
- Tapping the `#row-cash` header caused a white flash
- Missing `-webkit-tap-highlight-color: transparent` on the header
- **Fix**: Added tap highlight suppression to `#row-cash` and `#mobile-cash-header`

### ✅ Fixed — Cash Header Information Density
- Desktop shows: Cash, $/day, Total Rev/yr, Stock Price
- Mobile ops header was missing Total Rev/yr
- **Fix**: Restructured mobile cash header to show all key metrics in a compact layout

## Phase 2 Improvements

*Placeholder — add items here as they're identified.*

- [ ] *(Add future improvement items here)*

---

*Created: 2026-02-14*

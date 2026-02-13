# Quarter Close — Dev Notes

## Workflow

- **Feedback comes via WhatsApp chat** — Iavor sends feedback conversationally
- **I file GitHub Issues** for each separate item (label appropriately: bug, ui, gameplay, feature, phase2)
- **File issue FIRST, then code** — don't implement without an issue
- **Reference issues in commits** when fixing them
- **Propose designs before implementing** — wait for explicit approval on big mechanics
- **Repo:** https://github.com/Kpa-clawbot/quarter-close (public)
- **Collaborators:** KpaBap (admin), Kpa-clawbot (owner)
- **Live URL:** https://kpa-clawbot.github.io/quarter-close/ (GitHub Pages, master branch)
- **Analytics:** https://quarter-close.goatcounter.com (GoatCounter, loads only on github.io)

## Labels

- `bug` — something's broken
- `ui` — visual/styling tweaks  
- `gameplay` — balance, mechanics, feel
- `feature` — new stuff for current phase
- `phase2` — ideas to park for later

## Tech Stack

- Pure vanilla HTML/CSS/JS — no frameworks, no build step
- localStorage for saves (backward-compatible with fallback defaults)
- Hosted on GitHub Pages (public repo required for free plan)
- Local dev server: `nohup python3 -m http.server 8090 &` (must use nohup, not bare exec)

## Project Structure

- `index.html` — page structure + OG meta tags for social embeds
- `style.css` — Excel-accurate styling
- `game.js` — game engine (~2400 lines)
- `preview.png` — OG embed preview image (1200×630, Office 2003 splash style)
- `DESIGN.md` — full game vision (all phases)
- `PHASE1.md` — current phase scope & spec
- `DEVNOTES.md` — this file

## Key Design Decisions

- Game title in browser tab: "Q4 Financials - Operations.xlsx - Quarter Close"
- Boss Key = Esc (toggles to empty spreadsheet, game keeps running)
- Ctrl+S = save (intercepts browser save)
- No sound (stealth at work)
- Revenue sources unlock sequentially
- Progression: Click to collect → Automate → Upgrade
- Offline progress capped at 8 hours, automated sources only
- **Fixed 1 day/tick** — variable time scale was tried and scrapped (time compression cancels revenue growth dopamine)
- **4 career arcs**: Tech Startup, Food Empire, E-Commerce Hustler, Generic Entrepreneur — same core mechanics, different flavor text
- **Per-tick earnings should always go UP** — any mechanic causing sudden drops kills the fun
- **Max buttons styled as blue links** (spreadsheet hyperlink look), not colored buttons
- **IRS escalation over random dice** — debt compounds with 1% daily interest, stages escalate over 180 game-days
- **Depreciation for tax** — capital spending deducted over 4 quarters, not immediately (prevents gaming tax day)
- **All event toasts auto-expire in 10s** — last button (worst option) gets red countdown fill, auto-fires
- **IRS tax toasts never auto-expire** — too important to auto-fire (expiresMs: 0)
- **Late-game tiers stay grounded** — no sci-fi/absurd names. Tech companies ARE the endgame.
- **Fractal market noise** — volatility itself is a random walk (0.05-1.0), three noise frequencies (fast/slow/shock), creating realistic calm→chaotic chart patterns

## Architecture Notes

### Tax Panel DOM Rebuild
- `updateTaxPanel()` rebuilds innerHTML for P&L + tax liability sections
- Called every tick from `updateDisplay()`, but uses hash-based diffing (`_lastTaxPanelHash`) to skip rebuilds when data hasn't changed
- Settle buttons use event delegation on `#tax-panel` (stable parent survives innerHTML rebuilds)
- **Lesson:** When innerHTML is rebuilt frequently, NEVER rely on button stability — use event delegation AND minimize unnecessary rebuilds

### Event Toast System
- `showEventToast()` renders desktop notification-style popup with buttons
- `expiresMs` controls auto-expire (default 10000, 0 to disable)
- Last button gets countdown overlay (CSS `toast-btn-countdown` animation)
- `eventToastTimer` global cleared on click/dismiss
- Events can use `type: 'dynamic'` with `setup()` function for content based on game state

### Valuation Chart
- Canvas-rendered, `#4472C4` Excel blue line, gray gridlines, gradient fill
- Formula: `Cash + (Annual Revenue × baseMult × growthMod × noise) - taxLiabilities`
- Draggable + resizable floating overlay, positioned right of Rev/yr column
- `_volState` tracks volatility random walk for fractal noise
- Max 200 data points, sampled every tick, persisted in save/load

### Save Compatibility
- All new fields use fallback defaults: `data.field || 0`, `data.array || []`
- No need to clear saves between code changes
- Only need New Game to switch arcs

## GitHub Issues

### Closed
#1-#23, #25-#26

### Open
- #24 — Late-game pacing (extended to 12 tiers, further work TBD)
- #27 — Excel-style charts (valuation chart done, 7 more ideas: sparkline, pie, waterfall, etc.)

## Commit History

~47 commits on master. Key milestones:
- `4ed71a0` — IRS tax debt escalation system
- `49adcbf` — P&L section + quarterly tax
- `0e76116` — Depreciation mechanic
- `a9f22ab` — Golden cell mechanic (completes #13 variable rewards)
- `406df89` — Valuation chart
- `032d3db` — Help screen
- `83bb849` — GitHub Pages + IRS toast fix
- `ef141df` — Extended to 12 tiers
- `b7b8da4` — Fractal market noise
- `a1ddb92` — V13 preview image (OG embed)
- `35610df` — Fix flaky Settle button (hash-based DOM rebuild)

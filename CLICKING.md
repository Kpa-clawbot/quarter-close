# Clicking Mechanics — Design Plan

Active play mechanics that keep clicking relevant throughout the game.
All mechanics have feature toggles (Data menu → Game Options).

---

## 0. Feature Toggle System
**Status:** [x] Shipped (commit `fd5d0de`)

- Data menu → "Game Options..." menu item
- Modal dialog styled like Excel Options (list on left, settings on right)
- Three toggles (checkboxes), all default ON:
  - ☑ Close the Deal
  - ☑ Overtime  
  - ☑ Management Focus
- Saved to `gameState.featureToggles` → localStorage
- When toggled off: mechanic stops spawning/functioning, existing UI elements hide
- When toggled back on: resumes normally

---

## 1. Close the Deal
**Status:** [ ] Not started

**Concept:** Random high-value contracts appear as toasts. Click rapidly to close the deal before time runs out.

**Mechanics:**
- Toast pops up: "🤝 Enterprise client wants a $X contract"
- Reward amount = 30-60 seconds of current total revenue (randomized)
- Timer: 10-15 seconds (progress bar countdown)
- Required clicks scale with company size — always feels like ~15-25 clicks
  - Formula: `15 + Math.floor(Math.log10(totalAnnualRev())) * 2`
  - Ensures it's always roughly the same effort regardless of stage
- Click counter shown: "Signatures: 8/22"
- Success: cash awarded, status bar message "🤝 Closed $2.4B enterprise deal!"
- Failure: "Deal went to competitor" — no penalty, just missed money
- Frequency: random, every 3-8 minutes of active play
  - Cooldown tracked, not spawned during power outage or boss mode
- Toast style: non-closable (must click to close or let expire), no auto-expire countdown

**UI:**
- Uses existing toast system with a custom "Sign" button that tracks clicks
- Progress text updates on each click
- Button could shake/pulse on each click for feedback

---

## 2. Overtime
**Status:** [x] Shipped (commit `cd42e6f`)

**Concept:** Click a button to push employees into overtime for instant revenue bursts, with diminishing returns per quarter.

**Mechanics:**
- Button appears in a new row below revenue sources: "⏰ Overtime"
- Each click = instant burst of revenue
  - Base amount: 5 seconds of current total revenue
  - Diminishing returns: each click in the same quarter gives less
  - Formula: `baseAmount × (1 / (1 + overtimeClicks * 0.15))`
  - Click 1: 100%, Click 2: 87%, Click 5: 57%, Click 10: 40%, Click 20: 25%
- Overtime counter resets each quarter (fresh energy)
- Visual feedback: status bar shows "⏰ Overtime! +$X" on each click
- Current overtime stats shown in the row: "Clicks: 12 this quarter | Next: $1.2M"

**Scaling:**
- Always meaningful because it's percentage-based on current revenue
- Diminishing returns prevent it from being the dominant strategy
- Quarter reset gives a natural rhythm — binge early, coast late, or spread evenly

**Board Room upgrade (future):**
- "Unlimited PTO" (ironic name) — reduces diminishing returns factor (0.15 → 0.08)

---

## 3. Management Focus
**Status:** [ ] Not started

**Concept:** Click on departments to give them an "attention" buff that boosts output. Focus decays over time, rewarding active management.

**Mechanics:**
- Clicking a department's name/row gives it +1 focus point
- Each focus point = +5% revenue for that department
- Max focus: 10 points (= +50% revenue)
- Focus decays: lose 1 point every 10 seconds of not clicking that department
  - So maintaining max focus on one dept = click every 10 seconds
  - Maintaining focus across 8 depts = constant clicking rotation
- Visual: focus level shown as small bar or dots next to department name
  - 0 focus: no indicator
  - 1-3: dim bar
  - 4-7: medium bar  
  - 8-10: bright green bar, maybe subtle glow
- Only works on unlocked departments with employees
- Click feedback: brief cell highlight flash

**Strategy depth:**
- Focus your best department for maximum gain?
- Spread focus across all for balanced growth?
- During earnings crunch, laser-focus your top earner to hit guidance?
- Prestige (★) and Breakthrough (🔬) departments are worth more focus

**Integration with revenue:**
- `sourceRevPerTick()` gets `× (1 + focusLevel * 0.05)` multiplier
- Focus state tracked per source: `gameState.sources[i].focus`
- Focus decay processed in `gameTick()`

**Board Room upgrade (future):**
- "Middle Management" — focus decay rate halved (lose 1 point every 20s instead of 10s)

---

## Implementation Order

1. **Feature Toggle System** — must come first, gates everything else
2. **Overtime** — simplest, self-contained button + click handler
3. **Close the Deal** — builds on toast system, moderate complexity
4. **Management Focus** — most complex, touches revenue calc + per-source state + visual indicators

---

## Notes

- All three mechanics are purely additive (bonuses, not penalties for not using them)
- Idle players who toggle them off lose nothing they had before
- Active players get rewarded for engagement
- Future Board Room upgrades can enhance each mechanic with RE spending
- Mobile: all three should work with touch (tap = click)

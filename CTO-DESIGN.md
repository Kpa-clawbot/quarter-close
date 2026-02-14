# CTO (Chief Technology Officer) — Design Doc

## Overview

Board Room upgrade that automates department efficiency upgrades. Follows the same tiered pattern as CFO (3 levels with distinct personalities). Does NOT automate hires — that's a separate future role.

## Core Behavior

- Auto-purchases ⬆ Upgrade for departments when affordable
- Spends cash freely — no built-in cash reserve (creates a strategic tension: do you let the CTO run wild or manage cash yourself?)
- Future: cash management could be delegated to CFO or a CEO role that coordinates subordinates
- Applies to ALL unlocked departments (no per-department toggle)
- Runs once per game tick, same cadence as CFO earnings logic

## Tiers

### CTO Lv1 — "The Intern" (2,500 RE)
- **Strategy:** Cheapest first
- Scans all departments, finds the one with the lowest upgrade cost
- If affordable, buys it. Repeats until nothing is affordable.
- No intelligence — will happily upgrade a maxed-out low-tier dept over a high-value one
- Could drain all your cash on rapid cheap upgrades

### CTO Lv2 — "Competent" (10,000 RE)
- **Strategy:** Best ROI first
- Calculates revenue gain per dollar spent for each possible upgrade
- Prioritizes the upgrade with the highest ROI ratio
- Still spends freely (no reserve), but at least spends *wisely*
- Skips upgrades where ROI is below a minimum threshold (e.g., <0.001 — the upgrade costs 1000× more than the revenue gain)

### CTO Lv3 — "Elite" (50,000 RE)
- **Strategy:** ROI-optimized + timing awareness
- Same ROI prioritization as Lv2, but also considers:
  - **Earnings proximity:** Reduces spending as quarter end approaches (preserves margin for earnings beat). Doesn't hard-stop, just raises the ROI threshold — only buys slam-dunk upgrades near quarter end
  - **Revenue momentum:** After a big upgrade that shifts revenue significantly, pauses briefly to let the new revenue establish before buying more (avoids rapid-fire purchases that tank cash with unclear ROI)
- Personality: patient, strategic, picks moments

## UI Placement

### Options Considered

**Option 1: New "C-Suite" section (CHOSEN)**
- New section in the P&L/tax panel area, below IR, above tax debts
- Label: "👔 C-Suite"
- Moves CFO selector OUT of IR into this new section
- CTO selector lives next to CFO
- IR stays focused on: RE balance, last Q earnings, streak, upgrade ETA
- Pro: logical grouping, scales to future roles (COO, CEO)
- Pro: C-Suite concept makes thematic sense — you're building a leadership team
- Con: CFO moves from where players learned it

**Option 2: Inline on Operations grid**
- CTO row below Overtime row on the main grid
- Close to the departments it controls
- Con: cramped with all the grid columns, mixes automation controls with revenue display

**Option 3: Board Room tab**
- Configure CTO level in Board Room after purchase
- Pro: buy and configure in same place
- Con: tab-switching to change level, disconnected from operations

### Chosen: Option 1

New "👔 C-Suite" section in P&L panel:

```
👔 C-Suite
  CFO:  [Manual] [👶1] [📊2] [🎩3]     ← moved from IR
  CTO:  [Manual] [🔧1] [💻2] [🧠3]     ← new
```

- Row per role, same button pattern
- Column B: role label + Manual button
- Column C: level buttons (locked until purchased)
- When Manual: no automation
- When set to level: automation runs each tick

IR section simplified to:
- Retained Earnings: X RE
- Last Q: +Y RE
- Streak: 🔥 N beats (X.X× RE)
- Next upgrade ETA

## Board Room Upgrades

Three new entries in the 📊 Finance category:

| Name | Cost | Description |
|------|------|-------------|
| CTO Lv1 | 2,500 RE | "The Intern" — auto-upgrades departments (cheapest first) |
| CTO Lv2 | 10,000 RE | "Competent CTO" — prioritizes upgrades by ROI |
| CTO Lv3 | 50,000 RE | "Elite CTO" — ROI-optimized with earnings timing awareness |

Each level unlocks the corresponding CTO selector button, same as CFO.

## Upgrade Decision Logic (per tick)

```
function ctoAutoUpgrade(level):
  candidates = []
  for each unlocked department:
    cost = getUpgradeCost(dept)
    if cost > gameState.cash: skip
    revGain = calculate revenue increase from upgrade
    roi = revGain / cost
    candidates.push({ dept, cost, revGain, roi })

  if level == 1:
    sort candidates by cost ascending
    buy first affordable one

  if level == 2:
    sort candidates by ROI descending
    filter out ROI < 0.001
    buy first one

  if level == 3:
    sort candidates by ROI descending
    daysLeftInQuarter = ...
    if daysLeftInQuarter < 20:
      raise ROI threshold (only buy if ROI > 0.01)
    if daysLeftInQuarter < 5:
      raise further (ROI > 0.05) — only slam dunks
    buy first one that passes threshold
```

## Game State

New fields:
- `gameState.activeCTOLevel` — 0 (Manual), 1, 2, or 3
- `gameState.ctoPurchased` — array of purchased levels [1, 2, 3]

Saved/loaded with game state, reset on new game.

## What This Does NOT Do

- **No hiring automation** — separate future role
- **No cash reserve management** — intentional design choice. CTO will spend you dry if you let it. Managing that tension is the gameplay.
- **No per-department control** — upgrades all departments equally based on tier logic
- **No interaction with Focus** — CTO doesn't know about or prioritize focused departments (could be a Lv3 enhancement later)

## Future Hooks

- **CEO role:** Coordinates CFO + CTO, manages overall cash allocation strategy
- **COO role:** Automates hiring with its own tier logic
- **CTO + Focus synergy:** Elite CTO could detect focused departments and prioritize their upgrades
- **Budget delegation:** CEO gives CTO a "budget" (% of cash to spend per tick)

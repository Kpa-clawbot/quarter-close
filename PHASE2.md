# Quarter Close — Phase 2: IPO & Quarterly Earnings

*From private company to public megacorp. The real game begins.*

## Overview

Phase 1 ends when the player hits the IPO milestone (~$5T valuation). Phase 2 introduces the public company lifecycle: stock price, quarterly earnings reports, analyst expectations, guidance, and retained earnings (prestige currency). The quarterly earnings mechanic is the core endgame loop.

## IPO Trigger

- **Condition**: Valuation reaches ~$5T (tunable threshold)
- **Event**: Big modal — "Investment banks are calling. Take your company public?"
  - Accept → IPO happens, stock price appears in UI, earnings system activates
  - Decline → can IPO later manually (button in menu bar?)
- **IPO proceeds**: Cash injection (% of valuation), but also obligations begin
- **UI changes post-IPO**:
  - Stock ticker appears in the status bar or header
  - "Investor Relations" section added to the grid
  - Sheet tab at bottom: "IR" or "Earnings"

## Stock Price

- **Derived from**: Current valuation chart system (already exists)
- **Post-IPO**: Valuation becomes "Market Cap", displayed as stock price (market cap ÷ shares outstanding)
- **Shares outstanding**: Set at IPO (e.g., 1B shares), can change via buybacks/dilution later
- **Stock price reacts to**:
  - Quarterly earnings beats/misses (biggest driver)
  - Random market events
  - Existing fractal noise system (volatility clustering)
  - Guidance changes
  - Cooking the books (inflates temporarily, crash risk)

## Quarterly Earnings — The Core Loop

Every 90 game-days (same cadence as taxes), earnings are reported.

### Pre-Quarter: Set Guidance

At the START of each quarter, the player sets revenue guidance:

| Guidance Level | Target | Risk | Reward Multiplier |
|---|---|---|---|
| **Conservative** | 70% of projected revenue | Very easy to beat | 0.5× |
| **In-Line** | 90% of projected revenue | Moderate | 1× |
| **Ambitious** | 110% of projected revenue | Hard | 2× |
| **Aggressive** | 130% of projected revenue | Very hard | 3× |

- "Projected revenue" = current rev/day × 90 days, computed at quarter start
- Guidance is set via a small inline prompt (not a full modal) — 4 buttons in the earnings section of the grid
- If no guidance is set, defaults to "In-Line"

### End of Quarter: Earnings Report

When 90 game-days elapse:

1. **Compare actual vs guidance**: Did quarterly revenue beat the target?
2. **Calculate beat/miss margin**: How much over/under (as %)
3. **Stock reacts**: 
   - Beat → stock jumps (+5% to +30% based on margin and guidance level)
   - Miss → stock drops (-5% to -25%)
   - In-line (within ±5%) → flat/small move
4. **Retained earnings awarded** (prestige currency):
   - Base amount = % of quarterly revenue
   - Multiplied by guidance level reward multiplier
   - Multiplied by beat margin bonus
   - Miss = 0 retained earnings (you get nothing)
5. **Analyst expectations ratchet**:
   - Beat → next quarter's "projected revenue" baseline increases (+5-10%)
   - Miss → baseline decreases slightly (-3%)
   - Streak bonus: 3+ consecutive beats → analysts upgrade you (+15% baseline)
   - Streak penalty: 2+ misses → analysts downgrade (-10% baseline)

### The Modal (Pre-Finance Dept)

Without a Finance Department, every earnings report is a **modal popup**:

```
╔══════════════════════════════════════════╗
║  Q3 2025 EARNINGS REPORT                ║
╠══════════════════════════════════════════╣
║                                         ║
║  Revenue:        $4.2B                  ║
║  Guidance:       $3.8B (Ambitious)      ║
║  Result:         BEAT (+10.5%)  📈      ║
║                                         ║
║  Stock:          $142.50 → $168.40      ║
║  Retained:       +850 RE                ║
║  Analyst View:   Upgrade ⬆              ║
║                                         ║
║  ┌─────────────────────────────────────┐ ║
║  │ SET Q4 GUIDANCE:                    │ ║
║  │                                     │ ║
║  │ [Conservative] [In-Line]            │ ║
║  │ [Ambitious]    [Aggressive]         │ ║
║  └─────────────────────────────────────┘ ║
║                                         ║
║  Next earnings in 90 days               ║
║                                [Close]  ║
╚══════════════════════════════════════════╝
```

Styled like an Excel dialog box — gray border, system font, close button.

This fires every 90 seconds real-time. It's intentionally annoying. That's the point.

### The Earnings Grid Section (Always Visible)

Even without the modal, a section in the spreadsheet grid shows:

```
── INVESTOR RELATIONS ──────────────────────
   A              B            C         D
   Metric         Current      Target    Status
   ─────────────  ───────────  ────────  ──────
   Quarter        Q3 2025
   Days Left      47
   Revenue YTD    $2.1B        $3.8B     56%
   Guidance       Ambitious              2× mult
   Streak         🔥 3 beats
   Stock Price    $142.50                +18% QTD
   Retained Earn. 2,450 RE
```

Progress bar showing revenue vs target. Green when ahead, yellow when close, red when behind.

## Retained Earnings (Prestige Currency)

### Earning RE

- **Only from beating quarterly earnings** (miss = 0)
- Base: `quarterRevenue × 0.001` (tunable)
- × guidance multiplier (0.5× to 3×)
- × beat margin bonus (up to 1.5× for blowout beats)
- × streak multiplier (1× base, +0.1× per consecutive beat, caps at 2×)

### Spending RE — The Prestige Shop

Accessed via a "Board Room" sheet tab or menu item.

| Item | Cost (RE) | Effect |
|---|---|---|
| **Finance Department Lv1** | 500 | Auto-files earnings, conservative guidance |
| **Finance Department Lv2** | 2,000 | Smarter guidance (in-line default) |
| **Finance Department Lv3** | 10,000 | Optimal guidance (reads market conditions) |
| **Finance Department Lv4** | 50,000 | Unlocks "Creative Accounting" option |
| **Permanent Rev Multiplier** | 1,000+ | +10% base revenue (stacks, cost escalates) |
| **Analyst Relations** | 2,500 | Slower expectation ratchet (+3% instead of +5%) |
| **Stock Buyback Program** | 5,000 | Unlock buyback button (spend cash → boost stock) |
| **Lobbyist** | 3,000 | Reduce tax rate from 25% → 20% |
| **Legal Department** | 7,500 | Reduce SEC investigation risk |
| **Golden Parachute** | 25,000 | Survive 1 game-ending event |

RE persists across restructurings (soft resets). This is the long-term progression.

## Finance Department (The Automation Reward)

The key spend. Bought with RE, not cash.

### Lv1: Auto-Pilot (500 RE)
- Earnings modal stops appearing
- Department auto-sets Conservative guidance every quarter
- Results show in grid section + status bar: "Q3 Beat +8% 📈"
- You can still override guidance manually in the IR grid section

### Lv2: Competent CFO (2,000 RE)
- Auto-sets In-Line guidance (better returns)
- Occasionally sets Ambitious when projected revenue is strong (+20% over baseline)

### Lv3: Strategic Finance (10,000 RE)
- Analyzes market conditions and recent performance
- Picks optimal guidance level each quarter
- Rarely misses — maybe 1 in 10 quarters

### Lv4: Creative Accounting (50,000 RE)
- Unlocks "Cook the Books" toggle in IR section
- When enabled: reported revenue inflated by 10-30%
- Guarantees beats (huge RE income)
- BUT: Each quarter has cumulative % chance of SEC investigation
  - 1st quarter cooking: 5%
  - 2nd: 12%
  - 3rd: 22%
  - 4th+: 35%+
- SEC investigation = massive fine (50% of cash) + stock crash (-40%) + cooking disabled for 4 quarters
- Risk/reward tension — do you push your luck?

## Restructuring (Soft Reset / Prestige)

Optional mechanic for when progression truly stalls.

- **Trigger**: Voluntary (button in Board Room) or forced (bankruptcy, hostile takeover)
- **What resets**: Cash, employees, upgrade levels, tier unlocks — back to Tier 0
- **What persists**: Retained Earnings, Finance Dept level, permanent multipliers, unlocked mechanics
- **Bonus**: Each restructuring adds a permanent base multiplier (+25%? +50%?)
- **Narrative**: "The board voted to restructure. You're starting a new venture with your experience intact."

This is the classic prestige loop but themed as corporate restructuring.

## Implementation Priority

### Phase 2a — MVP Earnings (implement first)
1. IPO trigger at valuation threshold
2. Stock price display (market cap ÷ shares)
3. Quarterly earnings modal with guidance selection
4. Beat/miss calculation and stock reaction
5. Retained earnings currency (earning only)
6. IR section in the grid

### Phase 2b — Prestige Shop
7. Board Room tab/menu for spending RE
8. Finance Department Lv1-Lv2 (stop the modals)
9. Permanent revenue multiplier
10. Other shop items

### Phase 2c — Advanced Mechanics
11. Finance Department Lv3-Lv4
12. Cooking the books + SEC investigations
13. Stock buybacks
14. Analyst sentiment system (upgrades/downgrades)
15. Restructuring (soft reset)

### Phase 2d — Polish
16. Earnings call dialog events
17. Activist investor events
18. Market conditions (bull/bear cycles)
19. More random events tied to public company life

## Open Questions

- [ ] Exact RE amounts — need playtesting to tune
- [ ] IPO threshold — $5T valuation? Or tie to tier unlocked?
- [ ] Should restructuring reset arc choice or keep it?
- [ ] How visible should the "Cook the Books" option be? Hidden until Lv4, or teased earlier?
- [ ] Multiple stock tickers? (your company vs market index)
- [ ] Dividends as alternative to buybacks?

---

*Created: 2026-02-13*

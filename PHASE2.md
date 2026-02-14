# Quarter Close — Phase 2: Public Company

*Post-IPO mechanics. Earnings, prestige currency, board room upgrades.*

## Phase 2.1: IPO + Manual Earnings System ✅

- [x] IPO trigger at $5T valuation
- [x] Stock price ticker (status bar + IR section)
- [x] Quarterly earnings every 90 game-days
- [x] Guidance system (conservative / in-line / ambitious / aggressive)
- [x] Beat/miss mechanics with stock price reactions
- [x] Retained Earnings (RE) prestige currency
- [x] Analyst ratchet (expectations increase on streaks)
- [x] Earnings modal with guidance selection
- [x] IR section in grid (quarter info, guidance, streak, stock price)

## Phase 2.2: Board Room (RE Prestige Shop)

Post-IPO prestige shop where players spend Retained Earnings on permanent upgrades.

### Completed
- [x] Board Room sheet tab (visible after IPO)
- [x] Tab switching between Operations and Board Room
- [x] Revenue Multipliers I-III (stacking permanent boosts: 1.1×, 1.25×, 1.5×)
- [x] Lobbyist (tax 25% → 20%) + Tax Haven (→ 15%)
- [x] Analyst Relations (ratchet slowed 50%)
- [x] Golden Parachute (seizure protection, consumable, rebuyable)
- [x] All effects integrated (tax, revenue, earnings, seizure)
- [x] Save/load/reset support
- [x] Help screen updated
- [x] Debug Reset BR button

### In Progress — Finance Dept Rework (Smart CFO System)

The Finance Dept auto-handles quarterly earnings (no popup modal). Each level has a different AI algorithm for picking guidance. Player can switch between owned levels anytime.

#### Levels

| Level | Cost | Algorithm | Accuracy |
|-------|------|-----------|----------|
| **Lv1 — The Intern** | 500 RE | Random: 25% conservative, 50% in-line, 25% ambitious | Chaotic |
| **Lv2 — Competent CFO** | 2,500 RE | Trend-based: recent revenue trajectory → picks matching guidance. 20% safety margin. | ~70% optimal |
| **Lv3 — Elite CFO** | 10,000 RE | Smart: trend + streak length + active bonuses/penalties. 5% safety margin. Adjusts for analyst pressure. | ~90% optimal |

#### Algorithm Detail (Lv2/Lv3)
1. Project quarterly revenue: `currentRevPerTick × 90 days`
2. For each guidance level, calculate target: `projectedRev × guidancePct × analystBaseline`
3. Pick the most aggressive guidance where `projectedRev > target × safetyMargin`
   - Lv2 safety margin: 1.20 (needs 20% buffer)
   - Lv3 safety margin: 1.05 (cuts it close)
4. Lv3 additional adjustments:
   - Long streaks (>5): one notch safer (analysts ratcheting hard)
   - Active revenue bonus: one notch more aggressive (temporary windfall)
   - Active revenue penalty: one notch safer

#### UI
- IR section shows active CFO level with clickable selector (only owned levels shown)
- Guidance row becomes read-only when Finance Dept is active (shows what CFO picked)

#### TODO
- [ ] Implement Lv1 random guidance algorithm
- [ ] Implement Lv2 trend-based algorithm
- [ ] Implement Lv3 smart analysis algorithm
- [ ] CFO level selector in IR section
- [ ] Track revenue history for trend analysis (last 3 quarters)

## Phase 2.3: Future Ideas

- [ ] Stock buybacks (spend cash to inflate stock price)
- [ ] Cooking the books (risk/reward: inflate numbers, chance of SEC investigation)
- [ ] Activist investors (random hostile takeover events)
- [ ] Earnings call dialog (multiple choice, affects sentiment)
- [ ] Market conditions cycle (bull/bear markets)
- [ ] Additional departments as sheet tabs (R&D, Marketing, HR, Legal)

---

*Created: 2026-02-14*

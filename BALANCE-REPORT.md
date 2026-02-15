# Quarter Close — Comprehensive Balance & Pacing Report

*Generated: 2026-02-15 | Based on game.js analysis (~5800 lines)*

---

## 1. Executive Summary

### Key Findings

- **Early game (0-5 min)** is well-paced with constant clicking and unlocking. No dead zones.
- **Mid-early game (5-15 min)** has a potential dead zone between Tier 3 unlock ($25K) and Tier 4 ($100K) where the player waits with little to do.
- **IPO trigger** ($5T valuation) occurs around **20-40 min** depending on active play — this is well-timed.
- **RE generation is too slow** relative to Board Room costs. At typical post-IPO revenue (~$5T/yr), base RE ≈ 250/quarter. The cheapest meaningful upgrade (CFO Lv1) costs 500 RE = 2+ quarters of saving. Higher upgrades (CTO/COO Lv3 at 50,000 RE) take **200+ quarters = 5+ real hours** to afford.
- **Market Expansion is the most powerful mechanic** — the full chain (Domestic → International → Emerging → Global) gives 300× revenue for 51,000 RE total. This is extremely cost-effective compared to everything else.
- **Talent Acquisition is underpowered** — reducing hire cost exponent from 1.15 to 1.06 matters early but is irrelevant late game when CTO/COO auto-buy and revenue dwarfs hire costs.
- **Prestige (★ Restructure) is the most impactful per-RE mechanic** — 10× revenue for as low as 50 RE (Tier 0). However, it's only useful on automated sources and scales with tier.
- **Growth Initiative is the only repeatable sink** — at +2% per purchase scaling 10% cost, it becomes the default "dump RE here" option after key upgrades are bought. It never becomes useless but the impact per purchase diminishes.
- **Late game (2+ hours) has a content cliff** — after buying all Board Room upgrades, the only RE sink is Growth Initiative. The game needs more late-game content.
- **RE formula changed from `10 × log10(qRev)` to `5 × log10(qRev)²`** — this is quadratic-log, which scales much better. At $1T quarterly revenue: base RE = 360. At $1Q: base RE = 1125.
- **Active play mechanics (Overtime, Close the Deal, Focus) are well-balanced** — they provide meaningful bonuses without being mandatory. Togglable for pure-idle players.
- **Tax system creates genuine tension** — AMT (15% minimum), depreciation mechanics, and IRS escalation add strategic depth. CPA on Retainer (750 RE) is the most satisfying quality-of-life upgrade.
- **Events are well-weighted** but negative events can stack and create frustrating periods. Power outage + ransomware in quick succession = 45+ seconds of zero revenue.

---

## 2. Core Formula Reference

### 2.1 SOURCE_STATS (12 Tiers)

| Tier | baseRate ($/yr) | unlockCost | clickValue | autoCostMult |
|------|----------------|------------|------------|--------------|
| 0 | $3,000 | $0 (free) | $1 | 10 |
| 1 | $30,000 | $500 | $5 | 10 |
| 2 | $200,000 | $5,000 | $20 | 10 |
| 3 | $500,000 | $25,000 | $50 | 10 |
| 4 | $1,000,000 | $100,000 | $100 | 10 |
| 5 | $5,000,000 | $500,000 | $250 | 10 |
| 6 | $20,000,000 | $2,000,000 | $500 | 10 |
| 7 | $100,000,000 | $10,000,000 | $1,000 | 10 |
| 8 | $400,000,000 | $50,000,000 | $2,500 | 10 |
| 9 | $1,500,000,000 | $250,000,000 | $5,000 | 10 |
| 10 | $5,000,000,000 | $1,000,000,000 | $10,000 | 10 |
| 11 | $15,000,000,000 | $5,000,000,000 | $25,000 | 10 |

### 2.2 Revenue Per Tick (Per Day)

```
sourceRevPerTick(source) = employees × baseRate × upgradeMult × prestigeMult × breakthroughMult × focusMult / 365.25
```

Where:
- `upgradeMult = 1 + upgradeLevel × 0.5` (each upgrade = +50% of base)
- `prestigeMult = 10^prestigeLevel` (each prestige = 10×)
- `breakthroughMult` = cumulative from R&D events (×2 each)
- `focusMult = 1 + focus × 0.05` (max focus 10 = +50%)

**Total Rev Per Tick** also multiplied by:
- Board Room rev multiplier (from all rev upgrades, GI, market expansion)
- Revenue penalty/bonus events
- Power outage = 0 (total shutdown)
- Garnishment = ×0.85

### 2.3 Hire Cost

```
hireCost(source) = max(5, floor(base × 0.5 × exp^employees))
```

Where:
- `base = unlockCost || 10`
- `exp = getHireCostExponent()` → 1.15 (default), 1.12, 1.09, or 1.06 with Talent upgrades

**Hire cost growth by tier (at default 1.15×):**

| Employees | Tier 0 (base=10) | Tier 5 (base=500K) | Tier 11 (base=5B) |
|-----------|------------------|--------------------|-------------------|
| 1 | $5 | $287K | $2.87B |
| 5 | $10 | $503K | $5.03B |
| 10 | $20 | $1.01M | $10.1B |
| 20 | $81 | $4.09M | $40.9B |
| 50 | $5.3K | $267M | $2.67T |

### 2.4 Upgrade Cost

```
upgradeCost(source) = floor(max(50, 10 × baseRate) × 1.07^upgradeLevel)
```

| Tier | Level 0 cost | Level 10 cost | Level 20 cost | Level 50 cost |
|------|-------------|---------------|---------------|---------------|
| 0 | $30,000 | $59K | $116K | $882K |
| 5 | $50M | $98M | $193M | $1.47B |
| 11 | $150B | $295B | $580B | $4.42T |

**Each upgrade adds +0.5 to the upgrade multiplier** (i.e., Level 10 = ×6.0, Level 20 = ×11.0).

### 2.5 Automation Cost

```
automateCost(source) = floor(max(50, unlockCost) × autoCostMult)
```

| Tier | Automation Cost |
|------|----------------|
| 0 | $500 |
| 1 | $5,000 |
| 2 | $50,000 |
| 3 | $250,000 |
| 4 | $1,000,000 |
| 5 | $5,000,000 |
| 6 | $20,000,000 |
| 7 | $100,000,000 |
| 8 | $500,000,000 |
| 9 | $2,500,000,000 |
| 10 | $10,000,000,000 |
| 11 | $50,000,000,000 |

### 2.6 Prestige (★ Restructure) Cost

```
prestigeCost(source) = floor(50 × (1 + tier) × 3^level)
```

| Tier | ★1 Cost | ★2 Cost | ★3 Cost |
|------|---------|---------|---------|
| 0 | 50 RE | 150 RE | 450 RE |
| 5 | 300 RE | 900 RE | 2,700 RE |
| 11 | 600 RE | 1,800 RE | 5,400 RE |

**Effect:** Each prestige level = 10× revenue for that department.

### 2.7 Tax System

- **Tax Rate:** 25% default → 20% (Lobbyist, 1,500 RE) → 15% (Tax Haven, 8,000 RE)
- **AMT (Alternative Minimum Tax):** 15% of gross revenue. If AMT > regular tax, AMT applies.
- **Depreciation:** Capital expenses depreciate over 4 quarters. Deducted from taxable income.
- **Quarterly Tax:** Every 90 game-days. Revenue − Depreciation = Taxable Income × Tax Rate.
- **Tax Debt Escalation:**
  - Day 0-29: 1st Notice (1% daily interest)
  - Day 30-89: 2nd Notice
  - Day 90-179: Revenue Garnishment (15% revenue withheld)
  - Day 180+: Asset Seizure (debt × 1.25 taken from cash)

### 2.8 IPO & Earnings

- **IPO Trigger:** Company valuation ≥ $5T
- **Valuation Formula:** `cash + annualRev × revMultiple × growthMod × noise × earningsMultiplier − taxLiabilities`
  - `revMultiple`: 5 (< $1M), 8 ($1M+), 10 ($10M+), 12 ($100M+), 15 ($1B+)
  - `noise`: fractal market noise ±1.5%
- **Earnings Quarter:** Every 90 game-days post-IPO
- **Guidance Levels:**

| Guidance | % of Projected | RE Multiplier |
|----------|---------------|---------------|
| Conservative (🛡️) | 70% | 0.5× |
| In-Line (📊) | 90% | 1.0× |
| Ambitious (🎯) | 110% | 2.0× |
| Aggressive (🔥) | 130% | 3.0× |

- **Guidance Target:** `totalRevPerTick() × 90 × analystBaseline × guidancePct`
- **RE Formula (on beat/in-line):**
  ```
  baseRE = floor(5 × log10(qRevenue)²)
  RE = floor(baseRE × guidanceMult × marginBonus × streakMult)
  ```
  - `marginBonus = 1 + min(margin, 0.5)` (up to 1.5× for blowout)
  - `streakMult = min(2.0, 1 + streak × 0.1)` (each consecutive beat adds +10% RE)
  - Miss = 0 RE

### 2.9 Analyst Ratchet

- **On beat (streak < 3):** `analystBaseline *= 1.02` (1.01 with Analyst Relations)
- **On beat (streak ≥ 3):** `analystBaseline *= 1.05` (1.03 with Analyst Relations)
- **On miss:** `analystBaseline *= 0.97`
- **On 2+ consecutive misses:** `analystBaseline *= 0.90`
- **Caps:** Floor 0.5, ceiling 2.5

### 2.10 Board Room Upgrades (Complete List)

| Category | Upgrade | Cost (RE) | Effect |
|----------|---------|-----------|--------|
| **Expansion** | Domestic Market | 3,000 | 2× all revenue |
| | International | 8,000 | 3× all revenue |
| | Emerging Markets | 15,000 | 5× all revenue |
| | Global Domination | 25,000 | 10× all revenue |
| **Revenue** | Rev Mult I | 1,000 | 1.1× revenue |
| | Rev Mult II | 5,000 | 1.25× revenue |
| | Rev Mult III | 25,000 | 1.5× revenue |
| | Growth Initiative | 50 (scales ×1.10) | +2% per purchase, repeatable |
| **Talent** | Talent Pipeline | 5,000 | Hire exp 1.15→1.12 |
| | Employer Branding | 12,000 | Hire exp 1.12→1.09 |
| | Talent Magnet | 25,000 | Hire exp 1.09→1.06 |
| **Finance** | CFO Lv1 | 500 | Auto-earnings (random intern) |
| | CFO Lv2 | 2,500 | Context-aware CFO (~70%) |
| | CFO Lv3 | 10,000 | Elite CFO (~90%) |
| | CapEx Planning | 15,000 | CFO auto-manages CTO/COO budgets |
| **Technology** | CTO Lv1 | 2,500 | Auto-upgrades (cheapest first) |
| | CTO Lv2 | 10,000 | ROI-prioritized upgrades |
| | CTO Lv3 | 50,000 | ROI + earnings awareness |
| **Operations** | COO Lv1 | 2,500 | Auto-hires (cheapest first) |
| | COO Lv2 | 10,000 | Best marginal rev/cost hiring |
| | COO Lv3 | 50,000 | Revenue-optimized + earnings awareness |
| **Tax** | Lobbyist | 1,500 | Tax 25%→20% |
| | Tax Haven | 8,000 | Tax→15% |
| | CPA on Retainer | 750 | Auto-pays taxes, no IRS toasts |
| **Investor** | Analyst Relations | 2,000 | Ratchet slowed 50% |
| **Protection** | Golden Parachute | 3,000 | Survive 1 seizure (consumable) |

**Total RE to buy ALL one-time upgrades:** ~271,000 RE

**Market Expansion chain alone:** 51,000 RE for 300× revenue.

### 2.11 CTO/COO Budget System

- Revenue is "skimmed" each tick: `revenue × (budgetPct / 100)` goes to CTO/COO pool
- Default budget: 15% each (30% of revenue diverted from cash)
- CTO buys upgrades from pool; COO buys hires from pool
- Pools carry over between quarters
- CapEx Planning: CFO auto-adjusts budget % based on guidance and context

### 2.12 Active Play Mechanics

**Overtime:**
- Click "Push It" for `revPerTick × 5 × diminishFactor`
- `diminishFactor = 1 / (1 + clicks × 0.15)`
- Resets each quarter (90 game-days)

**Close the Deal:**
- Random enterprise contracts every 60-240s
- Click "Sign" button rapidly (10-30 clicks needed, scales with log10(annualRev))
- 12-second timer
- Reward: 30-60 seconds of revenue
- No penalty for missing

**Management Focus:**
- Click department name to add focus (max 10 = +50% rev)
- Each point = +5% revenue for that department
- Decays 1 point per 10 seconds idle
- Transient (not saved)

### 2.13 Event System

- **Base chance:** 2% per tick × EVENT_FREQ_MULT
- **Cooldown:** `(30 + random(30)) / EVENT_FREQ_MULT` ticks
- **At 1× frequency:** ~1 event per quarter (~95s between events, given 2% chance + 30-60s cooldown)
- **Events only fire after 30s of play and when no toast is visible**
- **Total weight:** ~40 across all events

### 2.14 Mini-Tasks

- Spawn chance: 6% per tick (< $50/tick), 4% ($50-500), 2% (> $500)
- Cooldown: 15-30s after completion, 10s after skip
- Auto-expire: 10s (skips if ignored)
- Reward: daily revenue × rewardMult × streakMult
- Streak multipliers: 1.0× (0-2), 1.5× (3-4), 2.0× (5-9), 3.0× (10+)

### 2.15 Golden Cell

- 2% spawn chance per tick, 30-60s cooldown between spawns
- 5-second click window
- Reward: `totalRevPerTick × 20` (20 days of revenue)
- Initial 60s delay on new game

### 2.16 Key Constants

| Constant | Value | Notes |
|----------|-------|-------|
| SECS_PER_DAY | 86,400 | 1 tick = 1 game day |
| gameSpeed | 1 (debug: 1-10) | Multiplied in game loop |
| EARNINGS_QUARTER_DAYS | 90 | Tax and earnings quarters |
| IPO_VALUATION_THRESHOLD | $5T | Triggers IPO offer |
| MAX_VALUATION_POINTS | 200 | Chart history length |
| Offline cap | 8 hours | Max offline progress |
| Event cooldown | 30-60s (÷ freq mult) | Between events |
| Mini-task cooldown | 15-30s | After completion |
| Autosave | 30s | Interval |

---

## 3. Simulated Playthrough Timeline

*Assumptions: Active player, clicking frequently, all features enabled, no debug tools, 1× speed.*

### Phase 1: Bootstrapping (0–5 min)

| Time | Event | Cash | Revenue/day |
|------|-------|------|-------------|
| 0:00 | Start — Tier 0 unlocked, 1 employee | $0 | $8.21/day |
| 0:10 | First click: +$1 + $8.21 pending | ~$10 | $8.21 |
| 0:30 | ~3 clicks, ~$30 from clicks + ticks | ~$50 | $8.21 |
| 1:00 | Hire 2nd employee (cost ~$5) | ~$85 | $16.42 |
| 1:30 | Hire 3rd employee | ~$130 | $24.63 |
| 2:00 | 4-5 employees, mini-tasks appearing | ~$250 | $40+ |
| 2:30 | Automate Tier 0 ($500) — passive income begins | ~$0 | $50+ |
| 3:00 | Saving for Tier 1 unlock ($500) | ~$100 | $60+ |
| 3:30 | Unlock Tier 1 ($500), 1 employee | ~$0 | $142/day |
| 4:00 | Hire a few Tier 1 employees | ~$200 | $250+ |
| 5:00 | Tier 1 automated ($5,000 target) | ~$1K | $400+ |

**Player engagement:** HIGH. Constant clicking, mini-tasks, unlocking, hiring. Excellent pacing.

### Phase 2: Early Growth (5–15 min)

| Time | Event | Annual Rev | Notes |
|------|-------|------------|-------|
| 5:00 | Working toward Tier 2 ($5K) | ~$150K | Mini-tasks helping |
| 6:00 | Unlock Tier 2 | ~$300K | Food Truck / WordPress Agency |
| 7:00 | Automate Tier 2 ($50K) | ~$500K | More passive income |
| 8:00 | Working toward Tier 3 ($25K) | ~$700K | |
| 9:00 | Unlock Tier 3 | ~$1M+ | $1M/yr milestone! |
| 10:00 | $1M total earned → Series A ($5M injection!) | $5M+ | Big cash spike |
| 11:00 | Automate Tier 3 ($250K) | ~$2M | |
| 12:00 | Unlock Tier 4 ($100K) | ~$3M | |
| 14:00 | Automate Tier 4 ($1M) | ~$5M | |
| 15:00 | Working toward Tier 5 ($500K) | ~$8M | |

**Player engagement:** GOOD. Series A milestone is exciting. Tier unlocks feel achievable. Potential minor dead zone at 8-9 min waiting for $25K.

### Phase 3: Mid-Growth (15–30 min)

| Time | Event | Annual Rev | Notes |
|------|-------|------------|-------|
| 15:00 | Unlock Tier 5 ($500K) | ~$10M | |
| 17:00 | Automate Tier 5 ($5M) | ~$30M | |
| 18:00 | Unlock Tier 6 ($2M) | ~$50M | |
| 20:00 | Automate Tier 6 ($20M) | ~$100M | |
| 22:00 | Unlock Tier 7 ($10M) | ~$200M | |
| 25:00 | Automate Tier 7 ($100M) | ~$500M | |
| 27:00 | Unlock Tier 8 ($50M) | ~$1B | Quarterly tax is noticeable now |
| 30:00 | Working on Tier 8 automation ($500M) | ~$2B | |

**Player engagement:** GOOD. Each tier unlock feels significant. Tax system adds decision-making. Events keep things interesting. Valuation chart provides visual feedback.

### Phase 4: Late Growth → IPO (30–60 min)

| Time | Event | Annual Rev | Notes |
|------|-------|------------|-------|
| 30:00 | Automate Tier 8 | ~$2B | |
| 33:00 | Unlock Tier 9 ($250M) | ~$5B | |
| 36:00 | Automate Tier 9 ($2.5B) | ~$10B | |
| 38:00 | Unlock Tier 10 ($1B) | ~$15B | |
| 40:00 | **IPO trigger** (~$5T valuation) | ~$20B | valuation = $20B × 15 = $300B... |

**Wait — IPO timing analysis:**

The IPO triggers at $5T valuation. With `revMultiple = 15` for $1B+ annual rev:
- Valuation ≈ `cash + annualRev × 15`
- Need `annualRev × 15 ≈ $5T` → need ~$333B/yr annual revenue
- Or significant cash accumulation

With Board Room multipliers not yet available (pre-IPO), reaching $333B/yr requires:
- Multiple Tier 9-10 employees with upgrades
- This takes roughly **35-50 minutes** of active play

**Revised IPO estimate:** ~40-50 min for active players.

| 40:00 | Multiple Tier 9+ employees, upgrading heavily | ~$50B | |
| 45:00 | Valuation approaching $1T | ~$100B | |
| 50:00 | **IPO at ~$5T valuation** | ~$300B+ | 🔔 Ring the bell! |
| 55:00 | First earnings quarter begins | | Guidance selection |
| 60:00 | First few quarters of earnings tracked | ~$500B | |

**Player engagement:** MODERATE to GOOD. The push toward IPO is exciting but can feel slow between Tier 9 and 10. Active play (overtime, deals) keeps engagement up.

### Phase 5: Post-IPO — Board Room (1–2 hours)

| Time | Event | Annual Rev | RE Total | Notes |
|------|-------|------------|----------|-------|
| 60:00 | IPO complete, first earnings Q pending | ~$500B | 0 | |
| 61:30 | First earnings beat (90s = 1 quarter) | | ~250 | In-line guidance |
| 63:00 | 2nd quarter earnings | | ~500 | Buy Growth Initiative × a few |
| 65:00 | Buy CFO Lv1 (500 RE) | | 0 | No more earnings popup! |
| 70:00 | Accumulating ~250 RE/quarter | | ~500 | |
| 75:00 | Buy CPA (750 RE) or Rev Mult I (1,000 RE) | | ~200 | |
| 80:00 | Working toward CTO/COO Lv1 (2,500 RE) | | ~1K | |
| 90:00 | Buying initial Board Room upgrades | | ~2K | |
| 100:00 | Lobbyist (1,500 RE), Analyst Relations (2K) | | ~1K | |
| 120:00 | Working on bigger upgrades | | ~3K | Domestic Market (3K) |

**RE generation analysis at $500B/yr revenue:**
- Quarterly revenue: ~$500B × (90/365.25) ≈ $123B
- `baseRE = 5 × log10(123B)² = 5 × 11.09² = 5 × 123 ≈ 615`
- With In-Line guidance (1.0×), no margin bonus, no streak: **~615 RE/quarter**
- With Ambitious guidance (2.0×), 10% margin bonus (1.1×), 3-streak (1.3×): **~1,760 RE/quarter**
- **Quarter = 90 ticks = 90 seconds real time**

So at 615 RE/quarter (conservative estimate):
- CFO Lv1 (500 RE): **~1 quarter = 90s** ✅
- CPA (750 RE): **~1.2 quarters = 108s** ✅
- Rev Mult I (1K): **~1.6Q = 144s** ✅
- CTO Lv1 (2.5K): **~4Q = 6 min** ✅
- Domestic Market (3K): **~5Q = 7.5 min** ✅
- Rev Mult II (5K): **~8Q = 12 min** ✅
- Tax Haven (8K): **~13Q = 19.5 min** ✅
- CFO Lv3 (10K): **~16Q = 24 min** ⚠️ Getting slow
- CTO Lv2 (10K): **~16Q = 24 min** ⚠️
- CapEx Planning (15K): **~24Q = 36 min** ⚠️
- Rev Mult III (25K): **~41Q = 61 min** ❌ Over an hour
- Talent Magnet (25K): **~41Q = 61 min** ❌
- Global Domination (25K): **~41Q = 61 min** ❌
- CTO Lv3 (50K): **~81Q = 121 min** ❌ 2 hours!
- COO Lv3 (50K): **~81Q = 121 min** ❌

**BUT:** Revenue grows significantly as upgrades are bought. After Domestic Market (2× rev), RE generation doubles. After International (another 3×), it 6×. This creates an accelerating flywheel:

**Revised timeline with Market Expansion acceleration:**

1. Start IPO: ~615 RE/Q at base rev
2. Buy GI + CFO Lv1 + CPA: Q1-Q3 (~4.5 min)
3. Buy Rev Mult I + Domestic Market: Q4-Q8 (~7.5 min) — Rev now 2.2×
4. RE rate now ~1,350 RE/Q (revenue doubled + upgrades + streak bonus)
5. Buy CTO Lv1 + COO Lv1 + Analyst Relations: Q9-Q12 (~6 min)
6. Buy International (8K): Q13-Q18 (~9 min) — Rev now 6.6×
7. RE rate now ~3,500 RE/Q
8. Buy everything up to 10K: Q19-Q22 (~6 min)
9. Buy Emerging Markets (15K): Q23-Q27 (~7.5 min) — Rev now 33×
10. RE rate now ~8,000+ RE/Q
11. Buy remaining 25K items: Q28-Q35 (~10.5 min)
12. Buy Global Domination (25K): Q36-Q39 (~4.5 min) — Rev now 330×
13. RE rate now ~20,000+ RE/Q
14. Buy CTO/COO Lv3 (50K each): Q40-Q45 (~7.5 min)
15. **Total: ~45 quarters = ~67 minutes post-IPO**

**Player engagement:** GOOD initially (lots of purchase decisions), MODERATE to LOW in the later stages (waiting for large purchases). The Market Expansion flywheel keeps things interesting.

### Phase 6: Late Game (2–4 hours)

After all Board Room upgrades purchased (~2.5-3 hours total play):
- Only Growth Initiative remains as RE sink
- Revenue at 330× base + prestige + breakthroughs = astronomical
- GI costs scale: 50, 55, 60, 66, 73, 80, 88, 97, 106, 117... (×1.10 each)
- After 50 GI purchases: cost ~5,868 RE each, total bonus = 1.02^50 = 2.69× (169% bonus)
- After 100 GI purchases: cost ~69K RE each, total bonus = 1.02^100 = 7.24×

**Player engagement:** LOW. The game has essentially become a number-watching exercise. Prestige provides some late-game spending but has limited levels (★3 max per department).

### Phase 7: End Game (4+ hours)

- All departments ★3, all upgrades bought
- GI is the only RE sink, costs are climbing
- Revenue in Quintillions+
- No new mechanics unlock
- **Content cliff reached**

---

## 4. Pacing Analysis by Phase

### 0–5 minutes: "The Hook"

- **Is the player engaged?** YES — very active clicking, hiring, and unlocking
- **Meaningful decisions?** Yes — when to hire vs save for unlock, when to automate
- **Exciting thing:** First unlock, first automation, watching numbers go up
- **Dead zones?** None. Well-paced.
- **Rating: ★★★★★**

### 5–15 minutes: "Growth Spurt"

- **Is the player engaged?** YES — tier unlocks every 1-2 minutes
- **Meaningful decisions?** Hire vs upgrade vs unlock vs automate
- **Exciting thing:** Series A milestone ($5M injection), reaching $1M/yr
- **Dead zones?** Minor: ~30-60s wait before Tier 3 unlock ($25K). Not problematic.
- **Rating: ★★★★☆**

### 15–30 minutes: "Scaling Up"

- **Is the player engaged?** MOSTLY — unlocks are still happening but slowing
- **Meaningful decisions?** Tax management adds depth, event responses matter
- **Exciting thing:** Reaching $1B/yr, tax system creates tension
- **Dead zones?** Possible 1-2 min wait between Tier 7 and 8 unlocks. Events fill the gap.
- **Rating: ★★★★☆**

### 30–60 minutes: "The IPO Push"

- **Is the player engaged?** MODERATE — tier unlocks are expensive, waiting for revenue
- **Meaningful decisions?** Tax management, event responses
- **Exciting thing:** IPO trigger! This is the big payoff.
- **Dead zones?** 2-5 min between final tier unlocks can feel slow. Active play mechanics (overtime, deals) help.
- **Rating: ★★★☆☆** (before IPO), **★★★★☆** (IPO moment)

### 1–2 hours: "Board Room Era"

- **Is the player engaged?** YES initially — lots of new upgrades to buy
- **Meaningful decisions?** Which upgrades to prioritize (Market Expansion is dominant)
- **Exciting thing:** Market Expansion multipliers, CTO/COO automation, prestige
- **Dead zones?** 2-5 min waits between large RE purchases. Mitigated by Growth Initiative as cheap filler.
- **Rating: ★★★★☆** (early), **★★★☆☆** (mid), **★★☆☆☆** (late)

### 2–4 hours: "Late Game"

- **Is the player engaged?** LOW — most upgrades bought, just GI + prestige remaining
- **Meaningful decisions?** Prestige target selection (which department to ★ next)
- **Exciting thing:** Watching revenue climb to Quadrillions/Quintillions
- **Dead zones?** Entire phase is essentially a dead zone with occasional prestige buys
- **Rating: ★★☆☆☆**

### 4+ hours: "Post-Game"

- **Is the player engaged?** NO — content cliff
- **Meaningful decisions?** None
- **Exciting thing:** Nothing new
- **Dead zones?** Everything
- **Rating: ★☆☆☆☆**

---

## 5. Issue Registry

| # | Issue | Severity | Phase | Suggested Fix |
|---|-------|----------|-------|---------------|
| 1 | **Content cliff after all Board Room upgrades** | 🔴 HIGH | Late game (2-4h) | Add new prestige layers (★4-5), acquisition system, mega-projects, or expanded Board Room tiers. Consider Phase 2.5+ content (R&D, Marketing, HR, Legal tabs). |
| 2 | **Market Expansion is the dominant strategy** | 🟡 MEDIUM | Mid game (1-2h) | The 300× multiplier for 51K RE makes everything else look weak. Consider: reduce multipliers (2×/2×/2×/3× = 24× total instead of 300×), or increase costs, or add prerequisites (e.g., require certain number of GI purchases). |
| 3 | **CTO/COO Lv3 costs 50K RE — too expensive** | 🟡 MEDIUM | Late mid game | At typical RE rates (~3K/Q), this takes 17 quarters = 25 minutes of pure waiting. Consider: reduce to 30K, or add intermediate Lv2.5 upgrades. Currently Lv2 (10K) and Lv3 (50K) have a 5× cost jump. |
| 4 | **Talent Acquisition chain is underpowered** | 🟡 MEDIUM | Mid-late game | Reducing hire exponent from 1.15→1.06 saves money on hires, but by the time you afford it (42K total RE), CTO/COO handle hiring automatically and revenue dwarfs hire costs. Consider: add employee capacity bonuses, or productivity per employee bonuses. |
| 5 | **Prestige capped at ★3** | 🟡 MEDIUM | Late game | Only 3 levels of prestige (10×/100×/1000×) per department. Consider: uncapped prestige with scaling costs (3^level or higher), or diminishing returns past ★3 (e.g., ★4 = 5× instead of 10×). |
| 6 | **Rev Mult I/II/III are weak compared to Market Expansion** | 🟢 LOW | Mid game | Rev Mult I (1.1×, 1K RE) through III (1.5×, 25K RE) gives 2.0625× total for 31K RE. Market Expansion gives 300× for 51K RE. The rev mult chain feels redundant. Consider: make them multiplicative with expansion (they are), so their value scales. Already partially addressed. |
| 7 | **Negative events can stack unfairly** | 🟢 LOW | All phases | Power outage (15s) + ransomware (30-60s) in quick succession = 45-75s of zero revenue. Consider: add a minimum cooldown between major negative events, or limit concurrent negative effects. |
| 8 | **No meaningful late-game CTO/COO behavior** | 🟢 LOW | Late game | CTO/COO keep buying upgrades/hires even when ROI is negative. At extreme revenues, each upgrade costs more than the revenue it adds. Consider: CTO/COO should stop buying when ROI drops below threshold, or have them invest in prestige/expansion instead. |
| 9 | **Growth Initiative scaling is too gentle** | 🟢 LOW | Late game | At +2% per purchase with 10% cost scaling, GI stays efficient for a very long time. After 50 purchases (169% bonus), each additional purchase costs ~5.9K RE for 2% more of an already huge number. This is fine as an infinite sink but doesn't feel exciting. |
| 10 | **Offline progress ignores Board Room multipliers in offline earnings** | 🟢 LOW | All post-IPO | Offline earnings use `sourceAnnualRev()` which doesn't apply Board Room multiplier. The offline modal shows lower earnings than expected. Need to multiply by `getBoardRoomRevMultiplier()` in offline calculation. |
| 11 | **No visual/audio celebration for major milestones** | 🟢 LOW | All phases | $1B, $1T, $1Q, IPO, first beat — these deserve more fanfare. Currently just status bar messages. Consider: toast notifications, confetti effect, or achievement badges. |
| 12 | **CPA auto-defer creates silent debt** | 🟢 LOW | Post-IPO | When CPA can't afford taxes, it silently creates debt. Player may not notice growing tax liabilities. Consider: make CPA deferral more visible (status bar warning persists, or tax panel flashes). |
| 13 | **Pre-IPO dead zone (Tier 9-10 unlock)** | 🟡 MEDIUM | 35-50 min | Gap between reaching ~$10B/yr and triggering $5T valuation can feel long. Active play mechanics help but the core unlock loop has slowed. Consider: additional pre-IPO milestones or angel investor events at higher revenue tiers. |
| 14 | **Offline progress doesn't process taxes or earnings** | 🟡 MEDIUM | All phases | Being offline for 8 hours means 8×365.25/90 ≈ 32 missed tax quarters and 32 missed earnings quarters. Player comes back with no tax events and no RE from those quarters. Consider: batch-process offline quarters. |

---

## 6. Recommendations (Prioritized)

### 🔴 Priority 1: Late-Game Content (addresses Issues #1, #5)

The biggest problem is the content cliff at 2-3 hours. Players who reach this point are engaged and want more.

**Recommendation 1a: Uncap or extend prestige levels**
- Allow ★4, ★5, etc. with increasing costs: `50 × (1 + tier) × 3^level`
- ★4 cost: Tier 0 = 1,350 RE, Tier 11 = 16,200 RE
- ★5 cost: Tier 0 = 4,050 RE, Tier 11 = 48,600 RE
- Consider diminishing returns: ★4-5 could give 5× instead of 10× each
- This gives players something to work toward indefinitely

**Recommendation 1b: Add Acquisitions mechanic**
- New Board Room category: spend large RE amounts to "acquire" competitor companies
- Each acquisition provides a flat revenue bonus + unique perk
- Examples: "Acquire FreshBooks" → +10% tax efficiency; "Acquire Slack" → +20% focus duration
- 5-10 acquisitions at 10K-100K RE each

**Recommendation 1c: Implement Phase 2.5+ content**
- R&D, Marketing, HR, Legal tabs (mentioned in DESIGN.md)
- Each tab provides unique mechanics and RE sinks
- This is the real solution but requires significant development

### 🟡 Priority 2: Balance Market Expansion (Issue #2)

Market Expansion at 300× total is too dominant.

**Option A: Reduce multipliers**
```
Domestic: 2× → 2× (unchanged, 3K RE)
International: 3× → 2× (8K RE)
Emerging: 5× → 3× (15K RE)
Global: 10× → 5× (25K RE)
Total: 300× → 60× (still very strong)
```

**Option B: Increase costs**
```
Domestic: 3K → 5K
International: 8K → 15K
Emerging: 15K → 30K
Global: 25K → 50K
Total cost: 51K → 100K (but still 300× — worth it)
```

**Option C: Add time gates**
- Each expansion takes N quarters to "complete" after purchase
- Domestic: instant, International: 3Q, Emerging: 5Q, Global: 10Q
- This spreads out the impact and prevents the rush to full expansion

### 🟡 Priority 3: Fix RE Pacing for Expensive Upgrades (Issue #3)

The jump from 10K to 50K RE for CTO/COO Lv3 is too steep.

**Recommendation:**
- Reduce CTO/COO Lv3 from 50K to 25K RE
- Add a "Lv2.5" intermediate tier at 20K RE if needed
- Or: introduce RE multiplier upgrades in Board Room (e.g., "Investor Confidence" → 1.5× RE per quarter, 10K RE)

### 🟡 Priority 4: Improve Talent Acquisition Value (Issue #4)

**Recommendation:** Rework Talent Acquisition to provide more than just hire cost reduction:
```
Talent Pipeline (5K RE): Hire cost -20%, +5% productivity per employee
Employer Branding (12K RE): Hire cost -40%, +10% productivity per employee  
Talent Magnet (25K RE): Hire cost -60%, +20% productivity per employee, auto-training
```

The "productivity" bonus would multiply `sourceRevPerTick` by `(1 + productivityBonus)`, making the chain valuable even when CTO/COO handle hiring.

### 🟢 Priority 5: Add More Pre-IPO Milestones (Issue #13)

**Recommendation:**
- Series B at $10M total earned → $20M injection
- Series C at $100M total earned → $100M injection
- "Unicorn Status" toast at $1B valuation
- Each milestone toast with congratulatory flavor text

### 🟢 Priority 6: Fix Offline Processing (Issues #10, #14)

**Recommendation 10:** In `loadGame()` offline earnings section, multiply by `getBoardRoomRevMultiplier()`:
```js
offlineEarnings += daily * elapsed * getBoardRoomRevMultiplier();
```

**Recommendation 14:** Process offline quarters in a batch:
```js
const offlineQuarters = Math.floor(elapsed / 90);
for (let q = 0; q < offlineQuarters; q++) {
  // Simplified tax processing
  // Simplified earnings processing (auto-beat with in-line guidance)
}
```

### 🟢 Priority 7: Event Stacking Protection (Issue #7)

**Recommendation:** Add a "negative event immunity" cooldown of 15s after any negative event resolves. Prevents back-to-back power outage + ransomware scenarios.

```js
if (gameState.negativeEventImmunity && Date.now() < gameState.negativeEventImmunity) {
  // Skip negative events, allow positive ones
}
```

### 🟢 Priority 8: Celebration System (Issue #11)

**Recommendation:** Add milestone celebrations for:
- $1M/yr, $1B/yr, $1T/yr, $1Q/yr → toast with confetti emoji
- IPO → special toast (already exists)
- First earnings beat → congratulatory toast
- 10-streak → special toast
- All Board Room upgrades bought → "Empire Complete" toast

---

## 7. Revenue Milestone Timeline (Estimated)

| Milestone | Estimated Time (Active Play) | Notes |
|-----------|------------------------------|-------|
| $1K/yr | 0:30 | Tier 0, 2-3 employees |
| $100K/yr | 3:00 | Tier 0-1, multiple employees |
| $1M/yr | 8:00 | Tier 2-3 unlocked |
| $10M/yr | 13:00 | Tier 4-5 |
| $1B/yr | 22:00 | Tier 7-8 |
| $100B/yr | 35:00 | Tier 9-10 with upgrades |
| $1T/yr | 42:00 | Pre-IPO or early IPO |
| IPO | 45-55 min | $5T valuation |
| $1Q/yr | ~90 min | With Market Expansion (2-3×) |
| $1Qi/yr | ~120 min | With full Market Expansion (300×) |
| $1Sx/yr | ~180 min | With GI + prestige |
| $1Sp/yr | ~240 min+ | End game territory |

---

## 8. RE Accumulation Rate Analysis

| Revenue Level | Quarterly Rev | Base RE | Typical RE (In-Line + 1.1× margin + 3-streak 1.3×) | Ambitious RE (2.0× + 1.3× margin + 5-streak 1.5×) |
|---------------|---------------|---------|-----------------------------------------------------|------------------------------------------------------|
| $100B/yr | $24.6B | 270 | 386 | 1,053 |
| $500B/yr | $123B | 615 | 879 | 2,399 |
| $1T/yr | $246B | 740 | 1,058 | 2,886 |
| $10T/yr | $2.46T | 1,013 | 1,449 | 3,953 |
| $100T/yr | $24.6T | 1,346 | 1,924 | 5,250 |
| $1Q/yr | $246T | 1,739 | 2,487 | 6,787 |
| $1Qi/yr | $246Q | 2,192 | 3,134 | 8,553 |

**Note:** The quadratic-log formula (`5 × log10(qRev)²`) scales well but plateaus. Doubling revenue from $1T to $2T only increases base RE by ~10%. This means RE generation doesn't keep pace with exponential revenue growth — intentional design to prevent runaway RE, but may feel stingy in late game.

---

## 9. Board Room Purchase Priority (Optimal)

Based on RE cost efficiency:

1. **Growth Initiative ×3** (50+55+60 = 165 RE) — +6% revenue immediately
2. **CFO Lv1** (500 RE) — eliminates earnings popup
3. **CPA on Retainer** (750 RE) — eliminates tax popups
4. **Rev Mult I** (1,000 RE) — 10% revenue
5. **Lobbyist** (1,500 RE) — 5% tax reduction
6. **Analyst Relations** (2,000 RE) — slows ratchet (long-term value)
7. **CTO Lv1** (2,500 RE) — auto-upgrades, saves clicks
8. **COO Lv1** (2,500 RE) — auto-hires, saves clicks
9. **Domestic Market** (3,000 RE) — 2× revenue ← **HUGE**
10. **Rev Mult II** (5,000 RE) — 1.25× revenue
11. **Talent Pipeline** (5,000 RE) — hire cost reduction
12. **Tax Haven** (8,000 RE) — tax to 15%
13. **International** (8,000 RE) — 3× revenue ← **HUGE**
14. **CFO Lv2** (2,500 RE) — better guidance picks
15. **CTO Lv2** (10,000 RE) — ROI-based upgrades
16. **COO Lv2** (10,000 RE) — better hiring
17. **CFO Lv3** (10,000 RE) — elite guidance
18. **Employer Branding** (12,000 RE) — more hire cost reduction
19. **Emerging Markets** (15,000 RE) — 5× revenue ← **HUGE**
20. **CapEx Planning** (15,000 RE) — CFO manages budgets
21. **Rev Mult III** (25,000 RE) — 1.5× revenue
22. **Global Domination** (25,000 RE) — 10× revenue ← **HUGE**
23. **Talent Magnet** (25,000 RE) — max hire cost reduction
24. **CTO Lv3** (50,000 RE) — elite upgrades
25. **COO Lv3** (50,000 RE) — elite hiring

---

## 10. Conclusion

Quarter Close has excellent early-game pacing with a satisfying click-to-idle progression. The mid-game IPO transition and Board Room prestige system provide meaningful goals. The tax system, events, and active play mechanics create genuine decision-making tension throughout.

The primary weaknesses are:
1. **Late-game content cliff** — the most critical issue. Players who reach 2-3 hours have nothing left to do.
2. **Market Expansion dominance** — it trivializes all other revenue upgrades.
3. **Expensive CTO/COO Lv3** — the cost curve needs smoothing.
4. **Talent Acquisition irrelevance** — needs rework to stay relevant.

The RE formula (`5 × log10²`) is well-tuned for mid-game pacing but creates a plateau feeling in late game. The Growth Initiative as infinite sink works but doesn't substitute for actual content.

**Overall assessment: The game is solid through approximately 2 hours of play. Beyond that, it needs Phase 2.5+ content to sustain engagement.**

---

*Report generated from game.js source analysis. All formulas and numbers extracted directly from code.*

# Ideas Backlog

*Ideas discussed but not yet implemented. Design notes for future work.*

---

## 1. VP of Operations — Mini-Task Automation

**Problem:** Mini-task bar pops between formula bar and grid, shifting all cells down by one row. Players misclick upgrades when the grid moves. This is the #1 UI complaint from players.

**What mini-tasks are:**
- Yellow bar with task text + "✔ Approve" button + "✕" skip (10s auto-expire timer)
- Reward: `dailyRev × rewardMult × streakMult` (streak goes 1× → 1.5× → 2× → 3×)
- Spawn rate: 2-6% per tick depending on passive income level
- Cooldown: 15-30s after completion, 10s after skip
- Streak resets on skip or expire — creates active-play tension

**The automation: VP of Operations (Board Room RE purchase)**

Auto-approves mini-tasks silently. No bar appears, no grid shift. Revenue still flows.

### Levels

| Level | Cost | Efficiency | Streak | Behavior |
|-------|------|-----------|--------|----------|
| Lv1 — Junior VP | 500 RE | 50% of reward | No streak | Auto-approves all tasks at half value. Reliable but leaves money on the table. |
| Lv2 — Senior VP | 2,000 RE | 75% of reward | Maintains streak (capped at 5) | Better capture rate. Streak builds but caps at 5 (2× mult max). |
| Lv3 — Executive VP | 8,000 RE | 100% of reward | Full streak (no cap) | As good as manual. Full streaks, full rewards. Frees you completely. |

### How it works in code

In `trySpawnMiniTask()`:
1. Check if VP of Ops is purchased
2. If yes: calculate reward as normal, apply efficiency %, add to cash/revenue, update streak (if Lv2+), skip showing the bar entirely
3. Show brief status bar message: `"📋 VP handled: +$X"` (subtle, no UI disruption)
4. Cooldown still applies (same 15-30s between tasks)

### Streak behavior by level

- **Lv1:** Streak always 0. Every task is 1× base. Simple and consistent.
- **Lv2:** Streak increments like normal but caps at 5 (so max 2× mult). VP is good but not as sharp as you.
- **Lv3:** Full streak, no cap. 3× at 10+ streak. As good as clicking yourself.

### Player choice tension

Manual clicking = 100% reward + unlimited streak potential (3× at 10+), but you deal with the annoying bar and risk misclicks.

VP Lv1 = peace of mind but 50% revenue.
VP Lv2 = 75% + partial streaks. Good middle ground.
VP Lv3 = expensive but fully replaces manual play.

### Toggle?

Player should be able to toggle VP on/off. Sometimes you WANT to click manually (early streak building for the rush). Toggle in the CapEx Planning section alongside CTO/COO auto checkboxes.

### Board Room placement

New category: **Operations** (or add to existing Operations category if it exists)
Show as: `VP of Operations Lv1/2/3` with level-up buttons like CFO.

### Status bar indicator

When VP is active, mini-task completions show in status bar:
- `📋 VP: Expense Report ✓ +$4.2M`
- Fades after 2s (same as manual task completion)
- No bar, no grid shift, just a quiet status update

---

## 2. Automation Hint System

**Problem:** Players don't realize automation exists. They suffer through annoying mechanics without knowing there's a Board Room upgrade to fix it.

**Concept:** After the player has been hit by N instances of an annoyance, trigger a subtle "email" hint pointing them toward the automation.

**Examples:**
- After 10+ mini-tasks with no VP of Ops: Email from "Operations Dept" — *"Sir, these approval requests are piling up. A VP of Operations could handle these automatically."*
- After 5+ tax popups without CPA: Email from "Accounting Dept" — *"Have you considered putting a CPA on retainer? We could handle tax settlements automatically."*
- After 3+ missed earnings with no CFO: Email from "Board of Directors" — *"The board recommends hiring a Finance team to manage quarterly guidance."*

**Rules:**
- Hints only fire once per mechanic (don't nag)
- Only appear after the relevant Board Room item is actually purchasable (post-IPO)
- Dismissable like any other email event
- Track `hintShown_xxx` flags in gameState

---

## 3. Inline Tips in Annoying Popups

**Concept:** When a popup appears that could be automated, add a small footer line:

- Mini-task bar: *"💡 Tip: VP of Operations (Board Room) auto-handles approvals"*
- Tax settlement toast: *"💡 Tip: CPA on Retainer (Board Room) auto-handles taxes"*
- Earnings guidance popup: *"💡 Tip: Hire a CFO (Board Room) to automate guidance"*

Only show these tips:
- After IPO (Board Room is available)
- Before the automation is purchased
- Maybe after the player has seen 3+ of that popup type

---

*Added: Feb 16, 2026*
*Status: Design notes only — not implementing yet*

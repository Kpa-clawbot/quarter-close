# Quarter Close v0.7.2 — the game now actually reacts to what's happening

[Play it here](https://kpa-clawbot.github.io/quarter-close/) | [GitHub](https://github.com/Kpa-clawbot/quarter-close)

---

Big update today focused on making the game **feel** things. Previously, earnings results just... happened. A popup said "beat" or "miss" and you moved on. Now the entire screen has an opinion about how your quarter went.

## Earnings have stakes now

When you're tracking toward a miss in the last 15 days of a quarter, things start getting uncomfortable. Your cash display develops a nervous jitter. A red glow creeps around the investor relations section. A warning banner appears at the top telling you exactly how screwed you are: "⚠️ Q3 Earnings in 4d · 73% of target · Gap: $2.1B". Last 5 days go critical — pulsing red, "MISS IMMINENT."

If you manage to catch up, everything snaps off instantly with a green relief flash. That moment feels great.

**When you beat aggressive guidance**, the screen goes nuts: brief freeze, golden flash, confetti raining from the top, giant "📈 BEAT! 📈" slamming into the center, sparkle bursts. It's over the top and that's the point — you just crushed a target you probably shouldn't have set.

**When you miss**, it's the opposite vibe: red flash, screen shake, "📉 MISS 📉". No celebration. Just a thud.

## Other new stuff

**Cash odometer** — the cash display rolls smoothly between values now instead of snapping. Last digit is always ticking so you can see money coming in.

**Button press feedback** — cells physically shrink when you click them. Small thing but it makes clicking feel way more satisfying.

**Stamps** — hire someone and a green "HIRED" stamp slams down and floats away. Upgrades get a blue "UPGRADED" stamp. Feels like you're approving things.

**Stock price heartbeat** — the stock ticker pulses with a glow. Speeds up after a good quarter, slows down after a bad one, goes erratic during crises.

**News ticker** — Bloomberg-style scrolling bar after earnings with "BREAKING: Q2 Revenue beats estimates by +12.3%" type copy.

**Live status bar** — instead of just saying "Ready" all the time, the status bar now shows your quarter progress: "Q3 · 52d left · 115% of target".

## Budget rework

CTO and COO auto-buying got reworked. Instead of skimming revenue into a pool, they now spend a percentage of your available cash directly each tick (after setting aside money for taxes). Way more intuitive — slider at 30% means they'll spend up to 30% of what you can actually afford. Both budgets pull from the same snapshot so they don't fight each other.

## All the visual effects are tunable

If any of this is too much (or not enough), there's a 🎛️ knob panel where you can dial individual effects up or down — jitter intensity, confetti count, freeze duration, button press depth, etc.

---

Still a purely vanilla HTML/CSS/JS game. No frameworks, no build step, no sound. Runs entirely in your browser tab. Saves to localStorage.

Feedback welcome — especially on the feel of the new effects. They were calibrated by repeatedly watching fake quarters end for a few hours so your mileage may vary.

# Crisis Overlay Design — "Systems Down"

*Per-event-type dramatic overlays when catastrophic events hit.*

## Overview

When certain extreme events fire, the entire play area gets a themed overlay that sells the crisis. Each event type gets its own aesthetic. The overlay blocks grid interaction but allows menus/Board Room access.

## Event → Overlay Mapping

### 1. ⚡ Power Outage → **BSOD (Blue Screen of Death)**
- **Background**: `#0078d7` (Windows 10 BSOD blue)
- **Content**: 
  ```
  :(
  
  Your company ran into a problem and needs to restart.
  We're just collecting some error info, and then we'll
  restart for you.
  
  ██████████░░░░░░░░░░ 47% complete
  
  Stop code: POWER_FAILURE_IN_BUILDING_3
  ```
- **Progress bar** fills based on remaining outage time
- **Monospace white text** on blue, classic BSOD layout
- **Stop code** varies: `POWER_FAILURE_IN_BUILDING_3`, `UPS_BATTERY_DEPLETED`, `GENERATOR_FAILED`
- Frown face `:(` is essential

### 2. 🔒 Ransomware → **Lock Screen**
- **Background**: `#1a1a1a` (near-black)
- **Content**:
  ```
  🔒 YOUR FILES HAVE BEEN ENCRYPTED
  
  All company data has been locked by CryptoLocker v4.2.0
  
  Send 15 BTC to: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
  
  Time remaining before files are permanently deleted:
  ██████████████░░░░░░ 00:42
  ```
- **Red accent text** for the scary parts
- **Fake bitcoin address** (Satoshi's genesis address, lol)
- Countdown timer shows remaining outage duration
- Only shows if player chose "Refuse — rebuild from backups" (if they paid ransom, no overlay needed since systems restore immediately)

### 3. 🌐 DDoS Attack → **Network Error Page**
- **Background**: `#f5f5f5` light gray (Chrome error page style)
- **Content**:
  ```
  [sad dinosaur emoji or 🦕]
  
  This site can't be reached
  
  corp.internal.net took too long to respond.
  
  Try:
  • Checking the connection
  • Checking the proxy and the firewall
  • Running Windows Network Diagnostics
  
  ERR_CONNECTION_TIMED_OUT
  
  CloudFlare mitigation: 65% ████████████░░░░░░
  ```
- **Chrome's `net::ERR_` aesthetic** — gray page, blue links, familiar error
- Progress bar = CloudFlare mitigation progress
- Revenue at 50% (not 0) so overlay is semi-transparent? Or full overlay since it's still dramatic

### 4. 💾 Database Corruption → **Terminal / Recovery Console**
- **Background**: `#0c0c0c` (terminal black)
- **Content** (green monospace, scrolling):
  ```
  [root@prod-db-01 ~]# fsck /dev/sda1
  /dev/sda1: recovering journal
  Block bitmap differences: +(3145728--3145983)
  Fix? yes
  
  Inode bitmap differences: +(786433--786464)
  Fix? yes
  
  Free blocks count wrong (2097152, counted=2096128).
  Fix? yes
  
  ████████████████░░░░ 78% — Estimated: 00:08
  ```
- **Green-on-black terminal text**, monospace
- Auto-scrolling fake fsck/recovery output
- New lines appear every ~2 seconds for drama
- Only shows if player chose "Wait for auto-recovery" (emergency restore = instant, no overlay)

### 5. 🔑 Password Reset → **(Not Responding) Frost**
- **Effect**: Grid area gets `filter: blur(2px) grayscale(0.5)` + `opacity: 0.6`
- **Title bar**: Appends " (Not Responding)" to "Quarter Close - Microsoft Excel"
- **Cursor**: `cursor: wait` on the grid area
- **No full overlay** — this is a minor event, just a visual degradation
- **Subtle** — fits the annoyance level (10s, not catastrophic)

### 6. ☁️ Cloud Provider Outage → **Status Page**
- **Background**: white/light with colored status bar
- **Content** (styled like statuspage.io):
  ```
  ╔══════════════════════════════════════╗
  ║  ● MAJOR OUTAGE                      ║
  ╚══════════════════════════════════════╝
  
  AWS US-EAST-1
  
  Investigating — We are currently investigating 
  increased error rates in the US-EAST-1 region.
  
  ● API ........................ Major Outage
  ● Dashboard ................. Major Outage  
  ● Data Processing ........... Degraded
  ● Authentication ............ Operational
  
  Last updated: 2 minutes ago
  
  Estimated resolution: 00:18
  ```
- **Statuspage.io aesthetic** — clean, corporate, infuriating
- Red/orange/green status indicators
- Countdown to resolution

### 7. 🐛 P0 Bug → **No overlay**
- Too minor / player has a choice to hotfix. No dramatic overlay needed.
- Keep existing behavior (revenue penalty, text indicator)

## Technical Implementation

### Overlay Element
```html
<div id="crisis-overlay" class="hidden">
  <div id="crisis-content"></div>
</div>
```
- Positioned over `#game-grid` (not full page — menus/toolbar still accessible)
- `z-index` above grid but below modals
- `pointer-events: none` on grid cells while active

### State
```js
gameState.crisisOverlay = {
  type: 'bsod' | 'ransomware' | 'ddos' | 'terminal' | 'frost' | 'statuspage',
  until: Date.now() + duration,
  stopCode: 'POWER_FAILURE_IN_BUILDING_3'  // optional per-type data
};
```

### Update Loop
In `updateDisplay()` or separate `updateCrisisOverlay()`:
- Check if crisis active and time remaining
- Update progress bar / countdown
- For terminal type: append new fake log lines periodically
- When expired: fade out overlay, remove

### CSS Classes
```css
.crisis-bsod { background: #0078d7; color: white; font-family: 'Segoe UI', sans-serif; }
.crisis-ransomware { background: #1a1a1a; color: #ff4444; }
.crisis-ddos { background: #f5f5f5; color: #333; }
.crisis-terminal { background: #0c0c0c; color: #00ff00; font-family: monospace; }
.crisis-statuspage { background: #fff; color: #333; }
.crisis-frost { filter: blur(2px) grayscale(0.5); opacity: 0.6; }
```

### Wiring into Events
Each event's `effect` function sets `gameState.crisisOverlay` alongside the existing `powerOutage`/`revPenalty`. The overlay is purely visual — game mechanics don't change.

### Dark Mode
- BSOD: same blue (universal)
- Ransomware: same dark (already dark)
- DDoS: invert to dark Chrome error page
- Terminal: same (already dark)
- Statuspage: dark variant
- Frost: slightly different filter values

## Interaction During Crisis

- **Grid**: `pointer-events: none` — can't click cells, hire, upgrade
- **Menus**: Still accessible (File, Data, Help)
- **Board Room**: Accessible (you can buy upgrades while systems are down)
- **Overtime "Push It"**: Blocked (can't push when systems are down)
- **Mini-tasks**: Blocked (no new tasks spawn during crisis)
- **Close the Deal**: Blocked
- **Toasts/Events**: Can still appear (stacking crises = comedy)

## Open Questions
- Should the crisis overlay have a "skip" or is waiting the whole point?
- Sound effects? (probably not — game has no audio currently)
- Should DDoS be full overlay (revenue is only 50%, not 0)?
- Terminal scrolling: pre-scripted lines or procedurally generated?

---

*Added: Feb 17, 2026*
*Status: Design complete, awaiting approval to implement*

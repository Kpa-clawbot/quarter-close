# Chart Persistence Bugs

## Bug 1: Chart visibility not restoring on reload
**Root cause:** In `initChartMode()` (line ~6159), the sequence is:
1. `floatChart()` is called — which sets `gameState.chartVisible = true` (line ~5907)
2. THEN it checks `if (gameState.chartVisible === false)` — but it's already true from step 1

**Fix:** Save chartVisible to a local var BEFORE calling floatChart(), then apply after:
```javascript
function initChartMode() {
  if (localStorage.getItem('qc-chart-float') === '1') {
    const wasVisible = gameState.chartVisible;  // save BEFORE floatChart overwrites it
    setTimeout(() => {
      floatChart();
      if (wasVisible === false) {
        document.getElementById('valuation-chart-container').classList.add('hidden');
      }
    }, 500);
  }
}
```

## Bug 2: Chart position not persisted
**Root cause:** Position is only tracked during drag in `chartDragState`. Never saved to localStorage or gameState.

**Fix:** After drag ends, save position. On `initChartMode`, restore it.
- Add `chartPosition: null` to gameState (or use separate localStorage key)  
- In drag `onEnd`: save `{ left, top, width, height }` from container.getBoundingClientRect()
- In `initChartMode`: after `floatChart()`, apply saved position via `container.style.left/top`
- Also save on resize end

## Status
Diagnosed. Fix deferred until save system sub-agent finishes to avoid conflicts.

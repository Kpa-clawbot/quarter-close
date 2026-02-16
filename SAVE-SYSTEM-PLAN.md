# Save System Plan

## Overview
Multi-slot save system with file export/import, checksum validation, and storage tracking.

## Current State
- Single save in localStorage key `quarterClose_save`
- `saveGame()` at ~line 3970, `loadGame()` at ~line 4040
- File menu has: Save, Auto-save toggle, New Game, About

## localStorage Key Structure

### New Keys
- `quarterClose_slots` — JSON array of slot metadata (see below)
- `quarterClose_activeSlot` — integer ID of currently loaded slot
- `quarterClose_slot_1` — save data for slot 1
- `quarterClose_slot_2` — save data for slot 2
- etc (no limit on number of slots, IDs start at 1)

### Slot Metadata Format (`quarterClose_slots`)
```json
[
  {
    "id": 0,
    "name": "My First Game",
    "savedAt": 1739712000000,
    "gameDate": "Feb 12, 2027",
    "gameDateRaw": 1172880,
    "cash": 2690000000000,
    "totalRevenue": 5400000000000,
    "sizeBytes": 2341
  }
]
```

### Migration (First Load with New Code)
1. Check if `quarterClose_save` exists AND `quarterClose_slots` does NOT exist
2. Move `quarterClose_save` data → `quarterClose_slot_1`
3. Create metadata: `quarterClose_slots` with one entry (id: 1), name derived from game date (e.g., "Game - Feb 12, 2027")
4. Set `quarterClose_activeSlot` = 1
5. Delete old `quarterClose_save` key
6. Migration runs once, silently

## Save/Load Changes

### `saveGame(slotId?)`
- If no slotId, use `quarterClose_activeSlot` (default 0)
- Write save data to `quarterClose_slot_{slotId}`
- Update slot metadata in `quarterClose_slots` (name, savedAt, gameDate, cash, totalRevenue, sizeBytes)
- `sizeBytes` = `JSON.stringify(saveData).length * 2` (UTF-16 in localStorage)

### `loadGame(slotId?)`
- If no slotId, use `quarterClose_activeSlot`
- Read from `quarterClose_slot_{slotId}`
- Set `quarterClose_activeSlot` = slotId
- Rest of load logic unchanged

### `saveGame()` auto-save
- Auto-save continues to work on the active slot, no changes needed

## File Menu Layout
```
Save                    Ctrl+S
Save As...
───────────────
Manage Saves...
───────────────
Export to File...
Import from File...
───────────────
Auto-save               ✓
───────────────
New Game
───────────────
About
```

## File Export

### Trigger
File → Export to File...

### Flow
1. Serialize current gameState (same as saveGame)
2. Add wrapper: `{ version: "0.5.0", name: slotName, exportedAt: timestamp, checksum: "sha256...", data: { ...saveData } }`
3. Compute checksum: SHA-256 of `JSON.stringify(data) + SALT`
4. SALT: hardcoded string in game.js, e.g., `"qc_2026_s4lt"` — not security, just anti-casual-editing
5. Use SHA-256 via `crypto.subtle.digest()` (available in all modern browsers including Tesla)
6. Trigger download via `<a>` element with `URL.createObjectURL(blob)`
7. Filename: sanitize slot name → `quarter-close-feb-12-2027.json`

### File Format
```json
{
  "version": "0.5.0",
  "name": "My First Game",
  "exportedAt": 1739712000000,
  "checksum": "a1b2c3d4e5f6...",
  "data": {
    "arc": "startup",
    "cash": 2690000000000,
    ...all gameState fields...
  }
}
```

## File Import

### Trigger
File → Import from File...

### Flow
1. Open file picker (accept `.json`)
2. Read file, parse JSON
3. Validate structure: must have `version`, `data`, `checksum` fields
4. Verify checksum: SHA-256 of `JSON.stringify(data) + SALT`
5. Show preview modal:

```
┌─────────────────────────────────────┐
│         Import Save File            │
├─────────────────────────────────────┤
│  Name:     My First Game            │
│  Game Day: Feb 12, 2027 (Day 1127)  │
│  Cash:     $2.69T                   │
│  Revenue:  $5.4T total              │
│  Saved:    Feb 16, 2026 2:15 PM     │
│  Version:  0.5.0                    │
│                                     │
│  ⚠️ Checksum mismatch — this file   │  ← only if checksum fails
│  may have been modified.            │
│                                     │
│  Import as: [_____________________] │  ← editable name field
│                                     │
│  [Import to New Slot]    [Cancel]   │
└─────────────────────────────────────┘
```

6. On confirm: create new slot with the imported data, switch to it
7. Does NOT overwrite existing slots — always creates a new one

## Manage Saves Modal

### Trigger
File → Manage Saves...

### Layout
```
┌──────────────────────────────────────────────────────────┐
│                    Manage Saves                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ▸ My First Game                           2.3 KB        │
│    Feb 12, 2027 · $2.69T · Saved 2:15 PM                │
│    [Load] [Rename] [Export] [Delete]                     │
│                                                          │
│  ▸ Speedrun Attempt ◀ active               1.8 KB        │
│    Mar 5, 2024 · $45.2B · Saved 1:30 PM                  │
│    [Load] [Rename] [Export] [Delete]                     │
│                                                          │
│  ▸ Testing Events                          2.1 KB        │
│    Jan 15, 2028 · $890T · Saved 11:00 AM                 │
│    [Load] [Rename] [Export] [Delete]                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Total: 6.2 KB used                                     │
│                                                          │
│  [New Game]                                    [Close]   │
└──────────────────────────────────────────────────────────┘
```

### Actions
- **Load**: Confirm "Save current game first?" → load selected slot
- **Rename**: Inline edit of slot name
- **Export**: Same as File → Export but for that specific slot
- **Delete**: Confirm "Delete 'My First Game'? This cannot be undone." → remove from localStorage
  - Cannot delete the active slot (disable button or warn)
- **New Game**: Creates a new empty slot, prompts for name, switches to it
- **Active indicator**: Show "◀ active" or highlight the current slot

### Storage Display
- Per-slot size: `JSON.stringify(slotData).length * 2` bytes (UTF-16)
- Total at bottom
- Format: bytes → KB (most saves will be 1-5 KB)

## Save As... Flow

1. Prompt with modal: "Save name:" input field, pre-filled with current slot name or game date
2. On confirm:
   - If name matches current slot → overwrite current slot
   - If new name → create new slot, switch to it
3. Cancel → do nothing

## New Game Changes
- Currently `confirmNewGame()` → `resetGame()` which wipes localStorage
- New behavior: "New Game" creates a new empty slot, prompts for name
- Old slots preserved
- Offer to save current game first

## Implementation Notes

### CSS
- Reuse existing modal styling (see About modal, offline earnings modal for reference)
- Modal backdrop: `position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000`
- Match dark mode using CSS variables

### Checksum (SHA-256)
```javascript
const SAVE_SALT = 'qc_2026_s4lt';

async function computeChecksum(data) {
  const str = JSON.stringify(data) + SAVE_SALT;
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### File Download
```javascript
function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

### File Upload
```javascript
function openFilePicker() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => handleImportFile(e.target.files[0]);
  input.click();
}
```

### Tesla Browser Compatibility
- `crypto.subtle` requires HTTPS (GitHub Pages = HTTPS, so fine)
- `URL.createObjectURL` supported in all modern browsers
- File input supported on Tesla browser
- If `crypto.subtle` is unavailable (unlikely), fall back to no checksum

### What NOT to change
- Auto-save interval/logic stays the same, just targets active slot
- Game tick, display, all gameplay code untouched
- Ctrl+S behavior: saves to active slot (unchanged)

## Files to Modify
1. **game.js** — save/load refactor, slot management, modals, checksum, file I/O
2. **index.html** — File menu items, modal HTML (or build modals in JS)
3. **style.css** — modal styling for manage saves and import preview

## Testing Checklist
- [ ] Fresh load (no existing save) → creates slot 1
- [ ] Migration from old `quarterClose_save` → slot 1
- [ ] Save/load cycle on active slot
- [ ] Save As with new name → creates new slot
- [ ] Save As with same name → overwrites
- [ ] Manage Saves: Load, Rename, Delete, Export all work
- [ ] Cannot delete active slot
- [ ] Export produces valid JSON with checksum
- [ ] Import valid file → preview → new slot created
- [ ] Import tampered file → warning shown, still loadable
- [ ] Import garbage file → error message
- [ ] Storage sizes displayed correctly
- [ ] New Game creates fresh slot
- [ ] Dark mode styling correct on all modals
- [ ] Auto-save targets active slot
- [ ] Ctrl+S targets active slot

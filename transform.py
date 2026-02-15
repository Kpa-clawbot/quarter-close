#!/usr/bin/env python3
"""Transform style.css to use CSS variables and add dark mode."""

import re

with open('style.css.bak', 'r') as f:
    css = f.read()

# ========================================
# CSS Variables block to prepend
# ========================================
css_vars = """:root {
  /* Backgrounds */
  --bg-main: #f0f0f0;
  --bg-cell: #fff;
  --bg-cell-alt: #f8f8f8;
  --bg-highlight: #e8e8e8;
  --bg-surface: #f5f5f5;
  --bg-menu: #f3f3f3;
  --bg-modal: #fff;
  --bg-input: #fff;

  /* Text */
  --text-primary: #212121;
  --text-secondary: #333;
  --text-body: #444;
  --text-label: #555;
  --text-muted: #666;
  --text-dim: #888;
  --text-faint: #999;
  --text-disabled: #aaa;
  --text-placeholder: #bbb;
  --text-ghost: #ccc;

  /* Borders */
  --border-heavy: #b0b0b0;
  --border-cell: #d0d0d0;
  --border-medium: #c0c0c0;
  --border-light: #e0e0e0;
  --border-frame: #d6d6d6;
  --border-faint: #f0f0f0;

  /* Accent colors */
  --accent-green: #217346;
  --accent-green-light: #1a5c38;
  --accent-green-text: #0b6623;
  --accent-green-success: #2e7d32;
  --accent-blue: #0078d4;
  --accent-blue-hover: #106ebe;
  --accent-blue-dark: #005a9e;
  --accent-red: #c00;
  --accent-red-danger: #d9534f;
  --accent-red-hover: #c9302c;
  --accent-red-border: #d43f3a;
  --accent-purple: #7b1fa2;
  --accent-purple-dark: #6a1b9a;
  --accent-orange: #e65100;

  /* Semantic backgrounds */
  --bg-tab: #e8e8e8;
  --bg-tab-active: #fff;
  --bg-sheet-tab: #f0f0f0;
  --bg-row-hover: #f5f9fc;
  --bg-header-row: #f8f8f8;
  --bg-header-hover: #f0f4f7;
  --bg-row-alt: #fafafa;
  --bg-stats-row: #f8faf8;
  --bg-menu-hover: #e0e0e0;
  --bg-menu-item-hover: #e8f0fe;
  --bg-tool-hover: #e8e8e8;
  --bg-focus-hover: #f0f7f0;

  /* Button colors */
  --bg-btn: #f0f0f0;
  --bg-btn-hover: #e0e0e0;
  --bg-btn-active: #d0d0d0;
  --bg-toast-btn: #f8f8f8;
  --bg-toast-btn-hover: #e8e8e8;
  --bg-btn-disabled: #e0e0e0;

  /* Collect/hire/upgrade button specific */
  --bg-collect: #e8f5e9;
  --bg-collect-hover: #c8e6c9;
  --border-collect: #81c784;
  --text-collect: #2e7d32;
  --bg-hire: #e3f2fd;
  --bg-hire-hover: #bbdefb;
  --border-hire: #90caf9;
  --text-hire: #1565c0;
  --bg-upgrade: #fff3e0;
  --bg-upgrade-hover: #ffe0b2;
  --border-upgrade: #ffb74d;
  --text-upgrade: #e65100;
  --bg-unlock: #f3e5f5;
  --bg-unlock-hover: #e1bee7;
  --border-unlock: #ce93d8;
  --text-unlock: #7b1fa2;
  --bg-automate: #e0f2f1;
  --bg-automate-hover: #b2dfdb;
  --border-automate: #80cbc4;
  --text-automate: #00695c;
  --bg-prestige: #fff8e1;
  --bg-prestige-hover: #ffecb3;
  --border-prestige: #d4a017;
  --text-prestige: #8d6e0f;

  /* Special backgrounds */
  --bg-tax-header: #fff5f5;
  --bg-tax-row: #fffafa;
  --bg-tax-row-hover: #fff0f0;
  --bg-ir-header: #f0f7ff;
  --bg-ir-row: #fafcff;
  --bg-ir-row-hover: #f0f5ff;
  --bg-br-header: #f5f0ff;
  --bg-br-hover: #f8f5ff;
  --bg-br-owned: #f0fff0;
  --bg-br-locked: #fafafa;
  --bg-mini-task: #fffde7;
  --border-mini-task: #f0e68c;
  --bg-outage: #fff0f0;

  /* Golden cell animation colors */
  --golden-light: #fff9c4;
  --golden-mid: #ffecb3;

  /* Collect flash */
  --flash-green: #c8e6c9;

  /* Toast countdown */
  --countdown-start: #d32f2f;
  --countdown-end: #ff6659;

  /* Scrollbar */
  --scrollbar-track: #f0f0f0;
  --scrollbar-thumb: #c0c0c0;
  --scrollbar-thumb-hover: #a0a0a0;

  /* Shadows */
  --shadow-sm: rgba(0,0,0,0.08);
  --shadow-md: rgba(0,0,0,0.1);
  --shadow-lg: rgba(0,0,0,0.15);
  --shadow-xl: rgba(0,0,0,0.2);
  --shadow-xxl: rgba(0,0,0,0.25);
  --shadow-overlay: rgba(0,0,0,0.3);
  --shadow-heavy: rgba(0,0,0,0.4);

  /* Splash */
  --splash-gradient-start: #e8e8e8;
  --splash-gradient-mid: #f5f5f5;
  --splash-gradient-end: #e0e0e0;

  /* Focus management colors */
  --focus-low: #81c784;
  --focus-mid: #43a047;
  --focus-high: #1b5e20;

  /* Chart */
  --chart-border: #b0b0b0;
  --chart-accent: #4472C4;

  /* Slider */
  --slider-bg: #ccc;
  --slider-thumb: #666;
  --slider-thumb-disabled: #aaa;

  /* Timescale */
  --timescale-bg: #1a237e;
  --timescale-flash: #4a148c;

  /* Arc option hover */
  --arc-hover-bg: #f8fdf9;

  /* Auto badge */
  --auto-badge: #00897b;

  /* Max button */
  --max-btn: #4a7ebb;
  --max-btn-hover: #1565c0;

  /* Settle flash */
  --settle-bg: #fdd;

  /* Purple button disabled bg */
  --bg-btn-re-disabled: #e0d0f0;

  /* IR guidance hover */
  --bg-ir-guidance-hover: #e0e8f0;

  /* White for overlays on green/dark bg */
  --text-on-accent: white;
}

.dark-mode {
  /* Backgrounds */
  --bg-main: #1e1e1e;
  --bg-cell: #252525;
  --bg-cell-alt: #2a2a2a;
  --bg-highlight: #2d2d2d;
  --bg-surface: #2d2d2d;
  --bg-menu: #2a2a2a;
  --bg-modal: #2d2d2d;
  --bg-input: #333333;

  /* Text */
  --text-primary: #e0e0e0;
  --text-secondary: #d0d0d0;
  --text-body: #c0c0c0;
  --text-label: #b0b0b0;
  --text-muted: #a0a0a0;
  --text-dim: #909090;
  --text-faint: #808080;
  --text-disabled: #707070;
  --text-placeholder: #606060;
  --text-ghost: #505050;

  /* Borders */
  --border-heavy: #555555;
  --border-cell: #3a3a3a;
  --border-medium: #444444;
  --border-light: #333333;
  --border-frame: #3a3a3a;
  --border-faint: #2a2a2a;

  /* Accent colors (keep green, adjust blue/red for dark) */
  --accent-green: #217346;
  --accent-green-light: #1a5c38;
  --accent-green-text: #4caf50;
  --accent-green-success: #66bb6a;
  --accent-blue: #4da6ff;
  --accent-blue-hover: #3d8bd5;
  --accent-blue-dark: #2979b0;
  --accent-red: #ef5350;
  --accent-red-danger: #e57373;
  --accent-red-hover: #d32f2f;
  --accent-red-border: #c62828;
  --accent-purple: #ba68c8;
  --accent-purple-dark: #9c27b0;
  --accent-orange: #ff9800;

  /* Semantic backgrounds */
  --bg-tab: #2d2d2d;
  --bg-tab-active: #252525;
  --bg-sheet-tab: #2d2d2d;
  --bg-row-hover: #1a3530;
  --bg-header-row: #2a2a2a;
  --bg-header-hover: #2e3530;
  --bg-row-alt: #2a2a2a;
  --bg-stats-row: #252a25;
  --bg-menu-hover: #3a3a3a;
  --bg-menu-item-hover: #2a3540;
  --bg-tool-hover: #3a3a3a;
  --bg-focus-hover: #253025;

  /* Button colors */
  --bg-btn: #333333;
  --bg-btn-hover: #3a3a3a;
  --bg-btn-active: #444444;
  --bg-toast-btn: #333333;
  --bg-toast-btn-hover: #3a3a3a;
  --bg-btn-disabled: #3a3a3a;

  /* Collect/hire/upgrade button specific (darkened) */
  --bg-collect: #1a3a25;
  --bg-collect-hover: #1e4a2e;
  --border-collect: #388e3c;
  --text-collect: #66bb6a;
  --bg-hire: #1a2a3a;
  --bg-hire-hover: #1e3545;
  --border-hire: #42a5f5;
  --text-hire: #64b5f6;
  --bg-upgrade: #3a2a1a;
  --bg-upgrade-hover: #453020;
  --border-upgrade: #ff9800;
  --text-upgrade: #ffb74d;
  --bg-unlock: #2a1a30;
  --bg-unlock-hover: #352040;
  --border-unlock: #ab47bc;
  --text-unlock: #ce93d8;
  --bg-automate: #1a302e;
  --bg-automate-hover: #1e3a38;
  --border-automate: #4db6ac;
  --text-automate: #80cbc4;
  --bg-prestige: #302a1a;
  --bg-prestige-hover: #3a3020;
  --border-prestige: #d4a017;
  --text-prestige: #ffd54f;

  /* Special backgrounds */
  --bg-tax-header: #2a2020;
  --bg-tax-row: #282020;
  --bg-tax-row-hover: #302525;
  --bg-ir-header: #1a2530;
  --bg-ir-row: #202530;
  --bg-ir-row-hover: #253040;
  --bg-br-header: #25203a;
  --bg-br-hover: #2a2545;
  --bg-br-owned: #1a2a1a;
  --bg-br-locked: #2a2a2a;
  --bg-mini-task: #302a1a;
  --border-mini-task: #5a5020;
  --bg-outage: #302020;

  /* Golden cell animation colors */
  --golden-light: #3a3520;
  --golden-mid: #453a20;

  /* Collect flash */
  --flash-green: #1e4a2e;

  /* Scrollbar */
  --scrollbar-track: #252525;
  --scrollbar-thumb: #444444;
  --scrollbar-thumb-hover: #555555;

  /* Shadows (stronger in dark mode) */
  --shadow-sm: rgba(0,0,0,0.2);
  --shadow-md: rgba(0,0,0,0.3);
  --shadow-lg: rgba(0,0,0,0.4);
  --shadow-xl: rgba(0,0,0,0.5);
  --shadow-xxl: rgba(0,0,0,0.5);
  --shadow-overlay: rgba(0,0,0,0.5);
  --shadow-heavy: rgba(0,0,0,0.6);

  /* Splash */
  --splash-gradient-start: #1a1a1a;
  --splash-gradient-mid: #252525;
  --splash-gradient-end: #1e1e1e;

  /* Focus management colors */
  --focus-low: #66bb6a;
  --focus-mid: #43a047;
  --focus-high: #81c784;

  /* Chart */
  --chart-border: #555555;
  --chart-accent: #5b9bd5;

  /* Slider */
  --slider-bg: #444;
  --slider-thumb: #999;
  --slider-thumb-disabled: #555;

  /* Timescale */
  --timescale-bg: #1a237e;
  --timescale-flash: #4a148c;

  /* Arc option hover */
  --arc-hover-bg: #1a2a1a;

  /* Auto badge */
  --auto-badge: #4db6ac;

  /* Max button */
  --max-btn: #64b5f6;
  --max-btn-hover: #90caf9;

  /* Settle flash */
  --settle-bg: #3a2020;

  /* Purple button disabled bg */
  --bg-btn-re-disabled: #2a2035;

  /* IR guidance hover */
  --bg-ir-guidance-hover: #253040;
}

"""

# Now do replacements in the CSS file
# Order matters - more specific replacements first

# We'll do targeted replacements using context

replacements = [
    # ---- body ----
    ('color: #212121;\n  background: #f0f0f0;', 'color: var(--text-primary);\n  background: var(--bg-main);'),

    # ---- Title bar ----
    ('background: #217346;\n  color: white;', 'background: var(--accent-green);\n  color: var(--text-on-accent);'),
    
    # ---- Menu bar ----
    ('background: #f3f3f3;\n  border-bottom: 1px solid #d6d6d6;', 'background: var(--bg-menu);\n  border-bottom: 1px solid var(--border-frame);'),
    
    # ---- Menu item ----
    ('color: #444;\n  border-radius: 2px;', 'color: var(--text-body);\n  border-radius: 2px;'),
    ('background: #e0e0e0;\n}', 'background: var(--bg-menu-hover);\n}'),
    
    # ---- Menu dropdown ----
    ('background: white;\n  border: 1px solid #d0d0d0;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.15);', 
     'background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  box-shadow: 0 2px 8px var(--shadow-lg);'),
    
    # ---- Menu dropdown item ----
    ('color: #333;\n  white-space: nowrap;\n}', 'color: var(--text-secondary);\n  white-space: nowrap;\n}'),
    ('.menu-dropdown-item:hover {\n  background: #e8f0fe;\n}', '.menu-dropdown-item:hover {\n  background: var(--bg-menu-item-hover);\n}'),
    ('.menu-dropdown-item .shortcut {\n  color: #999;', '.menu-dropdown-item .shortcut {\n  color: var(--text-faint);'),
    ('.menu-dropdown-sep {\n  height: 1px;\n  background: #e0e0e0;', '.menu-dropdown-sep {\n  height: 1px;\n  background: var(--border-light);'),
    ('color: #217346;\n}\n\n.menu-dropdown-item.toggle.off', 'color: var(--accent-green);\n}\n\n.menu-dropdown-item.toggle.off'),

    # ---- About modal ----
    ('#about-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.3);',
     '#about-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: var(--shadow-overlay);'),
    ('#about-content {\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 6px;\n  padding: 24px 32px;\n  max-width: 340px;\n  text-align: center;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.15);',
     '#about-content {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 6px;\n  padding: 24px 32px;\n  max-width: 340px;\n  text-align: center;\n  box-shadow: 0 4px 16px var(--shadow-lg);'),
    ('#about-content h3 {\n  font-size: 18px;\n  color: #217346;',
     '#about-content h3 {\n  font-size: 18px;\n  color: var(--accent-green);'),
    ('#about-content p {\n  font-size: 12px;\n  color: #666;',
     '#about-content p {\n  font-size: 12px;\n  color: var(--text-muted);'),
    ('#about-content button {\n  margin-top: 12px;\n  background: #217346;\n  color: white;',
     '#about-content button {\n  margin-top: 12px;\n  background: var(--accent-green);\n  color: var(--text-on-accent);'),
    ('#about-content button:hover {\n  background: #1a5c38;\n}',
     '#about-content button:hover {\n  background: var(--accent-green-light);\n}'),

    # ---- Help modal ----
    ('#help-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.3);',
     '#help-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: var(--shadow-overlay);'),
    ('#help-content {\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 6px;',
     '#help-content {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 6px;'),
    ('box-shadow: 0 4px 16px rgba(0,0,0,0.15);\n  display: flex;\n  flex-direction: column;\n}',
     'box-shadow: 0 4px 16px var(--shadow-lg);\n  display: flex;\n  flex-direction: column;\n}'),
    ('.help-header h3 {\n  font-size: 16px;\n  color: #217346;',
     '.help-header h3 {\n  font-size: 16px;\n  color: var(--accent-green);'),
    ('.help-close {\n  background: none;\n  border: none;\n  font-size: 16px;\n  color: #999;',
     '.help-close {\n  background: none;\n  border: none;\n  font-size: 16px;\n  color: var(--text-faint);'),
    ('.help-close:hover {\n  color: #333;\n}',
     '.help-close:hover {\n  color: var(--text-secondary);\n}'),
    
    # Help tabs
    ('border-bottom: 1px solid #e0e0e0;\n}\n\n.help-tab {',
     'border-bottom: 1px solid var(--border-light);\n}\n\n.help-tab {'),
    ('color: #666;\n  cursor: pointer;\n  border: 1px solid transparent;\n  border-bottom: none;',
     'color: var(--text-muted);\n  cursor: pointer;\n  border: 1px solid transparent;\n  border-bottom: none;'),
    ('.help-tab:hover {\n  color: #333;\n  background: #f5f5f5;\n}',
     '.help-tab:hover {\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n}'),
    ('.help-tab.active {\n  color: #217346;\n  font-weight: 600;\n  background: white;\n  border-color: #e0e0e0;\n}',
     '.help-tab.active {\n  color: var(--accent-green);\n  font-weight: 600;\n  background: var(--bg-modal);\n  border-color: var(--border-light);\n}'),
    
    # Help body
    ('color: #444;\n}\n\n.help-page {', 'color: var(--text-body);\n}\n\n.help-page {'),
    ('.help-section h4 {\n  font-size: 13px;\n  color: #217346;',
     '.help-section h4 {\n  font-size: 13px;\n  color: var(--accent-green);'),
    ('.help-section p {\n  margin: 4px 0;\n  color: #555;\n}',
     '.help-section p {\n  margin: 4px 0;\n  color: var(--text-label);\n}'),
    ('.help-section b {\n  color: #333;\n}',
     '.help-section b {\n  color: var(--text-secondary);\n}'),
    
    # ---- Confirm modal ----
    ('#confirm-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.3);',
     '#confirm-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: var(--shadow-overlay);'),
    ('#confirm-content {\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 6px;\n  padding: 24px 32px;\n  max-width: 360px;\n  text-align: center;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.15);',
     '#confirm-content {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 6px;\n  padding: 24px 32px;\n  max-width: 360px;\n  text-align: center;\n  box-shadow: 0 4px 16px var(--shadow-lg);'),
    ('#confirm-content p {\n  font-size: 13px;\n  color: #333;',
     '#confirm-content p {\n  font-size: 13px;\n  color: var(--text-secondary);'),
    ('#confirm-buttons button {\n  padding: 6px 20px;\n  border-radius: 3px;\n  cursor: pointer;\n  font-size: 12px;\n  border: 1px solid #ccc;\n  background: white;\n  color: #333;\n}',
     '#confirm-buttons button {\n  padding: 6px 20px;\n  border-radius: 3px;\n  cursor: pointer;\n  font-size: 12px;\n  border: 1px solid var(--border-medium);\n  background: var(--bg-modal);\n  color: var(--text-secondary);\n}'),
    ('#confirm-buttons button.confirm-danger {\n  background: #d9534f;\n  color: white;\n  border-color: #d43f3a;\n}',
     '#confirm-buttons button.confirm-danger {\n  background: var(--accent-red-danger);\n  color: var(--text-on-accent);\n  border-color: var(--accent-red-border);\n}'),
    ('#confirm-buttons button.confirm-danger:hover {\n  background: #c9302c;\n}',
     '#confirm-buttons button.confirm-danger:hover {\n  background: var(--accent-red-hover);\n}'),
    ('#confirm-buttons button:not(.confirm-danger):hover {\n  background: #f0f0f0;\n}',
     '#confirm-buttons button:not(.confirm-danger):hover {\n  background: var(--bg-main);\n}'),

    # ---- Toolbar ----
    ('#toolbar {\n  display: flex;\n  align-items: center;\n  background: #f8f8f8;\n  border-bottom: 1px solid #d6d6d6;',
     '#toolbar {\n  display: flex;\n  align-items: center;\n  background: var(--bg-cell-alt);\n  border-bottom: 1px solid var(--border-frame);'),
    ('color: #555;\n  border-radius: 2px;\n}\n\n.tool-btn:hover {',
     'color: var(--text-label);\n  border-radius: 2px;\n}\n\n.tool-btn:hover {'),
    ('.tool-btn:hover {\n  border-color: #c0c0c0;\n  background: #e8e8e8;\n}',
     '.tool-btn:hover {\n  border-color: var(--border-medium);\n  background: var(--bg-tool-hover);\n}'),
    ('.tool-select {\n  height: 24px;\n  border: 1px solid #c0c0c0;\n  background: white;\n  font-size: 11px;\n  color: #333;',
     '.tool-select {\n  height: 24px;\n  border: 1px solid var(--border-medium);\n  background: var(--bg-cell);\n  font-size: 11px;\n  color: var(--text-secondary);'),
    ('.toolbar-sep {\n  width: 1px;\n  height: 20px;\n  background: #d0d0d0;',
     '.toolbar-sep {\n  width: 1px;\n  height: 20px;\n  background: var(--border-cell);'),

    # ---- Formula bar ----
    ('#formula-bar, #boss-formula-bar {\n  display: flex;\n  align-items: center;\n  background: #fff;\n  border-bottom: 1px solid #d6d6d6;',
     '#formula-bar, #boss-formula-bar {\n  display: flex;\n  align-items: center;\n  background: var(--bg-cell);\n  border-bottom: 1px solid var(--border-frame);'),
    ('#cell-ref, .boss-cell-ref {\n  width: 60px;\n  text-align: center;\n  border-right: 1px solid #d6d6d6;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f8f8f8;\n  color: #333;',
     '#cell-ref, .boss-cell-ref {\n  width: 60px;\n  text-align: center;\n  border-right: 1px solid var(--border-frame);\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-cell-alt);\n  color: var(--text-secondary);'),
    ('#fx-label, .boss-fx {\n  padding: 0 8px;\n  color: #888;\n  border-right: 1px solid #d6d6d6;',
     '#fx-label, .boss-fx {\n  padding: 0 8px;\n  color: var(--text-dim);\n  border-right: 1px solid var(--border-frame);'),
    ('#formula-input, .boss-formula-input {\n  flex: 1;\n  padding: 0 8px;\n  color: #333;',
     '#formula-input, .boss-formula-input {\n  flex: 1;\n  padding: 0 8px;\n  color: var(--text-secondary);'),

    # ---- Column headers ----
    ('#col-headers > * {\n  background: #f0f0f0;\n  border-bottom: 1px solid #c0c0c0;',
     '#col-headers > * {\n  background: var(--bg-main);\n  border-bottom: 1px solid var(--border-medium);'),
    ('.row-num-header {\n  background: #f0f0f0;\n  border-right: 1px solid #c0c0c0;',
     '.row-num-header {\n  background: var(--bg-main);\n  border-right: 1px solid var(--border-medium);'),
    ('color: #666;\n  border-right: 1px solid #d6d6d6;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f0f0f0;\n}',
     'color: var(--text-muted);\n  border-right: 1px solid var(--border-frame);\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-main);\n}'),

    # ---- Grid container ----
    ('background: white;\n  display: grid;',
     'background: var(--bg-cell);\n  display: grid;'),

    # ---- Grid rows ----
    ('border-bottom: 1px solid #e8e8e8;\n  min-height: 28px;\n}\n\n.grid-row:hover > * {\n  background: #f5f9fc;\n}',
     'border-bottom: 1px solid var(--bg-highlight);\n  min-height: 28px;\n}\n\n.grid-row:hover > * {\n  background: var(--bg-row-hover);\n}'),
    
    ('.header-row > * {\n  background: #f8f8f8;',
     '.header-row > * {\n  background: var(--bg-header-row);'),
    ('.header-row:hover > * {\n  background: #f0f4f7;\n}',
     '.header-row:hover > * {\n  background: var(--bg-header-hover);\n}'),
    
    # Row number
    ('.row-num {\n  text-align: center;\n  color: #888;\n  font-size: 11px;\n  border-right: 1px solid #e0e0e0;\n  background: #fafafa;',
     '.row-num {\n  text-align: center;\n  color: var(--text-dim);\n  font-size: 11px;\n  border-right: 1px solid var(--border-light);\n  background: var(--bg-row-alt);'),

    # Cell
    ('border-right: 1px solid #e8e8e8;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;',
     'border-right: 1px solid var(--bg-highlight);\n  height: 100%;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;'),

    # Cell types
    ('.cell-a { color: #212121; }', '.cell-a { color: var(--text-primary); }'),
    ('.cell-b { justify-content: center; color: #444; }', '.cell-b { justify-content: center; color: var(--text-body); }'),
    ('.cell-c { justify-content: flex-end; color: #217346;', '.cell-c { justify-content: flex-end; color: var(--accent-green);'),
    ('.cell-d { justify-content: flex-end; color: #217346;', '.cell-d { justify-content: flex-end; color: var(--accent-green);'),
    ('.cell-g { justify-content: flex-end; color: #217346;', '.cell-g { justify-content: flex-end; color: var(--accent-green);'),
    
    ('.empty-cell { border-right: 1px solid #e8e8e8; }', '.empty-cell { border-right: 1px solid var(--bg-highlight); }'),
    
    # Header cell
    ('.header-cell {\n  font-weight: 600;\n  color: #333 !important;',
     '.header-cell {\n  font-weight: 600;\n  color: var(--text-secondary) !important;'),

    # Stats row
    ('.stats-row {\n  background: #f8faf8;\n}',
     '.stats-row {\n  background: var(--bg-stats-row);\n}'),
    ('.cash-label {\n  font-weight: 700;\n  color: #333;\n}',
     '.cash-label {\n  font-weight: 700;\n  color: var(--text-secondary);\n}'),
    ('.cash-value {\n  font-weight: 700;\n  color: #0b6623 !important;',
     '.cash-value {\n  font-weight: 700;\n  color: var(--accent-green-text) !important;'),
    ('.rev-label {\n  justify-content: flex-end;\n  color: #666;',
     '.rev-label {\n  justify-content: flex-end;\n  color: var(--text-muted);'),
    ('.rev-value {\n  color: #217346 !important;', '.rev-value {\n  color: var(--accent-green) !important;'),
    ('.per-tick-value {\n  font-weight: 700;\n  color: #0078d4 !important;', '.per-tick-value {\n  font-weight: 700;\n  color: var(--accent-blue) !important;'),

    # Stats header/label/val
    ('.stats-header {\n  font-weight: 600;\n  color: #555;', '.stats-header {\n  font-weight: 600;\n  color: var(--text-label);'),
    ('.stats-label {\n  color: #888;', '.stats-label {\n  color: var(--text-dim);'),
    ('.stats-val {\n  color: #333;', '.stats-val {\n  color: var(--text-secondary);'),

    # Sep cell
    ('.sep-cell {\n  background: #f5f5f5;', '.sep-cell {\n  background: var(--bg-surface);'),
    ('#row-sep .row-num {\n  font-size: 0;\n  background: #f5f5f5;\n}', '#row-sep .row-num {\n  font-size: 0;\n  background: var(--bg-surface);\n}'),

    # Source locked
    ('.source-locked {\n  color: #999;', '.source-locked {\n  color: var(--text-faint);'),
    ('.source-locked .cell {\n  color: #bbb;\n}', '.source-locked .cell {\n  color: var(--text-placeholder);\n}'),

    # Cell buttons
    ('.cell-btn {\n  padding: 2px 8px;\n  border: 1px solid #c0c0c0;\n  background: #f0f0f0;\n  cursor: pointer;\n  font-size: 10px;\n  border-radius: 2px;\n  color: #333;',
     '.cell-btn {\n  padding: 2px 8px;\n  border: 1px solid var(--border-medium);\n  background: var(--bg-btn);\n  cursor: pointer;\n  font-size: 10px;\n  border-radius: 2px;\n  color: var(--text-secondary);'),
    ('.cell-btn:hover {\n  background: #e0e0e0;\n  border-color: #999;\n}',
     '.cell-btn:hover {\n  background: var(--bg-btn-hover);\n  border-color: var(--text-faint);\n}'),
    ('.cell-btn:active {\n  background: #d0d0d0;\n}',
     '.cell-btn:active {\n  background: var(--bg-btn-active);\n}'),

    # Collect button
    ('.cell-btn.btn-collect {\n  background: #e8f5e9;\n  border-color: #81c784;\n  color: #2e7d32;\n}',
     '.cell-btn.btn-collect {\n  background: var(--bg-collect);\n  border-color: var(--border-collect);\n  color: var(--text-collect);\n}'),
    ('.cell-btn.btn-collect:hover,\n.cell-btn.btn-collect:active {\n  background: #c8e6c9;\n}',
     '.cell-btn.btn-collect:hover,\n.cell-btn.btn-collect:active {\n  background: var(--bg-collect-hover);\n}'),

    # Hire button
    ('.cell-btn.btn-hire {\n  background: #e3f2fd;\n  border-color: #90caf9;\n  color: #1565c0;\n}',
     '.cell-btn.btn-hire {\n  background: var(--bg-hire);\n  border-color: var(--border-hire);\n  color: var(--text-hire);\n}'),
    ('.cell-btn.btn-hire:hover,\n.cell-btn.btn-hire:active {\n  background: #bbdefb;\n}',
     '.cell-btn.btn-hire:hover,\n.cell-btn.btn-hire:active {\n  background: var(--bg-hire-hover);\n}'),

    # Max button
    ('.cell-btn.btn-max {\n  background: none;\n  border: none;\n  color: #4a7ebb;',
     '.cell-btn.btn-max {\n  background: none;\n  border: none;\n  color: var(--max-btn);'),
    ('.cell-btn.btn-max:hover,\n.cell-btn.btn-max:active {\n  color: #1565c0;\n}',
     '.cell-btn.btn-max:hover,\n.cell-btn.btn-max:active {\n  color: var(--max-btn-hover);\n}'),

    # Settle flash
    ('.cell-btn.settle-flash {\n  background: #fdd !important;\n  color: #c00 !important;\n  border-color: #c00 !important;',
     '.cell-btn.settle-flash {\n  background: var(--settle-bg) !important;\n  color: var(--accent-red) !important;\n  border-color: var(--accent-red) !important;'),

    # Upgrade button
    ('.cell-btn.btn-upgrade {\n  background: #fff3e0;\n  border-color: #ffb74d;\n  color: #e65100;\n}',
     '.cell-btn.btn-upgrade {\n  background: var(--bg-upgrade);\n  border-color: var(--border-upgrade);\n  color: var(--text-upgrade);\n}'),
    ('.cell-btn.btn-upgrade:hover,\n.cell-btn.btn-upgrade:active {\n  background: #ffe0b2;\n}',
     '.cell-btn.btn-upgrade:hover,\n.cell-btn.btn-upgrade:active {\n  background: var(--bg-upgrade-hover);\n}'),

    # Unlock button
    ('.cell-btn.btn-unlock {\n  background: #f3e5f5;\n  border-color: #ce93d8;\n  color: #7b1fa2;\n}',
     '.cell-btn.btn-unlock {\n  background: var(--bg-unlock);\n  border-color: var(--border-unlock);\n  color: var(--text-unlock);\n}'),
    ('.cell-btn.btn-unlock:hover,\n.cell-btn.btn-unlock:active {\n  background: #e1bee7;\n}',
     '.cell-btn.btn-unlock:hover,\n.cell-btn.btn-unlock:active {\n  background: var(--bg-unlock-hover);\n}'),

    # Automate button
    ('.cell-btn.btn-automate {\n  background: #e0f2f1;\n  border-color: #80cbc4;\n  color: #00695c;\n}',
     '.cell-btn.btn-automate {\n  background: var(--bg-automate);\n  border-color: var(--border-automate);\n  color: var(--text-automate);\n}'),
    ('.cell-btn.btn-automate:hover,\n.cell-btn.btn-automate:active {\n  background: #b2dfdb;\n}',
     '.cell-btn.btn-automate:hover,\n.cell-btn.btn-automate:active {\n  background: var(--bg-automate-hover);\n}'),

    # Prestige button
    ('.cell-btn.btn-prestige {\n  background: #fff8e1;\n  border-color: #d4a017;\n  color: #8d6e0f;',
     '.cell-btn.btn-prestige {\n  background: var(--bg-prestige);\n  border-color: var(--border-prestige);\n  color: var(--text-prestige);'),
    ('.cell-btn.btn-prestige:hover,\n.cell-btn.btn-prestige:active {\n  background: #ffecb3;\n}',
     '.cell-btn.btn-prestige:hover,\n.cell-btn.btn-prestige:active {\n  background: var(--bg-prestige-hover);\n}'),

    # Disabled button
    ('.cell-btn:disabled:hover {\n  background: #f0f0f0;\n  border-color: #c0c0c0;\n}',
     '.cell-btn:disabled:hover {\n  background: var(--bg-btn);\n  border-color: var(--border-medium);\n}'),

    # Auto badge
    ('.auto-badge {\n  font-size: 9px;\n  color: #00897b;', '.auto-badge {\n  font-size: 9px;\n  color: var(--auto-badge);'),

    # Filler rows
    ('.filler-row > * {\n  border-bottom: 1px solid #f0f0f0;',
     '.filler-row > * {\n  border-bottom: 1px solid var(--border-faint);'),
    ('.filler-row .row-num {\n  color: #ccc;',
     '.filler-row .row-num {\n  color: var(--text-ghost);'),
    ('.filler-row .cell {\n  border-right: 1px solid #f0f0f0;\n}',
     '.filler-row .cell {\n  border-right: 1px solid var(--border-faint);\n}'),

    # Tax rows
    ('.tax-grid-header {\n  background: #fff5f5 !important;\n}',
     '.tax-grid-header {\n  background: var(--bg-tax-header) !important;\n}'),
    ('.tax-debt-row {\n  background: #fffafa !important;\n}',
     '.tax-debt-row {\n  background: var(--bg-tax-row) !important;\n}'),
    ('.tax-debt-row:hover {\n  background: #fff0f0 !important;\n}',
     '.tax-debt-row:hover {\n  background: var(--bg-tax-row-hover) !important;\n}'),
    ('.tax-total-row {\n  background: #fff5f5 !important;\n  border-top: 2px solid #dcc !important;\n}',
     '.tax-total-row {\n  background: var(--bg-tax-header) !important;\n  border-top: 2px solid var(--border-medium) !important;\n}'),

    # Revenue breakdown
    ('#revenue-breakdown {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 3px 12px;\n  background: #f0f0f0;\n  border-top: 1px solid #d0d0d0;',
     '#revenue-breakdown {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 3px 12px;\n  background: var(--bg-main);\n  border-top: 1px solid var(--border-cell);'),
    ('.rb-label {\n  color: #666;', '.rb-label {\n  color: var(--text-muted);'),
    ('.rb-val {\n  color: #333;\n}', '.rb-val {\n  color: var(--text-secondary);\n}'),
    ('.rb-sep {\n  color: #ccc;', '.rb-sep {\n  color: var(--text-ghost);'),

    # Sheet tabs
    ('#sheet-tabs, #boss-sheet-tabs {\n  display: flex;\n  align-items: flex-end;\n  background: #e8e8e8;\n  height: 28px;\n  padding: 0 8px;\n  border-top: 1px solid #c0c0c0;',
     '#sheet-tabs, #boss-sheet-tabs {\n  display: flex;\n  align-items: flex-end;\n  background: var(--bg-tab);\n  height: 28px;\n  padding: 0 8px;\n  border-top: 1px solid var(--border-medium);'),
    ('.sheet-tab {\n  padding: 4px 16px;\n  background: #f0f0f0;\n  border: 1px solid #c0c0c0;',
     '.sheet-tab {\n  padding: 4px 16px;\n  background: var(--bg-sheet-tab);\n  border: 1px solid var(--border-medium);'),
    ('color: #555;\n  margin-top: 4px;\n}\n\n.sheet-tab.active {',
     'color: var(--text-label);\n  margin-top: 4px;\n}\n\n.sheet-tab.active {'),
    ('.sheet-tab.active {\n  background: white;\n  color: #217346;',
     '.sheet-tab.active {\n  background: var(--bg-tab-active);\n  color: var(--accent-green);'),
    ('border-bottom: 1px solid white;', 'border-bottom: 1px solid var(--bg-tab-active);'),
    ('.sheet-tab.disabled {\n  color: #bbb;', '.sheet-tab.disabled {\n  color: var(--text-placeholder);'),
    ('.sheet-tab.add-tab {\n  background: transparent;\n  border: none;\n  color: #888;',
     '.sheet-tab.add-tab {\n  background: transparent;\n  border: none;\n  color: var(--text-dim);'),

    # Status bar
    ('#status-bar, #boss-status-bar {\n  display: flex;\n  align-items: center;\n  background: #217346;\n  color: white;',
     '#status-bar, #boss-status-bar {\n  display: flex;\n  align-items: center;\n  background: var(--accent-green);\n  color: var(--text-on-accent);'),

    # Boss grid
    ('#boss-grid {\n  flex: 1;\n  background: white;',
     '#boss-grid {\n  flex: 1;\n  background: var(--bg-cell);'),
    ('#boss-grid::before {\n  content: \'\';\n  grid-column: 1;\n  grid-row: 1;\n  background: #f0f0f0;\n  border-right: 1px solid #c0c0c0;\n  border-bottom: 1px solid #c0c0c0;\n}',
     '#boss-grid::before {\n  content: \'\';\n  grid-column: 1;\n  grid-row: 1;\n  background: var(--bg-main);\n  border-right: 1px solid var(--border-medium);\n  border-bottom: 1px solid var(--border-medium);\n}'),
    ('.boss-col-header {\n  background: #f0f0f0;\n  border-right: 1px solid #e0e0e0;\n  border-bottom: 1px solid #c0c0c0;',
     '.boss-col-header {\n  background: var(--bg-main);\n  border-right: 1px solid var(--border-light);\n  border-bottom: 1px solid var(--border-medium);'),
    ('color: #666;\n}\n\n.boss-row-num {',
     'color: var(--text-muted);\n}\n\n.boss-row-num {'),
    ('.boss-row-num {\n  background: #fafafa;\n  border-right: 1px solid #e0e0e0;\n  border-bottom: 1px solid #f0f0f0;',
     '.boss-row-num {\n  background: var(--bg-row-alt);\n  border-right: 1px solid var(--border-light);\n  border-bottom: 1px solid var(--border-faint);'),
    ('color: #999;\n}\n\n.boss-cell {',
     'color: var(--text-faint);\n}\n\n.boss-cell {'),
    ('.boss-cell {\n  border-right: 1px solid #f0f0f0;\n  border-bottom: 1px solid #f0f0f0;\n}',
     '.boss-cell {\n  border-right: 1px solid var(--border-faint);\n  border-bottom: 1px solid var(--border-faint);\n}'),

    # Event toast
    ('#event-toast {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 380px;\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 4px;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.2);',
     '#event-toast {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 380px;\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 4px;\n  box-shadow: 0 4px 20px var(--shadow-xl);'),
    ('#toast-header {\n  display: flex;\n  align-items: center;\n  padding: 8px 10px;\n  background: #f5f5f5;\n  border-bottom: 1px solid #e0e0e0;',
     '#toast-header {\n  display: flex;\n  align-items: center;\n  padding: 8px 10px;\n  background: var(--bg-surface);\n  border-bottom: 1px solid var(--border-light);'),
    ('#toast-title {\n  font-weight: 600;\n  color: #0078d4;',
     '#toast-title {\n  font-weight: 600;\n  color: var(--accent-blue);'),
    ('#toast-close {\n  cursor: pointer;\n  color: #888;',
     '#toast-close {\n  cursor: pointer;\n  color: var(--text-dim);'),
    ('#toast-close:hover {\n  background: #e0e0e0;\n}',
     '#toast-close:hover {\n  background: var(--bg-menu-hover);\n}'),
    ('#toast-sender {\n  padding: 8px 10px 2px;\n  font-weight: 600;\n  color: #333;\n}',
     '#toast-sender {\n  padding: 8px 10px 2px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}'),
    ('#toast-body {\n  padding: 4px 10px 8px;\n  color: #555;',
     '#toast-body {\n  padding: 4px 10px 8px;\n  color: var(--text-label);'),

    # ER rows
    ('.er-label {\n  color: #888;', '.er-label {\n  color: var(--text-dim);'),
    ('.er-value {\n  font-family: \'Consolas\', \'Courier New\', monospace;\n  color: #333;',
     '.er-value {\n  font-family: \'Consolas\', \'Courier New\', monospace;\n  color: var(--text-secondary);'),
    ('.er-value.er-re {\n  color: #0078d4;', '.er-value.er-re {\n  color: var(--accent-blue);'),
    ('.er-divider {\n  border-top: 1px solid #e0e0e0;', '.er-divider {\n  border-top: 1px solid var(--border-light);'),
    ('.er-prompt {\n  font-size: 11px;\n  color: #888;', '.er-prompt {\n  font-size: 11px;\n  color: var(--text-dim);'),

    # Toast buttons
    ('.toast-btn {\n  padding: 4px 12px;\n  border: 1px solid #c0c0c0;\n  background: #f8f8f8;\n  cursor: pointer;\n  font-size: 11px;\n  border-radius: 2px;\n  color: #333;\n}',
     '.toast-btn {\n  padding: 4px 12px;\n  border: 1px solid var(--border-medium);\n  background: var(--bg-toast-btn);\n  cursor: pointer;\n  font-size: 11px;\n  border-radius: 2px;\n  color: var(--text-secondary);\n}'),
    ('.toast-btn:hover,\n.toast-btn:active {\n  background: #e8e8e8;\n}',
     '.toast-btn:hover,\n.toast-btn:active {\n  background: var(--bg-toast-btn-hover);\n}'),
    ('.toast-btn.toast-primary {\n  background: #0078d4;\n  color: white;\n  border-color: #0078d4;\n}',
     '.toast-btn.toast-primary {\n  background: var(--accent-blue);\n  color: var(--text-on-accent);\n  border-color: var(--accent-blue);\n}'),
    ('.toast-btn.toast-primary:hover,\n.toast-btn.toast-primary:active {\n  background: #106ebe;\n}',
     '.toast-btn.toast-primary:hover,\n.toast-btn.toast-primary:active {\n  background: var(--accent-blue-hover);\n}'),
    ('.toast-btn-disabled, .toast-btn-disabled.toast-primary {\n  background: #e0e0e0;\n  color: #999;\n  border-color: #ccc;',
     '.toast-btn-disabled, .toast-btn-disabled.toast-primary {\n  background: var(--bg-btn-disabled);\n  color: var(--text-faint);\n  border-color: var(--border-medium);'),
    ('.toast-btn-disabled:hover, .toast-btn-disabled.toast-primary:hover {\n  background: #e0e0e0;\n  color: #999;\n}',
     '.toast-btn-disabled:hover, .toast-btn-disabled.toast-primary:hover {\n  background: var(--bg-btn-disabled);\n  color: var(--text-faint);\n}'),

    # Countdown
    ('.toast-countdown-wrapper {\n  position: relative;\n  height: 28px;\n  background: #e0e0e0;',
     '.toast-countdown-wrapper {\n  position: relative;\n  height: 28px;\n  background: var(--bg-btn-disabled);'),

    # Deal popup
    ('#deal-popup {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 340px;\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 4px;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.15);',
     '#deal-popup {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 340px;\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 4px;\n  box-shadow: 0 4px 16px var(--shadow-lg);'),
    ('#deal-header {\n  font-weight: 600;\n  font-size: 13px;\n  color: #217346;',
     '#deal-header {\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--accent-green);'),
    ('#deal-body {\n  color: #555;', '#deal-body {\n  color: var(--text-label);'),
    ('#deal-progress-text {\n  font-size: 11px;\n  color: #666;',
     '#deal-progress-text {\n  font-size: 11px;\n  color: var(--text-muted);'),
    ('#deal-bar-wrap {\n  height: 4px;\n  background: #e0e0e0;',
     '#deal-bar-wrap {\n  height: 4px;\n  background: var(--border-light);'),
    ('#deal-bar {\n  height: 100%;\n  width: 0%;\n  background: #217346;',
     '#deal-bar {\n  height: 100%;\n  width: 0%;\n  background: var(--accent-green);'),

    # Offline modal
    ('#offline-modal {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.3);',
     '#offline-modal {\n  position: fixed;\n  inset: 0;\n  background: var(--shadow-overlay);'),
    ('#offline-content {\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 4px;\n  padding: 24px;\n  max-width: 400px;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.2);',
     '#offline-content {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 4px;\n  padding: 24px;\n  max-width: 400px;\n  box-shadow: 0 8px 32px var(--shadow-xl);'),
    ('#offline-header {\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: #217346;\n}',
     '#offline-header {\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: var(--accent-green);\n}'),
    ('#offline-body {\n  font-size: 13px;\n  color: #555;',
     '#offline-body {\n  font-size: 13px;\n  color: var(--text-label);'),
    ('#offline-ok {\n  padding: 8px 24px;\n  background: #217346;\n  color: white;',
     '#offline-ok {\n  padding: 8px 24px;\n  background: var(--accent-green);\n  color: var(--text-on-accent);'),
    ('#offline-ok:hover {\n  background: #1a5c38;\n}', '#offline-ok:hover {\n  background: var(--accent-green-light);\n}'),

    # Series A modal
    ('#series-a-modal {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.4);',
     '#series-a-modal {\n  position: fixed;\n  inset: 0;\n  background: var(--shadow-heavy);'),
    ('#series-a-content {\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 4px;\n  padding: 0;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.25);',
     '#series-a-content {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 4px;\n  padding: 0;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 8px 32px var(--shadow-xxl);'),
    ('#series-a-header {\n  background: #f5f5f5;\n  padding: 14px 20px;\n  font-size: 14px;\n  font-weight: 600;\n  border-bottom: 1px solid #e0e0e0;\n  color: #0078d4;\n}',
     '#series-a-header {\n  background: var(--bg-surface);\n  padding: 14px 20px;\n  font-size: 14px;\n  font-weight: 600;\n  border-bottom: 1px solid var(--border-light);\n  color: var(--accent-blue);\n}'),
    ('#series-a-body {\n  padding: 20px;\n  font-size: 13px;\n  color: #444;',
     '#series-a-body {\n  padding: 20px;\n  font-size: 13px;\n  color: var(--text-body);'),
    ('#series-a-body hr {\n  border: none;\n  border-top: 1px solid #e0e0e0;',
     '#series-a-body hr {\n  border: none;\n  border-top: 1px solid var(--border-light);'),
    ('.series-a-sub {\n  text-align: center;\n  color: #888 !important;',
     '.series-a-sub {\n  text-align: center;\n  color: var(--text-dim) !important;'),
    ('#series-a-ok {\n  display: block;\n  margin: 0 20px 20px;\n  padding: 10px 24px;\n  background: #217346;\n  color: white;',
     '#series-a-ok {\n  display: block;\n  margin: 0 20px 20px;\n  padding: 10px 24px;\n  background: var(--accent-green);\n  color: var(--text-on-accent);'),
    ('#series-a-ok:hover {\n  background: #1a5c38;\n}', '#series-a-ok:hover {\n  background: var(--accent-green-light);\n}'),

    # Collect flash animation
    ('.db-outage > .cell {\n  background: #fff0f0 !important;\n}',
     '.db-outage > .cell {\n  background: var(--bg-outage) !important;\n}'),
    ('0% { background-color: #c8e6c9; }', '0% { background-color: var(--flash-green); }'),

    # Scrollbar
    ('#grid-container::-webkit-scrollbar-track {\n  background: #f0f0f0;\n}',
     '#grid-container::-webkit-scrollbar-track {\n  background: var(--scrollbar-track);\n}'),
    ('#grid-container::-webkit-scrollbar-thumb {\n  background: #c0c0c0;\n  border: 2px solid #f0f0f0;',
     '#grid-container::-webkit-scrollbar-thumb {\n  background: var(--scrollbar-thumb);\n  border: 2px solid var(--scrollbar-track);'),
    ('#grid-container::-webkit-scrollbar-thumb:hover {\n  background: #a0a0a0;\n}',
     '#grid-container::-webkit-scrollbar-thumb:hover {\n  background: var(--scrollbar-thumb-hover);\n}'),

    # Arc selection
    ('#arc-select {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: #f0f0f0;\n}',
     '#arc-select {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: var(--bg-main);\n}'),
    ('#arc-container {\n  background: white;\n  border: 1px solid #d0d0d0;\n  border-radius: 4px;\n  padding: 40px;\n  max-width: 700px;\n  width: 90%;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);',
     '#arc-container {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  border-radius: 4px;\n  padding: 40px;\n  max-width: 700px;\n  width: 90%;\n  box-shadow: 0 2px 8px var(--shadow-md);'),
    ('#arc-title {\n  font-size: 24px;\n  font-weight: 600;\n  color: #217346;',
     '#arc-title {\n  font-size: 24px;\n  font-weight: 600;\n  color: var(--accent-green);'),
    ('#arc-subtitle {\n  font-size: 14px;\n  color: #666;\n}',
     '#arc-subtitle {\n  font-size: 14px;\n  color: var(--text-muted);\n}'),
    ('.arc-option {\n  border: 2px solid #e0e0e0;',
     '.arc-option {\n  border: 2px solid var(--border-light);'),
    ('.arc-option:hover {\n  border-color: #217346;\n  background: #f8fdf9;\n}',
     '.arc-option:hover {\n  border-color: var(--accent-green);\n  background: var(--arc-hover-bg);\n}'),
    ('.arc-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: #333;',
     '.arc-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-secondary);'),
    ('.arc-desc {\n  font-size: 12px;\n  color: #666;',
     '.arc-desc {\n  font-size: 12px;\n  color: var(--text-muted);'),
    ('.arc-first {\n  font-size: 10px;\n  color: #999;',
     '.arc-first {\n  font-size: 10px;\n  color: var(--text-faint);'),
    ('#arc-footer {\n  text-align: center;\n  margin-top: 24px;\n  font-size: 11px;\n  color: #aaa;',
     '#arc-footer {\n  text-align: center;\n  margin-top: 24px;\n  font-size: 11px;\n  color: var(--text-disabled);'),

    # Mini-task bar
    ('#mini-task-bar {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 4px 12px 4px 36px;\n  background: #fffde7;\n  border-bottom: 1px solid #f0e68c;',
     '#mini-task-bar {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 4px 12px 4px 36px;\n  background: var(--bg-mini-task);\n  border-bottom: 1px solid var(--border-mini-task);'),
    ('#mini-task-text {\n  color: #333;\n}', '#mini-task-text {\n  color: var(--text-secondary);\n}'),
    ('#mini-task-reward {\n  color: #217346;', '#mini-task-reward {\n  color: var(--accent-green);'),
    ('.mini-task-btn {\n  background: #217346;\n  color: white;',
     '.mini-task-btn {\n  background: var(--accent-green);\n  color: var(--text-on-accent);'),
    ('.mini-task-btn:hover {\n  background: #1a5c38;\n}',
     '.mini-task-btn:hover {\n  background: var(--accent-green-light);\n}'),
    ('.mini-task-skip {\n  background: none;\n  border: 1px solid #ccc;\n  color: #999;',
     '.mini-task-skip {\n  background: none;\n  border: 1px solid var(--border-medium);\n  color: var(--text-faint);'),
    ('.mini-task-skip:hover {\n  background: #f0f0f0;\n  color: #666;\n}',
     '.mini-task-skip:hover {\n  background: var(--bg-main);\n  color: var(--text-muted);\n}'),

    # Timescale banner
    ('#timescale-banner {\n  text-align: center;\n  padding: 8px 16px;\n  background: #1a237e;\n  color: white;',
     '#timescale-banner {\n  text-align: center;\n  padding: 8px 16px;\n  background: var(--timescale-bg);\n  color: var(--text-on-accent);'),
    ('0% { background: #1a237e; }\n  50% { background: #4a148c; }\n  100% { background: #1a237e; }',
     '0% { background: var(--timescale-bg); }\n  50% { background: var(--timescale-flash); }\n  100% { background: var(--timescale-bg); }'),

    # Golden cell
    ('0% { background: #fff9c4; box-shadow: inset 0 0 8px rgba(255, 193, 7, 0.4); }\n  50% { background: #ffecb3; box-shadow: inset 0 0 12px rgba(255, 152, 0, 0.6); }\n  100% { background: #fff9c4; box-shadow: inset 0 0 8px rgba(255, 193, 7, 0.4); }',
     '0% { background: var(--golden-light); box-shadow: inset 0 0 8px rgba(255, 193, 7, 0.4); }\n  50% { background: var(--golden-mid); box-shadow: inset 0 0 12px rgba(255, 152, 0, 0.6); }\n  100% { background: var(--golden-light); box-shadow: inset 0 0 8px rgba(255, 193, 7, 0.4); }'),

    # Selected cell
    ('.cell.selected-cell {\n  outline: 2px solid #217346;',
     '.cell.selected-cell {\n  outline: 2px solid var(--accent-green);'),

    # Valuation chart
    ('#valuation-chart-container {\n  position: fixed;\n  padding: 6px 10px;\n  background: #fff;\n  border: 1px solid #b0b0b0;\n  border-radius: 2px;\n  box-shadow: 1px 1px 3px rgba(0,0,0,0.08);',
     '#valuation-chart-container {\n  position: fixed;\n  padding: 6px 10px;\n  background: var(--bg-cell);\n  border: 1px solid var(--border-heavy);\n  border-radius: 2px;\n  box-shadow: 1px 1px 3px var(--shadow-sm);'),
    ('background: linear-gradient(135deg, transparent 50%, #b0b0b0 50%, #b0b0b0 60%, transparent 60%, transparent 75%, #b0b0b0 75%, #b0b0b0 85%, transparent 85%);',
     'background: linear-gradient(135deg, transparent 50%, var(--border-heavy) 50%, var(--border-heavy) 60%, transparent 60%, transparent 75%, var(--border-heavy) 75%, var(--border-heavy) 85%, transparent 85%);'),
    ('#valuation-chart-container:hover {\n  border-color: #4472C4;\n}',
     '#valuation-chart-container:hover {\n  border-color: var(--chart-accent);\n}'),
    ('.chart-title {\n  font-size: 11px;\n  font-weight: 600;\n  color: #333;',
     '.chart-title {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);'),

    # IR section
    ('.ir-header {\n  background: #f0f7ff !important;\n}',
     '.ir-header {\n  background: var(--bg-ir-header) !important;\n}'),
    ('.ir-row {\n  background: #fafcff !important;\n}',
     '.ir-row {\n  background: var(--bg-ir-row) !important;\n}'),
    ('.ir-row:hover {\n  background: #f0f5ff !important;\n}',
     '.ir-row:hover {\n  background: var(--bg-ir-row-hover) !important;\n}'),
    ('.ir-guidance-btn {\n  font-size: 9px !important;\n  padding: 2px 5px !important;\n  background: #f0f0f0;\n  border: 1px solid #c0c0c0;\n  cursor: pointer;\n  border-radius: 2px;\n  color: #333;',
     '.ir-guidance-btn {\n  font-size: 9px !important;\n  padding: 2px 5px !important;\n  background: var(--bg-btn);\n  border: 1px solid var(--border-medium);\n  cursor: pointer;\n  border-radius: 2px;\n  color: var(--text-secondary);'),
    ('.ir-guidance-btn:hover {\n  background: #e0e8f0;\n  border-color: #0078d4;\n}',
     '.ir-guidance-btn:hover {\n  background: var(--bg-ir-guidance-hover);\n  border-color: var(--accent-blue);\n}'),
    ('.ir-guidance-btn.ir-active {\n  background: #0078d4;\n  color: white;\n  border-color: #005a9e;',
     '.ir-guidance-btn.ir-active {\n  background: var(--accent-blue);\n  color: var(--text-on-accent);\n  border-color: var(--accent-blue-dark);'),

    # Board room
    ('.br-header-row > * {\n  background: #f5f0ff !important;\n}',
     '.br-header-row > * {\n  background: var(--bg-br-header) !important;\n}'),
    ('.br-upgrade-row:hover > * {\n  background: #f8f5ff !important;\n}',
     '.br-upgrade-row:hover > * {\n  background: var(--bg-br-hover) !important;\n}'),
    ('.br-upgrade-row.br-owned > * {\n  background: #f0fff0 !important;\n}',
     '.br-upgrade-row.br-owned > * {\n  background: var(--bg-br-owned) !important;\n}'),
    ('.br-upgrade-row.br-locked > * {\n  background: #fafafa !important;\n}',
     '.br-upgrade-row.br-locked > * {\n  background: var(--bg-br-locked) !important;\n}'),
    ('.br-upgrade-row.br-locked .cell {\n  color: #bbb;\n}',
     '.br-upgrade-row.br-locked .cell {\n  color: var(--text-placeholder);\n}'),
    ('.btn-buy-re {\n  background: #7b1fa2 !important;\n  color: white !important;\n  border-color: #6a1b9a !important;',
     '.btn-buy-re {\n  background: var(--accent-purple) !important;\n  color: var(--text-on-accent) !important;\n  border-color: var(--accent-purple-dark) !important;'),
    ('.btn-buy-re:hover {\n  background: #6a1b9a !important;\n}',
     '.btn-buy-re:hover {\n  background: var(--accent-purple-dark) !important;\n}'),
    ('.btn-buy-re:disabled {\n  background: #e0d0f0 !important;\n  color: #999 !important;\n  border-color: #ccc !important;',
     '.btn-buy-re:disabled {\n  background: var(--bg-btn-re-disabled) !important;\n  color: var(--text-faint) !important;\n  border-color: var(--border-medium) !important;'),
    ('.br-owned-badge {\n  color: #217346;', '.br-owned-badge {\n  color: var(--accent-green);'),
    ('.br-locked-badge {\n  color: #bbb;', '.br-locked-badge {\n  color: var(--text-placeholder);'),

    # Splash screen
    ('#splash-screen {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0,0,0,0.35);',
     '#splash-screen {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--shadow-heavy);'),
    ('#splash-overlay {\n  position: absolute;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 50%, #e0e0e0 100%);\n}',
     '#splash-overlay {\n  position: absolute;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: linear-gradient(135deg, var(--splash-gradient-start) 0%, var(--splash-gradient-mid) 50%, var(--splash-gradient-end) 100%);\n}'),
    ('#splash-dialog {\n  position: relative;\n  width: 460px;\n  max-width: 90vw;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);',
     '#splash-dialog {\n  position: relative;\n  width: 460px;\n  max-width: 90vw;\n  background: var(--bg-modal);\n  border-radius: 4px;\n  box-shadow: 0 8px 32px var(--shadow-xxl), 0 2px 8px var(--shadow-lg);'),
    ('#splash-version {\n  position: absolute;\n  top: 12px;\n  right: 16px;\n  font-size: 11px;\n  color: #aaa;',
     '#splash-version {\n  position: absolute;\n  top: 12px;\n  right: 16px;\n  font-size: 11px;\n  color: var(--text-disabled);'),
    ('#splash-filename {\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 14px;\n  color: #666;\n}',
     '#splash-filename {\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 14px;\n  color: var(--text-muted);\n}'),
    ('#splash-title {\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 48px;\n  font-weight: 300;\n  color: #333;',
     '#splash-title {\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 48px;\n  font-weight: 300;\n  color: var(--text-secondary);'),
    ('#splash-tagline {\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  color: #217346;',
     '#splash-tagline {\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--accent-green);'),
    ('#splash-progress-track {\n  position: relative;\n  z-index: 2;\n  height: 3px;\n  background: #e0e0e0;\n}',
     '#splash-progress-track {\n  position: relative;\n  z-index: 2;\n  height: 3px;\n  background: var(--border-light);\n}'),
    ('#splash-progress-bar {\n  height: 100%;\n  width: 0%;\n  background: #217346;',
     '#splash-progress-bar {\n  height: 100%;\n  width: 0%;\n  background: var(--accent-green);'),
    ('#splash-subtitle {\n  position: relative;\n  z-index: 2;\n  text-align: center;\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 12px;\n  color: #999;\n  margin: 0;\n  padding: 10px 0 14px;\n  background: #fff;\n}',
     '#splash-subtitle {\n  position: relative;\n  z-index: 2;\n  text-align: center;\n  font-family: \'Segoe UI\', Calibri, Arial, sans-serif;\n  font-size: 12px;\n  color: var(--text-faint);\n  margin: 0;\n  padding: 10px 0 14px;\n  background: var(--bg-modal);\n}'),

    # Options modal
    ('#options-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(0,0,0,0.4);',
     '#options-modal {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: var(--shadow-heavy);'),
    ('#options-content {\n  background: #fff;\n  border: 1px solid #d0d0d0;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.2);',
     '#options-content {\n  background: var(--bg-modal);\n  border: 1px solid var(--border-cell);\n  box-shadow: 0 4px 16px var(--shadow-xl);'),
    ('#options-content .help-header {\n  padding: 12px 16px;\n  border-bottom: 1px solid #e0e0e0;',
     '#options-content .help-header {\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--border-light);'),
    ('#options-content .help-header h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #333;\n}',
     '#options-content .help-header h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}'),
    ('.options-section h4 {\n  font-size: 13px;\n  font-weight: 600;\n  color: #217346;',
     '.options-section h4 {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--accent-green);'),
    ('.options-desc {\n  font-size: 11px;\n  color: #888;', '.options-desc {\n  font-size: 11px;\n  color: var(--text-dim);'),
    ('.option-toggle {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 8px 0;\n  border-bottom: 1px solid #f0f0f0;',
     '.option-toggle {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--border-faint);'),
    ('.option-toggle input[type="checkbox"] {\n  margin-top: 2px;\n  accent-color: #217346;\n}',
     '.option-toggle input[type="checkbox"] {\n  margin-top: 2px;\n  accent-color: var(--accent-green);\n}'),
    ('.option-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #333;', '.option-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);'),
    ('.option-info {\n  font-size: 11px;\n  color: #888;', '.option-info {\n  font-size: 11px;\n  color: var(--text-dim);'),
    ('.options-footer {\n  padding: 10px 16px;\n  border-top: 1px solid #e0e0e0;',
     '.options-footer {\n  padding: 10px 16px;\n  border-top: 1px solid var(--border-light);'),
    ('.options-footer button {\n  background: #217346;\n  color: #fff;',
     '.options-footer button {\n  background: var(--accent-green);\n  color: var(--text-on-accent);'),
    ('.options-footer button:hover {\n  background: #1a5c38;\n}',
     '.options-footer button:hover {\n  background: var(--accent-green-light);\n}'),

    # Focus management
    ('.focus-low {\n  color: #81c784;\n}', '.focus-low {\n  color: var(--focus-low);\n}'),
    ('.focus-mid {\n  color: #43a047;\n}', '.focus-mid {\n  color: var(--focus-mid);\n}'),
    ('.focus-high {\n  color: #1b5e20;', '.focus-high {\n  color: var(--focus-high);'),
    ('.focus-bonus {\n  font-size: 9px;\n  color: #217346;', '.focus-bonus {\n  font-size: 9px;\n  color: var(--accent-green);'),
    ('.source-name.focusable:hover,\n.source-name.focusable:active {\n  background: #f0f7f0 !important;',
     '.source-name.focusable:hover,\n.source-name.focusable:active {\n  background: var(--bg-focus-hover) !important;'),

    # CTO budget slider
    ('.cto-budget-slider {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 90px;\n  height: 4px;\n  background: #ccc;',
     '.cto-budget-slider {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 90px;\n  height: 4px;\n  background: var(--slider-bg);'),
    ('background: #666;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.cto-budget-slider::-webkit-slider-thumb:hover,',
     'background: var(--slider-thumb);\n  border-radius: 50%;\n  cursor: pointer;\n}\n.cto-budget-slider::-webkit-slider-thumb:hover,'),
    ('.cto-budget-slider::-webkit-slider-thumb:hover,\n.cto-budget-slider::-webkit-slider-thumb:active {\n  background: #0078d4;\n}',
     '.cto-budget-slider::-webkit-slider-thumb:hover,\n.cto-budget-slider::-webkit-slider-thumb:active {\n  background: var(--accent-blue);\n}'),
    ('background: #666;\n  border-radius: 50%;\n  cursor: pointer;\n  border: none;\n}\n.cto-budget-slider::-moz-range-thumb:hover,',
     'background: var(--slider-thumb);\n  border-radius: 50%;\n  cursor: pointer;\n  border: none;\n}\n.cto-budget-slider::-moz-range-thumb:hover,'),
    ('.cto-budget-slider::-moz-range-thumb:hover,\n.cto-budget-slider::-moz-range-thumb:active {\n  background: #0078d4;\n}',
     '.cto-budget-slider::-moz-range-thumb:hover,\n.cto-budget-slider::-moz-range-thumb:active {\n  background: var(--accent-blue);\n}'),
    ('.cto-budget-slider:disabled::-webkit-slider-thumb {\n  background: #aaa;',
     '.cto-budget-slider:disabled::-webkit-slider-thumb {\n  background: var(--slider-thumb-disabled);'),
    ('.cto-budget-slider:disabled::-moz-range-thumb {\n  background: #aaa;',
     '.cto-budget-slider:disabled::-moz-range-thumb {\n  background: var(--slider-thumb-disabled);'),
    ('.cto-budget-pct {\n  font-family: Consolas, monospace;\n  font-size: 10px;\n  color: #666;',
     '.cto-budget-pct {\n  font-family: Consolas, monospace;\n  font-size: 10px;\n  color: var(--text-muted);'),
    ('.cto-auto-label {\n  font-size: 10px;\n  color: #666;',
     '.cto-auto-label {\n  font-size: 10px;\n  color: var(--text-muted);'),
    ('.cto-auto-label:hover,\n.cto-auto-label:active {\n  color: #0078d4;\n}',
     '.cto-auto-label:hover,\n.cto-auto-label:active {\n  color: var(--accent-blue);\n}'),
]

for old, new in replacements:
    if old in css:
        css = css.replace(old, new)
    else:
        # Try to find close match
        print(f"WARNING: Could not find:\n{old[:80]}...")

# Prepend the variables
css = css_vars + css

with open('style.css', 'w') as f:
    f.write(css)

print("Done! Checking remaining hardcoded colors...")
import subprocess
result = subprocess.run(['grep', '-c', '-E', '#[0-9a-fA-F]{3,8}', 'style.css'], capture_output=True, text=True)
print(f"Remaining hex color references: {result.stdout.strip()}")
result2 = subprocess.run(['grep', '-n', '-E', '#[0-9a-fA-F]{3,8}', 'style.css'], capture_output=True, text=True)
print(result2.stdout)

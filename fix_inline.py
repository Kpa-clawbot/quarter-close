#!/usr/bin/env python3
"""Replace inline style colors in game.js with dm() calls."""

import re

with open('game.js', 'r') as f:
    content = f.read()

# Pattern: color:#xxx or color: #xxx inside template literals (backtick strings)
# We need to replace color:#hex with color:${dm('#hex')} 
# BUT only inside template literals (backtick strings)

# Let's be more targeted - replace style="...color:#hex..." patterns
# This handles the inline style colors in template literal HTML

# Replace patterns like: color:#333 -> color:${dm('#333')}
# But we need to be careful not to replace inside CSS variables definitions

# Common inline color patterns to replace
color_map = [
    '#333', '#444', '#555', '#666', '#888', '#999', '#aaa', '#bbb', '#ccc',
    '#c00', '#c7254e', '#c60', '#900',
    '#0078d4', '#217346', '#2e7d32', '#0b6623', '#1565c0',
    '#7b1fa2', '#6a1b9a',
    '#e65100', '#d4a017', '#8d6e0f',
    '#eee', '#ddd',
]

count = 0

# Replace inline style color references in template literals
# Match: color:COLOR or color: COLOR inside style="" 
for color in color_map:
    # Pattern: style="...color:#xxx..." in template literals
    # We need to handle both color:#xxx and color: #xxx
    
    # For template literals (${...} already present = inside backticks)
    # Replace color:COLOR with color:${dm('COLOR')}
    # But only when it appears in a style= context
    
    old_pattern = f'color:{color}'
    new_pattern = f"color:${{dm('{color}')}}"
    
    old_pattern2 = f'color: {color}'
    new_pattern2 = f"color: ${{dm('{color}')}}"
    
    # Only replace inside template literals (between backticks)
    # Simple approach: replace all instances except the dm() function definition
    # and the CSS variable definitions
    
    # Skip if inside the dm() function itself
    lines = content.split('\n')
    new_lines = []
    in_dm_function = False
    
    for line in lines:
        # Skip the dm() function definition
        if 'function dm(lightColor)' in line:
            in_dm_function = True
        if in_dm_function:
            if line.strip() == '}' and in_dm_function:
                new_lines.append(line)
                in_dm_function = False
                continue
            new_lines.append(line)
            continue
        
        # Skip CSS variable definitions  
        if line.strip().startswith('--'):
            new_lines.append(line)
            continue
            
        # Skip the map inside dm()
        if "'#" in line and "': '" in line:
            new_lines.append(line)
            continue
        
        new_lines.append(line)
    
    # Actually let's just do the replacements more carefully
    # We want to replace color:COLOR inside style="..." attributes in template literals

# Actually, let me take a simpler approach since the dm() function 
# handles the mapping. I'll use regex to find style="...color:#xxx..."
# and add dm() wrappers.

# Reset - work with original content
# The key insight: in template literals, we can use ${dm('#xxx')}
# In regular strings, we can't. But most of these are in template literals.

def replace_inline_colors(text):
    """Replace color references in inline styles with dm() calls."""
    count = 0
    
    # Pattern: style="...color:#hexcolor..." inside template literal HTML
    # We want to transform: color:#333 -> color:${dm('#333')}
    # But ONLY inside template literals (lines containing backtick-based HTML)
    
    lines = text.split('\n')
    new_lines = []
    skip_dm_block = False
    
    for i, line in enumerate(lines):
        # Skip the dm() function body
        if 'function dm(' in line:
            skip_dm_block = True
        if skip_dm_block:
            new_lines.append(line)
            if line.strip().startswith('}') and skip_dm_block:
                # Check if this closes the dm function
                if i > 0 and 'return map[' in lines[i-1]:
                    skip_dm_block = False
                elif i > 1 and 'return map[' in lines[i-2]:
                    skip_dm_block = False
            continue
        
        # Skip :root and .dark-mode variable definitions
        if line.strip().startswith('--') or line.strip().startswith("'#"):
            new_lines.append(line)
            continue
        
        # Only process lines that contain style= with color references
        if 'style=' not in line and '.style.' not in line and 'color:' not in line:
            new_lines.append(line)
            continue
        
        # Check if this line is inside a template literal (has backtick context)
        # Look for template literal patterns: `...` or multi-line template
        if '`' in line or '${' in line or line.strip().startswith('<div') or line.strip().startswith('<span'):
            # Replace color:#hex with color:${dm('#hex')}
            # But don't touch already-converted ones
            for color in ['#333', '#444', '#555', '#666', '#888', '#999', '#aaa', '#bbb', '#ccc',
                          '#c00', '#c7254e', '#c60', '#900',
                          '#0078d4', '#217346', '#2e7d32', '#0b6623', '#1565c0',
                          '#7b1fa2', '#6a1b9a', '#e65100', '#d4a017', '#8d6e0f',
                          '#eee', '#ddd', '#dea', '#f0f0f0', '#e0e0e0']:
                # Don't replace if already wrapped in dm()
                dm_wrapped = f"${{dm('{color}')}}"
                if dm_wrapped in line:
                    continue
                # Replace color:COLOR (no space)
                old = f'color:{color}'
                new = f"color:${{dm('{color}')}}"
                if old in line:
                    line = line.replace(old, new)
                    count += 1
                # Replace color: COLOR (with space)
                old2 = f'color: {color}'
                new2 = f"color: ${{dm('{color}')}}"
                if old2 in line:
                    line = line.replace(old2, new2)
                    count += 1
            
            # Also handle background colors
            for color in ['#f0f0f0', '#f5f5f5', '#f8f8f8', '#fff', '#e0e0e0', '#eee', '#e8f0fe', '#e8f5e9']:
                dm_wrapped = f"${{dm('{color}')}}"
                if dm_wrapped in line:
                    continue
                old = f'background:{color}'
                new = f"background:${{dm('{color}')}}"
                if old in line:
                    line = line.replace(old, new)
                    count += 1
                old2 = f'background: {color}'
                new2 = f"background: ${{dm('{color}')}}"
                if old2 in line:
                    line = line.replace(old2, new2)
                    count += 1
            
            # Handle border-color and border with color
            for color in ['#ccc', '#ddd', '#eee', '#c0c0c0', '#e0e0e0', '#dea']:
                dm_wrapped = f"${{dm('{color}')}}"
                if dm_wrapped in line:
                    continue
                old = f'border-bottom:1px solid {color}'
                new = f"border-bottom:1px solid ${{dm('{color}')}}"
                if old in line:
                    line = line.replace(old, new)
                    count += 1
                old2 = f'border-top:1px solid {color}'
                new2 = f"border-top:1px solid ${{dm('{color}')}}"
                if old2 in line:
                    line = line.replace(old2, new2)
                    count += 1
                old3 = f'border:1px solid {color}'
                new3 = f"border:1px solid ${{dm('{color}')}}"
                if old3 in line:
                    line = line.replace(old3, new3)
                    count += 1
                old4 = f'border-bottom:1px solid {color}'
                new4 = f"border-bottom:1px solid ${{dm('{color}')}}"
                if old4 in line:
                    line = line.replace(old4, new4)
                    count += 1
        
        new_lines.append(line)
    
    return '\n'.join(new_lines), count

result, count = replace_inline_colors(content)

with open('game.js', 'w') as f:
    f.write(result)

print(f"Replaced {count} inline color references in game.js")

# Verify remaining
import subprocess
r = subprocess.run(['grep', '-c', 'style="[^"]*color:#', 'game.js'], capture_output=True, text=True)
print(f"Remaining inline style color references: {r.stdout.strip()}")

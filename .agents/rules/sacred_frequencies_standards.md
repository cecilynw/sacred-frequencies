# Sacred Frequencies App — Standards & Upgrade Rules
**Last verified:** 2026-06-16 20:15 — App confirmed loading correctly ✅

These rules are ALWAYS active. Apply them to every change, fix, or upgrade.

## Owner
- **Cecilyn Williams** | cecilynw84@gmail.com | Europe/London | iPhone (iOS Safari first)

## Live URLs
- **App:** https://superagent-1dadce0f.base44.app/functions/sacredApp
- **Protocol:** https://superagent-1dadce0f.base44.app/functions/serveProtocol

## Source Files
- `functions/sacredApp.ts` — 102,336 chars — deployed & working (blank screen fixed 2026-06-16)
- `functions/serveProtocol.ts` — 55,807 chars — deployed
- `exports/sacred_app_full.html` — 102,143 chars — HTML master (synced to deployed TS)

## Non-Negotiable Rules

### Audio
- Pure Web Audio API — NO external CDN, NO Tone.js
- `ensureTone()` on user gesture ONLY — NEVER on page load or inside `go()`
- Silent-buffer unlock for iOS: `createBuffer(1,1,22050)` inside `ensureTone()`
- Sub-audible (<20 Hz) → binaural beats (110 Hz carrier)
- 528 Hz + 7.83 Hz constant anchors in ALL protocols (Universal Safety Promise)
- Nature ambience: brown noise buffer (2s loop) + 800 Hz lowpass

### Navigation / CSS (CRITICAL — blank screen fix)
- `#page-home { display:block }` in CSS — home visible WITHOUT any JavaScript
- All other pages: `display:none` by default
- `.page.active { display:block }` — exactly ONE occurrence in CSS
- `#page-home { display:block }` — exactly ONE occurrence in CSS
- `go(id)` uses `.classList.add/remove('active')` ONLY — NEVER `style.display`
- `go()` must NOT call `ensureTone()`
- Only ONE `<script>` tag in the entire HTML document

### Content
- Exactly 40 frequency tracks at all times (verified by `{n:` count == 40)
- All affirmations start with "I"
- Epigenetic Love: 6 stages intact (Self Love → Universal Love)
- Angel numbers: 111 through 9999 + 0000 (20 cards total)

### iOS Safari
- `touch-action: manipulation` on ALL interactive elements
- `-webkit-appearance: none` on all buttons
- `viewport-fit=cover` in meta viewport
- No JS blob URLs
- No external CDN dependencies

## Pre-Deploy Checklist (Run EVERY Deploy)
```python
checks = [
    ('#page-home{display:block}', count == 1),
    ('.page.active{display:block}', count == 1),
    ('<script', count == 1),
    ('{n:', count == 40),          # tracks
    ('PLAYER REDESIGN JS', absent),
    ('readTextFile', absent),      # wrong deploy pattern
    ('ensureTone', present),
    ('function go(', present),
]
```

## Deployment Workflow
1. Edit `exports/sacred_app_full.html` (raw HTML)
2. Read file, escape for TS: `\`→\\\``, backslashes, `${`
3. Wrap in Deno.serve template
4. Write to `functions/sacredApp.ts`
5. Pass full code string to `deploy_backend_function` (NOT a file-reader stub)
6. Verify live with Browserbase — screenshot + content check
7. Confirm to Cecilyn with live URL

## Upgrade Checklist (Every Session)
- [ ] Home page loads with content (not blank)
- [ ] All 10 nav tabs switch correctly
- [ ] Track cards tap → select + auto-play
- [ ] Audio plays on iPhone Safari (silent switch OFF)
- [ ] Nature ambience layer toggles
- [ ] Visualizer animates when playing
- [ ] Affirmation shows when track plays
- [ ] Epigenetic Love 6 stages work
- [ ] Quantum Vortex spins when active
- [ ] Journal saves to localStorage

## Monetization (Pending)
- Free: $0 | Healer: $11/mo | Ascended: $33/mo

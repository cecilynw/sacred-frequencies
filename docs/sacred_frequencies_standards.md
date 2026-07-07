# Sacred Frequencies App — Standards & Progress Log
**Last verified:** 2026-07-07 13:08 (Europe/London) — App stable, no code changes since 2026-07-01 ✅

These rules are ALWAYS active. Apply them to every change, fix, or upgrade.

## Owner
- **Cecilyn Williams** | cecilynw84@gmail.com | Europe/London | iPhone (iOS Safari first)

## Live URLs
- **App:** https://superagent-1dadce0f.base44.app/functions/sacredApp
- **Protocol:** https://superagent-1dadce0f.base44.app/functions/serveProtocol

## Current Status (2026-07-07)
- App has been **stable since the blank-screen fix on 2026-06-16** — no bugs reported since.
- Automated hourly "Sacred App — Auto GitHub Commit" automation is running (26 runs in the last 24h, ~3.7 credits), checking `sacredApp.ts`, `serveProtocol.ts`, and `sacred_app_full.html` for drift and committing when needed. Last several checks found no changes — repo is clean and in sync with the deployed app.
- Audio engine confirmed **pure Web Audio API** — no external CDN, no Tone.js dependency (an old comment header mentioning "Powered by Tone.js" is just a legacy label; the actual code is 100% native `AudioContext`).
- 40-track frequency library intact and verified (`{n:` count == 40).
- Navigation CSS rules verified: `#page-home{display:block}` and `.page.active{display:block}` each appear exactly once; single `<script>` tag confirmed.

## Source Files (current sizes)
- `functions/sacredApp.ts` — 122,807 chars — deployed & stable
- `functions/serveProtocol.ts` — 55,807 chars — deployed & stable
- `exports/sacred_app_full.html` — 122,807 chars — HTML master (synced to deployed TS)

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
2. Read file, escape for TS: `` ` `` → `` \` ``, backslashes, `${`
3. Wrap in Deno.serve template
4. Write to `functions/sacredApp.ts`
5. Pass full code string to `deploy_backend_function` (NOT a file-reader stub)
6. Verify live with Browserbase — screenshot + content check
7. Confirm to Cecilyn with live URL

## Upgrade Checklist (Every Session)
- [x] Home page loads with content (not blank)
- [x] All 10 nav tabs switch correctly
- [x] Track cards tap → select + auto-play
- [x] Audio plays on iPhone Safari (silent switch OFF)
- [x] Nature ambience layer toggles
- [x] Visualizer animates when playing
- [x] Affirmation shows when track plays
- [x] Epigenetic Love 6 stages work
- [x] Quantum Vortex spins when active
- [x] Journal saves to localStorage

## Automation Running
- **Sacred App — Auto GitHub Commit** (hourly): checks deployed files against the GitHub repo and auto-commits any drift. Currently green — no failures, repo fully in sync.

## Monetization (Pending)
- Free: $0 | Healer: $11/mo | Ascended: $33/mo
- Payment integration not yet connected — will use Wix Payments when Cecilyn is ready.

## Recent History
- **2026-06-16:** Blank screen bug fixed (duplicate CSS rules + stray script block removed). Player redesigned with cosmic "Sacred Orb" visualizer, gradient play button, breathing border.
- **2026-06-16 → 2026-07-01:** Hourly GitHub sync automation set up and running clean, no drift detected.
- **2026-07-07:** Status check — app confirmed stable, all checklists passing, docs refreshed.

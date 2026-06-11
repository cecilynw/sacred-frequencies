# Sacred Frequencies App — Standards & Upgrade Rules

These rules are ALWAYS active. Apply them to every change, fix, or upgrade.

## Live URLs
- **App:** https://superagent-1dadce0f.base44.app/functions/sacredApp
- **Protocol:** https://superagent-1dadce0f.base44.app/functions/serveProtocol

## Non-Negotiable Rules

### Audio
- Pure Web Audio API — NO external CDN, NO Tone.js
- `ensureTone()` called on user gesture ONLY (never on page load, never inside `go()`)
- Silent-buffer unlock for iOS: `createBuffer(1,1,22050)` inside `ensureTone()`
- Sub-audible frequencies (<20 Hz) use binaural beats (110 Hz carrier)
- 528 Hz + 7.83 Hz are constant anchors in ALL protocols (Universal Safety Promise)
- Nature ambience (brown noise + 800 Hz low-pass) layered under all frequency playback

### Navigation / CSS
- Home page: `#page-home { display:block }` in CSS — visible WITHOUT any JavaScript
- All other pages: `display:none` by default
- Navigation: `go(id)` adds/removes `.active` CSS class ONLY — never touches `style.display`
- `go()` must NOT call `ensureTone()` — navigation must work without triggering AudioContext

### Content
- Exactly 40 frequency tracks maintained at all times
- All affirmations start with "I" — first-person sacred declarations
- Epigenetic Love module: 6 stages intact (Self Love → Universal Love)
- Angel number frequencies: 111 through 9999 + 0000

### iOS Safari
- `touch-action: manipulation` on ALL buttons and interactive elements
- `-webkit-appearance: none` on buttons
- `viewport-fit=cover` in meta viewport
- No JavaScript blob URLs (use plain anchor links for downloads)

### Deployment
1. Edit `exports/sacred_app_full.html`
2. Rebuild `functions/sacredApp.ts` (escape HTML into TS template literal)
3. Deploy via `deploy_backend_function`
4. Verify live with Browserbase screenshot + content check
5. Report back to Cecilyn with live URL confirmation

## Continuous Upgrade Checklist
For every upgrade session:
- [ ] Audio plays on iPhone Safari (silent switch off, volume up)
- [ ] Home page loads without blank screen
- [ ] All 10 nav tabs navigate correctly
- [ ] Track cards tap to select + auto-play
- [ ] Nature ambience layer toggles on/off
- [ ] Visualizer animates when playing
- [ ] Affirmation displays when track plays
- [ ] Epigenetic Love Field activates all 6 stages
- [ ] Quantum Vortex spins when active
- [ ] Journal saves entries to localStorage

## Monetization (Future)
- Free: $0
- Healer: $11/month
- Ascended: $33/month

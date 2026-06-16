# Sacred Frequencies App — Standards & Upgrade Rules

These rules are ALWAYS active. Apply them to every change, fix, or upgrade.

## Owner
- **Cecilyn Williams** | cecilynw84@gmail.com | Europe/London | iPhone user (iOS Safari first)

## Live URLs
- **App:** https://superagent-1dadce0f.base44.app/functions/sacredApp
- **Protocol:** https://superagent-1dadce0f.base44.app/functions/serveProtocol

## Source Files
- `functions/sacredApp.ts` — deployed live (106k chars)
- `functions/serveProtocol.ts` — deployed live (55k chars)
- `exports/sacred_app_full.html` — HTML master source

## Non-Negotiable Rules

### Audio
- Pure Web Audio API — NO external CDN, NO Tone.js
- `ensureTone()` on user gesture ONLY — NEVER on page load or inside `go()`
- Silent-buffer unlock for iOS: `createBuffer(1,1,22050)` inside `ensureTone()`
- Sub-audible (<20 Hz) → binaural beats (110 Hz carrier)
- 528 Hz + 7.83 Hz constant anchors in ALL protocols (Universal Safety Promise)
- Nature ambience (brown noise + 800 Hz low-pass) layered under frequency playback

### Navigation / CSS
- `#page-home { display:block }` in CSS — home visible WITHOUT any JavaScript
- All other pages: `display:none` by default
- `go(id)` uses `.classList.add/remove('active')` ONLY — never `style.display`
- `go()` must NOT call `ensureTone()`

### Content
- Exactly 40 frequency tracks at all times
- All affirmations start with "I"
- Epigenetic Love: 6 stages intact (Self Love → Universal Love)
- Angel numbers: 111 through 9999 + 0000

### iOS Safari
- `touch-action: manipulation` on ALL interactive elements
- `-webkit-appearance: none` on all buttons
- `viewport-fit=cover` in meta viewport
- No JS blob URLs

## Deployment Workflow
1. Edit `exports/sacred_app_full.html`
2. Escape for TS template literal (backslashes, backticks, ${)
3. Write to `functions/sacredApp.ts`
4. Deploy via `deploy_backend_function`
5. Verify live with Browserbase — screenshot + content check
6. Confirm to Cecilyn with live URL

## Upgrade Checklist (Every Session)
- [ ] Home page loads with content (not blank)
- [ ] All 10 nav tabs switch correctly
- [ ] Track cards tap → select + auto-play
- [ ] Audio plays on iPhone Safari
- [ ] Nature ambience layer toggles
- [ ] Visualizer animates when playing
- [ ] Affirmation shows when track plays
- [ ] Epigenetic Love 6 stages work
- [ ] Quantum Vortex spins when active
- [ ] Journal saves to localStorage

## Monetization (Future)
- Free: $0 | Healer: $11/mo | Ascended: $33/mo

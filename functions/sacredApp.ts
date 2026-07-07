Deno.serve(async (_req) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#030712">
<title>Sacred Frequencies — Heal. Align. Ascend.</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#030712;--card:#0f172a;--border:#1e293b;--text:#e2e8f0;--muted:#94a3b8;--dim:#475569}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
nav{position:fixed;top:0;left:0;right:0;z-index:200;background:#03071295;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid #ffffff12;padding-top:env(safe-area-inset-top,0px)}
.nav-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;gap:16px;height:54px;padding:0 16px}
.nav-logo{font-weight:900;font-size:15px;background:linear-gradient(135deg,#fbbf24,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;white-space:nowrap;flex-shrink:0}
.nav-tabs{display:flex;gap:2px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;flex:1}
.nav-tabs::-webkit-scrollbar{display:none}
.tab{padding:5px 11px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;white-space:nowrap;border:none;background:transparent;color:#ffffff55;transition:all 0.15s;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.tab.active{background:#ffffff18;color:#fff}
.page{display:none;max-width:960px;margin:0 auto;padding:66px 16px 80px;padding-bottom:max(80px,env(safe-area-inset-bottom,80px));position:relative;z-index:1}.page.active{display:block}
.hero{text-align:center;padding:36px 0 28px}
.hero-badge{display:inline-block;padding:4px 14px;border:1px solid #7c3aed55;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.2em;color:#a78bfa;margin-bottom:14px;text-transform:uppercase}
.hero h1{font-size:clamp(26px,6vw,42px);font-weight:900;line-height:1.1;margin-bottom:10px}
.grad-gold{background:linear-gradient(135deg,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-main{background:linear-gradient(135deg,#fb7185,#fbbf24,#34d399,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-violet{background:linear-gradient(135deg,#a78bfa,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-rose{background:linear-gradient(135deg,#fb7185,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-green{background:linear-gradient(135deg,#34d399,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-amber{background:linear-gradient(135deg,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-teal{background:linear-gradient(135deg,#2dd4bf,#0891b2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
p.sub{color:var(--muted);font-size:14px;line-height:1.75;max-width:600px;margin:0 auto}
.btn{display:inline-flex;align-items:center;gap:6px;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;cursor:pointer;border:none;transition:transform 0.12s,opacity 0.12s;-webkit-tap-highlight-color:transparent;text-decoration:none}
.btn:active{transform:scale(0.96)}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;box-shadow:0 0 24px #7c3aed40;min-height:44px;-webkit-appearance:none}
.btn-secondary{background:transparent;color:var(--muted);border:1px solid #334155}
.btn-green{background:linear-gradient(135deg,#059669,#0891b2);color:#fff}
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px 18px;margin-bottom:10px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:10px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.section-label{font-size:10.5px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:var(--dim);margin-bottom:10px;margin-top:24px}
.hz-badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:800;letter-spacing:0.03em}
.filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.filter-btn{padding:6px 14px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid #334155;background:transparent;color:#94a3b8;transition:all 0.18s;touch-action:manipulation;white-space:nowrap}
.filter-btn.active{background:linear-gradient(135deg,#7c3aed40,#a78bfa20);border-color:#a78bfa80;color:#e2d9ff}
.player-box{background:linear-gradient(160deg,#0d0520 0%,#0c1a2e 50%,#0a0f1e 100%);border:1.5px solid transparent;border-radius:24px;padding:24px 18px 20px;margin-bottom:20px;text-align:center;position:relative}
.player-hz{font-size:clamp(38px,10vw,68px);font-weight:900;background:linear-gradient(135deg,#fbbf24 0%,#f472b6 40%,#a78bfa 80%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px;line-height:1;margin-bottom:4px}
.affirmation{font-style:italic;font-size:13.5px;color:#e2d9ff;padding:12px 16px;background:linear-gradient(135deg,#7c3aed18,#a78bfa08);border-radius:12px;border:1px solid #a78bfa35;margin-top:14px;line-height:1.6}
.progress-bar{height:6px;background:#1e293b;border-radius:4px;margin:14px 0 6px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,#7c3aed,#a78bfa,#f472b6,#fb923c);border-radius:4px;width:0%}
.nature-btn{padding:10px 20px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid #22543d;background:linear-gradient(135deg,#052e1640,#0a3320);color:#86efac;touch-action:manipulation}
.nature-btn.active{border-color:#34d39970;background:#10b98118;color:#34d399}
.track-card{background:linear-gradient(135deg,#0f172a,#0d1117);border:1px solid #1e293b;border-radius:16px;padding:14px 16px;cursor:pointer;margin-bottom:8px;touch-action:manipulation}
.track-card.sel{border-color:#a78bfa80;background:#a78bfa0a}
.play-mini{width:40px;height:40px;border-radius:50%;border:1px solid #7c3aed50;background:linear-gradient(135deg,#7c3aed18,#a78bfa0a);color:#a78bfa;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;touch-action:manipulation}
.love-btn{width:154px;height:154px;border-radius:50%;border:none;cursor:pointer;background:radial-gradient(circle at 40% 40%,#be185d,#7c3aed);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;margin:0 auto;box-shadow:0 0 50px #be185d50;font-weight:800;font-size:13px;text-align:center;padding:16px}
.love-btn.active{animation:lp 1.8s ease-in-out infinite}
@keyframes lp{0%,100%{box-shadow:0 0 50px #be185d50}50%{box-shadow:0 0 90px #be185d90}}
.vortex-ring{width:170px;height:170px;border-radius:50%;border:2px solid #a78bfa40;margin:0 auto;display:flex;align-items:center;justify-content:center}
.vortex-ring.active{animation:vs 3s linear infinite;box-shadow:0 0 50px #a78bfa50}
@keyframes vs{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.angel-card{border-radius:14px;padding:14px;border:1px solid;text-align:center;cursor:pointer}
.ritual-card{border-radius:14px;overflow:hidden;margin-bottom:10px;border:1px solid}
.ritual-header{padding:16px;cursor:pointer;width:100%;background:transparent;border:none;color:var(--text);text-align:left}
.ritual-body{padding:0 16px 16px;display:none}
.ritual-body.open{display:block}
.ritual-step{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #0f172a}
.ritual-step:last-child{border-bottom:none}
.step-dot{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0;color:#fff}
.mood-btn{padding:5px 12px;border-radius:999px;font-size:11px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer}
.mood-btn.sel{border-color:#ffffff50;background:#ffffff18;color:#fff}
input,textarea{background:#0f172a;border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-size:13px;width:100%;outline:none;font-family:inherit}
textarea{resize:none}
.guide-card{border-radius:14px;padding:18px;border:1px solid;margin-bottom:10px;cursor:pointer}
.guide-body{display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:13px;color:var(--muted);line-height:1.8}
.guide-body.open{display:block}
.stars{position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:0;overflow:hidden}
.star{position:absolute;border-radius:50%;background:#fff;animation:twinkle var(--d) ease-in-out infinite var(--delay)}
@keyframes twinkle{0%,100%{opacity:0.1}50%{opacity:var(--op)}}
.wave-btn{padding:7px 16px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid #334155;background:transparent;color:#94a3b8;touch-action:manipulation}
.wave-btn.active{background:linear-gradient(135deg,#7c3aed30,#a78bfa20);border-color:#a78bfa80;color:#c4b5fd}
.price-card{border-radius:20px;padding:24px 20px;border:1.5px solid;text-align:center;position:relative}
.price-card.popular{border-color:#a78bfa !important;box-shadow:0 0 40px #a78bfa30}
.popular-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;font-size:10px;font-weight:800;padding:4px 14px;border-radius:999px;white-space:nowrap}
.price-amount{font-size:48px;font-weight:900;line-height:1;margin:12px 0 2px}
.price-period{font-size:12px;color:var(--muted);margin-bottom:16px}
.price-feat{font-size:12.5px;color:var(--muted);text-align:left;margin-bottom:6px;padding-left:4px}
.price-feat::before{content:"✓ ";color:#34d399;font-weight:800}
.btn-upgrade{width:100%;padding:13px;border-radius:999px;font-weight:800;font-size:14px;cursor:pointer;border:none;margin-top:16px;touch-action:manipulation}
.modal-overlay{display:none;position:fixed;inset:0;background:#00000088;z-index:1000;align-items:center;justify-content:center;padding:20px}
.modal-overlay.open{display:flex}
.modal-box{background:#0f172a;border:1.5px solid #a78bfa50;border-radius:24px;padding:28px 24px;max-width:400px;width:100%;text-align:center;position:relative;max-height:90vh;overflow-y:auto}
.modal-close{position:absolute;top:14px;right:16px;background:transparent;border:none;color:var(--muted);font-size:22px;cursor:pointer}
.gate-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;background:#fbbf2415;color:#fbbf24;border:1px solid #fbbf2430;margin-left:8px}
.email-capture{background:linear-gradient(135deg,#0d0520,#0c1a2e);border:1px solid #a78bfa30;border-radius:16px;padding:20px;margin:20px 0;text-align:center}
.email-input{width:100%;padding:12px 16px;border-radius:999px;border:1px solid #334155;background:#0f172a;color:#e2e8f0;font-size:14px;margin:10px 0;outline:none}
</style>
</head>
<body style="touch-action:pan-y;-webkit-text-size-adjust:100%;">
<div class="stars" id="starsContainer"></div>
<nav>
  <div class="nav-inner">
    <div class="nav-logo">✦ Sacred Frequencies</div>
    <div class="nav-tabs">
      <button class="tab active" data-page="home" onclick="go('home')">🏠 Home</button>
      <button class="tab" data-page="player" onclick="go('player')">🎵 Player</button>
      <button class="tab" data-page="angels" onclick="gateGo('angels','healer')">👼 Angels <span class="gate-badge">💜</span></button>
      <button class="tab" data-page="love" onclick="gateGo('love','healer')">💗 Love <span class="gate-badge">💜</span></button>
      <button class="tab" data-page="vortex" onclick="gateGo('vortex','ascended')">🌀 Vortex <span class="gate-badge">✨</span></button>
      <button class="tab" data-page="nature" onclick="gateGo('nature','healer')">🌿 Nature <span class="gate-badge">💜</span></button>
      <button class="tab" data-page="growth" onclick="gateGo('growth','healer')">🌱 Growth <span class="gate-badge">💜</span></button>
      <button class="tab" data-page="rituals" onclick="gateGo('rituals','healer')">🔮 Rituals <span class="gate-badge">💜</span></button>
      <button class="tab" data-page="journal" onclick="go('journal')">📓 Journal</button>
      <button class="tab" data-page="guide" onclick="go('guide')">📖 Guide</button>
      <button class="tab" data-page="protocol" onclick="gateGo('protocol','ascended')">⚡ Protocol <span class="gate-badge">✨</span></button>
      <button class="tab" data-page="pricing" onclick="go('pricing')" style="color:#fbbf24">💎 Plans</button>
    </div>
  </div>
</nav>
<div class="page active" id="page-home">
  <div class="hero">
    <div class="hero-badge">✦ Sacred Frequencies · Complete Healing App</div>
    <h1 class="grad-main">Heal. Align. Ascend.</h1>
    <p class="sub" style="margin-bottom:22px">40 sacred frequencies · Epigenetic Love · 9-Ether Protocol · Angel Numbers · Quantum Vortex · Healing Journal. Your complete sonic healing toolkit — works on any device.</p>
    <button class="btn btn-primary" onclick="go('player')" style="font-size:15px;padding:14px 32px;">▶ Start Healing Now</button>
  </div>
  <div class="grid3" style="margin-bottom:12px">
    <div class="card" style="text-align:center;cursor:pointer;border-color:#fbbf2430" onclick="go('player')"><div style="font-size:26px;margin-bottom:6px">🎵</div><div style="font-weight:800;color:#fbbf24;font-size:14px">40 Frequencies</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#34d39930" onclick="go('nature')"><div style="font-size:26px;margin-bottom:6px">🌿</div><div style="font-weight:800;color:#34d399;font-size:14px">Nature Portal</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#a78bfa30" onclick="go('protocol')"><div style="font-size:26px;margin-bottom:6px">⚡</div><div style="font-weight:800;color:#a78bfa;font-size:14px">9-Ether Protocol</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#fb718530" onclick="go('love')"><div style="font-size:26px;margin-bottom:6px">💗</div><div style="font-weight:800;color:#fb7185;font-size:14px">Epigenetic Love</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#7c3aed30" onclick="go('vortex')"><div style="font-size:26px;margin-bottom:6px">🌀</div><div style="font-weight:800;color:#a78bfa;font-size:14px">Quantum Vortex</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#fbbf2430" onclick="go('angels')"><div style="font-size:26px;margin-bottom:6px">👼</div><div style="font-weight:800;color:#fbbf24;font-size:14px">Angel Numbers</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#22c55e30" onclick="go('growth')"><div style="font-size:26px;margin-bottom:6px">🌱</div><div style="font-weight:800;color:#22c55e;font-size:14px">Growth Sound</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#2dd4bf30" onclick="go('rituals')"><div style="font-size:26px;margin-bottom:6px">🔮</div><div style="font-weight:800;color:#2dd4bf;font-size:14px">Healing Rituals</div></div>
    <div class="card" style="text-align:center;cursor:pointer;border-color:#60a5fa30" onclick="go('journal')"><div style="font-size:26px;margin-bottom:6px">📓</div><div style="font-weight:800;color:#60a5fa;font-size:14px">Healing Journal</div></div>
  </div>
  <div class="card" style="text-align:center;margin-top:4px">
  <div style="background:linear-gradient(135deg,#0d0520,#0c1a2e);border:1px solid #a78bfa30;border-radius:16px;padding:20px;margin:16px 0;text-align:center">
    <div style="font-size:13px;color:var(--muted);margin-bottom:10px">Unlock the full healing experience</div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="showUpgrade('healer')" style="font-size:12px;padding:10px 20px">💜 Healer — £11/mo</button>
      <button class="btn" onclick="showUpgrade('ascended')" style="font-size:12px;padding:10px 20px;background:linear-gradient(135deg,#92400e,#fbbf24);color:#fff">✨ Ascended — £33/mo</button>
    </div>
  </div>
  <div class="email-capture" id="emailCapture">
    <div style="font-size:20px;margin-bottom:6px">✨</div>
    <div style="font-weight:800;font-size:15px;margin-bottom:4px">Join the Sacred Circle</div>
    <div style="font-size:12px;color:var(--muted);margin-bottom:8px">Get your free Healing Frequency Guide + weekly sacred transmissions</div>
    <input class="email-input" id="emailInput" type="email" placeholder="Your email address" />
    <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:4px" onclick="submitEmail()">🌿 Send My Free Guide</button>
    <div id="emailMsg" style="font-size:12px;color:#34d399;margin-top:8px;display:none">💚 You are in the Sacred Circle! Check your inbox.</div>
  </div>
  <div style="font-size:11px;color:var(--dim)">🔒 Universal Safety Promise · 528 Hz love carrier + 7.83 Hz Schumann anchor · Safe for all ages and animals</div></div>
</div>
<div class="page" id="page-player">
  <h1 class="grad-amber" style="margin-bottom:6px">🎵 Frequency Player</h1>
  <p class="sub" style="margin-bottom:18px;text-align:left">Use headphones for binaural effect · Set your intention · Tap a track then press Play</p>
  <div id="iosHint" style="background:#a78bfa15;border:1px solid #a78bfa40;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#c4b5fd;text-align:center">📱 <strong>Tip:</strong> Silent switch OFF · Volume up · Tap a track, then tap ▶ Play</div>
  <div class="player-box">
    <div id="pName" style="text-transform:uppercase;font-size:11px;color:#64748b;margin-bottom:6px;font-weight:700">✦ Select a frequency below ✦</div>
    <div class="player-hz" id="pHz">—</div>
    <div style="font-size:13px;color:#94a3b8;margin:-4px 0 2px" id="pHzLabel">Hz</div>
    <div id="pBenefit" style="font-size:13px;color:#94a3b8;margin:6px 0 10px;min-height:18px"></div>
    <canvas id="vizCanvas" height="48" style="width:100%;display:block"></canvas>
    <div class="progress-bar"><div class="progress-fill" id="pBar"></div></div>
    <div id="pTimer" style="font-size:11px;color:#475569;margin-bottom:12px">0:00</div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;align-items:center">
      <button class="btn btn-primary" id="playBtn" onclick="playerToggle()" style="min-width:150px;min-height:54px;font-size:18px;border-radius:30px;">▶ Play</button>
      <button class="nature-btn" id="natBtn" onclick="playerNature()" style="min-height:48px;">🌿 Nature</button>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin:0 0 14px;padding:0 6px">
      <span style="font-size:15px">🔊</span>
      <input type="range" id="volSlider" min="1" max="100" value="70" oninput="setVol(this.value)" style="flex:1">
      <span id="volLabel" style="font-size:12px;color:#64748b;min-width:34px;text-align:right">70%</span>
    </div>
    <div class="affirmation" id="pAff" style="display:none"></div>
    <div style="display:flex;gap:6px;justify-content:center;margin-top:16px;flex-wrap:wrap">
      <button class="wave-btn active" id="wSine" onclick="setWave('sine',this)">Sine</button>
      <button class="wave-btn" id="wTri" onclick="setWave('triangle',this)">Triangle</button>
      <button class="wave-btn" id="wSaw" onclick="setWave('sawtooth',this)">Sawtooth</button>
      <button class="wave-btn" id="wSq" onclick="setWave('square',this)">Square</button>
    </div>
  </div>
  <div class="filter-row" id="catFilter">
    <button class="filter-btn active" onclick="filterCat('All',this)">All</button>
    <button class="filter-btn" onclick="filterCat('Body',this)">🧬 Body</button>
    <button class="filter-btn" onclick="filterCat('Mind',this)">🧠 Mind</button>
    <button class="filter-btn" onclick="filterCat('Spirit',this)">✨ Spirit</button>
    <button class="filter-btn" onclick="filterCat('Wealth',this)">💛 Wealth</button>
    <button class="filter-btn" onclick="filterCat('Love',this)">💗 Love</button>
    <button class="filter-btn" onclick="filterCat('Nature',this)">🌿 Nature</button>
    <button class="filter-btn" onclick="filterCat('Cleansing',this)">🔮 Cleanse</button>
  </div>
  <div id="trackList"></div>
</div>
<div class="page" id="page-angels">
  <h1 class="grad-amber" style="margin-bottom:6px">👼 Angel Number Frequencies</h1>
  <p class="sub" style="text-align:left;margin-bottom:18px">Each angel number carries a divine message. Tap to activate its sacred tone.</p>
  <div id="angelGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px"></div>
</div>
<div class="page" id="page-love">
  <h1 class="grad-rose" style="margin-bottom:6px">💗 Epigenetic Love Protocol</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">A 6-stage DNA repair journey using love-based frequencies to restore heart coherence.</p>
  <div style="text-align:center;margin-bottom:24px">
    <button class="love-btn" id="loveBigBtn" onclick="loveFieldToggle()">
      <div style="font-size:30px">💗</div>
      <div id="loveBigTxt">Activate Love Field</div>
      <div style="font-size:10px;opacity:0.7">All 6 dimensions</div>
    </button>
  </div>
  <div class="section-label">6-Stage Journey — Tap a Stage to Activate</div>
  <div id="loveStages"></div>
</div>
<div class="page" id="page-vortex">
  <h1 class="grad-violet" style="margin-bottom:6px">🌀 Quantum Healing Vortex</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">9-ether quantum healing targeting cellular, spiritual, and dimensional levels simultaneously.</p>
  <div style="text-align:center;margin-bottom:22px">
    <div class="vortex-ring" id="vortexRing"><div style="font-size:36px">🌀</div></div>
    <div id="vortexSt" style="font-size:12px;color:var(--dim);margin:10px 0">Activate to begin</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" id="vortexBtn" onclick="vortexToggle()">⚡ Activate Vortex</button>
    </div>
  </div>
  <div class="section-label">Frequency Architecture</div>
  <div class="grid2">
    <div class="card" style="border-color:#ef444430"><div style="font-weight:700;color:#fca5a5;margin-bottom:6px;font-size:13px">🔴 Physical + Cellular</div><div style="font-size:12px;color:var(--dim)">174 · 333 · 40 Hz gamma</div></div>
    <div class="card" style="border-color:#a78bfa30"><div style="font-weight:700;color:#c4b5fd;margin-bottom:6px;font-size:13px">💜 Etheric + Mental</div><div style="font-size:12px;color:var(--dim)">396 · 417 · 741 · 852 Hz</div></div>
    <div class="card" style="border-color:#fbbf2430"><div style="font-weight:700;color:#fde68a;margin-bottom:6px;font-size:13px">☀️ Supreme Tiers</div><div style="font-size:12px;color:var(--dim)">1,296 · 2,160 · 3,168 Hz</div></div>
    <div class="card" style="border-color:#34d39930"><div style="font-weight:700;color:#86efac;margin-bottom:6px;font-size:13px">🛡️ Safety Anchors</div><div style="font-size:12px;color:var(--dim)">528 Hz + 7.83 Hz</div></div>
  </div>
</div>
<div class="page" id="page-nature">
  <h1 class="grad-green" style="margin-bottom:6px">🌿 Nature & Ether Portal</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">6 immersive soundscapes — each paired with a sacred healing frequency.</p>
  <div class="section-label">Soundscapes — Tap to Activate</div>
  <div class="grid2" id="natureGrid"></div>
  <div class="section-label" style="margin-top:20px">Primal Frequencies</div>
  <div id="primalGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px"></div>
</div>
<div class="page" id="page-growth">
  <h1 class="grad-green" style="margin-bottom:6px">🌱 Growth Sound Architecture</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">6 growth dimensions + an 8-step Master Ascension Sequence.</p>
  <div style="text-align:center;margin-bottom:22px">
    <button class="btn btn-green" id="masterBtn" onclick="growthMasterSeq()">🌱 Start Master Sequence</button>
  </div>
  <div class="section-label">Growth Dimensions — Tap to Activate Each Layer</div>
  <div id="growthGrid"></div>
  <div class="section-label">Master Sequence Steps</div>
  <div id="masterSteps"></div>
</div>
<div class="page" id="page-rituals">
  <h1 class="grad-teal" style="margin-bottom:6px">🔮 Healing Rituals</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">6 complete frequency protocols. Tap a ritual to expand and activate.</p>
  <div id="ritualList"></div>
</div>
<div class="page" id="page-journal">
  <h1 class="grad-violet" style="margin-bottom:6px">📓 Healing Journal</h1>
  <p class="sub" style="text-align:left;margin-bottom:18px">Track your transformation. Your healing journey is sacred data.</p>
  <div class="grid3" style="margin-bottom:16px">
    <div class="card" style="text-align:center"><div style="font-size:24px;margin-bottom:4px">🧘</div><div style="font-size:20px;font-weight:900" id="jStatSessions">0</div><div style="font-size:11px;color:var(--dim)">Total Sessions</div></div>
    <div class="card" style="text-align:center"><div style="font-size:24px;margin-bottom:4px">⭐</div><div style="font-size:20px;font-weight:900" id="jStatRating">—</div><div style="font-size:11px;color:var(--dim)">Avg. Rating</div></div>
    <div class="card" style="text-align:center"><div style="font-size:24px;margin-bottom:4px">🌟</div><div style="font-size:20px;font-weight:900" id="jStatTrans">0</div><div style="font-size:11px;color:var(--dim)">Transformations</div></div>
  </div>
  <div class="card">
    <div class="section-label" style="margin-top:0">New Entry</div>
    <div style="margin-bottom:10px"><input id="jTitle" type="text" placeholder="Session title (e.g. Morning Activation)"/></div>
    <div style="margin-bottom:10px"><input id="jIntention" type="text" placeholder="Your intention for this session"/></div>
    <div style="font-size:11px;color:var(--dim);margin-bottom:6px">Mood Before</div>
    <div id="moodBefore" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px"></div>
    <div style="font-size:11px;color:var(--dim);margin-bottom:6px">Mood After</div>
    <div id="moodAfter" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px"></div>
    <div style="margin-bottom:10px"><textarea id="jNotes" rows="3" placeholder="Notes, insights, or reflections..."></textarea></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="saveJournal()">💾 Save Entry</button>
  </div>
  <div class="section-label">Your Entries</div>
  <div id="jList"></div>
</div>
<div class="page" id="page-guide">
  <h1 class="grad-violet" style="margin-bottom:6px">📖 Frequency Science Guide</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">The science and sacred knowledge behind healing frequencies. Tap any topic to expand.</p>
  <div id="guideList"></div>
  <div class="section-label">Full Frequency Reference</div>
  <div id="freqRef"></div>

  <div class="section-label" style="margin-top:24px">About Sacred Frequencies</div>
  <div class="card" style="border-color:#a78bfa30;background:linear-gradient(135deg,#7c3aed08,#0f172a)">
    <div style="font-weight:800;color:#a78bfa;margin-bottom:8px;font-size:13px">✦ Our Purpose</div>
    <div style="font-size:12.5px;color:#94a3b8;line-height:1.75">Sacred Frequencies exists to make frequency-based sound healing — solfeggio tones, Schumann resonance, binaural entrainment, and sacred geometry — accessible to everyone seeking balance, clarity, and a deeper connection to themselves, each other, and the Earth.</div>
  </div>
  <div class="card" style="border-color:#34d39930">
    <div style="font-weight:800;color:#34d399;margin-bottom:8px;font-size:13px">✦ Benefits</div>
    <ul style="list-style:none;padding:0;margin:0">
      <li style="font-size:12.5px;color:#94a3b8;line-height:2;padding-left:18px;position:relative"><span style="position:absolute;left:0;color:#34d399">✓</span> Supports relaxation, stress relief, and nervous system regulation</li>
      <li style="font-size:12.5px;color:#94a3b8;line-height:2;padding-left:18px;position:relative"><span style="position:absolute;left:0;color:#34d399">✓</span> Encourages mindful presence and emotional balance</li>
      <li style="font-size:12.5px;color:#94a3b8;line-height:2;padding-left:18px;position:relative"><span style="position:absolute;left:0;color:#34d399">✓</span> Aids restful sleep and deep meditative states</li>
      <li style="font-size:12.5px;color:#94a3b8;line-height:2;padding-left:18px;position:relative"><span style="position:absolute;left:0;color:#34d399">✓</span> Enhances focus, heart coherence, and spiritual connection</li>
      <li style="font-size:12.5px;color:#94a3b8;line-height:2;padding-left:18px;position:relative"><span style="position:absolute;left:0;color:#34d399">✓</span> Layers nature ambience (rainforest, ocean) for grounding and calm</li>
    </ul>
  </div>
  <div class="card" style="border-color:#f59e0b30;background:#f59e0b06">
    <div style="font-weight:800;color:#fbbf24;margin-bottom:8px;font-size:13px">⚠ Disclaimer</div>
    <div style="font-size:11.5px;color:#64748b;line-height:1.75">Sacred Frequencies is intended for relaxation, meditation, and general wellness purposes only. It is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease or medical condition. This content is not a substitute for professional medical advice, diagnosis, or treatment — always consult a qualified healthcare provider regarding any physical or mental health concerns. Individual experiences and results may vary. If you are pregnant, have epilepsy, a pacemaker or other implanted device, or any condition affected by sound or light stimulation, consult your doctor before use. Discontinue use if you experience discomfort.</div>
  </div>
  <div style="text-align:center;font-size:10.5px;color:#334155;margin:20px 0 8px">© 2026 Sacred Frequencies · All Rights Reserved</div>
</div>
<div class="page" id="page-protocol">
  <h1 class="grad-main" style="margin-bottom:6px">⚡ 9-Ether Irradiation Protocol</h1>
  <p class="sub" style="text-align:left;margin-bottom:20px">Supreme Resonance + Full Lunar Balance · 9 etheric dimensions.</p>
  <div class="card" style="text-align:center;border-color:#7c3aed50;margin-bottom:18px">
    <div style="font-size:13px;color:#a78bfa;font-weight:800;margin-bottom:8px">✦ Full Protocol — Print / Download Available</div>
    <a href="https://superagent-1dadce0f.base44.app/functions/serveProtocol" target="_blank" class="btn btn-primary" style="text-decoration:none">⚡ Open Full Protocol</a>
  </div>
  <div class="section-label">The 9 Ethers</div>
  <div id="protEthers"></div>
  <div class="section-label">Lunar Resonance</div>
  <div id="protLunar" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px"></div>
</div>
<div class="page" id="page-pricing">
  <div class="hero" style="padding-bottom:12px">
    <div class="hero-badge">💎 Sacred Frequencies · Plans</div>
    <h1 style="font-size:clamp(22px,5vw,36px);font-weight:900;margin-bottom:8px"><span class="grad-gold">Choose Your</span> <span class="grad-violet">Healing Path</span></h1>
    <p class="sub">All plans include the Universal Safety Promise — 528 Hz + 7.83 Hz anchors in every frequency</p>
  </div>
  <div class="grid3" style="margin-bottom:24px;align-items:start">
    <div class="price-card" style="border-color:#334155;background:var(--card)">
      <div style="font-size:28px;margin-bottom:6px">🌱</div>
      <div style="font-weight:900;font-size:18px;color:#e2e8f0">Free</div>
      <div class="price-amount grad-main">£0</div>
      <div class="price-period">forever</div>
      <div class="price-feat">40 Frequency Tracks</div>
      <div class="price-feat">Healing Journal</div>
      <button class="btn-upgrade" style="background:#1e293b;color:#94a3b8" onclick="go('player')">Start Healing Free</button>
    </div>
    <div class="price-card popular" style="background:linear-gradient(160deg,#0d0520,#0c1a2e)">
      <div class="popular-badge">⭐ MOST POPULAR</div>
      <div style="font-size:28px;margin-bottom:6px">💜</div>
      <div style="font-weight:900;font-size:18px;color:#a78bfa">Healer</div>
      <div class="price-amount grad-violet">£11</div>
      <div class="price-period">per month</div>
      <div class="price-feat">Everything in Free</div>
      <div class="price-feat">Angel Numbers, Nature Portal, Epigenetic Love, Growth, Rituals</div>
      <button class="btn-upgrade" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff" onclick="showUpgrade('healer')">✦ Activate Healer</button>
    </div>
    <div class="price-card" style="border-color:#fbbf2440;background:linear-gradient(160deg,#0f0a00,#1a1000)">
      <div style="font-size:28px;margin-bottom:6px">✨</div>
      <div style="font-weight:900;font-size:18px;color:#fbbf24">Ascended</div>
      <div class="price-amount grad-amber">£33</div>
      <div class="price-period">per month</div>
      <div class="price-feat">Everything in Healer</div>
      <div class="price-feat">9-Ether Protocol, Quantum Vortex, Lunar Engine</div>
      <button class="btn-upgrade" style="background:linear-gradient(135deg,#92400e,#fbbf24);color:#fff" onclick="showUpgrade('ascended')">⚡ Ascend Now</button>
    </div>
  </div>
</div>
<div class="modal-overlay" id="upgradeModal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div id="modalContent"></div>
  </div>
</div>
<script>
const TRACKS=[
{n:"111 Hz — Angel Number New Beginnings",hz:111,cat:"Spirit",ben:"Awakens manifestation power",ch:"Crown",aff:"I am aligned with divine timing."},
{n:"222 Hz — Angel Number Balance",hz:222,cat:"Love",ben:"Restores balance and harmony",ch:"Heart",aff:"Everything is in divine balance."},
{n:"333 Hz — Angel Number Ascended Masters",hz:333,cat:"Spirit",ben:"Connects with ascended masters",ch:"Throat & Crown",aff:"I am surrounded by divine masters."},
{n:"444 Hz — Angel Number Protection",hz:444,cat:"Body",ben:"Builds unshakeable foundations",ch:"Root",aff:"I am divinely protected."},
{n:"555 Hz — Angel Number Transformation",hz:555,cat:"Cleansing",ben:"Accelerates positive change",ch:"Solar Plexus",aff:"I welcome transformation."},
{n:"666 Hz — Angel Number Rebalance",hz:666,cat:"Mind",ben:"Rebalances overthinking",ch:"Heart",aff:"My mind and heart are in harmony."},
{n:"777 Hz — Angel Number Divine Luck",hz:777,cat:"Spirit",ben:"Activates divine luck",ch:"Crown",aff:"I walk the sacred path."},
{n:"888 Hz — Angel Number Infinite Abundance",hz:888,cat:"Wealth",ben:"Opens infinite financial abundance",ch:"Solar Plexus",aff:"I am an infinite channel for abundance."},
{n:"999 Hz — Angel Number Completion",hz:999,cat:"Cleansing",ben:"Completes karmic cycles",ch:"All Chakras",aff:"I complete all karmic cycles with grace."},
{n:"1111 Hz — Manifestation Portal",hz:1111,cat:"Spirit",ben:"Opens the manifestation portal",ch:"Crown",aff:"The portal is open."},
{n:"1212 Hz — Spiritual Growth",hz:1212,cat:"Spirit",ben:"Accelerates spiritual growth",ch:"Crown",aff:"I am rapidly evolving."},
{n:"1234 Hz — Divine Progression",hz:1234,cat:"Mind",ben:"Aligns life steps with divine order",ch:"Solar Plexus",aff:"I trust the divine steps of my journey."},
{n:"2222 Hz — Master Builder",hz:2222,cat:"Wealth",ben:"Activates the master builder frequency",ch:"Root & Crown",aff:"I am a master builder."},
{n:"3333 Hz — Trinity Activation",hz:3333,cat:"Spirit",ben:"Activates body, mind, spirit",ch:"All Chakras",aff:"Body, mind and spirit are unified."},
{n:"4444 Hz — Celestial Fortress",hz:4000,lbl:"4444 Hz",cat:"Body",ben:"Maximum divine protection",ch:"Root",aff:"I am fully protected on all levels."},
{n:"5555 Hz — Mass Transformation",hz:4000,lbl:"5555 Hz",cat:"Cleansing",ben:"Quantum leap frequency",ch:"All Chakras",aff:"I quantum leap into my highest timeline."},
{n:"6666 Hz — Unconditional Love Field",hz:4000,lbl:"6666 Hz",cat:"Love",ben:"Generates unconditional love",ch:"Heart",aff:"I radiate unconditional love."},
{n:"7777 Hz — Supreme Sacred Luck",hz:4000,lbl:"7777 Hz",cat:"Wealth",ben:"Maximum divine luck",ch:"All Chakras",aff:"I am divinely lucky."},
{n:"8888 Hz — Infinite Financial Mastery",hz:4000,lbl:"8888 Hz",cat:"Wealth",ben:"Opens all financial channels",ch:"All Chakras",aff:"I am an infinite magnet for wealth."},
{n:"9999 Hz — Divine Completion",hz:4000,lbl:"9999 Hz",cat:"Spirit",ben:"Complete spiritual ascension",ch:"Soul Star",aff:"I ascend into pure light."},
{n:"174 Hz — Pain Relief",hz:174,cat:"Body",ben:"Natural anesthetic",ch:"Earth Star",aff:"I am safe. My body heals naturally."},
{n:"285 Hz — Tissue Regeneration",hz:285,cat:"Body",ben:"Heals and regenerates tissues",ch:"Root",aff:"Every cell in my body regenerates."},
{n:"396 Hz — Liberation from Fear",hz:396,cat:"Cleansing",ben:"Releases fear, guilt, and grief",ch:"Root",aff:"I release all guilt and fear."},
{n:"417 Hz — Transmutation",hz:417,cat:"Cleansing",ben:"Undoes situations, facilitates change",ch:"Sacral",aff:"I embrace change."},
{n:"432 Hz — Nature's Tuning",hz:432,cat:"Nature",ben:"Aligns with natural resonance",ch:"Heart",aff:"I am in perfect harmony with nature."},
{n:"528 Hz — DNA Repair",hz:528,cat:"Body",ben:"Repairs DNA, increases life energy",ch:"Solar Plexus",aff:"My DNA heals perfectly."},
{n:"639 Hz — Relationships",hz:639,cat:"Love",ben:"Harmonizes relationships",ch:"Heart",aff:"Love flows freely through me."},
{n:"741 Hz — Detox & Awakening",hz:741,cat:"Cleansing",ben:"Cleanses cells, detoxifies body",ch:"Throat",aff:"I release all toxins."},
{n:"852 Hz — Spiritual Order",hz:852,cat:"Spirit",ben:"Returns to spiritual order",ch:"Third Eye",aff:"My inner vision is clear."},
{n:"963 Hz — Crown Activation",hz:963,cat:"Spirit",ben:"Activates the pineal gland",ch:"Crown",aff:"I am one with the divine."},
{n:"40 Hz — Gamma Brain",hz:40,cat:"Mind",ben:"Enhances cognitive function",ch:"Crown",aff:"My mind is sharp and clear."},
{n:"7.83 Hz — Schumann Resonance",hz:7.83,cat:"Nature",ben:"Aligns with Earth's frequency",ch:"Root & Heart",aff:"I am grounded in the Earth."},
{n:"10 Hz — Alpha Relaxation",hz:10,cat:"Mind",ben:"Deep relaxation, stress reduction",ch:"Third Eye",aff:"I am deeply relaxed."},
{n:"528 Hz + 432 Hz Blend",hz:528,cat:"Love",ben:"Supreme healing blend",ch:"Heart & Crown",aff:"I am love. I heal completely."},
{n:"888 Hz — Abundance Activation",hz:888,cat:"Wealth",ben:"Activates abundance mindset",ch:"Solar Plexus",aff:"Abundance flows to me easily."},
{n:"111 Hz — Cellular Regeneration",hz:111,cat:"Body",ben:"Activates cellular regeneration",ch:"Crown & Heart",aff:"I am light. Every cell radiates health."},
{n:"432 Hz — Deep Sleep Reset",hz:432,cat:"Mind",ben:"Induces deep restorative sleep",ch:"All Chakras",aff:"I release the day with gratitude."},
{n:"528 Hz — Self Love",hz:528,cat:"Love",ben:"Cultivates deep self-love",ch:"Heart",aff:"I am worthy of all good things."},
{n:"963 Hz — Pineal Activation",hz:963,cat:"Spirit",ben:"Activates the pineal gland",ch:"Third Eye & Crown",aff:"My third eye opens fully."},
{n:"741 Hz — Electromagnetic Protection",hz:741,cat:"Cleansing",ben:"Shields from EMF",ch:"Throat",aff:"I am protected from harmful frequencies."}
];
const CC={Body:"#ef4444",Mind:"#60a5fa",Spirit:"#a78bfa",Wealth:"#fbbf24",Nature:"#34d399",Love:"#f472b6",Cleansing:"#2dd4bf"};
const LOVE_STAGES=[
{name:"Self Love",hz:[528,174],icon:"💝",desc:"DNA repair + pain release.",col:"#fb7185"},
{name:"Cellular Love",hz:[285,528],icon:"🧬",desc:"Tissue regeneration + DNA repair.",col:"#f472b6"},
{name:"Heart Coherence",hz:[639],icon:"💗",desc:"Activate your heart's toroidal field.",col:"#ec4899"},
{name:"Ancestral Love",hz:[417,396],icon:"🌳",desc:"Clear ancestral trauma.",col:"#a78bfa"},
{name:"Divine Love",hz:[963,528],icon:"✨",desc:"Universal love through pineal activation.",col:"#8b5cf6"},
{name:"Universal Love",hz:[963,7.83],icon:"🌍",desc:"Merge with the love frequency of all creation.",col:"#7c3aed"}
];
const NATURE_SCENES=[
{name:"Amazon Rainforest",icon:"🌳",desc:"Brown noise forest base with bird calls and rain.",hz:432,col:"#22c55e"},
{name:"Sacred Ocean",icon:"🌊",desc:"Deep ocean waves with sea breeze overtones.",hz:7.83,col:"#06b6d4"},
{name:"Earth's Heartbeat",icon:"🌍",desc:"Pure 7.83 Hz Schumann resonance.",hz:7.83,col:"#f59e0b"},
{name:"The Ether",icon:"✦",desc:"432 Hz crystal bowls with 963 Hz cosmic shimmer.",hz:432,col:"#a78bfa"},
{name:"Sacred Fire",icon:"🔥",desc:"Primal fire crackle with 417 Hz transformation tone.",hz:417,col:"#ef4444"},
{name:"Cosmic Void",icon:"🌌",desc:"Deep space drone and pulsar rhythms.",hz:963,col:"#818cf8"}
];
const PRIMAL_FREQS=[
{hz:40,name:"Gamma Activation",desc:"Neural synchrony",col:"#f472b6"},
{hz:7.83,name:"Schumann Resonance",desc:"Earth's heartbeat",col:"#34d399"},
{hz:1,name:"Delta Deep Healing",desc:"Deep sleep",col:"#60a5fa"},
{hz:4,name:"Theta Gateway",desc:"Waking/sleep threshold",col:"#a78bfa"},
{hz:10,name:"Alpha Calm",desc:"Relaxed awareness",col:"#fbbf24"},
{hz:20,name:"Beta Focus",desc:"Active thinking",col:"#fb923c"}
];
const GROWTH_LAYERS=[
{name:"Physical Growth",icon:"🧬",col:"#ef4444",hz:285,desc:"285 Hz tissue regeneration",aff:"I am rebuilding stronger with every breath",gh:[285,111,7.83]},
{name:"Mental Growth",icon:"🧠",col:"#60a5fa",hz:40,desc:"40 Hz gamma whole-brain coherence",aff:"My mind expands beyond all previous limits",gh:[40,14,10]},
{name:"Emotional Growth",icon:"💗",col:"#f472b6",hz:639,desc:"639 Hz heart harmony",aff:"I feel everything fully and beautifully",gh:[639,528,3.5]},
{name:"Spiritual Growth",icon:"✨",col:"#a78bfa",hz:963,desc:"963 Hz crown activation",aff:"I expand into infinite consciousness",gh:[963,852,7]},
{name:"Nature Alignment",icon:"🌿",col:"#34d399",hz:432,desc:"432 Hz universal tuning",aff:"I am one with the natural world",gh:[432,7.83]},
{name:"Abundance Growth",icon:"💎",col:"#fbbf24",hz:888,desc:"888 Hz infinite abundance",aff:"I grow into my greatest prosperity",gh:[888,417,4]}
];
const MASTER_SEQUENCE=[
{name:"Awaken",hz:285,desc:"Cells begin activating",col:"#ef4444"},
{name:"Open",hz:528,desc:"Heart and DNA unlock",col:"#f472b6"},
{name:"Expand",hz:639,desc:"Emotional field widens",col:"#f472b6"},
{name:"Rise",hz:432,desc:"Align with universal growth",col:"#34d399"},
{name:"Ignite",hz:40,desc:"Gamma whole brain coherence",col:"#60a5fa"},
{name:"Magnetise",hz:888,desc:"Abundance codes activate",col:"#fbbf24"},
{name:"Ascend",hz:963,desc:"Crown opens",col:"#a78bfa"},
{name:"Become",hz:1111,desc:"Manifestation portal",col:"#ffffff"}
];
const RITUALS=[
{title:"🌅 Morning Activation",sub:"Start each day fully aligned",dur:"45 min",col:"#fbbf24",freqs:[7.83,528,432,396,888],steps:[
{time:"5 min",freq:"7.83 Hz",name:"Grounding",desc:"Connect to Earth's pulse."},
{time:"10 min",freq:"528 Hz",name:"DNA Activation",desc:"Open your heart."},
{time:"10 min",freq:"432 Hz",name:"Nature Alignment",desc:"Let universal frequency attune your system."},
{time:"10 min",freq:"396 Hz",name:"Fear Release",desc:"Release what doesn't belong to today."},
{time:"10 min",freq:"888 Hz",name:"Wealth Activation",desc:"Visualize abundance flowing in."}
],ben:["Boosts cortisol balance","Sets abundance mindset","Clears overnight debris","Activates DNA repair"]},
{title:"🔮 Deep Energetic Cleanse",sub:"Remove all negativity from your field",dur:"60 min",col:"#2dd4bf",freqs:[396,417,741,528,963],steps:[
{time:"10 min",freq:"396 Hz",name:"Root Liberation",desc:"Scan for fear and guilt."},
{time:"15 min",freq:"417 Hz",name:"Trauma Transmutation",desc:"Transform, not suppress."},
{time:"10 min",freq:"741 Hz",name:"Cellular Detox",desc:"Visualize light purging toxins."},
{time:"15 min",freq:"528 Hz",name:"DNA Restoration",desc:"Fill with love and light."},
{time:"10 min",freq:"963 Hz",name:"Divine Reconnection",desc:"Reconnect with your highest self."}
],ben:["Eliminates ancestral patterns","Clears electromagnetic smog","Releases stored trauma","Resets your field"]},
{title:"🧬 Longevity & Body Healing",sub:"Activate your regenerative intelligence",dur:"75 min",col:"#ef4444",freqs:[174,285,111,528,40],steps:[
{time:"15 min",freq:"174 Hz",name:"Pain Relief",desc:"Allow physical pain to dissolve."},
{time:"15 min",freq:"285 Hz",name:"Tissue Regeneration",desc:"Visualize cells rebuilding."},
{time:"15 min",freq:"111 Hz",name:"Cell Euphoria",desc:"Trigger natural endorphin release."},
{time:"15 min",freq:"528 Hz",name:"DNA Miracle",desc:"Feel your DNA repairing."},
{time:"15 min",freq:"40 Hz",name:"Gamma Renewal",desc:"Activate neuroplasticity."}
],ben:["DNA repair activation","Pain relief","Cognitive longevity boost","Immune optimization"]},
{title:"💗 Love & Heart Opening",sub:"Expand your capacity to give and receive love",dur:"50 min",col:"#f472b6",freqs:[528,639,432,528],steps:[
{time:"10 min",freq:"528 Hz",name:"Love Foundation",desc:"Breathe love into every cell."},
{time:"15 min",freq:"639 Hz",name:"Heart Harmony",desc:"Send healing to broken bonds."},
{time:"10 min",freq:"432 Hz",name:"Unconditional Love",desc:"Boundless and infinite."},
{time:"15 min",freq:"528+432 Hz",name:"Love & Nature Fusion",desc:"Rest in a field of pure love."}
],ben:["Opens heart chakra","Heals relationship trauma","Attracts loving experiences","Deepens self-love"]},
{title:"💎 Wealth & Abundance",sub:"Reprogram your money mindset",dur:"40 min",col:"#fbbf24",freqs:[417,888,528,1111],steps:[
{time:"10 min",freq:"417 Hz",name:"Scarcity Clearing",desc:"Release inherited beliefs."},
{time:"15 min",freq:"888 Hz",name:"Abundance Frequency",desc:"Feel wealth as your birthright."},
{time:"10 min",freq:"528 Hz",name:"Manifestation Field",desc:"Every cell vibrates with prosperity."},
{time:"5 min",freq:"1111 Hz",name:"Manifestation Gateway",desc:"Set your wealth intention."}
],ben:["Dissolves scarcity programming","Opens manifestation channels","Accelerates attraction"]},
{title:"👁️ Spiritual Awakening",sub:"Connect with your highest divine self",dur:"60 min",col:"#a78bfa",freqs:[7.83,852,963,1111,432],steps:[
{time:"10 min",freq:"7.83 Hz",name:"Earth Grounding",desc:"Ground deeply before ascending."},
{time:"15 min",freq:"852 Hz",name:"Third Eye Activation",desc:"Feel indigo light expanding."},
{time:"15 min",freq:"963 Hz",name:"Crown Opening",desc:"Feel violet-white light pouring in."},
{time:"10 min",freq:"1111 Hz",name:"Dimensional Gateway",desc:"Thoughts become reality here."},
{time:"10 min",freq:"432 Hz",name:"Cosmic Reintegration",desc:"Return with divine gifts."}
],ben:["Pineal gland activation","Third eye opening","Higher guidance access","Soul purpose alignment"]}
];
const ANGEL_NUMBERS=[
{hz:111,sym:"✦",meaning:"New Beginnings",msg:"Your thoughts are manifesting",col:"#ffffff"},
{hz:222,sym:"⚖",meaning:"Balance & Trust",msg:"Everything is falling into place",col:"#f9a8d4"},
{hz:333,sym:"△",meaning:"Ascended Masters",msg:"You are surrounded by divine support",col:"#fcd34d"},
{hz:444,sym:"◈",meaning:"Angelic Protection",msg:"Angels surround you",col:"#fde68a"},
{hz:555,sym:"⚡",meaning:"Major Change",msg:"Massive transformation is coming",col:"#67e8f9"},
{hz:666,sym:"♡",meaning:"Rebalance",msg:"Align your mind with your heart",col:"#fda4af"},
{hz:777,sym:"✪",meaning:"Divine Luck",msg:"You are on the perfect path",col:"#c4b5fd"},
{hz:888,sym:"∞",meaning:"Infinite Abundance",msg:"Financial rewards flow to you now",col:"#6ee7b7"},
{hz:999,sym:"◯",meaning:"Completion",msg:"A karmic cycle completes",col:"#fca5a5"},
{hz:1111,sym:"⟡",meaning:"Manifestation Portal",msg:"Make a wish",col:"#e2e8f0"},
{hz:1212,sym:"↑↑",meaning:"Spiritual Growth",msg:"Your awakening accelerates",col:"#a5b4fc"},
{hz:2222,sym:"⊞",meaning:"Master Builder",msg:"Build your legacy",col:"#e5e7eb"},
{hz:3333,sym:"⁂",meaning:"Trinity Activation",msg:"Body, mind and spirit align",col:"#fde68a"},
{hz:4444,sym:"⬡",meaning:"Celestial Fortress",msg:"Four layers of angelic armor",col:"#fcd34d"},
{hz:5555,sym:"⚡⚡",meaning:"Quantum Leap",msg:"Leap into your highest timeline",col:"#f8fafc"},
{hz:6666,sym:"❋",meaning:"Unconditional Love",msg:"Your heart radiates transforming love",col:"#f9a8d4"},
{hz:7777,sym:"✦✦",meaning:"Supreme Sacred Luck",msg:"Maximum divine fortune",col:"#fde68a"},
{hz:8888,sym:"∞∞",meaning:"Infinite Financial Mastery",msg:"All doors of abundance open",col:"#6ee7b7"},
{hz:9999,sym:"☽○☾",meaning:"Ascension",msg:"You ascend into pure light",col:"#f1f5f9"},
{hz:1234,sym:"1→",meaning:"Divine Steps",msg:"You are progressing perfectly",col:"#86efac"}
];
const PROTOCOL_ETHERS=[
{num:1,name:"Physical",hz:"174 Hz + 40 Hz sub",targets:"Parasites, tissue masses, heavy metals",col:"#ef4444",aff:"Every physical blockage dissolves now into perfect light."},
{num:2,name:"Cellular",hz:"333 Hz + 111 Hz",targets:"Bacteria, fungi, viral loads",col:"#f97316",aff:"Every pathogen shatters into light."},
{num:3,name:"Etheric",hz:"396 Hz + 417 Hz",targets:"Entity attachments, psychic cords",col:"#f59e0b",aff:"Every cord feeding on my energy is severed."},
{num:4,name:"Emotional",hz:"528 Hz + 639 Hz",targets:"Trapped grief, rage, shame, fear",col:"#fb7185",aff:"Every trapped emotion is transmuted into pure love."},
{num:5,name:"Mental",hz:"741 Hz + 852 Hz",targets:"Mind loops, hypnotic programming",col:"#8b5cf6",aff:"My mind is sovereign."},
{num:6,name:"Ancestral",hz:"963 Hz + 1,111 Hz",targets:"Generational trauma, karmic loops",col:"#22c55e",aff:"I release all ancestral trauma now."},
{num:7,name:"Spiritual",hz:"1,296 Hz",targets:"Dark soul contracts, false light traps",col:"#60a5fa",aff:"I stand in pure divine light."},
{num:8,name:"Quantum",hz:"2,160 Hz",targets:"Timeline anchors, scalar intrusions",col:"#f59e0b",aff:"My quantum field is clear."},
{num:9,name:"Akashic",hz:"3,168 Hz",targets:"Akashic distortions, soul wounds",col:"#a78bfa",aff:"My soul record is restored to its original perfection."}
];
const LUNAR_PHASES=[
{phase:"🌑",name:"New Moon",hz:136.10,desc:"Maximum clearing power.",col:"#94a3b8"},
{phase:"🌒",name:"Waxing Moon",hz:210.42,desc:"Build healing momentum.",col:"#fbbf24"},
{phase:"🌕",name:"Full Moon",hz:221.23,desc:"Maximum healing power.",col:"#f1f5f9"},
{phase:"🌘",name:"Waning Moon",hz:229.22,desc:"Release and let go.",col:"#a78bfa"}
];
const GUIDE_TOPICS=[
{title:"How Sound Heals",icon:"🔬",content:"Sound waves create mechanical vibrations that travel through all biological tissue. When exposed to matching frequencies, cells entrain, restoring optimal function."},
{title:"Brainwave Entrainment",icon:"🧠",content:"Binaural beats cause the brain to perceive a phantom beat, entraining brainwaves: Delta for sleep, Theta for meditation, Alpha for relaxation, Gamma for cognition."},
{title:"DNA & the Solfeggio Scale",icon:"🧬",content:"Research shows coherent emotions combined with 528 Hz increased UV light absorption in DNA. 528 Hz is now widely used in sound therapy for cellular regeneration."},
{title:"The Schumann Resonance",icon:"🌍",content:"Earth generates a global electromagnetic resonance at 7.83 Hz. Human brainwave frequencies mirror this pattern. NASA includes Schumann generators in spacecraft."},
{title:"Angel Numbers & Sacred Numerology",icon:"👼",content:"Angel numbers are repeating sequences believed to carry divine messages, each mapped to a healing Hz equivalent."},
{title:"The 9-Ether Healing System",icon:"⚡",content:"A human exists across 9 energetic dimensions. The 9-Ether Protocol clears each layer using frequencies from 7.83 Hz to 3,168 Hz."},
{title:"How to Use This App",icon:"📱",content:"Use headphones for binaural beats. Set an intention. Start with the Player. Use Rituals for structured journeys. Log every session in your Journal."}
];
const FREQ_REF=[
{hz:"7.83",name:"Schumann Resonance",cat:"Nature",info:"Earth's heartbeat."},
{hz:"40",name:"Gamma Brain",cat:"Mind",info:"Boosts neuroplasticity."},
{hz:"111",name:"Cell Regeneration",cat:"Body",info:"Triggers endorphin release."},
{hz:"174",name:"Pain Relief",cat:"Body",info:"Natural anesthetic."},
{hz:"285",name:"Tissue Regeneration",cat:"Body",info:"Regenerates damaged tissue."},
{hz:"396",name:"Fear & Guilt Release",cat:"Mind",info:"Liberates guilt."},
{hz:"417",name:"Trauma Clearing",cat:"Cleansing",info:"Facilitates change."},
{hz:"432",name:"Universal Harmony",cat:"Nature",info:"Creates peace and well-being."},
{hz:"528",name:"DNA Repair",cat:"Body",info:"The Miracle Tone."},
{hz:"639",name:"Heart Coherence",cat:"Love",info:"Repairs broken bonds."},
{hz:"741",name:"Toxin Cleanse",cat:"Cleansing",info:"Awakens intuition."},
{hz:"852",name:"Pineal Activation",cat:"Spirit",info:"Raises cell energy."},
{hz:"963",name:"God Frequency",cat:"Spirit",info:"Universal oneness."},
{hz:"1111",name:"Manifestation Portal",cat:"Spirit",info:"Amplifies intentions."},
{hz:"1296",name:"Angelic Threshold",cat:"Spirit",info:"Bridges human and angelic consciousness."},
{hz:"2160",name:"Solar Harmonic",cat:"Spirit",info:"Light body activation."},
{hz:"3168",name:"Christ Consciousness Grid",cat:"Spirit",info:"Akashic record access."}
];
var _sfCtx=null,_sfUnlocked=false,isPlaying=false,curWave='sine',curTrackIdx=0,playerNode=null,natureNode=null,timerInterval=null,elapsedSeconds=0,masterVolume=0.7;
var loveNodes=[],loveFieldOn=false,vortexNodes=[],vortexOn=false,growthNodes=[],growthSeqTimer=null,naturePortalNodes=[],ritualNodes=[],ritualSeqTimer=null,angelNodes=[],lunarNodes=[];
function getCtx(){ if(!_sfCtx){ _sfCtx=new (window.AudioContext||window.webkitAudioContext)(); } return _sfCtx; }
function ensureTone(){
  var ctx=getCtx();
  if(ctx.state==='suspended'){ ctx.resume().catch(function(){}); }
  if(!_sfUnlocked){
    _sfUnlocked=true;
    try{
      var buf=ctx.createBuffer(1,1,22050);
      var src=ctx.createBufferSource();
      src.buffer=buf; src.connect(ctx.destination); src.start(0);
    }catch(e){}
  }
}
function getMaster(){
  var ctx=getCtx();
  var comp=ctx.createDynamicsCompressor();
  comp.threshold.value=-24; comp.knee.value=30; comp.ratio.value=12; comp.attack.value=0.003; comp.release.value=0.25;
  comp.connect(ctx.destination);
  return comp;
}
function makeGain(vol){ var ctx=getCtx(); var g=ctx.createGain(); g.gain.value=(vol===undefined?0.7:vol); g.connect(getMaster()); return g; }
function stopNode(node){ if(!node) return; try{ if(node._stop){ node._stop(); return; } if(node.stop) node.stop(); if(node.disconnect) node.disconnect(); }catch(e){} }
function tone(hz,wave,vol){
  var ctx=getCtx();
  var gain=makeGain(vol||0.5);
  var osc=ctx.createOscillator();
  osc.type=wave||curWave||'sine';
  osc.frequency.value=hz;
  osc.connect(gain);
  osc.start();
  return { masterGain:gain, _stop:function(){ try{osc.stop();}catch(e){} try{gain.disconnect();}catch(e){} } };
}
function binaural(carrier,beatHz,vol){
  var ctx=getCtx();
  var merger=ctx.createChannelMerger(2);
  var gain=ctx.createGain(); gain.gain.value=vol||0.45; gain.connect(getMaster()); merger.connect(gain);
  var oscL=ctx.createOscillator(); oscL.type='sine'; oscL.frequency.value=carrier;
  var panL=ctx.createStereoPanner?ctx.createStereoPanner():null;
  if(panL){ panL.pan.value=-1; oscL.connect(panL); panL.connect(merger,0,0); } else { oscL.connect(merger,0,0); }
  oscL.start();
  var freqR=carrier+Math.min(beatHz,40);
  var oscR=ctx.createOscillator(); oscR.type='sine'; oscR.frequency.value=freqR;
  var panR=ctx.createStereoPanner?ctx.createStereoPanner():null;
  if(panR){ panR.pan.value=1; oscR.connect(panR); panR.connect(merger,0,1); } else { oscR.connect(merger,0,1); }
  oscR.start();
  return { masterGain:gain, _stop:function(){ try{oscL.stop();oscR.stop();}catch(e){} try{gain.disconnect();merger.disconnect();}catch(e){} } };
}
function nature(vol){
  var ctx=getCtx();
  var gain=makeGain(vol||0.3);
  var bufSize=ctx.sampleRate*2;
  var buffer=ctx.createBuffer(1,bufSize,ctx.sampleRate);
  var data=buffer.getChannelData(0);
  var last=0;
  for(var i=0;i<bufSize;i++){ var white=Math.random()*2-1; data[i]=(last+0.02*white)/1.02; last=data[i]; data[i]*=3.5; }
  var src=ctx.createBufferSource(); src.buffer=buffer; src.loop=true;
  var filter=ctx.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=800; filter.Q.value=0.5;
  src.connect(filter); filter.connect(gain); src.start();
  return { masterGain:gain, _stop:function(){ try{src.stop();}catch(e){} try{gain.disconnect();filter.disconnect();}catch(e){} } };
}
function fade(nodeObj){ if(!nodeObj) return; var g=nodeObj.masterGain; if(g){ g.gain.value=0; } setTimeout(function(){ stopNode(nodeObj); },300); }
function setWave(w,btn){
  curWave=w;
  document.querySelectorAll('.wave-btn').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
  if(isPlaying){ stopCurrentAudio(); startPlay(); }
}
function stopCurrentAudio(){
  if(playerNode){ fade(playerNode); playerNode=null; }
  if(natureNode){ fade(natureNode); natureNode=null; }
  if(timerInterval){ clearInterval(timerInterval); timerInterval=null; }
}
function updatePlayBtn(playing){
  var btn=document.getElementById('playBtn'); if(!btn) return;
  if(playing){ btn.innerHTML='⏹ Stop'; btn.style.background='linear-gradient(135deg,#ef4444,#dc2626)'; }
  else { btn.innerHTML='▶ Play'; btn.style.background=''; }
}
function startTimer(){
  elapsedSeconds=0;
  var timerEl=document.getElementById('pTimer');
  if(timerInterval) clearInterval(timerInterval);
  timerInterval=setInterval(function(){
    elapsedSeconds++;
    if(timerEl){ var m=Math.floor(elapsedSeconds/60); var s=elapsedSeconds%60; timerEl.textContent=m+':'+(s<10?'0':'')+s; }
  },1000);
}
function startPlay(){
  var ctx=getCtx(); if(ctx.state==='suspended') ctx.resume();
  stopCurrentAudio();
  isPlaying=true; updatePlayBtn(true); startTimer();
  var t=TRACKS[curTrackIdx]||TRACKS[0];
  var hz=t.hz;
  playerNode = hz<20 ? binaural(110,hz,masterVolume) : tone(hz,curWave,masterVolume);
  var affirmEl=document.getElementById('pAff');
  if(affirmEl){ affirmEl.style.display='block'; affirmEl.textContent='“'+(t.aff||'')+'”'; }
}
function stopPlay(){
  stopCurrentAudio(); isPlaying=false; updatePlayBtn(false); elapsedSeconds=0;
  var timerEl=document.getElementById('pTimer'); if(timerEl) timerEl.textContent='0:00';
}
function playerToggle(){ ensureTone(); if(isPlaying){ stopPlay(); } else { startPlay(); } }
function playerNature(){
  ensureTone();
  var btn=document.getElementById('natBtn');
  if(natureNode){ fade(natureNode); natureNode=null; if(btn){ btn.textContent='🌿 Nature'; btn.classList.remove('active'); } }
  else { natureNode=nature(0.25); if(btn){ btn.textContent='🌿 Nature ✓'; btn.classList.add('active'); } }
}
function selTrackFn(t){
  curTrackIdx=TRACKS.indexOf(t);
  function set(id,val){ var el=document.getElementById(id); if(el) el.textContent=val; }
  set('pHz', t.lbl||t.hz);
  set('pHzLabel', (t.lbl||t.hz)+' Hz — '+(t.cat||''));
  set('pBenefit', t.ben||'');
  var affirmEl=document.getElementById('pAff');
  if(affirmEl) affirmEl.textContent = t.aff ? ('“'+t.aff+'”') : '';
  document.querySelectorAll('.track-card').forEach(function(c){ c.classList.remove('sel'); });
  var card=document.querySelector('[data-tidx="'+TRACKS.indexOf(t)+'"]');
  if(card) card.classList.add('sel');
  if(isPlaying){ stopCurrentAudio(); isPlaying=true; startPlay(); }
}
function selByIdx(el){
  var idx=parseInt(el.getAttribute('data-tidx'));
  if(!isNaN(idx) && TRACKS[idx]){
    selTrackFn(TRACKS[idx]);
    ensureTone();
    if(!isPlaying) startPlay();
  }
}
var loveFieldOn=false;
function loveFieldToggle(){
  ensureTone();
  var btn=document.getElementById('loveBigBtn');
  if(loveFieldOn){
    loveNodes.forEach(function(n){fade(n);}); loveNodes=[]; loveFieldOn=false;
    if(btn) btn.classList.remove('active');
  } else {
    [528,639,285,417,396,963,7.83].forEach(function(hz){ loveNodes.push(hz<20?binaural(110,hz,0.12):tone(hz,'sine',0.12)); });
    loveFieldOn=true;
    if(btn) btn.classList.add('active');
  }
}
function loveStageToggle(idx){
  ensureTone();
  loveNodes.forEach(function(n){fade(n);}); loveNodes=[];
  var stage=LOVE_STAGES[idx]; if(!stage) return;
  stage.hz.forEach(function(hz){ loveNodes.push(hz<20?binaural(110,hz,0.18):tone(hz,'sine',0.18)); });
  loveFieldOn=true;
}
function vortexToggle(){
  ensureTone();
  var btn=document.getElementById('vortexBtn');
  var ring=document.getElementById('vortexRing');
  if(vortexOn){
    vortexNodes.forEach(function(n){fade(n);}); vortexNodes=[]; vortexOn=false;
    if(btn) btn.innerHTML='⚡ Activate Vortex';
    if(ring) ring.classList.remove('active');
  } else {
    [7.83,111,528,417,852,963].forEach(function(hz){ vortexNodes.push(hz<20?binaural(110,hz,0.3):tone(hz,'sine',0.3)); });
    vortexNodes.push(tone(417,'sawtooth',0.1));
    vortexOn=true;
    if(btn) btn.innerHTML='⏹ Stop Vortex';
    if(ring) ring.classList.add('active');
  }
}
function growthToggle(idx){
  ensureTone();
  growthNodes.forEach(function(n){fade(n);}); growthNodes=[];
  var g=GROWTH_LAYERS[idx]; if(!g) return;
  g.gh.forEach(function(hz){ growthNodes.push(hz<20?binaural(110,hz,0.2):tone(hz,'sine',0.2)); });
}
function growthMasterSeq(){
  ensureTone();
  var step=0;
  function playStep(){
    growthNodes.forEach(function(n){fade(n);}); growthNodes=[];
    if(step>=MASTER_SEQUENCE.length) return;
    var s=MASTER_SEQUENCE[step];
    growthNodes.push(s.hz<20?binaural(110,s.hz,0.25):tone(s.hz,'sine',0.25));
    step++;
    growthSeqTimer=setTimeout(playStep,120000);
  }
  playStep();
}
function sceneToggle(idx){
  ensureTone();
  naturePortalNodes.forEach(function(n){fade(n);}); naturePortalNodes=[];
  document.querySelectorAll('.scene-card').forEach(function(c){c.classList.remove('playing');});
  var s=NATURE_SCENES[idx]; if(!s) return;
  naturePortalNodes.push(nature(0.3));
  naturePortalNodes.push(s.hz<20?binaural(110,s.hz,0.3):tone(s.hz,'sine',0.3));
  var card=document.getElementById('scene-'+idx); if(card) card.classList.add('playing');
}
function primalToggle(hz){
  ensureTone();
  naturePortalNodes.forEach(function(n){fade(n);}); naturePortalNodes=[];
  naturePortalNodes.push(hz<20?binaural(110,hz,0.4):tone(hz,'sine',0.4));
}
function ritualExpand(idx){
  var body=document.getElementById('rb-'+idx); if(!body) return;
  var isOpen=body.classList.contains('open');
  document.querySelectorAll('.ritual-body').forEach(function(b){b.classList.remove('open');});
  if(!isOpen) body.classList.add('open');
}
function ritualActivate(idx){
  ensureTone();
  ritualNodes.forEach(function(n){fade(n);}); ritualNodes=[];
  if(ritualSeqTimer){ clearTimeout(ritualSeqTimer); ritualSeqTimer=null; }
  var r=RITUALS[idx]; if(!r) return;
  var freqs=r.freqs||[]; var step=0;
  function playRitualStep(){
    ritualNodes.forEach(function(n){fade(n);}); ritualNodes=[];
    if(step>=freqs.length) return;
    var hz=freqs[step];
    ritualNodes.push(hz<20?binaural(110,hz,0.3):tone(hz,'sine',0.3));
    step++;
    ritualSeqTimer=setTimeout(playRitualStep,600000);
  }
  playRitualStep();
}
function ritualStop(){
  ritualNodes.forEach(function(n){fade(n);}); ritualNodes=[];
  if(ritualSeqTimer){ clearTimeout(ritualSeqTimer); ritualSeqTimer=null; }
}
function angelPlay(hz,btn){
  ensureTone();
  angelNodes.forEach(function(n){fade(n);}); angelNodes=[];
  document.querySelectorAll('.angel-card').forEach(function(c){c.classList.remove('active');});
  var actualHz=hz>2000?hz/10:hz;
  angelNodes.push(actualHz<20?binaural(110,actualHz,0.4):tone(actualHz,'sine',0.4));
  if(btn && btn.closest){ var card=btn.closest('.angel-card'); if(card) card.classList.add('active'); }
}
function lunarPlay(hz,btn){
  ensureTone();
  lunarNodes.forEach(function(n){fade(n);}); lunarNodes=[];
  [136.10,210.42,221.23].forEach(function(lHz){ lunarNodes.push(tone(lHz,'sine',0.15)); });
  lunarNodes.push(hz<20?binaural(110,hz,0.3):tone(hz,'sine',0.3));
  document.querySelectorAll('.lunar-btn').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
}
function setVol(val){
  masterVolume=val/100;
  var label=document.getElementById('volLabel'); if(label) label.textContent=val+'%';
  [playerNode,natureNode].forEach(function(n){ if(n && n.masterGain) n.masterGain.gain.value=masterVolume; });
}
function filterCat(cat,btn){
  document.querySelectorAll('#catFilter .filter-btn').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
  rTracks(cat);
}
function go(id){
  try{
    document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
    var target=document.getElementById('page-'+id);
    if(!target){ return; }
    target.classList.add('active');
    document.querySelectorAll('.tab').forEach(function(t){
      t.classList.remove('active');
      if(t.getAttribute('data-page')===id) t.classList.add('active');
    });
    window.scrollTo(0,0);
    if(id==='player'){
      var tl=document.getElementById('trackList');
      if(tl && tl.children.length===0) rTracks('All');
    }
  }catch(e){}
}
function rTracks(cat){
  cat=cat||'All';
  var list=document.getElementById('trackList');
  var filtered = cat==='All' ? TRACKS : TRACKS.filter(function(t){return t.cat===cat;});
  list.innerHTML=filtered.map(function(t){
    var c=CC[t.cat]||'#a78bfa';
    var globalIdx=TRACKS.indexOf(t);
    return '<div class="track-card" data-tidx="'+globalIdx+'" onclick="selByIdx(this)" style="border-left:3px solid '+c+'50">'+
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">'+
      '<div style="flex:1;min-width:0">'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">'+
      '<div class="hz-badge" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'40">'+(t.lbl||t.hz+' Hz')+'</div>'+
      '<div style="font-size:10px;color:'+c+'99;font-weight:700;text-transform:uppercase">'+t.cat+'</div>'+
      '</div>'+
      '<div style="font-weight:700;font-size:13.5px;color:#e2e8f0;line-height:1.3">'+t.n+'</div>'+
      '<div style="font-size:11.5px;color:#64748b;margin-top:3px">'+t.ben+'</div>'+
      '<div style="font-size:10.5px;color:'+c+'80;margin-top:4px;font-weight:600">Chakra: '+(t.ch||'—')+'</div>'+
      '</div>'+
      '<button class="play-mini" data-tidx="'+globalIdx+'" onclick="event.stopPropagation();selByIdx(this)">▶</button>'+
      '</div></div>';
  }).join('');
}
function rAngels(){
  document.getElementById('angelGrid').innerHTML=ANGEL_NUMBERS.map(function(a){
    return '<div class="angel-card" style="background:'+a.col+'08;border-color:'+a.col+'40" onclick="angelPlay('+a.hz+',this)">'+
    '<div style="font-size:26px;color:'+a.col+';margin-bottom:5px">'+a.sym+'</div>'+
    '<div style="font-size:18px;font-weight:900;color:'+a.col+'">'+a.hz+'</div>'+
    '<div style="font-weight:700;font-size:11px;margin:4px 0 2px">'+a.meaning+'</div>'+
    '<div style="font-size:10px;color:var(--dim);line-height:1.4">'+a.msg+'</div>'+
    '</div>';
  }).join('');
}
function rLoveStages(){
  document.getElementById('loveStages').innerHTML=LOVE_STAGES.map(function(s,i){
    return '<div class="card" style="cursor:pointer" onclick="loveStageToggle('+i+')">'+
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
    '<div style="font-size:26px">'+s.icon+'</div>'+
    '<div style="flex:1;min-width:0">'+
    '<div style="font-weight:800;color:'+s.col+';margin-bottom:3px">Stage '+(i+1)+': '+s.name+'</div>'+
    '<div style="font-size:12px;color:var(--muted);margin-bottom:3px">'+s.desc+'</div>'+
    '<div style="font-size:11px;color:var(--dim)">'+s.hz.join(' Hz + ')+' Hz</div></div>'+
    '<div style="font-size:18px;color:'+s.col+'">▶</div></div></div>';
  }).join('');
}
function rNature(){
  document.getElementById('natureGrid').innerHTML=NATURE_SCENES.map(function(s,i){
    return '<div class="card scene-card" id="scene-'+i+'" style="border-color:'+s.col+'40" onclick="sceneToggle('+i+')">'+
    '<div style="font-size:28px;margin-bottom:8px">'+s.icon+'</div>'+
    '<div style="font-weight:800;color:'+s.col+';margin-bottom:4px">'+s.name+'</div>'+
    '<div style="font-size:12px;color:var(--muted);margin-bottom:6px">'+s.desc+'</div>'+
    '<div style="font-size:11px;color:var(--dim)">+ '+s.hz+' Hz healing tone</div>'+
    '</div>';
  }).join('');
  document.getElementById('primalGrid').innerHTML=PRIMAL_FREQS.map(function(p){
    return '<div class="card" style="cursor:pointer;border-color:'+p.col+'40" onclick="primalToggle('+p.hz+')">'+
    '<div style="font-size:18px;font-weight:900;color:'+p.col+'">'+p.hz+' Hz</div>'+
    '<div style="font-weight:700;font-size:12px;margin:4px 0 2px">'+p.name+'</div>'+
    '<div style="font-size:11px;color:var(--dim)">'+p.desc+'</div>'+
    '</div>';
  }).join('');
}
function rGrowth(){
  document.getElementById('growthGrid').innerHTML=GROWTH_LAYERS.map(function(l,i){
    return '<div class="card" style="cursor:pointer;border-color:'+l.col+'40" onclick="growthToggle('+i+')">'+
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
    '<div style="font-size:26px">'+l.icon+'</div>'+
    '<div style="flex:1;min-width:0">'+
    '<div style="font-weight:800;color:'+l.col+';margin-bottom:3px">'+l.name+'</div>'+
    '<div style="font-size:12px;color:var(--muted);margin-bottom:3px">'+l.desc+'</div>'+
    '<div style="font-size:11px;color:var(--dim);font-style:italic">'+l.aff+'</div></div>'+
    '<div style="font-size:18px;color:'+l.col+'">▶</div></div></div>';
  }).join('');
  document.getElementById('masterSteps').innerHTML=MASTER_SEQUENCE.map(function(s,i){
    return '<div class="card" style="border-color:'+s.col+'30;margin-bottom:6px;padding:10px 14px">'+
    '<div style="display:flex;align-items:center;gap:10px">'+
    '<div style="width:24px;height:24px;border-radius:50%;background:'+s.col+'25;color:'+s.col+';font-weight:900;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(i+1)+'</div>'+
    '<div><span style="font-weight:800;color:'+s.col+'">'+s.name+'</span> — <span style="font-size:12px;color:var(--muted)">'+s.hz+' Hz · '+s.desc+'</span></div>'+
    '</div></div>';
  }).join('');
}
function rRituals(){
  document.getElementById('ritualList').innerHTML=RITUALS.map(function(r,i){
    return '<div class="ritual-card" style="border-color:'+r.col+'30">'+
    '<button class="ritual-header" onclick="ritualExpand('+i+')">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">'+
    '<div><div style="font-weight:800;font-size:15px;margin-bottom:3px">'+r.title+'</div>'+
    '<div style="font-size:12px;color:var(--muted)">'+r.sub+'</div>'+
    '<span style="font-size:11px;padding:2px 8px;background:#ffffff10;border-radius:999px;color:var(--dim)">'+r.dur+'</span>'+
    '</div>'+
    '<span style="color:var(--dim);font-size:18px">↓</span>'+
    '</div></button>'+
    '<div class="ritual-body" id="rb-'+i+'">'+
    '<div style="display:flex;gap:8px;margin-bottom:12px">'+
    '<button class="btn btn-primary" style="font-size:12px;padding:8px 16px" onclick="ritualActivate('+i+')">▶ Activate All Frequencies</button>'+
    '<button class="btn btn-secondary" style="font-size:12px;padding:8px 14px" onclick="ritualStop()">■ Stop</button>'+
    '</div>'+
    r.steps.map(function(s,j){
      return '<div class="ritual-step">'+
      '<div class="step-dot" style="background:'+r.col+'25;color:'+r.col+';font-size:10px">'+(j+1)+'</div>'+
      '<div><div style="font-weight:700;font-size:13px;margin-bottom:2px">'+s.name+' — <span style="color:'+r.col+'">'+s.freq+'</span></div>'+
      '<div style="font-size:11px;color:var(--dim)">'+s.time+' · '+s.desc+'</div></div>'+
      '</div>';
    }).join('')+
    '<div style="margin-top:10px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--dim);margin-bottom:6px">Benefits</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:4px">'+r.ben.map(function(b){return '<span style="padding:2px 8px;background:'+r.col+'15;color:'+r.col+';border-radius:999px;font-size:10px;font-weight:700">'+b+'</span>';}).join('')+
    '</div></div></div></div>';
  }).join('');
}
function rGuide(){
  document.getElementById('guideList').innerHTML=GUIDE_TOPICS.map(function(t){
    return '<div class="guide-card" onclick="this.querySelector(&#39;.guide-body&#39;).classList.toggle(&#39;open&#39;)">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">'+
    '<div><span style="font-size:18px;margin-right:8px">'+t.icon+'</span><span style="font-weight:800;font-size:14px">'+t.title+'</span></div>'+
    '<span style="color:var(--dim)">↓</span></div>'+
    '<div class="guide-body">'+t.content+'</div>'+
    '</div>';
  }).join('');
  document.getElementById('freqRef').innerHTML=FREQ_REF.map(function(f){
    return '<div class="card" style="margin-bottom:6px;padding:10px 14px">'+
    '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
    '<div class="hz-badge" style="background:'+CC[f.cat]+'20;color:'+CC[f.cat]+'">'+f.hz+' Hz</div>'+
    '<div style="flex:1;min-width:0"><span style="font-weight:700;font-size:13px">'+f.name+'</span><span style="font-size:11px;color:var(--dim);margin-left:8px">'+f.info+'</span></div>'+
    '</div></div>';
  }).join('');
}
function rProtocol(){
  document.getElementById('protEthers').innerHTML=PROTOCOL_ETHERS.map(function(e){
    return '<div class="card" style="border-color:'+e.col+'40;margin-bottom:8px">'+
    '<div style="display:flex;align-items:flex-start;gap:10px">'+
    '<div style="width:28px;height:28px;border-radius:50%;background:'+e.col+'25;color:'+e.col+';font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">'+e.num+'</div>'+
    '<div style="flex:1;min-width:0">'+
    '<div style="font-weight:800;color:'+e.col+';margin-bottom:2px">Ether '+e.num+': '+e.name+' — <span style="font-size:12px;font-weight:600">'+e.hz+'</span></div>'+
    '<div style="font-size:11px;color:var(--dim);margin-bottom:4px">Targets: '+e.targets+'</div>'+
    '<div style="font-size:11px;font-style:italic;color:#c4b5fd">'+e.aff+'</div>'+
    '</div></div></div>';
  }).join('');
  document.getElementById('protLunar').innerHTML=LUNAR_PHASES.map(function(l){
    return '<div class="card" style="border-color:'+l.col+'40;text-align:center">'+
    '<div style="font-size:28px;margin-bottom:6px">'+l.phase+'</div>'+
    '<div style="font-weight:800;color:'+l.col+'">'+l.name+'</div>'+
    '<div style="font-size:18px;font-weight:900;color:'+l.col+';margin:4px 0">'+l.hz+' Hz</div>'+
    '<div style="font-size:11px;color:var(--dim);margin-bottom:10px">'+l.desc+'</div>'+
    '<button class="lunar-btn filter-btn" style="width:100%" onclick="lunarPlay('+l.hz+',this)">▶ Activate</button>'+
    '</div>';
  }).join('');
}
function makeStars(){
  var c=document.getElementById('starsContainer');
  for(var i=0;i<80;i++){
    var s=document.createElement('div'); s.className='star';
    var size=Math.random()*2+1;
    s.style.cssText='width:'+size+'px;height:'+size+'px;top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;--d:'+(Math.random()*4+2)+'s;--delay:-'+(Math.random()*4)+'s;--op:'+(Math.random()*0.6+0.2);
    c.appendChild(s);
  }
}
var MOODS=['Peaceful','Energized','Grateful','Anxious','Sad','Hopeful','Clear','Tired'];
var MOOD_EMOJI={Peaceful:'😌',Energized:'⚡',Grateful:'🙏',Anxious:'😰',Sad:'😢',Hopeful:'🌟',Clear:'🔮',Tired:'😴'};
var jMoodBefore='',jMoodAfter='';
function rMoodBtns(){
  ['moodBefore','moodAfter'].forEach(function(id){
    var isBefore=id==='moodBefore';
    document.getElementById(id).innerHTML=MOODS.map(function(m){
      var sel=(m===(isBefore?jMoodBefore:jMoodAfter));
      return '<button type="button" class="mood-btn'+(sel?' sel':'')+'" data-mood="'+m+'" data-target="'+id+'" onclick="pickMood(this)">'+MOOD_EMOJI[m]+' '+m+'</button>';
    }).join('');
  });
}
function pickMood(btn){
  var mood=btn.getAttribute('data-mood');
  var target=btn.getAttribute('data-target');
  if(target==='moodBefore') jMoodBefore=mood; else jMoodAfter=mood;
  document.querySelectorAll('#'+target+' .mood-btn').forEach(function(b){b.classList.remove('sel');});
  btn.classList.add('sel');
}
function saveJournal(){
  var title=document.getElementById('jTitle').value||'Healing Session';
  var intention=document.getElementById('jIntention').value||'';
  var notes=document.getElementById('jNotes').value||'';
  var entries=JSON.parse(localStorage.getItem('sf_journal')||'[]');
  entries.push({title:title,intention:intention,moodBefore:jMoodBefore,moodAfter:jMoodAfter,notes:notes,date:Date.now()});
  localStorage.setItem('sf_journal', JSON.stringify(entries));
  document.getElementById('jTitle').value='';
  document.getElementById('jIntention').value='';
  document.getElementById('jNotes').value='';
  jMoodBefore=''; jMoodAfter='';
  rMoodBtns();
  loadJournal();
}
function deleteJournalEntry(idx){
  var entries=JSON.parse(localStorage.getItem('sf_journal')||'[]');
  entries.splice(idx,1);
  localStorage.setItem('sf_journal', JSON.stringify(entries));
  loadJournal();
}
function loadJournal(){
  var entries=JSON.parse(localStorage.getItem('sf_journal')||'[]');
  var sorted=entries.slice().reverse();
  var list=document.getElementById('jList');
  if(!list) return;
  if(sorted.length===0){
    list.innerHTML='<div class="card" style="text-align:center;color:var(--dim);font-size:13px">No entries yet. Start your first healing session above. 🌿</div>';
  } else {
    list.innerHTML=sorted.map(function(e,revIdx){
      var idx=entries.length-1-revIdx;
      var d=new Date(e.date);
      var dateStr=d.toLocaleDateString()+' '+d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
      return '<div class="card">'+
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">'+
        '<div style="font-weight:800;font-size:14px">'+e.title+'</div>'+
        '<button onclick="deleteJournalEntry('+idx+')" style="background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:16px">×</button>'+
        '</div>'+
        '<div style="font-size:11px;color:var(--dim);margin-bottom:6px">'+dateStr+'</div>'+
        (e.intention?'<div style="font-size:12px;color:#c4b5fd;margin-bottom:6px;font-style:italic">'+e.intention+'</div>':'')+
        (e.moodBefore||e.moodAfter?'<div style="font-size:11px;color:var(--muted);margin-bottom:6px">'+(e.moodBefore?MOOD_EMOJI[e.moodBefore]+' '+e.moodBefore:'')+(e.moodBefore&&e.moodAfter?' → ':'')+(e.moodAfter?MOOD_EMOJI[e.moodAfter]+' '+e.moodAfter:'')+'</div>':'')+
        (e.notes?'<div style="font-size:12px;color:var(--text)">'+e.notes+'</div>':'')+
        '</div>';
    }).join('');
  }
  var sessionsEl=document.getElementById('jStatSessions');
  if(sessionsEl) sessionsEl.textContent=entries.length;
  var transEl=document.getElementById('jStatTrans');
  if(transEl){
    var trans=entries.filter(function(e){return e.moodBefore&&e.moodAfter&&e.moodBefore!==e.moodAfter;}).length;
    transEl.textContent=trans;
  }
}
document.addEventListener('touchstart', function onFT(){ ensureTone(); document.removeEventListener('touchstart',onFT); }, {passive:true});
document.addEventListener('click', function onFC(){ ensureTone(); document.removeEventListener('click',onFC); }, {passive:true});
makeStars();
rTracks('All'); rAngels(); rLoveStages(); rNature(); rGrowth(); rRituals(); rGuide(); rProtocol(); rMoodBtns(); loadJournal();
selTrackFn(TRACKS[0]);
var TIER_LEVELS={free:0,healer:1,ascended:2};
var TIER_PRICES={healer:'£11/mo',ascended:'£33/mo'};
var TIER_COLORS={healer:'#a78bfa',ascended:'#fbbf24'};
var TIER_EMOJIS={healer:'💜',ascended:'✨'};
function getUserTier(){ return localStorage.getItem('sf_tier')||'free'; }
function getTierLevel(){ return TIER_LEVELS[getUserTier()]||0; }
function gateGo(pageId,required){
  var need=TIER_LEVELS[required]||1;
  if(getTierLevel()>=need){ go(pageId); } else { showUpgrade(required); }
}
function showUpgrade(tier){
  var name=tier==='healer'?'Healer':'Ascended';
  var price=TIER_PRICES[tier], col=TIER_COLORS[tier], emoji=TIER_EMOJIS[tier];
  var feats = tier==='healer'
    ? ['Angel Numbers','Nature Portal','Epigenetic Love','Growth & Ascension','Healing Rituals']
    : ['9-Ether Protocol','Quantum Healing Vortex','Lunar Engine','Early access','Priority support'];
  document.getElementById('modalContent').innerHTML =
    '<div style="font-size:36px;margin-bottom:8px">'+emoji+'</div>'+
    '<div style="font-weight:900;font-size:20px;color:'+col+';margin-bottom:4px">Unlock '+name+'</div>'+
    '<div style="font-size:13px;color:var(--muted);margin-bottom:16px">'+price+' · Cancel anytime</div>'+
    '<div style="text-align:left;margin-bottom:20px">'+
    feats.map(function(f){return '<div style="font-size:12.5px;color:#e2e8f0;margin-bottom:7px">✓ <span style="color:'+col+'">'+f+'</span></div>';}).join('')+
    '</div>'+
    '<button class="btn-upgrade" style="background:linear-gradient(135deg,'+col+','+col+'99);color:#fff" onclick="startCheckout(&#39;'+tier+'&#39;)">'+emoji+' Activate '+name+' — '+price+'</button>'+
    '<button onclick="closeModal()" style="background:transparent;border:none;color:var(--muted);font-size:12px;margin-top:12px;width:100%">Maybe later</button>';
  document.getElementById('upgradeModal').classList.add('open');
}
function closeModal(){ document.getElementById('upgradeModal').classList.remove('open'); }
function startCheckout(tier){
  var email=localStorage.getItem('sf_email')||'';
  if(!email){
    document.getElementById('modalContent').innerHTML =
      '<div style="font-size:32px;margin-bottom:8px">✉️</div>'+
      '<div style="font-weight:900;font-size:18px;margin-bottom:6px">One quick step</div>'+
      '<div style="font-size:13px;color:var(--muted);margin-bottom:14px">Enter your email to set up your account</div>'+
      '<input class="email-input" id="checkoutEmail" type="email" placeholder="your@email.com" style="margin-bottom:8px"/>' +
      '<button class="btn-upgrade" onclick="confirmCheckout(&#39;'+tier+'&#39;)" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;margin-top:4px">Continue to Payment →</button>';
  } else { confirmCheckout(tier); }
}
function confirmCheckout(tier){
  var emailEl=document.getElementById('checkoutEmail');
  if(emailEl && emailEl.value) localStorage.setItem('sf_email', emailEl.value);
  var email=localStorage.getItem('sf_email')||'';
  document.getElementById('modalContent').innerHTML =
    '<div style="font-size:48px;margin-bottom:10px">🌟</div>'+
    '<div style="font-weight:900;font-size:20px;color:#a78bfa;margin-bottom:6px">You are almost there!</div>'+
    '<div style="font-size:13px;color:var(--muted);margin-bottom:20px">Complete your payment to unlock your chosen tier. You will be redirected to our secure payment page.</div>'+
    '<button onclick="closeModal();go(&#39;pricing&#39;)" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;padding:14px 24px;border-radius:999px;font-weight:800">💳 Go to Plans & Payment</button>'+
    '<div style="font-size:10px;color:var(--dim);margin-top:14px">📧 We will send your access details to: '+email+'</div>';
}
function submitEmail(){
  var input=document.getElementById('emailInput');
  if(!input || !input.value.includes('@')){ if(input) input.style.borderColor='#ef4444'; return; }
  localStorage.setItem('sf_email', input.value);
  document.getElementById('emailMsg').style.display='block';
  input.style.display='none';
  setTimeout(function(){ showUpgrade('healer'); }, 2000);
}
document.getElementById('upgradeModal').addEventListener('click', function(e){ if(e.target===this) closeModal(); });
</script>
</body>
</html>`;
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" }
  });
});

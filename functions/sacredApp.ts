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
.tab{padding:5px 11px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;white-space:nowrap;border:none;background:transparent;color:#ffffff55;transition:all 0.15s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-tap-highlight-color:rgba(167,139,250,0.2)}
.tab.active{background:#ffffff18;color:#fff}
.page{display:none;max-width:960px;margin:0 auto;padding:66px 16px 80px;padding-bottom:max(80px,env(safe-area-inset-bottom,80px));position:relative;z-index:1}
.page.active{display:block;position:relative;z-index:1}
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
.btn-rose{background:linear-gradient(135deg,#be185d,#7c3aed);color:#fff;box-shadow:0 0 24px #be185d40}
.btn-green{background:linear-gradient(135deg,#059669,#0891b2);color:#fff}
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px 18px;margin-bottom:10px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:10px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.section-label{font-size:10.5px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:var(--dim);margin-bottom:10px;margin-top:24px}
.hz-badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:800;letter-spacing:0.03em;box-shadow:0 0 8px currentColor22}
.filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;-webkit-overflow-scrolling:touch}
.filter-btn{padding:6px 14px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid #334155;background:transparent;color:#94a3b8;transition:all 0.18s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;white-space:nowrap}
.filter-btn.active{border-color:#ffffff50;background:#ffffff18;color:#fff}
/* Player */
.player-box{background:linear-gradient(160deg,#0d0520 0%,#0c1a2e 50%,#0a0f1e 100%);border:1.5px solid transparent;border-radius:24px;padding:24px 18px 20px;margin-bottom:20px;text-align:center;overflow:visible;-webkit-overflow-scrolling:touch;position:relative;box-shadow:0 0 40px #7c3aed22,0 0 80px #a78bfa10,inset 0 1px 0 #ffffff08;background-clip:padding-box}
.player-hz{font-size:clamp(38px,10vw,68px);font-weight:900;background:linear-gradient(135deg,#fbbf24 0%,#f472b6 40%,#a78bfa 80%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px;line-height:1;margin-bottom:4px;filter:drop-shadow(0 0 20px #fbbf2440)}
.affirmation{font-style:italic;font-size:13.5px;color:#e2d9ff;padding:12px 16px;background:linear-gradient(135deg,#7c3aed18,#a78bfa08);border-radius:12px;border:1px solid #a78bfa35;margin-top:14px;display:none;line-height:1.6;letter-spacing:0.01em}
.progress-bar{height:6px;background:#1e293b;border-radius:4px;margin:14px 0 6px;overflow:hidden;box-shadow:inset 0 1px 3px #00000060}
.progress-fill{height:100%;background:linear-gradient(90deg,#7c3aed,#a78bfa,#f472b6,#fb923c);background-size:200% 100%;border-radius:4px;transition:width 1s linear;width:0%;box-shadow:0 0 8px #a78bfa80;animation:shimmer 3s linear infinite}@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.nature-btn{padding:10px 20px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid #22543d;background:linear-gradient(135deg,#052e1640,#0a3320);color:#86efac;transition:all 0.18s;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.nature-btn.on{border-color:#34d39970;background:#10b98118;color:#34d399}
.track-card{background:linear-gradient(135deg,#0f172a,#0d1117);border:1px solid #1e293b;border-radius:16px;padding:14px 16px;cursor:pointer;transition:border-color 0.2s,background 0.2s,box-shadow 0.2s,transform 0.15s;margin-bottom:8px;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.play-mini{width:40px;height:40px;border-radius:50%;border:1px solid #7c3aed50;background:linear-gradient(135deg,#7c3aed18,#a78bfa0a);color:#a78bfa;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.play-mini:hover,.play-mini:active{background:linear-gradient(135deg,#7c3aed55,#a78bfa35);box-shadow:0 0 12px #a78bfa50;transform:scale(1.1)}
.track-card.sel{border-color:#a78bfa80;background:#a78bfa0a}
/* Love */
.love-btn{width:154px;height:154px;border-radius:50%;border:none;cursor:pointer;background:radial-gradient(circle at 40% 40%,#be185d,#7c3aed);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;margin:0 auto;box-shadow:0 0 50px #be185d50;font-weight:800;font-size:13px;text-align:center;padding:16px;-webkit-tap-highlight-color:transparent}
.love-btn.pulsing{animation:lp 1.8s ease-in-out infinite}
@keyframes lp{0%,100%{box-shadow:0 0 50px #be185d50}50%{box-shadow:0 0 90px #be185d90,0 0 0 20px #be185d10}}
.stage-card{border-radius:12px;padding:14px 16px;border:1px solid var(--border);margin-bottom:8px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.stage-card.playing{border-color:#a78bfa70;background:#a78bfa0a}
/* Vortex */
.vortex-ring{width:170px;height:170px;border-radius:50%;border:2px solid #a78bfa40;margin:0 auto;display:flex;align-items:center;justify-content:center;transition:box-shadow 0.3s}
.vortex-ring.spin{animation:vs 3s linear infinite;box-shadow:0 0 50px #a78bfa50}
@keyframes vs{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
/* Angel */
.angel-card{border-radius:14px;padding:14px;border:1px solid;text-align:center;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform 0.15s}
.angel-card:active{transform:scale(0.96)}
/* Nature Portal */
.scene-card{border-radius:14px;padding:18px;border:1px solid;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all 0.15s}
.scene-card.playing{box-shadow:0 0 28px currentColor}
/* Growth */
.growth-card{border-radius:14px;padding:16px;border:1px solid;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all 0.15s;margin-bottom:8px}
.growth-card.playing{box-shadow:0 0 20px currentColor}
/* Ritual */
.ritual-card{border-radius:14px;overflow:hidden;margin-bottom:10px;border:1px solid}
.ritual-header{padding:16px;cursor:pointer;-webkit-tap-highlight-color:transparent;width:100%;background:transparent;border:none;color:var(--text);text-align:left}
.ritual-body{padding:0 16px 16px;display:none}
.ritual-body.open{display:block}
.ritual-step{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #0f172a}
.ritual-step:last-child{border-bottom:none}
.step-dot{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0;color:#fff}
/* Journal */
.mood-btn{padding:5px 12px;border-radius:999px;font-size:11px;border:1px solid var(--border);background:transparent;color:var(--dim);cursor:pointer;transition:all 0.12s;-webkit-tap-highlight-color:transparent}
.mood-btn.sel{border-color:#ffffff50;background:#ffffff18;color:#fff}
input,textarea,select{background:#0f172a;border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-size:13px;width:100%;outline:none;transition:border-color 0.15s;font-family:inherit}
input:focus,textarea:focus,select:focus{border-color:#7c3aed80}
textarea{resize:none}
/* Guide */
.guide-card{border-radius:14px;padding:18px;border:1px solid;margin-bottom:10px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.guide-body{display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:13px;color:var(--muted);line-height:1.8}
.guide-body.open{display:block}
/* Stars bg */
.stars{position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:0;overflow:hidden}
.star{position:absolute;border-radius:50%;background:#fff;animation:twinkle var(--d) ease-in-out infinite var(--delay)}
@keyframes twinkle{0%,100%{opacity:0.1}50%{opacity:var(--op)}}
.page{position:relative;z-index:1}
nav{z-index:200}

/* ══ PLAYER REDESIGN EXTRAS ══ */
/* Glowing border ring on player-box */
.player-box::before{content:'';position:absolute;inset:-1.5px;border-radius:25px;background:linear-gradient(135deg,#7c3aed60,#a78bfa40,#f472b6 40%,#fbbf2430,#a78bfa50);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1.5px;pointer-events:none;animation:borderPulse 4s ease-in-out infinite}
@keyframes borderPulse{0%,100%{opacity:0.5}50%{opacity:1}}

/* Sacred geometry orb behind Hz display */
.player-orb{width:100px;height:100px;margin:0 auto 8px;position:relative;display:flex;align-items:center;justify-content:center}
.player-orb::before{content:'';position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,#7c3aed30 0%,#a78bfa15 50%,transparent 75%);animation:orbPulse 3s ease-in-out infinite}
.player-orb::after{content:'';position:absolute;inset:8px;border-radius:50%;border:1px solid #a78bfa30;animation:orbSpin 12s linear infinite}
@keyframes orbPulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.15);opacity:1}}
@keyframes orbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

/* Frequency visualizer bars */
#vizCanvas{width:100%;height:48px;display:block;margin:8px 0 0;border-radius:8px;opacity:0.85}

/* Play button cosmic glow */
.btn-play-cosmic{background:linear-gradient(135deg,#7c3aed,#a78bfa,#c084fc)!important;box-shadow:0 0 24px #a78bfa60,0 4px 16px #7c3aed40;border:none!important;color:#fff!important;font-weight:800;letter-spacing:0.5px;transition:all 0.2s!important}
.btn-play-cosmic:hover,.btn-play-cosmic:active{box-shadow:0 0 40px #a78bfa90,0 4px 24px #7c3aed60;transform:scale(1.04)}
.btn-play-cosmic.playing{background:linear-gradient(135deg,#be185d,#f472b6,#fb7185)!important;box-shadow:0 0 28px #f472b660,0 4px 16px #be185d50!important;animation:playPulse 2s ease-in-out infinite}
@keyframes playPulse{0%,100%{box-shadow:0 0 24px #f472b660}50%{box-shadow:0 0 44px #f472b690,0 0 60px #fb7185 30}}

/* Track card selected state */
.track-card.active{background:linear-gradient(135deg,#1e0a3c,#0f1e35)!important;border-color:#a78bfa70!important;box-shadow:0 0 16px #7c3aed30,inset 0 0 20px #a78bfa08;transform:translateX(3px)}
.track-card:hover{border-color:#334155;box-shadow:0 2px 12px #00000040}

/* Wave type buttons */
.wave-btn{padding:7px 16px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid #334155;background:transparent;color:#94a3b8;transition:all 0.18s;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.wave-btn.active{background:linear-gradient(135deg,#7c3aed30,#a78bfa20);border-color:#a78bfa80;color:#c4b5fd;box-shadow:0 0 10px #a78bfa30}

/* Filter active state */
.filter-btn.active{background:linear-gradient(135deg,#7c3aed40,#a78bfa20);border-color:#a78bfa80;color:#e2d9ff;box-shadow:0 0 8px #7c3aed30}

/* pName track subtitle */
#pName{font-size:12px;color:#64748b;margin-bottom:2px;letter-spacing:0.03em;text-transform:uppercase;font-weight:600}
#pBenefit{font-size:13px;color:#94a3b8;margin:4px 0 10px;line-height:1.5}
#pTimer{font-size:11px;color:#475569;margin-bottom:10px;font-variant-numeric:tabular-nums}

/* Volume slider */
#volSlider{-webkit-appearance:none;appearance:none;height:5px;border-radius:3px;background:linear-gradient(90deg,#7c3aed,#a78bfa);outline:none;cursor:pointer}
#volSlider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);box-shadow:0 0 8px #a78bfa60;cursor:pointer}

/* iOS hint redesign */
#iosHint{background:linear-gradient(135deg,#3b0764 20%,#1e1b4b);border:1px solid #7c3aed50;border-radius:14px;padding:12px 16px;margin-bottom:16px;font-size:12.5px;color:#ddd6fe;text-align:center;line-height:1.6;box-shadow:0 2px 12px #7c3aed20}

/* Section header */
#page-player h1{font-size:clamp(22px,5vw,32px);margin-bottom:4px}
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
      <button class="tab" data-page="angels" onclick="go('angels')">👼 Angels</button>
      <button class="tab" data-page="love" onclick="go('love')">💗 Love</button>
      <button class="tab" data-page="vortex" onclick="go('vortex')">🌀 Vortex</button>
      <button class="tab" data-page="nature" onclick="go('nature')">🌿 Nature</button>
      <button class="tab" data-page="growth" onclick="go('growth')">🌱 Growth</button>
      <button class="tab" data-page="rituals" onclick="go('rituals')">🔮 Rituals</button>
      <button class="tab" data-page="journal" onclick="go('journal')">📓 Journal</button>
      <button class="tab" data-page="guide" onclick="go('guide')">📖 Guide</button>
      <button class="tab" data-page="protocol" onclick="go('protocol')">⚡ Protocol</button>
    </div>
  </div>
</nav>

<!-- ════════════ HOME ════════════ -->
<div class="page" id="page-home">
  <div class="hero">
    <div class="hero-badge">✦ Sacred Frequencies · Complete Healing App</div>
    <h1 class="grad-main">Heal. Align. Ascend.</h1>
    <p class="sub" style="margin-bottom:22px">40 sacred frequencies · Epigenetic Love · 9-Ether Protocol · Angel Numbers · Quantum Vortex · Healing Journal. Your complete sonic healing toolkit — works on any device.</p>
    <button class="btn btn-primary" onclick="go('player')" style="touch-action:manipulation;cursor:pointer;font-size:15px;padding:14px 32px;">▶ Start Healing Now</button>
  </div>
  <div class="grid3" style="margin-bottom:12px">
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#fbbf2430" onclick="go('player')"><div style="font-size:26px;margin-bottom:6px">🎵</div><div style="font-weight:800;color:#fbbf24;font-size:14px">40 Frequencies</div><div style="font-size:11px;color:var(--dim);margin-top:4px">Solfeggio · Angels · Schumann</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#34d39930" onclick="go('nature')"><div style="font-size:26px;margin-bottom:6px">🌿</div><div style="font-weight:800;color:#34d399;font-size:14px">Nature Portal</div><div style="font-size:11px;color:var(--dim);margin-top:4px">6 immersive soundscapes</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#a78bfa30" onclick="go('protocol')"><div style="font-size:26px;margin-bottom:6px">⚡</div><div style="font-weight:800;color:#a78bfa;font-size:14px">9-Ether Protocol</div><div style="font-size:11px;color:var(--dim);margin-top:4px">7.83 Hz → 3,168 Hz</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#fb718530" onclick="go('love')"><div style="font-size:26px;margin-bottom:6px">💗</div><div style="font-weight:800;color:#fb7185;font-size:14px">Epigenetic Love</div><div style="font-size:11px;color:var(--dim);margin-top:4px">6-stage DNA repair</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#7c3aed30" onclick="go('vortex')"><div style="font-size:26px;margin-bottom:6px">🌀</div><div style="font-weight:800;color:#a78bfa;font-size:14px">Quantum Vortex</div><div style="font-size:11px;color:var(--dim);margin-top:4px">9-ether healing</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#fbbf2430" onclick="go('angels')"><div style="font-size:26px;margin-bottom:6px">👼</div><div style="font-weight:800;color:#fbbf24;font-size:14px">Angel Numbers</div><div style="font-size:11px;color:var(--dim);margin-top:4px">20 sacred frequencies</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#22c55e30" onclick="go('growth')"><div style="font-size:26px;margin-bottom:6px">🌱</div><div style="font-weight:800;color:#22c55e;font-size:14px">Growth Sound</div><div style="font-size:11px;color:var(--dim);margin-top:4px">8-step ascension journey</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#2dd4bf30" onclick="go('rituals')"><div style="font-size:26px;margin-bottom:6px">🔮</div><div style="font-weight:800;color:#2dd4bf;font-size:14px">Healing Rituals</div><div style="font-size:11px;color:var(--dim);margin-top:4px">6 complete protocols</div></div>
    <div class="card" style="text-align:center;cursor:pointer;touch-action:manipulation;border-color:#60a5fa30" onclick="go('journal')"><div style="font-size:26px;margin-bottom:6px">📓</div><div style="font-weight:800;color:#60a5fa;font-size:14px">Healing Journal</div><div style="font-size:11px;color:var(--dim);margin-top:4px">Track your transformation</div></div>
  </div>
  <div class="card" style="text-align:center;margin-top:4px"><div style="font-size:11px;color:var(--dim)">🔒 Universal Safety Promise · 528 Hz love carrier + 7.83 Hz Schumann anchor · Safe for all ages and animals</div></div>
</div>

<!-- ════════════ PLAYER ════════════ -->
<div class="page" id="page-player">
  <h1 class="grad-amber" style="margin-bottom:6px">🎵 Frequency Player</h1>
  <p class="sub" style="margin-bottom:18px;text-align:left">Use headphones for binaural effect · Set your intention · Tap a track then press Play</p>
  <div id="iosHint" style="background:#a78bfa15;border:1px solid #a78bfa40;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#c4b5fd;text-align:center;line-height:1.5">
  📱 <strong>Tip:</strong> Silent switch OFF · Volume up · Tap a track, then tap ▶ Play
</div>
  <div class="player-box" style="position:relative;">
    <!-- Track info -->
    <div id="pName" style="text-transform:uppercase;letter-spacing:0.08em;font-size:11px;color:#64748b;margin-bottom:6px;font-weight:700">✦ Select a frequency below ✦</div>

    <!-- Sacred orb + Hz display -->
    <div class="player-orb">
      <div class="player-hz" id="pHz" style="position:relative;z-index:2">—</div>
    </div>
    <div style="font-size:13px;color:#94a3b8;margin:-4px 0 2px;letter-spacing:0.05em;font-weight:600" id="pHzLabel">Hz</div>
    <div id="pBenefit" style="font-size:13px;color:#94a3b8;margin:6px 0 10px;line-height:1.5;min-height:18px"></div>

    <!-- Frequency visualizer canvas -->
    <canvas id="vizCanvas" height="48"></canvas>

    <!-- Progress bar -->
    <div class="progress-bar" style="margin-top:12px"><div class="progress-fill" id="pBar"></div></div>
    <div id="pTimer" style="font-size:11px;color:#475569;margin-bottom:12px;font-variant-numeric:tabular-nums">0:00</div>

    <!-- Play + Nature buttons -->
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;align-items:center">
      <button class="btn btn-primary btn-play-cosmic" id="playBtn" data-action="toggle" style="touch-action:manipulation;-webkit-appearance:none;min-width:150px;min-height:54px;font-size:18px;letter-spacing:0.5px;border-radius:30px;">▶ Play</button>
      <button class="nature-btn" id="natBtn" data-action="nature" style="touch-action:manipulation;-webkit-appearance:none;min-height:48px;">🌿 Nature</button>
    </div>

    <!-- Volume -->
    <div style="display:flex;align-items:center;gap:10px;margin:0 0 14px;padding:0 6px">
      <span style="font-size:15px;line-height:1">🔊</span>
      <input type="range" id="volSlider" min="1" max="100" value="70" oninput="setVol(this.value)" style="flex:1;touch-action:manipulation">
      <span id="volLabel" style="font-size:12px;color:#64748b;min-width:34px;text-align:right;font-variant-numeric:tabular-nums">70%</span>
    </div>

    <!-- Affirmation -->
    <div class="affirmation" id="pAff"></div>

    <!-- Wave type selector -->
    <div style="display:flex;gap:6px;justify-content:center;margin-top:16px;flex-wrap:wrap">
      <button class="wave-btn active" id="wSine" data-wave="sine" style="touch-action:manipulation">Sine</button>
      <button class="wave-btn" id="wTri" data-wave="triangle" style="touch-action:manipulation">Triangle</button>
      <button class="wave-btn" id="wSaw" data-wave="sawtooth" style="touch-action:manipulation">Sawtooth</button>
      <button class="wave-btn" id="wSq" data-wave="square" style="touch-action:manipulation">Square</button>
    </div>
  </div>
  <div class="filter-row" id="catFilter">
    <button class="filter-btn active" onclick="fCat('All',this)">All</button>
    <button class="filter-btn" onclick="fCat('Body',this)">🧬 Body</button>
    <button class="filter-btn" onclick="fCat('Mind',this)">🧠 Mind</button>
    <button class="filter-btn" onclick="fCat('Spirit',this)">✨ Spirit</button>
    <button class="filter-btn" onclick="fCat('Wealth',this)">💛 Wealth</button>
    <button class="filter-btn" onclick="fCat('Love',this)">💗 Love</button>
    <button class="filter-btn" onclick="fCat('Nature',this)">🌿 Nature</button>
    <button class="filter-btn" onclick="fCat('Cleansing',this)">🔮 Cleanse</button>
  </div>
  <div id="trackList"></div>
</div>

<!-- ════════════ ANGEL NUMBERS ════════════ -->
<div class="page" id="page-angels">
  <h1 class="grad-amber" style="margin-bottom:6px">👼 Angel Number Frequencies</h1>
  <p class="sub" style="text-align:left;margin-bottom:18px">Each angel number carries a divine message. Tap to activate its sacred tone and receive its blessing.</p>
  <div id="angelGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px"></div>
</div>

<!-- ════════════ EPIGENETIC LOVE ════════════ -->
<div class="page" id="page-love">
  <h1 class="grad-rose" style="margin-bottom:6px">💗 Epigenetic Love Protocol</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">A 6-stage DNA repair journey using love-based frequencies to restore heart coherence, release ancestral trauma, and activate your highest expression of love.</p>
  <div style="text-align:center;margin-bottom:24px">
    <button class="love-btn" id="loveBigBtn" onclick="loveFieldToggle()">
      <div style="font-size:30px">💗</div>
      <div id="loveBigTxt">Activate Love Field</div>
      <div style="font-size:10px;opacity:0.7">All 6 dimensions</div>
    </button>
  </div>
  <div class="card" style="margin-bottom:18px;border-color:#fb718530;background:linear-gradient(135deg,#be185d08,#7c3aed08)">
    <div style="font-size:12px;color:var(--dim);margin-bottom:8px">The Love Field activates simultaneously:</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      <span style="padding:3px 10px;background:#be185d20;color:#fda4af;border-radius:999px;font-size:11px;font-weight:700">528 Hz DNA Repair</span>
      <span style="padding:3px 10px;background:#7c3aed20;color:#c4b5fd;border-radius:999px;font-size:11px;font-weight:700">639 Hz Heart</span>
      <span style="padding:3px 10px;background:#be185d20;color:#fda4af;border-radius:999px;font-size:11px;font-weight:700">285 Hz Cells</span>
      <span style="padding:3px 10px;background:#7c3aed20;color:#c4b5fd;border-radius:999px;font-size:11px;font-weight:700">417 Hz Release</span>
      <span style="padding:3px 10px;background:#be185d20;color:#fda4af;border-radius:999px;font-size:11px;font-weight:700">396 Hz Freedom</span>
      <span style="padding:3px 10px;background:#7c3aed20;color:#c4b5fd;border-radius:999px;font-size:11px;font-weight:700">963 Hz Divine</span>
      <span style="padding:3px 10px;background:#34d39920;color:#86efac;border-radius:999px;font-size:11px;font-weight:700">7.83 Hz Earth</span>
    </div>
  </div>
  <div class="section-label">6-Stage Journey — Tap a Stage to Activate</div>
  <div id="loveStages"></div>
</div>

<!-- ════════════ QUANTUM VORTEX ════════════ -->
<div class="page" id="page-vortex">
  <h1 class="grad-violet" style="margin-bottom:6px">🌀 Quantum Healing Vortex</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">9-ether quantum healing targeting cellular, spiritual, and dimensional levels simultaneously. Uses Rife-inspired tremolo and Violet Flame (417 Hz) for pathogenic transmutation.</p>
  <div style="text-align:center;margin-bottom:22px">
    <div class="vortex-ring" id="vortexRing"><div style="font-size:36px;animation:vcPulse 2s ease-in-out infinite" id="vortexCore">🌀</div></div>
    <div id="vortexSt" style="font-size:12px;color:var(--dim);margin:10px 0">Select intensity · Choose target · Activate</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" id="vortexBtn" onclick="vortexToggle()">⚡ Activate Vortex</button>
      <button class="btn btn-secondary" onclick="vortexStop()">■ Stop</button>
    </div>
  </div>
  <style>@keyframes vcPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}</style>
  <div class="section-label">Intensity</div>
  <div class="filter-row">
    <button class="filter-btn active" id="vi0" onclick="vSetI(0,this)">🌱 Gentle</button>
    <button class="filter-btn" id="vi1" onclick="vSetI(1,this)">⚡ Standard</button>
    <button class="filter-btn" id="vi2" onclick="vSetI(2,this)">🔥 Maximum</button>
  </div>
  <div class="section-label">Target Being</div>
  <div id="vBeingGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px;margin-bottom:18px"></div>
  <div class="section-label">Frequency Architecture</div>
  <div class="grid2">
    <div class="card" style="border-color:#ef444430"><div style="font-weight:700;color:#fca5a5;margin-bottom:6px;font-size:13px">🔴 Physical + Cellular</div><div style="font-size:12px;color:var(--dim)">174 · 333 · 40 Hz gamma · Rife 4 Hz tremolo</div><div style="font-size:11px;color:var(--dim);margin-top:4px">Targets: parasites, bacteria, fungi, viral loads</div></div>
    <div class="card" style="border-color:#a78bfa30"><div style="font-weight:700;color:#c4b5fd;margin-bottom:6px;font-size:13px">💜 Etheric + Mental</div><div style="font-size:12px;color:var(--dim)">396 · 417 · 741 · 852 Hz</div><div style="font-size:11px;color:var(--dim);margin-top:4px">Targets: entity attachments, mind loops, implants</div></div>
    <div class="card" style="border-color:#fbbf2430"><div style="font-weight:700;color:#fde68a;margin-bottom:6px;font-size:13px">☀️ Supreme Tiers</div><div style="font-size:12px;color:var(--dim)">1,296 · 2,160 · 3,168 Hz</div><div style="font-size:11px;color:var(--dim);margin-top:4px">Angelic Threshold · Solar Harmonic · Christ Grid</div></div>
    <div class="card" style="border-color:#34d39930"><div style="font-weight:700;color:#86efac;margin-bottom:6px;font-size:13px">🛡️ Safety Anchors</div><div style="font-size:12px;color:var(--dim)">528 Hz love carrier · 7.83 Hz Schumann</div><div style="font-size:11px;color:var(--dim);margin-top:4px">Continuous protection — healthy cells strengthen</div></div>
  </div>
</div>

<!-- ════════════ NATURE PORTAL ════════════ -->
<div class="page" id="page-nature">
  <h1 class="grad-green" style="margin-bottom:6px">🌿 Nature & Ether Portal</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">6 immersive soundscapes — each paired with a sacred healing frequency. Amazon forest, Sacred Ocean, Earth Heartbeat, the Ether, Sacred Fire, and Cosmic Void.</p>
  <div class="section-label">Soundscapes — Tap to Activate</div>
  <div class="grid2" id="natureGrid"></div>
  <div class="section-label" style="margin-top:20px">Primal Frequencies</div>
  <div id="primalGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px"></div>
</div>

<!-- ════════════ GROWTH SOUND ════════════ -->
<div class="page" id="page-growth">
  <h1 class="grad-green" style="margin-bottom:6px">🌱 Growth Sound Architecture</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">6 growth dimensions with binaural beat layers + an 8-step Master Ascension Sequence. Each layer targets a specific dimension of human growth.</p>
  <div style="text-align:center;margin-bottom:22px">
    <button class="btn btn-green" id="masterBtn" onclick="masterToggle()">🌱 Start Master Sequence</button>
    <div id="masterSt" style="font-size:12px;color:var(--dim);margin-top:8px">8 stages · 2 min each · Full spectrum ascension</div>
  </div>
  <div class="section-label">Growth Dimensions — Tap to Activate Each Layer</div>
  <div id="growthGrid"></div>
  <div class="section-label">Master Sequence Steps</div>
  <div id="masterSteps"></div>
</div>

<!-- ════════════ RITUALS ════════════ -->
<div class="page" id="page-rituals">
  <h1 class="grad-teal" style="margin-bottom:6px">🔮 Healing Rituals</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">6 complete frequency protocols — curated sequences that work synergistically for maximum healing impact. Tap a ritual to expand and activate.</p>
  <div id="ritualList"></div>
</div>

<!-- ════════════ JOURNAL ════════════ -->
<div class="page" id="page-journal">
  <h1 class="grad-violet" style="margin-bottom:6px">📓 Healing Journal</h1>
  <p class="sub" style="text-align:left;margin-bottom:18px">Track your transformation. Your healing journey is sacred data.</p>
  <div class="grid3" style="margin-bottom:16px">
    <div class="card" style="text-align:center"><div style="font-size:24px;margin-bottom:4px">🧘</div><div style="font-size:20px;font-weight:900" id="jStatSessions">0</div><div style="font-size:11px;color:var(--dim)">Total Sessions</div></div>
    <div class="card" style="text-align:center"><div style="font-size:24px;margin-bottom:4px">⭐</div><div style="font-size:20px;font-weight:900" id="jStatRating">—</div><div style="font-size:11px;color:var(--dim)">Avg. Rating</div></div>
    <div class="card" style="text-align:center"><div style="font-size:24px;margin-bottom:4px">🌟</div><div style="font-size:20px;font-weight:900" id="jStatTrans">0</div><div style="font-size:11px;color:var(--dim)">Transformations</div></div>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-bottom:14px">
    <button class="btn btn-primary" onclick="jToggleForm()">+ Log Session</button>
  </div>
  <div id="jForm" style="display:none" class="card" style="margin-bottom:16px;border-color:#7c3aed40">
    <div style="font-weight:800;font-size:15px;margin-bottom:14px">New Healing Session</div>
    <div class="grid2">
      <div style="margin-bottom:12px"><div style="font-size:11px;color:var(--dim);margin-bottom:5px">Session Name</div><input id="jName" placeholder="e.g. Morning DNA Activation"></div>
      <div style="margin-bottom:12px"><div style="font-size:11px;color:var(--dim);margin-bottom:5px">Date</div><input id="jDate" type="date"></div>
    </div>
    <div style="margin-bottom:12px"><div style="font-size:11px;color:var(--dim);margin-bottom:5px">Intention</div><input id="jInt" placeholder="What did you intend to heal, clear, or activate?"></div>
    <div class="grid2">
      <div style="margin-bottom:12px">
        <div style="font-size:11px;color:var(--dim);margin-bottom:6px">Mood Before</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="moodBefore"></div>
      </div>
      <div style="margin-bottom:12px">
        <div style="font-size:11px;color:var(--dim);margin-bottom:6px">Mood After</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="moodAfter"></div>
      </div>
    </div>
    <div class="grid2">
      <div style="margin-bottom:12px"><div style="font-size:11px;color:var(--dim);margin-bottom:5px">Duration (min)</div><input id="jDur" type="number" value="20" min="1" max="300"></div>
      <div style="margin-bottom:12px"><div style="font-size:11px;color:var(--dim);margin-bottom:5px">Rating: <span id="jRatLbl">7</span>/10</div><input id="jRat" type="range" min="1" max="10" value="7" oninput="document.getElementById('jRatLbl').textContent=this.value" style="padding:0;border:none;background:transparent;height:20px"></div>
    </div>
    <div style="margin-bottom:12px"><div style="font-size:11px;color:var(--dim);margin-bottom:5px">Notes & Experiences</div><textarea id="jNotes" rows="3" placeholder="What did you feel, see, or experience?"></textarea></div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" onclick="jSave()">✓ Save Session</button>
      <button class="btn btn-secondary" onclick="jToggleForm()">Cancel</button>
    </div>
  </div>
  <div id="jList"></div>
</div>

<!-- ════════════ GUIDE ════════════ -->
<div class="page" id="page-guide">
  <h1 class="grad-violet" style="margin-bottom:6px">📖 Frequency Science Guide</h1>
  <p class="sub" style="text-align:left;margin-bottom:22px">The science and sacred knowledge behind healing frequencies. Tap any topic to expand.</p>
  <div id="guideList"></div>
  <div class="section-label">Full Frequency Reference</div>
  <div id="freqRef"></div>
</div>

<!-- ════════════ PROTOCOL ════════════ -->
<div class="page" id="page-protocol">
  <h1 class="grad-main" style="margin-bottom:6px">⚡ 9-Ether Irradiation Protocol</h1>
  <p class="sub" style="text-align:left;margin-bottom:20px">Supreme Resonance + Full Lunar Balance · 9 etheric dimensions · 3 supreme tiers · 4 lunar phases · All beings · All timelines</p>
  <div class="card" style="text-align:center;border-color:#7c3aed50;margin-bottom:18px;background:linear-gradient(135deg,#0f0726,#0c1a2e)">
    <div style="font-size:13px;color:#a78bfa;font-weight:800;margin-bottom:8px">✦ Full Protocol — Print / Download Available</div>
    <div style="font-size:12px;color:var(--dim);margin-bottom:16px">Complete Supreme + Lunar edition with all 9 ethers, affirmations, species modulation, lunar resonance engine, and print-to-PDF</div>
    <a href="https://superagent-1dadce0f.base44.app/functions/serveProtocol" target="_blank" class="btn btn-primary" style="text-decoration:none">⚡ Open Full Protocol</a>
  </div>
  <div class="section-label">Run Protocol Here</div>
  <div style="text-align:center;margin-bottom:20px">
    <div class="vortex-ring" id="protRing" style="border-color:#fb718550"><div style="font-size:32px">⚡</div></div>
    <div id="protSt" style="font-size:12px;color:var(--dim);margin:10px 0">Select ether layers then activate</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" id="protBtn" onclick="protToggle()" style="background:linear-gradient(135deg,#dc2626,#7c3aed)">⚡ Irradiate Now</button>
      <button class="btn btn-secondary" onclick="protStop()">■ Stop</button>
    </div>
  </div>
  <div class="section-label">The 9 Ethers</div>
  <div id="protEthers"></div>
  <div class="section-label">Lunar Resonance</div>
  <div id="protLunar" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px"></div>
</div>

<script>
// ═══════════════════════════════ DATA ═══════════════════════════════
const TRACKS=[
  {n:"111 Hz — Angel Number · New Beginnings",hz:111,cat:"Spirit",ben:"Awakens manifestation power and new beginnings",ch:"Crown",aff:"I am aligned with divine timing. My thoughts create my reality now."},
  {n:"222 Hz — Angel Number · Balance & Harmony",hz:222,cat:"Love",ben:"Restores balance, harmony, and divine partnerships",ch:"Heart",aff:"Everything is in divine balance. My partnerships are blessed and harmonious."},
  {n:"333 Hz — Angel Number · Ascended Masters",hz:333,cat:"Spirit",ben:"Connects with ascended masters and divine guidance",ch:"Throat & Crown",aff:"I am surrounded by divine masters. Creative wisdom flows through me perfectly."},
  {n:"444 Hz — Angel Number · Protection & Foundation",hz:444,cat:"Body",ben:"Builds unshakeable foundations and angelic protection",ch:"Root & Earth Star",aff:"I am divinely protected. My foundations are solid, strong, and eternal."},
  {n:"555 Hz — Angel Number · Transformation & Change",hz:555,cat:"Cleansing",ben:"Accelerates positive change and life transformation",ch:"Solar Plexus & Throat",aff:"I welcome transformation. I release the old with grace and embrace my new reality."},
  {n:"666 Hz — Angel Number · Rebalance & Compassion",hz:666,cat:"Mind",ben:"Rebalances overthinking and activates heart wisdom",ch:"Heart & Third Eye",aff:"My mind and heart are in perfect harmony. I think and feel with love."},
  {n:"777 Hz — Angel Number · Divine Luck & Wisdom",hz:777,cat:"Spirit",ben:"Activates divine luck, spiritual wisdom, and sacred knowledge",ch:"Crown & Soul Star",aff:"I walk the sacred path. Divine wisdom and luck flow to me effortlessly."},
  {n:"888 Hz — Angel Number · Infinite Abundance",hz:888,cat:"Wealth",ben:"Opens infinite financial abundance and material mastery",ch:"Solar Plexus & Crown",aff:"I am an infinite channel for abundance. Wealth flows to me from all directions."},
  {n:"999 Hz — Angel Number · Completion & Release",hz:999,cat:"Cleansing",ben:"Completes karmic cycles and clears what no longer serves",ch:"All Chakras",aff:"I complete all karmic cycles with grace. I am free and ready for my highest calling."},
  {n:"1111 Hz — Angel Number · Manifestation Portal",hz:1111,cat:"Spirit",ben:"Opens the cosmic manifestation portal — thoughts become reality",ch:"Soul Star & Crown",aff:"The portal is open. My highest intentions are now manifesting in perfect divine timing."},
  {n:"1212 Hz — Angel Number · Spiritual Growth",hz:1212,cat:"Spirit",ben:"Accelerates spiritual growth and divine awakening",ch:"Crown & Third Eye",aff:"I am rapidly evolving. My spirit expands into greater light with every breath."},
  {n:"1234 Hz — Angel Number · Divine Progression",hz:1234,cat:"Mind",ben:"Aligns life steps with divine order and natural progression",ch:"Solar Plexus & Crown",aff:"I trust the divine steps of my journey. Each day I progress perfectly."},
  {n:"2222 Hz — Angel Number · Master Builder",hz:2222,cat:"Wealth",ben:"Activates the master builder frequency for creating lasting legacy",ch:"Root & Crown",aff:"I am a master builder. What I create is magnificent, lasting, and divinely inspired."},
  {n:"3333 Hz — Angel Number · Trinity Activation",hz:3333,cat:"Spirit",ben:"Activates the holy trinity of body, mind, and spirit simultaneously",ch:"All Chakras Unified",aff:"Body, mind and spirit are perfectly unified. I am whole, holy, and complete."},
  {n:"4444 Hz — Angel Number · Celestial Fortress",hz:4000,lbl:"4444 Hz",cat:"Body",ben:"Maximum divine protection and physical fortress energy",ch:"Root, Sacral, Solar Plexus, Heart",aff:"I am fully protected on all levels. Nothing of low vibration may enter my field."},
  {n:"5555 Hz — Angel Number · Mass Transformation",hz:4000,lbl:"5555 Hz",cat:"Cleansing",ben:"Quantum leap frequency — instant massive life transformation",ch:"All Chakras",aff:"I quantum leap into my highest timeline now. My transformation is total and immediate."},
  {n:"6666 Hz — Angel Number · Unconditional Love Field",hz:4000,lbl:"6666 Hz",cat:"Love",ben:"Generates a field of pure unconditional love and compassion",ch:"Heart & Higher Heart",aff:"I radiate unconditional love. My heart is a sun that warms every soul I meet."},
  {n:"7777 Hz — Angel Number · Supreme Sacred Luck",hz:4000,lbl:"7777 Hz",cat:"Wealth",ben:"Maximum divine luck and spiritual fortune activation",ch:"All Seven Major Chakras",aff:"I am divinely lucky. Miracles, synchronicities, and blessings surround me always."},
  {n:"8888 Hz — Angel Number · Infinite Financial Mastery",hz:4000,lbl:"8888 Hz",cat:"Wealth",ben:"Opens all financial channels simultaneously — maximum abundance",ch:"All Chakras — Financial Axis",aff:"All doors of abundance are open to me. I am an infinite magnet for wealth and prosperity."},
  {n:"9999 Hz — Angel Number · Divine Completion & Ascension",hz:4000,lbl:"9999 Hz",cat:"Spirit",ben:"Complete spiritual ascension and soul graduation frequency",ch:"Soul Star & Beyond",aff:"I have completed my karmic journey. I ascend into pure light and divine service."},
  {n:"174 Hz — Pain Relief & Security",hz:174,cat:"Body",ben:"Natural anesthetic — reduces physical and energetic pain",ch:"Earth Star",aff:"I am safe. My body heals naturally and completely."},
  {n:"285 Hz — Tissue Regeneration",hz:285,cat:"Body",ben:"Heals and regenerates tissues and organs",ch:"Root",aff:"Every cell in my body regenerates and thrives."},
  {n:"396 Hz — Liberation from Fear & Guilt",hz:396,cat:"Cleansing",ben:"Releases fear, guilt, and grief — grounds and stabilizes",ch:"Root",aff:"I release all guilt and fear. I am free to live fully."},
  {n:"417 Hz — Transmutation of Negativity",hz:417,cat:"Cleansing",ben:"Undoes situations and facilitates change — clears trauma",ch:"Sacral",aff:"I embrace change. All negative energy leaves my field now."},
  {n:"432 Hz — Nature's Tuning — Heart Coherence",hz:432,cat:"Nature",ben:"Aligns with natural resonance of the universe and Earth",ch:"Heart",aff:"I am in perfect harmony with nature and the cosmos."},
  {n:"528 Hz — DNA Repair & Miracle Frequency",hz:528,cat:"Body",ben:"Repairs DNA, increases life energy, clarity & peace",ch:"Solar Plexus",aff:"My DNA heals perfectly. I am a miracle in motion."},
  {n:"639 Hz — Relationships & Heart Opening",hz:639,cat:"Love",ben:"Harmonizes relationships, enhances communication and love",ch:"Heart",aff:"Love flows freely through me. All my relationships are harmonious."},
  {n:"741 Hz — Detox & Awakening Intuition",hz:741,cat:"Cleansing",ben:"Cleanses cells, detoxifies body, expands consciousness",ch:"Throat",aff:"I release all toxins. My intuition guides me clearly."},
  {n:"852 Hz — Spiritual Order & Third Eye",hz:852,cat:"Spirit",ben:"Returns to spiritual order, awakens intuition and inner strength",ch:"Third Eye",aff:"My inner vision is clear. I am guided by divine wisdom."},
  {n:"963 Hz — Crown Activation & Divine Connection",hz:963,cat:"Spirit",ben:"Activates the pineal gland and connects to higher consciousness",ch:"Crown",aff:"I am one with the divine. My crown is open and radiant."},
  {n:"40 Hz — Gamma Brain — Focus & Longevity",hz:40,cat:"Mind",ben:"Enhances cognitive function, memory, and neuroplasticity",ch:"Crown",aff:"My mind is sharp, clear, and constantly evolving."},
  {n:"7.83 Hz — Schumann Resonance — Earth Alignment",hz:7.83,cat:"Nature",ben:"Aligns with Earth's electromagnetic frequency",ch:"Root & Heart",aff:"I am grounded in the Earth. I move with the pulse of life."},
  {n:"10 Hz — Alpha Relaxation — Stress Release",hz:10,cat:"Mind",ben:"Deep relaxation, stress reduction, pain relief",ch:"Third Eye",aff:"I am deeply relaxed. Peace is my natural state."},
  {n:"528 Hz + 432 Hz Blend — Love & Nature Fusion",hz:528,cat:"Love",ben:"Supreme healing blend for heart and body",ch:"Heart & Crown",aff:"I am love. I heal completely. I am nature."},
  {n:"888 Hz — Abundance & Wealth Activation",hz:888,cat:"Wealth",ben:"Activates abundance mindset and financial flow",ch:"Solar Plexus & Crown",aff:"Abundance flows to me easily and naturally. I am a magnet for wealth."},
  {n:"111 Hz — Cellular Regeneration & Light Body",hz:111,cat:"Body",ben:"Activates cellular regeneration and light body awakening",ch:"Crown & Heart",aff:"I am light. Every cell in my body radiates perfect health and divine energy."},
  {n:"432 Hz — Deep Sleep & Nervous System Reset",hz:432,cat:"Mind",ben:"Induces deep restorative sleep and resets the nervous system",ch:"All Chakras",aff:"I release the day with gratitude. I sleep deeply and wake renewed."},
  {n:"528 Hz — Self Love & Worthiness",hz:528,cat:"Love",ben:"Cultivates deep self-love, self-worth, and inner radiance",ch:"Heart & Solar Plexus",aff:"I am worthy of all good things. I love and accept myself completely."},
  {n:"963 Hz — Pineal Activation & Third Eye Opening",hz:963,cat:"Spirit",ben:"Activates the pineal gland for heightened intuition and vision",ch:"Third Eye & Crown",aff:"My third eye opens fully. I see the truth of all things with clarity and love."},
  {n:"741 Hz — Electromagnetic Protection & Clarity",hz:741,cat:"Cleansing",ben:"Shields from EMF, clears confusion, and strengthens boundaries",ch:"Throat & Solar Plexus",aff:"I am protected from all harmful frequencies. My energy field is clear and strong."}
];
const CC={Body:"#ef4444",Mind:"#60a5fa",Spirit:"#a78bfa",Wealth:"#fbbf24",Nature:"#34d399",Love:"#f472b6",Cleansing:"#2dd4bf"};

const LOVE_STAGES=[
  {name:"Self Love",hz:[528,174],icon:"💝",desc:"DNA repair + pain release. Activate unconditional love for every part of yourself.",col:"#fb7185"},
  {name:"Cellular Love",hz:[285,528],icon:"🧬",desc:"Tissue regeneration + DNA repair. Heal at the deepest biological level.",col:"#f472b6"},
  {name:"Heart Coherence",hz:[639],icon:"💗",desc:"Activate your heart's toroidal field — 5,000× stronger than the brain.",col:"#ec4899"},
  {name:"Ancestral Love",hz:[417,396],icon:"🌳",desc:"Clear ancestral trauma and family karmic loops with unconditional love.",col:"#a78bfa"},
  {name:"Divine Love",hz:[963,528],icon:"✨",desc:"Universal love source through pineal activation + DNA repair.",col:"#8b5cf6"},
  {name:"Universal Love",hz:[963,7.83],icon:"🌍",desc:"Merge with the love frequency of all creation. Pure union with source.",col:"#7c3aed"},
];

const NATURE_SCENES=[
  {id:"amazon",name:"Amazon Rainforest",icon:"🌳",desc:"Brown noise forest base with bird calls and rain. The oldest healing soundscape on Earth.",hz:432,col:"#22c55e"},
  {id:"ocean",name:"Sacred Ocean",icon:"🌊",desc:"Deep ocean waves with sea breeze overtones — grounding, ancient, infinite.",hz:7.83,col:"#06b6d4"},
  {id:"earth",name:"Earth's Heartbeat",icon:"🌍",desc:"Pure 7.83 Hz Schumann resonance with delta and theta entrainment.",hz:7.83,col:"#f59e0b"},
  {id:"ether",name:"The Ether",icon:"✦",desc:"432 Hz crystal bowls with 963 Hz cosmic shimmer. The fifth element.",hz:432,col:"#a78bfa"},
  {id:"fire",name:"Sacred Fire",icon:"🔥",desc:"Primal fire crackle with 417 Hz transformation tone — burn away what no longer serves.",hz:417,col:"#ef4444"},
  {id:"cosmos",name:"Cosmic Void",icon:"🌌",desc:"Deep space drone, pulsar rhythms, and the resonant hum of the universe.",hz:963,col:"#818cf8"},
];

const PRIMAL_FREQS=[
  {hz:40,name:"Gamma Activation",desc:"Neural synchrony · whole-brain coherence",col:"#f472b6"},
  {hz:7.83,name:"Schumann Resonance",desc:"Earth's heartbeat · baseline of all life",col:"#34d399"},
  {hz:1,name:"Delta Deep Healing",desc:"Deep sleep · cellular repair",col:"#60a5fa"},
  {hz:4,name:"Theta Gateway",desc:"Waking / sleep threshold · pure intuition",col:"#a78bfa"},
  {hz:10,name:"Alpha Calm",desc:"Relaxed awareness · flow state",col:"#fbbf24"},
  {hz:20,name:"Beta Focus",desc:"Active thinking · sharp focus",col:"#fb923c"},
];

const GROWTH_LAYERS=[
  {id:"physical",name:"Physical Growth",icon:"🧬",col:"#ef4444",hz:285,subHz:111,beatHz:7.83,desc:"285 Hz tissue regeneration + 111 Hz euphoria + 7.83 Hz binaural beat",aff:"I am rebuilding stronger, healthier, and more vital with every breath"},
  {id:"mental",name:"Mental Growth",icon:"🧠",col:"#60a5fa",hz:40,subHz:14,beatHz:10,desc:"40 Hz gamma whole-brain coherence + 14 Hz beta focus + 10 Hz binaural",aff:"My mind expands beyond all previous limits. New neural pathways open effortlessly"},
  {id:"emotional",name:"Emotional Growth",icon:"💗",col:"#f472b6",hz:639,subHz:528,beatHz:3.5,desc:"639 Hz heart harmony + 528 Hz love miracle + 3.5 Hz theta binaural",aff:"I feel everything fully and beautifully. My emotional range is my greatest gift"},
  {id:"spiritual",name:"Spiritual Growth",icon:"✨",col:"#a78bfa",hz:963,subHz:852,beatHz:7,desc:"963 Hz crown + 852 Hz third eye + 7 Hz theta binaural",aff:"I expand into infinite consciousness. My spirit grows beyond all boundaries"},
  {id:"nature",name:"Nature Alignment",icon:"🌿",col:"#34d399",hz:432,subHz:7.83,beatHz:0,desc:"432 Hz universal tuning + 7.83 Hz Schumann — synchronize with the living Earth",aff:"I am one with the natural world. Nature's intelligence flows through every cell"},
  {id:"abundance",name:"Abundance Growth",icon:"💎",col:"#fbbf24",hz:888,subHz:417,beatHz:4,desc:"888 Hz infinite abundance + 417 Hz block clearing + 4 Hz theta reprogramming",aff:"I grow into my greatest prosperity. Abundance is my natural state of being"},
];

const MASTER_SEQUENCE=[
  {name:"Awaken",hz:285,desc:"Cells begin activating",col:"#ef4444"},
  {name:"Open",hz:528,desc:"Heart and DNA unlock",col:"#f472b6"},
  {name:"Expand",hz:639,desc:"Emotional field widens",col:"#f472b6"},
  {name:"Rise",hz:432,desc:"Align with universal growth",col:"#34d399"},
  {name:"Ignite",hz:40,desc:"Gamma — whole brain coherence",col:"#60a5fa"},
  {name:"Magnetise",hz:888,desc:"Abundance codes activate",col:"#fbbf24"},
  {name:"Ascend",hz:963,desc:"Crown opens — infinite potential",col:"#a78bfa"},
  {name:"Become",hz:1111,desc:"Manifestation portal — you arrive",col:"#ffffff"},
];

const RITUALS=[
  {title:"🌅 Morning Activation",sub:"Start each day fully aligned",dur:"45 min",col:"#fbbf24",border:"#fbbf2430",bg:"from-amber-950/60 to-yellow-950/40",
   steps:[
    {time:"5 min",freq:"7.83 Hz",name:"Grounding",desc:"Before rising, connect to Earth's pulse. Breathe deeply."},
    {time:"10 min",freq:"528 Hz",name:"DNA Activation",desc:"Open your heart. Affirmation: Today I am reborn."},
    {time:"10 min",freq:"432 Hz",name:"Nature Alignment",desc:"Sit in natural light. Let universal frequency attune your system."},
    {time:"10 min",freq:"396 Hz",name:"Fear Release",desc:"Consciously release anything that doesn't belong to today."},
    {time:"10 min",freq:"888 Hz",name:"Wealth Activation",desc:"Visualize your abundance flowing in. Feel it as already real."},
   ],ben:["Boosts cortisol balance","Sets abundance mindset","Clears overnight energetic debris","Activates DNA repair cycle"]},
  {title:"🔮 Deep Energetic Cleanse",sub:"Remove all negativity from your field",dur:"60 min",col:"#2dd4bf",border:"#2dd4bf30",bg:"from-teal-950/60 to-cyan-950/40",
   steps:[
    {time:"10 min",freq:"396 Hz",name:"Root Liberation",desc:"Scan for fear and guilt. Breathe and release."},
    {time:"15 min",freq:"417 Hz",name:"Trauma Transmutation",desc:"Invite frequency into stored pain. Transform, not suppress."},
    {time:"10 min",freq:"741 Hz",name:"Cellular Detox",desc:"Visualize light purging every cell of toxins."},
    {time:"15 min",freq:"528 Hz",name:"DNA Restoration",desc:"Fill newly empty space with love, light, and perfect health."},
    {time:"10 min",freq:"963 Hz",name:"Divine Reconnection",desc:"From a clean state, reconnect with your highest self."},
   ],ben:["Eliminates ancestral patterns","Clears electromagnetic smog","Releases stored trauma","Resets your entire energetic field"]},
  {title:"🧬 Longevity & Body Healing",sub:"Activate your innate regenerative intelligence",dur:"75 min",col:"#ef4444",border:"#ef444430",bg:"from-rose-950/60 to-red-950/40",
   steps:[
    {time:"15 min",freq:"174 Hz",name:"Pain Relief",desc:"Begin at the lowest Solfeggio. Allow physical pain to dissolve."},
    {time:"15 min",freq:"285 Hz",name:"Tissue Regeneration",desc:"Direct awareness to any area needing healing. Visualize cells rebuilding."},
    {time:"15 min",freq:"111 Hz",name:"Cell Euphoria",desc:"Let 111 Hz trigger your body's natural endorphin release."},
    {time:"15 min",freq:"528 Hz",name:"DNA Miracle Frequency",desc:"Breathe into your DNA spiral. Feel it repairing perfectly."},
    {time:"15 min",freq:"40 Hz",name:"Gamma Brain Renewal",desc:"Activate neuroplasticity. See new neural pathways forming."},
   ],ben:["DNA repair activation","Pain relief","Cognitive longevity boost","Immune system optimization"]},
  {title:"💗 Love & Heart Opening",sub:"Expand your capacity to give and receive love",dur:"50 min",col:"#f472b6",border:"#f472b630",bg:"from-pink-950/60 to-rose-950/40",
   steps:[
    {time:"10 min",freq:"528 Hz",name:"Love Foundation",desc:"Feel the miracle tone open your heart. Breathe love into every cell."},
    {time:"15 min",freq:"639 Hz",name:"Heart Harmony",desc:"Bring relationships to mind. Send healing to any broken bonds."},
    {time:"10 min",freq:"432 Hz",name:"Unconditional Love",desc:"Love at the frequency of the universe — boundless and infinite."},
    {time:"15 min",freq:"528 + 432 Hz",name:"Love & Nature Fusion",desc:"The supreme blend. Rest in a field of pure love."},
   ],ben:["Opens heart chakra","Heals relationship trauma","Attracts loving experiences","Deepens self-love"]},
  {title:"💎 Wealth & Abundance",sub:"Reprogram your money mindset at the cellular level",dur:"40 min",col:"#fbbf24",border:"#fbbf2430",bg:"from-yellow-950/60 to-amber-950/40",
   steps:[
    {time:"10 min",freq:"417 Hz",name:"Scarcity Clearing",desc:"Release all inherited beliefs about money being hard to get."},
    {time:"15 min",freq:"888 Hz",name:"Abundance Frequency",desc:"888 — infinite abundance. Feel wealth as your natural birthright."},
    {time:"10 min",freq:"528 Hz",name:"Manifestation Field",desc:"Your DNA now codes for abundance. Every cell vibrates with prosperity."},
    {time:"5 min",freq:"1111 Hz",name:"Manifestation Gateway",desc:"Set your specific wealth intention through this dimensional gateway."},
   ],ben:["Dissolves scarcity programming","Opens manifestation channels","Accelerates law of attraction"]},
  {title:"👁️ Spiritual Awakening",sub:"Connect with your highest divine self",dur:"60 min",col:"#a78bfa",border:"#a78bfa30",bg:"from-violet-950/60 to-purple-950/40",
   steps:[
    {time:"10 min",freq:"7.83 Hz",name:"Earth Grounding",desc:"Ground deeply before ascending. High connection needs deep roots."},
    {time:"15 min",freq:"852 Hz",name:"Third Eye Activation",desc:"Focus on the space between your brows. Feel indigo light expanding."},
    {time:"15 min",freq:"963 Hz",name:"Crown Opening",desc:"The God frequency. Feel violet-white light pouring in from above."},
    {time:"10 min",freq:"1111 Hz",name:"Dimensional Gateway",desc:"Enter the gateway of manifestation. Thoughts become reality here."},
    {time:"10 min",freq:"432 Hz",name:"Cosmic Reintegration",desc:"Return with divine gifts. Reintegrate with peace, clarity, purpose."},
   ],ben:["Pineal gland activation","Third eye opening","Higher guidance access","Soul purpose alignment"]},
];

const ANGEL_NUMBERS=[
  {hz:111,sym:"✦",meaning:"New Beginnings",msg:"Your thoughts are manifesting — keep them positive",col:"#ffffff"},
  {hz:222,sym:"⚖",meaning:"Balance & Trust",msg:"Everything is falling into place",col:"#f9a8d4"},
  {hz:333,sym:"△",meaning:"Ascended Masters",msg:"You are surrounded by divine support",col:"#fcd34d"},
  {hz:444,sym:"◈",meaning:"Angelic Protection",msg:"Angels surround you — you are completely safe",col:"#fde68a"},
  {hz:555,sym:"⚡",meaning:"Major Change",msg:"Massive transformation is coming — welcome it",col:"#67e8f9"},
  {hz:666,sym:"♡",meaning:"Rebalance",msg:"Refocus — align your mind with your heart",col:"#fda4af"},
  {hz:777,sym:"✪",meaning:"Divine Luck",msg:"You are on the perfect path — miracles align",col:"#c4b5fd"},
  {hz:888,sym:"∞",meaning:"Infinite Abundance",msg:"Financial rewards and abundance flow to you now",col:"#6ee7b7"},
  {hz:999,sym:"◯",meaning:"Completion",msg:"A karmic cycle completes — prepare for your calling",col:"#fca5a5"},
  {hz:1111,sym:"⟡",meaning:"Manifestation Portal",msg:"Make a wish — your thoughts write into reality",col:"#e2e8f0"},
  {hz:1212,sym:"↑↑",meaning:"Spiritual Growth",msg:"Stay positive — your awakening accelerates",col:"#a5b4fc"},
  {hz:2222,sym:"⊞",meaning:"Master Builder",msg:"Build your legacy — the universe supports you",col:"#e5e7eb"},
  {hz:3333,sym:"⁂",meaning:"Trinity Activation",msg:"Body, mind and spirit align at the highest octave",col:"#fde68a"},
  {hz:4444,sym:"⬡",meaning:"Celestial Fortress",msg:"Four layers of angelic armor surround you",col:"#fcd34d"},
  {hz:5555,sym:"⚡⚡",meaning:"Quantum Leap",msg:"A total reality shift — leap into your highest timeline",col:"#f8fafc"},
  {hz:6666,sym:"❋",meaning:"Unconditional Love",msg:"Your heart radiates love that transforms all it touches",col:"#f9a8d4"},
  {hz:7777,sym:"✦✦",meaning:"Supreme Sacred Luck",msg:"Maximum divine fortune — miracles surround you",col:"#fde68a"},
  {hz:8888,sym:"∞∞",meaning:"Infinite Financial Mastery",msg:"All doors of abundance open simultaneously",col:"#6ee7b7"},
  {hz:9999,sym:"☽○☾",meaning:"Ascension & Soul Graduation",msg:"All karmic cycles complete — you ascend into pure light",col:"#f1f5f9"},
  {hz:1234,sym:"1→",meaning:"Divine Steps",msg:"Trust the process — you are progressing perfectly",col:"#86efac"},
];

const VORTEX_BEINGS=[
  {label:"Myself",icon:"🧍",mod:"1.00×"},
  {label:"My Family",icon:"👨‍👩‍👧",mod:"1.00×"},
  {label:"Child",icon:"👶",mod:"1.10×"},
  {label:"Elder",icon:"🧓",mod:"0.90×"},
  {label:"Pregnant",icon:"🤰",mod:"1.05×"},
  {label:"Dog",icon:"🐕",mod:"0.85×"},
  {label:"Cat",icon:"🐈",mod:"0.95×"},
  {label:"Horse",icon:"🐎",mod:"0.70×"},
  {label:"Bird",icon:"🐦",mod:"1.15×"},
  {label:"Reptile",icon:"🦎",mod:"0.80×"},
  {label:"Plant/Tree",icon:"🌿",mod:"0.60×"},
  {label:"All Beings",icon:"🌍",mod:"Universal"},
];

const PROTOCOL_ETHERS=[
  {num:1,name:"Physical",hz:"174 Hz + 40 Hz sub",targets:"Parasites, tissue masses, heavy metals, bone spurs",col:"#ef4444",aff:"Every physical blockage, every uninvited organism in my body dissolves now into perfect light."},
  {num:2,name:"Cellular",hz:"333 Hz + 111 Hz",targets:"Bacteria, fungi, viral loads, Candida, Lyme spirochetes",col:"#f97316",aff:"Every parasite, every pathogen reaches its mortal oscillatory rate and shatters into light."},
  {num:3,name:"Etheric",hz:"396 Hz + 417 Hz (Violet Flame)",targets:"Entity attachments, psychic cords, astral implants",col:"#f59e0b",aff:"Every cord, every entity feeding on my energy is severed. I am wholly free."},
  {num:4,name:"Emotional",hz:"528 Hz + 639 Hz",targets:"Trapped grief, rage, shame, fear, heartbreak codes",col:"#fb7185",aff:"Every trapped emotion is transmuted into pure, radiant love. My heart is free."},
  {num:5,name:"Mental",hz:"741 Hz + 852 Hz",targets:"Mind loops, psychic implants, hypnotic programming",col:"#8b5cf6",aff:"My mind is sovereign. Every harmful program dissolves in my perfect intelligence."},
  {num:6,name:"Ancestral",hz:"963 Hz + 1,111 Hz",targets:"Generational trauma, inherited disease codes, karmic loops",col:"#22c55e",aff:"I release all ancestral trauma now. My lineage is healed seven generations back and forward."},
  {num:7,name:"Spiritual",hz:"1,296 Hz (Angelic Threshold)",targets:"Dark soul contracts, false light traps, inverted programming",col:"#60a5fa",aff:"Every false contract is dissolved. I stand in pure divine light."},
  {num:8,name:"Quantum",hz:"2,160 Hz (Solar Harmonic)",targets:"Timeline anchors, parallel reality interference, scalar intrusions",col:"#f59e0b",aff:"My quantum field is clear. I exist in perfect harmonic resonance across all timelines."},
  {num:9,name:"Akashic",hz:"3,168 Hz (Christ Consciousness Grid)",targets:"Akashic distortions, soul wounds, original sin overlays",col:"#a78bfa",aff:"My soul record is restored to its original perfection. I AM the living expression of divine consciousness."},
];

const LUNAR_PHASES=[
  {phase:"🌑",name:"New Moon",hz:136.10,desc:"Maximum clearing power. Plant seeds of healing intention.",col:"#94a3b8"},
  {phase:"🌒",name:"Waxing Moon",hz:210.42,desc:"Build healing momentum. Amplify affirmations.",col:"#fbbf24"},
  {phase:"🌕",name:"Full Moon",hz:221.23,desc:"Maximum healing power. Full illumination.",col:"#f1f5f9"},
  {phase:"🌘",name:"Waning Moon",hz:229.22,desc:"Release and let go. Detox and elimination.",col:"#a78bfa"},
];

const GUIDE_TOPICS=[
  {title:"How Sound Heals",icon:"🔬",content:"Sound waves create mechanical vibrations that travel through all biological tissue. Every organ, bone, and cell has a natural resonant frequency. When exposed to matching frequencies, cells entrain (synchronize), restoring optimal function — the same principle behind ultrasound therapy in medicine."},
  {title:"Brainwave Entrainment",icon:"🧠",content:"The brain's electrical activity can be influenced by external audio. Binaural beats — slightly different tones in each ear — cause the brain to perceive a third 'phantom' beat, entraining brainwaves: Delta (0.5–4 Hz) for deep healing sleep, Theta (4–8 Hz) for meditation, Alpha (8–12 Hz) for relaxation, Gamma (40 Hz) for cognitive enhancement."},
  {title:"DNA & the Solfeggio Scale",icon:"🧬",content:"Dr. Glen Rein's research showed that coherent emotions combined with 528 Hz increased UV light absorption in DNA by 11%. Researchers at the Institute of HeartMath found the heart's electromagnetic field extends up to 8 feet beyond the body and can influence the DNA of others nearby. 528 Hz is now widely used in sound therapy for cellular regeneration."},
  {title:"The Schumann Resonance",icon:"🌍",content:"Earth generates a global electromagnetic resonance at 7.83 Hz — called the Schumann Resonance — produced by lightning activity in the atmosphere. Human brainwave frequencies mirror this pattern. NASA includes Schumann generators in spacecraft to keep astronauts healthy. Disconnection from this frequency is linked to stress, insomnia, and weakened immunity."},
  {title:"Angel Numbers & Sacred Numerology",icon:"👼",content:"Angel numbers are repeating numerical sequences believed to carry divine messages. Each number carries a vibrational signature that corresponds to a frequency. 111 Hz is found in Newgrange (3200 BC) and induces cell regeneration. 528 Hz is used by geneticists. 963 Hz is called the 'God frequency' for its effect on the pineal gland. The Sacred Frequencies app maps each angel number directly to its healing Hz equivalent."},
  {title:"The 9-Ether Healing System",icon:"⚡",content:"The 9-Ether system is based on the principle that a human being exists across 9 distinct energetic dimensions or 'ethers' — from the physical body through to the Akashic record. Each ether carries a different frequency signature and requires a different healing approach. The 9-Ether Irradiation Protocol systematically clears pathogens and blockages from each layer using frequencies ranging from 7.83 Hz (physical grounding) through to 3,168 Hz (Christ Consciousness Grid — Akashic access)."},
  {title:"How to Use This App",icon:"📱",content:"1. Use headphones — binaural beats require left/right stereo separation. 2. Set a clear intention before every session. 3. Start with the Player for individual frequencies. 4. Use the Rituals section for structured healing journeys. 5. Run the Vortex for full-spectrum deep clearing. 6. Log every session in your Journal — your data reveals patterns in your healing journey. 7. Drink 500ml of water after every session — your body releases stored toxins during frequency work."},
];

const FREQ_REF=[
  {hz:"7.83",name:"Schumann Resonance",cat:"Nature",info:"Earth's heartbeat. Restores circadian rhythms, reduces stress hormones."},
  {hz:"40",name:"Gamma Brain",cat:"Mind",info:"MIT research: reduces Alzheimer's markers, boosts neuroplasticity."},
  {hz:"111",name:"Cell Regeneration",cat:"Body",info:"Found in ancient sacred sites. Triggers endorphin release."},
  {hz:"174",name:"Pain Relief",cat:"Body",info:"Lowest Solfeggio — natural anesthetic, deep tissue healing."},
  {hz:"285",name:"Tissue Regeneration",cat:"Body",info:"Restructures and regenerates damaged organs and tissue."},
  {hz:"396",name:"Fear & Guilt Release",cat:"Mind",info:"Liberates guilt — primary obstacle to achieving goals."},
  {hz:"417",name:"Trauma Clearing",cat:"Cleansing",info:"Facilitates change, wipes out negativity and stored trauma."},
  {hz:"432",name:"Universal Harmony",cat:"Nature",info:"Consistent with patterns of the universe. Creates peace and well-being."},
  {hz:"528",name:"DNA Repair",cat:"Body",info:"The Miracle Tone. Used by geneticists to repair broken DNA."},
  {hz:"639",name:"Heart Coherence",cat:"Love",info:"Enhances communication, understanding, and love. Repairs broken bonds."},
  {hz:"741",name:"Toxin Cleanse",cat:"Cleansing",info:"Clears cells from electromagnetic radiation. Awakens intuition."},
  {hz:"852",name:"Pineal Activation",cat:"Spirit",info:"Connected to third eye chakra. Raises cell energy."},
  {hz:"963",name:"God Frequency",cat:"Spirit",info:"Activates pineal gland. Reconnects with spirit and universal oneness."},
  {hz:"1111",name:"Manifestation Portal",cat:"Spirit",info:"Dimensional gateway. Amplifies intentions and law of attraction."},
  {hz:"1296",name:"Angelic Threshold",cat:"Spirit",info:"9 × 144 Hz Fibonacci. Bridges human and angelic consciousness."},
  {hz:"2160",name:"Solar Harmonic",cat:"Spirit",info:"Light body activation. Burns quantum-level density across timelines."},
  {hz:"3168",name:"Christ Consciousness Grid",cat:"Spirit",info:"Highest safe biological resonance. Akashic record access."},
];

// ═══════════════════════════════ AUDIO ENGINE ═══════════════════════════════
/* state variables now in Audio Engine v4 below */

/* ╔══════════════════════════════════════════════════════════════╗
   ║  SACRED FREQUENCIES — AUDIO ENGINE v6                       ║
   ║  Powered by Tone.js (Brain.fm · Endel · Chrome Music Lab)   ║
   ║                                                             ║
   ║  WHY TONE.JS:                                               ║
   ║  • Purpose-built for oscillator synthesis (not file play)   ║
   ║  • Tone.start() = single-line iOS Safari bulletproof unlock  ║
   ║  • Tone.Oscillator wraps all Safari AudioContext quirks      ║
   ║  • Context auto-resumes on every user gesture               ║
   ║  • Used by Brain.fm, Endel, Chrome Music Lab, Ableton Web   ║
   ╚══════════════════════════════════════════════════════════════╝ */

// ── State ────────────────────────────────────────────────────────
let activeNodes = [], timerIv = null, startTime = null;
// ── Legacy aliases for selTrackFn compatibility ──
var selTrack = null;



// ══════════════════════════════════════════════════════
// PURE WEB AUDIO ENGINE — no CDN, no Tone.js dependency
// Works on every iOS Safari, Android, Chrome, Firefox
// ══════════════════════════════════════════════════════

// Global state
var _sfCtx = null;
var _sfUnlocked = false;
var _currentNode = null;
var isPlaying = false;

// Get or create AudioContext (singleton)
function getCtx() {
  if (!_sfCtx) {
    _sfCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return _sfCtx;
}

// Unlock AudioContext on first user gesture (iOS requirement)
function ensureTone() {
  var ctx = getCtx();
  if (ctx.state === 'suspended') {
    ctx.resume().catch(function(){});
  }
  if (!_sfUnlocked) {
    _sfUnlocked = true;
    // Play a silent buffer to fully unlock iOS audio
    try {
      var buf = ctx.createBuffer(1, 1, 22050);
      var src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch(e) {}
  }
}

// Master compressor for all audio
function getMaster() {
  var ctx = getCtx();
  var comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -24;
  comp.knee.value = 30;
  comp.ratio.value = 12;
  comp.attack.value = 0.003;
  comp.release.value = 0.25;
  comp.connect(ctx.destination);
  return comp;
}

// Create a gain node connected to master
function makeGain(vol) {
  var ctx = getCtx();
  var g = ctx.createGain();
  g.gain.value = (vol === undefined ? 0.7 : vol);
  g.connect(getMaster());
  return g;
}

// Stop current audio node
function stopNode(node) {
  if (!node) return;
  try {
    if (node._stop) { node._stop(); return; }
    if (node.stop) node.stop();
    if (node.disconnect) node.disconnect();
  } catch(e) {}
}

// TONE GENERATOR — single frequency sine/triangle/sawtooth/square
function tone(hz, wave, vol) {
  var ctx = getCtx();
  var gain = makeGain(vol || 0.5);
  var osc = ctx.createOscillator();
  osc.type = wave || curWave || 'sine';
  osc.frequency.value = hz;
  osc.connect(gain);
  osc.start();
  return {
    masterGain: gain,
    _stop: function() {
      try { osc.stop(); } catch(e) {}
      try { gain.disconnect(); } catch(e) {}
    }
  };
}

// BINAURAL GENERATOR — stereo beats for sub-20Hz and brain entrainment
// carrier = audible base tone, beatHz = difference between ears
function binaural(carrier, beatHz, vol) {
  var ctx = getCtx();
  var merger = ctx.createChannelMerger(2);
  var gain = ctx.createGain();
  gain.gain.value = vol || 0.45;
  gain.connect(getMaster());
  merger.connect(gain);

  var oscL = ctx.createOscillator();
  oscL.type = 'sine';
  oscL.frequency.value = carrier;
  var panL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  if (panL) { panL.pan.value = -1; oscL.connect(panL); panL.connect(merger, 0, 0); }
  else { oscL.connect(merger, 0, 0); }
  oscL.start();

  var freqR = carrier + Math.min(beatHz, 40);
  var oscR = ctx.createOscillator();
  oscR.type = 'sine';
  oscR.frequency.value = freqR;
  var panR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  if (panR) { panR.pan.value = 1; oscR.connect(panR); panR.connect(merger, 0, 1); }
  else { oscR.connect(merger, 0, 1); }
  oscR.start();

  return {
    masterGain: gain,
    _stop: function() {
      try { oscL.stop(); oscR.stop(); } catch(e) {}
      try { gain.disconnect(); merger.disconnect(); } catch(e) {}
    }
  };
}

// NATURE GENERATOR — brown noise + nature ambience layer
function nature(vol) {
  var ctx = getCtx();
  var gain = makeGain(vol || 0.3);
  
  // Brown noise via filtered white noise
  var bufSize = ctx.sampleRate * 2;
  var buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  var data = buffer.getChannelData(0);
  var last = 0;
  for (var i = 0; i < bufSize; i++) {
    var white = Math.random() * 2 - 1;
    data[i] = (last + 0.02 * white) / 1.02;
    last = data[i];
    data[i] *= 3.5;
  }
  var src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  
  // Low-pass filter for forest warmth
  var filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 0.5;
  
  src.connect(filter);
  filter.connect(gain);
  src.start();
  
  return {
    masterGain: gain,
    _stop: function() {
      try { src.stop(); } catch(e) {}
      try { gain.disconnect(); filter.disconnect(); } catch(e) {}
    }
  };
}

// Fade out and stop a node
function fade(nodeObj) {
  if (!nodeObj) return;
  var g = nodeObj.masterGain;
  if (g) {
    g.gain.value = 0;
  }
  setTimeout(function() { stopNode(nodeObj); }, 300);
}

// ── Player state ──
var curWave = 'sine';
var curTrackIdx = 0;
var playerNode = null;
var natureNode = null;
var timerInterval = null;
var elapsedSeconds = 0;

function setWave(w, btn) {
  curWave = w;
  if (isPlaying) {
    // Restart with new waveform
    stopCurrentAudio();
    startPlay();
  }
}

function stopCurrentAudio() {
  if (playerNode) { fade(playerNode); playerNode = null; }
  if (natureNode) { fade(natureNode); natureNode = null; }
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function updatePlayBtn(playing) {
  var btn = document.getElementById('playBtn');
  if (!btn) return;
  if (playing) {
    btn.innerHTML = '⏹ Stop';
    btn.classList.add('playing');
    btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
  } else {
    btn.innerHTML = '▶ Play';
    btn.classList.remove('playing');
    btn.style.background = '';
  }
}

function startTimer() {
  elapsedSeconds = 0;
  var timerEl = document.getElementById('pTimer');
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    elapsedSeconds++;
    if (timerEl) {
      var m = Math.floor(elapsedSeconds/60);
      var s = elapsedSeconds % 60;
      timerEl.textContent = m + ':' + (s<10?'0':'') + s;
    }
    // Update orb Hz display while playing
    var orbHz = document.getElementById('pHz');
    var t = TRACKS[curTrackIdx];
    if (orbHz && t) orbHz.textContent = t.lbl || t.hz;
  }, 1000);
}

function startPlay() {
  var ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
  
  stopCurrentAudio();
  isPlaying = true;
  updatePlayBtn(true);
  startTimer();
  
  var t = TRACKS[curTrackIdx] || TRACKS[0];
  var hz = t.hz;
  
  // Choose synthesis method based on frequency
  if (hz < 20) {
    // Sub-audible: use binaural beats with 110Hz carrier
    playerNode = binaural(110, hz, 0.5);
  } else {
    // Audible tone
    playerNode = tone(hz, curWave, 0.5);
  }
  
  // Update display
  var orbHz = document.getElementById('pHz');
  var orbCat = document.getElementById('pHzLabel');
  var affirmEl = document.getElementById('pAff');
  if (orbHz) orbHz.textContent = t.lbl || t.hz;
  if (orbCat) orbCat.textContent = (t.hz) + ' Hz — ' + t.cat;
  if (affirmEl) affirmEl.textContent = '"' + (t.aff || '') + '"';
}

function stopPlay() {
  stopCurrentAudio();
  isPlaying = false;
  updatePlayBtn(false);
  elapsedSeconds = 0;
  var timerEl = document.getElementById('pTimer');
  if (timerEl) timerEl.textContent = '0:00';
}

function playerToggle() {
  ensureTone();
  if (isPlaying) {
    stopPlay();
  } else {
    startPlay();
  }
}

function playerNature() {
  ensureTone();
  var btn = document.getElementById('natBtn');
  if (natureNode) {
    fade(natureNode);
    natureNode = null;
    if (btn) { btn.textContent = '🌿 Nature'; btn.classList.remove('active'); }
  } else {
    natureNode = nature(0.25);
    if (btn) { btn.textContent = '🌿 Nature ✓'; btn.classList.add('active'); }
  }
}

function selectTrack(idx) {
  curTrackIdx = idx;
  var t = TRACKS[idx];
  if (!t) return;
  
  // Update orb display
  var orbHz = document.getElementById('pHz');
  var orbCat = document.getElementById('pHzLabel');
  var orbDesc = document.getElementById('pBenefit');
  var affirmEl = document.getElementById('pAff');
  if (orbHz) orbHz.textContent = t.lbl || t.hz;
  if (orbCat) orbCat.textContent = (t.lbl || t.hz) + ' Hz — ' + t.cat;
  if (orbDesc) orbDesc.textContent = t.ben || '';
  if (affirmEl) affirmEl.textContent = '"' + (t.aff || '') + '"';
  
  // Highlight selected track card
  document.querySelectorAll('.track-card').forEach(function(c,i) {
    c.classList.toggle('selected', i === idx);
  });
  
  // If already playing, restart with new track
  if (isPlaying) {
    stopCurrentAudio();
    isPlaying = true;
    startPlay();
  }
}

// ── Love Field ──
var loveNodes = [];
var loveFieldOn = false;

function loveStageToggle(idx){
  loveStagePlay(idx, null);
}

function loveFieldToggle(){
  ensureTone();
  var btn=document.getElementById('loveBigBtn');
  if(loveFieldOn){
    loveNodes.forEach(function(n){ fade(n); });
    loveNodes=[];
    loveFieldOn=false;
    if(btn){btn.innerHTML='💗 Activate Love Field<br><small>All 6 dimensions</small>';btn.classList.remove('active');}
  } else {
    var LOVE_HZ=[528,639,285,417,396,963,7.83];
    LOVE_HZ.forEach(function(hz){
      var n = hz<20 ? binaural(110,hz,0.12) : tone(hz,'sine',0.12);
      loveNodes.push(n);
    });
    loveFieldOn=true;
    if(btn){btn.innerHTML='💗 Love Field Active ✓<br><small>Stop field</small>';btn.classList.add('active');}
  }
}

function loveStagePlay(idx, btn){
  ensureTone();
  loveNodes.forEach(function(n){ fade(n); });
  loveNodes=[];
  loveFieldOn=false;
  document.getElementById('loveBigBtn').innerHTML='💗 Activate Love Field<br><small>All 6 dimensions</small>';
  document.getElementById('loveBigBtn').classList.remove('active');
  
  var LOVE_STAGES=[
    {hz:[528,174]},{hz:[285,528]},{hz:[639,396]},
    {hz:[528,639]},{hz:[963,528]},{hz:[528,639,285,417,396,963]}
  ];
  var stage = LOVE_STAGES[idx];
  if(!stage) return;
  stage.hz.forEach(function(hz){
    var n = hz<20 ? binaural(110,hz,0.18) : tone(hz,'sine',0.18);
    loveNodes.push(n);
  });
  loveFieldOn=true;
  if(btn){ btn.querySelector && btn.querySelector('.stage-play') ? 
    btn.querySelector('.stage-play').textContent='⏹' : null; }
}

// ── Quantum Vortex ──
var vortexNodes = [];
var vortexOn = false;

function vortexToggle(){
  ensureTone();
  var btn=document.getElementById('vortexBtn');
  if(vortexOn){
    vortexNodes.forEach(function(n){ fade(n); });
    vortexNodes=[];
    vortexOn=false;
    if(btn){btn.innerHTML='⚡ Activate Vortex';btn.classList.remove('active');}
  } else {
    // 9-ether vortex frequencies
    var freqs=[7.83,111,528,417,852,963];
    var intensity=document.querySelector('.intensity-btn.active');
    var vol=(intensity&&intensity.textContent.indexOf('Max')!==-1)?0.4:
            (intensity&&intensity.textContent.indexOf('Standard')!==-1)?0.3:0.2;
    freqs.forEach(function(hz){
      var n = hz<20 ? binaural(110,hz,vol) : tone(hz,'sine',vol);
      vortexNodes.push(n);
    });
    // Violet flame layer
    var vf=tone(417,'sawtooth',vol*0.3);
    vortexNodes.push(vf);
    vortexOn=true;
    if(btn){btn.innerHTML='⏹ Stop Vortex';btn.classList.add('active');}
  }
}

// ── Growth Sound ──
var growthNodes = [];
var growthOn = false;
var growthSeqTimer = null;

function growthPlay(idx, btn){
  ensureTone();
  growthNodes.forEach(function(n){ fade(n); });
  growthNodes=[];
  var GROWTH=[
    {hz:[285,111,7.83]},{hz:[40,14,10]},{hz:[639,528,3.5]},
    {hz:[963,852,7]},{hz:[432,7.83]},{hz:[528,396,4]},
    {hz:[111,528,7.83]},{hz:[963,528,432,7.83]}
  ];
  var g=GROWTH[idx];
  if(!g) return;
  g.hz.forEach(function(hz){
    var n = hz<20 ? binaural(110,hz,0.2) : tone(hz,'sine',0.2);
    growthNodes.push(n);
  });
}

function growthMasterSeq(){
  ensureTone();
  var step=0;
  var GROWTH=[
    {hz:[285,111,7.83]},{hz:[40,14,10]},{hz:[639,528,3.5]},
    {hz:[963,852,7]},{hz:[432,7.83]},{hz:[528,396,4]},
    {hz:[111,528,7.83]},{hz:[963,528,432,7.83]}
  ];
  function playStep(){
    growthNodes.forEach(function(n){ fade(n); });
    growthNodes=[];
    if(step>=GROWTH.length){ growthOn=false; return; }
    var g=GROWTH[step];
    g.hz.forEach(function(hz){
      var n = hz<20 ? binaural(110,hz,0.2) : tone(hz,'sine',0.2);
      growthNodes.push(n);
    });
    step++;
    growthSeqTimer=setTimeout(playStep, 120000); // 2 min each
  }
  playStep();
  growthOn=true;
}

// ── Nature Portal ──
var naturePortalNodes=[];

function natureSoundPlay(name,hz,btn){
  ensureTone();
  naturePortalNodes.forEach(function(n){ fade(n); });
  naturePortalNodes=[];
  document.querySelectorAll('.sound-card').forEach(function(c){ c.classList.remove('active'); });
  if(btn){ btn.classList ? btn.classList.add('active') : null; }
  
  // Nature ambience layer
  var amb=nature(0.3);
  naturePortalNodes.push(amb);
  
  // Healing tone layer
  if(hz){
    var tn = hz<20 ? binaural(110,hz,0.3) : tone(hz,'sine',0.3);
    naturePortalNodes.push(tn);
  }
}

function primalPlay(hz,btn){
  ensureTone();
  naturePortalNodes.forEach(function(n){ fade(n); });
  naturePortalNodes=[];
  document.querySelectorAll('.primal-card').forEach(function(c){ c.classList.remove('active'); });
  if(btn) btn.classList.add('active');
  var n = hz<20 ? binaural(110,hz,0.4) : tone(hz,'sine',0.4);
  naturePortalNodes.push(n);
}

// ── Rituals ──
var ritualNodes=[];
var ritualSeqTimer=null;

function ritualExpand(idx){
  var body = document.querySelector('[data-ritual-body="'+idx+'"]');
  if(!body) return;
  var isOpen = body.style.display !== 'none' && body.style.display !== '';
  // Close all
  document.querySelectorAll('[data-ritual-body]').forEach(function(b){ b.style.display='none'; });
  // Toggle clicked
  if(!isOpen) body.style.display = 'block';
}

function ritualActivate(idx){
  ensureTone();
  ritualNodes.forEach(function(n){ fade(n); });
  ritualNodes=[];
  if(ritualSeqTimer){ clearTimeout(ritualSeqTimer); ritualSeqTimer=null; }
  
  var RITUAL_FREQS=[
    [7.83,528,432,396,888],    // Morning
    [396,417,741,528,963],     // Deep Cleanse
    [285,528,174,432,963],     // Longevity
    [528,639,396,963,7.83],    // Love
    [417,888,528,1111],        // Wealth
    [963,852,528,7.83,432]     // Spiritual
  ];
  var freqs=RITUAL_FREQS[idx]||[];
  var step=0;
  function playRitualStep(){
    ritualNodes.forEach(function(n){ fade(n); });
    ritualNodes=[];
    if(step>=freqs.length) return;
    var hz=freqs[step];
    var n = hz<20 ? binaural(110,hz,0.3) : tone(hz,'sine',0.3);
    ritualNodes.push(n);
    step++;
    ritualSeqTimer=setTimeout(playRitualStep, 600000); // 10 min each
  }
  playRitualStep();
}

function ritualStop(){
  ritualNodes.forEach(function(n){ fade(n); });
  ritualNodes=[];
  if(ritualSeqTimer){ clearTimeout(ritualSeqTimer); ritualSeqTimer=null; }
}

// ── Angel Numbers ──
var angelNodes=[];

function angelPlay(hz,btn){
  ensureTone();
  angelNodes.forEach(function(n){ fade(n); });
  angelNodes=[];
  document.querySelectorAll('.angel-card').forEach(function(c){ c.classList.remove('active'); });
  
  var actualHz = hz > 2000 ? hz / 10 : hz; // Map high angel numbers to audible range
  var n = actualHz < 20 ? binaural(110, actualHz, 0.4) : tone(actualHz,'sine',0.4);
  angelNodes.push(n);
  
  if(btn && btn.closest) {
    var card=btn.closest('.angel-card');
    if(card) card.classList.add('active');
  }
}

// ── Lunar Protocol ──
var lunarNodes=[];

function lunarPlay(hz,btn){
  ensureTone();
  lunarNodes.forEach(function(n){ fade(n); });
  lunarNodes=[];
  
  // Lunar harmonic triad
  [136.10, 210.42, 221.23].forEach(function(lHz){
    lunarNodes.push(tone(lHz,'sine',0.15));
  });
  // Primary frequency
  var n = hz<20 ? binaural(110,hz,0.3) : tone(hz,'sine',0.3);
  lunarNodes.push(n);
  
  document.querySelectorAll('.lunar-btn').forEach(function(b){ b.classList.remove('active'); });
  if(btn) btn.classList.add('active');
}



// Volume control
var masterVolume = 0.7;
function setVol(val) {
  masterVolume = val / 100;
  var label = document.getElementById('volLabel');
  if (label) label.textContent = val + '%';
  // Apply to all active nodes
  [playerNode, natureNode].forEach(function(n) {
    if (n && n.masterGain) n.masterGain.gain.value = masterVolume;
  });
}


// Filter track list by category
function filterCat(cat, btn) {
  document.querySelectorAll('#catFilter .filter-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  rTracks(cat);
}

// ═══ NAV ═══
function go(id){
  try{
    // Unlock audio on every tap
    ensureTone();
    // Use ONLY CSS classes - no inline style (prevents iOS class/style conflict)
    document.querySelectorAll('.page').forEach(function(p){
      p.classList.remove('active');
    });
    var target = document.getElementById('page-'+id);
    if(!target){ console.warn('go(): page-'+id+' not found'); return; }
    target.classList.add('active');
    // Update nav tabs
    document.querySelectorAll('.tab').forEach(function(t){
      t.classList.remove('active');
      if(t.getAttribute('data-page')===id) t.classList.add('active');
    });
    window.scrollTo(0,0);
    // Render player tracks on first visit
    if(id==='player'){
      var tl=document.getElementById('trackList');
      if(tl&&tl.children.length===0) rTracks('All');
    }
  }catch(e){ console.error('go() error:',e); }
}

// ═══ RENDER ═══
function rTracks(cat='All'){
  const list=document.getElementById('trackList');
  const filtered=cat==='All'?TRACKS:TRACKS.filter(t=>t.cat===cat);
  list.innerHTML=filtered.map((t,i)=>{
    const c=CC[t.cat]||'#a78bfa';
    const id='tc-'+String(t.hz).replace('.','_');
    const globalIdx=TRACKS.indexOf(t);
    return '<div class="track-card" id="'+id+'" data-tidx="'+globalIdx+'" onclick="selByIdx(this)" style="border-left:3px solid '+c+'50">'+
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">'+
      '<div style="flex:1;min-width:0">'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">'+
      '<div class="hz-badge" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'40">'+(t.lbl||t.hz+' Hz')+'</div>'+
      '<div style="font-size:10px;color:'+c+'99;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">'+t.cat+'</div>'+
      '</div>'+
      '<div style="font-weight:700;font-size:13.5px;color:#e2e8f0;line-height:1.3">'+t.n+'</div>'+
      '<div style="font-size:11.5px;color:#64748b;margin-top:3px;line-height:1.4">'+t.ben+'</div>'+
      '<div style="font-size:10.5px;color:'+c+'80;margin-top:4px;font-weight:600">'+'✨'+' Chakra: '+(t.ch||'—')+'</div>'+
      '</div>'+
      '<button class="play-mini" data-tidx="'+globalIdx+'" onclick="event.stopPropagation();selByIdx(this)">▶</button>'+
      '</div></div>';
  }).join('');
}
function selByIdx(el){
  var idx = parseInt(el.getAttribute('data-tidx'));
  if(!isNaN(idx) && TRACKS[idx]){
    var wasPlaying = isPlaying;
    selTrack = TRACKS[idx];
    curTrackIdx = idx;
    selTrackFn(TRACKS[idx]);
    ensureTone();
    // Auto-play on card tap
    if(!isPlaying) startPlay();
    else {
      // Switch track while playing
      stopCurrentAudio();
      isPlaying = true;
      startPlay();
    }
  }
}
// ── selTrackFn(): select track + update player display ───────────
// Called every time a track is chosen. Sets selTrack and refreshes
// the player orb, benefit text, affirmation, and chakra display.
function selTrackFn(t) {
  selTrack = t;
  function set(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
  // New player IDs
  set('pHz',        t.lbl || t.hz);
  set('pHzLabel',       (t.lbl || t.hz) + ' Hz — ' + (t.cat || ''));
  set('pBenefit',      t.ben || '');
  set('pAff', t.aff ? '\\u201c' + t.aff + '\\u201d' : '');
  // Chakra
  var chakraEl = document.getElementById('pChakra');
  if (chakraEl) chakraEl.textContent = t.ch ? '\\u2728 Chakra: ' + t.ch : '';
  // Highlight active track card
  document.querySelectorAll('.track-card').forEach(function(c) { c.classList.remove('sel'); });
  var card = document.querySelector('[data-tidx="' + TRACKS.indexOf(t) + '"]');
  if (card) card.classList.add('sel');
}



function rAngels(){
  document.getElementById('angelGrid').innerHTML=ANGEL_NUMBERS.map(a=>
    '<div class="angel-card" style="background:'+a.col+'08;border-color:'+a.col+'40" onclick="angelPlay('+a.hz+')">'+
    '<div style="font-size:26px;color:'+a.col+';margin-bottom:5px">'+a.sym+'</div>'+
    '<div style="font-size:18px;font-weight:900;color:'+a.col+'">'+a.hz+'</div>'+
    '<div style="font-weight:700;font-size:11px;margin:4px 0 2px">'+a.meaning+'</div>'+
    '<div style="font-size:10px;color:var(--dim);line-height:1.4">'+a.msg+'</div>'+
    '</div>'
  ).join('');
}
function rLoveStages(){
  document.getElementById('loveStages').innerHTML=LOVE_STAGES.map((s,i)=>
    '<div class="stage-card" id="stage-'+i+'" onclick="loveStageToggle('+i+')">'+
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
    '<div style="font-size:26px">'+s.icon+'</div>'+
    '<div style="flex:1;min-width:0">'+
    '<div style="font-weight:800;color:'+s.col+';margin-bottom:3px">Stage '+(i+1)+': '+s.name+'</div>'+
    '<div style="font-size:12px;color:var(--muted);margin-bottom:3px">'+s.desc+'</div>'+
    '<div style="font-size:11px;color:var(--dim)">'+s.hz.join(' Hz + ')+' Hz</div></div>'+
    '<div style="font-size:18px;color:'+s.col+'">▶</div></div></div>'
  ).join('');
}
function rVortex(){
  document.getElementById('vBeingGrid').innerHTML=VORTEX_BEINGS.map((b,i)=>
    '<div class="card being-btn" style="padding:10px 12px;cursor:pointer;text-align:center;transition:all 0.15s;-webkit-tap-highlight-color:transparent" onclick="vSetBeing('+i+')">'+
    '<div style="font-size:20px;margin-bottom:4px">'+b.icon+'</div>'+
    '<div style="font-weight:700;font-size:11px">'+b.label+'</div>'+
    '<div style="font-size:10px;color:var(--dim)">'+b.mod+'</div>'+
    '</div>'
  ).join('');
  vSetBeing(11);
}
function rNature(){
  document.getElementById('natureGrid').innerHTML=NATURE_SCENES.map((s,i)=>
    '<div class="scene-card card" id="scene-'+i+'" style="border-color:'+s.col+'40" onclick="sceneToggle('+i+')">'+
    '<div style="font-size:28px;margin-bottom:8px">'+s.icon+'</div>'+
    '<div style="font-weight:800;color:'+s.col+';margin-bottom:4px">'+s.name+'</div>'+
    '<div style="font-size:12px;color:var(--muted);margin-bottom:6px">'+s.desc+'</div>'+
    '<div style="font-size:11px;color:var(--dim)">+ '+s.hz+' Hz healing tone</div>'+
    '</div>'
  ).join('');
  document.getElementById('primalGrid').innerHTML=PRIMAL_FREQS.map(p=>
    '<div class="card" style="cursor:pointer;border-color:'+p.col+'40;-webkit-tap-highlight-color:transparent" onclick="primalToggle('+p.hz+')">'+
    '<div style="font-size:18px;font-weight:900;color:'+p.col+'">'+p.hz+' Hz</div>'+
    '<div style="font-weight:700;font-size:12px;margin:4px 0 2px">'+p.name+'</div>'+
    '<div style="font-size:11px;color:var(--dim)">'+p.desc+'</div>'+
    '</div>'
  ).join('');
}
function rGrowth(){
  document.getElementById('growthGrid').innerHTML=GROWTH_LAYERS.map((l,i)=>
    '<div class="growth-card" id="growth-'+i+'" style="border-color:'+l.col+'40" onclick="growthToggle('+i+')">'+
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
    '<div style="font-size:26px">'+l.icon+'</div>'+
    '<div style="flex:1;min-width:0">'+
    '<div style="font-weight:800;color:'+l.col+';margin-bottom:3px">'+l.name+'</div>'+
    '<div style="font-size:12px;color:var(--muted);margin-bottom:3px">'+l.desc+'</div>'+
    '<div style="font-size:11px;color:var(--dim);font-style:italic">"'+l.aff+'"</div></div>'+
    '<div style="font-size:18px;color:'+l.col+'">▶</div></div></div>'
  ).join('');
  document.getElementById('masterSteps').innerHTML=MASTER_SEQUENCE.map((s,i)=>
    '<div class="mstep card" style="border-color:'+s.col+'30;margin-bottom:6px;padding:10px 14px">'+
    '<div style="display:flex;align-items:center;gap:10px">'+
    '<div style="width:24px;height:24px;border-radius:50%;background:'+s.col+'25;color:'+s.col+';font-weight:900;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(i+1)+'</div>'+
    '<div><span style="font-weight:800;color:'+s.col+'">'+s.name+'</span> — <span style="font-size:12px;color:var(--muted)">'+s.hz+' Hz · '+s.desc+'</span></div>'+
    '</div></div>'
  ).join('');
}
function rRituals(){
  document.getElementById('ritualList').innerHTML=RITUALS.map((r,i)=>
    '<div class="ritual-card" style="border-color:'+r.border+'">'+
    '<button class="ritual-header" onclick="ritualExpand('+i+')">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">'+
    '<div><div style="font-weight:800;font-size:15px;margin-bottom:3px">'+r.title+'</div>'+
    '<div style="font-size:12px;color:var(--muted)">'+r.sub+'</div>'+
    '<div style="display:flex;gap:8px;margin-top:6px">'+
    '<span style="font-size:11px;padding:2px 8px;background:#ffffff10;border-radius:999px;color:var(--dim)">⏱ '+r.dur+'</span>'+
    '</div></div>'+
    '<span style="color:var(--dim);font-size:18px">↓</span>'+
    '</div></button>'+
    '<div class="ritual-body" id="rb-'+i+'">'+
    '<div style="display:flex;gap:8px;margin-bottom:12px">'+
    '<button class="btn btn-primary" style="font-size:12px;padding:8px 16px" onclick="ritualPlay2('+i+')">▶ Activate All Frequencies</button>'+
    '<button class="btn btn-secondary" style="font-size:12px;padding:8px 14px" onclick="ritualStop()">■ Stop</button>'+
    '</div>'+
    r.steps.map((s,j)=>'<div class="ritual-step">'+
      '<div class="step-dot" style="background:'+r.col+'25;color:'+r.col+';font-size:10px">'+(j+1)+'</div>'+
      '<div><div style="font-weight:700;font-size:13px;margin-bottom:2px">'+s.name+' — <span style="color:'+r.col+'">'+s.freq+'</span></div>'+
      '<div style="font-size:11px;color:var(--dim)">'+s.time+' · '+s.desc+'</div></div>'+
      '</div>'
    ).join('')+
    '<div style="margin-top:10px"><div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--dim);margin-bottom:6px">Benefits</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:4px">'+r.ben.map(b=>'<span style="padding:2px 8px;background:'+r.col+'15;color:'+r.col+';border-radius:999px;font-size:10px;font-weight:700">'+b+'</span>').join('')+
    '</div></div></div></div>'
  ).join('');
}
function rJournal(){
  const s=jSessions;
  document.getElementById('jStatSessions').textContent=s.length;
  document.getElementById('jStatRating').textContent=s.length?(s.reduce((a,x)=>a+(+x.rating||0),0)/s.length).toFixed(1)+'/10':'—';
  document.getElementById('jStatTrans').textContent=s.filter(x=>x.moodAfter==='Transformed').length;
  const MOOD_COL={Anxious:'#ef4444',Low:'#f97316',Neutral:'#94a3b8',Good:'#22c55e',Elevated:'#60a5fa',Transformed:'#a78bfa'};
  document.getElementById('jList').innerHTML=s.length===0?
    '<div style="text-align:center;padding:40px 0;color:var(--dim)"><div style="font-size:32px;margin-bottom:8px">📓</div><p>Your healing journey starts here. Log your first session.</p></div>':
    s.map(session=>'<div class="card" style="margin-bottom:10px">'+
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">'+
      '<div style="flex:1;min-width:0"><div style="font-weight:800;font-size:14px;margin-bottom:4px">'+session.name+'</div>'+
      '<div style="font-size:11px;color:var(--dim);margin-bottom:6px">'+session.date+' · '+session.duration+' min · Rating: '+session.rating+'/10</div>'+
      (session.intention?'<div style="font-size:12px;color:var(--muted);font-style:italic;margin-bottom:6px">"'+session.intention+'"</div>':'')+
      '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
      '<span style="padding:2px 8px;background:'+MOOD_COL[session.moodBefore]+'20;color:'+MOOD_COL[session.moodBefore]+';border-radius:999px;font-size:10px">Before: '+MOOD_EMOJI[session.moodBefore]+' '+session.moodBefore+'</span>'+
      '<span style="font-size:10px;color:var(--dim)">→</span>'+
      '<span style="padding:2px 8px;background:'+MOOD_COL[session.moodAfter]+'20;color:'+MOOD_COL[session.moodAfter]+';border-radius:999px;font-size:10px">After: '+MOOD_EMOJI[session.moodAfter]+' '+session.moodAfter+'</span>'+
      '</div></div>'+
      '</div></div>'
    ).join('');
}
function rMoodBtns(){
  ['moodBefore','moodAfter'].forEach(id=>{
    const isBefore=id==='moodBefore';
    document.getElementById(id).innerHTML=MOODS.map(m=>
      '<button class="mood-btn'+(m===(isBefore?jMoodBefore:jMoodAfter)?' sel':'')+'" onclick="'+
      (isBefore?"jMoodBefore='"+m+"'":'jMoodAfter=\\''+m+'\\'')+
      ';document.querySelectorAll(\\'#'+id+' .mood-btn\\').forEach(b=>b.classList.remove(\\'sel\\'));this.classList.add(\\'sel\\')">'+
      MOOD_EMOJI[m]+' '+m+'</button>'
    ).join('');
  });
}
function rGuide(){
  document.getElementById('guideList').innerHTML=GUIDE_TOPICS.map((t,i)=>
    '<div class="guide-card card" onclick="this.querySelector(\\'.guide-body\\').classList.toggle(\\'open\\')">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">'+
    '<div><span style="font-size:18px;margin-right:8px">'+t.icon+'</span><span style="font-weight:800;font-size:14px">'+t.title+'</span></div>'+
    '<span style="color:var(--dim)">↓</span></div>'+
    '<div class="guide-body">'+t.content+'</div>'+
    '</div>'
  ).join('');
  document.getElementById('freqRef').innerHTML=FREQ_REF.map(f=>
    '<div class="card" style="margin-bottom:6px;padding:10px 14px">'+
    '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
    '<div class="hz-badge" style="background:'+CC[f.cat]+'20;color:'+CC[f.cat]+'">'+(f.lbl||f.hz+' Hz')+'</div>'+
    '<div style="flex:1;min-width:0"><span style="font-weight:700;font-size:13px">'+f.name+'</span><span style="font-size:11px;color:var(--dim);margin-left:8px">'+f.info+'</span></div>'+
    '</div></div>'
  ).join('');
}
function rProtocol(){
  document.getElementById('protEthers').innerHTML=PROTOCOL_ETHERS.map(e=>
    '<div class="card" style="border-color:'+e.col+'40;margin-bottom:8px">'+
    '<div style="display:flex;align-items:flex-start;gap:10px">'+
    '<div style="width:28px;height:28px;border-radius:50%;background:'+e.col+'25;color:'+e.col+';font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">'+e.num+'</div>'+
    '<div style="flex:1;min-width:0">'+
    '<div style="font-weight:800;color:'+e.col+';margin-bottom:2px">Ether '+e.num+': '+e.name+' — <span style="font-size:12px;font-weight:600">'+e.hz+'</span></div>'+
    '<div style="font-size:11px;color:var(--dim);margin-bottom:4px">Targets: '+e.targets+'</div>'+
    '<div style="font-size:11px;font-style:italic;color:#c4b5fd">"'+e.aff+'"</div>'+
    '</div></div></div>'
  ).join('');
  document.getElementById('protLunar').innerHTML=LUNAR_PHASES.map(l=>
    '<div class="card" style="border-color:'+l.col+'40;text-align:center">'+
    '<div style="font-size:28px;margin-bottom:6px">'+l.phase+'</div>'+
    '<div style="font-weight:800;color:'+l.col+'">'+l.name+'</div>'+
    '<div style="font-size:18px;font-weight:900;color:'+l.col+';margin:4px 0">'+l.hz+' Hz</div>'+
    '<div style="font-size:11px;color:var(--dim);margin-bottom:10px">'+l.desc+'</div>'+
    '<button class="lunar-btn filter-btn" style="width:100%" onclick="lunarPlay('+l.hz+',this)">▶ Activate</button>'+
    '</div>'
  ).join('');
}

// ═══ STARS ═══
function makeStars(){
  const c=document.getElementById('starsContainer');
  for(let i=0;i<80;i++){
    const s=document.createElement('div');s.className='star';
    const size=Math.random()*2+1;
    s.style.cssText='width:'+size+'px;height:'+size+'px;top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;--d:'+(Math.random()*4+2)+'s;--delay:-'+(Math.random()*4)+'s;--op:'+(Math.random()*0.6+0.2);
    c.appendChild(s);
  }
}

// ═══ AUDIO UNLOCK on first touch (iOS Safari) ═══
document.addEventListener('touchstart', function onFirstTouch(){
  ensureTone();
  document.removeEventListener('touchstart', onFirstTouch);
}, {passive:true});
document.addEventListener('click', function onFirstClick(){
  ensureTone();
  document.removeEventListener('click', onFirstClick);
}, {passive:true});

// ═══ INIT ═══
makeStars();
rTracks();rAngels();rLoveStages();rVortex();rNature();rGrowth();rRituals();rGuide();rProtocol();
rMoodBtns();jLoad();rJournal();
document.getElementById('wSine').classList.add('active');
selTrackFn(TRACKS.find(t=>t.feat)||TRACKS[0]);
// Show home page explicitly via go() so inline display styles are set
// Pages shown via CSS .page.active class — see go()
</script>

// ── Initialize after full DOM parse ──
document.addEventListener('DOMContentLoaded', function() {
  go('home');
});
// Fallback if DOMContentLoaded already fired
if (document.readyState !== 'loading') { go('home'); }

<script>
/* ══ PLAYER REDESIGN JS ══ */
(function(){
  // Wire data-action buttons
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-action]');
    if(!btn) return;
    var act = btn.getAttribute('data-action');
    if(act === 'toggle') playerToggle();
    if(act === 'nature') playerNature();
  });

  // Wave buttons via data-wave
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-wave]');
    if(!btn) return;
    var wave = btn.getAttribute('data-wave');
    // deactivate all wave btns
    document.querySelectorAll('.wave-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    setWave(wave, btn);
  });

  // Update play button state styling
  var origToggle = window.playerToggle;
  window.playerToggle = function(){
    origToggle && origToggle();
    setTimeout(function(){
      var pb = document.getElementById('playBtn');
      if(!pb) return;
      var isPlaying = pb.textContent.indexOf('Stop') !== -1 || pb.textContent.indexOf('⏹') !== -1 || pb.textContent.indexOf('Pause') !== -1;
      if(isPlaying){ pb.classList.add('playing'); } else { pb.classList.remove('playing'); }
    }, 100);
  };

  // ── Frequency Visualizer ──
  var canvas = document.getElementById('vizCanvas');
  if(!canvas) return;
  var ctx2 = canvas.getContext('2d');
  var bars = 32;
  var phases = [];
  var speeds = [];
  for(var i=0;i<bars;i++){
    phases.push(Math.random()*Math.PI*2);
    speeds.push(0.04 + Math.random()*0.06);
  }
  var isActive = false;
  var animId = null;
  var COLORS = ['#7c3aed','#a78bfa','#f472b6','#fbbf24','#60a5fa','#34d399'];

  function drawIdle(){
    var W = canvas.width, H = canvas.height;
    ctx2.clearRect(0,0,W,H);
    var bw = Math.floor(W/bars) - 1;
    for(var i=0;i<bars;i++){
      phases[i] += speeds[i]*0.3;
      var amp = 0.15 + 0.1*Math.sin(phases[i]);
      var h = Math.max(3, amp*H);
      var x = i*(bw+1);
      var grad = ctx2.createLinearGradient(0,H-h,0,H);
      grad.addColorStop(0, COLORS[i%COLORS.length]);
      grad.addColorStop(1, COLORS[i%COLORS.length]+'44');
      ctx2.fillStyle = grad;
      ctx2.beginPath();
      ctx2.roundRect ? ctx2.roundRect(x, H-h, bw, h, 2) : ctx2.rect(x, H-h, bw, h);
      ctx2.fill();
    }
  }

  function drawActive(){
    var W = canvas.width, H = canvas.height;
    ctx2.clearRect(0,0,W,H);
    var bw = Math.floor(W/bars) - 1;
    for(var i=0;i<bars;i++){
      phases[i] += speeds[i];
      var amp = 0.25 + 0.6*Math.abs(Math.sin(phases[i]));
      var h = Math.max(4, amp*H);
      var x = i*(bw+1);
      var grad = ctx2.createLinearGradient(0,H-h,0,H);
      grad.addColorStop(0,'#fff');
      grad.addColorStop(0.2, COLORS[i%COLORS.length]);
      grad.addColorStop(1, COLORS[i%COLORS.length]+'33');
      ctx2.fillStyle = grad;
      ctx2.beginPath();
      ctx2.roundRect ? ctx2.roundRect(x, H-h, bw, h, 3) : ctx2.rect(x, H-h, bw, h);
      ctx2.fill();
    }
  }

  function loop(){
    var pb = document.getElementById('playBtn');
    var playing = pb && (pb.classList.contains('playing') || pb.textContent.indexOf('Stop')!==-1 || pb.textContent.indexOf('⏹')!==-1 || pb.textContent.indexOf('Pause')!==-1);
    if(playing){ drawActive(); } else { drawIdle(); }
    animId = requestAnimationFrame(loop);
  }

  function resizeCanvas(){
    canvas.width = canvas.offsetWidth * (window.devicePixelRatio||1);
    canvas.height = 48 * (window.devicePixelRatio||1);
    ctx2.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  loop();
})();
</script>
</body>
</html>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  });
});

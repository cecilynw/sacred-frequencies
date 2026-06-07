Deno.serve(async (_req) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sacred Frequencies — Healing App</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#030712;color:#e2e8f0;min-height:100vh}
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:#03071299;backdrop-filter:blur(20px);border-bottom:1px solid #ffffff10;padding:0 16px}
.nav-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:56px}
.nav-logo{font-weight:900;font-size:16px;background:linear-gradient(135deg,#fbbf24,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nav-tabs{display:flex;gap:2px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.nav-tabs::-webkit-scrollbar{display:none}
.tab{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;border:none;background:transparent;color:#ffffff60;transition:all 0.15s}
.tab.active{background:#ffffff15;color:#fff}
.page{display:none;max-width:900px;margin:0 auto;padding:72px 16px 40px}
.page.active{display:block}
h1{font-size:28px;font-weight:900;margin-bottom:8px}
h2{font-size:20px;font-weight:800;margin-bottom:12px}
p{color:#94a3b8;font-size:14px;line-height:1.7}
.card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:18px;margin-bottom:12px}
.btn{display:inline-block;padding:12px 24px;border-radius:999px;font-weight:700;font-size:14px;cursor:pointer;border:none;transition:all 0.15s}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;box-shadow:0 0 20px #7c3aed40}
.btn-secondary{background:transparent;color:#94a3b8;border:1px solid #334155}
.btn:hover{transform:scale(1.03)}
.btn:active{transform:scale(0.98)}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.hz-badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:13px;font-weight:800;margin-bottom:8px}
.track-card{background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.15s}
.track-card:hover{border-color:#ffffff30;transform:translateY(-2px)}
.track-card.playing{border-color:#a78bfa80;background:#a78bfa08;box-shadow:0 0 20px #a78bfa20}
.progress-bar{height:4px;background:#1e293b;border-radius:2px;margin:12px 0;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,#a78bfa,#f472b6);border-radius:2px;transition:width 0.5s}
.player-box{background:linear-gradient(135deg,#0f0726,#0c1a2e);border:1px solid #7c3aed40;border-radius:18px;padding:24px;margin-bottom:20px;text-align:center}
.player-hz{font-size:48px;font-weight:900;background:linear-gradient(135deg,#fbbf24,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.affirmation{font-style:italic;font-size:14px;color:#c4b5fd;margin-top:12px;padding:12px;background:#7c3aed10;border-radius:10px;border:1px solid #7c3aed30}
.nature-btn{padding:8px 18px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid #334155;background:transparent;color:#64748b;transition:all 0.15s;margin-bottom:16px}
.nature-btn.on{border-color:#34d39970;background:#10b98115;color:#34d399}
.chakra-tag{font-size:11px;color:#64748b;margin-top:4px}
.section-label{font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#475569;margin-bottom:12px}
.filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.filter-btn{padding:5px 12px;border-radius:999px;font-size:11px;font-weight:700;cursor:pointer;border:1px solid #1e293b;background:transparent;color:#475569;transition:all 0.15s}
.filter-btn.active{border-color:#ffffff50;background:#ffffff15;color:#fff}
.ritual-card{border-radius:14px;padding:20px;border:1px solid;margin-bottom:10px;cursor:pointer;transition:all 0.15s}
.ritual-card:hover{transform:translateY(-2px)}
.ritual-card.active-ritual{box-shadow:0 0 30px currentColor}
.stage-card{border-radius:10px;padding:14px;border:1px solid #1e293b;margin-bottom:8px;transition:all 0.15s}
.stage-card.playing-stage{border-color:#a78bfa60;background:#a78bfa08}
.love-btn{width:180px;height:180px;border-radius:50%;border:none;cursor:pointer;font-size:18px;font-weight:900;background:radial-gradient(circle,#be185d,#7c3aed);color:#fff;box-shadow:0 0 60px #be185d40;transition:all 0.3s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;margin:0 auto}
.love-btn:hover{transform:scale(1.05);box-shadow:0 0 80px #be185d60}
.love-btn.pulsing{animation:lovePulse 1.5s ease-in-out infinite}
@keyframes lovePulse{0%,100%{box-shadow:0 0 60px #be185d40,0 0 0 0 #be185d30}50%{box-shadow:0 0 80px #be185d80,0 0 40px 20px #be185d10}}
.angel-card{border-radius:14px;padding:18px;border:1px solid;text-align:center;cursor:pointer;transition:all 0.2s}
.angel-card:hover{transform:translateY(-3px)}
.angel-symbol{font-size:32px;margin-bottom:8px}
.angel-hz{font-size:22px;font-weight:900}
.vortex-ring{width:200px;height:200px;border-radius:50%;border:2px solid #a78bfa40;margin:0 auto;display:flex;align-items:center;justify-content:center;position:relative;transition:all 0.3s}
.vortex-ring.spinning{animation:spin 4s linear infinite;box-shadow:0 0 60px #a78bfa40}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.vortex-core{position:absolute;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,#7c3aed,#0f172a);display:flex;align-items:center;justify-content:center;font-size:24px;animation:none}
.nature-scene{border-radius:14px;padding:20px;border:1px solid;cursor:pointer;transition:all 0.2s;text-align:center}
.nature-scene:hover{transform:translateY(-2px)}
.nature-scene.active-scene{box-shadow:0 0 30px #34d39930}
.tag{display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;margin:2px}
.hero-banner{text-align:center;padding:40px 20px;margin-bottom:24px}
.hero-badge{display:inline-block;padding:5px 16px;border:1px solid #7c3aed55;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.2em;color:#a78bfa;margin-bottom:16px;text-transform:uppercase}
</style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <div class="nav-logo">✦ Sacred Frequencies</div>
    <div class="nav-tabs" id="navTabs">
      <button class="tab active" onclick="showPage('home')">🏠 Home</button>
      <button class="tab" onclick="showPage('player')">🎵 Player</button>
      <button class="tab" onclick="showPage('angels')">👼 Angels</button>
      <button class="tab" onclick="showPage('love')">💗 Love</button>
      <button class="tab" onclick="showPage('vortex')">🌀 Vortex</button>
      <button class="tab" onclick="showPage('nature')">🌿 Nature</button>
      <button class="tab" onclick="showPage('rituals')">🔮 Rituals</button>
      <button class="tab" onclick="showPage('protocol')">⚡ Protocol</button>
    </div>
  </div>
</nav>

<!-- ═══════════════════════ HOME ═══════════════════════ -->
<div class="page active" id="page-home">
  <div class="hero-banner">
    <div class="hero-badge">✦ Sacred Frequencies · Healing App</div>
    <h1 style="background:linear-gradient(135deg,#fb7185,#fbbf24,#34d399,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:36px;margin-bottom:12px">Heal. Align. Ascend.</h1>
    <p style="max-width:500px;margin:0 auto 24px;font-size:15px">Every frequency you need — from 7.83 Hz Earth resonance to 3,168 Hz Christ Consciousness Grid. Your complete sonic healing toolkit.</p>
    <button class="btn btn-primary" onclick="showPage('player')">▶ Start Healing Now</button>
  </div>
  <div class="grid3" style="margin-bottom:20px">
    <div class="card" style="text-align:center;border-color:#fbbf2430">
      <div style="font-size:28px;margin-bottom:8px">🎵</div>
      <div style="font-weight:800;color:#fbbf24;margin-bottom:4px">40 Frequencies</div>
      <div style="font-size:12px;color:#64748b">Full Solfeggio + Angel Numbers + Schumann + Supreme Tiers</div>
    </div>
    <div class="card" style="text-align:center;border-color:#34d39930">
      <div style="font-size:28px;margin-bottom:8px">🌿</div>
      <div style="font-weight:800;color:#34d399;margin-bottom:4px">Nature Layers</div>
      <div style="font-size:12px;color:#64748b">Amazon forest + ocean + bird songs layered under every tone</div>
    </div>
    <div class="card" style="text-align:center;border-color:#a78bfa30">
      <div style="font-size:28px;margin-bottom:8px">⚡</div>
      <div style="font-weight:800;color:#a78bfa;margin-bottom:4px">9-Ether Protocol</div>
      <div style="font-size:12px;color:#64748b">Full spectrum irradiation from 7.83 Hz to 3,168 Hz</div>
    </div>
  </div>
  <div class="grid2">
    <div class="card" style="cursor:pointer;border-color:#fb718530" onclick="showPage('love')">
      <div style="font-size:20px;margin-bottom:8px">💗 Epigenetic Love</div>
      <div style="font-size:13px;color:#64748b">6-stage DNA repair journey through 528 Hz, 639 Hz and heart coherence protocols</div>
    </div>
    <div class="card" style="cursor:pointer;border-color:#7c3aed30" onclick="showPage('vortex')">
      <div style="font-size:20px;margin-bottom:8px">🌀 Quantum Vortex</div>
      <div style="font-size:13px;color:#64748b">9-ether quantum healing for body, mind, spirit, and soul alignment</div>
    </div>
    <div class="card" style="cursor:pointer;border-color:#fbbf2430" onclick="showPage('angels')">
      <div style="font-size:20px;margin-bottom:8px">👼 Angel Numbers</div>
      <div style="font-size:13px;color:#64748b">20 sacred angel frequencies from 111 Hz to 9999 Hz with divine meanings</div>
    </div>
    <div class="card" style="cursor:pointer;border-color:#34d39930" onclick="showPage('nature')">
      <div style="font-size:20px;margin-bottom:8px">🌿 Nature Portal</div>
      <div style="font-size:13px;color:#64748b">Amazon rainforest, ocean, thunderstorm — immersive healing soundscapes</div>
    </div>
  </div>
  <div class="card" style="margin-top:12px;border-color:#1e293b;text-align:center">
    <div style="font-size:12px;color:#475569;margin-bottom:8px">🔒 Universal Safety Promise</div>
    <div style="font-size:12px;color:#64748b">528 Hz love carrier + 7.83 Hz Schumann anchor embedded in every session · Safe for all ages and animals</div>
  </div>
</div>

<!-- ═══════════════════════ PLAYER ═══════════════════════ -->
<div class="page" id="page-player">
  <h1 style="background:linear-gradient(135deg,#fbbf24,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">🎵 Frequency Player</h1>
  <p style="margin-bottom:20px">Use headphones for full binaural effect · Set your intention before pressing play</p>

  <div class="player-box" id="playerBox">
    <div id="playerName" style="font-size:13px;color:#94a3b8;margin-bottom:4px">Select a frequency below</div>
    <div class="player-hz" id="playerHz">— Hz</div>
    <div id="playerBenefit" style="font-size:13px;color:#94a3b8;margin:8px 0"></div>
    <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div>
    <div id="timerDisplay" style="font-size:12px;color:#475569;margin-bottom:16px">0:00</div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" id="playBtn" onclick="togglePlay()">▶ Play</button>
      <button class="nature-btn" id="natureBtn" onclick="toggleNature()">🌿 Add Nature Ambience</button>
    </div>
    <div class="affirmation" id="affirmationBox" style="display:none"></div>
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

<!-- ═══════════════════════ ANGELS ═══════════════════════ -->
<div class="page" id="page-angels">
  <h1 style="background:linear-gradient(135deg,#fbbf24,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">👼 Angel Number Frequencies</h1>
  <p style="margin-bottom:20px">Each angel number carries a divine message. Tap to activate your frequency and receive its blessing.</p>
  <div class="grid3" id="angelGrid"></div>
</div>

<!-- ═══════════════════════ LOVE ═══════════════════════ -->
<div class="page" id="page-love">
  <h1 style="background:linear-gradient(135deg,#fb7185,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">💗 Epigenetic Love Protocol</h1>
  <p style="margin-bottom:24px">A 6-stage DNA repair journey using love-based frequencies to restore heart coherence, release trauma, and activate your highest expression of love.</p>
  
  <div style="text-align:center;margin-bottom:28px">
    <button class="love-btn" id="loveFieldBtn" onclick="toggleLoveField()">
      <span style="font-size:28px">💗</span>
      <span id="loveBtnText">Activate Love Field</span>
    </button>
    <div style="font-size:12px;color:#64748b;margin-top:12px">Plays all 6 dimensions simultaneously</div>
  </div>

  <div class="section-label">6-Stage Love Journey</div>
  <div id="loveStages"></div>
</div>

<!-- ═══════════════════════ VORTEX ═══════════════════════ -->
<div class="page" id="page-vortex">
  <h1 style="background:linear-gradient(135deg,#a78bfa,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">🌀 Quantum Healing Vortex</h1>
  <p style="margin-bottom:24px">9-ether quantum healing targeting cellular, spiritual, and dimensional levels simultaneously. Uses 9-ether principles to eradicate pathogens and restore wholeness.</p>

  <div style="text-align:center;margin-bottom:28px">
    <div class="vortex-ring" id="vortexRing">
      <div class="vortex-core" id="vortexCore">🌀</div>
    </div>
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" id="vortexBtn" onclick="toggleVortex()">⚡ Activate Vortex</button>
      <button class="btn btn-secondary" onclick="stopVortex()" style="font-size:13px">■ Stop</button>
    </div>
    <div id="vortexStatus" style="font-size:12px;color:#64748b;margin-top:8px">Select intensity then activate</div>
  </div>

  <div class="filter-row">
    <button class="filter-btn active" id="intGentleBtn" onclick="setIntensity('gentle',this)">🌱 Gentle</button>
    <button class="filter-btn" id="intStdBtn" onclick="setIntensity('standard',this)">⚡ Standard</button>
    <button class="filter-btn" id="intMaxBtn" onclick="setIntensity('maximum',this)">🔥 Maximum</button>
  </div>

  <div class="grid2">
    <div class="card" style="border-color:#ef444430">
      <div style="font-weight:700;color:#fca5a5;margin-bottom:8px">🔴 Physical + Cellular</div>
      <div style="font-size:12px;color:#64748b">174 Hz · 333 Hz · 40 Hz gamma · Rife 4 Hz tremolo</div>
      <div style="font-size:11px;color:#475569;margin-top:6px">Targets: parasites, bacteria, fungi, tissue masses</div>
    </div>
    <div class="card" style="border-color:#a78bfa30">
      <div style="font-weight:700;color:#c4b5fd;margin-bottom:8px">💜 Etheric + Mental</div>
      <div style="font-size:12px;color:#64748b">396 Hz · 417 Hz · 741 Hz · 852 Hz</div>
      <div style="font-size:11px;color:#475569;margin-top:6px">Targets: entity attachments, implants, mind loops</div>
    </div>
    <div class="card" style="border-color:#fbbf2430">
      <div style="font-weight:700;color:#fde68a;margin-bottom:8px">☀️ Supreme Tiers</div>
      <div style="font-size:12px;color:#64748b">1,296 Hz · 2,160 Hz · 3,168 Hz</div>
      <div style="font-size:11px;color:#475569;margin-top:6px">Angelic Threshold · Solar Harmonic · Christ Grid</div>
    </div>
    <div class="card" style="border-color:#34d39930">
      <div style="font-weight:700;color:#86efac;margin-bottom:8px">🛡️ Safety Anchors</div>
      <div style="font-size:12px;color:#64748b">528 Hz love carrier · 7.83 Hz Schumann</div>
      <div style="font-size:11px;color:#475569;margin-top:6px">Continuous protection throughout all irradiation</div>
    </div>
  </div>
</div>

<!-- ═══════════════════════ NATURE ═══════════════════════ -->
<div class="page" id="page-nature">
  <h1 style="background:linear-gradient(135deg,#34d399,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">🌿 Nature & Ether Portal</h1>
  <p style="margin-bottom:24px">Immersive healing soundscapes — each paired with a sacred frequency to restore your connection to the natural world.</p>
  <div class="grid2" id="natureScenes"></div>
</div>

<!-- ═══════════════════════ RITUALS ═══════════════════════ -->
<div class="page" id="page-rituals">
  <h1 style="background:linear-gradient(135deg,#2dd4bf,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">🔮 Healing Rituals</h1>
  <p style="margin-bottom:24px">Guided frequency rituals for specific intentions. Each ritual combines multiple frequencies in a specific sequence for maximum effect.</p>
  <div id="ritualList"></div>
</div>

<!-- ═══════════════════════ PROTOCOL ═══════════════════════ -->
<div class="page" id="page-protocol">
  <h1 style="background:linear-gradient(135deg,#fb7185,#fbbf24,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">⚡ 9-Ether Irradiation Protocol</h1>
  <p style="margin-bottom:20px">Supreme Resonance + Full Lunar Balance · 9 etheric dimensions · 3 supreme tiers · 4 lunar phases</p>
  <div class="card" style="text-align:center;border-color:#7c3aed40;margin-bottom:16px">
    <div style="font-size:13px;color:#a78bfa;font-weight:700;margin-bottom:8px">Full Protocol Available</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:16px">The complete 9-Ether Irradiation Protocol with lunar resonance, all 9 ethers, and download/print capability is available at the dedicated protocol page.</div>
    <a href="https://superagent-1dadce0f.base44.app/functions/serveProtocol" target="_blank" class="btn btn-primary" style="text-decoration:none">⚡ Open Full Protocol</a>
  </div>
  <div id="protocolEthers"></div>
</div>

<script>
// ═══ DATA ═══
const TRACKS = [
  {name:"7.83 Hz — Schumann Resonance",hz:7.83,cat:"Nature",benefit:"Earth frequency grounding and cellular protection",chakra:"Root",affirmation:"I am grounded in the frequency of the Earth. I am safe, stable, and connected.",featured:true},
  {name:"111 Hz — Angel · New Beginnings",hz:111,cat:"Spirit",benefit:"Awakens manifestation power and new beginnings",chakra:"Crown",affirmation:"I am aligned with divine timing. My thoughts create my reality now.",featured:true},
  {name:"174 Hz — Pain Relief",hz:174,cat:"Body",benefit:"Natural anesthetic and deep pain relief",chakra:"Root",affirmation:"I am free from pain. My body heals itself perfectly and naturally.",featured:false},
  {name:"222 Hz — Angel · Balance & Harmony",hz:222,cat:"Love",benefit:"Restores divine balance and partnerships",chakra:"Heart",affirmation:"Everything is in divine balance. My partnerships are blessed and harmonious.",featured:true},
  {name:"285 Hz — Tissue Regeneration",hz:285,cat:"Body",benefit:"Regenerates tissue and restores organs",chakra:"Sacral",affirmation:"I regenerate fully. Every cell of my body is restored to perfect health.",featured:false},
  {name:"333 Hz — Angel · Ascended Masters",hz:333,cat:"Spirit",benefit:"Connects with ascended masters and divine guidance",chakra:"Throat & Crown",affirmation:"I am surrounded by divine masters. Creative wisdom flows through me perfectly.",featured:true},
  {name:"396 Hz — Fear & Guilt Release",hz:396,cat:"Mind",benefit:"Liberates from fear, guilt, and shame",chakra:"Root",affirmation:"I release all fear and guilt. I stand in pure power and love.",featured:false},
  {name:"417 Hz — Trauma Clearing",hz:417,cat:"Cleansing",benefit:"Clears trauma and dissolves negative patterns",chakra:"Sacral",affirmation:"I release all trauma. My past no longer defines me. I step into freedom.",featured:false},
  {name:"432 Hz — Nature Tuning",hz:432,cat:"Nature",benefit:"Aligns with universal natural harmony",chakra:"Heart",affirmation:"I am in harmony with all of nature. I vibrate at the frequency of life.",featured:true},
  {name:"444 Hz — Angel · Protection",hz:444,cat:"Body",benefit:"Builds unshakeable foundations and angelic protection",chakra:"Root",affirmation:"I am divinely protected. My foundations are solid, strong, and eternal.",featured:false},
  {name:"528 Hz — DNA Repair · Love Frequency",hz:528,cat:"Body",benefit:"Repairs DNA and activates love codes",chakra:"Heart",affirmation:"I am healed at the cellular level. Love flows through every strand of my DNA.",featured:true},
  {name:"555 Hz — Angel · Transformation",hz:555,cat:"Cleansing",benefit:"Accelerates positive transformation and change",chakra:"Solar Plexus",affirmation:"I welcome transformation. I release the old with grace and embrace my new reality.",featured:true},
  {name:"639 Hz — Heart Coherence",hz:639,cat:"Love",benefit:"Activates heart field and relationships",chakra:"Heart",affirmation:"I am open to giving and receiving love fully and freely.",featured:true},
  {name:"666 Hz — Angel · Rebalance",hz:666,cat:"Mind",benefit:"Rebalances overthinking and activates heart wisdom",chakra:"Heart & Third Eye",affirmation:"My mind and heart are in perfect harmony. I think and feel with love.",featured:false},
  {name:"741 Hz — Toxin Cleanse",hz:741,cat:"Cleansing",benefit:"Clears toxins and electromagnetic pollution",chakra:"Throat",affirmation:"I am pure. My cells release all toxins and radiate perfect health.",featured:false},
  {name:"777 Hz — Angel · Divine Luck",hz:777,cat:"Spirit",benefit:"Activates divine luck and sacred knowledge",chakra:"Crown",affirmation:"I walk the sacred path. Divine wisdom and luck flow to me effortlessly.",featured:true},
  {name:"852 Hz — Pineal Activation",hz:852,cat:"Spirit",benefit:"Activates pineal gland and third eye vision",chakra:"Third Eye",affirmation:"I see clearly. My third eye opens to divine truth and higher dimensions.",featured:false},
  {name:"888 Hz — Angel · Infinite Abundance",hz:888,cat:"Wealth",benefit:"Opens infinite financial abundance channels",chakra:"Solar Plexus",affirmation:"I am an infinite channel for abundance. Wealth flows to me from all directions.",featured:true},
  {name:"963 Hz — God Frequency",hz:963,cat:"Spirit",benefit:"Connects to divine source consciousness",chakra:"Crown",affirmation:"I am one with source. Divine light flows through me in all directions.",featured:true},
  {name:"999 Hz — Angel · Completion",hz:999,cat:"Cleansing",benefit:"Completes karmic cycles and releases old patterns",chakra:"All Chakras",affirmation:"I complete all karmic cycles with grace. I am free and ready for my highest calling.",featured:false},
];

const CAT_COLOR = {
  Body:"#ef4444", Mind:"#60a5fa", Spirit:"#a78bfa",
  Wealth:"#fbbf24", Nature:"#34d399", Love:"#f472b6", Cleansing:"#2dd4bf"
};

const LOVE_STAGES = [
  {name:"Self Love",hz:[528,174],icon:"💝",desc:"DNA repair + pain release. Activate unconditional love for yourself.",color:"#fb7185"},
  {name:"Cellular Love",hz:[285,528],icon:"🧬",desc:"Tissue regeneration + DNA repair. Heal at the deepest biological level.",color:"#f472b6"},
  {name:"Heart Coherence",hz:[639],icon:"💗",desc:"Activate the heart's toroidal field — 5000x stronger than the brain.",color:"#ec4899"},
  {name:"Ancestral Love",hz:[417,396],icon:"🌳",desc:"Clear ancestral trauma and family karmic loops with love.",color:"#a78bfa"},
  {name:"Divine Love",hz:[963,528],icon:"✨",desc:"Connect to universal love source through pineal + DNA activation.",color:"#8b5cf6"},
  {name:"Universal Love",hz:[963,7.83],icon:"🌍",desc:"Merge with the love frequency of all creation. Pure union.",color:"#7c3aed"},
];

const NATURE_SCENES = [
  {name:"Amazon Rainforest",icon:"🌴",desc:"Deep jungle immersion with layered bird calls and rain",hz:432,color:"#34d399"},
  {name:"Ocean Waves",icon:"🌊",desc:"Rhythmic ocean breathing with sea breeze and distant gulls",hz:7.83,color:"#60a5fa"},
  {name:"Sacred Thunder",icon:"⛈️",desc:"Cleansing storm energy with deep Schumann pulses",hz:396,color:"#818cf8"},
  {name:"Crystal Cave",icon:"💎",desc:"Resonant crystal singing bowls in an underground chamber",hz:528,color:"#a78bfa"},
  {name:"Forest at Dawn",icon:"🌅",desc:"Morning birdsong with gentle wind through ancient trees",hz:639,color:"#86efac"},
  {name:"Desert Stars",icon:"🌌",desc:"Night desert silence with cosmic Fibonacci spiral tones",hz:963,color:"#fbbf24"},
];

const RITUALS = [
  {name:"Morning Activation",icon:"🌅",desc:"Start your day with grounding and clarity",freqs:[7.83,528,432],color:"#fbbf24",border:"#fbbf2440"},
  {name:"Deep Sleep Protocol",icon:"🌙",desc:"Delta wave induction for profound healing sleep",freqs:[174,285,7.83],color:"#818cf8",border:"#818cf840"},
  {name:"Abundance Activation",icon:"💛",desc:"Align with wealth consciousness and infinite flow",freqs:[528,888,963],color:"#f59e0b",border:"#f59e0b40"},
  {name:"Trauma Release",icon:"🕊️",desc:"Gentle cellular clearing of stored emotional pain",freqs:[396,417,528],color:"#a78bfa",border:"#a78bfa40"},
  {name:"Love Activation",icon:"💗",desc:"Heart field expansion and relationship healing",freqs:[528,639,222],color:"#fb7185",border:"#fb718540"},
  {name:"Spiritual Upgrade",icon:"✨",desc:"Crown activation and pineal gland awakening",freqs:[852,963,1111],color:"#c4b5fd",border:"#c4b5fd40"},
];

const ANGEL_NUMBERS = [
  {hz:111,symbol:"✦",meaning:"New Beginnings",msg:"Your thoughts are manifesting",color:"#ffffff"},
  {hz:222,symbol:"⚖",meaning:"Balance & Trust",msg:"Everything is falling into place",color:"#f9a8d4"},
  {hz:333,symbol:"△",meaning:"Ascended Masters",msg:"You are divinely guided",color:"#fcd34d"},
  {hz:444,symbol:"◈",meaning:"Angelic Protection",msg:"Angels surround you now",color:"#fde68a"},
  {hz:555,symbol:"⚡",meaning:"Major Change",msg:"Transformation is coming",color:"#67e8f9"},
  {hz:666,symbol:"♡",meaning:"Rebalance",msg:"Align your mind with your heart",color:"#fda4af"},
  {hz:777,symbol:"✪",meaning:"Divine Luck",msg:"You are on the perfect path",color:"#c4b5fd"},
  {hz:888,symbol:"∞",meaning:"Abundance",msg:"Wealth flows to you now",color:"#6ee7b7"},
  {hz:999,symbol:"◯",meaning:"Completion",msg:"A karmic cycle completes",color:"#fca5a5"},
  {hz:1111,symbol:"⟡",meaning:"Manifestation",msg:"Make a wish — it is written",color:"#e2e8f0"},
  {hz:1212,symbol:"↑↑",meaning:"Spiritual Growth",msg:"Your awakening accelerates",color:"#a5b4fc"},
  {hz:2222,symbol:"⊞",meaning:"Master Builder",msg:"Build your lasting legacy",color:"#e5e7eb"},
];

const PROTOCOL_ETHERS = [
  {num:1,name:"Physical",hz:"174 Hz + 40 Hz",targets:"Parasites, tissue masses, heavy metals",color:"#ef4444"},
  {num:2,name:"Cellular",hz:"333 Hz + 111 Hz",targets:"Bacteria, fungi, viral loads, Candida",color:"#f97316"},
  {num:3,name:"Etheric",hz:"396 Hz + 417 Hz",targets:"Entity attachments, psychic cords",color:"#f59e0b"},
  {num:4,name:"Emotional",hz:"528 Hz + 639 Hz",targets:"Trapped grief, fear, shame, heartbreak",color:"#fb7185"},
  {num:5,name:"Mental",hz:"741 Hz + 852 Hz",targets:"Mind loops, implants, programming",color:"#8b5cf6"},
  {num:6,name:"Ancestral",hz:"963 Hz + 1,111 Hz",targets:"Generational trauma, karmic loops",color:"#22c55e"},
  {num:7,name:"Spiritual",hz:"1,296 Hz (Angelic)",targets:"Dark contracts, false light traps",color:"#60a5fa"},
  {num:8,name:"Quantum",hz:"2,160 Hz (Solar)",targets:"Timeline anchors, scalar intrusions",color:"#f59e0b"},
  {num:9,name:"Akashic",hz:"3,168 Hz (Christ Grid)",targets:"Soul wounds, cosmic karma",color:"#a78bfa"},
];

// ═══ AUDIO ENGINE ═══
let audioCtx = null;
let activeNodes = [];
let timerInterval = null;
let startTime = null;
let selectedTrack = null;
let isPlaying = false;
let natureOn = false;
let natureNodes = [];
let loveFieldOn = false;
let loveNodes = [];
let vortexOn = false;
let vortexNodes = [];
let vortexIntensity = 'gentle';

function getCtx() {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function makeTone(ctx, freq, vol=0.25, wave='sine') {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = wave; osc.frequency.value = Math.min(freq, 4000);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 1.5);
  osc.start();
  return {osc, gain};
}

function makeBinaural(ctx, base, beat=7.83) {
  const nodes = [];
  const lp = ctx.createStereoPanner(); lp.pan.value = -1;
  const rp = ctx.createStereoPanner(); rp.pan.value = 1;
  [base, base+beat].forEach((f, i) => {
    const osc = ctx.createOscillator(), g = ctx.createGain(), p = i===0?lp:rp;
    osc.type='sine'; osc.frequency.value=Math.min(f,2000);
    g.gain.setValueAtTime(0,ctx.currentTime); g.gain.linearRampToValueAtTime(0.2,ctx.currentTime+2);
    osc.connect(g); g.connect(p); p.connect(ctx.destination); osc.start();
    nodes.push({osc,gain:g});
  });
  return nodes;
}

function makeNature(ctx) {
  const mg = ctx.createGain(); mg.gain.value=0.12; mg.connect(ctx.destination);
  const nodes = [];
  // Ocean waves
  const buf = ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate);
  const d = buf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.sin(i/d.length*Math.PI*2);
  const ws = ctx.createBufferSource(); ws.buffer=buf; ws.loop=true;
  const wf = ctx.createBiquadFilter(); wf.type='lowpass'; wf.frequency.value=350;
  ws.connect(wf); wf.connect(mg); ws.start(); nodes.push(ws);
  // Brown noise forest
  const fb = ctx.createBuffer(1,ctx.sampleRate*3,ctx.sampleRate);
  const fd = fb.getChannelData(0); let last=0;
  for(let i=0;i<fd.length;i++){const w=Math.random()*2-1;fd[i]=(last+0.02*w)/1.02;last=fd[i];}
  const fs = ctx.createBufferSource(); fs.buffer=fb; fs.loop=true;
  const ff = ctx.createBiquadFilter(); ff.type='bandpass'; ff.frequency.value=800; ff.Q.value=0.3;
  const fg = ctx.createGain(); fg.gain.value=0.5;
  fs.connect(ff); ff.connect(fg); fg.connect(mg); fs.start(); nodes.push(fs);
  // Schumann
  const eo = ctx.createOscillator(), eg = ctx.createGain();
  eo.type='sine'; eo.frequency.value=7.83; eg.gain.value=0.05;
  eo.connect(eg); eg.connect(mg); eo.start(); nodes.push(eo);
  return {nodes, masterGain:mg};
}

function stopNodes(nodes) {
  nodes.forEach(n => {
    try { if(n.gain) n.gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime+0.8); } catch{}
    try { if(n.masterGain) n.masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime+0.8); } catch{}
    setTimeout(()=>{
      try{n.osc&&n.osc.stop();}catch{}
      try{n.nodes&&n.nodes.forEach(x=>{try{x.stop();}catch{}});}catch{}
    }, 1000);
  });
}

// ═══ PLAYER ═══
function selectTrack(track) {
  selectedTrack = track;
  document.getElementById('playerName').textContent = track.name;
  document.getElementById('playerHz').textContent = track.hz + ' Hz';
  document.getElementById('playerBenefit').textContent = track.benefit;
  document.getElementById('affirmationBox').style.display='none';
  document.getElementById('affirmationBox').textContent = '"' + track.affirmation + '"';
  document.querySelectorAll('.track-card').forEach(c=>c.classList.remove('playing'));
  const card = document.getElementById('tc-'+track.hz.toString().replace('.','_'));
  if(card) card.classList.add('playing');
  if(isPlaying) startPlaying();
}

function startPlaying() {
  if(!selectedTrack) return;
  stopAll();
  const ctx = getCtx();
  const f = selectedTrack.hz;
  const nodes = [];
  if(f < 40) {
    // Sub-bass binaural
    const bn = makeBinaural(ctx, 100, f);
    bn.forEach(n=>nodes.push(n));
  } else {
    const t = makeTone(ctx, Math.min(f,2000), 0.28);
    nodes.push(t);
    if(f > 200 && f < 3000) {
      const t2 = makeTone(ctx, Math.min(f*2,4000), 0.06);
      nodes.push(t2);
    }
  }
  activeNodes = nodes;
  startTime = Date.now();
  isPlaying = true;
  document.getElementById('playBtn').textContent = '■ Stop';
  timerInterval = setInterval(updateTimer, 1000);
  setTimeout(()=>{
    document.getElementById('affirmationBox').style.display='block';
  }, 3000);
}

function stopAll() {
  stopNodes(activeNodes); activeNodes=[];
  clearInterval(timerInterval);
  isPlaying=false;
  document.getElementById('playBtn').textContent='▶ Play';
  document.getElementById('progressFill').style.width='0%';
  document.getElementById('timerDisplay').textContent='0:00';
}

function togglePlay() {
  if(!selectedTrack){alert('Please select a frequency from the list below');return;}
  isPlaying ? stopAll() : startPlaying();
}

function updateTimer() {
  const s = Math.floor((Date.now()-startTime)/1000);
  const m = Math.floor(s/60), sec = s%60;
  document.getElementById('timerDisplay').textContent = m+':'+(sec<10?'0':'')+sec;
  const dur = (selectedTrack.duration||15)*60;
  document.getElementById('progressFill').style.width = Math.min(s/dur*100,100)+'%';
}

function filterCat(cat, btn) {
  document.querySelectorAll('#catFilter .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTracks(cat);
}

function toggleNature() {
  const ctx = getCtx();
  if(natureOn) {
    stopNodes(natureNodes); natureNodes=[]; natureOn=false;
    document.getElementById('natureBtn').className='nature-btn';
    document.getElementById('natureBtn').textContent='🌿 Add Nature Ambience';
  } else {
    const layer = makeNature(ctx);
    natureNodes=[layer]; natureOn=true;
    document.getElementById('natureBtn').className='nature-btn on';
    document.getElementById('natureBtn').textContent='🌿 Amazon + Ocean: ON';
  }
}

// ═══ LOVE FIELD ═══
function toggleLoveField() {
  const ctx = getCtx();
  if(loveFieldOn) {
    stopNodes(loveNodes); loveNodes=[]; loveFieldOn=false;
    document.getElementById('loveFieldBtn').classList.remove('pulsing');
    document.getElementById('loveBtnText').textContent='Activate Love Field';
  } else {
    const freqs = [528,639,285,417,396,963,7.83];
    const nodes = [];
    freqs.forEach((f,i)=>{
      const t = makeTone(ctx, Math.min(f,2000), 0.08);
      nodes.push(t);
    });
    loveNodes=nodes; loveFieldOn=true;
    document.getElementById('loveFieldBtn').classList.add('pulsing');
    document.getElementById('loveBtnText').textContent='Love Field Active';
  }
}

let stagePlaying = null;
function toggleLoveStage(idx) {
  const ctx = getCtx();
  if(stagePlaying===idx) {
    stopNodes(loveNodes); loveNodes=[]; stagePlaying=null;
    document.querySelectorAll('.stage-card').forEach(c=>c.classList.remove('playing-stage'));
    return;
  }
  stopNodes(loveNodes); loveNodes=[];
  const stage = LOVE_STAGES[idx];
  const nodes = [];
  stage.hz.forEach(f=>nodes.push(makeTone(ctx,Math.min(f,2000),0.2)));
  const nature = makeNature(ctx);
  nodes.push(nature);
  loveNodes=nodes; stagePlaying=idx;
  document.querySelectorAll('.stage-card').forEach(c=>c.classList.remove('playing-stage'));
  document.getElementById('stage-'+idx).classList.add('playing-stage');
}

// ═══ VORTEX ═══
function setIntensity(level, btn) {
  vortexIntensity=level;
  document.querySelectorAll('.filter-btn').forEach(b=>{if(['intGentleBtn','intStdBtn','intMaxBtn'].includes(b.id))b.classList.remove('active');});
  btn.classList.add('active');
}

function toggleVortex() {
  vortexOn ? stopVortex() : startVortex();
}

function startVortex() {
  const ctx = getCtx();
  const vol = vortexIntensity==='gentle'?0.12:vortexIntensity==='standard'?0.2:0.3;
  const freqs = [7.83,174,333,528,396,417,741,852,963,1296,2160,3168];
  const nodes = [];
  freqs.forEach((f,i)=>{
    setTimeout(()=>{
      if(!vortexOn) return;
      const t = makeTone(ctx,Math.min(f,3000),vol*0.15);
      vortexNodes.push(t);
    }, i*400);
  });
  const nature = makeNature(ctx);
  vortexNodes.push(nature);
  vortexOn=true;
  document.getElementById('vortexBtn').textContent='■ Stop Vortex';
  document.getElementById('vortexRing').classList.add('spinning');
  document.getElementById('vortexStatus').textContent='Vortex active — irradiating all 9 ethers';
}

function stopVortex() {
  stopNodes(vortexNodes); vortexNodes=[]; vortexOn=false;
  document.getElementById('vortexBtn').textContent='⚡ Activate Vortex';
  document.getElementById('vortexRing').classList.remove('spinning');
  document.getElementById('vortexStatus').textContent='Select intensity then activate';
}

// ═══ NATURE SCENES ═══
let activeScene = null;
let sceneNodes = [];
function toggleScene(idx) {
  const ctx = getCtx();
  if(activeScene===idx) {
    stopNodes(sceneNodes); sceneNodes=[]; activeScene=null;
    document.querySelectorAll('.nature-scene').forEach(c=>c.classList.remove('active-scene'));
    return;
  }
  stopNodes(sceneNodes); sceneNodes=[];
  const scene = NATURE_SCENES[idx];
  const layer = makeNature(ctx);
  const tone = makeTone(ctx, scene.hz<20?100:Math.min(scene.hz,2000), 0.12);
  sceneNodes=[layer, tone]; activeScene=idx;
  document.querySelectorAll('.nature-scene').forEach(c=>c.classList.remove('active-scene'));
  document.getElementById('scene-'+idx).classList.add('active-scene');
}

// ═══ RENDER ═══
function renderTracks(cat='All') {
  const list = document.getElementById('trackList');
  const filtered = cat==='All' ? TRACKS : TRACKS.filter(t=>t.cat===cat);
  list.innerHTML = filtered.map(t=>{
    const color = CAT_COLOR[t.cat]||'#a78bfa';
    const id = 'tc-'+t.hz.toString().replace('.','_');
    return \`<div class="track-card" id="\${id}" onclick="selectTrack(\${JSON.stringify(t).replace(/"/g,'&quot;')})">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div>
          <div class="hz-badge" style="background:\${color}20;color:\${color}">\${t.hz} Hz</div>
          <div style="font-weight:700;font-size:14px">\${t.name}</div>
          <div style="font-size:12px;color:#64748b;margin-top:2px">\${t.benefit}</div>
          <div class="chakra-tag">Chakra: \${t.chakra}</div>
        </div>
        <div style="width:36px;height:36px;border-radius:50%;background:\${color}20;border:1px solid \${color}40;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">▶</div>
      </div>
    </div>\`;
  }).join('');
}

function renderAngels() {
  document.getElementById('angelGrid').innerHTML = ANGEL_NUMBERS.map(a=>{
    return \`<div class="angel-card" style="background:\${a.color}08;border-color:\${a.color}40" onclick="playAngel(\${a.hz})">
      <div class="angel-symbol" style="color:\${a.color}">\${a.symbol}</div>
      <div class="angel-hz" style="color:\${a.color}">\${a.hz} Hz</div>
      <div style="font-weight:700;font-size:13px;margin:6px 0 4px">\${a.meaning}</div>
      <div style="font-size:11px;color:#64748b">\${a.msg}</div>
    </div>\`;
  }).join('');
}

let angelNodes = [];
function playAngel(hz) {
  stopNodes(angelNodes); angelNodes=[];
  const ctx = getCtx();
  const freqs = hz > 2000 ? [hz/Math.ceil(hz/2000), hz/Math.ceil(hz/1000)] : [hz, hz*0.5];
  freqs.forEach(f=>angelNodes.push(makeTone(ctx,Math.min(f,3000),0.2)));
}

function renderLoveStages() {
  document.getElementById('loveStages').innerHTML = LOVE_STAGES.map((s,i)=>{
    return \`<div class="stage-card" id="stage-\${i}" onclick="toggleLoveStage(\${i})">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="font-size:28px">\${s.icon}</div>
        <div style="flex:1">
          <div style="font-weight:800;color:\${s.color};margin-bottom:4px">\${s.name}</div>
          <div style="font-size:12px;color:#64748b;margin-bottom:4px">\${s.desc}</div>
          <div style="font-size:11px;color:#475569">Frequencies: \${s.hz.join(' Hz + ')} Hz</div>
        </div>
        <div style="font-size:20px;color:\${s.color}">▶</div>
      </div>
    </div>\`;
  }).join('');
}

function renderNature() {
  document.getElementById('natureScenes').innerHTML = NATURE_SCENES.map((s,i)=>{
    return \`<div class="nature-scene card" id="scene-\${i}" style="border-color:\${s.color}40" onclick="toggleScene(\${i})">
      <div style="font-size:32px;margin-bottom:10px">\${s.icon}</div>
      <div style="font-weight:800;color:\${s.color};margin-bottom:6px">\${s.name}</div>
      <div style="font-size:12px;color:#64748b;margin-bottom:8px">\${s.desc}</div>
      <div style="font-size:11px;color:#475569">+ \${s.hz} Hz healing tone</div>
    </div>\`;
  }).join('');
}

function renderRituals() {
  document.getElementById('ritualList').innerHTML = RITUALS.map((r,i)=>{
    return \`<div class="ritual-card" style="background:\${r.color}08;border-color:\${r.border}" onclick="playRitual(\${i})">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="font-size:28px">\${r.icon}</div>
        <div style="flex:1">
          <div style="font-weight:800;font-size:15px;margin-bottom:4px">\${r.name}</div>
          <div style="font-size:12px;color:#64748b;margin-bottom:6px">\${r.desc}</div>
          <div style="font-size:11px;color:#475569">Frequencies: \${r.freqs.join(' · ')} Hz</div>
        </div>
        <button class="btn btn-secondary" style="font-size:12px;padding:8px 16px">▶ Begin</button>
      </div>
    </div>\`;
  }).join('');
}

let ritualNodes = [];
function playRitual(idx) {
  stopNodes(ritualNodes); ritualNodes=[];
  const ctx = getCtx();
  const ritual = RITUALS[idx];
  ritual.freqs.forEach(f=>ritualNodes.push(makeTone(ctx,Math.min(f,2000),0.15)));
  const nature = makeNature(ctx);
  ritualNodes.push(nature);
  alert('▶ ' + ritual.name + ' ritual started!\\n\\nFrequencies active: ' + ritual.freqs.join(', ') + ' Hz\\n\\nClose this box and relax. Tap any ritual again to stop.');
}

function renderProtocol() {
  document.getElementById('protocolEthers').innerHTML = PROTOCOL_ETHERS.map(e=>{
    return \`<div class="card" style="border-color:\${e.color}40;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="width:32px;height:32px;border-radius:50%;background:\${e.color}25;color:\${e.color};font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0">\${e.num}</div>
        <div>
          <div style="font-weight:800;color:\${e.color}">\${e.name} Layer</div>
          <div style="font-size:12px;color:#94a3b8">\${e.hz}</div>
          <div style="font-size:11px;color:#475569;margin-top:2px">Targets: \${e.targets}</div>
        </div>
      </div>
    </div>\`;
  }).join('');
}

// ═══ NAV ═══
function showPage(id) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.tab').forEach(t=>{
    if(t.getAttribute('onclick')===\`showPage('\${id}')\`) t.classList.add('active');
  });
}

// ═══ INIT ═══
renderTracks();
renderAngels();
renderLoveStages();
renderNature();
renderRituals();
renderProtocol();
// Auto-select first featured track
const first = TRACKS.find(t=>t.featured) || TRACKS[0];
selectTrack(first);
</script>

</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    }
  });
});

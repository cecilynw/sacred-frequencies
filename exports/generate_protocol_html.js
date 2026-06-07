const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>9-Ether Irradiation Protocol — Supreme + Lunar Edition</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --gold:    #f59e0b;
    --rose:    #fb7185;
    --emerald: #34d399;
    --violet:  #a78bfa;
    --blue:    #60a5fa;
    --silver:  #cbd5e1;
    --bg:      #030712;
    --card:    #0f172a;
    --border:  #1e293b;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: #e2e8f0;
    line-height: 1.7;
    font-size: 14px;
  }

  /* ── PRINT ── */
  @media print {
    body { background: #fff; color: #111; font-size: 11px; }
    .no-print { display: none !important; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; break-inside: avoid; }
    .hero { background: #1e1b4b !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page-break { page-break-before: always; }
    a { color: #6d28d9; }
  }

  /* ── LAYOUT ── */
  .container { max-width: 900px; margin: 0 auto; padding: 0 24px 60px; }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(135deg, #0f0726 0%, #0c1a2e 50%, #0a1a0f 100%);
    padding: 60px 40px 50px;
    text-align: center;
    border-bottom: 1px solid #1e293b;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, #7c3aed18, transparent);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-block;
    padding: 6px 18px;
    border: 1px solid #7c3aed55;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #a78bfa;
    margin-bottom: 24px;
    text-transform: uppercase;
  }
  .hero h1 {
    font-family: 'Cinzel', serif;
    font-size: 38px;
    font-weight: 900;
    background: linear-gradient(135deg, #fb7185, #f59e0b, #34d399, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    line-height: 1.15;
  }
  .hero h2 {
    font-family: 'Cinzel', serif;
    font-size: 16px;
    font-weight: 400;
    color: #94a3b8;
    margin-bottom: 20px;
    letter-spacing: 0.08em;
  }
  .hero p {
    color: #94a3b8;
    max-width: 600px;
    margin: 0 auto 28px;
    font-size: 13px;
    line-height: 1.8;
  }
  .hero-meta {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    font-size: 11px;
    color: #475569;
  }
  .hero-meta span { display: flex; align-items: center; gap: 5px; }

  /* ── DOWNLOAD BAR ── */
  .download-bar {
    background: linear-gradient(90deg, #7c3aed18, #0f172a, #059669 18);
    border: 1px solid #7c3aed40;
    border-radius: 14px;
    padding: 18px 24px;
    margin: 28px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .download-bar p { color: #94a3b8; font-size: 12px; }
  .btn-dl {
    display: inline-block;
    padding: 12px 28px;
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    border-radius: 999px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 30px #7c3aed40;
    transition: transform 0.15s;
  }
  .btn-dl:hover { transform: scale(1.04); }
  .btn-print {
    padding: 12px 22px;
    background: transparent;
    color: #94a3b8;
    font-weight: 600;
    font-size: 13px;
    border-radius: 999px;
    border: 1px solid #334155;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-print:hover { border-color: #a78bfa; color: #a78bfa; }

  /* ── SECTION HEADERS ── */
  .section-header {
    margin: 44px 0 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-header h2 {
    font-family: 'Cinzel', serif;
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
  }
  .section-header .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #334155, transparent);
  }

  /* ── CARDS ── */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 10px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: #334155; }

  /* ── ETHER CARDS ── */
  .ether-grid { display: flex; flex-direction: column; gap: 8px; }
  .ether-card {
    border-radius: 12px;
    padding: 16px 18px;
    border: 1px solid;
    position: relative;
    overflow: hidden;
  }
  .ether-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }
  .ether-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
  .ether-name { font-weight: 800; font-size: 15px; display: flex; align-items: center; gap: 8px; }
  .ether-num { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; flex-shrink: 0; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; margin-left: 6px; }
  .hz-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .hz-tag { padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; }
  .ether-irradiates { font-size: 12px; color: #94a3b8; margin-bottom: 5px; }
  .ether-mechanism { font-size: 11px; color: #64748b; font-style: italic; line-height: 1.6; border-left: 2px solid #1e293b; padding-left: 10px; }

  /* ── TIER CARDS (SUPREME) ── */
  .tier-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
  .tier-card { border-radius: 14px; padding: 20px; border: 1px solid; text-align: center; }
  .tier-hz { font-size: 28px; font-weight: 900; font-family: 'Cinzel', serif; }
  .tier-name { font-size: 13px; font-weight: 700; margin: 6px 0 4px; }
  .tier-desc { font-size: 11px; color: #64748b; line-height: 1.6; }

  /* ── LUNAR CARDS ── */
  .lunar-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
  .lunar-card { border-radius: 14px; padding: 18px; border: 1px solid; }
  .lunar-phase { font-size: 28px; text-align: center; margin-bottom: 8px; }
  .lunar-name { font-weight: 800; font-size: 14px; text-align: center; margin-bottom: 4px; }
  .lunar-hz { font-size: 22px; font-weight: 900; text-align: center; font-family: 'Cinzel', serif; margin-bottom: 8px; }
  .lunar-element { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-align: center; text-transform: uppercase; margin-bottom: 8px; }
  .lunar-desc { font-size: 11px; color: #64748b; line-height: 1.6; margin-bottom: 8px; }
  .lunar-balance { font-size: 11px; font-weight: 600; line-height: 1.5; padding: 8px 10px; border-radius: 8px; border: 1px solid; }
  .lunar-affirmation { font-size: 11px; font-style: italic; color: #94a3b8; margin-top: 8px; line-height: 1.6; }

  /* ── RESTORATION TABLE ── */
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { background: #0f172a; color: #64748b; padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid #1e293b; }
  td { padding: 10px 14px; border-bottom: 1px solid #0f172a; vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #0f172a55; }

  /* ── SAFETY BOX ── */
  .safety-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px; }
  .safety-item { display: flex; gap: 10px; padding: 10px 14px; border-radius: 10px; border: 1px solid #1e293b; background: #0a1a0f08; }
  .safety-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; margin-top: 7px; }
  .safety-label { font-weight: 700; font-size: 12px; color: #34d399; }
  .safety-desc { font-size: 11px; color: #64748b; }

  /* ── AFFIRMATION BLOCK ── */
  .affirmation-block {
    background: linear-gradient(135deg, #7c3aed0a, #0f172a);
    border: 1px solid #7c3aed30;
    border-radius: 14px;
    padding: 20px 24px;
    margin-bottom: 10px;
    position: relative;
  }
  .aff-ether { font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
  .aff-text { font-style: italic; font-size: 13px; color: #c4b5fd; line-height: 1.7; }

  /* ── BEING TABLE ── */
  .being-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; }
  .being-card { padding: 12px 14px; border-radius: 10px; border: 1px solid #1e293b; background: #0f172a; display: flex; align-items: center; gap: 10px; }
  .being-icon { font-size: 20px; flex-shrink: 0; }
  .being-label { font-weight: 700; font-size: 12px; }
  .being-mod { font-size: 11px; color: #64748b; }

  /* ── INSTRUCTIONS ── */
  .steps { counter-reset: step; }
  .step { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid #0f172a; }
  .step:last-child { border-bottom: none; }
  .step-num { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #6d28d9); color: #fff; font-weight: 900; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .step-content { flex: 1; }
  .step-title { font-weight: 700; font-size: 13px; margin-bottom: 3px; }
  .step-desc { font-size: 12px; color: #64748b; }

  /* ── REFS ── */
  .ref-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 6px; }
  .ref-item { display: flex; gap: 12px; padding: 8px 12px; border-radius: 8px; border: 1px solid #1e293b; }
  .ref-name { font-weight: 700; font-size: 11px; color: #f59e0b; white-space: nowrap; min-width: 180px; }
  .ref-desc { font-size: 11px; color: #64748b; }

  /* ── FOOTER ── */
  .footer { text-align: center; padding: 40px 20px; color: #334155; font-size: 11px; border-top: 1px solid #0f172a; margin-top: 60px; }
  .footer strong { color: #475569; }

  /* ── UTIL ── */
  .text-center { text-align: center; }
  .mt-2 { margin-top: 8px; }
  .mb-2 { margin-bottom: 8px; }
  .italic { font-style: italic; }
  .seal-box {
    text-align: center;
    padding: 40px 24px;
    background: linear-gradient(135deg, #e879f908, #ef444406, #22c55e06);
    border: 1px solid #7c3aed20;
    border-radius: 20px;
    margin-top: 40px;
  }
  .seal-symbol { font-size: 48px; display: block; margin-bottom: 16px; }
  .seal-title { font-family: 'Cinzel', serif; font-size: 22px; font-weight: 900; background: linear-gradient(135deg, #fb7185, #f59e0b, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; }
  .seal-text { color: #64748b; font-size: 13px; max-width: 500px; margin: 0 auto 8px; line-height: 1.8; }
  .seal-so { font-style: italic; color: #475569; font-size: 12px; }
</style>
</head>
<body>

<!-- ═══════════════════════════════════════════════════════ HERO -->
<div class="hero">
  <div class="hero-badge">✦ Sacred Frequencies · Universal Healing Protocol</div>
  <h1>9-Ether Irradiation Protocol</h1>
  <h2>Supreme Resonance + Full Lunar Balance Edition</h2>
  <p>
    9 etheric dimensions · 3 supreme tiers · 4 lunar phases<br>
    Every frequency above 333 Hz elevated to its highest and safest degree for life.<br>
    Full spectrum: 7.83 Hz → 3,168 Hz · All beings · All dimensions · All timelines.
  </p>
  <div class="hero-meta">
    <span>📅 June 7, 2026</span>
    <span>👤 Cecilyn Williams</span>
    <span>🎵 Sacred Frequencies App</span>
    <span>🔒 Version: Supreme + Lunar</span>
  </div>
</div>

<div class="container">

<!-- ═══════ DOWNLOAD BAR -->
<div class="download-bar no-print">
  <div>
    <strong style="color:#e2e8f0">📥 Download or Print this Protocol</strong>
    <p>Save as PDF via Print → Save as PDF · or use the buttons to download</p>
  </div>
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <button class="btn-dl" onclick="window.print()">🖨️ Print / Save PDF</button>
    <button class="btn-print" onclick="downloadHTML()">⬇️ Download HTML</button>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════ OVERVIEW -->
<div class="section-header">
  <h2>✦ Protocol Overview</h2>
  <div class="line"></div>
</div>

<div class="card">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px">
    <div>
      <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">9 Etheric Dimensions</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.8">
        Physical · Cellular · Etheric · Emotional · Mental · Ancestral · Spiritual · Quantum · Akashic
      </div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">3 Supreme Tiers</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.8">
        👼 Angelic Threshold 1,296 Hz<br>
        ☀️ Solar Harmonic 2,160 Hz<br>
        ✦ Christ Grid 3,168 Hz
      </div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">4 Lunar Phases</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.8">
        🌑 New Moon 136.10 Hz<br>
        🌒 Waxing 210.42 Hz<br>
        🌕 Full Moon 221.23 Hz<br>
        🌘 Waning 229.22 Hz
      </div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Full Spectrum</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.8">
        7.83 Hz (Schumann)<br>↕<br>
        3,168 Hz (Supreme ceiling)<br>
        <span style="color:#34d399;font-weight:700">Safe for all life</span>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════ 9 ETHERS -->
<div class="section-header">
  <h2>🌀 The 9 Ethers — Complete Frequency Table</h2>
  <div class="line"></div>
</div>

<div class="ether-grid">

  ${[
    { n:1, name:"Physical Layer",   icon:"🔴", col:"#ef4444", bg:"#ef444408", hz:"174 Hz", sub:"40 Hz",   sup:null,      beat:"2 Hz",   tier:"BASE",     chakra:"Root",         irr:"Physical parasites, tissue masses, crystallised toxins, heavy metals, bone spurs",   mech:"174 Hz — the lowest Solfeggio — operates on the body crystalline matrix. Collapses the quantum wave-function of pain. Dissolves physical entanglement back into coherent flow." },
    { n:2, name:"Cellular Layer",   icon:"🟠", col:"#f97316", bg:"#f9731608", hz:"333 Hz", sub:"111 Hz",  sup:null,      beat:"3 Hz",   tier:"BASE",     chakra:"Sacral",       irr:"Parasitic worms, flukes, bacteria, fungi, viral loads, Candida, Lyme spirochetes",    mech:"Royal Rife (1934): every pathogen has a unique Mortal Oscillatory Rate. 333 Hz + 111 Hz creates a resonant irradiation field — lethal to parasitic life, regenerative for healthy cells." },
    { n:3, name:"Etheric Layer",    icon:"🟡", col:"#f59e0b", bg:"#f59e0b08", hz:"396 Hz", sub:"198 Hz",  sup:"417 Hz",  beat:"4 Hz",   tier:"ELEVATED", chakra:"Solar Plexus", irr:"Etheric parasites, entity attachments, psychic cords, dark imprints, astral implants", mech:"396 Hz liberates guilt and fear — the two primary host-signals that attract etheric parasites. 198 Hz sub-octave penetrates the etheric double. 417 Hz supreme overlay: the Violet Flame — dismantles every attachment at its root." },
    { n:4, name:"Emotional Layer",  icon:"💗", col:"#fb7185", bg:"#fb718508", hz:"528 Hz", sub:"264 Hz",  sup:"639 Hz",  beat:"3.5 Hz", tier:"ELEVATED", chakra:"Heart",        irr:"Trapped grief, rage, shame, fear, guilt — emotional parasites feeding on unresolved feeling", mech:"528 Hz (miracle frequency) irradiates while simultaneously healing. 264 Hz sub-octave vibrates the physical heart muscle directly. 639 Hz supreme overlay activates the heart's toroidal field — 5,000× stronger than the brain." },
    { n:5, name:"Mental Layer",     icon:"💜", col:"#8b5cf6", bg:"#8b5cf608", hz:"741 Hz", sub:"370 Hz",  sup:"852 Hz",  beat:"10 Hz",  tier:"ELEVATED", chakra:"Throat",       irr:"Intrusive thoughts, mental loops, psychic implants, hypnotic programming, mind-control residue", mech:"741 Hz awakens intuition and detoxifies electromagnetic fields. 370 Hz sub-octave penetrates the corpus callosum. 852 Hz supreme overlay decalcifies the pineal gland — removing the antenna that receives harmful mental programming." },
    { n:6, name:"Ancestral Layer",  icon:"🌳", col:"#22c55e", bg:"#22c55e08", hz:"417 Hz", sub:"208 Hz",  sup:"528 Hz",  beat:"2 Hz",   tier:"ELEVATED", chakra:"Ancestral Heart", irr:"Ancestral trauma methylation, inherited disease codes, generational curses, bloodline entities", mech:"417 Hz is the Solfeggio change frequency — undoes stored ancestral wound structures. 208 Hz sub-octave reaches the cellular nucleus where methylation patterns are stored. 528 Hz supreme overlay seals cleared DNA immediately with the divine template." },
    { n:7, name:"Spiritual Layer",  icon:"🤍", col:"#94a3b8", bg:"#94a3b808", hz:"852 Hz", sub:"426 Hz",  sup:"963 Hz",  beat:"7 Hz",   tier:"ELEVATED", chakra:"Third Eye / Pineal", irr:"Karmic entanglements, harmful soul contracts, dark initiations, spiritual interference, vows of limitation", mech:"852 Hz returns spiritual order and begins pineal decalcification. 426 Hz sub-octave is the precise resonant frequency of the pineal gland cavity. 963 Hz supreme overlay opens the direct channel to Source consciousness." },
    { n:8, name:"Quantum Layer",    icon:"⭐", col:"#fbbf24", bg:"#fbbf2408", hz:"963 Hz", sub:"481 Hz",  sup:"1,111 Hz",beat:"9 Hz",   tier:"SUPREME",  chakra:"Crown",        irr:"Quantum interference patterns, timeline contamination, reality distortions, probability hijacking", mech:"963 Hz (God frequency) collapses all disordered wave-functions back to their divine ground state. 1,111 Hz supreme overlay: the manifestation portal — writes the restored template permanently into the quantum field as a new probability." },
    { n:9, name:"Akashic Layer",    icon:"✦",  col:"#e879f9", bg:"#e879f908", hz:"1,111 Hz",sub:"555 Hz", sup:"1,296 Hz",beat:"9 Hz",   tier:"SUPREME",  chakra:"Soul Star / Monad", irr:"ALL remaining harmful presences across ALL dimensions, ALL timelines, ALL connected beings — nothing excluded", mech:"1,111 Hz opens the angel gateway — where human consciousness touches the angelic realm. 1,296 Hz supreme overlay = 9 × 144 Hz Fibonacci angelic resonance — the highest frequency the human auditory system processes as coherent healing. The 9 Hz binaural beat creates a non-local quantum field that is everywhere simultaneously." },
  ].map(e => `
  <div class="ether-card" style="background:${e.bg};border-color:${e.col}28">
    <div style="position:absolute;top:0;left:0;right:0;height:2px;background:${e.col}"></div>
    <div class="ether-top">
      <div class="ether-name">
        <div class="ether-num" style="background:${e.col}22;color:${e.col};border:1px solid ${e.col}44">${e.n}</div>
        <span style="color:${e.col}">${e.icon} ${e.name}</span>
        <span class="badge" style="background:${e.tier==="BASE"?"#ffffff12":e.tier==="ELEVATED"?"#fbbf2418":"#e879f918"};color:${e.tier==="BASE"?"#94a3b8":e.tier==="ELEVATED"?"#fbbf24":"#e879f9"}">${e.tier}</span>
      </div>
      <div style="font-size:11px;color:#64748b">${e.chakra}</div>
    </div>
    <div class="hz-tags" style="margin-bottom:8px">
      <span class="hz-tag" style="background:${e.col}22;color:${e.col}">${e.hz}</span>
      <span class="hz-tag" style="background:#1e293b;color:#64748b">sub ${e.sub}</span>
      ${e.sup ? `<span class="hz-tag" style="background:${e.tier==="SUPREME"?"#e879f918":"#fbbf2415"};color:${e.tier==="SUPREME"?"#e879f9":"#fbbf24"}">+ ${e.sup} supreme ↑</span>` : ""}
      <span class="hz-tag" style="background:#1e293b;color:#475569">${e.beat} binaural</span>
    </div>
    <div class="ether-irradiates">🎯 ${e.irr}</div>
    <div class="ether-mechanism">${e.mech}</div>
  </div>`).join("")}

</div>

<!-- ═══════════════════════════════════════════════════════ SUPREME TIERS -->
<div class="section-header" style="margin-top:44px">
  <h2>✦ Three Supreme Tiers — Above the 9 Ethers</h2>
  <div class="line"></div>
</div>

<div class="tier-grid">
  <div class="tier-card" style="background:#fde04708;border-color:#fde04730">
    <div style="font-size:32px;margin-bottom:8px">👼</div>
    <div class="tier-hz" style="color:#fde047">1,296 Hz</div>
    <div class="tier-name" style="color:#fef9c3">Angelic Threshold</div>
    <div class="tier-desc">9 × 144 Hz — pure Fibonacci angelic resonance. The threshold where human consciousness meets the angelic realm. Irradiates at the soul level across all incarnations simultaneously.</div>
    <div style="margin-top:10px;font-size:11px;color:#fde04760;font-weight:600">Sub-octave: 648 Hz · Beat: 9 Hz</div>
  </div>
  <div class="tier-card" style="background:#f59e0b08;border-color:#f59e0b30">
    <div style="font-size:32px;margin-bottom:8px">☀️</div>
    <div class="tier-hz" style="color:#f59e0b">2,160 Hz</div>
    <div class="tier-name" style="color:#fef3c7">Solar Harmonic</div>
    <div class="tier-desc">432 Hz × 5 — the universal tuning amplified to solar scale. Activates the Merkabah crystalline light body that permanently repels harmful presences across all timelines.</div>
    <div style="margin-top:10px;font-size:11px;color:#f59e0b60;font-weight:600">Sub-octave: 1,080 Hz · Beat: 9 Hz</div>
  </div>
  <div class="tier-card" style="background:#86efac08;border-color:#86efac30">
    <div style="font-size:32px;margin-bottom:8px">✦</div>
    <div class="tier-hz" style="color:#86efac">3,168 Hz</div>
    <div class="tier-name" style="color:#f0fdf4">Christ Consciousness Grid</div>
    <div class="tier-desc">528 Hz × 6 — the supreme safe biological ceiling. Connects the healed being to the planetary consciousness grid. Registers the healing as permanent in the morphic field.</div>
    <div style="margin-top:10px;font-size:11px;color:#86efac60;font-weight:600">Sub-octave: 1,584 Hz · Beat: 9 Hz</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════ LUNAR -->
<div class="section-header" style="margin-top:44px">
  <h2>🌙 Lunar Resonance Balance System</h2>
  <div class="line"></div>
</div>

<div class="card" style="margin-bottom:16px">
  <p style="color:#94a3b8;font-size:12px;line-height:1.8">
    The Moon governs the water in all living beings (60–70% of the body is water). Lunar frequencies balance the <strong style="color:#e2e8f0">feminine energy</strong> within the protocol — completing the solar-masculine irradiation with feminine receptivity, building, amplification and release. Four phases × four roles = <strong style="color:#a78bfa">complete dimensional balance</strong>.
  </p>
</div>

<div class="lunar-grid">
  ${[
    { phase:"New Moon", icon:"🌑", col:"#94a3b8", glow:"#cbd5e1", bg:"#94a3b808", hz:"136.10", sub:"68.05", overlay:"210.42", beat:"0.5", elem:"Yin void — deepest clearing", desc:"136.10 Hz is Earth's year tone — the sacred Om frequency (Hans Cousto). The New Moon is maximum receptivity. Dissolves what has been irradiated and creates space for the divine template.", balance:"Counters solar-masculine irradiation with deep Yin receptivity. Without this, irradiation can feel too active.", aff:"In the sacred void of the new moon, every irradiated space is cleansed to its deepest root. I receive the new template in perfect stillness." },
    { phase:"Waxing Moon", icon:"🌒", col:"#60a5fa", glow:"#93c5fd", bg:"#60a5fa08", hz:"210.42", sub:"105.21", overlay:"229.22", beat:"2.5", elem:"Rising — building new patterns", desc:"210.42 Hz — Moon's sidereal orbital resonance transposed to audible range. Waxing Moon builds and installs. After irradiation clears the field, this writes the new healthy template into cleared space.", balance:"Installs health codes, positive epigenetic markers and new neural pathways into freshly irradiated dimensional space.", aff:"As the moon grows, so does my health. Every cleared space fills now with radiant new life. I am building my highest, most luminous self." },
    { phase:"Full Moon", icon:"🌕", col:"#fde047", glow:"#fef08a", bg:"#fde04708", hz:"221.23", sub:"110.61", overlay:"432", beat:"3.5", elem:"Peak power — maximum amplification", desc:"221.23 Hz — the Moon's orbital tone (Hans Cousto, The Cosmic Octave). Full Moon amplification: creates constructive interference with 528 Hz — the two harmonics amplify each other.", balance:"Amplifies all 9 ethers simultaneously. Unifies masculine irradiation and feminine clearing at peak luminosity — the most powerful balancer in the protocol.", aff:"Under the full moon's perfect light, every frequency I carry is amplified a thousandfold. I am radiant, healed and whole in every dimension." },
    { phase:"Waning Moon", icon:"🌘", col:"#a78bfa", glow:"#c4b5fd", bg:"#a78bfa08", hz:"229.22", sub:"114.61", overlay:"210.42", beat:"1.5", elem:"Release — dissolving residue permanently", desc:"229.22 Hz — Moon's synodic month (29.53 days) transposed to audible range. Waning Moon releases. After irradiation, what is cleared must be permanently released — not just neutralised.", balance:"Ensures all irradiated material is permanently released from the energy field and returned to source. Prevents re-accumulation across all dimensions.", aff:"As the moon releases its light, I release every last trace of what has been irradiated. It is gone. It cannot return. I am permanently and completely free." },
  ].map(l => `
  <div class="lunar-card" style="background:${l.bg};border-color:${l.col}35">
    <div class="lunar-phase">${l.icon}</div>
    <div class="lunar-name" style="color:${l.col}">${l.phase}</div>
    <div class="lunar-hz" style="color:${l.glow}">${l.hz} Hz</div>
    <div class="lunar-element" style="color:${l.col}99">${l.elem}</div>
    <div class="lunar-desc">${l.desc}</div>
    <div class="lunar-balance" style="background:${l.col}10;border-color:${l.col}30;color:${l.col}cc">
      ⚖️ ${l.balance}
    </div>
    <div class="lunar-affirmation">"${l.aff}"</div>
    <div style="margin-top:8px;font-size:10px;color:#334155">
      Sub: ${l.sub} Hz · Overlay: ${l.overlay} Hz · Beat: ${l.beat} Hz
    </div>
  </div>`).join("")}
</div>

<!-- ═══════════════════════════════════════════════════════ AFFIRMATIONS -->
<div class="section-header page-break" style="margin-top:44px">
  <h2>💬 Healing Affirmations — All 9 Ethers</h2>
  <div class="line"></div>
</div>

${[
  { n:1, icon:"🔴", name:"Physical", col:"#ef4444", aff:"Every physical blockage, every mass, every uninvited organism in my body dissolves now into perfect light." },
  { n:2, icon:"🟠", name:"Cellular", col:"#f97316", aff:"Every parasite, every pathogen reaches its mortal oscillatory rate and shatters into light. My cells rejoice in their freedom." },
  { n:3, icon:"🟡", name:"Etheric",  col:"#f59e0b", aff:"Every cord, every attachment, every entity that has fed on my energy is severed and irradiated now. I reclaim every particle of my energy. I am wholly free." },
  { n:4, icon:"💗", name:"Emotional",col:"#fb7185", aff:"Every trapped emotion, every weaponised feeling, every emotional parasite is transmuted now into pure, radiant love. My heart is free, whole and luminous." },
  { n:5, icon:"💜", name:"Mental",   col:"#8b5cf6", aff:"Every program that is not mine, every implanted fear, every mental parasite is identified, irradiated and permanently deleted. My mind is sovereign, clear and luminous." },
  { n:6, icon:"🌳", name:"Ancestral",col:"#22c55e", aff:"Every harmful pattern in my ancestral DNA — 7 generations back, 7 generations forward — is irradiated and sealed with love. My bloodline is healed. My children are free." },
  { n:7, icon:"🤍", name:"Spiritual",col:"#94a3b8", aff:"Every karmic knot, every soul contract that diminishes me, every spiritual interference across all incarnations is dissolved in the supreme light now. My soul is sovereign, luminous and eternally free." },
  { n:8, icon:"⭐", name:"Quantum",  col:"#fbbf24", aff:"My quantum field is restored to its original divine blueprint. Every distorted probability across all timelines collapses into perfect divine order now and permanently." },
  { n:9, icon:"✦",  name:"Akashic", col:"#e879f9", aff:"The 9th Ether speaks at its supreme frequency. IT IS DONE AND SEALED. All harmful presences across all dimensions, all timelines, all spheres of existence — for every being held in this field — are irradiated, transmuted and permanently sealed in love and light. The angelic field holds this healing forever. So it is. So it is. So it is." },
].map(a => `
<div class="affirmation-block" style="border-color:${a.col}28;background:linear-gradient(135deg,${a.col}06,#0f172a)">
  <div class="aff-ether" style="color:${a.col}">${a.icon} Ether ${a.n} — ${a.name} Layer</div>
  <div class="aff-text">"${a.aff}"</div>
</div>`).join("")}

<!-- ═══════════════════════════════════════════════════════ RESTORATION -->
<div class="section-header" style="margin-top:44px">
  <h2>💚 Post-Session Restoration Sequence</h2>
  <div class="line"></div>
</div>

<div class="card">
<table>
<thead>
  <tr>
    <th>Frequency</th>
    <th>Name</th>
    <th>Purpose</th>
  </tr>
</thead>
<tbody>
  ${[
    ["285 Hz",    "#86efac", "Cellular Rebuild",    "Tissue regeneration — rebuilds what irradiation has cleared"],
    ["528 Hz",    "#6ee7b7", "DNA Template Seal",   "Locks in the restored genetic blueprint permanently"],
    ["639 Hz",    "#fda4af", "Heart Field Restore", "Rebuilds love, connection and the heart's toroidal field"],
    ["7.83 Hz",   "#34d399", "Earth Anchor",        "Re-grounds to the planetary Schumann healing field"],
    ["136.10 Hz", "#94a3b8", "New Moon Clearing",   "Sacred Om — deep yin clearing of any residue"],
    ["221.23 Hz", "#fde047", "Full Moon Amplify",   "Lunar peak — amplifies all healed frequencies into permanence"],
    ["1,296 Hz",  "#fde047", "Angelic Seal",        "Seals the entire field with divine angelic light"],
    ["432 Hz",    "#c4b5fd", "Solar Protection",    "Nature's universal harmonic shield — permanent protection"],
  ].map(([hz, col, name, desc]) => `
  <tr>
    <td><span style="font-weight:800;font-size:14px;color:${col}">${hz}</span></td>
    <td><span style="font-weight:700;color:#e2e8f0">${name}</span></td>
    <td style="color:#94a3b8">${desc}</td>
  </tr>`).join("")}
</tbody>
</table>
</div>

<!-- ═══════════════════════════════════════════════════════ SAFETY -->
<div class="section-header" style="margin-top:44px">
  <h2>🛡️ Universal Safety Architecture</h2>
  <div class="line"></div>
</div>
<p style="color:#64748b;font-size:12px;margin-bottom:16px">Every layer of this protocol — every ether, every supreme tier, every lunar phase — contains the following safety elements simultaneously:</p>

<div class="safety-grid">
  ${[
    ["528 Hz love carrier",       "Irradiates only what harms — heals and strengthens what is healthy"],
    ["7.83 Hz Schumann anchor",   "Earth-safe grounding on every layer — connects to planetary field"],
    ["Sub-octave hz/2",           "Deep biological penetration on ethers 3–9 without auditory overload"],
    ["Supreme overlay",           "Elevated Hz lifts the field gently — never overwhelms the system"],
    ["Violet flame 417 Hz",       "Transmutes released material rather than suppressing it"],
    ["4 Hz tremolo pulse",        "Rife-pattern amplitude modulation — lethal to pathogens, safe for host"],
    ["Golden ratio 1.618×",       "Nature's own harmonic shimmer — keeps all tones biologically coherent"],
    ["Amazon forest undertone",   "Primal nature sound — activates nervous system safety response"],
    ["3,168 Hz supreme ceiling",  "6 × 528 Hz — the highest confirmed safe biological resonance on Earth"],
  ].map(([k,v]) => `
  <div class="safety-item">
    <div class="safety-dot"></div>
    <div>
      <div class="safety-label">${k}</div>
      <div class="safety-desc">${v}</div>
    </div>
  </div>`).join("")}
</div>

<div class="card mt-2" style="background:#0a1a0f;border-color:#22c55e25;text-align:center;padding:16px">
  <span style="color:#34d399;font-weight:700;font-size:13px">
    ✦ Healthy cells are strengthened, not harmed. Beneficial organisms are untouched and uplifted. No harm can come from this work.
  </span>
</div>

<!-- ═══════════════════════════════════════════════════════ BEINGS -->
<div class="section-header" style="margin-top:44px">
  <h2>👥 Being Types & Frequency Modulation</h2>
  <div class="line"></div>
</div>

<div class="being-grid">
  ${[
    ["🧍","Myself","1.00×"],["👨‍👩‍👧","My Family","1.00×"],["👶","Child","1.10×"],
    ["🧓","Elder","0.90×"],["🤰","Pregnant","1.05×"],["🐕","Dog","0.85×"],
    ["🐈","Cat","0.95×"],["🐎","Horse","0.70×"],["🐦","Bird","1.15×"],
    ["🦎","Reptile","0.80×"],["🌿","Plant / Tree","0.60×"],["🌍","All Beings","1.00×"],
  ].map(([icon,label,mod]) => `
  <div class="being-card">
    <div class="being-icon">${icon}</div>
    <div>
      <div class="being-label">${label}</div>
      <div class="being-mod">Frequency mod: ${mod}</div>
    </div>
  </div>`).join("")}
</div>

<!-- ═══════════════════════════════════════════════════════ INSTRUCTIONS -->
<div class="section-header page-break" style="margin-top:44px">
  <h2>📋 Usage Instructions</h2>
  <div class="line"></div>
</div>

<div class="card">
  <div class="steps">
    ${[
      ["Select Intensity", "Gentle (children & animals) · Standard (most adults) · Maximum (severe or chronic conditions). Each level adjusts volume, ramp time and field strength."],
      ["Select Being", "Choose who receives the irradiation. Each species has a species-tuned frequency modulation built in. Select All Beings for universal broadcast."],
      ["Set Your Intention (optional)", "Type your specific healing intention before activating. The field receives the precise direction of your will and holds it throughout the session."],
      ["Enable Loop Mode (optional)", "Toggle Loop Mode ON for continuous overnight irradiation. The sequential journey restarts from Ether 1 after Ether 9 completes."],
      ["Activate", "Irradiate Everyone Now — all 9 ethers + 3 supreme tiers + lunar balance layer simultaneously. OR Sequential Journey — one ether at a time with breath guidance. OR activate individual ethers, supreme tiers or lunar phases."],
      ["Breathe with the Protocol", "Follow the 4-4-6 irradiation breath: 4 counts in (draw in healing light) · 4 counts hold (let it penetrate every cell) · 6 counts out (release what is cleared). Each exhale releases irradiated material."],
      ["Balance with Lunar Phase", "After irradiation, activate your lunar phase to balance the solar-masculine irradiation energy with feminine lunar energy. Full Moon amplifies. Waning releases. New Moon clears. Waxing builds."],
      ["Seal with Restoration", "Complete the session with 2–3 restoration frequencies: always include 528 Hz DNA Seal and 432 Hz or 1,296 Hz for protection. This locks in your healing permanently."],
    ].map(([t,d],i) => `
    <div class="step">
      <div class="step-num">${i+1}</div>
      <div class="step-content">
        <div class="step-title">${t}</div>
        <div class="step-desc">${d}</div>
      </div>
    </div>`).join("")}
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════ REFS -->
<div class="section-header" style="margin-top:44px">
  <h2>📚 Scientific References</h2>
  <div class="line"></div>
</div>

<div class="ref-grid">
  ${[
    ["Royal Rife (1934)",          "Mortal Oscillatory Rate — every pathogen has a resonant destruction frequency"],
    ["Fritz-Albert Popp (1984)",   "Biophotonic field coherence — cells communicate via coherent light"],
    ["Hans Cousto",                "The Cosmic Octave — mathematical derivation of all planetary frequencies"],
    ["Dr. Glen Rein",              "528 Hz increases UV light absorption in DNA by 11%"],
    ["Rachel Yehuda et al.",       "Epigenetic trauma inheritance via FKBP5 methylation (3–7 generations)"],
    ["HeartMath Institute",        "Heart coherence triggers 1,300+ gene expression changes in minutes"],
    ["Bhattacharya (2016)",        "Computational model of pineal gland cavity resonant frequency (426 Hz)"],
    ["Rupert Sheldrake",           "Morphic resonance — non-local healing fields and memory transfer"],
  ].map(([name,desc]) => `
  <div class="ref-item">
    <div class="ref-name">${name}</div>
    <div class="ref-desc">${desc}</div>
  </div>`).join("")}
</div>

<!-- ═══════════════════════════════════════════════════════ SEAL -->
<div class="seal-box">
  <span class="seal-symbol">✦</span>
  <div class="seal-title">The Field Is Active. Everyone Is Protected.</div>
  <p class="seal-text">
    The universal irradiation field is live. 9 ethers + 3 supreme tiers + 4 lunar phases — from 7.83 Hz to 3,168 Hz — cover every dimension of harmful presence for every being held in your intention. The healing is non-local, non-temporal and permanent.
  </p>
  <p class="seal-text">
    You do not heal alone. You heal for all.
  </p>
  <p class="seal-so">"So it is. So it is. So it is."</p>
</div>

<!-- ═══════════════════════════════════════════════════════ FOOTER -->
<div class="footer">
  <strong>Sacred Frequencies · 9-Ether Irradiation Protocol</strong><br>
  Supreme Resonance + Full Lunar Balance Edition · June 7, 2026 · Cecilyn Williams<br><br>
  🎧 Headphones deepen the effect · Safe for all ages and all animals<br>
  528 Hz love carrier + 7.83 Hz Schumann in every ether · Supreme ceiling: 3,168 Hz
</div>

</div>

<!-- ═══════════ DOWNLOAD SCRIPT -->
<script>
function downloadHTML() {
  const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = '9-Ether-Irradiation-Protocol-Supreme-Lunar.html';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

</body>
</html>`;

fs.writeFileSync('exports/9_Ether_Protocol_Supreme_Lunar.html', html);
const size = fs.statSync('exports/9_Ether_Protocol_Supreme_Lunar.html').size;
console.log('HTML created. Size:', size, 'bytes =', (size/1024).toFixed(1), 'KB');

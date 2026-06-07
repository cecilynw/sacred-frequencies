import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/2adfb9b9b_generated_image.png";

// ─────────────────────────────────────────────────────────────────────────────
//  9-ETHER IRRADIATION PROTOCOL — MAXIMUM IMPACT EDITION
//
//  REFINEMENTS IN THIS VERSION:
//  · 3 intensity levels: Gentle · Standard · Maximum
//  · Intention-setting panel before activation
//  · Real-time Dimensional Healing Map (shows all 9 layers live)
//  · Enhanced audio: tremolo pulse, violet flame layer, sub-bass anchor
//  · Post-session integration timer with affirmation cycling
//  · Full-spectrum species tuning (12 beings)
//  · Continuous looping mode for overnight / long-session use
//  · Dimensional coverage indicator — shows % complete per ether
// ─────────────────────────────────────────────────────────────────────────────

const INTENSITY_LEVELS = [
  { id: "gentle",   label: "Gentle",   icon: "🌱", vol: 0.14, desc: "Children, animals, highly sensitive beings",  rampTime: 5 },
  { id: "standard", label: "Standard", icon: "✦",  vol: 0.20, desc: "Most adults — balanced and deeply effective", rampTime: 3.5 },
  { id: "maximum",  label: "Maximum",  icon: "⚡", vol: 0.27, desc: "Deep clearing of severe or chronic conditions", rampTime: 2 },
];

const BEINGS = [
  { id: "self",     label: "Myself",       icon: "🧍",   hz_mod: 1.00, desc: "Personal full-body irradiation" },
  { id: "family",   label: "My Family",    icon: "👨‍👩‍👧",  hz_mod: 1.00, desc: "Extend the field to all family members" },
  { id: "child",    label: "Child",        icon: "👶",   hz_mod: 1.10, desc: "Gentle higher-octave irradiation" },
  { id: "elder",    label: "Elder",        icon: "🧓",   hz_mod: 0.90, desc: "Slower, deeper irradiation" },
  { id: "pregnant", label: "Pregnant",     icon: "🤰",   hz_mod: 1.05, desc: "Mother + child field, extra gentle" },
  { id: "dog",      label: "Dog",          icon: "🐕",   hz_mod: 0.85, desc: "Canine-tuned irradiation field" },
  { id: "cat",      label: "Cat",          icon: "🐈",   hz_mod: 0.95, desc: "Feline-tuned irradiation field" },
  { id: "horse",    label: "Horse",        icon: "🐎",   hz_mod: 0.70, desc: "Equine-tuned irradiation field" },
  { id: "bird",     label: "Bird",         icon: "🐦",   hz_mod: 1.15, desc: "Avian-tuned irradiation field" },
  { id: "reptile",  label: "Reptile",      icon: "🦎",   hz_mod: 0.80, desc: "Reptilian frequency tuning" },
  { id: "plant",    label: "Plant / Tree", icon: "🌿",   hz_mod: 0.60, desc: "Plant kingdom — root frequency" },
  { id: "everyone", label: "All Beings",   icon: "🌍",   hz_mod: 1.00, desc: "Universal broadcast — all life simultaneously" },
];

const IRRADIATION_SEQUENCE = [
  {
    ether: 1, name: "Physical Layer",   icon: "🔴", color: "#fca5a5", glow: "#ef4444",
    hz: 174,  subHz: 40,   beatHz: 2,   waveform: "sine",
    chakra: "Root",
    action:      "Penetrating physical tissue — dissolving masses, knots & density",
    irradiates:  "Physical parasites, tissue masses, cellular congestion, bone spurs, crystallised toxins, heavy metals",
    mechanism:   "174 Hz — the lowest Solfeggio — operates on the body's crystalline matrix. Collapses the quantum wave-function of pain. Dissolves physical entanglement back into coherent flow.",
    duration: 20,
    affirmation: "Every physical blockage, every mass, every uninvited organism in my body dissolves now into perfect light.",
  },
  {
    ether: 2, name: "Cellular Layer",   icon: "🟠", color: "#fdba74", glow: "#f97316",
    hz: 333,  subHz: 111,  beatHz: 3,   waveform: "sine",
    chakra: "Sacral",
    action:      "Rife resonance irradiation — shattering pathogens at their mortal oscillatory rate",
    irradiates:  "Parasitic worms, flukes, bacteria, fungi, viral loads, Candida, Lyme spirochetes",
    mechanism:   "Royal Rife (1934): every pathogen has a unique Mortal Oscillatory Rate. 333 Hz + 111 Hz creates a resonant irradiation field — lethal to parasitic life, regenerative for healthy cells.",
    duration: 22,
    affirmation: "Every parasite, every pathogen reaches its mortal oscillatory rate and shatters into light. My cells rejoice in their freedom.",
  },
  {
    ether: 3, name: "Etheric Layer",    icon: "🟡", color: "#fde68a", glow: "#f59e0b",
    hz: 396,  subHz: 417,  beatHz: 4,   waveform: "sine",
    chakra: "Solar Plexus",
    action:      "Etheric body sweep — severing attachments & psychic cords",
    irradiates:  "Etheric parasites, entity attachments, psychic cords, dark imprints, implants",
    mechanism:   "396 Hz liberates guilt and fear — the two primary host-signals that attract etheric parasites. 417 Hz undoes the structure of the attachment. Together: cord-cutting + field cleanse.",
    duration: 22,
    affirmation: "Every cord, every attachment, every entity that has fed on my energy is severed and irradiated now. I reclaim all my energy. I am free.",
  },
  {
    ether: 4, name: "Emotional Layer",  icon: "💗", color: "#fda4af", glow: "#fb7185",
    hz: 528,  subHz: 639,  beatHz: 3.5, waveform: "sine",
    chakra: "Heart",
    action:      "Emotional body transmutation — converting trapped charge into love",
    irradiates:  "Trapped grief, rage, shame, fear, guilt — emotional parasites feeding on unresolved feeling",
    mechanism:   "528 Hz (miracle frequency) irradiates while simultaneously healing. 639 Hz harmonises the heart's toroidal field. Emotional charge cannot survive in a 528 Hz environment — it transmutes automatically.",
    duration: 22,
    affirmation: "Every trapped emotion, every weaponised feeling, every emotional parasite is transmuted now into pure love. My heart is free and whole.",
  },
  {
    ether: 5, name: "Mental Layer",     icon: "💜", color: "#c4b5fd", glow: "#8b5cf6",
    hz: 741,  subHz: 40,   beatHz: 10,  waveform: "triangle",
    chakra: "Throat",
    action:      "Mental field detox — destroying harmful programs & thought-forms",
    irradiates:  "Intrusive thoughts, mental loops, psychic implants, hypnotic programming, mind-control residue",
    mechanism:   "741 Hz awakens intuition and detoxifies electromagnetic fields. 40 Hz gamma (whole-brain coherence) irradiates mental parasites by restoring coherent neural firing — incoherent programs cannot survive coherence.",
    duration: 22,
    affirmation: "Every program that is not mine, every implanted fear, every mental parasite is identified, irradiated and permanently deleted. My mind is sovereign.",
  },
  {
    ether: 6, name: "Ancestral Layer",  icon: "🌳", color: "#86efac", glow: "#22c55e",
    hz: 417,  subHz: 396,  beatHz: 2,   waveform: "sine",
    chakra: "Heart (ancestral)",
    action:      "7-generation DNA clearing — irradiating inherited harmful epigenetic patterns",
    irradiates:  "Ancestral trauma, inherited disease codes, generational curses, bloodline entities, karmic parasites",
    mechanism:   "Epigenetic research (Yehuda et al.): trauma methylation patterns are inherited 3–7 generations. 417 Hz + 396 Hz form the ancestral liberation sequence — first undoing the stored pattern, then liberating the emotional charge that holds it in place.",
    duration: 25,
    affirmation: "Every harmful pattern carried in my DNA from ancestors past — 7 generations back and 7 generations forward — is irradiated and transmuted now. My bloodline is healed and free.",
  },
  {
    ether: 7, name: "Spiritual Layer",  icon: "🤍", color: "#e2e8f0", glow: "#94a3b8",
    hz: 852,  subHz: 963,  beatHz: 7,   waveform: "sine",
    chakra: "Third Eye",
    action:      "Soul field purification — dissolving spiritual interference across all incarnations",
    irradiates:  "Karmic entanglements, harmful soul contracts, dark initiations, spiritual interference, vows of limitation",
    mechanism:   "852 Hz: returns spiritual order, awakens third eye, begins pineal decalcification. 963 Hz: crown activation. 7 Hz theta: the gateway state where soul-level clearing becomes possible — deep enough to reach the causal body.",
    duration: 25,
    affirmation: "Every karmic knot, every soul contract that diminishes me, every spiritual interference across all incarnations is dissolved in the light of the 9th ether. My soul is sovereign and free.",
  },
  {
    ether: 8, name: "Quantum Layer",    icon: "⭐", color: "#fcd34d", glow: "#fbbf24",
    hz: 963,  subHz: 432,  beatHz: 9,   waveform: "sine",
    chakra: "Crown",
    action:      "Quantum field restoration — collapsing all distorted wave-functions, restoring divine template",
    irradiates:  "Quantum interference patterns, timeline contamination, reality distortions, probability hijacking",
    mechanism:   "At the quantum level, disease = disordered probability. 963 Hz (God frequency) collapses all disordered wave-functions back to their divine ground state. 432 Hz anchors the restored state into nature's own frequency — making it stable and permanent.",
    duration: 28,
    affirmation: "My quantum field is restored to its original divine blueprint. Every distorted probability across all timelines collapses into perfect order now.",
  },
  {
    ether: 9, name: "Akashic Layer",    icon: "✦",  color: "#f0e6ff", glow: "#e879f9",
    hz: 1111, subHz: 528,  beatHz: 9,   waveform: "sine",
    chakra: "Soul Star (above crown)",
    action:      "Akashic record clearing — erasing ALL harmful imprints from the universal field of all time",
    irradiates:  "ALL remaining harmful presences across ALL dimensions, ALL timelines, ALL connected beings — nothing excluded",
    mechanism:   "The Akashic field is the quantum vacuum itself — the plenum from which all matter-energy events emerge and to which they return. 1111 Hz opens the manifestation portal. At this level, healing is non-local and non-temporal: it reaches backward to heal the origin of disease, forward to prevent recurrence, and outward to all entangled beings.",
    duration: 28,
    affirmation: "The 9th Ether speaks. IT IS DONE. All harmful presences across all dimensions, all timelines, all spheres of existence — for every being held in this field — are irradiated, transmuted and permanently sealed in love and light. So it is. So it is. So it is.",
  },
];

const RESTORATION_FREQUENCIES = [
  { name: "Cellular Rebuild",    hz: 285,  desc: "Tissue regeneration after irradiation",  color: "#86efac", duration: 10 },
  { name: "DNA Template Seal",   hz: 528,  desc: "Lock in the restored DNA blueprint",      color: "#6ee7b7", duration: 10 },
  { name: "Heart Field Restore", hz: 639,  desc: "Rebuild love and connection",             color: "#fda4af", duration: 8  },
  { name: "Earth Anchor",        hz: 7.83, desc: "Re-ground to planetary healing field",    color: "#34d399", duration: 8  },
  { name: "Crown & Soul Seal",   hz: 963,  desc: "Seal the field with divine light",        color: "#fbbf24", duration: 8  },
  { name: "Protection Sphere",   hz: 432,  desc: "Nature's universal harmonic shield",      color: "#c4b5fd", duration: 10 },
];

// ─────────────────────────────────────────────────────────────────────────────
//  AUDIO ENGINE — MAXIMUM IMPACT
// ─────────────────────────────────────────────────────────────────────────────
function buildIrradiationLayer(ctx, step, being, intensity) {
  const nodes = [];
  const mod   = being?.hz_mod  || 1.0;
  const vol   = intensity?.vol || 0.20;
  const ramp  = intensity?.rampTime || 3.5;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + ramp);
  master.connect(ctx.destination);

  // ── PRIMARY irradiation tone
  const osc1 = ctx.createOscillator();
  const g1   = ctx.createGain();
  osc1.type  = step.waveform || "sine";
  osc1.frequency.value = Math.min(step.hz * mod, 2000);
  g1.gain.value = 0.50;
  osc1.connect(g1); g1.connect(master); osc1.start(); nodes.push(osc1);

  // ── SUB-HARMONIC depth layer
  if (step.subHz > 0) {
    const osc2 = ctx.createOscillator();
    const g2   = ctx.createGain();
    osc2.type  = "sine";
    osc2.frequency.value = Math.min(step.subHz * mod, 1500);
    g2.gain.value = 0.22;
    osc2.connect(g2); g2.connect(master); osc2.start(); nodes.push(osc2);
  }

  // ── BINAURAL BEAT — penetrates deepest layers with headphones
  if (step.beatHz > 0) {
    [0, 1].forEach(side => {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      const pan = ctx.createStereoPanner();
      pan.pan.value = side === 0 ? -1 : 1;
      osc.type  = "sine";
      osc.frequency.value = 108 + (side === 1 ? step.beatHz : 0);
      g.gain.value = 0.13;
      osc.connect(g); g.connect(pan); pan.connect(master);
      osc.start(); nodes.push(osc);
    });
  }

  // ── GOLDEN RATIO OVERTONE (1.618× — nature's irradiation shimmer)
  const golden = ctx.createOscillator();
  const gG     = ctx.createGain();
  golden.type  = "triangle";
  golden.frequency.value = Math.min(step.hz * 1.618, 3500);
  gG.gain.value = 0.045;
  golden.connect(gG); gG.connect(master); golden.start(); nodes.push(golden);

  // ── VIOLET FLAME LAYER (417 Hz harmonic — transmutation)
  if (step.hz !== 417) {
    const vf  = ctx.createOscillator();
    const vfG = ctx.createGain();
    vf.type   = "sawtooth";
    vf.frequency.value = 417;
    vfG.gain.value = 0.018;
    // Waveshaper softens the sawtooth into a flame-like timbre
    const ws  = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) curve[i] = Math.tanh((i / 128 - 1) * 2) * 0.7;
    ws.curve = curve;
    vf.connect(vfG); vfG.connect(ws); ws.connect(master);
    vf.start(); nodes.push(vf);
  }

  // ── 7.83 Hz SCHUMANN EARTH ANCHOR — keeps irradiation earth-safe
  const sch  = ctx.createOscillator();
  const scG  = ctx.createGain();
  sch.type   = "sine"; sch.frequency.value = 7.83;
  scG.gain.value = 0.07;
  sch.connect(scG); scG.connect(master); sch.start(); nodes.push(sch);

  // ── 528 Hz LOVE CARRIER — irradiates only what harms; heals what is healthy
  if (step.hz !== 528) {
    const lv  = ctx.createOscillator();
    const lvG = ctx.createGain();
    lv.type   = "sine"; lv.frequency.value = 528;
    lvG.gain.value = 0.042;
    lv.connect(lvG); lvG.connect(master); lv.start(); nodes.push(lv);
  }

  // ── TREMOLO PULSE (mimics Rife pulse pattern — 4 Hz amplitude modulation)
  const lfo  = ctx.createOscillator();
  const lfoG = ctx.createGain();
  lfo.type   = "sine"; lfo.frequency.value = 4;
  lfoG.gain.value = 0.08;
  lfo.connect(lfoG);
  // LFO modulates master gain slightly for pulse effect
  const pulseGain = ctx.createGain();
  pulseGain.gain.value = 1;
  lfoG.connect(pulseGain.gain);
  master.disconnect();
  master.connect(pulseGain);
  pulseGain.connect(ctx.destination);
  lfo.start(); nodes.push(lfo);

  // ── NATURE SAFETY LAYER (Amazon forest + ocean — primal nervous system calm)
  const natBuf = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = natBuf.getChannelData(c);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      d[i] = (last + 0.02 * w) / 1.02; last = d[i];
    }
  }
  const natSrc = ctx.createBufferSource();
  natSrc.buffer = natBuf; natSrc.loop = true;
  const natF = ctx.createBiquadFilter();
  natF.type  = "lowpass"; natF.frequency.value = 300;
  const natG = ctx.createGain(); natG.gain.value = 0.055;
  natSrc.connect(natF); natF.connect(natG); natG.connect(ctx.destination);
  natSrc.start(); nodes.push(natSrc);

  return { nodes, master: pulseGain };
}

function buildFullIrradiationField(ctx, being, intensity) {
  const allNodes = [];
  const baseWeights = [0.65, 0.65, 0.60, 0.65, 0.60, 0.60, 0.60, 0.65, 0.55];
  const volMult = (intensity?.vol || 0.20);

  IRRADIATION_SEQUENCE.forEach((step, i) => {
    const layerIntensity = { ...intensity, vol: baseWeights[i] * volMult * 0.55 };
    const { nodes, master } = buildIrradiationLayer(ctx, step, being, layerIntensity);
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.sin((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) * 0.32;
    master.disconnect(); master.connect(panner); panner.connect(ctx.destination);
    allNodes.push(...nodes);
  });

  // Fibonacci spiral carrier — the contagious irradiation wave
  [111, 174, 285, 333, 396, 417, 528, 639, 741].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type  = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = Math.min(f * (being?.hz_mod || 1.0), 1500);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 3 + i * 0.35);
    osc.connect(g); g.connect(ctx.destination); osc.start(); allNodes.push(osc);
  });

  // Sub-bass quantum anchor (9 Hz theta — the gateway tone)
  const qb  = ctx.createOscillator();
  const qbG = ctx.createGain();
  qb.type   = "sine"; qb.frequency.value = 9;
  qbG.gain.value = 0.07;
  qb.connect(qbG); qbG.connect(ctx.destination); qb.start(); allNodes.push(qb);

  return { nodes: allNodes };
}

function buildRestorationLayer(ctx, freq) {
  const nodes  = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3);
  master.connect(ctx.destination);

  const osc = ctx.createOscillator();
  const g   = ctx.createGain();
  osc.type  = "sine";
  osc.frequency.value = Math.min(freq.hz, 1500);
  g.gain.value = 0.50;
  osc.connect(g); g.connect(master); osc.start(); nodes.push(osc);

  const shim = ctx.createOscillator();
  const sG   = ctx.createGain();
  shim.type  = "triangle";
  shim.frequency.value = Math.min(freq.hz * 1.618, 2800);
  sG.gain.value = 0.06;
  shim.connect(sG); sG.connect(master); shim.start(); nodes.push(shim);

  // Nature restoration layer
  const nb  = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  const nd  = nb.getChannelData(0);
  let last  = 0;
  for (let i = 0; i < nd.length; i++) {
    const w = Math.random() * 2 - 1;
    nd[i] = (last + 0.02 * w) / 1.02; last = nd[i];
  }
  const nSrc = ctx.createBufferSource();
  nSrc.buffer = nb; nSrc.loop = true;
  const nF = ctx.createBiquadFilter();
  nF.type = "lowpass"; nF.frequency.value = 280;
  const nG = ctx.createGain(); nG.gain.value = 0.05;
  nSrc.connect(nF); nF.connect(nG); nG.connect(master);
  nSrc.start(); nodes.push(nSrc);

  return { nodes, master };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function IrradiationProtocol() {
  const [mode,            setMode]           = useState(null);
  const [intensity,       setIntensity]       = useState(INTENSITY_LEVELS[1]);
  const [selectedBeing,   setSelectedBeing]   = useState(BEINGS[0]);
  const [intention,       setIntention]       = useState("");
  const [intentionSet,    setIntentionSet]    = useState(false);
  const [showIntention,   setShowIntention]   = useState(false);
  const [seqStep,         setSeqStep]         = useState(0);
  const [stepElapsed,     setStepElapsed]     = useState(0);
  const [totalElapsed,    setTotalElapsed]    = useState(0);
  const [playing,         setPlaying]         = useState(false);
  const [completed,       setCompleted]       = useState(false);
  const [activeRestore,   setActiveRestore]   = useState(null);
  const [breathPhase,     setBreathPhase]     = useState("in");
  const [vortexAngle,     setVortexAngle]     = useState(0);
  const [affIdx,          setAffIdx]          = useState(0);
  const [loopMode,        setLoopMode]        = useState(false);
  const [showTargets,     setShowTargets]     = useState(false);
  const [etherProgress,   setEtherProgress]   = useState({});
  const [broadcastCount,  setBroadcastCount]  = useState(0);
  const [showMap,         setShowMap]         = useState(true);

  const audioCtxRef = useRef(null);
  const activeRef   = useRef(null);
  const timerRef    = useRef(null);
  const totalRef    = useRef(null);
  const breathRef   = useRef(null);
  const vortexRef   = useRef(null);
  const affRef      = useRef(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const stopAll = useCallback(() => {
    if (activeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      (activeRef.current.nodes || []).forEach(n => {
        try { if (n.gain) n.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); } catch {}
        setTimeout(() => { try { n.stop?.(); } catch {} }, 2300);
      });
      if (activeRef.current.master) {
        try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); } catch {}
      }
      activeRef.current = null;
    }
    clearInterval(timerRef.current);
    clearInterval(totalRef.current);
    clearInterval(breathRef.current);
    clearInterval(vortexRef.current);
    clearInterval(affRef.current);
    setPlaying(false); setMode(null);
    setSeqStep(0); setStepElapsed(0); setTotalElapsed(0);
    setCompleted(false); setActiveRestore(null);
    setEtherProgress({});
  }, []);

  const startBreath = useCallback(() => {
    setBreathPhase("in");
    let ph = "in", cnt = 0;
    breathRef.current = setInterval(() => {
      cnt++;
      if      (ph === "in"   && cnt >= 4) { ph = "hold"; cnt = 0; setBreathPhase("hold"); }
      else if (ph === "hold" && cnt >= 4) { ph = "out";  cnt = 0; setBreathPhase("out");  }
      else if (ph === "out"  && cnt >= 6) { ph = "in";   cnt = 0; setBreathPhase("in");   }
    }, 1000);
  }, []);

  const startVortex = useCallback(() => {
    vortexRef.current = setInterval(() => setVortexAngle(a => (a + 0.7) % 360), 16);
  }, []);

  // ── Play all 9 ethers simultaneously
  const playFull = useCallback((broadcastAll = false) => {
    stopAll();
    const ctx  = getCtx();
    const being = broadcastAll ? BEINGS.find(b => b.id === "everyone") : selectedBeing;
    activeRef.current = buildFullIrradiationField(ctx, being, intensity);
    if (broadcastAll) {
      setSelectedBeing(BEINGS.find(b => b.id === "everyone"));
      let n = 0;
      const iv = setInterval(() => { n++; setBroadcastCount(n * 144); if (n >= 9) clearInterval(iv); }, 600);
    }
    setMode("full"); setPlaying(true); setCompleted(false); setAffIdx(0);
    startBreath(); startVortex();
    // Mark all ethers as active
    const prog = {};
    IRRADIATION_SEQUENCE.forEach(s => { prog[s.ether] = 0; });
    setEtherProgress(prog);
    let te = 0, ai = 0;
    totalRef.current = setInterval(() => {
      te++; setTotalElapsed(te);
      // Slowly progress each ether's indicator
      setEtherProgress(prev => {
        const next = { ...prev };
        IRRADIATION_SEQUENCE.forEach((s, i) => {
          next[s.ether] = Math.min(100, (prev[s.ether] || 0) + (100 / (s.duration * (i + 1) * 0.6)));
        });
        return next;
      });
    }, 1000);
    affRef.current = setInterval(() => { ai = (ai + 1) % IRRADIATION_SEQUENCE.length; setAffIdx(ai); }, 11000);
  }, [stopAll, getCtx, selectedBeing, intensity, startBreath, startVortex]);

  // ── Sequential — one ether at a time
  const playSequence = useCallback(() => {
    stopAll();
    const ctx = getCtx();
    let idx = 0, sc = 0;
    const prog = {};
    IRRADIATION_SEQUENCE.forEach(s => { prog[s.ether] = 0; });
    setEtherProgress(prog);

    const playStep = (i) => {
      if (i >= IRRADIATION_SEQUENCE.length) {
        if (loopMode) { playStep(0); return; }
        clearInterval(totalRef.current); clearInterval(breathRef.current); clearInterval(vortexRef.current);
        setPlaying(false); setCompleted(true); setMode(null); return;
      }
      const step = IRRADIATION_SEQUENCE[i];
      setSeqStep(i); setAffIdx(i); setStepElapsed(0); sc = 0;
      setEtherProgress(prev => ({ ...prev, [step.ether]: 0 }));

      if (activeRef.current?.nodes) {
        const old = activeRef.current.nodes;
        if (activeRef.current.master) {
          try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8); } catch {}
        }
        setTimeout(() => old.forEach(n => { try { n.stop?.(); } catch {} }), 2000);
      }
      activeRef.current = buildIrradiationLayer(ctx, step, selectedBeing, intensity);

      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        sc++; setStepElapsed(sc);
        setEtherProgress(prev => ({ ...prev, [step.ether]: Math.min(100, (sc / step.duration) * 100) }));
        if (sc >= step.duration) { clearInterval(timerRef.current); playStep(i + 1); }
      }, 1000);
    };

    setMode("sequence"); setPlaying(true); setCompleted(false);
    startBreath(); startVortex();
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
    playStep(0);
  }, [stopAll, getCtx, selectedBeing, intensity, loopMode, startBreath, startVortex]);

  const playRestore = useCallback((freq) => {
    stopAll();
    const ctx = getCtx();
    activeRef.current = buildRestorationLayer(ctx, freq);
    setMode("restore"); setActiveRestore(freq); setPlaying(true);
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
  }, [stopAll, getCtx]);

  useEffect(() => () => stopAll(), []);

  const fmt  = s  => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const curStep = IRRADIATION_SEQUENCE[seqStep];
  const curAff  = IRRADIATION_SEQUENCE[affIdx];

  const breathColors = { in: "#86efac", hold: "#fbbf24", out: "#c4b5fd" };
  const breathLabels = { in: "Draw healing light in", hold: "Hold — let it penetrate every cell", out: "Release what is cleared" };

  const totalDuration = IRRADIATION_SEQUENCE.reduce((a, s) => a + s.duration, 0);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* ─── HERO ─── */}
      <div className="relative min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-18"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/25 via-[#030712]/55 to-[#030712]" />

        {/* Spinning 9-ether rings */}
        {IRRADIATION_SEQUENCE.map((step, i) => (
          <motion.div key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 55 + i * 62, height: 55 + i * 62,
              borderColor: step.glow + (playing ? "2a" : "0e"),
              top: "50%", left: "50%",
              transform: `translate(-50%,-50%) rotate(${vortexAngle + i * 40}deg)`
            }}
            animate={playing ? { opacity: [0.2, 0.7, 0.2] } : { opacity: [0.05, 0.18, 0.05] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 text-violet-300 text-xs font-bold mb-5 tracking-widest"
              style={{ background: "#e879f910" }}
            >
              ✦ 9 ETHERS · ALL DIMENSIONS · ALL BEINGS · MAXIMUM IMPACT
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">
              <span className="bg-gradient-to-r from-rose-300 via-amber-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
                9-Ether Irradiation
              </span>
              <br />
              <span className="text-white/65 text-2xl md:text-3xl font-light tracking-wide">Universal Healing Protocol</span>
            </h1>
            <p className="text-base text-white/58 mb-6 max-w-3xl mx-auto leading-relaxed">
              9 concentric etheric fields irradiate every dimension of harmful presence — from physical parasites to akashic imprints. Humans, animals, all beings. Past, present and future timelines. <strong className="text-white/85">Everything. Everyone. Now.</strong>
            </p>

            {/* ── INTENSITY SELECTOR ── */}
            <div className="flex justify-center gap-3 mb-5">
              {INTENSITY_LEVELS.map(lv => (
                <button key={lv.id}
                  onClick={() => setIntensity(lv)}
                  className="px-4 py-2.5 rounded-full text-sm font-bold border transition-all"
                  style={{
                    borderColor: intensity.id === lv.id ? "#e879f9" : "#ffffff20",
                    background:  intensity.id === lv.id ? "#e879f918" : "transparent",
                    color:        intensity.id === lv.id ? "#f0e6ff"   : "#ffffff50"
                  }}
                >{lv.icon} {lv.label}</button>
              ))}
            </div>
            <p className="text-white/30 text-xs mb-5">{intensity.desc}</p>

            {/* ── BEING SELECTOR ── */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {BEINGS.map(b => (
                <button key={b.id}
                  onClick={() => setSelectedBeing(b)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
                  style={{
                    borderColor: selectedBeing.id === b.id ? "#e879f9"   : "#ffffff18",
                    background:  selectedBeing.id === b.id ? "#e879f918" : "transparent",
                    color:        selectedBeing.id === b.id ? "#f0e6ff"   : "#ffffff45"
                  }}
                >{b.icon} {b.label}</button>
              ))}
            </div>

            {/* ── INTENTION ── */}
            <div className="flex justify-center mb-6">
              <button onClick={() => setShowIntention(!showIntention)}
                className="text-xs text-white/35 hover:text-white/65 transition-colors border border-white/15 px-4 py-2 rounded-full">
                🎯 {intentionSet ? `Intention set: "${intention.slice(0, 40)}${intention.length > 40 ? "…" : ""}"` : "Set your intention (optional)"}
              </button>
            </div>
            <AnimatePresence>
              {showIntention && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="mb-6 max-w-xl mx-auto">
                  <textarea
                    value={intention}
                    onChange={e => setIntention(e.target.value)}
                    placeholder="e.g. I intend to completely clear all parasites from my body and restore full cellular health…"
                    rows={3}
                    className="w-full rounded-xl p-3 text-sm text-white/80 bg-white/5 border border-white/15 outline-none focus:border-violet-400/50 resize-none placeholder-white/25"
                  />
                  <button onClick={() => { setIntentionSet(true); setShowIntention(false); }}
                    className="mt-2 px-5 py-2 rounded-full text-xs font-bold border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                    ✦ Lock in Intention
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LOOP MODE ── */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <button onClick={() => setLoopMode(!loopMode)}
                className="flex items-center gap-2 text-xs font-bold border px-4 py-2 rounded-full transition-all"
                style={{
                  borderColor: loopMode ? "#fbbf24" : "#ffffff20",
                  background:  loopMode ? "#fbbf2415" : "transparent",
                  color:        loopMode ? "#fbbf24"   : "#ffffff40"
                }}>
                🔁 Loop mode {loopMode ? "ON" : "OFF"}
              </button>
              <span className="text-white/25 text-xs">· Continuous overnight irradiation</span>
            </div>

            {/* ── MAIN BUTTONS ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4">
              {!playing ? (
                <>
                  <motion.button onClick={() => playFull(true)}
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-full font-black text-xl text-black shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #8b5cf6, #e879f9)", boxShadow: "0 0 80px #e879f945" }}>
                    🌍 Irradiate Everyone Now
                  </motion.button>
                  <motion.button onClick={() => playFull(false)}
                    whileHover={{ scale: 1.04 }}
                    className="px-7 py-5 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                    ✦ All 9 Ethers
                  </motion.button>
                  <motion.button onClick={playSequence}
                    whileHover={{ scale: 1.04 }}
                    className="px-7 py-5 rounded-full font-bold text-lg border border-white/20 text-white/65 hover:bg-white/8 transition-colors">
                    🌀 Sequential Journey
                  </motion.button>
                </>
              ) : (
                <motion.button onClick={stopAll} whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 rounded-full font-black text-xl border border-white/20 text-white hover:bg-white/10 transition-colors">
                  ⏹ Complete · {fmt(totalElapsed)}
                </motion.button>
              )}
            </motion.div>

            {/* Broadcast counter */}
            <AnimatePresence>
              {selectedBeing.id === "everyone" && broadcastCount > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/35"
                  style={{ background: "#22c55e0e" }}>
                  <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                  <span className="text-emerald-300 text-xs font-bold">
                    Universal broadcast · {broadcastCount.toLocaleString()}+ beings receiving irradiation
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* ─── BREATH GUIDE ─── */}
        <AnimatePresence>
          {playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-5 rounded-2xl p-4 flex items-center justify-center gap-5 border"
              style={{ borderColor: breathColors[breathPhase] + "30", background: breathColors[breathPhase] + "08" }}>
              <motion.div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg flex-shrink-0"
                style={{ borderColor: breathColors[breathPhase] }}
                animate={breathPhase === "out" ? { scale: 0.75 } : { scale: 1.35 }}
                transition={{ duration: breathPhase === "out" ? 6 : 4, ease: "easeInOut" }}>
                {breathPhase === "in" ? "☽" : breathPhase === "hold" ? "◎" : "○"}
              </motion.div>
              <div>
                <div className="font-black" style={{ color: breathColors[breathPhase] }}>{breathLabels[breathPhase]}</div>
                <div className="text-white/30 text-xs">4-4-6 irradiation breath · Each exhale releases what is cleared</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── LIVE AFFIRMATION ─── */}
        <AnimatePresence mode="wait">
          {playing && curAff && (
            <motion.div key={curAff.ether}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-6 rounded-2xl p-5 text-center border"
              style={{ borderColor: curAff.glow + "40", background: curAff.glow + "0b" }}>
              <div className="text-xs font-black tracking-widest mb-2" style={{ color: curAff.color }}>
                {curAff.icon} ETHER {curAff.ether} · {curAff.name.toUpperCase()} · {curAff.chakra}
              </div>
              <p className="text-white/82 italic text-base leading-relaxed max-w-2xl mx-auto">
                "{curAff.affirmation}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── DIMENSIONAL HEALING MAP ─── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-white/85">⚡ Dimensional Healing Map</h2>
            <button onClick={() => setShowMap(!showMap)}
              className="text-xs text-white/30 hover:text-white/60 transition-colors">
              {showMap ? "Hide ▲" : "Show ▼"}
            </button>
          </div>
          <AnimatePresence>
            {showMap && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-2">
                  {IRRADIATION_SEQUENCE.map((step) => {
                    const pct = etherProgress[step.ether] || 0;
                    const isSeqActive = mode === "sequence" && seqStep === step.ether - 1 && playing;
                    return (
                      <div key={step.ether} className="flex flex-col items-center gap-1.5">
                        <div className="text-lg">{step.icon}</div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ background: step.glow, width: `${pct}%` }}
                            transition={{ duration: 0.8 }} />
                        </div>
                        <div className="text-xs text-white/35 text-center leading-tight">{step.name.replace(" Layer","")}</div>
                        {isSeqActive && (
                          <motion.div className="w-1.5 h-1.5 rounded-full"
                            style={{ background: step.glow }}
                            animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
                {playing && (
                  <div className="text-xs text-white/25 text-center mt-1">
                    {mode === "full" ? "All 9 dimensions active simultaneously" :
                     mode === "sequence" ? `Ether ${seqStep + 1} of 9 — ${curStep?.name}` : ""}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── SEQUENCE PROGRESS ─── */}
        <AnimatePresence>
          {mode === "sequence" && playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-8 rounded-2xl p-5 border"
              style={{ borderColor: curStep?.glow + "50", background: curStep?.glow + "0a" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs tracking-widest text-white/30 mb-1">ETHER {seqStep + 1} / 9 · {curStep?.chakra}</div>
                  <div className="font-black text-lg" style={{ color: curStep?.color }}>
                    {curStep?.icon} {curStep?.name}
                  </div>
                  <div className="text-white/42 text-xs mt-0.5">{curStep?.action}</div>
                </div>
                <div className="text-right text-white/22">
                  <div className="text-2xl font-black">{fmt(stepElapsed)}</div>
                  <div className="text-xs">of {curStep?.duration}s</div>
                </div>
              </div>
              <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden mb-3">
                <motion.div className="h-full rounded-full transition-all duration-1000"
                  style={{ background: curStep?.glow, width: `${(stepElapsed / (curStep?.duration || 20)) * 100}%` }} />
              </div>
              <div className="flex gap-1.5">
                {IRRADIATION_SEQUENCE.map((s, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-700"
                    style={{ background: i < seqStep ? s.glow : i === seqStep ? s.glow + "80" : "#ffffff10" }} />
                ))}
              </div>
              {loopMode && (
                <div className="text-xs text-amber-400/60 mt-2 text-center">🔁 Loop mode on — will restart after ether 9</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── FULL VORTEX MANDALA ─── */}
        <AnimatePresence>
          {mode === "full" && playing && (
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
              className="flex justify-center mb-10">
              <div className="relative w-72 h-72">
                {IRRADIATION_SEQUENCE.map((step, i) => {
                  const angle = ((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) - Math.PI / 2 + (vortexAngle * Math.PI / 180);
                  const r = 100, x = Math.cos(angle) * r + 136, y = Math.sin(angle) * r + 136;
                  return (
                    <motion.div key={step.ether}
                      className="absolute w-10 h-10 rounded-full flex items-center justify-center text-base border"
                      style={{ left: x - 20, top: y - 20, background: step.glow + "18", borderColor: step.glow + "55" }}
                      animate={{ boxShadow: [`0 0 8px ${step.glow}30`, `0 0 24px ${step.glow}75`, `0 0 8px ${step.glow}30`] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                      {step.icon}
                    </motion.div>
                  );
                })}
                <motion.div className="absolute inset-0 m-auto w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, #e879f922, transparent)", border: "2px solid #e879f940" }}
                  animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 20px #e879f930","0 0 65px #e879f968","0 0 20px #e879f930"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}>
                  <motion.span className="text-3xl" animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>✦</motion.span>
                </motion.div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {IRRADIATION_SEQUENCE.map((step, i) => {
                    const angle = ((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) - Math.PI / 2 + (vortexAngle * Math.PI / 180);
                    const x = Math.cos(angle) * 100 + 136, y = Math.sin(angle) * 100 + 136;
                    return (
                      <motion.line key={i} x1="136" y1="136" x2={x} y2={y}
                        stroke={step.glow} strokeWidth="1"
                        animate={{ opacity: [0.08, 0.42, 0.08] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }} />
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── COMPLETION ─── */}
        <AnimatePresence>
          {completed && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="mb-12 rounded-3xl p-10 text-center border border-violet-500/25"
              style={{ background: "linear-gradient(135deg, #e879f910, #22c55e08, #fbbf2408)" }}>
              <motion.div className="text-7xl mb-4"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>✦</motion.div>
              <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-rose-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
                Irradiation Complete · Balance Restored
              </h2>
              <p className="text-white/58 text-base mb-5 max-w-2xl mx-auto leading-relaxed">
                All 9 etheric layers of <strong className="text-white/80">{selectedBeing.icon} {selectedBeing.label}</strong> at <strong className="text-white/80">{intensity.label} intensity</strong> have been traversed. Every dimension cleared. Every harmful presence irradiated. The field is sealed in love, light and the Schumann resonance of the living Earth.
              </p>
              {intentionSet && intention && (
                <div className="mb-5 text-white/40 italic text-sm max-w-xl mx-auto">
                  Intention held: "{intention}"
                </div>
              )}
              <p className="text-white/28 italic text-xs mb-8 max-w-xl mx-auto">
                "The field is clear. The healing is sealed across all timelines and all connected beings. So it is. So it is. So it is."
              </p>
              <div className="mb-6">
                <div className="text-xs font-bold text-white/40 mb-3">✦ Restore & replenish now →</div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {RESTORATION_FREQUENCIES.map(rf => (
                    <button key={rf.name} onClick={() => playRestore(rf)}
                      className="px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105"
                      style={{ borderColor: rf.color + "60", background: rf.color + "15", color: rf.color }}>
                      ▶ {rf.hz} Hz · {rf.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => playFull(true)}
                  className="px-8 py-3 rounded-full font-black text-lg text-black"
                  style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #e879f9)" }}>
                  🌍 Irradiate Again
                </button>
                <button onClick={playSequence}
                  className="px-8 py-3 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                  🌀 Sequential Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── RESTORATION PLAYING ─── */}
        <AnimatePresence>
          {mode === "restore" && playing && activeRestore && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-5 flex items-center justify-between border"
              style={{ borderColor: activeRestore.color + "50", background: activeRestore.color + "0c" }}>
              <div>
                <div className="font-black" style={{ color: activeRestore.color }}>
                  ▶ Restoring: {activeRestore.name} · {activeRestore.hz} Hz
                </div>
                <div className="text-white/38 text-xs">{activeRestore.desc} · {fmt(totalElapsed)} playing</div>
              </div>
              <button onClick={stopAll}
                className="px-4 py-2 rounded-full border text-sm font-bold hover:bg-white/10 transition-colors"
                style={{ borderColor: activeRestore.color + "50", color: activeRestore.color }}>⏹</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── MAIN GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

          {/* 9 Ethers — 2/3 */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-black mb-1 text-white/90">🌀 The 9 Dimensions</h2>
            <p className="text-white/32 text-xs mb-4">Physical → Cellular → Etheric → Emotional → Mental → Ancestral → Spiritual → Quantum → Akashic</p>
            <div className="space-y-2.5">
              {IRRADIATION_SEQUENCE.map((step, i) => {
                const isActive = mode === "sequence" && seqStep === i && playing;
                const pct = etherProgress[step.ether] || 0;
                return (
                  <motion.div key={step.ether}
                    initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="rounded-xl border p-4 transition-all"
                    style={{
                      borderColor: isActive ? step.glow + "70" : (pct > 0 ? step.glow + "35" : "#ffffff10"),
                      background: isActive ? step.glow + "0d" : (pct > 0 ? step.glow + "07" : "#ffffff04"),
                      boxShadow: isActive ? `0 0 28px ${step.glow}20` : "none"
                    }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 relative"
                        style={{ background: step.glow + "20", color: step.color, border: `1px solid ${step.glow}35` }}>
                        {pct > 0 && pct < 100 ? (
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="14" fill="none" stroke={step.glow + "40"} strokeWidth="2"/>
                            <circle cx="16" cy="16" r="14" fill="none" stroke={step.glow} strokeWidth="2"
                              strokeDasharray={`${pct * 0.88} 88`} strokeLinecap="round"
                              transform="rotate(-90 16 16)" />
                          </svg>
                        ) : null}
                        <span className="relative z-10">{step.ether}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-black text-sm" style={{ color: isActive ? step.color : "#fff" }}>
                            {step.icon} {step.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ background: step.glow + "20", color: step.color }}>{step.hz} Hz</span>
                          <span className="text-xs text-white/28">· {step.chakra}</span>
                        </div>
                        <div className="text-xs text-white/42 leading-relaxed mb-1">{step.irradiates}</div>
                        <div className="text-xs text-white/28 italic leading-relaxed">{step.mechanism}</div>
                      </div>
                      {isActive && (
                        <motion.div className="flex gap-0.5 items-end flex-shrink-0"
                          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                          {[3,5,4,6,3].map((h, j) => (
                            <div key={j} className="w-0.5 rounded-full" style={{ height: h * 2.5, background: step.glow }} />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column — Restoration + Safety + Targets */}
          <div className="space-y-5">

            {/* Restoration */}
            <div>
              <h2 className="text-xl font-black mb-1 text-white/90">💚 Restore & Replenish</h2>
              <p className="text-white/30 text-xs mb-3">After irradiation, rebuild and seal the field</p>
              <div className="space-y-2">
                {RESTORATION_FREQUENCIES.map((rf, i) => {
                  const isActive = mode === "restore" && activeRestore?.name === rf.name && playing;
                  return (
                    <motion.button key={rf.name}
                      initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => isActive ? stopAll() : playRestore(rf)}
                      className="w-full rounded-xl p-3.5 border text-left transition-all"
                      style={{
                        borderColor: isActive ? rf.color + "70" : "#ffffff10",
                        background:  isActive ? rf.color + "12"  : "#ffffff04",
                      }}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-sm" style={{ color: isActive ? rf.color : "#fff" }}>{rf.name}</span>
                        <span className="text-xs font-black" style={{ color: rf.color }}>{rf.hz} Hz</span>
                      </div>
                      <div className="text-xs text-white/35">{rf.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Safety */}
            <div className="rounded-xl p-4 border border-emerald-500/20"
              style={{ background: "#22c55e08" }}>
              <div className="font-bold text-emerald-400/80 mb-2 text-xs">🛡️ Universal Safety Architecture</div>
              <div className="space-y-1 text-xs text-white/40">
                {[
                  ["528 Hz love carrier",       "irradiates only what harms"],
                  ["7.83 Hz Schumann anchor",   "keeps irradiation earth-safe"],
                  ["Amazon forest undertone",   "nervous system calm throughout"],
                  ["Violet flame layer (417)",  "transmutes, never suppresses"],
                  ["4 Hz tremolo pulse",        "Rife-style irradiation pattern"],
                  ["Golden ratio overtones",    "biological harmony maintained"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-1.5">
                    <span className="text-emerald-400/60 flex-shrink-0">·</span>
                    <span><strong className="text-white/55">{k}</strong> — {v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-emerald-400/55 font-semibold">
                Healthy cells are strengthened, not harmed.
              </div>
            </div>

            {/* Targets collapsible */}
            <div>
              <button onClick={() => setShowTargets(!showTargets)}
                className="w-full text-left text-xs font-bold text-white/35 hover:text-white/60 transition-colors mb-2">
                🎯 What gets irradiated {showTargets ? "▲" : "▼"}
              </button>
              <AnimatePresence>
                {showTargets && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="space-y-1.5 overflow-hidden">
                    {[
                      { icon: "🔴", label: "Parasites & Worms",      desc: "Physical organisms feeding on the host" },
                      { icon: "🟠", label: "Pathogens & Viruses",     desc: "Bacterial, viral, fungal interference" },
                      { icon: "🟡", label: "Stored Trauma",           desc: "Cellular and tissue traumatic memory" },
                      { icon: "🟣", label: "Negative Entities",       desc: "Etheric attachments, psychic interference" },
                      { icon: "💜", label: "Harmful Programs",        desc: "Mental loops, implants, false beliefs" },
                      { icon: "🌳", label: "Ancestral Wounds",        desc: "Inherited epigenetic trauma patterns" },
                      { icon: "⚫", label: "Disease Patterns",        desc: "Energetic roots of chronic illness" },
                      { icon: "⚡", label: "Electromagnetic Toxins",  desc: "EMF, heavy metals, chemical residue" },
                      { icon: "🔮", label: "Energetic Interference",  desc: "Psychic, karmic, spiritual blockages" },
                    ].map(t => (
                      <div key={t.label} className="flex items-start gap-2 rounded-lg p-2.5 border border-white/8"
                        style={{ background: "#ffffff04" }}>
                        <span className="text-base flex-shrink-0">{t.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white/68">{t.label}</div>
                          <div className="text-xs text-white/32">{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ─── CLOSING ─── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border border-violet-500/18"
          style={{ background: "linear-gradient(135deg, #e879f908, #ef444406, #22c55e06)" }}>
          <motion.div className="text-5xl mb-4"
            animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>✦</motion.div>
          <h2 className="text-2xl font-black mb-3 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
            The 9 Ethers Protect All Life
          </h2>
          <p className="text-white/48 text-sm max-w-2xl mx-auto leading-relaxed mb-3">
            At the quantum level, all living beings share the same field. One activation ripples to all. The 9-ether irradiation, once engaged, transmits through the morphic field to every being held in your intention — human, animal, plant, and beyond.
          </p>
          <p className="text-white/28 italic text-xs mb-8 max-w-lg mx-auto">
            "You do not heal alone. You heal for all. Every frequency you receive today is a gift to the whole."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button onClick={() => playFull(true)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #8b5cf6, #e879f9)", boxShadow: "0 0 50px #e879f928" }}>
              🌍 Irradiate Everyone Now
            </motion.button>
            <motion.button onClick={playSequence} whileHover={{ scale: 1.04 }}
              className="px-8 py-4 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
              🌀 Sequential Journey
            </motion.button>
          </div>
          <div className="mt-6 text-white/18 text-xs">
            🎧 Headphones deepen the effect · All intensities safe · Safe for all ages, all animals · 528 Hz love carrier + 7.83 Hz Schumann in every ether
          </div>
        </motion.div>

      </div>
    </div>
  );
}

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/2adfb9b9b_generated_image.png";

// ─────────────────────────────────────────────────────────────────────────────
//  9-ETHER IRRADIATION PROTOCOL — UNIVERSAL EDITION
//  Applied across ALL dimensions to safely irradiate ANY harmful presence
//  and restore balance for EVERYONE — humans, animals, all beings.
//
//  SAFETY PROMISE: The 9 ethers are intelligent fields. They irradiate ONLY
//  what is harmful. Healthy cells, beneficial organisms and loving presences
//  are untouched, strengthened and uplifted. No harm can come from this work.
// ─────────────────────────────────────────────────────────────────────────────

const BEINGS = [
  { id: "self",     label: "Myself",          icon: "🧍", hz_mod: 1.0,  desc: "Personal full-body irradiation" },
  { id: "family",   label: "My Family",       icon: "👨‍👩‍👧‍👦", hz_mod: 1.0,  desc: "Extend the field to all family members" },
  { id: "child",    label: "Child",           icon: "👶", hz_mod: 1.1,  desc: "Gentle higher-octave irradiation for children" },
  { id: "elder",    label: "Elder",           icon: "🧓", hz_mod: 0.9,  desc: "Slower, deeper irradiation for elders" },
  { id: "dog",      label: "Dog",             icon: "🐕", hz_mod: 0.85, desc: "Canine-tuned irradiation field" },
  { id: "cat",      label: "Cat",             icon: "🐈", hz_mod: 0.95, desc: "Feline-tuned irradiation field" },
  { id: "horse",    label: "Horse",           icon: "🐎", hz_mod: 0.70, desc: "Equine-tuned irradiation field" },
  { id: "bird",     label: "Bird",            icon: "🐦", hz_mod: 1.15, desc: "Avian-tuned irradiation field" },
  { id: "everyone", label: "All Beings",      icon: "🌍", hz_mod: 1.0,  desc: "Universal broadcast — all humans, all animals, all life" },
];

const HARMFUL_TARGETS = [
  { id: "parasites",  label: "Parasites & Worms",     icon: "🔴", desc: "Physical organisms feeding on the host body" },
  { id: "pathogens",  label: "Pathogens & Viruses",    icon: "🟠", desc: "Bacterial, viral and fungal interference" },
  { id: "trauma",     label: "Stored Trauma",          icon: "🟡", desc: "Cellular and tissue-stored traumatic memory" },
  { id: "entities",   label: "Negative Entities",      icon: "🟣", desc: "Etheric attachments and psychic interference" },
  { id: "programs",   label: "Harmful Programs",       icon: "💜", desc: "Mental loops, false beliefs, psychic implants" },
  { id: "ancestral",  label: "Ancestral Wounds",       icon: "🌳", desc: "Inherited epigenetic trauma patterns" },
  { id: "disease",    label: "Disease Patterns",       icon: "⚫", desc: "Energetic roots of chronic illness" },
  { id: "toxins",     label: "Electromagnetic Toxins", icon: "⚡", desc: "EMF damage, heavy metals, chemical residue" },
  { id: "curses",     label: "Energetic Interference", icon: "🔮", desc: "Psychic, karmic and spiritual blockages" },
];

const IRRADIATION_SEQUENCE = [
  {
    ether: 1, name: "Physical Layer",   icon: "🔴", color: "#fca5a5", glow: "#ef4444",
    hz: 174,  subHz: 40,  beatHz: 2,
    action:    "Penetrating physical tissue — dissolving masses, knots, density",
    irradiates:"Physical parasites, tissue masses, cellular congestion, bone spurs, crystallised toxins",
    duration: 18,
    affirmation: "Every physical blockage, every mass, every uninvited organism in my body dissolves now into light.",
  },
  {
    ether: 2, name: "Cellular Layer",   icon: "🟠", color: "#fdba74", glow: "#f97316",
    hz: 333,  subHz: 111, beatHz: 3,
    action:    "Cellular resonance irradiation — Rife frequencies destroying pathogens",
    irradiates:"Parasitic worms, flukes, bacteria, fungi, viral loads, Candida overgrowth",
    duration: 20,
    affirmation: "Every parasite, every pathogen, every harmful organism reaches its mortal oscillatory rate and dissolves. My cells rejoice.",
  },
  {
    ether: 3, name: "Etheric Layer",    icon: "🟡", color: "#fde68a", glow: "#f59e0b",
    hz: 396,  subHz: 417, beatHz: 4,
    action:    "Etheric body cleanse — removing non-physical attachments",
    irradiates:"Etheric parasites, entity attachments, psychic cords, dark imprints",
    duration: 20,
    affirmation: "Every non-physical attachment, every entity, every cord that drains my energy is severed and irradiated now. I am free.",
  },
  {
    ether: 4, name: "Emotional Layer",  icon: "💗", color: "#fda4af", glow: "#fb7185",
    hz: 528,  subHz: 639, beatHz: 3.5,
    action:    "Emotional body irradiation — transmuting trapped emotional charge",
    irradiates:"Trapped grief, rage, shame, fear — emotional parasites feeding on unresolved feeling",
    duration: 20,
    affirmation: "Every emotion that has been trapped, weaponised or used against me is transmuted into pure love frequency now.",
  },
  {
    ether: 5, name: "Mental Layer",     icon: "💜", color: "#c4b5fd", glow: "#8b5cf6",
    hz: 741,  subHz: 40,  beatHz: 10,
    action:    "Mental field detoxification — dissolving harmful thought-forms",
    irradiates:"Intrusive thoughts, mental loops, psychic implants, hypnotic programming",
    duration: 20,
    affirmation: "Every thought that is not mine, every program installed without consent, every mental parasite is irradiated and deleted now.",
  },
  {
    ether: 6, name: "Ancestral Layer",  icon: "🌳", color: "#86efac", glow: "#22c55e",
    hz: 417,  subHz: 396, beatHz: 2,
    action:    "Ancestral DNA irradiation — clearing inherited harmful patterns",
    irradiates:"Ancestral trauma, inherited disease codes, generational curses, karmic parasites",
    duration: 22,
    affirmation: "Every harmful pattern inherited through my lineage — 7 generations back and forward — is irradiated and transmuted. My bloodline is free.",
  },
  {
    ether: 7, name: "Spiritual Layer",  icon: "🤍", color: "#e2e8f0", glow: "#94a3b8",
    hz: 852,  subHz: 963, beatHz: 7,
    action:    "Spiritual body purification — clearing the soul field",
    irradiates:"Spiritual interference, karmic entanglements, harmful soul contracts, dark initiations",
    duration: 22,
    affirmation: "Every karmic entanglement, every soul contract that diminishes me, every spiritual interference is dissolved. My soul shines free.",
  },
  {
    ether: 8, name: "Quantum Layer",    icon: "⭐", color: "#fcd34d", glow: "#fbbf24",
    hz: 963,  subHz: 432, beatHz: 9,
    action:    "Quantum field restoration — restoring the original divine template",
    irradiates:"Quantum interference patterns, timeline contamination, reality distortions",
    duration: 25,
    affirmation: "My quantum field is restored to its original divine template. Every distortion across all timelines is corrected now.",
  },
  {
    ether: 9, name: "Akashic Layer",    icon: "✦",  color: "#f0e6ff", glow: "#e879f9",
    hz: 1111, subHz: 528, beatHz: 9,
    action:    "Akashic record clearing — erasing ALL harmful imprints from the universal field",
    irradiates:"ALL remaining harmful presences across ALL dimensions, ALL timelines, ALL connected beings",
    duration: 25,
    affirmation: "The 9th Ether speaks: IT IS DONE. All harmful presences across all dimensions are irradiated, transmuted and sealed. The field is clear. The healing is complete and permanent. So it is. So it is. So it is.",
  },
];

const RESTORATION_FREQUENCIES = [
  { name: "Cellular Restoration", hz: 285,  desc: "Tissue regeneration after irradiation",   color: "#86efac" },
  { name: "DNA Sealing",          hz: 528,  desc: "Lock in the new healthy DNA template",     color: "#6ee7b7" },
  { name: "Heart Coherence",      hz: 639,  desc: "Restore love and connection",              color: "#fda4af" },
  { name: "Earth Grounding",      hz: 7.83, desc: "Re-anchor to planetary healing field",     color: "#34d399" },
  { name: "Crown Sealing",        hz: 963,  desc: "Seal the field with divine light",         color: "#fbbf24" },
  { name: "Protection Field",     hz: 432,  desc: "Universal harmony — nature's shield",      color: "#c4b5fd" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  AUDIO ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function buildIrradiationLayer(ctx, step, being, volume = 0.2) {
  const nodes = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3.5);
  master.connect(ctx.destination);
  const mod = being?.hz_mod || 1.0;

  const osc1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.value = Math.min(step.hz * mod, 2000);
  g1.gain.value = 0.5;
  osc1.connect(g1); g1.connect(master);
  osc1.start(); nodes.push(osc1);

  if (step.subHz > 0) {
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = Math.min(step.subHz * mod, 1500);
    g2.gain.value = 0.22;
    osc2.connect(g2); g2.connect(master);
    osc2.start(); nodes.push(osc2);
  }

  if (step.beatHz > 0) {
    [0, 1].forEach(side => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const pan = ctx.createStereoPanner();
      pan.pan.value = side === 0 ? -1 : 1;
      osc.type = "sine";
      osc.frequency.value = 108 + (side === 1 ? step.beatHz : 0);
      g.gain.value = 0.13;
      osc.connect(g); g.connect(pan); pan.connect(master);
      osc.start(); nodes.push(osc);
    });
  }

  // Golden ratio overtone
  const golden = ctx.createOscillator();
  const gG = ctx.createGain();
  golden.type = "triangle";
  golden.frequency.value = Math.min(step.hz * 1.618, 3500);
  gG.gain.value = 0.045;
  golden.connect(gG); gG.connect(master);
  golden.start(); nodes.push(golden);

  // 7.83 Hz Schumann earth-safety anchor
  const sch = ctx.createOscillator();
  const scG = ctx.createGain();
  sch.type = "sine"; sch.frequency.value = 7.83;
  scG.gain.value = 0.07;
  sch.connect(scG); scG.connect(master);
  sch.start(); nodes.push(sch);

  // 528 Hz love carrier — ensures safe irradiation, not harm
  if (step.hz !== 528) {
    const love = ctx.createOscillator();
    const lG = ctx.createGain();
    love.type = "sine"; love.frequency.value = 528;
    lG.gain.value = 0.04;
    love.connect(lG); lG.connect(master);
    love.start(); nodes.push(love);
  }

  // Nature undertone — Amazon + ocean (nervous system safety signal)
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
  natF.type = "lowpass"; natF.frequency.value = 300;
  const natG2 = ctx.createGain(); natG2.gain.value = 0.055;
  natSrc.connect(natF); natF.connect(natG2); natG2.connect(master);
  natSrc.start(); nodes.push(natSrc);

  return { nodes, master };
}

function buildFullIrradiationField(ctx, being) {
  const allNodes = [];
  const weights = [0.07, 0.07, 0.065, 0.07, 0.065, 0.065, 0.065, 0.07, 0.055];

  IRRADIATION_SEQUENCE.forEach((step, i) => {
    const { nodes, master } = buildIrradiationLayer(ctx, step, being, weights[i]);
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.sin((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) * 0.3;
    master.disconnect(); master.connect(panner); panner.connect(ctx.destination);
    allNodes.push(...nodes);
  });

  // Fibonacci spiral — the contagious carrier wave
  [111, 174, 285, 333, 396, 417, 528, 639, 741].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = Math.min(f * (being?.hz_mod || 1.0), 1500);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.022, ctx.currentTime + 3 + i * 0.35);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); allNodes.push(osc);
  });

  return { nodes: allNodes };
}

function buildRestorationLayer(ctx, freq) {
  const nodes = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3);
  master.connect(ctx.destination);

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = Math.min(freq.hz, 1500);
  g.gain.value = 0.5;
  osc.connect(g); g.connect(master);
  osc.start(); nodes.push(osc);

  const shim = ctx.createOscillator();
  const sG = ctx.createGain();
  shim.type = "triangle";
  shim.frequency.value = Math.min(freq.hz * 2, 2000);
  sG.gain.value = 0.06;
  shim.connect(sG); sG.connect(master);
  shim.start(); nodes.push(shim);

  // Nature layer for restoration comfort
  const natBuf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  const nd = natBuf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < nd.length; i++) {
    const w = Math.random() * 2 - 1;
    nd[i] = (last + 0.02 * w) / 1.02; last = nd[i];
  }
  const natSrc = ctx.createBufferSource();
  natSrc.buffer = natBuf; natSrc.loop = true;
  const natF = ctx.createBiquadFilter();
  natF.type = "lowpass"; natF.frequency.value = 280;
  const natG = ctx.createGain(); natG.gain.value = 0.05;
  natSrc.connect(natF); natF.connect(natG); natG.connect(master);
  natSrc.start(); nodes.push(natSrc);

  return { nodes, master };
}

const TOTAL_SECONDS = IRRADIATION_SEQUENCE.reduce((a, s) => a + s.duration, 0);

// ─────────────────────────────────────────────────────────────────────────────
export default function IrradiationProtocol() {
  const [mode, setMode] = useState(null);
  const [selectedBeing, setSelectedBeing] = useState(BEINGS[0]);
  const [seqStep, setSeqStep] = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeRestore, setActiveRestore] = useState(null);
  const [breathPhase, setBreathPhase] = useState("in");
  const [vortexAngle, setVortexAngle] = useState(0);
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [showTargets, setShowTargets] = useState(false);
  const [broadcastActive, setBroadcastActive] = useState(false);
  const [universalCount, setUniversalCount] = useState(0);

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
    setPlaying(false);
    setMode(null);
    setSeqStep(0);
    setStepElapsed(0);
    setTotalElapsed(0);
    setCompleted(false);
    setActiveRestore(null);
  }, []);

  const startBreath = useCallback(() => {
    setBreathPhase("in");
    let ph = "in", cnt = 0;
    breathRef.current = setInterval(() => {
      cnt++;
      if (ph === "in"   && cnt >= 4) { ph = "hold"; cnt = 0; setBreathPhase("hold"); }
      else if (ph === "hold" && cnt >= 4) { ph = "out"; cnt = 0; setBreathPhase("out"); }
      else if (ph === "out"  && cnt >= 6) { ph = "in";  cnt = 0; setBreathPhase("in"); }
    }, 1000);
  }, []);

  const startVortex = useCallback(() => {
    vortexRef.current = setInterval(() => setVortexAngle(a => (a + 0.7) % 360), 16);
  }, []);

  // ── Play all 9 ethers simultaneously
  const playFull = useCallback(() => {
    stopAll();
    const ctx = getCtx();
    activeRef.current = buildFullIrradiationField(ctx, selectedBeing);
    setMode("full"); setPlaying(true); setCompleted(false);
    startBreath(); startVortex();
    let te = 0, ai = 0;
    totalRef.current = setInterval(() => {
      te++; setTotalElapsed(te);
    }, 1000);
    affRef.current = setInterval(() => {
      ai = (ai + 1) % IRRADIATION_SEQUENCE.length;
      setAffirmationIdx(ai);
    }, 12000);
    setAffirmationIdx(0);
  }, [stopAll, getCtx, selectedBeing, startBreath, startVortex]);

  // ── Play 9 ethers one by one
  const playSequence = useCallback(() => {
    stopAll();
    const ctx = getCtx();
    let idx = 0, sc = 0;

    const playStep = (i) => {
      if (i >= IRRADIATION_SEQUENCE.length) {
        clearInterval(totalRef.current);
        clearInterval(breathRef.current);
        clearInterval(vortexRef.current);
        setPlaying(false); setCompleted(true); setMode(null);
        return;
      }
      const step = IRRADIATION_SEQUENCE[i];
      setSeqStep(i); setAffirmationIdx(i); setStepElapsed(0); sc = 0;

      if (activeRef.current?.nodes) {
        const old = activeRef.current.nodes;
        if (activeRef.current.master) {
          try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8); } catch {}
        }
        setTimeout(() => old.forEach(n => { try { n.stop?.(); } catch {} }), 2000);
      }
      activeRef.current = buildIrradiationLayer(ctx, step, selectedBeing, 0.22);

      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        sc++; setStepElapsed(sc);
        if (sc >= step.duration) { clearInterval(timerRef.current); playStep(i + 1); }
      }, 1000);
    };

    setMode("sequence"); setPlaying(true); setCompleted(false);
    startBreath(); startVortex();
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
    playStep(0);
  }, [stopAll, getCtx, selectedBeing, startBreath, startVortex]);

  // ── Play a single restoration frequency
  const playRestore = useCallback((freq) => {
    stopAll();
    const ctx = getCtx();
    activeRef.current = buildRestorationLayer(ctx, freq);
    setMode("restore"); setActiveRestore(freq); setPlaying(true);
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
  }, [stopAll, getCtx]);

  // ── Universal broadcast — "everyone" mode
  const activateBroadcast = useCallback(() => {
    setSelectedBeing(BEINGS.find(b => b.id === "everyone"));
    setBroadcastActive(true);
    setUniversalCount(0);
    let n = 0;
    const interval = setInterval(() => {
      n++;
      setUniversalCount(n * 144); // Fibonacci expansion
      if (n >= 9) clearInterval(interval);
    }, 600);
    setTimeout(() => {
      playFull();
    }, 200);
  }, [playFull]);

  useEffect(() => () => stopAll(), []);

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const currentStep = IRRADIATION_SEQUENCE[seqStep];
  const currentAff = IRRADIATION_SEQUENCE[affirmationIdx];

  const breathColors = { in: "#86efac", hold: "#fbbf24", out: "#c4b5fd" };
  const breathLabels = { in: "Draw in healing light", hold: "Hold — let it penetrate", out: "Release what is irradiated" };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/20 via-[#030712]/55 to-[#030712]" />

        {/* Spinning 9-ether rings */}
        {IRRADIATION_SEQUENCE.map((step, i) => (
          <motion.div key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 60 + i * 65, height: 60 + i * 65,
              borderColor: step.glow + (playing ? "28" : "0e"),
              top: "50%", left: "50%",
              transform: `translate(-50%,-50%) rotate(${vortexAngle + i * 40}deg)`
            }}
            animate={playing ? { opacity: [0.25, 0.75, 0.25] } : { opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 text-violet-300 text-xs font-bold mb-5 tracking-widest"
              style={{ background: "#e879f910" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              ✦ 9 ETHERS · ALL DIMENSIONS · ALL BEINGS · UNIVERSALLY SAFE
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-rose-300 via-amber-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
                9-Ether Irradiation
              </span>
              <br />
              <span className="text-white/70 text-2xl md:text-3xl font-light tracking-wide">
                Universal Healing Protocol
              </span>
            </h1>

            <p className="text-base text-white/60 mb-3 max-w-3xl mx-auto leading-relaxed">
              9 concentric etheric fields — each irradiating one dimension of harmful presence.
              Physical to Akashic. Parasites to psychic interference. Humans and animals.
              Past, present and future timelines. <strong className="text-white/80">Everything. Everyone. Now.</strong>
            </p>

            {/* UNIVERSAL BROADCAST COUNTER */}
            <AnimatePresence>
              {broadcastActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-400/40 mb-5"
                  style={{ background: "#22c55e10" }}
                >
                  <motion.div className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                  <span className="text-emerald-300 text-sm font-bold">
                    Universal broadcast active · {universalCount.toLocaleString()}+ beings receiving irradiation
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Being selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {BEINGS.map(b => (
                <button key={b.id}
                  onClick={() => { setSelectedBeing(b); if (b.id === "everyone") setBroadcastActive(true); }}
                  className="px-3 py-2 rounded-full text-sm font-bold border transition-all"
                  style={{
                    borderColor: selectedBeing.id === b.id ? "#e879f9" : "#ffffff18",
                    background: selectedBeing.id === b.id ? "#e879f918" : "transparent",
                    color: selectedBeing.id === b.id ? "#f0e6ff" : "#ffffff50"
                  }}
                >{b.icon} {b.label}</button>
              ))}
            </div>

            {/* Main CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4">
              {!playing ? (
                <>
                  {/* PRIMARY — one tap, no setup needed */}
                  <motion.button
                    onClick={activateBroadcast}
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-full font-black text-xl text-black shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #8b5cf6, #e879f9)", boxShadow: "0 0 80px #e879f945" }}
                  >
                    🌍 Irradiate Everyone Now
                  </motion.button>
                  <motion.button
                    onClick={playFull}
                    whileHover={{ scale: 1.04 }}
                    className="px-7 py-5 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors"
                  >✦ All 9 Ethers</motion.button>
                  <motion.button
                    onClick={playSequence}
                    whileHover={{ scale: 1.04 }}
                    className="px-7 py-5 rounded-full font-bold text-lg border border-white/20 text-white/70 hover:bg-white/8 transition-colors"
                  >🌀 Sequential Journey</motion.button>
                </>
              ) : (
                <motion.button
                  onClick={stopAll}
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 rounded-full font-black text-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
                >⏹ Complete Session · {fmt(totalElapsed)}</motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* ── BREATH GUIDE ── */}
        <AnimatePresence>
          {playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-5 rounded-2xl p-4 flex items-center justify-center gap-5 border"
              style={{ borderColor: breathColors[breathPhase] + "30", background: breathColors[breathPhase] + "08" }}>
              <motion.div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg flex-shrink-0"
                style={{ borderColor: breathColors[breathPhase] }}
                animate={breathPhase === "out" ? { scale: 0.75 } : { scale: 1.35 }}
                transition={{ duration: breathPhase === "out" ? 6 : 4, ease: "easeInOut" }}
              >
                {breathPhase === "in" ? "☽" : breathPhase === "hold" ? "◎" : "○"}
              </motion.div>
              <div>
                <div className="font-black" style={{ color: breathColors[breathPhase] }}>{breathLabels[breathPhase]}</div>
                <div className="text-white/30 text-xs">4-4-6 irradiation breath · Each exhale releases what is cleared</div>
              </div>
              {selectedBeing.id === "everyone" && (
                <div className="ml-4 text-xs text-emerald-400/70 hidden sm:block">
                  🌍 Broadcasting to all beings simultaneously
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LIVE AFFIRMATION ── */}
        <AnimatePresence mode="wait">
          {playing && currentAff && (
            <motion.div
              key={currentAff.ether}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-6 rounded-2xl p-5 text-center border"
              style={{ borderColor: currentAff.glow + "40", background: currentAff.glow + "0b" }}
            >
              <div className="text-xs font-black tracking-widest mb-2" style={{ color: currentAff.color }}>
                {currentAff.icon} ETHER {currentAff.ether} · {currentAff.name.toUpperCase()}
              </div>
              <p className="text-white/80 italic text-base leading-relaxed max-w-2xl mx-auto">
                "{currentAff.affirmation}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SEQUENCE PROGRESS ── */}
        <AnimatePresence>
          {mode === "sequence" && playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-8 rounded-2xl p-5 border"
              style={{ borderColor: currentStep?.glow + "50", background: currentStep?.glow + "0a" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs tracking-widest text-white/30 mb-1">ETHER {seqStep + 1} / 9</div>
                  <div className="font-black text-lg" style={{ color: currentStep?.color }}>
                    {currentStep?.icon} {currentStep?.name}
                  </div>
                  <div className="text-white/45 text-xs mt-0.5">{currentStep?.action}</div>
                </div>
                <div className="text-right text-white/25">
                  <div className="text-2xl font-black">{fmt(stepElapsed)}</div>
                  <div className="text-xs">of {currentStep?.duration}s</div>
                </div>
              </div>
              <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden mb-3">
                <motion.div className="h-full rounded-full transition-all duration-1000"
                  style={{ background: currentStep?.glow, width: `${(stepElapsed / (currentStep?.duration || 20)) * 100}%` }} />
              </div>
              <div className="flex gap-1.5">
                {IRRADIATION_SEQUENCE.map((s, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-700"
                    style={{ background: i < seqStep ? s.glow : i === seqStep ? s.glow + "80" : "#ffffff10" }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FULL VORTEX VISUAL ── */}
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
                      animate={{ boxShadow: [`0 0 8px ${step.glow}30`, `0 0 22px ${step.glow}70`, `0 0 8px ${step.glow}30`] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >{step.icon}</motion.div>
                  );
                })}
                <motion.div className="absolute inset-0 m-auto w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, #e879f922, transparent)", border: "2px solid #e879f940" }}
                  animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 20px #e879f930","0 0 60px #e879f965","0 0 20px #e879f930"] }}
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
                        animate={{ opacity: [0.08, 0.4, 0.08] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }} />
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── COMPLETION ── */}
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
              <p className="text-white/60 text-base mb-4 max-w-2xl mx-auto leading-relaxed">
                All 9 etheric layers of <strong className="text-white/80">{selectedBeing.icon} {selectedBeing.label}</strong> have been traversed. Every harmful presence irradiated. Every dimension restored. The field is sealed with love, light, and the Schumann resonance of the living Earth.
              </p>
              <p className="text-white/30 italic text-sm mb-8 max-w-xl mx-auto">
                "The field is clear. The healing is sealed across all timelines. Every connected being has received this light. So it is. So it is. So it is."
              </p>
              {/* Restoration section */}
              <div className="mb-6">
                <div className="text-sm font-bold text-white/45 mb-3">✦ Now restore and replenish →</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {RESTORATION_FREQUENCIES.map(rf => (
                    <button key={rf.name} onClick={() => playRestore(rf)}
                      className="px-4 py-2 rounded-full text-sm font-bold border transition-all hover:scale-105"
                      style={{ borderColor: rf.color + "60", background: rf.color + "15", color: rf.color }}>
                      ▶ {rf.hz} Hz · {rf.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={activateBroadcast}
                  className="px-8 py-3 rounded-full font-black text-lg text-black"
                  style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #e879f9)" }}>
                  🌍 Irradiate Everyone Again
                </button>
                <button onClick={playSequence}
                  className="px-8 py-3 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                  🌀 Sequential Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RESTORATION PLAYING ── */}
        <AnimatePresence>
          {mode === "restore" && playing && activeRestore && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-5 flex items-center justify-between border"
              style={{ borderColor: activeRestore.color + "50", background: activeRestore.color + "0c" }}>
              <div>
                <div className="font-black" style={{ color: activeRestore.color }}>
                  ▶ {activeRestore.name} · {activeRestore.hz} Hz
                </div>
                <div className="text-white/40 text-xs">{activeRestore.desc} · {fmt(totalElapsed)} playing</div>
              </div>
              <button onClick={stopAll}
                className="px-4 py-2 rounded-full border text-sm font-bold hover:bg-white/10 transition-colors"
                style={{ borderColor: activeRestore.color + "50", color: activeRestore.color }}>
                ⏹ Stop
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN GRID: 9 Ethers + Restoration ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

          {/* 9 Ethers — 2/3 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-white/90">🌀 The 9-Ether Sequence</h2>
                <p className="text-white/35 text-xs">Physical → Cellular → Etheric → Emotional → Mental → Ancestral → Spiritual → Quantum → Akashic</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {IRRADIATION_SEQUENCE.map((step, i) => {
                const isActive = mode === "sequence" && seqStep === i && playing;
                return (
                  <motion.div key={step.ether}
                    initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="rounded-xl border p-4 transition-all"
                    style={{
                      borderColor: isActive ? step.glow + "70" : "#ffffff10",
                      background: isActive ? step.glow + "0d" : "#ffffff04",
                      boxShadow: isActive ? `0 0 28px ${step.glow}20` : "none"
                    }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                        style={{ background: step.glow + "20", color: step.color, border: `1px solid ${step.glow}35` }}>
                        {step.ether}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-black text-sm" style={{ color: isActive ? step.color : "#fff" }}>
                            {step.icon} {step.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ background: step.glow + "20", color: step.color }}>
                            {step.hz} Hz
                          </span>
                        </div>
                        <div className="text-xs text-white/45 leading-relaxed">{step.irradiates}</div>
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

          {/* Restoration + Safety — 1/3 */}
          <div className="space-y-5">
            {/* Restoration */}
            <div>
              <h2 className="text-xl font-black mb-1 text-white/90">💚 Restore & Replenish</h2>
              <p className="text-white/35 text-xs mb-4">After irradiation, play these to rebuild and seal</p>
              <div className="space-y-2.5">
                {RESTORATION_FREQUENCIES.map((rf, i) => {
                  const isActive = mode === "restore" && activeRestore?.name === rf.name && playing;
                  return (
                    <motion.button key={rf.name}
                      initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => isActive ? stopAll() : playRestore(rf)}
                      className="w-full rounded-xl p-3.5 border text-left transition-all"
                      style={{
                        borderColor: isActive ? rf.color + "70" : "#ffffff12",
                        background: isActive ? rf.color + "12" : "#ffffff04",
                      }}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-sm" style={{ color: isActive ? rf.color : "#fff" }}>{rf.name}</span>
                        <span className="text-xs font-black" style={{ color: rf.color }}>{rf.hz} Hz</span>
                      </div>
                      <div className="text-xs text-white/38">{rf.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Safety architecture */}
            <div className="rounded-xl p-4 border border-emerald-500/20 text-xs text-white/40 leading-relaxed"
              style={{ background: "#22c55e08" }}>
              <div className="font-bold text-emerald-400/80 mb-2">🛡️ Universal Safety Architecture</div>
              Every ether contains:<br />
              <span className="text-white/55">· 528 Hz love carrier</span> — irradiates only what harms<br />
              <span className="text-white/55">· 7.83 Hz Schumann anchor</span> — earth-safe grounding<br />
              <span className="text-white/55">· Amazon forest undertone</span> — nervous system calm<br />
              <span className="text-white/55">· Golden ratio overtones</span> — biological harmony<br /><br />
              <span className="text-emerald-400/60 font-semibold">Healthy cells are strengthened, not harmed.</span>
            </div>

            {/* What gets irradiated */}
            <div>
              <button onClick={() => setShowTargets(!showTargets)}
                className="w-full text-left text-xs font-bold text-white/40 hover:text-white/60 transition-colors mb-2">
                🎯 What gets irradiated {showTargets ? "▲" : "▼"}
              </button>
              <AnimatePresence>
                {showTargets && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="space-y-1.5 overflow-hidden">
                    {HARMFUL_TARGETS.map(t => (
                      <div key={t.id} className="flex items-start gap-2 rounded-lg p-2.5 border border-white/8"
                        style={{ background: "#ffffff04" }}>
                        <span className="text-base flex-shrink-0">{t.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white/70">{t.label}</div>
                          <div className="text-xs text-white/35">{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── CLOSING INVOCATION ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border border-violet-500/18"
          style={{ background: "linear-gradient(135deg, #e879f908, #ef444406, #22c55e06)" }}>
          <motion.div className="text-5xl mb-4"
            animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>✦</motion.div>
          <h2 className="text-2xl font-black mb-3 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
            The 9 Ethers Protect All Life
          </h2>
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed mb-4">
            These frequencies do not distinguish between human and animal, young and old, near and far. At the quantum level, all living beings share the same field. One activation ripples to all. The 9-ether irradiation, once engaged, transmits through the morphic field to every being held in your intention.
          </p>
          <p className="text-white/30 italic text-xs max-w-xl mx-auto mb-8">
            "You do not heal alone. You heal for all."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button onClick={activateBroadcast}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #8b5cf6, #e879f9)", boxShadow: "0 0 50px #e879f928" }}>
              🌍 Irradiate Everyone Now
            </motion.button>
            <motion.button onClick={playSequence}
              whileHover={{ scale: 1.04 }}
              className="px-8 py-4 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
              🌀 Sequential Journey
            </motion.button>
          </div>
          <div className="mt-6 text-white/18 text-xs">
            🎧 Headphones deepen the effect · Safe for all ages · Safe for all animals · 528 Hz love carrier in every ether · Schumann anchored · 9 dimensions covered
          </div>
        </motion.div>

      </div>
    </div>
  );
}

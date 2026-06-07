import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/a03480428_generated_image.png";

// ─────────────────────────────────────────────────────────────────────────────
//  THE 9 ETHERIC DIMENSIONS
//  Based on ancient esoteric cosmology, quantum field theory &
//  biophotonic healing science. Each ether corresponds to:
//  · A dimension of reality (physical → quantum → divine)
//  · A specific healing action (disentangle, irradiate, transmute)
//  · A precise frequency architecture
// ─────────────────────────────────────────────────────────────────────────────
const NINE_ETHERS = [
  {
    id: "first",
    number: 1,
    name: "First Ether — Physical Dissolution",
    subtitle: "Disentangle masses, knots & physical blockages",
    icon: "🔴",
    color: "#fca5a5",
    glow: "#ef4444",
    hz: 174,
    subHz: 285,
    beatHz: 2,
    action: "DISENTANGLE",
    target: "Physical masses, tissue knots, cellular congestion",
    quantum: "At the quantum level, 174 Hz collapses the wave-function of pain. It is the lowest Solfeggio — the foundation stone. It operates on the fascia, connective tissue and the body's crystalline matrix, gently dissolving physical entanglements back into coherent flow.",
    affirmation: "Every knot, every mass, every blockage dissolves now into perfect flowing light.",
    duration: 20,
  },
  {
    id: "second",
    number: 2,
    name: "Second Ether — Cellular Irradiation",
    subtitle: "Irradiate and neutralise parasites & pathogens",
    icon: "🟠",
    color: "#fdba74",
    glow: "#f97316",
    hz: 333,
    subHz: 111,
    beatHz: 3,
    action: "IRRADIATE",
    target: "Parasites, pathogens, bacteria, viral interference",
    quantum: "Royal Rife discovered in 1934 that specific frequencies shatter pathogenic organisms through resonant frequency destruction — the same principle that shatters a glass with sound. 333 Hz combined with 111 Hz creates a resonant irradiation field that is lethal to parasitic life while being regenerative for healthy cells.",
    affirmation: "Every parasite, every pathogen, every uninvited life form is irradiated and transmuted into light.",
    duration: 20,
  },
  {
    id: "third",
    number: 3,
    name: "Third Ether — Trauma Extraction",
    subtitle: "Extract and delete stored trauma from all tissues",
    icon: "🟡",
    color: "#fde68a",
    glow: "#f59e0b",
    hz: 396,
    subHz: 417,
    beatHz: 4,
    action: "EXTRACT",
    target: "Stored trauma, cellular memory, emotional imprints",
    quantum: "Trauma is stored as coherent light interference patterns in the body's biophotonic field (Popp, 1984). 396 Hz liberates guilt and fear — the two primary carriers of trauma. 417 Hz undoes stored situations. Together they form the trauma extraction sequence: first release the charge, then dissolve the memory.",
    affirmation: "All trauma — mine and inherited — is extracted from every cell, every tissue, every memory. I am free.",
    duration: 25,
  },
  {
    id: "fourth",
    number: 4,
    name: "Fourth Ether — DNA Quantum Repair",
    subtitle: "Repair and restore original DNA blueprint",
    icon: "💚",
    color: "#86efac",
    glow: "#22c55e",
    hz: 528,
    subHz: 285,
    beatHz: 7.83,
    action: "REPAIR",
    target: "DNA damage, epigenetic wounds, ancestral coding",
    quantum: "528 Hz is the mathematical centre of the musical matrix — the 'miracle frequency'. Dr. Glen Rein showed it increases UV light absorption in DNA by 11%. Combined with 285 Hz tissue regeneration and 7.83 Hz Earth coherence, this creates a quantum DNA repair field that works at the level of individual base pairs.",
    affirmation: "My DNA returns to its original divine blueprint. Every strand is restored to perfect, luminous wholeness.",
    duration: 25,
  },
  {
    id: "fifth",
    number: 5,
    name: "Fifth Ether — Emotional Field Clearing",
    subtitle: "Clear the electromagnetic emotional body",
    icon: "💙",
    color: "#93c5fd",
    glow: "#3b82f6",
    hz: 639,
    subHz: 528,
    beatHz: 5,
    action: "CLEAR",
    target: "Emotional body, relationship fields, heart blockages",
    quantum: "The heart generates a toroidal electromagnetic field that extends 8–10 feet from the body and encodes emotional memory. 639 Hz harmonises this field, reconnecting disrupted relationship bonds and dissolving emotional knots that have formed in the toroidal structure. This is the quantum social healing frequency.",
    affirmation: "My emotional field is clear, coherent and radiant. Every relationship is healed in the field of love.",
    duration: 25,
  },
  {
    id: "sixth",
    number: 6,
    name: "Sixth Ether — Mental Detoxification",
    subtitle: "Detoxify the mental field from harmful programs",
    icon: "💜",
    color: "#c4b5fd",
    glow: "#8b5cf6",
    hz: 741,
    subHz: 40,
    beatHz: 10,
    action: "DETOXIFY",
    target: "Mental programs, negative thought-forms, psychic interference",
    quantum: "741 Hz is the frequency of problem-solving and cellular detoxification. It awakens intuition and clears electromagnetic toxins from the mental field. Combined with 40 Hz gamma (whole-brain coherence) and 10 Hz alpha (mental renewal), it creates a complete mental detoxification protocol — dissolving harmful thought-forms at their quantum root.",
    affirmation: "Every harmful program, every implanted fear, every false belief is dissolved from my mind now and forever.",
    duration: 25,
  },
  {
    id: "seventh",
    number: 7,
    name: "Seventh Ether — Spirit Activation",
    subtitle: "Reactivate dormant spiritual faculties & gifts",
    icon: "🤍",
    color: "#e2e8f0",
    glow: "#94a3b8",
    hz: 852,
    subHz: 963,
    beatHz: 7,
    action: "ACTIVATE",
    target: "Third eye, pineal gland, spiritual DNA, dormant gifts",
    quantum: "852 Hz returns the individual to spiritual order and awakens the third eye. The pineal gland — sealed in most humans by fluoride calcification and electromagnetic pollution — begins to decalcify at this frequency. Combined with 963 Hz crown activation, spiritual faculties dormant since childhood reawaken: intuition, vision, knowing, healing hands.",
    affirmation: "Every dormant spiritual gift I carry awakens now. I see with the eyes of the soul.",
    duration: 25,
  },
  {
    id: "eighth",
    number: 8,
    name: "Eighth Ether — Quantum Field Unification",
    subtitle: "Unify all fields — body, mind, spirit, soul",
    icon: "⭐",
    color: "#fcd34d",
    glow: "#fbbf24",
    hz: 963,
    subHz: 432,
    beatHz: 9,
    action: "UNIFY",
    target: "All fields simultaneously — the complete human energy system",
    quantum: "963 Hz is the frequency of the divine — the 'God frequency'. It reconnects with the unity consciousness field and synchronises all seven chakras into a single coherent beam. 432 Hz anchors this state into nature's own frequency. At this level, human beings become quantum antennae — receiving and transmitting healing across space and time.",
    affirmation: "Every part of me — body, mind, spirit and soul — is now unified in perfect divine coherence.",
    duration: 30,
  },
  {
    id: "ninth",
    number: 9,
    name: "Ninth Ether — The Vortex Opens",
    subtitle: "All 9 dimensions simultaneously — quantum all-field healing",
    icon: "✦",
    color: "#f0e6ff",
    glow: "#e879f9",
    hz: 9999,
    subHz: 1111,
    beatHz: 9,
    action: "TRANSCEND",
    target: "ALL dimensions of being — humans and animals — past, present, future",
    quantum: "The ninth ether is the akashic field itself — the quantum vacuum from which all matter and consciousness emerge. At this dimension, healing is non-local and non-temporal: it reaches backward to heal the origin of disease, forward to prevent its recurrence, and outward to all connected beings. This is the vortex state — where individual healing becomes planetary healing.",
    affirmation: "The vortex is open. I am healed across all dimensions, all timelines, all spheres of existence. All beings connected to me are healed through me. So it is.",
    duration: 30,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  QUANTUM AUDIO ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function buildEtherFrequency(ctx, ether, volume = 0.18) {
  const nodes = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 4);
  master.connect(ctx.destination);

  // ── Primary ether tone
  const primary = ctx.createOscillator();
  const pGain = ctx.createGain();
  primary.type = "sine";
  primary.frequency.value = Math.min(ether.hz, 2000);
  pGain.gain.value = 0.5;
  primary.connect(pGain); pGain.connect(master);
  primary.start();
  nodes.push(primary);

  // ── Sub harmonic depth layer
  if (ether.subHz > 0) {
    const sub = ctx.createOscillator();
    const sGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.value = Math.min(ether.subHz, 1500);
    sGain.gain.value = 0.25;
    sub.connect(sGain); sGain.connect(master);
    sub.start();
    nodes.push(sub);
  }

  // ── Binaural quantum beat
  if (ether.beatHz > 0) {
    const base = 100;
    ["left", "right"].forEach((side, si) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const pan = ctx.createStereoPanner();
      pan.pan.value = side === "left" ? -1 : 1;
      osc.type = "sine";
      osc.frequency.value = base + (side === "right" ? ether.beatHz : 0);
      g.gain.value = 0.12;
      osc.connect(g); g.connect(pan); pan.connect(master);
      osc.start();
      nodes.push(osc);
    });
  }

  // ── Golden ratio overtone (1.618×)
  const golden = ctx.createOscillator();
  const goldenG = ctx.createGain();
  golden.type = "triangle";
  golden.frequency.value = Math.min(ether.hz * 1.618, 3500);
  goldenG.gain.value = 0.04;
  golden.connect(goldenG); goldenG.connect(master);
  golden.start();
  nodes.push(golden);

  // ── Sub-bass quantum anchor (always 7.83 Hz Schumann)
  const schumann = ctx.createOscillator();
  const schumannG = ctx.createGain();
  schumann.type = "sine";
  schumann.frequency.value = 7.83;
  schumannG.gain.value = 0.07;
  schumann.connect(schumannG); schumannG.connect(master);
  schumann.start();
  nodes.push(schumann);

  // ── Nature quantum field (Amazon + ocean = primal cellular safety)
  const natBuf = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = natBuf.getChannelData(c);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      d[i] = (last + 0.02 * w) / 1.02;
      last = d[i];
    }
  }
  const natSrc = ctx.createBufferSource();
  natSrc.buffer = natBuf; natSrc.loop = true;
  const natF = ctx.createBiquadFilter();
  natF.type = "lowpass"; natF.frequency.value = 300;
  const natG = ctx.createGain(); natG.gain.value = 0.06;
  natSrc.connect(natF); natF.connect(natG); natG.connect(master);
  natSrc.start();
  nodes.push(natSrc);

  return { nodes, master };
}

function buildFullVortex(ctx) {
  // All 9 ethers simultaneously — the complete quantum healing field
  const allNodes = [];
  const weights = [0.07, 0.06, 0.07, 0.08, 0.07, 0.06, 0.07, 0.07, 0.05];

  NINE_ETHERS.forEach((ether, i) => {
    const { nodes, master } = buildEtherFrequency(ctx, ether, weights[i]);
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.cos((i / NINE_ETHERS.length) * Math.PI * 2) * 0.35;
    master.disconnect();
    master.connect(panner);
    panner.connect(ctx.destination);
    allNodes.push(...nodes);
  });

  // Vortex spiral: 9 ascending Fibonacci tones
  [111, 144, 233, 285, 377, 432, 528, 610, 963].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = Math.min(f, 1500);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 3 + i * 0.4);
    osc.connect(g); g.connect(ctx.destination);
    osc.start();
    allNodes.push(osc);
  });

  // Deep quantum bass (9 Hz theta — the gateway frequency)
  const quantum = ctx.createOscillator();
  const qGain = ctx.createGain();
  quantum.type = "sine";
  quantum.frequency.value = 9;
  qGain.gain.value = 0.08;
  quantum.connect(qGain); qGain.connect(ctx.destination);
  quantum.start();
  allNodes.push(quantum);

  return { nodes: allNodes };
}

const VORTEX_SEQUENCE_TOTAL = NINE_ETHERS.reduce((a, e) => a + e.duration, 0);

export default function QuantumVortex() {
  const [mode, setMode] = useState(null);
  const [activeEther, setActiveEther] = useState(null);
  const [vortexStep, setVortexStep] = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showScience, setShowScience] = useState(null);
  const [breathPhase, setBreathPhase] = useState("in");
  const [vortexAngle, setVortexAngle] = useState(0);
  const [activateTarget, setActivateTarget] = useState("human"); // human | animal | all

  const audioCtxRef = useRef(null);
  const activeRef = useRef(null);
  const timerRef = useRef(null);
  const totalTimerRef = useRef(null);
  const breathTimerRef = useRef(null);
  const vortexTimerRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const stopAll = useCallback(() => {
    if (activeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const ns = activeRef.current.nodes || [];
      ns.forEach(n => {
        try {
          if (n.gain) n.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
        } catch {}
        setTimeout(() => { try { n.stop?.(); } catch {} }, 2700);
      });
      if (activeRef.current.master) {
        try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5); } catch {}
      }
      activeRef.current = null;
    }
    clearInterval(timerRef.current);
    clearInterval(totalTimerRef.current);
    clearInterval(breathTimerRef.current);
    clearInterval(vortexTimerRef.current);
    setPlaying(false);
    setMode(null);
    setActiveEther(null);
    setVortexStep(0);
    setStepElapsed(0);
    setTotalElapsed(0);
    setCompleted(false);
  }, []);

  const startBreath = () => {
    setBreathPhase("in");
    let phase = "in";
    let count = 0;
    breathTimerRef.current = setInterval(() => {
      count++;
      if (phase === "in" && count >= 4) { phase = "hold"; count = 0; setBreathPhase("hold"); }
      else if (phase === "hold" && count >= 4) { phase = "out"; count = 0; setBreathPhase("out"); }
      else if (phase === "out" && count >= 6) { phase = "in"; count = 0; setBreathPhase("in"); }
    }, 1000);
  };

  const startVortexSpin = () => {
    vortexTimerRef.current = setInterval(() => {
      setVortexAngle(a => (a + 0.5) % 360);
    }, 16);
  };

  const playSingle = (ether) => {
    stopAll();
    const ctx = getCtx();
    const result = buildEtherFrequency(ctx, ether, 0.22);
    activeRef.current = result;
    setMode("single");
    setActiveEther(ether);
    setPlaying(true);
    startBreath();
    startVortexSpin();
    let e = 0;
    totalTimerRef.current = setInterval(() => { e++; setTotalElapsed(e); }, 1000);
  };

  const playVortex = () => {
    stopAll();
    const ctx = getCtx();
    const result = buildFullVortex(ctx);
    activeRef.current = result;
    setMode("vortex");
    setPlaying(true);
    setActiveEther(null);
    startBreath();
    startVortexSpin();
    let e = 0;
    totalTimerRef.current = setInterval(() => { e++; setTotalElapsed(e); }, 1000);
  };

  const playSequence = () => {
    stopAll();
    const ctx = getCtx();
    let stepIdx = 0;
    let stepCount = 0;

    const playStep = (idx) => {
      if (idx >= NINE_ETHERS.length) {
        setPlaying(false);
        setCompleted(true);
        setMode(null);
        clearInterval(totalTimerRef.current);
        clearInterval(breathTimerRef.current);
        clearInterval(vortexTimerRef.current);
        return;
      }
      const ether = NINE_ETHERS[idx];
      setVortexStep(idx);
      setActiveEther(ether);
      setStepElapsed(0);
      stepCount = 0;

      if (activeRef.current?.nodes) {
        const old = activeRef.current.nodes;
        if (activeRef.current.master) {
          try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); } catch {}
        }
        setTimeout(() => old.forEach(n => { try { n.stop?.(); } catch {} }), 2200);
      }

      const result = buildEtherFrequency(ctx, ether, 0.2);
      activeRef.current = result;

      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        stepCount++;
        setStepElapsed(stepCount);
        if (stepCount >= ether.duration) {
          clearInterval(timerRef.current);
          playStep(idx + 1);
        }
      }, 1000);
    };

    setMode("sequence");
    setPlaying(true);
    setCompleted(false);
    startBreath();
    startVortexSpin();
    let te = 0;
    totalTimerRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
    playStep(0);
  };

  useEffect(() => () => stopAll(), []);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const currentEther = NINE_ETHERS[vortexStep];

  const breathColors = { in: "#86efac", hold: "#fbbf24", out: "#c4b5fd" };
  const breathLabels = { in: "Breathe In", hold: "Hold & Receive", out: "Release & Clear" };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-22"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/20 via-[#030712]/55 to-[#030712]" />

        {/* Vortex rings */}
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 80 + i * 70,
              height: 80 + i * 70,
              borderColor: NINE_ETHERS[i].glow + (playing ? "30" : "12"),
              top: "50%", left: "50%",
              transform: `translate(-50%,-50%) rotate(${vortexAngle + i * 40}deg)`
            }}
            animate={playing ? { opacity: [0.3, 0.8, 0.3] } : { opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <motion.div
              className="text-7xl mb-5"
              animate={playing
                ? { scale: [1, 1.3, 1], rotate: [0, 360], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] }
                : { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }
              }
              transition={playing
                ? { duration: 6, repeat: Infinity, ease: "linear" }
                : { duration: 4, repeat: Infinity }
              }
            >✦</motion.div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-rose-300 via-amber-300 via-emerald-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                Quantum Healing Vortex
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-3 font-light max-w-3xl mx-auto">
              9 Etheric dimensions of sound — cellular irradiation, quantum disentanglement, trauma deletion and vortex healing across all spheres of humanity and the animal kingdom.
            </p>
            <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8 leading-relaxed">
              Parasites · Diseases · Trauma · Knots · Masses · Inherited wounds · Mental programs · Spiritual interference — all irradiated, dissolved and transmuted through the 9 ethers.
            </p>
          </motion.div>

          {/* Target Selector */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex justify-center gap-3 mb-6">
            {[
              { id: "human", label: "Humans", icon: "🧍" },
              { id: "animal", label: "Animals", icon: "🐾" },
              { id: "all", label: "All Beings", icon: "🌍" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActivateTarget(t.id)}
                className="px-4 py-2 rounded-full text-sm font-bold border transition-all"
                style={{
                  borderColor: activateTarget === t.id ? "#e879f9" : "#ffffff20",
                  background: activateTarget === t.id ? "#e879f920" : "transparent",
                  color: activateTarget === t.id ? "#e879f9" : "#ffffff60"
                }}
              >{t.icon} {t.label}</button>
            ))}
          </motion.div>

          {/* Main buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4">
            {!playing ? (
              <>
                <motion.button
                  onClick={playVortex}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full font-black text-xl text-black shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #e879f9)", boxShadow: "0 0 80px #e879f940" }}
                >
                  ✦ Open The Vortex
                </motion.button>
                <motion.button
                  onClick={playSequence}
                  whileHover={{ scale: 1.04 }}
                  className="px-8 py-5 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors"
                >
                  🌀 9 Ether Journey
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={stopAll}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 rounded-full font-black text-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                ⏹ Close Vortex · {fmt(totalElapsed)}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* BREATH GUIDE */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-4 flex items-center justify-center gap-5 border"
              style={{ borderColor: breathColors[breathPhase] + "30", background: breathColors[breathPhase] + "08" }}
            >
              <motion.div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: breathColors[breathPhase] }}
                animate={
                  breathPhase === "in" ? { scale: 1.35 } :
                  breathPhase === "hold" ? { scale: 1.35 } :
                  { scale: 0.8 }
                }
                transition={{ duration: breathPhase === "out" ? 6 : 4, ease: "easeInOut" }}
              >
                <span className="text-xl">{breathPhase === "in" ? "☽" : breathPhase === "hold" ? "◎" : "○"}</span>
              </motion.div>
              <div>
                <div className="font-black text-base" style={{ color: breathColors[breathPhase] }}>
                  {breathLabels[breathPhase]}
                </div>
                <div className="text-white/35 text-xs">4-4-6 quantum breath · Allow the frequencies to enter</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEQUENCE PROGRESS */}
        <AnimatePresence>
          {(mode === "sequence") && playing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 rounded-2xl p-6 border"
              style={{ borderColor: currentEther?.glow + "50", background: currentEther?.glow + "0c" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs tracking-widest text-white/30 mb-1">ETHER {vortexStep + 1} OF 9</div>
                  <div className="text-2xl font-black" style={{ color: currentEther?.color }}>
                    {currentEther?.icon} {currentEther?.name}
                  </div>
                  <div className="text-white/50 text-sm">{currentEther?.action} — {currentEther?.target}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white/25">{fmt(stepElapsed)}</div>
                  <div className="text-xs text-white/25">of {currentEther?.duration}s</div>
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: currentEther?.glow,
                    width: `${(stepElapsed / (currentEther?.duration || 20)) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex gap-1.5 mb-4">
                {NINE_ETHERS.map((e, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
                    style={{ background: i < vortexStep ? e.glow : i === vortexStep ? e.glow + "80" : "#ffffff12" }} />
                ))}
              </div>
              {currentEther?.affirmation && (
                <div className="text-center italic text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                  "{currentEther.affirmation}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL VORTEX VISUAL */}
        <AnimatePresence>
          {mode === "vortex" && playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center mb-12"
            >
              <div className="relative w-80 h-80">
                {NINE_ETHERS.map((ether, i) => {
                  const angle = ((i / NINE_ETHERS.length) * Math.PI * 2) - Math.PI / 2 + (vortexAngle * Math.PI / 180);
                  const r = 108;
                  const x = Math.cos(angle) * r + 160;
                  const y = Math.sin(angle) * r + 160;
                  return (
                    <motion.div
                      key={ether.id}
                      className="absolute w-12 h-12 rounded-full flex items-center justify-center text-lg border"
                      style={{
                        left: x - 24, top: y - 24,
                        background: ether.glow + "18",
                        borderColor: ether.glow + "60"
                      }}
                      animate={{
                        boxShadow: [`0 0 8px ${ether.glow}40`, `0 0 22px ${ether.glow}80`, `0 0 8px ${ether.glow}40`]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.22 }}
                    >{ether.icon}</motion.div>
                  );
                })}
                {/* Centre vortex core */}
                <motion.div
                  className="absolute inset-0 m-auto w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, #e879f925, #8b5cf615, transparent)",
                    border: "2px solid #e879f940"
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: ["0 0 20px #e879f930","0 0 70px #e879f970","0 0 20px #e879f930"]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <motion.div className="text-4xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>✦</motion.div>
                </motion.div>
                {/* SVG spokes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {NINE_ETHERS.map((ether, i) => {
                    const angle = ((i / NINE_ETHERS.length) * Math.PI * 2) - Math.PI / 2 + (vortexAngle * Math.PI / 180);
                    const r = 108;
                    const x = Math.cos(angle) * r + 160;
                    const y = Math.sin(angle) * r + 160;
                    return (
                      <motion.line key={i} x1="160" y1="160" x2={x} y2={y}
                        stroke={ether.glow} strokeWidth="1"
                        animate={{ opacity: [0.1, 0.45, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPLETION */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12 rounded-3xl p-12 text-center border border-violet-400/20"
              style={{ background: "linear-gradient(135deg, #e879f910, #fbbf2408, #22c55e08)" }}
            >
              <motion.div className="text-7xl mb-5"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>✦</motion.div>
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-rose-300 via-amber-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
                The Vortex Has Spoken
              </h2>
              <p className="text-white/60 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                All 9 etheric dimensions have been traversed. Parasites, diseases, trauma, knots, masses — irradiated. DNA repaired. Spirit reactivated. Soul unified. The quantum field has recorded this healing across all timelines and transmitted it to all connected beings.
              </p>
              <p className="text-white/30 italic text-sm mb-8">
                "The healing you received today is not yours alone. It radiates outward through the quantum field to every being you love."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={playVortex}
                  className="px-8 py-4 rounded-full font-black text-lg text-black"
                  style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #e879f9)" }}>
                  ✦ Open Vortex Again
                </button>
                <button onClick={playSequence}
                  className="px-8 py-4 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                  🌀 9 Ether Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THE 9 ETHERS */}
        <div className="mb-14">
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">✦ The 9 Etheric Dimensions</h2>
          <p className="text-white/40 text-center text-sm mb-10">Each ether targets a specific layer of dis-ease — play individually or traverse all 9 in the full journey</p>

          <div className="space-y-4">
            {NINE_ETHERS.map((ether, i) => {
              const isActive = (mode === "single" && activeEther?.id === ether.id && playing) ||
                               (mode === "sequence" && vortexStep === i && playing);
              return (
                <motion.div
                  key={ether.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border overflow-hidden transition-all"
                  style={{
                    borderColor: isActive ? ether.glow + "70" : "#ffffff12",
                    background: isActive ? ether.glow + "0d" : "#ffffff04",
                    boxShadow: isActive ? `0 0 40px ${ether.glow}25` : "none"
                  }}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Ether number */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 mt-1"
                        style={{ background: ether.glow + "20", color: ether.color, border: `1px solid ${ether.glow}40` }}
                      >{ether.number}</div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                          <div>
                            <div className="font-black text-base" style={{ color: isActive ? ether.color : "#fff" }}>
                              {ether.icon} {ether.name.split("—")[1]?.trim() || ether.name}
                            </div>
                            <div className="text-white/45 text-xs italic">{ether.subtitle}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                              className="text-xs px-2.5 py-1 rounded-full font-black tracking-wider"
                              style={{ background: ether.glow + "20", color: ether.color }}
                            >{ether.action}</span>
                            <button
                              onClick={() => isActive && mode === "single" ? stopAll() : playSingle(ether)}
                              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
                              style={{
                                background: isActive ? ether.glow : ether.glow + "20",
                                color: isActive ? "#000" : ether.color,
                                border: isActive ? "none" : `1px solid ${ether.glow}40`
                              }}
                            >{isActive && mode === "single" ? "⏸" : "▶"}</button>
                          </div>
                        </div>

                        {/* Frequencies */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full border border-white/15 text-white/40">{ether.hz} Hz</span>
                          {ether.subHz > 0 && <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/30">{ether.subHz} Hz sub</span>}
                          {ether.beatHz > 0 && <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/30">{ether.beatHz} Hz beat</span>}
                        </div>

                        {/* Target */}
                        <div className="text-xs text-white/50 mb-2">
                          <span className="text-white/25">Target: </span>{ether.target}
                        </div>

                        {/* Affirmation */}
                        <div className="text-xs italic text-white/40 border-l-2 pl-2 leading-relaxed mb-2"
                          style={{ borderColor: ether.glow + "40" }}>
                          "{ether.affirmation}"
                        </div>

                        {/* Science toggle */}
                        <button
                          onClick={() => setShowScience(showScience === ether.id ? null : ether.id)}
                          className="text-xs text-white/25 hover:text-white/55 transition-colors"
                        >🔬 {showScience === ether.id ? "Hide" : "Quantum Science"}</button>

                        <AnimatePresence>
                          {showScience === ether.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 pt-3 border-t border-white/8"
                            >
                              <p className="text-white/50 text-xs leading-relaxed">{ether.quantum}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* QUANTUM SCIENCE EXPLAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 border border-white/10 mb-12"
          style={{ background: "#ffffff04" }}
        >
          <h2 className="text-2xl font-black mb-2 text-center">🔬 Quantum Cellular Healing — The Science</h2>
          <p className="text-white/40 text-center text-sm mb-8">How sound heals at a quantum level</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "⚛️", title: "Resonant Frequency Destruction", desc: "Royal Rife (1934) demonstrated that specific frequencies cause pathogenic organisms to oscillate until they shatter — the same principle as a singer breaking a glass. Each pathogen has a unique mortal oscillatory rate (MOR)." },
              { icon: "🧬", title: "Biophotonic Field Healing", desc: "Every cell emits coherent light (Fritz-Albert Popp). Disease appears as disordered biophotonic emission. Healing frequencies reorder this light field — restoring coherent, healthy photon communication between cells." },
              { icon: "🌀", title: "Quantum Entanglement Healing", desc: "Non-local healing is real: quantum entanglement means healing one system instantaneously affects all connected systems. When you receive this healing, the quantum field transmits it to all beings you are connected to." },
              { icon: "🔮", title: "Morphic Field Resonance", desc: "Rupert Sheldrake's morphic resonance theory: healing patterns established in the field become available to all. As more people use these frequencies, the healing becomes easier and deeper for all who follow." },
              { icon: "💊", title: "Cymatics — Sound as Structure", desc: "Hans Jenny proved sound creates physical structure in matter. Healing frequencies physically reorganise disordered biological structures — knots, masses and congestion literally restructure at the sound's command." },
              { icon: "🌍", title: "Planetary Healing Field", desc: "The Schumann Resonance (7.83 Hz) is the Earth's own frequency — and a carrier wave. Healing done in coherence with the Schumann field is not individual: it enters the planetary electromagnetic field and circulates globally." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-5 border border-white/8"
                style={{ background: "#ffffff04" }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-sm mb-2 text-white/80">{item.title}</div>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CLOSING VORTEX INVOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border border-violet-500/20"
          style={{ background: "linear-gradient(135deg, #e879f908, #fbbf2406, #22c55e06)" }}
        >
          <motion.div className="text-5xl mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>✦</motion.div>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-rose-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
            The Vortex Awaits
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto leading-relaxed mb-3">
            You are not broken. You are not diseased. You are a quantum field of infinite potential temporarily experiencing interference. These 9 ethers remove the interference — and restore the signal of your original, perfect, luminous nature.
          </p>
          <p className="text-white/35 italic text-sm mb-8 max-w-xl mx-auto">
            "This healing is not for you alone. At the quantum level, every frequency you receive today ripples outward — to your family, your animals, your community, your ancestral line. You are healing the whole."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={playVortex}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #3b82f6, #e879f9)", boxShadow: "0 0 50px #e879f930" }}
            >✦ Open The Vortex</motion.button>
            <motion.button
              onClick={playSequence}
              whileHover={{ scale: 1.04 }}
              className="px-8 py-4 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors"
            >🌀 9 Ether Journey</motion.button>
          </div>
          <div className="mt-8 text-white/20 text-xs">
            🎧 Headphones required for full quantum effect · 7.83 Hz Schumann anchor present in all ethers · Safe for humans and animals
          </div>
        </motion.div>

      </div>
    </div>
  );
}

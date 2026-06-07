import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/544bd6a37_generated_image.png";

// ─────────────────────────────────────────────────────────────
//  THE GROWTH SOUND ARCHITECTURE
//  Each layer targets a specific dimension of human growth
// ─────────────────────────────────────────────────────────────
const GROWTH_LAYERS = [
  {
    id: "physical",
    name: "Physical Growth",
    icon: "🧬",
    color: "#ef4444",
    hz: 285,
    subHz: 111,
    beatHz: 7.83,
    desc: "285 Hz — tissue regeneration & cellular renewal · 111 Hz euphoria triggers natural growth hormone",
    affirmation: "I am rebuilding stronger, healthier, and more vital with every breath",
    waveform: "sine",
  },
  {
    id: "mental",
    name: "Mental Growth",
    icon: "🧠",
    color: "#60a5fa",
    hz: 40,
    subHz: 14,
    beatHz: 10,
    desc: "40 Hz gamma — whole-brain coherence & neuroplasticity · 14 Hz beta focus activation",
    affirmation: "My mind expands beyond all previous limits. New pathways open effortlessly",
    waveform: "triangle",
  },
  {
    id: "emotional",
    name: "Emotional Growth",
    icon: "💗",
    color: "#f472b6",
    hz: 639,
    subHz: 528,
    beatHz: 3.5,
    desc: "639 Hz heart harmony · 528 Hz love miracle frequency — dissolves fear and opens full feeling",
    affirmation: "I feel everything fully and beautifully. My emotional range is my greatest gift",
    waveform: "sine",
  },
  {
    id: "spiritual",
    name: "Spiritual Growth",
    icon: "✨",
    color: "#a78bfa",
    hz: 963,
    subHz: 852,
    beatHz: 7,
    desc: "963 Hz crown activation · 852 Hz third eye · theta 7 Hz deep intuition gateway",
    affirmation: "I expand into infinite consciousness. My spirit grows beyond all boundaries",
    waveform: "sine",
  },
  {
    id: "nature",
    name: "Nature Alignment",
    icon: "🌿",
    color: "#34d399",
    hz: 432,
    subHz: 7.83,
    beatHz: 0,
    desc: "432 Hz universal tuning · 7.83 Hz Schumann resonance — synchronise with the living Earth",
    affirmation: "I am one with the natural world. Nature's intelligence flows through every cell",
    waveform: "sine",
  },
  {
    id: "abundance",
    name: "Abundance Growth",
    icon: "💎",
    color: "#fbbf24",
    hz: 888,
    subHz: 417,
    beatHz: 4,
    desc: "888 Hz infinite abundance · 417 Hz clears all blocks — theta 4 Hz deep reprogramming",
    affirmation: "I grow into my greatest prosperity. Abundance is my natural state of being",
    waveform: "sine",
  },
];

// The Master Growth Sequence — all layers combined
const MASTER_SEQUENCE = [
  { name: "Awaken",    duration: 15, hz: 285,  desc: "Cells begin activating",            color: "#ef4444" },
  { name: "Open",      duration: 15, hz: 528,  desc: "Heart and DNA unlock",              color: "#f472b6" },
  { name: "Expand",    duration: 15, hz: 639,  desc: "Emotional field widens",            color: "#f472b6" },
  { name: "Rise",      duration: 15, hz: 432,  desc: "Align with universal growth",       color: "#34d399" },
  { name: "Ignite",    duration: 15, hz: 40,   desc: "Gamma — whole brain coherence",     color: "#60a5fa" },
  { name: "Magnetise", duration: 15, hz: 888,  desc: "Abundance codes activate",          color: "#fbbf24" },
  { name: "Ascend",    duration: 15, hz: 963,  desc: "Crown opens — infinite potential",  color: "#a78bfa" },
  { name: "Become",    duration: 15, hz: 1111, desc: "Manifestation portal — you arrive", color: "#ffffff" },
];

// ─────────────────────────────────────────────────────────────
//  AUDIO ENGINE
// ─────────────────────────────────────────────────────────────
function buildGrowthLayer(ctx, layer, masterVolume = 0.22) {
  const nodes = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(masterVolume, ctx.currentTime + 3);
  master.connect(ctx.destination);

  // Primary frequency
  const osc1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  osc1.type = layer.waveform;
  osc1.frequency.value = Math.min(layer.hz, 1200);
  g1.gain.value = 0.6;
  osc1.connect(g1); g1.connect(master);
  osc1.start();
  nodes.push(osc1);

  // Sub harmonic (lower octave)
  if (layer.subHz > 0) {
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = Math.min(layer.subHz, 800);
    g2.gain.value = 0.3;
    osc2.connect(g2); g2.connect(master);
    osc2.start();
    nodes.push(osc2);
  }

  // Binaural beat layer (left/right stereo)
  if (layer.beatHz > 0) {
    const leftOsc = ctx.createOscillator();
    const leftGain = ctx.createGain();
    const leftPan = ctx.createStereoPanner();
    leftPan.pan.value = -1;
    leftOsc.type = "sine";
    leftOsc.frequency.value = 100;
    leftGain.gain.value = 0.12;
    leftOsc.connect(leftGain); leftGain.connect(leftPan); leftPan.connect(master);
    leftOsc.start();
    nodes.push(leftOsc);

    const rightOsc = ctx.createOscillator();
    const rightGain = ctx.createGain();
    const rightPan = ctx.createStereoPanner();
    rightPan.pan.value = 1;
    rightOsc.type = "sine";
    rightOsc.frequency.value = 100 + layer.beatHz;
    rightGain.gain.value = 0.12;
    rightOsc.connect(rightGain); rightGain.connect(rightPan); rightPan.connect(master);
    rightOsc.start();
    nodes.push(rightOsc);
  }

  // Overtone shimmer (gives it life and contagious brightness)
  const shimOsc = ctx.createOscillator();
  const shimGain = ctx.createGain();
  shimOsc.type = "triangle";
  shimOsc.frequency.value = Math.min(layer.hz * 1.618, 3000); // golden ratio overtone
  shimGain.gain.value = 0.06;
  shimOsc.connect(shimGain); shimGain.connect(master);
  shimOsc.start();
  nodes.push(shimOsc);

  // Nature undertone — Amazon pulse beneath everything
  const natBuf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  const nd = natBuf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < nd.length; i++) {
    const w = Math.random() * 2 - 1;
    nd[i] = (last + 0.02 * w) / 1.02;
    last = nd[i];
  }
  const natSrc = ctx.createBufferSource();
  natSrc.buffer = natBuf; natSrc.loop = true;
  const natFilter = ctx.createBiquadFilter();
  natFilter.type = "bandpass"; natFilter.frequency.value = 250; natFilter.Q.value = 0.4;
  const natGain = ctx.createGain(); natGain.gain.value = 0.07;
  natSrc.connect(natFilter); natFilter.connect(natGain); natGain.connect(master);
  natSrc.start();
  nodes.push(natSrc);

  return { nodes, master };
}

function buildMasterGrowthSound(ctx) {
  // ALL 6 growth dimensions layered simultaneously at lower volumes
  const allNodes = [];
  const allMasters = [];

  GROWTH_LAYERS.forEach((layer, i) => {
    const { nodes, master } = buildGrowthLayer(ctx, layer, 0.08);
    // Slight pan spread for spatial immersion
    const panner = ctx.createStereoPanner();
    panner.pan.value = (i % 2 === 0 ? -1 : 1) * 0.3 * (i / GROWTH_LAYERS.length);
    master.disconnect();
    master.connect(panner);
    panner.connect(ctx.destination);
    allNodes.push(...nodes);
    allMasters.push(master);
  });

  // The contagious element: a rising spiral of frequencies (fibonacci)
  const fibFreqs = [111, 144, 233, 377, 432, 528, 610];
  fibFreqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3 + i * 0.5);
    osc.connect(g); g.connect(ctx.destination);
    osc.start();
    allNodes.push(osc);
  });

  // Ocean/Amazon undertone
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
  const natFilter = ctx.createBiquadFilter();
  natFilter.type = "lowpass"; natFilter.frequency.value = 300;
  const natGain = ctx.createGain(); natGain.gain.value = 0.08;
  natSrc.connect(natFilter); natFilter.connect(natGain); natGain.connect(ctx.destination);
  natSrc.start();
  allNodes.push(natSrc);

  return { nodes: allNodes, masters: allMasters };
}

// ─────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────
export default function GrowthSound() {
  const [mode, setMode] = useState(null); // null | 'single' | 'master' | 'sequence'
  const [activeLayer, setActiveLayer] = useState(null);
  const [sequenceStep, setSequenceStep] = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pulseLevel, setPulseLevel] = useState(0);
  const [showAffirmation, setShowAffirmation] = useState(null);
  const [completed, setCompleted] = useState(false);

  const audioCtxRef = useRef(null);
  const activeRef = useRef(null);
  const timerRef = useRef(null);
  const totalTimerRef = useRef(null);
  const seqTimerRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const stopAll = useCallback(() => {
    if (activeRef.current) {
      const ctx = audioCtxRef.current;
      const stopNode = (n) => {
        try {
          if (n.gain) { n.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5); }
        } catch {}
        setTimeout(() => { try { n.stop?.(); } catch {} }, 1600);
      };
      if (activeRef.current.nodes) activeRef.current.nodes.forEach(stopNode);
      if (activeRef.current.masters) activeRef.current.masters.forEach(m => {
        try { m.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5); } catch {}
      });
      activeRef.current = null;
    }
    clearInterval(timerRef.current);
    clearInterval(totalTimerRef.current);
    clearTimeout(seqTimerRef.current);
    setPlaying(false);
    setMode(null);
    setActiveLayer(null);
    setSequenceStep(0);
    setStepElapsed(0);
    setTotalElapsed(0);
    setShowAffirmation(null);
    setCompleted(false);
  }, []);

  const playSingleLayer = (layer) => {
    stopAll();
    const ctx = getCtx();
    const { nodes, master } = buildGrowthLayer(ctx, layer, 0.25);
    activeRef.current = { nodes, master };
    setMode("single");
    setActiveLayer(layer);
    setPlaying(true);
    setTimeout(() => setShowAffirmation(layer), 4000);
    let e = 0;
    totalTimerRef.current = setInterval(() => { e++; setTotalElapsed(e); }, 1000);
  };

  const playMaster = () => {
    stopAll();
    const ctx = getCtx();
    const result = buildMasterGrowthSound(ctx);
    activeRef.current = result;
    setMode("master");
    setPlaying(true);
    let e = 0;
    totalTimerRef.current = setInterval(() => {
      e++;
      setTotalElapsed(e);
      setPulseLevel(Math.sin(e * 0.3) * 0.5 + 0.5);
    }, 1000);
    // Cycle affirmations
    let idx = 0;
    const cycleAff = () => {
      setShowAffirmation(GROWTH_LAYERS[idx % GROWTH_LAYERS.length]);
      idx++;
      seqTimerRef.current = setTimeout(cycleAff, 8000);
    };
    setTimeout(cycleAff, 3000);
  };

  const playSequence = () => {
    stopAll();
    const ctx = getCtx();
    let stepIdx = 0;
    let elapsed = 0;
    let stepElapsedCount = 0;

    const playStep = (idx) => {
      if (idx >= MASTER_SEQUENCE.length) {
        setPlaying(false);
        setCompleted(true);
        setMode(null);
        return;
      }
      const step = MASTER_SEQUENCE[idx];
      setSequenceStep(idx);
      setStepElapsed(0);
      stepElapsedCount = 0;

      // Stop previous
      if (activeRef.current?.nodes) {
        const ns = activeRef.current.nodes;
        try {
          if (activeRef.current.master) {
            activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
          }
        } catch {}
        setTimeout(() => ns.forEach(n => { try { n.stop?.(); } catch {} }), 1200);
      }

      // Build new tone for this step
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = Math.min(step.hz, 1500);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start();

      // Overtone
      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.value = Math.min(step.hz * 1.618, 3000);
      g2.gain.value = 0.05;
      osc2.connect(g2); g2.connect(ctx.destination);
      osc2.start();

      activeRef.current = { nodes: [osc, osc2], master: gain };

      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        stepElapsedCount++;
        setStepElapsed(stepElapsedCount);
        if (stepElapsedCount >= step.duration) {
          clearInterval(timerRef.current);
          playStep(idx + 1);
        }
      }, 1000);
    };

    setMode("sequence");
    setPlaying(true);
    setCompleted(false);
    let te = 0;
    totalTimerRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
    playStep(0);
  };

  useEffect(() => () => stopAll(), []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const currentStep = MASTER_SEQUENCE[sequenceStep];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/30 via-[#030712]/50 to-[#030712]" />

        {/* Orbiting rings */}
        {playing && [1,2,3,4,5].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 120 + i * 80,
              height: 120 + i * 80,
              borderColor: GROWTH_LAYERS[(i - 1) % GROWTH_LAYERS.length].color + "25",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)"
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.7, 0.3], rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div
              className="text-7xl mb-5"
              animate={playing ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >🌱</motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                The Growth Sound
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-3 font-light max-w-2xl mx-auto">
              A living sonic field engineered to awaken your drive to grow — mentally, physically, emotionally, spiritually — all at once.
            </p>
            <p className="text-sm text-white/40 max-w-xl mx-auto mb-8">
              Amazon forest undertone · Fibonacci frequency spiral · Binaural growth codes · Golden ratio harmonics · Nature ether blend
            </p>
          </motion.div>

          {/* Main play buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {!playing ? (
              <>
                <motion.button
                  onClick={playMaster}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full font-black text-xl text-black shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #34d399, #fbbf24, #a78bfa)", boxShadow: "0 0 60px #34d39940" }}
                >
                  ▶ Play The Growth Sound
                </motion.button>
                <motion.button
                  onClick={playSequence}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 rounded-full font-bold text-lg border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  🌀 Full Growth Journey (2 min)
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={stopAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-full font-black text-xl border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                ⏹ Stop · {formatTime(totalElapsed)}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* SEQUENCE PROGRESS */}
        <AnimatePresence>
          {mode === "sequence" && playing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-10 rounded-2xl p-6 border backdrop-blur-xl"
              style={{
                borderColor: currentStep?.color + "50",
                background: currentStep?.color + "10",
                boxShadow: `0 0 40px ${currentStep?.color}20`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-white/40 mb-1">STEP {sequenceStep + 1} OF {MASTER_SEQUENCE.length}</div>
                  <div className="text-2xl font-black" style={{ color: currentStep?.color }}>{currentStep?.name}</div>
                  <div className="text-white/55 text-sm">{currentStep?.desc} · {currentStep?.hz} Hz</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white/30">{formatTime(stepElapsed)}</div>
                  <div className="text-xs text-white/30">of {currentStep?.duration}s</div>
                </div>
              </div>
              {/* Step progress bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: currentStep?.color }}
                  animate={{ width: `${(stepElapsed / (currentStep?.duration || 15)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {/* All steps mini view */}
              <div className="flex gap-2">
                {MASTER_SEQUENCE.map((s, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 rounded-full transition-all duration-500"
                    style={{
                      background: i < sequenceStep ? s.color : i === sequenceStep ? s.color + "80" : "#ffffff15"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPLETION CARD */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-10 rounded-3xl p-10 text-center border border-white/20"
              style={{ background: "linear-gradient(135deg, #34d39910, #a78bfa10, #fbbf2410)" }}
            >
              <div className="text-6xl mb-4">🌟</div>
              <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-emerald-300 to-violet-300 bg-clip-text text-transparent">
                You Have Grown
              </h2>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">
                Your body, mind, emotions, and spirit have all been bathed in growth frequencies. Every cell has received the signal. You are not the same person who pressed play.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={playSequence}
                  className="px-8 py-3 rounded-full font-bold text-black"
                  style={{ background: "linear-gradient(135deg, #34d399, #a78bfa)" }}>
                  🔄 Play Again
                </button>
                <button onClick={playMaster}
                  className="px-8 py-3 rounded-full font-bold border border-white/30 text-white hover:bg-white/10 transition-colors">
                  ▶ Play Master Growth Sound
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIVE AFFIRMATION */}
        <AnimatePresence mode="wait">
          {showAffirmation && playing && (
            <motion.div
              key={showAffirmation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-10 rounded-2xl p-6 text-center border"
              style={{
                borderColor: showAffirmation.color + "40",
                background: showAffirmation.color + "0c",
              }}
            >
              <div className="text-3xl mb-2">{showAffirmation.icon}</div>
              <div className="text-sm font-semibold mb-2" style={{ color: showAffirmation.color }}>
                {showAffirmation.name} · {showAffirmation.hz} Hz
              </div>
              <p className="text-xl font-medium text-white/85 italic max-w-2xl mx-auto">
                "{showAffirmation.affirmation}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MASTER GROWTH VISUAL */}
        <AnimatePresence>
          {mode === "master" && playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mb-12"
            >
              <div className="relative w-72 h-72">
                {GROWTH_LAYERS.map((layer, i) => {
                  const angle = (i / GROWTH_LAYERS.length) * Math.PI * 2;
                  const r = 90;
                  const x = Math.cos(angle) * r + 136;
                  const y = Math.sin(angle) * r + 136;
                  return (
                    <motion.div
                      key={layer.id}
                      className="absolute w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        left: x - 24,
                        top: y - 24,
                        background: layer.color + "25",
                        border: `2px solid ${layer.color}60`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [`0 0 10px ${layer.color}40`, `0 0 30px ${layer.color}80`, `0 0 10px ${layer.color}40`]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {layer.icon}
                    </motion.div>
                  );
                })}
                {/* Centre orb */}
                <motion.div
                  className="absolute inset-0 m-auto w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: "radial-gradient(circle, #ffffff18, #ffffff04)", border: "2px solid #ffffff30" }}
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 360] }}
                  transition={{ scale: { duration: 2, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                >
                  🌱
                </motion.div>
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }}>
                  {GROWTH_LAYERS.map((layer, i) => {
                    const angle = (i / GROWTH_LAYERS.length) * Math.PI * 2;
                    const r = 90;
                    const x = Math.cos(angle) * r + 136;
                    const y = Math.sin(angle) * r + 136;
                    return (
                      <line key={i} x1="136" y1="136" x2={x} y2={y}
                        stroke={layer.color} strokeWidth="1" />
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INDIVIDUAL GROWTH LAYERS */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">
            ✦ Choose Your Growth Dimension
          </h2>
          <p className="text-white/40 text-center text-sm mb-8">
            Target a specific area of growth — or play them all together with the Master Sound above
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GROWTH_LAYERS.map((layer, i) => {
              const isActive = mode === "single" && activeLayer?.id === layer.id && playing;
              return (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-6 border transition-all"
                  style={{
                    borderColor: isActive ? layer.color + "80" : "#ffffff15",
                    background: isActive ? layer.color + "12" : "#ffffff05",
                    boxShadow: isActive ? `0 0 35px ${layer.color}30` : "none"
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="text-4xl"
                      animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >{layer.icon}</motion.div>
                    {isActive && (
                      <motion.div className="flex gap-0.5 items-end"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}>
                        {[3,5,4,6,3,4].map((h, j) => (
                          <div key={j} className="w-1 rounded-full" style={{ height: h * 2.5, background: layer.color }} />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <div className="font-black text-lg mb-1" style={{ color: isActive ? layer.color : "#fff" }}>
                    {layer.name}
                  </div>
                  <div className="text-xs text-white/40 mb-3 leading-relaxed">{layer.desc}</div>
                  <div className="text-xs italic text-white/30 mb-4 leading-relaxed border-l-2 pl-3" style={{ borderColor: layer.color + "50" }}>
                    "{layer.affirmation}"
                  </div>
                  <button
                    onClick={() => isActive ? stopAll() : playSingleLayer(layer)}
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{
                      background: isActive ? layer.color : layer.color + "20",
                      color: isActive ? "#000" : layer.color,
                      border: isActive ? "none" : `1px solid ${layer.color}40`
                    }}
                  >
                    {isActive ? "⏸ Playing…" : "▶ Play"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 border border-white/10 mb-12"
          style={{ background: "#ffffff05" }}
        >
          <h2 className="text-2xl font-black mb-6 text-center text-white/90">
            🔬 Why This Sound Is Contagious
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🧬", title: "Fibonacci Spiral", desc: "Frequencies ascend in the golden ratio — 111, 144, 233, 377, 432, 528. Your nervous system recognises this pattern as nature itself." },
              { icon: "🌿", title: "Amazon Undertone", desc: "Brown noise forest floor pulses beneath every layer. This ancient soundscape bypasses the mind and speaks directly to the primal brain." },
              { icon: "🎧", title: "Binaural Growth Codes", desc: "Left and right ear receive slightly different tones. Your brain creates the difference — literally generating growth frequencies inside your skull." },
              { icon: "✦", title: "Golden Ratio Overtones", desc: "Every primary frequency generates an overtone at 1.618× — the golden ratio found in DNA, galaxies, and human proportions. Deeply familiar at a cellular level." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-sm mb-2 text-white/80">{item.title}</div>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* THE FULL JOURNEY STEPS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">🌀 The Full Growth Journey</h2>
          <p className="text-white/40 text-center text-sm mb-8">8 steps · 2 minutes · Complete transformation across all dimensions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MASTER_SEQUENCE.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-4 border text-center"
                style={{
                  borderColor: step.color + "35",
                  background: step.color + "08"
                }}
              >
                <div className="text-xs font-bold mb-1 text-white/30">Step {i + 1}</div>
                <div className="font-black text-lg mb-0.5" style={{ color: step.color }}>{step.name}</div>
                <div className="text-xs text-white/35 mb-1">{step.hz} Hz</div>
                <div className="text-xs text-white/50">{step.desc}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <motion.button
              onClick={playSequence}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg, #34d399, #fbbf24, #a78bfa)", boxShadow: "0 0 50px #34d39935" }}
            >
              🌀 Begin The Journey
            </motion.button>
          </div>
        </motion.div>

        {/* USE HEADPHONES TIP */}
        <div className="text-center rounded-2xl p-5 border border-white/10 text-white/35 text-sm">
          🎧 Use headphones for the full binaural experience · Best played at medium-low volume · Safe to use daily
        </div>
      </div>
    </div>
  );
}

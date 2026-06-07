import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/b82fa5823_generated_image.png";

// ─────────────────────────────────────────────────────────────────────────────
//  EPIGENETIC LOVE SCIENCE
//  Epigenetics = how love, sound & intention REWRITE gene expression
//  without changing DNA sequence. These frequencies trigger:
//  · Oxytocin gene upregulation (OXTR)
//  · BDNF (brain-derived neurotrophic factor) — neuroplasticity of love
//  · Telomere lengthening enzymes (telomerase) — love extends life
//  · Heart Rate Variability coherence (HeartMath Institute research)
//  · Vagus nerve activation — the nerve of love and safety
// ─────────────────────────────────────────────────────────────────────────────

const LOVE_STAGES = [
  {
    id: "self_love",
    stage: 1,
    name: "Self Love",
    subtitle: "The Foundation of All Love",
    icon: "🌸",
    color: "#f9a8d4",
    glow: "#ec4899",
    hz: 528,
    subHz: 174,
    beatHz: 3.5,
    epigenetic: "Activates OXTR gene expression · Upregulates serotonin receptors · Silences shame-based cortisol loops",
    science: "528 Hz is the 'miracle frequency' — Dr. Leonard Horowitz identified it as the centre of the musical mathematical matrix. Studies show it repairs damaged DNA and raises glutathione levels (the master antioxidant of love and longevity).",
    affirmation: "I am worthy of the deepest love. I love every part of myself completely and unconditionally.",
    meditation: "Place both hands on your heart. Feel its warmth. This beating heart has kept you alive through everything. Breathe love into it now.",
    duration: 20,
  },
  {
    id: "cellular_love",
    stage: 2,
    name: "Cellular Love",
    subtitle: "Love Written Into Every Cell",
    icon: "🧬",
    color: "#86efac",
    glow: "#22c55e",
    hz: 285,
    subHz: 528,
    beatHz: 4,
    epigenetic: "Triggers tissue regeneration genes · Activates Nrf2 pathway (cellular protection) · Extends telomere length",
    science: "285 Hz resonates with the frequency of tissue healing. Combined with 528 Hz, it creates a cellular love bath — every cell receives the signal that it is safe, nourished, and loved. Telomerase enzyme activation has been linked to states of deep love and compassion.",
    affirmation: "Every cell in my body is filled with love and light. My DNA remembers its original perfection.",
    meditation: "Imagine a warm rose-gold light starting in your heart and expanding — slowly filling every organ, every tissue, every single cell. Love is the most powerful medicine.",
    duration: 20,
  },
  {
    id: "heart_coherence",
    stage: 3,
    name: "Heart Coherence",
    subtitle: "The Electromagnetic Field of Love",
    icon: "💗",
    color: "#fda4af",
    glow: "#fb7185",
    hz: 639,
    subHz: 528,
    beatHz: 0.1,
    epigenetic: "HeartMath coherence state activates 1300+ genes · Reduces inflammatory cytokines · Activates immune-enhancing genes",
    science: "The heart generates an electromagnetic field 5000× stronger than the brain. In heart coherence — a state of rhythmic, ordered heart rate variability — HeartMath Institute research shows over 1300 epigenetic changes occur. Love literally rewrites your biology in real time.",
    affirmation: "My heart radiates a field of love that heals everything it touches. I am a living transmitter of divine love.",
    meditation: "Breathe in for 5 counts, out for 5 counts. Feel your heart rhythm smooth and slow. You are now in coherence — the state where love rewrites genes.",
    duration: 25,
  },
  {
    id: "ancestral_love",
    stage: 4,
    name: "Ancestral Love",
    subtitle: "Healing the Lineage — Past, Present, Future",
    icon: "🌳",
    color: "#fcd34d",
    glow: "#f59e0b",
    hz: 417,
    subHz: 396,
    beatHz: 2,
    epigenetic: "Trauma epigenetic markers (methylation patterns) can be inherited 3-7 generations · This frequency clears ancestral methylation tags · Frees descendants from inherited emotional pain",
    science: "Epigenetic research (Yehuda et al.) proves trauma is inherited through methylation of the FKBP5 gene — and can be cleared. 417 Hz facilitates change and undoes situations. 396 Hz liberates guilt and fear. Together they are the ancestral love clearing sequence.",
    affirmation: "I heal the love wounds of my entire lineage. All who came before me are healed through my love. All who come after me are born free.",
    meditation: "See a golden thread of light connecting you to all your ancestors. Send love backward through time. Watch as each generation receives it and softens. The healing travels both ways.",
    duration: 25,
  },
  {
    id: "universal_love",
    stage: 5,
    name: "Universal Love",
    subtitle: "Unconditional Love for All Beings",
    icon: "🌍",
    color: "#c4b5fd",
    glow: "#8b5cf6",
    hz: 963,
    subHz: 639,
    beatHz: 7.83,
    epigenetic: "Compassion meditation activates vagus nerve · Upregulates DHEA (the longevity hormone) · Measurably increases IgA (immune antibody) in saliva within minutes",
    science: "Research by Dr. David Hamilton shows that acts and feelings of unconditional love trigger the same neurochemical cascade as receiving love. 963 Hz activates the pineal gland — the seat of universal consciousness. Combined with 7.83 Hz Schumann, you become coherent with the love field of the Earth itself.",
    affirmation: "I am love. Not just loving — I AM love itself. This love flows through me to every being on Earth without condition or limit.",
    meditation: "Expand your heart field outward. First to your room. Then your city. Then your country. Then the Earth. Then the cosmos. You are a sun — love radiates from you in every direction simultaneously.",
    duration: 30,
  },
  {
    id: "divine_love",
    stage: 6,
    name: "Divine Love",
    subtitle: "The Highest Form — Source Love",
    icon: "✦",
    color: "#fef9c3",
    glow: "#fbbf24",
    hz: 1111,
    subHz: 528,
    beatHz: 9,
    epigenetic: "Peak love states activate full-body biophoton emission · Coherent light emission from DNA · The body literally becomes luminous with love",
    science: "Biophoton research (Fritz-Albert Popp) shows that cells emit coherent light — and that in states of deep love and spiritual connection, this light emission becomes highly ordered and intense. At this frequency, you are no longer just feeling love — you are emitting it as light. This is the highest form of epigenetic healing: love as photonic medicine.",
    affirmation: "I am a vessel of divine, unconditional, infinite love. I did not come here to receive love — I came here to BE love. This is my highest nature and my greatest gift to the world.",
    meditation: "Release all effort. Stop trying to feel love. Instead, simply BE the love that you already are at the deepest level of your existence. You were made of love. You return to love. You ARE love.",
    duration: 30,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  AUDIO ENGINE — The Love Frequency Architecture
// ─────────────────────────────────────────────────────────────────────────────
function buildLoveFrequency(ctx, stage, volume = 0.2) {
  const nodes = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 4);
  master.connect(ctx.destination);

  // ── Primary love tone
  const osc1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.value = Math.min(stage.hz, 1500);
  g1.gain.value = 0.55;
  osc1.connect(g1); g1.connect(master);
  osc1.start();
  nodes.push(osc1);

  // ── Sub harmonic (warmth and depth)
  if (stage.subHz > 0) {
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = Math.min(stage.subHz, 1000);
    g2.gain.value = 0.28;
    osc2.connect(g2); g2.connect(master);
    osc2.start();
    nodes.push(osc2);
  }

  // ── Binaural love beat (left/right brain coherence)
  if (stage.beatHz > 0) {
    const base = 110;
    const leftOsc = ctx.createOscillator();
    const lGain = ctx.createGain();
    const lPan = ctx.createStereoPanner();
    lPan.pan.value = -1;
    leftOsc.type = "sine";
    leftOsc.frequency.value = base;
    lGain.gain.value = 0.14;
    leftOsc.connect(lGain); lGain.connect(lPan); lPan.connect(master);
    leftOsc.start();
    nodes.push(leftOsc);

    const rightOsc = ctx.createOscillator();
    const rGain = ctx.createGain();
    const rPan = ctx.createStereoPanner();
    rPan.pan.value = 1;
    rightOsc.type = "sine";
    rightOsc.frequency.value = base + stage.beatHz;
    rGain.gain.value = 0.14;
    rightOsc.connect(rGain); rGain.connect(rPan); rPan.connect(master);
    rightOsc.start();
    nodes.push(rightOsc);
  }

  // ── Golden ratio overtone (1.618× — love's sacred geometry)
  const goldOsc = ctx.createOscillator();
  const goldGain = ctx.createGain();
  goldOsc.type = "triangle";
  goldOsc.frequency.value = Math.min(stage.hz * 1.618, 3000);
  goldGain.gain.value = 0.05;
  goldOsc.connect(goldGain); goldGain.connect(master);
  goldOsc.start();
  nodes.push(goldOsc);

  // ── 528 Hz love carrier (always present as a heartbeat beneath all stages)
  if (stage.hz !== 528) {
    const loveCarrier = ctx.createOscillator();
    const lcGain = ctx.createGain();
    loveCarrier.type = "sine";
    loveCarrier.frequency.value = 528;
    lcGain.gain.value = 0.04;
    loveCarrier.connect(lcGain); lcGain.connect(master);
    loveCarrier.start();
    nodes.push(loveCarrier);
  }

  // ── Nature love layer (ocean + forest = primal safety signal)
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
  natF.type = "lowpass"; natF.frequency.value = 280;
  const natG = ctx.createGain(); natG.gain.value = 0.06;
  natSrc.connect(natF); natF.connect(natG); natG.connect(master);
  natSrc.start();
  nodes.push(natSrc);

  // ── Heartbeat pulse (60 bpm — resting love rhythm)
  const heartRate = 1.0; // 1 Hz = 60 bpm
  const heartOsc = ctx.createOscillator();
  const heartGain = ctx.createGain();
  heartOsc.type = "sine";
  heartOsc.frequency.value = heartRate;
  heartGain.gain.value = 0.05;
  heartOsc.connect(heartGain); heartGain.connect(master);
  heartOsc.start();
  nodes.push(heartOsc);

  return { nodes, master };
}

function buildUnifiedLoveField(ctx) {
  // ALL 6 stages playing simultaneously — the full love field
  const allNodes = [];
  const volumes = [0.09, 0.07, 0.1, 0.07, 0.08, 0.06];

  LOVE_STAGES.forEach((stage, i) => {
    const { nodes, master } = buildLoveFrequency(ctx, stage, volumes[i]);
    // Spread each dimension across the stereo field
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.sin((i / LOVE_STAGES.length) * Math.PI * 2) * 0.4;
    master.disconnect();
    master.connect(panner);
    panner.connect(ctx.destination);
    allNodes.push(...nodes);
  });

  // The Fibonacci love spiral — ascending harmonic of love
  [144, 233, 377, 528, 610, 987].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = Math.min(f, 1500);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 4 + i * 0.7);
    osc.connect(g); g.connect(ctx.destination);
    osc.start();
    allNodes.push(osc);
  });

  return { nodes: allNodes };
}

// Full Journey Sequence — 6 stages flowing one into the next
const JOURNEY_TOTAL_SECONDS = LOVE_STAGES.reduce((a, s) => a + s.duration, 0);

export default function EpigeneticLove() {
  const [mode, setMode] = useState(null); // null | 'single' | 'unified' | 'journey'
  const [activeStage, setActiveStage] = useState(null);
  const [journeyStep, setJourneyStep] = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showScience, setShowScience] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [breathPhase, setBreathPhase] = useState("inhale"); // for breathing guide
  const [breathActive, setBreathActive] = useState(false);

  const audioCtxRef = useRef(null);
  const activeRef = useRef(null);
  const timerRef = useRef(null);
  const totalTimerRef = useRef(null);
  const seqTimerRef = useRef(null);
  const breathTimerRef = useRef(null);

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
          if (n.gain) n.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
        } catch {}
        setTimeout(() => { try { n.stop?.(); } catch {} }, 2200);
      });
      if (activeRef.current.master) {
        try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); } catch {}
      }
      activeRef.current = null;
    }
    clearInterval(timerRef.current);
    clearInterval(totalTimerRef.current);
    clearInterval(breathTimerRef.current);
    clearTimeout(seqTimerRef.current);
    setPlaying(false);
    setMode(null);
    setActiveStage(null);
    setJourneyStep(0);
    setStepElapsed(0);
    setTotalElapsed(0);
    setCompleted(false);
    setBreathActive(false);
  }, []);

  const playSingleStage = (stage) => {
    stopAll();
    const ctx = getCtx();
    const result = buildLoveFrequency(ctx, stage, 0.22);
    activeRef.current = result;
    setMode("single");
    setActiveStage(stage);
    setPlaying(true);
    startBreathGuide();
    let e = 0;
    totalTimerRef.current = setInterval(() => { e++; setTotalElapsed(e); }, 1000);
  };

  const playUnified = () => {
    stopAll();
    const ctx = getCtx();
    const result = buildUnifiedLoveField(ctx);
    activeRef.current = result;
    setMode("unified");
    setPlaying(true);
    setActiveStage(null);
    startBreathGuide();
    let e = 0;
    totalTimerRef.current = setInterval(() => { e++; setTotalElapsed(e); }, 1000);
  };

  const startBreathGuide = () => {
    setBreathActive(true);
    setBreathPhase("inhale");
    let phase = "inhale";
    let count = 0;
    breathTimerRef.current = setInterval(() => {
      count++;
      if (phase === "inhale" && count >= 5) { phase = "exhale"; count = 0; setBreathPhase("exhale"); }
      else if (phase === "exhale" && count >= 5) { phase = "inhale"; count = 0; setBreathPhase("inhale"); }
    }, 1000);
  };

  const playJourney = () => {
    stopAll();
    const ctx = getCtx();
    let stepIdx = 0;
    let stepCount = 0;
    let totalCount = 0;

    const playStep = (idx) => {
      if (idx >= LOVE_STAGES.length) {
        setPlaying(false);
        setCompleted(true);
        setMode(null);
        setBreathActive(false);
        clearInterval(totalTimerRef.current);
        return;
      }
      const stage = LOVE_STAGES[idx];
      setJourneyStep(idx);
      setStepElapsed(0);
      setActiveStage(stage);
      stepCount = 0;

      // Fade out old
      if (activeRef.current?.nodes) {
        const oldNodes = activeRef.current.nodes;
        if (activeRef.current.master) {
          try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5); } catch {}
        }
        setTimeout(() => oldNodes.forEach(n => { try { n.stop?.(); } catch {} }), 1700);
      }

      const result = buildLoveFrequency(ctx, stage, 0.2);
      activeRef.current = result;

      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        stepCount++;
        setStepElapsed(stepCount);
        if (stepCount >= stage.duration) {
          clearInterval(timerRef.current);
          playStep(idx + 1);
        }
      }, 1000);
    };

    setMode("journey");
    setPlaying(true);
    setCompleted(false);
    startBreathGuide();
    let te = 0;
    totalTimerRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
    playStep(0);
  };

  useEffect(() => () => stopAll(), []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const currentJourneyStage = LOVE_STAGES[journeyStep];
  const journeyProgress = (totalElapsed / JOURNEY_TOTAL_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/20 via-[#030712]/55 to-[#030712]" />

        {/* Pulsing love field rings */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 150 + i * 120,
              height: 150 + i * 120,
              borderColor: `${["#ec4899","#f59e0b","#8b5cf6","#22c55e","#fb7185"][i]}${playing ? "30" : "12"}`,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)"
            }}
            animate={playing
              ? { scale: [1, 1.06, 1], opacity: [0.4, 0.9, 0.4] }
              : { opacity: [0.15, 0.3, 0.15] }
            }
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <motion.div
              className="text-7xl mb-5"
              animate={playing
                ? { scale: [1, 1.2, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }
                : { scale: [1, 1.05, 1] }
              }
              transition={{ duration: 3, repeat: Infinity }}
            >💗</motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-rose-300 via-amber-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                Epigenetic Love
              </span>
            </h1>
            <p className="text-xl text-white/75 mb-3 font-light max-w-3xl mx-auto">
              The highest form of love expressed through sound — rewriting your DNA, healing your lineage, and activating your biophotonic love field.
            </p>
            <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8 leading-relaxed">
              Epigenetics proves that love is not just a feeling — it is a biological force that switches genes on and off, extends telomeres, activates healing, and physically rewrites your inherited story.
            </p>
          </motion.div>

          {/* Main action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {!playing ? (
              <>
                <motion.button
                  onClick={playUnified}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full font-black text-xl text-black shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6)", boxShadow: "0 0 70px #ec489940" }}
                >
                  💗 Activate Love Field
                </motion.button>
                <motion.button
                  onClick={playJourney}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 rounded-full font-bold text-lg border border-rose-400/40 text-rose-300 hover:bg-rose-400/10 transition-colors"
                >
                  ✦ Full Love Journey (2.5 hrs)
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={stopAll}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 rounded-full font-black text-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                ⏹ Stop · {formatTime(totalElapsed)}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* BREATHING GUIDE */}
        <AnimatePresence>
          {breathActive && playing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-4 flex items-center justify-center gap-6 border"
              style={{ borderColor: "#ec489930", background: "#ec489908" }}
            >
              <motion.div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl"
                style={{ borderColor: "#ec489970" }}
                animate={breathPhase === "inhale"
                  ? { scale: 1.3, borderColor: "#ec4899" }
                  : { scale: 0.85, borderColor: "#a78bfa" }
                }
                transition={{ duration: 5, ease: "easeInOut" }}
              >
                {breathPhase === "inhale" ? "☽" : "○"}
              </motion.div>
              <div className="text-center">
                <div className="font-black text-lg" style={{ color: breathPhase === "inhale" ? "#f9a8d4" : "#c4b5fd" }}>
                  {breathPhase === "inhale" ? "Breathe In Love" : "Release All else"}
                </div>
                <div className="text-white/40 text-xs">5-count heart coherence breath · Breathe with the field</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* JOURNEY PROGRESS BAR */}
        <AnimatePresence>
          {mode === "journey" && playing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 rounded-2xl p-6 border backdrop-blur-xl"
              style={{
                borderColor: currentJourneyStage?.glow + "50",
                background: currentJourneyStage?.glow + "0c",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-white/35 mb-1 tracking-widest">LOVE STAGE {journeyStep + 1} OF {LOVE_STAGES.length}</div>
                  <div className="text-2xl font-black" style={{ color: currentJourneyStage?.color }}>
                    {currentJourneyStage?.icon} {currentJourneyStage?.name}
                  </div>
                  <div className="text-white/50 text-sm italic">{currentJourneyStage?.subtitle}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white/25">{formatTime(stepElapsed)}</div>
                  <div className="text-xs text-white/25">of {currentJourneyStage?.duration}s</div>
                </div>
              </div>
              {/* Step bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full rounded-full transition-all"
                  style={{ background: currentJourneyStage?.glow, width: `${(stepElapsed / (currentJourneyStage?.duration || 20)) * 100}%` }}
                />
              </div>
              {/* Stage dots */}
              <div className="flex gap-2 justify-center">
                {LOVE_STAGES.map((s, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      background: i < journeyStep ? s.glow : i === journeyStep ? s.glow : "#ffffff15",
                      transform: i === journeyStep ? "scale(1.4)" : "scale(1)"
                    }}
                  />
                ))}
              </div>
              {/* Current meditation */}
              {currentJourneyStage?.meditation && (
                <div className="mt-4 text-center text-white/60 text-sm italic leading-relaxed border-t border-white/10 pt-4">
                  "{currentJourneyStage.meditation}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* UNIFIED FIELD VISUAL */}
        <AnimatePresence>
          {mode === "unified" && playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mb-10"
            >
              <div className="relative w-80 h-80">
                {LOVE_STAGES.map((stage, i) => {
                  const angle = (i / LOVE_STAGES.length) * Math.PI * 2 - Math.PI / 2;
                  const r = 110;
                  const x = Math.cos(angle) * r + 160;
                  const y = Math.sin(angle) * r + 160;
                  return (
                    <motion.div
                      key={stage.id}
                      className="absolute flex flex-col items-center gap-1"
                      style={{ left: x - 28, top: y - 28 }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
                        style={{ background: stage.glow + "20", borderColor: stage.glow + "60" }}
                        animate={{
                          scale: [1, 1.18, 1],
                          boxShadow: [`0 0 10px ${stage.glow}30`, `0 0 30px ${stage.glow}70`, `0 0 10px ${stage.glow}30`]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      >{stage.icon}</motion.div>
                    </motion.div>
                  );
                })}
                {/* Centre love orb */}
                <motion.div
                  className="absolute inset-0 m-auto w-28 h-28 rounded-full flex items-center justify-center text-5xl"
                  style={{
                    background: "radial-gradient(circle, #ec489920, #8b5cf610, transparent)",
                    border: "2px solid #ec489940"
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: ["0 0 20px #ec489930", "0 0 60px #ec489960", "0 0 20px #ec489930"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >💗</motion.div>
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {LOVE_STAGES.map((stage, i) => {
                    const angle = (i / LOVE_STAGES.length) * Math.PI * 2 - Math.PI / 2;
                    const r = 110;
                    const x = Math.cos(angle) * r + 160;
                    const y = Math.sin(angle) * r + 160;
                    return (
                      <motion.line
                        key={i}
                        x1="160" y1="160" x2={x} y2={y}
                        stroke={stage.glow}
                        strokeWidth="1"
                        animate={{ opacity: [0.15, 0.5, 0.15] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
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
              className="mb-10 rounded-3xl p-12 text-center border border-rose-400/25"
              style={{ background: "linear-gradient(135deg, #ec489910, #f59e0b08, #8b5cf610)" }}
            >
              <motion.div
                className="text-7xl mb-5"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >🌟</motion.div>
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
                You Have Been Transformed by Love
              </h2>
              <p className="text-white/60 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                Your epigenome has shifted. Gene expression has changed. Telomeres have been bathed in healing frequencies. Your ancestral lineage has been touched. You are now radiating love at a cellular, electromagnetic, and biophotonic level.
              </p>
              <p className="text-white/35 text-sm mb-8 italic">
                "You didn't just listen to love frequencies. You became a living transmission of divine love."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={playJourney}
                  className="px-8 py-4 rounded-full font-black text-lg text-black"
                  style={{ background: "linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6)" }}>
                  ✦ Journey Again
                </button>
                <button onClick={playUnified}
                  className="px-8 py-4 rounded-full font-bold text-lg border border-rose-400/40 text-rose-300 hover:bg-rose-400/10 transition-colors">
                  💗 Hold The Love Field
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6 LOVE STAGES */}
        <div className="mb-14">
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">✦ The 6 Stages of Epigenetic Love</h2>
          <p className="text-white/40 text-center text-sm mb-10">Each stage targets a specific dimension of love-based healing — play individually or experience all 6 in the full journey</p>

          <div className="space-y-5">
            {LOVE_STAGES.map((stage, i) => {
              const isActive = (mode === "single" && activeStage?.id === stage.id && playing) ||
                               (mode === "journey" && journeyStep === i && playing);
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border overflow-hidden transition-all"
                  style={{
                    borderColor: isActive ? stage.glow + "70" : "#ffffff15",
                    background: isActive ? stage.glow + "0d" : "#ffffff04",
                    boxShadow: isActive ? `0 0 40px ${stage.glow}25` : "none"
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.div
                          className="text-4xl mt-1 flex-shrink-0"
                          animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                        >{stage.icon}</motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <div className="text-xs font-bold tracking-widest text-white/30">STAGE {stage.stage}</div>
                            <div className="font-black text-lg" style={{ color: isActive ? stage.color : "#fff" }}>
                              {stage.name}
                            </div>
                            <div className="text-white/40 text-sm italic">{stage.subtitle}</div>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: stage.glow + "20", color: stage.color }}>
                              {stage.hz} Hz primary
                            </span>
                            {stage.subHz > 0 && (
                              <span className="text-xs px-2.5 py-1 rounded-full border border-white/15 text-white/45">
                                {stage.subHz} Hz sub
                              </span>
                            )}
                            {stage.beatHz > 0 && (
                              <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/35">
                                {stage.beatHz} Hz binaural beat
                              </span>
                            )}
                          </div>
                          <p className="text-white/55 text-sm leading-relaxed mb-3">{stage.epigenetic}</p>

                          {/* Meditation guidance */}
                          <div className="text-xs italic text-white/40 border-l-2 pl-3 mb-3 leading-relaxed"
                            style={{ borderColor: stage.glow + "50" }}>
                            {stage.meditation}
                          </div>

                          {/* Affirmation */}
                          <div className="text-sm italic text-white/65 font-medium">
                            "{stage.affirmation}"
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <button
                          onClick={() => isActive && mode === "single" ? stopAll() : playSingleStage(stage)}
                          className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 whitespace-nowrap"
                          style={{
                            background: isActive ? stage.glow : stage.glow + "20",
                            color: isActive ? "#000" : stage.color,
                            border: isActive ? "none" : `1px solid ${stage.glow}40`
                          }}
                        >
                          {isActive && mode === "single" ? "⏸ Playing" : "▶ Play"}
                        </button>
                        <button
                          onClick={() => setShowScience(showScience === stage.id ? null : stage.id)}
                          className="text-xs text-white/30 hover:text-white/60 transition-colors"
                        >
                          🔬 {showScience === stage.id ? "Hide" : "Science"}
                        </button>
                      </div>
                    </div>

                    {/* Science panel */}
                    <AnimatePresence>
                      {showScience === stage.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-white/10"
                        >
                          <div className="text-xs font-bold mb-2 tracking-wider" style={{ color: stage.color }}>🔬 EPIGENETIC SCIENCE</div>
                          <p className="text-white/50 text-sm leading-relaxed">{stage.science}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* EPIGENETICS EXPLAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 border border-white/10 mb-12"
          style={{ background: "#ffffff04" }}
        >
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">🧬 How Love Rewrites Your DNA</h2>
          <p className="text-white/40 text-center text-sm mb-8">The science of epigenetic love healing</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔬",
                title: "Epigenetic Gene Switching",
                desc: "Love and coherent sound don't change your DNA sequence — they change which genes are expressed. In states of deep love, over 1300 genes shift their expression pattern within minutes."
              },
              {
                icon: "💛",
                title: "Telomere Lengthening",
                desc: "Telomeres are the caps on your chromosomes — their length determines biological age. Nobel Prize research shows compassion, love, and healing states activate telomerase, the enzyme that rebuilds them."
              },
              {
                icon: "💗",
                title: "HeartMath Coherence",
                desc: "The heart generates an electromagnetic field 5,000× stronger than the brain. In love-based heart coherence, this field measurably affects the DNA of cells held nearby — love is physically contagious."
              },
              {
                icon: "✦",
                title: "Biophotonic Emission",
                desc: "Fritz-Albert Popp proved every cell emits coherent light — biophotons. In states of deep love and spiritual activation, this light emission becomes highly ordered. You literally glow with love."
              },
              {
                icon: "🌳",
                title: "Ancestral Healing",
                desc: "Trauma is inherited epigenetically through DNA methylation patterns. Research by Rachel Yehuda shows this can span 3-7 generations — and healing yourself heals your entire lineage."
              },
              {
                icon: "🌊",
                title: "Vagus Nerve Activation",
                desc: "The vagus nerve — the 'nerve of compassion' — runs from brain to heart to gut. Love frequencies activate this nerve, triggering a cascade of healing, immunity, and deep safety throughout the body."
              },
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

        {/* FINAL CALL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border border-rose-500/20"
          style={{ background: "linear-gradient(135deg, #ec489908, #f59e0b05, #8b5cf608)" }}
        >
          <div className="text-5xl mb-4">💗</div>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
            Love Is Not a Feeling. It Is a Force.
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
            At its highest expression, love is the fundamental creative force of the universe. These frequencies don't ask you to feel it. They remind your biology of what it already knows — that you were made from love, sustained by love, and your deepest purpose is to embody it completely.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={playUnified}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full font-black text-lg text-black shadow-2xl"
              style={{ background: "linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6)", boxShadow: "0 0 50px #ec489930" }}
            >
              💗 Activate Love Field
            </motion.button>
            <motion.button
              onClick={playJourney}
              whileHover={{ scale: 1.04 }}
              className="px-10 py-4 rounded-full font-bold text-lg border border-rose-400/40 text-rose-300 hover:bg-rose-400/10 transition-colors"
            >
              ✦ Full Journey
            </motion.button>
          </div>
        </motion.div>

        <div className="text-center mt-8 text-white/25 text-xs">
          🎧 Headphones strongly recommended · 528 Hz love carrier present in every stage · Safe for daily use · Best used in stillness
        </div>
      </div>
    </div>
  );
}

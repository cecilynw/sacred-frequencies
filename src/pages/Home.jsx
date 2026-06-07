import { useState, useEffect, useRef } from "react";
import { FrequencyTrack } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FrequencyCard from "../components/FrequencyCard";
import CategoryFilter from "../components/CategoryFilter";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/f1b8155b2_generated_image.png";

const CATEGORY_META = {
  Body:       { emoji: "🧬", color: "from-red-900/60 to-rose-800/40",   border: "border-rose-500/40",   glow: "#ef4444" },
  Mind:       { emoji: "🧠", color: "from-blue-900/60 to-indigo-800/40", border: "border-blue-400/40",  glow: "#60a5fa" },
  Spirit:     { emoji: "✨", color: "from-violet-900/60 to-purple-800/40", border: "border-violet-400/40", glow: "#a78bfa" },
  Wealth:     { emoji: "💛", color: "from-yellow-900/60 to-amber-800/40", border: "border-yellow-400/40", glow: "#fbbf24" },
  Nature:     { emoji: "🌿", color: "from-green-900/60 to-emerald-800/40", border: "border-emerald-400/40", glow: "#34d399" },
  Love:       { emoji: "💗", color: "from-pink-900/60 to-rose-800/40",   border: "border-pink-400/40",   glow: "#f472b6" },
  Cleansing:  { emoji: "🔮", color: "from-teal-900/60 to-cyan-800/40",   border: "border-teal-400/40",   glow: "#2dd4bf" },
};

const ANGEL_PREVIEWS = [
  { hz: 111,  symbol: "✦",  meaning: "New Beginnings",       glow: "#fff9c4" },
  { hz: 333,  symbol: "△",  meaning: "Ascended Masters",     glow: "#fbbf24" },
  { hz: 555,  symbol: "⚡", meaning: "Transformation",       glow: "#06b6d4" },
  { hz: 777,  symbol: "✪",  meaning: "Divine Luck",          glow: "#8b5cf6" },
  { hz: 888,  symbol: "∞",  meaning: "Infinite Abundance",   glow: "#10b981" },
  { hz: 1111, symbol: "⟡",  meaning: "Manifestation Portal", glow: "#e2e8f0" },
];

const CONSCIOUSNESS_LEVELS = [
  { level: "Grounded", hz: "7.83", desc: "Earth resonance — feel rooted and safe", color: "#34d399" },
  { level: "Healing",  hz: "528",  desc: "DNA repair — restore and regenerate",    color: "#60a5fa" },
  { level: "Aligned",  hz: "432",  desc: "Nature tuning — harmony with all life",  color: "#a78bfa" },
  { level: "Elevated", hz: "963",  desc: "Crown activation — divine connection",   color: "#fbbf24" },
];

// Amazon forest + ocean wave sound generator
function createNatureAmbience(audioCtx) {
  const nodes = [];
  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 4);
  masterGain.connect(audioCtx.destination);

  // --- OCEAN WAVES ---
  const waveBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 4, audioCtx.sampleRate);
  const waveData = waveBuffer.getChannelData(0);
  for (let i = 0; i < waveData.length; i++) {
    waveData[i] = (Math.random() * 2 - 1) * Math.sin(i / waveData.length * Math.PI);
  }
  const waveSource = audioCtx.createBufferSource();
  waveSource.buffer = waveBuffer;
  waveSource.loop = true;
  const waveFilter = audioCtx.createBiquadFilter();
  waveFilter.type = "lowpass";
  waveFilter.frequency.value = 400;
  waveFilter.Q.value = 0.5;
  const waveGain = audioCtx.createGain();
  waveGain.gain.value = 0.6;
  waveSource.connect(waveFilter);
  waveFilter.connect(waveGain);
  waveGain.connect(masterGain);
  waveSource.start();
  nodes.push(waveSource);

  // --- FOREST CHIRP UNDERTONE (brown noise base) ---
  const forestBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = forestBuffer.getChannelData(c);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      d[i] = (last + 0.02 * w) / 1.02;
      last = d[i];
    }
  }
  const forestSource = audioCtx.createBufferSource();
  forestSource.buffer = forestBuffer;
  forestSource.loop = true;
  const forestFilter = audioCtx.createBiquadFilter();
  forestFilter.type = "bandpass";
  forestFilter.frequency.value = 800;
  forestFilter.Q.value = 0.3;
  const forestGain = audioCtx.createGain();
  forestGain.gain.value = 0.25;
  forestSource.connect(forestFilter);
  forestFilter.connect(forestGain);
  forestGain.connect(masterGain);
  forestSource.start();
  nodes.push(forestSource);

  // --- EARTH PULSE (7.83 Hz Schumann undertone) ---
  const earthOsc = audioCtx.createOscillator();
  const earthGain = audioCtx.createGain();
  earthOsc.type = "sine";
  earthOsc.frequency.value = 7.83;
  earthGain.gain.value = 0.08;
  earthOsc.connect(earthGain);
  earthGain.connect(masterGain);
  earthOsc.start();
  nodes.push(earthOsc);

  // --- HIGH SHIMMER (forest canopy breeze) ---
  const shimOsc = audioCtx.createOscillator();
  const shimGain = audioCtx.createGain();
  shimOsc.type = "triangle";
  shimOsc.frequency.value = 1200;
  shimGain.gain.value = 0.03;
  shimOsc.connect(shimGain);
  shimGain.connect(masterGain);
  shimOsc.start();
  nodes.push(shimOsc);

  return { nodes, masterGain };
}

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [natureOn, setNatureOn] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [consciousnessIdx, setConsciousnessIdx] = useState(0);

  const audioCtxRef = useRef(null);
  const natureNodesRef = useRef([]);
  const natureMasterRef = useRef(null);

  useEffect(() => {
    FrequencyTrack.list("-play_count").then((data) => {
      setTracks(data);
      setFeatured(data.filter((t) => t.is_featured));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousnessIdx(i => (i + 1) % CONSCIOUSNESS_LEVELS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => stopNature();
  }, []);

  const toggleNature = () => {
    if (natureOn) {
      stopNature();
    } else {
      startNature();
    }
  };

  const startNature = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    const { nodes, masterGain } = createNatureAmbience(audioCtxRef.current);
    natureNodesRef.current = nodes;
    natureMasterRef.current = masterGain;
    setNatureOn(true);
  };

  const stopNature = () => {
    if (natureMasterRef.current && audioCtxRef.current) {
      try {
        natureMasterRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 2);
        setTimeout(() => {
          natureNodesRef.current.forEach(n => { try { n.stop(); } catch {} });
          natureNodesRef.current = [];
        }, 2200);
      } catch {}
    }
    setNatureOn(false);
  };

  const filtered = activeCategory === "All"
    ? tracks
    : tracks.filter((t) => t.category === activeCategory);

  const currentLevel = CONSCIOUSNESS_LEVELS[consciousnessIdx];

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* NATURE AMBIENCE TOGGLE — always visible */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <motion.button
          onClick={toggleNature}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 rounded-full border font-semibold text-sm shadow-2xl backdrop-blur-xl"
          style={{
            background: natureOn ? "#10b98120" : "#030712cc",
            borderColor: natureOn ? "#34d399" : "#ffffff30",
            color: natureOn ? "#34d399" : "#ffffff80",
            boxShadow: natureOn ? "0 0 30px #10b98140" : "none"
          }}
        >
          {natureOn ? (
            <>
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🌿</motion.span>
              Amazon + Ocean On
            </>
          ) : (
            <><span>🎧</span> Play Nature Sounds</>
          )}
        </motion.button>
        {natureOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-emerald-400/70 text-right pr-1"
          >
            🌊 Sea breeze · 🌳 Amazon forest · 🌍 7.83 Hz Earth pulse
          </motion.div>
        )}
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/10 via-[#030712]/50 to-[#030712]" />

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 200 + i * 80,
              height: 200 + i * 80,
              background: `radial-gradient(circle, ${["#fbbf2408","#34d39908","#a78bfa08","#f472b608","#06b6d408","#10b98108"][i]}, transparent)`,
              left: `${[10,60,30,70,20,50][i]}%`,
              top: `${[20,10,60,40,70,30][i]}%`,
              transform: "translate(-50%,-50%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            >✦</motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-amber-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent leading-tight">
              Sacred Frequencies
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-2 font-light">
              Sound & Vibration Healing for Body, Mind & Spirit
            </p>
            <p className="text-base text-white/50 mb-6 max-w-2xl mx-auto">
              Harness Solfeggio tones, angel number frequencies, Schumann resonance & sacred Hz to cleanse negative energy, activate DNA, and align with abundance, longevity & love.
            </p>
          </motion.div>

          {/* Consciousness Level Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border mb-8 backdrop-blur-xl"
            style={{ borderColor: currentLevel.color + "50", background: currentLevel.color + "12" }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: currentLevel.color }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-semibold" style={{ color: currentLevel.color }}>
              {currentLevel.level} Consciousness
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/50 text-xs">{currentLevel.hz} Hz — {currentLevel.desc}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-6">
            <Link to={createPageUrl("Player")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-amber-500/30">
              🎵 Start Healing Now
            </Link>
            <Link to={createPageUrl("AngelNumbers")}
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors">
              ⟡ Angel Numbers
            </Link>
            <button
              onClick={() => setShowPricing(true)}
              className="px-8 py-4 rounded-full border border-amber-400/40 text-amber-300 font-bold text-lg hover:bg-amber-400/10 transition-colors">
              💎 Get Full Access
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* PRICING MODAL */}
        <AnimatePresence>
          {showPricing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowPricing(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-[#0a0a1a] border border-white/15 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="text-center mb-8">
                  <div className="text-5xl mb-3">✦</div>
                  <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-amber-300 to-violet-300 bg-clip-text text-transparent">
                    Choose Your Healing Path
                  </h2>
                  <p className="text-white/50">Unlock the full power of Sacred Frequencies</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {[
                    {
                      name: "Free Explorer",
                      price: "$0",
                      period: "forever",
                      color: "#ffffff",
                      features: ["5 core frequencies", "Basic player", "1 guided ritual", "Nature ambience"],
                      cta: "Start Free",
                      highlight: false,
                    },
                    {
                      name: "Healer",
                      price: "$11",
                      period: "/ month",
                      color: "#fbbf24",
                      features: ["All 40 frequencies", "Angel number library", "6 full rituals", "Binaural + isochronic", "Healing journal", "Nature soundscapes", "Priority support"],
                      cta: "Start Healing",
                      highlight: true,
                    },
                    {
                      name: "Ascended",
                      price: "$33",
                      period: "/ month",
                      color: "#a78bfa",
                      features: ["Everything in Healer", "Custom ritual builder", "1:1 frequency sessions", "Angel Ascension Sequence", "Early access to new Hz", "Sacred community access", "Lifetime updates"],
                      cta: "Ascend Now",
                      highlight: false,
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className="rounded-2xl p-6 border flex flex-col"
                      style={{
                        borderColor: plan.highlight ? plan.color + "80" : "#ffffff20",
                        background: plan.highlight ? plan.color + "10" : "#ffffff05",
                        boxShadow: plan.highlight ? `0 0 40px ${plan.color}25` : "none"
                      }}
                    >
                      {plan.highlight && (
                        <div className="text-center mb-3">
                          <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: plan.color, color: "#000" }}>
                            MOST POPULAR
                          </span>
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <div className="font-black text-lg" style={{ color: plan.color }}>{plan.name}</div>
                        <div className="text-4xl font-black text-white mt-1">{plan.price}<span className="text-base text-white/40">{plan.period}</span></div>
                      </div>
                      <ul className="space-y-2 mb-6 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                            <span style={{ color: plan.color }}>✓</span> {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                        style={{
                          background: plan.highlight ? plan.color : "transparent",
                          color: plan.highlight ? "#000" : plan.color,
                          border: plan.highlight ? "none" : `1px solid ${plan.color}60`
                        }}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-center text-white/30 text-xs">✦ Cancel anytime · No risk · 7-day free trial on all plans</p>
                <button onClick={() => setShowPricing(false)} className="absolute top-4 right-5 text-white/40 hover:text-white/80 text-2xl">×</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONSCIOUSNESS STIMULATOR STRIP */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {CONSCIOUSNESS_LEVELS.map((lvl, i) => (
            <motion.div
              key={lvl.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 border text-center"
              style={{ borderColor: lvl.color + "40", background: lvl.color + "08" }}
            >
              <motion.div
                className="w-3 h-3 rounded-full mx-auto mb-3"
                style={{ background: lvl.color }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
              />
              <div className="font-black text-sm mb-1" style={{ color: lvl.color }}>{lvl.level}</div>
              <div className="text-white/40 text-xs">{lvl.hz} Hz</div>
              <div className="text-white/55 text-xs mt-1">{lvl.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ANGEL NUMBERS TEASER */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-violet-300 bg-clip-text text-transparent">
              ⟡ Angel Number Frequencies
            </h2>
            <p className="text-white/45">20 divine numeric tones — from 111 Hz to 9999 Hz — each carrying a sacred message</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {ANGEL_PREVIEWS.map((a, i) => (
              <motion.div
                key={a.hz}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-4 text-center border"
                style={{ background: a.glow + "10", borderColor: a.glow + "35", boxShadow: `0 0 20px ${a.glow}15` }}
              >
                <div className="text-3xl mb-1" style={{ color: a.glow }}>{a.symbol}</div>
                <div className="text-xl font-black" style={{ color: a.glow }}>{a.hz}</div>
                <div className="text-xs text-white/40 mt-1">Hz</div>
                <div className="text-xs text-white/55 mt-1 font-medium">{a.meaning}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to={createPageUrl("AngelNumbers")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-violet-500/50 text-violet-300 hover:bg-violet-500/10 transition-colors font-semibold">
              View All 20 Angel Frequencies →
            </Link>
          </div>
        </motion.div>

        {/* FEATURED */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">
            ⭐ Featured Frequencies
          </h2>
          <p className="text-white/50 text-center mb-8">The most powerful healing tones, hand-selected for maximum transformation</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {featured.filter(t => !ANGEL_PREVIEWS.find(a => a.hz === Math.round(t.frequency_hz))).slice(0, 6).map((track, i) => (
              <FrequencyCard key={track.id} track={track} meta={CATEGORY_META[track.category]} index={i} />
            ))}
          </div>
        </motion.div>

        {/* BENEFITS GRID */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "🧬", title: "Longevity & Health",     desc: "Repair DNA, regenerate cells, and activate your body's innate healing intelligence through precisely calibrated frequencies." },
            { icon: "💎", title: "Wealth & Abundance",     desc: "Dissolve scarcity programming with 888 Hz, 8888 Hz and golden frequencies that align you with infinite prosperity." },
            { icon: "🌍", title: "Nature Alignment",       desc: "Sync with Earth's 7.83 Hz Schumann Resonance and 432 Hz universal tuning with real Amazon forest and ocean ambience." },
            { icon: "❤️", title: "Love & Relationships",   desc: "Open your heart with 639 Hz and 528 Hz. Attract soul partnerships with 222 Hz divine balance." },
            { icon: "🔮", title: "Cleanse & Clear",        desc: "Remove negative energy, ancestral trauma, and karmic cycles using 396, 417, 741, 999, and 9999 Hz." },
            { icon: "⟡",  title: "Angel Alignment",        desc: "Activate the power of every angel number as a living sonic frequency — manifest faster with 1111 Hz portal." },
          ].map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-white/90">{b.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ALL FREQUENCIES */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
            🎵 Full Frequency Library
          </h2>
          <p className="text-white/50 text-center mb-8">40 healing frequencies across 7 dimensions of being</p>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          {loading ? (
            <div className="text-center text-white/40 py-20">Loading frequencies…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {filtered.map((track, i) => (
                <FrequencyCard key={track.id} track={track} meta={CATEGORY_META[track.category]} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border border-amber-500/30 mb-8"
          style={{ background: "linear-gradient(135deg, #fbbf2410, #a78bfa10, #10b98110)" }}
        >
          <div className="text-5xl mb-4">✦</div>
          <h2 className="text-3xl font-black mb-3 text-white">Your Healing Journey Starts Now</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Join thousands already using Sacred Frequencies to transform their health, wealth, and spiritual alignment. No tech skills required — just press play.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Player")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-black text-lg hover:scale-105 transition-transform shadow-xl">
              🎵 Start Free Today
            </Link>
            <button
              onClick={() => setShowPricing(true)}
              className="px-8 py-4 rounded-full border border-amber-400/50 text-amber-300 font-bold text-lg hover:bg-amber-400/10 transition-colors">
              💎 View Plans
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NATURE_SCENES = [
  {
    id: "amazon",
    name: "Amazon Rainforest",
    icon: "🌳",
    tagline: "The Lungs of the Earth",
    desc: "Immerse in the primal pulse of the world's greatest forest. Brown noise base with mid-range forest canopy shimmer — the oldest healing soundscape on Earth.",
    color: "#22c55e",
    bg: "from-green-950 to-emerald-950",
    layers: [
      { label: "Forest Floor", freq: 80, type: "lowShelf" },
      { label: "Bird Song", freq: 1200, type: "highShelf" },
      { label: "Rain Drops", freq: 400, type: "bandpass" },
    ]
  },
  {
    id: "ocean",
    name: "Sacred Ocean",
    icon: "🌊",
    tagline: "Where the Ether Meets the Shore",
    desc: "Deep ocean waves with sea breeze overtones. Low-pass filtered white noise breathes like the tide — grounding, ancient, infinite.",
    color: "#06b6d4",
    bg: "from-cyan-950 to-blue-950",
    layers: [
      { label: "Deep Wave", freq: 120, type: "lowpass" },
      { label: "Sea Breeze", freq: 800, type: "bandpass" },
      { label: "Shore Foam", freq: 2000, type: "highpass" },
    ]
  },
  {
    id: "earth",
    name: "Earth's Heartbeat",
    icon: "🌍",
    tagline: "7.83 Hz — The Schumann Resonance",
    desc: "The electromagnetic pulse of the planet itself. Pure Schumann resonance at 7.83 Hz, harmonically blended with delta and theta brain entrainment.",
    color: "#f59e0b",
    bg: "from-amber-950 to-yellow-950",
    layers: [
      { label: "Schumann 7.83", freq: 7.83, type: "sine" },
      { label: "Delta 0.5–4", freq: 2, type: "sine" },
      { label: "Theta 4–8", freq: 6, type: "sine" },
    ]
  },
  {
    id: "ether",
    name: "The Ether",
    icon: "✦",
    tagline: "The Fifth Element — Pure Consciousness",
    desc: "Beyond earth, water, fire and air — ether is the field that contains all. High-frequency shimmer with crystalline harmonics and silence as a living presence.",
    color: "#a78bfa",
    bg: "from-violet-950 to-purple-950",
    layers: [
      { label: "Crystal Bowl", freq: 432, type: "sine" },
      { label: "Cosmic Shimmer", freq: 963, type: "triangle" },
      { label: "Void Hum", freq: 40, type: "sine" },
    ]
  },
  {
    id: "fire",
    name: "Sacred Fire",
    icon: "🔥",
    tagline: "Transformation & Purification",
    desc: "The primal crackle of sacred fire — transmutation frequency. Irregular noise bursts layered with 417 Hz transformation tone to burn away what no longer serves.",
    color: "#ef4444",
    bg: "from-red-950 to-orange-950",
    layers: [
      { label: "Fire Crackle", freq: 300, type: "bandpass" },
      { label: "417 Hz Transform", freq: 417, type: "sine" },
      { label: "Ember Hiss", freq: 1500, type: "highpass" },
    ]
  },
  {
    id: "cosmos",
    name: "Cosmic Void",
    icon: "🌌",
    tagline: "The Sound of Space",
    desc: "NASA recordings mapped to frequency — deep space drones, pulsar rhythms, and the resonant hum of the universe. The most expansive soundscape available.",
    color: "#818cf8",
    bg: "from-indigo-950 to-slate-950",
    layers: [
      { label: "Deep Space Drone", freq: 55, type: "sine" },
      { label: "Pulsar Rhythm", freq: 0.5, type: "sine" },
      { label: "Star Shimmer", freq: 2200, type: "triangle" },
    ]
  },
];

const PRIMAL_FREQUENCIES = [
  { hz: 40,   name: "Gamma Activation",    desc: "Neural synchrony — activates whole-brain coherence",          color: "#f472b6" },
  { hz: 7.83, name: "Schumann Resonance",  desc: "Earth's heartbeat — the baseline of all life",                color: "#34d399" },
  { hz: 1,    name: "Delta Deep Healing",  desc: "Deep sleep frequency — cellular repair and restoration",       color: "#60a5fa" },
  { hz: 4,    name: "Theta Gateway",       desc: "The threshold between waking and sleep — pure intuition",      color: "#a78bfa" },
  { hz: 10,   name: "Alpha Calm",          desc: "Relaxed awareness — flow state and creativity",                color: "#fbbf24" },
  { hz: 20,   name: "Beta Focus",          desc: "Active thinking — sharp focus and analytical power",           color: "#fb923c" },
];

function buildNatureAudio(audioCtx, sceneId) {
  const nodes = [];
  const master = audioCtx.createGain();
  master.gain.setValueAtTime(0, audioCtx.currentTime);
  master.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 3);
  master.connect(audioCtx.destination);

  if (sceneId === "amazon") {
    // Brown noise forest
    const bufLen = audioCtx.sampleRate * 4;
    const buf = audioCtx.createBuffer(2, bufLen, audioCtx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      let last = 0;
      for (let i = 0; i < d.length; i++) {
        const w = Math.random() * 2 - 1;
        d[i] = (last + 0.02 * w) / 1.02;
        last = d[i];
      }
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const f = audioCtx.createBiquadFilter();
    f.type = "bandpass"; f.frequency.value = 600; f.Q.value = 0.5;
    src.connect(f); f.connect(master);
    src.start(); nodes.push(src);
    // Bird-like shimmer
    const bird = audioCtx.createOscillator();
    const bGain = audioCtx.createGain();
    bird.type = "triangle"; bird.frequency.value = 1100;
    bGain.gain.value = 0.03;
    bird.connect(bGain); bGain.connect(master);
    bird.start(); nodes.push(bird);

  } else if (sceneId === "ocean") {
    const bufLen = audioCtx.sampleRate * 5;
    const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((i / bufLen) * Math.PI * 3);
    const src = audioCtx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const f = audioCtx.createBiquadFilter();
    f.type = "lowpass"; f.frequency.value = 300;
    src.connect(f); f.connect(master);
    src.start(); nodes.push(src);
    // Breeze
    const bufB = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
    const db = bufB.getChannelData(0);
    for (let i = 0; i < db.length; i++) db[i] = (Math.random() * 2 - 1) * 0.5;
    const srcB = audioCtx.createBufferSource();
    srcB.buffer = bufB; srcB.loop = true;
    const fb = audioCtx.createBiquadFilter();
    fb.type = "bandpass"; fb.frequency.value = 900; fb.Q.value = 0.8;
    const gb = audioCtx.createGain(); gb.gain.value = 0.3;
    srcB.connect(fb); fb.connect(gb); gb.connect(master);
    srcB.start(); nodes.push(srcB);

  } else if (sceneId === "earth") {
    [7.83, 14.3, 20.8].forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = f;
      g.gain.value = 0.15 / (i + 1);
      osc.connect(g); g.connect(master);
      osc.start(); nodes.push(osc);
    });

  } else if (sceneId === "ether") {
    [432, 528, 963].forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = i === 1 ? "triangle" : "sine";
      osc.frequency.value = f;
      g.gain.value = 0.08 / (i * 0.5 + 1);
      osc.connect(g); g.connect(master);
      osc.start(); nodes.push(osc);
    });

  } else if (sceneId === "fire") {
    // Crackle via noise
    const bufLen = audioCtx.sampleRate * 2;
    const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() > 0.95 ? 1 : 0.1);
    const src = audioCtx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const f = audioCtx.createBiquadFilter();
    f.type = "bandpass"; f.frequency.value = 400; f.Q.value = 0.3;
    src.connect(f); f.connect(master);
    src.start(); nodes.push(src);
    // 417 Hz transformation tone
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = "sine"; osc.frequency.value = 417; g.gain.value = 0.06;
    osc.connect(g); g.connect(master);
    osc.start(); nodes.push(osc);

  } else if (sceneId === "cosmos") {
    [55, 110, 220].forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = f;
      g.gain.value = 0.1 / (i + 1);
      osc.connect(g); g.connect(master);
      osc.start(); nodes.push(osc);
    });
    const shimOsc = audioCtx.createOscillator();
    const shimG = audioCtx.createGain();
    shimOsc.type = "triangle"; shimOsc.frequency.value = 2200;
    shimG.gain.value = 0.02;
    shimOsc.connect(shimG); shimG.connect(master);
    shimOsc.start(); nodes.push(shimOsc);
  }

  return { nodes, master };
}

function buildPrimalTone(audioCtx, hz) {
  const master = audioCtx.createGain();
  master.gain.setValueAtTime(0, audioCtx.currentTime);
  master.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2);
  master.connect(audioCtx.destination);
  const osc = audioCtx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = hz;
  osc.connect(master);
  osc.start();
  return { nodes: [osc], master };
}

export default function NaturePortal() {
  const [activeScene, setActiveScene] = useState(null);
  const [activePrimal, setActivePrimal] = useState(null);
  const [mixVolumes, setMixVolumes] = useState({ amazon: 0.5, ocean: 0.5, earth: 0.3, ether: 0.3 });
  const [layering, setLayering] = useState(false);
  const [layerActive, setLayerActive] = useState({});

  const audioCtxRef = useRef(null);
  const sceneRef = useRef(null);
  const primalRef = useRef(null);
  const layerRefs = useRef({});

  const getCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const stopScene = () => {
    if (sceneRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      sceneRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      const ns = sceneRef.current.nodes;
      setTimeout(() => ns.forEach(n => { try { n.stop(); } catch {} }), 2200);
      sceneRef.current = null;
    }
    setActiveScene(null);
  };

  const playScene = (sceneId) => {
    if (activeScene === sceneId) { stopScene(); return; }
    stopScene();
    const ctx = getCtx();
    const { nodes, master } = buildNatureAudio(ctx, sceneId);
    sceneRef.current = { nodes, master };
    setActiveScene(sceneId);
  };

  const stopPrimal = () => {
    if (primalRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      primalRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      const ns = primalRef.current.nodes;
      setTimeout(() => ns.forEach(n => { try { n.stop(); } catch {} }), 1600);
      primalRef.current = null;
    }
    setActivePrimal(null);
  };

  const playPrimal = (hz) => {
    if (activePrimal === hz) { stopPrimal(); return; }
    stopPrimal();
    const ctx = getCtx();
    const { nodes, master } = buildPrimalTone(ctx, hz);
    primalRef.current = { nodes, master };
    setActivePrimal(hz);
  };

  useEffect(() => () => {
    stopScene(); stopPrimal();
    Object.values(layerRefs.current).forEach(r => { try { r.nodes.forEach(n => n.stop()); } catch {} });
  }, []);

  const activeSceneData = NATURE_SCENES.find(s => s.id === activeScene);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* HERO */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                background: ["#34d399","#06b6d4","#a78bfa","#fbbf24","#f472b6"][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.4
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -20, 0] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-6xl mb-4">🌿</div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
            Nature & Ether Portal
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Primal sounds of nature and the ether — Amazon forest, sacred ocean, Earth's heartbeat, and the fifth element. Press play. No instructions needed.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">

        {/* ACTIVE PLAYER BAR */}
        <AnimatePresence>
          {activeScene && activeSceneData && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sticky top-16 z-40 mb-8 rounded-2xl p-4 flex items-center gap-4 border backdrop-blur-xl"
              style={{
                background: activeSceneData.color + "12",
                borderColor: activeSceneData.color + "50",
                boxShadow: `0 0 40px ${activeSceneData.color}20`
              }}
            >
              <motion.span
                className="text-3xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >{activeSceneData.icon}</motion.span>
              <div className="flex-1">
                <div className="font-black" style={{ color: activeSceneData.color }}>{activeSceneData.name}</div>
                <div className="text-xs text-white/40">{activeSceneData.tagline} · Playing now</div>
              </div>
              <motion.div
                className="flex gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {[1,2,3,2,1].map((h, i) => (
                  <div key={i} className="w-1 rounded-full" style={{ height: h * 6 + 4, background: activeSceneData.color }} />
                ))}
              </motion.div>
              <button
                onClick={stopScene}
                className="px-4 py-2 rounded-full border text-sm font-semibold transition-all hover:bg-white/10"
                style={{ borderColor: activeSceneData.color + "50", color: activeSceneData.color }}
              >Stop</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NATURE SCENES GRID */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">🌍 Choose Your Nature Soundscape</h2>
          <p className="text-white/40 text-center text-sm mb-8">One tap to play. Pure, audible, immersive.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NATURE_SCENES.map((scene, i) => {
              const isActive = activeScene === scene.id;
              return (
                <motion.button
                  key={scene.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => playScene(scene.id)}
                  className={`rounded-2xl p-6 text-left border transition-all bg-gradient-to-br ${scene.bg}`}
                  style={{
                    borderColor: isActive ? scene.color + "80" : "#ffffff15",
                    boxShadow: isActive ? `0 0 40px ${scene.color}30` : "none"
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <motion.div
                      className="text-5xl"
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >{scene.icon}</motion.div>
                    {isActive && (
                      <motion.div
                        className="flex gap-0.5 items-end"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      >
                        {[3,5,4,6,3].map((h, j) => (
                          <div key={j} className="w-1 rounded-full" style={{ height: h * 3, background: scene.color }} />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <div className="font-black text-lg mb-0.5" style={{ color: isActive ? scene.color : "#fff" }}>
                    {scene.name}
                  </div>
                  <div className="text-xs font-semibold mb-2 text-white/40 italic">{scene.tagline}</div>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{scene.desc}</p>
                  <div
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-center transition-all"
                    style={{
                      background: isActive ? scene.color : scene.color + "20",
                      color: isActive ? "#000" : scene.color,
                      border: isActive ? "none" : `1px solid ${scene.color}40`
                    }}
                  >
                    {isActive ? "⏸ Playing…" : "▶ Play"}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* PRIMAL BRAINWAVE FREQUENCIES */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-2 text-center text-white/90">🧠 Primal Brainwave Frequencies</h2>
          <p className="text-white/40 text-center text-sm mb-8">Pure tones that synchronise your brain to nature's own rhythms</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRIMAL_FREQUENCIES.map((pf, i) => {
              const isActive = activePrimal === pf.hz;
              return (
                <motion.button
                  key={pf.hz}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => playPrimal(pf.hz)}
                  className="rounded-2xl p-5 border text-left transition-all"
                  style={{
                    borderColor: isActive ? pf.color + "80" : "#ffffff15",
                    background: isActive ? pf.color + "15" : "#ffffff05",
                    boxShadow: isActive ? `0 0 25px ${pf.color}30` : "none"
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-black" style={{ color: pf.color }}>{pf.hz} Hz</div>
                    {isActive && (
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: pf.color }}
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                    )}
                  </div>
                  <div className="font-bold text-sm text-white/80 mb-1">{pf.name}</div>
                  <div className="text-xs text-white/45">{pf.desc}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* COMBINE IT ALL TIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 border border-emerald-500/25 text-center"
          style={{ background: "#10b98110" }}
        >
          <div className="text-3xl mb-3">✦</div>
          <h3 className="font-black text-lg mb-2 text-emerald-300">Pro Tip: Layer Nature + Frequencies</h3>
          <p className="text-white/55 text-sm max-w-xl mx-auto mb-4">
            For the deepest experience, start a Nature Soundscape here, then open the Player and add a healing frequency on top. Amazon forest + 528 Hz DNA healing. Ocean waves + 7.83 Hz Schumann. The ether + 1111 Hz manifestation portal.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/40">
            <span>🌳 Amazon + 528 Hz = Deep Healing</span>
            <span>·</span>
            <span>🌊 Ocean + 7.83 Hz = Grounding</span>
            <span>·</span>
            <span>✦ Ether + 1111 Hz = Manifestation</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

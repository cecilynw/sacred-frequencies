import { useState, useEffect, useRef, useCallback } from "react";
import { FrequencyTrack } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_META = {
  Body:       { emoji: "🧬", glow: "#ef4444", bg: "from-red-950 to-rose-950" },
  Mind:       { emoji: "🧠", glow: "#60a5fa", bg: "from-blue-950 to-indigo-950" },
  Spirit:     { emoji: "✨", glow: "#a78bfa", bg: "from-violet-950 to-purple-950" },
  Wealth:     { emoji: "💛", glow: "#fbbf24", bg: "from-yellow-950 to-amber-950" },
  Nature:     { emoji: "🌿", glow: "#34d399", bg: "from-green-950 to-emerald-950" },
  Love:       { emoji: "💗", glow: "#f472b6", bg: "from-pink-950 to-rose-950" },
  Cleansing:  { emoji: "🔮", glow: "#2dd4bf", bg: "from-teal-950 to-cyan-950" },
};

function createNatureLayer(audioCtx, volume = 0.15) {
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = volume;
  masterGain.connect(audioCtx.destination);
  const nodes = [];

  // Ocean wave (low-pass filtered noise)
  const bufLen = audioCtx.sampleRate * 4;
  const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(i / bufLen * Math.PI * 2);
  const waveSrc = audioCtx.createBufferSource();
  waveSrc.buffer = buf;
  waveSrc.loop = true;
  const waveFilter = audioCtx.createBiquadFilter();
  waveFilter.type = "lowpass";
  waveFilter.frequency.value = 350;
  waveSrc.connect(waveFilter);
  waveFilter.connect(masterGain);
  waveSrc.start();
  nodes.push(waveSrc);

  // Amazon forest (brown noise band)
  const fBuf = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const fd = fBuf.getChannelData(c);
    let last = 0;
    for (let i = 0; i < fd.length; i++) {
      const w = Math.random() * 2 - 1;
      fd[i] = (last + 0.02 * w) / 1.02;
      last = fd[i];
    }
  }
  const fSrc = audioCtx.createBufferSource();
  fSrc.buffer = fBuf;
  fSrc.loop = true;
  const fFilter = audioCtx.createBiquadFilter();
  fFilter.type = "bandpass";
  fFilter.frequency.value = 700;
  fFilter.Q.value = 0.4;
  const fGain = audioCtx.createGain();
  fGain.gain.value = 0.4;
  fSrc.connect(fFilter);
  fFilter.connect(fGain);
  fGain.connect(masterGain);
  fSrc.start();
  nodes.push(fSrc);

  // 7.83 Hz earth pulse
  const earthOsc = audioCtx.createOscillator();
  const earthGain = audioCtx.createGain();
  earthOsc.type = "sine";
  earthOsc.frequency.value = 7.83;
  earthGain.gain.value = 0.06;
  earthOsc.connect(earthGain);
  earthGain.connect(masterGain);
  earthOsc.start();
  nodes.push(earthOsc);

  return { nodes, masterGain };
}

function createTone(audioCtx, frequency, waveform = "sine") {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 2);
  return { oscillator, gainNode };
}

function getBinaural(audioCtx, baseFreq, beatFreq = 7.83) {
  const leftOsc = audioCtx.createOscillator();
  const leftGain = audioCtx.createGain();
  const leftPanner = audioCtx.createStereoPanner();
  leftPanner.pan.value = -1;
  leftOsc.connect(leftGain); leftGain.connect(leftPanner); leftPanner.connect(audioCtx.destination);
  leftOsc.frequency.value = baseFreq; leftOsc.type = "sine";
  leftGain.gain.setValueAtTime(0, audioCtx.currentTime);
  leftGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2);

  const rightOsc = audioCtx.createOscillator();
  const rightGain = audioCtx.createGain();
  const rightPanner = audioCtx.createStereoPanner();
  rightPanner.pan.value = 1;
  rightOsc.connect(rightGain); rightGain.connect(rightPanner); rightPanner.connect(audioCtx.destination);
  rightOsc.frequency.value = baseFreq + beatFreq; rightOsc.type = "sine";
  rightGain.gain.setValueAtTime(0, audioCtx.currentTime);
  rightGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2);

  return { leftOsc, leftGain, rightOsc, rightGain };
}

export default function Player() {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [waveform, setWaveform] = useState("sine");
  const [natureOn, setNatureOn] = useState(false);
  const [category, setCategory] = useState("All");
  const [affirmationVisible, setAffirmationVisible] = useState(false);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const natureRef = useRef(null);

  useEffect(() => {
    FrequencyTrack.list().then((data) => {
      setTracks(data);
      if (data.length > 0) setSelected(data.find((t) => t.is_featured) || data[0]);
    });
    return () => { stopAll(); };
  }, []);

  const getCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const stopAll = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try {
        if (n.gainNode) n.gainNode.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        if (n.leftGain) n.leftGain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        if (n.rightGain) n.rightGain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          try { n.oscillator?.stop(); } catch {}
          try { n.leftOsc?.stop(); } catch {}
          try { n.rightOsc?.stop(); } catch {}
        }, 1100);
      } catch {}
    });
    nodesRef.current = [];
    clearInterval(timerRef.current);
    setPlaying(false);
    setElapsed(0);
    setAffirmationVisible(false);
  }, []);

  const startPlaying = useCallback(() => {
    if (!selected) return;
    stopAll();
    const ctx = getCtx();
    const freq = selected.frequency_hz;
    const pattern = selected.vibration_pattern;
    const nodes = [];

    if (pattern === "Binaural") {
      const b = getBinaural(ctx, Math.min(freq, 500), 7.83);
      b.leftOsc.start(); b.rightOsc.start();
      nodes.push(b);
    } else {
      const t = createTone(ctx, freq, waveform);
      t.oscillator.start();
      nodes.push(t);
      if (freq < 2000) {
        const t2 = createTone(ctx, freq * 2, "sine");
        t2.gainNode.gain.setValueAtTime(0, ctx.currentTime);
        t2.gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);
        t2.oscillator.start();
        nodes.push(t2);
      }
    }

    nodesRef.current = nodes;
    startTimeRef.current = Date.now();
    setPlaying(true);
    setTimeout(() => setAffirmationVisible(true), 3000);

    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, [selected, waveform, stopAll]);

  const toggleNature = () => {
    const ctx = getCtx();
    if (natureOn && natureRef.current) {
      natureRef.current.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      setTimeout(() => {
        natureRef.current?.nodes.forEach(n => { try { n.stop(); } catch {} });
        natureRef.current = null;
      }, 2200);
      setNatureOn(false);
    } else {
      const layer = createNatureLayer(ctx, 0.15);
      natureRef.current = layer;
      setNatureOn(true);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const meta = selected ? CATEGORY_META[selected.category] : null;
  const categories = ["All", ...Object.keys(CATEGORY_META)];
  const filtered = category === "All" ? tracks : tracks.filter(t => t.category === category);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-amber-300 to-violet-300 bg-clip-text text-transparent">
            🎵 Sacred Frequency Player
          </h1>
          <p className="text-white/40 text-sm">Use headphones for full binaural effect · Set your intention before playing</p>
        </div>

        {/* Nature toggle bar */}
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleNature}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm transition-all"
            style={{
              borderColor: natureOn ? "#34d39970" : "#ffffff25",
              background: natureOn ? "#10b98115" : "transparent",
              color: natureOn ? "#34d399" : "#ffffff60"
            }}
          >
            {natureOn ? "🌿 Amazon + Ocean Ambience: ON" : "🎧 Add Nature Ambience"}
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={{
                borderColor: category === cat ? "#ffffff50" : "#ffffff15",
                background: category === cat ? "#ffffff15" : "transparent",
                color: category === cat ? "#fff" : "#ffffff50"
              }}
            >
              {CATEGORY_META[cat]?.emoji} {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* TRACK LIST */}
          <div className="lg:col-span-2 space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filtered.map((track) => {
              const m = CATEGORY_META[track.category];
              const isActive = selected?.id === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => { setSelected(track); stopAll(); }}
                  className="w-full text-left px-4 py-3 rounded-xl border transition-all"
                  style={isActive && m
                    ? { borderColor: m.glow + "70", background: m.glow + "12" }
                    : { borderColor: "#ffffff15", background: "#ffffff05" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{m?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white/90 truncate">
                        {track.name.split("—")[1]?.trim() || track.name}
                      </div>
                      <div className="text-xs text-white/40">{track.frequency_hz} Hz · {track.category}</div>
                    </div>
                    {isActive && playing && (
                      <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: m?.glow }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* PLAYER */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className={`rounded-3xl bg-gradient-to-br ${meta?.bg || "from-gray-900 to-gray-800"} border border-white/15 p-8`}
                  style={{ boxShadow: `0 0 60px ${meta?.glow || "#fff"}20` }}
                >
                  {/* Pulsing visual */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      {playing && [1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${meta?.glow}40` }}
                          animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                        />
                      ))}
                      <div
                        className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black"
                        style={{
                          background: `radial-gradient(circle, ${meta?.glow}30, ${meta?.glow}08)`,
                          border: `2px solid ${meta?.glow}60`
                        }}
                      >
                        {meta?.emoji}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-5xl font-black mb-1" style={{ color: meta?.glow }}>
                      {selected.frequency_hz} Hz
                    </div>
                    <div className="text-xl font-semibold text-white/90 mb-1">
                      {selected.name.split("—")[1]?.trim() || selected.name}
                    </div>
                    <div className="text-xs text-white/40 mb-3">{selected.category} · {selected.vibration_pattern} · {selected.duration_minutes} min</div>
                    <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto">{selected.benefit}</p>
                  </div>

                  {/* Affirmation reveal */}
                  <AnimatePresence>
                    {affirmationVisible && selected.affirmation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center mb-5 px-4 py-3 rounded-2xl border"
                        style={{ borderColor: meta?.glow + "30", background: meta?.glow + "08" }}
                      >
                        <div className="text-xs text-white/40 mb-1">✦ Your Affirmation</div>
                        <div className="italic text-white/80 text-sm font-medium">"{selected.affirmation}"</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <button
                      onClick={() => {
                        const idx = tracks.indexOf(selected);
                        if (idx > 0) { setSelected(tracks[idx - 1]); stopAll(); }
                      }}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
                    >⏮</button>

                    <motion.button
                      onClick={playing ? stopAll : startPlaying}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black transition-all shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${meta?.glow}, ${meta?.glow}99)`,
                        boxShadow: playing ? `0 0 40px ${meta?.glow}60` : `0 0 20px ${meta?.glow}30`,
                        color: "#000"
                      }}
                    >
                      {playing ? "⏸" : "▶"}
                    </motion.button>

                    <button
                      onClick={() => {
                        const idx = tracks.indexOf(selected);
                        if (idx < tracks.length - 1) { setSelected(tracks[idx + 1]); stopAll(); }
                      }}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
                    >⏭</button>
                  </div>

                  {/* Timer */}
                  {playing && (
                    <div className="text-center mb-4">
                      <span className="text-white/40 text-sm">{formatTime(elapsed)} playing</span>
                    </div>
                  )}

                  {/* Volume */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-white/40 text-sm">🔈</span>
                    <input
                      type="range" min="0" max="1" step="0.01" value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none"
                      style={{ accentColor: meta?.glow }}
                    />
                    <span className="text-white/40 text-sm">🔊</span>
                  </div>

                  {/* Waveform selector */}
                  <div className="flex gap-2 justify-center">
                    {["sine", "triangle", "square", "sawtooth"].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWaveform(w)}
                        className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                        style={{
                          borderColor: waveform === w ? meta?.glow + "80" : "#ffffff20",
                          background: waveform === w ? meta?.glow + "20" : "transparent",
                          color: waveform === w ? meta?.glow : "#ffffff50"
                        }}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

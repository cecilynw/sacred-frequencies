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

// Web Audio API tone generator
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
  // Left ear: base frequency
  const leftOsc = audioCtx.createOscillator();
  const leftGain = audioCtx.createGain();
  const leftPanner = audioCtx.createStereoPanner();
  leftPanner.pan.value = -1;
  leftOsc.connect(leftGain);
  leftGain.connect(leftPanner);
  leftPanner.connect(audioCtx.destination);
  leftOsc.frequency.value = baseFreq;
  leftOsc.type = "sine";
  leftGain.gain.setValueAtTime(0, audioCtx.currentTime);
  leftGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2);

  // Right ear: base + beat frequency
  const rightOsc = audioCtx.createOscillator();
  const rightGain = audioCtx.createGain();
  const rightPanner = audioCtx.createStereoPanner();
  rightPanner.pan.value = 1;
  rightOsc.connect(rightGain);
  rightGain.connect(rightPanner);
  rightPanner.connect(audioCtx.destination);
  rightOsc.frequency.value = baseFreq + beatFreq;
  rightOsc.type = "sine";
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

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    FrequencyTrack.list().then((data) => {
      setTracks(data);
      if (data.length > 0) setSelected(data.find((t) => t.is_featured) || data[0]);
    });
  }, []);

  const stopAll = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try {
        if (n.gainNode) {
          n.gainNode.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        }
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
  }, []);

  const startPlaying = useCallback(() => {
    if (!selected) return;
    stopAll();

    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    const freq = selected.frequency_hz;
    const pattern = selected.vibration_pattern;
    const nodes = [];

    if (pattern === "Binaural") {
      const b = getBinaural(audioCtxRef.current, Math.min(freq, 500), freq > 20 ? 7.83 : freq);
      b.leftOsc.start();
      b.rightOsc.start();
      nodes.push(b);
    } else {
      const wf = waveform;
      const t = createTone(audioCtxRef.current, freq, wf);
      t.oscillator.start();
      nodes.push(t);

      // Add subtle harmonic overtone
      if (freq < 2000) {
        const t2 = createTone(audioCtxRef.current, freq * 2, "sine");
        t2.gainNode.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        t2.gainNode.gain.linearRampToValueAtTime(0.05, audioCtxRef.current.currentTime + 2);
        t2.oscillator.start();
        nodes.push(t2);
      }
    }

    nodesRef.current = nodes;
    startTimeRef.current = Date.now();
    setPlaying(true);

    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, [selected, waveform, stopAll]);

  useEffect(() => {
    return () => { stopAll(); };
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const meta = selected ? CATEGORY_META[selected.category] : null;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-amber-300 to-violet-300 bg-clip-text text-transparent">
          🎵 Sacred Frequency Player
        </h1>
        <p className="text-center text-white/40 mb-10">Use headphones for binaural beats. Set your intention before playing.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* TRACK LIST */}
          <div className="lg:col-span-2 space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
            {tracks.map((track) => {
              const m = CATEGORY_META[track.category];
              const isActive = selected?.id === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => { setSelected(track); stopAll(); }}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    isActive ? "border-white/30 bg-white/10" : "border-white/10 bg-white/4 hover:bg-white/7"
                  }`}
                  style={isActive && m ? { borderColor: m.glow + "70", background: m.glow + "12" } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{m?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white/90 truncate">{track.name.split("—")[1]?.trim() || track.name}</div>
                      <div className="text-xs text-white/40">{track.frequency_hz} Hz · {track.duration_minutes} min</div>
                    </div>
                    {isActive && playing && (
                      <motion.div
                        className="w-2 h-2 rounded-full"
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
                  {/* Pulsing circle */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      {playing && (
                        <>
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 rounded-full"
                              style={{ border: `1px solid ${meta?.glow}40` }}
                              animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.5, 0] }}
                              transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                            />
                          ))}
                        </>
                      )}
                      <div
                        className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black"
                        style={{ background: `radial-gradient(circle, ${meta?.glow}30, ${meta?.glow}08)`, border: `2px solid ${meta?.glow}60` }}
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
                    <div className="text-sm text-white/50 mb-4">{selected.benefit}</div>
                    <div className="italic text-sm text-white/40">"{selected.affirmation}"</div>
                  </div>

                  {/* Timer */}
                  <div className="text-center mb-6">
                    <span className="text-2xl font-mono text-white/70">{formatTime(elapsed)}</span>
                    <span className="text-white/30 mx-2">/</span>
                    <span className="text-white/40 text-lg">{formatTime(selected.duration_minutes * 60)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      onClick={() => {
                        const idx = tracks.findIndex((t) => t.id === selected.id);
                        if (idx > 0) { setSelected(tracks[idx - 1]); stopAll(); }
                      }}
                      className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white/70"
                    >⏮</button>

                    <button
                      onClick={playing ? stopAll : startPlaying}
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all hover:scale-105"
                      style={{ background: meta?.glow, boxShadow: `0 0 30px ${meta?.glow}60` }}
                    >
                      {playing ? "⏸" : "▶"}
                    </button>

                    <button
                      onClick={() => {
                        const idx = tracks.findIndex((t) => t.id === selected.id);
                        if (idx < tracks.length - 1) { setSelected(tracks[idx + 1]); stopAll(); }
                      }}
                      className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white/70"
                    >⏭</button>
                  </div>

                  {/* Waveform selector */}
                  <div className="flex justify-center gap-2 mb-4">
                    {["sine", "triangle", "sawtooth", "square"].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWaveform(w)}
                        className={`px-3 py-1 text-xs rounded-full border transition-all ${waveform === w ? "border-white/40 bg-white/15 text-white" : "border-white/15 text-white/40 hover:text-white/70"}`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>

                  {/* Info row */}
                  <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                    {[
                      ["Chakra", selected.chakra || "—"],
                      ["Pattern", selected.vibration_pattern],
                      ["Energy", selected.color_energy || "—"],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-black/30 rounded-xl p-3">
                        <div className="text-xs text-white/40 mb-0.5">{label}</div>
                        <div className="text-sm font-semibold text-white/80">{val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-black/20 rounded-xl text-sm text-white/50 leading-relaxed">
                    {selected.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-950/30 border border-amber-700/30 rounded-xl text-center text-amber-200/60 text-sm">
          🎧 <strong>Tip:</strong> Use stereo headphones for binaural beats. Find a quiet space, close your eyes, set a clear intention, and let the frequency do its work.
        </div>
      </div>
    </div>
  );
}

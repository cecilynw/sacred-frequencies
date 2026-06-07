import { useState, useEffect, useRef, useCallback } from "react";
import { FrequencyTrack } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";

const ANGEL_META = {
  111:  { meaning: "New Beginnings", message: "Your thoughts are manifesting — keep them positive", symbol: "✦", color: "#ffffff", glow: "#fffde7" },
  222:  { meaning: "Balance & Trust", message: "Keep the faith — everything is falling into place", symbol: "⚖", color: "#f9a8d4", glow: "#f472b6" },
  333:  { meaning: "Ascended Masters", message: "You are surrounded by divine support and guidance", symbol: "△", color: "#fcd34d", glow: "#fbbf24" },
  444:  { meaning: "Angelic Protection", message: "Angels surround you — you are completely safe", symbol: "◈", color: "#fde68a", glow: "#f59e0b" },
  555:  { meaning: "Major Change", message: "Massive transformation is coming — welcome it", symbol: "⚡", color: "#67e8f9", glow: "#06b6d4" },
  666:  { meaning: "Rebalance", message: "Refocus your thoughts — align your mind with your heart", symbol: "♡", color: "#fda4af", glow: "#fb7185" },
  777:  { meaning: "Divine Luck", message: "You are on the perfect path — miracles align for you", symbol: "✪", color: "#c4b5fd", glow: "#8b5cf6" },
  888:  { meaning: "Infinite Abundance", message: "Financial rewards and abundance flow to you now", symbol: "∞", color: "#6ee7b7", glow: "#10b981" },
  999:  { meaning: "Completion", message: "A karmic cycle completes — prepare for your calling", symbol: "◯", color: "#fca5a5", glow: "#ef4444" },
  1111: { meaning: "Manifestation Portal", message: "Make a wish — your thoughts write directly into reality", symbol: "⟡", color: "#e2e8f0", glow: "#f8fafc" },
  1212: { meaning: "Spiritual Growth", message: "Stay positive — your awakening accelerates now", symbol: "↑↑", color: "#a5b4fc", glow: "#818cf8" },
  1234: { meaning: "Divine Steps", message: "Trust the process — you are progressing perfectly", symbol: "1→", color: "#86efac", glow: "#4ade80" },
  2222: { meaning: "Master Builder", message: "Build your legacy — the universe supports your vision", symbol: "⊞", color: "#e5e7eb", glow: "#d1d5db" },
  3333: { meaning: "Trinity Activation", message: "Body, mind, and spirit align at the highest octave", symbol: "⁂", color: "#fde68a", glow: "#fbbf24" },
  4444: { meaning: "Celestial Fortress", message: "Four layers of angelic armor surround you completely", symbol: "⬡", color: "#fcd34d", glow: "#f59e0b" },
  5555: { meaning: "Quantum Leap", message: "A total reality shift — leap into your highest timeline", symbol: "⚡⚡", color: "#f8fafc", glow: "#ffffff" },
  6666: { meaning: "Unconditional Love", message: "Your heart radiates love that transforms all it touches", symbol: "❋", color: "#f9a8d4", glow: "#ec4899" },
  7777: { meaning: "Supreme Sacred Luck", message: "Maximum divine fortune — miracles surround you", symbol: "✦✦", color: "#fde68a", glow: "#fbbf24" },
  8888: { meaning: "Infinite Financial Mastery", message: "All channels of abundance open simultaneously now", symbol: "∞∞", color: "#6ee7b7", glow: "#10b981" },
  9999: { meaning: "Ascension & Soul Graduation", message: "All karmic cycles complete — you ascend into pure light", symbol: "☽○☾", color: "#f1f5f9", glow: "#ffffff" },
};

function createAngelTone(audioCtx, frequency) {
  const nodes = [];

  // Primary tone
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.type = "sine";
  osc1.frequency.value = Math.min(frequency, 2000);
  gain1.gain.setValueAtTime(0, audioCtx.currentTime);
  gain1.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 2);
  osc1.start();
  nodes.push({ osc: osc1, gain: gain1 });

  // Sub-harmonic (frequency/2 or /3 for high freqs)
  if (frequency > 500) {
    const subFreq = frequency / Math.ceil(frequency / 500);
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.type = "sine";
    osc2.frequency.value = subFreq;
    gain2.gain.setValueAtTime(0, audioCtx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 2);
    osc2.start();
    nodes.push({ osc: osc2, gain: gain2 });
  }

  // Celestial shimmer overtone
  const shimFreq = Math.min(frequency * 1.5, 3000);
  const osc3 = audioCtx.createOscillator();
  const gain3 = audioCtx.createGain();
  osc3.connect(gain3);
  gain3.connect(audioCtx.destination);
  osc3.type = "triangle";
  osc3.frequency.value = shimFreq;
  gain3.gain.setValueAtTime(0, audioCtx.currentTime);
  gain3.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 3);
  osc3.start();
  nodes.push({ osc: osc3, gain: gain3 });

  return nodes;
}

export default function AngelNumbers() {
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [selected, setSelected] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    FrequencyTrack.list().then((all) => {
      const angels = all.filter((t) => ANGEL_META[Math.round(t.frequency_hz)]);
      angels.sort((a, b) => a.frequency_hz - b.frequency_hz);
      setTracks(angels);
    });
    return () => stopAll();
  }, []);

  const stopAll = useCallback(() => {
    nodesRef.current.forEach(({ osc, gain }) => {
      try {
        if (audioCtxRef.current) {
          gain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.2);
          setTimeout(() => { try { osc.stop(); } catch {} }, 1300);
        }
      } catch {}
    });
    nodesRef.current = [];
    clearInterval(timerRef.current);
    setPlaying(null);
    setElapsed(0);
  }, []);

  const play = useCallback((track) => {
    stopAll();
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();

    const nodes = createAngelTone(audioCtxRef.current, track.frequency_hz);
    nodesRef.current = nodes;
    setPlaying(track.id);
    setSelected(track);
    startRef.current = Date.now();

    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
  }, [stopAll]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const angelHz = selected ? Math.round(selected.frequency_hz) : null;
  const activeMeta = angelHz ? ANGEL_META[angelHz] : null;

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* HERO */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="text-6xl mb-4">⟡</div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-amber-300 via-white to-violet-300 bg-clip-text text-transparent">
            Angel Number Frequencies
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every angel number carries a divine message AND a sonic frequency. 
            Play the tone while holding the message in your heart to amplify its power thousandfold.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* ACTIVE PLAYER BAR */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sticky top-16 z-40 mb-8 rounded-2xl p-4 flex items-center gap-4 border backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${activeMeta?.glow}15, #030712cc)`,
                borderColor: activeMeta?.glow + "50",
                boxShadow: `0 0 40px ${activeMeta?.glow}25`,
              }}
            >
              {/* Pulsing orb */}
              <div className="relative flex-shrink-0">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${activeMeta?.glow}50` }}
                    animate={{ scale: [1, 1.8 + i * 0.4], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.9 }}
                  />
                ))}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black"
                  style={{ background: activeMeta?.glow + "20", border: `2px solid ${activeMeta?.glow}60`, color: activeMeta?.glow }}
                >
                  {activeMeta?.symbol}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-black text-lg" style={{ color: activeMeta?.glow }}>
                  {Math.round(selected.frequency_hz)} Hz — {activeMeta?.meaning}
                </div>
                <div className="text-sm text-white/50 truncate italic">"{activeMeta?.message}"</div>
              </div>

              <div className="text-white/50 font-mono text-sm">{formatTime(elapsed)}</div>

              <button
                onClick={stopAll}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/10 transition-colors"
              >
                ⏹ Stop
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GRID OF ANGEL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tracks.map((track, i) => {
            const hz = Math.round(track.frequency_hz);
            const meta = ANGEL_META[hz];
            if (!meta) return null;
            const isPlaying = playing === track.id;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="relative rounded-2xl border overflow-hidden cursor-pointer group"
                style={{
                  background: `radial-gradient(ellipse at top, ${meta.glow}12, #0a0a0f)`,
                  borderColor: isPlaying ? meta.glow + "80" : meta.glow + "25",
                  boxShadow: isPlaying ? `0 0 40px ${meta.glow}35` : "none",
                  transition: "all 0.3s ease",
                }}
                onClick={() => isPlaying ? stopAll() : play(track)}
              >
                {/* Angel number big display */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div
                        className="text-4xl font-black tracking-tight"
                        style={{ color: meta.glow, textShadow: `0 0 20px ${meta.glow}60` }}
                      >
                        {hz}
                      </div>
                      <div className="text-xs text-white/40 font-mono mt-0.5">Hz</div>
                    </div>
                    <div
                      className="text-3xl"
                      style={{ color: meta.glow, opacity: 0.8 }}
                    >
                      {meta.symbol}
                    </div>
                  </div>

                  <div className="font-bold text-white/90 text-sm mb-1">{meta.meaning}</div>
                  <p className="text-xs text-white/45 italic leading-relaxed mb-4">
                    "{meta.message}"
                  </p>

                  <div className="text-xs text-white/35 mb-1">
                    ◈ {track.chakra}
                  </div>
                  <div className="text-xs text-white/35 mb-4">
                    ✦ {track.vibration_pattern} · {track.duration_minutes} min
                  </div>

                  <div className="italic text-xs text-white/30 border-t border-white/8 pt-3 line-clamp-2">
                    "{track.affirmation}"
                  </div>
                </div>

                {/* Play button */}
                <div className="px-5 pb-5">
                  <div
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-center transition-all"
                    style={{
                      background: isPlaying ? meta.glow + "30" : meta.glow + "15",
                      color: meta.glow,
                      border: `1px solid ${meta.glow}40`,
                    }}
                  >
                    {isPlaying ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                        >●</motion.span>
                        Playing {formatTime(elapsed)}
                      </span>
                    ) : (
                      "▶ Activate Frequency"
                    )}
                  </div>
                </div>

                {/* Playing shimmer border */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ border: `1px solid ${meta.glow}60` }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* GUIDE SECTION */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-bold text-lg mb-3 text-white/90">How to Use Angel Frequencies</h3>
            <ol className="space-y-2 text-sm text-white/55">
              {[
                "Find a quiet space. Use headphones if possible.",
                "Notice which number you've been seeing — start there.",
                "Before pressing play, read the angel message slowly.",
                "Close your eyes and speak your affirmation aloud.",
                "Press play and breathe deeply for the full duration.",
                "Hold the feeling of the message as you listen.",
                "Journal what you receive — insights, feelings, visions.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-400 font-bold min-w-[20px]">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">⟡</div>
            <h3 className="font-bold text-lg mb-3 text-white/90">The Science of Angel Numbers</h3>
            <p className="text-sm text-white/55 mb-3 leading-relaxed">
              Numerology teaches that numbers carry specific vibrational signatures that interact with the quantum field of consciousness. When a number appears repeatedly in your life — on clocks, receipts, license plates — it is a synchronistic signal from your higher self or the universe.
            </p>
            <p className="text-sm text-white/55 mb-3 leading-relaxed">
              By listening to the <em>actual frequency in Hz</em> matching each angel number, you're not just reading the message — you're <em>becoming</em> it. Sound bypasses the analytical mind and directly entrains your nervous system, cellular field, and bioelectric aura.
            </p>
            <p className="text-sm text-white/55 leading-relaxed">
              The result: faster manifestation, deeper alignment, and a body that resonates with the divine message at every level — physical, emotional, mental, and spiritual.
            </p>
          </div>
        </div>

        {/* Sequence ritual */}
        <div className="mt-8 bg-gradient-to-br from-violet-950/50 to-indigo-950/30 border border-violet-600/30 rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-2 text-white/90">🌟 The Angel Number Ascension Sequence</h3>
          <p className="text-white/50 text-sm mb-5">Play these six frequencies in order for a complete energetic upgrade — from grounding to ascension.</p>
          <div className="flex flex-wrap gap-3">
            {[444, 528, 777, 888, 1111, 9999].map((n) => {
              const m = ANGEL_META[n];
              return (
                <div
                  key={n}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm"
                  style={{ borderColor: m?.glow + "40", background: m?.glow + "10", color: m?.glow }}
                >
                  <span>{m?.symbol}</span>
                  <span className="font-bold">{n} Hz</span>
                  <span className="text-white/40 text-xs">— {m?.meaning}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-white/35 italic">5–10 minutes per frequency · Use headphones · Set your ascension intention before beginning</p>
        </div>
      </div>
    </div>
  );
}

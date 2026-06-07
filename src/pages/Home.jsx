import { useState, useEffect } from "react";
import { FrequencyTrack } from "@/api/entities";
import { motion } from "framer-motion";
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

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FrequencyTrack.list("-play_count").then((data) => {
      setTracks(data);
      setFeatured(data.filter((t) => t.is_featured));
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === "All"
    ? tracks
    : tracks.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* HERO */}
      <div className="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/20 via-[#030712]/40 to-[#030712]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="text-5xl mb-4">✦</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent leading-tight">
              Sacred Frequencies
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-2 font-light">
              Sound & Vibration Healing for Body, Mind & Spirit
            </p>
            <p className="text-base text-white/50 mb-8 max-w-2xl mx-auto">
              Harness Solfeggio tones, angel number frequencies, Schumann resonance & sacred Hz
              to cleanse negative energy, activate DNA, and align with abundance, longevity & love.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mb-8"
          >
            {Object.entries(CATEGORY_META).map(([cat, meta]) => (
              <div key={cat} className="text-center">
                <div className="text-2xl">{meta.emoji}</div>
                <div className="text-xs text-white/60 mt-1">{cat}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Player")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-amber-500/30">
              🎵 Open Player
            </Link>
            <Link to={createPageUrl("AngelNumbers")}
              className="px-8 py-3 rounded-full border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-colors">
              ⟡ Angel Numbers
            </Link>
            <Link to={createPageUrl("Rituals")}
              className="px-8 py-3 rounded-full border border-white/20 text-white/70 font-semibold text-lg hover:bg-white/10 transition-colors">
              🌙 Rituals
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ANGEL NUMBERS TEASER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-white to-violet-300 bg-clip-text text-transparent">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: "🧬", title: "Longevity & Health", desc: "Repair DNA, regenerate cells, and activate your body's innate healing intelligence through precisely calibrated frequencies." },
            { icon: "💎", title: "Wealth & Abundance", desc: "Dissolve scarcity programming with 888 Hz, 8888 Hz and golden frequencies that align you with infinite prosperity." },
            { icon: "🌍", title: "Nature Alignment", desc: "Sync with Earth's 7.83 Hz Schumann Resonance and 432 Hz universal tuning to restore natural harmony and peace." },
            { icon: "❤️", title: "Love & Relationships", desc: "Open your heart with 639 Hz and 528 Hz. Attract soul partnerships with 222 Hz divine balance." },
            { icon: "🔮", title: "Cleanse & Clear", desc: "Remove negative energy, ancestral trauma, and karmic cycles using 396, 417, 741, 999, and 9999 Hz." },
            { icon: "⟡", title: "Angel Alignment", desc: "Activate the power of every angel number as a living sonic frequency — manifest faster with 1111 Hz portal." },
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
            >
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-white/90">{b.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ALL FREQUENCIES */}
        <div>
          <h2 className="text-3xl font-bold mb-2 text-center text-white/90">🎶 Full Frequency Library</h2>
          <p className="text-white/50 text-center mb-6">40 sacred tones across 7 healing dimensions</p>
          <CategoryFilter
            categories={["All", ...Object.keys(CATEGORY_META)]}
            active={activeCategory}
            onChange={setActiveCategory}
            meta={CATEGORY_META}
          />
          {loading ? (
            <div className="text-center py-20 text-white/40">Loading frequencies…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {filtered.map((track, i) => (
                <FrequencyCard key={track.id} track={track} meta={CATEGORY_META[track.category]} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-16 py-8 text-center text-white/30 text-sm">
        <p>✦ Sacred Frequencies — Healing through sound for Body, Mind & Spirit ✦</p>
        <p className="mt-1">For wellness and intention purposes only.</p>
      </footer>
    </div>
  );
}

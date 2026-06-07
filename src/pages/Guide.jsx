import { motion } from "framer-motion";

const FREQUENCIES = [
  { hz: "174", name: "Foundation & Pain Relief", color: "#ef4444", category: "Body", info: "The lowest Solfeggio frequency, a natural anesthetic. Reduces physical and energetic pain, gives organs a sense of security, encourages deep healing." },
  { hz: "285", name: "Tissue Regeneration", color: "#f97316", category: "Body", info: "Sends energy fields a message to restructure and regenerate damaged organs. Heals wounds, burns, and damaged tissue. Leaves the body energized." },
  { hz: "396", name: "Liberation from Fear & Guilt", color: "#ef4444", category: "Cleansing", info: "Liberates energy, cleanses guilt — one of the primary obstacles to achieving goals. Turns grief and suffering into joy." },
  { hz: "417", name: "Transmutation of Negativity", color: "#2dd4bf", category: "Cleansing", info: "Facilitates change, wipes out negativity, removes negative energy from the body. Helps reconnect with inner guidance." },
  { hz: "432", name: "Universal Harmony", color: "#34d399", category: "Nature", info: "Mathematically consistent with the patterns of the universe. Creates peace and well-being, enhances clarity, aligns the body with nature's own vibration." },
  { hz: "528", name: "DNA Repair & Love Frequency", color: "#fbbf24", category: "Body", info: "Known as the 'Miracle Tone'. Used by geneticists to repair broken DNA. Associated with transformation, healing, and restoration to the natural state." },
  { hz: "639", name: "Harmonious Relationships", color: "#f472b6", category: "Love", info: "Enables harmonious community and relationships. Enhances communication, understanding, tolerance, and love. Repairs broken bonds." },
  { hz: "741", name: "Detox & Intuition", color: "#2dd4bf", category: "Cleansing", info: "Cleanses cells from electromagnetic radiation. Awakening and problem-solving. Leads to a pure, stable, and spiritual life." },
  { hz: "852", name: "Spiritual Order", color: "#818cf8", category: "Spirit", info: "Connected to the third eye chakra. Returns to spiritual order. Awakens intuition, raises cell energy, replaces negative with positive thoughts." },
  { hz: "963", name: "Crown & Divine Connection", color: "#a78bfa", category: "Spirit", info: "Known as 'Frequency of Gods'. Awakens systems to perfect original state. Activates pineal gland. Reconnects with spirit and universal oneness." },
  { hz: "7.83", name: "Schumann Resonance", color: "#34d399", category: "Nature", info: "Earth's heartbeat. Restores circadian rhythms, reduces stress hormones, boosts immune function. Fundamental to all biological life on Earth." },
  { hz: "40", name: "Gamma Brain — Longevity", color: "#fff", category: "Mind", info: "Clinical research at MIT shows 40 Hz reduces amyloid plaque (Alzheimer's marker), increases neuroplasticity, sharpens focus, extends cognitive longevity." },
  { hz: "111", name: "Cell Regeneration & Euphoria", color: "#fef3c7", category: "Body", info: "Found in ancient sacred sites. Switches off prefrontal cortex, induces euphoric trance state, releases cell-regenerating hormones including endorphins." },
  { hz: "888", name: "Infinite Abundance", color: "#fbbf24", category: "Wealth", info: "Frequency of infinite abundance. Dissolves scarcity programming. Aligns the energetic field with prosperity consciousness and material manifestation." },
  { hz: "1111", name: "Manifestation Gateway", color: "#fff", category: "Spirit", info: "The angel number frequency — a dimensional gateway. Amplifies intentions, accelerates the law of attraction, links thoughts to physical manifestation." },
];

const SCIENCE = [
  { title: "How Sound Heals", icon: "🔬", content: "Sound waves create mechanical vibrations that travel through all biological tissue. Every organ, bone, and cell has a natural resonant frequency. When exposed to matching frequencies, cells entrain (synchronize), restoring optimal function. This is the principle behind ultrasound therapy in medicine." },
  { title: "Brainwave Entrainment", icon: "🧠", content: "The brain's electrical activity can be influenced by external audio frequencies. Binaural beats — slightly different tones played in each ear — cause the brain to perceive a third 'phantom' beat, entraining brainwaves to match: Theta (4-8 Hz) for meditation, Alpha (8-12 Hz) for relaxation, Gamma (40 Hz) for cognitive enhancement." },
  { title: "DNA & the Solfeggio Scale", icon: "🧬", content: "Dr. Glen Rein's research found that coherent emotions combined with specific sound frequencies had a measurable effect on DNA conformation. The 528 Hz frequency is used by biochemists in their molecular biology work to repair DNA. The entire Solfeggio scale appears to interact with fundamental biological processes." },
  { title: "Schumann Resonance & Life", icon: "🌍", content: "Discovered in 1952, the Schumann resonance (7.83 Hz) is the electromagnetic frequency between the Earth's surface and ionosphere. All mammals evolved with this constant frequency. Research shows that isolating humans from it causes measurable health decline. Grounding (earthing) literally reconnects you to this healing frequency." },
  { title: "Cymatics — Sound Made Visible", icon: "🌀", content: "Cymatics proves that sound physically organizes matter into geometric patterns. Higher frequencies create more complex and beautiful sacred geometry patterns. This is direct proof that sound is not merely perceived — it actively structures the physical world, including biological tissue." },
  { title: "Heart Coherence & Frequency", icon: "❤️", content: "The heart generates a powerful electromagnetic field extending several feet from the body. Research at the HeartMath Institute shows that specific frequencies — particularly 528 Hz and frequencies around 0.1 Hz (heart rate coherence) — synchronize the heart, brain, and nervous system, reducing stress hormones and increasing DHEA (longevity hormone)." },
];

export default function Guide() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-amber-300 bg-clip-text text-transparent">
            📚 The Sacred Science
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            The science, history, and wisdom behind healing frequencies — what they are, how they work, and why they matter.
          </p>
        </div>

        {/* Science Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SCIENCE.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-white/90">{s.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{s.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Frequency Reference */}
        <h2 className="text-3xl font-bold mb-2 text-center text-white/90">🎵 Complete Frequency Reference</h2>
        <p className="text-center text-white/40 mb-8">Every frequency in the library, with its healing purpose and mechanism</p>

        <div className="space-y-3">
          {FREQUENCIES.map((f, i) => (
            <motion.div
              key={f.hz}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex gap-4 bg-white/4 border border-white/8 rounded-xl p-4 hover:bg-white/7 transition-colors"
            >
              <div className="min-w-[70px] text-right">
                <span className="text-xl font-black" style={{ color: f.color }}>{f.hz}</span>
                <span className="text-xs text-white/40 ml-1">Hz</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white/90 text-sm">{f.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{f.category}</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{f.info}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chakra Map */}
        <div className="mt-16 bg-gradient-to-b from-violet-950/50 to-indigo-950/30 border border-violet-700/30 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 via-amber-400 to-violet-400 bg-clip-text text-transparent">
            ◈ Chakra Frequency Map
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Root", hz: "396 / 256", color: "#ef4444", desc: "Security, grounding, survival" },
              { name: "Sacral", hz: "417", color: "#f97316", desc: "Creativity, sexuality, change" },
              { name: "Solar Plexus", hz: "528", color: "#fbbf24", desc: "Power, confidence, identity" },
              { name: "Heart", hz: "432 / 639", color: "#22c55e", desc: "Love, compassion, healing" },
              { name: "Throat", hz: "741", color: "#06b6d4", desc: "Communication, truth, expression" },
              { name: "Third Eye", hz: "852", color: "#6366f1", desc: "Intuition, wisdom, vision" },
              { name: "Crown", hz: "963 / 40", color: "#a78bfa", desc: "Enlightenment, divine connection" },
              { name: "Earth Star", hz: "174 / 7.83", color: "#7c5c3b", desc: "Deep grounding, Earth connection" },
            ].map((c) => (
              <div key={c.name} className="rounded-xl p-4 text-center" style={{ background: c.color + "15", border: `1px solid ${c.color}40` }}>
                <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: c.color }} />
                <div className="font-bold text-sm text-white/90 mb-0.5">{c.name}</div>
                <div className="text-xs font-mono mb-1" style={{ color: c.color }}>{c.hz} Hz</div>
                <div className="text-xs text-white/45">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-white/30 text-xs">
          <p>Sources: Institute of Sound Healing, HeartMath Institute, MIT Picower Institute, Dr. Glen Rein,</p>
          <p>Dr. Joseph Puleo, Cymatics research by Hans Jenny, Schumann (1952), ancient Solfeggio tradition.</p>
        </div>
      </div>
    </div>
  );
}

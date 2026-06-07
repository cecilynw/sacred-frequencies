import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const RITUALS = [
  {
    id: "morning",
    title: "🌅 Morning Activation Ritual",
    subtitle: "Start each day fully aligned",
    duration: "45 min",
    intention: "Awaken your body, clear your mind, and set your energetic tone for the day",
    steps: [
      { time: "5 min", freq: "7.83 Hz", name: "Grounding — Schumann Resonance", desc: "Before rising, lie still and connect to Earth's pulse. Breathe deeply." },
      { time: "10 min", freq: "528 Hz", name: "Morning DNA Activation", desc: "Open your heart and speak your affirmation: 'Today I am reborn. My body is vibrant, my mind is clear.'" },
      { time: "10 min", freq: "432 Hz", name: "Nature Alignment", desc: "Sit in natural light or near a window. Let the universal frequency attune your whole system." },
      { time: "10 min", freq: "396 Hz", name: "Release Fear & Guilt", desc: "Consciously release anything that doesn't belong to today. Let it go." },
      { time: "10 min", freq: "888 Hz", name: "Wealth Activation", desc: "Visualize your abundance flowing in. Feel it as already real." },
    ],
    color: "from-amber-950/80 to-yellow-950/50",
    border: "border-amber-600/30",
    glow: "#fbbf24",
    benefits: ["Boosts cortisol balance", "Sets abundance mindset", "Clears overnight energetic debris", "Activates DNA repair cycle"],
  },
  {
    id: "cleanse",
    title: "🔮 Deep Energetic Cleanse",
    subtitle: "Remove all negativity from your field",
    duration: "60 min",
    intention: "Clear, cleanse, and completely reset your energetic body",
    steps: [
      { time: "10 min", freq: "396 Hz", name: "Root Liberation", desc: "Scan your body for fear, guilt, grief. Breathe into each tension and release." },
      { time: "15 min", freq: "417 Hz", name: "Transmutation of Trauma", desc: "Invite the frequency to enter any stored pain. Allow it to transform, not suppress." },
      { time: "10 min", freq: "741 Hz", name: "Cellular Detox", desc: "Visualize light purging every cell of electromagnetic and emotional toxins." },
      { time: "15 min", freq: "528 Hz", name: "DNA Restoration", desc: "After clearing, fill the newly empty space with love, light, and perfect cellular health." },
      { time: "10 min", freq: "963 Hz", name: "Divine Reconnection", desc: "From a clean and clear state, reconnect with your highest self and divine purpose." },
    ],
    color: "from-teal-950/80 to-cyan-950/50",
    border: "border-teal-500/30",
    glow: "#2dd4bf",
    benefits: ["Eliminates ancestral patterns", "Clears electromagnetic smog", "Releases stored emotional trauma", "Resets your entire energetic field"],
  },
  {
    id: "longevity",
    title: "🧬 Longevity & Body Healing",
    subtitle: "Activate your innate regenerative intelligence",
    duration: "75 min",
    intention: "Accelerate healing, repair DNA, and extend vibrant life",
    steps: [
      { time: "15 min", freq: "174 Hz", name: "Pain Relief & Foundation", desc: "Begin at the lowest Solfeggio. Allow deep physical pain and tension to dissolve." },
      { time: "15 min", freq: "285 Hz", name: "Tissue Regeneration", desc: "Direct awareness to any area of the body needing healing. Visualize cells rebuilding." },
      { time: "15 min", freq: "111 Hz", name: "Cell Euphoria", desc: "Let the ancient 111 Hz frequency trigger your body's natural endorphin release." },
      { time: "15 min", freq: "528 Hz", name: "DNA Miracle Frequency", desc: "The master healer. Breathe into your DNA spiral and feel it repairing perfectly." },
      { time: "15 min", freq: "40 Hz", name: "Gamma Brain Renewal", desc: "Activate neuroplasticity and cognitive longevity. See your brain forming new neural pathways." },
    ],
    color: "from-rose-950/80 to-red-950/50",
    border: "border-rose-500/30",
    glow: "#ef4444",
    benefits: ["DNA repair activation", "Pain relief and cellular healing", "Cognitive longevity boost", "Immune system optimization", "Neuroplasticity enhancement"],
  },
  {
    id: "love",
    title: "💗 Love, Relationships & Heart Opening",
    subtitle: "Expand your capacity to give and receive love",
    duration: "50 min",
    intention: "Open your heart fully and align all relationships with love",
    steps: [
      { time: "10 min", freq: "528 Hz", name: "Love Frequency Foundation", desc: "Feel the miracle tone open your heart. Breathe love into every cell." },
      { time: "15 min", freq: "639 Hz", name: "Heart Harmony", desc: "Bring specific relationships to mind. Send 639 Hz healing to any broken bonds." },
      { time: "10 min", freq: "432 Hz", name: "Unconditional Love Alignment", desc: "Love at the frequency of the universe — boundless, unconditional, infinite." },
      { time: "15 min", freq: "528 + 432 Hz", name: "Love & Nature Fusion", desc: "The supreme blend. Rest in a field of pure love that extends to all living beings." },
    ],
    color: "from-pink-950/80 to-rose-950/50",
    border: "border-pink-500/30",
    glow: "#f472b6",
    benefits: ["Opens heart chakra", "Heals relationship trauma", "Attracts loving experiences", "Deepens self-love", "Radiates love field outward"],
  },
  {
    id: "wealth",
    title: "💎 Wealth & Abundance Activation",
    subtitle: "Reprogram your money mindset at the cellular level",
    duration: "40 min",
    intention: "Dissolve scarcity and open every channel of abundance",
    steps: [
      { time: "10 min", freq: "417 Hz", name: "Scarcity Pattern Clearing", desc: "Release all inherited beliefs about money being hard to get, or that you don't deserve it." },
      { time: "15 min", freq: "888 Hz", name: "Abundance Frequency", desc: "888 — the number of infinite abundance. Feel wealth as your natural birthright." },
      { time: "10 min", freq: "528 Hz", name: "Miracle Manifestation Field", desc: "Your DNA now codes for abundance. Every cell vibrates with prosperity." },
      { time: "5 min", freq: "1111 Hz", name: "Manifestation Gateway", desc: "Set your specific wealth intention through this dimensional gateway. Believe completely." },
    ],
    color: "from-yellow-950/80 to-amber-950/50",
    border: "border-yellow-500/30",
    glow: "#fbbf24",
    benefits: ["Dissolves scarcity programming", "Aligns with prosperity consciousness", "Opens manifestation channels", "Accelerates law of attraction"],
  },
  {
    id: "spirit",
    title: "👁️ Spiritual Awakening & Alignment",
    subtitle: "Connect with your highest divine self",
    duration: "60 min",
    intention: "Activate your spiritual gifts and align with your soul's highest purpose",
    steps: [
      { time: "10 min", freq: "7.83 Hz", name: "Earth Grounding", desc: "Ground deeply before ascending. A high connection needs deep roots." },
      { time: "15 min", freq: "852 Hz", name: "Third Eye Activation", desc: "Focus on the space between your brows. Feel the indigo light expanding." },
      { time: "15 min", freq: "963 Hz", name: "Crown Chakra Opening", desc: "The God frequency. Feel the violet-white light pouring in from above." },
      { time: "10 min", freq: "1111 Hz", name: "Dimensional Gateway", desc: "Enter the gateway of manifestation. Here, your thoughts become reality." },
      { time: "10 min", freq: "432 Hz", name: "Cosmic Reintegration", desc: "Return with divine gifts. Reintegrate with peace, clarity, and purpose." },
    ],
    color: "from-violet-950/80 to-purple-950/50",
    border: "border-violet-500/30",
    glow: "#a78bfa",
    benefits: ["Pineal gland activation", "Third eye opening", "Higher guidance access", "Spiritual gift activation", "Soul purpose alignment"],
  },
];

export default function Rituals() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300 bg-clip-text text-transparent">
            ✦ Healing Rituals
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Complete frequency protocols for total transformation — curated sequences that work synergistically for maximum healing impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RITUALS.map((ritual) => (
            <motion.div
              key={ritual.id}
              layout
              className={`rounded-2xl bg-gradient-to-br ${ritual.color} border ${ritual.border} overflow-hidden`}
              style={{ boxShadow: expanded === ritual.id ? `0 0 50px ${ritual.glow}30` : "none" }}
            >
              <button
                onClick={() => setExpanded(expanded === ritual.id ? null : ritual.id)}
                className="w-full text-left p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{ritual.title}</h2>
                    <p className="text-white/50 text-sm mb-2">{ritual.subtitle}</p>
                    <div className="flex gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">⏱ {ritual.duration}</span>
                    </div>
                  </div>
                  <span className="text-white/40 text-xl mt-1">{expanded === ritual.id ? "↑" : "↓"}</span>
                </div>
              </button>

              <AnimatePresence>
                {expanded === ritual.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="italic text-sm text-white/50 mb-5 border-l-2 pl-3" style={{ borderColor: ritual.glow }}>
                      Intention: {ritual.intention}
                    </div>

                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3">Protocol Sequence</h4>
                    <div className="space-y-3 mb-6">
                      {ritual.steps.map((step, i) => (
                        <div key={i} className="flex gap-3 bg-black/20 rounded-xl p-3">
                          <div className="text-xs text-white/40 font-mono min-w-[45px] pt-0.5">{step.time}</div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold" style={{ color: ritual.glow }}>{step.freq}</span>
                              <span className="text-sm font-semibold text-white/80">{step.name}</span>
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {ritual.benefits.map((b) => (
                        <span key={b} className="text-xs px-3 py-1 rounded-full bg-white/8 text-white/60 border border-white/10">
                          ✓ {b}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={createPageUrl("Player")}
                      className="block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                      style={{ background: ritual.glow + "25", color: ritual.glow, border: `1px solid ${ritual.glow}50` }}
                    >
                      ▶ Open Player to Begin This Ritual
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-violet-950/30 border border-violet-700/30 rounded-2xl text-center">
          <div className="text-4xl mb-3">🙏</div>
          <h3 className="font-bold text-lg mb-2 text-white/90">Before Your Session</h3>
          <p className="text-white/55 text-sm max-w-2xl mx-auto leading-relaxed">
            Find a quiet, comfortable space. Use stereo headphones for binaural beats. Set a clear intention before beginning.
            Drink water before and after. Allow yourself to feel — frequencies work through your emotional and physical body.
            There is no wrong way to experience these tones.
          </p>
        </div>
      </div>
    </div>
  );
}

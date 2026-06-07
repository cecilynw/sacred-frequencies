import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FrequencyCard({ track, meta, index }) {
  if (!meta) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl bg-gradient-to-br ${meta.color} border ${meta.border} p-5 overflow-hidden cursor-pointer group`}
      style={{ boxShadow: `0 0 30px ${meta.glow}18` }}
    >
      {/* glow blob */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: meta.glow }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 inline-block"
              style={{ borderColor: meta.glow + "60", color: meta.glow, background: meta.glow + "15" }}>
              {meta.emoji} {track.category}
            </span>
            <div className="text-3xl font-black text-white/90 leading-none">
              {track.frequency_hz} <span className="text-lg font-semibold text-white/50">Hz</span>
            </div>
          </div>
          <div className="text-right text-white/40 text-xs">
            <div>{track.vibration_pattern}</div>
            <div>{track.duration_minutes} min</div>
          </div>
        </div>

        <h3 className="font-bold text-white/90 text-base mb-1 leading-snug">
          {track.name.split("—")[1]?.trim() || track.name}
        </h3>
        <p className="text-white/55 text-sm mb-3 leading-relaxed line-clamp-2">
          {track.benefit}
        </p>

        {track.chakra && (
          <div className="text-xs text-white/40 mb-3">
            ◈ Chakra: <span className="text-white/60">{track.chakra}</span>
            {track.color_energy && <> · <span className="text-white/60">{track.color_energy}</span></>}
          </div>
        )}

        <div className="italic text-xs text-white/40 border-t border-white/10 pt-3 mt-1">
          "{track.affirmation}"
        </div>

        <Link
          to={`${createPageUrl("Player")}?track=${track.id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: meta.glow + "25", color: meta.glow, border: `1px solid ${meta.glow}40` }}
          onClick={(e) => e.stopPropagation()}
        >
          ▶ Play this frequency
        </Link>
      </div>
    </motion.div>
  );
}

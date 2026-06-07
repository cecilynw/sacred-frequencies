export default function CategoryFilter({ categories, active, onChange, meta }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => {
        const isActive = active === cat;
        const m = meta?.[cat];
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              isActive
                ? "bg-white/15 border-white/40 text-white"
                : "border-white/15 text-white/50 hover:text-white/80 hover:border-white/25"
            }`}
            style={isActive && m ? { borderColor: m.glow + "80", color: m.glow, background: m.glow + "20" } : {}}
          >
            {m ? `${m.emoji} ` : ""}{cat}
          </button>
        );
      })}
    </div>
  );
}

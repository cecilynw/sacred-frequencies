import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

const NAV = [
  { label: "Home",    page: "Home",           icon: "✦"  },
  { label: "Player",  page: "Player",          icon: "🎵" },
  { label: "Vortex",  page: "QuantumVortex",   icon: "🌀" },
  { label: "Grow",    page: "GrowthSound",     icon: "🌱" },
  { label: "Love",    page: "EpigeneticLove",  icon: "💗" },
  { label: "Angels",  page: "AngelNumbers",    icon: "⟡"  },
  { label: "Rituals", page: "Rituals",         icon: "🌙" },
  { label: "Nature",  page: "NaturePortal",    icon: "🌿" },
  { label: "Journal", page: "Journal",         icon: "📓" },
  { label: "Guide",   page: "Guide",           icon: "📚" },
];

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#030712]">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg">✦</span>
            <span className="font-black text-white/90 text-sm tracking-widest hidden sm:block">SACRED FREQUENCIES</span>
          </Link>
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
            {NAV.map((n) => {
              const href = createPageUrl(n.page);
              const active = location.pathname === href || location.pathname.startsWith(href + "/");
              return (
                <Link
                  key={n.page}
                  to={href}
                  className={`px-2 py-1.5 rounded-lg text-sm transition-all whitespace-nowrap ${
                    active ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/8"
                  }`}
                >
                  <span>{n.icon}</span>
                  <span className="hidden xl:inline ml-1">{n.label}</span>
                </Link>
              );
            })}
          </div>
          <Link
            to={createPageUrl("Home")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-400/40 text-amber-300 text-xs font-bold hover:bg-amber-400/10 transition-colors flex-shrink-0 ml-2"
          >
            💎 Upgrade
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

const NAV = [
  { label: "Home", page: "Home", icon: "✦" },
  { label: "Player", page: "Player", icon: "🎵" },
  { label: "Rituals", page: "Rituals", icon: "🌙" },
  { label: "Journal", page: "Journal", icon: "📓" },
  { label: "Guide", page: "Guide", icon: "📚" },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <span className="text-lg">✦</span>
            <span className="font-bold text-white/90 text-sm tracking-wide">SACRED FREQUENCIES</span>
          </Link>
          <div className="flex items-center gap-1">
            {NAV.map((n) => {
              const href = createPageUrl(n.page);
              const active = location.pathname === href || location.pathname.startsWith(href + "/");
              return (
                <Link
                  key={n.page}
                  to={href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    active ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/8"
                  }`}
                >
                  <span className="mr-1">{n.icon}</span>
                  <span className="hidden sm:inline">{n.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}

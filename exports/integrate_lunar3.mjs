import { readFileSync, writeFileSync } from 'fs';
let c = readFileSync('src/pages/IrradiationProtocol.jsx', 'utf8');

const AFTER_BREATH = `        {/* ─── LUNAR PHASE PLAYING ─── */}`;

const bar_before = `        {/* ─── LIVE LUNAR BALANCE BAR ─── */}
        <AnimatePresence>
          {(playing || lunarBalanced) && mode !== "restore" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-5 rounded-2xl border overflow-hidden"
              style={{ borderColor: "#60a5fa22", background: "#060d1a" }}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <motion.span className="text-lg"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}>
                    {LUNAR_RESONANCES[lunarPhaseIdx]?.icon}
                  </motion.span>
                  <span className="text-xs font-black text-white/60 tracking-widest uppercase">
                    Lunar Balance — Solar · Lunar Equilibrium
                  </span>
                  {playing && (
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-1"
                      animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                  )}
                </div>
                <button onClick={() => setShowLunarSci(!showLunarSci)}
                  className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  {showLunarSci ? "hide ▲" : "why? ▼"}
                </button>
              </div>
              <AnimatePresence>
                {showLunarSci && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    className="overflow-hidden border-b border-white/5">
                    <div className="px-4 py-3 text-xs text-white/40 leading-relaxed max-w-2xl">
                      <strong className="text-white/60">Why lunar balance?</strong> The 9 ethers carry solar-masculine irradiation energy. The 4 lunar phases (New Moon 136.10 Hz · Waxing 210.42 Hz · Full Moon 221.23 Hz · Waning 229.22 Hz) are real astronomical frequencies from Hans Cousto. They provide void receptivity, pattern installation, full amplification, and permanent release. <strong className="text-white/60">Solar + Lunar = complete healing.</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid grid-cols-4 divide-x divide-white/5">
                {LUNAR_RESONANCES.map((phase, i) => {
                  const pct = lunarProgress[i] || 0;
                  const isActive = lunarPhaseIdx === i && playing;
                  return (
                    <div key={phase.id} className="px-3 py-3"
                      style={{ background: isActive ? phase.glow + "08" : "transparent" }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1">
                          <span className="text-base">{phase.icon}</span>
                          <span className="text-xs font-bold hidden sm:block"
                            style={{ color: pct > 0 ? phase.glow : "#334155" }}>{phase.phase}</span>
                        </div>
                        <span className="text-xs font-black"
                          style={{ color: pct > 0 ? phase.glow : "#1e293b" }}>{phase.hz}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#0f172a" }}>
                        <motion.div className="h-full rounded-full transition-all duration-500"
                          style={{ background: phase.glow, width: pct + "%" }} />
                      </div>
                      <div className="mt-1 text-white/20" style={{ fontSize: "0.58rem", lineHeight: 1.4 }}>
                        {phase.element}
                      </div>
                      {isActive && playing && (
                        <motion.div className="mt-0.5 font-bold" style={{ color: phase.glow, fontSize: "0.58rem" }}
                          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                          ● active
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
                <div className="text-white/20" style={{ fontSize: "0.65rem" }}>
                  Solar irradiates · Lunar balances · Together: complete healing
                </div>
                <div className="text-xs font-black" style={{
                  color: lunarProgress.every(p => p > 80) ? "#34d399" :
                         lunarProgress.some(p => p > 0)   ? "#fbbf24" : "#334155"
                }}>
                  {lunarProgress.every(p => p > 80) ? "⚖️ Fully balanced" :
                   lunarProgress.some(p => p > 0)   ? "🌙 Balancing…"    : "◌ Awaiting"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        `;

const bar_after = `{/* ─── LUNAR PHASE PLAYING ─── */}`;

c = c.replace(AFTER_BREATH, bar_before + bar_after);
console.log('Live lunar bar:', c.includes('LIVE LUNAR BALANCE BAR') ? '✅' : '❌');
writeFileSync('src/pages/IrradiationProtocol.jsx', c);
console.log('Lines:', c.split('\n').length);

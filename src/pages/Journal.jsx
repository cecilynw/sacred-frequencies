import { useState, useEffect } from "react";
import { HealingSession, FrequencyTrack } from "@/api/entities";
import { motion } from "framer-motion";

const MOODS = ["Anxious", "Low", "Neutral", "Good", "Elevated", "Transformed"];
const MOOD_EMOJI = { Anxious: "😰", Low: "😔", Neutral: "😐", Good: "🙂", Elevated: "😄", Transformed: "🌟" };
const MOOD_COLOR = { Anxious: "#ef4444", Low: "#f97316", Neutral: "#94a3b8", Good: "#22c55e", Elevated: "#60a5fa", Transformed: "#a78bfa" };

export default function Journal() {
  const [sessions, setSessions] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    session_name: "",
    intention: "",
    tracks_used: [],
    duration_minutes: 20,
    mood_before: "Neutral",
    mood_after: "Good",
    notes: "",
    rating: 5,
    date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    HealingSession.list("-created_date").then(setSessions);
    FrequencyTrack.list().then(setTracks);
  }, []);

  const save = async () => {
    setSaving(true);
    await HealingSession.create(form);
    const updated = await HealingSession.list("-created_date");
    setSessions(updated);
    setShowForm(false);
    setForm({ session_name: "", intention: "", tracks_used: [], duration_minutes: 20, mood_before: "Neutral", mood_after: "Good", notes: "", rating: 5, date: new Date().toISOString().split("T")[0] });
    setSaving(false);
  };

  const toggleTrack = (id) => {
    setForm((f) => ({
      ...f,
      tracks_used: f.tracks_used.includes(id) ? f.tracks_used.filter((t) => t !== id) : [...f.tracks_used, id],
    }));
  };

  const avgRating = sessions.length ? (sessions.reduce((a, s) => a + (s.rating || 0), 0) / sessions.length).toFixed(1) : "—";
  const transformedCount = sessions.filter((s) => s.mood_after === "Transformed").length;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-300 to-violet-300 bg-clip-text text-transparent">
            📓 Healing Journal
          </h1>
          <p className="text-white/50">Track your transformation. Your journey is sacred data.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            ["Total Sessions", sessions.length, "🧘"],
            ["Avg. Rating", avgRating + " / 10", "⭐"],
            ["Transformations", transformedCount, "🌟"],
          ].map(([label, val, icon]) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-2xl font-bold text-white/90">{val}</div>
              <div className="text-xs text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-violet-600 font-semibold text-sm hover:scale-105 transition-transform"
          >
            + Log New Session
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/15 rounded-2xl p-6 mb-8"
          >
            <h3 className="font-bold text-lg mb-4 text-white/90">New Healing Session</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Session Name</label>
                <input
                  value={form.session_name}
                  onChange={(e) => setForm((f) => ({ ...f, session_name: e.target.value }))}
                  placeholder="e.g. Morning DNA Activation"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-white/50 mb-1 block">Intention</label>
                <input
                  value={form.intention}
                  onChange={(e) => setForm((f) => ({ ...f, intention: e.target.value }))}
                  placeholder="What did you intend to heal, clear, or activate?"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-2 block">Mood Before</label>
                <div className="flex flex-wrap gap-2">
                  {MOODS.slice(0, 5).map((m) => (
                    <button key={m} onClick={() => setForm((f) => ({ ...f, mood_before: m }))}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${form.mood_before === m ? "border-white/40 bg-white/15" : "border-white/10 text-white/50"}`}>
                      {MOOD_EMOJI[m]} {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-2 block">Mood After</label>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((m) => (
                    <button key={m} onClick={() => setForm((f) => ({ ...f, mood_after: m }))}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${form.mood_after === m ? "border-white/40 bg-white/15" : "border-white/10 text-white/50"}`}>
                      {MOOD_EMOJI[m]} {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Duration (minutes)</label>
                <input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) => setForm((f) => ({ ...f, duration_minutes: +e.target.value }))}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Rating (1–10)</label>
                <input
                  type="range" min="1" max="10"
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: +e.target.value }))}
                  className="w-full mt-2"
                />
                <div className="text-center text-white/60 text-sm">{form.rating} / 10</div>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-white/50 mb-2 block">Frequencies Used</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {tracks.map((t) => (
                    <button key={t.id} onClick={() => toggleTrack(t.id)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${form.tracks_used.includes(t.id) ? "border-emerald-500/60 bg-emerald-900/40 text-emerald-300" : "border-white/10 text-white/40"}`}>
                      {t.frequency_hz} Hz
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-white/50 mb-1 block">Notes & Experiences</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="What did you feel, see, or experience during this session?"
                  rows={3}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={save} disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? "Saving…" : "✓ Save Session"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-xl border border-white/15 text-white/60 text-sm hover:bg-white/5">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Session list */}
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              <div className="text-4xl mb-3">📓</div>
              <p>Your healing journey starts here. Log your first session.</p>
            </div>
          ) : (
            sessions.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white/90">{s.session_name || "Healing Session"}</h3>
                    <div className="text-xs text-white/40 mt-0.5">{s.date} · {s.duration_minutes} min</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">{MOOD_EMOJI[s.mood_after] || "✨"}</div>
                    <div className="text-xs text-white/40">{s.rating}/10</div>
                  </div>
                </div>
                {s.intention && <p className="text-sm text-white/50 italic mb-2">"{s.intention}"</p>}
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{MOOD_EMOJI[s.mood_before]} Before: {s.mood_before}</span>
                  <span>→</span>
                  <span style={{ color: MOOD_COLOR[s.mood_after] }}>{MOOD_EMOJI[s.mood_after]} After: {s.mood_after}</span>
                </div>
                {s.notes && <p className="mt-2 text-sm text-white/50 bg-black/20 rounded-lg p-3">{s.notes}</p>}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

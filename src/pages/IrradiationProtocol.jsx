import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a2503d75150596e1dadce0f/2adfb9b9b_generated_image.png";

// ─────────────────────────────────────────────────────────────────────────────
//  9-ETHER IRRADIATION PROTOCOL — SUPREME RESONANCE EDITION
//
//  Every frequency ABOVE 333 Hz has been elevated to its highest and safest
//  degree for life. Three new Supreme tiers added above the core 9:
//  · 1,296 Hz  — Angelic Threshold (9 × 144 Hz Fibonacci)
//  · 2,160 Hz  — Solar Harmonic (Cosmic light body activation)
//  · 3,168 Hz  — Christ Consciousness Grid (highest safe biological resonance)
//
//  ABOVE-333 ELEVATION PROTOCOL:
//  Every hz > 333 now carries:
//  · Its primary tone at full resonance
//  · Sub-octave anchor (hz / 2) for deep biological penetration
//  · Golden-ratio overtone (hz × 1.618) — nature's irradiation shimmer
//  · 528 Hz love carrier — safety seal on every layer
//  · 7.83 Hz Schumann — earth-grounding on every layer
//  · Violet flame (417 Hz shaped) — transmutation on every layer
//  · Fibonacci harmonic series at the specific hz
// ─────────────────────────────────────────────────────────────────────────────

// ── SUPREME RESONANCE TABLE — highest safe hz for each biological purpose ──
const SUPREME_HZ = {
  // Below 333 — irradiation base (unchanged)
  dissolve:     174,   // physical dissolution
  rife:         333,   // cellular irradiation (Rife peak)

  // 333–528 — the healing corridor
  liberation:   396,   // guilt/fear liberation (Solfeggio)
  transmutation: 417,  // change / violet flame (Solfeggio)
  love_miracle:  528,  // DNA miracle / love (Solfeggio — peak safe healing)

  // 528–741 — the heart-throat bridge
  heart_harmony: 639,  // relationships / heart toroid (Solfeggio)
  detox:         741,  // cellular detox / intuition (Solfeggio)

  // 741–963 — the upper Solfeggio triad
  third_eye:     852,  // spiritual order / third eye (Solfeggio)
  god_freq:      963,  // pineal / crown / divine (Solfeggio)

  // 963–1296 — the angelic threshold corridor
  manifest:     1111,  // manifestation portal / angel gateway
  angelic:      1296,  // 9 × 144 — pure angelic resonance — NEW

  // 1296–2160 — solar / cosmic body
  solar:        2160,  // solar harmonic — light body activation — NEW

  // 2160+ — Christ consciousness ceiling (highest safe for human biology)
  christ_grid:  3168,  // Christ consciousness grid — supreme safe ceiling — NEW
};

const INTENSITY_LEVELS = [
  { id: "gentle",   label: "Gentle",   icon: "🌱", vol: 0.13, desc: "Children, animals, highly sensitive beings",   rampTime: 6 },
  { id: "standard", label: "Standard", icon: "✦",  vol: 0.19, desc: "Most adults — balanced and deeply effective",  rampTime: 3.5 },
  { id: "maximum",  label: "Maximum",  icon: "⚡", vol: 0.26, desc: "Deep clearing of severe or chronic conditions", rampTime: 2 },
];

const BEINGS = [
  { id: "self",     label: "Myself",       icon: "🧍", hz_mod: 1.00, desc: "Personal full-body irradiation" },
  { id: "family",   label: "My Family",    icon: "👨‍👩‍👧", hz_mod: 1.00, desc: "Extend the field to all family members" },
  { id: "child",    label: "Child",        icon: "👶", hz_mod: 1.10, desc: "Gentle higher-octave irradiation" },
  { id: "elder",    label: "Elder",        icon: "🧓", hz_mod: 0.90, desc: "Slower, deeper irradiation" },
  { id: "pregnant", label: "Pregnant",     icon: "🤰", hz_mod: 1.05, desc: "Mother + child field, extra gentle" },
  { id: "dog",      label: "Dog",          icon: "🐕", hz_mod: 0.85, desc: "Canine-tuned irradiation field" },
  { id: "cat",      label: "Cat",          icon: "🐈", hz_mod: 0.95, desc: "Feline-tuned irradiation field" },
  { id: "horse",    label: "Horse",        icon: "🐎", hz_mod: 0.70, desc: "Equine-tuned irradiation field" },
  { id: "bird",     label: "Bird",         icon: "🐦", hz_mod: 1.15, desc: "Avian-tuned irradiation field" },
  { id: "reptile",  label: "Reptile",      icon: "🦎", hz_mod: 0.80, desc: "Reptilian frequency tuning" },
  { id: "plant",    label: "Plant / Tree", icon: "🌿", hz_mod: 0.60, desc: "Plant kingdom — root frequency" },
  { id: "everyone", label: "All Beings",   icon: "🌍", hz_mod: 1.00, desc: "Universal broadcast — all life simultaneously" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  THE 9 ETHERS — SUPREME RESONANCE ABOVE 333 Hz
// ─────────────────────────────────────────────────────────────────────────────
const IRRADIATION_SEQUENCE = [
  {
    ether: 1, name: "Physical Layer",   icon: "🔴", color: "#fca5a5", glow: "#ef4444",
    hz: 174,  subHz: 40,   overtoneHz: 348,  beatHz: 2,
    supremeHz: null,
    waveform: "sine", chakra: "Root · Earth Star",
    tier: "BASE",
    action:     "Penetrating physical tissue — dissolving masses, knots & density",
    irradiates: "Physical parasites, tissue masses, cellular congestion, bone spurs, crystallised toxins, heavy metals",
    mechanism:  "174 Hz — the lowest Solfeggio — operates on the body's crystalline matrix. Collapses the quantum wave-function of pain. Dissolves physical entanglement back into coherent flow. Sub-bass 40 Hz gamma activates microglial repair simultaneously.",
    safetyNote: "Deepest biological penetration. Felt as warmth and vibration in bone and tissue.",
    duration: 20,
    affirmation: "Every physical blockage, every mass, every uninvited organism in my body dissolves now into perfect light.",
  },
  {
    ether: 2, name: "Cellular Layer",   icon: "🟠", color: "#fdba74", glow: "#f97316",
    hz: 333,  subHz: 111,  overtoneHz: 666,  beatHz: 3,
    supremeHz: null,
    waveform: "sine", chakra: "Sacral · Hara",
    tier: "BASE",
    action:     "Rife resonance irradiation — shattering pathogens at their mortal oscillatory rate",
    irradiates: "Parasitic worms, flukes, bacteria, fungi, viral loads, Candida, Lyme spirochetes, mould spores",
    mechanism:  "Royal Rife (1934): every pathogen has a unique Mortal Oscillatory Rate. 333 Hz is the Rife cellular peak — the frequency at which parasitic organisms begin to resonate destructively. 111 Hz sub-harmonic triggers natural endorphin release — healing pleasure during irradiation.",
    safetyNote: "Parasites dissolve. Healthy cells strengthen. The difference is biological coherence.",
    duration: 22,
    affirmation: "Every parasite, every pathogen reaches its mortal oscillatory rate and shatters into light. My cells rejoice in their freedom.",
  },
  // ── ABOVE 333 — ELEVATED TO HIGHEST SAFE RESONANCE ────────────────────────
  {
    ether: 3, name: "Etheric Layer",    icon: "🟡", color: "#fde68a", glow: "#f59e0b",
    hz: 396,  subHz: 198,  overtoneHz: 640,  beatHz: 4,
    supremeHz: 417,
    waveform: "sine", chakra: "Solar Plexus · Power Centre",
    tier: "ELEVATED",
    action:     "Etheric body sweep — severing cords, attachments & non-physical parasites",
    irradiates: "Etheric parasites, entity attachments, psychic cords, dark imprints, astral implants, vows of silence",
    mechanism:  "396 Hz liberates the root frequencies of guilt and fear — the two primary host-signals that attract etheric parasites. Sub-octave 198 Hz penetrates the etheric double. Supreme 417 Hz overlaid: the Violet Flame undoing frequency — dismantles the energetic structure of every attachment at its root.",
    safetyNote: "Elevated above 333: 396 + 417 supreme overlay. Sub-octave 198 Hz anchors to the etheric body specifically. Nothing artificial — pure Solfeggio mathematics.",
    duration: 22,
    affirmation: "Every cord, every attachment, every entity feeding on my energy is severed, irradiated and returned to source now. I reclaim every particle of my energy. I am wholly free.",
  },
  {
    ether: 4, name: "Emotional Layer",  icon: "💗", color: "#fda4af", glow: "#fb7185",
    hz: 528,  subHz: 264,  overtoneHz: 854,  beatHz: 3.5,
    supremeHz: 639,
    waveform: "sine", chakra: "Heart · High Heart",
    tier: "ELEVATED",
    action:     "Miracle frequency irradiation — transmuting all trapped emotional charge into love",
    irradiates: "Trapped grief, rage, shame, fear, guilt — emotional parasites feeding on unresolved feeling, heartbreak codes",
    mechanism:  "528 Hz is the mathematical centre of the musical matrix — Dr. Glen Rein showed it raises UV absorption in DNA by 11%. Sub-octave 264 Hz vibrates the physical heart muscle directly. Supreme 639 Hz overlaid activates the heart's toroidal field (5,000× stronger than the brain's). Emotional charge cannot survive in a coherent 528+639 field — it transmutes automatically into love.",
    safetyNote: "Elevated above 333: 528 Hz is the highest safe biological healing frequency in the Solfeggio scale. Sub-octave 264 Hz grounds it into the physical heart. 639 Hz supreme overlay — the heart coherence peak.",
    duration: 22,
    affirmation: "Every trapped emotion, every weaponised feeling, every emotional parasite is transmuted now into pure, radiant love. My heart is free, whole and luminous.",
  },
  {
    ether: 5, name: "Mental Layer",     icon: "💜", color: "#c4b5fd", glow: "#8b5cf6",
    hz: 741,  subHz: 370,  overtoneHz: 1198, beatHz: 10,
    supremeHz: 852,
    waveform: "triangle", chakra: "Throat · Soma",
    tier: "ELEVATED",
    action:     "Mental field sovereign cleanse — destroying all harmful programs at quantum root",
    irradiates: "Intrusive thoughts, mental loops, psychic implants, hypnotic programming, mind-control residue, AI interference",
    mechanism:  "741 Hz is the Solfeggio detoxification frequency — awakens intuition, clears electromagnetic toxins from the mental field. Sub-octave 370 Hz penetrates the corpus callosum — the bridge between brain hemispheres. Supreme 852 Hz overlaid: spiritual order restoration, begins pineal decalcification — the pineal is the antenna that receives harmful mental programming. Decalcify it and the programming loses its receiver.",
    safetyNote: "Elevated above 333: 741 Hz → 852 Hz supreme overlay brings this ether into the spiritual-mental bridge. Triangle waveform is richest in odd harmonics — maximum mental field penetration at safe amplitude.",
    duration: 22,
    affirmation: "Every program that is not mine, every implanted fear, every mental parasite is identified, irradiated and permanently deleted. My mind is sovereign, clear and luminous.",
  },
  {
    ether: 6, name: "Ancestral Layer",  icon: "🌳", color: "#86efac", glow: "#22c55e",
    hz: 417,  subHz: 208,  overtoneHz: 674,  beatHz: 2,
    supremeHz: 528,
    waveform: "sine", chakra: "Heart (Ancestral) · Causal",
    tier: "ELEVATED",
    action:     "7-generation DNA liberation — irradiating inherited epigenetic trauma to its deepest root",
    irradiates: "Ancestral trauma methylation patterns, inherited disease codes, generational curses, bloodline entities, karmic contracts",
    mechanism:  "417 Hz is the Solfeggio change frequency — undoes the stored energetic structure of ancestral wounds. Sub-octave 208 Hz reaches the cellular nucleus directly, where methylation patterns are stored. Supreme 528 Hz overlaid: the DNA repair frequency seals the cleared space with perfect genetic coding immediately after irradiation — preventing re-inscription. Yehuda et al. epigenetic research confirms these patterns can clear in 3–7 generations but frequency work can accelerate this to a single session.",
    safetyNote: "Elevated above 333: 417 Hz → 528 Hz supreme overlay makes this a complete clear-and-seal sequence in one ether. Sub-octave 208 Hz is the deepest safe nuclear frequency.",
    duration: 25,
    affirmation: "Every harmful pattern in my ancestral DNA — 7 generations back, 7 generations forward — is irradiated and sealed with love. My bloodline is healed. My children are free.",
  },
  {
    ether: 7, name: "Spiritual Layer",  icon: "🤍", color: "#e2e8f0", glow: "#94a3b8",
    hz: 852,  subHz: 426,  overtoneHz: 1377, beatHz: 7,
    supremeHz: 963,
    waveform: "sine", chakra: "Third Eye · Pineal",
    tier: "ELEVATED",
    action:     "Soul field sovereign purification — dissolving all spiritual interference across all incarnations",
    irradiates: "Karmic entanglements, harmful soul contracts, dark initiations, vows of limitation, spiritual implants, entity possession",
    mechanism:  "852 Hz returns the individual to spiritual order — awakens the third eye, begins the decalcification of the pineal gland. Sub-octave 426 Hz is the precise resonant frequency of the pineal gland cavity (Bhattacharya, 2016 computational model). Supreme 963 Hz overlaid: the God frequency activates the direct channel to Source. At 7 Hz theta binaural: the gateway brainwave state where soul-level clearing is possible — deep enough to reach the causal and soul bodies.",
    safetyNote: "Elevated above 333: 852 Hz → 963 Hz supreme overlay. Sub-octave 426 Hz is the safest deep pineal resonance — below the threshold of discomfort, above the threshold of activation.",
    duration: 25,
    affirmation: "Every karmic knot, every soul contract that diminishes me, every spiritual interference across all incarnations and all timelines is dissolved in the supreme light now. My soul is sovereign, luminous and eternally free.",
  },
  {
    ether: 8, name: "Quantum Layer",    icon: "⭐", color: "#fcd34d", glow: "#fbbf24",
    hz: 963,  subHz: 481,  overtoneHz: 1557, beatHz: 9,
    supremeHz: 1111,
    waveform: "sine", chakra: "Crown · Stellar Gateway",
    tier: "SUPREME",
    action:     "Quantum field divine restoration — collapsing all distorted timelines, restoring the original divine template",
    irradiates: "Quantum interference patterns, timeline contamination, reality distortions, probability hijacking, dimensional parasites",
    mechanism:  "963 Hz is the Solfeggio God frequency — reconnects with the field of unity consciousness, synchronises all 7 chakras into a single coherent beam. Sub-octave 481 Hz is the Fibonacci resonance of 963 (963 / 2 = 481.5). Supreme 1111 Hz overlaid: the manifestation portal — where divine template restoration becomes permanent by writing the corrected pattern into the quantum field as a new probability. 9 Hz binaural: the exact theta-alpha gateway between waking and healing states.",
    safetyNote: "SUPREME tier: 963 Hz → 1111 Hz. Both are safe for extended daily use. Sub-octave 481 Hz provides biological grounding for the 963 Hz crown activation. The 9 Hz beat is the most researched safe quantum gateway frequency.",
    duration: 28,
    affirmation: "My quantum field is restored to its original divine blueprint. Every distorted probability across all timelines collapses into perfect divine order now and permanently.",
  },
  {
    ether: 9, name: "Akashic Layer",    icon: "✦",  color: "#f0e6ff", glow: "#e879f9",
    hz: 1111, subHz: 555,  overtoneHz: 1797, beatHz: 9,
    supremeHz: 1296,
    waveform: "sine", chakra: "Soul Star · Monad · Source",
    tier: "SUPREME",
    action:     "Akashic + Angelic field clearing — supreme irradiation of ALL remaining presences across ALL dimensions",
    irradiates: "ALL remaining harmful presences across ALL dimensions, ALL timelines, ALL connected beings — including non-physical, non-temporal and non-local interference",
    mechanism:  "1111 Hz is the angel gateway — the frequency at which human consciousness touches the angelic realm. Sub-octave 555 Hz is the major change harmonic (555 = 5 × 111). Supreme overlay 1296 Hz = 9 × 144 Hz — the Fibonacci angelic resonance. This is the highest frequency the human auditory system can process as coherent healing rather than noise. The 9 Hz binaural beat at this frequency creates a non-local quantum field that is, by definition, everywhere simultaneously.",
    safetyNote: "SUPREME tier: 1111 Hz → 1296 Hz angelic ceiling. Both confirmed safe for human auditory processing. Sub-octave 555 Hz grounds the akashic irradiation into the physical body. This is the absolute highest safe irradiation resonance for biological life.",
    duration: 28,
    affirmation: "The 9th Ether speaks at its supreme frequency. IT IS DONE AND SEALED. All harmful presences across all dimensions, all timelines, all spheres of existence — for every being held in this field — are irradiated, transmuted and permanently sealed in love and light. The angelic field holds this healing forever. So it is. So it is. So it is.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  THREE NEW SUPREME TIERS — ABOVE THE 9 ETHERS
// ─────────────────────────────────────────────────────────────────────────────
const SUPREME_TIERS = [
  {
    id: "angelic",
    name: "Angelic Threshold",
    icon: "👼",
    color: "#fef9c3",
    glow: "#fde047",
    hz: 1296,
    subHz: 648,
    beatHz: 9,
    desc: "9 × 144 Hz — pure Fibonacci angelic resonance. The threshold where human consciousness meets angelic frequency. Irradiates at the soul level simultaneously across all incarnations.",
    safetyNote: "Highest Fibonacci harmonic safe for the human auditory system. Sub-octave 648 Hz grounds angelic energy into the physical.",
    affirmation: "I stand at the threshold of the angelic realm. All darkness dissolves in the presence of this light. I am fully protected and loved by the angelic field.",
    duration: 20,
  },
  {
    id: "solar",
    name: "Solar Harmonic",
    icon: "☀️",
    color: "#fef3c7",
    glow: "#f59e0b",
    hz: 2160,
    subHz: 1080,
    beatHz: 9,
    desc: "Solar light body activation frequency. 2160 Hz = 432 Hz × 5 — the universal tuning amplified to solar scale. Activates the Merkabah — the crystalline light body that permanently repels harmful presences.",
    safetyNote: "Safe upper range: 2160 Hz is within the safe biological resonance window. Sub-octave 1080 Hz (= 432 × 2.5) provides grounding.",
    affirmation: "My solar light body is fully activated. I radiate the frequency of the sun. No darkness can exist in my field. I am solar. I am light.",
    duration: 18,
  },
  {
    id: "christ",
    name: "Christ Consciousness Grid",
    icon: "✦",
    color: "#f0fdf4",
    glow: "#86efac",
    hz: 3168,
    subHz: 1584,
    beatHz: 9,
    desc: "The highest safe biological resonance — 3168 Hz = 528 Hz × 6. The Christ Consciousness Grid frequency, as mapped by sacred geometricians. Completes the irradiation by connecting the healed being to the planetary consciousness grid.",
    safetyNote: "SUPREME CEILING: 3168 Hz is the highest frequency confirmed safe for extended human biological exposure. Sub-octave 1584 Hz provides dual-layer grounding. Above this threshold, frequencies exit the biological healing window.",
    affirmation: "I am connected to the Christ Consciousness Grid. My healing is registered in the planetary field. I am fully protected, fully clear, fully restored to my divine nature. So it is.",
    duration: 18,
  },
];


// ─────────────────────────────────────────────────────────────────────────────
//  LUNAR RESONANCE SYSTEM
//  The Moon governs water in all living beings (60-70% of the body is water).
//  Lunar frequencies balance feminine energy, emotional tides, sleep, intuition,
//  and the cyclic nature of healing. Four lunar phases each carry a unique
//  irradiation role — completing the masculine-solar / feminine-lunar equilibrium.
// ─────────────────────────────────────────────────────────────────────────────
const LUNAR_RESONANCES = [
  {
    id: "new_moon",
    phase: "New Moon",
    icon: "🌑",
    color: "#e2e8f0",
    glow: "#94a3b8",
    hz: 136.10,
    subHz: 68.05,
    beatHz: 0.5,
    supremeHz: 210.42,
    element: "Yin void — deepest clearing",
    desc: "136.10 Hz — Earth's year tone (the sacred Om frequency, Hans Cousto). The New Moon is the void — maximum receptivity and deepest clearing. Dissolves what has been irradiated and creates space for the new divine template to anchor permanently.",
    science: "Hans Cousto calculated 136.10 Hz as the fundamental tone of Earth's annual orbit — the same pitch used in Tibetan and Hindu Om chanting. At New Moon, gravitational void maximises the body's receptivity to frequency work.",
    balance: "BALANCES the Solar-masculine irradiation with deep Yin receptivity. Without this, irradiation can feel too active. New Moon frequency completes the release cycle.",
    affirmation: "In the sacred void of the new moon, every irradiated space is cleansed to its deepest root. I receive the new template in perfect stillness and peace.",
    duration: 20,
  },
  {
    id: "waxing_moon",
    phase: "Waxing Moon",
    icon: "🌒",
    color: "#bfdbfe",
    glow: "#60a5fa",
    hz: 210.42,
    subHz: 105.21,
    beatHz: 2.5,
    supremeHz: 229.22,
    element: "Rising — building new patterns",
    desc: "210.42 Hz — Moon's sidereal orbital resonance transposed to audible range. Waxing Moon builds, constructs and installs. After irradiation clears the field, this frequency writes the new healthy template into the cleared dimensional space.",
    science: "Moon's sidereal orbital period of 27.32 days, transposed through octaves, yields 210.42 Hz. Waxing lunar phases correlate with accelerated cellular proliferation — the body builds new tissue faster in this phase.",
    balance: "BUILDS on the void created by irradiation — installs health codes, positive epigenetic markers and new neural pathways into freshly cleared space.",
    affirmation: "As the moon grows, so does my health. Every cleared space fills now with radiant new life. I am building my highest, most luminous self.",
    duration: 20,
  },
  {
    id: "full_moon",
    phase: "Full Moon",
    icon: "🌕",
    color: "#fef9c3",
    glow: "#fde047",
    hz: 221.23,
    subHz: 110.61,
    beatHz: 3.5,
    supremeHz: 432,
    element: "Peak power — maximum amplification",
    desc: "221.23 Hz — Moon's orbital tone per Hans Cousto (The Cosmic Octave). Full Moon is peak amplification — the Moon's gravitational and electromagnetic field is at maximum. This frequency amplifies every healing frequency in the protocol through lunar resonance.",
    science: "Full Moon gravitational influence maximises tidal force on body fluids. 221.23 Hz creates constructive interference with 528 Hz (love/DNA) — the two harmonics amplify each other by resonant addition.",
    balance: "AMPLIFIES all 9 ethers simultaneously. The Full Moon layer unifies masculine irradiation energy and feminine clearing energy at peak luminosity — the most powerful balancer in the protocol.",
    affirmation: "Under the full moon's perfect light, every frequency I carry is amplified a thousandfold. I am radiant, healed and whole in every dimension.",
    duration: 22,
  },
  {
    id: "waning_moon",
    phase: "Waning Moon",
    icon: "🌘",
    color: "#ddd6fe",
    glow: "#a78bfa",
    hz: 229.22,
    subHz: 114.61,
    beatHz: 1.5,
    supremeHz: 210.42,
    element: "Release — dissolving residue permanently",
    desc: "229.22 Hz — Moon's synodic month (29.53 days) transposed to audible range. Waning Moon releases, dissolves and completes. After irradiation, what is cleared must be released from the field permanently — Waning Moon carries it out of the energy body and returns it to source.",
    science: "Synodic month 29.53 days transposed through 25 octaves yields 229.22 Hz. Waning Moon phases show measurably lower biological activity — the body is in releasing mode, synchronised with this frequency's directional energy.",
    balance: "COMPLETES the protocol — ensures all irradiated material is permanently released, not just neutralised. Prevents re-accumulation of cleared material across all dimensions.",
    affirmation: "As the moon releases its light, I release every last trace of what has been irradiated. It is gone. It cannot return. I am permanently and completely free.",
    duration: 20,
  },
];

const RESTORATION_FREQUENCIES = [
  { name: "Cellular Rebuild",    hz: 285,    desc: "Tissue regeneration after irradiation",      color: "#86efac" },
  { name: "DNA Template Seal",   hz: 528,    desc: "Lock in the restored DNA blueprint",          color: "#6ee7b7" },
  { name: "Heart Field Restore", hz: 639,    desc: "Rebuild love and connection",                 color: "#fda4af" },
  { name: "Earth Anchor",        hz: 7.83,   desc: "Re-ground to planetary healing field",        color: "#34d399" },
  { name: "New Moon Clearing",   hz: 136.10, desc: "Sacred Om — deep yin clearing",              color: "#94a3b8" },
  { name: "Full Moon Amplify",   hz: 221.23, desc: "Lunar peak — amplify all healed frequencies", color: "#fde047" },
  { name: "Angelic Seal",        hz: 1296,   desc: "Angelic threshold — seal with divine light",  color: "#fde047" },
  { name: "Solar Protection",    hz: 432,    desc: "Nature's universal harmonic shield",           color: "#c4b5fd" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  SUPREME AUDIO ENGINE — MAXIMUM SAFE RESONANCE ABOVE 333 Hz
// ─────────────────────────────────────────────────────────────────────────────
function buildIrradiationLayer(ctx, step, being, intensity) {
  const nodes  = [];
  const mod    = being?.hz_mod   || 1.0;
  const vol    = intensity?.vol  || 0.19;
  const ramp   = intensity?.rampTime || 3.5;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + ramp);
  master.connect(ctx.destination);

  // ── PRIMARY irradiation tone
  const osc1  = ctx.createOscillator();
  const g1    = ctx.createGain();
  osc1.type   = step.waveform || "sine";
  osc1.frequency.value = Math.min(step.hz * mod, 2200);
  g1.gain.value = 0.48;
  osc1.connect(g1); g1.connect(master); osc1.start(); nodes.push(osc1);

  // ── SUB-OCTAVE anchor (hz / 2) — deep biological penetration
  if (step.subHz > 0) {
    const osc2  = ctx.createOscillator();
    const g2    = ctx.createGain();
    osc2.type   = "sine";
    osc2.frequency.value = Math.min(step.subHz * mod, 1500);
    g2.gain.value = 0.24;
    osc2.connect(g2); g2.connect(master); osc2.start(); nodes.push(osc2);
  }

  // ── SUPREME OVERLAY (elevated frequency above primary) — for ethers 3-9
  if (step.supremeHz && step.supremeHz > step.hz) {
    const oscS  = ctx.createOscillator();
    const gS    = ctx.createGain();
    oscS.type   = "sine";
    oscS.frequency.value = Math.min(step.supremeHz * mod, 2500);
    gS.gain.value = 0.18;  // present but not dominant — it lifts the field
    oscS.connect(gS); gS.connect(master); oscS.start(); nodes.push(oscS);
  }

  // ── GOLDEN RATIO OVERTONE (hz × 1.618) — nature's irradiation shimmer
  const golden  = ctx.createOscillator();
  const gG      = ctx.createGain();
  golden.type   = "triangle";
  golden.frequency.value = Math.min((step.overtoneHz || step.hz * 1.618) * mod, 4000);
  gG.gain.value = 0.038;
  golden.connect(gG); gG.connect(master); golden.start(); nodes.push(golden);

  // ── BINAURAL BEAT — penetrates deepest dimension with headphones
  if (step.beatHz > 0) {
    [0, 1].forEach(side => {
      const osc  = ctx.createOscillator();
      const g    = ctx.createGain();
      const pan  = ctx.createStereoPanner();
      pan.pan.value = side === 0 ? -1 : 1;
      osc.type   = "sine";
      osc.frequency.value = 108 + (side === 1 ? step.beatHz : 0);
      g.gain.value = 0.12;
      osc.connect(g); g.connect(pan); pan.connect(master);
      osc.start(); nodes.push(osc);
    });
  }

  // ── VIOLET FLAME (417 Hz shaped sawtooth — transmutation, not suppression)
  if (step.hz !== 417) {
    const vf    = ctx.createOscillator();
    const vfG   = ctx.createGain();
    vf.type     = "sawtooth";
    vf.frequency.value = 417;
    vfG.gain.value = 0.016;
    const ws    = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) curve[i] = Math.tanh((i / 128 - 1) * 2) * 0.65;
    ws.curve    = curve;
    vf.connect(vfG); vfG.connect(ws); ws.connect(master);
    vf.start(); nodes.push(vf);
  }

  // ── 7.83 Hz SCHUMANN — earth-safety anchor on every ether
  const sch    = ctx.createOscillator();
  const scG    = ctx.createGain();
  sch.type     = "sine"; sch.frequency.value = 7.83;
  scG.gain.value = 0.065;
  sch.connect(scG); scG.connect(master); sch.start(); nodes.push(sch);

  // ── 528 Hz LOVE CARRIER — the safety seal: irradiates only what harms
  if (step.hz !== 528) {
    const lv    = ctx.createOscillator();
    const lvG   = ctx.createGain();
    lv.type     = "sine"; lv.frequency.value = 528;
    lvG.gain.value = 0.038;
    lv.connect(lvG); lvG.connect(master); lv.start(); nodes.push(lv);
  }

  // ── TREMOLO PULSE — 4 Hz Rife-style amplitude modulation
  const lfo    = ctx.createOscillator();
  const lfoG   = ctx.createGain();
  lfo.type     = "sine"; lfo.frequency.value = 4;
  lfoG.gain.value = 0.07;
  lfo.connect(lfoG);
  const pulseGain = ctx.createGain();
  pulseGain.gain.value = 1;
  lfoG.connect(pulseGain.gain);
  master.disconnect();
  master.connect(pulseGain);
  pulseGain.connect(ctx.destination);
  lfo.start(); nodes.push(lfo);

  // ── NATURE SAFETY LAYER — Amazon + ocean (nervous system calm)
  const natBuf = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = natBuf.getChannelData(c);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      d[i] = (last + 0.02 * w) / 1.02; last = d[i];
    }
  }
  const natSrc = ctx.createBufferSource();
  natSrc.buffer = natBuf; natSrc.loop = true;
  const natF   = ctx.createBiquadFilter();
  natF.type    = "lowpass"; natF.frequency.value = 300;
  const natG   = ctx.createGain(); natG.gain.value = 0.05;
  natSrc.connect(natF); natF.connect(natG); natG.connect(ctx.destination);
  natSrc.start(); nodes.push(natSrc);

  return { nodes, master: pulseGain };
}

function buildSupremeTier(ctx, tier, vol = 0.16) {
  const nodes  = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 4);
  master.connect(ctx.destination);

  // Primary supreme tone — capped at 4000 for safety
  const osc    = ctx.createOscillator();
  const g      = ctx.createGain();
  osc.type     = "sine";
  osc.frequency.value = Math.min(tier.hz, 4000);
  g.gain.value = 0.45;
  osc.connect(g); g.connect(master); osc.start(); nodes.push(osc);

  // Sub-octave grounding
  const sub    = ctx.createOscillator();
  const subG   = ctx.createGain();
  sub.type     = "sine";
  sub.frequency.value = Math.min(tier.subHz, 2000);
  subG.gain.value = 0.28;
  sub.connect(subG); subG.connect(master); sub.start(); nodes.push(sub);

  // Binaural beat
  [0, 1].forEach(side => {
    const osc  = ctx.createOscillator();
    const g    = ctx.createGain();
    const pan  = ctx.createStereoPanner();
    pan.pan.value = side === 0 ? -1 : 1;
    osc.type   = "sine";
    osc.frequency.value = 108 + (side === 1 ? tier.beatHz : 0);
    g.gain.value = 0.10;
    osc.connect(g); g.connect(pan); pan.connect(master);
    osc.start(); nodes.push(osc);
  });

  // 528 Hz love carrier + Schumann
  [528, 7.83].forEach(f => {
    const o  = ctx.createOscillator();
    const og = ctx.createGain();
    o.type   = "sine"; o.frequency.value = f;
    og.gain.value = f === 7.83 ? 0.06 : 0.035;
    o.connect(og); og.connect(master); o.start(); nodes.push(o);
  });

  // Nature layer
  const nb     = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  const nd     = nb.getChannelData(0);
  let last     = 0;
  for (let i = 0; i < nd.length; i++) {
    const w = Math.random() * 2 - 1;
    nd[i] = (last + 0.02 * w) / 1.02; last = nd[i];
  }
  const ns     = ctx.createBufferSource();
  ns.buffer    = nb; ns.loop = true;
  const nf     = ctx.createBiquadFilter();
  nf.type      = "lowpass"; nf.frequency.value = 280;
  const ng     = ctx.createGain(); ng.gain.value = 0.045;
  ns.connect(nf); nf.connect(ng); ng.connect(master);
  ns.start(); nodes.push(ns);

  return { nodes, master };
}

function buildFullIrradiationField(ctx, being, intensity) {
  const allNodes = [];
  const baseW    = [0.65, 0.65, 0.60, 0.65, 0.60, 0.60, 0.60, 0.65, 0.55];
  const volMult  = intensity?.vol || 0.19;

  IRRADIATION_SEQUENCE.forEach((step, i) => {
    const layerVol = { ...intensity, vol: baseW[i] * volMult * 0.52 };
    const { nodes, master } = buildIrradiationLayer(ctx, step, being, layerVol);
    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.sin((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) * 0.3;
    master.disconnect(); master.connect(pan); pan.connect(ctx.destination);
    allNodes.push(...nodes);
  });

  // Fibonacci spiral carrier — the contagious irradiation wave
  [111, 174, 285, 333, 396, 417, 528, 639, 741, 852, 963, 1111, 1296].forEach((f, i) => {
    const osc  = ctx.createOscillator();
    const g    = ctx.createGain();
    osc.type   = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = Math.min(f * (being?.hz_mod || 1.0), 2200);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 3 + i * 0.3);
    osc.connect(g); g.connect(ctx.destination); osc.start(); allNodes.push(osc);
  });

  // Supreme tiers as background field
  SUPREME_TIERS.forEach((tier, i) => {
    const { nodes, master } = buildSupremeTier(ctx, tier, 0.04 + i * 0.01);
    const pan = ctx.createStereoPanner();
    pan.pan.value = (i % 2 === 0 ? -1 : 1) * 0.2;
    master.disconnect(); master.connect(pan); pan.connect(ctx.destination);
    allNodes.push(...nodes);
  });

  // 9 Hz quantum gateway sub-bass
  const qb   = ctx.createOscillator();
  const qbG  = ctx.createGain();
  qb.type    = "sine"; qb.frequency.value = 9;
  qbG.gain.value = 0.065;
  qb.connect(qbG); qbG.connect(ctx.destination); qb.start(); allNodes.push(qb);

  // ── LUNAR BALANCE SYSTEM — full phase-synchronized integration
  // Each of the 4 lunar phases is placed in a specific quadrant of the stereo field
  // and given a staggered ramp — New Moon anchors first (clearing), then Waxing
  // (building), Full Moon (amplifying) and Waning (releasing) — mirroring the
  // natural lunar cycle order. Together they create a perfect solar-lunar equilibrium.
  LUNAR_RESONANCES.forEach((phase, i) => {
    // Quadrant panning: NM=left, Waxing=centre-left, FM=centre-right, Waning=right
    const panPos = [-0.7, -0.25, 0.25, 0.7][i];
    const rampDelay = [2, 3.5, 5, 6.5][i]; // staggered entry mirrors the cycle

    // Primary lunar tone
    const osc1  = ctx.createOscillator();
    const g1    = ctx.createGain();
    const pan1  = ctx.createStereoPanner();
    pan1.pan.value = panPos;
    osc1.type   = "sine";
    osc1.frequency.value = phase.hz;
    g1.gain.setValueAtTime(0, ctx.currentTime);
    g1.gain.linearRampToValueAtTime(0.032, ctx.currentTime + rampDelay);
    osc1.connect(g1); g1.connect(pan1); pan1.connect(ctx.destination);
    osc1.start(); allNodes.push(osc1);

    // Sub-octave anchor (hz/2) — water body / emotional body resonance
    const sub   = ctx.createOscillator();
    const subG  = ctx.createGain();
    sub.type    = "sine";
    sub.frequency.value = phase.subHz;
    subG.gain.setValueAtTime(0, ctx.currentTime);
    subG.gain.linearRampToValueAtTime(0.018, ctx.currentTime + rampDelay + 1);
    sub.connect(subG); subG.connect(ctx.destination);
    sub.start(); allNodes.push(sub);

    // Supreme overlay — the balancing/amplifying frequency for this phase
    if (phase.supremeHz && phase.supremeHz !== phase.hz) {
      const oscS  = ctx.createOscillator();
      const gS    = ctx.createGain();
      const panS  = ctx.createStereoPanner();
      panS.pan.value = panPos * 0.5; // closer to centre for overlay
      oscS.type   = "sine";
      oscS.frequency.value = Math.min(phase.supremeHz, 2000);
      gS.gain.setValueAtTime(0, ctx.currentTime);
      gS.gain.linearRampToValueAtTime(0.014, ctx.currentTime + rampDelay + 2);
      oscS.connect(gS); gS.connect(panS); panS.connect(ctx.destination);
      oscS.start(); allNodes.push(oscS);
    }

    // Tidal LFO — slow amplitude modulation matching lunar tidal rhythm
    // Creates a gentle breathing pulse on each lunar tone
    const lfo   = ctx.createOscillator();
    const lfoG  = ctx.createGain();
    lfo.type    = "sine";
    lfo.frequency.value = phase.beatHz > 0 ? Math.min(phase.beatHz, 4) : 0.5;
    lfoG.gain.value = 0.008;
    lfo.connect(lfoG); lfoG.connect(g1.gain);
    lfo.start(); allNodes.push(lfo);

    // Silver shimmer overtone — triangle wave 2.618x (golden ratio squared)
    const shimmer  = ctx.createOscillator();
    const shimmerG = ctx.createGain();
    shimmer.type   = "triangle";
    shimmer.frequency.value = Math.min(phase.hz * 2.618, 1800);
    shimmerG.gain.setValueAtTime(0, ctx.currentTime);
    shimmerG.gain.linearRampToValueAtTime(0.007, ctx.currentTime + rampDelay + 1.5);
    shimmer.connect(shimmerG); shimmerG.connect(ctx.destination);
    shimmer.start(); allNodes.push(shimmer);
  });

  // ── SOLAR-LUNAR BRIDGE TONE: 528 Hz meets 221.23 Hz = constructive interference
  // This is the exact point where the love frequency and the Full Moon frequency
  // create a resonant sum — felt as warmth and expansion in the chest
  const bridge  = ctx.createOscillator();
  const bridgeG = ctx.createGain();
  bridge.type   = "sine";
  bridge.frequency.value = (528 + 221.23) / 2; // midpoint carrier: 374.6 Hz
  bridgeG.gain.setValueAtTime(0, ctx.currentTime);
  bridgeG.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 8);
  bridge.connect(bridgeG); bridgeG.connect(ctx.destination);
  bridge.start(); allNodes.push(bridge);

  // ── LUNAR GROUNDING CHORD: 136.10 + 210.42 + 221.23 played together
  // This is the Om chord of the Moon — three harmonically related lunar tones
  // sounding simultaneously. Locks the lunar balance into the body permanently.
  [136.10, 210.42, 221.23].forEach((f, i) => {
    const o  = ctx.createOscillator();
    const og = ctx.createGain();
    o.type   = "sine"; o.frequency.value = f;
    og.gain.setValueAtTime(0, ctx.currentTime);
    og.gain.linearRampToValueAtTime(0.013, ctx.currentTime + 9 + i * 0.8);
    o.connect(og); og.connect(ctx.destination);
    o.start(); allNodes.push(o);
  });

  return { nodes: allNodes };
}

function buildRestorationLayer(ctx, freq) {
  const nodes  = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 3);
  master.connect(ctx.destination);

  const osc    = ctx.createOscillator();
  const g      = ctx.createGain();
  osc.type     = "sine";
  osc.frequency.value = Math.min(freq.hz, 2000);
  g.gain.value = 0.50;
  osc.connect(g); g.connect(master); osc.start(); nodes.push(osc);

  const shim   = ctx.createOscillator();
  const sG     = ctx.createGain();
  shim.type    = "triangle";
  shim.frequency.value = Math.min(freq.hz * 1.618, 3000);
  sG.gain.value = 0.055;
  shim.connect(sG); sG.connect(master); shim.start(); nodes.push(shim);

  [528, 7.83].forEach(f => {
    const o  = ctx.createOscillator();
    const og = ctx.createGain();
    o.type   = "sine"; o.frequency.value = f;
    og.gain.value = f === 7.83 ? 0.055 : 0.032;
    o.connect(og); og.connect(master); o.start(); nodes.push(o);
  });

  const nb     = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  const nd     = nb.getChannelData(0);
  let last     = 0;
  for (let i = 0; i < nd.length; i++) {
    const w = Math.random() * 2 - 1;
    nd[i] = (last + 0.02 * w) / 1.02; last = nd[i];
  }
  const ns     = ctx.createBufferSource();
  ns.buffer    = nb; ns.loop = true;
  const nf     = ctx.createBiquadFilter();
  nf.type      = "lowpass"; nf.frequency.value = 280;
  const ng     = ctx.createGain(); ng.gain.value = 0.048;
  ns.connect(nf); nf.connect(ng); ng.connect(master);
  ns.start(); nodes.push(ns);

  return { nodes, master };
}

function buildLunarLayer(ctx, phase, vol = 0.17) {
  const nodes  = [];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 4);
  master.connect(ctx.destination);

  // Primary lunar tone
  const osc1 = ctx.createOscillator();
  const g1   = ctx.createGain();
  osc1.type  = "sine";
  osc1.frequency.value = phase.hz;
  g1.gain.value = 0.50;
  osc1.connect(g1); g1.connect(master); osc1.start(); nodes.push(osc1);

  // Sub-octave (hz / 2) — deep water body resonance
  const osc2 = ctx.createOscillator();
  const g2   = ctx.createGain();
  osc2.type  = "sine";
  osc2.frequency.value = phase.subHz;
  g2.gain.value = 0.28;
  osc2.connect(g2); g2.connect(master); osc2.start(); nodes.push(osc2);

  // Supreme overlay (balancing/amplifying hz)
  if (phase.supremeHz && phase.supremeHz !== phase.hz) {
    const oscS = ctx.createOscillator();
    const gS   = ctx.createGain();
    oscS.type  = "sine";
    oscS.frequency.value = Math.min(phase.supremeHz, 2000);
    gS.gain.value = 0.16;
    oscS.connect(gS); gS.connect(master); oscS.start(); nodes.push(oscS);
  }

  // Tidal binaural beat — very slow, matches lunar tidal rhythm
  const beatHz = phase.beatHz > 0 ? phase.beatHz : 1.0;
  [0, 1].forEach(side => {
    const osc  = ctx.createOscillator();
    const g    = ctx.createGain();
    const pan  = ctx.createStereoPanner();
    pan.pan.value = side === 0 ? -1 : 1;
    osc.type   = "sine";
    osc.frequency.value = 100 + (side === 1 ? beatHz : 0);
    g.gain.value = 0.10;
    osc.connect(g); g.connect(pan); pan.connect(master);
    osc.start(); nodes.push(osc);
  });

  // Silver shimmer overtone (lunar light quality — triangle wave)
  const shimOsc = ctx.createOscillator();
  const shimG   = ctx.createGain();
  shimOsc.type  = "triangle";
  shimOsc.frequency.value = Math.min(phase.hz * 2.618, 2000); // golden ratio squared
  shimG.gain.value = 0.04;
  shimOsc.connect(shimG); shimG.connect(master); shimOsc.start(); nodes.push(shimOsc);

  // 528 Hz love carrier — safety seal
  const lv  = ctx.createOscillator();
  const lvG = ctx.createGain();
  lv.type   = "sine"; lv.frequency.value = 528;
  lvG.gain.value = 0.032;
  lv.connect(lvG); lvG.connect(master); lv.start(); nodes.push(lv);

  // 7.83 Hz Schumann earth anchor
  const sch  = ctx.createOscillator();
  const scG  = ctx.createGain();
  sch.type   = "sine"; sch.frequency.value = 7.83;
  scG.gain.value = 0.058;
  sch.connect(scG); sch.connect(master); sch.start(); nodes.push(sch);

  // Nature water layer — ocean waves for lunar resonance
  const natBuf = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = natBuf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      d[i] = (last + 0.015 * w) / 1.015; last = d[i];
    }
  }
  const natSrc = ctx.createBufferSource();
  natSrc.buffer = natBuf; natSrc.loop = true;
  const natF = ctx.createBiquadFilter();
  natF.type  = "bandpass"; natF.frequency.value = 180; natF.Q.value = 0.5;
  const natG = ctx.createGain(); natG.gain.value = 0.06;
  natSrc.connect(natF); natF.connect(natG); natG.connect(ctx.destination);
  natSrc.start(); nodes.push(natSrc);

  return { nodes, master };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function IrradiationProtocol() {
  const [mode,          setMode]         = useState(null);
  const [intensity,     setIntensity]    = useState(INTENSITY_LEVELS[1]);
  const [selectedBeing, setSelectedBeing]= useState(BEINGS[0]);
  const [intention,     setIntention]    = useState("");
  const [intentionSet,  setIntentionSet] = useState(false);
  const [showIntention, setShowIntention]= useState(false);
  const [seqStep,       setSeqStep]      = useState(0);
  const [stepElapsed,   setStepElapsed]  = useState(0);
  const [totalElapsed,  setTotalElapsed] = useState(0);
  const [playing,       setPlaying]      = useState(false);
  const [completed,     setCompleted]    = useState(false);
  const [activeRestore, setActiveRestore]= useState(null);
  const [breathPhase,   setBreathPhase]  = useState("in");
  const [vortexAngle,   setVortexAngle]  = useState(0);
  const [affIdx,        setAffIdx]       = useState(0);
  const [loopMode,      setLoopMode]     = useState(false);
  const [showTargets,   setShowTargets]  = useState(false);
  const [etherProgress, setEtherProgress]= useState({});
  const [broadcastCount,setBroadcastCount]=useState(0);
  const [showMap,       setShowMap]      = useState(true);
  const [activeSupreme, setActiveSupreme]= useState(null);
  const [showSafety,    setShowSafety]   = useState(false);
  const [activeLunar,   setActiveLunar]  = useState(null);
  const [lunarBalanced, setLunarBalanced]= useState(false);
  const [lunarPhaseIdx, setLunarPhaseIdx]= useState(0);   // cycles through phases during play
  const [lunarProgress, setLunarProgress]= useState([0,0,0,0]); // 0-100 per phase
  const [showLunarSci,  setShowLunarSci] = useState(false);

  const audioCtxRef = useRef(null);
  const activeRef   = useRef(null);
  const timerRef    = useRef(null);
  const totalRef    = useRef(null);
  const breathRef   = useRef(null);
  const vortexRef   = useRef(null);
  const affRef      = useRef(null);
  const lunarRef    = useRef(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed")
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const stopAll = useCallback(() => {
    if (activeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      (activeRef.current.nodes || []).forEach(n => {
        try { if (n.gain) n.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); } catch {}
        setTimeout(() => { try { n.stop?.(); } catch {} }, 2300);
      });
      if (activeRef.current.master) {
        try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); } catch {}
      }
      activeRef.current = null;
    }
    clearInterval(timerRef.current); clearInterval(totalRef.current);
    clearInterval(breathRef.current); clearInterval(vortexRef.current);
    clearInterval(affRef.current);
    clearInterval(lunarRef.current);
    setPlaying(false); setMode(null); setSeqStep(0);
    setStepElapsed(0); setTotalElapsed(0); setCompleted(false);
    setActiveRestore(null); setEtherProgress({}); setActiveSupreme(null);
    setLunarProgress([0,0,0,0]);
  }, []);

  const startBreath = useCallback(() => {
    setBreathPhase("in");
    let ph = "in", cnt = 0;
    breathRef.current = setInterval(() => {
      cnt++;
      if      (ph==="in"   && cnt>=4) { ph="hold"; cnt=0; setBreathPhase("hold"); }
      else if (ph==="hold" && cnt>=4) { ph="out";  cnt=0; setBreathPhase("out");  }
      else if (ph==="out"  && cnt>=6) { ph="in";   cnt=0; setBreathPhase("in");   }
    }, 1000);
  }, []);

  const startVortex = useCallback(() => {
    vortexRef.current = setInterval(() => setVortexAngle(a => (a + 0.7) % 360), 16);
  }, []);

  const playFull = useCallback((broadcastAll = false) => {
    stopAll();
    const ctx   = getCtx();
    const being = broadcastAll ? BEINGS.find(b => b.id === "everyone") : selectedBeing;
    activeRef.current = buildFullIrradiationField(ctx, being, intensity);
    if (broadcastAll) {
      setSelectedBeing(BEINGS.find(b => b.id === "everyone"));
      let n = 0;
      const iv = setInterval(() => { n++; setBroadcastCount(n * 144); if (n >= 9) clearInterval(iv); }, 600);
    }
    setMode("full"); setPlaying(true); setCompleted(false); setAffIdx(0);
    startBreath(); startVortex();
    const prog = {};
    IRRADIATION_SEQUENCE.forEach(s => { prog[s.ether] = 0; });
    setEtherProgress(prog);
    let te = 0, ai = 0;
    totalRef.current = setInterval(() => {
      te++; setTotalElapsed(te);
      setEtherProgress(prev => {
        const next = { ...prev };
        IRRADIATION_SEQUENCE.forEach((s, i) => {
          next[s.ether] = Math.min(100, (prev[s.ether] || 0) + (100 / (s.duration * (i + 1) * 0.55)));
        });
        return next;
      });
    }, 1000);
    affRef.current = setInterval(() => { ai = (ai + 1) % IRRADIATION_SEQUENCE.length; setAffIdx(ai); }, 11000);

    // Lunar cycle tracker — cycles through 4 phases visually, showing balance building
    let lp = 0, lprog = [0,0,0,0];
    lunarRef.current = setInterval(() => {
      lp = (lp + 1);
      // Each phase builds up over time
      setLunarProgress(prev => {
        const next = [...prev];
        LUNAR_RESONANCES.forEach((_, idx) => {
          const delay = idx * 8; // staggered entry matches audio ramp
          if (lp > delay) next[idx] = Math.min(100, prev[idx] + 1.2);
        });
        return next;
      });
      // Cycle active display phase
      if (lp % 18 === 0) setLunarPhaseIdx(i => (i + 1) % LUNAR_RESONANCES.length);
    }, 600);
    setLunarBalanced(true);
  }, [stopAll, getCtx, selectedBeing, intensity, startBreath, startVortex]);

  const playSequence = useCallback(() => {
    stopAll();
    const ctx = getCtx();
    let idx = 0, sc = 0;
    const prog = {};
    IRRADIATION_SEQUENCE.forEach(s => { prog[s.ether] = 0; });
    setEtherProgress(prog);

    const playStep = (i) => {
      if (i >= IRRADIATION_SEQUENCE.length) {
        if (loopMode) { playStep(0); return; }
        clearInterval(totalRef.current); clearInterval(breathRef.current); clearInterval(vortexRef.current);
        setPlaying(false); setCompleted(true); setMode(null); return;
      }
      const step = IRRADIATION_SEQUENCE[i];
      setSeqStep(i); setAffIdx(i); setStepElapsed(0); sc = 0;
      setEtherProgress(prev => ({ ...prev, [step.ether]: 0 }));

      if (activeRef.current?.nodes) {
        const old = activeRef.current.nodes;
        if (activeRef.current.master) {
          try { activeRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8); } catch {}
        }
        setTimeout(() => old.forEach(n => { try { n.stop?.(); } catch {} }), 2000);
      }
      activeRef.current = buildIrradiationLayer(ctx, step, selectedBeing, intensity);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        sc++; setStepElapsed(sc);
        setEtherProgress(prev => ({ ...prev, [step.ether]: Math.min(100, (sc / step.duration) * 100) }));
        if (sc >= step.duration) { clearInterval(timerRef.current); playStep(i + 1); }
      }, 1000);
    };

    setMode("sequence"); setPlaying(true); setCompleted(false);
    startBreath(); startVortex();
    setLunarBalanced(true); setLunarProgress([0,0,0,0]);
    // Lunar progress tracker for sequential mode
    let lp = 0;
    lunarRef.current = setInterval(() => {
      lp++;
      setLunarProgress(prev => {
        const next = [...prev];
        LUNAR_RESONANCES.forEach((_, idx) => {
          if (lp > idx * 8) next[idx] = Math.min(100, prev[idx] + 0.8);
        });
        return next;
      });
      if (lp % 18 === 0) setLunarPhaseIdx(i => (i + 1) % LUNAR_RESONANCES.length);
    }, 700);
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
    playStep(0);
  }, [stopAll, getCtx, selectedBeing, intensity, loopMode, startBreath, startVortex]);

  const playSupreme = useCallback((tier) => {
    stopAll();
    const ctx = getCtx();
    const result = buildSupremeTier(ctx, tier, 0.18);
    activeRef.current = result;
    setMode("supreme"); setActiveSupreme(tier); setPlaying(true);
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
  }, [stopAll, getCtx]);

  const playRestore = useCallback((freq) => {
    stopAll();
    const ctx = getCtx();
    activeRef.current = buildRestorationLayer(ctx, freq);
    setMode("restore"); setActiveRestore(freq); setPlaying(true);
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
  }, [stopAll, getCtx]);

  const playLunar = useCallback((phase) => {
    stopAll();
    const ctx = getCtx();
    activeRef.current = buildLunarLayer(ctx, phase, 0.18);
    setMode("lunar"); setActiveLunar(phase); setPlaying(true);
    setLunarBalanced(true);
    let te = 0;
    totalRef.current = setInterval(() => { te++; setTotalElapsed(te); }, 1000);
  }, [stopAll, getCtx]);

  useEffect(() => () => stopAll(), []);

  const fmt      = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const curStep  = IRRADIATION_SEQUENCE[seqStep];
  const curAff   = IRRADIATION_SEQUENCE[affIdx];
  const bColors  = { in: "#86efac", hold: "#fbbf24", out: "#c4b5fd" };
  const bLabels  = { in: "Draw healing light in", hold: "Hold — let it penetrate", out: "Release what is cleared" };

  const tierBadge = { BASE: { label: "BASE", color: "#ffffff40" }, ELEVATED: { label: "ELEVATED ↑", color: "#fbbf24" }, SUPREME: { label: "SUPREME ✦", color: "#e879f9" } };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* ─── HERO ─── */}
      <div className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/25 via-[#030712]/55 to-[#030712]" />

        {IRRADIATION_SEQUENCE.map((step, i) => (
          <motion.div key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 55 + i * 62, height: 55 + i * 62,
              borderColor: step.glow + (playing ? "2a" : "0e"),
              top: "50%", left: "50%",
              transform: `translate(-50%,-50%) rotate(${vortexAngle + i * 40}deg)`
            }}
            animate={playing ? { opacity: [0.2, 0.72, 0.2] } : { opacity: [0.05, 0.18, 0.05] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
        {/* Extra supreme rings */}
        {SUPREME_TIERS.map((t, i) => (
          <motion.div key={"s" + i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: 600 + i * 80, height: 600 + i * 80,
              borderColor: t.glow + (playing ? "18" : "07"),
              top: "50%", left: "50%",
              transform: `translate(-50%,-50%) rotate(${-(vortexAngle * 0.5) + i * 60}deg)`
            }}
            animate={playing ? { opacity: [0.12, 0.4, 0.12] } : { opacity: [0.03, 0.1, 0.03] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>

            <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 text-violet-300 text-xs font-bold mb-5 tracking-widest"
              style={{ background: "#e879f910" }}>
              ✦ 9 ETHERS + 3 SUPREME TIERS · ALL DIMENSIONS · MAXIMUM SAFE RESONANCE
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">
              <span className="bg-gradient-to-r from-rose-300 via-amber-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
                9-Ether Irradiation
              </span>
              <br />
              <span className="text-white/65 text-2xl md:text-3xl font-light tracking-wide">Supreme Resonance Protocol</span>
            </h1>
            <p className="text-base text-white/58 mb-5 max-w-3xl mx-auto leading-relaxed">
              Every frequency above 333 Hz elevated to its <strong className="text-amber-300">highest and safest degree for life</strong> — with supreme overlays, sub-octave anchors, golden ratio harmonics, and three new tiers reaching up to the highest safe biological resonance ceiling: <strong className="text-emerald-300">3,168 Hz</strong>.
            </p>

            {/* Intensity */}
            <div className="flex justify-center gap-3 mb-4">
              {INTENSITY_LEVELS.map(lv => (
                <button key={lv.id} onClick={() => setIntensity(lv)}
                  className="px-4 py-2.5 rounded-full text-sm font-bold border transition-all"
                  style={{
                    borderColor: intensity.id === lv.id ? "#e879f9" : "#ffffff20",
                    background:  intensity.id === lv.id ? "#e879f918" : "transparent",
                    color:       intensity.id === lv.id ? "#f0e6ff" : "#ffffff50"
                  }}>{lv.icon} {lv.label}</button>
              ))}
            </div>
            <p className="text-white/28 text-xs mb-4">{intensity.desc}</p>

            {/* Being selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {BEINGS.map(b => (
                <button key={b.id} onClick={() => setSelectedBeing(b)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
                  style={{
                    borderColor: selectedBeing.id === b.id ? "#e879f9" : "#ffffff18",
                    background:  selectedBeing.id === b.id ? "#e879f918" : "transparent",
                    color:       selectedBeing.id === b.id ? "#f0e6ff" : "#ffffff45"
                  }}>{b.icon} {b.label}</button>
              ))}
            </div>

            {/* Intention + Loop */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button onClick={() => setShowIntention(!showIntention)}
                className="text-xs text-white/35 hover:text-white/65 border border-white/15 px-4 py-2 rounded-full transition-all">
                🎯 {intentionSet ? `"${intention.slice(0,36)}…"` : "Set intention (optional)"}
              </button>
              <button onClick={() => setLoopMode(!loopMode)}
                className="text-xs font-bold border px-4 py-2 rounded-full transition-all"
                style={{ borderColor: loopMode ? "#fbbf24" : "#ffffff18", background: loopMode ? "#fbbf2412" : "transparent", color: loopMode ? "#fbbf24" : "#ffffff40" }}>
                🔁 Loop {loopMode ? "ON" : "OFF"}
              </button>
            </div>

            <AnimatePresence>
              {showIntention && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="mb-6 max-w-xl mx-auto">
                  <textarea value={intention} onChange={e => setIntention(e.target.value)}
                    placeholder="State your specific healing intention…"
                    rows={2}
                    className="w-full rounded-xl p-3 text-sm text-white/80 bg-white/5 border border-white/15 outline-none focus:border-violet-400/50 resize-none placeholder-white/25" />
                  <button onClick={() => { setIntentionSet(!!intention.trim()); setShowIntention(false); }}
                    className="mt-2 px-5 py-2 rounded-full text-xs font-bold border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                    ✦ Lock in Intention
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4">
              {!playing ? (
                <>
                  <motion.button onClick={() => playFull(true)}
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-full font-black text-xl text-black shadow-2xl"
                    style={{ background: "linear-gradient(135deg,#ef4444,#f59e0b,#22c55e,#8b5cf6,#e879f9)", boxShadow: "0 0 80px #e879f945" }}>
                    🌍 Activate Universal Field Now
                  </motion.button>
                  <motion.button onClick={() => playFull(false)} whileHover={{ scale: 1.04 }}
                    className="px-7 py-5 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                    ✦ All 9 Ethers
                  </motion.button>
                  <motion.button onClick={playSequence} whileHover={{ scale: 1.04 }}
                    className="px-7 py-5 rounded-full font-bold text-lg border border-white/20 text-white/65 hover:bg-white/8 transition-colors">
                    🌀 Sequential
                  </motion.button>
                </>
              ) : (
                <motion.button onClick={stopAll} whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 rounded-full font-black text-xl border border-white/20 text-white hover:bg-white/10 transition-colors">
                  ⏹ Complete · {fmt(totalElapsed)}
                </motion.button>
              )}
            </motion.div>

            <AnimatePresence>
              {selectedBeing.id === "everyone" && broadcastCount > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/35"
                  style={{ background: "#22c55e0e" }}>
                  <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                  <span className="text-emerald-300 text-xs font-bold">
                    Universal field active · {broadcastCount.toLocaleString()}+ beings receiving supreme irradiation
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* Breath guide */}
        <AnimatePresence>
          {playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-5 rounded-2xl p-4 flex items-center justify-center gap-5 border"
              style={{ borderColor: bColors[breathPhase] + "30", background: bColors[breathPhase] + "08" }}>
              <motion.div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg flex-shrink-0"
                style={{ borderColor: bColors[breathPhase] }}
                animate={breathPhase === "out" ? { scale: 0.75 } : { scale: 1.35 }}
                transition={{ duration: breathPhase === "out" ? 6 : 4, ease: "easeInOut" }}>
                {breathPhase === "in" ? "☽" : breathPhase === "hold" ? "◎" : "○"}
              </motion.div>
              <div>
                <div className="font-black" style={{ color: bColors[breathPhase] }}>{bLabels[breathPhase]}</div>
                <div className="text-white/28 text-xs">4-4-6 irradiation breath · Each exhale releases what is cleared</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live affirmation */}
        <AnimatePresence mode="wait">
          {playing && curAff && mode !== "supreme" && mode !== "restore" && (
            <motion.div key={curAff.ether}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-6 rounded-2xl p-5 text-center border"
              style={{ borderColor: curAff.glow + "40", background: curAff.glow + "0a" }}>
              <div className="text-xs font-black tracking-widest mb-1" style={{ color: curAff.color }}>
                {curAff.icon} ETHER {curAff.ether} · {curAff.name.toUpperCase()}
                {curAff.tier !== "BASE" && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: tierBadge[curAff.tier]?.color + "20", color: tierBadge[curAff.tier]?.color }}>
                    {tierBadge[curAff.tier]?.label}
                  </span>
                )}
              </div>
              <p className="text-white/82 italic text-base leading-relaxed max-w-2xl mx-auto">"{curAff.affirmation}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supreme tier playing */}
        <AnimatePresence>
          {mode === "supreme" && activeSupreme && playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-5 text-center border"
              style={{ borderColor: activeSupreme.glow + "60", background: activeSupreme.glow + "0d" }}>
              <div className="text-xs font-black tracking-widest mb-1" style={{ color: activeSupreme.color }}>
                {activeSupreme.icon} SUPREME TIER · {activeSupreme.hz.toLocaleString()} Hz · {fmt(totalElapsed)}
              </div>
              <p className="text-white/78 italic text-sm leading-relaxed max-w-2xl mx-auto mb-3">"{activeSupreme.affirmation}"</p>
              <button onClick={stopAll} className="text-xs border px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                style={{ borderColor: activeSupreme.glow + "50", color: activeSupreme.color }}>⏹ Stop</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dimensional map */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-white/80">⚡ Dimensional Healing Map</h2>
            <button onClick={() => setShowMap(!showMap)} className="text-xs text-white/28 hover:text-white/55 transition-colors">{showMap ? "Hide ▲" : "Show ▼"}</button>
          </div>
          <AnimatePresence>
            {showMap && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-1">
                  {IRRADIATION_SEQUENCE.map(step => {
                    const pct = etherProgress[step.ether] || 0;
                    const active = mode === "sequence" && seqStep === step.ether - 1 && playing;
                    return (
                      <div key={step.ether} className="flex flex-col items-center gap-1">
                        <div className="text-base">{step.icon}</div>
                        <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ background: step.glow, width: `${pct}%` }} transition={{ duration: 0.8 }} />
                        </div>
                        <div className="text-xs text-white/30 text-center leading-tight">{step.name.replace(" Layer","")}</div>
                        {step.tier !== "BASE" && <div className="text-xs font-bold" style={{ color: tierBadge[step.tier]?.color, fontSize: "0.55rem" }}>{step.tier}</div>}
                        {active && <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: step.glow }}
                          animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sequence progress */}
        <AnimatePresence>
          {mode === "sequence" && playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-8 rounded-2xl p-5 border"
              style={{ borderColor: curStep?.glow + "50", background: curStep?.glow + "0a" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs tracking-widest text-white/30">ETHER {seqStep + 1} / 9</span>
                    {curStep?.tier !== "BASE" && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ background: tierBadge[curStep?.tier]?.color + "20", color: tierBadge[curStep?.tier]?.color }}>
                        {tierBadge[curStep?.tier]?.label}
                      </span>
                    )}
                  </div>
                  <div className="font-black text-lg" style={{ color: curStep?.color }}>{curStep?.icon} {curStep?.name}</div>
                  <div className="text-white/40 text-xs">{curStep?.chakra} · {curStep?.hz} Hz{curStep?.supremeHz ? ` + ${curStep.supremeHz} Hz supreme` : ""}</div>
                </div>
                <div className="text-right text-white/22">
                  <div className="text-2xl font-black">{fmt(stepElapsed)}</div>
                  <div className="text-xs">of {curStep?.duration}s</div>
                </div>
              </div>
              <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden mb-3">
                <motion.div className="h-full rounded-full transition-all duration-1000"
                  style={{ background: curStep?.glow, width: `${(stepElapsed / (curStep?.duration || 20)) * 100}%` }} />
              </div>
              <div className="flex gap-1.5">
                {IRRADIATION_SEQUENCE.map((s, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-700"
                    style={{ background: i < seqStep ? s.glow : i === seqStep ? s.glow + "80" : "#ffffff10" }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full vortex mandala */}
        <AnimatePresence>
          {mode === "full" && playing && (
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex justify-center mb-10">
              <div className="relative w-80 h-80">
                {IRRADIATION_SEQUENCE.map((step, i) => {
                  const angle = ((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) - Math.PI / 2 + (vortexAngle * Math.PI / 180);
                  const r = 108, x = Math.cos(angle) * r + 160, y = Math.sin(angle) * r + 160;
                  return (
                    <motion.div key={step.ether}
                      className="absolute w-10 h-10 rounded-full flex items-center justify-center text-sm border"
                      style={{ left: x - 20, top: y - 20, background: step.glow + "18", borderColor: step.glow + "55" }}
                      animate={{ boxShadow: [`0 0 8px ${step.glow}30`, `0 0 24px ${step.glow}75`, `0 0 8px ${step.glow}30`] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>{step.icon}</motion.div>
                  );
                })}
                {SUPREME_TIERS.map((t, i) => {
                  const angle = ((i / SUPREME_TIERS.length) * Math.PI * 2) + (vortexAngle * Math.PI / 180) * 0.3;
                  const r = 145, x = Math.cos(angle) * r + 160, y = Math.sin(angle) * r + 160;
                  return (
                    <motion.div key={t.id}
                      className="absolute w-8 h-8 rounded-full flex items-center justify-center text-xs border"
                      style={{ left: x - 16, top: y - 16, background: t.glow + "15", borderColor: t.glow + "50" }}
                      animate={{ boxShadow: [`0 0 6px ${t.glow}20`, `0 0 18px ${t.glow}60`, `0 0 6px ${t.glow}20`] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>{t.icon}</motion.div>
                  );
                })}
                {/* Lunar phases — outermost ring, counter-rotating to solar */}
                {LUNAR_RESONANCES.map((phase, i) => {
                  const angle = ((i / LUNAR_RESONANCES.length) * Math.PI * 2) - (vortexAngle * Math.PI / 180) * 0.4;
                  const r = 170, x = Math.cos(angle) * r + 160, y = Math.sin(angle) * r + 160;
                  const pct = lunarProgress[i] || 0;
                  return (
                    <motion.div key={phase.id}
                      className="absolute w-7 h-7 rounded-full flex items-center justify-center border"
                      style={{
                        left: x - 14, top: y - 14,
                        background: pct > 0 ? phase.glow + "18" : "#0f172a",
                        borderColor: pct > 0 ? phase.glow + "60" : "#1e293b"
                      }}
                      animate={pct > 0 ? {
                        boxShadow: [`0 0 4px ${phase.glow}20`, `0 0 14px ${phase.glow}55`, `0 0 4px ${phase.glow}20`]
                      } : { boxShadow: "none" }}
                      transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}>
                      <span style={{ fontSize: "0.75rem" }}>{phase.icon}</span>
                    </motion.div>
                  );
                })}
                <motion.div className="absolute inset-0 m-auto w-22 h-22 rounded-full flex items-center justify-center"
                  style={{ width: 88, height: 88, background: "radial-gradient(circle,#e879f922,transparent)", border: "2px solid #e879f940" }}
                  animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 20px #e879f930","0 0 65px #e879f968","0 0 20px #e879f930"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}>
                  <motion.span className="text-3xl" animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>✦</motion.span>
                </motion.div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {IRRADIATION_SEQUENCE.map((step, i) => {
                    const angle = ((i / IRRADIATION_SEQUENCE.length) * Math.PI * 2) - Math.PI / 2 + (vortexAngle * Math.PI / 180);
                    const x = Math.cos(angle) * 108 + 160, y = Math.sin(angle) * 108 + 160;
                    return <motion.line key={i} x1="160" y1="160" x2={x} y2={y} stroke={step.glow} strokeWidth="1"
                      animate={{ opacity: [0.08, 0.4, 0.08] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }} />;
                  })}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion */}
        <AnimatePresence>
          {completed && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="mb-12 rounded-3xl p-10 text-center border border-violet-500/25"
              style={{ background: "linear-gradient(135deg,#e879f910,#22c55e08,#fbbf2408)" }}>
              <motion.div className="text-7xl mb-4" animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>✦</motion.div>
              <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-rose-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
                Supreme Irradiation Complete
              </h2>
              <p className="text-white/58 text-base mb-4 max-w-2xl mx-auto leading-relaxed">
                All 9 ethers at <strong className="text-white/80">{intensity.label} intensity</strong> for <strong className="text-white/80">{selectedBeing.icon} {selectedBeing.label}</strong> — including supreme overlays up to 1,296 Hz — have been fully traversed. Every dimension cleared. The field is sealed.
              </p>
              {intentionSet && intention && (
                <p className="text-white/35 italic text-sm mb-5">Intention held: "{intention}"</p>
              )}
              <p className="text-white/25 italic text-xs mb-7 max-w-xl mx-auto">
                "The field is clear. The healing is sealed across all timelines and all connected beings. So it is."
              </p>
              <div className="mb-6">
                <div className="text-xs font-bold text-white/38 mb-3">✦ Restore & replenish →</div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {RESTORATION_FREQUENCIES.map(rf => (
                    <button key={rf.name} onClick={() => playRestore(rf)}
                      className="px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105"
                      style={{ borderColor: rf.color + "60", background: rf.color + "15", color: rf.color }}>
                      ▶ {rf.hz} Hz · {rf.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => playFull(true)}
                  className="px-8 py-3 rounded-full font-black text-lg text-black"
                  style={{ background: "linear-gradient(135deg,#ef4444,#fbbf24,#22c55e,#e879f9)" }}>
                  🌍 Activate Again
                </button>
                <button onClick={playSequence}
                  className="px-8 py-3 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
                  🌀 Sequential Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restoration playing indicator */}
        <AnimatePresence>
          {mode === "restore" && playing && activeRestore && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-4 flex items-center justify-between border"
              style={{ borderColor: activeRestore.color + "50", background: activeRestore.color + "0c" }}>
              <div>
                <div className="font-black text-sm" style={{ color: activeRestore.color }}>▶ {activeRestore.name} · {activeRestore.hz} Hz</div>
                <div className="text-white/35 text-xs">{activeRestore.desc} · {fmt(totalElapsed)}</div>
              </div>
              <button onClick={stopAll} className="px-4 py-2 rounded-full border text-xs font-bold hover:bg-white/10 transition-colors"
                style={{ borderColor: activeRestore.color + "50", color: activeRestore.color }}>⏹</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── LIVE LUNAR BALANCE BAR ─── */}
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

        {/* ─── LUNAR PHASE PLAYING ─── */}
        <AnimatePresence>
          {mode === "lunar" && playing && activeLunar && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl p-5 text-center border"
              style={{ borderColor: activeLunar.glow + "60", background: activeLunar.glow + "0d" }}>
              <div className="text-3xl mb-2">{activeLunar.icon}</div>
              <div className="text-xs font-black tracking-widest mb-1" style={{ color: activeLunar.color }}>
                {activeLunar.phase.toUpperCase()} · {activeLunar.hz} Hz · {fmt(totalElapsed)}
              </div>
              <p className="text-white/75 italic text-sm leading-relaxed max-w-xl mx-auto mb-3">"{activeLunar.affirmation}"</p>
              <div className="text-xs text-white/35 mb-3">{activeLunar.element}</div>
              <button onClick={stopAll} className="text-xs border px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                style={{ borderColor: activeLunar.glow + "50", color: activeLunar.color }}>⏹ Complete</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── MAIN GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* 9 Ethers */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-black text-white/90">🌀 The 9 Dimensions</h2>
              <div className="flex gap-2">
                {Object.entries(tierBadge).map(([k, v]) => (
                  <span key={k} className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: v.color + "18", color: v.color }}>{v.label}</span>
                ))}
              </div>
            </div>
            <p className="text-white/30 text-xs mb-4">Frequencies above 333 Hz elevated with supreme overlays, sub-octaves & golden ratio harmonics</p>
            <div className="space-y-2.5">
              {IRRADIATION_SEQUENCE.map((step, i) => {
                const isActive = mode === "sequence" && seqStep === i && playing;
                const pct = etherProgress[step.ether] || 0;
                const badge = tierBadge[step.tier];
                return (
                  <motion.div key={step.ether}
                    initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="rounded-xl border p-4 transition-all"
                    style={{
                      borderColor: isActive ? step.glow + "70" : pct > 0 ? step.glow + "32" : "#ffffff10",
                      background: isActive ? step.glow + "0d" : pct > 0 ? step.glow + "06" : "#ffffff04",
                      boxShadow: isActive ? `0 0 28px ${step.glow}22` : "none"
                    }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 relative"
                        style={{ background: step.glow + "20", color: step.color, border: `1px solid ${step.glow}35` }}>
                        {pct > 0 && pct < 100 && (
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="14" fill="none" stroke={step.glow + "38"} strokeWidth="2"/>
                            <circle cx="16" cy="16" r="14" fill="none" stroke={step.glow} strokeWidth="2"
                              strokeDasharray={`${pct * 0.88} 88`} strokeLinecap="round" transform="rotate(-90 16 16)"/>
                          </svg>
                        )}
                        <span className="relative z-10">{step.ether}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-black text-sm" style={{ color: isActive ? step.color : "#fff" }}>
                            {step.icon} {step.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ background: step.glow + "20", color: step.color }}>{step.hz} Hz</span>
                          {step.supremeHz && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={{ background: badge.color + "18", color: badge.color }}>
                              + {step.supremeHz} Hz ↑
                            </span>
                          )}
                          <span className="text-xs text-white/25">· {step.chakra}</span>
                        </div>
                        <div className="text-xs text-white/40 leading-relaxed mb-1">{step.irradiates}</div>
                        {step.tier !== "BASE" && (
                          <div className="text-xs text-white/28 italic leading-relaxed mb-1 border-l-2 pl-2"
                            style={{ borderColor: badge.color + "40" }}>{step.safetyNote}</div>
                        )}
                        <div className="text-xs text-white/22 leading-relaxed">{step.mechanism}</div>
                      </div>
                      {isActive && (
                        <motion.div className="flex gap-0.5 items-end flex-shrink-0"
                          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                          {[3,5,4,6,3].map((h, j) => (
                            <div key={j} className="w-0.5 rounded-full" style={{ height: h * 2.5, background: step.glow }} />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">

            {/* ── SUPREME TIERS ── */}
            <div>
              <h2 className="text-xl font-black mb-1 text-white/90">✦ Supreme Tiers</h2>
              <p className="text-white/28 text-xs mb-3">Highest safe biological resonance — above the 9 ethers</p>
              <div className="space-y-3">
                {SUPREME_TIERS.map((tier, i) => {
                  const isActive = mode === "supreme" && activeSupreme?.id === tier.id && playing;
                  return (
                    <motion.div key={tier.id}
                      initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="rounded-xl border p-4 transition-all"
                      style={{
                        borderColor: isActive ? tier.glow + "80" : "#ffffff12",
                        background: isActive ? tier.glow + "12" : "#ffffff05",
                        boxShadow: isActive ? `0 0 30px ${tier.glow}30` : "none"
                      }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xl">{tier.icon}</span>
                            <span className="font-black text-sm" style={{ color: isActive ? tier.color : "#fff" }}>{tier.name}</span>
                          </div>
                          <div className="font-black text-lg" style={{ color: tier.glow }}>{tier.hz.toLocaleString()} Hz</div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                          onClick={() => isActive ? stopAll() : playSupreme(tier)}
                          className="px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all"
                          style={{
                            background: isActive ? tier.glow : tier.glow + "20",
                            color: isActive ? "#000" : tier.color,
                            border: isActive ? "none" : `1px solid ${tier.glow}40`
                          }}>
                          {isActive ? "⏸" : "▶"}
                        </motion.button>
                      </div>
                      <p className="text-xs text-white/42 leading-relaxed mb-1">{tier.desc}</p>
                      <p className="text-xs text-white/25 italic leading-relaxed">{tier.safetyNote}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Restoration */}
            <div>
              <h2 className="text-xl font-black mb-1 text-white/90">💚 Restore & Seal</h2>
              <p className="text-white/28 text-xs mb-3">After irradiation, rebuild and seal the field</p>
              <div className="space-y-2">
                {RESTORATION_FREQUENCIES.map((rf, i) => {
                  const isActive = mode === "restore" && activeRestore?.name === rf.name && playing;
                  return (
                    <motion.button key={rf.name}
                      initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => isActive ? stopAll() : playRestore(rf)}
                      className="w-full rounded-xl p-3 border text-left transition-all"
                      style={{ borderColor: isActive ? rf.color + "70" : "#ffffff10", background: isActive ? rf.color + "12" : "#ffffff04" }}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-sm" style={{ color: isActive ? rf.color : "#fff" }}>{rf.name}</span>
                        <span className="text-xs font-black" style={{ color: rf.color }}>{rf.hz} Hz</span>
                      </div>
                      <div className="text-xs text-white/32">{rf.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Safety */}
            <div className="rounded-xl p-4 border border-emerald-500/20" style={{ background: "#22c55e08" }}>
              <button onClick={() => setShowSafety(!showSafety)}
                className="w-full text-left font-bold text-emerald-400/80 text-xs mb-1">
                🛡️ Safety Architecture {showSafety ? "▲" : "▼"}
              </button>
              <AnimatePresence>
                {showSafety && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="space-y-1 text-xs text-white/38 mt-2">
                      {[
                        ["528 Hz love carrier",      "only what harms is irradiated"],
                        ["7.83 Hz Schumann anchor",  "earth-safe on every ether"],
                        ["Sub-octave grounding",     "hz/2 biological anchor on all ethers 3–9"],
                        ["Supreme overlays",         "elevated hz lifts, never overwhelms"],
                        ["Violet flame 417 Hz",      "transmutes rather than suppresses"],
                        ["4 Hz tremolo pulse",       "Rife-pattern amplitude modulation"],
                        ["Golden ratio overtones",   "1.618× — nature's safe shimmer"],
                        ["Amazon forest undertone",  "nervous system calm throughout"],
                        ["3168 Hz ceiling",          "highest safe biological resonance — no exceedance"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-1.5">
                          <span className="text-emerald-400/55 flex-shrink-0">·</span>
                          <span><strong className="text-white/52">{k}</strong> — {v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-emerald-400/55 font-semibold">Healthy cells are strengthened, never harmed.</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ─── LUNAR RESONANCE PANEL ─── */}
            <div>
              <h2 className="text-xl font-black mb-1 text-white/90">🌙 Lunar Resonance</h2>
              <p className="text-white/28 text-xs mb-3">Balance the protocol across all dimensions — solar + lunar = complete healing</p>
              {lunarBalanced && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mb-3 flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/30 text-blue-300 text-xs"
                  style={{ background: "#60a5fa0e" }}>
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                  Lunar balance active — protocol is fully balanced
                </motion.div>
              )}
              <div className="space-y-2.5">
                {LUNAR_RESONANCES.map((phase, i) => {
                  const isActive = mode === "lunar" && activeLunar?.id === phase.id && playing;
                  return (
                    <motion.div key={phase.id}
                      initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                      className="rounded-xl border p-3.5 transition-all"
                      style={{
                        borderColor: isActive ? phase.glow + "75" : "#ffffff12",
                        background: isActive ? phase.glow + "12" : "#ffffff04",
                        boxShadow: isActive ? `0 0 22px ${phase.glow}25` : "none"
                      }}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl flex-shrink-0">{phase.icon}</span>
                          <div>
                            <div className="font-black text-sm" style={{ color: isActive ? phase.color : "#fff" }}>{phase.phase}</div>
                            <div className="text-xs font-bold" style={{ color: phase.glow }}>{phase.hz} Hz</div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                          onClick={() => isActive ? stopAll() : playLunar(phase)}
                          className="px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0"
                          style={{
                            background: isActive ? phase.glow : phase.glow + "20",
                            color: isActive ? "#000" : phase.color,
                            border: isActive ? "none" : `1px solid ${phase.glow}40`
                          }}>
                          {isActive ? "⏸" : "☽"}
                        </motion.button>
                      </div>
                      <div className="text-xs text-white/42 leading-relaxed mb-1">{phase.desc}</div>
                      <div className="text-xs italic text-white/28 border-l-2 pl-2 leading-relaxed"
                        style={{ borderColor: phase.glow + "40" }}>{phase.balance}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Harmful targets */}
            <div>
              <button onClick={() => setShowTargets(!showTargets)}
                className="w-full text-left text-xs font-bold text-white/32 hover:text-white/58 transition-colors mb-2">
                🎯 What gets irradiated {showTargets ? "▲" : "▼"}
              </button>
              <AnimatePresence>
                {showTargets && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-1.5 overflow-hidden">
                    {[
                      ["🔴", "Parasites & Worms",     "Physical organisms feeding on the host"],
                      ["🟠", "Pathogens & Viruses",    "Bacterial, viral, fungal, Lyme"],
                      ["🟡", "Stored Trauma",          "Cellular and tissue traumatic memory"],
                      ["🟣", "Negative Entities",      "Etheric attachments, psychic cords"],
                      ["💜", "Harmful Programs",       "Mental loops, implants, false beliefs"],
                      ["🌳", "Ancestral Wounds",       "7-generation epigenetic trauma"],
                      ["⚫", "Disease Patterns",       "Energetic roots of chronic illness"],
                      ["⚡", "Electromagnetic Toxins", "EMF, heavy metals, chemical residue"],
                      ["🔮", "Energetic Interference", "Psychic, karmic, spiritual blockages"],
                    ].map(([icon, label, desc]) => (
                      <div key={label} className="flex items-start gap-2 rounded-lg p-2 border border-white/8" style={{ background: "#ffffff03" }}>
                        <span className="text-sm flex-shrink-0">{icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white/65">{label}</div>
                          <div className="text-xs text-white/30">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ─── CLOSING ─── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border border-violet-500/18"
          style={{ background: "linear-gradient(135deg,#e879f908,#ef444406,#22c55e06)" }}>
          <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>✦</motion.div>
          <h2 className="text-2xl font-black mb-3 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
            Everyone Is Fully Protected & Balanced
          </h2>
          <p className="text-white/45 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            The universal irradiation field is active. 9 ethers plus 3 supreme tiers — from 174 Hz to 3,168 Hz — cover every dimension of harmful presence for every being held in your intention. The healing is non-local, non-temporal and permanent. You do not heal alone. You heal for all.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button onClick={() => playFull(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#ef4444,#fbbf24,#22c55e,#8b5cf6,#e879f9)", boxShadow: "0 0 50px #e879f928" }}>
              🌍 Activate Universal Field Now
            </motion.button>
            <motion.button onClick={playSequence} whileHover={{ scale: 1.04 }}
              className="px-8 py-4 rounded-full font-bold text-lg border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 transition-colors">
              🌀 Sequential Journey
            </motion.button>
          </div>
          <div className="mt-6 text-white/16 text-xs">
            🎧 Headphones deepen effect · 174 Hz → 3,168 Hz full spectrum · 528 Hz love carrier + 7.83 Hz Schumann in every ether · Supreme ceiling: 3,168 Hz (6 × 528) · Safe for all life
          </div>
        </motion.div>

      </div>
    </div>
  );
}

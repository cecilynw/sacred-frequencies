Deno.serve(async (_req) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#030712">
<title>Sacred Frequencies — Free Sound Demo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#030712;--card:#0f172a;--border:#1e293b;--text:#e2e8f0;--muted:#94a3b8;--dim:#475569}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;padding:0 0 60px}
.hero{text-align:center;padding:40px 20px 24px}
.hero-badge{display:inline-block;padding:4px 14px;border:1px solid #7c3aed55;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#a78bfa;margin-bottom:14px;text-transform:uppercase}
h1{font-size:clamp(24px,6vw,38px);font-weight:900;line-height:1.15;margin-bottom:10px;background:linear-gradient(135deg,#fbbf24,#f472b6,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{color:var(--muted);font-size:14px;line-height:1.7;max-width:520px;margin:0 auto}
.wrap{max-width:600px;margin:0 auto;padding:0 18px}
.track{background:linear-gradient(160deg,#0f172a,#0d1117);border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:14px}
.track h3{font-size:15px;font-weight:800;margin-bottom:4px}
.track p{font-size:12.5px;color:var(--muted);line-height:1.6;margin-bottom:12px}
audio{width:100%;height:38px;border-radius:8px}
.footer-note{text-align:center;font-size:11px;color:var(--dim);margin-top:24px;padding:0 20px}
.cta{text-align:center;margin:28px 18px 8px}
.btn{display:inline-block;padding:13px 28px;border-radius:999px;font-weight:800;font-size:14px;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;text-decoration:none;box-shadow:0 0 24px #7c3aed40}
.tag{display:inline-block;font-size:10px;font-weight:700;padding:3px 10px;border-radius:999px;background:#7c3aed20;color:#a78bfa;margin-bottom:8px}
</style>
</head>
<body>
  <div class="hero">
    <div class="hero-badge">✦ Sacred Frequencies · Free Demo</div>
    <h1>Hear It For Yourself</h1>
    <p class="sub">Real audio samples straight from the app — no login, no payment, just tap play. Best on headphones, silent switch off.</p>
  </div>
  <div class="wrap">
    <div class="track">
      <span class="tag">Solfeggio</span>
      <h3>528 Hz — DNA Repair & Miracle Frequency</h3>
      <p>Pure healing tone. Exactly what plays in the app's Player when you select this track.</p>
      <audio controls preload="none" src="https://base44.app/api/apps/6a2503d75150596e1dadce0f/files/mp/public/6a2503d75150596e1dadce0f/d9fc8ab35_1_528hz_dna_repair.wav"></audio>
    </div>
    <div class="track">
      <span class="tag">Nature Layer</span>
      <h3>432 Hz + Nature Ambience</h3>
      <p>Healing tone layered under a soft nature ambience bed — the same layering used throughout the app.</p>
      <audio controls preload="none" src="https://base44.app/api/apps/6a2503d75150596e1dadce0f/files/mp/public/6a2503d75150596e1dadce0f/8af817306_2_432hz_nature_ambience.wav"></audio>
    </div>
    <div class="track">
      <span class="tag">Binaural</span>
      <h3>7.83 Hz Schumann Resonance</h3>
      <p>Sub-audible Earth frequency delivered as a binaural beat — headphones recommended for full effect.</p>
      <audio controls preload="none" src="https://base44.app/api/apps/6a2503d75150596e1dadce0f/files/mp/public/6a2503d75150596e1dadce0f/32ff188b3_3_schumann_binaural_783hz.wav"></audio>
    </div>
    <div class="track">
      <span class="tag">Nature Portal</span>
      <h3>Amazon Rainforest Ambience</h3>
      <p>The nature bed that plays under every frequency track in the app, with a subtle 432 Hz undertone.</p>
      <audio controls preload="none" src="https://base44.app/api/apps/6a2503d75150596e1dadce0f/files/mp/public/6a2503d75150596e1dadce0f/250db552c_4_amazon_rainforest_ambience.wav"></audio>
    </div>
  </div>
  <div class="cta">
    <a class="btn" href="https://superagent-1dadce0f.base44.app/functions/sacredApp">✦ Open the Full App</a>
  </div>
  <div class="footer-note">🔒 528 Hz + 7.83 Hz Universal Safety Promise anchors present in every protocol · 40 frequencies · Sacred Frequencies</div>
</body>
</html>`;
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" }
  });
});

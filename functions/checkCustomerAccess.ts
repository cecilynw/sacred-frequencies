import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Use POST' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }
    const body = await req.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();
    if (!email) {
      return new Response(JSON.stringify({ error: 'email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const base44 = createClientFromRequest(req);
    const records = await base44.asServiceRole.entities.PaidCustomer.filter({ email });

    let tier = 'free';
    let status = 'active';
    if (records && records.length > 0) {
      const rec = records.sort((a, b) => new Date(b.updated_date).getTime() - new Date(a.updated_date).getTime())[0];
      status = rec.status || 'active';
      tier = status === 'active' ? (rec.tier || 'free') : 'free';
    }

    return new Response(JSON.stringify({ email, tier, status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});

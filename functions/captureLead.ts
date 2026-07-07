import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Use POST' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }
    const body = await req.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const base44 = createClientFromRequest(req);
    const existing = await base44.asServiceRole.entities.PaidCustomer.filter({ email });

    if (!existing || existing.length === 0) {
      await base44.asServiceRole.entities.PaidCustomer.create({
        email,
        tier: 'free',
        status: 'active',
        source: 'lead_capture',
        subscribed_date: new Date().toISOString()
      });
    }

    return new Response(JSON.stringify({ success: true, email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});

// Stripe subscription webhook handler for Sacred Frequencies
// Handles: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
//
// NOTE: This is prepped ahead of time. Once Stripe products/prices exist,
// register this function's URL as a Stripe webhook endpoint (via manage_stripe
// action="register_webhook" in a fresh session, or manually in the Stripe dashboard)
// listening for the events above. Map price IDs to tiers below once known.

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function b64url(str: string) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sendGmail(base44: any, to: string, subject: string, bodyText: string) {
  try {
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    const raw = b64url(
      `To: ${to}\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
      bodyText
    );
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw })
    });
    return res.ok;
  } catch (_e) {
    return false;
  }
}

// TODO: fill these in once the Healer / Ascended Stripe Prices exist
// e.g. { "price_1AbCdEf...": "healer", "price_1XyZ...": "ascended" }
const PRICE_TO_TIER: Record<string, string> = {};

function detectTierFromSession(session: any): string {
  const priceId =
    session?.line_items?.data?.[0]?.price?.id ||
    session?.display_items?.[0]?.price?.id ||
    session?.metadata?.price_id ||
    '';
  if (PRICE_TO_TIER[priceId]) return PRICE_TO_TIER[priceId];
  // Fallback: look at amount (in the smallest currency unit, e.g. pence)
  const amount = session?.amount_total || session?.amount || 0;
  if (amount >= 3300) return 'ascended';
  if (amount >= 1100) return 'healer';
  return 'healer';
}

Deno.serve(async (req) => {
  try {
    const event = await req.json();
    const base44 = createClientFromRequest(req);
    const type = event?.type || '';
    const obj = event?.data?.object || {};

    const email =
      obj?.customer_details?.email ||
      obj?.customer_email ||
      obj?.email ||
      '';

    if (!email) {
      return new Response(JSON.stringify({ ok: true, note: 'no email on event' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const lowerEmail = email.toLowerCase();
    const existing = await base44.asServiceRole.entities.PaidCustomer.filter({ email: lowerEmail });

    if (type === 'checkout.session.completed') {
      const tier = detectTierFromSession(obj);
      const data = {
        email: lowerEmail,
        tier,
        status: 'active',
        wix_order_id: obj?.id || '',
        subscribed_date: new Date().toISOString(),
        source: 'stripe_checkout'
      };
      if (existing.length > 0) {
        await base44.asServiceRole.entities.PaidCustomer.update(existing[0].id, data);
      } else {
        await base44.asServiceRole.entities.PaidCustomer.create(data);
      }
      const tierName = tier === 'ascended' ? 'Ascended' : 'Healer';
      await sendGmail(
        base44,
        lowerEmail,
        `Welcome to ${tierName} — Sacred Frequencies`,
        `Thank you for subscribing to the ${tierName} tier!\n\nYour access is now active. Open the Sacred Frequencies app and enter this email address (${lowerEmail}) when prompted to unlock your new modules.\n\nWith gratitude,\nSacred Frequencies Healing Collective`
      );
    } else if (type === 'customer.subscription.deleted') {
      if (existing.length > 0) {
        await base44.asServiceRole.entities.PaidCustomer.update(existing[0].id, {
          status: 'canceled',
          tier: 'free',
          canceled_date: new Date().toISOString()
        });
      }
      await sendGmail(
        base44,
        lowerEmail,
        'Your Sacred Frequencies subscription has been canceled',
        `Your subscription has been canceled and your account has moved back to the Free tier.\n\nYou can resubscribe anytime from the Plans page inside the Sacred Frequencies app.\n\nWith gratitude,\nSacred Frequencies Healing Collective`
      );
    }

    return new Response(JSON.stringify({ ok: true, type, email: lowerEmail }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});

# Sacred Frequencies App — Monetization Roadmap

**Prepared for:** Cecilyn Williams
**Date:** 7 July 2026
**Status:** Draft for review

---

## 1. Purpose

This document outlines the current state of the Sacred Frequencies app's monetization system, the gaps identified during audit, and the phased roadmap to bring real, working payment collection online across the Free, Healer (£11/month), and Ascended (£33/month) tiers.

---

## 2. Audit Findings — Current Gaps

An audit of the live checkout flow identified three critical gaps that mean **no real monetization is currently happening**, despite the pricing UI being fully designed:

| # | Gap | Impact |
|---|-----|--------|
| 1 | No payment processor connected | The "Continue to Payment" button shows a fake confirmation message. No card is ever charged. |
| 2 | No unlock mechanism after checkout | Even in a simulated payment, no code path ever grants Healer/Ascended access. The gate has no key on the other side. |
| 3 | Email capture does not persist | The "Join the Sacred Circle" signup form only saves to the visitor's own browser (localStorage) and is never transmitted anywhere. Every lead is currently lost. |

---

## 3. Resolution — Payment Provider

**Decision: Wix Payments** (over Stripe)

| Factor | Wix Payments | Stripe |
|---|---|---|
| Setup complexity | Built into Base44 — one-click connect | Requires separate account, business/bank verification, manual API keys |
| Ongoing maintenance | None — managed by Base44 | Requires manual key rotation/monitoring |
| Subscription billing | Native support | Native support |
| Webhook integration | Plugs directly into Base44 automations | Requires custom webhook handler code |
| UK support | Yes — pricing already in £ | Yes |
| Best fit for | Non-technical owner, simple 2-tier subscription app | Complex/custom checkout needs, brand preference |

**Status: ✅ Wix Payments connected** (7 July 2026)

---

## 4. Division of Responsibility

Because Wix Payments product/checkout setup happens in the Wix dashboard (not via API), work is split as follows:

**Cecilyn (Wix Dashboard):**
- Create two subscription products: "Healer" (£11/month) and "Ascended" (£33/month)
- Generate and share the checkout link for each product
- Complete business verification in the Payments dashboard to enable payouts to her bank account

**Agent (Build & Automate):**
- Replace the fake checkout button with real Wix checkout links
- Build the webhook automation that listens for successful payments and cancellations
- Build the access-grant system (email-based unlock, no passwords required)
- Fix lead capture so signups are saved and followed up automatically

---

## 5. Roadmap Phases

### Phase 1 — Real Payment Processing ✅ *Complete*
Connect Wix Payments to the app so real charges can be processed.

### Phase 2 — Real Checkout
Cecilyn creates the Healer and Ascended subscription products in her Wix dashboard and shares the checkout links. Agent replaces the current fake "Go to Plans & Payment" button with these real, working checkout links.

### Phase 3 — Automatic Unlock on Payment
Agent sets up a webhook automation on Wix's `order_created` event. When a payment succeeds:
1. Customer's email and purchased tier are recorded in a database table.
2. A confirmation email is sent automatically (via connected Gmail) with their personal access link.
3. The app checks a visitor's email against this table to unlock the correct tier — simple, no account or password required.

### Phase 4 — Automatic Downgrade on Cancellation
Agent sets up a second webhook automation on Wix's `order_canceled` event, automatically reverting a customer to the Free tier if they cancel — no manual tracking needed.

### Phase 5 — Lead Capture Fix
Agent connects the "Join the Sacred Circle" signup form to the same database table (as a free-tier lead) and automatically emails the free Healing Frequency Guide via Gmail — ensuring every signup is captured and followed up, not lost.

---

## 6. Summary Flow (Once Complete)

```
Visitor clicks "Activate Healer"
        ↓
Real Wix checkout — card charged
        ↓
Webhook fires → email + tier saved to database
        ↓
Confirmation email sent automatically
        ↓
App recognizes visitor's email → unlocks Healer content
        ↓
(If cancelled later) → webhook auto-downgrades to Free
```

---

## 7. Next Immediate Step

Awaiting Cecilyn to create the Healer and Ascended subscription products in the Wix Payments dashboard and share the resulting checkout links, so Phase 2 can begin.

---

*Document prepared by the Sacred Frequencies app assistant. Living document — will be updated as each phase completes.*

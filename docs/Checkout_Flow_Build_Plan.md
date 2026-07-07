# Sacred Frequencies App — Checkout Flow Build Plan

**Date:** 7 July 2026
**Status:** Blocked on Step 1 (awaiting Wix checkout links from Cecilyn)
**Context:** Phases 2–5 of the Monetization Roadmap (see `Sacred_App_Monetization_Roadmap.md`), now that Wix Payments is connected.

---

## Step 1 — Get the real checkout links *(Cecilyn)*
Create "Healer" (£11/mo) and "Ascended" (£33/mo) subscription products in the Wix Payments dashboard, then copy the checkout link Wix generates for each.

## Step 2 — Wire up real checkout *(Agent)*
Replace the current fake `startCheckout`/`confirmCheckout` functions in `sacredApp.ts` with the two real Wix checkout links — clicking "Activate Healer" or "Ascend Now" opens an actual payment page instead of the current fake modal.

## Step 3 — Build the customer database *(Agent)*
Create a new entity `PaidCustomer` with fields: `email`, `tier`, `order_id`, `status`, `subscribed_date`. This becomes the single source of truth for who has paid for what.

## Step 4 — Webhook automation for payments *(Agent)*
Connector automation on Wix's `order_created` event: when it fires, record the customer's email + tier in `PaidCustomer`, then send a confirmation email with their personal access link via the connected Gmail account.

## Step 5 — Webhook automation for cancellations *(Agent)*
Same setup on Wix's `order_canceled` event — automatically flips status back to Free, no manual tracking required.

## Step 6 — Real access-check in the app *(Agent)*
Replace the current pure-localStorage tier check with an actual lookup: visitor enters their email once, the app checks it against `PaidCustomer`, unlocks the matching tier, then caches the result locally so they aren't asked again on return visits.

## Step 7 — Fix lead capture *(Agent)*
Route "Join the Sacred Circle" signups into the same `PaidCustomer` entity as Free-tier leads, and auto-send the Healing Frequency Guide via Gmail.

## Step 8 — Test & deploy *(Agent)*
Full end-to-end test with a real small transaction: verify the webhook fires, unlock works, cancellation downgrades correctly — then deploy and confirm live via Browserbase.

---

**Current blocker:** Step 1. Everything from Step 2 onward can start immediately once Cecilyn shares the two Wix checkout links.

# Pricing Card Component — Product Requirements Document (V1)

**Version:** 1.0
**Status:** Ready to build
**Audience:** Engineering (Claude Code, dev team)

---

## 1. One-line summary

Connect Stripe once, build pricing cards in a central dashboard, embed them on your site, and see exactly how each card performs — impressions, hovers, clicks, checkout completions, all in one view.

Edit pricing once in the dashboard, every embed across every page updates automatically. No code changes. No redeploys. No engineering required.

---

## 2. Scope

### 2.1 In scope for V1

- Stripe OAuth connection with bidirectional product and price sync
- Visual card builder in central dashboard — multiple cards per account, one source of truth
- Embed via script tag, React component, or hosted page
- Edit-once-update-everywhere: changing a card in the dashboard updates every embed of that card instantly
- Per-card analytics: impressions, tier-level hovers, tier-level clicks, checkout completions
- Funnel visualization per card: impression → hover → click → checkout
- Lightweight A/B toggle: assign 2 card variants to the same embed URL, 50/50 traffic split

### 2.2 Explicitly out of scope (V2+)

- Multivariate testing, sequential testing, statistical significance handling
- Benchmark dataset across customers / aggregate intelligence
- AI-driven recommendations or plan-structure auditing
- Multi-processor support (Paddle, Lemon Squeezy, Polar) — Stripe only in V1
- Competitor pricing tracking
- Geographic price localization beyond Stripe's native multi-currency
- Micro-surveys, abandonment recovery emails, behavioral re-engagement
- Components beyond the pricing card (FAQ, comparison tables, etc.)

The discipline of holding the line on 2.2 is what makes V1 shippable in 3 months instead of 9.

---

## 3. Moat thesis

The moat is Senja-shaped: multiple embeds across a customer's marketing site, all pointing at hosted card configurations we control. Three dynamics:

**Embed proliferation.** A typical SaaS marketing site has pricing in more places than the founder realizes: pricing page, homepage CTA, comparison page, upgrade prompts on feature pages, campaign landing pages. Each becomes another embed. By embed #3, switching means editing three places in production code.

**Central source-of-truth becomes load-bearing.** When the founder wants to raise prices, run a promo, change tier names, or update feature lists, their muscle memory is "open the dashboard." Stripe Pricing Table can only show what's in Stripe — it can't model the marketing context (tier names different from Stripe product names, feature lists, badges, promotional copy).

**Real-customer-interaction asset (the v0/21st.dev test).** A design tool can clone the card UI in an afternoon. It cannot clone the impressions, hovers, clicks, and checkout completions accumulated from real visitors on the customer's production marketing site. That data is the asset.

---

## 4. Core user flows

### 4.1 First-time setup (target: <5 minutes)

1. Sign up with email or Google
2. Connect Stripe via OAuth (one click)
3. Dashboard auto-detects existing Stripe products and offers a starter card layout
4. Customize card: tier names, feature lists, colors (auto-pulled from brand site URL), badges
5. Copy embed snippet
6. Paste into site (Webflow, Framer, Next.js, WordPress, plain HTML)
7. Card live, analytics start collecting on first impression

### 4.2 Ongoing workflow (the load-bearing one)

1. Founder wants to change pricing or copy
2. Open dashboard, edit card
3. Save
4. Every embed of that card updates instantly across the site
5. Analytics show before/after impact on conversion

### 4.3 Lightweight A/B (the soft experimentation feature)

1. Founder has a card live and wants to test an alternative
2. Duplicate the card, edit the duplicate (different price, copy, layout)
3. Toggle on "split test" — pair the two cards on the same embed URL
4. 50/50 traffic split, sticky per-visitor
5. Analytics view shows both cards side-by-side with the same funnel metrics
6. Founder makes the call manually — no automated significance, no statistical engine

---

## 5. Feature detail

### 5.1 Stripe integration

- OAuth Connect for read/write access to customer's Stripe account
- Auto-sync: products, prices, currencies, billing intervals, trial periods
- Display (but not creation in V1) of metered/usage-based plans
- Bidirectional sync: edit price in our dashboard → updates in Stripe; edit price in Stripe → syncs back to our dashboard
- Webhook listeners for real-time sync
- Test mode toggle that mirrors Stripe test mode
- Handle multiple currencies on a single product (Stripe supports this natively)
- Surface Stripe errors clearly (e.g., "This price has active subscriptions and can't be modified")

### 5.2 Card builder

**Visual editing:**

- Drag-and-drop tier ordering
- Tier name override ("Pro" in marketing card vs "professional-plan-v2" in Stripe)
- Feature list editing with checkmark/X/highlight markers
- Badges per tier: Most Popular, Best Value, Coming Soon, custom
- Strikethrough pricing for promotional anchoring
- CTA button text and destination URL per tier
- Annual/monthly toggle with savings auto-calculation

**Visual styling:**

- Brand color extraction from a URL (paste customer's site, auto-pull primary/accent/background colors)
- Manual override for all colors, fonts, radii, shadows, spacing
- Light/dark mode toggle and auto-detect
- Card layouts: 2-tier, 3-tier, 4-tier, comparison-grid, single-tier-with-features
- Mobile responsive by default — every layout works on mobile without configuration

**Output:**

- Live preview matches embed exactly
- Mobile/tablet/desktop preview toggles
- Accessibility: WCAG AA contrast checking on every save

### 5.3 Embedding

- Script tag embed (primary path) — single line, async, non-blocking
- React component via npm package (for technical users)
- Hosted standalone page on subdomain (for founders without a site yet)
- Custom domain support on paid plans
- Integration guides: Webflow, Framer, WordPress, Next.js, Carrd, plain HTML
- Embed code includes a unique card ID — multiple embeds of the same card share analytics; different cards report separately
- Shadow DOM isolation so customer site CSS can't break the card and vice versa
- Performance budget: <20kb gzipped, <100ms time to first meaningful paint, zero Cumulative Layout Shift

### 5.4 Analytics

**Events captured per card:**

- `impression` — card entered visitor's viewport
- `tier_hover` — visitor hovered on a specific tier for >500ms
- `tier_click` — visitor clicked the CTA on a specific tier
- `checkout_complete` — visitor completed Stripe Checkout for a tier (matched via Stripe webhook)

**Dashboard views per card:**

- **Summary table:** impressions, total clicks, total checkouts, top-converting tier
- **Funnel viz:** impression → hover → click → checkout, with drop-off % at each step
- **Per-tier breakdown:** hovers and clicks per tier, with hover-but-didn't-click as the headline actionable metric
- **Time-series:** daily/weekly conversion rate over time
- **A/B comparison view (when split testing is on):** both cards side-by-side, same funnel metrics for direct comparison

**Data, retention, and privacy:**

- All events tied to anonymous visitor ID (no PII)
- Sticky visitor ID for A/B variant assignment (first-party cookie or localStorage)
- GDPR-compliant by default: no fingerprinting, no third-party cookies
- Retention: 12 months on paid plans, 90 days on free

### 5.5 Lightweight A/B toggle

This is intentionally simple. It's not a testing engine. It's a coin flip with analytics.

- Pair any two cards as A/B variants for a single embed URL
- 50/50 split, sticky per visitor (same visitor sees the same variant on return)
- Analytics view shows both cards' funnel metrics side-by-side
- **No automated winner detection.** Founder looks at the numbers and decides.
- **No statistical significance handling.** Known limitation in V1. Surface raw numbers and a sample-size warning when below threshold ("This is based on 47 visitors — wait for more data before deciding").
- **Pricing-safe by default:** if A and B have different prices, both visitors who convert are charged the price they saw. No "winning price applied retroactively" mechanic in V1.

---

## 6. Technical architecture

### 6.1 Stack recommendation

- **Frontend (dashboard):** Next.js + TypeScript + Tailwind + shadcn/ui
- **Embed runtime:** Vanilla TypeScript compiled to a single bundle, wrapped in a custom element with Shadow DOM. No React in the embed.
- **Backend:** Next.js API routes for V1 (simple, deployable, fast). Move to dedicated service if/when event volume warrants.
- **Database:** Postgres for relational data (accounts, cards, variants, embeds, configs). Consider Neon or Supabase for managed Postgres.
- **Event ingestion:** Start with direct Postgres writes via a lightweight API endpoint. Migrate to a queue (Inngest, Trigger.dev, or similar) when impression volume exceeds ~1M/day.
- **Analytics queries:** Postgres materialized views for V1. Move to ClickHouse or Tinybird when query latency becomes a problem (likely month 12+).
- **Auth:** Clerk or Supabase Auth. Don't roll your own.
- **Hosting:** Vercel for the dashboard + API. Cloudflare or similar CDN for the embed bundle.

### 6.2 Data model (core entities)

```
accounts
  - id, email, stripe_account_id (OAuth), plan_tier, created_at

stripe_products
  - id, account_id, stripe_product_id, name, last_synced_at
  - (cached from Stripe, kept in sync via webhook)

stripe_prices
  - id, account_id, stripe_price_id, product_id, unit_amount, currency,
    recurring_interval, trial_period_days, last_synced_at

cards
  - id, account_id, name, layout, theme_config (JSON), created_at, updated_at
  - (theme_config holds colors, fonts, radii, etc.)

card_tiers
  - id, card_id, position, name, stripe_price_id, features (JSON array),
    badge, cta_text, cta_url, strikethrough_price

card_variants
  - id, card_id, ab_partner_id (nullable, references another card), traffic_split
  - (when ab_partner_id is set on both cards, they form an A/B pair)

embeds
  - id, account_id, card_id, embed_token (public, used in script tag),
    referrer_domain, created_at, last_seen_at

events
  - id, embed_id, card_id, variant_id, visitor_id, event_type,
    tier_id (nullable), occurred_at, metadata (JSON)
  - (event_type: impression | tier_hover | tier_click | checkout_complete)

stripe_checkout_matches
  - id, account_id, stripe_checkout_session_id, embed_id, card_id,
    variant_id, visitor_id, matched_at
  - (matches checkout_complete events back to the originating card)
```

### 6.3 Embed-to-checkout attribution

Critical for the funnel viz. Flow:

1. Visitor clicks a tier CTA on an embed
2. Embed appends `?_card=<embed_token>&_v=<visitor_id>` to the CTA URL (or sets via Stripe Checkout `client_reference_id`)
3. Stripe Checkout session created with `client_reference_id` containing card + visitor info
4. Stripe webhook fires on `checkout.session.completed`
5. We parse `client_reference_id`, write `stripe_checkout_matches` row, fire `checkout_complete` event

For cases where the founder uses Stripe Checkout directly via a custom checkout URL: provide a JS helper that wraps the Stripe.js call and injects `client_reference_id`.

### 6.4 Embed bundle

- Single JS file served from CDN, cached aggressively
- Versioned URL (e.g., `/embed/v1/loader.js`) so we can roll forward without breaking existing embeds
- Custom element registration: `<pricing-card data-token="..."></pricing-card>`
- Shadow DOM for style isolation
- Fetches card config from API on mount, renders, hydrates analytics
- Lazy-load any non-critical features (A/B sticky assignment can use localStorage synchronously)
- All API calls go through a single endpoint that returns config + assigns variant in one round trip

### 6.5 Performance budgets (hard gates)

- Embed bundle size: <20kb gzipped
- Time to first meaningful paint: <100ms after script loads
- Time to interactive: <300ms
- Cumulative Layout Shift: 0
- No render-blocking on customer site
- Lighthouse score on customer site must not drop more than 2 points from baseline

### 6.6 Key technical decisions to lock early

- **Variant assignment: server-side.** Avoid the flicker that client-side A/B tools have. The single config-fetch endpoint returns the assigned variant's full config.
- **Visitor ID: first-party cookie with localStorage fallback.** No fingerprinting, no third-party identifiers.
- **Stripe sync: webhook-driven + periodic reconciliation.** Webhooks are primary; a daily reconciliation job catches missed events.
- **Multi-tenant data isolation: row-level security in Postgres.** Every query scoped by `account_id`. Use Postgres RLS or enforce in the data access layer.
- **Embed config caching: edge cache with revalidation on dashboard save.** Edits should propagate within <30 seconds globally.

---

## 7. Pricing

| Plan    | Price    | Included                                                                                                                                                |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Free    | $0       | 1 card, basic analytics (30-day retention), branded watermark, 10K impressions/mo                                                                       |
| Starter | $19/mo   | 3 cards, no watermark, full analytics (12-month retention), 100K impressions/mo, lightweight A/B (2 variants per card)                                  |
| Growth  | $49/mo   | Unlimited cards, unlimited impressions, custom domain on hosted pages, priority Stripe sync, A/B on every card, CSV export of analytics                 |

### 7.1 LTD launch

AppSumo LTD at $69 one-time (Starter equivalent) and $149 one-time (Growth equivalent, stackable codes). Target: 1,000+ codes, 4.7+ star rating.

### 7.2 What we don't charge

- **Zero transaction fees ever.** Marketing weapon against PriceWell and Priceable.
- No per-user fees within a workspace
- No charge for additional embed locations once on a paid plan

---

## 8. Success metrics

### 8.1 North star

**Active embeds:** cards that have served 100+ impressions in the last 30 days. Not signups, not trials. Real traffic on real customer sites.

### 8.2 Phase milestones

| Milestone           | Active embeds | MRR  | What's true                                                  |
| ------------------- | ------------- | ---- | ------------------------------------------------------------ |
| Month 3 (V1 launch) | 200           | $2K  | V1 live, first 100 paying customers, content engine started  |
| Month 4 (AppSumo)   | 800           | $5K  | LTD launch complete, $50K+ in one-time revenue               |
| Month 9             | 2,500         | $18K | Content/SEO compounding, LTD users converting to recurring   |
| Month 12            | 4,500         | $30K | V2 scoping begins (experimentation depth, multi-processor)   |

### 8.3 Leading indicators

- Signup → Stripe connect: 60%+
- Stripe connect → first embed live: 50%+
- **First embed live → second embed within 30 days: 40%+** (the moat-forming metric — track from customer #1)
- Free → paid conversion: 8%+
- Paid retention at 90 days: 85%+

---

## 9. Build sequence (Months 1–3)

### Month 1: Foundation

- Auth, account model, billing infrastructure (Clerk + Stripe billing for our own subscriptions)
- Stripe OAuth Connect for customer accounts
- Stripe product/price sync (webhook listener + initial sync on connect)
- Card data model (cards, tiers, variants, embeds, events)
- Basic card builder UI (functional, not pretty yet)
- Basic embed script that fetches config and renders a card
- Postgres schema with row-level security

### Month 2: Polish and analytics

- Visual card builder polish: brand color extraction, layout options, badges, feature lists, drag-and-drop
- Event ingestion endpoint (impression/hover/click)
- Stripe webhook listener for checkout completion attribution
- Analytics dashboard: summary, funnel viz, per-tier breakdown, time-series
- Embed performance optimization (Shadow DOM, gzip <20kb, lazy loading)
- Hosted standalone page on subdomain
- Integration guides for Webflow, Framer, WordPress, Next.js, Carrd

### Month 3: A/B + launch prep

- Lightweight A/B toggle: pair variants, sticky assignment via cookie, side-by-side analytics
- Sample-size warnings in A/B view
- Marketing site (built with our own product on the pricing page — eat our own dog food)
- 10 SEO articles published (see section 11)
- Onboarding email sequence
- Soft launch to early-access waitlist, gather first 100 customers
- AppSumo LTD submission for month 4 launch

---

## 10. Competitive positioning

| Competitor             | What they do                                                                | Where we win in V1                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stripe Pricing Table   | Free embeddable pricing table tied to Stripe products                       | Better visual design, brand auto-detection, per-card analytics, marketing-context fields (tier names, badges, feature lists separate from Stripe product names), lightweight A/B. Stripe has none. |
| PriceWell              | Embeddable Stripe pricing tables with basic A/B testing; ~1% transaction fee | Flat-fee pricing (no transaction cut), better analytics granularity (tier-level hovers + funnel viz), faster setup                                                                                  |
| Priceable              | Zero-code Stripe pricing tables, real-time A/B price testing, 1% fee        | Same as PriceWell — flat fee, better analytics, better visual builder                                                                                                                               |
| Hand-built React/Webflow | Custom-coded components wired to Stripe Checkout                          | Non-technical founders can't do this at all. Technical founders save time and get free analytics.                                                                                                   |

**One-sentence positioning:** the only pricing card tool that combines visual quality, central source-of-truth editing, and per-card analytics — with flat-fee pricing and no transaction tax on customer revenue.

---

## 11. Go-to-market (for context, not for engineering)

Primary channel: content + SEO from day one. Content clusters:

- "[SaaS Brand] pricing page teardown" posts — long tail, branded queries
- "How to price a SaaS [category]"
- "Stripe Pricing Table alternatives"
- "[Competitor A] vs [Competitor B] pricing"

Secondary: AppSumo LTD launch in month 4. Reddit + IndieHackers presence. Twitter build-in-public.

We ship our own pricing card on our pricing page. Every experiment we run becomes a case study. Every conversion lift becomes content.

---

## 12. Risks

| Risk                                                              | Likelihood | Mitigation                                                                                                                                                                                                                |
| ----------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Founders only embed one card; moat doesn't form                   | Medium     | Onboarding emphasizes multi-embed scenarios. In-app prompts suggest second-embed use cases. Track second-embed rate as primary leading indicator.                                                                          |
| Stripe ships a better Pricing Table                               | Low–Med    | V2 multi-processor makes us neutral above payments. Analytics + marketing-context fields are the moat Stripe won't bother with.                                                                                            |
| PriceWell or Priceable drops transaction fees in response          | Medium     | They've built revenue model around transaction fees; abandoning is painful. By the time they do, we have analytics + brand. Out-execute on UX.                                                                             |
| Embed performance issues damage trust                             | Low        | Strict performance budget. Lighthouse score gating on every release. Real-user performance monitoring on customer embeds.                                                                                                  |
| A/B without significance handling produces bad decisions          | Medium     | Surface sample size prominently. Soft warning below threshold. Educational content on when to call a test.                                                                                                                |
| Non-technical founders can't get embed code into their site       | Medium     | Platform-specific guides (Webflow, Framer especially). Live chat during onboarding for paid users. Hosted page fallback for founders without an editable site builder.                                                     |

---

## 13. Open questions to resolve during build

1. Should the lightweight A/B toggle ship in V1 or fast-follow in month 4? Argument for V1: competitive positioning vs PriceWell. Argument for fast-follow: it's the most complex piece and slipping it lets us launch sooner.
2. Should free tier include analytics, or be purely a "try the embed" tier? Analytics gating is the most natural paywall but might gate the magic moment.
3. Hosted page domain: subdomain (`cards.ourapp.com/customername`) or custom domain on paid only?
4. Webflow plugin vs generic embed first? Webflow gives distribution but locks in single-platform investment for V1.
5. Do we need a "connect non-Stripe checkout" escape hatch? Some founders use Gumroad, Lemon Squeezy, or custom checkout. V1 forces them to wait for V2 multi-processor.

---

## 14. Instructions for Claude Code

When implementing this PRD:

- Start with the data model (section 6.2) and Stripe OAuth (section 5.1). Get a card config persisting and a Stripe product syncing before touching UI.
- Build the embed runtime in isolation. Treat it as a separate package/workspace. It should have its own bundle, its own tests, and no shared code with the dashboard beyond TypeScript types for the card config.
- Performance budgets (section 6.5) are non-negotiable. Add bundle-size and Lighthouse checks to CI from day one.
- Use Stripe test mode for all development. Never hit live Stripe accounts during development.
- Analytics ingestion must handle 100x current expected load before launch. Premature optimization on the dashboard is bad; premature scale-readiness on event ingestion is good.
- Row-level security on every Postgres table. Every query must include `account_id` scoping.
- Webhook handlers must be idempotent. Stripe will retry; we will sometimes process the same event twice.
- Default to shipping the simplest thing that works. The 9 items in section 2.2 are explicitly out of scope. Do not build them, do not stub them, do not add hooks for them. V2 is V2's problem.
# Clearwork — Product Requirements Document

**Version:** 0.1 (MVP scope)
**Status:** Draft for founding team review
**Author:** Founding team
**Last updated:** May 2026

---

## 1. Summary

Clearwork is a client management platform for solo creative freelancers — wedding photographers, designers, planners, copywriters, coaches — who want HoneyBook's workflow without HoneyBook's financial risk.

The core differentiator is that **Clearwork never holds client money**. Payments flow directly from the client's card to the freelancer's own Stripe account. This eliminates the chargeback claw-back and merchant-of-record disputes that drive the loudest negative reviews of incumbent tools.

The MVP targets one user persona, one workflow, and one wedge. Everything else is post-MVP.

---

## 2. Goals and non-goals

### Goals (what we ship)

- Let a solo creative run an entire client engagement end-to-end without leaving the product: inquiry → proposal → contract → payment → delivery → final invoice.
- Maintain the "we never touch your money" wedge through Stripe Connect Express, with the freelancer as the account holder of record.
- Get a new user to "first invoice sent" in under 30 minutes, including Stripe onboarding.
- Achieve a flat, transparent price below HoneyBook's $36/mo Starter tier.

### Non-goals (what we explicitly do not ship in v1)

- Team / multi-user features
- General-purpose CRM (contact database beyond projects)
- Email marketing or broadcast tools
- Project management (tasks, Gantt, time tracking)
- Bookkeeping or sales tax compliance
- AI features of any kind
- Mobile native apps (mobile-responsive web only)
- White-label client portals (paid upgrade later)
- Multi-currency (USD only at launch)

---

## 3. Target user

### Primary persona

**Sasha, the solo creative freelancer.** Income $40K–$150K/year. Runs everything herself. Books 10–60 client engagements per year. Already uses HoneyBook, Dubsado, or a duct-taped combination of Google Docs + Stripe + Calendly + Gmail.

Specific sub-segments at launch:

- Wedding and portrait photographers
- Independent brand and web designers
- Wedding planners and event coordinators
- Coaches and consultants who run multi-session engagements
- Copywriters and content strategists

### What this user values

1. Looking professional to their clients without spending hours configuring tools.
2. Getting paid promptly and predictably.
3. Not being surprised by their software (clawbacks, hidden fees, sudden price hikes, support that doesn't reply).
4. Aesthetic quality of anything their client sees.

### What this user does not value (and we should not optimize for)

- Deep customization or workflow flexibility (that's Dubsado's lane)
- Reporting and analytics
- Integrations with tools they don't already use
- Mobile-first usage patterns

---

## 4. The wedge, in product terms

Every Clearwork screen should make the trust position visible without harping on it. Three concrete commitments:

1. **Payments flow through Stripe Connect Express**, with the freelancer as the connected account holder. Clearwork is never the merchant of record.
2. **Funds settle directly to the freelancer's bank account** via their own Stripe balance, on Stripe's payout schedule. Clearwork has no payout authority.
3. **Clearwork cannot reverse, hold, or freeze payments.** Disputes are handled directly between the freelancer and Stripe, exactly as if the freelancer had a standalone Stripe account.

This must be reflected in product copy at three specific touchpoints: Stripe onboarding, the invoice paid screen, and the marketing site. Everywhere else it stays implicit.

---

## 5. Functional requirements

Each requirement is tagged **P0** (must ship for MVP), **P1** (ship in v1.1, plan data model for now), or **P2** (defer past v1).

### 5.1 Authentication and accounts

| ID | Requirement | Priority |
|---|---|---|
| AUTH-1 | Sign up with email + password | P0 |
| AUTH-2 | Sign up with Google OAuth | P0 |
| AUTH-3 | Forgot password flow with email reset | P0 |
| AUTH-4 | One user per account (no teams in MVP) | P0 |
| AUTH-5 | Account deletion with data export | P1 |
| AUTH-6 | Two-factor authentication | P2 |

### 5.2 Onboarding

| ID | Requirement | Priority |
|---|---|---|
| ONB-1 | First-run flow with 4 steps: business profile, template selection, Stripe (optional/deferred), calendar (optional) | P0 |
| ONB-2 | User can skip Stripe at onboarding and connect later from any payment-related action | P0 |
| ONB-3 | Pre-flight screen before Stripe handoff explaining what they'll need (SSN/EIN, bank info, ID) | P0 |
| ONB-4 | Resumable Stripe onboarding via fresh account links if user abandons mid-flow | P0 |
| ONB-5 | Template selection by vertical (wedding photography, brand design, coaching, copywriting, event planning) — each ships 3–4 starter smart files | P0 |
| ONB-6 | Skip-all option for users who want to start from scratch | P1 |

### 5.3 Client pipeline (the dashboard)

| ID | Requirement | Priority |
|---|---|---|
| PIPE-1 | Default view: 4-column kanban — Inquiry, Proposal sent, Booked, Wrapping | P0 |
| PIPE-2 | List view as an alternative layout | P1 |
| PIPE-3 | Each card shows project name, client name, amount, status pills (paid / awaiting / signed) | P0 |
| PIPE-4 | Drag-and-drop between columns to update status | P0 |
| PIPE-5 | Automatic status progression based on document state (proposal sent → moves to Proposal sent column) | P0 |
| PIPE-6 | Filter by status, date range, or search by client name | P1 |
| PIPE-7 | Inline "new project" creation directly from the pipeline | P0 |
| PIPE-8 | Archive completed projects (not delete — retain for tax/audit) | P0 |

### 5.4 Project (the unit of work)

| ID | Requirement | Priority |
|---|---|---|
| PROJ-1 | Each project belongs to one client and contains: smart files, messages, calendar events, files, activity timeline | P0 |
| PROJ-2 | Project header shows status, total value, payments received, next action | P0 |
| PROJ-3 | Activity timeline auto-logs every state change (sent, viewed, signed, paid) with timestamp | P0 |
| PROJ-4 | Manual note-adding to timeline | P1 |
| PROJ-5 | Multiple smart files per project (e.g., proposal + change order) | P1 |
| PROJ-6 | Project tags for categorization | P2 |

### 5.5 Client management

| ID | Requirement | Priority |
|---|---|---|
| CLI-1 | Client = name, email, phone, address, notes | P0 |
| CLI-2 | One client can have multiple projects | P0 |
| CLI-3 | Client receives all communication via email — no client account or login | P0 |
| CLI-4 | Magic-link authentication for client portal (token in URL, no password) | P0 |
| CLI-5 | Client list view (separate from projects) | P1 |
| CLI-6 | Duplicate detection on client email | P0 |

### 5.6 Smart files (the differentiated feature)

| ID | Requirement | Priority |
|---|---|---|
| SF-1 | Block-based document editor with the following block types: cover image, heading, text, package selection, pricing table, contract terms, signature, payment, file upload, questionnaire | P0 |
| SF-2 | All blocks are drag-to-reorder | P0 |
| SF-3 | Templates can be saved and reused across projects | P0 |
| SF-4 | Merge fields for client name, project date, fee, business name | P0 |
| SF-5 | Send via email with magic link to client portal view | P0 |
| SF-6 | Track viewed / opened / signed / paid states per block | P0 |
| SF-7 | Client-facing view is mobile-responsive and matches freelancer's brand colors (basic theme: 1 color + logo) | P0 |
| SF-8 | Smart file PDF export for archival | P1 |
| SF-9 | Versioning: when a sent smart file is edited, client sees the latest version with a note | P1 |
| SF-10 | Conditional logic (show this block if client selected option X) | P2 |

### 5.7 Proposals and packages

| ID | Requirement | Priority |
|---|---|---|
| PROP-1 | Package selection block: client picks from 1–N predefined packages, selection updates downstream pricing | P0 |
| PROP-2 | Add-on items the client can toggle | P1 |
| PROP-3 | Quantity adjustment on line items | P1 |
| PROP-4 | Expiration date on proposals | P1 |
| PROP-5 | Pricing in USD only at launch | P0 |

### 5.8 Contracts and e-signature

| ID | Requirement | Priority |
|---|---|---|
| SIGN-1 | Legally binding e-signature compliant with ESIGN Act and UETA (US) | P0 |
| SIGN-2 | Audit trail: signer IP, timestamp, user agent, document hash | P0 |
| SIGN-3 | Both freelancer and client signatures supported on same document | P0 |
| SIGN-4 | Signed document immutability — locked once both parties sign | P0 |
| SIGN-5 | Use Dropbox Sign or HelloSign API for v1 (avoid building e-sign primitives), with own infrastructure as P2 | P0 |
| SIGN-6 | Email notifications on signature completion to both parties | P0 |
| SIGN-7 | Signed PDF copy attached to email | P0 |

### 5.9 Payments

| ID | Requirement | Priority |
|---|---|---|
| PAY-1 | Stripe Connect Express integration — freelancer is the account holder | P0 |
| PAY-2 | Onboarding handoff to Stripe via OAuth-like flow with pre-filled email | P0 |
| PAY-3 | Client pays via Stripe Checkout (hosted page) — funds settle to freelancer's Stripe balance | P0 |
| PAY-4 | Card payments only at launch (Visa, Mastercard, Amex, Discover) | P0 |
| PAY-5 | ACH support | P1 |
| PAY-6 | Payment plans: 50/50, 30/30/40, custom schedules | P0 |
| PAY-7 | Recurring monthly retainer invoicing | P1 |
| PAY-8 | Save card on file for split payments | P1 |
| PAY-9 | Refund initiation by freelancer through Clearwork UI (executes via Stripe API) | P0 |
| PAY-10 | Application fee: 0% — Clearwork takes no transaction cut | P0 |
| PAY-11 | "Mark as paid manually" option for users who collect via check, Zelle, etc. | P0 |
| PAY-12 | Non-payment tier: full product usage without Stripe connection, including PDF invoices with freelancer's bank details | P0 |

### 5.10 Invoicing

| ID | Requirement | Priority |
|---|---|---|
| INV-1 | Generate invoice with line items, tax line, payment terms, due date | P0 |
| INV-2 | Invoice number auto-generated, customizable prefix | P0 |
| INV-3 | Email invoice with payment link | P0 |
| INV-4 | Invoice statuses: draft, sent, viewed, paid, overdue | P0 |
| INV-5 | Overdue reminders auto-sent at 1, 7, 14 days past due (toggleable) | P0 |
| INV-6 | Tax line as percentage rate (no tax compliance product — just math) | P0 |
| INV-7 | PDF invoice with freelancer branding | P0 |
| INV-8 | CSV export of all invoices for accountant handoff | P0 |
| INV-9 | QuickBooks Online sync | P2 |

### 5.11 Lead capture

| ID | Requirement | Priority |
|---|---|---|
| LEAD-1 | Embeddable HTML form with custom fields | P0 |
| LEAD-2 | New form submission creates a project in Inquiry status | P0 |
| LEAD-3 | Email notification to freelancer on new inquiry | P0 |
| LEAD-4 | Anti-spam: hCaptcha or similar | P0 |
| LEAD-5 | Plugins for Squarespace, Wix, WordPress | P1 |
| LEAD-6 | Auto-responder email to lead | P0 |

### 5.12 Calendar and scheduling

| ID | Requirement | Priority |
|---|---|---|
| CAL-1 | Google Calendar two-way sync (read availability, write events) | P0 |
| CAL-2 | Booking page with availability windows | P0 |
| CAL-3 | Multiple event types (consultation, kickoff call, shoot, delivery) | P0 |
| CAL-4 | Buffer time and minimum notice settings | P0 |
| CAL-5 | Auto-create video link (Google Meet) on book | P0 |
| CAL-6 | Outlook / Apple Calendar sync | P1 |
| CAL-7 | Reschedule by client without freelancer intervention | P0 |
| CAL-8 | Embed bookable calendar inside smart file | P1 |

### 5.13 Messaging

| ID | Requirement | Priority |
|---|---|---|
| MSG-1 | Per-project message thread between freelancer and client | P0 |
| MSG-2 | Freelancer composes from Clearwork — client receives email | P0 |
| MSG-3 | Client replies via email — reply lands in Clearwork thread | P0 |
| MSG-4 | File attachments up to 25MB | P0 |
| MSG-5 | Read receipts | P1 |
| MSG-6 | Internal notes (not visible to client) | P0 |

### 5.14 Client portal

| ID | Requirement | Priority |
|---|---|---|
| PORT-1 | Single URL per project, magic-link access from email | P0 |
| PORT-2 | Client sees: active smart files, payment history, message thread, scheduled events | P0 |
| PORT-3 | Branded with freelancer's logo and 1 accent color | P0 |
| PORT-4 | Mobile-responsive | P0 |
| PORT-5 | Custom subdomain (yourbusiness.clearwork.com) | P1 |
| PORT-6 | Custom domain (clients.yourbusiness.com) | P2 |

### 5.15 Workflows and automations

| ID | Requirement | Priority |
|---|---|---|
| AUTO-1 | Library of 6–8 pre-built automations, toggleable per project | P0 |
| AUTO-2 | Core automations: "On proposal accepted → send contract"; "On contract signed → send deposit invoice"; "On deposit paid → send onboarding email"; "On final delivery → send final invoice"; "7 days post-final-payment → send review request" | P0 |
| AUTO-3 | Custom email templates inside each automation | P0 |
| AUTO-4 | Visual automation builder | P2 |

### 5.16 Templates

| ID | Requirement | Priority |
|---|---|---|
| TPL-1 | User-saved smart file templates | P0 |
| TPL-2 | User-saved email templates for messaging | P0 |
| TPL-3 | Starter library by vertical (5 verticals at launch, 3–4 templates each) | P0 |
| TPL-4 | Community template gallery | P2 |

---

## 6. Non-functional requirements

### 6.1 Performance

- Pipeline screen loads in <1.5 seconds for accounts with up to 200 active projects.
- Smart file editor changes save within 500ms (auto-save, no save button).
- Stripe Checkout redirect completes within 2 seconds.
- Email delivery to client: under 30 seconds from send action.

### 6.2 Reliability

- 99.5% uptime target for v1. Stripe outages do not block document workflows.
- All client-facing magic links remain valid for 90 days from issue.
- Daily database backups, 30-day retention.

### 6.3 Security

- All data encrypted at rest (AES-256) and in transit (TLS 1.3).
- No payment card data ever touches Clearwork servers (Stripe handles).
- Magic-link tokens single-use for sensitive actions (signing, paying); reusable for viewing.
- Audit log of all freelancer actions for 1 year.

### 6.4 Compliance

- ESIGN Act and UETA compliance for e-signatures (achieved via Dropbox Sign API at v1).
- SOC 2 Type 1 certification target within 12 months of launch.
- GDPR data export and deletion endpoints (even though target market is US — table stakes).
- 1099-K handling: not applicable to Clearwork, as funds never settle in Clearwork accounts. Each freelancer's Stripe account handles its own 1099-K independently.

### 6.5 Accessibility

- WCAG 2.1 AA conformance for client-facing pages (portal, payment pages, signed docs).
- Keyboard navigation throughout freelancer app.

---

## 7. Pricing

### 7.1 MVP pricing

**Single plan at $19/mo or $190/year** (~17% annual discount).

Includes everything: unlimited projects, unlimited clients, unlimited smart files, Stripe Connect, no transaction fees, all integrations.

### 7.2 Why one plan

Hill playbook: avoid the multi-tier complexity that makes incumbents feel grabby. Aggressive simplicity is part of the brand promise. We can introduce a higher tier later (custom domains, removing Clearwork branding from client portal) once the product earns it.

### 7.3 LTD structure (launch lever)

Run a 6-week private LTD before public launch:

- **$249 lifetime deal** via AppSumo and direct.
- Excludes: custom domains, future white-label features.
- Caps: 100 projects/year per LTD account (heavy users upgrade).
- Hard exclusions: any future high-COGS features (AI, SMS reminders) gated to paid tiers.

Target: 500 LTDs at $249 = $125K. Funds engineering for v1.1.

---

## 8. Success metrics

### 8.1 North-star metric

**Weekly active accounts that sent at least one invoice in the past 30 days.**

This filters out signups who never engaged and trial-extenders who never adopted.

### 8.2 Leading indicators

| Metric | Target at 6 months |
|---|---|
| Signup → first proposal sent | >40% within 24 hours |
| First proposal → first invoice sent | >60% within 14 days |
| First invoice → first payment received | >70% within 30 days |
| Stripe onboarding completion (of users who start) | >75% |
| Free trial → paid conversion | >25% |
| Monthly churn (paid accounts) | <4% |

### 8.3 Qualitative success

NPS above 60 within 6 months. Hill's stated benchmark for a "promising signal" product is NPS ~85; that's aspirational v2.

---

## 9. Launch plan

### 9.1 Phase 0 — Customer validation (weeks 1–4)

- 20 interviews with current HoneyBook and Dubsado users.
- Specific question: "What's the worst thing your client management software has done to you?"
- Validate the wedge: "If a tool let your client pay directly into your own Stripe instead of holding the money, would you switch?"
- Identify the strongest sub-vertical (probably wedding photographers or brand designers).

### 9.2 Phase 1 — Private LTD launch (weeks 5–20)

- Build through P0 features in the priority order from §10.
- Soft launch to a closed list of 200 early adopters recruited from interviews.
- LTD at $249 to fund development. Target: 500 sales over 6 weeks.
- Iterate based on feedback before public launch.

### 9.3 Phase 2 — Public launch (week 21+)

- AppSumo listing for broader LTD distribution.
- Subscription pricing live for non-LTD users.
- Content engine kicks in: "Switching from HoneyBook" guides, "How to set up Stripe Connect" walkthroughs, vertical-specific resources (wedding photographer pricing templates, etc.).
- Reddit, Facebook groups for creative freelancers, photographer forums, designer Slacks.

### 9.4 Phase 3 — V1.1 (months 6–12)

- P1 features prioritized by usage data and customer requests.
- Likely top of list: recurring billing, second vertical templates, mobile polish, QuickBooks CSV export refinement.

---

## 10. Build sequence

The four-person team (per Hill's standard formation: 2 founders + 2 hires, design + engineering heavy) builds in this order.

### Weeks 1–4: Wedge proof

- Auth (AUTH-1, AUTH-2, AUTH-3)
- Stripe Connect Express integration (PAY-1, PAY-2, PAY-3, PAY-10)
- Bare-bones invoice generation and send (INV-1, INV-3, INV-4)
- Magic-link client view of one invoice
- Project model and basic pipeline (PROJ-1, PIPE-1, PIPE-7)

**Milestone:** A freelancer can sign up, connect Stripe, send an invoice, and a real client can pay it. Money lands in the freelancer's Stripe. This validates the wedge end-to-end before anything else exists.

### Weeks 5–8: The booking flow

- Proposals and package selection (PROP-1, SF-1 partial)
- Contract and e-signature via Dropbox Sign API (SIGN-1 through SIGN-7)
- Calendar booking with Google Calendar sync (CAL-1, CAL-2, CAL-3, CAL-5)
- Client portal first version (PORT-1, PORT-2, PORT-3)

**Milestone:** A freelancer can win a project — send proposal, get it accepted, get contract signed, book a kickoff call, collect deposit.

### Weeks 9–12: The unified workflow

- Smart file block editor (SF-1 through SF-7)
- Templates per vertical (TPL-3 for first 2 verticals: photography and brand design)
- Messaging (MSG-1 through MSG-4)
- Lead capture form (LEAD-1, LEAD-2, LEAD-3)
- Workflow automations library (AUTO-1, AUTO-2)

**Milestone:** Full inquiry-to-paid loop works in one tool. Private beta opens.

### Weeks 13–20: Polish and LTD launch

- Onboarding flow (ONB-1 through ONB-5)
- Pipeline polish (PIPE-3, PIPE-5, PIPE-8)
- Payment plans (PAY-6, PAY-11)
- Email deliverability hardening
- Mobile responsive QA across all client-facing pages
- LTD purchase flow and AppSumo integration
- Marketing site

**Milestone:** Public LTD launch.

---

## 11. Risks and open questions

### 11.1 Risks

| Risk | Mitigation |
|---|---|
| Stripe Connect onboarding drop-off kills activation | Defer Stripe to in-flow workflow step, not signup. Offer no-payment tier. |
| HoneyBook responds with their own "we don't hold money" feature | They can't — it would cannibalize their float and merchant-of-record revenue. Their architecture is built around being MOR. |
| E-signature legal compliance bugs create real liability | Use Dropbox Sign API at v1 — let them own that compliance surface. Build proprietary later. |
| Wedding photographers and other verticals have niche workflows we don't support | Pick 1 vertical for deep validation. Use the first 100 customers' feedback to shape v1.1. |
| Email deliverability problems erode client trust | Use a transactional provider (Postmark/SendGrid) with dedicated IPs. Configure DKIM/SPF/DMARC per sender domain. |
| LTD support burden becomes unsustainable | Cap projects/year on LTD. Explicit policy that LTD does not include 1-on-1 support, only community + docs. |

### 11.2 Open questions

1. **Which vertical to anchor the launch?** Wedding photography is the obvious choice (largest segment, loudest HoneyBook hatred) but brand designers may convert faster. Decision should follow Phase 0 interviews.
2. **Should the non-payment tier be free, or same price?** Argument for free: lowers acquisition friction. Argument for same price: avoids cannibalizing paid signups. Lean toward same price — value isn't in the Stripe integration alone.
3. **How aggressive on AI marketing?** "No AI" as a brand positioning could resonate strongly in 2026 (per the AI-refugee thesis), but might age poorly. Test in messaging without committing to product positioning.
4. **What's the exit story for stuck LTD users?** If someone exceeds the 100-projects/year cap, what's the upgrade path? Decide before LTD launch.

---

## 12. Appendix

### 12.1 Out of scope for this PRD

- Mobile native apps (planned for year 2)
- International expansion (USD only at launch)
- Marketplace / vendor referral features (long-term thought, not v1)
- Public API (long-term)

### 12.2 Glossary

- **Smart file:** A single scrollable document combining proposal, package selection, contract, signature, and payment. Modeled after HoneyBook's pattern; the differentiated feature.
- **Wedge:** The "we never touch your money" positioning, enabled by Stripe Connect Express.
- **Magic link:** Token-in-URL authentication for client portal access. No client account or password required.
- **LTD:** Lifetime deal. One-time payment for ongoing access, used to fund early development and recruit early adopters (per Hill playbook).
"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./section-header";

type Plan = {
  name: string;
  italic: string;
  price: string;
  cadence: string;
  cadenceSub?: string;
  blurb: string;
  color: string;
  features: string[];
  fineprint?: string;
  cta: string;
  ribbon?: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Clearwork",
    italic: "the plan",
    price: "$19",
    cadence: "/ month",
    cadenceSub: "or $190 / year",
    blurb:
      "Everything you need to run client work end-to-end. One plan, no surprises.",
    color: "#0f4d92",
    featured: true,
    cta: "Start free trial",
    features: [
      "Unlimited projects & clients",
      "Unlimited smart files, contracts, invoices",
      "Stripe Connect Express — 0% transaction fee",
      "Google Calendar + magic-link client portal",
      "Email templates and 5 vertical starter kits",
      "Manual & mark-as-paid invoices (Stripe optional)",
    ],
    fineprint: "14-day trial. Cancel any time. Stripe's own processing fees apply.",
  },
  {
    name: "Founding seat",
    italic: "lifetime",
    price: "$249",
    cadence: "one time",
    cadenceSub: "Only 500 seats at launch",
    blurb:
      "Lock in early. One payment, ongoing access while the product evolves.",
    color: "#8c1515",
    ribbon: "Early access",
    cta: "Claim a seat",
    features: [
      "Everything in the monthly plan",
      "Locked-in core feature set, forever",
      "Up to 100 active projects per year",
      "Direct line to the founders' inbox",
      "Excludes future white-label & high-COGS features",
    ],
    fineprint:
      "Funds the first year of engineering. Capped on volume; heavy users upgrade.",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          kicker="No. 03 — Pricing"
          title={
            <>
              One plan. One promise.{" "}
              <span
                className="italic font-normal"
                style={{ color: "#0f4d92" }}
              >
                Zero
              </span>{" "}
              transaction fees.
            </>
          }
          sub="Below HoneyBook's Starter tier. Above HoneyBook's pain threshold. The lifetime option funds development and gets you in before the price moves."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative flex flex-col rounded-3xl border border-black bg-white p-8 ${
                plan.featured
                  ? "shadow-[0_8px_0_0_rgba(0,0,0,1)] md:-translate-y-2"
                  : "shadow-[0_4px_0_0_rgba(0,0,0,1)]"
              }`}
            >
              {plan.ribbon && (
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-black bg-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-950 shadow-[0_2px_0_0_rgba(0,0,0,1)]"
                >
                  {plan.ribbon}
                </span>
              )}

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl text-neutral-950">
                  {plan.name}
                </span>
                <span
                  className="font-serif italic text-2xl"
                  style={{ color: plan.color }}
                >
                  / {plan.italic}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {plan.blurb}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-serif text-6xl leading-none text-neutral-950">
                  {plan.price}
                </span>
                <div className="flex flex-col pb-1 leading-tight">
                  <span className="text-sm text-neutral-600">
                    {plan.cadence}
                  </span>
                  {plan.cadenceSub && (
                    <span className="text-[11px] text-neutral-500">
                      {plan.cadenceSub}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-neutral-200" />

              <ul className="mt-6 space-y-3 text-sm text-neutral-800">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: plan.color }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/signup"
                className={`mt-8 inline-flex items-center justify-center rounded-full border border-black px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                  plan.featured
                    ? "bg-black text-white shadow-[0_4px_0_0_rgba(0,0,0,1)]"
                    : "bg-white text-neutral-950 shadow-[0_3px_0_0_rgba(0,0,0,1)]"
                }`}
              >
                {plan.cta}
              </a>

              {plan.fineprint && (
                <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">
                  {plan.fineprint}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                Not ready for Stripe?
              </p>
              <p className="mt-1 text-sm text-neutral-800">
                Use the full product without connecting Stripe. Send PDF invoices with your bank details and mark them paid manually.
              </p>
            </div>
            <a
              href="/auth/signup"
              className="self-start sm:self-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-neutral-900 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors whitespace-nowrap"
            >
              Start without Stripe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

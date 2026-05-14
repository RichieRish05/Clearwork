"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./section-header";

type Tier = {
  name: string;
  italic: string;
  price: string;
  cadence: string;
  blurb: string;
  color: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    italic: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Ship your first card today. Tiers watermark in the corner.",
    color: "#0f4d92",
    cta: "Start free",
    features: [
      "1 live pricing widget",
      "3 templates to fork",
      "Stripe Checkout sync",
      "Basic view & click tracking",
    ],
  },
  {
    name: "Pro",
    italic: "Ship",
    price: "$24",
    cadence: "/ month",
    blurb: "For the solo founder shipping in public. Unlimited everything that matters.",
    color: "#8c1515",
    featured: true,
    cta: "Start a 14-day trial",
    features: [
      "Unlimited widgets, unlimited variants",
      "A/B tests on price, copy, layout",
      "Full conversion analytics",
      "Custom domain, no watermark",
      "Webhook events to your stack",
    ],
  },
  {
    name: "Scale",
    italic: "Print",
    price: "$96",
    cadence: "/ month",
    blurb: "For the team whose pricing page is now the product.",
    color: "#e77500",
    cta: "Talk to us",
    features: [
      "Everything in Ship",
      "Bayesian winner declaration",
      "Multi-currency & geo routing",
      "Team seats with roles",
      "Priority response, white-glove migration",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="No. 01 — Pricing"
          title={
            <>
              Pricing that{" "}
              <span
                className="italic font-normal"
                style={{ color: "#8c1515" }}
              >
                practices what it preaches
              </span>
              .
            </>
          }
          sub="Three plans. Test every one of them against each other if you'd like — we won't take it personally."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative flex flex-col rounded-3xl border border-black bg-white p-8 ${
                tier.featured
                  ? "shadow-[0_8px_0_0_rgba(0,0,0,1)] md:-translate-y-3"
                  : "shadow-[0_4px_0_0_rgba(0,0,0,1)]"
              }`}
            >
              {tier.featured && (
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-black bg-white px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-950 shadow-[0_2px_0_0_rgba(0,0,0,1)]"
                >
                  Most chosen
                </span>
              )}

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl text-neutral-950">
                  {tier.name}
                </span>
                <span
                  className="font-serif italic text-2xl"
                  style={{ color: tier.color }}
                >
                  / {tier.italic}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {tier.blurb}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-serif text-6xl leading-none text-neutral-950">
                  {tier.price}
                </span>
                <span className="pb-2 text-sm text-neutral-600">
                  {tier.cadence}
                </span>
              </div>

              <div className="mt-6 h-px w-full bg-neutral-200" />

              <ul className="mt-6 space-y-3 text-sm text-neutral-800">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: tier.color }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/signup"
                className={`mt-8 inline-flex items-center justify-center rounded-full border border-black px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                  tier.featured
                    ? "bg-black text-white shadow-[0_4px_0_0_rgba(0,0,0,1)]"
                    : "bg-white text-neutral-950 shadow-[0_3px_0_0_rgba(0,0,0,1)]"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

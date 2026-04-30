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
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Early Decision",
    italic: "Foundation",
    price: "$49",
    cadence: "/ month",
    blurb: "For families just beginning the journey. Lay the groundwork early.",
    color: "#0f4d92",
    features: [
      "AI mentor matched to your child",
      "Course & extracurricular planning",
      "Quarterly progress reviews",
      "Parent dashboard",
    ],
  },
  {
    name: "Regular Decision",
    italic: "Acceptance",
    price: "$129",
    cadence: "/ month",
    blurb: "Our most-chosen plan. Everything you need from junior year onward.",
    color: "#8c1515",
    featured: true,
    features: [
      "Everything in Foundation",
      "Unlimited essay drafting & revision",
      "School list strategy & fit analysis",
      "Mock interviews with feedback",
      "Application timeline orchestration",
    ],
  },
  {
    name: "Restrictive",
    italic: "Ivy League",
    price: "$329",
    cadence: "/ month",
    blurb: "White-glove counsel for students aiming at the top eight and beyond.",
    color: "#e77500",
    features: [
      "Everything in Acceptance",
      "Dedicated human counselor sessions",
      "Portfolio & supplement architect",
      "Alumni interview prep",
      "Priority response, 24/7",
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
          kicker="No. 01 — Tuition"
          title={
            <>
              Tuition that{" "}
              <span
                className="italic font-normal"
                style={{ color: "#8c1515" }}
              >
                pays itself back
              </span>
              .
            </>
          }
          sub="Three plans. One acceptance letter. Cancel any term, no penalty, no hard feelings."
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
                <span
                  className="font-[family-name:var(--font-instrument-serif)] text-2xl text-neutral-950"
                >
                  {tier.name}
                </span>
                <span
                  className="font-[family-name:var(--font-instrument-serif)] italic text-2xl"
                  style={{ color: tier.color }}
                >
                  / {tier.italic}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {tier.blurb}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-[family-name:var(--font-instrument-serif)] text-6xl leading-none text-neutral-950">
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
                href="#"
                className={`mt-8 inline-flex items-center justify-center rounded-full border border-black px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                  tier.featured
                    ? "bg-black text-white shadow-[0_4px_0_0_rgba(0,0,0,1)]"
                    : "bg-white text-neutral-950 shadow-[0_3px_0_0_rgba(0,0,0,1)]"
                }`}
              >
                Begin {tier.italic}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


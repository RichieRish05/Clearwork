"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./section-header";

type Pillar = {
  number: string;
  title: string;
  body: string;
  proof: string;
  accent: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Your Stripe. Your money.",
    body: "Payments run through Stripe Connect Express with you as the account holder. Clearwork is never the merchant of record.",
    proof: "You own the account — we cannot.",
    accent: "#1d4f91",
  },
  {
    number: "02",
    title: "Direct deposits, always.",
    body: "Funds settle to your bank on Stripe's own payout schedule. We have no payout authority and no float on your revenue.",
    proof: "Same payouts you'd get with bare Stripe.",
    accent: "#166534",
  },
  {
    number: "03",
    title: "We can't freeze you out.",
    body: "Disputes go from you straight to Stripe. Clearwork has no ability to reverse, hold, or claw back payments — even if we wanted to.",
    proof: "If our servers vanish, your payouts don't.",
    accent: "#8c1515",
  },
];

export function Wedge() {
  return (
    <section
      id="wedge"
      className="relative w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-12 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="No. 01 — The Wedge"
          title={
            <>
              We can&rsquo;t touch your money,{" "}
              <span
                className="italic font-normal"
                style={{ color: "#166534" }}
              >
                by design
              </span>
              .
            </>
          }
          sub="Every other client-management tool sits between you and your client's card. We don't. Three commitments we built into the architecture, not the policy page."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col rounded-3xl border border-black bg-white p-7 shadow-[0_4px_0_0_rgba(0,0,0,1)]"
            >
              <div
                aria-hidden
                className="absolute left-7 top-0 h-1 w-12 rounded-b-full"
                style={{ background: p.accent }}
              />

              <span
                className="font-mono text-[11px] uppercase tracking-[0.28em]"
                style={{ color: p.accent }}
              >
                {p.number}
              </span>

              <h3 className="mt-4 font-serif text-2xl leading-tight text-neutral-950">
                {p.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {p.body}
              </p>

              <div className="mt-auto pt-6">
                <div className="h-px w-full bg-neutral-200" />
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-600">
                  {p.proof}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center text-sm text-neutral-600 max-w-2xl mx-auto"
        >
          We charge 0% on transactions. You pay Stripe&rsquo;s standard processing fee (2.9% + 30&cent;) directly. Clearwork takes nothing from your payments &mdash; ever.
        </motion.p>
      </div>
    </section>
  );
}

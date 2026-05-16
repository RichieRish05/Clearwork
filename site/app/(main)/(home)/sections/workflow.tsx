"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./section-header";

type Step = {
  number: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Inquiry",
    body: "Drop a form on your site. New leads land in your pipeline as a project, ready to nudge.",
  },
  {
    number: "02",
    title: "Proposal",
    body: "Send a smart file with packages, pricing, and your terms. Client picks what they want.",
  },
  {
    number: "03",
    title: "Contract",
    body: "E-signature blocks on the same page. Legally binding under ESIGN & UETA.",
  },
  {
    number: "04",
    title: "Payment",
    body: "Client pays via Stripe Checkout. The money skips us and lands in your account.",
  },
  {
    number: "05",
    title: "Delivery",
    body: "Share files, message in-thread, run the gig. Status updates auto-log to the timeline.",
  },
  {
    number: "06",
    title: "Final invoice",
    body: "Wrap with a tidy PDF and a paid stamp. Export CSV when tax season shows up.",
  },
];

export function Workflow() {
  return (
    <section
      id="workflow"
      className="relative w-full px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-12 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="No. 02 — The Workflow"
          title={
            <>
              Inquiry to invoice, in{" "}
              <span
                className="italic font-normal"
                style={{ color: "#0f4d92" }}
              >
                one tool
              </span>
              .
            </>
          }
          sub="No tab-juggling between docs, Calendly, Stripe, and Gmail. The whole engagement lives in a single timeline — yours and your client's."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col rounded-2xl border border-black bg-white p-6 shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                  {step.number}
                </span>
                <span className="font-serif italic text-sm text-neutral-400">
                  step
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl leading-tight text-neutral-950">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            First invoice sent in &lt; 30 minutes
          </span>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            Templates for 5 verticals
          </span>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            Stripe optional on day one
          </span>
        </motion.div>
      </div>
    </section>
  );
}

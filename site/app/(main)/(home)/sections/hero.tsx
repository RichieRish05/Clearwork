"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const VERTICALS = [
  { name: "photographers", color: "#0f4d92" },
  { name: "designers", color: "#8c1515" },
  { name: "planners", color: "#be185d" },
  { name: "coaches", color: "#166534" },
  { name: "copywriters", color: "#e77500" },
] as const;

const ROTATE_MS = 2600;

export function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % VERTICALS.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const current = VERTICALS[index];

  const widestCh = React.useMemo(
    () => Math.max(...VERTICALS.map((v) => v.name.length)),
    [],
  );

  return (
    <section className="relative w-full px-6 sm:px-10 lg:px-16 pt-8 sm:pt-14 lg:pt-20 pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
        {/* Copy */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            We never touch your money
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
            className="mt-5 font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] leading-[0.98] tracking-tight text-neutral-950"
          >
            <motion.span variants={lineVariants} className="block">
              Client work
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              for solo
              <span
                className="relative inline-block align-baseline ml-3 sm:ml-4"
                style={{ minWidth: `${widestCh}ch` }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.name}
                    initial={{ opacity: 0, y: "0.25em", filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: "-0.25em", filter: "blur(8px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="italic font-normal inline-block"
                    style={{ color: current.color }}
                  >
                    {current.name}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-neutral-700"
          >
            Inquiries, proposals, contracts, payments, invoices &mdash; one
            tool. Every dollar flows directly to your Stripe account.
            Clearwork can&rsquo;t hold, freeze, or claw back a cent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
          >
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Start free trial
            </Link>
            <a
              href="#wedge"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-neutral-900 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              How payments work
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="mt-5 text-xs text-neutral-500"
          >
            14-day trial. No card required. $19/mo after, cancel any time.
          </motion.p>
        </div>

        {/* Smart file preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 relative"
        >
          <div
            aria-hidden
            className="absolute -inset-6 sm:-inset-10 -z-10 rounded-[2.5rem] blur-3xl opacity-60 transition-colors duration-700"
            style={{
              background: `radial-gradient(60% 60% at 50% 50%, ${current.color}33, transparent 70%)`,
            }}
          />
          <SmartFilePreview accent={current.color} />
        </motion.div>
      </div>
    </section>
  );
}

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SmartFilePreview({ accent }: { accent: string }) {
  return (
    <div className="relative mx-auto w-full max-w-115">
      <div className="relative rounded-2xl border border-black bg-white shadow-[0_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Smart file &middot; proposal
          </span>
        </div>

        <div className="p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Sasha Photography
          </p>
          <h3 className="mt-2 font-serif text-2xl leading-tight text-neutral-950">
            Mira &amp; Jonas <span className="italic text-neutral-600">wedding</span>
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Sept 14 &middot; Brooklyn, NY
          </p>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-800">
              <span>Wedding day coverage (8h)</span>
              <span className="tabular-nums">$4,500</span>
            </div>
            <div className="flex justify-between text-neutral-800">
              <span>Engagement session</span>
              <span className="tabular-nums">$850</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Second shooter (optional)</span>
              <span className="tabular-nums">+$600</span>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-neutral-200" />

          <div className="flex justify-between text-sm font-medium text-neutral-950">
            <span>Total</span>
            <span className="tabular-nums">$5,350</span>
          </div>

          <div
            className="mt-5 flex items-center justify-between rounded-xl border border-black px-4 py-3 shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-colors duration-700"
            style={{ background: accent }}
          >
            <span className="text-sm font-medium text-white">
              Pay $2,675 deposit
            </span>
            <span className="text-white" aria-hidden>
              &rarr;
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Signed &middot; 2 days ago
            </span>
            <span className="font-mono uppercase tracking-[0.18em]">
              Stripe Connect
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-3 -right-3 -rotate-6 rounded-md border-2 border-emerald-700 bg-white/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 shadow-md">
        Funds &rarr; your Stripe
      </div>
    </div>
  );
}

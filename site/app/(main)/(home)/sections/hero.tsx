"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const VERBS = [
  { name: "convert", color: "#0f4d92" },
  { name: "compound", color: "#003262" },
  { name: "scale", color: "#8c1515" },
  { name: "click", color: "#a51c30" },
  { name: "stick", color: "#e77500" },
  { name: "pay rent", color: "#1d4f91" },
] as const;

const ROTATE_MS = 2500;

export function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % VERBS.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const current = VERBS[index];

  const widestCh = React.useMemo(
    () => Math.max(...VERBS.map((s) => s.name.length)),
    [],
  );

  return (
    <section className="relative w-full px-6 sm:px-10 lg:px-16 pt-10 sm:pt-16 lg:pt-24 pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
        {/* Copy */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="font-serif text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95] tracking-tight text-neutral-950"
          >
            <motion.span
              variants={lineVariants}
              className="block"
            >
              Pricing cards
            </motion.span>
            <motion.span
              variants={lineVariants}
              className="block"
            >
              that
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
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-l leading-relaxed"
          >
            Drop a Stripe-connected pricing widget on your site in five minutes.
            Pick from templates that already convert. A/B test every tier,
            every word, every dollar &mdash; and watch what sticks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
          >
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Start free
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-neutral-900 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              See templates
            </Link>
          </motion.div>
        </div>

        {/* Image */}
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
          <div className="relative aspect-[1104/975] w-full max-w-[560px] mx-auto">
            <Image
              src="/HomeHero.png"
              alt="College journey illustration"
              fill
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 80vw, 100vw"
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            />
          </div>
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

function Stat({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center lg:items-start ${className}`}>
      <span className="font-serif text-2xl tracking-tight text-neutral-950 normal-case">
        {value}
      </span>
      <span className="mt-0.5">{label}</span>
    </div>
  );
}

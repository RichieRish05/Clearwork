"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const SCHOOLS = [
  { name: "Cornell", color: "#0f4d92" },
  { name: "Berkeley", color: "#003262" },
  { name: "Stanford", color: "#8c1515" },
  { name: "Harvard", color: "#a51c30" },
  { name: "Princeton", color: "#e77500" },
  { name: "Columbia", color: "#1d4f91" },
] as const;

const ROTATE_MS = 2500;

export function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SCHOOLS.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const current = SCHOOLS[index];

  // Measure the widest school name to keep layout stable across rotations.
  const widestCh = React.useMemo(
    () => Math.max(...SCHOOLS.map((s) => s.name.length)),
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
              Help your kid
            </motion.span>
            <motion.span
              variants={lineVariants}
              className="block"
            >
              land
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
                    {current.name}
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
            One-on-one mentorship from AI agents that run circles around overpriced 
            college admissions counselors. Essays that sound like your child. 
            A roadmap from freshman year to acceptance day.
          </motion.p>
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

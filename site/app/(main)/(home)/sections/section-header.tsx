"use client";

import * as React from "react";
import { motion } from "motion/react";

export function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
        {kicker}
      </span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 max-w-3xl font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-neutral-950"
      >
        {title}
      </motion.h2>
      {sub && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-700">
          {sub}
        </p>
      )}
    </div>
  );
}

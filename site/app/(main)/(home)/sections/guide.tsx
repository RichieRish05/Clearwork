"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./section-header";

type Stage = {
  year: string;
  italic: string;
  title: string;
  body: string;
  color: string;
  marks: string[];
};

const STAGES: Stage[] = [
  {
    year: "Year I",
    italic: "Freshman",
    title: "Plant the right seeds.",
    body: "We map your child's interests to a four-year academic and extracurricular plan that compounds. No frantic résumé padding.",
    color: "#0f4d92",
    marks: [
      "Course strategy",
      "First-year reading list",
      "Curiosity audit",
    ],
  },
  {
    year: "Year II",
    italic: "Sophomore",
    title: "Build the spine.",
    body: "Depth begins to matter more than breadth. We choose two or three pursuits and quietly turn them into something undeniable.",
    color: "#003262",
    marks: [
      "Signature project launch",
      "Summer programs",
      "PSAT diagnostic",
    ],
  },
  {
    year: "Year III",
    italic: "Junior",
    title: "Sharpen the edge.",
    body: "Test prep, school list architecture, and the first essay sketches — written in your child's voice, never a template's.",
    color: "#8c1515",
    marks: [
      "Balanced school list",
      "SAT / ACT execution",
      "Essay voice workshop",
    ],
  },
  {
    year: "Year IV",
    italic: "Senior",
    title: "Send it.",
    body: "Twelve applications, twelve essays, one orchestrated November. We carry the timeline so your family can carry the moment.",
    color: "#e77500",
    marks: [
      "Common App orchestration",
      "Supplements & interviews",
      "Decision-day strategy",
    ],
  },
];

export function Guide() {
  return (
    <section
      id="guide"
      className="relative w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="No. 03 — The Roadmap"
          title={
            <>
              Four years,{" "}
              <span className="italic font-normal" style={{ color: "#e77500" }}>
                one quiet plan
              </span>
              .
            </>
          }
          sub="From the first freshman schedule to the last decision letter — the path we walk with every family."
        />

        <div className="relative mt-20">
          {/* Spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[22px] sm:left-1/2 top-2 bottom-2 w-px sm:-translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25)_8%,rgba(0,0,0,0.25)_92%,transparent)]"
          />

          <ol className="space-y-14 sm:space-y-20">
            {STAGES.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={s.year}
                  className="relative grid grid-cols-[44px_1fr] sm:grid-cols-2 sm:gap-12"
                >
                  {/* Crest dot */}
                  <div
                    aria-hidden
                    className="relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-6 z-10 flex items-start justify-center"
                  >
                    <div
                      className="grid place-items-center h-11 w-11 rounded-full border border-black bg-white shadow-[0_3px_0_0_rgba(0,0,0,1)]"
                    >
                      <div
                        className="h-5 w-5 rounded-full"
                        style={{ background: s.color }}
                      />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  {!left && (
                    <div className="hidden sm:block" />
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`rounded-3xl border border-black bg-white p-7 sm:p-8 shadow-[0_4px_0_0_rgba(0,0,0,1)] ${
                      left ? "sm:mr-0" : "sm:ml-0"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                          {s.year}
                        </span>
                        <h3 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-3xl text-neutral-950 leading-tight">
                          <span
                            className="italic"
                            style={{ color: s.color }}
                          >
                            {s.italic}.
                          </span>{" "}
                          {s.title}
                        </h3>
                      </div>
                      <span
                        aria-hidden
                        className="hidden sm:grid place-items-center h-12 w-12 shrink-0 rounded-full border border-black font-[family-name:var(--font-instrument-serif)] italic text-2xl text-neutral-950"
                        style={{ background: `${s.color}14` }}
                      >
                        {romanize(i + 1)}
                      </span>
                    </div>

                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                      {s.body}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.marks.map((m) => (
                        <li
                          key={m}
                          className="rounded-full border border-black/80 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-neutral-700 font-[family-name:var(--font-geist-mono)]"
                          style={{ boxShadow: `inset 0 -2px 0 ${s.color}40` }}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Terminus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-14 mx-auto max-w-md text-center"
          >
            <div className="relative rounded-3xl border border-black bg-neutral-950 text-white p-8 shadow-[0_6px_0_0_rgba(0,0,0,1)]">
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.28em] text-white/60">
                Decision Day
              </span>
              <p className="mt-3 font-[family-name:var(--font-instrument-serif)] text-3xl leading-snug">
                <span className="italic" style={{ color: "#ffd166" }}>
                  Congratulations
                </span>{" "}
                — and welcome to the class.
              </p>
              <a
                href="#pricing"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white text-neutral-950 px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
              >
                Start the journey →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function romanize(n: number) {
  return ["I", "II", "III", "IV", "V", "VI"][n - 1] ?? String(n);
}

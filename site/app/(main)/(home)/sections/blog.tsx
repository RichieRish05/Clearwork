"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./section-header";

type Post = {
  kicker: string;
  italic: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  color: string;
  issue: string;
};

const FEATURED: Post = {
  kicker: "Field notes",
  italic: "from the dean's office",
  title: "The supplemental essay no one teaches you to write.",
  excerpt:
    "We read 312 admitted-student supplements and noticed the same hinge. It isn't the hook, the metaphor, or the clever ending — it's a single sentence that almost every writer is afraid to put on the page.",
  date: "Apr 24, 2026",
  read: "9 min read",
  color: "#8c1515",
  issue: "Issue 014",
};

const POSTS: Post[] = [
  {
    kicker: "Strategy",
    italic: "long game",
    title: "How to read a school list like an admissions officer.",
    excerpt:
      "Fit, yield, and the quiet math behind a balanced list of twelve.",
    date: "Apr 18, 2026",
    read: "6 min",
    color: "#0f4d92",
    issue: "Issue 013",
  },
  {
    kicker: "Voice",
    italic: "essays",
    title: "Why your child's first draft is almost always a performance.",
    excerpt:
      "And the three questions that crack open a real, unrepeatable voice.",
    date: "Apr 11, 2026",
    read: "7 min",
    color: "#e77500",
    issue: "Issue 012",
  },
  {
    kicker: "Counsel",
    italic: "parents",
    title: "What not to say at the dinner table in October.",
    excerpt:
      "Gentle scripts for the months when one wrong word can derail a year.",
    date: "Apr 03, 2026",
    read: "5 min",
    color: "#003262",
    issue: "Issue 011",
  },
];

export function Blog() {
  return (
    <section
      id="blog"
      className="relative w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="No. 02 — Dispatches"
          title={
            <>
              Letters from{" "}
              <span className="italic font-normal" style={{ color: "#0f4d92" }}>
                the desk
              </span>
              .
            </>
          }
          sub="Honest writing on essays, strategy, and the strange theatre of college admissions."
        />

        {/* Featured */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 rounded-3xl border border-black bg-white p-6 sm:p-8 shadow-[0_6px_0_0_rgba(0,0,0,1)]"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-black aspect-[5/4] lg:aspect-auto lg:min-h-[360px]"
            style={{
              background: `radial-gradient(120% 80% at 20% 10%, ${FEATURED.color}, #1a0408 70%)`,
            }}
          >
            <div className="absolute inset-0 mix-blend-overlay opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:6px_6px]" />
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white">
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] opacity-80">
                {FEATURED.issue}
              </span>
              <span className="rounded-full border border-white/40 bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                Featured
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="font-[family-name:var(--font-instrument-serif)] italic text-white/90 text-2xl"
              >
                {FEATURED.italic}
              </p>
              <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-white/70">
                {FEATURED.kicker} · {FEATURED.date}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-neutral-500">
              {FEATURED.read}
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl leading-[1.05] tracking-tight text-neutral-950">
              {FEATURED.title}
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-neutral-700">
              {FEATURED.excerpt}
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-black bg-white px-4 py-2 text-sm shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
            >
              Read the dispatch{" "}
              <span aria-hidden className="translate-y-px">
                →
              </span>
            </a>
          </div>
        </motion.article>

        {/* Recent */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col rounded-2xl border border-black bg-white p-6 shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[0_6px_0_0_rgba(0,0,0,1)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-[family-name:var(--font-instrument-serif)] italic text-lg"
                  style={{ color: p.color }}
                >
                  {p.italic}
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {p.issue}
                </span>
              </div>
              <h4 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-2xl leading-[1.1] text-neutral-950">
                {p.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {p.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-[family-name:var(--font-geist-mono)]">
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

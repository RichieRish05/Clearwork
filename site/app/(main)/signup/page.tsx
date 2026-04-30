"use client";

import Image from "next/image";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function SignupPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-white font-sans overflow-hidden px-6 py-16">
      <GridPattern
        width={56}
        height={56}
        className="stroke-gray-300/40 fill-transparent mask-[radial-gradient(ellipse_at_center,black_25%,transparent_90%)]"
      />

      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2 text-sm shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
      >
        <span aria-hidden>←</span> Back home
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="mb-6"
          />
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            Office of Admissions
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.02] tracking-tight text-neutral-950">
            Begin your{" "}
            <span
              className="italic font-normal"
              style={{ color: "#8c1515" }}
            >
              application
            </span>
            .
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-700">
            A few details to enroll your family. We&apos;ll match a mentor and
            send your first roadmap within a day.
          </p>
        </div>

        <form
          className="mt-10 rounded-3xl border border-black bg-white p-7 shadow-[0_4px_0_0_rgba(0,0,0,1)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Parent name" name="name" placeholder="Eleanor Whitaker" />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="eleanor@whitaker.co"
          />
          <Field
            label="Student grade"
            name="grade"
            placeholder="Sophomore — class of 2028"
          />

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
          >
            Submit application
          </button>

          <p className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-[family-name:var(--font-geist-mono)]">
            By submitting you agree to our terms
          </p>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-700">
          Already enrolled?{" "}
          <Link
            href="/"
            className="italic font-[family-name:var(--font-instrument-serif)] text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
          >
            sign in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block mt-4 first:mt-0">
      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.24em] text-neutral-600">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-black bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 shadow-[inset_0_2px_0_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
      />
    </label>
  );
}

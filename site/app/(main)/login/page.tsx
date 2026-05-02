"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

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
        Back home
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
            Welcome{" "}
            <span className="italic font-normal" style={{ color: "#8c1515" }}>
              back
            </span>
            .
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-700">
            Sign in to pick up where you left off.
          </p>
        </div>

        <form
          action={formAction}
          className="mt-10 rounded-3xl border border-black bg-white p-7 shadow-[0_4px_0_0_rgba(0,0,0,1)]"
        >
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="eleanor@whitaker.co"
            required
          />
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />

          {state?.error ? (
            <p className="mt-4 text-sm text-red-700">{state.error}</p>
          ) : null}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-700">
          New here?{" "}
          <Link
            href="/signup"
            className="italic font-[family-name:var(--font-instrument-serif)] text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
          >
            create an account
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
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        required={required}
        className="mt-2 w-full rounded-xl border border-black bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 shadow-[inset_0_2px_0_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
      />
    </label>
  );
}

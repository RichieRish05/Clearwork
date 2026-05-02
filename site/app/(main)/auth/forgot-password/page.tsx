"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { Field } from "@/components/ui/field";
import { requestReset } from "./actions";

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(requestReset, null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <Link
        href="/auth/login"
        className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2 text-sm shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
      >
        Back to sign in
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
            Forgot your{" "}
            <span className="italic font-normal" style={{ color: "#8c1515" }}>
              password
            </span>
            ?
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-700">
            Enter your email and we&rsquo;ll send you a link to set a new one.
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

          {state?.error ? (
            <p className="mt-4 text-sm text-red-700">{state.error}</p>
          ) : null}
          {state?.sent ? (
            <p className="mt-4 text-sm text-neutral-700">
              If an account exists for that email, a reset link is on its way.
              Check your inbox.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
          >
            Send reset link
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-700">
          Remembered it?{" "}
          <Link
            href="/auth/login"
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

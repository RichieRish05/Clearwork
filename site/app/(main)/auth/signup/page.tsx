"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Field } from "@/components/ui/field";
import { GoogleButton } from "@/components/auth/google-button";
import { signup } from "./actions";

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, null);
  const status = useSearchParams().get("status");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
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
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            Office of Admissions
          </span>
          <h1 className="mt-4 font-serif text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.02] tracking-tight text-neutral-950">
            Begin your{" "}
            <span className="italic font-normal" style={{ color: "#8c1515" }}>
              application
            </span>
            .
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-700">
            A few details to enroll yourself. Welcome to your college application journey!
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
            placeholder="At least 6 characters"
            required
          />

          {state?.error ? (
            <p className="mt-4 text-sm text-red-700">{state.error}</p>
          ) : null}
          {status === "check-email" ? (
            <p className="mt-4 text-sm text-neutral-700">
              Check your inbox to confirm your email, then sign in.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
          >
            Submit application
          </button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-neutral-200" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
              or
            </span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <GoogleButton />

          <p className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-mono">
            By submitting you agree to our terms
          </p>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-700">
          Already enrolled?{" "}
          <Link
            href="/auth/login"
            className="italic font-serif text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
          >
            sign in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

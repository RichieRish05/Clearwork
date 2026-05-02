"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Field } from "@/components/ui/field";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);
  const searchParams = useSearchParams();
  const reset = searchParams.get("reset");
  const [hashError, setHashError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.location.hash) return;
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const description = hashParams.get("error_description");
    if (description) {
      setHashError(description.replace(/\+/g, " "));
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, []);

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

          <div className="mt-3 text-right">
            <Link
              href="/auth/forgot-password"
              className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-950"
            >
              Forgot password?
            </Link>
          </div>

          {state?.error ? (
            <p className="mt-4 text-sm text-red-700">{state.error}</p>
          ) : null}
          {reset === "success" ? (
            <p className="mt-4 text-sm text-neutral-700">
              Your password was updated. Sign in with your new password.
            </p>
          ) : null}
          {hashError ? (
            <p className="mt-4 text-sm text-red-700">{hashError}</p>
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
            href="/auth/signup"
            className="italic font-serif text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
          >
            create an account
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

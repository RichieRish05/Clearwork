"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import { updatePassword, updateProfile } from "./actions";

type AccountFormsProps = {
  initialName: string;
  email: string;
  hasPassword: boolean;
};

export function AccountForms({
  initialName,
  email,
  hasPassword,
}: AccountFormsProps) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateProfile,
    null,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    updatePassword,
    null,
  );

  const passwordHeading = hasPassword ? "Update password" : "Set a password";
  const passwordSubtitle = hasPassword
    ? "Choose a new password, at least 6 characters."
    : "Add an email + password as a second way to sign in.";
  const passwordCta = hasPassword ? "Update password" : "Set password";

  return (
    <>
      <section className="rounded-2xl bg-white p-7 ring-1 ring-neutral-200/70 shadow-[0_4px_24px_-6px_rgb(15_23_42/0.08),0_2px_8px_-2px_rgb(15_23_42/0.04)]">
        <header className="flex flex-col gap-1">
          <h2 className="text-base font-semibold tracking-tight text-neutral-900">
            Profile
          </h2>
          <p className="text-sm text-neutral-500">
            Update how your name shows across the app.
          </p>
        </header>

        <form action={profileAction} className="mt-6">
          <Field
            label="Display name"
            name="name"
            defaultValue={initialName}
            placeholder="Your name"
            required
          />

          <div className="mt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-600">
              Email
            </span>
            <p className="mt-2 text-sm text-neutral-700">{email}</p>
          </div>

          {profileState?.error ? (
            <p className="mt-4 text-sm text-red-700">{profileState.error}</p>
          ) : null}
          {profileState?.ok ? (
            <p className="mt-4 text-sm text-emerald-700">Saved.</p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={profilePending}
            className="mt-6"
          >
            {profilePending ? "Saving..." : "Save"}
          </Button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-7 ring-1 ring-neutral-200/70 shadow-[0_4px_24px_-6px_rgb(15_23_42/0.08),0_2px_8px_-2px_rgb(15_23_42/0.04)]">
        <header className="flex flex-col gap-1">
          <h2 className="text-base font-semibold tracking-tight text-neutral-900">
            {passwordHeading}
          </h2>
          <p className="text-sm text-neutral-500">{passwordSubtitle}</p>
        </header>

        <form action={passwordAction} className="mt-6">
          <Field
            label="New password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          <Field
            label="Confirm password"
            name="confirm"
            type="password"
            placeholder="••••••••"
            required
          />

          {passwordState?.error ? (
            <p className="mt-4 text-sm text-red-700">{passwordState.error}</p>
          ) : null}
          {passwordState?.ok ? (
            <p className="mt-4 text-sm text-emerald-700">
              {hasPassword ? "Password updated." : "Password set."}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={passwordPending}
            className="mt-6"
          >
            {passwordPending ? "Saving..." : passwordCta}
          </Button>
        </form>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/lib/profile/use-profile";

export function ProfileCard() {
  const { profile, updateName } = useProfile();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile) return null;

  const displayName = profile?.fullName?.trim();


  async function handleSave(formData: FormData) {
    const next = String(formData.get("fullName") ?? "");
    setError(null);
    setSaving(true);
    try {
      await updateName(next);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-6 w-full rounded-2xl bg-white ring-1 ring-neutral-200/70 sm:mt-8">
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        {editing ? (
          <form action={handleSave} className="space-y-4">
            <div>
              <label
                htmlFor="profile-fullName"
                className="block text-sm text-neutral-500"
              >
                Name
              </label>
              <Input
                id="profile-fullName"
                name="fullName"
                defaultValue={profile?.fullName ?? ""}
                placeholder="Your name"
                autoFocus
                required
                className="mt-2 h-11 w-full rounded-xl px-4"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="submit"
                disabled={saving}
                className="h-9 rounded-full px-5"
              >
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setError(null);
                }}
                className="h-9 rounded-full px-5"
              >
                Cancel
              </Button>
              {error ? (
                <span className="w-full text-xs text-red-600 sm:w-auto">
                  {error}
                </span>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-neutral-500">Name</p>
              <p className="mt-1 truncate text-base text-neutral-900">
                {displayName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="shrink-0 text-sm font-medium text-neutral-900 hover:text-neutral-700"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

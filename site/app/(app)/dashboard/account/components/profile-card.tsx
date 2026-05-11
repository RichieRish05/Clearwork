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
    <section className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
      {editing ? (
        <form action={handleSave} className="px-5 py-4">
          <label
            htmlFor="profile-fullName"
            className="block text-xs text-neutral-500"
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
            className="mt-2 h-10 w-full rounded-lg px-3"
          />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={saving}
              className="h-8 rounded-md px-3"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditing(false);
                setError(null);
              }}
              className="h-8 rounded-md px-3"
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
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-500">Name</p>
            <p className="mt-0.5 truncate text-sm font-medium text-neutral-900">
              {displayName}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="shrink-0 text-sm font-medium text-neutral-700 hover:text-neutral-900"
          >
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

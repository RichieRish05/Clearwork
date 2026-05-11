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
    <section className="mt-8 rounded-2xl bg-white ring-1 ring-neutral-200/70">
      <div className="px-6 py-5">
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
                className="mt-2 h-11 rounded-xl px-4"
              />
            </div>
            <div className="flex items-center gap-2">
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
                <span className="text-xs text-red-600">{error}</span>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500">Name</p>
              <p className="mt-1 text-base text-neutral-900">{displayName}</p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-neutral-900 hover:text-neutral-700"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import useSWR from "swr";

import { createClient } from "@/lib/supabase/client";

import { updateDisplayName } from "./actions";
import type { Profile } from "./types";

export const PROFILE_KEY = "profile";

async function profileFetcher(): Promise<Profile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? null,
    fullName: data?.full_name ?? null,
    avatarUrl: data?.avatar_url ?? null,
  };
}

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR<Profile | null>(
    PROFILE_KEY,
    profileFetcher,
  );

  async function updateName(fullName: string) {
    const trimmed = fullName.trim();
    if (!data) throw new Error("No profile loaded.");

    await mutate(
      async () => {
        const res = await updateDisplayName(trimmed);
        if (res.error) throw new Error(res.error);
        return { ...data, fullName: trimmed };
      },
      {
        optimisticData: { ...data, fullName: trimmed },
        rollbackOnError: true,
        revalidate: false,
      },
    );
  }

  return {
    profile: data ?? null,
    isLoading,
    error: error as Error | undefined,
    updateName,
    mutate,
  };
}

import "server-only";

import { createClient } from "@/lib/supabase/server";

import type { Profile } from "./types";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
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

"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateDisplayName(
  fullName: string,
): Promise<{ ok?: true; error?: string }> {
  const trimmed = fullName.trim();
  if (!trimmed) return { error: "Name is required." };
  if (trimmed.length > 80)
    return { error: "Name must be 80 characters or fewer." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You are not signed in." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: trimmed })
    .eq("id", user.id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/account");
  return { ok: true };
}

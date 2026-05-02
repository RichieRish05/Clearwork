"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function confirmReset(formData: FormData) {
  const code = String(formData.get("code") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(next);
    console.error("auth/confirm exchangeCodeForSession failed:", error.message);
  }

  redirect("/auth/login");
}

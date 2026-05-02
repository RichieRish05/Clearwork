"use server";

import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function confirmReset(formData: FormData) {
  const token_hash = String(formData.get("token_hash") ?? "");
  const type = String(formData.get("type") ?? "") as EmailOtpType;
  const code = String(formData.get("code") ?? "");
  const next = String(formData.get("next") ?? "/");

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(next);
    console.error("auth/confirm exchangeCodeForSession failed:", error.message);
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) redirect(next);
    console.error("auth/confirm verifyOtp failed:", error.message);
  }

  redirect("/auth/login?error=invalid_link");
}

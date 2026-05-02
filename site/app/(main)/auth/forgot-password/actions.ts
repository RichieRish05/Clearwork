"use server";

import { createClient } from "@/lib/supabase/server";

export type ForgotPasswordState = { sent?: boolean; error?: string } | null;

export async function requestReset(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Email is required." };

  const supabase = await createClient();
  // The Supabase "Reset Password" email template must link to
  // {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/reset-password
  // (not {{ .ConfirmationURL }}) so the OTP is verified by our /auth/confirm
  // page on user click rather than consumed by inbox link-prefetchers.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/auth/reset-password`,
  });

  return { sent: true };
}

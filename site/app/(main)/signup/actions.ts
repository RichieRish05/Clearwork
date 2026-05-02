"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignupState = { error?: string } | null;

export async function signup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const supabase = await createClient();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fullName = String(formData.get("name") ?? "");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: error.message };
  if (!data.user?.identities?.length) {
    return {
      error: "An account with this email already exists. Try signing in instead.",
    };
  }
  if (!data.session) redirect("/signup?status=check-email");
  revalidatePath("/", "layout");
  redirect("/");
}

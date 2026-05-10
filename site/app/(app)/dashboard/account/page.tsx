import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { AccountForms } from "./account-forms";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const meta = user.user_metadata ?? {};
  const initialName =
    (typeof meta.full_name === "string" ? meta.full_name : "") ||
    (typeof meta.name === "string" ? meta.name : "");
  const hasPassword =
    user.identities?.some((identity) => identity.provider === "email") ?? false;

  return (
    <div className="flex flex-1 flex-col px-10 py-10">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-[28px] font-semibold tracking-tight text-neutral-900">
          Account
        </h1>
        <p className="text-sm text-neutral-500">
          Manage how your name appears and how you sign in.
        </p>
      </header>

      <div className="mt-8 flex max-w-2xl flex-col gap-6">
        <AccountForms
          initialName={initialName}
          email={user.email ?? ""}
          hasPassword={hasPassword}
        />
      </div>
    </div>
  );
}

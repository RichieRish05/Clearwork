"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { LogoutButton } from "./components/logout-button";
import { ProfileCard } from "./components/profile-card";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-[28px]">
            Account
          </h1>
          <p className="text-sm text-neutral-500">
            Manage your profile, security, and connected accounts.
          </p>
        </header>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-lg mb-3 font-semibold text-neutral-900">
              Profile
            </h2>
            <ProfileCard />
          </section>

          <section>
            <h2 className="text-lg mb-3 font-semibold text-neutral-900">
              Session
            </h2>
            <LogoutButton />
          </section>
        </div>
      </div>
    </div>
  );
}

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
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[28px]">
          Account
        </h1>
        <p className="text-sm text-neutral-500">
          Manage how your name appears and how you sign in.
        </p>
      </header>

      <ProfileCard />
      <LogoutButton />
    </div>
  );
}

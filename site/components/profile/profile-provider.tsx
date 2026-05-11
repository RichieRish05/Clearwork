"use client";

import { SWRConfig } from "swr";

import { PROFILE_KEY } from "@/lib/profile/use-profile";
import type { Profile } from "@/lib/profile/types";

export function ProfileProvider({
  initial,
  children,
}: {
  initial: Profile | null;
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fallback: { [PROFILE_KEY]: initial },
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 30_000,
      }}
    >
      {children}
    </SWRConfig>
  );
}

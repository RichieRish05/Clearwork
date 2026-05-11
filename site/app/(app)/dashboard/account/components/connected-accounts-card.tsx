"use client";

import Image from "next/image";

import { useProfile } from "@/lib/profile/use-profile";

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  email: "Email"
};

const PROVIDER_LOGOS: Record<string, string> = {
  google: "/googleLogo.png",
  email: "/mail.png"
};

function labelFor(provider: string) {
  return (
    PROVIDER_LABELS[provider] ??
    provider.charAt(0).toUpperCase() + provider.slice(1)
  );
}

export function ConnectedAccountsCard() {
  const { profile } = useProfile();

  if (!profile) return null;

  const identities = profile.identities;

  return (
    <section className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
      {identities.length === 0 ? (
        <p className="px-5 py-4 text-sm text-neutral-500">
          No connected accounts.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200/80">
          {identities.map((identity) => {
            const logo = PROVIDER_LOGOS[identity.provider];
            return (
              <li
                key={identity.provider}
                className="flex items-center gap-3 px-5 py-4"
              >
                {logo ? (
                  <Image
                    src={logo}
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                ) : null}
                <span className="text-sm font-medium text-neutral-900">
                  {labelFor(identity.provider)}
                </span>
                {identity.email ? (
                  <span className="truncate text-sm text-neutral-500">
                    {identity.email}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app/app-sidebar";
import { ProfileProvider } from "@/components/profile/profile-provider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getProfile } from "@/lib/profile/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (!profile) redirect("/auth/login");

  return (
    <ProfileProvider initial={profile}>
      <TooltipProvider delayDuration={120}>
        <SidebarProvider className="relative flex-1 overflow-hidden font-sans">
          <GridPattern
            width={56}
            height={56}
            className="stroke-slate-300/25 fill-transparent mask-[radial-gradient(ellipse_at_center,black_95%)]"
          />
          <AppSidebar />
          <SidebarInset className="bg-transparent">
            <header className="sticky top-2 z-30 mx-2 flex h-12 items-center rounded-lg bg-white/60 px-3 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-sm md:hidden">
              <SidebarTrigger className="text-neutral-500 hover:text-neutral-900" />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ProfileProvider>
  );
}

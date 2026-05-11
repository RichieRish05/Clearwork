"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BookOpen,
  ChevronsUpDown,
  GraduationCap,
  House,
  MessageSquare,
  PanelLeft,
  Trophy,
} from "lucide-react";
import { useProfile } from "@/lib/profile/use-profile";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: House },
  { label: "Assistant", href: "/dashboard/assistant", icon: MessageSquare },
  { label: "College List", href: "/dashboard/college-list", icon: GraduationCap },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Scholarship", href: "/dashboard/scholarship", icon: Award },
  { label: "Activities", href: "/dashboard/activities", icon: Trophy },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const { profile } = useProfile();

  const fullName = profile?.fullName ?? profile?.email ?? "Account";


  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className={cn(
        "**:data-[slot=sidebar-inner]:rounded-2xl",
        "**:data-[slot=sidebar-inner]:bg-white",
        "**:data-[slot=sidebar-inner]:shadow-[0_4px_24px_-6px_rgb(15_23_42/0.08),0_2px_8px_-2px_rgb(15_23_42/0.04)]",
        "**:data-[slot=sidebar-inner]:ring-neutral-200/70",
      )}
    >
      <SidebarHeader className="px-3 pt-3 pb-2 group-data-[collapsible=icon]:px-1.5">
        <div
          className={cn(
            "flex items-center justify-between",
            "group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-1.5",
          )}
        >
          <Link
            href="/dashboard"
            className="flex size-8 items-center justify-center rounded-md transition-opacity hover:opacity-80"
            aria-label="Home"
          >
            <Image
              src="/Logo-v2.png"
              alt="Logo"
              width={28}
              height={28}
              className="size-7 object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex size-7 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900"
            aria-label="Toggle sidebar"
          >
            <PanelLeft
              className={cn(
                "size-4 transition-transform duration-200",
                "group-data-[collapsible=icon]:rotate-180",
              )}
            />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1.5">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === item.href
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "h-8 gap-2.5 rounded-md text-[13px] text-neutral-700",
                        "data-[active=true]:bg-neutral-200/70 data-[active=true]:text-neutral-900",
                      )}
                    >
                      <Link href={item.href}>
                        <Icon className="size-3.75 text-neutral-500 group-data-[active=true]/menu-button:text-neutral-800" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {profile && 
      <SidebarFooter className="gap-2 px-3 pb-3 group-data-[collapsible=icon]:px-1.5">
        <Link
          href="/dashboard/account"
          className={cn(
            "group flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left transition-colors hover:bg-neutral-200/50",
            pathname === "/dashboard/account" && "bg-neutral-200/70",
            "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
          )}
        >
          <div className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-[11px] font-semibold text-white">
            <Image
              src={"/circle.png"}
              alt={fullName}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <span className="flex-1 truncate text-[13px] font-medium text-neutral-900 group-data-[collapsible=icon]:hidden">
            {fullName}
          </span>
          <ChevronsUpDown className="size-3.5 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600 group-data-[collapsible=icon]:hidden" />
        </Link>
      </SidebarFooter>}

    </Sidebar>
  );
}

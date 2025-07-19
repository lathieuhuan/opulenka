"use client";

import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/lib/components/sidebar";

export function NavSite() {
  const { isMobile } = useSidebar();

  const NAV_ITEMS = [
    {
      label: "Introduction",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[state=collapsed]:h-12! group-data-[state=collapsed]:bg-transparent!"
            >
              <div className="shrink-0">
                <Image src="/favicon.ico" alt="logo" width={36} height={36} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Opulenka</span>
                <span className="truncate text-xs">v1.0.0</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {NAV_ITEMS.map((item, index) => (
              <Link key={item.label} href={item.href}>
                <DropdownMenuItem className="gap-2 p-2">{item.label}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

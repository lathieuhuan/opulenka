"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/lib/components/sidebar";
import { NavApp } from "./nav-app";
import { NavSite } from "./nav-site";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {};

export function AppSidebar(props: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavSite />
      </SidebarHeader>
      <SidebarContent>
        <NavApp />
      </SidebarContent>
      {/* <SidebarFooter>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@opulenka/ui"
import type { ComponentProps } from "react"

import { NavApp } from "./NavApp"
import { NavSite } from "./NavSite"

type AppSidebarProps = ComponentProps<typeof Sidebar>

export function AppSidebar(props: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<NavSite />
			</SidebarHeader>
			<SidebarContent>
				<NavApp />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
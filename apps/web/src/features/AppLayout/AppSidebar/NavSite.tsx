import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@opulenka/ui"
import { Link } from "@tanstack/react-router"
import { ChevronsUpDown } from "lucide-react"

import { NAV_SITE_ITEMS } from "./constants"

export function NavSite() {
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[state=collapsed]:h-12! group-data-[state=collapsed]:bg-transparent!"
							>
								<div className="shrink-0">
									<img src="/favicon.ico" alt="logo" width={36} height={36} />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Opulenka</span>
									<span className="truncate text-xs">v1.0.0</span>
								</div>
								<ChevronsUpDown className="ml-auto" />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						{NAV_SITE_ITEMS.map((item) => (
							<Link key={item.href} to={item.href}>
								<DropdownMenuItem className="gap-2 p-2">
									{item.label}
								</DropdownMenuItem>
							</Link>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
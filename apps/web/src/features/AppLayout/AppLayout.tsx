import { SidebarInset, SidebarProvider } from "@opulenka/ui"
import type { ReactNode } from "react"

import { AppSidebar } from "./AppSidebar"
import { Header } from "./Header"

type AppLayoutProps = {
	children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<div className="p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
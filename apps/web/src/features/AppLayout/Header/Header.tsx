import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Separator,
	SidebarTrigger,
} from "@opulenka/ui"
import { type FileRouteTypes, Link, useLocation } from "@tanstack/react-router"

import { NavUser } from "./NavUser"

type BreadcrumbItemSpec = {
	label: string
	href?: FileRouteTypes["to"]
}

type BreadcrumbSeparatorSpec = {
	id: string
}

export function Header() {
	const pathname = useLocation({
		select: (location) => location.pathname,
	})

	// TODO temporary
	const breadcrumbs: (BreadcrumbItemSpec | BreadcrumbSeparatorSpec)[] = []

	for (const [index, item] of pathname.split("/").entries()) {
		if (item === "" || item === "app") continue

		if (breadcrumbs.length !== 0) {
			breadcrumbs.push({
				id: `separator-${index}`,
			})
		}

		breadcrumbs.push({
			label: item,
			href: `/app/${item}`,
		})
	}

	return (
		<header className="flex justify-between h-16 shrink-0 items-center gap-2 bg-header border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((breadcrumb, index) => {
							if ("id" in breadcrumb) {
								return <BreadcrumbSeparator key={breadcrumb.id} />
							}

							return (
								<BreadcrumbItem key={breadcrumb.label}>
									{index === breadcrumbs.length - 1 ? (
										<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink render={<Link to={breadcrumb.href} />}>
											{breadcrumb.label}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							)
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<NavUser />
		</header>
	)
}
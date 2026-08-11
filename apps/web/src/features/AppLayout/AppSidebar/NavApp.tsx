import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	type SidebarMenuButtonProps,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@opulenka/ui"
import { Link, useMatchRoute } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { type ReactNode, useMemo } from "react"

import {
	type BaseNavAppItemSpec,
	NAV_APP_ITEMS,
	type NavAppItemSpec,
	type SingleNavAppItemSpec,
} from "./constants"

const isSingleNavItem = (
	item: NavAppItemSpec,
): item is SingleNavAppItemSpec => {
	return "children" in item === false
}

export function NavApp() {
	const match = useMatchRoute()

	const isNavItemActive = (item: BaseNavAppItemSpec) => {
		return match({ to: item.href, fuzzy: item.href !== "/app" }) !== false
	}

	const defaultOpenKey = useMemo(() => {
		const defaultOpenItem = NAV_APP_ITEMS.find(
			(item) => !isSingleNavItem(item) && item.children.some(isNavItemActive),
		)

		return defaultOpenItem?.key
	}, [])

	return (
		<SidebarGroup>
			<SidebarMenu>
				{NAV_APP_ITEMS.map((item) => {
					if (isSingleNavItem(item)) {
						return (
							<SidebarMenuItem key={item.key}>
								<Link to={item.href}>
									<MenuButton item={item} isActive={isNavItemActive(item)} />
								</Link>
							</SidebarMenuItem>
						)
					}

					const hasActiveChild = item.children.some(isNavItemActive)

					return (
						<Collapsible
							key={item.key}
							className="group/collapsible"
							defaultOpen={item.key === defaultOpenKey}
							render={<SidebarMenuItem />}
						>
							<CollapsibleTrigger
								render={
									<MenuButton
										item={item}
										className={[
											"data-[state=open]:opacity-80",
											hasActiveChild &&
												"data-[state=closed]:opacity-100 data-[state=closed]:bg-sidebar-accent group-data-[state=collapsed]:bg-sidebar-accent",
										]}
										suffix={
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
										}
									/>
								}
							/>

							<CollapsibleContent>
								<SidebarMenuSub>
									{item.children.map((subItem) => {
										const isActive = isNavItemActive(subItem)

										return (
											<SidebarMenuSubItem key={subItem.key}>
												<SidebarMenuSubButton
													className={{
														"opacity-60 hover:opacity-80": !isActive,
													}}
													isActive={isActive}
													render={
														<Link to={subItem.href}>
															<span>{subItem.label}</span>
														</Link>
													}
												/>
											</SidebarMenuSubItem>
										)
									})}
								</SidebarMenuSub>
							</CollapsibleContent>
						</Collapsible>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}

type MenuButtonProps = SidebarMenuButtonProps & {
	item: NavAppItemSpec
	suffix?: ReactNode
}

function MenuButton({
	className,
	item,
	isActive,
	suffix,
	...props
}: MenuButtonProps) {
	return (
		<SidebarMenuButton
			tooltip={item.label}
			className={{
				"opacity-60 hover:opacity-80": !isActive,
				className: true,
			}}
			isActive={isActive}
			{...props}
		>
			{item.icon}
			<span className="truncate">{item.label}</span>
			{suffix}
		</SidebarMenuButton>
	)
}
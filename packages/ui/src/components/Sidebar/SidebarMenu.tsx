import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, CSSProperties } from "react"
import { useState } from "react"

import { Skeleton } from "@/components/Skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip"
import type { RenderComponentProps, WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"
import { useSidebar } from "./context"

// SIDEBAR_MENU

export type SidebarMenuProps = WithClassValue<ComponentProps<"ul">>

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	)
}

// SIDEBAR_MENU_ITEM

export type SidebarMenuItemProps = WithClassValue<ComponentProps<"li">>

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	)
}

// SIDEBAR_MENU_BUTTON

const sidebarMenuButtonVariants = cva(
	"peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-[calc(var(--radius-sm)+2px)] p-2 text-left text-xs ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
			},
			size: {
				default: "h-8 text-xs",
				sm: "h-7 text-xs",
				lg: "h-12 text-xs group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

export type SidebarMenuButtonProps = WithClassValue<
	RenderComponentProps<"button">
> &
	VariantProps<typeof sidebarMenuButtonVariants> & {
		isActive?: boolean
		tooltip?: string | ComponentProps<typeof TooltipContent>
	}

export function SidebarMenuButton({
	render,
	isActive = false,
	variant = "default",
	size = "default",
	tooltip,
	className,
	...props
}: SidebarMenuButtonProps) {
	const { isMobile, state } = useSidebar()
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(sidebarMenuButtonVariants({ variant, size, className })),
			},
			props,
		),
		render: !tooltip ? render : <TooltipTrigger render={render} />,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive,
		},
	})

	if (!tooltip) {
		return comp
	}

	if (typeof tooltip === "string") {
		tooltip = {
			children: tooltip,
		}
	}

	return (
		<Tooltip>
			{comp}
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	)
}

// SIDEBAR_MENU_ACTION

export type SidebarMenuActionProps = WithClassValue<
	RenderComponentProps<"button">
> & {
	showOnHover?: boolean
}

export function SidebarMenuAction({
	className,
	render,
	showOnHover = false,
	...props
}: SidebarMenuActionProps) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
					showOnHover &&
						"group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-menu-action",
			sidebar: "menu-action",
		},
	})
}

// SIDEBAR_MENU_BADGE

export type SidebarMenuBadgeProps = WithClassValue<ComponentProps<"div">>

export function SidebarMenuBadge({
	className,
	...props
}: SidebarMenuBadgeProps) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				"pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
				className,
			)}
			{...props}
		/>
	)
}

// SIDEBAR_MENU_SKELETON

export type SidebarMenuSkeletonProps = WithClassValue<ComponentProps<"div">> & {
	showIcon?: boolean
}

export function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: SidebarMenuSkeletonProps) {
	const [width] = useState(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`
	})

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
			{...props}
		>
			{showIcon && (
				<Skeleton
					className="size-4 rounded-md"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="h-4 max-w-(--skeleton-width) flex-1"
				data-sidebar="menu-skeleton-text"
				style={
					{
						"--skeleton-width": width,
					} as CSSProperties
				}
			/>
		</div>
	)
}

// SIDEBAR_MENU_SUB

export type SidebarMenuSubProps = WithClassValue<ComponentProps<"ul">>

export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn(
				"mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	)
}

// SIDEBAR_MENU_SUB_ITEM

export type SidebarMenuSubItemProps = WithClassValue<ComponentProps<"li">>

export function SidebarMenuSubItem({
	className,
	...props
}: SidebarMenuSubItemProps) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={cn("group/menu-sub-item relative", className)}
			{...props}
		/>
	)
}

// SIDEBAR_MENU_SUB_BUTTON

export type SidebarMenuSubButtonProps = WithClassValue<
	RenderComponentProps<"a">
> & {
	size?: "sm" | "md"
	isActive?: boolean
}

export function SidebarMenuSubButton({
	render,
	size = "md",
	isActive = false,
	className,
	...props
}: SidebarMenuSubButtonProps) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps<"a">(
			{
				className: cn(
					"flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-xs data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-menu-sub-button",
			sidebar: "menu-sub-button",
			size,
			active: isActive,
		},
	})
}
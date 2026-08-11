import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import type { ClassValue } from "clsx"
import type { ComponentProps } from "react"

import type { RenderComponentProps, WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export type SidebarGroupProps = WithClassValue<ComponentProps<"div">>

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn(
				"relative flex w-full min-w-0 flex-col px-2 py-1",
				className,
			)}
			{...props}
		/>
	)
}

export type SidebarGroupLabelProps = WithClassValue<RenderComponentProps<"div">>

export function SidebarGroupLabel({
	className,
	render,
	...props
}: SidebarGroupLabelProps) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"flex h-8 shrink-0 items-center rounded-md px-2 text-xs text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label",
		},
	})
}

export type SidebarGroupActionProps = useRender.ComponentProps<"button"> &
	ComponentProps<"button"> & {
		className?: ClassValue
	}

export function SidebarGroupAction({
	className,
	render,
	...props
}: SidebarGroupActionProps) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-group-action",
			sidebar: "group-action",
		},
	})
}

export type SidebarGroupContentProps = ComponentProps<"div"> & {
	className?: ClassValue
}

export function SidebarGroupContent({
	className,
	...props
}: SidebarGroupContentProps) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("w-full text-xs", className)}
			{...props}
		/>
	)
}
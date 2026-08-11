import type { ComponentProps } from "react"

import { Input } from "@/components/Input"
import { Separator } from "@/components/Separator"
import type { WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

// SIDEBAR_INSET

export type SidebarInsetProps = WithClassValue<ComponentProps<"main">>

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				className,
			)}
			{...props}
		/>
	)
}

// SIDEBAR_INPUT

export type SidebarInputProps = WithClassValue<ComponentProps<typeof Input>>

export function SidebarInput({ className, ...props }: SidebarInputProps) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn(
				"h-8 w-full border-input bg-muted/20 dark:bg-muted/30",
				className,
			)}
			{...props}
		/>
	)
}

// SIDEBAR_HEADER

export type SidebarHeaderProps = WithClassValue<ComponentProps<"div">>

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	)
}

// SIDEBAR_FOOTER

export type SidebarFooterProps = WithClassValue<ComponentProps<"div">>

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	)
}

// SIDEBAR_SEPARATOR

export type SidebarSeparatorProps = WithClassValue<
	ComponentProps<typeof Separator>
>

export function SidebarSeparator({
	className,
	...props
}: ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("mx-2 w-auto bg-sidebar-border", className)}
			{...props}
		/>
	)
}

// SIDEBAR_CONTENT

export type SidebarContentProps = WithClassValue<ComponentProps<"div">>

export function SidebarContent({ className, ...props }: SidebarContentProps) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	)
}
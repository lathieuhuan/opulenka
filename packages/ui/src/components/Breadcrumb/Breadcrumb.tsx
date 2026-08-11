import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import type { ComponentProps } from "react"

import type { RenderComponentProps, WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export type BreadcrumbProps = ComponentProps<"nav">

export function Breadcrumb(props: ComponentProps<"nav">) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

export type BreadcrumbListProps = WithClassValue<ComponentProps<"ol">>

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"flex flex-wrap items-center gap-1.5 text-xs/relaxed wrap-break-word text-muted-foreground",
				className,
			)}
			{...props}
		/>
	)
}

export type BreadcrumbItemProps = WithClassValue<ComponentProps<"li">>

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	)
}

export type BreadcrumbLinkProps = WithClassValue<RenderComponentProps<"a">>

export function BreadcrumbLink({
	className,
	render,
	...props
}: BreadcrumbLinkProps) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps<"a">(
			{
				className: cn("transition-colors hover:text-foreground", className),
			},
			props,
		),
		render,
		state: {
			slot: "breadcrumb-link",
		},
	})
}

export type BreadcrumbPageProps = WithClassValue<ComponentProps<"span">>

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	)
}

export type BreadcrumbSeparatorProps = WithClassValue<ComponentProps<"li">>

export function BreadcrumbSeparator({
	children,
	className,
	...props
}: BreadcrumbSeparatorProps) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("[&>svg]:size-3.5", className)}
			{...props}
		>
			{children ?? <ChevronRightIcon />}
		</li>
	)
}

export type BreadcrumbEllipsisProps = WithClassValue<ComponentProps<"span">>

export function BreadcrumbEllipsis({
	className,
	...props
}: BreadcrumbEllipsisProps) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn(
				"flex size-4 items-center justify-center [&>svg]:size-3.5",
				className,
			)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="sr-only">More</span>
		</span>
	)
}
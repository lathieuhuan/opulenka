import type { ComponentProps } from "react"
import type { WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export type SkeletonProps = WithClassValue<ComponentProps<"div">>

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-md bg-muted", className)}
			{...props}
		/>
	)
}
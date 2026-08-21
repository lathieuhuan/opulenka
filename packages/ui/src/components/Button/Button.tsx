import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"

import type { WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				"solid/primary":
					"bg-primary text-primary-foreground hover:bg-primary/90",
				"solid/neutral": "bg-neutral text-foreground hover:bg-neutral/90",
				"solid/danger":
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				"outline/neutral":
					"border-neutral text-foreground bg-neutral/40 hover:bg-neutral/60",
				"outline/danger":
					"border-destructive text-destructive bg-destructive/10 hover:bg-destructive/20",
				"ghost/neutral": "text-foreground hover:bg-neutral/40",
				"ghost/danger": "text-destructive hover:bg-destructive/10",
			},
			size: {
				xs: "h-6 gap-0.5 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
				sm: "h-7 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
				md: "h-8 gap-1 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
				lg: "h-9 gap-1 px-3.5 text-base rounded-lg [&_svg:not([class*='size-'])]:size-5",
			},
			iconOnly: {
				true: "p-0",
			},
		},
		compoundVariants: [
			{
				iconOnly: true,
				size: "xs",
				className: "w-6",
			},
			{
				iconOnly: true,
				size: "sm",
				className: "w-7",
			},
			{
				iconOnly: true,
				size: "md",
				className: "w-8",
			},
			{
				iconOnly: true,
				size: "lg",
				className: "w-9",
			},
		],
		defaultVariants: {
			variant: "solid/primary",
			size: "md",
		},
	},
)

export type ButtonProps = WithClassValue<ButtonPrimitive.Props> &
	VariantProps<typeof buttonVariants> & {
		icon?: ReactNode
	}

export function Button({
	className,
	variant = "solid/primary",
	size = "md",
	icon,
	children,
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(
				buttonVariants({
					variant,
					size,
					iconOnly: icon != null && (children === "" || children == null),
					className,
				}),
			)}
			{...props}
		>
			{icon}
			{children}
		</ButtonPrimitive>
	)
}
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"

import type { WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export const inputVariants = cva(
	"w-full min-w-0 py-0.5 rounded-md border border-neutral bg-neutral/20 transition-colors outline-none placeholder:text-muted-foreground dark:bg-neutral/30 " +
		"focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
	// "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground",
	{
		variants: {
			state: {
				default:
					"focus-visible:border-primary/80 focus-visible:ring-primary/30 hover:not-disabled:not-focus-visible:border-primary/60 hover:not-disabled:focus-visible:border-primary",
				invalid:
					"border-destructive/70 focus-visible:border-destructive/85 focus-visible:ring-destructive/30 hover:not-disabled:not-focus-visible:border-destructive/85 hover:not-disabled:focus-visible:border-destructive",
			},
			size: {
				sm: "h-7 px-2.5 text-xs",
				md: "h-8 px-3 text-sm",
				lg: "h-9 px-3.5 text-base rounded-lg",
			},
		},
		defaultVariants: {
			state: "default",
			size: "md",
		},
	},
)

export type InputProps = Omit<
	WithClassValue<ComponentProps<"input">>,
	"size"
> & {
	/** Default 'md' */
	size?: "sm" | "md" | "lg"
}

export function Input({ className, type, size = "md", ...props }: InputProps) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				inputVariants({
					state: props["aria-invalid"] ? "invalid" : "default",
					size,
					className,
				}),
			)}
			{...props}
		/>
	)
}
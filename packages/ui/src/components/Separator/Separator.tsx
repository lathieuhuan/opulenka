import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import type { WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export type SeparatorProps = WithClassValue<SeparatorPrimitive.Props>

export function Separator({
	className,
	orientation = "horizontal",
	...props
}: SeparatorProps) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(
				"shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
				className,
			)}
			{...props}
		/>
	)
}
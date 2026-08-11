import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import type { ComponentProps } from "react"

import { Button } from "@/components/Button"
import type { WithClassValue } from "@/types/ui"
import { cn } from "@/utils/style"

export type SheetProps = SheetPrimitive.Root.Props

export function Sheet(props: SheetProps) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

export type SheetTriggerProps = SheetPrimitive.Trigger.Props

export function SheetTrigger(props: SheetTriggerProps) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

export type SheetCloseProps = SheetPrimitive.Close.Props

export function SheetClose(props: SheetCloseProps) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

export type SheetPortalProps = SheetPrimitive.Portal.Props

export function SheetPortal(props: SheetPortalProps) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

export type SheetOverlayProps = WithClassValue<SheetPrimitive.Backdrop.Props>

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
	return (
		<SheetPrimitive.Backdrop
			data-slot="sheet-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-black/80 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
				className,
			)}
			{...props}
		/>
	)
}

export type SheetContentProps = WithClassValue<SheetPrimitive.Popup.Props> & {
	side?: "top" | "right" | "bottom" | "left"
	showCloseButton?: boolean
}

export function SheetContent({
	className,
	children,
	side = "right",
	showCloseButton = true,
	...props
}: SheetContentProps) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Popup
				data-slot="sheet-content"
				data-side={side}
				className={cn(
					"fixed z-50 flex flex-col bg-popover bg-clip-padding text-xs/relaxed text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<SheetPrimitive.Close
						data-slot="sheet-close"
						render={
							<Button
								variant="ghost"
								className="absolute top-4 right-4"
								size="icon-sm"
							/>
						}
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</SheetPrimitive.Close>
				)}
			</SheetPrimitive.Popup>
		</SheetPortal>
	)
}

export type SheetHeaderProps = WithClassValue<ComponentProps<"div">>

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-6", className)}
			{...props}
		/>
	)
}

export type SheetFooterProps = WithClassValue<ComponentProps<"div">>

export function SheetFooter({ className, ...props }: SheetFooterProps) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-6", className)}
			{...props}
		/>
	)
}

export type SheetTitleProps = WithClassValue<SheetPrimitive.Title.Props>

export function SheetTitle({ className, ...props }: SheetTitleProps) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("text-sm font-medium text-foreground", className)}
			{...props}
		/>
	)
}

export type SheetDescriptionProps =
	WithClassValue<SheetPrimitive.Description.Props>

export function SheetDescription({
	className,
	...props
}: SheetDescriptionProps) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-xs/relaxed text-muted-foreground", className)}
			{...props}
		/>
	)
}
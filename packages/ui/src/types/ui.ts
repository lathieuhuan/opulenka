import type { useRender } from "@base-ui/react"
import type { ClassValue } from "clsx"
import type { ComponentProps, JSX } from "react"

export type WithClassValue<T> = Omit<T, "className"> & {
	className?: ClassValue
}

export type RenderComponentProps<T extends keyof JSX.IntrinsicElements> =
	ComponentProps<T> & useRender.ComponentProps<T>
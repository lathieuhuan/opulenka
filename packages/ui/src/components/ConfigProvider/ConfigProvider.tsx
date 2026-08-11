import type { ReactNode } from "react"

import { TooltipProvider, type TooltipProviderProps } from "../Tooltip"

export type ConfigProviderProps = {
	children: ReactNode
	components?: {
		Tooltip?: Omit<TooltipProviderProps, "children">
	}
}

export function ConfigProvider({
	children,
	components = {},
}: ConfigProviderProps) {
	return <TooltipProvider {...components.Tooltip}>{children}</TooltipProvider>
}
import { Bell, CreditCard, Sparkles, User } from "lucide-react"
import type { ReactNode } from "react"

export type NavItemSpec = {
	label: string
	href: string
	icon: ReactNode
}

// TODO
export const NAV_ITEMS = {
	upgrade: {
		label: "Upgrade to Pro",
		href: "#",
		icon: <Sparkles />,
	},
	profile: {
		label: "Profile",
		href: "/profile",
		icon: <User />,
	},
	billing: {
		label: "Billing",
		href: "#",
		icon: <CreditCard />,
	},
	notifications: {
		label: "Notifications",
		href: "#",
		icon: <Bell />,
	},
} satisfies Record<string, NavItemSpec>
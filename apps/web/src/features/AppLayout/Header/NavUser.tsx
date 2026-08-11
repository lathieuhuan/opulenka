import {
	Avatar,
	AvatarFallback,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@opulenka/ui"
import { Link } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

import { USER_INFO } from "@/mock"
import { NAV_ITEMS, type NavItemSpec } from "./constants"

export function NavUser() {
	const user = USER_INFO
	const name = user.username || user.email

	const handleLogout = () => {
		// TODO
	}

	return (
		<div className="px-4 flex min-w-0 flex-col gap-1 ">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="h-8 w-8 hover:ring-4 ring-accent">
						{/* <AvatarImage src={user.avatar} alt={user.name} /> */}
						<AvatarFallback className="uppercase">{name?.at(0)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
					side="bottom"
					align="end"
					sideOffset={4}
				>
					<DropdownMenuGroup>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8">
									{/* <AvatarImage src={user.avatar} alt={user.name} /> */}
									<AvatarFallback className="uppercase">
										{name?.at(0)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.username}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<NavUserItem item={NAV_ITEMS.upgrade} />
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<NavUserItem item={NAV_ITEMS.profile} />
						<NavUserItem item={NAV_ITEMS.billing} />
						<NavUserItem item={NAV_ITEMS.notifications} />
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<DropdownMenuItem onClick={handleLogout}>
						<LogOut />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

function NavUserItem({ item }: { item: NavItemSpec }) {
	return (
		<Link to={item.href}>
			<DropdownMenuItem>
				{item.icon}
				{item.label}
			</DropdownMenuItem>
		</Link>
	)
}
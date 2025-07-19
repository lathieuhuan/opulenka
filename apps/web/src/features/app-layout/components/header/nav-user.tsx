"use client";

import { Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";

import { Avatar, AvatarFallback } from "@/lib/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/dropdown-menu";
import { UserInfo } from "@/types/global";

type NavUserProps = {
  user: UserInfo;
};

type NavUserItem = {
  label: string;
  href: string;
  icon: ElementType;
};

const NAV_ITEMS = {
  upgrade: {
    label: "Upgrade to Pro",
    href: "#",
    icon: Sparkles,
  },
  profile: {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  billing: {
    label: "Billing",
    href: "#",
    icon: CreditCard,
  },
  notifications: {
    label: "Notifications",
    href: "#",
    icon: Bell,
  },
} satisfies Record<string, NavUserItem>;

export function NavUser({ user }: NavUserProps) {
  const name = user.username || user.email;

  return (
    <div className="px-4 flex min-w-0 flex-col gap-1 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="min-w-32 px-2 py-1 flex items-center gap-2 hover:bg-accent rounded-md">
            <Avatar className="h-8 w-8 rounded-lg">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarFallback className="rounded-lg uppercase">{name?.at(0)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.username}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg uppercase">{name?.at(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
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

          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NavUserItem({ item }: { item: NavUserItem }) {
  return (
    <Link href={item.href}>
      <DropdownMenuItem>
        <item.icon />
        {item.label}
      </DropdownMenuItem>
    </Link>
  );
}

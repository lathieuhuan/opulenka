"use client";

import { ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/functions";
import { NavAppItem } from "./app-sidebar.types";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/lib/components/collapsible";
import { MoneyFlow } from "@/lib/components/icons";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/lib/components/sidebar";

export function NavApp() {
  const pathname = usePathname();

  const NAV_ITEMS: NavAppItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/app",
      icon: LayoutDashboard,
    },
    {
      key: "accounts_transactions",
      label: "Accounts & Transactions",
      icon: MoneyFlow,
      items: [
        {
          key: "accounts",
          label: "Accounts",
          href: "/app/accounts",
        },
        {
          key: "transactions",
          label: "Transactions",
          href: "/app/transactions",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {NAV_ITEMS.map((item) => {
          if ("items" in item) {
            const hasActiveItem = item.items.some((subItem) => subItem.href === pathname);

            return (
              <Collapsible key={item.key} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <MenuButton
                    item={item}
                    className={cn(
                      "data-[state=open]:opacity-80",
                      hasActiveItem &&
                        "data-[state=closed]:opacity-100 data-[state=closed]:bg-sidebar-accent group-data-[state=collapsed]:bg-sidebar-accent",
                    )}
                    isCollapsible
                  />

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.key}>
                          <SidebarMenuSubButton
                            asChild
                            className="opacity-60 hover:opacity-100 data-[active=true]:opacity-100"
                            isActive={subItem.href === pathname}
                          >
                            <Link href={subItem.href}>
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={item.key}>
              <Link href={item.href}>
                <MenuButton item={item} isActive={item.href === pathname} />
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

type MenuButtonProps = {
  item: NavAppItem;
  className?: string;
  isActive?: boolean;
  isCollapsible?: boolean;
};

function MenuButton({ item, className, isActive, isCollapsible }: MenuButtonProps) {
  const button = (
    <SidebarMenuButton
      tooltip={item.label}
      className={cn("opacity-60 hover:opacity-80 data-[active=true]:opacity-100", className)}
      isActive={isActive}
    >
      {item.icon && <item.icon />}
      <span className="truncate">{item.label}</span>
      {isCollapsible && (
        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
      )}
    </SidebarMenuButton>
  );

  if (isCollapsible) {
    return <CollapsibleTrigger asChild>{button}</CollapsibleTrigger>;
  }

  return button;
}

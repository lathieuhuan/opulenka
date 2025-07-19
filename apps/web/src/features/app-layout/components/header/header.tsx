"use client";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/breadcrumb";
import { Separator } from "@/lib/components/separator";
import { SidebarTrigger } from "@/lib/components/sidebar";
import { UserInfo } from "@/types/global";
import { NavUser } from "./nav-user";

type HeaderProps = {
  user: UserInfo;
};

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  const breadcrumbItems = pathname.split("/").filter((item) => item !== "" && item !== "app");

  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 bg-header border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <BreadcrumbItem key={item}>
                {index === breadcrumbItems.length - 1 ? (
                  <span>{item}</span>
                ) : (
                  <BreadcrumbLink href={`/${item}`}>{item}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <NavUser user={user} />
    </header>
  );
}

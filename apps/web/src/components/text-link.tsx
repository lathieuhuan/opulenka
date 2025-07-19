import { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils/functions";

type TextLinkProps = ComponentProps<typeof Link>;

export function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "text-link font-medium hover:text-link/80 hover:underline underline-offset-2 visited:text-link-visited",
        className,
      )}
      {...props}
    />
  );
}

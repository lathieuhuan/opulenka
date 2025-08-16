import { PackageOpen } from "lucide-react";
import { cn } from "../utils/functions";

interface EmptyProps {
  className?: string;
  message: string;
}

export function Empty({ className, message }: EmptyProps) {
  return (
    <div className={cn("text-center text-muted-foreground py-8", className)}>
      <PackageOpen className="size-10 mx-auto mb-4" />
      <p>{message}</p>
    </div>
  );
}

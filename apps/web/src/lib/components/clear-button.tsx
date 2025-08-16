import { CircleX } from "lucide-react";
import { cn } from "../utils/functions";

type ClearButtonProps = {
  className?: string;
  onClick?: () => void;
};

export function ClearButton({ className, onClick }: ClearButtonProps) {
  return (
    <span className={cn("absolute right-2 top-1/2 -translate-y-1/2", className)}>
      <span
        className="size-6 rounded-full text-muted-foreground hover:text-destructive flex items-center justify-center"
        onClick={onClick}
      >
        <CircleX size={20} />
      </span>
    </span>
  );
}

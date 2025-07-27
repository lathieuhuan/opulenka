import { LoaderCircle } from "lucide-react";
import { cn } from "../utils/functions";

type LoaderSize = "small" | "medium" | "large";

const loaderClassBySize: Record<LoaderSize, string> = {
  small: "size-12 [&>svg]:size-5",
  medium: "size-16 [&>svg]:size-7",
  large: "size-20 [&>svg]:size-9",
};

export type LoadingOverlayProps = {
  isLoading?: boolean;
  className?: string;
  loaderClass?: string;
  loaderSize?: LoaderSize;
};

export function LoadingOverlay({
  isLoading,
  className,
  loaderClass,
  loaderSize = "medium",
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 bg-black/20 items-center justify-center hidden",
        isLoading && "flex",
        className,
      )}
    >
      <div
        className={cn(
          "bg-black/80 flex items-center justify-center rounded-md",
          loaderClassBySize[loaderSize],
          loaderClass,
        )}
      >
        <LoaderCircle className="text-white animate-spin" />
      </div>
    </div>
  );
}

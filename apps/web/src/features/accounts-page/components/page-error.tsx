import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/lib/components/button";
import { cn } from "@/lib/utils/functions";

type PageErrorProps = {
  isRetrying?: boolean;
  handleRetry: () => void;
};

export function PageError({ handleRetry, isRetrying }: PageErrorProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col space-y-1.5 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Failed to Load Accounts
        </h3>
        <p className="text-sm text-muted-foreground">
          We encountered an error while trying to fetch your accounts. Please try again.
        </p>
      </div>
      <div className="p-6 pt-0 text-center">
        <Button onClick={handleRetry} disabled={isRetrying}>
          <RefreshCw className={cn("size-5", isRetrying && "animate-spin")} />
          Try Again
        </Button>
      </div>
    </div>
  );
}

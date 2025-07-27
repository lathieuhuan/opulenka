import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useAccountFormCleanUp(isSuccess: boolean, queryKey: (string | number)[]) {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey });
        }, 300);
      }
    };
  }, [isSuccess]);
}

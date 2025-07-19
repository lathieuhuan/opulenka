"use client";

import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={queryClient}>{children}</Provider>;
}

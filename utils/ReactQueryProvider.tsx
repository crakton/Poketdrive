"use client";

import React, { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}

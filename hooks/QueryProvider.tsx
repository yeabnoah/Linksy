"use client";

import { queryClient } from "@/util/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const QueryProviderComponent = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default QueryProviderComponent;

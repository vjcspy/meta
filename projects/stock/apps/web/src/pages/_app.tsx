import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@/styles/globals.css";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardCommands } from "@/components/layout/dashboard-commands";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { JMetaError } from "@/modules/shared/lib/jmeta/client";

function getErrorMessage(error: unknown): string {
  if (error instanceof JMetaError) {
    return error.status ? `API error ${error.status}: ${error.message}` : error.message;
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            // Skip consumer-only cache keys (they never actually fetch)
            if ((query.options as { enabled?: boolean }).enabled === false) return;
            toast.error(getErrorMessage(error));
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Component {...pageProps} />
        <DashboardCommands />
        <Toaster position="bottom-right" richColors closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

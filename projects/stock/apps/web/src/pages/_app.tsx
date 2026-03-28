import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

import { DashboardCommands } from "@/components/layout/dashboard-commands";
import { ThemeProvider } from "@/components/layout/theme-provider";

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
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Component {...pageProps} />
        <DashboardCommands />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

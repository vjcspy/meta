import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { FloatingDashboardActions } from "@/components/floating-dashboard-actions";
import { ThemeProvider } from "@/components/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
      <FloatingDashboardActions />
    </ThemeProvider>
  );
}

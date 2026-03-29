"use client";

import { Tag } from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

import { type ConfigSection, ConfigSidebar } from "./components/ConfigSidebar";

// --- Lazy-loaded sections ---

const StockCategoryConfig = dynamic(() => import("./components/stock-category/StockCategoryConfig"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-12">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  ),
});

// --- Section Registry ---

const CONFIG_SECTIONS: ConfigSection[] = [
  {
    key: "stock-category",
    label: "Stock Category",
    icon: Tag,
    description: "Manage category memberships",
  },
];

// --- Section Renderers ---

const SECTION_RENDERERS: Record<string, () => React.ReactNode> = {
  "stock-category": () => <StockCategoryConfig />,
};

// --- Page Component ---

export default function ConfigurationPage() {
  const [activeSection, setActiveSection] = useState("stock-category");

  const renderContent = SECTION_RENDERERS[activeSection];

  return (
    <>
      <Head>
        <title>Configuration — Stock Dashboard</title>
        <meta name="description" content="Configure stock categories, preferences, and dashboard settings" />
      </Head>

      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <ConfigSidebar sections={CONFIG_SECTIONS} activeKey={activeSection} onSelect={setActiveSection} />

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          {renderContent ? (
            renderContent()
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">Select a section from the sidebar</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

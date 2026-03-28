import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/modules/shared/lib/utils";

// --- Types ---

export type ConfigSection = {
  key: string;
  label: string;
  icon: LucideIcon;
  description?: string;
};

type ConfigSidebarProps = {
  sections: ConfigSection[];
  activeKey: string;
  onSelect: (key: string) => void;
};

// --- Component ---

export function ConfigSidebar({ sections, activeKey, onSelect }: ConfigSidebarProps) {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Header */}
      <div className="border-b border-border px-5 py-5">
        <h1 className="text-sm font-semibold tracking-wide text-foreground">Configuration</h1>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Manage your settings</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = section.key === activeKey;

          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onSelect(section.key)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150",
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground group-hover:bg-muted",
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-medium leading-tight">{section.label}</span>
                {section.description && (
                  <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{section.description}</span>
                )}
              </div>
              {isActive && <div className="size-1.5 shrink-0 rounded-full bg-primary" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </aside>
  );
}

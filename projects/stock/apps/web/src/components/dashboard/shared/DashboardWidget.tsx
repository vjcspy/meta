"use client";

import { GripVertical, X } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboard-store";

export type DashboardWidgetProps = {
  /** Unique widget ID — must match the key in visibleWidgets and layout */
  widgetId: string;
  /** Header title */
  title: string;
  /** Allow user to close (hide) this widget. Default: true */
  canClose?: boolean;
  /** Allow user to drag/move this widget. Default: true */
  canMove?: boolean;
  /** Allow user to resize this widget. Default: true */
  canResize?: boolean;
  /** Optional action element rendered in the header (e.g. dropdown menus) */
  headerAction?: ReactNode;
  /** Widget body */
  children: ReactNode;
  /** Optional extra className on the Card */
  className?: string;
};

/**
 * Standard dashboard widget wrapper.
 *
 * Provides a consistent Card shell with:
 * - Drag handle (when canMove=true) via `.rgl-drag-handle`
 * - Close/hide button (when canClose=true) via store.toggleWidget
 * - `data-can-resize` attribute consumed by the parent layout
 *
 * Widgets pass their content as `children` — no need to repeat
 * Card/CardHeader/CardTitle boilerplate.
 */
export default function DashboardWidget({
  widgetId,
  title,
  canClose = true,
  canMove = true,
  canResize = true,
  headerAction,
  children,
  className,
}: DashboardWidgetProps) {
  const toggleWidget = useDashboardStore((s) => s.toggleWidget);

  return (
    <Card
      className={`flex h-full w-full flex-col gap-0 overflow-hidden py-0 ${className ?? ""}`}
      data-widget-id={widgetId}
      data-can-resize={canResize}
    >
      <CardHeader className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b px-4 py-3">
        {/* Drag handle */}
        {canMove ? (
          <GripVertical
            className="rgl-drag-handle h-4 w-4 shrink-0 cursor-move text-muted-foreground"
            aria-label="Drag to move"
          />
        ) : (
          <span className="w-4" />
        )}

        <CardTitle
          className={`select-none truncate text-base ${canMove ? "rgl-drag-handle cursor-move" : ""}`}
        >
          {title}
        </CardTitle>

        {/* Header action slot + close button */}
        <div className="no-drag flex items-center gap-1">
          {headerAction}
          {canClose && (
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => toggleWidget(widgetId)}
              aria-label={`Close ${title}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-0">{children}</CardContent>
    </Card>
  );
}

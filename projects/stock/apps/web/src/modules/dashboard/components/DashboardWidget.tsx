"use client";

import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { GripVertical, X } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withWidgetVisibility } from "@/modules/dashboard/hoc/withWidgetVisibility";

export type DashboardWidgetProps = {
  widgetId: string;
  title: string;
  canClose?: boolean;
  canMove?: boolean;
  canResize?: boolean;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
};

type InjectedProps = CombinedProps<[typeof withWidgetVisibility]>;

function DashboardWidgetRender({
  widgetId,
  title,
  canClose = true,
  canMove = true,
  canResize = true,
  headerAction,
  children,
  className,
  actions,
}: DashboardWidgetProps & InjectedProps) {
  return (
    <Card
      className={`flex h-full w-full flex-col gap-0 overflow-hidden py-0 ${className ?? ""}`}
      data-widget-id={widgetId}
      data-can-resize={canResize}
    >
      <CardHeader className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b px-4 py-3">
        {canMove ? (
          <GripVertical
            className="rgl-drag-handle h-4 w-4 shrink-0 cursor-move text-muted-foreground"
            aria-label="Drag to move"
          />
        ) : (
          <span className="w-4" />
        )}

        <CardTitle className={`select-none truncate text-base ${canMove ? "rgl-drag-handle cursor-move" : ""}`}>
          {title}
        </CardTitle>

        <div className="no-drag flex items-center gap-1">
          {headerAction}
          {canClose && (
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => actions.toggleWidget(widgetId)}
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

export default combineHOC(withWidgetVisibility)<DashboardWidgetProps>(DashboardWidgetRender);

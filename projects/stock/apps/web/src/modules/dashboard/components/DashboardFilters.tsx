"use client";

import { type CombinedProps, combineHOC } from "@web/ui-extension";
import React from "react";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { withMarketCategories } from "@/modules/dashboard/hoc/withMarketCategories";
import { withMarketRangeOrchestrator } from "@/modules/dashboard/hoc/withMarketRangeOrchestrator";
import { withWidgetVisibility } from "@/modules/dashboard/hoc/withWidgetVisibility";
import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import { WIDGET_REGISTRY } from "@/modules/dashboard/values/widget-registry";
import MarketCategoryDialog from "@/modules/shared/components/MarketCategoryDialog";
import SymbolAutocomplete from "@/modules/shared/components/SymbolAutocomplete";
import { withDateRange } from "@/modules/shared/hoc/withDateRange";
import { withSymbol } from "@/modules/shared/hoc/withSymbol";
import { withTradeValueFilter } from "@/modules/shared/hoc/withTradeValueFilter";

import DashboardWidget from "./DashboardWidget";

function parseDate(dateStr: string): Date | undefined {
  const d = new Date(dateStr + "T00:00:00");
  return isNaN(d.getTime()) ? undefined : d;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type InjectedProps = CombinedProps<
  [
    typeof withSymbol,
    typeof withDateRange,
    typeof withTradeValueFilter,
    typeof withWidgetVisibility,
    typeof withMarketCategories,
    typeof withMarketRangeOrchestrator,
  ]
>;

/**
 * Container component — hosts the market-range orchestrator (singleton mount point).
 */
function DashboardFiltersRender({ state, actions }: InjectedProps) {
  const {
    symbol,
    fromDate,
    toDate,
    isDateRangeValid,
    tradeValueFilter,
    visibleWidgets,
    categories,
  } = state;
  const selectedCategoryKey = useDashboardModuleStore(
    (s) => s.selectedCategoryKey,
  );
  const setSelectedCategoryKey = useDashboardModuleStore(
    (s) => s.setSelectedCategoryKey,
  );

  const rangeWarning = !isDateRangeValid
    ? fromDate > toDate
      ? "From date must be before To date"
      : "Date range must be ≤ 90 days"
    : null;

  const widgetToggleMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          Widgets
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Toggle Widgets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WIDGET_REGISTRY.map((w) => (
          <DropdownMenuCheckboxItem
            key={w.id}
            checked={visibleWidgets[w.id] !== false}
            onCheckedChange={() => actions.toggleWidget(w.id)}
          >
            {w.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DashboardWidget
      widgetId="w-filters"
      title="Dashboard Filters"
      canClose={false}
      canMove={false}
      canResize={false}
      headerAction={widgetToggleMenu}
    >
      <div className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Symbol</span>
          <SymbolAutocomplete value={symbol} onCommit={actions.setSymbol} />
        </div>

        <DatePicker
          label="From"
          date={parseDate(fromDate)}
          onChange={(d) => d && actions.setFromDate(formatDate(d))}
        />

        <DatePicker
          label="To"
          date={parseDate(toDate)}
          onChange={(d) => d && actions.setToDate(formatDate(d))}
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filter (M)</span>
          <input
            aria-label="Trade value filter"
            type="number"
            className="no-drag h-8 w-24 rounded-md border bg-background px-2 text-sm"
            value={tradeValueFilter}
            onChange={(e) =>
              actions.setTradeValueFilter(Number(e.target.value) || 0)
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Category</span>
          <select
            aria-label="Market category"
            className="no-drag h-8 rounded-md border bg-background px-2 text-sm"
            value={selectedCategoryKey ?? ""}
            onChange={(e) => setSelectedCategoryKey(e.target.value || null)}
          >
            <option value="">Select…</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.name}
              </option>
            ))}
          </select>
          <MarketCategoryDialog />
        </div>

        {rangeWarning && (
          <span className="text-xs text-destructive">{rangeWarning}</span>
        )}
      </div>
    </DashboardWidget>
  );
}

export default combineHOC(
  withSymbol,
  withDateRange,
  withTradeValueFilter,
  withWidgetVisibility,
  withMarketCategories,
  withMarketRangeOrchestrator,
)(DashboardFiltersRender);

"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { CircleHelp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import DatePicker from "@/components/ui/date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardWidget from "@/modules/dashboard/components/DashboardWidget";
import { withMarketTickRangeResults } from "@/modules/dashboard/hoc/withMarketTickRangeResults";
import { withSelectedDate } from "@/modules/dashboard/hoc/withSelectedDate";
import type { MarketTickChartData } from "@/modules/dashboard/utils/types";

type RowData = {
  symbol: string;
  data: MarketTickChartData | null;
};

function fmtInt(v: number): string {
  return v.toLocaleString("en-US");
}

function fmtPct(v: number): string {
  return `${(v * 100).toFixed(0)}%`;
}

function diffClass(v: number): string {
  if (v > 0) return "text-green-500";
  if (v < 0) return "text-red-500";
  return "";
}

function SortHeader({
  label,
  tooltip,
  isSorted,
}: {
  label: string;
  tooltip: string;
  isSorted: false | "asc" | "desc";
}) {
  return (
    <span title={tooltip} className="flex cursor-pointer select-none items-center gap-0.5 whitespace-nowrap">
      {label}
      {isSorted === "asc" && " ↑"}
      {isSorted === "desc" && " ↓"}
      {!isSorted && <span className="text-muted-foreground/40"> ↕</span>}
    </span>
  );
}

type SortableHeaderProps = {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void };
};

function buildColumns(): ColumnDef<RowData>[] {
  const sortableHeader =
    (label: string, tooltip: string) =>
    // eslint-disable-next-line react/display-name
    ({ column }: SortableHeaderProps) => (
      <button type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        <SortHeader label={label} tooltip={tooltip} isSorted={column.getIsSorted()} />
      </button>
    );

  /** Helper to create a numeric column with nested data accessor */
  const numCol = (
    id: string,
    label: string,
    tooltip: string,
    field: keyof MarketTickChartData,
    opts?: { size?: number; colored?: boolean; formatter?: (v: number) => string },
  ): ColumnDef<RowData> => {
    const { size = 70, colored = false, formatter = fmtInt } = opts ?? {};
    return {
      id,
      accessorFn: (row) => row.data?.[field] ?? 0,
      header: sortableHeader(label, tooltip),
      cell: ({ row }) => {
        const v = (row.original.data?.[field] as number) ?? 0;
        return colored ? <span className={diffClass(v)}>{formatter(v)}</span> : formatter(v);
      },
      size,
    };
  };

  return [
    {
      accessorKey: "symbol",
      header: sortableHeader("Symbol", "Mã chứng khoán"),
      cell: ({ row }) => <span className="font-medium">{row.original.symbol}</span>,
      size: 80,
    },
    numCol("sheep-buy", "S.Buy", "Sheep Buy — Khối lượng mua của NĐT cá nhân", "bSheep"),
    numCol("sheep-sell", "S.Sell", "Sheep Sell — Khối lượng bán của NĐT cá nhân", "sSheep"),
    numCol("sheep-diff", "S.Diff", "Sheep Diff — Chênh lệch mua - bán của NĐT cá nhân", "diff_sheep", {
      colored: true,
    }),
    numCol("sheep-pct", "S.%B/S", "Sheep %Buy/Sell — Tỷ lệ mua/bán của NĐT cá nhân", "pct_buy_sell_sheep", {
      size: 65,
      formatter: fmtPct,
    }),
    numCol("shark-buy", "K.Buy", "Shark Buy — Khối lượng mua của tổ chức/cá mập", "bShark"),
    numCol("shark-sell", "K.Sell", "Shark Sell — Khối lượng bán của tổ chức/cá mập", "sShark"),
    numCol("shark-diff", "K.Diff", "Shark Diff — Chênh lệch mua - bán của tổ chức/cá mập", "diff_shark", {
      colored: true,
    }),
    numCol("shark-pct", "K.%B/S", "Shark %Buy/Sell — Tỷ lệ mua/bán của tổ chức/cá mập", "pct_buy_sell_shark", {
      size: 65,
      formatter: fmtPct,
    }),
    numCol("cross-buy", "% B.S/K", "% Buy Sheep/Shark — Tỷ lệ mua cá nhân so với tổ chức", "pct_buy_sheep_shark", {
      size: 65,
      formatter: fmtPct,
    }),
    numCol("cross-sell", "% S.S/K", "% Sell Sheep/Shark — Tỷ lệ bán cá nhân so với tổ chức", "pct_sell_sheep_shark", {
      size: 65,
      formatter: fmtPct,
    }),
    numCol("sheep-sum-buy", "Σ S.Buy", "Sum Sheep Buy — Tổng lũy kế mua của NĐT cá nhân", "sBSheep"),
    numCol("sheep-sum-sell", "Σ S.Sell", "Sum Sheep Sell — Tổng lũy kế bán của NĐT cá nhân", "sSSheep"),
    numCol(
      "sheep-sum-diff",
      "Σ S.Diff",
      "Sum Sheep Diff — Chênh lệch lũy kế mua - bán của NĐT cá nhân",
      "diff_sum_sheep",
      { colored: true },
    ),
    numCol("sheep-sum-pct", "Σ S.%", "Sum Sheep % — Tỷ lệ lũy kế mua/bán của NĐT cá nhân", "pct_sum_buy_sell_sheep", {
      size: 65,
      formatter: fmtPct,
    }),
    numCol("shark-sum-buy", "Σ K.Buy", "Sum Shark Buy — Tổng lũy kế mua của tổ chức/cá mập", "sBShark"),
    numCol("shark-sum-sell", "Σ K.Sell", "Sum Shark Sell — Tổng lũy kế bán của tổ chức/cá mập", "sSShark"),
    numCol(
      "shark-sum-diff",
      "Σ K.Diff",
      "Sum Shark Diff — Chênh lệch lũy kế mua - bán của tổ chức/cá mập",
      "diff_sum_shark",
      { colored: true },
    ),
    numCol(
      "shark-sum-pct",
      "Σ K.%",
      "Sum Shark % — Tỷ lệ lũy kế mua/bán của tổ chức/cá mập",
      "pct_sum_buy_sell_shark",
      { size: 65, formatter: fmtPct },
    ),
    numCol(
      "cross-sum-buy",
      "Σ% B.S/K",
      "Sum % Buy Sheep/Shark — Tỷ lệ lũy kế mua cá nhân so với tổ chức",
      "pct_sum_buy_sheep_shark",
      { size: 65, formatter: fmtPct },
    ),
    numCol(
      "cross-sum-sell",
      "Σ% S.S/K",
      "Sum % Sell Sheep/Shark — Tỷ lệ lũy kế bán cá nhân so với tổ chức",
      "pct_sum_sell_sheep_shark",
      { size: 65, formatter: fmtPct },
    ),
  ];
}

type InjectedProps = CombinedProps<[typeof withMarketTickRangeResults, typeof withSelectedDate]>;

function MarketRangeTableRender({ state, actions }: InjectedProps) {
  const { symbolResults, isLoading, error, selectedDate, selectedDateStr } = state;
  const availableDates = useMemo(() => {
    if (!symbolResults.length) return new Set<string>();
    return new Set(symbolResults[0].data.map((d) => d.date));
  }, [symbolResults]);

  const effectiveDate = useMemo(() => {
    if (selectedDateStr && availableDates.has(selectedDateStr)) return selectedDateStr;
    const dates = symbolResults[0]?.data;
    return dates?.[dates.length - 1]?.date;
  }, [symbolResults, selectedDateStr, availableDates]);

  useEffect(() => {
    // Clear stale selection when date range changes and selected date is no longer available
    if (selectedDateStr && !availableDates.has(selectedDateStr)) {
      actions.clearSelectedDate();
      return;
    }
    // Auto-select effectiveDate when no date is selected yet
    if (!selectedDateStr && effectiveDate) {
      actions.setSelectedDate(new Date(effectiveDate));
    }
  }, [selectedDateStr, effectiveDate, availableDates, actions]);

  const rows: RowData[] = useMemo(() => {
    if (!symbolResults.length) return [];

    return symbolResults.map((sr) => ({
      symbol: sr.symbol,
      data: sr.data.find((d) => d.date === effectiveDate) ?? null,
    }));
  }, [symbolResults, effectiveDate]);

  const columns = useMemo(() => buildColumns(), []);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const disabledDays = useCallback(
    (day: Date) => {
      if (!availableDates.size) return false;
      return !availableDates.has(day.toISOString().slice(0, 10));
    },
    [availableDates],
  );

  const headerAction = (
    <DatePicker label="Date" date={selectedDate} onChange={(d) => actions.setSelectedDate(d)} disabled={disabledDays} />
  );

  const titleSuffix = (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Table info"
        >
          <CircleHelp className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="max-w-xs space-y-2 text-sm">
        <p className="font-medium">Hướng dẫn đọc bảng</p>
        <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
          <li>
            Các cột có dấu <span className="font-semibold text-foreground">Σ</span> (Accumulative) thể hiện dữ liệu tích
            lũy từ ngày <strong>start → end</strong> của Dashboard filter.
          </li>
          <li>
            Các cột bình thường (không có Σ) thể hiện kết quả của <strong>ngày được chọn</strong> ở Date picker.
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );

  return (
    <DashboardWidget
      widgetId="w-market-range-table"
      title="Market Tick Range Table"
      titleSuffix={titleSuffix}
      headerAction={headerAction}
    >
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="ml-2 text-sm text-muted-foreground">Loading…</span>
        </div>
      )}

      {error && <div className="p-4 text-sm text-destructive">Error: {error}</div>}

      {!isLoading && !error && rows.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">Select a category to view market range data</div>
      )}

      {!isLoading && !error && rows.length > 0 && (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      className="whitespace-nowrap px-2 py-1 text-xs"
                      style={{ width: h.getSize() }}
                    >
                      {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap px-2 py-1 text-xs">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardWidget>
  );
}

export default combineHOC(withMarketTickRangeResults, withSelectedDate)(MarketRangeTableRender);

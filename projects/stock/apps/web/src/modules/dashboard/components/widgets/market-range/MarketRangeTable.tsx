"use client";

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { CircleHelp } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";

import DatePicker from "@/components/ui/date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardWidget from "@/modules/dashboard/components/DashboardWidget";
import { withMarketRangeResults } from "@/modules/dashboard/hoc/withMarketRangeResults";
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

function headerWithTooltip(label: string, tooltip: string) {
  // eslint-disable-next-line react/display-name
  return () => (
    <span
      title={tooltip}
      className="cursor-help underline decoration-dotted decoration-muted-foreground/50 underline-offset-4"
    >
      {label}
    </span>
  );
}

function buildColumns(): ColumnDef<RowData>[] {
  return [
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({ row }) => <span className="font-medium">{row.original.symbol}</span>,
      size: 80,
    },
    {
      id: "sheep-buy",
      header: headerWithTooltip("S.Buy", "Sheep Buy — Khối lượng mua của NĐT cá nhân"),
      cell: ({ row }) => fmtInt(row.original.data?.bSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-sell",
      header: headerWithTooltip("S.Sell", "Sheep Sell — Khối lượng bán của NĐT cá nhân"),
      cell: ({ row }) => fmtInt(row.original.data?.sSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-diff",
      header: headerWithTooltip("S.Diff", "Sheep Diff — Chênh lệch mua - bán của NĐT cá nhân"),
      cell: ({ row }) => {
        const v = row.original.data?.diff_sheep ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "sheep-pct",
      header: headerWithTooltip("S.%B/S", "Sheep %Buy/Sell — Tỷ lệ mua/bán của NĐT cá nhân"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_buy_sell_sheep ?? 0),
      size: 65,
    },
    {
      id: "shark-buy",
      header: headerWithTooltip("K.Buy", "Shark Buy — Khối lượng mua của tổ chức/cá mập"),
      cell: ({ row }) => fmtInt(row.original.data?.bShark ?? 0),
      size: 70,
    },
    {
      id: "shark-sell",
      header: headerWithTooltip("K.Sell", "Shark Sell — Khối lượng bán của tổ chức/cá mập"),
      cell: ({ row }) => fmtInt(row.original.data?.sShark ?? 0),
      size: 70,
    },
    {
      id: "shark-diff",
      header: headerWithTooltip("K.Diff", "Shark Diff — Chênh lệch mua - bán của tổ chức/cá mập"),
      cell: ({ row }) => {
        const v = row.original.data?.diff_shark ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "shark-pct",
      header: headerWithTooltip("K.%B/S", "Shark %Buy/Sell — Tỷ lệ mua/bán của tổ chức/cá mập"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_buy_sell_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-buy",
      header: headerWithTooltip("% B.S/K", "% Buy Sheep/Shark — Tỷ lệ mua cá nhân so với tổ chức"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_buy_sheep_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-sell",
      header: headerWithTooltip("% S.S/K", "% Sell Sheep/Shark — Tỷ lệ bán cá nhân so với tổ chức"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_sell_sheep_shark ?? 0),
      size: 65,
    },
    {
      id: "sheep-sum-buy",
      header: headerWithTooltip("Σ S.Buy", "Sum Sheep Buy — Tổng lũy kế mua của NĐT cá nhân"),
      cell: ({ row }) => fmtInt(row.original.data?.sBSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-sum-sell",
      header: headerWithTooltip("Σ S.Sell", "Sum Sheep Sell — Tổng lũy kế bán của NĐT cá nhân"),
      cell: ({ row }) => fmtInt(row.original.data?.sSSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-sum-diff",
      header: headerWithTooltip("Σ S.Diff", "Sum Sheep Diff — Chênh lệch lũy kế mua - bán của NĐT cá nhân"),
      cell: ({ row }) => {
        const v = row.original.data?.diff_sum_sheep ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "sheep-sum-pct",
      header: headerWithTooltip("Σ S.%", "Sum Sheep % — Tỷ lệ lũy kế mua/bán của NĐT cá nhân"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_sum_buy_sell_sheep ?? 0),
      size: 65,
    },
    {
      id: "shark-sum-buy",
      header: headerWithTooltip("Σ K.Buy", "Sum Shark Buy — Tổng lũy kế mua của tổ chức/cá mập"),
      cell: ({ row }) => fmtInt(row.original.data?.sBShark ?? 0),
      size: 70,
    },
    {
      id: "shark-sum-sell",
      header: headerWithTooltip("Σ K.Sell", "Sum Shark Sell — Tổng lũy kế bán của tổ chức/cá mập"),
      cell: ({ row }) => fmtInt(row.original.data?.sSShark ?? 0),
      size: 70,
    },
    {
      id: "shark-sum-diff",
      header: headerWithTooltip("Σ K.Diff", "Sum Shark Diff — Chênh lệch lũy kế mua - bán của tổ chức/cá mập"),
      cell: ({ row }) => {
        const v = row.original.data?.diff_sum_shark ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "shark-sum-pct",
      header: headerWithTooltip("Σ K.%", "Sum Shark % — Tỷ lệ lũy kế mua/bán của tổ chức/cá mập"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_sum_buy_sell_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-sum-buy",
      header: headerWithTooltip("Σ% B.S/K", "Sum % Buy Sheep/Shark — Tỷ lệ lũy kế mua cá nhân so với tổ chức"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_sum_buy_sheep_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-sum-sell",
      header: headerWithTooltip("Σ% S.S/K", "Sum % Sell Sheep/Shark — Tỷ lệ lũy kế bán cá nhân so với tổ chức"),
      cell: ({ row }) => fmtPct(row.original.data?.pct_sum_sell_sheep_shark ?? 0),
      size: 65,
    },
  ];
}

type InjectedProps = CombinedProps<[typeof withMarketRangeResults, typeof withSelectedDate]>;

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

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      title="Market Range Table"
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

export default combineHOC(withMarketRangeResults, withSelectedDate)(MarketRangeTableRender);

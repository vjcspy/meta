"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { useMemo } from "react";

import DatePicker from "@/components/ui/date-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

function buildColumns(): ColumnDef<RowData>[] {
  return [
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.symbol}</span>
      ),
      size: 80,
    },
    {
      id: "sheep-buy",
      header: "S.Buy",
      cell: ({ row }) => fmtInt(row.original.data?.bSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-sell",
      header: "S.Sell",
      cell: ({ row }) => fmtInt(row.original.data?.sSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-diff",
      header: "S.Diff",
      cell: ({ row }) => {
        const v = row.original.data?.diff_sheep ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "sheep-pct",
      header: "S.%B/S",
      cell: ({ row }) => fmtPct(row.original.data?.pct_buy_sell_sheep ?? 0),
      size: 65,
    },
    {
      id: "shark-buy",
      header: "K.Buy",
      cell: ({ row }) => fmtInt(row.original.data?.bShark ?? 0),
      size: 70,
    },
    {
      id: "shark-sell",
      header: "K.Sell",
      cell: ({ row }) => fmtInt(row.original.data?.sShark ?? 0),
      size: 70,
    },
    {
      id: "shark-diff",
      header: "K.Diff",
      cell: ({ row }) => {
        const v = row.original.data?.diff_shark ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "shark-pct",
      header: "K.%B/S",
      cell: ({ row }) => fmtPct(row.original.data?.pct_buy_sell_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-buy",
      header: "% B.S/K",
      cell: ({ row }) => fmtPct(row.original.data?.pct_buy_sheep_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-sell",
      header: "% S.S/K",
      cell: ({ row }) => fmtPct(row.original.data?.pct_sell_sheep_shark ?? 0),
      size: 65,
    },
    {
      id: "sheep-sum-buy",
      header: "Σ S.Buy",
      cell: ({ row }) => fmtInt(row.original.data?.sBSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-sum-sell",
      header: "Σ S.Sell",
      cell: ({ row }) => fmtInt(row.original.data?.sSSheep ?? 0),
      size: 70,
    },
    {
      id: "sheep-sum-diff",
      header: "Σ S.Diff",
      cell: ({ row }) => {
        const v = row.original.data?.diff_sum_sheep ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "sheep-sum-pct",
      header: "Σ S.%",
      cell: ({ row }) => fmtPct(row.original.data?.pct_sum_buy_sell_sheep ?? 0),
      size: 65,
    },
    {
      id: "shark-sum-buy",
      header: "Σ K.Buy",
      cell: ({ row }) => fmtInt(row.original.data?.sBShark ?? 0),
      size: 70,
    },
    {
      id: "shark-sum-sell",
      header: "Σ K.Sell",
      cell: ({ row }) => fmtInt(row.original.data?.sSShark ?? 0),
      size: 70,
    },
    {
      id: "shark-sum-diff",
      header: "Σ K.Diff",
      cell: ({ row }) => {
        const v = row.original.data?.diff_sum_shark ?? 0;
        return <span className={diffClass(v)}>{fmtInt(v)}</span>;
      },
      size: 70,
    },
    {
      id: "shark-sum-pct",
      header: "Σ K.%",
      cell: ({ row }) => fmtPct(row.original.data?.pct_sum_buy_sell_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-sum-buy",
      header: "Σ% B.S/K",
      cell: ({ row }) =>
        fmtPct(row.original.data?.pct_sum_buy_sheep_shark ?? 0),
      size: 65,
    },
    {
      id: "cross-sum-sell",
      header: "Σ% S.S/K",
      cell: ({ row }) =>
        fmtPct(row.original.data?.pct_sum_sell_sheep_shark ?? 0),
      size: 65,
    },
  ];
}

type InjectedProps = CombinedProps<
  [typeof withMarketRangeResults, typeof withSelectedDate]
>;

function MarketRangeTableRender({ state, actions }: InjectedProps) {
  const { symbolResults, isLoading, error, selectedDate, selectedDateStr } =
    state;

  const rows: RowData[] = useMemo(() => {
    if (!symbolResults.length) return [];

    const effectiveDate =
      selectedDateStr ??
      symbolResults[0]?.data[symbolResults[0].data.length - 1]?.date;

    return symbolResults.map((sr) => ({
      symbol: sr.symbol,
      data: sr.data.find((d) => d.date === effectiveDate) ?? null,
    }));
  }, [symbolResults, selectedDateStr]);

  const columns = useMemo(() => buildColumns(), []);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerAction = (
    <DatePicker
      label="Date"
      date={selectedDate}
      onChange={(d) => actions.setSelectedDate(d)}
    />
  );

  return (
    <DashboardWidget
      widgetId="w-market-range-table"
      title="Market Range Table"
      headerAction={headerAction}
    >
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="ml-2 text-sm text-muted-foreground">Loading…</span>
        </div>
      )}

      {error && (
        <div className="p-4 text-sm text-destructive">Error: {error}</div>
      )}

      {!isLoading && !error && rows.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">
          Select a category to view market range data
        </div>
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
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap px-2 py-1 text-xs"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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

export default combineHOC(
  withMarketRangeResults,
  withSelectedDate,
)(MarketRangeTableRender);

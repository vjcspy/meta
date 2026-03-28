"use client";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { useMemo, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardWidget from "@/modules/dashboard/components/DashboardWidget";
import { withAnalysisTableResults } from "@/modules/dashboard/hoc/withAnalysisTableResults";
import type { AnalysisRow } from "@/modules/dashboard/utils/analysis-types";

function fmtNum(v: number): string {
  return v.toLocaleString("en-US");
}

function diffClass(v: number): string {
  if (v > 0) return "text-green-500";
  if (v < 0) return "text-red-500";
  return "";
}

function SortHeader({ label, isSorted }: { label: string; isSorted: false | "asc" | "desc" }) {
  return (
    <span className="flex cursor-pointer select-none items-center gap-0.5 whitespace-nowrap">
      {label}
      {isSorted === "asc" && " ↑"}
      {isSorted === "desc" && " ↓"}
      {!isSorted && <span className="text-muted-foreground/40"> ↕</span>}
    </span>
  );
}

function buildColumns(): ColumnDef<AnalysisRow>[] {
  const sortableHeader = (label: string) =>
    ({ column }: { column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void } }) => (
      <button type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        <SortHeader label={label} isSorted={column.getIsSorted()} />
      </button>
    );

  return [
    {
      accessorKey: "symbol",
      header: sortableHeader("Symbol"),
      cell: ({ row }) => <span className="font-medium">{row.original.symbol}</span>,
      size: 72,
    },
    {
      accessorKey: "industryName1",
      header: sortableHeader("Ind.1"),
      cell: ({ row }) => row.original.industryName1,
      size: 100,
    },
    {
      accessorKey: "industryName2",
      header: sortableHeader("Ind.2"),
      cell: ({ row }) => row.original.industryName2,
      size: 100,
    },
    {
      accessorKey: "trade_value_7",
      header: sortableHeader("GTGD 7"),
      cell: ({ row }) => fmtNum(row.original.trade_value_7),
      size: 72,
    },
    {
      accessorKey: "trade_value_15",
      header: sortableHeader("GTGD 15"),
      cell: ({ row }) => fmtNum(row.original.trade_value_15),
      size: 72,
    },
    {
      accessorKey: "trade_value_30",
      header: sortableHeader("GTGD 30"),
      cell: ({ row }) => fmtNum(row.original.trade_value_30),
      size: 72,
    },
    {
      accessorKey: "trade_value_range",
      header: sortableHeader("GTGD Range"),
      cell: ({ row }) => fmtNum(row.original.trade_value_range),
      size: 88,
    },
    {
      accessorKey: "foreign_buy_7",
      header: sortableHeader("F.Buy 7"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_7),
      size: 72,
    },
    {
      accessorKey: "foreign_buy_15",
      header: sortableHeader("F.Buy 15"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_15),
      size: 72,
    },
    {
      accessorKey: "foreign_buy_30",
      header: sortableHeader("F.Buy 30"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_30),
      size: 72,
    },
    {
      accessorKey: "foreign_buy_range",
      header: sortableHeader("F.Buy Range"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_range),
      size: 88,
    },
    {
      accessorKey: "foreign_sell_7",
      header: sortableHeader("F.Sell 7"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_7),
      size: 72,
    },
    {
      accessorKey: "foreign_sell_15",
      header: sortableHeader("F.Sell 15"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_15),
      size: 72,
    },
    {
      accessorKey: "foreign_sell_30",
      header: sortableHeader("F.Sell 30"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_30),
      size: 72,
    },
    {
      accessorKey: "foreign_sell_range",
      header: sortableHeader("F.Sell Range"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_range),
      size: 88,
    },
    {
      accessorKey: "foreign_diff_7",
      header: sortableHeader("F.Diff 7"),
      cell: ({ row }) => <span className={diffClass(row.original.foreign_diff_7)}>{fmtNum(row.original.foreign_diff_7)}</span>,
      size: 72,
    },
    {
      accessorKey: "foreign_diff_15",
      header: sortableHeader("F.Diff 15"),
      cell: ({ row }) => <span className={diffClass(row.original.foreign_diff_15)}>{fmtNum(row.original.foreign_diff_15)}</span>,
      size: 72,
    },
    {
      accessorKey: "foreign_diff_30",
      header: sortableHeader("F.Diff 30"),
      cell: ({ row }) => <span className={diffClass(row.original.foreign_diff_30)}>{fmtNum(row.original.foreign_diff_30)}</span>,
      size: 72,
    },
    {
      accessorKey: "foreign_diff_range",
      header: sortableHeader("F.Diff Range"),
      cell: ({ row }) => <span className={diffClass(row.original.foreign_diff_range)}>{fmtNum(row.original.foreign_diff_range)}</span>,
      size: 88,
    },
  ];
}

type InjectedProps = CombinedProps<[typeof withAnalysisTableResults]>;

function AnalysisSymbolTableRender({ state }: InjectedProps) {
  const { analysisRows, isLoading, error } = state;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [symbolFilter, setSymbolFilter] = useState("");

  const columns = useMemo(() => buildColumns(), []);

  const table = useReactTable({
    data: analysisRows,
    columns,
    state: {
      sorting,
      columnFilters: symbolFilter ? [{ id: "symbol", value: symbolFilter }] : [],
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {},
  });

  const headerAction = (
    <input
      aria-label="Filter by symbol"
      type="text"
      placeholder="Symbol…"
      className="no-drag h-7 w-28 rounded-md border bg-background px-2 text-xs"
      value={symbolFilter}
      onChange={(e) => setSymbolFilter(e.target.value.toUpperCase())}
    />
  );

  return (
    <DashboardWidget widgetId="w-analysis-table" title="Analysis Symbol Table" headerAction={headerAction}>
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="ml-2 text-sm text-muted-foreground">Loading…</span>
        </div>
      )}

      {error && <div className="p-4 text-sm text-destructive">Error: {error}</div>}

      {!isLoading && !error && analysisRows.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">Select a category to view analysis data</div>
      )}

      {!isLoading && !error && analysisRows.length > 0 && (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h, idx) => (
                    <TableHead
                      key={h.id}
                      className={`whitespace-nowrap px-2 py-1 text-xs ${idx === 0 ? "sticky left-0 z-10 bg-background" : ""}`}
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
                  {row.getVisibleCells().map((cell, idx) => (
                    <TableCell
                      key={cell.id}
                      className={`whitespace-nowrap px-2 py-1 text-xs ${idx === 0 ? "sticky left-0 z-10 bg-background" : ""}`}
                    >
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

export default combineHOC(withAnalysisTableResults)(AnalysisSymbolTableRender);

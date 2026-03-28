"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { useMemo, useRef, useState } from "react";

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

function buildColumns(): ColumnDef<AnalysisRow>[] {
  const sortableHeader =
    (label: string, tooltip: string) =>
    // eslint-disable-next-line react/display-name
    ({
      column,
    }: {
      column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void };
    }) => (
      <button type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        <SortHeader label={label} tooltip={tooltip} isSorted={column.getIsSorted()} />
      </button>
    );

  return [
    {
      accessorKey: "symbol",
      header: sortableHeader("Symbol", "Ma chung khoan"),
      cell: ({ row }) => <span className="font-medium">{row.original.symbol}</span>,
      size: 72,
    },
    {
      accessorKey: "industryName1",
      header: sortableHeader("Ind.1", "Nganh cap 1"),
      cell: ({ row }) => row.original.industryName1,
      size: 200,
    },
    {
      accessorKey: "industryName2",
      header: sortableHeader("Ind.2", "Nganh cap 2"),
      cell: ({ row }) => row.original.industryName2,
      size: 200,
    },
    {
      accessorKey: "trade_value_7",
      header: sortableHeader("GTGD 7", "Gia tri giao dich TB 7 phien gan nhat (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.trade_value_7),
      size: 72,
    },
    {
      accessorKey: "trade_value_15",
      header: sortableHeader("GTGD 15", "Gia tri giao dich TB 15 phien gan nhat (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.trade_value_15),
      size: 72,
    },
    {
      accessorKey: "trade_value_30",
      header: sortableHeader("GTGD 30", "Gia tri giao dich TB 30 phien gan nhat (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.trade_value_30),
      size: 72,
    },
    {
      accessorKey: "trade_value_range",
      header: sortableHeader("GTGD Range", "Tong gia tri giao dich trong khoang ngay da chon (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.trade_value_range),
      size: 106,
    },
    {
      accessorKey: "foreign_buy_7",
      header: sortableHeader("F.Buy 7", "Foreign Buy - Gia tri mua cua khoi ngoai 7 phien (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_7),
      size: 72,
    },
    {
      accessorKey: "foreign_buy_15",
      header: sortableHeader("F.Buy 15", "Foreign Buy - Gia tri mua cua khoi ngoai 15 phien (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_15),
      size: 72,
    },
    {
      accessorKey: "foreign_buy_30",
      header: sortableHeader("F.Buy 30", "Foreign Buy - Gia tri mua cua khoi ngoai 30 phien (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_30),
      size: 72,
    },
    {
      accessorKey: "foreign_buy_range",
      header: sortableHeader("F.Buy Range", "Foreign Buy - Tong mua khoi ngoai trong khoang ngay da chon (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_buy_range),
      size: 106,
    },
    {
      accessorKey: "foreign_sell_7",
      header: sortableHeader("F.Sell 7", "Foreign Sell - Gia tri ban cua khoi ngoai 7 phien (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_7),
      size: 72,
    },
    {
      accessorKey: "foreign_sell_15",
      header: sortableHeader("F.Sell 15", "Foreign Sell - Gia tri ban cua khoi ngoai 15 phien (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_15),
      size: 72,
    },
    {
      accessorKey: "foreign_sell_30",
      header: sortableHeader("F.Sell 30", "Foreign Sell - Gia tri ban cua khoi ngoai 30 phien (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_30),
      size: 72,
    },
    {
      accessorKey: "foreign_sell_range",
      header: sortableHeader("F.Sell Range", "Foreign Sell - Tong ban khoi ngoai trong khoang ngay da chon (ty VND)"),
      cell: ({ row }) => fmtNum(row.original.foreign_sell_range),
      size: 106,
    },
    {
      accessorKey: "foreign_diff_7",
      header: sortableHeader("F.Diff 7", "Foreign Diff (Buy - Sell) 7 phien (ty VND). Green = net buy, Red = net sell"),
      cell: ({ row }) => (
        <span className={diffClass(row.original.foreign_diff_7)}>{fmtNum(row.original.foreign_diff_7)}</span>
      ),
      size: 72,
    },
    {
      accessorKey: "foreign_diff_15",
      header: sortableHeader(
        "F.Diff 15",
        "Foreign Diff (Buy - Sell) 15 phien (ty VND). Green = net buy, Red = net sell",
      ),
      cell: ({ row }) => (
        <span className={diffClass(row.original.foreign_diff_15)}>{fmtNum(row.original.foreign_diff_15)}</span>
      ),
      size: 72,
    },
    {
      accessorKey: "foreign_diff_30",
      header: sortableHeader(
        "F.Diff 30",
        "Foreign Diff (Buy - Sell) 30 phien (ty VND). Green = net buy, Red = net sell",
      ),
      cell: ({ row }) => (
        <span className={diffClass(row.original.foreign_diff_30)}>{fmtNum(row.original.foreign_diff_30)}</span>
      ),
      size: 72,
    },
    {
      accessorKey: "foreign_diff_range",
      header: sortableHeader(
        "F.Diff Range",
        "Foreign Diff (Buy - Sell) trong khoang ngay da chon (ty VND). Green = net buy, Red = net sell",
      ),
      cell: ({ row }) => (
        <span className={diffClass(row.original.foreign_diff_range)}>{fmtNum(row.original.foreign_diff_range)}</span>
      ),
      size: 106,
    },
  ];
}

const ROW_HEIGHT = 28;

type InjectedProps = CombinedProps<[typeof withAnalysisTableResults]>;

function AnalysisSymbolTableRender({ state }: InjectedProps) {
  const { analysisRows, isLoading, error } = state;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [symbolFilter, setSymbolFilter] = useState("");

  const columns = useMemo(() => buildColumns(), []);

  const filteredData = useMemo(() => {
    if (!symbolFilter) return analysisRows;
    const upper = symbolFilter.toUpperCase();
    return analysisRows.filter((r) => r.symbol.includes(upper));
  }, [analysisRows, symbolFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => scrollContainerRef.current,
    overscan: 10,
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
        <div ref={scrollContainerRef} className="overflow-auto" style={{ maxHeight: 520 }}>
          <table style={{ display: "grid", minWidth: table.getTotalSize() }}>
            <thead className="sticky top-0 z-20 bg-background" style={{ display: "grid" }}>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} style={{ display: "flex", width: "100%" }}>
                  {hg.headers.map((h, idx) => (
                    <th
                      key={h.id}
                      className={`whitespace-nowrap px-2 py-1 text-left text-xs font-medium text-muted-foreground ${idx === 0 ? "sticky left-0 z-30 bg-background" : ""}`}
                      style={{ display: "flex", width: h.getSize(), minWidth: h.getSize(), flexShrink: 0 }}
                    >
                      {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              style={{
                display: "grid",
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<AnalysisRow>;
                return (
                  <tr
                    key={row.id}
                    data-index={virtualRow.index}
                    className="border-b border-border"
                    style={{
                      display: "flex",
                      position: "absolute",
                      transform: `translateY(${virtualRow.start}px)`,
                      width: "100%",
                      height: ROW_HEIGHT,
                    }}
                  >
                    {row.getVisibleCells().map((cell, idx) => (
                      <td
                        key={cell.id}
                        className={`flex items-center whitespace-nowrap px-2 text-xs ${idx === 0 ? "sticky left-0 z-10 bg-background font-medium" : ""}`}
                        style={{ width: cell.column.getSize(), minWidth: cell.column.getSize(), flexShrink: 0 }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardWidget>
  );
}

export default combineHOC(withAnalysisTableResults)(AnalysisSymbolTableRender);

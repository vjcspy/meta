"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useStocks } from "@/modules/shared/components/use-stocks";
import type { StockInfo } from "@/modules/shared/lib/jmeta/stock-api";

// --- Types ---

type StockRow = StockInfo & {
  isTicked: boolean;
};

type StockCategoryTableProps = {
  isSymbolTicked: (code: string) => boolean;
  toggleSymbol: (code: string) => void;
  categorySelected: boolean;
};

// --- Constants ---

const ROW_HEIGHT = 40;

// --- Helpers ---

function SortIndicator({ isSorted }: { isSorted: false | "asc" | "desc" }) {
  if (isSorted === "asc") return <span className="text-primary">↑</span>;
  if (isSorted === "desc") return <span className="text-primary">↓</span>;
  return <span className="text-muted-foreground/30">↕</span>;
}

// --- Column Definitions ---

function buildColumns(categorySelected: boolean, toggleSymbol: (code: string) => void): ColumnDef<StockRow>[] {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Symbol <SortIndicator isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ row }) => <span className="font-semibold tracking-wide text-foreground">{row.original.code}</span>,
      size: 110,
    },
    {
      accessorKey: "exchange",
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Exchange <SortIndicator isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ row }) => {
        const exchange = row.original.exchange;
        const colors: Record<string, string> = {
          HOSE: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
          HNX: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          UPCOM: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        };
        return (
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${colors[exchange] ?? "bg-muted text-muted-foreground"}`}
          >
            {exchange}
          </span>
        );
      },
      size: 100,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <SortIndicator isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ row }) => <span className="truncate text-muted-foreground">{row.original.name}</span>,
      size: 9999, // flex-grow
    },
    {
      id: "ticked",
      accessorFn: (row) => row.isTicked,
      header: () => <span className="text-center">✓</span>,
      cell: ({ row }) => {
        const stock = row.original;
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={stock.isTicked}
              disabled={!categorySelected}
              onCheckedChange={() => toggleSymbol(stock.code)}
              className={!categorySelected ? "opacity-30" : "cursor-pointer"}
              aria-label={`Toggle ${stock.code}`}
            />
          </div>
        );
      },
      size: 56,
      sortingFn: (a, b) => {
        const aVal = a.original.isTicked ? 1 : 0;
        const bVal = b.original.isTicked ? 1 : 0;
        return aVal - bVal;
      },
    },
  ];
}

// --- Component ---

export function StockCategoryTable({ isSymbolTicked, toggleSymbol, categorySelected }: StockCategoryTableProps) {
  const { data: stocks, isLoading, error } = useStocks();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "ticked", desc: true },
    { id: "code", desc: false },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(() => buildColumns(categorySelected, toggleSymbol), [categorySelected, toggleSymbol]);

  const tableData: StockRow[] = useMemo(() => {
    if (!stocks) return [];
    return stocks.map((s) => ({
      ...s,
      isTicked: isSymbolTicked(s.code),
    }));
  }, [stocks, isSymbolTicked]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toUpperCase();
      return row.original.code.toUpperCase().includes(search) || row.original.name.toUpperCase().includes(search);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => scrollContainerRef.current,
    overscan: 15,
  });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-9 animate-pulse rounded-lg bg-muted/50" style={{ animationDelay: `${i * 50}ms` }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-sm font-medium text-destructive">Failed to load stocks</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Search Bar */}
      <div className="border-b border-border px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by symbol or name…"
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          {globalFilter && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setGlobalFilter("")}
            >
              ×
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            {rows.length.toLocaleString()} stocks
            {globalFilter &&
              tableData.length !== rows.length &&
              ` (filtered from ${tableData.length.toLocaleString()})`}
          </span>
          {categorySelected && (
            <span className="flex items-center gap-1">
              <span className="inline-block size-2 rounded-full bg-primary" />
              {tableData.filter((s) => s.isTicked).length} selected
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div ref={scrollContainerRef} className="flex-1 overflow-auto" style={{ maxHeight: "calc(100vh - 240px)" }}>
        <table style={{ display: "grid", width: "100%" }}>
          {/* Header */}
          <thead
            className="sticky top-0 z-20 border-b border-border bg-muted/30 backdrop-blur-sm"
            style={{ display: "grid" }}
          >
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} style={{ display: "flex", width: "100%" }}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="whitespace-nowrap px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: h.getSize() === 9999 ? undefined : h.getSize(),
                      minWidth: h.getSize() === 9999 ? undefined : h.getSize(),
                      flex: h.getSize() === 9999 ? "1 1 0%" : "0 0 auto",
                    }}
                  >
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody
            style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<StockRow>;
              const isTicked = row.original.isTicked;

              return (
                <tr
                  key={row.id}
                  data-index={virtualRow.index}
                  className={`border-b border-border/50 transition-colors duration-100 ${
                    isTicked ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-accent/30"
                  }`}
                  style={{
                    display: "flex",
                    position: "absolute",
                    transform: `translateY(${virtualRow.start}px)`,
                    width: "100%",
                    height: ROW_HEIGHT,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="flex items-center whitespace-nowrap px-4 text-xs"
                      style={{
                        width: cell.column.getSize() === 9999 ? undefined : cell.column.getSize(),
                        minWidth: cell.column.getSize() === 9999 ? undefined : cell.column.getSize(),
                        flex: cell.column.getSize() === 9999 ? "1 1 0%" : "0 0 auto",
                        overflow: "hidden",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty state */}
        {rows.length === 0 && !isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">No stocks found</p>
              {globalFilter && (
                <button
                  type="button"
                  className="mt-2 text-xs text-primary hover:underline"
                  onClick={() => setGlobalFilter("")}
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

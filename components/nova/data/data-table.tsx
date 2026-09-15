"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * DataTable - the canonical table (spec 3.5).
 *
 * Behaviour: sticky header, sortable columns with a three-state cycle, right-aligned
 * tabular numbers, hover tints the row, row actions fade in, and the empty state
 * replaces the body instead of leaving an empty shell.
 *
 * Motion: 120ms row tint only. Tables never stagger on entry.
 */
export interface Column<Row> {
  key: string;
  header: string;
  align?: "left" | "right";
  sortable?: boolean;
  render: (row: Row) => ReactNode;
  /** Value used for sorting when it differs from the rendered output. */
  sortValue?: (row: Row) => string | number;
}

export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  onRowClick?: (row: Row) => void;
  empty?: ReactNode;
  loading?: boolean;
  rowActions?: (row: Row) => ReactNode;
  className?: string;
}

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty,
  loading,
  rowActions,
  className,
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const value = (row: Row) =>
      column.sortValue ? column.sortValue(row) : String(column.render(row) ?? "");
    return [...rows].sort((a, b) => {
      const left = value(a);
      const right = value(b);
      const result = left > right ? 1 : left < right ? -1 : 0;
      return sort.dir === "asc" ? result : -result;
    });
  }, [rows, sort, columns]);

  const cycle = (key: string) =>
    setSort((current) => {
      if (!current || current.key !== key) return { key, dir: "asc" };
      if (current.dir === "asc") return { key, dir: "desc" };
      return null;
    });

  return (
    <div className={cn("nv-surface overflow-hidden p-0", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[var(--fs-sm)]">
          <thead
            className="sticky top-[var(--nav-h)] z-[var(--z-sticky)] backdrop-blur-[var(--blur-sm)]"
            style={{ background: "color-mix(in srgb, var(--bg-soft) 88%, transparent)" }}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]",
                    column.align === "right" && "text-right",
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => cycle(column.key)}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      {column.header}
                      {sort?.key === column.key ? (
                        sort.dir === "asc" ? (
                          <ArrowUp className="size-3" aria-hidden="true" />
                        ) : (
                          <ArrowDown className="size-3" aria-hidden="true" />
                        )
                      ) : (
                        <ChevronsUpDown className="size-3 opacity-40" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {rowActions ? <th scope="col" className="w-12 px-4 py-3" /> : null}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t border-[var(--hair-soft)]">
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-4">
                        <span className="nv-shimmer block h-3 w-full max-w-[140px] rounded-full" />
                      </td>
                    ))}
                    {rowActions ? <td className="px-4 py-4" /> : null}
                  </tr>
                ))
              : sorted.map((row) => (
                  <tr
                    key={rowKey(row)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      "group border-t border-[var(--hair-soft)] nv-row",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3.5 text-[var(--fg-muted)]",
                          column.align === "right" && "text-right tabular-nums",
                        )}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                    {rowActions ? (
                      <td className="px-4 py-3.5">
                        <div className="flex justify-end opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                          {rowActions(row)}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!loading && sorted.length === 0 ? (
        empty ?? (
          <div className="px-6 py-14 text-center">
            <p className="text-[var(--fs-sm)] text-[var(--fg-muted)]">
              No records for the current filters.
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}

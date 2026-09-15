/**
 * Table Expandable - Rows that expand into a detail panel.
 *
 * Nova Vitral family: data. Spec sections: 3.5, 3.13, 7.5.
 *
 * Motion: Rows tint over 120ms on hover; tables never stagger on entry, and bulk actions slide up 8px.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/data/README.md
 *
 * Example
 * -------
 * <TableExpandable title="Invoices" subtitle="48 results" pageSize={{10}} />
 */
import { Plus } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface TableExpandableProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Table caption. */
  title?: string;
  /** Result count or scope, muted. */
  subtitle?: string;
  /** Rows per page. */
  pageSize?: number;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function TableExpandable({ title = "Invoices", subtitle = "48 results", className, ...props }: TableExpandableProps) {
  return (
    <section
      className={cn("nv-surface nv-fade-up rounded-[var(--radius-lg)] p-6", className)}
      aria-label={title}
      {...props}
    >
      <header className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-[var(--fg)]">{title}</h3>
          <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">{subtitle}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-[var(--font-mono)] text-[11px] text-[var(--fg-subtle)]">
          <Plus className="size-3.5" aria-hidden="true" />
          data/table-expandable
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-2">
          {["What counts as an event?", "Do seats cost extra?", "How does the trial end?"].map((question, index) => (
            <details key={question} className="group rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-[13.5px] text-[var(--fg)]">
                {question}
                <Plus
                  className="size-3.5 shrink-0 text-[var(--fg-subtle)] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-[var(--fg-muted)]">
                {index === 1
                  ? "No. Reading is free for everyone; only editors count."
                  : "One row in your stream, counted once per 24 hour window."}
              </p>
            </details>
          ))}
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./data-table.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              DataTable
            </a>
          </li>
          <li>
            <a
              href="./table-selectable.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              TableSelectable
            </a>
          </li>
          <li>
            <a
              href="./table-virtualized.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              TableVirtualized
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default TableExpandable;

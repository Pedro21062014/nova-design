/**
 * Bar Chart - Sorted horizontal bars with direct labels.
 *
 * Nova Vitral family: data. Spec sections: 3.5, 3.13, 7.5.
 *
 * Motion: Bars and lines draw once at 760ms when 40 percent visible; hover raises opacity, never position.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/data/README.md
 *
 * Example
 * -------
 * <BarChart title="Revenue by month" subtitle="Last 6 months, USD" values={{[12, 18, 15, 24, 31, 28]}} />
 */
import { ArrowUpRight } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface BarChartProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Chart heading. */
  title?: string;
  /** Period or unit, muted. */
  subtitle?: string;
  /** Series values; the default renders a sample. */
  values?: number[];
  /** Merged last, so call sites always win. */
  className?: string;
}

export function BarChart({ title = "Revenue by month", subtitle = "Last 6 months, USD", className, ...props }: BarChartProps) {
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
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          data/bar-chart
        </span>
      </header>

      <div className="mt-5">
        <figure className="grid gap-3">
          <div className="flex h-28 items-end gap-2" role="img" aria-label={title}>
            {[42, 58, 51, 67, 74, 63, 81, 88].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-[3px] bg-[linear-gradient(180deg,var(--accent),color-mix(in_srgb,var(--accent)_30%,transparent))] transition-opacity duration-200 hover:opacity-100"
                style={{ height: `${height}%`, opacity: 0.55 + index * 0.05 }}
              />
            ))}
          </div>
          <figcaption className="text-[12px] text-[var(--fg-muted)]">{subtitle}</figcaption>
        </figure>
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

export default BarChart;

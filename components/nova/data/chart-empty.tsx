/**
 * Chart Empty - Empty chart with axes, grid and a centered hint.
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
 * <ChartEmpty title="Conversion" subtitle="Visits to trials" values={{[12, 18, 15, 24, 31, 28]}} />
 */
import { ArrowUpRight } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ChartEmptyProps
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

export function ChartEmpty({ title = "Conversion", subtitle = "Visits to trials", className, ...props }: ChartEmptyProps) {
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
        <span className="shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--fg-subtle)]">
          data/chart-empty
        </span>
      </header>

      <div className="mt-5">
        <figure className="grid gap-3">
          <svg viewBox="0 0 240 64" className="h-16 w-full" role="img" aria-label={title}>
            <defs>
              <linearGradient id="nv-page-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 48 L48 40 L96 44 L144 26 L192 20 L240 12 L240 64 L0 64 Z"
              fill="url(#nv-page-fill)"
            />
            <polyline
              points="0,48 48,40 96,44 144,26 192,20 240,12"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <figcaption className="flex items-center gap-2 text-[12px] text-[var(--fg-muted)]">
            <ArrowUpRight className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
            {subtitle}
          </figcaption>
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

export default ChartEmpty;

/**
 * Stats Header - Header with inline metrics.
 *
 * Nova Vitral family: layout. Spec sections: 3.7, 3.8, 5.6.
 *
 * Motion: Sticky elements pin with a hairline that fades in over 240ms; regions do not animate on load.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/layout/README.md
 *
 * Example
 * -------
 * <StatsHeader title="Settings" subtitle="Workspace preferences">
  {children}
</StatsHeader>
 */
import { PanelLeft } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface StatsHeaderProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Region heading, often visually hidden. */
  title?: string;
  /** Context line, muted. */
  subtitle?: string;
  /** Enables the sticky behavior where the layout defines one. */
  sticky?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function StatsHeader({ title = "Settings", subtitle = "Workspace preferences", className, ...props }: StatsHeaderProps) {
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
          <PanelLeft className="size-3.5" aria-hidden="true" />
          layout/stats-header
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Net MRR", value: "$412.8k", delta: "+5.8%" },
            { label: "Accounts", value: "8,914", delta: "+2.4%" },
            { label: "p95 latency", value: "184ms", delta: "-12ms" },
          ].map((cell) => (
            <div key={cell.label} className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{cell.label}</p>
              <p className="mt-1.5 text-[20px] font-semibold tabular-nums text-[var(--fg)]">{cell.value}</p>
              <p className="text-[11.5px] text-[var(--accent-2)]">{cell.delta}</p>
            </div>
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
              href="./bento-grid.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              BentoGrid
            </a>
          </li>
          <li>
            <a
              href="./split-layout.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              SplitLayout
            </a>
          </li>
          <li>
            <a
              href="./sticky-aside.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              StickyAside
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default StatsHeader;

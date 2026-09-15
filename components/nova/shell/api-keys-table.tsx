/**
 * Api Keys Table - Key table with masked reveal and revoke.
 *
 * Nova Vitral family: shell. Spec sections: 5.8, 3.6.
 *
 * Motion: Sidebar collapses over 240ms with a width and opacity pair; the content region never re-layouts twice.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/shell/README.md
 *
 * Example
 * -------
 * <ApiKeysTable title="Acme Console" subtitle="Production">
  {children}
</ApiKeysTable>
 */
import { PanelLeft, Search } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ApiKeysTableProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Product name in the shell. */
  title?: string;
  /** Workspace or tenant name. */
  subtitle?: string;
  /** Icon rail instead of the full sidebar. */
  collapsed?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function ApiKeysTable({ title = "Acme Console", subtitle = "Production", className, ...props }: ApiKeysTableProps) {
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
          shell/api-keys-table
        </span>
      </header>

      <div className="mt-5">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2">
            <PanelLeft className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
            <span className="text-[12px] text-[var(--fg-muted)]">{title}</span>
            <Search className="ml-auto size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-[112px_1fr]">
            <div className="grid gap-1.5 border-r border-[var(--hair)] p-2.5">
              {[0, 1, 2, 3].map((row) => (
                <span
                  key={row}
                  className={row === 1 ? "h-6 rounded-[var(--radius-sm)] bg-[var(--glass-strong)]" : "h-6 rounded-[var(--radius-sm)] bg-[var(--glass-dim)]"}
                />
              ))}
            </div>
            <div className="grid gap-2 p-3">
              <span className="block h-2 w-1/3 rounded-full bg-[var(--hair-soft)]" />
              <span className="block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
              <span className="block h-2 w-1/2 rounded-full bg-[var(--hair-soft)]" />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./app-layout.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              AppLayout
            </a>
          </li>
          <li>
            <a
              href="./topbar.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Topbar
            </a>
          </li>
          <li>
            <a
              href="./workspace-switcher.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              WorkspaceSwitcher
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default ApiKeysTable;

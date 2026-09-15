/**
 * Hotkey List - Catalog of keyboard shortcuts.
 *
 * Nova Vitral family: devtools. Spec sections: 3.10, 6.7.
 *
 * Motion: Panels toggle in 240ms; the timeline scrubs with a 0.06s spring and never snaps past the cursor.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/devtools/README.md
 *
 * Example
 * -------
 * <HotkeyList title="Console" subtitle="2 warnings" />
 */
import { Terminal } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface HotkeyListProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Panel label. */
  title?: string;
  /** Environment or build id, muted. */
  subtitle?: string;
  /** Summary-only rendering. */
  collapsed?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function HotkeyList({ title = "Console", subtitle = "2 warnings", className, ...props }: HotkeyListProps) {
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
          devtools/hotkey-list
        </span>
      </header>

      <div className="mt-5">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2 text-[12px] text-[var(--fg-muted)]">
            <Terminal className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            {title}
          </div>
          <div className="grid font-[var(--font-mono)] text-[12.5px]">
            {[
              { method: "GET", path: "/api/usage", ms: "142ms" },
              { method: "POST", path: "/api/chat", ms: "1.20s" },
            ].map((row) => (
              <div
                key={row.path}
                className="flex items-center gap-3 border-t border-[var(--hair-soft)] px-3 py-2 transition-colors duration-150 hover:bg-[var(--glass-dim)]"
              >
                <span className="text-[var(--accent)]">{row.method}</span>
                <span className="text-[var(--fg-muted)]">{row.path}</span>
                <span className="ml-auto tabular-nums text-[var(--fg-subtle)]">{row.ms}</span>
              </div>
            ))}
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
              href="./command-bar.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              CommandBar
            </a>
          </li>
          <li>
            <a
              href="./feature-flag-panel.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              FeatureFlagPanel
            </a>
          </li>
          <li>
            <a
              href="./env-switcher.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              EnvSwitcher
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default HotkeyList;

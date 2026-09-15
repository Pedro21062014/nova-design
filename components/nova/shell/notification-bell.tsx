/**
 * Notification Bell - Bell with unread count and popover list.
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
 * <NotificationBell title="Acme Console" subtitle="Production">
  {children}
</NotificationBell>
 */
import { Upload } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface NotificationBellProps
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

export function NotificationBell({ title = "Acme Console", subtitle = "Production", className, ...props }: NotificationBellProps) {
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
          <Upload className="size-3.5" aria-hidden="true" />
          shell/notification-bell
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-2">
          {[
            { tone: "info", text: "Ingestion paused, resuming in 4 minutes." },
            { tone: "warn", text: "You have used 82 percent of the included volume." },
            { tone: "danger", text: "Upload failed. Retry, or use a smaller file." },
          ].map((item) => (
            <div
              key={item.tone}
              role="status"
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3.5 py-2.5"
            >
              <span
                className={
                  item.tone === "danger"
                    ? "size-1.5 shrink-0 rounded-full bg-[var(--danger)]"
                    : item.tone === "warn"
                      ? "size-1.5 shrink-0 rounded-full bg-[var(--warn)]"
                      : "size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                }
                aria-hidden="true"
              />
              <p className="text-[12.5px] text-[var(--fg-muted)]">{item.text}</p>
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

export default NotificationBell;

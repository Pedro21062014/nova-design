/**
 * Invite Dialog - Invite by email with role select.
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
 * <InviteDialog title="Billing" subtitle="Team of 8">
  {children}
</InviteDialog>
 */
import { Search } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface InviteDialogProps
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

export function InviteDialog({ title = "Billing", subtitle = "Team of 8", className, ...props }: InviteDialogProps) {
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
          <Search className="size-3.5" aria-hidden="true" />
          shell/invite-dialog
        </span>
      </header>

      <div className="mt-5">
        <ol className="grid gap-4 border-l border-[var(--hair-soft)] pl-4">
          {[
            { who: "Ilse Brand", what: "created an alert on revenue per account", when: "6 min ago" },
            { who: "Tomas Erdahl", what: "pinned the release impact query", when: "22 min ago" },
            { who: "Meridian", what: "detected an anomaly in eu-west ingestion", when: "1 h ago" },
          ].map((event) => (
            <li key={event.when} className="relative">
              <span className="absolute -left-[21px] top-1.5 size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <p className="text-[13px] text-[var(--fg)]">
                <span className="font-medium">{event.who}</span> {event.what}
              </p>
              <p className="mt-0.5 text-[12px] text-[var(--fg-subtle)]">{event.when}</p>
            </li>
          ))}
        </ol>
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

export default InviteDialog;

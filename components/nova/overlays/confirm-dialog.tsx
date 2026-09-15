/**
 * Confirm Dialog - Confirmation with danger action and typed phrase.
 *
 * Nova Vitral family: overlays. Spec sections: 3.4, 6.7.
 *
 * Motion: Backdrop fades 180ms, surface rises 8px and scales from 0.98 over 240ms; exit is 160ms.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/overlays/README.md
 *
 * Example
 * -------
 * <ConfirmDialog title="Delete workspace" subtitle="This cannot be undone" open={{open}} onOpenChange={{setOpen}} />
 */
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Dialog or sheet heading. */
  title?: string;
  /** Supporting sentence, muted. */
  subtitle?: string;
  /** Controlled visibility. */
  open?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function ConfirmDialog({ title = "Delete workspace", subtitle = "This cannot be undone", className, ...props }: ConfirmDialogProps) {
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
          <X className="size-3.5" aria-hidden="true" />
          overlays/confirm-dialog
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
              href="./modal.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Modal
            </a>
          </li>
          <li>
            <a
              href="./drawer-right.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              DrawerRight
            </a>
          </li>
          <li>
            <a
              href="./sheet-bottom.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              SheetBottom
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default ConfirmDialog;

/**
 * Sheet Bottom - Bottom sheet for mobile actions and filters.
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
 * <SheetBottom title="Invite a teammate" subtitle="They receive an email in a moment" open={{open}} onOpenChange={{setOpen}} />
 */
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface SheetBottomProps
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

export function SheetBottom({ title = "Invite a teammate", subtitle = "They receive an email in a moment", className, ...props }: SheetBottomProps) {
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
          overlays/sheet-bottom
        </span>
      </header>

      <div className="mt-5">
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="min-h-[132px] bg-[var(--bg-elevated)] p-4 opacity-40" aria-hidden="true">
            <span className="block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
            <span className="mt-2 block h-2 w-1/2 rounded-full bg-[var(--hair-soft)]" />
          </div>
          <div className="absolute inset-0 grid place-items-center bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-[8px]">
            <div className="w-[78%] rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-strong)] p-4 nv-scale-in">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[13px] font-medium text-[var(--fg)]">{title}</span>
                <X className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
              </div>
              <p className="mt-2 text-[12px] text-[var(--fg-muted)]">{subtitle}</p>
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
              href="./modal.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Modal
            </a>
          </li>
          <li>
            <a
              href="./confirm-dialog.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ConfirmDialog
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
        </ul>
      </footer>
    </section>
  );
}

export default SheetBottom;

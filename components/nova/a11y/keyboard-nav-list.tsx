/**
 * Keyboard Nav List - List navigable with arrows and typeahead.
 *
 * Nova Vitral family: a11y. Spec sections: 9.1, 9.2, 9.3.
 *
 * Motion: Announcements do not animate; the visible focus ring appears in 140ms and is never removed.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/a11y/README.md
 *
 * Example
 * -------
 * <KeyboardNavList title="Skip to content" subtitle="Visible on focus" live="polite" />
 */
import { Eye } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface KeyboardNavListProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Visible label. */
  title?: string;
  /** Instruction, muted. */
  subtitle?: string;
  /** ARIA live politeness for announcements. */
  live?: "polite" | "assertive" | "off";
  /** Merged last, so call sites always win. */
  className?: string;
}

export function KeyboardNavList({ title = "Skip to content", subtitle = "Visible on focus", className, ...props }: KeyboardNavListProps) {
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
          <Eye className="size-3.5" aria-hidden="true" />
          a11y/keyboard-nav-list
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Backlog", "In progress", "Shipped"].map((column, index) => (
            <div key={column} className="grid gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
              <p className="text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {column} {[6, 3, 12][index]}
              </p>
              {[0, 1].map((card) => (
                <span key={card} className="block rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] p-2.5">
                  <span className="block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
                  <span className="mt-2 block h-2 w-1/3 rounded-full bg-[var(--hair-soft)]" />
                </span>
              ))}
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
              href="./skip-link.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              SkipLink
            </a>
          </li>
          <li>
            <a
              href="./live-region.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              LiveRegion
            </a>
          </li>
          <li>
            <a
              href="./focus-trap-wrapper.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              FocusTrapWrapper
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default KeyboardNavList;

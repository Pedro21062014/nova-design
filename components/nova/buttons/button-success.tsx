/**
 * Button Success - Success swap with a check and a 1.6s revert.
 *
 * Nova Vitral family: buttons. Spec sections: 3.1, 6.3.
 *
 * Motion: 1px lift and a 0.98 press, 140ms; the icon travels 2px on hover and nothing animates on load.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/buttons/README.md
 *
 * Example
 * -------
 * <ButtonSuccess iconRight={{<ArrowRight className="size-4" />}} onClick={{save}}>
  Export CSV
</ButtonSuccess>
 */
import { ArrowRight } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonSuccessProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Button label. */
  title?: string;
  /** One supporting line, muted. */
  subtitle?: string;
  /** Lucide icon at 16px. */
  iconLeft: ReactNode;
  /** Trailing icon, often ArrowRight. */
  iconRight: ReactNode;
  /** Blocks interaction and drops opacity to 45 percent. */
  disabled?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function ButtonSuccess({ title = "Export CSV", subtitle = "Downloads the current view", className, ...props }: ButtonSuccessProps) {
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
          <ArrowRight className="size-3.5" aria-hidden="true" />
          buttons/button-success
        </span>
      </header>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] px-5 text-[13px] font-medium text-[var(--fg)] transition-transform duration-150 hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {title}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <span className="text-[12px] text-[var(--fg-subtle)]">140ms lift, 0.98 press</span>
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./button-primary.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ButtonPrimary
            </a>
          </li>
          <li>
            <a
              href="./button-glass.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ButtonGlass
            </a>
          </li>
          <li>
            <a
              href="./button-ghost.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ButtonGhost
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default ButtonSuccess;

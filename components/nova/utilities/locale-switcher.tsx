/**
 * Locale Switcher - Language selector with persistence.
 *
 * Nova Vitral family: utilities. Spec sections: 3.14, 6.3.
 *
 * Motion: Copy confirms with an inline icon swap in 140ms; tooltips delay 400ms and fade in 120ms.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/utilities/README.md
 *
 * Example
 * -------
 * <LocaleSwitcher title="Time zone" subtitle="Stored per account" value={{value}} onValueChange={{setValue}} />
 */
import { Mail } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface LocaleSwitcherProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Control label. */
  title?: string;
  /** Hint, muted. */
  subtitle?: string;
  /** Current value for controlled use. */
  value: string;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function LocaleSwitcher({ title = "Time zone", subtitle = "Stored per account", className, ...props }: LocaleSwitcherProps) {
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
          <Mail className="size-3.5" aria-hidden="true" />
          utilities/locale-switcher
        </span>
      </header>

      <div className="mt-5">
        <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-1.5">
            <label className="text-[13px] font-medium text-[var(--fg)]" htmlFor="nv-field">
              {title}
            </label>
            <div className="flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3">
              <Mail className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
              <input
                id="nv-field"
                className="h-full w-full bg-transparent text-[14px] text-[var(--fg)] outline-none"
                placeholder={subtitle}
              />
            </div>
            <p className="text-[12px] text-[var(--fg-subtle)]">Required. We reply within one business day.</p>
          </div>
          <button
            type="submit"
            className="h-10 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] px-5 text-[13px] font-medium text-[var(--fg)] transition-transform duration-150 hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Continue
          </button>
        </form>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./copy-button.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              CopyButton
            </a>
          </li>
          <li>
            <a
              href="./tooltip-label.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              TooltipLabel
            </a>
          </li>
          <li>
            <a
              href="./keyboard-chip.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              KeyboardChip
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default LocaleSwitcher;

/**
 * Contrast Checker - Reports contrast of two tokens.
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
 * <ContrastChecker title="Time zone" subtitle="Stored per account" value={{value}} onValueChange={{setValue}} />
 */
import { Check, Copy } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ContrastCheckerProps
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

export function ContrastChecker({ title = "Time zone", subtitle = "Stored per account", className, ...props }: ContrastCheckerProps) {
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
          utilities/contrast-checker
        </span>
      </header>

      <div className="mt-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 text-[12.5px] text-[var(--fg-muted)]">
            {title}
            <Copy className="size-3.5" aria-hidden="true" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--accent-2)]">
            <Check className="size-3.5" aria-hidden="true" />
            {subtitle}
          </span>
        </div>
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

export default ContrastChecker;

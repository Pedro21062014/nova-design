/**
 * Print Button - Print with stylesheet guidance.
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
 * <PrintButton title="Currency" subtitle="Display only" value={{value}} onValueChange={{setValue}} />
 */
import { Copy } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface PrintButtonProps
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

export function PrintButton({ title = "Currency", subtitle = "Display only", className, ...props }: PrintButtonProps) {
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
          <Copy className="size-3.5" aria-hidden="true" />
          utilities/print-button
        </span>
      </header>

      <div className="mt-5">
        <div className="mx-auto w-full max-w-[420px] rounded-[var(--radius-sm)] border border-[var(--hair)] bg-white p-5 text-black">
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] font-semibold">{title}</span>
            <span className="text-[11px]">page 1 / 4</span>
          </div>
          <div className="mt-3 h-px w-full bg-black/20" />
          <div className="mt-3 grid gap-2 text-[12px]">
            <span className="block h-2 w-3/4 rounded-full bg-black/10" />
            <span className="block h-2 w-full rounded-full bg-black/10" />
            <span className="block h-2 w-2/3 rounded-full bg-black/10" />
          </div>
          <p className="mt-3 text-[11px] text-black/60">{subtitle}</p>
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

export default PrintButton;

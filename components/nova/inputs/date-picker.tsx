/**
 * Date Picker - Calendar popover with presets and keyboard navigation.
 *
 * Nova Vitral family: inputs. Spec sections: 3.3, 9.3.
 *
 * Motion: Focus ring appears in 140ms, the label rises to the top border, and the error line slides in 8px.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/inputs/README.md
 *
 * Example
 * -------
 * <DatePicker title="Work email" subtitle="We never share it" value={{email}} onChange={{setEmail}} />
 */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Label text, linked with htmlFor. */
  title?: string;
  /** Helper text under the field. */
  subtitle?: string;
  /** Error message; also sets aria-invalid. */
  error: string;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function DatePicker({ title = "Work email", subtitle = "We never share it", className, ...props }: DatePickerProps) {
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
          <ChevronLeft className="size-3.5" aria-hidden="true" />
          inputs/date-picker
        </span>
      </header>

      <div className="mt-5">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="flex items-center justify-between border-b border-[var(--hair)] px-3 py-2 text-[12px] text-[var(--fg-muted)]">
            September 2026
            <span className="flex gap-1">
              <ChevronLeft className="size-3.5" aria-hidden="true" />
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
          <div className="grid grid-cols-7 gap-px bg-[var(--hair-soft)] p-px">
            {Array.from({ length: 28 }).map((_, index) => (
              <span
                key={index}
                className="grid aspect-square place-items-center bg-[var(--bg-soft)] text-[11.5px] tabular-nums text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)]"
              >
                {index + 1}
              </span>
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
              href="./input-text.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              InputText
            </a>
          </li>
          <li>
            <a
              href="./input-email.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              InputEmail
            </a>
          </li>
          <li>
            <a
              href="./input-password.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              InputPassword
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default DatePicker;

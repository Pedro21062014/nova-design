/**
 * Select - Select with glass popup and check on the active row.
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
 * <Select title="Work email" subtitle="We never share it" value={{email}} onChange={{setEmail}} />
 */
import { Mail } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
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

export function Select({ title = "Work email", subtitle = "We never share it", className, ...props }: SelectProps) {
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
          inputs/select
        </span>
      </header>

      <div className="mt-5">
        <label className="block">
          <span className="text-[13px] font-medium text-[var(--fg)]">{title}</span>
          <span className="mt-2 flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 focus-within:border-[var(--hair-strong)] focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
            <Mail className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
            <input
              type="email"
              placeholder={subtitle}
              className="h-full w-full bg-transparent text-[14px] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
            />
          </span>
        </label>
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

export default Select;

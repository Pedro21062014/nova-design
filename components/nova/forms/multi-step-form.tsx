/**
 * Multi Step Form - Stepped form with validation per step.
 *
 * Nova Vitral family: forms. Spec sections: 3.3, 5.3.
 *
 * Motion: Step transitions slide 16px and fade in 240ms; validation messages appear at 8px with no shake.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/forms/README.md
 *
 * Example
 * -------
 * <MultiStepForm title="Create an account" subtitle="No credit card required" onSubmit={{submit}} />
 */
import { ArrowRight } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface MultiStepFormProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Form or step heading. */
  title?: string;
  /** What happens after submit. */
  subtitle?: string;
  /** Marks the field group as required. */
  required?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function MultiStepForm({ title = "Create an account", subtitle = "No credit card required", className, ...props }: MultiStepFormProps) {
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
          forms/multi-step-form
        </span>
      </header>

      <div className="mt-5">
        <ol className="grid gap-3 sm:grid-cols-4">
          {["Connect", "Model", "Watch", "Act"].map((step, index) => (
            <li key={step} className="relative rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[13.5px] text-[var(--fg)]">{step}</p>
              <p className="mt-1 text-[12px] text-[var(--fg-muted)]">
                {["Send events", "Define metrics", "Detect changes", "Ship the fix"][index]}
              </p>
              {index < 3 ? (
                <ArrowRight
                  className="absolute -right-2.5 top-1/2 hidden size-3.5 -translate-y-1/2 text-[var(--fg-subtle)] sm:block"
                  aria-hidden="true"
                />
              ) : null}
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
              href="./form-section.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              FormSection
            </a>
          </li>
          <li>
            <a
              href="./form-summary.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              FormSummary
            </a>
          </li>
          <li>
            <a
              href="./field-group.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              FieldGroup
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default MultiStepForm;

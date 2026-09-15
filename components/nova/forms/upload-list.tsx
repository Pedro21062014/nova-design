/**
 * Upload List - Upload progress list with retry.
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
 * <UploadList title="Create an account" subtitle="No credit card required" onSubmit={{submit}} />
 */
import { Upload } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface UploadListProps
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

export function UploadList({ title = "Create an account", subtitle = "No credit card required", className, ...props }: UploadListProps) {
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
          <Upload className="size-3.5" aria-hidden="true" />
          forms/upload-list
        </span>
      </header>

      <div className="mt-5">
        <div className="grid place-items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--hair-strong)] bg-[var(--glass-dim)] px-6 py-8 text-center transition-colors duration-200 hover:bg-[var(--glass)]">
          <Upload className="size-4 text-[var(--accent)]" aria-hidden="true" />
          <p className="text-[13px] text-[var(--fg)]">{title}</p>
          <p className="text-[12px] text-[var(--fg-subtle)]">CSV, Parquet or JSON up to 512MB</p>
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./multi-step-form.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              MultiStepForm
            </a>
          </li>
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
        </ul>
      </footer>
    </section>
  );
}

export default UploadList;

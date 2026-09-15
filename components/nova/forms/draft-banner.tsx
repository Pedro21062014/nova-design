/**
 * Draft Banner - Restored draft notice with discard.
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
 * <DraftBanner title="Shipping details" subtitle="Delivered in 3 days" onSubmit={{submit}} />
 */
import { Upload } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface DraftBannerProps
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

export function DraftBanner({ title = "Shipping details", subtitle = "Delivered in 3 days", className, ...props }: DraftBannerProps) {
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
          forms/draft-banner
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-2">
          {[
            { tone: "info", text: "Ingestion paused, resuming in 4 minutes." },
            { tone: "warn", text: "You have used 82 percent of the included volume." },
            { tone: "danger", text: "Upload failed. Retry, or use a smaller file." },
          ].map((item) => (
            <div
              key={item.tone}
              role="status"
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3.5 py-2.5"
            >
              <span
                className={
                  item.tone === "danger"
                    ? "size-1.5 shrink-0 rounded-full bg-[var(--danger)]"
                    : item.tone === "warn"
                      ? "size-1.5 shrink-0 rounded-full bg-[var(--warn)]"
                      : "size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                }
                aria-hidden="true"
              />
              <p className="text-[12.5px] text-[var(--fg-muted)]">{item.text}</p>
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

export default DraftBanner;

/**
 * Print Invoice - Printable invoice with totals and terms.
 *
 * Nova Vitral family: print. Spec sections: 8.5, 9.6.
 *
 * Motion: Transitions are suppressed; the reveal classes resolve to their final state before printing.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/print/README.md
 *
 * Example
 * -------
 * <PrintInvoice title="Usage report" subtitle="Billing period August 2026" pageSize="A4" />
 */
import { Check } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface PrintInvoiceProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Document title for the print header. */
  title?: string;
  /** Revision or date line. */
  subtitle?: string;
  /** Applied through @page. */
  pageSize?: "A4" | "Letter";
  /** Merged last, so call sites always win. */
  className?: string;
}

export function PrintInvoice({ title = "Usage report", subtitle = "Billing period August 2026", className, ...props }: PrintInvoiceProps) {
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
          <Check className="size-3.5" aria-hidden="true" />
          print/print-invoice
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Starter", "Pro", "Enterprise"].map((plan, index) => (
            <div
              key={plan}
              className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <p className="text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{plan}</p>
              <p className="mt-2 text-[22px] font-semibold tabular-nums text-[var(--fg)]">
                ${[0, 249, 890][index]}
                <span className="text-[12px] font-normal text-[var(--fg-subtle)]">/mo</span>
              </p>
              <ul className="mt-3 grid gap-1.5 text-[12.5px] text-[var(--fg-muted)]">
                {["Unlimited seats", index > 0 ? "13 month retention" : "30 day retention"].map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--accent-2)]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <span
                className={
                  index === 1
                    ? "mt-4 flex h-9 items-center justify-center rounded-[var(--radius-sm)] bg-[image:var(--grad-primary)] text-[12.5px] font-medium text-[var(--accent-fg)]"
                    : "mt-4 flex h-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--hair)] text-[12.5px] text-[var(--fg-muted)]"
                }
              >
                {index === 1 ? "Start trial" : "Choose plan"}
              </span>
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
              href="./print-header.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              PrintHeader
            </a>
          </li>
          <li>
            <a
              href="./print-report.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              PrintReport
            </a>
          </li>
          <li>
            <a
              href="./print-cover.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              PrintCover
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default PrintInvoice;

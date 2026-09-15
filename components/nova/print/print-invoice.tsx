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
import { Printer } from "lucide-react";
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
        <span className="shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--fg-subtle)]">
          print/print-invoice
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

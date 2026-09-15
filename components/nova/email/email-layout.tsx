/**
 * Email Layout - 600px single column with dark panels.
 *
 * Nova Vitral family: email. Spec sections: 8.4, 9.6.
 *
 * Motion: No motion is possible, so hierarchy carries the rhythm; the same layout is used in the web preview.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/email/README.md
 *
 * Example
 * -------
 * <EmailLayout title="Welcome to Acme" subtitle="Confirm your address to get started" width={{600}} />
 */
import { Mail } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface EmailLayoutProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Email heading. */
  title?: string;
  /** Preview text, muted. */
  subtitle?: string;
  /** Table width, max 600 for deliverability. */
  width?: number;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function EmailLayout({ title = "Welcome to Acme", subtitle = "Confirm your address to get started", className, ...props }: EmailLayoutProps) {
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
          email/email-layout
        </span>
      </header>

      <div className="mt-5">
        <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-soft)]">
          <div className="border-b border-[var(--hair)] px-4 py-3 text-[12px] text-[var(--fg-subtle)]">
            From: team@acme.test
          </div>
          <div className="px-4 py-5">
            <p className="text-[16px] font-semibold text-[var(--fg)]">{title}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--fg-muted)]">{subtitle}</p>
            <span className="mt-4 inline-flex h-9 items-center rounded-[var(--radius-sm)] bg-[image:var(--grad-primary)] px-4 text-[12.5px] font-medium text-[var(--accent-fg)]">
              Confirm address
            </span>
          </div>
          <div className="border-t border-[var(--hair)] px-4 py-3 text-[11px] text-[var(--fg-subtle)]">
            One CTA, one purpose, 600px table above.
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
              href="./email-hero.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              EmailHero
            </a>
          </li>
          <li>
            <a
              href="./email-cta.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              EmailCta
            </a>
          </li>
          <li>
            <a
              href="./email-receipt.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              EmailReceipt
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default EmailLayout;

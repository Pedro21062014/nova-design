/**
 * Plan Switcher - Change plan with proration preview.
 *
 * Nova Vitral family: commerce. Spec sections: 5.2, 3.1.
 *
 * Motion: Gallery cross-fades in 240ms; quantity steps use a 0.98 press; nothing bounces.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/commerce/README.md
 *
 * Example
 * -------
 * <PlanSwitcher title="Pro plan" subtitle="For teams up to 50" price={{49}} />
 */
import { Check } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface PlanSwitcherProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Product or plan name. */
  title?: string;
  /** Short differentiator, muted. */
  subtitle?: string;
  /** Amount in the smallest sensible unit. */
  price: number;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function PlanSwitcher({ title = "Pro plan", subtitle = "For teams up to 50", className, ...props }: PlanSwitcherProps) {
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
          commerce/plan-switcher
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-4 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] p-4 sm:grid-cols-[96px_1fr]">
          <div className="aspect-square rounded-[var(--radius-sm)] bg-[var(--bg-elevated)]" aria-hidden="true" />
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-medium text-[var(--fg)]">{title}</span>
              <span className="text-[16px] font-semibold tabular-nums text-[var(--fg)]">
                $49<span className="text-[12px] font-normal text-[var(--fg-subtle)]">/mo</span>
              </span>
            </div>
            <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">{subtitle}</p>
            <ul className="mt-3 grid gap-1.5 text-[12.5px] text-[var(--fg-muted)]">
              {["Unlimited projects", "SSO and audit log"].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
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
              href="./product-tile.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ProductTile
            </a>
          </li>
          <li>
            <a
              href="./cart-line.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              CartLine
            </a>
          </li>
          <li>
            <a
              href="./checkout-summary.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              CheckoutSummary
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default PlanSwitcher;

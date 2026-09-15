/**
 * Stats Band - Four animated metrics with context captions.
 *
 * Nova Vitral family: marketing. Spec sections: 3.7, 5.1 to 5.9.
 *
 * Motion: Headline, lead and action stagger at 120ms intervals; one scroll-linked scene per page, maximum.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/marketing/README.md
 *
 * Example
 * -------
 * <StatsBand
  title="From idea to interface in an afternoon"
  subtitle="Structure first, then light"
  action={{<ButtonPrimary>Start free</ButtonPrimary>}}
/>
 */
import { ArrowRight, Play } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StatsBandProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Headline; the hero uses --fs-display. */
  title?: string;
  /** Lead paragraph, max 62 characters per line. */
  subtitle?: string;
  /** One primary action, plus at most one secondary. */
  action: ReactNode;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function StatsBand({ title = "From idea to interface in an afternoon", subtitle = "Structure first, then light", className, ...props }: StatsBandProps) {
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
          marketing/stats-band
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-4">
          <p className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[var(--fg)]">
            {title}
          </p>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] bg-[image:var(--grad-primary)] px-5 text-[13px] font-medium text-[var(--accent-fg)]">
              Start free
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            <span className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] px-5 text-[13px] text-[var(--fg-muted)]">
              <Play className="size-3.5" aria-hidden="true" />
              Watch the tour
            </span>
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
              href="./hero-centered.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              HeroCentered
            </a>
          </li>
          <li>
            <a
              href="./hero-split.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              HeroSplit
            </a>
          </li>
          <li>
            <a
              href="./hero-chat.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              HeroChat
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default StatsBand;

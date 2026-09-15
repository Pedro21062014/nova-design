/**
 * Case Study Band - One metric, one sentence, one logo.
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
 * <CaseStudyBand
  title="From idea to interface in an afternoon"
  subtitle="Structure first, then light"
  action={{<ButtonPrimary>Start free</ButtonPrimary>}}
/>
 */
import { Quote } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CaseStudyBandProps
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

export function CaseStudyBand({ title = "From idea to interface in an afternoon", subtitle = "Structure first, then light", className, ...props }: CaseStudyBandProps) {
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
          <Quote className="size-3.5" aria-hidden="true" />
          marketing/case-study-band
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { quote: "We deleted eleven dashboards and kept four saved queries.", name: "Ilse Brand", role: "Head of Platform" },
            { quote: "Two regressions caught before customers noticed.", name: "Tomas Erdahl", role: "Staff Engineer" },
          ].map((item) => (
            <figure key={item.name} className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4">
              <Quote className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              <blockquote className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg)]">{item.quote}</blockquote>
              <figcaption className="mt-3 text-[12px] text-[var(--fg-subtle)]">
                {item.name}, {item.role}
              </figcaption>
            </figure>
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

export default CaseStudyBand;

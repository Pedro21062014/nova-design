/**
 * Accordion Motion - Height expansion via grid-template-rows, no JS measurement.
 *
 * Nova Vitral family: motion. Spec sections: 3.9, 6.1 to 6.14.
 *
 * Motion: Entrance fires once, 16px of travel, ease-out, and renders the final state instantly under reduced motion.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/motion/README.md
 *
 * Example
 * -------
 * <AccordionMotion delay={{120}}>
  <Surface>Entrance</Surface>
</AccordionMotion>
 */
import { Plus } from "lucide-react";
import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

export interface AccordionMotionProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Heading; the preview uses a realistic label. */
  title?: string;
  /** One supporting line, muted. */
  subtitle?: string;
  /** Milliseconds, capped at 400 by the cascade rule. */
  delay?: number;
  /** Travel in pixels; 8 for chips, 24 for panels. */
  distance?: number;
  /** Rendered element. */
  as?: ElementType;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function AccordionMotion({ title = "Entrance", subtitle = "Once, on first view", className, ...props }: AccordionMotionProps) {
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
          <Plus className="size-3.5" aria-hidden="true" />
          motion/accordion-motion
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-2">
          {["What counts as an event?", "Do seats cost extra?", "How does the trial end?"].map((question, index) => (
            <details key={question} className="group rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-[13.5px] text-[var(--fg)]">
                {question}
                <Plus
                  className="size-3.5 shrink-0 text-[var(--fg-subtle)] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-[var(--fg-muted)]">
                {index === 1
                  ? "No. Reading is free for everyone; only editors count."
                  : "One row in your stream, counted once per 24 hour window."}
              </p>
            </details>
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
              href="./counter.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Counter
            </a>
          </li>
          <li>
            <a
              href="./parallax-visual.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ParallaxVisual
            </a>
          </li>
          <li>
            <a
              href="./parallax-layer.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ParallaxLayer
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default AccordionMotion;

/**
 * Glass Card - Default panel: glass, 24px radius, specular on hover.
 *
 * Nova Vitral family: cards. Spec sections: 3.2, 3.13.
 *
 * Motion: 4px rise and a one-step fill increase on hover, 240ms; the entrance is a 16px rise with 60ms cascade.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/cards/README.md
 *
 * Example
 * -------
 * <GlassCard title="Usage this month" subtitle="82 percent of the included quota" interactive />
 */
import { MoreHorizontal } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Card heading, 16px semibold. */
  title?: string;
  /** One supporting line, muted. */
  subtitle?: string;
  /** Adds hover lift and the entrance reveal. */
  interactive?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function GlassCard({ title = "Usage this month", subtitle = "82 percent of the included quota", className, ...props }: GlassCardProps) {
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
          cards/glass-card
        </span>
      </header>

      <div className="mt-5">
        <div className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[var(--fg)]">{title}</span>
            <MoreHorizontal className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-2">
            {[0, 1, 2].map((row) => (
              <span
                key={row}
                className="block h-2 rounded-full bg-[var(--hair-soft)]"
                style={{ width: `${86 - row * 18}%` }}
              />
            ))}
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
              href="./interactive-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              InteractiveCard
            </a>
          </li>
          <li>
            <a
              href="./media-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              MediaCard
            </a>
          </li>
          <li>
            <a
              href="./profile-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ProfileCard
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default GlassCard;

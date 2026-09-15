/**
 * Changelog Card - Release entry with version chip and tags.
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
 * <ChangelogCard title="Team capacity" subtitle="6 of 12 seats active" interactive />
 */
import { MoreHorizontal } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ChangelogCardProps
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

export function ChangelogCard({ title = "Team capacity", subtitle = "6 of 12 seats active", className, ...props }: ChangelogCardProps) {
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
          <MoreHorizontal className="size-3.5" aria-hidden="true" />
          cards/changelog-card
        </span>
      </header>

      <div className="mt-5">
        <ol className="grid gap-4 border-l border-[var(--hair-soft)] pl-4">
          {[
            { who: "Ilse Brand", what: "created an alert on revenue per account", when: "6 min ago" },
            { who: "Tomas Erdahl", what: "pinned the release impact query", when: "22 min ago" },
            { who: "Meridian", what: "detected an anomaly in eu-west ingestion", when: "1 h ago" },
          ].map((event) => (
            <li key={event.when} className="relative">
              <span className="absolute -left-[21px] top-1.5 size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <p className="text-[13px] text-[var(--fg)]">
                <span className="font-medium">{event.who}</span> {event.what}
              </p>
              <p className="mt-0.5 text-[12px] text-[var(--fg-subtle)]">{event.when}</p>
            </li>
          ))}
        </ol>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./glass-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              GlassCard
            </a>
          </li>
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
        </ul>
      </footer>
    </section>
  );
}

export default ChangelogCard;

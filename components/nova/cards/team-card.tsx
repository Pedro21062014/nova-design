/**
 * Team Card - Team card with stacked avatars and member count.
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
 * <TeamCard title="Team capacity" subtitle="6 of 12 seats active" interactive />
 */
import { MoreHorizontal } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface TeamCardProps
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

export function TeamCard({ title = "Team capacity", subtitle = "6 of 12 seats active", className, ...props }: TeamCardProps) {
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
          cards/team-card
        </span>
      </header>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex -space-x-2">
            {["Ilse Brand", "Tomas Erdahl", "Priya Raman", "Marc Oyelaran"].map((person) => (
              <span
                key={person}
                title={person}
                className="grid size-8 place-items-center rounded-full border border-[var(--bg)] bg-[var(--glass-strong)] text-[11px] text-[var(--fg)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {person.split(" ").map((part) => part[0]).join("")}
              </span>
            ))}
            <span className="grid size-8 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] text-[11px] tabular-nums text-[var(--fg-muted)]">
              +9
            </span>
          </div>
          <p className="text-[12.5px] text-[var(--fg-muted)]">{subtitle}</p>
        </div>
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

export default TeamCard;

/**
 * Media Card - Card with cover media, veil gradient and content footer.
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
 * <MediaCard title="Team capacity" subtitle="6 of 12 seats active" interactive />
 */
import { Play } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface MediaCardProps
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

export function MediaCard({ title = "Team capacity", subtitle = "6 of 12 seats active", className, ...props }: MediaCardProps) {
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
          <Play className="size-3.5" aria-hidden="true" />
          cards/media-card
        </span>
      </header>

      <div className="mt-5">
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="grid aspect-video place-items-center bg-[var(--bg-elevated)]">
            <span className="grid size-11 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass-strong)] transition-transform duration-200 hover:scale-[1.04]">
              <Play className="size-4 translate-x-px text-[var(--fg)]" aria-hidden="true" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-3 py-2.5">
            <span className="text-[12.5px] text-[var(--fg-muted)]">{title}</span>
            <span className="text-[12px] tabular-nums text-[var(--fg-subtle)]">{subtitle}</span>
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

export default MediaCard;

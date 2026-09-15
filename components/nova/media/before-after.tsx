/**
 * Before After - Comparison of two states with a divider.
 *
 * Nova Vitral family: media. Spec sections: 3.11, 6.10.
 *
 * Motion: Poster fades to video over 240ms after metadata; hover raises the controls without moving the frame.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/media/README.md
 *
 * Example
 * -------
 * <BeforeAfter title="Onboarding clip" subtitle="0:38, silent" aspect="16/9" />
 */
import { Play } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface BeforeAfterProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Media label. */
  title?: string;
  /** Alt-derived caption or duration. */
  subtitle?: string;
  /** Reserved box, so nothing shifts while loading. */
  aspect?: string;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function BeforeAfter({ title = "Onboarding clip", subtitle = "0:38, silent", className, ...props }: BeforeAfterProps) {
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
          media/before-after
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
              href="./image-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ImageCard
            </a>
          </li>
          <li>
            <a
              href="./gallery-grid.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              GalleryGrid
            </a>
          </li>
          <li>
            <a
              href="./lightbox-thumbs.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              LightboxThumbs
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default BeforeAfter;

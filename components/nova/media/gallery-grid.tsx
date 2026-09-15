/**
 * Gallery Grid - Responsive media grid with selection.
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
 * <GalleryGrid title="Q3 all-hands" subtitle="Recording, 48 min" aspect="16/9" />
 */
import { ArrowUpDown } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface GalleryGridProps
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

export function GalleryGrid({ title = "Q3 all-hands", subtitle = "Recording, 48 min", className, ...props }: GalleryGridProps) {
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
          <ArrowUpDown className="size-3.5" aria-hidden="true" />
          media/gallery-grid
        </span>
      </header>

      <div className="mt-5">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <table className="w-full border-collapse text-[13px]">
            <thead className="bg-[var(--glass-dim)] text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    Name
                    <ArrowUpDown className="size-3 opacity-50" aria-hidden="true" />
                  </span>
                </th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Acme", status: "Active", amount: "12,400" },
                { name: "Northwind", status: "Trial", amount: "900" },
              ].map((row) => (
                <tr
                  key={row.name}
                  className="border-t border-[var(--hair-soft)] transition-colors duration-150 hover:bg-[var(--glass-dim)]"
                >
                  <td className="px-3 py-2.5 text-[var(--fg)]">{row.name}</td>
                  <td className="px-3 py-2.5 text-[var(--fg-muted)]">{row.status}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--fg-muted)]">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              href="./lightbox-thumbs.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              LightboxThumbs
            </a>
          </li>
          <li>
            <a
              href="./video-player.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              VideoPlayer
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default GalleryGrid;

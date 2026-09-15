/**
 * File Preview - Preview sheet for a document or image file.
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
 * <FilePreview title="Product tour" subtitle="1:42, captions available" aspect="16/9" />
 */
import { Quote } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface FilePreviewProps
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

export function FilePreview({ title = "Product tour", subtitle = "1:42, captions available", className, ...props }: FilePreviewProps) {
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
          media/file-preview
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

export default FilePreview;

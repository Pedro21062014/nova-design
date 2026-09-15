/**
 * Twitter Preview - Card preview for social sharing.
 *
 * Nova Vitral family: seo. Spec sections: 8.6, 9.4.
 *
 * Motion: No visible motion: the structured data must stay identical to the rendered content.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/seo/README.md
 *
 * Example
 * -------
 * <TwitterPreview title="Changelog" subtitle="Every release since 1.0, written for humans" structured={{true}} />
 */
import { Quote } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface TwitterPreviewProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Primary value, usually the H1 text. */
  title?: string;
  /** Description, 150 to 160 characters. */
  subtitle?: string;
  /** Emits JSON-LD for the entity. */
  structured?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function TwitterPreview({ title = "Changelog", subtitle = "Every release since 1.0, written for humans", className, ...props }: TwitterPreviewProps) {
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
          seo/twitter-preview
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
              href="./metadata-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              MetadataCard
            </a>
          </li>
          <li>
            <a
              href="./og-preview.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              OgPreview
            </a>
          </li>
          <li>
            <a
              href="./structured-data-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              StructuredDataCard
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default TwitterPreview;

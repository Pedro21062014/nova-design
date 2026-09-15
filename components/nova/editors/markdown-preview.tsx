/**
 * Markdown Preview - Rendered markdown with a raw toggle.
 *
 * Nova Vitral family: editors. Spec sections: 3.3, 6.6.
 *
 * Motion: The find bar drops 8px over 240ms; comment threads expand with the same height technique as drawers.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/editors/README.md
 *
 * Example
 * -------
 * <MarkdownPreview title="invoice.pdf" subtitle="Read only" readOnly={{false}} />
 */
import { Quote } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface MarkdownPreviewProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Document or file name. */
  title?: string;
  /** Path or status, muted. */
  subtitle?: string;
  /** Removes the caret and edit affordances. */
  readOnly?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function MarkdownPreview({ title = "invoice.pdf", subtitle = "Read only", className, ...props }: MarkdownPreviewProps) {
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
          editors/markdown-preview
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
              href="./code-block.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              CodeBlock
            </a>
          </li>
          <li>
            <a
              href="./code-tabs.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              CodeTabs
            </a>
          </li>
          <li>
            <a
              href="./terminal.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Terminal
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default MarkdownPreview;

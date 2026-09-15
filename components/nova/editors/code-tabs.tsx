/**
 * Code Tabs - Multi-language tabbed code samples.
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
 * <CodeTabs title="README.md" subtitle="Preview" readOnly={{false}} />
 */
import { Code } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface CodeTabsProps
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

export function CodeTabs({ title = "README.md", subtitle = "Preview", className, ...props }: CodeTabsProps) {
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
          editors/code-tabs
        </span>
      </header>

      <div className="mt-5">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2">
            <Code className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            <span className="text-[12px] text-[var(--fg-muted)]">{title}</span>
          </div>
          <pre className="overflow-x-auto p-3 font-[var(--font-mono)] text-[12.5px] leading-6">
            <code>
              <span className="text-[var(--fg-subtle)]">12 </span>
              <span className="text-[var(--fg-muted)]">export function </span>
              <span className="text-[var(--fg)]">priceOf</span>(qty) {"{"}
              {"\n"}
              <span className="text-[var(--fg-subtle)]">13 </span>
              {"  "}return qty * UNIT;{"\n"}
              <span className="text-[var(--fg-subtle)]">14 </span>
              {"}"}
            </code>
          </pre>
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
              href="./terminal.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Terminal
            </a>
          </li>
          <li>
            <a
              href="./diff-viewer.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              DiffViewer
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default CodeTabs;

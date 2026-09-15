/**
 * Mention Input - Inline mention authoring with a menu.
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
 * <MentionInput title="README.md" subtitle="Preview" readOnly={{false}} />
 */
import { Sparkles } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface MentionInputProps
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

export function MentionInput({ title = "README.md", subtitle = "Preview", className, ...props }: MentionInputProps) {
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
          <Sparkles className="size-3.5" aria-hidden="true" />
          editors/mention-input
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
              <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
            </span>
            <p className="text-[15px] leading-[1.7] text-[var(--fg)]">
              {title}
              <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] rounded-full bg-[var(--accent)] nv-caret-blink" />
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2 text-[13px] text-[var(--fg-subtle)]">
            {subtitle}
            <span className="ml-auto rounded-full bg-[var(--glass-strong)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]">
              Enter to send
            </span>
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

export default MentionInput;

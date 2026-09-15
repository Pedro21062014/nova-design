import { Sparkles } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * MessageAssistant - an assistant turn is a document, not a bubble (spec 4.3).
 *
 * Full 760px width, transparent background, 16px text at 1.7 leading, identity row with
 * the model name, optional reasoning and tool slots, actions below. Reveals with an 8px
 * rise in 240ms when it first appears (nv-fade-up).
 */
export interface MessageAssistantProps {
  model: string;
  children: ReactNode;
  /** Rendered above the answer: reasoning drawer, tool cards. */
  before?: ReactNode;
  /** Rendered below the answer: sources, artifacts, feedback. */
  after?: ReactNode;
  actions?: ReactNode;
  timestamp?: string;
  streaming?: boolean;
  className?: string;
}

export function MessageAssistant({
  model,
  children,
  before,
  after,
  actions,
  timestamp,
  streaming,
  className,
}: MessageAssistantProps) {
  return (
    <article className={cn("group relative flex gap-4 py-4 nv-fade-up", className)}>
      <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
        <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-2 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          <span className="font-medium text-[var(--fg-muted)]">{model}</span>
          {streaming ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent-2)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-2)_12%,transparent)] px-2 py-0.5 text-[var(--accent-2)]">
              <span className="size-1 rounded-full bg-[var(--accent-2)] nv-pulse" />
              streaming
            </span>
          ) : null}
          {timestamp ? (
            <time className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {timestamp}
            </time>
          ) : null}
        </header>

        {before}
        <div className="prose-nova mt-3 text-[15.5px] leading-[1.7] text-[var(--fg)]">{children}</div>
        {after}
        {actions ? <div className="mt-3">{actions}</div> : null}
      </div>
    </article>
  );
}

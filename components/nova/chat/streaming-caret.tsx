import { cn } from "@/lib/utils";

/**
 * StreamingCaret - 2px caret at the end of streaming text (spec 4.6).
 *
 * Motion: 1s steps blink, removed 120ms after the stream ends, and paused when the
 * stream stalls for more than three seconds so it signals waiting instead of activity.
 * Under reduced motion the caret is solid, never blinking.
 */
export interface StreamingCaretProps {
  /** Set false to render the caret without blinking (stalled stream). */
  active?: boolean;
  className?: string;
}

export function StreamingCaret({ active = true, className }: StreamingCaretProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] rounded-full bg-[var(--accent)]",
        active && "nv-caret-blink",
        className,
      )}
    />
  );
}

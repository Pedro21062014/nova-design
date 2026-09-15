import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * MarqueeRow - endless horizontal track with mask fade (spec 3.10, 6.11).
 *
 * Motion: 40s linear, pauses on hover and focus, and collapses to a wrapped static row
 * under prefers-reduced-motion (handled entirely in the nv-marquee CSS).
 */
export interface MarqueeRowProps {
  children: ReactNode;
  /** Seconds for a full loop. Longer for denser content. */
  durationSeconds?: number;
  className?: string;
}

export function MarqueeRow({ children, durationSeconds = 40, className }: MarqueeRowProps) {
  return (
    <div className={cn("nv-marquee", className)} aria-label="Scrolling content">
      <div className="nv-marquee-track" style={{ animationDuration: `${durationSeconds}s` }}>
        {children}
        <span aria-hidden="true" style={{ display: "contents" }}>
          {children}
        </span>
      </div>
    </div>
  );
}

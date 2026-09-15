"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SpotlightCard - glass surface with a radial light following the pointer
 * (level 2 of spec 3.9). One listener per card, CSS variables only, no re-render.
 * Disabled on coarse pointers and never combined with tilt on the same element.
 */
export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Lift on hover, 2px, per the motion baseline (6.14). */
  lift?: boolean;
}

export function SpotlightCard({ children, className, lift = true }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--nv-mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--nv-my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn("nv-surface nv-specular p-6", lift && "nv-lift", className)}
    >
      {children}
    </div>
  );
}

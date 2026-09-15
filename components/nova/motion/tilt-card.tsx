"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * TiltCard - direct-manipulation tilt, capped at 6 degrees (level 3 of spec 3.9).
 * Only for the single featured element of a view; disabled on touch and under reduced
 * motion. Never place a specular sweep on the same element.
 */
export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxDegrees?: number;
}

export function TiltCard({ children, className, maxDegrees = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateX(${(-y * maxDegrees).toFixed(2)}deg) rotateY(${(x * maxDegrees).toFixed(2)}deg)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        "nv-surface p-2 transition-transform duration-[240ms] ease-[var(--ease-out)] will-change-transform",
        className,
      )}
    >
      {children}
    </div>
  );
}

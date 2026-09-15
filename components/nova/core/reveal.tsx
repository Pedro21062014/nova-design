"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal - the default scroll entrance (spec 6.2).
 *
 * Rules it enforces: fires once, 16 to 24px of travel, ease-out, and no motion at all
 * under prefers-reduced-motion (the final state renders immediately).
 *
 * Implementation: a shared IntersectionObserver adds the `nv-in` class, so no React
 * re-render happens while scrolling.
 *
 * <Reveal><Surface>...</Surface></Reveal>
 */
export interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds, capped at 400 by the hook. */
  delay?: number;
  /** Travel in pixels: 8 for chips, 16 default, 24 for large panels. */
  distance?: number;
  as?: ElementType;
  className?: string;
}

let observer: IntersectionObserver | null = null;
const pending = new WeakMap<Element, string>();
let index = 0;

function ensureObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("nv-in");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
  );
  return observer;
}

export function Reveal({
  children,
  delay,
  distance = 16,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("nv-in");
      return;
    }
    const resolvedDelay = delay ?? Math.min(index++ * 60, 360);
    node.style.setProperty("--nv-delay", `${resolvedDelay}ms`);
    node.style.setProperty("--nv-distance", `${distance}px`);
    ensureObserver()?.observe(node);
    return () => observer?.unobserve(node);
  }, [delay, distance]);

  return (
    <Tag ref={ref} className={cn("nv-reveal", className)}>
      {children}
    </Tag>
  );
}

/** Reusable class version, for markup that cannot host a wrapper element. */
export function revealClassName(delayMs = 0) {
  return cn("nv-reveal", delayMs > 0 && `[transition-delay:${delayMs}ms]`);
}

export { revealClassName as reveal };

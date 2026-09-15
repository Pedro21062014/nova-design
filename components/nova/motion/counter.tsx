"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Counter - animated metric (spec 3.13, 6.14, 7.6).
 * Counts once when 50 percent visible, 1.2s cubic ease-out, tabular figures so digits
 * never shift. Reduced motion renders the final value immediately.
 */
export interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  durationMs = 1200,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const format = (n: number) =>
      n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        setDisplay(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && run()),
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, durationMs, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * ScrollProgress - 2px accent line at the top of the viewport (spec 3.27).
 * Uses a requestAnimationFrame batched scroll listener and writes a transform, so it
 * never triggers a React render per frame.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("fixed inset-x-0 top-0 z-[var(--z-toast)] h-0.5 bg-transparent", className)}
    >
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
        style={{ transform: `scaleX(${progress})`, transition: "transform 90ms linear" }}
      />
    </div>
  );
}

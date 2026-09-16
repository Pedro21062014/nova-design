"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * StickyScrolly - narrative section where scroll drives a sticky visual (spec 6.5).
 *
 * Steps are 78vh tall and activate with a -45% root margin, so exactly one step is
 * active at a time. Below 1024px and under reduced motion the stickiness is dropped and
 * each scene renders inline with its step.
 */
export interface ScrollyStep {
  id: string;
  title: string;
  copy: string;
  scene: ReactNode;
}

export function StickyScrolly({ steps, className }: { steps: ScrollyStep[]; className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("grid gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div className="hidden lg:block">
        <div className="sticky top-[calc(var(--nav-h)+24px)]">
          <div className="nv-surface p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-elevated)]">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-[420ms] ease-[var(--ease-out)]",
                    i === active
                      ? "opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 translate-y-3",
                  )}
                >
                  {step.scene}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3" aria-hidden="true">
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-[var(--hair)]">
              <div
                className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] transition-[width] duration-[300ms] ease-[var(--ease-out)]"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-[var(--fs-2xs)] tabular-nums text-[var(--fg-subtle)]">
              {active + 1}/{steps.length}
            </span>
          </div>
        </div>
      </div>

      <ol className="grid">
        {steps.map((step, i) => (
          <Step key={step.id} index={i} step={step} onActive={() => setActive(i)} />
        ))}
      </ol>
    </div>
  );
}

function Step({
  step,
  index,
  onActive,
}: {
  step: ScrollyStep;
  index: number;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) onActive();
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [onActive]);

  return (
    <li
      ref={ref}
      className="min-h-[70vh] scroll-mt-[calc(var(--nav-h)+32px)] py-8 md:min-h-[78vh] lg:py-14"
    >
      <p className="font-[var(--font-mono)] text-[var(--fs-2xs)] text-[var(--accent)]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em] text-[var(--fg)]">
        {step.title}
      </h3>
      <p className="mt-3 max-w-[52ch] text-[var(--fs-body)] leading-relaxed text-[var(--fg-muted)]">
        {step.copy}
      </p>
      <div className="mt-6 lg:hidden">{step.scene}</div>
    </li>
  );
}

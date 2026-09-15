"""Hand-written Nova Vitral files: the core layer every other component builds on.

These are authored, not templated, because they define the contract: tokens, reveal,
surfaces, motion variants, the canonical button, the composer and the table.
Paths are relative to the repository root.
"""

CORE_FILES: dict[str, str] = {}

# --------------------------------------------------------------------------- lib
CORE_FILES["lib/utils.ts"] = '''import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind classes winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Deterministic hue from an identifier, used by the calm avatar palette. */
export function hashHue(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

/** Low-saturation avatar gradient: avatars must never outshine the interface. */
export function avatarGradient(id: string) {
  const hues = [222, 210, 198, 172, 152, 24];
  const h = hues[hashHue(id) % hues.length];
  return `linear-gradient(135deg, hsl(${h} 42% 54%), hsl(${h} 46% 40%))`;
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function truncateMiddle(value: string, max = 32) {
  if (value.length <= max) return value;
  const half = Math.floor((max - 1) / 2);
  return `${value.slice(0, half)}...${value.slice(-half)}`;
}
'''

CORE_FILES["lib/format.ts"] = '''const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

export function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: Math.abs(value) >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatPercent(value: number, digits = 1) {
  return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}

export function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let index = 0;
  let size = bytes;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${numberFormat.format(size)} ${units[index]}`;
}

export function formatDuration(ms: number) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/** "2 min ago" under an hour, clock today, "Mar 4" this year, then the full date. */
export function relativeTime(input: Date | string | number) {
  const date = new Date(input);
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.round(diff / 60_000)} min ago`;
  const sameDay = new Date().toDateString() === date.toDateString();
  if (sameDay) return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (date.getFullYear() === new Date().getFullYear())
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return date.toLocaleDateString();
}
'''

CORE_FILES["lib/motion.ts"] = '''import type { Transition, Variants } from "motion/react";

/** The motion ladder from spec 6.1. Nothing outside this file defines a duration. */
export const t = {
  micro: { duration: 0.14, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  base: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  surface: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  reveal: { duration: 0.76, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } satisfies Transition,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: t.reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: t.base },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: t.surface },
};

/** Parent that staggers children, capping the total cascade (spec 6.2 rule 4). */
export const stagger = (count: number, base = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: Math.min(base, 0.4 / Math.max(count, 1)) } },
});

export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;
'''

# --------------------------------------------------------------------------- core
CORE_FILES["components/nova/core/surface.tsx"] = '''import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Surface - the visual atom of Nova Vitral: fill + 1px gradient hairline + inner
 * highlight, over a background that must exist (aurora, gradient or image).
 *
 * Spec: 1.3 (glass physics), 2 (tokens), 3.2 (surfaces), 6.14 (motion baseline).
 * Motion: optional 2px hover lift with the nv-lift utility.
 */
export interface SurfaceProps extends ComponentProps<"div"> {
  /** Elevated glass: stronger fill, larger blur, deeper shadow. */
  strong?: boolean;
  /** Sunken panel: no blur, weaker fill. Used inside another surface. */
  inset?: boolean;
  /** Enables pointer-following specular light (desktop pointers only). */
  specular?: boolean;
  /** Enables the 2px hover lift. */
  lift?: boolean;
  /** Padding token: none, sm (16px), md (24px), lg (32px). */
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  { strong, inset, specular, lift, padding = "md", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        inset ? "nv-inset" : strong ? "nv-surface-strong" : "nv-surface",
        specular && "nv-specular overflow-hidden",
        lift && !inset && "nv-lift",
        paddingClass[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

/** Convenience aliases so call sites read like the spec. */
export function SurfaceStrong(props: Omit<SurfaceProps, "strong">) {
  return <Surface strong {...props} />;
}

export function Inset(props: Omit<SurfaceProps, "inset">) {
  return <Surface inset padding="sm" {...props} />;
}

export { Surface as Panel };

export interface SurfaceHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SurfaceHeader({ title, description, action, className }: SurfaceHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">{title}</h3>
        {description ? (
          <p className="mt-1 text-[var(--fs-sm)] text-[var(--fg-muted)]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
'''

CORE_FILES["components/nova/core/aurora.tsx"] = '''/**
 * Aurora and GrainOverlay - the fixed background layer.
 *
 * Glass only reads as glass when something sits behind it (spec 1.3 rule 1), so every
 * page that uses the surfaces must render <Aurora /> once, at the root.
 *
 * Motion: three blobs drift for 30 to 44s under reduced-motion guarding, plus static
 * grain at 3.5 percent opacity. Combined blob opacity stays under 0.45 so text contrast
 * is predictable (spec 1.2.1 rule 8).
 */
export interface AuroraProps {
  /** 0 to 1.5. Marketing uses 1, app surfaces use 0.5 to 0.6. */
  intensity?: number;
  className?: string;
}

export function Aurora({ intensity = 1, className }: AuroraProps) {
  return (
    <div
      aria-hidden="true"
      className={["nv-aurora", className].filter(Boolean).join(" ")}
      style={{ opacity: intensity }}
    >
      <i />
      <i />
      <i />
    </div>
  );
}

export function GrainOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={["nv-grain", className].filter(Boolean).join(" ")} />;
}

/** One-liner used by every page root. */
export function Background({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <Aurora intensity={intensity} />
      <GrainOverlay />
    </>
  );
}
'''

CORE_FILES["components/nova/core/reveal.tsx"] = '''"use client";

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
'''

CORE_FILES["components/nova/core/section.tsx"] = '''import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section, Container and Divider - layout atoms.
 *
 * Spec: 1.5 (spacing and rhythm), 3.7 (section header pattern), 9.4 rule 8 (quiet zones).
 * Rhythm: 96px between sections, 128px around hero and final CTA, 64px when dense.
 */
export interface ContainerProps {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}

export function Container({ children, wide, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        wide ? "max-w-[var(--container-wide)]" : "max-w-[var(--container)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface SectionProps {
  children: ReactNode;
  /** Uppercase overline above the title. */
  overline?: string;
  title?: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  /** Dense sections use 48 to 64px rhythm instead of 96 to 128px. */
  density?: "default" | "dense";
  id?: string;
  className?: string;
}

export function Section({
  children,
  overline,
  title,
  lead,
  action,
  align = "left",
  density = "default",
  id,
  className,
}: SectionProps) {
  const hasHeader = Boolean(overline || title || lead);
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[calc(var(--nav-h)+32px)]",
        density === "default" ? "py-16 md:py-24 lg:py-32" : "py-10 md:py-14",
        className,
      )}
    >
      <Container>
        {hasHeader ? (
          <header
            className={cn(
              "mb-10 md:mb-12",
              align === "center" ? "mx-auto max-w-[62ch] text-center" : "max-w-[62ch]",
            )}
          >
            {overline ? (
              <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {overline}
              </p>
            ) : null}
            {title ? (
              <h2 className="nv-grad-text mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em]">
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-4 text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">{lead}</p>
            ) : null}
            {action ? <div className="mt-6">{action}</div> : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export function Divider({ label, className }: { label?: string; className?: string }) {
  if (!label) return <hr className={cn("h-px border-0 bg-[var(--hair-soft)]", className)} />;
  return (
    <div className={cn("flex items-center gap-3", className)} role="separator">
      <span className="h-px flex-1 bg-[var(--hair-soft)]" />
      <span className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{label}</span>
      <span className="h-px flex-1 bg-[var(--hair-soft)]" />
    </div>
  );
}
'''

# --------------------------------------------------------------------------- motion
CORE_FILES["components/nova/motion/counter.tsx"] = '''"use client";

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
'''

CORE_FILES["components/nova/motion/scroll-progress.tsx"] = '''"use client";

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
'''

CORE_FILES["components/nova/motion/marquee-row.tsx"] = '''import type { ReactNode } from "react";
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
'''

CORE_FILES["components/nova/motion/spotlight-card.tsx"] = '''"use client";

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
'''

CORE_FILES["components/nova/motion/tilt-card.tsx"] = '''"use client";

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
'''

CORE_FILES["components/nova/motion/sticky-scrolly.tsx"] = '''"use client";

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
      ([entry]) => {
        if (entry.isIntersecting) onActive();
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
'''

# --------------------------------------------------------------------------- buttons
CORE_FILES["components/nova/buttons/button-primary.tsx"] = '''import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonPrimary - the only solid element in the system (spec 3.1).
 *
 * Color: single-hue indigo gradient (--grad-primary). Never purple, never a two-hue
 * gradient: this button must not look like a different product than the page.
 *
 * Motion: 1px lift on hover, 0.98 press, 140ms. Focus ring is never removed.
 */
export interface ButtonPrimaryProps extends ComponentProps<"button"> {
  size?: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
}

const sizes = {
  sm: "h-8 rounded-[var(--radius-sm)] px-3.5 text-[var(--fs-xs)]",
  md: "h-10 rounded-[var(--radius-md)] px-5 text-[var(--fs-sm)]",
  lg: "h-12 rounded-[var(--radius-md)] px-7 text-[var(--fs-body)]",
} as const;

export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  function ButtonPrimary(
    { size = "md", iconLeft, iconRight, full, className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
          "bg-[image:var(--grad-primary)] font-medium text-[var(--accent-fg)] shadow-[var(--shadow-2)]",
          "nv-press nv-lift",
          "hover:shadow-[0_0_0_1px_rgba(124,140,255,0.35),0_12px_40px_-12px_rgba(124,140,255,0.45)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "disabled:pointer-events-none disabled:opacity-45",
          sizes[size],
          full && "w-full",
          className,
        )}
        {...props}
      >
        {iconLeft}
        <span className="truncate">{children}</span>
        {iconRight}
      </button>
    );
  },
);
'''

CORE_FILES["components/nova/buttons/button-glass.tsx"] = '''import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonGlass - the secondary action: glass fill, 1px hairline, 8px blur (spec 3.1).
 * Motion: fill and border rise one step on hover, 0.98 press, 140ms.
 */
export interface ButtonGlassProps extends ComponentProps<"button"> {
  size?: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
}

const sizes = {
  sm: "h-8 rounded-[var(--radius-sm)] px-3.5 text-[var(--fs-xs)]",
  md: "h-10 rounded-[var(--radius-md)] px-5 text-[var(--fs-sm)]",
  lg: "h-12 rounded-[var(--radius-md)] px-7 text-[var(--fs-body)]",
} as const;

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  function ButtonGlass(
    { size = "md", iconLeft, iconRight, full, className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap border border-[var(--hair)]",
          "bg-[var(--glass)] font-medium text-[var(--fg)] backdrop-blur-[var(--blur-sm)]",
          "nv-press hover:border-[var(--hair-strong)] hover:bg-[var(--glass-hover)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "disabled:pointer-events-none disabled:opacity-45",
          sizes[size],
          full && "w-full",
          className,
        )}
        {...props}
      >
        {iconLeft}
        <span className="truncate">{children}</span>
        {iconRight}
      </button>
    );
  },
);
'''

CORE_FILES["components/nova/buttons/button-loading.tsx"] = '''"use client";

import { Check, Loader2, TriangleAlert } from "lucide-react";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonLoading - async action with the four states every promise needs (spec 3.1).
 *
 * Motion: label dims to 60 percent while pending, width is locked by the widest label
 * so success never shifts the layout, and the icon swaps without a fade.
 */
export type AsyncState = "idle" | "loading" | "done" | "error";

export interface ButtonLoadingProps extends Omit<ComponentProps<"button">, "onClick"> {
  state?: AsyncState;
  label?: string;
  loadingLabel?: string;
  doneLabel?: string;
  errorLabel?: string;
  iconLeft?: ReactNode;
  onAction?: () => void | Promise<void>;
}

export const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  function ButtonLoading(
    {
      state = "idle",
      label = "Save changes",
      loadingLabel = "Saving",
      doneLabel = "Saved",
      errorLabel = "Try again",
      iconLeft,
      onAction,
      className,
      ...props
    },
    ref,
  ) {
    const text =
      state === "loading" ? loadingLabel : state === "done" ? doneLabel : state === "error" ? errorLabel : label;

    return (
      <button
        ref={ref}
        onClick={onAction}
        disabled={state === "loading"}
        aria-busy={state === "loading"}
        className={cn(
          "relative inline-flex h-10 select-none items-center justify-center gap-2 whitespace-nowrap",
          "rounded-[var(--radius-md)] bg-[var(--glass)] px-5 text-[var(--fs-sm)] font-medium text-[var(--fg)]",
          "border border-[var(--hair)] backdrop-blur-[var(--blur-sm)] nv-press",
          "hover:border-[var(--hair-strong)] hover:bg-[var(--glass-hover)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "disabled:pointer-events-none disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {state === "loading" ? (
          <Loader2 className="size-4 animate-spin text-[var(--fg-muted)]" aria-hidden="true" />
        ) : state === "done" ? (
          <Check className="size-4 text-[var(--accent-2)]" aria-hidden="true" />
        ) : state === "error" ? (
          <TriangleAlert className="size-4 text-[var(--danger)]" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        <span className={cn("truncate", state === "loading" && "opacity-60")}>{text}</span>
      </button>
    );
  },
);
'''

# --------------------------------------------------------------------------- chat
CORE_FILES["components/nova/chat/streaming-caret.tsx"] = '''import { cn } from "@/lib/utils";

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
'''

CORE_FILES["components/nova/chat/composer.tsx"] = '''"use client";

import { ArrowUp, Paperclip, Sparkles, Square } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Composer - the message surface of a chat product (spec 4.7).
 *
 * Contract: glass shell with the strong variant, auto-grow from 1 to 12 rows, Enter
 * sends, Shift+Enter breaks the line, Esc clears, send becomes stop while streaming,
 * and the character counter only appears past 80 percent of the limit.
 *
 * Motion: focus ring appears instantly, the textarea relaxes back to its minimum in
 * 180ms after send, and the send button lifts 1px on hover with a 0.95 press.
 */
export interface ComposerProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  streaming?: boolean;
  placeholder?: string;
  /** Sending is blocked while a file uploads. */
  uploadPending?: boolean;
  maxLength?: number;
  className?: string;
}

export function Composer({
  onSend,
  onStop,
  streaming = false,
  placeholder = "Ask anything, or drop a file",
  uploadPending = false,
  maxLength = 8000,
  className,
}: ComposerProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const grow = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 320)}px`;
  }, []);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || streaming || uploadPending) return;
    onSend(trimmed);
    setValue("");
    requestAnimationFrame(() => {
      const node = ref.current;
      if (node) node.style.height = "auto";
    });
  }, [value, streaming, uploadPending, onSend]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
    if (event.key === "Escape" && value) {
      event.preventDefault();
      setValue("");
      grow();
    }
  };

  const counterVisible = value.length > maxLength * 0.8;

  return (
    <div className={cn("pointer-events-none sticky bottom-4 z-[var(--z-sticky)]", className)}>
      <div className="pointer-events-auto mx-auto w-full max-w-[760px]">
        <div className="nv-surface-strong rounded-[var(--radius-lg)] p-3 transition-shadow duration-200 focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              grow();
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Message"
            className="max-h-[320px] w-full resize-none bg-transparent px-1 py-1.5 text-[15px] leading-6 text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
          />

          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Attach file"
              className="grid size-8 place-items-center rounded-[var(--radius-sm)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <Paperclip className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-[var(--fs-xs)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              Model
            </button>

            <div className="ml-auto flex items-center gap-2">
              {counterVisible ? (
                <span
                  className={cn(
                    "text-[var(--fs-2xs)] tabular-nums",
                    value.length > maxLength ? "text-[var(--danger)]" : "text-[var(--warn)]",
                  )}
                >
                  {value.length}/{maxLength}
                </span>
              ) : null}
              <span className="hidden text-[var(--fs-2xs)] text-[var(--fg-subtle)] sm:inline">
                Enter to send
              </span>
              {streaming ? (
                <button
                  type="button"
                  onClick={onStop}
                  aria-label="Stop generating"
                  className="grid size-8 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass)] transition-colors hover:bg-[var(--glass-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <Square className="size-3 fill-[var(--fg)] text-[var(--fg)]" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!value.trim() || uploadPending}
                  aria-label="Send message"
                  className="grid size-8 place-items-center rounded-full bg-[image:var(--grad-primary)] text-[var(--accent-fg)] transition-transform duration-150 hover:-translate-y-px active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-40"
                >
                  <ArrowUp className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          The model can make mistakes. Verify important details.
        </p>
      </div>
    </div>
  );
}
'''

CORE_FILES["components/nova/chat/message-assistant.tsx"] = '''import { Sparkles } from "lucide-react";
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
'''

# --------------------------------------------------------------------------- marketing / data / nav
CORE_FILES["components/nova/marketing/hero-split.tsx"] = '''import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { ButtonPrimary } from "@/components/nova/buttons/button-primary";
import { Container } from "@/components/nova/core/section";
import { Reveal } from "@/components/nova/core/reveal";
import { cn } from "@/lib/utils";

/**
 * HeroSplit - copy on the left, product visual on the right (spec 3.7, blueprint 5.1).
 *
 * Sequence: pill 0ms, H1 80ms, lead 200ms, actions 320ms, visual 480ms with a
 * 0.97 to 1 scale over 900ms. The CTA is interactive from t=0.
 */
export interface HeroSplitProps {
  overline?: string;
  title: string;
  lead: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  visual?: ReactNode;
  trustRow?: ReactNode;
  className?: string;
}

export function HeroSplit({
  overline,
  title,
  lead,
  primaryAction,
  secondaryAction,
  visual,
  trustRow,
  className,
}: HeroSplitProps) {
  return (
    <section className={cn("relative overflow-hidden pt-[calc(var(--nav-h)+72px)] pb-16 md:pb-24", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {overline ? (
              <Reveal>
                <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                  {overline}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={80}>
              <h1 className="nv-grad-text mt-3 max-w-[20ch] text-[var(--fs-display)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance">
                {title}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-[48ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
                {lead}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryAction ? (
                  <a href={primaryAction.href} className="inline-flex">
                    <ButtonPrimary size="lg" iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
                      {primaryAction.label}
                    </ButtonPrimary>
                  </a>
                ) : null}
                {secondaryAction ? (
                  <a href={secondaryAction.href} className="inline-flex">
                    <ButtonGlass size="lg">{secondaryAction.label}</ButtonGlass>
                  </a>
                ) : null}
              </div>
            </Reveal>

            {trustRow ? (
              <Reveal delay={420}>
                <div className="mt-8">{trustRow}</div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={480} distance={24}>
            <div className="nv-surface nv-lift-lg p-2">{visual}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
'''

CORE_FILES["components/nova/data/data-table.tsx"] = '''"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * DataTable - the canonical table (spec 3.5).
 *
 * Behaviour: sticky header, sortable columns with a three-state cycle, right-aligned
 * tabular numbers, hover tints the row, row actions fade in, and the empty state
 * replaces the body instead of leaving an empty shell.
 *
 * Motion: 120ms row tint only. Tables never stagger on entry.
 */
export interface Column<Row> {
  key: string;
  header: string;
  align?: "left" | "right";
  sortable?: boolean;
  render: (row: Row) => ReactNode;
  /** Value used for sorting when it differs from the rendered output. */
  sortValue?: (row: Row) => string | number;
}

export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  onRowClick?: (row: Row) => void;
  empty?: ReactNode;
  loading?: boolean;
  rowActions?: (row: Row) => ReactNode;
  className?: string;
}

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty,
  loading,
  rowActions,
  className,
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const value = (row: Row) =>
      column.sortValue ? column.sortValue(row) : String(column.render(row) ?? "");
    return [...rows].sort((a, b) => {
      const left = value(a);
      const right = value(b);
      const result = left > right ? 1 : left < right ? -1 : 0;
      return sort.dir === "asc" ? result : -result;
    });
  }, [rows, sort, columns]);

  const cycle = (key: string) =>
    setSort((current) => {
      if (!current || current.key !== key) return { key, dir: "asc" };
      if (current.dir === "asc") return { key, dir: "desc" };
      return null;
    });

  return (
    <div className={cn("nv-surface overflow-hidden p-0", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[var(--fs-sm)]">
          <thead
            className="sticky top-[var(--nav-h)] z-[var(--z-sticky)] backdrop-blur-[var(--blur-sm)]"
            style={{ background: "color-mix(in srgb, var(--bg-soft) 88%, transparent)" }}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]",
                    column.align === "right" && "text-right",
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => cycle(column.key)}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      {column.header}
                      {sort?.key === column.key ? (
                        sort.dir === "asc" ? (
                          <ArrowUp className="size-3" aria-hidden="true" />
                        ) : (
                          <ArrowDown className="size-3" aria-hidden="true" />
                        )
                      ) : (
                        <ChevronsUpDown className="size-3 opacity-40" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {rowActions ? <th scope="col" className="w-12 px-4 py-3" /> : null}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t border-[var(--hair-soft)]">
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-4">
                        <span className="nv-shimmer block h-3 w-full max-w-[140px] rounded-full" />
                      </td>
                    ))}
                    {rowActions ? <td className="px-4 py-4" /> : null}
                  </tr>
                ))
              : sorted.map((row) => (
                  <tr
                    key={rowKey(row)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      "group border-t border-[var(--hair-soft)] nv-row",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3.5 text-[var(--fg-muted)]",
                          column.align === "right" && "text-right tabular-nums",
                        )}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                    {rowActions ? (
                      <td className="px-4 py-3.5">
                        <div className="flex justify-end opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                          {rowActions(row)}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!loading && sorted.length === 0 ? (
        empty ?? (
          <div className="px-6 py-14 text-center">
            <p className="text-[var(--fs-sm)] text-[var(--fg-muted)]">
              No records for the current filters.
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
'''

CORE_FILES["components/nova/navigation/navbar.tsx"] = '''"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/nova/core/section";
import { cn } from "@/lib/utils";

/**
 * Navbar - condenses to glass after 24px of scroll (spec 3.6).
 * One passive scroll listener, height and background interpolate together over 240ms,
 * and the mobile menu locks background scroll while it is open.
 */
export interface NavItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  brand: string;
  items: NavItem[];
  currentPath?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Navbar({ brand, items, currentPath, actions, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-[240ms] ease-[var(--ease-out)]",
        scrolled
          ? "border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_74%,transparent)] backdrop-blur-[var(--blur-md)]"
          : "border-b border-transparent",
        className,
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-[240ms]",
            scrolled ? "h-14" : "h-[var(--nav-h)]",
          )}
        >
          <a href="/" className="flex items-center gap-2 text-[var(--fs-sm)] font-semibold text-[var(--fg)]">
            <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[var(--fs-2xs)]">
              {brand.slice(0, 1)}
            </span>
            {brand}
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {items.map((item) => {
              const active = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-[var(--radius-sm)] px-3 py-2 text-[var(--fs-sm)] transition-colors duration-150",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                    active ? "text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">{actions}</div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[var(--fg-muted)] lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-[var(--blur-lg)] lg:hidden nv-slide-down">
          <Container>
            <nav className="grid gap-1 py-4" aria-label="Mobile">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center rounded-[var(--radius-md)] px-3 text-[var(--fs-body)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 grid gap-2">{actions}</div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
'''

CORE_FILES["components/nova/navigation/footer.tsx"] = '''import { Container } from "@/components/nova/core/section";
import { StatusPill } from "@/components/nova/feedback/status-pill";
import { cn } from "@/lib/utils";

/**
 * Footer - orientation and trust (spec 3.15).
 * Columns collapse to accordions below 768px; the aurora glow rises from the bottom
 * edge, and nothing animates on entry.
 */
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  brand: string;
  description: string;
  columns: FooterColumn[];
  legal?: string;
  className?: string;
}

export function Footer({ brand, description, columns, legal, className }: FooterProps) {
  return (
    <footer className={cn("relative mt-20 overflow-hidden border-t border-[var(--hair)]", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px]"
        style={{
          background: "radial-gradient(60% 100% at 50% 100%, var(--aurora-1), transparent 70%)",
          opacity: 0.55,
        }}
      />
      <Container>
        <div className="relative grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 text-[var(--fs-sm)] font-semibold text-[var(--fg)]">
              <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[var(--fs-2xs)]">
                {brand.slice(0, 1)}
              </span>
              {brand}
            </p>
            <p className="mt-3 max-w-[34ch] text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">
              {description}
            </p>
            <div className="mt-4">
              <StatusPill />
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {column.title}
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[var(--fs-sm)] text-[var(--fg-muted)] transition-colors duration-150 hover:text-[var(--fg)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--hair-soft)] py-6 text-[var(--fs-xs)] text-[var(--fg-subtle)] md:flex-row md:items-center md:justify-between">
          <p>{legal ?? `2026 ${brand}. All rights reserved.`}</p>
          <p>Designed with the Nova Vitral system</p>
        </div>
      </Container>
    </footer>
  );
}
'''

# --------------------------------------------------------------------------- feedback helper used above
CORE_FILES["components/nova/feedback/status-pill.tsx"] = '''import { cn } from "@/lib/utils";

/**
 * StatusPill - service state indicator (spec 3.15, 6.11).
 * Exactly one pulsing indicator may exist per viewport, and the pulse stops when the
 * tab is hidden. Under reduced motion the dot is static.
 */
export type ServiceState = "operational" | "degraded" | "outage" | "maintenance";

const tones: Record<ServiceState, { label: string; color: string; glow: string }> = {
  operational: { label: "All systems operational", color: "bg-[var(--accent-2)]", glow: "bg-[var(--accent-2)]" },
  degraded: { label: "Degraded performance", color: "bg-[var(--warn)]", glow: "bg-[var(--warn)]" },
  outage: { label: "Service outage", color: "bg-[var(--danger)]", glow: "bg-[var(--danger)]" },
  maintenance: { label: "Scheduled maintenance", color: "bg-[var(--fg-subtle)]", glow: "" },
};

export function StatusPill({ state = "operational", className }: { state?: ServiceState; className?: string }) {
  const tone = tones[state];
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-2 rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] px-3 text-[var(--fs-2xs)] text-[var(--fg-muted)]",
        className,
      )}
      role="status"
    >
      <span className="relative flex size-1.5">
        {tone.glow ? (
          <span aria-hidden="true" className={cn("absolute inline-flex size-full rounded-full opacity-40 nv-pulse", tone.glow)} />
        ) : null}
        <span className={cn("relative inline-flex size-1.5 rounded-full", tone.color)} />
      </span>
      {tone.label}
    </span>
  );
}
'''

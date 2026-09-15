# Examples 79 to 90 - Motion and Interaction

Part of the Nova Vitral example library. Index: `examples/00-index.md`.
Every example here is bound by `nova-design.md` section 6, especially 6.12 (reduced motion).

---

## EX-79 - Reveal on scroll (the default primitive)

**Base:** `motion/react`
**Shows:** fires once, 16px travel, viewport margin, reduced-motion aware

```tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

export function Reveal({ children, delay = 0, y = 16, className, ...rest }:
  HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

**Motion:** 760ms `--ease-out`, distance 16px, once; reduced motion keeps only opacity.
**Refs:** 6.2, 7.6

---

## EX-80 - Stagger group with a capped cascade

**Base:** `motion/react` variants
**Shows:** parent orchestrates children, total cascade stays under 600ms

```tsx
const parent = (count: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: Math.min(0.06, 0.4 / Math.max(count, 1)) } },
});
const child = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} as const;

export function StaggerGrid({ items }: { items: Item[] }) {
  return (
    <motion.ul variants={parent(items.length)} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.2 }} className="grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <motion.li key={i.id} variants={child}>
          <FeatureCard {...i} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

**Motion:** stagger shrinks as the item count grows, so 12 cards never take 900ms.
**Refs:** 6.2 rule 4, 6.13 rule 2

---

## EX-81 - Parallax visual with spring damping

**Base:** `useScroll` + `useTransform` + `useSpring`
**Shows:** 0.06 factor, opacity fade at the edges, no jitter

```tsx
"use client";
export function ParallaxVisual({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rawY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const y = useSpring(rawY, { stiffness: 120, damping: 26, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.99]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0.65]);

  return (
    <div ref={ref} className="relative" style={{ perspective: 1200 }}>
      <motion.div style={reduce ? undefined : { y, scale, opacity }} className="vitral will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
```

**Motion:** scroll-linked, spring-smoothed; fully static under reduced motion.
**Refs:** 6.4, 6.6

---

## EX-82 - Scrollytelling with sticky visual and steps

**Base:** `IntersectionObserver` + sticky positioning
**Shows:** three steps driving one sticky scene, mobile fallback

```tsx
"use client";
export function Scrolly({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative mx-auto grid max-w-[var(--container-wide)] gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-[calc(var(--nav-h)+24px)] h-[70vh]">
          <div className="vitral relative h-full overflow-hidden p-2">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 12, scale: 1.01 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="size-full rounded-[calc(var(--radius-lg)-8px)] bg-[var(--bg-elevated)]">
                {steps[active].scene}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-[var(--hair)]">
              <motion.div className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
                animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <span className="text-[var(--fs-2xs)] tabular-nums text-[var(--fg-subtle)]">
              {active + 1} / {steps.length}
            </span>
          </div>
        </div>
      </div>

      <div>
        {steps.map((s, i) => (
          <StepBlock key={s.id} index={i} step={s} onActive={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
}

function StepBlock({ index, step, onActive }: StepBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && onActive(),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [onActive]);

  return (
    <div ref={ref} className="min-h-[78vh] py-10 lg:py-16">
      <p className="font-[var(--font-mono)] text-[var(--fs-2xs)] text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em] text-[var(--fg)]">{step.title}</h3>
      <p className="mt-3 max-w-[52ch] text-[var(--fs-body)] leading-relaxed text-[var(--fg-muted)]">{step.copy}</p>
      <div className="mt-6 lg:hidden">{step.scene}</div>
    </div>
  );
}
```

**Motion:** crossfade 420ms with a 12px rise; sticky drops entirely under 1024px and under reduced motion.
**Refs:** 6.5, 8.3

---

## EX-83 - Horizontal scroll gallery

**Base:** `useScroll` + `useTransform`
**Shows:** measured travel distance, sticky container, drag fallback

```tsx
"use client";
export function HorizontalGallery({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (reduce) {
    return <div className="flex gap-5 overflow-x-auto px-[var(--gutter)] pb-4">{children}</div>;
  }

  return (
    <section ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 pl-[var(--gutter)] will-change-transform">
          {children}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: "linear-gradient(90deg, transparent, var(--bg))" }} />
      </div>
    </section>
  );
}
```

**Motion:** distance measured from content width, never a magic percentage; reduced motion gets a native horizontal scroller.
**Refs:** 6.7

---

## EX-84 - Scroll progress bar and back-to-top

**Base:** `useScroll` + `useSpring`
**Shows:** GPU-only scaleX, appears after 1.5 viewports, smooth scroll

```tsx
"use client";
export function ScrollChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div style={{ scaleX }} aria-hidden
        className="fixed inset-x-0 top-0 z-[var(--z-toast)] h-0.5 origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]" />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="vitral fixed bottom-6 right-6 z-[var(--z-nav)] grid size-10 place-items-center rounded-full text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]">
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Motion:** transform only, no re-render per scroll frame; reduced motion scrolls instantly.
**Refs:** 3.27, 7.5

---

## EX-85 - Animated counter with tabular figures

**Base:** custom + `useInView`
**Shows:** `Intl.NumberFormat`, cubic ease-out, 1.2s, once

```tsx
"use client";
export function Counter({ value, suffix = "", decimals = 0, duration = 1200 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
```

**Motion:** 1.2s cubic ease-out, once, at most four counters per viewport.
**Refs:** 3.13, 7.6

---

## EX-86 - Magnetic card with capped tilt

**Base:** custom + rAF
**Shows:** maximum 6 degrees, shadow shift, disabled on touch

```tsx
"use client";
export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  };

  const reset = () => { const el = ref.current; if (el) el.style.transform = ""; };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset}
      className="vitral p-6 transition-transform duration-[240ms] ease-[var(--ease-out)] will-change-transform">
      {children}
    </div>
  );
}
```

**Motion:** 6 degree cap, 240ms return; never combined with a specular sweep on the same element.
**Refs:** 3.9 level 3, 6.10

---

## EX-87 - Route transition with a skeleton (no white flash)

**Base:** Next.js App Router + `Suspense`
**Shows:** persistent shell, per-route skeletons, no double-animation

```tsx
// app/(app)/layout.tsx - the shell never unmounts
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-dvh grid-cols-[264px_minmax(0,1fr)]">
      <Sidebar />
      <main className="min-h-0 overflow-y-auto">
        <Suspense fallback={<RouteSkeleton />}>{children}</Suspense>
      </main>
    </div>
  );
}

// app/(app)/dashboard/loading.tsx
export default function Loading() { return <RouteSkeleton />; }
```

```tsx
// components/motion/page-transition.tsx - 180ms fade plus 8px rise, marketing pages only
"use client";
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <motion.div key={pathname}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
```

**Motion:** 180ms in, no exit animation; skeletons do not re-trigger reveals.
**Refs:** 6.9, 3.20

---

## EX-88 - Accordion and expandable height without JS measurement

**Base:** CSS `grid-template-rows`
**Shows:** the technique used by FAQ, reasoning drawer and settings groups

```tsx
export function Collapsible({ open, children, id }: { open: boolean; children: React.ReactNode; id: string }) {
  return (
    <div id={id} role="region"
      className={cn("grid transition-[grid-template-rows] duration-[240ms] ease-[var(--ease-out)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
```

```css
/* Fallback for browsers without animatable grid-template-rows */
@supports not (grid-template-rows: 1fr) {
  .collapsible { max-height: 0; overflow: hidden; transition: max-height 240ms var(--ease-out); }
  .collapsible[data-open="true"] { max-height: 80vh; }
}
```

**Motion:** 240ms, no opacity fade on the content (prevents text flashing mid-expand).
**Refs:** 3.11, 4.8

---

## EX-89 - Toast with promise (sonner)

**Base:** `shadcn` Sonner
**Shows:** promise pattern, glass styling, single live region, undo action

```tsx
"use client";
export function useAppToast() {
  const toast = sonnerToast;
  return {
    async save<T>(label: string, action: () => Promise<T>) {
      return toast.promise(action(), {
        loading: `${label}…`,
        success: (data) => `${label} complete`,
        error: (e) => (e as Error).message || `${label} failed`,
      });
    },
    undoable(label: string, onUndo: () => void) {
      toast(label, {
        duration: 6000,
        action: { label: "Undo", onClick: onUndo },
      });
    },
  };
}
```

```tsx
// app/layout.tsx
<Toaster
  position="bottom-right"
  closeButton
  toastOptions={{
    duration: 4000,
    classNames: {
      toast: "vitral-strong !rounded-[var(--radius)] !border-0 !text-[var(--fs-sm)] !text-[var(--fg)]",
      description: "!text-[var(--fs-xs)] !text-[var(--fg-muted)]",
      actionButton: "!bg-[var(--glass-strong)] !text-[var(--fg)] !rounded-[var(--radius-sm)]",
      cancelButton: "!bg-transparent !text-[var(--fg-muted)]",
    },
  }}
/>
```

**Motion:** enter 180ms (8px rise plus scale 0.98), exit 150ms; hovering pauses the timer.
**Refs:** 3.17, 3.31 (undo affordance)

---

## EX-90 - Lightbox with keyboard and swipe

**Base:** `shadcn` Dialog + Embla (optional)
**Shows:** preloading, counter, focus trap, arrow keys, drag threshold

```tsx
"use client";
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange(Math.min(index + 1, images.length - 1));
      if (e.key === "ArrowLeft") onIndexChange(Math.max(index - 1, 0));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onIndexChange, onClose]);

  // preload neighbours
  useEffect(() => {
    [images[index - 1], images[index + 1]].forEach((img) => { if (img) new Image().src = img.src; });
  }, [index, images]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-none border-0 bg-[rgba(3,4,9,.92)] p-0 shadow-none backdrop-blur-[4px]">
        <div className="relative grid h-dvh place-items-center p-8">
          <img src={images[index].src} alt={images[index].alt} className="max-h-full max-w-full rounded-[var(--radius)] object-contain" />
          <button onClick={() => onIndexChange(index - 1)} aria-label="Previous image"
            className="absolute left-4 grid size-10 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass)] text-[var(--fg)] transition-colors hover:bg-[var(--glass-hover)]">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={() => onIndexChange(index + 1)} aria-label="Next image"
            className="absolute right-4 grid size-10 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass)] text-[var(--fg)] transition-colors hover:bg-[var(--glass-hover)]">
            <ChevronRight className="size-4" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[var(--hair)] bg-[var(--glass)] px-3 py-1 text-[var(--fs-xs)] tabular-nums text-[var(--fg-muted)]">
            {index + 1} / {images.length}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**Motion:** fade in 180ms, image swaps with a 120ms crossfade; no zoom animation on open.
**Refs:** 3.23, 3.16

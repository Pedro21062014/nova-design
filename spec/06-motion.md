## 6. Motion System

Motion is where most AI-generated pages fail. This part defines exactly what may move, how far,
how fast and why. Everything here is mandatory for scroll-driven experiences.

### 6.1 Motion vocabulary

| Concept | Rule |
|---|---|
| Micro (hover, press, focus) | 90 to 140ms, transform only, distance 1 to 4px |
| Standard (expand, swap, tab) | 200 to 240ms, `--ease-out` |
| Surface (modal, panel, hero visual) | 320 to 420ms, `--ease-out` |
| Scroll reveal | 600 to 760ms, `--ease-out`, distance 12 to 24px |
| Ambient (aurora, grain, marquee) | 20 to 60s, linear or sine, never distracting |
| Spring | Only for direct manipulation (drag, magnetic, elements following the pointer) |

Forbidden: `ease-in-out` on entrances, linear on UI transitions, durations above 900ms on
interactive elements, movement above 32px for non-hero elements, rotation of decorative shapes,
bouncing loops, continuous pulsing of more than one element per viewport.

### 6.2 Scroll reveal (the default)

Rules:

1. Reveal **once** per element. Never re-animate on scroll up (`once: true`).
2. Trigger when 25 percent of the element is visible, with a -12 percent bottom margin so the
   animation completes before the element reaches the center of the viewport.
3. Distance 16px (default), 24px for large panels, 8px for inline chips.
4. Stagger 60 to 80ms between siblings, and the total cascade must complete within 600ms after the
   section enters, regardless of the number of children (clamp the stagger).
5. The first viewport never animates on scroll: the hero animates on load with its own sequence.
6. Progressive enhancement: content is visible by default and only animates when JS is present
   (add a `.js` class on the root, drive reveals from `[data-reveal]` rules).

```tsx
// components/motion/reveal.tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({ children, delay = 0, y = 16, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, stagger = 0.06, delay = 0 }: { children: React.ReactNode; stagger?: number; delay?: number }) {
  return (
    <motion.div variants={staggerParent(stagger, delay)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={fadeUp}>{children}</motion.div>;
}
```

CSS-only fallback (no JS, for static sites):

```css
@media (prefers-reduced-motion: no-preference) {
  html.js [data-reveal] {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.76s var(--ease-out), transform 0.76s var(--ease-out);
    transition-delay: var(--reveal-delay, 0ms);
  }
  html.js [data-reveal].is-visible { opacity: 1; transform: none; }
}
```

```js
// 20 lines, dependency-free, works with any framework
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
);
document.querySelectorAll("[data-reveal]").forEach((el, i) => {
  el.style.setProperty("--reveal-delay", `${Math.min(i * 60, 360)}ms`);
  io.observe(el);
});
```

### 6.3 Orchestration and sequences

Hero load sequence (once, on mount):

| Order | Element | Delay | Motion |
|---|---|---|---|
| 1 | Announcement pill | 0ms | opacity plus y 8px |
| 2 | H1 | 80ms | opacity plus y 16px, 760ms |
| 3 | Lead | 200ms | opacity plus y 12px |
| 4 | Actions | 320ms | opacity plus y 12px |
| 5 | Trust row | 420ms | opacity |
| 6 | Visual anchor | 480ms | opacity plus scale 0.97 to 1, y 24px, 900ms |
| 7 | Ambient aurora | 600ms | fade to full over 1.2s, then drift |

Rules: never exceed 900ms total before the primary action is interactive; the CTA must be clickable
from t=0 (animation must not block pointer events or use `pointer-events: none`).

Section-level orchestration: header (overline, title, lead) reveals as one group with 40ms stagger;
the content group starts 120ms after the header; within content, cards use 60ms stagger.

### 6.4 Scroll-linked animation

Use scroll-linked motion only for: parallax depth, progress indicators, horizontal galleries,
scrollytelling narratives and sticky panels. Never for basic reveals.

```tsx
"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 120, damping: 24, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y, scale, opacity }} className="vitral will-change-transform">
        {/* product visual */}
      </motion.div>
    </div>
  );
}
```

Rules: parallax factor between 0.04 and 0.12 of scroll distance; wrap in `useSpring` with damping
above 20 to remove jitter; use `will-change: transform` only while in view; never animate `top`,
`left`, `margin` or `height` on scroll; a maximum of two scroll-linked elements per viewport.

### 6.5 Sticky scrollytelling

```
┌───────────────────────────────┬──────────────────────────┐
│  STICKY VISUAL (position: sticky, top: 15vh)             │
│  swaps its content per step    │  STEP 1  (min-height 90vh)
│                                │  STEP 2  (min-height 90vh)
│                                │  STEP 3  (min-height 90vh)
└───────────────────────────────┴──────────────────────────┘
```

Implementation contract:

1. The section is a grid of two columns on desktop, stacked on mobile (visual above, steps below).
2. The visual wrapper is `position: sticky; top: calc(var(--nav-h) + 24px); height: 70vh`.
3. Each step is a `min-height: 78vh` block with a title, 2 to 3 lines of copy and optional metric.
   Steps are triggered by an `IntersectionObserver` at `rootMargin: "-45% 0px -45% 0px"`.
4. State: exactly one active step; the visual crossfades between scenes over 420ms with a 12px rise
   and a scale of 1.01 for the incoming scene.
5. Step indicators: 4 dots on the left (desktop) or a top progress bar (mobile), 2px rail with an
   accent fill that grows with scroll progress.
6. Under reduced motion: the visual becomes static per step (no crossfade), and steps render in a
   normal stacked flow without sticky.
7. Mobile fallback under 768px: drop stickiness entirely, show each scene inline with its step.

```tsx
const steps = [
  { id: "connect", title: "Connect your sources", copy: "…", scene: <SceneConnect /> },
  { id: "model", title: "Model on real data", copy: "…", scene: <SceneModel /> },
  { id: "ship", title: "Ship in one click", copy: "…", scene: <SceneShip /> },
];
```

### 6.6 Parallax layers

- Maximum 3 layers: background aurora (factor 0.03), mid visual (0.06), foreground card (0.10).
- Text never parallaxes independently of its container, except for a hero title that shifts by
  0.02 with a slight blur ring (5 to 10 percent opacity) on the masked edges.
- Use `translate3d` to keep compositing on the GPU.
- Disable entirely when `prefers-reduced-motion: reduce` or when the device reports under 4 logical
  cores or `saveData` is enabled.

### 6.7 Horizontal scroll gallery

```tsx
"use client";
export function HorizontalGallery({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-[var(--gutter)]">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
```

Rules: only for 3 to 6 cards of equal height; always provide a drag fallback and keyboard access
(arrow buttons as well); precompute the horizontal distance from the content width minus viewport
width (never a magic percentage); a scroll hint chip ("Scroll to explore") appears on first view and
fades after the first movement; on touch, keep the vertical scroll driving the horizontal movement
(do not hijack with `preventDefault`).

### 6.8 Pinning, progress and sticky headers

- Section progress: a 2px accent line that fills as a section scrolls, pinned to the section's top
  edge, driven by `useScroll` with `layout: false`.
- Sticky section header: the section title stays under the navbar, shrinking from `--fs-h2` to
  `--fs-h4` and gaining a hairline as it pins (interpolate with `useTransform`).
- Sticky sidebars (docs, settings): `position: sticky; top: calc(var(--nav-h) + 32px); max-height: calc(100vh - var(--nav-h) - 64px); overflow-y: auto;` with a fade mask at both ends.
- Never more than one pinned element per viewport; a pinned element must release before the next
  section's content becomes readable.

### 6.9 Page and route transitions

- With the View Transitions API (Next.js `experimental.viewTransition` or `unstable_ViewTransition`):
  shared element between a card and its detail page; default transition 320ms `--ease-out` with a
  4px fade-through rise; never a full-screen wipe.
- Without the API: use a router-level 180ms opacity fade plus 8px rise on the incoming page, and
  keep the navbar and footer out of the transition (they persist).
- Suspense boundaries: each route group has a skeleton matching its final layout; never a global
  spinner. A loading skeleton must not re-trigger reveal animations when the real content replaces it.
- Exit animations are only for overlays; navigating away from a page does not animate its exit.

### 6.10 Micro-interaction catalog

| Element | Hover | Press | Focus |
|---|---|---|---|
| Primary button | translateY -1px, glow up | scale 0.98 | 2px accent outline, 2px offset |
| Glass card | translateY -4px, specular appears, hairline strengthens | scale 0.995 (only if clickable) | outline plus accent hairline |
| Nav link | underline grows from left, 180ms | - | accent underline plus outline |
| Icon button | glass fill rises one step, icon opacity 100 | scale 0.94 | outline |
| Row (list/table) | glass fill, actions fade in 120ms | - | outline plus action visibility |
| Input | hairline strengthens | - | accent border plus 3px soft ring |
| Switch | thumb widens 2px | thumb compresses 1px | outline on the track |
| Tab | text to --fg, indicator slides | - | outline on the tab, not the indicator |
| Avatar | ring becomes accent at 40 percent | - | outline |
| Copy button | icon scale 1.05 | check swap | outline plus tooltip |
| Chart point | 8px dot plus tooltip | - | tooltip appears on focus |

Rules: hover effects only under `@media (hover: hover) and (pointer: fine)`; press states must be
instant (no easing above 90ms); focus rings must never be removed, only restyled.

### 6.11 Ambient motion

- **Aurora drift**: 3 blobs, each with a 26 to 42s `translate` plus `scale` cycle, offset start
  phases, blur 80 to 140px, `mix-blend-mode: screen` optional on dark ground. Total opacity of all
  blobs must stay below 0.45 so text contrast remains stable.
- **Grain**: a 200x200 tiled noise (inline SVG data URI) at 2.5 to 3.5 percent opacity, `pointer-events: none`,
  fixed to the viewport, and animated only with a slow 8s position shift or not at all (a static
  grain is cheaper and looks identical).
- **Gradient sweep on lines**: a 2px accent line can host a 3s traveling highlight on hover of the
  parent card only.
- **Live status dot**: 2.4s pulse with a 12px expanding halo at 12 percent opacity; stop when the
  tab is hidden (`document.visibilityState`).
- Everything ambient pauses when the element leaves the viewport (`animation-play-state: paused`
  via an IntersectionObserver class) and under reduced motion.

### 6.12 Reduced motion and performance (mandatory)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .aurora, .grain, .marquee-track { animation: none !important; }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

In React, use `useReducedMotion()` from `motion/react` and render the final state directly. Never
ship a reduced-motion version that hides content.

Performance rules:

1. Animate only `transform` and `opacity` (plus `filter` and `clip-path` in rare, isolated cases).
2. Add `will-change: transform` only while the element is on screen; remove it after (permanent
   `will-change` wastes GPU memory).
3. One `IntersectionObserver` per section, not per element; share it through a context or a hook.
4. Scroll handlers: passive listeners plus `requestAnimationFrame` throttling; prefer Motion's
   `useScroll` which already batches.
5. Limit `backdrop-filter` to 6 simultaneous elements per viewport; on low-end devices
   (`navigator.hardwareConcurrency <= 4`), reduce blur to 8px or replace glass with a solid fill at
   `rgba(255,255,255,.06)` plus a hairline.
6. Avoid animating box-shadow and background-position; use a pseudo-element with opacity instead.
7. Charts and long lists must not re-render during scroll: memoize and virtualize.
8. Test with a 4x CPU throttle in DevTools; the reveal must still hold 60fps on a mid-range Android.
9. Budget: under 60ms of JS per scroll frame; under 120 elements animating simultaneously.

### 6.13 Motion QA checklist

1. Every scroll animation fires once and never re-triggers.
2. Stagger caps at 400ms total for the last sibling.
3. `prefers-reduced-motion: reduce` renders the final state with no movement and no hidden content.
4. No layout shift (CLS) caused by animations; transforms never change document height.
5. No scroll-jacking: the user can always scroll past without fighting an animation.
6. Overlays animate out on exit and then unmount.
7. Hero sequence completes within 900ms and does not delay interactivity.
8. Ambient animations pause off-screen and when the tab is hidden.
9. The page holds 60fps on a mid-range device with the aurora enabled.
10. No animation runs on hover in a coarse-pointer context.

---

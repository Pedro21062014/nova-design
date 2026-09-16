# 13 - Scroll Motion and Image Animation (copy-paste recipes)

Use this file when the request involves scroll animation, image reveals, parallax, scrollytelling or
a gallery. Every recipe here is production code: transform and opacity only, fires once, honors
`prefers-reduced-motion`, and reserves its layout box so nothing shifts.

Route the agent here from the master prompt, or paste the block below as the whole task.

---

## Prompt

```text
Read the Nova Vitral specification, sections 6.2, 6.4, 6.5, 6.7, 6.12 and 6.13:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Read the motion examples (EX-79 to EX-90) and these recipes:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/08-motion-interaction.md
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/13-scroll-motion-recipes.md

TASK
Add scroll animation to <page or section>, including the images and media.

Rules that override anything else you were about to do
1. Fires once. `once: true`, amount 0.25 (0.35 for images), margin "0px 0px -12% 0px".
2. Travel 16px (24px for large panels, 12px for chips). Never more than 24px.
3. Duration: 760ms reveals, 420ms surfaces, 240ms states, 140ms micro. Nothing above 900ms.
4. Easing: cubic-bezier(0.16, 1, 0.3, 1). No bounce, no elastic, no spring on entrances.
5. Animate transform and opacity only. Never height, top, margin, box-shadow, filter or
   background-position. Grid expansion uses grid-template-rows: 0fr to 1fr.
6. Stagger 60 to 80ms per sibling, clamped so the last child starts under 400ms.
7. At most two scroll-linked elements per viewport. Parallax factor 0.04 to 0.12, spring damped.
8. Images: reserved aspect box, `object-cover`, real `sizes`, blur placeholder, no layout shift.
9. `prefers-reduced-motion: reduce` renders every final state immediately, with nothing hidden.
10. No scroll-jacking. The visitor can always scroll past without fighting an animation.

Deliver: the motion inventory table first (element, trigger, property, from, to, duration, easing,
reduced-motion behavior), then the complete files.
```

## Motion inventory (fill this before writing code)

| Element | Trigger | Property | From to | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|---|
| Section header | in view 25% | opacity, translateY | 0 to 1, 16px to 0 | 760ms | `--ease-out` | static, visible |
| Image frame | in view 35% | veil scaleY, image scale | 1 to 0, 1.06 to 1 | 760ms | `--ease-out` | static, visible |
| Card grid | in view, staggered | opacity, translateY | 0 to 1, 16px to 0 | 600ms | `--ease-out` | static |
| Parallax image | scroll progress | translateY | -6% to +6% | continuous | linear, spring damped | static |
| Sticky scenes | scroll position | opacity, translateY | crossfade, 12px | 420ms | `--ease-out` | static, one scene |
| Gallery track | scroll progress | translateX | 0 to -(width - viewport) | continuous | linear | static, wraps |
| Counters | in view 50% | text content | 0 to value | 1200ms | cubic ease-out | final value |
| Progress bar | scroll ratio | scaleX | 0 to 1 | continuous | linear | instant |
| Navbar | scroll > 24px | background, height | transparent to glass, 72 to 56px | 240ms | `--ease-out` | same |

## 1. The default reveal

Markup that cannot host a wrapper element uses the class; everything else uses the component.

```tsx
import { Reveal } from "@/components/nova/core/reveal";

<Reveal delay={120} distance={16}>
  <Section {...} />
</Reveal>
```

```html
<!-- shared IntersectionObserver adds .nv-in; nothing re-renders while scrolling -->
<div class="nv-reveal" style="--nv-delay: 120ms; --nv-distance: 16px"> ... </div>
```

```css
.nv-reveal { opacity: 0; transform: translate3d(0, var(--nv-distance, 16px), 0);
  transition: opacity 760ms var(--ease-out), transform 760ms var(--ease-out);
  transition-delay: var(--nv-delay, 0ms); }
.nv-reveal.nv-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .nv-reveal { opacity: 1; transform: none; transition: none; }
}
```

Rules: never reveal the first viewport on scroll (the hero animates on load, complete by 900ms), and
never stagger more than eight siblings with the same offset.

## 2. Image reveal (the veil, transform-only)

The professional image entrance is a veil that uncovers the frame while the image settles from a
slight over-scale. Both properties are transforms, so it stays on the compositor.

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export interface ImageRevealProps {
  src: string;
  alt: string;
  /** Reserved box, so the layout never shifts while the image loads. */
  ratio?: string;
  sizes?: string;
  delay?: number;
  priority?: boolean;
  className?: string;
}

export function ImageReveal({
  src,
  alt,
  ratio = "16 / 9",
  sizes = "(min-width: 1024px) 60vw, 100vw",
  delay = 0,
  priority,
  className,
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  return (
    <figure
      className={["relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--hair)]", className]
        .filter(Boolean)
        .join(" ")}
      style={{ aspectRatio: ratio }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? { opacity: 0 } : { scale: 1.06, opacity: 0.6 }}
        whileInView={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>

      {/* The veil: covers the frame, then scales away from the bottom edge. */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom bg-[var(--bg)]"
        initial={reduce ? { opacity: 0 } : { scaleY: 1, opacity: 1 }}
        whileInView={reduce ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
        viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay }}
      />

      <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(6,7,12,0.72))] px-4 py-3 text-[12.5px] text-[var(--fg-muted)]">
        {alt}
      </figcaption>
    </figure>
  );
}
```

Rules for images on scroll:

- One veil per image. Do not stack a veil, a scale, a blur and a parallax on the same frame.
- The frame reserves `aspect-ratio` before the image arrives; the entrance must not move the page.
- Direction is always bottom-up or left-to-right, never both on one section.
- Over-scale never exceeds 1.08; a large zoom reads as a slideshow, not as product design.
- Clip-path wipes (`inset(12% 0)` to `inset(0)`) are acceptable for one or two hero images per page;
  they are not composited, so do not put them on a grid of twelve tiles.
- Grain or vignette stays static. Never animate a filter.

## 3. Image parallax (one or two per page)

```tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function ParallaxImage({ src, alt, strength = 0.06 }: { src: string; alt: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength * 100}%`, `${strength * 100}%`]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--hair)]"
      style={{ aspectRatio: "16 / 9" }}
    >
      {/* The inner box is oversized so the movement never exposes an edge. */}
      <motion.div className="absolute inset-[-8%]" style={{ y: reduce ? 0 : y }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </motion.div>
      <span aria-hidden="true" className="absolute inset-0 bg-[var(--grad-veil)] opacity-70" />
    </div>
  );
}
```

Rules: factor between 0.04 and 0.12 (6 percent is the default), one or two parallax frames per page
maximum, always inside an `overflow-hidden` frame with an 8 percent oversize, and never combined with
a hover tilt on the same element.

## 4. Sticky scrollytelling with image scenes

Steps are 70 to 78vh tall, activate on a -45% root margin, and swap scenes with a 420ms crossfade and
a 12px rise. Below 1024px the stickiness is dropped and each scene renders inline with its step.

```tsx
import { StickyScrolly } from "@/components/nova/motion/sticky-scrolly";

<StickyScrolly
  steps={[
    { id: "ingest", title: "Ingest", copy: "One schema, validated on arrival.", scene: <ImageReveal src="/ingest.jpg" alt="Event throughput per region" /> },
    { id: "model", title: "Model", copy: "Metrics defined once, read everywhere.", scene: <ImageReveal src="/model.jpg" alt="Metric definitions" /> },
  ]}
/>
```

Rules: three to five steps, never more; the sticky visual is the only scroll-linked element in that
section; a progress rail is mandatory so the reader knows the length; the last step must resolve to
the section's own conclusion rather than a loop.

## 5. Horizontal gallery driven by vertical scroll (use sparingly)

```tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function HorizontalGallery({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-[var(--nav-h)] overflow-hidden">
        <motion.div className="flex gap-4 will-change-transform" style={{ x: reduce ? 0 : x }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
```

Rules: at most one per page, always with a visible progress affordance, wrapping to a scrollable row
below 768px and under reduced motion, and never on a page that already has a sticky scrolly section.

## 6. Marquee, progress and counters

| Element | Recipe |
|---|---|
| Marquee | `MarqueeRow`, 40 to 60s linear, mask fade on both edges, pauses on hover and focus, becomes a wrapped static row under reduced motion |
| Scroll progress | `ScrollProgress`, 2px, `scaleX` written inside `requestAnimationFrame`, never a React render per frame |
| Counters | `Counter`, counts once at 50 percent visibility, 1.2s cubic ease-out, tabular figures so digits never reflow |
| Navbar condensation | one passive scroll listener at 24px, height and fill interpolate together over 240ms |
| Sticky section rail | `position: sticky` plus a hairline that fades in over 240ms; no JS |

## Thresholds and budgets (do not exceed)

| Metric | Budget |
|---|---|
| Entrance duration | 760ms reveals, 900ms absolute ceiling |
| Travel | 16px, 24px for large panels, 12px for chips |
| Stagger | 60 to 80ms per sibling, last sibling under 400ms |
| Scroll-linked elements | 2 per viewport, 4 per page |
| Parallax factor | 0.04 to 0.12 |
| Animated elements | under 120 simultaneously |
| Main-thread cost | under 60ms of JS per scroll frame |
| `backdrop-filter` | 6 simultaneous elements per viewport |
| Ambient loops | 20 to 60s, paused off-screen and when the tab is hidden |

## Anti-patterns (these are what make scroll animation look cheap)

1. A reveal on every single element, including the hero, at the same distance and duration.
2. Durations above 900ms, or travel above 24px, which read as lag rather than as intent.
3. `once: false`, so content re-animates every time the visitor scrolls back up.
4. Bounce, elastic or spring easing on an entrance; springs belong to dismissal and drag.
5. Animating `filter: blur()`, `box-shadow` or `backdrop-filter`, which forces repaints.
6. Two scroll-linked effects fighting in the same viewport (parallax plus a pinned gallery).
7. Images that animate before their box is reserved, pushing the page around.
8. A parallax frame with a shallow oversize, so a bright edge appears at the travel limit.
9. Scroll-jacking, snap points on long pages, or hijacked wheel events.
10. Motion that ignores `prefers-reduced-motion`, or that hides content when animations are disabled.

## Verification before answering

1. Scroll the page once at 1440px and once at 375px: nothing re-triggers, nothing jumps, nothing is
   left invisible.
2. Toggle `prefers-reduced-motion: reduce`: every element is present and still, in its final state.
3. Confirm the images reserve their boxes: no cumulative layout shift in the performance panel.
4. Count the animating elements per viewport and the scroll-linked elements per page against the
   budget table above, and state both numbers in your answer.
5. Confirm no animation exceeds 900ms and no travel exceeds 24px, and say so in one line.

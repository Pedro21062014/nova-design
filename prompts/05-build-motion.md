# 05 - Build Motion (scroll animation, scrollytelling, micro-interactions)

Use when the page is structurally done and needs the motion layer, or when a request is specifically
about animation.

---

## Prompt

```text
Read the Nova Vitral specification, part 6 in full (sections 6.1 to 6.13), plus 1.8, 2.6, 9.5 and 9.7:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Read the motion example file (EX-79 to EX-90):
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/08-motion-interaction.md

TASK
Add the motion layer to <page or component>.

Scope
- Reveal on scroll for: <sections or "all sections except the hero">
- Orchestrated sequences: <hero load order, or "none">
- Scroll-linked: <parallax visual / horizontal gallery / scrollytelling / progress bar / none>
- Micro-interactions: <hover lifts, specular, indicator slides, or "default catalog">
- Ambient: <aurora drift, grain, status pulse, or "default">

Constraints (mandatory)
1. Reveals fire once: viewport once, amount 0.25, margin "0px 0px -12% 0px", duration 760ms with
   cubic-bezier(0.16, 1, 0.3, 1), travel 16px (24px for large panels).
2. Stagger 60 to 80ms per sibling, clamped so the last child starts under 400ms.
3. Only transform and opacity are animated. No animating height, top, margin, box-shadow or
   background-position.
4. At most two scroll-linked elements per viewport; parallax factor between 0.04 and 0.12, spring
   damped with damping >= 24.
5. Every animation has a prefers-reduced-motion path that renders the final state immediately.
6. Ambient loops run 20 to 60s, pause off-screen and when the tab is hidden, and never exceed a
   combined 0.45 opacity of moving background light.
7. No scroll-jacking. The user can always scroll past.
8. Hover effects only under @media (hover: hover) and (pointer: fine).
9. Exit animations for overlays: 120 to 180ms, then unmount (never left in the DOM).
10. Test with 4x CPU throttle: reveals still hold 60fps on a mid-range device.

Deliver
1. Plan in five lines with the motion inventory (element, trigger, duration, distance, easing).
2. Complete files: components/motion/*, updated sections, and the CSS keyframes you add.
3. A performance note: number of animating elements per viewport and the reduced-motion fallback.
4. Three closing bullets: built, omitted, next step.
```

## Color gate and motion floor (apply before anything else)

Closed set: `--bg`, `--bg-soft`, `--bg-elevated`, `--fg`, `--fg-muted`, `--fg-subtle`, `--glass`,
`--glass-strong`, `--glass-dim`, `--hair`, `--hair-strong`, `--accent` (#7c8cff), `--accent-2`
(#62e9d6), `--warn`, `--danger`, `--grad-primary`, `--grad-live`, `--grad-hairline`. Nothing else.
Rejected without discussion: `purple`, `violet`, `fuchsia`, `magenta`, `indigo-400/500/600` as fills,
`#8b5cf6`, `#a855f7`, `#7c3aed`, `oklch(` with high chroma, colored glows, multi-hue gradients,
gradient text outside a hero H1, more than one accent per viewport.

Replace: a purple or vivid fill becomes `var(--glass)` plus a `var(--hair)` border; a colored glow
becomes nothing, or a 1px `--hair-strong` ring on hover; a saturated status block becomes a dot, an
icon or a 12 percent chip in `--accent-2`, `--warn` or `--danger`; a multi-hue gradient becomes
`--grad-primary` on the single primary action, or a neutral surface.

Motion floor (a component with none is incomplete): an entrance (`nv-fade-up`, 16px, 760ms, once), a
hover response (2px lift or a fill step, 240ms), a press (0.98, 140ms), and a visible focus ring.
Scroll effects for sections and images: reveal, image veil uncover, staggered grid, one scroll-linked
element (parallax 0.04 to 0.12 or sticky scrollytelling), counters at 50 percent visibility. Recipes:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/13-scroll-motion-recipes.md

## Motion inventory template (the agent should fill this before coding)

| Element | Trigger | Property | From → To | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|---|
| Section header | in view 25% | opacity, y | 0 → 1, 16px → 0 | 760ms | `--ease-out` | opacity only, 0ms |
| Cartão do bento | in view, staggered | opacity, y | 0 → 1, 16px → 0 | 600ms | `--ease-out` | static |
| Hero visual | mount | opacity, y, scale | 0 → 1, 24px → 0, 0.97 → 1 | 900ms | `--ease-out` | static |
| Navbar | scroll > 24px | background, height | transparent → glass, 72 → 56px | 240ms | `--ease-out` | same |
| Card hover | pointer hover | translateY | 0 → -4px | 240ms | `--ease-out` | none (no hover on touch) |
| Scroll progress | scroll | scaleX | 0 → 1 | continuous | linear | instant |
| Aurora | ambient | transform | drift 3 to 8% | 30 to 44s | ease-in-out | static |

## Images and media on scroll

Images are the element that most often betrays amateur work: they fade in over 1.5s, they jump because
nobody reserved the box, or they sit still while everything around them moves.

Rules

1. Reserve the box. `aspect-ratio` on the frame, `object-cover` on the media, real `sizes`, blur
   placeholder. No layout shift, ever.
2. One entrance per image: the veil uncover (a `scaleY` panel over the frame) plus a settle from
   1.06 scale, 760ms, once. Do not stack a veil, a scale, a blur and a parallax on the same frame.
3. Parallax only for one or two images per page, factor 0.04 to 0.12, inside an `overflow-hidden`
   frame with an 8 percent oversize so no edge is exposed.
4. Clip-path wipes are allowed for one or two hero images; they are not composited, so never on a
   grid of tiles.
5. Never animate a filter, a grain layer or a vignette.
6. Under `prefers-reduced-motion: reduce`, the image is present, at its final scale, with no veil.

Copy-paste implementations: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/13-scroll-motion-recipes.md (image veil, parallax frame,
sticky scrollytelling, horizontal gallery, marquee, counters, progress).

## Follow-up prompts

**Fix over-animation:**

```text
Audit the motion in <files> against spec 6.1, 6.2 and 9.5 items 11 to 18. List every animation that
is too long, too large, repeated, or decorative, and remove or reduce it. Show the diffs.
```

**Add scrollytelling:**

```text
Add a sticky scrollytelling section per spec 6.5 with <n> steps, using IntersectionObserver at
-45% rootMargin, a 420ms crossfade with a 12px rise between scenes, a progress rail, a mobile
fallback that drops stickiness, and a reduced-motion fallback with static scenes.
```

**Profile performance:**

```text
List every element that animates during scroll in <page>, give the compositor cost of each, and
reduce the total to under 120 simultaneously animating elements with under 60ms of JS per frame.
Then show the optimized code.
```

## Common mistakes to correct

1. Re-animating on every scroll up (`once: false`) — forbidden.
2. 1.5s durations — capped at 900ms for entrances.
3. Animating `backdrop-filter` or `box-shadow` — replace with an opacity layer.
4. Three pulsing elements in one viewport — allow one live indicator.
5. Reveal on the first viewport on scroll — the hero animates on load instead.
6. Hover scale 1.05 on cards — use a 2 to 4px translate.
7. Parallax without spring damping — produces visible jitter.

# Motion components

Motion primitives: scroll, parallax, counters, tilt, marquees, transitions.

24 components. Every file is a self-contained React + TypeScript + Tailwind
component that renders no purple, reserves its own layout box and ships motion. Icons come
from `lucide-react` only.

```bash
# from the repository root
cp -r components/nova/ <your-app>/components/nova/
cp -r lib/ <your-app>/lib/
```

Then import the theme once, before any component renders:

```css
@import "tailwindcss";
@import "../theme/nova-theme.css";
```

## Components

| Name | Kind | What it does | File |
| --- | --- | --- | --- |
| `counter` | `motion` | Counts to a value once on view with tabular figures. | [Counter](./counter.tsx) |
| `parallax-visual` | `motion` | Scroll-linked vertical drift with spring damping. | [ParallaxVisual](./parallax-visual.tsx) |
| `parallax-layer` | `motion` | Single depth layer for multi-layer parallax scenes. | [ParallaxLayer](./parallax-layer.tsx) |
| `scroll-progress` | `motion` | Top progress bar driven by scroll ratio, GPU only. | [ScrollProgress](./scroll-progress.tsx) |
| `scroll-linked-scale` | `motion` | Scales a visual as it enters and leaves the viewport. | [ScrollLinkedScale](./scroll-linked-scale.tsx) |
| `sticky-scrolly` | `motion` | Sticky visual driven by a sequence of narrative steps. | [StickyScrolly](./sticky-scrolly.tsx) |
| `horizontal-scroll` | `motion` | Vertical scroll that drives a horizontal gallery. | [HorizontalScroll](./horizontal-scroll.tsx) |
| `marquee-row` | `motion` | Infinite marquee with mask fade and hover pause. | [MarqueeRow](./marquee-row.tsx) |
| `tilt-card` | `motion` | Capped 6 degree pointer tilt with spring return. | [TiltCard](./tilt-card.tsx) |
| `spotlight-card` | `motion` | Pointer-following radial light on a glass surface. | [SpotlightCard](./spotlight-card.tsx) |
| `magnetic-button` | `motion` | Button that leans toward the pointer within limits. | [MagneticButton](./magnetic-button.tsx) |
| `text-reveal` | `motion` | Word-by-word reveal for headlines. | [TextReveal](./text-reveal.tsx) |
| `blur-in` | `motion` | Blur and fade entrance for media and images. | [BlurIn](./blur-in.tsx) |
| `scale-in` | `motion` | Scale entrance reserved for modals and featured cards. | [ScaleIn](./scale-in.tsx) |
| `fade-in` | `motion` | Minimal opacity entrance for dense regions. | [FadeIn](./fade-in.tsx) |
| `slide-in-x` | `motion` | Horizontal entrance for drawers and side panels. | [SlideInX](./slide-in-x.tsx) |
| `list-reorder` | `motion` | Animated reordering for lists and queues. | [ListReorder](./list-reorder.tsx) |
| `layout-tabs` | `motion` | Tabs whose indicator slides between items. | [LayoutTabs](./layout-tabs.tsx) |
| `accordion-motion` | `motion` | Height expansion via grid-template-rows, no JS measurement. | [AccordionMotion](./accordion-motion.tsx) |
| `modal-motion` | `motion` | Enter and exit animation pair for dialogs. | [ModalMotion](./modal-motion.tsx) |
| `toast-motion` | `motion` | Stacking enter and exit choreography for toasts. | [ToastMotion](./toast-motion.tsx) |
| `page-transition` | `motion` | 180ms fade and rise between marketing routes. | [PageTransition](./page-transition.tsx) |
| `typewriter` | `motion` | Typed text with a caret, pauses on long stalls. | [Typewriter](./typewriter.tsx) |
| `countdown-digits` | `motion` | Launch countdown with digit swap, no bouncing. | [CountdownDigits](./countdown-digits.tsx) |

## Hand-authored files

- [Counter](./counter.tsx) - hand-authored in this category.
- [ScrollProgress](./scroll-progress.tsx) - hand-authored in this category.
- [StickyScrolly](./sticky-scrolly.tsx) - hand-authored in this category.
- [MarqueeRow](./marquee-row.tsx) - hand-authored in this category.
- [TiltCard](./tilt-card.tsx) - hand-authored in this category.
- [SpotlightCard](./spotlight-card.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Entrance fires once, 16px of travel, ease-out, and renders the final state instantly under reduced motion.

Full ladder, easing and reduced-motion rules: spec sections 3.9, 6.1 to 6.14 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Entrances longer than 900ms, or travel above 24px on desktop.
- Animating layout properties (top, height, margin) instead of transform and opacity.
- A second scroll-linked scene on the same page as an existing one.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

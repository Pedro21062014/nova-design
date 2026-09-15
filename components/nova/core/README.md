# Core components

Core primitives: surfaces, aurora, reveal, section and layout atoms.

10 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `surface` | `surface` | Base glass surface with hairline edge and inner highlight. | [Surface](./surface.tsx) |
| `surface-strong` | `surface` | Elevated glass panel for modals, popovers and hero visuals. | [SurfaceStrong](./surface.tsx) |
| `inset` | `surface` | Sunken panel for code, metadata and dense groups. | [Inset](./surface.tsx) |
| `aurora` | `aurora` | Fixed aurora background with three drifting blobs and grain. | [Aurora](./aurora.tsx) |
| `grain-overlay` | `aurora` | Noise layer that keeps large blurred areas from banding. | [GrainOverlay](./aurora.tsx) |
| `reveal` | `motion` | IntersectionObserver reveal that fires once and respects reduced motion. | [Reveal](./reveal.tsx) |
| `reveal-group` | `motion` | Staggered container that animates children with a capped cascade. | [RevealGroup](./reveal-group.tsx) |
| `section` | `section` | Section wrapper with overline, title, lead and quiet-zone spacing. | [Section](./section.tsx) |
| `container` | `section` | Max-width container with responsive gutters. | [Container](./section.tsx) |
| `divider` | `divider` | Hairline divider with optional centered label. | [Divider](./section.tsx) |

## Hand-authored files

- [Surface](./surface.tsx) - hand-authored in this category.
- [SurfaceStrong](./surface.tsx) - hand-authored in this category.
- [Inset](./surface.tsx) - hand-authored in this category.
- [Aurora](./aurora.tsx) - hand-authored in this category.
- [GrainOverlay](./aurora.tsx) - hand-authored in this category.
- [Reveal](./reveal.tsx) - hand-authored in this category.
- [Section](./section.tsx) - hand-authored in this category.
- [Container](./section.tsx) - hand-authored in this category.
- [Divider](./section.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Entrance fires once, 16px of travel, ease-out, and renders the final state instantly under reduced motion.
- Hairline fades from 0 to full opacity over 240ms when it enters the viewport.
- Header reveals with a 60ms cascade; the body is never staggered more than 400ms in total.
- Hover lift of 2px over 240ms, or an 8px rise on first paint when it is the last element of a region.
- Three blobs drift for 30 to 44s on transform only; frozen at 0 opacity change under reduced motion.

Full ladder, easing and reduced-motion rules: spec sections 1.3, 2, 3.2, 6.14 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Glass on a flat dark fill: without an aurora, gradient or image behind it, blur reads as gray fog.
- More than two stacked blur layers per region; each one costs compositing work and dulls the text.
- Removing the hairline because the surface already has a shadow. They do different jobs.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

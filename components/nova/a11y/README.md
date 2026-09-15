# A11y components

Accessibility primitives that ship with every page.

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
| `skip-link` | `a11y` | First focusable element that jumps to main. | [SkipLink](./skip-link.tsx) |
| `live-region` | `a11y` | Polite or assertive announcements for async work. | [LiveRegion](./live-region.tsx) |
| `focus-trap-wrapper` | `a11y` | Keeps focus inside overlays. | [FocusTrapWrapper](./focus-trap-wrapper.tsx) |
| `keyboard-nav-list` | `a11y` | List navigable with arrows and typeahead. | [KeyboardNavList](./keyboard-nav-list.tsx) |
| `described-by-hint` | `a11y` | Wires hint and error ids to a field. | [DescribedByHint](./described-by-hint.tsx) |
| `reduced-motion-guard` | `a11y` | Renders the final state without motion. | [ReducedMotionGuard](./reduced-motion-guard.tsx) |
| `landmark-region` | `a11y` | Named landmark wrapper for sections. | [LandmarkRegion](./landmark-region.tsx) |
| `accessible-icon-button` | `a11y` | Icon button with a guaranteed label. | [AccessibleIconButton](./accessible-icon-button.tsx) |
| `sr-summary` | `a11y` | Screen-reader summary for dense widgets. | [SrSummary](./sr-summary.tsx) |
| `contrast-safe-badge` | `a11y` | Badge that picks a readable foreground. | [ContrastSafeBadge](./contrast-safe-badge.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Announcements do not animate; the visible focus ring appears in 140ms and is never removed.

Full ladder, easing and reduced-motion rules: spec sections 9.1, 9.2, 9.3 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- aria-label duplicating visible text.
- Focus traps without an escape route.
- Motion that ignores prefers-reduced-motion.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

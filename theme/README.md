# theme

The Nova Vitral theme is the file that makes everything else work: it defines the tokens,
remaps every shadcn/ui semantic variable to the Nova neutral palette, and ships the minimum
motion baseline as utility classes.

## Files

| File | Purpose |
|---|---|
| `nova-theme.css` | Tokens, Tailwind v4 mapping, **shadcn override (kills the default purple)**, base layer, `nv-*` surface and motion utilities |

## Install

**Next.js (App Router)**

```css
/* app/globals.css */
@import "tailwindcss";
@import "../theme/nova-theme.css";
```

**Tailwind v3** - keep the directives first, then import:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "../theme/nova-theme.css";
```

**Plain HTML**

```html
<link rel="stylesheet" href="./theme/nova-theme.css">
```

## Why this file exists (read this if you saw a purple button)

shadcn/ui ships a saturated purple for `--primary`. Every component it provides uses
`bg-primary`, `text-muted-foreground`, `ring-ring`, `border-input` or `bg-accent`, so a pasted
component renders purple **even when the surrounding code follows the design spec**. The same thing
happens with older themes that use `oklch(0.6 0.2 280)` values.

`nova-theme.css` fixes it at the source by remapping every shadcn variable:

| shadcn variable | Nova value | Visible effect |
|---|---|---|
| `--primary` | `#7c8cff` (restrained indigo) | Buttons stop being purple |
| `--primary-foreground` | `#ffffff` | Text on the primary action |
| `--background` / `--foreground` | `#06070c` / `#f5f7ff` | Dark ground and legible text |
| `--card` / `--popover` | `--glass` / `--bg-elevated` | Panels join the glass system |
| `--muted-foreground` | `#a8b0c8` | Body copy contrast |
| `--border` / `--input` | `rgba(255,255,255,.10)` | 1px hairlines instead of gray boxes |
| `--ring` | `--accent` | Focus rings in the system accent |
| `--destructive` | `#ff6b81` | Danger states |
| `--radius` | `16px` | Concentric radii |

If a component still looks purple after this, grep the file for a hardcoded colour:

```bash
grep -rEn "oklch|#[0-9a-fA-F]{3,8}|violet|purple|fuchsia|indigo-" components app --include="*.tsx" \
  | grep -v "nova-theme.css"
```

## Minimum motion baseline

The `nv-*` utilities cover spec section 6.14, so a component is never dead:

| Class | Effect | Use on |
|---|---|---|
| `nv-lift` | 2px hover lift plus shadow | cards, tiles, list rows |
| `nv-lift-lg` | 4px hover lift | featured cards, hero visuals |
| `nv-press` | `scale(.98)` on press, instant | buttons, icon buttons |
| `nv-arrow` | 2px nudge | links and CTAs with an arrow |
| `nv-row` | background tint on hover | table rows |
| `nv-shimmer` | 1.6s sweep | skeletons, streaming labels |
| `nv-reveal` + `nv-in` | 16px fade-up, fires once | any section or card entry |
| `nv-fade-up`, `nv-scale-in`, `nv-slide-right`, `nv-slide-down` | mount animations | popovers, dialogs, drawers, toasts |
| `nv-specular` | pointer-following highlight | interactive cards (set `--nv-mx/--nv-my`) |
| `nv-pulse` | 2.4s opacity pulse | one live indicator per viewport |
| `nv-caret` | streaming cursor | chat / AI text |

All of them respect `prefers-reduced-motion`, and the file also raises glass opacity under
`prefers-contrast: more` while disabling the aurora.

## Related components

- `components/nova/core/reveal.tsx` - the IntersectionObserver that adds `nv-in`
- `components/nova/core/surface.tsx` - `<Surface>` and `<SurfaceStrong>` wrappers
- `components/nova/motion/*` - 24 motion primitives (parallax, counter, tilt, scrollytelling)

## 1. Design Foundations

### 1.1 Design philosophy

Nova Vitral is a minimalism with depth. The system is defined by four commitments:

1. **Dark ground, lit subjects.** The page is a dark room. Interfaces are lit objects inside it.
   Every panel is a surface that catches light, never a filled rectangle.
2. **One idea per screen.** Each viewport carries a single message, one primary action and one
   visual anchor. Density is allowed only in data contexts (dashboards, tables, chat).
3. **Motion explains, never entertains.** Animation exists to show hierarchy, causality and
   continuation. If removing an animation costs the user no information, remove it.
4. **Craft in the details.** Hairlines, optical alignment, focus rings, empty states, cursor
   states, exit animations. Craft is what separates a professional page from a template.

The emotional target: calm, expensive, technical. Think of a precision instrument photographed
in a dark studio. Not playful, not corporate blue, not neon-heavy.

### 1.2 Color system

Nova Vitral is a dark-first system with an optional light mode. Color is rationed: roughly
90 percent neutral ground, 9 percent glass white, 1 percent accent.

**Neutral ground (dark mode, default)**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#06070c` | Page ground |
| `--bg-soft` | `#0a0c14` | Section alternation, sticky bars |
| `--bg-elevated` | `#0e1120` | Rare opaque elevation, code blocks |
| `--fg` | `#f5f7ff` | Primary text |
| `--fg-muted` | `#a8b0c8` | Body copy, secondary labels |
| `--fg-subtle` | `#6b7490` | Captions, metadata, placeholders |
| `--hair` | `rgba(255,255,255,.10)` | Default 1px border |
| `--hair-strong` | `rgba(255,255,255,.18)` | Hover and focus border |
| `--glass` | `rgba(255,255,255,.055)` | Panel fill |
| `--glass-strong` | `rgba(255,255,255,.09)` | Elevated panel, active item |

**Accents**

| Token | Value | Meaning | Allowed uses |
|---|---|---|---|
| `--accent` | `#7c8cff` | Primary action, focus | Primary button, links, focus ring, active tab |
| `--accent-2` | `#62e9d6` | Success, live, streaming | Status dots, progress, positive deltas |
| `--accent-3` | `#c084fc` | Creative, generative | Gradient partner, AI features, glow |
| `--warn` | `#f5b544` | Caution | Rate limits, destructive warnings |
| `--danger` | `#ff6b81` | Error, destructive | Errors, delete, negative deltas |

Accent rule: at most **two accents visible per viewport**. `--accent` plus one of the others.
Never place three accents in the same component.

**Aurora hues** (background light only, always blurred)

```css
--aurora-1: rgba(124, 140, 255, 0.28); /* indigo  */
--aurora-2: rgba(98, 233, 214, 0.20);  /* teal    */
--aurora-3: rgba(192, 132, 252, 0.22); /* violet  */
--aurora-4: rgba(255, 138, 101, 0.14); /* ember   */
```

**Gradient recipes**

```css
--grad-primary: linear-gradient(135deg, #7c8cff 0%, #c084fc 100%);
--grad-live: linear-gradient(90deg, #62e9d6 0%, #7c8cff 100%);
--grad-hairline: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.04));
--grad-text: linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,255,255,.62));
--grad-veil: linear-gradient(180deg, rgba(6,7,12,0) 0%, rgba(6,7,12,.9) 100%);
```

**Light mode** is derived, not inverted by hand. Keep the same structure, invert the ground and
reduce accent saturation by 8 percent. Details in Section 2.9.

### 1.3 Glass physics

Glass is the signature of the system and the most mishandled element. Rules:

1. **Backdrop requirement.** Glass only sits above a non-flat background: aurora, image, gradient,
   or another panel. On an empty background it is forbidden.
2. **Blur budget.** `--blur-sm` for small chips, `--blur` for cards and navbars, `--blur-lg` for
   hero panels and modals. Never exceed 40px, diminishing returns after that.
3. **Saturation compensation.** `backdrop-filter: blur(18px) saturate(140%)`. The saturation boost
   is what makes the light behind the panel feel real.
4. **Three-layer anatomy.** Every glass surface is built from exactly three layers:
   - *fill*: `--glass` or `--glass-strong`
   - *edge*: 1px hairline, brighter on top, `--grad-hairline` on a masked border
   - *light*: inner top highlight `inset 0 1px 0 rgba(255,255,255,.10)` plus a specular sweep on hover
5. **Nesting rule.** A panel inside a panel does not add blur. It raises border contrast and
   reduces fill opacity. This avoids the gray mud look of stacked backdrops.
6. **Grain.** A fixed noise layer at 2.5 to 3.5 percent opacity over the whole page. Without grain,
   large blurred areas band on cheap displays.
7. **Legibility.** Body text on glass must reach 4.5:1 against the worst-case backdrop. If unsure,
   darken the fill instead of adding text shadow.

Reference implementation: Section 7.2.

### 1.4 Typography

**Families**

| Role | Family | Fallback | Notes |
|---|---|---|---|
| Display / UI | Geist | Inter, system-ui | Geometric, tight, modern |
| Body | Inter | system-ui, sans-serif | Excellent hinting on dark ground |
| Code / mono | Geist Mono | JetBrains Mono, ui-monospace | Tabular numbers for data |
| Alternative display | Satoshi, General Sans | Inter | Only when the brand requires it |

Load with `next/font` so there is no layout shift and no external request at runtime.

**Scale** (fluid, `clamp`, 1.25 ratio at desktop, tighter at mobile)

| Token | Size | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 7vw, 5.5rem)` | 0.96 | -0.04em | 600 | Hero H1 |
| `--fs-h1` | `clamp(2.25rem, 5vw, 3.5rem)` | 1.04 | -0.03em | 600 | Page title |
| `--fs-h2` | `clamp(1.75rem, 3.5vw, 2.5rem)` | 1.12 | -0.025em | 600 | Section title |
| `--fs-h3` | `1.375rem` | 1.25 | -0.02em | 600 | Card title, subsection |
| `--fs-h4` | `1.125rem` | 1.35 | -0.015em | 600 | Group label |
| `--fs-lead` | `clamp(1.0625rem, 1.6vw, 1.25rem)` | 1.6 | -0.01em | 400 | Subtitle under hero |
| `--fs-body` | `1rem` | 1.65 | 0 | 400 | Body |
| `--fs-sm` | `0.875rem` | 1.55 | 0.005em | 400 | Secondary UI |
| `--fs-xs` | `0.8125rem` | 1.45 | 0.01em | 500 | Labels, badges |
| `--fs-2xs` | `0.6875rem` | 1.4 | 0.06em | 500 | Overline, uppercase |

**Rules**

- Maximum measure is 68 characters (`max-width: 62ch` for long copy, `46ch` for leads).
- Headings use `text-wrap: balance`. Body paragraphs use `text-wrap: pretty`.
- Hero headings get a vertical gradient fill (`--grad-text`) with a `background-clip`. This is the
  single most recognizable touch of the system.
- Overlines are uppercase, 0.06em tracking, `--fg-subtle`.
- Numbers in tables and metrics use `font-variant-numeric: tabular-nums`.
- Never justify text. Never use pure white `#fff` for long copy; use `--fg` or `--fg-muted`.

### 1.5 Spacing and layout

**Spacing scale** (4px base, geometric above 32)

```
--s-1: 4px    --s-2: 8px    --s-3: 12px   --s-4: 16px
--s-5: 20px   --s-6: 24px   --s-8: 32px   --s-10: 40px
--s-12: 48px  --s-16: 64px  --s-20: 80px  --s-24: 96px
--s-32: 128px --s-40: 160px --s-48: 192px
```

**Vertical rhythm**

| Context | Space above | Space below |
|---|---|---|
| Section (standard) | `96px / 128px` | `96px / 128px` |
| Section (dense, dashboard) | `48px` | `48px` |
| Heading to paragraph | `16px` | - |
| Paragraph to action | `32px` | - |
| Card padding | `24px` | `24px` |
| Card padding (large) | `32px` to `40px` | same |

**Grid**

- Container: `max-width: 1200px`, gutters 20px mobile, 32px tablet, 40px desktop.
- A "wide" container of 1440px is allowed only for bento grids and full-bleed galleries.
- 12 columns desktop, 6 tablet, 4 mobile. Feature grids: 3 / 2 / 1. Bento: 6 / 3 / 1.
- Section header pattern: overline, title, lead, action, centered or left aligned never mixed.

**Quiet zone**: any dense block (table, chat, chart) gets at least 96px of separation from the
next block. This single rule does more for perceived quality than any other.

### 1.6 Radius, elevation and borders

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `10px` | chips, inputs, small buttons |
| `--radius` | `16px` | buttons, cards |
| `--radius-lg` | `24px` | large panels, bento cells |
| `--radius-xl` | `32px` | hero panels, modals, media |
| `--radius-full` | `999px` | pills, avatars, dots |

**Elevation ladder** (shadow is subtle; light does the work)

```css
--shadow-1: 0 1px 2px rgba(0,0,0,.30);                              /* resting card      */
--shadow-2: 0 12px 32px -12px rgba(0,0,0,.55);                      /* raised card       */
--shadow-3: 0 32px 80px -24px rgba(0,0,0,.70);                      /* modal, hero panel */
--shadow-glow: 0 0 0 1px rgba(124,140,255,.35), 0 12px 40px -12px rgba(124,140,255,.45);
```

Concentric radius rule: an inner element's radius equals the outer radius minus the padding.
A 24px panel with 12px padding holds a 12px inner element.

**Border discipline**

- One visible border per surface, never a border plus a heavy shadow plus a gradient.
- Dividers between list rows use `--hair` at 1px, inset by the row padding.
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 2px;` on `:focus-visible` only.

### 1.7 Iconography

- Library: `lucide-react` (stroke 1.5px, 24px grid, `currentColor`).
- Sizes: 14 (inline), 16 (buttons, list), 18 (nav), 20 (feature icon), 24 (hero mark).
- Feature icons never stand alone. Pair every icon with a glass tile: 40px box, `--radius-sm`,
  `--glass`, hairline, accent-tinted icon.
- No emoji in production UI. No filled icon sets mixed with outlined sets.
- Logos are monochrome at 60 percent opacity, rising to 100 percent on hover. A logo cloud with
  saturated brand colors breaks the system.

### 1.8 Motion principles

1. **Duration ladder.** 140ms micro, 240ms standard, 420ms large surfaces, 760ms scroll reveals.
   Anything above 900ms feels slow on repeat visits.
2. **Easing.** Enter with `--ease-out` (`cubic-bezier(.16,1,.3,1)`); exit with a shorter,
   linear-ish curve. Never use `ease-in-out` for entrances.
3. **Distance.** Reveal translation is 12 to 24px. Hover lift is 2 to 4px. Scale on press is 0.98.
   Large movement is reserved for dramatic moments (hero, scrollytelling).
4. **Stagger.** 40 to 80ms between siblings, capped so the last child starts under 400ms.
5. **One animation per element.** A card that lifts does not also rotate, glow and scale.
6. **Animate only** `transform`, `opacity`, and in rare cases `filter` and `clip-path`.
7. **Exit matters.** Every modal, toast, tooltip and menu has an exit animation of 120 to 180ms.
8. **Reduced motion.** Every rule has a non-animated fallback. See Section 6.12.

### 1.9 Density modes

| Mode | Row height | Font | Padding | Use |
|---|---|---|---|---|
| Comfortable (default) | 56px | `--fs-body` | `--s-6` | Marketing, chat, settings |
| Compact | 40px | `--fs-sm` | `--s-4` | Tables, sidebars, admin |
| Dense | 32px | `--fs-xs` | `--s-3` | Data grids, logs, dev tools |

A page declares density once on its root (`data-density="compact"`) and components read it.
Never mix densities inside one panel.

### 1.10 Imagery, gradients and illustration

- Prefer **light** over photography: aurora, conic gradients, mesh, noise.
- Photography, when used, is desaturated 20 percent, vignetted, and always behind a veil gradient.
- Product shots sit on a glass plate with a 1px hairline and a soft shadow. Add a 6px inner
  padding gap so the image appears inset, not cropped.
- Never use stock illustrations of people pointing at charts. For empty states, use a geometric
  glass composition or a single outlined icon inside a tinted tile.
- Avatars: circular, 1px hairline, initials fallback on a gradient derived from the user id hash.

### 1.11 Sound and haptics

Rare in web contexts, therefore strict: optional, off by default, never on hover, only on
commit actions (send message, complete task) and always under 200ms. A single soft tick.

### 1.12 Brand application

When adapting Nova Vitral to a client brand:

1. Replace `--accent`, `--accent-2`, `--accent-3` and the aurora hues. Nothing else.
2. Keep the neutral ground; a brand color must earn its contrast on dark.
3. Adjust `--radius` only if the brand is decidedly rounder or squarer, then scale the whole ladder.
4. Re-run the contrast checks in Section 9.2 after any accent change.

---

## 2. Design Tokens

Tokens are the contract between the spec and the code. Agents must use them exclusively.
If a value is missing, extend the token set, never inline the value.

### 2.1 Complete CSS variable set

```css
/* app/globals.css */
@layer base {
  :root {
    /* Ground */
    --bg: #06070c;
    --bg-soft: #0a0c14;
    --bg-elevated: #0e1120;

    /* Text */
    --fg: #f5f7ff;
    --fg-muted: #a8b0c8;
    --fg-subtle: #6b7490;
    --fg-inverse: #06070c;

    /* Glass */
    --glass: rgba(255, 255, 255, 0.055);
    --glass-strong: rgba(255, 255, 255, 0.09);
    --glass-dim: rgba(255, 255, 255, 0.03);
    --glass-hover: rgba(255, 255, 255, 0.085);

    /* Edges */
    --hair: rgba(255, 255, 255, 0.10);
    --hair-strong: rgba(255, 255, 255, 0.18);
    --hair-soft: rgba(255, 255, 255, 0.06);
    --highlight: rgba(255, 255, 255, 0.10);

    /* Accents */
    --accent: #7c8cff;
    --accent-fg: #ffffff;
    --accent-soft: rgba(124, 140, 255, 0.14);
    --accent-2: #62e9d6;
    --accent-3: #c084fc;
    --warn: #f5b544;
    --danger: #ff6b81;
    --success: #4ade80;

    /* Aurora */
    --aurora-1: rgba(124, 140, 255, 0.28);
    --aurora-2: rgba(98, 233, 214, 0.20);
    --aurora-3: rgba(192, 132, 252, 0.22);
    --aurora-4: rgba(255, 138, 101, 0.14);

    /* Radius */
    --radius-xs: 6px;
    --radius-sm: 10px;
    --radius: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    --radius-full: 999px;

    /* Blur */
    --blur-xs: 4px;
    --blur-sm: 8px;
    --blur: 18px;
    --blur-lg: 32px;

    /* Shadow */
    --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.30);
    --shadow-2: 0 12px 32px -12px rgba(0, 0, 0, 0.55);
    --shadow-3: 0 32px 80px -24px rgba(0, 0, 0, 0.70);
    --shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.10);

    /* Spacing */
    --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
    --s-5: 20px; --s-6: 24px; --s-8: 32px; --s-10: 40px;
    --s-12: 48px; --s-16: 64px; --s-20: 80px; --s-24: 96px;
    --s-32: 128px; --s-40: 160px;

    /* Typography */
    --font-display: var(--font-geist), system-ui, sans-serif;
    --font-body: var(--font-inter), system-ui, sans-serif;
    --font-mono: var(--font-geist-mono), ui-monospace, monospace;
    --fs-display: clamp(2.75rem, 7vw, 5.5rem);
    --fs-h1: clamp(2.25rem, 5vw, 3.5rem);
    --fs-h2: clamp(1.75rem, 3.5vw, 2.5rem);
    --fs-h3: 1.375rem;
    --fs-h4: 1.125rem;
    --fs-lead: clamp(1.0625rem, 1.6vw, 1.25rem);
    --fs-body: 1rem;
    --fs-sm: 0.875rem;
    --fs-xs: 0.8125rem;
    --fs-2xs: 0.6875rem;

    /* Motion */
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out: cubic-bezier(0.65, 0.05, 0.36, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --dur-instant: 90ms;
    --dur-fast: 140ms;
    --dur: 240ms;
    --dur-slow: 420ms;
    --dur-reveal: 760ms;

    /* Layers */
    --z-base: 0;
    --z-sticky: 30;
    --z-nav: 50;
    --z-dropdown: 60;
    --z-overlay: 70;
    --z-modal: 80;
    --z-toast: 90;
    --z-cursor: 100;

    /* Layout */
    --container: 1200px;
    --container-wide: 1440px;
    --gutter: 20px;
    --nav-h: 64px;
  }

  @media (min-width: 768px) { :root { --gutter: 32px; --nav-h: 72px; } }
  @media (min-width: 1024px) { :root { --gutter: 40px; } }
}
```

### 2.2 Tailwind v4 theme mapping

```css
/* app/globals.css, Tailwind v4 */
@import "tailwindcss";

@theme inline {
  --color-bg: var(--bg);
  --color-bg-soft: var(--bg-soft);
  --color-bg-elevated: var(--bg-elevated);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-fg-subtle: var(--fg-subtle);
  --color-glass: var(--glass);
  --color-glass-strong: var(--glass-strong);
  --color-hair: var(--hair);
  --color-hair-strong: var(--hair-strong);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --color-accent-3: var(--accent-3);
  --color-danger: var(--danger);
  --color-warn: var(--warn);

  --radius-sm: var(--radius-sm);
  --radius: var(--radius);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);

  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);

  --ease-out: var(--ease-out);
  --shadow-1: var(--shadow-1);
  --shadow-2: var(--shadow-2);
  --shadow-3: var(--shadow-3);
}

@custom-variant hover-hover (@media (hover: hover) and (pointer: fine) { @slot; });
@custom-variant motion-safe (@media (prefers-reduced-motion: no-preference) { @slot; });
```

Usage: `bg-glass text-fg-muted border-hair rounded-lg shadow-2`.

### 2.3 Tailwind v3 configuration (legacy projects)

```js
// tailwind.config.ts
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "var(--gutter)", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",
        glass: "var(--glass)",
        "glass-strong": "var(--glass-strong)",
        hair: "var(--hair)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
      },
      borderRadius: { sm: "var(--radius-sm)", DEFAULT: "var(--radius)", lg: "var(--radius-lg)", xl: "var(--radius-xl)" },
      backdropBlur: { sm: "8px", DEFAULT: "18px", lg: "32px" },
      boxShadow: { 1: "var(--shadow-1)", 2: "var(--shadow-2)", 3: "var(--shadow-3)" },
      transitionTimingFunction: { out: "var(--ease-out)" },
    },
  },
};
```

### 2.4 Primitive and semantic layers

Two layers, always in this order: **primitives** (raw values, never used in JSX) and
**semantics** (aliases used by components).

| Semantic token | Maps to | Consumed by |
|---|---|---|
| `--surface-panel` | `--glass` | Cards, sections |
| `--surface-raised` | `--glass-strong` | Popovers, dropdowns, modals |
| `--surface-sunken` | `--glass-dim` | Inset areas, code blocks in chat |
| `--surface-interactive` | `--glass-hover` | Hover state of tappable surfaces |
| `--border-default` | `--hair` | All 1px edges |
| `--border-emphasis` | `--hair-strong` | Hover, focus, selected |
| `--text-primary` | `--fg` | Headings |
| `--text-secondary` | `--fg-muted` | Body |
| `--text-tertiary` | `--fg-subtle` | Meta |
| `--action-primary` | `--accent` | Primary button |
| `--action-primary-fg` | `--accent-fg` | Text on primary |
| `--state-success` | `--success` | Completed |
| `--state-live` | `--accent-2` | Streaming, online |
| `--state-error` | `--danger` | Errors |

### 2.5 TypeScript token types

```ts
// lib/tokens.ts
export const density = { comfortable: 56, compact: 40, dense: 32 } as const;
export type Density = keyof typeof density;

export const radius = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, full: 999 } as const;
export const blur = { xs: 4, sm: 8, md: 18, lg: 32 } as const;

export const motion = {
  instant: 0.09,
  fast: 0.14,
  base: 0.24,
  slow: 0.42,
  reveal: 0.76,
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0.05, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const z = {
  base: 0, sticky: 30, nav: 50, dropdown: 60, overlay: 70, modal: 80, toast: 90, cursor: 100,
} as const;
```

### 2.6 Motion tokens for Framer Motion

```ts
// lib/motion.ts
import type { Transition, Variants } from "motion/react";

export const t = {
  micro: { duration: 0.14, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  base: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  surface: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } satisfies Transition,
  reveal: { duration: 0.76, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: t.reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t.base },
};

export const staggerParent = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: t.spring },
};

export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;
```

### 2.7 Z-index policy

| Layer | Token | Contents |
|---|---|---|
| Content | `--z-base` | Normal flow |
| Sticky headers inside content | `--z-sticky` | Table headers, section titles |
| Navigation | `--z-nav` | Navbar, mobile bottom bar |
| Dropdown | `--z-dropdown` | Menus, popovers, selects, combobox |
| Overlay scrim | `--z-overlay` | Backdrop under modals |
| Modal | `--z-modal` | Dialogs, command palette, drawers |
| Toast | `--z-toast` | Notifications |
| Cursor | `--z-cursor` | Custom pointer, spotlight follower |

Rules: never invent a z-index; never exceed 100; a nested modal uses `--z-modal` plus 1 and lives
inside the same portal provider.

### 2.8 Breakpoints and container queries

| Name | Min width | Layout change |
|---|---|---|
| `xs` | 0 | Single column, 20px gutter, nav becomes sheet |
| `sm` | 480 | Two-column pairs, larger type |
| `md` | 768 | Tablet grids, sidebar appears as rail |
| `lg` | 1024 | Full grids, sticky sidebar, hover states enabled |
| `xl` | 1280 | Wide containers, bento 6-column |
| `2xl` | 1536 | Extra whitespace, max container caps |

Prefer container queries for components reused at different widths (cards in a sidebar and in a
full-width grid):

```css
.card-shell { container-type: inline-size; }
@container (min-width: 420px) { .card-title { font-size: var(--fs-h3); } }
```

### 2.9 Light mode

```css
[data-theme="light"] {
  --bg: #f6f7fb;
  --bg-soft: #eef0f7;
  --bg-elevated: #ffffff;
  --fg: #0b0d14;
  --fg-muted: #4a5168;
  --fg-subtle: #6f778f;
  --glass: rgba(255, 255, 255, 0.62);
  --glass-strong: rgba(255, 255, 255, 0.78);
  --hair: rgba(10, 12, 20, 0.10);
  --hair-strong: rgba(10, 12, 20, 0.18);
  --highlight: rgba(255, 255, 255, 0.75);
  --accent: #5a6bf0;      /* desaturated for contrast on light ground */
  --aurora-1: rgba(124, 140, 255, 0.20);
  --aurora-2: rgba(98, 220, 205, 0.18);
  --aurora-3: rgba(178, 122, 244, 0.16);
  --shadow-2: 0 12px 32px -12px rgba(16, 20, 40, 0.18);
  --shadow-3: 0 32px 80px -24px rgba(16, 20, 40, 0.22);
}
```

In light mode glass becomes a **frosted white**, not a dark tint. Aurora light must be stronger
since there is less contrast to exploit. Never simply invert the dark palette.

### 2.10 Token rules for agents

1. Never write a hex, `rgba()` or a shadow literal inside a component. Use `var(--token)` or the
   mapped Tailwind class.
2. Never invent a new accent. If a second accent is needed, use `--accent-2` or `--accent-3`.
3. Never use arbitrary Tailwind values (`w-[437px]`, `bg-[#123456]`) except for one-off
   measurement in a chart or a masked gradient stop.
4. Never change a token value inside a component. Theme overrides belong to the theme layer.
5. Every new token must be added to: this section, the Tailwind mapping (2.2 or 2.3) and the
   TypeScript type file if it is consumed by code.
6. When the user provides a brand palette, only remap accents and aurora hues (Section 1.12).

---

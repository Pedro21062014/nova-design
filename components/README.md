# Nova Vitral component library

500 components in 26 categories. React 19, TypeScript, Tailwind CSS v4,
`motion`, `lucide-react`. Every component is animated, non-purple and layout-safe by
construction, because they all start from the same token set and the same motion ladder.

This folder is written to be read by an AI. `components/index.json` carries the same
registry in machine-readable form: name, kind, category, path, motion note. Feed the file
you need instead of the folder.

## Install

```bash
cp -r components/nova/  <your-app>/components/nova/
cp -r lib/              <your-app>/lib/
cp    theme/nova-theme.css <your-app>/app/nova-theme.css
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "./nova-theme.css";
```

```ts
// tsconfig.json - the components import "@/lib/utils"
{ "compilerOptions": { "paths": { "@/*": ["./*"] } } }
```

## Categories

| Category | Folder | Count | Scope |
| --- | --- | --- | --- |
| [Core](./nova/core/README.md) | `core` | 10 | Core primitives: surfaces, aurora, reveal, section and layout atoms. |
| [Motion](./nova/motion/README.md) | `motion` | 24 | Motion primitives: scroll, parallax, counters, tilt, marquees, transitions. |
| [Buttons](./nova/buttons/README.md) | `buttons` | 18 | Every action shape, from primary to hold-to-confirm. |
| [Inputs](./nova/inputs/README.md) | `inputs` | 24 | Form controls with labels, hints, errors and keyboard support. |
| [Cards](./nova/cards/README.md) | `cards` | 26 | Surfaces for metrics, people, media, tasks and money. |
| [Navigation](./nova/navigation/README.md) | `navigation` | 26 | Navbars, sidebars, tabs, palettes, pagination and footers. |
| [Data](./nova/data/README.md) | `data` | 30 | Tables, filters, charts and progress indicators. |
| [Chat](./nova/chat/README.md) | `chat` | 30 | The complete conversational surface: thread, streaming, tools, composer. |
| [Overlays](./nova/overlays/README.md) | `overlays` | 22 | Dialogs, drawers, popovers, menus, tours and toasts. |
| [Feedback](./nova/feedback/README.md) | `feedback` | 20 | Skeletons, empty states, errors, alerts and status. |
| [Marketing](./nova/marketing/README.md) | `marketing` | 40 | Page sections: heroes, features, pricing, proof, FAQ and CTAs. |
| [Shell](./nova/shell/README.md) | `shell` | 18 | Application shell and settings surfaces. |
| [Ai](./nova/ai/README.md) | `ai` | 20 | Agent tooling: prompts, models, runs, evaluations, cost and guardrails. |
| [Editors](./nova/editors/README.md) | `editors` | 14 | Code, diff, JSON, markdown and authoring surfaces. |
| [Media](./nova/media/README.md) | `media` | 16 | Images, video, audio, avatars, logos and frames. |
| [Commerce](./nova/commerce/README.md) | `commerce` | 16 | Product, cart, checkout, invoices and billing meters. |
| [Forms](./nova/forms/README.md) | `forms` | 18 | Multi-step and advanced form patterns. |
| [Layout](./nova/layout/README.md) | `layout` | 20 | Structural layouts and page-level compositions. |
| [Devtools](./nova/devtools/README.md) | `devtools` | 14 | Developer surfaces: logs, network, schema and debugging. |
| [Utilities](./nova/utilities/README.md) | `utilities` | 18 | Micro utilities: copy, time, numbers, theme and locale. |
| [Mobile](./nova/mobile/README.md) | `mobile` | 16 | Mobile-native patterns with safe areas and gestures. |
| [Email](./nova/email/README.md) | `email` | 12 | Email-safe components without backdrop blur. |
| [Print](./nova/print/README.md) | `print` | 8 | Print and PDF components. |
| [Seo](./nova/seo/README.md) | `seo` | 10 | Technical SEO and sharing previews. |
| [A11y](./nova/a11y/README.md) | `a11y` | 10 | Accessibility primitives that ship with every page. |
| [Enterprise](./nova/enterprise/README.md) | `enterprise` | 20 | Enterprise administration, trust and procurement. |

## Ten rules these files already follow

1. No purple. The theme remaps the shadcn `--primary` variable to indigo, so `bg-primary`
   and `text-primary` are legal; raw `violet`, `purple`, `fuchsia` and `oklch(0.6 0.25 ...)`
   are not.
2. One accent per viewport. Everything else is neutral: `--glass`, `--hair`, `--fg-muted`.
3. Every component animates. Hover, entrance or state change, 140ms to 760ms, never longer
   than 900ms and never more than 24px of travel.
4. Reduced motion is honored. `prefers-reduced-motion: reduce` renders final states
   immediately.
5. Layout never shifts. Media, charts and skeletons reserve their box.
6. Icons are lucide, at 16px, stroke 1.5, `aria-hidden="true"` when decorative.
7. Focus is visible and never removed. 2px `--accent` ring, 2px offset.
8. Text contrast passes WCAG 2.2 AA (`--fg` on `--bg`, `--fg-muted` on glass).
9. Numbers are tabular. Timestamps and metrics never reflow while they animate.
10. Copy is sentence case, plain, and free of exclamation marks.

## How the AI should use this folder

- Read `components/index.json` first, filter by `category` and `kind`, then read the two or
  three files you actually need. Do not read the folder end to end.
- The hand-authored files listed in each category README define the contract: `surface.tsx`,
  `composer.tsx`, `data-table.tsx`, `navbar.tsx`, `hero-split.tsx`.
- When composing a page, start from `templates/` and swap sections for components here.
- Routing prompts: `https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/01-load-and-orient.md`,
  `https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/03-build-a-component.md`, `https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/05-build-motion.md`.

## Related

- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)
- [Theme and token mapping](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/theme/README.md)
- [Five full page templates](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/templates/README.md)
- [One hundred worked examples](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/00-index.md)

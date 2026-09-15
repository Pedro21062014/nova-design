# Frontend templates

Five complete pages, production quality, built on the component library in
`components/nova/`. Every page is real: no lorem ipsum, no placeholder tiles, no dead
links, no emoji, and nothing purple.

| Page | Stack | File | What it proves |
| --- | --- | --- | --- |
| 1. Marketing home | Next.js (server component) | [`next-app/app/page.tsx`](./next-app/app/page.tsx) | Glass over aurora, staggered hero, bento grid, scrollytelling, counters |
| 2. Pricing | Next.js (client) | [`next-app/app/pricing/page.tsx`](./next-app/app/pricing/page.tsx) | Interval toggle with no layout shift, 3 plan hierarchy, comparison table, FAQ |
| 3. Product dashboard | Next.js (client) | [`next-app/app/dashboard/page.tsx`](./next-app/app/dashboard/page.tsx) | App shell, KPI row, charts, dense table, activity feed |
| 4. AI workspace | Next.js (client) | [`next-app/app/chat/page.tsx`](./next-app/app/chat/page.tsx) | Three-column chat, assistant as a document, tool cards, streaming composer |
| 5. Documentation | Next.js (server component) | [`next-app/app/docs/page.tsx`](./next-app/app/docs/page.tsx) | Tree, measure-capped prose, on-this-page rail, code block, pager |
| Bonus. Landing in plain HTML | Static | [`static-html/index.html`](./static-html/index.html) | Same visual language with zero build step, inline Lucide SVG, CSS reveals |
| Bonus. Astro landing | Astro | [`astro/src/pages/index.astro`](./astro/src/pages/index.astro) | The same page as an Astro route with a client island |

## Install

```bash
# 1. components and helpers
cp -r components/nova/   <your-app>/components/nova/
cp -r lib/               <your-app>/lib/

# 2. theme, imported before everything else
cp theme/nova-theme.css  <your-app>/app/nova-theme.css

# 3. copy a page over your own route
cp templates/next-app/app/page.tsx <your-app>/app/page.tsx
```

```css
/* <your-app>/app/globals.css */
@import "tailwindcss";
@import "./nova-theme.css";
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

The full runnable app, including `package.json`, `tsconfig.json`, `layout.tsx` and
`globals.css`, lives in [`next-app/`](./next-app/README.md).

## How to use these pages with an AI

Feed the prompt and the page, in this order:

1. `prompts/01-design-system-setup.md` once per project, so the theme and tokens are in place.
2. `prompts/03-page-blueprints.md`, which names the blueprint for each of the five pages.
3. One template file as the reference for structure, then the components it imports.

Two rules that keep the output consistent:

- Keep the section order. The pages are ordered for a reason: identity, proof, capability,
  specifics, objection handling, close.
- Keep the token names. `--glass`, `--hair`, `--fg-muted` and `--accent` are what make a new
  page look like these five. Replacing them with Tailwind color classes is the fastest way to
  look like a different product.

## What to change first

| Token | Where | Why |
| --- | --- | --- |
| `--accent` | `theme/nova-theme.css` | Brand color. Keep the saturation below 85 percent. |
| `--container` | `theme/nova-theme.css` | 1200px default; 1280px reads more editorial. |
| Navbar items | each page | Fix the routes before the visuals. |
| Sample data | bottom of each template | Every page has one `SAMPLE` object. Replace it, then delete the mock arrays. |

## Verification before you ship

- Run the fourteen-point visual QA from spec section 9, starting with the grayscale test.
- Check the page at 320, 768, 1024 and 1440 pixels.
- Turn on `prefers-reduced-motion: reduce` and confirm nothing moves.
- Tab through the whole page twice: every action must be reachable, and the focus ring visible.
- Search the file for `purple`, `violet`, `fuchsia` and `oklch(`. All four must return nothing.

## Related

- [Component library](../components/README.md)
- [Theme and shadcn variable mapping](../theme/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

# Seo components

Technical SEO and sharing previews.

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
| `metadata-card` | `seo` | Title, description and canonical summary. | [MetadataCard](./metadata-card.tsx) |
| `og-preview` | `seo` | Open Graph image preview at 1200x630. | [OgPreview](./og-preview.tsx) |
| `twitter-preview` | `seo` | Card preview for social sharing. | [TwitterPreview](./twitter-preview.tsx) |
| `structured-data-card` | `seo` | JSON-LD summary with validation state. | [StructuredDataCard](./structured-data-card.tsx) |
| `sitemap-row` | `seo` | Sitemap entry with lastmod and priority. | [SitemapRow](./sitemap-row.tsx) |
| `robots-panel` | `seo` | Robots directives with a diff view. | [RobotsPanel](./robots-panel.tsx) |
| `canonical-chip` | `seo` | Canonical URL chip with copy. | [CanonicalChip](./canonical-chip.tsx) |
| `hreflang-list` | `seo` | Locale alternates with validation. | [HreflangList](./hreflang-list.tsx) |
| `reading-progress` | `seo` | Scroll progress for long articles. | [ReadingProgress](./reading-progress.tsx) |
| `share-preview` | `seo` | Preview of a shared link unfurl. | [SharePreview](./share-preview.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- No visible motion: the structured data must stay identical to the rendered content.

Full ladder, easing and reduced-motion rules: spec sections 8.6, 9.4 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Structured data that does not match the rendered content.
- Descriptions truncated mid-sentence.
- The same title on more than one route.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

# Layout components

Structural layouts and page-level compositions.

20 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `bento-grid` | `layout` | Mixed spans with one hero cell. | [BentoGrid](./bento-grid.tsx) |
| `split-layout` | `layout` | Two-column split with a sticky side. | [SplitLayout](./split-layout.tsx) |
| `sticky-aside` | `layout` | Sticky sidebar that releases before the next section. | [StickyAside](./sticky-aside.tsx) |
| `two-column-prose` | `layout` | Measure-capped article layout. | [TwoColumnProse](./two-column-prose.tsx) |
| `docs-layout` | `layout` | Tree, content and on-this-page rail. | [DocsLayout](./docs-layout.tsx) |
| `blog-layout` | `layout` | Index with featured post and grid. | [BlogLayout](./blog-layout.tsx) |
| `portfolio-grid` | `layout` | Project grid with mixed media. | [PortfolioGrid](./portfolio-grid.tsx) |
| `masonry` | `layout` | Column-based masonry for uneven media. | [Masonry](./masonry.tsx) |
| `gallery-mosaic` | `layout` | Mosaic gallery with a full-bleed row. | [GalleryMosaic](./gallery-mosaic.tsx) |
| `sidebar-content` | `layout` | App shell with a collapsible sidebar. | [SidebarContent](./sidebar-content.tsx) |
| `full-bleed` | `layout` | Edge-to-edge band inside a contained page. | [FullBleed](./full-bleed.tsx) |
| `section-header` | `layout` | Overline, title, lead and action. | [SectionHeader](./section-header.tsx) |
| `page-header` | `layout` | Page title with breadcrumb and actions. | [PageHeader](./page-header.tsx) |
| `content-header` | `layout` | Content header with meta row. | [ContentHeader](./content-header.tsx) |
| `article-header` | `layout` | Article header with author and date. | [ArticleHeader](./article-header.tsx) |
| `sticky-toolbar` | `layout` | Toolbar that sticks under the navbar. | [StickyToolbar](./sticky-toolbar.tsx) |
| `action-bar` | `layout` | Contextual actions for a selection. | [ActionBar](./action-bar.tsx) |
| `stats-header` | `layout` | Header with inline metrics. | [StatsHeader](./stats-header.tsx) |
| `hero-content` | `layout` | Content-first hero for inner pages. | [HeroContent](./hero-content.tsx) |
| `empty-layout` | `layout` | Centered single-column layout for states. | [EmptyLayout](./empty-layout.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Sticky elements pin with a hairline that fades in over 240ms; regions do not animate on load.

Full ladder, easing and reduced-motion rules: spec sections 3.7, 3.8, 5.6 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Sticky rails taller than the viewport.
- Full-bleed bands used twice in a row.
- Measure above 80 characters.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

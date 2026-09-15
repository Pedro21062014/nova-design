# Feedback components

Skeletons, empty states, errors, alerts and status.

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
| `skeleton-text` | `feedback` | Text skeleton with three line widths. | [SkeletonText](./skeleton-text.tsx) |
| `skeleton-card` | `feedback` | Card skeleton matching the real shape. | [SkeletonCard](./skeleton-card.tsx) |
| `skeleton-table` | `feedback` | Table skeleton with five rows and a header. | [SkeletonTable](./skeleton-table.tsx) |
| `skeleton-chart` | `feedback` | Chart skeleton with a ghost of the previous chart. | [SkeletonChart](./skeleton-chart.tsx) |
| `empty-state` | `feedback` | Icon tile, one explanation and one action. | [EmptyState](./empty-state.tsx) |
| `empty-search` | `feedback` | Zero results with removable filters. | [EmptySearch](./empty-search.tsx) |
| `error-state` | `feedback` | Plain-language error with retry and error id. | [ErrorState](./error-state.tsx) |
| `error-boundary-card` | `feedback` | Boundary fallback scoped to one region. | [ErrorBoundaryCard](./error-boundary-card.tsx) |
| `offline-banner` | `feedback` | Amber offline notice with queued count. | [OfflineBanner](./offline-banner.tsx) |
| `rate-limit-notice` | `feedback` | Limit reached with a countdown and upgrade path. | [RateLimitNotice](./rate-limit-notice.tsx) |
| `loading-dots` | `feedback` | Three dots for short waits. | [LoadingDots](./loading-dots.tsx) |
| `loading-bar` | `feedback` | Indeterminate bar for long operations. | [LoadingBar](./loading-bar.tsx) |
| `spinner` | `feedback` | Spinner with an accessible label. | [Spinner](./spinner.tsx) |
| `progress-ring` | `feedback` | Ring progress with a center value. | [ProgressRing](./progress-ring.tsx) |
| `pulse-dot` | `feedback` | Live indicator, one per viewport. | [PulseDot](./pulse-dot.tsx) |
| `status-pill` | `feedback` | Operational, degraded or outage status. | [StatusPill](./status-pill.tsx) |
| `badge-status` | `feedback` | Status chip with tone and dot. | [BadgeStatus](./badge-status.tsx) |
| `alert-info` | `feedback` | Informational callout. | [AlertInfo](./alert-info.tsx) |
| `alert-warning` | `feedback` | Warning callout with a fix. | [AlertWarning](./alert-warning.tsx) |
| `alert-danger` | `feedback` | Error callout with retry. | [AlertDanger](./alert-danger.tsx) |

## Hand-authored files

- [StatusPill](./status-pill.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Shimmer travels at 1.4s linear; states cross-fade in 240ms and never flash.

Full ladder, easing and reduced-motion rules: spec sections 3.12, 6.11 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Red used for non-destructive states.
- Exclamation marks and blame in error copy.
- Skeletons that persist longer than the real response time.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

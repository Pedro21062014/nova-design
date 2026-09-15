# Cards components

Surfaces for metrics, people, media, tasks and money.

26 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `glass-card` | `card` | Default panel: glass, 24px radius, specular on hover. | [GlassCard](./glass-card.tsx) |
| `interactive-card` | `card` | Clickable card with lift, focus ring and pressed state. | [InteractiveCard](./interactive-card.tsx) |
| `media-card` | `card` | Card with cover media, veil gradient and content footer. | [MediaCard](./media-card.tsx) |
| `profile-card` | `card` | Person card with avatar, role, links and presence. | [ProfileCard](./profile-card.tsx) |
| `product-card` | `card` | Product tile with price, badge and quick action. | [ProductCard](./product-card.tsx) |
| `stat-card` | `card` | Metric with delta chip and comparison caption. | [StatCard](./stat-card.tsx) |
| `metric-spark` | `card` | Metric with an inline 24-point sparkline. | [MetricSpark](./metric-spark.tsx) |
| `pricing-card` | `card` | Plan card with billing state, features and CTA. | [PricingCard](./pricing-card.tsx) |
| `plan-compare-card` | `card` | Compact plan summary for comparison grids. | [PlanCompareCard](./plan-compare-card.tsx) |
| `testimonial-card` | `card` | Quote, attribution and logo slot. | [TestimonialCard](./testimonial-card.tsx) |
| `blog-card` | `card` | Article card with category chip and reading time. | [BlogCard](./blog-card.tsx) |
| `changelog-card` | `card` | Release entry with version chip and tags. | [ChangelogCard](./changelog-card.tsx) |
| `repo-card` | `card` | Repository card with stars, language and update time. | [RepoCard](./repo-card.tsx) |
| `integration-card` | `card` | Integration tile with monochrome logo and status. | [IntegrationCard](./integration-card.tsx) |
| `team-card` | `card` | Team card with stacked avatars and member count. | [TeamCard](./team-card.tsx) |
| `notification-card` | `card` | Notification with icon tone, action and dismiss. | [NotificationCard](./notification-card.tsx) |
| `task-card` | `card` | Task with checkbox, assignee and due date. | [TaskCard](./task-card.tsx) |
| `invoice-card` | `card` | Invoice summary with amount, status and download. | [InvoiceCard](./invoice-card.tsx) |
| `usage-card` | `card` | Usage meter with quota and overage warning. | [UsageCard](./usage-card.tsx) |
| `seat-card` | `card` | Seat allocation with invite affordance. | [SeatCard](./seat-card.tsx) |
| `empty-card` | `card` | Empty state card with icon, copy and one action. | [EmptyCard](./empty-card.tsx) |
| `error-card` | `card` | Block error with retry and copyable error id. | [ErrorCard](./error-card.tsx) |
| `skeleton-card` | `card` | Skeleton that mirrors a real card shape exactly. | [SkeletonCard](./skeleton-card.tsx) |
| `action-card` | `card` | Card whose whole surface is one decision. | [ActionCard](./action-card.tsx) |
| `feature-card` | `card` | Feature with icon tile and two lines of copy. | [FeatureCard](./feature-card.tsx) |
| `resource-card` | `card` | Link card for docs, guides and videos. | [ResourceCard](./resource-card.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- 4px rise and a one-step fill increase on hover, 240ms; the entrance is a 16px rise with 60ms cascade.

Full ladder, easing and reduced-motion rules: spec sections 3.2, 3.13 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Five equally weighted cards in a row: pick a hierarchy or use a table.
- Hover lift on non-interactive cards.
- An icon tile with three different accent colors in one grid.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

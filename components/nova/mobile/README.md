# Mobile components

Mobile-native patterns with safe areas and gestures.

16 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `bottom-nav` | `mobile` | Four-item bottom navigation with a safe area. | [BottomNav](./bottom-nav.tsx) |
| `tab-bar` | `mobile` | Scrollable tab bar for mobile filters. | [TabBar](./tab-bar.tsx) |
| `swipe-card` | `mobile` | Card with swipe actions on touch. | [SwipeCard](./swipe-card.tsx) |
| `pull-to-refresh` | `mobile` | Refresh indicator driven by drag. | [PullToRefresh](./pull-to-refresh.tsx) |
| `action-sheet` | `mobile` | Sheet with grouped actions and cancel. | [ActionSheet](./action-sheet.tsx) |
| `mobile-nav-header` | `mobile` | Compact header with back and actions. | [MobileNavHeader](./mobile-nav-header.tsx) |
| `sticky-cta` | `mobile` | Sticky bottom CTA with safe-area padding. | [StickyCta](./sticky-cta.tsx) |
| `list-row` | `mobile` | Touch row with avatar, meta and chevron. | [ListRow](./list-row.tsx) |
| `list-group` | `mobile` | Grouped list with a section header. | [ListGroup](./list-group.tsx) |
| `swipe-actions` | `mobile` | Reveal actions behind a row. | [SwipeActions](./swipe-actions.tsx) |
| `mobile-search` | `mobile` | Full-screen search with recents. | [MobileSearch](./mobile-search.tsx) |
| `bottom-sheet-form` | `mobile` | Form inside a bottom sheet. | [BottomSheetForm](./bottom-sheet-form.tsx) |
| `segmented-mobile` | `mobile` | Two-way segmented switch for small screens. | [SegmentedMobile](./segmented-mobile.tsx) |
| `floating-action` | `mobile` | Primary action pinned above the bottom nav. | [FloatingAction](./floating-action.tsx) |
| `drawer-handle` | `mobile` | Drag handle with a collapsed state. | [DrawerHandle](./drawer-handle.tsx) |
| `safe-area-spacer` | `mobile` | Respects home indicator spacing. | [SafeAreaSpacer](./safe-area-spacer.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Sheets rise 24px over 320ms with a soft spring; rows dim to 0.9 on press instead of scaling.

Full ladder, easing and reduced-motion rules: spec sections 8.3, 6.12 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Touch targets below 44px.
- Sheets that cover the primary action.
- Landscape layouts designed after portrait, instead of together.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

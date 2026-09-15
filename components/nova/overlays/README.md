# Overlays components

Dialogs, drawers, popovers, menus, tours and toasts.

22 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `modal` | `overlay` | Centered dialog with scrim, focus trap and exit. | [Modal](./modal.tsx) |
| `confirm-dialog` | `overlay` | Confirmation with danger action and typed phrase. | [ConfirmDialog](./confirm-dialog.tsx) |
| `drawer-right` | `overlay` | Right drawer for forms and details. | [DrawerRight](./drawer-right.tsx) |
| `sheet-bottom` | `overlay` | Bottom sheet for mobile actions and filters. | [SheetBottom](./sheet-bottom.tsx) |
| `popover` | `overlay` | Anchored glass popover with collision handling. | [Popover](./popover.tsx) |
| `tooltip` | `overlay` | Delayed tooltip limited to a label. | [Tooltip](./tooltip.tsx) |
| `dropdown-menu` | `overlay` | Menu with shortcuts, groups and danger row. | [DropdownMenu](./dropdown-menu.tsx) |
| `context-menu` | `overlay` | Right-click menu sharing the menu primitive. | [ContextMenu](./context-menu.tsx) |
| `hover-card` | `overlay` | Rich preview on hover with delay. | [HoverCard](./hover-card.tsx) |
| `lightbox` | `overlay` | Media viewer with keyboard, swipe and preloading. | [Lightbox](./lightbox.tsx) |
| `side-panel` | `overlay` | Persistent side panel for inspection. | [SidePanel](./side-panel.tsx) |
| `inspector` | `overlay` | Property inspector for a selected object. | [Inspector](./inspector.tsx) |
| `quick-edit` | `overlay` | Inline edit surface that replaces content. | [QuickEdit](./quick-edit.tsx) |
| `onboarding-tour` | `overlay` | Coach marks with a spotlight cutout. | [OnboardingTour](./onboarding-tour.tsx) |
| `announce-bar` | `overlay` | Top announcement with dismiss memory. | [AnnounceBar](./announce-bar.tsx) |
| `cookie-bar` | `overlay` | Non-blocking consent with two real choices. | [CookieBar](./cookie-bar.tsx) |
| `toaster` | `overlay` | Toast host with stacking and promise support. | [Toaster](./toaster.tsx) |
| `toast-item` | `overlay` | Single toast with icon tone and action. | [ToastItem](./toast-item.tsx) |
| `banner-inline` | `overlay` | Inline notice with a fix action. | [BannerInline](./banner-inline.tsx) |
| `slide-over-form` | `overlay` | Slide-over wrapping a full form. | [SlideOverForm](./slide-over-form.tsx) |
| `command-sheet` | `overlay` | Mobile command surface. | [CommandSheet](./command-sheet.tsx) |
| `preview-modal` | `overlay` | Preview of a file or artifact before commit. | [PreviewModal](./preview-modal.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Backdrop fades 180ms, surface rises 8px and scales from 0.98 over 240ms; exit is 160ms.

Full ladder, easing and reduced-motion rules: spec sections 3.4, 6.7 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Nested modals. Use a page or a sheet instead.
- Destructive confirmation without the object name in the copy.
- Closing on backdrop click for anything that loses data.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

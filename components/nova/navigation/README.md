# Navigation components

Navbars, sidebars, tabs, palettes, pagination and footers.

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
| `navbar` | `nav` | Sticky navbar that condenses to glass after 24px. | [Navbar](./navbar.tsx) |
| `navbar-links` | `nav` | Nav links with sliding accent underline and scroll spy. | [NavbarLinks](./navbar-links.tsx) |
| `mega-menu` | `nav` | Grouped menu with columns and a visual slot. | [MegaMenu](./mega-menu.tsx) |
| `mobile-sheet-menu` | `nav` | Off-canvas menu with 44px targets and focus trap. | [MobileSheetMenu](./mobile-sheet-menu.tsx) |
| `sidebar` | `nav` | App sidebar with sections and persisted collapse. | [Sidebar](./sidebar.tsx) |
| `sidebar-rail` | `nav` | Icon rail with delayed tooltips. | [SidebarRail](./sidebar-rail.tsx) |
| `sidebar-item` | `nav` | Nav item with active bar, badge and focus states. | [SidebarItem](./sidebar-item.tsx) |
| `breadcrumbs` | `nav` | Breadcrumbs that collapse beyond four levels. | [Breadcrumbs](./breadcrumbs.tsx) |
| `tabs` | `nav` | Tabs with keyboard navigation and lazy panels. | [Tabs](./tabs.tsx) |
| `tabs-underline` | `nav` | Underline tabs for content sections. | [TabsUnderline](./tabs-underline.tsx) |
| `tabs-segmented` | `nav` | Segmented control for view switching. | [TabsSegmented](./tabs-segmented.tsx) |
| `pagination` | `nav` | Pagination with window compression and page size. | [Pagination](./pagination.tsx) |
| `stepper` | `nav` | Horizontal stepper for multi-step flows. | [Stepper](./stepper.tsx) |
| `wizard-progress` | `nav` | Vertical progress for onboarding wizards. | [WizardProgress](./wizard-progress.tsx) |
| `command-palette` | `nav` | Cmd K palette with scopes, recents and shortcut hints. | [CommandPalette](./command-palette.tsx) |
| `dock` | `nav` | Floating glass dock for primary app actions. | [Dock](./dock.tsx) |
| `floating-nav` | `nav` | Compact nav that appears on scroll up. | [FloatingNav](./floating-nav.tsx) |
| `anchors-toc` | `nav` | On-this-page rail with active marker. | [AnchorsToc](./anchors-toc.tsx) |
| `back-to-top` | `nav` | Appears after 1.5 viewports with smooth scroll. | [BackToTop](./back-to-top.tsx) |
| `scroll-spy-nav` | `nav` | Sections tracked by IntersectionObserver. | [ScrollSpyNav](./scroll-spy-nav.tsx) |
| `footer` | `nav` | Footer with link columns, status pill and legal bar. | [Footer](./footer.tsx) |
| `footer-oversized` | `nav` | Footer with an oversized clipped wordmark. | [FooterOversized](./footer-oversized.tsx) |
| `user-menu` | `nav` | Account menu with theme control and sign out. | [UserMenu](./user-menu.tsx) |
| `org-switcher` | `nav` | Workspace switcher with search and creation. | [OrgSwitcher](./org-switcher.tsx) |
| `keyboard-hints` | `nav` | Shortcut reference chips for the current view. | [KeyboardHints](./keyboard-hints.tsx) |
| `sub-nav` | `nav` | Secondary nav for nested product areas. | [SubNav](./sub-nav.tsx) |

## Hand-authored files

- [Navbar](./navbar.tsx) - hand-authored in this category.
- [Footer](./footer.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Interpolates to a condensed glass bar after 24px of scroll, 240ms; the active indicator slides.

Full ladder, easing and reduced-motion rules: spec sections 3.6, 3.15 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- A menu that opens on hover only: keyboard users cannot reach it.
- Breadcrumbs past four levels instead of a section hub.
- A mobile sheet without scroll lock, so the page scrolls behind it.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

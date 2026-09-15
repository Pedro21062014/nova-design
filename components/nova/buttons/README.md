# Buttons components

Every action shape, from primary to hold-to-confirm.

18 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `button-primary` | `button` | The single solid element: indigo gradient, glow on hover. | [ButtonPrimary](./button-primary.tsx) |
| `button-glass` | `button` | Glass secondary action with hairline and blur. | [ButtonGlass](./button-glass.tsx) |
| `button-ghost` | `button` | Transparent until hover, for dense toolbars. | [ButtonGhost](./button-ghost.tsx) |
| `button-outline` | `button` | Hairline outline that becomes accent on hover. | [ButtonOutline](./button-outline.tsx) |
| `button-danger` | `button` | Tinted destructive action, solid only in confirm dialogs. | [ButtonDanger](./button-danger.tsx) |
| `button-link` | `button` | Inline link styled as an action with underline offset. | [ButtonLink](./button-link.tsx) |
| `button-icon` | `button` | Icon-only button with label, tooltip and press scale. | [ButtonIcon](./button-icon.tsx) |
| `button-split` | `button` | Split action with a menu on the trailing segment. | [ButtonSplit](./button-split.tsx) |
| `button-loading` | `button` | Loading state with locked width and inline spinner. | [ButtonLoading](./button-loading.tsx) |
| `button-success` | `button` | Success swap with a check and a 1.6s revert. | [ButtonSuccess](./button-success.tsx) |
| `button-group` | `button` | Segmented group sharing one glass shell. | [ButtonGroup](./button-group.tsx) |
| `button-copy` | `button` | Copy action with check feedback, no toast. | [ButtonCopy](./button-copy.tsx) |
| `button-toggle` | `button` | Pressed state button for filters and toolbars. | [ButtonToggle](./button-toggle.tsx) |
| `button-pill` | `button` | Pill action for chips rows and mobile filters. | [ButtonPill](./button-pill.tsx) |
| `button-fab` | `button` | Floating action that appears after the first viewport. | [ButtonFab](./button-fab.tsx) |
| `button-submit-bar` | `button` | Sticky submit bar with dirty-state enabling. | [ButtonSubmitBar](./button-submit-bar.tsx) |
| `button-async` | `button` | Async action with promise states and retry on failure. | [ButtonAsync](./button-async.tsx) |
| `button-destructive-hold` | `button` | Hold-to-confirm for irreversible actions. | [ButtonDestructiveHold](./button-destructive-hold.tsx) |

## Hand-authored files

- [ButtonPrimary](./button-primary.tsx) - hand-authored in this category.
- [ButtonGlass](./button-glass.tsx) - hand-authored in this category.
- [ButtonLoading](./button-loading.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Motion contract

Every component in this folder animates, and it animates the same way:

- 1px lift and a 0.98 press, 140ms; the icon travels 2px on hover and nothing animates on load.

Full ladder, easing and reduced-motion rules: spec sections 3.1, 6.3 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Two solid primary buttons in one viewport.
- A purple or two-hue gradient fill. The system uses a single indigo ramp.
- Removing the focus ring to make hover look cleaner.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

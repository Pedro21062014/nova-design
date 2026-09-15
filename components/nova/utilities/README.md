# Utilities components

Micro utilities: copy, time, numbers, theme and locale.

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
| `copy-button` | `utility` | Copy with check feedback and no toast. | [CopyButton](./copy-button.tsx) |
| `tooltip-label` | `utility` | Label plus delayed tooltip. | [TooltipLabel](./tooltip-label.tsx) |
| `keyboard-chip` | `utility` | Key cap chip, desktop only. | [KeyboardChip](./keyboard-chip.tsx) |
| `relative-time` | `utility` | Relative time with absolute on hover. | [RelativeTime](./relative-time.tsx) |
| `number-format` | `utility` | Locale-aware number with compact notation. | [NumberFormat](./number-format.tsx) |
| `currency-text` | `utility` | Currency with tabular figures. | [CurrencyText](./currency-text.tsx) |
| `truncate-text` | `utility` | Single-line ellipsis with title attribute. | [TruncateText](./truncate-text.tsx) |
| `middle-truncate` | `utility` | Middle truncation for paths and keys. | [MiddleTruncate](./middle-truncate.tsx) |
| `password-strength` | `utility` | Strength meter with requirement list. | [PasswordStrength](./password-strength.tsx) |
| `qr-card` | `utility` | Shareable QR with a download action. | [QrCard](./qr-card.tsx) |
| `share-row` | `utility` | Share targets with a copyable link. | [ShareRow](./share-row.tsx) |
| `print-button` | `utility` | Print with stylesheet guidance. | [PrintButton](./print-button.tsx) |
| `theme-toggle` | `utility` | System, light and dark segmented control. | [ThemeToggle](./theme-toggle.tsx) |
| `locale-switcher` | `utility` | Language selector with persistence. | [LocaleSwitcher](./locale-switcher.tsx) |
| `timezone-select` | `utility` | Timezone picker with offsets. | [TimezoneSelect](./timezone-select.tsx) |
| `currency-select` | `utility` | Currency picker with symbols. | [CurrencySelect](./currency-select.tsx) |
| `contrast-checker` | `utility` | Reports contrast of two tokens. | [ContrastChecker](./contrast-checker.tsx) |
| `token-preview` | `utility` | Shows a token name, value and swatch. | [TokenPreview](./token-preview.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Copy confirms with an inline icon swap in 140ms; tooltips delay 400ms and fade in 120ms.

Full ladder, easing and reduced-motion rules: spec sections 3.14, 6.3 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Toasts for actions that already have inline confirmation.
- Tooltips as the only source of an action name.
- Destructive utilities placed next to copy actions.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

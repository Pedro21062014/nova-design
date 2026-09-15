# Print components

Print and PDF components.

8 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `print-header` | `print` | Document header with logo and reference. | [PrintHeader](./print-header.tsx) |
| `print-invoice` | `print` | Printable invoice with totals and terms. | [PrintInvoice](./print-invoice.tsx) |
| `print-report` | `print` | Report cover with period and author. | [PrintReport](./print-report.tsx) |
| `print-cover` | `print` | Cover page with title and metadata. | [PrintCover](./print-cover.tsx) |
| `print-table` | `print` | Table that repeats its header across pages. | [PrintTable](./print-table.tsx) |
| `print-chart` | `print` | Chart with a caption that survives grayscale. | [PrintChart](./print-chart.tsx) |
| `print-signature` | `print` | Signature block with date line. | [PrintSignature](./print-signature.tsx) |
| `print-footer` | `print` | Page number and confidentiality note. | [PrintFooter](./print-footer.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Transitions are suppressed; the reveal classes resolve to their final state before printing.

Full ladder, easing and reduced-motion rules: spec sections 8.5, 9.6 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Screenshots of tables instead of real tables.
- Color as the only carrier of meaning.
- Headers that repeat on every page with stale data.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

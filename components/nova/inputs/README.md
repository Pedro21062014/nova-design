# Inputs components

Form controls with labels, hints, errors and keyboard support.

24 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `input-text` | `input` | Text field with label, hint, error and icon slots. | [InputText](./input-text.tsx) |
| `input-email` | `input` | Email field with domain validation and typo hints. | [InputEmail](./input-email.tsx) |
| `input-password` | `input` | Password field with reveal toggle and strength meter. | [InputPassword](./input-password.tsx) |
| `input-search` | `input` | Search field with debounce and clear action. | [InputSearch](./input-search.tsx) |
| `input-textarea` | `input` | Auto-growing textarea capped at twelve rows. | [InputTextarea](./input-textarea.tsx) |
| `input-number` | `input` | Numeric field with steppers and tabular figures. | [InputNumber](./input-number.tsx) |
| `input-currency` | `input` | Currency field with locale formatting and right alignment. | [InputCurrency](./input-currency.tsx) |
| `input-phone` | `input` | Phone field that formats while typing and never blocks paste. | [InputPhone](./input-phone.tsx) |
| `input-otp` | `input` | Six-cell verification code with paste support. | [InputOtp](./input-otp.tsx) |
| `input-tags` | `input` | Tag entry with chip removal and keyboard commit. | [InputTags](./input-tags.tsx) |
| `input-mention` | `input` | Mention field with grouped suggestion menu. | [InputMention](./input-mention.tsx) |
| `input-prefix-suffix` | `input` | Field with locked prefix and unit suffix. | [InputPrefixSuffix](./input-prefix-suffix.tsx) |
| `switch` | `input` | Switch with 160ms thumb and aria role switch. | [Switch](./switch.tsx) |
| `checkbox` | `input` | Checkbox with indeterminate support. | [Checkbox](./checkbox.tsx) |
| `radio-card` | `input` | Radio rendered as a selectable tile with description. | [RadioCard](./radio-card.tsx) |
| `select` | `input` | Select with glass popup and check on the active row. | [Select](./select.tsx) |
| `combobox` | `input` | Searchable select with grouped results and empty state. | [Combobox](./combobox.tsx) |
| `multiselect` | `input` | Multi-select with chips, counts and clear-all. | [Multiselect](./multiselect.tsx) |
| `date-picker` | `input` | Calendar popover with presets and keyboard navigation. | [DatePicker](./date-picker.tsx) |
| `date-range` | `input` | Range picker with preset chips and dual month view. | [DateRange](./date-range.tsx) |
| `slider` | `input` | Slider with value bubble shown only while dragging. | [Slider](./slider.tsx) |
| `file-drop` | `input` | Dropzone with validation, per-file progress and retry. | [FileDrop](./file-drop.tsx) |
| `form-field` | `input` | Field shell that wires label, hint, error and aria-describedby. | [FormField](./form-field.tsx) |
| `rating-input` | `input` | Star rating with keyboard support and hover preview. | [RatingInput](./rating-input.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Focus ring appears in 140ms, the label rises to the top border, and the error line slides in 8px.

Full ladder, easing and reduced-motion rules: spec sections 3.3, 9.3 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Placeholder text used as the only label.
- Error messages that only change the border color.
- Autofocus on mobile, which raises the keyboard over the content.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

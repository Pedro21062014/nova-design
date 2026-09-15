# Forms components

Multi-step and advanced form patterns.

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
| `multi-step-form` | `form` | Stepped form with validation per step. | [MultiStepForm](./multi-step-form.tsx) |
| `form-section` | `form` | Grouped fields with a section heading. | [FormSection](./form-section.tsx) |
| `form-summary` | `form` | Error summary that links to each field. | [FormSummary](./form-summary.tsx) |
| `field-group` | `form` | Label, hint and error wiring wrapper. | [FieldGroup](./field-group.tsx) |
| `address-form` | `form` | Address fields with postal lookup hints. | [AddressForm](./address-form.tsx) |
| `card-form` | `form` | Payment details with formatting masks. | [CardForm](./card-form.tsx) |
| `credit-card-input` | `form` | Card number, expiry and CVC in one row. | [CreditCardInput](./credit-card-input.tsx) |
| `signature-pad` | `form` | Canvas signature with clear and undo. | [SignaturePad](./signature-pad.tsx) |
| `survey-scale` | `form` | Likert scale with accessible radio semantics. | [SurveyScale](./survey-scale.tsx) |
| `upload-list` | `form` | Upload progress list with retry. | [UploadList](./upload-list.tsx) |
| `dynamic-list-form` | `form` | Repeatable rows with add and remove. | [DynamicListForm](./dynamic-list-form.tsx) |
| `validation-summary` | `form` | Top-of-form summary after a failed submit. | [ValidationSummary](./validation-summary.tsx) |
| `async-validation` | `form` | Debounced server-side field validation. | [AsyncValidation](./async-validation.tsx) |
| `draft-banner` | `form` | Restored draft notice with discard. | [DraftBanner](./draft-banner.tsx) |
| `unsaved-guard` | `form` | Blocks navigation when the form is dirty. | [UnsavedGuard](./unsaved-guard.tsx) |
| `submit-bar` | `form` | Sticky bar with dirty enabling and cancel. | [SubmitBar](./submit-bar.tsx) |
| `conditional-fields` | `form` | Fields revealed by a previous answer. | [ConditionalFields](./conditional-fields.tsx) |
| `autosave-indicator` | `form` | Saved state without layout shift. | [AutosaveIndicator](./autosave-indicator.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Step transitions slide 16px and fade in 240ms; validation messages appear at 8px with no shake.

Full ladder, easing and reduced-motion rules: spec sections 3.3, 5.3 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Validation on first keystroke.
- More than seven fields without grouping.
- A disabled submit button with no explanation of what is missing.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

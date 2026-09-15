# Email components

Email-safe components without backdrop blur.

12 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `email-layout` | `email` | 600px single column with dark panels. | [EmailLayout](./email-layout.tsx) |
| `email-hero` | `email` | Subject, preheader and one primary action. | [EmailHero](./email-hero.tsx) |
| `email-cta` | `email` | Bulletproof button with a fallback link. | [EmailCta](./email-cta.tsx) |
| `email-receipt` | `email` | Payment receipt with a line item table. | [EmailReceipt](./email-receipt.tsx) |
| `email-digest` | `email` | Weekly digest with five entries. | [EmailDigest](./email-digest.tsx) |
| `email-invite` | `email` | Workspace invite with role and expiry. | [EmailInvite](./email-invite.tsx) |
| `email-verify` | `email` | Verification with a code and a link. | [EmailVerify](./email-verify.tsx) |
| `email-reset` | `email` | Password reset with a short expiry warning. | [EmailReset](./email-reset.tsx) |
| `email-changelog` | `email` | Release notes with category tags. | [EmailChangelog](./email-changelog.tsx) |
| `email-footer` | `email` | Preference and unsubscribe links. | [EmailFooter](./email-footer.tsx) |
| `email-quote` | `email` | Testimonial block for campaign mail. | [EmailQuote](./email-quote.tsx) |
| `email-signature` | `email` | Sender identity block. | [EmailSignature](./email-signature.tsx) |

## Data shape

`{ branding, headline, body, cta, unsubscribeUrl }` as plain serializable data.

## Motion contract

Every component in this folder animates, and it animates the same way:

- No motion is possible, so hierarchy carries the rhythm; the same layout is used in the web preview.

Full ladder, easing and reduced-motion rules: spec sections 8.4, 9.6 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Background images carrying meaning: many clients strip them.
- More than one CTA per email.
- Dark mode assumed to work without testing.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

# Commerce components

Product, cart, checkout, invoices and billing meters.

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
| `product-tile` | `commerce` | Product with price, plan chip and CTA. | [ProductTile](./product-tile.tsx) |
| `cart-line` | `commerce` | Cart row with quantity and remove. | [CartLine](./cart-line.tsx) |
| `checkout-summary` | `commerce` | Totals with tax lines and discount. | [CheckoutSummary](./checkout-summary.tsx) |
| `coupon-input` | `commerce` | Coupon field with inline validation. | [CouponInput](./coupon-input.tsx) |
| `invoice-row` | `commerce` | Invoice line with status and amount. | [InvoiceRow](./invoice-row.tsx) |
| `seat-picker` | `commerce` | Seat quantity with volume pricing hint. | [SeatPicker](./seat-picker.tsx) |
| `plan-switcher` | `commerce` | Change plan with proration preview. | [PlanSwitcher](./plan-switcher.tsx) |
| `usage-based-meter` | `commerce` | Metered billing with alert thresholds. | [UsageBasedMeter](./usage-based-meter.tsx) |
| `trial-banner` | `commerce` | Trial countdown with an upgrade action. | [TrialBanner](./trial-banner.tsx) |
| `upgrade-prompt` | `commerce` | Contextual upgrade at the limit. | [UpgradePrompt](./upgrade-prompt.tsx) |
| `discount-chip` | `commerce` | Savings chip with original price. | [DiscountChip](./discount-chip.tsx) |
| `price-display` | `commerce` | Price with period and billing note. | [PriceDisplay](./price-display.tsx) |
| `payment-method-card` | `commerce` | Saved card with expiry and default marker. | [PaymentMethodCard](./payment-method-card.tsx) |
| `receipt-card` | `commerce` | Payment receipt with a download action. | [ReceiptCard](./receipt-card.tsx) |
| `refund-panel` | `commerce` | Refund request with reason and amount. | [RefundPanel](./refund-panel.tsx) |
| `billing-toggle` | `commerce` | Monthly and annual switch with savings note. | [BillingToggle](./billing-toggle.tsx) |

## Data shape

`product: { id, name, price, currency, media }`, `plan: { id, name, price, interval, features }`.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Gallery cross-fades in 240ms; quantity steps use a 0.98 press; nothing bounces.

Full ladder, easing and reduced-motion rules: spec sections 5.2, 3.1 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Price hidden until the final step.
- Comparison tables with more than five columns.
- Stock urgency copy that changes on refresh.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

# Enterprise components

Enterprise administration, trust and procurement.

20 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `sso-config` | `enterprise` | SAML or OIDC setup with test connection. | [SsoConfig](./sso-config.tsx) |
| `scim-table` | `enterprise` | Provisioned users with sync state. | [ScimTable](./scim-table.tsx) |
| `rbac-matrix` | `enterprise` | Role and permission grid. | [RbacMatrix](./rbac-matrix.tsx) |
| `permission-chip` | `enterprise` | Single permission with a scope tooltip. | [PermissionChip](./permission-chip.tsx) |
| `role-card` | `enterprise` | Role with member count and description. | [RoleCard](./role-card.tsx) |
| `team-switcher` | `enterprise` | Team context switch. | [TeamSwitcher](./team-switcher.tsx) |
| `org-card` | `enterprise` | Organization identity and plan. | [OrgCard](./org-card.tsx) |
| `audit-timeline` | `enterprise` | Immutable action history. | [AuditTimeline](./audit-timeline.tsx) |
| `compliance-badge` | `enterprise` | SOC 2, GDPR or HIPAA badge. | [ComplianceBadge](./compliance-badge.tsx) |
| `data-residency-select` | `enterprise` | Region selection with latency note. | [DataResidencySelect](./data-residency-select.tsx) |
| `sla-card` | `enterprise` | Uptime commitment and credits. | [SlaCard](./sla-card.tsx) |
| `security-review-card` | `enterprise` | Questionnaire progress for procurement. | [SecurityReviewCard](./security-review-card.tsx) |
| `contract-card` | `enterprise` | Term, renewal and signed documents. | [ContractCard](./contract-card.tsx) |
| `procurement-checklist` | `enterprise` | Vendor onboarding steps. | [ProcurementChecklist](./procurement-checklist.tsx) |
| `enterprise-cta` | `enterprise` | Talk to sales with real assurances. | [EnterpriseCta](./enterprise-cta.tsx) |
| `sales-contact` | `enterprise` | Named contact with response time. | [SalesContact](./sales-contact.tsx) |
| `onboarding-checklist` | `enterprise` | Five-step workspace setup. | [OnboardingChecklist](./onboarding-checklist.tsx) |
| `migration-panel` | `enterprise` | Import from a competitor with mapping. | [MigrationPanel](./migration-panel.tsx) |
| `sandbox-banner` | `enterprise` | Sandbox environment warning. | [SandboxBanner](./sandbox-banner.tsx) |
| `trust-center-row` | `enterprise` | Trust center entry with document links. | [TrustCenterRow](./trust-center-row.tsx) |

## Data shape

`records: T[]`, `roleMap: Record<string, Permission[]>`, `audit: { actor, action, at }[]`.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Permission changes cross-fade in 240ms; audit rows enter with a 60ms cascade, capped at 400ms.

Full ladder, easing and reduced-motion rules: spec sections 5.8, 3.5, 9.2 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Permissions explained only in documentation.
- Audit rows without an actor.
- Role names that do not match the customer's words.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

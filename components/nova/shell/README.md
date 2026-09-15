# Shell components

Application shell and settings surfaces.

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
| `app-layout` | `shell` | Sidebar, topbar and content shell. | [AppLayout](./app-layout.tsx) |
| `topbar` | `shell` | App topbar with breadcrumb and actions. | [Topbar](./topbar.tsx) |
| `workspace-switcher` | `shell` | Workspace menu with search and create. | [WorkspaceSwitcher](./workspace-switcher.tsx) |
| `notification-bell` | `shell` | Bell with unread count and popover list. | [NotificationBell](./notification-bell.tsx) |
| `activity-drawer` | `shell` | Right drawer with recent workspace events. | [ActivityDrawer](./activity-drawer.tsx) |
| `settings-layout` | `shell` | Settings rail plus content column. | [SettingsLayout](./settings-layout.tsx) |
| `settings-section` | `shell` | Section with autosave and dirty tracking. | [SettingsSection](./settings-section.tsx) |
| `settings-rail` | `shell` | Section navigation for settings. | [SettingsRail](./settings-rail.tsx) |
| `danger-zone` | `shell` | Destructive section with typed confirmation. | [DangerZone](./danger-zone.tsx) |
| `api-keys-table` | `shell` | Key table with masked reveal and revoke. | [ApiKeysTable](./api-keys-table.tsx) |
| `sessions-table` | `shell` | Active sessions with revoke actions. | [SessionsTable](./sessions-table.tsx) |
| `billing-panel` | `shell` | Plan, seats, payment method and invoices. | [BillingPanel](./billing-panel.tsx) |
| `usage-meter` | `shell` | Quota usage with overage projection. | [UsageMeter](./usage-meter.tsx) |
| `members-table` | `shell` | Members with roles and last active. | [MembersTable](./members-table.tsx) |
| `invite-dialog` | `shell` | Invite by email with role select. | [InviteDialog](./invite-dialog.tsx) |
| `role-select` | `shell` | Role picker with permission summary. | [RoleSelect](./role-select.tsx) |
| `audit-log` | `shell` | Authored timeline of workspace actions. | [AuditLog](./audit-log.tsx) |
| `profile-form` | `shell` | Profile details with avatar upload. | [ProfileForm](./profile-form.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Sidebar collapses over 240ms with a width and opacity pair; the content region never re-layouts twice.

Full ladder, easing and reduced-motion rules: spec sections 5.8, 3.6 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Two navigation systems visible at once.
- Sidebar sections without counts or states.
- Hiding navigation behind an avatar menu.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

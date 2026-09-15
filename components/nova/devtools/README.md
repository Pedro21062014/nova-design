# Devtools components

Developer surfaces: logs, network, schema and debugging.

14 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `command-bar` | `devtool` | Inline command input with suggestions. | [CommandBar](./command-bar.tsx) |
| `hotkey-list` | `devtool` | Catalog of keyboard shortcuts. | [HotkeyList](./hotkey-list.tsx) |
| `feature-flag-panel` | `devtool` | Flags with rollout percentage. | [FeatureFlagPanel](./feature-flag-panel.tsx) |
| `env-switcher` | `devtool` | Environment switch with a danger tone. | [EnvSwitcher](./env-switcher.tsx) |
| `log-viewer` | `devtool` | Log stream with level filter and tail. | [LogViewer](./log-viewer.tsx) |
| `json-inspector` | `devtool` | Property inspector for a payload. | [JsonInspector](./json-inspector.tsx) |
| `request-timeline` | `devtool` | Waterfall of requests and durations. | [RequestTimeline](./request-timeline.tsx) |
| `network-table` | `devtool` | Network calls with status and size. | [NetworkTable](./network-table.tsx) |
| `perf-meter` | `devtool` | Frame budget and long task counter. | [PerfMeter](./perf-meter.tsx) |
| `error-report` | `devtool` | Crash report with stack and context. | [ErrorReport](./error-report.tsx) |
| `debug-drawer` | `devtool` | Bottom drawer with runtime state. | [DebugDrawer](./debug-drawer.tsx) |
| `api-playground` | `devtool` | Request builder with response viewer. | [ApiPlayground](./api-playground.tsx) |
| `webhook-tester` | `devtool` | Endpoint tester with event replay. | [WebhookTester](./webhook-tester.tsx) |
| `schema-viewer` | `devtool` | Table schema with column types. | [SchemaViewer](./schema-viewer.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- Panels toggle in 240ms; the timeline scrubs with a 0.06s spring and never snaps past the cursor.

Full ladder, easing and reduced-motion rules: spec sections 3.10, 6.7 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Color-coded log levels without a text label.
- Timeline panning that fights the page scroll.
- Raw stack traces as the first line of an error.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

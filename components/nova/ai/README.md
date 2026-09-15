# Ai components

Agent tooling: prompts, models, runs, evaluations, cost and guardrails.

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
| `prompt-library` | `ai` | Saved prompts with tags and insert action. | [PromptLibrary](./prompt-library.tsx) |
| `persona-card` | `ai` | System persona with tone and constraints. | [PersonaCard](./persona-card.tsx) |
| `prompt-variable-form` | `ai` | Fills template variables before sending. | [PromptVariableForm](./prompt-variable-form.tsx) |
| `model-select` | `ai` | Model picker with capability hints. | [ModelSelect](./model-select.tsx) |
| `temperature-control` | `ai` | Creativity control with three labelled stops. | [TemperatureControl](./temperature-control.tsx) |
| `tool-toggle-list` | `ai` | Enable or disable agent tools. | [ToolToggleList](./tool-toggle-list.tsx) |
| `agent-step-list` | `ai` | Plan steps with status and duration. | [AgentStepList](./agent-step-list.tsx) |
| `agent-run-card` | `ai` | A single agent run with outcome and cost. | [AgentRunCard](./agent-run-card.tsx) |
| `agent-log-stream` | `ai` | Streaming log with level filters. | [AgentLogStream](./agent-log-stream.tsx) |
| `eval-table` | `ai` | Evaluation results with pass rates. | [EvalTable](./eval-table.tsx) |
| `dataset-card` | `ai` | Dataset summary with row count and schema. | [DatasetCard](./dataset-card.tsx) |
| `embed-badge` | `ai` | Embedding model badge with dimension. | [EmbedBadge](./embed-badge.tsx) |
| `rag-source-list` | `ai` | Retrieved chunks with scores. | [RagSourceList](./rag-source-list.tsx) |
| `memory-card` | `ai` | Long-term memory entries the agent can use. | [MemoryCard](./memory-card.tsx) |
| `guardrail-panel` | `ai` | Policy rules with severity and action. | [GuardrailPanel](./guardrail-panel.tsx) |
| `cost-panel` | `ai` | Spend by model, tokens and period. | [CostPanel](./cost-panel.tsx) |
| `token-budget` | `ai` | Context budget with trimming advice. | [TokenBudget](./token-budget.tsx) |
| `latency-badge` | `ai` | Latency and throughput indicator. | [LatencyBadge](./latency-badge.tsx) |
| `streaming-status` | `ai` | Connection health for a live stream. | [StreamingStatus](./streaming-status.tsx) |
| `insight-card` | `ai` | Generated insight with confidence and sources. | [InsightCard](./insight-card.tsx) |

## Data shape

`run: { id, model, prompt, steps, output, tokens, cost, latencyMs }`.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Reasoning drawer expands over 420ms via grid-template-rows; the caret signals waiting after 3s of stall.

Full ladder, easing and reduced-motion rules: spec sections 4.1 to 4.9, 6.14 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Reasoning shown by default with no collapse control.
- Token and cost metrics in the primary flow.
- Streaming text that reflows the whole page on every token.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

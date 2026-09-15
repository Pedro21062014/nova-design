# Chat components

The complete conversational surface: thread, streaming, tools, composer.

30 components. Every file is a self-contained React + TypeScript + Tailwind
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
| `chat-shell` | `chat` | Three-region layout with independent scroll containers. | [ChatShell](./chat-shell.tsx) |
| `thread` | `chat` | Message list with grouping, day separators and live region. | [Thread](./thread.tsx) |
| `message-user` | `chat` | Right-aligned glass bubble with hover actions. | [MessageUser](./message-user.tsx) |
| `message-assistant` | `chat` | Full-width markdown answer with identity row. | [MessageAssistant](./message-assistant.tsx) |
| `message-system` | `chat` | Centered notice chip on a hairline. | [MessageSystem](./message-system.tsx) |
| `reasoning-drawer` | `chat` | Collapsed thought summary with duration chip. | [ReasoningDrawer](./reasoning-drawer.tsx) |
| `thinking-row` | `chat` | Dots, shimmer label and the latency ladder. | [ThinkingRow](./thinking-row.tsx) |
| `tool-card` | `chat` | Tool call with state rule, parameters and result. | [ToolCard](./tool-card.tsx) |
| `tool-approval` | `chat` | Approval card for write, spend and delete actions. | [ToolApproval](./tool-approval.tsx) |
| `artifact-card` | `chat` | Preview strip, version chip and open canvas. | [ArtifactCard](./artifact-card.tsx) |
| `canvas-panel` | `chat` | Split panel with preview, code and versions. | [CanvasPanel](./canvas-panel.tsx) |
| `composer` | `chat` | Sticky glass composer with auto-grow textarea. | [Composer](./composer.tsx) |
| `composer-tools` | `chat` | Model, tools and attachment controls. | [ComposerTools](./composer-tools.tsx) |
| `slash-menu` | `chat` | Command menu anchored above the composer. | [SlashMenu](./slash-menu.tsx) |
| `mention-menu` | `chat` | Mention menu for files, people and tools. | [MentionMenu](./mention-menu.tsx) |
| `attachment-chip` | `chat` | File chip with upload ring and remove. | [AttachmentChip](./attachment-chip.tsx) |
| `attachment-grid` | `chat` | Image attachment grid with lightbox. | [AttachmentGrid](./attachment-grid.tsx) |
| `streaming-caret` | `chat` | Caret that never jumps backward and pauses on stalls. | [StreamingCaret](./streaming-caret.tsx) |
| `message-actions` | `chat` | Copy, regenerate, rate, branch and share. | [MessageActions](./message-actions.tsx) |
| `message-rating` | `chat` | Inline feedback card with category chips. | [MessageRating](./message-rating.tsx) |
| `citation` | `chat` | Superscript reference with a hover preview card. | [Citation](./citation.tsx) |
| `sources-row` | `chat` | Numbered source list with show-all expansion. | [SourcesRow](./sources-row.tsx) |
| `follow-ups` | `chat` | Post-answer suggestion chips that send directly. | [FollowUps](./follow-ups.tsx) |
| `suggestion-grid` | `chat` | Empty-state prompt tiles that fill the composer. | [SuggestionGrid](./suggestion-grid.tsx) |
| `session-rail` | `chat` | Conversation history with search, pin and bulk actions. | [SessionRail](./session-rail.tsx) |
| `session-item` | `chat` | History row with rename, pin and delete. | [SessionItem](./session-item.tsx) |
| `context-panel` | `chat` | Artifacts, sources, memory and token budget. | [ContextPanel](./context-panel.tsx) |
| `token-meter` | `chat` | Context usage with a bar and reset countdown. | [TokenMeter](./token-meter.tsx) |
| `model-picker` | `chat` | Grouped model list with context and cost hints. | [ModelPicker](./model-picker.tsx) |
| `typing-presence` | `chat` | Collaborator typing indicator and avatar stack. | [TypingPresence](./typing-presence.tsx) |

## Hand-authored files

- [MessageAssistant](./message-assistant.tsx) - hand-authored in this category.
- [Composer](./composer.tsx) - hand-authored in this category.
- [StreamingCaret](./streaming-caret.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Data shape

`messages: { id, role, content, createdAt, status }[]`, where `status` is `sending | streaming | done | failed`.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Tokens appear as they stream, the caret blinks for 1s and stops 120ms after the stream ends.

Full ladder, easing and reduced-motion rules: spec sections 4.1 to 4.9 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Assistant answers inside bubbles: they are documents, not messages.
- Auto-scroll that fights the reader when they scroll up.
- A stop control that appears only after the first token.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)

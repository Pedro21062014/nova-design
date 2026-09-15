# Editors components

Code, diff, JSON, markdown and authoring surfaces.

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
| `code-block` | `editor` | Code with language chip, copy and wrap toggle. | [CodeBlock](./code-block.tsx) |
| `code-tabs` | `editor` | Multi-language tabbed code samples. | [CodeTabs](./code-tabs.tsx) |
| `terminal` | `editor` | Framed terminal with typed command option. | [Terminal](./terminal.tsx) |
| `diff-viewer` | `editor` | Unified diff with hunk collapse. | [DiffViewer](./diff-viewer.tsx) |
| `json-tree` | `editor` | Collapsible JSON with copy-path actions. | [JsonTree](./json-tree.tsx) |
| `markdown-preview` | `editor` | Rendered markdown with a raw toggle. | [MarkdownPreview](./markdown-preview.tsx) |
| `rich-text-toolbar` | `editor` | Formatting toolbar for authoring surfaces. | [RichTextToolbar](./rich-text-toolbar.tsx) |
| `slash-editor` | `editor` | Block editor with slash commands. | [SlashEditor](./slash-editor.tsx) |
| `cell-editor` | `editor` | Spreadsheet-style cell editing. | [CellEditor](./cell-editor.tsx) |
| `formula-input` | `editor` | Formula field with function hints. | [FormulaInput](./formula-input.tsx) |
| `canvas-board` | `editor` | Freeform board for diagrams and notes. | [CanvasBoard](./canvas-board.tsx) |
| `sticky-note` | `editor` | Small note surface with colour tones. | [StickyNote](./sticky-note.tsx) |
| `comment-thread` | `editor` | Threaded comments with resolve. | [CommentThread](./comment-thread.tsx) |
| `mention-input` | `editor` | Inline mention authoring with a menu. | [MentionInput](./mention-input.tsx) |

## Motion contract

Every component in this folder animates, and it animates the same way:

- The find bar drops 8px over 240ms; comment threads expand with the same height technique as drawers.

Full ladder, easing and reduced-motion rules: spec sections 3.3, 6.6 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Line numbers at full contrast, competing with the code.
- A toolbar with more than eight buttons.
- Comment threads that open in a modal.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

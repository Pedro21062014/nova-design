### 4.7 Composer (the input surface)

The composer is the most-used control in the product. It must feel solid, predictable and fast.

**Anatomy**

```
┌──────────────────────────────────────────────────────────────────────┐
│ attachments row (chips 40px, appears only when attachments exist)     │
├──────────────────────────────────────────────────────────────────────┤
│ textarea  (auto-grow 1 → 12 rows, 15.5px, 24px line height)          │
├──────────────────────────────────────────────────────────────────────┤
│ [+] attach   [model chip]   [tools]        [mic] [tokens] [Send ↑]   │
└──────────────────────────────────────────────────────────────────────┘
```

- Shell: glass `--glass-strong`, blur `--blur-lg`, radius `--radius-lg` (mobile: 20px top only),
  1px hairline, shadow 3, inner top highlight. On focus-within the hairline becomes accent at
  40 percent and a soft 3px ring appears.
- Height: minimum 96px (with toolbar), maximum 320px before internal scroll. Never jumps on send;
  the height transition back to the minimum uses 180ms.
- Placeholder: `--fg-subtle`, one line, describes capability ("Ask anything, or drop a file").
- Send button: 32px circle, primary gradient when the composer is non-empty, `--glass` when empty
  and disabled. Sending state swaps to a stop square with a 2px accent ring and a subtle pulse.
- Running tasks show a compact status row above the toolbar: tool name, elapsed time, cancel.

**Keyboard contract**

| Keys | Action |
|---|---|
| `Enter` | Send |
| `Shift+Enter` | Newline |
| `Cmd/Ctrl+Enter` | Send and immediately start a new thread |
| `Esc` | Clear the draft (if non-empty), otherwise blur |
| `ArrowUp` (empty, caret at start) | Edit the last user message |
| `/` at the start of a line | Open the slash command menu |
| `@` | Mention menu (files, people, tools, data sources) |
| `Shift+Cmd/Ctrl+V` | Paste as plain text (strip formatting) |
| `Cmd/Ctrl+K` | Insert a code block |
| Paste image or file | Attach and show a preview chip with a 4s upload ring |
| Paste more than 8000 characters | Offer to convert to a `.txt` attachment |
| Drag and drop | Full-width drop zone overlay with a dashed accent border |

**Slash commands** (menu anchored 8px above the composer, glass, grouped, 44px rows)

| Command | Effect |
|---|---|
| `/image` | Switch the turn to image generation, show an aspect-ratio picker |
| `/search` | Force web search for this turn, show a search chip above the textarea |
| `/code` | Force a code-focused answer, switch the artifact panel to the editor |
| `/summarize` | Summarize the current thread into a card |
| `/translate` | Inline language picker |
| `/canvas` | Open a document artifact and start writing in it |
| `/persona` | Insert a saved system persona chip |
| `/clear` | Start a fresh thread with the same settings |
| `/help` | Shortcut reference sheet |

Slash chips are removable before sending (click or backspace), and each chip shows as glass with
an accent icon so the forced behavior is visible in the sent message.

**Attachment rules**

- Up to 10 attachments, 25MB each, total 100MB, validated by MIME allow-list.
- Image thumbnails 56px with a remove `x` on hover, a 3px upload progress ring around the tile.
- Files show icon, name (middle truncated over 24 characters), size; clicking opens a preview sheet.
- Failed uploads stay attached with a danger state and a retry action; never silently drop.
- Pasting a URL with an image extension offers to import it as an attachment, one click.

**Composer states**

| State | Visual |
|---|---|
| empty | Send disabled, placeholder, sample prompt chips above (first 3 turns only) |
| typing | Send enabled, character counter hidden until 80 percent of the limit |
| uploading | Send disabled with a tooltip "Waiting for 1 file" |
| over limit | Counter turns `--warn`, send disabled, inline fix action |
| streaming | Send becomes Stop; typing is allowed and queues |
| offline | Amber banner above the composer, drafts are kept locally and flagged as queued |
| error on send | The message returns to the composer with the text intact plus a retry chip |

```tsx
"use client";
export function Composer({ onSend, streaming, onStop }: ComposerProps) {
  const [value, setValue] = useState("");
  const [rows, setRows] = useState(1);
  const ref = useRef<HTMLTextAreaElement>(null);

  const grow = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 320);
    el.style.height = `${next}px`;
    setRows(Math.min(12, Math.ceil(next / 24)));
  };

  return (
    <div className="sticky bottom-6 z-[var(--z-sticky)]">
      <div className="vitral-strong rounded-[var(--radius-lg)] p-3 transition-shadow focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
        <textarea
          ref={ref}
          rows={rows}
          value={value}
          onInput={grow}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (value.trim()) onSend(value.trim());
              setValue("");
            }
          }}
          placeholder="Ask anything, or drop a file"
          className="w-full resize-none bg-transparent text-[15.5px] leading-6 text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">{/* attach, model chip, tools */}</div>
          <div className="flex items-center gap-2">{/* mic, tokens, send or stop */}</div>
        </div>
      </div>
    </div>
  );
}
```

### 4.8 Reasoning and thinking display

Reasoning is shown but never forced on the reader.

- Collapsed by default after completion: a single row, 32px tall, glass inset, with a brain or
  sparkle icon, the label "Thought for 8 seconds", and a chevron.
- While thinking: the row shows a shimmering label ("Thinking", "Planning search", "Comparing 4 sources")
  with a 1px accent left rule that pulses opacity 0.4 to 1 over 1.6s.
- Expanded: the reasoning text renders in `--fs-sm`, `--fg-muted`, italic-free, mono-adjacent
  spacing, inside an inset panel with a hairline. Step lists render as an ordered list with 8px
  markers; each step gets its own 8px gap and can be individually collapsed when there are more
  than 6 steps.
- Never stream reasoning with the same visual weight as the answer: reasoning uses 14px muted text,
  the answer uses 16px primary text.
- Reasoning duration is measured client-side, rounded to the nearest second, and hidden when under
  1 second.
- Reasoning is excluded from copy-all and from share exports unless the user opts in.

```tsx
export function ReasoningDrawer({ text, ms }: { text: string; ms?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--hair-soft)] bg-[var(--glass-dim)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-8 w-full items-center gap-2 px-3 text-left text-[var(--fs-xs)] text-[var(--fg-muted)] hover:bg-[var(--glass)]"
      >
        <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden />
        <span className="relative">
          {ms ? `Thought for ${Math.round(ms / 1000)}s` : "Thinking"}
          <span className="absolute -inset-x-1 inset-y-0 animate-[shimmer_1.6s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.10),transparent)]" />
        </span>
        <ChevronDown className={cn("ml-auto size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <div className={cn("grid transition-[grid-template-rows] duration-[240ms] ease-[var(--ease-out)]", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="border-t border-[var(--hair-soft)] px-3 py-3 text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 4.9 Tool calls, function results and approvals

Agents and assistants act. Every action is visible, attributable and reversible where possible.

**Tool call card anatomy**

| Zone | Content |
|---|---|
| Header | 24px icon tile, tool name in mono `--fs-xs`, a state chip (`running`, `done`, `failed`, `waiting`) |
| Body | Collapsed by default to one line summary; expanded shows parameters as a key-value list |
| Result | Truncated to 8 lines with an expand, plus a "view raw" toggle for JSON |
| Meta row | Duration, tokens used, cost when non-zero, a source link |
| Actions | Cancel (running), Retry (failed), Approve and Deny (waiting), Copy result |

States and colors:

- `running`: accent left rule, spinner, shimmering label, live elapsed timer.
- `done`: `--accent-2` check, hairline, muted parameters.
- `failed`: `--danger` left rule, error line, retry button.
- `waiting` (approval): accent border, expanded by default, showing the exact parameters, the
  human-readable summary, the estimated cost or side effect, and two buttons (Approve primary,
  Deny ghost). Approval never auto-clicks: the primary button requires a real click and is disabled
  for 400ms after appearing to prevent accidental double-submits.
- `denied`: neutral, struck-through, with a "tell the model why" link that focuses the composer.

Rules: tool cards never exceed 3 visible in a row (group them under "3 more actions"); consecutive
calls to the same tool merge into one card with a count badge; every tool card shows the
destination of the action (which integration, which record) so the user can audit it.

### 4.10 Artifacts and the canvas panel

An artifact is a substantial, editable deliverable: a document, a component, a diagram, a data
table or a working app preview.

**Artifact card in the thread**

- Glass card, `--radius`, 16px padding, header with type icon, title (editable inline), version
  chip (`v3`), and actions: open, copy, download, share.
- A 96px preview strip: rendered page thumbnail for HTML, first lines of code for code, a mini
  chart for data. Rendered in a `--bg-elevated` inset with a hairline.
- Clicking opens the context panel (desktop) or a full-screen sheet (mobile).

**Canvas panel**

- 360 to 480px wide on desktop, split view with the thread; draggable divider with a 4px hit area
  and a 12px minimum, remembered per user.
- Tabs at the top: Preview, Code, Versions. Preview is the default for documents and apps, Code for
  scripts and components.
- Preview iframe: sandboxed, white or dark surface inside a glass frame, with a device-width toggle
  (375, 768, 1280) and a refresh action.
- Code view: read-only with a copy action; "Edit" switches to an editable editor with a 1s-debounced
  save, a diff marker in the gutter, and an explicit "Apply to artifact" action.
- Versions: a vertical list of saved revisions with relative time, a one-line change summary, and a
  diff viewer (Section 3.24); restoring a version creates a new revision rather than overwriting.
- While a new revision streams, the panel shows a shimmering top bar and keeps the previous render
  interactive.
- Download/export: `.md`, `.html`, `.tsx`, `.csv` or `.png` depending on the artifact type.

### 4.11 Citations, sources and retrieval

- Inline citations render as 12px superscript numbers in `--accent` with a 20 percent tinted
  background; hover shows a preview card with favicon, title, domain and a 2-line snippet.
- The sources row after the message lists up to 6 sources as compact glass cards (32px favicon,
  title, domain, page number when applicable), with "Show all 14" expanding into a scrollable list.
- A retrieval activity line appears before the answer when the model searched: "Searched 4 sources
  in 2.1s" with an expandable list of queries, shown in `--fs-xs` `--fg-subtle`.
- Sources are numbered in citation order, not retrieval order.
- Never fabricate a citation style; if a source lacks a title, show the domain plus the path.
- Files attached by the user appear in the sources row with a file icon and the page range.

### 4.12 Empty state, prompt suggestions and follow-ups

**First-run / new thread**

1. Greeting block: 32px accent glyph in a glass tile, `--fs-h1`-scale greeting that adapts to the
   time of day, and one line of orientation. Never a generic "How can I help you today?".
2. Composer is centered vertically, with the suggestion row beneath it (not above).
3. Suggestion cards: 3 to 4 glass tiles in a row (2x2 on mobile), each with an icon, a title and a
   concrete prompt in `--fs-xs`. Clicking fills the composer (never sends immediately) unless the
   user has enabled one-click suggestions in settings.
4. Optional capability row: small chips for the enabled capabilities (Web, Code, Vision, Files).
5. Recent threads are not shown in the chat area; they live in the sidebar, keeping the surface calm.

**Follow-up suggestions**

- After a completed answer, show up to 3 chips with a 400ms delay, each a short imperative phrasing
  derived from the answer, never a question the user did not ask.
- Chips are dismissible as a group with an `x` that remembers the preference.
- Clicking a chip sends immediately (these are explicit actions, not drafts).

**In-thread nudges**: context usage above 80 percent shows a chip offering to summarize; a
10-message thread without a title gets an auto-title after 300ms of inactivity.

### 4.13 Sidebar, sessions and history

- Sections: New chat (button, keeps the `Cmd+Shift+O` shortcut), Pinned (max 5, drag to reorder),
  Today, Yesterday, Previous 7 days, Older, plus a Projects group when enabled.
- Each row: 32px height, chat icon or emoji-free dot, title truncated to 28 characters, hover reveals
  rename and a menu (pin, share, duplicate, export, delete). Active row uses `--glass-strong` with a
  2px accent left bar.
- Search field at the top of the rail with 250ms debounce, inline results in the list, and matched
  terms highlighted.
- Multi-select mode: `Cmd/Ctrl` click or a checkbox on hover; a bulk bar appears with move, export
  and delete.
- Infinite loading: 30 items per page with a 24px skeleton row while fetching.
- Deleting a thread: soft delete with an undo toast (6s), then permanent removal; the current thread
  falls back to a new conversation.
- Collapsed rail shows icons only with 400ms tooltips; the active icon keeps the accent bar; the rail
  width animates 240ms and the thread column re-centers with a 120ms delay to avoid jitter.

### 4.14 Multi-user presence and collaboration

- Live cursors in shared threads: 12px colored dot with a 1px white ring plus a name chip, moving
  with a 120ms interpolation; the label fades after 3s of inactivity.
- Presence avatars in the header (max 3 plus a counter), with a hover popover listing collaborators
  and their state.
- Someone typing shows "Ana is typing" 16px above the composer in `--fs-xs` `--fg-subtle`.
- Comment mode: click any message to attach a threaded comment; comment pins are 24px accent chips
  anchored to the message edge; the thread shows a count and a slide-over panel.
- Conflicting edits to the same artifact show a 2px dashed accent border and an explicit
  "Accept theirs / Keep mine / Merge" bar.

### 4.15 Chat settings and model selection

- Model picker: a glass chip in the composer toolbar opening a 320px popover with a search field,
  grouped by family, each row showing name, one-line capability, context window and a cost hint.
  The current model keeps a check; switching mid-thread inserts a system chip in the thread.
- Per-thread settings (right popover, "Thread settings"): temperature-style creativity as a
  three-stop segmented control (Precise, Balanced, Creative), response length (Short, Medium, Long),
  tone (Default, Concise, Explanatory, Formal), and a system prompt textarea with a 4000-character
  counter.
- Behavior toggles: web search, code execution, memory, tools, auto-title, one-click suggestions,
  send-on-Enter.
- Account-level defaults live in Settings (Section 3.29) and are inherited by new threads; per-thread
  changes show a "modified" dot next to the popover trigger and a "reset to default" link.
- Usage panel: token meter (context used of total with a progress bar), cost of the current thread,
  and a rate-limit strip with a reset countdown.

### 4.16 Chat keyboard map and accessibility

| Keys | Action |
|---|---|
| `Cmd/Ctrl+K` | Command palette |
| `Cmd/Ctrl+Shift+O` | New thread |
| `Cmd/Ctrl+B` | Toggle sidebar |
| `Cmd/Ctrl+J` | Toggle context panel |
| `Cmd/Ctrl+/` | Shortcut sheet |
| `Cmd/Ctrl+Shift+C` | Copy the last answer |
| `Cmd/Ctrl+Shift+Backspace` | Clear the thread (with confirm) |
| `ArrowUp` / `ArrowDown` | Move between messages when the composer is empty |
| `R` on a focused message | Regenerate |
| `E` on a focused message | Edit (user messages only) |
| `Esc` | Close the topmost overlay, then blur |

Accessibility requirements:

- The thread is a `role="log"` region with `aria-live="polite"` that receives only completed
  messages; the streaming message is excluded from the live region to avoid screen-reader spam, and
  its completion is announced with a single "Response complete, 320 words" notice.
- Every message is focusable (`tabindex="-1"`) and reachable from the thread with arrows for
  keyboard users.
- Code blocks are reachable, labeled ("Code block, TypeScript, 42 lines") and scrollable by keyboard.
- The composer grows with `aria-describedby` and announces attached files in a status region.
- Reduced motion disables the caret animation, shimmer, cursor interpolation and auto-scroll easing.
- Contrast: message text on glass must pass AA against the worst-case backdrop; the aurora must be
  dimmed under a `@media (prefers-contrast: more)` rule that raises glass opacity to 0.12 and
  removes the aurora entirely.

### 4.17 Chat hero (marketing variant)

Landing pages often need a conversation as the hero visual. Rules:

- Show a single completed example exchange, realistic and specific to the product, never "Hello!".
- The visual is a glass panel at `--radius-xl` with a 12px inner frame, a fake but functional
  composer at the bottom that opens the real product on focus, and a 3-row thread above.
- Animate: messages type in sequence on first scroll into view (24ms per character, 400ms between
  messages, once only), then hold. Under reduced motion, render fully typed.
- Never animate a typing loop indefinitely; it reads as a loading bug on repeat visits.
- Optional: a small "Try it live" chip in the panel corner linking to a sandbox.

### 4.18 Feedback, ratings and sharing

- Thumbs up and down on every completed assistant message; rating up triggers a subtle 1.2s accent
  glow on the icon and no toast.
- Rating down opens an inline card with category chips (Incorrect, Incomplete, Unsafe, Formatting,
  Too verbose, Other), an optional 240-character comment, an optional "include context" checkbox,
  and Send. Sending collapses the card into a "Thanks, feedback sent" line with an edit link.
- Copy feedback: a link in the answered state to copy the message id for support.
- Share: creates a read-only public view (glass layout, no aurora animation, watermark-free),
  with options for the entire thread or a selection, expiry (7 days, 30 days, never) and whether to
  include reasoning, sources and artifacts.
- Export: Markdown, JSON and PDF; export dialog shows a preview of what is included.
- Regenerate with feedback: selecting a reason in the feedback card offers "Regenerate with this
  note" which sends the note as a hidden instruction.

### 4.19 Selection toolbar inside the thread

Selecting text in an assistant message opens a floating glass toolbar (36px tall, `--radius-full`,
shadow 3) positioned 8px above the selection, with:

| Action | Behavior |
|---|---|
| Ask about this | Inserts a quoted block into the composer with focus |
| Quote | Adds the selection as a `>` blockquote in the draft |
| Copy | Copies the plain text, shows a check |
| Explain | Sends "Explain: <selection>" as a new turn |
| Translate | Sends with the target language chosen from a submenu |

Toolbar animation: 120ms fade plus 4px rise from the selection origin; dismiss on scroll, click
outside, `Esc`, or selection loss. On touch devices, use the native selection menu plus a single
glass button anchored to the selection when the platform allows it.

### 4.20 Chat scene anti-patterns

1. A spinner instead of streaming text.
2. Auto-scroll hijacking while the user reads earlier messages.
3. Simulated typing for local operations that are instant.
4. Bubbles on both sides with equal width for assistant and user. The assistant is a document, not
   a chat bubble.
5. Reasoning rendered with the same hierarchy as the answer.
6. Tool calls hidden behind a generic "Working..." with no details.
7. Auto-approving a tool that writes, spends or deletes.
8. Losing the draft on navigation or on a failed request.
9. Toasts for every copy action.
10. Purple-blue gradients on every surface until nothing stands out.
11. Infinite suggestion chips that push the composer below the fold.
12. A composer that grows to the height of the viewport with no inner scroll.

---

## 4. Chat Scene

The Chat Scene is the flagship interface of Nova Vitral: a conversational AI workspace built from
glass surfaces, restrained motion and precise information hierarchy. It is the most complete
reference in this specification; every other page pattern borrows from it.

> Scope note for agents: this part covers layout, message anatomy, streaming, reasoning, tool
> calls, artifacts, citations, composer, sidebar, feedback and accessibility for chat products.
> Read it in two passes: `4.0` to `4.6` for structure and message rendering, `4.7` to `4.20` for
> interaction, state and polish.

### 4.0 Chat scene blueprint

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  RAIL 64px        HEADER 56px   model picker · title · actions · share        │
├──────────┬────────────────────────────────────────────────────┬───────────────┤
│ sessions │  AURORA GROUND                                     │  CONTEXT      │
│ history  │  ┌──────────────────────────────────────────────┐  │  PANEL 360px  │
│ search   │  │  THREAD  (max 760px, centered)               │  │  artifacts    │
│ new chat │  │  · day separator                             │  │  sources      │
│ pinned   │  │  · user message (right aligned bubble)       │  │  memory       │
│ folders  │  │  · assistant message (full width, no bubble) │  │  tokens       │
│ profile  │  │  · reasoning drawer (collapsed by default)   │  │  tools        │
│          │  │  · tool call card                            │  │               │
│          │  │  · artifact card                             │  │               │
│          │  └──────────────────────────────────────────────┘  │               │
│          │  ── COMPOSER (glass, sticky bottom, max 760px) ──  │               │
└──────────┴────────────────────────────────────────────────────┴───────────────┘
```

Layout rules:

1. **Three independent scroll containers**: rail (fixed), thread (scrolls), context panel
   (scrolls). They never share a scroll parent.
2. The thread column is `max-width: 760px` (72ch at 15.5px) centered with 24px gutters. On wide
   screens the extra space goes to the context panel, never to longer lines.
3. The composer is sticky at the bottom of the thread column with a 24px floating gap above the
   viewport edge; the thread scrolls beneath it behind a `--grad-veil` mask so it never looks cut.
4. The header is 56px, glass with blur, bottom hairline, and shows the conversation title with
   inline rename, model chip, token usage, share and overflow actions.
5. Aurora background is fixed, never scrolls with content, at 60 percent of the marketing intensity.
6. Rail collapses under 1280px into an icon rail; under 1024px it becomes an off-canvas drawer
   triggered by the header. The context panel collapses under 1180px and becomes a right drawer.
7. Empty state (new conversation) replaces the thread with the greeting block from Section 4.12.
8. Every region has its own skeleton; never a full-page spinner.

Responsive matrix:

| Breakpoint | Rail | Thread | Context panel | Composer |
|---|---|---|---|---|
| `>= 1440` | 264px expanded | 760px centered | 360px docked | full width of thread, 3 rows |
| `1280-1439` | 64px rail | 760px centered | 360px docked | same |
| `1024-1279` | 64px rail | fluid, max 760px | drawer on demand | same |
| `768-1023` | drawer | fluid, full width | drawer | 2 to 6 rows, toolbar wraps |
| `< 768` | drawer | fluid | full-screen sheet | 1 to 5 rows, actions in a menu |

### 4.1 Principles for AI interfaces

1. **Show intent before output.** Reasoning, tool calls, retrieval and planning are visible,
   collapsible and cheap to ignore. The user must never wonder why the model is waiting.
2. **Stream honestly.** Text appears as it is produced, with a cursor that never jumps backward.
   Completed segments are immutable; re-generation creates a new version, not a rewrite in place.
3. **Confirm before side effects.** Any action that writes, sends, spends or deletes requires an
   explicit approval card with parameters, cost estimate and a confirm control.
4. **Never lose user work.** The composer drafts autosave per conversation, attachments survive
   navigation, and stopping a generation keeps the partial text.
5. **Progressive disclosure over density.** Reasoning, sources and parameters are drawers.
   The default view is: question, answer, actions.
6. **Failure is a state, not an exception.** Every error has a retry, an explanation and a
   fallback model or a manual path.
7. **Measurable cost.** Token usage, latency and context budget are always one click away.

### 4.2 Message list and thread behavior

**Grouping**

- Consecutive messages from the same author within 5 minutes merge: the avatar appears once,
  subsequent bubbles drop the header and reduce the vertical gap to 8px.
- Assistant replies are always separated from the previous message by 24px regardless of timing,
  because they are the object of attention.
- Day separators: a centered 1px line with a label chip (`Today`, `Yesterday`, `Mar 4`) at 32px
  vertical spacing. The label is sticky under the header while its group is in view.

**Virtualization**

- Virtualize above 60 messages with a window of `overscan: 6` and measured dynamic heights.
- Group messages into "blocks" (user turn plus everything it produced) and virtualize by block so
  that streaming updates do not break measurement.
- Per-message state (reacted, collapsed, expanded) is stored in a store, not in component state,
  so unmounting never loses it.
- `scroll anchoring` is prohibited; explicitly control scroll position (see scroll rules below).

**Scroll rules**

| Situation | Behavior |
|---|---|
| User is at the bottom, new token arrives | auto-follow, no animation |
| User scrolled up, new token arrives | stop following, show a floating "Jump to latest" pill with a count |
| User sends a message | scroll the user message to 25 percent from the top, smooth 320ms |
| User clicks "Jump to latest" | smooth scroll to bottom, pill hides |
| Regenerate | keep scroll anchored to the top of the regenerated message |
| Streaming ends | no scroll change, never an abrupt jump |

The "Jump to latest" pill is glass, 32px tall, centered 16px above the composer, with an arrow-down
icon plus a count chip.

```tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useThreadScroll(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const near = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
      setAtBottom(near);
      if (near) setUnread(0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    if (atBottom) scrollToBottom(false);
    else setUnread((n) => n + 1);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, atBottom, unread, scrollToBottom };
}
```

### 4.3 Message anatomy

**User message**

- Right-aligned, maximum 68 percent width on desktop, 88 percent on mobile.
- Glass fill `--glass-strong`, radius `--radius-lg` with the bottom-right corner at
  `--radius-xs` (6px) to signal origin, hairline, 16px padding, 15px text.
- Attachments render above the text inside the same bubble: image thumbnails 96px, file chips with
  icon, name, size and a download action.
- Actions appear on hover, below the bubble, right aligned: copy, edit, delete, and a timestamp.
- Editing swaps the bubble for an inline editor with a 6-row autogrowing textarea, Save and Cancel;
  saving truncates everything after it after a confirmation when the thread is long.

**Assistant message**

- No bubble. Full 760px width, transparent background, `--fg` text at 16px with 1.7 line height.
- Identity row above the text: 24px logo tile (glass, accent glyph), model name in `--fs-xs`,
  a state chip when streaming or reasoning, and a timestamp on hover.
- Markdown rendered per Section 4.5. Code blocks, tables and artifacts are the only elements with
  their own surfaces.
- Actions bar below the message, revealed on hover but always present after streaming completes
  on touch devices: copy, regenerate, rating up, rating down, branch, share, more.
- The entire message is a source of copy: selecting text and using the selection toolbar
  ("Ask about this", "Quote", "Copy") is a first-class interaction (Section 4.19).

```tsx
export function AssistantMessage({ m }: { m: Message }) {
  return (
    <article className="group relative flex gap-4 py-6" data-state={m.state}>
      <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
        <Sparkle className="size-3.5 text-[var(--accent)]" aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-2 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          <span className="font-medium text-[var(--fg-muted)]">{m.model}</span>
          {m.reasoningMs && <ReasoningChip ms={m.reasoningMs} />}
          <time className="opacity-0 transition-opacity group-hover:opacity-100" dateTime={m.createdAt}>
            {formatTime(m.createdAt)}
          </time>
        </header>

        {m.reasoning && <ReasoningDrawer text={m.reasoning} ms={m.reasoningMs} />}
        {m.tools?.map((t) => <ToolCallCard key={t.id} tool={t} />)}

        <div className="prose-vitral mt-3">
          <Markdown content={m.content} streaming={m.state === "streaming"} />
        </div>

        {m.artifacts?.map((a) => <ArtifactCard key={a.id} artifact={a} />)}
        {m.sources?.length ? <SourcesRow sources={m.sources} /> : null}
        {m.state === "error" && <MessageError message={m.error} onRetry={m.retry} />}

        <MessageActions m={m} />
      </div>
    </article>
  );
}
```

**Message states**

| State | Visual | Controls |
|---|---|---|
| `queued` | 40 percent opacity, "Queued" chip | cancel |
| `thinking` | idle row with shimmer label and elapsed timer | stop |
| `reasoning` | collapsed reasoning drawer with a pulsing left rule | expand, stop |
| `streaming` | text with a 2px blinking caret at the insertion point | stop, no copy of partial unless stopped |
| `tool_running` | tool card in `running` state with a spinner and a step label | cancel tool |
| `awaiting_approval` | tool card with accent border and confirm or deny | approve, deny, edit params |
| `complete` | full actions bar | all actions |
| `stopped` | "Stopped" chip, caret removed, text frozen and copyable | continue, regenerate |
| `error` | danger-tinted panel with the reason and a code | retry, switch model, report |
| `moderated` | neutral panel explaining the block with a policy link | edit prompt, appeal |

### 4.4 Message types (rendering matrix)

| Type | Rendering |
|---|---|
| User text | Glass bubble, right aligned |
| Assistant text | Markdown, full width |
| System notice | Centered chip on a hairline, `--fs-xs`, `--fg-subtle` (model switched, thread summarized, context trimmed) |
| Image output | 1 to 4 images in a grid, 2px gap, radius `--radius`, click to lightbox, actions: download, upscale, vary |
| Image input | Thumbnail 96px in the user bubble, removable before send with an `x` chip |
| File attachment | Chip with MIME icon, name, size, and a preview-on-click sheet |
| Audio (voice) | Waveform 32px tall generated from the audio, play button 32px, duration, 1x to 2x speed control |
| Audio (TTS of a reply) | Speaker icon in the message actions, playing state shows animated bars |
| Video | Glass-framed player with the poster behind a veil (Section 3.23) |
| Table output | Rendered HTML table with tabular numbers, sticky header beyond 10 rows, CSV export |
| Chart output | Chart per Section 3.21 with an "open in canvas" action |
| Code output | Code block with language chip, copy, wrap, and "open artifact" |
| JSON or structured output | Collapsible tree view, mono 13px, copy path action per node |
| Canvas document | Artifact card that opens the context panel |
| Embed or link preview | Unfurled glass card with favicon, title, domain, and a 16:9 media slot |
| Error or refusal | Neutral or danger panel, never a bubble |
| Feedback request | Inline card after a thumbs-down: category chips plus a comment field |

### 4.5 Markdown, typography and rich rendering

Prose rules for assistant output (`.prose-vitral`):

- Font size 16px, line height 1.7, paragraph spacing 16px, `max-width: 68ch`.
- Headings inside a reply: H3 at `--fs-h4`, H4 at `--fs-body` semibold. H1 and H2 are reserved for
  artifacts and canvas documents.
- Links: `--accent`, underline on hover with a 3px offset, external links get a 12px arrow icon and
  `rel="noopener noreferrer"` with `target="_blank"`.
- Lists: 24px indent, 8px item spacing, custom markers (6px accent dot for bullets, tabular numbers
  for ordered), nested lists reduce marker size.
- Blockquotes: 2px accent left rule, 16px padding-left, `--fg-muted`, no italic body.
- Inline code: `--bg-elevated` at 70 percent, 1px hairline, 4px radius, 13px mono, 2px padding.
- Tables: hairline rows, header in `--fs-xs` uppercase `--fg-subtle`, cells 12px padding,
  first column left, numeric columns right with tabular numbers, horizontal scroll with a fade mask,
  copy-as-markdown action on the table corner.
- Footnotes and citations: superscript 12px accent numbers linking to the sources row.
- Mathematical notation: KaTeX inline, display blocks centered in a glass inset panel with a copy
  LaTeX action.
- Divider: hairline with 24px vertical margins.
- Images in replies: radius `--radius`, hairline, click to lightbox, caption in `--fs-xs` centered.
- Never render raw HTML from a model without sanitization (`rehype-sanitize` with a strict schema).
- Never render a link the model produced as clickable without protocol validation.

**Streaming cursor**: a 2px wide, 1em tall block in `--accent` with `animation: caret 1s steps(2)`
after the last character; it disappears 120ms after the stream ends; never blinks on long pauses
of more than 3s (the caret pauses instead to signal waiting).

### 4.6 Streaming, stop, retry and regeneration

**Streaming pipeline** (client side)

1. Request opens a stream (SSE or fetch with `ReadableStream`).
2. Tokens are appended to a buffer and flushed to the UI at most once per animation frame.
3. Markdown is re-parsed incrementally: parse only the last incomplete block, keep previous blocks
   memoized by index so React does not re-render the whole message.
4. Auto-scroll follows only while the user is at the bottom (Section 4.2).
5. On end, the message state moves to `complete`, actions animate in over 180ms, and the usage meter
   updates with a 400ms count-up.

**Latency perception rules**

- Under 400ms to the first token: show nothing but the composer sending state.
- 400ms to 2s: show a "thinking" row with three 4px dots pulsing 1.2s and a shimmer label with the
  model name.
- 2s to 10s: upgrade the row to include the elapsed timer and, if available, the current step
  ("Searching the web", "Reading 3 files").
- Above 10s: add a cancel affordance with the label "Stop generating" and show a partial-plan card
  when the model exposes one.

**Stop** keeps the partial text, marks the message `stopped`, and offers "Continue" (sends a
continuation turn) and "Regenerate".

**Regenerate** creates version 2 of the same message, keeps version 1 in a version history
accessible from the actions bar (`< 2 / 3 >` chips), and scrolls to the top of the regenerated
message. The previous version is never deleted client-side.

**Retry** for errors uses exponential backoff built into the request layer (3 attempts: 500ms,
1.5s, 4s) and only surfaces a message error after the final failure, with the last error code.

**Branches**: editing a user message or regenerating an assistant message creates a branch; the
thread shows a subtle branch chip with `n` alternatives at the divergence point, and switching a
branch animates the swap with a 200ms crossfade plus a 12px horizontal slide.

**Concurrency**: sending while streaming either queues the message (default, with a "Queued" chip)
or interrupts by model choice; the setting lives in Section 4.15. Never allow two simultaneous
streams in one thread.

---

# Examples 51 to 65 - Chat Scene

The flagship surface. Part of the Nova Vitral example library. Index: `examples/00-index.md`.
All snippets assume the layout and rules of `nova-design.md` section 4.

---

## EX-51 - Chat shell (three columns, three scroll containers)

**Base:** custom + `react-resizable-panels`
**Shows:** rail, thread, context panel; independent scrolling; responsive collapse

```tsx
export default function ChatPage() {
  return (
    <div className="grid h-dvh grid-cols-[264px_minmax(0,1fr)] xl:grid-cols-[264px_minmax(0,1fr)_360px]">
      <aside className="hidden h-full overflow-y-auto border-r border-[var(--hair)] lg:block">
        <SessionRail />
      </aside>

      <main className="relative flex h-full min-w-0 flex-col">
        <ChatHeader />
        <div className="relative flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto overscroll-contain scroll-smooth px-[var(--gutter)]">
            <div className="mx-auto w-full max-w-[760px] pb-[220px] pt-8">
              <Thread />
            </div>
          </div>
          {/* veil so the thread fades under the composer instead of being cut */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(180deg, transparent, var(--bg) 78%)" }} />
        </div>
        <Composer />
      </main>

      <aside className="hidden h-full overflow-y-auto border-l border-[var(--hair)] xl:block">
        <ContextPanel />
      </aside>
    </div>
  );
}
```

**Motion:** panels animate width only on user action; nothing animates on route entry except a 180ms fade.
**Refs:** 4.0, 3.31 (scroll lock and long content guard)

---

## EX-52 - Thread with day separators and message grouping

**Base:** custom
**Shows:** grouping within 5 minutes, sticky day labels, block-based list

```tsx
export function Thread({ blocks }: { blocks: Block[] }) {
  return (
    <div role="log" aria-live="polite" aria-relevant="additions text" className="grid gap-6">
      {blocks.map((block, i) => {
        const showDay = i === 0 || isNewDay(blocks[i - 1].at, block.at);
        return (
          <div key={block.id} className="grid gap-4">
            {showDay && (
              <div className="sticky top-2 z-[var(--z-sticky)] flex items-center gap-3" role="separator">
                <span className="h-px flex-1 bg-[var(--hair-soft)]" />
                <span className="rounded-full border border-[var(--hair-soft)] bg-[var(--glass)] px-2.5 py-1 text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)] backdrop-blur-[var(--blur-sm)]">
                  {dayLabel(block.at)}
                </span>
                <span className="h-px flex-1 bg-[var(--hair-soft)]" />
              </div>
            )}
            {block.messages.map((m, j) => (
              <Message key={m.id} message={m} grouped={j > 0 && sameAuthor(block.messages[j - 1], m)} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
```

**Motion:** new blocks fade and rise 8px in 240ms; grouped messages appear with no animation.
**Refs:** 4.2, 6.2

---

## EX-53 - User message bubble

**Base:** custom
**Shows:** asymmetric radius, hover actions, inline edit

```tsx
export function UserMessage({ m, grouped }: { m: Msg; grouped?: boolean }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="group flex flex-col items-end gap-1.5">
      {!grouped && (
        <span className="pr-1 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          You · <time dateTime={m.createdAt}>{formatTime(m.createdAt)}</time>
        </span>
      )}

      {editing ? (
        <div className="w-full max-w-[88%] rounded-[var(--radius-lg)] border border-[var(--accent)] bg-[var(--glass-dim)] p-2 shadow-[0_0_0_3px_var(--accent-soft)]">
          <textarea defaultValue={m.content} rows={Math.min(8, m.content.split("\n").length)} autoFocus
            className="w-full resize-none bg-transparent px-2 py-1.5 text-[15px] leading-6 text-[var(--fg)] outline-none" />
          <div className="mt-1 flex justify-end gap-2">
            <Button size="xs" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            <Button size="xs" onClick={() => setEditing(false)}>Save and resend</Button>
          </div>
        </div>
      ) : (
        <div className="max-w-[88%] rounded-[var(--radius-lg)] rounded-br-[var(--radius-xs)] border border-[var(--hair)] bg-[var(--glass-strong)] px-4 py-3 text-[15px] leading-6 text-[var(--fg)] md:max-w-[68%]">
          {m.attachments?.length ? <AttachmentRow items={m.attachments} /> : null}
          <p className="whitespace-pre-wrap break-words">{m.content}</p>
        </div>
      )}

      <div className="flex items-center gap-1 pr-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <IconAction label="Copy" icon={Copy} onAct={m.copy} />
        <IconAction label="Edit" icon={Pencil} onAct={() => setEditing(true)} />
        <IconAction label="Delete" icon={Trash2} onAct={m.remove} />
      </div>
    </div>
  );
}
```

**Motion:** actions fade in 150ms; edit swaps in place with no layout jump.
**Refs:** 4.3, 3.31

---

## EX-54 - Assistant message with markdown

**Base:** `react-markdown` + `remark-gfm` + `rehype-sanitize`
**Shows:** identity row, prose styles, safe rendering

```tsx
<article className="group flex gap-4 py-2">
  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
    <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden />
  </span>

  <div className="min-w-0 flex-1">
    <header className="flex items-center gap-2 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
      <span className="font-medium text-[var(--fg-muted)]">{m.model}</span>
      {m.reasoningMs ? <ReasoningChip ms={m.reasoningMs} /> : null}
    </header>

    <div className="prose-vitral mt-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline-offset-4 hover:underline" />,
          code: CodeBlock,
          table: DataTable,
        }}>
        {m.content}
      </ReactMarkdown>
    </div>

    <MessageActions message={m} />
  </div>
</article>
```

```css
.prose-vitral { font-size: 16px; line-height: 1.7; max-width: 68ch; color: var(--fg); }
.prose-vitral > * + * { margin-top: 16px; }
.prose-vitral h3 { font-size: var(--fs-h4); font-weight: 600; letter-spacing: -0.015em; }
.prose-vitral ul { padding-left: 24px; list-style: none; }
.prose-vitral li::before { content: ""; position: absolute; }
.prose-vitral blockquote { border-left: 2px solid var(--accent); padding-left: 16px; color: var(--fg-muted); }
.prose-vitral code:not(pre code) { background: color-mix(in srgb, var(--bg-elevated) 70%, transparent); border: 1px solid var(--hair); border-radius: 4px; padding: 2px 5px; font-family: var(--font-mono); font-size: 13px; }
```

**Motion:** none while rendering; only the caret (EX-55) animates.
**Refs:** 4.5, 4.3

---

## EX-55 - Streaming caret and incremental flush

**Base:** custom hook
**Shows:** rAF-batched append, no re-render storms, caret that never jumps backward

```tsx
"use client";
export function useStreamedText(stream: AsyncIterable<string>) {
  const [text, setText] = useState("");
  const buffer = useRef("");
  const frame = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const flush = () => { setText(buffer.current); frame.current = null; };

    (async () => {
      for await (const chunk of stream) {
        if (cancelled) break;
        buffer.current += chunk;
        if (frame.current === null) frame.current = requestAnimationFrame(flush);
      }
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      flush();
    })();

    return () => { cancelled = true; if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, [stream]);

  return text;
}
```

```css
.caret::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 2px;
  vertical-align: -0.15em;
  background: var(--accent);
  animation: caret 1s steps(2, jump-none) infinite;
}
@keyframes caret { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .caret::after { animation: none; opacity: 1; } }
```

**Motion:** caret blinks at 1s steps; pauses when the stream stalls for more than 3s.
**Refs:** 4.6, 6.12

---

## EX-56 - Thinking row with elapsed time

**Base:** custom
**Shows:** latency feedback ladder (400ms, 2s, 10s thresholds)

```tsx
export function ThinkingRow({ model, startedAt, step }: { model: string; startedAt: number; step?: string }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startedAt), 250);
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <div className="flex items-center gap-3 py-2 text-[var(--fs-sm)] text-[var(--fg-subtle)]" role="status">
      <span className="flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1 rounded-full bg-[var(--fg-subtle)]"
            style={{ animation: `pulse-dot 1.2s ease-in-out ${i * 0.15}s infinite` }} />
        ))}
      </span>
      <span className="shimmer">{step ?? `Thinking with ${model}`}</span>
      {elapsed > 2000 && <span className="tabular-nums text-[var(--fs-2xs)]">{formatDuration(elapsed)}</span>}
      {step && elapsed > 2000 && <span className="text-[var(--fs-2xs)]">· step {step}</span>}
      {elapsed > 10000 && <Button size="xs" variant="ghost">Stop generating</Button>}
    </div>
  );
}
```

```css
@keyframes pulse-dot { 0%,100% { opacity: .35; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-1px); } }
.shimmer { background: linear-gradient(90deg, var(--fg-subtle) 0%, var(--fg-muted) 50%, var(--fg-subtle) 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer 1.6s linear infinite; }
@keyframes shimmer { to { background-position: -200% 0; } }
```

**Motion:** dots pulse 1.2s; under 400ms nothing is shown at all.
**Refs:** 4.6, 4.8

---

## EX-57 - Reasoning drawer

**Base:** custom (grid-rows animation)
**Shows:** collapsed by default, muted hierarchy, duration chip

```tsx
export function ReasoningDrawer({ text, ms, live }: { text: string; ms?: number; live?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mt-2 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--hair-soft)] bg-[var(--glass-dim)]">
      {live && <span aria-hidden className="absolute inset-y-0 left-0 w-px animate-[pulse-rule_1.6s_ease-in-out_infinite] bg-[var(--accent)]" />}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="flex h-8 w-full items-center gap-2 px-3 text-left text-[var(--fs-xs)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]">
        <Sparkles className="size-3.5 text-[var(--accent-3)]" aria-hidden />
        <span>{ms ? `Thought for ${Math.round(ms / 1000)}s` : "Thinking"}</span>
        <ChevronDown className={cn("ml-auto size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden />
      </button>
      <div className={cn("grid transition-[grid-template-rows] duration-[240ms] ease-[var(--ease-out)]", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="border-t border-[var(--hair-soft)] px-3 py-3 text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">{text}</div>
        </div>
      </div>
    </div>
  );
}
```

**Motion:** 240ms expand; the live rule pulses opacity 0.4 to 1.
**Refs:** 4.8

---

## EX-58 - Tool call card (running, done, failed)

**Base:** custom
**Shows:** state-driven rendering, parameters, truncated result with expand

```tsx
const tone = {
  running: "border-l-[var(--accent)]",
  done: "border-l-[var(--accent-2)]",
  failed: "border-l-[var(--danger)]",
  waiting: "border-l-[var(--warn)]",
} as const;

export function ToolCallCard({ tool }: { tool: Tool }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={cn("mt-3 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--hair-soft)] border-l-2 bg-[var(--glass-dim)]", tone[tool.state])}>
      <div className="flex items-center gap-3 px-3 py-2.5">
        <span className="grid size-6 shrink-0 place-items-center rounded-[var(--radius-xs)] border border-[var(--hair)] bg-[var(--glass)]">
          <tool.icon className="size-3.5 text-[var(--fg-muted)]" aria-hidden />
        </span>
        <span className="font-[var(--font-mono)] text-[var(--fs-xs)] text-[var(--fg)]">{tool.name}</span>
        <StateChip state={tool.state} />
        <span className="ml-auto tabular-nums text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          {tool.duration ? `${(tool.duration / 1000).toFixed(1)}s` : <Spinner className="size-3 animate-spin" />}
        </span>
      </div>

      {expanded && (
        <dl className="grid gap-2 border-t border-[var(--hair-soft)] px-3 py-3 font-[var(--font-mono)] text-[var(--fs-xs)]">
          {Object.entries(tool.params).map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="w-28 shrink-0 text-[var(--fg-subtle)]">{k}</dt>
              <dd className="min-w-0 flex-1 truncate text-[var(--fg-muted)]">{String(v)}</dd>
            </div>
          ))}
        </dl>
      )}

      {tool.result && (
        <div className="border-t border-[var(--hair-soft)] px-3 py-2.5">
          <p className={cn("text-[var(--fs-xs)] leading-relaxed text-[var(--fg-muted)]", !expanded && "line-clamp-2")}>{tool.result}</p>
          <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[var(--fs-2xs)] text-[var(--accent)] underline-offset-4 hover:underline">
            {expanded ? "Show less" : "Show details"}
          </button>
        </div>
      )}

      {tool.state === "failed" && (
        <div className="flex items-center gap-2 border-t border-[var(--hair-soft)] px-3 py-2">
          <AlertCircle className="size-3.5 text-[var(--danger)]" aria-hidden />
          <span className="text-[var(--fs-xs)] text-[var(--danger)]">{tool.error}</span>
          <Button size="xs" variant="ghost" className="ml-auto">Retry</Button>
        </div>
      )}
    </div>
  );
}
```

**Motion:** the running spinner is the only movement; state changes are instant color swaps.
**Refs:** 4.9

---

## EX-59 - Approval card for a write action

**Base:** custom
**Shows:** parameter transparency, cost, delayed-enable confirm button

```tsx
export function ApprovalCard({ action, onApprove, onDeny }: ApprovalProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 400); return () => clearTimeout(t); }, []);

  return (
    <div className="mt-3 overflow-hidden rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_7%,var(--glass))]">
      <div className="flex items-center gap-2.5 border-b border-[var(--hair-soft)] px-4 py-3">
        <ShieldCheck className="size-4 text-[var(--accent)]" aria-hidden />
        <p className="text-[var(--fs-sm)] font-medium text-[var(--fg)]">Approval needed: {action.title}</p>
      </div>

      <div className="grid gap-3 px-4 py-3.5">
        <p className="text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">{action.summary}</p>
        <dl className="grid gap-1.5 text-[var(--fs-xs)]">
          {action.fields.map((f) => (
            <div key={f.label} className="flex justify-between gap-4">
              <dt className="text-[var(--fg-subtle)]">{f.label}</dt>
              <dd className="truncate text-right font-[var(--font-mono)] text-[var(--fg-muted)]">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center justify-between gap-3 border-t border-[var(--hair-soft)] pt-3">
          <span className="text-[var(--fs-2xs)] text-[var(--fg-subtle)]">{action.impact}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={onDeny}>Deny</Button>
            <Button size="sm" onClick={onApprove} disabled={!ready}>{action.confirmLabel}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Motion:** card expands 240ms; confirm disabled for 400ms to prevent accidental double-approval.
**Refs:** 4.9, 4.1 rule 3

---

## EX-60 - Composer with autogrow, slash commands and send/stop

**Base:** custom
**Shows:** sticky glass shell, Enter/Shift+Enter, char counter, stop button while streaming

```tsx
"use client";
export function Composer({ onSend, onStop, streaming, disabled }: ComposerProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const limit = 8000;

  const grow = () => {
    const el = ref.current; if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 320)}px`;
  };

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && value) { e.preventDefault(); setValue(""); }
      if (e.key === "ArrowUp" && !value) { /* focus last user message for edit */ }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [value]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[var(--z-sticky)] px-[var(--gutter)] pb-4">
      <div className="pointer-events-auto mx-auto w-full max-w-[760px]">
        <div className="vitral-strong rounded-[var(--radius-lg)] p-3 transition-shadow duration-200 focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
          <textarea ref={ref} value={value} onChange={(e) => { setValue(e.target.value); grow(); }} rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                if (value.trim() && !streaming) { onSend(value.trim()); setValue(""); grow(); }
              }
            }}
            placeholder="Ask anything, or drop a file"
            aria-label="Message"
            className="max-h-[320px] w-full resize-none bg-transparent px-1 py-1.5 text-[15px] leading-6 text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]" />

          <div className="mt-2 flex items-center gap-1.5">
            <IconAction label="Attach file" icon={Paperclip} />
            <Button variant="ghost" size="xs" iconLeft={<Sparkles className="size-3.5 text-[var(--accent)]" />}>Model</Button>
            <Button variant="ghost" size="xs">Tools</Button>

            <div className="ml-auto flex items-center gap-2">
              {value.length > limit * 0.8 && (
                <span className={cn("text-[var(--fs-2xs)] tabular-nums", value.length > limit ? "text-[var(--danger)]" : "text-[var(--warn)]")}>
                  {value.length}/{limit}
                </span>
              )}
              <IconAction label="Voice input" icon={Mic} />
              {streaming ? (
                <button onClick={onStop} aria-label="Stop generating"
                  className="grid size-8 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass)] transition-colors hover:bg-[var(--glass-hover)]">
                  <Square className="size-3 fill-[var(--fg)] text-[var(--fg)]" aria-hidden />
                </button>
              ) : (
                <button onClick={() => { if (value.trim()) { onSend(value.trim()); setValue(""); grow(); } }}
                  disabled={!value.trim() || disabled} aria-label="Send message"
                  className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-3))] text-[var(--accent-fg)] transition-transform duration-150 hover:-translate-y-px active:scale-95 disabled:opacity-40 disabled:shadow-none">
                  <ArrowUp className="size-3.5" aria-hidden />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          The model can make mistakes. Verify important details.
        </p>
      </div>
    </div>
  );
}
```

**Motion:** height 180ms back to minimum after send; focus ring appears instantly; nothing scales above 0.95.
**Refs:** 4.7, 4.16

---

## EX-61 - Attachment chips and paste handling

**Base:** custom
**Shows:** upload ring, remove on hover, paste-to-attach, failed state with retry

```tsx
export function AttachmentChip({ file, progress, error, onRemove, onRetry }: AttachmentChipProps) {
  return (
    <div className={cn("group flex h-12 items-center gap-2.5 rounded-[var(--radius)] border bg-[var(--glass-dim)] pr-2 pl-2.5",
      error ? "border-[color-mix(in_srgb,var(--danger)_40%,transparent)]" : "border-[var(--hair)]")}>
      {file.type.startsWith("image/")
        ? <img src={file.preview} alt="" className="size-8 rounded-[var(--radius-xs)] object-cover" />
        : <span className="grid size-8 place-items-center rounded-[var(--radius-xs)] border border-[var(--hair-soft)] bg-[var(--glass)]">
            <FileText className="size-3.5 text-[var(--fg-muted)]" aria-hidden />
          </span>}

      <div className="min-w-0">
        <p className="truncate text-[var(--fs-xs)] text-[var(--fg)]">{truncateMiddle(file.name, 28)}</p>
        <p className="text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          {error ? <span className="text-[var(--danger)]">{error}</span> : formatBytes(file.size)}
        </p>
      </div>

      {progress !== undefined && progress < 100 && !error && (
        <svg className="size-5 shrink-0 -rotate-90" viewBox="0 0 20 20" aria-hidden>
          <circle cx="10" cy="10" r="8" fill="none" stroke="var(--hair)" strokeWidth="2" />
          <circle cx="10" cy="10" r="8" fill="none" stroke="var(--accent)" strokeWidth="2"
            strokeDasharray={`${(progress / 100) * 50.3} 50.3`} strokeLinecap="round" />
        </svg>
      )}

      <button onClick={error ? onRetry : onRemove} aria-label={error ? "Retry upload" : "Remove attachment"}
        className="grid size-6 shrink-0 place-items-center rounded-full text-[var(--fg-subtle)] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--glass)] hover:text-[var(--fg)] focus-visible:opacity-100">
        {error ? <RotateCw className="size-3.5" /> : <X className="size-3.5" />}
      </button>
    </div>
  );
}
```

**Motion:** progress ring updates without animation; remove collapses the chip in 180ms.
**Refs:** 4.7, 3.23

---

## EX-62 - Message actions bar

**Base:** custom
**Shows:** hover reveal, always-visible on touch, rating inline feedback

```tsx
export function MessageActions({ message }: { message: Msg }) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-3 flex items-center gap-1 opacity-100 transition-opacity duration-150 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
      <IconAction label="Copy" icon={copied ? Check : Copy} onAct={async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true); setTimeout(() => setCopied(false), 1600);
      }} />
      <IconAction label="Regenerate" icon={RotateCw} onAct={message.regenerate} />
      <IconAction label="Good response" icon={ThumbsUp} active={rating === "up"} onAct={() => setRating("up")} />
      <IconAction label="Bad response" icon={ThumbsDown} active={rating === "down"} onAct={() => setRating("down")} />
      <IconAction label="Branch" icon={GitBranch} onAct={message.branch} />
      <IconAction label="Share" icon={Share2} onAct={message.share} />
      <IconAction label="More" icon={MoreHorizontal} onAct={message.more} />
      {message.versions && message.versions.length > 1 && (
        <span className="ml-2 flex items-center gap-1 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          <ChevronLeft className="size-3" /> {message.version}/{message.versions.length} <ChevronRight className="size-3" />
        </span>
      )}
    </div>
  );
}
```

**Motion:** a "thumbs up" triggers a single 1.2s accent glow; no toast for copy or rating.
**Refs:** 4.18, 3.31

---

## EX-63 - Citations and sources row

**Base:** custom
**Shows:** superscript refs, hover preview, expandable source list

```tsx
export function Citation({ n, source }: { n: number; source: Source }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a href={source.url} target="_blank" rel="noopener noreferrer"
            className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[4px] bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-1 align-super text-[11px] font-medium text-[var(--accent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_28%,transparent)]">
            {n}
          </a>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8} className="vitral-strong max-w-[320px] border-0 p-3">
          <p className="flex items-center gap-2 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
            <img src={source.favicon} alt="" className="size-3.5" /> {source.domain}
          </p>
          <p className="mt-1 text-[var(--fs-xs)] font-medium text-[var(--fg)]">{source.title}</p>
          <p className="mt-1 line-clamp-2 text-[var(--fs-xs)] text-[var(--fg-muted)]">{source.snippet}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function SourcesRow({ sources }: { sources: Source[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? sources : sources.slice(0, 6);
  return (
    <div className="mt-5 border-t border-[var(--hair-soft)] pt-4">
      <p className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">Sources</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {shown.map((s, i) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-[var(--hair-soft)] bg-[var(--glass-dim)] px-3 py-2 transition-colors hover:border-[var(--hair-strong)] hover:bg-[var(--glass)]">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--glass)] text-[10px] tabular-nums text-[var(--fg-subtle)]">{i + 1}</span>
              <img src={s.favicon} alt="" className="size-4 shrink-0" />
              <span className="truncate text-[var(--fs-xs)] text-[var(--fg-muted)]">{s.title}</span>
            </a>
          </li>
        ))}
      </ul>
      {sources.length > 6 && (
        <button onClick={() => setAll((a) => !a)} className="mt-3 text-[var(--fs-xs)] text-[var(--accent)] underline-offset-4 hover:underline">
          {all ? "Show fewer" : `Show all ${sources.length}`}
        </button>
      )}
    </div>
  );
}
```

**Motion:** tooltip 12ms fade plus 4px rise; nothing else.
**Refs:** 4.11

---

## EX-64 - Artifact card and canvas panel

**Base:** custom + `react-resizable-panels`
**Shows:** preview strip, version chip, split view with preview and code tabs

```tsx
export function ArtifactCard({ artifact, onOpen }: { artifact: Artifact; onOpen: () => void }) {
  return (
    <button onClick={onOpen}
      className="vitral group mt-4 flex w-full items-stretch gap-4 p-2.5 text-left transition-transform duration-[240ms] ease-[var(--ease-out)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
      <span className="h-[96px] w-[140px] shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--hair-soft)] bg-[var(--bg-elevated)]">
        {artifact.kind === "html" ? <iframe srcDoc={artifact.preview} title="" sandbox="" className="pointer-events-none size-full scale-[0.5] origin-top-left" style={{ width: "200%", height: "200%" }} />
          : <pre className="overflow-hidden p-2 font-[var(--font-mono)] text-[10px] leading-4 text-[var(--fg-subtle)]">{artifact.source.slice(0, 260)}</pre>}
      </span>

      <span className="min-w-0 flex-1 py-1">
        <span className="flex items-center gap-2">
          <FileCode2 className="size-3.5 text-[var(--accent)]" aria-hidden />
          <span className="truncate text-[var(--fs-sm)] font-medium text-[var(--fg)]">{artifact.title}</span>
          <span className="rounded-full border border-[var(--hair)] bg-[var(--glass)] px-1.5 text-[10px] tabular-nums text-[var(--fg-subtle)]">v{artifact.version}</span>
        </span>
        <span className="mt-1.5 block line-clamp-2 text-[var(--fs-xs)] text-[var(--fg-muted)]">{artifact.summary}</span>
        <span className="mt-2 flex items-center gap-3 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          <span>{artifact.lines} lines</span><span>{artifact.language}</span>
          <span className="text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">Open canvas →</span>
        </span>
      </span>
    </button>
  );
}
```

**Motion:** card lifts 2px on hover; the canvas panel divider drags with no transition.
**Refs:** 4.10, 11.3 (chat components folder)

---

## EX-65 - Empty state with prompt suggestions and follow-ups

**Base:** custom
**Shows:** greeting, centered composer, suggestion tiles that fill (not send), follow-up chips

```tsx
export function ChatEmpty({ suggestions, onPick }: { suggestions: Suggestion[]; onPick: (s: string) => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col items-center justify-center text-center">
      <span className="grid size-10 place-items-center rounded-[var(--radius)] border border-[var(--hair)] bg-[var(--glass)]">
        <Sparkles className="size-4 text-[var(--accent)]" aria-hidden />
      </span>
      <h1 className="mt-5 text-[var(--fs-h2)] font-semibold tracking-[-0.025em] text-[var(--fg)]">
        {greeting()}, Pedro
      </h1>
      <p className="mt-2 max-w-[46ch] text-[var(--fs-sm)] text-[var(--fg-muted)]">
        Ask about your data, generate an artifact, or start from a suggestion.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {suggestions.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <button onClick={() => onPick(s.prompt)}
              className="vitral group h-full w-full p-4 text-left transition-transform duration-[240ms] ease-[var(--ease-out)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              <span className="flex items-center gap-2">
                <s.icon className="size-3.5 text-[var(--accent)]" aria-hidden />
                <span className="text-[var(--fs-sm)] font-medium text-[var(--fg)]">{s.title}</span>
              </span>
              <span className="mt-1.5 block text-[var(--fs-xs)] leading-relaxed text-[var(--fg-muted)]">{s.prompt}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function FollowUps({ items, onSend, onDismiss }: FollowUpsProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2" style={{ animationDelay: "400ms" }}>
      {items.map((i) => (
        <button key={i} onClick={() => onSend(i)}
          className="rounded-full border border-[var(--hair)] bg-[var(--glass)] px-3 py-1.5 text-[var(--fs-xs)] text-[var(--fg-muted)] transition-colors hover:border-[var(--hair-strong)] hover:bg-[var(--glass-hover)] hover:text-[var(--fg)]">
          {i}
        </button>
      ))}
      <button onClick={onDismiss} aria-label="Dismiss suggestions"
        className="grid size-6 place-items-center rounded-full text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]">
        <X className="size-3.5" />
      </button>
    </div>
  );
}
```

**Motion:** suggestions stagger 60ms on entry; chips appear 400ms after the answer completes, never before.
**Refs:** 4.12

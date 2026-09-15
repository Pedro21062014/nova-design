# 04 - Build a Chat Scene (conversational AI interface)

Use for assistant products, copilots, agent consoles and any conversational surface.

---

## Prompt

```text
Read the Nova Vitral specification, part 4 in full (sections 4.0 to 4.20), plus sections 0.4, 2,
6.12 and 9.5:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md

Read the chat example file (EX-51 to EX-65) for the exact techniques:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/06-chat-scene.md

TASK
Build a chat scene for <product>.

Product facts
- Model or agent name and capabilities: <...>
- Streaming transport: <SSE / fetch stream / Vercel AI SDK>
- Tools the agent can call: <list, and which ones write or spend money>
- Attachments allowed: <types and limits>
- Multi-user? <yes/no, presence and comments>
- Artifacts: <documents / code / charts / none>

Requirements
1. Three-region layout (spec 4.0): session rail, centered 760px thread, context panel.
   All three scroll independently; the composer is sticky with a veil above it.
2. Message anatomy per spec 4.3: user messages are right-aligned glass bubbles; assistant messages
   are full-width documents with an identity row and an actions bar.
3. Streaming per spec 4.6: tokens flush once per animation frame, caret that never jumps backward,
   auto-follow only when the user is at the bottom, "Jump to latest" pill otherwise.
4. Latency ladder per spec 4.6: nothing under 400ms, dots plus shimmer at 400ms, elapsed timer and
   step label after 2s, stop affordance after 10s.
5. Reasoning per spec 4.8: collapsed by default, muted 14px, duration chip, excluded from copy-all.
6. Tool calls per spec 4.9: state-colored left rule, parameters, truncated result with expand,
   and an approval card for any write, spend or delete action.
7. Composer per spec 4.7: glass shell, auto-grow 1 to 12 rows, Enter sends, Shift+Enter newlines,
   Esc clears, slash commands, attachments with upload rings, char counter after 80 percent.
8. Empty state per spec 4.12: greeting, centered composer, suggestion tiles that fill (not send),
   follow-up chips that appear 400ms after the answer completes.
9. Accessibility per spec 4.16: thread as role="log" with polite announcements only on completion,
   arrows to move between messages, code blocks labeled, reduced motion honored.

Deliver
1. Plan in five lines with the component tree.
2. Complete files: app/chat/page.tsx, components/chat/{thread,message,composer,reasoning,tool-card,
   suggestion,context-panel}.tsx, lib/stream.ts.
3. A short note on state management and where streams are buffered.
4. Three closing bullets: built, omitted, next step.
```

## Non-negotiable chat rules (repeat them to the agent)

1. Never a spinner instead of streaming text.
2. Never auto-scroll while the user is reading earlier messages.
3. Never hide tool calls behind a generic "Working" — show name, state and result.
4. Never auto-approve a write, spend or delete action.
5. Never lose the composer draft on navigation or a failed request.
6. Never render model-generated HTML without sanitization.
7. Never let two streams run in the same thread; queue or interrupt explicitly.
8. Never animate reasoning with the same weight as the answer.
9. Never emit a toast for copying or rating.
10. Always keep a "Stop" control reachable while streaming.

## Increment plan (do one per request)

1. Shell and layout (EX-51, EX-52).
2. Messages and markdown rendering (EX-53, EX-54).
3. Streaming pipeline and caret (EX-55, EX-56).
4. Reasoning and tool cards (EX-57, EX-58, EX-59).
5. Composer, slash commands, attachments (EX-60, EX-61).
6. Actions, citations, feedback (EX-62, EX-63).
7. Artifacts and canvas panel (EX-64).
8. Empty state, follow-ups, session rail (EX-65).

## Follow-up prompts

**Add tool approval:**

```text
Add an approval flow for the "<tool>" tool per spec 4.9: expanded card, exact parameters,
estimated cost, delayed-enable confirm, deny with an optional reason that focuses the composer.
Show only the new component and its wiring.
```

**Add reasoning:**

```text
Wire the reasoning stream per spec 4.8: collapsed row with a duration chip, live left rule pulse
while thinking, 240ms grid-rows expansion, and exclusion from copy and share exports.
```

**Add artifacts:**

```text
Add the artifact card and canvas panel per spec 4.10: 96px preview strip, version chip, split view
with Preview/Code/Versions tabs, sandboxed iframe, and restore-creates-a-new-revision behavior.
```

**Harden the thread:**

```text
Apply spec 4.2 virtualization above 60 messages and move per-message UI state into a store so
unmounting never loses collapsed/expanded state. Show the diff only.
```

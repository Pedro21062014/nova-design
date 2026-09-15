## 10. Working With AI Agents

This part is for the human driving the agent, and for the agent driving itself.

### 10.1 Loading the specification

| Environment | How to load |
|---|---|
| Any chat assistant | Paste the master prompt from `prompts/00-master-prompt.md`, which names every raw URL and tells the agent which one to read per task |
| Raw URL | `https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md` — the agent fetches it and reads only the line ranges it needs |
| Project file | Drop `nova-design.md` in the repository root (or `docs/`) and add one line to `AGENTS.md` telling agents to consult it |
| Cursor / Windsurf | Copy `prompts/08-cursor-rules.mdc` into `.cursor/rules/nova-vitral.mdc` so the rules are always active, and keep the spec for on-demand reads |
| Claude Projects / GPTs / Gems | Use `prompts/09-claude-project-instructions.md` as the system instruction and attach the spec as knowledge |
| Small context windows | Use `prompts/11-condensed-system-prompt.md` (tokens plus the ten essential rules) |
| CI or scripts | `scripts/build_spec.py` regenerates the line index after any edit so the ranges never drift |

### 10.2 The master prompt pattern

Every request to an agent should carry four elements:

```text
ROLE      You are a senior product designer and frontend engineer.
SPEC      Read <raw url> sections <list>. Do not read the whole file.
TASK      Build <specific deliverable> with <content>.
CONTRACT  Tokens only, all states, responsive at 320/768/1024/1440,
          reduced motion, AA contrast, no placeholder copy.
OUTPUT    Complete files named <paths>, then three bullets: done, omitted, next.
```

Component-level prompt template:

```text
Read the design spec at <raw url>. Sections to read: 0.4, 2, 3.2, 6.2, 6.12, 9.5.
Task: build a reusable <ComponentName> component.
Requirements: <props list>, variants <...>, states <...>.
Use the tokens from section 2 (no hardcoded colors). Use shadcn primitives where they exist
and skin them with the vitral surface (section 7.9).
Deliver: components/<name>.tsx plus a usage example and one variant demo.
```

Page-level prompt template:

```text
Read the design spec at <raw url>. Sections to read: 0.4, 2, 3, 5.1, 6, 9.5.
Task: build a complete <page type> for <product> with sections <1..n>.
Follow blueprint <5.x> exactly. Copy must be real, specific and benefit-led for <audience>.
Deliver: app/page.tsx plus the section components, in complete files.
```

Fix and review template:

```text
Read the design spec at <raw url>. Sections to read: 9.3, 9.4, 9.5, 9.6, 9.7.
Task: audit the code below against those sections and return a prioritized list of issues
(severity, section, exact fix). Then apply the top 10 fixes and show the diffs.
```

### 10.3 Task decomposition for large builds

Never ask for a whole product in one request. The reliable order:

1. **Foundation**: tokens, Tailwind mapping, globals.css, `cn()`, fonts, theme toggle.
2. **Primitives**: button, input, badge, card (vitral), tooltip, skeleton.
3. **Layout**: navbar, footer, container, section wrapper, aurora background.
4. **Sections**: hero, features, bento, pricing, testimonials, FAQ, CTA.
5. **Pages**: assemble sections into blueprints; add metadata and structured data.
6. **Feature surface**: dashboard, chat scene, settings, docs.
7. **Motion pass**: reveals, scrollytelling, micro-interactions, reduced motion.
8. **Quality pass**: states, accessibility, performance, copy review.

Rule of thumb: one request equals one deployable increment of 1 to 4 files. Ask for the next
increment only after the previous one runs.

### 10.4 Token economy (keeping the agent cheap and accurate)

1. Never ask the agent to read the whole spec. The task map exists for this.
2. Quote the token block (2 lines to 20 lines) instead of asking for a full read.
3. When iterating on one component, send only that component's file plus the relevant section.
4. Prefer "apply section 9.6 to this file" over pasting the whole checklist into the prompt.
5. Cache: if the agent supports prompt caching, keep the spec contents stable and vary only the
   task text at the end.
6. Ask for diffs, not full rewrites, when the file already exists.

### 10.5 Self-review loop (the agent must run this before answering)

```text
1. Read the requirements and restate them in one line.
2. List the tokens and sections you will use.
3. Write the code.
4. Self-check against the six most common failures:
   - hardcoded colors or durations? -> replace with tokens
   - missing states (hover, focus, disabled, loading, empty, error)? -> add them
   - layout risk at 320px? -> fix and verify with a container query or wrapping
   - animation that ignores reduced motion? -> guard it
   - contrast below AA on glass? -> raise glass alpha or add a scrim
   - placeholder copy or lorem ipsum? -> write real copy
5. Confirm the output contract: complete files, named, with the closing three bullets.
```

### 10.6 Common agent failure modes and their fixes

| Failure | Fix in the prompt |
|---|---|
| Reads the whole spec, ignores the task map | "Do not read the entire file. Read only the listed line ranges." |
| Produces purple gradients everywhere | "Accent usage per section 1.2: maximum two accents per viewport." |
| Glass without a background | "Section 1.3 rule 1: glass requires an aurora or an image behind it." |
| Animation on every element | "Reveal once, distance 16px, stagger capped at 400ms (section 6.2)." |
| Long, slow, repeated animations | "Durations per 6.1. Nothing above 900ms. Never re-trigger." |
| Ignores accessibility | "Section 9.1 is mandatory. Include focus-visible, aria and reduced motion." |
| Truncates files | "Return complete files. Never write 'rest omitted'." |
| Invents a new design system | "Use tokens from section 2 exclusively. Do not invent palettes." |
| Ships only the happy path | "Implement empty, loading and error states (3.20)." |
| Rebuilds shadcn from scratch badly | "Use shadcn/ui components and the bridge in 7.9; do not hand-roll primitives." |
| Overwrites existing tokens | "Never edit globals.css tokens; extend the semantic layer instead." |

### 10.7 Multi-agent and multi-session work

- Give each agent a section of the spec to own (foundation, chat scene, motion, quality).
- Keep one owner per file to avoid conflicting edits.
- Use a shared `AGENTS.md` with: project structure, token locations, component conventions, the
  current task list and the definition of done.
- After each session, ask the agent to append to `docs/decisions.md`: what changed, why, and which
  spec section justified it. This keeps the design system coherent across sessions and models.
- When switching models, re-send the output contract, the tokens and the current file. Do not assume
  the new model inherits context.

### 10.8 Prompt library (external files in this repository)

| File | Use |
|---|---|
| `prompts/00-master-prompt.md` | The full router: names every raw URL and which task reads what |
| `prompts/01-load-and-orient.md` | First message to a new agent: establish the design language |
| `prompts/02-build-a-page.md` | End-to-end page build with blueprints |
| `prompts/03-build-a-component.md` | Single component with variants and states |
| `prompts/04-build-chat-scene.md` | Complete conversational interface |
| `prompts/05-build-motion.md` | Scroll animation, scrollytelling and micro-interactions |
| `prompts/06-review-and-audit.md` | Quality, accessibility, performance, anti-pattern audit |
| `prompts/07-fix-and-upgrade.md` | Take an existing AI-generated page and professionalize it |
| `prompts/08-cursor-rules.mdc` | Always-on rules for Cursor and Windsurf |
| `prompts/09-claude-project-instructions.md` | System instructions for Claude Projects, GPTs and Gems |
| `prompts/10-system-prompt-shell.md` | Generic system prompt for any coding agent |
| `prompts/11-condensed-system-prompt.md` | Under 1200 tokens, for small context windows |
| `prompts/12-prompt-pt-BR.md` | Versão em português do prompt mestre, para times brasileiros |
| `examples/` | 100 named, copy-ready component examples with shadcn bases and animations |

### 10.9 Definition of done for an agent session

1. Build succeeds; type check passes; no console warnings.
2. Only tokens are used; grep for `#` hex values in components returns nothing outside the tokens file.
3. Every new interactive component has all states.
4. Reduced motion verified in the browser devtools emulation.
5. The three closing bullets are present: built, omitted, next.
6. Files committed with a conventional commit message.

---

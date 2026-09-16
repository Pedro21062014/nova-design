<!--
  NOVA VITRAL - DESIGN SYSTEM SPECIFICATION FOR AI AGENTS
  File: design.md | Version 1.2.1 | License: MIT
  Format: "Vitral Spec" - a line-indexed design document.
  This file is a reference: input for an agent, never output. Do not build, render or publish it,
  and never name a page, route, component or project after its filename.
  Rule 1: never read this file end to end. Use the task map and the index.
-->

# NOVA VITRAL - `design.md`

**A design system specification for AI agents.** One line-indexed file that defines a visual
language - **modern minimal interfaces with glassmorphism, complete professional pages, and
scroll-driven animation** at agency grade - so any model can generate work that belongs to it.

`design system` | `version 1.2.1` | `license MIT` | `design language: Nova Vitral` | `target: web (React, Next.js, Vite, Astro + Tailwind)`
`works with any LLM that can read a raw URL or a local file`

> **This file is not a page and not a project.** It is the specification of a design system: read it,
> apply it, and build *the user's* product in the Nova Vitral style. Never scaffold, render, preview
> or deploy `design.md` itself, never turn it into a documentation site or a route, and never name a
> page, route, component or project `design`, `design-md` or `nova-design` after the filename. See
> **Section 0.2**.

> **TL;DR for the agent.** This document has 12 top-level parts. Do not read all of it.
> Go to **Section 0.5 - Task Map**, find the user's task, read **only** the listed line range, then
> produce code. For concrete implementations, read the matching example file from the library in
> **Section 0.7**, or copy the ready component from **Section 0.8**. The visual vocabulary is: dark
> ground with aurora light, glass panels built from fill plus hairline plus inner highlight, tight
> typography, generous whitespace, restrained scroll-triggered motion, no decorative noise.

---

## 0. How to Use This File

### 0.1 Reading protocol for agents (three steps, about fifteen seconds)

1. **Locate the task** in the table at **Section 0.5 - Task Map**. Every row gives an exact line
   range (`lines A-B`) to read, plus the example IDs that show the technique in code.
2. **Read only that range**, plus the matching file in the example library (Section 0.7). If a range
   exceeds roughly 400 lines, read the section headings first, then the code blocks.
3. **Always read these universal sections before writing code:**
   - `0.4` output contract: how to deliver the result
   - `2` design tokens: use tokens, never hardcoded colors
   - `6.12` reduced motion and performance: mandatory for every animation
   - `9.5` anti-patterns: what makes a result look machine-generated
4. **If the request is not covered**, use `9.5` and `8` (MIT references) as the decision rule and
   extend the system inside its own vocabulary. Do not invent a different visual style.

### 0.2 What this file is, and what it is not

**This file is a design system.** It is the specification of a visual language - **Nova Vitral** -
written so an AI agent can generate interfaces that belong to that language. It is a reference
document and an input. It is not a product, not a page, and not something to be built.

| It is | It is not |
|---|---|
| A design language: color, glass, type, spacing, motion, components, pages | An installable CSS framework or a UI library |
| Input for an agent: rules, tokens, states, checklists, ready components | A deliverable to render, preview, deploy or package |
| A specification of *how* interfaces must be written | An application, a route, a screen or a landing page |
| A file you drop into a project as `design.md` (or `Design.md`) | A brand name, a product name or a project name |
| A system whose components live in `components/` and pages in `templates/` | A single ready-made site to publish as-is |

Three consequences an agent must respect:

1. **Never build this file.** Do not scaffold, render, screenshot or preview `design.md`. Do not turn
   it into a documentation site, a route, or a Markdown viewer unless the person explicitly asks for
   that as a separate task.
2. **Never name anything after the file.** The filename is deliberately generic so it can sit in any
   repository. It is not a hint about the project. Never create a page, route, component, workspace
   or project called `design`, `design-md` or `nova-design` because of it. The product name always
   comes from the person's brief.
3. **Nova Vitral is the language, not the product.** When you generate an interface, the brand,
   copy and product name come from the request. Read this file, apply it, and build *their* product
   in the Nova Vitral style.

The file is large on purpose and it indexes itself by line number: read the Task Map (`0.5`), then
the ranges it points at, never the whole file.

### 0.3 Loading this spec and its companions (raw URLs)

**This file**

```text
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md
```

Recommended instruction for any assistant (the same text ships in `prompts/00-master-prompt.md`):

```text
Read the design specification at
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Do not read the entire file. Use "Section 0.5 - Task Map", find the task "<USER TASK>", and read
only the listed line range, plus sections 0.4, 2, 6.12 and 9.5, which are always mandatory.
Then read the matching example file from "Section 0.7" and implement following the tokens and rules.
```

Alternative loaders:

- **Cursor / Windsurf / VS Code Copilot**: copy `prompts/08-cursor-rules.mdc` into `.cursor/rules/`
  so the rules are always active, and keep `design.md` in the project root for on-demand reads.
- **Claude Projects / Custom GPT / Gemini Gem**: paste `prompts/09-claude-project-instructions.md`
  as the system instruction and attach `design.md` as knowledge.
- **Small context windows** (under 32k tokens): use `prompts/11-condensed-system-prompt.md`, which
  inlines the tokens and the ten most important rules.
- **Portuguese-speaking teams**: `prompts/12-prompt-pt-BR.md`.

### 0.4 Output contract (how the agent must deliver)

1. **Code first.** No long preamble. At most five lines of plan, then code.
2. **Complete, named files** (`app/page.tsx`, `components/glass-card.tsx`, `app/globals.css`).
   Never truncate a file that was requested as complete, never answer with "rest omitted".
3. **Default stack** unless the user says otherwise:
   `Next.js 15 App Router + TypeScript + Tailwind CSS v4 + motion (Framer Motion) + lucide-react +
   shadcn/ui`. Accepted alternatives: Vite + React, Astro, plain HTML with CSS custom properties.
4. **Tokens always.** Use the CSS variables and utility classes from Section 2. No raw hex in JSX.
   **Color discipline:** neutral ground first, one accent per viewport, and no purple, violet or neon
   unless the brand demands it. Read `1.2.1` before choosing any color.
5. **All states.** Every interactive component ships with `default`, `hover`, `focus-visible`,
   `active`, `disabled`, plus `loading`, `empty` and `error` where applicable.
6. **Accessibility built in.** Visible focus ring, correct `aria-*`, AA contrast,
   `prefers-reduced-motion` honored.
7. **Real responsiveness.** Verify at 320, 768, 1024, 1440 and 1920 pixels.
8. **Performance.** Animate `transform` and `opacity` only. Keep simultaneous `backdrop-filter`
   elements under six per viewport.
9. **No broken image placeholders.** Use gradients, blurred initials, or a real CDN only if the
   user allows it.
10. **State your sources.** Name the spec sections and the example IDs (`EX-nn`) you followed.
11. **Closing summary.** Three bullets: what was built, what was left out and why, recommended next step.

### 0.5 Task Map

> Find the task, read only the listed lines, then open the matching example file from Section 0.7
> or the ready component from Section 0.8. `+` means "also read". Line numbers are regenerated by
> `scripts/build_spec.py`.

| Task or user intent | Lines to read | Section | Examples |
|---|---|---|---|
| Find a ready component instead of writing one | `@@S:0.8@@` | Component library | - |
| Imitate a whole page before building one | `@@S:0.8@@` | Page templates | - |
| Remove purple from a pasted shadcn component | `@@S:0.8@@` + `@@S:1.2@@` + `@@S:7.9@@` | Library and color discipline | EX-41 |
| Add motion to a component that has none | `@@S:0.8@@` + `@@S:6.1@@` + `@@S:6.14@@` | Motion baseline | EX-79 |
| Animate images on scroll (veil, parallax, gallery) | `@@S:6.15@@` | Images and media on scroll | EX-80, EX-84 |
| Understand the system, vocabulary and delivery rules | `@@S:0.2@@` | How to use this file | - |
| Build the visual foundation: color, glass, type, spacing | `@@S:1@@` | Design foundations | EX-01, EX-07, EX-08 |
| Choose colors, avoid purple and neon, apply the accent budget | `@@S:1.2@@` | Color discipline | - |
| Copy and paste tokens: CSS, Tailwind, motion | `@@S:2@@` | Design tokens | - |
| Buttons and form controls | `@@S:3.1@@` | Buttons | EX-11, EX-12 |
| Glass cards, bento grids, spotlight surfaces | `@@S:3.2@@` | Surfaces | EX-01 to EX-06 |
| Badges, chips, status pills | `@@S:3.3@@` | Badges | EX-09, EX-33 |
| Inputs, selects, switches, sliders, dropzones, forms | `@@S:3.4@@` | Form controls | EX-14 to EX-20 |
| Tables, lists, key-value, stats | `@@S:3.5@@` | Data display | EX-06, EX-69 |
| Navbar, mobile menu, sidebar, command palette, footer | `@@S:3.6@@` | Navigation | EX-21 to EX-30 |
| Hero sections | `@@S:3.7@@` | Hero | EX-31, EX-32, EX-33 |
| Bento grids | `@@S:3.8@@` | Bento | EX-03 |
| Spotlight and pointer-reactive surfaces | `@@S:3.9@@` | Pointer effects | EX-04, EX-86 |
| Marquee, logo cloud, testimonials | `@@S:3.10@@` | Social proof | EX-10, EX-34, EX-43, EX-44 |
| Accordion and FAQ | `@@S:3.11@@` | Accordion | EX-37, EX-88 |
| Pricing tables and plan comparison | `@@S:3.12@@` | Pricing | EX-41, EX-42 |
| Metrics, counters and KPI tiles | `@@S:3.13@@` | Metrics | EX-45, EX-66, EX-85 |
| Timeline, steps and roadmap | `@@S:3.14@@` | Timeline | EX-36, EX-77, EX-93 |
| Footer | `@@S:3.15@@` | Footer | EX-30 |
| Modals, drawers, sheets, confirms | `@@S:3.16@@` | Overlays | EX-23, EX-76, EX-90 |
| Toasts and notifications | `@@S:3.17@@` | Toasts | EX-89 |
| Tooltips, popovers, dropdown menus | `@@S:3.18@@` | Floating UI | EX-13, EX-28 |
| Avatars, user menu, presence | `@@S:3.19@@` | Identity | EX-34, EX-43 |
| Skeletons, loading, empty and error states | `@@S:3.20@@` | States | EX-72, EX-73, EX-74 |
| Charts, tables and dashboards | `@@S:3.21@@` | Charts | EX-66 to EX-71 |
| Calendar, date picker, scheduling | `@@S:3.22@@` | Calendar | - |
| File upload, media, lightbox | `@@S:3.23@@` | Media | EX-19, EX-90 |
| Code blocks, terminal, diff viewer | `@@S:3.24@@` | Code UI | EX-58, EX-64 |
| Feature sections, comparison, integrations | `@@S:3.25@@` | Feature sections | EX-35, EX-42 |
| CTA, newsletter, waitlist | `@@S:3.26@@` | Conversion | EX-38, EX-39, EX-49 |
| Scroll utilities: progress, back to top, scroll spy | `@@S:3.27@@` | Scroll utilities | EX-84, EX-22 |
| Onboarding, stepper, product tour | `@@S:3.28@@` | Onboarding | EX-99 |
| Settings and preferences UI | `@@S:3.29@@` | Settings | EX-75, EX-76, EX-100 |
| Search results and filters | `@@S:3.30@@` | Search and filters | EX-71 |
| Quality micro-patterns and component index | `@@S:3.31-3.32@@` | Polish | - |
| Chat interface, conversational AI, assistant UI | `@@S:4@@` | Chat scene, complete part | EX-51 to EX-65 |
| Composer, streaming, reasoning, tool calls | `@@S:4.7-4.9@@` | Chat internals | EX-55 to EX-61 |
| Artifacts, citations, feedback, shortcuts | `@@S:4.10-4.16@@` | Chat advanced | EX-62 to EX-65 |
| Complete SaaS landing page | `@@S:5.1@@` | Blueprint 5.1 | EX-31 to EX-40 |
| Portfolio and personal site | `@@S:5.3@@` | Blueprint 5.3 | EX-95 |
| Pricing page | `@@S:5.4@@` | Blueprint 5.4 | EX-96 |
| Documentation site, blog and changelog | `@@S:5.5-5.6@@` | Blueprints 5.5, 5.6 | EX-91, EX-92, EX-93 |
| Dashboard and admin | `@@S:5.7@@` | Blueprint 5.7 | EX-94 |
| Auth, 404, waitlist, error pages | `@@S:5.8-5.10@@` | Blueprint 5.8 | EX-46 to EX-50, EX-98 |
| SEO, metadata and social surface | `@@S:5.11@@` | SEO | - |
| Scroll animations, reveals, transitions | `@@S:6@@` | Motion system | EX-79 to EX-90 |
| Scrollytelling, parallax, horizontal scroll | `@@S:6.5-6.7@@` | Advanced motion | EX-81, EX-82, EX-83 |
| Reduced motion and performance | `@@S:6.12@@` | Motion safety | - |
| Ready-made CSS and JS recipes | `@@S:7@@` | Recipes | - |
| shadcn bridge (skinning primitives) | `@@S:7.9@@` | shadcn bridge | EX-06, EX-11 |
| MIT open-source inspiration and attribution | `@@S:8@@` | Open-source references | - |
| Review quality, accessibility, performance, SEO | `@@S:9@@` | Quality gates | - |
| Anti-patterns to avoid | `@@S:9.5@@` | Anti-patterns | - |
| Prompt templates, workflows, definition of done | `@@S:10@@` | AI workflow | - |
| Glossary, utilities, project structure, naming | `@@S:11@@` | Appendix | - |

### 0.6 Vocabulary of the system

| Term | Meaning |
|---|---|
| **Vitral** | A glass panel: translucent surface with blur, hairline border and inner highlight. The visual atom of the system. |
| **Aurora** | The background layer: two to four blurred radial color blobs behind the panels. |
| **Hairline** | A 1px border built from a gradient whose opacity fades from top to bottom. |
| **Specular** | The light reflection on top of the glass. Follows the pointer on interactive cards. |
| **Grain** | A noise layer at roughly three percent opacity that keeps glass from looking like plastic. |
| **Reveal** | The scroll entry of an element: `opacity 0 to 1` plus `translateY(16px to 0)`, with stagger. |
| **Scrollytelling** | A sticky section where scroll position drives a narrated sequence of steps. |
| **Quiet zone** | Mandatory breathing space, minimum 96px, around dense blocks. |
| **Panel stack** | Nested glass: a panel inside a panel reduces blur and raises border contrast instead of stacking blurs. |
| **Ladder** | The fixed motion durations (140 / 240 / 420 / 760ms) and the latency thresholds for chat. |

### 0.7 Example library - 100 examples (raw links)

Read the file that matches what you are building. Each example includes the base component, a code
snippet, the motion behavior and the spec sections it implements.

| Range | Theme | Raw link |
|---|---|---|
| EX-01 to EX-10 | Surfaces, glass, bento, spotlight, aurora, grain, marquee | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/01-surfaces-glass.md |
| EX-11 to EX-20 | Buttons, inputs, combobox, OTP, switch, slider, dropzone, forms | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/02-controls-forms.md |
| EX-21 to EX-30 | Navbar, nav underline, sheet, sidebar, tabs, palette, menus, footer | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/03-navigation-shell.md |
| EX-31 to EX-40 | Hero, chat hero, trust row, alternating features, steps, FAQ, CTA | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/04-heroes-marketing.md |
| EX-41 to EX-50 | Pricing, comparison, testimonials, counters, 404, auth, waitlist | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/05-pricing-social-utility.md |
| EX-51 to EX-65 | Chat shell, thread, streaming, reasoning, tools, composer, artifacts | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/06-chat-scene.md |
| EX-66 to EX-78 | Stat tiles, charts, tables, virtualized feeds, filters, settings | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/07-data-dashboards.md |
| EX-79 to EX-90 | Reveal, stagger, parallax, scrollytelling, horizontal scroll, toasts | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/08-motion-interaction.md |
| EX-91 to EX-100 | Docs, blog, changelog, dashboard, portfolio, pricing, legal, settings | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/09-pages-assembly.md |
| Index of all 100 | IDs, base components, themes | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/00-index.md |

A runnable **before and after showcase** ships in `examples-sites/`: five pages built with this
system and five pages built with the anti-patterns of `9.5` on purpose, on the same content, so the
difference is measurable. Open `examples-sites/index.html`. It is a teaching artifact and a
regression reference, not a source of production code: for code, always use the examples above.

### 0.8 Component library and page templates (raw links)

The specification tells you how to build each thing. This section points at the things themselves:
five hundred components and five complete pages that already obey the spec, so the fastest path to a
professional result is to copy rather than to invent.

| What you need | Raw link |
|---|---|
| Machine-readable registry of all 500 (name, category, kind, path, motion note) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/index.json |
| Flat index of all 500 components with paths | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/INDEX.md |
| Library overview: install, ten rules, how an agent should read it | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/README.md |
| Core primitives (`surface`, `aurora`, `reveal`, `section`, `divider`) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/core/README.md |
| Motion (`counter`, `parallax`, `sticky-scrolly`, `marquee`, `tilt`, `spotlight`) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/motion/README.md |
| Controls: buttons (18), inputs (24), forms (18) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/buttons/README.md |
| Structure: cards (26), navigation (26), layout (20), shell (18) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/layout/README.md |
| Data: charts, tables and dashboard widgets (30) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/data/README.md |
| Chat and AI surfaces (50 across `chat` and `ai`) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/chat/README.md |
| Marketing sections (40) and commerce (16) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/marketing/README.md |
| Remaining categories: overlays, feedback, editors, media, devtools, utilities, mobile, email, print, seo, a11y, enterprise | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/README.md |
| Five complete pages: landing, pricing, dashboard, chat, docs | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/templates/README.md |
| The same landing page in Astro | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/templates/astro/src/pages/index.astro |
| The same landing page as a single HTML file | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/templates/static-html/index.html |
| Theme file: tokens, `nv-*` utilities and the shadcn variable remap | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/theme/nova-theme.css |
| Why components render purple by default, and the exact remap that fixes it | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/theme/README.md |

Reading protocol for the library:

1. Open `components/index.json` first. It is small and it answers "does this already exist".
2. Open the category guide for the family you need; it lists every component with a one-line purpose,
   the motion contract and the anti-patterns of that family.
3. Open only the two or three component files you intend to use. Each file header names its spec
   sections, its motion behavior and its contract.
4. Copy the file into the project rather than paraphrasing it. The markup carries the tokens, states,
   accessibility and motion work.

Two rules that make pasted components fail, and the fix for both:

- **Purple.** shadcn's default `--primary` is a purple, so any pasted component that uses
  `bg-primary`, `ring-ring` or `bg-accent` renders purple under Nova Vitral. The fix is to import
  `theme/nova-theme.css` after Tailwind, which remaps `--primary`, `--ring`, `--accent`, `--card`,
  `--border`, `--muted` and the legacy `--color-*` aliases. Renaming classes instead of remapping the
  variables leaves the purple in place.
- **Zero motion.** A pasted component with no animation violates `6.14`. The minimum baseline is
  `nv-fade-up` on entry, `nv-lift` on interactive cards, `nv-press` on buttons, a 240ms color
  transition on hover, and the reveal convention for sections (`Reveal`, or `nv-reveal` plus the
  shared observer).

### 0.9 Prompt library (raw links)

| Purpose | Raw link |
|---|---|
| Master prompt that routes every task (start here) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/00-master-prompt.md |
| First message to a fresh agent | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/01-load-and-orient.md |
| Build a complete page | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/02-build-a-page.md |
| Build a single component | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/03-build-a-component.md |
| Build a chat scene | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/04-build-chat-scene.md |
| Build motion and scroll animation | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/05-build-motion.md |
| Review and audit | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/06-review-and-audit.md |
| Fix and upgrade an AI-generated page | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/07-fix-and-upgrade.md |
| Always-on rules for Cursor and Windsurf | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/08-cursor-rules.mdc |
| Project and custom GPT instructions | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/09-claude-project-instructions.md |
| System prompt shell for any agent | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/10-system-prompt-shell.md |
| Condensed prompt for small context windows | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/11-condensed-system-prompt.md |
| Prompt mestre em portugues | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/12-prompt-pt-BR.md |
| Scroll motion and image animation recipes (veil, parallax, sticky gallery) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/13-scroll-motion-recipes.md |

### 0.10 Index

> Full index with line ranges, generated from the section headings.
> Use this table when the Task Map does not cover the request.

<<<INDEX>>>

### 0.11 Tokens in twenty lines (quick reference)

```css
/* Always use these names. Never hardcode a color inside a component. */
:root {
  --bg: #06070c;
  --bg-soft: #0a0c14;
  --bg-elevated: #0e1120;
  --fg: #f5f7ff;
  --fg-muted: #a8b0c8;
  --fg-subtle: #6b7490;
  --glass: rgba(255, 255, 255, 0.055);
  --glass-strong: rgba(255, 255, 255, 0.09);
  --hair: rgba(255, 255, 255, 0.10);
  --hair-strong: rgba(255, 255, 255, 0.18);
  --accent: #7c8cff;
  --accent-2: #62e9d6;   /* live, success, progress */
  --accent-3: #c084fc;   /* reserved, off by default */
  --danger: #ff6b81;
  /* neutral first: one accent per viewport, no purple or neon unless the brand demands it (1.2.1) */
  --radius-sm: 10px;
  --radius: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 999px;
  --blur-sm: 8px;
  --blur: 18px;
  --blur-lg: 32px;
  --shadow-2: 0 12px 32px -12px rgba(0, 0, 0, 0.55);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur: 240ms;
  --dur-reveal: 760ms;
  --z-nav: 50;
  --z-modal: 80;
  --z-toast: 90;
}
```

**The golden rule of glass:** glass only reads as glass when there is something behind it.
Without an aurora, gradient or image underneath, `backdrop-filter` is invisible and the panel
degrades into flat gray.

---

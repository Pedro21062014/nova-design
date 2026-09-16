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

## 0 . How to Use This File <a id="s-0"></a>

### 0.1 Reading protocol for agents (three steps, about fifteen seconds) <a id="s-0-1"></a>

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

### 0.2 What this file is, and what it is not <a id="s-0-2"></a>

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

### 0.3 Loading this spec and its companions (raw URLs) <a id="s-0-3"></a>

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

### 0.4 Output contract (how the agent must deliver) <a id="s-0-4"></a>

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

### 0.5 Task Map <a id="s-0-5"></a>

> Find the task, read only the listed lines, then open the matching example file from Section 0.7
> or the ready component from Section 0.8. `+` means "also read". Line numbers are regenerated by
> `scripts/build_spec.py`.

| Task or user intent | Lines to read | Section | Examples |
|---|---|---|---|
| Find a ready component instead of writing one | `lines 239-285` | Component library | - |
| Imitate a whole page before building one | `lines 239-285` | Page templates | - |
| Remove purple from a pasted shadcn component | `lines 239-285` + `lines 374-496` + `lines 3715-3792` | Library and color discipline | EX-41 |
| Add motion to a component that has none | `lines 239-285` + `lines 2998-3012` + `lines 3322-3350` | Motion baseline | EX-79 |
| Animate images on scroll (veil, parallax, gallery) | `lines 3351-3401` | Images and media on scroll | EX-80, EX-84 |
| Understand the system, vocabulary and delivery rules | `lines 50-79` | How to use this file | - |
| Build the visual foundation: color, glass, type, spacing | `lines 356-678` | Design foundations | EX-01, EX-07, EX-08 |
| Choose colors, avoid purple and neon, apply the accent budget | `lines 374-496` | Color discipline | - |
| Copy and paste tokens: CSS, Tailwind, motion | `lines 679-1049` | Design tokens | - |
| Buttons and form controls | `lines 1057-1177` | Buttons | EX-11, EX-12 |
| Glass cards, bento grids, spotlight surfaces | `lines 1178-1294` | Surfaces | EX-01 to EX-06 |
| Badges, chips, status pills | `lines 1295-1333` | Badges | EX-09, EX-33 |
| Inputs, selects, switches, sliders, dropzones, forms | `lines 1334-1409` | Form controls | EX-14 to EX-20 |
| Tables, lists, key-value, stats | `lines 1410-1462` | Data display | EX-06, EX-69 |
| Navbar, mobile menu, sidebar, command palette, footer | `lines 1463-1544` | Navigation | EX-21 to EX-30 |
| Hero sections | `lines 1545-1565` | Hero | EX-31, EX-32, EX-33 |
| Bento grids | `lines 1566-1590` | Bento | EX-03 |
| Spotlight and pointer-reactive surfaces | `lines 1591-1604` | Pointer effects | EX-04, EX-86 |
| Marquee, logo cloud, testimonials | `lines 1605-1624` | Social proof | EX-10, EX-34, EX-43, EX-44 |
| Accordion and FAQ | `lines 1625-1653` | Accordion | EX-37, EX-88 |
| Pricing tables and plan comparison | `lines 1654-1678` | Pricing | EX-41, EX-42 |
| Metrics, counters and KPI tiles | `lines 1679-1688` | Metrics | EX-45, EX-66, EX-85 |
| Timeline, steps and roadmap | `lines 1689-1700` | Timeline | EX-36, EX-77, EX-93 |
| Footer | `lines 1701-1714` | Footer | EX-30 |
| Modals, drawers, sheets, confirms | `lines 1715-1735` | Overlays | EX-23, EX-76, EX-90 |
| Toasts and notifications | `lines 1736-1749` | Toasts | EX-89 |
| Tooltips, popovers, dropdown menus | `lines 1750-1762` | Floating UI | EX-13, EX-28 |
| Avatars, user menu, presence | `lines 1763-1775` | Identity | EX-34, EX-43 |
| Skeletons, loading, empty and error states | `lines 1776-1811` | States | EX-72, EX-73, EX-74 |
| Charts, tables and dashboards | `lines 1812-1853` | Charts | EX-66 to EX-71 |
| Calendar, date picker, scheduling | `lines 1854-1868` | Calendar | - |
| File upload, media, lightbox | `lines 1869-1888` | Media | EX-19, EX-90 |
| Code blocks, terminal, diff viewer | `lines 1889-1913` | Code UI | EX-58, EX-64 |
| Feature sections, comparison, integrations | `lines 1914-1930` | Feature sections | EX-35, EX-42 |
| CTA, newsletter, waitlist | `lines 1931-1944` | Conversion | EX-38, EX-39, EX-49 |
| Scroll utilities: progress, back to top, scroll spy | `lines 1945-1956` | Scroll utilities | EX-84, EX-22 |
| Onboarding, stepper, product tour | `lines 1957-1970` | Onboarding | EX-99 |
| Settings and preferences UI | `lines 1971-1984` | Settings | EX-75, EX-76, EX-100 |
| Search results and filters | `lines 1985-1999` | Search and filters | EX-71 |
| Quality micro-patterns and component index | `lines 2000-2052` | Polish | - |
| Chat interface, conversational AI, assistant UI | `lines 2053-2765` | Chat scene, complete part | EX-51 to EX-65 |
| Composer, streaming, reasoning, tool calls | `lines 2363-2564` | Chat internals | EX-55 to EX-61 |
| Artifacts, citations, feedback, shortcuts | `lines 2565-2703` | Chat advanced | EX-62 to EX-65 |
| Complete SaaS landing page | `lines 2772-2796` | Blueprint 5.1 | EX-31 to EX-40 |
| Portfolio and personal site | `lines 2812-2830` | Blueprint 5.3 | EX-95 |
| Pricing page | `lines 2831-2842` | Blueprint 5.4 | EX-96 |
| Documentation site, blog and changelog | `lines 2843-2881` | Blueprints 5.5, 5.6 | EX-91, EX-92, EX-93 |
| Dashboard and admin | `lines 2882-2906` | Blueprint 5.7 | EX-94 |
| Auth, 404, waitlist, error pages | `lines 2907-2960` | Blueprint 5.8 | EX-46 to EX-50, EX-98 |
| SEO, metadata and social surface | `lines 2961-2975` | SEO | - |
| Scroll animations, reveals, transitions | `lines 2993-3401` | Motion system | EX-79 to EX-90 |
| Scrollytelling, parallax, horizontal scroll | `lines 3150-3218` | Advanced motion | EX-81, EX-82, EX-83 |
| Reduced motion and performance | `lines 3274-3307` | Motion safety | - |
| Ready-made CSS and JS recipes | `lines 3402-3811` | Recipes | - |
| shadcn bridge (skinning primitives) | `lines 3715-3792` | shadcn bridge | EX-06, EX-11 |
| MIT open-source inspiration and attribution | `lines 3812-3971` | Open-source references | - |
| Review quality, accessibility, performance, SEO | `lines 3972-4151` | Quality gates | - |
| Anti-patterns to avoid | `lines 4051-4099` | Anti-patterns | - |
| Prompt templates, workflows, definition of done | `lines 4152-4307` | AI workflow | - |
| Glossary, utilities, project structure, naming | `lines 4308-4518` | Appendix | - |

### 0.6 Vocabulary of the system <a id="s-0-6"></a>

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

### 0.7 Example library - 100 examples (raw links) <a id="s-0-7"></a>

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

### 0.8 Component library and page templates (raw links) <a id="s-0-8"></a>

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

### 0.9 Prompt library (raw links) <a id="s-0-9"></a>

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

### 0.10 Index <a id="s-0-10"></a>

> Full index with line ranges, generated from the section headings.
> Use this table when the Task Map does not cover the request.

| Section | Title | Lines | Anchor |
|---|---|---|---|
| 0 | How to Use This File | `34-355` | [jump](#s-0) |
| &nbsp;&nbsp;0.1 | &nbsp;&nbsp;Reading protocol for agents (three steps, about fifteen seconds) | `36-49` | [jump](#s-0-1) |
| &nbsp;&nbsp;0.2 | &nbsp;&nbsp;What this file is, and what it is not | `50-79` | [jump](#s-0-2) |
| &nbsp;&nbsp;0.3 | &nbsp;&nbsp;Loading this spec and its companions (raw URLs) | `80-108` | [jump](#s-0-3) |
| &nbsp;&nbsp;0.4 | &nbsp;&nbsp;Output contract (how the agent must deliver) | `109-131` | [jump](#s-0-4) |
| &nbsp;&nbsp;0.5 | &nbsp;&nbsp;Task Map | `132-200` | [jump](#s-0-5) |
| &nbsp;&nbsp;0.6 | &nbsp;&nbsp;Vocabulary of the system | `201-215` | [jump](#s-0-6) |
| &nbsp;&nbsp;0.7 | &nbsp;&nbsp;Example library - 100 examples (raw links) | `216-238` | [jump](#s-0-7) |
| &nbsp;&nbsp;0.8 | &nbsp;&nbsp;Component library and page templates (raw links) | `239-285` | [jump](#s-0-8) |
| &nbsp;&nbsp;0.9 | &nbsp;&nbsp;Prompt library (raw links) | `286-304` | [jump](#s-0-9) |
| &nbsp;&nbsp;0.10 | &nbsp;&nbsp;Index | `305-311` | [jump](#s-0-10) |
| &nbsp;&nbsp;0.11 | &nbsp;&nbsp;Tokens in twenty lines (quick reference) | `312-355` | [jump](#s-0-11) |
| 1 | Design Foundations | `356-678` | [jump](#s-1) |
| &nbsp;&nbsp;1.1 | &nbsp;&nbsp;Design philosophy | `358-373` | [jump](#s-1-1) |
| &nbsp;&nbsp;1.2 | &nbsp;&nbsp;Color system | `374-496` | [jump](#s-1-2) |
| &nbsp;&nbsp;1.3 | &nbsp;&nbsp;Glass physics | `497-519` | [jump](#s-1-3) |
| &nbsp;&nbsp;1.4 | &nbsp;&nbsp;Typography | `520-557` | [jump](#s-1-4) |
| &nbsp;&nbsp;1.5 | &nbsp;&nbsp;Spacing and layout | `558-589` | [jump](#s-1-5) |
| &nbsp;&nbsp;1.6 | &nbsp;&nbsp;Radius, elevation and borders | `590-617` | [jump](#s-1-6) |
| &nbsp;&nbsp;1.7 | &nbsp;&nbsp;Iconography | `618-627` | [jump](#s-1-7) |
| &nbsp;&nbsp;1.8 | &nbsp;&nbsp;Motion principles | `628-641` | [jump](#s-1-8) |
| &nbsp;&nbsp;1.9 | &nbsp;&nbsp;Density modes | `642-652` | [jump](#s-1-9) |
| &nbsp;&nbsp;1.10 | &nbsp;&nbsp;Imagery, gradients and illustration | `653-662` | [jump](#s-1-10) |
| &nbsp;&nbsp;1.11 | &nbsp;&nbsp;Sound and haptics | `663-667` | [jump](#s-1-11) |
| &nbsp;&nbsp;1.12 | &nbsp;&nbsp;Brand application | `668-678` | [jump](#s-1-12) |
| 2 | Design Tokens | `679-1049` | [jump](#s-2) |
| &nbsp;&nbsp;2.1 | &nbsp;&nbsp;Complete CSS variable set | `684-806` | [jump](#s-2-1) |
| &nbsp;&nbsp;2.2 | &nbsp;&nbsp;Tailwind v4 theme mapping | `807-850` | [jump](#s-2-2) |
| &nbsp;&nbsp;2.3 | &nbsp;&nbsp;Tailwind v3 configuration (legacy projects) | `851-882` | [jump](#s-2-3) |
| &nbsp;&nbsp;2.4 | &nbsp;&nbsp;Primitive and semantic layers | `883-904` | [jump](#s-2-4) |
| &nbsp;&nbsp;2.5 | &nbsp;&nbsp;TypeScript token types | `905-933` | [jump](#s-2-5) |
| &nbsp;&nbsp;2.6 | &nbsp;&nbsp;Motion tokens for Framer Motion | `934-970` | [jump](#s-2-6) |
| &nbsp;&nbsp;2.7 | &nbsp;&nbsp;Z-index policy | `971-986` | [jump](#s-2-7) |
| &nbsp;&nbsp;2.8 | &nbsp;&nbsp;Breakpoints and container queries | `987-1005` | [jump](#s-2-8) |
| &nbsp;&nbsp;2.9 | &nbsp;&nbsp;Light mode | `1006-1032` | [jump](#s-2-9) |
| &nbsp;&nbsp;2.10 | &nbsp;&nbsp;Token rules for agents | `1033-1049` | [jump](#s-2-10) |
| 3 | Component Library | `1050-2052` | [jump](#s-3) |
| &nbsp;&nbsp;3.1 | &nbsp;&nbsp;Buttons | `1057-1177` | [jump](#s-3-1) |
| &nbsp;&nbsp;3.2 | &nbsp;&nbsp;Surfaces: glass panel, card, tile, sheet | `1178-1294` | [jump](#s-3-2) |
| &nbsp;&nbsp;3.3 | &nbsp;&nbsp;Badges, chips and pills | `1295-1333` | [jump](#s-3-3) |
| &nbsp;&nbsp;3.4 | &nbsp;&nbsp;Form controls | `1334-1409` | [jump](#s-3-4) |
| &nbsp;&nbsp;3.5 | &nbsp;&nbsp;Data display: tables, lists, key-value, stats | `1410-1462` | [jump](#s-3-5) |
| &nbsp;&nbsp;3.6 | &nbsp;&nbsp;Navigation: navbar, menu, sidebar, tabs, command palette | `1463-1544` | [jump](#s-3-6) |
| &nbsp;&nbsp;3.7 | &nbsp;&nbsp;Hero | `1545-1565` | [jump](#s-3-7) |
| &nbsp;&nbsp;3.8 | &nbsp;&nbsp;Bento grid | `1566-1590` | [jump](#s-3-8) |
| &nbsp;&nbsp;3.9 | &nbsp;&nbsp;Spotlight and pointer-reactive surfaces | `1591-1604` | [jump](#s-3-9) |
| &nbsp;&nbsp;3.10 | &nbsp;&nbsp;Marquee, logo cloud and testimonials | `1605-1624` | [jump](#s-3-10) |
| &nbsp;&nbsp;3.11 | &nbsp;&nbsp;Accordion, FAQ and tabbed showcases | `1625-1653` | [jump](#s-3-11) |
| &nbsp;&nbsp;3.12 | &nbsp;&nbsp;Pricing | `1654-1678` | [jump](#s-3-12) |
| &nbsp;&nbsp;3.13 | &nbsp;&nbsp;Metrics, counters and KPI tiles | `1679-1688` | [jump](#s-3-13) |
| &nbsp;&nbsp;3.14 | &nbsp;&nbsp;Timeline, steps and roadmap | `1689-1700` | [jump](#s-3-14) |
| &nbsp;&nbsp;3.15 | &nbsp;&nbsp;Footer | `1701-1714` | [jump](#s-3-15) |
| &nbsp;&nbsp;3.16 | &nbsp;&nbsp;Overlays: modal, drawer, sheet, confirm | `1715-1735` | [jump](#s-3-16) |
| &nbsp;&nbsp;3.17 | &nbsp;&nbsp;Toasts and notifications | `1736-1749` | [jump](#s-3-17) |
| &nbsp;&nbsp;3.18 | &nbsp;&nbsp;Tooltip, popover and dropdown menu | `1750-1762` | [jump](#s-3-18) |
| &nbsp;&nbsp;3.19 | &nbsp;&nbsp;Avatars, user menu and presence | `1763-1775` | [jump](#s-3-19) |
| &nbsp;&nbsp;3.20 | &nbsp;&nbsp;Skeleton, loading, empty and error states | `1776-1811` | [jump](#s-3-20) |
| &nbsp;&nbsp;3.21 | &nbsp;&nbsp;Charts and data visualization | `1812-1853` | [jump](#s-3-21) |
| &nbsp;&nbsp;3.22 | &nbsp;&nbsp;Calendar, date picker and scheduling | `1854-1868` | [jump](#s-3-22) |
| &nbsp;&nbsp;3.23 | &nbsp;&nbsp;File upload, media and lightbox | `1869-1888` | [jump](#s-3-23) |
| &nbsp;&nbsp;3.24 | &nbsp;&nbsp;Code blocks, terminal and diff viewer | `1889-1913` | [jump](#s-3-24) |
| &nbsp;&nbsp;3.25 | &nbsp;&nbsp;Feature sections, comparison and integrations | `1914-1930` | [jump](#s-3-25) |
| &nbsp;&nbsp;3.26 | &nbsp;&nbsp;Call to action, newsletter and waitlist | `1931-1944` | [jump](#s-3-26) |
| &nbsp;&nbsp;3.27 | &nbsp;&nbsp;Scroll utilities | `1945-1956` | [jump](#s-3-27) |
| &nbsp;&nbsp;3.28 | &nbsp;&nbsp;Onboarding, stepper and product tour | `1957-1970` | [jump](#s-3-28) |
| &nbsp;&nbsp;3.29 | &nbsp;&nbsp;Settings and preferences UI | `1971-1984` | [jump](#s-3-29) |
| &nbsp;&nbsp;3.30 | &nbsp;&nbsp;Search results and filters | `1985-1999` | [jump](#s-3-30) |
| &nbsp;&nbsp;3.31 | &nbsp;&nbsp;Copy, empty and loading micro-patterns (quality details) | `2000-2020` | [jump](#s-3-31) |
| &nbsp;&nbsp;3.32 | &nbsp;&nbsp;Component index (quick lookup) | `2021-2052` | [jump](#s-3-32) |
| 4 | Chat Scene | `2053-2765` | [jump](#s-4) |
| &nbsp;&nbsp;4.0 | &nbsp;&nbsp;Chat scene blueprint | `2064-2109` | [jump](#s-4-0) |
| &nbsp;&nbsp;4.1 | &nbsp;&nbsp;Principles for AI interfaces | `2110-2125` | [jump](#s-4-1) |
| &nbsp;&nbsp;4.2 | &nbsp;&nbsp;Message list and thread behavior | `2126-2195` | [jump](#s-4-2) |
| &nbsp;&nbsp;4.3 | &nbsp;&nbsp;Message anatomy | `2196-2270` | [jump](#s-4-3) |
| &nbsp;&nbsp;4.4 | &nbsp;&nbsp;Message types (rendering matrix) | `2271-2292` | [jump](#s-4-4) |
| &nbsp;&nbsp;4.5 | &nbsp;&nbsp;Markdown, typography and rich rendering | `2293-2320` | [jump](#s-4-5) |
| &nbsp;&nbsp;4.6 | &nbsp;&nbsp;Streaming, stop, retry and regeneration | `2321-2362` | [jump](#s-4-6) |
| &nbsp;&nbsp;4.7 | &nbsp;&nbsp;Composer (the input surface) | `2363-2487` | [jump](#s-4-7) |
| &nbsp;&nbsp;4.8 | &nbsp;&nbsp;Reasoning and thinking display | `2488-2535` | [jump](#s-4-8) |
| &nbsp;&nbsp;4.9 | &nbsp;&nbsp;Tool calls, function results and approvals | `2536-2564` | [jump](#s-4-9) |
| &nbsp;&nbsp;4.10 | &nbsp;&nbsp;Artifacts and the canvas panel | `2565-2593` | [jump](#s-4-10) |
| &nbsp;&nbsp;4.11 | &nbsp;&nbsp;Citations, sources and retrieval | `2594-2605` | [jump](#s-4-11) |
| &nbsp;&nbsp;4.12 | &nbsp;&nbsp;Empty state, prompt suggestions and follow-ups | `2606-2628` | [jump](#s-4-12) |
| &nbsp;&nbsp;4.13 | &nbsp;&nbsp;Sidebar, sessions and history | `2629-2645` | [jump](#s-4-13) |
| &nbsp;&nbsp;4.14 | &nbsp;&nbsp;Multi-user presence and collaboration | `2646-2657` | [jump](#s-4-14) |
| &nbsp;&nbsp;4.15 | &nbsp;&nbsp;Chat settings and model selection | `2658-2673` | [jump](#s-4-15) |
| &nbsp;&nbsp;4.16 | &nbsp;&nbsp;Chat keyboard map and accessibility | `2674-2703` | [jump](#s-4-16) |
| &nbsp;&nbsp;4.17 | &nbsp;&nbsp;Chat hero (marketing variant) | `2704-2715` | [jump](#s-4-17) |
| &nbsp;&nbsp;4.18 | &nbsp;&nbsp;Feedback, ratings and sharing | `2716-2730` | [jump](#s-4-18) |
| &nbsp;&nbsp;4.19 | &nbsp;&nbsp;Selection toolbar inside the thread | `2731-2747` | [jump](#s-4-19) |
| &nbsp;&nbsp;4.20 | &nbsp;&nbsp;Chat scene anti-patterns | `2748-2765` | [jump](#s-4-20) |
| 5 | Page Blueprints | `2766-2992` | [jump](#s-5) |
| &nbsp;&nbsp;5.1 | &nbsp;&nbsp;SaaS landing page (golden path) | `2772-2796` | [jump](#s-5-1) |
| &nbsp;&nbsp;5.2 | &nbsp;&nbsp;Additional marketing sections | `2797-2811` | [jump](#s-5-2) |
| &nbsp;&nbsp;5.3 | &nbsp;&nbsp;Portfolio and personal site | `2812-2830` | [jump](#s-5-3) |
| &nbsp;&nbsp;5.4 | &nbsp;&nbsp;Pricing page | `2831-2842` | [jump](#s-5-4) |
| &nbsp;&nbsp;5.5 | &nbsp;&nbsp;Documentation site | `2843-2861` | [jump](#s-5-5) |
| &nbsp;&nbsp;5.6 | &nbsp;&nbsp;Blog, changelog and content pages | `2862-2881` | [jump](#s-5-6) |
| &nbsp;&nbsp;5.7 | &nbsp;&nbsp;Dashboard and admin | `2882-2906` | [jump](#s-5-7) |
| &nbsp;&nbsp;5.8 | &nbsp;&nbsp;Authentication and utility pages | `2907-2937` | [jump](#s-5-8) |
| &nbsp;&nbsp;5.9 | &nbsp;&nbsp;Waitlist and coming soon | `2938-2947` | [jump](#s-5-9) |
| &nbsp;&nbsp;5.10 | &nbsp;&nbsp;Error, empty and edge-case pages | `2948-2960` | [jump](#s-5-10) |
| &nbsp;&nbsp;5.11 | &nbsp;&nbsp;SEO, metadata and social surface | `2961-2975` | [jump](#s-5-11) |
| &nbsp;&nbsp;5.12 | &nbsp;&nbsp;Page composition checklist | `2976-2992` | [jump](#s-5-12) |
| 6 | Motion System | `2993-3401` | [jump](#s-6) |
| &nbsp;&nbsp;6.1 | &nbsp;&nbsp;Motion vocabulary | `2998-3012` | [jump](#s-6-1) |
| &nbsp;&nbsp;6.2 | &nbsp;&nbsp;Scroll reveal (the default) | `3013-3098` | [jump](#s-6-2) |
| &nbsp;&nbsp;6.3 | &nbsp;&nbsp;Orchestration and sequences | `3099-3118` | [jump](#s-6-3) |
| &nbsp;&nbsp;6.4 | &nbsp;&nbsp;Scroll-linked animation | `3119-3149` | [jump](#s-6-4) |
| &nbsp;&nbsp;6.5 | &nbsp;&nbsp;Sticky scrollytelling | `3150-3182` | [jump](#s-6-5) |
| &nbsp;&nbsp;6.6 | &nbsp;&nbsp;Parallax layers | `3183-3191` | [jump](#s-6-6) |
| &nbsp;&nbsp;6.7 | &nbsp;&nbsp;Horizontal scroll gallery | `3192-3218` | [jump](#s-6-7) |
| &nbsp;&nbsp;6.8 | &nbsp;&nbsp;Pinning, progress and sticky headers | `3219-3228` | [jump](#s-6-8) |
| &nbsp;&nbsp;6.9 | &nbsp;&nbsp;Page and route transitions | `3229-3239` | [jump](#s-6-9) |
| &nbsp;&nbsp;6.10 | &nbsp;&nbsp;Micro-interaction catalog | `3240-3258` | [jump](#s-6-10) |
| &nbsp;&nbsp;6.11 | &nbsp;&nbsp;Ambient motion | `3259-3273` | [jump](#s-6-11) |
| &nbsp;&nbsp;6.12 | &nbsp;&nbsp;Reduced motion and performance (mandatory) | `3274-3307` | [jump](#s-6-12) |
| &nbsp;&nbsp;6.13 | &nbsp;&nbsp;Motion QA checklist | `3308-3321` | [jump](#s-6-13) |
| &nbsp;&nbsp;6.14 | &nbsp;&nbsp;Minimum motion baseline (mandatory for every component) | `3322-3350` | [jump](#s-6-14) |
| &nbsp;&nbsp;6.15 | &nbsp;&nbsp;Images and media on scroll | `3351-3401` | [jump](#s-6-15) |
| 7 | Recipes (copy and paste) | `3402-3811` | [jump](#s-7) |
| &nbsp;&nbsp;7.1 | &nbsp;&nbsp;Project setup | `3407-3432` | [jump](#s-7-1) |
| &nbsp;&nbsp;7.2 | &nbsp;&nbsp;The Vitral surface CSS (canonical) | `3433-3512` | [jump](#s-7-2) |
| &nbsp;&nbsp;7.3 | &nbsp;&nbsp;Aurora background | `3513-3550` | [jump](#s-7-3) |
| &nbsp;&nbsp;7.4 | &nbsp;&nbsp;Hero section (complete) | `3551-3600` | [jump](#s-7-4) |
| &nbsp;&nbsp;7.5 | &nbsp;&nbsp;Scroll progress and back to top | `3601-3640` | [jump](#s-7-5) |
| &nbsp;&nbsp;7.6 | &nbsp;&nbsp;Animated counter | `3641-3678` | [jump](#s-7-6) |
| &nbsp;&nbsp;7.7 | &nbsp;&nbsp;Marquee | `3679-3692` | [jump](#s-7-7) |
| &nbsp;&nbsp;7.8 | &nbsp;&nbsp;Theme toggle without flash | `3693-3714` | [jump](#s-7-8) |
| &nbsp;&nbsp;7.9 | &nbsp;&nbsp;shadcn bridge (skinning shadcn components to Nova Vitral) | `3715-3792` | [jump](#s-7-9) |
| &nbsp;&nbsp;7.10 | &nbsp;&nbsp;Test and audit snippets | `3793-3811` | [jump](#s-7-10) |
| 8 | Open-Source References (MIT and permissive) | `3812-3971` | [jump](#s-8) |
| &nbsp;&nbsp;8.1 | &nbsp;&nbsp;Primary component foundation | `3823-3834` | [jump](#s-8-1) |
| &nbsp;&nbsp;8.2 | &nbsp;&nbsp;Motion and animation | `3835-3848` | [jump](#s-8-2) |
| &nbsp;&nbsp;8.3 | &nbsp;&nbsp;Visual inspiration (pattern libraries, MIT unless noted) | `3849-3874` | [jump](#s-8-3) |
| &nbsp;&nbsp;8.4 | &nbsp;&nbsp;Data, charts and tables | `3875-3889` | [jump](#s-8-4) |
| &nbsp;&nbsp;8.5 | &nbsp;&nbsp;Content, editors and AI interface pieces | `3890-3909` | [jump](#s-8-5) |
| &nbsp;&nbsp;8.6 | &nbsp;&nbsp;Typography, icons and assets | `3910-3925` | [jump](#s-8-6) |
| &nbsp;&nbsp;8.7 | &nbsp;&nbsp;Engineering references (structure and quality, not visuals) | `3926-3940` | [jump](#s-8-7) |
| &nbsp;&nbsp;8.8 | &nbsp;&nbsp;How to cite references in generated code | `3941-3955` | [jump](#s-8-8) |
| &nbsp;&nbsp;8.9 | &nbsp;&nbsp;Credits block for the README | `3956-3971` | [jump](#s-8-9) |
| 9 | Quality Gates | `3972-4151` | [jump](#s-9) |
| &nbsp;&nbsp;9.1 | &nbsp;&nbsp;Accessibility (WCAG 2.2 AA, non-negotiable) | `3974-3998` | [jump](#s-9-1) |
| &nbsp;&nbsp;9.2 | &nbsp;&nbsp;Accessibility audit recipe for glass interfaces | `3999-4013` | [jump](#s-9-2) |
| &nbsp;&nbsp;9.3 | &nbsp;&nbsp;Performance budget | `4014-4033` | [jump](#s-9-3) |
| &nbsp;&nbsp;9.4 | &nbsp;&nbsp;Visual QA checklist | `4034-4050` | [jump](#s-9-4) |
| &nbsp;&nbsp;9.5 | &nbsp;&nbsp;Anti-patterns (what makes a page look machine-generated) | `4051-4099` | [jump](#s-9-5) |
| &nbsp;&nbsp;9.6 | &nbsp;&nbsp;Code review checklist for generated UI | `4100-4117` | [jump](#s-9-6) |
| &nbsp;&nbsp;9.7 | &nbsp;&nbsp;Design critique rubric (score each 0 to 5) | `4118-4135` | [jump](#s-9-7) |
| &nbsp;&nbsp;9.8 | &nbsp;&nbsp;Definition of done | `4136-4151` | [jump](#s-9-8) |
| 10 | Working With AI Agents | `4152-4307` | [jump](#s-10) |
| &nbsp;&nbsp;10.1 | &nbsp;&nbsp;Loading the specification | `4156-4167` | [jump](#s-10-1) |
| &nbsp;&nbsp;10.2 | &nbsp;&nbsp;The master prompt pattern | `4168-4208` | [jump](#s-10-2) |
| &nbsp;&nbsp;10.3 | &nbsp;&nbsp;Task decomposition for large builds | `4209-4224` | [jump](#s-10-3) |
| &nbsp;&nbsp;10.4 | &nbsp;&nbsp;Token economy (keeping the agent cheap and accurate) | `4225-4234` | [jump](#s-10-4) |
| &nbsp;&nbsp;10.5 | &nbsp;&nbsp;Self-review loop (the agent must run this before answering) | `4235-4250` | [jump](#s-10-5) |
| &nbsp;&nbsp;10.6 | &nbsp;&nbsp;Common agent failure modes and their fixes | `4251-4266` | [jump](#s-10-6) |
| &nbsp;&nbsp;10.7 | &nbsp;&nbsp;Multi-agent and multi-session work | `4267-4277` | [jump](#s-10-7) |
| &nbsp;&nbsp;10.8 | &nbsp;&nbsp;Prompt library (external files in this repository) | `4278-4296` | [jump](#s-10-8) |
| &nbsp;&nbsp;10.9 | &nbsp;&nbsp;Definition of done for an agent session | `4297-4307` | [jump](#s-10-9) |
| 11 | Appendix | `4308-4518` | [jump](#s-11) |
| &nbsp;&nbsp;11.1 | &nbsp;&nbsp;Glossary | `4310-4334` | [jump](#s-11-1) |
| &nbsp;&nbsp;11.2 | &nbsp;&nbsp;Utility functions | `4335-4396` | [jump](#s-11-2) |
| &nbsp;&nbsp;11.3 | &nbsp;&nbsp;Recommended project structure | `4397-4438` | [jump](#s-11-3) |
| &nbsp;&nbsp;11.4 | &nbsp;&nbsp;Section wrapper (layout primitive) | `4439-4467` | [jump](#s-11-4) |
| &nbsp;&nbsp;11.5 | &nbsp;&nbsp;Copy guidelines | `4468-4482` | [jump](#s-11-5) |
| &nbsp;&nbsp;11.6 | &nbsp;&nbsp;Spec changelog and maintenance | `4483-4496` | [jump](#s-11-6) |
| &nbsp;&nbsp;11.7 | &nbsp;&nbsp;License and reuse | `4497-4512` | [jump](#s-11-7) |
| &nbsp;&nbsp;11.8 | &nbsp;&nbsp;Final note to the agent | `4513-4518` | [jump](#s-11-8) |

### 0.11 Tokens in twenty lines (quick reference) <a id="s-0-11"></a>

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

## 1 . Design Foundations <a id="s-1"></a>

### 1.1 Design philosophy <a id="s-1-1"></a>

Nova Vitral is a minimalism with depth. The system is defined by four commitments:

1. **Dark ground, lit subjects.** The page is a dark room. Interfaces are lit objects inside it.
   Every panel is a surface that catches light, never a filled rectangle.
2. **One idea per screen.** Each viewport carries a single message, one primary action and one
   visual anchor. Density is allowed only in data contexts (dashboards, tables, chat).
3. **Motion explains, never entertains.** Animation exists to show hierarchy, causality and
   continuation. If removing an animation costs the user no information, remove it.
4. **Craft in the details.** Hairlines, optical alignment, focus rings, empty states, cursor
   states, exit animations. Craft is what separates a professional page from a template.

The emotional target: calm, expensive, technical. Think of a precision instrument photographed
in a dark studio. Not playful, not corporate blue, not neon-heavy.

### 1.2 Color system <a id="s-1-2"></a>

Nova Vitral is a dark-first system with an optional light mode. Color is rationed: roughly
90 percent neutral ground, 9 percent glass white, 1 percent accent.

**Neutral ground (dark mode, default)**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#06070c` | Page ground |
| `--bg-soft` | `#0a0c14` | Section alternation, sticky bars |
| `--bg-elevated` | `#0e1120` | Rare opaque elevation, code blocks |
| `--fg` | `#f5f7ff` | Primary text |
| `--fg-muted` | `#a8b0c8` | Body copy, secondary labels |
| `--fg-subtle` | `#6b7490` | Captions, metadata, placeholders |
| `--hair` | `rgba(255,255,255,.10)` | Default 1px border |
| `--hair-strong` | `rgba(255,255,255,.18)` | Hover and focus border |
| `--glass` | `rgba(255,255,255,.055)` | Panel fill |
| `--glass-strong` | `rgba(255,255,255,.09)` | Elevated panel, active item |

**Accents**

| Token | Value | Meaning | Allowed uses |
|---|---|---|---|
| `--accent` | `#7c8cff` | Primary action, focus | Primary button, links, focus ring, active tab |
| `--accent-2` | `#62e9d6` | Success, live, streaming | Status dots, progress, positive deltas |
| `--accent-3` | `#c084fc` | Reserved, off by default | Only when a brand or a campaign demands it: one element per page, never decorative |
| `--warn` | `#f5b544` | Caution | Rate limits, destructive warnings |
| `--danger` | `#ff6b81` | Error, destructive | Errors, delete, negative deltas |

Accent rule: at most **two accents visible per viewport**. `--accent` plus one of the others.
Never place three accents in the same component.

#### 1.2.1 Color discipline (mandatory)

The fastest way to make an interface look machine-generated is color inflation: purple-to-blue
gradients on every surface, neon accents, saturated fills and glow everywhere. Nova Vitral is a
**neutral-first** language. Color is a signal, not a decoration.

1. **Neutral budget.** At least 90 percent of the pixels on any screen must be neutral: ground,
   glass white, text grays. Color occupies the remaining 10 percent at most, and almost always in
   thin, small elements (icons, hairlines, dots, chips, data marks).
2. **Accent budget.** One accent per viewport by default; two when a comparison genuinely needs it.
   An accent may cover a large area only once per page, and only when it marks the primary action.
3. **Banned by default.** Do not use purple, violet, magenta or neon as the default accent. Do not
   use the purple-to-blue gradient, cyan-on-purple, rainbow or multi-hue gradients, saturated
   background fills, glow outside a single focus or hover state, or gradient text anywhere except a
   hero H1.
4. **Allowed accents.** The default is the restrained indigo `--accent`, with `--accent-2` (mint)
   for live, success and progress states, and `--warn` / `--danger` for semantics. If the user asks
   for purple or a vivid brand color, keep the ground neutral, use it as the single accent,
   desaturate it toward 60 to 78 percent lightness, and never fill more than a few percent of the
   surface with it.
5. **Gradients.** Only three are allowed: the single-hue primary gradient for the primary action
   (`--grad-primary`), the vertical hairline gradient for edges, and the veil gradient for masks.
   A gradient must never carry meaning, and never appears on a surface behind body copy.
6. **Saturation ceiling.** No color above roughly 85 percent saturation at 55 to 70 percent
   lightness. Vibrant colors read as cheap on a dark ground; restraint reads as expensive.
7. **Grayscale test (the acceptance check).** Convert the page to grayscale. Hierarchy, rhythm and
   the primary action must all remain obvious. If the page collapses without color, color is doing
   the layout's job: remove color until it passes.
8. **Dark-ground check.** On `--bg`, accents must reach 3:1 against the ground for large areas and
   4.5:1 for text. Neon colors often fail this while looking "bright" — measure, do not trust the eye.

9. **The closed set.** Color is not a taste question inside a component. These are the only values an
   implementation may contain:

   ```css
   --bg: #06070c;  --bg-soft: #0a0c14;  --bg-elevated: #0e1120;
   --fg: #f5f7ff;  --fg-muted: #a8b0c8;  --fg-subtle: #6b7490;
   --glass: rgba(255,255,255,.055);  --glass-strong: rgba(255,255,255,.09);  --glass-dim: rgba(255,255,255,.03);
   --hair: rgba(255,255,255,.10);    --hair-strong: rgba(255,255,255,.18);
   --accent: #7c8cff;  --accent-2: #62e9d6;  --warn: #f5b544;  --danger: #ff6b81;
   --grad-primary: linear-gradient(135deg, #8a97ff, #6a78f0);
   --grad-live: linear-gradient(90deg, #62e9d6, #7c8cff);
   --grad-hairline: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.04));
   ```

   Everything else is a defect. Rejected on sight: `purple`, `violet`, `fuchsia`, `magenta`,
   `indigo-400/500/600` used as fills, `#8b5cf6`, `#a855f7`, `#7c3aed`, high-chroma `oklch()`,
   colored glow shadows, multi-hue gradients, gradient text outside a hero H1, and a second accent in
   one viewport.

   | Instead of | Write |
   |---|---|
   | `bg-purple-500`, `bg-violet-500` | `bg-[var(--glass)]` plus a `border border-[var(--hair)]` |
   | a colored glow shadow | nothing, or a 1px `--hair-strong` ring on hover |
   | `from-purple-500 to-blue-500` | `[image:var(--grad-primary)]`, primary action only |
   | `bg-emerald-500`, `bg-rose-500` as blocks | a dot, an icon or a 12 percent chip in `--accent-2`, `--warn` or `--danger` |
   | `backdrop-blur-2xl` over a flat ground | glass over an aurora, gradient or image |

10. **The five tells of machine-generated UI.** Remove all five before delivering: a purple or violet
    primary, usually on a gradient button; colored glow shadows under cards and buttons; three or more
    accents competing in one viewport; emoji standing in for icons, or a mixed icon set; every element
    animating at once, for 1.5s, with a bounce.

**Aurora hues** (background light only, always blurred)

```css
--aurora-1: rgba(124, 140, 255, 0.26); /* indigo */
--aurora-2: rgba(98, 233, 214, 0.18);  /* mint   */
--aurora-3: rgba(122, 162, 255, 0.18); /* soft blue, keeps the field calm */
--aurora-4: rgba(255, 138, 101, 0.10); /* ember, sparingly, optional */
/* If the aurora reads as purple in a screenshot, it is too strong: lower the alpha or drop blob 3. */
```

**Gradient recipes**

```css
/* Single hue by design: the primary action must not look like a candy button. */
--grad-primary: linear-gradient(135deg, #8a97ff 0%, #6a78f0 100%);
--grad-live: linear-gradient(90deg, #62e9d6 0%, #7c8cff 100%);   /* live states only, small areas */
--grad-hairline: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.04));
--grad-text: linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,255,255,.62));
--grad-veil: linear-gradient(180deg, rgba(6,7,12,0) 0%, rgba(6,7,12,.9) 100%);
```

Never build a gradient from two different hues for an interactive surface. `--grad-primary` stays
inside one hue family on purpose; hue contrast is reserved for data and for the live indicator.

**Light mode** is derived, not inverted by hand. Keep the same structure, invert the ground and
reduce accent saturation by 8 percent. Details in Section 2.9.

### 1.3 Glass physics <a id="s-1-3"></a>

Glass is the signature of the system and the most mishandled element. Rules:

1. **Backdrop requirement.** Glass only sits above a non-flat background: aurora, image, gradient,
   or another panel. On an empty background it is forbidden.
2. **Blur budget.** `--blur-sm` for small chips, `--blur` for cards and navbars, `--blur-lg` for
   hero panels and modals. Never exceed 40px, diminishing returns after that.
3. **Saturation compensation.** `backdrop-filter: blur(18px) saturate(140%)`. The saturation boost
   is what makes the light behind the panel feel real.
4. **Three-layer anatomy.** Every glass surface is built from exactly three layers:
   - *fill*: `--glass` or `--glass-strong`
   - *edge*: 1px hairline, brighter on top, `--grad-hairline` on a masked border
   - *light*: inner top highlight `inset 0 1px 0 rgba(255,255,255,.10)` plus a specular sweep on hover
5. **Nesting rule.** A panel inside a panel does not add blur. It raises border contrast and
   reduces fill opacity. This avoids the gray mud look of stacked backdrops.
6. **Grain.** A fixed noise layer at 2.5 to 3.5 percent opacity over the whole page. Without grain,
   large blurred areas band on cheap displays.
7. **Legibility.** Body text on glass must reach 4.5:1 against the worst-case backdrop. If unsure,
   darken the fill instead of adding text shadow.

Reference implementation: Section 7.2.

### 1.4 Typography <a id="s-1-4"></a>

**Families**

| Role | Family | Fallback | Notes |
|---|---|---|---|
| Display / UI | Geist | Inter, system-ui | Geometric, tight, modern |
| Body | Inter | system-ui, sans-serif | Excellent hinting on dark ground |
| Code / mono | Geist Mono | JetBrains Mono, ui-monospace | Tabular numbers for data |
| Alternative display | Satoshi, General Sans | Inter | Only when the brand requires it |

Load with `next/font` so there is no layout shift and no external request at runtime.

**Scale** (fluid, `clamp`, 1.25 ratio at desktop, tighter at mobile)

| Token | Size | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 7vw, 5.5rem)` | 0.96 | -0.04em | 600 | Hero H1 |
| `--fs-h1` | `clamp(2.25rem, 5vw, 3.5rem)` | 1.04 | -0.03em | 600 | Page title |
| `--fs-h2` | `clamp(1.75rem, 3.5vw, 2.5rem)` | 1.12 | -0.025em | 600 | Section title |
| `--fs-h3` | `1.375rem` | 1.25 | -0.02em | 600 | Card title, subsection |
| `--fs-h4` | `1.125rem` | 1.35 | -0.015em | 600 | Group label |
| `--fs-lead` | `clamp(1.0625rem, 1.6vw, 1.25rem)` | 1.6 | -0.01em | 400 | Subtitle under hero |
| `--fs-body` | `1rem` | 1.65 | 0 | 400 | Body |
| `--fs-sm` | `0.875rem` | 1.55 | 0.005em | 400 | Secondary UI |
| `--fs-xs` | `0.8125rem` | 1.45 | 0.01em | 500 | Labels, badges |
| `--fs-2xs` | `0.6875rem` | 1.4 | 0.06em | 500 | Overline, uppercase |

**Rules**

- Maximum measure is 68 characters (`max-width: 62ch` for long copy, `46ch` for leads).
- Headings use `text-wrap: balance`. Body paragraphs use `text-wrap: pretty`.
- Hero headings get a vertical gradient fill (`--grad-text`) with a `background-clip`. This is the
  single most recognizable touch of the system.
- Overlines are uppercase, 0.06em tracking, `--fg-subtle`.
- Numbers in tables and metrics use `font-variant-numeric: tabular-nums`.
- Never justify text. Never use pure white `#fff` for long copy; use `--fg` or `--fg-muted`.

### 1.5 Spacing and layout <a id="s-1-5"></a>

**Spacing scale** (4px base, geometric above 32)

```
--s-1: 4px    --s-2: 8px    --s-3: 12px   --s-4: 16px
--s-5: 20px   --s-6: 24px   --s-8: 32px   --s-10: 40px
--s-12: 48px  --s-16: 64px  --s-20: 80px  --s-24: 96px
--s-32: 128px --s-40: 160px --s-48: 192px
```

**Vertical rhythm**

| Context | Space above | Space below |
|---|---|---|
| Section (standard) | `96px / 128px` | `96px / 128px` |
| Section (dense, dashboard) | `48px` | `48px` |
| Heading to paragraph | `16px` | - |
| Paragraph to action | `32px` | - |
| Card padding | `24px` | `24px` |
| Card padding (large) | `32px` to `40px` | same |

**Grid**

- Container: `max-width: 1200px`, gutters 20px mobile, 32px tablet, 40px desktop.
- A "wide" container of 1440px is allowed only for bento grids and full-bleed galleries.
- 12 columns desktop, 6 tablet, 4 mobile. Feature grids: 3 / 2 / 1. Bento: 6 / 3 / 1.
- Section header pattern: overline, title, lead, action, centered or left aligned never mixed.

**Quiet zone**: any dense block (table, chat, chart) gets at least 96px of separation from the
next block. This single rule does more for perceived quality than any other.

### 1.6 Radius, elevation and borders <a id="s-1-6"></a>

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `10px` | chips, inputs, small buttons |
| `--radius` | `16px` | buttons, cards |
| `--radius-lg` | `24px` | large panels, bento cells |
| `--radius-xl` | `32px` | hero panels, modals, media |
| `--radius-full` | `999px` | pills, avatars, dots |

**Elevation ladder** (shadow is subtle; light does the work)

```css
--shadow-1: 0 1px 2px rgba(0,0,0,.30);                              /* resting card      */
--shadow-2: 0 12px 32px -12px rgba(0,0,0,.55);                      /* raised card       */
--shadow-3: 0 32px 80px -24px rgba(0,0,0,.70);                      /* modal, hero panel */
--shadow-glow: 0 0 0 1px rgba(124,140,255,.35), 0 12px 40px -12px rgba(124,140,255,.45);
```

Concentric radius rule: an inner element's radius equals the outer radius minus the padding.
A 24px panel with 12px padding holds a 12px inner element.

**Border discipline**

- One visible border per surface, never a border plus a heavy shadow plus a gradient.
- Dividers between list rows use `--hair` at 1px, inset by the row padding.
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 2px;` on `:focus-visible` only.

### 1.7 Iconography <a id="s-1-7"></a>

- Library: `lucide-react` (stroke 1.5px, 24px grid, `currentColor`).
- Sizes: 14 (inline), 16 (buttons, list), 18 (nav), 20 (feature icon), 24 (hero mark).
- Feature icons never stand alone. Pair every icon with a glass tile: 40px box, `--radius-sm`,
  `--glass`, hairline, accent-tinted icon.
- No emoji in production UI. No filled icon sets mixed with outlined sets.
- Logos are monochrome at 60 percent opacity, rising to 100 percent on hover. A logo cloud with
  saturated brand colors breaks the system.

### 1.8 Motion principles <a id="s-1-8"></a>

1. **Duration ladder.** 140ms micro, 240ms standard, 420ms large surfaces, 760ms scroll reveals.
   Anything above 900ms feels slow on repeat visits.
2. **Easing.** Enter with `--ease-out` (`cubic-bezier(.16,1,.3,1)`); exit with a shorter,
   linear-ish curve. Never use `ease-in-out` for entrances.
3. **Distance.** Reveal translation is 12 to 24px. Hover lift is 2 to 4px. Scale on press is 0.98.
   Large movement is reserved for dramatic moments (hero, scrollytelling).
4. **Stagger.** 40 to 80ms between siblings, capped so the last child starts under 400ms.
5. **One animation per element.** A card that lifts does not also rotate, glow and scale.
6. **Animate only** `transform`, `opacity`, and in rare cases `filter` and `clip-path`.
7. **Exit matters.** Every modal, toast, tooltip and menu has an exit animation of 120 to 180ms.
8. **Reduced motion.** Every rule has a non-animated fallback. See Section 6.12.

### 1.9 Density modes <a id="s-1-9"></a>

| Mode | Row height | Font | Padding | Use |
|---|---|---|---|---|
| Comfortable (default) | 56px | `--fs-body` | `--s-6` | Marketing, chat, settings |
| Compact | 40px | `--fs-sm` | `--s-4` | Tables, sidebars, admin |
| Dense | 32px | `--fs-xs` | `--s-3` | Data grids, logs, dev tools |

A page declares density once on its root (`data-density="compact"`) and components read it.
Never mix densities inside one panel.

### 1.10 Imagery, gradients and illustration <a id="s-1-10"></a>

- Prefer **light** over photography: aurora, conic gradients, mesh, noise.
- Photography, when used, is desaturated 20 percent, vignetted, and always behind a veil gradient.
- Product shots sit on a glass plate with a 1px hairline and a soft shadow. Add a 6px inner
  padding gap so the image appears inset, not cropped.
- Never use stock illustrations of people pointing at charts. For empty states, use a geometric
  glass composition or a single outlined icon inside a tinted tile.
- Avatars: circular, 1px hairline, initials fallback on a gradient derived from the user id hash.

### 1.11 Sound and haptics <a id="s-1-11"></a>

Rare in web contexts, therefore strict: optional, off by default, never on hover, only on
commit actions (send message, complete task) and always under 200ms. A single soft tick.

### 1.12 Brand application <a id="s-1-12"></a>

When adapting Nova Vitral to a client brand:

1. Replace `--accent`, `--accent-2`, `--accent-3` and the aurora hues. Nothing else.
2. Keep the neutral ground; a brand color must earn its contrast on dark.
3. Adjust `--radius` only if the brand is decidedly rounder or squarer, then scale the whole ladder.
4. Re-run the contrast checks in Section 9.2 after any accent change.

---

## 2 . Design Tokens <a id="s-2"></a>

Tokens are the contract between the spec and the code. Agents must use them exclusively.
If a value is missing, extend the token set, never inline the value.

### 2.1 Complete CSS variable set <a id="s-2-1"></a>

```css
/* app/globals.css */
@layer base {
  :root {
    /* Ground */
    --bg: #06070c;
    --bg-soft: #0a0c14;
    --bg-elevated: #0e1120;

    /* Text */
    --fg: #f5f7ff;
    --fg-muted: #a8b0c8;
    --fg-subtle: #6b7490;
    --fg-inverse: #06070c;

    /* Glass */
    --glass: rgba(255, 255, 255, 0.055);
    --glass-strong: rgba(255, 255, 255, 0.09);
    --glass-dim: rgba(255, 255, 255, 0.03);
    --glass-hover: rgba(255, 255, 255, 0.085);

    /* Edges */
    --hair: rgba(255, 255, 255, 0.10);
    --hair-strong: rgba(255, 255, 255, 0.18);
    --hair-soft: rgba(255, 255, 255, 0.06);
    --highlight: rgba(255, 255, 255, 0.10);

    /* Accents */
    --accent: #7c8cff;
    --accent-fg: #ffffff;
    --accent-soft: rgba(124, 140, 255, 0.14);
    --accent-2: #62e9d6;
    --accent-3: #c084fc;   /* reserved, off by default (1.2.1) */
    --warn: #f5b544;
    --danger: #ff6b81;
    --success: #4ade80;

    /* Aurora (keep the field calm: total alpha under 0.45, no purple cast) */
    --aurora-1: rgba(124, 140, 255, 0.26);
    --aurora-2: rgba(98, 233, 214, 0.18);
    --aurora-3: rgba(122, 162, 255, 0.18);
    --aurora-4: rgba(255, 138, 101, 0.10);

    /* Gradients (defined and justified in section 1.2.1 - single hue for actions) */
    --grad-primary: linear-gradient(135deg, #8a97ff 0%, #6a78f0 100%);
    --grad-live: linear-gradient(90deg, #62e9d6 0%, #7c8cff 100%);
    --grad-hairline: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04));

    /* Radius */
    --radius-xs: 6px;
    --radius-sm: 10px;
    --radius: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    --radius-full: 999px;

    /* Blur */
    --blur-xs: 4px;
    --blur-sm: 8px;
    --blur: 18px;
    --blur-lg: 32px;

    /* Shadow */
    --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.30);
    --shadow-2: 0 12px 32px -12px rgba(0, 0, 0, 0.55);
    --shadow-3: 0 32px 80px -24px rgba(0, 0, 0, 0.70);
    --shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.10);

    /* Spacing */
    --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
    --s-5: 20px; --s-6: 24px; --s-8: 32px; --s-10: 40px;
    --s-12: 48px; --s-16: 64px; --s-20: 80px; --s-24: 96px;
    --s-32: 128px; --s-40: 160px;

    /* Typography */
    --font-display: var(--font-geist), system-ui, sans-serif;
    --font-body: var(--font-inter), system-ui, sans-serif;
    --font-mono: var(--font-geist-mono), ui-monospace, monospace;
    --fs-display: clamp(2.75rem, 7vw, 5.5rem);
    --fs-h1: clamp(2.25rem, 5vw, 3.5rem);
    --fs-h2: clamp(1.75rem, 3.5vw, 2.5rem);
    --fs-h3: 1.375rem;
    --fs-h4: 1.125rem;
    --fs-lead: clamp(1.0625rem, 1.6vw, 1.25rem);
    --fs-body: 1rem;
    --fs-sm: 0.875rem;
    --fs-xs: 0.8125rem;
    --fs-2xs: 0.6875rem;

    /* Motion */
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out: cubic-bezier(0.65, 0.05, 0.36, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --dur-instant: 90ms;
    --dur-fast: 140ms;
    --dur: 240ms;
    --dur-slow: 420ms;
    --dur-reveal: 760ms;

    /* Layers */
    --z-base: 0;
    --z-sticky: 30;
    --z-nav: 50;
    --z-dropdown: 60;
    --z-overlay: 70;
    --z-modal: 80;
    --z-toast: 90;
    --z-cursor: 100;

    /* Layout */
    --container: 1200px;
    --container-wide: 1440px;
    --gutter: 20px;
    --nav-h: 64px;
  }

  @media (min-width: 768px) { :root { --gutter: 32px; --nav-h: 72px; } }
  @media (min-width: 1024px) { :root { --gutter: 40px; } }
}
```

### 2.2 Tailwind v4 theme mapping <a id="s-2-2"></a>

```css
/* app/globals.css, Tailwind v4 */
@import "tailwindcss";

@theme inline {
  --color-bg: var(--bg);
  --color-bg-soft: var(--bg-soft);
  --color-bg-elevated: var(--bg-elevated);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-fg-subtle: var(--fg-subtle);
  --color-glass: var(--glass);
  --color-glass-strong: var(--glass-strong);
  --color-hair: var(--hair);
  --color-hair-strong: var(--hair-strong);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --color-accent-3: var(--accent-3);
  --color-danger: var(--danger);
  --color-warn: var(--warn);

  --radius-sm: var(--radius-sm);
  --radius: var(--radius);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);

  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);

  --ease-out: var(--ease-out);
  --shadow-1: var(--shadow-1);
  --shadow-2: var(--shadow-2);
  --shadow-3: var(--shadow-3);
}

@custom-variant hover-hover (@media (hover: hover) and (pointer: fine) { @slot; });
@custom-variant motion-safe (@media (prefers-reduced-motion: no-preference) { @slot; });
```

Usage: `bg-glass text-fg-muted border-hair rounded-lg shadow-2`.

### 2.3 Tailwind v3 configuration (legacy projects) <a id="s-2-3"></a>

```js
// tailwind.config.ts
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "var(--gutter)", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",
        glass: "var(--glass)",
        "glass-strong": "var(--glass-strong)",
        hair: "var(--hair)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
      },
      borderRadius: { sm: "var(--radius-sm)", DEFAULT: "var(--radius)", lg: "var(--radius-lg)", xl: "var(--radius-xl)" },
      backdropBlur: { sm: "8px", DEFAULT: "18px", lg: "32px" },
      boxShadow: { 1: "var(--shadow-1)", 2: "var(--shadow-2)", 3: "var(--shadow-3)" },
      transitionTimingFunction: { out: "var(--ease-out)" },
    },
  },
};
```

### 2.4 Primitive and semantic layers <a id="s-2-4"></a>

Two layers, always in this order: **primitives** (raw values, never used in JSX) and
**semantics** (aliases used by components).

| Semantic token | Maps to | Consumed by |
|---|---|---|
| `--surface-panel` | `--glass` | Cards, sections |
| `--surface-raised` | `--glass-strong` | Popovers, dropdowns, modals |
| `--surface-sunken` | `--glass-dim` | Inset areas, code blocks in chat |
| `--surface-interactive` | `--glass-hover` | Hover state of tappable surfaces |
| `--border-default` | `--hair` | All 1px edges |
| `--border-emphasis` | `--hair-strong` | Hover, focus, selected |
| `--text-primary` | `--fg` | Headings |
| `--text-secondary` | `--fg-muted` | Body |
| `--text-tertiary` | `--fg-subtle` | Meta |
| `--action-primary` | `--accent` | Primary button |
| `--action-primary-fg` | `--accent-fg` | Text on primary |
| `--state-success` | `--success` | Completed |
| `--state-live` | `--accent-2` | Streaming, online |
| `--state-error` | `--danger` | Errors |

### 2.5 TypeScript token types <a id="s-2-5"></a>

```ts
// lib/tokens.ts
export const density = { comfortable: 56, compact: 40, dense: 32 } as const;
export type Density = keyof typeof density;

export const radius = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, full: 999 } as const;
export const blur = { xs: 4, sm: 8, md: 18, lg: 32 } as const;

export const motion = {
  instant: 0.09,
  fast: 0.14,
  base: 0.24,
  slow: 0.42,
  reveal: 0.76,
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0.05, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const z = {
  base: 0, sticky: 30, nav: 50, dropdown: 60, overlay: 70, modal: 80, toast: 90, cursor: 100,
} as const;
```

### 2.6 Motion tokens for Framer Motion <a id="s-2-6"></a>

```ts
// lib/motion.ts
import type { Transition, Variants } from "motion/react";

export const t = {
  micro: { duration: 0.14, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  base: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  surface: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } satisfies Transition,
  reveal: { duration: 0.76, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: t.reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t.base },
};

export const staggerParent = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: t.spring },
};

export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;
```

### 2.7 Z-index policy <a id="s-2-7"></a>

| Layer | Token | Contents |
|---|---|---|
| Content | `--z-base` | Normal flow |
| Sticky headers inside content | `--z-sticky` | Table headers, section titles |
| Navigation | `--z-nav` | Navbar, mobile bottom bar |
| Dropdown | `--z-dropdown` | Menus, popovers, selects, combobox |
| Overlay scrim | `--z-overlay` | Backdrop under modals |
| Modal | `--z-modal` | Dialogs, command palette, drawers |
| Toast | `--z-toast` | Notifications |
| Cursor | `--z-cursor` | Custom pointer, spotlight follower |

Rules: never invent a z-index; never exceed 100; a nested modal uses `--z-modal` plus 1 and lives
inside the same portal provider.

### 2.8 Breakpoints and container queries <a id="s-2-8"></a>

| Name | Min width | Layout change |
|---|---|---|
| `xs` | 0 | Single column, 20px gutter, nav becomes sheet |
| `sm` | 480 | Two-column pairs, larger type |
| `md` | 768 | Tablet grids, sidebar appears as rail |
| `lg` | 1024 | Full grids, sticky sidebar, hover states enabled |
| `xl` | 1280 | Wide containers, bento 6-column |
| `2xl` | 1536 | Extra whitespace, max container caps |

Prefer container queries for components reused at different widths (cards in a sidebar and in a
full-width grid):

```css
.card-shell { container-type: inline-size; }
@container (min-width: 420px) { .card-title { font-size: var(--fs-h3); } }
```

### 2.9 Light mode <a id="s-2-9"></a>

```css
[data-theme="light"] {
  --bg: #f6f7fb;
  --bg-soft: #eef0f7;
  --bg-elevated: #ffffff;
  --fg: #0b0d14;
  --fg-muted: #4a5168;
  --fg-subtle: #6f778f;
  --glass: rgba(255, 255, 255, 0.62);
  --glass-strong: rgba(255, 255, 255, 0.78);
  --hair: rgba(10, 12, 20, 0.10);
  --hair-strong: rgba(10, 12, 20, 0.18);
  --highlight: rgba(255, 255, 255, 0.75);
  --accent: #5a6bf0;      /* desaturated for contrast on light ground (1.2.1) */
  --aurora-1: rgba(124, 140, 255, 0.20);
  --aurora-2: rgba(98, 220, 205, 0.18);
  --aurora-3: rgba(178, 122, 244, 0.16);
  --shadow-2: 0 12px 32px -12px rgba(16, 20, 40, 0.18);
  --shadow-3: 0 32px 80px -24px rgba(16, 20, 40, 0.22);
}
```

In light mode glass becomes a **frosted white**, not a dark tint. Aurora light must be stronger
since there is less contrast to exploit. Never simply invert the dark palette.

### 2.10 Token rules for agents <a id="s-2-10"></a>

1. Never write a hex, `rgba()` or a shadow literal inside a component. Use `var(--token)` or the
   mapped Tailwind class.
2. Never invent a new accent. If a second accent is needed, use `--accent-2`. `--accent-3` is
   reserved and off by default (section 1.2.1).
3. Never use arbitrary Tailwind values (`w-[437px]`, `bg-[#123456]`) except for one-off
   measurement in a chart or a masked gradient stop.
   The same applies to color: never invent a hue. The accent budget of `1.2.1` is part of the
   contract, and purple or neon by default is a defect, not a preference.
4. Never change a token value inside a component. Theme overrides belong to the theme layer.
5. Every new token must be added to: this section, the Tailwind mapping (2.2 or 2.3) and the
   TypeScript type file if it is consumed by code.
6. When the user provides a brand palette, only remap accents and aurora hues (Section 1.12).

---

## 3 . Component Library <a id="s-3"></a>

Every component entry follows the same structure: purpose, props or API, states, markup,
and behavior notes. Snippets are production-ready starting points, not pseudocode.
Unless stated otherwise, snippets assume: Next.js App Router, TypeScript, Tailwind v4 mapped to
the tokens of Section 2, and `cn()` from Section 11.2.

### 3.1 Buttons <a id="s-3-1"></a>

Purpose: the only element allowed to look "solid". Everything else is glass.

**API**

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary`, `secondary`, `ghost`, `outline`, `danger`, `link` | `primary` |
| `size` | `xs`, `sm`, `md`, `lg`, `icon` | `md` |
| `loading` | boolean | `false` |
| `iconLeft`, `iconRight` | ReactNode | - |
| `full` | boolean | `false` |

**Anatomy**

- Height: 28 / 32 / 40 / 48 px. Horizontal padding equals height divided by two, minimum 12px.
- Radius: `--radius` for md and above, `--radius-sm` for sm and xs. `full` only for pills.
- Primary: `--grad-primary` background, `--accent-fg` text, inner top highlight, glow on hover.
- Secondary: glass fill, hairline, `--fg` text; hover raises fill to `--glass-hover`.
- Ghost: transparent, becomes glass on hover. Used inside dense toolbars.
- Outline: transparent with `--hair-strong` border, accent border on hover.
- Danger: `--danger` at 14 percent fill with `--danger` text in light form; solid `--danger` only
  in confirmation dialogs.
- Link: underline offset 4px, color transition only.

**States**

| State | Treatment |
|---|---|
| rest | as described |
| hover (fine pointers only) | `translateY(-1px)`, fill or glow up one step, 140ms |
| active | `scale(0.98)`, translation reset to 0 |
| focus-visible | `outline: 2px solid var(--accent); outline-offset: 2px` |
| disabled | `opacity: .45`, `pointer-events: none`, no shadow |
| loading | label dims to 60 percent, inline spinner left of the label, width locked |
| destructive confirm | second click within 4s, or a modal when the action is irreversible |

**Implementation**

```tsx
// components/ui/button.tsx
"use client";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "link";
type Size = "xs" | "sm" | "md" | "lg" | "icon";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap " +
  "font-medium transition-[transform,background-color,border-color,box-shadow,opacity] " +
  "duration-[140ms] ease-[var(--ease-out)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] " +
  "disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "text-[var(--accent-fg)] shadow-[var(--shadow-2)] " +
    "bg-[image:var(--grad-primary)] " +
    "hover:shadow-[0_0_0_1px_rgba(124,140,255,.35),0_12px_40px_-12px_rgba(124,140,255,.45)]",
  secondary:
    "text-[var(--fg)] bg-[var(--glass)] border border-[var(--hair)] backdrop-blur-[var(--blur-sm)] " +
    "hover:bg-[var(--glass-hover)] hover:border-[var(--hair-strong)]",
  ghost: "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--glass)]",
  outline:
    "text-[var(--fg)] border border-[var(--hair-strong)] hover:border-[var(--accent)] hover:text-[var(--fg)]",
  danger:
    "text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] " +
    "border border-[color-mix(in_srgb,var(--danger)_35%,transparent)] hover:bg-[color-mix(in_srgb,var(--danger)_22%,transparent)]",
  link: "text-[var(--accent)] underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  xs: "h-7 rounded-[var(--radius-sm)] px-3 text-[var(--fs-2xs)] uppercase tracking-[0.06em]",
  sm: "h-8 rounded-[var(--radius-sm)] px-3.5 text-[var(--fs-sm)]",
  md: "h-10 rounded-[var(--radius)] px-5 text-[var(--fs-sm)]",
  lg: "h-12 rounded-[var(--radius)] px-7 text-[var(--fs-body)]",
  icon: "h-10 w-10 rounded-[var(--radius)] p-0",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, iconLeft, iconRight, full, className, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], full && "w-full", className)}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : iconLeft}
      <span className={cn("truncate", loading && "opacity-60")}>{children}</span>
      {!loading && iconRight}
    </button>
  );
});
```

**Behavior notes**

- Buttons that navigate use `next/link` wrapped in `Button asChild` style, or `Link` styled with
  the same classes. Never put a `button` inside an `a`.
- Icon-only buttons require `aria-label` and a tooltip after 400ms hover.
- Success feedback: label swaps to "Done" with a check icon for 1.6s, no layout shift.
- Button groups: single glass container, inner buttons borderless, 1px divider between segments,
  active segment gets `--glass-strong` and accent text.

### 3.2 Surfaces: glass panel, card, tile, sheet <a id="s-3-2"></a>

**Glass panel** is the base primitive of the system.

```css
/* components.css */
.vitral {
  position: relative;
  background: var(--glass);
  backdrop-filter: blur(var(--blur)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(140%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2), var(--shadow-inset);
  isolation: isolate;
}

/* hairline border with vertical gradient */
.vitral::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.04));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}

/* specular sweep, follows the pointer via CSS variables set in JS */
.vitral::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 0%),
    rgba(255, 255, 255, 0.10),
    transparent 40%
  );
  opacity: 0;
  transition: opacity var(--dur) var(--ease-out);
  pointer-events: none;
}
.vitral:hover::before { opacity: 1; }

/* nested panel: no extra blur, stronger edge, weaker fill */
.vitral .vitral {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background: var(--glass-dim);
  box-shadow: none;
  border-radius: var(--radius);
}
```

**Card variants**

| Variant | Modifiers | Use |
|---|---|---|
| `panel` | base glass, 24px radius, 24px padding | Default container |
| `inset` | `--glass-dim`, no blur, hairline | Nested blocks, code areas |
| `raised` | `--glass-strong`, `--shadow-3`, 32px radius | Elevated feature cards |
| `interactive` | adds hover lift, specular, cursor pointer | Clickable cards |
| `media` | padding 0, image top, content 24px | Blog, product, case study |
| `tinted` | accent at 10 percent behind glass | Highlighted pricing plan |
| `bordered` | transparent fill, hairline only | Tables, lists, dense layouts |

**Interactive card behavior**

```tsx
// components/ui/glass-card.tsx
"use client";
import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children, interactive = true, className, ...rest
}: { children: ReactNode; interactive?: boolean; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "vitral p-6",
        interactive &&
          "transition-transform duration-[240ms] ease-[var(--ease-out)] " +
          "hover:-translate-y-1 will-change-transform",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
```

**Behavior notes**

- Interactive surfaces move 4px maximum and never scale on hover (scale is reserved for press).
- A card that is a link wraps the whole area and keeps one focus ring on the outer element.
- Card footers are separated by a hairline inset by 24px, or by whitespace only. Never both.
- Do not place a shadow on a card that also has an animated border; choose one device.
- In dense grids, disable specular tracking (it costs a pointer listener per card).

### 3.3 Badges, chips and pills <a id="s-3-3"></a>

| Kind | Markup | Notes |
|---|---|---|
| Status | dot + label | Dot uses `--accent-2` (live), `--success`, `--warn`, `--danger`. 6px, pulse only for live. |
| Badge | glass chip | Height 22px, `--fs-2xs`, uppercase optional, 0.06em tracking. |
| Count | numeric chip | Tabular numbers, min width 20px, centered. |
| Tag | removable chip | Close icon appears on hover, keyboard focusable, `aria-label="Remove tag"`. |
| Segment | pill group | One active segment, `aria-pressed`, sliding indicator. |
| Plan | accent chip | `--accent-soft` fill, accent text, used in pricing and headers. |

```tsx
type Tone = "neutral" | "accent" | "live" | "success" | "warn" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-[var(--glass)] text-[var(--fg-muted)] border-[var(--hair)]",
  accent: "bg-[var(--accent-soft)] text-[var(--accent)] border-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
  live: "bg-[color-mix(in_srgb,var(--accent-2)_14%,transparent)] text-[var(--accent-2)] border-[color-mix(in_srgb,var(--accent-2)_30%,transparent)]",
  success: "bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]",
  warn: "bg-[color-mix(in_srgb,var(--warn)_14%,transparent)] text-[var(--warn)] border-[color-mix(in_srgb,var(--warn)_30%,transparent)]",
  danger: "bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[var(--danger)] border-[color-mix(in_srgb,var(--danger)_30%,transparent)]",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={cn(
      "inline-flex h-[22px] items-center gap-1.5 rounded-[var(--radius-full)] border",
      "px-2.5 text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em]",
      tones[tone],
    )}>
      {children}
    </span>
  );
}
```

Rules: never more than two chips in a row; never put a chip inside a button label; a live dot
pulses at 2.4s with a 12 percent opacity halo, and stops when the tab is hidden.

### 3.4 Form controls <a id="s-3-4"></a>

**Input**

- Height 40px (md), 32px (sm), 48px (lg). Radius `--radius-sm`.
- Fill `--glass-dim`, hairline, text `--fg`, placeholder `--fg-subtle`.
- Focus: border becomes `--accent`, plus a 3px `--accent-soft` ring, no outline removal.
- Error: border `--danger`, helper text in `--danger`, `aria-invalid="true"`.
- Left icon inside padding-inline-start 40px; right slot for unit, clear button or reveal toggle.
- Character counters appear only when a limit exists and switch to `--warn` at 90 percent.

```tsx
export function Input({ label, hint, error, icon, right, id, ...props }: InputProps) {
  const descId = `${id}-desc`;
  return (
    <div className="grid gap-2">
      {label && (
        <label htmlFor={id} className="text-[var(--fs-xs)] font-medium text-[var(--fg-muted)]">
          {label}
        </label>
      )}
      <div className={cn(
        "group relative flex items-center rounded-[var(--radius-sm)] border bg-[var(--glass-dim)]",
        "transition-colors duration-[140ms] focus-within:border-[var(--accent)]",
        "focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
        error ? "border-[var(--danger)]" : "border-[var(--hair)] hover:border-[var(--hair-strong)]",
      )}>
        {icon && <span className="pl-3 text-[var(--fg-subtle)]">{icon}</span>}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error || hint ? descId : undefined}
          className="h-10 w-full bg-transparent px-3 text-[var(--fs-sm)] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
          {...props}
        />
        {right && <span className="pr-2">{right}</span>}
      </div>
      {(error || hint) && (
        <p id={descId} className={cn("text-[var(--fs-xs)]", error ? "text-[var(--danger)]" : "text-[var(--fg-subtle)]")}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
```

**Control inventory**

| Control | Spec |
|---|---|
| Textarea | min 3 rows, auto-grow to 12, `resize: none`, counter bottom-right |
| Select | Radix Select; trigger identical to Input; popup glass, `--z-dropdown`, 8px offset, checkmark on the right |
| Combobox | Search field on top, virtualized list above 50 items, "no results" row with a create action |
| Checkbox | 18px box, `--radius-xs`, accent fill with a 1.5px white check, indeterminate dash |
| Radio | 18px circle, 8px inner dot, card radios for plan selection (whole tile is the target) |
| Switch | 36x20 track, 16px thumb, 160ms slide, accent when on, `role="switch"` |
| Slider | 4px track, 16px thumb with hairline, value bubble on drag, `aria-valuetext` formatted |
| OTP | Six 44px cells, auto-advance, paste support, shake on invalid |
| File drop | Dashed hairline zone, 96px tall, hover shows accent border and aurora glow, list of files with progress |
| Date | See Section 3.22 |
| Currency / number | Right aligned, tabular numbers, thousands separator by locale, optional stepper buttons |
| Phone / mask | Format while typing, never block paste |

**Form layout patterns**

- Single column always for text inputs, maximum 480px wide. Two columns only for short paired
  fields (city and state, CVV and expiry).
- Labels above fields, never inside as the only label. Placeholders show an example, not the label.
- Validation timing: on blur first, then on change once the field has been touched. Never on mount.
- Submit button sits left-aligned with the form, or right-aligned in a card footer; the cancel
  action is always ghost.
- Errors summarize at the top when a submit fails and there are three or more errors; the summary
  links to each field with `href="#field-id"`.
- Loading state: button enters loading, fields stay interactive but dimmed to 70 percent.

### 3.5 Data display: tables, lists, key-value, stats <a id="s-3-5"></a>

**Table**

- Header row: `--fs-xs`, uppercase optional, `--fg-subtle`, sticky at `--z-sticky` with
  `background: color-mix(in srgb, var(--bg-soft) 82%, transparent)` and backdrop blur.
- Row height 56px comfortable, 40px compact. Divider `--hair-soft`, inset 16px.
- Hover row: `--glass-dim` fill across the row with the left 2px accent indicator optional.
- Selected row: `--glass-strong` plus a 2px accent bar on the left edge.
- Numeric columns: right aligned, tabular numbers, delta chips for changes.
- Row actions appear on hover, but remain permanently visible on touch and on focus-within.
- Empty state replaces the body, never an empty header. Loading uses 5 skeleton rows.
- Sorting: click header, three states (asc, desc, none), arrow 12px beside the label.
- Selection: checkbox column 44px wide, header checkbox is tri-state, sticky bulk bar appears
  from the bottom with count and actions.
- Column pinning and horizontal scroll: pin first column, fade mask 24px on the scroll edge.

**Lists**

| Type | Spec |
|---|---|
| Definition list | Term in `--fg-muted`, value in `--fg`, 2-column grid below 768px collapses to stacked |
| Activity list | Avatar or icon tile, title, meta line, right-aligned timestamp, hairline between items |
| Task list | Checkbox, label, optional assignee avatar, completed items at 50 percent opacity |
| File list | Icon by MIME, name, size, progress, remove action |
| Feed | Glass item blocks with 12px gap, no dividers, timestamps relative and absolute on hover |

**Key-value and stats**

```tsx
export function Stat({ label, value, delta, hint }: StatProps) {
  return (
    <div className="vitral p-6">
      <p className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{label}</p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-[var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tabular-nums text-[var(--fg)]">
          {value}
        </span>
        {delta !== undefined && (
          <span className={cn("text-[var(--fs-xs)] tabular-nums", delta >= 0 ? "text-[var(--accent-2)]" : "text-[var(--danger)]")}>
            {delta >= 0 ? "+" : ""}{delta}%
          </span>
        )}
      </div>
      {hint && <p className="mt-2 text-[var(--fs-xs)] text-[var(--fg-subtle)]">{hint}</p>}
    </div>
  );
}
```

Stat tiles always show a comparison context: previous period, target, or benchmark. A number
without context is decoration.

### 3.6 Navigation: navbar, menu, sidebar, tabs, command palette <a id="s-3-6"></a>

**Navbar**

- Height `--nav-h`, container aligned, 3 groups: brand left, links center or right, actions right.
- Resting state: transparent, no border. After 24px of scroll: glass, blur 18px, bottom hairline,
  shadow 1, height shrinking by 8px. Transition 200ms.
- Active link: `--fg` text plus a 2px accent underline that slides between items (layout animation).
- Mobile: hamburger becomes sheet from the top, links stacked at 44px height, actions pinned bottom.
- Command palette hint chip (`⌘K`) visible on desktop only, hidden below 1024px.

```tsx
"use client";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-[240ms] ease-[var(--ease-out)]",
        scrolled
          ? "border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-[var(--blur)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className={cn(
        "mx-auto flex max-w-[var(--container)] items-center justify-between px-[var(--gutter)]",
        "transition-[height] duration-[240ms]",
        scrolled ? "h-14" : "h-[var(--nav-h)]",
      )}>
        {/* brand, nav links, actions */}
      </div>
    </header>
  );
}
```

**Sidebar (app shell)**

- 264px expanded, 64px rail collapsed, remembered in `localStorage` with a `data-` attribute on root.
- Sections separated by overline labels; active item gets `--glass-strong`, accent icon and a 2px
  left accent bar; hover shows a 400ms-delayed tooltip when collapsed.
- Below 1024px the sidebar becomes an off-canvas sheet with a scrim, closing on route change.
- Keyboard: `[` toggles the rail, `g` then `d` jumps to dashboard (see Section 4.16 for the map).

**Tabs**

- Two styles: `underline` (content sections) and `segmented` (view switching, glass pill group).
- Indicator animates with `layoutId` in Framer Motion, 240ms `--ease-out`.
- Arrow keys move focus, `Home`/`End` jump, inactive panels stay mounted when state matters,
  otherwise unmount to save memory.
- Never more than 6 tabs; beyond that use a select.

**Breadcrumbs**

- `--fs-xs`, separators are chevrons at `--fg-subtle`, current page in `--fg` and not a link,
  collapsed with an ellipsis menu beyond four levels.

**Pagination**

- Numbered buttons 32px, glass chips, current page accent; prev and next with icons and labels
  on desktop, icons only on mobile; page size selector to the right.

**Command palette**

- Trigger: `Cmd/Ctrl+K`, plus a search affordance in the navbar on mobile.
- Modal at `--z-modal`, width 640px, top offset 15vh, glass with `--blur-lg`, hairline, shadow 3.
- Input 56px tall with a search icon, no border, bottom hairline separating it from results.
- Results grouped by scope with overline group labels, 44px rows, icon, label, optional shortcut chip.
- Keyboard: arrows move, enter runs, `Tab` cycles scope, `Esc` closes; fuzzy match with score
  highlighting on matched substrings.
- Footer bar with hints (`↑↓ navigate`, `↵ select`, `esc close`) in `--fs-2xs`.
- Recent items appear when the query is empty; empty query plus no recents shows the top 5 actions.

### 3.7 Hero <a id="s-3-7"></a>

The hero has one job: state the value and produce a click. Structure:

1. Optional announcement pill (glass, 32px, with an arrow icon).
2. Overline (optional), then H1 at `--fs-display` with gradient text, max 3 lines, balance wrap.
3. Lead paragraph, maximum 46 characters per line, `--fg-muted`, 2 lines maximum.
4. Action row: one primary, one ghost or link. Optional "no credit card" micro-copy below.
5. Trust row: logo cloud at 40 percent opacity or a rating line.
6. Visual anchor: glass panel with a product screenshot, a bento preview, or an inline chat scene
   (Section 4.17 for the chat hero variant).

Hero rules:

- Total hero height between 78vh and 100vh minus navbar, never more, never fully filling on 4K.
- Entrance animation runs once, staggered: pill, title, lead, actions, visual, each 80ms apart.
- The visual anchor reveals with `scale(0.97) → 1` plus `translateY(24px) → 0` over 760ms.
- Parallax on the visual is 0.06 to 0.12 of scroll, never more; text stays fixed.
- Aurora blobs drift at 20 to 30 second cycles, disabled under reduced motion.
- Never center-align paragraphs longer than two lines.

### 3.8 Bento grid <a id="s-3-8"></a>

Purpose: show five to seven capabilities at once without a wall of cards.

**Structure**

- 6-column grid on desktop, 3 on tablet, 1 on mobile, gap 16 to 20px.
- Cells: `2x1` small, `2x2` medium, `4x2` wide, `6x2` banner. Every bento has exactly one
  hero cell, two to three medium cells and the rest small.
- Row height is uniform (`minmax(180px, auto)`) so the grid reads as a mosaic, not a masonry.
- Media fills the cell with `object-fit: cover`; interactive cells get specular tracking.
- Each cell: icon tile, title (`--fs-h4`), one line of copy, optional inline visual or metric.
- Cells reveal with a stagger of 60ms ordered by grid position (left to right, top to bottom).
- On mobile the hero cell comes first, then the rest in priority order.

```tsx
const cells = [
  { span: "lg:col-span-4 lg:row-span-2", title: "Realtime sync", copy: "…", visual: <SyncOrbit /> },
  { span: "lg:col-span-2", title: "Audit log", copy: "…" },
  { span: "lg:col-span-2", title: "SSO", copy: "…" },
  { span: "lg:col-span-2", title: "Webhooks", copy: "…" },
  { span: "lg:col-span-2", title: "RBAC", copy: "…" },
];
```

### 3.9 Spotlight and pointer-reactive surfaces <a id="s-3-9"></a>

Three levels of pointer reaction, from cheap to expensive:

| Level | Effect | Cost | Where |
|---|---|---|---|
| 1 | Border highlight toward the pointer | one CSS variable | Cards in grids |
| 2 | Radial specular following the pointer | one listener per card | Feature cards, pricing |
| 3 | Magnetic tilt (max 6 degrees) with shadow shift | transforms on move, throttled with rAF | Hero visual, single featured card |

Rules: never combine tilt with specular sweep on the same element; disable all three on coarse
pointers and under reduced motion; throttle with `requestAnimationFrame`; cap listeners to
visible cards using an `IntersectionObserver`.

### 3.10 Marquee, logo cloud and testimonials <a id="s-3-10"></a>

**Marquee**: two duplicated tracks, 40s linear infinite, mask-image fade 96px on both sides,
pause on hover and on focus within, `aria-hidden` on the duplicate track, disabled under
reduced motion (falls back to a static wrapped row).

**Logo cloud**: single-color logos at 55 percent opacity, 28px optical height, 48px gaps,
aligned on the optical baseline, not the box. Wrapped grid of five columns on mobile.

**Testimonials**: three archetypes.

1. Quote card: 32px quote mark, 3-line quote, avatar, name, role, optional company logo.
2. Wall: two columns of stacked cards with a vertical aurora gradient behind, subtle parallax
   offset between columns (0.04 factor) for depth.
3. Feature testimonial: 50/50 split, portrait image on glass plate left, quote right, logo row under.

Always attribute with a real-looking name, role and company. Never "John Doe, CEO".

---

### 3.11 Accordion, FAQ and tabbed showcases <a id="s-3-11"></a>

**Accordion**

- Row: 64px collapsed, title left (`--fs-h4` on mobile, `--fs-body` on desktop), chevron right
  rotating 180 degrees in 200ms, hairline between rows, no outer border when inside a panel.
- Open: answer fades and slides 8px within 240ms; height animates with `height: auto` via
  `grid-template-rows: 0fr → 1fr` (no JS measurement needed).
- Only one open at a time in FAQs; multi-open in settings and filters.
- Keyboard: `Enter` and `Space` toggle, `ArrowUp`/`ArrowDown` move between headers, `Home`/`End` jump.
- Deep-linkable: opening sets `#faq-3` in the URL and opening from a hash scrolls to the row.

```tsx
<div className={cn("grid transition-[grid-template-rows] duration-[240ms] ease-[var(--ease-out)]",
  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
  <div className="overflow-hidden">
    <div className="pb-6 pr-10 text-[var(--fs-sm)] text-[var(--fg-muted)]">{answer}</div>
  </div>
</div>
```

**FAQ layout**: two columns on desktop, question list left (40 percent) and answers right
(60 percent) is the premium variant; the single-column accordion is the safe default. Limit to
8 questions, add a "still have questions" link to contact.

**Tabbed showcase**: for product capability sections. Left rail with four tabs (icon, title,
one-line description, active gets glass and accent bar), right side swaps a preview panel with a
240ms crossfade plus 12px slide. Preview always has a fixed aspect ratio to prevent reflow.

### 3.12 Pricing <a id="s-3-12"></a>

**Structure**

1. Section header: overline, title, lead, billing toggle.
2. Billing toggle: segmented control (Monthly / Annual), annual shows a "Save 20 percent" chip,
   numbers animate in place when toggled (no layout jump, fixed width reserve).
3. Plan grid: 3 plans typical (Starter, Pro, Scale), the recommended plan is tinted, slightly
   raised (scale 1.02 desktop only), has an accent badge and a stronger specular.
4. Feature list per plan: check icon in accent, muted text for absent features, tooltip for
   ambiguous items, group separators with overline labels when lists exceed 8 rows.
5. Plan footer: price, period, CTA (primary on the recommended plan, secondary on others),
   micro-copy under the button.
6. Enterprise strip below: glass banner, "Talk to sales", two bullet assurances.
7. Comparison table: full-width, sticky header row, sticky first column, check and dash cells,
   collapsible "show all features" when beyond 12 rows.
8. FAQ block: 4 to 6 billing questions.

**Copy rules**

- Price format: `$29` large, `/month` in `--fg-subtle` at 60 percent size, billed-annually line below.
- Discounts: struck-through original price, then the new value, then a chip with the percentage.
- Never say "Contact us" without giving a reason; always "Talk to sales" plus the promise.
- Feature rows use outcome language ("Unlimited projects") not implementation language ("Postgres 16").

### 3.13 Metrics, counters and KPI tiles <a id="s-3-13"></a>

- Counters animate from 0 to the target over 1.2s with an ease-out curve when scrolled into view,
  once; format with `Intl.NumberFormat`; preserve the suffix (`k`, `%`, `ms`).
- KPI tile: label, value, delta chip, sparkline (32px tall, 24 points), comparison caption.
- Delta chip: arrow plus value, `--accent-2` for positive, `--danger` for negative; a positive
  delta in a "lower is better" metric must be inverted.
- Never animate more than four counters at once; group them in one viewport.
- Money and counts use tabular numbers so digits do not shift while animating.

### 3.14 Timeline, steps and roadmap <a id="s-3-14"></a>

| Variant | Structure | Use |
|---|---|---|
| Vertical timeline | 1px rail at 16px, dots 10px with halo for the active item, alternating content on desktop | Company history, changelog |
| Process steps | 3 to 4 numbered cards, connector arrows or a gradient line, reveal staggered | Onboarding explainer |
| Roadmap | Three columns: Now, Next, Later; glass cards with status chips; items link to detail | Public roadmap |
| Progress path | Horizontal rail with checkpoints and a filled progress line to the current step | Onboarding, wizard |

Rules: the rail uses `--hair`, the completed segment uses `--grad-live`; the active dot pulses
once on entry; never more than seven items in a vertical timeline without collapsing the rest.

### 3.15 Footer <a id="s-3-15"></a>

- Structure: brand column (logo, one-line description, social icons), three to four link
  columns, then a bottom bar with legal links, locale selector and status pill.
- Top edge: hairline plus an aurora glow rising from the bottom of the page (a 320px radial
  gradient at 12 percent opacity).
- Oversized wordmark variant: brand name at `clamp(4rem, 14vw, 12rem)` with gradient text and
  8 percent opacity, clipped at the bottom. This is optional and reserved for marketing pages.
- Status pill: dot with `--accent-2` (operational), `--warn` (degraded), `--danger` (outage),
  linking to the status page.
- Newsletter mini-form in the footer: input plus button inline, 320px maximum width, success
  replaces the form with a check plus confirmation line.
- Columns collapse into accordions below 768px; the legal bar stacks with 12px gaps.

### 3.16 Overlays: modal, drawer, sheet, confirm <a id="s-3-16"></a>

| Component | Entry | Sizes | Notes |
|---|---|---|---|
| Dialog | fade plus scale from 0.97 | 480 / 640 / 800px | Centered, glass, `--blur-lg`, shadow 3 |
| Drawer (right) | slide from right | 400 / 480px | Forms, filters, details panel |
| Sheet (bottom) | slide up | auto | Mobile menus, actions, filters |
| Lightbox | fade plus scale from 0.98 | viewport | Section 3.23 |
| Confirm | fade plus scale | 420px | Irreversible actions, danger button last |

Rules:

- Scrim: `rgba(3,4,9,.6)` plus `backdrop-blur(4px)`, `--z-overlay`.
- Focus trap on open, focus restored to the trigger on close, `Esc` closes (except when a nested
  confirm is open), background scroll locked with a body class that preserves scrollbar width.
- Exit animation 120 to 180ms, then unmount; never leave the element in the DOM at opacity 0.
- Header 64px with title and close button, body scrolls with `overscroll-behavior: contain`,
  footer is sticky with a top hairline when the body scrolls.
- Never nest a modal inside a modal; use a confirm dialog inside the same dialog region or a
  stacked panel with a back action.

### 3.17 Toasts and notifications <a id="s-3-17"></a>

- Position: bottom-right on desktop, bottom-center full width minus 16px gutters on mobile.
- Stack: up to 3 visible, the rest collapse with "+2 more"; newest on top.
- Anatomy: 12px status icon with tinted tile, title, optional one-line description, close,
  optional action, optional progress bar for async work.
- Durations: 4s default, 8s with an action, sticky for errors that require a decision.
- Motion: enter from `y: 8px` with scale 0.98 over 180ms, exit fades and slides down over 150ms;
  hovering pauses the auto-dismiss timer.
- Accessibility: `role="status"` for success and info, `role="alert"` for errors, and a live
  region narrative summary.
- Never use a toast for information that must persist or for errors that block the flow.
- Promise pattern: pending toast with a spinner, then success with a link or an error with retry.

### 3.18 Tooltip, popover and dropdown menu <a id="s-3-18"></a>

- Tooltip: 400ms delay, 12ms fade plus 4px offset, max width 240px, `--fs-xs`, glass background
  with `--blur-sm`, arrow 6px. Never put interactive content inside a tooltip. Never a tooltip on
  a disabled element (wrap in a span).
- Popover: 8px offset, glass, `--z-dropdown`, shadow 2, arrow optional, dismiss on outside click
  and `Esc`; animate from the trigger origin using `transform-origin`.
- Dropdown menu: 8px padding, rows 36px, icons 16px, destructive item in `--danger` at the bottom
  separated by a hairline, checkbox and radio item types, submenus open after 120ms hover intent
  with a 8px lateral offset, shortcut hints right-aligned in `--fs-2xs`.
- All three share one positioning primitive (Radix or Floating UI) so collision handling is
  consistent.

### 3.19 Avatars, user menu and presence <a id="s-3-19"></a>

- Sizes: 20 / 24 / 32 / 40 / 56 / 80px. Radius full for people, `--radius-sm` for teams and orgs.
- Stacked group: overlap by 30 percent, 2px ring in `--bg`, "+4" chip at the end with a tooltip
  listing members.
- Presence: 8px dot at the bottom-right with a 2px `--bg` ring; states are online (`--accent-2`),
  away (`--warn`), busy (`--danger`), offline (`--fg-subtle`), with `aria-label` text.
- User menu: 280px wide, avatar plus name and email header with a hairline, then groups: profile,
  settings, theme, then sign out in danger. Theme toggle is a three-way segmented control
  (system, light, dark) with the system option as default.
- Avatar generation: hash the identifier to a hue, build a two-stop gradient, overlay initials in
  white at 90 percent opacity.

### 3.20 Skeleton, loading, empty and error states <a id="s-3-20"></a>

**Skeletons**

- Shape mirrors the final layout exactly: same heights, same radii, same gaps.
- Base `--glass-dim`, shimmer sweep with a 1.6s linear gradient translating from -100 to 100
  percent, disabled under reduced motion (static fill at 60 percent opacity).
- Never show more than 8 skeleton rows; beyond that show a spinner with a progress label.
- Skeletons appear only after 200ms of waiting; before that show nothing to avoid flashing.

**Loading**

| Duration | Treatment |
|---|---|
| under 200ms | nothing |
| 200ms to 1s | inline spinner or skeleton |
| 1s to 4s | skeleton plus a status line ("Loading workspaces") |
| over 4s | progress with steps, cancel action, reassurance copy |
| over 10s | offer email notification and a link to the status page |

**Empty states**

Anatomy: 64px glass tile with an icon, title (`--fs-h4`), one line of explanation, primary action,
optional secondary link, and optional "learn more" text. Never an illustration of a sad character.
Eight named empty states to implement: no data yet, no results for a search, no access, filtered
to zero, all caught up, first-run onboarding, connection lost, and error.

**Error states**

- Inline field errors: under the field, `--danger`, with the fix, not just the problem.
- Block errors: glass panel, danger-tinted icon tile, plain-language title, one-sentence
  explanation, retry button, and a copyable error id in `--fs-2xs` mono.
- 4xx versus 5xx: 4xx explains the user action, 5xx apologizes and offers status page plus retry.
- Never expose stack traces, raw server messages or SQL in the UI.
- Always provide a next step: retry, go back, contact support, or a degraded mode.

### 3.21 Charts and data visualization <a id="s-3-21"></a>

**Chart language**

- Library: Recharts for standard charts, visx for bespoke work, Tremor for quick panels.
- Grid: horizontal lines only, `--hair-soft`, 1px, no vertical grid, no chart border, no dashboards
  filled with boxes.
- Axis: labels `--fs-2xs`, `--fg-subtle`, 4 ticks maximum on X, 4 on Y, tick line hidden.
- Series palette, in order: `--accent`, `--accent-2`, `--warn`, `--danger`, `--fg-muted`.
  Five series maximum; beyond that use small multiples. Purple is deliberately absent from the
  default series order; only introduce `--accent-3` when a sixth distinct hue is unavoidable.
- Area and bar fills use a vertical gradient from 22 percent to 0 percent opacity.
- Line stroke width 2, dot hidden until hover, active dot 8px with a white ring.
- Tooltip: glass card, 8px padding, series name with a color dot and value with tabular numbers,
  crosshair line 1px `--hair-strong`.
- Reference lines for targets, dashed 4-4, with a label chip at the right end.
- Legend: top-right, 12px, toggling a series dims it to 25 percent.

**Behavior**

- Entry animation: `clip-path` or path draw over 600ms, staggered by 60ms per series, once.
- On resize, re-render without animation.
- Hovering a legend item highlights its series and dims the others.
- Empty data: axis and grid only, with a centered glass tooltip "No data for this range".
- Loading: a 40 percent opacity ghost of the previous chart plus a shimmer bar at the top.

**Chart types and when to use them**

| Question | Chart |
|---|---|
| How does it change over time? | Line, area |
| How does it compare across categories? | Horizontal bar, sorted descending |
| What is the composition? | Stacked bar, donut only for two or three slices |
| What is the distribution? | Histogram, density plot, box plot |
| What is the correlation? | Scatter with a trend line |
| What is the funnel? | Horizontal funnel bars with conversion percentages |
| How is it trending against a goal? | Bullet chart with a target marker |
| What is the activity pattern? | Heatmap grid by day and hour |

Rules: never a 3D chart, never a pie chart above four slices, never dual axes without explicit
labels, always sort bars by value unless the category has a natural order.

### 3.22 Calendar, date picker and scheduling <a id="s-3-22"></a>

- Trigger: Input-like button with a calendar icon and the formatted value.
- Popover: glass, 320px wide, month header with chevrons, weekday row in `--fs-2xs`,
  7x6 grid of 36px cells, today outlined, selected filled accent, range endpoints filled with the
  middle range at `--accent-soft`.
- Presets column on the left (Today, Yesterday, Last 7 days, Last 30 days, This month, Custom)
  for range pickers in analytics contexts.
- Keyboard: arrows move by day, `PageUp`/`PageDown` by month, `Shift` plus arrows extends a range,
  `Enter` commits, `Esc` reverts.
- Time selection: two selects (hour, minute) with 15-minute steps by default, or a scrollable list.
- Scheduling view: week grid, 48px per hour, current-time line in `--danger` with a dot,
  events as glass blocks with 2px accent left border, overlapping events split the column with a
  4px gap, drag to move with a 15-minute snap and a ghost outline during drag.

### 3.23 File upload, media and lightbox <a id="s-3-23"></a>

**Dropzone**: dashed 1px `--hair` border, `--radius-lg`, 160px tall, icon plus "Drop files or
browse", drag-over state raises the border to accent and adds an aurora glow inside; accepts
directories; validates type and size with an inline error list; uploads show a per-file progress
row with cancel and retry.

**Media grid**: 1 / 2 / 3 / 4 columns by breakpoint, 1px gaps, `--radius` per tile, every tile a
button; hover shows a 12 percent dark veil, a selection checkbox and a filename chip; focus ring
inside the tile.

**Lightbox**: full-screen scrim at 92 percent, image centered with `object-contain`, arrows with
60px hit areas, counter (`3 / 12`) centered bottom, caption bottom-left, actions top-right
(download, share, open original, close); keyboard `←`, `→`, `Esc`, `+`, `-`, `f`;
swipe left and right on touch with a 60px threshold; preloads the next and previous images.

**Video**: glass player chrome, center play button with a 64px glass circle, controls appear on
hover and hide after 2.5s of inactivity, progress bar 4px accent with a buffered track, poster
image behind a veil gradient, captions toggle in the chrome.

### 3.24 Code blocks, terminal and diff viewer <a id="s-3-24"></a>

**Code block**

- Container: `--bg-elevated` at 80 percent over glass, `--radius`, hairline, 1px inset highlight.
- Header bar 40px: language chip left, filename center (mono, `--fs-xs`), actions right
  (copy, wrap toggle, open in playground). Header separated by a hairline.
- Body: `--font-mono` 13px, line height 1.7, padding 16 to 20px, horizontal scroll with a fade mask,
  line numbers optional and `--fg-subtle`, highlighted lines get a 2px accent left bar plus
  `--glass-dim` background.
- Syntax theme: dark, desaturated. Keywords `--accent`, strings `--accent-2`, numbers `--warn`,
  comments `--fg-subtle` italic, functions `--fg`, punctuation `--fg-muted`.
- Copy: 24px icon button, on click swaps to a check for 1.6s and fires a subtle success haptic line
  (no toast for small copies; toast only for copy of an entire file).
- Long blocks: collapse beyond 18 lines with a gradient veil and an "Expand" button showing the
  remaining line count.

**Terminal**: black at 90 percent, glass frame, 12px radius, traffic-light dots at 14 percent
saturation, monospace 13px, prompt symbol in accent, output in `--fg-muted`, typing animation
optional with 24ms per character and disabled under reduced motion, blinking cursor 1s step.

**Diff viewer**: two columns or unified; added lines get a `--success` at 10 percent background
with a 2px left border, removed lines `--danger` at 10 percent, unchanged context at 60 percent
opacity, line numbers in both gutters, collapsible hunks, a summary bar with `+12 −4` counts.

### 3.25 Feature sections, comparison and integrations <a id="s-3-25"></a>

**Feature grid**: three columns, icon tile, title, two lines of copy, optional "learn more" link.
The seventh item spans the full width as a highlight card with a visual.

**Alternating feature rows**: text left and visual right, then mirrored, 96px vertical gaps,
a 2px accent vertical connector between rows on desktop, each row revealing on scroll with a
40ms stagger between text and visual.

**Comparison table**: Nova Vitral versus alternatives; columns: feature, Nova Vitral (accent
column with a tinted glass background), competitor A, competitor B; check, dash and partial
(three-quarter) icons; honest rows including where the product is weaker.

**Integration grid**: 4 / 6 columns of 64px glass tiles with monochrome logos, hover raises to
full opacity and shows a tooltip with the integration name and status; a search field appears
above when there are more than 24 integrations; categories use segmented tabs.

### 3.26 Call to action, newsletter and waitlist <a id="s-3-26"></a>

**CTA band**: full-width glass panel, `--radius-xl`, aurora glow inside, centered content,
max 3 lines of copy, primary plus secondary action, optional trust micro-copy under buttons.
Variant: split CTA with a metric on the right (for example "12,400 teams shipped this week").

**Newsletter**: inline input plus button in one glass shell (input borderless inside the shell),
320 to 420px wide, success swaps to a check with a confirmation line, validation inline, honeypot
field plus timing check against bots, and a privacy line in `--fs-2xs`.

**Waitlist**: email plus optional role select, position counter that animates in after submit,
"invite to skip the line" share row with a copyable link and social buttons, plus a
three-item "what you get" list.

### 3.27 Scroll utilities <a id="s-3-27"></a>

| Utility | Behavior |
|---|---|
| Scroll progress bar | 2px accent line at the top, `transform: scaleX()` driven by scroll ratio, no re-render (rAF plus CSS variable) |
| Back to top | Appears after 1.5 viewports, glass circle 40px, smooth scroll, respects reduced motion (instant) |
| Sticky section header | Section title sticks under the navbar with a growing hairline and shrinking type |
| Scroll spy | Nav link underlines follow the active section using IntersectionObserver at 30 percent |
| Scroll shadow | Panels gain a top shadow when their content is scrolled |
| Snap sections | `scroll-snap-type: y proximity` only for full-screen stories, never for normal pages |
| Hash reveal | A hash link opens the target accordion or tab and flashes a 1s accent ring |

### 3.28 Onboarding, stepper and product tour <a id="s-3-28"></a>

- Stepper: horizontal on desktop, vertical on mobile, states are done (accent check), current
  (accent ring, pulsing once), upcoming (`--fg-subtle`), with a connector line that fills as the
  user advances.
- Checklist card: 5 items maximum, progress ring at the top, each item expands to the action,
  completed items collapse to 60 percent opacity with a strike, celebration on 100 percent
  (confetti is forbidden; use a single accent glow pulse).
- Tour: coach marks anchored to elements, 320px glass card, dimmed backdrop with a spotlight cutout
  (achieved with a large box-shadow spread), 3 to 5 steps maximum, dismissible, remembered per user,
  never blocking interaction with the target element.
- Empty-first-run: instead of an empty dashboard, show a guided first action with sample data
  clearly labeled "Example".

### 3.29 Settings and preferences UI <a id="s-3-29"></a>

- Layout: 240px section rail left (Profile, Notifications, Billing, Team, Security, API keys,
  Danger zone), content 720px maximum right, sections separated by hairlines with 40px padding.
- Every toggle saves immediately with an optimistic UI and a 1.6s "Saved" chip in the section
  header; forms with text fields use an explicit Save button that enables only when dirty.
- Destructive section: `--danger` hairline container, explanation, action as an outline danger
  button, requiring typing the resource name for irreversible operations.
- API keys: masked value (`sk_live_••••4f2a`), reveal with a 10s auto-hide, copy button, created
  and last-used columns, revoke in a dropdown with a confirm dialog.
- Sessions table: device, location, last active, "revoke" action, current session marked with a chip.
- Never place two identical-looking save buttons in one viewport; use per-section saving for
  toggles and one sticky save bar for multi-field forms.

### 3.30 Search results and filters <a id="s-3-30"></a>

- Search input: 480px maximum, `Cmd/Ctrl+K` hint, debounce 250ms, results grouped by type with
  counts, query terms highlighted in the result text with `--accent` at 20 percent background.
- Filter bar: chips for active filters, a "+ Filter" dropdown, a clear-all link, and a result count
  line in `--fs-xs` ("24 of 312 workspaces").
- Filter panel: 280px left rail on desktop, bottom sheet on mobile, each group collapsible with
  counts, ranges as dual sliders, dates as preset chips plus custom range.
- Applied filters persist in the URL (`?status=active&sort=-updated`) so the view is shareable.
- Zero results: show the applied filters as removable chips, a "clear all" action and three
  suggestions to relax the query.
- Sorting: dropdown with 5 options maximum, default sort stated explicitly.

---

### 3.31 Copy, empty and loading micro-patterns (quality details) <a id="s-3-31"></a>

These micro-patterns are what separate a professional page from a template. Implement them
everywhere they apply.

| Pattern | Spec |
|---|---|
| Copy button feedback | Icon swaps to a check 1.6s, plus an optional 2px accent underline sweep |
| Relative time | "2 min ago" under 1h, "14:32" today, "Mar 4" this year, then full date; `title` holds the absolute value |
| Number formatting | `Intl.NumberFormat` with the user locale; compact notation above 10,000 (12.4k) |
| Truncation | Single line with ellipsis and `title`; middle truncation for file paths and keys |
| Keyboard hint chips | 20px, `--radius-xs`, mono 11px, `--glass-strong`, shown only on desktop and only when a keyboard exists |
| Focus ring sweep | Tab through a page must show a visible ring on every interactive element, including cards and rows |
| Long content guard | `min-width: 0` plus `overflow-wrap: anywhere` on flex and grid children |
| Scroll lock | Body scroll locked with a compensating padding for the scrollbar width |
| Optimistic updates | Apply immediately, revert with a toast plus an undo action within 6s |
| Undo affordance | Destructive actions are reversible for 6s instead of confirmed when the cost is low |
| Percentage bars | 4px tall, track `--glass-dim`, fill gradient `--grad-live`, numeric label always present |
| Keyboard shortcuts | Single letters in list views (j/k to move, x to select, e to edit), documented on `?` |
| Print view | Remove aurora, glass becomes white with hairlines, links show their URL |

### 3.32 Component index (quick lookup) <a id="s-3-32"></a>

| Component | Section | Component | Section |
|---|---|---|---|
| Accordion | 3.11 | Media grid | 3.23 |
| Avatar | 3.19 | Modal | 3.16 |
| Badge | 3.3 | Navbar | 3.6 |
| Bento grid | 3.8 | Newsletter | 3.26 |
| Breadcrumbs | 3.6 | Onboarding tour | 3.28 |
| Button | 3.1 | Pagination | 3.6 |
| Calendar | 3.22 | Popover | 3.18 |
| Card (glass) | 3.2 | Pricing table | 3.12 |
| Chart | 3.21 | Progress bar | 3.27 |
| Code block | 3.24 | Search | 3.30 |
| Combobox | 3.4 | Select | 3.4 |
| Command palette | 3.6 | Settings | 3.29 |
| Comparison table | 3.25 | Sidebar | 3.6 |
| Counter | 3.13 | Skeleton | 3.20 |
| Diff viewer | 3.24 | Slider | 3.4 |
| Dropdown menu | 3.18 | Spotlight card | 3.9 |
| Dropzone | 3.23 | Stat tile | 3.5 |
| Empty state | 3.20 | Stepper | 3.28 |
| Footer | 3.15 | Switch | 3.4 |
| Hero | 3.7 | Table | 3.5 |
| Input | 3.4 | Tabs | 3.6 |
| Lightbox | 3.23 | Terminal | 3.24 |
| Logo cloud | 3.10 | Testimonial | 3.10 |
| Marquee | 3.10 | Timeline | 3.14 |
| Toast | 3.17 | Tooltip | 3.18 |

---

## 4 . Chat Scene <a id="s-4"></a>

The Chat Scene is the flagship interface of Nova Vitral: a conversational AI workspace built from
glass surfaces, restrained motion and precise information hierarchy. It is the most complete
reference in this specification; every other page pattern borrows from it.

> Scope note for agents: this part covers layout, message anatomy, streaming, reasoning, tool
> calls, artifacts, citations, composer, sidebar, feedback and accessibility for chat products.
> Read it in two passes: `4.0` to `4.6` for structure and message rendering, `4.7` to `4.20` for
> interaction, state and polish.

### 4.0 Chat scene blueprint <a id="s-4-0"></a>

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

### 4.1 Principles for AI interfaces <a id="s-4-1"></a>

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

### 4.2 Message list and thread behavior <a id="s-4-2"></a>

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

### 4.3 Message anatomy <a id="s-4-3"></a>

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

### 4.4 Message types (rendering matrix) <a id="s-4-4"></a>

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

### 4.5 Markdown, typography and rich rendering <a id="s-4-5"></a>

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

### 4.6 Streaming, stop, retry and regeneration <a id="s-4-6"></a>

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

### 4.7 Composer (the input surface) <a id="s-4-7"></a>

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

### 4.8 Reasoning and thinking display <a id="s-4-8"></a>

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

### 4.9 Tool calls, function results and approvals <a id="s-4-9"></a>

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

### 4.10 Artifacts and the canvas panel <a id="s-4-10"></a>

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

### 4.11 Citations, sources and retrieval <a id="s-4-11"></a>

- Inline citations render as 12px superscript numbers in `--accent` with a 20 percent tinted
  background; hover shows a preview card with favicon, title, domain and a 2-line snippet.
- The sources row after the message lists up to 6 sources as compact glass cards (32px favicon,
  title, domain, page number when applicable), with "Show all 14" expanding into a scrollable list.
- A retrieval activity line appears before the answer when the model searched: "Searched 4 sources
  in 2.1s" with an expandable list of queries, shown in `--fs-xs` `--fg-subtle`.
- Sources are numbered in citation order, not retrieval order.
- Never fabricate a citation style; if a source lacks a title, show the domain plus the path.
- Files attached by the user appear in the sources row with a file icon and the page range.

### 4.12 Empty state, prompt suggestions and follow-ups <a id="s-4-12"></a>

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

### 4.13 Sidebar, sessions and history <a id="s-4-13"></a>

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

### 4.14 Multi-user presence and collaboration <a id="s-4-14"></a>

- Live cursors in shared threads: 12px colored dot with a 1px white ring plus a name chip, moving
  with a 120ms interpolation; the label fades after 3s of inactivity.
- Presence avatars in the header (max 3 plus a counter), with a hover popover listing collaborators
  and their state.
- Someone typing shows "Ana is typing" 16px above the composer in `--fs-xs` `--fg-subtle`.
- Comment mode: click any message to attach a threaded comment; comment pins are 24px accent chips
  anchored to the message edge; the thread shows a count and a slide-over panel.
- Conflicting edits to the same artifact show a 2px dashed accent border and an explicit
  "Accept theirs / Keep mine / Merge" bar.

### 4.15 Chat settings and model selection <a id="s-4-15"></a>

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

### 4.16 Chat keyboard map and accessibility <a id="s-4-16"></a>

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

### 4.17 Chat hero (marketing variant) <a id="s-4-17"></a>

Landing pages often need a conversation as the hero visual. Rules:

- Show a single completed example exchange, realistic and specific to the product, never "Hello!".
- The visual is a glass panel at `--radius-xl` with a 12px inner frame, a fake but functional
  composer at the bottom that opens the real product on focus, and a 3-row thread above.
- Animate: messages type in sequence on first scroll into view (24ms per character, 400ms between
  messages, once only), then hold. Under reduced motion, render fully typed.
- Never animate a typing loop indefinitely; it reads as a loading bug on repeat visits.
- Optional: a small "Try it live" chip in the panel corner linking to a sandbox.

### 4.18 Feedback, ratings and sharing <a id="s-4-18"></a>

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

### 4.19 Selection toolbar inside the thread <a id="s-4-19"></a>

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

### 4.20 Chat scene anti-patterns <a id="s-4-20"></a>

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

## 5 . Page Blueprints <a id="s-5"></a>

Blueprints are ordered recipes for complete pages: sections in sequence, with the purpose of each,
the components used, and the animation behavior. An agent asked to build "a landing page" should
follow `5.1` exactly, reusing sections from `5.2` when the product needs them.

### 5.1 SaaS landing page (golden path) <a id="s-5-1"></a>

| # | Section | Purpose | Components | Reveal |
|---|---|---|---|---|
| 1 | Navbar | Orientation and primary action | 3.6 | fade in on load |
| 2 | Hero | Promise plus product view | 3.7, 3.9 | staggered load animation, visual anchor scale 0.97 to 1 |
| 3 | Logo cloud | Instant credibility | 3.10 | marquee, mask fade |
| 4 | Problem framing | Name the pain in two lines | 3.2 panels | fade up, stagger 80ms |
| 5 | Feature bento | Show range without depth | 3.8 | cell stagger 60ms by grid position |
| 6 | Alternating features | Depth on the two main capabilities | 3.25 | text then visual, 40ms offset, 24px rise |
| 7 | Metrics band | Quantified proof | 3.13 | counters on view, once |
| 8 | Integrations | Fit into the stack | 3.25 | logos fade with stagger |
| 9 | Testimonials | Emotional proof | 3.10 | wall with 0.04 parallax on columns |
| 10 | Pricing | Commercial decision | 3.12 | cards rise 16px, recommended card 60ms later |
| 11 | FAQ | Remove objections | 3.11 | single-column accordion |
| 12 | Final CTA | Convert | 3.26 | panel scale 0.98 to 1, 420ms |
| 13 | Footer | Navigation and trust | 3.15 | no animation except the aurora glow |

Sequence rules: alternate visual rhythm (dense, airy, dense); never two bento-like sections in a row;
keep the page between 9 and 14 sections; every 4th section must be visually different in structure
(full-bleed, split, centered band) to avoid monotony.

Vertical spacing: 96px between standard sections, 128px before and after the hero, pricing and final
CTA, 64px inside dense feature clusters.

### 5.2 Additional marketing sections <a id="s-5-2"></a>

| Section | Content | Notes |
|---|---|---|
| How it works | 3 numbered steps with a connector line and small visuals | Steps reveal left to right, 200ms apart |
| Product tour | Tabbed interface screenshot switcher | Preview fixed aspect 16:10, crossfade |
| Security and compliance | Badge grid (SOC 2, GDPR, HIPAA) plus a link to the trust page | Monochrome badges, 64px tiles |
| Comparison | Nova Vitral versus alternatives table | Honest rows, accent column |
| Case study band | One metric, one sentence, one logo, link to the story | Full-bleed with a 12 percent aurora |
| Changelog teaser | Last 3 entries with dates | Link to the full changelog |
| Careers strip | Open roles count plus a culture line | Rare, keep to one line |
| Community | Discord and GitHub counts with avatars | Optional |
| Newsletter band | Inline capture | 3.26 |
| Pricing calculator | Sliders or inputs with a live estimate | Numbers animate when inputs change |

### 5.3 Portfolio and personal site <a id="s-5-3"></a>

| # | Section | Notes |
|---|---|---|
| 1 | Navbar | Minimal, 4 links, no CTA |
| 2 | Intro hero | Name in display size, one-line positioning, availability chip, 2 actions (email, resume) |
| 3 | Selected work | 4 to 6 project cards, media, role, year, one outcome metric, links to case studies |
| 4 | Case study preview | Two deep cards with process description and images in a scroll-triggered stack |
| 5 | About | Short bio, portrait on a glass plate, three facts |
| 6 | Experience | Timeline (3.14), company, role, dates, one impact line |
| 7 | Writing | 3 latest posts with reading time |
| 8 | Speaking / press | Compact list |
| 9 | Contact | Email, links, availability, response time |
| 10 | Footer | Minimal with a locale and theme toggle |

Design notes: the portfolio is the one place where larger type, more whitespace and a personally
expressive accent are allowed. Keep it: max 2 accents, one distinct layout moment (a horizontal
scroll gallery or a sticky case study), and real project imagery.

### 5.4 Pricing page <a id="s-5-4"></a>

1. Header: title, lead, billing toggle, trust line ("No credit card required"), optional currency select.
2. Plan grid (3.12) with the recommended plan marked.
3. Value anchors: a row of three reasons with icons under the plans.
4. Feature comparison table with a sticky header and a "show all" expansion.
5. Add-ons: 2 to 3 glass cards (support level, extra seats, usage packs).
6. ROI or savings calculator with a live number and a subtle count animation.
7. Enterprise band with a "Talk to sales" action and two assurances.
8. Billing FAQ (5 to 7 entries) covering invoices, upgrades, proration, refunds and taxes.
9. Final CTA with the plan grid repeated in a compact strip above the footer (optional).

### 5.5 Documentation site <a id="s-5-5"></a>

- Layout: 260px left tree, content max 760px, 220px right table of contents, both sticky and
  independently scrollable with a fade mask at the edges.
- Left tree: sections with 24px rows, active page accent with a 2px bar, collapsible groups that
  remember state, a filter field on top when the tree exceeds 40 pages, and a version selector.
- Content: H1 then a one-line summary, then optional badges (version, stability), then body. Every
  page ends with "Was this helpful?" plus prev and next cards.
- Right TOC: generated from H2 and H3, an active marker that follows scroll (IntersectionObserver),
  and a 2px rail with an animated progress segment.
- Code blocks: copy, wrap toggle, language chip, line highlighting, and a tabbed variant for
  multi-language examples.
- Callouts: four tones (info, tip, warning, danger) rendered as glass panels with a colored 2px
  left rule and a 24px icon tile. Never use more than two callouts per page.
- Search: `Cmd/Ctrl+K` palette with section grouping, keyboard navigation and hit highlighting;
  results open in a preview panel beside the palette on desktop.
- Footer: edit this page on GitHub, last updated date, prev and next navigation.
- Mobile: tree becomes a drawer, TOC becomes a "On this page" collapsible under the title.

### 5.6 Blog, changelog and content pages <a id="s-5-6"></a>

**Blog index**: featured post (large media card), then a 3-column grid; category chips filter
client-side with URL state; 12 posts per page with a "Load more" button (not infinite scroll for
SEO reasons); reading time and date in `--fs-xs`; author chip with avatar.

**Post detail**: title, meta row (author, date, reading time), share actions, optional cover image
with a veil, body at 68ch, TOC on the right under `xl`, code blocks with copy, footnotes, tags,
author bio card, related posts (3), newsletter CTA. Reading progress bar at the top (2px accent).

Typography inside articles: 18px body, 1.75 line height, 24px paragraph spacing, drop cap optional
and only for editorial brands, pull quotes with a 2px accent left rule and 20px type.

**Changelog**: vertical timeline (3.14) with version chips, date, category tags (Added, Changed,
Fixed), and optional media. A filter row for categories and a subscribe action. Entries collapse
beyond 10 with "Show older".

**Legal pages**: 68ch measure, sticky TOC, plain language, "last updated" line, print-friendly,
no aurora (a flat background reads as more serious), and a contact block at the end.

### 5.7 Dashboard and admin <a id="s-5-7"></a>

Layout: sidebar (3.6) plus a 64px top bar with breadcrumb, search, date-range picker, notifications
bell, and an account menu.

Grid: 12 columns, 16px gap, 24px page padding, cards at `--radius-lg`. Standard composition:

| Row | Content |
|---|---|
| KPI row | 4 stat tiles (3.13) with sparklines and deltas |
| Primary chart | 8 columns wide, 320px tall, range selector, legend, export |
| Secondary | 4 columns: top sources list or a donut with two slices max |
| Detail table | Full width, sortable, filterable, with bulk actions and pagination |
| Activity | 4 columns: recent events with avatars and relative time |

Dashboard rules: every card answers one question; each card has a defined empty state; ranges
(today, 7d, 30d, quarter, custom) live in one place and apply to the whole page; a global refresh
button shows the last-updated time; skeletons match card shapes; never animate more than two
charts simultaneously; deep links encode filters in the URL.

Admin specifics: a sticky filter rail, saved views (segmented chips with a "Save view" action),
inline editing with optimistic updates, a drawer for record details instead of a page navigation,
an audit log link in every record, and permission-aware UI that disables rather than hides
destructive controls when the role lacks rights.

### 5.8 Authentication and utility pages <a id="s-5-8"></a>

**Sign in**: split layout. Left: form (360px) centered with brand mark, email and password, a
"Continue with Google or GitHub" pair above a divider, a magic-link option, remember-me, and a
footer line to sign up. Right: an aurora panel with a product visual or a testimonial (hidden under
1024px).

**Sign up**: same shell, fields in order (name, email, password with strength meter, terms checkbox),
a "what happens next" 3-step mini list, and a single primary action.

**Forgot password / reset**: one field, one action, a clear success state with the sanitized email
echoed back, and a resend cooldown timer (60s).

**Magic link / OTP**: 6-cell code input, paste support, resend countdown, and an "open your email
app" hint with the provider detected from the address.

**Verify email / onboarding**: stepper (3.28) with 3 steps maximum, a skippable profile step, and a
"first action" screen that ends in the product with sample-flagged data.

**404**: centered glass panel, oversized 404 in gradient text at 20 percent opacity behind, one line
of copy, two actions (home, search), and a subtle floating animation on the numeral (4s, 6px, off
under reduced motion).

**500 / maintenance**: calm copy, a status link, a retry action, and an error id in mono `--fs-2xs`.

**Legal and cookie banner**: bottom-left glass bar, 400px max, three actions (Accept all, Reject
non-essential, Preferences), never a full-screen modal, never blocking the first paint of content.

**Status page**: 3 states per service (operational, degraded, outage), 30-day uptime bars 6px tall
with tooltips, active incidents with a timeline of updates, and a subscribe action.

### 5.9 Waitlist and coming soon <a id="s-5-9"></a>

- Single column, centered, aurora at 40 percent intensity.
- H1 with the positioning line, one paragraph, an email field plus button, and a counter
  ("412 people ahead of you" after joining, animated from 0).
- Below: three value bullets with icons, and a "what we are building" glass card with a 3-item list.
- Optional countdown to launch with flip-style digits (no bouncing), disabled under reduced motion.
- Referral row after joining: copyable link, position delta, and social share buttons.
- Never fake social proof with invented logos; use "backed by" only with permission.

### 5.10 Error, empty and edge-case pages <a id="s-5-10"></a>

| Case | Treatment |
|---|---|
| Offline | Amber banner plus a retry; cached content stays visible with a "last updated" chip |
| Slow connection | Skeletons plus a status line; delayed actions show a pending chip |
| Permission denied | Explain which role is required, offer to request access (sends a notification) |
| Expired session | Glass modal with re-auth inline, preserving the current URL and draft |
| Rate limited | Countdown timer, an explanation of the limit, and a link to upgrade |
| Partial failure | The page renders with a per-section error card rather than failing whole |
| Data too large | Virtualized list plus a "download full dataset" action instead of rendering |
| Browser unsupported | A plain page listing supported browsers, no aurora, no JS dependency |

### 5.11 SEO, metadata and social surface <a id="s-5-11"></a>

- Title pattern: `{Page} - {Product}` under 60 characters; description under 155 characters, written
  as a benefit, not a keyword list.
- Open Graph image: 1200x630 generated from a template with the page title, the aurora background
  and the brand mark; never a raw screenshot.
- Structured data: `Organization` plus `WebSite` on the root, `Product` with `offers` on pricing,
  `FAQPage` on FAQ blocks, `Article` on posts, `BreadcrumbList` on nested pages.
- Semantic HTML: one H1 per page, sequential headings, `nav`, `main`, `article`, `aside`, `footer`,
  and `aria-label` on each landmark.
- Performance targets: LCP under 2s on 4G, CLS under 0.1, INP under 200ms; hero visual is not
  lazy-loaded; aurora and grain are CSS only (no images); fonts preloaded with `font-display: swap`.
- Crawling: `sitemap.xml`, `robots.txt`, canonical URLs, `hreflang` when localized, and clean slugs
  (lowercase, hyphenated, under 60 characters, no dates unless the content is dated).

### 5.12 Page composition checklist <a id="s-5-12"></a>

Before shipping any page, confirm:

1. Exactly one H1 and a clear reading order.
2. Hero communicates the value in under 5 seconds at 375px width.
3. No section without a stated purpose in the blueprint.
4. Every CTA is unmistakable and has a hover, focus and loading state.
5. Every image has alt text or is decorative with `alt=""`.
6. Scroll animations: reveal once, stagger capped, disabled under reduced motion.
7. Empty, loading and error states exist for every dynamic region.
8. The page holds up at 320px with no horizontal scroll.
9. Contrast passes AA including text over glass and over aurora.
10. Lighthouse mobile: performance 90+, accessibility 100, best practices 95+, SEO 100.

---

## 6 . Motion System <a id="s-6"></a>

Motion is where most AI-generated pages fail. This part defines exactly what may move, how far,
how fast and why. Everything here is mandatory for scroll-driven experiences.

### 6.1 Motion vocabulary <a id="s-6-1"></a>

| Concept | Rule |
|---|---|
| Micro (hover, press, focus) | 90 to 140ms, transform only, distance 1 to 4px |
| Standard (expand, swap, tab) | 200 to 240ms, `--ease-out` |
| Surface (modal, panel, hero visual) | 320 to 420ms, `--ease-out` |
| Scroll reveal | 600 to 760ms, `--ease-out`, distance 12 to 24px |
| Ambient (aurora, grain, marquee) | 20 to 60s, linear or sine, never distracting |
| Spring | Only for direct manipulation (drag, magnetic, elements following the pointer) |

Forbidden: `ease-in-out` on entrances, linear on UI transitions, durations above 900ms on
interactive elements, movement above 32px for non-hero elements, rotation of decorative shapes,
bouncing loops, continuous pulsing of more than one element per viewport.

### 6.2 Scroll reveal (the default) <a id="s-6-2"></a>

Rules:

1. Reveal **once** per element. Never re-animate on scroll up (`once: true`).
2. Trigger when 25 percent of the element is visible, with a -12 percent bottom margin so the
   animation completes before the element reaches the center of the viewport.
3. Distance 16px (default), 24px for large panels, 8px for inline chips.
4. Stagger 60 to 80ms between siblings, and the total cascade must complete within 600ms after the
   section enters, regardless of the number of children (clamp the stagger).
5. The first viewport never animates on scroll: the hero animates on load with its own sequence.
6. Progressive enhancement: content is visible by default and only animates when JS is present
   (add a `.js` class on the root, drive reveals from `[data-reveal]` rules).

```tsx
// components/motion/reveal.tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({ children, delay = 0, y = 16, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, stagger = 0.06, delay = 0 }: { children: React.ReactNode; stagger?: number; delay?: number }) {
  return (
    <motion.div variants={staggerParent(stagger, delay)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={fadeUp}>{children}</motion.div>;
}
```

CSS-only fallback (no JS, for static sites):

```css
@media (prefers-reduced-motion: no-preference) {
  html.js [data-reveal] {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.76s var(--ease-out), transform 0.76s var(--ease-out);
    transition-delay: var(--reveal-delay, 0ms);
  }
  html.js [data-reveal].is-visible { opacity: 1; transform: none; }
}
```

```js
// 20 lines, dependency-free, works with any framework
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
);
document.querySelectorAll("[data-reveal]").forEach((el, i) => {
  el.style.setProperty("--reveal-delay", `${Math.min(i * 60, 360)}ms`);
  io.observe(el);
});
```

### 6.3 Orchestration and sequences <a id="s-6-3"></a>

Hero load sequence (once, on mount):

| Order | Element | Delay | Motion |
|---|---|---|---|
| 1 | Announcement pill | 0ms | opacity plus y 8px |
| 2 | H1 | 80ms | opacity plus y 16px, 760ms |
| 3 | Lead | 200ms | opacity plus y 12px |
| 4 | Actions | 320ms | opacity plus y 12px |
| 5 | Trust row | 420ms | opacity |
| 6 | Visual anchor | 480ms | opacity plus scale 0.97 to 1, y 24px, 900ms |
| 7 | Ambient aurora | 600ms | fade to full over 1.2s, then drift |

Rules: never exceed 900ms total before the primary action is interactive; the CTA must be clickable
from t=0 (animation must not block pointer events or use `pointer-events: none`).

Section-level orchestration: header (overline, title, lead) reveals as one group with 40ms stagger;
the content group starts 120ms after the header; within content, cards use 60ms stagger.

### 6.4 Scroll-linked animation <a id="s-6-4"></a>

Use scroll-linked motion only for: parallax depth, progress indicators, horizontal galleries,
scrollytelling narratives and sticky panels. Never for basic reveals.

```tsx
"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 120, damping: 24, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y, scale, opacity }} className="vitral will-change-transform">
        {/* product visual */}
      </motion.div>
    </div>
  );
}
```

Rules: parallax factor between 0.04 and 0.12 of scroll distance; wrap in `useSpring` with damping
above 20 to remove jitter; use `will-change: transform` only while in view; never animate `top`,
`left`, `margin` or `height` on scroll; a maximum of two scroll-linked elements per viewport.

### 6.5 Sticky scrollytelling <a id="s-6-5"></a>

```
┌───────────────────────────────┬──────────────────────────┐
│  STICKY VISUAL (position: sticky, top: 15vh)             │
│  swaps its content per step    │  STEP 1  (min-height 90vh)
│                                │  STEP 2  (min-height 90vh)
│                                │  STEP 3  (min-height 90vh)
└───────────────────────────────┴──────────────────────────┘
```

Implementation contract:

1. The section is a grid of two columns on desktop, stacked on mobile (visual above, steps below).
2. The visual wrapper is `position: sticky; top: calc(var(--nav-h) + 24px); height: 70vh`.
3. Each step is a `min-height: 78vh` block with a title, 2 to 3 lines of copy and optional metric.
   Steps are triggered by an `IntersectionObserver` at `rootMargin: "-45% 0px -45% 0px"`.
4. State: exactly one active step; the visual crossfades between scenes over 420ms with a 12px rise
   and a scale of 1.01 for the incoming scene.
5. Step indicators: 4 dots on the left (desktop) or a top progress bar (mobile), 2px rail with an
   accent fill that grows with scroll progress.
6. Under reduced motion: the visual becomes static per step (no crossfade), and steps render in a
   normal stacked flow without sticky.
7. Mobile fallback under 768px: drop stickiness entirely, show each scene inline with its step.

```tsx
const steps = [
  { id: "connect", title: "Connect your sources", copy: "…", scene: <SceneConnect /> },
  { id: "model", title: "Model on real data", copy: "…", scene: <SceneModel /> },
  { id: "ship", title: "Ship in one click", copy: "…", scene: <SceneShip /> },
];
```

### 6.6 Parallax layers <a id="s-6-6"></a>

- Maximum 3 layers: background aurora (factor 0.03), mid visual (0.06), foreground card (0.10).
- Text never parallaxes independently of its container, except for a hero title that shifts by
  0.02 with a slight blur ring (5 to 10 percent opacity) on the masked edges.
- Use `translate3d` to keep compositing on the GPU.
- Disable entirely when `prefers-reduced-motion: reduce` or when the device reports under 4 logical
  cores or `saveData` is enabled.

### 6.7 Horizontal scroll gallery <a id="s-6-7"></a>

```tsx
"use client";
export function HorizontalGallery({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-[var(--gutter)]">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
```

Rules: only for 3 to 6 cards of equal height; always provide a drag fallback and keyboard access
(arrow buttons as well); precompute the horizontal distance from the content width minus viewport
width (never a magic percentage); a scroll hint chip ("Scroll to explore") appears on first view and
fades after the first movement; on touch, keep the vertical scroll driving the horizontal movement
(do not hijack with `preventDefault`).

### 6.8 Pinning, progress and sticky headers <a id="s-6-8"></a>

- Section progress: a 2px accent line that fills as a section scrolls, pinned to the section's top
  edge, driven by `useScroll` with `layout: false`.
- Sticky section header: the section title stays under the navbar, shrinking from `--fs-h2` to
  `--fs-h4` and gaining a hairline as it pins (interpolate with `useTransform`).
- Sticky sidebars (docs, settings): `position: sticky; top: calc(var(--nav-h) + 32px); max-height: calc(100vh - var(--nav-h) - 64px); overflow-y: auto;` with a fade mask at both ends.
- Never more than one pinned element per viewport; a pinned element must release before the next
  section's content becomes readable.

### 6.9 Page and route transitions <a id="s-6-9"></a>

- With the View Transitions API (Next.js `experimental.viewTransition` or `unstable_ViewTransition`):
  shared element between a card and its detail page; default transition 320ms `--ease-out` with a
  4px fade-through rise; never a full-screen wipe.
- Without the API: use a router-level 180ms opacity fade plus 8px rise on the incoming page, and
  keep the navbar and footer out of the transition (they persist).
- Suspense boundaries: each route group has a skeleton matching its final layout; never a global
  spinner. A loading skeleton must not re-trigger reveal animations when the real content replaces it.
- Exit animations are only for overlays; navigating away from a page does not animate its exit.

### 6.10 Micro-interaction catalog <a id="s-6-10"></a>

| Element | Hover | Press | Focus |
|---|---|---|---|
| Primary button | translateY -1px, glow up | scale 0.98 | 2px accent outline, 2px offset |
| Glass card | translateY -4px, specular appears, hairline strengthens | scale 0.995 (only if clickable) | outline plus accent hairline |
| Nav link | underline grows from left, 180ms | - | accent underline plus outline |
| Icon button | glass fill rises one step, icon opacity 100 | scale 0.94 | outline |
| Row (list/table) | glass fill, actions fade in 120ms | - | outline plus action visibility |
| Input | hairline strengthens | - | accent border plus 3px soft ring |
| Switch | thumb widens 2px | thumb compresses 1px | outline on the track |
| Tab | text to --fg, indicator slides | - | outline on the tab, not the indicator |
| Avatar | ring becomes accent at 40 percent | - | outline |
| Copy button | icon scale 1.05 | check swap | outline plus tooltip |
| Chart point | 8px dot plus tooltip | - | tooltip appears on focus |

Rules: hover effects only under `@media (hover: hover) and (pointer: fine)`; press states must be
instant (no easing above 90ms); focus rings must never be removed, only restyled.

### 6.11 Ambient motion <a id="s-6-11"></a>

- **Aurora drift**: 3 blobs, each with a 26 to 42s `translate` plus `scale` cycle, offset start
  phases, blur 80 to 140px, `mix-blend-mode: screen` optional on dark ground. Total opacity of all
  blobs must stay below 0.45 so text contrast remains stable.
- **Grain**: a 200x200 tiled noise (inline SVG data URI) at 2.5 to 3.5 percent opacity, `pointer-events: none`,
  fixed to the viewport, and animated only with a slow 8s position shift or not at all (a static
  grain is cheaper and looks identical).
- **Gradient sweep on lines**: a 2px accent line can host a 3s traveling highlight on hover of the
  parent card only.
- **Live status dot**: 2.4s pulse with a 12px expanding halo at 12 percent opacity; stop when the
  tab is hidden (`document.visibilityState`).
- Everything ambient pauses when the element leaves the viewport (`animation-play-state: paused`
  via an IntersectionObserver class) and under reduced motion.

### 6.12 Reduced motion and performance (mandatory) <a id="s-6-12"></a>

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .aurora, .grain, .marquee-track { animation: none !important; }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

In React, use `useReducedMotion()` from `motion/react` and render the final state directly. Never
ship a reduced-motion version that hides content.

Performance rules:

1. Animate only `transform` and `opacity` (plus `filter` and `clip-path` in rare, isolated cases).
2. Add `will-change: transform` only while the element is on screen; remove it after (permanent
   `will-change` wastes GPU memory).
3. One `IntersectionObserver` per section, not per element; share it through a context or a hook.
4. Scroll handlers: passive listeners plus `requestAnimationFrame` throttling; prefer Motion's
   `useScroll` which already batches.
5. Limit `backdrop-filter` to 6 simultaneous elements per viewport; on low-end devices
   (`navigator.hardwareConcurrency <= 4`), reduce blur to 8px or replace glass with a solid fill at
   `rgba(255,255,255,.06)` plus a hairline.
6. Avoid animating box-shadow and background-position; use a pseudo-element with opacity instead.
7. Charts and long lists must not re-render during scroll: memoize and virtualize.
8. Test with a 4x CPU throttle in DevTools; the reveal must still hold 60fps on a mid-range Android.
9. Budget: under 60ms of JS per scroll frame; under 120 elements animating simultaneously.

### 6.13 Motion QA checklist <a id="s-6-13"></a>

1. Every scroll animation fires once and never re-triggers.
2. Stagger caps at 400ms total for the last sibling.
3. `prefers-reduced-motion: reduce` renders the final state with no movement and no hidden content.
4. No layout shift (CLS) caused by animations; transforms never change document height.
5. No scroll-jacking: the user can always scroll past without fighting an animation.
6. Overlays animate out on exit and then unmount.
7. Hero sequence completes within 900ms and does not delay interactivity.
8. Ambient animations pause off-screen and when the tab is hidden.
9. The page holds 60fps on a mid-range device with the aurora enabled.
10. No animation runs on hover in a coarse-pointer context.


### 6.14 Minimum motion baseline (mandatory for every component) <a id="s-6-14"></a>

A component with no animation is incomplete work. Spec 6.13 covers what must not happen; this section
covers what must. Every interactive or structural component ships **at least two** of the following,
and every page ships all five groups.

| Group | Minimum | Token | Duration |
|---|---|---|---|
| Entrance | opacity 0 to 1, 16px rise, fires once at 25 percent visibility | `nv-fade-up`, `nv-reveal` | 760ms |
| Hover | 2px lift, or one step up in fill, or a hairline brightening | `nv-lift`, `nv-lift-lg` | 240ms |
| Press | scale 0.98, no color change | `nv-press` | 140ms |
| State change | fill, border or text color interpolates between states | color transition | 240ms |
| Attention | one pulsing dot, one caret, or one shimmer per viewport, never more | `nv-pulse`, `nv-caret-blink`, `nv-shimmer` | 1s to 1.4s |

Rules:

1. **Nothing animates on load except the hero.** The hero sequence completes within 900ms; everything
   else waits for visibility.
2. **Zero-motion components are rejected.** In particular, a pasted third-party component that
   renders flat must be given the baseline before it is delivered: `nv-fade-up` on entry, `nv-lift` on
   interactive surfaces, `nv-press` on buttons, a 240ms color transition, and a visible focus ring.
3. **Discrete states cross-fade.** Hover, active and focus must never snap: 140 to 240ms, easing
   `--ease-out`.
4. **Data surfaces animate once.** Charts draw at 760ms on first view, then never again on scroll.
5. **Reduced motion keeps the meaning.** Under `prefers-reduced-motion: reduce` the final state
   renders immediately and the focus ring still appears. Nothing is hidden and nothing loops.
6. **The baseline is a floor, not a target.** Add scroll-linked and orchestrated motion per 6.4 to
   6.8 when the page earns it; never add a second effect to an element that already moves.

### 6.15 Images and media on scroll <a id="s-6-15"></a>

Images are where amateur work shows: they fade in over 1.5 seconds, they push the page because nobody
reserved the box, or they sit dead still while everything around them moves. The professional pattern
is a reserved box, a single entrance, and at most one damped parallax per page.

**The default: veil uncover plus settle**

```tsx
// Transform-only, so it stays on the compositor. One entrance per image, never two stacked.
<motion.div
  className="absolute inset-0"
  initial={{ scale: 1.06, opacity: 0.6 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
  transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
>
  <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
</motion.div>

<motion.span
  aria-hidden="true"
  className="absolute inset-0 origin-bottom bg-[var(--bg)]"
  initial={{ scaleY: 1, opacity: 1 }}
  whileInView={{ scaleY: 0, opacity: 0 }}
  viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
  transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
/>
```

| Rule | Value |
|---|---|
| Reserved box | `aspect-ratio` on the frame, decided before the image loads; CLS stays at 0 |
| Over-scale | 1.02 to 1.08; anything larger reads as a slideshow transition |
| Entrance | 760ms, `--ease-out`, fires once at 35 percent visibility, 12 to 24px of travel if it moves |
| Parallax | factor 0.04 to 0.12 (6 percent default), one or two frames per page, spring damping 24 or higher |
| Parallax frame | `overflow: hidden` with an 8 percent oversized inner box, so no edge is exposed over the travel |
| Gallery | vertical scroll may drive one horizontal track per page, 66 percent of the track width, with a progress affordance and a wrapping fallback below 768px |
| Caption | static; it may sit on a veil gradient but never animates independently |
| Clip-path wipes | allowed for one or two hero images per page; they are not composited, so never on a grid of tiles |
| Forbidden | animating `filter`, grain, vignette, `object-position`, or `backdrop-filter`; a veil plus a scale plus a blur on one frame |
| Reduced motion | image present at final scale, no veil, no parallax; the caption stays readable |

Sticky scrollytelling with images follows 6.5: steps are 70 to 78vh, activate on a -45% root margin,
cross-fade scenes over 420ms with a 12px rise, show a progress rail, and drop stickiness below 1024px.

Copy-paste recipes, including the veil, the parallax frame, the sticky gallery and the counters, live
in `prompts/13-scroll-motion-recipes.md`.

---

## 7 . Recipes (copy and paste) <a id="s-7"></a>

Production-ready building blocks. Each recipe is self-contained and assumes the tokens of
Section 2 and the utilities of Section 11.2.

### 7.1 Project setup <a id="s-7-1"></a>

```bash
# 1. Next.js 15 with App Router, TypeScript, Tailwind v4
npx create-next-app@latest my-app --ts --tailwind --app --eslint --src-dir=false --turbopack

# 2. shadcn/ui (Radix primitives + cva + tailwind-merge)
npx shadcn@latest init
npx shadcn@latest add button card dialog dropdown-menu input label select sheet skeleton switch tabs textarea tooltip avatar badge separator scroll-area command popover table sonner

# 3. Motion, icons, helpers
npm i motion lucide-react clsx tailwind-merge class-variance-authority
npm i -D @types/node prettier prettier-plugin-tailwindcss
```

Vite + React alternative:

```bash
npm create vite@latest my-app -- --template react-ts
npm i -D tailwindcss @tailwindcss/vite
npm i motion lucide-react clsx tailwind-merge class-variance-authority
```

Astro: `npm create astro@latest` then add the Tailwind integration and use the CSS-only reveal
fallback from Section 6.2 for static pages.

### 7.2 The Vitral surface CSS (canonical) <a id="s-7-2"></a>

```css
/* app/globals.css - after the token blocks of Section 2.1 and 2.2 */
@layer components {
  .vitral {
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-lg);
    background: var(--glass);
    backdrop-filter: blur(var(--blur)) saturate(140%);
    -webkit-backdrop-filter: blur(var(--blur)) saturate(140%);
    box-shadow: var(--shadow-2), var(--shadow-inset);
  }

  .vitral-strong {
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-lg);
    background: var(--glass-strong);
    backdrop-filter: blur(var(--blur-lg)) saturate(150%);
    -webkit-backdrop-filter: blur(var(--blur-lg)) saturate(150%);
    box-shadow: var(--shadow-3), var(--shadow-inset);
  }

  /* hairline edge with a vertical gradient */
  .vitral::after,
  .vitral-strong::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
  }

  /* specular sweep that follows the pointer */
  .vitral-specular::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      560px circle at var(--mx, 50%) var(--my, 0%),
      rgba(255, 255, 255, 0.10),
      transparent 42%
    );
    opacity: 0;
    transition: opacity var(--dur) var(--ease-out);
    pointer-events: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .vitral-specular:hover::before { opacity: 1; }
  }

  /* nested panels never stack blur */
  .vitral .vitral,
  .vitral .vitral-strong {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--glass-dim);
    box-shadow: none;
    border-radius: var(--radius);
  }

  /* gradient headline */
  .text-vitral {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.60));
    -webkit-background-clip: text;
            background-clip: text;
    color: transparent;
  }
}
```

### 7.3 Aurora background <a id="s-7-3"></a>

```tsx
// components/aurora.tsx
export function Aurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div
        className="aurora absolute -top-[20%] left-[-10%] h-[70vmax] w-[70vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle at 30% 30%, var(--aurora-1), transparent 62%)", opacity: 0.9 * intensity, animation: "drift-a 38s var(--ease-in-out) infinite" }}
      />
      <div
        className="aurora absolute right-[-15%] top-[10%] h-[55vmax] w-[55vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle at 60% 40%, var(--aurora-3), transparent 60%)", opacity: 0.85 * intensity, animation: "drift-b 44s var(--ease-in-out) infinite" }}
      />
      <div
        className="aurora absolute bottom-[-25%] left-[25%] h-[60vmax] w-[60vmax] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--aurora-2), transparent 58%)", opacity: 0.7 * intensity, animation: "drift-c 30s var(--ease-in-out) infinite" }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
```

```css
@keyframes drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(4%, 3%, 0) scale(1.08); } }
@keyframes drift-b { 0%,100% { transform: translate3d(0,0,0) scale(1.04); } 50% { transform: translate3d(-5%, 4%, 0) scale(1); } }
@keyframes drift-c { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-3%, -4%, 0) scale(1.06); } }

.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.035;
  mix-blend-mode: overlay;
}
```

### 7.4 Hero section (complete) <a id="s-7-4"></a>

```tsx
import { ArrowRight } from "lucide-react";
import { Aurora } from "@/components/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+96px)] pb-24">
      <Aurora />
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] text-center">
        <Reveal delay={0}>
          <a href="#changelog" className="vitral inline-flex h-8 items-center gap-2 rounded-full px-3 text-[var(--fs-xs)] text-[var(--fg-muted)] hover:text-[var(--fg)]">
            <span className="size-1.5 rounded-full bg-[var(--accent-2)]" />
            v2.4 is out — streaming artifacts
            <ArrowRight className="size-3.5" />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-vitral mx-auto mt-6 max-w-[18ch] font-[var(--font-display)] text-[var(--fs-display)] font-semibold leading-[0.96] tracking-[-0.04em]">
            Ship interfaces that feel engineered
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-[46ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
            A design specification your AI agent can read and apply. Glass surfaces, restrained motion,
            professional pages.
          </p>
        </Reveal>

        <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" iconRight={<ArrowRight className="size-4" />}>Start building</Button>
          <Button size="lg" variant="secondary">Read the spec</Button>
        </Reveal>

        <Reveal delay={0.48} className="mt-16">
          <div className="vitral vitral-specular mx-auto aspect-[16/10] w-full max-w-[1080px] p-2">
            <div className="size-full rounded-[calc(var(--radius-lg)-8px)] bg-[var(--bg-elevated)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

### 7.5 Scroll progress and back to top <a id="s-7-5"></a>

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[var(--z-toast)] h-0.5 origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
      />
      {show && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="vitral fixed bottom-6 right-6 z-[var(--z-nav)] grid size-10 place-items-center rounded-full text-[var(--fg-muted)] transition-transform hover:-translate-y-0.5 hover:text-[var(--fg)]"
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </>
  );
}
```

### 7.6 Animated counter <a id="s-7-6"></a>

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function Counter({ value, suffix = "", decimals = 0, duration = 1200 }: {
  value: number; suffix?: string; decimals?: number; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
```

### 7.7 Marquee <a id="s-7-7"></a>

```css
.marquee { position: relative; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 96px, #000 calc(100% - 96px), transparent); }
.marquee__track { display: flex; width: max-content; gap: 48px; animation: marquee 40s linear infinite; }
.marquee:hover .marquee__track, .marquee:focus-within .marquee__track { animation-play-state: paused; }
@keyframes marquee { to { transform: translate3d(-50%, 0, 0); } }
@media (prefers-reduced-motion: reduce) {
  .marquee { mask-image: none; }
  .marquee__track { animation: none; flex-wrap: wrap; width: 100%; justify-content: center; }
  .marquee__track > [aria-hidden="true"] { display: none; }
}
```

### 7.8 Theme toggle without flash <a id="s-7-8"></a>

```tsx
// app/layout.tsx - inline script before hydration
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){}})();`;
// <script dangerouslySetInnerHTML={{ __html: themeScript }} />
```

```tsx
"use client";
export function ThemeToggle() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const apply = (t: typeof theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    const dark = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  };
  // render a three-way segmented control: System, Light, Dark
}
```

### 7.9 shadcn bridge (skinning shadcn components to Nova Vitral) <a id="s-7-9"></a>

shadcn components are the base; Nova Vitral supplies the skin. Three techniques:

1. **CSS variable mapping** (recommended): shadcn reads `--background`, `--foreground`, `--border`,
   `--ring`, `--primary`, `--radius`. Map them to Nova Vitral tokens once and every shadcn
   component inherits the design language.

```css
@layer base {
  :root {
    --background: var(--bg);
    --foreground: var(--fg);
    --card: var(--glass);
    --card-foreground: var(--fg);
    --popover: var(--bg-elevated);
    --popover-foreground: var(--fg);
    --primary: var(--accent);
    --primary-foreground: var(--accent-fg);
    --secondary: var(--glass-strong);
    --secondary-foreground: var(--fg);
    --muted: var(--glass-dim);
    --muted-foreground: var(--fg-muted);
    --accent: var(--accent-soft);
    --accent-foreground: var(--fg);
    --destructive: var(--danger);
    --border: var(--hair);
    --input: var(--hair);
    --ring: var(--accent);
    --radius: 16px;
  }
}
```

2. **Class override on the primitive**: `cn()` merges Tailwind classes, so the last class wins.

```tsx
<Card className="vitral rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-2)]">
  <CardHeader className="p-0">
    <CardTitle className="text-[var(--fs-h3)] text-[var(--fg)]">Title</CardTitle>
    <CardDescription className="text-[var(--fs-sm)] text-[var(--fg-muted)]">Description</CardDescription>
  </CardHeader>
  <CardContent className="p-0 pt-4">{children}</CardContent>
</Card>
```

3. **cva variants added to the shadcn component** for repeated patterns (for example a
   `glass` variant on `Button`, `Dialog` or `Sheet`):

```tsx
const buttonVariants = cva(base, {
  variants: {
    variant: {
      // shadcn originals ...
      glass: "bg-[var(--glass)] border border-[var(--hair)] backdrop-blur-[var(--blur-sm)] text-[var(--fg)] hover:bg-[var(--glass-hover)]",
      vitral: "bg-[image:var(--grad-primary)] text-[var(--accent-fg)] shadow-[var(--shadow-2)] hover:-translate-y-px",
    },
  },
});
```

Mapping table, shadcn to Nova Vitral:

| shadcn | Nova Vitral treatment |
|---|---|
| `Dialog` | glass `--blur-lg`, 1px hairline, scale 0.97 enter, scrim 60 percent plus blur 4px |
| `Sheet` | slide 320ms `--ease-out`, glass, hairline on the leading edge |
| `DropdownMenu` | glass, 8px padding, 36px rows, hairline separators |
| `Tooltip` | 400ms delay, glass, `--fs-xs`, max 240px |
| `Command` | 640px, top 15vh, glass, `--blur-lg`, group overlines |
| `Sonner` toast | glass, hairline, 12px icon tile, bottom-right |
| `Table` | 56px rows, sticky header, hover `--glass-dim`, tabular numbers |
| `Tabs` | segmented glass pill or underline with accent indicator |
| `Switch` | 36x20, accent when on, 160ms thumb |
| `Skeleton` | `--glass-dim` plus the shimmer of Section 3.20 |
| `Avatar` | full radius, 1px hairline, gradient fallback with initials |
| `Badge` | 22px chip, `--fs-2xs`, uppercase optional, 0.06em tracking |

### 7.10 Test and audit snippets <a id="s-7-10"></a>

```tsx
// Contrast helper used in a dev-only panel: verifies text on glass over worst-case aurora
export function worstCaseContrast(fg: string, glassAlpha = 0.055, ground = "#06070c") { /* compute relative luminance blend */ }
```

```bash
npx lighthouse http://localhost:3000 --preset=desktop --view
npx @axe-core/cli http://localhost:3000
npx tsc --noEmit && npx next lint
```

Manual checks: 4x CPU throttle scroll test, 320px width layout, keyboard-only walkthrough
(Tab through every interactive element), `prefers-reduced-motion` emulation, print preview,
forced-colors mode, and 200 percent zoom.

---

## 8 . Open-Source References (MIT and permissive) <a id="s-8"></a>

Nova Vitral is not invented in a vacuum. It composes ideas from mature, permissively licensed
projects. This section tells the agent **what to borrow from where**, so an implementation can lean
on proven primitives instead of reinventing them.

**Attribution rule.** Borrowing code is allowed under the license terms; copying a repository's
visual identity wholesale is not. Always: (1) keep the license file when copying substantial code,
(2) credit in the README when a project is more than a dependency, (3) never present another
project's brand, logos or marketing copy as your own.

### 8.1 Primary component foundation <a id="s-8-1"></a>

| Project | License | What to take | Raw or docs |
|---|---|---|---|
| shadcn/ui | MIT | Component source you own: button, dialog, dropdown, tabs, table, command, sheet, sonner, form wiring | https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/registry/new-york-v4/ui/button.tsx |
| Radix UI Primitives | MIT | Accessibility and behavior for menus, dialogs, popovers, sliders, switches, tabs | https://raw.githubusercontent.com/radix-ui/primitives/main/packages/react/dialog/src/dialog.tsx |
| Base UI | MIT | Alternative unstyled primitives (successor direction for many Radix patterns) | https://base-ui.com |
| Ark UI | MIT | Cross-framework primitives when not using React only | https://ark-ui.com |
| Class Variance Authority (cva) | Apache-2.0 | Variant APIs for components | https://raw.githubusercontent.com/joe-bell/cva/main/README.md |
| tailwind-merge | MIT | Safe class overriding (`cn()`) | https://raw.githubusercontent.com/dcastil/tailwind-merge/main/README.md |
| clsx | MIT | Conditional class names | https://github.com/lukeed/clsx |

### 8.2 Motion and animation <a id="s-8-2"></a>

| Project | License | What to take |
|---|---|---|
| Motion (formerly Framer Motion) | MIT | `motion/react`: variants, `whileInView`, `useScroll`, `useSpring`, `layoutId`, `AnimatePresence` |
| GSAP | Standard "no charge" license (not MIT) | Use only when explicitly needed (timeline-heavy storytelling); keep the license notice and avoid claiming MIT |
| anime.js | MIT | Lightweight keyframe/sequencing when Motion is not available |
| AutoAnimate | MIT | Zero-config list and layout transitions |
| tailwindcss-animate | MIT | Ready-made enter/exit keyframes for Tailwind |
| Lenis | MIT | Smooth scrolling (use sparingly; never combine with scroll-jacking sections) |
| View Transitions API | Web standard | Route and shared-element transitions |
| NumberFlow | MIT | Animated numbers with digit-level transitions |
| Embla Carousel | MIT | Robust carousels with drag, snap and keyboard support |

### 8.3 Visual inspiration (pattern libraries, MIT unless noted) <a id="s-8-3"></a>

| Project | License | What to take | Raw or docs |
|---|---|---|---|
| Aceternity UI | MIT | Spotlight cards, aurora background, moving borders, 3D card, text reveal | https://ui.aceternity.com/components |
| Magic UI | MIT | Marquee, animated gradient text, number ticker, dock, shine border, bento | https://magicui.design/docs/components |
| Motion Primitives | MIT | Small copy-paste motion components with clean APIs | https://motion-primitives.com/docs |
| Origin UI | MIT | Extensive Tailwind form and layout patterns, tasteful defaults | https://originui.com |
| Animata | MIT | Tailwind animation blocks (typing, tracing beam, shine) | https://animata.design |
| Cult UI | MIT | Marketing blocks with strong motion craft | https://cult-ui.com |
| Kokonut UI | MIT | Polished glass and gradient components | https://kokonutui.com |
| Park UI | MIT | Design-system-grade components with tokens | https://park-ui.com |
| HeroUI (formerly NextUI) | MIT | Accessible React component behaviors and variants | https://heroui.com |
| Nuxt UI | MIT | Excellent docs and component API design (also usable as Vue reference) | https://ui.nuxt.com |
| Tremor | Apache-2.0 | Dashboard blocks, KPI cards, chart wrappers | https://raw.githubusercontent.com/tremorlabs/tremor/main/README.md |
| Flowbite | MIT | Marketing section patterns and forms | https://flowbite.com/blocks/ |
| Tailwind Plus patterns (structure only) | Commercial | Study information architecture; never copy markup or assets |
| DaisyUI | MIT | Semantic class naming ideas for themes | https://daisyui.com |
| 21st.dev | Mixed (per component) | Community component ideas; verify each license before use | https://21st.dev |
| Untitled UI (free tier) | Per-asset license | Figma-level design detail reference | https://www.untitledui.com |
| Vercel Design / Geist | MIT | Restrained dark UI, typography scale, motion restraint | https://vercel.com/geist |
| Linear-style patterns (recreation guides) | Community MIT guides | Density, keyboard-first UX, subtle gradients |

Rule for pattern libraries: take the **technique**, not the palette. Aceternity's spotlight is
welcome; Aceternity's rainbow gradients are not part of Nova Vitral.

### 8.4 Data, charts and tables <a id="s-8-4"></a>

| Project | License | What to take |
|---|---|---|
| Recharts | MIT | Default chart library, composable, SSR friendly |
| visx | MIT | Low-level primitives for bespoke charts |
| Nivo | MIT | Rich chart types with sensible defaults |
| uPlot | MIT | Very large time series with 60fps interaction |
| Chart.js | MIT | Simple cases and canvas performance |
| D3 | ISC | Scales, shapes and math behind custom visualizations |
| TanStack Table | MIT | Headless sorting, filtering, grouping, virtualization-ready |
| TanStack Virtual | MIT | Virtualized lists and grids (chat, logs, tables) |
| AG Grid (community) | MIT | Enterprise-grade grid behavior reference |
| shadcn/ui charts | MIT | Themed chart wrappers over Recharts |

### 8.5 Content, editors and AI interface pieces <a id="s-8-5"></a>

| Project | License | What to take |
|---|---|---|
| cmdk | MIT | Command palette engine (the one shadcn uses) |
| Vaul | MIT | Drawer with correct gesture and scroll behavior |
| Sonner | MIT | Toast engine with stacking and promises |
| React Markdown | MIT | Markdown rendering pipeline |
| Shiki | MIT | Accurate syntax highlighting at build or runtime |
| KaTeX | MIT | Math rendering in assistant replies |
| rehype-sanitize | MIT | Mandatory sanitization for model output |
| TipTap | MIT | Rich text editing for artifacts and comments |
| CodeMirror 6 | MIT | Code editor in the artifact panel |
| Monaco | MIT | Heavier editor when IDE features are required |
| react-resizable-panels | MIT | Split views (thread and canvas) |
| Emoji-mart / emoji | MIT | Reaction pickers if reactions are enabled |
| Vercel AI SDK | Apache-2.0 | Streaming, tool calls, and provider abstraction for chat |
| assistant-ui | MIT | Chat primitives and thread state patterns worth studying |
| OpenAI ChatKit style patterns | Reference only | Hierarchy of message states, not code |

### 8.6 Typography, icons and assets <a id="s-8-6"></a>

| Project | License | Notes |
|---|---|---|
| Geist (Sans, Mono) | SIL OFL 1.1 | Display and mono families used by default |
| Inter | SIL OFL 1.1 | Body face; excellent dark-mode hinting |
| Satoshi / General Sans (Fontshare) | Free for commercial use | Alternative display faces |
| JetBrains Mono | SIL OFL 1.1 | Alternative mono with tall x-height |
| lucide | ISC | Default icon set, 1.5px stroke |
| Radix Icons | MIT | Compact 15px icon set for dense UI |
| Tabler Icons | MIT | Very large outline set, consistent 2px stroke |
| Phosphor | MIT | Multiple weights, useful for feature illustrations |
| Simple Icons | CC0 | Monochrome brand marks for integration grids |
| Hero Patterns / SVG Backgrounds | CC0 or MIT | Optional background textures (grain is built into the spec) |
| Unsplash / Pexels | Per-asset | Use only when the user allows stock photography |

### 8.7 Engineering references (structure and quality, not visuals) <a id="s-8-7"></a>

| Project | License | What to take |
|---|---|---|
| Next.js | MIT | App Router structure, metadata API, route groups |
| Tailwind CSS | MIT | Utility discipline and theme mapping |
| Turborepo | MIT | Monorepo layout for design system plus apps |
| Radix Colors | MIT | Contrast-tested palette methodology |
| Open Props | MIT | Token naming conventions |
| Storybook | MIT | Component documentation and visual review |
| Playwright | Apache-2.0 | Visual regression on key pages |
| axe-core | MPL-2.0 | Automated accessibility testing |
| ESLint plugin jsx-a11y | MIT | Accessibility linting in CI |
| Changesets | MIT | Versioning for the design system package |

### 8.8 How to cite references in generated code <a id="s-8-8"></a>

When the agent borrows a technique, add a one-line comment with the project name and license in the
component header. Example:

```tsx
/**
 * Spotlight card - technique inspired by Aceternity UI (MIT).
 * Adapted to Nova Vitral tokens: hairline edge, specular sweep, 4px hover lift.
 */
```

Never paste a large file verbatim from a source without keeping its license header and adding the
project to the credits section of the README.

### 8.9 Credits block for the README <a id="s-8-9"></a>

```md
## Credits and inspiration
Nova Vitral composes ideas from permissively licensed projects:
- shadcn/ui (MIT), Radix UI Primitives (MIT), Base UI (MIT)
- Motion / Framer Motion (MIT), AutoAnimate (MIT), tailwindcss-animate (MIT)
- Aceternity UI (MIT), Magic UI (MIT), Motion Primitives (MIT), Origin UI (MIT), Animata (MIT)
- Tremor (Apache-2.0), Recharts (MIT), TanStack Table (MIT), TanStack Virtual (MIT)
- cmdk (MIT), Vaul (MIT), Sonner (MIT), Shiki (MIT), KaTeX (MIT)
- Geist and Inter (SIL OFL 1.1), lucide (ISC)
Each technique was re-implemented against the Nova Vitral token system.
```

---

## 9 . Quality Gates <a id="s-9"></a>

### 9.1 Accessibility (WCAG 2.2 AA, non-negotiable) <a id="s-9-1"></a>

| Requirement | Implementation |
|---|---|
| Contrast, text | 4.5:1 for body, 3:1 for 18.66px+ bold or 24px+ regular, measured against the worst-case backdrop |
| Contrast, UI | 3:1 for borders of interactive controls, icons carrying meaning, focus indicators |
| Keyboard | Every interactive element reachable and operable with Tab, Enter, Space, arrows where applicable |
| Focus | Visible ring (`outline: 2px solid var(--accent); offset 2px`), never removed, never hidden by overflow |
| Focus order | Follows visual order; skip link to `#main` as the first focusable element |
| Semantics | One H1, sequential headings, landmarks (`header`, `nav`, `main`, `footer`), lists for lists |
| Images | Meaningful `alt`; decorative `alt=""`; charts described in a caption or a data table alternative |
| Forms | Every input labeled, errors linked with `aria-describedby`, no reliance on color alone |
| Live regions | Chat and async updates use `role="status"` or `aria-live` with a single completion announcement |
| Motion | `prefers-reduced-motion` honored everywhere; no parallax under reduced motion |
| Targets | Minimum 24x24px, ideally 44x44px on touch; 8px spacing between adjacent targets |
| Text scaling | Layout holds at 200 percent zoom and 320px width without horizontal scroll |
| Contrast preference | `prefers-contrast: more` raises glass alpha and disables the aurora |
| Dark mode only text | Never rely on dark mode for meaning; the light theme must pass the same checks |
| Media | Captions for video, transcripts for audio, no autoplay with sound |
| Timeouts | Session timeouts warn 60s before expiring and allow extension |
| Errors | Text descriptions, never color or icon only; recovery paths provided |

Testing: `axe-core` in CI plus a manual keyboard pass. Automated tools catch roughly a third of
issues; the keyboard walkthrough is mandatory.

### 9.2 Accessibility audit recipe for glass interfaces <a id="s-9-2"></a>

Glass creates two specific risks: contrast variability and text over animated backgrounds.

1. Test text at the lightest and darkest points of the scrolling aurora behind it, not only the
   static top of the page.
2. If contrast fails anywhere, in order of preference: raise glass opacity (0.055 to 0.09), darken
   the aurora near text zones with a radial mask, add a local scrim behind the text block, or move
   the aurora away.
3. Never solve contrast with text-shadow on body copy; a 1px dark shadow is only acceptable on
   large display type.
4. Animated background opacity must stay under 0.45 total so worst-case contrast stays predictable.
5. For light mode, frost white surfaces must reach 4.5:1 against `--fg`; if not, raise the surface
   alpha to 0.8 or add a white scrim.

### 9.3 Performance budget <a id="s-9-3"></a>

| Metric | Target | Hard limit |
|---|---|---|
| LCP (mobile, 4G) | under 2.0s | 2.5s |
| CLS | under 0.05 | 0.1 |
| INP | under 150ms | 200ms |
| TTFB | under 400ms | 800ms |
| JS shipped, first load | under 180KB gzip | 250KB |
| CSS shipped | under 45KB gzip | 70KB |
| Fonts | 2 families, max 4 files, subset to Latin | 3 families |
| Images | AVIF or WebP, `sizes` set, lazy below the fold | - |
| Frame budget while scrolling | under 60ms JS per frame | 100ms |
| Simultaneous backdrop-filter | 6 per viewport | 8 |
| Long tasks | none above 50ms during scroll | 100ms |

Techniques: server components by default; client components only where interactivity exists;
dynamic imports for charts, editors and the canvas panel; CSS for all ambient visuals (no images);
`content-visibility: auto` for long marketing pages below the fold; prefetch on hover for routes.

### 9.4 Visual QA checklist <a id="s-9-4"></a>

1. Optical alignment: icons and text share a baseline; numbers are right-aligned in tables.
2. Rhythm: vertical spacing uses the scale, no ad hoc 37px gaps; sections alternate density.
3. Hairlines are 1px at every DPR (use `1px` with borders, never `0.5px`, and verify on 2x displays).
4. Gradient text has enough contrast; no text rendered transparent over a light area.
5. Radii are concentric: inner radius equals outer radius minus padding.
6. Shadow direction and intensity are consistent (all light from above).
7. Icons are visually balanced (24px grid, 1.5px stroke) and optically centered in their tiles.
8. Empty space around dense blocks is at least 96px (quiet zone).
9. Hover states exist on everything clickable, and none of them shifts layout.
10. Long strings (names, emails, IDs) truncate instead of breaking the layout.
11. Every breakpoint checked: 320, 375, 768, 1024, 1280, 1440, 1920.
12. Light and dark themes checked on every page; no component left unthemed.
13. Zoom at 200 percent: no overlap, no clipping, no horizontal scroll.
14. Print preview: no aurora, readable text, links visible.

### 9.5 Anti-patterns (what makes a page look machine-generated) <a id="s-9-5"></a>

**Visual**

0. Color inflation of any kind. Run the grayscale test of `1.2.1` before shipping: if the hierarchy
   survives without color, the palette is doing its job; if it does not, the page is decorated, not
   designed.

1. Purple-to-blue gradient on every surface and button; purple as the default accent at all.
2. Neon, cyan-on-purple, rainbow or multi-hue gradients; saturated background fills.
3. Glass panels over a flat background (no aurora), producing gray mud.
4. More than two accent colors in a viewport; accent used for decoration instead of action;
   an accent covering more than ten percent of the surface.
5. Glow on more than one element, gradient text outside the hero H1, and "candy" buttons where the
   primary action looks like a different product than the rest of the page.
4. Emoji as icons; mixed icon sets; inconsistent stroke widths.
5. Generic stock photography with fake laptops and glowing servers.
6. Excessive shadows, glows, and borders on the same element.
7. Perfectly centered everything with no asymmetry or negative space.
8. Text over busy imagery without a scrim.
9. Fifteen sections that all look like three-column card grids.
10. Neon or saturated colors that ignore the neutral ground.

**Motion**

11. Every section fading in from the left with the same easing.
12. Long 1.5s animations that repeat on every scroll.
13. Elements animating while the user is reading them.
14. Infinite loops competing for attention (three pulsing badges at once).
15. Hover effects that scale cards to 1.05, causing layout heaviness.
16. Scroll-jacking that overrides native scroll speed.
17. No exit animations; overlays vanishing instantly.
18. Blur and transform animated together on large surfaces, dropping frames.

**Content and UX**

19. "Lorem ipsum" left in place or placeholder copy like "Feature one".
20. Buttons labeled "Click here", "Learn more" with no destination context.
21. Testimonials from "John Doe, CEO" with no company and no photo.
22. Prices with fake precision ("$19.99") and no billing clarity.
23. Repeated CTAs with different labels for the same action.
24. Forms without labels, relying on placeholders.
25. Toasts for trivial events, and no toasts for meaningful ones.
26. Disabled states with no explanation and no path forward.
27. Numbers without context, comparison or time period.
28. Chat interfaces with a spinner instead of streaming and no stop control.
29. Auto-approving agent actions that write or spend.
30. No empty states: blank areas where data should be explained.

### 9.6 Code review checklist for generated UI <a id="s-9-6"></a>

1. No hardcoded colors, shadows or durations outside the token layer.
2. No `any` in TypeScript; props typed and exported.
3. Server and client components split correctly; `"use client"` only where needed.
4. No unused imports, no `console.log`, no commented dead code.
5. Key props stable; no index keys in reorderable lists.
6. Effects clean up listeners, observers, timers and rAF loops.
7. No `useEffect` for derived state; compute during render or with `useMemo`.
8. Async handlers catch errors and surface them to the UI.
9. Images have `sizes`, `alt`, and explicit width and height.
10. All interactive elements are buttons or links, never clickable divs.
11. Semantics preserved: lists, tables, headings, labels.
12. Reduced motion and coarse pointer handled.
13. Long lists virtualized; expensive computations memoized.
14. No layout shift on font load (font metrics adjusted or matched fallback).
15. Every component has an empty, loading and error path where data is involved.

### 9.7 Design critique rubric (score each 0 to 5) <a id="s-9-7"></a>

| Dimension | 5 means |
|---|---|
| Hierarchy | The eye lands on the right thing first at every scroll position |
| Craft | Hairlines, alignment, optical spacing and states are consistent and deliberate |
| Restraint | One idea per viewport, two accents maximum, motion that informs |
| Depth | Glass, layering and light create believable space without noise |
| Typography | Scale, tracking, measure and vertical rhythm are precise |
| Motion | Reveals are subtle, once, cheap, and disabled under reduced motion |
| States | Empty, loading, error, hover, focus, disabled and success are all designed |
| Accessibility | AA contrast, full keyboard support, semantics and reduced motion |
| Performance | Budgets met, transforms only, no jank while scrolling |
| Content | Copy is specific, honest, benefit-led and free of placeholders |

Target for a professional page: 42 or more out of 50, with no dimension below 3.
Anything scoring under 3 in Craft, Motion or States must be revised before delivery.

### 9.8 Definition of done <a id="s-9-8"></a>

A page or component is done when:

1. It renders correctly at all seven breakpoints in both themes.
2. All states are implemented and visually verified.
3. Keyboard and screen-reader passes succeed.
4. Reduced motion is verified.
5. Performance budget is met with the network throttled.
6. Copy is final (no placeholders) and localized where required.
7. Code review checklist of 9.6 passes.
8. The rubric of 9.7 scores 42 or above.
9. The change is committed with a conventional commit message and a short summary of visual impact.

---

## 10 . Working With AI Agents <a id="s-10"></a>

This part is for the human driving the agent, and for the agent driving itself.

### 10.1 Loading the specification <a id="s-10-1"></a>

| Environment | How to load |
|---|---|
| Any chat assistant | Paste the master prompt from `prompts/00-master-prompt.md`, which names every raw URL and tells the agent which one to read per task |
| Raw URL | `https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md` — the agent fetches it and reads only the line ranges it needs |
| Project file | Drop `design.md` in the repository root (or `docs/`) and add one line to `AGENTS.md` telling agents to consult it |
| Cursor / Windsurf | Copy `prompts/08-cursor-rules.mdc` into `.cursor/rules/nova-vitral.mdc` so the rules are always active, and keep the spec for on-demand reads |
| Claude Projects / GPTs / Gems | Use `prompts/09-claude-project-instructions.md` as the system instruction and attach the spec as knowledge |
| Small context windows | Use `prompts/11-condensed-system-prompt.md` (tokens plus the ten essential rules) |
| CI or scripts | `scripts/build_spec.py` regenerates the line index after any edit so the ranges never drift |

### 10.2 The master prompt pattern <a id="s-10-2"></a>

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

### 10.3 Task decomposition for large builds <a id="s-10-3"></a>

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

### 10.4 Token economy (keeping the agent cheap and accurate) <a id="s-10-4"></a>

1. Never ask the agent to read the whole spec. The task map exists for this.
2. Quote the token block (2 lines to 20 lines) instead of asking for a full read.
3. When iterating on one component, send only that component's file plus the relevant section.
4. Prefer "apply section 9.6 to this file" over pasting the whole checklist into the prompt.
5. Cache: if the agent supports prompt caching, keep the spec contents stable and vary only the
   task text at the end.
6. Ask for diffs, not full rewrites, when the file already exists.

### 10.5 Self-review loop (the agent must run this before answering) <a id="s-10-5"></a>

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

### 10.6 Common agent failure modes and their fixes <a id="s-10-6"></a>

| Failure | Fix in the prompt |
|---|---|
| Reads the whole spec, ignores the task map | "Do not read the entire file. Read only the listed line ranges." |
| Produces purple gradients and neon everywhere | "Section 1.2.1 is mandatory: neutral-first, one accent per viewport, purple and neon banned by default, grayscale test must pass." |
| Glass without a background | "Section 1.3 rule 1: glass requires an aurora or an image behind it." |
| Animation on every element | "Reveal once, distance 16px, stagger capped at 400ms (section 6.2)." |
| Long, slow, repeated animations | "Durations per 6.1. Nothing above 900ms. Never re-trigger." |
| Ignores accessibility | "Section 9.1 is mandatory. Include focus-visible, aria and reduced motion." |
| Truncates files | "Return complete files. Never write 'rest omitted'." |
| Invents a new design system | "Use tokens from section 2 exclusively. Do not invent palettes." |
| Ships only the happy path | "Implement empty, loading and error states (3.20)." |
| Rebuilds shadcn from scratch badly | "Use shadcn/ui components and the bridge in 7.9; do not hand-roll primitives." |
| Overwrites existing tokens | "Never edit globals.css tokens; extend the semantic layer instead." |

### 10.7 Multi-agent and multi-session work <a id="s-10-7"></a>

- Give each agent a section of the spec to own (foundation, chat scene, motion, quality).
- Keep one owner per file to avoid conflicting edits.
- Use a shared `AGENTS.md` with: project structure, token locations, component conventions, the
  current task list and the definition of done.
- After each session, ask the agent to append to `docs/decisions.md`: what changed, why, and which
  spec section justified it. This keeps the design system coherent across sessions and models.
- When switching models, re-send the output contract, the tokens and the current file. Do not assume
  the new model inherits context.

### 10.8 Prompt library (external files in this repository) <a id="s-10-8"></a>

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

### 10.9 Definition of done for an agent session <a id="s-10-9"></a>

1. Build succeeds; type check passes; no console warnings.
2. Only tokens are used; grep for `#` hex values in components returns nothing outside the tokens file.
3. Every new interactive component has all states.
4. Reduced motion verified in the browser devtools emulation.
5. The three closing bullets are present: built, omitted, next.
6. Files committed with a conventional commit message.

---

## 11 . Appendix <a id="s-11"></a>

### 11.1 Glossary <a id="s-11-1"></a>

| Term | Definition |
|---|---|
| A11y | Accessibility: designing so people with disabilities can use the interface |
| Artifact | A substantial deliverable produced in a chat (document, app, component, dataset) |
| Aurora | The blurred radial color field that gives the dark ground depth |
| Bento | Asymmetric grid of mixed-size cells that presents several capabilities at once |
| Backdrop filter | The CSS property that blurs whatever sits behind an element; the basis of glass |
| CLS | Cumulative Layout Shift: how much the layout moves unexpectedly |
| Composer | The message input surface of a chat interface |
| Container query | CSS media query based on the size of a parent container instead of the viewport |
| Hairline | A 1px border with a gradient opacity, brighter at the top |
| INP | Interaction to Next Paint: responsiveness metric for user input |
| LCP | Largest Contentful Paint: main loading metric |
| Quiet zone | Mandatory whitespace of at least 96px around dense blocks |
| Reveal | The scroll-triggered entry animation (opacity plus small translate) |
| Scrim | A translucent overlay that darkens content behind text or a modal |
| Scrollytelling | A narrative where scroll position drives which visual step is active |
| Specular | Light reflection on a surface; in this system, the pointer-following highlight |
| Token | A named design constant consumed by components instead of a raw value |
| View transition | Browser API for animating between two DOM states or routes |
| Vitral | Nova Vitral's glass panel atom: fill, hairline edge and specular light |
| Zero state | The state of a screen before any user or data action |

### 11.2 Utility functions <a id="s-11-2"></a>

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Deterministic hue from any identifier, used for avatar gradients. */
export function hashHue(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

/**
 * Constrained, low-saturation avatar palette. Avatars must never outshine the interface
 * (section 1.2.1): six calm hues, single-hue gradients, saturation capped at 46 percent.
 */
export function avatarGradient(id: string) {
  const hues = [222, 210, 198, 172, 152, 24];
  const h = hues[hashHue(id) % hues.length];
  return `linear-gradient(135deg, hsl(${h} 42% 54%), hsl(${h} 46% 40%))`;
}

export function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function formatCompact(n: number, locale = "en-US") {
  return new Intl.NumberFormat(locale, { notation: n >= 10_000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(n);
}

export function relativeTime(date: Date | string | number) {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["second", 1000], ["minute", 60_000], ["hour", 3_600_000],
    ["day", 86_400_000], ["week", 604_800_000], ["month", 2_629_800_000], ["year", 31_557_600_000],
  ];
  for (let i = units.length - 1; i >= 0; i--) {
    const [unit, ms] = units[i];
    if (Math.abs(diff) >= ms || unit === "second") return rtf.format(-Math.round(diff / ms), unit);
  }
  return "";
}

export function truncateMiddle(str: string, max = 32) {
  if (str.length <= max) return str;
  const half = Math.floor((max - 1) / 2);
  return `${str.slice(0, half)}…${str.slice(-half)}`;
}
```

### 11.3 Recommended project structure <a id="s-11-3"></a>

```
app/
  layout.tsx                 fonts, theme script, aurora, providers
  globals.css                tokens (2.1), tailwind theme (2.2), vitral surfaces (7.2)
  page.tsx                   landing page (blueprint 5.1)
  (marketing)/
    pricing/page.tsx
    blog/[slug]/page.tsx
    changelog/page.tsx
  (app)/
    layout.tsx               sidebar shell, command palette, toast provider
    dashboard/page.tsx
    chat/page.tsx
    settings/page.tsx
  (auth)/
    sign-in/page.tsx
    sign-up/page.tsx
components/
  ui/                        shadcn primitives, skinned with vitral
  motion/                    reveal.tsx, parallax.tsx, scroll-progress.tsx
  marketing/                 hero.tsx, bento.tsx, pricing.tsx, faq.tsx, testimonials.tsx
  chat/                      thread.tsx, message.tsx, composer.tsx, reasoning.tsx, tool-card.tsx
  data/                      stat.tsx, chart.tsx, table.tsx
  layout/                    navbar.tsx, footer.tsx, sidebar.tsx, section.tsx
lib/
  utils.ts  tokens.ts  motion.ts  format.ts  hooks/
docs/
  design.md             this specification, vendored
  decisions.md               log of design decisions per session
  prompts/                   the prompt library
public/
  fonts/  og/  icons/
scripts/
  build_spec.py              regenerates the line index
```

Naming conventions: files `kebab-case.tsx`; components `PascalCase`; hooks `use-thing.ts`;
tokens `--kebab-case`; Tailwind classes ordered by the Prettier plugin; one component per file with
a mandatory named export.

### 11.4 Section wrapper (layout primitive) <a id="s-11-4"></a>

```tsx
// components/layout/section.tsx
export function Section({
  id, overline, title, lead, action, children, align = "left", tone = "default", wide = false,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", tone === "soft" && "bg-[var(--bg-soft)]")}>
      <div className={cn("mx-auto px-[var(--gutter)]", wide ? "max-w-[var(--container-wide)]" : "max-w-[var(--container)]")}>
        {(overline || title || lead) && (
          <header className={cn("mb-12 max-w-[62ch]", align === "center" && "mx-auto text-center")}>
            {overline && (
              <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {overline}
              </p>
            )}
            {title && <h2 className="text-vitral mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em]">{title}</h2>}
            {lead && <p className="mt-4 text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">{lead}</p>}
            {action && <div className="mt-6">{action}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
```

### 11.5 Copy guidelines <a id="s-11-5"></a>

| Rule | Good | Bad |
|---|---|---|
| Lead with the outcome | "Ship a production UI in an afternoon" | "AI-powered design system platform" |
| Be specific | "412 teams migrated last month" | "Trusted by thousands" |
| Name the object | "Add a teammate to this workspace" | "Invite" |
| Sentence case for UI | "Save changes" | "Save Changes" / "SAVE CHANGES" |
| Active voice | "We deleted the file" | "The file has been deleted by the system" |
| Errors state the fix | "Email already in use. Sign in instead." | "Error 422: invalid_input" |
| No filler adjectives | "Faster than the previous pipeline" | "Blazingly fast, magical experience" |
| Consistent terminology | One word per concept across the product | "project / workspace / board" mixed |
| Numbers with context | "2.1s median response" | "Fast responses" |
| No exclamation marks in product UI | "Saved" | "Saved!" |

### 11.6 Spec changelog and maintenance <a id="s-11-6"></a>

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-09-15 | First release: foundations, tokens, 32 components, chat scene, blueprints, motion, recipes, 100 examples, prompt library |
| 1.1.0 | 2026-09-15 | Color discipline (1.2.1): neutral-first, single-hue primary gradient, purple and neon banned by default, grayscale test; aurora softened; before/after showcase site added |
| 1.2.2 | 2026-09-15 | Color gate: section 1.2.1 gains the closed set of allowed values, the rejection table and the five tells of machine-generated UI; section 6.14 (minimum motion baseline) added, which resolves the dangling 6.14 references in the prompts and components; section 6.15 (images and media on scroll) added; prompt 13 (scroll motion and image recipes) routed from the master prompt, the task prompts and the rule sets |
| 1.2.1 | 2026-09-15 | Specification file renamed from `nova-design.md` to `design.md`; section 0.2 rewritten to state that the file is a design system specification (input, never output), that it must not be built or rendered, and that nothing may be named after its filename |
| 1.2.0 | 2026-09-15 | Component library (500 components in 26 categories) and five complete page templates added; routing section 0.8; theme file with the shadcn variable remap; lucide-only icon rule; minimum motion baseline (6.14) restated for pasted components |

Maintenance: run `python3 scripts/build_spec.py` after every edit to refresh the line index and the
task map anchors. Keep the token block in `0.11` synchronized with `2.1`. Bump the minor version when
adding components or blueprints; bump the patch for wording or line-index-only changes.

### 11.7 License and reuse <a id="s-11-7"></a>

MIT. You may use, modify and redistribute this specification, including inside commercial products.
Attribution is appreciated: a link back to the repository. When adapting the design language to a
client brand, follow Section 1.12 and keep this document as the internal source of truth for the
adapted tokens.

```text
MIT License - Copyright (c) 2026 Pedro Berbis Freire and contributors
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, subject to the inclusion of the copyright notice.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

### 11.8 Final note to the agent <a id="s-11-8"></a>

You now hold a complete design language. Build inside it. When a request is ambiguous, prefer the
simpler, calmer, more legible solution; when a request is vague about styling, apply this system
without asking; when a request conflicts with accessibility, accessibility wins. Deliver complete,
runnable, professional work, and state clearly what you did not do.

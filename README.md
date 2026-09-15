# Nova Vitral

**A design specification an AI agent can read and apply.** One line-indexed file that teaches any
model to build modern minimal interfaces with glassmorphism, complete professional pages and
restrained scroll-driven animation - plus a prompt library and 100 named, copy-ready examples built
on shadcn/ui, Radix primitives and Motion.

- **Main file:** [`nova-design.md`](./nova-design.md) - drop it in your project, point your agent at it
- **Master prompt:** [`prompts/00-master-prompt.md`](./prompts/00-master-prompt.md) - names every raw
  URL and tells the agent which file to read for each task
- **Examples:** [`examples/00-index.md`](./examples/00-index.md) - 100 examples, `EX-01` to `EX-100`
- **License:** MIT

---

## Why this exists

Generic AI output all looks the same: purple gradients on flat panels, everything fading in at
1.5s, no states, placeholder copy. Part of the problem is that "make it look professional" is not an
instruction an agent can execute.

Nova Vitral replaces that with a contract: tokens, glass physics, a motion ladder, component APIs,
page blueprints, quality gates and a list of anti-patterns. The document is line-indexed, so an
agent reads roughly 300 lines instead of the whole thing - which keeps it fast, cheap and accurate
even on small context windows.

## Quick start

**Option A - raw URLs (nothing to install).** Paste the master prompt into your assistant and
describe the task:

```text
Read https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/00-master-prompt.md
and follow it. Then: build a landing page for <product> aimed at <audience>.
```

**Option B - vendor the files.**

```bash
git clone https://github.com/Pedro21062014/nova-design.git
cp nova-design/nova-design.md your-project/docs/
cp -r nova-design/examples nova-design/prompts your-project/docs/
```

Then add one line to your `AGENTS.md` or `CLAUDE.md`:

```md
UI work must follow docs/nova-design.md. Read only the line ranges the document's Task Map points
to, plus sections 0.4, 2, 6.12 and 9.5 which are always required.
```

**Option C - always-on rules for Cursor / Windsurf.** Copy `prompts/08-cursor-rules.mdc` into
`.cursor/rules/nova-vitral.mdc`.

**Option D - chat projects.** Use `prompts/09-claude-project-instructions.md` as the system
instruction and attach `nova-design.md` as knowledge.

## What is inside the spec

| Part | Contents |
|---|---|
| 0 | How to use the file, reading protocol, output contract, task map, index, tokens in 20 lines |
| 1 | Foundations: philosophy, color, glass physics, typography, spacing, radius, icons, motion principles, density, imagery |
| 2 | Tokens: full CSS variable set, Tailwind v4 and v3 mapping, primitive and semantic layers, TypeScript and Motion tokens, z-index policy, breakpoints, container queries, light mode |
| 3 | 32 components: buttons, surfaces, badges, forms, data display, navigation, hero, bento, spotlight, marquee, accordion, pricing, metrics, timeline, footer, overlays, toasts, tooltips, avatars, skeletons, charts, calendar, media, code blocks, features, CTA, scroll utilities, onboarding, settings, search |
| 4 | Chat scene: layout, message anatomy and types, markdown, streaming, reasoning, tool calls, composer, artifacts, citations, follow-up, sidebar, presence, settings, keyboard map, feedback, selection toolbar |
| 5 | Page blueprints: SaaS landing page, portfolio, pricing, docs, blog and changelog, dashboard and admin, auth and utility pages, waitlist, edge cases, SEO |
| 6 | Motion system: vocabulary, reveal, orchestration, scroll-linked, scrollytelling, parallax, horizontal scroll, pinning, route transitions, micro-interactions, ambient, reduced motion and performance, QA |
| 7 | Recipes: setup, the canonical vitral CSS, aurora, hero, scroll chrome, counters, marquee, theme toggle, the shadcn bridge, test snippets |
| 8 | Open-source references: what to borrow from shadcn/ui, Radix, Base UI, Motion, Aceternity, Magic UI, Origin UI, Tremor, Recharts, cmdk, Vaul, Sonner, Shiki and others, with licenses and attribution rules |
| 9 | Quality gates: accessibility, glass contrast audit, performance budget, visual QA, 30 anti-patterns, code review checklist, critique rubric, definition of done |
| 10 | Working with AI agents: loading patterns, prompt templates, task decomposition, token economy, self-review loop, failure modes, prompt library, session definition of done |
| 11 | Appendix: glossary, utilities, project structure, section primitive, copy guidelines, changelog, license |

## The example library (100 examples)

Each example states its base component, what it demonstrates, a code snippet, the motion behavior
and the spec sections it implements.

| File | Range | Theme |
|---|---|---|
| `examples/01-surfaces-glass.md` | EX-01 to EX-10 | Vitral panel, nesting, bento, spotlight, aurora, grain, marquee |
| `examples/02-controls-forms.md` | EX-11 to EX-20 | Buttons, inputs, combobox, OTP, switch, slider, dropzone, forms |
| `examples/03-navigation-shell.md` | EX-21 to EX-30 | Navbar, nav underline, sheet, sidebar, tabs, palette, menus, footer |
| `examples/04-heroes-marketing.md` | EX-31 to EX-40 | Hero, chat hero, trust row, alternating features, steps, FAQ, CTA |
| `examples/05-pricing-social-utility.md` | EX-41 to EX-50 | Pricing, comparison, testimonials, counters, 404, auth, waitlist |
| `examples/06-chat-scene.md` | EX-51 to EX-65 | Chat shell, thread, streaming, reasoning, tools, composer, artifacts |
| `examples/07-data-dashboards.md` | EX-66 to EX-78 | Stat tiles, charts, tables, virtualized feeds, filters, settings, audit |
| `examples/08-motion-interaction.md` | EX-79 to EX-90 | Reveal, stagger, parallax, scrollytelling, horizontal scroll, toasts |
| `examples/09-pages-assembly.md` | EX-91 to EX-100 | Docs, blog, changelog, dashboard, portfolio, pricing, legal, settings |

## Repository layout

```
nova-design.md              the assembled specification (generated, line-indexed)
spec/                       the modular source of the specification
scripts/build_spec.py       regenerates nova-design.md and its line index
prompts/                    master prompt plus twelve task-specific prompts
examples/                   100 named examples across nine themed files
README.md  AGENTS.md  LICENSE
```

## Editing the specification

Edit the files in `spec/`, then rebuild so the line index stays accurate:

```bash
python3 scripts/build_spec.py           # regenerates nova-design.md
python3 scripts/build_spec.py --check   # fails if the output is stale (used in CI)
```

Rules for contributors: keep the token block in `0.8` synchronized with `2.1`; add a component to
section 3 and to the component index in `3.32`; bump the version in `11.6`; keep the document free of
emojis and of any second competing visual language.

## Design rules in one paragraph

Dark ground with aurora light; glass is fill plus 1px gradient hairline plus inner highlight, and it
only exists when something sits behind it; accents are rationed to two per viewport; typography is
tight on headings and generous in measure; motion is 140/240/420/760ms with animation limited to
`transform` and `opacity`, fired once, and always disabled under `prefers-reduced-motion`;
accessibility and performance beat decoration whenever they conflict.

## Credits and inspiration

Nova Vitral composes ideas from permissively licensed projects: shadcn/ui (MIT), Radix UI
Primitives (MIT), Base UI (MIT), Motion / Framer Motion (MIT), Aceternity UI (MIT), Magic UI (MIT),
Motion Primitives (MIT), Origin UI (MIT), Animata (MIT), Tremor (Apache-2.0), Recharts (MIT),
TanStack Table and Virtual (MIT), cmdk (MIT), Vaul (MIT), Sonner (MIT), Shiki (MIT), KaTeX (MIT),
Geist and Inter (SIL OFL 1.1), lucide (ISC). Each technique was re-implemented against the Nova
Vitral token system; no visual identity was copied. See section 8 of the spec for the full table
with licenses and attribution guidance.

## Portugues (resumo)

**Nova Vitral** e uma especificacao de design para agentes de IA: um arquivo grande, indexado por
linha, que ensina qualquer modelo a gerar interfaces modernas e minimalistas com glassmorphism,
paginas profissionais completas e animacoes de scroll discretas.

Como usar:

1. Copie o prompt mestre em `prompts/00-master-prompt.md`, que lista **todos os links raw** e diz
   qual arquivo o agente deve ler para cada tarefa (tambem disponivel em portugues em
   `prompts/12-prompt-pt-BR.md`).
2. Deixe o `nova-design.md` na raiz do seu projeto, ou aponte o agente para o raw URL.
3. Para um componente especifico, mande o agente ler o exemplo correspondente em `examples/`
   (EX-01 a EX-100), que ja vem com codigo usando shadcn/ui, Tailwind e Motion.

O documento diz exatamente o que ler em cada situacao, evitando que a IA leia o arquivo inteiro.
Edite os arquivos em `spec/` e rode `python3 scripts/build_spec.py` para recalcular o indice de
linhas.

## License

MIT - see [`LICENSE`](./LICENSE). You may use, modify and redistribute this specification, including
inside commercial products. Attribution is appreciated: link back to this repository.

# AGENTS.md

Instructions for any AI agent working in this repository.

## What this repository is

A design specification, a prompt library and a 100-example component library for the **Nova Vitral**
design language: modern minimal UI with glassmorphism, dark aurora grounds, 1px hairlines, tight
typography, generous whitespace and restrained scroll-driven motion.

There is no application code to run. The deliverables are documents.

## Source of truth

| Artifact | Path | Notes |
|---|---|---|
| Specification | `nova-design.md` | Generated. Never edit directly; edit `spec/` and rebuild. |
| Specification source | `spec/*.md` | Modular parts, assembled in the order defined by `scripts/build_spec.py` |
| Line index and task map | `nova-design.md` sections 0.5 and 0.7 | Regenerated automatically |
| Examples | `examples/01-*.md` to `examples/09-*.md` | 100 examples, `EX-01` to `EX-100` |
| Example index | `examples/00-index.md` | Maps every example to its file, base component and theme |
| Prompts | `prompts/*.md` | Master prompt plus twelve task-specific prompts |

## Rules for editing the specification

1. **Never edit `nova-design.md` by hand.** Edit the matching file in `spec/` and run
   `python3 scripts/build_spec.py`.
2. Run `python3 scripts/build_spec.py --check` before committing; CI runs the same check.
3. Keep tokens synchronized: the quick block in `spec/00-intro.md` (section 0.8) must match the full
   set in `spec/02-tokens.md` (section 2.1).
4. When adding a component to section 3, also add it to the component index in `3.32` and, if it
   belongs to a page pattern, to the relevant blueprint in section 5.
5. When adding an example, keep the format: title with ID, base component, what it shows, code,
   motion behavior, spec references. Update `examples/00-index.md` and the file tables in
   `README.md` and `prompts/00-master-prompt.md`.
6. Bump the version and add a row to the changelog in `spec/11-appendix.md` (section 11.6).
7. No emojis anywhere. English only, in every file, including prompts.

## Design rules an agent must never break

1. Tokens only; no hex, shadow literal, radius, blur or duration inside a component.
2. Glass requires a background behind it (aurora, gradient or image).
3. shadcn/ui primitives are the base; skin them, never reimplement them.
4. Every interactive element ships with hover, focus-visible, active, disabled and loading states.
5. Every data surface ships with loading, empty and error states.
6. Motion ladder: 140 / 240 / 420 / 760ms; nothing above 900ms; entrances ease-out.
7. Scroll reveals fire once, travel 12 to 24px, stagger 60 to 80ms clamped.
8. Animate `transform` and `opacity` only; accordions use `grid-template-rows: 0fr to 1fr`.
9. `prefers-reduced-motion` always renders the final state.
10. Accessibility and performance beat decoration whenever they conflict.

## Commands

```bash
python3 scripts/build_spec.py           # rebuild nova-design.md and refresh the line index
python3 scripts/build_spec.py --check   # verify the generated file is current
wc -l nova-design.md examples/*.md prompts/*.md   # quick size overview
```

## Output contract when asked to generate UI from this repository

1. At most five lines of plan, then complete, named files.
2. State which spec sections and which example IDs (`EX-nn`) were followed.
3. Never truncate a file requested as complete.
4. Close with three bullets: built, omitted (and why), next step.

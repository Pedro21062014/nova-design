# 03 - Build a Single Component

Use for one reusable component with variants, states and accessibility. This is the most reliable
increment: one component, one file, reviewed before the next one.

---

## Prompt

```text
Read the Nova Vitral specification, sections 0.4, 2, 3, 6.10 (micro-interactions), 6.12 and 9.5:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Read the matching example for the exact technique, in one of these files:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/01-surfaces-glass.md
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/02-controls-forms.md
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/03-navigation-shell.md
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/07-data-dashboards.md
(Mention which example IDs you used.)

TASK
Build <ComponentName> in <path>.

API
Props: <list with types and defaults>
Variants: <list>
States: default, hover, focus-visible, active, disabled, loading, empty, error (only those that apply)
Sizes/responsiveness: <behavior at 320 / 768 / 1024+>

Constraints
- Base it on <shadcn component> and skin it with the Nova Vitral surface (spec 7.9 technique 2 or 3).
- Tokens only. No hex, no shadow literals, no arbitrary Tailwind values except one-off measurements.
- Forward refs, spread rest props, merge classNames with cn().
- Announce state changes with aria-live where relevant.
- Motion per spec 6.10: hover 140ms, press instant, focus ring never removed.
- Reduced motion: no movement, final state rendered.

Deliver
1. The component file, complete.
2. A usage example with three realistic props combinations.
3. A one-line note on which spec sections and which EX-nn examples you followed.
```

## Component library and templates (read before writing markup)

The repository ships 500 components and five complete pages. Prefer them over new markup.

| Need | Raw file |
|---|---|
| Registry of all 500, by category and kind | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/index.json |
| Flat index with paths | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/INDEX.md |
| Library rules and install | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/README.md |
| Five complete pages (landing, pricing, dashboard, chat, docs) | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/templates/README.md |
| Theme file that removes the shadcn purple | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/theme/nova-theme.css |

Flow: read `components/index.json`, open the two or three files that match the request, copy them,
then adapt the copy. If nothing matches, write the new component in the same shape (same prop names,
same tokens, same motion ladder: 140 to 760ms, 12 to 24px of travel, once).

## Color gate and motion floor (apply before anything else)

Closed set: `--bg`, `--bg-soft`, `--bg-elevated`, `--fg`, `--fg-muted`, `--fg-subtle`, `--glass`,
`--glass-strong`, `--glass-dim`, `--hair`, `--hair-strong`, `--accent` (#7c8cff), `--accent-2`
(#62e9d6), `--warn`, `--danger`, `--grad-primary`, `--grad-live`, `--grad-hairline`. Nothing else.
Rejected without discussion: `purple`, `violet`, `fuchsia`, `magenta`, `indigo-400/500/600` as fills,
`#8b5cf6`, `#a855f7`, `#7c3aed`, `oklch(` with high chroma, colored glows, multi-hue gradients,
gradient text outside a hero H1, more than one accent per viewport.

Replace: a purple or vivid fill becomes `var(--glass)` plus a `var(--hair)` border; a colored glow
becomes nothing, or a 1px `--hair-strong` ring on hover; a saturated status block becomes a dot, an
icon or a 12 percent chip in `--accent-2`, `--warn` or `--danger`; a multi-hue gradient becomes
`--grad-primary` on the single primary action, or a neutral surface.

Motion floor (a component with none is incomplete): an entrance (`nv-fade-up`, 16px, 760ms, once), a
hover response (2px lift or a fill step, 240ms), a press (0.98, 140ms), and a visible focus ring.
Scroll effects for sections and images: reveal, image veil uncover, staggered grid, one scroll-linked
element (parallax 0.04 to 0.12 or sticky scrollytelling), counters at 50 percent visibility. Recipes:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/prompts/13-scroll-motion-recipes.md

## Component checklist before the agent answers

| Check | Requirement |
|---|---|
| Variants | Driven by `cva` or a typed union, not string concatenation |
| Class merging | `cn()` with `tailwind-merge` so consumer overrides win |
| Ref forwarding | Yes for native elements; `asChild` where a wrapper is likely |
| Keyboard | Enter and Space activate; arrows where a group is controlled |
| Focus | Ring visible on `:focus-visible` only, never removed |
| ARIA | Roles, labels, `aria-expanded`, `aria-current`, `aria-live` as needed |
| Motion | 140ms hover, instant press, no layout-affecting animation |
| Reduced motion | Handled by hook or media query |
| Dark and light | Both themes verified |
| Empty/error | Only where data is involved, but always where data is involved |

## Frequently requested components and their references

| Component | Spec | Example |
|---|---|---|
| Glass card / panel | 3.2 | EX-01, EX-02 |
| Button with variants | 3.1 | EX-11, EX-12 |
| Input, field, form | 3.4 | EX-14, EX-20 |
| Select / combobox | 3.4, 3.18 | EX-15 |
| Modal, drawer, sheet | 3.16 | EX-23, EX-76 |
| Tooltip, popover, menu | 3.18 | EX-13, EX-28 |
| Tabs and segmented control | 3.6, 3.3 | EX-26, EX-09 |
| Table | 3.5 | EX-69 |
| Toast | 3.17 | EX-89 |
| Skeleton / empty / error | 3.20 | EX-72, EX-73, EX-74 |
| Stat tile and charts | 3.13, 3.21 | EX-66, EX-67, EX-68 |
| Chat message and composer | 4.3, 4.7 | EX-53, EX-54, EX-60 |
| Tool call and approval card | 4.9 | EX-58, EX-59 |
| Reveal and stagger wrappers | 6.2 | EX-79, EX-80 |
| Lightbox | 3.23 | EX-90 |

## Follow-up prompts

**Add a variant:**

```text
Add a "<name>" variant to <ComponentName> following the existing cva pattern. It must keep the same
height, focus behavior and motion timings. Show only the changed lines.
```

**Extract to the design system:**

```text
Move <ComponentName> into components/ui, add it to the Storybook/registry, and update the two
usages elsewhere in the project to import from the new path.
```

**Harden it:**

```text
Audit <ComponentName> against spec 9.6 (code review checklist) and 9.1 (accessibility).
Fix every issue and list them with the spec section that justifies each fix.
```

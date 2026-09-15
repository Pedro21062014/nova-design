# examples-sites - before and after showcase

Eleven self-contained HTML pages: one hub, five pages built with the **Nova Vitral** design system,
and five pages built with the **anti-patterns the specification forbids**, on purpose.

Open `index.html` in a browser. Every file carries its own CSS and JavaScript, so nothing loads from
the network and the pages work offline, inside sandboxed previews, or from a USB stick.

## The five pairs

| Brief | Built with the design system | Built with anti-patterns |
|---|---|---|
| SaaS landing page: hero, features, metrics, testimonials, FAQ, CTA | `nova-01-landing.html` | `generic-01-landing.html` |
| Pricing: three plans, billing toggle, comparison table, billing FAQ | `nova-02-pricing.html` | `generic-02-pricing.html` |
| Dashboard: app shell, KPI tiles, revenue chart, risk table, empty state | `nova-03-dashboard.html` | `generic-03-dashboard.html` |
| AI chat: rail, thread, reasoning, tool call, answer, composer | `nova-04-chat.html` | `generic-04-chat.html` |
| Documentation: page tree, article, code blocks, callouts, on-this-page rail | `nova-05-docs.html` | `generic-05-docs.html` |

Both columns carry the same product (Meridian, revenue analytics for subscription teams) and the same
content structure, so the difference you see is design, not scope. Every page links to its
counterpart in the top bar.

## What the Nova column demonstrates

- Neutral-first color: at least 90 percent of the pixels are ground, glass white or text grays.
- One accent per viewport, and it marks the primary action instead of decorating the page.
- Glass built from three layers (fill, gradient hairline edge, inner highlight) over a live aurora,
  so the blur has something to sample.
- Single-hue primary gradient, so the button does not look like a different product.
- Motion ladder of 140 / 240 / 420 / 760ms, reveals fire once, 16px of travel, staggered and capped.
- Real states: sticky table header, hover and focus states, an empty state next to the data, and a
  reduced-motion path that renders the final state.

## What the anti-pattern column demonstrates

Each page violates the numbered items of spec 9.5, and the header bar says so. Among them:
purple-to-blue gradients on every surface, neon accents, rainbow gradient text, emoji as icons,
three pulsing badges at once, everything flying in from the left over 1.2 seconds, cards scaling to
1.06 on hover, "Feature One" and lorem ipsum copy, "John Doe, CEO" testimonials, a spinner instead
of streaming with no stop control, a six-slice pie chart with no labels, and no empty, loading or
error states at all.

## How to use it

**As a reviewer.** Open a pair side by side, then read the anti-pattern page and ask which of those
items your own product accidentally has. The list is short enough to act on.

**As a prompt.** Point the agent at the specification and demand the discipline explicitly:

```text
Read https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md
sections 0.4, 1.2.1, 2, 6.2, 6.12 and 9.5.

Build a pricing page for <product> following blueprint 5.4.

Color discipline is mandatory: neutral ground first, one accent per viewport, no purple, violet,
neon or multi-hue gradients, primary buttons use the single-hue --grad-primary, and the page must
pass the grayscale test before you answer.
```

**As a teaching artifact.** The anti-pattern pages are safe to show a client or a junior designer:
they make "this looks like AI wrote it" concrete and measurable.

## Rebuilding

```bash
python3 scripts/build_showcase.py
```

The script regenerates all eleven files from `scripts/build_showcase.py`. Edit the CSS constants or
the page bodies there, never the generated HTML, so the pairs stay consistent.

## Note on fidelity

These are static demonstrations, not production code: the buttons do not submit, the composer does
not stream and the data is fabricated. For production snippets with real state handling, use the
100 markdown examples in `../examples/` and the spec sections they reference.

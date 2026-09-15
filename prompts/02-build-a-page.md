# 02 - Build a Complete Page

Use for landing pages, pricing pages, docs, blogs, dashboards, portfolio, legal, settings and any
other full page.

---

## Prompt

```text
Read the Nova Vitral specification, sections 0.4, 2, 5 (blueprints), 6 (motion), 9.5 (anti-patterns):
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Read the example file that matches this page type:
- Landing page:     https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/04-heroes-marketing.md
- Pricing page:     https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/05-pricing-social-utility.md
- Dashboard:        https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/07-data-dashboards.md
- Docs, blog, changelog, portfolio, legal, settings:
                    https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/09-pages-assembly.md
- Navigation, footer, app shell:
                    https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/03-navigation-shell.md
- Surfaces, bento, aurora:
                    https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/01-surfaces-glass.md

TASK
Build <page type> for <product>, targeting <audience>.

Content:
- Product: <one sentence of positioning>
- Sections in order: <list, or "follow blueprint 5.1 exactly">
- Primary action: <label and destination>
- Language and tone: <language, register>
- Real content hints: <features, metrics, names, prices>

Constraints:
- Follow the blueprint section order exactly; do not invent sections.
- Use tokens only (spec section 2). No hardcoded colors.
- Reveal animations: once, 16 to 24px, stagger capped, per spec 6.2 and 6.3.
- Every dynamic region needs loading, empty and error states.
- Responsive at 320, 768, 1024, 1440, 1920 with no horizontal scroll.
- Accessibility per spec 9.1: focus rings, semantics, AA contrast, reduced motion.

Deliver:
1. A five-line plan naming the sections and the spec sections you will follow.
2. Complete files, in order, with paths (app/page.tsx, components/marketing/hero.tsx, ...).
3. A short accessibility and performance note (max 5 lines).
4. Three closing bullets: built, omitted, next step.
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

## Composition rules the agent must respect

1. Alternating visual rhythm: never two bento-like sections in a row; every fourth section changes
   structure (full-bleed, split, centered band).
2. Vertical spacing: 96px between standard sections, 128px around hero, pricing and final CTA.
3. One idea per viewport; one primary action per screen.
4. Hero communicates the value in under five seconds at 375px width.
5. Copy is specific and benefit-led; no placeholder text, no invented percentages without a source
   label such as "internal benchmark".
6. Footer always present; legal and status links present on marketing pages.
7. Metadata: title under 60 characters, description under 155, one H1, OG image described.

## Reference implementations

Start each page from the closest complete page in `templates/`: `next-app/app/page.tsx` (landing),
`next-app/app/pricing/page.tsx` (pricing), `next-app/app/dashboard/page.tsx` (dashboard),
`next-app/app/chat/page.tsx` (AI workspace), `next-app/app/docs/page.tsx` (documentation),
`static-html/index.html` (no build step) and `astro/src/pages/index.astro` (Astro). Keep the section
order and the token names; replace the sample data.

## Section-by-section sourcing

| Section | Spec | Example |
|---|---|---|
| Navbar | 3.6 | EX-21, EX-22, EX-23 |
| Hero | 3.7 | EX-31, EX-32, EX-33 |
| Logo cloud / marquee | 3.10 | EX-10, EX-34 |
| Bento features | 3.8 | EX-03, EX-04 |
| Alternating features | 3.25 | EX-35 |
| Process steps | 3.14 | EX-36 |
| Metrics band | 3.13 | EX-45, EX-85 |
| Testimonials | 3.10 | EX-43, EX-44 |
| Pricing | 3.12 | EX-41, EX-42 |
| FAQ | 3.11 | EX-37 |
| Final CTA | 3.26 | EX-38 |
| Newsletter | 3.26 | EX-39 |
| Footer | 3.15 | EX-30 |

## Follow-up prompts

**Add a page:**

```text
Now build <page> using blueprint <5.x>. Reuse the existing Navbar, Footer and Section components.
Do not duplicate components that already exist; extend them with props.
```

**Wire real content:**

```text
Replace all placeholder content in <file> with the following real content: <paste>.
Keep the layout and tokens unchanged. If the copy does not fit the layout, adjust tracking or
truncate, never shrink the type scale below the token values.
```

**Add SEO and metadata:**

```text
Add metadata per spec 5.11: title, description, canonical, OG and Twitter tags, and structured
data (Organization, WebSite, Product, FAQPage) for <page>. Show only the changed exports.
```

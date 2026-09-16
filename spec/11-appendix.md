## 11. Appendix

### 11.1 Glossary

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

### 11.2 Utility functions

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

### 11.3 Recommended project structure

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

### 11.4 Section wrapper (layout primitive)

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

### 11.5 Copy guidelines

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

### 11.6 Spec changelog and maintenance

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-09-15 | First release: foundations, tokens, 32 components, chat scene, blueprints, motion, recipes, 100 examples, prompt library |
| 1.1.0 | 2026-09-15 | Color discipline (1.2.1): neutral-first, single-hue primary gradient, purple and neon banned by default, grayscale test; aurora softened; before/after showcase site added |
| 1.2.3 | 2026-09-15 | Master prompt: reading the raw sources is now mandatory, with the minimum reading per task, the source line in the output, and an explicit stop-and-ask protocol when a fetch fails; prompt 14 (offline conformance prompt) added for agents with no web access, mirrored in section 0.9 |
| 1.2.2 | 2026-09-15 | Color gate: section 1.2.1 gains the closed set of allowed values, the rejection table and the five tells of machine-generated UI; section 6.14 (minimum motion baseline) added, which resolves the dangling 6.14 references in the prompts and components; section 6.15 (images and media on scroll) added; prompt 13 (scroll motion and image recipes) routed from the master prompt, the task prompts and the rule sets |
| 1.2.1 | 2026-09-15 | Specification file renamed from `nova-design.md` to `design.md`; section 0.2 rewritten to state that the file is a design system specification (input, never output), that it must not be built or rendered, and that nothing may be named after its filename |
| 1.2.0 | 2026-09-15 | Component library (500 components in 26 categories) and five complete page templates added; routing section 0.8; theme file with the shadcn variable remap; lucide-only icon rule; minimum motion baseline (6.14) restated for pasted components |

Maintenance: run `python3 scripts/build_spec.py` after every edit to refresh the line index and the
task map anchors. Keep the token block in `0.11` synchronized with `2.1`. Bump the minor version when
adding components or blueprints; bump the patch for wording or line-index-only changes.

### 11.7 License and reuse

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

### 11.8 Final note to the agent

You now hold a complete design language. Build inside it. When a request is ambiguous, prefer the
simpler, calmer, more legible solution; when a request is vague about styling, apply this system
without asking; when a request conflicts with accessibility, accessibility wins. Deliver complete,
runnable, professional work, and state clearly what you did not do.

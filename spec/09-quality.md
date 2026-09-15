## 9. Quality Gates

### 9.1 Accessibility (WCAG 2.2 AA, non-negotiable)

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

### 9.2 Accessibility audit recipe for glass interfaces

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

### 9.3 Performance budget

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

### 9.4 Visual QA checklist

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

### 9.5 Anti-patterns (what makes a page look machine-generated)

**Visual**

1. Purple-to-blue gradient used on every surface and button.
2. Glass panels over a flat background (no aurora), producing gray mud.
3. More than two accent colors in a viewport; accent used for decoration instead of action.
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

### 9.6 Code review checklist for generated UI

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

### 9.7 Design critique rubric (score each 0 to 5)

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

### 9.8 Definition of done

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

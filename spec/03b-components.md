### 3.11 Accordion, FAQ and tabbed showcases

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

### 3.12 Pricing

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

### 3.13 Metrics, counters and KPI tiles

- Counters animate from 0 to the target over 1.2s with an ease-out curve when scrolled into view,
  once; format with `Intl.NumberFormat`; preserve the suffix (`k`, `%`, `ms`).
- KPI tile: label, value, delta chip, sparkline (32px tall, 24 points), comparison caption.
- Delta chip: arrow plus value, `--accent-2` for positive, `--danger` for negative; a positive
  delta in a "lower is better" metric must be inverted.
- Never animate more than four counters at once; group them in one viewport.
- Money and counts use tabular numbers so digits do not shift while animating.

### 3.14 Timeline, steps and roadmap

| Variant | Structure | Use |
|---|---|---|
| Vertical timeline | 1px rail at 16px, dots 10px with halo for the active item, alternating content on desktop | Company history, changelog |
| Process steps | 3 to 4 numbered cards, connector arrows or a gradient line, reveal staggered | Onboarding explainer |
| Roadmap | Three columns: Now, Next, Later; glass cards with status chips; items link to detail | Public roadmap |
| Progress path | Horizontal rail with checkpoints and a filled progress line to the current step | Onboarding, wizard |

Rules: the rail uses `--hair`, the completed segment uses `--grad-live`; the active dot pulses
once on entry; never more than seven items in a vertical timeline without collapsing the rest.

### 3.15 Footer

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

### 3.16 Overlays: modal, drawer, sheet, confirm

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

### 3.17 Toasts and notifications

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

### 3.18 Tooltip, popover and dropdown menu

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

### 3.19 Avatars, user menu and presence

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

### 3.20 Skeleton, loading, empty and error states

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

### 3.21 Charts and data visualization

**Chart language**

- Library: Recharts for standard charts, visx for bespoke work, Tremor for quick panels.
- Grid: horizontal lines only, `--hair-soft`, 1px, no vertical grid, no chart border, no dashboards
  filled with boxes.
- Axis: labels `--fs-2xs`, `--fg-subtle`, 4 ticks maximum on X, 4 on Y, tick line hidden.
- Series palette, in order: `--accent`, `--accent-2`, `--accent-3`, `--warn`, `--danger`.
  Maximum 5 series; beyond that use small multiples.
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

### 3.22 Calendar, date picker and scheduling

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

### 3.23 File upload, media and lightbox

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

### 3.24 Code blocks, terminal and diff viewer

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

### 3.25 Feature sections, comparison and integrations

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

### 3.26 Call to action, newsletter and waitlist

**CTA band**: full-width glass panel, `--radius-xl`, aurora glow inside, centered content,
max 3 lines of copy, primary plus secondary action, optional trust micro-copy under buttons.
Variant: split CTA with a metric on the right (for example "12,400 teams shipped this week").

**Newsletter**: inline input plus button in one glass shell (input borderless inside the shell),
320 to 420px wide, success swaps to a check with a confirmation line, validation inline, honeypot
field plus timing check against bots, and a privacy line in `--fs-2xs`.

**Waitlist**: email plus optional role select, position counter that animates in after submit,
"invite to skip the line" share row with a copyable link and social buttons, plus a
three-item "what you get" list.

### 3.27 Scroll utilities

| Utility | Behavior |
|---|---|
| Scroll progress bar | 2px accent line at the top, `transform: scaleX()` driven by scroll ratio, no re-render (rAF plus CSS variable) |
| Back to top | Appears after 1.5 viewports, glass circle 40px, smooth scroll, respects reduced motion (instant) |
| Sticky section header | Section title sticks under the navbar with a growing hairline and shrinking type |
| Scroll spy | Nav link underlines follow the active section using IntersectionObserver at 30 percent |
| Scroll shadow | Panels gain a top shadow when their content is scrolled |
| Snap sections | `scroll-snap-type: y proximity` only for full-screen stories, never for normal pages |
| Hash reveal | A hash link opens the target accordion or tab and flashes a 1s accent ring |

### 3.28 Onboarding, stepper and product tour

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

### 3.29 Settings and preferences UI

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

### 3.30 Search results and filters

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

## 3. Component Library

Every component entry follows the same structure: purpose, props or API, states, markup,
and behavior notes. Snippets are production-ready starting points, not pseudocode.
Unless stated otherwise, snippets assume: Next.js App Router, TypeScript, Tailwind v4 mapped to
the tokens of Section 2, and `cn()` from Section 11.2.

### 3.1 Buttons

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
    "bg-[linear-gradient(135deg,var(--accent),var(--accent-3))] " +
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

### 3.2 Surfaces: glass panel, card, tile, sheet

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

### 3.3 Badges, chips and pills

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

### 3.4 Form controls

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

### 3.5 Data display: tables, lists, key-value, stats

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

### 3.6 Navigation: navbar, menu, sidebar, tabs, command palette

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

### 3.7 Hero

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

### 3.8 Bento grid

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

### 3.9 Spotlight and pointer-reactive surfaces

Three levels of pointer reaction, from cheap to expensive:

| Level | Effect | Cost | Where |
|---|---|---|---|
| 1 | Border highlight toward the pointer | one CSS variable | Cards in grids |
| 2 | Radial specular following the pointer | one listener per card | Feature cards, pricing |
| 3 | Magnetic tilt (max 6 degrees) with shadow shift | transforms on move, throttled with rAF | Hero visual, single featured card |

Rules: never combine tilt with specular sweep on the same element; disable all three on coarse
pointers and under reduced motion; throttle with `requestAnimationFrame`; cap listeners to
visible cards using an `IntersectionObserver`.

### 3.10 Marquee, logo cloud and testimonials

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

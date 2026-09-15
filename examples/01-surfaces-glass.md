# Examples 01 to 10 - Surfaces and Glass

Part of the Nova Vitral example library (100 examples total). Index: `examples/00-index.md`.
Every example assumes the tokens of `nova-design.md` section 2 and the surfaces of section 7.2.

---

## EX-01 - Vitral panel (the base surface)

**Base:** custom (or `shadcn` Card with the `vitral` class)
**Shows:** fill, hairline edge, inner highlight, specular sweep
**Requires:** an aurora, image or gradient behind it (section 1.3 rule 1)

```tsx
export function VitralPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("vitral vitral-specular relative overflow-hidden p-6", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)]" />
      {children}
    </div>
  );
}
```

**Motion:** specular opacity 0 to 1 in 240ms on hover (fine pointers only); no transform.
**Refs:** 3.2, 7.2, 9.4 (hairline at 1px on every DPR)

---

## EX-02 - Nested panel (panel inside panel)

**Base:** custom
**Shows:** how to nest glass without stacking blur (section 1.3 rule 5)

```tsx
<div className="vitral p-2">
  {/* inner surfaces lose their own blur and rely on edge contrast */}
  <div className="rounded-[var(--radius)] border border-[var(--hair)] bg-[var(--glass-dim)] p-5">
    <h3 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">Workspace limits</h3>
    <div className="mt-4 rounded-[var(--radius-sm)] border border-[var(--hair-soft)] bg-[var(--bg-elevated)]/60 p-3 font-[var(--font-mono)] text-[var(--fs-xs)] text-[var(--fg-muted)]">
      rate_limit: 600 rpm
    </div>
  </div>
</div>
```

**Motion:** none inside nested panels; motion belongs to the outer surface only.
**Refs:** 3.2, 7.2 (`.vitral .vitral` rule)

---

## EX-03 - Bento feature grid

**Base:** custom grid + VitralPanel cells
**Shows:** mixed spans, one hero cell, uniform row height

```tsx
const cells = [
  { span: "md:col-span-4 md:row-span-2", title: "Realtime sync", copy: "Every keystroke lands everywhere in under 80ms.", media: <OrbitVisual /> },
  { span: "md:col-span-2", title: "Audit log", copy: "Every action, attributed and exportable." },
  { span: "md:col-span-2", title: "SSO and SCIM", copy: "Provision and deprovision from your IdP." },
  { span: "md:col-span-2", title: "Webhooks", copy: "Signed payloads with retries and replay." },
  { span: "md:col-span-2", title: "Fine-grained RBAC", copy: "Roles scoped to a project or an environment." },
];

export function Bento() {
  return (
    <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
      {cells.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.06} className={c.span}>
          <VitralPanel className="h-full">
            <h3 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">{c.title}</h3>
            <p className="mt-2 text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">{c.copy}</p>
            {c.media}
          </VitralPanel>
        </Reveal>
      ))}
    </div>
  );
}
```

**Motion:** stagger 60ms by grid order; cells rise 16px; media scales 0.98 to 1 once.
**Refs:** 3.8, 6.2, 5.1 section 5

---

## EX-04 - Spotlight card (pointer-following light)

**Base:** custom (technique inspired by Aceternity UI, MIT)
**Shows:** one pointer listener per card, CSS variable, no re-render

```tsx
"use client";
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove}
      className={cn("vitral vitral-specular group relative overflow-hidden p-6", className)}>
      {/* accent glow that follows the pointer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[240ms] group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx,50%) var(--my,0%), var(--accent-soft), transparent 70%)" }} />
      {children}
    </div>
  );
}
```

**Motion:** opacity only; never animate the gradient position with JS.
**Refs:** 3.9, 6.12 (listener budget)

---

## EX-05 - Gradient border card (hairline lit from the top-left)

**Base:** custom
**Shows:** masked gradient border without extra DOM weight

```css
.edge-lit {
  position: relative;
  border-radius: var(--radius-lg);
  background: var(--glass);
  backdrop-filter: blur(var(--blur)) saturate(140%);
}
.edge-lit::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(from 210deg at 20% 0%,
    rgba(255,255,255,.34), rgba(255,255,255,.05) 40%, rgba(124,140,255,.28) 65%, rgba(255,255,255,.06));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
```

**Motion:** rotate the `from` angle on hover via a CSS variable, 600ms `--ease-out` (optional).
**Refs:** 1.6, 3.2

---

## EX-06 - Glass KPI tile (inset metric)

**Base:** `shadcn` Card skin
**Shows:** the mapping between shadcn's variables and Nova Vitral tokens

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiTile({ label, value, delta, hint }: KpiProps) {
  return (
    <Card className="vitral rounded-[var(--radius-lg)] border-0 p-6 shadow-[var(--shadow-2)]">
      <CardHeader className="p-0">
        <CardTitle className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-3">
        <div className="flex items-baseline gap-3">
          <span className="font-[var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tabular-nums text-[var(--fg)]">
            {value}
          </span>
          <span className={cn("text-[var(--fs-xs)] tabular-nums", delta >= 0 ? "text-[var(--accent-2)]" : "text-[var(--danger)]")}>
            {delta >= 0 ? "+" : ""}{delta}%
          </span>
        </div>
        <p className="mt-2 text-[var(--fs-xs)] text-[var(--fg-subtle)]">{hint}</p>
      </CardContent>
    </Card>
  );
}
```

**Motion:** value count-up once on view (EX-85).
**Refs:** 3.13, 7.9 (shadcn bridge)

---

## EX-07 - Aurora background

**Base:** custom, fixed layer
**Shows:** three drifting blobs at controlled opacity plus grain

```tsx
export function Aurora({ intensity = 1 }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]">
      <div className="aurora absolute -top-[20%] left-[-10%] size-[70vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle at 30% 30%, var(--aurora-1), transparent 62%)", opacity: 0.9 * intensity, animation: "drift-a 38s ease-in-out infinite" }} />
      <div className="aurora absolute right-[-15%] top-[8%] size-[55vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle at 60% 40%, var(--aurora-3), transparent 60%)", opacity: 0.85 * intensity, animation: "drift-b 44s ease-in-out infinite" }} />
      <div className="aurora absolute bottom-[-25%] left-[22%] size-[60vmax] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--aurora-2), transparent 58%)", opacity: 0.7 * intensity, animation: "drift-c 30s ease-in-out infinite" }} />
      <div className="grain absolute inset-0" />
    </div>
  );
}
```

**Motion:** ambient only, 30 to 44s, total opacity under 0.45, disabled under reduced motion.
**Refs:** 7.3, 6.11, 9.2 (contrast under an animated backdrop)

---

## EX-08 - Grain overlay

**Base:** custom
**Shows:** a dependency-free noise layer as an inline SVG data URI

```css
.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.035;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

**Motion:** static is enough; if animated, 8s position shift at 60fps cost.
**Refs:** 1.3 rule 6, 6.11

---

## EX-09 - Segmented glass control (monthly / annual)

**Base:** `shadcn` Tabs or custom
**Shows:** sliding indicator with `layoutId`, ARIA-correct toggle group

```tsx
"use client";
export function Segmented({ value, onChange, options }: SegmentedProps) {
  return (
    <div role="tablist" className="vitral inline-flex rounded-full p-1">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "relative h-8 rounded-full px-4 text-[var(--fs-xs)] font-medium transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
            value === o.value ? "text-[var(--fg)]" : "text-[var(--fg-subtle)] hover:text-[var(--fg-muted)]",
          )}
        >
          {value === o.value && (
            <motion.span layoutId="segmented-pill" transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full border border-[var(--hair)] bg-[var(--glass-strong)]" />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {o.label}
            {o.chip && <span className="rounded-full bg-[var(--accent-soft)] px-1.5 text-[10px] text-[var(--accent)]">{o.chip}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
```

**Motion:** indicator slides 240ms `--ease-out`; label color 140ms.
**Refs:** 3.3, 3.12 step 2, 6.10

---

## EX-10 - Marquee logo strip with pause and mask

**Base:** custom CSS
**Shows:** duplicated track, mask fade, hover pause, reduced-motion fallback

```tsx
export function LogoMarquee({ logos }: { logos: { name: string; svg: React.ReactNode }[] }) {
  const track = (
    <div className="marquee__track">
      {logos.map((l) => (
        <span key={l.name} className="flex h-7 items-center gap-2 text-[var(--fg)] opacity-55 transition-opacity hover:opacity-100">
          {l.svg}
          <span className="text-[var(--fs-sm)] font-medium tracking-[-0.01em]">{l.name}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label="Trusted by">
      {track}
      <div aria-hidden className="marquee__track">{track}</div>
    </div>
  );
}
```

**Motion:** 40s linear infinite; pause on hover and focus; static wrapped grid under reduced motion.
**Refs:** 3.10, 7.7, 6.12

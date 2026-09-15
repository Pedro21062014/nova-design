# Examples 41 to 50 - Pricing, Social Proof and Utility Pages

Part of the Nova Vitral example library. Index: `examples/00-index.md`.

---

## EX-41 - Three-tier pricing with billing toggle

**Base:** `shadcn` Card skin + segmented control (EX-09)
**Shows:** recommended plan emphasis without turning the page into three neon boxes

```tsx
export function Pricing({ plans, annual }: { plans: Plan[]; annual: boolean }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.08}
          className={cn(p.featured && "lg:-mt-4 lg:mb-4")}>
          <div className={cn(
            "vitral relative flex h-full flex-col p-7",
            p.featured && "border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent)_7%,var(--glass))]",
          )}>
            {p.featured && (
              <span className="absolute -top-2.5 left-7 rounded-full border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[var(--bg)] px-2.5 py-0.5 text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--accent)]">
                Most popular
              </span>
            )}
            <h3 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">{p.name}</h3>
            <p className="mt-1.5 text-[var(--fs-sm)] text-[var(--fg-muted)]">{p.blurb}</p>

            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="font-[var(--font-display)] text-[2.5rem] font-semibold tabular-nums tracking-[-0.03em] text-[var(--fg)]">
                ${annual ? p.annual : p.monthly}
              </span>
              <span className="text-[var(--fs-sm)] text-[var(--fg-subtle)]">/month</span>
            </div>
            <p className="mt-1 text-[var(--fs-xs)] text-[var(--fg-subtle)]">
              {annual ? `Billed $${p.annual * 12} yearly` : "Billed monthly"}
            </p>

            <Button className="mt-6" variant={p.featured ? "vitral" : "glass"} full>
              {p.cta}
            </Button>
            <p className="mt-2 text-center text-[var(--fs-2xs)] text-[var(--fg-subtle)]">{p.note}</p>

            <ul className="mt-7 grid gap-3 border-t border-[var(--hair-soft)] pt-6">
              {p.features.map((f) => (
                <li key={f.label} className={cn("flex items-start gap-2.5 text-[var(--fs-sm)]", f.included ? "text-[var(--fg-muted)]" : "text-[var(--fg-subtle)] line-through decoration-[var(--hair-strong)]")}>
                  <Check className={cn("mt-0.5 size-3.5 shrink-0", f.included ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]")} aria-hidden />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

**Motion:** cards rise 16px with 80ms stagger; the recommended card arrives 60ms later; prices swap with a 200ms fade when the toggle changes (width reserved).
**Refs:** 3.12, 5.4

---

## EX-42 - Feature comparison table with sticky header

**Base:** `shadcn` Table
**Shows:** sticky thead, sticky first column, accent column for the own product

```tsx
export function Comparison({ rows, competitors }: ComparisonProps) {
  return (
    <div className="vitral overflow-hidden p-0">
      <div className="max-h-[640px] overflow-auto">
        <table className="w-full border-collapse text-[var(--fs-sm)]">
          <thead className="sticky top-0 z-[var(--z-sticky)] backdrop-blur-[var(--blur-sm)]"
            style={{ background: "color-mix(in srgb, var(--bg-soft) 82%, transparent)" }}>
            <tr className="text-left">
              <th scope="col" className="sticky left-0 bg-[var(--bg-soft)] px-5 py-3 text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">Capability</th>
              <th scope="col" className="px-5 py-3 text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--accent)]">Product</th>
              {competitors.map((c) => (
                <th key={c} scope="col" className="px-5 py-3 text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-[var(--hair-soft)] transition-colors hover:bg-[var(--glass-dim)]">
                <th scope="row" className="sticky left-0 bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] px-5 py-3 text-left font-normal text-[var(--fg-muted)]">{r.label}</th>
                <td className="px-5 py-3"><Cell value={r.us} accent /></td>
                {r.them.map((v, i) => <td key={i} className="px-5 py-3"><Cell value={v} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Cell({ value, accent }: { value: boolean | "partial"; accent?: boolean }) {
  if (value === "partial") return <span className="text-[var(--warn)]" title="Partial support">◐</span>;
  return value
    ? <Check className={cn("size-4", accent ? "text-[var(--accent)]" : "text-[var(--accent-2)]")} aria-label="Included" />
    : <Minus className="size-4 text-[var(--fg-subtle)]" aria-label="Not included" />;
}
```

**Motion:** none inside tables; only the row hover background at 120ms.
**Refs:** 3.5, 3.25, 5.4 step 4

---

## EX-43 - Testimonial card

**Base:** `shadcn` Card skin
**Shows:** quote hierarchy, attribution with role and company, no invented CEO names

```tsx
<figure className="vitral flex h-full flex-col p-7">
  <Quote className="size-6 text-[var(--accent)] opacity-70" aria-hidden />
  <blockquote className="mt-4 text-[var(--fs-body)] leading-relaxed text-[var(--fg)]">
    We replaced four weeks of design review with one spec file. Our agent ships pages that already
    look like our product, so review is about content, not cleanup.
  </blockquote>
  <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--hair-soft)] pt-5">
    <span className="grid size-9 place-items-center rounded-full border border-[var(--hair)] text-[var(--fs-xs)] font-medium text-white"
      style={{ background: avatarGradient("ana.silva") }}>AS</span>
    <div className="min-w-0">
      <p className="truncate text-[var(--fs-sm)] font-medium text-[var(--fg)]">Ana Silva</p>
      <p className="truncate text-[var(--fs-xs)] text-[var(--fg-subtle)]">Head of Product, Northwind</p>
    </div>
  </figcaption>
</figure>
```

**Motion:** none on the card itself; the wall around it may stagger on reveal.
**Refs:** 3.10, 9.5 anti-pattern 21

---

## EX-44 - Testimonial wall with column parallax

**Base:** custom + `useScroll`
**Shows:** two columns offset with a 0.04 parallax factor for depth

```tsx
"use client";
export function TestimonialWall({ items }: { items: Testimonial[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 120, damping: 26 });
  const yRight = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), { stiffness: 120, damping: 26 });

  const half = Math.ceil(items.length / 2);
  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-2">
      <motion.div style={{ y: yLeft }} className="grid content-start gap-5">{[...items].slice(0, half).map((t) => <TestimonialCard key={t.id} {...t} />)}</motion.div>
      <motion.div style={{ y: yRight }} className="grid content-start gap-5 md:mt-12">{[...items].slice(half).map((t) => <TestimonialCard key={t.id} {...t} />)}</motion.div>
    </div>
  );
}
```

**Motion:** parallax 0.04 factor, spring-damped; completely disabled under reduced motion.
**Refs:** 3.10 variant 2, 6.6

---

## EX-45 - Metrics band with animated counters

**Base:** custom + `Counter` (EX-85)
**Shows:** four numbers with context captions, tabular figures that do not shift

```tsx
<div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
  {stats.map((s, i) => (
    <Reveal key={s.label} delay={i * 0.08}>
      <p className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--fg)]">
        <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
      </p>
      <p className="mt-2 text-[var(--fs-sm)] text-[var(--fg-muted)]">{s.label}</p>
      <p className="mt-1 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">{s.context}</p>
    </Reveal>
  ))}
</div>
```

**Motion:** count-up 1.2s once per viewport, maximum four counters animating at the same time.
**Refs:** 3.13, 7.6

---

## EX-46 - 404 page

**Base:** custom
**Shows:** oversized numeral behind glass, two clear exits, floating motion kept subtle

```tsx
export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center px-[var(--gutter)]">
      <Aurora intensity={0.6} />
      <span aria-hidden className="pointer-events-none absolute select-none font-[var(--font-display)] text-[28vw] font-semibold leading-none tracking-[-0.06em] text-transparent"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.10), transparent 70%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
        404
      </span>
      <div className="vitral relative w-full max-w-[520px] p-8 text-center">
        <span className="mx-auto grid size-10 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
          <Compass className="size-4 text-[var(--accent)]" aria-hidden />
        </span>
        <h1 className="mt-5 text-[var(--fs-h3)] font-semibold text-[var(--fg)]">This page moved or never existed</h1>
        <p className="mt-2 text-[var(--fs-sm)] text-[var(--fg-muted)]">
          Check the URL, or jump back to somewhere useful.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild><Link href="/">Back home</Link></Button>
          <Button variant="glass" asChild><Link href="/search">Search the docs</Link></Button>
        </div>
      </div>
    </main>
  );
}
```

**Motion:** the numeral drifts 6px over 4s (ambient, off under reduced motion).
**Refs:** 5.8, 6.11

---

## EX-47 - Sign-in split layout

**Base:** `shadcn` Form + Button
**Shows:** 360px form column, provider buttons above a divider, aurora panel hidden under 1024px

```tsx
export default function SignIn() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1fr_minmax(0,44%)]">
      <div className="grid place-items-center px-[var(--gutter)] py-16">
        <div className="w-full max-w-[360px]">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--fs-sm)] font-semibold text-[var(--fg)]">
            <Logo className="size-4 text-[var(--accent)]" /> Product
          </Link>
          <h1 className="mt-8 text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">Sign in</h1>
          <p className="mt-1.5 text-[var(--fs-sm)] text-[var(--fg-muted)]">
            Continue with your workspace account.
          </p>

          <div className="mt-7 grid gap-2.5">
            <Button variant="glass" full iconLeft={<Chrome className="size-4" />}>Continue with Google</Button>
            <Button variant="glass" full iconLeft={<Github className="size-4" />}>Continue with GitHub</Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[var(--hair)]" />
            <span className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">or</span>
            <span className="h-px flex-1 bg-[var(--hair)]" />
          </div>

          <form className="grid gap-4">
            {/* Field components from EX-14, then the submit button from EX-12 */}
          </form>

          <p className="mt-6 text-center text-[var(--fs-xs)] text-[var(--fg-subtle)]">
            No account? <Link href="/sign-up" className="text-[var(--accent)] underline-offset-4 hover:underline">Create one</Link>
          </p>
        </div>
      </div>

      <aside aria-hidden className="relative hidden overflow-hidden border-l border-[var(--hair)] lg:block">
        <Aurora intensity={0.8} />
        <div className="relative grid h-full place-items-center p-12">
          <figure className="vitral max-w-[420px] p-7">
            <blockquote className="text-[var(--fs-body)] leading-relaxed text-[var(--fg)]">
              Onboarding went from a two-week design pass to a single afternoon of review.
            </blockquote>
            <figcaption className="mt-4 text-[var(--fs-xs)] text-[var(--fg-subtle)]">
              Rafael Lima, Engineering Lead at Aurora Labs
            </figcaption>
          </figure>
        </div>
      </aside>
    </main>
  );
}
```

**Motion:** none on load; focus states only. Auth pages must feel instant.
**Refs:** 5.8, 3.4

---

## EX-48 - Sign-up with password strength

**Base:** `shadcn` Form + custom meter
**Shows:** strength as a discrete 4-step meter with guidance, not a color-only signal

```tsx
"use client";
export function PasswordField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const checks = [
    { label: "12 characters or more", ok: value.length >= 12 },
    { label: "A number", ok: /\d/.test(value) },
    { label: "Upper and lower case", ok: /[a-z]/.test(value) && /[A-Z]/.test(value) },
    { label: "A symbol", ok: /[^A-Za-z0-9]/.test(value) },
  ];
  const score = checks.filter((c) => c.ok).length;

  return (
    <div className="grid gap-2">
      <Field id="password" label="Password" type="password" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="flex gap-1.5" aria-hidden>
        {checks.map((c, i) => (
          <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-[200ms]",
            i < score ? (score <= 2 ? "bg-[var(--warn)]" : "bg-[var(--accent-2)]") : "bg-[var(--hair)]")} />
        ))}
      </div>
      <p className="text-[var(--fs-xs)] text-[var(--fg-subtle)]" aria-live="polite">
        {score <= 2 ? "Needs more variety" : score === 3 ? "Good" : "Strong"} · {checks.filter(c => !c.ok).map(c => c.label).join(", ") || "All requirements met"}
      </p>
    </div>
  );
}
```

**Motion:** 200ms color transitions; no shake, no bounce.
**Refs:** 5.8, 9.1 (never color alone)

---

## EX-49 - Waitlist with referral position

**Base:** custom
**Shows:** position counter, copyable referral link, share row

```tsx
export function WaitlistThanks({ position, referral }: { position: number; referral: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="vitral mx-auto max-w-[520px] p-8 text-center">
      <span className="mx-auto grid size-10 place-items-center rounded-full bg-[var(--accent-soft)]">
        <Check className="size-4 text-[var(--accent)]" aria-hidden />
      </span>
      <h2 className="mt-5 text-[var(--fs-h3)] font-semibold text-[var(--fg)]">You are in</h2>
      <p className="mt-2 text-[var(--fs-sm)] text-[var(--fg-muted)]">
        You are <span className="font-medium tabular-nums text-[var(--fg)]">#{position}</span> in line.
        Invite two people to move up 20 spots.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-[var(--radius)] border border-[var(--hair)] bg-[var(--glass-dim)] p-1.5">
        <span className="flex-1 truncate px-2 text-left font-[var(--font-mono)] text-[var(--fs-xs)] text-[var(--fg-muted)]">{referral}</span>
        <Button size="sm" variant="glass"
          onClick={async () => { await navigator.clipboard.writeText(referral); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
          iconLeft={copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}>
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
```

**Motion:** position counts up from 0 in 1.2s; the copy icon swaps with no toast.
**Refs:** 5.9, 3.31

---

## EX-50 - Consent bar

**Base:** custom
**Shows:** non-blocking, three real choices, remembered decision

```tsx
<div role="region" aria-label="Cookie preferences"
  className="vitral-strong fixed bottom-4 left-4 right-4 z-[var(--z-toast)] mx-auto flex max-w-[560px] flex-col gap-3 p-4 sm:flex-row sm:items-center">
  <p className="text-[var(--fs-xs)] leading-relaxed text-[var(--fg-muted)]">
    We use cookies for analytics and to remember your theme. Read the{" "}
    <Link href="/privacy" className="text-[var(--accent)] underline-offset-4 hover:underline">privacy policy</Link>.
  </p>
  <div className="flex shrink-0 items-center gap-2">
    <Button size="xs" variant="ghost" onClick={() => setPrefs("essential")}>Essential only</Button>
    <Button size="xs" onClick={() => setPrefs("all")}>Accept all</Button>
  </div>
</div>
```

**Motion:** rises 12px on mount after 600ms (never before content paints); slides out on decision.
**Refs:** 5.8 (legal and cookie banner), 3.17

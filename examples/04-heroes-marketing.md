# Examples 31 to 40 - Heroes and Marketing Sections

Part of the Nova Vitral example library. Index: `examples/00-index.md`.

---

## EX-31 - Hero with sequential load animation

**Base:** custom + `Reveal`
**Shows:** pill, gradient H1, lead, actions, visual anchor in 80ms cascade

```tsx
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+96px)] pb-24">
      <Aurora />
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] text-center">
        <Reveal delay={0}>
          <a href="#changelog" className="vitral inline-flex h-8 items-center gap-2 rounded-full px-3 text-[var(--fs-xs)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]">
            <span className="size-1.5 rounded-full bg-[var(--accent-2)]" aria-hidden />
            v2.4 shipped: streaming artifacts
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-vitral mx-auto mt-6 max-w-[18ch] text-balance font-[var(--font-display)] text-[var(--fs-display)] font-semibold leading-[0.96] tracking-[-0.04em]">
            Ship interfaces that feel engineered
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-[46ch] text-pretty text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
            A design specification your agent can read and apply: glass surfaces, restrained motion
            and complete professional pages.
          </p>
        </Reveal>

        <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" iconRight={<ArrowRight className="size-4" />}>Start building</Button>
          <Button size="lg" variant="glass">Read the spec</Button>
        </Reveal>

        <Reveal delay={0.48} className="mt-16">
          <div className="vitral vitral-specular mx-auto aspect-[16/10] w-full max-w-[1080px] p-2">
            <div className="size-full overflow-hidden rounded-[calc(var(--radius-lg)-8px)] bg-[var(--bg-elevated)]">
              {/* product screenshot or live preview */}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

**Motion:** 0 / 80 / 200 / 320 / 480ms cascade, visual anchor scales 0.97 to 1 in 900ms, once.
**Refs:** 3.7, 6.3, 7.4

---

## EX-32 - Chat hero (animated example conversation)

**Base:** custom, mirrors the chat scene (section 4.17)
**Shows:** typed sequence on first view, a real composer that opens the product

```tsx
"use client";
const script = [
  { role: "user", text: "Turn this CSV of invoices into a monthly revenue chart." },
  { role: "assistant", text: "Done. 12 months of revenue, MRR up 18% quarter over quarter." },
  { role: "tool", text: "chart.area · 1.2s" },
];

export function ChatHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? script.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers = script.map((_, i) => setTimeout(() => setStep(i + 1), 900 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="vitral-strong mx-auto w-full max-w-[720px] overflow-hidden rounded-[var(--radius-xl)] p-2">
      <div className="rounded-[calc(var(--radius-xl)-8px)] border border-[var(--hair-soft)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] p-5">
        <div className="grid gap-4">
          {script.slice(0, step).map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className={cn("text-[var(--fs-sm)]", m.role === "user" ? "ml-auto max-w-[78%] rounded-[var(--radius-lg)] rounded-br-[var(--radius-xs)] border border-[var(--hair)] bg-[var(--glass-strong)] px-4 py-3 text-[var(--fg)]"
                : m.role === "tool" ? "font-[var(--font-mono)] text-[var(--fs-2xs)] text-[var(--fg-subtle)]"
                : "text-[var(--fg-muted)]")}>
              {m.text}
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-[var(--radius)] border border-[var(--hair)] bg-[var(--glass-dim)] px-4 py-3">
          <span className="text-[var(--fs-sm)] text-[var(--fg-subtle)]">Ask anything</span>
          <span className="ml-auto grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-3))]">
            <ArrowUp className="size-3.5 text-[var(--accent-fg)]" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}
```

**Motion:** sequence plays once on first view; full state renders immediately under reduced motion.
**Refs:** 4.17, 6.12

---

## EX-33 - Announcement pill

**Base:** custom
**Shows:** live dot, short copy, arrow affordance, hover state

```tsx
<a href="#changelog"
  className="group vitral inline-flex h-8 items-center gap-2 rounded-full pl-2.5 pr-3 text-[var(--fs-xs)] text-[var(--fg-muted)] transition-colors hover:border-[var(--hair-strong)] hover:text-[var(--fg)]">
  <span className="relative flex size-1.5" aria-hidden>
    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent-2)] opacity-40" />
    <span className="relative inline-flex size-1.5 rounded-full bg-[var(--accent-2)]" />
  </span>
  New: agent workflows
  <ArrowRight className="size-3.5 transition-transform duration-[140ms] group-hover:translate-x-0.5" aria-hidden />
</a>
```

**Motion:** arrow shifts 2px on hover; dot pulses 2.4s; both disabled under reduced motion.
**Refs:** 3.3, 6.11

---

## EX-34 - Trust row with rating and avatars

**Base:** custom
**Shows:** social proof without inventing logos

```tsx
<div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[var(--fs-xs)] text-[var(--fg-subtle)]">
  <div className="flex items-center gap-2">
    <div className="flex -space-x-2">
      {people.slice(0, 4).map((p) => (
        <span key={p.id} className="grid size-6 place-items-center rounded-full border border-[var(--bg)] text-[10px] font-medium text-white"
          style={{ background: avatarGradient(p.id) }} title={p.name}>
          {initials(p.name)}
        </span>
      ))}
    </div>
    <span>1,840 teams shipped this month</span>
  </div>
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-[var(--warn)] text-[var(--warn)]" />)}
    </div>
    <span>4.9 average on G2</span>
  </div>
</div>
```

**Motion:** none. Trust rows must feel static and factual.
**Refs:** 3.7 step 5, 9.5 anti-pattern 21

---

## EX-35 - Alternating feature rows

**Base:** `Section` + `Reveal`
**Shows:** text and visual swap sides, 96px rhythm, no repeated card grids

```tsx
export function FeatureRows({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-24">
      {items.map((f, i) => (
        <div key={f.title} className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
          <Reveal y={24}>
            <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{f.overline}</p>
            <h3 className="text-vitral mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em]">{f.title}</h3>
            <p className="mt-4 max-w-[52ch] text-[var(--fs-body)] leading-relaxed text-[var(--fg-muted)]">{f.copy}</p>
            <ul className="mt-6 grid gap-2.5">
              {f.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[var(--fs-sm)] text-[var(--fg-muted)]">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--accent)]" aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal y={24} delay={0.08}>
            <div className="vitral p-2">
              <div className="aspect-[16/11] overflow-hidden rounded-[calc(var(--radius-lg)-8px)] bg-[var(--bg-elevated)]">{f.visual}</div>
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
```

**Motion:** text reveals first, visual 80ms later, both 24px rise, once.
**Refs:** 3.25, 5.1 section 6, 6.3

---

## EX-36 - Process steps with connector

**Base:** custom
**Shows:** three steps, gradient connector that fills on scroll

```tsx
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative grid gap-8 md:grid-cols-3">
      <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--hair)] md:block">
        <motion.div className="h-px origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.12} className="relative">
          <span className="grid size-10 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass-strong)] font-[var(--font-mono)] text-[var(--fs-xs)] text-[var(--accent)] backdrop-blur-[var(--blur-sm)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-[var(--fs-h4)] font-semibold text-[var(--fg)]">{s.title}</h3>
          <p className="mt-2 max-w-[36ch] text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">{s.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}
```

**Motion:** connector scaleX 1.1s once; steps stagger 120ms.
**Refs:** 3.14, 5.2 (how it works)

---

## EX-37 - FAQ accordion (grid-rows animation)

**Base:** `shadcn` Accordion or custom
**Shows:** height animation without JS measurement, deep-linkable rows

```tsx
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--hair-soft)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--hair)] bg-[var(--glass-dim)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} id={`faq-${i}`}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-[var(--glass)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]">
                <span className="text-[var(--fs-body)] font-medium text-[var(--fg)]">{item.q}</span>
                <ChevronDown className={cn("size-4 shrink-0 text-[var(--fg-subtle)] transition-transform duration-[200ms]", isOpen && "rotate-180")} aria-hidden />
              </button>
            </h3>
            <div id={`faq-panel-${i}`} role="region" className={cn("grid transition-[grid-template-rows] duration-[240ms] ease-[var(--ease-out)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="max-w-[68ch] px-5 pb-5 text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**Motion:** chevron 200ms, panel 240ms; no opacity fade on text (it would flash).
**Refs:** 3.11, 5.1 section 11

---

## EX-38 - Final CTA band

**Base:** custom
**Shows:** full-width panel, internal aurora, one primary action

```tsx
<Reveal>
  <div className="vitral relative overflow-hidden rounded-[var(--radius-xl)] px-8 py-16 text-center md:px-16">
    <div aria-hidden className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(60% 120% at 50% 0%, var(--aurora-3), transparent 65%)", opacity: 0.55 }} />
    <div className="relative">
      <h2 className="text-vitral mx-auto max-w-[22ch] text-[var(--fs-h2)] font-semibold tracking-[-0.025em]">
        Give your agent a design language today
      </h2>
      <p className="mx-auto mt-4 max-w-[46ch] text-[var(--fs-lead)] text-[var(--fg-muted)]">
        One file. Any model. Professional interfaces on the first try.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" iconRight={<ArrowRight className="size-4" />}>Start building</Button>
        <Button size="lg" variant="glass">View on GitHub</Button>
      </div>
      <p className="mt-4 text-[var(--fs-xs)] text-[var(--fg-subtle)]">MIT licensed. No account required.</p>
    </div>
  </div>
</Reveal>
```

**Motion:** panel scales 0.98 to 1 over 420ms on entry, once; internal aurora static.
**Refs:** 3.26, 5.1 section 12

---

## EX-39 - Newsletter capture

**Base:** custom
**Shows:** inline shell, validation, success replacement, honeypot

```tsx
"use client";
export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  if (state === "done") {
    return (
      <div className="flex items-center gap-3 text-[var(--fs-sm)] text-[var(--fg-muted)]" role="status">
        <span className="grid size-6 place-items-center rounded-full bg-[var(--accent-soft)]">
          <Check className="size-3.5 text-[var(--accent)]" aria-hidden />
        </span>
        You are on the list. Check your inbox to confirm.
      </div>
    );
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      setState("loading");
      try { await subscribe(email); setState("done"); } catch { setState("error"); }
    }}
      className="vitral flex w-full max-w-[420px] items-center gap-2 rounded-full p-1.5">
      <label htmlFor="nl-email" className="sr-only">Work email</label>
      <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="h-9 flex-1 bg-transparent px-3 text-[var(--fs-sm)] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]" />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button size="sm" type="submit" loading={state === "loading"}>Subscribe</Button>
    </form>
  );
}
```

**Motion:** success swaps the form in place, 180ms fade; no layout jump (same height).
**Refs:** 3.26, 5.6

---

## EX-40 - Pricing-adjacent value row (three reasons)

**Base:** custom
**Shows:** icon tiles, short copy, quiet zone rhythm

```tsx
<div className="grid gap-6 md:grid-cols-3">
  {reasons.map((r, i) => (
    <Reveal key={r.title} delay={i * 0.08} className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
        <r.icon className="size-4 text-[var(--accent)]" aria-hidden />
      </span>
      <div>
        <h3 className="text-[var(--fs-sm)] font-semibold text-[var(--fg)]">{r.title}</h3>
        <p className="mt-1 max-w-[34ch] text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">{r.copy}</p>
      </div>
    </Reveal>
  ))}
</div>
```

**Motion:** 80ms stagger; nothing else.
**Refs:** 1.7 (icon tiles), 3.13, 5.4 step 3

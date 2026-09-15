# Examples 91 to 100 - Full Page Assembly

The last ten examples compose everything above into complete pages.
Part of the Nova Vitral example library. Index: `examples/00-index.md`.

---

## EX-91 - Documentation layout (three columns)

**Base:** custom grid + sticky TOC
**Shows:** tree, content, on-this-page rail, mobile drawers, three scroll containers

```tsx
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-[var(--gutter)] lg:grid-cols-[260px_minmax(0,760px)_220px] lg:justify-center">
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--nav-h)+32px)] max-h-[calc(100dvh-var(--nav-h)-64px)] overflow-y-auto pb-10 [mask-image:linear-gradient(180deg,transparent_0,#000_16px,#000_calc(100%-32px),transparent_100%)]">
          <DocsTree />
        </div>
      </aside>

      <main className="min-w-0 py-10">{children}</main>

      <aside className="hidden lg:block">
        <nav className="sticky top-[calc(var(--nav-h)+32px)] max-h-[calc(100dvh-var(--nav-h)-64px)] overflow-y-auto pb-10" aria-label="On this page">
          <p className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">On this page</p>
          <ul className="mt-3 border-l border-[var(--hair)]">
            <TocItems />
          </ul>
        </nav>
      </aside>
    </div>
  );
}
```

```tsx
// active TOC marker: 2px accent segment that slides with scroll progress
<li className="relative pl-4">
  {active && <motion.span layoutId="toc-marker" className="absolute -left-px top-0 h-full w-0.5 rounded-full bg-[var(--accent)]"
    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }} />}
  <a href={`#${id}`} className={cn("block py-1.5 text-[var(--fs-xs)] transition-colors",
    active ? "text-[var(--fg)]" : "text-[var(--fg-subtle)] hover:text-[var(--fg-muted)]")}>{title}</a>
</li>
```

**Motion:** TOC marker slides 240ms; the tree does not animate.
**Refs:** 5.5, 3.6 (sidebar)

---

## EX-92 - Blog post with reading progress

**Base:** custom + MDX
**Shows:** 68ch measure, meta row, share actions, related posts, footnote styles

```tsx
export default function Post({ post }: { post: Post }) {
  return (
    <article className="mx-auto max-w-[760px] px-[var(--gutter)] py-16">
      <ReadingProgress />
      <header>
        <div className="flex flex-wrap items-center gap-2 text-[var(--fs-xs)] text-[var(--fg-subtle)]">
          <Link href={`/blog/${post.category}`} className="rounded-full border border-[var(--hair)] bg-[var(--glass)] px-2.5 py-1 transition-colors hover:text-[var(--fg)]">
            {post.category}
          </Link>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="text-vitral mt-5 text-[var(--fs-h1)] font-semibold tracking-[-0.03em] text-balance">{post.title}</h1>
        <p className="mt-4 max-w-[62ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">{post.summary}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-y border-[var(--hair-soft)] py-4">
          <AuthorChip author={post.author} />
          <ShareRow url={post.url} />
        </div>
      </header>

      <div className="prose-vitral mt-10">{post.content}</div>

      <footer className="mt-14 grid gap-6">
        <AuthorBio author={post.author} />
        <div className="grid gap-3 sm:grid-cols-3">{/* related posts */}</div>
      </footer>
    </article>
  );
}
```

**Motion:** reading progress uses `scaleX` only; no entrance animation on the article body.
**Refs:** 5.6, 3.27

---

## EX-93 - Changelog page

**Base:** custom timeline (EX-77 style, calmer)
**Shows:** version chips, category tags, filters, subscribe action

```tsx
export default function Changelog({ entries }: { entries: Entry[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const filtered = category ? entries.filter((e) => e.tags.includes(category)) : entries;

  return (
    <div className="mx-auto max-w-[760px] px-[var(--gutter)] py-16">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-vitral text-[var(--fs-h1)] font-semibold tracking-[-0.03em]">Changelog</h1>
          <p className="mt-3 max-w-[52ch] text-[var(--fs-body)] text-[var(--fg-muted)]">
            Every shipped change, in the order it landed.
          </p>
        </div>
        <Button variant="glass" size="sm" iconLeft={<Rss className="size-3.5" />}>Subscribe</Button>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        <Segmented value={category ?? "all"} onChange={(v) => setCategory(v === "all" ? null : v)}
          options={[{ value: "all", label: "All" }, { value: "added", label: "Added" }, { value: "changed", label: "Changed" }, { value: "fixed", label: "Fixed" }]} />
      </div>

      <ol className="mt-10 grid gap-10">
        {filtered.map((e) => (
          <li key={e.version} className="grid gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--hair)] bg-[var(--glass)] px-2.5 py-1 font-[var(--font-mono)] text-[var(--fs-2xs)] text-[var(--accent)]">{e.version}</span>
              <time className="text-[var(--fs-xs)] text-[var(--fg-subtle)]" dateTime={e.date}>{formatDate(e.date)}</time>
              {e.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
            </div>
            <h2 className="text-[var(--fs-h3)] font-semibold text-[var(--fg)]">{e.title}</h2>
            <div className="prose-vitral max-w-[68ch] text-[var(--fs-sm)]">{e.body}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

**Motion:** none; changelogs read as records. Filter swaps are instant.
**Refs:** 5.6, 3.14

---

## EX-94 - Dashboard page assembly

**Base:** composes EX-66, 67, 68, 69, 70, 71
**Shows:** 12-column grid, KPI row, primary chart, secondary card, table, activity

```tsx
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <header className="col-span-12 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[var(--fs-h2)] font-semibold tracking-[-0.025em] text-[var(--fg)]">Overview</h1>
          <p className="mt-1 text-[var(--fs-xs)] text-[var(--fg-subtle)]">Last updated 12 seconds ago</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
          <Button variant="glass" size="sm" iconLeft={<RefreshCw className="size-3.5" />}>Refresh</Button>
          <Button size="sm" iconLeft={<Plus className="size-3.5" />}>New</Button>
        </div>
      </header>

      <div className="col-span-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => <StatTile key={k.label} {...k} />)}
      </div>

      <section className="col-span-12 xl:col-span-8">
        <div className="vitral p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">Requests</h2>
            <Segmented value={range} onChange={setRange} options={rangeOptions} />
          </div>
          <div className="mt-5"><TrendChart data={data} /></div>
        </div>
      </section>

      <section className="col-span-12 xl:col-span-4">
        <div className="vitral h-full p-5">
          <h2 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">Top sources</h2>
          <div className="mt-5"><TopSources rows={sources} /></div>
        </div>
      </section>

      <section className="col-span-12 xl:col-span-8"><DataTable columns={columns} data={rows} /></section>
      <section className="col-span-12 xl:col-span-4"><ActivityFeed items={events} /></section>
    </div>
  );
}
```

**Motion:** at most two charts animate per viewport; the table does not animate at all.
**Refs:** 5.7, 3.21

---

## EX-95 - Portfolio home

**Base:** composes EX-31, EX-35, EX-83 and the footer
**Shows:** larger type, more whitespace, one expressive moment

```tsx
export default function PortfolioHome() {
  return (
    <>
      <Navbar minimal />
      <main>
        {/* Intro */}
        <section className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] pb-16 pt-[calc(var(--nav-h)+120px)]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hair)] bg-[var(--glass)] px-3 py-1 text-[var(--fs-xs)] text-[var(--fg-muted)]">
              <span className="size-1.5 rounded-full bg-[var(--accent-2)]" aria-hidden /> Available for freelance
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-vitral mt-7 max-w-[24ch] font-[var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Design systems and interface engineering for AI products
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[52ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
              I am Pedro, a product designer and frontend engineer. For the last six years I have
              shipped interfaces for fintech, developer tools and data platforms.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" iconRight={<ArrowRight className="size-4" />}>See selected work</Button>
            <Button size="lg" variant="glass" iconLeft={<Mail className="size-4" />}>Email me</Button>
          </Reveal>
        </section>

        {/* Selected work: horizontal gallery on desktop, stacked cards on mobile */}
        <Section overline="Selected work" title="Six projects, six problems">
          <HorizontalGallery>{projects.map((p) => <ProjectCard key={p.id} {...p} />)}</HorizontalGallery>
        </Section>

        <Section overline="About" title="How I work">…</Section>
      </main>
      <Footer />
    </>
  );
}
```

**Motion:** the horizontal gallery is the single expressive moment; everything else is a plain reveal.
**Refs:** 5.3, 6.7

---

## EX-96 - Pricing page assembly

**Base:** composes EX-09, EX-41, EX-42, EX-37
**Shows:** the full order of sections from blueprint 5.4

```tsx
export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[calc(var(--nav-h)+64px)]">
        <Section align="center" overline="Pricing"
          title="Simple plans that scale with your team"
          lead="Every plan includes the full design specification, unlimited projects and community support."
          action={<Segmented value={billing} onChange={setBilling} options={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual", chip: "−20%" },
          ]} />}>
          <Pricing plans={plans} annual={billing === "annual"} />
          <p className="mt-6 text-center text-[var(--fs-xs)] text-[var(--fg-subtle)]">
            All prices in USD, excluding taxes. Cancel anytime.
          </p>
        </Section>

        <Section overline="Why teams switch" title="Three things change on day one">
          <ValueReasons />
        </Section>

        <Section overline="Compare" title="Everything, side by side">
          <Comparison rows={rows} competitors={["Alternative A", "Alternative B"]} />
        </Section>

        <Section overline="Questions" title="Billing, answered">
          <Faq items={billingFaq} />
        </Section>

        <Section>
          <CtaBand />
        </Section>
      </main>
      <Footer />
    </>
  );
}
```

**Motion:** plan cards rise with an 80ms stagger; the recommended card arrives last; prices fade on toggle.
**Refs:** 5.4, 3.12

---

## EX-97 - Legal page layout

**Base:** custom
**Shows:** flat background (no aurora), 68ch measure, TOC, print styles

```tsx
export default function PrivacyPage() {
  return (
    <div className="bg-[var(--bg)]"> {/* intentionally no aurora: legal pages read as serious */}
      <div className="mx-auto grid max-w-[1080px] gap-10 px-[var(--gutter)] py-16 lg:grid-cols-[220px_minmax(0,68ch)]">
        <nav aria-label="Sections" className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+32px)]">
            <p className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">Sections</p>
            <ul className="mt-3 grid gap-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block py-1 text-[var(--fs-xs)] text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg-muted)]">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="prose-vitral">
          <h1 className="text-[var(--fs-h1)] font-semibold tracking-[-0.03em] text-[var(--fg)]">Privacy Policy</h1>
          <p className="mt-3 text-[var(--fs-sm)] text-[var(--fg-subtle)]">Last updated 4 March 2026</p>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-[calc(var(--nav-h)+32px)]">
              <h2 className="mt-10 text-[var(--fs-h3)] font-semibold text-[var(--fg)]">{s.title}</h2>
              <div className="mt-3 text-[var(--fs-body)] leading-relaxed text-[var(--fg-muted)]">{s.body}</div>
            </section>
          ))}
          <p className="mt-12 rounded-[var(--radius)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4 text-[var(--fs-sm)]">
            Questions about this policy? Email <a href="mailto:privacy@company.com" className="text-[var(--accent)]">privacy@company.com</a>.
          </p>
        </article>
      </div>
    </div>
  );
}
```

```css
@media print {
  .aurora, .grain, nav[aria-label="Sections"] { display: none !important; }
  body { background: #fff; color: #111; }
  a::after { content: " (" attr(href) ")"; font-size: 11px; color: #555; }
}
```

**Motion:** none.
**Refs:** 5.6 (legal), 3.31 (print view)

---

## EX-98 - Maintenance and 500 page

**Base:** custom
**Shows:** calm copy, status link, retry, error id

```tsx
export default function Error500() {
  return (
    <main className="grid min-h-dvh place-items-center px-[var(--gutter)]">
      <Aurora intensity={0.35} />
      <div className="vitral w-full max-w-[520px] p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--warn)_30%,transparent)] bg-[color-mix(in_srgb,var(--warn)_12%,transparent)]">
          <Wrench className="size-5 text-[var(--warn)]" aria-hidden />
        </span>
        <h1 className="mt-5 text-[var(--fs-h3)] font-semibold text-[var(--fg)]">
          We are deploying a fix
        </h1>
        <p className="mt-2 text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">
          The service is briefly unavailable. Nothing is lost, and requests retry automatically.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button size="sm" onClick={() => location.reload()} iconLeft={<RefreshCw className="size-3.5" />}>Retry now</Button>
          <Button size="sm" variant="glass" asChild><Link href="/status">View status page</Link></Button>
        </div>
        <p className="mt-6 font-[var(--font-mono)] text-[var(--fs-2xs)] text-[var(--fg-subtle)]">req_9f2c41ab</p>
      </div>
    </main>
  );
}
```

**Motion:** the aurora runs at reduced intensity; no other animation on an error page.
**Refs:** 5.8, 5.10

---

## EX-99 - Onboarding checklist card

**Base:** custom + `localStorage`
**Shows:** five items maximum, progress ring, single glow celebration at 100 percent

```tsx
export function OnboardingCard({ items }: { items: OnboardingItem[] }) {
  const done = items.filter((i) => i.complete).length;
  const pct = done / items.length;
  const complete = done === items.length;

  return (
    <div className={cn("vitral p-6", complete && "shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-2)_35%,transparent),0_12px_40px_-12px_color-mix(in_srgb,var(--accent-2)_45%,transparent)]")}>
      <div className="flex items-center gap-4">
        <div className="relative size-12 shrink-0">
          <svg viewBox="0 0 48 48" className="size-12 -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--hair)" strokeWidth="3" />
            <motion.circle cx="24" cy="24" r="20" fill="none" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={125.6} animate={{ strokeDashoffset: 125.6 * (1 - pct) }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[var(--fs-xs)] font-medium tabular-nums text-[var(--fg)]">
            {done}/{items.length}
          </span>
        </div>
        <div>
          <h2 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">
            {complete ? "Setup complete" : "Finish setting up"}
          </h2>
          <p className="mt-0.5 text-[var(--fs-xs)] text-[var(--fg-muted)]">
            {complete ? "Everything is connected. Nice work." : "Five minutes to a working workspace."}
          </p>
        </div>
      </div>

      <ul className="mt-1.5 grid">
        {items.map((i) => (
          <li key={i.id} className="border-b border-[var(--hair-soft)] last:border-0">
            <button onClick={i.run} disabled={i.complete}
              className="flex w-full items-center gap-3 py-3 text-left transition-opacity disabled:opacity-60">
              <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border",
                i.complete ? "border-[var(--accent-2)] bg-[color-mix(in_srgb,var(--accent-2)_18%,transparent)]" : "border-[var(--hair-strong)]")}>
                {i.complete && <Check className="size-3 text-[var(--accent-2)]" aria-hidden />}
              </span>
              <span className={cn("text-[var(--fs-sm)]", i.complete ? "text-[var(--fg-subtle)] line-through" : "text-[var(--fg)]")}>
                {i.label}
              </span>
              {!i.complete && <ArrowRight className="ml-auto size-3.5 text-[var(--fg-subtle)]" aria-hidden />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Motion:** the ring animates 420ms per change; at 100 percent the card glows once for 1.2s (no confetti).
**Refs:** 3.28, 9.5 anti-pattern 14

---

## EX-100 - Settings page assembly

**Base:** composes EX-17, EX-75, EX-76, plus a danger zone
**Shows:** rail, sections, autosave, destructive confirmation

```tsx
export default function SettingsPage() {
  const [section, setSection] = useState("profile");

  return (
    <div className="mx-auto grid max-w-[1080px] gap-10 px-[var(--gutter)] py-12 lg:grid-cols-[240px_minmax(0,720px)]">
      <nav aria-label="Settings sections">
        <ul className="grid gap-1 lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={() => setSection(s.id)}
                aria-current={section === s.id ? "true" : undefined}
                className={cn("flex h-9 items-center gap-2.5 rounded-[var(--radius-sm)] px-3 text-[var(--fs-sm)] transition-colors",
                  section === s.id ? "bg-[var(--glass-strong)] text-[var(--fg)]" : "text-[var(--fg-muted)] hover:bg-[var(--glass)] hover:text-[var(--fg)]")}>
                <s.icon className="size-4" aria-hidden />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <SettingsSection title="Profile" description="How you appear to teammates." dirty={dirtyProfile}>
          {/* avatar upload, name, handle, timezone */}
        </SettingsSection>

        <SettingsSection title="Notifications" description="Choose what reaches you and where." dirty={false}>
          <div className="grid gap-3">
            {notificationPrefs.map((p) => <SettingSwitch key={p.label} {...p} />)}
          </div>
        </SettingsSection>

        <SettingsSection title="API keys" description="Server-side keys for your integrations." dirty={false}>
          <ApiKeysTable />
        </SettingsSection>

        <section className="mt-8 rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--danger)_32%,transparent)] bg-[color-mix(in_srgb,var(--danger)_6%,transparent)] p-6">
          <h2 className="text-[var(--fs-h4)] font-semibold text-[var(--danger)]">Delete workspace</h2>
          <p className="mt-2 max-w-[62ch] text-[var(--fs-sm)] text-[var(--fg-muted)]">
            This removes every project, member and integration. It cannot be undone after 30 days.
          </p>
          <ConfirmDialog
            title="Delete this workspace?"
            description="Type the workspace name to confirm. All members lose access immediately."
            confirmLabel="Delete workspace"
            confirmPhrase="acme-inc"
            onConfirm={deleteWorkspace}>
            <Button variant="danger" size="sm" className="mt-5">Delete workspace</Button>
          </ConfirmDialog>
        </section>
      </div>
    </div>
  );
}
```

**Motion:** section anchor scrolls are smooth (instant under reduced motion); no entrance animations on settings.
**Refs:** 3.29, 5.7, 3.16

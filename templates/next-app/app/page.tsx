import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { Footer } from "@/components/nova/navigation/footer";
import { Navbar } from "@/components/nova/navigation/navbar";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { ButtonPrimary } from "@/components/nova/buttons/button-primary";
import { Container, Section } from "@/components/nova/core/section";
import { Reveal } from "@/components/nova/core/reveal";
import { Surface } from "@/components/nova/core/surface";
import { Counter } from "@/components/nova/motion/counter";
import { MarqueeRow } from "@/components/nova/motion/marquee-row";
import { SpotlightCard } from "@/components/nova/motion/spotlight-card";
import { StickyScrolly } from "@/components/nova/motion/sticky-scrolly";

export const metadata = {
  title: "Meridian - Usage analytics for platform teams",
  description:
    "Meridian turns raw product events into revenue, retention and reliability signals your platform team can act on the same day.",
};

const NAV = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export default function HomePage() {
  return (
    <>
      <Navbar
        brand="Meridian"
        items={NAV}
        currentPath="/"
        actions={
          <>
            <a href="/login" className="inline-flex">
              <ButtonGlass size="sm">Sign in</ButtonGlass>
            </a>
            <a href="/signup" className="inline-flex">
              <ButtonPrimary size="sm" iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}>
                Start free
              </ButtonPrimary>
            </a>
          </>
        }
      />

      <main id="main">
        {/* Section 1: hero. Overline, headline, lead, one primary action, product visual. */}
        <section className="relative overflow-hidden pt-[calc(var(--nav-h)+72px)] pb-16 md:pb-24">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <div>
                <Reveal>
                  <p className="inline-flex items-center gap-2 rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-1.5 text-[12px] text-[var(--fg-muted)]">
                    <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                    Event pipeline 2.0 is out
                  </p>
                </Reveal>

                <Reveal delay={80}>
                  <h1 className="nv-grad-text mt-5 max-w-[19ch] text-[var(--fs-display)] font-semibold leading-[0.98] tracking-[-0.04em]">
                    Know what your product actually does
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-6 max-w-[50ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
                    Meridian reads one stream of product events and answers three questions the same
                    minute: what changed, who it affects, and what it costs. No instrumentation sprint,
                    no warehouse project.
                  </p>
                </Reveal>

                <Reveal delay={320}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a href="/signup" className="inline-flex">
                      <ButtonPrimary size="lg" iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
                        Start free
                      </ButtonPrimary>
                    </a>
                    <a href="/demo" className="inline-flex">
                      <ButtonGlass size="lg">Book a 20 minute demo</ButtonGlass>
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={420}>
                  <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--fg-subtle)]">
                    {["No credit card", "SOC 2 Type II", "EU data residency"].map((item) => (
                      <li key={item} className="inline-flex items-center gap-2">
                        <Check className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={480} distance={24}>
                <div className="nv-surface nv-lift-lg p-2">
                  <ProductPreview />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Section 2: proof. A quiet band, no headline, no explanation. */}
        <div className="border-y border-[var(--hair)] py-8">
          <Container>
            <MarqueeRow durationSeconds={44}>
              <div className="flex items-center gap-14 pr-14 text-[13px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
                {["Northwind", "Aperture", "Kestrel Labs", "Solstice", "Ravel", "Trema"].map((logo) => (
                  <span key={logo}>{logo}</span>
                ))}
              </div>
            </MarqueeRow>
          </Container>
        </div>

        {/* Section 3: capability. One bento grid, one hero cell. */}
        <Section
          overline="Platform"
          title="One pipeline, three questions answered"
          lead="Everything below reads the same event stream, so a number in the dashboard and a line in the incident report can never disagree."
        >
          <div className="grid gap-4 md:grid-cols-6">
            <Reveal className="md:col-span-3">
              <Surface strong className="h-full">
                <div className="flex items-center gap-2 text-[13px] text-[var(--fg-muted)]">
                  <LineChart className="size-4 text-[var(--accent)]" aria-hidden="true" />
                  Revenue signals
                </div>
                <p className="mt-4 text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                  Attribute every change to a cohort, a release or a region
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                  Meridian keeps 400 days of raw events and 400 days of aggregates side by side, so a
                  question about last March does not become a backfill job.
                </p>
                <MiniBars />
              </Surface>
            </Reveal>

            <Reveal delay={60} className="md:col-span-3">
              <div className="grid h-full gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Timer,
                    title: "Latency",
                    copy: "p95 per route, per region, per release.",
                  },
                  {
                    icon: Layers,
                    title: "Cohorts",
                    copy: "Retention by first action, not by signup date.",
                  },
                  {
                    icon: Activity,
                    title: "Incidents",
                    copy: "Impact in revenue and users, written during the incident.",
                  },
                  {
                    icon: Boxes,
                    title: "Cost",
                    copy: "Storage and compute per tenant, before the invoice.",
                  },
                ].map((item) => (
                  <SpotlightCard key={item.title} className="h-full">
                    <item.icon className="size-4 text-[var(--accent)]" aria-hidden="true" />
                    <p className="mt-3 text-[14px] font-medium text-[var(--fg)]">{item.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--fg-muted)]">{item.copy}</p>
                  </SpotlightCard>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Section 4: scrollytelling. One scroll-linked scene per page, maximum. */}
        <Section
          overline="How it works"
          title="From raw events to a decision in four steps"
          lead="The pipeline is opinionated on purpose. One schema, one clock, one place to look when a number surprises you."
        >
          <StickyScrolly
            steps={[
              {
                id: "ingest",
                title: "Ingest",
                copy:
                  "Point the SDK at your collector, or replay a warehouse table. Events are validated against one schema, and anything malformed lands in a quarantine view you can query like any other table.",
                scene: <SceneIngest />,
              },
              {
                id: "model",
                title: "Model",
                copy:
                  "Identities are resolved to accounts, and sessions are stitched across devices. You define metrics once, in plain SQL, and every surface reads that definition.",
                scene: <SceneModel />,
              },
              {
                id: "watch",
                title: "Watch",
                copy:
                  "Anomaly detection runs on every metric you define. When revenue per account moves more than two standard deviations, the alert names the cohort and the release responsible.",
                scene: <SceneWatch />,
              },
              {
                id: "act",
                title: "Act",
                copy:
                  "Alerts open with a query you can run yourself, a dashboard you can share, and one line of context written for whoever is on call at 03:00.",
                scene: <SceneAct />,
              },
            ]}
          />
        </Section>

        {/* Section 5: metrics. Counters run once, at 50 percent visibility. */}
        <Section density="dense">
          <Surface className="grid gap-8 p-8 md:grid-cols-3 md:p-10">
            {[
              { label: "Events processed daily", value: 4.2, suffix: "B", decimals: 1 },
              { label: "Median query time", value: 180, suffix: "ms", decimals: 0 },
              { label: "Teams shipping on Meridian", value: 1240, suffix: "", decimals: 0 },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[var(--fs-h1)] font-semibold tabular-nums tracking-[-0.03em] text-[var(--fg)]">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="mt-2 text-[13px] text-[var(--fg-muted)]">{stat.label}</p>
              </div>
            ))}
          </Surface>
        </Section>

        {/* Section 6: objection handling. One quote, one attribution, one link. */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                Field notes
              </p>
              <h2 className="mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em] text-[var(--fg)]">
                Replace a quarter of dashboard tickets with one query
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                The pattern we see most often: a platform team stops writing one-off dashboards for
                every stakeholder and starts sharing saved queries that answer the same question with
                different filters.
              </p>
              <a
                href="/customers"
                className="mt-6 inline-flex items-center gap-2 text-[13px] text-[var(--accent)] transition-colors duration-150 hover:text-[var(--fg)]"
              >
                Read the customer notes
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  quote:
                    "We deleted eleven dashboards and replaced them with four saved queries. The on-call runbook is shorter, and it is finally accurate.",
                  name: "Ilse Brand",
                  role: "Head of Platform, Kestrel Labs",
                },
                {
                  quote:
                    "The first week paid for the year. Two regressions were caught before customers noticed, both traced to a single release.",
                  name: "Tomas Erdahl",
                  role: "Staff Engineer, Solstice",
                },
              ].map((item, index) => (
                <Reveal key={item.name} delay={index * 80}>
                  <Surface className="h-full">
                    <p className="text-[14px] leading-relaxed text-[var(--fg)]">{item.quote}</p>
                    <p className="mt-5 text-[13px] text-[var(--fg)]">{item.name}</p>
                    <p className="text-[12.5px] text-[var(--fg-subtle)]">{item.role}</p>
                  </Surface>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 7: close. One action, one sentence, 128px of quiet above and below. */}
        <Section>
          <Surface strong className="px-8 py-14 text-center md:px-16 md:py-20">
            <ShieldCheck className="mx-auto size-5 text-[var(--accent-2)]" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-[24ch] text-[var(--fs-h1)] font-semibold tracking-[-0.03em] text-[var(--fg)]">
              Start with one week of events. Keep the rest for free.
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">
              Import a sample or your own stream. The trial does not expire, and the thirty day window
              becomes permanent on the first paid month.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="/signup" className="inline-flex">
                <ButtonPrimary size="lg" iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
                  Create a workspace
                </ButtonPrimary>
              </a>
              <a href="/docs/quickstart" className="inline-flex">
                <ButtonGlass size="lg">Read the quickstart</ButtonGlass>
              </a>
            </div>
          </Surface>
        </Section>
      </main>

      <Footer
        brand="Meridian"
        description="Usage analytics for platform teams. One event stream, one metric definition, one place to look."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Overview", href: "/product" },
              { label: "Pricing", href: "/pricing" },
              { label: "Changelog", href: "/changelog" },
              { label: "Status", href: "/status" },
            ],
          },
          {
            title: "Developers",
            links: [
              { label: "Quickstart", href: "/docs/quickstart" },
              { label: "API reference", href: "/docs/api" },
              { label: "SDKs", href: "/docs/sdks" },
              { label: "Query language", href: "/docs/query" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Customers", href: "/customers" },
              { label: "Security", href: "/security" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------ page-local parts */

function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-soft)]">
      <div className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2.5">
        <span className="size-2 rounded-full bg-[var(--hair-strong)]" aria-hidden="true" />
        <span className="size-2 rounded-full bg-[var(--hair-strong)]" aria-hidden="true" />
        <span className="ml-2 text-[12px] text-[var(--fg-subtle)]">app.meridian/overview</span>
        <span className="ml-auto text-[11px] text-[var(--fg-subtle)]">14:02 UTC</span>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-3">
        {[
          { label: "Net revenue", value: "$412.8k", delta: "+6.2%" },
          { label: "Active accounts", value: "8,914", delta: "+1.4%" },
          { label: "p95 latency", value: "184ms", delta: "-12ms" },
        ].map((cell) => (
          <div key={cell.label} className="rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
            <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{cell.label}</p>
            <p className="mt-1.5 text-[17px] font-semibold tabular-nums text-[var(--fg)]">{cell.value}</p>
            <p className="text-[11.5px] text-[var(--accent-2)]">{cell.delta}</p>
          </div>
        ))}
      </div>

      <div className="px-3 pb-3">
        <div className="rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
          <svg viewBox="0 0 320 84" className="h-24 w-full" role="img" aria-label="Revenue over thirty days">
            <defs>
              <linearGradient id="home-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 62 L32 58 L64 60 L96 44 L128 48 L160 32 L192 36 L224 22 L256 26 L288 14 L320 18 L320 84 L0 84 Z"
              fill="url(#home-fill)"
            />
            <polyline
              points="0,62 32,58 64,60 96,44 128,48 160,32 192,36 224,22 256,26 288,14 320,18"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MiniBars() {
  const bars = [38, 52, 44, 68, 60, 78, 71, 88];
  return (
    <div className="mt-6 flex h-24 items-end gap-2" aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={index}
          className="flex-1 rounded-t-[3px] bg-[linear-gradient(180deg,var(--accent),color-mix(in_srgb,var(--accent)_35%,transparent))]"
          style={{ height: `${height}%`, opacity: 0.5 + index * 0.06 }}
        />
      ))}
    </div>
  );
}

function SceneIngest() {
  return (
    <div className="grid h-full place-content-center gap-3 p-6 font-[var(--font-mono)] text-[12.5px] text-[var(--fg-muted)]">
      {["POST /v2/events  202", "batch 41,208  ok", "quarantine 0"].map((line) => (
        <span key={line} className="rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2">
          {line}
        </span>
      ))}
    </div>
  );
}

function SceneModel() {
  return (
    <div className="grid h-full gap-3 p-6">
      <div className="grid grid-cols-3 gap-3">
        {["Signup", "Activation", "Renewal"].map((stage) => (
          <div key={stage} className="rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
            <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{stage}</p>
            <span className="mt-3 block h-2 rounded-full bg-[var(--hair-soft)]" />
            <span className="mt-2 block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
          </div>
        ))}
      </div>
      <p className="text-[12.5px] text-[var(--fg-subtle)]">One metric definition, read by every surface.</p>
    </div>
  );
}

function SceneWatch() {
  return (
    <div className="grid h-full place-content-center gap-3 p-6">
      <div className="rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4">
        <p className="text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">Anomaly</p>
        <p className="mt-2 text-[14px] text-[var(--fg)]">Revenue per account, -2.4 sigma</p>
        <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">Cohort: self-serve, EU west. Release 2.14.1</p>
      </div>
    </div>
  );
}

function SceneAct() {
  return (
    <div className="grid h-full place-content-center gap-3 p-6">
      <div className="rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4">
        <p className="text-[12.5px] text-[var(--fg)]">Runbook step 3 of 5</p>
        <p className="mt-2 text-[12.5px] text-[var(--fg-muted)]">
          Roll back 2.14.1, then re-run the cohort query to confirm recovery.
        </p>
      </div>
    </div>
  );
}

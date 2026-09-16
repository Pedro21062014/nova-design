"""Templates, part A: README, Next.js app scaffolding and pages 1 to 3."""

FILES_A: dict[str, str] = {}

FILES_A["templates/README.md"] = '''# Frontend templates

Five complete pages, production quality, built on the component library in
`components/nova/`. Every page is real: no lorem ipsum, no placeholder tiles, no dead
links, no emoji, and nothing purple.

| Page | Stack | File | What it proves |
| --- | --- | --- | --- |
| 1. Marketing home | Next.js (server component) | [`next-app/app/page.tsx`](./next-app/app/page.tsx) | Glass over aurora, staggered hero, bento grid, scrollytelling, counters |
| 2. Pricing | Next.js (client) | [`next-app/app/pricing/page.tsx`](./next-app/app/pricing/page.tsx) | Interval toggle with no layout shift, 3 plan hierarchy, comparison table, FAQ |
| 3. Product dashboard | Next.js (client) | [`next-app/app/dashboard/page.tsx`](./next-app/app/dashboard/page.tsx) | App shell, KPI row, charts, dense table, activity feed |
| 4. AI workspace | Next.js (client) | [`next-app/app/chat/page.tsx`](./next-app/app/chat/page.tsx) | Three-column chat, assistant as a document, tool cards, streaming composer |
| 5. Documentation | Next.js (server component) | [`next-app/app/docs/page.tsx`](./next-app/app/docs/page.tsx) | Tree, measure-capped prose, on-this-page rail, code block, pager |
| Bonus. Landing in plain HTML | Static | [`static-html/index.html`](./static-html/index.html) | Same visual language with zero build step, inline Lucide SVG, CSS reveals |
| Bonus. Astro landing | Astro | [`astro/src/pages/index.astro`](./astro/src/pages/index.astro) | The same page as an Astro route with a client island |

## Install

```bash
# 1. components and helpers
cp -r components/nova/   <your-app>/components/nova/
cp -r lib/               <your-app>/lib/

# 2. theme, imported before everything else
cp theme/nova-theme.css  <your-app>/app/nova-theme.css

# 3. copy a page over your own route
cp templates/next-app/app/page.tsx <your-app>/app/page.tsx
```

```css
/* <your-app>/app/globals.css */
@import "tailwindcss";
@import "./nova-theme.css";
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

The full runnable app, including `package.json`, `tsconfig.json`, `layout.tsx` and
`globals.css`, lives in [`next-app/`](./next-app/README.md).

## How to use these pages with an AI

Feed the prompt and the page, in this order:

1. `prompts/01-design-system-setup.md` once per project, so the theme and tokens are in place.
2. `prompts/03-page-blueprints.md`, which names the blueprint for each of the five pages.
3. One template file as the reference for structure, then the components it imports.

Two rules that keep the output consistent:

- Keep the section order. The pages are ordered for a reason: identity, proof, capability,
  specifics, objection handling, close.
- Keep the token names. `--glass`, `--hair`, `--fg-muted` and `--accent` are what make a new
  page look like these five. Replacing them with Tailwind color classes is the fastest way to
  look like a different product.

## What to change first

| Token | Where | Why |
| --- | --- | --- |
| `--accent` | `theme/nova-theme.css` | Brand color. Keep the saturation below 85 percent. |
| `--container` | `theme/nova-theme.css` | 1200px default; 1280px reads more editorial. |
| Navbar items | each page | Fix the routes before the visuals. |
| Sample data | bottom of each template | Every page has one `SAMPLE` object. Replace it, then delete the mock arrays. |

## Verification before you ship

- Run the fourteen-point visual QA from spec section 9, starting with the grayscale test.
- Check the page at 320, 768, 1024 and 1440 pixels.
- Turn on `prefers-reduced-motion: reduce` and confirm nothing moves.
- Tab through the whole page twice: every action must be reachable, and the focus ring visible.
- Search the file for `purple`, `violet`, `fuchsia` and `oklch(`. All four must return nothing.

## Related

- [Component library](../components/README.md)
- [Theme and shadcn variable mapping](../theme/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)
'''

FILES_A["templates/next-app/README.md"] = '''# Next.js reference app

A minimal Next.js 15 App Router application that runs the five templates without any
other setup. It exists so the templates can be verified, not so it can be shipped as-is.

```bash
cd templates/next-app
cp -r ../../components/nova ./components/nova
cp -r ../../lib ./lib
cp ../../theme/nova-theme.css ./app/nova-theme.css
npm install
npm run dev
```

Routes:

| Route | File | Renders |
| --- | --- | --- |
| `/` | `app/page.tsx` | Marketing home, eight sections |
| `/pricing` | `app/pricing/page.tsx` | Plans, comparison table, FAQ |
| `/dashboard` | `app/dashboard/page.tsx` | Metrics, charts, table, activity |
| `/chat` | `app/chat/page.tsx` | AI workspace with streaming composer |
| `/docs` | `app/docs/page.tsx` | Documentation layout with side rails |

## Files

- `package.json` - Next 15, React 19, Tailwind v4, `motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- `tsconfig.json` - the `@/*` alias the components rely on.
- `app/layout.tsx` - root layout, metadata, font variables, `<Background />` once.
- `app/globals.css` - two imports, in order: Tailwind, then the Nova theme.
- `app/page.tsx` and the four routes above.

## Notes

- The dashboard, pricing and chat routes are client components because they hold state.
  The home and docs routes are server components; only the library pieces they import
  (reveal, counter, marquee) cross the client boundary.
- Nothing in these pages sets a color directly. Everything reads a token, so switching the
  light theme is one attribute on `<html>`: `data-theme="light"`.
- The sticky navbar height is exposed as `--nav-h` (64px), so `scroll-mt` and sticky rails
  line up without magic numbers.
'''

FILES_A["templates/next-app/package.json"] = '''{
  "name": "nova-vitral-templates",
  "private": true,
  "version": "1.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "motion": "^11.15.0",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "typescript": "^5.7.0"
  }
}
'''

FILES_A["templates/next-app/postcss.config.mjs"] = '''const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
'''

FILES_A["templates/next-app/next.config.mjs"] = '''/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The dev server is also reached through a proxy host in hosted sandboxes.
  allowedDevOrigins: ["*.e2b.app", "localhost", "127.0.0.1"],
};

export default nextConfig;
'''

FILES_A["templates/next-app/tsconfig.json"] = '''{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "allowJs": false,
    "noEmit": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'''

FILES_A["templates/next-app/app/globals.css"] = '''/* Order matters: Tailwind first, then the Nova theme, which remaps the shadcn
   semantic variables so bg-primary is indigo instead of the default purple. */
@import "tailwindcss";
@import "./nova-theme.css";
'''

FILES_A["templates/next-app/app/layout.tsx"] = '''import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Background } from "@/components/nova/core/aurora";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Meridian - Usage analytics for platform teams",
    template: "%s - Meridian",
  },
  description:
    "Meridian turns raw product events into revenue, retention and reliability signals your platform team can act on the same day.",
  metadataBase: new URL("https://meridian.example"),
  openGraph: { type: "website", siteName: "Meridian" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The aurora and grain layers are mounted once, here. Glass surfaces need a
    // background behind them: without this, the blur reads as flat gray.
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--bg)] font-[var(--font-sans)] text-[var(--fg)] antialiased">
        <Background intensity={1} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-[var(--glass-strong)] focus:px-3 focus:py-2 focus:text-[13px] focus:text-[var(--fg)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
'''

FILES_A["templates/next-app/app/page.tsx"] = '''import {
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
'''

FILES_A["templates/next-app/app/pricing/page.tsx"] = '''"use client";

import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";
import { useState } from "react";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { ButtonPrimary } from "@/components/nova/buttons/button-primary";
import { Container, Section } from "@/components/nova/core/section";
import { Reveal } from "@/components/nova/core/reveal";
import { Surface } from "@/components/nova/core/surface";
import { Footer } from "@/components/nova/navigation/footer";
import { Navbar } from "@/components/nova/navigation/navbar";
import { cn } from "@/lib/utils";

type Interval = "monthly" | "annual";

const NAV = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export default function PricingPage() {
  const [interval, setInterval] = useState<Interval>("annual");

  return (
    <>
      <Navbar
        brand="Meridian"
        items={NAV}
        currentPath="/pricing"
        actions={
          <a href="/signup" className="inline-flex">
            <ButtonPrimary size="sm">Start free</ButtonPrimary>
          </a>
        }
      />

      <main id="main">
        <section className="pt-[calc(var(--nav-h)+64px)] pb-8 md:pb-12">
          <Container>
            <div className="mx-auto max-w-[62ch] text-center">
              <Reveal>
                <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                  Pricing
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="nv-grad-text mt-3 text-[var(--fs-display)] font-semibold leading-[1.02] tracking-[-0.04em]">
                  Priced per event, not per seat
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mx-auto mt-5 max-w-[52ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
                  Invite the whole company. You pay for the events you send and the retention you keep,
                  and nothing else.
                </p>
              </Reveal>

              {/* The toggle keeps both labels in the layout, so switching never shifts width. */}
              <Reveal delay={320}>
                <div className="mt-8 flex justify-center">
                  <div
                    role="radiogroup"
                    aria-label="Billing interval"
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] p-1"
                  >
                    {(
                      [
                        { id: "monthly", label: "Monthly" },
                        { id: "annual", label: "Annual", hint: "Save 20%" },
                      ] as const
                    ).map((option) => {
                      const active = interval === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setInterval(option.id)}
                          className={cn(
                            "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] transition-colors duration-150",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                            active
                              ? "bg-[var(--glass-strong)] text-[var(--fg)]"
                              : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                          )}
                        >
                          {option.label}
                          {"hint" in option ? (
                            <span
                              className={cn(
                                "rounded-full px-1.5 py-0.5 text-[11px]",
                                active ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--fg-subtle)]",
                              )}
                            >
                              {option.hint}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Section density="dense">
          <div className="grid gap-4 lg:grid-cols-3">
            {PLANS.map((plan, index) => (
              <Reveal key={plan.id} delay={index * 80} className={plan.featured ? "lg:-mt-3 lg:mb-3" : undefined}>
                <Surface
                  strong={plan.featured}
                  className={cn("flex h-full flex-col", plan.featured && "ring-1 ring-[var(--accent-soft)]")}
                >
                  {plan.featured ? (
                    <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--accent)]">
                      <Sparkles className="size-3" aria-hidden="true" />
                      Most teams start here
                    </p>
                  ) : null}

                  <h2 className="mt-4 text-[16px] font-semibold text-[var(--fg)]">{plan.name}</h2>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--fg-muted)]">{plan.summary}</p>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-[34px] font-semibold tabular-nums tracking-[-0.03em] text-[var(--fg)]">
                      ${interval === "annual" ? plan.annual : plan.monthly}
                    </span>
                    <span className="text-[13px] text-[var(--fg-subtle)]">
                      /month {interval === "annual" ? "billed yearly" : "billed monthly"}
                    </span>
                  </p>

                  <div className="mt-6 flex flex-col gap-2">
                    <a href={plan.href} className="inline-flex">
                      {plan.featured ? (
                        <ButtonPrimary
                          full
                          iconRight={<ArrowRight className="size-4" aria-hidden="true" />}
                        >
                          {plan.cta}
                        </ButtonPrimary>
                      ) : (
                        <ButtonGlass full>{plan.cta}</ButtonGlass>
                      )}
                    </a>
                    <p className="text-center text-[12px] text-[var(--fg-subtle)]">{plan.note}</p>
                  </div>

                  <ul className="mt-7 grid gap-2.5 border-t border-[var(--hair-soft)] pt-6 text-[13.5px]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--accent-2)]" aria-hidden="true" />
                        <span className="text-[var(--fg-muted)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Surface>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          overline="Compare"
          title="What changes between plans"
          lead="Three rows decide almost every upgrade: retention, alerting and access control."
        >
          <Surface padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13.5px]">
                <caption className="sr-only">Feature comparison across the three plans</caption>
                <thead>
                  <tr className="bg-[var(--glass-dim)]">
                    <th scope="col" className="px-5 py-3.5 text-left text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                      Capability
                    </th>
                    {PLANS.map((plan) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className="px-5 py-3.5 text-left text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-t border-[var(--hair-soft)] transition-colors duration-150 hover:bg-[var(--glass-dim)]">
                      <th scope="row" className="px-5 py-4 text-left font-normal text-[var(--fg)]">
                        {row.label}
                        <span className="mt-1 block text-[12px] text-[var(--fg-subtle)]">{row.hint}</span>
                      </th>
                      {row.values.map((value, index) => (
                        <td key={index} className="px-5 py-4 text-[var(--fg-muted)]">
                          {value === true ? (
                            <Check className="size-4 text-[var(--accent-2)]" aria-label="Included" />
                          ) : value === false ? (
                            <Minus className="size-4 text-[var(--fg-subtle)]" aria-label="Not included" />
                          ) : (
                            <span className="tabular-nums">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        </Section>

        <Section overline="Questions" title="Answered before you ask">
          <div className="grid gap-3 lg:grid-cols-2">
            {FAQ.map((item, index) => (
              <Reveal key={item.question} delay={(index % 2) * 60}>
                <details className="group nv-surface p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[14px] text-[var(--fg)]">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="grid size-5 shrink-0 place-items-center rounded-full border border-[var(--hair)] text-[13px] text-[var(--fg-muted)] transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section density="dense">
          <Surface strong className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                Not sure which plan fits?
              </h2>
              <p className="mt-2 text-[14px] text-[var(--fg-muted)]">
                Send one week of events and we will size it for you, in writing, within a day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/contact" className="inline-flex">
                <ButtonPrimary iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
                  Get a sizing review
                </ButtonPrimary>
              </a>
              <a href="/docs/pricing" className="inline-flex">
                <ButtonGlass>Read the pricing docs</ButtonGlass>
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

/* ------------------------------------------------------------------ sample data */

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    summary: "For one product and one engineer asking the first questions.",
    monthly: 0,
    annual: 0,
    cta: "Start free",
    note: "No credit card. 30 day retention.",
    href: "/signup?plan=starter",
    featured: false,
    features: [
      "5 million events per month",
      "30 day retention",
      "Four saved queries",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    summary: "For a platform team shipping weekly and watching every release.",
    monthly: 249,
    annual: 199,
    cta: "Start 14 day trial",
    note: "Cancel in one click. No seat minimums.",
    href: "/signup?plan=pro",
    featured: true,
    features: [
      "100 million events per month",
      "13 month retention",
      "Unlimited saved queries and alerts",
      "Anomaly detection with cohort attribution",
      "SSO, audit log, EU or US residency",
      "Shared Slack channel, four hour response",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    summary: "For regulated teams with their own retention and residency rules.",
    monthly: 890,
    annual: 712,
    cta: "Talk to sales",
    note: "Annual agreement, invoicing available.",
    href: "/contact?plan=enterprise",
    featured: false,
    features: [
      "Unlimited events with volume pricing",
      "Custom retention up to seven years",
      "Bring your own warehouse or VPC",
      "SCIM provisioning and approvals",
      "Named support engineer, one hour response",
    ],
  },
] as const;

const COMPARISON: { label: string; hint: string; values: (string | boolean)[] }[] = [
  { label: "Retention", hint: "How far back a query can reach.", values: ["30 days", "13 months", "Up to 7 years"] },
  { label: "Alerting", hint: "Static thresholds, then anomaly detection.", values: ["Static only", "Static and anomaly", "Both, plus approvals"] },
  { label: "Cohort attribution", hint: "Which release or region moved the metric.", values: [false, true, true] },
  { label: "Access control", hint: "Who can read, write and export.", values: ["Workspace", "Roles and SSO", "SCIM, roles, approvals"] },
  { label: "Data residency", hint: "Where events are stored and processed.", values: ["EU or US", "EU or US", "Any region, pinned"] },
  { label: "Support", hint: "First response, measured monthly.", values: ["Community", "4 hours", "1 hour, named engineer"] },
];

const FAQ = [
  {
    question: "What counts as an event?",
    answer:
      "One row in your stream: a page view, an API call, a job result. Batches are counted by rows, not by requests, and duplicate ids within a 24 hour window count once.",
  },
  {
    question: "What happens when I go over the included volume?",
    answer:
      "Nothing breaks. Overage is billed at $0.60 per million events, shown in the usage view before the invoice, and you can set a hard cap that pauses ingestion instead.",
  },
  {
    question: "Do seats cost extra?",
    answer:
      "No. Reading dashboards is free for everyone in your workspace. Only editors who create queries and alerts count toward the three editor limit on Starter.",
  },
  {
    question: "Can I keep my own warehouse?",
    answer:
      "Yes. On Enterprise, Meridian reads from your warehouse and stores only aggregates, so raw events never leave your account. Supported today: BigQuery, Snowflake and ClickHouse.",
  },
  {
    question: "How does the trial end?",
    answer:
      "After 14 days you keep reading and lose write access to alerts until you choose a plan. No data is deleted, and nothing is charged without an explicit click.",
  },
  {
    question: "Is there a discount for non-profit or open source work?",
    answer:
      "Yes, 60 percent off Pro for public repositories and registered non-profits. Reply to any invoice email with a link and we apply it to the next cycle.",
  },
];
'''

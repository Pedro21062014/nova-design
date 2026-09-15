import { ArrowLeft, ArrowRight, Copy, FileText, Search } from "lucide-react";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { Container } from "@/components/nova/core/section";
import { Surface } from "@/components/nova/core/surface";
import { Navbar } from "@/components/nova/navigation/navbar";

export const metadata = {
  title: "Getting started",
  description:
    "Install the Meridian SDK, send your first batch of events and read them back as a metric in under ten minutes.",
};

const NAV = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

const TREE = [
  {
    group: "Getting started",
    items: ["Overview", "Install", "Your first event", "Reading metrics"],
  },
  {
    group: "Modeling",
    items: ["Metric definitions", "Identities", "Sessions", "Activation"],
  },
  {
    group: "Operations",
    items: ["Alerts", "Data residency", "Quotas", "Troubleshooting"],
  },
];

const ON_THIS_PAGE = [
  { id: "install", label: "Install the SDK" },
  { id: "first-event", label: "Send your first event" },
  { id: "read-back", label: "Read it back as a metric" },
  { id: "next", label: "Where to go next" },
];

const INSTALL = `npm install @meridian/sdk

# or, without a package manager
curl -sL https://meridian.example/sdk.js -o src/meridian.js`;

const FIRST_EVENT = `import { Meridian } from "@meridian/sdk";

const meridian = new Meridian({
  key: process.env.MERIDIAN_KEY,
  // One region per workspace. Pinning it prevents cross-region latency.
  region: "eu-west-1",
});

await meridian.track("account.created", {
  accountId: "acc_1",
  plan: "pro",
  seats: 8,
  source: "self-serve",
});`;

export default function DocsPage() {
  return (
    <>
      <Navbar brand="Meridian" items={NAV} currentPath="/docs" actions={<ButtonGlass size="sm">Sign in</ButtonGlass>} />

      <Container wide className="pt-[calc(var(--nav-h)+40px)] pb-20">
        <div className="grid gap-10 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[248px_minmax(0,1fr)_216px]">
          {/* Left rail: navigation tree. Hidden below 1024px, where the docs index takes over. */}
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+24px)]">
              <label className="flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3">
                <Search className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
                <span className="sr-only">Search documentation</span>
                <input
                  placeholder="Search docs"
                  className="h-full w-full bg-transparent text-[13px] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
                />
              </label>

              <nav className="mt-6 grid gap-6" aria-label="Documentation">
                {TREE.map((section) => (
                  <div key={section.group}>
                    <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                      {section.group}
                    </p>
                    <ul className="mt-2.5 grid gap-0.5 border-l border-[var(--hair-soft)]">
                      {section.items.map((item) => {
                        const active = item === "Install";
                        return (
                          <li key={item}>
                            <a
                              href={`/docs/${item.toLowerCase().replaceAll(" ", "-")}`}
                              aria-current={active ? "page" : undefined}
                              className={
                                active
                                  ? "-ml-px flex h-8 items-center border-l-2 border-[var(--accent)] pl-3 text-[13px] text-[var(--fg)]"
                                  : "-ml-px flex h-8 items-center pl-3 text-[13px] text-[var(--fg-muted)] transition-colors duration-150 hover:text-[var(--fg)]"
                              }
                            >
                              {item}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content: one measure, one column, 62 characters wide at most. */}
          <article className="min-w-0 max-w-[68ch]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-[var(--fg-subtle)]">
              <a href="/docs" className="transition-colors duration-150 hover:text-[var(--fg-muted)]">
                Docs
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--fg-muted)]">Getting started</span>
            </nav>

            <h1 className="nv-grad-text mt-4 text-[var(--fs-h1)] font-semibold tracking-[-0.03em]">
              Getting started
            </h1>
            <p className="mt-4 text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
              Install the SDK, send your first batch of events and read them back as a metric. Ten
              minutes end to end, no warehouse project required.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[var(--fg-subtle)]">
              <span>Updated 15 September 2026</span>
              <span>Reading time 6 minutes</span>
              <span>Applies to SDK 2.x</span>
            </div>

            <hr className="mt-8 h-px border-0 bg-[var(--hair-soft)]" />

            <section id="install" className="scroll-mt-[calc(var(--nav-h)+32px)] pt-8">
              <h2 className="text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                Install the SDK
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-[var(--fg-muted)]">
                The SDK is a 6KB gzip client with no transitive dependencies. It batches events in the
                browser and flushes on visibility change, so navigation does not drop the tail of a
                batch.
              </p>
              <CodeBlock language="bash" body={INSTALL} caption="Install with a package manager or a single script tag." />
            </section>

            <section id="first-event" className="scroll-mt-[calc(var(--nav-h)+32px)] pt-10">
              <h2 className="text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                Send your first event
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-[var(--fg-muted)]">
                Every event needs a name and one identity. Names are lowercase and dotted; the first
                segment is the object, the second is what happened to it.
              </p>
              <CodeBlock
                language="ts"
                body={FIRST_EVENT}
                caption="Server side is the safer default: no ad blockers, no client clocks."
              />

              <Surface padding="sm" className="mt-6 border-l-2 border-l-[var(--accent)]">
                <p className="text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                  <span className="font-medium text-[var(--fg)]">Do not send personal data.</span> Email
                  addresses, names and free text belong in a separate store. Meridian keeps raw events
                  for the retention period you choose, and raw events are readable by every editor.
                </p>
              </Surface>
            </section>

            <section id="read-back" className="scroll-mt-[calc(var(--nav-h)+32px)] pt-10">
              <h2 className="text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                Read it back as a metric
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-[var(--fg-muted)]">
                A metric is one SQL statement and one definition. Save it once, then every surface -
                dashboard, alert, API - reads the same number.
              </p>

              <figure className="mt-5 overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
                <figcaption className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2 text-[11.5px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                  <FileText className="size-3.5" aria-hidden="true" />
                  metric: activation_rate
                </figcaption>
                <pre className="overflow-x-auto p-4 font-[var(--font-mono)] text-[12.5px] leading-[1.7] text-[var(--fg-muted)]">
                  <code>{`select
  count(*) filter (where activated)::numeric
    / nullif(count(*), 0) as activation_rate
from accounts
where created_at >= $__timeFrom`}</code>
                </pre>
              </figure>

              <p className="mt-5 text-[15px] leading-[1.75] text-[var(--fg-muted)]">
                Numbers in this documentation are tabular figures, so a reader comparing two tables
                never has to re-align them by eye. That is a layout decision, not a typographic
                preference: it is the same reason every metric on the dashboard right-aligns.
              </p>
            </section>

            <section id="next" className="scroll-mt-[calc(var(--nav-h)+32px)] pt-10">
              <h2 className="text-[var(--fs-h3)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                Where to go next
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Identities", copy: "Resolve devices to accounts without stitching mistakes." },
                  { title: "Alerts", copy: "Thresholds, anomaly detection and who gets paged." },
                  { title: "Data residency", copy: "Pin a region, or read from your own warehouse." },
                  { title: "Quotas", copy: "What happens at the included volume, and how to cap it." },
                ].map((card) => (
                  <Surface key={card.title} padding="sm">
                    <p className="text-[13.5px] font-medium text-[var(--fg)]">{card.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--fg-muted)]">{card.copy}</p>
                  </Surface>
                ))}
              </div>
            </section>

            <nav className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hair-soft)] pt-6" aria-label="Pager">
              <a href="/docs/overview" className="inline-flex">
                <ButtonGlass size="sm" iconLeft={<ArrowLeft className="size-3.5" aria-hidden="true" />}>
                  Overview
                </ButtonGlass>
              </a>
              <a href="/docs/your-first-event" className="inline-flex">
                <ButtonGlass size="sm" iconRight={<ArrowRight className="size-3.5" aria-hidden="true" />}>
                  Your first event
                </ButtonGlass>
              </a>
            </nav>
          </article>

          {/* Right rail: on this page. Hidden below 1280px, where the article's H2s are enough. */}
          <aside className="hidden xl:block">
            <div className="sticky top-[calc(var(--nav-h)+24px)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                On this page
              </p>
              <ul className="mt-3 grid gap-2 border-l border-[var(--hair-soft)]">
                {ON_THIS_PAGE.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={
                        index === 0
                          ? "-ml-px block border-l-2 border-[var(--accent)] pl-3 text-[12.5px] text-[var(--fg)]"
                          : "-ml-px block pl-3 text-[12.5px] text-[var(--fg-muted)] transition-colors duration-150 hover:text-[var(--fg)]"
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <Surface padding="sm" className="mt-6">
                <p className="text-[12.5px] text-[var(--fg)]">Was this page useful?</p>
                <p className="mt-1.5 text-[12px] text-[var(--fg-muted)]">
                  One click, no account required. We read every response.
                </p>
                <div className="mt-3 flex gap-2">
                  <ButtonGlass size="sm">Yes</ButtonGlass>
                  <ButtonGlass size="sm">Not quite</ButtonGlass>
                </div>
              </Surface>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

function CodeBlock({ language, body, caption }: { language: string; body: string; caption?: string }) {
  return (
    <figure className="mt-5 overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
      <figcaption className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2">
        <span className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          {language}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-[var(--fg-subtle)]">
          <Copy className="size-3.5" aria-hidden="true" />
          Copy
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-[var(--font-mono)] text-[12.5px] leading-[1.7] text-[var(--fg-muted)]">
        <code>{body}</code>
      </pre>
      {caption ? (
        <p className="border-t border-[var(--hair)] px-4 py-2.5 text-[12px] text-[var(--fg-subtle)]">{caption}</p>
      ) : null}
    </figure>
  );
}

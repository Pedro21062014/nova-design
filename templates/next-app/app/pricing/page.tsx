"use client";

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

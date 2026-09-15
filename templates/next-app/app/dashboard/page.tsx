"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calendar,
  Download,
  Filter,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { ButtonPrimary } from "@/components/nova/buttons/button-primary";
import { Container } from "@/components/nova/core/section";
import { Surface } from "@/components/nova/core/surface";
import { Counter } from "@/components/nova/motion/counter";
import { StatusPill } from "@/components/nova/feedback/status-pill";
import { cn } from "@/lib/utils";

type Range = "7d" | "30d" | "90d";

interface Account {
  id: string;
  name: string;
  plan: "Starter" | "Pro" | "Enterprise";
  mrr: number;
  usage: number;
  change: number;
  health: "healthy" | "watch" | "at risk";
}

const ACCOUNTS: Account[] = [
  { id: "acc_1", name: "Northwind", plan: "Enterprise", mrr: 18400, usage: 92, change: 6.4, health: "healthy" },
  { id: "acc_2", name: "Aperture Systems", plan: "Pro", mrr: 9600, usage: 78, change: 2.1, health: "healthy" },
  { id: "acc_3", name: "Kestrel Labs", plan: "Pro", mrr: 7200, usage: 64, change: -1.8, health: "watch" },
  { id: "acc_4", name: "Solstice", plan: "Enterprise", mrr: 24800, usage: 88, change: 4.9, health: "healthy" },
  { id: "acc_5", name: "Ravel", plan: "Starter", mrr: 900, usage: 41, change: -12.4, health: "at risk" },
  { id: "acc_6", name: "Trema Group", plan: "Pro", mrr: 5200, usage: 71, change: 1.2, health: "healthy" },
];

const EVENTS = [
  { id: "e1", who: "Ilse Brand", what: "created an alert on revenue per account", when: "6 min ago" },
  { id: "e2", who: "Tomas Erdahl", what: "pinned the release impact query", when: "22 min ago" },
  { id: "e3", who: "Meridian", what: "detected an anomaly in eu-west ingestion", when: "1 h ago" },
  { id: "e4", who: "Priya Raman", what: "invited four viewers to the workspace", when: "3 h ago" },
];

export default function DashboardPage() {
  const [range, setRange] = useState<Range>("30d");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ACCOUNTS;
    return ACCOUNTS.filter(
      (account) =>
        account.name.toLowerCase().includes(needle) || account.plan.toLowerCase().includes(needle),
    );
  }, [query]);

  const totals = useMemo(
    () => ({
      mrr: rows.reduce((sum, row) => sum + row.mrr, 0),
      accounts: rows.length,
      atRisk: rows.filter((row) => row.health === "at risk").length,
    }),
    [rows],
  );

  return (
    <div className="min-h-dvh pt-[var(--nav-h)]">
      <header className="fixed inset-x-0 top-0 z-[var(--z-nav)] h-[var(--nav-h)] border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-[var(--blur-md)]">
        <Container wide className="flex h-full items-center gap-4">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[var(--fg)]">
            <span className="grid size-6 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[11px]">
              M
            </span>
            Meridian
          </span>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {["Overview", "Accounts", "Usage", "Alerts", "Settings"].map((item) => (
              <a
                key={item}
                href={`/dashboard/${item.toLowerCase()}`}
                aria-current={item === "Overview" ? "page" : undefined}
                className={cn(
                  "relative rounded-[var(--radius-sm)] px-3 py-2 text-[13px] transition-colors duration-150",
                  item === "Overview"
                    ? "text-[var(--fg)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                )}
              >
                {item}
                {item === "Overview" ? (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
                ) : null}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ButtonGlass size="sm" iconLeft={<Calendar className="size-3.5" aria-hidden="true" />}>
              Last 30 days
            </ButtonGlass>
            <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] text-[var(--fg-muted)]">
              <Bell className="size-3.5" aria-hidden="true" />
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-[var(--glass-strong)] text-[11px] text-[var(--fg)]">
              PB
            </span>
          </div>
        </Container>
      </header>

      <main id="main">
        <Container wide className="py-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[var(--fs-h2)] font-semibold tracking-[-0.025em] text-[var(--fg)]">Overview</h1>
              <p className="mt-1.5 text-[13.5px] text-[var(--fg-muted)]">
                Revenue, usage and health across every account in production.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill />
              <ButtonGlass size="sm" iconLeft={<Download className="size-3.5" aria-hidden="true" />}>
                Export
              </ButtonGlass>
              <ButtonPrimary
                size="sm"
                iconLeft={<TrendingUp className="size-3.5" aria-hidden="true" />}
              >
                New alert
              </ButtonPrimary>
            </div>
          </div>

          {/* Metrics: counters read their value once, at 50 percent visibility. */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Net MRR" value={totals.mrr} prefix="$" delta={5.8} />
            <MetricCard label="Accounts in production" value={totals.accounts} delta={2.4} />
            <MetricCard label="Events yesterday" value={38.4} suffix="M" decimals={1} delta={9.1} />
            <MetricCard label="Accounts at risk" value={totals.atRisk} delta={-3.2} inverted />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <Surface className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[14px] font-medium text-[var(--fg)]">Event volume</h2>
                  <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">
                    Ingested, validated and quarantined, per day.
                  </p>
                </div>
                <div
                  role="radiogroup"
                  aria-label="Time range"
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] p-1"
                >
                  {(["7d", "30d", "90d"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={range === option}
                      onClick={() => setRange(option)}
                      className={cn(
                        "h-7 rounded-full px-3 text-[12px] transition-colors duration-150",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                        range === option
                          ? "bg-[var(--glass-strong)] text-[var(--fg)]"
                          : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <VolumeChart range={range} />

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-[var(--fg-muted)]">
                {[
                  { label: "Accepted", color: "var(--accent)" },
                  { label: "Quarantined", color: "var(--warn)" },
                  { label: "Rejected", color: "var(--danger)" },
                ].map((series) => (
                  <span key={series.label} className="inline-flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: series.color }} aria-hidden="true" />
                    {series.label}
                  </span>
                ))}
              </div>
            </Surface>

            <Surface className="p-5">
              <h2 className="text-[14px] font-medium text-[var(--fg)]">Workspace activity</h2>
              <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">Last four changes, newest first.</p>

              <ol className="mt-5 grid gap-4">
                {EVENTS.map((event) => (
                  <li key={event.id} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    <div>
                      <p className="text-[13px] text-[var(--fg)]">
                        <span className="font-medium">{event.who}</span> {event.what}
                      </p>
                      <p className="mt-0.5 text-[12px] text-[var(--fg-subtle)]">{event.when}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Surface>
          </div>

          {/* Dense table: sticky header, sortable columns, row actions on hover. */}
          <div className="mt-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-[14px] font-medium text-[var(--fg)]">Accounts</h2>
                <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">
                  {rows.length} of {ACCOUNTS.length} accounts, sorted by net MRR.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 focus-within:border-[var(--hair-strong)]">
                  <Search className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
                  <span className="sr-only">Search accounts</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search accounts"
                    className="h-full w-[190px] bg-transparent text-[13px] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
                  />
                </label>
                <ButtonGlass size="sm" iconLeft={<Filter className="size-3.5" aria-hidden="true" />}>
                  Filters
                </ButtonGlass>
                <ButtonGlass size="sm" iconLeft={<Settings className="size-3.5" aria-hidden="true" />}>
                  Columns
                </ButtonGlass>
              </div>
            </div>

            <Surface padding="none" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13.5px]">
                  <caption className="sr-only">Accounts by net monthly recurring revenue</caption>
                  <thead className="bg-[var(--glass-dim)]">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-left text-[11.5px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Account
                      </th>
                      <th scope="col" className="px-5 py-3 text-left text-[11.5px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Plan
                      </th>
                      <th scope="col" className="px-5 py-3 text-right text-[11.5px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Net MRR
                      </th>
                      <th scope="col" className="px-5 py-3 text-right text-[11.5px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Change
                      </th>
                      <th scope="col" className="px-5 py-3 text-left text-[11.5px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Usage
                      </th>
                      <th scope="col" className="px-5 py-3 text-left text-[11.5px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Health
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((account) => (
                      <tr
                        key={account.id}
                        className="group border-t border-[var(--hair-soft)] transition-colors duration-150 hover:bg-[var(--glass-dim)]"
                      >
                        <td className="px-5 py-3.5 text-[var(--fg)]">{account.name}</td>
                        <td className="px-5 py-3.5 text-[var(--fg-muted)]">{account.plan}</td>
                        <td className="px-5 py-3.5 text-right tabular-nums text-[var(--fg)]">
                          ${account.mrr.toLocaleString("en-US")}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Delta value={account.change} />
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--hair-soft)]">
                              <span
                                className="block h-full rounded-full bg-[var(--accent)]"
                                style={{ width: `${account.usage}%` }}
                              />
                            </span>
                            <span className="tabular-nums text-[12px] text-[var(--fg-muted)]">
                              {account.usage}%
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px]",
                              account.health === "healthy" && "border-[var(--hair)] text-[var(--accent-2)]",
                              account.health === "watch" && "border-[var(--hair)] text-[var(--warn)]",
                              account.health === "at risk" && "border-[var(--hair)] text-[var(--danger)]",
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                account.health === "healthy" && "bg-[var(--accent-2)]",
                                account.health === "watch" && "bg-[var(--warn)]",
                                account.health === "at risk" && "bg-[var(--danger)]",
                              )}
                              aria-hidden="true"
                            />
                            {account.health}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rows.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <p className="text-[13.5px] text-[var(--fg-muted)]">No account matches "{query}".</p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-3 text-[13px] text-[var(--accent)] transition-colors duration-150 hover:text-[var(--fg)]"
                  >
                    Clear the search
                  </button>
                </div>
              ) : null}
            </Surface>
          </div>
        </Container>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ page-local parts */

function MetricCard({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  delta,
  inverted,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: number;
  inverted?: boolean;
}) {
  return (
    <Surface padding="sm" className="nv-fade-up">
      <p className="text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{label}</p>
      <p className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-[var(--fg)]">
        {prefix}
        <Counter value={value} suffix={suffix} decimals={decimals} />
      </p>
      <div className="mt-2">
        <Delta value={delta} inverted={inverted} />
      </div>
    </Surface>
  );
}

function Delta({ value, inverted }: { value: number; inverted?: boolean }) {
  const positive = value >= 0;
  const good = inverted ? !positive : positive;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12.5px] tabular-nums",
        good ? "text-[var(--accent-2)]" : "text-[var(--danger)]",
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

function VolumeChart({ range }: { range: Range }) {
  const points = {
    "7d": [42, 58, 51, 67, 74, 63, 81],
    "30d": [38, 44, 41, 52, 49, 58, 61, 57, 66, 72],
    "90d": [30, 34, 39, 37, 45, 48, 46, 55, 59, 57, 64, 70],
  }[range];

  const max = Math.max(...points);
  const step = 320 / (points.length - 1);
  const line = points
    .map((value, index) => `${(index * step).toFixed(1)},${(84 - (value / max) * 72).toFixed(1)}`)
    .join(" ");

  return (
    <div className="mt-5">
      <svg viewBox="0 0 320 96" className="h-32 w-full" role="img" aria-label={`Event volume, ${range}`}>
        <defs>
          <linearGradient id="dashboard-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((row) => (
          <line
            key={row}
            x1="0"
            x2="320"
            y1={12 + row * 24}
            y2={12 + row * 24}
            stroke="var(--hair-soft)"
            strokeWidth="1"
          />
        ))}

        <path d={`M0,96 L${line} L320,96 Z`} fill="url(#dashboard-fill)" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

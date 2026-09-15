"""Templates, part B: pages 3 to 5 (dashboard, AI workspace, documentation)."""

FILES_B: dict[str, str] = {}

FILES_B["templates/next-app/app/dashboard/page.tsx"] = '''"use client";

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
'''

FILES_B["templates/next-app/app/chat/page.tsx"] = '''"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Copy,
  FileText,
  Paperclip,
  Search,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { ButtonPrimary } from "@/components/nova/buttons/button-primary";
import { Composer } from "@/components/nova/chat/composer";
import { Container } from "@/components/nova/core/section";
import { Surface } from "@/components/nova/core/surface";
import { cn } from "@/lib/utils";

interface Thread {
  id: string;
  title: string;
  preview: string;
  when: string;
  pinned?: boolean;
}

interface Turn {
  id: string;
  role: "user" | "assistant";
  model?: string;
  content: string;
  reasoning?: string[];
  tools?: { name: string; detail: string; ms: string }[];
  sources?: { title: string; url: string; snippet: string }[];
  code?: { language: string; body: string };
}

const THREADS: Thread[] = [
  { id: "t1", title: "Retention curve by first action", preview: "Compare weekly retention for two cohorts", when: "2 min ago", pinned: true },
  { id: "t2", title: "Alert fatigue review", preview: "Which alerts fired without action", when: "1 h ago" },
  { id: "t3", title: "eu-west ingestion anomaly", preview: "Timeline and blast radius", when: "Yesterday" },
  { id: "t4", title: "Pricing page experiment", preview: "Lift on trial starts, 14 days", when: "2 days ago" },
  { id: "t5", title: "Warehouse sync schema", preview: "Column mapping for BigQuery", when: "Last week" },
];

const TURNS: Turn[] = [
  {
    id: "u1",
    role: "user",
    content:
      "Compare 30 day retention for accounts whose first action was creating an alert, against accounts whose first action was running a query. Note anything above two standard deviations.",
  },
  {
    id: "a1",
    role: "assistant",
    model: "nova-3",
    reasoning: [
      "Identify the two cohorts from the first-action field in the activation table.",
      "Restrict to accounts created in the last 90 days so both cohorts have 30 days of observation.",
      "Compare week four retention and flag anything beyond two standard deviations.",
    ],
    tools: [
      { name: "query", detail: "activation_cohorts, 41,208 rows", ms: "612ms" },
      { name: "stats", detail: "two proportion z-test, alpha 0.05", ms: "84ms" },
    ],
    content:
      "Accounts that started by creating an alert retain at 71.4 percent in week four, against 58.9 percent for accounts that started with a query. The gap of 12.5 points is 3.1 standard deviations, well outside normal variation, and it holds in both billing regions.\\n\\nTwo things worth checking before you act on it:\\n\\n1. Accounts with enough data to write a meaningful alert are self-selecting. They tend to be larger, so the effect may be size rather than the first action itself.\\n2. The query cohort includes accounts created by an invite, which historically retain about six points lower than self-serve signups.\\n\\nA cheap test: keep the comparison, but restrict both cohorts to accounts above twenty monthly active users. If the gap survives, product onboarding should open with the alert builder instead of the query editor.",
    sources: [
      { title: "Activation cohort definitions", url: "/docs/modeling/activation", snippet: "First action is recorded once, on the first session that produces a durable object." },
      { title: "Retention methodology", url: "/docs/metrics/retention", snippet: "Week four retention uses the rolling seven day window ending on day 28." },
    ],
    code: {
      language: "sql",
      body: `select
  date_trunc('week', a.created_at) as cohort_week,
  a.first_action,
  count(distinct a.id) as accounts,
  avg(s.week4_active) as week4_retention
from activation_cohorts as a
left join session_metrics as s on s.account_id = a.id
where a.created_at > current_date - interval '90 days'
group by 1, 2
order by 1 desc;`,
    },
  },
];

export default function ChatPage() {
  const [turns, setTurns] = useState<Turn[]>(TURNS);
  const [streaming, setStreaming] = useState(false);
  const [activeThread, setActiveThread] = useState("t1");
  const transcript = useRef<HTMLDivElement>(null);

  // Auto-scroll only while the reader is already at the bottom. Never fight them.
  useEffect(() => {
    const node = transcript.current;
    if (!node) return;
    const nearBottom = node.scrollHeight - node.scrollTop - node.clientHeight < 160;
    if (nearBottom) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const send = (message: string) => {
    const id = `u${turns.length + 1}`;
    setTurns((current) => [
      ...current,
      { id, role: "user", content: message },
      {
        id: `a${turns.length + 2}`,
        role: "assistant",
        model: "nova-3",
        content: "Looking that up. This reply is the demo placeholder from the template.",
      },
    ]);
    setStreaming(true);
    window.setTimeout(() => setStreaming(false), 1400);
  };

  return (
    <Container wide className="pt-[var(--nav-h)]">
      <div className="grid min-h-[calc(100dvh-var(--nav-h))] gap-0 lg:grid-cols-[268px_1fr_296px]">
        {/* Rail 1: threads */}
        <aside className="hidden border-r border-[var(--hair)] py-5 pr-5 lg:block">
          <ButtonPrimary full iconLeft={<Sparkles className="size-3.5" aria-hidden="true" />}>
            New thread
          </ButtonPrimary>

          <label className="mt-4 flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 focus-within:border-[var(--hair-strong)]">
            <Search className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            <span className="sr-only">Search threads</span>
            <input
              placeholder="Search threads"
              className="h-full w-full bg-transparent text-[13px] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
            />
          </label>

          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
            Recent
          </p>
          <nav className="mt-2 grid gap-0.5" aria-label="Threads">
            {THREADS.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveThread(thread.id)}
                aria-current={activeThread === thread.id ? "true" : undefined}
                className={cn(
                  "grid gap-0.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  activeThread === thread.id ? "bg-[var(--glass-strong)]" : "hover:bg-[var(--glass-dim)]",
                )}
              >
                <span className="flex items-center gap-2 text-[13px] text-[var(--fg)]">
                  {thread.pinned ? <Star className="size-3 text-[var(--accent)]" aria-hidden="true" /> : null}
                  <span className="truncate">{thread.title}</span>
                </span>
                <span className="truncate text-[12px] text-[var(--fg-muted)]">{thread.preview}</span>
                <span className="text-[11px] text-[var(--fg-subtle)]">{thread.when}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Rail 2: the transcript. Assistant turns are documents, not bubbles. */}
        <section className="flex min-h-0 flex-col px-5 py-5" aria-label="Conversation">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hair)] pb-4">
            <div>
              <h1 className="text-[15px] font-medium text-[var(--fg)]">Retention curve by first action</h1>
              <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">
                Grounded on 2 sources and 2 tool calls. Cost so far: $0.41.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ButtonGlass size="sm" iconLeft={<Paperclip className="size-3.5" aria-hidden="true" />}>
                Add context
              </ButtonGlass>
              <ButtonGlass size="sm" iconLeft={<Clock className="size-3.5" aria-hidden="true" />}>
                History
              </ButtonGlass>
            </div>
          </header>

          <div ref={transcript} className="min-h-0 flex-1 overflow-y-auto py-2">
            {turns.map((turn) =>
              turn.role === "user" ? (
                <article key={turn.id} className="flex justify-end py-4 nv-fade-up">
                  <div className="max-w-[62ch] rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-4 py-3">
                    <p className="text-[14.5px] leading-[1.65] text-[var(--fg)]">{turn.content}</p>
                  </div>
                </article>
              ) : (
                <article key={turn.id} className="group py-5 nv-fade-up">
                  <header className="flex items-center gap-2 text-[12px] text-[var(--fg-subtle)]">
                    <span className="grid size-6 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
                      <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-[var(--fg-muted)]">{turn.model}</span>
                    <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      1.4s, 812 tokens
                    </span>
                  </header>

                  {turn.reasoning ? (
                    <details className="group/reason mt-3 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
                      <summary className="flex cursor-pointer items-center gap-2 text-[12.5px] text-[var(--fg-muted)]">
                        <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                        Reasoning, 3 steps
                        <ChevronDown
                          className="ml-auto size-4 transition-transform duration-200 group-open/reason:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <ol className="mt-3 grid list-decimal gap-2 pl-5 text-[12.5px] leading-relaxed text-[var(--fg-muted)]">
                        {turn.reasoning.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </details>
                  ) : null}

                  {turn.tools ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {turn.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2.5"
                        >
                          <Check className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
                          <span className="font-[var(--font-mono)] text-[12.5px] text-[var(--fg)]">{tool.name}</span>
                          <span className="truncate text-[12px] text-[var(--fg-muted)]">{tool.detail}</span>
                          <span className="ml-auto shrink-0 font-[var(--font-mono)] text-[11.5px] tabular-nums text-[var(--fg-subtle)]">
                            {tool.ms}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 max-w-[76ch] text-[15.5px] leading-[1.75] text-[var(--fg)]">
                    {turn.content.split("\\n\\n").map((paragraph, index) => (
                      <p key={index} className={index ? "mt-4" : undefined}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {turn.code ? <CodeBlock code={turn.code} /> : null}

                  {turn.sources ? (
                    <div className="mt-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                        Sources
                      </p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {turn.sources.map((source) => (
                          <a
                            key={source.url}
                            href={source.url}
                            className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3 transition-colors duration-150 hover:bg-[var(--glass)]"
                          >
                            <span className="flex items-center gap-2 text-[12.5px] text-[var(--fg)]">
                              <BookOpen className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                              {source.title}
                            </span>
                            <span className="mt-1.5 block text-[12px] leading-relaxed text-[var(--fg-muted)]">
                              {source.snippet}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-center gap-1">
                    {[
                      { icon: Copy, label: "Copy answer" },
                      { icon: ThumbsUp, label: "Good answer" },
                      { icon: ThumbsDown, label: "Poor answer" },
                    ].map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        aria-label={action.label}
                        className="grid size-8 place-items-center rounded-[var(--radius-sm)] text-[var(--fg-subtle)] transition-colors duration-150 hover:bg-[var(--glass-dim)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      >
                        <action.icon className="size-3.5" aria-hidden="true" />
                      </button>
                    ))}
                    <button
                      type="button"
                      className="ml-1 inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-[12.5px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass-dim)] hover:text-[var(--fg)]"
                    >
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                      Open as note
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>

          <Composer onSend={send} streaming={streaming} onStop={() => setStreaming(false)} />
        </section>

        {/* Rail 3: context for this thread. */}
        <aside className="hidden border-l border-[var(--hair)] py-5 pl-5 xl:block">
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">Context</p>
          <ul className="mt-3 grid gap-2">
            {["activation_cohorts", "session_metrics", "releases_2026", "alert_history"].map((table) => (
              <li
                key={table}
                className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2 font-[var(--font-mono)] text-[12px] text-[var(--fg-muted)]"
              >
                <FileText className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
                {table}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
            Model
          </p>
          <Surface padding="sm" className="mt-3">
            <p className="text-[13px] text-[var(--fg)]">nova-3</p>
            <p className="mt-1 text-[12px] text-[var(--fg-muted)]">
              Temperature 0.2, tool use enabled, 32k context.
            </p>
          </Surface>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">Usage</p>
          <dl className="mt-3 grid gap-2 text-[12.5px]">
            {[
              ["Thread cost", "$0.41"],
              ["Tokens", "18,204"],
              ["Tool calls", "2"],
              ["Latency", "1.4s"],
            ].map(([term, value]) => (
              <div key={term} className="flex items-center justify-between gap-3">
                <dt className="text-[var(--fg-muted)]">{term}</dt>
                <dd className="tabular-nums text-[var(--fg)]">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Container>
  );
}

function CodeBlock({ code }: { code: { language: string; body: string } }) {
  const [copied, setCopied] = useState(false);

  return (
    <figure className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
      <figcaption className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2">
        <span className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          {code.language}
        </span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code.body);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
          className="ml-auto inline-flex h-7 items-center gap-1.5 rounded-[var(--radius-sm)] px-2 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass-dim)] hover:text-[var(--fg)]"
        >
          {copied ? (
            <Check className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-[var(--font-mono)] text-[12.5px] leading-[1.7] text-[var(--fg-muted)]">
        <code>{code.body}</code>
      </pre>
    </figure>
  );
}
'''

FILES_B["templates/next-app/app/docs/page.tsx"] = '''import { ArrowLeft, ArrowRight, Copy, FileText, Search } from "lucide-react";
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
'''

"use client";

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
      "Accounts that started by creating an alert retain at 71.4 percent in week four, against 58.9 percent for accounts that started with a query. The gap of 12.5 points is 3.1 standard deviations, well outside normal variation, and it holds in both billing regions.\n\nTwo things worth checking before you act on it:\n\n1. Accounts with enough data to write a meaningful alert are self-selecting. They tend to be larger, so the effect may be size rather than the first action itself.\n2. The query cohort includes accounts created by an invite, which historically retain about six points lower than self-serve signups.\n\nA cheap test: keep the comparison, but restrict both cohorts to accounts above twenty monthly active users. If the gap survives, product onboarding should open with the alert builder instead of the query editor.",
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
                    {turn.content.split("\n\n").map((paragraph, index) => (
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

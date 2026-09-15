"""Emiters for the 500-component registry.

Values live in scripts/lib_data.py, per-kind contracts in scripts/lib_catalog.py and the
hand-authored core layer in scripts/lib_core_files.py. This module only renders text.
"""

from __future__ import annotations

import re

from pathlib import Path

from lib_catalog import (
    ANTI_PATTERNS,
    DATA_SHAPES,
    EXAMPLE,
    LABELS,
    MOTION,
    PREVIEW,
    PROPS,
    USES,
)
from lib_core_files import CORE_FILES

RAW = "https://raw.githubusercontent.com/Pedro21062014/nova-design/main"

# Registry entries already authored by hand, mapped to their file and export.
HANDWRITTEN: dict[tuple[str, str], tuple[str, str]] = {
    ("core", "surface"): ("components/nova/core/surface.tsx", "Surface"),
    ("core", "surface-strong"): ("components/nova/core/surface.tsx", "SurfaceStrong"),
    ("core", "inset"): ("components/nova/core/surface.tsx", "Inset"),
    ("core", "aurora"): ("components/nova/core/aurora.tsx", "Aurora"),
    ("core", "grain-overlay"): ("components/nova/core/aurora.tsx", "GrainOverlay"),
    ("core", "reveal"): ("components/nova/core/reveal.tsx", "Reveal"),
    ("core", "section"): ("components/nova/core/section.tsx", "Section"),
    ("core", "container"): ("components/nova/core/section.tsx", "Container"),
    ("core", "divider"): ("components/nova/core/section.tsx", "Divider"),
    ("motion", "counter"): ("components/nova/motion/counter.tsx", "Counter"),
    ("motion", "scroll-progress"): ("components/nova/motion/scroll-progress.tsx", "ScrollProgress"),
    ("motion", "marquee-row"): ("components/nova/motion/marquee-row.tsx", "MarqueeRow"),
    ("motion", "sticky-scrolly"): ("components/nova/motion/sticky-scrolly.tsx", "StickyScrolly"),
    ("motion", "spotlight-card"): ("components/nova/motion/spotlight-card.tsx", "SpotlightCard"),
    ("motion", "tilt-card"): ("components/nova/motion/tilt-card.tsx", "TiltCard"),
    ("buttons", "button-primary"): ("components/nova/buttons/button-primary.tsx", "ButtonPrimary"),
    ("buttons", "button-glass"): ("components/nova/buttons/button-glass.tsx", "ButtonGlass"),
    ("buttons", "button-loading"): ("components/nova/buttons/button-loading.tsx", "ButtonLoading"),
    ("chat", "composer"): ("components/nova/chat/composer.tsx", "Composer"),
    ("chat", "message-assistant"): ("components/nova/chat/message-assistant.tsx", "MessageAssistant"),
    ("chat", "streaming-caret"): ("components/nova/chat/streaming-caret.tsx", "StreamingCaret"),
    ("marketing", "hero-split"): ("components/nova/marketing/hero-split.tsx", "HeroSplit"),
    ("navigation", "navbar"): ("components/nova/navigation/navbar.tsx", "Navbar"),
    ("navigation", "footer"): ("components/nova/navigation/footer.tsx", "Footer"),
    ("feedback", "status-pill"): ("components/nova/feedback/status-pill.tsx", "StatusPill"),
    ("data", "data-table"): ("components/nova/data/data-table.tsx", "DataTable"),
}

# Some names imply a better preview than their kind does: a pricing component shows plans, a
# skeleton shows shimmer rows. First matching rule wins.
KEYWORD_VISUALS: list[tuple[str, str]] = [
    ("pricing|plan|tier|billing|invoice|receipt|refund|coupon|discount|seat|trial|upgrade|checkout|cart|product|price", "pricing"),
    ("testimonial|quote|review|customer-story|case-study|social-proof", "testimonials"),
    ("logo|brand|integration|trust|badge-wall", "logos"),
    ("faq|accordion|disclosure|expand|collaps", "faq"),
    ("bar-chart|column|stacked|histogram|distribution", "chart-bars"),
    ("donut|pie|gauge|ring|radial|meter|bullet", "chart-donut"),
    ("heatmap|activity-grid|contribution", "chart-heat"),
    ("funnel|conversion-steps|dropoff", "chart-bars"),
    ("sparkline|area-chart|line-chart|trend|forecast|volume-chart", "data"),
    ("skeleton|shimmer|placeholder", "skeleton"),
    ("step|stepper|wizard|progress-steps|roadmap|process", "steps"),
    ("kanban|board|column-view|swimlane|pipeline-view", "kanban"),
    ("calendar|schedule|date-picker|month-view|agenda|booking", "calendar"),
    ("avatar|member|user|profile|team-|people|participant|presence", "avatars"),
    ("upload|dropzone|file-|attachment|drag|import", "dropzone"),
    ("stat|kpi|metric|number|count|delta|score|usage|quota|budget|cost|token", "metric"),
    ("timeline|audit|history|changelog|activity|log|events|release", "timeline"),
    ("toast|notification|alert|banner|announce|inline-error|offline", "notification"),
    ("tab|navbar|sidebar|breadcrumb|pagination|menu|dock|rail|nav|toc|command", "nav"),
    ("table|grid|list-view|row|matrix|scim|columns|records", "table"),
    ("modal|dialog|drawer|sheet|popover|tooltip|lightbox|inspector|panel|overlay", "overlay"),
    ("message|chat|thread|composer|conversation|reply|mention|follow-up|citation|artifact", "chat"),
    ("code|terminal|diff|json|log-viewer|editor|snippet|markdown|formula", "editor"),
    ("video|image|gallery|media|photo|waveform|audio|frame|before-after|preview", "media"),
    ("form|field|input|select|radio|checkbox|switch|slider|signature|rating|survey|address|card-form", "form"),
    ("email|newsletter|digest|invite|verify|reset|signature-block", "email"),
    ("print|pdf|invoice-sheet|report-sheet|cover", "print"),
    ("meta|seo|og-|sitemap|robots|canonical|hreflang|structured|social-preview", "seo"),
    ("skip-link|focus|live-region|aria|landmark|contrast|sr-", "a11y"),
    ("permission|role|sso|scim|residency|compliance|contract|procurement|sla|audit-row|approval", "enterprise"),
]

VIZ_EXTRA: dict[str, str] = {
    "pricing": """<div className="grid gap-3 sm:grid-cols-3">
          {["Starter", "Pro", "Enterprise"].map((plan, index) => (
            <div
              key={plan}
              className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <p className="text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{plan}</p>
              <p className="mt-2 text-[22px] font-semibold tabular-nums text-[var(--fg)]">
                ${[0, 249, 890][index]}
                <span className="text-[12px] font-normal text-[var(--fg-subtle)]">/mo</span>
              </p>
              <ul className="mt-3 grid gap-1.5 text-[12.5px] text-[var(--fg-muted)]">
                {["Unlimited seats", index > 0 ? "13 month retention" : "30 day retention"].map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--accent-2)]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <span
                className={
                  index === 1
                    ? "mt-4 flex h-9 items-center justify-center rounded-[var(--radius-sm)] bg-[image:var(--grad-primary)] text-[12.5px] font-medium text-[var(--accent-fg)]"
                    : "mt-4 flex h-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--hair)] text-[12.5px] text-[var(--fg-muted)]"
                }
              >
                {index === 1 ? "Start trial" : "Choose plan"}
              </span>
            </div>
          ))}
        </div>""",
    "testimonials": """<div className="grid gap-3 sm:grid-cols-2">
          {[
            { quote: "We deleted eleven dashboards and kept four saved queries.", name: "Ilse Brand", role: "Head of Platform" },
            { quote: "Two regressions caught before customers noticed.", name: "Tomas Erdahl", role: "Staff Engineer" },
          ].map((item) => (
            <figure key={item.name} className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4">
              <Quote className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              <blockquote className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg)]">{item.quote}</blockquote>
              <figcaption className="mt-3 text-[12px] text-[var(--fg-subtle)]">
                {item.name}, {item.role}
              </figcaption>
            </figure>
          ))}
        </div>""",
    "logos": """<div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-[var(--hair-soft)] py-4">
          {["Northwind", "Aperture", "Kestrel Labs", "Solstice", "Ravel", "Trema"].map((logo) => (
            <span key={logo} className="text-[12.5px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              {logo}
            </span>
          ))}
        </div>""",
    "faq": """<div className="grid gap-2">
          {["What counts as an event?", "Do seats cost extra?", "How does the trial end?"].map((question, index) => (
            <details key={question} className="group rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-[13.5px] text-[var(--fg)]">
                {question}
                <Plus
                  className="size-3.5 shrink-0 text-[var(--fg-subtle)] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-[var(--fg-muted)]">
                {index === 1
                  ? "No. Reading is free for everyone; only editors count."
                  : "One row in your stream, counted once per 24 hour window."}
              </p>
            </details>
          ))}
        </div>""",
    "chart-bars": """<figure className="grid gap-3">
          <div className="flex h-28 items-end gap-2" role="img" aria-label={title}>
            {[42, 58, 51, 67, 74, 63, 81, 88].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-[3px] bg-[linear-gradient(180deg,var(--accent),color-mix(in_srgb,var(--accent)_30%,transparent))] transition-opacity duration-200 hover:opacity-100"
                style={{ height: `${height}%`, opacity: 0.55 + index * 0.05 }}
              />
            ))}
          </div>
          <figcaption className="text-[12px] text-[var(--fg-muted)]">{subtitle}</figcaption>
        </figure>""",
    "chart-donut": """<figure className="flex items-center gap-5">
          <svg viewBox="0 0 72 72" className="size-24" role="img" aria-label={title}>
            <circle cx="36" cy="36" r="28" fill="none" stroke="var(--hair)" strokeWidth="8" />
            <circle
              cx="36"
              cy="36"
              r="28"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="132 176"
              transform="rotate(-90 36 36)"
            />
          </svg>
          <figcaption className="text-[12.5px] text-[var(--fg-muted)]">
            <span className="block text-[20px] font-semibold tabular-nums text-[var(--fg)]">74%</span>
            {subtitle}
          </figcaption>
        </figure>""",
    "chart-heat": """<div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" role="img" aria-label={title}>
          {Array.from({ length: 42 }).map((_, index) => (
            <span
              key={index}
              className="aspect-square rounded-[3px] bg-[var(--accent)] transition-opacity duration-200 hover:opacity-90"
              style={{ opacity: 0.12 + ((index * 7) % 9) * 0.09 }}
            />
          ))}
        </div>""",
    "skeleton": """<div className="grid gap-3" aria-hidden="true">
          {[100, 82, 64].map((width, index) => (
            <span key={index} className="nv-shimmer block h-3 rounded-full" style={{ width: `${width}%` }} />
          ))}
          <span className="nv-shimmer block h-24 rounded-[var(--radius-md)]" />
        </div>""",
    "steps": """<ol className="grid gap-3 sm:grid-cols-4">
          {["Connect", "Model", "Watch", "Act"].map((step, index) => (
            <li key={step} className="relative rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[13.5px] text-[var(--fg)]">{step}</p>
              <p className="mt-1 text-[12px] text-[var(--fg-muted)]">
                {["Send events", "Define metrics", "Detect changes", "Ship the fix"][index]}
              </p>
              {index < 3 ? (
                <ArrowRight
                  className="absolute -right-2.5 top-1/2 hidden size-3.5 -translate-y-1/2 text-[var(--fg-subtle)] sm:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>""",
    "kanban": """<div className="grid gap-3 sm:grid-cols-3">
          {["Backlog", "In progress", "Shipped"].map((column, index) => (
            <div key={column} className="grid gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
              <p className="text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {column} {[6, 3, 12][index]}
              </p>
              {[0, 1].map((card) => (
                <span key={card} className="block rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] p-2.5">
                  <span className="block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
                  <span className="mt-2 block h-2 w-1/3 rounded-full bg-[var(--hair-soft)]" />
                </span>
              ))}
            </div>
          ))}
        </div>""",
    "calendar": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="flex items-center justify-between border-b border-[var(--hair)] px-3 py-2 text-[12px] text-[var(--fg-muted)]">
            September 2026
            <span className="flex gap-1">
              <ChevronLeft className="size-3.5" aria-hidden="true" />
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
          <div className="grid grid-cols-7 gap-px bg-[var(--hair-soft)] p-px">
            {Array.from({ length: 28 }).map((_, index) => (
              <span
                key={index}
                className="grid aspect-square place-items-center bg-[var(--bg-soft)] text-[11.5px] tabular-nums text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)]"
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>""",
    "avatars": """<div className="flex flex-wrap items-center gap-4">
          <div className="flex -space-x-2">
            {["Ilse Brand", "Tomas Erdahl", "Priya Raman", "Marc Oyelaran"].map((person) => (
              <span
                key={person}
                title={person}
                className="grid size-8 place-items-center rounded-full border border-[var(--bg)] bg-[var(--glass-strong)] text-[11px] text-[var(--fg)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {person.split(" ").map((part) => part[0]).join("")}
              </span>
            ))}
            <span className="grid size-8 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] text-[11px] tabular-nums text-[var(--fg-muted)]">
              +9
            </span>
          </div>
          <p className="text-[12.5px] text-[var(--fg-muted)]">{subtitle}</p>
        </div>""",
    "dropzone": """<div className="grid place-items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--hair-strong)] bg-[var(--glass-dim)] px-6 py-8 text-center transition-colors duration-200 hover:bg-[var(--glass)]">
          <Upload className="size-4 text-[var(--accent)]" aria-hidden="true" />
          <p className="text-[13px] text-[var(--fg)]">{title}</p>
          <p className="text-[12px] text-[var(--fg-subtle)]">CSV, Parquet or JSON up to 512MB</p>
        </div>""",
    "metric": """<div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Net MRR", value: "$412.8k", delta: "+5.8%" },
            { label: "Accounts", value: "8,914", delta: "+2.4%" },
            { label: "p95 latency", value: "184ms", delta: "-12ms" },
          ].map((cell) => (
            <div key={cell.label} className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3.5">
              <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{cell.label}</p>
              <p className="mt-1.5 text-[20px] font-semibold tabular-nums text-[var(--fg)]">{cell.value}</p>
              <p className="text-[11.5px] text-[var(--accent-2)]">{cell.delta}</p>
            </div>
          ))}
        </div>""",
    "timeline": """<ol className="grid gap-4 border-l border-[var(--hair-soft)] pl-4">
          {[
            { who: "Ilse Brand", what: "created an alert on revenue per account", when: "6 min ago" },
            { who: "Tomas Erdahl", what: "pinned the release impact query", when: "22 min ago" },
            { who: "Meridian", what: "detected an anomaly in eu-west ingestion", when: "1 h ago" },
          ].map((event) => (
            <li key={event.when} className="relative">
              <span className="absolute -left-[21px] top-1.5 size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <p className="text-[13px] text-[var(--fg)]">
                <span className="font-medium">{event.who}</span> {event.what}
              </p>
              <p className="mt-0.5 text-[12px] text-[var(--fg-subtle)]">{event.when}</p>
            </li>
          ))}
        </ol>""",
    "notification": """<div className="grid gap-2">
          {[
            { tone: "info", text: "Ingestion paused, resuming in 4 minutes." },
            { tone: "warn", text: "You have used 82 percent of the included volume." },
            { tone: "danger", text: "Upload failed. Retry, or use a smaller file." },
          ].map((item) => (
            <div
              key={item.tone}
              role="status"
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3.5 py-2.5"
            >
              <span
                className={
                  item.tone === "danger"
                    ? "size-1.5 shrink-0 rounded-full bg-[var(--danger)]"
                    : item.tone === "warn"
                      ? "size-1.5 shrink-0 rounded-full bg-[var(--warn)]"
                      : "size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                }
                aria-hidden="true"
              />
              <p className="text-[12.5px] text-[var(--fg-muted)]">{item.text}</p>
            </div>
          ))}
        </div>""",
}

ICONS_BY_VISUAL: dict[str, list[str]] = {
    "pricing": ["Check"],
    "testimonials": ["Quote"],
    "logos": [],
    "faq": ["Plus"],
    "chart-bars": [],
    "chart-donut": [],
    "chart-heat": [],
    "skeleton": [],
    "steps": ["ArrowRight"],
    "kanban": [],
    "calendar": ["ChevronLeft", "ChevronRight"],
    "avatars": [],
    "dropzone": ["Upload"],
    "metric": [],
    "timeline": [],
    "notification": [],
}


def visual_for(kind: str, name: str) -> str:
    for pattern, visual in KEYWORD_VISUALS:
        if re.search(pattern, name):
            return visual
    return kind

# Icons each preview imports, always from lucide-react.
ICONS: dict[str, list[str]] = {
    "motion": ["ArrowDown"],
    "card": ["MoreHorizontal"],
    "button": ["ArrowRight"],
    "input": ["Mail"],
    "nav": ["Search"],
    "data": ["ArrowUpRight"],
    "table": ["ArrowUpDown"],
    "chat": ["Sparkles"],
    "overlay": ["X"],
    "feedback": ["TriangleAlert", "Info"],
    "marketing": ["ArrowRight", "Play"],
    "shell": ["Search", "PanelLeft"],
    "ai": ["ChevronDown", "Sparkles"],
    "editor": ["Code"],
    "media": ["Play"],
    "commerce": ["Check"],
    "form": ["Mail"],
    "layout": ["PanelLeft"],
    "devtool": ["Terminal"],
    "utility": ["Copy", "Check"],
    "mobile": ["Bell"],
    "email": ["Mail"],
    "print": ["Printer"],
    "seo": ["Globe"],
    "a11y": ["Eye"],
    "enterprise": ["Users", "Settings"],
}

# Preview markup per kind. It renders with real CSS, so the file is inspectable in a
# running app, and it uses only the component's own props plus local sample data.
VIZ: dict[str, str] = {
    "motion": """<div className="grid gap-3">
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3].map((step, index) => (
              <span key={step} className="flex items-center gap-3">
                <span
                  className="block h-3 w-14 rounded-full bg-[var(--glass-strong)] nv-fade-up"
                  style={{ animationDelay: `${index * 60}ms` }}
                />
                {index < 3 ? <ArrowDown className="size-3.5 -rotate-90 text-[var(--fg-subtle)]" aria-hidden="true" /> : null}
              </span>
            ))}
          </div>
          <p className="text-[12px] text-[var(--fg-subtle)]">
            Cascade 60ms per child, capped at 400ms in total, 16px of travel, once.
          </p>
        </div>""",
    "card": """<div className="rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[var(--fg)]">{title}</span>
            <MoreHorizontal className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-2">
            {[0, 1, 2].map((row) => (
              <span
                key={row}
                className="block h-2 rounded-full bg-[var(--hair-soft)]"
                style={{ width: `${86 - row * 18}%` }}
              />
            ))}
          </div>
        </div>""",
    "button": """<div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] px-5 text-[13px] font-medium text-[var(--fg)] transition-transform duration-150 hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {title}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <span className="text-[12px] text-[var(--fg-subtle)]">140ms lift, 0.98 press</span>
        </div>""",
    "input": """<label className="block">
          <span className="text-[13px] font-medium text-[var(--fg)]">{title}</span>
          <span className="mt-2 flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 focus-within:border-[var(--hair-strong)] focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
            <Mail className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
            <input
              type="email"
              placeholder={subtitle}
              className="h-full w-full bg-transparent text-[14px] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
            />
          </span>
        </label>""",
    "nav": """<nav className="flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-1">
          {["Overview", "Usage", "Keys", "Settings"].map((item, index) => (
            <span
              key={item}
              aria-current={index === 1 ? "page" : undefined}
              className={
                index === 1
                  ? "relative rounded-[var(--radius-sm)] bg-[var(--glass-strong)] px-3 py-1.5 text-[13px] text-[var(--fg)]"
                  : "rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] text-[var(--fg-muted)] transition-colors duration-150 hover:text-[var(--fg)]"
              }
            >
              {item}
              {index === 1 ? (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
              ) : null}
            </span>
          ))}
          <Search className="ml-2 size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
        </nav>""",
    "data": """<figure className="grid gap-3">
          <svg viewBox="0 0 240 64" className="h-16 w-full" role="img" aria-label={title}>
            <defs>
              <linearGradient id="nv-page-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 48 L48 40 L96 44 L144 26 L192 20 L240 12 L240 64 L0 64 Z"
              fill="url(#nv-page-fill)"
            />
            <polyline
              points="0,48 48,40 96,44 144,26 192,20 240,12"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <figcaption className="flex items-center gap-2 text-[12px] text-[var(--fg-muted)]">
            <ArrowUpRight className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
            {subtitle}
          </figcaption>
        </figure>""",
    "table": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <table className="w-full border-collapse text-[13px]">
            <thead className="bg-[var(--glass-dim)] text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    Name
                    <ArrowUpDown className="size-3 opacity-50" aria-hidden="true" />
                  </span>
                </th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Acme", status: "Active", amount: "12,400" },
                { name: "Northwind", status: "Trial", amount: "900" },
              ].map((row) => (
                <tr
                  key={row.name}
                  className="border-t border-[var(--hair-soft)] transition-colors duration-150 hover:bg-[var(--glass-dim)]"
                >
                  <td className="px-3 py-2.5 text-[var(--fg)]">{row.name}</td>
                  <td className="px-3 py-2.5 text-[var(--fg-muted)]">{row.status}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--fg-muted)]">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>""",
    "chat": """<div className="grid gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
              <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
            </span>
            <p className="text-[15px] leading-[1.7] text-[var(--fg)]">
              {title}
              <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] rounded-full bg-[var(--accent)] nv-caret-blink" />
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2 text-[13px] text-[var(--fg-subtle)]">
            {subtitle}
            <span className="ml-auto rounded-full bg-[var(--glass-strong)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]">
              Enter to send
            </span>
          </div>
        </div>""",
    "overlay": """<div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="min-h-[132px] bg-[var(--bg-elevated)] p-4 opacity-40" aria-hidden="true">
            <span className="block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
            <span className="mt-2 block h-2 w-1/2 rounded-full bg-[var(--hair-soft)]" />
          </div>
          <div className="absolute inset-0 grid place-items-center bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-[8px]">
            <div className="w-[78%] rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-strong)] p-4 nv-scale-in">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[13px] font-medium text-[var(--fg)]">{title}</span>
                <X className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
              </div>
              <p className="mt-2 text-[12px] text-[var(--fg-muted)]">{subtitle}</p>
            </div>
          </div>
        </div>""",
    "feedback": """<div
          className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-4"
          role="status"
        >
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--glass-strong)]">
            <Info className="size-4 text-[var(--accent)]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[var(--fg)]">{title}</p>
            <p className="mt-1 text-[12px] text-[var(--fg-muted)]">{subtitle}</p>
          </div>
          <TriangleAlert className="ml-auto size-4 shrink-0 text-[var(--warn)]" aria-hidden="true" />
        </div>""",
    "marketing": """<div className="grid gap-4">
          <p className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[var(--fg)]">
            {title}
          </p>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] bg-[image:var(--grad-primary)] px-5 text-[13px] font-medium text-[var(--accent-fg)]">
              Start free
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            <span className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] px-5 text-[13px] text-[var(--fg-muted)]">
              <Play className="size-3.5" aria-hidden="true" />
              Watch the tour
            </span>
          </div>
        </div>""",
    "shell": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2">
            <PanelLeft className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
            <span className="text-[12px] text-[var(--fg-muted)]">{title}</span>
            <Search className="ml-auto size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-[112px_1fr]">
            <div className="grid gap-1.5 border-r border-[var(--hair)] p-2.5">
              {[0, 1, 2, 3].map((row) => (
                <span
                  key={row}
                  className={row === 1 ? "h-6 rounded-[var(--radius-sm)] bg-[var(--glass-strong)]" : "h-6 rounded-[var(--radius-sm)] bg-[var(--glass-dim)]"}
                />
              ))}
            </div>
            <div className="grid gap-2 p-3">
              <span className="block h-2 w-1/3 rounded-full bg-[var(--hair-soft)]" />
              <span className="block h-2 w-2/3 rounded-full bg-[var(--hair-soft)]" />
              <span className="block h-2 w-1/2 rounded-full bg-[var(--hair-soft)]" />
            </div>
          </div>
        </div>""",
    "ai": """<div className="grid gap-3">
          <details className="group rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] p-3">
            <summary className="flex cursor-pointer items-center gap-2 text-[13px] text-[var(--fg-muted)]">
              <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              Reasoning
              <ChevronDown
                className="ml-auto size-4 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <ol className="mt-3 grid gap-2 pl-5 text-[12px] text-[var(--fg-muted)]">
              <li className="list-decimal">Read the request and the attached schema.</li>
              <li className="list-decimal">Query the index, then rank three candidates.</li>
              <li className="list-decimal">Answer with one recommendation and one caveat.</li>
            </ol>
          </details>
          <p className="text-[15px] leading-[1.7] text-[var(--fg)]">
            {title}
            <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] rounded-full bg-[var(--accent)] nv-caret-blink" />
          </p>
          <p className="text-[12px] text-[var(--fg-subtle)]">{subtitle}</p>
        </div>""",
    "editor": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2">
            <Code className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            <span className="text-[12px] text-[var(--fg-muted)]">{title}</span>
          </div>
          <pre className="overflow-x-auto p-3 font-[var(--font-mono)] text-[12.5px] leading-6">
            <code>
              <span className="text-[var(--fg-subtle)]">12 </span>
              <span className="text-[var(--fg-muted)]">export function </span>
              <span className="text-[var(--fg)]">priceOf</span>(qty) {"{"}
              {"\\n"}
              <span className="text-[var(--fg-subtle)]">13 </span>
              {"  "}return qty * UNIT;{"\\n"}
              <span className="text-[var(--fg-subtle)]">14 </span>
              {"}"}
            </code>
          </pre>
        </div>""",
    "media": """<div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="grid aspect-video place-items-center bg-[var(--bg-elevated)]">
            <span className="grid size-11 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass-strong)] transition-transform duration-200 hover:scale-[1.04]">
              <Play className="size-4 translate-x-px text-[var(--fg)]" aria-hidden="true" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-3 py-2.5">
            <span className="text-[12.5px] text-[var(--fg-muted)]">{title}</span>
            <span className="text-[12px] tabular-nums text-[var(--fg-subtle)]">{subtitle}</span>
          </div>
        </div>""",
    "commerce": """<div className="grid gap-4 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] p-4 sm:grid-cols-[96px_1fr]">
          <div className="aspect-square rounded-[var(--radius-sm)] bg-[var(--bg-elevated)]" aria-hidden="true" />
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-medium text-[var(--fg)]">{title}</span>
              <span className="text-[16px] font-semibold tabular-nums text-[var(--fg)]">
                $49<span className="text-[12px] font-normal text-[var(--fg-subtle)]">/mo</span>
              </span>
            </div>
            <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">{subtitle}</p>
            <ul className="mt-3 grid gap-1.5 text-[12.5px] text-[var(--fg-muted)]">
              {["Unlimited projects", "SSO and audit log"].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-3.5 text-[var(--accent-2)]" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>""",
    "form": """<form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-1.5">
            <label className="text-[13px] font-medium text-[var(--fg)]" htmlFor="nv-field">
              {title}
            </label>
            <div className="flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3">
              <Mail className="size-4 text-[var(--fg-subtle)]" aria-hidden="true" />
              <input
                id="nv-field"
                className="h-full w-full bg-transparent text-[14px] text-[var(--fg)] outline-none"
                placeholder={subtitle}
              />
            </div>
            <p className="text-[12px] text-[var(--fg-subtle)]">Required. We reply within one business day.</p>
          </div>
          <button
            type="submit"
            className="h-10 rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--glass)] px-5 text-[13px] font-medium text-[var(--fg)] transition-transform duration-150 hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Continue
          </button>
        </form>""",
    "layout": """<div className="grid gap-4 rounded-[var(--radius-md)] border border-[var(--hair)] p-4 lg:grid-cols-[200px_1fr]">
          <div className="grid gap-2">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
              <PanelLeft className="size-3.5" aria-hidden="true" />
              On this page
            </span>
            {["Overview", "Install", "Theming"].map((row, index) => (
              <span
                key={row}
                className={index === 0 ? "text-[13px] text-[var(--fg)]" : "text-[13px] text-[var(--fg-muted)]"}
              >
                {row}
              </span>
            ))}
          </div>
          <div className="grid gap-2.5">
            <span className="text-[16px] font-medium text-[var(--fg)]">{title}</span>
            <span className="block h-2 w-3/4 rounded-full bg-[var(--hair-soft)]" />
            <span className="block h-2 w-full rounded-full bg-[var(--hair-soft)]" />
            <span className="block h-2 w-5/6 rounded-full bg-[var(--hair-soft)]" />
            <span className="text-[12.5px] text-[var(--fg-muted)]">{subtitle}</span>
          </div>
        </div>""",
    "devtool": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2 text-[12px] text-[var(--fg-muted)]">
            <Terminal className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            {title}
          </div>
          <div className="grid font-[var(--font-mono)] text-[12.5px]">
            {[
              { method: "GET", path: "/api/usage", ms: "142ms" },
              { method: "POST", path: "/api/chat", ms: "1.20s" },
            ].map((row) => (
              <div
                key={row.path}
                className="flex items-center gap-3 border-t border-[var(--hair-soft)] px-3 py-2 transition-colors duration-150 hover:bg-[var(--glass-dim)]"
              >
                <span className="text-[var(--accent)]">{row.method}</span>
                <span className="text-[var(--fg-muted)]">{row.path}</span>
                <span className="ml-auto tabular-nums text-[var(--fg-subtle)]">{row.ms}</span>
              </div>
            ))}
          </div>
        </div>""",
    "utility": """<div className="flex items-center gap-3">
          <span className="inline-flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-3 text-[12.5px] text-[var(--fg-muted)]">
            {title}
            <Copy className="size-3.5" aria-hidden="true" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--accent-2)]">
            <Check className="size-3.5" aria-hidden="true" />
            {subtitle}
          </span>
        </div>""",
    "mobile": """<div className="mx-auto w-[220px] rounded-[28px] border border-[var(--hair)] bg-[var(--bg-elevated)] p-2">
          <div className="rounded-[22px] border border-[var(--hair)] bg-[var(--bg-soft)] p-3">
            <div className="flex items-center justify-between text-[11px] text-[var(--fg-subtle)]">
              <span>9:41</span>
              <Bell className="size-3.5" aria-hidden="true" />
            </div>
            <p className="mt-3 text-[14px] font-medium text-[var(--fg)]">{title}</p>
            <p className="mt-1 text-[12px] text-[var(--fg-muted)]">{subtitle}</p>
            <div className="mt-3 grid gap-2">
              <span className="block h-10 rounded-[var(--radius-sm)] bg-[var(--glass)]" />
              <span className="block h-10 rounded-[var(--radius-sm)] bg-[var(--glass)]" />
            </div>
          </div>
        </div>""",
    "email": """<div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-soft)]">
          <div className="border-b border-[var(--hair)] px-4 py-3 text-[12px] text-[var(--fg-subtle)]">
            From: team@acme.test
          </div>
          <div className="px-4 py-5">
            <p className="text-[16px] font-semibold text-[var(--fg)]">{title}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--fg-muted)]">{subtitle}</p>
            <span className="mt-4 inline-flex h-9 items-center rounded-[var(--radius-sm)] bg-[image:var(--grad-primary)] px-4 text-[12.5px] font-medium text-[var(--accent-fg)]">
              Confirm address
            </span>
          </div>
          <div className="border-t border-[var(--hair)] px-4 py-3 text-[11px] text-[var(--fg-subtle)]">
            One CTA, one purpose, 600px table above.
          </div>
        </div>""",
    "print": """<div className="mx-auto w-full max-w-[420px] rounded-[var(--radius-sm)] border border-[var(--hair)] bg-white p-5 text-black">
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] font-semibold">{title}</span>
            <span className="text-[11px]">page 1 / 4</span>
          </div>
          <div className="mt-3 h-px w-full bg-black/20" />
          <div className="mt-3 grid gap-2 text-[12px]">
            <span className="block h-2 w-3/4 rounded-full bg-black/10" />
            <span className="block h-2 w-full rounded-full bg-black/10" />
            <span className="block h-2 w-2/3 rounded-full bg-black/10" />
          </div>
          <p className="mt-3 text-[11px] text-black/60">{subtitle}</p>
        </div>""",
    "seo": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] bg-[var(--bg-elevated)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] px-3 py-2 text-[12px] text-[var(--fg-muted)]">
            <Globe className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            head
          </div>
          <pre className="overflow-x-auto p-3 font-[var(--font-mono)] text-[12.5px] leading-6 text-[var(--fg-muted)]">
            <code>{`<title>${title}</title>
<meta name="description" content="${subtitle}" />
<link rel="canonical" href="https://example.test/pricing" />
<script type="application/ld+json">{...}</script>`}</code>
          </pre>
        </div>""",
    "a11y": """<div className="grid gap-3">
          <span className="inline-flex h-9 w-fit items-center rounded-[var(--radius-sm)] bg-[var(--glass-strong)] px-3 text-[12.5px] text-[var(--fg)] outline-2 outline-offset-2 outline-[var(--accent)]">
            <Eye className="mr-2 size-3.5" aria-hidden="true" />
            {title}
          </span>
          <p aria-live="polite" className="text-[12.5px] text-[var(--fg-muted)]">
            {subtitle}
          </p>
          <p className="text-[12px] text-[var(--fg-subtle)]">
            Focus ring visible, label programmatic, announcement polite.
          </p>
        </div>""",
    "enterprise": """<div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
          <div className="flex items-center gap-2 border-b border-[var(--hair)] bg-[var(--glass-dim)] px-3 py-2 text-[12px] text-[var(--fg-muted)]">
            <Users className="size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
            {title}
            <Settings className="ml-auto size-3.5 text-[var(--fg-subtle)]" aria-hidden="true" />
          </div>
          <div className="grid">
            {[
              { role: "Owner", members: "2", scope: "Organization" },
              { role: "Billing admin", members: "1", scope: "Workspace" },
            ].map((row) => (
              <div
                key={row.role}
                className="flex items-center gap-3 border-t border-[var(--hair-soft)] px-3 py-2.5 text-[12.5px] transition-colors duration-150 hover:bg-[var(--glass-dim)]"
              >
                <span className="text-[var(--fg)]">{row.role}</span>
                <span className="tabular-nums text-[var(--fg-muted)]">{row.members}</span>
                <span className="ml-auto text-[var(--fg-subtle)]">{row.scope}</span>
              </div>
            ))}
          </div>
        </div>""",
}


# Every lucide icon name any snippet may reference. The emitter imports only the ones a given
# preview actually uses, which keeps the import line honest for all five hundred files.
LUCIDE_WHITELIST: set[str] = set()
for _names in list(ICONS.values()) + list(ICONS_BY_VISUAL.values()):
    LUCIDE_WHITELIST.update(_names)


def icons_used_in(viz: str) -> list[str]:
    return sorted({token for token in re.findall(r"\b[A-Z][A-Za-z0-9]*\b", viz) if token in LUCIDE_WHITELIST})


def pascal(slug: str) -> str:
    return "".join(part[:1].upper() + part[1:] for part in slug.replace("_", "-").split("-") if part)


def title_of(slug: str) -> str:
    small = {"and", "or", "of", "the", "to", "in", "with", "for"}
    words = slug.split("-")
    return " ".join(
        word if index and word in small else word[:1].upper() + word[1:] for index, word in enumerate(words)
    )


def labels_for(kind: str, index: int) -> tuple[str, str]:
    pool = LABELS.get(kind) or [("Nova component", "Replace with your data")]
    entry = pool[index % len(pool)]
    return entry[0], entry[1]


REACT_TYPES = ("ReactNode", "ElementType", "CSSProperties", "FormEvent")


def prop_rows(kind: str) -> list[tuple[str, str, str, str]]:
    """Every page component exposes title and subtitle, then its kind-specific extras."""
    rows = [row for row in PROPS[kind] if row[0] != "className"]
    names = {row[0] for row in rows}
    if "title" not in names:
        rows.insert(0, ("title", "string", "-", "Heading; the preview uses a realistic label."))
        names.add("title")
    if "subtitle" not in names:
        rows.insert(1, ("subtitle", "string", "-", "One supporting line, muted."))
    return rows


def interface_body(kind: str) -> str:
    rows = []
    for prop, type_, default, notes in prop_rows(kind):
        optional = "?" if default != "-" or prop in {"title", "subtitle"} else ""
        rows.append(f"  /** {notes} */\n  {prop}{optional}: {type_};")
    rows.append("  /** Merged last, so call sites always win. */\n  className?: string;")
    return "\n".join(rows)


def react_import(body: str) -> str:
    used = ["ComponentPropsWithoutRef"] + [name for name in REACT_TYPES if name in body]
    imports = ", ".join("type " + name for name in used)
    return "import { " + imports + ' } from "react";\n'


def render_component(
    category: str,
    kind: str,
    name: str,
    blurb: str,
    index: int,
    related: list[tuple[str, str]] | None = None,
) -> str:
    comp = pascal(name)
    display = title_of(name)
    interface = interface_body(kind)
    react_types = react_import(interface)
    title, subtitle = labels_for(kind, index)
    visual = visual_for(kind, name)
    viz = VIZ_EXTRA.get(visual, VIZ.get(visual, VIZ[kind]))
    used = icons_used_in(viz)
    badge_icon = used[0] if used else ICONS[kind][0]
    icons = ", ".join(sorted(set(used) | {badge_icon}))
    url = f"{RAW}/components/nova/{category}/README.md"
    motion = MOTION[kind]
    example = (
        EXAMPLE[kind]
        .replace("{X}", comp)
        .replace("{T1}", title)
        .replace("{T2}", subtitle)
        .replace("{N}", name)
        .replace("{c}", "{children}")
    )
    uses = USES[category]

    siblings = related or []
    related_markup = "\n".join(
        '          <li>\n'
        '            <a\n'
        f'              href="./{slug}.tsx"\n'
        '              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"\n'
        '            >\n'
        f'              {pascal(slug)}\n'
        '            </a>\n'
        '          </li>'
        for slug, _blurb in siblings
    )

    return f'''/**
 * {display} - {blurb}
 *
 * Nova Vitral family: {category}. Spec sections: {uses}.
 *
 * Motion: {motion}
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: {url}
 *
 * Example
 * -------
 * {example}
 */
import {{ {icons} }} from "lucide-react";
{react_types}import {{ cn }} from "@/lib/utils";

export interface {comp}Props
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {{
{interface}
}}

export function {comp}({{ title = "{title}", subtitle = "{subtitle}", className, ...props }}: {comp}Props) {{
  return (
    <section
      className={{cn("nv-surface nv-fade-up rounded-[var(--radius-lg)] p-6", className)}}
      aria-label={{title}}
      {{...props}}
    >
      <header className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-[var(--fg)]">{{title}}</h3>
          <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">{{subtitle}}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-[var(--font-mono)] text-[11px] text-[var(--fg-subtle)]">
          <{badge_icon} className="size-3.5" aria-hidden="true" />
          {category}/{name}
        </span>
      </header>

      <div className="mt-5">
        {viz}
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
{related_markup}
        </ul>
      </footer>
    </section>
  );
}}

export default {comp};
'''


def render_category_readme(category: str, description: str, entries: list[tuple[str, str, str]]) -> str:
    rows = []
    for kind, name, blurb in entries:
        owner = HANDWRITTEN.get((category, name))
        target = f"./{Path(owner[0]).name}" if owner else f"./{name}.tsx"
        rows.append(f"| `{name}` | `{kind}` | {blurb} | [{pascal(name)}]({target}) |")
    table = "\n".join(rows)

    motion = "\n".join(f"- {line}" for line in sorted({MOTION[kind] for kind, _, _ in entries}))
    issues = "\n".join(f"- {line}" for line in ANTI_PATTERNS.get(category, []))
    handwritten = [
        f"- [{pascal(name)}](./{Path(HANDWRITTEN[(category, name)][0]).name}) - hand-authored in this category."
        for kind, name, _ in entries
        if (category, name) in HANDWRITTEN
    ]

    shape = DATA_SHAPES.get(category)
    shape_block = f"\n## Data shape\n\n{shape}\n" if shape else ""

    hand_block = (
        "\n## Hand-authored files\n\n"
        + "\n".join(handwritten)
        + "\n\nThese files are maintained by hand because they define the contract the rest of\n"
        "the category follows. Regenerating the folder never overwrites them.\n"
        if handwritten
        else ""
    )

    return f'''# {title_of(category)} components

{description}

{len(entries)} components. Every file is a self-contained React + TypeScript + Tailwind
component that renders no purple, reserves its own layout box and ships motion. Icons come
from `lucide-react` only.

```bash
# from the repository root
cp -r components/nova/ <your-app>/components/nova/
cp -r lib/ <your-app>/lib/
```

Then import the theme once, before any component renders:

```css
@import "tailwindcss";
@import "../theme/nova-theme.css";
```

## Components

| Name | Kind | What it does | File |
| --- | --- | --- | --- |
{table}
{hand_block}{shape_block}
## Motion contract

Every component in this folder animates, and it animates the same way:

{motion}

Full ladder, easing and reduced-motion rules: spec sections {USES[category]} in
[`nova-design.md`]({RAW}/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

{issues}

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec]({RAW}/nova-design.md)
'''


def render_root_readme(categories: list[tuple[str, str, int]]) -> str:
    rows = "\n".join(
        f"| [{title_of(name)}](./nova/{name}/README.md) | `{name}` | {count} | {description} |"
        for name, description, count in categories
    )
    total = sum(count for _, _, count in categories)
    return f'''# Nova Vitral component library

{total} components in {len(categories)} categories. React 19, TypeScript, Tailwind CSS v4,
`motion`, `lucide-react`. Every component is animated, non-purple and layout-safe by
construction, because they all start from the same token set and the same motion ladder.

This folder is written to be read by an AI. `components/index.json` carries the same
registry in machine-readable form: name, kind, category, path, motion note. Feed the file
you need instead of the folder.

## Install

```bash
cp -r components/nova/  <your-app>/components/nova/
cp -r lib/              <your-app>/lib/
cp    theme/nova-theme.css <your-app>/app/nova-theme.css
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "./nova-theme.css";
```

```ts
// tsconfig.json - the components import "@/lib/utils"
{{ "compilerOptions": {{ "paths": {{ "@/*": ["./*"] }} }} }}
```

## Categories

| Category | Folder | Count | Scope |
| --- | --- | --- | --- |
{rows}

## Ten rules these files already follow

1. No purple. The theme remaps the shadcn `--primary` variable to indigo, so `bg-primary`
   and `text-primary` are legal; raw `violet`, `purple`, `fuchsia` and `oklch(0.6 0.25 ...)`
   are not.
2. One accent per viewport. Everything else is neutral: `--glass`, `--hair`, `--fg-muted`.
3. Every component animates. Hover, entrance or state change, 140ms to 760ms, never longer
   than 900ms and never more than 24px of travel.
4. Reduced motion is honored. `prefers-reduced-motion: reduce` renders final states
   immediately.
5. Layout never shifts. Media, charts and skeletons reserve their box.
6. Icons are lucide, at 16px, stroke 1.5, `aria-hidden="true"` when decorative.
7. Focus is visible and never removed. 2px `--accent` ring, 2px offset.
8. Text contrast passes WCAG 2.2 AA (`--fg` on `--bg`, `--fg-muted` on glass).
9. Numbers are tabular. Timestamps and metrics never reflow while they animate.
10. Copy is sentence case, plain, and free of exclamation marks.

## How the AI should use this folder

- Read `components/index.json` first, filter by `category` and `kind`, then read the two or
  three files you actually need. Do not read the folder end to end.
- The hand-authored files listed in each category README define the contract: `surface.tsx`,
  `composer.tsx`, `data-table.tsx`, `navbar.tsx`, `hero-split.tsx`.
- When composing a page, start from `templates/` and swap sections for components here.
- Routing prompts: `{RAW}/prompts/01-load-and-orient.md`,
  `{RAW}/prompts/03-build-a-component.md`, `{RAW}/prompts/05-build-motion.md`.

## Related

- [Full spec]({RAW}/nova-design.md)
- [Theme and token mapping]({RAW}/theme/README.md)
- [Five full page templates]({RAW}/templates/README.md)
- [One hundred worked examples]({RAW}/examples/00-index.md)
'''

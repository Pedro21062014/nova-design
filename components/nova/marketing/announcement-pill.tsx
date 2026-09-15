/**
 * Announcement Pill - Release pill with a live dot and arrow.
 *
 * Nova Vitral family: marketing. Spec sections: 3.7, 5.1 to 5.9.
 *
 * Motion: Headline, lead and action stagger at 120ms intervals; one scroll-linked scene per page, maximum.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/marketing/README.md
 *
 * Example
 * -------
 * <AnnouncementPill
  title="Every screen already considered"
  subtitle="Nova Vitral keeps one visual grammar across the whole product"
  action={{<ButtonPrimary>Start free</ButtonPrimary>}}
/>
 */
import { Upload } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AnnouncementPillProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Headline; the hero uses --fs-display. */
  title?: string;
  /** Lead paragraph, max 62 characters per line. */
  subtitle?: string;
  /** One primary action, plus at most one secondary. */
  action: ReactNode;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function AnnouncementPill({ title = "Every screen already considered", subtitle = "Nova Vitral keeps one visual grammar across the whole product", className, ...props }: AnnouncementPillProps) {
  return (
    <section
      className={cn("nv-surface nv-fade-up rounded-[var(--radius-lg)] p-6", className)}
      aria-label={title}
      {...props}
    >
      <header className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-[var(--fg)]">{title}</h3>
          <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">{subtitle}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-[var(--font-mono)] text-[11px] text-[var(--fg-subtle)]">
          <Upload className="size-3.5" aria-hidden="true" />
          marketing/announcement-pill
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-2">
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
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./hero-centered.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              HeroCentered
            </a>
          </li>
          <li>
            <a
              href="./hero-split.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              HeroSplit
            </a>
          </li>
          <li>
            <a
              href="./hero-chat.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              HeroChat
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default AnnouncementPill;

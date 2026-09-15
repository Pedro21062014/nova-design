import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section, Container and Divider - layout atoms.
 *
 * Spec: 1.5 (spacing and rhythm), 3.7 (section header pattern), 9.4 rule 8 (quiet zones).
 * Rhythm: 96px between sections, 128px around hero and final CTA, 64px when dense.
 */
export interface ContainerProps {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}

export function Container({ children, wide, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        wide ? "max-w-[var(--container-wide)]" : "max-w-[var(--container)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface SectionProps {
  children: ReactNode;
  /** Uppercase overline above the title. */
  overline?: string;
  title?: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  /** Dense sections use 48 to 64px rhythm instead of 96 to 128px. */
  density?: "default" | "dense";
  id?: string;
  className?: string;
}

export function Section({
  children,
  overline,
  title,
  lead,
  action,
  align = "left",
  density = "default",
  id,
  className,
}: SectionProps) {
  const hasHeader = Boolean(overline || title || lead);
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[calc(var(--nav-h)+32px)]",
        density === "default" ? "py-16 md:py-24 lg:py-32" : "py-10 md:py-14",
        className,
      )}
    >
      <Container>
        {hasHeader ? (
          <header
            className={cn(
              "mb-10 md:mb-12",
              align === "center" ? "mx-auto max-w-[62ch] text-center" : "max-w-[62ch]",
            )}
          >
            {overline ? (
              <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {overline}
              </p>
            ) : null}
            {title ? (
              <h2 className="nv-grad-text mt-3 text-[var(--fs-h2)] font-semibold tracking-[-0.025em]">
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-4 text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">{lead}</p>
            ) : null}
            {action ? <div className="mt-6">{action}</div> : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export function Divider({ label, className }: { label?: string; className?: string }) {
  if (!label) return <hr className={cn("h-px border-0 bg-[var(--hair-soft)]", className)} />;
  return (
    <div className={cn("flex items-center gap-3", className)} role="separator">
      <span className="h-px flex-1 bg-[var(--hair-soft)]" />
      <span className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{label}</span>
      <span className="h-px flex-1 bg-[var(--hair-soft)]" />
    </div>
  );
}

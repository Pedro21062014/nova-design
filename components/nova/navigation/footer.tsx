import { Container } from "@/components/nova/core/section";
import { StatusPill } from "@/components/nova/feedback/status-pill";
import { cn } from "@/lib/utils";

/**
 * Footer - orientation and trust (spec 3.15).
 * Columns collapse to accordions below 768px; the aurora glow rises from the bottom
 * edge, and nothing animates on entry.
 */
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  brand: string;
  description: string;
  columns: FooterColumn[];
  legal?: string;
  className?: string;
}

export function Footer({ brand, description, columns, legal, className }: FooterProps) {
  return (
    <footer className={cn("relative mt-20 overflow-hidden border-t border-[var(--hair)]", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px]"
        style={{
          background: "radial-gradient(60% 100% at 50% 100%, var(--aurora-1), transparent 70%)",
          opacity: 0.55,
        }}
      />
      <Container>
        <div className="relative grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 text-[var(--fs-sm)] font-semibold text-[var(--fg)]">
              <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[var(--fs-2xs)]">
                {brand.slice(0, 1)}
              </span>
              {brand}
            </p>
            <p className="mt-3 max-w-[34ch] text-[var(--fs-sm)] leading-relaxed text-[var(--fg-muted)]">
              {description}
            </p>
            <div className="mt-4">
              <StatusPill />
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                {column.title}
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[var(--fs-sm)] text-[var(--fg-muted)] transition-colors duration-150 hover:text-[var(--fg)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--hair-soft)] py-6 text-[var(--fs-xs)] text-[var(--fg-subtle)] md:flex-row md:items-center md:justify-between">
          <p>{legal ?? `2026 ${brand}. All rights reserved.`}</p>
          <p>Designed with the Nova Vitral system</p>
        </div>
      </Container>
    </footer>
  );
}

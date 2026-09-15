/**
 * Team Switcher - Team context switch.
 *
 * Nova Vitral family: enterprise. Spec sections: 5.8, 3.5, 9.2.
 *
 * Motion: Permission changes cross-fade in 240ms; audit rows enter with a 60ms cascade, capped at 400ms.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/enterprise/README.md
 *
 * Example
 * -------
 * <TeamSwitcher title="Approval policy" subtitle="Two approvers above 10k" restricted={{false}} />
 */
import { Users } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface TeamSwitcherProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Record or setting name. */
  title?: string;
  /** Owner, scope or timestamp, muted. */
  subtitle?: string;
  /** Renders the permission-gated variant. */
  restricted?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function TeamSwitcher({ title = "Approval policy", subtitle = "Two approvers above 10k", className, ...props }: TeamSwitcherProps) {
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
          <Users className="size-3.5" aria-hidden="true" />
          enterprise/team-switcher
        </span>
      </header>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-4">
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
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./sso-config.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              SsoConfig
            </a>
          </li>
          <li>
            <a
              href="./scim-table.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ScimTable
            </a>
          </li>
          <li>
            <a
              href="./rbac-matrix.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              RbacMatrix
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default TeamSwitcher;

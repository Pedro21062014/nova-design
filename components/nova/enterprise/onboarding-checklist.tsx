/**
 * Onboarding Checklist - Five-step workspace setup.
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
 * <OnboardingChecklist title="Data residency" subtitle="EU only, pinned" restricted={{false}} />
 */
import { Settings, Users } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface OnboardingChecklistProps
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

export function OnboardingChecklist({ title = "Data residency", subtitle = "EU only, pinned", className, ...props }: OnboardingChecklistProps) {
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
        <span className="shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--fg-subtle)]">
          enterprise/onboarding-checklist
        </span>
      </header>

      <div className="mt-5">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)]">
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

export default OnboardingChecklist;

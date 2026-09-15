/**
 * Token Budget - Context budget with trimming advice.
 *
 * Nova Vitral family: ai. Spec sections: 4.1 to 4.9, 6.14.
 *
 * Motion: Reasoning drawer expands over 420ms via grid-template-rows; the caret signals waiting after 3s of stall.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/ai/README.md
 *
 * Example
 * -------
 * <TokenBudget title="Generated draft" subtitle="Grounded on 3 sources" streaming={{false}} />
 */
import { ChevronDown } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface TokenBudgetProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Panel heading. */
  title?: string;
  /** Model or mode line, muted. */
  subtitle?: string;
  /** Enables the caret and stop control. */
  streaming?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function TokenBudget({ title = "Generated draft", subtitle = "Grounded on 3 sources", className, ...props }: TokenBudgetProps) {
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
          <ChevronDown className="size-3.5" aria-hidden="true" />
          ai/token-budget
        </span>
      </header>

      <div className="mt-5">
        <div className="grid gap-3 sm:grid-cols-3">
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
        </div>
      </div>

      <footer className="mt-5 border-t border-[var(--hair-soft)] pt-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
          Related in this category
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li>
            <a
              href="./prompt-library.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              PromptLibrary
            </a>
          </li>
          <li>
            <a
              href="./persona-card.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              PersonaCard
            </a>
          </li>
          <li>
            <a
              href="./prompt-variable-form.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              PromptVariableForm
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default TokenBudget;

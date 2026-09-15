/**
 * Tool Approval - Approval card for write, spend and delete actions.
 *
 * Nova Vitral family: chat. Spec sections: 4.1 to 4.9.
 *
 * Motion: Tokens appear as they stream, the caret blinks for 1s and stops 120ms after the stream ends.
 * Icons: lucide-react only. Color: at most one accent per viewport, purple is banned
 * by default (spec 1.2.1), and every surface sits on an existing background layer.
 *
 * Contract: https://raw.githubusercontent.com/Pedro21062014/nova-design/main/components/nova/chat/README.md
 *
 * Example
 * -------
 * <ToolApproval title="Summary" subtitle="Edited 4 min ago" streaming />
 */
import { Settings, Users } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ToolApprovalProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Turn heading, rarely visible. */
  title?: string;
  /** Timestamp or model line. */
  subtitle?: string;
  /** Keeps the caret and the stop control. */
  streaming?: boolean;
  /** Merged last, so call sites always win. */
  className?: string;
}

export function ToolApproval({ title = "Summary", subtitle = "Edited 4 min ago", className, ...props }: ToolApprovalProps) {
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
          <Settings className="size-3.5" aria-hidden="true" />
          chat/tool-approval
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
              href="./chat-shell.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              ChatShell
            </a>
          </li>
          <li>
            <a
              href="./thread.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              Thread
            </a>
          </li>
          <li>
            <a
              href="./message-user.tsx"
              className="inline-flex h-7 items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 text-[12px] text-[var(--fg-muted)] transition-colors duration-150 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              MessageUser
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default ToolApproval;

import { cn } from "@/lib/utils";

/**
 * StatusPill - service state indicator (spec 3.15, 6.11).
 * Exactly one pulsing indicator may exist per viewport, and the pulse stops when the
 * tab is hidden. Under reduced motion the dot is static.
 */
export type ServiceState = "operational" | "degraded" | "outage" | "maintenance";

const tones: Record<ServiceState, { label: string; color: string; glow: string }> = {
  operational: { label: "All systems operational", color: "bg-[var(--accent-2)]", glow: "bg-[var(--accent-2)]" },
  degraded: { label: "Degraded performance", color: "bg-[var(--warn)]", glow: "bg-[var(--warn)]" },
  outage: { label: "Service outage", color: "bg-[var(--danger)]", glow: "bg-[var(--danger)]" },
  maintenance: { label: "Scheduled maintenance", color: "bg-[var(--fg-subtle)]", glow: "" },
};

export function StatusPill({ state = "operational", className }: { state?: ServiceState; className?: string }) {
  const tone = tones[state];
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-2 rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] px-3 text-[var(--fs-2xs)] text-[var(--fg-muted)]",
        className,
      )}
      role="status"
    >
      <span className="relative flex size-1.5">
        {tone.glow ? (
          <span aria-hidden="true" className={cn("absolute inline-flex size-full rounded-full opacity-40 nv-pulse", tone.glow)} />
        ) : null}
        <span className={cn("relative inline-flex size-1.5 rounded-full", tone.color)} />
      </span>
      {tone.label}
    </span>
  );
}

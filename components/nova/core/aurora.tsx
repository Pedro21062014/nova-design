/**
 * Aurora and GrainOverlay - the fixed background layer.
 *
 * Glass only reads as glass when something sits behind it (spec 1.3 rule 1), so every
 * page that uses the surfaces must render <Aurora /> once, at the root.
 *
 * Motion: three blobs drift for 30 to 44s under reduced-motion guarding, plus static
 * grain at 3.5 percent opacity. Combined blob opacity stays under 0.45 so text contrast
 * is predictable (spec 1.2.1 rule 8).
 */
export interface AuroraProps {
  /** 0 to 1.5. Marketing uses 1, app surfaces use 0.5 to 0.6. */
  intensity?: number;
  className?: string;
}

export function Aurora({ intensity = 1, className }: AuroraProps) {
  return (
    <div
      aria-hidden="true"
      className={["nv-aurora", className].filter(Boolean).join(" ")}
      style={{ opacity: intensity }}
    >
      <i />
      <i />
      <i />
    </div>
  );
}

export function GrainOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={["nv-grain", className].filter(Boolean).join(" ")} />;
}

/** One-liner used by every page root. */
export function Background({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <Aurora intensity={intensity} />
      <GrainOverlay />
    </>
  );
}

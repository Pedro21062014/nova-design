import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Surface - the visual atom of Nova Vitral: fill + 1px gradient hairline + inner
 * highlight, over a background that must exist (aurora, gradient or image).
 *
 * Spec: 1.3 (glass physics), 2 (tokens), 3.2 (surfaces), 6.14 (motion baseline).
 * Motion: optional 2px hover lift with the nv-lift utility.
 */
export interface SurfaceProps extends ComponentProps<"div"> {
  /** Elevated glass: stronger fill, larger blur, deeper shadow. */
  strong?: boolean;
  /** Sunken panel: no blur, weaker fill. Used inside another surface. */
  inset?: boolean;
  /** Enables pointer-following specular light (desktop pointers only). */
  specular?: boolean;
  /** Enables the 2px hover lift. */
  lift?: boolean;
  /** Padding token: none, sm (16px), md (24px), lg (32px). */
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  { strong, inset, specular, lift, padding = "md", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        inset ? "nv-inset" : strong ? "nv-surface-strong" : "nv-surface",
        specular && "nv-specular overflow-hidden",
        lift && !inset && "nv-lift",
        paddingClass[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

/** Convenience aliases so call sites read like the spec. */
export function SurfaceStrong(props: Omit<SurfaceProps, "strong">) {
  return <Surface strong {...props} />;
}

export function Inset(props: Omit<SurfaceProps, "inset">) {
  return <Surface inset padding="sm" {...props} />;
}

export { Surface as Panel };

export interface SurfaceHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SurfaceHeader({ title, description, action, className }: SurfaceHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-[var(--fs-h4)] font-semibold text-[var(--fg)]">{title}</h3>
        {description ? (
          <p className="mt-1 text-[var(--fs-sm)] text-[var(--fg-muted)]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

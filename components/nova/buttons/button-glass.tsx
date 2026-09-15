import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonGlass - the secondary action: glass fill, 1px hairline, 8px blur (spec 3.1).
 * Motion: fill and border rise one step on hover, 0.98 press, 140ms.
 */
export interface ButtonGlassProps extends ComponentProps<"button"> {
  size?: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
}

const sizes = {
  sm: "h-8 rounded-[var(--radius-sm)] px-3.5 text-[var(--fs-xs)]",
  md: "h-10 rounded-[var(--radius-md)] px-5 text-[var(--fs-sm)]",
  lg: "h-12 rounded-[var(--radius-md)] px-7 text-[var(--fs-body)]",
} as const;

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  function ButtonGlass(
    { size = "md", iconLeft, iconRight, full, className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap border border-[var(--hair)]",
          "bg-[var(--glass)] font-medium text-[var(--fg)] backdrop-blur-[var(--blur-sm)]",
          "nv-press hover:border-[var(--hair-strong)] hover:bg-[var(--glass-hover)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "disabled:pointer-events-none disabled:opacity-45",
          sizes[size],
          full && "w-full",
          className,
        )}
        {...props}
      >
        {iconLeft}
        <span className="truncate">{children}</span>
        {iconRight}
      </button>
    );
  },
);

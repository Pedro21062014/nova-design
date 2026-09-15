import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonPrimary - the only solid element in the system (spec 3.1).
 *
 * Color: single-hue indigo gradient (--grad-primary). Never purple, never a two-hue
 * gradient: this button must not look like a different product than the page.
 *
 * Motion: 1px lift on hover, 0.98 press, 140ms. Focus ring is never removed.
 */
export interface ButtonPrimaryProps extends ComponentProps<"button"> {
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

export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  function ButtonPrimary(
    { size = "md", iconLeft, iconRight, full, className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
          "bg-[image:var(--grad-primary)] font-medium text-[var(--accent-fg)] shadow-[var(--shadow-2)]",
          "nv-press nv-lift",
          "hover:shadow-[0_0_0_1px_rgba(124,140,255,0.35),0_12px_40px_-12px_rgba(124,140,255,0.45)]",
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

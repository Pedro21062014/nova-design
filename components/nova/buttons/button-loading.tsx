"use client";

import { Check, Loader2, TriangleAlert } from "lucide-react";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonLoading - async action with the four states every promise needs (spec 3.1).
 *
 * Motion: label dims to 60 percent while pending, width is locked by the widest label
 * so success never shifts the layout, and the icon swaps without a fade.
 */
export type AsyncState = "idle" | "loading" | "done" | "error";

export interface ButtonLoadingProps extends Omit<ComponentProps<"button">, "onClick"> {
  state?: AsyncState;
  label?: string;
  loadingLabel?: string;
  doneLabel?: string;
  errorLabel?: string;
  iconLeft?: ReactNode;
  onAction?: () => void | Promise<void>;
}

export const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  function ButtonLoading(
    {
      state = "idle",
      label = "Save changes",
      loadingLabel = "Saving",
      doneLabel = "Saved",
      errorLabel = "Try again",
      iconLeft,
      onAction,
      className,
      ...props
    },
    ref,
  ) {
    const text =
      state === "loading" ? loadingLabel : state === "done" ? doneLabel : state === "error" ? errorLabel : label;

    return (
      <button
        ref={ref}
        onClick={onAction}
        disabled={state === "loading"}
        aria-busy={state === "loading"}
        className={cn(
          "relative inline-flex h-10 select-none items-center justify-center gap-2 whitespace-nowrap",
          "rounded-[var(--radius-md)] bg-[var(--glass)] px-5 text-[var(--fs-sm)] font-medium text-[var(--fg)]",
          "border border-[var(--hair)] backdrop-blur-[var(--blur-sm)] nv-press",
          "hover:border-[var(--hair-strong)] hover:bg-[var(--glass-hover)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "disabled:pointer-events-none disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {state === "loading" ? (
          <Loader2 className="size-4 animate-spin text-[var(--fg-muted)]" aria-hidden="true" />
        ) : state === "done" ? (
          <Check className="size-4 text-[var(--accent-2)]" aria-hidden="true" />
        ) : state === "error" ? (
          <TriangleAlert className="size-4 text-[var(--danger)]" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        <span className={cn("truncate", state === "loading" && "opacity-60")}>{text}</span>
      </button>
    );
  },
);

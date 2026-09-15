"use client";

import { ArrowUp, Paperclip, Sparkles, Square } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Composer - the message surface of a chat product (spec 4.7).
 *
 * Contract: glass shell with the strong variant, auto-grow from 1 to 12 rows, Enter
 * sends, Shift+Enter breaks the line, Esc clears, send becomes stop while streaming,
 * and the character counter only appears past 80 percent of the limit.
 *
 * Motion: focus ring appears instantly, the textarea relaxes back to its minimum in
 * 180ms after send, and the send button lifts 1px on hover with a 0.95 press.
 */
export interface ComposerProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  streaming?: boolean;
  placeholder?: string;
  /** Sending is blocked while a file uploads. */
  uploadPending?: boolean;
  maxLength?: number;
  className?: string;
}

export function Composer({
  onSend,
  onStop,
  streaming = false,
  placeholder = "Ask anything, or drop a file",
  uploadPending = false,
  maxLength = 8000,
  className,
}: ComposerProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const grow = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 320)}px`;
  }, []);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || streaming || uploadPending) return;
    onSend(trimmed);
    setValue("");
    requestAnimationFrame(() => {
      const node = ref.current;
      if (node) node.style.height = "auto";
    });
  }, [value, streaming, uploadPending, onSend]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
    if (event.key === "Escape" && value) {
      event.preventDefault();
      setValue("");
      grow();
    }
  };

  const counterVisible = value.length > maxLength * 0.8;

  return (
    <div className={cn("pointer-events-none sticky bottom-4 z-[var(--z-sticky)]", className)}>
      <div className="pointer-events-auto mx-auto w-full max-w-[760px]">
        <div className="nv-surface-strong rounded-[var(--radius-lg)] p-3 transition-shadow duration-200 focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              grow();
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Message"
            className="max-h-[320px] w-full resize-none bg-transparent px-1 py-1.5 text-[15px] leading-6 text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
          />

          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Attach file"
              className="grid size-8 place-items-center rounded-[var(--radius-sm)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <Paperclip className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-[var(--fs-xs)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)]"
            >
              <Sparkles className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              Model
            </button>

            <div className="ml-auto flex items-center gap-2">
              {counterVisible ? (
                <span
                  className={cn(
                    "text-[var(--fs-2xs)] tabular-nums",
                    value.length > maxLength ? "text-[var(--danger)]" : "text-[var(--warn)]",
                  )}
                >
                  {value.length}/{maxLength}
                </span>
              ) : null}
              <span className="hidden text-[var(--fs-2xs)] text-[var(--fg-subtle)] sm:inline">
                Enter to send
              </span>
              {streaming ? (
                <button
                  type="button"
                  onClick={onStop}
                  aria-label="Stop generating"
                  className="grid size-8 place-items-center rounded-full border border-[var(--hair)] bg-[var(--glass)] transition-colors hover:bg-[var(--glass-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <Square className="size-3 fill-[var(--fg)] text-[var(--fg)]" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!value.trim() || uploadPending}
                  aria-label="Send message"
                  className="grid size-8 place-items-center rounded-full bg-[image:var(--grad-primary)] text-[var(--accent-fg)] transition-transform duration-150 hover:-translate-y-px active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-40"
                >
                  <ArrowUp className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
          The model can make mistakes. Verify important details.
        </p>
      </div>
    </div>
  );
}

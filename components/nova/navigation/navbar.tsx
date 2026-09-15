"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/nova/core/section";
import { cn } from "@/lib/utils";

/**
 * Navbar - condenses to glass after 24px of scroll (spec 3.6).
 * One passive scroll listener, height and background interpolate together over 240ms,
 * and the mobile menu locks background scroll while it is open.
 */
export interface NavItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  brand: string;
  items: NavItem[];
  currentPath?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Navbar({ brand, items, currentPath, actions, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-[240ms] ease-[var(--ease-out)]",
        scrolled
          ? "border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_74%,transparent)] backdrop-blur-[var(--blur-md)]"
          : "border-b border-transparent",
        className,
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-[240ms]",
            scrolled ? "h-14" : "h-[var(--nav-h)]",
          )}
        >
          <a href="/" className="flex items-center gap-2 text-[var(--fs-sm)] font-semibold text-[var(--fg)]">
            <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[var(--fs-2xs)]">
              {brand.slice(0, 1)}
            </span>
            {brand}
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {items.map((item) => {
              const active = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-[var(--radius-sm)] px-3 py-2 text-[var(--fs-sm)] transition-colors duration-150",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                    active ? "text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">{actions}</div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)] text-[var(--fg-muted)] lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-[var(--blur-lg)] lg:hidden nv-slide-down">
          <Container>
            <nav className="grid gap-1 py-4" aria-label="Mobile">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center rounded-[var(--radius-md)] px-3 text-[var(--fs-body)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 grid gap-2">{actions}</div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

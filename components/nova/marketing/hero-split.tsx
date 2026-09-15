import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { ButtonGlass } from "@/components/nova/buttons/button-glass";
import { ButtonPrimary } from "@/components/nova/buttons/button-primary";
import { Container } from "@/components/nova/core/section";
import { Reveal } from "@/components/nova/core/reveal";
import { cn } from "@/lib/utils";

/**
 * HeroSplit - copy on the left, product visual on the right (spec 3.7, blueprint 5.1).
 *
 * Sequence: pill 0ms, H1 80ms, lead 200ms, actions 320ms, visual 480ms with a
 * 0.97 to 1 scale over 900ms. The CTA is interactive from t=0.
 */
export interface HeroSplitProps {
  overline?: string;
  title: string;
  lead: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  visual?: ReactNode;
  trustRow?: ReactNode;
  className?: string;
}

export function HeroSplit({
  overline,
  title,
  lead,
  primaryAction,
  secondaryAction,
  visual,
  trustRow,
  className,
}: HeroSplitProps) {
  return (
    <section className={cn("relative overflow-hidden pt-[calc(var(--nav-h)+72px)] pb-16 md:pb-24", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {overline ? (
              <Reveal>
                <p className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
                  {overline}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={80}>
              <h1 className="nv-grad-text mt-3 max-w-[20ch] text-[var(--fs-display)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance">
                {title}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-[48ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
                {lead}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryAction ? (
                  <a href={primaryAction.href} className="inline-flex">
                    <ButtonPrimary size="lg" iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
                      {primaryAction.label}
                    </ButtonPrimary>
                  </a>
                ) : null}
                {secondaryAction ? (
                  <a href={secondaryAction.href} className="inline-flex">
                    <ButtonGlass size="lg">{secondaryAction.label}</ButtonGlass>
                  </a>
                ) : null}
              </div>
            </Reveal>

            {trustRow ? (
              <Reveal delay={420}>
                <div className="mt-8">{trustRow}</div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={480} distance={24}>
            <div className="nv-surface nv-lift-lg p-2">{visual}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

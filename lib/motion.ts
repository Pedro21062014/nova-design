import type { Transition, Variants } from "motion/react";

/** The motion ladder from spec 6.1. Nothing outside this file defines a duration. */
export const t = {
  micro: { duration: 0.14, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  base: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  surface: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  reveal: { duration: 0.76, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } satisfies Transition,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: t.reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: t.base },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: t.surface },
};

/** Parent that staggers children, capping the total cascade (spec 6.2 rule 4). */
export const stagger = (count: number, base = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: Math.min(base, 0.4 / Math.max(count, 1)) } },
});

export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;

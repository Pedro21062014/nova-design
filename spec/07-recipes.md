## 7. Recipes (copy and paste)

Production-ready building blocks. Each recipe is self-contained and assumes the tokens of
Section 2 and the utilities of Section 11.2.

### 7.1 Project setup

```bash
# 1. Next.js 15 with App Router, TypeScript, Tailwind v4
npx create-next-app@latest my-app --ts --tailwind --app --eslint --src-dir=false --turbopack

# 2. shadcn/ui (Radix primitives + cva + tailwind-merge)
npx shadcn@latest init
npx shadcn@latest add button card dialog dropdown-menu input label select sheet skeleton switch tabs textarea tooltip avatar badge separator scroll-area command popover table sonner

# 3. Motion, icons, helpers
npm i motion lucide-react clsx tailwind-merge class-variance-authority
npm i -D @types/node prettier prettier-plugin-tailwindcss
```

Vite + React alternative:

```bash
npm create vite@latest my-app -- --template react-ts
npm i -D tailwindcss @tailwindcss/vite
npm i motion lucide-react clsx tailwind-merge class-variance-authority
```

Astro: `npm create astro@latest` then add the Tailwind integration and use the CSS-only reveal
fallback from Section 6.2 for static pages.

### 7.2 The Vitral surface CSS (canonical)

```css
/* app/globals.css - after the token blocks of Section 2.1 and 2.2 */
@layer components {
  .vitral {
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-lg);
    background: var(--glass);
    backdrop-filter: blur(var(--blur)) saturate(140%);
    -webkit-backdrop-filter: blur(var(--blur)) saturate(140%);
    box-shadow: var(--shadow-2), var(--shadow-inset);
  }

  .vitral-strong {
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-lg);
    background: var(--glass-strong);
    backdrop-filter: blur(var(--blur-lg)) saturate(150%);
    -webkit-backdrop-filter: blur(var(--blur-lg)) saturate(150%);
    box-shadow: var(--shadow-3), var(--shadow-inset);
  }

  /* hairline edge with a vertical gradient */
  .vitral::after,
  .vitral-strong::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
  }

  /* specular sweep that follows the pointer */
  .vitral-specular::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      560px circle at var(--mx, 50%) var(--my, 0%),
      rgba(255, 255, 255, 0.10),
      transparent 42%
    );
    opacity: 0;
    transition: opacity var(--dur) var(--ease-out);
    pointer-events: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .vitral-specular:hover::before { opacity: 1; }
  }

  /* nested panels never stack blur */
  .vitral .vitral,
  .vitral .vitral-strong {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--glass-dim);
    box-shadow: none;
    border-radius: var(--radius);
  }

  /* gradient headline */
  .text-vitral {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.60));
    -webkit-background-clip: text;
            background-clip: text;
    color: transparent;
  }
}
```

### 7.3 Aurora background

```tsx
// components/aurora.tsx
export function Aurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div
        className="aurora absolute -top-[20%] left-[-10%] h-[70vmax] w-[70vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle at 30% 30%, var(--aurora-1), transparent 62%)", opacity: 0.9 * intensity, animation: "drift-a 38s var(--ease-in-out) infinite" }}
      />
      <div
        className="aurora absolute right-[-15%] top-[10%] h-[55vmax] w-[55vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle at 60% 40%, var(--aurora-3), transparent 60%)", opacity: 0.85 * intensity, animation: "drift-b 44s var(--ease-in-out) infinite" }}
      />
      <div
        className="aurora absolute bottom-[-25%] left-[25%] h-[60vmax] w-[60vmax] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--aurora-2), transparent 58%)", opacity: 0.7 * intensity, animation: "drift-c 30s var(--ease-in-out) infinite" }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
```

```css
@keyframes drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(4%, 3%, 0) scale(1.08); } }
@keyframes drift-b { 0%,100% { transform: translate3d(0,0,0) scale(1.04); } 50% { transform: translate3d(-5%, 4%, 0) scale(1); } }
@keyframes drift-c { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-3%, -4%, 0) scale(1.06); } }

.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.035;
  mix-blend-mode: overlay;
}
```

### 7.4 Hero section (complete)

```tsx
import { ArrowRight } from "lucide-react";
import { Aurora } from "@/components/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+96px)] pb-24">
      <Aurora />
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] text-center">
        <Reveal delay={0}>
          <a href="#changelog" className="vitral inline-flex h-8 items-center gap-2 rounded-full px-3 text-[var(--fs-xs)] text-[var(--fg-muted)] hover:text-[var(--fg)]">
            <span className="size-1.5 rounded-full bg-[var(--accent-2)]" />
            v2.4 is out — streaming artifacts
            <ArrowRight className="size-3.5" />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-vitral mx-auto mt-6 max-w-[18ch] font-[var(--font-display)] text-[var(--fs-display)] font-semibold leading-[0.96] tracking-[-0.04em]">
            Ship interfaces that feel engineered
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-[46ch] text-[var(--fs-lead)] leading-relaxed text-[var(--fg-muted)]">
            A design specification your AI agent can read and apply. Glass surfaces, restrained motion,
            professional pages.
          </p>
        </Reveal>

        <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" iconRight={<ArrowRight className="size-4" />}>Start building</Button>
          <Button size="lg" variant="secondary">Read the spec</Button>
        </Reveal>

        <Reveal delay={0.48} className="mt-16">
          <div className="vitral vitral-specular mx-auto aspect-[16/10] w-full max-w-[1080px] p-2">
            <div className="size-full rounded-[calc(var(--radius-lg)-8px)] bg-[var(--bg-elevated)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

### 7.5 Scroll progress and back to top

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[var(--z-toast)] h-0.5 origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
      />
      {show && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="vitral fixed bottom-6 right-6 z-[var(--z-nav)] grid size-10 place-items-center rounded-full text-[var(--fg-muted)] transition-transform hover:-translate-y-0.5 hover:text-[var(--fg)]"
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </>
  );
}
```

### 7.6 Animated counter

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function Counter({ value, suffix = "", decimals = 0, duration = 1200 }: {
  value: number; suffix?: string; decimals?: number; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
```

### 7.7 Marquee

```css
.marquee { position: relative; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 96px, #000 calc(100% - 96px), transparent); }
.marquee__track { display: flex; width: max-content; gap: 48px; animation: marquee 40s linear infinite; }
.marquee:hover .marquee__track, .marquee:focus-within .marquee__track { animation-play-state: paused; }
@keyframes marquee { to { transform: translate3d(-50%, 0, 0); } }
@media (prefers-reduced-motion: reduce) {
  .marquee { mask-image: none; }
  .marquee__track { animation: none; flex-wrap: wrap; width: 100%; justify-content: center; }
  .marquee__track > [aria-hidden="true"] { display: none; }
}
```

### 7.8 Theme toggle without flash

```tsx
// app/layout.tsx - inline script before hydration
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){}})();`;
// <script dangerouslySetInnerHTML={{ __html: themeScript }} />
```

```tsx
"use client";
export function ThemeToggle() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const apply = (t: typeof theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    const dark = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  };
  // render a three-way segmented control: System, Light, Dark
}
```

### 7.9 shadcn bridge (skinning shadcn components to Nova Vitral)

shadcn components are the base; Nova Vitral supplies the skin. Three techniques:

1. **CSS variable mapping** (recommended): shadcn reads `--background`, `--foreground`, `--border`,
   `--ring`, `--primary`, `--radius`. Map them to Nova Vitral tokens once and every shadcn
   component inherits the design language.

```css
@layer base {
  :root {
    --background: var(--bg);
    --foreground: var(--fg);
    --card: var(--glass);
    --card-foreground: var(--fg);
    --popover: var(--bg-elevated);
    --popover-foreground: var(--fg);
    --primary: var(--accent);
    --primary-foreground: var(--accent-fg);
    --secondary: var(--glass-strong);
    --secondary-foreground: var(--fg);
    --muted: var(--glass-dim);
    --muted-foreground: var(--fg-muted);
    --accent: var(--accent-soft);
    --accent-foreground: var(--fg);
    --destructive: var(--danger);
    --border: var(--hair);
    --input: var(--hair);
    --ring: var(--accent);
    --radius: 16px;
  }
}
```

2. **Class override on the primitive**: `cn()` merges Tailwind classes, so the last class wins.

```tsx
<Card className="vitral rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-2)]">
  <CardHeader className="p-0">
    <CardTitle className="text-[var(--fs-h3)] text-[var(--fg)]">Title</CardTitle>
    <CardDescription className="text-[var(--fs-sm)] text-[var(--fg-muted)]">Description</CardDescription>
  </CardHeader>
  <CardContent className="p-0 pt-4">{children}</CardContent>
</Card>
```

3. **cva variants added to the shadcn component** for repeated patterns (for example a
   `glass` variant on `Button`, `Dialog` or `Sheet`):

```tsx
const buttonVariants = cva(base, {
  variants: {
    variant: {
      // shadcn originals ...
      glass: "bg-[var(--glass)] border border-[var(--hair)] backdrop-blur-[var(--blur-sm)] text-[var(--fg)] hover:bg-[var(--glass-hover)]",
      vitral: "bg-[image:var(--grad-primary)] text-[var(--accent-fg)] shadow-[var(--shadow-2)] hover:-translate-y-px",
    },
  },
});
```

Mapping table, shadcn to Nova Vitral:

| shadcn | Nova Vitral treatment |
|---|---|
| `Dialog` | glass `--blur-lg`, 1px hairline, scale 0.97 enter, scrim 60 percent plus blur 4px |
| `Sheet` | slide 320ms `--ease-out`, glass, hairline on the leading edge |
| `DropdownMenu` | glass, 8px padding, 36px rows, hairline separators |
| `Tooltip` | 400ms delay, glass, `--fs-xs`, max 240px |
| `Command` | 640px, top 15vh, glass, `--blur-lg`, group overlines |
| `Sonner` toast | glass, hairline, 12px icon tile, bottom-right |
| `Table` | 56px rows, sticky header, hover `--glass-dim`, tabular numbers |
| `Tabs` | segmented glass pill or underline with accent indicator |
| `Switch` | 36x20, accent when on, 160ms thumb |
| `Skeleton` | `--glass-dim` plus the shimmer of Section 3.20 |
| `Avatar` | full radius, 1px hairline, gradient fallback with initials |
| `Badge` | 22px chip, `--fs-2xs`, uppercase optional, 0.06em tracking |

### 7.10 Test and audit snippets

```tsx
// Contrast helper used in a dev-only panel: verifies text on glass over worst-case aurora
export function worstCaseContrast(fg: string, glassAlpha = 0.055, ground = "#06070c") { /* compute relative luminance blend */ }
```

```bash
npx lighthouse http://localhost:3000 --preset=desktop --view
npx @axe-core/cli http://localhost:3000
npx tsc --noEmit && npx next lint
```

Manual checks: 4x CPU throttle scroll test, 320px width layout, keyboard-only walkthrough
(Tab through every interactive element), `prefers-reduced-motion` emulation, print preview,
forced-colors mode, and 200 percent zoom.

---

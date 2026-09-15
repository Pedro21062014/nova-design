## 8. Open-Source References (MIT and permissive)

Nova Vitral is not invented in a vacuum. It composes ideas from mature, permissively licensed
projects. This section tells the agent **what to borrow from where**, so an implementation can lean
on proven primitives instead of reinventing them.

**Attribution rule.** Borrowing code is allowed under the license terms; copying a repository's
visual identity wholesale is not. Always: (1) keep the license file when copying substantial code,
(2) credit in the README when a project is more than a dependency, (3) never present another
project's brand, logos or marketing copy as your own.

### 8.1 Primary component foundation

| Project | License | What to take | Raw or docs |
|---|---|---|---|
| shadcn/ui | MIT | Component source you own: button, dialog, dropdown, tabs, table, command, sheet, sonner, form wiring | https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/registry/new-york-v4/ui/button.tsx |
| Radix UI Primitives | MIT | Accessibility and behavior for menus, dialogs, popovers, sliders, switches, tabs | https://raw.githubusercontent.com/radix-ui/primitives/main/packages/react/dialog/src/dialog.tsx |
| Base UI | MIT | Alternative unstyled primitives (successor direction for many Radix patterns) | https://base-ui.com |
| Ark UI | MIT | Cross-framework primitives when not using React only | https://ark-ui.com |
| Class Variance Authority (cva) | Apache-2.0 | Variant APIs for components | https://raw.githubusercontent.com/joe-bell/cva/main/README.md |
| tailwind-merge | MIT | Safe class overriding (`cn()`) | https://raw.githubusercontent.com/dcastil/tailwind-merge/main/README.md |
| clsx | MIT | Conditional class names | https://github.com/lukeed/clsx |

### 8.2 Motion and animation

| Project | License | What to take |
|---|---|---|
| Motion (formerly Framer Motion) | MIT | `motion/react`: variants, `whileInView`, `useScroll`, `useSpring`, `layoutId`, `AnimatePresence` |
| GSAP | Standard "no charge" license (not MIT) | Use only when explicitly needed (timeline-heavy storytelling); keep the license notice and avoid claiming MIT |
| anime.js | MIT | Lightweight keyframe/sequencing when Motion is not available |
| AutoAnimate | MIT | Zero-config list and layout transitions |
| tailwindcss-animate | MIT | Ready-made enter/exit keyframes for Tailwind |
| Lenis | MIT | Smooth scrolling (use sparingly; never combine with scroll-jacking sections) |
| View Transitions API | Web standard | Route and shared-element transitions |
| NumberFlow | MIT | Animated numbers with digit-level transitions |
| Embla Carousel | MIT | Robust carousels with drag, snap and keyboard support |

### 8.3 Visual inspiration (pattern libraries, MIT unless noted)

| Project | License | What to take | Raw or docs |
|---|---|---|---|
| Aceternity UI | MIT | Spotlight cards, aurora background, moving borders, 3D card, text reveal | https://ui.aceternity.com/components |
| Magic UI | MIT | Marquee, animated gradient text, number ticker, dock, shine border, bento | https://magicui.design/docs/components |
| Motion Primitives | MIT | Small copy-paste motion components with clean APIs | https://motion-primitives.com/docs |
| Origin UI | MIT | Extensive Tailwind form and layout patterns, tasteful defaults | https://originui.com |
| Animata | MIT | Tailwind animation blocks (typing, tracing beam, shine) | https://animata.design |
| Cult UI | MIT | Marketing blocks with strong motion craft | https://cult-ui.com |
| Kokonut UI | MIT | Polished glass and gradient components | https://kokonutui.com |
| Park UI | MIT | Design-system-grade components with tokens | https://park-ui.com |
| HeroUI (formerly NextUI) | MIT | Accessible React component behaviors and variants | https://heroui.com |
| Nuxt UI | MIT | Excellent docs and component API design (also usable as Vue reference) | https://ui.nuxt.com |
| Tremor | Apache-2.0 | Dashboard blocks, KPI cards, chart wrappers | https://raw.githubusercontent.com/tremorlabs/tremor/main/README.md |
| Flowbite | MIT | Marketing section patterns and forms | https://flowbite.com/blocks/ |
| Tailwind Plus patterns (structure only) | Commercial | Study information architecture; never copy markup or assets |
| DaisyUI | MIT | Semantic class naming ideas for themes | https://daisyui.com |
| 21st.dev | Mixed (per component) | Community component ideas; verify each license before use | https://21st.dev |
| Untitled UI (free tier) | Per-asset license | Figma-level design detail reference | https://www.untitledui.com |
| Vercel Design / Geist | MIT | Restrained dark UI, typography scale, motion restraint | https://vercel.com/geist |
| Linear-style patterns (recreation guides) | Community MIT guides | Density, keyboard-first UX, subtle gradients |

Rule for pattern libraries: take the **technique**, not the palette. Aceternity's spotlight is
welcome; Aceternity's rainbow gradients are not part of Nova Vitral.

### 8.4 Data, charts and tables

| Project | License | What to take |
|---|---|---|
| Recharts | MIT | Default chart library, composable, SSR friendly |
| visx | MIT | Low-level primitives for bespoke charts |
| Nivo | MIT | Rich chart types with sensible defaults |
| uPlot | MIT | Very large time series with 60fps interaction |
| Chart.js | MIT | Simple cases and canvas performance |
| D3 | ISC | Scales, shapes and math behind custom visualizations |
| TanStack Table | MIT | Headless sorting, filtering, grouping, virtualization-ready |
| TanStack Virtual | MIT | Virtualized lists and grids (chat, logs, tables) |
| AG Grid (community) | MIT | Enterprise-grade grid behavior reference |
| shadcn/ui charts | MIT | Themed chart wrappers over Recharts |

### 8.5 Content, editors and AI interface pieces

| Project | License | What to take |
|---|---|---|
| cmdk | MIT | Command palette engine (the one shadcn uses) |
| Vaul | MIT | Drawer with correct gesture and scroll behavior |
| Sonner | MIT | Toast engine with stacking and promises |
| React Markdown | MIT | Markdown rendering pipeline |
| Shiki | MIT | Accurate syntax highlighting at build or runtime |
| KaTeX | MIT | Math rendering in assistant replies |
| rehype-sanitize | MIT | Mandatory sanitization for model output |
| TipTap | MIT | Rich text editing for artifacts and comments |
| CodeMirror 6 | MIT | Code editor in the artifact panel |
| Monaco | MIT | Heavier editor when IDE features are required |
| react-resizable-panels | MIT | Split views (thread and canvas) |
| Emoji-mart / emoji | MIT | Reaction pickers if reactions are enabled |
| Vercel AI SDK | Apache-2.0 | Streaming, tool calls, and provider abstraction for chat |
| assistant-ui | MIT | Chat primitives and thread state patterns worth studying |
| OpenAI ChatKit style patterns | Reference only | Hierarchy of message states, not code |

### 8.6 Typography, icons and assets

| Project | License | Notes |
|---|---|---|
| Geist (Sans, Mono) | SIL OFL 1.1 | Display and mono families used by default |
| Inter | SIL OFL 1.1 | Body face; excellent dark-mode hinting |
| Satoshi / General Sans (Fontshare) | Free for commercial use | Alternative display faces |
| JetBrains Mono | SIL OFL 1.1 | Alternative mono with tall x-height |
| lucide | ISC | Default icon set, 1.5px stroke |
| Radix Icons | MIT | Compact 15px icon set for dense UI |
| Tabler Icons | MIT | Very large outline set, consistent 2px stroke |
| Phosphor | MIT | Multiple weights, useful for feature illustrations |
| Simple Icons | CC0 | Monochrome brand marks for integration grids |
| Hero Patterns / SVG Backgrounds | CC0 or MIT | Optional background textures (grain is built into the spec) |
| Unsplash / Pexels | Per-asset | Use only when the user allows stock photography |

### 8.7 Engineering references (structure and quality, not visuals)

| Project | License | What to take |
|---|---|---|
| Next.js | MIT | App Router structure, metadata API, route groups |
| Tailwind CSS | MIT | Utility discipline and theme mapping |
| Turborepo | MIT | Monorepo layout for design system plus apps |
| Radix Colors | MIT | Contrast-tested palette methodology |
| Open Props | MIT | Token naming conventions |
| Storybook | MIT | Component documentation and visual review |
| Playwright | Apache-2.0 | Visual regression on key pages |
| axe-core | MPL-2.0 | Automated accessibility testing |
| ESLint plugin jsx-a11y | MIT | Accessibility linting in CI |
| Changesets | MIT | Versioning for the design system package |

### 8.8 How to cite references in generated code

When the agent borrows a technique, add a one-line comment with the project name and license in the
component header. Example:

```tsx
/**
 * Spotlight card - technique inspired by Aceternity UI (MIT).
 * Adapted to Nova Vitral tokens: hairline edge, specular sweep, 4px hover lift.
 */
```

Never paste a large file verbatim from a source without keeping its license header and adding the
project to the credits section of the README.

### 8.9 Credits block for the README

```md
## Credits and inspiration
Nova Vitral composes ideas from permissively licensed projects:
- shadcn/ui (MIT), Radix UI Primitives (MIT), Base UI (MIT)
- Motion / Framer Motion (MIT), AutoAnimate (MIT), tailwindcss-animate (MIT)
- Aceternity UI (MIT), Magic UI (MIT), Motion Primitives (MIT), Origin UI (MIT), Animata (MIT)
- Tremor (Apache-2.0), Recharts (MIT), TanStack Table (MIT), TanStack Virtual (MIT)
- cmdk (MIT), Vaul (MIT), Sonner (MIT), Shiki (MIT), KaTeX (MIT)
- Geist and Inter (SIL OFL 1.1), lucide (ISC)
Each technique was re-implemented against the Nova Vitral token system.
```

---

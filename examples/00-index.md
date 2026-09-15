# Nova Vitral - Example Library

**100 named, copy-ready examples** for building Nova Vitral interfaces with shadcn/ui, Tailwind,
Radix primitives and Motion. Each example states its base component, what it demonstrates, a code
snippet, its motion behavior and the spec sections it implements.

Raw repository root:
`https://raw.githubusercontent.com/Pedro21062014/nova-design/main/`

## How an agent should use this library

1. Find the example that matches the requested component in the tables below.
2. Read **only that file** plus the spec sections referenced at the end of the example.
3. Follow the base component (shadcn or custom) and keep the Nova Vitral tokens.
4. Apply the stated motion rules, including the reduced-motion fallback.
5. Never copy the snippet verbatim into a different design language; the tokens are the contract.

## Files

| File | Range | Theme | Raw link |
|---|---|---|---|
| `examples/01-surfaces-glass.md` | EX-01 to EX-10 | Surfaces, glass, aurora, bento | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/01-surfaces-glass.md |
| `examples/02-controls-forms.md` | EX-11 to EX-20 | Buttons, inputs, selects, forms | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/02-controls-forms.md |
| `examples/03-navigation-shell.md` | EX-21 to EX-30 | Navbar, sidebar, tabs, menus, footer | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/03-navigation-shell.md |
| `examples/04-heroes-marketing.md` | EX-31 to EX-40 | Heroes, features, FAQ, CTA, newsletter | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/04-heroes-marketing.md |
| `examples/05-pricing-social-utility.md` | EX-41 to EX-50 | Pricing, testimonials, auth, 404, waitlist | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/05-pricing-social-utility.md |
| `examples/06-chat-scene.md` | EX-51 to EX-65 | Conversational AI interface | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/06-chat-scene.md |
| `examples/07-data-dashboards.md` | EX-66 to EX-78 | Charts, tables, dashboards, admin | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/07-data-dashboards.md |
| `examples/08-motion-interaction.md` | EX-79 to EX-90 | Scroll animation and interaction | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/08-motion-interaction.md |
| `examples/09-pages-assembly.md` | EX-91 to EX-100 | Complete pages assembled end to end | https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/09-pages-assembly.md |

## Index of all 100 examples

| ID | Example | Base | File |
|---|---|---|---|
| EX-01 | Vitral panel (base surface) | custom / shadcn Card | 01 |
| EX-02 | Nested panel | custom | 01 |
| EX-03 | Bento feature grid | custom grid | 01 |
| EX-04 | Spotlight card (pointer light) | custom | 01 |
| EX-05 | Gradient border card | custom | 01 |
| EX-06 | Glass KPI tile | shadcn Card | 01 |
| EX-07 | Aurora background | custom | 01 |
| EX-08 | Grain overlay | custom | 01 |
| EX-09 | Segmented glass control | shadcn Tabs | 01 |
| EX-10 | Marquee logo strip | custom CSS | 01 |
| EX-11 | Primary gradient button | shadcn Button + cva | 02 |
| EX-12 | Loading button state machine | shadcn Button | 02 |
| EX-13 | Icon button with tooltip | shadcn Tooltip | 02 |
| EX-14 | Input with label, hint, error | shadcn Input + Label | 02 |
| EX-15 | Combo box (searchable select) | shadcn Command + Popover | 02 |
| EX-16 | OTP / verification input | custom | 02 |
| EX-17 | Switch with save indicator | shadcn Switch | 02 |
| EX-18 | Slider with value bubble | shadcn Slider | 02 |
| EX-19 | Dropzone with progress | react-dropzone | 02 |
| EX-20 | Form with error summary | react-hook-form + zod | 02 |
| EX-21 | Glass navbar on scroll | custom | 03 |
| EX-22 | Nav underline with layoutId | motion/react | 03 |
| EX-23 | Mobile sheet menu | shadcn Sheet | 03 |
| EX-24 | Sidebar with rail collapse | motion/react | 03 |
| EX-25 | Sidebar nav item with active bar | custom | 03 |
| EX-26 | Tabs with sliding indicator | shadcn Tabs | 03 |
| EX-27 | Command palette | shadcn Command + Dialog | 03 |
| EX-28 | Dropdown menu with shortcuts | shadcn DropdownMenu | 03 |
| EX-29 | Breadcrumbs with collapse | custom | 03 |
| EX-30 | Footer with oversized wordmark | custom | 03 |
| EX-31 | Hero with load sequence | custom + Reveal | 04 |
| EX-32 | Chat hero (animated exchange) | custom | 04 |
| EX-33 | Announcement pill | custom | 04 |
| EX-34 | Trust row with rating | custom | 04 |
| EX-35 | Alternating feature rows | custom | 04 |
| EX-36 | Process steps with connector | motion/react | 04 |
| EX-37 | FAQ accordion | shadcn Accordion | 04 |
| EX-38 | Final CTA band | custom | 04 |
| EX-39 | Newsletter capture | custom | 04 |
| EX-40 | Value reasons row | custom | 04 |
| EX-41 | Three-tier pricing | shadcn Card + Segmented | 05 |
| EX-42 | Comparison table with sticky header | shadcn Table | 05 |
| EX-43 | Testimonial card | shadcn Card | 05 |
| EX-44 | Testimonial wall with parallax | motion/react | 05 |
| EX-45 | Metrics band with counters | custom + Counter | 05 |
| EX-46 | 404 page | custom | 05 |
| EX-47 | Sign-in split layout | shadcn Form | 05 |
| EX-48 | Sign-up with password strength | shadcn Form | 05 |
| EX-49 | Waitlist with referral | custom | 05 |
| EX-50 | Consent bar | custom | 05 |
| EX-51 | Chat shell (three columns) | custom + resizable panels | 06 |
| EX-52 | Thread with day separators | custom | 06 |
| EX-53 | User message bubble | custom | 06 |
| EX-54 | Assistant message with markdown | react-markdown | 06 |
| EX-55 | Streaming caret and flush | custom hook | 06 |
| EX-56 | Thinking row with elapsed time | custom | 06 |
| EX-57 | Reasoning drawer | custom | 06 |
| EX-58 | Tool call card | custom | 06 |
| EX-59 | Approval card | custom | 06 |
| EX-60 | Composer with slash commands | custom | 06 |
| EX-61 | Attachment chips | custom | 06 |
| EX-62 | Message actions bar | custom | 06 |
| EX-63 | Citations and sources | custom + Tooltip | 06 |
| EX-64 | Artifact card and canvas | custom | 06 |
| EX-65 | Empty state and follow-ups | custom | 06 |
| EX-66 | Stat tile with sparkline | shadcn Card + Recharts | 07 |
| EX-67 | Area chart with gradient fill | Recharts | 07 |
| EX-68 | Sorted bar chart | custom / Recharts | 07 |
| EX-69 | Data table with row actions | shadcn Table + TanStack | 07 |
| EX-70 | Virtualized activity feed | TanStack Virtual | 07 |
| EX-71 | Filter rail with URL state | nuqs | 07 |
| EX-72 | Empty state panel | custom | 07 |
| EX-73 | Skeleton screen | shadcn Skeleton | 07 |
| EX-74 | Error state with error id | custom | 07 |
| EX-75 | Settings section with autosave | custom | 07 |
| EX-76 | API keys with masked reveal | shadcn Table | 07 |
| EX-77 | Audit log timeline | custom | 07 |
| EX-78 | Bulk selection bar | AnimatePresence | 07 |
| EX-79 | Reveal on scroll | motion/react | 08 |
| EX-80 | Stagger group with capped cascade | motion/react | 08 |
| EX-81 | Parallax visual with spring | useScroll | 08 |
| EX-82 | Scrollytelling sticky steps | IntersectionObserver | 08 |
| EX-83 | Horizontal scroll gallery | useScroll | 08 |
| EX-84 | Scroll progress and back to top | useScroll | 08 |
| EX-85 | Animated counter | useInView | 08 |
| EX-86 | Magnetic tilt card | custom + rAF | 08 |
| EX-87 | Route transition and skeletons | Next.js Suspense | 08 |
| EX-88 | Height animation without JS | CSS grid-rows | 08 |
| EX-89 | Toast with promise | shadcn Sonner | 08 |
| EX-90 | Lightbox with keyboard | shadcn Dialog | 08 |
| EX-91 | Documentation layout | custom grid | 09 |
| EX-92 | Blog post page | MDX | 09 |
| EX-93 | Changelog page | custom | 09 |
| EX-94 | Dashboard assembly | composes 66-71 | 09 |
| EX-95 | Portfolio home | composes 31, 35, 83 | 09 |
| EX-96 | Pricing page assembly | composes 9, 41, 42, 37 | 09 |
| EX-97 | Legal page layout | custom | 09 |
| EX-98 | Maintenance and 500 page | custom | 09 |
| EX-99 | Onboarding checklist | custom | 09 |
| EX-100 | Settings page assembly | composes 17, 75, 76 | 09 |

## Rules that apply to every example

1. Tokens only. No hex value, shadow or duration outside `nova-design.md` section 2.
2. Every interactive element ships with hover, focus-visible, active, disabled and loading states.
3. Every data surface ships with loading, empty and error states.
4. Reveal once, 12 to 24px, stagger capped so the last sibling starts under 400ms.
5. `prefers-reduced-motion` renders the final state, never hides content.
6. Animate `transform` and `opacity` only; budget `backdrop-filter` to six elements per viewport.
7. Real copy only. No "Lorem ipsum", no "Feature one", no "John Doe, CEO".
8. shadcn components are the base; Nova Vitral is the skin (section 7.9 of the spec).

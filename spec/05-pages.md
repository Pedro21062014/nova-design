## 5. Page Blueprints

Blueprints are ordered recipes for complete pages: sections in sequence, with the purpose of each,
the components used, and the animation behavior. An agent asked to build "a landing page" should
follow `5.1` exactly, reusing sections from `5.2` when the product needs them.

### 5.1 SaaS landing page (golden path)

| # | Section | Purpose | Components | Reveal |
|---|---|---|---|---|
| 1 | Navbar | Orientation and primary action | 3.6 | fade in on load |
| 2 | Hero | Promise plus product view | 3.7, 3.9 | staggered load animation, visual anchor scale 0.97 to 1 |
| 3 | Logo cloud | Instant credibility | 3.10 | marquee, mask fade |
| 4 | Problem framing | Name the pain in two lines | 3.2 panels | fade up, stagger 80ms |
| 5 | Feature bento | Show range without depth | 3.8 | cell stagger 60ms by grid position |
| 6 | Alternating features | Depth on the two main capabilities | 3.25 | text then visual, 40ms offset, 24px rise |
| 7 | Metrics band | Quantified proof | 3.13 | counters on view, once |
| 8 | Integrations | Fit into the stack | 3.25 | logos fade with stagger |
| 9 | Testimonials | Emotional proof | 3.10 | wall with 0.04 parallax on columns |
| 10 | Pricing | Commercial decision | 3.12 | cards rise 16px, recommended card 60ms later |
| 11 | FAQ | Remove objections | 3.11 | single-column accordion |
| 12 | Final CTA | Convert | 3.26 | panel scale 0.98 to 1, 420ms |
| 13 | Footer | Navigation and trust | 3.15 | no animation except the aurora glow |

Sequence rules: alternate visual rhythm (dense, airy, dense); never two bento-like sections in a row;
keep the page between 9 and 14 sections; every 4th section must be visually different in structure
(full-bleed, split, centered band) to avoid monotony.

Vertical spacing: 96px between standard sections, 128px before and after the hero, pricing and final
CTA, 64px inside dense feature clusters.

### 5.2 Additional marketing sections

| Section | Content | Notes |
|---|---|---|
| How it works | 3 numbered steps with a connector line and small visuals | Steps reveal left to right, 200ms apart |
| Product tour | Tabbed interface screenshot switcher | Preview fixed aspect 16:10, crossfade |
| Security and compliance | Badge grid (SOC 2, GDPR, HIPAA) plus a link to the trust page | Monochrome badges, 64px tiles |
| Comparison | Nova Vitral versus alternatives table | Honest rows, accent column |
| Case study band | One metric, one sentence, one logo, link to the story | Full-bleed with a 12 percent aurora |
| Changelog teaser | Last 3 entries with dates | Link to the full changelog |
| Careers strip | Open roles count plus a culture line | Rare, keep to one line |
| Community | Discord and GitHub counts with avatars | Optional |
| Newsletter band | Inline capture | 3.26 |
| Pricing calculator | Sliders or inputs with a live estimate | Numbers animate when inputs change |

### 5.3 Portfolio and personal site

| # | Section | Notes |
|---|---|---|
| 1 | Navbar | Minimal, 4 links, no CTA |
| 2 | Intro hero | Name in display size, one-line positioning, availability chip, 2 actions (email, resume) |
| 3 | Selected work | 4 to 6 project cards, media, role, year, one outcome metric, links to case studies |
| 4 | Case study preview | Two deep cards with process description and images in a scroll-triggered stack |
| 5 | About | Short bio, portrait on a glass plate, three facts |
| 6 | Experience | Timeline (3.14), company, role, dates, one impact line |
| 7 | Writing | 3 latest posts with reading time |
| 8 | Speaking / press | Compact list |
| 9 | Contact | Email, links, availability, response time |
| 10 | Footer | Minimal with a locale and theme toggle |

Design notes: the portfolio is the one place where larger type, more whitespace and a personally
expressive accent are allowed. Keep it: max 2 accents, one distinct layout moment (a horizontal
scroll gallery or a sticky case study), and real project imagery.

### 5.4 Pricing page

1. Header: title, lead, billing toggle, trust line ("No credit card required"), optional currency select.
2. Plan grid (3.12) with the recommended plan marked.
3. Value anchors: a row of three reasons with icons under the plans.
4. Feature comparison table with a sticky header and a "show all" expansion.
5. Add-ons: 2 to 3 glass cards (support level, extra seats, usage packs).
6. ROI or savings calculator with a live number and a subtle count animation.
7. Enterprise band with a "Talk to sales" action and two assurances.
8. Billing FAQ (5 to 7 entries) covering invoices, upgrades, proration, refunds and taxes.
9. Final CTA with the plan grid repeated in a compact strip above the footer (optional).

### 5.5 Documentation site

- Layout: 260px left tree, content max 760px, 220px right table of contents, both sticky and
  independently scrollable with a fade mask at the edges.
- Left tree: sections with 24px rows, active page accent with a 2px bar, collapsible groups that
  remember state, a filter field on top when the tree exceeds 40 pages, and a version selector.
- Content: H1 then a one-line summary, then optional badges (version, stability), then body. Every
  page ends with "Was this helpful?" plus prev and next cards.
- Right TOC: generated from H2 and H3, an active marker that follows scroll (IntersectionObserver),
  and a 2px rail with an animated progress segment.
- Code blocks: copy, wrap toggle, language chip, line highlighting, and a tabbed variant for
  multi-language examples.
- Callouts: four tones (info, tip, warning, danger) rendered as glass panels with a colored 2px
  left rule and a 24px icon tile. Never use more than two callouts per page.
- Search: `Cmd/Ctrl+K` palette with section grouping, keyboard navigation and hit highlighting;
  results open in a preview panel beside the palette on desktop.
- Footer: edit this page on GitHub, last updated date, prev and next navigation.
- Mobile: tree becomes a drawer, TOC becomes a "On this page" collapsible under the title.

### 5.6 Blog, changelog and content pages

**Blog index**: featured post (large media card), then a 3-column grid; category chips filter
client-side with URL state; 12 posts per page with a "Load more" button (not infinite scroll for
SEO reasons); reading time and date in `--fs-xs`; author chip with avatar.

**Post detail**: title, meta row (author, date, reading time), share actions, optional cover image
with a veil, body at 68ch, TOC on the right under `xl`, code blocks with copy, footnotes, tags,
author bio card, related posts (3), newsletter CTA. Reading progress bar at the top (2px accent).

Typography inside articles: 18px body, 1.75 line height, 24px paragraph spacing, drop cap optional
and only for editorial brands, pull quotes with a 2px accent left rule and 20px type.

**Changelog**: vertical timeline (3.14) with version chips, date, category tags (Added, Changed,
Fixed), and optional media. A filter row for categories and a subscribe action. Entries collapse
beyond 10 with "Show older".

**Legal pages**: 68ch measure, sticky TOC, plain language, "last updated" line, print-friendly,
no aurora (a flat background reads as more serious), and a contact block at the end.

### 5.7 Dashboard and admin

Layout: sidebar (3.6) plus a 64px top bar with breadcrumb, search, date-range picker, notifications
bell, and an account menu.

Grid: 12 columns, 16px gap, 24px page padding, cards at `--radius-lg`. Standard composition:

| Row | Content |
|---|---|
| KPI row | 4 stat tiles (3.13) with sparklines and deltas |
| Primary chart | 8 columns wide, 320px tall, range selector, legend, export |
| Secondary | 4 columns: top sources list or a donut with two slices max |
| Detail table | Full width, sortable, filterable, with bulk actions and pagination |
| Activity | 4 columns: recent events with avatars and relative time |

Dashboard rules: every card answers one question; each card has a defined empty state; ranges
(today, 7d, 30d, quarter, custom) live in one place and apply to the whole page; a global refresh
button shows the last-updated time; skeletons match card shapes; never animate more than two
charts simultaneously; deep links encode filters in the URL.

Admin specifics: a sticky filter rail, saved views (segmented chips with a "Save view" action),
inline editing with optimistic updates, a drawer for record details instead of a page navigation,
an audit log link in every record, and permission-aware UI that disables rather than hides
destructive controls when the role lacks rights.

### 5.8 Authentication and utility pages

**Sign in**: split layout. Left: form (360px) centered with brand mark, email and password, a
"Continue with Google or GitHub" pair above a divider, a magic-link option, remember-me, and a
footer line to sign up. Right: an aurora panel with a product visual or a testimonial (hidden under
1024px).

**Sign up**: same shell, fields in order (name, email, password with strength meter, terms checkbox),
a "what happens next" 3-step mini list, and a single primary action.

**Forgot password / reset**: one field, one action, a clear success state with the sanitized email
echoed back, and a resend cooldown timer (60s).

**Magic link / OTP**: 6-cell code input, paste support, resend countdown, and an "open your email
app" hint with the provider detected from the address.

**Verify email / onboarding**: stepper (3.28) with 3 steps maximum, a skippable profile step, and a
"first action" screen that ends in the product with sample-flagged data.

**404**: centered glass panel, oversized 404 in gradient text at 20 percent opacity behind, one line
of copy, two actions (home, search), and a subtle floating animation on the numeral (4s, 6px, off
under reduced motion).

**500 / maintenance**: calm copy, a status link, a retry action, and an error id in mono `--fs-2xs`.

**Legal and cookie banner**: bottom-left glass bar, 400px max, three actions (Accept all, Reject
non-essential, Preferences), never a full-screen modal, never blocking the first paint of content.

**Status page**: 3 states per service (operational, degraded, outage), 30-day uptime bars 6px tall
with tooltips, active incidents with a timeline of updates, and a subscribe action.

### 5.9 Waitlist and coming soon

- Single column, centered, aurora at 40 percent intensity.
- H1 with the positioning line, one paragraph, an email field plus button, and a counter
  ("412 people ahead of you" after joining, animated from 0).
- Below: three value bullets with icons, and a "what we are building" glass card with a 3-item list.
- Optional countdown to launch with flip-style digits (no bouncing), disabled under reduced motion.
- Referral row after joining: copyable link, position delta, and social share buttons.
- Never fake social proof with invented logos; use "backed by" only with permission.

### 5.10 Error, empty and edge-case pages

| Case | Treatment |
|---|---|
| Offline | Amber banner plus a retry; cached content stays visible with a "last updated" chip |
| Slow connection | Skeletons plus a status line; delayed actions show a pending chip |
| Permission denied | Explain which role is required, offer to request access (sends a notification) |
| Expired session | Glass modal with re-auth inline, preserving the current URL and draft |
| Rate limited | Countdown timer, an explanation of the limit, and a link to upgrade |
| Partial failure | The page renders with a per-section error card rather than failing whole |
| Data too large | Virtualized list plus a "download full dataset" action instead of rendering |
| Browser unsupported | A plain page listing supported browsers, no aurora, no JS dependency |

### 5.11 SEO, metadata and social surface

- Title pattern: `{Page} - {Product}` under 60 characters; description under 155 characters, written
  as a benefit, not a keyword list.
- Open Graph image: 1200x630 generated from a template with the page title, the aurora background
  and the brand mark; never a raw screenshot.
- Structured data: `Organization` plus `WebSite` on the root, `Product` with `offers` on pricing,
  `FAQPage` on FAQ blocks, `Article` on posts, `BreadcrumbList` on nested pages.
- Semantic HTML: one H1 per page, sequential headings, `nav`, `main`, `article`, `aside`, `footer`,
  and `aria-label` on each landmark.
- Performance targets: LCP under 2s on 4G, CLS under 0.1, INP under 200ms; hero visual is not
  lazy-loaded; aurora and grain are CSS only (no images); fonts preloaded with `font-display: swap`.
- Crawling: `sitemap.xml`, `robots.txt`, canonical URLs, `hreflang` when localized, and clean slugs
  (lowercase, hyphenated, under 60 characters, no dates unless the content is dated).

### 5.12 Page composition checklist

Before shipping any page, confirm:

1. Exactly one H1 and a clear reading order.
2. Hero communicates the value in under 5 seconds at 375px width.
3. No section without a stated purpose in the blueprint.
4. Every CTA is unmistakable and has a hover, focus and loading state.
5. Every image has alt text or is decorative with `alt=""`.
6. Scroll animations: reveal once, stagger capped, disabled under reduced motion.
7. Empty, loading and error states exist for every dynamic region.
8. The page holds up at 320px with no horizontal scroll.
9. Contrast passes AA including text over glass and over aurora.
10. Lighthouse mobile: performance 90+, accessibility 100, best practices 95+, SEO 100.

---

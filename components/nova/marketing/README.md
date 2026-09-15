# Marketing components

Page sections: heroes, features, pricing, proof, FAQ and CTAs.

40 components. Every file is a self-contained React + TypeScript + Tailwind
component that renders no purple, reserves its own layout box and ships motion. Icons come
from `lucide-react` only.

```bash
# from the repository root
cp -r components/nova/ <your-app>/components/nova/
cp -r lib/ <your-app>/lib/
```

Then import the theme once, before any component renders:

```css
@import "tailwindcss";
@import "../theme/nova-theme.css";
```

## Components

| Name | Kind | What it does | File |
| --- | --- | --- | --- |
| `hero-centered` | `marketing` | Centered hero with gradient headline and visual anchor. | [HeroCentered](./hero-centered.tsx) |
| `hero-split` | `marketing` | Split hero with copy and product panel. | [HeroSplit](./hero-split.tsx) |
| `hero-chat` | `marketing` | Hero whose visual is a working chat exchange. | [HeroChat](./hero-chat.tsx) |
| `hero-minimal` | `marketing` | Type-first hero without a visual. | [HeroMinimal](./hero-minimal.tsx) |
| `announcement-pill` | `marketing` | Release pill with a live dot and arrow. | [AnnouncementPill](./announcement-pill.tsx) |
| `logo-cloud` | `marketing` | Monochrome logo row at reduced opacity. | [LogoCloud](./logo-cloud.tsx) |
| `marquee-logos` | `marketing` | Infinite logo marquee with mask fade. | [MarqueeLogos](./marquee-logos.tsx) |
| `features-bento` | `marketing` | Bento grid with one hero cell. | [FeaturesBento](./features-bento.tsx) |
| `features-grid` | `marketing` | Three-column feature grid with icon tiles. | [FeaturesGrid](./features-grid.tsx) |
| `features-alternating` | `marketing` | Alternating rows of copy and visual. | [FeaturesAlternating](./features-alternating.tsx) |
| `feature-list-icons` | `marketing` | Compact checklist of capabilities. | [FeatureListIcons](./feature-list-icons.tsx) |
| `stats-band` | `marketing` | Four animated metrics with context captions. | [StatsBand](./stats-band.tsx) |
| `process-steps` | `marketing` | Numbered steps with a filling connector. | [ProcessSteps](./process-steps.tsx) |
| `how-it-works` | `marketing` | Three-step explainer with a tabbed preview. | [HowItWorks](./how-it-works.tsx) |
| `testimonials-grid` | `marketing` | Three quote cards with real attribution. | [TestimonialsGrid](./testimonials-grid.tsx) |
| `testimonial-wall` | `marketing` | Two columns with a 0.04 parallax offset. | [TestimonialWall](./testimonial-wall.tsx) |
| `testimonial-featured` | `marketing` | Portrait plus quote at half width each. | [TestimonialFeatured](./testimonial-featured.tsx) |
| `integrations-grid` | `marketing` | Integration tiles with hover names. | [IntegrationsGrid](./integrations-grid.tsx) |
| `comparison-table` | `marketing` | Honest feature comparison with an accent column. | [ComparisonTable](./comparison-table.tsx) |
| `pricing-three` | `marketing` | Three plans with a billing toggle. | [PricingThree](./pricing-three.tsx) |
| `pricing-toggle` | `marketing` | Monthly and annual segmented control. | [PricingToggle](./pricing-toggle.tsx) |
| `pricing-comparison` | `marketing` | Full feature matrix with sticky header. | [PricingComparison](./pricing-comparison.tsx) |
| `pricing-calculator` | `marketing` | Live estimate from sliders and inputs. | [PricingCalculator](./pricing-calculator.tsx) |
| `faq-accordion` | `marketing` | Single-open accordion with deep links. | [FaqAccordion](./faq-accordion.tsx) |
| `faq-two-column` | `marketing` | Questions left, answers right. | [FaqTwoColumn](./faq-two-column.tsx) |
| `cta-band` | `marketing` | Full-width glass band with an internal glow. | [CtaBand](./cta-band.tsx) |
| `cta-split` | `marketing` | CTA with a metric on the trailing side. | [CtaSplit](./cta-split.tsx) |
| `newsletter-inline` | `marketing` | Inline capture with success replacement. | [NewsletterInline](./newsletter-inline.tsx) |
| `waitlist` | `marketing` | Email capture with position and referral. | [Waitlist](./waitlist.tsx) |
| `roadmap` | `marketing` | Now, next and later columns. | [Roadmap](./roadmap.tsx) |
| `changelog-list` | `marketing` | Timeline of releases with tags. | [ChangelogList](./changelog-list.tsx) |
| `security-badges` | `marketing` | Compliance badge grid with a trust link. | [SecurityBadges](./security-badges.tsx) |
| `team-grid` | `marketing` | Team members with roles and socials. | [TeamGrid](./team-grid.tsx) |
| `careers-list` | `marketing` | Open roles with location and team chips. | [CareersList](./careers-list.tsx) |
| `customers-grid` | `marketing` | Customer logos with case study links. | [CustomersGrid](./customers-grid.tsx) |
| `case-study-band` | `marketing` | One metric, one sentence, one logo. | [CaseStudyBand](./case-study-band.tsx) |
| `metrics-row` | `marketing` | Compact metric strip for the mid page. | [MetricsRow](./metrics-row.tsx) |
| `trust-row` | `marketing` | Avatars, rating and volume claim. | [TrustRow](./trust-row.tsx) |
| `closing-cta` | `marketing` | Final conversion block with micro-copy. | [ClosingCta](./closing-cta.tsx) |
| `product-tour` | `marketing` | Tabbed interface preview with fixed aspect. | [ProductTour](./product-tour.tsx) |

## Hand-authored files

- [HeroSplit](./hero-split.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Headline, lead and action stagger at 120ms intervals; one scroll-linked scene per page, maximum.

Full ladder, easing and reduced-motion rules: spec sections 3.7, 5.1 to 5.9 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Three accent colors in the hero.
- Feature grids of six equal tiles with no hierarchy.
- Gradient text outside the hero headline.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)

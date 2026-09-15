### 3.31 Copy, empty and loading micro-patterns (quality details)

These micro-patterns are what separate a professional page from a template. Implement them
everywhere they apply.

| Pattern | Spec |
|---|---|
| Copy button feedback | Icon swaps to a check 1.6s, plus an optional 2px accent underline sweep |
| Relative time | "2 min ago" under 1h, "14:32" today, "Mar 4" this year, then full date; `title` holds the absolute value |
| Number formatting | `Intl.NumberFormat` with the user locale; compact notation above 10,000 (12.4k) |
| Truncation | Single line with ellipsis and `title`; middle truncation for file paths and keys |
| Keyboard hint chips | 20px, `--radius-xs`, mono 11px, `--glass-strong`, shown only on desktop and only when a keyboard exists |
| Focus ring sweep | Tab through a page must show a visible ring on every interactive element, including cards and rows |
| Long content guard | `min-width: 0` plus `overflow-wrap: anywhere` on flex and grid children |
| Scroll lock | Body scroll locked with a compensating padding for the scrollbar width |
| Optimistic updates | Apply immediately, revert with a toast plus an undo action within 6s |
| Undo affordance | Destructive actions are reversible for 6s instead of confirmed when the cost is low |
| Percentage bars | 4px tall, track `--glass-dim`, fill gradient `--grad-live`, numeric label always present |
| Keyboard shortcuts | Single letters in list views (j/k to move, x to select, e to edit), documented on `?` |
| Print view | Remove aurora, glass becomes white with hairlines, links show their URL |

### 3.32 Component index (quick lookup)

| Component | Section | Component | Section |
|---|---|---|---|
| Accordion | 3.11 | Media grid | 3.23 |
| Avatar | 3.19 | Modal | 3.16 |
| Badge | 3.3 | Navbar | 3.6 |
| Bento grid | 3.8 | Newsletter | 3.26 |
| Breadcrumbs | 3.6 | Onboarding tour | 3.28 |
| Button | 3.1 | Pagination | 3.6 |
| Calendar | 3.22 | Popover | 3.18 |
| Card (glass) | 3.2 | Pricing table | 3.12 |
| Chart | 3.21 | Progress bar | 3.27 |
| Code block | 3.24 | Search | 3.30 |
| Combobox | 3.4 | Select | 3.4 |
| Command palette | 3.6 | Settings | 3.29 |
| Comparison table | 3.25 | Sidebar | 3.6 |
| Counter | 3.13 | Skeleton | 3.20 |
| Diff viewer | 3.24 | Slider | 3.4 |
| Dropdown menu | 3.18 | Spotlight card | 3.9 |
| Dropzone | 3.23 | Stat tile | 3.5 |
| Empty state | 3.20 | Stepper | 3.28 |
| Footer | 3.15 | Switch | 3.4 |
| Hero | 3.7 | Table | 3.5 |
| Input | 3.4 | Tabs | 3.6 |
| Lightbox | 3.23 | Terminal | 3.24 |
| Logo cloud | 3.10 | Testimonial | 3.10 |
| Marquee | 3.10 | Timeline | 3.14 |
| Toast | 3.17 | Tooltip | 3.18 |

---

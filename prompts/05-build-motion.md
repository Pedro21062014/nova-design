# 05 - Build Motion (scroll animation, scrollytelling, micro-interactions)

Use when the page is structurally done and needs the motion layer, or when a request is specifically
about animation.

---

## Prompt

```text
Read the Nova Vitral specification, part 6 in full (sections 6.1 to 6.13), plus 1.8, 2.6, 9.5 and 9.7:
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Read the motion example file (EX-79 to EX-90):
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/08-motion-interaction.md

TASK
Add the motion layer to <page or component>.

Scope
- Reveal on scroll for: <sections or "all sections except the hero">
- Orchestrated sequences: <hero load order, or "none">
- Scroll-linked: <parallax visual / horizontal gallery / scrollytelling / progress bar / none>
- Micro-interactions: <hover lifts, specular, indicator slides, or "default catalog">
- Ambient: <aurora drift, grain, status pulse, or "default">

Constraints (mandatory)
1. Reveals fire once: viewport once, amount 0.25, margin "0px 0px -12% 0px", duration 760ms with
   cubic-bezier(0.16, 1, 0.3, 1), travel 16px (24px for large panels).
2. Stagger 60 to 80ms per sibling, clamped so the last child starts under 400ms.
3. Only transform and opacity are animated. No animating height, top, margin, box-shadow or
   background-position.
4. At most two scroll-linked elements per viewport; parallax factor between 0.04 and 0.12, spring
   damped with damping >= 24.
5. Every animation has a prefers-reduced-motion path that renders the final state immediately.
6. Ambient loops run 20 to 60s, pause off-screen and when the tab is hidden, and never exceed a
   combined 0.45 opacity of moving background light.
7. No scroll-jacking. The user can always scroll past.
8. Hover effects only under @media (hover: hover) and (pointer: fine).
9. Exit animations for overlays: 120 to 180ms, then unmount (never left in the DOM).
10. Test with 4x CPU throttle: reveals still hold 60fps on a mid-range device.

Deliver
1. Plan in five lines with the motion inventory (element, trigger, duration, distance, easing).
2. Complete files: components/motion/*, updated sections, and the CSS keyframes you add.
3. A performance note: number of animating elements per viewport and the reduced-motion fallback.
4. Three closing bullets: built, omitted, next step.
```

## Motion inventory template (the agent should fill this before coding)

| Element | Trigger | Property | From → To | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|---|
| Section header | in view 25% | opacity, y | 0 → 1, 16px → 0 | 760ms | `--ease-out` | opacity only, 0ms |
| Cartão do bento | in view, staggered | opacity, y | 0 → 1, 16px → 0 | 600ms | `--ease-out` | static |
| Hero visual | mount | opacity, y, scale | 0 → 1, 24px → 0, 0.97 → 1 | 900ms | `--ease-out` | static |
| Navbar | scroll > 24px | background, height | transparent → glass, 72 → 56px | 240ms | `--ease-out` | same |
| Card hover | pointer hover | translateY | 0 → -4px | 240ms | `--ease-out` | none (no hover on touch) |
| Scroll progress | scroll | scaleX | 0 → 1 | continuous | linear | instant |
| Aurora | ambient | transform | drift 3 to 8% | 30 to 44s | ease-in-out | static |

## Follow-up prompts

**Fix over-animation:**

```text
Audit the motion in <files> against spec 6.1, 6.2 and 9.5 items 11 to 18. List every animation that
is too long, too large, repeated, or decorative, and remove or reduce it. Show the diffs.
```

**Add scrollytelling:**

```text
Add a sticky scrollytelling section per spec 6.5 with <n> steps, using IntersectionObserver at
-45% rootMargin, a 420ms crossfade with a 12px rise between scenes, a progress rail, a mobile
fallback that drops stickiness, and a reduced-motion fallback with static scenes.
```

**Profile performance:**

```text
List every element that animates during scroll in <page>, give the compositor cost of each, and
reduce the total to under 120 simultaneously animating elements with under 60ms of JS per frame.
Then show the optimized code.
```

## Common mistakes to correct

1. Re-animating on every scroll up (`once: false`) — forbidden.
2. 1.5s durations — capped at 900ms for entrances.
3. Animating `backdrop-filter` or `box-shadow` — replace with an opacity layer.
4. Three pulsing elements in one viewport — allow one live indicator.
5. Reveal on the first viewport on scroll — the hero animates on load instead.
6. Hover scale 1.05 on cards — use a 2 to 4px translate.
7. Parallax without spring damping — produces visible jitter.

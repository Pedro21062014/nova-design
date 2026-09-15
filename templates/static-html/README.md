# Static HTML landing page

One file, no build step, no framework, no dependencies. Open it in a browser and it works,
including the scroll reveals and the counters.

```bash
open templates/static-html/index.html
```

What it contains:

- The token set, the glass surfaces and the motion ladder, inlined so the file is portable.
- Four Lucide icons, inlined as SVG paths at 24x24 with a 1.5 stroke.
- Roughly forty lines of vanilla JavaScript: one shared reveal observer, one counter loop and
  the navbar condensation. Reduced motion renders everything in its final state.

Use it when you need to hand someone a page, when the host cannot run a build, or as the
reference for what the `nv-*` classes do without React in the way. The React equivalent is
[`../next-app/app/page.tsx`](../next-app/app/page.tsx); the Astro equivalent is
[`../astro/src/pages/index.astro`](../astro/src/pages/index.astro).

## Editing notes

- Change the four accent values at the top of the `<style>` block to rebrand. Everything else
  is neutral on purpose.
- The reveal delay is a custom property: `style="--nv-delay: 200ms"`.
- Keep one accent per viewport. If you add a section, add neutrals, not colors.

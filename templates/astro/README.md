# Astro route

The same landing page as `next-app/app/page.tsx`, expressed as one Astro route. Astro is the
cheapest way to ship this visual language: the page is static HTML by default, and the three
interactive pieces (reveal, counters, marquee) are CSS or thirty lines of vanilla script.

```bash
cd templates/astro
cp -r ../../theme ./theme
npm install
npm run dev
```

## Files

- `src/pages/index.astro` - the page. Markup is plain HTML with the `nv-*` utility classes.
- `src/styles/theme.css` - one import line that pulls in `theme/nova-theme.css`.
- `astro.config.mjs`, `package.json` - configuration.

## When to use this instead of the React templates

- Marketing pages that change twice a year, where a build step is the only dependency.
- Sites that must render without JavaScript: the reveal script degrades to "content visible".
- Anywhere a React island would exist only to animate three elements.

The React component library in `components/nova/` is not required here. The `nv-*` classes
carry the entire visual system, so Astro, plain HTML and React all produce the same page.

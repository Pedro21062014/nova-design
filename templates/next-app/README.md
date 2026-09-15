# Next.js reference app

A minimal Next.js 15 App Router application that runs the five templates without any
other setup. It exists so the templates can be verified, not so it can be shipped as-is.

```bash
cd templates/next-app
cp -r ../../components/nova ./components/nova
cp -r ../../lib ./lib
cp ../../theme/nova-theme.css ./app/nova-theme.css
npm install
npm run dev
```

Routes:

| Route | File | Renders |
| --- | --- | --- |
| `/` | `app/page.tsx` | Marketing home, eight sections |
| `/pricing` | `app/pricing/page.tsx` | Plans, comparison table, FAQ |
| `/dashboard` | `app/dashboard/page.tsx` | Metrics, charts, table, activity |
| `/chat` | `app/chat/page.tsx` | AI workspace with streaming composer |
| `/docs` | `app/docs/page.tsx` | Documentation layout with side rails |

## Files

- `package.json` - Next 15, React 19, Tailwind v4, `motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- `tsconfig.json` - the `@/*` alias the components rely on.
- `app/layout.tsx` - root layout, metadata, font variables, `<Background />` once.
- `app/globals.css` - two imports, in order: Tailwind, then the Nova theme.
- `app/page.tsx` and the four routes above.

## Notes

- The dashboard, pricing and chat routes are client components because they hold state.
  The home and docs routes are server components; only the library pieces they import
  (reveal, counter, marquee) cross the client boundary.
- Nothing in these pages sets a color directly. Everything reads a token, so switching the
  light theme is one attribute on `<html>`: `data-theme="light"`.
- The sticky navbar height is exposed as `--nav-h` (64px), so `scroll-mt` and sticky rails
  line up without magic numbers.

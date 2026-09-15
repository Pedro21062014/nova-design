# 06 - Review and Audit

Use to review an existing page, component or design against the spec. Returns a prioritized report
and, optionally, the fixes.

---

## Prompt

```text
Read the Nova Vitral specification, sections 9.1 (accessibility), 9.3 (performance),
9.4 (visual QA), 9.5 (anti-patterns), 9.6 (code review) and 9.7 (critique rubric):
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md

Also read sections 1.3 (glass rules), 2 (tokens) and 6.12 (reduced motion and performance).

You are auditing the following code or page: <paste code, or name the files, or describe the URL>

Produce a report with these sections, in this order:

1. Score (0 to 5) on each rubric dimension from spec 9.7: hierarchy, craft, restraint, depth,
   typography, motion, states, accessibility, performance, content. State the total out of 50.
2. Critical issues (must fix): each with the file and line, the spec section violated, the concrete
   impact on the user, and the exact fix as a diff.
3. Major issues (should fix): same format.
4. Minor and polish: bullet list, no diffs.
5. Anti-pattern scan: which items from spec 9.5 are present, numbered.
6. Token audit: every hardcoded color, shadow, radius, duration or z-index found, with the token it
   should use instead.
7. Accessibility findings: contrast measurements on glass, focus order, labels, roles, keyboard
   traps, target sizes, reduced motion.
8. Performance findings: animating properties, simultaneous backdrop-filter count, layout thrash,
   missing virtualization, oversized bundles, image handling.
9. Copy review: placeholders, vague claims, inconsistent terminology, missing error copy.
10. Prioritized action list: at most 10 items ordered by impact per unit of effort.

Then apply the top 10 fixes and show only the changed code, with a one-line rationale per fix.
```

## Severity definitions the agent must use

| Severity | Meaning |
|---|---|
| Critical | Blocks a user: unusable on mobile, keyboard trap, invisible focus, unreadable text, broken data state |
| Major | Degrades quality visibly: glass without a background, missing states, over-animation, placeholder copy |
| Minor | Polish: spacing off by 4px, inconsistent icon stroke, missing tooltip |
| Nit | Preference-level; mention only if a rule exists in the spec |

## Audit scripts the agent can suggest

```bash
npx @axe-core/cli http://localhost:3000 --exit
npx lighthouse http://localhost:3000 --preset=desktop --only-categories=performance,accessibility,best-practices,seo
npx tsc --noEmit
npx next lint
grep -rEn "#[0-9a-fA-F]{3,8}" components app --include=*.tsx | grep -v tokens
grep -rn "once: *false" components
grep -rn "duration: *0\.[89]\|duration: *1\.\|duration: *[2-9]" components
grep -rn "hover:scale-1" components
```

## Manual verification checklist (state results explicitly)

1. Keyboard-only walkthrough: Tab reaches every interactive element with a visible ring.
2. Screen reader pass on the primary flow: labels, roles and live regions are announced correctly.
3. 320px width: no horizontal scroll, no clipped text, tap targets at least 44px.
4. 200 percent zoom: nothing overlaps or clips.
5. Reduced motion: no movement, nothing hidden.
6. Dark and light themes on every page.
7. Network throttled to Slow 4G: LCP, CLS and INP within the spec budget.
8. Scroll performance with the aurora enabled and 4x CPU throttle.
9. Form failure paths: errors, offline, expired session, rate limit.
10. Copy: no placeholders anywhere, in any state.

## Follow-up prompts

**Fix in batches:**

```text
Fix the critical issues first and show the diffs. Do not touch anything else in this pass.
```

**Verify a fix:**

```text
Re-audit only the sections affected by the last change. Confirm the score change and list any
regressions introduced.
```

**Turn findings into a plan:**

```text
Convert the action list into a commit plan: one commit per item, conventional commit messages,
and the order that keeps the app working after every commit.
```

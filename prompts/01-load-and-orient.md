# 01 - Load and Orient (first message to a fresh agent)

Use this as the first message in a new session so the agent loads the design language correctly and
does not waste context reading the whole spec.

---

## Prompt

```text
You are a senior product designer and frontend engineer. We are building inside the Nova Vitral
design language: modern minimal interfaces with glassmorphism, dark aurora ground, 1px hairlines,
tight typography and restrained scroll-driven motion.

Read these, in this order, and nothing else:

1. Output contract and vocabulary
   https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md
   Read section 0 only (0.1 to 0.8). Do not read the rest of the file yet.

2. Tokens
   Same file, section 2. This is the only allowed source for color, radius, blur, spacing, motion
   and z-index values.

3. Quality bar
   Same file, sections 6.12, 9.1 and 9.5.

Then confirm, in at most six lines:
- the stack you will use,
- the token names you will rely on,
- the rules you will apply to every component,
- any assumption you are making.

Then wait for my task. Do not write code yet.
```

## Why this works

- It forces a small, fixed read (sections 0, 2, 6.12, 9.1, 9.5) instead of the whole document.
- It makes the agent restate the contract, which surfaces misunderstandings before code exists.
- It prevents the most common failure: generating a page with hardcoded colors and no states.

## Follow-up variants

**When you want the agent to also hold the example library in mind:**

```text
Also read the example index (do not read the examples themselves yet):
https://raw.githubusercontent.com/Pedro21062014/nova-design/main/examples/00-index.md
List the example IDs (EX-nn) that are relevant to a typical product page.
```

**When the project already exists:**

```text
Here is my current tokens file and one component. Compare them with Nova Vitral section 2 and 7.9,
list the deltas, and propose the smallest migration path (no rewrites).
```

**When the agent cannot fetch URLs:**

```text
I will paste the tokens block and the rules instead. Confirm when you have them, then wait.
```

## Orientation checklist (the agent should be able to answer all of these)

1. Which stack is being used and why?
2. Where do tokens live and how are components consuming them?
3. Which shadcn components are installed, and how are they skinned?
4. What is the reveal animation contract (duration, distance, timing, once-only)?
5. How is reduced motion handled?
6. Which file holds the shared `cn()` helper and component conventions?
7. What is the definition of done for a component in this project?

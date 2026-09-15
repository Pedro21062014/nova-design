# Examples 21 to 30 - Navigation and App Shell

Part of the Nova Vitral example library. Index: `examples/00-index.md`.

---

## EX-21 - Glass navbar that condenses on scroll

**Base:** custom
**Shows:** transparent to glass transition at 24px, height shrink, single passive listener

```tsx
"use client";
export function Navbar({ links }: { links: { href: string; label: string }[] }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-[240ms] ease-[var(--ease-out)]",
      scrolled ? "border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-[var(--blur)]"
               : "border-b border-transparent",
    )}>
      <div className={cn("mx-auto flex max-w-[var(--container)] items-center justify-between px-[var(--gutter)] transition-[height] duration-[240ms]",
        scrolled ? "h-14" : "h-[var(--nav-h)]")}>
        <a href="/" className="flex items-center gap-2 text-[var(--fs-sm)] font-semibold text-[var(--fg)]">
          <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass)]">
            <Logo className="size-3.5 text-[var(--accent)]" />
          </span>
          Product
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="relative rounded-[var(--radius-sm)] px-3 py-2 text-[var(--fs-sm)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">Sign in</Button>
          <Button size="sm">Start free</Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu"><Menu className="size-4" /></Button>
        </div>
      </div>
    </header>
  );
}
```

**Motion:** background, border and height interpolate together over 240ms; nothing else moves.
**Refs:** 3.6, 5.1 section 1

---

## EX-22 - Nav underline that slides between items

**Base:** `motion/react` `layoutId`
**Shows:** 2px accent indicator shared across links, plus scroll spy

```tsx
"use client";
export function NavLinks({ links }: { links: Link[] }) {
  const [active, setActive] = useState(links[0].href);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    links.forEach((l) => { const el = document.querySelector(l.href); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [links]);

  return (
    <nav className="flex items-center gap-1" aria-label="Sections">
      {links.map((l) => (
        <a key={l.href} href={l.href}
          aria-current={active === l.href ? "true" : undefined}
          className={cn("relative px-3 py-2 text-[var(--fs-sm)] transition-colors",
            active === l.href ? "text-[var(--fg)]" : "text-[var(--fg-subtle)] hover:text-[var(--fg-muted)]")}>
          {l.label}
          {active === l.href && (
            <motion.span layoutId="nav-underline"
              className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--accent)]"
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }} />
          )}
        </a>
      ))}
    </nav>
  );
}
```

**Motion:** indicator travels between items in 240ms; text color 140ms.
**Refs:** 3.6, 3.27 (scroll spy)

---

## EX-23 - Mobile sheet menu

**Base:** `shadcn` Sheet
**Shows:** 44px targets, focus trap, body scroll lock, close on route change

```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="top"
    className="vitral-strong h-auto rounded-b-[var(--radius-xl)] border-x-0 border-t-0 pt-6">
    <SheetHeader className="px-6 text-left">
      <SheetTitle className="text-[var(--fs-h4)] text-[var(--fg)]">Menu</SheetTitle>
    </SheetHeader>
    <nav className="mt-4 grid gap-1 px-3 pb-6">
      {links.map((l) => (
        <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
          className="flex h-11 items-center rounded-[var(--radius)] px-3 text-[var(--fs-body)] text-[var(--fg-muted)] hover:bg-[var(--glass)] hover:text-[var(--fg)]">
          {l.label}
        </Link>
      ))}
      <div className="mt-3 grid gap-2 px-3">
        <Button full size="lg">Start free</Button>
        <Button full variant="glass" size="lg">Sign in</Button>
      </div>
    </nav>
  </SheetContent>
</Sheet>
```

**Motion:** slide down 320ms `--ease-out`; scrim fades 200ms; exit 180ms then unmount.
**Refs:** 3.16, 3.6 (mobile)

---

## EX-24 - Sidebar with rail collapse

**Base:** custom + `motion/react`
**Shows:** 264px to 64px rail, persisted state, delayed thread re-centering

```tsx
"use client";
export function Sidebar({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("rail") === "1");

  const toggle = () => {
    setCollapsed((c) => { localStorage.setItem("rail", c ? "0" : "1"); return !c; });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "[") toggle(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 264 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 hidden h-dvh shrink-0 border-r border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg-soft)_70%,transparent)] backdrop-blur-[var(--blur)] lg:block"
      aria-label="Workspace navigation"
    >
      {children}
    </motion.aside>
  );
}
```

**Motion:** width 240ms; labels fade 120ms and delay-in 120ms when expanding so text does not squash.
**Refs:** 3.6, 4.0 (rail), 4.13

---

## EX-25 - Sidebar nav item with active bar and tooltip

**Base:** custom
**Shows:** active state, hover tooltip when collapsed, keyboard focus

```tsx
export function NavItem({ icon: Icon, label, active, collapsed, badge }: NavItemProps) {
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Link href={href} aria-current={active ? "page" : undefined}
          className={cn(
            "group relative flex h-9 items-center gap-3 rounded-[var(--radius-sm)] px-3 text-[var(--fs-sm)] transition-colors duration-[140ms]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
            active ? "bg-[var(--glass-strong)] text-[var(--fg)]" : "text-[var(--fg-muted)] hover:bg-[var(--glass)] hover:text-[var(--fg)]",
            collapsed && "justify-center px-0",
          )}>
          {active && <span className="absolute left-0 h-4 w-0.5 rounded-r-full bg-[var(--accent)]" />}
          <Icon className="size-4 shrink-0" aria-hidden />
          {!collapsed && <span className="truncate">{label}</span>}
          {!collapsed && badge ? <span className="ml-auto text-[var(--fs-2xs)] tabular-nums text-[var(--fg-subtle)]">{badge}</span> : null}
        </Link>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right" sideOffset={8} className="vitral rounded-[var(--radius-sm)] px-2 py-1 text-[var(--fs-xs)]">{label}</TooltipContent>}
    </Tooltip>
  );
}
```

**Motion:** background 140ms; the accent bar is never animated (it is an indicator, not decoration).
**Refs:** 3.6, 3.18

---

## EX-26 - Tabs with sliding indicator and deep links

**Base:** `shadcn` Tabs
**Shows:** `layoutId` indicator, URL state, keyboard arrows

```tsx
"use client";
export function ProductTabs({ tabs }: { tabs: { value: string; label: string; content: React.ReactNode }[] }) {
  const [value, setValue] = useState(tabs[0].value);
  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList className="vitral h-10 w-fit gap-1 rounded-full p-1">
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}
            className="relative h-8 rounded-full px-4 text-[var(--fs-xs)] text-[var(--fg-muted)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--fg)] data-[state=active]:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            {value === t.value && (
              <motion.span layoutId="tab-pill" transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-full border border-[var(--hair)] bg-[var(--glass-strong)]" />
            )}
            <span className="relative z-10">{t.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value} className="mt-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}>
            {t.content}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
```

**Motion:** pill 240ms, panel content 8px rise 240ms.
**Refs:** 3.6, 6.10

---

## EX-27 - Command palette (cmdk)

**Base:** `shadcn` Command in a Dialog
**Shows:** grouped actions, shortcuts, recents on empty query

```tsx
"use client";
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogContent className="vitral-strong top-[15vh] max-w-[640px] translate-y-0 gap-0 overflow-hidden border-0 p-0 shadow-[var(--shadow-3)]">
        <Command className="bg-transparent [&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-[var(--hair)]">
          <CommandInput placeholder="Search or jump to..." className="h-14 bg-transparent text-[var(--fs-body)]" />
          <CommandList className="max-h-[380px] p-2">
            <CommandEmpty className="py-8 text-center text-[var(--fs-sm)] text-[var(--fg-subtle)]">No results.</CommandEmpty>
            <CommandGroup heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-[var(--fs-2xs)] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.06em] [&_[cmdk-group-heading]]:text-[var(--fg-subtle)]">
              {/* CommandItem rows: 44px, icon, label, shortcut chip */}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center gap-3 border-t border-[var(--hair)] px-3 py-2 text-[var(--fs-2xs)] text-[var(--fg-subtle)]">
            <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
          </div>
        </Command>
      </DialogContent>
    </CommandDialog>
  );
}
```

**Motion:** dialog scales 0.97 to 1 over 220ms; rows highlight instantly with no transition.
**Refs:** 3.6, 3.16, 4.16 (shortcut map)

---

## EX-28 - Dropdown menu with destructive separation

**Base:** `shadcn` DropdownMenu
**Shows:** 36px rows, shortcut hints, hairline before destructive action

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal className="size-4" /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" sideOffset={8}
    className="vitral-strong w-[240px] rounded-[var(--radius)] border-0 p-1.5 shadow-[var(--shadow-2)]">
    <DropdownMenuItem className="h-9 gap-2.5 rounded-[var(--radius-sm)] px-2.5 text-[var(--fs-sm)] focus:bg-[var(--glass-strong)]">
      <Pencil className="size-4 text-[var(--fg-subtle)]" /> Rename
      <DropdownMenuShortcut className="font-[var(--font-mono)] text-[10px] text-[var(--fg-subtle)]">⌘R</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem className="h-9 gap-2.5 rounded-[var(--radius-sm)] px-2.5 text-[var(--fs-sm)] focus:bg-[var(--glass-strong)]">
      <Copy className="size-4 text-[var(--fg-subtle)]" /> Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator className="my-1.5 h-px bg-[var(--hair-soft)]" />
    <DropdownMenuItem className="h-9 gap-2.5 rounded-[var(--radius-sm)] px-2.5 text-[var(--fs-sm)] text-[var(--danger)] focus:bg-[color-mix(in_srgb,var(--danger)_12%,transparent)]">
      <Trash2 className="size-4" /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Motion:** fade plus 4px offset from the trigger origin, 140ms.
**Refs:** 3.18, 3.31

---

## EX-29 - Breadcrumbs with collapse

**Base:** custom
**Shows:** ellipsis beyond four levels, current page not a link

```tsx
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const shown = items.length > 4 ? [items[0], null, ...items.slice(-2)] : items;
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[var(--fs-xs)] text-[var(--fg-subtle)]">
      {shown.map((item, i) =>
        item === null ? (
          <DropdownMenu key="more">
            <DropdownMenuTrigger className="rounded-[var(--radius-xs)] px-1 hover:text-[var(--fg)]">···</DropdownMenuTrigger>
            <DropdownMenuContent className="vitral-strong border-0">{/* hidden items */}</DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 opacity-60" aria-hidden />}
            {item.href ? <Link href={item.href} className="transition-colors hover:text-[var(--fg-muted)]">{item.label}</Link>
                       : <span aria-current="page" className="text-[var(--fg)]">{item.label}</span>}
          </span>
        ),
      )}
    </nav>
  );
}
```

**Motion:** none; breadcrumbs are orientation, not decoration.
**Refs:** 3.6 (breadcrumbs), 9.1

---

## EX-30 - Footer with oversized wordmark

**Base:** custom
**Shows:** aurora glow rising from the bottom, link accordions on mobile

```tsx
export function Footer({ columns }: { columns: { title: string; links: Link[] }[] }) {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[var(--hair)]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px]"
        style={{ background: "radial-gradient(60% 100% at 50% 100%, var(--aurora-1), transparent 70%)", opacity: 0.6 }} />
      <div className="relative mx-auto max-w-[var(--container)] px-[var(--gutter)] pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo className="h-5 text-[var(--fg)]" />
            <p className="mt-3 max-w-[32ch] text-[var(--fs-sm)] text-[var(--fg-muted)]">
              Interfaces that feel engineered. Designed and specified for AI-assisted teams.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--hair)] bg-[var(--glass-dim)] px-2.5 py-1 text-[var(--fs-2xs)] text-[var(--fg-muted)]">
              <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent-2)]" />
              All systems operational
            </div>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="text-[var(--fs-2xs)] font-medium uppercase tracking-[0.06em] text-[var(--fg-subtle)]">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[var(--fs-sm)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div aria-hidden className="mt-12 select-none text-center font-[var(--font-display)] text-[clamp(4rem,14vw,12rem)] font-semibold leading-none tracking-[-0.05em] text-transparent"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.10), transparent)", WebkitBackgroundClip: "text", backgroundClip: "text", maskImage: "linear-gradient(180deg,#000,transparent)" }}>
          PRODUCT
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--hair-soft)] py-6 text-[var(--fs-xs)] text-[var(--fg-subtle)] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Company, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">{/* locale select, theme toggle, social */}</div>
        </div>
      </div>
    </footer>
  );
}
```

**Motion:** none, except the ambient status dot (2.4s pulse, paused when the tab is hidden).
**Refs:** 3.15, 6.11

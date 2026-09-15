# Examples 11 to 20 - Controls and Forms

Part of the Nova Vitral example library. Index: `examples/00-index.md`.

---

## EX-11 - Primary gradient button (shadcn variant)

**Base:** `shadcn` Button + cva variant
**Shows:** the only "solid" element in the system, with a real loading state

```tsx
const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-[transform,box-shadow,opacity] duration-[140ms] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98]",
  {
    variants: {
      variant: {
        vitral: "h-10 px-5 text-[var(--fs-sm)] text-[var(--accent-fg)] shadow-[var(--shadow-2)] bg-[image:var(--grad-primary)] hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(124,140,255,.35),0_12px_40px_-12px_rgba(124,140,255,.45)]",
        glass: "h-10 px-5 text-[var(--fs-sm)] text-[var(--fg)] border border-[var(--hair)] bg-[var(--glass)] backdrop-blur-[var(--blur-sm)] hover:bg-[var(--glass-hover)] hover:border-[var(--hair-strong)]",
      },
      size: { sm: "h-8 px-3.5 text-[var(--fs-xs)]", lg: "h-12 px-7 text-[var(--fs-body)]", icon: "size-10 p-0" },
    },
    defaultVariants: { variant: "vitral", size: "sm" },
  },
);
```

**Motion:** translateY -1px on hover, scale 0.98 on press, 140ms.
**Refs:** 3.1, 7.9 technique 3

---

## EX-12 - Loading button with state machine

**Base:** `shadcn` Button + `Loader2`
**Shows:** width-locked loading, then success, then idle

```tsx
"use client";
type State = "idle" | "loading" | "done" | "error";

export function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const [state, setState] = useState<State>("idle");
  const [width, setWidth] = useState<number>();

  return (
    <Button
      onClick={async () => {
        setWidth((w) => w ?? undefined);
        setState("loading");
        try { await onSave(); setState("done"); setTimeout(() => setState("idle"), 1600); }
        catch { setState("error"); }
      }}
      disabled={state === "loading"}
      className={cn(state === "loading" && "animate-pulse-none", width ? `min-w-[${width}px]` : "")}
      aria-live="polite"
    >
      {state === "loading" && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {state === "done" && <Check className="size-4 text-[var(--accent-2)]" aria-hidden />}
      {state === "error" && <AlertCircle className="size-4 text-[var(--danger)]" aria-hidden />}
      {state === "idle" ? "Save changes" : state === "loading" ? "Saving" : state === "done" ? "Saved" : "Try again"}
    </Button>
  );
}
```

**Motion:** label dims to 60 percent while loading; no layout shift (reserve the widest label).
**Refs:** 3.1 (states), 3.31 (micro-patterns)

---

## EX-13 - Icon button with delayed tooltip

**Base:** `shadcn` Tooltip
**Shows:** accessible icon-only action with a 400ms delay

```tsx
<TooltipProvider delayDuration={400}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Copy link">
        <LinkIcon className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="vitral rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[var(--fs-xs)] text-[var(--fg-muted)]" sideOffset={8}>
      Copy link
      <span className="ml-2 rounded-[var(--radius-xs)] bg-[var(--glass-strong)] px-1.5 py-0.5 font-[var(--font-mono)] text-[10px] text-[var(--fg-subtle)]">⌘C</span>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Motion:** fade plus 4px offset, 120ms.
**Refs:** 3.18, 3.31 (keyboard hint chips)

---

## EX-14 - Input with label, hint, error and icon

**Base:** `shadcn` Input + Label
**Shows:** the complete field anatomy with `aria-describedby`

```tsx
export function Field({ id, label, hint, error, icon, ...props }: FieldProps) {
  const descId = `${id}-desc`;
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[var(--fs-xs)] font-medium text-[var(--fg-muted)]">{label}</Label>
      <div className={cn(
        "group relative flex items-center rounded-[var(--radius-sm)] border bg-[var(--glass-dim)] transition-colors duration-[140ms]",
        "focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
        error ? "border-[var(--danger)]" : "border-[var(--hair)] hover:border-[var(--hair-strong)]",
      )}>
        {icon && <span className="pl-3 text-[var(--fg-subtle)]">{icon}</span>}
        <Input id={id} aria-invalid={!!error} aria-describedby={error || hint ? descId : undefined}
          className="h-10 border-0 bg-transparent px-3 text-[var(--fs-sm)] shadow-none focus-visible:ring-0" {...props} />
      </div>
      {(error || hint) && (
        <p id={descId} className={cn("text-[var(--fs-xs)]", error ? "text-[var(--danger)]" : "text-[var(--fg-subtle)]")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
```

**Motion:** border color 140ms; the ring appears without transition (instant focus feedback).
**Refs:** 3.4, 9.1 (form labeling)

---

## EX-15 - Combo box (searchable select)

**Base:** `shadcn` Command inside a Popover
**Shows:** search, groups, empty state and keyboard selection

```tsx
export function ModelPicker({ models, value, onChange }: ModelPickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="glass" size="sm" aria-expanded={open} className="gap-2">
          <Sparkles className="size-3.5 text-[var(--accent)]" />
          {value}
          <ChevronsUpDown className="size-3.5 text-[var(--fg-subtle)]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="vitral-strong w-[320px] border-0 p-0">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search models" className="h-11 border-b border-[var(--hair)] bg-transparent" />
          <CommandList className="max-h-[320px] p-1">
            <CommandEmpty className="py-6 text-center text-[var(--fs-sm)] text-[var(--fg-subtle)]">
              No model matches.
            </CommandEmpty>
            <CommandGroup heading="Frontier" className="text-[var(--fs-2xs)] uppercase tracking-[0.06em] text-[var(--fg-subtle)]">
              {models.map((m) => (
                <CommandItem key={m.id} value={m.name} onSelect={() => { onChange(m.name); setOpen(false); }}
                  className="flex h-10 items-center gap-3 rounded-[var(--radius-sm)] px-2 data-[selected=true]:bg-[var(--glass-strong)]">
                  <Check className={cn("size-3.5", value === m.name ? "opacity-100 text-[var(--accent)]" : "opacity-0")} />
                  <span className="text-[var(--fs-sm)]">{m.name}</span>
                  <span className="ml-auto text-[var(--fs-2xs)] text-[var(--fg-subtle)]">{m.context}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

**Motion:** popover fade plus 4px rise from the trigger origin, 180ms; rows highlight instantly.
**Refs:** 3.4, 3.18, 4.15

---

## EX-16 - OTP / verification code input

**Base:** custom (or `input-otp`)
**Shows:** 6 cells, paste support, auto-advance, shake on invalid

```tsx
"use client";
export function OtpInput({ length = 6, onComplete }: { length?: number; onComplete: (code: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [invalid, setInvalid] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const set = (i: number, v: string) => {
    const next = [...values];
    next[i] = v.replace(/\D/g, "").slice(-1);
    setValues(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every(Boolean)) {
      const code = next.join("");
      if (code.length === length) onComplete(code);
    }
  };

  return (
    <div className="flex gap-2" role="group" aria-label="Verification code"
      onPaste={(e) => {
        const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!text) return;
        e.preventDefault();
        setValues(Array.from({ length }, (_, i) => text[i] ?? ""));
        refs.current[Math.min(text.length, length - 1)]?.focus();
      }}>
      {values.map((v, i) => (
        <input key={i} ref={(el) => { refs.current[i] = el; }} value={v} inputMode="numeric" autoComplete="one-time-code"
          aria-label={`Digit ${i + 1}`} maxLength={1}
          onChange={(e) => set(i, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Backspace" && !v && i > 0) refs.current[i - 1]?.focus(); }}
          className={cn(
            "size-11 rounded-[var(--radius-sm)] border bg-[var(--glass-dim)] text-center text-[var(--fs-h4)] tabular-nums text-[var(--fg)]",
            "outline-none transition-colors focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-soft)]",
            invalid ? "border-[var(--danger)] animate-[shake_320ms_ease-in-out]" : "border-[var(--hair)]",
          )} />
      ))}
    </div>
  );
}
```

**Motion:** invalid triggers a 3-step 4px shake (320ms) once; focus feedback is instant.
**Refs:** 3.4, 5.8 (magic link and OTP)

---

## EX-17 - Switch with optimistic save indicator

**Base:** `shadcn` Switch
**Shows:** instant feedback plus a "Saved" chip, no toast spam

```tsx
"use client";
export function SettingSwitch({ label, description, checked, onToggle }: SettingSwitchProps) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex items-start justify-between gap-6 rounded-[var(--radius)] border border-[var(--hair-soft)] bg-[var(--glass-dim)] p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <label htmlFor={label} className="text-[var(--fs-sm)] font-medium text-[var(--fg)]">{label}</label>
          <span className={cn("text-[var(--fs-2xs)] text-[var(--accent-2)] transition-opacity", saved ? "opacity-100" : "opacity-0")}>
            Saved
          </span>
        </div>
        <p className="mt-1 text-[var(--fs-xs)] text-[var(--fg-subtle)]">{description}</p>
      </div>
      <Switch id={label} checked={checked}
        onCheckedChange={async (v) => { onToggle(v); setSaved(true); setTimeout(() => setSaved(false), 1600); }}
        className="data-[state=checked]:bg-[var(--accent)] data-[state=unchecked]:bg-[var(--glass-strong)]" />
    </div>
  );
}
```

**Motion:** thumb 160ms; the "Saved" chip fades in 180ms and out 240ms after 1.6s.
**Refs:** 3.4, 3.29, 3.31

---

## EX-18 - Slider with value bubble

**Base:** `shadcn` Slider
**Shows:** formatted value, bubble on drag, keyboard support

```tsx
export function BudgetSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [dragging, setDragging] = useState(false);
  return (
    <div className="w-full max-w-[420px] pt-8">
      <div className="relative">
        <div className={cn("absolute -top-8 -translate-x-1/2 rounded-[var(--radius-sm)] border border-[var(--hair)] bg-[var(--glass-strong)] px-2 py-1 text-[var(--fs-xs)] tabular-nums text-[var(--fg)] transition-opacity",
          dragging ? "opacity-100" : "opacity-0")} style={{ left: `${((value - 100) / 4900) * 100}%` }}>
          ${value.toLocaleString()}
        </div>
        <Slider value={[value]} min={100} max={5000} step={100}
          onValueChange={([v]) => onChange(v)}
          onValueCommit={() => setDragging(false)}
          onPointerDown={() => setDragging(true)}
          aria-valuetext={`$${value} per month`}
          className="[&_[role=slider]]:size-4 [&_[role=slider]]:border-[var(--hair-strong)] [&_[role=slider]]:bg-[var(--fg)] [&_.bg-primary]:bg-[var(--accent)]" />
      </div>
    </div>
  );
}
```

**Motion:** bubble fades on drag only; thumb scales 1.08 while active.
**Refs:** 3.4 (slider), 9.1 (aria-valuetext)

---

## EX-19 - Dropzone with per-file progress

**Base:** custom + `react-dropzone`
**Shows:** drag states, validation, retry, per-file rows

```tsx
export function Dropzone() {
  const [over, setOver] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 25 * 1024 * 1024,
    accept: { "image/*": [], "application/pdf": [], "text/*": [] },
    onDropRejected: (r) => setError(r[0]?.errors[0]?.message ?? "File rejected"),
  });

  return (
    <div {...getRootProps()} data-over={over}
      onDragEnter={() => setOver(true)} onDragLeave={() => setOver(false)}
      className={cn(
        "grid place-items-center rounded-[var(--radius-lg)] border border-dashed p-8 text-center transition-colors duration-[200ms]",
        over ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--hair)] bg-[var(--glass-dim)] hover:border-[var(--hair-strong)]",
      )}>
      <input {...getInputProps()} />
      <UploadCloud className={cn("size-5", over ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]")} aria-hidden />
      <p className="mt-3 text-[var(--fs-sm)] text-[var(--fg)]">Drop files or browse</p>
      <p className="mt-1 text-[var(--fs-xs)] text-[var(--fg-subtle)]">PNG, PDF or text, up to 25MB each</p>
    </div>
  );
}
```

**Motion:** border and background 200ms; no scale on the zone.
**Refs:** 3.23, 4.7 (attachment rules)

---

## EX-20 - Form with submit summary and error focus

**Base:** `react-hook-form` + `zod` + shadcn Form
**Shows:** error summary that links to fields, focus management on failure

```tsx
"use client";
const schema = z.object({
  name: z.string().min(2, "Use at least 2 characters"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().min(2, "Company name is required"),
});

export function WaitlistForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setFocus } = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(async (data) => { await join(data); }, () => {
      const first = Object.keys(errors)[0] as keyof typeof errors;
      if (first) setFocus(first);
    })} className="grid gap-4">
      {Object.keys(errors).length > 2 && (
        <div role="alert" className="rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] p-3">
          <p className="text-[var(--fs-sm)] text-[var(--danger)]">Fix {Object.keys(errors).length} fields to continue</p>
          <ul className="mt-1 space-y-1 text-[var(--fs-xs)] text-[var(--fg-muted)]">
            {Object.entries(errors).map(([k, v]) => (
              <li key={k}><a href={`#${k}`} className="underline underline-offset-2">{String(v?.message)}</a></li>
            ))}
          </ul>
        </div>
      )}
      {/* fields from EX-14, submit button from EX-12 */}
    </form>
  );
}
```

**Motion:** none on error entrance except a 180ms fade; never shake the whole form.
**Refs:** 3.4 (form layout and validation timing), 9.1

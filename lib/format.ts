const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

export function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: Math.abs(value) >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatPercent(value: number, digits = 1) {
  return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}

export function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let index = 0;
  let size = bytes;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${numberFormat.format(size)} ${units[index]}`;
}

export function formatDuration(ms: number) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/** "2 min ago" under an hour, clock today, "Mar 4" this year, then the full date. */
export function relativeTime(input: Date | string | number) {
  const date = new Date(input);
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.round(diff / 60_000)} min ago`;
  const sameDay = new Date().toDateString() === date.toDateString();
  if (sameDay) return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (date.getFullYear() === new Date().getFullYear())
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return date.toLocaleDateString();
}

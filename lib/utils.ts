import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind classes winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Deterministic hue from an identifier, used by the calm avatar palette. */
export function hashHue(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

/** Low-saturation avatar gradient: avatars must never outshine the interface. */
export function avatarGradient(id: string) {
  const hues = [222, 210, 198, 172, 152, 24];
  const h = hues[hashHue(id) % hues.length];
  return `linear-gradient(135deg, hsl(${h} 42% 54%), hsl(${h} 46% 40%))`;
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function truncateMiddle(value: string, max = 32) {
  if (value.length <= max) return value;
  const half = Math.floor((max - 1) / 2);
  return `${value.slice(0, half)}...${value.slice(-half)}`;
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Background } from "@/components/nova/core/aurora";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Meridian - Usage analytics for platform teams",
    template: "%s - Meridian",
  },
  description:
    "Meridian turns raw product events into revenue, retention and reliability signals your platform team can act on the same day.",
  metadataBase: new URL("https://meridian.example"),
  openGraph: { type: "website", siteName: "Meridian" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The aurora and grain layers are mounted once, here. Glass surfaces need a
    // background behind them: without this, the blur reads as flat gray.
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--bg)] font-[var(--font-sans)] text-[var(--fg)] antialiased">
        <Background intensity={1} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-[var(--glass-strong)] focus:px-3 focus:py-2 focus:text-[13px] focus:text-[var(--fg)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

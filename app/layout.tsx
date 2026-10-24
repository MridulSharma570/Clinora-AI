import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppProvider } from "@/components/layout/app-provider";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { AppFooter } from "@/components/layout/app-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Clinora AI — Prepare for care. Not a diagnosis.",
    template: "%s · Clinora AI",
  },
  description: "Educational pre-visit preparation for adults. Organize your story and questions without diagnosis or treatment advice.",
  applicationName: "Clinora AI",
  robots: { index: false, follow: false },
  icons: { icon: "/tide-mark.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07141C" },
    { media: "(prefers-color-scheme: light)", color: "#EDF6F3" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-contrast="standard" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AppProvider>
          <div className="ambient ambient-one" aria-hidden="true" />
          <div className="ambient ambient-two" aria-hidden="true" />
          <AppHeader />
          <main id="main-content" className="app-main" tabIndex={-1}>
            {children}
            <AppFooter />
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}

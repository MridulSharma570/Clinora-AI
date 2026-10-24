"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, Home, Menu, MessageCircleQuestion, ClipboardPenLine } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home, matches: (path: string) => path === "/" || path === "/dashboard" },
  { href: "/check", label: "Check", icon: ClipboardPenLine, matches: (path: string) => path.startsWith("/check") || path === "/summary" },
  { href: "/assistant", label: "Ask AI", icon: MessageCircleQuestion, matches: (path: string) => path === "/assistant" },
  { href: "/history", label: "History", icon: Clock3, matches: (path: string) => path === "/history" },
  {
    href: "/more",
    label: "More",
    icon: Menu,
    matches: (path: string) => ["/more", "/learn", "/settings", "/about", "/legal", "/emergency"].some((route) => path.startsWith(route)),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav" aria-label="Primary navigation" data-testid="bottom-navigation">
      <div className="bottom-nav-inner">
        {items.map((item) => {
          const active = item.matches(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-item", active && "nav-item-active")}
              aria-current={active ? "page" : undefined}
            >
              <span className="nav-icon-wrap">
                <Icon size={20} strokeWidth={active ? 2.3 : 1.8} aria-hidden="true" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

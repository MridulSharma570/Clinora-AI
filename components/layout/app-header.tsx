import Link from "next/link";
import { ArrowUpRight, LifeBuoy } from "lucide-react";
import { TideLogo } from "@/components/layout/tide-logo";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <TideLogo />
        <nav className="header-actions" aria-label="Utility navigation">
          <Link href="/about" className="header-about">
            About <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/emergency" className="emergency-button emergency-button-small">
            <LifeBuoy size={17} aria-hidden="true" />
            <span>Emergency</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

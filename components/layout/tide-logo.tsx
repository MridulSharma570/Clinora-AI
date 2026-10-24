import Link from "next/link";
import { cn } from "@/lib/utils";

export function TideLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("brand", className)} aria-label="Clinora AI home">
      <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="46" height="46" rx="15" className="brand-tile" />
        <path d="M10 26.5C15 19.3 20.1 17 25.3 19.6C30.5 22.2 33.5 21.7 37.5 16.5" className="brand-wave-one" />
        <path d="M10 33C16 27.7 21 26.5 26.1 28.8C30.4 30.6 33.9 29.9 37.5 26.4" className="brand-wave-two" />
        <circle cx="34" cy="12.5" r="2" className="brand-dot" />
      </svg>
      {!compact && (
        <span className="brand-type">
          <strong>CLINORA <span>AI</span></strong>
          <small>Prepare with clarity</small>
        </span>
      )}
    </Link>
  );
}

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass-card", className)} {...props} />;
}

export function Badge({ children, tone = "sea" }: { children: ReactNode; tone?: "sea" | "violet" | "neutral" }) {
  return <span className={cn("badge", `badge-${tone}`)}>{children}</span>;
}

export function Divider() {
  return <hr className="divider" />;
}

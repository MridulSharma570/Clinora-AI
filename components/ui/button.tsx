import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "emergency";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={cn("button", `button-${variant}`, className)} {...props} />;
});

export interface GlassLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function GlassLink({ className, variant = "primary", ...props }: GlassLinkProps) {
  return <Link className={cn("button", `button-${variant}`, className)} {...props} />;
}

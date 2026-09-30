import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90",
  outline: "border border-border bg-card text-foreground hover:bg-surface",
  ghost: "text-foreground hover:bg-surface",
};
const sizes: Record<Size, string> = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-12 px-6 text-base" };

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; href?: string; children: ReactNode;
}

export default function Button({ variant = "primary", size = "md", href, className, children, ...rest }: Props) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:shadow-glow disabled:pointer-events-none disabled:opacity-50",
    variants[variant], sizes[size], className,
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}

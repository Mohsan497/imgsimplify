import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-display text-xl font-extrabold", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-gradient">
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="#fff"><path d="M6 24l7-10 5 6 3-4 5 8z" /><circle cx="22" cy="10" r="3" /></svg>
      </span>
      {SITE.name}
    </Link>
  );
}

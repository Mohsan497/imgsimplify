import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/constants/tools";
import { cn } from "@/lib/utils";

const onGradient =
  "group-hover:text-primary-foreground group-focus-visible:text-primary-foreground";

export default function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition duration-300",
        "hover:-translate-y-1 hover:border-transparent hover:shadow-glow",
        "focus-visible:-translate-y-1 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0",
        className
      )}
    >
      {/* Gradient fill expanding from top-right on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-brand-gradient",
          "transition-[clip-path] duration-500 ease-out motion-reduce:transition-none",
          "[clip-path:circle(0%_at_100%_0%)]",
          "group-hover:[clip-path:circle(150%_at_100%_0%)] group-focus-visible:[clip-path:circle(150%_at_100%_0%)]"
        )}
      />
      {/* One-time light sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[400%] group-hover:transition-transform group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
      />

      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 delay-100",
          "group-hover:bg-white/20 group-focus-visible:bg-white/20",
          onGradient,
          tool.color
        )}
      >
        <tool.icon size={22} />
      </span>
      <h3 className={cn("mt-4 font-bold transition-colors duration-300 delay-100", onGradient)}>
        {tool.title}
      </h3>
      <p
        className={cn(
          "mt-1 flex-1 text-sm text-muted transition-colors duration-300 delay-100",
          "group-hover:text-primary-foreground/85 group-focus-visible:text-primary-foreground/85"
        )}
      >
        {tool.description}
      </p>
      <ArrowRight
        size={16}
        className={cn(
          "mt-4 self-end text-muted transition duration-300 delay-100 group-hover:translate-x-1 group-focus-visible:translate-x-1",
          onGradient
        )}
      />
    </Link>
  );
}
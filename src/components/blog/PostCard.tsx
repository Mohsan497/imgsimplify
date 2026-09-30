import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getTool } from "@/constants/tools";
import { readMinutes, type Post } from "@/constants/posts";
import { cn } from "@/lib/utils";

interface Props {
  post: Post;
  featured?: boolean;
  /** Heading level for the title, so the page outline stays correct. */
  as?: "h2" | "h3";
}

export default function PostCard({ post, featured = false, as: Tag = "h3" }: Props) {
  const tool = getTool(post.toolSlug);
  const Icon = tool?.icon;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-soft transition duration-300",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        featured && "md:flex-row md:gap-8 md:p-5"
      )}
    >
      {/* Cover: the related tool's icon, so no image files are needed */}
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl",
          tool?.color ?? "bg-primary/10 text-primary",
          featured ? "min-h-[180px] md:w-[42%]" : "h-36"
        )}
      >
        {Icon && <Icon size={featured ? 64 : 44} strokeWidth={1.5} aria-hidden="true" />}
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "pt-5 md:justify-center md:py-2" : "pt-5")}>
        <p className="text-sm font-semibold text-primary">{post.category}</p>
        <Tag
          className={cn(
            "mt-2 font-bold tracking-tight transition-colors group-hover:text-primary",
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {post.title}
        </Tag>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Clock size={14} aria-hidden="true" />
            {readMinutes(post)} min read
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
            Read article
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
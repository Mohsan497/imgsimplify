import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import PostCard from "@/components/blog/PostCard";
import { POSTS, formatDate, getPost, readMinutes, type PostBlock } from "@/constants/posts";
import { getTool } from "@/constants/tools";
import { SITE } from "@/constants/site";

type Props = { params: { slug: string } };

export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: SITE.name,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const bodyText = "text-[17px] leading-8 text-foreground/80";

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-2xl font-bold tracking-tight">{block.text}</h2>;
    case "p":
      return <p className={`mt-4 ${bodyText}`}>{block.text}</p>;
    case "ul":
      return (
        <ul className={`mt-4 list-disc space-y-2 pl-6 marker:text-primary ${bodyText}`}>
          {block.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className={`mt-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-primary ${bodyText}`}>
          {block.items.map((i) => <li key={i}>{i}</li>)}
        </ol>
      );
  }
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const tool = getTool(post.toolSlug);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const url = `${SITE.url}/blog/${post.slug}`;
  const publisher = { "@type": "Organization", name: SITE.name, url: SITE.url };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        mainEntityOfPage: url,
        author: publisher,
        publisher,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Container className="max-w-3xl py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
            </li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page">{post.category}</li>
          </ol>
        </nav>

        <article>
          <header>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted">
                <CalendarDays size={15} className="text-primary" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted">
                <Clock size={15} className="text-primary" aria-hidden="true" />
                {readMinutes(post)} min read
              </p>
            </div>
          </header>

          <div className="mt-8">
            {post.blocks.map((b, i) => <Block key={i} block={b} />)}
          </div>
        </article>

        {tool && (
          <aside className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface p-8 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tool.color}`}>
                <tool.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Try it now: {tool.title}</h2>
                <p className="mt-1 text-sm text-muted">{tool.description} Free, private and right in your browser.</p>
              </div>
            </div>
            <Button href={`/tools/${tool.slug}`} size="lg" className="shrink-0">
              Open tool
            </Button>
          </aside>
        )}
      </Container>

      {related.length > 0 && (
        <Container className="pb-16 sm:pb-24">
          <SectionHeading title="Keep reading" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </Container>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
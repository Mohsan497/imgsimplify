import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PostCard from "@/components/blog/PostCard";
import { BLOG, POSTS } from "@/constants/posts";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: BLOG.metaTitle,
  description: BLOG.description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: BLOG.metaTitle,
    description: BLOG.description,
    url: "/blog",
    siteName: SITE.name,
    type: "website",
  },
};

const POSTS_PER_PAGE = 4;

type Props = {
  searchParams?: {
    page?: string;
  };
};

export default function BlogPage({ searchParams }: Props) {
  const currentPage = Math.max(
    1,
    Number.parseInt(searchParams?.page ?? "1", 10) || 1
  );

  const totalPages = Math.max(
    1,
    Math.ceil(POSTS.length / POSTS_PER_PAGE)
  );

  const page = Math.min(currentPage, totalPages);

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const pagePosts = POSTS.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const [featured, ...rest] = pagePosts;

  const url = `${SITE.url}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: BLOG.title,
        description: BLOG.description,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
        },
        blogPost: POSTS.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${url}/${p.slug}`,
          datePublished: p.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          {BLOG.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted">
          {BLOG.intro}
        </p>
      </header>

      {featured && (
        <div className="mt-12">
          <PostCard post={featured} featured as="h2" />
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} as="h2" />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          {page > 1 ? (
            <Link
              href={`/blog?page=${page - 1}`}
              className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-surface"
            >
              Previous
            </Link>
          ) : (
            <span className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-muted/50">
              Previous
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === page;

              return (
                <Link
                  key={pageNumber}
                  href={`/blog?page=${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-surface"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </div>

          {page < totalPages ? (
            <Link
              href={`/blog?page=${page + 1}`}
              className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-surface"
            >
              Next
            </Link>
          ) : (
            <span className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-muted/50">
              Next
            </span>
          )}
        </nav>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Container>
  );
}
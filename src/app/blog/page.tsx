import type { Metadata } from "next";
import Link from "next/link";
import { Search, X } from "lucide-react";
import Container from "@/components/ui/Container";
import PostCard from "@/components/blog/PostCard";
import { BLOG, POSTS } from "@/constants/posts";
import {
  getAllCategories,
  getCategorySlug,
  searchPosts,
} from "@/constants/blogCategories";
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

interface Props {
  searchParams?: {
    page?: string;
    q?: string;
  };
}

export default function BlogPage({ searchParams }: Props) {
  const query = searchParams?.q?.trim() ?? "";
  const filteredPosts = query ? searchPosts(query) : POSTS;
  const categories = getAllCategories();

  const requestedPage = Math.max(
    1,
    Number.parseInt(searchParams?.page ?? "1", 10) || 1
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );

  const page = Math.min(requestedPage, totalPages);
  const startIndex = (page - 1) * POSTS_PER_PAGE;

  const pagePosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const [featured, ...rest] = pagePosts;
  const url = `${SITE.url}/blog`;

  const paginationHref = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    params.set("page", String(pageNumber));

    return `/blog?${params.toString()}`;
  };

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

      <section
        className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5"
        aria-label="Search and browse blog articles"
      >
        <form action="/blog" method="get">
          <label htmlFor="blog-search" className="sr-only">
            Search blog articles
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="blog-search"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search articles..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold">
            Browse by topic
          </span>

          <Link
            href="/blog"
            aria-current={!query ? "page" : undefined}
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              !query
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-surface"
            }`}
          >
            All
          </Link>

          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/category/${getCategorySlug(category)}`}
              className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-surface hover:text-primary"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {query && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
          <p className="text-muted">
            <span className="font-semibold text-foreground">
              {filteredPosts.length}
            </span>{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found for{" "}
            <span className="font-semibold text-foreground">
              “{query}”
            </span>
          </p>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <X size={15} aria-hidden="true" />
            Clear search
          </Link>
        </div>
      )}

      {featured ? (
        <>
          <div className="mt-10">
            <PostCard post={featured} featured as="h2" />
          </div>

          {rest.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} as="h2" />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
          <h2 className="text-xl font-bold">No articles found</h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Try a different keyword or browse all categories to find an
            article.
          </p>

          <Link
            href="/blog"
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Browse all articles
          </Link>
        </div>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          {page > 1 ? (
            <Link
              href={paginationHref(page - 1)}
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
                  href={paginationHref(pageNumber)}
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
              href={paginationHref(page + 1)}
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
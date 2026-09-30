import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PostCard from "@/components/blog/PostCard";
import {
  getAllCategories,
  getCategoryDescription,
  getCategoryFromSlug,
  getCategorySlug,
  getPostsByCategory,
} from "@/constants/blogCategories";
import { SITE } from "@/constants/site";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = () =>
  getAllCategories().map((category) => ({
    slug: getCategorySlug(category),
  }));

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryFromSlug(params.slug);

  if (!category) {
    return {};
  }

  const description = getCategoryDescription(category);
  const canonical = `/blog/category/${params.slug}`;

  return {
    title: `${category} Articles | ImgSimplify Blog`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${category} Articles | ImgSimplify Blog`,
      description,
      url: canonical,
      siteName: SITE.name,
      type: "website",
    },
  };
}

export default function BlogCategoryPage({ params }: Props) {
  const category = getCategoryFromSlug(params.slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category);
  const description = getCategoryDescription(category);
  const url = `${SITE.url}/blog/category/${getCategorySlug(category)}`;

  const [featured, ...rest] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#category`,
        url,
        name: `${category} Articles | ImgSimplify Blog`,
        description,
        isPartOf: {
          "@type": "Blog",
          name: "The ImgSimplify Blog",
          url: `${SITE.url}/blog`,
        },
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
            item: `${SITE.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Categories",
            item: `${SITE.url}/blog/category`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: category,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <Container className="py-14 sm:py-20">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <li>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>

          <li>
            <Link
              href="/blog/category"
              className="transition-colors hover:text-foreground"
            >
              Categories
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>

          <li aria-current="page">{category}</li>
        </ol>
      </nav>

      <header className="mt-7 max-w-2xl">
        <p className="text-sm font-semibold text-primary">
          Blog category
        </p>

        <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          {category} Articles
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted">
          {description}
        </p>

        <p className="mt-3 text-sm font-medium text-muted">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </header>

      {featured && (
        <div className="mt-10">
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

      <div className="mt-10">
        <Link
          href="/blog/category"
          className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-semibold transition-colors hover:bg-surface"
        >
          Back to all categories
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Container>
  );
}
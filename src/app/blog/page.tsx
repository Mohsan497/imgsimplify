import type { Metadata } from "next";
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

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
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
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
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
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: url },
        ],
      },
    ],
  };

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">{BLOG.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{BLOG.intro}</p>
      </header>

      <div className="mt-12">
        <PostCard post={featured} featured as="h2" />
      </div>

      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} as="h2" />
          ))}
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </Container>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getAllCategories,
  getCategoryDescription,
  getCategorySlug,
  getPostsByCategory,
} from "@/constants/blogCategories";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Blog Categories | ImgSimplify",
  description:
    "Browse ImgSimplify articles by category, including image SEO, compression, formats, conversion, performance and developer guides.",
  alternates: { canonical: "/blog/category" },
  openGraph: {
    title: "Blog Categories | ImgSimplify",
    description:
      "Browse ImgSimplify articles by category, including image SEO, compression, formats, conversion, performance and developer guides.",
    url: "/blog/category",
    siteName: SITE.name,
    type: "website",
  },
};

export default function BlogCategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        as="h1"
        title="Blog Categories"
        subtitle="Explore ImgSimplify guides by topic and find practical advice for working with images on the web."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const posts = getPostsByCategory(category);

          return (
            <Link
              key={category}
              href={`/blog/category/${getCategorySlug(category)}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Category
                  </p>

                  <h2 className="mt-1 text-xl font-bold tracking-tight group-hover:text-primary">
                    {category}
                  </h2>
                </div>

                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
                  {posts.length}{" "}
                  {posts.length === 1 ? "article" : "articles"}
                </span>
              </div>

              <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                {getCategoryDescription(category)}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore articles

                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageTool from "@/components/tools/ImageTool";
import ToolCard from "@/components/tools/ToolCard";
import FaqSection from "@/components/home/FaqSection";
import { TOOLS, getTool } from "@/constants/tools";
import { POSTS } from "@/constants/posts";
import { SITE } from "@/constants/site";

type Props = { params: { slug: string } };

export const generateStaticParams = () => TOOLS.map((t) => ({ slug: t.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return {};

  return {
    title: tool.seoTitle,
    description: tool.metaDescription,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.seoTitle,
      description: tool.metaDescription,
      url: `/tools/${tool.slug}`,
      siteName: SITE.name,
      type: "website",
    },
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const url = `${SITE.url}/tools/${tool.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: `${tool.title} Online`,
        url,
        description: tool.metaDescription,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires JavaScript and a modern browser",
        inLanguage: "en",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Image Tools", item: `${SITE.url}/tools` },
          { "@type": "ListItem", position: 3, name: tool.title, item: url },
        ],
      },
    ],
  };

  // Most relevant tools first (same kind of job / same output format), not always the same first four.
  const relevance = (t: (typeof TOOLS)[number]) => (t.mode === tool.mode ? 2 : 0) + (t.target && t.target === tool.target ? 1 : 0);
  const related = TOOLS.filter((t) => t.slug !== tool.slug)
    .sort((a, b) => relevance(b) - relevance(a))
    .slice(0, 4);
  const guides = POSTS.filter((p) => p.toolSlug === tool.slug);

  return (
    <>
      <Container className="py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li><Link href="/tools" className="hover:text-foreground">Image Tools</Link></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page">{tool.title}</li>
          </ol>
        </nav>

        <header className="mb-8 flex items-start gap-4">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tool.color}`}>
            <tool.icon size={24} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{tool.title} Online</h1>
            <p className="mt-2 max-w-2xl text-muted">{tool.intro}</p>
          </div>
        </header>

        <ImageTool tool={{ mode: tool.mode, target: tool.target }} />
      </Container>

      <section className="border-y border-border bg-surface py-14 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">How to use it</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                {tool.title} step by step
              </h2>
              <ol className="mt-6 space-y-4">
                {tool.howTo.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1 leading-7 text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Best for</p>
              <p className="mt-2 leading-7 text-muted">{tool.bestFor}</p>

              <div className="mt-7 border-t border-border pt-6">
                <p className="font-bold">Practical tips</p>
                <ul className="mt-4 space-y-3">
                  {tool.tips.map((tip) => (
                    <li key={tip} className="flex gap-3 text-sm leading-6 text-muted">
                      <Check size={17} className="mt-0.5 shrink-0 text-primary" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection
        title={`Frequently Asked Questions about ${tool.title}`}
        subtitle={`Answers to common questions about using this free browser-based image tool.`}
        items={tool.faqs}
      />

      {guides.length > 0 && (
        <Container className="pb-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Read the guide</p>
            <ul className="mt-3 space-y-2">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/blog/${g.slug}`} className="font-semibold hover:text-primary">{g.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}

      <Container className="py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading title="More image tools" />
          <Link href="/tools" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
            View all tools <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

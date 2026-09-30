import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ToolCard from "@/components/tools/ToolCard";
import { TOOLS } from "@/constants/tools";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Free Online Image Tools",
  description:
    "Use free browser-based image tools to compress, resize, crop and convert JPG, PNG and WebP files without signup.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Online Image Tools",
    description:
      "Compress, resize, crop and convert images directly in your browser.",
    url: "/tools",
    siteName: SITE.name,
    type: "website",
  },
};

export default function ToolsPage() {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            Free Online Image Tools
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Compress, resize, crop, convert and work with Base64 images directly
            in your browser. No account is required.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </Container>

      <section className="border-t border-border bg-surface py-14">
        <Container>
          <SectionHeading
            title="Why use browser-based image tools?"
            subtitle="The processing workflow is designed to be quick, simple and privacy-conscious."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["No signup", "Open a tool and start working immediately."],
              ["Local processing", "Image transformations happen in your browser."],
              ["Simple downloads", "Review the result and save the file when ready."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

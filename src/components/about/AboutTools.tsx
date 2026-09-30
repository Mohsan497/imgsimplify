import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ToolCard from "@/components/tools/ToolCard";
import { TOOLS } from "@/constants/tools";

const CONTACT_EMAIL = "hello@ImgSimplify.com";

const COPY = {
  title: "Free online image tools",
  subtitle: "Compress, resize, convert and crop images. Every tool runs in your browser.",
  contactTitle: "Found a bug or have an idea?",
  contactText: "Tell us what to fix, or which image tool you would like next.",
};

export default function AboutTools() {
  return (
    <section className="pb-16 lg:pb-24">
      <Container>
        <SectionHeading title={COPY.title} subtitle={COPY.subtitle} cta={{ label: "View all tools", href: "/tools" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TOOLS.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl bg-inverse p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-md">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{COPY.contactTitle}</h2>
            <p className="mt-2 text-white/70">{COPY.contactText}</p>
          </div>
          <Button href={`mailto:${CONTACT_EMAIL}`} size="lg" className="shrink-0">
            Email {CONTACT_EMAIL}
          </Button>
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ToolCard from "@/components/tools/ToolCard";
import { TOOLS } from "@/constants/tools";
import { POPULAR_TOOLS } from "@/constants/home";

export default function ToolsGrid() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title={POPULAR_TOOLS.title} subtitle={POPULAR_TOOLS.subtitle} cta={{ label: POPULAR_TOOLS.cta, href: "/tools" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </Container>
    </section>
  );
}

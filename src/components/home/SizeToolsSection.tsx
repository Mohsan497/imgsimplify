import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ToolCard from "@/components/tools/ToolCard";
import { TOOLS } from "@/constants/tools";

export default function SizeToolsSection() {
  const sizeTools = TOOLS.filter((t) => t.targetKb !== undefined);
  if (sizeTools.length === 0) return null;

  return (
    <section className="pb-4">
      <Container>
        <SectionHeading
          title="Compress an image to an exact size"
          subtitle="Forms and apps often set a file size limit. Pick your limit and we find the best quality that fits."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sizeTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}

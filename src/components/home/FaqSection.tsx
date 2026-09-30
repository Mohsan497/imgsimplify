import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import type { Faq } from "@/constants/faqs";

export default function FaqSection({ title, subtitle, items }: { title: string; subtitle?: string; items: Faq[] }) {
  return (
    <section className="py-8">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <Accordion items={items} />
      </Container>
    </section>
  );
}

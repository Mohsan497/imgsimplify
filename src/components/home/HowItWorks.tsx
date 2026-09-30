import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { HOW_IT_WORKS } from "@/constants/home";

export default function HowItWorks() {
  return (
    <section className="pb-16">
      <Container>
        <div className="rounded-3xl border border-border bg-surface px-6 py-12 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{HOW_IT_WORKS.title}</h2>
          <p className="mt-2 text-muted">{HOW_IT_WORKS.subtitle}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start">
            {HOW_IT_WORKS.steps.flatMap((s, i) => {
              const step = (
                <div key={s.title} className="flex flex-col items-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground"><s.icon size={24} /></span>
                  <span className="mt-3 text-xs font-bold text-primary">0{i + 1}</span>
                  <h3 className="mt-1 font-bold">{s.title}</h3>
                  <p className="mt-1 max-w-[220px] text-sm text-muted">{s.text}</p>
                </div>
              );
              return i < HOW_IT_WORKS.steps.length - 1 ? [step, <ArrowRight key={`a${i}`} className="mt-5 hidden text-muted md:block" />] : [step];
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

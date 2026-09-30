import Link from "next/link";
import { Check, Lock, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import { PRIVACY } from "@/constants/home";

export default function PrivacySection() {
  return (
    <section className="pb-16">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl bg-inverse p-8 text-white md:grid-cols-[1.2fr_auto_1fr] md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">{PRIVACY.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-extrabold">{PRIVACY.title}</h2>
            <p className="mt-3 max-w-md text-white/70">{PRIVACY.text}</p>
            <Link href={PRIVACY.cta.href} className="mt-6 inline-flex h-10 items-center rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-primary-foreground">{PRIVACY.cta.label}</Link>
          </div>
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-brand-gradient">
            <ShieldCheck size={64} className="text-white/90" /><Lock size={22} className="absolute" />
          </div>
          <ul className="space-y-3">
            {PRIVACY.points.map((p) => <li key={p} className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary" />{p}</li>)}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Bug, Lightbulb, Mail, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONTACT_EMAIL, SITE } from "@/constants/site";

const description =
  "Contact ImgSimplify for bug reports, tool ideas, privacy questions or feedback about our free browser-based image tools.";

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ImgSimplify",
    description,
    url: "/contact",
    siteName: SITE.name,
    type: "website",
  },
};

const REASONS = [
  { icon: Bug, title: "Report a bug", text: "Tell us the tool, your browser and device, and what went wrong. Please do not attach private photos." },
  { icon: Lightbulb, title: "Suggest a tool", text: "Missing a format or feature you need? Ideas from real users decide what we build next." },
  { icon: ShieldCheck, title: "Privacy questions", text: "Ask how ImgSimplify handles images and site data. You can also read our Privacy Policy for details." },
];

export default function ContactPage() {
  const url = `${SITE.url}/contact`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    name: "Contact ImgSimplify",
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <Container className="max-w-4xl py-14 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">Contact ImgSimplify</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Questions, bug reports or ideas for new image tools? Send us an email and we will read it.
        </p>
      </header>

      <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold">Email us</h2>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block font-semibold text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <Button href={`mailto:${CONTACT_EMAIL}`}>Send an email</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {REASONS.map((r) => (
          <div key={r.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <r.icon size={22} className="text-primary" aria-hidden="true" />
            <h2 className="mt-3 font-bold">{r.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{r.text}</p>
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </Container>
  );
}

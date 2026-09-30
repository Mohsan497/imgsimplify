import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ToolsGrid from "@/components/home/ToolsGrid";
import HowItWorks from "@/components/home/HowItWorks";
import PrivacySection from "@/components/home/PrivacySection";
import FaqSection from "@/components/home/FaqSection";
import { GENERAL_FAQS } from "@/constants/faqs";
import { FAQ_SECTION } from "@/constants/home";
import { SITE } from "@/constants/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}#organization`,
        name: SITE.name,
        url: SITE.url,
      },
    ],
  };

  return (
    <>
      <Hero />
      <ToolsGrid />
      <HowItWorks />
      <PrivacySection />
      <FaqSection
        title={FAQ_SECTION.title}
        subtitle={FAQ_SECTION.subtitle}
        items={GENERAL_FAQS}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

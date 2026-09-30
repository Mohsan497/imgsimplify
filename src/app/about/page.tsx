import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutTools from "@/components/about/AboutTools";
import { ABOUT_PAGE } from "@/constants/pages";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: ABOUT_PAGE.metaTitle,
    description: ABOUT_PAGE.description,
    url: "/about",
    siteName: SITE.name,
    type: "website",
  },
};

export default function Page() {
  const url = `${SITE.url}/about`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: ABOUT_PAGE.metaTitle,
        description: ABOUT_PAGE.description,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        about: { "@type": "Organization", name: SITE.name, url: SITE.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "About", item: url },
        ],
      },
    ],
  };

  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutTools />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
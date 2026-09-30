import type { Metadata } from "next";
import StaticPage from "@/components/layout/StaticPage";
import { TERMS_PAGE } from "@/constants/pages";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: TERMS_PAGE.metaTitle,
  description: TERMS_PAGE.description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: TERMS_PAGE.metaTitle,
    description: TERMS_PAGE.description,
    url: "/terms",
    siteName: SITE.name,
    type: "website",
  },
};

export default function Page() {
  return <StaticPage content={TERMS_PAGE} />;
}
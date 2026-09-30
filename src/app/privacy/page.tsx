import type { Metadata } from "next";
import StaticPage from "@/components/layout/StaticPage";
import { PRIVACY_PAGE } from "@/constants/pages";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: PRIVACY_PAGE.metaTitle,
  description: PRIVACY_PAGE.description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: PRIVACY_PAGE.metaTitle,
    description: PRIVACY_PAGE.description,
    url: "/privacy",
    siteName: SITE.name,
    type: "website",
  },
};

export default function Page() {
  return <StaticPage content={PRIVACY_PAGE} />;
}
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { fontDisplay, fontSans } from "@/config/fonts";
import { SITE } from "@/constants/site";
import Providers from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – Free Online Image Compressor, Resizer & Converter`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE.name} – Free Online Image Compressor, Resizer & Converter`,
    description: SITE.description,
    locale: "en_US",
    siteName: SITE.name,
    url: SITE.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} – Free Online Image Compressor, Resizer & Converter`,
    images: ["/opengraph-image"],
    description: SITE.description,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

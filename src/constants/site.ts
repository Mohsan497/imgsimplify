const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
// On Vercel this is set automatically (production domain), so canonical/sitemap URLs never fall back to localhost.
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const configuredUrl = explicitUrl || (vercelProd ? `https://${vercelProd}` : "");

export const CONTACT_EMAIL = "mohsantahir497@gmail.com";

export const SITE = {
  name: "ImgSimplify",
  tagline: "Simple image tools. Fast. Private. Free.",
  description:
    "Compress, resize, convert and crop images online. Free, fast and browser-based, with no signup required.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel before production. Do not deploy with a public placeholder URL.
  url: configuredUrl || "http://localhost:3000",
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

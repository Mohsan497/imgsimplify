import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { TOOLS } from "@/constants/tools";
import { POSTS } from "@/constants/posts";

// Bump this date when you meaningfully change site content (Google ignores lastmod that changes on every build).
const SITE_UPDATED = new Date("2026-09-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tools", "/about", "/blog", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: SITE_UPDATED,
  }));
  const tools = TOOLS.map((t) => ({ url: `${SITE.url}/tools/${t.slug}`, lastModified: SITE_UPDATED }));
  const posts = POSTS.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  return [...pages, ...tools, ...posts];
}

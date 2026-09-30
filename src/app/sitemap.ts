import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { TOOLS } from "@/constants/tools";
import { POSTS } from "@/constants/posts";
import {
  getAllCategories,
  getCategorySlug,
} from "@/constants/blogCategories";

// Bump this date when you meaningfully change site content
// (Google ignores lastmod that changes on every build).
const SITE_UPDATED = new Date("2026-09-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/tools",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: SITE_UPDATED,
  }));

  const tools = TOOLS.map((tool) => ({
    url: `${SITE.url}/tools/${tool.slug}`,
    lastModified: SITE_UPDATED,
  }));

  const posts = POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const categoryPages = [
    {
      url: `${SITE.url}/blog/category`,
      lastModified: SITE_UPDATED,
    },
    ...getAllCategories().map((category) => ({
      url: `${SITE.url}/blog/category/${getCategorySlug(category)}`,
      lastModified: SITE_UPDATED,
    })),
  ];

  return [...pages, ...tools, ...posts, ...categoryPages];
}
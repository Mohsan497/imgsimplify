import { POSTS, type Post } from "@/constants/posts";

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  SEO: "Practical image SEO tips for better search visibility, accessibility and page performance.",
  Converting:
    "Guides for converting JPG, PNG and WebP images while choosing the right format for each use case.",
  Developers:
    "Useful image and Base64 guides for developers working with web apps, HTML, CSS and APIs.",
  Compression:
    "Learn how to reduce image file sizes while keeping a good balance between quality and performance.",
  Formats:
    "Understand JPG, PNG and WebP and learn which image format makes sense for different situations.",
  Privacy:
    "Practical guidance for handling images with privacy, local processing and safer sharing in mind.",
  "E-commerce":
    "Image tips for online stores, including product images, file sizes, formats and faster pages.",
  Resizing:
    "Learn how to resize images to the right dimensions for websites, uploads and different devices.",
  Performance:
    "Image performance tips that help websites load faster and deliver a better experience for visitors.",
  Cropping:
    "Simple image cropping guidance for removing unwanted areas and preparing images for the right layout.",
};

export const getAllCategories = () => {
  const categories: string[] = [];
  const seen = new Set<string>();

  for (const post of POSTS) {
    if (!seen.has(post.category)) {
      seen.add(post.category);
      categories.push(post.category);
    }
  }

  return categories;
};

export const getCategorySlug = (category: string) =>
  category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCategoryFromSlug = (slug: string) =>
  getAllCategories().find(
    (category) => getCategorySlug(category) === slug
  );

export const getPostsByCategory = (category: string) =>
  POSTS.filter((post) => post.category === category);

export const searchPosts = (query: string): Post[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return POSTS;

  return POSTS.filter((post) => {
    const body = post.blocks
      .map((block) =>
        "text" in block ? block.text : block.items.join(" ")
      )
      .join(" ");

    const searchableText = [
      post.title,
      post.description,
      post.category,
      body,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
};

export const getCategoryDescription = (category: string) =>
  CATEGORY_DESCRIPTIONS[category] ??
  `Practical ImgSimplify guides and articles about ${category.toLowerCase()} and image optimization.`;
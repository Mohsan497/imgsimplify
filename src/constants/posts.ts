export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  /** Meta description, 140-160 characters. */
  description: string;
  /** ISO date, e.g. "2026-09-28". */
  date: string;
  category: string;
  /** Slug of the ImgSimplify tool this article links to (see constants/tools.ts). */
  toolSlug: string;
  blocks: PostBlock[];
}

export const BLOG = {
  title: "The ImgSimplify Blog",
  metaTitle: "Image Optimization Guides: Compress, Convert & Resize",
  description:
    "Free guides on JPG vs PNG vs WebP, compressing images without losing quality, converting formats and more. Practical image tips from ImgSimplify.",
  intro:
    "Practical guides on image formats, compression and web performance, from the team behind ImgSimplify's free, private image tools.",
};

// Newest first. To add an article: add one object here, nothing else.
export const POSTS: Post[] = [
  {
    slug: "jpg-vs-png-vs-webp",
    title: "JPG vs PNG vs WebP: Which Image Format Should You Use?",
    description:
      "Compare JPG, PNG and WebP by quality, file size, transparency and browser support, and learn which image format is best for photos, logos and websites.",
    date: "2026-09-28",
    category: "Formats",
    toolSlug: "jpg-to-webp",
    blocks: [
      { type: "p", text: "Picking the wrong image format can make a website slower or a logo look blurry. JPG, PNG and WebP are the three formats you will meet most often online, and each one is good at something different." },
      { type: "h2", text: "JPG: best for photographs" },
      { type: "p", text: "JPG (also written JPEG) uses lossy compression, which throws away detail the human eye barely notices. That makes it excellent for photos, where it can shrink a file dramatically. The trade-offs are that JPG does not support transparency, and saving the same image again and again gradually reduces quality." },
      { type: "h2", text: "PNG: best for logos, screenshots and transparency" },
      { type: "p", text: "PNG is lossless, so every pixel is preserved exactly. It supports transparent backgrounds and keeps text and sharp edges crisp, which is why it is the usual choice for logos, icons and screenshots. The downside is size: a photo saved as PNG is often several times larger than the same photo saved as JPG." },
      { type: "h2", text: "WebP: the modern all-rounder" },
      { type: "p", text: "WebP can be lossy or lossless and it supports transparency, so it can replace both JPG and PNG in most cases. Google's own tests found lossy WebP files roughly 25–34% smaller than comparable JPGs. All current major browsers support it." },
      { type: "h2", text: "Quick comparison" },
      { type: "ul", items: [
        "Photos: WebP or JPG",
        "Logos, icons and screenshots: PNG or WebP",
        "Transparent backgrounds: PNG or WebP (JPG cannot do transparency)",
        "Maximum compatibility with older software: JPG",
      ] },
      { type: "h2", text: "Which should you choose?" },
      { type: "p", text: "For a website, WebP is usually the best default because it gives smaller files at similar quality. Keep JPG when you need to share images with older apps, and PNG when you need exact pixels for editing. You can switch between all three at any time with the free converters on ImgSimplify, and everything happens in your browser, so your images are never uploaded." },
    ],
  },
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    description:
      "Learn how to compress JPG, PNG and WebP images online for free. Simple steps to reduce file size while keeping photos sharp, without uploading anything.",
    date: "2026-09-21",
    category: "Compression",
    toolSlug: "compress-image",
    blocks: [
      { type: "p", text: "Large images are one of the most common reasons a web page loads slowly. The good news is that most photos can be made much smaller with no visible difference, as long as you compress them the right way." },
      { type: "h2", text: "Understand lossy and lossless compression" },
      { type: "p", text: "Lossy compression (JPG and lossy WebP) removes detail that is hard to notice, and it gives the biggest savings. Lossless compression (PNG) keeps every pixel but saves far less space. For photos, lossy is almost always the right choice." },
      { type: "h2", text: "Pick a quality between 70% and 85%" },
      { type: "p", text: "Quality settings are not linear. Dropping from 100% to about 80% usually cuts the file size dramatically while looking the same to the eye. Below roughly 60% you start to see blocky artifacts, especially around edges and in smooth gradients." },
      { type: "h2", text: "Resize before you compress" },
      { type: "p", text: "A photo straight from a phone can be 4000 pixels wide, while a website often displays it at 800 or 1200. Reducing the pixel dimensions first removes far more data than compression alone. Resize to the largest size you will actually display, then compress." },
      { type: "h2", text: "How to compress an image with ImgSimplify" },
      { type: "ol", items: [
        "Open the Compress Image tool and drop in your JPG, PNG or WebP file.",
        "Move the quality slider until the preview still looks good, around 75–85% for most photos.",
        "Compare the original and new file sizes shown next to the preview.",
        "Click Download to save the smaller image.",
      ] },
      { type: "h2", text: "Keep your images private" },
      { type: "p", text: "Because ImgSimplify compresses images inside your browser, your files are never uploaded. Re-encoding an image in the browser also typically removes hidden metadata such as camera details and GPS location, which is a small privacy bonus when you share photos online." },
    ],
  },
  {
    slug: "convert-webp-to-jpg",
    title: "How to Convert WebP to JPG (and When You Should)",
    description:
      "Need a JPG instead of WebP? Learn why WebP images fail to open in some apps, when to convert WebP to JPG, and how to do it free in your browser.",
    date: "2026-09-14",
    category: "Converting",
    toolSlug: "webp-to-jpg",
    blocks: [
      { type: "p", text: "You save an image from a website and discover it is a .webp file that your photo editor, email client or upload form refuses to open. WebP is great for the web, but not every program supports it yet, so converting WebP to JPG is a common fix." },
      { type: "h2", text: "Why WebP images do not open everywhere" },
      { type: "p", text: "WebP was designed for fast websites, and modern browsers all handle it. Older desktop software, some print services and many document and upload tools were built before WebP became common, so they only accept JPG or PNG." },
      { type: "h2", text: "When you should convert WebP to JPG" },
      { type: "ul", items: [
        "An app or website rejects your WebP upload",
        "You need to share a photo with someone using older software",
        "You want a format that every device understands",
      ] },
      { type: "h2", text: "What you lose when converting" },
      { type: "p", text: "JPG does not support transparency, so any transparent area becomes a solid color (ImgSimplify fills it with white). Converting also re-compresses the image, so choose a high quality setting to keep it looking sharp, and keep the original WebP if you may need it later. Expect the JPG to be somewhat larger than the WebP." },
      { type: "h2", text: "How to convert WebP to JPG online" },
      { type: "ol", items: [
        "Open the WebP to JPG tool.",
        "Drop in your .webp file or click to choose it.",
        "Adjust the quality slider if you want a smaller or sharper result.",
        "Click Download to save your JPG.",
      ] },
      { type: "p", text: "The conversion runs entirely in your browser, so your image is never uploaded to a server." },
    ],
  },
  {
    slug: "image-to-base64-when-to-use",
    title: "Image to Base64: What It Is and When to Use It",
    description:
      "Learn what Base64 image encoding is, how much it increases file size, and when to embed images as data URLs in HTML, CSS or JSON.",
    date: "2026-09-07",
    category: "Developers",
    toolSlug: "image-to-base64",
    blocks: [
      { type: "p", text: "Base64 turns binary data, such as an image, into plain text. That text can be pasted straight into HTML, CSS or JSON, which is handy when you want to include an image without hosting a separate file." },
      { type: "h2", text: "What is a Base64 image?" },
      { type: "p", text: "A Base64 image is usually written as a data URL that starts with something like data:image/png;base64, followed by a long string of characters. Browsers can display it exactly like a normal image file." },
      { type: "h2", text: "When Base64 images make sense" },
      { type: "ul", items: [
        "Tiny icons or logos embedded directly in CSS or HTML",
        "Small images inside JSON payloads or API requests",
        "Single-file demos, prototypes and code snippets",
      ] },
      { type: "h2", text: "When to avoid it" },
      { type: "p", text: "Base64 makes data about 33% larger than the original file, and an embedded image cannot be cached separately by the browser. For photos or anything larger than a few kilobytes, a normal image file (ideally WebP) served from your site or a CDN is faster." },
      { type: "h2", text: "How to convert an image to Base64" },
      { type: "ol", items: [
        "Open the Image to Base64 tool and drop in your file.",
        "Copy the generated Base64 data URL.",
        "Paste it into an HTML src attribute, a CSS url() or your JSON.",
      ] },
      { type: "p", text: "Need to go the other way? The Base64 to Image tool decodes a string back into a downloadable image file. Both tools run locally in your browser." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

const countWords = (p: Post) =>
  p.blocks
    .map((b) => ("text" in b ? b.text : b.items.join(" ")))
    .join(" ")
    .split(/\s+/).length;

export const readMinutes = (p: Post) => Math.max(1, Math.ceil(countWords(p) / 200));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
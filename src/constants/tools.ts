import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, Crop, FileCode2, FileImage, ImageDown, Maximize2 } from "lucide-react";
import type { Faq } from "./faqs";

export type ToolMode = "compress" | "resize" | "convert" | "crop" | "toBase64" | "fromBase64";
export type ImageMime = "image/jpeg" | "image/png" | "image/webp";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  mode: ToolMode;
  target?: ImageMime;
  icon: LucideIcon;
  color: string;
  intro: string;
  seoTitle: string;
  metaDescription: string;
  howTo: string[];
  bestFor: string;
  tips: string[];
  faqs: Faq[];
}

const commonFaqs: Faq[] = [
  { q: "Is this tool free?", a: "Yes. The tool is free to use and does not require an account." },
  { q: "Are my images uploaded?", a: "Image processing is performed in your browser. The image file is not sent to ImgSimplify's image-processing server." },
];

export const TOOLS: Tool[] = [
  {
    slug: "compress-image", title: "Compress Image", description: "Reduce image size while keeping quality.", mode: "compress",
    icon: ImageDown, color: "bg-emerald-500/10 text-emerald-500",
    intro: "Compress JPG, PNG and WebP images in your browser and download a smaller file without signing up.",
    seoTitle: "Compress JPG, PNG & WebP Images Online Free",
    metaDescription: "Compress JPG, PNG and WebP images online for free. Reduce file size in your browser, compare the result and download without uploading your image.",
    howTo: ["Upload a JPG, PNG or WebP image.", "Choose the output format and adjust quality.", "Compare the new file size, then download the compressed image."],
    bestFor: "Photos, website images, email attachments and social media uploads that are larger than necessary.",
    tips: ["Start around 75–85% quality for photographs.", "Resize very large photos before compression when you know the display size.", "Keep the original file when you need a lossless master."],
    faqs: [
      { q: "How much can an image be compressed?", a: "Savings depend on the original format, dimensions and content. Photographs often shrink substantially when exported as JPG or WebP." },
      { q: "What quality should I use?", a: "Around 75–85% is a useful starting point for many photos. Preview the result because the best setting depends on the image." },
      ...commonFaqs,
    ],
  },
  {
    slug: "resize-image", title: "Resize Image", description: "Change width and height easily.", mode: "resize",
    icon: Maximize2, color: "bg-blue-500/10 text-blue-500",
    intro: "Resize an image to exact pixel dimensions while keeping the aspect ratio locked when you want it.",
    seoTitle: "Resize Images Online by Pixels — Free Image Resizer",
    metaDescription: "Resize JPG, PNG and WebP images to exact width and height online. Lock the aspect ratio and download the resized image for free.",
    howTo: ["Upload your image.", "Enter the target width or height and keep aspect ratio locked if needed.", "Review the dimensions and download the resized file."],
    bestFor: "Website images, profile pictures, thumbnails, forms and uploads with strict pixel-size requirements.",
    tips: ["Resize to the largest size you actually need.", "Keep the aspect ratio locked unless you intentionally want to stretch the image.", "Do not repeatedly resize the same lossy image; keep an original master."],
    faqs: [
      { q: "Can I resize by width only?", a: "Yes. With the aspect-ratio lock enabled, changing one dimension automatically calculates the other." },
      { q: "Does resizing reduce image quality?", a: "Reducing dimensions removes pixels by design. The result usually looks good when you resize to a sensible target and preview it before downloading." },
      ...commonFaqs,
    ],
  },
  {
    slug: "jpg-to-png", title: "JPG → PNG", description: "Convert JPG images to PNG.", mode: "convert", target: "image/png",
    icon: ArrowLeftRight, color: "bg-orange-500/10 text-orange-500",
    intro: "Convert JPG and JPEG photographs to PNG directly in your browser without creating an account.",
    seoTitle: "JPG to PNG Converter Online Free",
    metaDescription: "Convert JPG or JPEG images to PNG online for free. Fast browser-based conversion with no signup and no image-processing upload.",
    howTo: ["Choose a JPG or JPEG image.", "Wait while the browser converts it to PNG.", "Download the converted PNG file."],
    bestFor: "Images that need PNG output for editing workflows, graphics tools or formats that require PNG.",
    tips: ["PNG is lossless but can be much larger than JPG for photographs.", "Converting a JPG to PNG does not restore detail already lost by JPG compression.", "Keep JPG when file size matters more than lossless output."],
    faqs: [
      { q: "Will JPG quality improve after converting to PNG?", a: "No. PNG preserves the pixels it receives; it cannot restore detail that was already lost in the JPG." },
      { q: "Will the PNG be larger?", a: "Often, especially for photographs, because PNG uses lossless compression." },
      ...commonFaqs,
    ],
  },
  {
    slug: "png-to-jpg", title: "PNG → JPG", description: "Convert PNG images to JPG.", mode: "convert", target: "image/jpeg",
    icon: ArrowLeftRight, color: "bg-rose-500/10 text-rose-500",
    intro: "Convert PNG images to JPG when you need a smaller, widely supported photograph format.",
    seoTitle: "PNG to JPG Converter Online Free",
    metaDescription: "Convert PNG to JPG online for free. Reduce file size and download a JPG directly in your browser with no signup.",
    howTo: ["Upload a PNG image.", "Choose the quality level for the JPG output.", "Download the converted JPG."],
    bestFor: "Photos, email attachments, website uploads and services that require JPG instead of PNG.",
    tips: ["JPG does not support transparency; transparent areas are filled with white.", "Use a higher quality setting when text or fine detail matters.", "For screenshots and graphics, compare JPG with WebP or PNG before choosing."],
    faqs: [
      { q: "What happens to transparent PNG areas?", a: "JPG has no transparency channel, so ImgSimplify fills transparent areas with white." },
      { q: "Is JPG smaller than PNG?", a: "For many photographs, yes. The exact difference depends on the image and quality setting." },
      ...commonFaqs,
    ],
  },
  {
    slug: "webp-to-jpg", title: "WebP → JPG", description: "Convert WebP images to JPG.", mode: "convert", target: "image/jpeg",
    icon: ArrowLeftRight, color: "bg-violet-500/10 text-violet-500",
    intro: "Convert WebP images to JPG when an older app, upload form or workflow does not accept WebP.",
    seoTitle: "WebP to JPG Converter Online Free",
    metaDescription: "Convert WebP to JPG online for free. Choose quality, preview the result and download a JPG without uploading your image.",
    howTo: ["Upload the WebP image.", "Choose the JPG quality.", "Download the converted JPG."],
    bestFor: "Legacy software, print services, upload forms and sharing workflows that require JPG.",
    tips: ["Keep the original WebP if you may need its smaller file size later.", "Use high quality when converting an already compressed image.", "Transparent WebP areas become white in JPG output."],
    faqs: [
      { q: "Does JPG support transparency?", a: "No. Any transparent area in the WebP is rendered with a white background in the JPG." },
      { q: "Why is my JPG larger than the WebP?", a: "WebP can achieve smaller files than JPG at comparable visual quality, so a larger JPG is normal." },
      ...commonFaqs,
    ],
  },
  {
    slug: "jpg-to-webp", title: "JPG → WebP", description: "Smaller images for the web.", mode: "convert", target: "image/webp",
    icon: FileImage, color: "bg-pink-500/10 text-pink-500",
    intro: "Convert JPG photographs to WebP for smaller web images and faster page delivery.",
    seoTitle: "JPG to WebP Converter Online Free",
    metaDescription: "Convert JPG to WebP online for free. Choose quality and download a smaller WebP image directly from your browser.",
    howTo: ["Upload a JPG or JPEG image.", "Choose the WebP quality.", "Download the WebP file and use it where WebP is supported."],
    bestFor: "Websites, blogs, ecommerce images and other web content where smaller image files are useful.",
    tips: ["Try 75–85% quality for photos and compare the visual result.", "Keep the JPG original as a source file.", "Use responsive image sizes on websites instead of serving one huge image everywhere."],
    faqs: [
      { q: "Why convert JPG to WebP?", a: "WebP can provide smaller files at similar visual quality, which can reduce image bytes on websites." },
      { q: "Does WebP work in modern browsers?", a: "WebP is supported by current major browsers, but check compatibility if your users rely on older software." },
      ...commonFaqs,
    ],
  },
  {
    slug: "png-to-webp", title: "PNG → WebP", description: "Better compression and quality.", mode: "convert", target: "image/webp",
    icon: FileImage, color: "bg-cyan-500/10 text-cyan-500",
    intro: "Convert PNG images to WebP while preserving transparency and usually reducing file size.",
    seoTitle: "PNG to WebP Converter Online Free",
    metaDescription: "Convert PNG to WebP online for free. Preserve transparency, choose quality and download a smaller WebP image in your browser.",
    howTo: ["Upload a PNG image.", "Choose the WebP quality.", "Preview the result and download the WebP file."],
    bestFor: "Transparent graphics, website assets, illustrations and PNG files that are larger than necessary.",
    tips: ["Keep transparency when WebP is used as the output.", "Compare the result at 100% zoom when converting text-heavy graphics.", "Keep the PNG source if you need a lossless editing master."],
    faqs: [
      { q: "Does WebP support transparency?", a: "Yes. WebP can store transparency, so transparent PNG graphics can retain transparent areas." },
      { q: "Will every PNG become smaller?", a: "No. Savings depend on the image and quality. Compare the original and output sizes before replacing a file." },
      ...commonFaqs,
    ],
  },
  {
    slug: "crop-image", title: "Image Cropper", description: "Crop your images freely.", mode: "crop",
    icon: Crop, color: "bg-teal-500/10 text-teal-500",
    intro: "Crop images to common aspect ratios such as 1:1, 4:3 and 16:9 directly in your browser.",
    seoTitle: "Crop Image Online — Free Image Cropper",
    metaDescription: "Crop JPG, PNG and WebP images online for free. Choose common aspect ratios and download the cropped image in your browser.",
    howTo: ["Upload your image.", "Choose an aspect ratio such as 1:1, 4:3 or 16:9.", "Review the centered crop and download the result."],
    bestFor: "Profile pictures, thumbnails, social posts, banners and images that need a consistent aspect ratio.",
    tips: ["Keep the main subject near the center when using automatic centered crops.", "Use 1:1 for square avatars and many profile images.", "Keep the original when you may want a different crop later."],
    faqs: [
      { q: "Which crop ratios are available?", a: "ImgSimplify currently includes 1:1, 4:3, 3:4, 16:9 and 9:16." },
      { q: "Can I move the crop area?", a: "The current cropper performs a centered crop using the selected aspect ratio. A free-position crop editor can be added as a future enhancement." },
      ...commonFaqs,
    ],
  },
  {
    slug: "image-to-base64", title: "Image to Base64", description: "Convert image to Base64 string.", mode: "toBase64",
    icon: FileCode2, color: "bg-indigo-500/10 text-indigo-500",
    intro: "Convert an image to a Base64 data URL you can paste into HTML, CSS or JSON.",
    seoTitle: "Image to Base64 Converter Online Free",
    metaDescription: "Convert JPG, PNG or WebP images to a Base64 data URL online. Copy the result for HTML, CSS or JSON without uploading your file.",
    howTo: ["Upload an image.", "Wait for the Base64 data URL to be generated.", "Copy the string and paste it into your code or JSON."],
    bestFor: "Small icons, prototypes, single-file demos and APIs that explicitly require a data URL.",
    tips: ["Base64 increases the encoded data size, so it is usually better for small assets.", "Avoid embedding large photographs as Base64 in normal web pages.", "Keep the original image file separately for editing and reuse."],
    faqs: [
      { q: "What is a Base64 image?", a: "It is binary image data represented as text, commonly as a data URL such as data:image/png;base64,..." },
      { q: "Does Base64 make images larger?", a: "Yes. Base64 encoding adds roughly one third to the raw encoded data size, so it is usually best for small assets." },
      ...commonFaqs,
    ],
  },
  {
    slug: "base64-to-image", title: "Base64 to Image", description: "Convert Base64 string to image file.", mode: "fromBase64",
    icon: FileImage, color: "bg-sky-500/10 text-sky-500",
    intro: "Paste a Base64 image string, preview it in your browser and download it as an image file.",
    seoTitle: "Base64 to Image Converter Online Free",
    metaDescription: "Convert a Base64 image string to a downloadable image online. Preview and save PNG, JPG or WebP data URLs directly in your browser.",
    howTo: ["Paste a complete data URL or Base64 image string.", "Check the preview for a valid image.", "Download the decoded image file."],
    bestFor: "Developers decoding data URLs from APIs, HTML, CSS, JSON payloads and debugging workflows.",
    tips: ["A complete data URL starts with a media type such as data:image/png;base64,.", "Very large Base64 strings can use significant browser memory.", "Do not paste sensitive data into third-party tools; local processing is the point of this tool."],
    faqs: [
      { q: "Can I paste only the Base64 characters?", a: "Yes. When no data URL prefix is present, ImgSimplify treats the value as PNG Base64 data." },
      { q: "Why is my Base64 string invalid?", a: "Check that the string is complete, contains valid Base64 characters and represents an actual image." },
      ...commonFaqs,
    ],
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
export const DEFAULT_UPLOAD_TOOL = "compress-image";

export interface Faq { q: string; a: string }

export const GENERAL_FAQS: Faq[] = [
  { q: "How do I compress an image?", a: "Upload your image, choose a quality level with the slider and download the result. You will see the new file size instantly." },
  { q: "Does image compression reduce quality?", a: "Slightly, but at 70–85% quality the difference is usually invisible while the file becomes much smaller." },
  { q: "Are my images uploaded to a server?", a: "No. All processing happens locally in your browser using the Canvas API. Your images never leave your device." },
  { q: "What file types are supported?", a: "JPG, PNG, WebP, GIF (first frame) and AVIF as input. You can export to JPG, PNG and WebP." },
  { q: "Can I compress an image to an exact size like 50KB?", a: "Yes. Use the Compress Image to 20KB, 50KB, 100KB or 200KB tools. Enter your target size and ImgSimplify finds the highest quality that stays under it. If an image is very detailed, it may also reduce the dimensions slightly to fit." },
  { q: "Can I convert AVIF or WebP files to JPG?", a: "Yes. Use the AVIF to JPG or WebP to JPG tools. Your browser needs to be able to open the file, which current versions of Chrome, Edge, Firefox and Safari can for both formats." },
  { q: "Is it free?", a: "Yes, every tool is completely free and requires no signup." },
  { q: "Can I use these tools on mobile?", a: "Yes. The site is fully responsive and works in any modern mobile browser." },
];

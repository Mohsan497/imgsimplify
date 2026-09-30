export interface Faq { q: string; a: string }

export const GENERAL_FAQS: Faq[] = [
  { q: "How do I compress an image?", a: "Upload your image, choose a quality level with the slider and download the result. You will see the new file size instantly." },
  { q: "Does image compression reduce quality?", a: "Slightly, but at 70–85% quality the difference is usually invisible while the file becomes much smaller." },
  { q: "Are my images uploaded to a server?", a: "No. All processing happens locally in your browser using the Canvas API. Your images never leave your device." },
  { q: "What file types are supported?", a: "JPG, PNG, WebP and GIF (first frame) as input. You can export to JPG, PNG and WebP." },
  { q: "Is it free?", a: "Yes, every tool is completely free and requires no signup." },
  { q: "Can I use these tools on mobile?", a: "Yes. The site is fully responsive and works in any modern mobile browser." },
];

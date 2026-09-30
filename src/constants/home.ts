import { Cog, Download, Upload } from "lucide-react";

export const HERO = {
  badges: ["Fast", "Secure", "Free"],
  titleLine1: "Simple image tools.",
  titlePlain: "Fast.",
  titleHighlight: "Private. Free.",
  subtitle: "Compress, resize, convert and optimize your images all in one place. No signup required.",
  dropTitle: "Drop your image here or click to upload",
  dropHint: "JPG, PNG, WebP, GIF",
  trust: "Your images never leave your device",
  checklist: ["Compress", "Resize", "Convert", "Crop", "More tools…"],
  beforeLabel: "JPG",
  beforeSize: "2.4 MB",
  afterLabel: "WebP",
  afterSize: "320 KB",
};

export const POPULAR_TOOLS = { title: "Popular Image Tools", subtitle: "Quick and easy tools to work with your images.", cta: "View all tools" };

export const HOW_IT_WORKS = {
  title: "How It Works",
  subtitle: "Get your image processed in three simple steps.",
  steps: [
    { icon: Upload, title: "Upload Image", text: "Drag and drop your image or click to browse files." },
    { icon: Cog, title: "Process", text: "We process your image directly in your browser." },
    { icon: Download, title: "Download", text: "Get your optimized image instantly." },
  ],
};

export const PRIVACY = {
  eyebrow: "Privacy first",
  title: "Your images stay yours.",
  text: "Every tool runs inside your browser. Your files are never uploaded to a server, never stored, and never shared with anyone.",
  cta: { label: "Learn more", href: "/privacy" },
  points: ["No signup required", "No image uploads", "Fast processing", "Privacy focused"],
};

export const FAQ_SECTION = { title: "Frequently Asked Questions", subtitle: "Everything you need to know about our image tools." };

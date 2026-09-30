import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ImgSimplify – Free Online Image Tools",
    short_name: "ImgSimplify",
    description: "Compress, resize, convert and crop images in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#10b981",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

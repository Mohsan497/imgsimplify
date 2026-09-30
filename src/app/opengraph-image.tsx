import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ImgSimplify – Free online image compressor, resizer and converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #10b981, #06b6d4)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, opacity: 0.9 }}>ImgSimplify</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>
          Free Online Image Tools
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 36, opacity: 0.95 }}>
          Compress · Resize · Convert · Crop
        </div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 30, opacity: 0.85 }}>
          Private. Runs in your browser. No signup.
        </div>
      </div>
    ),
    size
  );
}

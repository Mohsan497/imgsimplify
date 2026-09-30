"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";

const MAX_BASE64_CHARS = 28_000_000;

export default function Base64ToImage() {
  const [text, setText] = useState("");
  const [failed, setFailed] = useState(false);

  const parsed = useMemo(() => {
    const t = text.trim();
    if (!t) return { src: "", ext: "png" };

    if (t.length > MAX_BASE64_CHARS) {
      return { src: "", ext: "png" };
    }

    if (t.startsWith("data:")) {
      const match = t.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,/i);
      if (!match) return { src: "", ext: "png" };

      const mime = match[1].toLowerCase();
      return {
        src: t,
        ext: mime === "image/jpeg" ? "jpg" : mime.split("/")[1],
      };
    }

    if (!/^[A-Za-z0-9+/=\s]+$/.test(t)) return { src: "", ext: "png" };

    return {
      src: `data:image/png;base64,${t.replace(/\s/g, "")}`,
      ext: "png",
    };
  }, [text]);

  const src = parsed.src;
  const ext = parsed.ext;
  const tooLarge = text.trim().length > MAX_BASE64_CHARS;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setFailed(false);
          }}
          aria-label="Base64 image string"
          placeholder="Paste your Base64 string here…"
          className="min-h-[260px] w-full rounded-2xl border border-border bg-card p-4 font-mono text-xs shadow-soft focus:outline-none focus:shadow-glow"
        />
        <p className="mt-2 text-xs text-muted">
          Supports PNG, JPG, WebP and GIF data URLs. Very large strings may exceed browser memory limits.
        </p>
        {tooLarge && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            This Base64 value is too large to process safely.
          </p>
        )}
        {!tooLarge && text.trim() && !src && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            Enter a valid image Base64 string or a complete image data URL.
          </p>
        )}
      </div>

      <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
        {src && !failed ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Decoded Base64 image preview"
              onError={() => setFailed(true)}
              className="max-h-64 max-w-full rounded-lg"
            />
            <a href={src} download={`image.${ext}`}>
              <Button>
                <Download size={16} /> Download image
              </Button>
            </a>
          </>
        ) : (
          <p className="text-sm text-muted">
            {failed ? "This Base64 value is not a valid image." : "Preview will appear here."}
          </p>
        )}
      </div>
    </div>
  );
}

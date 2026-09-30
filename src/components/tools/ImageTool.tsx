"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Download, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import Dropzone from "./Dropzone";
import Base64ToImage from "./Base64ToImage";
import type { ImageMime, Tool } from "@/constants/tools";
import {
  CROP_ASPECTS,
  extFor,
  fileToDataUrl,
  processImage,
  readImageSize,
  validateImageFile,
} from "@/lib/image";
import { cn, downloadBlob, formatBytes } from "@/lib/utils";
import { takePendingFile } from "@/lib/fileStore";

interface Result {
  blob: Blob;
  url: string;
  type: string;
  w: number;
  h: number;
}

const card = "rounded-2xl border border-border bg-card p-5 shadow-soft";
const input =
  "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:shadow-glow";

export default function ImageTool({ tool }: { tool: Pick<Tool, "mode" | "target"> }) {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<"auto" | ImageMime>("auto");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lock, setLock] = useState(true);
  const [aspect, setAspect] = useState(CROP_ASPECTS[0].ratio);
  const [result, setResult] = useState<Result | null>(null);
  const [b64, setB64] = useState("");
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const srcRef = useRef("");
  const resRef = useRef("");

  const cleanupUrls = useCallback(() => {
    if (srcRef.current) {
      URL.revokeObjectURL(srcRef.current);
      srcRef.current = "";
    }
    if (resRef.current) {
      URL.revokeObjectURL(resRef.current);
      resRef.current = "";
    }
  }, []);

  const onFile = useCallback(async (f: File) => {
    const validationError = validateImageFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setResult(null);
    setB64("");

    if (srcRef.current) URL.revokeObjectURL(srcRef.current);
    if (resRef.current) URL.revokeObjectURL(resRef.current);
    srcRef.current = URL.createObjectURL(f);
    resRef.current = "";
    setSrc(srcRef.current);
    setFile(f);

    try {
      const d = await readImageSize(f);
      setDims(d);
      setWidth(d.w);
      setHeight(d.h);
    } catch (e) {
      if (srcRef.current) {
        URL.revokeObjectURL(srcRef.current);
        srcRef.current = "";
      }
      setSrc("");
      setFile(null);
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    const p = takePendingFile();
    if (p && tool.mode !== "fromBase64") onFile(p);

    return () => cleanupUrls();
  }, [cleanupUrls, onFile, tool.mode]);

  useEffect(() => {
    if (!file || tool.mode === "fromBase64") return;

    let cancelled = false;
    const t = setTimeout(async () => {
      setBusy(true);
      setError("");

      try {
        if (tool.mode === "toBase64") {
          const d = await fileToDataUrl(file);
          if (!cancelled) setB64(d);
          return;
        }

        const r = await processImage(file, {
          mode: tool.mode as "compress" | "resize" | "convert" | "crop",
          // Resize/crop have no quality slider, so keep JPG/WebP output near-lossless instead of silently using 80%.
          quality: tool.mode === "compress" || tool.mode === "convert" ? quality : 92,
          format,
          target: tool.target,
          width,
          height,
          aspect,
        });

        if (cancelled) return;

        if (resRef.current) URL.revokeObjectURL(resRef.current);
        resRef.current = URL.createObjectURL(r.blob);
        setResult({
          blob: r.blob,
          url: resRef.current,
          type: r.type,
          w: r.width,
          h: r.height,
        });
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [file, tool.mode, tool.target, quality, format, width, height, aspect]);

  const reset = () => {
    cleanupUrls();
    setFile(null);
    setResult(null);
    setB64("");
    setSrc("");
    setError("");
    setDims({ w: 0, h: 0 });
    setWidth(0);
    setHeight(0);
    setBusy(false);
  };

  if (tool.mode === "fromBase64") return <Base64ToImage />;

  if (!file) {
    return (
      <Dropzone
        onFile={onFile}
        title="Drop your image here or click to upload"
        hint="JPG, PNG, WebP or GIF"
        className="py-16"
      />
    );
  }

  const base = file.name.replace(/\.[^.]+$/, "");
  const saved = result ? Math.round((1 - result.blob.size / file.size) * 100) : 0;
  const showQuality =
    tool.mode === "compress" || (tool.mode === "convert" && tool.target !== "image/png");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className={card}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.mode === "toBase64" || !result ? src : result.url}
          alt={`${file.name} preview`}
          className="mx-auto max-h-[420px] w-auto max-w-full rounded-lg bg-surface object-contain"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span className="truncate">
            {file.name} · {dims.w}×{dims.h} · {formatBytes(file.size)}
          </span>
          {busy && (
            <span className="flex items-center gap-1" role="status" aria-live="polite">
              <RefreshCw size={14} className="animate-spin" />
              Processing…
            </span>
          )}
        </div>

        {tool.mode === "toBase64" && b64 && (
          <div className="mt-4">
            <textarea
              readOnly
              value={b64}
              aria-label="Base64 image data"
              className="h-40 w-full rounded-lg border border-border bg-background p-3 font-mono text-xs"
            />
            <Button
              className="mt-3"
              onClick={async () => {
                await navigator.clipboard.writeText(b64);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy Base64"}
            </Button>
          </div>
        )}
      </div>

      <div className={cn(card, "space-y-5 self-start")}>
        {tool.mode === "compress" && (
          <label className="block text-sm font-medium">
            Output format
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as typeof format)}
              className={cn(input, "mt-2")}
              aria-label="Output format"
            >
              <option value="auto">Auto (smallest)</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WebP</option>
            </select>
          </label>
        )}

        {showQuality && (
          <label className="block text-sm font-medium">
            Quality: {quality}%
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              aria-label={`Quality ${quality}%`}
              onChange={(e) => setQuality(+e.target.value)}
              className="mt-2 w-full accent-[rgb(var(--primary))]"
            />
          </label>
        )}

        {tool.mode === "resize" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-medium">
                Width (px)
                <input
                  type="number"
                  min={1}
                  value={width || ""}
                  className={cn(input, "mt-2")}
                  onChange={(e) => {
                    const w = Math.max(1, +e.target.value || 1);
                    setWidth(w);
                    if (lock && dims.w) setHeight(Math.round((w * dims.h) / dims.w));
                  }}
                />
              </label>
              <label className="text-sm font-medium">
                Height (px)
                <input
                  type="number"
                  min={1}
                  value={height || ""}
                  className={cn(input, "mt-2")}
                  onChange={(e) => {
                    const h = Math.max(1, +e.target.value || 1);
                    setHeight(h);
                    if (lock && dims.h) setWidth(Math.round((h * dims.w) / dims.h));
                  }}
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={lock}
                onChange={(e) => setLock(e.target.checked)}
                className="accent-[rgb(var(--primary))]"
              />
              Lock aspect ratio
            </label>
          </div>
        )}

        {tool.mode === "crop" && (
          <div>
            <p className="mb-2 text-sm font-medium">Aspect ratio</p>
            <div className="flex flex-wrap gap-2">
              {CROP_ASPECTS.map((a) => (
                <button
                  type="button"
                  key={a.label}
                  onClick={() => setAspect(a.ratio)}
                  aria-pressed={aspect === a.ratio}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-medium transition",
                    aspect === a.ratio
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-surface"
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && tool.mode !== "toBase64" && (
          <div className="rounded-xl bg-surface p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Original</span>
              <b>{formatBytes(file.size)}</b>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted">
                New ({result.w}×{result.h})
              </span>
              <b>{formatBytes(result.blob.size)}</b>
            </div>
            {(tool.mode === "compress" || tool.mode === "convert") && (
              <p className={cn("mt-2 font-semibold", saved > 0 ? "text-primary" : "text-muted")}>
                {saved > 0
                  ? `${saved}% smaller`
                  : tool.mode === "compress"
                    ? "Result is larger than the original — lower the quality or keep the original"
                    : "No size reduction"}
              </p>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2">
          {result && tool.mode !== "toBase64" && (
            <Button
              onClick={() =>
                downloadBlob(
                  result.blob,
                  `${base}-${tool.mode === "convert" ? "converted" : tool.mode}.${extFor(result.type)}`
                )
              }
            >
              <Download size={16} /> Download
            </Button>
          )}

          <Button variant="outline" onClick={reset}>
            Choose another image
          </Button>
        </div>
      </div>
    </div>
  );
}

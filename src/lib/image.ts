import type { ImageMime } from "@/constants/tools";

export const CROP_ASPECTS = [
  { label: "1:1", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "3:4", ratio: 3 / 4 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "9:16", ratio: 9 / 16 },
];

export const SUPPORTED_INPUT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 40_000_000;

/** Quality range used when compressing to a target file size. */
const TARGET_QUALITY_FLOOR = 0.4;
const TARGET_QUALITY_CEIL = 0.92;
/** Smallest side (px) we will shrink an image to while chasing a target size. */
const TARGET_MIN_SIDE = 32;
const TARGET_MAX_SCALE_STEPS = 12;

const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

/**
 * Some browsers / operating systems report an empty MIME type for newer formats
 * (AVIF in particular), so fall back to the file extension.
 */
export function detectMime(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXT_TO_MIME[ext] ?? "";
}

const isSupportedMime = (mime: string) =>
  (SUPPORTED_INPUT_TYPES as readonly string[]).includes(mime);

export const extFor = (t: string) =>
  t === "image/jpeg" ? "jpg" : t === "image/webp" ? "webp" : "png";

export function validateImageFile(file: File): string | null {
  if (!isSupportedMime(detectMime(file))) {
    return "Please choose a JPG, PNG, WebP, GIF or AVIF image.";
  }
  if (file.size > MAX_FILE_BYTES) {
    return `This image is larger than ${MAX_FILE_BYTES / 1024 / 1024}MB. Please choose a smaller file.`;
  }
  return null;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(
        new Error(
          "Could not read this image. The file may be damaged, or your browser may not support this format."
        )
      );
    img.src = src;
  });
}

export async function readImageSize(file: File) {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const pixels = img.naturalWidth * img.naturalHeight;
    if (!Number.isFinite(pixels) || pixels > MAX_IMAGE_PIXELS) {
      throw new Error(`This image is too large to process safely. Maximum dimensions are ${MAX_IMAGE_PIXELS.toLocaleString()} total pixels.`);
    }
    return { w: img.naturalWidth, h: img.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("Could not read the image file."));
    r.readAsDataURL(file);
  });

export interface ProcessOptions {
  mode: "compress" | "resize" | "convert" | "crop";
  quality: number;
  format: "auto" | ImageMime;
  target?: ImageMime;
  width?: number;
  height?: number;
  aspect?: number;
  /**
   * Compress mode only. When set, the encoder searches for the highest quality that keeps
   * the file at or below this many bytes, and shrinks the dimensions if quality alone is not enough.
   */
  targetBytes?: number;
}

export interface ProcessResult {
  blob: Blob;
  type: ImageMime;
  width: number;
  height: number;
  /** null when no target size was requested. */
  reachedTarget: boolean | null;
}

const MIME_LABEL: Record<ImageMime, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

const encodeSupport = new Map<string, boolean>();

/** Some browsers silently fall back to PNG when asked for a format they cannot encode (e.g. WebP). */
async function canEncode(type: ImageMime): Promise<boolean> {
  if (type === "image/png") return true;
  const cached = encodeSupport.get(type);
  if (cached !== undefined) return cached;

  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const blob = await new Promise<Blob | null>((resolve) => probe.toBlob(resolve, type, 0.8));
  const ok = !!blob && blob.type === type;
  encodeSupport.set(type, ok);
  return ok;
}

function pickOutputType(file: File, o: ProcessOptions): ImageMime {
  const input = detectMime(file);

  if (o.mode === "convert" && o.target) return o.target;

  if (o.mode === "compress") {
    if (o.format !== "auto") return o.format;
    return input === "image/jpeg" ? "image/jpeg" : "image/webp";
  }

  // Resize / crop keep JPG and WebP as they are. GIF and AVIF are exported as PNG.
  if (input === "image/jpeg" || input === "image/webp") return input;
  return "image/png";
}

export async function processImage(file: File, o: ProcessOptions): Promise<ProcessResult> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const pixels = img.naturalWidth * img.naturalHeight;
    if (!Number.isFinite(pixels) || pixels > MAX_IMAGE_PIXELS) {
      throw new Error(`This image is too large to process safely. Maximum dimensions are ${MAX_IMAGE_PIXELS.toLocaleString()} total pixels.`);
    }

    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;
    let dw = sw;
    let dh = sh;

    if (o.mode === "crop" && o.aspect) {
      if (sw / sh > o.aspect) {
        const nw = Math.round(sh * o.aspect);
        sx = Math.round((sw - nw) / 2);
        sw = nw;
      } else {
        const nh = Math.round(sw / o.aspect);
        sy = Math.round((sh - nh) / 2);
        sh = nh;
      }
      dw = sw;
      dh = sh;
    }

    if (o.mode === "resize") {
      dw = Math.max(1, Math.round(o.width || sw));
      dh = Math.max(1, Math.round(o.height || sh));
      if (dw * dh > MAX_IMAGE_PIXELS) {
        throw new Error(`The requested output is too large. Maximum output size is ${MAX_IMAGE_PIXELS.toLocaleString()} total pixels.`);
      }
    }

    let type: ImageMime = pickOutputType(file, o);

    if (!(await canEncode(type))) {
      if (o.mode === "convert") {
        throw new Error(
          `Your browser cannot export ${MIME_LABEL[type]} images. Please try a current version of Chrome, Edge or Firefox.`
        );
      }
      type = "image/jpeg";
    }

    const draw = (w: number, h: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not supported in this browser.");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (type === "image/jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, w, h);
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      return canvas;
    };

    const encode = (canvas: HTMLCanvasElement, quality: number) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

    // ---- Compress to a target file size (e.g. "compress image to 50KB") ----
    if (o.mode === "compress" && o.targetBytes && o.targetBytes > 0) {
      const target = o.targetBytes;
      let w = dw;
      let h = dh;
      let canvas = draw(w, h);

      for (let step = 0; step <= TARGET_MAX_SCALE_STEPS; step++) {
        const floorBlob = await encode(canvas, TARGET_QUALITY_FLOOR);
        if (!floorBlob) throw new Error("Could not export the image.");

        if (floorBlob.size <= target) {
          // Fits at the quality floor: find the highest quality that still fits.
          let best = floorBlob;
          const top = await encode(canvas, TARGET_QUALITY_CEIL);

          if (top && top.size <= target) {
            best = top;
          } else {
            let lo = TARGET_QUALITY_FLOOR;
            let hi = TARGET_QUALITY_CEIL;
            for (let i = 0; i < 6; i++) {
              const mid = (lo + hi) / 2;
              const candidate = await encode(canvas, mid);
              if (candidate && candidate.size <= target) {
                best = candidate;
                lo = mid;
              } else {
                hi = mid;
              }
            }
          }

          return { blob: best, type, width: w, height: h, reachedTarget: true };
        }

        // Still too big at the quality floor: shrink the dimensions proportionally and retry.
        const ratio = Math.min(0.9, Math.max(0.5, Math.sqrt(target / floorBlob.size) * 0.95));
        const nextW = Math.max(1, Math.round(w * ratio));
        const nextH = Math.max(1, Math.round(h * ratio));
        if (Math.min(nextW, nextH) < TARGET_MIN_SIDE) break;

        w = nextW;
        h = nextH;
        canvas = draw(w, h);
      }

      // Could not reach the target without making the image tiny: return the smallest attempt.
      const smallest = await encode(canvas, 0.1);
      if (!smallest) throw new Error("Could not export the image.");
      return { blob: smallest, type, width: canvas.width, height: canvas.height, reachedTarget: false };
    }

    // ---- Normal single-pass export ----
    const canvas = draw(dw, dh);
    const blob = await encode(canvas, o.quality / 100);

    if (!blob) throw new Error("Could not export the image.");
    return { blob, type, width: dw, height: dh, reachedTarget: null };
  } finally {
    URL.revokeObjectURL(url);
  }
}

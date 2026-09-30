import type { ImageMime } from "@/constants/tools";

export const CROP_ASPECTS = [
  { label: "1:1", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "3:4", ratio: 3 / 4 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "9:16", ratio: 9 / 16 },
];

export const SUPPORTED_INPUT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 40_000_000;

export const extFor = (t: string) =>
  t === "image/jpeg" ? "jpg" : t === "image/webp" ? "webp" : "png";

export function validateImageFile(file: File): string | null {
  if (!SUPPORTED_INPUT_TYPES.includes(file.type as (typeof SUPPORTED_INPUT_TYPES)[number])) {
    return "Please choose a JPG, PNG, WebP or GIF image.";
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
    img.onerror = () => reject(new Error("Could not read this image. The file may be damaged or unsupported."));
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
}

export async function processImage(file: File, o: ProcessOptions) {
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

    let type: ImageMime;
    if (o.mode === "convert" && o.target) {
      type = o.target;
    } else if (o.mode === "compress") {
      type = o.format !== "auto" ? o.format : file.type === "image/jpeg" ? "image/jpeg" : "image/webp";
    } else {
      type = SUPPORTED_INPUT_TYPES.includes(file.type as (typeof SUPPORTED_INPUT_TYPES)[number])
        ? (file.type === "image/gif" ? "image/png" : file.type as ImageMime)
        : "image/png";
    }

    const canvas = document.createElement("canvas");
    canvas.width = dw;
    canvas.height = dh;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser.");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    if (type === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, dw, dh);
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, o.quality / 100)
    );

    if (!blob) throw new Error("Could not export the image.");
    return { blob, type, width: dw, height: dh };
  } finally {
    URL.revokeObjectURL(url);
  }
}

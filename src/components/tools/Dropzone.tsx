"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_FILE_BYTES, SUPPORTED_INPUT_TYPES, validateImageFile } from "@/lib/image";

interface Props {
  onFile: (file: File) => void;
  title: string;
  hint?: string;
  className?: string;
}

const accept = SUPPORTED_INPUT_TYPES.join(",");

export default function Dropzone({ onFile, title, hint, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");

  const handle = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;

    const validationError = validateImageFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onFile(f);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 bg-card px-6 py-10 text-center shadow-soft transition hover:border-primary hover:shadow-glow focus-visible:outline-none focus-visible:shadow-glow",
        over && "border-primary bg-primary/5 shadow-glow",
        className
      )}
    >
      <UploadCloud size={40} className="mb-3 text-primary" aria-hidden="true" />
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-xs text-muted">
        {hint ?? "JPG, PNG, WebP or GIF"} · Max {MAX_FILE_BYTES / 1024 / 1024}MB
      </p>
      {error && (
        <p role="alert" className="mt-3 max-w-md text-sm font-medium text-red-500">
          {error}
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

"use client";

import { ChangeEvent, DragEvent, useEffect, useId, useRef, useState } from "react";
import { ImagePlus, RefreshCw, Trash2, Upload } from "lucide-react";

type ImageUploadProps = {
  name: string;
  label: string;
  currentUrl?: string | null;
  description?: string;
  className?: string;
  maxSizeMb?: number;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

function canPreview(url?: string | null) {
  return Boolean(url && /^(https?:\/\/|\/|data:image\/)/i.test(url));
}

export function ImageUpload({
  name,
  label,
  currentUrl,
  description,
  className = "",
  maxSizeMb = 4,
}: ImageUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    canPreview(currentUrl) ? currentUrl! : null,
  );
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const chooseFile = () => inputRef.current?.click();

  const processFile = (file: File) => {
    setError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Choose a JPG, PNG, WebP, or AVIF image.");
      return false;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Image must be ${maxSizeMb} MB or smaller.`);
      return false;
    }

    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
    return true;
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!processFile(file)) event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file || !processFile(file) || !inputRef.current) return;

    const transfer = new DataTransfer();
    transfer.items.add(file);
    inputRef.current.files = transfer.files;
  };

  const removeImage = () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(null);
    setRemoved(true);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={className}>
      <input type="hidden" name={`${name}Current`} value={currentUrl || ""} />
      <input type="hidden" name={`${name}Remove`} value={removed ? "1" : ""} />
      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={onFileChange}
        className="sr-only"
      />

      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-white/65">{label}</div>
          {description && (
            <div className="mt-1 text-[11px] leading-5 text-white/30">{description}</div>
          )}
        </div>
        <div className="text-[10px] uppercase tracking-[.14em] text-white/20">
          Max {maxSizeMb} MB
        </div>
      </div>

      {preview ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <div className="relative grid min-h-44 place-items-center overflow-hidden bg-[linear-gradient(45deg,rgba(255,255,255,.025)_25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,.025)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(255,255,255,.025)_75%),linear-gradient(-45deg,transparent_75%,rgba(255,255,255,.025)_75%)] bg-[length:24px_24px]">
            <img src={preview} alt="" className="max-h-64 w-full object-contain p-4" />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
            <button
              type="button"
              onClick={chooseFile}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/65 transition hover:border-white/25 hover:text-white"
            >
              <RefreshCw size={13} /> Replace
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="inline-flex items-center gap-2 rounded-xl border border-red-300/15 px-3 py-2 text-xs text-red-200 transition hover:border-red-300/30"
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={chooseFile}
          onDragEnter={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          className={`group grid min-h-44 w-full place-items-center rounded-2xl border border-dashed p-6 text-center transition ${
            dragging
              ? "border-[#d7bd7d]/60 bg-[#d7bd7d]/[.06]"
              : "border-white/15 bg-white/[.02] hover:border-[#d7bd7d]/45 hover:bg-[#d7bd7d]/[.035]"
          }`}
        >
          <div>
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.03] text-[#d7bd7d] transition group-hover:scale-105">
              <ImagePlus size={19} />
            </span>
            <div className="mt-4 text-sm text-white/70">
              {dragging ? "Drop image here" : "Upload or drag an image"}
            </div>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
              <Upload size={11} /> JPG, PNG, WebP, or AVIF
            </div>
          </div>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-200">{error}</p>}
    </div>
  );
}

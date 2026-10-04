import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { del, put } from "@vercel/blob";

// Vercel server uploads have a 4.5 MB request-body limit. Keeping uploads at
// 4 MB leaves a little headroom for multipart/form-data overhead.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

function shouldUseVercelBlob() {
  return process.env.VERCEL === "1" || Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function saveUploadedImage(
  value: FormDataEntryValue | null,
  folder: "projects" | "branding",
) {
  if (!(value instanceof File) || value.size === 0) return null;

  const extension = EXTENSIONS[value.type];
  if (!extension) {
    throw new Error("Unsupported image type. Use JPG, PNG, WebP, or AVIF.");
  }

  if (value.size > MAX_IMAGE_BYTES) {
    throw new Error("Image is too large. Maximum size is 4 MB.");
  }

  const filename = `${folder}/${randomUUID()}${extension}`;

  // Production on Vercel: store images in persistent Blob storage.
  // Recent Vercel projects can authenticate Blob through OIDC automatically;
  // older stores can still use BLOB_READ_WRITE_TOKEN.
  if (shouldUseVercelBlob()) {
    const blob = await put(filename, value, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  // Local-development fallback so the uploader still works before the project
  // is linked to Vercel Blob.
  const uploadDirectory = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDirectory, { recursive: true });

  const localFilename = `${randomUUID()}${extension}`;
  const outputPath = path.join(uploadDirectory, localFilename);
  const bytes = Buffer.from(await value.arrayBuffer());
  await writeFile(outputPath, bytes);

  return `/uploads/${folder}/${localFilename}`;
}

export async function deleteUploadedImage(url?: string | null) {
  if (!url) return;

  if (/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//i.test(url)) {
    await del(url);
    return;
  }

  if (!url.startsWith("/uploads/")) return;

  const publicDirectory = path.resolve(process.cwd(), "public");
  const absolutePath = path.resolve(publicDirectory, url.replace(/^\/+/, ""));

  if (!absolutePath.startsWith(`${publicDirectory}${path.sep}`)) return;

  try {
    await unlink(absolutePath);
  } catch (error: any) {
    if (error?.code !== "ENOENT") throw error;
  }
}
